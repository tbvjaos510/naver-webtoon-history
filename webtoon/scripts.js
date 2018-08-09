var webtoon;
chrome.storage.sync.get(["webtoon"], (data) => {
    if (!data) {

    } else {
        webtoon = data.webtoon;

    }
})
var wtime = [];

function getWebtoons() {
    var wkey = Object.keys(webtoon)
    var wdata = Object.values(webtoon)

    for (var i = 0; i < wdata.length; i++) {
        for (var data of wdata[i].no) {
            wtime.push({
                id: wkey[i],
                name: wdata[i].name,
                lastVisit: data.lastVisit,
                no: data.no
            })
        }
    }
}

function sortTime() {
    wtime.sort((a, b) => {
        if (a.lastVisit < b.lastVisit)
            return 1
        else
            return -1
        return 0
    })
}
function parseHtml(str) {
    var parser = new DOMParser()
    var htmlDoc = parser.parseFromString(str, "text/html")
    return {image : htmlDoc.querySelector("meta[property='og:image']").content, name : htmlDoc.querySelector("meta[property='og:description']").content}
}
function getLogoImage(url, element) {
    var xhttp = new XMLHttpRequest();

    xhttp.open("GET", url, true)
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState === 4 && xhttp.status === 200) {
            var result = parseHtml(xhttp.responseText)
            console.log(result)
        }
    }
    xhttp.send();
}
