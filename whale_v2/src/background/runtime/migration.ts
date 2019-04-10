export default function(prevVersion: string, curVersion: string) {
  if (prevVersion === "3.0.0") {
    whale.storage.sync.get(syncValue => {
      whale.storage.local.get(localValue => {
        const get = (name: string) => syncValue[name] || localValue[name];
        const oldOption = syncValue.option;
        const oldFavorate = get("favorate");
        const oldImglog = get("imglog");
        const oldWebtoon = get("webtoon");
        const oldVisits = get("visits");
        const oldScroll = get("scrolls");
        let newOption = {},
          newFavorate = [],
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
            _linkTarget: oldOption.linktab
              ? "Tab"
              : oldOption.linkPopup
              ? "Popup"
              : oldOption.linkSide
              ? "Sidebar"
              : "Current",
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
            _linkTarget: "Sidebar",
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
                if (newWebtoon[key2].title == key) newFavorate.push(key2);
              });
            });
          }
        }
        if (oldVisits) newVisits = oldVisits;
        if (oldImglog) newImglog = oldImglog;
        if (oldScroll) newScroll = oldScroll;

        whale.storage.local.set(
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
        whale.storage.sync.set(
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
  }
}
