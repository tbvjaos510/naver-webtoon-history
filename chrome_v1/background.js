var webtoon = {};
var visits = {};
var wtab = 0
var scrolls = {}
var options = {
    getLocation: 1,
    sort: 0,
    showHistory: true,
    historyCount: 2000,
    saveWsort: true,
    saveScroll: true,
    hiddenCommant: false,
    autoNext: false,
    useimglog: true,
    linktab: true,
    useFavorate: true,
    linkPopup: true
}

function storage() {
    if (options.getLocation == 1) {
        return chrome.storage.local
    } else
        return chrome.storage.sync
}

function updateStorage() {
    storage().set({
        'webtoon': webtoon,
        'visits': visits
    }, () => {
        console.log("success")
    })
}

function setMax() {
    var vkey = Object.keys(visits)
    var vdata = Object.values(visits)
    var wtime = []
    for (var i = 0; i < vkey.length; i++)
        for (var v of Object.keys(vdata[i])) {
            wtime.push({
                wno: vkey[i],
                no: v,
                time: vdata[i][v]
            })
        }
    wtime.sort((a, b) => {
        if (a.time < b.time)
            return 1
        else
            return -1
        return 0
    })

    while (wtime.length > options.historyCount) {
        var last = wtime.pop()
        delete visits[last.wno][last.no]
    }
}

function initWebLog(cb) {
    chrome.history.search({
        text: "detail.nhn?titleId=",
        startTime: 0,
        maxResults: 5000
    }, (data) => {
        // 역시간 순을 위해 배열을 뒤집음
        data.reverse()
        webtoon = {}
        visits = {}
        data.forEach(d => {
            if (!d.title) return;
            var url = new URL(d.url)
            var params = url.searchParams
            let wid = params.get("titleId")
            let wno = params.get("no")
            if (!webtoon[wid]) {
                webtoon[wid] = {}
                visits[wid] = {}
                webtoon[wid].na = d.title.split("::")[0]
                visits[wid][wno] = Math.floor(d.lastVisitTime / 1000)
                webtoon[wid].t = url.pathname.split("/detail.nhn")[0]

            } else {
                visits[wid][wno] = Math.floor(d.lastVisitTime / 1000)
            }
        });
        if (cb)
            cb()
    })
}

function setScroll(tid, sc) {
    chrome.tabs.executeScript(tid, {
        code: `
    if (confirm("[webtoon extension] 이전에 본 기록이 남아있습니다. (${sc}%)\\n이어보시겠습니까?"))
        document.documentElement.scrollTop = document.querySelector(".wt_viewer").childNodes[1].offsetTop + document.querySelector(".wt_viewer").scrollHeight * ${sc/100}
    `
    }, () => {
        console.log("scroll sended")
    })
}

function autoNext(tid, isauto) {
    if (isauto)
        chrome.tabs.executeScript(tid, {
            code: `var wu = new URL(window.location.href);
        wu.searchParams.set("no", wu.searchParams.get("no")*1+1)
        var isScrolling;
        function checkScrolls( event ) {
            window.clearTimeout( isScrolling );
            isScrolling = setTimeout(function() {
                if (document.documentElement.scrollHeight-document.documentElement.scrollTop<1500)
                     window.location.href = wu.href;
            }, 500);

        }
        window.addEventListener('scroll',checkScrolls, false);
        `
        })
    else {
        chrome.tabs.executeScript(tid, {
            code: `
        if (window["checkScrolls"])
        window.removeEventListener('scroll', checkScrolls)`
        });
    }
}

chrome.storage.sync.get(['options', 'scroll'], (result) => {
    if (result.options) {
        options = result.options
    }
    if (result.scroll)
        scrolls = result.scroll
    if (options.getLocation == 0) {
        chrome.runtime.sendMessage("reload")
        initWebLog()
    } else {
        storage().get(['webtoon', 'visits'], result => {
            console.log("get from chrome storage")
            if (result.webtoon)
                webtoon = result.webtoon
            if (result.visits)
                visits = result.visits
            chrome.runtime.sendMessage("reload")
        })
    }

})

function setCommant(wid, isshow) {
    chrome.tabs.executeScript(wid, {
        code: `document.getElementById("commentIframe").hidden=${isshow}`
    })
}

function addScrollEvent(wid) {
    chrome.tabs.executeScript(wid, {
        code: `
        var checkPercent;
        function checkSc( event ) {
            window.clearTimeout( checkPercent );
            checkPercent = setTimeout(function() {
        chrome.runtime.sendMessage('${chrome.runtime.id}', {scroll : (document.documentElement.scrollTop - document.querySelector(".wt_viewer").childNodes[1].offsetTop) / document.querySelector(".wt_viewer").scrollHeight })
        }, 100);
        

}
window.addEventListener('scroll',checkSc, false);
        `
    })
}

function addTab(link) {
    if (options.linktab)
        chrome.tabs.create({
            url: link
        })
    else
        chrome.tabs.update({
            url: link
        })
}
chrome.tabs.onUpdated.addListener((tid, ci, tab) => {
    if (ci.status && ci.status == "complete") {

        var url = new URL(tab.url)
        if (url.host === "comic.naver.com") {
            wtab = 0
            if (url.pathname.indexOf("/list.nhn") > 0) {
                var wid = url.searchParams.get("titleId");
                if (visits[wid] && options.showHistory) {
                    var vkey = Object.keys(visits[wid])
                    for (var i = 0; i < vkey.length; i++) {
                        chrome.tabs.executeScript(tid, {
                            code: `var wlog=document.querySelector("a[href*='detail.nhn?titleId=${wid}&no=${vkey[i]}']");
                    if (wlog){
                        wlog=wlog.parentElement.parentElement;
                        wlog.style.background="lightgray";
                        wlog.title="${new Date(visits[wid][vkey[i]]*1000).toLocaleString() + '에 봄'}"
                    }`
                        })
                    }
                }
            } else if (url.pathname.indexOf("/detail.nhn") > 0) {
                wtab = tid
                var wid = url.searchParams.get("titleId");
                var no = url.searchParams.get("no")
                if (!webtoon[wid]) {
                    visits[wid] = {}
                    webtoon[wid] = {}
                    webtoon[wid].na = tab.title.split("::")[0]
                    webtoon[wid].t = url.pathname.split("/detail.nhn")[0]
                }
                visits[wid][no] = Math.floor(new Date().getTime() / 1000)
                setMax()
                //    interval = setInterval(()=>{getScrollTop()}, 500)   
                if (options.saveScroll)
                    addScrollEvent(tid)
                if (scrolls[wid] && scrolls[wid][no] && options.saveScroll)
                    setScroll(tid, scrolls[wid][no])
                autoNext(tid, options.autoNext)

                setCommant(tid, options.hiddenCommant)
                updateStorage();
            } else {
                wtab = 0
            }
        } else if (url.host === 'm.comic.naver.com') {
            chrome.tabs.insertCSS(tid, {
                code: ` #fixed_Layer {
                position: fixed;
                bottom: 20px;
                left: 20px;
                width: 60px;
                height: 40px;
                z-index: 999;
            }
            
            #arrow{
               width:40px;
               height:40px;
               border-radius: 20px;
            
            }
            #arrow:hover {
                background-color:#1111;
                cursor:pointer;
            
            }
            #arrow *{
                stroke:black;
            }`
            })

            chrome.tabs.executeScript(tid, {
                code: `
                var fixeddiv = document.createElement("div")
                fixeddiv.id="fixed_Layer"
                fixeddiv.innerHTML = \`<span id="layer-link" title="보고 있는 웹툰을 탭에서 엽니다."><svg id="arrow" width="40" height="40" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <polyline fill="none" stroke="#000"
                    stroke-width="1.03" points="13 16 7 10 13 4" /></svg> </span>\`
                document.body.appendChild(fixeddiv)
            
    document.getElementById("layer-link").addEventListener("click", function (event) {
    chrome.runtime.sendMessage("${chrome.runtime.id}", {command : 'openTab'}, ()=>{window.close()})
    }) 
    var vd = document.querySelectorAll("#toonLayer>ul>li>p>img")
    for(var i = 0; i < vd.length; i++)
{
    vd[i].setAttribute("src", vd[i].getAttribute("data-src"))
	vd[i].removeAttribute("data-src") 
}


            `
            })

            if (url.pathname.indexOf("/list.nhn") > 0) {
                var wid = url.searchParams.get("titleId");
                if (visits[wid] && options.showHistory) {
                    var vkey = Object.keys(visits[wid])
                    for (var i = 0; i < vkey.length; i++) {
                        chrome.tabs.executeScript(tid, {
                            code: `var wlog=document.querySelector("a[href*='detail.nhn?titleId=${wid}&no=${vkey[i]}']");
                    if (wlog){
                        wlog=wlog.parentElement.parentElement;
                        wlog.style.background="lightgray";
                        wlog.title="${new Date(visits[wid][vkey[i]]*1000).toLocaleString() + '에 봄'}"
                    }`
                        })
                    }
                }
            } else if (url.pathname.indexOf("/detail.nhn") > 0) {
                var wid = url.searchParams.get("titleId");
                var no = url.searchParams.get("no")
                if (!webtoon[wid]) {
                    visits[wid] = {}
                    webtoon[wid] = {}
                    webtoon[wid].na = tab.title.split("::")[0]
                    webtoon[wid].t = url.pathname.split("/detail.nhn")[0]
                }
                visits[wid][no] = Math.floor(new Date().getTime() / 1000)
                setMax()
                if (options.saveScroll) {
                    chrome.tabs.executeScript(tid, {
                        code: `
                var checkPercent;
                function checkSc( event ) {
                    window.clearTimeout( checkPercent );
                    checkPercent = setTimeout(function() {
                        chrome.runtime.sendMessage("${chrome.runtime.id}", {scroll : document.documentElement.scrollTop / document.querySelector("#toonLayer>ul").scrollHeight })
                    }, 100);
                
                }
                window.addEventListener('scroll',checkSc, false);`
                    })
                    if (scrolls[wid] && scrolls[wid][no]){
                        chrome.tabs.executeScript(tid, {code : `
                        setTimeout(()=>{document.documentElement.scrollTop = document.querySelector("#toonLayer>ul").scrollHeight * ${scrolls[wid][no] / 100}}, 500)
                        `})
                    }
                }
                updateStorage();
            }
        } else {
            wtab = 0
        }
    } else if (ci.status && ci.status == 'loading') {

    }
});

chrome.runtime.onMessage.addListener((a, b, c) => {

    var param = new URL(b.url).searchParams
    var wid = param.get("titleId")
    var no = param.get("no")
    if (a.command && a.command == 'openTab') {
        var link = b.url.replace("m.comic", "comic")
        addTab(link)
        c()
    } else if (wid && no) {
        if (options.saveScroll && a.scroll) {
            a.scroll = Math.round(a.scroll * 100)
            console.log(a)
            if (a.scroll <= 2 || a.scroll >= 98) {
                if (scrolls[wid] && scrolls[wid][no])
                    delete scrolls[wid][no]
                chrome.storage.sync.set({
                    scroll: scrolls
                })
                return;
            }

            if (!scrolls[wid]) {
                scrolls[wid] = {}
            }
            scrolls[wid][no] = a.scroll
            chrome.storage.sync.set({
                scroll: scrolls
            })
        }
    } else {
        if (a.command && a.command == 'reload') {
            location.reload()
        }
    }
})

chrome.storage.onChanged.addListener(function (changes, namespace) {
    for (key in changes) {
        if (key == 'options') {
            options = changes[key].newValue
            if (wtab != 0) {
                setCommant(wtab, options.hiddenCommant)
                autoNext(wtab, options.autoNext)
            }
        }
    }
})


chrome.runtime.onInstalled.addListener(function (details) {
    if (details.reason == 'install') {
        console.log("init start")
        initWebLog(() => {
            updateStorage()
        })
    }
    if (details.reason == "update")
    chrome.storage.sync.set({
        scroll: {}
    })
        chrome.browserAction.setBadgeText({
            text: " "
        });

})
