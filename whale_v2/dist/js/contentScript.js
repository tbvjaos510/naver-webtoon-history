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
        wlog.title="${new Date(visits[webtoonId][key] * 1000).toLocaleString() + "에 봄"}"
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JhY2tncm91bmQvdGFiL3V0aWxpdHkudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnRlbnRTY3JpcHQvY29udGVudFNjcmlwdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNoRkEsdUJBQThCLEtBQWEsRUFBRSxRQUFpQjtJQUM1RCxNQUFNLElBQUksR0FBRyw0QkFDWCxRQUFRLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsZUFDN0IsMkJBQTJCLENBQUM7SUFDNUIsSUFBSSxDQUFDLEtBQUssRUFBRTtRQUNWLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNYLE9BQU87S0FDUjs7UUFDQyxLQUFLLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUU7WUFD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TUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQ2pGLENBQUMsQ0FBQyxDQUFDO1NBQ0o7S0FDRjtBQUNILENBQUMsQ0FBQyxDQUFDIiwiZmlsZSI6ImNvbnRlbnRTY3JpcHQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9jb250ZW50U2NyaXB0L2NvbnRlbnRTY3JpcHQudHNcIik7XG4iLCJpbXBvcnQgeyBWaXNpdFR5cGUgfSBmcm9tIFwiLi4vLi4vcG9wdXAvc3RvcmUvd2VidG9vblwiO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGhpZGRlbkNvbW1lbnQodGFiSWQ6IG51bWJlciwgaXNNb2JpbGU6IGJvb2xlYW4pIHtcclxuICBjb25zdCBjb2RlID0gYGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiJHtcclxuICAgIGlzTW9iaWxlID8gXCJjYm94X21vZHVsZVwiIDogXCJjb21tZW50SWZyYW1lXCJcclxuICB9XCIpLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcImA7XHJcbiAgaWYgKCF0YWJJZCkge1xyXG4gICAgZXZhbChjb2RlKTtcclxuICAgIHJldHVybjtcclxuICB9IGVsc2VcclxuICAgIHdoYWxlLnRhYnMuZXhlY3V0ZVNjcmlwdCh0YWJJZCwge1xyXG4gICAgICBjb2RlOiBjb2RlXHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNoZWNrU2Nyb2xsKHRhYklkOiBudW1iZXIsIGlzTW9iaWxlOiBib29sZWFuKSB7XHJcbiAgY29uc3QgY29kZSA9IGlzTW9iaWxlXHJcbiAgICA/IGBcclxuICB2YXIgY2hlY2tQZXJjZW50O1xyXG4gIGZ1bmN0aW9uIGNoZWNrU2MoIGV2ZW50ICkge1xyXG4gICAgd2luZG93LmNsZWFyVGltZW91dCggY2hlY2tQZXJjZW50ICk7XHJcbiAgICBjaGVja1BlcmNlbnQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgd2hhbGUucnVudGltZS5zZW5kTWVzc2FnZShcIiR7XHJcbiAgICAgIHdoYWxlLnJ1bnRpbWUuaWRcclxuICAgIH1cIiwge3Njcm9sbCA6IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3AgLyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Rvb25MYXllcj51bFwiKS5zY3JvbGxIZWlnaHQgfSlcclxuICB9LCAxMDApXHJcbn1cclxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsY2hlY2tTYywgZmFsc2UpO2BcclxuICAgIDogYFxyXG52YXIgY2hlY2tQZXJjZW50O1xyXG5mdW5jdGlvbiBjaGVja1NjKCBldmVudCApIHtcclxuICAgIHdpbmRvdy5jbGVhclRpbWVvdXQoIGNoZWNrUGVyY2VudCApO1xyXG4gICAgY2hlY2tQZXJjZW50ID0gc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxud2hhbGUucnVudGltZS5zZW5kTWVzc2FnZSgnJHtcclxuICAgICAgICB3aGFsZS5ydW50aW1lLmlkXHJcbiAgICAgIH0nLCB7c2Nyb2xsIDogKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3AgLSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnd0X3ZpZXdlclwiKS5jaGlsZE5vZGVzWzFdLm9mZnNldFRvcCkgLyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnd0X3ZpZXdlclwiKS5zY3JvbGxIZWlnaHQgfSlcclxufSwgMTAwKTt9XHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLGNoZWNrU2MsIGZhbHNlKTtgO1xyXG4gIGlmICghdGFiSWQpIHtcclxuICAgIGV2YWwoY29kZSk7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG5cclxuICB3aGFsZS50YWJzLmV4ZWN1dGVTY3JpcHQodGFiSWQsIHtcclxuICAgIGNvZGU6IGNvZGVcclxuICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHNldFNjcm9sbCh0YWJJZDogbnVtYmVyLCBzY3JvbGw6IG51bWJlciwgaXNNb2JpbGU6IGJvb2xlYW4sIHNjcm9sbEFsZXJ0OiBib29sZWFuKSB7XHJcbiAgY29uc3QgY29kZSA9IGlzTW9iaWxlXHJcbiAgICA/IGBzZXRUaW1lb3V0KCgpPT57ZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdG9vbkxheWVyPnVsXCIpLnNjcm9sbEhlaWdodCAqICR7c2Nyb2xsIC9cclxuICAgICAgICAxMDB9fSwgMTAwMClgXHJcbiAgICA6IHNjcm9sbEFsZXJ0XHJcbiAgICA/IGBpZiAoY29uZmlybShcIlt3ZWJ0b29uIGV4dGVuc2lvbl0g7J207KCE7JeQIOuzuCDquLDroZ3snbQg64Ko7JWE7J6I7Iq164uI64ukLiAoJHtzY3JvbGx9JSlcXFxcbuydtOyWtOuztOyLnOqyoOyKteuLiOq5jD9cIikpO1xyXG4gICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIud3Rfdmlld2VyXCIpLmNoaWxkTm9kZXNbMV0ub2Zmc2V0VG9wICsgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi53dF92aWV3ZXJcIikuc2Nyb2xsSGVpZ2h0ICogJHtzY3JvbGwgL1xyXG4gICAgICAxMDB9YFxyXG4gICAgOiBgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIud3Rfdmlld2VyXCIpLmNoaWxkTm9kZXNbMV0ub2Zmc2V0VG9wICsgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi53dF92aWV3ZXJcIikuc2Nyb2xsSGVpZ2h0ICogJHtzY3JvbGwgL1xyXG4gICAgICAgIDEwMH1gO1xyXG4gIGlmICghdGFiSWQpIHtcclxuICAgIGV2YWwoY29kZSk7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG5cclxuICB3aGFsZS50YWJzLmV4ZWN1dGVTY3JpcHQodGFiSWQsIHtcclxuICAgIGNvZGU6IGNvZGVcclxuICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGF1dG9OZXh0KHRhYklkOiBudW1iZXIsIGlzQXV0bzogYm9vbGVhbikge1xyXG4gIGNvbnN0IGNvZGUgPSBpc0F1dG9cclxuICAgID8gYHZhciB3dSA9IG5ldyBVUkwod2luZG93LmxvY2F0aW9uLmhyZWYpO1xyXG4gIGNvbnNvbGUubG9nKFwiQXV0b05leHRcIik7XHJcbiAgd3Uuc2VhcmNoUGFyYW1zLnNldChcIm5vXCIsIHd1LnNlYXJjaFBhcmFtcy5nZXQoXCJub1wiKSoxKzEpXHJcbiAgdmFyIGlzU2Nyb2xsaW5nO1xyXG4gIGZ1bmN0aW9uIGNoZWNrU2Nyb2xscyggZXZlbnQgKSB7XHJcbiAgICAgIHdpbmRvdy5jbGVhclRpbWVvdXQoIGlzU2Nyb2xsaW5nICk7XHJcbiAgICAgIGlzU2Nyb2xsaW5nID0gc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICAgIGlmIChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsSGVpZ2h0LWRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3A8MTUwMClcclxuICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSB3dS5ocmVmO1xyXG4gICAgICB9LCA1MDApO1xyXG5cclxuICB9XHJcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsY2hlY2tTY3JvbGxzLCBmYWxzZSk7XHJcbiAgYFxyXG4gICAgOiBgXHJcbiAgaWYgKHdpbmRvd1tcImNoZWNrU2Nyb2xsc1wiXSlcclxuICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgY2hlY2tTY3JvbGxzKWA7XHJcbiAgaWYgKCF0YWJJZCkge1xyXG4gICAgZXZhbChjb2RlKTtcclxuICAgIHJldHVybjtcclxuICB9XHJcbiAgd2hhbGUudGFicy5leGVjdXRlU2NyaXB0KHRhYklkLCB7XHJcbiAgICBjb2RlOiBjb2RlXHJcbiAgfSk7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGRpc3BsYXlIaXN0b3J5KFxyXG4gIHRhYklkOiBudW1iZXIsXHJcbiAgd2VidG9vbklkOiBzdHJpbmcsXHJcbiAgdmlzaXRzOiBWaXNpdFR5cGUsXHJcbiAgc2hvd0hpc3Rvcnk6IGJvb2xlYW5cclxuKSB7XHJcbiAgaWYgKHZpc2l0c1t3ZWJ0b29uSWRdICYmIHNob3dIaXN0b3J5KSB7XHJcbiAgICBPYmplY3Qua2V5cyh2aXNpdHNbd2VidG9vbklkXSkuZm9yRWFjaChrZXkgPT4ge1xyXG4gICAgICBjb25zdCBjb2RlID0gYHZhciB3bG9nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImFbaHJlZio9J2RldGFpbC5uaG4/dGl0bGVJZD0ke3dlYnRvb25JZH0mbm89JHtrZXl9J11cIik7XHJcbiAgICAgIGlmICh3bG9nKXtcclxuICAgICAgICB3bG9nPXdsb2cucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50O1xyXG4gICAgICAgIHdsb2cuc3R5bGUuYmFja2dyb3VuZD1cImxpZ2h0Z3JheVwiO1xyXG4gICAgICAgIHdsb2cudGl0bGU9XCIke25ldyBEYXRlKHZpc2l0c1t3ZWJ0b29uSWRdW2tleV0gKiAxMDAwKS50b0xvY2FsZVN0cmluZygpICsgXCLsl5Ag67SEXCJ9XCJcclxuICAgIH1gO1xyXG4gICAgICBpZiAoIXRhYklkKSB7XHJcbiAgICAgICAgZXZhbChjb2RlKTtcclxuICAgICAgfSBlbHNlXHJcbiAgICAgICAgd2hhbGUudGFicy5leGVjdXRlU2NyaXB0KHRhYklkLCB7XHJcbiAgICAgICAgICBjb2RlOiBjb2RlXHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0ICogYXMgVXRpbGl0eSBmcm9tIFwiLi4vYmFja2dyb3VuZC90YWIvdXRpbGl0eVwiO1xyXG5cclxuZnVuY3Rpb24gb3BlblRhYigpIHtcclxuICB3aGFsZS5ydW50aW1lLnNlbmRNZXNzYWdlKFxyXG4gICAgd2hhbGUucnVudGltZS5pZCxcclxuICAgIHtcclxuICAgICAgY29tbWFuZDogXCJvcGVuVGFiXCJcclxuICAgIH0sXHJcbiAgICBlbmQgPT4ge1xyXG4gICAgICB3aW5kb3cuY2xvc2UoKTtcclxuICAgIH1cclxuICApO1xyXG59XHJcbmZ1bmN0aW9uIGFkZFRhYkJ1dHRvbigpIHtcclxuICBkb2N1bWVudC5ib2R5LmlubmVySFRNTCArPSBgXHJcbiAgICAgICAgPGRpdiBpZD1cImZpeGVkX0xheWVyXCI+XHJcbiAgICAgICAgICAgIDxzcGFuIGlkPVwibGF5ZXItbGlua1wiIHRpdGxlPVwi67O06rOgIOyeiOuKlCDsm7ntiLDsnYQg7YOt7JeQ7IScIOyXveuLiOuLpC5cIj48c3ZnIGlkPVwiYXJyb3dcIiB3aWR0aD1cIjQwXCIgaGVpZ2h0PVwiNDBcIiB2aWV3Qm94PVwiMCAwIDIwIDIwXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxwb2x5bGluZSBmaWxsPVwibm9uZVwiIHN0cm9rZT1cIiMwMDBcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdHJva2Utd2lkdGg9XCIxLjAzXCIgcG9pbnRzPVwiMTMgMTYgNyAxMCAxMyA0XCIgLz48L3N2Zz4gPC9zcGFuPjwvZGl2PmA7XHJcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsYXllci1saW5rXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbihldmVudCkge1xyXG4gICAgb3BlblRhYigpO1xyXG4gIH0pO1xyXG59XHJcblxyXG53aGFsZS5zdG9yYWdlLnN5bmMuZ2V0KFwib3B0aW9uXCIsICh7IG9wdGlvbiB9KSA9PiB7XHJcbiAgYWRkVGFiQnV0dG9uKCk7XHJcbiAgb3B0aW9uID0gSlNPTi5wYXJzZShvcHRpb24pO1xyXG4gIGNvbnN0IHVybCA9IG5ldyBVUkwobG9jYXRpb24uaHJlZik7XHJcbiAgY29uc3QgdGl0bGVJZCA9IHVybC5zZWFyY2hQYXJhbXMuZ2V0KFwidGl0bGVJZFwiKTtcclxuICBpZiAoIXRpdGxlSWQpIHJldHVybjtcclxuICBpZiAodXJsLnBhdGhuYW1lLmluZGV4T2YoXCJkZXRhaWwubmhuXCIpID4gLTEpIHtcclxuICAgIGRvY3VtZW50XHJcbiAgICAgIC5xdWVyeVNlbGVjdG9yQWxsKFwiaW1nW2RhdGEtc3JjXVwiKVxyXG4gICAgICAuZm9yRWFjaChpdGVtID0+IGl0ZW0uc2V0QXR0cmlidXRlKFwic3JjXCIsIGl0ZW0uZ2V0QXR0cmlidXRlKFwiZGF0YS1zcmNcIikpKTtcclxuICAgIHdoYWxlLnN0b3JhZ2Vbb3B0aW9uLl9zdG9yZUxvY2F0aW9uXS5nZXQoXHJcbiAgICAgIFtcInNjcm9sbHNcIiwgXCJ2aXNpdHNcIiwgXCJ3ZWJ0b29uXCJdLFxyXG4gICAgICAoeyBzY3JvbGxzID0gXCJ7fVwiLCB3ZWJ0b29uID0gXCJ7fVwiLCB2aXNpdHMgPSBcInt9XCIgfSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IG5vID0gdXJsLnNlYXJjaFBhcmFtcy5nZXQoXCJub1wiKTtcclxuICAgICAgICBpZiAoIW5vKSByZXR1cm47XHJcbiAgICAgICAgc2Nyb2xscyA9IEpTT04ucGFyc2Uoc2Nyb2xscyk7XHJcbiAgICAgICAgd2VidG9vbiA9IEpTT04ucGFyc2Uod2VidG9vbik7XHJcbiAgICAgICAgdmlzaXRzID0gSlNPTi5wYXJzZSh2aXNpdHMpO1xyXG4gICAgICAgIGlmIChzY3JvbGxzW3RpdGxlSWRdICYmIHNjcm9sbHNbdGl0bGVJZF1bbm9dKSB7XHJcbiAgICAgICAgICBVdGlsaXR5LnNldFNjcm9sbChudWxsLCBzY3JvbGxzW3RpdGxlSWRdW25vXSwgdHJ1ZSwgZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAob3B0aW9uLl9zYXZlU2Nyb2xsKSB7XHJcbiAgICAgICAgICBVdGlsaXR5LmNoZWNrU2Nyb2xsKG51bGwsIHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAob3B0aW9uLl9oaWRkZW5Db21tZW50KSB7XHJcbiAgICAgICAgICBVdGlsaXR5LmhpZGRlbkNvbW1lbnQobnVsbCwgdHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChvcHRpb24uX2F1dG9OZXh0KSB7XHJcbiAgICAgICAgICBVdGlsaXR5LmF1dG9OZXh0KG51bGwsIHRydWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwibWV0YVtwcm9wZXJ0eT0nb2c6dGl0bGUnXVwiKS5nZXRBdHRyaWJ1dGUoXCJjb250ZW50XCIpO1xyXG4gICAgICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnRcclxuICAgICAgICAgIC5xdWVyeVNlbGVjdG9yKFwibWV0YVtwcm9wZXJ0eT0nb2c6ZGVzY3JpcHRpb24nXVwiKVxyXG4gICAgICAgICAgLmdldEF0dHJpYnV0ZShcImNvbnRlbnRcIik7XHJcbiAgICAgICAgaWYgKCF3ZWJ0b29uW3RpdGxlSWRdKSB7XHJcbiAgICAgICAgICB2aXNpdHNbdGl0bGVJZF0gPSB7fTtcclxuICAgICAgICAgIHdlYnRvb25bdGl0bGVJZF0gPSB7XHJcbiAgICAgICAgICAgIHRpdGxlOiB0aXRsZS5yZXBsYWNlKFwiIC0gXCIgKyBkZXNjcmlwdGlvbiwgXCJcIiksXHJcbiAgICAgICAgICAgIHR5cGU6IHVybC5wYXRobmFtZS5zcGxpdChcIi9kZXRhaWwubmhuXCIpWzBdXHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgICAgICB2aXNpdHNbdGl0bGVJZF1bbm9dID0gTWF0aC5mbG9vcihuZXcgRGF0ZSgpLmdldFRpbWUoKSAvIDEwMDApO1xyXG5cclxuICAgICAgICBjaHJvbWUuc3RvcmFnZVtvcHRpb24uX3N0b3JlTG9jYXRpb25dLnNldCh7XHJcbiAgICAgICAgICB3ZWJ0b29uOiBKU09OLnN0cmluZ2lmeSh3ZWJ0b29uKSxcclxuICAgICAgICAgIHZpc2l0czogSlNPTi5zdHJpbmdpZnkodmlzaXRzKVxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICApO1xyXG4gIH0gZWxzZSBpZiAodXJsLnBhdGhuYW1lLmluZGV4T2YoXCJsaXN0Lm5oblwiKSA+IC0xKSB7XHJcbiAgICBpZiAob3B0aW9uLl9zaG93SGlzdG9yeSkge1xyXG4gICAgICB3aGFsZS5zdG9yYWdlW29wdGlvbi5fc3RvcmVMb2NhdGlvbl0uZ2V0KFtcInZpc2l0c1wiXSwgKHsgdmlzaXRzID0gXCJ7fVwiIH0pID0+IHtcclxuICAgICAgICBVdGlsaXR5LmRpc3BsYXlIaXN0b3J5KG51bGwsIHRpdGxlSWQsIEpTT04ucGFyc2UodmlzaXRzKSwgb3B0aW9uLl9zaG93SGlzdG9yeSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxufSk7XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=