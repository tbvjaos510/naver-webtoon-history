import * as Utility from '../background/tab/utility';

function openTab() {
  chrome.runtime.sendMessage(chrome.runtime.id, {
    command: "openTab"
  });
  window.close();
}
function addTabButton() {
  const divElement = document.createElement("div");
  divElement.id = "fixed_Layer";
  divElement.innerHTML = `
  <span id="layer-link" title="보고 있는 웹툰을 탭에서 엽니다."><svg id="arrow" width="40" height="40" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <polyline fill="none" stroke="#000"
              stroke-width="1.03" points="13 16 7 10 13 4" /></svg> </span>
  `;
  divElement.addEventListener("click", function(event) {
    openTab();
  });
  document.documentElement.appendChild(divElement);
}

chrome.storage.sync.get("option", ({ option }) => {
  addTabButton();
  option = JSON.parse(option);
  const url = new URL(location.href);
  const titleId = url.searchParams.get("titleId");
  if (!titleId) return;
  if (url.pathname.indexOf("detail.nhn") > -1) {
    document
      .querySelectorAll("img[data-src]")
      .forEach(item => item.setAttribute("src", item.getAttribute("data-src")));
    chrome.storage[option._storeLocation].get(
      ["scrolls", "visits", "webtoon"],
      ({ scrolls = "{}", webtoon = "{}", visits = "{}" }) => {
        console.log("contentscript executed");
        const no = url.searchParams.get("no");
        if (!no) return;
        scrolls = JSON.parse(scrolls);
        webtoon = JSON.parse(webtoon);
        visits = JSON.parse(visits);
        try {
          if (scrolls[titleId] && scrolls[titleId][no]) {
            Utility.setScroll(null, scrolls[titleId][no], true, false);
          }
          if (option._saveScroll) {
            Utility.checkScroll(null, true);
          }
          if (option._hiddenComment) {
            Utility.hiddenComment(null, true);
          }
          if (option._autoNext) {
            Utility.autoNext(null, true);
          }
        } catch (e) {
          // NOTE: 컷툰일 경우에는 스크롤 저장이 불가능함.
        }

        const title = document.querySelector("meta[property='og:title']").getAttribute("content");
        const description = document
          .querySelector("meta[property='og:description']")
          .getAttribute("content");
        if (!webtoon[titleId]) {
          visits[titleId] = {};
          webtoon[titleId] = {
            title: title.replace(" - " + description, ""),
            type: url.pathname.split("/detail.nhn")[0]
          };
        }
        visits[titleId][no] = Math.floor(new Date().getTime() / 1000);

        chrome.storage[option._storeLocation].set({
          webtoon: JSON.stringify(webtoon),
          visits: JSON.stringify(visits)
        });
      }
    );
  } else if (url.pathname.indexOf("list.nhn") > -1) {
    if (option._showHistory) {
      chrome.storage[option._storeLocation].get(["visits"], ({ visits = "{}" }) => {
        Utility.displayHistory(null, titleId, JSON.parse(visits), option._showHistory);
      });
    }
  }
});
