var ExtensionId = chrome.runtime.id
var checkPercent;
    function checkSc( event ) {
        window.clearTimeout( checkPercent );
        checkPercent = setTimeout(function() {
            chrome.runtime.sendMessage(ExtensionId, {scroll : document.documentElement.scrollTop / document.querySelector("#toonLayer>ul").scrollHeight })
        }, 100);
    
    }
if (location.href.indexOf("detail.nhn?") > -1) {
    document.body.innerHTML += `
        <div id="fixed_Layer">
            <span id="layer-link" title="보고 있는 웹툰을 탭에서 엽니다."><svg id="arrow" width="40" height="40" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <polyline fill="none" stroke="#000"
                        stroke-width="1.03" points="13 16 7 10 13 4" /></svg> </span></div>`
    document.getElementById("layer-link").addEventListener("click", function (event) {
        chrome.runtime.sendMessage(ExtensionId, {
            command : 'openTab'
        }, end => {

        })
    })

    
    window.addEventListener('scroll',checkSc, false);
 

}
if (location.href.indexOf("list.nhn?titleId") > -1) {
    document.body.innerHTML += `
        <div id="fixed_Layer">
            <span id="layer-link" title="보고 있는 웹툰을 탭에서 엽니다."><svg id="arrow" width="40" height="40" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <polyline fill="none" stroke="#000"
                        stroke-width="1.03" points="13 16 7 10 13 4" /></svg> </span></div>`
    document.getElementById("layer-link").addEventListener("click", function (event) {
        console.log(event);
        chrome.runtime.sendMessage(ExtensionId, {
            command : 'openTab'
        }, end => {

        })
    })
}


chrome.runtime.sendMessage(ExtensionId, {
    url: location.href,
    title: document.querySelector("meta[property='og:title']").content.split('-')[0].trim()
}, (data) => {
    if (data && data.visits) {
        console.log(data)
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
        setTimeout(()=>{document.documentElement.scrollTop = document.querySelector("#toonLayer>ul").scrollHeight * (data.scroll/100)}, 1000)
    }
})
