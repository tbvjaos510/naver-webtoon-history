var isScrolling;
window.addEventListener('scroll', function (event) {
    window.clearTimeout(isScrolling);
    isScrolling = setTimeout(function () {
        console.log('scroll' + document.documentElement.scrollTop);
        chrome.runtime.sendMessage("ahdhhajckbbmbdgdbegnigodgnelgdpg", document.documentElement.scrollTop)
    }, 66);

}, false);