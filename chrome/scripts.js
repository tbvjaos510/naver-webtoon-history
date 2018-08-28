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
var webtoon = {};
var wlength = 30;
var imglog = {};
var twebtoon
var visits = {}
var scrolls = {}
var wtime = [];
var today = (new Date().getDay() + 6) % 7 //월~일 까지 0~7로 설정
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
    linktab : true
}
var notifyoption = {
    timeout: 1500
}
var maxCount;
var wsort = [];

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("getNext").onclick = getnextRecent

    function storage() {
        if (options.getLocation == 1) {
            return chrome.storage.local
        } else
            return chrome.storage.sync
    }
    chrome.storage.sync.get(["options", "scroll", "wsort"], (data) => {
        if (!data) {

        } else {
            console.log(data)
            if (data.options) {
                options = data.options
            } else {
                chrome.storage.sync.set({
                    options: options
                })
            }
            if (data.scroll) {
                scrolls = data.scroll
            }

            if (options.getLocation == 0) {
                getHistoryWeb(() => {
                    getWebtoons()

                    sortTime(wlength)
                    console.log("sort success")
                    setRecent(0)
                    document.getElementById("loading").hidden = true
                    setOptionDocument()

                    getWebtoon(today);
                    console.log("recent success")
                })
            } else {
                storage().get(["webtoon", "visits", "imglog"], function (data) {
                    if (data.webtoon)
                        webtoon = data.webtoon;
                    if (data.visits)
                        visits = data.visits

                    if (data.imglog)
                        imglog = data.imglog
                    getWebtoons()

                    sortTime(wlength)
                    console.log("sort success")
                    setRecent(0)
                    console.log("recent success")

                    document.getElementById("loading").hidden = true
                    getWebtoon(today);
                    setOptionDocument()
                })
            }


        }
    })

    function resetWSort() {
        UIkit.notification("웹툰 순서가 초기화되었습니다.", notifyoption)
        wsort = [];
        chrome.storage.sync.remove(["wsort0", "wsort1", "wsort2", "wsort3", "wsort4", "wsort5", "wsort6"], () => {
            getWebtoon(today)
        })
    }

    function saveOption() {
        chrome.storage.sync.set({
            options: options
        })
    }

    function historyToStorage() {
        getHistoryWeb(() => {
            storage().set({
                webtoon: webtoon,
                visits: visits
            }, () => {
                refreshAll()
            })
        })
    }

    function refreshAll() {
        chrome.runtime.sendMessage({
            command: 'reload'
        }, () => {
            UIkit.notification("백그라운드 새로고침 시작...", notifyoption)
            setTimeout(() => {
                location.reload()
            }, 2000)
        })
    }

    function setOptionDocument() {
        document.getElementById("historyCount").value = options.historyCount
        document.getElementById("historyCount").addEventListener("blur", function (e) {
            if (options.getLocation == 2 && this.value > 300) {
                this.value = 300
            }
            UIkit.notification("설정 적용 중. 새로고침됩니다.", notifyoption)
            options.historyCount = this.value;
            saveOption()
            historyToStorage()
        })
        if (options.getLocation == 0) {
            document.getElementById("history").checked = true
            document.getElementById("getWebtoon").hidden = true
            document.getElementById("deleteWebtoon").hidden = true

        } else if (options.getLocation == 1) {
            document.getElementById("local").checked = true
            document.getElementById("getWebtoon").innerText = "방문 기록에서 로컬로 옮기기"
        } else {
            document.getElementById("sync").checked = true
            if (options.historyCount > 300)
                document.getElementById("historyCount").value = 300
            document.getElementById("historyCount").max = 300
            document.getElementById("getWebtoon").innerText = "방문 기록에서 계정으로 옮기기"
        }
        document.getElementById("getWebtoon").onclick = (function () {
            UIkit.notification("기록 가져오는 중..", notifyoption)
            historyToStorage()
        })
        document.getElementById("deleteWebtoon").onclick = (function () {
            storage().set({
                webtoon: {},
                visits: {}
            }, function () {
                refreshAll()
            })
        })
        document.getElementById("saveWsort").checked = options.saveWsort
        document.getElementById("saveWsort").addEventListener("change", function (event) {
            options.saveWsort = event.target.checked
            saveOption()
        })
        document.getElementById("showHistory").checked = options.showHistory
        document.getElementById("showHistory").addEventListener("change", function (event) {
            options.showHistory = event.target.checked
            saveOption()
        })
        document.getElementById("saveScroll").checked = options.saveScroll
        document.getElementById("saveScroll").addEventListener("change", function (event) {
            options.saveScroll = event.target.checked
            saveOption()
            refreshAll()
        })
        document.getElementById("history").onclick = (function () {
            options.getLocation = 0
            options.useimglog = false
            document.getElementById("historyCount").max = 10000
            saveOption()
            refreshAll()
        })
        document.getElementById("local").onclick = (function () {
            options.getLocation = 1
            document.getElementById("getWebtoon").innerText = "방문 기록에서 로컬로 옮기기"
            document.getElementById("historyCount").max = 10000
            saveOption()
            refreshAll()
        })
        document.getElementById("sync").onclick = (function () {
            if (document.getElementById("historyCount").value > 300) {
                document.getElementById("historyCount").value = 300
                options.historyCount = 300
            }
            document.getElementById("getWebtoon").innerText = "방문 기록에서 계정으로 옮기기"
            document.getElementById("historyCount").max = 300
            options.getLocation = 2
            saveOption()
            refreshAll()
        })
        document.getElementById("togithub").onclick=addWebtoonTab
        document.getElementById("naverBlog").onclick=addWebtoonTab

        var sorts = document.getElementsByName("websort")
        sorts[options.sort].checked = true

        sorts[0].onclick = (function () {
            options.sort = 0;
            saveOption()
            resetWSort()
        })
        sorts[1].onclick = (function () {
            options.sort = 1;
            saveOption()
            resetWSort()
        })
        sorts[2].onclick = (function () {
            options.sort = 2;
            saveOption()
            resetWSort()
        })
        sorts[3].onclick = (function () {
            options.sort = 3;
            saveOption()
            resetWSort()
        })
        var count = 0
        for (var i of Object.values(visits)) {
            count += Object.keys(i).length
        }

        document.getElementById("linkTab").checked = options.linktab
        document.getElementById("linkTab").addEventListener("change", function(event){
            options.linktab = event.target.checked
            saveOption()
        })

        document.getElementById("visitcount").innerText = count
        document.getElementById("resetWsort").onclick = resetWSort

        document.getElementById("hiddenCommant").checked = options.hiddenCommant
        document.getElementById("hiddenCommant").addEventListener("change", function (event) {
            options.hiddenCommant = event.target.checked
            saveOption()

        })
        document.getElementById("auto-next").checked = options.autoNext
        document.getElementById("auto-next").addEventListener("change", function (event) {
            options.autoNext = event.target.checked
            saveOption()

        })
        document.getElementById("removeOption").onclick = (function () {
            chrome.storage.sync.remove("options", () => {
                alert("초기화 완료. 재시작합니다.")
                location.reload();
            })
        })
        setInterval(()=>{
            chrome.storage.sync.getBytesInUse(["webtoon", "visits", "imglog"], function (data) {
                document.getElementById("sync-kb").innerText = data
            })
    
            chrome.storage.local.getBytesInUse(["webtoon", "visits", "imglog"], function (data) {
                document.getElementById("local-kb").innerText = data
            })
        }, 2000)
        
        document.getElementById("remove-local").onclick = () => {
            chrome.storage.local.remove(["webtoon", "visits", "imglog"], () => {
                document.getElementById("local-kb").innerText = 0
                if (options.getLocation == 1) {
                    refreshAll()
                }
            })
        }

        document.getElementById("remove-sync").onclick = () => {
            chrome.storage.sync.remove(["webtoon", "visits", "imglog"], () => {
                document.getElementById("sync-kb").innerText = 0
                if (options.getLocation == 2) {
                    refreshAll()
                }
            })
        }
        document.getElementById("use-imglog").checked = options.useimglog
        document.getElementById("use-imglog").addEventListener("change", function (event) {
            options.useimglog = event.target.checked
            saveOption()
            storage().remove(["imglog"], () => {
                refreshAll()
            })
        })
        document.getElementById("reset-all").onclick=()=>{
            storage().remove(["webtoon", "visits", "imglog"], ()=>{
                chrome.storage.sync.remove(["scroll", "options"], ()=>{
                    refreshAll()
                })
            })
        }
        document.getElementById("removeScroll").onclick = () => {
            chrome.storage.sync.remove("scroll")
            refreshAll()
        }
        document.getElementById("refresh").onclick = () => {
            refreshAll()
        }
    }

    function getHistoryWeb(cb) {
        chrome.history.search({
            text: "detail.nhn?titleId=",
            startTime: 0,
            maxResults: 5000
        }, (data) => {

            webtoon = {}
            visits = {}
            var index = 0
            data.forEach(d => {
                if (!d.title || index >= options.historyCount) return false;
                var url = new URL(d.url)
                var params = url.searchParams
                let wid = params.get("titleId")
                let wno = params.get("no")
                if (!webtoon[wid]) {
                    webtoon[wid] = {}
                    visits[wid] = {}
                    webtoon[wid].na = d.title.split("::")[0]
                    webtoon[wid].t = url.pathname.split("/detail.nhn")[0]

                }
                if (!visits[wid][wno]) {
                    index++
                    visits[wid][wno] = Math.floor(d.lastVisitTime / 1000)
                }
            });
            cb()
        })
    }

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
                    type: wdata[i].t,
                    scroll: scrolls[wkey[i]] ? scrolls[wkey[i]][vkey[j]] : null
                })
        }
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
            document.getElementById("getNext").hidden = true
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

    function getOpenGraph(web, url, imgElement, nameElement) {
        if (imglog[web.id + '-' + web.no] && options.useimglog) {
            imgElement.src = "https://shared-comic.pstatic.net/thumb/" + imglog[web.id + '-' + web.no].image
            imgElement.title = imgElement.alt = imglog[web.id + '-' + web.no].name
            nameElement.innerText = imglog[web.id + '-' + web.no].name + (web.scroll ? " (" + Math.round(web.scroll.now / (web.scroll.max - (options.hiddenCommant ? 2500 : 4000)) * 100) + "%)" : "")
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
                    nameElement.innerText = result.name + (web.scroll ? " (" + Math.round(web.scroll.now / (web.scroll.max - (options.hiddenCommant ? 2500 : 4000)) * 100) + "%)" : "")
                    if (options.useimglog)
                        imglog[web.id + '-' + web.no] = {
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
            if (scrolls[web.id] && scrolls[web.id][web.no]) {
                console.log(web)
                title.className += " view-webtoon"
            }
            wtr.appendChild(img)
            wtr.appendChild(title)
            wtr.appendChild(time)
            document.getElementsByClassName("recent")[0].appendChild(wtr)
            getOpenGraph(web, link, imgEle, name)
        })
        if (options.useimglog)
            setTimeout(() => {
                if (wlength === 30)
                    storage().set({
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
        var webtoons = twebtoon.map((e, i) => {
            return {
                no: new URL(e.childNodes[1].childNodes[1].href).searchParams.get("titleId"),
                title: e.childNodes[3].title,
                href: e.childNodes[1].childNodes[1].getAttribute('href'),
                src: e.childNodes[1].childNodes[1].childNodes[1].src,
                isup: e.childNodes[1].childNodes[1].childNodes[4] ? e.childNodes[1].childNodes[1].childNodes[4].className === 'ico_updt' : false,
                isbreak: e.childNodes[1].childNodes[1].childNodes[4] ? e.childNodes[1].childNodes[1].childNodes[4].className === 'ico_break' : false,
                inserted: false
            }
        })
        if (wsort.length === 0) {
            console.log("init wsort" + today)
            
            wsort = webtoons.map(e => e.title)
            if (options.saveWsort) {
                var save = {}
                save['wsort' + today] = wsort
                chrome.storage.sync.set(save)
            }
        }
        var el = document.getElementById('today-webtoon');
        el.innerHTML = ""
        for (var f of wsort) {
            for (var i of webtoons) {
                if (f === i.title) {
                    var li = document.createElement('li')
                    li.innerHTML += `
                    <div class="uk-card uk-card-small uk-card-default ">
                    <div class="uk-card-media-top">
                        <img class="webtoon-link" src="${i.src}" alt="${i.title}" wlink="${'https://comic.naver.com'+i.href}">
                        ${i.isup ? '<em class="ico-updt"></em>':""}
                        ${i.isbreak ? '<em class="ico-break"></em>':""}
                    </div>
                    <div class="uk-card-body uk-padding-small uk-padding-remove-right uk-padding-remove-left">
                    <a class="uk-link-muted webtoon-link" wlink="${'https://comic.naver.com'+i.href}" >${i.title}</a>
                    <br>
                    ${visits[i.no] ? `<a class="uk-link-muted webtoon-link" wlink="${'https://comic.naver.com/'+i.href.split('/')[1]}/detail.nhn?titleId=${i.no}&no=${Object.keys(visits[i.no])[0]}" >${(Object.keys(visits[i.no])[0])}화</a>`: "기록 없음"}
                    </div>
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
                <div class="uk-card uk-card-small uk-card-default ">
                <div class="uk-card-media-top">
                    <img class="webtoon-link" src="${i.src}" alt="${i.title}" wlink="${'https://comic.naver.com'+i.href}">
                    ${i.isup ? '<em class="ico-updt"></em>':""}
                    ${i.isbreak ? '<em class="ico-break"></em>':""}
                </div>
                <div class="uk-card-body uk-padding-small uk-padding-remove-right uk-padding-remove-left">
                <a class="uk-link-muted webtoon-link" wlink="${'https://comic.naver.com'+i.href}" >${i.title}</a>
                <br>
                ${visits[i.no] ? `<a class="uk-link-muted webtoon-link" wlink="${'https://comic.naver.com/'+i.href.split('/')[1]}/detail.nhn?titleId=${i.no}&no=${Object.keys(visits[i.no])[0]}" >${(Object.keys(visits[i.no])[0])}화</a>`: "기록 없음"}
                </div>
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
        var orders = ['ViewCount', 'Update', 'StarScore', 'TitleName']
        today = week
        chrome.storage.sync.get(['wsort' + today], (data) => {
            console.log(data)
            if (data['wsort' + today]) {
                wsort = data['wsort' + today]
            } else wsort = []

            var xhttp = new XMLHttpRequest();

            xhttp.open('GET', 'https://comic.naver.com/webtoon/weekday.nhn?order=' + orders[options.sort])
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
        if (options.saveWsort) {
            var name = i.detail[1].childNodes[1].childNodes[3].childNodes[1].innerText
            var startIdx = wsort.indexOf(name)
            var endIdx = getListIndex(i.detail[1])
            console.log(startIdx, endIdx)
            wsort.splice(startIdx, 1)
            wsort.splice(endIdx, 0, name)
            var save = {}
            save['wsort' + today] = wsort
            chrome.storage.sync.set(save)
        }
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

    chrome.runtime.onMessage.addListener(e => {
        if (e == 'reload')
            location.reload()
    })

})

chrome.browserAction.getBadgeText({}, function(text){
    if (text == ' '){
        
        UIkit.notification(`버전 ${chrome.runtime.getManifest().version} <div class="uk-text-small">
    업데이트 내용<br>
    1. 요일별 웹툰 카드 크기 줄임 <br>
    2. 최근 본 웹툰에서 웹툰 제목을 중간으로 옮김 <br>
    3. 웹툰 제목 정상화 <br>
    자세한 사항은 <a class="uk-link-muted" id="extension-link">여기</a>에서 확인 바랍니다. 
    </div>`, {
            timeout: 5000
        })
        document.getElementById("extension-link").addEventListener("click", function () {
            chrome.tabs.create({
                url: "https://chrome.google.com/webstore/detail/naver-webtoon-extensions/pkingjioiemgjlbklighjcicnjgjckok"
            })
        })
        chrome.browserAction.setBadgeText({
            text: ""
        })
    }

})