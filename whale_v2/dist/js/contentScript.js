/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/contentScript/contentScript.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/background/tab/history.ts":
/*!***************************************!*\
  !*** ./src/background/tab/history.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function hiddenComment(tabId, isMobile) {
    const code = `document.getElementById("${isMobile ? "cbox_module" : "commentIframe"}").style.display = "none"`;
    if (!tabId) {
        eval(code);
        return;
    }
    else
        chrome.tabs.executeScript(tabId, {
            code: code
        });
}
exports.hiddenComment = hiddenComment;
function checkScroll(tabId, isMobile) {
    const code = isMobile
        ? `
  var checkPercent;
  function checkSc( event ) {
    window.clearTimeout( checkPercent );
    checkPercent = setTimeout(function() {
    chrome.runtime.sendMessage("${chrome.runtime.id}", {scroll : document.documentElement.scrollTop / document.querySelector("#toonLayer>ul").scrollHeight })
  }, 100)
}
window.addEventListener('scroll',checkSc, false);`
        : `
var checkPercent;
function checkSc( event ) {
    window.clearTimeout( checkPercent );
    checkPercent = setTimeout(function() {
chrome.runtime.sendMessage('${chrome.runtime.id}', {scroll : (document.documentElement.scrollTop - document.querySelector(".wt_viewer").childNodes[1].offsetTop) / document.querySelector(".wt_viewer").scrollHeight })
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
exports.checkScroll = checkScroll;
function setScroll(tabId, scroll, isMobile, scrollAlert) {
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
exports.setScroll = setScroll;
function autoNext(tabId, isAuto) {
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
exports.autoNext = autoNext;
function displayHistory(tabId, webtoonId, visits, showHistory) {
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
            }
            else
                chrome.tabs.executeScript(tabId, {
                    code: code
                });
        });
    }
}
exports.displayHistory = displayHistory;
function default_1(webtoon, option) {
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
                    if (option.hiddenComment)
                        hiddenComment(tabId, false);
                    // Save to Store
                    webtoon.webtoonType = webtoon.webtoonType;
                    webtoon.visits = webtoon.visits;
                }
            }
        }
    });
}
exports.default = default_1;


/***/ }),

/***/ "./src/contentScript/contentScript.ts":
/*!********************************************!*\
  !*** ./src/contentScript/contentScript.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const history_1 = __webpack_require__(/*! ../background/tab/history */ "./src/background/tab/history.ts");
function openTab() {
    chrome.runtime.sendMessage(chrome.runtime.id, {
        command: "openTab"
    }, end => {
        window.close();
    });
}
function addTabButton() {
    document.body.innerHTML += `
        <div id="fixed_Layer">
            <span id="layer-link" title="보고 있는 웹툰을 탭에서 엽니다."><svg id="arrow" width="40" height="40" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <polyline fill="none" stroke="#000"
                        stroke-width="1.03" points="13 16 7 10 13 4" /></svg> </span></div>`;
    document.getElementById("layer-link").addEventListener("click", function (event) {
        openTab();
    });
}
chrome.storage.sync.get("option", ({ option }) => {
    addTabButton();
    option = JSON.parse(option);
    const url = new URL(location.href);
    const titleId = url.searchParams.get("titleId");
    if (!titleId)
        return;
    if (url.pathname.indexOf("detail.nhn") > -1) {
        document
            .querySelectorAll("img[data-src]")
            .forEach(item => item.setAttribute("src", item.getAttribute("data-src")));
        chrome.storage[option._storeLocation].get(["scrolls"], ({ scrolls = "{}" }) => {
            const no = url.searchParams.get("no");
            const scroll = JSON.parse(scrolls);
            if (scroll[titleId] && scroll[titleId][no]) {
                history_1.setScroll(null, scroll[titleId][no], true, false);
            }
            if (option._saveScroll) {
                history_1.checkScroll(null, true);
            }
            if (option._hiddenComment) {
                history_1.hiddenComment(null, true);
            }
            if (option._autoNext) {
                history_1.autoNext(null, true);
            }
        });
    }
    else if (url.pathname.indexOf("list.nhn") > -1) {
        if (option._showHistory) {
            chrome.storage[option._storeLocation].get(["visits"], ({ visits = "{}" }) => {
                history_1.displayHistory(null, titleId, JSON.parse(visits), option._showHistory);
            });
        }
    }
});


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JhY2tncm91bmQvdGFiL2hpc3RvcnkudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnRlbnRTY3JpcHQvY29udGVudFNjcmlwdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUMvRUEsdUJBQThCLEtBQWEsRUFBRSxRQUFpQjtJQUM1RCxNQUFNLElBQUksR0FBRyw0QkFDWCxRQUFRLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsZUFDN0IsMkJBQTJCLENBQUM7SUFDNUIsSUFBSSxDQUFDLEtBQUssRUFBRTtRQUNWLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNYLE9BQU87S0FDUjs7UUFDQyxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUU7WUFD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QUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUFFLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUN6RSxDQUFDLENBQUMsQ0FBQztTQUNKO0tBQ0Y7QUFDSCxDQUFDLENBQUMsQ0FBQyIsImZpbGUiOiJjb250ZW50U2NyaXB0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvY29udGVudFNjcmlwdC9jb250ZW50U2NyaXB0LnRzXCIpO1xuIiwiaW1wb3J0IFdlYnRvb25TdG9yZSwgeyBWaXNpdFR5cGUgfSBmcm9tIFwiLi4vLi4vcG9wdXAvc3RvcmUvd2VidG9vblwiO1xyXG5pbXBvcnQgT3B0aW9uU3RvcmUgZnJvbSBcIi4uLy4uL3BvcHVwL3N0b3JlL29wdGlvblwiO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGhpZGRlbkNvbW1lbnQodGFiSWQ6IG51bWJlciwgaXNNb2JpbGU6IGJvb2xlYW4pIHtcclxuICBjb25zdCBjb2RlID0gYGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiJHtcclxuICAgIGlzTW9iaWxlID8gXCJjYm94X21vZHVsZVwiIDogXCJjb21tZW50SWZyYW1lXCJcclxuICB9XCIpLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcImA7XHJcbiAgaWYgKCF0YWJJZCkge1xyXG4gICAgZXZhbChjb2RlKTtcclxuICAgIHJldHVybjtcclxuICB9IGVsc2VcclxuICAgIGNocm9tZS50YWJzLmV4ZWN1dGVTY3JpcHQodGFiSWQsIHtcclxuICAgICAgY29kZTogY29kZVxyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjaGVja1Njcm9sbCh0YWJJZDogbnVtYmVyLCBpc01vYmlsZTogYm9vbGVhbikge1xyXG4gIGNvbnN0IGNvZGUgPSBpc01vYmlsZVxyXG4gICAgPyBgXHJcbiAgdmFyIGNoZWNrUGVyY2VudDtcclxuICBmdW5jdGlvbiBjaGVja1NjKCBldmVudCApIHtcclxuICAgIHdpbmRvdy5jbGVhclRpbWVvdXQoIGNoZWNrUGVyY2VudCApO1xyXG4gICAgY2hlY2tQZXJjZW50ID0gc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgIGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKFwiJHtcclxuICAgICAgY2hyb21lLnJ1bnRpbWUuaWRcclxuICAgIH1cIiwge3Njcm9sbCA6IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3AgLyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Rvb25MYXllcj51bFwiKS5zY3JvbGxIZWlnaHQgfSlcclxuICB9LCAxMDApXHJcbn1cclxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsY2hlY2tTYywgZmFsc2UpO2BcclxuICAgIDogYFxyXG52YXIgY2hlY2tQZXJjZW50O1xyXG5mdW5jdGlvbiBjaGVja1NjKCBldmVudCApIHtcclxuICAgIHdpbmRvdy5jbGVhclRpbWVvdXQoIGNoZWNrUGVyY2VudCApO1xyXG4gICAgY2hlY2tQZXJjZW50ID0gc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2UoJyR7XHJcbiAgICAgICAgY2hyb21lLnJ1bnRpbWUuaWRcclxuICAgICAgfScsIHtzY3JvbGwgOiAoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcCAtIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIud3Rfdmlld2VyXCIpLmNoaWxkTm9kZXNbMV0ub2Zmc2V0VG9wKSAvIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIud3Rfdmlld2VyXCIpLnNjcm9sbEhlaWdodCB9KVxyXG59LCAxMDApO31cclxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsY2hlY2tTYywgZmFsc2UpO2A7XHJcbiAgaWYgKCF0YWJJZCkge1xyXG4gICAgZXZhbChjb2RlKTtcclxuICAgIHJldHVybjtcclxuICB9XHJcblxyXG4gIGNocm9tZS50YWJzLmV4ZWN1dGVTY3JpcHQodGFiSWQsIHtcclxuICAgIGNvZGU6IGNvZGVcclxuICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHNldFNjcm9sbCh0YWJJZDogbnVtYmVyLCBzY3JvbGw6IG51bWJlciwgaXNNb2JpbGU6IGJvb2xlYW4sIHNjcm9sbEFsZXJ0OiBib29sZWFuKSB7XHJcbiAgY29uc3QgY29kZSA9IGlzTW9iaWxlXHJcbiAgICA/IGBzZXRUaW1lb3V0KCgpPT57ZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdG9vbkxheWVyPnVsXCIpLnNjcm9sbEhlaWdodCAqICR7c2Nyb2xsIC9cclxuICAgICAgICAxMDB9fSwgMTAwMClgXHJcbiAgICA6IHNjcm9sbEFsZXJ0XHJcbiAgICA/IGBpZiAoY29uZmlybShcIlt3ZWJ0b29uIGV4dGVuc2lvbl0g7J207KCE7JeQIOuzuCDquLDroZ3snbQg64Ko7JWE7J6I7Iq164uI64ukLiAoJHtzY3JvbGx9JSlcXFxcbuydtOyWtOuztOyLnOqyoOyKteuLiOq5jD9cIikpO1xyXG4gICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIud3Rfdmlld2VyXCIpLmNoaWxkTm9kZXNbMV0ub2Zmc2V0VG9wICsgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi53dF92aWV3ZXJcIikuc2Nyb2xsSGVpZ2h0ICogJHtzY3JvbGwgL1xyXG4gICAgICAxMDB9YFxyXG4gICAgOiBgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIud3Rfdmlld2VyXCIpLmNoaWxkTm9kZXNbMV0ub2Zmc2V0VG9wICsgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi53dF92aWV3ZXJcIikuc2Nyb2xsSGVpZ2h0ICogJHtzY3JvbGwgL1xyXG4gICAgICAgIDEwMH1gO1xyXG4gIGlmICghdGFiSWQpIHtcclxuICAgIGV2YWwoY29kZSk7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG5cclxuICBjaHJvbWUudGFicy5leGVjdXRlU2NyaXB0KHRhYklkLCB7XHJcbiAgICBjb2RlOiBjb2RlXHJcbiAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBhdXRvTmV4dCh0YWJJZDogbnVtYmVyLCBpc0F1dG86IGJvb2xlYW4pIHtcclxuICBjb25zdCBjb2RlID0gaXNBdXRvXHJcbiAgICA/IGB2YXIgd3UgPSBuZXcgVVJMKHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcclxuICBjb25zb2xlLmxvZyhcIkF1dG9OZXh0XCIpO1xyXG4gIHd1LnNlYXJjaFBhcmFtcy5zZXQoXCJub1wiLCB3dS5zZWFyY2hQYXJhbXMuZ2V0KFwibm9cIikqMSsxKVxyXG4gIHZhciBpc1Njcm9sbGluZztcclxuICBmdW5jdGlvbiBjaGVja1Njcm9sbHMoIGV2ZW50ICkge1xyXG4gICAgICB3aW5kb3cuY2xlYXJUaW1lb3V0KCBpc1Njcm9sbGluZyApO1xyXG4gICAgICBpc1Njcm9sbGluZyA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICBpZiAoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbEhlaWdodC1kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wPDE1MDApXHJcbiAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gd3UuaHJlZjtcclxuICAgICAgfSwgNTAwKTtcclxuXHJcbiAgfVxyXG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLGNoZWNrU2Nyb2xscywgZmFsc2UpO1xyXG4gIGBcclxuICAgIDogYFxyXG4gIGlmICh3aW5kb3dbXCJjaGVja1Njcm9sbHNcIl0pXHJcbiAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIGNoZWNrU2Nyb2xscylgO1xyXG4gIGlmICghdGFiSWQpIHtcclxuICAgIGV2YWwoY29kZSk7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG4gIGNocm9tZS50YWJzLmV4ZWN1dGVTY3JpcHQodGFiSWQsIHtcclxuICAgIGNvZGU6IGNvZGVcclxuICB9KTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gZGlzcGxheUhpc3RvcnkoXHJcbiAgdGFiSWQ6IG51bWJlcixcclxuICB3ZWJ0b29uSWQ6IHN0cmluZyxcclxuICB2aXNpdHM6IFZpc2l0VHlwZSxcclxuICBzaG93SGlzdG9yeTogYm9vbGVhblxyXG4pIHtcclxuICBpZiAodmlzaXRzW3dlYnRvb25JZF0gJiYgc2hvd0hpc3RvcnkpIHtcclxuICAgIE9iamVjdC5rZXlzKHZpc2l0c1t3ZWJ0b29uSWRdKS5mb3JFYWNoKGtleSA9PiB7XHJcbiAgICAgIGNvbnN0IGNvZGUgPSBgdmFyIHdsb2cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYVtocmVmKj0nZGV0YWlsLm5obj90aXRsZUlkPSR7d2VidG9vbklkfSZubz0ke2tleX0nXVwiKTtcclxuICAgICAgaWYgKHdsb2cpe1xyXG4gICAgICAgIHdsb2c9d2xvZy5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQ7XHJcbiAgICAgICAgd2xvZy5zdHlsZS5iYWNrZ3JvdW5kPVwibGlnaHRncmF5XCI7XHJcbiAgICAgICAgd2xvZy50aXRsZT1cIiR7bmV3IERhdGUodmlzaXRzW3dlYnRvb25JZF1ba2V5XSAqIDEwMDApLnRvTG9jYWxlU3RyaW5nKCkgKyBcIuyXkCDrtIRcIn1cIlxyXG4gICAgfWA7XHJcbiAgICAgIGlmICghdGFiSWQpIHtcclxuICAgICAgICBldmFsKGNvZGUpO1xyXG4gICAgICB9IGVsc2VcclxuICAgICAgICBjaHJvbWUudGFicy5leGVjdXRlU2NyaXB0KHRhYklkLCB7XHJcbiAgICAgICAgICBjb2RlOiBjb2RlXHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHdlYnRvb246IFdlYnRvb25TdG9yZSwgb3B0aW9uOiBPcHRpb25TdG9yZSkge1xyXG4gIGNocm9tZS50YWJzLm9uVXBkYXRlZC5hZGRMaXN0ZW5lcigodGFiSWQsIGluZm8sIHRhYikgPT4ge1xyXG4gICAgaWYgKGluZm8uc3RhdHVzICYmIGluZm8uc3RhdHVzID09PSBcImNvbXBsZXRlXCIpIHtcclxuICAgICAgY29uc3QgdXJsID0gbmV3IFVSTCh0YWIudXJsKTtcclxuICAgICAgaWYgKHVybC5ob3N0ID09PSBcImNvbWljLm5hdmVyLmNvbVwiKSB7XHJcbiAgICAgICAgLy8g7ZqM7LCoIOumrOyKpO2KuCDtjpjsnbTsp4BcclxuICAgICAgICBpZiAodXJsLnBhdGhuYW1lLmluZGV4T2YoXCIvbGlzdC5uaG5cIikgPiAwKSB7XHJcbiAgICAgICAgICBjb25zdCB3ZWJ0b29uSWQgPSB1cmwuc2VhcmNoUGFyYW1zLmdldChcInRpdGxlSWRcIik7XHJcbiAgICAgICAgICBkaXNwbGF5SGlzdG9yeSh0YWJJZCwgd2VidG9vbklkLCB3ZWJ0b29uLnZpc2l0cywgb3B0aW9uLnNob3dIaXN0b3J5KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8g7Ju57YiwIOuztOuKlCDtjpjsnbTsp4BcclxuICAgICAgICBlbHNlIGlmICh1cmwucGF0aG5hbWUuaW5kZXhPZihcIi9kZXRhaWwubmhuXCIpID4gMCkge1xyXG4gICAgICAgICAgY29uc3Qgd2VidG9vbklkID0gdXJsLnNlYXJjaFBhcmFtcy5nZXQoXCJ0aXRsZUlkXCIpO1xyXG4gICAgICAgICAgY29uc3Qgbm8gPSB1cmwuc2VhcmNoUGFyYW1zLmdldChcIm5vXCIpO1xyXG4gICAgICAgICAgaWYgKCF3ZWJ0b29uSWQgfHwgIW5vKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmICghd2VidG9vbi53ZWJ0b29uVHlwZVt3ZWJ0b29uSWRdKSB7XHJcbiAgICAgICAgICAgIHdlYnRvb24udmlzaXRzW3dlYnRvb25JZF0gPSB7fTtcclxuICAgICAgICAgICAgd2VidG9vbi53ZWJ0b29uVHlwZVt3ZWJ0b29uSWRdID0ge1xyXG4gICAgICAgICAgICAgIHRpdGxlOiB0YWIudGl0bGUuc3BsaXQoXCI6OlwiKVswXS50cmltKCksXHJcbiAgICAgICAgICAgICAgdHlwZTogdXJsLnBhdGhuYW1lLnNwbGl0KFwiL2RldGFpbC5uaG5cIilbMF1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHdlYnRvb24udmlzaXRzW3dlYnRvb25JZF1bbm9dID0gTWF0aC5mbG9vcihuZXcgRGF0ZSgpLmdldFRpbWUoKSAvIDEwMDApO1xyXG4gICAgICAgICAgaWYgKG9wdGlvbi5zYXZlU2Nyb2xsKSB7XHJcbiAgICAgICAgICAgIGNoZWNrU2Nyb2xsKHRhYklkLCBmYWxzZSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAod2VidG9vbi5zY3JvbGxzW3dlYnRvb25JZF0gJiYgd2VidG9vbi5zY3JvbGxzW3dlYnRvb25JZF1bbm9dKSB7XHJcbiAgICAgICAgICAgIHNldFNjcm9sbCh0YWJJZCwgd2VidG9vbi5zY3JvbGxzW3dlYnRvb25JZF1bbm9dLCBmYWxzZSwgb3B0aW9uLnNjcm9sbEFsZXJ0KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmIChvcHRpb24uYXV0b05leHQpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJhdXRvbmV4dFwiKTtcclxuICAgICAgICAgICAgYXV0b05leHQodGFiSWQsIG9wdGlvbi5hdXRvTmV4dCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAob3B0aW9uLmhpZGRlbkNvbW1lbnQpIGhpZGRlbkNvbW1lbnQodGFiSWQsIGZhbHNlKTtcclxuXHJcbiAgICAgICAgICAvLyBTYXZlIHRvIFN0b3JlXHJcbiAgICAgICAgICB3ZWJ0b29uLndlYnRvb25UeXBlID0gd2VidG9vbi53ZWJ0b29uVHlwZTtcclxuICAgICAgICAgIHdlYnRvb24udmlzaXRzID0gd2VidG9vbi52aXNpdHM7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSk7XHJcbn1cclxuIiwiaW1wb3J0IHtcclxuICBzZXRTY3JvbGwsXHJcbiAgY2hlY2tTY3JvbGwsXHJcbiAgaGlkZGVuQ29tbWVudCxcclxuICBkaXNwbGF5SGlzdG9yeSxcclxuICBhdXRvTmV4dFxyXG59IGZyb20gXCIuLi9iYWNrZ3JvdW5kL3RhYi9oaXN0b3J5XCI7XHJcblxyXG5mdW5jdGlvbiBvcGVuVGFiKCkge1xyXG4gIGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKFxyXG4gICAgY2hyb21lLnJ1bnRpbWUuaWQsXHJcbiAgICB7XHJcbiAgICAgIGNvbW1hbmQ6IFwib3BlblRhYlwiXHJcbiAgICB9LFxyXG4gICAgZW5kID0+IHtcclxuICAgICAgd2luZG93LmNsb3NlKCk7XHJcbiAgICB9XHJcbiAgKTtcclxufVxyXG5mdW5jdGlvbiBhZGRUYWJCdXR0b24oKSB7XHJcbiAgZG9jdW1lbnQuYm9keS5pbm5lckhUTUwgKz0gYFxyXG4gICAgICAgIDxkaXYgaWQ9XCJmaXhlZF9MYXllclwiPlxyXG4gICAgICAgICAgICA8c3BhbiBpZD1cImxheWVyLWxpbmtcIiB0aXRsZT1cIuuztOqzoCDsnojripQg7Ju57Yiw7J2EIO2DreyXkOyEnCDsl73ri4jri6QuXCI+PHN2ZyBpZD1cImFycm93XCIgd2lkdGg9XCI0MFwiIGhlaWdodD1cIjQwXCIgdmlld0JveD1cIjAgMCAyMCAyMFwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cclxuICAgICAgICAgICAgICAgICAgICA8cG9seWxpbmUgZmlsbD1cIm5vbmVcIiBzdHJva2U9XCIjMDAwXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3Ryb2tlLXdpZHRoPVwiMS4wM1wiIHBvaW50cz1cIjEzIDE2IDcgMTAgMTMgNFwiIC8+PC9zdmc+IDwvc3Bhbj48L2Rpdj5gO1xyXG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibGF5ZXItbGlua1wiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgIG9wZW5UYWIoKTtcclxuICB9KTtcclxufVxyXG5cclxuY2hyb21lLnN0b3JhZ2Uuc3luYy5nZXQoXCJvcHRpb25cIiwgKHsgb3B0aW9uIH0pID0+IHtcclxuICBhZGRUYWJCdXR0b24oKTtcclxuICBvcHRpb24gPSBKU09OLnBhcnNlKG9wdGlvbik7XHJcbiAgY29uc3QgdXJsID0gbmV3IFVSTChsb2NhdGlvbi5ocmVmKTtcclxuICBjb25zdCB0aXRsZUlkID0gdXJsLnNlYXJjaFBhcmFtcy5nZXQoXCJ0aXRsZUlkXCIpO1xyXG4gIGlmICghdGl0bGVJZCkgcmV0dXJuO1xyXG4gIGlmICh1cmwucGF0aG5hbWUuaW5kZXhPZihcImRldGFpbC5uaG5cIikgPiAtMSkge1xyXG4gICAgZG9jdW1lbnRcclxuICAgICAgLnF1ZXJ5U2VsZWN0b3JBbGwoXCJpbWdbZGF0YS1zcmNdXCIpXHJcbiAgICAgIC5mb3JFYWNoKGl0ZW0gPT4gaXRlbS5zZXRBdHRyaWJ1dGUoXCJzcmNcIiwgaXRlbS5nZXRBdHRyaWJ1dGUoXCJkYXRhLXNyY1wiKSkpO1xyXG4gICAgY2hyb21lLnN0b3JhZ2Vbb3B0aW9uLl9zdG9yZUxvY2F0aW9uXS5nZXQoW1wic2Nyb2xsc1wiXSwgKHsgc2Nyb2xscyA9IFwie31cIiB9KSA9PiB7XHJcbiAgICAgIGNvbnN0IG5vID0gdXJsLnNlYXJjaFBhcmFtcy5nZXQoXCJub1wiKTtcclxuICAgICAgY29uc3Qgc2Nyb2xsID0gSlNPTi5wYXJzZShzY3JvbGxzKTtcclxuICAgICAgaWYgKHNjcm9sbFt0aXRsZUlkXSAmJiBzY3JvbGxbdGl0bGVJZF1bbm9dKSB7XHJcbiAgICAgICAgc2V0U2Nyb2xsKG51bGwsIHNjcm9sbFt0aXRsZUlkXVtub10sIHRydWUsIGZhbHNlKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAob3B0aW9uLl9zYXZlU2Nyb2xsKSB7XHJcbiAgICAgICAgY2hlY2tTY3JvbGwobnVsbCwgdHJ1ZSk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKG9wdGlvbi5faGlkZGVuQ29tbWVudCkge1xyXG4gICAgICAgIGhpZGRlbkNvbW1lbnQobnVsbCwgdHJ1ZSk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKG9wdGlvbi5fYXV0b05leHQpIHtcclxuICAgICAgICBhdXRvTmV4dChudWxsLCB0cnVlKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfSBlbHNlIGlmICh1cmwucGF0aG5hbWUuaW5kZXhPZihcImxpc3QubmhuXCIpID4gLTEpIHtcclxuICAgIGlmIChvcHRpb24uX3Nob3dIaXN0b3J5KSB7XHJcbiAgICAgIGNocm9tZS5zdG9yYWdlW29wdGlvbi5fc3RvcmVMb2NhdGlvbl0uZ2V0KFtcInZpc2l0c1wiXSwgKHsgdmlzaXRzID0gXCJ7fVwiIH0pID0+IHtcclxuICAgICAgICBkaXNwbGF5SGlzdG9yeShudWxsLCB0aXRsZUlkLCBKU09OLnBhcnNlKHZpc2l0cyksIG9wdGlvbi5fc2hvd0hpc3RvcnkpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcbn0pO1xyXG4iXSwic291cmNlUm9vdCI6IiJ9