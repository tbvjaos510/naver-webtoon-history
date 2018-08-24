if (location.href.indexOf("detail.nhn?") > -1) {

    window.onbeforeunload = () => chrome.runtime.sendMessage("epcjdiajnngfngmijnicdbceofdmfopg", {
        now: document.documentElement.scrollTop,
        max: document.querySelector("#toonLayer>ul").scrollHeight
    }, () => {
        console.log("send")
    })

}
document.body.innerHTML += `
    <div id="fixed_Layer">
        <span id="layer-link" title="보고 있는 웹툰을 탭에서 엽니다."><svg id="arrow" width="40" height="40" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <polyline fill="none" stroke="#000"
                    stroke-width="1.03" points="13 16 7 10 13 4" /></svg> </span></div>`


document.getElementById("layer-link").addEventListener("click", function (event) {
    if (location.href.indexOf("detail.nhn?") > -1) {
        chrome.runtime.sendMessage("epcjdiajnngfngmijnicdbceofdmfopg", {
            now: document.documentElement.scrollTop,
            max: document.querySelector("#toonLayer>ul").scrollHeight
        }, () => {

            chrome.runtime.sendMessage("epcjdiajnngfngmijnicdbceofdmfopg", {
                openTab: true
            }, end => {

                whale.sidebarAction.hide()

            })
        })
    } else {
        chrome.runtime.sendMessage("epcjdiajnngfngmijnicdbceofdmfopg", {
            openTab: true
        }, end => {

            whale.sidebarAction.hide()

        })
    }
})
chrome.runtime.sendMessage("epcjdiajnngfngmijnicdbceofdmfopg", {
    url: location.href
}, (data) => {
    if (data && data.visits) {
        var vkey = Object.keys(data.visits)
        for (var i = 0; i < vkey.length; i++) {
            var wlog = document.querySelector(`a[href*='detail.nhn?titleId=${data.wid}&no=${vkey[i]}']`)
            if (wlog) {
                wlog = wlog.parentElement
                wlog.style.background = "lightgray"
                wlog.title = `${new Date(data.visits[vkey[i]]*1000).toLocaleString()} 에 봄`
            }
        }
    } else if (data && data.scroll) {
        setTimeout(() =>
            document.documentElement.scrollTop = data.scroll.now, 1000)
    }
})
