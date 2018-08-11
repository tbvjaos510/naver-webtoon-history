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

var webtoon;
var wlength = 30;
var imglog = {};
var twebtoon


document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("getNext").onclick = getnextRecent
    chrome.storage.sync.get(["webtoon", "imglog"], (data) => {
        if (!data) {

        } else {
            webtoon = data.webtoon;
            if (data.imglog)
                imglog = data.imglog
            getWebtoons()
            sortTime(wlength)
            console.log("sort success")
            setRecent(0)
            console.log("recent success")

        }
    })
    var wtime = [];

    function getWebtoons() {
        wtime = [];
        var wkey = Object.keys(webtoon)
        var wdata = Object.values(webtoon)

        for (var i = 0; i < wdata.length; i++) {
            for (var data of wdata[i].no) {
                wtime.push({
                    id: wkey[i],
                    name: wdata[i].name,
                    lastVisit: data.lastVisit,
                    no: data.no,
                    type: wdata[i].type
                })
            }
        }
    }

    function addWebtoonTab() {
        var link = this.getAttribute("wlink")
        chrome.tabs.create({
            url: link
        })

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

    function getWebtoonContent(str) {
        var parser = new DOMParser()
        var htmlDoc = parser.parseFromString(str, "text/html")
        return htmlDoc.querySelector("div[class*=col_selected]")
    }

    function getWebtoon() {
        var xhttp = new XMLHttpRequest();

        xhttp.open('GET', 'https://comic.naver.com/webtoon/weekday.nhn')
        xhttp.onreadystatechange = () => {
            if (xhttp.status === 200 && xhttp.readyState === 4) {
                var WebToon = getWebtoonContent(xhttp.responseText)
                console.log(WebToon)
                twebtoon = WebToon.childNodes[1].childNodes[3].childNodes.toOddArray()
           //     document.getElementById("Today").appendChild(WebToon)
            }
        }
        xhttp.send()
    }

    getWebtoon();
})

function getContext() {
    var webtoons = twebtoon.map(e => {
        return {
            title: e.childNodes[3].title,
            href: e.childNodes[1].childNodes[1].getAttribute('href'),
            src: e.childNodes[1].childNodes[1].childNodes[1].src,
            isup : e.childNodes[1].childNodes[1].childNodes[4].tagName === 'EM',
            iscut : e.childNodes[1].childNodes[1].childNodes[6] !== undefined && e.childNodes[1].childNodes[1].childNodes[6].className === 'ico_cut',
            isnew : e.childNodes[1].childNodes[1].childNodes[6] !== undefined && e.childNodes[1].childNodes[1].childNodes[6].className === 'new'
        }
    })
    
    return webtoons

}

/*
<tr>
                    <td>
                        <a href="/webtoon/detail.nhn?titleId=570503&amp;no=231&amp;weekday=thu" onclick="clickcr(this,'lst.img','570503','231',event)">
                            <img src="https://shared-comic.pstatic.net/thumb/webtoon/570503/231/thumbnail_202x120_dd942324-8698-4387-b304-2f98bcbf1293.jpg"
                                title="228. 바다에서 생긴일 (8)" alt="228. 바다에서 생긴일 (8)" width="71" height="41" onerror="this.src='https://static-comic.pstatic.net/staticImages/COMICWEB/NAVER/img/common/non71_41.gif'">
                            <span class="mask"></span>
                        </a>
                    </td>
                    <td class="title">
                        <a href="/webtoon/detail.nhn?titleId=570503&amp;no=231&amp;weekday=thu" onclick="clickcr(this,'lst.title','570503','231',event)">228. 바다에서 생긴일 (8)</a>
                    </td>
                    
                </tr>
                 */