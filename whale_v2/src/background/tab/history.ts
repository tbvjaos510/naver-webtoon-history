import WebtoonStore, { VisitType } from "../../popup/store/webtoon";
import OptionStore from "../../popup/store/option";

export function hiddenComment(tabId: number, isMobile: boolean) {
  const code = `document.getElementById("${
    isMobile ? "cbox_module" : "commentIframe"
  }").style.display = "none"`;
  if (!tabId) {
    eval(code);
    return;
  } else
    chrome.tabs.executeScript(tabId, {
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
    chrome.runtime.sendMessage("${
      chrome.runtime.id
    }", {scroll : document.documentElement.scrollTop / document.querySelector("#toonLayer>ul").scrollHeight })
  }, 100)
}
window.addEventListener('scroll',checkSc, false);`
    : `
var checkPercent;
function checkSc( event ) {
    window.clearTimeout( checkPercent );
    checkPercent = setTimeout(function() {
chrome.runtime.sendMessage('${
        chrome.runtime.id
      }', {scroll : (document.documentElement.scrollTop - document.querySelector(".wt_viewer").childNodes[1].offsetTop) / document.querySelector(".wt_viewer").scrollHeight })
}, 100);}
window.addEventListener('scroll',checkSc, false);`;
  if (!tabId) {
    eval(code);
    return;
  }

  chrome.tabs.executeScript(tabId, {
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

  chrome.tabs.executeScript(tabId, {
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
  chrome.tabs.executeScript(tabId, {
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
        chrome.tabs.executeScript(tabId, {
          code: code
        });
    });
  }
}

export default function(webtoon: WebtoonStore, option: OptionStore) {
  chrome.tabs.onUpdated.addListener((tabId, info, tab) => {
    if (info.status && info.status === "complete") {
      const url = new URL(tab.url);
      if (url.host === "comic.naver.com") {
        // 회차 리스트 페이지
        if (url.pathname.indexOf("/list.nhn") > 0) {
          const webtoonId = url.searchParams.get("titleId");
          displayHistory(tabId, webtoonId, webtoon.visits, option.showHistory);
        }
        // 웹툰 보는 페이지
        else if (url.pathname.indexOf("/detail.nhn") > 0) {
          const webtoonId = url.searchParams.get("titleId");
          const no = url.searchParams.get("no");
          if (!webtoonId || !no) {
            return;
          }
          if (!webtoon.webtoonType[webtoonId]) {
            webtoon.visits[webtoonId] = {};
            webtoon.webtoonType[webtoonId] = {
              title: tab.title.split("::")[0].trim(),
              type: url.pathname.split("/detail.nhn")[0]
            };
          }
          webtoon.visits[webtoonId][no] = Math.floor(new Date().getTime() / 1000);
          if (option.saveScroll) {
            checkScroll(tabId, false);
          }
          if (webtoon.scrolls[webtoonId] && webtoon.scrolls[webtoonId][no]) {
            setScroll(tabId, webtoon.scrolls[webtoonId][no], false, option.scrollAlert);
          }
          if (option.autoNext) {
            console.log("autonext");
            autoNext(tabId, option.autoNext);
          }
          if (option.hiddenComment) hiddenComment(tabId, false);

          // Save to Store
          webtoon.webtoonType = webtoon.webtoonType;
          webtoon.visits = webtoon.visits;
        }
      }
    }
  });
}
