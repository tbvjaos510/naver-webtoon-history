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

/***/ "./src/background/tab/utility.ts":
/*!***************************************!*\
  !*** ./src/background/tab/utility.ts ***!
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
        whale.tabs.executeScript(tabId, {
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
    whale.runtime.sendMessage("${whale.runtime.id}", {scroll : document.documentElement.scrollTop / document.querySelector("#toonLayer>ul").scrollHeight })
  }, 100)
}
window.addEventListener('scroll',checkSc, false);`
        : `
var checkPercent;
function checkSc( event ) {
    window.clearTimeout( checkPercent );
    checkPercent = setTimeout(function() {
whale.runtime.sendMessage('${whale.runtime.id}', {scroll : (document.documentElement.scrollTop - document.querySelector(".wt_viewer").childNodes[1].offsetTop) / document.querySelector(".wt_viewer").scrollHeight })
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
    whale.tabs.executeScript(tabId, {
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
    whale.tabs.executeScript(tabId, {
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
        wlog.title="${new Date(visits[webtoonId][key] * 1000).toLocaleString() +
                "에 봄"}"
    }`;
            if (!tabId) {
                eval(code);
            }
            else
                whale.tabs.executeScript(tabId, {
                    code: code
                });
        });
    }
}
exports.displayHistory = displayHistory;


/***/ }),

/***/ "./src/contentScript/contentScript.ts":
/*!********************************************!*\
  !*** ./src/contentScript/contentScript.ts ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Utility = __webpack_require__(/*! ../background/tab/utility */ "./src/background/tab/utility.ts");
function openTab() {
    whale.runtime.sendMessage(whale.runtime.id, {
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
whale.storage.sync.get("option", ({ option }) => {
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
        whale.storage[option._storeLocation].get(["scrolls", "visits", "webtoon"], ({ scrolls = "{}", webtoon = "{}", visits = "{}" }) => {
            const no = url.searchParams.get("no");
            if (!no)
                return;
            scrolls = JSON.parse(scrolls);
            webtoon = JSON.parse(webtoon);
            visits = JSON.parse(visits);
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
        });
    }
    else if (url.pathname.indexOf("list.nhn") > -1) {
        if (option._showHistory) {
            whale.storage[option._storeLocation].get(["visits"], ({ visits = "{}" }) => {
                Utility.displayHistory(null, titleId, JSON.parse(visits), option._showHistory);
            });
        }
    }
});


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JhY2tncm91bmQvdGFiL3V0aWxpdHkudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnRlbnRTY3JpcHQvY29udGVudFNjcmlwdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNoRkEsdUJBQThCLEtBQWEsRUFBRSxRQUFpQjtJQUM1RCxNQUFNLElBQUksR0FBRyw0QkFDWCxRQUFRLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsZUFDN0IsMkJBQTJCLENBQUM7SUFDNUIsSUFBSSxDQUFDLEtBQUssRUFBRTtRQUNWLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNYLE9BQU87S0FDUjs7UUFDQyxLQUFLLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUU7WUFD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LE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUNqRixDQUFDLENBQUMsQ0FBQztTQUNKO0tBQ0Y7QUFDSCxDQUFDLENBQUMsQ0FBQyIsImZpbGUiOiJjb250ZW50U2NyaXB0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvY29udGVudFNjcmlwdC9jb250ZW50U2NyaXB0LnRzXCIpO1xuIiwiaW1wb3J0IHsgVmlzaXRUeXBlIH0gZnJvbSBcIi4uLy4uL3N0b3JlL3dlYnRvb25cIjtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBoaWRkZW5Db21tZW50KHRhYklkOiBudW1iZXIsIGlzTW9iaWxlOiBib29sZWFuKSB7XHJcbiAgY29uc3QgY29kZSA9IGBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIiR7XHJcbiAgICBpc01vYmlsZSA/IFwiY2JveF9tb2R1bGVcIiA6IFwiY29tbWVudElmcmFtZVwiXHJcbiAgfVwiKS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCJgO1xyXG4gIGlmICghdGFiSWQpIHtcclxuICAgIGV2YWwoY29kZSk7XHJcbiAgICByZXR1cm47XHJcbiAgfSBlbHNlXHJcbiAgICB3aGFsZS50YWJzLmV4ZWN1dGVTY3JpcHQodGFiSWQsIHtcclxuICAgICAgY29kZTogY29kZVxyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjaGVja1Njcm9sbCh0YWJJZDogbnVtYmVyLCBpc01vYmlsZTogYm9vbGVhbikge1xyXG4gIGNvbnN0IGNvZGUgPSBpc01vYmlsZVxyXG4gICAgPyBgXHJcbiAgdmFyIGNoZWNrUGVyY2VudDtcclxuICBmdW5jdGlvbiBjaGVja1NjKCBldmVudCApIHtcclxuICAgIHdpbmRvdy5jbGVhclRpbWVvdXQoIGNoZWNrUGVyY2VudCApO1xyXG4gICAgY2hlY2tQZXJjZW50ID0gc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgIHdoYWxlLnJ1bnRpbWUuc2VuZE1lc3NhZ2UoXCIke1xyXG4gICAgICB3aGFsZS5ydW50aW1lLmlkXHJcbiAgICB9XCIsIHtzY3JvbGwgOiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wIC8gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0b29uTGF5ZXI+dWxcIikuc2Nyb2xsSGVpZ2h0IH0pXHJcbiAgfSwgMTAwKVxyXG59XHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLGNoZWNrU2MsIGZhbHNlKTtgXHJcbiAgICA6IGBcclxudmFyIGNoZWNrUGVyY2VudDtcclxuZnVuY3Rpb24gY2hlY2tTYyggZXZlbnQgKSB7XHJcbiAgICB3aW5kb3cuY2xlYXJUaW1lb3V0KCBjaGVja1BlcmNlbnQgKTtcclxuICAgIGNoZWNrUGVyY2VudCA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbndoYWxlLnJ1bnRpbWUuc2VuZE1lc3NhZ2UoJyR7XHJcbiAgICAgICAgd2hhbGUucnVudGltZS5pZFxyXG4gICAgICB9Jywge3Njcm9sbCA6IChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wIC0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi53dF92aWV3ZXJcIikuY2hpbGROb2Rlc1sxXS5vZmZzZXRUb3ApIC8gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi53dF92aWV3ZXJcIikuc2Nyb2xsSGVpZ2h0IH0pXHJcbn0sIDEwMCk7fVxyXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJyxjaGVja1NjLCBmYWxzZSk7YDtcclxuICBpZiAoIXRhYklkKSB7XHJcbiAgICBldmFsKGNvZGUpO1xyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuXHJcbiAgd2hhbGUudGFicy5leGVjdXRlU2NyaXB0KHRhYklkLCB7XHJcbiAgICBjb2RlOiBjb2RlXHJcbiAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzZXRTY3JvbGwoXHJcbiAgdGFiSWQ6IG51bWJlcixcclxuICBzY3JvbGw6IG51bWJlcixcclxuICBpc01vYmlsZTogYm9vbGVhbixcclxuICBzY3JvbGxBbGVydDogYm9vbGVhblxyXG4pIHtcclxuICBjb25zdCBjb2RlID0gaXNNb2JpbGVcclxuICAgID8gYHNldFRpbWVvdXQoKCk9Pntkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0b29uTGF5ZXI+dWxcIikuc2Nyb2xsSGVpZ2h0ICogJHtzY3JvbGwgL1xyXG4gICAgICAgIDEwMH19LCAxMDAwKWBcclxuICAgIDogc2Nyb2xsQWxlcnRcclxuICAgID8gYGlmIChjb25maXJtKFwiW3dlYnRvb24gZXh0ZW5zaW9uXSDsnbTsoITsl5Ag67O4IOq4sOuhneydtCDrgqjslYTsnojsirXri4jri6QuICgke3Njcm9sbH0lKVxcXFxu7J207Ja067O07Iuc6rKg7Iq164uI6rmMP1wiKSk7XHJcbiAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi53dF92aWV3ZXJcIikuY2hpbGROb2Rlc1sxXS5vZmZzZXRUb3AgKyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnd0X3ZpZXdlclwiKS5zY3JvbGxIZWlnaHQgKiAke3Njcm9sbCAvXHJcbiAgICAgIDEwMH1gXHJcbiAgICA6IGBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi53dF92aWV3ZXJcIikuY2hpbGROb2Rlc1sxXS5vZmZzZXRUb3AgKyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnd0X3ZpZXdlclwiKS5zY3JvbGxIZWlnaHQgKiAke3Njcm9sbCAvXHJcbiAgICAgICAgMTAwfWA7XHJcbiAgaWYgKCF0YWJJZCkge1xyXG4gICAgZXZhbChjb2RlKTtcclxuICAgIHJldHVybjtcclxuICB9XHJcblxyXG4gIHdoYWxlLnRhYnMuZXhlY3V0ZVNjcmlwdCh0YWJJZCwge1xyXG4gICAgY29kZTogY29kZVxyXG4gIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gYXV0b05leHQodGFiSWQ6IG51bWJlciwgaXNBdXRvOiBib29sZWFuKSB7XHJcbiAgY29uc3QgY29kZSA9IGlzQXV0b1xyXG4gICAgPyBgdmFyIHd1ID0gbmV3IFVSTCh3aW5kb3cubG9jYXRpb24uaHJlZik7XHJcbiAgY29uc29sZS5sb2coXCJBdXRvTmV4dFwiKTtcclxuICB3dS5zZWFyY2hQYXJhbXMuc2V0KFwibm9cIiwgd3Uuc2VhcmNoUGFyYW1zLmdldChcIm5vXCIpKjErMSlcclxuICB2YXIgaXNTY3JvbGxpbmc7XHJcbiAgZnVuY3Rpb24gY2hlY2tTY3JvbGxzKCBldmVudCApIHtcclxuICAgICAgd2luZG93LmNsZWFyVGltZW91dCggaXNTY3JvbGxpbmcgKTtcclxuICAgICAgaXNTY3JvbGxpbmcgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgaWYgKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxIZWlnaHQtZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcDwxNTAwKVxyXG4gICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IHd1LmhyZWY7XHJcbiAgICAgIH0sIDUwMCk7XHJcblxyXG4gIH1cclxuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJyxjaGVja1Njcm9sbHMsIGZhbHNlKTtcclxuICBgXHJcbiAgICA6IGBcclxuICBpZiAod2luZG93W1wiY2hlY2tTY3JvbGxzXCJdKVxyXG4gIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBjaGVja1Njcm9sbHMpYDtcclxuICBpZiAoIXRhYklkKSB7XHJcbiAgICBldmFsKGNvZGUpO1xyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuICB3aGFsZS50YWJzLmV4ZWN1dGVTY3JpcHQodGFiSWQsIHtcclxuICAgIGNvZGU6IGNvZGVcclxuICB9KTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gZGlzcGxheUhpc3RvcnkoXHJcbiAgdGFiSWQ6IG51bWJlcixcclxuICB3ZWJ0b29uSWQ6IHN0cmluZyxcclxuICB2aXNpdHM6IFZpc2l0VHlwZSxcclxuICBzaG93SGlzdG9yeTogYm9vbGVhblxyXG4pIHtcclxuICBpZiAodmlzaXRzW3dlYnRvb25JZF0gJiYgc2hvd0hpc3RvcnkpIHtcclxuICAgIE9iamVjdC5rZXlzKHZpc2l0c1t3ZWJ0b29uSWRdKS5mb3JFYWNoKGtleSA9PiB7XHJcbiAgICAgIGNvbnN0IGNvZGUgPSBgdmFyIHdsb2cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYVtocmVmKj0nZGV0YWlsLm5obj90aXRsZUlkPSR7d2VidG9vbklkfSZubz0ke2tleX0nXVwiKTtcclxuICAgICAgaWYgKHdsb2cpe1xyXG4gICAgICAgIHdsb2c9d2xvZy5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQ7XHJcbiAgICAgICAgd2xvZy5zdHlsZS5iYWNrZ3JvdW5kPVwibGlnaHRncmF5XCI7XHJcbiAgICAgICAgd2xvZy50aXRsZT1cIiR7bmV3IERhdGUodmlzaXRzW3dlYnRvb25JZF1ba2V5XSAqIDEwMDApLnRvTG9jYWxlU3RyaW5nKCkgK1xyXG4gICAgICAgICAgXCLsl5Ag67SEXCJ9XCJcclxuICAgIH1gO1xyXG4gICAgICBpZiAoIXRhYklkKSB7XHJcbiAgICAgICAgZXZhbChjb2RlKTtcclxuICAgICAgfSBlbHNlXHJcbiAgICAgICAgd2hhbGUudGFicy5leGVjdXRlU2NyaXB0KHRhYklkLCB7XHJcbiAgICAgICAgICBjb2RlOiBjb2RlXHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0ICogYXMgVXRpbGl0eSBmcm9tIFwiLi4vYmFja2dyb3VuZC90YWIvdXRpbGl0eVwiO1xyXG5cclxuZnVuY3Rpb24gb3BlblRhYigpIHtcclxuICB3aGFsZS5ydW50aW1lLnNlbmRNZXNzYWdlKFxyXG4gICAgd2hhbGUucnVudGltZS5pZCxcclxuICAgIHtcclxuICAgICAgY29tbWFuZDogXCJvcGVuVGFiXCJcclxuICAgIH0sXHJcbiAgICBlbmQgPT4ge1xyXG4gICAgICB3aW5kb3cuY2xvc2UoKTtcclxuICAgIH1cclxuICApO1xyXG59XHJcbmZ1bmN0aW9uIGFkZFRhYkJ1dHRvbigpIHtcclxuICBkb2N1bWVudC5ib2R5LmlubmVySFRNTCArPSBgXHJcbiAgICAgICAgPGRpdiBpZD1cImZpeGVkX0xheWVyXCI+XHJcbiAgICAgICAgICAgIDxzcGFuIGlkPVwibGF5ZXItbGlua1wiIHRpdGxlPVwi67O06rOgIOyeiOuKlCDsm7ntiLDsnYQg7YOt7JeQ7IScIOyXveuLiOuLpC5cIj48c3ZnIGlkPVwiYXJyb3dcIiB3aWR0aD1cIjQwXCIgaGVpZ2h0PVwiNDBcIiB2aWV3Qm94PVwiMCAwIDIwIDIwXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxwb2x5bGluZSBmaWxsPVwibm9uZVwiIHN0cm9rZT1cIiMwMDBcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdHJva2Utd2lkdGg9XCIxLjAzXCIgcG9pbnRzPVwiMTMgMTYgNyAxMCAxMyA0XCIgLz48L3N2Zz4gPC9zcGFuPjwvZGl2PmA7XHJcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsYXllci1saW5rXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbihldmVudCkge1xyXG4gICAgb3BlblRhYigpO1xyXG4gIH0pO1xyXG59XHJcblxyXG53aGFsZS5zdG9yYWdlLnN5bmMuZ2V0KFwib3B0aW9uXCIsICh7IG9wdGlvbiB9KSA9PiB7XHJcbiAgYWRkVGFiQnV0dG9uKCk7XHJcbiAgb3B0aW9uID0gSlNPTi5wYXJzZShvcHRpb24pO1xyXG4gIGNvbnN0IHVybCA9IG5ldyBVUkwobG9jYXRpb24uaHJlZik7XHJcbiAgY29uc3QgdGl0bGVJZCA9IHVybC5zZWFyY2hQYXJhbXMuZ2V0KFwidGl0bGVJZFwiKTtcclxuICBpZiAoIXRpdGxlSWQpIHJldHVybjtcclxuICBpZiAodXJsLnBhdGhuYW1lLmluZGV4T2YoXCJkZXRhaWwubmhuXCIpID4gLTEpIHtcclxuICAgIGRvY3VtZW50XHJcbiAgICAgIC5xdWVyeVNlbGVjdG9yQWxsKFwiaW1nW2RhdGEtc3JjXVwiKVxyXG4gICAgICAuZm9yRWFjaChpdGVtID0+IGl0ZW0uc2V0QXR0cmlidXRlKFwic3JjXCIsIGl0ZW0uZ2V0QXR0cmlidXRlKFwiZGF0YS1zcmNcIikpKTtcclxuICAgIHdoYWxlLnN0b3JhZ2Vbb3B0aW9uLl9zdG9yZUxvY2F0aW9uXS5nZXQoXHJcbiAgICAgIFtcInNjcm9sbHNcIiwgXCJ2aXNpdHNcIiwgXCJ3ZWJ0b29uXCJdLFxyXG4gICAgICAoeyBzY3JvbGxzID0gXCJ7fVwiLCB3ZWJ0b29uID0gXCJ7fVwiLCB2aXNpdHMgPSBcInt9XCIgfSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IG5vID0gdXJsLnNlYXJjaFBhcmFtcy5nZXQoXCJub1wiKTtcclxuICAgICAgICBpZiAoIW5vKSByZXR1cm47XHJcbiAgICAgICAgc2Nyb2xscyA9IEpTT04ucGFyc2Uoc2Nyb2xscyk7XHJcbiAgICAgICAgd2VidG9vbiA9IEpTT04ucGFyc2Uod2VidG9vbik7XHJcbiAgICAgICAgdmlzaXRzID0gSlNPTi5wYXJzZSh2aXNpdHMpO1xyXG4gICAgICAgIGlmIChzY3JvbGxzW3RpdGxlSWRdICYmIHNjcm9sbHNbdGl0bGVJZF1bbm9dKSB7XHJcbiAgICAgICAgICBVdGlsaXR5LnNldFNjcm9sbChudWxsLCBzY3JvbGxzW3RpdGxlSWRdW25vXSwgdHJ1ZSwgZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAob3B0aW9uLl9zYXZlU2Nyb2xsKSB7XHJcbiAgICAgICAgICBVdGlsaXR5LmNoZWNrU2Nyb2xsKG51bGwsIHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAob3B0aW9uLl9oaWRkZW5Db21tZW50KSB7XHJcbiAgICAgICAgICBVdGlsaXR5LmhpZGRlbkNvbW1lbnQobnVsbCwgdHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChvcHRpb24uX2F1dG9OZXh0KSB7XHJcbiAgICAgICAgICBVdGlsaXR5LmF1dG9OZXh0KG51bGwsIHRydWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwibWV0YVtwcm9wZXJ0eT0nb2c6dGl0bGUnXVwiKS5nZXRBdHRyaWJ1dGUoXCJjb250ZW50XCIpO1xyXG4gICAgICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnRcclxuICAgICAgICAgIC5xdWVyeVNlbGVjdG9yKFwibWV0YVtwcm9wZXJ0eT0nb2c6ZGVzY3JpcHRpb24nXVwiKVxyXG4gICAgICAgICAgLmdldEF0dHJpYnV0ZShcImNvbnRlbnRcIik7XHJcbiAgICAgICAgaWYgKCF3ZWJ0b29uW3RpdGxlSWRdKSB7XHJcbiAgICAgICAgICB2aXNpdHNbdGl0bGVJZF0gPSB7fTtcclxuICAgICAgICAgIHdlYnRvb25bdGl0bGVJZF0gPSB7XHJcbiAgICAgICAgICAgIHRpdGxlOiB0aXRsZS5yZXBsYWNlKFwiIC0gXCIgKyBkZXNjcmlwdGlvbiwgXCJcIiksXHJcbiAgICAgICAgICAgIHR5cGU6IHVybC5wYXRobmFtZS5zcGxpdChcIi9kZXRhaWwubmhuXCIpWzBdXHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICB2aXNpdHNbdGl0bGVJZF1bbm9dID0gTWF0aC5mbG9vcihuZXcgRGF0ZSgpLmdldFRpbWUoKSAvIDEwMDApO1xyXG5cclxuICAgICAgICBjaHJvbWUuc3RvcmFnZVtvcHRpb24uX3N0b3JlTG9jYXRpb25dLnNldCh7XHJcbiAgICAgICAgICB3ZWJ0b29uOiBKU09OLnN0cmluZ2lmeSh3ZWJ0b29uKSxcclxuICAgICAgICAgIHZpc2l0czogSlNPTi5zdHJpbmdpZnkodmlzaXRzKVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICApO1xyXG4gIH0gZWxzZSBpZiAodXJsLnBhdGhuYW1lLmluZGV4T2YoXCJsaXN0Lm5oblwiKSA+IC0xKSB7XHJcbiAgICBpZiAob3B0aW9uLl9zaG93SGlzdG9yeSkge1xyXG4gICAgICB3aGFsZS5zdG9yYWdlW29wdGlvbi5fc3RvcmVMb2NhdGlvbl0uZ2V0KFtcInZpc2l0c1wiXSwgKHsgdmlzaXRzID0gXCJ7fVwiIH0pID0+IHtcclxuICAgICAgICBVdGlsaXR5LmRpc3BsYXlIaXN0b3J5KG51bGwsIHRpdGxlSWQsIEpTT04ucGFyc2UodmlzaXRzKSwgb3B0aW9uLl9zaG93SGlzdG9yeSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxufSk7XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=