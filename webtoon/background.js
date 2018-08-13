var webtoon = {};
var visits = {};
var wtab = 0
var scrolls = {}

function updateStorage() {
    chrome.storage.sync.set({
        'webtoon': webtoon,
        'visits': visits
    }, () => {
        console.log("success")
    })
}

function initWebLog() {
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
        updateStorage();

    })
}

function setScroll(tid, sc) {
    chrome.tabs.executeScript(tid, {
        code: `
    if (confirm("[webtoon extension] 이전에 본 기록이 남아있습니다. (${Math.round(sc.now/sc.max*100)}%) 이어보시겠습니까?"))
        document.documentElement.scrollTop = ${sc.now}
    `
    }, () => {
        console.log("scroll sended")
    })
}
chrome.storage.sync.get(['webtoon', 'visits'], (result) => {
    if (!result) {
        initWebLog();
    } else {
        console.log("get from chrome storage")
        webtoon = result.webtoon
        visits = result.visits
    }
})

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
            if (url.pathname.indexOf("/list.nhn") > 0) {
                var wid = url.searchParams.get("titleId");
                if (visits[wid]) {
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
                //    interval = setInterval(()=>{getScrollTop()}, 500)   
                addScrollEvent(tid)
                if (scrolls[wid] && scrolls[wid][no])
                    setScroll(tid, scrolls[wid][no])
                updateStorage();
            }
        }
    }
});

chrome.runtime.onMessage.addListener((a, b, c) => {
    var param = new URL(b.url).searchParams
    var wid = param.get("titleId")
    var no = param.get("no")
    if (a.max - a.now < 4000 && a.now == 0) {
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
})