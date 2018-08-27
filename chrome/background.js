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
    useimglog : true
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
                wno : vkey[i],
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
    
    while (wtime.length > options.historyCount){     
        var last= wtime.pop()
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
        cb()
    })
}

function setScroll(tid, sc) {
    chrome.tabs.executeScript(tid, {
        code: `
    if (confirm("[webtoon extension] 이전에 본 기록이 남아있습니다. (${Math.round(sc.now/(sc.max-(options.hiddenCommant?2500:4000))*100)}%)\\n이어보시겠습니까?"))
        document.documentElement.scrollTop = ${sc.now}
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
    window.onbeforeunload=()=>chrome.runtime.sendMessage("${chrome.runtime.id}", {max:document.documentElement.scrollHeight,now:document.documentElement.scrollTop}, ()=>{console.log("send")})
  `
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
        } else {
            wtab = 0
        }
    }
});

chrome.runtime.onMessage.addListener((a, b, c) => {

    var param = new URL(b.url).searchParams
    var wid = param.get("titleId")
    var no = param.get("no")
    if (wid && no) {
        if (options.saveScroll) {
            if (a.max - a.now < (options.hiddenCommant ? 2500 : 4000) || a.now == 0) {
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
            scrolls[wid][no] = {
                now: a.now,
                max: a.max
            }
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
        whale.sidebarAction.setBadgeText({
            text: " "
        });

})
