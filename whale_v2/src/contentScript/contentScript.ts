import * as Utility from "../background/tab/utility";

function openTab() {
  whale.runtime.sendMessage(
    whale.runtime.id,
    {
      command: "openTab"
    },
    end => {
      window.close();
    }
  );
}
function addTabButton() {
  document.body.innerHTML += `
        <div id="fixed_Layer">
            <span id="layer-link" title="보고 있는 웹툰을 탭에서 엽니다."><svg id="arrow" width="40" height="40" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <polyline fill="none" stroke="#000"
                        stroke-width="1.03" points="13 16 7 10 13 4" /></svg> </span></div>`;
  document.getElementById("layer-link").addEventListener("click", function(event) {
    openTab();
  });
}

whale.storage.sync.get("option", ({ option }) => {
  addTabButton();
  option = JSON.parse(option);
  const url = new URL(location.href);
  const titleId = url.searchParams.get("titleId");
  if (!titleId) return;
  if (url.pathname.indexOf("detail.nhn") > -1) {
    document
      .querySelectorAll("img[data-src]")
      .forEach(item => item.setAttribute("src", item.getAttribute("data-src")));
    whale.storage[option._storeLocation].get(["scrolls"], ({ scrolls = "{}" }) => {
      const no = url.searchParams.get("no");
      const scroll = JSON.parse(scrolls);
      if (scroll[titleId] && scroll[titleId][no]) {
        Utility.setScroll(null, scroll[titleId][no], true, false);
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
    });
  } else if (url.pathname.indexOf("list.nhn") > -1) {
    if (option._showHistory) {
      whale.storage[option._storeLocation].get(["visits"], ({ visits = "{}" }) => {
        Utility.displayHistory(null, titleId, JSON.parse(visits), option._showHistory);
      });
    }
  }
});
