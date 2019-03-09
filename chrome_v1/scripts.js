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
$id = (id)=>document.getElementById(id)
var webtoon = {};
var wlength = 30;
var imglog = {};
var twebtoon
var favorate = []
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
    linktab: true,
    useFavorate: true,
    linkPopup : true
}
var notifyoption = {
    timeout: 1500
}
var maxCount;
var wsort = [];

document.addEventListener("DOMContentLoaded", function () {
    $id("getNext").onclick = getnextRecent

    function storage() {
        if (options.getLocation == 1) {
            return chrome.storage.local
        } else
            return chrome.storage.sync
    }
    chrome.storage.sync.get(["options", "scroll", "wsort", "favorate"], (data) => {
        if (!data) {
            data = {}
        } else {
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
            if (data.favorate)
              favorate=data.favorate
            if (options.getLocation == 0) {
                getHistoryWeb(() => {
                    getWebtoons()

                    sortTime(wlength)
                    console.log("sort success")
                    setRecent(0)
                    $id("loading").hidden = true
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

                    $id("loading").hidden = true
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
    function updateFavorate() {
        chrome.storage.sync.set({
            favorate: favorate
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
        $id("extension-title").onclick = addWebtoonTab

        $id("historyCount").value = options.historyCount
        $id("historyCount").addEventListener("blur", function (e) {
            if (options.getLocation == 2 && this.value > 300) {
                this.value = 300
            }
            UIkit.notification("설정 적용 중. 새로고침됩니다.", notifyoption)
            options.historyCount = this.value;
            saveOption()
            historyToStorage()
        })
        if (options.getLocation == 0) {
            $id("history").checked = true
            $id("getWebtoon").hidden = true
            $id("deleteWebtoon").hidden = true

        } else if (options.getLocation == 1) {
            $id("local").checked = true
            $id("getWebtoon").innerText = "방문 기록에서 로컬로 옮기기"
        } else {
            $id("sync").checked = true
            if (options.historyCount > 300)
                $id("historyCount").value = 300
            $id("historyCount").max = 300
            $id("getWebtoon").innerText = "방문 기록에서 계정으로 옮기기"
        }
        $id("getWebtoon").onclick = (function () {
            UIkit.notification("기록 가져오는 중..", notifyoption)
            historyToStorage()
        })
        $id("deleteWebtoon").onclick = (function () {
            storage().set({
                webtoon: {},
                visits: {}
            }, function () {
                refreshAll()
            })
        })
        $id("saveWsort").checked = options.saveWsort
        $id("saveWsort").addEventListener("change", function (event) {
            options.saveWsort = event.target.checked
            saveOption()
        })
        $id("showHistory").checked = options.showHistory
        $id("showHistory").addEventListener("change", function (event) {
            options.showHistory = event.target.checked
            saveOption()
        })
        $id("saveScroll").checked = options.saveScroll
        $id("saveScroll").addEventListener("change", function (event) {
            options.saveScroll = event.target.checked
            saveOption()
            refreshAll()
        })
        $id("history").onclick = (function () {
            options.getLocation = 0
            options.useimglog = false
            $id("historyCount").max = 10000
            saveOption()
            refreshAll()
        })
        $id("local").onclick = (function () {
            options.getLocation = 1
            $id("getWebtoon").innerText = "방문 기록에서 로컬로 옮기기"
            $id("historyCount").max = 10000
            saveOption()
            refreshAll()
        })
        $id("sync").onclick = (function () {
            if ($id("historyCount").value > 300) {
                $id("historyCount").value = 300
                options.historyCount = 300
            }
            $id("getWebtoon").innerText = "방문 기록에서 계정으로 옮기기"
            $id("historyCount").max = 300
            options.getLocation = 2
            saveOption()
            refreshAll()
        })
        $id("togithub").onclick = addWebtoonTab
        $id("naverBlog").onclick = addWebtoonTab

        $id("toIssues").onclick = addWebtoonTab
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
        $id("version").innerText = 'v' + chrome.runtime.getManifest().version;

        $id("linkTab").checked = options.linktab
        $id("linkTab").addEventListener("change", function (event) {
            options.linktab = event.target.checked
            saveOption()
        })

        $id("visitcount").innerText = count
        $id("resetWsort").onclick = resetWSort

        $id("hiddenCommant").checked = options.hiddenCommant
        $id("hiddenCommant").addEventListener("change", function (event) {
            options.hiddenCommant = event.target.checked
            saveOption()

        })
        $id("auto-next").checked = options.autoNext
        $id("auto-next").addEventListener("change", function (event) {
            options.autoNext = event.target.checked
            saveOption()

        })
        $id("linkPopup").checked = options.linkPopup
        $id("linkPopup").addEventListener("change", function(event){
            options.linkPopup = event.target.checked
            saveOption()
        })
        $id('saveFavorate').checked = options.useFavorate
        $id('saveFavorate').onclick = function () {
            options.useFavorate = !options.useFavorate

            if (!options.useFavorate) {
                $id("favorate").hidden = true
            } else {
                $id("favorate").hidden = false
            }
            getWebtoonContext()
            saveOption()
        }
        $id('deleteFavorate').addEventListener('click', function () {
            favorate = []
            chrome.storage.sync.set({
                favorate: favorate
            })
            if (today == -1)
                twebtoon = []
            getWebtoonContext()

        })
        if (!options.useFavorate) {
            $id("favorate").hidden = true
        }
        $id("removeOption").onclick = (function () {
            chrome.storage.sync.remove("options", () => {
                alert("초기화 완료. 재시작합니다.")
                location.reload();
            })
        })
        setInterval(() => {
            chrome.storage.sync.getBytesInUse(["webtoon", "visits", "imglog"], function (data) {
                $id("sync-kb").innerText = data
            })

            chrome.storage.local.getBytesInUse(["webtoon", "visits", "imglog"], function (data) {
                $id("local-kb").innerText = data
            })
        }, 2000)

        $id("remove-local").onclick = () => {
            chrome.storage.local.remove(["webtoon", "visits", "imglog"], () => {
                $id("local-kb").innerText = 0
                if (options.getLocation == 1) {
                    refreshAll()
                }
            })
        }

        $id("remove-sync").onclick = () => {
            chrome.storage.sync.remove(["webtoon", "visits", "imglog"], () => {
                $id("sync-kb").innerText = 0
                if (options.getLocation == 2) {
                    refreshAll()
                }
            })
        }
        $id("use-imglog").checked = options.useimglog
        $id("use-imglog").addEventListener("change", function (event) {
            options.useimglog = event.target.checked
            saveOption()
            storage().remove(["imglog"], () => {
                refreshAll()
            })
        })
        $id("reset-all").onclick = () => {
            storage().remove(["webtoon", "visits", "imglog"], () => {
                chrome.storage.sync.remove(["scroll", "options"], () => {
                    refreshAll()
                })
            })
        }
        $id("removeScroll").onclick = () => {
            chrome.storage.sync.remove("scroll")
            refreshAll()
        }
        // $id("refresh").onclick = () => {
        //     refreshAll()
        // }
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
                if (!wid || !wno)
                    return false
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
        if (options.linkPopup && link.indexOf("comic.naver.com") != -1) {
            link = link.replace("https://", "https://m.")
            chrome.windows.create({url:link, width:400, height:800, type:'popup'}, (wid)=>{
                wid.alwaysOnTop = true
            })
            return false;
        }
        if (options.linktab)
            chrome.tabs.create({
                url: link
            })
        else
            chrome.tabs.update({
                url: link
            })
        return false;
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
            $id("WebToonCount").innerText = "최근 웹툰 (" + wlength + "개)"
            $id("getNext").hidden = true
            return;
        }
        $id("WebToonCount").innerText = "최근 웹툰 (" + wlength + "개)"
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
        if (wtime.length > length)
            wtime.length = length;
        if (wtime.length < 30) {
            $id("getNext").hidden = true;
            $id("WebToonCount").innerText = `최근 웹툰 (${wtime.length}개)`
        }

    }
    function getFavorate() {
        var xhttp = new XMLHttpRequest()
        xhttp.open('GET', 'https://comic.naver.com/webtoon/weekday.nhn', true)
        xhttp.onreadystatechange = function () {
            if (xhttp.status == 200 && xhttp.readyState == 4) {
                var whtml = new DOMParser().parseFromString(xhttp.responseText, "text/html")
                whtml = whtml.querySelector('div.daily_all')
                wsort = favorate
                twebtoon = [];
                for (var v of wsort) {
                    twebtoon.push((whtml.querySelector('div.col_selected img[title="' + v + '"]') && whtml.querySelector('div.col_selected img[title="' + v + '"]').parentElement.parentElement.parentElement) ||
                        whtml.querySelector('img[title="' + v + '"]').parentElement.parentElement.parentElement)
                }
                today = -1;
                getWebtoonContext()
            }
        }

        xhttp.send()
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
            nameElement.innerText = imglog[web.id + '-' + web.no].name + (web.scroll ? " (" + web.scroll + "%)" : "")
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
                    nameElement.innerText = result.name + (web.scroll ? " (" + web.scroll + "%)" : "")
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
        if (startidx == 0){
            document.getElementsByClassName("recent")[0].innerHTML = ""
        }
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
            timespan.innerHTML = new Date(web.lastVisit).toLocaleString().replace(' 오', '<br>오')
            time.appendChild(timespan)
            var name = document.createElement("a")
            
            name.className = "webToonName"
            var imgEle = document.createElement("img")
            imgEle.src = "img/picture.svg"
            title.style.position = "relative"
            title.appendChild(imgEle)
            title.appendChild(name)
            img.innerText = web.name
            img.className = "webToonTitle"
            if (scrolls[web.id] && scrolls[web.id][web.no]) {
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
                no: new URL(e.querySelector('div.thumb>a').href).searchParams.get("titleId"),
                title: e.querySelector('a.title').innerText,
                href: e.querySelector('div.thumb>a').getAttribute('href'),
                src: e.querySelector('div.thumb>a>img').src,
                isup: e.querySelector('div.thumb>a>em.ico_updt') ? true : false,
                isbreak: e.querySelector('div.thumb>a>em.ico_break') ? true : false,
                inserted: false
            }
        })
        if (wsort.length === 0) {
            console.log("init wsort" + today)

            wsort = webtoons.map(e => e.title)
            // if (options.saveWsort) {
            //     var save = {}
            //     save['wsort' + today] = wsort
            //     chrome.storage.sync.set(save)
            // }
        }
        var el = $id('today-webtoon');
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
                    ${options.useFavorate==true ? ` <br>
                    <a href="" class="favo ${favorate.find((item)=>item==i.title)?'stared':''}" uk-icon="icon: star;"></a>  
        
                    </div>`:''}      </div>
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
                ${options.useFavorate==true ? ` <br>
                <a href="" class="favo ${favorate.find((item)=>item==i.title)?'stared':''}" uk-icon="icon: star;"></a>  
    
                </div>`:''}      </div>
            </div>
    `
                el.appendChild(li)
                i.inserted = true;
            }
        }


        for (var v of document.getElementsByClassName('webtoon-link'))
            v.onclick = addWebtoonTab

            for (var v of document.getElementsByClassName("favo")) {
                v.onclick = starWebtoon
            }
        return webtoons

    }


    function starWebtoon() {
        var tname = this.parentElement.querySelector("a.webtoon-link").innerText
        if (this.className.indexOf("stared") > 0) {
            var idx = favorate.find(data => tname == data)
            if (idx) {
                favorate.splice(idx, 1)
                this.className = this.className.replace('stared', '')
                updateFavorate()
            }
        } else {
            favorate.push(tname)
            this.className += " stared"
            updateFavorate()
        }

        return false
    }

    function getWebtoon(week) {
        var orders = ['ViewCount', 'Update', 'StarScore', 'TitleName']
        today = week
        chrome.storage.sync.get(['wsort' + today], (data) => {
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
                    //     $id("Today").appendChild(WebToon)
                }
            }
            xhttp.send()
        })

    }
    $id("today-webtoon").addEventListener("moved", function (i) {
        if (options.saveWsort) {
            var name = i.detail[1].querySelector('a.webtoon-link').innerText
            var startIdx = wsort.indexOf(name)
            var endIdx = getListIndex(i.detail[1])
            console.log(startIdx, endIdx)
            wsort.splice(startIdx, 1)
            wsort.splice(endIdx, 0, name)
            var save = {}
            if (today != -1)
                save['wsort' + today] = wsort
            else
                save = {
                    favorate: wsort
                }
            chrome.storage.sync.set(save)
        }
    })
    $id('week0').className = ""
    $id("favorate").className = ""
    $id('week' + today).className = "uk-active"
    $id('week' + today).childNodes[0].className = "date-today"
    for (var i = 0; i < 7; i++) {
        $id('week' + i).addEventListener('click', function () {
            getWebtoon(this.id.substr(4) * 1)
        })
    }
    $id("favorate").addEventListener('click', function () {
        getFavorate()
    })
    // 0 ~ 7 월-일,  8 오늘

    chrome.runtime.onMessage.addListener(e => {
        if (e == 'reload')
            location.reload()
    })
    chrome.storage.onChanged.addListener(function (changes, namespace) {
        for (key in changes) {
            if (key == 'webtoon') {
                webtoon = changes[key].newValue
            }
            if (key == 'visits') {
                visits = changes[key].newValue
                getWebtoons()
                sortTime(wlength)
                setRecent(0)
                getWebtoon(today);
            }
            if (key == 'scroll') {
                scrolls = changes[key].newValue;
                getWebtoons()
                sortTime(wlength)
                setRecent(0)

            }
        }
    })

})

chrome.browserAction.getBadgeText({}, function (text) {
    if (text == ' ') {

        UIkit.notification(`버전 ${chrome.runtime.getManifest().version} <div class="uk-text-small">
    업데이트 내용<br>
    1. 스크롤 저장 방식이 조금 더 정확해졌습니다. <br>
    2. 팝업에도 스크롤이 저장됩니다.
    <br>
    자세한 사항은 <a class="uk-link-muted" id="extension-link">여기</a>에서 확인 바랍니다. 
    </div>`, {
            timeout: 5000
        })
        $id("extension-link").addEventListener("click", function () {
            chrome.tabs.create({
                url: "https://chrome.google.com/webstore/detail/naver-webtoon-extensions/pkingjioiemgjlbklighjcicnjgjckok"
            })
        })
        chrome.browserAction.setBadgeText({
            text: ""
        })
    }

})