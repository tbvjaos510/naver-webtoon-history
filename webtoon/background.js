var webtoon = {};

function updateStorage() {
    chrome.storage.sync.set({
        'webtoon': webtoon
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
        data.forEach(d => {
            if (!d.title) return;
            var params = new URL(d.url).searchParams
            let wid = params.get("titleId")
            let wno = params.get("no")
            if (!webtoon[wid]) {
                webtoon[wid] = {}
                webtoon[wid].name = d.title.split("::")[0]
                webtoon[wid].count = 1
                webtoon[wid].no = [{
                    no: wno,
                    lastVisit: d.lastVisitTime
                }]

            } else {
                webtoon[wid].count++;
                webtoon[wid].no.unshift({
                    no: wno,
                    lastVisit: d.lastVisitTime
                })
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
                    webtoon[wid].name = tab.title.split("::")[0]
                    webtoon[wid].count = 0;
                    webtoon[wid].no = [];
                }
                webtoon[wid].count++;
                webtoon[wid].no.unshift({
                    lastVisit: new Date().getTime(),
                    no: url.searchParams.get("no")
                })
                updateStorage();
            }
        }
    }
});