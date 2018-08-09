var webtoon;

var imglog = {};
chrome.storage.sync.get(["webtoon", "imglog"], (data) => {
    if (!data) {

    } else {
        webtoon = data.webtoon;
        if (data.imglog)
            imglog = data.imglog
        getWebtoons()
        sortTime()
        console.log("sort success")
        //   setRecent()
        console.log("recent success")
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
                no: data.no,
                type: wdata[i].type
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
    return {
        image: htmlDoc.querySelector("meta[property='og:image']").content,
        name: htmlDoc.querySelector("meta[property='og:description']").content
    }
}

function getOpenGraph(id,no, url, imgElement, nameElement) {
    if (imglog[''+id+no]) {
        console.log("get log", imglog[id])
        imgElement.src = "https://shared-comic.pstatic.net/thumb/" + imglog[id].image
        imgElement.title = imgElement.alt = imglog[id].name
        nameElement.innerText = imglog[id].name
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
                imglog[''+id+no] = {image : result.image.split("thumb/")[1], name:result.name}
            }
        }
    }
    xhttp.send();
}

function setRecent() {
    wtime.forEach(web => {
        var link = `https://comic.naver.com${web.type}/detail.nhn?titleId=${web.id}&no=${web.no}`
        link;
        var wtr = document.createElement("tr")
        var img = document.createElement("td")
        var title = document.createElement("td")
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


        wtr.appendChild(img)
        wtr.appendChild(title)
        wtr.appendChild(time)
        document.getElementsByClassName("recent")[0].appendChild(wtr)
        getOpenGraph(web.id,web.no, link, imgEle, name)
    })
    chrome.storage.sync.set({
     imglog: imglog
    }, () => {
        console.log("log refresh")
    })
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