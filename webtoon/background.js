var webtoon = {};
var visits = {};
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
                visits[wid][wno] =  Math.floor(d.lastVisitTime)
                webtoon[wid].t=url.pathname.split("/detail.nhn")[0]

            } else {
                visits[wid][wno] =  Math.floor(d.lastVisitTime)
            }
        });
        updateStorage();

    })
}

chrome.storage.sync.get(['webtoon'], (result) => {
    if (!result) {
        initWebLog();
    } else {
        console.log("get from chrome storage")
        webtoon = result.webtoon
    }
})

chrome.tabs.onUpdated.addListener((tid, ci, tab) => {
    if (ci.status && ci.status == "complete") {
        var url = new URL(tab.url)
        if (url.host === "comic.naver.com") {
            if (url.pathname.indexOf("/list.nhn") > 0) {
                var wid = url.searchParams.get("titleId");
                var wt = webtoon[wid]
                console.log(wt)
                if (wt) {
                    wt.no.forEach(id => {
                        chrome.tabs.executeScript({
                            code: `var wlog=document.querySelector("a[href*='detail.nhn?titleId=${wid}&no=${id.no}']");
                    if (wlog){
                        wlog=wlog.parentElement.parentElement;
                        wlog.style.background="lightgray";
                        wlog.title="${new Date(id.lastVisit).toLocaleString() + '에 봄'}"
                    }`
                        })
                    })
                }
            } else if (url.pathname.indexOf("/detail.nhn") > 0) {
                var wid = url.searchParams.get("titleId");
                if (!webtoon[wid]) {
                    webtoon[wid] = {}
                    webtoon[wid].na = tab.title.split("::")[0]
                    webtoon[wid].c = 0;
                    webtoon[wid].no = [];
                    webtoon[wid].t=url.pathname.split("/detail.nhn")[0]
                }
                webtoon[wid].c++;
                webtoon[wid].no.unshift({
                    lvt: new Date().getTime(),
                    no: url.searchParams.get("no")
                })
                updateStorage();
            }
        }
    }
});