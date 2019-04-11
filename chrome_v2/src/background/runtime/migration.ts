export default function(prevVersion: string, curVersion: string) {
  if (prevVersion === "1.6.2") {
    chrome.storage.sync.get(syncValue => {
      chrome.storage.local.get(localValue => {
        const get = (name: string) => syncValue[name] || localValue[name];
        const oldOption = syncValue.option;
        const oldFavorate = get("favorate");
        const oldImglog = get("imglog");
        const oldWebtoon = get("webtoon");
        const oldVisits = get("visits");
        const oldScroll = get("scrolls");
        let newOption = {},
          newFavorate = {},
          newImglog = {},
          newWebtoon = {},
          newVisits = {},
          newScroll = {};
        if (oldOption) {
          newOption = {
            _storeLocation: "local",
            _orderBy: ["ViewCount", "Update", "StarScore", "TitleName"][oldOption.sort],
            _showHistory: oldOption.showHistry,
            _historyMax: oldOption.historyCount,
            _saveWebtoonSort: oldOption.saveWsort,
            _saveScroll: oldOption.saveScroll,
            _hiddenComment: oldOption.hiddenComment,
            _autoNext: oldOption.autoNext,
            _useImgLog: oldOption.useimglog,
            _saveFavorate: oldOption.useFavorate,
            _linkTarget: oldOption.linktab ? "Tab" : oldOption.linkPopup ? "Popup" : "Current",
            _scrollAlert: true,
            _useContextMenu: false
          };
        } else {
          newOption = {
            _storeLocation: "local",
            _orderBy: "ViewCount",
            _showHistory: true,
            _historyMax: 1000,
            _saveWebtoonSort: true,
            _saveScroll: true,
            _hiddenComment: false,
            _autoNext: true,
            _useImgLog: true,
            _saveFavorate: true,
            _linkTarget: "Popup",
            _scrollAlert: true,
            _useContextMenu: false
          };
        }
        if (oldWebtoon) {
          Object.keys(oldWebtoon).forEach(key => {
            newWebtoon[key] = {
              title: oldWebtoon[key].na,
              type: oldWebtoon[key].t
            };
          });
          if (oldFavorate) {
            oldFavorate.forEach(key => {
              Object.keys(newWebtoon).forEach(key2 => {
                if (newWebtoon[key2].title == key) newFavorate[key2] = true;
              });
            });
          }
        }
        if (oldVisits) newVisits = oldVisits;
        if (oldImglog) newImglog = oldImglog;
        if (oldScroll) newScroll = oldScroll;

        chrome.storage.local.set(
          {
            imglog: JSON.stringify(newImglog),
            scrolls: JSON.stringify(newScroll),
            visits: JSON.stringify(newVisits),
            webtoon: JSON.stringify(newWebtoon)
          },
          () => {
            console.log("Migration Local Success");
          }
        );
        chrome.storage.sync.set(
          {
            option: JSON.stringify(newOption),
            favorate: JSON.stringify(newFavorate)
          },
          () => {
            console.log("Migration Sync Success");
          }
        );
      });
    });
  } else if (prevVersion === "2.0.0") {
    chrome.storage.sync.get(["favorate"], ({ favorate: oldFavorate = "{}" }) => {
      oldFavorate = JSON.parse(oldFavorate);
      const newFavorate = [];
      Object.keys(oldFavorate).forEach(key => {
        if (oldFavorate[key]) {
          newFavorate.push(key);
        }
      });

      chrome.storage.sync.set({
        favorate: newFavorate
      });
    });
  }
}
