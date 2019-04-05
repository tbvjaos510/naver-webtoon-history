import WebtoonStore from "../../popup/store/webtoon";
import OptionStore from "../../popup/store/option";
import { toJS } from "mobx";

export default (webtoon: WebtoonStore, option: OptionStore) => {
  function displayHistory(tabId: number, webtoonId: string) {
    if (webtoon.visits[webtoonId] && option.showHistory) {
      Object.keys(webtoon.visits[webtoonId]).forEach(key => {
        chrome.tabs.executeScript(tabId, {
          code: `var wlog = document.querySelector("a[href*='detail.nhn?titleId=${webtoonId}&no=${key}']");
          if (wlog){
            wlog=wlog.parentElement.parentElement;
            wlog.style.background="lightgray";
            wlog.title="${new Date(webtoon.visits[webtoonId][key] * 1000).toLocaleString() +
              "에 봄"}"
        }`
        });
      });
    }
  }

  function hiddenComment(tabId: number, isMobile: boolean) {
    chrome.tabs.executeScript(tabId, {
      code: `document.getElementById("${
        isMobile ? "cbox_module" : "commentIframe"
      }").style.display = "none"`
    });
  }

  function checkScroll(tabId: number, isMobile: boolean) {
    if (isMobile) {
      chrome.tabs.executeScript(tabId, {
        code: `
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
      });
    } else {
      chrome.tabs.executeScript(tabId, {
        code: `
      var checkPercent;
      function checkSc( event ) {
          window.clearTimeout( checkPercent );
          checkPercent = setTimeout(function() {
      chrome.runtime.sendMessage('${
        chrome.runtime.id
      }', {scroll : (document.documentElement.scrollTop - document.querySelector(".wt_viewer").childNodes[1].offsetTop) / document.querySelector(".wt_viewer").scrollHeight })
      }, 100);}
      window.addEventListener('scroll',checkSc, false);`
      });
    }
  }

  function setScroll(tabId: number, scroll: number, isMobile: boolean) {
    if (isMobile)
      chrome.tabs.executeScript(tabId, {
        code: `setTimeout(()=>{document.documentElement.scrollTop = document.querySelector("#toonLayer>ul").scrollHeight * ${scroll /
          100}}, 500)
                          `
      });
    else {
      if (option.scrollAlert) {
        chrome.tabs.executeScript(tabId, {
          code: `if (confirm("[webtoon extension] 이전에 본 기록이 남아있습니다. (${scroll}%)\\n이어보시겠습니까?"));
      document.documentElement.scrollTop = document.querySelector(".wt_viewer").childNodes[1].offsetTop + document.querySelector(".wt_viewer").scrollHeight * ${scroll /
        100}`
        });
      } else {
        chrome.tabs.executeScript(tabId, {
          code: `document.documentElement.scrollTop = document.querySelector(".wt_viewer").childNodes[1].offsetTop + document.querySelector(".wt_viewer").scrollHeight * ${scroll /
            100}`
        });
      }
    }
  }

  function autoNext(tabId: number, isAuto: boolean) {
    if (isAuto)
      chrome.tabs.executeScript(tabId, {
        code: `var wu = new URL(window.location.href);
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
      });
    else {
      chrome.tabs.executeScript(tabId, {
        code: `
        if (window["checkScrolls"])
        window.removeEventListener('scroll', checkScrolls)`
      });
    }
  }
  chrome.tabs.onUpdated.addListener((tabId, info, tab) => {
    if (info.status && info.status === "complete") {
      const url = new URL(tab.url);
      if (url.host === "comic.naver.com") {
        // 회차 리스트 페이지
        if (url.pathname.indexOf("/list.nhn") > 0) {
          const webtoonId = url.searchParams.get("titleId");
          displayHistory(tabId, webtoonId);
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
            setScroll(tabId, webtoon.scrolls[webtoonId][no], false);
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
      // 모바일 창
      else if (url.host === "m.comic.naver.com") {
        chrome.tabs.insertCSS(tabId, {
          code: `#fixed_Layer {
            position: fixed;
            bottom: 20px;
            left: 20px;
            width: 60px;
            height: 40px;
            z-index: 999;
        }
        
        #arrow{
           width:40px;
           height:40px;
           border-radius: 20px;
        
        }
        #arrow:hover {
            background-color:#1111;
            cursor:pointer;
        
        }
        #arrow *{
            stroke:black;
        }`
        });

        chrome.tabs.executeScript(tabId, {
          code: `
          var fixeddiv = document.createElement("div")
          fixeddiv.id="fixed_Layer"
          fixeddiv.innerHTML = \`<span id="layer-link" title="보고 있는 웹툰을 탭에서 엽니다."><svg id="arrow" width="40" height="40" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <polyline fill="none" stroke="#000"
              stroke-width="1.03" points="13 16 7 10 13 4" /></svg> </span>\`
          document.body.appendChild(fixeddiv)
          document.getElementById("layer-link").addEventListener("click", function (event) {
          chrome.runtime.sendMessage("${
            chrome.runtime.id
          }", {command : 'openTab'}, ()=>{window.close()})
          }) 
          var vd = document.querySelectorAll("#toonLayer>ul>li>p>img")
          for(var i = 0; i < vd.length; i++)
          {
          vd[i].setAttribute("src", vd[i].getAttribute("data-src"))
          vd[i].removeAttribute("data-src") 
          }
          console.log("test");
      `
        });

        if (url.pathname.indexOf("/list.nhn") > 0) {
          const webtoonId = url.searchParams.get("titleId");
          displayHistory(tabId, webtoonId);
        } else if (url.pathname.indexOf("/detail.nhn") > 0) {
          const webtoonId = url.searchParams.get("titleId");
          const no = url.searchParams.get("no");
          if (!webtoonId || !no) {
            return;
          }
          console.log(tabId);
          chrome.tabs.executeScript(
            tabId,
            {
              code: `[document.querySelector("meta[property='og:title']").getAttribute("content"),
          document.querySelector("meta[property='og:description']").getAttribute("content")]`
            },
            result => {
              if (!webtoon.webtoonType[webtoonId]) {
                webtoon.visits[webtoonId] = {};
                webtoon.webtoonType[webtoonId] = {
                  title: (result[0] as string[])[0].replace(" - " + result[0][1], ""),
                  type: url.pathname.split("/detail.nhn")[0]
                };
              }

              webtoon.visits[webtoonId][no] = Math.floor(new Date().getTime() / 1000);

              if (option.saveScroll) {
                checkScroll(tabId, true);
              }
              if (webtoon.scrolls[webtoonId] && webtoon.scrolls[webtoonId][no]) {
                setScroll(tabId, webtoon.scrolls[webtoonId][no], true);
              }
              if (option.hiddenComment) {
                hiddenComment(tabId, true);
              }
              webtoon.visits = webtoon.visits;
              webtoon.webtoonType = webtoon.webtoonType;
            }
          );
        }
      }
    }
  });
};
