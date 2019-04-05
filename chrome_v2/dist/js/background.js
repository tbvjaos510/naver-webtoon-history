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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/background/background.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/axios/index.js":
/*!*************************************!*\
  !*** ./node_modules/axios/index.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./lib/axios */ "./node_modules/axios/lib/axios.js");

/***/ }),

/***/ "./node_modules/axios/lib/adapters/xhr.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/adapters/xhr.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var settle = __webpack_require__(/*! ./../core/settle */ "./node_modules/axios/lib/core/settle.js");
var buildURL = __webpack_require__(/*! ./../helpers/buildURL */ "./node_modules/axios/lib/helpers/buildURL.js");
var parseHeaders = __webpack_require__(/*! ./../helpers/parseHeaders */ "./node_modules/axios/lib/helpers/parseHeaders.js");
var isURLSameOrigin = __webpack_require__(/*! ./../helpers/isURLSameOrigin */ "./node_modules/axios/lib/helpers/isURLSameOrigin.js");
var createError = __webpack_require__(/*! ../core/createError */ "./node_modules/axios/lib/core/createError.js");
var btoa = (typeof window !== 'undefined' && window.btoa && window.btoa.bind(window)) || __webpack_require__(/*! ./../helpers/btoa */ "./node_modules/axios/lib/helpers/btoa.js");

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();
    var loadEvent = 'onreadystatechange';
    var xDomain = false;

    // For IE 8/9 CORS support
    // Only supports POST and GET calls and doesn't returns the response headers.
    // DON'T do this for testing b/c XMLHttpRequest is mocked, not XDomainRequest.
    if ( true &&
        typeof window !== 'undefined' &&
        window.XDomainRequest && !('withCredentials' in request) &&
        !isURLSameOrigin(config.url)) {
      request = new window.XDomainRequest();
      loadEvent = 'onload';
      xDomain = true;
      request.onprogress = function handleProgress() {};
      request.ontimeout = function handleTimeout() {};
    }

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request[loadEvent] = function handleLoad() {
      if (!request || (request.readyState !== 4 && !xDomain)) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        // IE sends 1223 instead of 204 (https://github.com/axios/axios/issues/201)
        status: request.status === 1223 ? 204 : request.status,
        statusText: request.status === 1223 ? 'No Content' : request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      var cookies = __webpack_require__(/*! ./../helpers/cookies */ "./node_modules/axios/lib/helpers/cookies.js");

      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ?
          cookies.read(config.xsrfCookieName) :
          undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (config.withCredentials) {
      request.withCredentials = true;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (requestData === undefined) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/axios.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/axios.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./utils */ "./node_modules/axios/lib/utils.js");
var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");
var Axios = __webpack_require__(/*! ./core/Axios */ "./node_modules/axios/lib/core/Axios.js");
var defaults = __webpack_require__(/*! ./defaults */ "./node_modules/axios/lib/defaults.js");

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(utils.merge(defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__(/*! ./cancel/Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");
axios.CancelToken = __webpack_require__(/*! ./cancel/CancelToken */ "./node_modules/axios/lib/cancel/CancelToken.js");
axios.isCancel = __webpack_require__(/*! ./cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(/*! ./helpers/spread */ "./node_modules/axios/lib/helpers/spread.js");

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/Cancel.js":
/*!*************************************************!*\
  !*** ./node_modules/axios/lib/cancel/Cancel.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/CancelToken.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/cancel/CancelToken.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cancel = __webpack_require__(/*! ./Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/isCancel.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/cancel/isCancel.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),

/***/ "./node_modules/axios/lib/core/Axios.js":
/*!**********************************************!*\
  !*** ./node_modules/axios/lib/core/Axios.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var defaults = __webpack_require__(/*! ./../defaults */ "./node_modules/axios/lib/defaults.js");
var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var InterceptorManager = __webpack_require__(/*! ./InterceptorManager */ "./node_modules/axios/lib/core/InterceptorManager.js");
var dispatchRequest = __webpack_require__(/*! ./dispatchRequest */ "./node_modules/axios/lib/core/dispatchRequest.js");

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = utils.merge({
      url: arguments[0]
    }, arguments[1]);
  }

  config = utils.merge(defaults, {method: 'get'}, this.defaults, config);
  config.method = config.method.toLowerCase();

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;


/***/ }),

/***/ "./node_modules/axios/lib/core/InterceptorManager.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/core/InterceptorManager.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;


/***/ }),

/***/ "./node_modules/axios/lib/core/createError.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/createError.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__(/*! ./enhanceError */ "./node_modules/axios/lib/core/enhanceError.js");

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};


/***/ }),

/***/ "./node_modules/axios/lib/core/dispatchRequest.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/core/dispatchRequest.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var transformData = __webpack_require__(/*! ./transformData */ "./node_modules/axios/lib/core/transformData.js");
var isCancel = __webpack_require__(/*! ../cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");
var defaults = __webpack_require__(/*! ../defaults */ "./node_modules/axios/lib/defaults.js");
var isAbsoluteURL = __webpack_require__(/*! ./../helpers/isAbsoluteURL */ "./node_modules/axios/lib/helpers/isAbsoluteURL.js");
var combineURLs = __webpack_require__(/*! ./../helpers/combineURLs */ "./node_modules/axios/lib/helpers/combineURLs.js");

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Support baseURL config
  if (config.baseURL && !isAbsoluteURL(config.url)) {
    config.url = combineURLs(config.baseURL, config.url);
  }

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers || {}
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/core/enhanceError.js":
/*!*****************************************************!*\
  !*** ./node_modules/axios/lib/core/enhanceError.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }
  error.request = request;
  error.response = response;
  return error;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/settle.js":
/*!***********************************************!*\
  !*** ./node_modules/axios/lib/core/settle.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__(/*! ./createError */ "./node_modules/axios/lib/core/createError.js");

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  // Note: status is not exposed by XDomainRequest
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};


/***/ }),

/***/ "./node_modules/axios/lib/core/transformData.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/transformData.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};


/***/ }),

/***/ "./node_modules/axios/lib/defaults.js":
/*!********************************************!*\
  !*** ./node_modules/axios/lib/defaults.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(/*! ./utils */ "./node_modules/axios/lib/utils.js");
var normalizeHeaderName = __webpack_require__(/*! ./helpers/normalizeHeaderName */ "./node_modules/axios/lib/helpers/normalizeHeaderName.js");

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(/*! ./adapters/xhr */ "./node_modules/axios/lib/adapters/xhr.js");
  } else if (typeof process !== 'undefined') {
    // For node use HTTP adapter
    adapter = __webpack_require__(/*! ./adapters/http */ "./node_modules/axios/lib/adapters/xhr.js");
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/axios/lib/helpers/bind.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/helpers/bind.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/btoa.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/helpers/btoa.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// btoa polyfill for IE<10 courtesy https://github.com/davidchambers/Base64.js

var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

function E() {
  this.message = 'String contains an invalid character';
}
E.prototype = new Error;
E.prototype.code = 5;
E.prototype.name = 'InvalidCharacterError';

function btoa(input) {
  var str = String(input);
  var output = '';
  for (
    // initialize result and counter
    var block, charCode, idx = 0, map = chars;
    // if the next str index does not exist:
    //   change the mapping table to "="
    //   check if d has no fractional digits
    str.charAt(idx | 0) || (map = '=', idx % 1);
    // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
    output += map.charAt(63 & block >> 8 - idx % 1 * 8)
  ) {
    charCode = str.charCodeAt(idx += 3 / 4);
    if (charCode > 0xFF) {
      throw new E();
    }
    block = block << 8 | charCode;
  }
  return output;
}

module.exports = btoa;


/***/ }),

/***/ "./node_modules/axios/lib/helpers/buildURL.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/helpers/buildURL.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

function encode(val) {
  return encodeURIComponent(val).
    replace(/%40/gi, '@').
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/combineURLs.js":
/*!*******************************************************!*\
  !*** ./node_modules/axios/lib/helpers/combineURLs.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/cookies.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/helpers/cookies.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
  (function standardBrowserEnv() {
    return {
      write: function write(name, value, expires, path, domain, secure) {
        var cookie = [];
        cookie.push(name + '=' + encodeURIComponent(value));

        if (utils.isNumber(expires)) {
          cookie.push('expires=' + new Date(expires).toGMTString());
        }

        if (utils.isString(path)) {
          cookie.push('path=' + path);
        }

        if (utils.isString(domain)) {
          cookie.push('domain=' + domain);
        }

        if (secure === true) {
          cookie.push('secure');
        }

        document.cookie = cookie.join('; ');
      },

      read: function read(name) {
        var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
        return (match ? decodeURIComponent(match[3]) : null);
      },

      remove: function remove(name) {
        this.write(name, '', Date.now() - 86400000);
      }
    };
  })() :

  // Non standard browser env (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return {
      write: function write() {},
      read: function read() { return null; },
      remove: function remove() {}
    };
  })()
);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isAbsoluteURL.js":
/*!*********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isAbsoluteURL.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isURLSameOrigin.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isURLSameOrigin.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
  (function standardBrowserEnv() {
    var msie = /(msie|trident)/i.test(navigator.userAgent);
    var urlParsingNode = document.createElement('a');
    var originURL;

    /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
    function resolveURL(url) {
      var href = url;

      if (msie) {
        // IE needs attribute set twice to normalize properties
        urlParsingNode.setAttribute('href', href);
        href = urlParsingNode.href;
      }

      urlParsingNode.setAttribute('href', href);

      // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
      return {
        href: urlParsingNode.href,
        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
        host: urlParsingNode.host,
        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
        hostname: urlParsingNode.hostname,
        port: urlParsingNode.port,
        pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
                  urlParsingNode.pathname :
                  '/' + urlParsingNode.pathname
      };
    }

    originURL = resolveURL(window.location.href);

    /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
    return function isURLSameOrigin(requestURL) {
      var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
      return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
    };
  })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return function isURLSameOrigin() {
      return true;
    };
  })()
);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/normalizeHeaderName.js":
/*!***************************************************************!*\
  !*** ./node_modules/axios/lib/helpers/normalizeHeaderName.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/parseHeaders.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/parseHeaders.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/spread.js":
/*!**************************************************!*\
  !*** ./node_modules/axios/lib/helpers/spread.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};


/***/ }),

/***/ "./node_modules/axios/lib/utils.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/utils.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");
var isBuffer = __webpack_require__(/*! is-buffer */ "./node_modules/is-buffer/index.js");

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim
};


/***/ }),

/***/ "./node_modules/is-buffer/index.js":
/*!*****************************************!*\
  !*** ./node_modules/is-buffer/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
module.exports = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
}

function isBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
}


/***/ }),

/***/ "./node_modules/mobx/lib/mobx.module.js":
/*!**********************************************!*\
  !*** ./node_modules/mobx/lib/mobx.module.js ***!
  \**********************************************/
/*! exports provided: Reaction, untracked, IDerivationState, createAtom, spy, comparer, isObservableObject, isBoxedObservable, isObservableArray, ObservableMap, isObservableMap, ObservableSet, isObservableSet, transaction, observable, computed, isObservable, isObservableProp, isComputed, isComputedProp, extendObservable, observe, intercept, autorun, reaction, when, action, isAction, runInAction, keys, values, entries, set, remove, has, get, decorate, configure, onBecomeObserved, onBecomeUnobserved, flow, toJS, trace, getDependencyTree, getObserverTree, _resetGlobalState, _getGlobalState, getDebugName, getAtom, _getAdministration, _allowStateChanges, _allowStateChangesInsideComputed, isArrayLike, $mobx, _isComputingDerivation, onReactionError, _interceptReads */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(process, global) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Reaction", function() { return Reaction$$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "untracked", function() { return untracked$$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IDerivationState", function() { return IDerivationState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createAtom", function() { return createAtom$$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spy", function() { return spy$$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "comparer", function() { return comparer$$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isObservableObject", function() { return isObservableObject$$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isBoxedObservable", function() { return isObservableValue$$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isObservableArray", function() { return isObservableArray$$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ObservableMap", function() { return ObservableMap$$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isObservableMap", function() { return isObservableMap$$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ObservableSet", function() { return ObservableSet$$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isObservableSet", function() { return isObservableSet$$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "transaction", function() { return transaction$$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "observable", function() { return observable$$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "computed", function() { return computed$$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isObservable", function() { return isObservable$$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isObservableProp", function() { return isObservableProp$$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isComputed", function() { return isComputed$$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isComputedProp", function() { return isComputedProp$$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "extendObservable", function() { return extendObservable$$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "observe", function() { return observe$$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "intercept", function() { return intercept$$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "autorun", function() { return autorun$$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reaction", function() { return reaction$$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "when", function() { return when$$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "action", function() { return action$$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isAction", function() { return isAction$$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "runInAction", function() { return runInAction$$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "keys", function() { return keys$$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "values", function() { return values$$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "entries", function() { return entries$$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "set", function() { return set$$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "remove", function() { return remove$$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "has", function() { return has$$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "get", function() { return get$$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "decorate", function() { return decorate$$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "configure", function() { return configure$$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "onBecomeObserved", function() { return onBecomeObserved$$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "onBecomeUnobserved", function() { return onBecomeUnobserved$$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "flow", function() { return flow$$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toJS", function() { return toJS$$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "trace", function() { return trace$$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDependencyTree", function() { return getDependencyTree$$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getObserverTree", function() { return getObserverTree$$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_resetGlobalState", function() { return resetGlobalState$$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_getGlobalState", function() { return getGlobalState$$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDebugName", function() { return getDebugName$$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAtom", function() { return getAtom$$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_getAdministration", function() { return getAdministration$$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_allowStateChanges", function() { return allowStateChanges$$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_allowStateChangesInsideComputed", function() { return allowStateChangesInsideComputed$$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isArrayLike", function() { return isArrayLike$$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "$mobx", function() { return $mobx$$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_isComputingDerivation", function() { return isComputingDerivation$$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "onReactionError", function() { return onReactionError$$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "_interceptReads", function() { return interceptReads$$1; });
/** MobX - (c) Michel Weststrate 2015 - 2018 - MIT Licensed */
/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = Object.setPrototypeOf ||
    ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
    function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = Object.assign || function __assign(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
};















function __values(o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

var OBFUSCATED_ERROR$$1 = "An invariant failed, however the error is obfuscated because this is an production build.";
var EMPTY_ARRAY$$1 = [];
Object.freeze(EMPTY_ARRAY$$1);
var EMPTY_OBJECT$$1 = {};
Object.freeze(EMPTY_OBJECT$$1);
function getNextId$$1() {
    return ++globalState$$1.mobxGuid;
}
function fail$$1(message) {
    invariant$$1(false, message);
    throw "X"; // unreachable
}
function invariant$$1(check, message) {
    if (!check)
        throw new Error("[mobx] " + (message || OBFUSCATED_ERROR$$1));
}
/**
 * Prints a deprecation message, but only one time.
 * Returns false if the deprecated message was already printed before
 */
var deprecatedMessages = [];
function deprecated$$1(msg, thing) {
    if (false)
        {}
    if (thing) {
        return deprecated$$1("'" + msg + "', use '" + thing + "' instead.");
    }
    if (deprecatedMessages.indexOf(msg) !== -1)
        return false;
    deprecatedMessages.push(msg);
    console.error("[mobx] Deprecated: " + msg);
    return true;
}
/**
 * Makes sure that the provided function is invoked at most once.
 */
function once$$1(func) {
    var invoked = false;
    return function () {
        if (invoked)
            return;
        invoked = true;
        return func.apply(this, arguments);
    };
}
var noop$$1 = function () { };
function unique$$1(list) {
    var res = [];
    list.forEach(function (item) {
        if (res.indexOf(item) === -1)
            res.push(item);
    });
    return res;
}
function isObject$$1(value) {
    return value !== null && typeof value === "object";
}
function isPlainObject$$1(value) {
    if (value === null || typeof value !== "object")
        return false;
    var proto = Object.getPrototypeOf(value);
    return proto === Object.prototype || proto === null;
}

function addHiddenProp$$1(object, propName, value) {
    Object.defineProperty(object, propName, {
        enumerable: false,
        writable: true,
        configurable: true,
        value: value
    });
}
function addHiddenFinalProp$$1(object, propName, value) {
    Object.defineProperty(object, propName, {
        enumerable: false,
        writable: false,
        configurable: true,
        value: value
    });
}
function isPropertyConfigurable$$1(object, prop) {
    var descriptor = Object.getOwnPropertyDescriptor(object, prop);
    return !descriptor || (descriptor.configurable !== false && descriptor.writable !== false);
}
function assertPropertyConfigurable$$1(object, prop) {
    if ( true && !isPropertyConfigurable$$1(object, prop))
        fail$$1("Cannot make property '" + prop.toString() + "' observable, it is not configurable and writable in the target object");
}
function createInstanceofPredicate$$1(name, clazz) {
    var propName = "isMobX" + name;
    clazz.prototype[propName] = true;
    return function (x) {
        return isObject$$1(x) && x[propName] === true;
    };
}
/**
 * Returns whether the argument is an array, disregarding observability.
 */
function isArrayLike$$1(x) {
    return Array.isArray(x) || isObservableArray$$1(x);
}
function isES6Map$$1(thing) {
    return thing instanceof Map;
}
function isES6Set$$1(thing) {
    return thing instanceof Set;
}
function getMapLikeKeys$$1(map) {
    if (isPlainObject$$1(map))
        return Object.keys(map);
    if (Array.isArray(map))
        return map.map(function (_a) {
            var _b = __read(_a, 1), key = _b[0];
            return key;
        });
    if (isES6Map$$1(map) || isObservableMap$$1(map))
        return Array.from(map.keys());
    return fail$$1("Cannot get keys from '" + map + "'");
}
function toPrimitive$$1(value) {
    return value === null ? null : typeof value === "object" ? "" + value : value;
}

var $mobx$$1 = Symbol("mobx administration");
var Atom$$1 = /** @class */ (function () {
    /**
     * Create a new atom. For debugging purposes it is recommended to give it a name.
     * The onBecomeObserved and onBecomeUnobserved callbacks can be used for resource management.
     */
    function Atom$$1(name) {
        if (name === void 0) { name = "Atom@" + getNextId$$1(); }
        this.name = name;
        this.isPendingUnobservation = false; // for effective unobserving. BaseAtom has true, for extra optimization, so its onBecomeUnobserved never gets called, because it's not needed
        this.isBeingObserved = false;
        this.observers = new Set();
        this.diffValue = 0;
        this.lastAccessedBy = 0;
        this.lowestObserverState = IDerivationState.NOT_TRACKING;
    }
    Atom$$1.prototype.onBecomeObserved = function () {
        if (this.onBecomeObservedListeners) {
            this.onBecomeObservedListeners.forEach(function (listener) { return listener(); });
        }
    };
    Atom$$1.prototype.onBecomeUnobserved = function () {
        if (this.onBecomeUnobservedListeners) {
            this.onBecomeUnobservedListeners.forEach(function (listener) { return listener(); });
        }
    };
    /**
     * Invoke this method to notify mobx that your atom has been used somehow.
     * Returns true if there is currently a reactive context.
     */
    Atom$$1.prototype.reportObserved = function () {
        return reportObserved$$1(this);
    };
    /**
     * Invoke this method _after_ this method has changed to signal mobx that all its observers should invalidate.
     */
    Atom$$1.prototype.reportChanged = function () {
        startBatch$$1();
        propagateChanged$$1(this);
        endBatch$$1();
    };
    Atom$$1.prototype.toString = function () {
        return this.name;
    };
    return Atom$$1;
}());
var isAtom$$1 = createInstanceofPredicate$$1("Atom", Atom$$1);
function createAtom$$1(name, onBecomeObservedHandler, onBecomeUnobservedHandler) {
    if (onBecomeObservedHandler === void 0) { onBecomeObservedHandler = noop$$1; }
    if (onBecomeUnobservedHandler === void 0) { onBecomeUnobservedHandler = noop$$1; }
    var atom = new Atom$$1(name);
    // default `noop` listener will not initialize the hook Set
    if (onBecomeObservedHandler !== noop$$1) {
        onBecomeObserved$$1(atom, onBecomeObservedHandler);
    }
    if (onBecomeUnobservedHandler !== noop$$1) {
        onBecomeUnobserved$$1(atom, onBecomeUnobservedHandler);
    }
    return atom;
}

function identityComparer(a, b) {
    return a === b;
}
function structuralComparer(a, b) {
    return deepEqual$$1(a, b);
}
function defaultComparer(a, b) {
    return Object.is(a, b);
}
var comparer$$1 = {
    identity: identityComparer,
    structural: structuralComparer,
    default: defaultComparer
};

var mobxDidRunLazyInitializersSymbol$$1 = Symbol("mobx did run lazy initializers");
var mobxPendingDecorators$$1 = Symbol("mobx pending decorators");
var enumerableDescriptorCache = {};
var nonEnumerableDescriptorCache = {};
function createPropertyInitializerDescriptor(prop, enumerable) {
    var cache = enumerable ? enumerableDescriptorCache : nonEnumerableDescriptorCache;
    return (cache[prop] ||
        (cache[prop] = {
            configurable: true,
            enumerable: enumerable,
            get: function () {
                initializeInstance$$1(this);
                return this[prop];
            },
            set: function (value) {
                initializeInstance$$1(this);
                this[prop] = value;
            }
        }));
}
function initializeInstance$$1(target) {
    if (target[mobxDidRunLazyInitializersSymbol$$1] === true)
        return;
    var decorators = target[mobxPendingDecorators$$1];
    if (decorators) {
        addHiddenProp$$1(target, mobxDidRunLazyInitializersSymbol$$1, true);
        for (var key in decorators) {
            var d = decorators[key];
            d.propertyCreator(target, d.prop, d.descriptor, d.decoratorTarget, d.decoratorArguments);
        }
    }
}
function createPropDecorator$$1(propertyInitiallyEnumerable, propertyCreator) {
    return function decoratorFactory() {
        var decoratorArguments;
        var decorator = function decorate$$1(target, prop, descriptor, applyImmediately
        // This is a special parameter to signal the direct application of a decorator, allow extendObservable to skip the entire type decoration part,
        // as the instance to apply the decorator to equals the target
        ) {
            if (applyImmediately === true) {
                propertyCreator(target, prop, descriptor, target, decoratorArguments);
                return null;
            }
            if ( true && !quacksLikeADecorator$$1(arguments))
                fail$$1("This function is a decorator, but it wasn't invoked like a decorator");
            if (!Object.prototype.hasOwnProperty.call(target, mobxPendingDecorators$$1)) {
                var inheritedDecorators = target[mobxPendingDecorators$$1];
                addHiddenProp$$1(target, mobxPendingDecorators$$1, __assign({}, inheritedDecorators));
            }
            target[mobxPendingDecorators$$1][prop] = {
                prop: prop,
                propertyCreator: propertyCreator,
                descriptor: descriptor,
                decoratorTarget: target,
                decoratorArguments: decoratorArguments
            };
            return createPropertyInitializerDescriptor(prop, propertyInitiallyEnumerable);
        };
        if (quacksLikeADecorator$$1(arguments)) {
            // @decorator
            decoratorArguments = EMPTY_ARRAY$$1;
            return decorator.apply(null, arguments);
        }
        else {
            // @decorator(args)
            decoratorArguments = Array.prototype.slice.call(arguments);
            return decorator;
        }
    };
}
function quacksLikeADecorator$$1(args) {
    return (((args.length === 2 || args.length === 3) && typeof args[1] === "string") ||
        (args.length === 4 && args[3] === true));
}

function deepEnhancer$$1(v, _, name) {
    // it is an observable already, done
    if (isObservable$$1(v))
        return v;
    // something that can be converted and mutated?
    if (Array.isArray(v))
        return observable$$1.array(v, { name: name });
    if (isPlainObject$$1(v))
        return observable$$1.object(v, undefined, { name: name });
    if (isES6Map$$1(v))
        return observable$$1.map(v, { name: name });
    if (isES6Set$$1(v))
        return observable$$1.set(v, { name: name });
    return v;
}
function shallowEnhancer$$1(v, _, name) {
    if (v === undefined || v === null)
        return v;
    if (isObservableObject$$1(v) || isObservableArray$$1(v) || isObservableMap$$1(v) || isObservableSet$$1(v))
        return v;
    if (Array.isArray(v))
        return observable$$1.array(v, { name: name, deep: false });
    if (isPlainObject$$1(v))
        return observable$$1.object(v, undefined, { name: name, deep: false });
    if (isES6Map$$1(v))
        return observable$$1.map(v, { name: name, deep: false });
    if (isES6Set$$1(v))
        return observable$$1.set(v, { name: name, deep: false });
    return fail$$1( true &&
        "The shallow modifier / decorator can only used in combination with arrays, objects, maps and sets");
}
function referenceEnhancer$$1(newValue) {
    // never turn into an observable
    return newValue;
}
function refStructEnhancer$$1(v, oldValue, name) {
    if ( true && isObservable$$1(v))
        throw "observable.struct should not be used with observable values";
    if (deepEqual$$1(v, oldValue))
        return oldValue;
    return v;
}

function createDecoratorForEnhancer$$1(enhancer) {
    invariant$$1(enhancer);
    var decorator = createPropDecorator$$1(true, function (target, propertyName, descriptor, _decoratorTarget, decoratorArgs) {
        if (true) {
            invariant$$1(!descriptor || !descriptor.get, "@observable cannot be used on getter (property \"" + propertyName + "\"), use @computed instead.");
        }
        var initialValue = descriptor
            ? descriptor.initializer
                ? descriptor.initializer.call(target)
                : descriptor.value
            : undefined;
        asObservableObject$$1(target).addObservableProp(propertyName, initialValue, enhancer);
    });
    var res = 
    // Extra process checks, as this happens during module initialization
    typeof process !== "undefined" && process.env && "development" !== "production"
        ? function observableDecorator() {
            // This wrapper function is just to detect illegal decorator invocations, deprecate in a next version
            // and simply return the created prop decorator
            if (arguments.length < 2)
                return fail$$1("Incorrect decorator invocation. @observable decorator doesn't expect any arguments");
            return decorator.apply(null, arguments);
        }
        : decorator;
    res.enhancer = enhancer;
    return res;
}

// Predefined bags of create observable options, to avoid allocating temporarily option objects
// in the majority of cases
var defaultCreateObservableOptions$$1 = {
    deep: true,
    name: undefined,
    defaultDecorator: undefined,
    proxy: true
};
Object.freeze(defaultCreateObservableOptions$$1);
function assertValidOption(key) {
    if (!/^(deep|name|equals|defaultDecorator|proxy)$/.test(key))
        fail$$1("invalid option for (extend)observable: " + key);
}
function asCreateObservableOptions$$1(thing) {
    if (thing === null || thing === undefined)
        return defaultCreateObservableOptions$$1;
    if (typeof thing === "string")
        return { name: thing, deep: true, proxy: true };
    if (true) {
        if (typeof thing !== "object")
            return fail$$1("expected options object");
        Object.keys(thing).forEach(assertValidOption);
    }
    return thing;
}
var deepDecorator$$1 = createDecoratorForEnhancer$$1(deepEnhancer$$1);
var shallowDecorator = createDecoratorForEnhancer$$1(shallowEnhancer$$1);
var refDecorator$$1 = createDecoratorForEnhancer$$1(referenceEnhancer$$1);
var refStructDecorator = createDecoratorForEnhancer$$1(refStructEnhancer$$1);
function getEnhancerFromOptions(options) {
    return options.defaultDecorator
        ? options.defaultDecorator.enhancer
        : options.deep === false
            ? referenceEnhancer$$1
            : deepEnhancer$$1;
}
/**
 * Turns an object, array or function into a reactive structure.
 * @param v the value which should become observable.
 */
function createObservable(v, arg2, arg3) {
    // @observable someProp;
    if (typeof arguments[1] === "string") {
        return deepDecorator$$1.apply(null, arguments);
    }
    // it is an observable already, done
    if (isObservable$$1(v))
        return v;
    // something that can be converted and mutated?
    var res = isPlainObject$$1(v)
        ? observable$$1.object(v, arg2, arg3)
        : Array.isArray(v)
            ? observable$$1.array(v, arg2)
            : isES6Map$$1(v)
                ? observable$$1.map(v, arg2)
                : isES6Set$$1(v)
                    ? observable$$1.set(v, arg2)
                    : v;
    // this value could be converted to a new observable data structure, return it
    if (res !== v)
        return res;
    // otherwise, just box it
    fail$$1( true &&
        "The provided value could not be converted into an observable. If you want just create an observable reference to the object use 'observable.box(value)'");
}
var observableFactories = {
    box: function (value, options) {
        if (arguments.length > 2)
            incorrectlyUsedAsDecorator("box");
        var o = asCreateObservableOptions$$1(options);
        return new ObservableValue$$1(value, getEnhancerFromOptions(o), o.name, true, o.equals);
    },
    array: function (initialValues, options) {
        if (arguments.length > 2)
            incorrectlyUsedAsDecorator("array");
        var o = asCreateObservableOptions$$1(options);
        return createObservableArray$$1(initialValues, getEnhancerFromOptions(o), o.name);
    },
    map: function (initialValues, options) {
        if (arguments.length > 2)
            incorrectlyUsedAsDecorator("map");
        var o = asCreateObservableOptions$$1(options);
        return new ObservableMap$$1(initialValues, getEnhancerFromOptions(o), o.name);
    },
    set: function (initialValues, options) {
        if (arguments.length > 2)
            incorrectlyUsedAsDecorator("set");
        var o = asCreateObservableOptions$$1(options);
        return new ObservableSet$$1(initialValues, getEnhancerFromOptions(o), o.name);
    },
    object: function (props, decorators, options) {
        if (typeof arguments[1] === "string")
            incorrectlyUsedAsDecorator("object");
        var o = asCreateObservableOptions$$1(options);
        if (o.proxy === false) {
            return extendObservable$$1({}, props, decorators, o);
        }
        else {
            var defaultDecorator = getDefaultDecoratorFromObjectOptions$$1(o);
            var base = extendObservable$$1({}, undefined, undefined, o);
            var proxy = createDynamicObservableObject$$1(base);
            extendObservableObjectWithProperties$$1(proxy, props, decorators, defaultDecorator);
            return proxy;
        }
    },
    ref: refDecorator$$1,
    shallow: shallowDecorator,
    deep: deepDecorator$$1,
    struct: refStructDecorator
};
var observable$$1 = createObservable;
// weird trick to keep our typings nicely with our funcs, and still extend the observable function
Object.keys(observableFactories).forEach(function (name) { return (observable$$1[name] = observableFactories[name]); });
function incorrectlyUsedAsDecorator(methodName) {
    fail$$1(
    // process.env.NODE_ENV !== "production" &&
    "Expected one or two arguments to observable." + methodName + ". Did you accidentally try to use observable." + methodName + " as decorator?");
}

var computedDecorator$$1 = createPropDecorator$$1(false, function (instance, propertyName, descriptor, decoratorTarget, decoratorArgs) {
    var get$$1 = descriptor.get, set$$1 = descriptor.set; // initialValue is the descriptor for get / set props
    // Optimization: faster on decorator target or instance? Assuming target
    // Optimization: find out if declaring on instance isn't just faster. (also makes the property descriptor simpler). But, more memory usage..
    // Forcing instance now, fixes hot reloadig issues on React Native:
    var options = decoratorArgs[0] || {};
    asObservableObject$$1(instance).addComputedProp(instance, propertyName, __assign({ get: get$$1,
        set: set$$1, context: instance }, options));
});
var computedStructDecorator = computedDecorator$$1({ equals: comparer$$1.structural });
/**
 * Decorator for class properties: @computed get value() { return expr; }.
 * For legacy purposes also invokable as ES5 observable created: `computed(() => expr)`;
 */
var computed$$1 = function computed$$1(arg1, arg2, arg3) {
    if (typeof arg2 === "string") {
        // @computed
        return computedDecorator$$1.apply(null, arguments);
    }
    if (arg1 !== null && typeof arg1 === "object" && arguments.length === 1) {
        // @computed({ options })
        return computedDecorator$$1.apply(null, arguments);
    }
    // computed(expr, options?)
    if (true) {
        invariant$$1(typeof arg1 === "function", "First argument to `computed` should be an expression.");
        invariant$$1(arguments.length < 3, "Computed takes one or two arguments if used as function");
    }
    var opts = typeof arg2 === "object" ? arg2 : {};
    opts.get = arg1;
    opts.set = typeof arg2 === "function" ? arg2 : opts.set;
    opts.name = opts.name || arg1.name || ""; /* for generated name */
    return new ComputedValue$$1(opts);
};
computed$$1.struct = computedStructDecorator;

function createAction$$1(actionName, fn) {
    if (true) {
        invariant$$1(typeof fn === "function", "`action` can only be invoked on functions");
        if (typeof actionName !== "string" || !actionName)
            fail$$1("actions should have valid names, got: '" + actionName + "'");
    }
    var res = function () {
        return executeAction$$1(actionName, fn, this, arguments);
    };
    res.isMobxAction = true;
    return res;
}
function executeAction$$1(actionName, fn, scope, args) {
    var runInfo = startAction(actionName, fn, scope, args);
    var shouldSupressReactionError = true;
    try {
        var res = fn.apply(scope, args);
        shouldSupressReactionError = false;
        return res;
    }
    finally {
        if (shouldSupressReactionError) {
            globalState$$1.suppressReactionErrors = shouldSupressReactionError;
            endAction(runInfo);
            globalState$$1.suppressReactionErrors = false;
        }
        else {
            endAction(runInfo);
        }
    }
}
function startAction(actionName, fn, scope, args) {
    var notifySpy = isSpyEnabled$$1() && !!actionName;
    var startTime = 0;
    if (notifySpy && "development" !== "production") {
        startTime = Date.now();
        var l = (args && args.length) || 0;
        var flattendArgs = new Array(l);
        if (l > 0)
            for (var i = 0; i < l; i++)
                flattendArgs[i] = args[i];
        spyReportStart$$1({
            type: "action",
            name: actionName,
            object: scope,
            arguments: flattendArgs
        });
    }
    var prevDerivation = untrackedStart$$1();
    startBatch$$1();
    var prevAllowStateChanges = allowStateChangesStart$$1(true);
    return {
        prevDerivation: prevDerivation,
        prevAllowStateChanges: prevAllowStateChanges,
        notifySpy: notifySpy,
        startTime: startTime
    };
}
function endAction(runInfo) {
    allowStateChangesEnd$$1(runInfo.prevAllowStateChanges);
    endBatch$$1();
    untrackedEnd$$1(runInfo.prevDerivation);
    if (runInfo.notifySpy && "development" !== "production")
        spyReportEnd$$1({ time: Date.now() - runInfo.startTime });
}
function allowStateChanges$$1(allowStateChanges$$1, func) {
    var prev = allowStateChangesStart$$1(allowStateChanges$$1);
    var res;
    try {
        res = func();
    }
    finally {
        allowStateChangesEnd$$1(prev);
    }
    return res;
}
function allowStateChangesStart$$1(allowStateChanges$$1) {
    var prev = globalState$$1.allowStateChanges;
    globalState$$1.allowStateChanges = allowStateChanges$$1;
    return prev;
}
function allowStateChangesEnd$$1(prev) {
    globalState$$1.allowStateChanges = prev;
}
function allowStateChangesInsideComputed$$1(func) {
    var prev = globalState$$1.computationDepth;
    globalState$$1.computationDepth = 0;
    var res;
    try {
        res = func();
    }
    finally {
        globalState$$1.computationDepth = prev;
    }
    return res;
}

var ObservableValue$$1 = /** @class */ (function (_super) {
    __extends(ObservableValue$$1, _super);
    function ObservableValue$$1(value, enhancer, name, notifySpy, equals) {
        if (name === void 0) { name = "ObservableValue@" + getNextId$$1(); }
        if (notifySpy === void 0) { notifySpy = true; }
        if (equals === void 0) { equals = comparer$$1.default; }
        var _this = _super.call(this, name) || this;
        _this.enhancer = enhancer;
        _this.name = name;
        _this.equals = equals;
        _this.hasUnreportedChange = false;
        _this.value = enhancer(value, undefined, name);
        if (notifySpy && isSpyEnabled$$1() && "development" !== "production") {
            // only notify spy if this is a stand-alone observable
            spyReport$$1({ type: "create", name: _this.name, newValue: "" + _this.value });
        }
        return _this;
    }
    ObservableValue$$1.prototype.dehanceValue = function (value) {
        if (this.dehancer !== undefined)
            return this.dehancer(value);
        return value;
    };
    ObservableValue$$1.prototype.set = function (newValue) {
        var oldValue = this.value;
        newValue = this.prepareNewValue(newValue);
        if (newValue !== globalState$$1.UNCHANGED) {
            var notifySpy = isSpyEnabled$$1();
            if (notifySpy && "development" !== "production") {
                spyReportStart$$1({
                    type: "update",
                    name: this.name,
                    newValue: newValue,
                    oldValue: oldValue
                });
            }
            this.setNewValue(newValue);
            if (notifySpy && "development" !== "production")
                spyReportEnd$$1();
        }
    };
    ObservableValue$$1.prototype.prepareNewValue = function (newValue) {
        checkIfStateModificationsAreAllowed$$1(this);
        if (hasInterceptors$$1(this)) {
            var change = interceptChange$$1(this, {
                object: this,
                type: "update",
                newValue: newValue
            });
            if (!change)
                return globalState$$1.UNCHANGED;
            newValue = change.newValue;
        }
        // apply modifier
        newValue = this.enhancer(newValue, this.value, this.name);
        return this.equals(this.value, newValue) ? globalState$$1.UNCHANGED : newValue;
    };
    ObservableValue$$1.prototype.setNewValue = function (newValue) {
        var oldValue = this.value;
        this.value = newValue;
        this.reportChanged();
        if (hasListeners$$1(this)) {
            notifyListeners$$1(this, {
                type: "update",
                object: this,
                newValue: newValue,
                oldValue: oldValue
            });
        }
    };
    ObservableValue$$1.prototype.get = function () {
        this.reportObserved();
        return this.dehanceValue(this.value);
    };
    ObservableValue$$1.prototype.intercept = function (handler) {
        return registerInterceptor$$1(this, handler);
    };
    ObservableValue$$1.prototype.observe = function (listener, fireImmediately) {
        if (fireImmediately)
            listener({
                object: this,
                type: "update",
                newValue: this.value,
                oldValue: undefined
            });
        return registerListener$$1(this, listener);
    };
    ObservableValue$$1.prototype.toJSON = function () {
        return this.get();
    };
    ObservableValue$$1.prototype.toString = function () {
        return this.name + "[" + this.value + "]";
    };
    ObservableValue$$1.prototype.valueOf = function () {
        return toPrimitive$$1(this.get());
    };
    ObservableValue$$1.prototype[Symbol.toPrimitive] = function () {
        return this.valueOf();
    };
    return ObservableValue$$1;
}(Atom$$1));
var isObservableValue$$1 = createInstanceofPredicate$$1("ObservableValue", ObservableValue$$1);

/**
 * A node in the state dependency root that observes other nodes, and can be observed itself.
 *
 * ComputedValue will remember the result of the computation for the duration of the batch, or
 * while being observed.
 *
 * During this time it will recompute only when one of its direct dependencies changed,
 * but only when it is being accessed with `ComputedValue.get()`.
 *
 * Implementation description:
 * 1. First time it's being accessed it will compute and remember result
 *    give back remembered result until 2. happens
 * 2. First time any deep dependency change, propagate POSSIBLY_STALE to all observers, wait for 3.
 * 3. When it's being accessed, recompute if any shallow dependency changed.
 *    if result changed: propagate STALE to all observers, that were POSSIBLY_STALE from the last step.
 *    go to step 2. either way
 *
 * If at any point it's outside batch and it isn't observed: reset everything and go to 1.
 */
var ComputedValue$$1 = /** @class */ (function () {
    /**
     * Create a new computed value based on a function expression.
     *
     * The `name` property is for debug purposes only.
     *
     * The `equals` property specifies the comparer function to use to determine if a newly produced
     * value differs from the previous value. Two comparers are provided in the library; `defaultComparer`
     * compares based on identity comparison (===), and `structualComparer` deeply compares the structure.
     * Structural comparison can be convenient if you always produce a new aggregated object and
     * don't want to notify observers if it is structurally the same.
     * This is useful for working with vectors, mouse coordinates etc.
     */
    function ComputedValue$$1(options) {
        this.dependenciesState = IDerivationState.NOT_TRACKING;
        this.observing = []; // nodes we are looking at. Our value depends on these nodes
        this.newObserving = null; // during tracking it's an array with new observed observers
        this.isBeingObserved = false;
        this.isPendingUnobservation = false;
        this.observers = new Set();
        this.diffValue = 0;
        this.runId = 0;
        this.lastAccessedBy = 0;
        this.lowestObserverState = IDerivationState.UP_TO_DATE;
        this.unboundDepsCount = 0;
        this.__mapid = "#" + getNextId$$1();
        this.value = new CaughtException$$1(null);
        this.isComputing = false; // to check for cycles
        this.isRunningSetter = false;
        this.isTracing = TraceMode$$1.NONE;
        if ( true && !options.get)
            throw "[mobx] missing option for computed: get";
        this.derivation = options.get;
        this.name = options.name || "ComputedValue@" + getNextId$$1();
        if (options.set)
            this.setter = createAction$$1(this.name + "-setter", options.set);
        this.equals =
            options.equals ||
                (options.compareStructural || options.struct
                    ? comparer$$1.structural
                    : comparer$$1.default);
        this.scope = options.context;
        this.requiresReaction = !!options.requiresReaction;
        this.keepAlive = !!options.keepAlive;
    }
    ComputedValue$$1.prototype.onBecomeStale = function () {
        propagateMaybeChanged$$1(this);
    };
    ComputedValue$$1.prototype.onBecomeObserved = function () {
        if (this.onBecomeObservedListeners) {
            this.onBecomeObservedListeners.forEach(function (listener) { return listener(); });
        }
    };
    ComputedValue$$1.prototype.onBecomeUnobserved = function () {
        if (this.onBecomeUnobservedListeners) {
            this.onBecomeUnobservedListeners.forEach(function (listener) { return listener(); });
        }
    };
    /**
     * Returns the current value of this computed value.
     * Will evaluate its computation first if needed.
     */
    ComputedValue$$1.prototype.get = function () {
        if (this.isComputing)
            fail$$1("Cycle detected in computation " + this.name + ": " + this.derivation);
        if (globalState$$1.inBatch === 0 && this.observers.size === 0 && !this.keepAlive) {
            if (shouldCompute$$1(this)) {
                this.warnAboutUntrackedRead();
                startBatch$$1(); // See perf test 'computed memoization'
                this.value = this.computeValue(false);
                endBatch$$1();
            }
        }
        else {
            reportObserved$$1(this);
            if (shouldCompute$$1(this))
                if (this.trackAndCompute())
                    propagateChangeConfirmed$$1(this);
        }
        var result = this.value;
        if (isCaughtException$$1(result))
            throw result.cause;
        return result;
    };
    ComputedValue$$1.prototype.peek = function () {
        var res = this.computeValue(false);
        if (isCaughtException$$1(res))
            throw res.cause;
        return res;
    };
    ComputedValue$$1.prototype.set = function (value) {
        if (this.setter) {
            invariant$$1(!this.isRunningSetter, "The setter of computed value '" + this.name + "' is trying to update itself. Did you intend to update an _observable_ value, instead of the computed property?");
            this.isRunningSetter = true;
            try {
                this.setter.call(this.scope, value);
            }
            finally {
                this.isRunningSetter = false;
            }
        }
        else
            invariant$$1(false,  true &&
                "[ComputedValue '" + this.name + "'] It is not possible to assign a new value to a computed value.");
    };
    ComputedValue$$1.prototype.trackAndCompute = function () {
        if (isSpyEnabled$$1() && "development" !== "production") {
            spyReport$$1({
                object: this.scope,
                type: "compute",
                name: this.name
            });
        }
        var oldValue = this.value;
        var wasSuspended = 
        /* see #1208 */ this.dependenciesState === IDerivationState.NOT_TRACKING;
        var newValue = this.computeValue(true);
        var changed = wasSuspended ||
            isCaughtException$$1(oldValue) ||
            isCaughtException$$1(newValue) ||
            !this.equals(oldValue, newValue);
        if (changed) {
            this.value = newValue;
        }
        return changed;
    };
    ComputedValue$$1.prototype.computeValue = function (track) {
        this.isComputing = true;
        globalState$$1.computationDepth++;
        var res;
        if (track) {
            res = trackDerivedFunction$$1(this, this.derivation, this.scope);
        }
        else {
            if (globalState$$1.disableErrorBoundaries === true) {
                res = this.derivation.call(this.scope);
            }
            else {
                try {
                    res = this.derivation.call(this.scope);
                }
                catch (e) {
                    res = new CaughtException$$1(e);
                }
            }
        }
        globalState$$1.computationDepth--;
        this.isComputing = false;
        return res;
    };
    ComputedValue$$1.prototype.suspend = function () {
        if (!this.keepAlive) {
            clearObserving$$1(this);
            this.value = undefined; // don't hold on to computed value!
        }
    };
    ComputedValue$$1.prototype.observe = function (listener, fireImmediately) {
        var _this = this;
        var firstTime = true;
        var prevValue = undefined;
        return autorun$$1(function () {
            var newValue = _this.get();
            if (!firstTime || fireImmediately) {
                var prevU = untrackedStart$$1();
                listener({
                    type: "update",
                    object: _this,
                    newValue: newValue,
                    oldValue: prevValue
                });
                untrackedEnd$$1(prevU);
            }
            firstTime = false;
            prevValue = newValue;
        });
    };
    ComputedValue$$1.prototype.warnAboutUntrackedRead = function () {
        if (false)
            {}
        if (this.requiresReaction === true) {
            fail$$1("[mobx] Computed value " + this.name + " is read outside a reactive context");
        }
        if (this.isTracing !== TraceMode$$1.NONE) {
            console.log("[mobx.trace] '" + this.name + "' is being read outside a reactive context. Doing a full recompute");
        }
        if (globalState$$1.computedRequiresReaction) {
            console.warn("[mobx] Computed value " + this.name + " is being read outside a reactive context. Doing a full recompute");
        }
    };
    ComputedValue$$1.prototype.toJSON = function () {
        return this.get();
    };
    ComputedValue$$1.prototype.toString = function () {
        return this.name + "[" + this.derivation.toString() + "]";
    };
    ComputedValue$$1.prototype.valueOf = function () {
        return toPrimitive$$1(this.get());
    };
    ComputedValue$$1.prototype[Symbol.toPrimitive] = function () {
        return this.valueOf();
    };
    return ComputedValue$$1;
}());
var isComputedValue$$1 = createInstanceofPredicate$$1("ComputedValue", ComputedValue$$1);

var IDerivationState;
(function (IDerivationState$$1) {
    // before being run or (outside batch and not being observed)
    // at this point derivation is not holding any data about dependency tree
    IDerivationState$$1[IDerivationState$$1["NOT_TRACKING"] = -1] = "NOT_TRACKING";
    // no shallow dependency changed since last computation
    // won't recalculate derivation
    // this is what makes mobx fast
    IDerivationState$$1[IDerivationState$$1["UP_TO_DATE"] = 0] = "UP_TO_DATE";
    // some deep dependency changed, but don't know if shallow dependency changed
    // will require to check first if UP_TO_DATE or POSSIBLY_STALE
    // currently only ComputedValue will propagate POSSIBLY_STALE
    //
    // having this state is second big optimization:
    // don't have to recompute on every dependency change, but only when it's needed
    IDerivationState$$1[IDerivationState$$1["POSSIBLY_STALE"] = 1] = "POSSIBLY_STALE";
    // A shallow dependency has changed since last computation and the derivation
    // will need to recompute when it's needed next.
    IDerivationState$$1[IDerivationState$$1["STALE"] = 2] = "STALE";
})(IDerivationState || (IDerivationState = {}));
var TraceMode$$1;
(function (TraceMode$$1) {
    TraceMode$$1[TraceMode$$1["NONE"] = 0] = "NONE";
    TraceMode$$1[TraceMode$$1["LOG"] = 1] = "LOG";
    TraceMode$$1[TraceMode$$1["BREAK"] = 2] = "BREAK";
})(TraceMode$$1 || (TraceMode$$1 = {}));
var CaughtException$$1 = /** @class */ (function () {
    function CaughtException$$1(cause) {
        this.cause = cause;
        // Empty
    }
    return CaughtException$$1;
}());
function isCaughtException$$1(e) {
    return e instanceof CaughtException$$1;
}
/**
 * Finds out whether any dependency of the derivation has actually changed.
 * If dependenciesState is 1 then it will recalculate dependencies,
 * if any dependency changed it will propagate it by changing dependenciesState to 2.
 *
 * By iterating over the dependencies in the same order that they were reported and
 * stopping on the first change, all the recalculations are only called for ComputedValues
 * that will be tracked by derivation. That is because we assume that if the first x
 * dependencies of the derivation doesn't change then the derivation should run the same way
 * up until accessing x-th dependency.
 */
function shouldCompute$$1(derivation) {
    switch (derivation.dependenciesState) {
        case IDerivationState.UP_TO_DATE:
            return false;
        case IDerivationState.NOT_TRACKING:
        case IDerivationState.STALE:
            return true;
        case IDerivationState.POSSIBLY_STALE: {
            var prevUntracked = untrackedStart$$1(); // no need for those computeds to be reported, they will be picked up in trackDerivedFunction.
            var obs = derivation.observing, l = obs.length;
            for (var i = 0; i < l; i++) {
                var obj = obs[i];
                if (isComputedValue$$1(obj)) {
                    if (globalState$$1.disableErrorBoundaries) {
                        obj.get();
                    }
                    else {
                        try {
                            obj.get();
                        }
                        catch (e) {
                            // we are not interested in the value *or* exception at this moment, but if there is one, notify all
                            untrackedEnd$$1(prevUntracked);
                            return true;
                        }
                    }
                    // if ComputedValue `obj` actually changed it will be computed and propagated to its observers.
                    // and `derivation` is an observer of `obj`
                    // invariantShouldCompute(derivation)
                    if (derivation.dependenciesState === IDerivationState.STALE) {
                        untrackedEnd$$1(prevUntracked);
                        return true;
                    }
                }
            }
            changeDependenciesStateTo0$$1(derivation);
            untrackedEnd$$1(prevUntracked);
            return false;
        }
    }
}
// function invariantShouldCompute(derivation: IDerivation) {
//     const newDepState = (derivation as any).dependenciesState
//     if (
//         process.env.NODE_ENV === "production" &&
//         (newDepState === IDerivationState.POSSIBLY_STALE ||
//             newDepState === IDerivationState.NOT_TRACKING)
//     )
//         fail("Illegal dependency state")
// }
function isComputingDerivation$$1() {
    return globalState$$1.trackingDerivation !== null; // filter out actions inside computations
}
function checkIfStateModificationsAreAllowed$$1(atom) {
    var hasObservers$$1 = atom.observers.size > 0;
    // Should never be possible to change an observed observable from inside computed, see #798
    if (globalState$$1.computationDepth > 0 && hasObservers$$1)
        fail$$1( true &&
            "Computed values are not allowed to cause side effects by changing observables that are already being observed. Tried to modify: " + atom.name);
    // Should not be possible to change observed state outside strict mode, except during initialization, see #563
    if (!globalState$$1.allowStateChanges && (hasObservers$$1 || globalState$$1.enforceActions === "strict"))
        fail$$1( true &&
            (globalState$$1.enforceActions
                ? "Since strict-mode is enabled, changing observed observable values outside actions is not allowed. Please wrap the code in an `action` if this change is intended. Tried to modify: "
                : "Side effects like changing state are not allowed at this point. Are you trying to modify state from, for example, the render function of a React component? Tried to modify: ") +
                atom.name);
}
/**
 * Executes the provided function `f` and tracks which observables are being accessed.
 * The tracking information is stored on the `derivation` object and the derivation is registered
 * as observer of any of the accessed observables.
 */
function trackDerivedFunction$$1(derivation, f, context) {
    // pre allocate array allocation + room for variation in deps
    // array will be trimmed by bindDependencies
    changeDependenciesStateTo0$$1(derivation);
    derivation.newObserving = new Array(derivation.observing.length + 100);
    derivation.unboundDepsCount = 0;
    derivation.runId = ++globalState$$1.runId;
    var prevTracking = globalState$$1.trackingDerivation;
    globalState$$1.trackingDerivation = derivation;
    var result;
    if (globalState$$1.disableErrorBoundaries === true) {
        result = f.call(context);
    }
    else {
        try {
            result = f.call(context);
        }
        catch (e) {
            result = new CaughtException$$1(e);
        }
    }
    globalState$$1.trackingDerivation = prevTracking;
    bindDependencies(derivation);
    return result;
}
/**
 * diffs newObserving with observing.
 * update observing to be newObserving with unique observables
 * notify observers that become observed/unobserved
 */
function bindDependencies(derivation) {
    // invariant(derivation.dependenciesState !== IDerivationState.NOT_TRACKING, "INTERNAL ERROR bindDependencies expects derivation.dependenciesState !== -1");
    var prevObserving = derivation.observing;
    var observing = (derivation.observing = derivation.newObserving);
    var lowestNewObservingDerivationState = IDerivationState.UP_TO_DATE;
    // Go through all new observables and check diffValue: (this list can contain duplicates):
    //   0: first occurrence, change to 1 and keep it
    //   1: extra occurrence, drop it
    var i0 = 0, l = derivation.unboundDepsCount;
    for (var i = 0; i < l; i++) {
        var dep = observing[i];
        if (dep.diffValue === 0) {
            dep.diffValue = 1;
            if (i0 !== i)
                observing[i0] = dep;
            i0++;
        }
        // Upcast is 'safe' here, because if dep is IObservable, `dependenciesState` will be undefined,
        // not hitting the condition
        if (dep.dependenciesState > lowestNewObservingDerivationState) {
            lowestNewObservingDerivationState = dep.dependenciesState;
        }
    }
    observing.length = i0;
    derivation.newObserving = null; // newObserving shouldn't be needed outside tracking (statement moved down to work around FF bug, see #614)
    // Go through all old observables and check diffValue: (it is unique after last bindDependencies)
    //   0: it's not in new observables, unobserve it
    //   1: it keeps being observed, don't want to notify it. change to 0
    l = prevObserving.length;
    while (l--) {
        var dep = prevObserving[l];
        if (dep.diffValue === 0) {
            removeObserver$$1(dep, derivation);
        }
        dep.diffValue = 0;
    }
    // Go through all new observables and check diffValue: (now it should be unique)
    //   0: it was set to 0 in last loop. don't need to do anything.
    //   1: it wasn't observed, let's observe it. set back to 0
    while (i0--) {
        var dep = observing[i0];
        if (dep.diffValue === 1) {
            dep.diffValue = 0;
            addObserver$$1(dep, derivation);
        }
    }
    // Some new observed derivations may become stale during this derivation computation
    // so they have had no chance to propagate staleness (#916)
    if (lowestNewObservingDerivationState !== IDerivationState.UP_TO_DATE) {
        derivation.dependenciesState = lowestNewObservingDerivationState;
        derivation.onBecomeStale();
    }
}
function clearObserving$$1(derivation) {
    // invariant(globalState.inBatch > 0, "INTERNAL ERROR clearObserving should be called only inside batch");
    var obs = derivation.observing;
    derivation.observing = [];
    var i = obs.length;
    while (i--)
        removeObserver$$1(obs[i], derivation);
    derivation.dependenciesState = IDerivationState.NOT_TRACKING;
}
function untracked$$1(action$$1) {
    var prev = untrackedStart$$1();
    try {
        return action$$1();
    }
    finally {
        untrackedEnd$$1(prev);
    }
}
function untrackedStart$$1() {
    var prev = globalState$$1.trackingDerivation;
    globalState$$1.trackingDerivation = null;
    return prev;
}
function untrackedEnd$$1(prev) {
    globalState$$1.trackingDerivation = prev;
}
/**
 * needed to keep `lowestObserverState` correct. when changing from (2 or 1) to 0
 *
 */
function changeDependenciesStateTo0$$1(derivation) {
    if (derivation.dependenciesState === IDerivationState.UP_TO_DATE)
        return;
    derivation.dependenciesState = IDerivationState.UP_TO_DATE;
    var obs = derivation.observing;
    var i = obs.length;
    while (i--)
        obs[i].lowestObserverState = IDerivationState.UP_TO_DATE;
}

/**
 * These values will persist if global state is reset
 */
var persistentKeys = [
    "mobxGuid",
    "spyListeners",
    "enforceActions",
    "computedRequiresReaction",
    "disableErrorBoundaries",
    "runId",
    "UNCHANGED"
];
var MobXGlobals$$1 = /** @class */ (function () {
    function MobXGlobals$$1() {
        /**
         * MobXGlobals version.
         * MobX compatiblity with other versions loaded in memory as long as this version matches.
         * It indicates that the global state still stores similar information
         *
         * N.B: this version is unrelated to the package version of MobX, and is only the version of the
         * internal state storage of MobX, and can be the same across many different package versions
         */
        this.version = 5;
        /**
         * globally unique token to signal unchanged
         */
        this.UNCHANGED = {};
        /**
         * Currently running derivation
         */
        this.trackingDerivation = null;
        /**
         * Are we running a computation currently? (not a reaction)
         */
        this.computationDepth = 0;
        /**
         * Each time a derivation is tracked, it is assigned a unique run-id
         */
        this.runId = 0;
        /**
         * 'guid' for general purpose. Will be persisted amongst resets.
         */
        this.mobxGuid = 0;
        /**
         * Are we in a batch block? (and how many of them)
         */
        this.inBatch = 0;
        /**
         * Observables that don't have observers anymore, and are about to be
         * suspended, unless somebody else accesses it in the same batch
         *
         * @type {IObservable[]}
         */
        this.pendingUnobservations = [];
        /**
         * List of scheduled, not yet executed, reactions.
         */
        this.pendingReactions = [];
        /**
         * Are we currently processing reactions?
         */
        this.isRunningReactions = false;
        /**
         * Is it allowed to change observables at this point?
         * In general, MobX doesn't allow that when running computations and React.render.
         * To ensure that those functions stay pure.
         */
        this.allowStateChanges = true;
        /**
         * If strict mode is enabled, state changes are by default not allowed
         */
        this.enforceActions = false;
        /**
         * Spy callbacks
         */
        this.spyListeners = [];
        /**
         * Globally attached error handlers that react specifically to errors in reactions
         */
        this.globalReactionErrorHandlers = [];
        /**
         * Warn if computed values are accessed outside a reactive context
         */
        this.computedRequiresReaction = false;
        /*
         * Don't catch and rethrow exceptions. This is useful for inspecting the state of
         * the stack when an exception occurs while debugging.
         */
        this.disableErrorBoundaries = false;
        /*
         * If true, we are already handling an exception in an action. Any errors in reactions should be supressed, as
         * they are not the cause, see: https://github.com/mobxjs/mobx/issues/1836
         */
        this.suppressReactionErrors = false;
    }
    return MobXGlobals$$1;
}());
var canMergeGlobalState = true;
var isolateCalled = false;
var globalState$$1 = (function () {
    var global = getGlobal$$1();
    if (global.__mobxInstanceCount > 0 && !global.__mobxGlobals)
        canMergeGlobalState = false;
    if (global.__mobxGlobals && global.__mobxGlobals.version !== new MobXGlobals$$1().version)
        canMergeGlobalState = false;
    if (!canMergeGlobalState) {
        setTimeout(function () {
            if (!isolateCalled) {
                fail$$1("There are multiple, different versions of MobX active. Make sure MobX is loaded only once or use `configure({ isolateGlobalState: true })`");
            }
        }, 1);
        return new MobXGlobals$$1();
    }
    else if (global.__mobxGlobals) {
        global.__mobxInstanceCount += 1;
        if (!global.__mobxGlobals.UNCHANGED)
            global.__mobxGlobals.UNCHANGED = {}; // make merge backward compatible
        return global.__mobxGlobals;
    }
    else {
        global.__mobxInstanceCount = 1;
        return (global.__mobxGlobals = new MobXGlobals$$1());
    }
})();
function isolateGlobalState$$1() {
    if (globalState$$1.pendingReactions.length ||
        globalState$$1.inBatch ||
        globalState$$1.isRunningReactions)
        fail$$1("isolateGlobalState should be called before MobX is running any reactions");
    isolateCalled = true;
    if (canMergeGlobalState) {
        if (--getGlobal$$1().__mobxInstanceCount === 0)
            getGlobal$$1().__mobxGlobals = undefined;
        globalState$$1 = new MobXGlobals$$1();
    }
}
function getGlobalState$$1() {
    return globalState$$1;
}
/**
 * For testing purposes only; this will break the internal state of existing observables,
 * but can be used to get back at a stable state after throwing errors
 */
function resetGlobalState$$1() {
    var defaultGlobals = new MobXGlobals$$1();
    for (var key in defaultGlobals)
        if (persistentKeys.indexOf(key) === -1)
            globalState$$1[key] = defaultGlobals[key];
    globalState$$1.allowStateChanges = !globalState$$1.enforceActions;
}
function getGlobal$$1() {
    return typeof window !== "undefined" ? window : global;
}

function hasObservers$$1(observable$$1) {
    return observable$$1.observers && observable$$1.observers.size > 0;
}
function getObservers$$1(observable$$1) {
    return observable$$1.observers;
}
// function invariantObservers(observable: IObservable) {
//     const list = observable.observers
//     const map = observable.observersIndexes
//     const l = list.length
//     for (let i = 0; i < l; i++) {
//         const id = list[i].__mapid
//         if (i) {
//             invariant(map[id] === i, "INTERNAL ERROR maps derivation.__mapid to index in list") // for performance
//         } else {
//             invariant(!(id in map), "INTERNAL ERROR observer on index 0 shouldn't be held in map.") // for performance
//         }
//     }
//     invariant(
//         list.length === 0 || Object.keys(map).length === list.length - 1,
//         "INTERNAL ERROR there is no junk in map"
//     )
// }
function addObserver$$1(observable$$1, node) {
    // invariant(node.dependenciesState !== -1, "INTERNAL ERROR, can add only dependenciesState !== -1");
    // invariant(observable._observers.indexOf(node) === -1, "INTERNAL ERROR add already added node");
    // invariantObservers(observable);
    observable$$1.observers.add(node);
    if (observable$$1.lowestObserverState > node.dependenciesState)
        observable$$1.lowestObserverState = node.dependenciesState;
    // invariantObservers(observable);
    // invariant(observable._observers.indexOf(node) !== -1, "INTERNAL ERROR didn't add node");
}
function removeObserver$$1(observable$$1, node) {
    // invariant(globalState.inBatch > 0, "INTERNAL ERROR, remove should be called only inside batch");
    // invariant(observable._observers.indexOf(node) !== -1, "INTERNAL ERROR remove already removed node");
    // invariantObservers(observable);
    observable$$1.observers.delete(node);
    if (observable$$1.observers.size === 0) {
        // deleting last observer
        queueForUnobservation$$1(observable$$1);
    }
    // invariantObservers(observable);
    // invariant(observable._observers.indexOf(node) === -1, "INTERNAL ERROR remove already removed node2");
}
function queueForUnobservation$$1(observable$$1) {
    if (observable$$1.isPendingUnobservation === false) {
        // invariant(observable._observers.length === 0, "INTERNAL ERROR, should only queue for unobservation unobserved observables");
        observable$$1.isPendingUnobservation = true;
        globalState$$1.pendingUnobservations.push(observable$$1);
    }
}
/**
 * Batch starts a transaction, at least for purposes of memoizing ComputedValues when nothing else does.
 * During a batch `onBecomeUnobserved` will be called at most once per observable.
 * Avoids unnecessary recalculations.
 */
function startBatch$$1() {
    globalState$$1.inBatch++;
}
function endBatch$$1() {
    if (--globalState$$1.inBatch === 0) {
        runReactions$$1();
        // the batch is actually about to finish, all unobserving should happen here.
        var list = globalState$$1.pendingUnobservations;
        for (var i = 0; i < list.length; i++) {
            var observable$$1 = list[i];
            observable$$1.isPendingUnobservation = false;
            if (observable$$1.observers.size === 0) {
                if (observable$$1.isBeingObserved) {
                    // if this observable had reactive observers, trigger the hooks
                    observable$$1.isBeingObserved = false;
                    observable$$1.onBecomeUnobserved();
                }
                if (observable$$1 instanceof ComputedValue$$1) {
                    // computed values are automatically teared down when the last observer leaves
                    // this process happens recursively, this computed might be the last observabe of another, etc..
                    observable$$1.suspend();
                }
            }
        }
        globalState$$1.pendingUnobservations = [];
    }
}
function reportObserved$$1(observable$$1) {
    var derivation = globalState$$1.trackingDerivation;
    if (derivation !== null) {
        /**
         * Simple optimization, give each derivation run an unique id (runId)
         * Check if last time this observable was accessed the same runId is used
         * if this is the case, the relation is already known
         */
        if (derivation.runId !== observable$$1.lastAccessedBy) {
            observable$$1.lastAccessedBy = derivation.runId;
            // Tried storing newObserving, or observing, or both as Set, but performance didn't come close...
            derivation.newObserving[derivation.unboundDepsCount++] = observable$$1;
            if (!observable$$1.isBeingObserved) {
                observable$$1.isBeingObserved = true;
                observable$$1.onBecomeObserved();
            }
        }
        return true;
    }
    else if (observable$$1.observers.size === 0 && globalState$$1.inBatch > 0) {
        queueForUnobservation$$1(observable$$1);
    }
    return false;
}
// function invariantLOS(observable: IObservable, msg: string) {
//     // it's expensive so better not run it in produciton. but temporarily helpful for testing
//     const min = getObservers(observable).reduce((a, b) => Math.min(a, b.dependenciesState), 2)
//     if (min >= observable.lowestObserverState) return // <- the only assumption about `lowestObserverState`
//     throw new Error(
//         "lowestObserverState is wrong for " +
//             msg +
//             " because " +
//             min +
//             " < " +
//             observable.lowestObserverState
//     )
// }
/**
 * NOTE: current propagation mechanism will in case of self reruning autoruns behave unexpectedly
 * It will propagate changes to observers from previous run
 * It's hard or maybe impossible (with reasonable perf) to get it right with current approach
 * Hopefully self reruning autoruns aren't a feature people should depend on
 * Also most basic use cases should be ok
 */
// Called by Atom when its value changes
function propagateChanged$$1(observable$$1) {
    // invariantLOS(observable, "changed start");
    if (observable$$1.lowestObserverState === IDerivationState.STALE)
        return;
    observable$$1.lowestObserverState = IDerivationState.STALE;
    // Ideally we use for..of here, but the downcompiled version is really slow...
    observable$$1.observers.forEach(function (d) {
        if (d.dependenciesState === IDerivationState.UP_TO_DATE) {
            if (d.isTracing !== TraceMode$$1.NONE) {
                logTraceInfo(d, observable$$1);
            }
            d.onBecomeStale();
        }
        d.dependenciesState = IDerivationState.STALE;
    });
    // invariantLOS(observable, "changed end");
}
// Called by ComputedValue when it recalculate and its value changed
function propagateChangeConfirmed$$1(observable$$1) {
    // invariantLOS(observable, "confirmed start");
    if (observable$$1.lowestObserverState === IDerivationState.STALE)
        return;
    observable$$1.lowestObserverState = IDerivationState.STALE;
    observable$$1.observers.forEach(function (d) {
        if (d.dependenciesState === IDerivationState.POSSIBLY_STALE)
            d.dependenciesState = IDerivationState.STALE;
        else if (d.dependenciesState === IDerivationState.UP_TO_DATE // this happens during computing of `d`, just keep lowestObserverState up to date.
        )
            observable$$1.lowestObserverState = IDerivationState.UP_TO_DATE;
    });
    // invariantLOS(observable, "confirmed end");
}
// Used by computed when its dependency changed, but we don't wan't to immediately recompute.
function propagateMaybeChanged$$1(observable$$1) {
    // invariantLOS(observable, "maybe start");
    if (observable$$1.lowestObserverState !== IDerivationState.UP_TO_DATE)
        return;
    observable$$1.lowestObserverState = IDerivationState.POSSIBLY_STALE;
    observable$$1.observers.forEach(function (d) {
        if (d.dependenciesState === IDerivationState.UP_TO_DATE) {
            d.dependenciesState = IDerivationState.POSSIBLY_STALE;
            if (d.isTracing !== TraceMode$$1.NONE) {
                logTraceInfo(d, observable$$1);
            }
            d.onBecomeStale();
        }
    });
    // invariantLOS(observable, "maybe end");
}
function logTraceInfo(derivation, observable$$1) {
    console.log("[mobx.trace] '" + derivation.name + "' is invalidated due to a change in: '" + observable$$1.name + "'");
    if (derivation.isTracing === TraceMode$$1.BREAK) {
        var lines = [];
        printDepTree(getDependencyTree$$1(derivation), lines, 1);
        // prettier-ignore
        new Function("debugger;\n/*\nTracing '" + derivation.name + "'\n\nYou are entering this break point because derivation '" + derivation.name + "' is being traced and '" + observable$$1.name + "' is now forcing it to update.\nJust follow the stacktrace you should now see in the devtools to see precisely what piece of your code is causing this update\nThe stackframe you are looking for is at least ~6-8 stack-frames up.\n\n" + (derivation instanceof ComputedValue$$1 ? derivation.derivation.toString().replace(/[*]\//g, "/") : "") + "\n\nThe dependencies for this derivation are:\n\n" + lines.join("\n") + "\n*/\n    ")();
    }
}
function printDepTree(tree, lines, depth) {
    if (lines.length >= 1000) {
        lines.push("(and many more)");
        return;
    }
    lines.push("" + new Array(depth).join("\t") + tree.name); // MWE: not the fastest, but the easiest way :)
    if (tree.dependencies)
        tree.dependencies.forEach(function (child) { return printDepTree(child, lines, depth + 1); });
}

var Reaction$$1 = /** @class */ (function () {
    function Reaction$$1(name, onInvalidate, errorHandler) {
        if (name === void 0) { name = "Reaction@" + getNextId$$1(); }
        this.name = name;
        this.onInvalidate = onInvalidate;
        this.errorHandler = errorHandler;
        this.observing = []; // nodes we are looking at. Our value depends on these nodes
        this.newObserving = [];
        this.dependenciesState = IDerivationState.NOT_TRACKING;
        this.diffValue = 0;
        this.runId = 0;
        this.unboundDepsCount = 0;
        this.__mapid = "#" + getNextId$$1();
        this.isDisposed = false;
        this._isScheduled = false;
        this._isTrackPending = false;
        this._isRunning = false;
        this.isTracing = TraceMode$$1.NONE;
    }
    Reaction$$1.prototype.onBecomeStale = function () {
        this.schedule();
    };
    Reaction$$1.prototype.schedule = function () {
        if (!this._isScheduled) {
            this._isScheduled = true;
            globalState$$1.pendingReactions.push(this);
            runReactions$$1();
        }
    };
    Reaction$$1.prototype.isScheduled = function () {
        return this._isScheduled;
    };
    /**
     * internal, use schedule() if you intend to kick off a reaction
     */
    Reaction$$1.prototype.runReaction = function () {
        if (!this.isDisposed) {
            startBatch$$1();
            this._isScheduled = false;
            if (shouldCompute$$1(this)) {
                this._isTrackPending = true;
                try {
                    this.onInvalidate();
                    if (this._isTrackPending &&
                        isSpyEnabled$$1() &&
                        "development" !== "production") {
                        // onInvalidate didn't trigger track right away..
                        spyReport$$1({
                            name: this.name,
                            type: "scheduled-reaction"
                        });
                    }
                }
                catch (e) {
                    this.reportExceptionInDerivation(e);
                }
            }
            endBatch$$1();
        }
    };
    Reaction$$1.prototype.track = function (fn) {
        startBatch$$1();
        var notify = isSpyEnabled$$1();
        var startTime;
        if (notify && "development" !== "production") {
            startTime = Date.now();
            spyReportStart$$1({
                name: this.name,
                type: "reaction"
            });
        }
        this._isRunning = true;
        var result = trackDerivedFunction$$1(this, fn, undefined);
        this._isRunning = false;
        this._isTrackPending = false;
        if (this.isDisposed) {
            // disposed during last run. Clean up everything that was bound after the dispose call.
            clearObserving$$1(this);
        }
        if (isCaughtException$$1(result))
            this.reportExceptionInDerivation(result.cause);
        if (notify && "development" !== "production") {
            spyReportEnd$$1({
                time: Date.now() - startTime
            });
        }
        endBatch$$1();
    };
    Reaction$$1.prototype.reportExceptionInDerivation = function (error) {
        var _this = this;
        if (this.errorHandler) {
            this.errorHandler(error, this);
            return;
        }
        if (globalState$$1.disableErrorBoundaries)
            throw error;
        var message = "[mobx] Encountered an uncaught exception that was thrown by a reaction or observer component, in: '" + this + "'";
        if (globalState$$1.suppressReactionErrors) {
            console.warn("[mobx] (error in reaction '" + this.name + "' suppressed, fix error of causing action below)"); // prettier-ignore
        }
        else {
            console.error(message, error);
            /** If debugging brought you here, please, read the above message :-). Tnx! */
        }
        if (isSpyEnabled$$1()) {
            spyReport$$1({
                type: "error",
                name: this.name,
                message: message,
                error: "" + error
            });
        }
        globalState$$1.globalReactionErrorHandlers.forEach(function (f) { return f(error, _this); });
    };
    Reaction$$1.prototype.dispose = function () {
        if (!this.isDisposed) {
            this.isDisposed = true;
            if (!this._isRunning) {
                // if disposed while running, clean up later. Maybe not optimal, but rare case
                startBatch$$1();
                clearObserving$$1(this);
                endBatch$$1();
            }
        }
    };
    Reaction$$1.prototype.getDisposer = function () {
        var r = this.dispose.bind(this);
        r[$mobx$$1] = this;
        return r;
    };
    Reaction$$1.prototype.toString = function () {
        return "Reaction[" + this.name + "]";
    };
    Reaction$$1.prototype.trace = function (enterBreakPoint) {
        if (enterBreakPoint === void 0) { enterBreakPoint = false; }
        trace$$1(this, enterBreakPoint);
    };
    return Reaction$$1;
}());
function onReactionError$$1(handler) {
    globalState$$1.globalReactionErrorHandlers.push(handler);
    return function () {
        var idx = globalState$$1.globalReactionErrorHandlers.indexOf(handler);
        if (idx >= 0)
            globalState$$1.globalReactionErrorHandlers.splice(idx, 1);
    };
}
/**
 * Magic number alert!
 * Defines within how many times a reaction is allowed to re-trigger itself
 * until it is assumed that this is gonna be a never ending loop...
 */
var MAX_REACTION_ITERATIONS = 100;
var reactionScheduler = function (f) { return f(); };
function runReactions$$1() {
    // Trampolining, if runReactions are already running, new reactions will be picked up
    if (globalState$$1.inBatch > 0 || globalState$$1.isRunningReactions)
        return;
    reactionScheduler(runReactionsHelper);
}
function runReactionsHelper() {
    globalState$$1.isRunningReactions = true;
    var allReactions = globalState$$1.pendingReactions;
    var iterations = 0;
    // While running reactions, new reactions might be triggered.
    // Hence we work with two variables and check whether
    // we converge to no remaining reactions after a while.
    while (allReactions.length > 0) {
        if (++iterations === MAX_REACTION_ITERATIONS) {
            console.error("Reaction doesn't converge to a stable state after " + MAX_REACTION_ITERATIONS + " iterations." +
                (" Probably there is a cycle in the reactive function: " + allReactions[0]));
            allReactions.splice(0); // clear reactions
        }
        var remainingReactions = allReactions.splice(0);
        for (var i = 0, l = remainingReactions.length; i < l; i++)
            remainingReactions[i].runReaction();
    }
    globalState$$1.isRunningReactions = false;
}
var isReaction$$1 = createInstanceofPredicate$$1("Reaction", Reaction$$1);
function setReactionScheduler$$1(fn) {
    var baseScheduler = reactionScheduler;
    reactionScheduler = function (f) { return fn(function () { return baseScheduler(f); }); };
}

function isSpyEnabled$$1() {
    return  true && !!globalState$$1.spyListeners.length;
}
function spyReport$$1(event) {
    if (false)
        {} // dead code elimination can do the rest
    if (!globalState$$1.spyListeners.length)
        return;
    var listeners = globalState$$1.spyListeners;
    for (var i = 0, l = listeners.length; i < l; i++)
        listeners[i](event);
}
function spyReportStart$$1(event) {
    if (false)
        {}
    var change = __assign({}, event, { spyReportStart: true });
    spyReport$$1(change);
}
var END_EVENT = { spyReportEnd: true };
function spyReportEnd$$1(change) {
    if (false)
        {}
    if (change)
        spyReport$$1(__assign({}, change, { spyReportEnd: true }));
    else
        spyReport$$1(END_EVENT);
}
function spy$$1(listener) {
    if (false) {}
    else {
        globalState$$1.spyListeners.push(listener);
        return once$$1(function () {
            globalState$$1.spyListeners = globalState$$1.spyListeners.filter(function (l) { return l !== listener; });
        });
    }
}

function dontReassignFields() {
    fail$$1( true && "@action fields are not reassignable");
}
function namedActionDecorator$$1(name) {
    return function (target, prop, descriptor) {
        if (descriptor) {
            if ( true && descriptor.get !== undefined) {
                return fail$$1("@action cannot be used with getters");
            }
            // babel / typescript
            // @action method() { }
            if (descriptor.value) {
                // typescript
                return {
                    value: createAction$$1(name, descriptor.value),
                    enumerable: false,
                    configurable: true,
                    writable: true // for typescript, this must be writable, otherwise it cannot inherit :/ (see inheritable actions test)
                };
            }
            // babel only: @action method = () => {}
            var initializer_1 = descriptor.initializer;
            return {
                enumerable: false,
                configurable: true,
                writable: true,
                initializer: function () {
                    // N.B: we can't immediately invoke initializer; this would be wrong
                    return createAction$$1(name, initializer_1.call(this));
                }
            };
        }
        // bound instance methods
        return actionFieldDecorator$$1(name).apply(this, arguments);
    };
}
function actionFieldDecorator$$1(name) {
    // Simple property that writes on first invocation to the current instance
    return function (target, prop, descriptor) {
        Object.defineProperty(target, prop, {
            configurable: true,
            enumerable: false,
            get: function () {
                return undefined;
            },
            set: function (value) {
                addHiddenProp$$1(this, prop, action$$1(name, value));
            }
        });
    };
}
function boundActionDecorator$$1(target, propertyName, descriptor, applyToInstance) {
    if (applyToInstance === true) {
        defineBoundAction$$1(target, propertyName, descriptor.value);
        return null;
    }
    if (descriptor) {
        // if (descriptor.value)
        // Typescript / Babel: @action.bound method() { }
        // also: babel @action.bound method = () => {}
        return {
            configurable: true,
            enumerable: false,
            get: function () {
                defineBoundAction$$1(this, propertyName, descriptor.value || descriptor.initializer.call(this));
                return this[propertyName];
            },
            set: dontReassignFields
        };
    }
    // field decorator Typescript @action.bound method = () => {}
    return {
        enumerable: false,
        configurable: true,
        set: function (v) {
            defineBoundAction$$1(this, propertyName, v);
        },
        get: function () {
            return undefined;
        }
    };
}

var action$$1 = function action$$1(arg1, arg2, arg3, arg4) {
    // action(fn() {})
    if (arguments.length === 1 && typeof arg1 === "function")
        return createAction$$1(arg1.name || "<unnamed action>", arg1);
    // action("name", fn() {})
    if (arguments.length === 2 && typeof arg2 === "function")
        return createAction$$1(arg1, arg2);
    // @action("name") fn() {}
    if (arguments.length === 1 && typeof arg1 === "string")
        return namedActionDecorator$$1(arg1);
    // @action fn() {}
    if (arg4 === true) {
        // apply to instance immediately
        addHiddenProp$$1(arg1, arg2, createAction$$1(arg1.name || arg2, arg3.value));
    }
    else {
        return namedActionDecorator$$1(arg2).apply(null, arguments);
    }
};
action$$1.bound = boundActionDecorator$$1;
function runInAction$$1(arg1, arg2) {
    var actionName = typeof arg1 === "string" ? arg1 : arg1.name || "<unnamed action>";
    var fn = typeof arg1 === "function" ? arg1 : arg2;
    if (true) {
        invariant$$1(typeof fn === "function" && fn.length === 0, "`runInAction` expects a function without arguments");
        if (typeof actionName !== "string" || !actionName)
            fail$$1("actions should have valid names, got: '" + actionName + "'");
    }
    return executeAction$$1(actionName, fn, this, undefined);
}
function isAction$$1(thing) {
    return typeof thing === "function" && thing.isMobxAction === true;
}
function defineBoundAction$$1(target, propertyName, fn) {
    addHiddenProp$$1(target, propertyName, createAction$$1(propertyName, fn.bind(target)));
}

/**
 * Creates a named reactive view and keeps it alive, so that the view is always
 * updated if one of the dependencies changes, even when the view is not further used by something else.
 * @param view The reactive view
 * @returns disposer function, which can be used to stop the view from being updated in the future.
 */
function autorun$$1(view, opts) {
    if (opts === void 0) { opts = EMPTY_OBJECT$$1; }
    if (true) {
        invariant$$1(typeof view === "function", "Autorun expects a function as first argument");
        invariant$$1(isAction$$1(view) === false, "Autorun does not accept actions since actions are untrackable");
    }
    var name = (opts && opts.name) || view.name || "Autorun@" + getNextId$$1();
    var runSync = !opts.scheduler && !opts.delay;
    var reaction$$1;
    if (runSync) {
        // normal autorun
        reaction$$1 = new Reaction$$1(name, function () {
            this.track(reactionRunner);
        }, opts.onError);
    }
    else {
        var scheduler_1 = createSchedulerFromOptions(opts);
        // debounced autorun
        var isScheduled_1 = false;
        reaction$$1 = new Reaction$$1(name, function () {
            if (!isScheduled_1) {
                isScheduled_1 = true;
                scheduler_1(function () {
                    isScheduled_1 = false;
                    if (!reaction$$1.isDisposed)
                        reaction$$1.track(reactionRunner);
                });
            }
        }, opts.onError);
    }
    function reactionRunner() {
        view(reaction$$1);
    }
    reaction$$1.schedule();
    return reaction$$1.getDisposer();
}
var run = function (f) { return f(); };
function createSchedulerFromOptions(opts) {
    return opts.scheduler
        ? opts.scheduler
        : opts.delay
            ? function (f) { return setTimeout(f, opts.delay); }
            : run;
}
function reaction$$1(expression, effect, opts) {
    if (opts === void 0) { opts = EMPTY_OBJECT$$1; }
    if (true) {
        invariant$$1(typeof expression === "function", "First argument to reaction should be a function");
        invariant$$1(typeof opts === "object", "Third argument of reactions should be an object");
    }
    var name = opts.name || "Reaction@" + getNextId$$1();
    var effectAction = action$$1(name, opts.onError ? wrapErrorHandler(opts.onError, effect) : effect);
    var runSync = !opts.scheduler && !opts.delay;
    var scheduler = createSchedulerFromOptions(opts);
    var firstTime = true;
    var isScheduled = false;
    var value;
    var equals = opts.compareStructural
        ? comparer$$1.structural
        : opts.equals || comparer$$1.default;
    var r = new Reaction$$1(name, function () {
        if (firstTime || runSync) {
            reactionRunner();
        }
        else if (!isScheduled) {
            isScheduled = true;
            scheduler(reactionRunner);
        }
    }, opts.onError);
    function reactionRunner() {
        isScheduled = false; // Q: move into reaction runner?
        if (r.isDisposed)
            return;
        var changed = false;
        r.track(function () {
            var nextValue = expression(r);
            changed = firstTime || !equals(value, nextValue);
            value = nextValue;
        });
        if (firstTime && opts.fireImmediately)
            effectAction(value, r);
        if (!firstTime && changed === true)
            effectAction(value, r);
        if (firstTime)
            firstTime = false;
    }
    r.schedule();
    return r.getDisposer();
}
function wrapErrorHandler(errorHandler, baseFn) {
    return function () {
        try {
            return baseFn.apply(this, arguments);
        }
        catch (e) {
            errorHandler.call(this, e);
        }
    };
}

function onBecomeObserved$$1(thing, arg2, arg3) {
    return interceptHook("onBecomeObserved", thing, arg2, arg3);
}
function onBecomeUnobserved$$1(thing, arg2, arg3) {
    return interceptHook("onBecomeUnobserved", thing, arg2, arg3);
}
function interceptHook(hook, thing, arg2, arg3) {
    var atom = typeof arg2 === "string" ? getAtom$$1(thing, arg2) : getAtom$$1(thing);
    var cb = typeof arg2 === "string" ? arg3 : arg2;
    var listenersKey = hook + "Listeners";
    if (atom[listenersKey]) {
        atom[listenersKey].add(cb);
    }
    else {
        atom[listenersKey] = new Set([cb]);
    }
    var orig = atom[hook];
    if (typeof orig !== "function")
        return fail$$1( true && "Not an atom that can be (un)observed");
    return function () {
        var hookListeners = atom[listenersKey];
        if (hookListeners) {
            hookListeners.delete(cb);
            if (hookListeners.size === 0) {
                delete atom[listenersKey];
            }
        }
    };
}

function configure$$1(options) {
    var enforceActions = options.enforceActions, computedRequiresReaction = options.computedRequiresReaction, disableErrorBoundaries = options.disableErrorBoundaries, reactionScheduler = options.reactionScheduler;
    if (options.isolateGlobalState === true) {
        isolateGlobalState$$1();
    }
    if (enforceActions !== undefined) {
        if (typeof enforceActions === "boolean" || enforceActions === "strict")
            deprecated$$1("Deprecated value for 'enforceActions', use 'false' => '\"never\"', 'true' => '\"observed\"', '\"strict\"' => \"'always'\" instead");
        var ea = void 0;
        switch (enforceActions) {
            case true:
            case "observed":
                ea = true;
                break;
            case false:
            case "never":
                ea = false;
                break;
            case "strict":
            case "always":
                ea = "strict";
                break;
            default:
                fail$$1("Invalid value for 'enforceActions': '" + enforceActions + "', expected 'never', 'always' or 'observed'");
        }
        globalState$$1.enforceActions = ea;
        globalState$$1.allowStateChanges = ea === true || ea === "strict" ? false : true;
    }
    if (computedRequiresReaction !== undefined) {
        globalState$$1.computedRequiresReaction = !!computedRequiresReaction;
    }
    if (disableErrorBoundaries !== undefined) {
        if (disableErrorBoundaries === true)
            console.warn("WARNING: Debug feature only. MobX will NOT recover from errors when `disableErrorBoundaries` is enabled.");
        globalState$$1.disableErrorBoundaries = !!disableErrorBoundaries;
    }
    if (reactionScheduler) {
        setReactionScheduler$$1(reactionScheduler);
    }
}

function decorate$$1(thing, decorators) {
     true &&
        invariant$$1(isPlainObject$$1(decorators), "Decorators should be a key value map");
    var target = typeof thing === "function" ? thing.prototype : thing;
    var _loop_1 = function (prop) {
        var propertyDecorators = decorators[prop];
        if (!Array.isArray(propertyDecorators)) {
            propertyDecorators = [propertyDecorators];
        }
         true &&
            invariant$$1(propertyDecorators.every(function (decorator) { return typeof decorator === "function"; }), "Decorate: expected a decorator function or array of decorator functions for '" + prop + "'");
        var descriptor = Object.getOwnPropertyDescriptor(target, prop);
        var newDescriptor = propertyDecorators.reduce(function (accDescriptor, decorator) { return decorator(target, prop, accDescriptor); }, descriptor);
        if (newDescriptor)
            Object.defineProperty(target, prop, newDescriptor);
    };
    for (var prop in decorators) {
        _loop_1(prop);
    }
    return thing;
}

function extendObservable$$1(target, properties, decorators, options) {
    if (true) {
        invariant$$1(arguments.length >= 2 && arguments.length <= 4, "'extendObservable' expected 2-4 arguments");
        invariant$$1(typeof target === "object", "'extendObservable' expects an object as first argument");
        invariant$$1(!isObservableMap$$1(target), "'extendObservable' should not be used on maps, use map.merge instead");
    }
    options = asCreateObservableOptions$$1(options);
    var defaultDecorator = getDefaultDecoratorFromObjectOptions$$1(options);
    initializeInstance$$1(target); // Fixes #1740
    asObservableObject$$1(target, options.name, defaultDecorator.enhancer); // make sure object is observable, even without initial props
    if (properties)
        extendObservableObjectWithProperties$$1(target, properties, decorators, defaultDecorator);
    return target;
}
function getDefaultDecoratorFromObjectOptions$$1(options) {
    return options.defaultDecorator || (options.deep === false ? refDecorator$$1 : deepDecorator$$1);
}
function extendObservableObjectWithProperties$$1(target, properties, decorators, defaultDecorator) {
    if (true) {
        invariant$$1(!isObservable$$1(properties), "Extending an object with another observable (object) is not supported. Please construct an explicit propertymap, using `toJS` if need. See issue #540");
        if (decorators)
            for (var key in decorators)
                if (!(key in properties))
                    fail$$1("Trying to declare a decorator for unspecified property '" + key + "'");
    }
    startBatch$$1();
    try {
        for (var key in properties) {
            var descriptor = Object.getOwnPropertyDescriptor(properties, key);
            if (true) {
                if (Object.getOwnPropertyDescriptor(target, key))
                    fail$$1("'extendObservable' can only be used to introduce new properties. Use 'set' or 'decorate' instead. The property '" + key + "' already exists on '" + target + "'");
                if (isComputed$$1(descriptor.value))
                    fail$$1("Passing a 'computed' as initial property value is no longer supported by extendObservable. Use a getter or decorator instead");
            }
            var decorator = decorators && key in decorators
                ? decorators[key]
                : descriptor.get
                    ? computedDecorator$$1
                    : defaultDecorator;
            if ( true && typeof decorator !== "function")
                fail$$1("Not a valid decorator for '" + key + "', got: " + decorator);
            var resultDescriptor = decorator(target, key, descriptor, true);
            if (resultDescriptor // otherwise, assume already applied, due to `applyToInstance`
            )
                Object.defineProperty(target, key, resultDescriptor);
        }
    }
    finally {
        endBatch$$1();
    }
}

function getDependencyTree$$1(thing, property) {
    return nodeToDependencyTree(getAtom$$1(thing, property));
}
function nodeToDependencyTree(node) {
    var result = {
        name: node.name
    };
    if (node.observing && node.observing.length > 0)
        result.dependencies = unique$$1(node.observing).map(nodeToDependencyTree);
    return result;
}
function getObserverTree$$1(thing, property) {
    return nodeToObserverTree(getAtom$$1(thing, property));
}
function nodeToObserverTree(node) {
    var result = {
        name: node.name
    };
    if (hasObservers$$1(node))
        result.observers = Array.from(getObservers$$1(node)).map(nodeToObserverTree);
    return result;
}

var generatorId = 0;
function flow$$1(generator) {
    if (arguments.length !== 1)
        fail$$1( true && "Flow expects one 1 argument and cannot be used as decorator");
    var name = generator.name || "<unnamed flow>";
    // Implementation based on https://github.com/tj/co/blob/master/index.js
    return function () {
        var ctx = this;
        var args = arguments;
        var runId = ++generatorId;
        var gen = action$$1(name + " - runid: " + runId + " - init", generator).apply(ctx, args);
        var rejector;
        var pendingPromise = undefined;
        var promise = new Promise(function (resolve, reject) {
            var stepId = 0;
            rejector = reject;
            function onFulfilled(res) {
                pendingPromise = undefined;
                var ret;
                try {
                    ret = action$$1(name + " - runid: " + runId + " - yield " + stepId++, gen.next).call(gen, res);
                }
                catch (e) {
                    return reject(e);
                }
                next(ret);
            }
            function onRejected(err) {
                pendingPromise = undefined;
                var ret;
                try {
                    ret = action$$1(name + " - runid: " + runId + " - yield " + stepId++, gen.throw).call(gen, err);
                }
                catch (e) {
                    return reject(e);
                }
                next(ret);
            }
            function next(ret) {
                if (ret && typeof ret.then === "function") {
                    // an async iterator
                    ret.then(next, reject);
                    return;
                }
                if (ret.done)
                    return resolve(ret.value);
                pendingPromise = Promise.resolve(ret.value);
                return pendingPromise.then(onFulfilled, onRejected);
            }
            onFulfilled(undefined); // kick off the process
        });
        promise.cancel = action$$1(name + " - runid: " + runId + " - cancel", function () {
            try {
                if (pendingPromise)
                    cancelPromise(pendingPromise);
                // Finally block can return (or yield) stuff..
                var res = gen.return();
                // eat anything that promise would do, it's cancelled!
                var yieldedPromise = Promise.resolve(res.value);
                yieldedPromise.then(noop$$1, noop$$1);
                cancelPromise(yieldedPromise); // maybe it can be cancelled :)
                // reject our original promise
                rejector(new Error("FLOW_CANCELLED"));
            }
            catch (e) {
                rejector(e); // there could be a throwing finally block
            }
        });
        return promise;
    };
}
function cancelPromise(promise) {
    if (typeof promise.cancel === "function")
        promise.cancel();
}

function interceptReads$$1(thing, propOrHandler, handler) {
    var target;
    if (isObservableMap$$1(thing) || isObservableArray$$1(thing) || isObservableValue$$1(thing)) {
        target = getAdministration$$1(thing);
    }
    else if (isObservableObject$$1(thing)) {
        if (typeof propOrHandler !== "string")
            return fail$$1( true &&
                "InterceptReads can only be used with a specific property, not with an object in general");
        target = getAdministration$$1(thing, propOrHandler);
    }
    else {
        return fail$$1( true &&
            "Expected observable map, object or array as first array");
    }
    if (target.dehancer !== undefined)
        return fail$$1( true && "An intercept reader was already established");
    target.dehancer = typeof propOrHandler === "function" ? propOrHandler : handler;
    return function () {
        target.dehancer = undefined;
    };
}

function intercept$$1(thing, propOrHandler, handler) {
    if (typeof handler === "function")
        return interceptProperty(thing, propOrHandler, handler);
    else
        return interceptInterceptable(thing, propOrHandler);
}
function interceptInterceptable(thing, handler) {
    return getAdministration$$1(thing).intercept(handler);
}
function interceptProperty(thing, property, handler) {
    return getAdministration$$1(thing, property).intercept(handler);
}

function _isComputed$$1(value, property) {
    if (value === null || value === undefined)
        return false;
    if (property !== undefined) {
        if (isObservableObject$$1(value) === false)
            return false;
        if (!value[$mobx$$1].values.has(property))
            return false;
        var atom = getAtom$$1(value, property);
        return isComputedValue$$1(atom);
    }
    return isComputedValue$$1(value);
}
function isComputed$$1(value) {
    if (arguments.length > 1)
        return fail$$1( true &&
            "isComputed expects only 1 argument. Use isObservableProp to inspect the observability of a property");
    return _isComputed$$1(value);
}
function isComputedProp$$1(value, propName) {
    if (typeof propName !== "string")
        return fail$$1( true &&
            "isComputed expected a property name as second argument");
    return _isComputed$$1(value, propName);
}

function _isObservable(value, property) {
    if (value === null || value === undefined)
        return false;
    if (property !== undefined) {
        if ( true &&
            (isObservableMap$$1(value) || isObservableArray$$1(value)))
            return fail$$1("isObservable(object, propertyName) is not supported for arrays and maps. Use map.has or array.length instead.");
        if (isObservableObject$$1(value)) {
            return value[$mobx$$1].values.has(property);
        }
        return false;
    }
    // For first check, see #701
    return (isObservableObject$$1(value) ||
        !!value[$mobx$$1] ||
        isAtom$$1(value) ||
        isReaction$$1(value) ||
        isComputedValue$$1(value));
}
function isObservable$$1(value) {
    if (arguments.length !== 1)
        fail$$1( true &&
            "isObservable expects only 1 argument. Use isObservableProp to inspect the observability of a property");
    return _isObservable(value);
}
function isObservableProp$$1(value, propName) {
    if (typeof propName !== "string")
        return fail$$1( true && "expected a property name as second argument");
    return _isObservable(value, propName);
}

function keys$$1(obj) {
    if (isObservableObject$$1(obj)) {
        return obj[$mobx$$1].getKeys();
    }
    if (isObservableMap$$1(obj)) {
        return Array.from(obj.keys());
    }
    if (isObservableSet$$1(obj)) {
        return Array.from(obj.keys());
    }
    if (isObservableArray$$1(obj)) {
        return obj.map(function (_, index) { return index; });
    }
    return fail$$1( true &&
        "'keys()' can only be used on observable objects, arrays, sets and maps");
}
function values$$1(obj) {
    if (isObservableObject$$1(obj)) {
        return keys$$1(obj).map(function (key) { return obj[key]; });
    }
    if (isObservableMap$$1(obj)) {
        return keys$$1(obj).map(function (key) { return obj.get(key); });
    }
    if (isObservableSet$$1(obj)) {
        return Array.from(obj.values());
    }
    if (isObservableArray$$1(obj)) {
        return obj.slice();
    }
    return fail$$1( true &&
        "'values()' can only be used on observable objects, arrays, sets and maps");
}
function entries$$1(obj) {
    if (isObservableObject$$1(obj)) {
        return keys$$1(obj).map(function (key) { return [key, obj[key]]; });
    }
    if (isObservableMap$$1(obj)) {
        return keys$$1(obj).map(function (key) { return [key, obj.get(key)]; });
    }
    if (isObservableSet$$1(obj)) {
        return Array.from(obj.entries());
    }
    if (isObservableArray$$1(obj)) {
        return obj.map(function (key, index) { return [index, key]; });
    }
    return fail$$1( true &&
        "'entries()' can only be used on observable objects, arrays and maps");
}
function set$$1(obj, key, value) {
    if (arguments.length === 2) {
        startBatch$$1();
        var values_1 = key;
        try {
            for (var key_1 in values_1)
                set$$1(obj, key_1, values_1[key_1]);
        }
        finally {
            endBatch$$1();
        }
        return;
    }
    if (isObservableObject$$1(obj)) {
        var adm = obj[$mobx$$1];
        var existingObservable = adm.values.get(key);
        if (existingObservable) {
            adm.write(key, value);
        }
        else {
            adm.addObservableProp(key, value, adm.defaultEnhancer);
        }
    }
    else if (isObservableMap$$1(obj)) {
        obj.set(key, value);
    }
    else if (isObservableArray$$1(obj)) {
        if (typeof key !== "number")
            key = parseInt(key, 10);
        invariant$$1(key >= 0, "Not a valid index: '" + key + "'");
        startBatch$$1();
        if (key >= obj.length)
            obj.length = key + 1;
        obj[key] = value;
        endBatch$$1();
    }
    else {
        return fail$$1( true &&
            "'set()' can only be used on observable objects, arrays and maps");
    }
}
function remove$$1(obj, key) {
    if (isObservableObject$$1(obj)) {
        
        obj[$mobx$$1].remove(key);
    }
    else if (isObservableMap$$1(obj)) {
        obj.delete(key);
    }
    else if (isObservableSet$$1(obj)) {
        obj.delete(key);
    }
    else if (isObservableArray$$1(obj)) {
        if (typeof key !== "number")
            key = parseInt(key, 10);
        invariant$$1(key >= 0, "Not a valid index: '" + key + "'");
        obj.splice(key, 1);
    }
    else {
        return fail$$1( true &&
            "'remove()' can only be used on observable objects, arrays and maps");
    }
}
function has$$1(obj, key) {
    if (isObservableObject$$1(obj)) {
        // return keys(obj).indexOf(key) >= 0
        var adm = getAdministration$$1(obj);
        return adm.has(key);
    }
    else if (isObservableMap$$1(obj)) {
        return obj.has(key);
    }
    else if (isObservableSet$$1(obj)) {
        return obj.has(key);
    }
    else if (isObservableArray$$1(obj)) {
        return key >= 0 && key < obj.length;
    }
    else {
        return fail$$1( true &&
            "'has()' can only be used on observable objects, arrays and maps");
    }
}
function get$$1(obj, key) {
    if (!has$$1(obj, key))
        return undefined;
    if (isObservableObject$$1(obj)) {
        return obj[key];
    }
    else if (isObservableMap$$1(obj)) {
        return obj.get(key);
    }
    else if (isObservableArray$$1(obj)) {
        return obj[key];
    }
    else {
        return fail$$1( true &&
            "'get()' can only be used on observable objects, arrays and maps");
    }
}

function observe$$1(thing, propOrCb, cbOrFire, fireImmediately) {
    if (typeof cbOrFire === "function")
        return observeObservableProperty(thing, propOrCb, cbOrFire, fireImmediately);
    else
        return observeObservable(thing, propOrCb, cbOrFire);
}
function observeObservable(thing, listener, fireImmediately) {
    return getAdministration$$1(thing).observe(listener, fireImmediately);
}
function observeObservableProperty(thing, property, listener, fireImmediately) {
    return getAdministration$$1(thing, property).observe(listener, fireImmediately);
}

var defaultOptions = {
    detectCycles: true,
    exportMapsAsObjects: true,
    recurseEverything: false
};
function cache(map, key, value, options) {
    if (options.detectCycles)
        map.set(key, value);
    return value;
}
function toJSHelper(source, options, __alreadySeen) {
    if (!options.recurseEverything && !isObservable$$1(source))
        return source;
    if (typeof source !== "object")
        return source;
    // Directly return null if source is null
    if (source === null)
        return null;
    // Directly return the Date object itself if contained in the observable
    if (source instanceof Date)
        return source;
    if (isObservableValue$$1(source))
        return toJSHelper(source.get(), options, __alreadySeen);
    // make sure we track the keys of the object
    if (isObservable$$1(source))
        keys$$1(source);
    var detectCycles = options.detectCycles === true;
    if (detectCycles && source !== null && __alreadySeen.has(source)) {
        return __alreadySeen.get(source);
    }
    if (isObservableArray$$1(source) || Array.isArray(source)) {
        var res_1 = cache(__alreadySeen, source, [], options);
        var toAdd = source.map(function (value) { return toJSHelper(value, options, __alreadySeen); });
        res_1.length = toAdd.length;
        for (var i = 0, l = toAdd.length; i < l; i++)
            res_1[i] = toAdd[i];
        return res_1;
    }
    if (isObservableSet$$1(source) || Object.getPrototypeOf(source) === Set.prototype) {
        if (options.exportMapsAsObjects === false) {
            var res_2 = cache(__alreadySeen, source, new Set(), options);
            source.forEach(function (value) {
                res_2.add(toJSHelper(value, options, __alreadySeen));
            });
            return res_2;
        }
        else {
            var res_3 = cache(__alreadySeen, source, [], options);
            source.forEach(function (value) {
                res_3.push(toJSHelper(value, options, __alreadySeen));
            });
            return res_3;
        }
    }
    if (isObservableMap$$1(source) || Object.getPrototypeOf(source) === Map.prototype) {
        if (options.exportMapsAsObjects === false) {
            var res_4 = cache(__alreadySeen, source, new Map(), options);
            source.forEach(function (value, key) {
                res_4.set(key, toJSHelper(value, options, __alreadySeen));
            });
            return res_4;
        }
        else {
            var res_5 = cache(__alreadySeen, source, {}, options);
            source.forEach(function (value, key) {
                res_5[key] = toJSHelper(value, options, __alreadySeen);
            });
            return res_5;
        }
    }
    // Fallback to the situation that source is an ObservableObject or a plain object
    var res = cache(__alreadySeen, source, {}, options);
    for (var key in source) {
        res[key] = toJSHelper(source[key], options, __alreadySeen);
    }
    return res;
}
function toJS$$1(source, options) {
    // backward compatibility
    if (typeof options === "boolean")
        options = { detectCycles: options };
    if (!options)
        options = defaultOptions;
    options.detectCycles =
        options.detectCycles === undefined
            ? options.recurseEverything === true
            : options.detectCycles === true;
    var __alreadySeen;
    if (options.detectCycles)
        __alreadySeen = new Map();
    return toJSHelper(source, options, __alreadySeen);
}

function trace$$1() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var enterBreakPoint = false;
    if (typeof args[args.length - 1] === "boolean")
        enterBreakPoint = args.pop();
    var derivation = getAtomFromArgs(args);
    if (!derivation) {
        return fail$$1( true &&
            "'trace(break?)' can only be used inside a tracked computed value or a Reaction. Consider passing in the computed value or reaction explicitly");
    }
    if (derivation.isTracing === TraceMode$$1.NONE) {
        console.log("[mobx.trace] '" + derivation.name + "' tracing enabled");
    }
    derivation.isTracing = enterBreakPoint ? TraceMode$$1.BREAK : TraceMode$$1.LOG;
}
function getAtomFromArgs(args) {
    switch (args.length) {
        case 0:
            return globalState$$1.trackingDerivation;
        case 1:
            return getAtom$$1(args[0]);
        case 2:
            return getAtom$$1(args[0], args[1]);
    }
}

/**
 * During a transaction no views are updated until the end of the transaction.
 * The transaction will be run synchronously nonetheless.
 *
 * @param action a function that updates some reactive state
 * @returns any value that was returned by the 'action' parameter.
 */
function transaction$$1(action$$1, thisArg) {
    if (thisArg === void 0) { thisArg = undefined; }
    startBatch$$1();
    try {
        return action$$1.apply(thisArg);
    }
    finally {
        endBatch$$1();
    }
}

function when$$1(predicate, arg1, arg2) {
    if (arguments.length === 1 || (arg1 && typeof arg1 === "object"))
        return whenPromise(predicate, arg1);
    return _when(predicate, arg1, arg2 || {});
}
function _when(predicate, effect, opts) {
    var timeoutHandle;
    if (typeof opts.timeout === "number") {
        timeoutHandle = setTimeout(function () {
            if (!disposer[$mobx$$1].isDisposed) {
                disposer();
                var error = new Error("WHEN_TIMEOUT");
                if (opts.onError)
                    opts.onError(error);
                else
                    throw error;
            }
        }, opts.timeout);
    }
    opts.name = opts.name || "When@" + getNextId$$1();
    var effectAction = createAction$$1(opts.name + "-effect", effect);
    var disposer = autorun$$1(function (r) {
        if (predicate()) {
            r.dispose();
            if (timeoutHandle)
                clearTimeout(timeoutHandle);
            effectAction();
        }
    }, opts);
    return disposer;
}
function whenPromise(predicate, opts) {
    if ( true && opts && opts.onError)
        return fail$$1("the options 'onError' and 'promise' cannot be combined");
    var cancel;
    var res = new Promise(function (resolve, reject) {
        var disposer = _when(predicate, resolve, __assign({}, opts, { onError: reject }));
        cancel = function () {
            disposer();
            reject("WHEN_CANCELLED");
        };
    });
    res.cancel = cancel;
    return res;
}

function getAdm(target) {
    return target[$mobx$$1];
}
// Optimization: we don't need the intermediate objects and could have a completely custom administration for DynamicObjects,
// and skip either the internal values map, or the base object with its property descriptors!
var objectProxyTraps = {
    has: function (target, name) {
        if (name === $mobx$$1 || name === "constructor" || name === mobxDidRunLazyInitializersSymbol$$1)
            return true;
        var adm = getAdm(target);
        // MWE: should `in` operator be reactive? If not, below code path will be faster / more memory efficient
        // TODO: check performance stats!
        // if (adm.values.get(name as string)) return true
        if (typeof name === "string")
            return adm.has(name);
        return name in target;
    },
    get: function (target, name) {
        if (name === $mobx$$1 || name === "constructor" || name === mobxDidRunLazyInitializersSymbol$$1)
            return target[name];
        var adm = getAdm(target);
        var observable$$1 = adm.values.get(name);
        if (observable$$1 instanceof Atom$$1) {
            var result = observable$$1.get();
            if (result === undefined) {
                // This fixes #1796, because deleting a prop that has an
                // undefined value won't retrigger a observer (no visible effect),
                // the autorun wouldn't subscribe to future key changes (see also next comment)
                adm.has(name);
            }
            return result;
        }
        // make sure we start listening to future keys
        // note that we only do this here for optimization
        if (typeof name === "string")
            adm.has(name);
        return target[name];
    },
    set: function (target, name, value) {
        if (typeof name !== "string")
            return false;
        set$$1(target, name, value);
        return true;
    },
    deleteProperty: function (target, name) {
        if (typeof name !== "string")
            return false;
        var adm = getAdm(target);
        adm.remove(name);
        return true;
    },
    ownKeys: function (target) {
        var adm = getAdm(target);
        adm.keysAtom.reportObserved();
        return Reflect.ownKeys(target);
    },
    preventExtensions: function (target) {
        fail$$1("Dynamic observable objects cannot be frozen");
        return false;
    }
};
function createDynamicObservableObject$$1(base) {
    var proxy = new Proxy(base, objectProxyTraps);
    base[$mobx$$1].proxy = proxy;
    return proxy;
}

function hasInterceptors$$1(interceptable) {
    return interceptable.interceptors !== undefined && interceptable.interceptors.length > 0;
}
function registerInterceptor$$1(interceptable, handler) {
    var interceptors = interceptable.interceptors || (interceptable.interceptors = []);
    interceptors.push(handler);
    return once$$1(function () {
        var idx = interceptors.indexOf(handler);
        if (idx !== -1)
            interceptors.splice(idx, 1);
    });
}
function interceptChange$$1(interceptable, change) {
    var prevU = untrackedStart$$1();
    try {
        var interceptors = interceptable.interceptors;
        if (interceptors)
            for (var i = 0, l = interceptors.length; i < l; i++) {
                change = interceptors[i](change);
                invariant$$1(!change || change.type, "Intercept handlers should return nothing or a change object");
                if (!change)
                    break;
            }
        return change;
    }
    finally {
        untrackedEnd$$1(prevU);
    }
}

function hasListeners$$1(listenable) {
    return listenable.changeListeners !== undefined && listenable.changeListeners.length > 0;
}
function registerListener$$1(listenable, handler) {
    var listeners = listenable.changeListeners || (listenable.changeListeners = []);
    listeners.push(handler);
    return once$$1(function () {
        var idx = listeners.indexOf(handler);
        if (idx !== -1)
            listeners.splice(idx, 1);
    });
}
function notifyListeners$$1(listenable, change) {
    var prevU = untrackedStart$$1();
    var listeners = listenable.changeListeners;
    if (!listeners)
        return;
    listeners = listeners.slice();
    for (var i = 0, l = listeners.length; i < l; i++) {
        listeners[i](change);
    }
    untrackedEnd$$1(prevU);
}

var MAX_SPLICE_SIZE = 10000; // See e.g. https://github.com/mobxjs/mobx/issues/859
var arrayTraps = {
    get: function (target, name) {
        if (name === $mobx$$1)
            return target[$mobx$$1];
        if (name === "length")
            return target[$mobx$$1].getArrayLength();
        if (typeof name === "number") {
            return arrayExtensions.get.call(target, name);
        }
        if (typeof name === "string" && !isNaN(name)) {
            return arrayExtensions.get.call(target, parseInt(name));
        }
        if (arrayExtensions.hasOwnProperty(name)) {
            return arrayExtensions[name];
        }
        return target[name];
    },
    set: function (target, name, value) {
        if (name === "length") {
            target[$mobx$$1].setArrayLength(value);
            return true;
        }
        if (typeof name === "number") {
            arrayExtensions.set.call(target, name, value);
            return true;
        }
        if (!isNaN(name)) {
            arrayExtensions.set.call(target, parseInt(name), value);
            return true;
        }
        return false;
    },
    preventExtensions: function (target) {
        fail$$1("Observable arrays cannot be frozen");
        return false;
    }
};
function createObservableArray$$1(initialValues, enhancer, name, owned) {
    if (name === void 0) { name = "ObservableArray@" + getNextId$$1(); }
    if (owned === void 0) { owned = false; }
    var adm = new ObservableArrayAdministration(name, enhancer, owned);
    addHiddenFinalProp$$1(adm.values, $mobx$$1, adm);
    var proxy = new Proxy(adm.values, arrayTraps);
    adm.proxy = proxy;
    if (initialValues && initialValues.length) {
        var prev = allowStateChangesStart$$1(true);
        adm.spliceWithArray(0, 0, initialValues);
        allowStateChangesEnd$$1(prev);
    }
    return proxy;
}
var ObservableArrayAdministration = /** @class */ (function () {
    function ObservableArrayAdministration(name, enhancer, owned) {
        this.owned = owned;
        this.values = [];
        this.proxy = undefined;
        this.lastKnownLength = 0;
        this.atom = new Atom$$1(name || "ObservableArray@" + getNextId$$1());
        this.enhancer = function (newV, oldV) { return enhancer(newV, oldV, name + "[..]"); };
    }
    ObservableArrayAdministration.prototype.dehanceValue = function (value) {
        if (this.dehancer !== undefined)
            return this.dehancer(value);
        return value;
    };
    ObservableArrayAdministration.prototype.dehanceValues = function (values$$1) {
        if (this.dehancer !== undefined && values$$1.length > 0)
            return values$$1.map(this.dehancer);
        return values$$1;
    };
    ObservableArrayAdministration.prototype.intercept = function (handler) {
        return registerInterceptor$$1(this, handler);
    };
    ObservableArrayAdministration.prototype.observe = function (listener, fireImmediately) {
        if (fireImmediately === void 0) { fireImmediately = false; }
        if (fireImmediately) {
            listener({
                object: this.proxy,
                type: "splice",
                index: 0,
                added: this.values.slice(),
                addedCount: this.values.length,
                removed: [],
                removedCount: 0
            });
        }
        return registerListener$$1(this, listener);
    };
    ObservableArrayAdministration.prototype.getArrayLength = function () {
        this.atom.reportObserved();
        return this.values.length;
    };
    ObservableArrayAdministration.prototype.setArrayLength = function (newLength) {
        if (typeof newLength !== "number" || newLength < 0)
            throw new Error("[mobx.array] Out of range: " + newLength);
        var currentLength = this.values.length;
        if (newLength === currentLength)
            return;
        else if (newLength > currentLength) {
            var newItems = new Array(newLength - currentLength);
            for (var i = 0; i < newLength - currentLength; i++)
                newItems[i] = undefined; // No Array.fill everywhere...
            this.spliceWithArray(currentLength, 0, newItems);
        }
        else
            this.spliceWithArray(newLength, currentLength - newLength);
    };
    ObservableArrayAdministration.prototype.updateArrayLength = function (oldLength, delta) {
        if (oldLength !== this.lastKnownLength)
            throw new Error("[mobx] Modification exception: the internal structure of an observable array was changed.");
        this.lastKnownLength += delta;
    };
    ObservableArrayAdministration.prototype.spliceWithArray = function (index, deleteCount, newItems) {
        var _this = this;
        checkIfStateModificationsAreAllowed$$1(this.atom);
        var length = this.values.length;
        if (index === undefined)
            index = 0;
        else if (index > length)
            index = length;
        else if (index < 0)
            index = Math.max(0, length + index);
        if (arguments.length === 1)
            deleteCount = length - index;
        else if (deleteCount === undefined || deleteCount === null)
            deleteCount = 0;
        else
            deleteCount = Math.max(0, Math.min(deleteCount, length - index));
        if (newItems === undefined)
            newItems = EMPTY_ARRAY$$1;
        if (hasInterceptors$$1(this)) {
            var change = interceptChange$$1(this, {
                object: this.proxy,
                type: "splice",
                index: index,
                removedCount: deleteCount,
                added: newItems
            });
            if (!change)
                return EMPTY_ARRAY$$1;
            deleteCount = change.removedCount;
            newItems = change.added;
        }
        newItems = newItems.length === 0 ? newItems : newItems.map(function (v) { return _this.enhancer(v, undefined); });
        if (true) {
            var lengthDelta = newItems.length - deleteCount;
            this.updateArrayLength(length, lengthDelta); // checks if internal array wasn't modified
        }
        var res = this.spliceItemsIntoValues(index, deleteCount, newItems);
        if (deleteCount !== 0 || newItems.length !== 0)
            this.notifyArraySplice(index, newItems, res);
        return this.dehanceValues(res);
    };
    ObservableArrayAdministration.prototype.spliceItemsIntoValues = function (index, deleteCount, newItems) {
        var _a;
        if (newItems.length < MAX_SPLICE_SIZE) {
            return (_a = this.values).splice.apply(_a, __spread([index, deleteCount], newItems));
        }
        else {
            var res = this.values.slice(index, index + deleteCount);
            this.values = this.values
                .slice(0, index)
                .concat(newItems, this.values.slice(index + deleteCount));
            return res;
        }
    };
    ObservableArrayAdministration.prototype.notifyArrayChildUpdate = function (index, newValue, oldValue) {
        var notifySpy = !this.owned && isSpyEnabled$$1();
        var notify = hasListeners$$1(this);
        var change = notify || notifySpy
            ? {
                object: this.proxy,
                type: "update",
                index: index,
                newValue: newValue,
                oldValue: oldValue
            }
            : null;
        // The reason why this is on right hand side here (and not above), is this way the uglifier will drop it, but it won't
        // cause any runtime overhead in development mode without NODE_ENV set, unless spying is enabled
        if (notifySpy && "development" !== "production")
            spyReportStart$$1(__assign({}, change, { name: this.atom.name }));
        this.atom.reportChanged();
        if (notify)
            notifyListeners$$1(this, change);
        if (notifySpy && "development" !== "production")
            spyReportEnd$$1();
    };
    ObservableArrayAdministration.prototype.notifyArraySplice = function (index, added, removed) {
        var notifySpy = !this.owned && isSpyEnabled$$1();
        var notify = hasListeners$$1(this);
        var change = notify || notifySpy
            ? {
                object: this.proxy,
                type: "splice",
                index: index,
                removed: removed,
                added: added,
                removedCount: removed.length,
                addedCount: added.length
            }
            : null;
        if (notifySpy && "development" !== "production")
            spyReportStart$$1(__assign({}, change, { name: this.atom.name }));
        this.atom.reportChanged();
        // conform: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/observe
        if (notify)
            notifyListeners$$1(this, change);
        if (notifySpy && "development" !== "production")
            spyReportEnd$$1();
    };
    return ObservableArrayAdministration;
}());
var arrayExtensions = {
    intercept: function (handler) {
        return this[$mobx$$1].intercept(handler);
    },
    observe: function (listener, fireImmediately) {
        if (fireImmediately === void 0) { fireImmediately = false; }
        var adm = this[$mobx$$1];
        return adm.observe(listener, fireImmediately);
    },
    clear: function () {
        return this.splice(0);
    },
    replace: function (newItems) {
        var adm = this[$mobx$$1];
        return adm.spliceWithArray(0, adm.values.length, newItems);
    },
    /**
     * Converts this array back to a (shallow) javascript structure.
     * For a deep clone use mobx.toJS
     */
    toJS: function () {
        return this.slice();
    },
    toJSON: function () {
        // Used by JSON.stringify
        return this.toJS();
    },
    /*
     * functions that do alter the internal structure of the array, (based on lib.es6.d.ts)
     * since these functions alter the inner structure of the array, the have side effects.
     * Because the have side effects, they should not be used in computed function,
     * and for that reason the do not call dependencyState.notifyObserved
     */
    splice: function (index, deleteCount) {
        var newItems = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            newItems[_i - 2] = arguments[_i];
        }
        var adm = this[$mobx$$1];
        switch (arguments.length) {
            case 0:
                return [];
            case 1:
                return adm.spliceWithArray(index);
            case 2:
                return adm.spliceWithArray(index, deleteCount);
        }
        return adm.spliceWithArray(index, deleteCount, newItems);
    },
    spliceWithArray: function (index, deleteCount, newItems) {
        var adm = this[$mobx$$1];
        return adm.spliceWithArray(index, deleteCount, newItems);
    },
    push: function () {
        var items = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            items[_i] = arguments[_i];
        }
        var adm = this[$mobx$$1];
        adm.spliceWithArray(adm.values.length, 0, items);
        return adm.values.length;
    },
    pop: function () {
        return this.splice(Math.max(this[$mobx$$1].values.length - 1, 0), 1)[0];
    },
    shift: function () {
        return this.splice(0, 1)[0];
    },
    unshift: function () {
        var items = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            items[_i] = arguments[_i];
        }
        var adm = this[$mobx$$1];
        adm.spliceWithArray(0, 0, items);
        return adm.values.length;
    },
    reverse: function () {
        // reverse by default mutates in place before returning the result
        // which makes it both a 'derivation' and a 'mutation'.
        // so we deviate from the default and just make it an dervitation
        if (true) {
            console.warn("[mobx] `observableArray.reverse()` will not update the array in place. Use `observableArray.slice().reverse()` to supress this warning and perform the operation on a copy, or `observableArray.replace(observableArray.slice().reverse())` to reverse & update in place");
        }
        var clone = this.slice();
        return clone.reverse.apply(clone, arguments);
    },
    sort: function (compareFn) {
        // sort by default mutates in place before returning the result
        // which goes against all good practices. Let's not change the array in place!
        if (true) {
            console.warn("[mobx] `observableArray.sort()` will not update the array in place. Use `observableArray.slice().sort()` to supress this warning and perform the operation on a copy, or `observableArray.replace(observableArray.slice().sort())` to sort & update in place");
        }
        var clone = this.slice();
        return clone.sort.apply(clone, arguments);
    },
    remove: function (value) {
        var adm = this[$mobx$$1];
        var idx = adm.dehanceValues(adm.values).indexOf(value);
        if (idx > -1) {
            this.splice(idx, 1);
            return true;
        }
        return false;
    },
    get: function (index) {
        var adm = this[$mobx$$1];
        if (adm) {
            if (index < adm.values.length) {
                adm.atom.reportObserved();
                return adm.dehanceValue(adm.values[index]);
            }
            console.warn("[mobx.array] Attempt to read an array index (" + index + ") that is out of bounds (" + adm.values.length + "). Please check length first. Out of bound indices will not be tracked by MobX");
        }
        return undefined;
    },
    set: function (index, newValue) {
        var adm = this[$mobx$$1];
        var values$$1 = adm.values;
        if (index < values$$1.length) {
            // update at index in range
            checkIfStateModificationsAreAllowed$$1(adm.atom);
            var oldValue = values$$1[index];
            if (hasInterceptors$$1(adm)) {
                var change = interceptChange$$1(adm, {
                    type: "update",
                    object: this,
                    index: index,
                    newValue: newValue
                });
                if (!change)
                    return;
                newValue = change.newValue;
            }
            newValue = adm.enhancer(newValue, oldValue);
            var changed = newValue !== oldValue;
            if (changed) {
                values$$1[index] = newValue;
                adm.notifyArrayChildUpdate(index, newValue, oldValue);
            }
        }
        else if (index === values$$1.length) {
            // add a new item
            adm.spliceWithArray(index, 0, [newValue]);
        }
        else {
            // out of bounds
            throw new Error("[mobx.array] Index out of bounds, " + index + " is larger than " + values$$1.length);
        }
    }
};
[
    "concat",
    "every",
    "filter",
    "forEach",
    "indexOf",
    "join",
    "lastIndexOf",
    "map",
    "reduce",
    "reduceRight",
    "slice",
    "some",
    "toString",
    "toLocaleString"
].forEach(function (funcName) {
    arrayExtensions[funcName] = function () {
        var adm = this[$mobx$$1];
        adm.atom.reportObserved();
        var res = adm.dehanceValues(adm.values);
        return res[funcName].apply(res, arguments);
    };
});
var isObservableArrayAdministration = createInstanceofPredicate$$1("ObservableArrayAdministration", ObservableArrayAdministration);
function isObservableArray$$1(thing) {
    return isObject$$1(thing) && isObservableArrayAdministration(thing[$mobx$$1]);
}

var _a;
var ObservableMapMarker = {};
// just extend Map? See also https://gist.github.com/nestharus/13b4d74f2ef4a2f4357dbd3fc23c1e54
// But: https://github.com/mobxjs/mobx/issues/1556
var ObservableMap$$1 = /** @class */ (function () {
    function ObservableMap$$1(initialData, enhancer, name) {
        if (enhancer === void 0) { enhancer = deepEnhancer$$1; }
        if (name === void 0) { name = "ObservableMap@" + getNextId$$1(); }
        this.enhancer = enhancer;
        this.name = name;
        this[_a] = ObservableMapMarker;
        this._keysAtom = createAtom$$1(this.name + ".keys()");
        this[Symbol.toStringTag] = "Map";
        if (typeof Map !== "function") {
            throw new Error("mobx.map requires Map polyfill for the current browser. Check babel-polyfill or core-js/es6/map.js");
        }
        this._data = new Map();
        this._hasMap = new Map();
        this.merge(initialData);
    }
    ObservableMap$$1.prototype._has = function (key) {
        return this._data.has(key);
    };
    ObservableMap$$1.prototype.has = function (key) {
        if (this._hasMap.has(key))
            return this._hasMap.get(key).get();
        return this._updateHasMapEntry(key, false).get();
    };
    ObservableMap$$1.prototype.set = function (key, value) {
        var hasKey = this._has(key);
        if (hasInterceptors$$1(this)) {
            var change = interceptChange$$1(this, {
                type: hasKey ? "update" : "add",
                object: this,
                newValue: value,
                name: key
            });
            if (!change)
                return this;
            value = change.newValue;
        }
        if (hasKey) {
            this._updateValue(key, value);
        }
        else {
            this._addValue(key, value);
        }
        return this;
    };
    ObservableMap$$1.prototype.delete = function (key) {
        var _this = this;
        if (hasInterceptors$$1(this)) {
            var change = interceptChange$$1(this, {
                type: "delete",
                object: this,
                name: key
            });
            if (!change)
                return false;
        }
        if (this._has(key)) {
            var notifySpy = isSpyEnabled$$1();
            var notify = hasListeners$$1(this);
            var change = notify || notifySpy
                ? {
                    type: "delete",
                    object: this,
                    oldValue: this._data.get(key).value,
                    name: key
                }
                : null;
            if (notifySpy && "development" !== "production")
                spyReportStart$$1(__assign({}, change, { name: this.name, key: key }));
            transaction$$1(function () {
                _this._keysAtom.reportChanged();
                _this._updateHasMapEntry(key, false);
                var observable$$1 = _this._data.get(key);
                observable$$1.setNewValue(undefined);
                _this._data.delete(key);
            });
            if (notify)
                notifyListeners$$1(this, change);
            if (notifySpy && "development" !== "production")
                spyReportEnd$$1();
            return true;
        }
        return false;
    };
    ObservableMap$$1.prototype._updateHasMapEntry = function (key, value) {
        // optimization; don't fill the hasMap if we are not observing, or remove entry if there are no observers anymore
        var entry = this._hasMap.get(key);
        if (entry) {
            entry.setNewValue(value);
        }
        else {
            entry = new ObservableValue$$1(value, referenceEnhancer$$1, this.name + "." + key + "?", false);
            this._hasMap.set(key, entry);
        }
        return entry;
    };
    ObservableMap$$1.prototype._updateValue = function (key, newValue) {
        var observable$$1 = this._data.get(key);
        newValue = observable$$1.prepareNewValue(newValue);
        if (newValue !== globalState$$1.UNCHANGED) {
            var notifySpy = isSpyEnabled$$1();
            var notify = hasListeners$$1(this);
            var change = notify || notifySpy
                ? {
                    type: "update",
                    object: this,
                    oldValue: observable$$1.value,
                    name: key,
                    newValue: newValue
                }
                : null;
            if (notifySpy && "development" !== "production")
                spyReportStart$$1(__assign({}, change, { name: this.name, key: key }));
            observable$$1.setNewValue(newValue);
            if (notify)
                notifyListeners$$1(this, change);
            if (notifySpy && "development" !== "production")
                spyReportEnd$$1();
        }
    };
    ObservableMap$$1.prototype._addValue = function (key, newValue) {
        var _this = this;
        checkIfStateModificationsAreAllowed$$1(this._keysAtom);
        transaction$$1(function () {
            var observable$$1 = new ObservableValue$$1(newValue, _this.enhancer, _this.name + "." + key, false);
            _this._data.set(key, observable$$1);
            newValue = observable$$1.value; // value might have been changed
            _this._updateHasMapEntry(key, true);
            _this._keysAtom.reportChanged();
        });
        var notifySpy = isSpyEnabled$$1();
        var notify = hasListeners$$1(this);
        var change = notify || notifySpy
            ? {
                type: "add",
                object: this,
                name: key,
                newValue: newValue
            }
            : null;
        if (notifySpy && "development" !== "production")
            spyReportStart$$1(__assign({}, change, { name: this.name, key: key }));
        if (notify)
            notifyListeners$$1(this, change);
        if (notifySpy && "development" !== "production")
            spyReportEnd$$1();
    };
    ObservableMap$$1.prototype.get = function (key) {
        if (this.has(key))
            return this.dehanceValue(this._data.get(key).get());
        return this.dehanceValue(undefined);
    };
    ObservableMap$$1.prototype.dehanceValue = function (value) {
        if (this.dehancer !== undefined) {
            return this.dehancer(value);
        }
        return value;
    };
    ObservableMap$$1.prototype.keys = function () {
        this._keysAtom.reportObserved();
        return this._data.keys();
    };
    ObservableMap$$1.prototype.values = function () {
        var self = this;
        var nextIndex = 0;
        var keys$$1 = Array.from(this.keys());
        return makeIterable({
            next: function () {
                return nextIndex < keys$$1.length
                    ? { value: self.get(keys$$1[nextIndex++]), done: false }
                    : { done: true };
            }
        });
    };
    ObservableMap$$1.prototype.entries = function () {
        var self = this;
        var nextIndex = 0;
        var keys$$1 = Array.from(this.keys());
        return makeIterable({
            next: function () {
                if (nextIndex < keys$$1.length) {
                    var key = keys$$1[nextIndex++];
                    return {
                        value: [key, self.get(key)],
                        done: false
                    };
                }
                return { done: true };
            }
        });
    };
    ObservableMap$$1.prototype[(_a = $mobx$$1, Symbol.iterator)] = function () {
        return this.entries();
    };
    ObservableMap$$1.prototype.forEach = function (callback, thisArg) {
        var e_1, _a;
        try {
            for (var _b = __values(this), _c = _b.next(); !_c.done; _c = _b.next()) {
                var _d = __read(_c.value, 2), key = _d[0], value = _d[1];
                callback.call(thisArg, value, key, this);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    /** Merge another object into this object, returns this. */
    ObservableMap$$1.prototype.merge = function (other) {
        var _this = this;
        if (isObservableMap$$1(other)) {
            other = other.toJS();
        }
        transaction$$1(function () {
            if (isPlainObject$$1(other))
                Object.keys(other).forEach(function (key) { return _this.set(key, other[key]); });
            else if (Array.isArray(other))
                other.forEach(function (_a) {
                    var _b = __read(_a, 2), key = _b[0], value = _b[1];
                    return _this.set(key, value);
                });
            else if (isES6Map$$1(other)) {
                if (other.constructor !== Map)
                    return fail$$1("Cannot initialize from classes that inherit from Map: " + other.constructor.name); // prettier-ignore
                other.forEach(function (value, key) { return _this.set(key, value); });
            }
            else if (other !== null && other !== undefined)
                fail$$1("Cannot initialize map from " + other);
        });
        return this;
    };
    ObservableMap$$1.prototype.clear = function () {
        var _this = this;
        transaction$$1(function () {
            untracked$$1(function () {
                var e_2, _a;
                try {
                    for (var _b = __values(_this.keys()), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var key = _c.value;
                        _this.delete(key);
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            });
        });
    };
    ObservableMap$$1.prototype.replace = function (values$$1) {
        var _this = this;
        transaction$$1(function () {
            // grab all the keys that are present in the new map but not present in the current map
            // and delete them from the map, then merge the new map
            // this will cause reactions only on changed values
            var newKeys = getMapLikeKeys$$1(values$$1);
            var oldKeys = Array.from(_this.keys());
            var missingKeys = oldKeys.filter(function (k) { return newKeys.indexOf(k) === -1; });
            missingKeys.forEach(function (k) { return _this.delete(k); });
            _this.merge(values$$1);
        });
        return this;
    };
    Object.defineProperty(ObservableMap$$1.prototype, "size", {
        get: function () {
            this._keysAtom.reportObserved();
            return this._data.size;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Returns a plain object that represents this map.
     * Note that all the keys being stringified.
     * If there are duplicating keys after converting them to strings, behaviour is undetermined.
     */
    ObservableMap$$1.prototype.toPOJO = function () {
        var e_3, _a;
        var res = {};
        try {
            for (var _b = __values(this), _c = _b.next(); !_c.done; _c = _b.next()) {
                var _d = __read(_c.value, 2), key = _d[0], value = _d[1];
                res["" + key] = value;
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_3) throw e_3.error; }
        }
        return res;
    };
    /**
     * Returns a shallow non observable object clone of this map.
     * Note that the values migth still be observable. For a deep clone use mobx.toJS.
     */
    ObservableMap$$1.prototype.toJS = function () {
        return new Map(this);
    };
    ObservableMap$$1.prototype.toJSON = function () {
        // Used by JSON.stringify
        return this.toPOJO();
    };
    ObservableMap$$1.prototype.toString = function () {
        var _this = this;
        return (this.name +
            "[{ " +
            Array.from(this.keys())
                .map(function (key) { return key + ": " + ("" + _this.get(key)); })
                .join(", ") +
            " }]");
    };
    /**
     * Observes this object. Triggers for the events 'add', 'update' and 'delete'.
     * See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/observe
     * for callback details
     */
    ObservableMap$$1.prototype.observe = function (listener, fireImmediately) {
         true &&
            invariant$$1(fireImmediately !== true, "`observe` doesn't support fireImmediately=true in combination with maps.");
        return registerListener$$1(this, listener);
    };
    ObservableMap$$1.prototype.intercept = function (handler) {
        return registerInterceptor$$1(this, handler);
    };
    return ObservableMap$$1;
}());
/* 'var' fixes small-build issue */
var isObservableMap$$1 = createInstanceofPredicate$$1("ObservableMap", ObservableMap$$1);

var _a$1;
var ObservableSetMarker = {};
var ObservableSet$$1 = /** @class */ (function () {
    function ObservableSet$$1(initialData, enhancer, name) {
        if (enhancer === void 0) { enhancer = deepEnhancer$$1; }
        if (name === void 0) { name = "ObservableSet@" + getNextId$$1(); }
        this.name = name;
        this[_a$1] = ObservableSetMarker;
        this._data = new Set();
        this._atom = createAtom$$1(this.name);
        this[Symbol.toStringTag] = "Set";
        if (typeof Set !== "function") {
            throw new Error("mobx.set requires Set polyfill for the current browser. Check babel-polyfill or core-js/es6/set.js");
        }
        this.enhancer = function (newV, oldV) { return enhancer(newV, oldV, name); };
        if (initialData) {
            this.replace(initialData);
        }
    }
    ObservableSet$$1.prototype.dehanceValue = function (value) {
        if (this.dehancer !== undefined) {
            return this.dehancer(value);
        }
        return value;
    };
    ObservableSet$$1.prototype.clear = function () {
        var _this = this;
        transaction$$1(function () {
            untracked$$1(function () {
                var e_1, _a;
                try {
                    for (var _b = __values(_this._data.values()), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var value = _c.value;
                        _this.delete(value);
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            });
        });
    };
    ObservableSet$$1.prototype.forEach = function (callbackFn, thisArg) {
        var e_2, _a;
        try {
            for (var _b = __values(this), _c = _b.next(); !_c.done; _c = _b.next()) {
                var value = _c.value;
                callbackFn.call(thisArg, value, value, this);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
        }
    };
    Object.defineProperty(ObservableSet$$1.prototype, "size", {
        get: function () {
            this._atom.reportObserved();
            return this._data.size;
        },
        enumerable: true,
        configurable: true
    });
    ObservableSet$$1.prototype.add = function (value) {
        var _this = this;
        checkIfStateModificationsAreAllowed$$1(this._atom);
        if (hasInterceptors$$1(this)) {
            var change = interceptChange$$1(this, {
                type: "add",
                object: this,
                newValue: value
            });
            if (!change)
                return this;
            // TODO: ideally, value = change.value would be done here, so that values can be
            // changed by interceptor. Same applies for other Set and Map api's.
        }
        if (!this.has(value)) {
            transaction$$1(function () {
                _this._data.add(_this.enhancer(value, undefined));
                _this._atom.reportChanged();
            });
            var notifySpy = isSpyEnabled$$1();
            var notify = hasListeners$$1(this);
            var change = notify || notifySpy
                ? {
                    type: "add",
                    object: this,
                    newValue: value
                }
                : null;
            if (notifySpy && "development" !== "production")
                spyReportStart$$1(change);
            if (notify)
                notifyListeners$$1(this, change);
            if (notifySpy && "development" !== "production")
                spyReportEnd$$1();
        }
        return this;
    };
    ObservableSet$$1.prototype.delete = function (value) {
        var _this = this;
        if (hasInterceptors$$1(this)) {
            var change = interceptChange$$1(this, {
                type: "delete",
                object: this,
                oldValue: value
            });
            if (!change)
                return false;
        }
        if (this.has(value)) {
            var notifySpy = isSpyEnabled$$1();
            var notify = hasListeners$$1(this);
            var change = notify || notifySpy
                ? {
                    type: "delete",
                    object: this,
                    oldValue: value
                }
                : null;
            if (notifySpy && "development" !== "production")
                spyReportStart$$1(__assign({}, change, { name: this.name }));
            transaction$$1(function () {
                _this._atom.reportChanged();
                _this._data.delete(value);
            });
            if (notify)
                notifyListeners$$1(this, change);
            if (notifySpy && "development" !== "production")
                spyReportEnd$$1();
            return true;
        }
        return false;
    };
    ObservableSet$$1.prototype.has = function (value) {
        this._atom.reportObserved();
        return this._data.has(this.dehanceValue(value));
    };
    ObservableSet$$1.prototype.entries = function () {
        var nextIndex = 0;
        var keys$$1 = Array.from(this.keys());
        var values$$1 = Array.from(this.values());
        return makeIterable({
            next: function () {
                var index = nextIndex;
                nextIndex += 1;
                return index < values$$1.length
                    ? { value: [keys$$1[index], values$$1[index]], done: false }
                    : { done: true };
            }
        });
    };
    ObservableSet$$1.prototype.keys = function () {
        return this.values();
    };
    ObservableSet$$1.prototype.values = function () {
        this._atom.reportObserved();
        var self = this;
        var nextIndex = 0;
        var observableValues = Array.from(this._data.values());
        return makeIterable({
            next: function () {
                return nextIndex < observableValues.length
                    ? { value: self.dehanceValue(observableValues[nextIndex++]), done: false }
                    : { done: true };
            }
        });
    };
    ObservableSet$$1.prototype.replace = function (other) {
        var _this = this;
        if (isObservableSet$$1(other)) {
            other = other.toJS();
        }
        transaction$$1(function () {
            if (Array.isArray(other)) {
                _this.clear();
                other.forEach(function (value) { return _this.add(value); });
            }
            else if (isES6Set$$1(other)) {
                _this.clear();
                other.forEach(function (value) { return _this.add(value); });
            }
            else if (other !== null && other !== undefined) {
                fail$$1("Cannot initialize set from " + other);
            }
        });
        return this;
    };
    ObservableSet$$1.prototype.observe = function (listener, fireImmediately) {
        // TODO 'fireImmediately' can be true?
         true &&
            invariant$$1(fireImmediately !== true, "`observe` doesn't support fireImmediately=true in combination with sets.");
        return registerListener$$1(this, listener);
    };
    ObservableSet$$1.prototype.intercept = function (handler) {
        return registerInterceptor$$1(this, handler);
    };
    ObservableSet$$1.prototype.toJS = function () {
        return new Set(this);
    };
    ObservableSet$$1.prototype.toString = function () {
        return this.name + "[ " + Array.from(this).join(", ") + " ]";
    };
    ObservableSet$$1.prototype[(_a$1 = $mobx$$1, Symbol.iterator)] = function () {
        return this.values();
    };
    return ObservableSet$$1;
}());
var isObservableSet$$1 = createInstanceofPredicate$$1("ObservableSet", ObservableSet$$1);

var ObservableObjectAdministration$$1 = /** @class */ (function () {
    function ObservableObjectAdministration$$1(target, values$$1, name, defaultEnhancer) {
        if (values$$1 === void 0) { values$$1 = new Map(); }
        this.target = target;
        this.values = values$$1;
        this.name = name;
        this.defaultEnhancer = defaultEnhancer;
        this.keysAtom = new Atom$$1(name + ".keys");
    }
    ObservableObjectAdministration$$1.prototype.read = function (key) {
        return this.values.get(key).get();
    };
    ObservableObjectAdministration$$1.prototype.write = function (key, newValue) {
        var instance = this.target;
        var observable$$1 = this.values.get(key);
        if (observable$$1 instanceof ComputedValue$$1) {
            observable$$1.set(newValue);
            return;
        }
        // intercept
        if (hasInterceptors$$1(this)) {
            var change = interceptChange$$1(this, {
                type: "update",
                object: this.proxy || instance,
                name: key,
                newValue: newValue
            });
            if (!change)
                return;
            newValue = change.newValue;
        }
        newValue = observable$$1.prepareNewValue(newValue);
        // notify spy & observers
        if (newValue !== globalState$$1.UNCHANGED) {
            var notify = hasListeners$$1(this);
            var notifySpy = isSpyEnabled$$1();
            var change = notify || notifySpy
                ? {
                    type: "update",
                    object: this.proxy || instance,
                    oldValue: observable$$1.value,
                    name: key,
                    newValue: newValue
                }
                : null;
            if (notifySpy && "development" !== "production")
                spyReportStart$$1(__assign({}, change, { name: this.name, key: key }));
            observable$$1.setNewValue(newValue);
            if (notify)
                notifyListeners$$1(this, change);
            if (notifySpy && "development" !== "production")
                spyReportEnd$$1();
        }
    };
    ObservableObjectAdministration$$1.prototype.has = function (key) {
        var map = this.pendingKeys || (this.pendingKeys = new Map());
        var entry = map.get(key);
        if (entry)
            return entry.get();
        else {
            var exists = !!this.values.get(key);
            // Possible optimization: Don't have a separate map for non existing keys,
            // but store them in the values map instead, using a special symbol to denote "not existing"
            entry = new ObservableValue$$1(exists, referenceEnhancer$$1, this.name + "." + key.toString() + "?", false);
            map.set(key, entry);
            return entry.get(); // read to subscribe
        }
    };
    ObservableObjectAdministration$$1.prototype.addObservableProp = function (propName, newValue, enhancer) {
        if (enhancer === void 0) { enhancer = this.defaultEnhancer; }
        var target = this.target;
        assertPropertyConfigurable$$1(target, propName);
        if (hasInterceptors$$1(this)) {
            var change = interceptChange$$1(this, {
                object: this.proxy || target,
                name: propName,
                type: "add",
                newValue: newValue
            });
            if (!change)
                return;
            newValue = change.newValue;
        }
        var observable$$1 = new ObservableValue$$1(newValue, enhancer, this.name + "." + propName, false);
        this.values.set(propName, observable$$1);
        newValue = observable$$1.value; // observableValue might have changed it
        Object.defineProperty(target, propName, generateObservablePropConfig$$1(propName));
        this.notifyPropertyAddition(propName, newValue);
    };
    ObservableObjectAdministration$$1.prototype.addComputedProp = function (propertyOwner, // where is the property declared?
    propName, options) {
        var target = this.target;
        options.name = options.name || this.name + "." + propName;
        this.values.set(propName, new ComputedValue$$1(options));
        if (propertyOwner === target || isPropertyConfigurable$$1(propertyOwner, propName))
            Object.defineProperty(propertyOwner, propName, generateComputedPropConfig$$1(propName));
    };
    ObservableObjectAdministration$$1.prototype.remove = function (key) {
        if (!this.values.has(key))
            return;
        var target = this.target;
        if (hasInterceptors$$1(this)) {
            var change = interceptChange$$1(this, {
                object: this.proxy || target,
                name: key,
                type: "remove"
            });
            if (!change)
                return;
        }
        try {
            startBatch$$1();
            var notify = hasListeners$$1(this);
            var notifySpy = isSpyEnabled$$1();
            var oldObservable = this.values.get(key);
            var oldValue = oldObservable && oldObservable.get();
            oldObservable && oldObservable.set(undefined);
            // notify key and keyset listeners
            this.keysAtom.reportChanged();
            this.values.delete(key);
            if (this.pendingKeys) {
                var entry = this.pendingKeys.get(key);
                if (entry)
                    entry.set(false);
            }
            // delete the prop
            delete this.target[key];
            var change = notify || notifySpy
                ? {
                    type: "remove",
                    object: this.proxy || target,
                    oldValue: oldValue,
                    name: key
                }
                : null;
            if (notifySpy && "development" !== "production")
                spyReportStart$$1(__assign({}, change, { name: this.name, key: key }));
            if (notify)
                notifyListeners$$1(this, change);
            if (notifySpy && "development" !== "production")
                spyReportEnd$$1();
        }
        finally {
            endBatch$$1();
        }
    };
    ObservableObjectAdministration$$1.prototype.illegalAccess = function (owner, propName) {
        /**
         * This happens if a property is accessed through the prototype chain, but the property was
         * declared directly as own property on the prototype.
         *
         * E.g.:
         * class A {
         * }
         * extendObservable(A.prototype, { x: 1 })
         *
         * classB extens A {
         * }
         * console.log(new B().x)
         *
         * It is unclear whether the property should be considered 'static' or inherited.
         * Either use `console.log(A.x)`
         * or: decorate(A, { x: observable })
         *
         * When using decorate, the property will always be redeclared as own property on the actual instance
         */
        console.warn("Property '" + propName + "' of '" + owner + "' was accessed through the prototype chain. Use 'decorate' instead to declare the prop or access it statically through it's owner");
    };
    /**
     * Observes this object. Triggers for the events 'add', 'update' and 'delete'.
     * See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/observe
     * for callback details
     */
    ObservableObjectAdministration$$1.prototype.observe = function (callback, fireImmediately) {
         true &&
            invariant$$1(fireImmediately !== true, "`observe` doesn't support the fire immediately property for observable objects.");
        return registerListener$$1(this, callback);
    };
    ObservableObjectAdministration$$1.prototype.intercept = function (handler) {
        return registerInterceptor$$1(this, handler);
    };
    ObservableObjectAdministration$$1.prototype.notifyPropertyAddition = function (key, newValue) {
        var notify = hasListeners$$1(this);
        var notifySpy = isSpyEnabled$$1();
        var change = notify || notifySpy
            ? {
                type: "add",
                object: this.proxy || this.target,
                name: key,
                newValue: newValue
            }
            : null;
        if (notifySpy && "development" !== "production")
            spyReportStart$$1(__assign({}, change, { name: this.name, key: key }));
        if (notify)
            notifyListeners$$1(this, change);
        if (notifySpy && "development" !== "production")
            spyReportEnd$$1();
        if (this.pendingKeys) {
            var entry = this.pendingKeys.get(key);
            if (entry)
                entry.set(true);
        }
        this.keysAtom.reportChanged();
    };
    ObservableObjectAdministration$$1.prototype.getKeys = function () {
        var e_1, _a;
        this.keysAtom.reportObserved();
        // return Reflect.ownKeys(this.values) as any
        var res = [];
        try {
            for (var _b = __values(this.values), _c = _b.next(); !_c.done; _c = _b.next()) {
                var _d = __read(_c.value, 2), key = _d[0], value = _d[1];
                if (value instanceof ObservableValue$$1)
                    res.push(key);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return res;
    };
    return ObservableObjectAdministration$$1;
}());
function asObservableObject$$1(target, name, defaultEnhancer) {
    if (name === void 0) { name = ""; }
    if (defaultEnhancer === void 0) { defaultEnhancer = deepEnhancer$$1; }
    if (Object.prototype.hasOwnProperty.call(target, $mobx$$1))
        return target[$mobx$$1];
     true &&
        invariant$$1(Object.isExtensible(target), "Cannot make the designated object observable; it is not extensible");
    if (!isPlainObject$$1(target))
        name = (target.constructor.name || "ObservableObject") + "@" + getNextId$$1();
    if (!name)
        name = "ObservableObject@" + getNextId$$1();
    var adm = new ObservableObjectAdministration$$1(target, new Map(), name, defaultEnhancer);
    addHiddenProp$$1(target, $mobx$$1, adm);
    return adm;
}
var observablePropertyConfigs = Object.create(null);
var computedPropertyConfigs = Object.create(null);
function generateObservablePropConfig$$1(propName) {
    return (observablePropertyConfigs[propName] ||
        (observablePropertyConfigs[propName] = {
            configurable: true,
            enumerable: true,
            get: function () {
                return this[$mobx$$1].read(propName);
            },
            set: function (v) {
                this[$mobx$$1].write(propName, v);
            }
        }));
}
function getAdministrationForComputedPropOwner(owner) {
    var adm = owner[$mobx$$1];
    if (!adm) {
        // because computed props are declared on proty,
        // the current instance might not have been initialized yet
        initializeInstance$$1(owner);
        return owner[$mobx$$1];
    }
    return adm;
}
function generateComputedPropConfig$$1(propName) {
    return (computedPropertyConfigs[propName] ||
        (computedPropertyConfigs[propName] = {
            configurable: false,
            enumerable: false,
            get: function () {
                return getAdministrationForComputedPropOwner(this).read(propName);
            },
            set: function (v) {
                getAdministrationForComputedPropOwner(this).write(propName, v);
            }
        }));
}
var isObservableObjectAdministration = createInstanceofPredicate$$1("ObservableObjectAdministration", ObservableObjectAdministration$$1);
function isObservableObject$$1(thing) {
    if (isObject$$1(thing)) {
        // Initializers run lazily when transpiling to babel, so make sure they are run...
        initializeInstance$$1(thing);
        return isObservableObjectAdministration(thing[$mobx$$1]);
    }
    return false;
}

function getAtom$$1(thing, property) {
    if (typeof thing === "object" && thing !== null) {
        if (isObservableArray$$1(thing)) {
            if (property !== undefined)
                fail$$1( true &&
                    "It is not possible to get index atoms from arrays");
            return thing[$mobx$$1].atom;
        }
        if (isObservableSet$$1(thing)) {
            return thing[$mobx$$1];
        }
        if (isObservableMap$$1(thing)) {
            var anyThing = thing;
            if (property === undefined)
                return anyThing._keysAtom;
            var observable$$1 = anyThing._data.get(property) || anyThing._hasMap.get(property);
            if (!observable$$1)
                fail$$1( true &&
                    "the entry '" + property + "' does not exist in the observable map '" + getDebugName$$1(thing) + "'");
            return observable$$1;
        }
        // Initializers run lazily when transpiling to babel, so make sure they are run...
        initializeInstance$$1(thing);
        if (property && !thing[$mobx$$1])
            thing[property]; // See #1072
        if (isObservableObject$$1(thing)) {
            if (!property)
                return fail$$1( true && "please specify a property");
            var observable$$1 = thing[$mobx$$1].values.get(property);
            if (!observable$$1)
                fail$$1( true &&
                    "no observable property '" + property + "' found on the observable object '" + getDebugName$$1(thing) + "'");
            return observable$$1;
        }
        if (isAtom$$1(thing) || isComputedValue$$1(thing) || isReaction$$1(thing)) {
            return thing;
        }
    }
    else if (typeof thing === "function") {
        if (isReaction$$1(thing[$mobx$$1])) {
            // disposer function
            return thing[$mobx$$1];
        }
    }
    return fail$$1( true && "Cannot obtain atom from " + thing);
}
function getAdministration$$1(thing, property) {
    if (!thing)
        fail$$1("Expecting some object");
    if (property !== undefined)
        return getAdministration$$1(getAtom$$1(thing, property));
    if (isAtom$$1(thing) || isComputedValue$$1(thing) || isReaction$$1(thing))
        return thing;
    if (isObservableMap$$1(thing) || isObservableSet$$1(thing))
        return thing;
    // Initializers run lazily when transpiling to babel, so make sure they are run...
    initializeInstance$$1(thing);
    if (thing[$mobx$$1])
        return thing[$mobx$$1];
    fail$$1( true && "Cannot obtain administration from " + thing);
}
function getDebugName$$1(thing, property) {
    var named;
    if (property !== undefined)
        named = getAtom$$1(thing, property);
    else if (isObservableObject$$1(thing) || isObservableMap$$1(thing) || isObservableSet$$1(thing))
        named = getAdministration$$1(thing);
    else
        named = getAtom$$1(thing); // valid for arrays as well
    return named.name;
}

var toString = Object.prototype.toString;
function deepEqual$$1(a, b) {
    return eq(a, b);
}
// Copied from https://github.com/jashkenas/underscore/blob/5c237a7c682fb68fd5378203f0bf22dce1624854/underscore.js#L1186-L1289
// Internal recursive comparison function for `isEqual`.
function eq(a, b, aStack, bStack) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
    if (a === b)
        return a !== 0 || 1 / a === 1 / b;
    // `null` or `undefined` only equal to itself (strict comparison).
    if (a == null || b == null)
        return false;
    // `NaN`s are equivalent, but non-reflexive.
    if (a !== a)
        return b !== b;
    // Exhaust primitive checks
    var type = typeof a;
    if (type !== "function" && type !== "object" && typeof b != "object")
        return false;
    return deepEq(a, b, aStack, bStack);
}
// Internal recursive comparison function for `isEqual`.
function deepEq(a, b, aStack, bStack) {
    // Unwrap any wrapped objects.
    a = unwrap(a);
    b = unwrap(b);
    // Compare `[[Class]]` names.
    var className = toString.call(a);
    if (className !== toString.call(b))
        return false;
    switch (className) {
        // Strings, numbers, regular expressions, dates, and booleans are compared by value.
        case "[object RegExp]":
        // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
        case "[object String]":
            // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
            // equivalent to `new String("5")`.
            return "" + a === "" + b;
        case "[object Number]":
            // `NaN`s are equivalent, but non-reflexive.
            // Object(NaN) is equivalent to NaN.
            if (+a !== +a)
                return +b !== +b;
            // An `egal` comparison is performed for other numeric values.
            return +a === 0 ? 1 / +a === 1 / b : +a === +b;
        case "[object Date]":
        case "[object Boolean]":
            // Coerce dates and booleans to numeric primitive values. Dates are compared by their
            // millisecond representations. Note that invalid dates with millisecond representations
            // of `NaN` are not equivalent.
            return +a === +b;
        case "[object Symbol]":
            return (typeof Symbol !== "undefined" && Symbol.valueOf.call(a) === Symbol.valueOf.call(b));
    }
    var areArrays = className === "[object Array]";
    if (!areArrays) {
        if (typeof a != "object" || typeof b != "object")
            return false;
        // Objects with different constructors are not equivalent, but `Object`s or `Array`s
        // from different frames are.
        var aCtor = a.constructor, bCtor = b.constructor;
        if (aCtor !== bCtor &&
            !(typeof aCtor === "function" &&
                aCtor instanceof aCtor &&
                typeof bCtor === "function" &&
                bCtor instanceof bCtor) &&
            ("constructor" in a && "constructor" in b)) {
            return false;
        }
    }
    // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
    // Initializing stack of traversed objects.
    // It's done here since we only need them for objects and arrays comparison.
    aStack = aStack || [];
    bStack = bStack || [];
    var length = aStack.length;
    while (length--) {
        // Linear search. Performance is inversely proportional to the number of
        // unique nested structures.
        if (aStack[length] === a)
            return bStack[length] === b;
    }
    // Add the first object to the stack of traversed objects.
    aStack.push(a);
    bStack.push(b);
    // Recursively compare objects and arrays.
    if (areArrays) {
        // Compare array lengths to determine if a deep comparison is necessary.
        length = a.length;
        if (length !== b.length)
            return false;
        // Deep compare the contents, ignoring non-numeric properties.
        while (length--) {
            if (!eq(a[length], b[length], aStack, bStack))
                return false;
        }
    }
    else {
        // Deep compare objects.
        var keys$$1 = Object.keys(a), key;
        length = keys$$1.length;
        // Ensure that both objects contain the same number of properties before comparing deep equality.
        if (Object.keys(b).length !== length)
            return false;
        while (length--) {
            // Deep compare each member
            key = keys$$1[length];
            if (!(has$1(b, key) && eq(a[key], b[key], aStack, bStack)))
                return false;
        }
    }
    // Remove the first object from the stack of traversed objects.
    aStack.pop();
    bStack.pop();
    return true;
}
function unwrap(a) {
    if (isObservableArray$$1(a))
        return a.slice();
    if (isES6Map$$1(a) || isObservableMap$$1(a))
        return Array.from(a.entries());
    if (isES6Set$$1(a) || isObservableSet$$1(a))
        return Array.from(a.entries());
    return a;
}
function has$1(a, key) {
    return Object.prototype.hasOwnProperty.call(a, key);
}

function makeIterable(iterator) {
    iterator[Symbol.iterator] = self;
    return iterator;
}
function self() {
    return this;
}

/*
The only reason for this file to exist is pure horror:
Without it rollup can make the bundling fail at any point in time; when it rolls up the files in the wrong order
it will cause undefined errors (for example because super classes or local variables not being hosted).
With this file that will still happen,
but at least in this file we can magically reorder the imports with trial and error until the build succeeds again.
*/

/**
 * (c) Michel Weststrate 2015 - 2018
 * MIT Licensed
 *
 * Welcome to the mobx sources! To get an global overview of how MobX internally works,
 * this is a good place to start:
 * https://medium.com/@mweststrate/becoming-fully-reactive-an-in-depth-explanation-of-mobservable-55995262a254#.xvbh6qd74
 *
 * Source folders:
 * ===============
 *
 * - api/     Most of the public static methods exposed by the module can be found here.
 * - core/    Implementation of the MobX algorithm; atoms, derivations, reactions, dependency trees, optimizations. Cool stuff can be found here.
 * - types/   All the magic that is need to have observable objects, arrays and values is in this folder. Including the modifiers like `asFlat`.
 * - utils/   Utility stuff.
 *
 */
if (typeof Proxy === "undefined" || typeof Symbol === "undefined") {
    throw new Error("[mobx] MobX 5+ requires Proxy and Symbol objects. If your environment doesn't support Proxy objects, please downgrade to MobX 4. For React Native Android, consider upgrading JSCore.");
}
try {
    // define process.env if needed
    // if this is not a production build in the first place
    // (in which case the expression below would be substituted with 'production')
    "development";
}
catch (e) {
    var g = typeof window !== "undefined" ? window : global;
    if (typeof process === "undefined")
        g.process = {};
    g.process.env = {};
}

(function () {
    function testCodeMinification() { }
    if (testCodeMinification.name !== "testCodeMinification" &&
        "development" !== "production" &&
        process.env.IGNORE_MOBX_MINIFY_WARNING !== "true") {
        console.warn(
        // Template literal(backtick) is used for fix issue with rollup-plugin-commonjs https://github.com/rollup/rollup-plugin-commonjs/issues/344
        "[mobx] you are running a minified build, but 'process.env.NODE_ENV' was not set to 'production' in your bundler. This results in an unnecessarily large and slow bundle");
    }
})();
// Devtools support
if (typeof __MOBX_DEVTOOLS_GLOBAL_HOOK__ === "object") {
    // See: https://github.com/andykog/mobx-devtools/
    __MOBX_DEVTOOLS_GLOBAL_HOOK__.injectMobx({
        spy: spy$$1,
        extras: {
            getDebugName: getDebugName$$1
        },
        $mobx: $mobx$$1
    });
}



/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../process/browser.js */ "./node_modules/process/browser.js"), __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./src/background/background.ts":
/*!**************************************!*\
  !*** ./src/background/background.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const store_1 = __webpack_require__(/*! ../popup/store */ "./src/popup/store/index.ts");
const history_1 = __webpack_require__(/*! ./tab/history */ "./src/background/tab/history.ts");
const onInstall_1 = __webpack_require__(/*! ./runtime/onInstall */ "./src/background/runtime/onInstall.ts");
const onMessage_1 = __webpack_require__(/*! ./runtime/onMessage */ "./src/background/runtime/onMessage.ts");
const store = new store_1.default();
history_1.default(store.webtoon, store.option);
onInstall_1.default(store.webtoon, store.option);
onMessage_1.default(store.webtoon, store.option);


/***/ }),

/***/ "./src/background/runtime/onInstall.ts":
/*!*********************************************!*\
  !*** ./src/background/runtime/onInstall.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function default_1(webtoon, option) {
    chrome.runtime.onInstalled.addListener(details => {
        if (details.reason === "install") {
            console.log("Init Start");
            webtoon.setVisitsFromChrome();
        }
        else if (details.reason === "update") {
            const currentVersion = chrome.runtime.getManifest().version;
            if (details.previousVersion != currentVersion) {
                chrome.browserAction.setBadgeText({
                    text: " "
                });
            }
        }
    });
}
exports.default = default_1;


/***/ }),

/***/ "./src/background/runtime/onMessage.ts":
/*!*********************************************!*\
  !*** ./src/background/runtime/onMessage.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function default_1(webtoon, option) {
    chrome.runtime.onMessage.addListener((message, sender, response) => {
        const param = new URL(sender.url).searchParams;
        const wid = param.get("titleId");
        const no = param.get("no");
        if (message && message.command === "openTab") {
            const link = sender.url.replace("m.comic", "comic");
            // Force Tab
            chrome.tabs.create({
                url: link
            });
            // option.openTab(link);
            response(null);
        }
        else if (wid && no && message.scroll && option.saveScroll) {
            message.scroll = Math.round(message.scroll * 100);
            if (message.scroll <= 2 || message.scroll >= 98) {
                if (webtoon.scrolls[wid] && webtoon.scrolls[wid][no]) {
                    delete webtoon.scrolls[wid][no];
                    if (Object.keys(webtoon.scrolls[wid]).length == 0) {
                        delete webtoon.scrolls[wid];
                    }
                }
                webtoon.scrolls = webtoon.scrolls;
                return;
            }
            if (!webtoon.scrolls[wid]) {
                webtoon.scrolls[wid] = {};
            }
            webtoon.scrolls[wid][no] = message.scroll;
            // Save to Store
            webtoon.scrolls = webtoon.scrolls;
        }
        else if (message && message.command === "reload") {
            location.reload();
        }
    });
}
exports.default = default_1;


/***/ }),

/***/ "./src/background/tab/history.ts":
/*!***************************************!*\
  !*** ./src/background/tab/history.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (webtoon, option) => {
    function displayHistory(tabId, webtoonId) {
        if (webtoon.visits[webtoonId] && option.showHistory) {
            Object.keys(webtoon.visits[webtoonId]).forEach(key => {
                chrome.tabs.executeScript(tabId, {
                    code: `var wlog = document.querySelector("a[href*='detail.nhn?titleId=${webtoonId}&no=${key}']");
          if (wlog){
            wlog=wlog.parentElement.parentElement;
            wlog.style.background="lightgray";
            wlog.title="${new Date(webtoon.visits[webtoonId][key] * 1000).toLocaleString() + "에 봄"}"
        }`
                });
            });
        }
    }
    function checkScroll(tabId) {
        chrome.tabs.executeScript(tabId, {
            code: `
      var checkPercent;
      function checkSc( event ) {
          window.clearTimeout( checkPercent );
          checkPercent = setTimeout(function() {
      chrome.runtime.sendMessage('${chrome.runtime.id}', {scroll : (document.documentElement.scrollTop - document.querySelector(".wt_viewer").childNodes[1].offsetTop) / document.querySelector(".wt_viewer").scrollHeight })
      }, 100);
}
window.addEventListener('scroll',checkSc, false);`
        });
    }
    function setScroll(tabId, scroll) {
        console.log("setScroll");
        if (option.scrollAlert) {
            chrome.tabs.executeScript(tabId, {
                code: `if (confirm("[webtoon extension] 이전에 본 기록이 남아있습니다. (${scroll}%)\\n이어보시겠습니까?"));
      document.documentElement.scrollTop = document.querySelector(".wt_viewer").childNodes[1].offsetTop + document.querySelector(".wt_viewer").scrollHeight * ${scroll /
                    100}`
            });
        }
        else {
            chrome.tabs.executeScript(tabId, {
                code: `document.documentElement.scrollTop = document.querySelector(".wt_viewer").childNodes[1].offsetTop + document.querySelector(".wt_viewer").scrollHeight * ${scroll /
                    100}`
            });
        }
    }
    function autoNext(tabId, isAuto) {
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
    function checkScrollMobile(tabId) {
        chrome.tabs.executeScript(tabId, {
            code: `
      var checkPercent;
      function checkSc( event ) {
        window.clearTimeout( checkPercent );
        checkPercent = setTimeout(function() {
        chrome.runtime.sendMessage("${chrome.runtime.id}", {scroll : document.documentElement.scrollTop / document.querySelector("#toonLayer>ul").scrollHeight })
      }, 100)
    }
    window.addEventListener('scroll',checkSc, false);`
        });
    }
    function setScrollMobile(tabId, scroll) {
        chrome.tabs.executeScript(tabId, {
            code: `setTimeout(()=>{document.documentElement.scrollTop = document.querySelector("#toonLayer>ul").scrollHeight * ${scroll /
                100}}, 500)
                        `
        });
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
                        checkScroll(tabId);
                    }
                    if (webtoon.scrolls[webtoonId] && webtoon.scrolls[webtoonId][no]) {
                        setScroll(tabId, webtoon.scrolls[webtoonId][no]);
                    }
                    if (option.autoNext) {
                        console.log("autonext");
                        autoNext(tabId, option.autoNext);
                    }
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
          chrome.runtime.sendMessage("${chrome.runtime.id}", {command : 'openTab'}, ()=>{window.close()})
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
                }
                else if (url.pathname.indexOf("/detail.nhn") > 0) {
                    const webtoonId = url.searchParams.get("titleId");
                    const no = url.searchParams.get("no");
                    if (!webtoonId || !no) {
                        return;
                    }
                    if (!webtoon.webtoonType[webtoonId]) {
                        webtoon.webtoonType[webtoonId] = {
                            title: tab.title.split("::")[0].trim(),
                            type: url.pathname.split("/detail.nhn")[0]
                        };
                    }
                    webtoon.visits[webtoonId][no] = Math.floor(new Date().getTime() / 1000);
                    if (option.saveScroll) {
                        checkScrollMobile(tabId);
                    }
                    if (webtoon.scrolls[webtoonId] && webtoon.scrolls[webtoonId][no]) {
                        setScrollMobile(tabId, webtoon.scrolls[webtoonId][no]);
                    }
                }
            }
        }
    });
};


/***/ }),

/***/ "./src/popup/request/index.ts":
/*!************************************!*\
  !*** ./src/popup/request/index.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
exports.weekDay = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
class WebtoonRequest {
    /**
     * 페이지의 사진, 타이틀을 불러옵니다.
     * @param type 웹툰 타입
     * @param key1 웹툰 번호
     * @param key2 회차 번호
     */
    static getOpenGraph(type, key1, key2) {
        return __awaiter(this, void 0, void 0, function* () {
            const og = {};
            const url = `https://comic.naver.com${type}/detail.nhn?titleId=${key1}&no=${key2}`;
            const { data } = yield axios_1.default.get(url);
            og.title = data.match(/<meta [^>]*property=[\"']og:description[\"'] [^>]*content=[\"']([^'^\"]+?)[\"'][^>]*>/)[1];
            og.img = data.match(/<meta [^>]*property=[\"']og:image[\"'] [^>]*content=[\"']([^'^\"]+?)[\"'][^>]*>/)[1];
            if (og.title && og.img && og.img.match("https://shared-comic.pstatic.net/thumb/"))
                return og;
            console.log(`OpenGraph get failed.`, url, og);
            return null;
        });
    }
    static getAllWebtoon(sort) {
        return __awaiter(this, void 0, void 0, function* () {
            const link = `https://comic.naver.com/webtoon/weekday.nhn?order=${sort}`;
            const { data } = yield axios_1.default.get(link);
            if (!data) {
                console.log(`request:${link} Error`);
                return null;
            }
            const webtoons = {};
            const page = new DOMParser().parseFromString(data, "text/html").querySelector("div.daily_all");
            exports.weekDay.forEach(day => {
                const dayElement = page.querySelector("h4." + day).parentElement.querySelectorAll("ul>li");
                webtoons[day] = [];
                dayElement.forEach(element => {
                    const webtoon = {};
                    const toonElement = element.querySelector("div.thumb>a");
                    const imgElement = element.querySelector("div.thumb>a>img");
                    const url = new URL(toonElement.href);
                    webtoon.img = imgElement.src;
                    webtoon.title = imgElement.title;
                    webtoon.link = `https://comic.naver.com${url.pathname + url.search}`;
                    webtoon.isRest = !!toonElement.querySelector("em.ico_break");
                    webtoon.isUp = !!toonElement.querySelector("em.ico_updt");
                    webtoon.id = parseInt(url.searchParams.get("titleId"));
                    webtoons[day].push(webtoon);
                });
            });
            return webtoons;
        });
    }
}
exports.default = WebtoonRequest;


/***/ }),

/***/ "./src/popup/store/index.ts":
/*!**********************************!*\
  !*** ./src/popup/store/index.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const option_1 = __webpack_require__(/*! ./option */ "./src/popup/store/option.ts");
const webtoon_1 = __webpack_require__(/*! ./webtoon */ "./src/popup/store/webtoon.ts");
class RootStore {
    constructor() {
        this.option = new option_1.default();
        this.webtoon = new webtoon_1.default(this.option);
        // Dev Only
        chrome.storage.onChanged.addListener(change => {
            console.log("chrome storage changed", change);
        });
    }
}
exports.default = RootStore;


/***/ }),

/***/ "./src/popup/store/option.ts":
/*!***********************************!*\
  !*** ./src/popup/store/option.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mobx_1 = __webpack_require__(/*! mobx */ "./node_modules/mobx/lib/mobx.module.js");
const storeKeys = [
    "_storeLocation",
    "_orderBy",
    "_showHistory",
    "_historyMax",
    "_saveWebtoonSort",
    "_saveScroll",
    "_hiddenComment",
    "_autoNext",
    "_useImgLog",
    "_saveFavorate",
    "_linkTarget",
    "_scrollAlert"
];
class OptionStore {
    /**
     * 생성자
     */
    constructor() {
        this.localUsage = 0;
        this.syncUsage = 0;
        /**
         * 사용자 데이터를 저장할 저장소
         */
        this._storeLocation = "local";
        /**
         * 웹툰 정렬 방식
         */
        this._orderBy = "ViewCount";
        /**
         * 웹툰 기록을 보이는 여부
         */
        this._showHistory = true;
        /**
         * 최대 기록 저장 개수
         */
        this._historyMax = 500;
        /**
         * 요일별 웹툰 사용자 지정 순서를 적용하는 여부
         */
        this._saveWebtoonSort = true;
        /**
         * 스크롤을 저장하는 여부
         */
        this._saveScroll = true;
        this._scrollAlert = true;
        /**
         * 댓글을 숨기는 여부
         */
        this._hiddenComment = false;
        /**
         * 자동으로 자동화로 넘어가는 여부
         */
        this._autoNext = true;
        /**
         * 이미지 경로를 로그로 저장하는 여부
         */
        this._useImgLog = true;
        /**
         * 즐겨찾기를 추가하는 여부
         */
        this._saveFavorate = true;
        /**
         * 링크를 열 위치
         */
        this._linkTarget = "Tab";
        // Chrome Storage로부터 설정값을 초기화
        chrome.storage.sync.get("option", ({ option: item }) => {
            if (item)
                item = JSON.parse(item);
            if (item && Object.keys(item).length === storeKeys.length) {
                storeKeys.forEach(key => {
                    this[key] = item[key];
                });
                this.getUseBytes();
            }
            else if (!item || Object.keys(item).length === 0) {
                chrome.storage.sync.set({
                    option: JSON.stringify(this.optionObject)
                }, () => {
                    this.getUseBytes();
                    console.log("Option Init");
                });
            }
            else {
                Object.keys(storeKeys).forEach(key => {
                    if (item[key]) {
                        this[key] = item[key];
                    }
                });
                chrome.storage.sync.set({ option: JSON.stringify(this.optionObject) }, () => {
                    this.getUseBytes();
                    console.log("Update Complate");
                });
            }
        });
        // chrome storage를 store와 동기화
        chrome.storage.onChanged.addListener((change, area) => {
            if (change.option) {
                const option = JSON.parse(change.option.newValue);
                storeKeys.forEach(key => {
                    if (option[key]) {
                        this[key] = option[key];
                    }
                });
                this.getUseBytes();
            }
        });
    }
    get optionObject() {
        const obj = {};
        storeKeys.forEach(key => {
            obj[key] = this[key];
        });
        return obj;
    }
    saveToStore() {
        chrome.storage.sync.set({
            option: JSON.stringify(this.optionObject)
        });
    }
    getUseBytes() {
        chrome.storage.local.getBytesInUse(use => {
            this.localUsage = use;
        });
        chrome.storage.sync.getBytesInUse(use => {
            this.syncUsage = use;
        });
    }
    get storeLocation() {
        return this._storeLocation;
    }
    set storeLocation(value) {
        this._storeLocation = value;
        this.saveToStore();
    }
    get orderBy() {
        return this._orderBy;
    }
    set orderBy(value) {
        this._orderBy = value;
        this.saveToStore();
    }
    get showHistory() {
        return this._showHistory;
    }
    set showHistory(value) {
        this._showHistory = value;
        this.saveToStore();
    }
    get historyMax() {
        return this._historyMax;
    }
    set historyMax(value) {
        if (this._storeLocation === "local" && value > 200)
            value = 200;
        if (this._storeLocation === "sync" && value > 500)
            value = 500;
        this._historyMax = value;
        this.saveToStore();
    }
    get saveWebtoonSort() {
        return this._saveWebtoonSort;
    }
    set saveWebtoonSort(value) {
        this._saveWebtoonSort = value;
        this.saveToStore();
    }
    get saveScroll() {
        return this._saveScroll;
    }
    set saveScroll(value) {
        this._saveScroll = value;
        if (value === true) {
            this._scrollAlert = true;
        }
        this.saveToStore();
    }
    get scrollAlert() {
        return this._scrollAlert;
    }
    set scrollAlert(value) {
        this._scrollAlert = value;
        this.saveToStore();
    }
    get hiddenComment() {
        return this._hiddenComment;
    }
    set hiddenComment(value) {
        this._hiddenComment = value;
        this.saveToStore();
    }
    get autoNext() {
        return this._autoNext;
    }
    set autoNext(value) {
        this._autoNext = value;
        this.saveToStore();
    }
    get useImgLog() {
        return this._useImgLog;
    }
    set useImgLog(value) {
        this._useImgLog = value;
        this.saveToStore();
    }
    get saveFavorate() {
        return this._saveFavorate;
    }
    set saveFavorate(value) {
        this._saveFavorate = value;
        this.saveToStore();
    }
    get linkTarget() {
        return this._linkTarget;
    }
    set linkTarget(value) {
        this._linkTarget = value;
        this.saveToStore();
    }
    /**
     * 스토어 초기화
     * @param store 초기화 할 스토어 위치
     */
    resetStore(store) {
        chrome.storage[store].clear();
        this.getUseBytes();
    }
    /**
     * 링크를 엽니다
     * @param link 링크
     */
    openTab(link) {
        switch (this._linkTarget) {
            case "Current":
                chrome.tabs.update({
                    url: link
                });
                break;
            case "Popup":
                chrome.windows.create({
                    url: link.replace("https://", "https://m."),
                    width: 400,
                    height: 800,
                    type: "popup"
                }, window => {
                    window.alwaysOnTop = true;
                });
                break;
            case "Tab":
                chrome.tabs.create({
                    url: link
                });
            default:
                console.warn("[Warning] option.linkTarget이 잘못 설정되었습니다.");
                chrome.tabs.create({
                    url: link
                });
        }
    }
}
__decorate([
    mobx_1.observable
], OptionStore.prototype, "localUsage", void 0);
__decorate([
    mobx_1.observable
], OptionStore.prototype, "syncUsage", void 0);
__decorate([
    mobx_1.observable
], OptionStore.prototype, "_storeLocation", void 0);
__decorate([
    mobx_1.computed
], OptionStore.prototype, "storeLocation", null);
__decorate([
    mobx_1.observable
], OptionStore.prototype, "_orderBy", void 0);
__decorate([
    mobx_1.computed
], OptionStore.prototype, "orderBy", null);
__decorate([
    mobx_1.observable
], OptionStore.prototype, "_showHistory", void 0);
__decorate([
    mobx_1.computed
], OptionStore.prototype, "showHistory", null);
__decorate([
    mobx_1.observable
], OptionStore.prototype, "_historyMax", void 0);
__decorate([
    mobx_1.computed
], OptionStore.prototype, "historyMax", null);
__decorate([
    mobx_1.observable
], OptionStore.prototype, "_saveWebtoonSort", void 0);
__decorate([
    mobx_1.computed
], OptionStore.prototype, "saveWebtoonSort", null);
__decorate([
    mobx_1.observable
], OptionStore.prototype, "_saveScroll", void 0);
__decorate([
    mobx_1.computed
], OptionStore.prototype, "saveScroll", null);
__decorate([
    mobx_1.observable
], OptionStore.prototype, "_scrollAlert", void 0);
__decorate([
    mobx_1.computed
], OptionStore.prototype, "scrollAlert", null);
__decorate([
    mobx_1.observable
], OptionStore.prototype, "_hiddenComment", void 0);
__decorate([
    mobx_1.computed
], OptionStore.prototype, "hiddenComment", null);
__decorate([
    mobx_1.observable
], OptionStore.prototype, "_autoNext", void 0);
__decorate([
    mobx_1.computed
], OptionStore.prototype, "autoNext", null);
__decorate([
    mobx_1.observable
], OptionStore.prototype, "_useImgLog", void 0);
__decorate([
    mobx_1.computed
], OptionStore.prototype, "useImgLog", null);
__decorate([
    mobx_1.observable
], OptionStore.prototype, "_saveFavorate", void 0);
__decorate([
    mobx_1.computed
], OptionStore.prototype, "saveFavorate", null);
__decorate([
    mobx_1.observable
], OptionStore.prototype, "_linkTarget", void 0);
__decorate([
    mobx_1.computed
], OptionStore.prototype, "linkTarget", null);
exports.default = OptionStore;


/***/ }),

/***/ "./src/popup/store/webtoon.ts":
/*!************************************!*\
  !*** ./src/popup/store/webtoon.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mobx_1 = __webpack_require__(/*! mobx */ "./node_modules/mobx/lib/mobx.module.js");
const request_1 = __webpack_require__(/*! ../request */ "./src/popup/request/index.ts");
class WebtoonStore {
    constructor(option) {
        /**
         * 방문한 웹툰의 제목과 타입을 저장합니다.
         */
        this._webtoonType = {};
        /**
         * 방문한 회차의 정보를 저장합니다.
         */
        this._visits = {};
        /**
         * 사용자가 본 스크롤 데이터를 저장합니다.
         */
        this._scrolls = {};
        /**
         * 웹툰 정보를 따로 저장합니다.
         */
        this._imglog = {};
        this.MaxView = 20;
        /**
         * 최근 웹툰들.
         */
        this._recentWebtoon = [];
        /**
         * 요일 별 웹툰
         *
         */
        this._dailyWebtoons = {};
        /**
         * 즐겨찾기 한 웹툰
         *
         */
        this._starWebtoons = {};
        this._sortWebtoon = {};
        this.loadingStatus = "not start";
        this.option = option;
        this.storage.get(["webtoon", "visits", "scrolls", "favorate", "sortWebtoon", "imglog"], value => {
            if (value.scrolls)
                this._scrolls = JSON.parse(value.scrolls);
            if (value.visits)
                this._visits = JSON.parse(value.visits);
            if (value.webtoon)
                this._webtoonType = JSON.parse(value.webtoon);
            if (value.favorate)
                this._starWebtoons = JSON.parse(value.favorate);
            if (value.sortWebtoon)
                this._sortWebtoon = JSON.parse(value.sortWebtoon);
            this.getRecentWebtoon();
            request_1.default.getAllWebtoon(this.option.orderBy).then(value => {
                this.setDailyWebtoon(value);
            });
            mobx_1.observe(option, "orderBy", change => {
                if (change.oldValue != change.newValue) {
                    request_1.default.getAllWebtoon(change.newValue).then(value => {
                        this._dailyWebtoons = value;
                    });
                }
            });
            mobx_1.observe(option, "saveWebtoonSort", change => {
                request_1.default.getAllWebtoon(this.option.orderBy).then(value => {
                    this.setDailyWebtoon(value);
                });
            });
        });
        chrome.storage.onChanged.addListener((change, area) => {
            Object.keys(change).forEach((key) => {
                const value = change[key].newValue;
                if (key === "favorate") {
                    if (value != JSON.stringify(this._starWebtoons)) {
                        this._starWebtoons = JSON.parse(value);
                    }
                }
                else if (key === "imglog") {
                    if (value != JSON.stringify(this._imglog)) {
                        this._imglog = JSON.parse(value);
                    }
                }
                else if (key === "scrolls") {
                    if (value != JSON.stringify(this._scrolls)) {
                        this._scrolls = JSON.parse(value);
                    }
                }
                else if (key === "visits") {
                    if (value != JSON.stringify(this._visits)) {
                        this._visits = JSON.parse(value);
                        this.getRecentWebtoon();
                    }
                }
                else if (key === "webtoon") {
                    if (value != JSON.stringify(this._webtoonType)) {
                        this._webtoonType = JSON.parse(value);
                        this.getRecentWebtoon();
                    }
                }
                else if (key === "sortWebtoon") {
                    if (value != JSON.stringify(this._sortWebtoon)) {
                        this._sortWebtoon = JSON.parse(value);
                    }
                }
                this.option.getUseBytes();
            });
        });
    }
    saveToStore(key, value) {
        this.storage.set({
            [key]: JSON.stringify(value)
        }, () => {
            this.option.getUseBytes();
        });
    }
    setDailyWebtoon(webtoons) {
        if (this.option.saveWebtoonSort) {
            if (JSON.stringify(this._sortWebtoon) === JSON.stringify({})) {
                Object.keys(webtoons).forEach((key) => {
                    if (!this._sortWebtoon[key])
                        this._sortWebtoon[key] = [];
                    this._sortWebtoon[key] = webtoons[key].map(v => v.id);
                });
                this.sortWebtoon = this._sortWebtoon;
            }
            else {
                Object.keys(webtoons).forEach((key) => {
                    const sorted = this._sortWebtoon[key];
                    webtoons[key].findIndex(element => (sorted.indexOf(element.id) != -1 ? true : false));
                    webtoons[key].sort((a, b) => (sorted.indexOf(a.id) > sorted.indexOf(b.id) ? 1 : -1));
                });
            }
        }
        this._dailyWebtoons = webtoons;
    }
    get storage() {
        return chrome.storage[this.option.storeLocation];
    }
    get webtoonType() {
        return this._webtoonType;
    }
    set webtoonType(value) {
        this._webtoonType = value;
        this.saveToStore("webtoon", value);
    }
    get visits() {
        return this._visits;
    }
    set visits(value) {
        this._visits = value;
        this.saveToStore("visits", value);
    }
    get scrolls() {
        return this._scrolls;
    }
    set scrolls(value) {
        this._scrolls = value;
        this.saveToStore("scrolls", value);
    }
    get imglog() {
        return this._imglog;
    }
    set imglog(value) {
        if (!this.option.useImgLog) {
            console.error("imglog 미사용 중");
        }
        this._imglog = value;
        this.saveToStore("imglog", value);
    }
    get recentWebtoon() {
        return this._recentWebtoon.map((item, idx) => {
            if (idx < this.MaxView) {
                return item;
            }
        });
    }
    set recentWebtoon(value) {
        this._recentWebtoon = value;
    }
    get dailyWebtoons() {
        return this._dailyWebtoons;
    }
    set dailyWebtoons(value) {
        this._dailyWebtoons = value;
    }
    get starWebtoons() {
        return this._starWebtoons;
    }
    set starWebtoons(value) {
        this._starWebtoons = value;
        this.saveToStore("favorate", value);
        console.log("change starWebtoons");
    }
    get sortWebtoon() {
        return this._sortWebtoon;
    }
    set sortWebtoon(value) {
        this._sortWebtoon = value;
        this.saveToStore("sortWebtoon", value);
    }
    get starWebtoonInfo() {
        const returnValue = [];
        Object.keys(this._starWebtoons).forEach(value => {
            if (this._starWebtoons[value]) {
                Object.keys(this._dailyWebtoons).map(key => this._dailyWebtoons[key]).forEach(wlist => {
                    wlist.forEach(webtoon => {
                        // read-only object를 clone함.
                        const wt = Object.assign({}, webtoon);
                        if (wt.id === parseInt(value)) {
                            let exists = false;
                            returnValue.forEach(({ id, isUp, isRest }) => {
                                if (id === wt.id)
                                    exists = true;
                                if (isRest || isUp) {
                                    returnValue.forEach(find => {
                                        if (find.id === id) {
                                            find.isUp = isUp;
                                            find.isRest = isRest;
                                        }
                                    });
                                }
                            });
                            if (!exists)
                                returnValue.push(wt);
                        }
                    });
                });
            }
        });
        return returnValue;
    }
    /**
     * 웹툰 기록의 개수
     *
     * @readonly
     */
    get visitCount() {
        let result = 0;
        Object.keys(this.visits).forEach(v => {
            result += Object.keys(this.visits[v]).length;
        });
        return result;
    }
    requestInfo() { }
    getRecentWebtoon() {
        return __awaiter(this, void 0, void 0, function* () {
            const webtoons = [];
            const promises = [];
            this.loadingStatus = "start";
            Object.keys(this._visits).forEach(key => {
                Object.keys(this._visits[key]).forEach(key2 => {
                    if (!this._imglog[`${key}-${key2}`]) {
                        promises.push(request_1.default.getOpenGraph(this._webtoonType[key].type, parseInt(key), parseInt(key2)).then(value => {
                            if (value) {
                                webtoons.push({
                                    id: parseInt(key),
                                    lastVisit: this._visits[key][key2] * 1000,
                                    name: this._webtoonType[key].title,
                                    no: parseInt(key2),
                                    type: this._webtoonType[key].type,
                                    img: value.img,
                                    noname: value.title
                                });
                                if (this.option.useImgLog) {
                                    this._imglog[`${key}-${key2}`] = {
                                        image: value.img,
                                        name: value.title
                                    };
                                }
                            }
                            else {
                                delete this._visits[key][key2];
                                this.visits = this._visits;
                            }
                        }));
                    }
                    else {
                        const { image, name } = this._imglog[`${key}-${key2}`];
                        webtoons.push({
                            id: parseInt(key),
                            lastVisit: this._visits[key][key2] * 1000,
                            name: this._webtoonType[key].title,
                            no: parseInt(key2),
                            type: this._webtoonType[key].type,
                            img: image,
                            noname: name
                        });
                    }
                });
            });
            yield Promise.all(promises);
            webtoons.sort((a, b) => {
                if (a.lastVisit < b.lastVisit)
                    return 1;
                return -1;
            });
            this.recentWebtoon = webtoons;
            this.loadingStatus = "end";
            // Save to Chrome
            this.imglog = this._imglog;
            this._visits = this._visits;
            console.log(webtoons);
        });
    }
    setVisitsFromChrome() {
        chrome.history.search({
            text: "detail.nhn?titleId=",
            startTime: 0,
            maxResults: 5000
        }, data => {
            this.webtoonType = this.visits = {};
            const webtoon = {};
            const visits = {};
            let index = 0;
            data.forEach(d => {
                if (!d.title || index >= this.option.historyMax)
                    return false;
                const url = new URL(d.url);
                const params = url.searchParams;
                const wid = params.get("titleId");
                const wno = params.get("no");
                if (!wid || !wno)
                    return false;
                if (!webtoon[wid]) {
                    webtoon[wid] = {};
                    visits[wid] = {};
                    webtoon[wid].title = d.title.split("::")[0];
                    webtoon[wid].type = url.pathname.split("/detail.nhn")[0];
                }
                if (!visits[wid][wno]) {
                    index++;
                    visits[wid][wno] = Math.floor(d.lastVisitTime / 1000);
                }
            });
            this.webtoonType = webtoon;
            this.visits = visits;
            if (window["UIkit"]) {
                UIkit.notification(`<div class="uk-text-small">방문기록에서 기록을 불러왔습니다.</div>`, {
                    timeout: 2000
                });
            }
        });
    }
}
__decorate([
    mobx_1.computed
], WebtoonStore.prototype, "storage", null);
__decorate([
    mobx_1.observable
], WebtoonStore.prototype, "_webtoonType", void 0);
__decorate([
    mobx_1.computed
], WebtoonStore.prototype, "webtoonType", null);
__decorate([
    mobx_1.observable
], WebtoonStore.prototype, "_visits", void 0);
__decorate([
    mobx_1.computed
], WebtoonStore.prototype, "visits", null);
__decorate([
    mobx_1.observable
], WebtoonStore.prototype, "_scrolls", void 0);
__decorate([
    mobx_1.computed
], WebtoonStore.prototype, "scrolls", null);
__decorate([
    mobx_1.observable
], WebtoonStore.prototype, "_imglog", void 0);
__decorate([
    mobx_1.computed
], WebtoonStore.prototype, "imglog", null);
__decorate([
    mobx_1.observable
], WebtoonStore.prototype, "MaxView", void 0);
__decorate([
    mobx_1.observable
], WebtoonStore.prototype, "_recentWebtoon", void 0);
__decorate([
    mobx_1.computed
], WebtoonStore.prototype, "recentWebtoon", null);
__decorate([
    mobx_1.observable
], WebtoonStore.prototype, "_dailyWebtoons", void 0);
__decorate([
    mobx_1.computed
], WebtoonStore.prototype, "dailyWebtoons", null);
__decorate([
    mobx_1.observable
], WebtoonStore.prototype, "_starWebtoons", void 0);
__decorate([
    mobx_1.computed
], WebtoonStore.prototype, "starWebtoons", null);
__decorate([
    mobx_1.observable
], WebtoonStore.prototype, "_sortWebtoon", void 0);
__decorate([
    mobx_1.computed
], WebtoonStore.prototype, "sortWebtoon", null);
__decorate([
    mobx_1.computed
], WebtoonStore.prototype, "starWebtoonInfo", null);
__decorate([
    mobx_1.computed
], WebtoonStore.prototype, "visitCount", null);
__decorate([
    mobx_1.action
], WebtoonStore.prototype, "requestInfo", null);
__decorate([
    mobx_1.observable
], WebtoonStore.prototype, "loadingStatus", void 0);
__decorate([
    mobx_1.action
], WebtoonStore.prototype, "getRecentWebtoon", null);
__decorate([
    mobx_1.action
], WebtoonStore.prototype, "setVisitsFromChrome", null);
exports.default = WebtoonStore;


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvYWRhcHRlcnMveGhyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvYXhpb3MuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jYW5jZWwvQ2FuY2VsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY2FuY2VsL0NhbmNlbFRva2VuLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY2FuY2VsL2lzQ2FuY2VsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9BeGlvcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvSW50ZXJjZXB0b3JNYW5hZ2VyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9jcmVhdGVFcnJvci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvZGlzcGF0Y2hSZXF1ZXN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9lbmhhbmNlRXJyb3IuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL3NldHRsZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvdHJhbnNmb3JtRGF0YS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2RlZmF1bHRzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9iaW5kLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9idG9hLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9idWlsZFVSTC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvY29tYmluZVVSTHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2Nvb2tpZXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2lzQWJzb2x1dGVVUkwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2lzVVJMU2FtZU9yaWdpbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvbm9ybWFsaXplSGVhZGVyTmFtZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvcGFyc2VIZWFkZXJzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9zcHJlYWQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi91dGlscy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvaXMtYnVmZmVyL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tb2J4L2xpYi9tb2J4Lm1vZHVsZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzIiwid2VicGFjazovLy8od2VicGFjaykvYnVpbGRpbi9nbG9iYWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JhY2tncm91bmQvYmFja2dyb3VuZC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvYmFja2dyb3VuZC9ydW50aW1lL29uSW5zdGFsbC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvYmFja2dyb3VuZC9ydW50aW1lL29uTWVzc2FnZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvYmFja2dyb3VuZC90YWIvaGlzdG9yeS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcG9wdXAvcmVxdWVzdC9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcG9wdXAvc3RvcmUvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3BvcHVwL3N0b3JlL29wdGlvbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcG9wdXAvc3RvcmUvd2VidG9vbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNsRkEsaUJBQWlCLG1CQUFPLENBQUMsc0RBQWEsRTs7Ozs7Ozs7Ozs7O0FDQXpCOztBQUViLFlBQVksbUJBQU8sQ0FBQyxxREFBWTtBQUNoQyxhQUFhLG1CQUFPLENBQUMsaUVBQWtCO0FBQ3ZDLGVBQWUsbUJBQU8sQ0FBQywyRUFBdUI7QUFDOUMsbUJBQW1CLG1CQUFPLENBQUMsbUZBQTJCO0FB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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvREFBb0Q7QUFDcEQ7QUFDQSwyQkFBMkIsT0FBTztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNEQUFzRDtBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLEtBQXFDO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixLQUFxQztBQUNyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixPQUFPO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUM7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNJQUFzSSwyQkFBMkI7QUFDaks7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdEQUFnRDtBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLE9BQU87QUFDN0I7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsaUJBQWlCO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUZBQWlGO0FBQ2pGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esa0VBQWtFO0FBQ2xFO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1EQUFtRDtBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSxhQUFvQjtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHFDQUFxQztBQUNyQztBQUNBLFFBQVEsYUFBb0I7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLEtBQUs7QUFDTDs7QUFFaXVEOzs7Ozs7Ozs7Ozs7O0FDenhJanVEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsc0JBQXNCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QUFRO21EQWlDUjtBQU9TO0lBQVQsZUFBUTs4Q0FNUjtBQUVPO0lBQVAsYUFBTTsrQ0FBaUI7QUFFWjtJQUFYLGlCQUFVO21EQUE0QztBQUd2RDtJQURDLGFBQU07b0RBNkROO0FBRU87SUFBUCxhQUFNO3VEQXlDTjtBQTFZSCwrQkEyWUMiLCJmaWxlIjoiYmFja2dyb3VuZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2JhY2tncm91bmQvYmFja2dyb3VuZC50c1wiKTtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9saWIvYXhpb3MnKTsiLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcbnZhciBzZXR0bGUgPSByZXF1aXJlKCcuLy4uL2NvcmUvc2V0dGxlJyk7XG52YXIgYnVpbGRVUkwgPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvYnVpbGRVUkwnKTtcbnZhciBwYXJzZUhlYWRlcnMgPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvcGFyc2VIZWFkZXJzJyk7XG52YXIgaXNVUkxTYW1lT3JpZ2luID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL2lzVVJMU2FtZU9yaWdpbicpO1xudmFyIGNyZWF0ZUVycm9yID0gcmVxdWlyZSgnLi4vY29yZS9jcmVhdGVFcnJvcicpO1xudmFyIGJ0b2EgPSAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LmJ0b2EgJiYgd2luZG93LmJ0b2EuYmluZCh3aW5kb3cpKSB8fCByZXF1aXJlKCcuLy4uL2hlbHBlcnMvYnRvYScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHhockFkYXB0ZXIoY29uZmlnKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiBkaXNwYXRjaFhoclJlcXVlc3QocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgdmFyIHJlcXVlc3REYXRhID0gY29uZmlnLmRhdGE7XG4gICAgdmFyIHJlcXVlc3RIZWFkZXJzID0gY29uZmlnLmhlYWRlcnM7XG5cbiAgICBpZiAodXRpbHMuaXNGb3JtRGF0YShyZXF1ZXN0RGF0YSkpIHtcbiAgICAgIGRlbGV0ZSByZXF1ZXN0SGVhZGVyc1snQ29udGVudC1UeXBlJ107IC8vIExldCB0aGUgYnJvd3NlciBzZXQgaXRcbiAgICB9XG5cbiAgICB2YXIgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgIHZhciBsb2FkRXZlbnQgPSAnb25yZWFkeXN0YXRlY2hhbmdlJztcbiAgICB2YXIgeERvbWFpbiA9IGZhbHNlO1xuXG4gICAgLy8gRm9yIElFIDgvOSBDT1JTIHN1cHBvcnRcbiAgICAvLyBPbmx5IHN1cHBvcnRzIFBPU1QgYW5kIEdFVCBjYWxscyBhbmQgZG9lc24ndCByZXR1cm5zIHRoZSByZXNwb25zZSBoZWFkZXJzLlxuICAgIC8vIERPTidUIGRvIHRoaXMgZm9yIHRlc3RpbmcgYi9jIFhNTEh0dHBSZXF1ZXN0IGlzIG1vY2tlZCwgbm90IFhEb21haW5SZXF1ZXN0LlxuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Rlc3QnICYmXG4gICAgICAgIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmXG4gICAgICAgIHdpbmRvdy5YRG9tYWluUmVxdWVzdCAmJiAhKCd3aXRoQ3JlZGVudGlhbHMnIGluIHJlcXVlc3QpICYmXG4gICAgICAgICFpc1VSTFNhbWVPcmlnaW4oY29uZmlnLnVybCkpIHtcbiAgICAgIHJlcXVlc3QgPSBuZXcgd2luZG93LlhEb21haW5SZXF1ZXN0KCk7XG4gICAgICBsb2FkRXZlbnQgPSAnb25sb2FkJztcbiAgICAgIHhEb21haW4gPSB0cnVlO1xuICAgICAgcmVxdWVzdC5vbnByb2dyZXNzID0gZnVuY3Rpb24gaGFuZGxlUHJvZ3Jlc3MoKSB7fTtcbiAgICAgIHJlcXVlc3Qub250aW1lb3V0ID0gZnVuY3Rpb24gaGFuZGxlVGltZW91dCgpIHt9O1xuICAgIH1cblxuICAgIC8vIEhUVFAgYmFzaWMgYXV0aGVudGljYXRpb25cbiAgICBpZiAoY29uZmlnLmF1dGgpIHtcbiAgICAgIHZhciB1c2VybmFtZSA9IGNvbmZpZy5hdXRoLnVzZXJuYW1lIHx8ICcnO1xuICAgICAgdmFyIHBhc3N3b3JkID0gY29uZmlnLmF1dGgucGFzc3dvcmQgfHwgJyc7XG4gICAgICByZXF1ZXN0SGVhZGVycy5BdXRob3JpemF0aW9uID0gJ0Jhc2ljICcgKyBidG9hKHVzZXJuYW1lICsgJzonICsgcGFzc3dvcmQpO1xuICAgIH1cblxuICAgIHJlcXVlc3Qub3Blbihjb25maWcubWV0aG9kLnRvVXBwZXJDYXNlKCksIGJ1aWxkVVJMKGNvbmZpZy51cmwsIGNvbmZpZy5wYXJhbXMsIGNvbmZpZy5wYXJhbXNTZXJpYWxpemVyKSwgdHJ1ZSk7XG5cbiAgICAvLyBTZXQgdGhlIHJlcXVlc3QgdGltZW91dCBpbiBNU1xuICAgIHJlcXVlc3QudGltZW91dCA9IGNvbmZpZy50aW1lb3V0O1xuXG4gICAgLy8gTGlzdGVuIGZvciByZWFkeSBzdGF0ZVxuICAgIHJlcXVlc3RbbG9hZEV2ZW50XSA9IGZ1bmN0aW9uIGhhbmRsZUxvYWQoKSB7XG4gICAgICBpZiAoIXJlcXVlc3QgfHwgKHJlcXVlc3QucmVhZHlTdGF0ZSAhPT0gNCAmJiAheERvbWFpbikpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBUaGUgcmVxdWVzdCBlcnJvcmVkIG91dCBhbmQgd2UgZGlkbid0IGdldCBhIHJlc3BvbnNlLCB0aGlzIHdpbGwgYmVcbiAgICAgIC8vIGhhbmRsZWQgYnkgb25lcnJvciBpbnN0ZWFkXG4gICAgICAvLyBXaXRoIG9uZSBleGNlcHRpb246IHJlcXVlc3QgdGhhdCB1c2luZyBmaWxlOiBwcm90b2NvbCwgbW9zdCBicm93c2Vyc1xuICAgICAgLy8gd2lsbCByZXR1cm4gc3RhdHVzIGFzIDAgZXZlbiB0aG91Z2ggaXQncyBhIHN1Y2Nlc3NmdWwgcmVxdWVzdFxuICAgICAgaWYgKHJlcXVlc3Quc3RhdHVzID09PSAwICYmICEocmVxdWVzdC5yZXNwb25zZVVSTCAmJiByZXF1ZXN0LnJlc3BvbnNlVVJMLmluZGV4T2YoJ2ZpbGU6JykgPT09IDApKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gUHJlcGFyZSB0aGUgcmVzcG9uc2VcbiAgICAgIHZhciByZXNwb25zZUhlYWRlcnMgPSAnZ2V0QWxsUmVzcG9uc2VIZWFkZXJzJyBpbiByZXF1ZXN0ID8gcGFyc2VIZWFkZXJzKHJlcXVlc3QuZ2V0QWxsUmVzcG9uc2VIZWFkZXJzKCkpIDogbnVsbDtcbiAgICAgIHZhciByZXNwb25zZURhdGEgPSAhY29uZmlnLnJlc3BvbnNlVHlwZSB8fCBjb25maWcucmVzcG9uc2VUeXBlID09PSAndGV4dCcgPyByZXF1ZXN0LnJlc3BvbnNlVGV4dCA6IHJlcXVlc3QucmVzcG9uc2U7XG4gICAgICB2YXIgcmVzcG9uc2UgPSB7XG4gICAgICAgIGRhdGE6IHJlc3BvbnNlRGF0YSxcbiAgICAgICAgLy8gSUUgc2VuZHMgMTIyMyBpbnN0ZWFkIG9mIDIwNCAoaHR0cHM6Ly9naXRodWIuY29tL2F4aW9zL2F4aW9zL2lzc3Vlcy8yMDEpXG4gICAgICAgIHN0YXR1czogcmVxdWVzdC5zdGF0dXMgPT09IDEyMjMgPyAyMDQgOiByZXF1ZXN0LnN0YXR1cyxcbiAgICAgICAgc3RhdHVzVGV4dDogcmVxdWVzdC5zdGF0dXMgPT09IDEyMjMgPyAnTm8gQ29udGVudCcgOiByZXF1ZXN0LnN0YXR1c1RleHQsXG4gICAgICAgIGhlYWRlcnM6IHJlc3BvbnNlSGVhZGVycyxcbiAgICAgICAgY29uZmlnOiBjb25maWcsXG4gICAgICAgIHJlcXVlc3Q6IHJlcXVlc3RcbiAgICAgIH07XG5cbiAgICAgIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHJlc3BvbnNlKTtcblxuICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgfTtcblxuICAgIC8vIEhhbmRsZSBsb3cgbGV2ZWwgbmV0d29yayBlcnJvcnNcbiAgICByZXF1ZXN0Lm9uZXJyb3IgPSBmdW5jdGlvbiBoYW5kbGVFcnJvcigpIHtcbiAgICAgIC8vIFJlYWwgZXJyb3JzIGFyZSBoaWRkZW4gZnJvbSB1cyBieSB0aGUgYnJvd3NlclxuICAgICAgLy8gb25lcnJvciBzaG91bGQgb25seSBmaXJlIGlmIGl0J3MgYSBuZXR3b3JrIGVycm9yXG4gICAgICByZWplY3QoY3JlYXRlRXJyb3IoJ05ldHdvcmsgRXJyb3InLCBjb25maWcsIG51bGwsIHJlcXVlc3QpKTtcblxuICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgfTtcblxuICAgIC8vIEhhbmRsZSB0aW1lb3V0XG4gICAgcmVxdWVzdC5vbnRpbWVvdXQgPSBmdW5jdGlvbiBoYW5kbGVUaW1lb3V0KCkge1xuICAgICAgcmVqZWN0KGNyZWF0ZUVycm9yKCd0aW1lb3V0IG9mICcgKyBjb25maWcudGltZW91dCArICdtcyBleGNlZWRlZCcsIGNvbmZpZywgJ0VDT05OQUJPUlRFRCcsXG4gICAgICAgIHJlcXVlc3QpKTtcblxuICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgfTtcblxuICAgIC8vIEFkZCB4c3JmIGhlYWRlclxuICAgIC8vIFRoaXMgaXMgb25seSBkb25lIGlmIHJ1bm5pbmcgaW4gYSBzdGFuZGFyZCBicm93c2VyIGVudmlyb25tZW50LlxuICAgIC8vIFNwZWNpZmljYWxseSBub3QgaWYgd2UncmUgaW4gYSB3ZWIgd29ya2VyLCBvciByZWFjdC1uYXRpdmUuXG4gICAgaWYgKHV0aWxzLmlzU3RhbmRhcmRCcm93c2VyRW52KCkpIHtcbiAgICAgIHZhciBjb29raWVzID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL2Nvb2tpZXMnKTtcblxuICAgICAgLy8gQWRkIHhzcmYgaGVhZGVyXG4gICAgICB2YXIgeHNyZlZhbHVlID0gKGNvbmZpZy53aXRoQ3JlZGVudGlhbHMgfHwgaXNVUkxTYW1lT3JpZ2luKGNvbmZpZy51cmwpKSAmJiBjb25maWcueHNyZkNvb2tpZU5hbWUgP1xuICAgICAgICAgIGNvb2tpZXMucmVhZChjb25maWcueHNyZkNvb2tpZU5hbWUpIDpcbiAgICAgICAgICB1bmRlZmluZWQ7XG5cbiAgICAgIGlmICh4c3JmVmFsdWUpIHtcbiAgICAgICAgcmVxdWVzdEhlYWRlcnNbY29uZmlnLnhzcmZIZWFkZXJOYW1lXSA9IHhzcmZWYWx1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBBZGQgaGVhZGVycyB0byB0aGUgcmVxdWVzdFxuICAgIGlmICgnc2V0UmVxdWVzdEhlYWRlcicgaW4gcmVxdWVzdCkge1xuICAgICAgdXRpbHMuZm9yRWFjaChyZXF1ZXN0SGVhZGVycywgZnVuY3Rpb24gc2V0UmVxdWVzdEhlYWRlcih2YWwsIGtleSkge1xuICAgICAgICBpZiAodHlwZW9mIHJlcXVlc3REYXRhID09PSAndW5kZWZpbmVkJyAmJiBrZXkudG9Mb3dlckNhc2UoKSA9PT0gJ2NvbnRlbnQtdHlwZScpIHtcbiAgICAgICAgICAvLyBSZW1vdmUgQ29udGVudC1UeXBlIGlmIGRhdGEgaXMgdW5kZWZpbmVkXG4gICAgICAgICAgZGVsZXRlIHJlcXVlc3RIZWFkZXJzW2tleV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gT3RoZXJ3aXNlIGFkZCBoZWFkZXIgdG8gdGhlIHJlcXVlc3RcbiAgICAgICAgICByZXF1ZXN0LnNldFJlcXVlc3RIZWFkZXIoa2V5LCB2YWwpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBBZGQgd2l0aENyZWRlbnRpYWxzIHRvIHJlcXVlc3QgaWYgbmVlZGVkXG4gICAgaWYgKGNvbmZpZy53aXRoQ3JlZGVudGlhbHMpIHtcbiAgICAgIHJlcXVlc3Qud2l0aENyZWRlbnRpYWxzID0gdHJ1ZTtcbiAgICB9XG5cbiAgICAvLyBBZGQgcmVzcG9uc2VUeXBlIHRvIHJlcXVlc3QgaWYgbmVlZGVkXG4gICAgaWYgKGNvbmZpZy5yZXNwb25zZVR5cGUpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHJlcXVlc3QucmVzcG9uc2VUeXBlID0gY29uZmlnLnJlc3BvbnNlVHlwZTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gRXhwZWN0ZWQgRE9NRXhjZXB0aW9uIHRocm93biBieSBicm93c2VycyBub3QgY29tcGF0aWJsZSBYTUxIdHRwUmVxdWVzdCBMZXZlbCAyLlxuICAgICAgICAvLyBCdXQsIHRoaXMgY2FuIGJlIHN1cHByZXNzZWQgZm9yICdqc29uJyB0eXBlIGFzIGl0IGNhbiBiZSBwYXJzZWQgYnkgZGVmYXVsdCAndHJhbnNmb3JtUmVzcG9uc2UnIGZ1bmN0aW9uLlxuICAgICAgICBpZiAoY29uZmlnLnJlc3BvbnNlVHlwZSAhPT0gJ2pzb24nKSB7XG4gICAgICAgICAgdGhyb3cgZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEhhbmRsZSBwcm9ncmVzcyBpZiBuZWVkZWRcbiAgICBpZiAodHlwZW9mIGNvbmZpZy5vbkRvd25sb2FkUHJvZ3Jlc3MgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJlcXVlc3QuYWRkRXZlbnRMaXN0ZW5lcigncHJvZ3Jlc3MnLCBjb25maWcub25Eb3dubG9hZFByb2dyZXNzKTtcbiAgICB9XG5cbiAgICAvLyBOb3QgYWxsIGJyb3dzZXJzIHN1cHBvcnQgdXBsb2FkIGV2ZW50c1xuICAgIGlmICh0eXBlb2YgY29uZmlnLm9uVXBsb2FkUHJvZ3Jlc3MgPT09ICdmdW5jdGlvbicgJiYgcmVxdWVzdC51cGxvYWQpIHtcbiAgICAgIHJlcXVlc3QudXBsb2FkLmFkZEV2ZW50TGlzdGVuZXIoJ3Byb2dyZXNzJywgY29uZmlnLm9uVXBsb2FkUHJvZ3Jlc3MpO1xuICAgIH1cblxuICAgIGlmIChjb25maWcuY2FuY2VsVG9rZW4pIHtcbiAgICAgIC8vIEhhbmRsZSBjYW5jZWxsYXRpb25cbiAgICAgIGNvbmZpZy5jYW5jZWxUb2tlbi5wcm9taXNlLnRoZW4oZnVuY3Rpb24gb25DYW5jZWxlZChjYW5jZWwpIHtcbiAgICAgICAgaWYgKCFyZXF1ZXN0KSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVxdWVzdC5hYm9ydCgpO1xuICAgICAgICByZWplY3QoY2FuY2VsKTtcbiAgICAgICAgLy8gQ2xlYW4gdXAgcmVxdWVzdFxuICAgICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChyZXF1ZXN0RGF0YSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXF1ZXN0RGF0YSA9IG51bGw7XG4gICAgfVxuXG4gICAgLy8gU2VuZCB0aGUgcmVxdWVzdFxuICAgIHJlcXVlc3Quc2VuZChyZXF1ZXN0RGF0YSk7XG4gIH0pO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xudmFyIGJpbmQgPSByZXF1aXJlKCcuL2hlbHBlcnMvYmluZCcpO1xudmFyIEF4aW9zID0gcmVxdWlyZSgnLi9jb3JlL0F4aW9zJyk7XG52YXIgZGVmYXVsdHMgPSByZXF1aXJlKCcuL2RlZmF1bHRzJyk7XG5cbi8qKlxuICogQ3JlYXRlIGFuIGluc3RhbmNlIG9mIEF4aW9zXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGRlZmF1bHRDb25maWcgVGhlIGRlZmF1bHQgY29uZmlnIGZvciB0aGUgaW5zdGFuY2VcbiAqIEByZXR1cm4ge0F4aW9zfSBBIG5ldyBpbnN0YW5jZSBvZiBBeGlvc1xuICovXG5mdW5jdGlvbiBjcmVhdGVJbnN0YW5jZShkZWZhdWx0Q29uZmlnKSB7XG4gIHZhciBjb250ZXh0ID0gbmV3IEF4aW9zKGRlZmF1bHRDb25maWcpO1xuICB2YXIgaW5zdGFuY2UgPSBiaW5kKEF4aW9zLnByb3RvdHlwZS5yZXF1ZXN0LCBjb250ZXh0KTtcblxuICAvLyBDb3B5IGF4aW9zLnByb3RvdHlwZSB0byBpbnN0YW5jZVxuICB1dGlscy5leHRlbmQoaW5zdGFuY2UsIEF4aW9zLnByb3RvdHlwZSwgY29udGV4dCk7XG5cbiAgLy8gQ29weSBjb250ZXh0IHRvIGluc3RhbmNlXG4gIHV0aWxzLmV4dGVuZChpbnN0YW5jZSwgY29udGV4dCk7XG5cbiAgcmV0dXJuIGluc3RhbmNlO1xufVxuXG4vLyBDcmVhdGUgdGhlIGRlZmF1bHQgaW5zdGFuY2UgdG8gYmUgZXhwb3J0ZWRcbnZhciBheGlvcyA9IGNyZWF0ZUluc3RhbmNlKGRlZmF1bHRzKTtcblxuLy8gRXhwb3NlIEF4aW9zIGNsYXNzIHRvIGFsbG93IGNsYXNzIGluaGVyaXRhbmNlXG5heGlvcy5BeGlvcyA9IEF4aW9zO1xuXG4vLyBGYWN0b3J5IGZvciBjcmVhdGluZyBuZXcgaW5zdGFuY2VzXG5heGlvcy5jcmVhdGUgPSBmdW5jdGlvbiBjcmVhdGUoaW5zdGFuY2VDb25maWcpIHtcbiAgcmV0dXJuIGNyZWF0ZUluc3RhbmNlKHV0aWxzLm1lcmdlKGRlZmF1bHRzLCBpbnN0YW5jZUNvbmZpZykpO1xufTtcblxuLy8gRXhwb3NlIENhbmNlbCAmIENhbmNlbFRva2VuXG5heGlvcy5DYW5jZWwgPSByZXF1aXJlKCcuL2NhbmNlbC9DYW5jZWwnKTtcbmF4aW9zLkNhbmNlbFRva2VuID0gcmVxdWlyZSgnLi9jYW5jZWwvQ2FuY2VsVG9rZW4nKTtcbmF4aW9zLmlzQ2FuY2VsID0gcmVxdWlyZSgnLi9jYW5jZWwvaXNDYW5jZWwnKTtcblxuLy8gRXhwb3NlIGFsbC9zcHJlYWRcbmF4aW9zLmFsbCA9IGZ1bmN0aW9uIGFsbChwcm9taXNlcykge1xuICByZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xufTtcbmF4aW9zLnNwcmVhZCA9IHJlcXVpcmUoJy4vaGVscGVycy9zcHJlYWQnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBheGlvcztcblxuLy8gQWxsb3cgdXNlIG9mIGRlZmF1bHQgaW1wb3J0IHN5bnRheCBpbiBUeXBlU2NyaXB0XG5tb2R1bGUuZXhwb3J0cy5kZWZhdWx0ID0gYXhpb3M7XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogQSBgQ2FuY2VsYCBpcyBhbiBvYmplY3QgdGhhdCBpcyB0aHJvd24gd2hlbiBhbiBvcGVyYXRpb24gaXMgY2FuY2VsZWQuXG4gKlxuICogQGNsYXNzXG4gKiBAcGFyYW0ge3N0cmluZz19IG1lc3NhZ2UgVGhlIG1lc3NhZ2UuXG4gKi9cbmZ1bmN0aW9uIENhbmNlbChtZXNzYWdlKSB7XG4gIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2U7XG59XG5cbkNhbmNlbC5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgcmV0dXJuICdDYW5jZWwnICsgKHRoaXMubWVzc2FnZSA/ICc6ICcgKyB0aGlzLm1lc3NhZ2UgOiAnJyk7XG59O1xuXG5DYW5jZWwucHJvdG90eXBlLl9fQ0FOQ0VMX18gPSB0cnVlO1xuXG5tb2R1bGUuZXhwb3J0cyA9IENhbmNlbDtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIENhbmNlbCA9IHJlcXVpcmUoJy4vQ2FuY2VsJyk7XG5cbi8qKlxuICogQSBgQ2FuY2VsVG9rZW5gIGlzIGFuIG9iamVjdCB0aGF0IGNhbiBiZSB1c2VkIHRvIHJlcXVlc3QgY2FuY2VsbGF0aW9uIG9mIGFuIG9wZXJhdGlvbi5cbiAqXG4gKiBAY2xhc3NcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGV4ZWN1dG9yIFRoZSBleGVjdXRvciBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gQ2FuY2VsVG9rZW4oZXhlY3V0b3IpIHtcbiAgaWYgKHR5cGVvZiBleGVjdXRvciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2V4ZWN1dG9yIG11c3QgYmUgYSBmdW5jdGlvbi4nKTtcbiAgfVxuXG4gIHZhciByZXNvbHZlUHJvbWlzZTtcbiAgdGhpcy5wcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24gcHJvbWlzZUV4ZWN1dG9yKHJlc29sdmUpIHtcbiAgICByZXNvbHZlUHJvbWlzZSA9IHJlc29sdmU7XG4gIH0pO1xuXG4gIHZhciB0b2tlbiA9IHRoaXM7XG4gIGV4ZWN1dG9yKGZ1bmN0aW9uIGNhbmNlbChtZXNzYWdlKSB7XG4gICAgaWYgKHRva2VuLnJlYXNvbikge1xuICAgICAgLy8gQ2FuY2VsbGF0aW9uIGhhcyBhbHJlYWR5IGJlZW4gcmVxdWVzdGVkXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdG9rZW4ucmVhc29uID0gbmV3IENhbmNlbChtZXNzYWdlKTtcbiAgICByZXNvbHZlUHJvbWlzZSh0b2tlbi5yZWFzb24pO1xuICB9KTtcbn1cblxuLyoqXG4gKiBUaHJvd3MgYSBgQ2FuY2VsYCBpZiBjYW5jZWxsYXRpb24gaGFzIGJlZW4gcmVxdWVzdGVkLlxuICovXG5DYW5jZWxUb2tlbi5wcm90b3R5cGUudGhyb3dJZlJlcXVlc3RlZCA9IGZ1bmN0aW9uIHRocm93SWZSZXF1ZXN0ZWQoKSB7XG4gIGlmICh0aGlzLnJlYXNvbikge1xuICAgIHRocm93IHRoaXMucmVhc29uO1xuICB9XG59O1xuXG4vKipcbiAqIFJldHVybnMgYW4gb2JqZWN0IHRoYXQgY29udGFpbnMgYSBuZXcgYENhbmNlbFRva2VuYCBhbmQgYSBmdW5jdGlvbiB0aGF0LCB3aGVuIGNhbGxlZCxcbiAqIGNhbmNlbHMgdGhlIGBDYW5jZWxUb2tlbmAuXG4gKi9cbkNhbmNlbFRva2VuLnNvdXJjZSA9IGZ1bmN0aW9uIHNvdXJjZSgpIHtcbiAgdmFyIGNhbmNlbDtcbiAgdmFyIHRva2VuID0gbmV3IENhbmNlbFRva2VuKGZ1bmN0aW9uIGV4ZWN1dG9yKGMpIHtcbiAgICBjYW5jZWwgPSBjO1xuICB9KTtcbiAgcmV0dXJuIHtcbiAgICB0b2tlbjogdG9rZW4sXG4gICAgY2FuY2VsOiBjYW5jZWxcbiAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gQ2FuY2VsVG9rZW47XG4iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaXNDYW5jZWwodmFsdWUpIHtcbiAgcmV0dXJuICEhKHZhbHVlICYmIHZhbHVlLl9fQ0FOQ0VMX18pO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGRlZmF1bHRzID0gcmVxdWlyZSgnLi8uLi9kZWZhdWx0cycpO1xudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xudmFyIEludGVyY2VwdG9yTWFuYWdlciA9IHJlcXVpcmUoJy4vSW50ZXJjZXB0b3JNYW5hZ2VyJyk7XG52YXIgZGlzcGF0Y2hSZXF1ZXN0ID0gcmVxdWlyZSgnLi9kaXNwYXRjaFJlcXVlc3QnKTtcblxuLyoqXG4gKiBDcmVhdGUgYSBuZXcgaW5zdGFuY2Ugb2YgQXhpb3NcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gaW5zdGFuY2VDb25maWcgVGhlIGRlZmF1bHQgY29uZmlnIGZvciB0aGUgaW5zdGFuY2VcbiAqL1xuZnVuY3Rpb24gQXhpb3MoaW5zdGFuY2VDb25maWcpIHtcbiAgdGhpcy5kZWZhdWx0cyA9IGluc3RhbmNlQ29uZmlnO1xuICB0aGlzLmludGVyY2VwdG9ycyA9IHtcbiAgICByZXF1ZXN0OiBuZXcgSW50ZXJjZXB0b3JNYW5hZ2VyKCksXG4gICAgcmVzcG9uc2U6IG5ldyBJbnRlcmNlcHRvck1hbmFnZXIoKVxuICB9O1xufVxuXG4vKipcbiAqIERpc3BhdGNoIGEgcmVxdWVzdFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgVGhlIGNvbmZpZyBzcGVjaWZpYyBmb3IgdGhpcyByZXF1ZXN0IChtZXJnZWQgd2l0aCB0aGlzLmRlZmF1bHRzKVxuICovXG5BeGlvcy5wcm90b3R5cGUucmVxdWVzdCA9IGZ1bmN0aW9uIHJlcXVlc3QoY29uZmlnKSB7XG4gIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICAvLyBBbGxvdyBmb3IgYXhpb3MoJ2V4YW1wbGUvdXJsJ1ssIGNvbmZpZ10pIGEgbGEgZmV0Y2ggQVBJXG4gIGlmICh0eXBlb2YgY29uZmlnID09PSAnc3RyaW5nJykge1xuICAgIGNvbmZpZyA9IHV0aWxzLm1lcmdlKHtcbiAgICAgIHVybDogYXJndW1lbnRzWzBdXG4gICAgfSwgYXJndW1lbnRzWzFdKTtcbiAgfVxuXG4gIGNvbmZpZyA9IHV0aWxzLm1lcmdlKGRlZmF1bHRzLCB7bWV0aG9kOiAnZ2V0J30sIHRoaXMuZGVmYXVsdHMsIGNvbmZpZyk7XG4gIGNvbmZpZy5tZXRob2QgPSBjb25maWcubWV0aG9kLnRvTG93ZXJDYXNlKCk7XG5cbiAgLy8gSG9vayB1cCBpbnRlcmNlcHRvcnMgbWlkZGxld2FyZVxuICB2YXIgY2hhaW4gPSBbZGlzcGF0Y2hSZXF1ZXN0LCB1bmRlZmluZWRdO1xuICB2YXIgcHJvbWlzZSA9IFByb21pc2UucmVzb2x2ZShjb25maWcpO1xuXG4gIHRoaXMuaW50ZXJjZXB0b3JzLnJlcXVlc3QuZm9yRWFjaChmdW5jdGlvbiB1bnNoaWZ0UmVxdWVzdEludGVyY2VwdG9ycyhpbnRlcmNlcHRvcikge1xuICAgIGNoYWluLnVuc2hpZnQoaW50ZXJjZXB0b3IuZnVsZmlsbGVkLCBpbnRlcmNlcHRvci5yZWplY3RlZCk7XG4gIH0pO1xuXG4gIHRoaXMuaW50ZXJjZXB0b3JzLnJlc3BvbnNlLmZvckVhY2goZnVuY3Rpb24gcHVzaFJlc3BvbnNlSW50ZXJjZXB0b3JzKGludGVyY2VwdG9yKSB7XG4gICAgY2hhaW4ucHVzaChpbnRlcmNlcHRvci5mdWxmaWxsZWQsIGludGVyY2VwdG9yLnJlamVjdGVkKTtcbiAgfSk7XG5cbiAgd2hpbGUgKGNoYWluLmxlbmd0aCkge1xuICAgIHByb21pc2UgPSBwcm9taXNlLnRoZW4oY2hhaW4uc2hpZnQoKSwgY2hhaW4uc2hpZnQoKSk7XG4gIH1cblxuICByZXR1cm4gcHJvbWlzZTtcbn07XG5cbi8vIFByb3ZpZGUgYWxpYXNlcyBmb3Igc3VwcG9ydGVkIHJlcXVlc3QgbWV0aG9kc1xudXRpbHMuZm9yRWFjaChbJ2RlbGV0ZScsICdnZXQnLCAnaGVhZCcsICdvcHRpb25zJ10sIGZ1bmN0aW9uIGZvckVhY2hNZXRob2ROb0RhdGEobWV0aG9kKSB7XG4gIC8qZXNsaW50IGZ1bmMtbmFtZXM6MCovXG4gIEF4aW9zLnByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24odXJsLCBjb25maWcpIHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KHV0aWxzLm1lcmdlKGNvbmZpZyB8fCB7fSwge1xuICAgICAgbWV0aG9kOiBtZXRob2QsXG4gICAgICB1cmw6IHVybFxuICAgIH0pKTtcbiAgfTtcbn0pO1xuXG51dGlscy5mb3JFYWNoKFsncG9zdCcsICdwdXQnLCAncGF0Y2gnXSwgZnVuY3Rpb24gZm9yRWFjaE1ldGhvZFdpdGhEYXRhKG1ldGhvZCkge1xuICAvKmVzbGludCBmdW5jLW5hbWVzOjAqL1xuICBBeGlvcy5wcm90b3R5cGVbbWV0aG9kXSA9IGZ1bmN0aW9uKHVybCwgZGF0YSwgY29uZmlnKSB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdCh1dGlscy5tZXJnZShjb25maWcgfHwge30sIHtcbiAgICAgIG1ldGhvZDogbWV0aG9kLFxuICAgICAgdXJsOiB1cmwsXG4gICAgICBkYXRhOiBkYXRhXG4gICAgfSkpO1xuICB9O1xufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gQXhpb3M7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxuZnVuY3Rpb24gSW50ZXJjZXB0b3JNYW5hZ2VyKCkge1xuICB0aGlzLmhhbmRsZXJzID0gW107XG59XG5cbi8qKlxuICogQWRkIGEgbmV3IGludGVyY2VwdG9yIHRvIHRoZSBzdGFja1xuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bGZpbGxlZCBUaGUgZnVuY3Rpb24gdG8gaGFuZGxlIGB0aGVuYCBmb3IgYSBgUHJvbWlzZWBcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHJlamVjdGVkIFRoZSBmdW5jdGlvbiB0byBoYW5kbGUgYHJlamVjdGAgZm9yIGEgYFByb21pc2VgXG4gKlxuICogQHJldHVybiB7TnVtYmVyfSBBbiBJRCB1c2VkIHRvIHJlbW92ZSBpbnRlcmNlcHRvciBsYXRlclxuICovXG5JbnRlcmNlcHRvck1hbmFnZXIucHJvdG90eXBlLnVzZSA9IGZ1bmN0aW9uIHVzZShmdWxmaWxsZWQsIHJlamVjdGVkKSB7XG4gIHRoaXMuaGFuZGxlcnMucHVzaCh7XG4gICAgZnVsZmlsbGVkOiBmdWxmaWxsZWQsXG4gICAgcmVqZWN0ZWQ6IHJlamVjdGVkXG4gIH0pO1xuICByZXR1cm4gdGhpcy5oYW5kbGVycy5sZW5ndGggLSAxO1xufTtcblxuLyoqXG4gKiBSZW1vdmUgYW4gaW50ZXJjZXB0b3IgZnJvbSB0aGUgc3RhY2tcbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gaWQgVGhlIElEIHRoYXQgd2FzIHJldHVybmVkIGJ5IGB1c2VgXG4gKi9cbkludGVyY2VwdG9yTWFuYWdlci5wcm90b3R5cGUuZWplY3QgPSBmdW5jdGlvbiBlamVjdChpZCkge1xuICBpZiAodGhpcy5oYW5kbGVyc1tpZF0pIHtcbiAgICB0aGlzLmhhbmRsZXJzW2lkXSA9IG51bGw7XG4gIH1cbn07XG5cbi8qKlxuICogSXRlcmF0ZSBvdmVyIGFsbCB0aGUgcmVnaXN0ZXJlZCBpbnRlcmNlcHRvcnNcbiAqXG4gKiBUaGlzIG1ldGhvZCBpcyBwYXJ0aWN1bGFybHkgdXNlZnVsIGZvciBza2lwcGluZyBvdmVyIGFueVxuICogaW50ZXJjZXB0b3JzIHRoYXQgbWF5IGhhdmUgYmVjb21lIGBudWxsYCBjYWxsaW5nIGBlamVjdGAuXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIGNhbGwgZm9yIGVhY2ggaW50ZXJjZXB0b3JcbiAqL1xuSW50ZXJjZXB0b3JNYW5hZ2VyLnByb3RvdHlwZS5mb3JFYWNoID0gZnVuY3Rpb24gZm9yRWFjaChmbikge1xuICB1dGlscy5mb3JFYWNoKHRoaXMuaGFuZGxlcnMsIGZ1bmN0aW9uIGZvckVhY2hIYW5kbGVyKGgpIHtcbiAgICBpZiAoaCAhPT0gbnVsbCkge1xuICAgICAgZm4oaCk7XG4gICAgfVxuICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gSW50ZXJjZXB0b3JNYW5hZ2VyO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZW5oYW5jZUVycm9yID0gcmVxdWlyZSgnLi9lbmhhbmNlRXJyb3InKTtcblxuLyoqXG4gKiBDcmVhdGUgYW4gRXJyb3Igd2l0aCB0aGUgc3BlY2lmaWVkIG1lc3NhZ2UsIGNvbmZpZywgZXJyb3IgY29kZSwgcmVxdWVzdCBhbmQgcmVzcG9uc2UuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2UgVGhlIGVycm9yIG1lc3NhZ2UuXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIFRoZSBjb25maWcuXG4gKiBAcGFyYW0ge3N0cmluZ30gW2NvZGVdIFRoZSBlcnJvciBjb2RlIChmb3IgZXhhbXBsZSwgJ0VDT05OQUJPUlRFRCcpLlxuICogQHBhcmFtIHtPYmplY3R9IFtyZXF1ZXN0XSBUaGUgcmVxdWVzdC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcmVzcG9uc2VdIFRoZSByZXNwb25zZS5cbiAqIEByZXR1cm5zIHtFcnJvcn0gVGhlIGNyZWF0ZWQgZXJyb3IuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY3JlYXRlRXJyb3IobWVzc2FnZSwgY29uZmlnLCBjb2RlLCByZXF1ZXN0LCByZXNwb25zZSkge1xuICB2YXIgZXJyb3IgPSBuZXcgRXJyb3IobWVzc2FnZSk7XG4gIHJldHVybiBlbmhhbmNlRXJyb3IoZXJyb3IsIGNvbmZpZywgY29kZSwgcmVxdWVzdCwgcmVzcG9uc2UpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xudmFyIHRyYW5zZm9ybURhdGEgPSByZXF1aXJlKCcuL3RyYW5zZm9ybURhdGEnKTtcbnZhciBpc0NhbmNlbCA9IHJlcXVpcmUoJy4uL2NhbmNlbC9pc0NhbmNlbCcpO1xudmFyIGRlZmF1bHRzID0gcmVxdWlyZSgnLi4vZGVmYXVsdHMnKTtcbnZhciBpc0Fic29sdXRlVVJMID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL2lzQWJzb2x1dGVVUkwnKTtcbnZhciBjb21iaW5lVVJMcyA9IHJlcXVpcmUoJy4vLi4vaGVscGVycy9jb21iaW5lVVJMcycpO1xuXG4vKipcbiAqIFRocm93cyBhIGBDYW5jZWxgIGlmIGNhbmNlbGxhdGlvbiBoYXMgYmVlbiByZXF1ZXN0ZWQuXG4gKi9cbmZ1bmN0aW9uIHRocm93SWZDYW5jZWxsYXRpb25SZXF1ZXN0ZWQoY29uZmlnKSB7XG4gIGlmIChjb25maWcuY2FuY2VsVG9rZW4pIHtcbiAgICBjb25maWcuY2FuY2VsVG9rZW4udGhyb3dJZlJlcXVlc3RlZCgpO1xuICB9XG59XG5cbi8qKlxuICogRGlzcGF0Y2ggYSByZXF1ZXN0IHRvIHRoZSBzZXJ2ZXIgdXNpbmcgdGhlIGNvbmZpZ3VyZWQgYWRhcHRlci5cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gY29uZmlnIFRoZSBjb25maWcgdGhhdCBpcyB0byBiZSB1c2VkIGZvciB0aGUgcmVxdWVzdFxuICogQHJldHVybnMge1Byb21pc2V9IFRoZSBQcm9taXNlIHRvIGJlIGZ1bGZpbGxlZFxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGRpc3BhdGNoUmVxdWVzdChjb25maWcpIHtcbiAgdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpO1xuXG4gIC8vIFN1cHBvcnQgYmFzZVVSTCBjb25maWdcbiAgaWYgKGNvbmZpZy5iYXNlVVJMICYmICFpc0Fic29sdXRlVVJMKGNvbmZpZy51cmwpKSB7XG4gICAgY29uZmlnLnVybCA9IGNvbWJpbmVVUkxzKGNvbmZpZy5iYXNlVVJMLCBjb25maWcudXJsKTtcbiAgfVxuXG4gIC8vIEVuc3VyZSBoZWFkZXJzIGV4aXN0XG4gIGNvbmZpZy5oZWFkZXJzID0gY29uZmlnLmhlYWRlcnMgfHwge307XG5cbiAgLy8gVHJhbnNmb3JtIHJlcXVlc3QgZGF0YVxuICBjb25maWcuZGF0YSA9IHRyYW5zZm9ybURhdGEoXG4gICAgY29uZmlnLmRhdGEsXG4gICAgY29uZmlnLmhlYWRlcnMsXG4gICAgY29uZmlnLnRyYW5zZm9ybVJlcXVlc3RcbiAgKTtcblxuICAvLyBGbGF0dGVuIGhlYWRlcnNcbiAgY29uZmlnLmhlYWRlcnMgPSB1dGlscy5tZXJnZShcbiAgICBjb25maWcuaGVhZGVycy5jb21tb24gfHwge30sXG4gICAgY29uZmlnLmhlYWRlcnNbY29uZmlnLm1ldGhvZF0gfHwge30sXG4gICAgY29uZmlnLmhlYWRlcnMgfHwge31cbiAgKTtcblxuICB1dGlscy5mb3JFYWNoKFxuICAgIFsnZGVsZXRlJywgJ2dldCcsICdoZWFkJywgJ3Bvc3QnLCAncHV0JywgJ3BhdGNoJywgJ2NvbW1vbiddLFxuICAgIGZ1bmN0aW9uIGNsZWFuSGVhZGVyQ29uZmlnKG1ldGhvZCkge1xuICAgICAgZGVsZXRlIGNvbmZpZy5oZWFkZXJzW21ldGhvZF07XG4gICAgfVxuICApO1xuXG4gIHZhciBhZGFwdGVyID0gY29uZmlnLmFkYXB0ZXIgfHwgZGVmYXVsdHMuYWRhcHRlcjtcblxuICByZXR1cm4gYWRhcHRlcihjb25maWcpLnRoZW4oZnVuY3Rpb24gb25BZGFwdGVyUmVzb2x1dGlvbihyZXNwb25zZSkge1xuICAgIHRocm93SWZDYW5jZWxsYXRpb25SZXF1ZXN0ZWQoY29uZmlnKTtcblxuICAgIC8vIFRyYW5zZm9ybSByZXNwb25zZSBkYXRhXG4gICAgcmVzcG9uc2UuZGF0YSA9IHRyYW5zZm9ybURhdGEoXG4gICAgICByZXNwb25zZS5kYXRhLFxuICAgICAgcmVzcG9uc2UuaGVhZGVycyxcbiAgICAgIGNvbmZpZy50cmFuc2Zvcm1SZXNwb25zZVxuICAgICk7XG5cbiAgICByZXR1cm4gcmVzcG9uc2U7XG4gIH0sIGZ1bmN0aW9uIG9uQWRhcHRlclJlamVjdGlvbihyZWFzb24pIHtcbiAgICBpZiAoIWlzQ2FuY2VsKHJlYXNvbikpIHtcbiAgICAgIHRocm93SWZDYW5jZWxsYXRpb25SZXF1ZXN0ZWQoY29uZmlnKTtcblxuICAgICAgLy8gVHJhbnNmb3JtIHJlc3BvbnNlIGRhdGFcbiAgICAgIGlmIChyZWFzb24gJiYgcmVhc29uLnJlc3BvbnNlKSB7XG4gICAgICAgIHJlYXNvbi5yZXNwb25zZS5kYXRhID0gdHJhbnNmb3JtRGF0YShcbiAgICAgICAgICByZWFzb24ucmVzcG9uc2UuZGF0YSxcbiAgICAgICAgICByZWFzb24ucmVzcG9uc2UuaGVhZGVycyxcbiAgICAgICAgICBjb25maWcudHJhbnNmb3JtUmVzcG9uc2VcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QocmVhc29uKTtcbiAgfSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIFVwZGF0ZSBhbiBFcnJvciB3aXRoIHRoZSBzcGVjaWZpZWQgY29uZmlnLCBlcnJvciBjb2RlLCBhbmQgcmVzcG9uc2UuXG4gKlxuICogQHBhcmFtIHtFcnJvcn0gZXJyb3IgVGhlIGVycm9yIHRvIHVwZGF0ZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgVGhlIGNvbmZpZy5cbiAqIEBwYXJhbSB7c3RyaW5nfSBbY29kZV0gVGhlIGVycm9yIGNvZGUgKGZvciBleGFtcGxlLCAnRUNPTk5BQk9SVEVEJykuXG4gKiBAcGFyYW0ge09iamVjdH0gW3JlcXVlc3RdIFRoZSByZXF1ZXN0LlxuICogQHBhcmFtIHtPYmplY3R9IFtyZXNwb25zZV0gVGhlIHJlc3BvbnNlLlxuICogQHJldHVybnMge0Vycm9yfSBUaGUgZXJyb3IuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZW5oYW5jZUVycm9yKGVycm9yLCBjb25maWcsIGNvZGUsIHJlcXVlc3QsIHJlc3BvbnNlKSB7XG4gIGVycm9yLmNvbmZpZyA9IGNvbmZpZztcbiAgaWYgKGNvZGUpIHtcbiAgICBlcnJvci5jb2RlID0gY29kZTtcbiAgfVxuICBlcnJvci5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgZXJyb3IucmVzcG9uc2UgPSByZXNwb25zZTtcbiAgcmV0dXJuIGVycm9yO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGNyZWF0ZUVycm9yID0gcmVxdWlyZSgnLi9jcmVhdGVFcnJvcicpO1xuXG4vKipcbiAqIFJlc29sdmUgb3IgcmVqZWN0IGEgUHJvbWlzZSBiYXNlZCBvbiByZXNwb25zZSBzdGF0dXMuXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gcmVzb2x2ZSBBIGZ1bmN0aW9uIHRoYXQgcmVzb2x2ZXMgdGhlIHByb21pc2UuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSByZWplY3QgQSBmdW5jdGlvbiB0aGF0IHJlamVjdHMgdGhlIHByb21pc2UuXG4gKiBAcGFyYW0ge29iamVjdH0gcmVzcG9uc2UgVGhlIHJlc3BvbnNlLlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHNldHRsZShyZXNvbHZlLCByZWplY3QsIHJlc3BvbnNlKSB7XG4gIHZhciB2YWxpZGF0ZVN0YXR1cyA9IHJlc3BvbnNlLmNvbmZpZy52YWxpZGF0ZVN0YXR1cztcbiAgLy8gTm90ZTogc3RhdHVzIGlzIG5vdCBleHBvc2VkIGJ5IFhEb21haW5SZXF1ZXN0XG4gIGlmICghcmVzcG9uc2Uuc3RhdHVzIHx8ICF2YWxpZGF0ZVN0YXR1cyB8fCB2YWxpZGF0ZVN0YXR1cyhyZXNwb25zZS5zdGF0dXMpKSB7XG4gICAgcmVzb2x2ZShyZXNwb25zZSk7XG4gIH0gZWxzZSB7XG4gICAgcmVqZWN0KGNyZWF0ZUVycm9yKFxuICAgICAgJ1JlcXVlc3QgZmFpbGVkIHdpdGggc3RhdHVzIGNvZGUgJyArIHJlc3BvbnNlLnN0YXR1cyxcbiAgICAgIHJlc3BvbnNlLmNvbmZpZyxcbiAgICAgIG51bGwsXG4gICAgICByZXNwb25zZS5yZXF1ZXN0LFxuICAgICAgcmVzcG9uc2VcbiAgICApKTtcbiAgfVxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG4vKipcbiAqIFRyYW5zZm9ybSB0aGUgZGF0YSBmb3IgYSByZXF1ZXN0IG9yIGEgcmVzcG9uc2VcbiAqXG4gKiBAcGFyYW0ge09iamVjdHxTdHJpbmd9IGRhdGEgVGhlIGRhdGEgdG8gYmUgdHJhbnNmb3JtZWRcbiAqIEBwYXJhbSB7QXJyYXl9IGhlYWRlcnMgVGhlIGhlYWRlcnMgZm9yIHRoZSByZXF1ZXN0IG9yIHJlc3BvbnNlXG4gKiBAcGFyYW0ge0FycmF5fEZ1bmN0aW9ufSBmbnMgQSBzaW5nbGUgZnVuY3Rpb24gb3IgQXJyYXkgb2YgZnVuY3Rpb25zXG4gKiBAcmV0dXJucyB7Kn0gVGhlIHJlc3VsdGluZyB0cmFuc2Zvcm1lZCBkYXRhXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gdHJhbnNmb3JtRGF0YShkYXRhLCBoZWFkZXJzLCBmbnMpIHtcbiAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gIHV0aWxzLmZvckVhY2goZm5zLCBmdW5jdGlvbiB0cmFuc2Zvcm0oZm4pIHtcbiAgICBkYXRhID0gZm4oZGF0YSwgaGVhZGVycyk7XG4gIH0pO1xuXG4gIHJldHVybiBkYXRhO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xudmFyIG5vcm1hbGl6ZUhlYWRlck5hbWUgPSByZXF1aXJlKCcuL2hlbHBlcnMvbm9ybWFsaXplSGVhZGVyTmFtZScpO1xuXG52YXIgREVGQVVMVF9DT05URU5UX1RZUEUgPSB7XG4gICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJ1xufTtcblxuZnVuY3Rpb24gc2V0Q29udGVudFR5cGVJZlVuc2V0KGhlYWRlcnMsIHZhbHVlKSB7XG4gIGlmICghdXRpbHMuaXNVbmRlZmluZWQoaGVhZGVycykgJiYgdXRpbHMuaXNVbmRlZmluZWQoaGVhZGVyc1snQ29udGVudC1UeXBlJ10pKSB7XG4gICAgaGVhZGVyc1snQ29udGVudC1UeXBlJ10gPSB2YWx1ZTtcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXREZWZhdWx0QWRhcHRlcigpIHtcbiAgdmFyIGFkYXB0ZXI7XG4gIGlmICh0eXBlb2YgWE1MSHR0cFJlcXVlc3QgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgLy8gRm9yIGJyb3dzZXJzIHVzZSBYSFIgYWRhcHRlclxuICAgIGFkYXB0ZXIgPSByZXF1aXJlKCcuL2FkYXB0ZXJzL3hocicpO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBwcm9jZXNzICE9PSAndW5kZWZpbmVkJykge1xuICAgIC8vIEZvciBub2RlIHVzZSBIVFRQIGFkYXB0ZXJcbiAgICBhZGFwdGVyID0gcmVxdWlyZSgnLi9hZGFwdGVycy9odHRwJyk7XG4gIH1cbiAgcmV0dXJuIGFkYXB0ZXI7XG59XG5cbnZhciBkZWZhdWx0cyA9IHtcbiAgYWRhcHRlcjogZ2V0RGVmYXVsdEFkYXB0ZXIoKSxcblxuICB0cmFuc2Zvcm1SZXF1ZXN0OiBbZnVuY3Rpb24gdHJhbnNmb3JtUmVxdWVzdChkYXRhLCBoZWFkZXJzKSB7XG4gICAgbm9ybWFsaXplSGVhZGVyTmFtZShoZWFkZXJzLCAnQ29udGVudC1UeXBlJyk7XG4gICAgaWYgKHV0aWxzLmlzRm9ybURhdGEoZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzQXJyYXlCdWZmZXIoZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzQnVmZmVyKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc1N0cmVhbShkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNGaWxlKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc0Jsb2IoZGF0YSlcbiAgICApIHtcbiAgICAgIHJldHVybiBkYXRhO1xuICAgIH1cbiAgICBpZiAodXRpbHMuaXNBcnJheUJ1ZmZlclZpZXcoZGF0YSkpIHtcbiAgICAgIHJldHVybiBkYXRhLmJ1ZmZlcjtcbiAgICB9XG4gICAgaWYgKHV0aWxzLmlzVVJMU2VhcmNoUGFyYW1zKGRhdGEpKSB7XG4gICAgICBzZXRDb250ZW50VHlwZUlmVW5zZXQoaGVhZGVycywgJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZDtjaGFyc2V0PXV0Zi04Jyk7XG4gICAgICByZXR1cm4gZGF0YS50b1N0cmluZygpO1xuICAgIH1cbiAgICBpZiAodXRpbHMuaXNPYmplY3QoZGF0YSkpIHtcbiAgICAgIHNldENvbnRlbnRUeXBlSWZVbnNldChoZWFkZXJzLCAnYXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04Jyk7XG4gICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoZGF0YSk7XG4gICAgfVxuICAgIHJldHVybiBkYXRhO1xuICB9XSxcblxuICB0cmFuc2Zvcm1SZXNwb25zZTogW2Z1bmN0aW9uIHRyYW5zZm9ybVJlc3BvbnNlKGRhdGEpIHtcbiAgICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgICBpZiAodHlwZW9mIGRhdGEgPT09ICdzdHJpbmcnKSB7XG4gICAgICB0cnkge1xuICAgICAgICBkYXRhID0gSlNPTi5wYXJzZShkYXRhKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHsgLyogSWdub3JlICovIH1cbiAgICB9XG4gICAgcmV0dXJuIGRhdGE7XG4gIH1dLFxuXG4gIC8qKlxuICAgKiBBIHRpbWVvdXQgaW4gbWlsbGlzZWNvbmRzIHRvIGFib3J0IGEgcmVxdWVzdC4gSWYgc2V0IHRvIDAgKGRlZmF1bHQpIGFcbiAgICogdGltZW91dCBpcyBub3QgY3JlYXRlZC5cbiAgICovXG4gIHRpbWVvdXQ6IDAsXG5cbiAgeHNyZkNvb2tpZU5hbWU6ICdYU1JGLVRPS0VOJyxcbiAgeHNyZkhlYWRlck5hbWU6ICdYLVhTUkYtVE9LRU4nLFxuXG4gIG1heENvbnRlbnRMZW5ndGg6IC0xLFxuXG4gIHZhbGlkYXRlU3RhdHVzOiBmdW5jdGlvbiB2YWxpZGF0ZVN0YXR1cyhzdGF0dXMpIHtcbiAgICByZXR1cm4gc3RhdHVzID49IDIwMCAmJiBzdGF0dXMgPCAzMDA7XG4gIH1cbn07XG5cbmRlZmF1bHRzLmhlYWRlcnMgPSB7XG4gIGNvbW1vbjoge1xuICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbiwgdGV4dC9wbGFpbiwgKi8qJ1xuICB9XG59O1xuXG51dGlscy5mb3JFYWNoKFsnZGVsZXRlJywgJ2dldCcsICdoZWFkJ10sIGZ1bmN0aW9uIGZvckVhY2hNZXRob2ROb0RhdGEobWV0aG9kKSB7XG4gIGRlZmF1bHRzLmhlYWRlcnNbbWV0aG9kXSA9IHt9O1xufSk7XG5cbnV0aWxzLmZvckVhY2goWydwb3N0JywgJ3B1dCcsICdwYXRjaCddLCBmdW5jdGlvbiBmb3JFYWNoTWV0aG9kV2l0aERhdGEobWV0aG9kKSB7XG4gIGRlZmF1bHRzLmhlYWRlcnNbbWV0aG9kXSA9IHV0aWxzLm1lcmdlKERFRkFVTFRfQ09OVEVOVF9UWVBFKTtcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGRlZmF1bHRzO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGJpbmQoZm4sIHRoaXNBcmcpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIHdyYXAoKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBhcmdzW2ldID0gYXJndW1lbnRzW2ldO1xuICAgIH1cbiAgICByZXR1cm4gZm4uYXBwbHkodGhpc0FyZywgYXJncyk7XG4gIH07XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vLyBidG9hIHBvbHlmaWxsIGZvciBJRTwxMCBjb3VydGVzeSBodHRwczovL2dpdGh1Yi5jb20vZGF2aWRjaGFtYmVycy9CYXNlNjQuanNcblxudmFyIGNoYXJzID0gJ0FCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5Ky89JztcblxuZnVuY3Rpb24gRSgpIHtcbiAgdGhpcy5tZXNzYWdlID0gJ1N0cmluZyBjb250YWlucyBhbiBpbnZhbGlkIGNoYXJhY3Rlcic7XG59XG5FLnByb3RvdHlwZSA9IG5ldyBFcnJvcjtcbkUucHJvdG90eXBlLmNvZGUgPSA1O1xuRS5wcm90b3R5cGUubmFtZSA9ICdJbnZhbGlkQ2hhcmFjdGVyRXJyb3InO1xuXG5mdW5jdGlvbiBidG9hKGlucHV0KSB7XG4gIHZhciBzdHIgPSBTdHJpbmcoaW5wdXQpO1xuICB2YXIgb3V0cHV0ID0gJyc7XG4gIGZvciAoXG4gICAgLy8gaW5pdGlhbGl6ZSByZXN1bHQgYW5kIGNvdW50ZXJcbiAgICB2YXIgYmxvY2ssIGNoYXJDb2RlLCBpZHggPSAwLCBtYXAgPSBjaGFycztcbiAgICAvLyBpZiB0aGUgbmV4dCBzdHIgaW5kZXggZG9lcyBub3QgZXhpc3Q6XG4gICAgLy8gICBjaGFuZ2UgdGhlIG1hcHBpbmcgdGFibGUgdG8gXCI9XCJcbiAgICAvLyAgIGNoZWNrIGlmIGQgaGFzIG5vIGZyYWN0aW9uYWwgZGlnaXRzXG4gICAgc3RyLmNoYXJBdChpZHggfCAwKSB8fCAobWFwID0gJz0nLCBpZHggJSAxKTtcbiAgICAvLyBcIjggLSBpZHggJSAxICogOFwiIGdlbmVyYXRlcyB0aGUgc2VxdWVuY2UgMiwgNCwgNiwgOFxuICAgIG91dHB1dCArPSBtYXAuY2hhckF0KDYzICYgYmxvY2sgPj4gOCAtIGlkeCAlIDEgKiA4KVxuICApIHtcbiAgICBjaGFyQ29kZSA9IHN0ci5jaGFyQ29kZUF0KGlkeCArPSAzIC8gNCk7XG4gICAgaWYgKGNoYXJDb2RlID4gMHhGRikge1xuICAgICAgdGhyb3cgbmV3IEUoKTtcbiAgICB9XG4gICAgYmxvY2sgPSBibG9jayA8PCA4IHwgY2hhckNvZGU7XG4gIH1cbiAgcmV0dXJuIG91dHB1dDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBidG9hO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbmZ1bmN0aW9uIGVuY29kZSh2YWwpIHtcbiAgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudCh2YWwpLlxuICAgIHJlcGxhY2UoLyU0MC9naSwgJ0AnKS5cbiAgICByZXBsYWNlKC8lM0EvZ2ksICc6JykuXG4gICAgcmVwbGFjZSgvJTI0L2csICckJykuXG4gICAgcmVwbGFjZSgvJTJDL2dpLCAnLCcpLlxuICAgIHJlcGxhY2UoLyUyMC9nLCAnKycpLlxuICAgIHJlcGxhY2UoLyU1Qi9naSwgJ1snKS5cbiAgICByZXBsYWNlKC8lNUQvZ2ksICddJyk7XG59XG5cbi8qKlxuICogQnVpbGQgYSBVUkwgYnkgYXBwZW5kaW5nIHBhcmFtcyB0byB0aGUgZW5kXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHVybCBUaGUgYmFzZSBvZiB0aGUgdXJsIChlLmcuLCBodHRwOi8vd3d3Lmdvb2dsZS5jb20pXG4gKiBAcGFyYW0ge29iamVjdH0gW3BhcmFtc10gVGhlIHBhcmFtcyB0byBiZSBhcHBlbmRlZFxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGZvcm1hdHRlZCB1cmxcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBidWlsZFVSTCh1cmwsIHBhcmFtcywgcGFyYW1zU2VyaWFsaXplcikge1xuICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgaWYgKCFwYXJhbXMpIHtcbiAgICByZXR1cm4gdXJsO1xuICB9XG5cbiAgdmFyIHNlcmlhbGl6ZWRQYXJhbXM7XG4gIGlmIChwYXJhbXNTZXJpYWxpemVyKSB7XG4gICAgc2VyaWFsaXplZFBhcmFtcyA9IHBhcmFtc1NlcmlhbGl6ZXIocGFyYW1zKTtcbiAgfSBlbHNlIGlmICh1dGlscy5pc1VSTFNlYXJjaFBhcmFtcyhwYXJhbXMpKSB7XG4gICAgc2VyaWFsaXplZFBhcmFtcyA9IHBhcmFtcy50b1N0cmluZygpO1xuICB9IGVsc2Uge1xuICAgIHZhciBwYXJ0cyA9IFtdO1xuXG4gICAgdXRpbHMuZm9yRWFjaChwYXJhbXMsIGZ1bmN0aW9uIHNlcmlhbGl6ZSh2YWwsIGtleSkge1xuICAgICAgaWYgKHZhbCA9PT0gbnVsbCB8fCB0eXBlb2YgdmFsID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmICh1dGlscy5pc0FycmF5KHZhbCkpIHtcbiAgICAgICAga2V5ID0ga2V5ICsgJ1tdJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhbCA9IFt2YWxdO1xuICAgICAgfVxuXG4gICAgICB1dGlscy5mb3JFYWNoKHZhbCwgZnVuY3Rpb24gcGFyc2VWYWx1ZSh2KSB7XG4gICAgICAgIGlmICh1dGlscy5pc0RhdGUodikpIHtcbiAgICAgICAgICB2ID0gdi50b0lTT1N0cmluZygpO1xuICAgICAgICB9IGVsc2UgaWYgKHV0aWxzLmlzT2JqZWN0KHYpKSB7XG4gICAgICAgICAgdiA9IEpTT04uc3RyaW5naWZ5KHYpO1xuICAgICAgICB9XG4gICAgICAgIHBhcnRzLnB1c2goZW5jb2RlKGtleSkgKyAnPScgKyBlbmNvZGUodikpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBzZXJpYWxpemVkUGFyYW1zID0gcGFydHMuam9pbignJicpO1xuICB9XG5cbiAgaWYgKHNlcmlhbGl6ZWRQYXJhbXMpIHtcbiAgICB1cmwgKz0gKHVybC5pbmRleE9mKCc/JykgPT09IC0xID8gJz8nIDogJyYnKSArIHNlcmlhbGl6ZWRQYXJhbXM7XG4gIH1cblxuICByZXR1cm4gdXJsO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IFVSTCBieSBjb21iaW5pbmcgdGhlIHNwZWNpZmllZCBVUkxzXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGJhc2VVUkwgVGhlIGJhc2UgVVJMXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVsYXRpdmVVUkwgVGhlIHJlbGF0aXZlIFVSTFxuICogQHJldHVybnMge3N0cmluZ30gVGhlIGNvbWJpbmVkIFVSTFxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNvbWJpbmVVUkxzKGJhc2VVUkwsIHJlbGF0aXZlVVJMKSB7XG4gIHJldHVybiByZWxhdGl2ZVVSTFxuICAgID8gYmFzZVVSTC5yZXBsYWNlKC9cXC8rJC8sICcnKSArICcvJyArIHJlbGF0aXZlVVJMLnJlcGxhY2UoL15cXC8rLywgJycpXG4gICAgOiBiYXNlVVJMO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IChcbiAgdXRpbHMuaXNTdGFuZGFyZEJyb3dzZXJFbnYoKSA/XG5cbiAgLy8gU3RhbmRhcmQgYnJvd3NlciBlbnZzIHN1cHBvcnQgZG9jdW1lbnQuY29va2llXG4gIChmdW5jdGlvbiBzdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHdyaXRlOiBmdW5jdGlvbiB3cml0ZShuYW1lLCB2YWx1ZSwgZXhwaXJlcywgcGF0aCwgZG9tYWluLCBzZWN1cmUpIHtcbiAgICAgICAgdmFyIGNvb2tpZSA9IFtdO1xuICAgICAgICBjb29raWUucHVzaChuYW1lICsgJz0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHZhbHVlKSk7XG5cbiAgICAgICAgaWYgKHV0aWxzLmlzTnVtYmVyKGV4cGlyZXMpKSB7XG4gICAgICAgICAgY29va2llLnB1c2goJ2V4cGlyZXM9JyArIG5ldyBEYXRlKGV4cGlyZXMpLnRvR01UU3RyaW5nKCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHV0aWxzLmlzU3RyaW5nKHBhdGgpKSB7XG4gICAgICAgICAgY29va2llLnB1c2goJ3BhdGg9JyArIHBhdGgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHV0aWxzLmlzU3RyaW5nKGRvbWFpbikpIHtcbiAgICAgICAgICBjb29raWUucHVzaCgnZG9tYWluPScgKyBkb21haW4pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNlY3VyZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgIGNvb2tpZS5wdXNoKCdzZWN1cmUnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGRvY3VtZW50LmNvb2tpZSA9IGNvb2tpZS5qb2luKCc7ICcpO1xuICAgICAgfSxcblxuICAgICAgcmVhZDogZnVuY3Rpb24gcmVhZChuYW1lKSB7XG4gICAgICAgIHZhciBtYXRjaCA9IGRvY3VtZW50LmNvb2tpZS5tYXRjaChuZXcgUmVnRXhwKCcoXnw7XFxcXHMqKSgnICsgbmFtZSArICcpPShbXjtdKiknKSk7XG4gICAgICAgIHJldHVybiAobWF0Y2ggPyBkZWNvZGVVUklDb21wb25lbnQobWF0Y2hbM10pIDogbnVsbCk7XG4gICAgICB9LFxuXG4gICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZShuYW1lKSB7XG4gICAgICAgIHRoaXMud3JpdGUobmFtZSwgJycsIERhdGUubm93KCkgLSA4NjQwMDAwMCk7XG4gICAgICB9XG4gICAgfTtcbiAgfSkoKSA6XG5cbiAgLy8gTm9uIHN0YW5kYXJkIGJyb3dzZXIgZW52ICh3ZWIgd29ya2VycywgcmVhY3QtbmF0aXZlKSBsYWNrIG5lZWRlZCBzdXBwb3J0LlxuICAoZnVuY3Rpb24gbm9uU3RhbmRhcmRCcm93c2VyRW52KCkge1xuICAgIHJldHVybiB7XG4gICAgICB3cml0ZTogZnVuY3Rpb24gd3JpdGUoKSB7fSxcbiAgICAgIHJlYWQ6IGZ1bmN0aW9uIHJlYWQoKSB7IHJldHVybiBudWxsOyB9LFxuICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7fVxuICAgIH07XG4gIH0pKClcbik7XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogRGV0ZXJtaW5lcyB3aGV0aGVyIHRoZSBzcGVjaWZpZWQgVVJMIGlzIGFic29sdXRlXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHVybCBUaGUgVVJMIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSBzcGVjaWZpZWQgVVJMIGlzIGFic29sdXRlLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpc0Fic29sdXRlVVJMKHVybCkge1xuICAvLyBBIFVSTCBpcyBjb25zaWRlcmVkIGFic29sdXRlIGlmIGl0IGJlZ2lucyB3aXRoIFwiPHNjaGVtZT46Ly9cIiBvciBcIi8vXCIgKHByb3RvY29sLXJlbGF0aXZlIFVSTCkuXG4gIC8vIFJGQyAzOTg2IGRlZmluZXMgc2NoZW1lIG5hbWUgYXMgYSBzZXF1ZW5jZSBvZiBjaGFyYWN0ZXJzIGJlZ2lubmluZyB3aXRoIGEgbGV0dGVyIGFuZCBmb2xsb3dlZFxuICAvLyBieSBhbnkgY29tYmluYXRpb24gb2YgbGV0dGVycywgZGlnaXRzLCBwbHVzLCBwZXJpb2QsIG9yIGh5cGhlbi5cbiAgcmV0dXJuIC9eKFthLXpdW2EtelxcZFxcK1xcLVxcLl0qOik/XFwvXFwvL2kudGVzdCh1cmwpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IChcbiAgdXRpbHMuaXNTdGFuZGFyZEJyb3dzZXJFbnYoKSA/XG5cbiAgLy8gU3RhbmRhcmQgYnJvd3NlciBlbnZzIGhhdmUgZnVsbCBzdXBwb3J0IG9mIHRoZSBBUElzIG5lZWRlZCB0byB0ZXN0XG4gIC8vIHdoZXRoZXIgdGhlIHJlcXVlc3QgVVJMIGlzIG9mIHRoZSBzYW1lIG9yaWdpbiBhcyBjdXJyZW50IGxvY2F0aW9uLlxuICAoZnVuY3Rpb24gc3RhbmRhcmRCcm93c2VyRW52KCkge1xuICAgIHZhciBtc2llID0gLyhtc2llfHRyaWRlbnQpL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTtcbiAgICB2YXIgdXJsUGFyc2luZ05vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgdmFyIG9yaWdpblVSTDtcblxuICAgIC8qKlxuICAgICogUGFyc2UgYSBVUkwgdG8gZGlzY292ZXIgaXQncyBjb21wb25lbnRzXG4gICAgKlxuICAgICogQHBhcmFtIHtTdHJpbmd9IHVybCBUaGUgVVJMIHRvIGJlIHBhcnNlZFxuICAgICogQHJldHVybnMge09iamVjdH1cbiAgICAqL1xuICAgIGZ1bmN0aW9uIHJlc29sdmVVUkwodXJsKSB7XG4gICAgICB2YXIgaHJlZiA9IHVybDtcblxuICAgICAgaWYgKG1zaWUpIHtcbiAgICAgICAgLy8gSUUgbmVlZHMgYXR0cmlidXRlIHNldCB0d2ljZSB0byBub3JtYWxpemUgcHJvcGVydGllc1xuICAgICAgICB1cmxQYXJzaW5nTm9kZS5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCBocmVmKTtcbiAgICAgICAgaHJlZiA9IHVybFBhcnNpbmdOb2RlLmhyZWY7XG4gICAgICB9XG5cbiAgICAgIHVybFBhcnNpbmdOb2RlLnNldEF0dHJpYnV0ZSgnaHJlZicsIGhyZWYpO1xuXG4gICAgICAvLyB1cmxQYXJzaW5nTm9kZSBwcm92aWRlcyB0aGUgVXJsVXRpbHMgaW50ZXJmYWNlIC0gaHR0cDovL3VybC5zcGVjLndoYXR3Zy5vcmcvI3VybHV0aWxzXG4gICAgICByZXR1cm4ge1xuICAgICAgICBocmVmOiB1cmxQYXJzaW5nTm9kZS5ocmVmLFxuICAgICAgICBwcm90b2NvbDogdXJsUGFyc2luZ05vZGUucHJvdG9jb2wgPyB1cmxQYXJzaW5nTm9kZS5wcm90b2NvbC5yZXBsYWNlKC86JC8sICcnKSA6ICcnLFxuICAgICAgICBob3N0OiB1cmxQYXJzaW5nTm9kZS5ob3N0LFxuICAgICAgICBzZWFyY2g6IHVybFBhcnNpbmdOb2RlLnNlYXJjaCA/IHVybFBhcnNpbmdOb2RlLnNlYXJjaC5yZXBsYWNlKC9eXFw/LywgJycpIDogJycsXG4gICAgICAgIGhhc2g6IHVybFBhcnNpbmdOb2RlLmhhc2ggPyB1cmxQYXJzaW5nTm9kZS5oYXNoLnJlcGxhY2UoL14jLywgJycpIDogJycsXG4gICAgICAgIGhvc3RuYW1lOiB1cmxQYXJzaW5nTm9kZS5ob3N0bmFtZSxcbiAgICAgICAgcG9ydDogdXJsUGFyc2luZ05vZGUucG9ydCxcbiAgICAgICAgcGF0aG5hbWU6ICh1cmxQYXJzaW5nTm9kZS5wYXRobmFtZS5jaGFyQXQoMCkgPT09ICcvJykgP1xuICAgICAgICAgICAgICAgICAgdXJsUGFyc2luZ05vZGUucGF0aG5hbWUgOlxuICAgICAgICAgICAgICAgICAgJy8nICsgdXJsUGFyc2luZ05vZGUucGF0aG5hbWVcbiAgICAgIH07XG4gICAgfVxuXG4gICAgb3JpZ2luVVJMID0gcmVzb2x2ZVVSTCh3aW5kb3cubG9jYXRpb24uaHJlZik7XG5cbiAgICAvKipcbiAgICAqIERldGVybWluZSBpZiBhIFVSTCBzaGFyZXMgdGhlIHNhbWUgb3JpZ2luIGFzIHRoZSBjdXJyZW50IGxvY2F0aW9uXG4gICAgKlxuICAgICogQHBhcmFtIHtTdHJpbmd9IHJlcXVlc3RVUkwgVGhlIFVSTCB0byB0ZXN0XG4gICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiBVUkwgc2hhcmVzIHRoZSBzYW1lIG9yaWdpbiwgb3RoZXJ3aXNlIGZhbHNlXG4gICAgKi9cbiAgICByZXR1cm4gZnVuY3Rpb24gaXNVUkxTYW1lT3JpZ2luKHJlcXVlc3RVUkwpIHtcbiAgICAgIHZhciBwYXJzZWQgPSAodXRpbHMuaXNTdHJpbmcocmVxdWVzdFVSTCkpID8gcmVzb2x2ZVVSTChyZXF1ZXN0VVJMKSA6IHJlcXVlc3RVUkw7XG4gICAgICByZXR1cm4gKHBhcnNlZC5wcm90b2NvbCA9PT0gb3JpZ2luVVJMLnByb3RvY29sICYmXG4gICAgICAgICAgICBwYXJzZWQuaG9zdCA9PT0gb3JpZ2luVVJMLmhvc3QpO1xuICAgIH07XG4gIH0pKCkgOlxuXG4gIC8vIE5vbiBzdGFuZGFyZCBicm93c2VyIGVudnMgKHdlYiB3b3JrZXJzLCByZWFjdC1uYXRpdmUpIGxhY2sgbmVlZGVkIHN1cHBvcnQuXG4gIChmdW5jdGlvbiBub25TdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIGlzVVJMU2FtZU9yaWdpbigpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG4gIH0pKClcbik7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4uL3V0aWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gbm9ybWFsaXplSGVhZGVyTmFtZShoZWFkZXJzLCBub3JtYWxpemVkTmFtZSkge1xuICB1dGlscy5mb3JFYWNoKGhlYWRlcnMsIGZ1bmN0aW9uIHByb2Nlc3NIZWFkZXIodmFsdWUsIG5hbWUpIHtcbiAgICBpZiAobmFtZSAhPT0gbm9ybWFsaXplZE5hbWUgJiYgbmFtZS50b1VwcGVyQ2FzZSgpID09PSBub3JtYWxpemVkTmFtZS50b1VwcGVyQ2FzZSgpKSB7XG4gICAgICBoZWFkZXJzW25vcm1hbGl6ZWROYW1lXSA9IHZhbHVlO1xuICAgICAgZGVsZXRlIGhlYWRlcnNbbmFtZV07XG4gICAgfVxuICB9KTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxuLy8gSGVhZGVycyB3aG9zZSBkdXBsaWNhdGVzIGFyZSBpZ25vcmVkIGJ5IG5vZGVcbi8vIGMuZi4gaHR0cHM6Ly9ub2RlanMub3JnL2FwaS9odHRwLmh0bWwjaHR0cF9tZXNzYWdlX2hlYWRlcnNcbnZhciBpZ25vcmVEdXBsaWNhdGVPZiA9IFtcbiAgJ2FnZScsICdhdXRob3JpemF0aW9uJywgJ2NvbnRlbnQtbGVuZ3RoJywgJ2NvbnRlbnQtdHlwZScsICdldGFnJyxcbiAgJ2V4cGlyZXMnLCAnZnJvbScsICdob3N0JywgJ2lmLW1vZGlmaWVkLXNpbmNlJywgJ2lmLXVubW9kaWZpZWQtc2luY2UnLFxuICAnbGFzdC1tb2RpZmllZCcsICdsb2NhdGlvbicsICdtYXgtZm9yd2FyZHMnLCAncHJveHktYXV0aG9yaXphdGlvbicsXG4gICdyZWZlcmVyJywgJ3JldHJ5LWFmdGVyJywgJ3VzZXItYWdlbnQnXG5dO1xuXG4vKipcbiAqIFBhcnNlIGhlYWRlcnMgaW50byBhbiBvYmplY3RcbiAqXG4gKiBgYGBcbiAqIERhdGU6IFdlZCwgMjcgQXVnIDIwMTQgMDg6NTg6NDkgR01UXG4gKiBDb250ZW50LVR5cGU6IGFwcGxpY2F0aW9uL2pzb25cbiAqIENvbm5lY3Rpb246IGtlZXAtYWxpdmVcbiAqIFRyYW5zZmVyLUVuY29kaW5nOiBjaHVua2VkXG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gaGVhZGVycyBIZWFkZXJzIG5lZWRpbmcgdG8gYmUgcGFyc2VkXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBIZWFkZXJzIHBhcnNlZCBpbnRvIGFuIG9iamVjdFxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHBhcnNlSGVhZGVycyhoZWFkZXJzKSB7XG4gIHZhciBwYXJzZWQgPSB7fTtcbiAgdmFyIGtleTtcbiAgdmFyIHZhbDtcbiAgdmFyIGk7XG5cbiAgaWYgKCFoZWFkZXJzKSB7IHJldHVybiBwYXJzZWQ7IH1cblxuICB1dGlscy5mb3JFYWNoKGhlYWRlcnMuc3BsaXQoJ1xcbicpLCBmdW5jdGlvbiBwYXJzZXIobGluZSkge1xuICAgIGkgPSBsaW5lLmluZGV4T2YoJzonKTtcbiAgICBrZXkgPSB1dGlscy50cmltKGxpbmUuc3Vic3RyKDAsIGkpKS50b0xvd2VyQ2FzZSgpO1xuICAgIHZhbCA9IHV0aWxzLnRyaW0obGluZS5zdWJzdHIoaSArIDEpKTtcblxuICAgIGlmIChrZXkpIHtcbiAgICAgIGlmIChwYXJzZWRba2V5XSAmJiBpZ25vcmVEdXBsaWNhdGVPZi5pbmRleE9mKGtleSkgPj0gMCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAoa2V5ID09PSAnc2V0LWNvb2tpZScpIHtcbiAgICAgICAgcGFyc2VkW2tleV0gPSAocGFyc2VkW2tleV0gPyBwYXJzZWRba2V5XSA6IFtdKS5jb25jYXQoW3ZhbF0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcGFyc2VkW2tleV0gPSBwYXJzZWRba2V5XSA/IHBhcnNlZFtrZXldICsgJywgJyArIHZhbCA6IHZhbDtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBwYXJzZWQ7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIFN5bnRhY3RpYyBzdWdhciBmb3IgaW52b2tpbmcgYSBmdW5jdGlvbiBhbmQgZXhwYW5kaW5nIGFuIGFycmF5IGZvciBhcmd1bWVudHMuXG4gKlxuICogQ29tbW9uIHVzZSBjYXNlIHdvdWxkIGJlIHRvIHVzZSBgRnVuY3Rpb24ucHJvdG90eXBlLmFwcGx5YC5cbiAqXG4gKiAgYGBganNcbiAqICBmdW5jdGlvbiBmKHgsIHksIHopIHt9XG4gKiAgdmFyIGFyZ3MgPSBbMSwgMiwgM107XG4gKiAgZi5hcHBseShudWxsLCBhcmdzKTtcbiAqICBgYGBcbiAqXG4gKiBXaXRoIGBzcHJlYWRgIHRoaXMgZXhhbXBsZSBjYW4gYmUgcmUtd3JpdHRlbi5cbiAqXG4gKiAgYGBganNcbiAqICBzcHJlYWQoZnVuY3Rpb24oeCwgeSwgeikge30pKFsxLCAyLCAzXSk7XG4gKiAgYGBgXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAqIEByZXR1cm5zIHtGdW5jdGlvbn1cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzcHJlYWQoY2FsbGJhY2spIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIHdyYXAoYXJyKSB7XG4gICAgcmV0dXJuIGNhbGxiYWNrLmFwcGx5KG51bGwsIGFycik7XG4gIH07XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgYmluZCA9IHJlcXVpcmUoJy4vaGVscGVycy9iaW5kJyk7XG52YXIgaXNCdWZmZXIgPSByZXF1aXJlKCdpcy1idWZmZXInKTtcblxuLypnbG9iYWwgdG9TdHJpbmc6dHJ1ZSovXG5cbi8vIHV0aWxzIGlzIGEgbGlicmFyeSBvZiBnZW5lcmljIGhlbHBlciBmdW5jdGlvbnMgbm9uLXNwZWNpZmljIHRvIGF4aW9zXG5cbnZhciB0b1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYW4gQXJyYXlcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBBcnJheSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXkodmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEFycmF5XSc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYW4gQXJyYXlCdWZmZXJcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBBcnJheUJ1ZmZlciwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXlCdWZmZXIodmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEFycmF5QnVmZmVyXSc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBGb3JtRGF0YVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIEZvcm1EYXRhLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNGb3JtRGF0YSh2YWwpIHtcbiAgcmV0dXJuICh0eXBlb2YgRm9ybURhdGEgIT09ICd1bmRlZmluZWQnKSAmJiAodmFsIGluc3RhbmNlb2YgRm9ybURhdGEpO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgdmlldyBvbiBhbiBBcnJheUJ1ZmZlclxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgdmlldyBvbiBhbiBBcnJheUJ1ZmZlciwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXlCdWZmZXJWaWV3KHZhbCkge1xuICB2YXIgcmVzdWx0O1xuICBpZiAoKHR5cGVvZiBBcnJheUJ1ZmZlciAhPT0gJ3VuZGVmaW5lZCcpICYmIChBcnJheUJ1ZmZlci5pc1ZpZXcpKSB7XG4gICAgcmVzdWx0ID0gQXJyYXlCdWZmZXIuaXNWaWV3KHZhbCk7XG4gIH0gZWxzZSB7XG4gICAgcmVzdWx0ID0gKHZhbCkgJiYgKHZhbC5idWZmZXIpICYmICh2YWwuYnVmZmVyIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBTdHJpbmdcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIFN0cmluZywgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzU3RyaW5nKHZhbCkge1xuICByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ3N0cmluZyc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBOdW1iZXJcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIE51bWJlciwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzTnVtYmVyKHZhbCkge1xuICByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ251bWJlcic7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgdW5kZWZpbmVkXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdGhlIHZhbHVlIGlzIHVuZGVmaW5lZCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzVW5kZWZpbmVkKHZhbCkge1xuICByZXR1cm4gdHlwZW9mIHZhbCA9PT0gJ3VuZGVmaW5lZCc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYW4gT2JqZWN0XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gT2JqZWN0LCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3QodmFsKSB7XG4gIHJldHVybiB2YWwgIT09IG51bGwgJiYgdHlwZW9mIHZhbCA9PT0gJ29iamVjdCc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBEYXRlXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBEYXRlLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNEYXRlKHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBEYXRlXSc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBGaWxlXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBGaWxlLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNGaWxlKHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBGaWxlXSc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBCbG9iXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBCbG9iLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNCbG9iKHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBCbG9iXSc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBGdW5jdGlvblxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgRnVuY3Rpb24sIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBGdW5jdGlvbl0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgU3RyZWFtXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBTdHJlYW0sIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1N0cmVhbSh2YWwpIHtcbiAgcmV0dXJuIGlzT2JqZWN0KHZhbCkgJiYgaXNGdW5jdGlvbih2YWwucGlwZSk7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBVUkxTZWFyY2hQYXJhbXMgb2JqZWN0XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBVUkxTZWFyY2hQYXJhbXMgb2JqZWN0LCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNVUkxTZWFyY2hQYXJhbXModmFsKSB7XG4gIHJldHVybiB0eXBlb2YgVVJMU2VhcmNoUGFyYW1zICE9PSAndW5kZWZpbmVkJyAmJiB2YWwgaW5zdGFuY2VvZiBVUkxTZWFyY2hQYXJhbXM7XG59XG5cbi8qKlxuICogVHJpbSBleGNlc3Mgd2hpdGVzcGFjZSBvZmYgdGhlIGJlZ2lubmluZyBhbmQgZW5kIG9mIGEgc3RyaW5nXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0ciBUaGUgU3RyaW5nIHRvIHRyaW1cbiAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSBTdHJpbmcgZnJlZWQgb2YgZXhjZXNzIHdoaXRlc3BhY2VcbiAqL1xuZnVuY3Rpb24gdHJpbShzdHIpIHtcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKC9eXFxzKi8sICcnKS5yZXBsYWNlKC9cXHMqJC8sICcnKTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgd2UncmUgcnVubmluZyBpbiBhIHN0YW5kYXJkIGJyb3dzZXIgZW52aXJvbm1lbnRcbiAqXG4gKiBUaGlzIGFsbG93cyBheGlvcyB0byBydW4gaW4gYSB3ZWIgd29ya2VyLCBhbmQgcmVhY3QtbmF0aXZlLlxuICogQm90aCBlbnZpcm9ubWVudHMgc3VwcG9ydCBYTUxIdHRwUmVxdWVzdCwgYnV0IG5vdCBmdWxseSBzdGFuZGFyZCBnbG9iYWxzLlxuICpcbiAqIHdlYiB3b3JrZXJzOlxuICogIHR5cGVvZiB3aW5kb3cgLT4gdW5kZWZpbmVkXG4gKiAgdHlwZW9mIGRvY3VtZW50IC0+IHVuZGVmaW5lZFxuICpcbiAqIHJlYWN0LW5hdGl2ZTpcbiAqICBuYXZpZ2F0b3IucHJvZHVjdCAtPiAnUmVhY3ROYXRpdmUnXG4gKi9cbmZ1bmN0aW9uIGlzU3RhbmRhcmRCcm93c2VyRW52KCkge1xuICBpZiAodHlwZW9mIG5hdmlnYXRvciAhPT0gJ3VuZGVmaW5lZCcgJiYgbmF2aWdhdG9yLnByb2R1Y3QgPT09ICdSZWFjdE5hdGl2ZScpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIChcbiAgICB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJlxuICAgIHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCdcbiAgKTtcbn1cblxuLyoqXG4gKiBJdGVyYXRlIG92ZXIgYW4gQXJyYXkgb3IgYW4gT2JqZWN0IGludm9raW5nIGEgZnVuY3Rpb24gZm9yIGVhY2ggaXRlbS5cbiAqXG4gKiBJZiBgb2JqYCBpcyBhbiBBcnJheSBjYWxsYmFjayB3aWxsIGJlIGNhbGxlZCBwYXNzaW5nXG4gKiB0aGUgdmFsdWUsIGluZGV4LCBhbmQgY29tcGxldGUgYXJyYXkgZm9yIGVhY2ggaXRlbS5cbiAqXG4gKiBJZiAnb2JqJyBpcyBhbiBPYmplY3QgY2FsbGJhY2sgd2lsbCBiZSBjYWxsZWQgcGFzc2luZ1xuICogdGhlIHZhbHVlLCBrZXksIGFuZCBjb21wbGV0ZSBvYmplY3QgZm9yIGVhY2ggcHJvcGVydHkuXG4gKlxuICogQHBhcmFtIHtPYmplY3R8QXJyYXl9IG9iaiBUaGUgb2JqZWN0IHRvIGl0ZXJhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBjYWxsYmFjayB0byBpbnZva2UgZm9yIGVhY2ggaXRlbVxuICovXG5mdW5jdGlvbiBmb3JFYWNoKG9iaiwgZm4pIHtcbiAgLy8gRG9uJ3QgYm90aGVyIGlmIG5vIHZhbHVlIHByb3ZpZGVkXG4gIGlmIChvYmogPT09IG51bGwgfHwgdHlwZW9mIG9iaiA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICAvLyBGb3JjZSBhbiBhcnJheSBpZiBub3QgYWxyZWFkeSBzb21ldGhpbmcgaXRlcmFibGVcbiAgaWYgKHR5cGVvZiBvYmogIT09ICdvYmplY3QnKSB7XG4gICAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gICAgb2JqID0gW29ial07XG4gIH1cblxuICBpZiAoaXNBcnJheShvYmopKSB7XG4gICAgLy8gSXRlcmF0ZSBvdmVyIGFycmF5IHZhbHVlc1xuICAgIGZvciAodmFyIGkgPSAwLCBsID0gb2JqLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgZm4uY2FsbChudWxsLCBvYmpbaV0sIGksIG9iaik7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIC8vIEl0ZXJhdGUgb3ZlciBvYmplY3Qga2V5c1xuICAgIGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBrZXkpKSB7XG4gICAgICAgIGZuLmNhbGwobnVsbCwgb2JqW2tleV0sIGtleSwgb2JqKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBBY2NlcHRzIHZhcmFyZ3MgZXhwZWN0aW5nIGVhY2ggYXJndW1lbnQgdG8gYmUgYW4gb2JqZWN0LCB0aGVuXG4gKiBpbW11dGFibHkgbWVyZ2VzIHRoZSBwcm9wZXJ0aWVzIG9mIGVhY2ggb2JqZWN0IGFuZCByZXR1cm5zIHJlc3VsdC5cbiAqXG4gKiBXaGVuIG11bHRpcGxlIG9iamVjdHMgY29udGFpbiB0aGUgc2FtZSBrZXkgdGhlIGxhdGVyIG9iamVjdCBpblxuICogdGhlIGFyZ3VtZW50cyBsaXN0IHdpbGwgdGFrZSBwcmVjZWRlbmNlLlxuICpcbiAqIEV4YW1wbGU6XG4gKlxuICogYGBganNcbiAqIHZhciByZXN1bHQgPSBtZXJnZSh7Zm9vOiAxMjN9LCB7Zm9vOiA0NTZ9KTtcbiAqIGNvbnNvbGUubG9nKHJlc3VsdC5mb28pOyAvLyBvdXRwdXRzIDQ1NlxuICogYGBgXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9iajEgT2JqZWN0IHRvIG1lcmdlXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXN1bHQgb2YgYWxsIG1lcmdlIHByb3BlcnRpZXNcbiAqL1xuZnVuY3Rpb24gbWVyZ2UoLyogb2JqMSwgb2JqMiwgb2JqMywgLi4uICovKSB7XG4gIHZhciByZXN1bHQgPSB7fTtcbiAgZnVuY3Rpb24gYXNzaWduVmFsdWUodmFsLCBrZXkpIHtcbiAgICBpZiAodHlwZW9mIHJlc3VsdFtrZXldID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgdmFsID09PSAnb2JqZWN0Jykge1xuICAgICAgcmVzdWx0W2tleV0gPSBtZXJnZShyZXN1bHRba2V5XSwgdmFsKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzdWx0W2tleV0gPSB2YWw7XG4gICAgfVxuICB9XG5cbiAgZm9yICh2YXIgaSA9IDAsIGwgPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgZm9yRWFjaChhcmd1bWVudHNbaV0sIGFzc2lnblZhbHVlKTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIEV4dGVuZHMgb2JqZWN0IGEgYnkgbXV0YWJseSBhZGRpbmcgdG8gaXQgdGhlIHByb3BlcnRpZXMgb2Ygb2JqZWN0IGIuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGEgVGhlIG9iamVjdCB0byBiZSBleHRlbmRlZFxuICogQHBhcmFtIHtPYmplY3R9IGIgVGhlIG9iamVjdCB0byBjb3B5IHByb3BlcnRpZXMgZnJvbVxuICogQHBhcmFtIHtPYmplY3R9IHRoaXNBcmcgVGhlIG9iamVjdCB0byBiaW5kIGZ1bmN0aW9uIHRvXG4gKiBAcmV0dXJuIHtPYmplY3R9IFRoZSByZXN1bHRpbmcgdmFsdWUgb2Ygb2JqZWN0IGFcbiAqL1xuZnVuY3Rpb24gZXh0ZW5kKGEsIGIsIHRoaXNBcmcpIHtcbiAgZm9yRWFjaChiLCBmdW5jdGlvbiBhc3NpZ25WYWx1ZSh2YWwsIGtleSkge1xuICAgIGlmICh0aGlzQXJnICYmIHR5cGVvZiB2YWwgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGFba2V5XSA9IGJpbmQodmFsLCB0aGlzQXJnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYVtrZXldID0gdmFsO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiBhO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgaXNBcnJheTogaXNBcnJheSxcbiAgaXNBcnJheUJ1ZmZlcjogaXNBcnJheUJ1ZmZlcixcbiAgaXNCdWZmZXI6IGlzQnVmZmVyLFxuICBpc0Zvcm1EYXRhOiBpc0Zvcm1EYXRhLFxuICBpc0FycmF5QnVmZmVyVmlldzogaXNBcnJheUJ1ZmZlclZpZXcsXG4gIGlzU3RyaW5nOiBpc1N0cmluZyxcbiAgaXNOdW1iZXI6IGlzTnVtYmVyLFxuICBpc09iamVjdDogaXNPYmplY3QsXG4gIGlzVW5kZWZpbmVkOiBpc1VuZGVmaW5lZCxcbiAgaXNEYXRlOiBpc0RhdGUsXG4gIGlzRmlsZTogaXNGaWxlLFxuICBpc0Jsb2I6IGlzQmxvYixcbiAgaXNGdW5jdGlvbjogaXNGdW5jdGlvbixcbiAgaXNTdHJlYW06IGlzU3RyZWFtLFxuICBpc1VSTFNlYXJjaFBhcmFtczogaXNVUkxTZWFyY2hQYXJhbXMsXG4gIGlzU3RhbmRhcmRCcm93c2VyRW52OiBpc1N0YW5kYXJkQnJvd3NlckVudixcbiAgZm9yRWFjaDogZm9yRWFjaCxcbiAgbWVyZ2U6IG1lcmdlLFxuICBleHRlbmQ6IGV4dGVuZCxcbiAgdHJpbTogdHJpbVxufTtcbiIsIi8qIVxuICogRGV0ZXJtaW5lIGlmIGFuIG9iamVjdCBpcyBhIEJ1ZmZlclxuICpcbiAqIEBhdXRob3IgICBGZXJvc3MgQWJvdWtoYWRpamVoIDxodHRwczovL2Zlcm9zcy5vcmc+XG4gKiBAbGljZW5zZSAgTUlUXG4gKi9cblxuLy8gVGhlIF9pc0J1ZmZlciBjaGVjayBpcyBmb3IgU2FmYXJpIDUtNyBzdXBwb3J0LCBiZWNhdXNlIGl0J3MgbWlzc2luZ1xuLy8gT2JqZWN0LnByb3RvdHlwZS5jb25zdHJ1Y3Rvci4gUmVtb3ZlIHRoaXMgZXZlbnR1YWxseVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob2JqKSB7XG4gIHJldHVybiBvYmogIT0gbnVsbCAmJiAoaXNCdWZmZXIob2JqKSB8fCBpc1Nsb3dCdWZmZXIob2JqKSB8fCAhIW9iai5faXNCdWZmZXIpXG59XG5cbmZ1bmN0aW9uIGlzQnVmZmVyIChvYmopIHtcbiAgcmV0dXJuICEhb2JqLmNvbnN0cnVjdG9yICYmIHR5cGVvZiBvYmouY29uc3RydWN0b3IuaXNCdWZmZXIgPT09ICdmdW5jdGlvbicgJiYgb2JqLmNvbnN0cnVjdG9yLmlzQnVmZmVyKG9iailcbn1cblxuLy8gRm9yIE5vZGUgdjAuMTAgc3VwcG9ydC4gUmVtb3ZlIHRoaXMgZXZlbnR1YWxseS5cbmZ1bmN0aW9uIGlzU2xvd0J1ZmZlciAob2JqKSB7XG4gIHJldHVybiB0eXBlb2Ygb2JqLnJlYWRGbG9hdExFID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBvYmouc2xpY2UgPT09ICdmdW5jdGlvbicgJiYgaXNCdWZmZXIob2JqLnNsaWNlKDAsIDApKVxufVxuIiwiLyoqIE1vYlggLSAoYykgTWljaGVsIFdlc3RzdHJhdGUgMjAxNSAtIDIwMTggLSBNSVQgTGljZW5zZWQgKi9cbi8qISAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxyXG5Db3B5cmlnaHQgKGMpIE1pY3Jvc29mdCBDb3Jwb3JhdGlvbi4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cclxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlXHJcbnRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlXHJcbkxpY2Vuc2UgYXQgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcblxyXG5USElTIENPREUgSVMgUFJPVklERUQgT04gQU4gKkFTIElTKiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZXHJcbktJTkQsIEVJVEhFUiBFWFBSRVNTIE9SIElNUExJRUQsIElOQ0xVRElORyBXSVRIT1VUIExJTUlUQVRJT04gQU5ZIElNUExJRURcclxuV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIFRJVExFLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSxcclxuTUVSQ0hBTlRBQkxJVFkgT1IgTk9OLUlORlJJTkdFTUVOVC5cclxuXHJcblNlZSB0aGUgQXBhY2hlIFZlcnNpb24gMi4wIExpY2Vuc2UgZm9yIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9uc1xyXG5hbmQgbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqICovXHJcbi8qIGdsb2JhbCBSZWZsZWN0LCBQcm9taXNlICovXHJcblxyXG52YXIgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07IH07XHJcblxyXG5mdW5jdGlvbiBfX2V4dGVuZHMoZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG59XHJcblxyXG52YXIgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcclxuICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgIHMgPSBhcmd1bWVudHNbaV07XHJcbiAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcclxuICAgIH1cclxuICAgIHJldHVybiB0O1xyXG59O1xyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5mdW5jdGlvbiBfX3ZhbHVlcyhvKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl0sIGkgPSAwO1xyXG4gICAgaWYgKG0pIHJldHVybiBtLmNhbGwobyk7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKG8gJiYgaSA+PSBvLmxlbmd0aCkgbyA9IHZvaWQgMDtcclxuICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IG8gJiYgb1tpKytdLCBkb25lOiAhbyB9O1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIF9fcmVhZChvLCBuKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XHJcbiAgICBpZiAoIW0pIHJldHVybiBvO1xyXG4gICAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XHJcbiAgICBmaW5hbGx5IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIF9fc3ByZWFkKCkge1xyXG4gICAgZm9yICh2YXIgYXIgPSBbXSwgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgYXIgPSBhci5jb25jYXQoX19yZWFkKGFyZ3VtZW50c1tpXSkpO1xyXG4gICAgcmV0dXJuIGFyO1xyXG59XG5cbnZhciBPQkZVU0NBVEVEX0VSUk9SJCQxID0gXCJBbiBpbnZhcmlhbnQgZmFpbGVkLCBob3dldmVyIHRoZSBlcnJvciBpcyBvYmZ1c2NhdGVkIGJlY2F1c2UgdGhpcyBpcyBhbiBwcm9kdWN0aW9uIGJ1aWxkLlwiO1xudmFyIEVNUFRZX0FSUkFZJCQxID0gW107XG5PYmplY3QuZnJlZXplKEVNUFRZX0FSUkFZJCQxKTtcbnZhciBFTVBUWV9PQkpFQ1QkJDEgPSB7fTtcbk9iamVjdC5mcmVlemUoRU1QVFlfT0JKRUNUJCQxKTtcbmZ1bmN0aW9uIGdldE5leHRJZCQkMSgpIHtcbiAgICByZXR1cm4gKytnbG9iYWxTdGF0ZSQkMS5tb2J4R3VpZDtcbn1cbmZ1bmN0aW9uIGZhaWwkJDEobWVzc2FnZSkge1xuICAgIGludmFyaWFudCQkMShmYWxzZSwgbWVzc2FnZSk7XG4gICAgdGhyb3cgXCJYXCI7IC8vIHVucmVhY2hhYmxlXG59XG5mdW5jdGlvbiBpbnZhcmlhbnQkJDEoY2hlY2ssIG1lc3NhZ2UpIHtcbiAgICBpZiAoIWNoZWNrKVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJbbW9ieF0gXCIgKyAobWVzc2FnZSB8fCBPQkZVU0NBVEVEX0VSUk9SJCQxKSk7XG59XG4vKipcbiAqIFByaW50cyBhIGRlcHJlY2F0aW9uIG1lc3NhZ2UsIGJ1dCBvbmx5IG9uZSB0aW1lLlxuICogUmV0dXJucyBmYWxzZSBpZiB0aGUgZGVwcmVjYXRlZCBtZXNzYWdlIHdhcyBhbHJlYWR5IHByaW50ZWQgYmVmb3JlXG4gKi9cbnZhciBkZXByZWNhdGVkTWVzc2FnZXMgPSBbXTtcbmZ1bmN0aW9uIGRlcHJlY2F0ZWQkJDEobXNnLCB0aGluZykge1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gXCJwcm9kdWN0aW9uXCIpXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICBpZiAodGhpbmcpIHtcbiAgICAgICAgcmV0dXJuIGRlcHJlY2F0ZWQkJDEoXCInXCIgKyBtc2cgKyBcIicsIHVzZSAnXCIgKyB0aGluZyArIFwiJyBpbnN0ZWFkLlwiKTtcbiAgICB9XG4gICAgaWYgKGRlcHJlY2F0ZWRNZXNzYWdlcy5pbmRleE9mKG1zZykgIT09IC0xKVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgZGVwcmVjYXRlZE1lc3NhZ2VzLnB1c2gobXNnKTtcbiAgICBjb25zb2xlLmVycm9yKFwiW21vYnhdIERlcHJlY2F0ZWQ6IFwiICsgbXNnKTtcbiAgICByZXR1cm4gdHJ1ZTtcbn1cbi8qKlxuICogTWFrZXMgc3VyZSB0aGF0IHRoZSBwcm92aWRlZCBmdW5jdGlvbiBpcyBpbnZva2VkIGF0IG1vc3Qgb25jZS5cbiAqL1xuZnVuY3Rpb24gb25jZSQkMShmdW5jKSB7XG4gICAgdmFyIGludm9rZWQgPSBmYWxzZTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoaW52b2tlZClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgaW52b2tlZCA9IHRydWU7XG4gICAgICAgIHJldHVybiBmdW5jLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfTtcbn1cbnZhciBub29wJCQxID0gZnVuY3Rpb24gKCkgeyB9O1xuZnVuY3Rpb24gdW5pcXVlJCQxKGxpc3QpIHtcbiAgICB2YXIgcmVzID0gW107XG4gICAgbGlzdC5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgIGlmIChyZXMuaW5kZXhPZihpdGVtKSA9PT0gLTEpXG4gICAgICAgICAgICByZXMucHVzaChpdGVtKTtcbiAgICB9KTtcbiAgICByZXR1cm4gcmVzO1xufVxuZnVuY3Rpb24gaXNPYmplY3QkJDEodmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUgIT09IG51bGwgJiYgdHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiO1xufVxuZnVuY3Rpb24gaXNQbGFpbk9iamVjdCQkMSh2YWx1ZSkge1xuICAgIGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB0eXBlb2YgdmFsdWUgIT09IFwib2JqZWN0XCIpXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB2YXIgcHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YodmFsdWUpO1xuICAgIHJldHVybiBwcm90byA9PT0gT2JqZWN0LnByb3RvdHlwZSB8fCBwcm90byA9PT0gbnVsbDtcbn1cblxuZnVuY3Rpb24gYWRkSGlkZGVuUHJvcCQkMShvYmplY3QsIHByb3BOYW1lLCB2YWx1ZSkge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmplY3QsIHByb3BOYW1lLCB7XG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICB2YWx1ZTogdmFsdWVcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIGFkZEhpZGRlbkZpbmFsUHJvcCQkMShvYmplY3QsIHByb3BOYW1lLCB2YWx1ZSkge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmplY3QsIHByb3BOYW1lLCB7XG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICB3cml0YWJsZTogZmFsc2UsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgdmFsdWU6IHZhbHVlXG4gICAgfSk7XG59XG5mdW5jdGlvbiBpc1Byb3BlcnR5Q29uZmlndXJhYmxlJCQxKG9iamVjdCwgcHJvcCkge1xuICAgIHZhciBkZXNjcmlwdG9yID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmplY3QsIHByb3ApO1xuICAgIHJldHVybiAhZGVzY3JpcHRvciB8fCAoZGVzY3JpcHRvci5jb25maWd1cmFibGUgIT09IGZhbHNlICYmIGRlc2NyaXB0b3Iud3JpdGFibGUgIT09IGZhbHNlKTtcbn1cbmZ1bmN0aW9uIGFzc2VydFByb3BlcnR5Q29uZmlndXJhYmxlJCQxKG9iamVjdCwgcHJvcCkge1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgJiYgIWlzUHJvcGVydHlDb25maWd1cmFibGUkJDEob2JqZWN0LCBwcm9wKSlcbiAgICAgICAgZmFpbCQkMShcIkNhbm5vdCBtYWtlIHByb3BlcnR5ICdcIiArIHByb3AudG9TdHJpbmcoKSArIFwiJyBvYnNlcnZhYmxlLCBpdCBpcyBub3QgY29uZmlndXJhYmxlIGFuZCB3cml0YWJsZSBpbiB0aGUgdGFyZ2V0IG9iamVjdFwiKTtcbn1cbmZ1bmN0aW9uIGNyZWF0ZUluc3RhbmNlb2ZQcmVkaWNhdGUkJDEobmFtZSwgY2xhenopIHtcbiAgICB2YXIgcHJvcE5hbWUgPSBcImlzTW9iWFwiICsgbmFtZTtcbiAgICBjbGF6ei5wcm90b3R5cGVbcHJvcE5hbWVdID0gdHJ1ZTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgcmV0dXJuIGlzT2JqZWN0JCQxKHgpICYmIHhbcHJvcE5hbWVdID09PSB0cnVlO1xuICAgIH07XG59XG4vKipcbiAqIFJldHVybnMgd2hldGhlciB0aGUgYXJndW1lbnQgaXMgYW4gYXJyYXksIGRpc3JlZ2FyZGluZyBvYnNlcnZhYmlsaXR5LlxuICovXG5mdW5jdGlvbiBpc0FycmF5TGlrZSQkMSh4KSB7XG4gICAgcmV0dXJuIEFycmF5LmlzQXJyYXkoeCkgfHwgaXNPYnNlcnZhYmxlQXJyYXkkJDEoeCk7XG59XG5mdW5jdGlvbiBpc0VTNk1hcCQkMSh0aGluZykge1xuICAgIHJldHVybiB0aGluZyBpbnN0YW5jZW9mIE1hcDtcbn1cbmZ1bmN0aW9uIGlzRVM2U2V0JCQxKHRoaW5nKSB7XG4gICAgcmV0dXJuIHRoaW5nIGluc3RhbmNlb2YgU2V0O1xufVxuZnVuY3Rpb24gZ2V0TWFwTGlrZUtleXMkJDEobWFwKSB7XG4gICAgaWYgKGlzUGxhaW5PYmplY3QkJDEobWFwKSlcbiAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKG1hcCk7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkobWFwKSlcbiAgICAgICAgcmV0dXJuIG1hcC5tYXAoZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICB2YXIgX2IgPSBfX3JlYWQoX2EsIDEpLCBrZXkgPSBfYlswXTtcbiAgICAgICAgICAgIHJldHVybiBrZXk7XG4gICAgICAgIH0pO1xuICAgIGlmIChpc0VTNk1hcCQkMShtYXApIHx8IGlzT2JzZXJ2YWJsZU1hcCQkMShtYXApKVxuICAgICAgICByZXR1cm4gQXJyYXkuZnJvbShtYXAua2V5cygpKTtcbiAgICByZXR1cm4gZmFpbCQkMShcIkNhbm5vdCBnZXQga2V5cyBmcm9tICdcIiArIG1hcCArIFwiJ1wiKTtcbn1cbmZ1bmN0aW9uIHRvUHJpbWl0aXZlJCQxKHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlID09PSBudWxsID8gbnVsbCA6IHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIiA/IFwiXCIgKyB2YWx1ZSA6IHZhbHVlO1xufVxuXG52YXIgJG1vYngkJDEgPSBTeW1ib2woXCJtb2J4IGFkbWluaXN0cmF0aW9uXCIpO1xudmFyIEF0b20kJDEgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgbmV3IGF0b20uIEZvciBkZWJ1Z2dpbmcgcHVycG9zZXMgaXQgaXMgcmVjb21tZW5kZWQgdG8gZ2l2ZSBpdCBhIG5hbWUuXG4gICAgICogVGhlIG9uQmVjb21lT2JzZXJ2ZWQgYW5kIG9uQmVjb21lVW5vYnNlcnZlZCBjYWxsYmFja3MgY2FuIGJlIHVzZWQgZm9yIHJlc291cmNlIG1hbmFnZW1lbnQuXG4gICAgICovXG4gICAgZnVuY3Rpb24gQXRvbSQkMShuYW1lKSB7XG4gICAgICAgIGlmIChuYW1lID09PSB2b2lkIDApIHsgbmFtZSA9IFwiQXRvbUBcIiArIGdldE5leHRJZCQkMSgpOyB9XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMuaXNQZW5kaW5nVW5vYnNlcnZhdGlvbiA9IGZhbHNlOyAvLyBmb3IgZWZmZWN0aXZlIHVub2JzZXJ2aW5nLiBCYXNlQXRvbSBoYXMgdHJ1ZSwgZm9yIGV4dHJhIG9wdGltaXphdGlvbiwgc28gaXRzIG9uQmVjb21lVW5vYnNlcnZlZCBuZXZlciBnZXRzIGNhbGxlZCwgYmVjYXVzZSBpdCdzIG5vdCBuZWVkZWRcbiAgICAgICAgdGhpcy5pc0JlaW5nT2JzZXJ2ZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5vYnNlcnZlcnMgPSBuZXcgU2V0KCk7XG4gICAgICAgIHRoaXMuZGlmZlZhbHVlID0gMDtcbiAgICAgICAgdGhpcy5sYXN0QWNjZXNzZWRCeSA9IDA7XG4gICAgICAgIHRoaXMubG93ZXN0T2JzZXJ2ZXJTdGF0ZSA9IElEZXJpdmF0aW9uU3RhdGUuTk9UX1RSQUNLSU5HO1xuICAgIH1cbiAgICBBdG9tJCQxLnByb3RvdHlwZS5vbkJlY29tZU9ic2VydmVkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5vbkJlY29tZU9ic2VydmVkTGlzdGVuZXJzKSB7XG4gICAgICAgICAgICB0aGlzLm9uQmVjb21lT2JzZXJ2ZWRMaXN0ZW5lcnMuZm9yRWFjaChmdW5jdGlvbiAobGlzdGVuZXIpIHsgcmV0dXJuIGxpc3RlbmVyKCk7IH0pO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBBdG9tJCQxLnByb3RvdHlwZS5vbkJlY29tZVVub2JzZXJ2ZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLm9uQmVjb21lVW5vYnNlcnZlZExpc3RlbmVycykge1xuICAgICAgICAgICAgdGhpcy5vbkJlY29tZVVub2JzZXJ2ZWRMaXN0ZW5lcnMuZm9yRWFjaChmdW5jdGlvbiAobGlzdGVuZXIpIHsgcmV0dXJuIGxpc3RlbmVyKCk7IH0pO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBJbnZva2UgdGhpcyBtZXRob2QgdG8gbm90aWZ5IG1vYnggdGhhdCB5b3VyIGF0b20gaGFzIGJlZW4gdXNlZCBzb21laG93LlxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGVyZSBpcyBjdXJyZW50bHkgYSByZWFjdGl2ZSBjb250ZXh0LlxuICAgICAqL1xuICAgIEF0b20kJDEucHJvdG90eXBlLnJlcG9ydE9ic2VydmVkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gcmVwb3J0T2JzZXJ2ZWQkJDEodGhpcyk7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBJbnZva2UgdGhpcyBtZXRob2QgX2FmdGVyXyB0aGlzIG1ldGhvZCBoYXMgY2hhbmdlZCB0byBzaWduYWwgbW9ieCB0aGF0IGFsbCBpdHMgb2JzZXJ2ZXJzIHNob3VsZCBpbnZhbGlkYXRlLlxuICAgICAqL1xuICAgIEF0b20kJDEucHJvdG90eXBlLnJlcG9ydENoYW5nZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHN0YXJ0QmF0Y2gkJDEoKTtcbiAgICAgICAgcHJvcGFnYXRlQ2hhbmdlZCQkMSh0aGlzKTtcbiAgICAgICAgZW5kQmF0Y2gkJDEoKTtcbiAgICB9O1xuICAgIEF0b20kJDEucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5uYW1lO1xuICAgIH07XG4gICAgcmV0dXJuIEF0b20kJDE7XG59KCkpO1xudmFyIGlzQXRvbSQkMSA9IGNyZWF0ZUluc3RhbmNlb2ZQcmVkaWNhdGUkJDEoXCJBdG9tXCIsIEF0b20kJDEpO1xuZnVuY3Rpb24gY3JlYXRlQXRvbSQkMShuYW1lLCBvbkJlY29tZU9ic2VydmVkSGFuZGxlciwgb25CZWNvbWVVbm9ic2VydmVkSGFuZGxlcikge1xuICAgIGlmIChvbkJlY29tZU9ic2VydmVkSGFuZGxlciA9PT0gdm9pZCAwKSB7IG9uQmVjb21lT2JzZXJ2ZWRIYW5kbGVyID0gbm9vcCQkMTsgfVxuICAgIGlmIChvbkJlY29tZVVub2JzZXJ2ZWRIYW5kbGVyID09PSB2b2lkIDApIHsgb25CZWNvbWVVbm9ic2VydmVkSGFuZGxlciA9IG5vb3AkJDE7IH1cbiAgICB2YXIgYXRvbSA9IG5ldyBBdG9tJCQxKG5hbWUpO1xuICAgIC8vIGRlZmF1bHQgYG5vb3BgIGxpc3RlbmVyIHdpbGwgbm90IGluaXRpYWxpemUgdGhlIGhvb2sgU2V0XG4gICAgaWYgKG9uQmVjb21lT2JzZXJ2ZWRIYW5kbGVyICE9PSBub29wJCQxKSB7XG4gICAgICAgIG9uQmVjb21lT2JzZXJ2ZWQkJDEoYXRvbSwgb25CZWNvbWVPYnNlcnZlZEhhbmRsZXIpO1xuICAgIH1cbiAgICBpZiAob25CZWNvbWVVbm9ic2VydmVkSGFuZGxlciAhPT0gbm9vcCQkMSkge1xuICAgICAgICBvbkJlY29tZVVub2JzZXJ2ZWQkJDEoYXRvbSwgb25CZWNvbWVVbm9ic2VydmVkSGFuZGxlcik7XG4gICAgfVxuICAgIHJldHVybiBhdG9tO1xufVxuXG5mdW5jdGlvbiBpZGVudGl0eUNvbXBhcmVyKGEsIGIpIHtcbiAgICByZXR1cm4gYSA9PT0gYjtcbn1cbmZ1bmN0aW9uIHN0cnVjdHVyYWxDb21wYXJlcihhLCBiKSB7XG4gICAgcmV0dXJuIGRlZXBFcXVhbCQkMShhLCBiKTtcbn1cbmZ1bmN0aW9uIGRlZmF1bHRDb21wYXJlcihhLCBiKSB7XG4gICAgcmV0dXJuIE9iamVjdC5pcyhhLCBiKTtcbn1cbnZhciBjb21wYXJlciQkMSA9IHtcbiAgICBpZGVudGl0eTogaWRlbnRpdHlDb21wYXJlcixcbiAgICBzdHJ1Y3R1cmFsOiBzdHJ1Y3R1cmFsQ29tcGFyZXIsXG4gICAgZGVmYXVsdDogZGVmYXVsdENvbXBhcmVyXG59O1xuXG52YXIgbW9ieERpZFJ1bkxhenlJbml0aWFsaXplcnNTeW1ib2wkJDEgPSBTeW1ib2woXCJtb2J4IGRpZCBydW4gbGF6eSBpbml0aWFsaXplcnNcIik7XG52YXIgbW9ieFBlbmRpbmdEZWNvcmF0b3JzJCQxID0gU3ltYm9sKFwibW9ieCBwZW5kaW5nIGRlY29yYXRvcnNcIik7XG52YXIgZW51bWVyYWJsZURlc2NyaXB0b3JDYWNoZSA9IHt9O1xudmFyIG5vbkVudW1lcmFibGVEZXNjcmlwdG9yQ2FjaGUgPSB7fTtcbmZ1bmN0aW9uIGNyZWF0ZVByb3BlcnR5SW5pdGlhbGl6ZXJEZXNjcmlwdG9yKHByb3AsIGVudW1lcmFibGUpIHtcbiAgICB2YXIgY2FjaGUgPSBlbnVtZXJhYmxlID8gZW51bWVyYWJsZURlc2NyaXB0b3JDYWNoZSA6IG5vbkVudW1lcmFibGVEZXNjcmlwdG9yQ2FjaGU7XG4gICAgcmV0dXJuIChjYWNoZVtwcm9wXSB8fFxuICAgICAgICAoY2FjaGVbcHJvcF0gPSB7XG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiBlbnVtZXJhYmxlLFxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaW5pdGlhbGl6ZUluc3RhbmNlJCQxKHRoaXMpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzW3Byb3BdO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgaW5pdGlhbGl6ZUluc3RhbmNlJCQxKHRoaXMpO1xuICAgICAgICAgICAgICAgIHRoaXNbcHJvcF0gPSB2YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkpO1xufVxuZnVuY3Rpb24gaW5pdGlhbGl6ZUluc3RhbmNlJCQxKHRhcmdldCkge1xuICAgIGlmICh0YXJnZXRbbW9ieERpZFJ1bkxhenlJbml0aWFsaXplcnNTeW1ib2wkJDFdID09PSB0cnVlKVxuICAgICAgICByZXR1cm47XG4gICAgdmFyIGRlY29yYXRvcnMgPSB0YXJnZXRbbW9ieFBlbmRpbmdEZWNvcmF0b3JzJCQxXTtcbiAgICBpZiAoZGVjb3JhdG9ycykge1xuICAgICAgICBhZGRIaWRkZW5Qcm9wJCQxKHRhcmdldCwgbW9ieERpZFJ1bkxhenlJbml0aWFsaXplcnNTeW1ib2wkJDEsIHRydWUpO1xuICAgICAgICBmb3IgKHZhciBrZXkgaW4gZGVjb3JhdG9ycykge1xuICAgICAgICAgICAgdmFyIGQgPSBkZWNvcmF0b3JzW2tleV07XG4gICAgICAgICAgICBkLnByb3BlcnR5Q3JlYXRvcih0YXJnZXQsIGQucHJvcCwgZC5kZXNjcmlwdG9yLCBkLmRlY29yYXRvclRhcmdldCwgZC5kZWNvcmF0b3JBcmd1bWVudHMpO1xuICAgICAgICB9XG4gICAgfVxufVxuZnVuY3Rpb24gY3JlYXRlUHJvcERlY29yYXRvciQkMShwcm9wZXJ0eUluaXRpYWxseUVudW1lcmFibGUsIHByb3BlcnR5Q3JlYXRvcikge1xuICAgIHJldHVybiBmdW5jdGlvbiBkZWNvcmF0b3JGYWN0b3J5KCkge1xuICAgICAgICB2YXIgZGVjb3JhdG9yQXJndW1lbnRzO1xuICAgICAgICB2YXIgZGVjb3JhdG9yID0gZnVuY3Rpb24gZGVjb3JhdGUkJDEodGFyZ2V0LCBwcm9wLCBkZXNjcmlwdG9yLCBhcHBseUltbWVkaWF0ZWx5XG4gICAgICAgIC8vIFRoaXMgaXMgYSBzcGVjaWFsIHBhcmFtZXRlciB0byBzaWduYWwgdGhlIGRpcmVjdCBhcHBsaWNhdGlvbiBvZiBhIGRlY29yYXRvciwgYWxsb3cgZXh0ZW5kT2JzZXJ2YWJsZSB0byBza2lwIHRoZSBlbnRpcmUgdHlwZSBkZWNvcmF0aW9uIHBhcnQsXG4gICAgICAgIC8vIGFzIHRoZSBpbnN0YW5jZSB0byBhcHBseSB0aGUgZGVjb3JhdG9yIHRvIGVxdWFscyB0aGUgdGFyZ2V0XG4gICAgICAgICkge1xuICAgICAgICAgICAgaWYgKGFwcGx5SW1tZWRpYXRlbHkgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBwcm9wZXJ0eUNyZWF0b3IodGFyZ2V0LCBwcm9wLCBkZXNjcmlwdG9yLCB0YXJnZXQsIGRlY29yYXRvckFyZ3VtZW50cyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiICYmICFxdWFja3NMaWtlQURlY29yYXRvciQkMShhcmd1bWVudHMpKVxuICAgICAgICAgICAgICAgIGZhaWwkJDEoXCJUaGlzIGZ1bmN0aW9uIGlzIGEgZGVjb3JhdG9yLCBidXQgaXQgd2Fzbid0IGludm9rZWQgbGlrZSBhIGRlY29yYXRvclwiKTtcbiAgICAgICAgICAgIGlmICghT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHRhcmdldCwgbW9ieFBlbmRpbmdEZWNvcmF0b3JzJCQxKSkge1xuICAgICAgICAgICAgICAgIHZhciBpbmhlcml0ZWREZWNvcmF0b3JzID0gdGFyZ2V0W21vYnhQZW5kaW5nRGVjb3JhdG9ycyQkMV07XG4gICAgICAgICAgICAgICAgYWRkSGlkZGVuUHJvcCQkMSh0YXJnZXQsIG1vYnhQZW5kaW5nRGVjb3JhdG9ycyQkMSwgX19hc3NpZ24oe30sIGluaGVyaXRlZERlY29yYXRvcnMpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRhcmdldFttb2J4UGVuZGluZ0RlY29yYXRvcnMkJDFdW3Byb3BdID0ge1xuICAgICAgICAgICAgICAgIHByb3A6IHByb3AsXG4gICAgICAgICAgICAgICAgcHJvcGVydHlDcmVhdG9yOiBwcm9wZXJ0eUNyZWF0b3IsXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRvcjogZGVzY3JpcHRvcixcbiAgICAgICAgICAgICAgICBkZWNvcmF0b3JUYXJnZXQ6IHRhcmdldCxcbiAgICAgICAgICAgICAgICBkZWNvcmF0b3JBcmd1bWVudHM6IGRlY29yYXRvckFyZ3VtZW50c1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHJldHVybiBjcmVhdGVQcm9wZXJ0eUluaXRpYWxpemVyRGVzY3JpcHRvcihwcm9wLCBwcm9wZXJ0eUluaXRpYWxseUVudW1lcmFibGUpO1xuICAgICAgICB9O1xuICAgICAgICBpZiAocXVhY2tzTGlrZUFEZWNvcmF0b3IkJDEoYXJndW1lbnRzKSkge1xuICAgICAgICAgICAgLy8gQGRlY29yYXRvclxuICAgICAgICAgICAgZGVjb3JhdG9yQXJndW1lbnRzID0gRU1QVFlfQVJSQVkkJDE7XG4gICAgICAgICAgICByZXR1cm4gZGVjb3JhdG9yLmFwcGx5KG51bGwsIGFyZ3VtZW50cyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyBAZGVjb3JhdG9yKGFyZ3MpXG4gICAgICAgICAgICBkZWNvcmF0b3JBcmd1bWVudHMgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpO1xuICAgICAgICAgICAgcmV0dXJuIGRlY29yYXRvcjtcbiAgICAgICAgfVxuICAgIH07XG59XG5mdW5jdGlvbiBxdWFja3NMaWtlQURlY29yYXRvciQkMShhcmdzKSB7XG4gICAgcmV0dXJuICgoKGFyZ3MubGVuZ3RoID09PSAyIHx8IGFyZ3MubGVuZ3RoID09PSAzKSAmJiB0eXBlb2YgYXJnc1sxXSA9PT0gXCJzdHJpbmdcIikgfHxcbiAgICAgICAgKGFyZ3MubGVuZ3RoID09PSA0ICYmIGFyZ3NbM10gPT09IHRydWUpKTtcbn1cblxuZnVuY3Rpb24gZGVlcEVuaGFuY2VyJCQxKHYsIF8sIG5hbWUpIHtcbiAgICAvLyBpdCBpcyBhbiBvYnNlcnZhYmxlIGFscmVhZHksIGRvbmVcbiAgICBpZiAoaXNPYnNlcnZhYmxlJCQxKHYpKVxuICAgICAgICByZXR1cm4gdjtcbiAgICAvLyBzb21ldGhpbmcgdGhhdCBjYW4gYmUgY29udmVydGVkIGFuZCBtdXRhdGVkP1xuICAgIGlmIChBcnJheS5pc0FycmF5KHYpKVxuICAgICAgICByZXR1cm4gb2JzZXJ2YWJsZSQkMS5hcnJheSh2LCB7IG5hbWU6IG5hbWUgfSk7XG4gICAgaWYgKGlzUGxhaW5PYmplY3QkJDEodikpXG4gICAgICAgIHJldHVybiBvYnNlcnZhYmxlJCQxLm9iamVjdCh2LCB1bmRlZmluZWQsIHsgbmFtZTogbmFtZSB9KTtcbiAgICBpZiAoaXNFUzZNYXAkJDEodikpXG4gICAgICAgIHJldHVybiBvYnNlcnZhYmxlJCQxLm1hcCh2LCB7IG5hbWU6IG5hbWUgfSk7XG4gICAgaWYgKGlzRVM2U2V0JCQxKHYpKVxuICAgICAgICByZXR1cm4gb2JzZXJ2YWJsZSQkMS5zZXQodiwgeyBuYW1lOiBuYW1lIH0pO1xuICAgIHJldHVybiB2O1xufVxuZnVuY3Rpb24gc2hhbGxvd0VuaGFuY2VyJCQxKHYsIF8sIG5hbWUpIHtcbiAgICBpZiAodiA9PT0gdW5kZWZpbmVkIHx8IHYgPT09IG51bGwpXG4gICAgICAgIHJldHVybiB2O1xuICAgIGlmIChpc09ic2VydmFibGVPYmplY3QkJDEodikgfHwgaXNPYnNlcnZhYmxlQXJyYXkkJDEodikgfHwgaXNPYnNlcnZhYmxlTWFwJCQxKHYpIHx8IGlzT2JzZXJ2YWJsZVNldCQkMSh2KSlcbiAgICAgICAgcmV0dXJuIHY7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkodikpXG4gICAgICAgIHJldHVybiBvYnNlcnZhYmxlJCQxLmFycmF5KHYsIHsgbmFtZTogbmFtZSwgZGVlcDogZmFsc2UgfSk7XG4gICAgaWYgKGlzUGxhaW5PYmplY3QkJDEodikpXG4gICAgICAgIHJldHVybiBvYnNlcnZhYmxlJCQxLm9iamVjdCh2LCB1bmRlZmluZWQsIHsgbmFtZTogbmFtZSwgZGVlcDogZmFsc2UgfSk7XG4gICAgaWYgKGlzRVM2TWFwJCQxKHYpKVxuICAgICAgICByZXR1cm4gb2JzZXJ2YWJsZSQkMS5tYXAodiwgeyBuYW1lOiBuYW1lLCBkZWVwOiBmYWxzZSB9KTtcbiAgICBpZiAoaXNFUzZTZXQkJDEodikpXG4gICAgICAgIHJldHVybiBvYnNlcnZhYmxlJCQxLnNldCh2LCB7IG5hbWU6IG5hbWUsIGRlZXA6IGZhbHNlIH0pO1xuICAgIHJldHVybiBmYWlsJCQxKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiAmJlxuICAgICAgICBcIlRoZSBzaGFsbG93IG1vZGlmaWVyIC8gZGVjb3JhdG9yIGNhbiBvbmx5IHVzZWQgaW4gY29tYmluYXRpb24gd2l0aCBhcnJheXMsIG9iamVjdHMsIG1hcHMgYW5kIHNldHNcIik7XG59XG5mdW5jdGlvbiByZWZlcmVuY2VFbmhhbmNlciQkMShuZXdWYWx1ZSkge1xuICAgIC8vIG5ldmVyIHR1cm4gaW50byBhbiBvYnNlcnZhYmxlXG4gICAgcmV0dXJuIG5ld1ZhbHVlO1xufVxuZnVuY3Rpb24gcmVmU3RydWN0RW5oYW5jZXIkJDEodiwgb2xkVmFsdWUsIG5hbWUpIHtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiICYmIGlzT2JzZXJ2YWJsZSQkMSh2KSlcbiAgICAgICAgdGhyb3cgXCJvYnNlcnZhYmxlLnN0cnVjdCBzaG91bGQgbm90IGJlIHVzZWQgd2l0aCBvYnNlcnZhYmxlIHZhbHVlc1wiO1xuICAgIGlmIChkZWVwRXF1YWwkJDEodiwgb2xkVmFsdWUpKVxuICAgICAgICByZXR1cm4gb2xkVmFsdWU7XG4gICAgcmV0dXJuIHY7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZURlY29yYXRvckZvckVuaGFuY2VyJCQxKGVuaGFuY2VyKSB7XG4gICAgaW52YXJpYW50JCQxKGVuaGFuY2VyKTtcbiAgICB2YXIgZGVjb3JhdG9yID0gY3JlYXRlUHJvcERlY29yYXRvciQkMSh0cnVlLCBmdW5jdGlvbiAodGFyZ2V0LCBwcm9wZXJ0eU5hbWUsIGRlc2NyaXB0b3IsIF9kZWNvcmF0b3JUYXJnZXQsIGRlY29yYXRvckFyZ3MpIHtcbiAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xuICAgICAgICAgICAgaW52YXJpYW50JCQxKCFkZXNjcmlwdG9yIHx8ICFkZXNjcmlwdG9yLmdldCwgXCJAb2JzZXJ2YWJsZSBjYW5ub3QgYmUgdXNlZCBvbiBnZXR0ZXIgKHByb3BlcnR5IFxcXCJcIiArIHByb3BlcnR5TmFtZSArIFwiXFxcIiksIHVzZSBAY29tcHV0ZWQgaW5zdGVhZC5cIik7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGluaXRpYWxWYWx1ZSA9IGRlc2NyaXB0b3JcbiAgICAgICAgICAgID8gZGVzY3JpcHRvci5pbml0aWFsaXplclxuICAgICAgICAgICAgICAgID8gZGVzY3JpcHRvci5pbml0aWFsaXplci5jYWxsKHRhcmdldClcbiAgICAgICAgICAgICAgICA6IGRlc2NyaXB0b3IudmFsdWVcbiAgICAgICAgICAgIDogdW5kZWZpbmVkO1xuICAgICAgICBhc09ic2VydmFibGVPYmplY3QkJDEodGFyZ2V0KS5hZGRPYnNlcnZhYmxlUHJvcChwcm9wZXJ0eU5hbWUsIGluaXRpYWxWYWx1ZSwgZW5oYW5jZXIpO1xuICAgIH0pO1xuICAgIHZhciByZXMgPSBcbiAgICAvLyBFeHRyYSBwcm9jZXNzIGNoZWNrcywgYXMgdGhpcyBoYXBwZW5zIGR1cmluZyBtb2R1bGUgaW5pdGlhbGl6YXRpb25cbiAgICB0eXBlb2YgcHJvY2VzcyAhPT0gXCJ1bmRlZmluZWRcIiAmJiBwcm9jZXNzLmVudiAmJiBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCJcbiAgICAgICAgPyBmdW5jdGlvbiBvYnNlcnZhYmxlRGVjb3JhdG9yKCkge1xuICAgICAgICAgICAgLy8gVGhpcyB3cmFwcGVyIGZ1bmN0aW9uIGlzIGp1c3QgdG8gZGV0ZWN0IGlsbGVnYWwgZGVjb3JhdG9yIGludm9jYXRpb25zLCBkZXByZWNhdGUgaW4gYSBuZXh0IHZlcnNpb25cbiAgICAgICAgICAgIC8vIGFuZCBzaW1wbHkgcmV0dXJuIHRoZSBjcmVhdGVkIHByb3AgZGVjb3JhdG9yXG4gICAgICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDIpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhaWwkJDEoXCJJbmNvcnJlY3QgZGVjb3JhdG9yIGludm9jYXRpb24uIEBvYnNlcnZhYmxlIGRlY29yYXRvciBkb2Vzbid0IGV4cGVjdCBhbnkgYXJndW1lbnRzXCIpO1xuICAgICAgICAgICAgcmV0dXJuIGRlY29yYXRvci5hcHBseShudWxsLCBhcmd1bWVudHMpO1xuICAgICAgICB9XG4gICAgICAgIDogZGVjb3JhdG9yO1xuICAgIHJlcy5lbmhhbmNlciA9IGVuaGFuY2VyO1xuICAgIHJldHVybiByZXM7XG59XG5cbi8vIFByZWRlZmluZWQgYmFncyBvZiBjcmVhdGUgb2JzZXJ2YWJsZSBvcHRpb25zLCB0byBhdm9pZCBhbGxvY2F0aW5nIHRlbXBvcmFyaWx5IG9wdGlvbiBvYmplY3RzXG4vLyBpbiB0aGUgbWFqb3JpdHkgb2YgY2FzZXNcbnZhciBkZWZhdWx0Q3JlYXRlT2JzZXJ2YWJsZU9wdGlvbnMkJDEgPSB7XG4gICAgZGVlcDogdHJ1ZSxcbiAgICBuYW1lOiB1bmRlZmluZWQsXG4gICAgZGVmYXVsdERlY29yYXRvcjogdW5kZWZpbmVkLFxuICAgIHByb3h5OiB0cnVlXG59O1xuT2JqZWN0LmZyZWV6ZShkZWZhdWx0Q3JlYXRlT2JzZXJ2YWJsZU9wdGlvbnMkJDEpO1xuZnVuY3Rpb24gYXNzZXJ0VmFsaWRPcHRpb24oa2V5KSB7XG4gICAgaWYgKCEvXihkZWVwfG5hbWV8ZXF1YWxzfGRlZmF1bHREZWNvcmF0b3J8cHJveHkpJC8udGVzdChrZXkpKVxuICAgICAgICBmYWlsJCQxKFwiaW52YWxpZCBvcHRpb24gZm9yIChleHRlbmQpb2JzZXJ2YWJsZTogXCIgKyBrZXkpO1xufVxuZnVuY3Rpb24gYXNDcmVhdGVPYnNlcnZhYmxlT3B0aW9ucyQkMSh0aGluZykge1xuICAgIGlmICh0aGluZyA9PT0gbnVsbCB8fCB0aGluZyA9PT0gdW5kZWZpbmVkKVxuICAgICAgICByZXR1cm4gZGVmYXVsdENyZWF0ZU9ic2VydmFibGVPcHRpb25zJCQxO1xuICAgIGlmICh0eXBlb2YgdGhpbmcgPT09IFwic3RyaW5nXCIpXG4gICAgICAgIHJldHVybiB7IG5hbWU6IHRoaW5nLCBkZWVwOiB0cnVlLCBwcm94eTogdHJ1ZSB9O1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiB0aGluZyAhPT0gXCJvYmplY3RcIilcbiAgICAgICAgICAgIHJldHVybiBmYWlsJCQxKFwiZXhwZWN0ZWQgb3B0aW9ucyBvYmplY3RcIik7XG4gICAgICAgIE9iamVjdC5rZXlzKHRoaW5nKS5mb3JFYWNoKGFzc2VydFZhbGlkT3B0aW9uKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaW5nO1xufVxudmFyIGRlZXBEZWNvcmF0b3IkJDEgPSBjcmVhdGVEZWNvcmF0b3JGb3JFbmhhbmNlciQkMShkZWVwRW5oYW5jZXIkJDEpO1xudmFyIHNoYWxsb3dEZWNvcmF0b3IgPSBjcmVhdGVEZWNvcmF0b3JGb3JFbmhhbmNlciQkMShzaGFsbG93RW5oYW5jZXIkJDEpO1xudmFyIHJlZkRlY29yYXRvciQkMSA9IGNyZWF0ZURlY29yYXRvckZvckVuaGFuY2VyJCQxKHJlZmVyZW5jZUVuaGFuY2VyJCQxKTtcbnZhciByZWZTdHJ1Y3REZWNvcmF0b3IgPSBjcmVhdGVEZWNvcmF0b3JGb3JFbmhhbmNlciQkMShyZWZTdHJ1Y3RFbmhhbmNlciQkMSk7XG5mdW5jdGlvbiBnZXRFbmhhbmNlckZyb21PcHRpb25zKG9wdGlvbnMpIHtcbiAgICByZXR1cm4gb3B0aW9ucy5kZWZhdWx0RGVjb3JhdG9yXG4gICAgICAgID8gb3B0aW9ucy5kZWZhdWx0RGVjb3JhdG9yLmVuaGFuY2VyXG4gICAgICAgIDogb3B0aW9ucy5kZWVwID09PSBmYWxzZVxuICAgICAgICAgICAgPyByZWZlcmVuY2VFbmhhbmNlciQkMVxuICAgICAgICAgICAgOiBkZWVwRW5oYW5jZXIkJDE7XG59XG4vKipcbiAqIFR1cm5zIGFuIG9iamVjdCwgYXJyYXkgb3IgZnVuY3Rpb24gaW50byBhIHJlYWN0aXZlIHN0cnVjdHVyZS5cbiAqIEBwYXJhbSB2IHRoZSB2YWx1ZSB3aGljaCBzaG91bGQgYmVjb21lIG9ic2VydmFibGUuXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZU9ic2VydmFibGUodiwgYXJnMiwgYXJnMykge1xuICAgIC8vIEBvYnNlcnZhYmxlIHNvbWVQcm9wO1xuICAgIGlmICh0eXBlb2YgYXJndW1lbnRzWzFdID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIHJldHVybiBkZWVwRGVjb3JhdG9yJCQxLmFwcGx5KG51bGwsIGFyZ3VtZW50cyk7XG4gICAgfVxuICAgIC8vIGl0IGlzIGFuIG9ic2VydmFibGUgYWxyZWFkeSwgZG9uZVxuICAgIGlmIChpc09ic2VydmFibGUkJDEodikpXG4gICAgICAgIHJldHVybiB2O1xuICAgIC8vIHNvbWV0aGluZyB0aGF0IGNhbiBiZSBjb252ZXJ0ZWQgYW5kIG11dGF0ZWQ/XG4gICAgdmFyIHJlcyA9IGlzUGxhaW5PYmplY3QkJDEodilcbiAgICAgICAgPyBvYnNlcnZhYmxlJCQxLm9iamVjdCh2LCBhcmcyLCBhcmczKVxuICAgICAgICA6IEFycmF5LmlzQXJyYXkodilcbiAgICAgICAgICAgID8gb2JzZXJ2YWJsZSQkMS5hcnJheSh2LCBhcmcyKVxuICAgICAgICAgICAgOiBpc0VTNk1hcCQkMSh2KVxuICAgICAgICAgICAgICAgID8gb2JzZXJ2YWJsZSQkMS5tYXAodiwgYXJnMilcbiAgICAgICAgICAgICAgICA6IGlzRVM2U2V0JCQxKHYpXG4gICAgICAgICAgICAgICAgICAgID8gb2JzZXJ2YWJsZSQkMS5zZXQodiwgYXJnMilcbiAgICAgICAgICAgICAgICAgICAgOiB2O1xuICAgIC8vIHRoaXMgdmFsdWUgY291bGQgYmUgY29udmVydGVkIHRvIGEgbmV3IG9ic2VydmFibGUgZGF0YSBzdHJ1Y3R1cmUsIHJldHVybiBpdFxuICAgIGlmIChyZXMgIT09IHYpXG4gICAgICAgIHJldHVybiByZXM7XG4gICAgLy8gb3RoZXJ3aXNlLCBqdXN0IGJveCBpdFxuICAgIGZhaWwkJDEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiICYmXG4gICAgICAgIFwiVGhlIHByb3ZpZGVkIHZhbHVlIGNvdWxkIG5vdCBiZSBjb252ZXJ0ZWQgaW50byBhbiBvYnNlcnZhYmxlLiBJZiB5b3Ugd2FudCBqdXN0IGNyZWF0ZSBhbiBvYnNlcnZhYmxlIHJlZmVyZW5jZSB0byB0aGUgb2JqZWN0IHVzZSAnb2JzZXJ2YWJsZS5ib3godmFsdWUpJ1wiKTtcbn1cbnZhciBvYnNlcnZhYmxlRmFjdG9yaWVzID0ge1xuICAgIGJveDogZnVuY3Rpb24gKHZhbHVlLCBvcHRpb25zKSB7XG4gICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMilcbiAgICAgICAgICAgIGluY29ycmVjdGx5VXNlZEFzRGVjb3JhdG9yKFwiYm94XCIpO1xuICAgICAgICB2YXIgbyA9IGFzQ3JlYXRlT2JzZXJ2YWJsZU9wdGlvbnMkJDEob3B0aW9ucyk7XG4gICAgICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZVZhbHVlJCQxKHZhbHVlLCBnZXRFbmhhbmNlckZyb21PcHRpb25zKG8pLCBvLm5hbWUsIHRydWUsIG8uZXF1YWxzKTtcbiAgICB9LFxuICAgIGFycmF5OiBmdW5jdGlvbiAoaW5pdGlhbFZhbHVlcywgb3B0aW9ucykge1xuICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDIpXG4gICAgICAgICAgICBpbmNvcnJlY3RseVVzZWRBc0RlY29yYXRvcihcImFycmF5XCIpO1xuICAgICAgICB2YXIgbyA9IGFzQ3JlYXRlT2JzZXJ2YWJsZU9wdGlvbnMkJDEob3B0aW9ucyk7XG4gICAgICAgIHJldHVybiBjcmVhdGVPYnNlcnZhYmxlQXJyYXkkJDEoaW5pdGlhbFZhbHVlcywgZ2V0RW5oYW5jZXJGcm9tT3B0aW9ucyhvKSwgby5uYW1lKTtcbiAgICB9LFxuICAgIG1hcDogZnVuY3Rpb24gKGluaXRpYWxWYWx1ZXMsIG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAyKVxuICAgICAgICAgICAgaW5jb3JyZWN0bHlVc2VkQXNEZWNvcmF0b3IoXCJtYXBcIik7XG4gICAgICAgIHZhciBvID0gYXNDcmVhdGVPYnNlcnZhYmxlT3B0aW9ucyQkMShvcHRpb25zKTtcbiAgICAgICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlTWFwJCQxKGluaXRpYWxWYWx1ZXMsIGdldEVuaGFuY2VyRnJvbU9wdGlvbnMobyksIG8ubmFtZSk7XG4gICAgfSxcbiAgICBzZXQ6IGZ1bmN0aW9uIChpbml0aWFsVmFsdWVzLCBvcHRpb25zKSB7XG4gICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMilcbiAgICAgICAgICAgIGluY29ycmVjdGx5VXNlZEFzRGVjb3JhdG9yKFwic2V0XCIpO1xuICAgICAgICB2YXIgbyA9IGFzQ3JlYXRlT2JzZXJ2YWJsZU9wdGlvbnMkJDEob3B0aW9ucyk7XG4gICAgICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZVNldCQkMShpbml0aWFsVmFsdWVzLCBnZXRFbmhhbmNlckZyb21PcHRpb25zKG8pLCBvLm5hbWUpO1xuICAgIH0sXG4gICAgb2JqZWN0OiBmdW5jdGlvbiAocHJvcHMsIGRlY29yYXRvcnMsIG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBhcmd1bWVudHNbMV0gPT09IFwic3RyaW5nXCIpXG4gICAgICAgICAgICBpbmNvcnJlY3RseVVzZWRBc0RlY29yYXRvcihcIm9iamVjdFwiKTtcbiAgICAgICAgdmFyIG8gPSBhc0NyZWF0ZU9ic2VydmFibGVPcHRpb25zJCQxKG9wdGlvbnMpO1xuICAgICAgICBpZiAoby5wcm94eSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHJldHVybiBleHRlbmRPYnNlcnZhYmxlJCQxKHt9LCBwcm9wcywgZGVjb3JhdG9ycywgbyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB2YXIgZGVmYXVsdERlY29yYXRvciA9IGdldERlZmF1bHREZWNvcmF0b3JGcm9tT2JqZWN0T3B0aW9ucyQkMShvKTtcbiAgICAgICAgICAgIHZhciBiYXNlID0gZXh0ZW5kT2JzZXJ2YWJsZSQkMSh7fSwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIG8pO1xuICAgICAgICAgICAgdmFyIHByb3h5ID0gY3JlYXRlRHluYW1pY09ic2VydmFibGVPYmplY3QkJDEoYmFzZSk7XG4gICAgICAgICAgICBleHRlbmRPYnNlcnZhYmxlT2JqZWN0V2l0aFByb3BlcnRpZXMkJDEocHJveHksIHByb3BzLCBkZWNvcmF0b3JzLCBkZWZhdWx0RGVjb3JhdG9yKTtcbiAgICAgICAgICAgIHJldHVybiBwcm94eTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgcmVmOiByZWZEZWNvcmF0b3IkJDEsXG4gICAgc2hhbGxvdzogc2hhbGxvd0RlY29yYXRvcixcbiAgICBkZWVwOiBkZWVwRGVjb3JhdG9yJCQxLFxuICAgIHN0cnVjdDogcmVmU3RydWN0RGVjb3JhdG9yXG59O1xudmFyIG9ic2VydmFibGUkJDEgPSBjcmVhdGVPYnNlcnZhYmxlO1xuLy8gd2VpcmQgdHJpY2sgdG8ga2VlcCBvdXIgdHlwaW5ncyBuaWNlbHkgd2l0aCBvdXIgZnVuY3MsIGFuZCBzdGlsbCBleHRlbmQgdGhlIG9ic2VydmFibGUgZnVuY3Rpb25cbk9iamVjdC5rZXlzKG9ic2VydmFibGVGYWN0b3JpZXMpLmZvckVhY2goZnVuY3Rpb24gKG5hbWUpIHsgcmV0dXJuIChvYnNlcnZhYmxlJCQxW25hbWVdID0gb2JzZXJ2YWJsZUZhY3Rvcmllc1tuYW1lXSk7IH0pO1xuZnVuY3Rpb24gaW5jb3JyZWN0bHlVc2VkQXNEZWNvcmF0b3IobWV0aG9kTmFtZSkge1xuICAgIGZhaWwkJDEoXG4gICAgLy8gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiICYmXG4gICAgXCJFeHBlY3RlZCBvbmUgb3IgdHdvIGFyZ3VtZW50cyB0byBvYnNlcnZhYmxlLlwiICsgbWV0aG9kTmFtZSArIFwiLiBEaWQgeW91IGFjY2lkZW50YWxseSB0cnkgdG8gdXNlIG9ic2VydmFibGUuXCIgKyBtZXRob2ROYW1lICsgXCIgYXMgZGVjb3JhdG9yP1wiKTtcbn1cblxudmFyIGNvbXB1dGVkRGVjb3JhdG9yJCQxID0gY3JlYXRlUHJvcERlY29yYXRvciQkMShmYWxzZSwgZnVuY3Rpb24gKGluc3RhbmNlLCBwcm9wZXJ0eU5hbWUsIGRlc2NyaXB0b3IsIGRlY29yYXRvclRhcmdldCwgZGVjb3JhdG9yQXJncykge1xuICAgIHZhciBnZXQkJDEgPSBkZXNjcmlwdG9yLmdldCwgc2V0JCQxID0gZGVzY3JpcHRvci5zZXQ7IC8vIGluaXRpYWxWYWx1ZSBpcyB0aGUgZGVzY3JpcHRvciBmb3IgZ2V0IC8gc2V0IHByb3BzXG4gICAgLy8gT3B0aW1pemF0aW9uOiBmYXN0ZXIgb24gZGVjb3JhdG9yIHRhcmdldCBvciBpbnN0YW5jZT8gQXNzdW1pbmcgdGFyZ2V0XG4gICAgLy8gT3B0aW1pemF0aW9uOiBmaW5kIG91dCBpZiBkZWNsYXJpbmcgb24gaW5zdGFuY2UgaXNuJ3QganVzdCBmYXN0ZXIuIChhbHNvIG1ha2VzIHRoZSBwcm9wZXJ0eSBkZXNjcmlwdG9yIHNpbXBsZXIpLiBCdXQsIG1vcmUgbWVtb3J5IHVzYWdlLi5cbiAgICAvLyBGb3JjaW5nIGluc3RhbmNlIG5vdywgZml4ZXMgaG90IHJlbG9hZGlnIGlzc3VlcyBvbiBSZWFjdCBOYXRpdmU6XG4gICAgdmFyIG9wdGlvbnMgPSBkZWNvcmF0b3JBcmdzWzBdIHx8IHt9O1xuICAgIGFzT2JzZXJ2YWJsZU9iamVjdCQkMShpbnN0YW5jZSkuYWRkQ29tcHV0ZWRQcm9wKGluc3RhbmNlLCBwcm9wZXJ0eU5hbWUsIF9fYXNzaWduKHsgZ2V0OiBnZXQkJDEsXG4gICAgICAgIHNldDogc2V0JCQxLCBjb250ZXh0OiBpbnN0YW5jZSB9LCBvcHRpb25zKSk7XG59KTtcbnZhciBjb21wdXRlZFN0cnVjdERlY29yYXRvciA9IGNvbXB1dGVkRGVjb3JhdG9yJCQxKHsgZXF1YWxzOiBjb21wYXJlciQkMS5zdHJ1Y3R1cmFsIH0pO1xuLyoqXG4gKiBEZWNvcmF0b3IgZm9yIGNsYXNzIHByb3BlcnRpZXM6IEBjb21wdXRlZCBnZXQgdmFsdWUoKSB7IHJldHVybiBleHByOyB9LlxuICogRm9yIGxlZ2FjeSBwdXJwb3NlcyBhbHNvIGludm9rYWJsZSBhcyBFUzUgb2JzZXJ2YWJsZSBjcmVhdGVkOiBgY29tcHV0ZWQoKCkgPT4gZXhwcilgO1xuICovXG52YXIgY29tcHV0ZWQkJDEgPSBmdW5jdGlvbiBjb21wdXRlZCQkMShhcmcxLCBhcmcyLCBhcmczKSB7XG4gICAgaWYgKHR5cGVvZiBhcmcyID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIC8vIEBjb21wdXRlZFxuICAgICAgICByZXR1cm4gY29tcHV0ZWREZWNvcmF0b3IkJDEuYXBwbHkobnVsbCwgYXJndW1lbnRzKTtcbiAgICB9XG4gICAgaWYgKGFyZzEgIT09IG51bGwgJiYgdHlwZW9mIGFyZzEgPT09IFwib2JqZWN0XCIgJiYgYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAvLyBAY29tcHV0ZWQoeyBvcHRpb25zIH0pXG4gICAgICAgIHJldHVybiBjb21wdXRlZERlY29yYXRvciQkMS5hcHBseShudWxsLCBhcmd1bWVudHMpO1xuICAgIH1cbiAgICAvLyBjb21wdXRlZChleHByLCBvcHRpb25zPylcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gICAgICAgIGludmFyaWFudCQkMSh0eXBlb2YgYXJnMSA9PT0gXCJmdW5jdGlvblwiLCBcIkZpcnN0IGFyZ3VtZW50IHRvIGBjb21wdXRlZGAgc2hvdWxkIGJlIGFuIGV4cHJlc3Npb24uXCIpO1xuICAgICAgICBpbnZhcmlhbnQkJDEoYXJndW1lbnRzLmxlbmd0aCA8IDMsIFwiQ29tcHV0ZWQgdGFrZXMgb25lIG9yIHR3byBhcmd1bWVudHMgaWYgdXNlZCBhcyBmdW5jdGlvblwiKTtcbiAgICB9XG4gICAgdmFyIG9wdHMgPSB0eXBlb2YgYXJnMiA9PT0gXCJvYmplY3RcIiA/IGFyZzIgOiB7fTtcbiAgICBvcHRzLmdldCA9IGFyZzE7XG4gICAgb3B0cy5zZXQgPSB0eXBlb2YgYXJnMiA9PT0gXCJmdW5jdGlvblwiID8gYXJnMiA6IG9wdHMuc2V0O1xuICAgIG9wdHMubmFtZSA9IG9wdHMubmFtZSB8fCBhcmcxLm5hbWUgfHwgXCJcIjsgLyogZm9yIGdlbmVyYXRlZCBuYW1lICovXG4gICAgcmV0dXJuIG5ldyBDb21wdXRlZFZhbHVlJCQxKG9wdHMpO1xufTtcbmNvbXB1dGVkJCQxLnN0cnVjdCA9IGNvbXB1dGVkU3RydWN0RGVjb3JhdG9yO1xuXG5mdW5jdGlvbiBjcmVhdGVBY3Rpb24kJDEoYWN0aW9uTmFtZSwgZm4pIHtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gICAgICAgIGludmFyaWFudCQkMSh0eXBlb2YgZm4gPT09IFwiZnVuY3Rpb25cIiwgXCJgYWN0aW9uYCBjYW4gb25seSBiZSBpbnZva2VkIG9uIGZ1bmN0aW9uc1wiKTtcbiAgICAgICAgaWYgKHR5cGVvZiBhY3Rpb25OYW1lICE9PSBcInN0cmluZ1wiIHx8ICFhY3Rpb25OYW1lKVxuICAgICAgICAgICAgZmFpbCQkMShcImFjdGlvbnMgc2hvdWxkIGhhdmUgdmFsaWQgbmFtZXMsIGdvdDogJ1wiICsgYWN0aW9uTmFtZSArIFwiJ1wiKTtcbiAgICB9XG4gICAgdmFyIHJlcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGV4ZWN1dGVBY3Rpb24kJDEoYWN0aW9uTmFtZSwgZm4sIHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfTtcbiAgICByZXMuaXNNb2J4QWN0aW9uID0gdHJ1ZTtcbiAgICByZXR1cm4gcmVzO1xufVxuZnVuY3Rpb24gZXhlY3V0ZUFjdGlvbiQkMShhY3Rpb25OYW1lLCBmbiwgc2NvcGUsIGFyZ3MpIHtcbiAgICB2YXIgcnVuSW5mbyA9IHN0YXJ0QWN0aW9uKGFjdGlvbk5hbWUsIGZuLCBzY29wZSwgYXJncyk7XG4gICAgdmFyIHNob3VsZFN1cHJlc3NSZWFjdGlvbkVycm9yID0gdHJ1ZTtcbiAgICB0cnkge1xuICAgICAgICB2YXIgcmVzID0gZm4uYXBwbHkoc2NvcGUsIGFyZ3MpO1xuICAgICAgICBzaG91bGRTdXByZXNzUmVhY3Rpb25FcnJvciA9IGZhbHNlO1xuICAgICAgICByZXR1cm4gcmVzO1xuICAgIH1cbiAgICBmaW5hbGx5IHtcbiAgICAgICAgaWYgKHNob3VsZFN1cHJlc3NSZWFjdGlvbkVycm9yKSB7XG4gICAgICAgICAgICBnbG9iYWxTdGF0ZSQkMS5zdXBwcmVzc1JlYWN0aW9uRXJyb3JzID0gc2hvdWxkU3VwcmVzc1JlYWN0aW9uRXJyb3I7XG4gICAgICAgICAgICBlbmRBY3Rpb24ocnVuSW5mbyk7XG4gICAgICAgICAgICBnbG9iYWxTdGF0ZSQkMS5zdXBwcmVzc1JlYWN0aW9uRXJyb3JzID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBlbmRBY3Rpb24ocnVuSW5mbyk7XG4gICAgICAgIH1cbiAgICB9XG59XG5mdW5jdGlvbiBzdGFydEFjdGlvbihhY3Rpb25OYW1lLCBmbiwgc2NvcGUsIGFyZ3MpIHtcbiAgICB2YXIgbm90aWZ5U3B5ID0gaXNTcHlFbmFibGVkJCQxKCkgJiYgISFhY3Rpb25OYW1lO1xuICAgIHZhciBzdGFydFRpbWUgPSAwO1xuICAgIGlmIChub3RpZnlTcHkgJiYgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gICAgICAgIHN0YXJ0VGltZSA9IERhdGUubm93KCk7XG4gICAgICAgIHZhciBsID0gKGFyZ3MgJiYgYXJncy5sZW5ndGgpIHx8IDA7XG4gICAgICAgIHZhciBmbGF0dGVuZEFyZ3MgPSBuZXcgQXJyYXkobCk7XG4gICAgICAgIGlmIChsID4gMClcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbDsgaSsrKVxuICAgICAgICAgICAgICAgIGZsYXR0ZW5kQXJnc1tpXSA9IGFyZ3NbaV07XG4gICAgICAgIHNweVJlcG9ydFN0YXJ0JCQxKHtcbiAgICAgICAgICAgIHR5cGU6IFwiYWN0aW9uXCIsXG4gICAgICAgICAgICBuYW1lOiBhY3Rpb25OYW1lLFxuICAgICAgICAgICAgb2JqZWN0OiBzY29wZSxcbiAgICAgICAgICAgIGFyZ3VtZW50czogZmxhdHRlbmRBcmdzXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICB2YXIgcHJldkRlcml2YXRpb24gPSB1bnRyYWNrZWRTdGFydCQkMSgpO1xuICAgIHN0YXJ0QmF0Y2gkJDEoKTtcbiAgICB2YXIgcHJldkFsbG93U3RhdGVDaGFuZ2VzID0gYWxsb3dTdGF0ZUNoYW5nZXNTdGFydCQkMSh0cnVlKTtcbiAgICByZXR1cm4ge1xuICAgICAgICBwcmV2RGVyaXZhdGlvbjogcHJldkRlcml2YXRpb24sXG4gICAgICAgIHByZXZBbGxvd1N0YXRlQ2hhbmdlczogcHJldkFsbG93U3RhdGVDaGFuZ2VzLFxuICAgICAgICBub3RpZnlTcHk6IG5vdGlmeVNweSxcbiAgICAgICAgc3RhcnRUaW1lOiBzdGFydFRpbWVcbiAgICB9O1xufVxuZnVuY3Rpb24gZW5kQWN0aW9uKHJ1bkluZm8pIHtcbiAgICBhbGxvd1N0YXRlQ2hhbmdlc0VuZCQkMShydW5JbmZvLnByZXZBbGxvd1N0YXRlQ2hhbmdlcyk7XG4gICAgZW5kQmF0Y2gkJDEoKTtcbiAgICB1bnRyYWNrZWRFbmQkJDEocnVuSW5mby5wcmV2RGVyaXZhdGlvbik7XG4gICAgaWYgKHJ1bkluZm8ubm90aWZ5U3B5ICYmIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIilcbiAgICAgICAgc3B5UmVwb3J0RW5kJCQxKHsgdGltZTogRGF0ZS5ub3coKSAtIHJ1bkluZm8uc3RhcnRUaW1lIH0pO1xufVxuZnVuY3Rpb24gYWxsb3dTdGF0ZUNoYW5nZXMkJDEoYWxsb3dTdGF0ZUNoYW5nZXMkJDEsIGZ1bmMpIHtcbiAgICB2YXIgcHJldiA9IGFsbG93U3RhdGVDaGFuZ2VzU3RhcnQkJDEoYWxsb3dTdGF0ZUNoYW5nZXMkJDEpO1xuICAgIHZhciByZXM7XG4gICAgdHJ5IHtcbiAgICAgICAgcmVzID0gZnVuYygpO1xuICAgIH1cbiAgICBmaW5hbGx5IHtcbiAgICAgICAgYWxsb3dTdGF0ZUNoYW5nZXNFbmQkJDEocHJldik7XG4gICAgfVxuICAgIHJldHVybiByZXM7XG59XG5mdW5jdGlvbiBhbGxvd1N0YXRlQ2hhbmdlc1N0YXJ0JCQxKGFsbG93U3RhdGVDaGFuZ2VzJCQxKSB7XG4gICAgdmFyIHByZXYgPSBnbG9iYWxTdGF0ZSQkMS5hbGxvd1N0YXRlQ2hhbmdlcztcbiAgICBnbG9iYWxTdGF0ZSQkMS5hbGxvd1N0YXRlQ2hhbmdlcyA9IGFsbG93U3RhdGVDaGFuZ2VzJCQxO1xuICAgIHJldHVybiBwcmV2O1xufVxuZnVuY3Rpb24gYWxsb3dTdGF0ZUNoYW5nZXNFbmQkJDEocHJldikge1xuICAgIGdsb2JhbFN0YXRlJCQxLmFsbG93U3RhdGVDaGFuZ2VzID0gcHJldjtcbn1cbmZ1bmN0aW9uIGFsbG93U3RhdGVDaGFuZ2VzSW5zaWRlQ29tcHV0ZWQkJDEoZnVuYykge1xuICAgIHZhciBwcmV2ID0gZ2xvYmFsU3RhdGUkJDEuY29tcHV0YXRpb25EZXB0aDtcbiAgICBnbG9iYWxTdGF0ZSQkMS5jb21wdXRhdGlvbkRlcHRoID0gMDtcbiAgICB2YXIgcmVzO1xuICAgIHRyeSB7XG4gICAgICAgIHJlcyA9IGZ1bmMoKTtcbiAgICB9XG4gICAgZmluYWxseSB7XG4gICAgICAgIGdsb2JhbFN0YXRlJCQxLmNvbXB1dGF0aW9uRGVwdGggPSBwcmV2O1xuICAgIH1cbiAgICByZXR1cm4gcmVzO1xufVxuXG52YXIgT2JzZXJ2YWJsZVZhbHVlJCQxID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhPYnNlcnZhYmxlVmFsdWUkJDEsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gT2JzZXJ2YWJsZVZhbHVlJCQxKHZhbHVlLCBlbmhhbmNlciwgbmFtZSwgbm90aWZ5U3B5LCBlcXVhbHMpIHtcbiAgICAgICAgaWYgKG5hbWUgPT09IHZvaWQgMCkgeyBuYW1lID0gXCJPYnNlcnZhYmxlVmFsdWVAXCIgKyBnZXROZXh0SWQkJDEoKTsgfVxuICAgICAgICBpZiAobm90aWZ5U3B5ID09PSB2b2lkIDApIHsgbm90aWZ5U3B5ID0gdHJ1ZTsgfVxuICAgICAgICBpZiAoZXF1YWxzID09PSB2b2lkIDApIHsgZXF1YWxzID0gY29tcGFyZXIkJDEuZGVmYXVsdDsgfVxuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCBuYW1lKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy5lbmhhbmNlciA9IGVuaGFuY2VyO1xuICAgICAgICBfdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgX3RoaXMuZXF1YWxzID0gZXF1YWxzO1xuICAgICAgICBfdGhpcy5oYXNVbnJlcG9ydGVkQ2hhbmdlID0gZmFsc2U7XG4gICAgICAgIF90aGlzLnZhbHVlID0gZW5oYW5jZXIodmFsdWUsIHVuZGVmaW5lZCwgbmFtZSk7XG4gICAgICAgIGlmIChub3RpZnlTcHkgJiYgaXNTcHlFbmFibGVkJCQxKCkgJiYgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gICAgICAgICAgICAvLyBvbmx5IG5vdGlmeSBzcHkgaWYgdGhpcyBpcyBhIHN0YW5kLWFsb25lIG9ic2VydmFibGVcbiAgICAgICAgICAgIHNweVJlcG9ydCQkMSh7IHR5cGU6IFwiY3JlYXRlXCIsIG5hbWU6IF90aGlzLm5hbWUsIG5ld1ZhbHVlOiBcIlwiICsgX3RoaXMudmFsdWUgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICBPYnNlcnZhYmxlVmFsdWUkJDEucHJvdG90eXBlLmRlaGFuY2VWYWx1ZSA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICBpZiAodGhpcy5kZWhhbmNlciAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGVoYW5jZXIodmFsdWUpO1xuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfTtcbiAgICBPYnNlcnZhYmxlVmFsdWUkJDEucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uIChuZXdWYWx1ZSkge1xuICAgICAgICB2YXIgb2xkVmFsdWUgPSB0aGlzLnZhbHVlO1xuICAgICAgICBuZXdWYWx1ZSA9IHRoaXMucHJlcGFyZU5ld1ZhbHVlKG5ld1ZhbHVlKTtcbiAgICAgICAgaWYgKG5ld1ZhbHVlICE9PSBnbG9iYWxTdGF0ZSQkMS5VTkNIQU5HRUQpIHtcbiAgICAgICAgICAgIHZhciBub3RpZnlTcHkgPSBpc1NweUVuYWJsZWQkJDEoKTtcbiAgICAgICAgICAgIGlmIChub3RpZnlTcHkgJiYgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gICAgICAgICAgICAgICAgc3B5UmVwb3J0U3RhcnQkJDEoe1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcInVwZGF0ZVwiLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiB0aGlzLm5hbWUsXG4gICAgICAgICAgICAgICAgICAgIG5ld1ZhbHVlOiBuZXdWYWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgb2xkVmFsdWU6IG9sZFZhbHVlXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnNldE5ld1ZhbHVlKG5ld1ZhbHVlKTtcbiAgICAgICAgICAgIGlmIChub3RpZnlTcHkgJiYgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKVxuICAgICAgICAgICAgICAgIHNweVJlcG9ydEVuZCQkMSgpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBPYnNlcnZhYmxlVmFsdWUkJDEucHJvdG90eXBlLnByZXBhcmVOZXdWYWx1ZSA9IGZ1bmN0aW9uIChuZXdWYWx1ZSkge1xuICAgICAgICBjaGVja0lmU3RhdGVNb2RpZmljYXRpb25zQXJlQWxsb3dlZCQkMSh0aGlzKTtcbiAgICAgICAgaWYgKGhhc0ludGVyY2VwdG9ycyQkMSh0aGlzKSkge1xuICAgICAgICAgICAgdmFyIGNoYW5nZSA9IGludGVyY2VwdENoYW5nZSQkMSh0aGlzLCB7XG4gICAgICAgICAgICAgICAgb2JqZWN0OiB0aGlzLFxuICAgICAgICAgICAgICAgIHR5cGU6IFwidXBkYXRlXCIsXG4gICAgICAgICAgICAgICAgbmV3VmFsdWU6IG5ld1ZhbHVlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmICghY2hhbmdlKVxuICAgICAgICAgICAgICAgIHJldHVybiBnbG9iYWxTdGF0ZSQkMS5VTkNIQU5HRUQ7XG4gICAgICAgICAgICBuZXdWYWx1ZSA9IGNoYW5nZS5uZXdWYWx1ZTtcbiAgICAgICAgfVxuICAgICAgICAvLyBhcHBseSBtb2RpZmllclxuICAgICAgICBuZXdWYWx1ZSA9IHRoaXMuZW5oYW5jZXIobmV3VmFsdWUsIHRoaXMudmFsdWUsIHRoaXMubmFtZSk7XG4gICAgICAgIHJldHVybiB0aGlzLmVxdWFscyh0aGlzLnZhbHVlLCBuZXdWYWx1ZSkgPyBnbG9iYWxTdGF0ZSQkMS5VTkNIQU5HRUQgOiBuZXdWYWx1ZTtcbiAgICB9O1xuICAgIE9ic2VydmFibGVWYWx1ZSQkMS5wcm90b3R5cGUuc2V0TmV3VmFsdWUgPSBmdW5jdGlvbiAobmV3VmFsdWUpIHtcbiAgICAgICAgdmFyIG9sZFZhbHVlID0gdGhpcy52YWx1ZTtcbiAgICAgICAgdGhpcy52YWx1ZSA9IG5ld1ZhbHVlO1xuICAgICAgICB0aGlzLnJlcG9ydENoYW5nZWQoKTtcbiAgICAgICAgaWYgKGhhc0xpc3RlbmVycyQkMSh0aGlzKSkge1xuICAgICAgICAgICAgbm90aWZ5TGlzdGVuZXJzJCQxKHRoaXMsIHtcbiAgICAgICAgICAgICAgICB0eXBlOiBcInVwZGF0ZVwiLFxuICAgICAgICAgICAgICAgIG9iamVjdDogdGhpcyxcbiAgICAgICAgICAgICAgICBuZXdWYWx1ZTogbmV3VmFsdWUsXG4gICAgICAgICAgICAgICAgb2xkVmFsdWU6IG9sZFZhbHVlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgT2JzZXJ2YWJsZVZhbHVlJCQxLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMucmVwb3J0T2JzZXJ2ZWQoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGVoYW5jZVZhbHVlKHRoaXMudmFsdWUpO1xuICAgIH07XG4gICAgT2JzZXJ2YWJsZVZhbHVlJCQxLnByb3RvdHlwZS5pbnRlcmNlcHQgPSBmdW5jdGlvbiAoaGFuZGxlcikge1xuICAgICAgICByZXR1cm4gcmVnaXN0ZXJJbnRlcmNlcHRvciQkMSh0aGlzLCBoYW5kbGVyKTtcbiAgICB9O1xuICAgIE9ic2VydmFibGVWYWx1ZSQkMS5wcm90b3R5cGUub2JzZXJ2ZSA9IGZ1bmN0aW9uIChsaXN0ZW5lciwgZmlyZUltbWVkaWF0ZWx5KSB7XG4gICAgICAgIGlmIChmaXJlSW1tZWRpYXRlbHkpXG4gICAgICAgICAgICBsaXN0ZW5lcih7XG4gICAgICAgICAgICAgICAgb2JqZWN0OiB0aGlzLFxuICAgICAgICAgICAgICAgIHR5cGU6IFwidXBkYXRlXCIsXG4gICAgICAgICAgICAgICAgbmV3VmFsdWU6IHRoaXMudmFsdWUsXG4gICAgICAgICAgICAgICAgb2xkVmFsdWU6IHVuZGVmaW5lZFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiByZWdpc3Rlckxpc3RlbmVyJCQxKHRoaXMsIGxpc3RlbmVyKTtcbiAgICB9O1xuICAgIE9ic2VydmFibGVWYWx1ZSQkMS5wcm90b3R5cGUudG9KU09OID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXQoKTtcbiAgICB9O1xuICAgIE9ic2VydmFibGVWYWx1ZSQkMS5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm5hbWUgKyBcIltcIiArIHRoaXMudmFsdWUgKyBcIl1cIjtcbiAgICB9O1xuICAgIE9ic2VydmFibGVWYWx1ZSQkMS5wcm90b3R5cGUudmFsdWVPZiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRvUHJpbWl0aXZlJCQxKHRoaXMuZ2V0KCkpO1xuICAgIH07XG4gICAgT2JzZXJ2YWJsZVZhbHVlJCQxLnByb3RvdHlwZVtTeW1ib2wudG9QcmltaXRpdmVdID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy52YWx1ZU9mKCk7XG4gICAgfTtcbiAgICByZXR1cm4gT2JzZXJ2YWJsZVZhbHVlJCQxO1xufShBdG9tJCQxKSk7XG52YXIgaXNPYnNlcnZhYmxlVmFsdWUkJDEgPSBjcmVhdGVJbnN0YW5jZW9mUHJlZGljYXRlJCQxKFwiT2JzZXJ2YWJsZVZhbHVlXCIsIE9ic2VydmFibGVWYWx1ZSQkMSk7XG5cbi8qKlxuICogQSBub2RlIGluIHRoZSBzdGF0ZSBkZXBlbmRlbmN5IHJvb3QgdGhhdCBvYnNlcnZlcyBvdGhlciBub2RlcywgYW5kIGNhbiBiZSBvYnNlcnZlZCBpdHNlbGYuXG4gKlxuICogQ29tcHV0ZWRWYWx1ZSB3aWxsIHJlbWVtYmVyIHRoZSByZXN1bHQgb2YgdGhlIGNvbXB1dGF0aW9uIGZvciB0aGUgZHVyYXRpb24gb2YgdGhlIGJhdGNoLCBvclxuICogd2hpbGUgYmVpbmcgb2JzZXJ2ZWQuXG4gKlxuICogRHVyaW5nIHRoaXMgdGltZSBpdCB3aWxsIHJlY29tcHV0ZSBvbmx5IHdoZW4gb25lIG9mIGl0cyBkaXJlY3QgZGVwZW5kZW5jaWVzIGNoYW5nZWQsXG4gKiBidXQgb25seSB3aGVuIGl0IGlzIGJlaW5nIGFjY2Vzc2VkIHdpdGggYENvbXB1dGVkVmFsdWUuZ2V0KClgLlxuICpcbiAqIEltcGxlbWVudGF0aW9uIGRlc2NyaXB0aW9uOlxuICogMS4gRmlyc3QgdGltZSBpdCdzIGJlaW5nIGFjY2Vzc2VkIGl0IHdpbGwgY29tcHV0ZSBhbmQgcmVtZW1iZXIgcmVzdWx0XG4gKiAgICBnaXZlIGJhY2sgcmVtZW1iZXJlZCByZXN1bHQgdW50aWwgMi4gaGFwcGVuc1xuICogMi4gRmlyc3QgdGltZSBhbnkgZGVlcCBkZXBlbmRlbmN5IGNoYW5nZSwgcHJvcGFnYXRlIFBPU1NJQkxZX1NUQUxFIHRvIGFsbCBvYnNlcnZlcnMsIHdhaXQgZm9yIDMuXG4gKiAzLiBXaGVuIGl0J3MgYmVpbmcgYWNjZXNzZWQsIHJlY29tcHV0ZSBpZiBhbnkgc2hhbGxvdyBkZXBlbmRlbmN5IGNoYW5nZWQuXG4gKiAgICBpZiByZXN1bHQgY2hhbmdlZDogcHJvcGFnYXRlIFNUQUxFIHRvIGFsbCBvYnNlcnZlcnMsIHRoYXQgd2VyZSBQT1NTSUJMWV9TVEFMRSBmcm9tIHRoZSBsYXN0IHN0ZXAuXG4gKiAgICBnbyB0byBzdGVwIDIuIGVpdGhlciB3YXlcbiAqXG4gKiBJZiBhdCBhbnkgcG9pbnQgaXQncyBvdXRzaWRlIGJhdGNoIGFuZCBpdCBpc24ndCBvYnNlcnZlZDogcmVzZXQgZXZlcnl0aGluZyBhbmQgZ28gdG8gMS5cbiAqL1xudmFyIENvbXB1dGVkVmFsdWUkJDEgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgbmV3IGNvbXB1dGVkIHZhbHVlIGJhc2VkIG9uIGEgZnVuY3Rpb24gZXhwcmVzc2lvbi5cbiAgICAgKlxuICAgICAqIFRoZSBgbmFtZWAgcHJvcGVydHkgaXMgZm9yIGRlYnVnIHB1cnBvc2VzIG9ubHkuXG4gICAgICpcbiAgICAgKiBUaGUgYGVxdWFsc2AgcHJvcGVydHkgc3BlY2lmaWVzIHRoZSBjb21wYXJlciBmdW5jdGlvbiB0byB1c2UgdG8gZGV0ZXJtaW5lIGlmIGEgbmV3bHkgcHJvZHVjZWRcbiAgICAgKiB2YWx1ZSBkaWZmZXJzIGZyb20gdGhlIHByZXZpb3VzIHZhbHVlLiBUd28gY29tcGFyZXJzIGFyZSBwcm92aWRlZCBpbiB0aGUgbGlicmFyeTsgYGRlZmF1bHRDb21wYXJlcmBcbiAgICAgKiBjb21wYXJlcyBiYXNlZCBvbiBpZGVudGl0eSBjb21wYXJpc29uICg9PT0pLCBhbmQgYHN0cnVjdHVhbENvbXBhcmVyYCBkZWVwbHkgY29tcGFyZXMgdGhlIHN0cnVjdHVyZS5cbiAgICAgKiBTdHJ1Y3R1cmFsIGNvbXBhcmlzb24gY2FuIGJlIGNvbnZlbmllbnQgaWYgeW91IGFsd2F5cyBwcm9kdWNlIGEgbmV3IGFnZ3JlZ2F0ZWQgb2JqZWN0IGFuZFxuICAgICAqIGRvbid0IHdhbnQgdG8gbm90aWZ5IG9ic2VydmVycyBpZiBpdCBpcyBzdHJ1Y3R1cmFsbHkgdGhlIHNhbWUuXG4gICAgICogVGhpcyBpcyB1c2VmdWwgZm9yIHdvcmtpbmcgd2l0aCB2ZWN0b3JzLCBtb3VzZSBjb29yZGluYXRlcyBldGMuXG4gICAgICovXG4gICAgZnVuY3Rpb24gQ29tcHV0ZWRWYWx1ZSQkMShvcHRpb25zKSB7XG4gICAgICAgIHRoaXMuZGVwZW5kZW5jaWVzU3RhdGUgPSBJRGVyaXZhdGlvblN0YXRlLk5PVF9UUkFDS0lORztcbiAgICAgICAgdGhpcy5vYnNlcnZpbmcgPSBbXTsgLy8gbm9kZXMgd2UgYXJlIGxvb2tpbmcgYXQuIE91ciB2YWx1ZSBkZXBlbmRzIG9uIHRoZXNlIG5vZGVzXG4gICAgICAgIHRoaXMubmV3T2JzZXJ2aW5nID0gbnVsbDsgLy8gZHVyaW5nIHRyYWNraW5nIGl0J3MgYW4gYXJyYXkgd2l0aCBuZXcgb2JzZXJ2ZWQgb2JzZXJ2ZXJzXG4gICAgICAgIHRoaXMuaXNCZWluZ09ic2VydmVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaXNQZW5kaW5nVW5vYnNlcnZhdGlvbiA9IGZhbHNlO1xuICAgICAgICB0aGlzLm9ic2VydmVycyA9IG5ldyBTZXQoKTtcbiAgICAgICAgdGhpcy5kaWZmVmFsdWUgPSAwO1xuICAgICAgICB0aGlzLnJ1bklkID0gMDtcbiAgICAgICAgdGhpcy5sYXN0QWNjZXNzZWRCeSA9IDA7XG4gICAgICAgIHRoaXMubG93ZXN0T2JzZXJ2ZXJTdGF0ZSA9IElEZXJpdmF0aW9uU3RhdGUuVVBfVE9fREFURTtcbiAgICAgICAgdGhpcy51bmJvdW5kRGVwc0NvdW50ID0gMDtcbiAgICAgICAgdGhpcy5fX21hcGlkID0gXCIjXCIgKyBnZXROZXh0SWQkJDEoKTtcbiAgICAgICAgdGhpcy52YWx1ZSA9IG5ldyBDYXVnaHRFeGNlcHRpb24kJDEobnVsbCk7XG4gICAgICAgIHRoaXMuaXNDb21wdXRpbmcgPSBmYWxzZTsgLy8gdG8gY2hlY2sgZm9yIGN5Y2xlc1xuICAgICAgICB0aGlzLmlzUnVubmluZ1NldHRlciA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzVHJhY2luZyA9IFRyYWNlTW9kZSQkMS5OT05FO1xuICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiICYmICFvcHRpb25zLmdldClcbiAgICAgICAgICAgIHRocm93IFwiW21vYnhdIG1pc3Npbmcgb3B0aW9uIGZvciBjb21wdXRlZDogZ2V0XCI7XG4gICAgICAgIHRoaXMuZGVyaXZhdGlvbiA9IG9wdGlvbnMuZ2V0O1xuICAgICAgICB0aGlzLm5hbWUgPSBvcHRpb25zLm5hbWUgfHwgXCJDb21wdXRlZFZhbHVlQFwiICsgZ2V0TmV4dElkJCQxKCk7XG4gICAgICAgIGlmIChvcHRpb25zLnNldClcbiAgICAgICAgICAgIHRoaXMuc2V0dGVyID0gY3JlYXRlQWN0aW9uJCQxKHRoaXMubmFtZSArIFwiLXNldHRlclwiLCBvcHRpb25zLnNldCk7XG4gICAgICAgIHRoaXMuZXF1YWxzID1cbiAgICAgICAgICAgIG9wdGlvbnMuZXF1YWxzIHx8XG4gICAgICAgICAgICAgICAgKG9wdGlvbnMuY29tcGFyZVN0cnVjdHVyYWwgfHwgb3B0aW9ucy5zdHJ1Y3RcbiAgICAgICAgICAgICAgICAgICAgPyBjb21wYXJlciQkMS5zdHJ1Y3R1cmFsXG4gICAgICAgICAgICAgICAgICAgIDogY29tcGFyZXIkJDEuZGVmYXVsdCk7XG4gICAgICAgIHRoaXMuc2NvcGUgPSBvcHRpb25zLmNvbnRleHQ7XG4gICAgICAgIHRoaXMucmVxdWlyZXNSZWFjdGlvbiA9ICEhb3B0aW9ucy5yZXF1aXJlc1JlYWN0aW9uO1xuICAgICAgICB0aGlzLmtlZXBBbGl2ZSA9ICEhb3B0aW9ucy5rZWVwQWxpdmU7XG4gICAgfVxuICAgIENvbXB1dGVkVmFsdWUkJDEucHJvdG90eXBlLm9uQmVjb21lU3RhbGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHByb3BhZ2F0ZU1heWJlQ2hhbmdlZCQkMSh0aGlzKTtcbiAgICB9O1xuICAgIENvbXB1dGVkVmFsdWUkJDEucHJvdG90eXBlLm9uQmVjb21lT2JzZXJ2ZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLm9uQmVjb21lT2JzZXJ2ZWRMaXN0ZW5lcnMpIHtcbiAgICAgICAgICAgIHRoaXMub25CZWNvbWVPYnNlcnZlZExpc3RlbmVycy5mb3JFYWNoKGZ1bmN0aW9uIChsaXN0ZW5lcikgeyByZXR1cm4gbGlzdGVuZXIoKTsgfSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIENvbXB1dGVkVmFsdWUkJDEucHJvdG90eXBlLm9uQmVjb21lVW5vYnNlcnZlZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMub25CZWNvbWVVbm9ic2VydmVkTGlzdGVuZXJzKSB7XG4gICAgICAgICAgICB0aGlzLm9uQmVjb21lVW5vYnNlcnZlZExpc3RlbmVycy5mb3JFYWNoKGZ1bmN0aW9uIChsaXN0ZW5lcikgeyByZXR1cm4gbGlzdGVuZXIoKTsgfSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGN1cnJlbnQgdmFsdWUgb2YgdGhpcyBjb21wdXRlZCB2YWx1ZS5cbiAgICAgKiBXaWxsIGV2YWx1YXRlIGl0cyBjb21wdXRhdGlvbiBmaXJzdCBpZiBuZWVkZWQuXG4gICAgICovXG4gICAgQ29tcHV0ZWRWYWx1ZSQkMS5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5pc0NvbXB1dGluZylcbiAgICAgICAgICAgIGZhaWwkJDEoXCJDeWNsZSBkZXRlY3RlZCBpbiBjb21wdXRhdGlvbiBcIiArIHRoaXMubmFtZSArIFwiOiBcIiArIHRoaXMuZGVyaXZhdGlvbik7XG4gICAgICAgIGlmIChnbG9iYWxTdGF0ZSQkMS5pbkJhdGNoID09PSAwICYmIHRoaXMub2JzZXJ2ZXJzLnNpemUgPT09IDAgJiYgIXRoaXMua2VlcEFsaXZlKSB7XG4gICAgICAgICAgICBpZiAoc2hvdWxkQ29tcHV0ZSQkMSh0aGlzKSkge1xuICAgICAgICAgICAgICAgIHRoaXMud2FybkFib3V0VW50cmFja2VkUmVhZCgpO1xuICAgICAgICAgICAgICAgIHN0YXJ0QmF0Y2gkJDEoKTsgLy8gU2VlIHBlcmYgdGVzdCAnY29tcHV0ZWQgbWVtb2l6YXRpb24nXG4gICAgICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHRoaXMuY29tcHV0ZVZhbHVlKGZhbHNlKTtcbiAgICAgICAgICAgICAgICBlbmRCYXRjaCQkMSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmVwb3J0T2JzZXJ2ZWQkJDEodGhpcyk7XG4gICAgICAgICAgICBpZiAoc2hvdWxkQ29tcHV0ZSQkMSh0aGlzKSlcbiAgICAgICAgICAgICAgICBpZiAodGhpcy50cmFja0FuZENvbXB1dGUoKSlcbiAgICAgICAgICAgICAgICAgICAgcHJvcGFnYXRlQ2hhbmdlQ29uZmlybWVkJCQxKHRoaXMpO1xuICAgICAgICB9XG4gICAgICAgIHZhciByZXN1bHQgPSB0aGlzLnZhbHVlO1xuICAgICAgICBpZiAoaXNDYXVnaHRFeGNlcHRpb24kJDEocmVzdWx0KSlcbiAgICAgICAgICAgIHRocm93IHJlc3VsdC5jYXVzZTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9O1xuICAgIENvbXB1dGVkVmFsdWUkJDEucHJvdG90eXBlLnBlZWsgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciByZXMgPSB0aGlzLmNvbXB1dGVWYWx1ZShmYWxzZSk7XG4gICAgICAgIGlmIChpc0NhdWdodEV4Y2VwdGlvbiQkMShyZXMpKVxuICAgICAgICAgICAgdGhyb3cgcmVzLmNhdXNlO1xuICAgICAgICByZXR1cm4gcmVzO1xuICAgIH07XG4gICAgQ29tcHV0ZWRWYWx1ZSQkMS5wcm90b3R5cGUuc2V0ID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIGlmICh0aGlzLnNldHRlcikge1xuICAgICAgICAgICAgaW52YXJpYW50JCQxKCF0aGlzLmlzUnVubmluZ1NldHRlciwgXCJUaGUgc2V0dGVyIG9mIGNvbXB1dGVkIHZhbHVlICdcIiArIHRoaXMubmFtZSArIFwiJyBpcyB0cnlpbmcgdG8gdXBkYXRlIGl0c2VsZi4gRGlkIHlvdSBpbnRlbmQgdG8gdXBkYXRlIGFuIF9vYnNlcnZhYmxlXyB2YWx1ZSwgaW5zdGVhZCBvZiB0aGUgY29tcHV0ZWQgcHJvcGVydHk/XCIpO1xuICAgICAgICAgICAgdGhpcy5pc1J1bm5pbmdTZXR0ZXIgPSB0cnVlO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldHRlci5jYWxsKHRoaXMuc2NvcGUsIHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgICAgIHRoaXMuaXNSdW5uaW5nU2V0dGVyID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgaW52YXJpYW50JCQxKGZhbHNlLCBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgJiZcbiAgICAgICAgICAgICAgICBcIltDb21wdXRlZFZhbHVlICdcIiArIHRoaXMubmFtZSArIFwiJ10gSXQgaXMgbm90IHBvc3NpYmxlIHRvIGFzc2lnbiBhIG5ldyB2YWx1ZSB0byBhIGNvbXB1dGVkIHZhbHVlLlwiKTtcbiAgICB9O1xuICAgIENvbXB1dGVkVmFsdWUkJDEucHJvdG90eXBlLnRyYWNrQW5kQ29tcHV0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKGlzU3B5RW5hYmxlZCQkMSgpICYmIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xuICAgICAgICAgICAgc3B5UmVwb3J0JCQxKHtcbiAgICAgICAgICAgICAgICBvYmplY3Q6IHRoaXMuc2NvcGUsXG4gICAgICAgICAgICAgICAgdHlwZTogXCJjb21wdXRlXCIsXG4gICAgICAgICAgICAgICAgbmFtZTogdGhpcy5uYW1lXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgb2xkVmFsdWUgPSB0aGlzLnZhbHVlO1xuICAgICAgICB2YXIgd2FzU3VzcGVuZGVkID0gXG4gICAgICAgIC8qIHNlZSAjMTIwOCAqLyB0aGlzLmRlcGVuZGVuY2llc1N0YXRlID09PSBJRGVyaXZhdGlvblN0YXRlLk5PVF9UUkFDS0lORztcbiAgICAgICAgdmFyIG5ld1ZhbHVlID0gdGhpcy5jb21wdXRlVmFsdWUodHJ1ZSk7XG4gICAgICAgIHZhciBjaGFuZ2VkID0gd2FzU3VzcGVuZGVkIHx8XG4gICAgICAgICAgICBpc0NhdWdodEV4Y2VwdGlvbiQkMShvbGRWYWx1ZSkgfHxcbiAgICAgICAgICAgIGlzQ2F1Z2h0RXhjZXB0aW9uJCQxKG5ld1ZhbHVlKSB8fFxuICAgICAgICAgICAgIXRoaXMuZXF1YWxzKG9sZFZhbHVlLCBuZXdWYWx1ZSk7XG4gICAgICAgIGlmIChjaGFuZ2VkKSB7XG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gbmV3VmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNoYW5nZWQ7XG4gICAgfTtcbiAgICBDb21wdXRlZFZhbHVlJCQxLnByb3RvdHlwZS5jb21wdXRlVmFsdWUgPSBmdW5jdGlvbiAodHJhY2spIHtcbiAgICAgICAgdGhpcy5pc0NvbXB1dGluZyA9IHRydWU7XG4gICAgICAgIGdsb2JhbFN0YXRlJCQxLmNvbXB1dGF0aW9uRGVwdGgrKztcbiAgICAgICAgdmFyIHJlcztcbiAgICAgICAgaWYgKHRyYWNrKSB7XG4gICAgICAgICAgICByZXMgPSB0cmFja0Rlcml2ZWRGdW5jdGlvbiQkMSh0aGlzLCB0aGlzLmRlcml2YXRpb24sIHRoaXMuc2NvcGUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKGdsb2JhbFN0YXRlJCQxLmRpc2FibGVFcnJvckJvdW5kYXJpZXMgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICByZXMgPSB0aGlzLmRlcml2YXRpb24uY2FsbCh0aGlzLnNjb3BlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIHJlcyA9IHRoaXMuZGVyaXZhdGlvbi5jYWxsKHRoaXMuc2NvcGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICByZXMgPSBuZXcgQ2F1Z2h0RXhjZXB0aW9uJCQxKGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBnbG9iYWxTdGF0ZSQkMS5jb21wdXRhdGlvbkRlcHRoLS07XG4gICAgICAgIHRoaXMuaXNDb21wdXRpbmcgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuIHJlcztcbiAgICB9O1xuICAgIENvbXB1dGVkVmFsdWUkJDEucHJvdG90eXBlLnN1c3BlbmQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghdGhpcy5rZWVwQWxpdmUpIHtcbiAgICAgICAgICAgIGNsZWFyT2JzZXJ2aW5nJCQxKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHVuZGVmaW5lZDsgLy8gZG9uJ3QgaG9sZCBvbiB0byBjb21wdXRlZCB2YWx1ZSFcbiAgICAgICAgfVxuICAgIH07XG4gICAgQ29tcHV0ZWRWYWx1ZSQkMS5wcm90b3R5cGUub2JzZXJ2ZSA9IGZ1bmN0aW9uIChsaXN0ZW5lciwgZmlyZUltbWVkaWF0ZWx5KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciBmaXJzdFRpbWUgPSB0cnVlO1xuICAgICAgICB2YXIgcHJldlZhbHVlID0gdW5kZWZpbmVkO1xuICAgICAgICByZXR1cm4gYXV0b3J1biQkMShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgbmV3VmFsdWUgPSBfdGhpcy5nZXQoKTtcbiAgICAgICAgICAgIGlmICghZmlyc3RUaW1lIHx8IGZpcmVJbW1lZGlhdGVseSkge1xuICAgICAgICAgICAgICAgIHZhciBwcmV2VSA9IHVudHJhY2tlZFN0YXJ0JCQxKCk7XG4gICAgICAgICAgICAgICAgbGlzdGVuZXIoe1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcInVwZGF0ZVwiLFxuICAgICAgICAgICAgICAgICAgICBvYmplY3Q6IF90aGlzLFxuICAgICAgICAgICAgICAgICAgICBuZXdWYWx1ZTogbmV3VmFsdWUsXG4gICAgICAgICAgICAgICAgICAgIG9sZFZhbHVlOiBwcmV2VmFsdWVcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB1bnRyYWNrZWRFbmQkJDEocHJldlUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZmlyc3RUaW1lID0gZmFsc2U7XG4gICAgICAgICAgICBwcmV2VmFsdWUgPSBuZXdWYWx1ZTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBDb21wdXRlZFZhbHVlJCQxLnByb3RvdHlwZS53YXJuQWJvdXRVbnRyYWNrZWRSZWFkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09IFwicHJvZHVjdGlvblwiKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBpZiAodGhpcy5yZXF1aXJlc1JlYWN0aW9uID09PSB0cnVlKSB7XG4gICAgICAgICAgICBmYWlsJCQxKFwiW21vYnhdIENvbXB1dGVkIHZhbHVlIFwiICsgdGhpcy5uYW1lICsgXCIgaXMgcmVhZCBvdXRzaWRlIGEgcmVhY3RpdmUgY29udGV4dFwiKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5pc1RyYWNpbmcgIT09IFRyYWNlTW9kZSQkMS5OT05FKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlttb2J4LnRyYWNlXSAnXCIgKyB0aGlzLm5hbWUgKyBcIicgaXMgYmVpbmcgcmVhZCBvdXRzaWRlIGEgcmVhY3RpdmUgY29udGV4dC4gRG9pbmcgYSBmdWxsIHJlY29tcHV0ZVwiKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZ2xvYmFsU3RhdGUkJDEuY29tcHV0ZWRSZXF1aXJlc1JlYWN0aW9uKSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oXCJbbW9ieF0gQ29tcHV0ZWQgdmFsdWUgXCIgKyB0aGlzLm5hbWUgKyBcIiBpcyBiZWluZyByZWFkIG91dHNpZGUgYSByZWFjdGl2ZSBjb250ZXh0LiBEb2luZyBhIGZ1bGwgcmVjb21wdXRlXCIpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBDb21wdXRlZFZhbHVlJCQxLnByb3RvdHlwZS50b0pTT04gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldCgpO1xuICAgIH07XG4gICAgQ29tcHV0ZWRWYWx1ZSQkMS5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm5hbWUgKyBcIltcIiArIHRoaXMuZGVyaXZhdGlvbi50b1N0cmluZygpICsgXCJdXCI7XG4gICAgfTtcbiAgICBDb21wdXRlZFZhbHVlJCQxLnByb3RvdHlwZS52YWx1ZU9mID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdG9QcmltaXRpdmUkJDEodGhpcy5nZXQoKSk7XG4gICAgfTtcbiAgICBDb21wdXRlZFZhbHVlJCQxLnByb3RvdHlwZVtTeW1ib2wudG9QcmltaXRpdmVdID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy52YWx1ZU9mKCk7XG4gICAgfTtcbiAgICByZXR1cm4gQ29tcHV0ZWRWYWx1ZSQkMTtcbn0oKSk7XG52YXIgaXNDb21wdXRlZFZhbHVlJCQxID0gY3JlYXRlSW5zdGFuY2VvZlByZWRpY2F0ZSQkMShcIkNvbXB1dGVkVmFsdWVcIiwgQ29tcHV0ZWRWYWx1ZSQkMSk7XG5cbnZhciBJRGVyaXZhdGlvblN0YXRlO1xuKGZ1bmN0aW9uIChJRGVyaXZhdGlvblN0YXRlJCQxKSB7XG4gICAgLy8gYmVmb3JlIGJlaW5nIHJ1biBvciAob3V0c2lkZSBiYXRjaCBhbmQgbm90IGJlaW5nIG9ic2VydmVkKVxuICAgIC8vIGF0IHRoaXMgcG9pbnQgZGVyaXZhdGlvbiBpcyBub3QgaG9sZGluZyBhbnkgZGF0YSBhYm91dCBkZXBlbmRlbmN5IHRyZWVcbiAgICBJRGVyaXZhdGlvblN0YXRlJCQxW0lEZXJpdmF0aW9uU3RhdGUkJDFbXCJOT1RfVFJBQ0tJTkdcIl0gPSAtMV0gPSBcIk5PVF9UUkFDS0lOR1wiO1xuICAgIC8vIG5vIHNoYWxsb3cgZGVwZW5kZW5jeSBjaGFuZ2VkIHNpbmNlIGxhc3QgY29tcHV0YXRpb25cbiAgICAvLyB3b24ndCByZWNhbGN1bGF0ZSBkZXJpdmF0aW9uXG4gICAgLy8gdGhpcyBpcyB3aGF0IG1ha2VzIG1vYnggZmFzdFxuICAgIElEZXJpdmF0aW9uU3RhdGUkJDFbSURlcml2YXRpb25TdGF0ZSQkMVtcIlVQX1RPX0RBVEVcIl0gPSAwXSA9IFwiVVBfVE9fREFURVwiO1xuICAgIC8vIHNvbWUgZGVlcCBkZXBlbmRlbmN5IGNoYW5nZWQsIGJ1dCBkb24ndCBrbm93IGlmIHNoYWxsb3cgZGVwZW5kZW5jeSBjaGFuZ2VkXG4gICAgLy8gd2lsbCByZXF1aXJlIHRvIGNoZWNrIGZpcnN0IGlmIFVQX1RPX0RBVEUgb3IgUE9TU0lCTFlfU1RBTEVcbiAgICAvLyBjdXJyZW50bHkgb25seSBDb21wdXRlZFZhbHVlIHdpbGwgcHJvcGFnYXRlIFBPU1NJQkxZX1NUQUxFXG4gICAgLy9cbiAgICAvLyBoYXZpbmcgdGhpcyBzdGF0ZSBpcyBzZWNvbmQgYmlnIG9wdGltaXphdGlvbjpcbiAgICAvLyBkb24ndCBoYXZlIHRvIHJlY29tcHV0ZSBvbiBldmVyeSBkZXBlbmRlbmN5IGNoYW5nZSwgYnV0IG9ubHkgd2hlbiBpdCdzIG5lZWRlZFxuICAgIElEZXJpdmF0aW9uU3RhdGUkJDFbSURlcml2YXRpb25TdGF0ZSQkMVtcIlBPU1NJQkxZX1NUQUxFXCJdID0gMV0gPSBcIlBPU1NJQkxZX1NUQUxFXCI7XG4gICAgLy8gQSBzaGFsbG93IGRlcGVuZGVuY3kgaGFzIGNoYW5nZWQgc2luY2UgbGFzdCBjb21wdXRhdGlvbiBhbmQgdGhlIGRlcml2YXRpb25cbiAgICAvLyB3aWxsIG5lZWQgdG8gcmVjb21wdXRlIHdoZW4gaXQncyBuZWVkZWQgbmV4dC5cbiAgICBJRGVyaXZhdGlvblN0YXRlJCQxW0lEZXJpdmF0aW9uU3RhdGUkJDFbXCJTVEFMRVwiXSA9IDJdID0gXCJTVEFMRVwiO1xufSkoSURlcml2YXRpb25TdGF0ZSB8fCAoSURlcml2YXRpb25TdGF0ZSA9IHt9KSk7XG52YXIgVHJhY2VNb2RlJCQxO1xuKGZ1bmN0aW9uIChUcmFjZU1vZGUkJDEpIHtcbiAgICBUcmFjZU1vZGUkJDFbVHJhY2VNb2RlJCQxW1wiTk9ORVwiXSA9IDBdID0gXCJOT05FXCI7XG4gICAgVHJhY2VNb2RlJCQxW1RyYWNlTW9kZSQkMVtcIkxPR1wiXSA9IDFdID0gXCJMT0dcIjtcbiAgICBUcmFjZU1vZGUkJDFbVHJhY2VNb2RlJCQxW1wiQlJFQUtcIl0gPSAyXSA9IFwiQlJFQUtcIjtcbn0pKFRyYWNlTW9kZSQkMSB8fCAoVHJhY2VNb2RlJCQxID0ge30pKTtcbnZhciBDYXVnaHRFeGNlcHRpb24kJDEgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQ2F1Z2h0RXhjZXB0aW9uJCQxKGNhdXNlKSB7XG4gICAgICAgIHRoaXMuY2F1c2UgPSBjYXVzZTtcbiAgICAgICAgLy8gRW1wdHlcbiAgICB9XG4gICAgcmV0dXJuIENhdWdodEV4Y2VwdGlvbiQkMTtcbn0oKSk7XG5mdW5jdGlvbiBpc0NhdWdodEV4Y2VwdGlvbiQkMShlKSB7XG4gICAgcmV0dXJuIGUgaW5zdGFuY2VvZiBDYXVnaHRFeGNlcHRpb24kJDE7XG59XG4vKipcbiAqIEZpbmRzIG91dCB3aGV0aGVyIGFueSBkZXBlbmRlbmN5IG9mIHRoZSBkZXJpdmF0aW9uIGhhcyBhY3R1YWxseSBjaGFuZ2VkLlxuICogSWYgZGVwZW5kZW5jaWVzU3RhdGUgaXMgMSB0aGVuIGl0IHdpbGwgcmVjYWxjdWxhdGUgZGVwZW5kZW5jaWVzLFxuICogaWYgYW55IGRlcGVuZGVuY3kgY2hhbmdlZCBpdCB3aWxsIHByb3BhZ2F0ZSBpdCBieSBjaGFuZ2luZyBkZXBlbmRlbmNpZXNTdGF0ZSB0byAyLlxuICpcbiAqIEJ5IGl0ZXJhdGluZyBvdmVyIHRoZSBkZXBlbmRlbmNpZXMgaW4gdGhlIHNhbWUgb3JkZXIgdGhhdCB0aGV5IHdlcmUgcmVwb3J0ZWQgYW5kXG4gKiBzdG9wcGluZyBvbiB0aGUgZmlyc3QgY2hhbmdlLCBhbGwgdGhlIHJlY2FsY3VsYXRpb25zIGFyZSBvbmx5IGNhbGxlZCBmb3IgQ29tcHV0ZWRWYWx1ZXNcbiAqIHRoYXQgd2lsbCBiZSB0cmFja2VkIGJ5IGRlcml2YXRpb24uIFRoYXQgaXMgYmVjYXVzZSB3ZSBhc3N1bWUgdGhhdCBpZiB0aGUgZmlyc3QgeFxuICogZGVwZW5kZW5jaWVzIG9mIHRoZSBkZXJpdmF0aW9uIGRvZXNuJ3QgY2hhbmdlIHRoZW4gdGhlIGRlcml2YXRpb24gc2hvdWxkIHJ1biB0aGUgc2FtZSB3YXlcbiAqIHVwIHVudGlsIGFjY2Vzc2luZyB4LXRoIGRlcGVuZGVuY3kuXG4gKi9cbmZ1bmN0aW9uIHNob3VsZENvbXB1dGUkJDEoZGVyaXZhdGlvbikge1xuICAgIHN3aXRjaCAoZGVyaXZhdGlvbi5kZXBlbmRlbmNpZXNTdGF0ZSkge1xuICAgICAgICBjYXNlIElEZXJpdmF0aW9uU3RhdGUuVVBfVE9fREFURTpcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgY2FzZSBJRGVyaXZhdGlvblN0YXRlLk5PVF9UUkFDS0lORzpcbiAgICAgICAgY2FzZSBJRGVyaXZhdGlvblN0YXRlLlNUQUxFOlxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIGNhc2UgSURlcml2YXRpb25TdGF0ZS5QT1NTSUJMWV9TVEFMRToge1xuICAgICAgICAgICAgdmFyIHByZXZVbnRyYWNrZWQgPSB1bnRyYWNrZWRTdGFydCQkMSgpOyAvLyBubyBuZWVkIGZvciB0aG9zZSBjb21wdXRlZHMgdG8gYmUgcmVwb3J0ZWQsIHRoZXkgd2lsbCBiZSBwaWNrZWQgdXAgaW4gdHJhY2tEZXJpdmVkRnVuY3Rpb24uXG4gICAgICAgICAgICB2YXIgb2JzID0gZGVyaXZhdGlvbi5vYnNlcnZpbmcsIGwgPSBvYnMubGVuZ3RoO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgb2JqID0gb2JzW2ldO1xuICAgICAgICAgICAgICAgIGlmIChpc0NvbXB1dGVkVmFsdWUkJDEob2JqKSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZ2xvYmFsU3RhdGUkJDEuZGlzYWJsZUVycm9yQm91bmRhcmllcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgb2JqLmdldCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmouZ2V0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHdlIGFyZSBub3QgaW50ZXJlc3RlZCBpbiB0aGUgdmFsdWUgKm9yKiBleGNlcHRpb24gYXQgdGhpcyBtb21lbnQsIGJ1dCBpZiB0aGVyZSBpcyBvbmUsIG5vdGlmeSBhbGxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1bnRyYWNrZWRFbmQkJDEocHJldlVudHJhY2tlZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgQ29tcHV0ZWRWYWx1ZSBgb2JqYCBhY3R1YWxseSBjaGFuZ2VkIGl0IHdpbGwgYmUgY29tcHV0ZWQgYW5kIHByb3BhZ2F0ZWQgdG8gaXRzIG9ic2VydmVycy5cbiAgICAgICAgICAgICAgICAgICAgLy8gYW5kIGBkZXJpdmF0aW9uYCBpcyBhbiBvYnNlcnZlciBvZiBgb2JqYFxuICAgICAgICAgICAgICAgICAgICAvLyBpbnZhcmlhbnRTaG91bGRDb21wdXRlKGRlcml2YXRpb24pXG4gICAgICAgICAgICAgICAgICAgIGlmIChkZXJpdmF0aW9uLmRlcGVuZGVuY2llc1N0YXRlID09PSBJRGVyaXZhdGlvblN0YXRlLlNUQUxFKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB1bnRyYWNrZWRFbmQkJDEocHJldlVudHJhY2tlZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNoYW5nZURlcGVuZGVuY2llc1N0YXRlVG8wJCQxKGRlcml2YXRpb24pO1xuICAgICAgICAgICAgdW50cmFja2VkRW5kJCQxKHByZXZVbnRyYWNrZWQpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxufVxuLy8gZnVuY3Rpb24gaW52YXJpYW50U2hvdWxkQ29tcHV0ZShkZXJpdmF0aW9uOiBJRGVyaXZhdGlvbikge1xuLy8gICAgIGNvbnN0IG5ld0RlcFN0YXRlID0gKGRlcml2YXRpb24gYXMgYW55KS5kZXBlbmRlbmNpZXNTdGF0ZVxuLy8gICAgIGlmIChcbi8vICAgICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09IFwicHJvZHVjdGlvblwiICYmXG4vLyAgICAgICAgIChuZXdEZXBTdGF0ZSA9PT0gSURlcml2YXRpb25TdGF0ZS5QT1NTSUJMWV9TVEFMRSB8fFxuLy8gICAgICAgICAgICAgbmV3RGVwU3RhdGUgPT09IElEZXJpdmF0aW9uU3RhdGUuTk9UX1RSQUNLSU5HKVxuLy8gICAgIClcbi8vICAgICAgICAgZmFpbChcIklsbGVnYWwgZGVwZW5kZW5jeSBzdGF0ZVwiKVxuLy8gfVxuZnVuY3Rpb24gaXNDb21wdXRpbmdEZXJpdmF0aW9uJCQxKCkge1xuICAgIHJldHVybiBnbG9iYWxTdGF0ZSQkMS50cmFja2luZ0Rlcml2YXRpb24gIT09IG51bGw7IC8vIGZpbHRlciBvdXQgYWN0aW9ucyBpbnNpZGUgY29tcHV0YXRpb25zXG59XG5mdW5jdGlvbiBjaGVja0lmU3RhdGVNb2RpZmljYXRpb25zQXJlQWxsb3dlZCQkMShhdG9tKSB7XG4gICAgdmFyIGhhc09ic2VydmVycyQkMSA9IGF0b20ub2JzZXJ2ZXJzLnNpemUgPiAwO1xuICAgIC8vIFNob3VsZCBuZXZlciBiZSBwb3NzaWJsZSB0byBjaGFuZ2UgYW4gb2JzZXJ2ZWQgb2JzZXJ2YWJsZSBmcm9tIGluc2lkZSBjb21wdXRlZCwgc2VlICM3OThcbiAgICBpZiAoZ2xvYmFsU3RhdGUkJDEuY29tcHV0YXRpb25EZXB0aCA+IDAgJiYgaGFzT2JzZXJ2ZXJzJCQxKVxuICAgICAgICBmYWlsJCQxKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiAmJlxuICAgICAgICAgICAgXCJDb21wdXRlZCB2YWx1ZXMgYXJlIG5vdCBhbGxvd2VkIHRvIGNhdXNlIHNpZGUgZWZmZWN0cyBieSBjaGFuZ2luZyBvYnNlcnZhYmxlcyB0aGF0IGFyZSBhbHJlYWR5IGJlaW5nIG9ic2VydmVkLiBUcmllZCB0byBtb2RpZnk6IFwiICsgYXRvbS5uYW1lKTtcbiAgICAvLyBTaG91bGQgbm90IGJlIHBvc3NpYmxlIHRvIGNoYW5nZSBvYnNlcnZlZCBzdGF0ZSBvdXRzaWRlIHN0cmljdCBtb2RlLCBleGNlcHQgZHVyaW5nIGluaXRpYWxpemF0aW9uLCBzZWUgIzU2M1xuICAgIGlmICghZ2xvYmFsU3RhdGUkJDEuYWxsb3dTdGF0ZUNoYW5nZXMgJiYgKGhhc09ic2VydmVycyQkMSB8fCBnbG9iYWxTdGF0ZSQkMS5lbmZvcmNlQWN0aW9ucyA9PT0gXCJzdHJpY3RcIikpXG4gICAgICAgIGZhaWwkJDEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiICYmXG4gICAgICAgICAgICAoZ2xvYmFsU3RhdGUkJDEuZW5mb3JjZUFjdGlvbnNcbiAgICAgICAgICAgICAgICA/IFwiU2luY2Ugc3RyaWN0LW1vZGUgaXMgZW5hYmxlZCwgY2hhbmdpbmcgb2JzZXJ2ZWQgb2JzZXJ2YWJsZSB2YWx1ZXMgb3V0c2lkZSBhY3Rpb25zIGlzIG5vdCBhbGxvd2VkLiBQbGVhc2Ugd3JhcCB0aGUgY29kZSBpbiBhbiBgYWN0aW9uYCBpZiB0aGlzIGNoYW5nZSBpcyBpbnRlbmRlZC4gVHJpZWQgdG8gbW9kaWZ5OiBcIlxuICAgICAgICAgICAgICAgIDogXCJTaWRlIGVmZmVjdHMgbGlrZSBjaGFuZ2luZyBzdGF0ZSBhcmUgbm90IGFsbG93ZWQgYXQgdGhpcyBwb2ludC4gQXJlIHlvdSB0cnlpbmcgdG8gbW9kaWZ5IHN0YXRlIGZyb20sIGZvciBleGFtcGxlLCB0aGUgcmVuZGVyIGZ1bmN0aW9uIG9mIGEgUmVhY3QgY29tcG9uZW50PyBUcmllZCB0byBtb2RpZnk6IFwiKSArXG4gICAgICAgICAgICAgICAgYXRvbS5uYW1lKTtcbn1cbi8qKlxuICogRXhlY3V0ZXMgdGhlIHByb3ZpZGVkIGZ1bmN0aW9uIGBmYCBhbmQgdHJhY2tzIHdoaWNoIG9ic2VydmFibGVzIGFyZSBiZWluZyBhY2Nlc3NlZC5cbiAqIFRoZSB0cmFja2luZyBpbmZvcm1hdGlvbiBpcyBzdG9yZWQgb24gdGhlIGBkZXJpdmF0aW9uYCBvYmplY3QgYW5kIHRoZSBkZXJpdmF0aW9uIGlzIHJlZ2lzdGVyZWRcbiAqIGFzIG9ic2VydmVyIG9mIGFueSBvZiB0aGUgYWNjZXNzZWQgb2JzZXJ2YWJsZXMuXG4gKi9cbmZ1bmN0aW9uIHRyYWNrRGVyaXZlZEZ1bmN0aW9uJCQxKGRlcml2YXRpb24sIGYsIGNvbnRleHQpIHtcbiAgICAvLyBwcmUgYWxsb2NhdGUgYXJyYXkgYWxsb2NhdGlvbiArIHJvb20gZm9yIHZhcmlhdGlvbiBpbiBkZXBzXG4gICAgLy8gYXJyYXkgd2lsbCBiZSB0cmltbWVkIGJ5IGJpbmREZXBlbmRlbmNpZXNcbiAgICBjaGFuZ2VEZXBlbmRlbmNpZXNTdGF0ZVRvMCQkMShkZXJpdmF0aW9uKTtcbiAgICBkZXJpdmF0aW9uLm5ld09ic2VydmluZyA9IG5ldyBBcnJheShkZXJpdmF0aW9uLm9ic2VydmluZy5sZW5ndGggKyAxMDApO1xuICAgIGRlcml2YXRpb24udW5ib3VuZERlcHNDb3VudCA9IDA7XG4gICAgZGVyaXZhdGlvbi5ydW5JZCA9ICsrZ2xvYmFsU3RhdGUkJDEucnVuSWQ7XG4gICAgdmFyIHByZXZUcmFja2luZyA9IGdsb2JhbFN0YXRlJCQxLnRyYWNraW5nRGVyaXZhdGlvbjtcbiAgICBnbG9iYWxTdGF0ZSQkMS50cmFja2luZ0Rlcml2YXRpb24gPSBkZXJpdmF0aW9uO1xuICAgIHZhciByZXN1bHQ7XG4gICAgaWYgKGdsb2JhbFN0YXRlJCQxLmRpc2FibGVFcnJvckJvdW5kYXJpZXMgPT09IHRydWUpIHtcbiAgICAgICAgcmVzdWx0ID0gZi5jYWxsKGNvbnRleHQpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJlc3VsdCA9IGYuY2FsbChjb250ZXh0KTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgcmVzdWx0ID0gbmV3IENhdWdodEV4Y2VwdGlvbiQkMShlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBnbG9iYWxTdGF0ZSQkMS50cmFja2luZ0Rlcml2YXRpb24gPSBwcmV2VHJhY2tpbmc7XG4gICAgYmluZERlcGVuZGVuY2llcyhkZXJpdmF0aW9uKTtcbiAgICByZXR1cm4gcmVzdWx0O1xufVxuLyoqXG4gKiBkaWZmcyBuZXdPYnNlcnZpbmcgd2l0aCBvYnNlcnZpbmcuXG4gKiB1cGRhdGUgb2JzZXJ2aW5nIHRvIGJlIG5ld09ic2VydmluZyB3aXRoIHVuaXF1ZSBvYnNlcnZhYmxlc1xuICogbm90aWZ5IG9ic2VydmVycyB0aGF0IGJlY29tZSBvYnNlcnZlZC91bm9ic2VydmVkXG4gKi9cbmZ1bmN0aW9uIGJpbmREZXBlbmRlbmNpZXMoZGVyaXZhdGlvbikge1xuICAgIC8vIGludmFyaWFudChkZXJpdmF0aW9uLmRlcGVuZGVuY2llc1N0YXRlICE9PSBJRGVyaXZhdGlvblN0YXRlLk5PVF9UUkFDS0lORywgXCJJTlRFUk5BTCBFUlJPUiBiaW5kRGVwZW5kZW5jaWVzIGV4cGVjdHMgZGVyaXZhdGlvbi5kZXBlbmRlbmNpZXNTdGF0ZSAhPT0gLTFcIik7XG4gICAgdmFyIHByZXZPYnNlcnZpbmcgPSBkZXJpdmF0aW9uLm9ic2VydmluZztcbiAgICB2YXIgb2JzZXJ2aW5nID0gKGRlcml2YXRpb24ub2JzZXJ2aW5nID0gZGVyaXZhdGlvbi5uZXdPYnNlcnZpbmcpO1xuICAgIHZhciBsb3dlc3ROZXdPYnNlcnZpbmdEZXJpdmF0aW9uU3RhdGUgPSBJRGVyaXZhdGlvblN0YXRlLlVQX1RPX0RBVEU7XG4gICAgLy8gR28gdGhyb3VnaCBhbGwgbmV3IG9ic2VydmFibGVzIGFuZCBjaGVjayBkaWZmVmFsdWU6ICh0aGlzIGxpc3QgY2FuIGNvbnRhaW4gZHVwbGljYXRlcyk6XG4gICAgLy8gICAwOiBmaXJzdCBvY2N1cnJlbmNlLCBjaGFuZ2UgdG8gMSBhbmQga2VlcCBpdFxuICAgIC8vICAgMTogZXh0cmEgb2NjdXJyZW5jZSwgZHJvcCBpdFxuICAgIHZhciBpMCA9IDAsIGwgPSBkZXJpdmF0aW9uLnVuYm91bmREZXBzQ291bnQ7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgdmFyIGRlcCA9IG9ic2VydmluZ1tpXTtcbiAgICAgICAgaWYgKGRlcC5kaWZmVmFsdWUgPT09IDApIHtcbiAgICAgICAgICAgIGRlcC5kaWZmVmFsdWUgPSAxO1xuICAgICAgICAgICAgaWYgKGkwICE9PSBpKVxuICAgICAgICAgICAgICAgIG9ic2VydmluZ1tpMF0gPSBkZXA7XG4gICAgICAgICAgICBpMCsrO1xuICAgICAgICB9XG4gICAgICAgIC8vIFVwY2FzdCBpcyAnc2FmZScgaGVyZSwgYmVjYXVzZSBpZiBkZXAgaXMgSU9ic2VydmFibGUsIGBkZXBlbmRlbmNpZXNTdGF0ZWAgd2lsbCBiZSB1bmRlZmluZWQsXG4gICAgICAgIC8vIG5vdCBoaXR0aW5nIHRoZSBjb25kaXRpb25cbiAgICAgICAgaWYgKGRlcC5kZXBlbmRlbmNpZXNTdGF0ZSA+IGxvd2VzdE5ld09ic2VydmluZ0Rlcml2YXRpb25TdGF0ZSkge1xuICAgICAgICAgICAgbG93ZXN0TmV3T2JzZXJ2aW5nRGVyaXZhdGlvblN0YXRlID0gZGVwLmRlcGVuZGVuY2llc1N0YXRlO1xuICAgICAgICB9XG4gICAgfVxuICAgIG9ic2VydmluZy5sZW5ndGggPSBpMDtcbiAgICBkZXJpdmF0aW9uLm5ld09ic2VydmluZyA9IG51bGw7IC8vIG5ld09ic2VydmluZyBzaG91bGRuJ3QgYmUgbmVlZGVkIG91dHNpZGUgdHJhY2tpbmcgKHN0YXRlbWVudCBtb3ZlZCBkb3duIHRvIHdvcmsgYXJvdW5kIEZGIGJ1Zywgc2VlICM2MTQpXG4gICAgLy8gR28gdGhyb3VnaCBhbGwgb2xkIG9ic2VydmFibGVzIGFuZCBjaGVjayBkaWZmVmFsdWU6IChpdCBpcyB1bmlxdWUgYWZ0ZXIgbGFzdCBiaW5kRGVwZW5kZW5jaWVzKVxuICAgIC8vICAgMDogaXQncyBub3QgaW4gbmV3IG9ic2VydmFibGVzLCB1bm9ic2VydmUgaXRcbiAgICAvLyAgIDE6IGl0IGtlZXBzIGJlaW5nIG9ic2VydmVkLCBkb24ndCB3YW50IHRvIG5vdGlmeSBpdC4gY2hhbmdlIHRvIDBcbiAgICBsID0gcHJldk9ic2VydmluZy5sZW5ndGg7XG4gICAgd2hpbGUgKGwtLSkge1xuICAgICAgICB2YXIgZGVwID0gcHJldk9ic2VydmluZ1tsXTtcbiAgICAgICAgaWYgKGRlcC5kaWZmVmFsdWUgPT09IDApIHtcbiAgICAgICAgICAgIHJlbW92ZU9ic2VydmVyJCQxKGRlcCwgZGVyaXZhdGlvbik7XG4gICAgICAgIH1cbiAgICAgICAgZGVwLmRpZmZWYWx1ZSA9IDA7XG4gICAgfVxuICAgIC8vIEdvIHRocm91Z2ggYWxsIG5ldyBvYnNlcnZhYmxlcyBhbmQgY2hlY2sgZGlmZlZhbHVlOiAobm93IGl0IHNob3VsZCBiZSB1bmlxdWUpXG4gICAgLy8gICAwOiBpdCB3YXMgc2V0IHRvIDAgaW4gbGFzdCBsb29wLiBkb24ndCBuZWVkIHRvIGRvIGFueXRoaW5nLlxuICAgIC8vICAgMTogaXQgd2Fzbid0IG9ic2VydmVkLCBsZXQncyBvYnNlcnZlIGl0LiBzZXQgYmFjayB0byAwXG4gICAgd2hpbGUgKGkwLS0pIHtcbiAgICAgICAgdmFyIGRlcCA9IG9ic2VydmluZ1tpMF07XG4gICAgICAgIGlmIChkZXAuZGlmZlZhbHVlID09PSAxKSB7XG4gICAgICAgICAgICBkZXAuZGlmZlZhbHVlID0gMDtcbiAgICAgICAgICAgIGFkZE9ic2VydmVyJCQxKGRlcCwgZGVyaXZhdGlvbik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gU29tZSBuZXcgb2JzZXJ2ZWQgZGVyaXZhdGlvbnMgbWF5IGJlY29tZSBzdGFsZSBkdXJpbmcgdGhpcyBkZXJpdmF0aW9uIGNvbXB1dGF0aW9uXG4gICAgLy8gc28gdGhleSBoYXZlIGhhZCBubyBjaGFuY2UgdG8gcHJvcGFnYXRlIHN0YWxlbmVzcyAoIzkxNilcbiAgICBpZiAobG93ZXN0TmV3T2JzZXJ2aW5nRGVyaXZhdGlvblN0YXRlICE9PSBJRGVyaXZhdGlvblN0YXRlLlVQX1RPX0RBVEUpIHtcbiAgICAgICAgZGVyaXZhdGlvbi5kZXBlbmRlbmNpZXNTdGF0ZSA9IGxvd2VzdE5ld09ic2VydmluZ0Rlcml2YXRpb25TdGF0ZTtcbiAgICAgICAgZGVyaXZhdGlvbi5vbkJlY29tZVN0YWxlKCk7XG4gICAgfVxufVxuZnVuY3Rpb24gY2xlYXJPYnNlcnZpbmckJDEoZGVyaXZhdGlvbikge1xuICAgIC8vIGludmFyaWFudChnbG9iYWxTdGF0ZS5pbkJhdGNoID4gMCwgXCJJTlRFUk5BTCBFUlJPUiBjbGVhck9ic2VydmluZyBzaG91bGQgYmUgY2FsbGVkIG9ubHkgaW5zaWRlIGJhdGNoXCIpO1xuICAgIHZhciBvYnMgPSBkZXJpdmF0aW9uLm9ic2VydmluZztcbiAgICBkZXJpdmF0aW9uLm9ic2VydmluZyA9IFtdO1xuICAgIHZhciBpID0gb2JzLmxlbmd0aDtcbiAgICB3aGlsZSAoaS0tKVxuICAgICAgICByZW1vdmVPYnNlcnZlciQkMShvYnNbaV0sIGRlcml2YXRpb24pO1xuICAgIGRlcml2YXRpb24uZGVwZW5kZW5jaWVzU3RhdGUgPSBJRGVyaXZhdGlvblN0YXRlLk5PVF9UUkFDS0lORztcbn1cbmZ1bmN0aW9uIHVudHJhY2tlZCQkMShhY3Rpb24kJDEpIHtcbiAgICB2YXIgcHJldiA9IHVudHJhY2tlZFN0YXJ0JCQxKCk7XG4gICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIGFjdGlvbiQkMSgpO1xuICAgIH1cbiAgICBmaW5hbGx5IHtcbiAgICAgICAgdW50cmFja2VkRW5kJCQxKHByZXYpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIHVudHJhY2tlZFN0YXJ0JCQxKCkge1xuICAgIHZhciBwcmV2ID0gZ2xvYmFsU3RhdGUkJDEudHJhY2tpbmdEZXJpdmF0aW9uO1xuICAgIGdsb2JhbFN0YXRlJCQxLnRyYWNraW5nRGVyaXZhdGlvbiA9IG51bGw7XG4gICAgcmV0dXJuIHByZXY7XG59XG5mdW5jdGlvbiB1bnRyYWNrZWRFbmQkJDEocHJldikge1xuICAgIGdsb2JhbFN0YXRlJCQxLnRyYWNraW5nRGVyaXZhdGlvbiA9IHByZXY7XG59XG4vKipcbiAqIG5lZWRlZCB0byBrZWVwIGBsb3dlc3RPYnNlcnZlclN0YXRlYCBjb3JyZWN0LiB3aGVuIGNoYW5naW5nIGZyb20gKDIgb3IgMSkgdG8gMFxuICpcbiAqL1xuZnVuY3Rpb24gY2hhbmdlRGVwZW5kZW5jaWVzU3RhdGVUbzAkJDEoZGVyaXZhdGlvbikge1xuICAgIGlmIChkZXJpdmF0aW9uLmRlcGVuZGVuY2llc1N0YXRlID09PSBJRGVyaXZhdGlvblN0YXRlLlVQX1RPX0RBVEUpXG4gICAgICAgIHJldHVybjtcbiAgICBkZXJpdmF0aW9uLmRlcGVuZGVuY2llc1N0YXRlID0gSURlcml2YXRpb25TdGF0ZS5VUF9UT19EQVRFO1xuICAgIHZhciBvYnMgPSBkZXJpdmF0aW9uLm9ic2VydmluZztcbiAgICB2YXIgaSA9IG9icy5sZW5ndGg7XG4gICAgd2hpbGUgKGktLSlcbiAgICAgICAgb2JzW2ldLmxvd2VzdE9ic2VydmVyU3RhdGUgPSBJRGVyaXZhdGlvblN0YXRlLlVQX1RPX0RBVEU7XG59XG5cbi8qKlxuICogVGhlc2UgdmFsdWVzIHdpbGwgcGVyc2lzdCBpZiBnbG9iYWwgc3RhdGUgaXMgcmVzZXRcbiAqL1xudmFyIHBlcnNpc3RlbnRLZXlzID0gW1xuICAgIFwibW9ieEd1aWRcIixcbiAgICBcInNweUxpc3RlbmVyc1wiLFxuICAgIFwiZW5mb3JjZUFjdGlvbnNcIixcbiAgICBcImNvbXB1dGVkUmVxdWlyZXNSZWFjdGlvblwiLFxuICAgIFwiZGlzYWJsZUVycm9yQm91bmRhcmllc1wiLFxuICAgIFwicnVuSWRcIixcbiAgICBcIlVOQ0hBTkdFRFwiXG5dO1xudmFyIE1vYlhHbG9iYWxzJCQxID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE1vYlhHbG9iYWxzJCQxKCkge1xuICAgICAgICAvKipcbiAgICAgICAgICogTW9iWEdsb2JhbHMgdmVyc2lvbi5cbiAgICAgICAgICogTW9iWCBjb21wYXRpYmxpdHkgd2l0aCBvdGhlciB2ZXJzaW9ucyBsb2FkZWQgaW4gbWVtb3J5IGFzIGxvbmcgYXMgdGhpcyB2ZXJzaW9uIG1hdGNoZXMuXG4gICAgICAgICAqIEl0IGluZGljYXRlcyB0aGF0IHRoZSBnbG9iYWwgc3RhdGUgc3RpbGwgc3RvcmVzIHNpbWlsYXIgaW5mb3JtYXRpb25cbiAgICAgICAgICpcbiAgICAgICAgICogTi5COiB0aGlzIHZlcnNpb24gaXMgdW5yZWxhdGVkIHRvIHRoZSBwYWNrYWdlIHZlcnNpb24gb2YgTW9iWCwgYW5kIGlzIG9ubHkgdGhlIHZlcnNpb24gb2YgdGhlXG4gICAgICAgICAqIGludGVybmFsIHN0YXRlIHN0b3JhZ2Ugb2YgTW9iWCwgYW5kIGNhbiBiZSB0aGUgc2FtZSBhY3Jvc3MgbWFueSBkaWZmZXJlbnQgcGFja2FnZSB2ZXJzaW9uc1xuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy52ZXJzaW9uID0gNTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIGdsb2JhbGx5IHVuaXF1ZSB0b2tlbiB0byBzaWduYWwgdW5jaGFuZ2VkXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLlVOQ0hBTkdFRCA9IHt9O1xuICAgICAgICAvKipcbiAgICAgICAgICogQ3VycmVudGx5IHJ1bm5pbmcgZGVyaXZhdGlvblxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy50cmFja2luZ0Rlcml2YXRpb24gPSBudWxsO1xuICAgICAgICAvKipcbiAgICAgICAgICogQXJlIHdlIHJ1bm5pbmcgYSBjb21wdXRhdGlvbiBjdXJyZW50bHk/IChub3QgYSByZWFjdGlvbilcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuY29tcHV0YXRpb25EZXB0aCA9IDA7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBFYWNoIHRpbWUgYSBkZXJpdmF0aW9uIGlzIHRyYWNrZWQsIGl0IGlzIGFzc2lnbmVkIGEgdW5pcXVlIHJ1bi1pZFxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5ydW5JZCA9IDA7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiAnZ3VpZCcgZm9yIGdlbmVyYWwgcHVycG9zZS4gV2lsbCBiZSBwZXJzaXN0ZWQgYW1vbmdzdCByZXNldHMuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLm1vYnhHdWlkID0gMDtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEFyZSB3ZSBpbiBhIGJhdGNoIGJsb2NrPyAoYW5kIGhvdyBtYW55IG9mIHRoZW0pXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmluQmF0Y2ggPSAwO1xuICAgICAgICAvKipcbiAgICAgICAgICogT2JzZXJ2YWJsZXMgdGhhdCBkb24ndCBoYXZlIG9ic2VydmVycyBhbnltb3JlLCBhbmQgYXJlIGFib3V0IHRvIGJlXG4gICAgICAgICAqIHN1c3BlbmRlZCwgdW5sZXNzIHNvbWVib2R5IGVsc2UgYWNjZXNzZXMgaXQgaW4gdGhlIHNhbWUgYmF0Y2hcbiAgICAgICAgICpcbiAgICAgICAgICogQHR5cGUge0lPYnNlcnZhYmxlW119XG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnBlbmRpbmdVbm9ic2VydmF0aW9ucyA9IFtdO1xuICAgICAgICAvKipcbiAgICAgICAgICogTGlzdCBvZiBzY2hlZHVsZWQsIG5vdCB5ZXQgZXhlY3V0ZWQsIHJlYWN0aW9ucy5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMucGVuZGluZ1JlYWN0aW9ucyA9IFtdO1xuICAgICAgICAvKipcbiAgICAgICAgICogQXJlIHdlIGN1cnJlbnRseSBwcm9jZXNzaW5nIHJlYWN0aW9ucz9cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuaXNSdW5uaW5nUmVhY3Rpb25zID0gZmFsc2U7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJcyBpdCBhbGxvd2VkIHRvIGNoYW5nZSBvYnNlcnZhYmxlcyBhdCB0aGlzIHBvaW50P1xuICAgICAgICAgKiBJbiBnZW5lcmFsLCBNb2JYIGRvZXNuJ3QgYWxsb3cgdGhhdCB3aGVuIHJ1bm5pbmcgY29tcHV0YXRpb25zIGFuZCBSZWFjdC5yZW5kZXIuXG4gICAgICAgICAqIFRvIGVuc3VyZSB0aGF0IHRob3NlIGZ1bmN0aW9ucyBzdGF5IHB1cmUuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmFsbG93U3RhdGVDaGFuZ2VzID0gdHJ1ZTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIElmIHN0cmljdCBtb2RlIGlzIGVuYWJsZWQsIHN0YXRlIGNoYW5nZXMgYXJlIGJ5IGRlZmF1bHQgbm90IGFsbG93ZWRcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuZW5mb3JjZUFjdGlvbnMgPSBmYWxzZTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNweSBjYWxsYmFja3NcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuc3B5TGlzdGVuZXJzID0gW107XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBHbG9iYWxseSBhdHRhY2hlZCBlcnJvciBoYW5kbGVycyB0aGF0IHJlYWN0IHNwZWNpZmljYWxseSB0byBlcnJvcnMgaW4gcmVhY3Rpb25zXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmdsb2JhbFJlYWN0aW9uRXJyb3JIYW5kbGVycyA9IFtdO1xuICAgICAgICAvKipcbiAgICAgICAgICogV2FybiBpZiBjb21wdXRlZCB2YWx1ZXMgYXJlIGFjY2Vzc2VkIG91dHNpZGUgYSByZWFjdGl2ZSBjb250ZXh0XG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmNvbXB1dGVkUmVxdWlyZXNSZWFjdGlvbiA9IGZhbHNlO1xuICAgICAgICAvKlxuICAgICAgICAgKiBEb24ndCBjYXRjaCBhbmQgcmV0aHJvdyBleGNlcHRpb25zLiBUaGlzIGlzIHVzZWZ1bCBmb3IgaW5zcGVjdGluZyB0aGUgc3RhdGUgb2ZcbiAgICAgICAgICogdGhlIHN0YWNrIHdoZW4gYW4gZXhjZXB0aW9uIG9jY3VycyB3aGlsZSBkZWJ1Z2dpbmcuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmRpc2FibGVFcnJvckJvdW5kYXJpZXMgPSBmYWxzZTtcbiAgICAgICAgLypcbiAgICAgICAgICogSWYgdHJ1ZSwgd2UgYXJlIGFscmVhZHkgaGFuZGxpbmcgYW4gZXhjZXB0aW9uIGluIGFuIGFjdGlvbi4gQW55IGVycm9ycyBpbiByZWFjdGlvbnMgc2hvdWxkIGJlIHN1cHJlc3NlZCwgYXNcbiAgICAgICAgICogdGhleSBhcmUgbm90IHRoZSBjYXVzZSwgc2VlOiBodHRwczovL2dpdGh1Yi5jb20vbW9ieGpzL21vYngvaXNzdWVzLzE4MzZcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuc3VwcHJlc3NSZWFjdGlvbkVycm9ycyA9IGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gTW9iWEdsb2JhbHMkJDE7XG59KCkpO1xudmFyIGNhbk1lcmdlR2xvYmFsU3RhdGUgPSB0cnVlO1xudmFyIGlzb2xhdGVDYWxsZWQgPSBmYWxzZTtcbnZhciBnbG9iYWxTdGF0ZSQkMSA9IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGdsb2JhbCA9IGdldEdsb2JhbCQkMSgpO1xuICAgIGlmIChnbG9iYWwuX19tb2J4SW5zdGFuY2VDb3VudCA+IDAgJiYgIWdsb2JhbC5fX21vYnhHbG9iYWxzKVxuICAgICAgICBjYW5NZXJnZUdsb2JhbFN0YXRlID0gZmFsc2U7XG4gICAgaWYgKGdsb2JhbC5fX21vYnhHbG9iYWxzICYmIGdsb2JhbC5fX21vYnhHbG9iYWxzLnZlcnNpb24gIT09IG5ldyBNb2JYR2xvYmFscyQkMSgpLnZlcnNpb24pXG4gICAgICAgIGNhbk1lcmdlR2xvYmFsU3RhdGUgPSBmYWxzZTtcbiAgICBpZiAoIWNhbk1lcmdlR2xvYmFsU3RhdGUpIHtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoIWlzb2xhdGVDYWxsZWQpIHtcbiAgICAgICAgICAgICAgICBmYWlsJCQxKFwiVGhlcmUgYXJlIG11bHRpcGxlLCBkaWZmZXJlbnQgdmVyc2lvbnMgb2YgTW9iWCBhY3RpdmUuIE1ha2Ugc3VyZSBNb2JYIGlzIGxvYWRlZCBvbmx5IG9uY2Ugb3IgdXNlIGBjb25maWd1cmUoeyBpc29sYXRlR2xvYmFsU3RhdGU6IHRydWUgfSlgXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCAxKTtcbiAgICAgICAgcmV0dXJuIG5ldyBNb2JYR2xvYmFscyQkMSgpO1xuICAgIH1cbiAgICBlbHNlIGlmIChnbG9iYWwuX19tb2J4R2xvYmFscykge1xuICAgICAgICBnbG9iYWwuX19tb2J4SW5zdGFuY2VDb3VudCArPSAxO1xuICAgICAgICBpZiAoIWdsb2JhbC5fX21vYnhHbG9iYWxzLlVOQ0hBTkdFRClcbiAgICAgICAgICAgIGdsb2JhbC5fX21vYnhHbG9iYWxzLlVOQ0hBTkdFRCA9IHt9OyAvLyBtYWtlIG1lcmdlIGJhY2t3YXJkIGNvbXBhdGlibGVcbiAgICAgICAgcmV0dXJuIGdsb2JhbC5fX21vYnhHbG9iYWxzO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgZ2xvYmFsLl9fbW9ieEluc3RhbmNlQ291bnQgPSAxO1xuICAgICAgICByZXR1cm4gKGdsb2JhbC5fX21vYnhHbG9iYWxzID0gbmV3IE1vYlhHbG9iYWxzJCQxKCkpO1xuICAgIH1cbn0pKCk7XG5mdW5jdGlvbiBpc29sYXRlR2xvYmFsU3RhdGUkJDEoKSB7XG4gICAgaWYgKGdsb2JhbFN0YXRlJCQxLnBlbmRpbmdSZWFjdGlvbnMubGVuZ3RoIHx8XG4gICAgICAgIGdsb2JhbFN0YXRlJCQxLmluQmF0Y2ggfHxcbiAgICAgICAgZ2xvYmFsU3RhdGUkJDEuaXNSdW5uaW5nUmVhY3Rpb25zKVxuICAgICAgICBmYWlsJCQxKFwiaXNvbGF0ZUdsb2JhbFN0YXRlIHNob3VsZCBiZSBjYWxsZWQgYmVmb3JlIE1vYlggaXMgcnVubmluZyBhbnkgcmVhY3Rpb25zXCIpO1xuICAgIGlzb2xhdGVDYWxsZWQgPSB0cnVlO1xuICAgIGlmIChjYW5NZXJnZUdsb2JhbFN0YXRlKSB7XG4gICAgICAgIGlmICgtLWdldEdsb2JhbCQkMSgpLl9fbW9ieEluc3RhbmNlQ291bnQgPT09IDApXG4gICAgICAgICAgICBnZXRHbG9iYWwkJDEoKS5fX21vYnhHbG9iYWxzID0gdW5kZWZpbmVkO1xuICAgICAgICBnbG9iYWxTdGF0ZSQkMSA9IG5ldyBNb2JYR2xvYmFscyQkMSgpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGdldEdsb2JhbFN0YXRlJCQxKCkge1xuICAgIHJldHVybiBnbG9iYWxTdGF0ZSQkMTtcbn1cbi8qKlxuICogRm9yIHRlc3RpbmcgcHVycG9zZXMgb25seTsgdGhpcyB3aWxsIGJyZWFrIHRoZSBpbnRlcm5hbCBzdGF0ZSBvZiBleGlzdGluZyBvYnNlcnZhYmxlcyxcbiAqIGJ1dCBjYW4gYmUgdXNlZCB0byBnZXQgYmFjayBhdCBhIHN0YWJsZSBzdGF0ZSBhZnRlciB0aHJvd2luZyBlcnJvcnNcbiAqL1xuZnVuY3Rpb24gcmVzZXRHbG9iYWxTdGF0ZSQkMSgpIHtcbiAgICB2YXIgZGVmYXVsdEdsb2JhbHMgPSBuZXcgTW9iWEdsb2JhbHMkJDEoKTtcbiAgICBmb3IgKHZhciBrZXkgaW4gZGVmYXVsdEdsb2JhbHMpXG4gICAgICAgIGlmIChwZXJzaXN0ZW50S2V5cy5pbmRleE9mKGtleSkgPT09IC0xKVxuICAgICAgICAgICAgZ2xvYmFsU3RhdGUkJDFba2V5XSA9IGRlZmF1bHRHbG9iYWxzW2tleV07XG4gICAgZ2xvYmFsU3RhdGUkJDEuYWxsb3dTdGF0ZUNoYW5nZXMgPSAhZ2xvYmFsU3RhdGUkJDEuZW5mb3JjZUFjdGlvbnM7XG59XG5mdW5jdGlvbiBnZXRHbG9iYWwkJDEoKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiBnbG9iYWw7XG59XG5cbmZ1bmN0aW9uIGhhc09ic2VydmVycyQkMShvYnNlcnZhYmxlJCQxKSB7XG4gICAgcmV0dXJuIG9ic2VydmFibGUkJDEub2JzZXJ2ZXJzICYmIG9ic2VydmFibGUkJDEub2JzZXJ2ZXJzLnNpemUgPiAwO1xufVxuZnVuY3Rpb24gZ2V0T2JzZXJ2ZXJzJCQxKG9ic2VydmFibGUkJDEpIHtcbiAgICByZXR1cm4gb2JzZXJ2YWJsZSQkMS5vYnNlcnZlcnM7XG59XG4vLyBmdW5jdGlvbiBpbnZhcmlhbnRPYnNlcnZlcnMob2JzZXJ2YWJsZTogSU9ic2VydmFibGUpIHtcbi8vICAgICBjb25zdCBsaXN0ID0gb2JzZXJ2YWJsZS5vYnNlcnZlcnNcbi8vICAgICBjb25zdCBtYXAgPSBvYnNlcnZhYmxlLm9ic2VydmVyc0luZGV4ZXNcbi8vICAgICBjb25zdCBsID0gbGlzdC5sZW5ndGhcbi8vICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGw7IGkrKykge1xuLy8gICAgICAgICBjb25zdCBpZCA9IGxpc3RbaV0uX19tYXBpZFxuLy8gICAgICAgICBpZiAoaSkge1xuLy8gICAgICAgICAgICAgaW52YXJpYW50KG1hcFtpZF0gPT09IGksIFwiSU5URVJOQUwgRVJST1IgbWFwcyBkZXJpdmF0aW9uLl9fbWFwaWQgdG8gaW5kZXggaW4gbGlzdFwiKSAvLyBmb3IgcGVyZm9ybWFuY2Vcbi8vICAgICAgICAgfSBlbHNlIHtcbi8vICAgICAgICAgICAgIGludmFyaWFudCghKGlkIGluIG1hcCksIFwiSU5URVJOQUwgRVJST1Igb2JzZXJ2ZXIgb24gaW5kZXggMCBzaG91bGRuJ3QgYmUgaGVsZCBpbiBtYXAuXCIpIC8vIGZvciBwZXJmb3JtYW5jZVxuLy8gICAgICAgICB9XG4vLyAgICAgfVxuLy8gICAgIGludmFyaWFudChcbi8vICAgICAgICAgbGlzdC5sZW5ndGggPT09IDAgfHwgT2JqZWN0LmtleXMobWFwKS5sZW5ndGggPT09IGxpc3QubGVuZ3RoIC0gMSxcbi8vICAgICAgICAgXCJJTlRFUk5BTCBFUlJPUiB0aGVyZSBpcyBubyBqdW5rIGluIG1hcFwiXG4vLyAgICAgKVxuLy8gfVxuZnVuY3Rpb24gYWRkT2JzZXJ2ZXIkJDEob2JzZXJ2YWJsZSQkMSwgbm9kZSkge1xuICAgIC8vIGludmFyaWFudChub2RlLmRlcGVuZGVuY2llc1N0YXRlICE9PSAtMSwgXCJJTlRFUk5BTCBFUlJPUiwgY2FuIGFkZCBvbmx5IGRlcGVuZGVuY2llc1N0YXRlICE9PSAtMVwiKTtcbiAgICAvLyBpbnZhcmlhbnQob2JzZXJ2YWJsZS5fb2JzZXJ2ZXJzLmluZGV4T2Yobm9kZSkgPT09IC0xLCBcIklOVEVSTkFMIEVSUk9SIGFkZCBhbHJlYWR5IGFkZGVkIG5vZGVcIik7XG4gICAgLy8gaW52YXJpYW50T2JzZXJ2ZXJzKG9ic2VydmFibGUpO1xuICAgIG9ic2VydmFibGUkJDEub2JzZXJ2ZXJzLmFkZChub2RlKTtcbiAgICBpZiAob2JzZXJ2YWJsZSQkMS5sb3dlc3RPYnNlcnZlclN0YXRlID4gbm9kZS5kZXBlbmRlbmNpZXNTdGF0ZSlcbiAgICAgICAgb2JzZXJ2YWJsZSQkMS5sb3dlc3RPYnNlcnZlclN0YXRlID0gbm9kZS5kZXBlbmRlbmNpZXNTdGF0ZTtcbiAgICAvLyBpbnZhcmlhbnRPYnNlcnZlcnMob2JzZXJ2YWJsZSk7XG4gICAgLy8gaW52YXJpYW50KG9ic2VydmFibGUuX29ic2VydmVycy5pbmRleE9mKG5vZGUpICE9PSAtMSwgXCJJTlRFUk5BTCBFUlJPUiBkaWRuJ3QgYWRkIG5vZGVcIik7XG59XG5mdW5jdGlvbiByZW1vdmVPYnNlcnZlciQkMShvYnNlcnZhYmxlJCQxLCBub2RlKSB7XG4gICAgLy8gaW52YXJpYW50KGdsb2JhbFN0YXRlLmluQmF0Y2ggPiAwLCBcIklOVEVSTkFMIEVSUk9SLCByZW1vdmUgc2hvdWxkIGJlIGNhbGxlZCBvbmx5IGluc2lkZSBiYXRjaFwiKTtcbiAgICAvLyBpbnZhcmlhbnQob2JzZXJ2YWJsZS5fb2JzZXJ2ZXJzLmluZGV4T2Yobm9kZSkgIT09IC0xLCBcIklOVEVSTkFMIEVSUk9SIHJlbW92ZSBhbHJlYWR5IHJlbW92ZWQgbm9kZVwiKTtcbiAgICAvLyBpbnZhcmlhbnRPYnNlcnZlcnMob2JzZXJ2YWJsZSk7XG4gICAgb2JzZXJ2YWJsZSQkMS5vYnNlcnZlcnMuZGVsZXRlKG5vZGUpO1xuICAgIGlmIChvYnNlcnZhYmxlJCQxLm9ic2VydmVycy5zaXplID09PSAwKSB7XG4gICAgICAgIC8vIGRlbGV0aW5nIGxhc3Qgb2JzZXJ2ZXJcbiAgICAgICAgcXVldWVGb3JVbm9ic2VydmF0aW9uJCQxKG9ic2VydmFibGUkJDEpO1xuICAgIH1cbiAgICAvLyBpbnZhcmlhbnRPYnNlcnZlcnMob2JzZXJ2YWJsZSk7XG4gICAgLy8gaW52YXJpYW50KG9ic2VydmFibGUuX29ic2VydmVycy5pbmRleE9mKG5vZGUpID09PSAtMSwgXCJJTlRFUk5BTCBFUlJPUiByZW1vdmUgYWxyZWFkeSByZW1vdmVkIG5vZGUyXCIpO1xufVxuZnVuY3Rpb24gcXVldWVGb3JVbm9ic2VydmF0aW9uJCQxKG9ic2VydmFibGUkJDEpIHtcbiAgICBpZiAob2JzZXJ2YWJsZSQkMS5pc1BlbmRpbmdVbm9ic2VydmF0aW9uID09PSBmYWxzZSkge1xuICAgICAgICAvLyBpbnZhcmlhbnQob2JzZXJ2YWJsZS5fb2JzZXJ2ZXJzLmxlbmd0aCA9PT0gMCwgXCJJTlRFUk5BTCBFUlJPUiwgc2hvdWxkIG9ubHkgcXVldWUgZm9yIHVub2JzZXJ2YXRpb24gdW5vYnNlcnZlZCBvYnNlcnZhYmxlc1wiKTtcbiAgICAgICAgb2JzZXJ2YWJsZSQkMS5pc1BlbmRpbmdVbm9ic2VydmF0aW9uID0gdHJ1ZTtcbiAgICAgICAgZ2xvYmFsU3RhdGUkJDEucGVuZGluZ1Vub2JzZXJ2YXRpb25zLnB1c2gob2JzZXJ2YWJsZSQkMSk7XG4gICAgfVxufVxuLyoqXG4gKiBCYXRjaCBzdGFydHMgYSB0cmFuc2FjdGlvbiwgYXQgbGVhc3QgZm9yIHB1cnBvc2VzIG9mIG1lbW9pemluZyBDb21wdXRlZFZhbHVlcyB3aGVuIG5vdGhpbmcgZWxzZSBkb2VzLlxuICogRHVyaW5nIGEgYmF0Y2ggYG9uQmVjb21lVW5vYnNlcnZlZGAgd2lsbCBiZSBjYWxsZWQgYXQgbW9zdCBvbmNlIHBlciBvYnNlcnZhYmxlLlxuICogQXZvaWRzIHVubmVjZXNzYXJ5IHJlY2FsY3VsYXRpb25zLlxuICovXG5mdW5jdGlvbiBzdGFydEJhdGNoJCQxKCkge1xuICAgIGdsb2JhbFN0YXRlJCQxLmluQmF0Y2grKztcbn1cbmZ1bmN0aW9uIGVuZEJhdGNoJCQxKCkge1xuICAgIGlmICgtLWdsb2JhbFN0YXRlJCQxLmluQmF0Y2ggPT09IDApIHtcbiAgICAgICAgcnVuUmVhY3Rpb25zJCQxKCk7XG4gICAgICAgIC8vIHRoZSBiYXRjaCBpcyBhY3R1YWxseSBhYm91dCB0byBmaW5pc2gsIGFsbCB1bm9ic2VydmluZyBzaG91bGQgaGFwcGVuIGhlcmUuXG4gICAgICAgIHZhciBsaXN0ID0gZ2xvYmFsU3RhdGUkJDEucGVuZGluZ1Vub2JzZXJ2YXRpb25zO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBvYnNlcnZhYmxlJCQxID0gbGlzdFtpXTtcbiAgICAgICAgICAgIG9ic2VydmFibGUkJDEuaXNQZW5kaW5nVW5vYnNlcnZhdGlvbiA9IGZhbHNlO1xuICAgICAgICAgICAgaWYgKG9ic2VydmFibGUkJDEub2JzZXJ2ZXJzLnNpemUgPT09IDApIHtcbiAgICAgICAgICAgICAgICBpZiAob2JzZXJ2YWJsZSQkMS5pc0JlaW5nT2JzZXJ2ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgdGhpcyBvYnNlcnZhYmxlIGhhZCByZWFjdGl2ZSBvYnNlcnZlcnMsIHRyaWdnZXIgdGhlIGhvb2tzXG4gICAgICAgICAgICAgICAgICAgIG9ic2VydmFibGUkJDEuaXNCZWluZ09ic2VydmVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIG9ic2VydmFibGUkJDEub25CZWNvbWVVbm9ic2VydmVkKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChvYnNlcnZhYmxlJCQxIGluc3RhbmNlb2YgQ29tcHV0ZWRWYWx1ZSQkMSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBjb21wdXRlZCB2YWx1ZXMgYXJlIGF1dG9tYXRpY2FsbHkgdGVhcmVkIGRvd24gd2hlbiB0aGUgbGFzdCBvYnNlcnZlciBsZWF2ZXNcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhpcyBwcm9jZXNzIGhhcHBlbnMgcmVjdXJzaXZlbHksIHRoaXMgY29tcHV0ZWQgbWlnaHQgYmUgdGhlIGxhc3Qgb2JzZXJ2YWJlIG9mIGFub3RoZXIsIGV0Yy4uXG4gICAgICAgICAgICAgICAgICAgIG9ic2VydmFibGUkJDEuc3VzcGVuZCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBnbG9iYWxTdGF0ZSQkMS5wZW5kaW5nVW5vYnNlcnZhdGlvbnMgPSBbXTtcbiAgICB9XG59XG5mdW5jdGlvbiByZXBvcnRPYnNlcnZlZCQkMShvYnNlcnZhYmxlJCQxKSB7XG4gICAgdmFyIGRlcml2YXRpb24gPSBnbG9iYWxTdGF0ZSQkMS50cmFja2luZ0Rlcml2YXRpb247XG4gICAgaWYgKGRlcml2YXRpb24gIT09IG51bGwpIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNpbXBsZSBvcHRpbWl6YXRpb24sIGdpdmUgZWFjaCBkZXJpdmF0aW9uIHJ1biBhbiB1bmlxdWUgaWQgKHJ1bklkKVxuICAgICAgICAgKiBDaGVjayBpZiBsYXN0IHRpbWUgdGhpcyBvYnNlcnZhYmxlIHdhcyBhY2Nlc3NlZCB0aGUgc2FtZSBydW5JZCBpcyB1c2VkXG4gICAgICAgICAqIGlmIHRoaXMgaXMgdGhlIGNhc2UsIHRoZSByZWxhdGlvbiBpcyBhbHJlYWR5IGtub3duXG4gICAgICAgICAqL1xuICAgICAgICBpZiAoZGVyaXZhdGlvbi5ydW5JZCAhPT0gb2JzZXJ2YWJsZSQkMS5sYXN0QWNjZXNzZWRCeSkge1xuICAgICAgICAgICAgb2JzZXJ2YWJsZSQkMS5sYXN0QWNjZXNzZWRCeSA9IGRlcml2YXRpb24ucnVuSWQ7XG4gICAgICAgICAgICAvLyBUcmllZCBzdG9yaW5nIG5ld09ic2VydmluZywgb3Igb2JzZXJ2aW5nLCBvciBib3RoIGFzIFNldCwgYnV0IHBlcmZvcm1hbmNlIGRpZG4ndCBjb21lIGNsb3NlLi4uXG4gICAgICAgICAgICBkZXJpdmF0aW9uLm5ld09ic2VydmluZ1tkZXJpdmF0aW9uLnVuYm91bmREZXBzQ291bnQrK10gPSBvYnNlcnZhYmxlJCQxO1xuICAgICAgICAgICAgaWYgKCFvYnNlcnZhYmxlJCQxLmlzQmVpbmdPYnNlcnZlZCkge1xuICAgICAgICAgICAgICAgIG9ic2VydmFibGUkJDEuaXNCZWluZ09ic2VydmVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBvYnNlcnZhYmxlJCQxLm9uQmVjb21lT2JzZXJ2ZWQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgZWxzZSBpZiAob2JzZXJ2YWJsZSQkMS5vYnNlcnZlcnMuc2l6ZSA9PT0gMCAmJiBnbG9iYWxTdGF0ZSQkMS5pbkJhdGNoID4gMCkge1xuICAgICAgICBxdWV1ZUZvclVub2JzZXJ2YXRpb24kJDEob2JzZXJ2YWJsZSQkMSk7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbn1cbi8vIGZ1bmN0aW9uIGludmFyaWFudExPUyhvYnNlcnZhYmxlOiBJT2JzZXJ2YWJsZSwgbXNnOiBzdHJpbmcpIHtcbi8vICAgICAvLyBpdCdzIGV4cGVuc2l2ZSBzbyBiZXR0ZXIgbm90IHJ1biBpdCBpbiBwcm9kdWNpdG9uLiBidXQgdGVtcG9yYXJpbHkgaGVscGZ1bCBmb3IgdGVzdGluZ1xuLy8gICAgIGNvbnN0IG1pbiA9IGdldE9ic2VydmVycyhvYnNlcnZhYmxlKS5yZWR1Y2UoKGEsIGIpID0+IE1hdGgubWluKGEsIGIuZGVwZW5kZW5jaWVzU3RhdGUpLCAyKVxuLy8gICAgIGlmIChtaW4gPj0gb2JzZXJ2YWJsZS5sb3dlc3RPYnNlcnZlclN0YXRlKSByZXR1cm4gLy8gPC0gdGhlIG9ubHkgYXNzdW1wdGlvbiBhYm91dCBgbG93ZXN0T2JzZXJ2ZXJTdGF0ZWBcbi8vICAgICB0aHJvdyBuZXcgRXJyb3IoXG4vLyAgICAgICAgIFwibG93ZXN0T2JzZXJ2ZXJTdGF0ZSBpcyB3cm9uZyBmb3IgXCIgK1xuLy8gICAgICAgICAgICAgbXNnICtcbi8vICAgICAgICAgICAgIFwiIGJlY2F1c2UgXCIgK1xuLy8gICAgICAgICAgICAgbWluICtcbi8vICAgICAgICAgICAgIFwiIDwgXCIgK1xuLy8gICAgICAgICAgICAgb2JzZXJ2YWJsZS5sb3dlc3RPYnNlcnZlclN0YXRlXG4vLyAgICAgKVxuLy8gfVxuLyoqXG4gKiBOT1RFOiBjdXJyZW50IHByb3BhZ2F0aW9uIG1lY2hhbmlzbSB3aWxsIGluIGNhc2Ugb2Ygc2VsZiByZXJ1bmluZyBhdXRvcnVucyBiZWhhdmUgdW5leHBlY3RlZGx5XG4gKiBJdCB3aWxsIHByb3BhZ2F0ZSBjaGFuZ2VzIHRvIG9ic2VydmVycyBmcm9tIHByZXZpb3VzIHJ1blxuICogSXQncyBoYXJkIG9yIG1heWJlIGltcG9zc2libGUgKHdpdGggcmVhc29uYWJsZSBwZXJmKSB0byBnZXQgaXQgcmlnaHQgd2l0aCBjdXJyZW50IGFwcHJvYWNoXG4gKiBIb3BlZnVsbHkgc2VsZiByZXJ1bmluZyBhdXRvcnVucyBhcmVuJ3QgYSBmZWF0dXJlIHBlb3BsZSBzaG91bGQgZGVwZW5kIG9uXG4gKiBBbHNvIG1vc3QgYmFzaWMgdXNlIGNhc2VzIHNob3VsZCBiZSBva1xuICovXG4vLyBDYWxsZWQgYnkgQXRvbSB3aGVuIGl0cyB2YWx1ZSBjaGFuZ2VzXG5mdW5jdGlvbiBwcm9wYWdhdGVDaGFuZ2VkJCQxKG9ic2VydmFibGUkJDEpIHtcbiAgICAvLyBpbnZhcmlhbnRMT1Mob2JzZXJ2YWJsZSwgXCJjaGFuZ2VkIHN0YXJ0XCIpO1xuICAgIGlmIChvYnNlcnZhYmxlJCQxLmxvd2VzdE9ic2VydmVyU3RhdGUgPT09IElEZXJpdmF0aW9uU3RhdGUuU1RBTEUpXG4gICAgICAgIHJldHVybjtcbiAgICBvYnNlcnZhYmxlJCQxLmxvd2VzdE9ic2VydmVyU3RhdGUgPSBJRGVyaXZhdGlvblN0YXRlLlNUQUxFO1xuICAgIC8vIElkZWFsbHkgd2UgdXNlIGZvci4ub2YgaGVyZSwgYnV0IHRoZSBkb3duY29tcGlsZWQgdmVyc2lvbiBpcyByZWFsbHkgc2xvdy4uLlxuICAgIG9ic2VydmFibGUkJDEub2JzZXJ2ZXJzLmZvckVhY2goZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgaWYgKGQuZGVwZW5kZW5jaWVzU3RhdGUgPT09IElEZXJpdmF0aW9uU3RhdGUuVVBfVE9fREFURSkge1xuICAgICAgICAgICAgaWYgKGQuaXNUcmFjaW5nICE9PSBUcmFjZU1vZGUkJDEuTk9ORSkge1xuICAgICAgICAgICAgICAgIGxvZ1RyYWNlSW5mbyhkLCBvYnNlcnZhYmxlJCQxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGQub25CZWNvbWVTdGFsZSgpO1xuICAgICAgICB9XG4gICAgICAgIGQuZGVwZW5kZW5jaWVzU3RhdGUgPSBJRGVyaXZhdGlvblN0YXRlLlNUQUxFO1xuICAgIH0pO1xuICAgIC8vIGludmFyaWFudExPUyhvYnNlcnZhYmxlLCBcImNoYW5nZWQgZW5kXCIpO1xufVxuLy8gQ2FsbGVkIGJ5IENvbXB1dGVkVmFsdWUgd2hlbiBpdCByZWNhbGN1bGF0ZSBhbmQgaXRzIHZhbHVlIGNoYW5nZWRcbmZ1bmN0aW9uIHByb3BhZ2F0ZUNoYW5nZUNvbmZpcm1lZCQkMShvYnNlcnZhYmxlJCQxKSB7XG4gICAgLy8gaW52YXJpYW50TE9TKG9ic2VydmFibGUsIFwiY29uZmlybWVkIHN0YXJ0XCIpO1xuICAgIGlmIChvYnNlcnZhYmxlJCQxLmxvd2VzdE9ic2VydmVyU3RhdGUgPT09IElEZXJpdmF0aW9uU3RhdGUuU1RBTEUpXG4gICAgICAgIHJldHVybjtcbiAgICBvYnNlcnZhYmxlJCQxLmxvd2VzdE9ic2VydmVyU3RhdGUgPSBJRGVyaXZhdGlvblN0YXRlLlNUQUxFO1xuICAgIG9ic2VydmFibGUkJDEub2JzZXJ2ZXJzLmZvckVhY2goZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgaWYgKGQuZGVwZW5kZW5jaWVzU3RhdGUgPT09IElEZXJpdmF0aW9uU3RhdGUuUE9TU0lCTFlfU1RBTEUpXG4gICAgICAgICAgICBkLmRlcGVuZGVuY2llc1N0YXRlID0gSURlcml2YXRpb25TdGF0ZS5TVEFMRTtcbiAgICAgICAgZWxzZSBpZiAoZC5kZXBlbmRlbmNpZXNTdGF0ZSA9PT0gSURlcml2YXRpb25TdGF0ZS5VUF9UT19EQVRFIC8vIHRoaXMgaGFwcGVucyBkdXJpbmcgY29tcHV0aW5nIG9mIGBkYCwganVzdCBrZWVwIGxvd2VzdE9ic2VydmVyU3RhdGUgdXAgdG8gZGF0ZS5cbiAgICAgICAgKVxuICAgICAgICAgICAgb2JzZXJ2YWJsZSQkMS5sb3dlc3RPYnNlcnZlclN0YXRlID0gSURlcml2YXRpb25TdGF0ZS5VUF9UT19EQVRFO1xuICAgIH0pO1xuICAgIC8vIGludmFyaWFudExPUyhvYnNlcnZhYmxlLCBcImNvbmZpcm1lZCBlbmRcIik7XG59XG4vLyBVc2VkIGJ5IGNvbXB1dGVkIHdoZW4gaXRzIGRlcGVuZGVuY3kgY2hhbmdlZCwgYnV0IHdlIGRvbid0IHdhbid0IHRvIGltbWVkaWF0ZWx5IHJlY29tcHV0ZS5cbmZ1bmN0aW9uIHByb3BhZ2F0ZU1heWJlQ2hhbmdlZCQkMShvYnNlcnZhYmxlJCQxKSB7XG4gICAgLy8gaW52YXJpYW50TE9TKG9ic2VydmFibGUsIFwibWF5YmUgc3RhcnRcIik7XG4gICAgaWYgKG9ic2VydmFibGUkJDEubG93ZXN0T2JzZXJ2ZXJTdGF0ZSAhPT0gSURlcml2YXRpb25TdGF0ZS5VUF9UT19EQVRFKVxuICAgICAgICByZXR1cm47XG4gICAgb2JzZXJ2YWJsZSQkMS5sb3dlc3RPYnNlcnZlclN0YXRlID0gSURlcml2YXRpb25TdGF0ZS5QT1NTSUJMWV9TVEFMRTtcbiAgICBvYnNlcnZhYmxlJCQxLm9ic2VydmVycy5mb3JFYWNoKGZ1bmN0aW9uIChkKSB7XG4gICAgICAgIGlmIChkLmRlcGVuZGVuY2llc1N0YXRlID09PSBJRGVyaXZhdGlvblN0YXRlLlVQX1RPX0RBVEUpIHtcbiAgICAgICAgICAgIGQuZGVwZW5kZW5jaWVzU3RhdGUgPSBJRGVyaXZhdGlvblN0YXRlLlBPU1NJQkxZX1NUQUxFO1xuICAgICAgICAgICAgaWYgKGQuaXNUcmFjaW5nICE9PSBUcmFjZU1vZGUkJDEuTk9ORSkge1xuICAgICAgICAgICAgICAgIGxvZ1RyYWNlSW5mbyhkLCBvYnNlcnZhYmxlJCQxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGQub25CZWNvbWVTdGFsZSgpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgLy8gaW52YXJpYW50TE9TKG9ic2VydmFibGUsIFwibWF5YmUgZW5kXCIpO1xufVxuZnVuY3Rpb24gbG9nVHJhY2VJbmZvKGRlcml2YXRpb24sIG9ic2VydmFibGUkJDEpIHtcbiAgICBjb25zb2xlLmxvZyhcIlttb2J4LnRyYWNlXSAnXCIgKyBkZXJpdmF0aW9uLm5hbWUgKyBcIicgaXMgaW52YWxpZGF0ZWQgZHVlIHRvIGEgY2hhbmdlIGluOiAnXCIgKyBvYnNlcnZhYmxlJCQxLm5hbWUgKyBcIidcIik7XG4gICAgaWYgKGRlcml2YXRpb24uaXNUcmFjaW5nID09PSBUcmFjZU1vZGUkJDEuQlJFQUspIHtcbiAgICAgICAgdmFyIGxpbmVzID0gW107XG4gICAgICAgIHByaW50RGVwVHJlZShnZXREZXBlbmRlbmN5VHJlZSQkMShkZXJpdmF0aW9uKSwgbGluZXMsIDEpO1xuICAgICAgICAvLyBwcmV0dGllci1pZ25vcmVcbiAgICAgICAgbmV3IEZ1bmN0aW9uKFwiZGVidWdnZXI7XFxuLypcXG5UcmFjaW5nICdcIiArIGRlcml2YXRpb24ubmFtZSArIFwiJ1xcblxcbllvdSBhcmUgZW50ZXJpbmcgdGhpcyBicmVhayBwb2ludCBiZWNhdXNlIGRlcml2YXRpb24gJ1wiICsgZGVyaXZhdGlvbi5uYW1lICsgXCInIGlzIGJlaW5nIHRyYWNlZCBhbmQgJ1wiICsgb2JzZXJ2YWJsZSQkMS5uYW1lICsgXCInIGlzIG5vdyBmb3JjaW5nIGl0IHRvIHVwZGF0ZS5cXG5KdXN0IGZvbGxvdyB0aGUgc3RhY2t0cmFjZSB5b3Ugc2hvdWxkIG5vdyBzZWUgaW4gdGhlIGRldnRvb2xzIHRvIHNlZSBwcmVjaXNlbHkgd2hhdCBwaWVjZSBvZiB5b3VyIGNvZGUgaXMgY2F1c2luZyB0aGlzIHVwZGF0ZVxcblRoZSBzdGFja2ZyYW1lIHlvdSBhcmUgbG9va2luZyBmb3IgaXMgYXQgbGVhc3QgfjYtOCBzdGFjay1mcmFtZXMgdXAuXFxuXFxuXCIgKyAoZGVyaXZhdGlvbiBpbnN0YW5jZW9mIENvbXB1dGVkVmFsdWUkJDEgPyBkZXJpdmF0aW9uLmRlcml2YXRpb24udG9TdHJpbmcoKS5yZXBsYWNlKC9bKl1cXC8vZywgXCIvXCIpIDogXCJcIikgKyBcIlxcblxcblRoZSBkZXBlbmRlbmNpZXMgZm9yIHRoaXMgZGVyaXZhdGlvbiBhcmU6XFxuXFxuXCIgKyBsaW5lcy5qb2luKFwiXFxuXCIpICsgXCJcXG4qL1xcbiAgICBcIikoKTtcbiAgICB9XG59XG5mdW5jdGlvbiBwcmludERlcFRyZWUodHJlZSwgbGluZXMsIGRlcHRoKSB7XG4gICAgaWYgKGxpbmVzLmxlbmd0aCA+PSAxMDAwKSB7XG4gICAgICAgIGxpbmVzLnB1c2goXCIoYW5kIG1hbnkgbW9yZSlcIik7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgbGluZXMucHVzaChcIlwiICsgbmV3IEFycmF5KGRlcHRoKS5qb2luKFwiXFx0XCIpICsgdHJlZS5uYW1lKTsgLy8gTVdFOiBub3QgdGhlIGZhc3Rlc3QsIGJ1dCB0aGUgZWFzaWVzdCB3YXkgOilcbiAgICBpZiAodHJlZS5kZXBlbmRlbmNpZXMpXG4gICAgICAgIHRyZWUuZGVwZW5kZW5jaWVzLmZvckVhY2goZnVuY3Rpb24gKGNoaWxkKSB7IHJldHVybiBwcmludERlcFRyZWUoY2hpbGQsIGxpbmVzLCBkZXB0aCArIDEpOyB9KTtcbn1cblxudmFyIFJlYWN0aW9uJCQxID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFJlYWN0aW9uJCQxKG5hbWUsIG9uSW52YWxpZGF0ZSwgZXJyb3JIYW5kbGVyKSB7XG4gICAgICAgIGlmIChuYW1lID09PSB2b2lkIDApIHsgbmFtZSA9IFwiUmVhY3Rpb25AXCIgKyBnZXROZXh0SWQkJDEoKTsgfVxuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLm9uSW52YWxpZGF0ZSA9IG9uSW52YWxpZGF0ZTtcbiAgICAgICAgdGhpcy5lcnJvckhhbmRsZXIgPSBlcnJvckhhbmRsZXI7XG4gICAgICAgIHRoaXMub2JzZXJ2aW5nID0gW107IC8vIG5vZGVzIHdlIGFyZSBsb29raW5nIGF0LiBPdXIgdmFsdWUgZGVwZW5kcyBvbiB0aGVzZSBub2Rlc1xuICAgICAgICB0aGlzLm5ld09ic2VydmluZyA9IFtdO1xuICAgICAgICB0aGlzLmRlcGVuZGVuY2llc1N0YXRlID0gSURlcml2YXRpb25TdGF0ZS5OT1RfVFJBQ0tJTkc7XG4gICAgICAgIHRoaXMuZGlmZlZhbHVlID0gMDtcbiAgICAgICAgdGhpcy5ydW5JZCA9IDA7XG4gICAgICAgIHRoaXMudW5ib3VuZERlcHNDb3VudCA9IDA7XG4gICAgICAgIHRoaXMuX19tYXBpZCA9IFwiI1wiICsgZ2V0TmV4dElkJCQxKCk7XG4gICAgICAgIHRoaXMuaXNEaXNwb3NlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9pc1NjaGVkdWxlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9pc1RyYWNrUGVuZGluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9pc1J1bm5pbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc1RyYWNpbmcgPSBUcmFjZU1vZGUkJDEuTk9ORTtcbiAgICB9XG4gICAgUmVhY3Rpb24kJDEucHJvdG90eXBlLm9uQmVjb21lU3RhbGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuc2NoZWR1bGUoKTtcbiAgICB9O1xuICAgIFJlYWN0aW9uJCQxLnByb3RvdHlwZS5zY2hlZHVsZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9pc1NjaGVkdWxlZCkge1xuICAgICAgICAgICAgdGhpcy5faXNTY2hlZHVsZWQgPSB0cnVlO1xuICAgICAgICAgICAgZ2xvYmFsU3RhdGUkJDEucGVuZGluZ1JlYWN0aW9ucy5wdXNoKHRoaXMpO1xuICAgICAgICAgICAgcnVuUmVhY3Rpb25zJCQxKCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFJlYWN0aW9uJCQxLnByb3RvdHlwZS5pc1NjaGVkdWxlZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lzU2NoZWR1bGVkO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogaW50ZXJuYWwsIHVzZSBzY2hlZHVsZSgpIGlmIHlvdSBpbnRlbmQgdG8ga2ljayBvZmYgYSByZWFjdGlvblxuICAgICAqL1xuICAgIFJlYWN0aW9uJCQxLnByb3RvdHlwZS5ydW5SZWFjdGlvbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzRGlzcG9zZWQpIHtcbiAgICAgICAgICAgIHN0YXJ0QmF0Y2gkJDEoKTtcbiAgICAgICAgICAgIHRoaXMuX2lzU2NoZWR1bGVkID0gZmFsc2U7XG4gICAgICAgICAgICBpZiAoc2hvdWxkQ29tcHV0ZSQkMSh0aGlzKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2lzVHJhY2tQZW5kaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uSW52YWxpZGF0ZSgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5faXNUcmFja1BlbmRpbmcgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzU3B5RW5hYmxlZCQkMSgpICYmXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIG9uSW52YWxpZGF0ZSBkaWRuJ3QgdHJpZ2dlciB0cmFjayByaWdodCBhd2F5Li5cbiAgICAgICAgICAgICAgICAgICAgICAgIHNweVJlcG9ydCQkMSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogdGhpcy5uYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFwic2NoZWR1bGVkLXJlYWN0aW9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVwb3J0RXhjZXB0aW9uSW5EZXJpdmF0aW9uKGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVuZEJhdGNoJCQxKCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFJlYWN0aW9uJCQxLnByb3RvdHlwZS50cmFjayA9IGZ1bmN0aW9uIChmbikge1xuICAgICAgICBzdGFydEJhdGNoJCQxKCk7XG4gICAgICAgIHZhciBub3RpZnkgPSBpc1NweUVuYWJsZWQkJDEoKTtcbiAgICAgICAgdmFyIHN0YXJ0VGltZTtcbiAgICAgICAgaWYgKG5vdGlmeSAmJiBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgICAgICAgICAgIHN0YXJ0VGltZSA9IERhdGUubm93KCk7XG4gICAgICAgICAgICBzcHlSZXBvcnRTdGFydCQkMSh7XG4gICAgICAgICAgICAgICAgbmFtZTogdGhpcy5uYW1lLFxuICAgICAgICAgICAgICAgIHR5cGU6IFwicmVhY3Rpb25cIlxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5faXNSdW5uaW5nID0gdHJ1ZTtcbiAgICAgICAgdmFyIHJlc3VsdCA9IHRyYWNrRGVyaXZlZEZ1bmN0aW9uJCQxKHRoaXMsIGZuLCB1bmRlZmluZWQpO1xuICAgICAgICB0aGlzLl9pc1J1bm5pbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5faXNUcmFja1BlbmRpbmcgPSBmYWxzZTtcbiAgICAgICAgaWYgKHRoaXMuaXNEaXNwb3NlZCkge1xuICAgICAgICAgICAgLy8gZGlzcG9zZWQgZHVyaW5nIGxhc3QgcnVuLiBDbGVhbiB1cCBldmVyeXRoaW5nIHRoYXQgd2FzIGJvdW5kIGFmdGVyIHRoZSBkaXNwb3NlIGNhbGwuXG4gICAgICAgICAgICBjbGVhck9ic2VydmluZyQkMSh0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNDYXVnaHRFeGNlcHRpb24kJDEocmVzdWx0KSlcbiAgICAgICAgICAgIHRoaXMucmVwb3J0RXhjZXB0aW9uSW5EZXJpdmF0aW9uKHJlc3VsdC5jYXVzZSk7XG4gICAgICAgIGlmIChub3RpZnkgJiYgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gICAgICAgICAgICBzcHlSZXBvcnRFbmQkJDEoe1xuICAgICAgICAgICAgICAgIHRpbWU6IERhdGUubm93KCkgLSBzdGFydFRpbWVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVuZEJhdGNoJCQxKCk7XG4gICAgfTtcbiAgICBSZWFjdGlvbiQkMS5wcm90b3R5cGUucmVwb3J0RXhjZXB0aW9uSW5EZXJpdmF0aW9uID0gZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIGlmICh0aGlzLmVycm9ySGFuZGxlcikge1xuICAgICAgICAgICAgdGhpcy5lcnJvckhhbmRsZXIoZXJyb3IsIHRoaXMpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChnbG9iYWxTdGF0ZSQkMS5kaXNhYmxlRXJyb3JCb3VuZGFyaWVzKVxuICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgIHZhciBtZXNzYWdlID0gXCJbbW9ieF0gRW5jb3VudGVyZWQgYW4gdW5jYXVnaHQgZXhjZXB0aW9uIHRoYXQgd2FzIHRocm93biBieSBhIHJlYWN0aW9uIG9yIG9ic2VydmVyIGNvbXBvbmVudCwgaW46ICdcIiArIHRoaXMgKyBcIidcIjtcbiAgICAgICAgaWYgKGdsb2JhbFN0YXRlJCQxLnN1cHByZXNzUmVhY3Rpb25FcnJvcnMpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihcIlttb2J4XSAoZXJyb3IgaW4gcmVhY3Rpb24gJ1wiICsgdGhpcy5uYW1lICsgXCInIHN1cHByZXNzZWQsIGZpeCBlcnJvciBvZiBjYXVzaW5nIGFjdGlvbiBiZWxvdylcIik7IC8vIHByZXR0aWVyLWlnbm9yZVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihtZXNzYWdlLCBlcnJvcik7XG4gICAgICAgICAgICAvKiogSWYgZGVidWdnaW5nIGJyb3VnaHQgeW91IGhlcmUsIHBsZWFzZSwgcmVhZCB0aGUgYWJvdmUgbWVzc2FnZSA6LSkuIFRueCEgKi9cbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNTcHlFbmFibGVkJCQxKCkpIHtcbiAgICAgICAgICAgIHNweVJlcG9ydCQkMSh7XG4gICAgICAgICAgICAgICAgdHlwZTogXCJlcnJvclwiLFxuICAgICAgICAgICAgICAgIG5hbWU6IHRoaXMubmFtZSxcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiBtZXNzYWdlLFxuICAgICAgICAgICAgICAgIGVycm9yOiBcIlwiICsgZXJyb3JcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGdsb2JhbFN0YXRlJCQxLmdsb2JhbFJlYWN0aW9uRXJyb3JIYW5kbGVycy5mb3JFYWNoKGZ1bmN0aW9uIChmKSB7IHJldHVybiBmKGVycm9yLCBfdGhpcyk7IH0pO1xuICAgIH07XG4gICAgUmVhY3Rpb24kJDEucHJvdG90eXBlLmRpc3Bvc2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghdGhpcy5pc0Rpc3Bvc2VkKSB7XG4gICAgICAgICAgICB0aGlzLmlzRGlzcG9zZWQgPSB0cnVlO1xuICAgICAgICAgICAgaWYgKCF0aGlzLl9pc1J1bm5pbmcpIHtcbiAgICAgICAgICAgICAgICAvLyBpZiBkaXNwb3NlZCB3aGlsZSBydW5uaW5nLCBjbGVhbiB1cCBsYXRlci4gTWF5YmUgbm90IG9wdGltYWwsIGJ1dCByYXJlIGNhc2VcbiAgICAgICAgICAgICAgICBzdGFydEJhdGNoJCQxKCk7XG4gICAgICAgICAgICAgICAgY2xlYXJPYnNlcnZpbmckJDEodGhpcyk7XG4gICAgICAgICAgICAgICAgZW5kQmF0Y2gkJDEoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgUmVhY3Rpb24kJDEucHJvdG90eXBlLmdldERpc3Bvc2VyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgciA9IHRoaXMuZGlzcG9zZS5iaW5kKHRoaXMpO1xuICAgICAgICByWyRtb2J4JCQxXSA9IHRoaXM7XG4gICAgICAgIHJldHVybiByO1xuICAgIH07XG4gICAgUmVhY3Rpb24kJDEucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gXCJSZWFjdGlvbltcIiArIHRoaXMubmFtZSArIFwiXVwiO1xuICAgIH07XG4gICAgUmVhY3Rpb24kJDEucHJvdG90eXBlLnRyYWNlID0gZnVuY3Rpb24gKGVudGVyQnJlYWtQb2ludCkge1xuICAgICAgICBpZiAoZW50ZXJCcmVha1BvaW50ID09PSB2b2lkIDApIHsgZW50ZXJCcmVha1BvaW50ID0gZmFsc2U7IH1cbiAgICAgICAgdHJhY2UkJDEodGhpcywgZW50ZXJCcmVha1BvaW50KTtcbiAgICB9O1xuICAgIHJldHVybiBSZWFjdGlvbiQkMTtcbn0oKSk7XG5mdW5jdGlvbiBvblJlYWN0aW9uRXJyb3IkJDEoaGFuZGxlcikge1xuICAgIGdsb2JhbFN0YXRlJCQxLmdsb2JhbFJlYWN0aW9uRXJyb3JIYW5kbGVycy5wdXNoKGhhbmRsZXIpO1xuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBpZHggPSBnbG9iYWxTdGF0ZSQkMS5nbG9iYWxSZWFjdGlvbkVycm9ySGFuZGxlcnMuaW5kZXhPZihoYW5kbGVyKTtcbiAgICAgICAgaWYgKGlkeCA+PSAwKVxuICAgICAgICAgICAgZ2xvYmFsU3RhdGUkJDEuZ2xvYmFsUmVhY3Rpb25FcnJvckhhbmRsZXJzLnNwbGljZShpZHgsIDEpO1xuICAgIH07XG59XG4vKipcbiAqIE1hZ2ljIG51bWJlciBhbGVydCFcbiAqIERlZmluZXMgd2l0aGluIGhvdyBtYW55IHRpbWVzIGEgcmVhY3Rpb24gaXMgYWxsb3dlZCB0byByZS10cmlnZ2VyIGl0c2VsZlxuICogdW50aWwgaXQgaXMgYXNzdW1lZCB0aGF0IHRoaXMgaXMgZ29ubmEgYmUgYSBuZXZlciBlbmRpbmcgbG9vcC4uLlxuICovXG52YXIgTUFYX1JFQUNUSU9OX0lURVJBVElPTlMgPSAxMDA7XG52YXIgcmVhY3Rpb25TY2hlZHVsZXIgPSBmdW5jdGlvbiAoZikgeyByZXR1cm4gZigpOyB9O1xuZnVuY3Rpb24gcnVuUmVhY3Rpb25zJCQxKCkge1xuICAgIC8vIFRyYW1wb2xpbmluZywgaWYgcnVuUmVhY3Rpb25zIGFyZSBhbHJlYWR5IHJ1bm5pbmcsIG5ldyByZWFjdGlvbnMgd2lsbCBiZSBwaWNrZWQgdXBcbiAgICBpZiAoZ2xvYmFsU3RhdGUkJDEuaW5CYXRjaCA+IDAgfHwgZ2xvYmFsU3RhdGUkJDEuaXNSdW5uaW5nUmVhY3Rpb25zKVxuICAgICAgICByZXR1cm47XG4gICAgcmVhY3Rpb25TY2hlZHVsZXIocnVuUmVhY3Rpb25zSGVscGVyKTtcbn1cbmZ1bmN0aW9uIHJ1blJlYWN0aW9uc0hlbHBlcigpIHtcbiAgICBnbG9iYWxTdGF0ZSQkMS5pc1J1bm5pbmdSZWFjdGlvbnMgPSB0cnVlO1xuICAgIHZhciBhbGxSZWFjdGlvbnMgPSBnbG9iYWxTdGF0ZSQkMS5wZW5kaW5nUmVhY3Rpb25zO1xuICAgIHZhciBpdGVyYXRpb25zID0gMDtcbiAgICAvLyBXaGlsZSBydW5uaW5nIHJlYWN0aW9ucywgbmV3IHJlYWN0aW9ucyBtaWdodCBiZSB0cmlnZ2VyZWQuXG4gICAgLy8gSGVuY2Ugd2Ugd29yayB3aXRoIHR3byB2YXJpYWJsZXMgYW5kIGNoZWNrIHdoZXRoZXJcbiAgICAvLyB3ZSBjb252ZXJnZSB0byBubyByZW1haW5pbmcgcmVhY3Rpb25zIGFmdGVyIGEgd2hpbGUuXG4gICAgd2hpbGUgKGFsbFJlYWN0aW9ucy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGlmICgrK2l0ZXJhdGlvbnMgPT09IE1BWF9SRUFDVElPTl9JVEVSQVRJT05TKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFwiUmVhY3Rpb24gZG9lc24ndCBjb252ZXJnZSB0byBhIHN0YWJsZSBzdGF0ZSBhZnRlciBcIiArIE1BWF9SRUFDVElPTl9JVEVSQVRJT05TICsgXCIgaXRlcmF0aW9ucy5cIiArXG4gICAgICAgICAgICAgICAgKFwiIFByb2JhYmx5IHRoZXJlIGlzIGEgY3ljbGUgaW4gdGhlIHJlYWN0aXZlIGZ1bmN0aW9uOiBcIiArIGFsbFJlYWN0aW9uc1swXSkpO1xuICAgICAgICAgICAgYWxsUmVhY3Rpb25zLnNwbGljZSgwKTsgLy8gY2xlYXIgcmVhY3Rpb25zXG4gICAgICAgIH1cbiAgICAgICAgdmFyIHJlbWFpbmluZ1JlYWN0aW9ucyA9IGFsbFJlYWN0aW9ucy5zcGxpY2UoMCk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gcmVtYWluaW5nUmVhY3Rpb25zLmxlbmd0aDsgaSA8IGw7IGkrKylcbiAgICAgICAgICAgIHJlbWFpbmluZ1JlYWN0aW9uc1tpXS5ydW5SZWFjdGlvbigpO1xuICAgIH1cbiAgICBnbG9iYWxTdGF0ZSQkMS5pc1J1bm5pbmdSZWFjdGlvbnMgPSBmYWxzZTtcbn1cbnZhciBpc1JlYWN0aW9uJCQxID0gY3JlYXRlSW5zdGFuY2VvZlByZWRpY2F0ZSQkMShcIlJlYWN0aW9uXCIsIFJlYWN0aW9uJCQxKTtcbmZ1bmN0aW9uIHNldFJlYWN0aW9uU2NoZWR1bGVyJCQxKGZuKSB7XG4gICAgdmFyIGJhc2VTY2hlZHVsZXIgPSByZWFjdGlvblNjaGVkdWxlcjtcbiAgICByZWFjdGlvblNjaGVkdWxlciA9IGZ1bmN0aW9uIChmKSB7IHJldHVybiBmbihmdW5jdGlvbiAoKSB7IHJldHVybiBiYXNlU2NoZWR1bGVyKGYpOyB9KTsgfTtcbn1cblxuZnVuY3Rpb24gaXNTcHlFbmFibGVkJCQxKCkge1xuICAgIHJldHVybiBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgJiYgISFnbG9iYWxTdGF0ZSQkMS5zcHlMaXN0ZW5lcnMubGVuZ3RoO1xufVxuZnVuY3Rpb24gc3B5UmVwb3J0JCQxKGV2ZW50KSB7XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSBcInByb2R1Y3Rpb25cIilcbiAgICAgICAgcmV0dXJuOyAvLyBkZWFkIGNvZGUgZWxpbWluYXRpb24gY2FuIGRvIHRoZSByZXN0XG4gICAgaWYgKCFnbG9iYWxTdGF0ZSQkMS5zcHlMaXN0ZW5lcnMubGVuZ3RoKVxuICAgICAgICByZXR1cm47XG4gICAgdmFyIGxpc3RlbmVycyA9IGdsb2JhbFN0YXRlJCQxLnNweUxpc3RlbmVycztcbiAgICBmb3IgKHZhciBpID0gMCwgbCA9IGxpc3RlbmVycy5sZW5ndGg7IGkgPCBsOyBpKyspXG4gICAgICAgIGxpc3RlbmVyc1tpXShldmVudCk7XG59XG5mdW5jdGlvbiBzcHlSZXBvcnRTdGFydCQkMShldmVudCkge1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gXCJwcm9kdWN0aW9uXCIpXG4gICAgICAgIHJldHVybjtcbiAgICB2YXIgY2hhbmdlID0gX19hc3NpZ24oe30sIGV2ZW50LCB7IHNweVJlcG9ydFN0YXJ0OiB0cnVlIH0pO1xuICAgIHNweVJlcG9ydCQkMShjaGFuZ2UpO1xufVxudmFyIEVORF9FVkVOVCA9IHsgc3B5UmVwb3J0RW5kOiB0cnVlIH07XG5mdW5jdGlvbiBzcHlSZXBvcnRFbmQkJDEoY2hhbmdlKSB7XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSBcInByb2R1Y3Rpb25cIilcbiAgICAgICAgcmV0dXJuO1xuICAgIGlmIChjaGFuZ2UpXG4gICAgICAgIHNweVJlcG9ydCQkMShfX2Fzc2lnbih7fSwgY2hhbmdlLCB7IHNweVJlcG9ydEVuZDogdHJ1ZSB9KSk7XG4gICAgZWxzZVxuICAgICAgICBzcHlSZXBvcnQkJDEoRU5EX0VWRU5UKTtcbn1cbmZ1bmN0aW9uIHNweSQkMShsaXN0ZW5lcikge1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgICAgICAgY29uc29sZS53YXJuKFwiW21vYnguc3B5XSBJcyBhIG5vLW9wIGluIHByb2R1Y3Rpb24gYnVpbGRzXCIpO1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkgeyB9O1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgZ2xvYmFsU3RhdGUkJDEuc3B5TGlzdGVuZXJzLnB1c2gobGlzdGVuZXIpO1xuICAgICAgICByZXR1cm4gb25jZSQkMShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBnbG9iYWxTdGF0ZSQkMS5zcHlMaXN0ZW5lcnMgPSBnbG9iYWxTdGF0ZSQkMS5zcHlMaXN0ZW5lcnMuZmlsdGVyKGZ1bmN0aW9uIChsKSB7IHJldHVybiBsICE9PSBsaXN0ZW5lcjsgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZG9udFJlYXNzaWduRmllbGRzKCkge1xuICAgIGZhaWwkJDEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiICYmIFwiQGFjdGlvbiBmaWVsZHMgYXJlIG5vdCByZWFzc2lnbmFibGVcIik7XG59XG5mdW5jdGlvbiBuYW1lZEFjdGlvbkRlY29yYXRvciQkMShuYW1lKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIHByb3AsIGRlc2NyaXB0b3IpIHtcbiAgICAgICAgaWYgKGRlc2NyaXB0b3IpIHtcbiAgICAgICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgJiYgZGVzY3JpcHRvci5nZXQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWlsJCQxKFwiQGFjdGlvbiBjYW5ub3QgYmUgdXNlZCB3aXRoIGdldHRlcnNcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBiYWJlbCAvIHR5cGVzY3JpcHRcbiAgICAgICAgICAgIC8vIEBhY3Rpb24gbWV0aG9kKCkgeyB9XG4gICAgICAgICAgICBpZiAoZGVzY3JpcHRvci52YWx1ZSkge1xuICAgICAgICAgICAgICAgIC8vIHR5cGVzY3JpcHRcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogY3JlYXRlQWN0aW9uJCQxKG5hbWUsIGRlc2NyaXB0b3IudmFsdWUpLFxuICAgICAgICAgICAgICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICB3cml0YWJsZTogdHJ1ZSAvLyBmb3IgdHlwZXNjcmlwdCwgdGhpcyBtdXN0IGJlIHdyaXRhYmxlLCBvdGhlcndpc2UgaXQgY2Fubm90IGluaGVyaXQgOi8gKHNlZSBpbmhlcml0YWJsZSBhY3Rpb25zIHRlc3QpXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGJhYmVsIG9ubHk6IEBhY3Rpb24gbWV0aG9kID0gKCkgPT4ge31cbiAgICAgICAgICAgIHZhciBpbml0aWFsaXplcl8xID0gZGVzY3JpcHRvci5pbml0aWFsaXplcjtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgIGluaXRpYWxpemVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIE4uQjogd2UgY2FuJ3QgaW1tZWRpYXRlbHkgaW52b2tlIGluaXRpYWxpemVyOyB0aGlzIHdvdWxkIGJlIHdyb25nXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjcmVhdGVBY3Rpb24kJDEobmFtZSwgaW5pdGlhbGl6ZXJfMS5jYWxsKHRoaXMpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIC8vIGJvdW5kIGluc3RhbmNlIG1ldGhvZHNcbiAgICAgICAgcmV0dXJuIGFjdGlvbkZpZWxkRGVjb3JhdG9yJCQxKG5hbWUpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfTtcbn1cbmZ1bmN0aW9uIGFjdGlvbkZpZWxkRGVjb3JhdG9yJCQxKG5hbWUpIHtcbiAgICAvLyBTaW1wbGUgcHJvcGVydHkgdGhhdCB3cml0ZXMgb24gZmlyc3QgaW52b2NhdGlvbiB0byB0aGUgY3VycmVudCBpbnN0YW5jZVxuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBwcm9wLCBkZXNjcmlwdG9yKSB7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIHByb3AsIHtcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGFkZEhpZGRlblByb3AkJDEodGhpcywgcHJvcCwgYWN0aW9uJCQxKG5hbWUsIHZhbHVlKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG59XG5mdW5jdGlvbiBib3VuZEFjdGlvbkRlY29yYXRvciQkMSh0YXJnZXQsIHByb3BlcnR5TmFtZSwgZGVzY3JpcHRvciwgYXBwbHlUb0luc3RhbmNlKSB7XG4gICAgaWYgKGFwcGx5VG9JbnN0YW5jZSA9PT0gdHJ1ZSkge1xuICAgICAgICBkZWZpbmVCb3VuZEFjdGlvbiQkMSh0YXJnZXQsIHByb3BlcnR5TmFtZSwgZGVzY3JpcHRvci52YWx1ZSk7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBpZiAoZGVzY3JpcHRvcikge1xuICAgICAgICAvLyBpZiAoZGVzY3JpcHRvci52YWx1ZSlcbiAgICAgICAgLy8gVHlwZXNjcmlwdCAvIEJhYmVsOiBAYWN0aW9uLmJvdW5kIG1ldGhvZCgpIHsgfVxuICAgICAgICAvLyBhbHNvOiBiYWJlbCBAYWN0aW9uLmJvdW5kIG1ldGhvZCA9ICgpID0+IHt9XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGRlZmluZUJvdW5kQWN0aW9uJCQxKHRoaXMsIHByb3BlcnR5TmFtZSwgZGVzY3JpcHRvci52YWx1ZSB8fCBkZXNjcmlwdG9yLmluaXRpYWxpemVyLmNhbGwodGhpcykpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzW3Byb3BlcnR5TmFtZV07XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBkb250UmVhc3NpZ25GaWVsZHNcbiAgICAgICAgfTtcbiAgICB9XG4gICAgLy8gZmllbGQgZGVjb3JhdG9yIFR5cGVzY3JpcHQgQGFjdGlvbi5ib3VuZCBtZXRob2QgPSAoKSA9PiB7fVxuICAgIHJldHVybiB7XG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgIHNldDogZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgICAgIGRlZmluZUJvdW5kQWN0aW9uJCQxKHRoaXMsIHByb3BlcnR5TmFtZSwgdik7XG4gICAgICAgIH0sXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgIH07XG59XG5cbnZhciBhY3Rpb24kJDEgPSBmdW5jdGlvbiBhY3Rpb24kJDEoYXJnMSwgYXJnMiwgYXJnMywgYXJnNCkge1xuICAgIC8vIGFjdGlvbihmbigpIHt9KVxuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxICYmIHR5cGVvZiBhcmcxID09PSBcImZ1bmN0aW9uXCIpXG4gICAgICAgIHJldHVybiBjcmVhdGVBY3Rpb24kJDEoYXJnMS5uYW1lIHx8IFwiPHVubmFtZWQgYWN0aW9uPlwiLCBhcmcxKTtcbiAgICAvLyBhY3Rpb24oXCJuYW1lXCIsIGZuKCkge30pXG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDIgJiYgdHlwZW9mIGFyZzIgPT09IFwiZnVuY3Rpb25cIilcbiAgICAgICAgcmV0dXJuIGNyZWF0ZUFjdGlvbiQkMShhcmcxLCBhcmcyKTtcbiAgICAvLyBAYWN0aW9uKFwibmFtZVwiKSBmbigpIHt9XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEgJiYgdHlwZW9mIGFyZzEgPT09IFwic3RyaW5nXCIpXG4gICAgICAgIHJldHVybiBuYW1lZEFjdGlvbkRlY29yYXRvciQkMShhcmcxKTtcbiAgICAvLyBAYWN0aW9uIGZuKCkge31cbiAgICBpZiAoYXJnNCA9PT0gdHJ1ZSkge1xuICAgICAgICAvLyBhcHBseSB0byBpbnN0YW5jZSBpbW1lZGlhdGVseVxuICAgICAgICBhZGRIaWRkZW5Qcm9wJCQxKGFyZzEsIGFyZzIsIGNyZWF0ZUFjdGlvbiQkMShhcmcxLm5hbWUgfHwgYXJnMiwgYXJnMy52YWx1ZSkpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIG5hbWVkQWN0aW9uRGVjb3JhdG9yJCQxKGFyZzIpLmFwcGx5KG51bGwsIGFyZ3VtZW50cyk7XG4gICAgfVxufTtcbmFjdGlvbiQkMS5ib3VuZCA9IGJvdW5kQWN0aW9uRGVjb3JhdG9yJCQxO1xuZnVuY3Rpb24gcnVuSW5BY3Rpb24kJDEoYXJnMSwgYXJnMikge1xuICAgIHZhciBhY3Rpb25OYW1lID0gdHlwZW9mIGFyZzEgPT09IFwic3RyaW5nXCIgPyBhcmcxIDogYXJnMS5uYW1lIHx8IFwiPHVubmFtZWQgYWN0aW9uPlwiO1xuICAgIHZhciBmbiA9IHR5cGVvZiBhcmcxID09PSBcImZ1bmN0aW9uXCIgPyBhcmcxIDogYXJnMjtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gICAgICAgIGludmFyaWFudCQkMSh0eXBlb2YgZm4gPT09IFwiZnVuY3Rpb25cIiAmJiBmbi5sZW5ndGggPT09IDAsIFwiYHJ1bkluQWN0aW9uYCBleHBlY3RzIGEgZnVuY3Rpb24gd2l0aG91dCBhcmd1bWVudHNcIik7XG4gICAgICAgIGlmICh0eXBlb2YgYWN0aW9uTmFtZSAhPT0gXCJzdHJpbmdcIiB8fCAhYWN0aW9uTmFtZSlcbiAgICAgICAgICAgIGZhaWwkJDEoXCJhY3Rpb25zIHNob3VsZCBoYXZlIHZhbGlkIG5hbWVzLCBnb3Q6ICdcIiArIGFjdGlvbk5hbWUgKyBcIidcIik7XG4gICAgfVxuICAgIHJldHVybiBleGVjdXRlQWN0aW9uJCQxKGFjdGlvbk5hbWUsIGZuLCB0aGlzLCB1bmRlZmluZWQpO1xufVxuZnVuY3Rpb24gaXNBY3Rpb24kJDEodGhpbmcpIHtcbiAgICByZXR1cm4gdHlwZW9mIHRoaW5nID09PSBcImZ1bmN0aW9uXCIgJiYgdGhpbmcuaXNNb2J4QWN0aW9uID09PSB0cnVlO1xufVxuZnVuY3Rpb24gZGVmaW5lQm91bmRBY3Rpb24kJDEodGFyZ2V0LCBwcm9wZXJ0eU5hbWUsIGZuKSB7XG4gICAgYWRkSGlkZGVuUHJvcCQkMSh0YXJnZXQsIHByb3BlcnR5TmFtZSwgY3JlYXRlQWN0aW9uJCQxKHByb3BlcnR5TmFtZSwgZm4uYmluZCh0YXJnZXQpKSk7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5hbWVkIHJlYWN0aXZlIHZpZXcgYW5kIGtlZXBzIGl0IGFsaXZlLCBzbyB0aGF0IHRoZSB2aWV3IGlzIGFsd2F5c1xuICogdXBkYXRlZCBpZiBvbmUgb2YgdGhlIGRlcGVuZGVuY2llcyBjaGFuZ2VzLCBldmVuIHdoZW4gdGhlIHZpZXcgaXMgbm90IGZ1cnRoZXIgdXNlZCBieSBzb21ldGhpbmcgZWxzZS5cbiAqIEBwYXJhbSB2aWV3IFRoZSByZWFjdGl2ZSB2aWV3XG4gKiBAcmV0dXJucyBkaXNwb3NlciBmdW5jdGlvbiwgd2hpY2ggY2FuIGJlIHVzZWQgdG8gc3RvcCB0aGUgdmlldyBmcm9tIGJlaW5nIHVwZGF0ZWQgaW4gdGhlIGZ1dHVyZS5cbiAqL1xuZnVuY3Rpb24gYXV0b3J1biQkMSh2aWV3LCBvcHRzKSB7XG4gICAgaWYgKG9wdHMgPT09IHZvaWQgMCkgeyBvcHRzID0gRU1QVFlfT0JKRUNUJCQxOyB9XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xuICAgICAgICBpbnZhcmlhbnQkJDEodHlwZW9mIHZpZXcgPT09IFwiZnVuY3Rpb25cIiwgXCJBdXRvcnVuIGV4cGVjdHMgYSBmdW5jdGlvbiBhcyBmaXJzdCBhcmd1bWVudFwiKTtcbiAgICAgICAgaW52YXJpYW50JCQxKGlzQWN0aW9uJCQxKHZpZXcpID09PSBmYWxzZSwgXCJBdXRvcnVuIGRvZXMgbm90IGFjY2VwdCBhY3Rpb25zIHNpbmNlIGFjdGlvbnMgYXJlIHVudHJhY2thYmxlXCIpO1xuICAgIH1cbiAgICB2YXIgbmFtZSA9IChvcHRzICYmIG9wdHMubmFtZSkgfHwgdmlldy5uYW1lIHx8IFwiQXV0b3J1bkBcIiArIGdldE5leHRJZCQkMSgpO1xuICAgIHZhciBydW5TeW5jID0gIW9wdHMuc2NoZWR1bGVyICYmICFvcHRzLmRlbGF5O1xuICAgIHZhciByZWFjdGlvbiQkMTtcbiAgICBpZiAocnVuU3luYykge1xuICAgICAgICAvLyBub3JtYWwgYXV0b3J1blxuICAgICAgICByZWFjdGlvbiQkMSA9IG5ldyBSZWFjdGlvbiQkMShuYW1lLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLnRyYWNrKHJlYWN0aW9uUnVubmVyKTtcbiAgICAgICAgfSwgb3B0cy5vbkVycm9yKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHZhciBzY2hlZHVsZXJfMSA9IGNyZWF0ZVNjaGVkdWxlckZyb21PcHRpb25zKG9wdHMpO1xuICAgICAgICAvLyBkZWJvdW5jZWQgYXV0b3J1blxuICAgICAgICB2YXIgaXNTY2hlZHVsZWRfMSA9IGZhbHNlO1xuICAgICAgICByZWFjdGlvbiQkMSA9IG5ldyBSZWFjdGlvbiQkMShuYW1lLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoIWlzU2NoZWR1bGVkXzEpIHtcbiAgICAgICAgICAgICAgICBpc1NjaGVkdWxlZF8xID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBzY2hlZHVsZXJfMShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGlzU2NoZWR1bGVkXzEgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFyZWFjdGlvbiQkMS5pc0Rpc3Bvc2VkKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmVhY3Rpb24kJDEudHJhY2socmVhY3Rpb25SdW5uZXIpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCBvcHRzLm9uRXJyb3IpO1xuICAgIH1cbiAgICBmdW5jdGlvbiByZWFjdGlvblJ1bm5lcigpIHtcbiAgICAgICAgdmlldyhyZWFjdGlvbiQkMSk7XG4gICAgfVxuICAgIHJlYWN0aW9uJCQxLnNjaGVkdWxlKCk7XG4gICAgcmV0dXJuIHJlYWN0aW9uJCQxLmdldERpc3Bvc2VyKCk7XG59XG52YXIgcnVuID0gZnVuY3Rpb24gKGYpIHsgcmV0dXJuIGYoKTsgfTtcbmZ1bmN0aW9uIGNyZWF0ZVNjaGVkdWxlckZyb21PcHRpb25zKG9wdHMpIHtcbiAgICByZXR1cm4gb3B0cy5zY2hlZHVsZXJcbiAgICAgICAgPyBvcHRzLnNjaGVkdWxlclxuICAgICAgICA6IG9wdHMuZGVsYXlcbiAgICAgICAgICAgID8gZnVuY3Rpb24gKGYpIHsgcmV0dXJuIHNldFRpbWVvdXQoZiwgb3B0cy5kZWxheSk7IH1cbiAgICAgICAgICAgIDogcnVuO1xufVxuZnVuY3Rpb24gcmVhY3Rpb24kJDEoZXhwcmVzc2lvbiwgZWZmZWN0LCBvcHRzKSB7XG4gICAgaWYgKG9wdHMgPT09IHZvaWQgMCkgeyBvcHRzID0gRU1QVFlfT0JKRUNUJCQxOyB9XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xuICAgICAgICBpbnZhcmlhbnQkJDEodHlwZW9mIGV4cHJlc3Npb24gPT09IFwiZnVuY3Rpb25cIiwgXCJGaXJzdCBhcmd1bWVudCB0byByZWFjdGlvbiBzaG91bGQgYmUgYSBmdW5jdGlvblwiKTtcbiAgICAgICAgaW52YXJpYW50JCQxKHR5cGVvZiBvcHRzID09PSBcIm9iamVjdFwiLCBcIlRoaXJkIGFyZ3VtZW50IG9mIHJlYWN0aW9ucyBzaG91bGQgYmUgYW4gb2JqZWN0XCIpO1xuICAgIH1cbiAgICB2YXIgbmFtZSA9IG9wdHMubmFtZSB8fCBcIlJlYWN0aW9uQFwiICsgZ2V0TmV4dElkJCQxKCk7XG4gICAgdmFyIGVmZmVjdEFjdGlvbiA9IGFjdGlvbiQkMShuYW1lLCBvcHRzLm9uRXJyb3IgPyB3cmFwRXJyb3JIYW5kbGVyKG9wdHMub25FcnJvciwgZWZmZWN0KSA6IGVmZmVjdCk7XG4gICAgdmFyIHJ1blN5bmMgPSAhb3B0cy5zY2hlZHVsZXIgJiYgIW9wdHMuZGVsYXk7XG4gICAgdmFyIHNjaGVkdWxlciA9IGNyZWF0ZVNjaGVkdWxlckZyb21PcHRpb25zKG9wdHMpO1xuICAgIHZhciBmaXJzdFRpbWUgPSB0cnVlO1xuICAgIHZhciBpc1NjaGVkdWxlZCA9IGZhbHNlO1xuICAgIHZhciB2YWx1ZTtcbiAgICB2YXIgZXF1YWxzID0gb3B0cy5jb21wYXJlU3RydWN0dXJhbFxuICAgICAgICA/IGNvbXBhcmVyJCQxLnN0cnVjdHVyYWxcbiAgICAgICAgOiBvcHRzLmVxdWFscyB8fCBjb21wYXJlciQkMS5kZWZhdWx0O1xuICAgIHZhciByID0gbmV3IFJlYWN0aW9uJCQxKG5hbWUsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKGZpcnN0VGltZSB8fCBydW5TeW5jKSB7XG4gICAgICAgICAgICByZWFjdGlvblJ1bm5lcigpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKCFpc1NjaGVkdWxlZCkge1xuICAgICAgICAgICAgaXNTY2hlZHVsZWQgPSB0cnVlO1xuICAgICAgICAgICAgc2NoZWR1bGVyKHJlYWN0aW9uUnVubmVyKTtcbiAgICAgICAgfVxuICAgIH0sIG9wdHMub25FcnJvcik7XG4gICAgZnVuY3Rpb24gcmVhY3Rpb25SdW5uZXIoKSB7XG4gICAgICAgIGlzU2NoZWR1bGVkID0gZmFsc2U7IC8vIFE6IG1vdmUgaW50byByZWFjdGlvbiBydW5uZXI/XG4gICAgICAgIGlmIChyLmlzRGlzcG9zZWQpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIHZhciBjaGFuZ2VkID0gZmFsc2U7XG4gICAgICAgIHIudHJhY2soZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIG5leHRWYWx1ZSA9IGV4cHJlc3Npb24ocik7XG4gICAgICAgICAgICBjaGFuZ2VkID0gZmlyc3RUaW1lIHx8ICFlcXVhbHModmFsdWUsIG5leHRWYWx1ZSk7XG4gICAgICAgICAgICB2YWx1ZSA9IG5leHRWYWx1ZTtcbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChmaXJzdFRpbWUgJiYgb3B0cy5maXJlSW1tZWRpYXRlbHkpXG4gICAgICAgICAgICBlZmZlY3RBY3Rpb24odmFsdWUsIHIpO1xuICAgICAgICBpZiAoIWZpcnN0VGltZSAmJiBjaGFuZ2VkID09PSB0cnVlKVxuICAgICAgICAgICAgZWZmZWN0QWN0aW9uKHZhbHVlLCByKTtcbiAgICAgICAgaWYgKGZpcnN0VGltZSlcbiAgICAgICAgICAgIGZpcnN0VGltZSA9IGZhbHNlO1xuICAgIH1cbiAgICByLnNjaGVkdWxlKCk7XG4gICAgcmV0dXJuIHIuZ2V0RGlzcG9zZXIoKTtcbn1cbmZ1bmN0aW9uIHdyYXBFcnJvckhhbmRsZXIoZXJyb3JIYW5kbGVyLCBiYXNlRm4pIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuIGJhc2VGbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICBlcnJvckhhbmRsZXIuY2FsbCh0aGlzLCBlKTtcbiAgICAgICAgfVxuICAgIH07XG59XG5cbmZ1bmN0aW9uIG9uQmVjb21lT2JzZXJ2ZWQkJDEodGhpbmcsIGFyZzIsIGFyZzMpIHtcbiAgICByZXR1cm4gaW50ZXJjZXB0SG9vayhcIm9uQmVjb21lT2JzZXJ2ZWRcIiwgdGhpbmcsIGFyZzIsIGFyZzMpO1xufVxuZnVuY3Rpb24gb25CZWNvbWVVbm9ic2VydmVkJCQxKHRoaW5nLCBhcmcyLCBhcmczKSB7XG4gICAgcmV0dXJuIGludGVyY2VwdEhvb2soXCJvbkJlY29tZVVub2JzZXJ2ZWRcIiwgdGhpbmcsIGFyZzIsIGFyZzMpO1xufVxuZnVuY3Rpb24gaW50ZXJjZXB0SG9vayhob29rLCB0aGluZywgYXJnMiwgYXJnMykge1xuICAgIHZhciBhdG9tID0gdHlwZW9mIGFyZzIgPT09IFwic3RyaW5nXCIgPyBnZXRBdG9tJCQxKHRoaW5nLCBhcmcyKSA6IGdldEF0b20kJDEodGhpbmcpO1xuICAgIHZhciBjYiA9IHR5cGVvZiBhcmcyID09PSBcInN0cmluZ1wiID8gYXJnMyA6IGFyZzI7XG4gICAgdmFyIGxpc3RlbmVyc0tleSA9IGhvb2sgKyBcIkxpc3RlbmVyc1wiO1xuICAgIGlmIChhdG9tW2xpc3RlbmVyc0tleV0pIHtcbiAgICAgICAgYXRvbVtsaXN0ZW5lcnNLZXldLmFkZChjYik7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBhdG9tW2xpc3RlbmVyc0tleV0gPSBuZXcgU2V0KFtjYl0pO1xuICAgIH1cbiAgICB2YXIgb3JpZyA9IGF0b21baG9va107XG4gICAgaWYgKHR5cGVvZiBvcmlnICE9PSBcImZ1bmN0aW9uXCIpXG4gICAgICAgIHJldHVybiBmYWlsJCQxKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiAmJiBcIk5vdCBhbiBhdG9tIHRoYXQgY2FuIGJlICh1bilvYnNlcnZlZFwiKTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgaG9va0xpc3RlbmVycyA9IGF0b21bbGlzdGVuZXJzS2V5XTtcbiAgICAgICAgaWYgKGhvb2tMaXN0ZW5lcnMpIHtcbiAgICAgICAgICAgIGhvb2tMaXN0ZW5lcnMuZGVsZXRlKGNiKTtcbiAgICAgICAgICAgIGlmIChob29rTGlzdGVuZXJzLnNpemUgPT09IDApIHtcbiAgICAgICAgICAgICAgICBkZWxldGUgYXRvbVtsaXN0ZW5lcnNLZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbn1cblxuZnVuY3Rpb24gY29uZmlndXJlJCQxKG9wdGlvbnMpIHtcbiAgICB2YXIgZW5mb3JjZUFjdGlvbnMgPSBvcHRpb25zLmVuZm9yY2VBY3Rpb25zLCBjb21wdXRlZFJlcXVpcmVzUmVhY3Rpb24gPSBvcHRpb25zLmNvbXB1dGVkUmVxdWlyZXNSZWFjdGlvbiwgZGlzYWJsZUVycm9yQm91bmRhcmllcyA9IG9wdGlvbnMuZGlzYWJsZUVycm9yQm91bmRhcmllcywgcmVhY3Rpb25TY2hlZHVsZXIgPSBvcHRpb25zLnJlYWN0aW9uU2NoZWR1bGVyO1xuICAgIGlmIChvcHRpb25zLmlzb2xhdGVHbG9iYWxTdGF0ZSA9PT0gdHJ1ZSkge1xuICAgICAgICBpc29sYXRlR2xvYmFsU3RhdGUkJDEoKTtcbiAgICB9XG4gICAgaWYgKGVuZm9yY2VBY3Rpb25zICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBlbmZvcmNlQWN0aW9ucyA9PT0gXCJib29sZWFuXCIgfHwgZW5mb3JjZUFjdGlvbnMgPT09IFwic3RyaWN0XCIpXG4gICAgICAgICAgICBkZXByZWNhdGVkJCQxKFwiRGVwcmVjYXRlZCB2YWx1ZSBmb3IgJ2VuZm9yY2VBY3Rpb25zJywgdXNlICdmYWxzZScgPT4gJ1xcXCJuZXZlclxcXCInLCAndHJ1ZScgPT4gJ1xcXCJvYnNlcnZlZFxcXCInLCAnXFxcInN0cmljdFxcXCInID0+IFxcXCInYWx3YXlzJ1xcXCIgaW5zdGVhZFwiKTtcbiAgICAgICAgdmFyIGVhID0gdm9pZCAwO1xuICAgICAgICBzd2l0Y2ggKGVuZm9yY2VBY3Rpb25zKSB7XG4gICAgICAgICAgICBjYXNlIHRydWU6XG4gICAgICAgICAgICBjYXNlIFwib2JzZXJ2ZWRcIjpcbiAgICAgICAgICAgICAgICBlYSA9IHRydWU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIGZhbHNlOlxuICAgICAgICAgICAgY2FzZSBcIm5ldmVyXCI6XG4gICAgICAgICAgICAgICAgZWEgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJzdHJpY3RcIjpcbiAgICAgICAgICAgIGNhc2UgXCJhbHdheXNcIjpcbiAgICAgICAgICAgICAgICBlYSA9IFwic3RyaWN0XCI7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGZhaWwkJDEoXCJJbnZhbGlkIHZhbHVlIGZvciAnZW5mb3JjZUFjdGlvbnMnOiAnXCIgKyBlbmZvcmNlQWN0aW9ucyArIFwiJywgZXhwZWN0ZWQgJ25ldmVyJywgJ2Fsd2F5cycgb3IgJ29ic2VydmVkJ1wiKTtcbiAgICAgICAgfVxuICAgICAgICBnbG9iYWxTdGF0ZSQkMS5lbmZvcmNlQWN0aW9ucyA9IGVhO1xuICAgICAgICBnbG9iYWxTdGF0ZSQkMS5hbGxvd1N0YXRlQ2hhbmdlcyA9IGVhID09PSB0cnVlIHx8IGVhID09PSBcInN0cmljdFwiID8gZmFsc2UgOiB0cnVlO1xuICAgIH1cbiAgICBpZiAoY29tcHV0ZWRSZXF1aXJlc1JlYWN0aW9uICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgZ2xvYmFsU3RhdGUkJDEuY29tcHV0ZWRSZXF1aXJlc1JlYWN0aW9uID0gISFjb21wdXRlZFJlcXVpcmVzUmVhY3Rpb247XG4gICAgfVxuICAgIGlmIChkaXNhYmxlRXJyb3JCb3VuZGFyaWVzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKGRpc2FibGVFcnJvckJvdW5kYXJpZXMgPT09IHRydWUpXG4gICAgICAgICAgICBjb25zb2xlLndhcm4oXCJXQVJOSU5HOiBEZWJ1ZyBmZWF0dXJlIG9ubHkuIE1vYlggd2lsbCBOT1QgcmVjb3ZlciBmcm9tIGVycm9ycyB3aGVuIGBkaXNhYmxlRXJyb3JCb3VuZGFyaWVzYCBpcyBlbmFibGVkLlwiKTtcbiAgICAgICAgZ2xvYmFsU3RhdGUkJDEuZGlzYWJsZUVycm9yQm91bmRhcmllcyA9ICEhZGlzYWJsZUVycm9yQm91bmRhcmllcztcbiAgICB9XG4gICAgaWYgKHJlYWN0aW9uU2NoZWR1bGVyKSB7XG4gICAgICAgIHNldFJlYWN0aW9uU2NoZWR1bGVyJCQxKHJlYWN0aW9uU2NoZWR1bGVyKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRlY29yYXRlJCQxKHRoaW5nLCBkZWNvcmF0b3JzKSB7XG4gICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiICYmXG4gICAgICAgIGludmFyaWFudCQkMShpc1BsYWluT2JqZWN0JCQxKGRlY29yYXRvcnMpLCBcIkRlY29yYXRvcnMgc2hvdWxkIGJlIGEga2V5IHZhbHVlIG1hcFwiKTtcbiAgICB2YXIgdGFyZ2V0ID0gdHlwZW9mIHRoaW5nID09PSBcImZ1bmN0aW9uXCIgPyB0aGluZy5wcm90b3R5cGUgOiB0aGluZztcbiAgICB2YXIgX2xvb3BfMSA9IGZ1bmN0aW9uIChwcm9wKSB7XG4gICAgICAgIHZhciBwcm9wZXJ0eURlY29yYXRvcnMgPSBkZWNvcmF0b3JzW3Byb3BdO1xuICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkocHJvcGVydHlEZWNvcmF0b3JzKSkge1xuICAgICAgICAgICAgcHJvcGVydHlEZWNvcmF0b3JzID0gW3Byb3BlcnR5RGVjb3JhdG9yc107XG4gICAgICAgIH1cbiAgICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiICYmXG4gICAgICAgICAgICBpbnZhcmlhbnQkJDEocHJvcGVydHlEZWNvcmF0b3JzLmV2ZXJ5KGZ1bmN0aW9uIChkZWNvcmF0b3IpIHsgcmV0dXJuIHR5cGVvZiBkZWNvcmF0b3IgPT09IFwiZnVuY3Rpb25cIjsgfSksIFwiRGVjb3JhdGU6IGV4cGVjdGVkIGEgZGVjb3JhdG9yIGZ1bmN0aW9uIG9yIGFycmF5IG9mIGRlY29yYXRvciBmdW5jdGlvbnMgZm9yICdcIiArIHByb3AgKyBcIidcIik7XG4gICAgICAgIHZhciBkZXNjcmlwdG9yID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIHByb3ApO1xuICAgICAgICB2YXIgbmV3RGVzY3JpcHRvciA9IHByb3BlcnR5RGVjb3JhdG9ycy5yZWR1Y2UoZnVuY3Rpb24gKGFjY0Rlc2NyaXB0b3IsIGRlY29yYXRvcikgeyByZXR1cm4gZGVjb3JhdG9yKHRhcmdldCwgcHJvcCwgYWNjRGVzY3JpcHRvcik7IH0sIGRlc2NyaXB0b3IpO1xuICAgICAgICBpZiAobmV3RGVzY3JpcHRvcilcbiAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIHByb3AsIG5ld0Rlc2NyaXB0b3IpO1xuICAgIH07XG4gICAgZm9yICh2YXIgcHJvcCBpbiBkZWNvcmF0b3JzKSB7XG4gICAgICAgIF9sb29wXzEocHJvcCk7XG4gICAgfVxuICAgIHJldHVybiB0aGluZztcbn1cblxuZnVuY3Rpb24gZXh0ZW5kT2JzZXJ2YWJsZSQkMSh0YXJnZXQsIHByb3BlcnRpZXMsIGRlY29yYXRvcnMsIG9wdGlvbnMpIHtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gICAgICAgIGludmFyaWFudCQkMShhcmd1bWVudHMubGVuZ3RoID49IDIgJiYgYXJndW1lbnRzLmxlbmd0aCA8PSA0LCBcIidleHRlbmRPYnNlcnZhYmxlJyBleHBlY3RlZCAyLTQgYXJndW1lbnRzXCIpO1xuICAgICAgICBpbnZhcmlhbnQkJDEodHlwZW9mIHRhcmdldCA9PT0gXCJvYmplY3RcIiwgXCInZXh0ZW5kT2JzZXJ2YWJsZScgZXhwZWN0cyBhbiBvYmplY3QgYXMgZmlyc3QgYXJndW1lbnRcIik7XG4gICAgICAgIGludmFyaWFudCQkMSghaXNPYnNlcnZhYmxlTWFwJCQxKHRhcmdldCksIFwiJ2V4dGVuZE9ic2VydmFibGUnIHNob3VsZCBub3QgYmUgdXNlZCBvbiBtYXBzLCB1c2UgbWFwLm1lcmdlIGluc3RlYWRcIik7XG4gICAgfVxuICAgIG9wdGlvbnMgPSBhc0NyZWF0ZU9ic2VydmFibGVPcHRpb25zJCQxKG9wdGlvbnMpO1xuICAgIHZhciBkZWZhdWx0RGVjb3JhdG9yID0gZ2V0RGVmYXVsdERlY29yYXRvckZyb21PYmplY3RPcHRpb25zJCQxKG9wdGlvbnMpO1xuICAgIGluaXRpYWxpemVJbnN0YW5jZSQkMSh0YXJnZXQpOyAvLyBGaXhlcyAjMTc0MFxuICAgIGFzT2JzZXJ2YWJsZU9iamVjdCQkMSh0YXJnZXQsIG9wdGlvbnMubmFtZSwgZGVmYXVsdERlY29yYXRvci5lbmhhbmNlcik7IC8vIG1ha2Ugc3VyZSBvYmplY3QgaXMgb2JzZXJ2YWJsZSwgZXZlbiB3aXRob3V0IGluaXRpYWwgcHJvcHNcbiAgICBpZiAocHJvcGVydGllcylcbiAgICAgICAgZXh0ZW5kT2JzZXJ2YWJsZU9iamVjdFdpdGhQcm9wZXJ0aWVzJCQxKHRhcmdldCwgcHJvcGVydGllcywgZGVjb3JhdG9ycywgZGVmYXVsdERlY29yYXRvcik7XG4gICAgcmV0dXJuIHRhcmdldDtcbn1cbmZ1bmN0aW9uIGdldERlZmF1bHREZWNvcmF0b3JGcm9tT2JqZWN0T3B0aW9ucyQkMShvcHRpb25zKSB7XG4gICAgcmV0dXJuIG9wdGlvbnMuZGVmYXVsdERlY29yYXRvciB8fCAob3B0aW9ucy5kZWVwID09PSBmYWxzZSA/IHJlZkRlY29yYXRvciQkMSA6IGRlZXBEZWNvcmF0b3IkJDEpO1xufVxuZnVuY3Rpb24gZXh0ZW5kT2JzZXJ2YWJsZU9iamVjdFdpdGhQcm9wZXJ0aWVzJCQxKHRhcmdldCwgcHJvcGVydGllcywgZGVjb3JhdG9ycywgZGVmYXVsdERlY29yYXRvcikge1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgICAgICAgaW52YXJpYW50JCQxKCFpc09ic2VydmFibGUkJDEocHJvcGVydGllcyksIFwiRXh0ZW5kaW5nIGFuIG9iamVjdCB3aXRoIGFub3RoZXIgb2JzZXJ2YWJsZSAob2JqZWN0KSBpcyBub3Qgc3VwcG9ydGVkLiBQbGVhc2UgY29uc3RydWN0IGFuIGV4cGxpY2l0IHByb3BlcnR5bWFwLCB1c2luZyBgdG9KU2AgaWYgbmVlZC4gU2VlIGlzc3VlICM1NDBcIik7XG4gICAgICAgIGlmIChkZWNvcmF0b3JzKVxuICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIGRlY29yYXRvcnMpXG4gICAgICAgICAgICAgICAgaWYgKCEoa2V5IGluIHByb3BlcnRpZXMpKVxuICAgICAgICAgICAgICAgICAgICBmYWlsJCQxKFwiVHJ5aW5nIHRvIGRlY2xhcmUgYSBkZWNvcmF0b3IgZm9yIHVuc3BlY2lmaWVkIHByb3BlcnR5ICdcIiArIGtleSArIFwiJ1wiKTtcbiAgICB9XG4gICAgc3RhcnRCYXRjaCQkMSgpO1xuICAgIHRyeSB7XG4gICAgICAgIGZvciAodmFyIGtleSBpbiBwcm9wZXJ0aWVzKSB7XG4gICAgICAgICAgICB2YXIgZGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IocHJvcGVydGllcywga2V5KTtcbiAgICAgICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgICAgICAgICAgICAgICBpZiAoT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSkpXG4gICAgICAgICAgICAgICAgICAgIGZhaWwkJDEoXCInZXh0ZW5kT2JzZXJ2YWJsZScgY2FuIG9ubHkgYmUgdXNlZCB0byBpbnRyb2R1Y2UgbmV3IHByb3BlcnRpZXMuIFVzZSAnc2V0JyBvciAnZGVjb3JhdGUnIGluc3RlYWQuIFRoZSBwcm9wZXJ0eSAnXCIgKyBrZXkgKyBcIicgYWxyZWFkeSBleGlzdHMgb24gJ1wiICsgdGFyZ2V0ICsgXCInXCIpO1xuICAgICAgICAgICAgICAgIGlmIChpc0NvbXB1dGVkJCQxKGRlc2NyaXB0b3IudmFsdWUpKVxuICAgICAgICAgICAgICAgICAgICBmYWlsJCQxKFwiUGFzc2luZyBhICdjb21wdXRlZCcgYXMgaW5pdGlhbCBwcm9wZXJ0eSB2YWx1ZSBpcyBubyBsb25nZXIgc3VwcG9ydGVkIGJ5IGV4dGVuZE9ic2VydmFibGUuIFVzZSBhIGdldHRlciBvciBkZWNvcmF0b3IgaW5zdGVhZFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBkZWNvcmF0b3IgPSBkZWNvcmF0b3JzICYmIGtleSBpbiBkZWNvcmF0b3JzXG4gICAgICAgICAgICAgICAgPyBkZWNvcmF0b3JzW2tleV1cbiAgICAgICAgICAgICAgICA6IGRlc2NyaXB0b3IuZ2V0XG4gICAgICAgICAgICAgICAgICAgID8gY29tcHV0ZWREZWNvcmF0b3IkJDFcbiAgICAgICAgICAgICAgICAgICAgOiBkZWZhdWx0RGVjb3JhdG9yO1xuICAgICAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiAmJiB0eXBlb2YgZGVjb3JhdG9yICE9PSBcImZ1bmN0aW9uXCIpXG4gICAgICAgICAgICAgICAgZmFpbCQkMShcIk5vdCBhIHZhbGlkIGRlY29yYXRvciBmb3IgJ1wiICsga2V5ICsgXCInLCBnb3Q6IFwiICsgZGVjb3JhdG9yKTtcbiAgICAgICAgICAgIHZhciByZXN1bHREZXNjcmlwdG9yID0gZGVjb3JhdG9yKHRhcmdldCwga2V5LCBkZXNjcmlwdG9yLCB0cnVlKTtcbiAgICAgICAgICAgIGlmIChyZXN1bHREZXNjcmlwdG9yIC8vIG90aGVyd2lzZSwgYXNzdW1lIGFscmVhZHkgYXBwbGllZCwgZHVlIHRvIGBhcHBseVRvSW5zdGFuY2VgXG4gICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByZXN1bHREZXNjcmlwdG9yKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmaW5hbGx5IHtcbiAgICAgICAgZW5kQmF0Y2gkJDEoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGdldERlcGVuZGVuY3lUcmVlJCQxKHRoaW5nLCBwcm9wZXJ0eSkge1xuICAgIHJldHVybiBub2RlVG9EZXBlbmRlbmN5VHJlZShnZXRBdG9tJCQxKHRoaW5nLCBwcm9wZXJ0eSkpO1xufVxuZnVuY3Rpb24gbm9kZVRvRGVwZW5kZW5jeVRyZWUobm9kZSkge1xuICAgIHZhciByZXN1bHQgPSB7XG4gICAgICAgIG5hbWU6IG5vZGUubmFtZVxuICAgIH07XG4gICAgaWYgKG5vZGUub2JzZXJ2aW5nICYmIG5vZGUub2JzZXJ2aW5nLmxlbmd0aCA+IDApXG4gICAgICAgIHJlc3VsdC5kZXBlbmRlbmNpZXMgPSB1bmlxdWUkJDEobm9kZS5vYnNlcnZpbmcpLm1hcChub2RlVG9EZXBlbmRlbmN5VHJlZSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cbmZ1bmN0aW9uIGdldE9ic2VydmVyVHJlZSQkMSh0aGluZywgcHJvcGVydHkpIHtcbiAgICByZXR1cm4gbm9kZVRvT2JzZXJ2ZXJUcmVlKGdldEF0b20kJDEodGhpbmcsIHByb3BlcnR5KSk7XG59XG5mdW5jdGlvbiBub2RlVG9PYnNlcnZlclRyZWUobm9kZSkge1xuICAgIHZhciByZXN1bHQgPSB7XG4gICAgICAgIG5hbWU6IG5vZGUubmFtZVxuICAgIH07XG4gICAgaWYgKGhhc09ic2VydmVycyQkMShub2RlKSlcbiAgICAgICAgcmVzdWx0Lm9ic2VydmVycyA9IEFycmF5LmZyb20oZ2V0T2JzZXJ2ZXJzJCQxKG5vZGUpKS5tYXAobm9kZVRvT2JzZXJ2ZXJUcmVlKTtcbiAgICByZXR1cm4gcmVzdWx0O1xufVxuXG52YXIgZ2VuZXJhdG9ySWQgPSAwO1xuZnVuY3Rpb24gZmxvdyQkMShnZW5lcmF0b3IpIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCAhPT0gMSlcbiAgICAgICAgZmFpbCQkMShwcm9jZXNzLmVudi5OT0RFX0VOViAmJiBcIkZsb3cgZXhwZWN0cyBvbmUgMSBhcmd1bWVudCBhbmQgY2Fubm90IGJlIHVzZWQgYXMgZGVjb3JhdG9yXCIpO1xuICAgIHZhciBuYW1lID0gZ2VuZXJhdG9yLm5hbWUgfHwgXCI8dW5uYW1lZCBmbG93PlwiO1xuICAgIC8vIEltcGxlbWVudGF0aW9uIGJhc2VkIG9uIGh0dHBzOi8vZ2l0aHViLmNvbS90ai9jby9ibG9iL21hc3Rlci9pbmRleC5qc1xuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBjdHggPSB0aGlzO1xuICAgICAgICB2YXIgYXJncyA9IGFyZ3VtZW50cztcbiAgICAgICAgdmFyIHJ1bklkID0gKytnZW5lcmF0b3JJZDtcbiAgICAgICAgdmFyIGdlbiA9IGFjdGlvbiQkMShuYW1lICsgXCIgLSBydW5pZDogXCIgKyBydW5JZCArIFwiIC0gaW5pdFwiLCBnZW5lcmF0b3IpLmFwcGx5KGN0eCwgYXJncyk7XG4gICAgICAgIHZhciByZWplY3RvcjtcbiAgICAgICAgdmFyIHBlbmRpbmdQcm9taXNlID0gdW5kZWZpbmVkO1xuICAgICAgICB2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgIHZhciBzdGVwSWQgPSAwO1xuICAgICAgICAgICAgcmVqZWN0b3IgPSByZWplY3Q7XG4gICAgICAgICAgICBmdW5jdGlvbiBvbkZ1bGZpbGxlZChyZXMpIHtcbiAgICAgICAgICAgICAgICBwZW5kaW5nUHJvbWlzZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICB2YXIgcmV0O1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIHJldCA9IGFjdGlvbiQkMShuYW1lICsgXCIgLSBydW5pZDogXCIgKyBydW5JZCArIFwiIC0geWllbGQgXCIgKyBzdGVwSWQrKywgZ2VuLm5leHQpLmNhbGwoZ2VuLCByZXMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBuZXh0KHJldCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmdW5jdGlvbiBvblJlamVjdGVkKGVycikge1xuICAgICAgICAgICAgICAgIHBlbmRpbmdQcm9taXNlID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIHZhciByZXQ7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0ID0gYWN0aW9uJCQxKG5hbWUgKyBcIiAtIHJ1bmlkOiBcIiArIHJ1bklkICsgXCIgLSB5aWVsZCBcIiArIHN0ZXBJZCsrLCBnZW4udGhyb3cpLmNhbGwoZ2VuLCBlcnIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVqZWN0KGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBuZXh0KHJldCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmdW5jdGlvbiBuZXh0KHJldCkge1xuICAgICAgICAgICAgICAgIGlmIChyZXQgJiYgdHlwZW9mIHJldC50aGVuID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gYW4gYXN5bmMgaXRlcmF0b3JcbiAgICAgICAgICAgICAgICAgICAgcmV0LnRoZW4obmV4dCwgcmVqZWN0KTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAocmV0LmRvbmUpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKHJldC52YWx1ZSk7XG4gICAgICAgICAgICAgICAgcGVuZGluZ1Byb21pc2UgPSBQcm9taXNlLnJlc29sdmUocmV0LnZhbHVlKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcGVuZGluZ1Byb21pc2UudGhlbihvbkZ1bGZpbGxlZCwgb25SZWplY3RlZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvbkZ1bGZpbGxlZCh1bmRlZmluZWQpOyAvLyBraWNrIG9mZiB0aGUgcHJvY2Vzc1xuICAgICAgICB9KTtcbiAgICAgICAgcHJvbWlzZS5jYW5jZWwgPSBhY3Rpb24kJDEobmFtZSArIFwiIC0gcnVuaWQ6IFwiICsgcnVuSWQgKyBcIiAtIGNhbmNlbFwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGlmIChwZW5kaW5nUHJvbWlzZSlcbiAgICAgICAgICAgICAgICAgICAgY2FuY2VsUHJvbWlzZShwZW5kaW5nUHJvbWlzZSk7XG4gICAgICAgICAgICAgICAgLy8gRmluYWxseSBibG9jayBjYW4gcmV0dXJuIChvciB5aWVsZCkgc3R1ZmYuLlxuICAgICAgICAgICAgICAgIHZhciByZXMgPSBnZW4ucmV0dXJuKCk7XG4gICAgICAgICAgICAgICAgLy8gZWF0IGFueXRoaW5nIHRoYXQgcHJvbWlzZSB3b3VsZCBkbywgaXQncyBjYW5jZWxsZWQhXG4gICAgICAgICAgICAgICAgdmFyIHlpZWxkZWRQcm9taXNlID0gUHJvbWlzZS5yZXNvbHZlKHJlcy52YWx1ZSk7XG4gICAgICAgICAgICAgICAgeWllbGRlZFByb21pc2UudGhlbihub29wJCQxLCBub29wJCQxKTtcbiAgICAgICAgICAgICAgICBjYW5jZWxQcm9taXNlKHlpZWxkZWRQcm9taXNlKTsgLy8gbWF5YmUgaXQgY2FuIGJlIGNhbmNlbGxlZCA6KVxuICAgICAgICAgICAgICAgIC8vIHJlamVjdCBvdXIgb3JpZ2luYWwgcHJvbWlzZVxuICAgICAgICAgICAgICAgIHJlamVjdG9yKG5ldyBFcnJvcihcIkZMT1dfQ0FOQ0VMTEVEXCIpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgcmVqZWN0b3IoZSk7IC8vIHRoZXJlIGNvdWxkIGJlIGEgdGhyb3dpbmcgZmluYWxseSBibG9ja1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHByb21pc2U7XG4gICAgfTtcbn1cbmZ1bmN0aW9uIGNhbmNlbFByb21pc2UocHJvbWlzZSkge1xuICAgIGlmICh0eXBlb2YgcHJvbWlzZS5jYW5jZWwgPT09IFwiZnVuY3Rpb25cIilcbiAgICAgICAgcHJvbWlzZS5jYW5jZWwoKTtcbn1cblxuZnVuY3Rpb24gaW50ZXJjZXB0UmVhZHMkJDEodGhpbmcsIHByb3BPckhhbmRsZXIsIGhhbmRsZXIpIHtcbiAgICB2YXIgdGFyZ2V0O1xuICAgIGlmIChpc09ic2VydmFibGVNYXAkJDEodGhpbmcpIHx8IGlzT2JzZXJ2YWJsZUFycmF5JCQxKHRoaW5nKSB8fCBpc09ic2VydmFibGVWYWx1ZSQkMSh0aGluZykpIHtcbiAgICAgICAgdGFyZ2V0ID0gZ2V0QWRtaW5pc3RyYXRpb24kJDEodGhpbmcpO1xuICAgIH1cbiAgICBlbHNlIGlmIChpc09ic2VydmFibGVPYmplY3QkJDEodGhpbmcpKSB7XG4gICAgICAgIGlmICh0eXBlb2YgcHJvcE9ySGFuZGxlciAhPT0gXCJzdHJpbmdcIilcbiAgICAgICAgICAgIHJldHVybiBmYWlsJCQxKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiAmJlxuICAgICAgICAgICAgICAgIFwiSW50ZXJjZXB0UmVhZHMgY2FuIG9ubHkgYmUgdXNlZCB3aXRoIGEgc3BlY2lmaWMgcHJvcGVydHksIG5vdCB3aXRoIGFuIG9iamVjdCBpbiBnZW5lcmFsXCIpO1xuICAgICAgICB0YXJnZXQgPSBnZXRBZG1pbmlzdHJhdGlvbiQkMSh0aGluZywgcHJvcE9ySGFuZGxlcik7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gZmFpbCQkMShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgJiZcbiAgICAgICAgICAgIFwiRXhwZWN0ZWQgb2JzZXJ2YWJsZSBtYXAsIG9iamVjdCBvciBhcnJheSBhcyBmaXJzdCBhcnJheVwiKTtcbiAgICB9XG4gICAgaWYgKHRhcmdldC5kZWhhbmNlciAhPT0gdW5kZWZpbmVkKVxuICAgICAgICByZXR1cm4gZmFpbCQkMShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgJiYgXCJBbiBpbnRlcmNlcHQgcmVhZGVyIHdhcyBhbHJlYWR5IGVzdGFibGlzaGVkXCIpO1xuICAgIHRhcmdldC5kZWhhbmNlciA9IHR5cGVvZiBwcm9wT3JIYW5kbGVyID09PSBcImZ1bmN0aW9uXCIgPyBwcm9wT3JIYW5kbGVyIDogaGFuZGxlcjtcbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICB0YXJnZXQuZGVoYW5jZXIgPSB1bmRlZmluZWQ7XG4gICAgfTtcbn1cblxuZnVuY3Rpb24gaW50ZXJjZXB0JCQxKHRoaW5nLCBwcm9wT3JIYW5kbGVyLCBoYW5kbGVyKSB7XG4gICAgaWYgKHR5cGVvZiBoYW5kbGVyID09PSBcImZ1bmN0aW9uXCIpXG4gICAgICAgIHJldHVybiBpbnRlcmNlcHRQcm9wZXJ0eSh0aGluZywgcHJvcE9ySGFuZGxlciwgaGFuZGxlcik7XG4gICAgZWxzZVxuICAgICAgICByZXR1cm4gaW50ZXJjZXB0SW50ZXJjZXB0YWJsZSh0aGluZywgcHJvcE9ySGFuZGxlcik7XG59XG5mdW5jdGlvbiBpbnRlcmNlcHRJbnRlcmNlcHRhYmxlKHRoaW5nLCBoYW5kbGVyKSB7XG4gICAgcmV0dXJuIGdldEFkbWluaXN0cmF0aW9uJCQxKHRoaW5nKS5pbnRlcmNlcHQoaGFuZGxlcik7XG59XG5mdW5jdGlvbiBpbnRlcmNlcHRQcm9wZXJ0eSh0aGluZywgcHJvcGVydHksIGhhbmRsZXIpIHtcbiAgICByZXR1cm4gZ2V0QWRtaW5pc3RyYXRpb24kJDEodGhpbmcsIHByb3BlcnR5KS5pbnRlcmNlcHQoaGFuZGxlcik7XG59XG5cbmZ1bmN0aW9uIF9pc0NvbXB1dGVkJCQxKHZhbHVlLCBwcm9wZXJ0eSkge1xuICAgIGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkKVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgaWYgKHByb3BlcnR5ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKGlzT2JzZXJ2YWJsZU9iamVjdCQkMSh2YWx1ZSkgPT09IGZhbHNlKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICBpZiAoIXZhbHVlWyRtb2J4JCQxXS52YWx1ZXMuaGFzKHByb3BlcnR5KSlcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgdmFyIGF0b20gPSBnZXRBdG9tJCQxKHZhbHVlLCBwcm9wZXJ0eSk7XG4gICAgICAgIHJldHVybiBpc0NvbXB1dGVkVmFsdWUkJDEoYXRvbSk7XG4gICAgfVxuICAgIHJldHVybiBpc0NvbXB1dGVkVmFsdWUkJDEodmFsdWUpO1xufVxuZnVuY3Rpb24gaXNDb21wdXRlZCQkMSh2YWx1ZSkge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSlcbiAgICAgICAgcmV0dXJuIGZhaWwkJDEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiICYmXG4gICAgICAgICAgICBcImlzQ29tcHV0ZWQgZXhwZWN0cyBvbmx5IDEgYXJndW1lbnQuIFVzZSBpc09ic2VydmFibGVQcm9wIHRvIGluc3BlY3QgdGhlIG9ic2VydmFiaWxpdHkgb2YgYSBwcm9wZXJ0eVwiKTtcbiAgICByZXR1cm4gX2lzQ29tcHV0ZWQkJDEodmFsdWUpO1xufVxuZnVuY3Rpb24gaXNDb21wdXRlZFByb3AkJDEodmFsdWUsIHByb3BOYW1lKSB7XG4gICAgaWYgKHR5cGVvZiBwcm9wTmFtZSAhPT0gXCJzdHJpbmdcIilcbiAgICAgICAgcmV0dXJuIGZhaWwkJDEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiICYmXG4gICAgICAgICAgICBcImlzQ29tcHV0ZWQgZXhwZWN0ZWQgYSBwcm9wZXJ0eSBuYW1lIGFzIHNlY29uZCBhcmd1bWVudFwiKTtcbiAgICByZXR1cm4gX2lzQ29tcHV0ZWQkJDEodmFsdWUsIHByb3BOYW1lKTtcbn1cblxuZnVuY3Rpb24gX2lzT2JzZXJ2YWJsZSh2YWx1ZSwgcHJvcGVydHkpIHtcbiAgICBpZiAodmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZClcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIGlmIChwcm9wZXJ0eSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgJiZcbiAgICAgICAgICAgIChpc09ic2VydmFibGVNYXAkJDEodmFsdWUpIHx8IGlzT2JzZXJ2YWJsZUFycmF5JCQxKHZhbHVlKSkpXG4gICAgICAgICAgICByZXR1cm4gZmFpbCQkMShcImlzT2JzZXJ2YWJsZShvYmplY3QsIHByb3BlcnR5TmFtZSkgaXMgbm90IHN1cHBvcnRlZCBmb3IgYXJyYXlzIGFuZCBtYXBzLiBVc2UgbWFwLmhhcyBvciBhcnJheS5sZW5ndGggaW5zdGVhZC5cIik7XG4gICAgICAgIGlmIChpc09ic2VydmFibGVPYmplY3QkJDEodmFsdWUpKSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWVbJG1vYngkJDFdLnZhbHVlcy5oYXMocHJvcGVydHkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgLy8gRm9yIGZpcnN0IGNoZWNrLCBzZWUgIzcwMVxuICAgIHJldHVybiAoaXNPYnNlcnZhYmxlT2JqZWN0JCQxKHZhbHVlKSB8fFxuICAgICAgICAhIXZhbHVlWyRtb2J4JCQxXSB8fFxuICAgICAgICBpc0F0b20kJDEodmFsdWUpIHx8XG4gICAgICAgIGlzUmVhY3Rpb24kJDEodmFsdWUpIHx8XG4gICAgICAgIGlzQ29tcHV0ZWRWYWx1ZSQkMSh2YWx1ZSkpO1xufVxuZnVuY3Rpb24gaXNPYnNlcnZhYmxlJCQxKHZhbHVlKSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggIT09IDEpXG4gICAgICAgIGZhaWwkJDEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiICYmXG4gICAgICAgICAgICBcImlzT2JzZXJ2YWJsZSBleHBlY3RzIG9ubHkgMSBhcmd1bWVudC4gVXNlIGlzT2JzZXJ2YWJsZVByb3AgdG8gaW5zcGVjdCB0aGUgb2JzZXJ2YWJpbGl0eSBvZiBhIHByb3BlcnR5XCIpO1xuICAgIHJldHVybiBfaXNPYnNlcnZhYmxlKHZhbHVlKTtcbn1cbmZ1bmN0aW9uIGlzT2JzZXJ2YWJsZVByb3AkJDEodmFsdWUsIHByb3BOYW1lKSB7XG4gICAgaWYgKHR5cGVvZiBwcm9wTmFtZSAhPT0gXCJzdHJpbmdcIilcbiAgICAgICAgcmV0dXJuIGZhaWwkJDEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiICYmIFwiZXhwZWN0ZWQgYSBwcm9wZXJ0eSBuYW1lIGFzIHNlY29uZCBhcmd1bWVudFwiKTtcbiAgICByZXR1cm4gX2lzT2JzZXJ2YWJsZSh2YWx1ZSwgcHJvcE5hbWUpO1xufVxuXG5mdW5jdGlvbiBrZXlzJCQxKG9iaikge1xuICAgIGlmIChpc09ic2VydmFibGVPYmplY3QkJDEob2JqKSkge1xuICAgICAgICByZXR1cm4gb2JqWyRtb2J4JCQxXS5nZXRLZXlzKCk7XG4gICAgfVxuICAgIGlmIChpc09ic2VydmFibGVNYXAkJDEob2JqKSkge1xuICAgICAgICByZXR1cm4gQXJyYXkuZnJvbShvYmoua2V5cygpKTtcbiAgICB9XG4gICAgaWYgKGlzT2JzZXJ2YWJsZVNldCQkMShvYmopKSB7XG4gICAgICAgIHJldHVybiBBcnJheS5mcm9tKG9iai5rZXlzKCkpO1xuICAgIH1cbiAgICBpZiAoaXNPYnNlcnZhYmxlQXJyYXkkJDEob2JqKSkge1xuICAgICAgICByZXR1cm4gb2JqLm1hcChmdW5jdGlvbiAoXywgaW5kZXgpIHsgcmV0dXJuIGluZGV4OyB9KTtcbiAgICB9XG4gICAgcmV0dXJuIGZhaWwkJDEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiICYmXG4gICAgICAgIFwiJ2tleXMoKScgY2FuIG9ubHkgYmUgdXNlZCBvbiBvYnNlcnZhYmxlIG9iamVjdHMsIGFycmF5cywgc2V0cyBhbmQgbWFwc1wiKTtcbn1cbmZ1bmN0aW9uIHZhbHVlcyQkMShvYmopIHtcbiAgICBpZiAoaXNPYnNlcnZhYmxlT2JqZWN0JCQxKG9iaikpIHtcbiAgICAgICAgcmV0dXJuIGtleXMkJDEob2JqKS5tYXAoZnVuY3Rpb24gKGtleSkgeyByZXR1cm4gb2JqW2tleV07IH0pO1xuICAgIH1cbiAgICBpZiAoaXNPYnNlcnZhYmxlTWFwJCQxKG9iaikpIHtcbiAgICAgICAgcmV0dXJuIGtleXMkJDEob2JqKS5tYXAoZnVuY3Rpb24gKGtleSkgeyByZXR1cm4gb2JqLmdldChrZXkpOyB9KTtcbiAgICB9XG4gICAgaWYgKGlzT2JzZXJ2YWJsZVNldCQkMShvYmopKSB7XG4gICAgICAgIHJldHVybiBBcnJheS5mcm9tKG9iai52YWx1ZXMoKSk7XG4gICAgfVxuICAgIGlmIChpc09ic2VydmFibGVBcnJheSQkMShvYmopKSB7XG4gICAgICAgIHJldHVybiBvYmouc2xpY2UoKTtcbiAgICB9XG4gICAgcmV0dXJuIGZhaWwkJDEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiICYmXG4gICAgICAgIFwiJ3ZhbHVlcygpJyBjYW4gb25seSBiZSB1c2VkIG9uIG9ic2VydmFibGUgb2JqZWN0cywgYXJyYXlzLCBzZXRzIGFuZCBtYXBzXCIpO1xufVxuZnVuY3Rpb24gZW50cmllcyQkMShvYmopIHtcbiAgICBpZiAoaXNPYnNlcnZhYmxlT2JqZWN0JCQxKG9iaikpIHtcbiAgICAgICAgcmV0dXJuIGtleXMkJDEob2JqKS5tYXAoZnVuY3Rpb24gKGtleSkgeyByZXR1cm4gW2tleSwgb2JqW2tleV1dOyB9KTtcbiAgICB9XG4gICAgaWYgKGlzT2JzZXJ2YWJsZU1hcCQkMShvYmopKSB7XG4gICAgICAgIHJldHVybiBrZXlzJCQxKG9iaikubWFwKGZ1bmN0aW9uIChrZXkpIHsgcmV0dXJuIFtrZXksIG9iai5nZXQoa2V5KV07IH0pO1xuICAgIH1cbiAgICBpZiAoaXNPYnNlcnZhYmxlU2V0JCQxKG9iaikpIHtcbiAgICAgICAgcmV0dXJuIEFycmF5LmZyb20ob2JqLmVudHJpZXMoKSk7XG4gICAgfVxuICAgIGlmIChpc09ic2VydmFibGVBcnJheSQkMShvYmopKSB7XG4gICAgICAgIHJldHVybiBvYmoubWFwKGZ1bmN0aW9uIChrZXksIGluZGV4KSB7IHJldHVybiBbaW5kZXgsIGtleV07IH0pO1xuICAgIH1cbiAgICByZXR1cm4gZmFpbCQkMShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgJiZcbiAgICAgICAgXCInZW50cmllcygpJyBjYW4gb25seSBiZSB1c2VkIG9uIG9ic2VydmFibGUgb2JqZWN0cywgYXJyYXlzIGFuZCBtYXBzXCIpO1xufVxuZnVuY3Rpb24gc2V0JCQxKG9iaiwga2V5LCB2YWx1ZSkge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAyKSB7XG4gICAgICAgIHN0YXJ0QmF0Y2gkJDEoKTtcbiAgICAgICAgdmFyIHZhbHVlc18xID0ga2V5O1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgZm9yICh2YXIga2V5XzEgaW4gdmFsdWVzXzEpXG4gICAgICAgICAgICAgICAgc2V0JCQxKG9iaiwga2V5XzEsIHZhbHVlc18xW2tleV8xXSk7XG4gICAgICAgIH1cbiAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICBlbmRCYXRjaCQkMSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKGlzT2JzZXJ2YWJsZU9iamVjdCQkMShvYmopKSB7XG4gICAgICAgIHZhciBhZG0gPSBvYmpbJG1vYngkJDFdO1xuICAgICAgICB2YXIgZXhpc3RpbmdPYnNlcnZhYmxlID0gYWRtLnZhbHVlcy5nZXQoa2V5KTtcbiAgICAgICAgaWYgKGV4aXN0aW5nT2JzZXJ2YWJsZSkge1xuICAgICAgICAgICAgYWRtLndyaXRlKGtleSwgdmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgYWRtLmFkZE9ic2VydmFibGVQcm9wKGtleSwgdmFsdWUsIGFkbS5kZWZhdWx0RW5oYW5jZXIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKGlzT2JzZXJ2YWJsZU1hcCQkMShvYmopKSB7XG4gICAgICAgIG9iai5zZXQoa2V5LCB2YWx1ZSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKGlzT2JzZXJ2YWJsZUFycmF5JCQxKG9iaikpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBrZXkgIT09IFwibnVtYmVyXCIpXG4gICAgICAgICAgICBrZXkgPSBwYXJzZUludChrZXksIDEwKTtcbiAgICAgICAgaW52YXJpYW50JCQxKGtleSA+PSAwLCBcIk5vdCBhIHZhbGlkIGluZGV4OiAnXCIgKyBrZXkgKyBcIidcIik7XG4gICAgICAgIHN0YXJ0QmF0Y2gkJDEoKTtcbiAgICAgICAgaWYgKGtleSA+PSBvYmoubGVuZ3RoKVxuICAgICAgICAgICAgb2JqLmxlbmd0aCA9IGtleSArIDE7XG4gICAgICAgIG9ialtrZXldID0gdmFsdWU7XG4gICAgICAgIGVuZEJhdGNoJCQxKCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gZmFpbCQkMShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgJiZcbiAgICAgICAgICAgIFwiJ3NldCgpJyBjYW4gb25seSBiZSB1c2VkIG9uIG9ic2VydmFibGUgb2JqZWN0cywgYXJyYXlzIGFuZCBtYXBzXCIpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIHJlbW92ZSQkMShvYmosIGtleSkge1xuICAgIGlmIChpc09ic2VydmFibGVPYmplY3QkJDEob2JqKSkge1xuICAgICAgICBcbiAgICAgICAgb2JqWyRtb2J4JCQxXS5yZW1vdmUoa2V5KTtcbiAgICB9XG4gICAgZWxzZSBpZiAoaXNPYnNlcnZhYmxlTWFwJCQxKG9iaikpIHtcbiAgICAgICAgb2JqLmRlbGV0ZShrZXkpO1xuICAgIH1cbiAgICBlbHNlIGlmIChpc09ic2VydmFibGVTZXQkJDEob2JqKSkge1xuICAgICAgICBvYmouZGVsZXRlKGtleSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKGlzT2JzZXJ2YWJsZUFycmF5JCQxKG9iaikpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBrZXkgIT09IFwibnVtYmVyXCIpXG4gICAgICAgICAgICBrZXkgPSBwYXJzZUludChrZXksIDEwKTtcbiAgICAgICAgaW52YXJpYW50JCQxKGtleSA+PSAwLCBcIk5vdCBhIHZhbGlkIGluZGV4OiAnXCIgKyBrZXkgKyBcIidcIik7XG4gICAgICAgIG9iai5zcGxpY2Uoa2V5LCAxKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiBmYWlsJCQxKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiAmJlxuICAgICAgICAgICAgXCIncmVtb3ZlKCknIGNhbiBvbmx5IGJlIHVzZWQgb24gb2JzZXJ2YWJsZSBvYmplY3RzLCBhcnJheXMgYW5kIG1hcHNcIik7XG4gICAgfVxufVxuZnVuY3Rpb24gaGFzJCQxKG9iaiwga2V5KSB7XG4gICAgaWYgKGlzT2JzZXJ2YWJsZU9iamVjdCQkMShvYmopKSB7XG4gICAgICAgIC8vIHJldHVybiBrZXlzKG9iaikuaW5kZXhPZihrZXkpID49IDBcbiAgICAgICAgdmFyIGFkbSA9IGdldEFkbWluaXN0cmF0aW9uJCQxKG9iaik7XG4gICAgICAgIHJldHVybiBhZG0uaGFzKGtleSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKGlzT2JzZXJ2YWJsZU1hcCQkMShvYmopKSB7XG4gICAgICAgIHJldHVybiBvYmouaGFzKGtleSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKGlzT2JzZXJ2YWJsZVNldCQkMShvYmopKSB7XG4gICAgICAgIHJldHVybiBvYmouaGFzKGtleSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKGlzT2JzZXJ2YWJsZUFycmF5JCQxKG9iaikpIHtcbiAgICAgICAgcmV0dXJuIGtleSA+PSAwICYmIGtleSA8IG9iai5sZW5ndGg7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gZmFpbCQkMShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgJiZcbiAgICAgICAgICAgIFwiJ2hhcygpJyBjYW4gb25seSBiZSB1c2VkIG9uIG9ic2VydmFibGUgb2JqZWN0cywgYXJyYXlzIGFuZCBtYXBzXCIpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGdldCQkMShvYmosIGtleSkge1xuICAgIGlmICghaGFzJCQxKG9iaiwga2V5KSlcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICBpZiAoaXNPYnNlcnZhYmxlT2JqZWN0JCQxKG9iaikpIHtcbiAgICAgICAgcmV0dXJuIG9ialtrZXldO1xuICAgIH1cbiAgICBlbHNlIGlmIChpc09ic2VydmFibGVNYXAkJDEob2JqKSkge1xuICAgICAgICByZXR1cm4gb2JqLmdldChrZXkpO1xuICAgIH1cbiAgICBlbHNlIGlmIChpc09ic2VydmFibGVBcnJheSQkMShvYmopKSB7XG4gICAgICAgIHJldHVybiBvYmpba2V5XTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiBmYWlsJCQxKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiAmJlxuICAgICAgICAgICAgXCInZ2V0KCknIGNhbiBvbmx5IGJlIHVzZWQgb24gb2JzZXJ2YWJsZSBvYmplY3RzLCBhcnJheXMgYW5kIG1hcHNcIik7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBvYnNlcnZlJCQxKHRoaW5nLCBwcm9wT3JDYiwgY2JPckZpcmUsIGZpcmVJbW1lZGlhdGVseSkge1xuICAgIGlmICh0eXBlb2YgY2JPckZpcmUgPT09IFwiZnVuY3Rpb25cIilcbiAgICAgICAgcmV0dXJuIG9ic2VydmVPYnNlcnZhYmxlUHJvcGVydHkodGhpbmcsIHByb3BPckNiLCBjYk9yRmlyZSwgZmlyZUltbWVkaWF0ZWx5KTtcbiAgICBlbHNlXG4gICAgICAgIHJldHVybiBvYnNlcnZlT2JzZXJ2YWJsZSh0aGluZywgcHJvcE9yQ2IsIGNiT3JGaXJlKTtcbn1cbmZ1bmN0aW9uIG9ic2VydmVPYnNlcnZhYmxlKHRoaW5nLCBsaXN0ZW5lciwgZmlyZUltbWVkaWF0ZWx5KSB7XG4gICAgcmV0dXJuIGdldEFkbWluaXN0cmF0aW9uJCQxKHRoaW5nKS5vYnNlcnZlKGxpc3RlbmVyLCBmaXJlSW1tZWRpYXRlbHkpO1xufVxuZnVuY3Rpb24gb2JzZXJ2ZU9ic2VydmFibGVQcm9wZXJ0eSh0aGluZywgcHJvcGVydHksIGxpc3RlbmVyLCBmaXJlSW1tZWRpYXRlbHkpIHtcbiAgICByZXR1cm4gZ2V0QWRtaW5pc3RyYXRpb24kJDEodGhpbmcsIHByb3BlcnR5KS5vYnNlcnZlKGxpc3RlbmVyLCBmaXJlSW1tZWRpYXRlbHkpO1xufVxuXG52YXIgZGVmYXVsdE9wdGlvbnMgPSB7XG4gICAgZGV0ZWN0Q3ljbGVzOiB0cnVlLFxuICAgIGV4cG9ydE1hcHNBc09iamVjdHM6IHRydWUsXG4gICAgcmVjdXJzZUV2ZXJ5dGhpbmc6IGZhbHNlXG59O1xuZnVuY3Rpb24gY2FjaGUobWFwLCBrZXksIHZhbHVlLCBvcHRpb25zKSB7XG4gICAgaWYgKG9wdGlvbnMuZGV0ZWN0Q3ljbGVzKVxuICAgICAgICBtYXAuc2V0KGtleSwgdmFsdWUpO1xuICAgIHJldHVybiB2YWx1ZTtcbn1cbmZ1bmN0aW9uIHRvSlNIZWxwZXIoc291cmNlLCBvcHRpb25zLCBfX2FscmVhZHlTZWVuKSB7XG4gICAgaWYgKCFvcHRpb25zLnJlY3Vyc2VFdmVyeXRoaW5nICYmICFpc09ic2VydmFibGUkJDEoc291cmNlKSlcbiAgICAgICAgcmV0dXJuIHNvdXJjZTtcbiAgICBpZiAodHlwZW9mIHNvdXJjZSAhPT0gXCJvYmplY3RcIilcbiAgICAgICAgcmV0dXJuIHNvdXJjZTtcbiAgICAvLyBEaXJlY3RseSByZXR1cm4gbnVsbCBpZiBzb3VyY2UgaXMgbnVsbFxuICAgIGlmIChzb3VyY2UgPT09IG51bGwpXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIC8vIERpcmVjdGx5IHJldHVybiB0aGUgRGF0ZSBvYmplY3QgaXRzZWxmIGlmIGNvbnRhaW5lZCBpbiB0aGUgb2JzZXJ2YWJsZVxuICAgIGlmIChzb3VyY2UgaW5zdGFuY2VvZiBEYXRlKVxuICAgICAgICByZXR1cm4gc291cmNlO1xuICAgIGlmIChpc09ic2VydmFibGVWYWx1ZSQkMShzb3VyY2UpKVxuICAgICAgICByZXR1cm4gdG9KU0hlbHBlcihzb3VyY2UuZ2V0KCksIG9wdGlvbnMsIF9fYWxyZWFkeVNlZW4pO1xuICAgIC8vIG1ha2Ugc3VyZSB3ZSB0cmFjayB0aGUga2V5cyBvZiB0aGUgb2JqZWN0XG4gICAgaWYgKGlzT2JzZXJ2YWJsZSQkMShzb3VyY2UpKVxuICAgICAgICBrZXlzJCQxKHNvdXJjZSk7XG4gICAgdmFyIGRldGVjdEN5Y2xlcyA9IG9wdGlvbnMuZGV0ZWN0Q3ljbGVzID09PSB0cnVlO1xuICAgIGlmIChkZXRlY3RDeWNsZXMgJiYgc291cmNlICE9PSBudWxsICYmIF9fYWxyZWFkeVNlZW4uaGFzKHNvdXJjZSkpIHtcbiAgICAgICAgcmV0dXJuIF9fYWxyZWFkeVNlZW4uZ2V0KHNvdXJjZSk7XG4gICAgfVxuICAgIGlmIChpc09ic2VydmFibGVBcnJheSQkMShzb3VyY2UpIHx8IEFycmF5LmlzQXJyYXkoc291cmNlKSkge1xuICAgICAgICB2YXIgcmVzXzEgPSBjYWNoZShfX2FscmVhZHlTZWVuLCBzb3VyY2UsIFtdLCBvcHRpb25zKTtcbiAgICAgICAgdmFyIHRvQWRkID0gc291cmNlLm1hcChmdW5jdGlvbiAodmFsdWUpIHsgcmV0dXJuIHRvSlNIZWxwZXIodmFsdWUsIG9wdGlvbnMsIF9fYWxyZWFkeVNlZW4pOyB9KTtcbiAgICAgICAgcmVzXzEubGVuZ3RoID0gdG9BZGQubGVuZ3RoO1xuICAgICAgICBmb3IgKHZhciBpID0gMCwgbCA9IHRvQWRkLmxlbmd0aDsgaSA8IGw7IGkrKylcbiAgICAgICAgICAgIHJlc18xW2ldID0gdG9BZGRbaV07XG4gICAgICAgIHJldHVybiByZXNfMTtcbiAgICB9XG4gICAgaWYgKGlzT2JzZXJ2YWJsZVNldCQkMShzb3VyY2UpIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihzb3VyY2UpID09PSBTZXQucHJvdG90eXBlKSB7XG4gICAgICAgIGlmIChvcHRpb25zLmV4cG9ydE1hcHNBc09iamVjdHMgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICB2YXIgcmVzXzIgPSBjYWNoZShfX2FscmVhZHlTZWVuLCBzb3VyY2UsIG5ldyBTZXQoKSwgb3B0aW9ucyk7XG4gICAgICAgICAgICBzb3VyY2UuZm9yRWFjaChmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICByZXNfMi5hZGQodG9KU0hlbHBlcih2YWx1ZSwgb3B0aW9ucywgX19hbHJlYWR5U2VlbikpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gcmVzXzI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB2YXIgcmVzXzMgPSBjYWNoZShfX2FscmVhZHlTZWVuLCBzb3VyY2UsIFtdLCBvcHRpb25zKTtcbiAgICAgICAgICAgIHNvdXJjZS5mb3JFYWNoKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHJlc18zLnB1c2godG9KU0hlbHBlcih2YWx1ZSwgb3B0aW9ucywgX19hbHJlYWR5U2VlbikpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gcmVzXzM7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKGlzT2JzZXJ2YWJsZU1hcCQkMShzb3VyY2UpIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihzb3VyY2UpID09PSBNYXAucHJvdG90eXBlKSB7XG4gICAgICAgIGlmIChvcHRpb25zLmV4cG9ydE1hcHNBc09iamVjdHMgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICB2YXIgcmVzXzQgPSBjYWNoZShfX2FscmVhZHlTZWVuLCBzb3VyY2UsIG5ldyBNYXAoKSwgb3B0aW9ucyk7XG4gICAgICAgICAgICBzb3VyY2UuZm9yRWFjaChmdW5jdGlvbiAodmFsdWUsIGtleSkge1xuICAgICAgICAgICAgICAgIHJlc180LnNldChrZXksIHRvSlNIZWxwZXIodmFsdWUsIG9wdGlvbnMsIF9fYWxyZWFkeVNlZW4pKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHJlc180O1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdmFyIHJlc181ID0gY2FjaGUoX19hbHJlYWR5U2Vlbiwgc291cmNlLCB7fSwgb3B0aW9ucyk7XG4gICAgICAgICAgICBzb3VyY2UuZm9yRWFjaChmdW5jdGlvbiAodmFsdWUsIGtleSkge1xuICAgICAgICAgICAgICAgIHJlc181W2tleV0gPSB0b0pTSGVscGVyKHZhbHVlLCBvcHRpb25zLCBfX2FscmVhZHlTZWVuKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHJlc181O1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vIEZhbGxiYWNrIHRvIHRoZSBzaXR1YXRpb24gdGhhdCBzb3VyY2UgaXMgYW4gT2JzZXJ2YWJsZU9iamVjdCBvciBhIHBsYWluIG9iamVjdFxuICAgIHZhciByZXMgPSBjYWNoZShfX2FscmVhZHlTZWVuLCBzb3VyY2UsIHt9LCBvcHRpb25zKTtcbiAgICBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7XG4gICAgICAgIHJlc1trZXldID0gdG9KU0hlbHBlcihzb3VyY2Vba2V5XSwgb3B0aW9ucywgX19hbHJlYWR5U2Vlbik7XG4gICAgfVxuICAgIHJldHVybiByZXM7XG59XG5mdW5jdGlvbiB0b0pTJCQxKHNvdXJjZSwgb3B0aW9ucykge1xuICAgIC8vIGJhY2t3YXJkIGNvbXBhdGliaWxpdHlcbiAgICBpZiAodHlwZW9mIG9wdGlvbnMgPT09IFwiYm9vbGVhblwiKVxuICAgICAgICBvcHRpb25zID0geyBkZXRlY3RDeWNsZXM6IG9wdGlvbnMgfTtcbiAgICBpZiAoIW9wdGlvbnMpXG4gICAgICAgIG9wdGlvbnMgPSBkZWZhdWx0T3B0aW9ucztcbiAgICBvcHRpb25zLmRldGVjdEN5Y2xlcyA9XG4gICAgICAgIG9wdGlvbnMuZGV0ZWN0Q3ljbGVzID09PSB1bmRlZmluZWRcbiAgICAgICAgICAgID8gb3B0aW9ucy5yZWN1cnNlRXZlcnl0aGluZyA9PT0gdHJ1ZVxuICAgICAgICAgICAgOiBvcHRpb25zLmRldGVjdEN5Y2xlcyA9PT0gdHJ1ZTtcbiAgICB2YXIgX19hbHJlYWR5U2VlbjtcbiAgICBpZiAob3B0aW9ucy5kZXRlY3RDeWNsZXMpXG4gICAgICAgIF9fYWxyZWFkeVNlZW4gPSBuZXcgTWFwKCk7XG4gICAgcmV0dXJuIHRvSlNIZWxwZXIoc291cmNlLCBvcHRpb25zLCBfX2FscmVhZHlTZWVuKTtcbn1cblxuZnVuY3Rpb24gdHJhY2UkJDEoKSB7XG4gICAgdmFyIGFyZ3MgPSBbXTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICBhcmdzW19pXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgfVxuICAgIHZhciBlbnRlckJyZWFrUG9pbnQgPSBmYWxzZTtcbiAgICBpZiAodHlwZW9mIGFyZ3NbYXJncy5sZW5ndGggLSAxXSA9PT0gXCJib29sZWFuXCIpXG4gICAgICAgIGVudGVyQnJlYWtQb2ludCA9IGFyZ3MucG9wKCk7XG4gICAgdmFyIGRlcml2YXRpb24gPSBnZXRBdG9tRnJvbUFyZ3MoYXJncyk7XG4gICAgaWYgKCFkZXJpdmF0aW9uKSB7XG4gICAgICAgIHJldHVybiBmYWlsJCQxKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiAmJlxuICAgICAgICAgICAgXCIndHJhY2UoYnJlYWs/KScgY2FuIG9ubHkgYmUgdXNlZCBpbnNpZGUgYSB0cmFja2VkIGNvbXB1dGVkIHZhbHVlIG9yIGEgUmVhY3Rpb24uIENvbnNpZGVyIHBhc3NpbmcgaW4gdGhlIGNvbXB1dGVkIHZhbHVlIG9yIHJlYWN0aW9uIGV4cGxpY2l0bHlcIik7XG4gICAgfVxuICAgIGlmIChkZXJpdmF0aW9uLmlzVHJhY2luZyA9PT0gVHJhY2VNb2RlJCQxLk5PTkUpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJbbW9ieC50cmFjZV0gJ1wiICsgZGVyaXZhdGlvbi5uYW1lICsgXCInIHRyYWNpbmcgZW5hYmxlZFwiKTtcbiAgICB9XG4gICAgZGVyaXZhdGlvbi5pc1RyYWNpbmcgPSBlbnRlckJyZWFrUG9pbnQgPyBUcmFjZU1vZGUkJDEuQlJFQUsgOiBUcmFjZU1vZGUkJDEuTE9HO1xufVxuZnVuY3Rpb24gZ2V0QXRvbUZyb21BcmdzKGFyZ3MpIHtcbiAgICBzd2l0Y2ggKGFyZ3MubGVuZ3RoKSB7XG4gICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgIHJldHVybiBnbG9iYWxTdGF0ZSQkMS50cmFja2luZ0Rlcml2YXRpb247XG4gICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgIHJldHVybiBnZXRBdG9tJCQxKGFyZ3NbMF0pO1xuICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICByZXR1cm4gZ2V0QXRvbSQkMShhcmdzWzBdLCBhcmdzWzFdKTtcbiAgICB9XG59XG5cbi8qKlxuICogRHVyaW5nIGEgdHJhbnNhY3Rpb24gbm8gdmlld3MgYXJlIHVwZGF0ZWQgdW50aWwgdGhlIGVuZCBvZiB0aGUgdHJhbnNhY3Rpb24uXG4gKiBUaGUgdHJhbnNhY3Rpb24gd2lsbCBiZSBydW4gc3luY2hyb25vdXNseSBub25ldGhlbGVzcy5cbiAqXG4gKiBAcGFyYW0gYWN0aW9uIGEgZnVuY3Rpb24gdGhhdCB1cGRhdGVzIHNvbWUgcmVhY3RpdmUgc3RhdGVcbiAqIEByZXR1cm5zIGFueSB2YWx1ZSB0aGF0IHdhcyByZXR1cm5lZCBieSB0aGUgJ2FjdGlvbicgcGFyYW1ldGVyLlxuICovXG5mdW5jdGlvbiB0cmFuc2FjdGlvbiQkMShhY3Rpb24kJDEsIHRoaXNBcmcpIHtcbiAgICBpZiAodGhpc0FyZyA9PT0gdm9pZCAwKSB7IHRoaXNBcmcgPSB1bmRlZmluZWQ7IH1cbiAgICBzdGFydEJhdGNoJCQxKCk7XG4gICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIGFjdGlvbiQkMS5hcHBseSh0aGlzQXJnKTtcbiAgICB9XG4gICAgZmluYWxseSB7XG4gICAgICAgIGVuZEJhdGNoJCQxKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiB3aGVuJCQxKHByZWRpY2F0ZSwgYXJnMSwgYXJnMikge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxIHx8IChhcmcxICYmIHR5cGVvZiBhcmcxID09PSBcIm9iamVjdFwiKSlcbiAgICAgICAgcmV0dXJuIHdoZW5Qcm9taXNlKHByZWRpY2F0ZSwgYXJnMSk7XG4gICAgcmV0dXJuIF93aGVuKHByZWRpY2F0ZSwgYXJnMSwgYXJnMiB8fCB7fSk7XG59XG5mdW5jdGlvbiBfd2hlbihwcmVkaWNhdGUsIGVmZmVjdCwgb3B0cykge1xuICAgIHZhciB0aW1lb3V0SGFuZGxlO1xuICAgIGlmICh0eXBlb2Ygb3B0cy50aW1lb3V0ID09PSBcIm51bWJlclwiKSB7XG4gICAgICAgIHRpbWVvdXRIYW5kbGUgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmICghZGlzcG9zZXJbJG1vYngkJDFdLmlzRGlzcG9zZWQpIHtcbiAgICAgICAgICAgICAgICBkaXNwb3NlcigpO1xuICAgICAgICAgICAgICAgIHZhciBlcnJvciA9IG5ldyBFcnJvcihcIldIRU5fVElNRU9VVFwiKTtcbiAgICAgICAgICAgICAgICBpZiAob3B0cy5vbkVycm9yKVxuICAgICAgICAgICAgICAgICAgICBvcHRzLm9uRXJyb3IoZXJyb3IpO1xuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIG9wdHMudGltZW91dCk7XG4gICAgfVxuICAgIG9wdHMubmFtZSA9IG9wdHMubmFtZSB8fCBcIldoZW5AXCIgKyBnZXROZXh0SWQkJDEoKTtcbiAgICB2YXIgZWZmZWN0QWN0aW9uID0gY3JlYXRlQWN0aW9uJCQxKG9wdHMubmFtZSArIFwiLWVmZmVjdFwiLCBlZmZlY3QpO1xuICAgIHZhciBkaXNwb3NlciA9IGF1dG9ydW4kJDEoZnVuY3Rpb24gKHIpIHtcbiAgICAgICAgaWYgKHByZWRpY2F0ZSgpKSB7XG4gICAgICAgICAgICByLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgIGlmICh0aW1lb3V0SGFuZGxlKVxuICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0SGFuZGxlKTtcbiAgICAgICAgICAgIGVmZmVjdEFjdGlvbigpO1xuICAgICAgICB9XG4gICAgfSwgb3B0cyk7XG4gICAgcmV0dXJuIGRpc3Bvc2VyO1xufVxuZnVuY3Rpb24gd2hlblByb21pc2UocHJlZGljYXRlLCBvcHRzKSB7XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiAmJiBvcHRzICYmIG9wdHMub25FcnJvcilcbiAgICAgICAgcmV0dXJuIGZhaWwkJDEoXCJ0aGUgb3B0aW9ucyAnb25FcnJvcicgYW5kICdwcm9taXNlJyBjYW5ub3QgYmUgY29tYmluZWRcIik7XG4gICAgdmFyIGNhbmNlbDtcbiAgICB2YXIgcmVzID0gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICB2YXIgZGlzcG9zZXIgPSBfd2hlbihwcmVkaWNhdGUsIHJlc29sdmUsIF9fYXNzaWduKHt9LCBvcHRzLCB7IG9uRXJyb3I6IHJlamVjdCB9KSk7XG4gICAgICAgIGNhbmNlbCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGRpc3Bvc2VyKCk7XG4gICAgICAgICAgICByZWplY3QoXCJXSEVOX0NBTkNFTExFRFwiKTtcbiAgICAgICAgfTtcbiAgICB9KTtcbiAgICByZXMuY2FuY2VsID0gY2FuY2VsO1xuICAgIHJldHVybiByZXM7XG59XG5cbmZ1bmN0aW9uIGdldEFkbSh0YXJnZXQpIHtcbiAgICByZXR1cm4gdGFyZ2V0WyRtb2J4JCQxXTtcbn1cbi8vIE9wdGltaXphdGlvbjogd2UgZG9uJ3QgbmVlZCB0aGUgaW50ZXJtZWRpYXRlIG9iamVjdHMgYW5kIGNvdWxkIGhhdmUgYSBjb21wbGV0ZWx5IGN1c3RvbSBhZG1pbmlzdHJhdGlvbiBmb3IgRHluYW1pY09iamVjdHMsXG4vLyBhbmQgc2tpcCBlaXRoZXIgdGhlIGludGVybmFsIHZhbHVlcyBtYXAsIG9yIHRoZSBiYXNlIG9iamVjdCB3aXRoIGl0cyBwcm9wZXJ0eSBkZXNjcmlwdG9ycyFcbnZhciBvYmplY3RQcm94eVRyYXBzID0ge1xuICAgIGhhczogZnVuY3Rpb24gKHRhcmdldCwgbmFtZSkge1xuICAgICAgICBpZiAobmFtZSA9PT0gJG1vYngkJDEgfHwgbmFtZSA9PT0gXCJjb25zdHJ1Y3RvclwiIHx8IG5hbWUgPT09IG1vYnhEaWRSdW5MYXp5SW5pdGlhbGl6ZXJzU3ltYm9sJCQxKVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIHZhciBhZG0gPSBnZXRBZG0odGFyZ2V0KTtcbiAgICAgICAgLy8gTVdFOiBzaG91bGQgYGluYCBvcGVyYXRvciBiZSByZWFjdGl2ZT8gSWYgbm90LCBiZWxvdyBjb2RlIHBhdGggd2lsbCBiZSBmYXN0ZXIgLyBtb3JlIG1lbW9yeSBlZmZpY2llbnRcbiAgICAgICAgLy8gVE9ETzogY2hlY2sgcGVyZm9ybWFuY2Ugc3RhdHMhXG4gICAgICAgIC8vIGlmIChhZG0udmFsdWVzLmdldChuYW1lIGFzIHN0cmluZykpIHJldHVybiB0cnVlXG4gICAgICAgIGlmICh0eXBlb2YgbmFtZSA9PT0gXCJzdHJpbmdcIilcbiAgICAgICAgICAgIHJldHVybiBhZG0uaGFzKG5hbWUpO1xuICAgICAgICByZXR1cm4gbmFtZSBpbiB0YXJnZXQ7XG4gICAgfSxcbiAgICBnZXQ6IGZ1bmN0aW9uICh0YXJnZXQsIG5hbWUpIHtcbiAgICAgICAgaWYgKG5hbWUgPT09ICRtb2J4JCQxIHx8IG5hbWUgPT09IFwiY29uc3RydWN0b3JcIiB8fCBuYW1lID09PSBtb2J4RGlkUnVuTGF6eUluaXRpYWxpemVyc1N5bWJvbCQkMSlcbiAgICAgICAgICAgIHJldHVybiB0YXJnZXRbbmFtZV07XG4gICAgICAgIHZhciBhZG0gPSBnZXRBZG0odGFyZ2V0KTtcbiAgICAgICAgdmFyIG9ic2VydmFibGUkJDEgPSBhZG0udmFsdWVzLmdldChuYW1lKTtcbiAgICAgICAgaWYgKG9ic2VydmFibGUkJDEgaW5zdGFuY2VvZiBBdG9tJCQxKSB7XG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gb2JzZXJ2YWJsZSQkMS5nZXQoKTtcbiAgICAgICAgICAgIGlmIChyZXN1bHQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIC8vIFRoaXMgZml4ZXMgIzE3OTYsIGJlY2F1c2UgZGVsZXRpbmcgYSBwcm9wIHRoYXQgaGFzIGFuXG4gICAgICAgICAgICAgICAgLy8gdW5kZWZpbmVkIHZhbHVlIHdvbid0IHJldHJpZ2dlciBhIG9ic2VydmVyIChubyB2aXNpYmxlIGVmZmVjdCksXG4gICAgICAgICAgICAgICAgLy8gdGhlIGF1dG9ydW4gd291bGRuJ3Qgc3Vic2NyaWJlIHRvIGZ1dHVyZSBrZXkgY2hhbmdlcyAoc2VlIGFsc28gbmV4dCBjb21tZW50KVxuICAgICAgICAgICAgICAgIGFkbS5oYXMobmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9XG4gICAgICAgIC8vIG1ha2Ugc3VyZSB3ZSBzdGFydCBsaXN0ZW5pbmcgdG8gZnV0dXJlIGtleXNcbiAgICAgICAgLy8gbm90ZSB0aGF0IHdlIG9ubHkgZG8gdGhpcyBoZXJlIGZvciBvcHRpbWl6YXRpb25cbiAgICAgICAgaWYgKHR5cGVvZiBuYW1lID09PSBcInN0cmluZ1wiKVxuICAgICAgICAgICAgYWRtLmhhcyhuYW1lKTtcbiAgICAgICAgcmV0dXJuIHRhcmdldFtuYW1lXTtcbiAgICB9LFxuICAgIHNldDogZnVuY3Rpb24gKHRhcmdldCwgbmFtZSwgdmFsdWUpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBuYW1lICE9PSBcInN0cmluZ1wiKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICBzZXQkJDEodGFyZ2V0LCBuYW1lLCB2YWx1ZSk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH0sXG4gICAgZGVsZXRlUHJvcGVydHk6IGZ1bmN0aW9uICh0YXJnZXQsIG5hbWUpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBuYW1lICE9PSBcInN0cmluZ1wiKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB2YXIgYWRtID0gZ2V0QWRtKHRhcmdldCk7XG4gICAgICAgIGFkbS5yZW1vdmUobmFtZSk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH0sXG4gICAgb3duS2V5czogZnVuY3Rpb24gKHRhcmdldCkge1xuICAgICAgICB2YXIgYWRtID0gZ2V0QWRtKHRhcmdldCk7XG4gICAgICAgIGFkbS5rZXlzQXRvbS5yZXBvcnRPYnNlcnZlZCgpO1xuICAgICAgICByZXR1cm4gUmVmbGVjdC5vd25LZXlzKHRhcmdldCk7XG4gICAgfSxcbiAgICBwcmV2ZW50RXh0ZW5zaW9uczogZnVuY3Rpb24gKHRhcmdldCkge1xuICAgICAgICBmYWlsJCQxKFwiRHluYW1pYyBvYnNlcnZhYmxlIG9iamVjdHMgY2Fubm90IGJlIGZyb3plblwiKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn07XG5mdW5jdGlvbiBjcmVhdGVEeW5hbWljT2JzZXJ2YWJsZU9iamVjdCQkMShiYXNlKSB7XG4gICAgdmFyIHByb3h5ID0gbmV3IFByb3h5KGJhc2UsIG9iamVjdFByb3h5VHJhcHMpO1xuICAgIGJhc2VbJG1vYngkJDFdLnByb3h5ID0gcHJveHk7XG4gICAgcmV0dXJuIHByb3h5O1xufVxuXG5mdW5jdGlvbiBoYXNJbnRlcmNlcHRvcnMkJDEoaW50ZXJjZXB0YWJsZSkge1xuICAgIHJldHVybiBpbnRlcmNlcHRhYmxlLmludGVyY2VwdG9ycyAhPT0gdW5kZWZpbmVkICYmIGludGVyY2VwdGFibGUuaW50ZXJjZXB0b3JzLmxlbmd0aCA+IDA7XG59XG5mdW5jdGlvbiByZWdpc3RlckludGVyY2VwdG9yJCQxKGludGVyY2VwdGFibGUsIGhhbmRsZXIpIHtcbiAgICB2YXIgaW50ZXJjZXB0b3JzID0gaW50ZXJjZXB0YWJsZS5pbnRlcmNlcHRvcnMgfHwgKGludGVyY2VwdGFibGUuaW50ZXJjZXB0b3JzID0gW10pO1xuICAgIGludGVyY2VwdG9ycy5wdXNoKGhhbmRsZXIpO1xuICAgIHJldHVybiBvbmNlJCQxKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGlkeCA9IGludGVyY2VwdG9ycy5pbmRleE9mKGhhbmRsZXIpO1xuICAgICAgICBpZiAoaWR4ICE9PSAtMSlcbiAgICAgICAgICAgIGludGVyY2VwdG9ycy5zcGxpY2UoaWR4LCAxKTtcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIGludGVyY2VwdENoYW5nZSQkMShpbnRlcmNlcHRhYmxlLCBjaGFuZ2UpIHtcbiAgICB2YXIgcHJldlUgPSB1bnRyYWNrZWRTdGFydCQkMSgpO1xuICAgIHRyeSB7XG4gICAgICAgIHZhciBpbnRlcmNlcHRvcnMgPSBpbnRlcmNlcHRhYmxlLmludGVyY2VwdG9ycztcbiAgICAgICAgaWYgKGludGVyY2VwdG9ycylcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gaW50ZXJjZXB0b3JzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgICAgIGNoYW5nZSA9IGludGVyY2VwdG9yc1tpXShjaGFuZ2UpO1xuICAgICAgICAgICAgICAgIGludmFyaWFudCQkMSghY2hhbmdlIHx8IGNoYW5nZS50eXBlLCBcIkludGVyY2VwdCBoYW5kbGVycyBzaG91bGQgcmV0dXJuIG5vdGhpbmcgb3IgYSBjaGFuZ2Ugb2JqZWN0XCIpO1xuICAgICAgICAgICAgICAgIGlmICghY2hhbmdlKVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNoYW5nZTtcbiAgICB9XG4gICAgZmluYWxseSB7XG4gICAgICAgIHVudHJhY2tlZEVuZCQkMShwcmV2VSk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBoYXNMaXN0ZW5lcnMkJDEobGlzdGVuYWJsZSkge1xuICAgIHJldHVybiBsaXN0ZW5hYmxlLmNoYW5nZUxpc3RlbmVycyAhPT0gdW5kZWZpbmVkICYmIGxpc3RlbmFibGUuY2hhbmdlTGlzdGVuZXJzLmxlbmd0aCA+IDA7XG59XG5mdW5jdGlvbiByZWdpc3Rlckxpc3RlbmVyJCQxKGxpc3RlbmFibGUsIGhhbmRsZXIpIHtcbiAgICB2YXIgbGlzdGVuZXJzID0gbGlzdGVuYWJsZS5jaGFuZ2VMaXN0ZW5lcnMgfHwgKGxpc3RlbmFibGUuY2hhbmdlTGlzdGVuZXJzID0gW10pO1xuICAgIGxpc3RlbmVycy5wdXNoKGhhbmRsZXIpO1xuICAgIHJldHVybiBvbmNlJCQxKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGlkeCA9IGxpc3RlbmVycy5pbmRleE9mKGhhbmRsZXIpO1xuICAgICAgICBpZiAoaWR4ICE9PSAtMSlcbiAgICAgICAgICAgIGxpc3RlbmVycy5zcGxpY2UoaWR4LCAxKTtcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIG5vdGlmeUxpc3RlbmVycyQkMShsaXN0ZW5hYmxlLCBjaGFuZ2UpIHtcbiAgICB2YXIgcHJldlUgPSB1bnRyYWNrZWRTdGFydCQkMSgpO1xuICAgIHZhciBsaXN0ZW5lcnMgPSBsaXN0ZW5hYmxlLmNoYW5nZUxpc3RlbmVycztcbiAgICBpZiAoIWxpc3RlbmVycylcbiAgICAgICAgcmV0dXJuO1xuICAgIGxpc3RlbmVycyA9IGxpc3RlbmVycy5zbGljZSgpO1xuICAgIGZvciAodmFyIGkgPSAwLCBsID0gbGlzdGVuZXJzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICBsaXN0ZW5lcnNbaV0oY2hhbmdlKTtcbiAgICB9XG4gICAgdW50cmFja2VkRW5kJCQxKHByZXZVKTtcbn1cblxudmFyIE1BWF9TUExJQ0VfU0laRSA9IDEwMDAwOyAvLyBTZWUgZS5nLiBodHRwczovL2dpdGh1Yi5jb20vbW9ieGpzL21vYngvaXNzdWVzLzg1OVxudmFyIGFycmF5VHJhcHMgPSB7XG4gICAgZ2V0OiBmdW5jdGlvbiAodGFyZ2V0LCBuYW1lKSB7XG4gICAgICAgIGlmIChuYW1lID09PSAkbW9ieCQkMSlcbiAgICAgICAgICAgIHJldHVybiB0YXJnZXRbJG1vYngkJDFdO1xuICAgICAgICBpZiAobmFtZSA9PT0gXCJsZW5ndGhcIilcbiAgICAgICAgICAgIHJldHVybiB0YXJnZXRbJG1vYngkJDFdLmdldEFycmF5TGVuZ3RoKCk7XG4gICAgICAgIGlmICh0eXBlb2YgbmFtZSA9PT0gXCJudW1iZXJcIikge1xuICAgICAgICAgICAgcmV0dXJuIGFycmF5RXh0ZW5zaW9ucy5nZXQuY2FsbCh0YXJnZXQsIG5hbWUpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgbmFtZSA9PT0gXCJzdHJpbmdcIiAmJiAhaXNOYU4obmFtZSkpIHtcbiAgICAgICAgICAgIHJldHVybiBhcnJheUV4dGVuc2lvbnMuZ2V0LmNhbGwodGFyZ2V0LCBwYXJzZUludChuYW1lKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGFycmF5RXh0ZW5zaW9ucy5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuICAgICAgICAgICAgcmV0dXJuIGFycmF5RXh0ZW5zaW9uc1tuYW1lXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGFyZ2V0W25hbWVdO1xuICAgIH0sXG4gICAgc2V0OiBmdW5jdGlvbiAodGFyZ2V0LCBuYW1lLCB2YWx1ZSkge1xuICAgICAgICBpZiAobmFtZSA9PT0gXCJsZW5ndGhcIikge1xuICAgICAgICAgICAgdGFyZ2V0WyRtb2J4JCQxXS5zZXRBcnJheUxlbmd0aCh2YWx1ZSk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIG5hbWUgPT09IFwibnVtYmVyXCIpIHtcbiAgICAgICAgICAgIGFycmF5RXh0ZW5zaW9ucy5zZXQuY2FsbCh0YXJnZXQsIG5hbWUsIHZhbHVlKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmICghaXNOYU4obmFtZSkpIHtcbiAgICAgICAgICAgIGFycmF5RXh0ZW5zaW9ucy5zZXQuY2FsbCh0YXJnZXQsIHBhcnNlSW50KG5hbWUpLCB2YWx1ZSk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSxcbiAgICBwcmV2ZW50RXh0ZW5zaW9uczogZnVuY3Rpb24gKHRhcmdldCkge1xuICAgICAgICBmYWlsJCQxKFwiT2JzZXJ2YWJsZSBhcnJheXMgY2Fubm90IGJlIGZyb3plblwiKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn07XG5mdW5jdGlvbiBjcmVhdGVPYnNlcnZhYmxlQXJyYXkkJDEoaW5pdGlhbFZhbHVlcywgZW5oYW5jZXIsIG5hbWUsIG93bmVkKSB7XG4gICAgaWYgKG5hbWUgPT09IHZvaWQgMCkgeyBuYW1lID0gXCJPYnNlcnZhYmxlQXJyYXlAXCIgKyBnZXROZXh0SWQkJDEoKTsgfVxuICAgIGlmIChvd25lZCA9PT0gdm9pZCAwKSB7IG93bmVkID0gZmFsc2U7IH1cbiAgICB2YXIgYWRtID0gbmV3IE9ic2VydmFibGVBcnJheUFkbWluaXN0cmF0aW9uKG5hbWUsIGVuaGFuY2VyLCBvd25lZCk7XG4gICAgYWRkSGlkZGVuRmluYWxQcm9wJCQxKGFkbS52YWx1ZXMsICRtb2J4JCQxLCBhZG0pO1xuICAgIHZhciBwcm94eSA9IG5ldyBQcm94eShhZG0udmFsdWVzLCBhcnJheVRyYXBzKTtcbiAgICBhZG0ucHJveHkgPSBwcm94eTtcbiAgICBpZiAoaW5pdGlhbFZhbHVlcyAmJiBpbml0aWFsVmFsdWVzLmxlbmd0aCkge1xuICAgICAgICB2YXIgcHJldiA9IGFsbG93U3RhdGVDaGFuZ2VzU3RhcnQkJDEodHJ1ZSk7XG4gICAgICAgIGFkbS5zcGxpY2VXaXRoQXJyYXkoMCwgMCwgaW5pdGlhbFZhbHVlcyk7XG4gICAgICAgIGFsbG93U3RhdGVDaGFuZ2VzRW5kJCQxKHByZXYpO1xuICAgIH1cbiAgICByZXR1cm4gcHJveHk7XG59XG52YXIgT2JzZXJ2YWJsZUFycmF5QWRtaW5pc3RyYXRpb24gPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gT2JzZXJ2YWJsZUFycmF5QWRtaW5pc3RyYXRpb24obmFtZSwgZW5oYW5jZXIsIG93bmVkKSB7XG4gICAgICAgIHRoaXMub3duZWQgPSBvd25lZDtcbiAgICAgICAgdGhpcy52YWx1ZXMgPSBbXTtcbiAgICAgICAgdGhpcy5wcm94eSA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5sYXN0S25vd25MZW5ndGggPSAwO1xuICAgICAgICB0aGlzLmF0b20gPSBuZXcgQXRvbSQkMShuYW1lIHx8IFwiT2JzZXJ2YWJsZUFycmF5QFwiICsgZ2V0TmV4dElkJCQxKCkpO1xuICAgICAgICB0aGlzLmVuaGFuY2VyID0gZnVuY3Rpb24gKG5ld1YsIG9sZFYpIHsgcmV0dXJuIGVuaGFuY2VyKG5ld1YsIG9sZFYsIG5hbWUgKyBcIlsuLl1cIik7IH07XG4gICAgfVxuICAgIE9ic2VydmFibGVBcnJheUFkbWluaXN0cmF0aW9uLnByb3RvdHlwZS5kZWhhbmNlVmFsdWUgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgaWYgKHRoaXMuZGVoYW5jZXIgIT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRlaGFuY2VyKHZhbHVlKTtcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH07XG4gICAgT2JzZXJ2YWJsZUFycmF5QWRtaW5pc3RyYXRpb24ucHJvdG90eXBlLmRlaGFuY2VWYWx1ZXMgPSBmdW5jdGlvbiAodmFsdWVzJCQxKSB7XG4gICAgICAgIGlmICh0aGlzLmRlaGFuY2VyICE9PSB1bmRlZmluZWQgJiYgdmFsdWVzJCQxLmxlbmd0aCA+IDApXG4gICAgICAgICAgICByZXR1cm4gdmFsdWVzJCQxLm1hcCh0aGlzLmRlaGFuY2VyKTtcbiAgICAgICAgcmV0dXJuIHZhbHVlcyQkMTtcbiAgICB9O1xuICAgIE9ic2VydmFibGVBcnJheUFkbWluaXN0cmF0aW9uLnByb3RvdHlwZS5pbnRlcmNlcHQgPSBmdW5jdGlvbiAoaGFuZGxlcikge1xuICAgICAgICByZXR1cm4gcmVnaXN0ZXJJbnRlcmNlcHRvciQkMSh0aGlzLCBoYW5kbGVyKTtcbiAgICB9O1xuICAgIE9ic2VydmFibGVBcnJheUFkbWluaXN0cmF0aW9uLnByb3RvdHlwZS5vYnNlcnZlID0gZnVuY3Rpb24gKGxpc3RlbmVyLCBmaXJlSW1tZWRpYXRlbHkpIHtcbiAgICAgICAgaWYgKGZpcmVJbW1lZGlhdGVseSA9PT0gdm9pZCAwKSB7IGZpcmVJbW1lZGlhdGVseSA9IGZhbHNlOyB9XG4gICAgICAgIGlmIChmaXJlSW1tZWRpYXRlbHkpIHtcbiAgICAgICAgICAgIGxpc3RlbmVyKHtcbiAgICAgICAgICAgICAgICBvYmplY3Q6IHRoaXMucHJveHksXG4gICAgICAgICAgICAgICAgdHlwZTogXCJzcGxpY2VcIixcbiAgICAgICAgICAgICAgICBpbmRleDogMCxcbiAgICAgICAgICAgICAgICBhZGRlZDogdGhpcy52YWx1ZXMuc2xpY2UoKSxcbiAgICAgICAgICAgICAgICBhZGRlZENvdW50OiB0aGlzLnZhbHVlcy5sZW5ndGgsXG4gICAgICAgICAgICAgICAgcmVtb3ZlZDogW10sXG4gICAgICAgICAgICAgICAgcmVtb3ZlZENvdW50OiAwXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVnaXN0ZXJMaXN0ZW5lciQkMSh0aGlzLCBsaXN0ZW5lcik7XG4gICAgfTtcbiAgICBPYnNlcnZhYmxlQXJyYXlBZG1pbmlzdHJhdGlvbi5wcm90b3R5cGUuZ2V0QXJyYXlMZW5ndGggPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuYXRvbS5yZXBvcnRPYnNlcnZlZCgpO1xuICAgICAgICByZXR1cm4gdGhpcy52YWx1ZXMubGVuZ3RoO1xuICAgIH07XG4gICAgT2JzZXJ2YWJsZUFycmF5QWRtaW5pc3RyYXRpb24ucHJvdG90eXBlLnNldEFycmF5TGVuZ3RoID0gZnVuY3Rpb24gKG5ld0xlbmd0aCkge1xuICAgICAgICBpZiAodHlwZW9mIG5ld0xlbmd0aCAhPT0gXCJudW1iZXJcIiB8fCBuZXdMZW5ndGggPCAwKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiW21vYnguYXJyYXldIE91dCBvZiByYW5nZTogXCIgKyBuZXdMZW5ndGgpO1xuICAgICAgICB2YXIgY3VycmVudExlbmd0aCA9IHRoaXMudmFsdWVzLmxlbmd0aDtcbiAgICAgICAgaWYgKG5ld0xlbmd0aCA9PT0gY3VycmVudExlbmd0aClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgZWxzZSBpZiAobmV3TGVuZ3RoID4gY3VycmVudExlbmd0aCkge1xuICAgICAgICAgICAgdmFyIG5ld0l0ZW1zID0gbmV3IEFycmF5KG5ld0xlbmd0aCAtIGN1cnJlbnRMZW5ndGgpO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBuZXdMZW5ndGggLSBjdXJyZW50TGVuZ3RoOyBpKyspXG4gICAgICAgICAgICAgICAgbmV3SXRlbXNbaV0gPSB1bmRlZmluZWQ7IC8vIE5vIEFycmF5LmZpbGwgZXZlcnl3aGVyZS4uLlxuICAgICAgICAgICAgdGhpcy5zcGxpY2VXaXRoQXJyYXkoY3VycmVudExlbmd0aCwgMCwgbmV3SXRlbXMpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHRoaXMuc3BsaWNlV2l0aEFycmF5KG5ld0xlbmd0aCwgY3VycmVudExlbmd0aCAtIG5ld0xlbmd0aCk7XG4gICAgfTtcbiAgICBPYnNlcnZhYmxlQXJyYXlBZG1pbmlzdHJhdGlvbi5wcm90b3R5cGUudXBkYXRlQXJyYXlMZW5ndGggPSBmdW5jdGlvbiAob2xkTGVuZ3RoLCBkZWx0YSkge1xuICAgICAgICBpZiAob2xkTGVuZ3RoICE9PSB0aGlzLmxhc3RLbm93bkxlbmd0aClcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlttb2J4XSBNb2RpZmljYXRpb24gZXhjZXB0aW9uOiB0aGUgaW50ZXJuYWwgc3RydWN0dXJlIG9mIGFuIG9ic2VydmFibGUgYXJyYXkgd2FzIGNoYW5nZWQuXCIpO1xuICAgICAgICB0aGlzLmxhc3RLbm93bkxlbmd0aCArPSBkZWx0YTtcbiAgICB9O1xuICAgIE9ic2VydmFibGVBcnJheUFkbWluaXN0cmF0aW9uLnByb3RvdHlwZS5zcGxpY2VXaXRoQXJyYXkgPSBmdW5jdGlvbiAoaW5kZXgsIGRlbGV0ZUNvdW50LCBuZXdJdGVtcykge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICBjaGVja0lmU3RhdGVNb2RpZmljYXRpb25zQXJlQWxsb3dlZCQkMSh0aGlzLmF0b20pO1xuICAgICAgICB2YXIgbGVuZ3RoID0gdGhpcy52YWx1ZXMubGVuZ3RoO1xuICAgICAgICBpZiAoaW5kZXggPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIGluZGV4ID0gMDtcbiAgICAgICAgZWxzZSBpZiAoaW5kZXggPiBsZW5ndGgpXG4gICAgICAgICAgICBpbmRleCA9IGxlbmd0aDtcbiAgICAgICAgZWxzZSBpZiAoaW5kZXggPCAwKVxuICAgICAgICAgICAgaW5kZXggPSBNYXRoLm1heCgwLCBsZW5ndGggKyBpbmRleCk7XG4gICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKVxuICAgICAgICAgICAgZGVsZXRlQ291bnQgPSBsZW5ndGggLSBpbmRleDtcbiAgICAgICAgZWxzZSBpZiAoZGVsZXRlQ291bnQgPT09IHVuZGVmaW5lZCB8fCBkZWxldGVDb3VudCA9PT0gbnVsbClcbiAgICAgICAgICAgIGRlbGV0ZUNvdW50ID0gMDtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgZGVsZXRlQ291bnQgPSBNYXRoLm1heCgwLCBNYXRoLm1pbihkZWxldGVDb3VudCwgbGVuZ3RoIC0gaW5kZXgpKTtcbiAgICAgICAgaWYgKG5ld0l0ZW1zID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICBuZXdJdGVtcyA9IEVNUFRZX0FSUkFZJCQxO1xuICAgICAgICBpZiAoaGFzSW50ZXJjZXB0b3JzJCQxKHRoaXMpKSB7XG4gICAgICAgICAgICB2YXIgY2hhbmdlID0gaW50ZXJjZXB0Q2hhbmdlJCQxKHRoaXMsIHtcbiAgICAgICAgICAgICAgICBvYmplY3Q6IHRoaXMucHJveHksXG4gICAgICAgICAgICAgICAgdHlwZTogXCJzcGxpY2VcIixcbiAgICAgICAgICAgICAgICBpbmRleDogaW5kZXgsXG4gICAgICAgICAgICAgICAgcmVtb3ZlZENvdW50OiBkZWxldGVDb3VudCxcbiAgICAgICAgICAgICAgICBhZGRlZDogbmV3SXRlbXNcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKCFjaGFuZ2UpXG4gICAgICAgICAgICAgICAgcmV0dXJuIEVNUFRZX0FSUkFZJCQxO1xuICAgICAgICAgICAgZGVsZXRlQ291bnQgPSBjaGFuZ2UucmVtb3ZlZENvdW50O1xuICAgICAgICAgICAgbmV3SXRlbXMgPSBjaGFuZ2UuYWRkZWQ7XG4gICAgICAgIH1cbiAgICAgICAgbmV3SXRlbXMgPSBuZXdJdGVtcy5sZW5ndGggPT09IDAgPyBuZXdJdGVtcyA6IG5ld0l0ZW1zLm1hcChmdW5jdGlvbiAodikgeyByZXR1cm4gX3RoaXMuZW5oYW5jZXIodiwgdW5kZWZpbmVkKTsgfSk7XG4gICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgICAgICAgICAgIHZhciBsZW5ndGhEZWx0YSA9IG5ld0l0ZW1zLmxlbmd0aCAtIGRlbGV0ZUNvdW50O1xuICAgICAgICAgICAgdGhpcy51cGRhdGVBcnJheUxlbmd0aChsZW5ndGgsIGxlbmd0aERlbHRhKTsgLy8gY2hlY2tzIGlmIGludGVybmFsIGFycmF5IHdhc24ndCBtb2RpZmllZFxuICAgICAgICB9XG4gICAgICAgIHZhciByZXMgPSB0aGlzLnNwbGljZUl0ZW1zSW50b1ZhbHVlcyhpbmRleCwgZGVsZXRlQ291bnQsIG5ld0l0ZW1zKTtcbiAgICAgICAgaWYgKGRlbGV0ZUNvdW50ICE9PSAwIHx8IG5ld0l0ZW1zLmxlbmd0aCAhPT0gMClcbiAgICAgICAgICAgIHRoaXMubm90aWZ5QXJyYXlTcGxpY2UoaW5kZXgsIG5ld0l0ZW1zLCByZXMpO1xuICAgICAgICByZXR1cm4gdGhpcy5kZWhhbmNlVmFsdWVzKHJlcyk7XG4gICAgfTtcbiAgICBPYnNlcnZhYmxlQXJyYXlBZG1pbmlzdHJhdGlvbi5wcm90b3R5cGUuc3BsaWNlSXRlbXNJbnRvVmFsdWVzID0gZnVuY3Rpb24gKGluZGV4LCBkZWxldGVDb3VudCwgbmV3SXRlbXMpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBpZiAobmV3SXRlbXMubGVuZ3RoIDwgTUFYX1NQTElDRV9TSVpFKSB7XG4gICAgICAgICAgICByZXR1cm4gKF9hID0gdGhpcy52YWx1ZXMpLnNwbGljZS5hcHBseShfYSwgX19zcHJlYWQoW2luZGV4LCBkZWxldGVDb3VudF0sIG5ld0l0ZW1zKSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB2YXIgcmVzID0gdGhpcy52YWx1ZXMuc2xpY2UoaW5kZXgsIGluZGV4ICsgZGVsZXRlQ291bnQpO1xuICAgICAgICAgICAgdGhpcy52YWx1ZXMgPSB0aGlzLnZhbHVlc1xuICAgICAgICAgICAgICAgIC5zbGljZSgwLCBpbmRleClcbiAgICAgICAgICAgICAgICAuY29uY2F0KG5ld0l0ZW1zLCB0aGlzLnZhbHVlcy5zbGljZShpbmRleCArIGRlbGV0ZUNvdW50KSk7XG4gICAgICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBPYnNlcnZhYmxlQXJyYXlBZG1pbmlzdHJhdGlvbi5wcm90b3R5cGUubm90aWZ5QXJyYXlDaGlsZFVwZGF0ZSA9IGZ1bmN0aW9uIChpbmRleCwgbmV3VmFsdWUsIG9sZFZhbHVlKSB7XG4gICAgICAgIHZhciBub3RpZnlTcHkgPSAhdGhpcy5vd25lZCAmJiBpc1NweUVuYWJsZWQkJDEoKTtcbiAgICAgICAgdmFyIG5vdGlmeSA9IGhhc0xpc3RlbmVycyQkMSh0aGlzKTtcbiAgICAgICAgdmFyIGNoYW5nZSA9IG5vdGlmeSB8fCBub3RpZnlTcHlcbiAgICAgICAgICAgID8ge1xuICAgICAgICAgICAgICAgIG9iamVjdDogdGhpcy5wcm94eSxcbiAgICAgICAgICAgICAgICB0eXBlOiBcInVwZGF0ZVwiLFxuICAgICAgICAgICAgICAgIGluZGV4OiBpbmRleCxcbiAgICAgICAgICAgICAgICBuZXdWYWx1ZTogbmV3VmFsdWUsXG4gICAgICAgICAgICAgICAgb2xkVmFsdWU6IG9sZFZhbHVlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICA6IG51bGw7XG4gICAgICAgIC8vIFRoZSByZWFzb24gd2h5IHRoaXMgaXMgb24gcmlnaHQgaGFuZCBzaWRlIGhlcmUgKGFuZCBub3QgYWJvdmUpLCBpcyB0aGlzIHdheSB0aGUgdWdsaWZpZXIgd2lsbCBkcm9wIGl0LCBidXQgaXQgd29uJ3RcbiAgICAgICAgLy8gY2F1c2UgYW55IHJ1bnRpbWUgb3ZlcmhlYWQgaW4gZGV2ZWxvcG1lbnQgbW9kZSB3aXRob3V0IE5PREVfRU5WIHNldCwgdW5sZXNzIHNweWluZyBpcyBlbmFibGVkXG4gICAgICAgIGlmIChub3RpZnlTcHkgJiYgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKVxuICAgICAgICAgICAgc3B5UmVwb3J0U3RhcnQkJDEoX19hc3NpZ24oe30sIGNoYW5nZSwgeyBuYW1lOiB0aGlzLmF0b20ubmFtZSB9KSk7XG4gICAgICAgIHRoaXMuYXRvbS5yZXBvcnRDaGFuZ2VkKCk7XG4gICAgICAgIGlmIChub3RpZnkpXG4gICAgICAgICAgICBub3RpZnlMaXN0ZW5lcnMkJDEodGhpcywgY2hhbmdlKTtcbiAgICAgICAgaWYgKG5vdGlmeVNweSAmJiBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpXG4gICAgICAgICAgICBzcHlSZXBvcnRFbmQkJDEoKTtcbiAgICB9O1xuICAgIE9ic2VydmFibGVBcnJheUFkbWluaXN0cmF0aW9uLnByb3RvdHlwZS5ub3RpZnlBcnJheVNwbGljZSA9IGZ1bmN0aW9uIChpbmRleCwgYWRkZWQsIHJlbW92ZWQpIHtcbiAgICAgICAgdmFyIG5vdGlmeVNweSA9ICF0aGlzLm93bmVkICYmIGlzU3B5RW5hYmxlZCQkMSgpO1xuICAgICAgICB2YXIgbm90aWZ5ID0gaGFzTGlzdGVuZXJzJCQxKHRoaXMpO1xuICAgICAgICB2YXIgY2hhbmdlID0gbm90aWZ5IHx8IG5vdGlmeVNweVxuICAgICAgICAgICAgPyB7XG4gICAgICAgICAgICAgICAgb2JqZWN0OiB0aGlzLnByb3h5LFxuICAgICAgICAgICAgICAgIHR5cGU6IFwic3BsaWNlXCIsXG4gICAgICAgICAgICAgICAgaW5kZXg6IGluZGV4LFxuICAgICAgICAgICAgICAgIHJlbW92ZWQ6IHJlbW92ZWQsXG4gICAgICAgICAgICAgICAgYWRkZWQ6IGFkZGVkLFxuICAgICAgICAgICAgICAgIHJlbW92ZWRDb3VudDogcmVtb3ZlZC5sZW5ndGgsXG4gICAgICAgICAgICAgICAgYWRkZWRDb3VudDogYWRkZWQubGVuZ3RoXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICA6IG51bGw7XG4gICAgICAgIGlmIChub3RpZnlTcHkgJiYgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKVxuICAgICAgICAgICAgc3B5UmVwb3J0U3RhcnQkJDEoX19hc3NpZ24oe30sIGNoYW5nZSwgeyBuYW1lOiB0aGlzLmF0b20ubmFtZSB9KSk7XG4gICAgICAgIHRoaXMuYXRvbS5yZXBvcnRDaGFuZ2VkKCk7XG4gICAgICAgIC8vIGNvbmZvcm06IGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL0FycmF5L29ic2VydmVcbiAgICAgICAgaWYgKG5vdGlmeSlcbiAgICAgICAgICAgIG5vdGlmeUxpc3RlbmVycyQkMSh0aGlzLCBjaGFuZ2UpO1xuICAgICAgICBpZiAobm90aWZ5U3B5ICYmIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIilcbiAgICAgICAgICAgIHNweVJlcG9ydEVuZCQkMSgpO1xuICAgIH07XG4gICAgcmV0dXJuIE9ic2VydmFibGVBcnJheUFkbWluaXN0cmF0aW9uO1xufSgpKTtcbnZhciBhcnJheUV4dGVuc2lvbnMgPSB7XG4gICAgaW50ZXJjZXB0OiBmdW5jdGlvbiAoaGFuZGxlcikge1xuICAgICAgICByZXR1cm4gdGhpc1skbW9ieCQkMV0uaW50ZXJjZXB0KGhhbmRsZXIpO1xuICAgIH0sXG4gICAgb2JzZXJ2ZTogZnVuY3Rpb24gKGxpc3RlbmVyLCBmaXJlSW1tZWRpYXRlbHkpIHtcbiAgICAgICAgaWYgKGZpcmVJbW1lZGlhdGVseSA9PT0gdm9pZCAwKSB7IGZpcmVJbW1lZGlhdGVseSA9IGZhbHNlOyB9XG4gICAgICAgIHZhciBhZG0gPSB0aGlzWyRtb2J4JCQxXTtcbiAgICAgICAgcmV0dXJuIGFkbS5vYnNlcnZlKGxpc3RlbmVyLCBmaXJlSW1tZWRpYXRlbHkpO1xuICAgIH0sXG4gICAgY2xlYXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3BsaWNlKDApO1xuICAgIH0sXG4gICAgcmVwbGFjZTogZnVuY3Rpb24gKG5ld0l0ZW1zKSB7XG4gICAgICAgIHZhciBhZG0gPSB0aGlzWyRtb2J4JCQxXTtcbiAgICAgICAgcmV0dXJuIGFkbS5zcGxpY2VXaXRoQXJyYXkoMCwgYWRtLnZhbHVlcy5sZW5ndGgsIG5ld0l0ZW1zKTtcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIENvbnZlcnRzIHRoaXMgYXJyYXkgYmFjayB0byBhIChzaGFsbG93KSBqYXZhc2NyaXB0IHN0cnVjdHVyZS5cbiAgICAgKiBGb3IgYSBkZWVwIGNsb25lIHVzZSBtb2J4LnRvSlNcbiAgICAgKi9cbiAgICB0b0pTOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNsaWNlKCk7XG4gICAgfSxcbiAgICB0b0pTT046IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gVXNlZCBieSBKU09OLnN0cmluZ2lmeVxuICAgICAgICByZXR1cm4gdGhpcy50b0pTKCk7XG4gICAgfSxcbiAgICAvKlxuICAgICAqIGZ1bmN0aW9ucyB0aGF0IGRvIGFsdGVyIHRoZSBpbnRlcm5hbCBzdHJ1Y3R1cmUgb2YgdGhlIGFycmF5LCAoYmFzZWQgb24gbGliLmVzNi5kLnRzKVxuICAgICAqIHNpbmNlIHRoZXNlIGZ1bmN0aW9ucyBhbHRlciB0aGUgaW5uZXIgc3RydWN0dXJlIG9mIHRoZSBhcnJheSwgdGhlIGhhdmUgc2lkZSBlZmZlY3RzLlxuICAgICAqIEJlY2F1c2UgdGhlIGhhdmUgc2lkZSBlZmZlY3RzLCB0aGV5IHNob3VsZCBub3QgYmUgdXNlZCBpbiBjb21wdXRlZCBmdW5jdGlvbixcbiAgICAgKiBhbmQgZm9yIHRoYXQgcmVhc29uIHRoZSBkbyBub3QgY2FsbCBkZXBlbmRlbmN5U3RhdGUubm90aWZ5T2JzZXJ2ZWRcbiAgICAgKi9cbiAgICBzcGxpY2U6IGZ1bmN0aW9uIChpbmRleCwgZGVsZXRlQ291bnQpIHtcbiAgICAgICAgdmFyIG5ld0l0ZW1zID0gW107XG4gICAgICAgIGZvciAodmFyIF9pID0gMjsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICBuZXdJdGVtc1tfaSAtIDJdID0gYXJndW1lbnRzW19pXTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgYWRtID0gdGhpc1skbW9ieCQkMV07XG4gICAgICAgIHN3aXRjaCAoYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICByZXR1cm4gYWRtLnNwbGljZVdpdGhBcnJheShpbmRleCk7XG4gICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIGFkbS5zcGxpY2VXaXRoQXJyYXkoaW5kZXgsIGRlbGV0ZUNvdW50KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYWRtLnNwbGljZVdpdGhBcnJheShpbmRleCwgZGVsZXRlQ291bnQsIG5ld0l0ZW1zKTtcbiAgICB9LFxuICAgIHNwbGljZVdpdGhBcnJheTogZnVuY3Rpb24gKGluZGV4LCBkZWxldGVDb3VudCwgbmV3SXRlbXMpIHtcbiAgICAgICAgdmFyIGFkbSA9IHRoaXNbJG1vYngkJDFdO1xuICAgICAgICByZXR1cm4gYWRtLnNwbGljZVdpdGhBcnJheShpbmRleCwgZGVsZXRlQ291bnQsIG5ld0l0ZW1zKTtcbiAgICB9LFxuICAgIHB1c2g6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGl0ZW1zID0gW107XG4gICAgICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICBpdGVtc1tfaV0gPSBhcmd1bWVudHNbX2ldO1xuICAgICAgICB9XG4gICAgICAgIHZhciBhZG0gPSB0aGlzWyRtb2J4JCQxXTtcbiAgICAgICAgYWRtLnNwbGljZVdpdGhBcnJheShhZG0udmFsdWVzLmxlbmd0aCwgMCwgaXRlbXMpO1xuICAgICAgICByZXR1cm4gYWRtLnZhbHVlcy5sZW5ndGg7XG4gICAgfSxcbiAgICBwb3A6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3BsaWNlKE1hdGgubWF4KHRoaXNbJG1vYngkJDFdLnZhbHVlcy5sZW5ndGggLSAxLCAwKSwgMSlbMF07XG4gICAgfSxcbiAgICBzaGlmdDogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zcGxpY2UoMCwgMSlbMF07XG4gICAgfSxcbiAgICB1bnNoaWZ0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBpdGVtcyA9IFtdO1xuICAgICAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgaXRlbXNbX2ldID0gYXJndW1lbnRzW19pXTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgYWRtID0gdGhpc1skbW9ieCQkMV07XG4gICAgICAgIGFkbS5zcGxpY2VXaXRoQXJyYXkoMCwgMCwgaXRlbXMpO1xuICAgICAgICByZXR1cm4gYWRtLnZhbHVlcy5sZW5ndGg7XG4gICAgfSxcbiAgICByZXZlcnNlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vIHJldmVyc2UgYnkgZGVmYXVsdCBtdXRhdGVzIGluIHBsYWNlIGJlZm9yZSByZXR1cm5pbmcgdGhlIHJlc3VsdFxuICAgICAgICAvLyB3aGljaCBtYWtlcyBpdCBib3RoIGEgJ2Rlcml2YXRpb24nIGFuZCBhICdtdXRhdGlvbicuXG4gICAgICAgIC8vIHNvIHdlIGRldmlhdGUgZnJvbSB0aGUgZGVmYXVsdCBhbmQganVzdCBtYWtlIGl0IGFuIGRlcnZpdGF0aW9uXG4gICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihcIlttb2J4XSBgb2JzZXJ2YWJsZUFycmF5LnJldmVyc2UoKWAgd2lsbCBub3QgdXBkYXRlIHRoZSBhcnJheSBpbiBwbGFjZS4gVXNlIGBvYnNlcnZhYmxlQXJyYXkuc2xpY2UoKS5yZXZlcnNlKClgIHRvIHN1cHJlc3MgdGhpcyB3YXJuaW5nIGFuZCBwZXJmb3JtIHRoZSBvcGVyYXRpb24gb24gYSBjb3B5LCBvciBgb2JzZXJ2YWJsZUFycmF5LnJlcGxhY2Uob2JzZXJ2YWJsZUFycmF5LnNsaWNlKCkucmV2ZXJzZSgpKWAgdG8gcmV2ZXJzZSAmIHVwZGF0ZSBpbiBwbGFjZVwiKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgY2xvbmUgPSB0aGlzLnNsaWNlKCk7XG4gICAgICAgIHJldHVybiBjbG9uZS5yZXZlcnNlLmFwcGx5KGNsb25lLCBhcmd1bWVudHMpO1xuICAgIH0sXG4gICAgc29ydDogZnVuY3Rpb24gKGNvbXBhcmVGbikge1xuICAgICAgICAvLyBzb3J0IGJ5IGRlZmF1bHQgbXV0YXRlcyBpbiBwbGFjZSBiZWZvcmUgcmV0dXJuaW5nIHRoZSByZXN1bHRcbiAgICAgICAgLy8gd2hpY2ggZ29lcyBhZ2FpbnN0IGFsbCBnb29kIHByYWN0aWNlcy4gTGV0J3Mgbm90IGNoYW5nZSB0aGUgYXJyYXkgaW4gcGxhY2UhXG4gICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihcIlttb2J4XSBgb2JzZXJ2YWJsZUFycmF5LnNvcnQoKWAgd2lsbCBub3QgdXBkYXRlIHRoZSBhcnJheSBpbiBwbGFjZS4gVXNlIGBvYnNlcnZhYmxlQXJyYXkuc2xpY2UoKS5zb3J0KClgIHRvIHN1cHJlc3MgdGhpcyB3YXJuaW5nIGFuZCBwZXJmb3JtIHRoZSBvcGVyYXRpb24gb24gYSBjb3B5LCBvciBgb2JzZXJ2YWJsZUFycmF5LnJlcGxhY2Uob2JzZXJ2YWJsZUFycmF5LnNsaWNlKCkuc29ydCgpKWAgdG8gc29ydCAmIHVwZGF0ZSBpbiBwbGFjZVwiKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgY2xvbmUgPSB0aGlzLnNsaWNlKCk7XG4gICAgICAgIHJldHVybiBjbG9uZS5zb3J0LmFwcGx5KGNsb25lLCBhcmd1bWVudHMpO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgdmFyIGFkbSA9IHRoaXNbJG1vYngkJDFdO1xuICAgICAgICB2YXIgaWR4ID0gYWRtLmRlaGFuY2VWYWx1ZXMoYWRtLnZhbHVlcykuaW5kZXhPZih2YWx1ZSk7XG4gICAgICAgIGlmIChpZHggPiAtMSkge1xuICAgICAgICAgICAgdGhpcy5zcGxpY2UoaWR4LCAxKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9LFxuICAgIGdldDogZnVuY3Rpb24gKGluZGV4KSB7XG4gICAgICAgIHZhciBhZG0gPSB0aGlzWyRtb2J4JCQxXTtcbiAgICAgICAgaWYgKGFkbSkge1xuICAgICAgICAgICAgaWYgKGluZGV4IDwgYWRtLnZhbHVlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBhZG0uYXRvbS5yZXBvcnRPYnNlcnZlZCgpO1xuICAgICAgICAgICAgICAgIHJldHVybiBhZG0uZGVoYW5jZVZhbHVlKGFkbS52YWx1ZXNbaW5kZXhdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnNvbGUud2FybihcIlttb2J4LmFycmF5XSBBdHRlbXB0IHRvIHJlYWQgYW4gYXJyYXkgaW5kZXggKFwiICsgaW5kZXggKyBcIikgdGhhdCBpcyBvdXQgb2YgYm91bmRzIChcIiArIGFkbS52YWx1ZXMubGVuZ3RoICsgXCIpLiBQbGVhc2UgY2hlY2sgbGVuZ3RoIGZpcnN0LiBPdXQgb2YgYm91bmQgaW5kaWNlcyB3aWxsIG5vdCBiZSB0cmFja2VkIGJ5IE1vYlhcIik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9LFxuICAgIHNldDogZnVuY3Rpb24gKGluZGV4LCBuZXdWYWx1ZSkge1xuICAgICAgICB2YXIgYWRtID0gdGhpc1skbW9ieCQkMV07XG4gICAgICAgIHZhciB2YWx1ZXMkJDEgPSBhZG0udmFsdWVzO1xuICAgICAgICBpZiAoaW5kZXggPCB2YWx1ZXMkJDEubGVuZ3RoKSB7XG4gICAgICAgICAgICAvLyB1cGRhdGUgYXQgaW5kZXggaW4gcmFuZ2VcbiAgICAgICAgICAgIGNoZWNrSWZTdGF0ZU1vZGlmaWNhdGlvbnNBcmVBbGxvd2VkJCQxKGFkbS5hdG9tKTtcbiAgICAgICAgICAgIHZhciBvbGRWYWx1ZSA9IHZhbHVlcyQkMVtpbmRleF07XG4gICAgICAgICAgICBpZiAoaGFzSW50ZXJjZXB0b3JzJCQxKGFkbSkpIHtcbiAgICAgICAgICAgICAgICB2YXIgY2hhbmdlID0gaW50ZXJjZXB0Q2hhbmdlJCQxKGFkbSwge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcInVwZGF0ZVwiLFxuICAgICAgICAgICAgICAgICAgICBvYmplY3Q6IHRoaXMsXG4gICAgICAgICAgICAgICAgICAgIGluZGV4OiBpbmRleCxcbiAgICAgICAgICAgICAgICAgICAgbmV3VmFsdWU6IG5ld1ZhbHVlXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgaWYgKCFjaGFuZ2UpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICBuZXdWYWx1ZSA9IGNoYW5nZS5uZXdWYWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG5ld1ZhbHVlID0gYWRtLmVuaGFuY2VyKG5ld1ZhbHVlLCBvbGRWYWx1ZSk7XG4gICAgICAgICAgICB2YXIgY2hhbmdlZCA9IG5ld1ZhbHVlICE9PSBvbGRWYWx1ZTtcbiAgICAgICAgICAgIGlmIChjaGFuZ2VkKSB7XG4gICAgICAgICAgICAgICAgdmFsdWVzJCQxW2luZGV4XSA9IG5ld1ZhbHVlO1xuICAgICAgICAgICAgICAgIGFkbS5ub3RpZnlBcnJheUNoaWxkVXBkYXRlKGluZGV4LCBuZXdWYWx1ZSwgb2xkVmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGluZGV4ID09PSB2YWx1ZXMkJDEubGVuZ3RoKSB7XG4gICAgICAgICAgICAvLyBhZGQgYSBuZXcgaXRlbVxuICAgICAgICAgICAgYWRtLnNwbGljZVdpdGhBcnJheShpbmRleCwgMCwgW25ld1ZhbHVlXSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyBvdXQgb2YgYm91bmRzXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJbbW9ieC5hcnJheV0gSW5kZXggb3V0IG9mIGJvdW5kcywgXCIgKyBpbmRleCArIFwiIGlzIGxhcmdlciB0aGFuIFwiICsgdmFsdWVzJCQxLmxlbmd0aCk7XG4gICAgICAgIH1cbiAgICB9XG59O1xuW1xuICAgIFwiY29uY2F0XCIsXG4gICAgXCJldmVyeVwiLFxuICAgIFwiZmlsdGVyXCIsXG4gICAgXCJmb3JFYWNoXCIsXG4gICAgXCJpbmRleE9mXCIsXG4gICAgXCJqb2luXCIsXG4gICAgXCJsYXN0SW5kZXhPZlwiLFxuICAgIFwibWFwXCIsXG4gICAgXCJyZWR1Y2VcIixcbiAgICBcInJlZHVjZVJpZ2h0XCIsXG4gICAgXCJzbGljZVwiLFxuICAgIFwic29tZVwiLFxuICAgIFwidG9TdHJpbmdcIixcbiAgICBcInRvTG9jYWxlU3RyaW5nXCJcbl0uZm9yRWFjaChmdW5jdGlvbiAoZnVuY05hbWUpIHtcbiAgICBhcnJheUV4dGVuc2lvbnNbZnVuY05hbWVdID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgYWRtID0gdGhpc1skbW9ieCQkMV07XG4gICAgICAgIGFkbS5hdG9tLnJlcG9ydE9ic2VydmVkKCk7XG4gICAgICAgIHZhciByZXMgPSBhZG0uZGVoYW5jZVZhbHVlcyhhZG0udmFsdWVzKTtcbiAgICAgICAgcmV0dXJuIHJlc1tmdW5jTmFtZV0uYXBwbHkocmVzLCBhcmd1bWVudHMpO1xuICAgIH07XG59KTtcbnZhciBpc09ic2VydmFibGVBcnJheUFkbWluaXN0cmF0aW9uID0gY3JlYXRlSW5zdGFuY2VvZlByZWRpY2F0ZSQkMShcIk9ic2VydmFibGVBcnJheUFkbWluaXN0cmF0aW9uXCIsIE9ic2VydmFibGVBcnJheUFkbWluaXN0cmF0aW9uKTtcbmZ1bmN0aW9uIGlzT2JzZXJ2YWJsZUFycmF5JCQxKHRoaW5nKSB7XG4gICAgcmV0dXJuIGlzT2JqZWN0JCQxKHRoaW5nKSAmJiBpc09ic2VydmFibGVBcnJheUFkbWluaXN0cmF0aW9uKHRoaW5nWyRtb2J4JCQxXSk7XG59XG5cbnZhciBfYTtcbnZhciBPYnNlcnZhYmxlTWFwTWFya2VyID0ge307XG4vLyBqdXN0IGV4dGVuZCBNYXA/IFNlZSBhbHNvIGh0dHBzOi8vZ2lzdC5naXRodWIuY29tL25lc3RoYXJ1cy8xM2I0ZDc0ZjJlZjRhMmY0MzU3ZGJkM2ZjMjNjMWU1NFxuLy8gQnV0OiBodHRwczovL2dpdGh1Yi5jb20vbW9ieGpzL21vYngvaXNzdWVzLzE1NTZcbnZhciBPYnNlcnZhYmxlTWFwJCQxID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE9ic2VydmFibGVNYXAkJDEoaW5pdGlhbERhdGEsIGVuaGFuY2VyLCBuYW1lKSB7XG4gICAgICAgIGlmIChlbmhhbmNlciA9PT0gdm9pZCAwKSB7IGVuaGFuY2VyID0gZGVlcEVuaGFuY2VyJCQxOyB9XG4gICAgICAgIGlmIChuYW1lID09PSB2b2lkIDApIHsgbmFtZSA9IFwiT2JzZXJ2YWJsZU1hcEBcIiArIGdldE5leHRJZCQkMSgpOyB9XG4gICAgICAgIHRoaXMuZW5oYW5jZXIgPSBlbmhhbmNlcjtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgdGhpc1tfYV0gPSBPYnNlcnZhYmxlTWFwTWFya2VyO1xuICAgICAgICB0aGlzLl9rZXlzQXRvbSA9IGNyZWF0ZUF0b20kJDEodGhpcy5uYW1lICsgXCIua2V5cygpXCIpO1xuICAgICAgICB0aGlzW1N5bWJvbC50b1N0cmluZ1RhZ10gPSBcIk1hcFwiO1xuICAgICAgICBpZiAodHlwZW9mIE1hcCAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJtb2J4Lm1hcCByZXF1aXJlcyBNYXAgcG9seWZpbGwgZm9yIHRoZSBjdXJyZW50IGJyb3dzZXIuIENoZWNrIGJhYmVsLXBvbHlmaWxsIG9yIGNvcmUtanMvZXM2L21hcC5qc1wiKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9kYXRhID0gbmV3IE1hcCgpO1xuICAgICAgICB0aGlzLl9oYXNNYXAgPSBuZXcgTWFwKCk7XG4gICAgICAgIHRoaXMubWVyZ2UoaW5pdGlhbERhdGEpO1xuICAgIH1cbiAgICBPYnNlcnZhYmxlTWFwJCQxLnByb3RvdHlwZS5faGFzID0gZnVuY3Rpb24gKGtleSkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGF0YS5oYXMoa2V5KTtcbiAgICB9O1xuICAgIE9ic2VydmFibGVNYXAkJDEucHJvdG90eXBlLmhhcyA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgaWYgKHRoaXMuX2hhc01hcC5oYXMoa2V5KSlcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9oYXNNYXAuZ2V0KGtleSkuZ2V0KCk7XG4gICAgICAgIHJldHVybiB0aGlzLl91cGRhdGVIYXNNYXBFbnRyeShrZXksIGZhbHNlKS5nZXQoKTtcbiAgICB9O1xuICAgIE9ic2VydmFibGVNYXAkJDEucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG4gICAgICAgIHZhciBoYXNLZXkgPSB0aGlzLl9oYXMoa2V5KTtcbiAgICAgICAgaWYgKGhhc0ludGVyY2VwdG9ycyQkMSh0aGlzKSkge1xuICAgICAgICAgICAgdmFyIGNoYW5nZSA9IGludGVyY2VwdENoYW5nZSQkMSh0aGlzLCB7XG4gICAgICAgICAgICAgICAgdHlwZTogaGFzS2V5ID8gXCJ1cGRhdGVcIiA6IFwiYWRkXCIsXG4gICAgICAgICAgICAgICAgb2JqZWN0OiB0aGlzLFxuICAgICAgICAgICAgICAgIG5ld1ZhbHVlOiB2YWx1ZSxcbiAgICAgICAgICAgICAgICBuYW1lOiBrZXlcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKCFjaGFuZ2UpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB2YWx1ZSA9IGNoYW5nZS5uZXdWYWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaGFzS2V5KSB7XG4gICAgICAgICAgICB0aGlzLl91cGRhdGVWYWx1ZShrZXksIHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2FkZFZhbHVlKGtleSwgdmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgT2JzZXJ2YWJsZU1hcCQkMS5wcm90b3R5cGUuZGVsZXRlID0gZnVuY3Rpb24gKGtleSkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICBpZiAoaGFzSW50ZXJjZXB0b3JzJCQxKHRoaXMpKSB7XG4gICAgICAgICAgICB2YXIgY2hhbmdlID0gaW50ZXJjZXB0Q2hhbmdlJCQxKHRoaXMsIHtcbiAgICAgICAgICAgICAgICB0eXBlOiBcImRlbGV0ZVwiLFxuICAgICAgICAgICAgICAgIG9iamVjdDogdGhpcyxcbiAgICAgICAgICAgICAgICBuYW1lOiBrZXlcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKCFjaGFuZ2UpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9oYXMoa2V5KSkge1xuICAgICAgICAgICAgdmFyIG5vdGlmeVNweSA9IGlzU3B5RW5hYmxlZCQkMSgpO1xuICAgICAgICAgICAgdmFyIG5vdGlmeSA9IGhhc0xpc3RlbmVycyQkMSh0aGlzKTtcbiAgICAgICAgICAgIHZhciBjaGFuZ2UgPSBub3RpZnkgfHwgbm90aWZ5U3B5XG4gICAgICAgICAgICAgICAgPyB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiZGVsZXRlXCIsXG4gICAgICAgICAgICAgICAgICAgIG9iamVjdDogdGhpcyxcbiAgICAgICAgICAgICAgICAgICAgb2xkVmFsdWU6IHRoaXMuX2RhdGEuZ2V0KGtleSkudmFsdWUsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IGtleVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICA6IG51bGw7XG4gICAgICAgICAgICBpZiAobm90aWZ5U3B5ICYmIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIilcbiAgICAgICAgICAgICAgICBzcHlSZXBvcnRTdGFydCQkMShfX2Fzc2lnbih7fSwgY2hhbmdlLCB7IG5hbWU6IHRoaXMubmFtZSwga2V5OiBrZXkgfSkpO1xuICAgICAgICAgICAgdHJhbnNhY3Rpb24kJDEoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIF90aGlzLl9rZXlzQXRvbS5yZXBvcnRDaGFuZ2VkKCk7XG4gICAgICAgICAgICAgICAgX3RoaXMuX3VwZGF0ZUhhc01hcEVudHJ5KGtleSwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIHZhciBvYnNlcnZhYmxlJCQxID0gX3RoaXMuX2RhdGEuZ2V0KGtleSk7XG4gICAgICAgICAgICAgICAgb2JzZXJ2YWJsZSQkMS5zZXROZXdWYWx1ZSh1bmRlZmluZWQpO1xuICAgICAgICAgICAgICAgIF90aGlzLl9kYXRhLmRlbGV0ZShrZXkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAobm90aWZ5KVxuICAgICAgICAgICAgICAgIG5vdGlmeUxpc3RlbmVycyQkMSh0aGlzLCBjaGFuZ2UpO1xuICAgICAgICAgICAgaWYgKG5vdGlmeVNweSAmJiBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpXG4gICAgICAgICAgICAgICAgc3B5UmVwb3J0RW5kJCQxKCk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcbiAgICBPYnNlcnZhYmxlTWFwJCQxLnByb3RvdHlwZS5fdXBkYXRlSGFzTWFwRW50cnkgPSBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuICAgICAgICAvLyBvcHRpbWl6YXRpb247IGRvbid0IGZpbGwgdGhlIGhhc01hcCBpZiB3ZSBhcmUgbm90IG9ic2VydmluZywgb3IgcmVtb3ZlIGVudHJ5IGlmIHRoZXJlIGFyZSBubyBvYnNlcnZlcnMgYW55bW9yZVxuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLl9oYXNNYXAuZ2V0KGtleSk7XG4gICAgICAgIGlmIChlbnRyeSkge1xuICAgICAgICAgICAgZW50cnkuc2V0TmV3VmFsdWUodmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZW50cnkgPSBuZXcgT2JzZXJ2YWJsZVZhbHVlJCQxKHZhbHVlLCByZWZlcmVuY2VFbmhhbmNlciQkMSwgdGhpcy5uYW1lICsgXCIuXCIgKyBrZXkgKyBcIj9cIiwgZmFsc2UpO1xuICAgICAgICAgICAgdGhpcy5faGFzTWFwLnNldChrZXksIGVudHJ5KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZW50cnk7XG4gICAgfTtcbiAgICBPYnNlcnZhYmxlTWFwJCQxLnByb3RvdHlwZS5fdXBkYXRlVmFsdWUgPSBmdW5jdGlvbiAoa2V5LCBuZXdWYWx1ZSkge1xuICAgICAgICB2YXIgb2JzZXJ2YWJsZSQkMSA9IHRoaXMuX2RhdGEuZ2V0KGtleSk7XG4gICAgICAgIG5ld1ZhbHVlID0gb2JzZXJ2YWJsZSQkMS5wcmVwYXJlTmV3VmFsdWUobmV3VmFsdWUpO1xuICAgICAgICBpZiAobmV3VmFsdWUgIT09IGdsb2JhbFN0YXRlJCQxLlVOQ0hBTkdFRCkge1xuICAgICAgICAgICAgdmFyIG5vdGlmeVNweSA9IGlzU3B5RW5hYmxlZCQkMSgpO1xuICAgICAgICAgICAgdmFyIG5vdGlmeSA9IGhhc0xpc3RlbmVycyQkMSh0aGlzKTtcbiAgICAgICAgICAgIHZhciBjaGFuZ2UgPSBub3RpZnkgfHwgbm90aWZ5U3B5XG4gICAgICAgICAgICAgICAgPyB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwidXBkYXRlXCIsXG4gICAgICAgICAgICAgICAgICAgIG9iamVjdDogdGhpcyxcbiAgICAgICAgICAgICAgICAgICAgb2xkVmFsdWU6IG9ic2VydmFibGUkJDEudmFsdWUsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IGtleSxcbiAgICAgICAgICAgICAgICAgICAgbmV3VmFsdWU6IG5ld1ZhbHVlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIDogbnVsbDtcbiAgICAgICAgICAgIGlmIChub3RpZnlTcHkgJiYgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKVxuICAgICAgICAgICAgICAgIHNweVJlcG9ydFN0YXJ0JCQxKF9fYXNzaWduKHt9LCBjaGFuZ2UsIHsgbmFtZTogdGhpcy5uYW1lLCBrZXk6IGtleSB9KSk7XG4gICAgICAgICAgICBvYnNlcnZhYmxlJCQxLnNldE5ld1ZhbHVlKG5ld1ZhbHVlKTtcbiAgICAgICAgICAgIGlmIChub3RpZnkpXG4gICAgICAgICAgICAgICAgbm90aWZ5TGlzdGVuZXJzJCQxKHRoaXMsIGNoYW5nZSk7XG4gICAgICAgICAgICBpZiAobm90aWZ5U3B5ICYmIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIilcbiAgICAgICAgICAgICAgICBzcHlSZXBvcnRFbmQkJDEoKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgT2JzZXJ2YWJsZU1hcCQkMS5wcm90b3R5cGUuX2FkZFZhbHVlID0gZnVuY3Rpb24gKGtleSwgbmV3VmFsdWUpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgY2hlY2tJZlN0YXRlTW9kaWZpY2F0aW9uc0FyZUFsbG93ZWQkJDEodGhpcy5fa2V5c0F0b20pO1xuICAgICAgICB0cmFuc2FjdGlvbiQkMShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgb2JzZXJ2YWJsZSQkMSA9IG5ldyBPYnNlcnZhYmxlVmFsdWUkJDEobmV3VmFsdWUsIF90aGlzLmVuaGFuY2VyLCBfdGhpcy5uYW1lICsgXCIuXCIgKyBrZXksIGZhbHNlKTtcbiAgICAgICAgICAgIF90aGlzLl9kYXRhLnNldChrZXksIG9ic2VydmFibGUkJDEpO1xuICAgICAgICAgICAgbmV3VmFsdWUgPSBvYnNlcnZhYmxlJCQxLnZhbHVlOyAvLyB2YWx1ZSBtaWdodCBoYXZlIGJlZW4gY2hhbmdlZFxuICAgICAgICAgICAgX3RoaXMuX3VwZGF0ZUhhc01hcEVudHJ5KGtleSwgdHJ1ZSk7XG4gICAgICAgICAgICBfdGhpcy5fa2V5c0F0b20ucmVwb3J0Q2hhbmdlZCgpO1xuICAgICAgICB9KTtcbiAgICAgICAgdmFyIG5vdGlmeVNweSA9IGlzU3B5RW5hYmxlZCQkMSgpO1xuICAgICAgICB2YXIgbm90aWZ5ID0gaGFzTGlzdGVuZXJzJCQxKHRoaXMpO1xuICAgICAgICB2YXIgY2hhbmdlID0gbm90aWZ5IHx8IG5vdGlmeVNweVxuICAgICAgICAgICAgPyB7XG4gICAgICAgICAgICAgICAgdHlwZTogXCJhZGRcIixcbiAgICAgICAgICAgICAgICBvYmplY3Q6IHRoaXMsXG4gICAgICAgICAgICAgICAgbmFtZToga2V5LFxuICAgICAgICAgICAgICAgIG5ld1ZhbHVlOiBuZXdWYWx1ZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgOiBudWxsO1xuICAgICAgICBpZiAobm90aWZ5U3B5ICYmIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIilcbiAgICAgICAgICAgIHNweVJlcG9ydFN0YXJ0JCQxKF9fYXNzaWduKHt9LCBjaGFuZ2UsIHsgbmFtZTogdGhpcy5uYW1lLCBrZXk6IGtleSB9KSk7XG4gICAgICAgIGlmIChub3RpZnkpXG4gICAgICAgICAgICBub3RpZnlMaXN0ZW5lcnMkJDEodGhpcywgY2hhbmdlKTtcbiAgICAgICAgaWYgKG5vdGlmeVNweSAmJiBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpXG4gICAgICAgICAgICBzcHlSZXBvcnRFbmQkJDEoKTtcbiAgICB9O1xuICAgIE9ic2VydmFibGVNYXAkJDEucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgaWYgKHRoaXMuaGFzKGtleSkpXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kZWhhbmNlVmFsdWUodGhpcy5fZGF0YS5nZXQoa2V5KS5nZXQoKSk7XG4gICAgICAgIHJldHVybiB0aGlzLmRlaGFuY2VWYWx1ZSh1bmRlZmluZWQpO1xuICAgIH07XG4gICAgT2JzZXJ2YWJsZU1hcCQkMS5wcm90b3R5cGUuZGVoYW5jZVZhbHVlID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIGlmICh0aGlzLmRlaGFuY2VyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRlaGFuY2VyKHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfTtcbiAgICBPYnNlcnZhYmxlTWFwJCQxLnByb3RvdHlwZS5rZXlzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl9rZXlzQXRvbS5yZXBvcnRPYnNlcnZlZCgpO1xuICAgICAgICByZXR1cm4gdGhpcy5fZGF0YS5rZXlzKCk7XG4gICAgfTtcbiAgICBPYnNlcnZhYmxlTWFwJCQxLnByb3RvdHlwZS52YWx1ZXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdmFyIG5leHRJbmRleCA9IDA7XG4gICAgICAgIHZhciBrZXlzJCQxID0gQXJyYXkuZnJvbSh0aGlzLmtleXMoKSk7XG4gICAgICAgIHJldHVybiBtYWtlSXRlcmFibGUoe1xuICAgICAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXh0SW5kZXggPCBrZXlzJCQxLmxlbmd0aFxuICAgICAgICAgICAgICAgICAgICA/IHsgdmFsdWU6IHNlbGYuZ2V0KGtleXMkJDFbbmV4dEluZGV4KytdKSwgZG9uZTogZmFsc2UgfVxuICAgICAgICAgICAgICAgICAgICA6IHsgZG9uZTogdHJ1ZSB9O1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuICAgIE9ic2VydmFibGVNYXAkJDEucHJvdG90eXBlLmVudHJpZXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdmFyIG5leHRJbmRleCA9IDA7XG4gICAgICAgIHZhciBrZXlzJCQxID0gQXJyYXkuZnJvbSh0aGlzLmtleXMoKSk7XG4gICAgICAgIHJldHVybiBtYWtlSXRlcmFibGUoe1xuICAgICAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmIChuZXh0SW5kZXggPCBrZXlzJCQxLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIga2V5ID0ga2V5cyQkMVtuZXh0SW5kZXgrK107XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogW2tleSwgc2VsZi5nZXQoa2V5KV0sXG4gICAgICAgICAgICAgICAgICAgICAgICBkb25lOiBmYWxzZVxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4geyBkb25lOiB0cnVlIH07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgT2JzZXJ2YWJsZU1hcCQkMS5wcm90b3R5cGVbKF9hID0gJG1vYngkJDEsIFN5bWJvbC5pdGVyYXRvcildID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5lbnRyaWVzKCk7XG4gICAgfTtcbiAgICBPYnNlcnZhYmxlTWFwJCQxLnByb3RvdHlwZS5mb3JFYWNoID0gZnVuY3Rpb24gKGNhbGxiYWNrLCB0aGlzQXJnKSB7XG4gICAgICAgIHZhciBlXzEsIF9hO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgZm9yICh2YXIgX2IgPSBfX3ZhbHVlcyh0aGlzKSwgX2MgPSBfYi5uZXh0KCk7ICFfYy5kb25lOyBfYyA9IF9iLm5leHQoKSkge1xuICAgICAgICAgICAgICAgIHZhciBfZCA9IF9fcmVhZChfYy52YWx1ZSwgMiksIGtleSA9IF9kWzBdLCB2YWx1ZSA9IF9kWzFdO1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrLmNhbGwodGhpc0FyZywgdmFsdWUsIGtleSwgdGhpcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVfMV8xKSB7IGVfMSA9IHsgZXJyb3I6IGVfMV8xIH07IH1cbiAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGlmIChfYyAmJiAhX2MuZG9uZSAmJiAoX2EgPSBfYi5yZXR1cm4pKSBfYS5jYWxsKF9iKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZpbmFsbHkgeyBpZiAoZV8xKSB0aHJvdyBlXzEuZXJyb3I7IH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgLyoqIE1lcmdlIGFub3RoZXIgb2JqZWN0IGludG8gdGhpcyBvYmplY3QsIHJldHVybnMgdGhpcy4gKi9cbiAgICBPYnNlcnZhYmxlTWFwJCQxLnByb3RvdHlwZS5tZXJnZSA9IGZ1bmN0aW9uIChvdGhlcikge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICBpZiAoaXNPYnNlcnZhYmxlTWFwJCQxKG90aGVyKSkge1xuICAgICAgICAgICAgb3RoZXIgPSBvdGhlci50b0pTKCk7XG4gICAgICAgIH1cbiAgICAgICAgdHJhbnNhY3Rpb24kJDEoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKGlzUGxhaW5PYmplY3QkJDEob3RoZXIpKVxuICAgICAgICAgICAgICAgIE9iamVjdC5rZXlzKG90aGVyKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHsgcmV0dXJuIF90aGlzLnNldChrZXksIG90aGVyW2tleV0pOyB9KTtcbiAgICAgICAgICAgIGVsc2UgaWYgKEFycmF5LmlzQXJyYXkob3RoZXIpKVxuICAgICAgICAgICAgICAgIG90aGVyLmZvckVhY2goZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBfYiA9IF9fcmVhZChfYSwgMiksIGtleSA9IF9iWzBdLCB2YWx1ZSA9IF9iWzFdO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3RoaXMuc2V0KGtleSwgdmFsdWUpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZWxzZSBpZiAoaXNFUzZNYXAkJDEob3RoZXIpKSB7XG4gICAgICAgICAgICAgICAgaWYgKG90aGVyLmNvbnN0cnVjdG9yICE9PSBNYXApXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWlsJCQxKFwiQ2Fubm90IGluaXRpYWxpemUgZnJvbSBjbGFzc2VzIHRoYXQgaW5oZXJpdCBmcm9tIE1hcDogXCIgKyBvdGhlci5jb25zdHJ1Y3Rvci5uYW1lKTsgLy8gcHJldHRpZXItaWdub3JlXG4gICAgICAgICAgICAgICAgb3RoZXIuZm9yRWFjaChmdW5jdGlvbiAodmFsdWUsIGtleSkgeyByZXR1cm4gX3RoaXMuc2V0KGtleSwgdmFsdWUpOyB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKG90aGVyICE9PSBudWxsICYmIG90aGVyICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICAgICAgZmFpbCQkMShcIkNhbm5vdCBpbml0aWFsaXplIG1hcCBmcm9tIFwiICsgb3RoZXIpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBPYnNlcnZhYmxlTWFwJCQxLnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdHJhbnNhY3Rpb24kJDEoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdW50cmFja2VkJCQxKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgZV8yLCBfYTtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBfYiA9IF9fdmFsdWVzKF90aGlzLmtleXMoKSksIF9jID0gX2IubmV4dCgpOyAhX2MuZG9uZTsgX2MgPSBfYi5uZXh0KCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBrZXkgPSBfYy52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLmRlbGV0ZShrZXkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhdGNoIChlXzJfMSkgeyBlXzIgPSB7IGVycm9yOiBlXzJfMSB9OyB9XG4gICAgICAgICAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoX2MgJiYgIV9jLmRvbmUgJiYgKF9hID0gX2IucmV0dXJuKSkgX2EuY2FsbChfYik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZmluYWxseSB7IGlmIChlXzIpIHRocm93IGVfMi5lcnJvcjsgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIE9ic2VydmFibGVNYXAkJDEucHJvdG90eXBlLnJlcGxhY2UgPSBmdW5jdGlvbiAodmFsdWVzJCQxKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHRyYW5zYWN0aW9uJCQxKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIC8vIGdyYWIgYWxsIHRoZSBrZXlzIHRoYXQgYXJlIHByZXNlbnQgaW4gdGhlIG5ldyBtYXAgYnV0IG5vdCBwcmVzZW50IGluIHRoZSBjdXJyZW50IG1hcFxuICAgICAgICAgICAgLy8gYW5kIGRlbGV0ZSB0aGVtIGZyb20gdGhlIG1hcCwgdGhlbiBtZXJnZSB0aGUgbmV3IG1hcFxuICAgICAgICAgICAgLy8gdGhpcyB3aWxsIGNhdXNlIHJlYWN0aW9ucyBvbmx5IG9uIGNoYW5nZWQgdmFsdWVzXG4gICAgICAgICAgICB2YXIgbmV3S2V5cyA9IGdldE1hcExpa2VLZXlzJCQxKHZhbHVlcyQkMSk7XG4gICAgICAgICAgICB2YXIgb2xkS2V5cyA9IEFycmF5LmZyb20oX3RoaXMua2V5cygpKTtcbiAgICAgICAgICAgIHZhciBtaXNzaW5nS2V5cyA9IG9sZEtleXMuZmlsdGVyKGZ1bmN0aW9uIChrKSB7IHJldHVybiBuZXdLZXlzLmluZGV4T2YoaykgPT09IC0xOyB9KTtcbiAgICAgICAgICAgIG1pc3NpbmdLZXlzLmZvckVhY2goZnVuY3Rpb24gKGspIHsgcmV0dXJuIF90aGlzLmRlbGV0ZShrKTsgfSk7XG4gICAgICAgICAgICBfdGhpcy5tZXJnZSh2YWx1ZXMkJDEpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoT2JzZXJ2YWJsZU1hcCQkMS5wcm90b3R5cGUsIFwic2l6ZVwiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5fa2V5c0F0b20ucmVwb3J0T2JzZXJ2ZWQoKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9kYXRhLnNpemU7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBwbGFpbiBvYmplY3QgdGhhdCByZXByZXNlbnRzIHRoaXMgbWFwLlxuICAgICAqIE5vdGUgdGhhdCBhbGwgdGhlIGtleXMgYmVpbmcgc3RyaW5naWZpZWQuXG4gICAgICogSWYgdGhlcmUgYXJlIGR1cGxpY2F0aW5nIGtleXMgYWZ0ZXIgY29udmVydGluZyB0aGVtIHRvIHN0cmluZ3MsIGJlaGF2aW91ciBpcyB1bmRldGVybWluZWQuXG4gICAgICovXG4gICAgT2JzZXJ2YWJsZU1hcCQkMS5wcm90b3R5cGUudG9QT0pPID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZV8zLCBfYTtcbiAgICAgICAgdmFyIHJlcyA9IHt9O1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgZm9yICh2YXIgX2IgPSBfX3ZhbHVlcyh0aGlzKSwgX2MgPSBfYi5uZXh0KCk7ICFfYy5kb25lOyBfYyA9IF9iLm5leHQoKSkge1xuICAgICAgICAgICAgICAgIHZhciBfZCA9IF9fcmVhZChfYy52YWx1ZSwgMiksIGtleSA9IF9kWzBdLCB2YWx1ZSA9IF9kWzFdO1xuICAgICAgICAgICAgICAgIHJlc1tcIlwiICsga2V5XSA9IHZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlXzNfMSkgeyBlXzMgPSB7IGVycm9yOiBlXzNfMSB9OyB9XG4gICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBpZiAoX2MgJiYgIV9jLmRvbmUgJiYgKF9hID0gX2IucmV0dXJuKSkgX2EuY2FsbChfYik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmaW5hbGx5IHsgaWYgKGVfMykgdGhyb3cgZV8zLmVycm9yOyB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlcztcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBzaGFsbG93IG5vbiBvYnNlcnZhYmxlIG9iamVjdCBjbG9uZSBvZiB0aGlzIG1hcC5cbiAgICAgKiBOb3RlIHRoYXQgdGhlIHZhbHVlcyBtaWd0aCBzdGlsbCBiZSBvYnNlcnZhYmxlLiBGb3IgYSBkZWVwIGNsb25lIHVzZSBtb2J4LnRvSlMuXG4gICAgICovXG4gICAgT2JzZXJ2YWJsZU1hcCQkMS5wcm90b3R5cGUudG9KUyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBNYXAodGhpcyk7XG4gICAgfTtcbiAgICBPYnNlcnZhYmxlTWFwJCQxLnByb3RvdHlwZS50b0pTT04gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vIFVzZWQgYnkgSlNPTi5zdHJpbmdpZnlcbiAgICAgICAgcmV0dXJuIHRoaXMudG9QT0pPKCk7XG4gICAgfTtcbiAgICBPYnNlcnZhYmxlTWFwJCQxLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgcmV0dXJuICh0aGlzLm5hbWUgK1xuICAgICAgICAgICAgXCJbeyBcIiArXG4gICAgICAgICAgICBBcnJheS5mcm9tKHRoaXMua2V5cygpKVxuICAgICAgICAgICAgICAgIC5tYXAoZnVuY3Rpb24gKGtleSkgeyByZXR1cm4ga2V5ICsgXCI6IFwiICsgKFwiXCIgKyBfdGhpcy5nZXQoa2V5KSk7IH0pXG4gICAgICAgICAgICAgICAgLmpvaW4oXCIsIFwiKSArXG4gICAgICAgICAgICBcIiB9XVwiKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIE9ic2VydmVzIHRoaXMgb2JqZWN0LiBUcmlnZ2VycyBmb3IgdGhlIGV2ZW50cyAnYWRkJywgJ3VwZGF0ZScgYW5kICdkZWxldGUnLlxuICAgICAqIFNlZTogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvT2JqZWN0L29ic2VydmVcbiAgICAgKiBmb3IgY2FsbGJhY2sgZGV0YWlsc1xuICAgICAqL1xuICAgIE9ic2VydmFibGVNYXAkJDEucHJvdG90eXBlLm9ic2VydmUgPSBmdW5jdGlvbiAobGlzdGVuZXIsIGZpcmVJbW1lZGlhdGVseSkge1xuICAgICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgJiZcbiAgICAgICAgICAgIGludmFyaWFudCQkMShmaXJlSW1tZWRpYXRlbHkgIT09IHRydWUsIFwiYG9ic2VydmVgIGRvZXNuJ3Qgc3VwcG9ydCBmaXJlSW1tZWRpYXRlbHk9dHJ1ZSBpbiBjb21iaW5hdGlvbiB3aXRoIG1hcHMuXCIpO1xuICAgICAgICByZXR1cm4gcmVnaXN0ZXJMaXN0ZW5lciQkMSh0aGlzLCBsaXN0ZW5lcik7XG4gICAgfTtcbiAgICBPYnNlcnZhYmxlTWFwJCQxLnByb3RvdHlwZS5pbnRlcmNlcHQgPSBmdW5jdGlvbiAoaGFuZGxlcikge1xuICAgICAgICByZXR1cm4gcmVnaXN0ZXJJbnRlcmNlcHRvciQkMSh0aGlzLCBoYW5kbGVyKTtcbiAgICB9O1xuICAgIHJldHVybiBPYnNlcnZhYmxlTWFwJCQxO1xufSgpKTtcbi8qICd2YXInIGZpeGVzIHNtYWxsLWJ1aWxkIGlzc3VlICovXG52YXIgaXNPYnNlcnZhYmxlTWFwJCQxID0gY3JlYXRlSW5zdGFuY2VvZlByZWRpY2F0ZSQkMShcIk9ic2VydmFibGVNYXBcIiwgT2JzZXJ2YWJsZU1hcCQkMSk7XG5cbnZhciBfYSQxO1xudmFyIE9ic2VydmFibGVTZXRNYXJrZXIgPSB7fTtcbnZhciBPYnNlcnZhYmxlU2V0JCQxID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE9ic2VydmFibGVTZXQkJDEoaW5pdGlhbERhdGEsIGVuaGFuY2VyLCBuYW1lKSB7XG4gICAgICAgIGlmIChlbmhhbmNlciA9PT0gdm9pZCAwKSB7IGVuaGFuY2VyID0gZGVlcEVuaGFuY2VyJCQxOyB9XG4gICAgICAgIGlmIChuYW1lID09PSB2b2lkIDApIHsgbmFtZSA9IFwiT2JzZXJ2YWJsZVNldEBcIiArIGdldE5leHRJZCQkMSgpOyB9XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXNbX2EkMV0gPSBPYnNlcnZhYmxlU2V0TWFya2VyO1xuICAgICAgICB0aGlzLl9kYXRhID0gbmV3IFNldCgpO1xuICAgICAgICB0aGlzLl9hdG9tID0gY3JlYXRlQXRvbSQkMSh0aGlzLm5hbWUpO1xuICAgICAgICB0aGlzW1N5bWJvbC50b1N0cmluZ1RhZ10gPSBcIlNldFwiO1xuICAgICAgICBpZiAodHlwZW9mIFNldCAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJtb2J4LnNldCByZXF1aXJlcyBTZXQgcG9seWZpbGwgZm9yIHRoZSBjdXJyZW50IGJyb3dzZXIuIENoZWNrIGJhYmVsLXBvbHlmaWxsIG9yIGNvcmUtanMvZXM2L3NldC5qc1wiKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmVuaGFuY2VyID0gZnVuY3Rpb24gKG5ld1YsIG9sZFYpIHsgcmV0dXJuIGVuaGFuY2VyKG5ld1YsIG9sZFYsIG5hbWUpOyB9O1xuICAgICAgICBpZiAoaW5pdGlhbERhdGEpIHtcbiAgICAgICAgICAgIHRoaXMucmVwbGFjZShpbml0aWFsRGF0YSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgT2JzZXJ2YWJsZVNldCQkMS5wcm90b3R5cGUuZGVoYW5jZVZhbHVlID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIGlmICh0aGlzLmRlaGFuY2VyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRlaGFuY2VyKHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfTtcbiAgICBPYnNlcnZhYmxlU2V0JCQxLnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdHJhbnNhY3Rpb24kJDEoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdW50cmFja2VkJCQxKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgZV8xLCBfYTtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBfYiA9IF9fdmFsdWVzKF90aGlzLl9kYXRhLnZhbHVlcygpKSwgX2MgPSBfYi5uZXh0KCk7ICFfYy5kb25lOyBfYyA9IF9iLm5leHQoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gX2MudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5kZWxldGUodmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhdGNoIChlXzFfMSkgeyBlXzEgPSB7IGVycm9yOiBlXzFfMSB9OyB9XG4gICAgICAgICAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoX2MgJiYgIV9jLmRvbmUgJiYgKF9hID0gX2IucmV0dXJuKSkgX2EuY2FsbChfYik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZmluYWxseSB7IGlmIChlXzEpIHRocm93IGVfMS5lcnJvcjsgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIE9ic2VydmFibGVTZXQkJDEucHJvdG90eXBlLmZvckVhY2ggPSBmdW5jdGlvbiAoY2FsbGJhY2tGbiwgdGhpc0FyZykge1xuICAgICAgICB2YXIgZV8yLCBfYTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGZvciAodmFyIF9iID0gX192YWx1ZXModGhpcyksIF9jID0gX2IubmV4dCgpOyAhX2MuZG9uZTsgX2MgPSBfYi5uZXh0KCkpIHtcbiAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSBfYy52YWx1ZTtcbiAgICAgICAgICAgICAgICBjYWxsYmFja0ZuLmNhbGwodGhpc0FyZywgdmFsdWUsIHZhbHVlLCB0aGlzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZV8yXzEpIHsgZV8yID0geyBlcnJvcjogZV8yXzEgfTsgfVxuICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgaWYgKF9jICYmICFfYy5kb25lICYmIChfYSA9IF9iLnJldHVybikpIF9hLmNhbGwoX2IpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZmluYWxseSB7IGlmIChlXzIpIHRocm93IGVfMi5lcnJvcjsgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoT2JzZXJ2YWJsZVNldCQkMS5wcm90b3R5cGUsIFwic2l6ZVwiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5fYXRvbS5yZXBvcnRPYnNlcnZlZCgpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGEuc2l6ZTtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JzZXJ2YWJsZVNldCQkMS5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIGNoZWNrSWZTdGF0ZU1vZGlmaWNhdGlvbnNBcmVBbGxvd2VkJCQxKHRoaXMuX2F0b20pO1xuICAgICAgICBpZiAoaGFzSW50ZXJjZXB0b3JzJCQxKHRoaXMpKSB7XG4gICAgICAgICAgICB2YXIgY2hhbmdlID0gaW50ZXJjZXB0Q2hhbmdlJCQxKHRoaXMsIHtcbiAgICAgICAgICAgICAgICB0eXBlOiBcImFkZFwiLFxuICAgICAgICAgICAgICAgIG9iamVjdDogdGhpcyxcbiAgICAgICAgICAgICAgICBuZXdWYWx1ZTogdmFsdWVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKCFjaGFuZ2UpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICAvLyBUT0RPOiBpZGVhbGx5LCB2YWx1ZSA9IGNoYW5nZS52YWx1ZSB3b3VsZCBiZSBkb25lIGhlcmUsIHNvIHRoYXQgdmFsdWVzIGNhbiBiZVxuICAgICAgICAgICAgLy8gY2hhbmdlZCBieSBpbnRlcmNlcHRvci4gU2FtZSBhcHBsaWVzIGZvciBvdGhlciBTZXQgYW5kIE1hcCBhcGkncy5cbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMuaGFzKHZhbHVlKSkge1xuICAgICAgICAgICAgdHJhbnNhY3Rpb24kJDEoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIF90aGlzLl9kYXRhLmFkZChfdGhpcy5lbmhhbmNlcih2YWx1ZSwgdW5kZWZpbmVkKSk7XG4gICAgICAgICAgICAgICAgX3RoaXMuX2F0b20ucmVwb3J0Q2hhbmdlZCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB2YXIgbm90aWZ5U3B5ID0gaXNTcHlFbmFibGVkJCQxKCk7XG4gICAgICAgICAgICB2YXIgbm90aWZ5ID0gaGFzTGlzdGVuZXJzJCQxKHRoaXMpO1xuICAgICAgICAgICAgdmFyIGNoYW5nZSA9IG5vdGlmeSB8fCBub3RpZnlTcHlcbiAgICAgICAgICAgICAgICA/IHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJhZGRcIixcbiAgICAgICAgICAgICAgICAgICAgb2JqZWN0OiB0aGlzLFxuICAgICAgICAgICAgICAgICAgICBuZXdWYWx1ZTogdmFsdWVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgOiBudWxsO1xuICAgICAgICAgICAgaWYgKG5vdGlmeVNweSAmJiBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpXG4gICAgICAgICAgICAgICAgc3B5UmVwb3J0U3RhcnQkJDEoY2hhbmdlKTtcbiAgICAgICAgICAgIGlmIChub3RpZnkpXG4gICAgICAgICAgICAgICAgbm90aWZ5TGlzdGVuZXJzJCQxKHRoaXMsIGNoYW5nZSk7XG4gICAgICAgICAgICBpZiAobm90aWZ5U3B5ICYmIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIilcbiAgICAgICAgICAgICAgICBzcHlSZXBvcnRFbmQkJDEoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIE9ic2VydmFibGVTZXQkJDEucHJvdG90eXBlLmRlbGV0ZSA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICBpZiAoaGFzSW50ZXJjZXB0b3JzJCQxKHRoaXMpKSB7XG4gICAgICAgICAgICB2YXIgY2hhbmdlID0gaW50ZXJjZXB0Q2hhbmdlJCQxKHRoaXMsIHtcbiAgICAgICAgICAgICAgICB0eXBlOiBcImRlbGV0ZVwiLFxuICAgICAgICAgICAgICAgIG9iamVjdDogdGhpcyxcbiAgICAgICAgICAgICAgICBvbGRWYWx1ZTogdmFsdWVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKCFjaGFuZ2UpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmhhcyh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHZhciBub3RpZnlTcHkgPSBpc1NweUVuYWJsZWQkJDEoKTtcbiAgICAgICAgICAgIHZhciBub3RpZnkgPSBoYXNMaXN0ZW5lcnMkJDEodGhpcyk7XG4gICAgICAgICAgICB2YXIgY2hhbmdlID0gbm90aWZ5IHx8IG5vdGlmeVNweVxuICAgICAgICAgICAgICAgID8ge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcImRlbGV0ZVwiLFxuICAgICAgICAgICAgICAgICAgICBvYmplY3Q6IHRoaXMsXG4gICAgICAgICAgICAgICAgICAgIG9sZFZhbHVlOiB2YWx1ZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICA6IG51bGw7XG4gICAgICAgICAgICBpZiAobm90aWZ5U3B5ICYmIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIilcbiAgICAgICAgICAgICAgICBzcHlSZXBvcnRTdGFydCQkMShfX2Fzc2lnbih7fSwgY2hhbmdlLCB7IG5hbWU6IHRoaXMubmFtZSB9KSk7XG4gICAgICAgICAgICB0cmFuc2FjdGlvbiQkMShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuX2F0b20ucmVwb3J0Q2hhbmdlZCgpO1xuICAgICAgICAgICAgICAgIF90aGlzLl9kYXRhLmRlbGV0ZSh2YWx1ZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmIChub3RpZnkpXG4gICAgICAgICAgICAgICAgbm90aWZ5TGlzdGVuZXJzJCQxKHRoaXMsIGNoYW5nZSk7XG4gICAgICAgICAgICBpZiAobm90aWZ5U3B5ICYmIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIilcbiAgICAgICAgICAgICAgICBzcHlSZXBvcnRFbmQkJDEoKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuICAgIE9ic2VydmFibGVTZXQkJDEucHJvdG90eXBlLmhhcyA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICB0aGlzLl9hdG9tLnJlcG9ydE9ic2VydmVkKCk7XG4gICAgICAgIHJldHVybiB0aGlzLl9kYXRhLmhhcyh0aGlzLmRlaGFuY2VWYWx1ZSh2YWx1ZSkpO1xuICAgIH07XG4gICAgT2JzZXJ2YWJsZVNldCQkMS5wcm90b3R5cGUuZW50cmllcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIG5leHRJbmRleCA9IDA7XG4gICAgICAgIHZhciBrZXlzJCQxID0gQXJyYXkuZnJvbSh0aGlzLmtleXMoKSk7XG4gICAgICAgIHZhciB2YWx1ZXMkJDEgPSBBcnJheS5mcm9tKHRoaXMudmFsdWVzKCkpO1xuICAgICAgICByZXR1cm4gbWFrZUl0ZXJhYmxlKHtcbiAgICAgICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgaW5kZXggPSBuZXh0SW5kZXg7XG4gICAgICAgICAgICAgICAgbmV4dEluZGV4ICs9IDE7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGluZGV4IDwgdmFsdWVzJCQxLmxlbmd0aFxuICAgICAgICAgICAgICAgICAgICA/IHsgdmFsdWU6IFtrZXlzJCQxW2luZGV4XSwgdmFsdWVzJCQxW2luZGV4XV0sIGRvbmU6IGZhbHNlIH1cbiAgICAgICAgICAgICAgICAgICAgOiB7IGRvbmU6IHRydWUgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBPYnNlcnZhYmxlU2V0JCQxLnByb3RvdHlwZS5rZXlzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy52YWx1ZXMoKTtcbiAgICB9O1xuICAgIE9ic2VydmFibGVTZXQkJDEucHJvdG90eXBlLnZhbHVlcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5fYXRvbS5yZXBvcnRPYnNlcnZlZCgpO1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHZhciBuZXh0SW5kZXggPSAwO1xuICAgICAgICB2YXIgb2JzZXJ2YWJsZVZhbHVlcyA9IEFycmF5LmZyb20odGhpcy5fZGF0YS52YWx1ZXMoKSk7XG4gICAgICAgIHJldHVybiBtYWtlSXRlcmFibGUoe1xuICAgICAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXh0SW5kZXggPCBvYnNlcnZhYmxlVmFsdWVzLmxlbmd0aFxuICAgICAgICAgICAgICAgICAgICA/IHsgdmFsdWU6IHNlbGYuZGVoYW5jZVZhbHVlKG9ic2VydmFibGVWYWx1ZXNbbmV4dEluZGV4KytdKSwgZG9uZTogZmFsc2UgfVxuICAgICAgICAgICAgICAgICAgICA6IHsgZG9uZTogdHJ1ZSB9O1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuICAgIE9ic2VydmFibGVTZXQkJDEucHJvdG90eXBlLnJlcGxhY2UgPSBmdW5jdGlvbiAob3RoZXIpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgaWYgKGlzT2JzZXJ2YWJsZVNldCQkMShvdGhlcikpIHtcbiAgICAgICAgICAgIG90aGVyID0gb3RoZXIudG9KUygpO1xuICAgICAgICB9XG4gICAgICAgIHRyYW5zYWN0aW9uJCQxKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KG90aGVyKSkge1xuICAgICAgICAgICAgICAgIF90aGlzLmNsZWFyKCk7XG4gICAgICAgICAgICAgICAgb3RoZXIuZm9yRWFjaChmdW5jdGlvbiAodmFsdWUpIHsgcmV0dXJuIF90aGlzLmFkZCh2YWx1ZSk7IH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoaXNFUzZTZXQkJDEob3RoZXIpKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuY2xlYXIoKTtcbiAgICAgICAgICAgICAgICBvdGhlci5mb3JFYWNoKGZ1bmN0aW9uICh2YWx1ZSkgeyByZXR1cm4gX3RoaXMuYWRkKHZhbHVlKTsgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChvdGhlciAhPT0gbnVsbCAmJiBvdGhlciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgZmFpbCQkMShcIkNhbm5vdCBpbml0aWFsaXplIHNldCBmcm9tIFwiICsgb3RoZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBPYnNlcnZhYmxlU2V0JCQxLnByb3RvdHlwZS5vYnNlcnZlID0gZnVuY3Rpb24gKGxpc3RlbmVyLCBmaXJlSW1tZWRpYXRlbHkpIHtcbiAgICAgICAgLy8gVE9ETyAnZmlyZUltbWVkaWF0ZWx5JyBjYW4gYmUgdHJ1ZT9cbiAgICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiICYmXG4gICAgICAgICAgICBpbnZhcmlhbnQkJDEoZmlyZUltbWVkaWF0ZWx5ICE9PSB0cnVlLCBcImBvYnNlcnZlYCBkb2Vzbid0IHN1cHBvcnQgZmlyZUltbWVkaWF0ZWx5PXRydWUgaW4gY29tYmluYXRpb24gd2l0aCBzZXRzLlwiKTtcbiAgICAgICAgcmV0dXJuIHJlZ2lzdGVyTGlzdGVuZXIkJDEodGhpcywgbGlzdGVuZXIpO1xuICAgIH07XG4gICAgT2JzZXJ2YWJsZVNldCQkMS5wcm90b3R5cGUuaW50ZXJjZXB0ID0gZnVuY3Rpb24gKGhhbmRsZXIpIHtcbiAgICAgICAgcmV0dXJuIHJlZ2lzdGVySW50ZXJjZXB0b3IkJDEodGhpcywgaGFuZGxlcik7XG4gICAgfTtcbiAgICBPYnNlcnZhYmxlU2V0JCQxLnByb3RvdHlwZS50b0pTID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gbmV3IFNldCh0aGlzKTtcbiAgICB9O1xuICAgIE9ic2VydmFibGVTZXQkJDEucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5uYW1lICsgXCJbIFwiICsgQXJyYXkuZnJvbSh0aGlzKS5qb2luKFwiLCBcIikgKyBcIiBdXCI7XG4gICAgfTtcbiAgICBPYnNlcnZhYmxlU2V0JCQxLnByb3RvdHlwZVsoX2EkMSA9ICRtb2J4JCQxLCBTeW1ib2wuaXRlcmF0b3IpXSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsdWVzKCk7XG4gICAgfTtcbiAgICByZXR1cm4gT2JzZXJ2YWJsZVNldCQkMTtcbn0oKSk7XG52YXIgaXNPYnNlcnZhYmxlU2V0JCQxID0gY3JlYXRlSW5zdGFuY2VvZlByZWRpY2F0ZSQkMShcIk9ic2VydmFibGVTZXRcIiwgT2JzZXJ2YWJsZVNldCQkMSk7XG5cbnZhciBPYnNlcnZhYmxlT2JqZWN0QWRtaW5pc3RyYXRpb24kJDEgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gT2JzZXJ2YWJsZU9iamVjdEFkbWluaXN0cmF0aW9uJCQxKHRhcmdldCwgdmFsdWVzJCQxLCBuYW1lLCBkZWZhdWx0RW5oYW5jZXIpIHtcbiAgICAgICAgaWYgKHZhbHVlcyQkMSA9PT0gdm9pZCAwKSB7IHZhbHVlcyQkMSA9IG5ldyBNYXAoKTsgfVxuICAgICAgICB0aGlzLnRhcmdldCA9IHRhcmdldDtcbiAgICAgICAgdGhpcy52YWx1ZXMgPSB2YWx1ZXMkJDE7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMuZGVmYXVsdEVuaGFuY2VyID0gZGVmYXVsdEVuaGFuY2VyO1xuICAgICAgICB0aGlzLmtleXNBdG9tID0gbmV3IEF0b20kJDEobmFtZSArIFwiLmtleXNcIik7XG4gICAgfVxuICAgIE9ic2VydmFibGVPYmplY3RBZG1pbmlzdHJhdGlvbiQkMS5wcm90b3R5cGUucmVhZCA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsdWVzLmdldChrZXkpLmdldCgpO1xuICAgIH07XG4gICAgT2JzZXJ2YWJsZU9iamVjdEFkbWluaXN0cmF0aW9uJCQxLnByb3RvdHlwZS53cml0ZSA9IGZ1bmN0aW9uIChrZXksIG5ld1ZhbHVlKSB7XG4gICAgICAgIHZhciBpbnN0YW5jZSA9IHRoaXMudGFyZ2V0O1xuICAgICAgICB2YXIgb2JzZXJ2YWJsZSQkMSA9IHRoaXMudmFsdWVzLmdldChrZXkpO1xuICAgICAgICBpZiAob2JzZXJ2YWJsZSQkMSBpbnN0YW5jZW9mIENvbXB1dGVkVmFsdWUkJDEpIHtcbiAgICAgICAgICAgIG9ic2VydmFibGUkJDEuc2V0KG5ld1ZhbHVlKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyBpbnRlcmNlcHRcbiAgICAgICAgaWYgKGhhc0ludGVyY2VwdG9ycyQkMSh0aGlzKSkge1xuICAgICAgICAgICAgdmFyIGNoYW5nZSA9IGludGVyY2VwdENoYW5nZSQkMSh0aGlzLCB7XG4gICAgICAgICAgICAgICAgdHlwZTogXCJ1cGRhdGVcIixcbiAgICAgICAgICAgICAgICBvYmplY3Q6IHRoaXMucHJveHkgfHwgaW5zdGFuY2UsXG4gICAgICAgICAgICAgICAgbmFtZToga2V5LFxuICAgICAgICAgICAgICAgIG5ld1ZhbHVlOiBuZXdWYWx1ZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoIWNoYW5nZSlcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBuZXdWYWx1ZSA9IGNoYW5nZS5uZXdWYWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBuZXdWYWx1ZSA9IG9ic2VydmFibGUkJDEucHJlcGFyZU5ld1ZhbHVlKG5ld1ZhbHVlKTtcbiAgICAgICAgLy8gbm90aWZ5IHNweSAmIG9ic2VydmVyc1xuICAgICAgICBpZiAobmV3VmFsdWUgIT09IGdsb2JhbFN0YXRlJCQxLlVOQ0hBTkdFRCkge1xuICAgICAgICAgICAgdmFyIG5vdGlmeSA9IGhhc0xpc3RlbmVycyQkMSh0aGlzKTtcbiAgICAgICAgICAgIHZhciBub3RpZnlTcHkgPSBpc1NweUVuYWJsZWQkJDEoKTtcbiAgICAgICAgICAgIHZhciBjaGFuZ2UgPSBub3RpZnkgfHwgbm90aWZ5U3B5XG4gICAgICAgICAgICAgICAgPyB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwidXBkYXRlXCIsXG4gICAgICAgICAgICAgICAgICAgIG9iamVjdDogdGhpcy5wcm94eSB8fCBpbnN0YW5jZSxcbiAgICAgICAgICAgICAgICAgICAgb2xkVmFsdWU6IG9ic2VydmFibGUkJDEudmFsdWUsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IGtleSxcbiAgICAgICAgICAgICAgICAgICAgbmV3VmFsdWU6IG5ld1ZhbHVlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIDogbnVsbDtcbiAgICAgICAgICAgIGlmIChub3RpZnlTcHkgJiYgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKVxuICAgICAgICAgICAgICAgIHNweVJlcG9ydFN0YXJ0JCQxKF9fYXNzaWduKHt9LCBjaGFuZ2UsIHsgbmFtZTogdGhpcy5uYW1lLCBrZXk6IGtleSB9KSk7XG4gICAgICAgICAgICBvYnNlcnZhYmxlJCQxLnNldE5ld1ZhbHVlKG5ld1ZhbHVlKTtcbiAgICAgICAgICAgIGlmIChub3RpZnkpXG4gICAgICAgICAgICAgICAgbm90aWZ5TGlzdGVuZXJzJCQxKHRoaXMsIGNoYW5nZSk7XG4gICAgICAgICAgICBpZiAobm90aWZ5U3B5ICYmIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIilcbiAgICAgICAgICAgICAgICBzcHlSZXBvcnRFbmQkJDEoKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgT2JzZXJ2YWJsZU9iamVjdEFkbWluaXN0cmF0aW9uJCQxLnByb3RvdHlwZS5oYXMgPSBmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgIHZhciBtYXAgPSB0aGlzLnBlbmRpbmdLZXlzIHx8ICh0aGlzLnBlbmRpbmdLZXlzID0gbmV3IE1hcCgpKTtcbiAgICAgICAgdmFyIGVudHJ5ID0gbWFwLmdldChrZXkpO1xuICAgICAgICBpZiAoZW50cnkpXG4gICAgICAgICAgICByZXR1cm4gZW50cnkuZ2V0KCk7XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdmFyIGV4aXN0cyA9ICEhdGhpcy52YWx1ZXMuZ2V0KGtleSk7XG4gICAgICAgICAgICAvLyBQb3NzaWJsZSBvcHRpbWl6YXRpb246IERvbid0IGhhdmUgYSBzZXBhcmF0ZSBtYXAgZm9yIG5vbiBleGlzdGluZyBrZXlzLFxuICAgICAgICAgICAgLy8gYnV0IHN0b3JlIHRoZW0gaW4gdGhlIHZhbHVlcyBtYXAgaW5zdGVhZCwgdXNpbmcgYSBzcGVjaWFsIHN5bWJvbCB0byBkZW5vdGUgXCJub3QgZXhpc3RpbmdcIlxuICAgICAgICAgICAgZW50cnkgPSBuZXcgT2JzZXJ2YWJsZVZhbHVlJCQxKGV4aXN0cywgcmVmZXJlbmNlRW5oYW5jZXIkJDEsIHRoaXMubmFtZSArIFwiLlwiICsga2V5LnRvU3RyaW5nKCkgKyBcIj9cIiwgZmFsc2UpO1xuICAgICAgICAgICAgbWFwLnNldChrZXksIGVudHJ5KTtcbiAgICAgICAgICAgIHJldHVybiBlbnRyeS5nZXQoKTsgLy8gcmVhZCB0byBzdWJzY3JpYmVcbiAgICAgICAgfVxuICAgIH07XG4gICAgT2JzZXJ2YWJsZU9iamVjdEFkbWluaXN0cmF0aW9uJCQxLnByb3RvdHlwZS5hZGRPYnNlcnZhYmxlUHJvcCA9IGZ1bmN0aW9uIChwcm9wTmFtZSwgbmV3VmFsdWUsIGVuaGFuY2VyKSB7XG4gICAgICAgIGlmIChlbmhhbmNlciA9PT0gdm9pZCAwKSB7IGVuaGFuY2VyID0gdGhpcy5kZWZhdWx0RW5oYW5jZXI7IH1cbiAgICAgICAgdmFyIHRhcmdldCA9IHRoaXMudGFyZ2V0O1xuICAgICAgICBhc3NlcnRQcm9wZXJ0eUNvbmZpZ3VyYWJsZSQkMSh0YXJnZXQsIHByb3BOYW1lKTtcbiAgICAgICAgaWYgKGhhc0ludGVyY2VwdG9ycyQkMSh0aGlzKSkge1xuICAgICAgICAgICAgdmFyIGNoYW5nZSA9IGludGVyY2VwdENoYW5nZSQkMSh0aGlzLCB7XG4gICAgICAgICAgICAgICAgb2JqZWN0OiB0aGlzLnByb3h5IHx8IHRhcmdldCxcbiAgICAgICAgICAgICAgICBuYW1lOiBwcm9wTmFtZSxcbiAgICAgICAgICAgICAgICB0eXBlOiBcImFkZFwiLFxuICAgICAgICAgICAgICAgIG5ld1ZhbHVlOiBuZXdWYWx1ZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoIWNoYW5nZSlcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBuZXdWYWx1ZSA9IGNoYW5nZS5uZXdWYWx1ZTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgb2JzZXJ2YWJsZSQkMSA9IG5ldyBPYnNlcnZhYmxlVmFsdWUkJDEobmV3VmFsdWUsIGVuaGFuY2VyLCB0aGlzLm5hbWUgKyBcIi5cIiArIHByb3BOYW1lLCBmYWxzZSk7XG4gICAgICAgIHRoaXMudmFsdWVzLnNldChwcm9wTmFtZSwgb2JzZXJ2YWJsZSQkMSk7XG4gICAgICAgIG5ld1ZhbHVlID0gb2JzZXJ2YWJsZSQkMS52YWx1ZTsgLy8gb2JzZXJ2YWJsZVZhbHVlIG1pZ2h0IGhhdmUgY2hhbmdlZCBpdFxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBwcm9wTmFtZSwgZ2VuZXJhdGVPYnNlcnZhYmxlUHJvcENvbmZpZyQkMShwcm9wTmFtZSkpO1xuICAgICAgICB0aGlzLm5vdGlmeVByb3BlcnR5QWRkaXRpb24ocHJvcE5hbWUsIG5ld1ZhbHVlKTtcbiAgICB9O1xuICAgIE9ic2VydmFibGVPYmplY3RBZG1pbmlzdHJhdGlvbiQkMS5wcm90b3R5cGUuYWRkQ29tcHV0ZWRQcm9wID0gZnVuY3Rpb24gKHByb3BlcnR5T3duZXIsIC8vIHdoZXJlIGlzIHRoZSBwcm9wZXJ0eSBkZWNsYXJlZD9cbiAgICBwcm9wTmFtZSwgb3B0aW9ucykge1xuICAgICAgICB2YXIgdGFyZ2V0ID0gdGhpcy50YXJnZXQ7XG4gICAgICAgIG9wdGlvbnMubmFtZSA9IG9wdGlvbnMubmFtZSB8fCB0aGlzLm5hbWUgKyBcIi5cIiArIHByb3BOYW1lO1xuICAgICAgICB0aGlzLnZhbHVlcy5zZXQocHJvcE5hbWUsIG5ldyBDb21wdXRlZFZhbHVlJCQxKG9wdGlvbnMpKTtcbiAgICAgICAgaWYgKHByb3BlcnR5T3duZXIgPT09IHRhcmdldCB8fCBpc1Byb3BlcnR5Q29uZmlndXJhYmxlJCQxKHByb3BlcnR5T3duZXIsIHByb3BOYW1lKSlcbiAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShwcm9wZXJ0eU93bmVyLCBwcm9wTmFtZSwgZ2VuZXJhdGVDb21wdXRlZFByb3BDb25maWckJDEocHJvcE5hbWUpKTtcbiAgICB9O1xuICAgIE9ic2VydmFibGVPYmplY3RBZG1pbmlzdHJhdGlvbiQkMS5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24gKGtleSkge1xuICAgICAgICBpZiAoIXRoaXMudmFsdWVzLmhhcyhrZXkpKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB2YXIgdGFyZ2V0ID0gdGhpcy50YXJnZXQ7XG4gICAgICAgIGlmIChoYXNJbnRlcmNlcHRvcnMkJDEodGhpcykpIHtcbiAgICAgICAgICAgIHZhciBjaGFuZ2UgPSBpbnRlcmNlcHRDaGFuZ2UkJDEodGhpcywge1xuICAgICAgICAgICAgICAgIG9iamVjdDogdGhpcy5wcm94eSB8fCB0YXJnZXQsXG4gICAgICAgICAgICAgICAgbmFtZToga2V5LFxuICAgICAgICAgICAgICAgIHR5cGU6IFwicmVtb3ZlXCJcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKCFjaGFuZ2UpXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBzdGFydEJhdGNoJCQxKCk7XG4gICAgICAgICAgICB2YXIgbm90aWZ5ID0gaGFzTGlzdGVuZXJzJCQxKHRoaXMpO1xuICAgICAgICAgICAgdmFyIG5vdGlmeVNweSA9IGlzU3B5RW5hYmxlZCQkMSgpO1xuICAgICAgICAgICAgdmFyIG9sZE9ic2VydmFibGUgPSB0aGlzLnZhbHVlcy5nZXQoa2V5KTtcbiAgICAgICAgICAgIHZhciBvbGRWYWx1ZSA9IG9sZE9ic2VydmFibGUgJiYgb2xkT2JzZXJ2YWJsZS5nZXQoKTtcbiAgICAgICAgICAgIG9sZE9ic2VydmFibGUgJiYgb2xkT2JzZXJ2YWJsZS5zZXQodW5kZWZpbmVkKTtcbiAgICAgICAgICAgIC8vIG5vdGlmeSBrZXkgYW5kIGtleXNldCBsaXN0ZW5lcnNcbiAgICAgICAgICAgIHRoaXMua2V5c0F0b20ucmVwb3J0Q2hhbmdlZCgpO1xuICAgICAgICAgICAgdGhpcy52YWx1ZXMuZGVsZXRlKGtleSk7XG4gICAgICAgICAgICBpZiAodGhpcy5wZW5kaW5nS2V5cykge1xuICAgICAgICAgICAgICAgIHZhciBlbnRyeSA9IHRoaXMucGVuZGluZ0tleXMuZ2V0KGtleSk7XG4gICAgICAgICAgICAgICAgaWYgKGVudHJ5KVxuICAgICAgICAgICAgICAgICAgICBlbnRyeS5zZXQoZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gZGVsZXRlIHRoZSBwcm9wXG4gICAgICAgICAgICBkZWxldGUgdGhpcy50YXJnZXRba2V5XTtcbiAgICAgICAgICAgIHZhciBjaGFuZ2UgPSBub3RpZnkgfHwgbm90aWZ5U3B5XG4gICAgICAgICAgICAgICAgPyB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwicmVtb3ZlXCIsXG4gICAgICAgICAgICAgICAgICAgIG9iamVjdDogdGhpcy5wcm94eSB8fCB0YXJnZXQsXG4gICAgICAgICAgICAgICAgICAgIG9sZFZhbHVlOiBvbGRWYWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgbmFtZToga2V5XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIDogbnVsbDtcbiAgICAgICAgICAgIGlmIChub3RpZnlTcHkgJiYgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKVxuICAgICAgICAgICAgICAgIHNweVJlcG9ydFN0YXJ0JCQxKF9fYXNzaWduKHt9LCBjaGFuZ2UsIHsgbmFtZTogdGhpcy5uYW1lLCBrZXk6IGtleSB9KSk7XG4gICAgICAgICAgICBpZiAobm90aWZ5KVxuICAgICAgICAgICAgICAgIG5vdGlmeUxpc3RlbmVycyQkMSh0aGlzLCBjaGFuZ2UpO1xuICAgICAgICAgICAgaWYgKG5vdGlmeVNweSAmJiBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpXG4gICAgICAgICAgICAgICAgc3B5UmVwb3J0RW5kJCQxKCk7XG4gICAgICAgIH1cbiAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICBlbmRCYXRjaCQkMSgpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBPYnNlcnZhYmxlT2JqZWN0QWRtaW5pc3RyYXRpb24kJDEucHJvdG90eXBlLmlsbGVnYWxBY2Nlc3MgPSBmdW5jdGlvbiAob3duZXIsIHByb3BOYW1lKSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGlzIGhhcHBlbnMgaWYgYSBwcm9wZXJ0eSBpcyBhY2Nlc3NlZCB0aHJvdWdoIHRoZSBwcm90b3R5cGUgY2hhaW4sIGJ1dCB0aGUgcHJvcGVydHkgd2FzXG4gICAgICAgICAqIGRlY2xhcmVkIGRpcmVjdGx5IGFzIG93biBwcm9wZXJ0eSBvbiB0aGUgcHJvdG90eXBlLlxuICAgICAgICAgKlxuICAgICAgICAgKiBFLmcuOlxuICAgICAgICAgKiBjbGFzcyBBIHtcbiAgICAgICAgICogfVxuICAgICAgICAgKiBleHRlbmRPYnNlcnZhYmxlKEEucHJvdG90eXBlLCB7IHg6IDEgfSlcbiAgICAgICAgICpcbiAgICAgICAgICogY2xhc3NCIGV4dGVucyBBIHtcbiAgICAgICAgICogfVxuICAgICAgICAgKiBjb25zb2xlLmxvZyhuZXcgQigpLngpXG4gICAgICAgICAqXG4gICAgICAgICAqIEl0IGlzIHVuY2xlYXIgd2hldGhlciB0aGUgcHJvcGVydHkgc2hvdWxkIGJlIGNvbnNpZGVyZWQgJ3N0YXRpYycgb3IgaW5oZXJpdGVkLlxuICAgICAgICAgKiBFaXRoZXIgdXNlIGBjb25zb2xlLmxvZyhBLngpYFxuICAgICAgICAgKiBvcjogZGVjb3JhdGUoQSwgeyB4OiBvYnNlcnZhYmxlIH0pXG4gICAgICAgICAqXG4gICAgICAgICAqIFdoZW4gdXNpbmcgZGVjb3JhdGUsIHRoZSBwcm9wZXJ0eSB3aWxsIGFsd2F5cyBiZSByZWRlY2xhcmVkIGFzIG93biBwcm9wZXJ0eSBvbiB0aGUgYWN0dWFsIGluc3RhbmNlXG4gICAgICAgICAqL1xuICAgICAgICBjb25zb2xlLndhcm4oXCJQcm9wZXJ0eSAnXCIgKyBwcm9wTmFtZSArIFwiJyBvZiAnXCIgKyBvd25lciArIFwiJyB3YXMgYWNjZXNzZWQgdGhyb3VnaCB0aGUgcHJvdG90eXBlIGNoYWluLiBVc2UgJ2RlY29yYXRlJyBpbnN0ZWFkIHRvIGRlY2xhcmUgdGhlIHByb3Agb3IgYWNjZXNzIGl0IHN0YXRpY2FsbHkgdGhyb3VnaCBpdCdzIG93bmVyXCIpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogT2JzZXJ2ZXMgdGhpcyBvYmplY3QuIFRyaWdnZXJzIGZvciB0aGUgZXZlbnRzICdhZGQnLCAndXBkYXRlJyBhbmQgJ2RlbGV0ZScuXG4gICAgICogU2VlOiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9PYmplY3Qvb2JzZXJ2ZVxuICAgICAqIGZvciBjYWxsYmFjayBkZXRhaWxzXG4gICAgICovXG4gICAgT2JzZXJ2YWJsZU9iamVjdEFkbWluaXN0cmF0aW9uJCQxLnByb3RvdHlwZS5vYnNlcnZlID0gZnVuY3Rpb24gKGNhbGxiYWNrLCBmaXJlSW1tZWRpYXRlbHkpIHtcbiAgICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiICYmXG4gICAgICAgICAgICBpbnZhcmlhbnQkJDEoZmlyZUltbWVkaWF0ZWx5ICE9PSB0cnVlLCBcImBvYnNlcnZlYCBkb2Vzbid0IHN1cHBvcnQgdGhlIGZpcmUgaW1tZWRpYXRlbHkgcHJvcGVydHkgZm9yIG9ic2VydmFibGUgb2JqZWN0cy5cIik7XG4gICAgICAgIHJldHVybiByZWdpc3Rlckxpc3RlbmVyJCQxKHRoaXMsIGNhbGxiYWNrKTtcbiAgICB9O1xuICAgIE9ic2VydmFibGVPYmplY3RBZG1pbmlzdHJhdGlvbiQkMS5wcm90b3R5cGUuaW50ZXJjZXB0ID0gZnVuY3Rpb24gKGhhbmRsZXIpIHtcbiAgICAgICAgcmV0dXJuIHJlZ2lzdGVySW50ZXJjZXB0b3IkJDEodGhpcywgaGFuZGxlcik7XG4gICAgfTtcbiAgICBPYnNlcnZhYmxlT2JqZWN0QWRtaW5pc3RyYXRpb24kJDEucHJvdG90eXBlLm5vdGlmeVByb3BlcnR5QWRkaXRpb24gPSBmdW5jdGlvbiAoa2V5LCBuZXdWYWx1ZSkge1xuICAgICAgICB2YXIgbm90aWZ5ID0gaGFzTGlzdGVuZXJzJCQxKHRoaXMpO1xuICAgICAgICB2YXIgbm90aWZ5U3B5ID0gaXNTcHlFbmFibGVkJCQxKCk7XG4gICAgICAgIHZhciBjaGFuZ2UgPSBub3RpZnkgfHwgbm90aWZ5U3B5XG4gICAgICAgICAgICA/IHtcbiAgICAgICAgICAgICAgICB0eXBlOiBcImFkZFwiLFxuICAgICAgICAgICAgICAgIG9iamVjdDogdGhpcy5wcm94eSB8fCB0aGlzLnRhcmdldCxcbiAgICAgICAgICAgICAgICBuYW1lOiBrZXksXG4gICAgICAgICAgICAgICAgbmV3VmFsdWU6IG5ld1ZhbHVlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICA6IG51bGw7XG4gICAgICAgIGlmIChub3RpZnlTcHkgJiYgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKVxuICAgICAgICAgICAgc3B5UmVwb3J0U3RhcnQkJDEoX19hc3NpZ24oe30sIGNoYW5nZSwgeyBuYW1lOiB0aGlzLm5hbWUsIGtleToga2V5IH0pKTtcbiAgICAgICAgaWYgKG5vdGlmeSlcbiAgICAgICAgICAgIG5vdGlmeUxpc3RlbmVycyQkMSh0aGlzLCBjaGFuZ2UpO1xuICAgICAgICBpZiAobm90aWZ5U3B5ICYmIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIilcbiAgICAgICAgICAgIHNweVJlcG9ydEVuZCQkMSgpO1xuICAgICAgICBpZiAodGhpcy5wZW5kaW5nS2V5cykge1xuICAgICAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy5wZW5kaW5nS2V5cy5nZXQoa2V5KTtcbiAgICAgICAgICAgIGlmIChlbnRyeSlcbiAgICAgICAgICAgICAgICBlbnRyeS5zZXQodHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5rZXlzQXRvbS5yZXBvcnRDaGFuZ2VkKCk7XG4gICAgfTtcbiAgICBPYnNlcnZhYmxlT2JqZWN0QWRtaW5pc3RyYXRpb24kJDEucHJvdG90eXBlLmdldEtleXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBlXzEsIF9hO1xuICAgICAgICB0aGlzLmtleXNBdG9tLnJlcG9ydE9ic2VydmVkKCk7XG4gICAgICAgIC8vIHJldHVybiBSZWZsZWN0Lm93bktleXModGhpcy52YWx1ZXMpIGFzIGFueVxuICAgICAgICB2YXIgcmVzID0gW107XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBmb3IgKHZhciBfYiA9IF9fdmFsdWVzKHRoaXMudmFsdWVzKSwgX2MgPSBfYi5uZXh0KCk7ICFfYy5kb25lOyBfYyA9IF9iLm5leHQoKSkge1xuICAgICAgICAgICAgICAgIHZhciBfZCA9IF9fcmVhZChfYy52YWx1ZSwgMiksIGtleSA9IF9kWzBdLCB2YWx1ZSA9IF9kWzFdO1xuICAgICAgICAgICAgICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIE9ic2VydmFibGVWYWx1ZSQkMSlcbiAgICAgICAgICAgICAgICAgICAgcmVzLnB1c2goa2V5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZV8xXzEpIHsgZV8xID0geyBlcnJvcjogZV8xXzEgfTsgfVxuICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgaWYgKF9jICYmICFfYy5kb25lICYmIChfYSA9IF9iLnJldHVybikpIF9hLmNhbGwoX2IpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZmluYWxseSB7IGlmIChlXzEpIHRocm93IGVfMS5lcnJvcjsgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXM7XG4gICAgfTtcbiAgICByZXR1cm4gT2JzZXJ2YWJsZU9iamVjdEFkbWluaXN0cmF0aW9uJCQxO1xufSgpKTtcbmZ1bmN0aW9uIGFzT2JzZXJ2YWJsZU9iamVjdCQkMSh0YXJnZXQsIG5hbWUsIGRlZmF1bHRFbmhhbmNlcikge1xuICAgIGlmIChuYW1lID09PSB2b2lkIDApIHsgbmFtZSA9IFwiXCI7IH1cbiAgICBpZiAoZGVmYXVsdEVuaGFuY2VyID09PSB2b2lkIDApIHsgZGVmYXVsdEVuaGFuY2VyID0gZGVlcEVuaGFuY2VyJCQxOyB9XG4gICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCh0YXJnZXQsICRtb2J4JCQxKSlcbiAgICAgICAgcmV0dXJuIHRhcmdldFskbW9ieCQkMV07XG4gICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiICYmXG4gICAgICAgIGludmFyaWFudCQkMShPYmplY3QuaXNFeHRlbnNpYmxlKHRhcmdldCksIFwiQ2Fubm90IG1ha2UgdGhlIGRlc2lnbmF0ZWQgb2JqZWN0IG9ic2VydmFibGU7IGl0IGlzIG5vdCBleHRlbnNpYmxlXCIpO1xuICAgIGlmICghaXNQbGFpbk9iamVjdCQkMSh0YXJnZXQpKVxuICAgICAgICBuYW1lID0gKHRhcmdldC5jb25zdHJ1Y3Rvci5uYW1lIHx8IFwiT2JzZXJ2YWJsZU9iamVjdFwiKSArIFwiQFwiICsgZ2V0TmV4dElkJCQxKCk7XG4gICAgaWYgKCFuYW1lKVxuICAgICAgICBuYW1lID0gXCJPYnNlcnZhYmxlT2JqZWN0QFwiICsgZ2V0TmV4dElkJCQxKCk7XG4gICAgdmFyIGFkbSA9IG5ldyBPYnNlcnZhYmxlT2JqZWN0QWRtaW5pc3RyYXRpb24kJDEodGFyZ2V0LCBuZXcgTWFwKCksIG5hbWUsIGRlZmF1bHRFbmhhbmNlcik7XG4gICAgYWRkSGlkZGVuUHJvcCQkMSh0YXJnZXQsICRtb2J4JCQxLCBhZG0pO1xuICAgIHJldHVybiBhZG07XG59XG52YXIgb2JzZXJ2YWJsZVByb3BlcnR5Q29uZmlncyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG52YXIgY29tcHV0ZWRQcm9wZXJ0eUNvbmZpZ3MgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuZnVuY3Rpb24gZ2VuZXJhdGVPYnNlcnZhYmxlUHJvcENvbmZpZyQkMShwcm9wTmFtZSkge1xuICAgIHJldHVybiAob2JzZXJ2YWJsZVByb3BlcnR5Q29uZmlnc1twcm9wTmFtZV0gfHxcbiAgICAgICAgKG9ic2VydmFibGVQcm9wZXJ0eUNvbmZpZ3NbcHJvcE5hbWVdID0ge1xuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzWyRtb2J4JCQxXS5yZWFkKHByb3BOYW1lKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2KSB7XG4gICAgICAgICAgICAgICAgdGhpc1skbW9ieCQkMV0ud3JpdGUocHJvcE5hbWUsIHYpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KSk7XG59XG5mdW5jdGlvbiBnZXRBZG1pbmlzdHJhdGlvbkZvckNvbXB1dGVkUHJvcE93bmVyKG93bmVyKSB7XG4gICAgdmFyIGFkbSA9IG93bmVyWyRtb2J4JCQxXTtcbiAgICBpZiAoIWFkbSkge1xuICAgICAgICAvLyBiZWNhdXNlIGNvbXB1dGVkIHByb3BzIGFyZSBkZWNsYXJlZCBvbiBwcm90eSxcbiAgICAgICAgLy8gdGhlIGN1cnJlbnQgaW5zdGFuY2UgbWlnaHQgbm90IGhhdmUgYmVlbiBpbml0aWFsaXplZCB5ZXRcbiAgICAgICAgaW5pdGlhbGl6ZUluc3RhbmNlJCQxKG93bmVyKTtcbiAgICAgICAgcmV0dXJuIG93bmVyWyRtb2J4JCQxXTtcbiAgICB9XG4gICAgcmV0dXJuIGFkbTtcbn1cbmZ1bmN0aW9uIGdlbmVyYXRlQ29tcHV0ZWRQcm9wQ29uZmlnJCQxKHByb3BOYW1lKSB7XG4gICAgcmV0dXJuIChjb21wdXRlZFByb3BlcnR5Q29uZmlnc1twcm9wTmFtZV0gfHxcbiAgICAgICAgKGNvbXB1dGVkUHJvcGVydHlDb25maWdzW3Byb3BOYW1lXSA9IHtcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBnZXRBZG1pbmlzdHJhdGlvbkZvckNvbXB1dGVkUHJvcE93bmVyKHRoaXMpLnJlYWQocHJvcE5hbWUpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgICAgICAgICBnZXRBZG1pbmlzdHJhdGlvbkZvckNvbXB1dGVkUHJvcE93bmVyKHRoaXMpLndyaXRlKHByb3BOYW1lLCB2KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkpO1xufVxudmFyIGlzT2JzZXJ2YWJsZU9iamVjdEFkbWluaXN0cmF0aW9uID0gY3JlYXRlSW5zdGFuY2VvZlByZWRpY2F0ZSQkMShcIk9ic2VydmFibGVPYmplY3RBZG1pbmlzdHJhdGlvblwiLCBPYnNlcnZhYmxlT2JqZWN0QWRtaW5pc3RyYXRpb24kJDEpO1xuZnVuY3Rpb24gaXNPYnNlcnZhYmxlT2JqZWN0JCQxKHRoaW5nKSB7XG4gICAgaWYgKGlzT2JqZWN0JCQxKHRoaW5nKSkge1xuICAgICAgICAvLyBJbml0aWFsaXplcnMgcnVuIGxhemlseSB3aGVuIHRyYW5zcGlsaW5nIHRvIGJhYmVsLCBzbyBtYWtlIHN1cmUgdGhleSBhcmUgcnVuLi4uXG4gICAgICAgIGluaXRpYWxpemVJbnN0YW5jZSQkMSh0aGluZyk7XG4gICAgICAgIHJldHVybiBpc09ic2VydmFibGVPYmplY3RBZG1pbmlzdHJhdGlvbih0aGluZ1skbW9ieCQkMV0pO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIGdldEF0b20kJDEodGhpbmcsIHByb3BlcnR5KSB7XG4gICAgaWYgKHR5cGVvZiB0aGluZyA9PT0gXCJvYmplY3RcIiAmJiB0aGluZyAhPT0gbnVsbCkge1xuICAgICAgICBpZiAoaXNPYnNlcnZhYmxlQXJyYXkkJDEodGhpbmcpKSB7XG4gICAgICAgICAgICBpZiAocHJvcGVydHkgIT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgICAgICBmYWlsJCQxKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiAmJlxuICAgICAgICAgICAgICAgICAgICBcIkl0IGlzIG5vdCBwb3NzaWJsZSB0byBnZXQgaW5kZXggYXRvbXMgZnJvbSBhcnJheXNcIik7XG4gICAgICAgICAgICByZXR1cm4gdGhpbmdbJG1vYngkJDFdLmF0b207XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzT2JzZXJ2YWJsZVNldCQkMSh0aGluZykpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGluZ1skbW9ieCQkMV07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzT2JzZXJ2YWJsZU1hcCQkMSh0aGluZykpIHtcbiAgICAgICAgICAgIHZhciBhbnlUaGluZyA9IHRoaW5nO1xuICAgICAgICAgICAgaWYgKHByb3BlcnR5ID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGFueVRoaW5nLl9rZXlzQXRvbTtcbiAgICAgICAgICAgIHZhciBvYnNlcnZhYmxlJCQxID0gYW55VGhpbmcuX2RhdGEuZ2V0KHByb3BlcnR5KSB8fCBhbnlUaGluZy5faGFzTWFwLmdldChwcm9wZXJ0eSk7XG4gICAgICAgICAgICBpZiAoIW9ic2VydmFibGUkJDEpXG4gICAgICAgICAgICAgICAgZmFpbCQkMShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgJiZcbiAgICAgICAgICAgICAgICAgICAgXCJ0aGUgZW50cnkgJ1wiICsgcHJvcGVydHkgKyBcIicgZG9lcyBub3QgZXhpc3QgaW4gdGhlIG9ic2VydmFibGUgbWFwICdcIiArIGdldERlYnVnTmFtZSQkMSh0aGluZykgKyBcIidcIik7XG4gICAgICAgICAgICByZXR1cm4gb2JzZXJ2YWJsZSQkMTtcbiAgICAgICAgfVxuICAgICAgICAvLyBJbml0aWFsaXplcnMgcnVuIGxhemlseSB3aGVuIHRyYW5zcGlsaW5nIHRvIGJhYmVsLCBzbyBtYWtlIHN1cmUgdGhleSBhcmUgcnVuLi4uXG4gICAgICAgIGluaXRpYWxpemVJbnN0YW5jZSQkMSh0aGluZyk7XG4gICAgICAgIGlmIChwcm9wZXJ0eSAmJiAhdGhpbmdbJG1vYngkJDFdKVxuICAgICAgICAgICAgdGhpbmdbcHJvcGVydHldOyAvLyBTZWUgIzEwNzJcbiAgICAgICAgaWYgKGlzT2JzZXJ2YWJsZU9iamVjdCQkMSh0aGluZykpIHtcbiAgICAgICAgICAgIGlmICghcHJvcGVydHkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhaWwkJDEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiICYmIFwicGxlYXNlIHNwZWNpZnkgYSBwcm9wZXJ0eVwiKTtcbiAgICAgICAgICAgIHZhciBvYnNlcnZhYmxlJCQxID0gdGhpbmdbJG1vYngkJDFdLnZhbHVlcy5nZXQocHJvcGVydHkpO1xuICAgICAgICAgICAgaWYgKCFvYnNlcnZhYmxlJCQxKVxuICAgICAgICAgICAgICAgIGZhaWwkJDEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiICYmXG4gICAgICAgICAgICAgICAgICAgIFwibm8gb2JzZXJ2YWJsZSBwcm9wZXJ0eSAnXCIgKyBwcm9wZXJ0eSArIFwiJyBmb3VuZCBvbiB0aGUgb2JzZXJ2YWJsZSBvYmplY3QgJ1wiICsgZ2V0RGVidWdOYW1lJCQxKHRoaW5nKSArIFwiJ1wiKTtcbiAgICAgICAgICAgIHJldHVybiBvYnNlcnZhYmxlJCQxO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc0F0b20kJDEodGhpbmcpIHx8IGlzQ29tcHV0ZWRWYWx1ZSQkMSh0aGluZykgfHwgaXNSZWFjdGlvbiQkMSh0aGluZykpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGluZztcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2YgdGhpbmcgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICBpZiAoaXNSZWFjdGlvbiQkMSh0aGluZ1skbW9ieCQkMV0pKSB7XG4gICAgICAgICAgICAvLyBkaXNwb3NlciBmdW5jdGlvblxuICAgICAgICAgICAgcmV0dXJuIHRoaW5nWyRtb2J4JCQxXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFpbCQkMShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgJiYgXCJDYW5ub3Qgb2J0YWluIGF0b20gZnJvbSBcIiArIHRoaW5nKTtcbn1cbmZ1bmN0aW9uIGdldEFkbWluaXN0cmF0aW9uJCQxKHRoaW5nLCBwcm9wZXJ0eSkge1xuICAgIGlmICghdGhpbmcpXG4gICAgICAgIGZhaWwkJDEoXCJFeHBlY3Rpbmcgc29tZSBvYmplY3RcIik7XG4gICAgaWYgKHByb3BlcnR5ICE9PSB1bmRlZmluZWQpXG4gICAgICAgIHJldHVybiBnZXRBZG1pbmlzdHJhdGlvbiQkMShnZXRBdG9tJCQxKHRoaW5nLCBwcm9wZXJ0eSkpO1xuICAgIGlmIChpc0F0b20kJDEodGhpbmcpIHx8IGlzQ29tcHV0ZWRWYWx1ZSQkMSh0aGluZykgfHwgaXNSZWFjdGlvbiQkMSh0aGluZykpXG4gICAgICAgIHJldHVybiB0aGluZztcbiAgICBpZiAoaXNPYnNlcnZhYmxlTWFwJCQxKHRoaW5nKSB8fCBpc09ic2VydmFibGVTZXQkJDEodGhpbmcpKVxuICAgICAgICByZXR1cm4gdGhpbmc7XG4gICAgLy8gSW5pdGlhbGl6ZXJzIHJ1biBsYXppbHkgd2hlbiB0cmFuc3BpbGluZyB0byBiYWJlbCwgc28gbWFrZSBzdXJlIHRoZXkgYXJlIHJ1bi4uLlxuICAgIGluaXRpYWxpemVJbnN0YW5jZSQkMSh0aGluZyk7XG4gICAgaWYgKHRoaW5nWyRtb2J4JCQxXSlcbiAgICAgICAgcmV0dXJuIHRoaW5nWyRtb2J4JCQxXTtcbiAgICBmYWlsJCQxKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiAmJiBcIkNhbm5vdCBvYnRhaW4gYWRtaW5pc3RyYXRpb24gZnJvbSBcIiArIHRoaW5nKTtcbn1cbmZ1bmN0aW9uIGdldERlYnVnTmFtZSQkMSh0aGluZywgcHJvcGVydHkpIHtcbiAgICB2YXIgbmFtZWQ7XG4gICAgaWYgKHByb3BlcnR5ICE9PSB1bmRlZmluZWQpXG4gICAgICAgIG5hbWVkID0gZ2V0QXRvbSQkMSh0aGluZywgcHJvcGVydHkpO1xuICAgIGVsc2UgaWYgKGlzT2JzZXJ2YWJsZU9iamVjdCQkMSh0aGluZykgfHwgaXNPYnNlcnZhYmxlTWFwJCQxKHRoaW5nKSB8fCBpc09ic2VydmFibGVTZXQkJDEodGhpbmcpKVxuICAgICAgICBuYW1lZCA9IGdldEFkbWluaXN0cmF0aW9uJCQxKHRoaW5nKTtcbiAgICBlbHNlXG4gICAgICAgIG5hbWVkID0gZ2V0QXRvbSQkMSh0aGluZyk7IC8vIHZhbGlkIGZvciBhcnJheXMgYXMgd2VsbFxuICAgIHJldHVybiBuYW1lZC5uYW1lO1xufVxuXG52YXIgdG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xuZnVuY3Rpb24gZGVlcEVxdWFsJCQxKGEsIGIpIHtcbiAgICByZXR1cm4gZXEoYSwgYik7XG59XG4vLyBDb3BpZWQgZnJvbSBodHRwczovL2dpdGh1Yi5jb20vamFzaGtlbmFzL3VuZGVyc2NvcmUvYmxvYi81YzIzN2E3YzY4MmZiNjhmZDUzNzgyMDNmMGJmMjJkY2UxNjI0ODU0L3VuZGVyc2NvcmUuanMjTDExODYtTDEyODlcbi8vIEludGVybmFsIHJlY3Vyc2l2ZSBjb21wYXJpc29uIGZ1bmN0aW9uIGZvciBgaXNFcXVhbGAuXG5mdW5jdGlvbiBlcShhLCBiLCBhU3RhY2ssIGJTdGFjaykge1xuICAgIC8vIElkZW50aWNhbCBvYmplY3RzIGFyZSBlcXVhbC4gYDAgPT09IC0wYCwgYnV0IHRoZXkgYXJlbid0IGlkZW50aWNhbC5cbiAgICAvLyBTZWUgdGhlIFtIYXJtb255IGBlZ2FsYCBwcm9wb3NhbF0oaHR0cDovL3dpa2kuZWNtYXNjcmlwdC5vcmcvZG9rdS5waHA/aWQ9aGFybW9ueTplZ2FsKS5cbiAgICBpZiAoYSA9PT0gYilcbiAgICAgICAgcmV0dXJuIGEgIT09IDAgfHwgMSAvIGEgPT09IDEgLyBiO1xuICAgIC8vIGBudWxsYCBvciBgdW5kZWZpbmVkYCBvbmx5IGVxdWFsIHRvIGl0c2VsZiAoc3RyaWN0IGNvbXBhcmlzb24pLlxuICAgIGlmIChhID09IG51bGwgfHwgYiA9PSBudWxsKVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgLy8gYE5hTmBzIGFyZSBlcXVpdmFsZW50LCBidXQgbm9uLXJlZmxleGl2ZS5cbiAgICBpZiAoYSAhPT0gYSlcbiAgICAgICAgcmV0dXJuIGIgIT09IGI7XG4gICAgLy8gRXhoYXVzdCBwcmltaXRpdmUgY2hlY2tzXG4gICAgdmFyIHR5cGUgPSB0eXBlb2YgYTtcbiAgICBpZiAodHlwZSAhPT0gXCJmdW5jdGlvblwiICYmIHR5cGUgIT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIGIgIT0gXCJvYmplY3RcIilcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIHJldHVybiBkZWVwRXEoYSwgYiwgYVN0YWNrLCBiU3RhY2spO1xufVxuLy8gSW50ZXJuYWwgcmVjdXJzaXZlIGNvbXBhcmlzb24gZnVuY3Rpb24gZm9yIGBpc0VxdWFsYC5cbmZ1bmN0aW9uIGRlZXBFcShhLCBiLCBhU3RhY2ssIGJTdGFjaykge1xuICAgIC8vIFVud3JhcCBhbnkgd3JhcHBlZCBvYmplY3RzLlxuICAgIGEgPSB1bndyYXAoYSk7XG4gICAgYiA9IHVud3JhcChiKTtcbiAgICAvLyBDb21wYXJlIGBbW0NsYXNzXV1gIG5hbWVzLlxuICAgIHZhciBjbGFzc05hbWUgPSB0b1N0cmluZy5jYWxsKGEpO1xuICAgIGlmIChjbGFzc05hbWUgIT09IHRvU3RyaW5nLmNhbGwoYikpXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICBzd2l0Y2ggKGNsYXNzTmFtZSkge1xuICAgICAgICAvLyBTdHJpbmdzLCBudW1iZXJzLCByZWd1bGFyIGV4cHJlc3Npb25zLCBkYXRlcywgYW5kIGJvb2xlYW5zIGFyZSBjb21wYXJlZCBieSB2YWx1ZS5cbiAgICAgICAgY2FzZSBcIltvYmplY3QgUmVnRXhwXVwiOlxuICAgICAgICAvLyBSZWdFeHBzIGFyZSBjb2VyY2VkIHRvIHN0cmluZ3MgZm9yIGNvbXBhcmlzb24gKE5vdGU6ICcnICsgL2EvaSA9PT0gJy9hL2knKVxuICAgICAgICBjYXNlIFwiW29iamVjdCBTdHJpbmddXCI6XG4gICAgICAgICAgICAvLyBQcmltaXRpdmVzIGFuZCB0aGVpciBjb3JyZXNwb25kaW5nIG9iamVjdCB3cmFwcGVycyBhcmUgZXF1aXZhbGVudDsgdGh1cywgYFwiNVwiYCBpc1xuICAgICAgICAgICAgLy8gZXF1aXZhbGVudCB0byBgbmV3IFN0cmluZyhcIjVcIilgLlxuICAgICAgICAgICAgcmV0dXJuIFwiXCIgKyBhID09PSBcIlwiICsgYjtcbiAgICAgICAgY2FzZSBcIltvYmplY3QgTnVtYmVyXVwiOlxuICAgICAgICAgICAgLy8gYE5hTmBzIGFyZSBlcXVpdmFsZW50LCBidXQgbm9uLXJlZmxleGl2ZS5cbiAgICAgICAgICAgIC8vIE9iamVjdChOYU4pIGlzIGVxdWl2YWxlbnQgdG8gTmFOLlxuICAgICAgICAgICAgaWYgKCthICE9PSArYSlcbiAgICAgICAgICAgICAgICByZXR1cm4gK2IgIT09ICtiO1xuICAgICAgICAgICAgLy8gQW4gYGVnYWxgIGNvbXBhcmlzb24gaXMgcGVyZm9ybWVkIGZvciBvdGhlciBudW1lcmljIHZhbHVlcy5cbiAgICAgICAgICAgIHJldHVybiArYSA9PT0gMCA/IDEgLyArYSA9PT0gMSAvIGIgOiArYSA9PT0gK2I7XG4gICAgICAgIGNhc2UgXCJbb2JqZWN0IERhdGVdXCI6XG4gICAgICAgIGNhc2UgXCJbb2JqZWN0IEJvb2xlYW5dXCI6XG4gICAgICAgICAgICAvLyBDb2VyY2UgZGF0ZXMgYW5kIGJvb2xlYW5zIHRvIG51bWVyaWMgcHJpbWl0aXZlIHZhbHVlcy4gRGF0ZXMgYXJlIGNvbXBhcmVkIGJ5IHRoZWlyXG4gICAgICAgICAgICAvLyBtaWxsaXNlY29uZCByZXByZXNlbnRhdGlvbnMuIE5vdGUgdGhhdCBpbnZhbGlkIGRhdGVzIHdpdGggbWlsbGlzZWNvbmQgcmVwcmVzZW50YXRpb25zXG4gICAgICAgICAgICAvLyBvZiBgTmFOYCBhcmUgbm90IGVxdWl2YWxlbnQuXG4gICAgICAgICAgICByZXR1cm4gK2EgPT09ICtiO1xuICAgICAgICBjYXNlIFwiW29iamVjdCBTeW1ib2xdXCI6XG4gICAgICAgICAgICByZXR1cm4gKHR5cGVvZiBTeW1ib2wgIT09IFwidW5kZWZpbmVkXCIgJiYgU3ltYm9sLnZhbHVlT2YuY2FsbChhKSA9PT0gU3ltYm9sLnZhbHVlT2YuY2FsbChiKSk7XG4gICAgfVxuICAgIHZhciBhcmVBcnJheXMgPSBjbGFzc05hbWUgPT09IFwiW29iamVjdCBBcnJheV1cIjtcbiAgICBpZiAoIWFyZUFycmF5cykge1xuICAgICAgICBpZiAodHlwZW9mIGEgIT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgYiAhPSBcIm9iamVjdFwiKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAvLyBPYmplY3RzIHdpdGggZGlmZmVyZW50IGNvbnN0cnVjdG9ycyBhcmUgbm90IGVxdWl2YWxlbnQsIGJ1dCBgT2JqZWN0YHMgb3IgYEFycmF5YHNcbiAgICAgICAgLy8gZnJvbSBkaWZmZXJlbnQgZnJhbWVzIGFyZS5cbiAgICAgICAgdmFyIGFDdG9yID0gYS5jb25zdHJ1Y3RvciwgYkN0b3IgPSBiLmNvbnN0cnVjdG9yO1xuICAgICAgICBpZiAoYUN0b3IgIT09IGJDdG9yICYmXG4gICAgICAgICAgICAhKHR5cGVvZiBhQ3RvciA9PT0gXCJmdW5jdGlvblwiICYmXG4gICAgICAgICAgICAgICAgYUN0b3IgaW5zdGFuY2VvZiBhQ3RvciAmJlxuICAgICAgICAgICAgICAgIHR5cGVvZiBiQ3RvciA9PT0gXCJmdW5jdGlvblwiICYmXG4gICAgICAgICAgICAgICAgYkN0b3IgaW5zdGFuY2VvZiBiQ3RvcikgJiZcbiAgICAgICAgICAgIChcImNvbnN0cnVjdG9yXCIgaW4gYSAmJiBcImNvbnN0cnVjdG9yXCIgaW4gYikpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyBBc3N1bWUgZXF1YWxpdHkgZm9yIGN5Y2xpYyBzdHJ1Y3R1cmVzLiBUaGUgYWxnb3JpdGhtIGZvciBkZXRlY3RpbmcgY3ljbGljXG4gICAgLy8gc3RydWN0dXJlcyBpcyBhZGFwdGVkIGZyb20gRVMgNS4xIHNlY3Rpb24gMTUuMTIuMywgYWJzdHJhY3Qgb3BlcmF0aW9uIGBKT2AuXG4gICAgLy8gSW5pdGlhbGl6aW5nIHN0YWNrIG9mIHRyYXZlcnNlZCBvYmplY3RzLlxuICAgIC8vIEl0J3MgZG9uZSBoZXJlIHNpbmNlIHdlIG9ubHkgbmVlZCB0aGVtIGZvciBvYmplY3RzIGFuZCBhcnJheXMgY29tcGFyaXNvbi5cbiAgICBhU3RhY2sgPSBhU3RhY2sgfHwgW107XG4gICAgYlN0YWNrID0gYlN0YWNrIHx8IFtdO1xuICAgIHZhciBsZW5ndGggPSBhU3RhY2subGVuZ3RoO1xuICAgIHdoaWxlIChsZW5ndGgtLSkge1xuICAgICAgICAvLyBMaW5lYXIgc2VhcmNoLiBQZXJmb3JtYW5jZSBpcyBpbnZlcnNlbHkgcHJvcG9ydGlvbmFsIHRvIHRoZSBudW1iZXIgb2ZcbiAgICAgICAgLy8gdW5pcXVlIG5lc3RlZCBzdHJ1Y3R1cmVzLlxuICAgICAgICBpZiAoYVN0YWNrW2xlbmd0aF0gPT09IGEpXG4gICAgICAgICAgICByZXR1cm4gYlN0YWNrW2xlbmd0aF0gPT09IGI7XG4gICAgfVxuICAgIC8vIEFkZCB0aGUgZmlyc3Qgb2JqZWN0IHRvIHRoZSBzdGFjayBvZiB0cmF2ZXJzZWQgb2JqZWN0cy5cbiAgICBhU3RhY2sucHVzaChhKTtcbiAgICBiU3RhY2sucHVzaChiKTtcbiAgICAvLyBSZWN1cnNpdmVseSBjb21wYXJlIG9iamVjdHMgYW5kIGFycmF5cy5cbiAgICBpZiAoYXJlQXJyYXlzKSB7XG4gICAgICAgIC8vIENvbXBhcmUgYXJyYXkgbGVuZ3RocyB0byBkZXRlcm1pbmUgaWYgYSBkZWVwIGNvbXBhcmlzb24gaXMgbmVjZXNzYXJ5LlxuICAgICAgICBsZW5ndGggPSBhLmxlbmd0aDtcbiAgICAgICAgaWYgKGxlbmd0aCAhPT0gYi5sZW5ndGgpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIC8vIERlZXAgY29tcGFyZSB0aGUgY29udGVudHMsIGlnbm9yaW5nIG5vbi1udW1lcmljIHByb3BlcnRpZXMuXG4gICAgICAgIHdoaWxlIChsZW5ndGgtLSkge1xuICAgICAgICAgICAgaWYgKCFlcShhW2xlbmd0aF0sIGJbbGVuZ3RoXSwgYVN0YWNrLCBiU3RhY2spKVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgLy8gRGVlcCBjb21wYXJlIG9iamVjdHMuXG4gICAgICAgIHZhciBrZXlzJCQxID0gT2JqZWN0LmtleXMoYSksIGtleTtcbiAgICAgICAgbGVuZ3RoID0ga2V5cyQkMS5sZW5ndGg7XG4gICAgICAgIC8vIEVuc3VyZSB0aGF0IGJvdGggb2JqZWN0cyBjb250YWluIHRoZSBzYW1lIG51bWJlciBvZiBwcm9wZXJ0aWVzIGJlZm9yZSBjb21wYXJpbmcgZGVlcCBlcXVhbGl0eS5cbiAgICAgICAgaWYgKE9iamVjdC5rZXlzKGIpLmxlbmd0aCAhPT0gbGVuZ3RoKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB3aGlsZSAobGVuZ3RoLS0pIHtcbiAgICAgICAgICAgIC8vIERlZXAgY29tcGFyZSBlYWNoIG1lbWJlclxuICAgICAgICAgICAga2V5ID0ga2V5cyQkMVtsZW5ndGhdO1xuICAgICAgICAgICAgaWYgKCEoaGFzJDEoYiwga2V5KSAmJiBlcShhW2tleV0sIGJba2V5XSwgYVN0YWNrLCBiU3RhY2spKSlcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gUmVtb3ZlIHRoZSBmaXJzdCBvYmplY3QgZnJvbSB0aGUgc3RhY2sgb2YgdHJhdmVyc2VkIG9iamVjdHMuXG4gICAgYVN0YWNrLnBvcCgpO1xuICAgIGJTdGFjay5wb3AoKTtcbiAgICByZXR1cm4gdHJ1ZTtcbn1cbmZ1bmN0aW9uIHVud3JhcChhKSB7XG4gICAgaWYgKGlzT2JzZXJ2YWJsZUFycmF5JCQxKGEpKVxuICAgICAgICByZXR1cm4gYS5zbGljZSgpO1xuICAgIGlmIChpc0VTNk1hcCQkMShhKSB8fCBpc09ic2VydmFibGVNYXAkJDEoYSkpXG4gICAgICAgIHJldHVybiBBcnJheS5mcm9tKGEuZW50cmllcygpKTtcbiAgICBpZiAoaXNFUzZTZXQkJDEoYSkgfHwgaXNPYnNlcnZhYmxlU2V0JCQxKGEpKVxuICAgICAgICByZXR1cm4gQXJyYXkuZnJvbShhLmVudHJpZXMoKSk7XG4gICAgcmV0dXJuIGE7XG59XG5mdW5jdGlvbiBoYXMkMShhLCBrZXkpIHtcbiAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGEsIGtleSk7XG59XG5cbmZ1bmN0aW9uIG1ha2VJdGVyYWJsZShpdGVyYXRvcikge1xuICAgIGl0ZXJhdG9yW1N5bWJvbC5pdGVyYXRvcl0gPSBzZWxmO1xuICAgIHJldHVybiBpdGVyYXRvcjtcbn1cbmZ1bmN0aW9uIHNlbGYoKSB7XG4gICAgcmV0dXJuIHRoaXM7XG59XG5cbi8qXG5UaGUgb25seSByZWFzb24gZm9yIHRoaXMgZmlsZSB0byBleGlzdCBpcyBwdXJlIGhvcnJvcjpcbldpdGhvdXQgaXQgcm9sbHVwIGNhbiBtYWtlIHRoZSBidW5kbGluZyBmYWlsIGF0IGFueSBwb2ludCBpbiB0aW1lOyB3aGVuIGl0IHJvbGxzIHVwIHRoZSBmaWxlcyBpbiB0aGUgd3Jvbmcgb3JkZXJcbml0IHdpbGwgY2F1c2UgdW5kZWZpbmVkIGVycm9ycyAoZm9yIGV4YW1wbGUgYmVjYXVzZSBzdXBlciBjbGFzc2VzIG9yIGxvY2FsIHZhcmlhYmxlcyBub3QgYmVpbmcgaG9zdGVkKS5cbldpdGggdGhpcyBmaWxlIHRoYXQgd2lsbCBzdGlsbCBoYXBwZW4sXG5idXQgYXQgbGVhc3QgaW4gdGhpcyBmaWxlIHdlIGNhbiBtYWdpY2FsbHkgcmVvcmRlciB0aGUgaW1wb3J0cyB3aXRoIHRyaWFsIGFuZCBlcnJvciB1bnRpbCB0aGUgYnVpbGQgc3VjY2VlZHMgYWdhaW4uXG4qL1xuXG4vKipcbiAqIChjKSBNaWNoZWwgV2VzdHN0cmF0ZSAyMDE1IC0gMjAxOFxuICogTUlUIExpY2Vuc2VkXG4gKlxuICogV2VsY29tZSB0byB0aGUgbW9ieCBzb3VyY2VzISBUbyBnZXQgYW4gZ2xvYmFsIG92ZXJ2aWV3IG9mIGhvdyBNb2JYIGludGVybmFsbHkgd29ya3MsXG4gKiB0aGlzIGlzIGEgZ29vZCBwbGFjZSB0byBzdGFydDpcbiAqIGh0dHBzOi8vbWVkaXVtLmNvbS9AbXdlc3RzdHJhdGUvYmVjb21pbmctZnVsbHktcmVhY3RpdmUtYW4taW4tZGVwdGgtZXhwbGFuYXRpb24tb2YtbW9ic2VydmFibGUtNTU5OTUyNjJhMjU0Iy54dmJoNnFkNzRcbiAqXG4gKiBTb3VyY2UgZm9sZGVyczpcbiAqID09PT09PT09PT09PT09PVxuICpcbiAqIC0gYXBpLyAgICAgTW9zdCBvZiB0aGUgcHVibGljIHN0YXRpYyBtZXRob2RzIGV4cG9zZWQgYnkgdGhlIG1vZHVsZSBjYW4gYmUgZm91bmQgaGVyZS5cbiAqIC0gY29yZS8gICAgSW1wbGVtZW50YXRpb24gb2YgdGhlIE1vYlggYWxnb3JpdGhtOyBhdG9tcywgZGVyaXZhdGlvbnMsIHJlYWN0aW9ucywgZGVwZW5kZW5jeSB0cmVlcywgb3B0aW1pemF0aW9ucy4gQ29vbCBzdHVmZiBjYW4gYmUgZm91bmQgaGVyZS5cbiAqIC0gdHlwZXMvICAgQWxsIHRoZSBtYWdpYyB0aGF0IGlzIG5lZWQgdG8gaGF2ZSBvYnNlcnZhYmxlIG9iamVjdHMsIGFycmF5cyBhbmQgdmFsdWVzIGlzIGluIHRoaXMgZm9sZGVyLiBJbmNsdWRpbmcgdGhlIG1vZGlmaWVycyBsaWtlIGBhc0ZsYXRgLlxuICogLSB1dGlscy8gICBVdGlsaXR5IHN0dWZmLlxuICpcbiAqL1xuaWYgKHR5cGVvZiBQcm94eSA9PT0gXCJ1bmRlZmluZWRcIiB8fCB0eXBlb2YgU3ltYm9sID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiW21vYnhdIE1vYlggNSsgcmVxdWlyZXMgUHJveHkgYW5kIFN5bWJvbCBvYmplY3RzLiBJZiB5b3VyIGVudmlyb25tZW50IGRvZXNuJ3Qgc3VwcG9ydCBQcm94eSBvYmplY3RzLCBwbGVhc2UgZG93bmdyYWRlIHRvIE1vYlggNC4gRm9yIFJlYWN0IE5hdGl2ZSBBbmRyb2lkLCBjb25zaWRlciB1cGdyYWRpbmcgSlNDb3JlLlwiKTtcbn1cbnRyeSB7XG4gICAgLy8gZGVmaW5lIHByb2Nlc3MuZW52IGlmIG5lZWRlZFxuICAgIC8vIGlmIHRoaXMgaXMgbm90IGEgcHJvZHVjdGlvbiBidWlsZCBpbiB0aGUgZmlyc3QgcGxhY2VcbiAgICAvLyAoaW4gd2hpY2ggY2FzZSB0aGUgZXhwcmVzc2lvbiBiZWxvdyB3b3VsZCBiZSBzdWJzdGl0dXRlZCB3aXRoICdwcm9kdWN0aW9uJylcbiAgICBwcm9jZXNzLmVudi5OT0RFX0VOVjtcbn1cbmNhdGNoIChlKSB7XG4gICAgdmFyIGcgPSB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDogZ2xvYmFsO1xuICAgIGlmICh0eXBlb2YgcHJvY2VzcyA9PT0gXCJ1bmRlZmluZWRcIilcbiAgICAgICAgZy5wcm9jZXNzID0ge307XG4gICAgZy5wcm9jZXNzLmVudiA9IHt9O1xufVxuXG4oZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIHRlc3RDb2RlTWluaWZpY2F0aW9uKCkgeyB9XG4gICAgaWYgKHRlc3RDb2RlTWluaWZpY2F0aW9uLm5hbWUgIT09IFwidGVzdENvZGVNaW5pZmljYXRpb25cIiAmJlxuICAgICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgJiZcbiAgICAgICAgcHJvY2Vzcy5lbnYuSUdOT1JFX01PQlhfTUlOSUZZX1dBUk5JTkcgIT09IFwidHJ1ZVwiKSB7XG4gICAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgLy8gVGVtcGxhdGUgbGl0ZXJhbChiYWNrdGljaykgaXMgdXNlZCBmb3IgZml4IGlzc3VlIHdpdGggcm9sbHVwLXBsdWdpbi1jb21tb25qcyBodHRwczovL2dpdGh1Yi5jb20vcm9sbHVwL3JvbGx1cC1wbHVnaW4tY29tbW9uanMvaXNzdWVzLzM0NFxuICAgICAgICBcIlttb2J4XSB5b3UgYXJlIHJ1bm5pbmcgYSBtaW5pZmllZCBidWlsZCwgYnV0ICdwcm9jZXNzLmVudi5OT0RFX0VOVicgd2FzIG5vdCBzZXQgdG8gJ3Byb2R1Y3Rpb24nIGluIHlvdXIgYnVuZGxlci4gVGhpcyByZXN1bHRzIGluIGFuIHVubmVjZXNzYXJpbHkgbGFyZ2UgYW5kIHNsb3cgYnVuZGxlXCIpO1xuICAgIH1cbn0pKCk7XG4vLyBEZXZ0b29scyBzdXBwb3J0XG5pZiAodHlwZW9mIF9fTU9CWF9ERVZUT09MU19HTE9CQUxfSE9PS19fID09PSBcIm9iamVjdFwiKSB7XG4gICAgLy8gU2VlOiBodHRwczovL2dpdGh1Yi5jb20vYW5keWtvZy9tb2J4LWRldnRvb2xzL1xuICAgIF9fTU9CWF9ERVZUT09MU19HTE9CQUxfSE9PS19fLmluamVjdE1vYngoe1xuICAgICAgICBzcHk6IHNweSQkMSxcbiAgICAgICAgZXh0cmFzOiB7XG4gICAgICAgICAgICBnZXREZWJ1Z05hbWU6IGdldERlYnVnTmFtZSQkMVxuICAgICAgICB9LFxuICAgICAgICAkbW9ieDogJG1vYngkJDFcbiAgICB9KTtcbn1cblxuZXhwb3J0IHsgUmVhY3Rpb24kJDEgYXMgUmVhY3Rpb24sIHVudHJhY2tlZCQkMSBhcyB1bnRyYWNrZWQsIElEZXJpdmF0aW9uU3RhdGUsIGNyZWF0ZUF0b20kJDEgYXMgY3JlYXRlQXRvbSwgc3B5JCQxIGFzIHNweSwgY29tcGFyZXIkJDEgYXMgY29tcGFyZXIsIGlzT2JzZXJ2YWJsZU9iamVjdCQkMSBhcyBpc09ic2VydmFibGVPYmplY3QsIGlzT2JzZXJ2YWJsZVZhbHVlJCQxIGFzIGlzQm94ZWRPYnNlcnZhYmxlLCBpc09ic2VydmFibGVBcnJheSQkMSBhcyBpc09ic2VydmFibGVBcnJheSwgT2JzZXJ2YWJsZU1hcCQkMSBhcyBPYnNlcnZhYmxlTWFwLCBpc09ic2VydmFibGVNYXAkJDEgYXMgaXNPYnNlcnZhYmxlTWFwLCBPYnNlcnZhYmxlU2V0JCQxIGFzIE9ic2VydmFibGVTZXQsIGlzT2JzZXJ2YWJsZVNldCQkMSBhcyBpc09ic2VydmFibGVTZXQsIHRyYW5zYWN0aW9uJCQxIGFzIHRyYW5zYWN0aW9uLCBvYnNlcnZhYmxlJCQxIGFzIG9ic2VydmFibGUsIGNvbXB1dGVkJCQxIGFzIGNvbXB1dGVkLCBpc09ic2VydmFibGUkJDEgYXMgaXNPYnNlcnZhYmxlLCBpc09ic2VydmFibGVQcm9wJCQxIGFzIGlzT2JzZXJ2YWJsZVByb3AsIGlzQ29tcHV0ZWQkJDEgYXMgaXNDb21wdXRlZCwgaXNDb21wdXRlZFByb3AkJDEgYXMgaXNDb21wdXRlZFByb3AsIGV4dGVuZE9ic2VydmFibGUkJDEgYXMgZXh0ZW5kT2JzZXJ2YWJsZSwgb2JzZXJ2ZSQkMSBhcyBvYnNlcnZlLCBpbnRlcmNlcHQkJDEgYXMgaW50ZXJjZXB0LCBhdXRvcnVuJCQxIGFzIGF1dG9ydW4sIHJlYWN0aW9uJCQxIGFzIHJlYWN0aW9uLCB3aGVuJCQxIGFzIHdoZW4sIGFjdGlvbiQkMSBhcyBhY3Rpb24sIGlzQWN0aW9uJCQxIGFzIGlzQWN0aW9uLCBydW5JbkFjdGlvbiQkMSBhcyBydW5JbkFjdGlvbiwga2V5cyQkMSBhcyBrZXlzLCB2YWx1ZXMkJDEgYXMgdmFsdWVzLCBlbnRyaWVzJCQxIGFzIGVudHJpZXMsIHNldCQkMSBhcyBzZXQsIHJlbW92ZSQkMSBhcyByZW1vdmUsIGhhcyQkMSBhcyBoYXMsIGdldCQkMSBhcyBnZXQsIGRlY29yYXRlJCQxIGFzIGRlY29yYXRlLCBjb25maWd1cmUkJDEgYXMgY29uZmlndXJlLCBvbkJlY29tZU9ic2VydmVkJCQxIGFzIG9uQmVjb21lT2JzZXJ2ZWQsIG9uQmVjb21lVW5vYnNlcnZlZCQkMSBhcyBvbkJlY29tZVVub2JzZXJ2ZWQsIGZsb3ckJDEgYXMgZmxvdywgdG9KUyQkMSBhcyB0b0pTLCB0cmFjZSQkMSBhcyB0cmFjZSwgZ2V0RGVwZW5kZW5jeVRyZWUkJDEgYXMgZ2V0RGVwZW5kZW5jeVRyZWUsIGdldE9ic2VydmVyVHJlZSQkMSBhcyBnZXRPYnNlcnZlclRyZWUsIHJlc2V0R2xvYmFsU3RhdGUkJDEgYXMgX3Jlc2V0R2xvYmFsU3RhdGUsIGdldEdsb2JhbFN0YXRlJCQxIGFzIF9nZXRHbG9iYWxTdGF0ZSwgZ2V0RGVidWdOYW1lJCQxIGFzIGdldERlYnVnTmFtZSwgZ2V0QXRvbSQkMSBhcyBnZXRBdG9tLCBnZXRBZG1pbmlzdHJhdGlvbiQkMSBhcyBfZ2V0QWRtaW5pc3RyYXRpb24sIGFsbG93U3RhdGVDaGFuZ2VzJCQxIGFzIF9hbGxvd1N0YXRlQ2hhbmdlcywgYWxsb3dTdGF0ZUNoYW5nZXNJbnNpZGVDb21wdXRlZCQkMSBhcyBfYWxsb3dTdGF0ZUNoYW5nZXNJbnNpZGVDb21wdXRlZCwgaXNBcnJheUxpa2UkJDEgYXMgaXNBcnJheUxpa2UsICRtb2J4JCQxIGFzICRtb2J4LCBpc0NvbXB1dGluZ0Rlcml2YXRpb24kJDEgYXMgX2lzQ29tcHV0aW5nRGVyaXZhdGlvbiwgb25SZWFjdGlvbkVycm9yJCQxIGFzIG9uUmVhY3Rpb25FcnJvciwgaW50ZXJjZXB0UmVhZHMkJDEgYXMgX2ludGVyY2VwdFJlYWRzIH07XG4iLCIvLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcblxuLy8gY2FjaGVkIGZyb20gd2hhdGV2ZXIgZ2xvYmFsIGlzIHByZXNlbnQgc28gdGhhdCB0ZXN0IHJ1bm5lcnMgdGhhdCBzdHViIGl0XG4vLyBkb24ndCBicmVhayB0aGluZ3MuICBCdXQgd2UgbmVlZCB0byB3cmFwIGl0IGluIGEgdHJ5IGNhdGNoIGluIGNhc2UgaXQgaXNcbi8vIHdyYXBwZWQgaW4gc3RyaWN0IG1vZGUgY29kZSB3aGljaCBkb2Vzbid0IGRlZmluZSBhbnkgZ2xvYmFscy4gIEl0J3MgaW5zaWRlIGFcbi8vIGZ1bmN0aW9uIGJlY2F1c2UgdHJ5L2NhdGNoZXMgZGVvcHRpbWl6ZSBpbiBjZXJ0YWluIGVuZ2luZXMuXG5cbnZhciBjYWNoZWRTZXRUaW1lb3V0O1xudmFyIGNhY2hlZENsZWFyVGltZW91dDtcblxuZnVuY3Rpb24gZGVmYXVsdFNldFRpbW91dCgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3NldFRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbmZ1bmN0aW9uIGRlZmF1bHRDbGVhclRpbWVvdXQgKCkge1xuICAgIHRocm93IG5ldyBFcnJvcignY2xlYXJUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG4oZnVuY3Rpb24gKCkge1xuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc2V0VGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2YgY2xlYXJUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgIH1cbn0gKCkpXG5mdW5jdGlvbiBydW5UaW1lb3V0KGZ1bikge1xuICAgIGlmIChjYWNoZWRTZXRUaW1lb3V0ID09PSBzZXRUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICAvLyBpZiBzZXRUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkU2V0VGltZW91dCA9PT0gZGVmYXVsdFNldFRpbW91dCB8fCAhY2FjaGVkU2V0VGltZW91dCkgJiYgc2V0VGltZW91dCkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dChmdW4sIDApO1xuICAgIH0gY2F0Y2goZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwobnVsbCwgZnVuLCAwKTtcbiAgICAgICAgfSBjYXRjaChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yXG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKHRoaXMsIGZ1biwgMCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxufVxuZnVuY3Rpb24gcnVuQ2xlYXJUaW1lb3V0KG1hcmtlcikge1xuICAgIGlmIChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGNsZWFyVGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICAvLyBpZiBjbGVhclRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGRlZmF1bHRDbGVhclRpbWVvdXQgfHwgIWNhY2hlZENsZWFyVGltZW91dCkgJiYgY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCAgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbChudWxsLCBtYXJrZXIpO1xuICAgICAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yLlxuICAgICAgICAgICAgLy8gU29tZSB2ZXJzaW9ucyBvZiBJLkUuIGhhdmUgZGlmZmVyZW50IHJ1bGVzIGZvciBjbGVhclRpbWVvdXQgdnMgc2V0VGltZW91dFxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKHRoaXMsIG1hcmtlcik7XG4gICAgICAgIH1cbiAgICB9XG5cblxuXG59XG52YXIgcXVldWUgPSBbXTtcbnZhciBkcmFpbmluZyA9IGZhbHNlO1xudmFyIGN1cnJlbnRRdWV1ZTtcbnZhciBxdWV1ZUluZGV4ID0gLTE7XG5cbmZ1bmN0aW9uIGNsZWFuVXBOZXh0VGljaygpIHtcbiAgICBpZiAoIWRyYWluaW5nIHx8ICFjdXJyZW50UXVldWUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIGlmIChjdXJyZW50UXVldWUubGVuZ3RoKSB7XG4gICAgICAgIHF1ZXVlID0gY3VycmVudFF1ZXVlLmNvbmNhdChxdWV1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgIH1cbiAgICBpZiAocXVldWUubGVuZ3RoKSB7XG4gICAgICAgIGRyYWluUXVldWUoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRyYWluUXVldWUoKSB7XG4gICAgaWYgKGRyYWluaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHRpbWVvdXQgPSBydW5UaW1lb3V0KGNsZWFuVXBOZXh0VGljayk7XG4gICAgZHJhaW5pbmcgPSB0cnVlO1xuXG4gICAgdmFyIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB3aGlsZShsZW4pIHtcbiAgICAgICAgY3VycmVudFF1ZXVlID0gcXVldWU7XG4gICAgICAgIHF1ZXVlID0gW107XG4gICAgICAgIHdoaWxlICgrK3F1ZXVlSW5kZXggPCBsZW4pIHtcbiAgICAgICAgICAgIGlmIChjdXJyZW50UXVldWUpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50UXVldWVbcXVldWVJbmRleF0ucnVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgICAgICBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgfVxuICAgIGN1cnJlbnRRdWV1ZSA9IG51bGw7XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBydW5DbGVhclRpbWVvdXQodGltZW91dCk7XG59XG5cbnByb2Nlc3MubmV4dFRpY2sgPSBmdW5jdGlvbiAoZnVuKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcXVldWUucHVzaChuZXcgSXRlbShmdW4sIGFyZ3MpKTtcbiAgICBpZiAocXVldWUubGVuZ3RoID09PSAxICYmICFkcmFpbmluZykge1xuICAgICAgICBydW5UaW1lb3V0KGRyYWluUXVldWUpO1xuICAgIH1cbn07XG5cbi8vIHY4IGxpa2VzIHByZWRpY3RpYmxlIG9iamVjdHNcbmZ1bmN0aW9uIEl0ZW0oZnVuLCBhcnJheSkge1xuICAgIHRoaXMuZnVuID0gZnVuO1xuICAgIHRoaXMuYXJyYXkgPSBhcnJheTtcbn1cbkl0ZW0ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmZ1bi5hcHBseShudWxsLCB0aGlzLmFycmF5KTtcbn07XG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcbnByb2Nlc3MuZW52ID0ge307XG5wcm9jZXNzLmFyZ3YgPSBbXTtcbnByb2Nlc3MudmVyc2lvbiA9ICcnOyAvLyBlbXB0eSBzdHJpbmcgdG8gYXZvaWQgcmVnZXhwIGlzc3Vlc1xucHJvY2Vzcy52ZXJzaW9ucyA9IHt9O1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRPbmNlTGlzdGVuZXIgPSBub29wO1xuXG5wcm9jZXNzLmxpc3RlbmVycyA9IGZ1bmN0aW9uIChuYW1lKSB7IHJldHVybiBbXSB9XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcblxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnLycgfTtcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5wcm9jZXNzLnVtYXNrID0gZnVuY3Rpb24oKSB7IHJldHVybiAwOyB9O1xuIiwidmFyIGc7XG5cbi8vIFRoaXMgd29ya3MgaW4gbm9uLXN0cmljdCBtb2RlXG5nID0gKGZ1bmN0aW9uKCkge1xuXHRyZXR1cm4gdGhpcztcbn0pKCk7XG5cbnRyeSB7XG5cdC8vIFRoaXMgd29ya3MgaWYgZXZhbCBpcyBhbGxvd2VkIChzZWUgQ1NQKVxuXHRnID0gZyB8fCBuZXcgRnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSgpO1xufSBjYXRjaCAoZSkge1xuXHQvLyBUaGlzIHdvcmtzIGlmIHRoZSB3aW5kb3cgcmVmZXJlbmNlIGlzIGF2YWlsYWJsZVxuXHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gXCJvYmplY3RcIikgZyA9IHdpbmRvdztcbn1cblxuLy8gZyBjYW4gc3RpbGwgYmUgdW5kZWZpbmVkLCBidXQgbm90aGluZyB0byBkbyBhYm91dCBpdC4uLlxuLy8gV2UgcmV0dXJuIHVuZGVmaW5lZCwgaW5zdGVhZCBvZiBub3RoaW5nIGhlcmUsIHNvIGl0J3Ncbi8vIGVhc2llciB0byBoYW5kbGUgdGhpcyBjYXNlLiBpZighZ2xvYmFsKSB7IC4uLn1cblxubW9kdWxlLmV4cG9ydHMgPSBnO1xuIiwiaW1wb3J0IFJvb3RTdG9yZSBmcm9tIFwiLi4vcG9wdXAvc3RvcmVcIjtcclxuaW1wb3J0IGhpc3RvcnkgZnJvbSBcIi4vdGFiL2hpc3RvcnlcIjtcclxuaW1wb3J0IG9uSW5zdGFsbCBmcm9tIFwiLi9ydW50aW1lL29uSW5zdGFsbFwiO1xyXG5pbXBvcnQgb25NZXNzYWdlIGZyb20gXCIuL3J1bnRpbWUvb25NZXNzYWdlXCI7XHJcblxyXG5jb25zdCBzdG9yZSA9IG5ldyBSb290U3RvcmUoKTtcclxuXHJcbmhpc3Rvcnkoc3RvcmUud2VidG9vbiwgc3RvcmUub3B0aW9uKTtcclxub25JbnN0YWxsKHN0b3JlLndlYnRvb24sIHN0b3JlLm9wdGlvbik7XHJcbm9uTWVzc2FnZShzdG9yZS53ZWJ0b29uLCBzdG9yZS5vcHRpb24pO1xyXG4iLCJpbXBvcnQgV2VidG9vblN0b3JlIGZyb20gXCIuLi8uLi9wb3B1cC9zdG9yZS93ZWJ0b29uXCI7XHJcbmltcG9ydCBPcHRpb25TdG9yZSBmcm9tIFwiLi4vLi4vcG9wdXAvc3RvcmUvb3B0aW9uXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbih3ZWJ0b29uOiBXZWJ0b29uU3RvcmUsIG9wdGlvbjogT3B0aW9uU3RvcmUpIHtcclxuICBjaHJvbWUucnVudGltZS5vbkluc3RhbGxlZC5hZGRMaXN0ZW5lcihkZXRhaWxzID0+IHtcclxuICAgIGlmIChkZXRhaWxzLnJlYXNvbiA9PT0gXCJpbnN0YWxsXCIpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJJbml0IFN0YXJ0XCIpO1xyXG4gICAgICB3ZWJ0b29uLnNldFZpc2l0c0Zyb21DaHJvbWUoKTtcclxuICAgIH0gZWxzZSBpZiAoZGV0YWlscy5yZWFzb24gPT09IFwidXBkYXRlXCIpIHtcclxuICAgICAgY29uc3QgY3VycmVudFZlcnNpb24gPSBjaHJvbWUucnVudGltZS5nZXRNYW5pZmVzdCgpLnZlcnNpb247XHJcbiAgICAgIGlmIChkZXRhaWxzLnByZXZpb3VzVmVyc2lvbiAhPSBjdXJyZW50VmVyc2lvbikge1xyXG4gICAgICAgIGNocm9tZS5icm93c2VyQWN0aW9uLnNldEJhZGdlVGV4dCh7XHJcbiAgICAgICAgICB0ZXh0OiBcIiBcIlxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSk7XHJcbn1cclxuIiwiaW1wb3J0IFdlYnRvb25TdG9yZSBmcm9tIFwiLi4vLi4vcG9wdXAvc3RvcmUvd2VidG9vblwiO1xyXG5pbXBvcnQgT3B0aW9uU3RvcmUgZnJvbSBcIi4uLy4uL3BvcHVwL3N0b3JlL29wdGlvblwiO1xyXG5pbXBvcnQgeyBDaHJvbWVNZXNzYWdlIH0gZnJvbSBcIi4uLy4uLy4uL0B0eXBlcy9jb21tZW5kXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbih3ZWJ0b29uOiBXZWJ0b29uU3RvcmUsIG9wdGlvbjogT3B0aW9uU3RvcmUpIHtcclxuICBjaHJvbWUucnVudGltZS5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIoKG1lc3NhZ2U6IENocm9tZU1lc3NhZ2UsIHNlbmRlciwgcmVzcG9uc2UpID0+IHtcclxuICAgIGNvbnN0IHBhcmFtID0gbmV3IFVSTChzZW5kZXIudXJsKS5zZWFyY2hQYXJhbXM7XHJcbiAgICBjb25zdCB3aWQgPSBwYXJhbS5nZXQoXCJ0aXRsZUlkXCIpO1xyXG4gICAgY29uc3Qgbm8gPSBwYXJhbS5nZXQoXCJub1wiKTtcclxuICAgIGlmIChtZXNzYWdlICYmIG1lc3NhZ2UuY29tbWFuZCA9PT0gXCJvcGVuVGFiXCIpIHtcclxuICAgICAgY29uc3QgbGluayA9IHNlbmRlci51cmwucmVwbGFjZShcIm0uY29taWNcIiwgXCJjb21pY1wiKTtcclxuICAgICAgLy8gRm9yY2UgVGFiXHJcbiAgICAgIGNocm9tZS50YWJzLmNyZWF0ZSh7XHJcbiAgICAgICAgdXJsOiBsaW5rXHJcbiAgICAgIH0pO1xyXG4gICAgICAvLyBvcHRpb24ub3BlblRhYihsaW5rKTtcclxuICAgICAgcmVzcG9uc2UobnVsbCk7XHJcbiAgICB9IGVsc2UgaWYgKHdpZCAmJiBubyAmJiBtZXNzYWdlLnNjcm9sbCAmJiBvcHRpb24uc2F2ZVNjcm9sbCkge1xyXG4gICAgICBtZXNzYWdlLnNjcm9sbCA9IE1hdGgucm91bmQobWVzc2FnZS5zY3JvbGwgKiAxMDApO1xyXG4gICAgICBpZiAobWVzc2FnZS5zY3JvbGwgPD0gMiB8fCBtZXNzYWdlLnNjcm9sbCA+PSA5OCkge1xyXG4gICAgICAgIGlmICh3ZWJ0b29uLnNjcm9sbHNbd2lkXSAmJiB3ZWJ0b29uLnNjcm9sbHNbd2lkXVtub10pIHtcclxuICAgICAgICAgIGRlbGV0ZSB3ZWJ0b29uLnNjcm9sbHNbd2lkXVtub107XHJcbiAgICAgICAgICBpZiAoT2JqZWN0LmtleXMod2VidG9vbi5zY3JvbGxzW3dpZF0pLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgIGRlbGV0ZSB3ZWJ0b29uLnNjcm9sbHNbd2lkXTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgd2VidG9vbi5zY3JvbGxzID0gd2VidG9vbi5zY3JvbGxzO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgICBpZiAoIXdlYnRvb24uc2Nyb2xsc1t3aWRdKSB7XHJcbiAgICAgICAgd2VidG9vbi5zY3JvbGxzW3dpZF0gPSB7fTtcclxuICAgICAgfVxyXG4gICAgICB3ZWJ0b29uLnNjcm9sbHNbd2lkXVtub10gPSBtZXNzYWdlLnNjcm9sbDtcclxuICAgICAgLy8gU2F2ZSB0byBTdG9yZVxyXG4gICAgICB3ZWJ0b29uLnNjcm9sbHMgPSB3ZWJ0b29uLnNjcm9sbHM7XHJcbiAgICB9IGVsc2UgaWYgKG1lc3NhZ2UgJiYgbWVzc2FnZS5jb21tYW5kID09PSBcInJlbG9hZFwiKSB7XHJcbiAgICAgIGxvY2F0aW9uLnJlbG9hZCgpO1xyXG4gICAgfVxyXG4gIH0pO1xyXG59XHJcbiIsImltcG9ydCBXZWJ0b29uU3RvcmUgZnJvbSBcIi4uLy4uL3BvcHVwL3N0b3JlL3dlYnRvb25cIjtcclxuaW1wb3J0IE9wdGlvblN0b3JlIGZyb20gXCIuLi8uLi9wb3B1cC9zdG9yZS9vcHRpb25cIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0ICh3ZWJ0b29uOiBXZWJ0b29uU3RvcmUsIG9wdGlvbjogT3B0aW9uU3RvcmUpID0+IHtcclxuICBmdW5jdGlvbiBkaXNwbGF5SGlzdG9yeSh0YWJJZDogbnVtYmVyLCB3ZWJ0b29uSWQ6IHN0cmluZykge1xyXG4gICAgaWYgKHdlYnRvb24udmlzaXRzW3dlYnRvb25JZF0gJiYgb3B0aW9uLnNob3dIaXN0b3J5KSB7XHJcbiAgICAgIE9iamVjdC5rZXlzKHdlYnRvb24udmlzaXRzW3dlYnRvb25JZF0pLmZvckVhY2goa2V5ID0+IHtcclxuICAgICAgICBjaHJvbWUudGFicy5leGVjdXRlU2NyaXB0KHRhYklkLCB7XHJcbiAgICAgICAgICBjb2RlOiBgdmFyIHdsb2cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYVtocmVmKj0nZGV0YWlsLm5obj90aXRsZUlkPSR7d2VidG9vbklkfSZubz0ke2tleX0nXVwiKTtcclxuICAgICAgICAgIGlmICh3bG9nKXtcclxuICAgICAgICAgICAgd2xvZz13bG9nLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudDtcclxuICAgICAgICAgICAgd2xvZy5zdHlsZS5iYWNrZ3JvdW5kPVwibGlnaHRncmF5XCI7XHJcbiAgICAgICAgICAgIHdsb2cudGl0bGU9XCIke25ldyBEYXRlKFxyXG4gICAgICAgICAgICAgIHdlYnRvb24udmlzaXRzW3dlYnRvb25JZF1ba2V5XSAqIDEwMDBcclxuICAgICAgICAgICAgKS50b0xvY2FsZVN0cmluZygpICsgXCLsl5Ag67SEXCJ9XCJcclxuICAgICAgICB9YFxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGNoZWNrU2Nyb2xsKHRhYklkOiBudW1iZXIpIHtcclxuICAgIGNocm9tZS50YWJzLmV4ZWN1dGVTY3JpcHQodGFiSWQsIHtcclxuICAgICAgY29kZTogYFxyXG4gICAgICB2YXIgY2hlY2tQZXJjZW50O1xyXG4gICAgICBmdW5jdGlvbiBjaGVja1NjKCBldmVudCApIHtcclxuICAgICAgICAgIHdpbmRvdy5jbGVhclRpbWVvdXQoIGNoZWNrUGVyY2VudCApO1xyXG4gICAgICAgICAgY2hlY2tQZXJjZW50ID0gc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2UoJyR7XHJcbiAgICAgICAgY2hyb21lLnJ1bnRpbWUuaWRcclxuICAgICAgfScsIHtzY3JvbGwgOiAoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcCAtIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIud3Rfdmlld2VyXCIpLmNoaWxkTm9kZXNbMV0ub2Zmc2V0VG9wKSAvIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIud3Rfdmlld2VyXCIpLnNjcm9sbEhlaWdodCB9KVxyXG4gICAgICB9LCAxMDApO1xyXG59XHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLGNoZWNrU2MsIGZhbHNlKTtgXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHNldFNjcm9sbCh0YWJJZDogbnVtYmVyLCBzY3JvbGw6IG51bWJlcikge1xyXG4gICAgY29uc29sZS5sb2coXCJzZXRTY3JvbGxcIik7XHJcbiAgICBpZiAob3B0aW9uLnNjcm9sbEFsZXJ0KSB7XHJcbiAgICAgIGNocm9tZS50YWJzLmV4ZWN1dGVTY3JpcHQodGFiSWQsIHtcclxuICAgICAgICBjb2RlOiBgaWYgKGNvbmZpcm0oXCJbd2VidG9vbiBleHRlbnNpb25dIOydtOyghOyXkCDrs7gg6riw66Gd7J20IOuCqOyVhOyeiOyKteuLiOuLpC4gKCR7c2Nyb2xsfSUpXFxcXG7snbTslrTrs7Tsi5zqsqDsirXri4jquYw/XCIpKTtcclxuICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIud3Rfdmlld2VyXCIpLmNoaWxkTm9kZXNbMV0ub2Zmc2V0VG9wICsgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi53dF92aWV3ZXJcIikuc2Nyb2xsSGVpZ2h0ICogJHtzY3JvbGwgL1xyXG4gICAgICAgIDEwMH1gXHJcbiAgICAgIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY2hyb21lLnRhYnMuZXhlY3V0ZVNjcmlwdCh0YWJJZCwge1xyXG4gICAgICAgIGNvZGU6IGBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi53dF92aWV3ZXJcIikuY2hpbGROb2Rlc1sxXS5vZmZzZXRUb3AgKyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnd0X3ZpZXdlclwiKS5zY3JvbGxIZWlnaHQgKiAke3Njcm9sbCAvXHJcbiAgICAgICAgICAxMDB9YFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGF1dG9OZXh0KHRhYklkOiBudW1iZXIsIGlzQXV0bzogYm9vbGVhbikge1xyXG4gICAgaWYgKGlzQXV0bylcclxuICAgICAgY2hyb21lLnRhYnMuZXhlY3V0ZVNjcmlwdCh0YWJJZCwge1xyXG4gICAgICAgIGNvZGU6IGB2YXIgd3UgPSBuZXcgVVJMKHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkF1dG9OZXh0XCIpO1xyXG4gICAgICAgIHd1LnNlYXJjaFBhcmFtcy5zZXQoXCJub1wiLCB3dS5zZWFyY2hQYXJhbXMuZ2V0KFwibm9cIikqMSsxKVxyXG4gICAgICAgIHZhciBpc1Njcm9sbGluZztcclxuICAgICAgICBmdW5jdGlvbiBjaGVja1Njcm9sbHMoIGV2ZW50ICkge1xyXG4gICAgICAgICAgICB3aW5kb3cuY2xlYXJUaW1lb3V0KCBpc1Njcm9sbGluZyApO1xyXG4gICAgICAgICAgICBpc1Njcm9sbGluZyA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbEhlaWdodC1kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wPDE1MDApXHJcbiAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gd3UuaHJlZjtcclxuICAgICAgICAgICAgfSwgNTAwKTtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLGNoZWNrU2Nyb2xscywgZmFsc2UpO1xyXG4gICAgICAgIGBcclxuICAgICAgfSk7XHJcbiAgICBlbHNlIHtcclxuICAgICAgY2hyb21lLnRhYnMuZXhlY3V0ZVNjcmlwdCh0YWJJZCwge1xyXG4gICAgICAgIGNvZGU6IGBcclxuICAgICAgICBpZiAod2luZG93W1wiY2hlY2tTY3JvbGxzXCJdKVxyXG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBjaGVja1Njcm9sbHMpYFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGNoZWNrU2Nyb2xsTW9iaWxlKHRhYklkOiBudW1iZXIpIHtcclxuICAgIGNocm9tZS50YWJzLmV4ZWN1dGVTY3JpcHQodGFiSWQsIHtcclxuICAgICAgY29kZTogYFxyXG4gICAgICB2YXIgY2hlY2tQZXJjZW50O1xyXG4gICAgICBmdW5jdGlvbiBjaGVja1NjKCBldmVudCApIHtcclxuICAgICAgICB3aW5kb3cuY2xlYXJUaW1lb3V0KCBjaGVja1BlcmNlbnQgKTtcclxuICAgICAgICBjaGVja1BlcmNlbnQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGNocm9tZS5ydW50aW1lLnNlbmRNZXNzYWdlKFwiJHtcclxuICAgICAgICAgIGNocm9tZS5ydW50aW1lLmlkXHJcbiAgICAgICAgfVwiLCB7c2Nyb2xsIDogZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcCAvIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdG9vbkxheWVyPnVsXCIpLnNjcm9sbEhlaWdodCB9KVxyXG4gICAgICB9LCAxMDApXHJcbiAgICB9XHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJyxjaGVja1NjLCBmYWxzZSk7YFxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBzZXRTY3JvbGxNb2JpbGUodGFiSWQ6IG51bWJlciwgc2Nyb2xsOiBudW1iZXIpIHtcclxuICAgIGNocm9tZS50YWJzLmV4ZWN1dGVTY3JpcHQodGFiSWQsIHtcclxuICAgICAgY29kZTogYHNldFRpbWVvdXQoKCk9Pntkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0b29uTGF5ZXI+dWxcIikuc2Nyb2xsSGVpZ2h0ICogJHtzY3JvbGwgL1xyXG4gICAgICAgIDEwMH19LCA1MDApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGBcclxuICAgIH0pO1xyXG4gIH1cclxuICBjaHJvbWUudGFicy5vblVwZGF0ZWQuYWRkTGlzdGVuZXIoKHRhYklkLCBpbmZvLCB0YWIpID0+IHtcclxuICAgIGlmIChpbmZvLnN0YXR1cyAmJiBpbmZvLnN0YXR1cyA9PT0gXCJjb21wbGV0ZVwiKSB7XHJcbiAgICAgIGNvbnN0IHVybCA9IG5ldyBVUkwodGFiLnVybCk7XHJcbiAgICAgIGlmICh1cmwuaG9zdCA9PT0gXCJjb21pYy5uYXZlci5jb21cIikge1xyXG4gICAgICAgIC8vIO2ajOywqCDrpqzsiqTtirgg7Y6Y7J207KeAXHJcbiAgICAgICAgaWYgKHVybC5wYXRobmFtZS5pbmRleE9mKFwiL2xpc3QubmhuXCIpID4gMCkge1xyXG4gICAgICAgICAgY29uc3Qgd2VidG9vbklkID0gdXJsLnNlYXJjaFBhcmFtcy5nZXQoXCJ0aXRsZUlkXCIpO1xyXG4gICAgICAgICAgZGlzcGxheUhpc3RvcnkodGFiSWQsIHdlYnRvb25JZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIOybue2IsCDrs7TripQg7Y6Y7J207KeAXHJcbiAgICAgICAgZWxzZSBpZiAodXJsLnBhdGhuYW1lLmluZGV4T2YoXCIvZGV0YWlsLm5oblwiKSA+IDApIHtcclxuICAgICAgICAgIGNvbnN0IHdlYnRvb25JZCA9IHVybC5zZWFyY2hQYXJhbXMuZ2V0KFwidGl0bGVJZFwiKTtcclxuICAgICAgICAgIGNvbnN0IG5vID0gdXJsLnNlYXJjaFBhcmFtcy5nZXQoXCJub1wiKTtcclxuICAgICAgICAgIGlmICghd2VidG9vbklkIHx8ICFubykge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAoIXdlYnRvb24ud2VidG9vblR5cGVbd2VidG9vbklkXSkge1xyXG4gICAgICAgICAgICB3ZWJ0b29uLnZpc2l0c1t3ZWJ0b29uSWRdID0ge307XHJcbiAgICAgICAgICAgIHdlYnRvb24ud2VidG9vblR5cGVbd2VidG9vbklkXSA9IHtcclxuICAgICAgICAgICAgICB0aXRsZTogdGFiLnRpdGxlLnNwbGl0KFwiOjpcIilbMF0udHJpbSgpLFxyXG4gICAgICAgICAgICAgIHR5cGU6IHVybC5wYXRobmFtZS5zcGxpdChcIi9kZXRhaWwubmhuXCIpWzBdXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB3ZWJ0b29uLnZpc2l0c1t3ZWJ0b29uSWRdW25vXSA9IE1hdGguZmxvb3IoXHJcbiAgICAgICAgICAgIG5ldyBEYXRlKCkuZ2V0VGltZSgpIC8gMTAwMFxyXG4gICAgICAgICAgKTtcclxuICAgICAgICAgIGlmIChvcHRpb24uc2F2ZVNjcm9sbCkge1xyXG4gICAgICAgICAgICBjaGVja1Njcm9sbCh0YWJJZCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAod2VidG9vbi5zY3JvbGxzW3dlYnRvb25JZF0gJiYgd2VidG9vbi5zY3JvbGxzW3dlYnRvb25JZF1bbm9dKSB7XHJcbiAgICAgICAgICAgIHNldFNjcm9sbCh0YWJJZCwgd2VidG9vbi5zY3JvbGxzW3dlYnRvb25JZF1bbm9dKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmIChvcHRpb24uYXV0b05leHQpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJhdXRvbmV4dFwiKTtcclxuICAgICAgICAgICAgYXV0b05leHQodGFiSWQsIG9wdGlvbi5hdXRvTmV4dCk7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgLy8gU2F2ZSB0byBTdG9yZVxyXG4gICAgICAgICAgd2VidG9vbi53ZWJ0b29uVHlwZSA9IHdlYnRvb24ud2VidG9vblR5cGU7XHJcbiAgICAgICAgICB3ZWJ0b29uLnZpc2l0cyA9IHdlYnRvb24udmlzaXRzO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICAvLyDrqqjrsJTsnbwg7LC9XHJcbiAgICAgIGVsc2UgaWYgKHVybC5ob3N0ID09PSBcIm0uY29taWMubmF2ZXIuY29tXCIpIHtcclxuICAgICAgICBjaHJvbWUudGFicy5pbnNlcnRDU1ModGFiSWQsIHtcclxuICAgICAgICAgIGNvZGU6IGAjZml4ZWRfTGF5ZXIge1xyXG4gICAgICAgICAgICBwb3NpdGlvbjogZml4ZWQ7XHJcbiAgICAgICAgICAgIGJvdHRvbTogMjBweDtcclxuICAgICAgICAgICAgbGVmdDogMjBweDtcclxuICAgICAgICAgICAgd2lkdGg6IDYwcHg7XHJcbiAgICAgICAgICAgIGhlaWdodDogNDBweDtcclxuICAgICAgICAgICAgei1pbmRleDogOTk5O1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICAjYXJyb3d7XHJcbiAgICAgICAgICAgd2lkdGg6NDBweDtcclxuICAgICAgICAgICBoZWlnaHQ6NDBweDtcclxuICAgICAgICAgICBib3JkZXItcmFkaXVzOiAyMHB4O1xyXG4gICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgICAjYXJyb3c6aG92ZXIge1xyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiMxMTExO1xyXG4gICAgICAgICAgICBjdXJzb3I6cG9pbnRlcjtcclxuICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgICAgI2Fycm93ICp7XHJcbiAgICAgICAgICAgIHN0cm9rZTpibGFjaztcclxuICAgICAgICB9YFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBjaHJvbWUudGFicy5leGVjdXRlU2NyaXB0KHRhYklkLCB7XHJcbiAgICAgICAgICBjb2RlOiBgXHJcbiAgICAgICAgICB2YXIgZml4ZWRkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpXHJcbiAgICAgICAgICBmaXhlZGRpdi5pZD1cImZpeGVkX0xheWVyXCJcclxuICAgICAgICAgIGZpeGVkZGl2LmlubmVySFRNTCA9IFxcYDxzcGFuIGlkPVwibGF5ZXItbGlua1wiIHRpdGxlPVwi67O06rOgIOyeiOuKlCDsm7ntiLDsnYQg7YOt7JeQ7IScIOyXveuLiOuLpC5cIj48c3ZnIGlkPVwiYXJyb3dcIiB3aWR0aD1cIjQwXCIgaGVpZ2h0PVwiNDBcIiB2aWV3Qm94PVwiMCAwIDIwIDIwXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxyXG4gICAgICAgICAgPHBvbHlsaW5lIGZpbGw9XCJub25lXCIgc3Ryb2tlPVwiIzAwMFwiXHJcbiAgICAgICAgICAgICAgc3Ryb2tlLXdpZHRoPVwiMS4wM1wiIHBvaW50cz1cIjEzIDE2IDcgMTAgMTMgNFwiIC8+PC9zdmc+IDwvc3Bhbj5cXGBcclxuICAgICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZml4ZWRkaXYpXHJcbiAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxheWVyLWxpbmtcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2UoXCIke1xyXG4gICAgICAgICAgICBjaHJvbWUucnVudGltZS5pZFxyXG4gICAgICAgICAgfVwiLCB7Y29tbWFuZCA6ICdvcGVuVGFiJ30sICgpPT57d2luZG93LmNsb3NlKCl9KVxyXG4gICAgICAgICAgfSkgXHJcbiAgICAgICAgICB2YXIgdmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiI3Rvb25MYXllcj51bD5saT5wPmltZ1wiKVxyXG4gICAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IHZkLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgdmRbaV0uc2V0QXR0cmlidXRlKFwic3JjXCIsIHZkW2ldLmdldEF0dHJpYnV0ZShcImRhdGEtc3JjXCIpKVxyXG4gICAgICAgICAgdmRbaV0ucmVtb3ZlQXR0cmlidXRlKFwiZGF0YS1zcmNcIikgXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcInRlc3RcIik7XHJcbiAgICAgIGBcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKHVybC5wYXRobmFtZS5pbmRleE9mKFwiL2xpc3QubmhuXCIpID4gMCkge1xyXG4gICAgICAgICAgY29uc3Qgd2VidG9vbklkID0gdXJsLnNlYXJjaFBhcmFtcy5nZXQoXCJ0aXRsZUlkXCIpO1xyXG4gICAgICAgICAgZGlzcGxheUhpc3RvcnkodGFiSWQsIHdlYnRvb25JZCk7XHJcbiAgICAgICAgfSBlbHNlIGlmICh1cmwucGF0aG5hbWUuaW5kZXhPZihcIi9kZXRhaWwubmhuXCIpID4gMCkge1xyXG4gICAgICAgICAgY29uc3Qgd2VidG9vbklkID0gdXJsLnNlYXJjaFBhcmFtcy5nZXQoXCJ0aXRsZUlkXCIpO1xyXG4gICAgICAgICAgY29uc3Qgbm8gPSB1cmwuc2VhcmNoUGFyYW1zLmdldChcIm5vXCIpO1xyXG4gICAgICAgICAgaWYgKCF3ZWJ0b29uSWQgfHwgIW5vKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmICghd2VidG9vbi53ZWJ0b29uVHlwZVt3ZWJ0b29uSWRdKSB7XHJcbiAgICAgICAgICAgIHdlYnRvb24ud2VidG9vblR5cGVbd2VidG9vbklkXSA9IHtcclxuICAgICAgICAgICAgICB0aXRsZTogdGFiLnRpdGxlLnNwbGl0KFwiOjpcIilbMF0udHJpbSgpLFxyXG4gICAgICAgICAgICAgIHR5cGU6IHVybC5wYXRobmFtZS5zcGxpdChcIi9kZXRhaWwubmhuXCIpWzBdXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgd2VidG9vbi52aXNpdHNbd2VidG9vbklkXVtub10gPSBNYXRoLmZsb29yKFxyXG4gICAgICAgICAgICBuZXcgRGF0ZSgpLmdldFRpbWUoKSAvIDEwMDBcclxuICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgaWYgKG9wdGlvbi5zYXZlU2Nyb2xsKSB7XHJcbiAgICAgICAgICAgIGNoZWNrU2Nyb2xsTW9iaWxlKHRhYklkKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmICh3ZWJ0b29uLnNjcm9sbHNbd2VidG9vbklkXSAmJiB3ZWJ0b29uLnNjcm9sbHNbd2VidG9vbklkXVtub10pIHtcclxuICAgICAgICAgICAgc2V0U2Nyb2xsTW9iaWxlKHRhYklkLCB3ZWJ0b29uLnNjcm9sbHNbd2VidG9vbklkXVtub10pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0pO1xyXG59O1xyXG4iLCJpbXBvcnQgYXhpb3MgZnJvbSBcImF4aW9zXCI7XHJcbmltcG9ydCB7IFdlYnRvb25PcmRlciB9IGZyb20gXCIuLi9zdG9yZS9vcHRpb25cIjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2Ugb2dJbmZvIHtcclxuICB0aXRsZT86IHN0cmluZztcclxuICBpbWc/OiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgV2VidG9vbkluZm9UeXBlIHtcclxuICB0aXRsZT86IHN0cmluZztcclxuICBsaW5rPzogc3RyaW5nO1xyXG4gIGltZz86IHN0cmluZztcclxuICBpc1VwPzogYm9vbGVhbjtcclxuICBpc1Jlc3Q/OiBib29sZWFuO1xyXG4gIGlkPzogbnVtYmVyO1xyXG59XHJcblxyXG5leHBvcnQgdHlwZSBXZWVrID0gXCJtb25cIiB8IFwidHVlXCIgfCBcIndlZFwiIHwgXCJ0aHVcIiB8IFwiZnJpXCIgfCBcInNhdFwiIHwgXCJzdW5cIjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgV2VidG9vbkluZm8ge1xyXG4gIFtrZXk6IHN0cmluZ106IEFycmF5PFdlYnRvb25JbmZvVHlwZT47XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCB3ZWVrRGF5OiBXZWVrW10gPSBbXCJtb25cIiwgXCJ0dWVcIiwgXCJ3ZWRcIiwgXCJ0aHVcIiwgXCJmcmlcIiwgXCJzYXRcIiwgXCJzdW5cIl07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXZWJ0b29uUmVxdWVzdCB7XHJcbiAgLyoqXHJcbiAgICog7Y6Y7J207KeA7J2YIOyCrOynhCwg7YOA7J207YuA7J2EIOu2iOufrOyYteuLiOuLpC5cclxuICAgKiBAcGFyYW0gdHlwZSDsm7ntiLAg7YOA7J6FXHJcbiAgICogQHBhcmFtIGtleTEg7Ju57YiwIOuyiO2YuFxyXG4gICAqIEBwYXJhbSBrZXkyIO2ajOywqCDrsojtmLhcclxuICAgKi9cclxuICBzdGF0aWMgYXN5bmMgZ2V0T3BlbkdyYXBoKHR5cGU6IHN0cmluZywga2V5MTogbnVtYmVyLCBrZXkyOiBudW1iZXIpOiBQcm9taXNlPG9nSW5mbz4ge1xyXG4gICAgY29uc3Qgb2c6IG9nSW5mbyA9IHt9O1xyXG4gICAgY29uc3QgdXJsID0gYGh0dHBzOi8vY29taWMubmF2ZXIuY29tJHt0eXBlfS9kZXRhaWwubmhuP3RpdGxlSWQ9JHtrZXkxfSZubz0ke2tleTJ9YDtcclxuICAgIGNvbnN0IHsgZGF0YSB9ID0gYXdhaXQgYXhpb3MuZ2V0PHN0cmluZz4odXJsKTtcclxuICAgIG9nLnRpdGxlID0gZGF0YS5tYXRjaChcclxuICAgICAgLzxtZXRhIFtePl0qcHJvcGVydHk9W1xcXCInXW9nOmRlc2NyaXB0aW9uW1xcXCInXSBbXj5dKmNvbnRlbnQ9W1xcXCInXShbXideXFxcIl0rPylbXFxcIiddW14+XSo+L1xyXG4gICAgKVsxXTtcclxuICAgIG9nLmltZyA9IGRhdGEubWF0Y2goXHJcbiAgICAgIC88bWV0YSBbXj5dKnByb3BlcnR5PVtcXFwiJ11vZzppbWFnZVtcXFwiJ10gW14+XSpjb250ZW50PVtcXFwiJ10oW14nXlxcXCJdKz8pW1xcXCInXVtePl0qPi9cclxuICAgIClbMV07XHJcblxyXG4gICAgaWYgKG9nLnRpdGxlICYmIG9nLmltZyAmJiBvZy5pbWcubWF0Y2goXCJodHRwczovL3NoYXJlZC1jb21pYy5wc3RhdGljLm5ldC90aHVtYi9cIikpIHJldHVybiBvZztcclxuXHJcbiAgICBjb25zb2xlLmxvZyhgT3BlbkdyYXBoIGdldCBmYWlsZWQuYCwgdXJsLCBvZyk7XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcblxyXG4gIHN0YXRpYyBhc3luYyBnZXRBbGxXZWJ0b29uKHNvcnQ6IFdlYnRvb25PcmRlcik6IFByb21pc2U8V2VidG9vbkluZm8+IHtcclxuICAgIGNvbnN0IGxpbmsgPSBgaHR0cHM6Ly9jb21pYy5uYXZlci5jb20vd2VidG9vbi93ZWVrZGF5Lm5obj9vcmRlcj0ke3NvcnR9YDtcclxuICAgIGNvbnN0IHsgZGF0YSB9ID0gYXdhaXQgYXhpb3MuZ2V0KGxpbmspO1xyXG4gICAgaWYgKCFkYXRhKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKGByZXF1ZXN0OiR7bGlua30gRXJyb3JgKTtcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgICBjb25zdCB3ZWJ0b29uczogV2VidG9vbkluZm8gPSB7fTtcclxuICAgIGNvbnN0IHBhZ2UgPSBuZXcgRE9NUGFyc2VyKCkucGFyc2VGcm9tU3RyaW5nKGRhdGEsIFwidGV4dC9odG1sXCIpLnF1ZXJ5U2VsZWN0b3IoXCJkaXYuZGFpbHlfYWxsXCIpO1xyXG4gICAgd2Vla0RheS5mb3JFYWNoKGRheSA9PiB7XHJcbiAgICAgIGNvbnN0IGRheUVsZW1lbnQgPSBwYWdlLnF1ZXJ5U2VsZWN0b3IoXCJoNC5cIiArIGRheSkucGFyZW50RWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKFwidWw+bGlcIik7XHJcbiAgICAgIHdlYnRvb25zW2RheV0gPSBbXTtcclxuICAgICAgZGF5RWxlbWVudC5mb3JFYWNoKGVsZW1lbnQgPT4ge1xyXG4gICAgICAgIGNvbnN0IHdlYnRvb246IFdlYnRvb25JbmZvVHlwZSA9IHt9O1xyXG4gICAgICAgIGNvbnN0IHRvb25FbGVtZW50OiBIVE1MTGlua0VsZW1lbnQgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCJkaXYudGh1bWI+YVwiKTtcclxuICAgICAgICBjb25zdCBpbWdFbGVtZW50OiBIVE1MSW1hZ2VFbGVtZW50ID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiZGl2LnRodW1iPmE+aW1nXCIpO1xyXG4gICAgICAgIGNvbnN0IHVybCA9IG5ldyBVUkwodG9vbkVsZW1lbnQuaHJlZik7XHJcbiAgICAgICAgd2VidG9vbi5pbWcgPSBpbWdFbGVtZW50LnNyYztcclxuICAgICAgICB3ZWJ0b29uLnRpdGxlID0gaW1nRWxlbWVudC50aXRsZTtcclxuICAgICAgICB3ZWJ0b29uLmxpbmsgPSBgaHR0cHM6Ly9jb21pYy5uYXZlci5jb20ke3VybC5wYXRobmFtZSArIHVybC5zZWFyY2h9YDtcclxuICAgICAgICB3ZWJ0b29uLmlzUmVzdCA9ICEhdG9vbkVsZW1lbnQucXVlcnlTZWxlY3RvcihcImVtLmljb19icmVha1wiKTtcclxuICAgICAgICB3ZWJ0b29uLmlzVXAgPSAhIXRvb25FbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCJlbS5pY29fdXBkdFwiKTtcclxuICAgICAgICB3ZWJ0b29uLmlkID0gcGFyc2VJbnQodXJsLnNlYXJjaFBhcmFtcy5nZXQoXCJ0aXRsZUlkXCIpKTtcclxuICAgICAgICB3ZWJ0b29uc1tkYXldLnB1c2god2VidG9vbik7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gd2VidG9vbnM7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCBPcHRpb25TdG9yZSBmcm9tIFwiLi9vcHRpb25cIjtcclxuaW1wb3J0IFdlYnRvb25TdG9yZSBmcm9tIFwiLi93ZWJ0b29uXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSb290U3RvcmUge1xyXG4gIHB1YmxpYyB3ZWJ0b29uOiBXZWJ0b29uU3RvcmU7XHJcbiAgcHVibGljIG9wdGlvbjogT3B0aW9uU3RvcmU7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5vcHRpb24gPSBuZXcgT3B0aW9uU3RvcmUoKTtcclxuICAgIHRoaXMud2VidG9vbiA9IG5ldyBXZWJ0b29uU3RvcmUodGhpcy5vcHRpb24pO1xyXG5cclxuICAgIC8vIERldiBPbmx5XHJcbiAgICBjaHJvbWUuc3RvcmFnZS5vbkNoYW5nZWQuYWRkTGlzdGVuZXIoY2hhbmdlID0+IHtcclxuICAgICAgY29uc29sZS5sb2coXCJjaHJvbWUgc3RvcmFnZSBjaGFuZ2VkXCIsIGNoYW5nZSk7XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgb2JzZXJ2YWJsZSwgYWN0aW9uLCBjb21wdXRlZCB9IGZyb20gXCJtb2J4XCI7XHJcblxyXG5jb25zdCBzdG9yZUtleXMgPSBbXHJcbiAgXCJfc3RvcmVMb2NhdGlvblwiLFxyXG4gIFwiX29yZGVyQnlcIixcclxuICBcIl9zaG93SGlzdG9yeVwiLFxyXG4gIFwiX2hpc3RvcnlNYXhcIixcclxuICBcIl9zYXZlV2VidG9vblNvcnRcIixcclxuICBcIl9zYXZlU2Nyb2xsXCIsXHJcbiAgXCJfaGlkZGVuQ29tbWVudFwiLFxyXG4gIFwiX2F1dG9OZXh0XCIsXHJcbiAgXCJfdXNlSW1nTG9nXCIsXHJcbiAgXCJfc2F2ZUZhdm9yYXRlXCIsXHJcbiAgXCJfbGlua1RhcmdldFwiLFxyXG4gIFwiX3Njcm9sbEFsZXJ0XCJcclxuXTtcclxuXHJcbmV4cG9ydCB0eXBlIENocm9tZVN0b3JlID0gXCJsb2NhbFwiIHwgXCJzeW5jXCIgfCBudWxsO1xyXG5leHBvcnQgdHlwZSBXZWJ0b29uT3JkZXIgPSBcIlZpZXdDb3VudFwiIHwgXCJVcGRhdGVcIiB8IFwiU3RhclNjb3JlXCIgfCBcIlRpdGxlTmFtZVwiO1xyXG5leHBvcnQgdHlwZSBMaW5rVGFyZ2V0ID0gXCJUYWJcIiB8IFwiQ3VycmVudFwiIHwgXCJQb3B1cFwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgT3B0aW9uU3RvcmUge1xyXG4gIHByaXZhdGUgZ2V0IG9wdGlvbk9iamVjdCgpIHtcclxuICAgIGNvbnN0IG9iaiA9IHt9O1xyXG4gICAgc3RvcmVLZXlzLmZvckVhY2goa2V5ID0+IHtcclxuICAgICAgb2JqW2tleV0gPSB0aGlzW2tleV07XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBvYmo7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHNhdmVUb1N0b3JlKCkge1xyXG4gICAgY2hyb21lLnN0b3JhZ2Uuc3luYy5zZXQoe1xyXG4gICAgICBvcHRpb246IEpTT04uc3RyaW5naWZ5KHRoaXMub3B0aW9uT2JqZWN0KVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0VXNlQnl0ZXMoKSB7XHJcbiAgICBjaHJvbWUuc3RvcmFnZS5sb2NhbC5nZXRCeXRlc0luVXNlKHVzZSA9PiB7XHJcbiAgICAgIHRoaXMubG9jYWxVc2FnZSA9IHVzZTtcclxuICAgIH0pO1xyXG4gICAgY2hyb21lLnN0b3JhZ2Uuc3luYy5nZXRCeXRlc0luVXNlKHVzZSA9PiB7XHJcbiAgICAgIHRoaXMuc3luY1VzYWdlID0gdXNlO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDsg53shLHsnpBcclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIC8vIENocm9tZSBTdG9yYWdl66Gc67aA7YSwIOyEpOygleqwkuydhCDstIjquLDtmZRcclxuICAgIGNocm9tZS5zdG9yYWdlLnN5bmMuZ2V0KFwib3B0aW9uXCIsICh7IG9wdGlvbjogaXRlbSB9KSA9PiB7XHJcbiAgICAgIGlmIChpdGVtKSBpdGVtID0gSlNPTi5wYXJzZShpdGVtKTtcclxuICAgICAgaWYgKGl0ZW0gJiYgT2JqZWN0LmtleXMoaXRlbSkubGVuZ3RoID09PSBzdG9yZUtleXMubGVuZ3RoKSB7XHJcbiAgICAgICAgc3RvcmVLZXlzLmZvckVhY2goa2V5ID0+IHtcclxuICAgICAgICAgIHRoaXNba2V5XSA9IGl0ZW1ba2V5XTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmdldFVzZUJ5dGVzKCk7XHJcbiAgICAgIH0gZWxzZSBpZiAoIWl0ZW0gfHwgT2JqZWN0LmtleXMoaXRlbSkubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgY2hyb21lLnN0b3JhZ2Uuc3luYy5zZXQoXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIG9wdGlvbjogSlNPTi5zdHJpbmdpZnkodGhpcy5vcHRpb25PYmplY3QpXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmdldFVzZUJ5dGVzKCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiT3B0aW9uIEluaXRcIik7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBPYmplY3Qua2V5cyhzdG9yZUtleXMpLmZvckVhY2goa2V5ID0+IHtcclxuICAgICAgICAgIGlmIChpdGVtW2tleV0pIHtcclxuICAgICAgICAgICAgdGhpc1trZXldID0gaXRlbVtrZXldO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGNocm9tZS5zdG9yYWdlLnN5bmMuc2V0KHsgb3B0aW9uOiBKU09OLnN0cmluZ2lmeSh0aGlzLm9wdGlvbk9iamVjdCkgfSwgKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5nZXRVc2VCeXRlcygpO1xyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJVcGRhdGUgQ29tcGxhdGVcIik7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8vIGNocm9tZSBzdG9yYWdl66W8IHN0b3Jl7JmAIOuPmeq4sO2ZlFxyXG4gICAgY2hyb21lLnN0b3JhZ2Uub25DaGFuZ2VkLmFkZExpc3RlbmVyKChjaGFuZ2UsIGFyZWEpID0+IHtcclxuICAgICAgaWYgKGNoYW5nZS5vcHRpb24pIHtcclxuICAgICAgICBjb25zdCBvcHRpb24gPSBKU09OLnBhcnNlKGNoYW5nZS5vcHRpb24ubmV3VmFsdWUpO1xyXG4gICAgICAgIHN0b3JlS2V5cy5mb3JFYWNoKGtleSA9PiB7XHJcbiAgICAgICAgICBpZiAob3B0aW9uW2tleV0pIHtcclxuICAgICAgICAgICAgdGhpc1trZXldID0gb3B0aW9uW2tleV07XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5nZXRVc2VCeXRlcygpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIEBvYnNlcnZhYmxlXHJcbiAgcHVibGljIGxvY2FsVXNhZ2U6IG51bWJlciA9IDA7XHJcblxyXG4gIEBvYnNlcnZhYmxlXHJcbiAgcHVibGljIHN5bmNVc2FnZTogbnVtYmVyID0gMDtcclxuXHJcbiAgLyoqXHJcbiAgICog7IKs7Jqp7J6QIOuNsOydtO2EsOulvCDsoIDsnqXtlaAg7KCA7J6l7IaMXHJcbiAgICovXHJcbiAgQG9ic2VydmFibGVcclxuICBwcml2YXRlIF9zdG9yZUxvY2F0aW9uOiBDaHJvbWVTdG9yZSA9IFwibG9jYWxcIjtcclxuXHJcbiAgQGNvbXB1dGVkXHJcbiAgcHVibGljIGdldCBzdG9yZUxvY2F0aW9uKCk6IENocm9tZVN0b3JlIHtcclxuICAgIHJldHVybiB0aGlzLl9zdG9yZUxvY2F0aW9uO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHNldCBzdG9yZUxvY2F0aW9uKHZhbHVlOiBDaHJvbWVTdG9yZSkge1xyXG4gICAgdGhpcy5fc3RvcmVMb2NhdGlvbiA9IHZhbHVlO1xyXG4gICAgdGhpcy5zYXZlVG9TdG9yZSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog7Ju57YiwIOygleugrCDrsKnsi51cclxuICAgKi9cclxuICBAb2JzZXJ2YWJsZVxyXG4gIHByaXZhdGUgX29yZGVyQnk6IFdlYnRvb25PcmRlciA9IFwiVmlld0NvdW50XCI7XHJcblxyXG4gIEBjb21wdXRlZFxyXG4gIHB1YmxpYyBnZXQgb3JkZXJCeSgpOiBXZWJ0b29uT3JkZXIge1xyXG4gICAgcmV0dXJuIHRoaXMuX29yZGVyQnk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2V0IG9yZGVyQnkodmFsdWU6IFdlYnRvb25PcmRlcikge1xyXG4gICAgdGhpcy5fb3JkZXJCeSA9IHZhbHVlO1xyXG4gICAgdGhpcy5zYXZlVG9TdG9yZSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog7Ju57YiwIOq4sOuhneydhCDrs7TsnbTripQg7Jes67aAXHJcbiAgICovXHJcbiAgQG9ic2VydmFibGVcclxuICBwcml2YXRlIF9zaG93SGlzdG9yeTogYm9vbGVhbiA9IHRydWU7XHJcblxyXG4gIEBjb21wdXRlZFxyXG4gIHB1YmxpYyBnZXQgc2hvd0hpc3RvcnkoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5fc2hvd0hpc3Rvcnk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2V0IHNob3dIaXN0b3J5KHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICB0aGlzLl9zaG93SGlzdG9yeSA9IHZhbHVlO1xyXG4gICAgdGhpcy5zYXZlVG9TdG9yZSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog7LWc64yAIOq4sOuhnSDsoIDsnqUg6rCc7IiYXHJcbiAgICovXHJcbiAgQG9ic2VydmFibGVcclxuICBwcml2YXRlIF9oaXN0b3J5TWF4OiBudW1iZXIgPSA1MDA7XHJcblxyXG4gIEBjb21wdXRlZFxyXG4gIHB1YmxpYyBnZXQgaGlzdG9yeU1heCgpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMuX2hpc3RvcnlNYXg7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2V0IGhpc3RvcnlNYXgodmFsdWU6IG51bWJlcikge1xyXG4gICAgaWYgKHRoaXMuX3N0b3JlTG9jYXRpb24gPT09IFwibG9jYWxcIiAmJiB2YWx1ZSA+IDIwMCkgdmFsdWUgPSAyMDA7XHJcbiAgICBpZiAodGhpcy5fc3RvcmVMb2NhdGlvbiA9PT0gXCJzeW5jXCIgJiYgdmFsdWUgPiA1MDApIHZhbHVlID0gNTAwO1xyXG4gICAgdGhpcy5faGlzdG9yeU1heCA9IHZhbHVlO1xyXG4gICAgdGhpcy5zYXZlVG9TdG9yZSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog7JqU7J2867OEIOybue2IsCDsgqzsmqnsnpAg7KeA7KCVIOyInOyEnOulvCDsoIHsmqntlZjripQg7Jes67aAXHJcbiAgICovXHJcbiAgQG9ic2VydmFibGVcclxuICBwcml2YXRlIF9zYXZlV2VidG9vblNvcnQ6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICBAY29tcHV0ZWRcclxuICBwdWJsaWMgZ2V0IHNhdmVXZWJ0b29uU29ydCgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLl9zYXZlV2VidG9vblNvcnQ7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2V0IHNhdmVXZWJ0b29uU29ydCh2YWx1ZTogYm9vbGVhbikge1xyXG4gICAgdGhpcy5fc2F2ZVdlYnRvb25Tb3J0ID0gdmFsdWU7XHJcbiAgICB0aGlzLnNhdmVUb1N0b3JlKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDsiqTtgazroaTsnYQg7KCA7J6l7ZWY64qUIOyXrOu2gFxyXG4gICAqL1xyXG4gIEBvYnNlcnZhYmxlXHJcbiAgcHJpdmF0ZSBfc2F2ZVNjcm9sbDogYm9vbGVhbiA9IHRydWU7XHJcblxyXG4gIEBjb21wdXRlZFxyXG4gIHB1YmxpYyBnZXQgc2F2ZVNjcm9sbCgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLl9zYXZlU2Nyb2xsO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHNldCBzYXZlU2Nyb2xsKHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICB0aGlzLl9zYXZlU2Nyb2xsID0gdmFsdWU7XHJcbiAgICBpZiAodmFsdWUgPT09IHRydWUpIHtcclxuICAgICAgdGhpcy5fc2Nyb2xsQWxlcnQgPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgdGhpcy5zYXZlVG9TdG9yZSgpO1xyXG4gIH1cclxuXHJcbiAgQG9ic2VydmFibGVcclxuICBwcml2YXRlIF9zY3JvbGxBbGVydDogYm9vbGVhbiA9IHRydWU7XHJcblxyXG4gIEBjb21wdXRlZFxyXG4gIHB1YmxpYyBnZXQgc2Nyb2xsQWxlcnQoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5fc2Nyb2xsQWxlcnQ7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2V0IHNjcm9sbEFsZXJ0KHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICB0aGlzLl9zY3JvbGxBbGVydCA9IHZhbHVlO1xyXG4gICAgdGhpcy5zYXZlVG9TdG9yZSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog64yT6riA7J2EIOyIqOq4sOuKlCDsl6zrtoBcclxuICAgKi9cclxuICBAb2JzZXJ2YWJsZVxyXG4gIHByaXZhdGUgX2hpZGRlbkNvbW1lbnQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgQGNvbXB1dGVkXHJcbiAgcHVibGljIGdldCBoaWRkZW5Db21tZW50KCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX2hpZGRlbkNvbW1lbnQ7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2V0IGhpZGRlbkNvbW1lbnQodmFsdWU6IGJvb2xlYW4pIHtcclxuICAgIHRoaXMuX2hpZGRlbkNvbW1lbnQgPSB2YWx1ZTtcclxuICAgIHRoaXMuc2F2ZVRvU3RvcmUoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOyekOuPmeycvOuhnCDsnpDrj5ntmZTroZwg64SY7Ja06rCA64qUIOyXrOu2gFxyXG4gICAqL1xyXG4gIEBvYnNlcnZhYmxlXHJcbiAgcHJpdmF0ZSBfYXV0b05leHQ6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICBAY29tcHV0ZWRcclxuICBwdWJsaWMgZ2V0IGF1dG9OZXh0KCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX2F1dG9OZXh0O1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHNldCBhdXRvTmV4dCh2YWx1ZTogYm9vbGVhbikge1xyXG4gICAgdGhpcy5fYXV0b05leHQgPSB2YWx1ZTtcclxuICAgIHRoaXMuc2F2ZVRvU3RvcmUoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOydtOuvuOyngCDqsr3roZzrpbwg66Gc6re466GcIOyggOyepe2VmOuKlCDsl6zrtoBcclxuICAgKi9cclxuICBAb2JzZXJ2YWJsZVxyXG4gIHByaXZhdGUgX3VzZUltZ0xvZzogYm9vbGVhbiA9IHRydWU7XHJcblxyXG4gIEBjb21wdXRlZFxyXG4gIHB1YmxpYyBnZXQgdXNlSW1nTG9nKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX3VzZUltZ0xvZztcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzZXQgdXNlSW1nTG9nKHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICB0aGlzLl91c2VJbWdMb2cgPSB2YWx1ZTtcclxuICAgIHRoaXMuc2F2ZVRvU3RvcmUoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOymkOqyqOywvuq4sOulvCDstpTqsIDtlZjripQg7Jes67aAXHJcbiAgICovXHJcbiAgQG9ic2VydmFibGVcclxuICBwcml2YXRlIF9zYXZlRmF2b3JhdGU6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICBAY29tcHV0ZWRcclxuICBwdWJsaWMgZ2V0IHNhdmVGYXZvcmF0ZSgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLl9zYXZlRmF2b3JhdGU7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2V0IHNhdmVGYXZvcmF0ZSh2YWx1ZTogYm9vbGVhbikge1xyXG4gICAgdGhpcy5fc2F2ZUZhdm9yYXRlID0gdmFsdWU7XHJcbiAgICB0aGlzLnNhdmVUb1N0b3JlKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDrp4Htgazrpbwg7Je0IOychOy5mFxyXG4gICAqL1xyXG4gIEBvYnNlcnZhYmxlXHJcbiAgcHJpdmF0ZSBfbGlua1RhcmdldDogTGlua1RhcmdldCA9IFwiVGFiXCI7XHJcblxyXG4gIEBjb21wdXRlZFxyXG4gIHB1YmxpYyBnZXQgbGlua1RhcmdldCgpOiBMaW5rVGFyZ2V0IHtcclxuICAgIHJldHVybiB0aGlzLl9saW5rVGFyZ2V0O1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHNldCBsaW5rVGFyZ2V0KHZhbHVlOiBMaW5rVGFyZ2V0KSB7XHJcbiAgICB0aGlzLl9saW5rVGFyZ2V0ID0gdmFsdWU7XHJcbiAgICB0aGlzLnNhdmVUb1N0b3JlKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDsiqTthqDslrQg7LSI6riw7ZmUXHJcbiAgICogQHBhcmFtIHN0b3JlIOy0iOq4sO2ZlCDtlaAg7Iqk7Yag7Ja0IOychOy5mFxyXG4gICAqL1xyXG4gIHB1YmxpYyByZXNldFN0b3JlKHN0b3JlOiBDaHJvbWVTdG9yZSkge1xyXG4gICAgY2hyb21lLnN0b3JhZ2Vbc3RvcmVdLmNsZWFyKCk7XHJcbiAgICB0aGlzLmdldFVzZUJ5dGVzKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDrp4Htgazrpbwg7Je964uI64ukXHJcbiAgICogQHBhcmFtIGxpbmsg66eB7YGsXHJcbiAgICovXHJcbiAgcHVibGljIG9wZW5UYWIobGluazogc3RyaW5nKTogdm9pZCB7XHJcbiAgICBzd2l0Y2ggKHRoaXMuX2xpbmtUYXJnZXQpIHtcclxuICAgICAgY2FzZSBcIkN1cnJlbnRcIjpcclxuICAgICAgICBjaHJvbWUudGFicy51cGRhdGUoe1xyXG4gICAgICAgICAgdXJsOiBsaW5rXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgXCJQb3B1cFwiOlxyXG4gICAgICAgIGNocm9tZS53aW5kb3dzLmNyZWF0ZShcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgdXJsOiBsaW5rLnJlcGxhY2UoXCJodHRwczovL1wiLCBcImh0dHBzOi8vbS5cIiksXHJcbiAgICAgICAgICAgIHdpZHRoOiA0MDAsXHJcbiAgICAgICAgICAgIGhlaWdodDogODAwLFxyXG4gICAgICAgICAgICB0eXBlOiBcInBvcHVwXCJcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB3aW5kb3cgPT4ge1xyXG4gICAgICAgICAgICB3aW5kb3cuYWx3YXlzT25Ub3AgPSB0cnVlO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgXCJUYWJcIjpcclxuICAgICAgICBjaHJvbWUudGFicy5jcmVhdGUoe1xyXG4gICAgICAgICAgdXJsOiBsaW5rXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgY29uc29sZS53YXJuKFwiW1dhcm5pbmddIG9wdGlvbi5saW5rVGFyZ2V07J20IOyemOuquyDshKTsoJXrkJjsl4jsirXri4jri6QuXCIpO1xyXG4gICAgICAgIGNocm9tZS50YWJzLmNyZWF0ZSh7XHJcbiAgICAgICAgICB1cmw6IGxpbmtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgb2JzZXJ2YWJsZSwgY29tcHV0ZWQsIGFjdGlvbiwgb2JzZXJ2ZSwgdG9KUyB9IGZyb20gXCJtb2J4XCI7XHJcbmltcG9ydCBPcHRpb25TdG9yZSBmcm9tIFwiLi9vcHRpb25cIjtcclxuaW1wb3J0IFdlYnRvb25SZXF1ZXN0LCB7IFdlYnRvb25JbmZvVHlwZSwgV2VidG9vbkluZm8sIFdlZWsgfSBmcm9tIFwiLi4vcmVxdWVzdFwiO1xyXG5cclxuLy8gZXhwb3J0IHR5cGUgU2F2ZVR5cGUgPSBcImltZ2xvZ1wiIHwgXCJmYXZvcmF0ZVwiIHwgXCJzY3JvbGxzXCIgfCBcInZpc2l0c1wiIHwgXCJ3ZWJ0b29uXCI7XHJcblxyXG5leHBvcnQgdHlwZSBMb2FkaW5nU3RhdHVzID0gXCJub3Qgc3RhcnRcIiB8IFwic3RhcnRcIiB8IFwiZW5kXCI7XHJcblxyXG5leHBvcnQgdHlwZSBXZWJ0b29uVHlwZSA9IHtcclxuICBba2V5OiBudW1iZXJdOiB7XHJcbiAgICB0aXRsZTogc3RyaW5nO1xyXG4gICAgdHlwZTogXCJ3ZWJ0b29uXCIgfCBcImJlc3RDaGFsbGVuZ2VcIiB8IFwiY2hhbGxlbmdlXCIgfCBzdHJpbmc7XHJcbiAgfTtcclxufTtcclxuZXhwb3J0IHR5cGUgc3RvcmFnZVR5cGUgPSB7XHJcbiAgc2Nyb2xsczogU2Nyb2xsVHlwZTtcclxuICB2aXNpdHM6IFZpc2l0VHlwZTtcclxuICB3ZWJ0b29uOiBXZWJ0b29uVHlwZTtcclxuICBmYXZvcmF0ZTogU3RhcmVkVHlwZTtcclxuICBzb3J0V2VidG9vbjogU29ydFdlYnRvb25UeXBlO1xyXG4gIGltZ2xvZzogSW1nbG9nVHlwZTtcclxufTtcclxuZXhwb3J0IHR5cGUgU2F2ZVR5cGUgPSBrZXlvZiBzdG9yYWdlVHlwZTtcclxuXHJcbmV4cG9ydCB0eXBlIFZpc2l0VHlwZSA9IHtcclxuICBba2V5OiBudW1iZXJdOiB7XHJcbiAgICBba2V5OiBudW1iZXJdOiBudW1iZXI7XHJcbiAgfVtdO1xyXG59O1xyXG5cclxuZXhwb3J0IHR5cGUgU2Nyb2xsVHlwZSA9IHtcclxuICBba2V5OiBudW1iZXJdOiB7XHJcbiAgICBba2V5OiBudW1iZXJdOiBudW1iZXI7XHJcbiAgfTtcclxufTtcclxuXHJcbmV4cG9ydCB0eXBlIEltZ2xvZ1R5cGUgPSB7XHJcbiAgW2tleTogc3RyaW5nXToge1xyXG4gICAgaW1hZ2U6IHN0cmluZztcclxuICAgIG5hbWU6IHN0cmluZztcclxuICB9O1xyXG59O1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBTb3J0V2VidG9vblR5cGUge1xyXG4gIFtrZXk6IHN0cmluZ106IG51bWJlcltdO1xyXG59XHJcblxyXG5leHBvcnQgdHlwZSBTdGFyZWRUeXBlID0ge1xyXG4gIFtrZXk6IG51bWJlcl06IGJvb2xlYW47XHJcbn07XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIFJlY2VudFdlYnRvb24ge1xyXG4gIGlkOiBudW1iZXI7XHJcbiAgbGFzdFZpc2l0OiBudW1iZXI7XHJcbiAgbmFtZTogc3RyaW5nO1xyXG4gIG5vOiBudW1iZXI7XHJcbiAgdHlwZTogc3RyaW5nO1xyXG4gIG5vbmFtZTogc3RyaW5nO1xyXG4gIGltZzogc3RyaW5nO1xyXG59XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdlYnRvb25TdG9yZSB7XHJcbiAgcHJpdmF0ZSBzYXZlVG9TdG9yZTxUIGV4dGVuZHMgU2F2ZVR5cGU+KGtleTogVCwgdmFsdWU6IHN0b3JhZ2VUeXBlW1RdKSB7XHJcbiAgICB0aGlzLnN0b3JhZ2Uuc2V0KFxyXG4gICAgICB7XHJcbiAgICAgICAgW2tleV06IEpTT04uc3RyaW5naWZ5KHZhbHVlKVxyXG4gICAgICB9LFxyXG4gICAgICAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5vcHRpb24uZ2V0VXNlQnl0ZXMoKTtcclxuICAgICAgfVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgc2V0RGFpbHlXZWJ0b29uKHdlYnRvb25zOiBXZWJ0b29uSW5mbykge1xyXG4gICAgaWYgKHRoaXMub3B0aW9uLnNhdmVXZWJ0b29uU29ydCkge1xyXG4gICAgICBpZiAoSlNPTi5zdHJpbmdpZnkodGhpcy5fc29ydFdlYnRvb24pID09PSBKU09OLnN0cmluZ2lmeSh7fSkpIHtcclxuICAgICAgICBPYmplY3Qua2V5cyh3ZWJ0b29ucykuZm9yRWFjaCgoa2V5OiBXZWVrKSA9PiB7XHJcbiAgICAgICAgICBpZiAoIXRoaXMuX3NvcnRXZWJ0b29uW2tleV0pIHRoaXMuX3NvcnRXZWJ0b29uW2tleV0gPSBbXTtcclxuICAgICAgICAgIHRoaXMuX3NvcnRXZWJ0b29uW2tleV0gPSB3ZWJ0b29uc1trZXldLm1hcCh2ID0+IHYuaWQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuc29ydFdlYnRvb24gPSB0aGlzLl9zb3J0V2VidG9vbjtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBPYmplY3Qua2V5cyh3ZWJ0b29ucykuZm9yRWFjaCgoa2V5OiBXZWVrKSA9PiB7XHJcbiAgICAgICAgICBjb25zdCBzb3J0ZWQgPSB0aGlzLl9zb3J0V2VidG9vbltrZXldO1xyXG4gICAgICAgICAgd2VidG9vbnNba2V5XS5maW5kSW5kZXgoZWxlbWVudCA9PiAoc29ydGVkLmluZGV4T2YoZWxlbWVudC5pZCkgIT0gLTEgPyB0cnVlIDogZmFsc2UpKTtcclxuICAgICAgICAgIHdlYnRvb25zW2tleV0uc29ydCgoYSwgYikgPT4gKHNvcnRlZC5pbmRleE9mKGEuaWQpID4gc29ydGVkLmluZGV4T2YoYi5pZCkgPyAxIDogLTEpKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgdGhpcy5fZGFpbHlXZWJ0b29ucyA9IHdlYnRvb25zO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBvcHRpb246IE9wdGlvblN0b3JlO1xyXG5cclxuICBjb25zdHJ1Y3RvcihvcHRpb246IE9wdGlvblN0b3JlKSB7XHJcbiAgICB0aGlzLm9wdGlvbiA9IG9wdGlvbjtcclxuICAgIHRoaXMuc3RvcmFnZS5nZXQoXHJcbiAgICAgIFtcIndlYnRvb25cIiwgXCJ2aXNpdHNcIiwgXCJzY3JvbGxzXCIsIFwiZmF2b3JhdGVcIiwgXCJzb3J0V2VidG9vblwiLCBcImltZ2xvZ1wiXSxcclxuICAgICAgdmFsdWUgPT4ge1xyXG4gICAgICAgIGlmICh2YWx1ZS5zY3JvbGxzKSB0aGlzLl9zY3JvbGxzID0gSlNPTi5wYXJzZSh2YWx1ZS5zY3JvbGxzKTtcclxuICAgICAgICBpZiAodmFsdWUudmlzaXRzKSB0aGlzLl92aXNpdHMgPSBKU09OLnBhcnNlKHZhbHVlLnZpc2l0cyk7XHJcbiAgICAgICAgaWYgKHZhbHVlLndlYnRvb24pIHRoaXMuX3dlYnRvb25UeXBlID0gSlNPTi5wYXJzZSh2YWx1ZS53ZWJ0b29uKTtcclxuICAgICAgICBpZiAodmFsdWUuZmF2b3JhdGUpIHRoaXMuX3N0YXJXZWJ0b29ucyA9IEpTT04ucGFyc2UodmFsdWUuZmF2b3JhdGUpO1xyXG4gICAgICAgIGlmICh2YWx1ZS5zb3J0V2VidG9vbikgdGhpcy5fc29ydFdlYnRvb24gPSBKU09OLnBhcnNlKHZhbHVlLnNvcnRXZWJ0b29uKTtcclxuICAgICAgICB0aGlzLmdldFJlY2VudFdlYnRvb24oKTtcclxuICAgICAgICBXZWJ0b29uUmVxdWVzdC5nZXRBbGxXZWJ0b29uKHRoaXMub3B0aW9uLm9yZGVyQnkpLnRoZW4odmFsdWUgPT4ge1xyXG4gICAgICAgICAgdGhpcy5zZXREYWlseVdlYnRvb24odmFsdWUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIG9ic2VydmUob3B0aW9uLCBcIm9yZGVyQnlcIiwgY2hhbmdlID0+IHtcclxuICAgICAgICAgIGlmIChjaGFuZ2Uub2xkVmFsdWUgIT0gY2hhbmdlLm5ld1ZhbHVlKSB7XHJcbiAgICAgICAgICAgIFdlYnRvb25SZXF1ZXN0LmdldEFsbFdlYnRvb24oY2hhbmdlLm5ld1ZhbHVlKS50aGVuKHZhbHVlID0+IHtcclxuICAgICAgICAgICAgICB0aGlzLl9kYWlseVdlYnRvb25zID0gdmFsdWU7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIG9ic2VydmUob3B0aW9uLCBcInNhdmVXZWJ0b29uU29ydFwiLCBjaGFuZ2UgPT4ge1xyXG4gICAgICAgICAgV2VidG9vblJlcXVlc3QuZ2V0QWxsV2VidG9vbih0aGlzLm9wdGlvbi5vcmRlckJ5KS50aGVuKHZhbHVlID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zZXREYWlseVdlYnRvb24odmFsdWUpO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgICk7XHJcbiAgICBjaHJvbWUuc3RvcmFnZS5vbkNoYW5nZWQuYWRkTGlzdGVuZXIoXHJcbiAgICAgIChjaGFuZ2U6IHsgW2tleSBpbiBTYXZlVHlwZV06IGNocm9tZS5zdG9yYWdlLlN0b3JhZ2VDaGFuZ2UgfSwgYXJlYSkgPT4ge1xyXG4gICAgICAgIE9iamVjdC5rZXlzKGNoYW5nZSkuZm9yRWFjaCgoa2V5OiBTYXZlVHlwZSkgPT4ge1xyXG4gICAgICAgICAgY29uc3QgdmFsdWUgPSBjaGFuZ2Vba2V5XS5uZXdWYWx1ZTtcclxuICAgICAgICAgIGlmIChrZXkgPT09IFwiZmF2b3JhdGVcIikge1xyXG4gICAgICAgICAgICBpZiAodmFsdWUgIT0gSlNPTi5zdHJpbmdpZnkodGhpcy5fc3RhcldlYnRvb25zKSkge1xyXG4gICAgICAgICAgICAgIHRoaXMuX3N0YXJXZWJ0b29ucyA9IEpTT04ucGFyc2UodmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKGtleSA9PT0gXCJpbWdsb2dcIikge1xyXG4gICAgICAgICAgICBpZiAodmFsdWUgIT0gSlNPTi5zdHJpbmdpZnkodGhpcy5faW1nbG9nKSkge1xyXG4gICAgICAgICAgICAgIHRoaXMuX2ltZ2xvZyA9IEpTT04ucGFyc2UodmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKGtleSA9PT0gXCJzY3JvbGxzXCIpIHtcclxuICAgICAgICAgICAgaWYgKHZhbHVlICE9IEpTT04uc3RyaW5naWZ5KHRoaXMuX3Njcm9sbHMpKSB7XHJcbiAgICAgICAgICAgICAgdGhpcy5fc2Nyb2xscyA9IEpTT04ucGFyc2UodmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKGtleSA9PT0gXCJ2aXNpdHNcIikge1xyXG4gICAgICAgICAgICBpZiAodmFsdWUgIT0gSlNPTi5zdHJpbmdpZnkodGhpcy5fdmlzaXRzKSkge1xyXG4gICAgICAgICAgICAgIHRoaXMuX3Zpc2l0cyA9IEpTT04ucGFyc2UodmFsdWUpO1xyXG4gICAgICAgICAgICAgIHRoaXMuZ2V0UmVjZW50V2VidG9vbigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKGtleSA9PT0gXCJ3ZWJ0b29uXCIpIHtcclxuICAgICAgICAgICAgaWYgKHZhbHVlICE9IEpTT04uc3RyaW5naWZ5KHRoaXMuX3dlYnRvb25UeXBlKSkge1xyXG4gICAgICAgICAgICAgIHRoaXMuX3dlYnRvb25UeXBlID0gSlNPTi5wYXJzZSh2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgdGhpcy5nZXRSZWNlbnRXZWJ0b29uKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSBcInNvcnRXZWJ0b29uXCIpIHtcclxuICAgICAgICAgICAgaWYgKHZhbHVlICE9IEpTT04uc3RyaW5naWZ5KHRoaXMuX3NvcnRXZWJ0b29uKSkge1xyXG4gICAgICAgICAgICAgIHRoaXMuX3NvcnRXZWJ0b29uID0gSlNPTi5wYXJzZSh2YWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHRoaXMub3B0aW9uLmdldFVzZUJ5dGVzKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBAY29tcHV0ZWQgZ2V0IHN0b3JhZ2UoKSB7XHJcbiAgICByZXR1cm4gY2hyb21lLnN0b3JhZ2VbdGhpcy5vcHRpb24uc3RvcmVMb2NhdGlvbl07XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDrsKnrrLjtlZwg7Ju57Yiw7J2YIOygnOuqqeqzvCDtg4DsnoXsnYQg7KCA7J6l7ZWp64uI64ukLlxyXG4gICAqL1xyXG4gIEBvYnNlcnZhYmxlXHJcbiAgcHJpdmF0ZSBfd2VidG9vblR5cGU6IFdlYnRvb25UeXBlID0ge307XHJcblxyXG4gIEBjb21wdXRlZFxyXG4gIHB1YmxpYyBnZXQgd2VidG9vblR5cGUoKTogV2VidG9vblR5cGUge1xyXG4gICAgcmV0dXJuIHRoaXMuX3dlYnRvb25UeXBlO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHNldCB3ZWJ0b29uVHlwZSh2YWx1ZTogV2VidG9vblR5cGUpIHtcclxuICAgIHRoaXMuX3dlYnRvb25UeXBlID0gdmFsdWU7XHJcbiAgICB0aGlzLnNhdmVUb1N0b3JlKFwid2VidG9vblwiLCB2YWx1ZSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDrsKnrrLjtlZwg7ZqM7LCo7J2YIOygleuztOulvCDsoIDsnqXtlanri4jri6QuXHJcbiAgICovXHJcbiAgQG9ic2VydmFibGVcclxuICBwcml2YXRlIF92aXNpdHM6IFZpc2l0VHlwZSA9IHt9O1xyXG5cclxuICBAY29tcHV0ZWRcclxuICBwdWJsaWMgZ2V0IHZpc2l0cygpOiBWaXNpdFR5cGUge1xyXG4gICAgcmV0dXJuIHRoaXMuX3Zpc2l0cztcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzZXQgdmlzaXRzKHZhbHVlOiBWaXNpdFR5cGUpIHtcclxuICAgIHRoaXMuX3Zpc2l0cyA9IHZhbHVlO1xyXG4gICAgdGhpcy5zYXZlVG9TdG9yZShcInZpc2l0c1wiLCB2YWx1ZSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDsgqzsmqnsnpDqsIAg67O4IOyKpO2BrOuhpCDrjbDsnbTthLDrpbwg7KCA7J6l7ZWp64uI64ukLlxyXG4gICAqL1xyXG4gIEBvYnNlcnZhYmxlXHJcbiAgcHJpdmF0ZSBfc2Nyb2xsczogU2Nyb2xsVHlwZSA9IHt9O1xyXG5cclxuICBAY29tcHV0ZWRcclxuICBwdWJsaWMgZ2V0IHNjcm9sbHMoKTogU2Nyb2xsVHlwZSB7XHJcbiAgICByZXR1cm4gdGhpcy5fc2Nyb2xscztcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzZXQgc2Nyb2xscyh2YWx1ZTogU2Nyb2xsVHlwZSkge1xyXG4gICAgdGhpcy5fc2Nyb2xscyA9IHZhbHVlO1xyXG4gICAgdGhpcy5zYXZlVG9TdG9yZShcInNjcm9sbHNcIiwgdmFsdWUpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog7Ju57YiwIOygleuztOulvCDrlLDroZwg7KCA7J6l7ZWp64uI64ukLlxyXG4gICAqL1xyXG4gIEBvYnNlcnZhYmxlXHJcbiAgcHJpdmF0ZSBfaW1nbG9nOiBJbWdsb2dUeXBlID0ge307XHJcblxyXG4gIEBjb21wdXRlZFxyXG4gIHB1YmxpYyBnZXQgaW1nbG9nKCk6IEltZ2xvZ1R5cGUge1xyXG4gICAgcmV0dXJuIHRoaXMuX2ltZ2xvZztcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzZXQgaW1nbG9nKHZhbHVlOiBJbWdsb2dUeXBlKSB7XHJcbiAgICBpZiAoIXRoaXMub3B0aW9uLnVzZUltZ0xvZykge1xyXG4gICAgICBjb25zb2xlLmVycm9yKFwiaW1nbG9nIOuvuOyCrOyaqSDspJFcIik7XHJcbiAgICB9XHJcbiAgICB0aGlzLl9pbWdsb2cgPSB2YWx1ZTtcclxuICAgIHRoaXMuc2F2ZVRvU3RvcmUoXCJpbWdsb2dcIiwgdmFsdWUpO1xyXG4gIH1cclxuXHJcbiAgQG9ic2VydmFibGVcclxuICBwdWJsaWMgTWF4VmlldzogbnVtYmVyID0gMjA7XHJcblxyXG4gIC8qKlxyXG4gICAqIOy1nOq3vCDsm7ntiLDrk6QuXHJcbiAgICovXHJcbiAgQG9ic2VydmFibGVcclxuICBwcml2YXRlIF9yZWNlbnRXZWJ0b29uOiBSZWNlbnRXZWJ0b29uW10gPSBbXTtcclxuXHJcbiAgQGNvbXB1dGVkXHJcbiAgcHVibGljIGdldCByZWNlbnRXZWJ0b29uKCk6IFJlY2VudFdlYnRvb25bXSB7XHJcbiAgICByZXR1cm4gdGhpcy5fcmVjZW50V2VidG9vbi5tYXAoKGl0ZW0sIGlkeCkgPT4ge1xyXG4gICAgICBpZiAoaWR4IDwgdGhpcy5NYXhWaWV3KSB7XHJcbiAgICAgICAgcmV0dXJuIGl0ZW07XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHNldCByZWNlbnRXZWJ0b29uKHZhbHVlOiBSZWNlbnRXZWJ0b29uW10pIHtcclxuICAgIHRoaXMuX3JlY2VudFdlYnRvb24gPSB2YWx1ZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOyalOydvCDrs4Qg7Ju57YiwXHJcbiAgICpcclxuICAgKi9cclxuICBAb2JzZXJ2YWJsZVxyXG4gIHByaXZhdGUgX2RhaWx5V2VidG9vbnM6IFdlYnRvb25JbmZvID0ge307XHJcblxyXG4gIEBjb21wdXRlZFxyXG4gIHB1YmxpYyBnZXQgZGFpbHlXZWJ0b29ucygpOiBXZWJ0b29uSW5mbyB7XHJcbiAgICByZXR1cm4gdGhpcy5fZGFpbHlXZWJ0b29ucztcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzZXQgZGFpbHlXZWJ0b29ucyh2YWx1ZTogV2VidG9vbkluZm8pIHtcclxuICAgIHRoaXMuX2RhaWx5V2VidG9vbnMgPSB2YWx1ZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOymkOqyqOywvuq4sCDtlZwg7Ju57YiwXHJcbiAgICpcclxuICAgKi9cclxuICBAb2JzZXJ2YWJsZVxyXG4gIHByaXZhdGUgX3N0YXJXZWJ0b29uczogU3RhcmVkVHlwZSA9IHt9O1xyXG5cclxuICBAY29tcHV0ZWRcclxuICBwdWJsaWMgZ2V0IHN0YXJXZWJ0b29ucygpOiBTdGFyZWRUeXBlIHtcclxuICAgIHJldHVybiB0aGlzLl9zdGFyV2VidG9vbnM7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2V0IHN0YXJXZWJ0b29ucyh2YWx1ZTogU3RhcmVkVHlwZSkge1xyXG4gICAgdGhpcy5fc3RhcldlYnRvb25zID0gdmFsdWU7XHJcbiAgICB0aGlzLnNhdmVUb1N0b3JlKFwiZmF2b3JhdGVcIiwgdmFsdWUpO1xyXG4gICAgY29uc29sZS5sb2coXCJjaGFuZ2Ugc3RhcldlYnRvb25zXCIpO1xyXG4gIH1cclxuXHJcbiAgQG9ic2VydmFibGVcclxuICBwcml2YXRlIF9zb3J0V2VidG9vbjogU29ydFdlYnRvb25UeXBlID0ge307XHJcblxyXG4gIEBjb21wdXRlZFxyXG4gIHB1YmxpYyBnZXQgc29ydFdlYnRvb24oKTogU29ydFdlYnRvb25UeXBlIHtcclxuICAgIHJldHVybiB0aGlzLl9zb3J0V2VidG9vbjtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzZXQgc29ydFdlYnRvb24odmFsdWU6IFNvcnRXZWJ0b29uVHlwZSkge1xyXG4gICAgdGhpcy5fc29ydFdlYnRvb24gPSB2YWx1ZTtcclxuICAgIHRoaXMuc2F2ZVRvU3RvcmUoXCJzb3J0V2VidG9vblwiLCB2YWx1ZSk7XHJcbiAgfVxyXG5cclxuICBAY29tcHV0ZWRcclxuICBwdWJsaWMgZ2V0IHN0YXJXZWJ0b29uSW5mbygpOiBXZWJ0b29uSW5mb1R5cGVbXSB7XHJcbiAgICBjb25zdCByZXR1cm5WYWx1ZTogV2VidG9vbkluZm9UeXBlW10gPSBbXTtcclxuXHJcbiAgICBPYmplY3Qua2V5cyh0aGlzLl9zdGFyV2VidG9vbnMpLmZvckVhY2godmFsdWUgPT4ge1xyXG4gICAgICBpZiAodGhpcy5fc3RhcldlYnRvb25zW3ZhbHVlXSkge1xyXG4gICAgICAgIChPYmplY3Qua2V5cyh0aGlzLl9kYWlseVdlYnRvb25zKS5tYXAoXHJcbiAgICAgICAgICBrZXkgPT4gdGhpcy5fZGFpbHlXZWJ0b29uc1trZXldXHJcbiAgICAgICAgKSBhcyBXZWJ0b29uSW5mb1R5cGVbXVtdKS5mb3JFYWNoKHdsaXN0ID0+IHtcclxuICAgICAgICAgIHdsaXN0LmZvckVhY2god2VidG9vbiA9PiB7XHJcbiAgICAgICAgICAgIC8vIHJlYWQtb25seSBvYmplY3TrpbwgY2xvbmXtlaguXHJcbiAgICAgICAgICAgIGNvbnN0IHd0ID0gT2JqZWN0LmFzc2lnbih7fSwgd2VidG9vbik7XHJcbiAgICAgICAgICAgIGlmICh3dC5pZCA9PT0gcGFyc2VJbnQodmFsdWUpKSB7XHJcbiAgICAgICAgICAgICAgbGV0IGV4aXN0cyA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgIHJldHVyblZhbHVlLmZvckVhY2goKHsgaWQsIGlzVXAsIGlzUmVzdCB9KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaWQgPT09IHd0LmlkKSBleGlzdHMgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChpc1Jlc3QgfHwgaXNVcCkge1xyXG4gICAgICAgICAgICAgICAgICByZXR1cm5WYWx1ZS5mb3JFYWNoKGZpbmQgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChmaW5kLmlkID09PSBpZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgZmluZC5pc1VwID0gaXNVcDtcclxuICAgICAgICAgICAgICAgICAgICAgIGZpbmQuaXNSZXN0ID0gaXNSZXN0O1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgaWYgKCFleGlzdHMpIHJldHVyblZhbHVlLnB1c2god3QpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gcmV0dXJuVmFsdWU7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDsm7ntiLAg6riw66Gd7J2YIOqwnOyImFxyXG4gICAqXHJcbiAgICogQHJlYWRvbmx5XHJcbiAgICovXHJcbiAgQGNvbXB1dGVkIGdldCB2aXNpdENvdW50KCkge1xyXG4gICAgbGV0IHJlc3VsdCA9IDA7XHJcbiAgICBPYmplY3Qua2V5cyh0aGlzLnZpc2l0cykuZm9yRWFjaCh2ID0+IHtcclxuICAgICAgcmVzdWx0ICs9IE9iamVjdC5rZXlzKHRoaXMudmlzaXRzW3ZdKS5sZW5ndGg7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfVxyXG5cclxuICBAYWN0aW9uIHJlcXVlc3RJbmZvKCkge31cclxuXHJcbiAgQG9ic2VydmFibGUgbG9hZGluZ1N0YXR1czogTG9hZGluZ1N0YXR1cyA9IFwibm90IHN0YXJ0XCI7XHJcblxyXG4gIEBhY3Rpb25cclxuICBwdWJsaWMgYXN5bmMgZ2V0UmVjZW50V2VidG9vbigpIHtcclxuICAgIGNvbnN0IHdlYnRvb25zOiBSZWNlbnRXZWJ0b29uW10gPSBbXTtcclxuICAgIGNvbnN0IHByb21pc2VzOiBQcm9taXNlPHZvaWQ+W10gPSBbXTtcclxuICAgIHRoaXMubG9hZGluZ1N0YXR1cyA9IFwic3RhcnRcIjtcclxuICAgIE9iamVjdC5rZXlzKHRoaXMuX3Zpc2l0cykuZm9yRWFjaChrZXkgPT4ge1xyXG4gICAgICBPYmplY3Qua2V5cyh0aGlzLl92aXNpdHNba2V5XSkuZm9yRWFjaChrZXkyID0+IHtcclxuICAgICAgICBpZiAoIXRoaXMuX2ltZ2xvZ1tgJHtrZXl9LSR7a2V5Mn1gXSkge1xyXG4gICAgICAgICAgcHJvbWlzZXMucHVzaChcclxuICAgICAgICAgICAgV2VidG9vblJlcXVlc3QuZ2V0T3BlbkdyYXBoKFxyXG4gICAgICAgICAgICAgIHRoaXMuX3dlYnRvb25UeXBlW2tleV0udHlwZSxcclxuICAgICAgICAgICAgICBwYXJzZUludChrZXkpLFxyXG4gICAgICAgICAgICAgIHBhcnNlSW50KGtleTIpXHJcbiAgICAgICAgICAgICkudGhlbih2YWx1ZSA9PiB7XHJcbiAgICAgICAgICAgICAgaWYgKHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICB3ZWJ0b29ucy5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgaWQ6IHBhcnNlSW50KGtleSksXHJcbiAgICAgICAgICAgICAgICAgIGxhc3RWaXNpdDogdGhpcy5fdmlzaXRzW2tleV1ba2V5Ml0gKiAxMDAwLFxyXG4gICAgICAgICAgICAgICAgICBuYW1lOiB0aGlzLl93ZWJ0b29uVHlwZVtrZXldLnRpdGxlLFxyXG4gICAgICAgICAgICAgICAgICBubzogcGFyc2VJbnQoa2V5MiksXHJcbiAgICAgICAgICAgICAgICAgIHR5cGU6IHRoaXMuX3dlYnRvb25UeXBlW2tleV0udHlwZSxcclxuICAgICAgICAgICAgICAgICAgaW1nOiB2YWx1ZS5pbWcsXHJcbiAgICAgICAgICAgICAgICAgIG5vbmFtZTogdmFsdWUudGl0bGVcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9uLnVzZUltZ0xvZykge1xyXG4gICAgICAgICAgICAgICAgICB0aGlzLl9pbWdsb2dbYCR7a2V5fS0ke2tleTJ9YF0gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2U6IHZhbHVlLmltZyxcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiB2YWx1ZS50aXRsZVxyXG4gICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5fdmlzaXRzW2tleV1ba2V5Ml07XHJcbiAgICAgICAgICAgICAgICB0aGlzLnZpc2l0cyA9IHRoaXMuX3Zpc2l0cztcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBjb25zdCB7IGltYWdlLCBuYW1lIH0gPSB0aGlzLl9pbWdsb2dbYCR7a2V5fS0ke2tleTJ9YF07XHJcbiAgICAgICAgICB3ZWJ0b29ucy5wdXNoKHtcclxuICAgICAgICAgICAgaWQ6IHBhcnNlSW50KGtleSksXHJcbiAgICAgICAgICAgIGxhc3RWaXNpdDogdGhpcy5fdmlzaXRzW2tleV1ba2V5Ml0gKiAxMDAwLFxyXG4gICAgICAgICAgICBuYW1lOiB0aGlzLl93ZWJ0b29uVHlwZVtrZXldLnRpdGxlLFxyXG4gICAgICAgICAgICBubzogcGFyc2VJbnQoa2V5MiksXHJcbiAgICAgICAgICAgIHR5cGU6IHRoaXMuX3dlYnRvb25UeXBlW2tleV0udHlwZSxcclxuICAgICAgICAgICAgaW1nOiBpbWFnZSxcclxuICAgICAgICAgICAgbm9uYW1lOiBuYW1lXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgICBhd2FpdCBQcm9taXNlLmFsbChwcm9taXNlcyk7XHJcbiAgICB3ZWJ0b29ucy5zb3J0KChhLCBiKSA9PiB7XHJcbiAgICAgIGlmIChhLmxhc3RWaXNpdCA8IGIubGFzdFZpc2l0KSByZXR1cm4gMTtcclxuICAgICAgcmV0dXJuIC0xO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLnJlY2VudFdlYnRvb24gPSB3ZWJ0b29ucztcclxuICAgIHRoaXMubG9hZGluZ1N0YXR1cyA9IFwiZW5kXCI7XHJcbiAgICAvLyBTYXZlIHRvIENocm9tZVxyXG4gICAgdGhpcy5pbWdsb2cgPSB0aGlzLl9pbWdsb2c7XHJcbiAgICB0aGlzLl92aXNpdHMgPSB0aGlzLl92aXNpdHM7XHJcbiAgICBjb25zb2xlLmxvZyh3ZWJ0b29ucyk7XHJcbiAgfVxyXG5cclxuICBAYWN0aW9uIHNldFZpc2l0c0Zyb21DaHJvbWUoKSB7XHJcbiAgICBjaHJvbWUuaGlzdG9yeS5zZWFyY2goXHJcbiAgICAgIHtcclxuICAgICAgICB0ZXh0OiBcImRldGFpbC5uaG4/dGl0bGVJZD1cIixcclxuICAgICAgICBzdGFydFRpbWU6IDAsXHJcbiAgICAgICAgbWF4UmVzdWx0czogNTAwMFxyXG4gICAgICB9LFxyXG4gICAgICBkYXRhID0+IHtcclxuICAgICAgICB0aGlzLndlYnRvb25UeXBlID0gdGhpcy52aXNpdHMgPSB7fTtcclxuICAgICAgICBjb25zdCB3ZWJ0b29uOiBXZWJ0b29uVHlwZSA9IHt9O1xyXG4gICAgICAgIGNvbnN0IHZpc2l0czogVmlzaXRUeXBlID0ge307XHJcbiAgICAgICAgbGV0IGluZGV4ID0gMDtcclxuXHJcbiAgICAgICAgZGF0YS5mb3JFYWNoKGQgPT4ge1xyXG4gICAgICAgICAgaWYgKCFkLnRpdGxlIHx8IGluZGV4ID49IHRoaXMub3B0aW9uLmhpc3RvcnlNYXgpIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgIGNvbnN0IHVybCA9IG5ldyBVUkwoZC51cmwpO1xyXG4gICAgICAgICAgY29uc3QgcGFyYW1zID0gdXJsLnNlYXJjaFBhcmFtcztcclxuICAgICAgICAgIGNvbnN0IHdpZCA9IHBhcmFtcy5nZXQoXCJ0aXRsZUlkXCIpO1xyXG4gICAgICAgICAgY29uc3Qgd25vID0gcGFyYW1zLmdldChcIm5vXCIpO1xyXG5cclxuICAgICAgICAgIGlmICghd2lkIHx8ICF3bm8pIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgIGlmICghd2VidG9vblt3aWRdKSB7XHJcbiAgICAgICAgICAgIHdlYnRvb25bd2lkXSA9IHt9O1xyXG4gICAgICAgICAgICB2aXNpdHNbd2lkXSA9IHt9O1xyXG4gICAgICAgICAgICB3ZWJ0b29uW3dpZF0udGl0bGUgPSBkLnRpdGxlLnNwbGl0KFwiOjpcIilbMF07XHJcbiAgICAgICAgICAgIHdlYnRvb25bd2lkXS50eXBlID0gdXJsLnBhdGhuYW1lLnNwbGl0KFwiL2RldGFpbC5uaG5cIilbMF07XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAoIXZpc2l0c1t3aWRdW3dub10pIHtcclxuICAgICAgICAgICAgaW5kZXgrKztcclxuICAgICAgICAgICAgdmlzaXRzW3dpZF1bd25vXSA9IE1hdGguZmxvb3IoZC5sYXN0VmlzaXRUaW1lIC8gMTAwMCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy53ZWJ0b29uVHlwZSA9IHdlYnRvb247XHJcbiAgICAgICAgdGhpcy52aXNpdHMgPSB2aXNpdHM7XHJcbiAgICAgICAgaWYgKHdpbmRvd1tcIlVJa2l0XCJdKSB7XHJcbiAgICAgICAgICBVSWtpdC5ub3RpZmljYXRpb24oYDxkaXYgY2xhc3M9XCJ1ay10ZXh0LXNtYWxsXCI+67Cp66y46riw66Gd7JeQ7IScIOq4sOuhneydhCDrtojrn6zsmZTsirXri4jri6QuPC9kaXY+YCwge1xyXG4gICAgICAgICAgICB0aW1lb3V0OiAyMDAwXHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICk7XHJcbiAgfVxyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=