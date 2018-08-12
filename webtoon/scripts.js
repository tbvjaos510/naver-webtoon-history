// Array Even, Odd 
NodeList.prototype.toEvenArray = function () {
    return Array.prototype.slice.call(this).filter(function (e, i, a) {
        return (i % 2 === 0);
    });
}
NodeList.prototype.toOddArray = function () {
    return Array.prototype.slice.call(this).filter(function (e, i, a) {
        return (i % 2 === 1);
    });
}

function getListIndex(sender) {
    var parent = sender.parentElement
    var index, length = parent.childElementCount
    for (index = 0; index < length; index++) {
        if (sender == parent.childNodes[index])
            return index
    }
    return -1
}
var webtoon;
var wlength = 30;
var imglog = {};
var twebtoon
var visits = {}
var wtime = [];
var today = (new Date().getDay() + 6) % 7 //월~일 까지 0~7로 설정

var wsort = [];

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("getNext").onclick = getnextRecent
    chrome.storage.sync.get(["webtoon", "imglog", "visits"], (data) => {
        if (!data) {

        } else {
            console.log(data)
            webtoon = data.webtoon;
            if (data.imglog)
                imglog = data.imglog
            if (data.visits)
                visits = data.visits
            getWebtoons()
            sortTime(wlength)
            console.log("sort success")
            setRecent(0)
            console.log("recent success")

        }
    })

    function getWebtoons() {
        wtime = [];
        var wkey = Object.keys(webtoon)
        var wdata = Object.values(webtoon)

        for (var i = 0; i < wdata.length; i++) {
            var vkey = Object.keys(visits[wkey[i]])
            for (var j = 0; j < vkey.length; j++)
                wtime.push({
                    id: wkey[i],
                    name: wdata[i].na,
                    lastVisit: visits[wkey[i]][vkey[j]] * 1000,
                    no: vkey[j],
                    type: wdata[i].t
                })
        }
    }

    function addTab(link) {
        chrome.tabs.create({
            url: link
        })
    }

    function addWebtoonTab() {
        var link = this.getAttribute("wlink")
        addTab(link)

    }

    function getnextRecent() {
        wlength += 20
        getWebtoons()
        if (wtime.length + 20 < wlength) {
            wlength = wtime.length
            document.getElementById("WebToonCount").innerText = "최근 웹툰 (" + wlength + "개)"
            return;
        }
        document.getElementById("WebToonCount").innerText = "최근 웹툰 (" + wlength + "개)"
        sortTime(wlength)

        setRecent(wlength - 20)
    }

    function sortTime(length) {
        wtime.sort((a, b) => {
            if (a.lastVisit < b.lastVisit)
                return 1
            else
                return -1
            return 0
        })
        wtime.length = length;

    }

    function parseHtml(str) {
        var parser = new DOMParser()
        var htmlDoc = parser.parseFromString(str, "text/html")
        return {
            image: htmlDoc.querySelector("meta[property='og:image']").content,
            name: htmlDoc.querySelector("meta[property='og:description']").content
        }
    }

    function getOpenGraph(id, no, url, imgElement, nameElement) {
        if (imglog['' + id + no]) {
            imgElement.src = "https://shared-comic.pstatic.net/thumb/" + imglog['' + id + no].image
            imgElement.title = imgElement.alt = imglog['' + id + no].name
            nameElement.innerText = imglog['' + id + no].name
            return;
        }
        var xhttp = new XMLHttpRequest();

        xhttp.open("GET", url, true)
        xhttp.onreadystatechange = function () {
            if (xhttp.readyState === 4 && xhttp.status === 200) {
                if (xhttp.responseText) {
                    var result = parseHtml(xhttp.responseText)
                    imgElement.src = result.image
                    imgElement.title = imgElement.alt = result.name
                    nameElement.innerText = result.name
                    imglog['' + id + no] = {
                        image: result.image.split("thumb/")[1],
                        name: result.name
                    }
                }
            }
        }
        xhttp.send();
    }

    function setRecent(startidx) {
        if (!startidx) startidx = 0
        wtime.slice(startidx).forEach(web => {
            var link = `https://comic.naver.com${web.type}/detail.nhn?titleId=${web.id}&no=${web.no}`
            link;
            var wtr = document.createElement("tr")

            var img = document.createElement("td")
            img.setAttribute("wlink", `https://comic.naver.com${web.type}/list.nhn?titleId=${web.id}`)

            img.onclick = addWebtoonTab;
            var title = document.createElement("td")
            title.setAttribute("wlink", link)
            title.onclick = addWebtoonTab;
            var time = document.createElement("td")
            var timespan = document.createElement("span")
            timespan.innerText = new Date(web.lastVisit).toLocaleString()
            time.appendChild(timespan)
            var name = document.createElement("a")
            name.href = link
            name.className = "webToonName"
            var imgEle = document.createElement("img")
            imgEle.src = "img/picture.svg"
            title.appendChild(imgEle)
            title.appendChild(name)
            img.innerText = web.name
            img.className = "webToonTitle"
            wtr.appendChild(img)
            wtr.appendChild(title)
            wtr.appendChild(time)
            document.getElementsByClassName("recent")[0].appendChild(wtr)
            getOpenGraph(web.id, web.no, link, imgEle, name)
        })
        setTimeout(() => {
            if (wlength === 30)
                chrome.storage.sync.set({
                    imglog: imglog
                }, () => {
                    console.log("log refresh")
                })
        }, 2000)

    }


    function getWebtoonContent(str, week) {
        var parser = new DOMParser()
        var htmlDoc = parser.parseFromString(str, "text/html")
        if (week === 8)
            return htmlDoc.querySelector("div[class*=col_selected]")
        else
            return htmlDoc.getElementsByClassName("daily_all")[0].childNodes.toOddArray()[week]
    }

    function getWebtoonContext() {
        var webtoons = twebtoon.map(e => {
            return {
                title: e.childNodes[3].title,
                href: e.childNodes[1].childNodes[1].getAttribute('href'),
                src: e.childNodes[1].childNodes[1].childNodes[1].src,
                isup: e.childNodes[1].childNodes[1].childNodes[4] && e.childNodes[1].childNodes[1].childNodes[4].className === 'ico_updt',
                isbreak: e.childNodes[1].childNodes[1].childNodes[4] && e.childNodes[1].childNodes[1].childNodes[4].className === 'ico_break',
                inserted: false
            }
        })
        if (!wsort.length)
            wsort = webtoons.map(e => e.title)

        var el = document.getElementById('today-webtoon');
        el.innerHTML = ""
        for (var f of wsort) {
            for (var i of webtoons) {
                if (f === i.title) {
                    var li = document.createElement('li')
                    li.innerHTML += `
            <div class="uk-card uk-card-small uk-card-default">
                <div class="uk-card-media-top">
                    <img src="${i.src}" alt="${i.title}">
                    ${i.isup ? '<em class="ico-updt"></em>':""}
                    ${i.isbreak ? '<em class="ico-break"></em>':""}
                </div>
                <div class="uk-card-body">
                <a class="uk-link-muted webtoon-link" wlink="${'https://comic.naver.com'+i.href}" >${i.title}</a>
                </div><br>
            </div>
        `
                    el.appendChild(li)
                    i.inserted = true;
                }
            }
        }
        for (var i of webtoons) {
            if (!i.inserted) {
                var li = document.createElement('li')
                li.innerHTML += `
        <div class="uk-card uk-card-small uk-card-default">
            <div class="uk-card-media-top">
                <img src="${i.src}" alt="${i.title}">
                ${i.isup ? '<em class="ico-updt"></em>':""}
                ${i.isbreak ? '<em class="ico-break"></em>':""}
            </div>
            <div class="uk-card-body">
            <a class="uk-link-muted webtoon-link" wlink="${'https://comic.naver.com'+i.href}" >${i.title}</a>
            </div><br>
        </div>
    `
                el.appendChild(li)
                i.inserted = true;
            }
        }


        for (var v of document.getElementsByClassName('webtoon-link'))
            v.onclick = addWebtoonTab
        return webtoons

    }

    function getWebtoon(week) {
        console.log(week)
        today = week
        chrome.storage.sync.get(['wsort' + today], (data) => {
            if (data['wsort' + today]) {
                wsort = data['wsort' + today]
            } else wsort = []

            var xhttp = new XMLHttpRequest();

            xhttp.open('GET', 'https://comic.naver.com/webtoon/weekday.nhn')
            xhttp.onreadystatechange = () => {
                if (xhttp.status === 200 && xhttp.readyState === 4) {
                    var WebToon = getWebtoonContent(xhttp.responseText, week)
                    twebtoon = WebToon.childNodes[1].childNodes[3].childNodes.toOddArray()
                    getWebtoonContext();
                    //     document.getElementById("Today").appendChild(WebToon)
                }
            }
            xhttp.send()
        })

    }
    document.getElementById("today-webtoon").addEventListener("moved", function (i) {
        var name = i.detail[1].childNodes[1].childNodes[3].childNodes[1].innerText
        var startIdx = wsort.indexOf(name)
        var endIdx = getListIndex(i.detail[1])
        console.log(startIdx, endIdx)
        wsort.splice(startIdx, 1)
        wsort.splice(endIdx, 0, name)
        var save = {}
        save['wsort' + today] = wsort
        console.log(save)
        chrome.storage.sync.set(save)
    })
    document.getElementById('week0').className = ""
    document.getElementById('week' + today).className = "uk-active"
    document.getElementById('week' + today).childNodes[0].className = "date-today"
    for (var i = 0; i < 7; i++) {
        document.getElementById('week' + i).addEventListener('click', function () {
            getWebtoon(this.id.substr(4) * 1)
        })
    }
    // 0 ~ 7 월-일,  8 오늘
    getWebtoon(today);


})