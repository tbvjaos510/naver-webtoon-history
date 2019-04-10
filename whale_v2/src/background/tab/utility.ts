import { VisitType } from "../../popup/store/webtoon";

export function hiddenComment(tabId: number, isMobile: boolean) {
  const code = `document.getElementById("${
    isMobile ? "cbox_module" : "commentIframe"
  }").style.display = "none"`;
  if (!tabId) {
    eval(code);
    return;
  } else
    whale.tabs.executeScript(tabId, {
      code: code
    });
}

export function checkScroll(tabId: number, isMobile: boolean) {
  const code = isMobile
    ? `
  var checkPercent;
  function checkSc( event ) {
    window.clearTimeout( checkPercent );
    checkPercent = setTimeout(function() {
    whale.runtime.sendMessage("${
      whale.runtime.id
    }", {scroll : document.documentElement.scrollTop / document.querySelector("#toonLayer>ul").scrollHeight })
  }, 100)
}
window.addEventListener('scroll',checkSc, false);`
    : `
var checkPercent;
function checkSc( event ) {
    window.clearTimeout( checkPercent );
    checkPercent = setTimeout(function() {
whale.runtime.sendMessage('${
        whale.runtime.id
      }', {scroll : (document.documentElement.scrollTop - document.querySelector(".wt_viewer").childNodes[1].offsetTop) / document.querySelector(".wt_viewer").scrollHeight })
}, 100);}
window.addEventListener('scroll',checkSc, false);`;
  if (!tabId) {
    eval(code);
    return;
  }

  whale.tabs.executeScript(tabId, {
    code: code
  });
}

export function setScroll(tabId: number, scroll: number, isMobile: boolean, scrollAlert: boolean) {
  const code = isMobile
    ? `setTimeout(()=>{document.documentElement.scrollTop = document.querySelector("#toonLayer>ul").scrollHeight * ${scroll /
        100}}, 1000)`
    : scrollAlert
    ? `if (confirm("[webtoon extension] 이전에 본 기록이 남아있습니다. (${scroll}%)\\n이어보시겠습니까?"));
    document.documentElement.scrollTop = document.querySelector(".wt_viewer").childNodes[1].offsetTop + document.querySelector(".wt_viewer").scrollHeight * ${scroll /
      100}`
    : `document.documentElement.scrollTop = document.querySelector(".wt_viewer").childNodes[1].offsetTop + document.querySelector(".wt_viewer").scrollHeight * ${scroll /
        100}`;
  if (!tabId) {
    eval(code);
    return;
  }

  whale.tabs.executeScript(tabId, {
    code: code
  });
}

export function autoNext(tabId: number, isAuto: boolean) {
  const code = isAuto
    ? `var wu = new URL(window.location.href);
  console.log("AutoNext");
  wu.searchParams.set("no", wu.searchParams.get("no")*1+1)
  var isScrolling;
  function checkScrolls( event ) {
      window.clearTimeout( isScrolling );
      isScrolling = setTimeout(function() {
          if (document.documentElement.scrollHeight-document.documentElement.scrollTop<1500)
               window.location.href = wu.href;
      }, 500);

  }
  window.addEventListener('scroll',checkScrolls, false);
  `
    : `
  if (window["checkScrolls"])
  window.removeEventListener('scroll', checkScrolls)`;
  if (!tabId) {
    eval(code);
    return;
  }
  whale.tabs.executeScript(tabId, {
    code: code
  });
}
export function displayHistory(
  tabId: number,
  webtoonId: string,
  visits: VisitType,
  showHistory: boolean
) {
  if (visits[webtoonId] && showHistory) {
    Object.keys(visits[webtoonId]).forEach(key => {
      const code = `var wlog = document.querySelector("a[href*='detail.nhn?titleId=${webtoonId}&no=${key}']");
      if (wlog){
        wlog=wlog.parentElement.parentElement;
        wlog.style.background="lightgray";
        wlog.title="${new Date(visits[webtoonId][key] * 1000).toLocaleString() + "에 봄"}"
    }`;
      if (!tabId) {
        eval(code);
      } else
        whale.tabs.executeScript(tabId, {
          code: code
        });
    });
  }
}
