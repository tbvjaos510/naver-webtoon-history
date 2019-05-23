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

function createAction$$1(actionName, fn, ref) {
    if (true) {
        invariant$$1(typeof fn === "function", "`action` can only be invoked on functions");
        if (typeof actionName !== "string" || !actionName)
            fail$$1("actions should have valid names, got: '" + actionName + "'");
    }
    var res = function () {
        return executeAction$$1(actionName, fn, ref || this, arguments);
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
        if (this.isDisposed) {
            fail$$1("Reaction already disposed");
        }
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
        addHiddenProp$$1(arg1, arg2, createAction$$1(arg1.name || arg2, arg3.value, this));
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
            entry = new ObservableValue$$1(value, referenceEnhancer$$1, this.name + "." + stringifyKey(key) + "?", false);
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
            var observable$$1 = new ObservableValue$$1(newValue, _this.enhancer, _this.name + "." + stringifyKey(key), false);
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
                    fail$$1("Cannot initialize from classes that inherit from Map: " + other.constructor.name); // prettier-ignore
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
                // We lie about symbol key types due to https://github.com/Microsoft/TypeScript/issues/1863
                res[typeof key === "symbol" ? key : stringifyKey(key)] = value;
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
                .map(function (key) { return stringifyKey(key) + ": " + ("" + _this.get(key)); })
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
function stringifyKey(key) {
    if (key && key.toString)
        return key.toString();
    else
        return new String(key).toString();
}
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
        var keys$$1 = Object.keys(a);
        var key = void 0;
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
    throw new Error("[mobx] MobX 5+ requires Proxy and Symbol objects. If your environment doesn't support Symbol or Proxy objects, please downgrade to MobX 4. For React Native Android, consider upgrading JSCore.");
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
const store_1 = __webpack_require__(/*! ../store */ "./src/store/index.ts");
const history_1 = __webpack_require__(/*! ./tab/history */ "./src/background/tab/history.ts");
const onInstall_1 = __webpack_require__(/*! ./runtime/onInstall */ "./src/background/runtime/onInstall.ts");
const onMessage_1 = __webpack_require__(/*! ./runtime/onMessage */ "./src/background/runtime/onMessage.ts");
const store = new store_1.default(true, () => {
    history_1.default(store.webtoon, store.option);
    onMessage_1.default(store.webtoon, store.option);
    // contextMenu(store.webtoon, store.option);
});
onInstall_1.default(store.webtoon, store.option);


/***/ }),

/***/ "./src/background/contextMenu.ts":
/*!***************************************!*\
  !*** ./src/background/contextMenu.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const link_1 = __webpack_require__(/*! ../tools/link */ "./src/tools/link/index.ts");
exports.CONTEXT_MENU_ID_SIDEBAR = "OPEN_IN_SIDEBAR";
exports.CONTEXT_MENU_ID_TAB = "OPEN_IN_TAB";
function removeContext(callback) {
    whale.contextMenus.removeAll(callback);
}
exports.removeContext = removeContext;
function addLinkContext() {
    removeContext(() => {
        whale.contextMenus.create({
            id: exports.CONTEXT_MENU_ID_TAB,
            contexts: ["link"],
            title: "팝업창에서 웹툰 보기",
            targetUrlPatterns: [
                "https://comic.naver.com/webtoon/list.nhn?titleId*",
                "https://comic.naver.com/webtoon/detail.nhn?titleId*"
            ]
        });
        whale.contextMenus.create({
            id: exports.CONTEXT_MENU_ID_SIDEBAR,
            contexts: ["link"],
            title: "사이드바에서 웹툰 보기",
            targetUrlPatterns: [
                "https://comic.naver.com/webtoon/list.nhn?titleId*",
                "https://comic.naver.com/webtoon/detail.nhn?titleId*"
            ]
        });
        whale.contextMenus.onClicked.addListener(info => {
            if (info.menuItemId === exports.CONTEXT_MENU_ID_SIDEBAR) {
                link_1.default.openSidebar(info.linkUrl);
            }
            if (info.menuItemId === exports.CONTEXT_MENU_ID_TAB) {
                link_1.default.openPopup(info.linkUrl);
            }
        });
    });
}
exports.addLinkContext = addLinkContext;


/***/ }),

/***/ "./src/background/runtime/migration.ts":
/*!*********************************************!*\
  !*** ./src/background/runtime/migration.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function default_1(prevVersion, curVersion) {
    if (prevVersion === "3.0.0") {
        whale.storage.sync.get(syncValue => {
            whale.storage.local.get(localValue => {
                const get = (name) => syncValue[name] || localValue[name];
                const oldOption = syncValue.option;
                const oldFavorate = get("favorate");
                const oldImglog = get("imglog");
                const oldWebtoon = get("webtoon");
                const oldVisits = get("visits");
                const oldScroll = get("scrolls");
                let newOption = {}, newFavorate = [], newImglog = {}, newWebtoon = {}, newVisits = {}, newScroll = {};
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
                }
                else {
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
                                if (newWebtoon[key2].title == key)
                                    newFavorate.push(key2);
                            });
                        });
                    }
                }
                if (oldVisits)
                    newVisits = oldVisits;
                if (oldImglog)
                    newImglog = oldImglog;
                if (oldScroll)
                    newScroll = oldScroll;
                whale.storage.local.set({
                    imglog: JSON.stringify(newImglog),
                    scrolls: JSON.stringify(newScroll),
                    visits: JSON.stringify(newVisits),
                    webtoon: JSON.stringify(newWebtoon)
                }, () => {
                    console.log("Migration Local Success");
                });
                whale.storage.sync.set({
                    option: JSON.stringify(newOption),
                    favorate: JSON.stringify(newFavorate)
                }, () => {
                    console.log("Migration Sync Success");
                });
            });
        });
    }
}
exports.default = default_1;


/***/ }),

/***/ "./src/background/runtime/onInstall.ts":
/*!*********************************************!*\
  !*** ./src/background/runtime/onInstall.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const migration_1 = __webpack_require__(/*! ./migration */ "./src/background/runtime/migration.ts");
const contextMenu_1 = __webpack_require__(/*! ../contextMenu */ "./src/background/contextMenu.ts");
function default_1(webtoon, option) {
    whale.runtime.onInstalled.addListener(details => {
        contextMenu_1.addLinkContext();
        console.log(details);
        if (details.reason === "install") {
            console.log("Init Start");
            webtoon.setVisitsFromChrome();
        }
        else if (details.reason === "update") {
            const currentVersion = whale.runtime.getManifest().version;
            if (details.previousVersion != currentVersion) {
                console.log(details.previousVersion, currentVersion);
                migration_1.default(details.previousVersion, currentVersion);
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
    whale.runtime.onMessage.addListener((message, sender, response) => {
        const param = new URL(sender.url).searchParams;
        console.log(param);
        const wid = param.get("titleId");
        const no = param.get("no");
        if (message && message.command === "openTab") {
            const link = sender.url.replace("m.comic", "comic");
            // Force Tab
            whale.tabs.create({
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
const Utility = __webpack_require__(/*! ./utility */ "./src/background/tab/utility.ts");
function default_1(webtoon, option) {
    whale.tabs.onUpdated.addListener((tabId, info, tab) => {
        if (info.status && info.status === "complete") {
            const url = new URL(tab.url);
            if (url.host === "comic.naver.com") {
                // 회차 리스트 페이지
                if (url.pathname.indexOf("/list.nhn") > 0) {
                    const webtoonId = url.searchParams.get("titleId");
                    Utility.displayHistory(tabId, webtoonId, webtoon.visits, option.showHistory);
                }
                // 웹툰 보는 페이지
                else if (url.pathname.indexOf("/detail.nhn") > 0) {
                    const webtoonId = url.searchParams.get("titleId");
                    const no = url.searchParams.get("no");
                    console.log(url);
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
                    console.log(webtoonId, no);
                    webtoon.visits[webtoonId][no] = Math.floor(new Date().getTime() / 1000);
                    if (option.saveScroll) {
                        Utility.checkScroll(tabId, false);
                    }
                    if (webtoon.scrolls[webtoonId] && webtoon.scrolls[webtoonId][no]) {
                        Utility.setScroll(tabId, webtoon.scrolls[webtoonId][no], false, option.scrollAlert);
                    }
                    if (option.autoNext) {
                        console.log("autonext");
                        Utility.autoNext(tabId, option.autoNext);
                    }
                    if (option.hiddenComment)
                        Utility.hiddenComment(tabId, false);
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

/***/ "./src/store/index.ts":
/*!****************************!*\
  !*** ./src/store/index.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const option_1 = __webpack_require__(/*! ./option */ "./src/store/option.ts");
const webtoon_1 = __webpack_require__(/*! ./webtoon */ "./src/store/webtoon.ts");
class RootStore {
    constructor(isBackground, onLoad) {
        this.option = new option_1.default(isBackground);
        this.webtoon = new webtoon_1.default(this.option, onLoad);
        // Dev Only
        // whale.storage.onChanged.addListener((change, area) => {
        //   console.log("chrome storage changed", area, change);
        // });
    }
}
exports.default = RootStore;


/***/ }),

/***/ "./src/store/option.ts":
/*!*****************************!*\
  !*** ./src/store/option.ts ***!
  \*****************************/
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
exports.storeKeys = [
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
    "_scrollAlert",
    "_useContextMenu"
];
class OptionStore {
    /**
     * 생성자
     */
    constructor(isBackground) {
        this.onLoad = () => {
            console.log("Webtoon Not Inited");
        };
        this.isPreviousVersion = false;
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
        this._historyMax = 1000;
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
        /**
         * ContextMenu 사용 여부
         */
        this._useContextMenu = false;
        this.defaultOption = this.optionObject;
        this.isBackground = isBackground;
        // Chrome Storage로부터 설정값을 초기화
        whale.storage.sync.get("option", ({ option: item }) => {
            if (item && item.sort != undefined) {
                // 1.6.2 Only
                this.isPreviousVersion = true;
                return;
            }
            if (item)
                item = JSON.parse(item);
            if (item && Object.keys(item).length === exports.storeKeys.length) {
                exports.storeKeys.forEach(key => {
                    this[key] = item[key];
                });
                this.getUseBytes();
                this.onLoad();
            }
            else if (!item || Object.keys(item).length === 0) {
                whale.storage.sync.set({
                    option: JSON.stringify(this.optionObject)
                }, () => {
                    this.getUseBytes();
                    console.log("Option Init");
                    this.onLoad();
                });
            }
            else {
                Object.keys(exports.storeKeys).forEach(key => {
                    if (item[key]) {
                        this[key] = item[key];
                    }
                });
                whale.storage.sync.set({ option: JSON.stringify(this.optionObject) }, () => {
                    this.getUseBytes();
                    console.log("Update Complate");
                    this.onLoad();
                });
            }
        });
        // chrome storage를 store와 동기화
        whale.storage.onChanged.addListener((change, area) => {
            if (change.option && change.option.newValue) {
                if (change.option.newValue.sort)
                    return; // Dev Only
                const option = JSON.parse(change.option.newValue);
                exports.storeKeys.forEach(key => {
                    if (option[key] !== undefined) {
                        this[key] = option[key];
                    }
                });
                if (this.isPreviousVersion) {
                    this.onLoad();
                    this.isPreviousVersion = false;
                }
                this.getUseBytes();
            }
        });
    }
    get optionObject() {
        const obj = {};
        exports.storeKeys.forEach(key => {
            obj[key] = this[key];
        });
        return obj;
    }
    saveToStore() {
        whale.storage.sync.set({
            option: JSON.stringify(this.optionObject)
        });
    }
    getUseBytes() {
        whale.storage.local.getBytesInUse(use => {
            this.localUsage = use;
        });
        whale.storage.sync.getBytesInUse(use => {
            this.syncUsage = use;
        });
    }
    get storeLocation() {
        return this._storeLocation;
    }
    set storeLocation(value) {
        this._storeLocation = value;
        this.historyMax = this.historyMax;
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
        if (this._storeLocation === "sync" && value > 200)
            value = 200;
        if (this._storeLocation === "local" && value > 1000)
            value = 1000;
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
        if (value === false) {
            whale.storage.local.remove("imglog");
        }
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
    get useContextMenu() {
        return this._useContextMenu;
    }
    set useContextMenu(value) {
        this._useContextMenu = value;
        this.saveToStore();
    }
    /**
     * 스토어 초기화
     * @param store 초기화 할 스토어 위치
     */
    resetStore(store) {
        if (store === "local") {
            whale.storage.local.clear(() => {
                this.getUseBytes();
            });
        }
        else {
            whale.storage.sync.remove(["webtoon", "visists", "scorlls", "favorate", "sortWebtoon"], () => {
                this.resetOption();
            });
        }
    }
    resetOption(onLoad) {
        whale.storage.sync.set({
            option: JSON.stringify(this.defaultOption)
        }, onLoad && onLoad);
    }
}
__decorate([
    mobx_1.observable
], OptionStore.prototype, "isBackground", void 0);
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
__decorate([
    mobx_1.observable
], OptionStore.prototype, "_useContextMenu", void 0);
__decorate([
    mobx_1.computed
], OptionStore.prototype, "useContextMenu", null);
exports.default = OptionStore;


/***/ }),

/***/ "./src/store/webtoon.ts":
/*!******************************!*\
  !*** ./src/store/webtoon.ts ***!
  \******************************/
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
const request_1 = __webpack_require__(/*! ../tools/request */ "./src/tools/request/index.ts");
class WebtoonStore {
    constructor(option, onLoad) {
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
        this._starWebtoons = [];
        this._sortWebtoon = {};
        this.completeWebtoons = [];
        this.loadingStatus = "not start";
        this.option = option;
        this.option.onLoad = () => {
            this.storage.get(["webtoon", "visits", "scrolls"], ({ webtoon, visits, scrolls }) => {
                whale.storage.local.get(["imglog"], ({ imglog }) => {
                    whale.storage.sync.get(["favorate", "sortWebtoon"], ({ favorate, sortWebtoon }) => {
                        if (scrolls)
                            this._scrolls = JSON.parse(scrolls);
                        if (visits)
                            this._visits = JSON.parse(visits);
                        if (webtoon)
                            this._webtoonType = JSON.parse(webtoon);
                        if (favorate)
                            this._starWebtoons = JSON.parse(favorate);
                        if (sortWebtoon)
                            this._sortWebtoon = JSON.parse(sortWebtoon);
                        if (imglog)
                            this._imglog = JSON.parse(imglog);
                        this.setRecentWebtoon();
                        this.setDailyWebtoon();
                        this.setCompeteWebtoon();
                        if (!this.option.isBackground) {
                            mobx_1.observe(option, "orderBy", change => {
                                this.setDailyWebtoon();
                            });
                            mobx_1.observe(option, "saveWebtoonSort", change => {
                                this.setDailyWebtoon();
                            });
                        }
                    });
                });
            });
            whale.storage.onChanged.addListener((change, area) => {
                Object.keys(change).forEach((key) => {
                    const value = change[key].newValue || "{}";
                    if (key === "sortWebtoon" && !value)
                        this.setDailyWebtoon();
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
                            this.setRecentWebtoon();
                        }
                    }
                    else if (key === "webtoon") {
                        if (value != JSON.stringify(this._webtoonType)) {
                            this._webtoonType = JSON.parse(value);
                            this.setRecentWebtoon();
                        }
                    }
                    else if (key === "sortWebtoon") {
                        if (value != JSON.stringify(this._sortWebtoon)) {
                            this._sortWebtoon = JSON.parse(value);
                        }
                    }
                });
                this.option.getUseBytes();
            });
            if (onLoad)
                onLoad();
        };
    }
    saveToStore(key, value) {
        if (key === "webtoon" || key === "visits" || key === "scrolls") {
            this.storage.set({
                [key]: JSON.stringify(value)
            }, () => {
                this.option.getUseBytes();
            });
        }
        else if (key === "imglog") {
            whale.storage.local.set({
                [key]: JSON.stringify(value)
            }, () => {
                this.option.getUseBytes();
            });
        }
        else {
            whale.storage.sync.set({
                [key]: JSON.stringify(value)
            }, () => {
                this.option.getUseBytes();
            });
        }
    }
    setDailyWebtoon() {
        request_1.default.getAllWebtoon(this.option.orderBy).then(webtoons => {
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
                        // 정렬
                        webtoons[key].sort((a, b) => sorted.indexOf(a.id) > sorted.indexOf(b.id) ? 1 : -1);
                        // 새로 생긴 웹툰이나 사라진 웹툰을 sortWebtoon에 적용
                        this._sortWebtoon[key] = webtoons[key].map(item => item.id);
                    });
                }
            }
            this.sortWebtoon = this._sortWebtoon;
            this.dailyWebtoons = webtoons;
        });
    }
    get storage() {
        return whale.storage[this.option.storeLocation];
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
        return this._recentWebtoon.filter((item, idx) => {
            if (idx < this.MaxView) {
                return true;
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
        return this.allWebtoon.filter(webtoon => {
            if (this._starWebtoons.indexOf(webtoon.id) > -1)
                return true;
        });
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
    /**
     * 모든 웹툰 리스트
     *
     * @readonly
     */
    get allWebtoon() {
        const webtoons = {};
        Object.keys(this._dailyWebtoons).forEach(day => {
            this._dailyWebtoons[day].forEach(webtoon => {
                if (webtoons[webtoon.id]) {
                    if (webtoon.isRest || webtoon.isUp) {
                        webtoons[webtoon.id] = Object.assign({}, webtoons[webtoon.id], { isRest: webtoon.isRest, isUp: webtoon.isUp });
                    }
                }
                else {
                    webtoons[webtoon.id] = webtoon;
                }
            });
        });
        console.log("get all webtoon");
        const returnValue = [];
        Object.keys(webtoons).forEach(id => returnValue.push(webtoons[id]));
        return returnValue.concat(this.completeWebtoons);
    }
    setCompeteWebtoon() {
        request_1.default.getCompleteWebtoon().then(value => {
            this.completeWebtoons = value;
        });
    }
    setRecentWebtoon() {
        return __awaiter(this, void 0, void 0, function* () {
            const webtoons = [];
            const promises = [];
            this.loadingStatus = "start";
            Object.keys(this._visits).forEach(key => {
                Object.keys(this._visits[key]).forEach(key2 => {
                    if (this.option.isBackground) {
                        if (!this._webtoonType[key])
                            return;
                        webtoons.push({
                            id: parseInt(key),
                            lastVisit: this._visits[key][key2] * 1000,
                            name: this._webtoonType[key].title,
                            no: parseInt(key2),
                            type: this._webtoonType[key].type
                        });
                    }
                    else if (!this.option.useImgLog || !this._imglog[`${key}-${key2}`]) {
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
                                        image: value.img.replace("https://shared-comic.pstatic.net/thumb/", ""),
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
                            img: "https://shared-comic.pstatic.net/thumb/" + image,
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
            if (this.option.useImgLog && !this.option.isBackground)
                this.imglog = this._imglog;
            this._visits = this._visits;
            console.log(webtoons);
        });
    }
    setVisitsFromChrome() {
        this.loadingStatus = "start";
        whale.history.search({
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
                console.log(d);
                const url = new URL(d.url);
                if (url.host.indexOf("m.") > -1) {
                    return false;
                }
                const params = url.searchParams;
                const wid = params.get("titleId");
                const wno = params.get("no");
                if (!wid || !wno)
                    return false;
                if (!webtoon[wid]) {
                    webtoon[wid] = {};
                    visits[wid] = {};
                    webtoon[wid].title = d.title.split("::")[0].trim();
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
    mobx_1.computed
], WebtoonStore.prototype, "allWebtoon", null);
__decorate([
    mobx_1.observable
], WebtoonStore.prototype, "completeWebtoons", void 0);
__decorate([
    mobx_1.action
], WebtoonStore.prototype, "setCompeteWebtoon", null);
__decorate([
    mobx_1.observable
], WebtoonStore.prototype, "loadingStatus", void 0);
__decorate([
    mobx_1.action
], WebtoonStore.prototype, "setRecentWebtoon", null);
__decorate([
    mobx_1.action
], WebtoonStore.prototype, "setVisitsFromChrome", null);
exports.default = WebtoonStore;


/***/ }),

/***/ "./src/tools/link/index.ts":
/*!*********************************!*\
  !*** ./src/tools/link/index.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Link {
    static openUrl(linkTarget, link) {
        switch (linkTarget) {
            case "Current":
                Link.openCurrentTab(link);
                break;
            case "Popup":
                Link.openPopup(link);
                break;
            case "Tab":
                Link.openNewTab(link);
                break;
            case "Sidebar":
                Link.openSidebar(link);
                break;
        }
    }
    static openCurrentTab(link) {
        whale.tabs.update({
            url: link
        });
    }
    static openNewTab(link) {
        whale.tabs.create({
            url: link
        });
    }
    static openPopup(link) {
        whale.windows.create({
            url: link.replace("https://", "https://m."),
            width: 400,
            height: 800,
            type: "popup"
        });
    }
    static openSidebar(link) {
        whale.sidebarAction.show({
            reload: true,
            url: link.replace("https://", "https://m.")
        });
    }
}
exports.default = Link;


/***/ }),

/***/ "./src/tools/request/index.ts":
/*!************************************!*\
  !*** ./src/tools/request/index.ts ***!
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
exports.weekDay = [
    "mon",
    "tue",
    "wed",
    "thu",
    "fri",
    "sat",
    "sun"
];
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
            if (og.title &&
                og.img &&
                og.img.match("https://shared-comic.pstatic.net/thumb/"))
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
            const page = new DOMParser()
                .parseFromString(data, "text/html")
                .querySelector("div.daily_all");
            exports.weekDay.forEach(day => {
                const dayElement = page
                    .querySelector("h4." + day)
                    .parentElement.querySelectorAll("ul>li");
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
    static getCompleteWebtoon() {
        return __awaiter(this, void 0, void 0, function* () {
            const link = `https://comic.naver.com/webtoon/finish.nhn?order=TitleName`;
            const { data } = yield axios_1.default.get(link);
            if (!data) {
                console.log(`request:${link} Error`);
                return null;
            }
            const webtoons = [];
            const childWebtoons = new DOMParser()
                .parseFromString(data, "text/html")
                .querySelectorAll("ul.img_list>li");
            childWebtoons.forEach(element => {
                const toon = {
                    img: element.querySelector("div.thumb img").getAttribute("src"),
                    isRest: false,
                    isUp: false,
                    title: element.querySelector("dl>dt>a").getAttribute("title"),
                    link: `https://comic.naver.com${element
                        .querySelector("dl>dt>a")
                        .getAttribute("href")}`
                };
                toon.id = parseInt(new URL(toon.link).searchParams.get("titleId"));
                webtoons.push(toon);
            });
            return webtoons;
        });
    }
}
exports.default = WebtoonRequest;


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvYWRhcHRlcnMveGhyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvYXhpb3MuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jYW5jZWwvQ2FuY2VsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY2FuY2VsL0NhbmNlbFRva2VuLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY2FuY2VsL2lzQ2FuY2VsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9BeGlvcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvSW50ZXJjZXB0b3JNYW5hZ2VyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9jcmVhdGVFcnJvci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvZGlzcGF0Y2hSZXF1ZXN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9lbmhhbmNlRXJyb3IuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL3NldHRsZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvdHJhbnNmb3JtRGF0YS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2RlZmF1bHRzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9iaW5kLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9idG9hLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9idWlsZFVSTC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvY29tYmluZVVSTHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2Nvb2tpZXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2lzQWJzb2x1dGVVUkwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2lzVVJMU2FtZU9yaWdpbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvbm9ybWFsaXplSGVhZGVyTmFtZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvcGFyc2VIZWFkZXJzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9zcHJlYWQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi91dGlscy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvaXMtYnVmZmVyL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tb2J4L2xpYi9tb2J4Lm1vZHVsZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzIiwid2VicGFjazovLy8od2VicGFjaykvYnVpbGRpbi9nbG9iYWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JhY2tncm91bmQvYmFja2dyb3VuZC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvYmFja2dyb3VuZC9jb250ZXh0TWVudS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvYmFja2dyb3VuZC9ydW50aW1lL21pZ3JhdGlvbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvYmFja2dyb3VuZC9ydW50aW1lL29uSW5zdGFsbC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvYmFja2dyb3VuZC9ydW50aW1lL29uTWVzc2FnZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvYmFja2dyb3VuZC90YWIvaGlzdG9yeS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvYmFja2dyb3VuZC90YWIvdXRpbGl0eS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc3RvcmUvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0b3JlL29wdGlvbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc3RvcmUvd2VidG9vbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdG9vbHMvbGluay9pbmRleC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdG9vbHMvcmVxdWVzdC9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNsRkEs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Q0E7QUFDQSxtQ0FBbUM7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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cUM7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLFlBQVk7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsa0NBQWtDO0FBQzlEO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQix3QkFBd0I7QUFDbEQsUUFBUSxJQUFxQztBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSw0QkFBNEI7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsS0FBcUM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixLQUFxQztBQUN4RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxLQUFxQztBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDO0FBQ2xDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpRkFBaUY7QUFDakY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGtFQUFrRTtBQUNsRTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtREFBbUQ7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksYUFBb0I7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxxQ0FBcUM7QUFDckM7QUFDQSxRQUFRLGFBQW9CO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxLQUFLO0FBQ0w7O0FBRWl1RDs7Ozs7Ozs7Ozs7OztBQ3B5SWp1RDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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IG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvYmFja2dyb3VuZC9iYWNrZ3JvdW5kLnRzXCIpO1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2xpYi9heGlvcycpOyIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xudmFyIHNldHRsZSA9IHJlcXVpcmUoJy4vLi4vY29yZS9zZXR0bGUnKTtcbnZhciBidWlsZFVSTCA9IHJlcXVpcmUoJy4vLi4vaGVscGVycy9idWlsZFVSTCcpO1xudmFyIHBhcnNlSGVhZGVycyA9IHJlcXVpcmUoJy4vLi4vaGVscGVycy9wYXJzZUhlYWRlcnMnKTtcbnZhciBpc1VSTFNhbWVPcmlnaW4gPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvaXNVUkxTYW1lT3JpZ2luJyk7XG52YXIgY3JlYXRlRXJyb3IgPSByZXF1aXJlKCcuLi9jb3JlL2NyZWF0ZUVycm9yJyk7XG52YXIgYnRvYSA9ICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuYnRvYSAmJiB3aW5kb3cuYnRvYS5iaW5kKHdpbmRvdykpIHx8IHJlcXVpcmUoJy4vLi4vaGVscGVycy9idG9hJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24geGhyQWRhcHRlcihjb25maWcpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIGRpc3BhdGNoWGhyUmVxdWVzdChyZXNvbHZlLCByZWplY3QpIHtcbiAgICB2YXIgcmVxdWVzdERhdGEgPSBjb25maWcuZGF0YTtcbiAgICB2YXIgcmVxdWVzdEhlYWRlcnMgPSBjb25maWcuaGVhZGVycztcblxuICAgIGlmICh1dGlscy5pc0Zvcm1EYXRhKHJlcXVlc3REYXRhKSkge1xuICAgICAgZGVsZXRlIHJlcXVlc3RIZWFkZXJzWydDb250ZW50LVR5cGUnXTsgLy8gTGV0IHRoZSBicm93c2VyIHNldCBpdFxuICAgIH1cblxuICAgIHZhciByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgdmFyIGxvYWRFdmVudCA9ICdvbnJlYWR5c3RhdGVjaGFuZ2UnO1xuICAgIHZhciB4RG9tYWluID0gZmFsc2U7XG5cbiAgICAvLyBGb3IgSUUgOC85IENPUlMgc3VwcG9ydFxuICAgIC8vIE9ubHkgc3VwcG9ydHMgUE9TVCBhbmQgR0VUIGNhbGxzIGFuZCBkb2Vzbid0IHJldHVybnMgdGhlIHJlc3BvbnNlIGhlYWRlcnMuXG4gICAgLy8gRE9OJ1QgZG8gdGhpcyBmb3IgdGVzdGluZyBiL2MgWE1MSHR0cFJlcXVlc3QgaXMgbW9ja2VkLCBub3QgWERvbWFpblJlcXVlc3QuXG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAndGVzdCcgJiZcbiAgICAgICAgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgICAgd2luZG93LlhEb21haW5SZXF1ZXN0ICYmICEoJ3dpdGhDcmVkZW50aWFscycgaW4gcmVxdWVzdCkgJiZcbiAgICAgICAgIWlzVVJMU2FtZU9yaWdpbihjb25maWcudXJsKSkge1xuICAgICAgcmVxdWVzdCA9IG5ldyB3aW5kb3cuWERvbWFpblJlcXVlc3QoKTtcbiAgICAgIGxvYWRFdmVudCA9ICdvbmxvYWQnO1xuICAgICAgeERvbWFpbiA9IHRydWU7XG4gICAgICByZXF1ZXN0Lm9ucHJvZ3Jlc3MgPSBmdW5jdGlvbiBoYW5kbGVQcm9ncmVzcygpIHt9O1xuICAgICAgcmVxdWVzdC5vbnRpbWVvdXQgPSBmdW5jdGlvbiBoYW5kbGVUaW1lb3V0KCkge307XG4gICAgfVxuXG4gICAgLy8gSFRUUCBiYXNpYyBhdXRoZW50aWNhdGlvblxuICAgIGlmIChjb25maWcuYXV0aCkge1xuICAgICAgdmFyIHVzZXJuYW1lID0gY29uZmlnLmF1dGgudXNlcm5hbWUgfHwgJyc7XG4gICAgICB2YXIgcGFzc3dvcmQgPSBjb25maWcuYXV0aC5wYXNzd29yZCB8fCAnJztcbiAgICAgIHJlcXVlc3RIZWFkZXJzLkF1dGhvcml6YXRpb24gPSAnQmFzaWMgJyArIGJ0b2EodXNlcm5hbWUgKyAnOicgKyBwYXNzd29yZCk7XG4gICAgfVxuXG4gICAgcmVxdWVzdC5vcGVuKGNvbmZpZy5tZXRob2QudG9VcHBlckNhc2UoKSwgYnVpbGRVUkwoY29uZmlnLnVybCwgY29uZmlnLnBhcmFtcywgY29uZmlnLnBhcmFtc1NlcmlhbGl6ZXIpLCB0cnVlKTtcblxuICAgIC8vIFNldCB0aGUgcmVxdWVzdCB0aW1lb3V0IGluIE1TXG4gICAgcmVxdWVzdC50aW1lb3V0ID0gY29uZmlnLnRpbWVvdXQ7XG5cbiAgICAvLyBMaXN0ZW4gZm9yIHJlYWR5IHN0YXRlXG4gICAgcmVxdWVzdFtsb2FkRXZlbnRdID0gZnVuY3Rpb24gaGFuZGxlTG9hZCgpIHtcbiAgICAgIGlmICghcmVxdWVzdCB8fCAocmVxdWVzdC5yZWFkeVN0YXRlICE9PSA0ICYmICF4RG9tYWluKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIFRoZSByZXF1ZXN0IGVycm9yZWQgb3V0IGFuZCB3ZSBkaWRuJ3QgZ2V0IGEgcmVzcG9uc2UsIHRoaXMgd2lsbCBiZVxuICAgICAgLy8gaGFuZGxlZCBieSBvbmVycm9yIGluc3RlYWRcbiAgICAgIC8vIFdpdGggb25lIGV4Y2VwdGlvbjogcmVxdWVzdCB0aGF0IHVzaW5nIGZpbGU6IHByb3RvY29sLCBtb3N0IGJyb3dzZXJzXG4gICAgICAvLyB3aWxsIHJldHVybiBzdGF0dXMgYXMgMCBldmVuIHRob3VnaCBpdCdzIGEgc3VjY2Vzc2Z1bCByZXF1ZXN0XG4gICAgICBpZiAocmVxdWVzdC5zdGF0dXMgPT09IDAgJiYgIShyZXF1ZXN0LnJlc3BvbnNlVVJMICYmIHJlcXVlc3QucmVzcG9uc2VVUkwuaW5kZXhPZignZmlsZTonKSA9PT0gMCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBQcmVwYXJlIHRoZSByZXNwb25zZVxuICAgICAgdmFyIHJlc3BvbnNlSGVhZGVycyA9ICdnZXRBbGxSZXNwb25zZUhlYWRlcnMnIGluIHJlcXVlc3QgPyBwYXJzZUhlYWRlcnMocmVxdWVzdC5nZXRBbGxSZXNwb25zZUhlYWRlcnMoKSkgOiBudWxsO1xuICAgICAgdmFyIHJlc3BvbnNlRGF0YSA9ICFjb25maWcucmVzcG9uc2VUeXBlIHx8IGNvbmZpZy5yZXNwb25zZVR5cGUgPT09ICd0ZXh0JyA/IHJlcXVlc3QucmVzcG9uc2VUZXh0IDogcmVxdWVzdC5yZXNwb25zZTtcbiAgICAgIHZhciByZXNwb25zZSA9IHtcbiAgICAgICAgZGF0YTogcmVzcG9uc2VEYXRhLFxuICAgICAgICAvLyBJRSBzZW5kcyAxMjIzIGluc3RlYWQgb2YgMjA0IChodHRwczovL2dpdGh1Yi5jb20vYXhpb3MvYXhpb3MvaXNzdWVzLzIwMSlcbiAgICAgICAgc3RhdHVzOiByZXF1ZXN0LnN0YXR1cyA9PT0gMTIyMyA/IDIwNCA6IHJlcXVlc3Quc3RhdHVzLFxuICAgICAgICBzdGF0dXNUZXh0OiByZXF1ZXN0LnN0YXR1cyA9PT0gMTIyMyA/ICdObyBDb250ZW50JyA6IHJlcXVlc3Quc3RhdHVzVGV4dCxcbiAgICAgICAgaGVhZGVyczogcmVzcG9uc2VIZWFkZXJzLFxuICAgICAgICBjb25maWc6IGNvbmZpZyxcbiAgICAgICAgcmVxdWVzdDogcmVxdWVzdFxuICAgICAgfTtcblxuICAgICAgc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgcmVzcG9uc2UpO1xuXG4gICAgICAvLyBDbGVhbiB1cCByZXF1ZXN0XG4gICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICB9O1xuXG4gICAgLy8gSGFuZGxlIGxvdyBsZXZlbCBuZXR3b3JrIGVycm9yc1xuICAgIHJlcXVlc3Qub25lcnJvciA9IGZ1bmN0aW9uIGhhbmRsZUVycm9yKCkge1xuICAgICAgLy8gUmVhbCBlcnJvcnMgYXJlIGhpZGRlbiBmcm9tIHVzIGJ5IHRoZSBicm93c2VyXG4gICAgICAvLyBvbmVycm9yIHNob3VsZCBvbmx5IGZpcmUgaWYgaXQncyBhIG5ldHdvcmsgZXJyb3JcbiAgICAgIHJlamVjdChjcmVhdGVFcnJvcignTmV0d29yayBFcnJvcicsIGNvbmZpZywgbnVsbCwgcmVxdWVzdCkpO1xuXG4gICAgICAvLyBDbGVhbiB1cCByZXF1ZXN0XG4gICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICB9O1xuXG4gICAgLy8gSGFuZGxlIHRpbWVvdXRcbiAgICByZXF1ZXN0Lm9udGltZW91dCA9IGZ1bmN0aW9uIGhhbmRsZVRpbWVvdXQoKSB7XG4gICAgICByZWplY3QoY3JlYXRlRXJyb3IoJ3RpbWVvdXQgb2YgJyArIGNvbmZpZy50aW1lb3V0ICsgJ21zIGV4Y2VlZGVkJywgY29uZmlnLCAnRUNPTk5BQk9SVEVEJyxcbiAgICAgICAgcmVxdWVzdCkpO1xuXG4gICAgICAvLyBDbGVhbiB1cCByZXF1ZXN0XG4gICAgICByZXF1ZXN0ID0gbnVsbDtcbiAgICB9O1xuXG4gICAgLy8gQWRkIHhzcmYgaGVhZGVyXG4gICAgLy8gVGhpcyBpcyBvbmx5IGRvbmUgaWYgcnVubmluZyBpbiBhIHN0YW5kYXJkIGJyb3dzZXIgZW52aXJvbm1lbnQuXG4gICAgLy8gU3BlY2lmaWNhbGx5IG5vdCBpZiB3ZSdyZSBpbiBhIHdlYiB3b3JrZXIsIG9yIHJlYWN0LW5hdGl2ZS5cbiAgICBpZiAodXRpbHMuaXNTdGFuZGFyZEJyb3dzZXJFbnYoKSkge1xuICAgICAgdmFyIGNvb2tpZXMgPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvY29va2llcycpO1xuXG4gICAgICAvLyBBZGQgeHNyZiBoZWFkZXJcbiAgICAgIHZhciB4c3JmVmFsdWUgPSAoY29uZmlnLndpdGhDcmVkZW50aWFscyB8fCBpc1VSTFNhbWVPcmlnaW4oY29uZmlnLnVybCkpICYmIGNvbmZpZy54c3JmQ29va2llTmFtZSA/XG4gICAgICAgICAgY29va2llcy5yZWFkKGNvbmZpZy54c3JmQ29va2llTmFtZSkgOlxuICAgICAgICAgIHVuZGVmaW5lZDtcblxuICAgICAgaWYgKHhzcmZWYWx1ZSkge1xuICAgICAgICByZXF1ZXN0SGVhZGVyc1tjb25maWcueHNyZkhlYWRlck5hbWVdID0geHNyZlZhbHVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEFkZCBoZWFkZXJzIHRvIHRoZSByZXF1ZXN0XG4gICAgaWYgKCdzZXRSZXF1ZXN0SGVhZGVyJyBpbiByZXF1ZXN0KSB7XG4gICAgICB1dGlscy5mb3JFYWNoKHJlcXVlc3RIZWFkZXJzLCBmdW5jdGlvbiBzZXRSZXF1ZXN0SGVhZGVyKHZhbCwga2V5KSB7XG4gICAgICAgIGlmICh0eXBlb2YgcmVxdWVzdERhdGEgPT09ICd1bmRlZmluZWQnICYmIGtleS50b0xvd2VyQ2FzZSgpID09PSAnY29udGVudC10eXBlJykge1xuICAgICAgICAgIC8vIFJlbW92ZSBDb250ZW50LVR5cGUgaWYgZGF0YSBpcyB1bmRlZmluZWRcbiAgICAgICAgICBkZWxldGUgcmVxdWVzdEhlYWRlcnNba2V5XTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBPdGhlcndpc2UgYWRkIGhlYWRlciB0byB0aGUgcmVxdWVzdFxuICAgICAgICAgIHJlcXVlc3Quc2V0UmVxdWVzdEhlYWRlcihrZXksIHZhbCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIEFkZCB3aXRoQ3JlZGVudGlhbHMgdG8gcmVxdWVzdCBpZiBuZWVkZWRcbiAgICBpZiAoY29uZmlnLndpdGhDcmVkZW50aWFscykge1xuICAgICAgcmVxdWVzdC53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuICAgIH1cblxuICAgIC8vIEFkZCByZXNwb25zZVR5cGUgdG8gcmVxdWVzdCBpZiBuZWVkZWRcbiAgICBpZiAoY29uZmlnLnJlc3BvbnNlVHlwZSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgcmVxdWVzdC5yZXNwb25zZVR5cGUgPSBjb25maWcucmVzcG9uc2VUeXBlO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBFeHBlY3RlZCBET01FeGNlcHRpb24gdGhyb3duIGJ5IGJyb3dzZXJzIG5vdCBjb21wYXRpYmxlIFhNTEh0dHBSZXF1ZXN0IExldmVsIDIuXG4gICAgICAgIC8vIEJ1dCwgdGhpcyBjYW4gYmUgc3VwcHJlc3NlZCBmb3IgJ2pzb24nIHR5cGUgYXMgaXQgY2FuIGJlIHBhcnNlZCBieSBkZWZhdWx0ICd0cmFuc2Zvcm1SZXNwb25zZScgZnVuY3Rpb24uXG4gICAgICAgIGlmIChjb25maWcucmVzcG9uc2VUeXBlICE9PSAnanNvbicpIHtcbiAgICAgICAgICB0aHJvdyBlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gSGFuZGxlIHByb2dyZXNzIGlmIG5lZWRlZFxuICAgIGlmICh0eXBlb2YgY29uZmlnLm9uRG93bmxvYWRQcm9ncmVzcyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmVxdWVzdC5hZGRFdmVudExpc3RlbmVyKCdwcm9ncmVzcycsIGNvbmZpZy5vbkRvd25sb2FkUHJvZ3Jlc3MpO1xuICAgIH1cblxuICAgIC8vIE5vdCBhbGwgYnJvd3NlcnMgc3VwcG9ydCB1cGxvYWQgZXZlbnRzXG4gICAgaWYgKHR5cGVvZiBjb25maWcub25VcGxvYWRQcm9ncmVzcyA9PT0gJ2Z1bmN0aW9uJyAmJiByZXF1ZXN0LnVwbG9hZCkge1xuICAgICAgcmVxdWVzdC51cGxvYWQuYWRkRXZlbnRMaXN0ZW5lcigncHJvZ3Jlc3MnLCBjb25maWcub25VcGxvYWRQcm9ncmVzcyk7XG4gICAgfVxuXG4gICAgaWYgKGNvbmZpZy5jYW5jZWxUb2tlbikge1xuICAgICAgLy8gSGFuZGxlIGNhbmNlbGxhdGlvblxuICAgICAgY29uZmlnLmNhbmNlbFRva2VuLnByb21pc2UudGhlbihmdW5jdGlvbiBvbkNhbmNlbGVkKGNhbmNlbCkge1xuICAgICAgICBpZiAoIXJlcXVlc3QpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICByZXF1ZXN0LmFib3J0KCk7XG4gICAgICAgIHJlamVjdChjYW5jZWwpO1xuICAgICAgICAvLyBDbGVhbiB1cCByZXF1ZXN0XG4gICAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKHJlcXVlc3REYXRhID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJlcXVlc3REYXRhID0gbnVsbDtcbiAgICB9XG5cbiAgICAvLyBTZW5kIHRoZSByZXF1ZXN0XG4gICAgcmVxdWVzdC5zZW5kKHJlcXVlc3REYXRhKTtcbiAgfSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG52YXIgYmluZCA9IHJlcXVpcmUoJy4vaGVscGVycy9iaW5kJyk7XG52YXIgQXhpb3MgPSByZXF1aXJlKCcuL2NvcmUvQXhpb3MnKTtcbnZhciBkZWZhdWx0cyA9IHJlcXVpcmUoJy4vZGVmYXVsdHMnKTtcblxuLyoqXG4gKiBDcmVhdGUgYW4gaW5zdGFuY2Ugb2YgQXhpb3NcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gZGVmYXVsdENvbmZpZyBUaGUgZGVmYXVsdCBjb25maWcgZm9yIHRoZSBpbnN0YW5jZVxuICogQHJldHVybiB7QXhpb3N9IEEgbmV3IGluc3RhbmNlIG9mIEF4aW9zXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUluc3RhbmNlKGRlZmF1bHRDb25maWcpIHtcbiAgdmFyIGNvbnRleHQgPSBuZXcgQXhpb3MoZGVmYXVsdENvbmZpZyk7XG4gIHZhciBpbnN0YW5jZSA9IGJpbmQoQXhpb3MucHJvdG90eXBlLnJlcXVlc3QsIGNvbnRleHQpO1xuXG4gIC8vIENvcHkgYXhpb3MucHJvdG90eXBlIHRvIGluc3RhbmNlXG4gIHV0aWxzLmV4dGVuZChpbnN0YW5jZSwgQXhpb3MucHJvdG90eXBlLCBjb250ZXh0KTtcblxuICAvLyBDb3B5IGNvbnRleHQgdG8gaW5zdGFuY2VcbiAgdXRpbHMuZXh0ZW5kKGluc3RhbmNlLCBjb250ZXh0KTtcblxuICByZXR1cm4gaW5zdGFuY2U7XG59XG5cbi8vIENyZWF0ZSB0aGUgZGVmYXVsdCBpbnN0YW5jZSB0byBiZSBleHBvcnRlZFxudmFyIGF4aW9zID0gY3JlYXRlSW5zdGFuY2UoZGVmYXVsdHMpO1xuXG4vLyBFeHBvc2UgQXhpb3MgY2xhc3MgdG8gYWxsb3cgY2xhc3MgaW5oZXJpdGFuY2VcbmF4aW9zLkF4aW9zID0gQXhpb3M7XG5cbi8vIEZhY3RvcnkgZm9yIGNyZWF0aW5nIG5ldyBpbnN0YW5jZXNcbmF4aW9zLmNyZWF0ZSA9IGZ1bmN0aW9uIGNyZWF0ZShpbnN0YW5jZUNvbmZpZykge1xuICByZXR1cm4gY3JlYXRlSW5zdGFuY2UodXRpbHMubWVyZ2UoZGVmYXVsdHMsIGluc3RhbmNlQ29uZmlnKSk7XG59O1xuXG4vLyBFeHBvc2UgQ2FuY2VsICYgQ2FuY2VsVG9rZW5cbmF4aW9zLkNhbmNlbCA9IHJlcXVpcmUoJy4vY2FuY2VsL0NhbmNlbCcpO1xuYXhpb3MuQ2FuY2VsVG9rZW4gPSByZXF1aXJlKCcuL2NhbmNlbC9DYW5jZWxUb2tlbicpO1xuYXhpb3MuaXNDYW5jZWwgPSByZXF1aXJlKCcuL2NhbmNlbC9pc0NhbmNlbCcpO1xuXG4vLyBFeHBvc2UgYWxsL3NwcmVhZFxuYXhpb3MuYWxsID0gZnVuY3Rpb24gYWxsKHByb21pc2VzKSB7XG4gIHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcyk7XG59O1xuYXhpb3Muc3ByZWFkID0gcmVxdWlyZSgnLi9oZWxwZXJzL3NwcmVhZCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGF4aW9zO1xuXG4vLyBBbGxvdyB1c2Ugb2YgZGVmYXVsdCBpbXBvcnQgc3ludGF4IGluIFR5cGVTY3JpcHRcbm1vZHVsZS5leHBvcnRzLmRlZmF1bHQgPSBheGlvcztcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBBIGBDYW5jZWxgIGlzIGFuIG9iamVjdCB0aGF0IGlzIHRocm93biB3aGVuIGFuIG9wZXJhdGlvbiBpcyBjYW5jZWxlZC5cbiAqXG4gKiBAY2xhc3NcbiAqIEBwYXJhbSB7c3RyaW5nPX0gbWVzc2FnZSBUaGUgbWVzc2FnZS5cbiAqL1xuZnVuY3Rpb24gQ2FuY2VsKG1lc3NhZ2UpIHtcbiAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcbn1cblxuQ2FuY2VsLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICByZXR1cm4gJ0NhbmNlbCcgKyAodGhpcy5tZXNzYWdlID8gJzogJyArIHRoaXMubWVzc2FnZSA6ICcnKTtcbn07XG5cbkNhbmNlbC5wcm90b3R5cGUuX19DQU5DRUxfXyA9IHRydWU7XG5cbm1vZHVsZS5leHBvcnRzID0gQ2FuY2VsO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgQ2FuY2VsID0gcmVxdWlyZSgnLi9DYW5jZWwnKTtcblxuLyoqXG4gKiBBIGBDYW5jZWxUb2tlbmAgaXMgYW4gb2JqZWN0IHRoYXQgY2FuIGJlIHVzZWQgdG8gcmVxdWVzdCBjYW5jZWxsYXRpb24gb2YgYW4gb3BlcmF0aW9uLlxuICpcbiAqIEBjbGFzc1xuICogQHBhcmFtIHtGdW5jdGlvbn0gZXhlY3V0b3IgVGhlIGV4ZWN1dG9yIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBDYW5jZWxUb2tlbihleGVjdXRvcikge1xuICBpZiAodHlwZW9mIGV4ZWN1dG9yICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignZXhlY3V0b3IgbXVzdCBiZSBhIGZ1bmN0aW9uLicpO1xuICB9XG5cbiAgdmFyIHJlc29sdmVQcm9taXNlO1xuICB0aGlzLnByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbiBwcm9taXNlRXhlY3V0b3IocmVzb2x2ZSkge1xuICAgIHJlc29sdmVQcm9taXNlID0gcmVzb2x2ZTtcbiAgfSk7XG5cbiAgdmFyIHRva2VuID0gdGhpcztcbiAgZXhlY3V0b3IoZnVuY3Rpb24gY2FuY2VsKG1lc3NhZ2UpIHtcbiAgICBpZiAodG9rZW4ucmVhc29uKSB7XG4gICAgICAvLyBDYW5jZWxsYXRpb24gaGFzIGFscmVhZHkgYmVlbiByZXF1ZXN0ZWRcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0b2tlbi5yZWFzb24gPSBuZXcgQ2FuY2VsKG1lc3NhZ2UpO1xuICAgIHJlc29sdmVQcm9taXNlKHRva2VuLnJlYXNvbik7XG4gIH0pO1xufVxuXG4vKipcbiAqIFRocm93cyBhIGBDYW5jZWxgIGlmIGNhbmNlbGxhdGlvbiBoYXMgYmVlbiByZXF1ZXN0ZWQuXG4gKi9cbkNhbmNlbFRva2VuLnByb3RvdHlwZS50aHJvd0lmUmVxdWVzdGVkID0gZnVuY3Rpb24gdGhyb3dJZlJlcXVlc3RlZCgpIHtcbiAgaWYgKHRoaXMucmVhc29uKSB7XG4gICAgdGhyb3cgdGhpcy5yZWFzb247XG4gIH1cbn07XG5cbi8qKlxuICogUmV0dXJucyBhbiBvYmplY3QgdGhhdCBjb250YWlucyBhIG5ldyBgQ2FuY2VsVG9rZW5gIGFuZCBhIGZ1bmN0aW9uIHRoYXQsIHdoZW4gY2FsbGVkLFxuICogY2FuY2VscyB0aGUgYENhbmNlbFRva2VuYC5cbiAqL1xuQ2FuY2VsVG9rZW4uc291cmNlID0gZnVuY3Rpb24gc291cmNlKCkge1xuICB2YXIgY2FuY2VsO1xuICB2YXIgdG9rZW4gPSBuZXcgQ2FuY2VsVG9rZW4oZnVuY3Rpb24gZXhlY3V0b3IoYykge1xuICAgIGNhbmNlbCA9IGM7XG4gIH0pO1xuICByZXR1cm4ge1xuICAgIHRva2VuOiB0b2tlbixcbiAgICBjYW5jZWw6IGNhbmNlbFxuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBDYW5jZWxUb2tlbjtcbiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpc0NhbmNlbCh2YWx1ZSkge1xuICByZXR1cm4gISEodmFsdWUgJiYgdmFsdWUuX19DQU5DRUxfXyk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZGVmYXVsdHMgPSByZXF1aXJlKCcuLy4uL2RlZmF1bHRzJyk7XG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG52YXIgSW50ZXJjZXB0b3JNYW5hZ2VyID0gcmVxdWlyZSgnLi9JbnRlcmNlcHRvck1hbmFnZXInKTtcbnZhciBkaXNwYXRjaFJlcXVlc3QgPSByZXF1aXJlKCcuL2Rpc3BhdGNoUmVxdWVzdCcpO1xuXG4vKipcbiAqIENyZWF0ZSBhIG5ldyBpbnN0YW5jZSBvZiBBeGlvc1xuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBpbnN0YW5jZUNvbmZpZyBUaGUgZGVmYXVsdCBjb25maWcgZm9yIHRoZSBpbnN0YW5jZVxuICovXG5mdW5jdGlvbiBBeGlvcyhpbnN0YW5jZUNvbmZpZykge1xuICB0aGlzLmRlZmF1bHRzID0gaW5zdGFuY2VDb25maWc7XG4gIHRoaXMuaW50ZXJjZXB0b3JzID0ge1xuICAgIHJlcXVlc3Q6IG5ldyBJbnRlcmNlcHRvck1hbmFnZXIoKSxcbiAgICByZXNwb25zZTogbmV3IEludGVyY2VwdG9yTWFuYWdlcigpXG4gIH07XG59XG5cbi8qKlxuICogRGlzcGF0Y2ggYSByZXF1ZXN0XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBUaGUgY29uZmlnIHNwZWNpZmljIGZvciB0aGlzIHJlcXVlc3QgKG1lcmdlZCB3aXRoIHRoaXMuZGVmYXVsdHMpXG4gKi9cbkF4aW9zLnByb3RvdHlwZS5yZXF1ZXN0ID0gZnVuY3Rpb24gcmVxdWVzdChjb25maWcpIHtcbiAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gIC8vIEFsbG93IGZvciBheGlvcygnZXhhbXBsZS91cmwnWywgY29uZmlnXSkgYSBsYSBmZXRjaCBBUElcbiAgaWYgKHR5cGVvZiBjb25maWcgPT09ICdzdHJpbmcnKSB7XG4gICAgY29uZmlnID0gdXRpbHMubWVyZ2Uoe1xuICAgICAgdXJsOiBhcmd1bWVudHNbMF1cbiAgICB9LCBhcmd1bWVudHNbMV0pO1xuICB9XG5cbiAgY29uZmlnID0gdXRpbHMubWVyZ2UoZGVmYXVsdHMsIHttZXRob2Q6ICdnZXQnfSwgdGhpcy5kZWZhdWx0cywgY29uZmlnKTtcbiAgY29uZmlnLm1ldGhvZCA9IGNvbmZpZy5tZXRob2QudG9Mb3dlckNhc2UoKTtcblxuICAvLyBIb29rIHVwIGludGVyY2VwdG9ycyBtaWRkbGV3YXJlXG4gIHZhciBjaGFpbiA9IFtkaXNwYXRjaFJlcXVlc3QsIHVuZGVmaW5lZF07XG4gIHZhciBwcm9taXNlID0gUHJvbWlzZS5yZXNvbHZlKGNvbmZpZyk7XG5cbiAgdGhpcy5pbnRlcmNlcHRvcnMucmVxdWVzdC5mb3JFYWNoKGZ1bmN0aW9uIHVuc2hpZnRSZXF1ZXN0SW50ZXJjZXB0b3JzKGludGVyY2VwdG9yKSB7XG4gICAgY2hhaW4udW5zaGlmdChpbnRlcmNlcHRvci5mdWxmaWxsZWQsIGludGVyY2VwdG9yLnJlamVjdGVkKTtcbiAgfSk7XG5cbiAgdGhpcy5pbnRlcmNlcHRvcnMucmVzcG9uc2UuZm9yRWFjaChmdW5jdGlvbiBwdXNoUmVzcG9uc2VJbnRlcmNlcHRvcnMoaW50ZXJjZXB0b3IpIHtcbiAgICBjaGFpbi5wdXNoKGludGVyY2VwdG9yLmZ1bGZpbGxlZCwgaW50ZXJjZXB0b3IucmVqZWN0ZWQpO1xuICB9KTtcblxuICB3aGlsZSAoY2hhaW4ubGVuZ3RoKSB7XG4gICAgcHJvbWlzZSA9IHByb21pc2UudGhlbihjaGFpbi5zaGlmdCgpLCBjaGFpbi5zaGlmdCgpKTtcbiAgfVxuXG4gIHJldHVybiBwcm9taXNlO1xufTtcblxuLy8gUHJvdmlkZSBhbGlhc2VzIGZvciBzdXBwb3J0ZWQgcmVxdWVzdCBtZXRob2RzXG51dGlscy5mb3JFYWNoKFsnZGVsZXRlJywgJ2dldCcsICdoZWFkJywgJ29wdGlvbnMnXSwgZnVuY3Rpb24gZm9yRWFjaE1ldGhvZE5vRGF0YShtZXRob2QpIHtcbiAgLyplc2xpbnQgZnVuYy1uYW1lczowKi9cbiAgQXhpb3MucHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbih1cmwsIGNvbmZpZykge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QodXRpbHMubWVyZ2UoY29uZmlnIHx8IHt9LCB7XG4gICAgICBtZXRob2Q6IG1ldGhvZCxcbiAgICAgIHVybDogdXJsXG4gICAgfSkpO1xuICB9O1xufSk7XG5cbnV0aWxzLmZvckVhY2goWydwb3N0JywgJ3B1dCcsICdwYXRjaCddLCBmdW5jdGlvbiBmb3JFYWNoTWV0aG9kV2l0aERhdGEobWV0aG9kKSB7XG4gIC8qZXNsaW50IGZ1bmMtbmFtZXM6MCovXG4gIEF4aW9zLnByb3RvdHlwZVttZXRob2RdID0gZnVuY3Rpb24odXJsLCBkYXRhLCBjb25maWcpIHtcbiAgICByZXR1cm4gdGhpcy5yZXF1ZXN0KHV0aWxzLm1lcmdlKGNvbmZpZyB8fCB7fSwge1xuICAgICAgbWV0aG9kOiBtZXRob2QsXG4gICAgICB1cmw6IHVybCxcbiAgICAgIGRhdGE6IGRhdGFcbiAgICB9KSk7XG4gIH07XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBBeGlvcztcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG5mdW5jdGlvbiBJbnRlcmNlcHRvck1hbmFnZXIoKSB7XG4gIHRoaXMuaGFuZGxlcnMgPSBbXTtcbn1cblxuLyoqXG4gKiBBZGQgYSBuZXcgaW50ZXJjZXB0b3IgdG8gdGhlIHN0YWNrXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVsZmlsbGVkIFRoZSBmdW5jdGlvbiB0byBoYW5kbGUgYHRoZW5gIGZvciBhIGBQcm9taXNlYFxuICogQHBhcmFtIHtGdW5jdGlvbn0gcmVqZWN0ZWQgVGhlIGZ1bmN0aW9uIHRvIGhhbmRsZSBgcmVqZWN0YCBmb3IgYSBgUHJvbWlzZWBcbiAqXG4gKiBAcmV0dXJuIHtOdW1iZXJ9IEFuIElEIHVzZWQgdG8gcmVtb3ZlIGludGVyY2VwdG9yIGxhdGVyXG4gKi9cbkludGVyY2VwdG9yTWFuYWdlci5wcm90b3R5cGUudXNlID0gZnVuY3Rpb24gdXNlKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpIHtcbiAgdGhpcy5oYW5kbGVycy5wdXNoKHtcbiAgICBmdWxmaWxsZWQ6IGZ1bGZpbGxlZCxcbiAgICByZWplY3RlZDogcmVqZWN0ZWRcbiAgfSk7XG4gIHJldHVybiB0aGlzLmhhbmRsZXJzLmxlbmd0aCAtIDE7XG59O1xuXG4vKipcbiAqIFJlbW92ZSBhbiBpbnRlcmNlcHRvciBmcm9tIHRoZSBzdGFja1xuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBpZCBUaGUgSUQgdGhhdCB3YXMgcmV0dXJuZWQgYnkgYHVzZWBcbiAqL1xuSW50ZXJjZXB0b3JNYW5hZ2VyLnByb3RvdHlwZS5lamVjdCA9IGZ1bmN0aW9uIGVqZWN0KGlkKSB7XG4gIGlmICh0aGlzLmhhbmRsZXJzW2lkXSkge1xuICAgIHRoaXMuaGFuZGxlcnNbaWRdID0gbnVsbDtcbiAgfVxufTtcblxuLyoqXG4gKiBJdGVyYXRlIG92ZXIgYWxsIHRoZSByZWdpc3RlcmVkIGludGVyY2VwdG9yc1xuICpcbiAqIFRoaXMgbWV0aG9kIGlzIHBhcnRpY3VsYXJseSB1c2VmdWwgZm9yIHNraXBwaW5nIG92ZXIgYW55XG4gKiBpbnRlcmNlcHRvcnMgdGhhdCBtYXkgaGF2ZSBiZWNvbWUgYG51bGxgIGNhbGxpbmcgYGVqZWN0YC5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gY2FsbCBmb3IgZWFjaCBpbnRlcmNlcHRvclxuICovXG5JbnRlcmNlcHRvck1hbmFnZXIucHJvdG90eXBlLmZvckVhY2ggPSBmdW5jdGlvbiBmb3JFYWNoKGZuKSB7XG4gIHV0aWxzLmZvckVhY2godGhpcy5oYW5kbGVycywgZnVuY3Rpb24gZm9yRWFjaEhhbmRsZXIoaCkge1xuICAgIGlmIChoICE9PSBudWxsKSB7XG4gICAgICBmbihoKTtcbiAgICB9XG4gIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBJbnRlcmNlcHRvck1hbmFnZXI7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBlbmhhbmNlRXJyb3IgPSByZXF1aXJlKCcuL2VuaGFuY2VFcnJvcicpO1xuXG4vKipcbiAqIENyZWF0ZSBhbiBFcnJvciB3aXRoIHRoZSBzcGVjaWZpZWQgbWVzc2FnZSwgY29uZmlnLCBlcnJvciBjb2RlLCByZXF1ZXN0IGFuZCByZXNwb25zZS5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZSBUaGUgZXJyb3IgbWVzc2FnZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgVGhlIGNvbmZpZy5cbiAqIEBwYXJhbSB7c3RyaW5nfSBbY29kZV0gVGhlIGVycm9yIGNvZGUgKGZvciBleGFtcGxlLCAnRUNPTk5BQk9SVEVEJykuXG4gKiBAcGFyYW0ge09iamVjdH0gW3JlcXVlc3RdIFRoZSByZXF1ZXN0LlxuICogQHBhcmFtIHtPYmplY3R9IFtyZXNwb25zZV0gVGhlIHJlc3BvbnNlLlxuICogQHJldHVybnMge0Vycm9yfSBUaGUgY3JlYXRlZCBlcnJvci5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjcmVhdGVFcnJvcihtZXNzYWdlLCBjb25maWcsIGNvZGUsIHJlcXVlc3QsIHJlc3BvbnNlKSB7XG4gIHZhciBlcnJvciA9IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgcmV0dXJuIGVuaGFuY2VFcnJvcihlcnJvciwgY29uZmlnLCBjb2RlLCByZXF1ZXN0LCByZXNwb25zZSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG52YXIgdHJhbnNmb3JtRGF0YSA9IHJlcXVpcmUoJy4vdHJhbnNmb3JtRGF0YScpO1xudmFyIGlzQ2FuY2VsID0gcmVxdWlyZSgnLi4vY2FuY2VsL2lzQ2FuY2VsJyk7XG52YXIgZGVmYXVsdHMgPSByZXF1aXJlKCcuLi9kZWZhdWx0cycpO1xudmFyIGlzQWJzb2x1dGVVUkwgPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvaXNBYnNvbHV0ZVVSTCcpO1xudmFyIGNvbWJpbmVVUkxzID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL2NvbWJpbmVVUkxzJyk7XG5cbi8qKlxuICogVGhyb3dzIGEgYENhbmNlbGAgaWYgY2FuY2VsbGF0aW9uIGhhcyBiZWVuIHJlcXVlc3RlZC5cbiAqL1xuZnVuY3Rpb24gdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpIHtcbiAgaWYgKGNvbmZpZy5jYW5jZWxUb2tlbikge1xuICAgIGNvbmZpZy5jYW5jZWxUb2tlbi50aHJvd0lmUmVxdWVzdGVkKCk7XG4gIH1cbn1cblxuLyoqXG4gKiBEaXNwYXRjaCBhIHJlcXVlc3QgdG8gdGhlIHNlcnZlciB1c2luZyB0aGUgY29uZmlndXJlZCBhZGFwdGVyLlxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBjb25maWcgVGhlIGNvbmZpZyB0aGF0IGlzIHRvIGJlIHVzZWQgZm9yIHRoZSByZXF1ZXN0XG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gVGhlIFByb21pc2UgdG8gYmUgZnVsZmlsbGVkXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZGlzcGF0Y2hSZXF1ZXN0KGNvbmZpZykge1xuICB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZyk7XG5cbiAgLy8gU3VwcG9ydCBiYXNlVVJMIGNvbmZpZ1xuICBpZiAoY29uZmlnLmJhc2VVUkwgJiYgIWlzQWJzb2x1dGVVUkwoY29uZmlnLnVybCkpIHtcbiAgICBjb25maWcudXJsID0gY29tYmluZVVSTHMoY29uZmlnLmJhc2VVUkwsIGNvbmZpZy51cmwpO1xuICB9XG5cbiAgLy8gRW5zdXJlIGhlYWRlcnMgZXhpc3RcbiAgY29uZmlnLmhlYWRlcnMgPSBjb25maWcuaGVhZGVycyB8fCB7fTtcblxuICAvLyBUcmFuc2Zvcm0gcmVxdWVzdCBkYXRhXG4gIGNvbmZpZy5kYXRhID0gdHJhbnNmb3JtRGF0YShcbiAgICBjb25maWcuZGF0YSxcbiAgICBjb25maWcuaGVhZGVycyxcbiAgICBjb25maWcudHJhbnNmb3JtUmVxdWVzdFxuICApO1xuXG4gIC8vIEZsYXR0ZW4gaGVhZGVyc1xuICBjb25maWcuaGVhZGVycyA9IHV0aWxzLm1lcmdlKFxuICAgIGNvbmZpZy5oZWFkZXJzLmNvbW1vbiB8fCB7fSxcbiAgICBjb25maWcuaGVhZGVyc1tjb25maWcubWV0aG9kXSB8fCB7fSxcbiAgICBjb25maWcuaGVhZGVycyB8fCB7fVxuICApO1xuXG4gIHV0aWxzLmZvckVhY2goXG4gICAgWydkZWxldGUnLCAnZ2V0JywgJ2hlYWQnLCAncG9zdCcsICdwdXQnLCAncGF0Y2gnLCAnY29tbW9uJ10sXG4gICAgZnVuY3Rpb24gY2xlYW5IZWFkZXJDb25maWcobWV0aG9kKSB7XG4gICAgICBkZWxldGUgY29uZmlnLmhlYWRlcnNbbWV0aG9kXTtcbiAgICB9XG4gICk7XG5cbiAgdmFyIGFkYXB0ZXIgPSBjb25maWcuYWRhcHRlciB8fCBkZWZhdWx0cy5hZGFwdGVyO1xuXG4gIHJldHVybiBhZGFwdGVyKGNvbmZpZykudGhlbihmdW5jdGlvbiBvbkFkYXB0ZXJSZXNvbHV0aW9uKHJlc3BvbnNlKSB7XG4gICAgdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpO1xuXG4gICAgLy8gVHJhbnNmb3JtIHJlc3BvbnNlIGRhdGFcbiAgICByZXNwb25zZS5kYXRhID0gdHJhbnNmb3JtRGF0YShcbiAgICAgIHJlc3BvbnNlLmRhdGEsXG4gICAgICByZXNwb25zZS5oZWFkZXJzLFxuICAgICAgY29uZmlnLnRyYW5zZm9ybVJlc3BvbnNlXG4gICAgKTtcblxuICAgIHJldHVybiByZXNwb25zZTtcbiAgfSwgZnVuY3Rpb24gb25BZGFwdGVyUmVqZWN0aW9uKHJlYXNvbikge1xuICAgIGlmICghaXNDYW5jZWwocmVhc29uKSkge1xuICAgICAgdGhyb3dJZkNhbmNlbGxhdGlvblJlcXVlc3RlZChjb25maWcpO1xuXG4gICAgICAvLyBUcmFuc2Zvcm0gcmVzcG9uc2UgZGF0YVxuICAgICAgaWYgKHJlYXNvbiAmJiByZWFzb24ucmVzcG9uc2UpIHtcbiAgICAgICAgcmVhc29uLnJlc3BvbnNlLmRhdGEgPSB0cmFuc2Zvcm1EYXRhKFxuICAgICAgICAgIHJlYXNvbi5yZXNwb25zZS5kYXRhLFxuICAgICAgICAgIHJlYXNvbi5yZXNwb25zZS5oZWFkZXJzLFxuICAgICAgICAgIGNvbmZpZy50cmFuc2Zvcm1SZXNwb25zZVxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBQcm9taXNlLnJlamVjdChyZWFzb24pO1xuICB9KTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogVXBkYXRlIGFuIEVycm9yIHdpdGggdGhlIHNwZWNpZmllZCBjb25maWcsIGVycm9yIGNvZGUsIGFuZCByZXNwb25zZS5cbiAqXG4gKiBAcGFyYW0ge0Vycm9yfSBlcnJvciBUaGUgZXJyb3IgdG8gdXBkYXRlLlxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBUaGUgY29uZmlnLlxuICogQHBhcmFtIHtzdHJpbmd9IFtjb2RlXSBUaGUgZXJyb3IgY29kZSAoZm9yIGV4YW1wbGUsICdFQ09OTkFCT1JURUQnKS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcmVxdWVzdF0gVGhlIHJlcXVlc3QuXG4gKiBAcGFyYW0ge09iamVjdH0gW3Jlc3BvbnNlXSBUaGUgcmVzcG9uc2UuXG4gKiBAcmV0dXJucyB7RXJyb3J9IFRoZSBlcnJvci5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBlbmhhbmNlRXJyb3IoZXJyb3IsIGNvbmZpZywgY29kZSwgcmVxdWVzdCwgcmVzcG9uc2UpIHtcbiAgZXJyb3IuY29uZmlnID0gY29uZmlnO1xuICBpZiAoY29kZSkge1xuICAgIGVycm9yLmNvZGUgPSBjb2RlO1xuICB9XG4gIGVycm9yLnJlcXVlc3QgPSByZXF1ZXN0O1xuICBlcnJvci5yZXNwb25zZSA9IHJlc3BvbnNlO1xuICByZXR1cm4gZXJyb3I7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgY3JlYXRlRXJyb3IgPSByZXF1aXJlKCcuL2NyZWF0ZUVycm9yJyk7XG5cbi8qKlxuICogUmVzb2x2ZSBvciByZWplY3QgYSBQcm9taXNlIGJhc2VkIG9uIHJlc3BvbnNlIHN0YXR1cy5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSByZXNvbHZlIEEgZnVuY3Rpb24gdGhhdCByZXNvbHZlcyB0aGUgcHJvbWlzZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHJlamVjdCBBIGZ1bmN0aW9uIHRoYXQgcmVqZWN0cyB0aGUgcHJvbWlzZS5cbiAqIEBwYXJhbSB7b2JqZWN0fSByZXNwb25zZSBUaGUgcmVzcG9uc2UuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgcmVzcG9uc2UpIHtcbiAgdmFyIHZhbGlkYXRlU3RhdHVzID0gcmVzcG9uc2UuY29uZmlnLnZhbGlkYXRlU3RhdHVzO1xuICAvLyBOb3RlOiBzdGF0dXMgaXMgbm90IGV4cG9zZWQgYnkgWERvbWFpblJlcXVlc3RcbiAgaWYgKCFyZXNwb25zZS5zdGF0dXMgfHwgIXZhbGlkYXRlU3RhdHVzIHx8IHZhbGlkYXRlU3RhdHVzKHJlc3BvbnNlLnN0YXR1cykpIHtcbiAgICByZXNvbHZlKHJlc3BvbnNlKTtcbiAgfSBlbHNlIHtcbiAgICByZWplY3QoY3JlYXRlRXJyb3IoXG4gICAgICAnUmVxdWVzdCBmYWlsZWQgd2l0aCBzdGF0dXMgY29kZSAnICsgcmVzcG9uc2Uuc3RhdHVzLFxuICAgICAgcmVzcG9uc2UuY29uZmlnLFxuICAgICAgbnVsbCxcbiAgICAgIHJlc3BvbnNlLnJlcXVlc3QsXG4gICAgICByZXNwb25zZVxuICAgICkpO1xuICB9XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbi8qKlxuICogVHJhbnNmb3JtIHRoZSBkYXRhIGZvciBhIHJlcXVlc3Qgb3IgYSByZXNwb25zZVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fFN0cmluZ30gZGF0YSBUaGUgZGF0YSB0byBiZSB0cmFuc2Zvcm1lZFxuICogQHBhcmFtIHtBcnJheX0gaGVhZGVycyBUaGUgaGVhZGVycyBmb3IgdGhlIHJlcXVlc3Qgb3IgcmVzcG9uc2VcbiAqIEBwYXJhbSB7QXJyYXl8RnVuY3Rpb259IGZucyBBIHNpbmdsZSBmdW5jdGlvbiBvciBBcnJheSBvZiBmdW5jdGlvbnNcbiAqIEByZXR1cm5zIHsqfSBUaGUgcmVzdWx0aW5nIHRyYW5zZm9ybWVkIGRhdGFcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0cmFuc2Zvcm1EYXRhKGRhdGEsIGhlYWRlcnMsIGZucykge1xuICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgdXRpbHMuZm9yRWFjaChmbnMsIGZ1bmN0aW9uIHRyYW5zZm9ybShmbikge1xuICAgIGRhdGEgPSBmbihkYXRhLCBoZWFkZXJzKTtcbiAgfSk7XG5cbiAgcmV0dXJuIGRhdGE7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG52YXIgbm9ybWFsaXplSGVhZGVyTmFtZSA9IHJlcXVpcmUoJy4vaGVscGVycy9ub3JtYWxpemVIZWFkZXJOYW1lJyk7XG5cbnZhciBERUZBVUxUX0NPTlRFTlRfVFlQRSA9IHtcbiAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnXG59O1xuXG5mdW5jdGlvbiBzZXRDb250ZW50VHlwZUlmVW5zZXQoaGVhZGVycywgdmFsdWUpIHtcbiAgaWYgKCF1dGlscy5pc1VuZGVmaW5lZChoZWFkZXJzKSAmJiB1dGlscy5pc1VuZGVmaW5lZChoZWFkZXJzWydDb250ZW50LVR5cGUnXSkpIHtcbiAgICBoZWFkZXJzWydDb250ZW50LVR5cGUnXSA9IHZhbHVlO1xuICB9XG59XG5cbmZ1bmN0aW9uIGdldERlZmF1bHRBZGFwdGVyKCkge1xuICB2YXIgYWRhcHRlcjtcbiAgaWYgKHR5cGVvZiBYTUxIdHRwUmVxdWVzdCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAvLyBGb3IgYnJvd3NlcnMgdXNlIFhIUiBhZGFwdGVyXG4gICAgYWRhcHRlciA9IHJlcXVpcmUoJy4vYWRhcHRlcnMveGhyJyk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIHByb2Nlc3MgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgLy8gRm9yIG5vZGUgdXNlIEhUVFAgYWRhcHRlclxuICAgIGFkYXB0ZXIgPSByZXF1aXJlKCcuL2FkYXB0ZXJzL2h0dHAnKTtcbiAgfVxuICByZXR1cm4gYWRhcHRlcjtcbn1cblxudmFyIGRlZmF1bHRzID0ge1xuICBhZGFwdGVyOiBnZXREZWZhdWx0QWRhcHRlcigpLFxuXG4gIHRyYW5zZm9ybVJlcXVlc3Q6IFtmdW5jdGlvbiB0cmFuc2Zvcm1SZXF1ZXN0KGRhdGEsIGhlYWRlcnMpIHtcbiAgICBub3JtYWxpemVIZWFkZXJOYW1lKGhlYWRlcnMsICdDb250ZW50LVR5cGUnKTtcbiAgICBpZiAodXRpbHMuaXNGb3JtRGF0YShkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNBcnJheUJ1ZmZlcihkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNCdWZmZXIoZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzU3RyZWFtKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc0ZpbGUoZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzQmxvYihkYXRhKVxuICAgICkge1xuICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxuICAgIGlmICh1dGlscy5pc0FycmF5QnVmZmVyVmlldyhkYXRhKSkge1xuICAgICAgcmV0dXJuIGRhdGEuYnVmZmVyO1xuICAgIH1cbiAgICBpZiAodXRpbHMuaXNVUkxTZWFyY2hQYXJhbXMoZGF0YSkpIHtcbiAgICAgIHNldENvbnRlbnRUeXBlSWZVbnNldChoZWFkZXJzLCAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkO2NoYXJzZXQ9dXRmLTgnKTtcbiAgICAgIHJldHVybiBkYXRhLnRvU3RyaW5nKCk7XG4gICAgfVxuICAgIGlmICh1dGlscy5pc09iamVjdChkYXRhKSkge1xuICAgICAgc2V0Q29udGVudFR5cGVJZlVuc2V0KGhlYWRlcnMsICdhcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTgnKTtcbiAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShkYXRhKTtcbiAgICB9XG4gICAgcmV0dXJuIGRhdGE7XG4gIH1dLFxuXG4gIHRyYW5zZm9ybVJlc3BvbnNlOiBbZnVuY3Rpb24gdHJhbnNmb3JtUmVzcG9uc2UoZGF0YSkge1xuICAgIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICAgIGlmICh0eXBlb2YgZGF0YSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGRhdGEgPSBKU09OLnBhcnNlKGRhdGEpO1xuICAgICAgfSBjYXRjaCAoZSkgeyAvKiBJZ25vcmUgKi8gfVxuICAgIH1cbiAgICByZXR1cm4gZGF0YTtcbiAgfV0sXG5cbiAgLyoqXG4gICAqIEEgdGltZW91dCBpbiBtaWxsaXNlY29uZHMgdG8gYWJvcnQgYSByZXF1ZXN0LiBJZiBzZXQgdG8gMCAoZGVmYXVsdCkgYVxuICAgKiB0aW1lb3V0IGlzIG5vdCBjcmVhdGVkLlxuICAgKi9cbiAgdGltZW91dDogMCxcblxuICB4c3JmQ29va2llTmFtZTogJ1hTUkYtVE9LRU4nLFxuICB4c3JmSGVhZGVyTmFtZTogJ1gtWFNSRi1UT0tFTicsXG5cbiAgbWF4Q29udGVudExlbmd0aDogLTEsXG5cbiAgdmFsaWRhdGVTdGF0dXM6IGZ1bmN0aW9uIHZhbGlkYXRlU3RhdHVzKHN0YXR1cykge1xuICAgIHJldHVybiBzdGF0dXMgPj0gMjAwICYmIHN0YXR1cyA8IDMwMDtcbiAgfVxufTtcblxuZGVmYXVsdHMuaGVhZGVycyA9IHtcbiAgY29tbW9uOiB7XG4gICAgJ0FjY2VwdCc6ICdhcHBsaWNhdGlvbi9qc29uLCB0ZXh0L3BsYWluLCAqLyonXG4gIH1cbn07XG5cbnV0aWxzLmZvckVhY2goWydkZWxldGUnLCAnZ2V0JywgJ2hlYWQnXSwgZnVuY3Rpb24gZm9yRWFjaE1ldGhvZE5vRGF0YShtZXRob2QpIHtcbiAgZGVmYXVsdHMuaGVhZGVyc1ttZXRob2RdID0ge307XG59KTtcblxudXRpbHMuZm9yRWFjaChbJ3Bvc3QnLCAncHV0JywgJ3BhdGNoJ10sIGZ1bmN0aW9uIGZvckVhY2hNZXRob2RXaXRoRGF0YShtZXRob2QpIHtcbiAgZGVmYXVsdHMuaGVhZGVyc1ttZXRob2RdID0gdXRpbHMubWVyZ2UoREVGQVVMVF9DT05URU5UX1RZUEUpO1xufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gZGVmYXVsdHM7XG4iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYmluZChmbiwgdGhpc0FyZykge1xuICByZXR1cm4gZnVuY3Rpb24gd3JhcCgpIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgIGFyZ3NbaV0gPSBhcmd1bWVudHNbaV07XG4gICAgfVxuICAgIHJldHVybiBmbi5hcHBseSh0aGlzQXJnLCBhcmdzKTtcbiAgfTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbi8vIGJ0b2EgcG9seWZpbGwgZm9yIElFPDEwIGNvdXJ0ZXN5IGh0dHBzOi8vZ2l0aHViLmNvbS9kYXZpZGNoYW1iZXJzL0Jhc2U2NC5qc1xuXG52YXIgY2hhcnMgPSAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrLz0nO1xuXG5mdW5jdGlvbiBFKCkge1xuICB0aGlzLm1lc3NhZ2UgPSAnU3RyaW5nIGNvbnRhaW5zIGFuIGludmFsaWQgY2hhcmFjdGVyJztcbn1cbkUucHJvdG90eXBlID0gbmV3IEVycm9yO1xuRS5wcm90b3R5cGUuY29kZSA9IDU7XG5FLnByb3RvdHlwZS5uYW1lID0gJ0ludmFsaWRDaGFyYWN0ZXJFcnJvcic7XG5cbmZ1bmN0aW9uIGJ0b2EoaW5wdXQpIHtcbiAgdmFyIHN0ciA9IFN0cmluZyhpbnB1dCk7XG4gIHZhciBvdXRwdXQgPSAnJztcbiAgZm9yIChcbiAgICAvLyBpbml0aWFsaXplIHJlc3VsdCBhbmQgY291bnRlclxuICAgIHZhciBibG9jaywgY2hhckNvZGUsIGlkeCA9IDAsIG1hcCA9IGNoYXJzO1xuICAgIC8vIGlmIHRoZSBuZXh0IHN0ciBpbmRleCBkb2VzIG5vdCBleGlzdDpcbiAgICAvLyAgIGNoYW5nZSB0aGUgbWFwcGluZyB0YWJsZSB0byBcIj1cIlxuICAgIC8vICAgY2hlY2sgaWYgZCBoYXMgbm8gZnJhY3Rpb25hbCBkaWdpdHNcbiAgICBzdHIuY2hhckF0KGlkeCB8IDApIHx8IChtYXAgPSAnPScsIGlkeCAlIDEpO1xuICAgIC8vIFwiOCAtIGlkeCAlIDEgKiA4XCIgZ2VuZXJhdGVzIHRoZSBzZXF1ZW5jZSAyLCA0LCA2LCA4XG4gICAgb3V0cHV0ICs9IG1hcC5jaGFyQXQoNjMgJiBibG9jayA+PiA4IC0gaWR4ICUgMSAqIDgpXG4gICkge1xuICAgIGNoYXJDb2RlID0gc3RyLmNoYXJDb2RlQXQoaWR4ICs9IDMgLyA0KTtcbiAgICBpZiAoY2hhckNvZGUgPiAweEZGKSB7XG4gICAgICB0aHJvdyBuZXcgRSgpO1xuICAgIH1cbiAgICBibG9jayA9IGJsb2NrIDw8IDggfCBjaGFyQ29kZTtcbiAgfVxuICByZXR1cm4gb3V0cHV0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJ0b2E7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxuZnVuY3Rpb24gZW5jb2RlKHZhbCkge1xuICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KHZhbCkuXG4gICAgcmVwbGFjZSgvJTQwL2dpLCAnQCcpLlxuICAgIHJlcGxhY2UoLyUzQS9naSwgJzonKS5cbiAgICByZXBsYWNlKC8lMjQvZywgJyQnKS5cbiAgICByZXBsYWNlKC8lMkMvZ2ksICcsJykuXG4gICAgcmVwbGFjZSgvJTIwL2csICcrJykuXG4gICAgcmVwbGFjZSgvJTVCL2dpLCAnWycpLlxuICAgIHJlcGxhY2UoLyU1RC9naSwgJ10nKTtcbn1cblxuLyoqXG4gKiBCdWlsZCBhIFVSTCBieSBhcHBlbmRpbmcgcGFyYW1zIHRvIHRoZSBlbmRcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdXJsIFRoZSBiYXNlIG9mIHRoZSB1cmwgKGUuZy4sIGh0dHA6Ly93d3cuZ29vZ2xlLmNvbSlcbiAqIEBwYXJhbSB7b2JqZWN0fSBbcGFyYW1zXSBUaGUgcGFyYW1zIHRvIGJlIGFwcGVuZGVkXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgZm9ybWF0dGVkIHVybFxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGJ1aWxkVVJMKHVybCwgcGFyYW1zLCBwYXJhbXNTZXJpYWxpemVyKSB7XG4gIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICBpZiAoIXBhcmFtcykge1xuICAgIHJldHVybiB1cmw7XG4gIH1cblxuICB2YXIgc2VyaWFsaXplZFBhcmFtcztcbiAgaWYgKHBhcmFtc1NlcmlhbGl6ZXIpIHtcbiAgICBzZXJpYWxpemVkUGFyYW1zID0gcGFyYW1zU2VyaWFsaXplcihwYXJhbXMpO1xuICB9IGVsc2UgaWYgKHV0aWxzLmlzVVJMU2VhcmNoUGFyYW1zKHBhcmFtcykpIHtcbiAgICBzZXJpYWxpemVkUGFyYW1zID0gcGFyYW1zLnRvU3RyaW5nKCk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIHBhcnRzID0gW107XG5cbiAgICB1dGlscy5mb3JFYWNoKHBhcmFtcywgZnVuY3Rpb24gc2VyaWFsaXplKHZhbCwga2V5KSB7XG4gICAgICBpZiAodmFsID09PSBudWxsIHx8IHR5cGVvZiB2YWwgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKHV0aWxzLmlzQXJyYXkodmFsKSkge1xuICAgICAgICBrZXkgPSBrZXkgKyAnW10nO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFsID0gW3ZhbF07XG4gICAgICB9XG5cbiAgICAgIHV0aWxzLmZvckVhY2godmFsLCBmdW5jdGlvbiBwYXJzZVZhbHVlKHYpIHtcbiAgICAgICAgaWYgKHV0aWxzLmlzRGF0ZSh2KSkge1xuICAgICAgICAgIHYgPSB2LnRvSVNPU3RyaW5nKCk7XG4gICAgICAgIH0gZWxzZSBpZiAodXRpbHMuaXNPYmplY3QodikpIHtcbiAgICAgICAgICB2ID0gSlNPTi5zdHJpbmdpZnkodik7XG4gICAgICAgIH1cbiAgICAgICAgcGFydHMucHVzaChlbmNvZGUoa2V5KSArICc9JyArIGVuY29kZSh2KSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIHNlcmlhbGl6ZWRQYXJhbXMgPSBwYXJ0cy5qb2luKCcmJyk7XG4gIH1cblxuICBpZiAoc2VyaWFsaXplZFBhcmFtcykge1xuICAgIHVybCArPSAodXJsLmluZGV4T2YoJz8nKSA9PT0gLTEgPyAnPycgOiAnJicpICsgc2VyaWFsaXplZFBhcmFtcztcbiAgfVxuXG4gIHJldHVybiB1cmw7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgVVJMIGJ5IGNvbWJpbmluZyB0aGUgc3BlY2lmaWVkIFVSTHNcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gYmFzZVVSTCBUaGUgYmFzZSBVUkxcbiAqIEBwYXJhbSB7c3RyaW5nfSByZWxhdGl2ZVVSTCBUaGUgcmVsYXRpdmUgVVJMXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgY29tYmluZWQgVVJMXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY29tYmluZVVSTHMoYmFzZVVSTCwgcmVsYXRpdmVVUkwpIHtcbiAgcmV0dXJuIHJlbGF0aXZlVVJMXG4gICAgPyBiYXNlVVJMLnJlcGxhY2UoL1xcLyskLywgJycpICsgJy8nICsgcmVsYXRpdmVVUkwucmVwbGFjZSgvXlxcLysvLCAnJylcbiAgICA6IGJhc2VVUkw7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gKFxuICB1dGlscy5pc1N0YW5kYXJkQnJvd3NlckVudigpID9cblxuICAvLyBTdGFuZGFyZCBicm93c2VyIGVudnMgc3VwcG9ydCBkb2N1bWVudC5jb29raWVcbiAgKGZ1bmN0aW9uIHN0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgd3JpdGU6IGZ1bmN0aW9uIHdyaXRlKG5hbWUsIHZhbHVlLCBleHBpcmVzLCBwYXRoLCBkb21haW4sIHNlY3VyZSkge1xuICAgICAgICB2YXIgY29va2llID0gW107XG4gICAgICAgIGNvb2tpZS5wdXNoKG5hbWUgKyAnPScgKyBlbmNvZGVVUklDb21wb25lbnQodmFsdWUpKTtcblxuICAgICAgICBpZiAodXRpbHMuaXNOdW1iZXIoZXhwaXJlcykpIHtcbiAgICAgICAgICBjb29raWUucHVzaCgnZXhwaXJlcz0nICsgbmV3IERhdGUoZXhwaXJlcykudG9HTVRTdHJpbmcoKSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodXRpbHMuaXNTdHJpbmcocGF0aCkpIHtcbiAgICAgICAgICBjb29raWUucHVzaCgncGF0aD0nICsgcGF0aCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodXRpbHMuaXNTdHJpbmcoZG9tYWluKSkge1xuICAgICAgICAgIGNvb2tpZS5wdXNoKCdkb21haW49JyArIGRvbWFpbik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2VjdXJlID09PSB0cnVlKSB7XG4gICAgICAgICAgY29va2llLnB1c2goJ3NlY3VyZScpO1xuICAgICAgICB9XG5cbiAgICAgICAgZG9jdW1lbnQuY29va2llID0gY29va2llLmpvaW4oJzsgJyk7XG4gICAgICB9LFxuXG4gICAgICByZWFkOiBmdW5jdGlvbiByZWFkKG5hbWUpIHtcbiAgICAgICAgdmFyIG1hdGNoID0gZG9jdW1lbnQuY29va2llLm1hdGNoKG5ldyBSZWdFeHAoJyhefDtcXFxccyopKCcgKyBuYW1lICsgJyk9KFteO10qKScpKTtcbiAgICAgICAgcmV0dXJuIChtYXRjaCA/IGRlY29kZVVSSUNvbXBvbmVudChtYXRjaFszXSkgOiBudWxsKTtcbiAgICAgIH0sXG5cbiAgICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKG5hbWUpIHtcbiAgICAgICAgdGhpcy53cml0ZShuYW1lLCAnJywgRGF0ZS5ub3coKSAtIDg2NDAwMDAwKTtcbiAgICAgIH1cbiAgICB9O1xuICB9KSgpIDpcblxuICAvLyBOb24gc3RhbmRhcmQgYnJvd3NlciBlbnYgKHdlYiB3b3JrZXJzLCByZWFjdC1uYXRpdmUpIGxhY2sgbmVlZGVkIHN1cHBvcnQuXG4gIChmdW5jdGlvbiBub25TdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHdyaXRlOiBmdW5jdGlvbiB3cml0ZSgpIHt9LFxuICAgICAgcmVhZDogZnVuY3Rpb24gcmVhZCgpIHsgcmV0dXJuIG51bGw7IH0sXG4gICAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHt9XG4gICAgfTtcbiAgfSkoKVxuKTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBEZXRlcm1pbmVzIHdoZXRoZXIgdGhlIHNwZWNpZmllZCBVUkwgaXMgYWJzb2x1dGVcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdXJsIFRoZSBVUkwgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdGhlIHNwZWNpZmllZCBVUkwgaXMgYWJzb2x1dGUsIG90aGVyd2lzZSBmYWxzZVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlzQWJzb2x1dGVVUkwodXJsKSB7XG4gIC8vIEEgVVJMIGlzIGNvbnNpZGVyZWQgYWJzb2x1dGUgaWYgaXQgYmVnaW5zIHdpdGggXCI8c2NoZW1lPjovL1wiIG9yIFwiLy9cIiAocHJvdG9jb2wtcmVsYXRpdmUgVVJMKS5cbiAgLy8gUkZDIDM5ODYgZGVmaW5lcyBzY2hlbWUgbmFtZSBhcyBhIHNlcXVlbmNlIG9mIGNoYXJhY3RlcnMgYmVnaW5uaW5nIHdpdGggYSBsZXR0ZXIgYW5kIGZvbGxvd2VkXG4gIC8vIGJ5IGFueSBjb21iaW5hdGlvbiBvZiBsZXR0ZXJzLCBkaWdpdHMsIHBsdXMsIHBlcmlvZCwgb3IgaHlwaGVuLlxuICByZXR1cm4gL14oW2Etel1bYS16XFxkXFwrXFwtXFwuXSo6KT9cXC9cXC8vaS50ZXN0KHVybCk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gKFxuICB1dGlscy5pc1N0YW5kYXJkQnJvd3NlckVudigpID9cblxuICAvLyBTdGFuZGFyZCBicm93c2VyIGVudnMgaGF2ZSBmdWxsIHN1cHBvcnQgb2YgdGhlIEFQSXMgbmVlZGVkIHRvIHRlc3RcbiAgLy8gd2hldGhlciB0aGUgcmVxdWVzdCBVUkwgaXMgb2YgdGhlIHNhbWUgb3JpZ2luIGFzIGN1cnJlbnQgbG9jYXRpb24uXG4gIChmdW5jdGlvbiBzdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gICAgdmFyIG1zaWUgPSAvKG1zaWV8dHJpZGVudCkvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpO1xuICAgIHZhciB1cmxQYXJzaW5nTm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICB2YXIgb3JpZ2luVVJMO1xuXG4gICAgLyoqXG4gICAgKiBQYXJzZSBhIFVSTCB0byBkaXNjb3ZlciBpdCdzIGNvbXBvbmVudHNcbiAgICAqXG4gICAgKiBAcGFyYW0ge1N0cmluZ30gdXJsIFRoZSBVUkwgdG8gYmUgcGFyc2VkXG4gICAgKiBAcmV0dXJucyB7T2JqZWN0fVxuICAgICovXG4gICAgZnVuY3Rpb24gcmVzb2x2ZVVSTCh1cmwpIHtcbiAgICAgIHZhciBocmVmID0gdXJsO1xuXG4gICAgICBpZiAobXNpZSkge1xuICAgICAgICAvLyBJRSBuZWVkcyBhdHRyaWJ1dGUgc2V0IHR3aWNlIHRvIG5vcm1hbGl6ZSBwcm9wZXJ0aWVzXG4gICAgICAgIHVybFBhcnNpbmdOb2RlLnNldEF0dHJpYnV0ZSgnaHJlZicsIGhyZWYpO1xuICAgICAgICBocmVmID0gdXJsUGFyc2luZ05vZGUuaHJlZjtcbiAgICAgIH1cblxuICAgICAgdXJsUGFyc2luZ05vZGUuc2V0QXR0cmlidXRlKCdocmVmJywgaHJlZik7XG5cbiAgICAgIC8vIHVybFBhcnNpbmdOb2RlIHByb3ZpZGVzIHRoZSBVcmxVdGlscyBpbnRlcmZhY2UgLSBodHRwOi8vdXJsLnNwZWMud2hhdHdnLm9yZy8jdXJsdXRpbHNcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGhyZWY6IHVybFBhcnNpbmdOb2RlLmhyZWYsXG4gICAgICAgIHByb3RvY29sOiB1cmxQYXJzaW5nTm9kZS5wcm90b2NvbCA/IHVybFBhcnNpbmdOb2RlLnByb3RvY29sLnJlcGxhY2UoLzokLywgJycpIDogJycsXG4gICAgICAgIGhvc3Q6IHVybFBhcnNpbmdOb2RlLmhvc3QsXG4gICAgICAgIHNlYXJjaDogdXJsUGFyc2luZ05vZGUuc2VhcmNoID8gdXJsUGFyc2luZ05vZGUuc2VhcmNoLnJlcGxhY2UoL15cXD8vLCAnJykgOiAnJyxcbiAgICAgICAgaGFzaDogdXJsUGFyc2luZ05vZGUuaGFzaCA/IHVybFBhcnNpbmdOb2RlLmhhc2gucmVwbGFjZSgvXiMvLCAnJykgOiAnJyxcbiAgICAgICAgaG9zdG5hbWU6IHVybFBhcnNpbmdOb2RlLmhvc3RuYW1lLFxuICAgICAgICBwb3J0OiB1cmxQYXJzaW5nTm9kZS5wb3J0LFxuICAgICAgICBwYXRobmFtZTogKHVybFBhcnNpbmdOb2RlLnBhdGhuYW1lLmNoYXJBdCgwKSA9PT0gJy8nKSA/XG4gICAgICAgICAgICAgICAgICB1cmxQYXJzaW5nTm9kZS5wYXRobmFtZSA6XG4gICAgICAgICAgICAgICAgICAnLycgKyB1cmxQYXJzaW5nTm9kZS5wYXRobmFtZVxuICAgICAgfTtcbiAgICB9XG5cbiAgICBvcmlnaW5VUkwgPSByZXNvbHZlVVJMKHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcblxuICAgIC8qKlxuICAgICogRGV0ZXJtaW5lIGlmIGEgVVJMIHNoYXJlcyB0aGUgc2FtZSBvcmlnaW4gYXMgdGhlIGN1cnJlbnQgbG9jYXRpb25cbiAgICAqXG4gICAgKiBAcGFyYW0ge1N0cmluZ30gcmVxdWVzdFVSTCBUaGUgVVJMIHRvIHRlc3RcbiAgICAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIFVSTCBzaGFyZXMgdGhlIHNhbWUgb3JpZ2luLCBvdGhlcndpc2UgZmFsc2VcbiAgICAqL1xuICAgIHJldHVybiBmdW5jdGlvbiBpc1VSTFNhbWVPcmlnaW4ocmVxdWVzdFVSTCkge1xuICAgICAgdmFyIHBhcnNlZCA9ICh1dGlscy5pc1N0cmluZyhyZXF1ZXN0VVJMKSkgPyByZXNvbHZlVVJMKHJlcXVlc3RVUkwpIDogcmVxdWVzdFVSTDtcbiAgICAgIHJldHVybiAocGFyc2VkLnByb3RvY29sID09PSBvcmlnaW5VUkwucHJvdG9jb2wgJiZcbiAgICAgICAgICAgIHBhcnNlZC5ob3N0ID09PSBvcmlnaW5VUkwuaG9zdCk7XG4gICAgfTtcbiAgfSkoKSA6XG5cbiAgLy8gTm9uIHN0YW5kYXJkIGJyb3dzZXIgZW52cyAod2ViIHdvcmtlcnMsIHJlYWN0LW5hdGl2ZSkgbGFjayBuZWVkZWQgc3VwcG9ydC5cbiAgKGZ1bmN0aW9uIG5vblN0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gaXNVUkxTYW1lT3JpZ2luKCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcbiAgfSkoKVxuKTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi4vdXRpbHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBub3JtYWxpemVIZWFkZXJOYW1lKGhlYWRlcnMsIG5vcm1hbGl6ZWROYW1lKSB7XG4gIHV0aWxzLmZvckVhY2goaGVhZGVycywgZnVuY3Rpb24gcHJvY2Vzc0hlYWRlcih2YWx1ZSwgbmFtZSkge1xuICAgIGlmIChuYW1lICE9PSBub3JtYWxpemVkTmFtZSAmJiBuYW1lLnRvVXBwZXJDYXNlKCkgPT09IG5vcm1hbGl6ZWROYW1lLnRvVXBwZXJDYXNlKCkpIHtcbiAgICAgIGhlYWRlcnNbbm9ybWFsaXplZE5hbWVdID0gdmFsdWU7XG4gICAgICBkZWxldGUgaGVhZGVyc1tuYW1lXTtcbiAgICB9XG4gIH0pO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG4vLyBIZWFkZXJzIHdob3NlIGR1cGxpY2F0ZXMgYXJlIGlnbm9yZWQgYnkgbm9kZVxuLy8gYy5mLiBodHRwczovL25vZGVqcy5vcmcvYXBpL2h0dHAuaHRtbCNodHRwX21lc3NhZ2VfaGVhZGVyc1xudmFyIGlnbm9yZUR1cGxpY2F0ZU9mID0gW1xuICAnYWdlJywgJ2F1dGhvcml6YXRpb24nLCAnY29udGVudC1sZW5ndGgnLCAnY29udGVudC10eXBlJywgJ2V0YWcnLFxuICAnZXhwaXJlcycsICdmcm9tJywgJ2hvc3QnLCAnaWYtbW9kaWZpZWQtc2luY2UnLCAnaWYtdW5tb2RpZmllZC1zaW5jZScsXG4gICdsYXN0LW1vZGlmaWVkJywgJ2xvY2F0aW9uJywgJ21heC1mb3J3YXJkcycsICdwcm94eS1hdXRob3JpemF0aW9uJyxcbiAgJ3JlZmVyZXInLCAncmV0cnktYWZ0ZXInLCAndXNlci1hZ2VudCdcbl07XG5cbi8qKlxuICogUGFyc2UgaGVhZGVycyBpbnRvIGFuIG9iamVjdFxuICpcbiAqIGBgYFxuICogRGF0ZTogV2VkLCAyNyBBdWcgMjAxNCAwODo1ODo0OSBHTVRcbiAqIENvbnRlbnQtVHlwZTogYXBwbGljYXRpb24vanNvblxuICogQ29ubmVjdGlvbjoga2VlcC1hbGl2ZVxuICogVHJhbnNmZXItRW5jb2Rpbmc6IGNodW5rZWRcbiAqIGBgYFxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBoZWFkZXJzIEhlYWRlcnMgbmVlZGluZyB0byBiZSBwYXJzZWRcbiAqIEByZXR1cm5zIHtPYmplY3R9IEhlYWRlcnMgcGFyc2VkIGludG8gYW4gb2JqZWN0XG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gcGFyc2VIZWFkZXJzKGhlYWRlcnMpIHtcbiAgdmFyIHBhcnNlZCA9IHt9O1xuICB2YXIga2V5O1xuICB2YXIgdmFsO1xuICB2YXIgaTtcblxuICBpZiAoIWhlYWRlcnMpIHsgcmV0dXJuIHBhcnNlZDsgfVxuXG4gIHV0aWxzLmZvckVhY2goaGVhZGVycy5zcGxpdCgnXFxuJyksIGZ1bmN0aW9uIHBhcnNlcihsaW5lKSB7XG4gICAgaSA9IGxpbmUuaW5kZXhPZignOicpO1xuICAgIGtleSA9IHV0aWxzLnRyaW0obGluZS5zdWJzdHIoMCwgaSkpLnRvTG93ZXJDYXNlKCk7XG4gICAgdmFsID0gdXRpbHMudHJpbShsaW5lLnN1YnN0cihpICsgMSkpO1xuXG4gICAgaWYgKGtleSkge1xuICAgICAgaWYgKHBhcnNlZFtrZXldICYmIGlnbm9yZUR1cGxpY2F0ZU9mLmluZGV4T2Yoa2V5KSA+PSAwKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmIChrZXkgPT09ICdzZXQtY29va2llJykge1xuICAgICAgICBwYXJzZWRba2V5XSA9IChwYXJzZWRba2V5XSA/IHBhcnNlZFtrZXldIDogW10pLmNvbmNhdChbdmFsXSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwYXJzZWRba2V5XSA9IHBhcnNlZFtrZXldID8gcGFyc2VkW2tleV0gKyAnLCAnICsgdmFsIDogdmFsO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIHBhcnNlZDtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogU3ludGFjdGljIHN1Z2FyIGZvciBpbnZva2luZyBhIGZ1bmN0aW9uIGFuZCBleHBhbmRpbmcgYW4gYXJyYXkgZm9yIGFyZ3VtZW50cy5cbiAqXG4gKiBDb21tb24gdXNlIGNhc2Ugd291bGQgYmUgdG8gdXNlIGBGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHlgLlxuICpcbiAqICBgYGBqc1xuICogIGZ1bmN0aW9uIGYoeCwgeSwgeikge31cbiAqICB2YXIgYXJncyA9IFsxLCAyLCAzXTtcbiAqICBmLmFwcGx5KG51bGwsIGFyZ3MpO1xuICogIGBgYFxuICpcbiAqIFdpdGggYHNwcmVhZGAgdGhpcyBleGFtcGxlIGNhbiBiZSByZS13cml0dGVuLlxuICpcbiAqICBgYGBqc1xuICogIHNwcmVhZChmdW5jdGlvbih4LCB5LCB6KSB7fSkoWzEsIDIsIDNdKTtcbiAqICBgYGBcbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICogQHJldHVybnMge0Z1bmN0aW9ufVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHNwcmVhZChjYWxsYmFjaykge1xuICByZXR1cm4gZnVuY3Rpb24gd3JhcChhcnIpIHtcbiAgICByZXR1cm4gY2FsbGJhY2suYXBwbHkobnVsbCwgYXJyKTtcbiAgfTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBiaW5kID0gcmVxdWlyZSgnLi9oZWxwZXJzL2JpbmQnKTtcbnZhciBpc0J1ZmZlciA9IHJlcXVpcmUoJ2lzLWJ1ZmZlcicpO1xuXG4vKmdsb2JhbCB0b1N0cmluZzp0cnVlKi9cblxuLy8gdXRpbHMgaXMgYSBsaWJyYXJ5IG9mIGdlbmVyaWMgaGVscGVyIGZ1bmN0aW9ucyBub24tc3BlY2lmaWMgdG8gYXhpb3NcblxudmFyIHRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhbiBBcnJheVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIEFycmF5LCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcnJheSh2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgQXJyYXldJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhbiBBcnJheUJ1ZmZlclxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIEFycmF5QnVmZmVyLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcnJheUJ1ZmZlcih2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgQXJyYXlCdWZmZXJdJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEZvcm1EYXRhXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gRm9ybURhdGEsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0Zvcm1EYXRhKHZhbCkge1xuICByZXR1cm4gKHR5cGVvZiBGb3JtRGF0YSAhPT0gJ3VuZGVmaW5lZCcpICYmICh2YWwgaW5zdGFuY2VvZiBGb3JtRGF0YSk7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSB2aWV3IG9uIGFuIEFycmF5QnVmZmVyXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSB2aWV3IG9uIGFuIEFycmF5QnVmZmVyLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcnJheUJ1ZmZlclZpZXcodmFsKSB7XG4gIHZhciByZXN1bHQ7XG4gIGlmICgodHlwZW9mIEFycmF5QnVmZmVyICE9PSAndW5kZWZpbmVkJykgJiYgKEFycmF5QnVmZmVyLmlzVmlldykpIHtcbiAgICByZXN1bHQgPSBBcnJheUJ1ZmZlci5pc1ZpZXcodmFsKTtcbiAgfSBlbHNlIHtcbiAgICByZXN1bHQgPSAodmFsKSAmJiAodmFsLmJ1ZmZlcikgJiYgKHZhbC5idWZmZXIgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcik7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIFN0cmluZ1xuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgU3RyaW5nLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNTdHJpbmcodmFsKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsID09PSAnc3RyaW5nJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIE51bWJlclxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgTnVtYmVyLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNOdW1iZXIodmFsKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsID09PSAnbnVtYmVyJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyB1bmRlZmluZWRcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgdmFsdWUgaXMgdW5kZWZpbmVkLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNVbmRlZmluZWQodmFsKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsID09PSAndW5kZWZpbmVkJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhbiBPYmplY3RcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBPYmplY3QsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdCh2YWwpIHtcbiAgcmV0dXJuIHZhbCAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsID09PSAnb2JqZWN0Jztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIERhdGVcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIERhdGUsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0RhdGUodmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IERhdGVdJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEZpbGVcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEZpbGUsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0ZpbGUodmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEZpbGVdJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEJsb2JcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEJsb2IsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0Jsb2IodmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEJsb2JdJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIEZ1bmN0aW9uXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBGdW5jdGlvbiwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRnVuY3Rpb24odmFsKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKHZhbCkgPT09ICdbb2JqZWN0IEZ1bmN0aW9uXSc7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgdmFsdWUgaXMgYSBTdHJlYW1cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIFN0cmVhbSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzU3RyZWFtKHZhbCkge1xuICByZXR1cm4gaXNPYmplY3QodmFsKSAmJiBpc0Z1bmN0aW9uKHZhbC5waXBlKTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIFVSTFNlYXJjaFBhcmFtcyBvYmplY3RcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIFVSTFNlYXJjaFBhcmFtcyBvYmplY3QsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1VSTFNlYXJjaFBhcmFtcyh2YWwpIHtcbiAgcmV0dXJuIHR5cGVvZiBVUkxTZWFyY2hQYXJhbXMgIT09ICd1bmRlZmluZWQnICYmIHZhbCBpbnN0YW5jZW9mIFVSTFNlYXJjaFBhcmFtcztcbn1cblxuLyoqXG4gKiBUcmltIGV4Y2VzcyB3aGl0ZXNwYWNlIG9mZiB0aGUgYmVnaW5uaW5nIGFuZCBlbmQgb2YgYSBzdHJpbmdcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyIFRoZSBTdHJpbmcgdG8gdHJpbVxuICogQHJldHVybnMge1N0cmluZ30gVGhlIFN0cmluZyBmcmVlZCBvZiBleGNlc3Mgd2hpdGVzcGFjZVxuICovXG5mdW5jdGlvbiB0cmltKHN0cikge1xuICByZXR1cm4gc3RyLnJlcGxhY2UoL15cXHMqLywgJycpLnJlcGxhY2UoL1xccyokLywgJycpO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiB3ZSdyZSBydW5uaW5nIGluIGEgc3RhbmRhcmQgYnJvd3NlciBlbnZpcm9ubWVudFxuICpcbiAqIFRoaXMgYWxsb3dzIGF4aW9zIHRvIHJ1biBpbiBhIHdlYiB3b3JrZXIsIGFuZCByZWFjdC1uYXRpdmUuXG4gKiBCb3RoIGVudmlyb25tZW50cyBzdXBwb3J0IFhNTEh0dHBSZXF1ZXN0LCBidXQgbm90IGZ1bGx5IHN0YW5kYXJkIGdsb2JhbHMuXG4gKlxuICogd2ViIHdvcmtlcnM6XG4gKiAgdHlwZW9mIHdpbmRvdyAtPiB1bmRlZmluZWRcbiAqICB0eXBlb2YgZG9jdW1lbnQgLT4gdW5kZWZpbmVkXG4gKlxuICogcmVhY3QtbmF0aXZlOlxuICogIG5hdmlnYXRvci5wcm9kdWN0IC0+ICdSZWFjdE5hdGl2ZSdcbiAqL1xuZnVuY3Rpb24gaXNTdGFuZGFyZEJyb3dzZXJFbnYoKSB7XG4gIGlmICh0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJyAmJiBuYXZpZ2F0b3IucHJvZHVjdCA9PT0gJ1JlYWN0TmF0aXZlJykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICByZXR1cm4gKFxuICAgIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmXG4gICAgdHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJ1xuICApO1xufVxuXG4vKipcbiAqIEl0ZXJhdGUgb3ZlciBhbiBBcnJheSBvciBhbiBPYmplY3QgaW52b2tpbmcgYSBmdW5jdGlvbiBmb3IgZWFjaCBpdGVtLlxuICpcbiAqIElmIGBvYmpgIGlzIGFuIEFycmF5IGNhbGxiYWNrIHdpbGwgYmUgY2FsbGVkIHBhc3NpbmdcbiAqIHRoZSB2YWx1ZSwgaW5kZXgsIGFuZCBjb21wbGV0ZSBhcnJheSBmb3IgZWFjaCBpdGVtLlxuICpcbiAqIElmICdvYmonIGlzIGFuIE9iamVjdCBjYWxsYmFjayB3aWxsIGJlIGNhbGxlZCBwYXNzaW5nXG4gKiB0aGUgdmFsdWUsIGtleSwgYW5kIGNvbXBsZXRlIG9iamVjdCBmb3IgZWFjaCBwcm9wZXJ0eS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdHxBcnJheX0gb2JqIFRoZSBvYmplY3QgdG8gaXRlcmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGNhbGxiYWNrIHRvIGludm9rZSBmb3IgZWFjaCBpdGVtXG4gKi9cbmZ1bmN0aW9uIGZvckVhY2gob2JqLCBmbikge1xuICAvLyBEb24ndCBib3RoZXIgaWYgbm8gdmFsdWUgcHJvdmlkZWRcbiAgaWYgKG9iaiA9PT0gbnVsbCB8fCB0eXBlb2Ygb2JqID09PSAndW5kZWZpbmVkJykge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIEZvcmNlIGFuIGFycmF5IGlmIG5vdCBhbHJlYWR5IHNvbWV0aGluZyBpdGVyYWJsZVxuICBpZiAodHlwZW9mIG9iaiAhPT0gJ29iamVjdCcpIHtcbiAgICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgICBvYmogPSBbb2JqXTtcbiAgfVxuXG4gIGlmIChpc0FycmF5KG9iaikpIHtcbiAgICAvLyBJdGVyYXRlIG92ZXIgYXJyYXkgdmFsdWVzXG4gICAgZm9yICh2YXIgaSA9IDAsIGwgPSBvYmoubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICBmbi5jYWxsKG51bGwsIG9ialtpXSwgaSwgb2JqKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgLy8gSXRlcmF0ZSBvdmVyIG9iamVjdCBrZXlzXG4gICAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSkpIHtcbiAgICAgICAgZm4uY2FsbChudWxsLCBvYmpba2V5XSwga2V5LCBvYmopO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIEFjY2VwdHMgdmFyYXJncyBleHBlY3RpbmcgZWFjaCBhcmd1bWVudCB0byBiZSBhbiBvYmplY3QsIHRoZW5cbiAqIGltbXV0YWJseSBtZXJnZXMgdGhlIHByb3BlcnRpZXMgb2YgZWFjaCBvYmplY3QgYW5kIHJldHVybnMgcmVzdWx0LlxuICpcbiAqIFdoZW4gbXVsdGlwbGUgb2JqZWN0cyBjb250YWluIHRoZSBzYW1lIGtleSB0aGUgbGF0ZXIgb2JqZWN0IGluXG4gKiB0aGUgYXJndW1lbnRzIGxpc3Qgd2lsbCB0YWtlIHByZWNlZGVuY2UuXG4gKlxuICogRXhhbXBsZTpcbiAqXG4gKiBgYGBqc1xuICogdmFyIHJlc3VsdCA9IG1lcmdlKHtmb286IDEyM30sIHtmb286IDQ1Nn0pO1xuICogY29uc29sZS5sb2cocmVzdWx0LmZvbyk7IC8vIG91dHB1dHMgNDU2XG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqMSBPYmplY3QgdG8gbWVyZ2VcbiAqIEByZXR1cm5zIHtPYmplY3R9IFJlc3VsdCBvZiBhbGwgbWVyZ2UgcHJvcGVydGllc1xuICovXG5mdW5jdGlvbiBtZXJnZSgvKiBvYmoxLCBvYmoyLCBvYmozLCAuLi4gKi8pIHtcbiAgdmFyIHJlc3VsdCA9IHt9O1xuICBmdW5jdGlvbiBhc3NpZ25WYWx1ZSh2YWwsIGtleSkge1xuICAgIGlmICh0eXBlb2YgcmVzdWx0W2tleV0gPT09ICdvYmplY3QnICYmIHR5cGVvZiB2YWwgPT09ICdvYmplY3QnKSB7XG4gICAgICByZXN1bHRba2V5XSA9IG1lcmdlKHJlc3VsdFtrZXldLCB2YWwpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXN1bHRba2V5XSA9IHZhbDtcbiAgICB9XG4gIH1cblxuICBmb3IgKHZhciBpID0gMCwgbCA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICBmb3JFYWNoKGFyZ3VtZW50c1tpXSwgYXNzaWduVmFsdWUpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogRXh0ZW5kcyBvYmplY3QgYSBieSBtdXRhYmx5IGFkZGluZyB0byBpdCB0aGUgcHJvcGVydGllcyBvZiBvYmplY3QgYi5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gYSBUaGUgb2JqZWN0IHRvIGJlIGV4dGVuZGVkXG4gKiBAcGFyYW0ge09iamVjdH0gYiBUaGUgb2JqZWN0IHRvIGNvcHkgcHJvcGVydGllcyBmcm9tXG4gKiBAcGFyYW0ge09iamVjdH0gdGhpc0FyZyBUaGUgb2JqZWN0IHRvIGJpbmQgZnVuY3Rpb24gdG9cbiAqIEByZXR1cm4ge09iamVjdH0gVGhlIHJlc3VsdGluZyB2YWx1ZSBvZiBvYmplY3QgYVxuICovXG5mdW5jdGlvbiBleHRlbmQoYSwgYiwgdGhpc0FyZykge1xuICBmb3JFYWNoKGIsIGZ1bmN0aW9uIGFzc2lnblZhbHVlKHZhbCwga2V5KSB7XG4gICAgaWYgKHRoaXNBcmcgJiYgdHlwZW9mIHZhbCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgYVtrZXldID0gYmluZCh2YWwsIHRoaXNBcmcpO1xuICAgIH0gZWxzZSB7XG4gICAgICBhW2tleV0gPSB2YWw7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIGE7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBpc0FycmF5OiBpc0FycmF5LFxuICBpc0FycmF5QnVmZmVyOiBpc0FycmF5QnVmZmVyLFxuICBpc0J1ZmZlcjogaXNCdWZmZXIsXG4gIGlzRm9ybURhdGE6IGlzRm9ybURhdGEsXG4gIGlzQXJyYXlCdWZmZXJWaWV3OiBpc0FycmF5QnVmZmVyVmlldyxcbiAgaXNTdHJpbmc6IGlzU3RyaW5nLFxuICBpc051bWJlcjogaXNOdW1iZXIsXG4gIGlzT2JqZWN0OiBpc09iamVjdCxcbiAgaXNVbmRlZmluZWQ6IGlzVW5kZWZpbmVkLFxuICBpc0RhdGU6IGlzRGF0ZSxcbiAgaXNGaWxlOiBpc0ZpbGUsXG4gIGlzQmxvYjogaXNCbG9iLFxuICBpc0Z1bmN0aW9uOiBpc0Z1bmN0aW9uLFxuICBpc1N0cmVhbTogaXNTdHJlYW0sXG4gIGlzVVJMU2VhcmNoUGFyYW1zOiBpc1VSTFNlYXJjaFBhcmFtcyxcbiAgaXNTdGFuZGFyZEJyb3dzZXJFbnY6IGlzU3RhbmRhcmRCcm93c2VyRW52LFxuICBmb3JFYWNoOiBmb3JFYWNoLFxuICBtZXJnZTogbWVyZ2UsXG4gIGV4dGVuZDogZXh0ZW5kLFxuICB0cmltOiB0cmltXG59O1xuIiwiLyohXG4gKiBEZXRlcm1pbmUgaWYgYW4gb2JqZWN0IGlzIGEgQnVmZmVyXG4gKlxuICogQGF1dGhvciAgIEZlcm9zcyBBYm91a2hhZGlqZWggPGh0dHBzOi8vZmVyb3NzLm9yZz5cbiAqIEBsaWNlbnNlICBNSVRcbiAqL1xuXG4vLyBUaGUgX2lzQnVmZmVyIGNoZWNrIGlzIGZvciBTYWZhcmkgNS03IHN1cHBvcnQsIGJlY2F1c2UgaXQncyBtaXNzaW5nXG4vLyBPYmplY3QucHJvdG90eXBlLmNvbnN0cnVjdG9yLiBSZW1vdmUgdGhpcyBldmVudHVhbGx5XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvYmopIHtcbiAgcmV0dXJuIG9iaiAhPSBudWxsICYmIChpc0J1ZmZlcihvYmopIHx8IGlzU2xvd0J1ZmZlcihvYmopIHx8ICEhb2JqLl9pc0J1ZmZlcilcbn1cblxuZnVuY3Rpb24gaXNCdWZmZXIgKG9iaikge1xuICByZXR1cm4gISFvYmouY29uc3RydWN0b3IgJiYgdHlwZW9mIG9iai5jb25zdHJ1Y3Rvci5pc0J1ZmZlciA9PT0gJ2Z1bmN0aW9uJyAmJiBvYmouY29uc3RydWN0b3IuaXNCdWZmZXIob2JqKVxufVxuXG4vLyBGb3IgTm9kZSB2MC4xMCBzdXBwb3J0LiBSZW1vdmUgdGhpcyBldmVudHVhbGx5LlxuZnVuY3Rpb24gaXNTbG93QnVmZmVyIChvYmopIHtcbiAgcmV0dXJuIHR5cGVvZiBvYmoucmVhZEZsb2F0TEUgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIG9iai5zbGljZSA9PT0gJ2Z1bmN0aW9uJyAmJiBpc0J1ZmZlcihvYmouc2xpY2UoMCwgMCkpXG59XG4iLCIvKiogTW9iWCAtIChjKSBNaWNoZWwgV2VzdHN0cmF0ZSAyMDE1IC0gMjAxOCAtIE1JVCBMaWNlbnNlZCAqL1xuLyohICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxyXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2VcclxudGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGVcclxuTGljZW5zZSBhdCBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuXHJcblRISVMgQ09ERSBJUyBQUk9WSURFRCBPTiBBTiAqQVMgSVMqIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTllcclxuS0lORCwgRUlUSEVSIEVYUFJFU1MgT1IgSU1QTElFRCwgSU5DTFVESU5HIFdJVEhPVVQgTElNSVRBVElPTiBBTlkgSU1QTElFRFxyXG5XQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgVElUTEUsIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLFxyXG5NRVJDSEFOVEFCTElUWSBPUiBOT04tSU5GUklOR0VNRU5ULlxyXG5cclxuU2VlIHRoZSBBcGFjaGUgVmVyc2lvbiAyLjAgTGljZW5zZSBmb3Igc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zXHJcbmFuZCBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuLyogZ2xvYmFsIFJlZmxlY3QsIFByb21pc2UgKi9cclxuXHJcbnZhciBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XHJcbiAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTsgfTtcclxuXHJcbmZ1bmN0aW9uIF9fZXh0ZW5kcyhkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xyXG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XHJcbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XHJcbn1cclxuXHJcbnZhciBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gX19hc3NpZ24odCkge1xyXG4gICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XHJcbiAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpIHRbcF0gPSBzW3BdO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHQ7XHJcbn07XHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcbmZ1bmN0aW9uIF9fdmFsdWVzKG8pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXSwgaSA9IDA7XHJcbiAgICBpZiAobSkgcmV0dXJuIG0uY2FsbChvKTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAobyAmJiBpID49IG8ubGVuZ3RoKSBvID0gdm9pZCAwO1xyXG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbyAmJiBvW2krK10sIGRvbmU6ICFvIH07XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxufVxyXG5cclxuZnVuY3Rpb24gX19yZWFkKG8sIG4pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcclxuICAgIGlmICghbSkgcmV0dXJuIG87XHJcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cclxuICAgIGZpbmFsbHkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cclxuICAgIH1cclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZnVuY3Rpb24gX19zcHJlYWQoKSB7XHJcbiAgICBmb3IgKHZhciBhciA9IFtdLCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKylcclxuICAgICAgICBhciA9IGFyLmNvbmNhdChfX3JlYWQoYXJndW1lbnRzW2ldKSk7XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cblxudmFyIE9CRlVTQ0FURURfRVJST1IkJDEgPSBcIkFuIGludmFyaWFudCBmYWlsZWQsIGhvd2V2ZXIgdGhlIGVycm9yIGlzIG9iZnVzY2F0ZWQgYmVjYXVzZSB0aGlzIGlzIGFuIHByb2R1Y3Rpb24gYnVpbGQuXCI7XG52YXIgRU1QVFlfQVJSQVkkJDEgPSBbXTtcbk9iamVjdC5mcmVlemUoRU1QVFlfQVJSQVkkJDEpO1xudmFyIEVNUFRZX09CSkVDVCQkMSA9IHt9O1xuT2JqZWN0LmZyZWV6ZShFTVBUWV9PQkpFQ1QkJDEpO1xuZnVuY3Rpb24gZ2V0TmV4dElkJCQxKCkge1xuICAgIHJldHVybiArK2dsb2JhbFN0YXRlJCQxLm1vYnhHdWlkO1xufVxuZnVuY3Rpb24gZmFpbCQkMShtZXNzYWdlKSB7XG4gICAgaW52YXJpYW50JCQxKGZhbHNlLCBtZXNzYWdlKTtcbiAgICB0aHJvdyBcIlhcIjsgLy8gdW5yZWFjaGFibGVcbn1cbmZ1bmN0aW9uIGludmFyaWFudCQkMShjaGVjaywgbWVzc2FnZSkge1xuICAgIGlmICghY2hlY2spXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlttb2J4XSBcIiArIChtZXNzYWdlIHx8IE9CRlVTQ0FURURfRVJST1IkJDEpKTtcbn1cbi8qKlxuICogUHJpbnRzIGEgZGVwcmVjYXRpb24gbWVzc2FnZSwgYnV0IG9ubHkgb25lIHRpbWUuXG4gKiBSZXR1cm5zIGZhbHNlIGlmIHRoZSBkZXByZWNhdGVkIG1lc3NhZ2Ugd2FzIGFscmVhZHkgcHJpbnRlZCBiZWZvcmVcbiAqL1xudmFyIGRlcHJlY2F0ZWRNZXNzYWdlcyA9IFtdO1xuZnVuY3Rpb24gZGVwcmVjYXRlZCQkMShtc2csIHRoaW5nKSB7XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSBcInByb2R1Y3Rpb25cIilcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIGlmICh0aGluZykge1xuICAgICAgICByZXR1cm4gZGVwcmVjYXRlZCQkMShcIidcIiArIG1zZyArIFwiJywgdXNlICdcIiArIHRoaW5nICsgXCInIGluc3RlYWQuXCIpO1xuICAgIH1cbiAgICBpZiAoZGVwcmVjYXRlZE1lc3NhZ2VzLmluZGV4T2YobXNnKSAhPT0gLTEpXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICBkZXByZWNhdGVkTWVzc2FnZXMucHVzaChtc2cpO1xuICAgIGNvbnNvbGUuZXJyb3IoXCJbbW9ieF0gRGVwcmVjYXRlZDogXCIgKyBtc2cpO1xuICAgIHJldHVybiB0cnVlO1xufVxuLyoqXG4gKiBNYWtlcyBzdXJlIHRoYXQgdGhlIHByb3ZpZGVkIGZ1bmN0aW9uIGlzIGludm9rZWQgYXQgbW9zdCBvbmNlLlxuICovXG5mdW5jdGlvbiBvbmNlJCQxKGZ1bmMpIHtcbiAgICB2YXIgaW52b2tlZCA9IGZhbHNlO1xuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmIChpbnZva2VkKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBpbnZva2VkID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIGZ1bmMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9O1xufVxudmFyIG5vb3AkJDEgPSBmdW5jdGlvbiAoKSB7IH07XG5mdW5jdGlvbiB1bmlxdWUkJDEobGlzdCkge1xuICAgIHZhciByZXMgPSBbXTtcbiAgICBsaXN0LmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgaWYgKHJlcy5pbmRleE9mKGl0ZW0pID09PSAtMSlcbiAgICAgICAgICAgIHJlcy5wdXNoKGl0ZW0pO1xuICAgIH0pO1xuICAgIHJldHVybiByZXM7XG59XG5mdW5jdGlvbiBpc09iamVjdCQkMSh2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZSAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCI7XG59XG5mdW5jdGlvbiBpc1BsYWluT2JqZWN0JCQxKHZhbHVlKSB7XG4gICAgaWYgKHZhbHVlID09PSBudWxsIHx8IHR5cGVvZiB2YWx1ZSAhPT0gXCJvYmplY3RcIilcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIHZhciBwcm90byA9IE9iamVjdC5nZXRQcm90b3R5cGVPZih2YWx1ZSk7XG4gICAgcmV0dXJuIHByb3RvID09PSBPYmplY3QucHJvdG90eXBlIHx8IHByb3RvID09PSBudWxsO1xufVxuXG5mdW5jdGlvbiBhZGRIaWRkZW5Qcm9wJCQxKG9iamVjdCwgcHJvcE5hbWUsIHZhbHVlKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iamVjdCwgcHJvcE5hbWUsIHtcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgIHZhbHVlOiB2YWx1ZVxuICAgIH0pO1xufVxuZnVuY3Rpb24gYWRkSGlkZGVuRmluYWxQcm9wJCQxKG9iamVjdCwgcHJvcE5hbWUsIHZhbHVlKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iamVjdCwgcHJvcE5hbWUsIHtcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgIHdyaXRhYmxlOiBmYWxzZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICB2YWx1ZTogdmFsdWVcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIGlzUHJvcGVydHlDb25maWd1cmFibGUkJDEob2JqZWN0LCBwcm9wKSB7XG4gICAgdmFyIGRlc2NyaXB0b3IgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iamVjdCwgcHJvcCk7XG4gICAgcmV0dXJuICFkZXNjcmlwdG9yIHx8IChkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSAhPT0gZmFsc2UgJiYgZGVzY3JpcHRvci53cml0YWJsZSAhPT0gZmFsc2UpO1xufVxuZnVuY3Rpb24gYXNzZXJ0UHJvcGVydHlDb25maWd1cmFibGUkJDEob2JqZWN0LCBwcm9wKSB7XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiAmJiAhaXNQcm9wZXJ0eUNvbmZpZ3VyYWJsZSQkMShvYmplY3QsIHByb3ApKVxuICAgICAgICBmYWlsJCQxKFwiQ2Fubm90IG1ha2UgcHJvcGVydHkgJ1wiICsgcHJvcC50b1N0cmluZygpICsgXCInIG9ic2VydmFibGUsIGl0IGlzIG5vdCBjb25maWd1cmFibGUgYW5kIHdyaXRhYmxlIGluIHRoZSB0YXJnZXQgb2JqZWN0XCIpO1xufVxuZnVuY3Rpb24gY3JlYXRlSW5zdGFuY2VvZlByZWRpY2F0ZSQkMShuYW1lLCBjbGF6eikge1xuICAgIHZhciBwcm9wTmFtZSA9IFwiaXNNb2JYXCIgKyBuYW1lO1xuICAgIGNsYXp6LnByb3RvdHlwZVtwcm9wTmFtZV0gPSB0cnVlO1xuICAgIHJldHVybiBmdW5jdGlvbiAoeCkge1xuICAgICAgICByZXR1cm4gaXNPYmplY3QkJDEoeCkgJiYgeFtwcm9wTmFtZV0gPT09IHRydWU7XG4gICAgfTtcbn1cbi8qKlxuICogUmV0dXJucyB3aGV0aGVyIHRoZSBhcmd1bWVudCBpcyBhbiBhcnJheSwgZGlzcmVnYXJkaW5nIG9ic2VydmFiaWxpdHkuXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXlMaWtlJCQxKHgpIHtcbiAgICByZXR1cm4gQXJyYXkuaXNBcnJheSh4KSB8fCBpc09ic2VydmFibGVBcnJheSQkMSh4KTtcbn1cbmZ1bmN0aW9uIGlzRVM2TWFwJCQxKHRoaW5nKSB7XG4gICAgcmV0dXJuIHRoaW5nIGluc3RhbmNlb2YgTWFwO1xufVxuZnVuY3Rpb24gaXNFUzZTZXQkJDEodGhpbmcpIHtcbiAgICByZXR1cm4gdGhpbmcgaW5zdGFuY2VvZiBTZXQ7XG59XG5mdW5jdGlvbiBnZXRNYXBMaWtlS2V5cyQkMShtYXApIHtcbiAgICBpZiAoaXNQbGFpbk9iamVjdCQkMShtYXApKVxuICAgICAgICByZXR1cm4gT2JqZWN0LmtleXMobWFwKTtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShtYXApKVxuICAgICAgICByZXR1cm4gbWFwLm1hcChmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgIHZhciBfYiA9IF9fcmVhZChfYSwgMSksIGtleSA9IF9iWzBdO1xuICAgICAgICAgICAgcmV0dXJuIGtleTtcbiAgICAgICAgfSk7XG4gICAgaWYgKGlzRVM2TWFwJCQxKG1hcCkgfHwgaXNPYnNlcnZhYmxlTWFwJCQxKG1hcCkpXG4gICAgICAgIHJldHVybiBBcnJheS5mcm9tKG1hcC5rZXlzKCkpO1xuICAgIHJldHVybiBmYWlsJCQxKFwiQ2Fubm90IGdldCBrZXlzIGZyb20gJ1wiICsgbWFwICsgXCInXCIpO1xufVxuZnVuY3Rpb24gdG9QcmltaXRpdmUkJDEodmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUgPT09IG51bGwgPyBudWxsIDogdHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiID8gXCJcIiArIHZhbHVlIDogdmFsdWU7XG59XG5cbnZhciAkbW9ieCQkMSA9IFN5bWJvbChcIm1vYnggYWRtaW5pc3RyYXRpb25cIik7XG52YXIgQXRvbSQkMSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSBuZXcgYXRvbS4gRm9yIGRlYnVnZ2luZyBwdXJwb3NlcyBpdCBpcyByZWNvbW1lbmRlZCB0byBnaXZlIGl0IGEgbmFtZS5cbiAgICAgKiBUaGUgb25CZWNvbWVPYnNlcnZlZCBhbmQgb25CZWNvbWVVbm9ic2VydmVkIGNhbGxiYWNrcyBjYW4gYmUgdXNlZCBmb3IgcmVzb3VyY2UgbWFuYWdlbWVudC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBBdG9tJCQxKG5hbWUpIHtcbiAgICAgICAgaWYgKG5hbWUgPT09IHZvaWQgMCkgeyBuYW1lID0gXCJBdG9tQFwiICsgZ2V0TmV4dElkJCQxKCk7IH1cbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgdGhpcy5pc1BlbmRpbmdVbm9ic2VydmF0aW9uID0gZmFsc2U7IC8vIGZvciBlZmZlY3RpdmUgdW5vYnNlcnZpbmcuIEJhc2VBdG9tIGhhcyB0cnVlLCBmb3IgZXh0cmEgb3B0aW1pemF0aW9uLCBzbyBpdHMgb25CZWNvbWVVbm9ic2VydmVkIG5ldmVyIGdldHMgY2FsbGVkLCBiZWNhdXNlIGl0J3Mgbm90IG5lZWRlZFxuICAgICAgICB0aGlzLmlzQmVpbmdPYnNlcnZlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLm9ic2VydmVycyA9IG5ldyBTZXQoKTtcbiAgICAgICAgdGhpcy5kaWZmVmFsdWUgPSAwO1xuICAgICAgICB0aGlzLmxhc3RBY2Nlc3NlZEJ5ID0gMDtcbiAgICAgICAgdGhpcy5sb3dlc3RPYnNlcnZlclN0YXRlID0gSURlcml2YXRpb25TdGF0ZS5OT1RfVFJBQ0tJTkc7XG4gICAgfVxuICAgIEF0b20kJDEucHJvdG90eXBlLm9uQmVjb21lT2JzZXJ2ZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLm9uQmVjb21lT2JzZXJ2ZWRMaXN0ZW5lcnMpIHtcbiAgICAgICAgICAgIHRoaXMub25CZWNvbWVPYnNlcnZlZExpc3RlbmVycy5mb3JFYWNoKGZ1bmN0aW9uIChsaXN0ZW5lcikgeyByZXR1cm4gbGlzdGVuZXIoKTsgfSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIEF0b20kJDEucHJvdG90eXBlLm9uQmVjb21lVW5vYnNlcnZlZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMub25CZWNvbWVVbm9ic2VydmVkTGlzdGVuZXJzKSB7XG4gICAgICAgICAgICB0aGlzLm9uQmVjb21lVW5vYnNlcnZlZExpc3RlbmVycy5mb3JFYWNoKGZ1bmN0aW9uIChsaXN0ZW5lcikgeyByZXR1cm4gbGlzdGVuZXIoKTsgfSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEludm9rZSB0aGlzIG1ldGhvZCB0byBub3RpZnkgbW9ieCB0aGF0IHlvdXIgYXRvbSBoYXMgYmVlbiB1c2VkIHNvbWVob3cuXG4gICAgICogUmV0dXJucyB0cnVlIGlmIHRoZXJlIGlzIGN1cnJlbnRseSBhIHJlYWN0aXZlIGNvbnRleHQuXG4gICAgICovXG4gICAgQXRvbSQkMS5wcm90b3R5cGUucmVwb3J0T2JzZXJ2ZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiByZXBvcnRPYnNlcnZlZCQkMSh0aGlzKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIEludm9rZSB0aGlzIG1ldGhvZCBfYWZ0ZXJfIHRoaXMgbWV0aG9kIGhhcyBjaGFuZ2VkIHRvIHNpZ25hbCBtb2J4IHRoYXQgYWxsIGl0cyBvYnNlcnZlcnMgc2hvdWxkIGludmFsaWRhdGUuXG4gICAgICovXG4gICAgQXRvbSQkMS5wcm90b3R5cGUucmVwb3J0Q2hhbmdlZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc3RhcnRCYXRjaCQkMSgpO1xuICAgICAgICBwcm9wYWdhdGVDaGFuZ2VkJCQxKHRoaXMpO1xuICAgICAgICBlbmRCYXRjaCQkMSgpO1xuICAgIH07XG4gICAgQXRvbSQkMS5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm5hbWU7XG4gICAgfTtcbiAgICByZXR1cm4gQXRvbSQkMTtcbn0oKSk7XG52YXIgaXNBdG9tJCQxID0gY3JlYXRlSW5zdGFuY2VvZlByZWRpY2F0ZSQkMShcIkF0b21cIiwgQXRvbSQkMSk7XG5mdW5jdGlvbiBjcmVhdGVBdG9tJCQxKG5hbWUsIG9uQmVjb21lT2JzZXJ2ZWRIYW5kbGVyLCBvbkJlY29tZVVub2JzZXJ2ZWRIYW5kbGVyKSB7XG4gICAgaWYgKG9uQmVjb21lT2JzZXJ2ZWRIYW5kbGVyID09PSB2b2lkIDApIHsgb25CZWNvbWVPYnNlcnZlZEhhbmRsZXIgPSBub29wJCQxOyB9XG4gICAgaWYgKG9uQmVjb21lVW5vYnNlcnZlZEhhbmRsZXIgPT09IHZvaWQgMCkgeyBvbkJlY29tZVVub2JzZXJ2ZWRIYW5kbGVyID0gbm9vcCQkMTsgfVxuICAgIHZhciBhdG9tID0gbmV3IEF0b20kJDEobmFtZSk7XG4gICAgLy8gZGVmYXVsdCBgbm9vcGAgbGlzdGVuZXIgd2lsbCBub3QgaW5pdGlhbGl6ZSB0aGUgaG9vayBTZXRcbiAgICBpZiAob25CZWNvbWVPYnNlcnZlZEhhbmRsZXIgIT09IG5vb3AkJDEpIHtcbiAgICAgICAgb25CZWNvbWVPYnNlcnZlZCQkMShhdG9tLCBvbkJlY29tZU9ic2VydmVkSGFuZGxlcik7XG4gICAgfVxuICAgIGlmIChvbkJlY29tZVVub2JzZXJ2ZWRIYW5kbGVyICE9PSBub29wJCQxKSB7XG4gICAgICAgIG9uQmVjb21lVW5vYnNlcnZlZCQkMShhdG9tLCBvbkJlY29tZVVub2JzZXJ2ZWRIYW5kbGVyKTtcbiAgICB9XG4gICAgcmV0dXJuIGF0b207XG59XG5cbmZ1bmN0aW9uIGlkZW50aXR5Q29tcGFyZXIoYSwgYikge1xuICAgIHJldHVybiBhID09PSBiO1xufVxuZnVuY3Rpb24gc3RydWN0dXJhbENvbXBhcmVyKGEsIGIpIHtcbiAgICByZXR1cm4gZGVlcEVxdWFsJCQxKGEsIGIpO1xufVxuZnVuY3Rpb24gZGVmYXVsdENvbXBhcmVyKGEsIGIpIHtcbiAgICByZXR1cm4gT2JqZWN0LmlzKGEsIGIpO1xufVxudmFyIGNvbXBhcmVyJCQxID0ge1xuICAgIGlkZW50aXR5OiBpZGVudGl0eUNvbXBhcmVyLFxuICAgIHN0cnVjdHVyYWw6IHN0cnVjdHVyYWxDb21wYXJlcixcbiAgICBkZWZhdWx0OiBkZWZhdWx0Q29tcGFyZXJcbn07XG5cbnZhciBtb2J4RGlkUnVuTGF6eUluaXRpYWxpemVyc1N5bWJvbCQkMSA9IFN5bWJvbChcIm1vYnggZGlkIHJ1biBsYXp5IGluaXRpYWxpemVyc1wiKTtcbnZhciBtb2J4UGVuZGluZ0RlY29yYXRvcnMkJDEgPSBTeW1ib2woXCJtb2J4IHBlbmRpbmcgZGVjb3JhdG9yc1wiKTtcbnZhciBlbnVtZXJhYmxlRGVzY3JpcHRvckNhY2hlID0ge307XG52YXIgbm9uRW51bWVyYWJsZURlc2NyaXB0b3JDYWNoZSA9IHt9O1xuZnVuY3Rpb24gY3JlYXRlUHJvcGVydHlJbml0aWFsaXplckRlc2NyaXB0b3IocHJvcCwgZW51bWVyYWJsZSkge1xuICAgIHZhciBjYWNoZSA9IGVudW1lcmFibGUgPyBlbnVtZXJhYmxlRGVzY3JpcHRvckNhY2hlIDogbm9uRW51bWVyYWJsZURlc2NyaXB0b3JDYWNoZTtcbiAgICByZXR1cm4gKGNhY2hlW3Byb3BdIHx8XG4gICAgICAgIChjYWNoZVtwcm9wXSA9IHtcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGVudW1lcmFibGU6IGVudW1lcmFibGUsXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpbml0aWFsaXplSW5zdGFuY2UkJDEodGhpcyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXNbcHJvcF07XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpbml0aWFsaXplSW5zdGFuY2UkJDEodGhpcyk7XG4gICAgICAgICAgICAgICAgdGhpc1twcm9wXSA9IHZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KSk7XG59XG5mdW5jdGlvbiBpbml0aWFsaXplSW5zdGFuY2UkJDEodGFyZ2V0KSB7XG4gICAgaWYgKHRhcmdldFttb2J4RGlkUnVuTGF6eUluaXRpYWxpemVyc1N5bWJvbCQkMV0gPT09IHRydWUpXG4gICAgICAgIHJldHVybjtcbiAgICB2YXIgZGVjb3JhdG9ycyA9IHRhcmdldFttb2J4UGVuZGluZ0RlY29yYXRvcnMkJDFdO1xuICAgIGlmIChkZWNvcmF0b3JzKSB7XG4gICAgICAgIGFkZEhpZGRlblByb3AkJDEodGFyZ2V0LCBtb2J4RGlkUnVuTGF6eUluaXRpYWxpemVyc1N5bWJvbCQkMSwgdHJ1ZSk7XG4gICAgICAgIGZvciAodmFyIGtleSBpbiBkZWNvcmF0b3JzKSB7XG4gICAgICAgICAgICB2YXIgZCA9IGRlY29yYXRvcnNba2V5XTtcbiAgICAgICAgICAgIGQucHJvcGVydHlDcmVhdG9yKHRhcmdldCwgZC5wcm9wLCBkLmRlc2NyaXB0b3IsIGQuZGVjb3JhdG9yVGFyZ2V0LCBkLmRlY29yYXRvckFyZ3VtZW50cyk7XG4gICAgICAgIH1cbiAgICB9XG59XG5mdW5jdGlvbiBjcmVhdGVQcm9wRGVjb3JhdG9yJCQxKHByb3BlcnR5SW5pdGlhbGx5RW51bWVyYWJsZSwgcHJvcGVydHlDcmVhdG9yKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIGRlY29yYXRvckZhY3RvcnkoKSB7XG4gICAgICAgIHZhciBkZWNvcmF0b3JBcmd1bWVudHM7XG4gICAgICAgIHZhciBkZWNvcmF0b3IgPSBmdW5jdGlvbiBkZWNvcmF0ZSQkMSh0YXJnZXQsIHByb3AsIGRlc2NyaXB0b3IsIGFwcGx5SW1tZWRpYXRlbHlcbiAgICAgICAgLy8gVGhpcyBpcyBhIHNwZWNpYWwgcGFyYW1ldGVyIHRvIHNpZ25hbCB0aGUgZGlyZWN0IGFwcGxpY2F0aW9uIG9mIGEgZGVjb3JhdG9yLCBhbGxvdyBleHRlbmRPYnNlcnZhYmxlIHRvIHNraXAgdGhlIGVudGlyZSB0eXBlIGRlY29yYXRpb24gcGFydCxcbiAgICAgICAgLy8gYXMgdGhlIGluc3RhbmNlIHRvIGFwcGx5IHRoZSBkZWNvcmF0b3IgdG8gZXF1YWxzIHRoZSB0YXJnZXRcbiAgICAgICAgKSB7XG4gICAgICAgICAgICBpZiAoYXBwbHlJbW1lZGlhdGVseSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIHByb3BlcnR5Q3JlYXRvcih0YXJnZXQsIHByb3AsIGRlc2NyaXB0b3IsIHRhcmdldCwgZGVjb3JhdG9yQXJndW1lbnRzKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgJiYgIXF1YWNrc0xpa2VBRGVjb3JhdG9yJCQxKGFyZ3VtZW50cykpXG4gICAgICAgICAgICAgICAgZmFpbCQkMShcIlRoaXMgZnVuY3Rpb24gaXMgYSBkZWNvcmF0b3IsIGJ1dCBpdCB3YXNuJ3QgaW52b2tlZCBsaWtlIGEgZGVjb3JhdG9yXCIpO1xuICAgICAgICAgICAgaWYgKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwodGFyZ2V0LCBtb2J4UGVuZGluZ0RlY29yYXRvcnMkJDEpKSB7XG4gICAgICAgICAgICAgICAgdmFyIGluaGVyaXRlZERlY29yYXRvcnMgPSB0YXJnZXRbbW9ieFBlbmRpbmdEZWNvcmF0b3JzJCQxXTtcbiAgICAgICAgICAgICAgICBhZGRIaWRkZW5Qcm9wJCQxKHRhcmdldCwgbW9ieFBlbmRpbmdEZWNvcmF0b3JzJCQxLCBfX2Fzc2lnbih7fSwgaW5oZXJpdGVkRGVjb3JhdG9ycykpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGFyZ2V0W21vYnhQZW5kaW5nRGVjb3JhdG9ycyQkMV1bcHJvcF0gPSB7XG4gICAgICAgICAgICAgICAgcHJvcDogcHJvcCxcbiAgICAgICAgICAgICAgICBwcm9wZXJ0eUNyZWF0b3I6IHByb3BlcnR5Q3JlYXRvcixcbiAgICAgICAgICAgICAgICBkZXNjcmlwdG9yOiBkZXNjcmlwdG9yLFxuICAgICAgICAgICAgICAgIGRlY29yYXRvclRhcmdldDogdGFyZ2V0LFxuICAgICAgICAgICAgICAgIGRlY29yYXRvckFyZ3VtZW50czogZGVjb3JhdG9yQXJndW1lbnRzXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgcmV0dXJuIGNyZWF0ZVByb3BlcnR5SW5pdGlhbGl6ZXJEZXNjcmlwdG9yKHByb3AsIHByb3BlcnR5SW5pdGlhbGx5RW51bWVyYWJsZSk7XG4gICAgICAgIH07XG4gICAgICAgIGlmIChxdWFja3NMaWtlQURlY29yYXRvciQkMShhcmd1bWVudHMpKSB7XG4gICAgICAgICAgICAvLyBAZGVjb3JhdG9yXG4gICAgICAgICAgICBkZWNvcmF0b3JBcmd1bWVudHMgPSBFTVBUWV9BUlJBWSQkMTtcbiAgICAgICAgICAgIHJldHVybiBkZWNvcmF0b3IuYXBwbHkobnVsbCwgYXJndW1lbnRzKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIEBkZWNvcmF0b3IoYXJncylcbiAgICAgICAgICAgIGRlY29yYXRvckFyZ3VtZW50cyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XG4gICAgICAgICAgICByZXR1cm4gZGVjb3JhdG9yO1xuICAgICAgICB9XG4gICAgfTtcbn1cbmZ1bmN0aW9uIHF1YWNrc0xpa2VBRGVjb3JhdG9yJCQxKGFyZ3MpIHtcbiAgICByZXR1cm4gKCgoYXJncy5sZW5ndGggPT09IDIgfHwgYXJncy5sZW5ndGggPT09IDMpICYmIHR5cGVvZiBhcmdzWzFdID09PSBcInN0cmluZ1wiKSB8fFxuICAgICAgICAoYXJncy5sZW5ndGggPT09IDQgJiYgYXJnc1szXSA9PT0gdHJ1ZSkpO1xufVxuXG5mdW5jdGlvbiBkZWVwRW5oYW5jZXIkJDEodiwgXywgbmFtZSkge1xuICAgIC8vIGl0IGlzIGFuIG9ic2VydmFibGUgYWxyZWFkeSwgZG9uZVxuICAgIGlmIChpc09ic2VydmFibGUkJDEodikpXG4gICAgICAgIHJldHVybiB2O1xuICAgIC8vIHNvbWV0aGluZyB0aGF0IGNhbiBiZSBjb252ZXJ0ZWQgYW5kIG11dGF0ZWQ/XG4gICAgaWYgKEFycmF5LmlzQXJyYXkodikpXG4gICAgICAgIHJldHVybiBvYnNlcnZhYmxlJCQxLmFycmF5KHYsIHsgbmFtZTogbmFtZSB9KTtcbiAgICBpZiAoaXNQbGFpbk9iamVjdCQkMSh2KSlcbiAgICAgICAgcmV0dXJuIG9ic2VydmFibGUkJDEub2JqZWN0KHYsIHVuZGVmaW5lZCwgeyBuYW1lOiBuYW1lIH0pO1xuICAgIGlmIChpc0VTNk1hcCQkMSh2KSlcbiAgICAgICAgcmV0dXJuIG9ic2VydmFibGUkJDEubWFwKHYsIHsgbmFtZTogbmFtZSB9KTtcbiAgICBpZiAoaXNFUzZTZXQkJDEodikpXG4gICAgICAgIHJldHVybiBvYnNlcnZhYmxlJCQxLnNldCh2LCB7IG5hbWU6IG5hbWUgfSk7XG4gICAgcmV0dXJuIHY7XG59XG5mdW5jdGlvbiBzaGFsbG93RW5oYW5jZXIkJDEodiwgXywgbmFtZSkge1xuICAgIGlmICh2ID09PSB1bmRlZmluZWQgfHwgdiA9PT0gbnVsbClcbiAgICAgICAgcmV0dXJuIHY7XG4gICAgaWYgKGlzT2JzZXJ2YWJsZU9iamVjdCQkMSh2KSB8fCBpc09ic2VydmFibGVBcnJheSQkMSh2KSB8fCBpc09ic2VydmFibGVNYXAkJDEodikgfHwgaXNPYnNlcnZhYmxlU2V0JCQxKHYpKVxuICAgICAgICByZXR1cm4gdjtcbiAgICBpZiAoQXJyYXkuaXNBcnJheSh2KSlcbiAgICAgICAgcmV0dXJuIG9ic2VydmFibGUkJDEuYXJyYXkodiwgeyBuYW1lOiBuYW1lLCBkZWVwOiBmYWxzZSB9KTtcbiAgICBpZiAoaXNQbGFpbk9iamVjdCQkMSh2KSlcbiAgICAgICAgcmV0dXJuIG9ic2VydmFibGUkJDEub2JqZWN0KHYsIHVuZGVmaW5lZCwgeyBuYW1lOiBuYW1lLCBkZWVwOiBmYWxzZSB9KTtcbiAgICBpZiAoaXNFUzZNYXAkJDEodikpXG4gICAgICAgIHJldHVybiBvYnNlcnZhYmxlJCQxLm1hcCh2LCB7IG5hbWU6IG5hbWUsIGRlZXA6IGZhbHNlIH0pO1xuICAgIGlmIChpc0VTNlNldCQkMSh2KSlcbiAgICAgICAgcmV0dXJuIG9ic2VydmFibGUkJDEuc2V0KHYsIHsgbmFtZTogbmFtZSwgZGVlcDogZmFsc2UgfSk7XG4gICAgcmV0dXJuIGZhaWwkJDEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiICYmXG4gICAgICAgIFwiVGhlIHNoYWxsb3cgbW9kaWZpZXIgLyBkZWNvcmF0b3IgY2FuIG9ubHkgdXNlZCBpbiBjb21iaW5hdGlvbiB3aXRoIGFycmF5cywgb2JqZWN0cywgbWFwcyBhbmQgc2V0c1wiKTtcbn1cbmZ1bmN0aW9uIHJlZmVyZW5jZUVuaGFuY2VyJCQxKG5ld1ZhbHVlKSB7XG4gICAgLy8gbmV2ZXIgdHVybiBpbnRvIGFuIG9ic2VydmFibGVcbiAgICByZXR1cm4gbmV3VmFsdWU7XG59XG5mdW5jdGlvbiByZWZTdHJ1Y3RFbmhhbmNlciQkMSh2LCBvbGRWYWx1ZSwgbmFtZSkge1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgJiYgaXNPYnNlcnZhYmxlJCQxKHYpKVxuICAgICAgICB0aHJvdyBcIm9ic2VydmFibGUuc3RydWN0IHNob3VsZCBub3QgYmUgdXNlZCB3aXRoIG9ic2VydmFibGUgdmFsdWVzXCI7XG4gICAgaWYgKGRlZXBFcXVhbCQkMSh2LCBvbGRWYWx1ZSkpXG4gICAgICAgIHJldHVybiBvbGRWYWx1ZTtcbiAgICByZXR1cm4gdjtcbn1cblxuZnVuY3Rpb24gY3JlYXRlRGVjb3JhdG9yRm9yRW5oYW5jZXIkJDEoZW5oYW5jZXIpIHtcbiAgICBpbnZhcmlhbnQkJDEoZW5oYW5jZXIpO1xuICAgIHZhciBkZWNvcmF0b3IgPSBjcmVhdGVQcm9wRGVjb3JhdG9yJCQxKHRydWUsIGZ1bmN0aW9uICh0YXJnZXQsIHByb3BlcnR5TmFtZSwgZGVzY3JpcHRvciwgX2RlY29yYXRvclRhcmdldCwgZGVjb3JhdG9yQXJncykge1xuICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gICAgICAgICAgICBpbnZhcmlhbnQkJDEoIWRlc2NyaXB0b3IgfHwgIWRlc2NyaXB0b3IuZ2V0LCBcIkBvYnNlcnZhYmxlIGNhbm5vdCBiZSB1c2VkIG9uIGdldHRlciAocHJvcGVydHkgXFxcIlwiICsgcHJvcGVydHlOYW1lICsgXCJcXFwiKSwgdXNlIEBjb21wdXRlZCBpbnN0ZWFkLlwiKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgaW5pdGlhbFZhbHVlID0gZGVzY3JpcHRvclxuICAgICAgICAgICAgPyBkZXNjcmlwdG9yLmluaXRpYWxpemVyXG4gICAgICAgICAgICAgICAgPyBkZXNjcmlwdG9yLmluaXRpYWxpemVyLmNhbGwodGFyZ2V0KVxuICAgICAgICAgICAgICAgIDogZGVzY3JpcHRvci52YWx1ZVxuICAgICAgICAgICAgOiB1bmRlZmluZWQ7XG4gICAgICAgIGFzT2JzZXJ2YWJsZU9iamVjdCQkMSh0YXJnZXQpLmFkZE9ic2VydmFibGVQcm9wKHByb3BlcnR5TmFtZSwgaW5pdGlhbFZhbHVlLCBlbmhhbmNlcik7XG4gICAgfSk7XG4gICAgdmFyIHJlcyA9IFxuICAgIC8vIEV4dHJhIHByb2Nlc3MgY2hlY2tzLCBhcyB0aGlzIGhhcHBlbnMgZHVyaW5nIG1vZHVsZSBpbml0aWFsaXphdGlvblxuICAgIHR5cGVvZiBwcm9jZXNzICE9PSBcInVuZGVmaW5lZFwiICYmIHByb2Nlc3MuZW52ICYmIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIlxuICAgICAgICA/IGZ1bmN0aW9uIG9ic2VydmFibGVEZWNvcmF0b3IoKSB7XG4gICAgICAgICAgICAvLyBUaGlzIHdyYXBwZXIgZnVuY3Rpb24gaXMganVzdCB0byBkZXRlY3QgaWxsZWdhbCBkZWNvcmF0b3IgaW52b2NhdGlvbnMsIGRlcHJlY2F0ZSBpbiBhIG5leHQgdmVyc2lvblxuICAgICAgICAgICAgLy8gYW5kIHNpbXBseSByZXR1cm4gdGhlIGNyZWF0ZWQgcHJvcCBkZWNvcmF0b3JcbiAgICAgICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMilcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFpbCQkMShcIkluY29ycmVjdCBkZWNvcmF0b3IgaW52b2NhdGlvbi4gQG9ic2VydmFibGUgZGVjb3JhdG9yIGRvZXNuJ3QgZXhwZWN0IGFueSBhcmd1bWVudHNcIik7XG4gICAgICAgICAgICByZXR1cm4gZGVjb3JhdG9yLmFwcGx5KG51bGwsIGFyZ3VtZW50cyk7XG4gICAgICAgIH1cbiAgICAgICAgOiBkZWNvcmF0b3I7XG4gICAgcmVzLmVuaGFuY2VyID0gZW5oYW5jZXI7XG4gICAgcmV0dXJuIHJlcztcbn1cblxuLy8gUHJlZGVmaW5lZCBiYWdzIG9mIGNyZWF0ZSBvYnNlcnZhYmxlIG9wdGlvbnMsIHRvIGF2b2lkIGFsbG9jYXRpbmcgdGVtcG9yYXJpbHkgb3B0aW9uIG9iamVjdHNcbi8vIGluIHRoZSBtYWpvcml0eSBvZiBjYXNlc1xudmFyIGRlZmF1bHRDcmVhdGVPYnNlcnZhYmxlT3B0aW9ucyQkMSA9IHtcbiAgICBkZWVwOiB0cnVlLFxuICAgIG5hbWU6IHVuZGVmaW5lZCxcbiAgICBkZWZhdWx0RGVjb3JhdG9yOiB1bmRlZmluZWQsXG4gICAgcHJveHk6IHRydWVcbn07XG5PYmplY3QuZnJlZXplKGRlZmF1bHRDcmVhdGVPYnNlcnZhYmxlT3B0aW9ucyQkMSk7XG5mdW5jdGlvbiBhc3NlcnRWYWxpZE9wdGlvbihrZXkpIHtcbiAgICBpZiAoIS9eKGRlZXB8bmFtZXxlcXVhbHN8ZGVmYXVsdERlY29yYXRvcnxwcm94eSkkLy50ZXN0KGtleSkpXG4gICAgICAgIGZhaWwkJDEoXCJpbnZhbGlkIG9wdGlvbiBmb3IgKGV4dGVuZClvYnNlcnZhYmxlOiBcIiArIGtleSk7XG59XG5mdW5jdGlvbiBhc0NyZWF0ZU9ic2VydmFibGVPcHRpb25zJCQxKHRoaW5nKSB7XG4gICAgaWYgKHRoaW5nID09PSBudWxsIHx8IHRoaW5nID09PSB1bmRlZmluZWQpXG4gICAgICAgIHJldHVybiBkZWZhdWx0Q3JlYXRlT2JzZXJ2YWJsZU9wdGlvbnMkJDE7XG4gICAgaWYgKHR5cGVvZiB0aGluZyA9PT0gXCJzdHJpbmdcIilcbiAgICAgICAgcmV0dXJuIHsgbmFtZTogdGhpbmcsIGRlZXA6IHRydWUsIHByb3h5OiB0cnVlIH07XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xuICAgICAgICBpZiAodHlwZW9mIHRoaW5nICE9PSBcIm9iamVjdFwiKVxuICAgICAgICAgICAgcmV0dXJuIGZhaWwkJDEoXCJleHBlY3RlZCBvcHRpb25zIG9iamVjdFwiKTtcbiAgICAgICAgT2JqZWN0LmtleXModGhpbmcpLmZvckVhY2goYXNzZXJ0VmFsaWRPcHRpb24pO1xuICAgIH1cbiAgICByZXR1cm4gdGhpbmc7XG59XG52YXIgZGVlcERlY29yYXRvciQkMSA9IGNyZWF0ZURlY29yYXRvckZvckVuaGFuY2VyJCQxKGRlZXBFbmhhbmNlciQkMSk7XG52YXIgc2hhbGxvd0RlY29yYXRvciA9IGNyZWF0ZURlY29yYXRvckZvckVuaGFuY2VyJCQxKHNoYWxsb3dFbmhhbmNlciQkMSk7XG52YXIgcmVmRGVjb3JhdG9yJCQxID0gY3JlYXRlRGVjb3JhdG9yRm9yRW5oYW5jZXIkJDEocmVmZXJlbmNlRW5oYW5jZXIkJDEpO1xudmFyIHJlZlN0cnVjdERlY29yYXRvciA9IGNyZWF0ZURlY29yYXRvckZvckVuaGFuY2VyJCQxKHJlZlN0cnVjdEVuaGFuY2VyJCQxKTtcbmZ1bmN0aW9uIGdldEVuaGFuY2VyRnJvbU9wdGlvbnMob3B0aW9ucykge1xuICAgIHJldHVybiBvcHRpb25zLmRlZmF1bHREZWNvcmF0b3JcbiAgICAgICAgPyBvcHRpb25zLmRlZmF1bHREZWNvcmF0b3IuZW5oYW5jZXJcbiAgICAgICAgOiBvcHRpb25zLmRlZXAgPT09IGZhbHNlXG4gICAgICAgICAgICA/IHJlZmVyZW5jZUVuaGFuY2VyJCQxXG4gICAgICAgICAgICA6IGRlZXBFbmhhbmNlciQkMTtcbn1cbi8qKlxuICogVHVybnMgYW4gb2JqZWN0LCBhcnJheSBvciBmdW5jdGlvbiBpbnRvIGEgcmVhY3RpdmUgc3RydWN0dXJlLlxuICogQHBhcmFtIHYgdGhlIHZhbHVlIHdoaWNoIHNob3VsZCBiZWNvbWUgb2JzZXJ2YWJsZS5cbiAqL1xuZnVuY3Rpb24gY3JlYXRlT2JzZXJ2YWJsZSh2LCBhcmcyLCBhcmczKSB7XG4gICAgLy8gQG9ic2VydmFibGUgc29tZVByb3A7XG4gICAgaWYgKHR5cGVvZiBhcmd1bWVudHNbMV0gPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgcmV0dXJuIGRlZXBEZWNvcmF0b3IkJDEuYXBwbHkobnVsbCwgYXJndW1lbnRzKTtcbiAgICB9XG4gICAgLy8gaXQgaXMgYW4gb2JzZXJ2YWJsZSBhbHJlYWR5LCBkb25lXG4gICAgaWYgKGlzT2JzZXJ2YWJsZSQkMSh2KSlcbiAgICAgICAgcmV0dXJuIHY7XG4gICAgLy8gc29tZXRoaW5nIHRoYXQgY2FuIGJlIGNvbnZlcnRlZCBhbmQgbXV0YXRlZD9cbiAgICB2YXIgcmVzID0gaXNQbGFpbk9iamVjdCQkMSh2KVxuICAgICAgICA/IG9ic2VydmFibGUkJDEub2JqZWN0KHYsIGFyZzIsIGFyZzMpXG4gICAgICAgIDogQXJyYXkuaXNBcnJheSh2KVxuICAgICAgICAgICAgPyBvYnNlcnZhYmxlJCQxLmFycmF5KHYsIGFyZzIpXG4gICAgICAgICAgICA6IGlzRVM2TWFwJCQxKHYpXG4gICAgICAgICAgICAgICAgPyBvYnNlcnZhYmxlJCQxLm1hcCh2LCBhcmcyKVxuICAgICAgICAgICAgICAgIDogaXNFUzZTZXQkJDEodilcbiAgICAgICAgICAgICAgICAgICAgPyBvYnNlcnZhYmxlJCQxLnNldCh2LCBhcmcyKVxuICAgICAgICAgICAgICAgICAgICA6IHY7XG4gICAgLy8gdGhpcyB2YWx1ZSBjb3VsZCBiZSBjb252ZXJ0ZWQgdG8gYSBuZXcgb2JzZXJ2YWJsZSBkYXRhIHN0cnVjdHVyZSwgcmV0dXJuIGl0XG4gICAgaWYgKHJlcyAhPT0gdilcbiAgICAgICAgcmV0dXJuIHJlcztcbiAgICAvLyBvdGhlcndpc2UsIGp1c3QgYm94IGl0XG4gICAgZmFpbCQkMShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgJiZcbiAgICAgICAgXCJUaGUgcHJvdmlkZWQgdmFsdWUgY291bGQgbm90IGJlIGNvbnZlcnRlZCBpbnRvIGFuIG9ic2VydmFibGUuIElmIHlvdSB3YW50IGp1c3QgY3JlYXRlIGFuIG9ic2VydmFibGUgcmVmZXJlbmNlIHRvIHRoZSBvYmplY3QgdXNlICdvYnNlcnZhYmxlLmJveCh2YWx1ZSknXCIpO1xufVxudmFyIG9ic2VydmFibGVGYWN0b3JpZXMgPSB7XG4gICAgYm94OiBmdW5jdGlvbiAodmFsdWUsIG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAyKVxuICAgICAgICAgICAgaW5jb3JyZWN0bHlVc2VkQXNEZWNvcmF0b3IoXCJib3hcIik7XG4gICAgICAgIHZhciBvID0gYXNDcmVhdGVPYnNlcnZhYmxlT3B0aW9ucyQkMShvcHRpb25zKTtcbiAgICAgICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlVmFsdWUkJDEodmFsdWUsIGdldEVuaGFuY2VyRnJvbU9wdGlvbnMobyksIG8ubmFtZSwgdHJ1ZSwgby5lcXVhbHMpO1xuICAgIH0sXG4gICAgYXJyYXk6IGZ1bmN0aW9uIChpbml0aWFsVmFsdWVzLCBvcHRpb25zKSB7XG4gICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMilcbiAgICAgICAgICAgIGluY29ycmVjdGx5VXNlZEFzRGVjb3JhdG9yKFwiYXJyYXlcIik7XG4gICAgICAgIHZhciBvID0gYXNDcmVhdGVPYnNlcnZhYmxlT3B0aW9ucyQkMShvcHRpb25zKTtcbiAgICAgICAgcmV0dXJuIGNyZWF0ZU9ic2VydmFibGVBcnJheSQkMShpbml0aWFsVmFsdWVzLCBnZXRFbmhhbmNlckZyb21PcHRpb25zKG8pLCBvLm5hbWUpO1xuICAgIH0sXG4gICAgbWFwOiBmdW5jdGlvbiAoaW5pdGlhbFZhbHVlcywgb3B0aW9ucykge1xuICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDIpXG4gICAgICAgICAgICBpbmNvcnJlY3RseVVzZWRBc0RlY29yYXRvcihcIm1hcFwiKTtcbiAgICAgICAgdmFyIG8gPSBhc0NyZWF0ZU9ic2VydmFibGVPcHRpb25zJCQxKG9wdGlvbnMpO1xuICAgICAgICByZXR1cm4gbmV3IE9ic2VydmFibGVNYXAkJDEoaW5pdGlhbFZhbHVlcywgZ2V0RW5oYW5jZXJGcm9tT3B0aW9ucyhvKSwgby5uYW1lKTtcbiAgICB9LFxuICAgIHNldDogZnVuY3Rpb24gKGluaXRpYWxWYWx1ZXMsIG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAyKVxuICAgICAgICAgICAgaW5jb3JyZWN0bHlVc2VkQXNEZWNvcmF0b3IoXCJzZXRcIik7XG4gICAgICAgIHZhciBvID0gYXNDcmVhdGVPYnNlcnZhYmxlT3B0aW9ucyQkMShvcHRpb25zKTtcbiAgICAgICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlU2V0JCQxKGluaXRpYWxWYWx1ZXMsIGdldEVuaGFuY2VyRnJvbU9wdGlvbnMobyksIG8ubmFtZSk7XG4gICAgfSxcbiAgICBvYmplY3Q6IGZ1bmN0aW9uIChwcm9wcywgZGVjb3JhdG9ycywgb3B0aW9ucykge1xuICAgICAgICBpZiAodHlwZW9mIGFyZ3VtZW50c1sxXSA9PT0gXCJzdHJpbmdcIilcbiAgICAgICAgICAgIGluY29ycmVjdGx5VXNlZEFzRGVjb3JhdG9yKFwib2JqZWN0XCIpO1xuICAgICAgICB2YXIgbyA9IGFzQ3JlYXRlT2JzZXJ2YWJsZU9wdGlvbnMkJDEob3B0aW9ucyk7XG4gICAgICAgIGlmIChvLnByb3h5ID09PSBmYWxzZSkge1xuICAgICAgICAgICAgcmV0dXJuIGV4dGVuZE9ic2VydmFibGUkJDEoe30sIHByb3BzLCBkZWNvcmF0b3JzLCBvKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHZhciBkZWZhdWx0RGVjb3JhdG9yID0gZ2V0RGVmYXVsdERlY29yYXRvckZyb21PYmplY3RPcHRpb25zJCQxKG8pO1xuICAgICAgICAgICAgdmFyIGJhc2UgPSBleHRlbmRPYnNlcnZhYmxlJCQxKHt9LCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgbyk7XG4gICAgICAgICAgICB2YXIgcHJveHkgPSBjcmVhdGVEeW5hbWljT2JzZXJ2YWJsZU9iamVjdCQkMShiYXNlKTtcbiAgICAgICAgICAgIGV4dGVuZE9ic2VydmFibGVPYmplY3RXaXRoUHJvcGVydGllcyQkMShwcm94eSwgcHJvcHMsIGRlY29yYXRvcnMsIGRlZmF1bHREZWNvcmF0b3IpO1xuICAgICAgICAgICAgcmV0dXJuIHByb3h5O1xuICAgICAgICB9XG4gICAgfSxcbiAgICByZWY6IHJlZkRlY29yYXRvciQkMSxcbiAgICBzaGFsbG93OiBzaGFsbG93RGVjb3JhdG9yLFxuICAgIGRlZXA6IGRlZXBEZWNvcmF0b3IkJDEsXG4gICAgc3RydWN0OiByZWZTdHJ1Y3REZWNvcmF0b3Jcbn07XG52YXIgb2JzZXJ2YWJsZSQkMSA9IGNyZWF0ZU9ic2VydmFibGU7XG4vLyB3ZWlyZCB0cmljayB0byBrZWVwIG91ciB0eXBpbmdzIG5pY2VseSB3aXRoIG91ciBmdW5jcywgYW5kIHN0aWxsIGV4dGVuZCB0aGUgb2JzZXJ2YWJsZSBmdW5jdGlvblxuT2JqZWN0LmtleXMob2JzZXJ2YWJsZUZhY3RvcmllcykuZm9yRWFjaChmdW5jdGlvbiAobmFtZSkgeyByZXR1cm4gKG9ic2VydmFibGUkJDFbbmFtZV0gPSBvYnNlcnZhYmxlRmFjdG9yaWVzW25hbWVdKTsgfSk7XG5mdW5jdGlvbiBpbmNvcnJlY3RseVVzZWRBc0RlY29yYXRvcihtZXRob2ROYW1lKSB7XG4gICAgZmFpbCQkMShcbiAgICAvLyBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgJiZcbiAgICBcIkV4cGVjdGVkIG9uZSBvciB0d28gYXJndW1lbnRzIHRvIG9ic2VydmFibGUuXCIgKyBtZXRob2ROYW1lICsgXCIuIERpZCB5b3UgYWNjaWRlbnRhbGx5IHRyeSB0byB1c2Ugb2JzZXJ2YWJsZS5cIiArIG1ldGhvZE5hbWUgKyBcIiBhcyBkZWNvcmF0b3I/XCIpO1xufVxuXG52YXIgY29tcHV0ZWREZWNvcmF0b3IkJDEgPSBjcmVhdGVQcm9wRGVjb3JhdG9yJCQxKGZhbHNlLCBmdW5jdGlvbiAoaW5zdGFuY2UsIHByb3BlcnR5TmFtZSwgZGVzY3JpcHRvciwgZGVjb3JhdG9yVGFyZ2V0LCBkZWNvcmF0b3JBcmdzKSB7XG4gICAgdmFyIGdldCQkMSA9IGRlc2NyaXB0b3IuZ2V0LCBzZXQkJDEgPSBkZXNjcmlwdG9yLnNldDsgLy8gaW5pdGlhbFZhbHVlIGlzIHRoZSBkZXNjcmlwdG9yIGZvciBnZXQgLyBzZXQgcHJvcHNcbiAgICAvLyBPcHRpbWl6YXRpb246IGZhc3RlciBvbiBkZWNvcmF0b3IgdGFyZ2V0IG9yIGluc3RhbmNlPyBBc3N1bWluZyB0YXJnZXRcbiAgICAvLyBPcHRpbWl6YXRpb246IGZpbmQgb3V0IGlmIGRlY2xhcmluZyBvbiBpbnN0YW5jZSBpc24ndCBqdXN0IGZhc3Rlci4gKGFsc28gbWFrZXMgdGhlIHByb3BlcnR5IGRlc2NyaXB0b3Igc2ltcGxlcikuIEJ1dCwgbW9yZSBtZW1vcnkgdXNhZ2UuLlxuICAgIC8vIEZvcmNpbmcgaW5zdGFuY2Ugbm93LCBmaXhlcyBob3QgcmVsb2FkaWcgaXNzdWVzIG9uIFJlYWN0IE5hdGl2ZTpcbiAgICB2YXIgb3B0aW9ucyA9IGRlY29yYXRvckFyZ3NbMF0gfHwge307XG4gICAgYXNPYnNlcnZhYmxlT2JqZWN0JCQxKGluc3RhbmNlKS5hZGRDb21wdXRlZFByb3AoaW5zdGFuY2UsIHByb3BlcnR5TmFtZSwgX19hc3NpZ24oeyBnZXQ6IGdldCQkMSxcbiAgICAgICAgc2V0OiBzZXQkJDEsIGNvbnRleHQ6IGluc3RhbmNlIH0sIG9wdGlvbnMpKTtcbn0pO1xudmFyIGNvbXB1dGVkU3RydWN0RGVjb3JhdG9yID0gY29tcHV0ZWREZWNvcmF0b3IkJDEoeyBlcXVhbHM6IGNvbXBhcmVyJCQxLnN0cnVjdHVyYWwgfSk7XG4vKipcbiAqIERlY29yYXRvciBmb3IgY2xhc3MgcHJvcGVydGllczogQGNvbXB1dGVkIGdldCB2YWx1ZSgpIHsgcmV0dXJuIGV4cHI7IH0uXG4gKiBGb3IgbGVnYWN5IHB1cnBvc2VzIGFsc28gaW52b2thYmxlIGFzIEVTNSBvYnNlcnZhYmxlIGNyZWF0ZWQ6IGBjb21wdXRlZCgoKSA9PiBleHByKWA7XG4gKi9cbnZhciBjb21wdXRlZCQkMSA9IGZ1bmN0aW9uIGNvbXB1dGVkJCQxKGFyZzEsIGFyZzIsIGFyZzMpIHtcbiAgICBpZiAodHlwZW9mIGFyZzIgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgLy8gQGNvbXB1dGVkXG4gICAgICAgIHJldHVybiBjb21wdXRlZERlY29yYXRvciQkMS5hcHBseShudWxsLCBhcmd1bWVudHMpO1xuICAgIH1cbiAgICBpZiAoYXJnMSAhPT0gbnVsbCAmJiB0eXBlb2YgYXJnMSA9PT0gXCJvYmplY3RcIiAmJiBhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIC8vIEBjb21wdXRlZCh7IG9wdGlvbnMgfSlcbiAgICAgICAgcmV0dXJuIGNvbXB1dGVkRGVjb3JhdG9yJCQxLmFwcGx5KG51bGwsIGFyZ3VtZW50cyk7XG4gICAgfVxuICAgIC8vIGNvbXB1dGVkKGV4cHIsIG9wdGlvbnM/KVxuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgICAgICAgaW52YXJpYW50JCQxKHR5cGVvZiBhcmcxID09PSBcImZ1bmN0aW9uXCIsIFwiRmlyc3QgYXJndW1lbnQgdG8gYGNvbXB1dGVkYCBzaG91bGQgYmUgYW4gZXhwcmVzc2lvbi5cIik7XG4gICAgICAgIGludmFyaWFudCQkMShhcmd1bWVudHMubGVuZ3RoIDwgMywgXCJDb21wdXRlZCB0YWtlcyBvbmUgb3IgdHdvIGFyZ3VtZW50cyBpZiB1c2VkIGFzIGZ1bmN0aW9uXCIpO1xuICAgIH1cbiAgICB2YXIgb3B0cyA9IHR5cGVvZiBhcmcyID09PSBcIm9iamVjdFwiID8gYXJnMiA6IHt9O1xuICAgIG9wdHMuZ2V0ID0gYXJnMTtcbiAgICBvcHRzLnNldCA9IHR5cGVvZiBhcmcyID09PSBcImZ1bmN0aW9uXCIgPyBhcmcyIDogb3B0cy5zZXQ7XG4gICAgb3B0cy5uYW1lID0gb3B0cy5uYW1lIHx8IGFyZzEubmFtZSB8fCBcIlwiOyAvKiBmb3IgZ2VuZXJhdGVkIG5hbWUgKi9cbiAgICByZXR1cm4gbmV3IENvbXB1dGVkVmFsdWUkJDEob3B0cyk7XG59O1xuY29tcHV0ZWQkJDEuc3RydWN0ID0gY29tcHV0ZWRTdHJ1Y3REZWNvcmF0b3I7XG5cbmZ1bmN0aW9uIGNyZWF0ZUFjdGlvbiQkMShhY3Rpb25OYW1lLCBmbiwgcmVmKSB7XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xuICAgICAgICBpbnZhcmlhbnQkJDEodHlwZW9mIGZuID09PSBcImZ1bmN0aW9uXCIsIFwiYGFjdGlvbmAgY2FuIG9ubHkgYmUgaW52b2tlZCBvbiBmdW5jdGlvbnNcIik7XG4gICAgICAgIGlmICh0eXBlb2YgYWN0aW9uTmFtZSAhPT0gXCJzdHJpbmdcIiB8fCAhYWN0aW9uTmFtZSlcbiAgICAgICAgICAgIGZhaWwkJDEoXCJhY3Rpb25zIHNob3VsZCBoYXZlIHZhbGlkIG5hbWVzLCBnb3Q6ICdcIiArIGFjdGlvbk5hbWUgKyBcIidcIik7XG4gICAgfVxuICAgIHZhciByZXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBleGVjdXRlQWN0aW9uJCQxKGFjdGlvbk5hbWUsIGZuLCByZWYgfHwgdGhpcywgYXJndW1lbnRzKTtcbiAgICB9O1xuICAgIHJlcy5pc01vYnhBY3Rpb24gPSB0cnVlO1xuICAgIHJldHVybiByZXM7XG59XG5mdW5jdGlvbiBleGVjdXRlQWN0aW9uJCQxKGFjdGlvbk5hbWUsIGZuLCBzY29wZSwgYXJncykge1xuICAgIHZhciBydW5JbmZvID0gc3RhcnRBY3Rpb24oYWN0aW9uTmFtZSwgZm4sIHNjb3BlLCBhcmdzKTtcbiAgICB2YXIgc2hvdWxkU3VwcmVzc1JlYWN0aW9uRXJyb3IgPSB0cnVlO1xuICAgIHRyeSB7XG4gICAgICAgIHZhciByZXMgPSBmbi5hcHBseShzY29wZSwgYXJncyk7XG4gICAgICAgIHNob3VsZFN1cHJlc3NSZWFjdGlvbkVycm9yID0gZmFsc2U7XG4gICAgICAgIHJldHVybiByZXM7XG4gICAgfVxuICAgIGZpbmFsbHkge1xuICAgICAgICBpZiAoc2hvdWxkU3VwcmVzc1JlYWN0aW9uRXJyb3IpIHtcbiAgICAgICAgICAgIGdsb2JhbFN0YXRlJCQxLnN1cHByZXNzUmVhY3Rpb25FcnJvcnMgPSBzaG91bGRTdXByZXNzUmVhY3Rpb25FcnJvcjtcbiAgICAgICAgICAgIGVuZEFjdGlvbihydW5JbmZvKTtcbiAgICAgICAgICAgIGdsb2JhbFN0YXRlJCQxLnN1cHByZXNzUmVhY3Rpb25FcnJvcnMgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGVuZEFjdGlvbihydW5JbmZvKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmZ1bmN0aW9uIHN0YXJ0QWN0aW9uKGFjdGlvbk5hbWUsIGZuLCBzY29wZSwgYXJncykge1xuICAgIHZhciBub3RpZnlTcHkgPSBpc1NweUVuYWJsZWQkJDEoKSAmJiAhIWFjdGlvbk5hbWU7XG4gICAgdmFyIHN0YXJ0VGltZSA9IDA7XG4gICAgaWYgKG5vdGlmeVNweSAmJiBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgICAgICAgc3RhcnRUaW1lID0gRGF0ZS5ub3coKTtcbiAgICAgICAgdmFyIGwgPSAoYXJncyAmJiBhcmdzLmxlbmd0aCkgfHwgMDtcbiAgICAgICAgdmFyIGZsYXR0ZW5kQXJncyA9IG5ldyBBcnJheShsKTtcbiAgICAgICAgaWYgKGwgPiAwKVxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsOyBpKyspXG4gICAgICAgICAgICAgICAgZmxhdHRlbmRBcmdzW2ldID0gYXJnc1tpXTtcbiAgICAgICAgc3B5UmVwb3J0U3RhcnQkJDEoe1xuICAgICAgICAgICAgdHlwZTogXCJhY3Rpb25cIixcbiAgICAgICAgICAgIG5hbWU6IGFjdGlvbk5hbWUsXG4gICAgICAgICAgICBvYmplY3Q6IHNjb3BlLFxuICAgICAgICAgICAgYXJndW1lbnRzOiBmbGF0dGVuZEFyZ3NcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHZhciBwcmV2RGVyaXZhdGlvbiA9IHVudHJhY2tlZFN0YXJ0JCQxKCk7XG4gICAgc3RhcnRCYXRjaCQkMSgpO1xuICAgIHZhciBwcmV2QWxsb3dTdGF0ZUNoYW5nZXMgPSBhbGxvd1N0YXRlQ2hhbmdlc1N0YXJ0JCQxKHRydWUpO1xuICAgIHJldHVybiB7XG4gICAgICAgIHByZXZEZXJpdmF0aW9uOiBwcmV2RGVyaXZhdGlvbixcbiAgICAgICAgcHJldkFsbG93U3RhdGVDaGFuZ2VzOiBwcmV2QWxsb3dTdGF0ZUNoYW5nZXMsXG4gICAgICAgIG5vdGlmeVNweTogbm90aWZ5U3B5LFxuICAgICAgICBzdGFydFRpbWU6IHN0YXJ0VGltZVxuICAgIH07XG59XG5mdW5jdGlvbiBlbmRBY3Rpb24ocnVuSW5mbykge1xuICAgIGFsbG93U3RhdGVDaGFuZ2VzRW5kJCQxKHJ1bkluZm8ucHJldkFsbG93U3RhdGVDaGFuZ2VzKTtcbiAgICBlbmRCYXRjaCQkMSgpO1xuICAgIHVudHJhY2tlZEVuZCQkMShydW5JbmZvLnByZXZEZXJpdmF0aW9uKTtcbiAgICBpZiAocnVuSW5mby5ub3RpZnlTcHkgJiYgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKVxuICAgICAgICBzcHlSZXBvcnRFbmQkJDEoeyB0aW1lOiBEYXRlLm5vdygpIC0gcnVuSW5mby5zdGFydFRpbWUgfSk7XG59XG5mdW5jdGlvbiBhbGxvd1N0YXRlQ2hhbmdlcyQkMShhbGxvd1N0YXRlQ2hhbmdlcyQkMSwgZnVuYykge1xuICAgIHZhciBwcmV2ID0gYWxsb3dTdGF0ZUNoYW5nZXNTdGFydCQkMShhbGxvd1N0YXRlQ2hhbmdlcyQkMSk7XG4gICAgdmFyIHJlcztcbiAgICB0cnkge1xuICAgICAgICByZXMgPSBmdW5jKCk7XG4gICAgfVxuICAgIGZpbmFsbHkge1xuICAgICAgICBhbGxvd1N0YXRlQ2hhbmdlc0VuZCQkMShwcmV2KTtcbiAgICB9XG4gICAgcmV0dXJuIHJlcztcbn1cbmZ1bmN0aW9uIGFsbG93U3RhdGVDaGFuZ2VzU3RhcnQkJDEoYWxsb3dTdGF0ZUNoYW5nZXMkJDEpIHtcbiAgICB2YXIgcHJldiA9IGdsb2JhbFN0YXRlJCQxLmFsbG93U3RhdGVDaGFuZ2VzO1xuICAgIGdsb2JhbFN0YXRlJCQxLmFsbG93U3RhdGVDaGFuZ2VzID0gYWxsb3dTdGF0ZUNoYW5nZXMkJDE7XG4gICAgcmV0dXJuIHByZXY7XG59XG5mdW5jdGlvbiBhbGxvd1N0YXRlQ2hhbmdlc0VuZCQkMShwcmV2KSB7XG4gICAgZ2xvYmFsU3RhdGUkJDEuYWxsb3dTdGF0ZUNoYW5nZXMgPSBwcmV2O1xufVxuZnVuY3Rpb24gYWxsb3dTdGF0ZUNoYW5nZXNJbnNpZGVDb21wdXRlZCQkMShmdW5jKSB7XG4gICAgdmFyIHByZXYgPSBnbG9iYWxTdGF0ZSQkMS5jb21wdXRhdGlvbkRlcHRoO1xuICAgIGdsb2JhbFN0YXRlJCQxLmNvbXB1dGF0aW9uRGVwdGggPSAwO1xuICAgIHZhciByZXM7XG4gICAgdHJ5IHtcbiAgICAgICAgcmVzID0gZnVuYygpO1xuICAgIH1cbiAgICBmaW5hbGx5IHtcbiAgICAgICAgZ2xvYmFsU3RhdGUkJDEuY29tcHV0YXRpb25EZXB0aCA9IHByZXY7XG4gICAgfVxuICAgIHJldHVybiByZXM7XG59XG5cbnZhciBPYnNlcnZhYmxlVmFsdWUkJDEgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKE9ic2VydmFibGVWYWx1ZSQkMSwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBPYnNlcnZhYmxlVmFsdWUkJDEodmFsdWUsIGVuaGFuY2VyLCBuYW1lLCBub3RpZnlTcHksIGVxdWFscykge1xuICAgICAgICBpZiAobmFtZSA9PT0gdm9pZCAwKSB7IG5hbWUgPSBcIk9ic2VydmFibGVWYWx1ZUBcIiArIGdldE5leHRJZCQkMSgpOyB9XG4gICAgICAgIGlmIChub3RpZnlTcHkgPT09IHZvaWQgMCkgeyBub3RpZnlTcHkgPSB0cnVlOyB9XG4gICAgICAgIGlmIChlcXVhbHMgPT09IHZvaWQgMCkgeyBlcXVhbHMgPSBjb21wYXJlciQkMS5kZWZhdWx0OyB9XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIG5hbWUpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLmVuaGFuY2VyID0gZW5oYW5jZXI7XG4gICAgICAgIF90aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICBfdGhpcy5lcXVhbHMgPSBlcXVhbHM7XG4gICAgICAgIF90aGlzLmhhc1VucmVwb3J0ZWRDaGFuZ2UgPSBmYWxzZTtcbiAgICAgICAgX3RoaXMudmFsdWUgPSBlbmhhbmNlcih2YWx1ZSwgdW5kZWZpbmVkLCBuYW1lKTtcbiAgICAgICAgaWYgKG5vdGlmeVNweSAmJiBpc1NweUVuYWJsZWQkJDEoKSAmJiBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgICAgICAgICAgIC8vIG9ubHkgbm90aWZ5IHNweSBpZiB0aGlzIGlzIGEgc3RhbmQtYWxvbmUgb2JzZXJ2YWJsZVxuICAgICAgICAgICAgc3B5UmVwb3J0JCQxKHsgdHlwZTogXCJjcmVhdGVcIiwgbmFtZTogX3RoaXMubmFtZSwgbmV3VmFsdWU6IFwiXCIgKyBfdGhpcy52YWx1ZSB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIE9ic2VydmFibGVWYWx1ZSQkMS5wcm90b3R5cGUuZGVoYW5jZVZhbHVlID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIGlmICh0aGlzLmRlaGFuY2VyICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kZWhhbmNlcih2YWx1ZSk7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9O1xuICAgIE9ic2VydmFibGVWYWx1ZSQkMS5wcm90b3R5cGUuc2V0ID0gZnVuY3Rpb24gKG5ld1ZhbHVlKSB7XG4gICAgICAgIHZhciBvbGRWYWx1ZSA9IHRoaXMudmFsdWU7XG4gICAgICAgIG5ld1ZhbHVlID0gdGhpcy5wcmVwYXJlTmV3VmFsdWUobmV3VmFsdWUpO1xuICAgICAgICBpZiAobmV3VmFsdWUgIT09IGdsb2JhbFN0YXRlJCQxLlVOQ0hBTkdFRCkge1xuICAgICAgICAgICAgdmFyIG5vdGlmeVNweSA9IGlzU3B5RW5hYmxlZCQkMSgpO1xuICAgICAgICAgICAgaWYgKG5vdGlmeVNweSAmJiBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgICAgICAgICAgICAgICBzcHlSZXBvcnRTdGFydCQkMSh7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwidXBkYXRlXCIsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IHRoaXMubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgbmV3VmFsdWU6IG5ld1ZhbHVlLFxuICAgICAgICAgICAgICAgICAgICBvbGRWYWx1ZTogb2xkVmFsdWVcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuc2V0TmV3VmFsdWUobmV3VmFsdWUpO1xuICAgICAgICAgICAgaWYgKG5vdGlmeVNweSAmJiBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpXG4gICAgICAgICAgICAgICAgc3B5UmVwb3J0RW5kJCQxKCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIE9ic2VydmFibGVWYWx1ZSQkMS5wcm90b3R5cGUucHJlcGFyZU5ld1ZhbHVlID0gZnVuY3Rpb24gKG5ld1ZhbHVlKSB7XG4gICAgICAgIGNoZWNrSWZTdGF0ZU1vZGlmaWNhdGlvbnNBcmVBbGxvd2VkJCQxKHRoaXMpO1xuICAgICAgICBpZiAoaGFzSW50ZXJjZXB0b3JzJCQxKHRoaXMpKSB7XG4gICAgICAgICAgICB2YXIgY2hhbmdlID0gaW50ZXJjZXB0Q2hhbmdlJCQxKHRoaXMsIHtcbiAgICAgICAgICAgICAgICBvYmplY3Q6IHRoaXMsXG4gICAgICAgICAgICAgICAgdHlwZTogXCJ1cGRhdGVcIixcbiAgICAgICAgICAgICAgICBuZXdWYWx1ZTogbmV3VmFsdWVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKCFjaGFuZ2UpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGdsb2JhbFN0YXRlJCQxLlVOQ0hBTkdFRDtcbiAgICAgICAgICAgIG5ld1ZhbHVlID0gY2hhbmdlLm5ld1ZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIC8vIGFwcGx5IG1vZGlmaWVyXG4gICAgICAgIG5ld1ZhbHVlID0gdGhpcy5lbmhhbmNlcihuZXdWYWx1ZSwgdGhpcy52YWx1ZSwgdGhpcy5uYW1lKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZXF1YWxzKHRoaXMudmFsdWUsIG5ld1ZhbHVlKSA/IGdsb2JhbFN0YXRlJCQxLlVOQ0hBTkdFRCA6IG5ld1ZhbHVlO1xuICAgIH07XG4gICAgT2JzZXJ2YWJsZVZhbHVlJCQxLnByb3RvdHlwZS5zZXROZXdWYWx1ZSA9IGZ1bmN0aW9uIChuZXdWYWx1ZSkge1xuICAgICAgICB2YXIgb2xkVmFsdWUgPSB0aGlzLnZhbHVlO1xuICAgICAgICB0aGlzLnZhbHVlID0gbmV3VmFsdWU7XG4gICAgICAgIHRoaXMucmVwb3J0Q2hhbmdlZCgpO1xuICAgICAgICBpZiAoaGFzTGlzdGVuZXJzJCQxKHRoaXMpKSB7XG4gICAgICAgICAgICBub3RpZnlMaXN0ZW5lcnMkJDEodGhpcywge1xuICAgICAgICAgICAgICAgIHR5cGU6IFwidXBkYXRlXCIsXG4gICAgICAgICAgICAgICAgb2JqZWN0OiB0aGlzLFxuICAgICAgICAgICAgICAgIG5ld1ZhbHVlOiBuZXdWYWx1ZSxcbiAgICAgICAgICAgICAgICBvbGRWYWx1ZTogb2xkVmFsdWVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBPYnNlcnZhYmxlVmFsdWUkJDEucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5yZXBvcnRPYnNlcnZlZCgpO1xuICAgICAgICByZXR1cm4gdGhpcy5kZWhhbmNlVmFsdWUodGhpcy52YWx1ZSk7XG4gICAgfTtcbiAgICBPYnNlcnZhYmxlVmFsdWUkJDEucHJvdG90eXBlLmludGVyY2VwdCA9IGZ1bmN0aW9uIChoYW5kbGVyKSB7XG4gICAgICAgIHJldHVybiByZWdpc3RlckludGVyY2VwdG9yJCQxKHRoaXMsIGhhbmRsZXIpO1xuICAgIH07XG4gICAgT2JzZXJ2YWJsZVZhbHVlJCQxLnByb3RvdHlwZS5vYnNlcnZlID0gZnVuY3Rpb24gKGxpc3RlbmVyLCBmaXJlSW1tZWRpYXRlbHkpIHtcbiAgICAgICAgaWYgKGZpcmVJbW1lZGlhdGVseSlcbiAgICAgICAgICAgIGxpc3RlbmVyKHtcbiAgICAgICAgICAgICAgICBvYmplY3Q6IHRoaXMsXG4gICAgICAgICAgICAgICAgdHlwZTogXCJ1cGRhdGVcIixcbiAgICAgICAgICAgICAgICBuZXdWYWx1ZTogdGhpcy52YWx1ZSxcbiAgICAgICAgICAgICAgICBvbGRWYWx1ZTogdW5kZWZpbmVkXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHJlZ2lzdGVyTGlzdGVuZXIkJDEodGhpcywgbGlzdGVuZXIpO1xuICAgIH07XG4gICAgT2JzZXJ2YWJsZVZhbHVlJCQxLnByb3RvdHlwZS50b0pTT04gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldCgpO1xuICAgIH07XG4gICAgT2JzZXJ2YWJsZVZhbHVlJCQxLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubmFtZSArIFwiW1wiICsgdGhpcy52YWx1ZSArIFwiXVwiO1xuICAgIH07XG4gICAgT2JzZXJ2YWJsZVZhbHVlJCQxLnByb3RvdHlwZS52YWx1ZU9mID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdG9QcmltaXRpdmUkJDEodGhpcy5nZXQoKSk7XG4gICAgfTtcbiAgICBPYnNlcnZhYmxlVmFsdWUkJDEucHJvdG90eXBlW1N5bWJvbC50b1ByaW1pdGl2ZV0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnZhbHVlT2YoKTtcbiAgICB9O1xuICAgIHJldHVybiBPYnNlcnZhYmxlVmFsdWUkJDE7XG59KEF0b20kJDEpKTtcbnZhciBpc09ic2VydmFibGVWYWx1ZSQkMSA9IGNyZWF0ZUluc3RhbmNlb2ZQcmVkaWNhdGUkJDEoXCJPYnNlcnZhYmxlVmFsdWVcIiwgT2JzZXJ2YWJsZVZhbHVlJCQxKTtcblxuLyoqXG4gKiBBIG5vZGUgaW4gdGhlIHN0YXRlIGRlcGVuZGVuY3kgcm9vdCB0aGF0IG9ic2VydmVzIG90aGVyIG5vZGVzLCBhbmQgY2FuIGJlIG9ic2VydmVkIGl0c2VsZi5cbiAqXG4gKiBDb21wdXRlZFZhbHVlIHdpbGwgcmVtZW1iZXIgdGhlIHJlc3VsdCBvZiB0aGUgY29tcHV0YXRpb24gZm9yIHRoZSBkdXJhdGlvbiBvZiB0aGUgYmF0Y2gsIG9yXG4gKiB3aGlsZSBiZWluZyBvYnNlcnZlZC5cbiAqXG4gKiBEdXJpbmcgdGhpcyB0aW1lIGl0IHdpbGwgcmVjb21wdXRlIG9ubHkgd2hlbiBvbmUgb2YgaXRzIGRpcmVjdCBkZXBlbmRlbmNpZXMgY2hhbmdlZCxcbiAqIGJ1dCBvbmx5IHdoZW4gaXQgaXMgYmVpbmcgYWNjZXNzZWQgd2l0aCBgQ29tcHV0ZWRWYWx1ZS5nZXQoKWAuXG4gKlxuICogSW1wbGVtZW50YXRpb24gZGVzY3JpcHRpb246XG4gKiAxLiBGaXJzdCB0aW1lIGl0J3MgYmVpbmcgYWNjZXNzZWQgaXQgd2lsbCBjb21wdXRlIGFuZCByZW1lbWJlciByZXN1bHRcbiAqICAgIGdpdmUgYmFjayByZW1lbWJlcmVkIHJlc3VsdCB1bnRpbCAyLiBoYXBwZW5zXG4gKiAyLiBGaXJzdCB0aW1lIGFueSBkZWVwIGRlcGVuZGVuY3kgY2hhbmdlLCBwcm9wYWdhdGUgUE9TU0lCTFlfU1RBTEUgdG8gYWxsIG9ic2VydmVycywgd2FpdCBmb3IgMy5cbiAqIDMuIFdoZW4gaXQncyBiZWluZyBhY2Nlc3NlZCwgcmVjb21wdXRlIGlmIGFueSBzaGFsbG93IGRlcGVuZGVuY3kgY2hhbmdlZC5cbiAqICAgIGlmIHJlc3VsdCBjaGFuZ2VkOiBwcm9wYWdhdGUgU1RBTEUgdG8gYWxsIG9ic2VydmVycywgdGhhdCB3ZXJlIFBPU1NJQkxZX1NUQUxFIGZyb20gdGhlIGxhc3Qgc3RlcC5cbiAqICAgIGdvIHRvIHN0ZXAgMi4gZWl0aGVyIHdheVxuICpcbiAqIElmIGF0IGFueSBwb2ludCBpdCdzIG91dHNpZGUgYmF0Y2ggYW5kIGl0IGlzbid0IG9ic2VydmVkOiByZXNldCBldmVyeXRoaW5nIGFuZCBnbyB0byAxLlxuICovXG52YXIgQ29tcHV0ZWRWYWx1ZSQkMSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSBuZXcgY29tcHV0ZWQgdmFsdWUgYmFzZWQgb24gYSBmdW5jdGlvbiBleHByZXNzaW9uLlxuICAgICAqXG4gICAgICogVGhlIGBuYW1lYCBwcm9wZXJ0eSBpcyBmb3IgZGVidWcgcHVycG9zZXMgb25seS5cbiAgICAgKlxuICAgICAqIFRoZSBgZXF1YWxzYCBwcm9wZXJ0eSBzcGVjaWZpZXMgdGhlIGNvbXBhcmVyIGZ1bmN0aW9uIHRvIHVzZSB0byBkZXRlcm1pbmUgaWYgYSBuZXdseSBwcm9kdWNlZFxuICAgICAqIHZhbHVlIGRpZmZlcnMgZnJvbSB0aGUgcHJldmlvdXMgdmFsdWUuIFR3byBjb21wYXJlcnMgYXJlIHByb3ZpZGVkIGluIHRoZSBsaWJyYXJ5OyBgZGVmYXVsdENvbXBhcmVyYFxuICAgICAqIGNvbXBhcmVzIGJhc2VkIG9uIGlkZW50aXR5IGNvbXBhcmlzb24gKD09PSksIGFuZCBgc3RydWN0dWFsQ29tcGFyZXJgIGRlZXBseSBjb21wYXJlcyB0aGUgc3RydWN0dXJlLlxuICAgICAqIFN0cnVjdHVyYWwgY29tcGFyaXNvbiBjYW4gYmUgY29udmVuaWVudCBpZiB5b3UgYWx3YXlzIHByb2R1Y2UgYSBuZXcgYWdncmVnYXRlZCBvYmplY3QgYW5kXG4gICAgICogZG9uJ3Qgd2FudCB0byBub3RpZnkgb2JzZXJ2ZXJzIGlmIGl0IGlzIHN0cnVjdHVyYWxseSB0aGUgc2FtZS5cbiAgICAgKiBUaGlzIGlzIHVzZWZ1bCBmb3Igd29ya2luZyB3aXRoIHZlY3RvcnMsIG1vdXNlIGNvb3JkaW5hdGVzIGV0Yy5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBDb21wdXRlZFZhbHVlJCQxKG9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5kZXBlbmRlbmNpZXNTdGF0ZSA9IElEZXJpdmF0aW9uU3RhdGUuTk9UX1RSQUNLSU5HO1xuICAgICAgICB0aGlzLm9ic2VydmluZyA9IFtdOyAvLyBub2RlcyB3ZSBhcmUgbG9va2luZyBhdC4gT3VyIHZhbHVlIGRlcGVuZHMgb24gdGhlc2Ugbm9kZXNcbiAgICAgICAgdGhpcy5uZXdPYnNlcnZpbmcgPSBudWxsOyAvLyBkdXJpbmcgdHJhY2tpbmcgaXQncyBhbiBhcnJheSB3aXRoIG5ldyBvYnNlcnZlZCBvYnNlcnZlcnNcbiAgICAgICAgdGhpcy5pc0JlaW5nT2JzZXJ2ZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc1BlbmRpbmdVbm9ic2VydmF0aW9uID0gZmFsc2U7XG4gICAgICAgIHRoaXMub2JzZXJ2ZXJzID0gbmV3IFNldCgpO1xuICAgICAgICB0aGlzLmRpZmZWYWx1ZSA9IDA7XG4gICAgICAgIHRoaXMucnVuSWQgPSAwO1xuICAgICAgICB0aGlzLmxhc3RBY2Nlc3NlZEJ5ID0gMDtcbiAgICAgICAgdGhpcy5sb3dlc3RPYnNlcnZlclN0YXRlID0gSURlcml2YXRpb25TdGF0ZS5VUF9UT19EQVRFO1xuICAgICAgICB0aGlzLnVuYm91bmREZXBzQ291bnQgPSAwO1xuICAgICAgICB0aGlzLl9fbWFwaWQgPSBcIiNcIiArIGdldE5leHRJZCQkMSgpO1xuICAgICAgICB0aGlzLnZhbHVlID0gbmV3IENhdWdodEV4Y2VwdGlvbiQkMShudWxsKTtcbiAgICAgICAgdGhpcy5pc0NvbXB1dGluZyA9IGZhbHNlOyAvLyB0byBjaGVjayBmb3IgY3ljbGVzXG4gICAgICAgIHRoaXMuaXNSdW5uaW5nU2V0dGVyID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaXNUcmFjaW5nID0gVHJhY2VNb2RlJCQxLk5PTkU7XG4gICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgJiYgIW9wdGlvbnMuZ2V0KVxuICAgICAgICAgICAgdGhyb3cgXCJbbW9ieF0gbWlzc2luZyBvcHRpb24gZm9yIGNvbXB1dGVkOiBnZXRcIjtcbiAgICAgICAgdGhpcy5kZXJpdmF0aW9uID0gb3B0aW9ucy5nZXQ7XG4gICAgICAgIHRoaXMubmFtZSA9IG9wdGlvbnMubmFtZSB8fCBcIkNvbXB1dGVkVmFsdWVAXCIgKyBnZXROZXh0SWQkJDEoKTtcbiAgICAgICAgaWYgKG9wdGlvbnMuc2V0KVxuICAgICAgICAgICAgdGhpcy5zZXR0ZXIgPSBjcmVhdGVBY3Rpb24kJDEodGhpcy5uYW1lICsgXCItc2V0dGVyXCIsIG9wdGlvbnMuc2V0KTtcbiAgICAgICAgdGhpcy5lcXVhbHMgPVxuICAgICAgICAgICAgb3B0aW9ucy5lcXVhbHMgfHxcbiAgICAgICAgICAgICAgICAob3B0aW9ucy5jb21wYXJlU3RydWN0dXJhbCB8fCBvcHRpb25zLnN0cnVjdFxuICAgICAgICAgICAgICAgICAgICA/IGNvbXBhcmVyJCQxLnN0cnVjdHVyYWxcbiAgICAgICAgICAgICAgICAgICAgOiBjb21wYXJlciQkMS5kZWZhdWx0KTtcbiAgICAgICAgdGhpcy5zY29wZSA9IG9wdGlvbnMuY29udGV4dDtcbiAgICAgICAgdGhpcy5yZXF1aXJlc1JlYWN0aW9uID0gISFvcHRpb25zLnJlcXVpcmVzUmVhY3Rpb247XG4gICAgICAgIHRoaXMua2VlcEFsaXZlID0gISFvcHRpb25zLmtlZXBBbGl2ZTtcbiAgICB9XG4gICAgQ29tcHV0ZWRWYWx1ZSQkMS5wcm90b3R5cGUub25CZWNvbWVTdGFsZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcHJvcGFnYXRlTWF5YmVDaGFuZ2VkJCQxKHRoaXMpO1xuICAgIH07XG4gICAgQ29tcHV0ZWRWYWx1ZSQkMS5wcm90b3R5cGUub25CZWNvbWVPYnNlcnZlZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMub25CZWNvbWVPYnNlcnZlZExpc3RlbmVycykge1xuICAgICAgICAgICAgdGhpcy5vbkJlY29tZU9ic2VydmVkTGlzdGVuZXJzLmZvckVhY2goZnVuY3Rpb24gKGxpc3RlbmVyKSB7IHJldHVybiBsaXN0ZW5lcigpOyB9KTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgQ29tcHV0ZWRWYWx1ZSQkMS5wcm90b3R5cGUub25CZWNvbWVVbm9ic2VydmVkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5vbkJlY29tZVVub2JzZXJ2ZWRMaXN0ZW5lcnMpIHtcbiAgICAgICAgICAgIHRoaXMub25CZWNvbWVVbm9ic2VydmVkTGlzdGVuZXJzLmZvckVhY2goZnVuY3Rpb24gKGxpc3RlbmVyKSB7IHJldHVybiBsaXN0ZW5lcigpOyB9KTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgY3VycmVudCB2YWx1ZSBvZiB0aGlzIGNvbXB1dGVkIHZhbHVlLlxuICAgICAqIFdpbGwgZXZhbHVhdGUgaXRzIGNvbXB1dGF0aW9uIGZpcnN0IGlmIG5lZWRlZC5cbiAgICAgKi9cbiAgICBDb21wdXRlZFZhbHVlJCQxLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLmlzQ29tcHV0aW5nKVxuICAgICAgICAgICAgZmFpbCQkMShcIkN5Y2xlIGRldGVjdGVkIGluIGNvbXB1dGF0aW9uIFwiICsgdGhpcy5uYW1lICsgXCI6IFwiICsgdGhpcy5kZXJpdmF0aW9uKTtcbiAgICAgICAgaWYgKGdsb2JhbFN0YXRlJCQxLmluQmF0Y2ggPT09IDAgJiYgdGhpcy5vYnNlcnZlcnMuc2l6ZSA9PT0gMCAmJiAhdGhpcy5rZWVwQWxpdmUpIHtcbiAgICAgICAgICAgIGlmIChzaG91bGRDb21wdXRlJCQxKHRoaXMpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy53YXJuQWJvdXRVbnRyYWNrZWRSZWFkKCk7XG4gICAgICAgICAgICAgICAgc3RhcnRCYXRjaCQkMSgpOyAvLyBTZWUgcGVyZiB0ZXN0ICdjb21wdXRlZCBtZW1vaXphdGlvbidcbiAgICAgICAgICAgICAgICB0aGlzLnZhbHVlID0gdGhpcy5jb21wdXRlVmFsdWUoZmFsc2UpO1xuICAgICAgICAgICAgICAgIGVuZEJhdGNoJCQxKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXBvcnRPYnNlcnZlZCQkMSh0aGlzKTtcbiAgICAgICAgICAgIGlmIChzaG91bGRDb21wdXRlJCQxKHRoaXMpKVxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnRyYWNrQW5kQ29tcHV0ZSgpKVxuICAgICAgICAgICAgICAgICAgICBwcm9wYWdhdGVDaGFuZ2VDb25maXJtZWQkJDEodGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHJlc3VsdCA9IHRoaXMudmFsdWU7XG4gICAgICAgIGlmIChpc0NhdWdodEV4Y2VwdGlvbiQkMShyZXN1bHQpKVxuICAgICAgICAgICAgdGhyb3cgcmVzdWx0LmNhdXNlO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH07XG4gICAgQ29tcHV0ZWRWYWx1ZSQkMS5wcm90b3R5cGUucGVlayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHJlcyA9IHRoaXMuY29tcHV0ZVZhbHVlKGZhbHNlKTtcbiAgICAgICAgaWYgKGlzQ2F1Z2h0RXhjZXB0aW9uJCQxKHJlcykpXG4gICAgICAgICAgICB0aHJvdyByZXMuY2F1c2U7XG4gICAgICAgIHJldHVybiByZXM7XG4gICAgfTtcbiAgICBDb21wdXRlZFZhbHVlJCQxLnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgaWYgKHRoaXMuc2V0dGVyKSB7XG4gICAgICAgICAgICBpbnZhcmlhbnQkJDEoIXRoaXMuaXNSdW5uaW5nU2V0dGVyLCBcIlRoZSBzZXR0ZXIgb2YgY29tcHV0ZWQgdmFsdWUgJ1wiICsgdGhpcy5uYW1lICsgXCInIGlzIHRyeWluZyB0byB1cGRhdGUgaXRzZWxmLiBEaWQgeW91IGludGVuZCB0byB1cGRhdGUgYW4gX29ic2VydmFibGVfIHZhbHVlLCBpbnN0ZWFkIG9mIHRoZSBjb21wdXRlZCBwcm9wZXJ0eT9cIik7XG4gICAgICAgICAgICB0aGlzLmlzUnVubmluZ1NldHRlciA9IHRydWU7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0dGVyLmNhbGwodGhpcy5zY29wZSwgdmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pc1J1bm5pbmdTZXR0ZXIgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgICAgICBpbnZhcmlhbnQkJDEoZmFsc2UsIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiAmJlxuICAgICAgICAgICAgICAgIFwiW0NvbXB1dGVkVmFsdWUgJ1wiICsgdGhpcy5uYW1lICsgXCInXSBJdCBpcyBub3QgcG9zc2libGUgdG8gYXNzaWduIGEgbmV3IHZhbHVlIHRvIGEgY29tcHV0ZWQgdmFsdWUuXCIpO1xuICAgIH07XG4gICAgQ29tcHV0ZWRWYWx1ZSQkMS5wcm90b3R5cGUudHJhY2tBbmRDb21wdXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoaXNTcHlFbmFibGVkJCQxKCkgJiYgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gICAgICAgICAgICBzcHlSZXBvcnQkJDEoe1xuICAgICAgICAgICAgICAgIG9iamVjdDogdGhpcy5zY29wZSxcbiAgICAgICAgICAgICAgICB0eXBlOiBcImNvbXB1dGVcIixcbiAgICAgICAgICAgICAgICBuYW1lOiB0aGlzLm5hbWVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHZhciBvbGRWYWx1ZSA9IHRoaXMudmFsdWU7XG4gICAgICAgIHZhciB3YXNTdXNwZW5kZWQgPSBcbiAgICAgICAgLyogc2VlICMxMjA4ICovIHRoaXMuZGVwZW5kZW5jaWVzU3RhdGUgPT09IElEZXJpdmF0aW9uU3RhdGUuTk9UX1RSQUNLSU5HO1xuICAgICAgICB2YXIgbmV3VmFsdWUgPSB0aGlzLmNvbXB1dGVWYWx1ZSh0cnVlKTtcbiAgICAgICAgdmFyIGNoYW5nZWQgPSB3YXNTdXNwZW5kZWQgfHxcbiAgICAgICAgICAgIGlzQ2F1Z2h0RXhjZXB0aW9uJCQxKG9sZFZhbHVlKSB8fFxuICAgICAgICAgICAgaXNDYXVnaHRFeGNlcHRpb24kJDEobmV3VmFsdWUpIHx8XG4gICAgICAgICAgICAhdGhpcy5lcXVhbHMob2xkVmFsdWUsIG5ld1ZhbHVlKTtcbiAgICAgICAgaWYgKGNoYW5nZWQpIHtcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSBuZXdWYWx1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY2hhbmdlZDtcbiAgICB9O1xuICAgIENvbXB1dGVkVmFsdWUkJDEucHJvdG90eXBlLmNvbXB1dGVWYWx1ZSA9IGZ1bmN0aW9uICh0cmFjaykge1xuICAgICAgICB0aGlzLmlzQ29tcHV0aW5nID0gdHJ1ZTtcbiAgICAgICAgZ2xvYmFsU3RhdGUkJDEuY29tcHV0YXRpb25EZXB0aCsrO1xuICAgICAgICB2YXIgcmVzO1xuICAgICAgICBpZiAodHJhY2spIHtcbiAgICAgICAgICAgIHJlcyA9IHRyYWNrRGVyaXZlZEZ1bmN0aW9uJCQxKHRoaXMsIHRoaXMuZGVyaXZhdGlvbiwgdGhpcy5zY29wZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAoZ2xvYmFsU3RhdGUkJDEuZGlzYWJsZUVycm9yQm91bmRhcmllcyA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIHJlcyA9IHRoaXMuZGVyaXZhdGlvbi5jYWxsKHRoaXMuc2NvcGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgcmVzID0gdGhpcy5kZXJpdmF0aW9uLmNhbGwodGhpcy5zY29wZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlcyA9IG5ldyBDYXVnaHRFeGNlcHRpb24kJDEoZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGdsb2JhbFN0YXRlJCQxLmNvbXB1dGF0aW9uRGVwdGgtLTtcbiAgICAgICAgdGhpcy5pc0NvbXB1dGluZyA9IGZhbHNlO1xuICAgICAgICByZXR1cm4gcmVzO1xuICAgIH07XG4gICAgQ29tcHV0ZWRWYWx1ZSQkMS5wcm90b3R5cGUuc3VzcGVuZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmtlZXBBbGl2ZSkge1xuICAgICAgICAgICAgY2xlYXJPYnNlcnZpbmckJDEodGhpcyk7XG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gdW5kZWZpbmVkOyAvLyBkb24ndCBob2xkIG9uIHRvIGNvbXB1dGVkIHZhbHVlIVxuICAgICAgICB9XG4gICAgfTtcbiAgICBDb21wdXRlZFZhbHVlJCQxLnByb3RvdHlwZS5vYnNlcnZlID0gZnVuY3Rpb24gKGxpc3RlbmVyLCBmaXJlSW1tZWRpYXRlbHkpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdmFyIGZpcnN0VGltZSA9IHRydWU7XG4gICAgICAgIHZhciBwcmV2VmFsdWUgPSB1bmRlZmluZWQ7XG4gICAgICAgIHJldHVybiBhdXRvcnVuJCQxKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBuZXdWYWx1ZSA9IF90aGlzLmdldCgpO1xuICAgICAgICAgICAgaWYgKCFmaXJzdFRpbWUgfHwgZmlyZUltbWVkaWF0ZWx5KSB7XG4gICAgICAgICAgICAgICAgdmFyIHByZXZVID0gdW50cmFja2VkU3RhcnQkJDEoKTtcbiAgICAgICAgICAgICAgICBsaXN0ZW5lcih7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwidXBkYXRlXCIsXG4gICAgICAgICAgICAgICAgICAgIG9iamVjdDogX3RoaXMsXG4gICAgICAgICAgICAgICAgICAgIG5ld1ZhbHVlOiBuZXdWYWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgb2xkVmFsdWU6IHByZXZWYWx1ZVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHVudHJhY2tlZEVuZCQkMShwcmV2VSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmaXJzdFRpbWUgPSBmYWxzZTtcbiAgICAgICAgICAgIHByZXZWYWx1ZSA9IG5ld1ZhbHVlO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIENvbXB1dGVkVmFsdWUkJDEucHJvdG90eXBlLndhcm5BYm91dFVudHJhY2tlZFJlYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gXCJwcm9kdWN0aW9uXCIpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGlmICh0aGlzLnJlcXVpcmVzUmVhY3Rpb24gPT09IHRydWUpIHtcbiAgICAgICAgICAgIGZhaWwkJDEoXCJbbW9ieF0gQ29tcHV0ZWQgdmFsdWUgXCIgKyB0aGlzLm5hbWUgKyBcIiBpcyByZWFkIG91dHNpZGUgYSByZWFjdGl2ZSBjb250ZXh0XCIpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmlzVHJhY2luZyAhPT0gVHJhY2VNb2RlJCQxLk5PTkUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiW21vYngudHJhY2VdICdcIiArIHRoaXMubmFtZSArIFwiJyBpcyBiZWluZyByZWFkIG91dHNpZGUgYSByZWFjdGl2ZSBjb250ZXh0LiBEb2luZyBhIGZ1bGwgcmVjb21wdXRlXCIpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChnbG9iYWxTdGF0ZSQkMS5jb21wdXRlZFJlcXVpcmVzUmVhY3Rpb24pIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihcIlttb2J4XSBDb21wdXRlZCB2YWx1ZSBcIiArIHRoaXMubmFtZSArIFwiIGlzIGJlaW5nIHJlYWQgb3V0c2lkZSBhIHJlYWN0aXZlIGNvbnRleHQuIERvaW5nIGEgZnVsbCByZWNvbXB1dGVcIik7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIENvbXB1dGVkVmFsdWUkJDEucHJvdG90eXBlLnRvSlNPTiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0KCk7XG4gICAgfTtcbiAgICBDb21wdXRlZFZhbHVlJCQxLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubmFtZSArIFwiW1wiICsgdGhpcy5kZXJpdmF0aW9uLnRvU3RyaW5nKCkgKyBcIl1cIjtcbiAgICB9O1xuICAgIENvbXB1dGVkVmFsdWUkJDEucHJvdG90eXBlLnZhbHVlT2YgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0b1ByaW1pdGl2ZSQkMSh0aGlzLmdldCgpKTtcbiAgICB9O1xuICAgIENvbXB1dGVkVmFsdWUkJDEucHJvdG90eXBlW1N5bWJvbC50b1ByaW1pdGl2ZV0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnZhbHVlT2YoKTtcbiAgICB9O1xuICAgIHJldHVybiBDb21wdXRlZFZhbHVlJCQxO1xufSgpKTtcbnZhciBpc0NvbXB1dGVkVmFsdWUkJDEgPSBjcmVhdGVJbnN0YW5jZW9mUHJlZGljYXRlJCQxKFwiQ29tcHV0ZWRWYWx1ZVwiLCBDb21wdXRlZFZhbHVlJCQxKTtcblxudmFyIElEZXJpdmF0aW9uU3RhdGU7XG4oZnVuY3Rpb24gKElEZXJpdmF0aW9uU3RhdGUkJDEpIHtcbiAgICAvLyBiZWZvcmUgYmVpbmcgcnVuIG9yIChvdXRzaWRlIGJhdGNoIGFuZCBub3QgYmVpbmcgb2JzZXJ2ZWQpXG4gICAgLy8gYXQgdGhpcyBwb2ludCBkZXJpdmF0aW9uIGlzIG5vdCBob2xkaW5nIGFueSBkYXRhIGFib3V0IGRlcGVuZGVuY3kgdHJlZVxuICAgIElEZXJpdmF0aW9uU3RhdGUkJDFbSURlcml2YXRpb25TdGF0ZSQkMVtcIk5PVF9UUkFDS0lOR1wiXSA9IC0xXSA9IFwiTk9UX1RSQUNLSU5HXCI7XG4gICAgLy8gbm8gc2hhbGxvdyBkZXBlbmRlbmN5IGNoYW5nZWQgc2luY2UgbGFzdCBjb21wdXRhdGlvblxuICAgIC8vIHdvbid0IHJlY2FsY3VsYXRlIGRlcml2YXRpb25cbiAgICAvLyB0aGlzIGlzIHdoYXQgbWFrZXMgbW9ieCBmYXN0XG4gICAgSURlcml2YXRpb25TdGF0ZSQkMVtJRGVyaXZhdGlvblN0YXRlJCQxW1wiVVBfVE9fREFURVwiXSA9IDBdID0gXCJVUF9UT19EQVRFXCI7XG4gICAgLy8gc29tZSBkZWVwIGRlcGVuZGVuY3kgY2hhbmdlZCwgYnV0IGRvbid0IGtub3cgaWYgc2hhbGxvdyBkZXBlbmRlbmN5IGNoYW5nZWRcbiAgICAvLyB3aWxsIHJlcXVpcmUgdG8gY2hlY2sgZmlyc3QgaWYgVVBfVE9fREFURSBvciBQT1NTSUJMWV9TVEFMRVxuICAgIC8vIGN1cnJlbnRseSBvbmx5IENvbXB1dGVkVmFsdWUgd2lsbCBwcm9wYWdhdGUgUE9TU0lCTFlfU1RBTEVcbiAgICAvL1xuICAgIC8vIGhhdmluZyB0aGlzIHN0YXRlIGlzIHNlY29uZCBiaWcgb3B0aW1pemF0aW9uOlxuICAgIC8vIGRvbid0IGhhdmUgdG8gcmVjb21wdXRlIG9uIGV2ZXJ5IGRlcGVuZGVuY3kgY2hhbmdlLCBidXQgb25seSB3aGVuIGl0J3MgbmVlZGVkXG4gICAgSURlcml2YXRpb25TdGF0ZSQkMVtJRGVyaXZhdGlvblN0YXRlJCQxW1wiUE9TU0lCTFlfU1RBTEVcIl0gPSAxXSA9IFwiUE9TU0lCTFlfU1RBTEVcIjtcbiAgICAvLyBBIHNoYWxsb3cgZGVwZW5kZW5jeSBoYXMgY2hhbmdlZCBzaW5jZSBsYXN0IGNvbXB1dGF0aW9uIGFuZCB0aGUgZGVyaXZhdGlvblxuICAgIC8vIHdpbGwgbmVlZCB0byByZWNvbXB1dGUgd2hlbiBpdCdzIG5lZWRlZCBuZXh0LlxuICAgIElEZXJpdmF0aW9uU3RhdGUkJDFbSURlcml2YXRpb25TdGF0ZSQkMVtcIlNUQUxFXCJdID0gMl0gPSBcIlNUQUxFXCI7XG59KShJRGVyaXZhdGlvblN0YXRlIHx8IChJRGVyaXZhdGlvblN0YXRlID0ge30pKTtcbnZhciBUcmFjZU1vZGUkJDE7XG4oZnVuY3Rpb24gKFRyYWNlTW9kZSQkMSkge1xuICAgIFRyYWNlTW9kZSQkMVtUcmFjZU1vZGUkJDFbXCJOT05FXCJdID0gMF0gPSBcIk5PTkVcIjtcbiAgICBUcmFjZU1vZGUkJDFbVHJhY2VNb2RlJCQxW1wiTE9HXCJdID0gMV0gPSBcIkxPR1wiO1xuICAgIFRyYWNlTW9kZSQkMVtUcmFjZU1vZGUkJDFbXCJCUkVBS1wiXSA9IDJdID0gXCJCUkVBS1wiO1xufSkoVHJhY2VNb2RlJCQxIHx8IChUcmFjZU1vZGUkJDEgPSB7fSkpO1xudmFyIENhdWdodEV4Y2VwdGlvbiQkMSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBDYXVnaHRFeGNlcHRpb24kJDEoY2F1c2UpIHtcbiAgICAgICAgdGhpcy5jYXVzZSA9IGNhdXNlO1xuICAgICAgICAvLyBFbXB0eVxuICAgIH1cbiAgICByZXR1cm4gQ2F1Z2h0RXhjZXB0aW9uJCQxO1xufSgpKTtcbmZ1bmN0aW9uIGlzQ2F1Z2h0RXhjZXB0aW9uJCQxKGUpIHtcbiAgICByZXR1cm4gZSBpbnN0YW5jZW9mIENhdWdodEV4Y2VwdGlvbiQkMTtcbn1cbi8qKlxuICogRmluZHMgb3V0IHdoZXRoZXIgYW55IGRlcGVuZGVuY3kgb2YgdGhlIGRlcml2YXRpb24gaGFzIGFjdHVhbGx5IGNoYW5nZWQuXG4gKiBJZiBkZXBlbmRlbmNpZXNTdGF0ZSBpcyAxIHRoZW4gaXQgd2lsbCByZWNhbGN1bGF0ZSBkZXBlbmRlbmNpZXMsXG4gKiBpZiBhbnkgZGVwZW5kZW5jeSBjaGFuZ2VkIGl0IHdpbGwgcHJvcGFnYXRlIGl0IGJ5IGNoYW5naW5nIGRlcGVuZGVuY2llc1N0YXRlIHRvIDIuXG4gKlxuICogQnkgaXRlcmF0aW5nIG92ZXIgdGhlIGRlcGVuZGVuY2llcyBpbiB0aGUgc2FtZSBvcmRlciB0aGF0IHRoZXkgd2VyZSByZXBvcnRlZCBhbmRcbiAqIHN0b3BwaW5nIG9uIHRoZSBmaXJzdCBjaGFuZ2UsIGFsbCB0aGUgcmVjYWxjdWxhdGlvbnMgYXJlIG9ubHkgY2FsbGVkIGZvciBDb21wdXRlZFZhbHVlc1xuICogdGhhdCB3aWxsIGJlIHRyYWNrZWQgYnkgZGVyaXZhdGlvbi4gVGhhdCBpcyBiZWNhdXNlIHdlIGFzc3VtZSB0aGF0IGlmIHRoZSBmaXJzdCB4XG4gKiBkZXBlbmRlbmNpZXMgb2YgdGhlIGRlcml2YXRpb24gZG9lc24ndCBjaGFuZ2UgdGhlbiB0aGUgZGVyaXZhdGlvbiBzaG91bGQgcnVuIHRoZSBzYW1lIHdheVxuICogdXAgdW50aWwgYWNjZXNzaW5nIHgtdGggZGVwZW5kZW5jeS5cbiAqL1xuZnVuY3Rpb24gc2hvdWxkQ29tcHV0ZSQkMShkZXJpdmF0aW9uKSB7XG4gICAgc3dpdGNoIChkZXJpdmF0aW9uLmRlcGVuZGVuY2llc1N0YXRlKSB7XG4gICAgICAgIGNhc2UgSURlcml2YXRpb25TdGF0ZS5VUF9UT19EQVRFOlxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICBjYXNlIElEZXJpdmF0aW9uU3RhdGUuTk9UX1RSQUNLSU5HOlxuICAgICAgICBjYXNlIElEZXJpdmF0aW9uU3RhdGUuU1RBTEU6XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgY2FzZSBJRGVyaXZhdGlvblN0YXRlLlBPU1NJQkxZX1NUQUxFOiB7XG4gICAgICAgICAgICB2YXIgcHJldlVudHJhY2tlZCA9IHVudHJhY2tlZFN0YXJ0JCQxKCk7IC8vIG5vIG5lZWQgZm9yIHRob3NlIGNvbXB1dGVkcyB0byBiZSByZXBvcnRlZCwgdGhleSB3aWxsIGJlIHBpY2tlZCB1cCBpbiB0cmFja0Rlcml2ZWRGdW5jdGlvbi5cbiAgICAgICAgICAgIHZhciBvYnMgPSBkZXJpdmF0aW9uLm9ic2VydmluZywgbCA9IG9icy5sZW5ndGg7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgICAgIHZhciBvYmogPSBvYnNbaV07XG4gICAgICAgICAgICAgICAgaWYgKGlzQ29tcHV0ZWRWYWx1ZSQkMShvYmopKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChnbG9iYWxTdGF0ZSQkMS5kaXNhYmxlRXJyb3JCb3VuZGFyaWVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvYmouZ2V0KCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iai5nZXQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gd2UgYXJlIG5vdCBpbnRlcmVzdGVkIGluIHRoZSB2YWx1ZSAqb3IqIGV4Y2VwdGlvbiBhdCB0aGlzIG1vbWVudCwgYnV0IGlmIHRoZXJlIGlzIG9uZSwgbm90aWZ5IGFsbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVudHJhY2tlZEVuZCQkMShwcmV2VW50cmFja2VkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvLyBpZiBDb21wdXRlZFZhbHVlIGBvYmpgIGFjdHVhbGx5IGNoYW5nZWQgaXQgd2lsbCBiZSBjb21wdXRlZCBhbmQgcHJvcGFnYXRlZCB0byBpdHMgb2JzZXJ2ZXJzLlxuICAgICAgICAgICAgICAgICAgICAvLyBhbmQgYGRlcml2YXRpb25gIGlzIGFuIG9ic2VydmVyIG9mIGBvYmpgXG4gICAgICAgICAgICAgICAgICAgIC8vIGludmFyaWFudFNob3VsZENvbXB1dGUoZGVyaXZhdGlvbilcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRlcml2YXRpb24uZGVwZW5kZW5jaWVzU3RhdGUgPT09IElEZXJpdmF0aW9uU3RhdGUuU1RBTEUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVudHJhY2tlZEVuZCQkMShwcmV2VW50cmFja2VkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2hhbmdlRGVwZW5kZW5jaWVzU3RhdGVUbzAkJDEoZGVyaXZhdGlvbik7XG4gICAgICAgICAgICB1bnRyYWNrZWRFbmQkJDEocHJldlVudHJhY2tlZCk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG59XG4vLyBmdW5jdGlvbiBpbnZhcmlhbnRTaG91bGRDb21wdXRlKGRlcml2YXRpb246IElEZXJpdmF0aW9uKSB7XG4vLyAgICAgY29uc3QgbmV3RGVwU3RhdGUgPSAoZGVyaXZhdGlvbiBhcyBhbnkpLmRlcGVuZGVuY2llc1N0YXRlXG4vLyAgICAgaWYgKFxuLy8gICAgICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gXCJwcm9kdWN0aW9uXCIgJiZcbi8vICAgICAgICAgKG5ld0RlcFN0YXRlID09PSBJRGVyaXZhdGlvblN0YXRlLlBPU1NJQkxZX1NUQUxFIHx8XG4vLyAgICAgICAgICAgICBuZXdEZXBTdGF0ZSA9PT0gSURlcml2YXRpb25TdGF0ZS5OT1RfVFJBQ0tJTkcpXG4vLyAgICAgKVxuLy8gICAgICAgICBmYWlsKFwiSWxsZWdhbCBkZXBlbmRlbmN5IHN0YXRlXCIpXG4vLyB9XG5mdW5jdGlvbiBpc0NvbXB1dGluZ0Rlcml2YXRpb24kJDEoKSB7XG4gICAgcmV0dXJuIGdsb2JhbFN0YXRlJCQxLnRyYWNraW5nRGVyaXZhdGlvbiAhPT0gbnVsbDsgLy8gZmlsdGVyIG91dCBhY3Rpb25zIGluc2lkZSBjb21wdXRhdGlvbnNcbn1cbmZ1bmN0aW9uIGNoZWNrSWZTdGF0ZU1vZGlmaWNhdGlvbnNBcmVBbGxvd2VkJCQxKGF0b20pIHtcbiAgICB2YXIgaGFzT2JzZXJ2ZXJzJCQxID0gYXRvbS5vYnNlcnZlcnMuc2l6ZSA+IDA7XG4gICAgLy8gU2hvdWxkIG5ldmVyIGJlIHBvc3NpYmxlIHRvIGNoYW5nZSBhbiBvYnNlcnZlZCBvYnNlcnZhYmxlIGZyb20gaW5zaWRlIGNvbXB1dGVkLCBzZWUgIzc5OFxuICAgIGlmIChnbG9iYWxTdGF0ZSQkMS5jb21wdXRhdGlvbkRlcHRoID4gMCAmJiBoYXNPYnNlcnZlcnMkJDEpXG4gICAgICAgIGZhaWwkJDEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiICYmXG4gICAgICAgICAgICBcIkNvbXB1dGVkIHZhbHVlcyBhcmUgbm90IGFsbG93ZWQgdG8gY2F1c2Ugc2lkZSBlZmZlY3RzIGJ5IGNoYW5naW5nIG9ic2VydmFibGVzIHRoYXQgYXJlIGFscmVhZHkgYmVpbmcgb2JzZXJ2ZWQuIFRyaWVkIHRvIG1vZGlmeTogXCIgKyBhdG9tLm5hbWUpO1xuICAgIC8vIFNob3VsZCBub3QgYmUgcG9zc2libGUgdG8gY2hhbmdlIG9ic2VydmVkIHN0YXRlIG91dHNpZGUgc3RyaWN0IG1vZGUsIGV4Y2VwdCBkdXJpbmcgaW5pdGlhbGl6YXRpb24sIHNlZSAjNTYzXG4gICAgaWYgKCFnbG9iYWxTdGF0ZSQkMS5hbGxvd1N0YXRlQ2hhbmdlcyAmJiAoaGFzT2JzZXJ2ZXJzJCQxIHx8IGdsb2JhbFN0YXRlJCQxLmVuZm9yY2VBY3Rpb25zID09PSBcInN0cmljdFwiKSlcbiAgICAgICAgZmFpbCQkMShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgJiZcbiAgICAgICAgICAgIChnbG9iYWxTdGF0ZSQkMS5lbmZvcmNlQWN0aW9uc1xuICAgICAgICAgICAgICAgID8gXCJTaW5jZSBzdHJpY3QtbW9kZSBpcyBlbmFibGVkLCBjaGFuZ2luZyBvYnNlcnZlZCBvYnNlcnZhYmxlIHZhbHVlcyBvdXRzaWRlIGFjdGlvbnMgaXMgbm90IGFsbG93ZWQuIFBsZWFzZSB3cmFwIHRoZSBjb2RlIGluIGFuIGBhY3Rpb25gIGlmIHRoaXMgY2hhbmdlIGlzIGludGVuZGVkLiBUcmllZCB0byBtb2RpZnk6IFwiXG4gICAgICAgICAgICAgICAgOiBcIlNpZGUgZWZmZWN0cyBsaWtlIGNoYW5naW5nIHN0YXRlIGFyZSBub3QgYWxsb3dlZCBhdCB0aGlzIHBvaW50LiBBcmUgeW91IHRyeWluZyB0byBtb2RpZnkgc3RhdGUgZnJvbSwgZm9yIGV4YW1wbGUsIHRoZSByZW5kZXIgZnVuY3Rpb24gb2YgYSBSZWFjdCBjb21wb25lbnQ/IFRyaWVkIHRvIG1vZGlmeTogXCIpICtcbiAgICAgICAgICAgICAgICBhdG9tLm5hbWUpO1xufVxuLyoqXG4gKiBFeGVjdXRlcyB0aGUgcHJvdmlkZWQgZnVuY3Rpb24gYGZgIGFuZCB0cmFja3Mgd2hpY2ggb2JzZXJ2YWJsZXMgYXJlIGJlaW5nIGFjY2Vzc2VkLlxuICogVGhlIHRyYWNraW5nIGluZm9ybWF0aW9uIGlzIHN0b3JlZCBvbiB0aGUgYGRlcml2YXRpb25gIG9iamVjdCBhbmQgdGhlIGRlcml2YXRpb24gaXMgcmVnaXN0ZXJlZFxuICogYXMgb2JzZXJ2ZXIgb2YgYW55IG9mIHRoZSBhY2Nlc3NlZCBvYnNlcnZhYmxlcy5cbiAqL1xuZnVuY3Rpb24gdHJhY2tEZXJpdmVkRnVuY3Rpb24kJDEoZGVyaXZhdGlvbiwgZiwgY29udGV4dCkge1xuICAgIC8vIHByZSBhbGxvY2F0ZSBhcnJheSBhbGxvY2F0aW9uICsgcm9vbSBmb3IgdmFyaWF0aW9uIGluIGRlcHNcbiAgICAvLyBhcnJheSB3aWxsIGJlIHRyaW1tZWQgYnkgYmluZERlcGVuZGVuY2llc1xuICAgIGNoYW5nZURlcGVuZGVuY2llc1N0YXRlVG8wJCQxKGRlcml2YXRpb24pO1xuICAgIGRlcml2YXRpb24ubmV3T2JzZXJ2aW5nID0gbmV3IEFycmF5KGRlcml2YXRpb24ub2JzZXJ2aW5nLmxlbmd0aCArIDEwMCk7XG4gICAgZGVyaXZhdGlvbi51bmJvdW5kRGVwc0NvdW50ID0gMDtcbiAgICBkZXJpdmF0aW9uLnJ1bklkID0gKytnbG9iYWxTdGF0ZSQkMS5ydW5JZDtcbiAgICB2YXIgcHJldlRyYWNraW5nID0gZ2xvYmFsU3RhdGUkJDEudHJhY2tpbmdEZXJpdmF0aW9uO1xuICAgIGdsb2JhbFN0YXRlJCQxLnRyYWNraW5nRGVyaXZhdGlvbiA9IGRlcml2YXRpb247XG4gICAgdmFyIHJlc3VsdDtcbiAgICBpZiAoZ2xvYmFsU3RhdGUkJDEuZGlzYWJsZUVycm9yQm91bmRhcmllcyA9PT0gdHJ1ZSkge1xuICAgICAgICByZXN1bHQgPSBmLmNhbGwoY29udGV4dCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmVzdWx0ID0gZi5jYWxsKGNvbnRleHQpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICByZXN1bHQgPSBuZXcgQ2F1Z2h0RXhjZXB0aW9uJCQxKGUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGdsb2JhbFN0YXRlJCQxLnRyYWNraW5nRGVyaXZhdGlvbiA9IHByZXZUcmFja2luZztcbiAgICBiaW5kRGVwZW5kZW5jaWVzKGRlcml2YXRpb24pO1xuICAgIHJldHVybiByZXN1bHQ7XG59XG4vKipcbiAqIGRpZmZzIG5ld09ic2VydmluZyB3aXRoIG9ic2VydmluZy5cbiAqIHVwZGF0ZSBvYnNlcnZpbmcgdG8gYmUgbmV3T2JzZXJ2aW5nIHdpdGggdW5pcXVlIG9ic2VydmFibGVzXG4gKiBub3RpZnkgb2JzZXJ2ZXJzIHRoYXQgYmVjb21lIG9ic2VydmVkL3Vub2JzZXJ2ZWRcbiAqL1xuZnVuY3Rpb24gYmluZERlcGVuZGVuY2llcyhkZXJpdmF0aW9uKSB7XG4gICAgLy8gaW52YXJpYW50KGRlcml2YXRpb24uZGVwZW5kZW5jaWVzU3RhdGUgIT09IElEZXJpdmF0aW9uU3RhdGUuTk9UX1RSQUNLSU5HLCBcIklOVEVSTkFMIEVSUk9SIGJpbmREZXBlbmRlbmNpZXMgZXhwZWN0cyBkZXJpdmF0aW9uLmRlcGVuZGVuY2llc1N0YXRlICE9PSAtMVwiKTtcbiAgICB2YXIgcHJldk9ic2VydmluZyA9IGRlcml2YXRpb24ub2JzZXJ2aW5nO1xuICAgIHZhciBvYnNlcnZpbmcgPSAoZGVyaXZhdGlvbi5vYnNlcnZpbmcgPSBkZXJpdmF0aW9uLm5ld09ic2VydmluZyk7XG4gICAgdmFyIGxvd2VzdE5ld09ic2VydmluZ0Rlcml2YXRpb25TdGF0ZSA9IElEZXJpdmF0aW9uU3RhdGUuVVBfVE9fREFURTtcbiAgICAvLyBHbyB0aHJvdWdoIGFsbCBuZXcgb2JzZXJ2YWJsZXMgYW5kIGNoZWNrIGRpZmZWYWx1ZTogKHRoaXMgbGlzdCBjYW4gY29udGFpbiBkdXBsaWNhdGVzKTpcbiAgICAvLyAgIDA6IGZpcnN0IG9jY3VycmVuY2UsIGNoYW5nZSB0byAxIGFuZCBrZWVwIGl0XG4gICAgLy8gICAxOiBleHRyYSBvY2N1cnJlbmNlLCBkcm9wIGl0XG4gICAgdmFyIGkwID0gMCwgbCA9IGRlcml2YXRpb24udW5ib3VuZERlcHNDb3VudDtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGw7IGkrKykge1xuICAgICAgICB2YXIgZGVwID0gb2JzZXJ2aW5nW2ldO1xuICAgICAgICBpZiAoZGVwLmRpZmZWYWx1ZSA9PT0gMCkge1xuICAgICAgICAgICAgZGVwLmRpZmZWYWx1ZSA9IDE7XG4gICAgICAgICAgICBpZiAoaTAgIT09IGkpXG4gICAgICAgICAgICAgICAgb2JzZXJ2aW5nW2kwXSA9IGRlcDtcbiAgICAgICAgICAgIGkwKys7XG4gICAgICAgIH1cbiAgICAgICAgLy8gVXBjYXN0IGlzICdzYWZlJyBoZXJlLCBiZWNhdXNlIGlmIGRlcCBpcyBJT2JzZXJ2YWJsZSwgYGRlcGVuZGVuY2llc1N0YXRlYCB3aWxsIGJlIHVuZGVmaW5lZCxcbiAgICAgICAgLy8gbm90IGhpdHRpbmcgdGhlIGNvbmRpdGlvblxuICAgICAgICBpZiAoZGVwLmRlcGVuZGVuY2llc1N0YXRlID4gbG93ZXN0TmV3T2JzZXJ2aW5nRGVyaXZhdGlvblN0YXRlKSB7XG4gICAgICAgICAgICBsb3dlc3ROZXdPYnNlcnZpbmdEZXJpdmF0aW9uU3RhdGUgPSBkZXAuZGVwZW5kZW5jaWVzU3RhdGU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgb2JzZXJ2aW5nLmxlbmd0aCA9IGkwO1xuICAgIGRlcml2YXRpb24ubmV3T2JzZXJ2aW5nID0gbnVsbDsgLy8gbmV3T2JzZXJ2aW5nIHNob3VsZG4ndCBiZSBuZWVkZWQgb3V0c2lkZSB0cmFja2luZyAoc3RhdGVtZW50IG1vdmVkIGRvd24gdG8gd29yayBhcm91bmQgRkYgYnVnLCBzZWUgIzYxNClcbiAgICAvLyBHbyB0aHJvdWdoIGFsbCBvbGQgb2JzZXJ2YWJsZXMgYW5kIGNoZWNrIGRpZmZWYWx1ZTogKGl0IGlzIHVuaXF1ZSBhZnRlciBsYXN0IGJpbmREZXBlbmRlbmNpZXMpXG4gICAgLy8gICAwOiBpdCdzIG5vdCBpbiBuZXcgb2JzZXJ2YWJsZXMsIHVub2JzZXJ2ZSBpdFxuICAgIC8vICAgMTogaXQga2VlcHMgYmVpbmcgb2JzZXJ2ZWQsIGRvbid0IHdhbnQgdG8gbm90aWZ5IGl0LiBjaGFuZ2UgdG8gMFxuICAgIGwgPSBwcmV2T2JzZXJ2aW5nLmxlbmd0aDtcbiAgICB3aGlsZSAobC0tKSB7XG4gICAgICAgIHZhciBkZXAgPSBwcmV2T2JzZXJ2aW5nW2xdO1xuICAgICAgICBpZiAoZGVwLmRpZmZWYWx1ZSA9PT0gMCkge1xuICAgICAgICAgICAgcmVtb3ZlT2JzZXJ2ZXIkJDEoZGVwLCBkZXJpdmF0aW9uKTtcbiAgICAgICAgfVxuICAgICAgICBkZXAuZGlmZlZhbHVlID0gMDtcbiAgICB9XG4gICAgLy8gR28gdGhyb3VnaCBhbGwgbmV3IG9ic2VydmFibGVzIGFuZCBjaGVjayBkaWZmVmFsdWU6IChub3cgaXQgc2hvdWxkIGJlIHVuaXF1ZSlcbiAgICAvLyAgIDA6IGl0IHdhcyBzZXQgdG8gMCBpbiBsYXN0IGxvb3AuIGRvbid0IG5lZWQgdG8gZG8gYW55dGhpbmcuXG4gICAgLy8gICAxOiBpdCB3YXNuJ3Qgb2JzZXJ2ZWQsIGxldCdzIG9ic2VydmUgaXQuIHNldCBiYWNrIHRvIDBcbiAgICB3aGlsZSAoaTAtLSkge1xuICAgICAgICB2YXIgZGVwID0gb2JzZXJ2aW5nW2kwXTtcbiAgICAgICAgaWYgKGRlcC5kaWZmVmFsdWUgPT09IDEpIHtcbiAgICAgICAgICAgIGRlcC5kaWZmVmFsdWUgPSAwO1xuICAgICAgICAgICAgYWRkT2JzZXJ2ZXIkJDEoZGVwLCBkZXJpdmF0aW9uKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyBTb21lIG5ldyBvYnNlcnZlZCBkZXJpdmF0aW9ucyBtYXkgYmVjb21lIHN0YWxlIGR1cmluZyB0aGlzIGRlcml2YXRpb24gY29tcHV0YXRpb25cbiAgICAvLyBzbyB0aGV5IGhhdmUgaGFkIG5vIGNoYW5jZSB0byBwcm9wYWdhdGUgc3RhbGVuZXNzICgjOTE2KVxuICAgIGlmIChsb3dlc3ROZXdPYnNlcnZpbmdEZXJpdmF0aW9uU3RhdGUgIT09IElEZXJpdmF0aW9uU3RhdGUuVVBfVE9fREFURSkge1xuICAgICAgICBkZXJpdmF0aW9uLmRlcGVuZGVuY2llc1N0YXRlID0gbG93ZXN0TmV3T2JzZXJ2aW5nRGVyaXZhdGlvblN0YXRlO1xuICAgICAgICBkZXJpdmF0aW9uLm9uQmVjb21lU3RhbGUoKTtcbiAgICB9XG59XG5mdW5jdGlvbiBjbGVhck9ic2VydmluZyQkMShkZXJpdmF0aW9uKSB7XG4gICAgLy8gaW52YXJpYW50KGdsb2JhbFN0YXRlLmluQmF0Y2ggPiAwLCBcIklOVEVSTkFMIEVSUk9SIGNsZWFyT2JzZXJ2aW5nIHNob3VsZCBiZSBjYWxsZWQgb25seSBpbnNpZGUgYmF0Y2hcIik7XG4gICAgdmFyIG9icyA9IGRlcml2YXRpb24ub2JzZXJ2aW5nO1xuICAgIGRlcml2YXRpb24ub2JzZXJ2aW5nID0gW107XG4gICAgdmFyIGkgPSBvYnMubGVuZ3RoO1xuICAgIHdoaWxlIChpLS0pXG4gICAgICAgIHJlbW92ZU9ic2VydmVyJCQxKG9ic1tpXSwgZGVyaXZhdGlvbik7XG4gICAgZGVyaXZhdGlvbi5kZXBlbmRlbmNpZXNTdGF0ZSA9IElEZXJpdmF0aW9uU3RhdGUuTk9UX1RSQUNLSU5HO1xufVxuZnVuY3Rpb24gdW50cmFja2VkJCQxKGFjdGlvbiQkMSkge1xuICAgIHZhciBwcmV2ID0gdW50cmFja2VkU3RhcnQkJDEoKTtcbiAgICB0cnkge1xuICAgICAgICByZXR1cm4gYWN0aW9uJCQxKCk7XG4gICAgfVxuICAgIGZpbmFsbHkge1xuICAgICAgICB1bnRyYWNrZWRFbmQkJDEocHJldik7XG4gICAgfVxufVxuZnVuY3Rpb24gdW50cmFja2VkU3RhcnQkJDEoKSB7XG4gICAgdmFyIHByZXYgPSBnbG9iYWxTdGF0ZSQkMS50cmFja2luZ0Rlcml2YXRpb247XG4gICAgZ2xvYmFsU3RhdGUkJDEudHJhY2tpbmdEZXJpdmF0aW9uID0gbnVsbDtcbiAgICByZXR1cm4gcHJldjtcbn1cbmZ1bmN0aW9uIHVudHJhY2tlZEVuZCQkMShwcmV2KSB7XG4gICAgZ2xvYmFsU3RhdGUkJDEudHJhY2tpbmdEZXJpdmF0aW9uID0gcHJldjtcbn1cbi8qKlxuICogbmVlZGVkIHRvIGtlZXAgYGxvd2VzdE9ic2VydmVyU3RhdGVgIGNvcnJlY3QuIHdoZW4gY2hhbmdpbmcgZnJvbSAoMiBvciAxKSB0byAwXG4gKlxuICovXG5mdW5jdGlvbiBjaGFuZ2VEZXBlbmRlbmNpZXNTdGF0ZVRvMCQkMShkZXJpdmF0aW9uKSB7XG4gICAgaWYgKGRlcml2YXRpb24uZGVwZW5kZW5jaWVzU3RhdGUgPT09IElEZXJpdmF0aW9uU3RhdGUuVVBfVE9fREFURSlcbiAgICAgICAgcmV0dXJuO1xuICAgIGRlcml2YXRpb24uZGVwZW5kZW5jaWVzU3RhdGUgPSBJRGVyaXZhdGlvblN0YXRlLlVQX1RPX0RBVEU7XG4gICAgdmFyIG9icyA9IGRlcml2YXRpb24ub2JzZXJ2aW5nO1xuICAgIHZhciBpID0gb2JzLmxlbmd0aDtcbiAgICB3aGlsZSAoaS0tKVxuICAgICAgICBvYnNbaV0ubG93ZXN0T2JzZXJ2ZXJTdGF0ZSA9IElEZXJpdmF0aW9uU3RhdGUuVVBfVE9fREFURTtcbn1cblxuLyoqXG4gKiBUaGVzZSB2YWx1ZXMgd2lsbCBwZXJzaXN0IGlmIGdsb2JhbCBzdGF0ZSBpcyByZXNldFxuICovXG52YXIgcGVyc2lzdGVudEtleXMgPSBbXG4gICAgXCJtb2J4R3VpZFwiLFxuICAgIFwic3B5TGlzdGVuZXJzXCIsXG4gICAgXCJlbmZvcmNlQWN0aW9uc1wiLFxuICAgIFwiY29tcHV0ZWRSZXF1aXJlc1JlYWN0aW9uXCIsXG4gICAgXCJkaXNhYmxlRXJyb3JCb3VuZGFyaWVzXCIsXG4gICAgXCJydW5JZFwiLFxuICAgIFwiVU5DSEFOR0VEXCJcbl07XG52YXIgTW9iWEdsb2JhbHMkJDEgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gTW9iWEdsb2JhbHMkJDEoKSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBNb2JYR2xvYmFscyB2ZXJzaW9uLlxuICAgICAgICAgKiBNb2JYIGNvbXBhdGlibGl0eSB3aXRoIG90aGVyIHZlcnNpb25zIGxvYWRlZCBpbiBtZW1vcnkgYXMgbG9uZyBhcyB0aGlzIHZlcnNpb24gbWF0Y2hlcy5cbiAgICAgICAgICogSXQgaW5kaWNhdGVzIHRoYXQgdGhlIGdsb2JhbCBzdGF0ZSBzdGlsbCBzdG9yZXMgc2ltaWxhciBpbmZvcm1hdGlvblxuICAgICAgICAgKlxuICAgICAgICAgKiBOLkI6IHRoaXMgdmVyc2lvbiBpcyB1bnJlbGF0ZWQgdG8gdGhlIHBhY2thZ2UgdmVyc2lvbiBvZiBNb2JYLCBhbmQgaXMgb25seSB0aGUgdmVyc2lvbiBvZiB0aGVcbiAgICAgICAgICogaW50ZXJuYWwgc3RhdGUgc3RvcmFnZSBvZiBNb2JYLCBhbmQgY2FuIGJlIHRoZSBzYW1lIGFjcm9zcyBtYW55IGRpZmZlcmVudCBwYWNrYWdlIHZlcnNpb25zXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnZlcnNpb24gPSA1O1xuICAgICAgICAvKipcbiAgICAgICAgICogZ2xvYmFsbHkgdW5pcXVlIHRva2VuIHRvIHNpZ25hbCB1bmNoYW5nZWRcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuVU5DSEFOR0VEID0ge307XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDdXJyZW50bHkgcnVubmluZyBkZXJpdmF0aW9uXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnRyYWNraW5nRGVyaXZhdGlvbiA9IG51bGw7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBcmUgd2UgcnVubmluZyBhIGNvbXB1dGF0aW9uIGN1cnJlbnRseT8gKG5vdCBhIHJlYWN0aW9uKVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5jb21wdXRhdGlvbkRlcHRoID0gMDtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEVhY2ggdGltZSBhIGRlcml2YXRpb24gaXMgdHJhY2tlZCwgaXQgaXMgYXNzaWduZWQgYSB1bmlxdWUgcnVuLWlkXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnJ1bklkID0gMDtcbiAgICAgICAgLyoqXG4gICAgICAgICAqICdndWlkJyBmb3IgZ2VuZXJhbCBwdXJwb3NlLiBXaWxsIGJlIHBlcnNpc3RlZCBhbW9uZ3N0IHJlc2V0cy5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMubW9ieEd1aWQgPSAwO1xuICAgICAgICAvKipcbiAgICAgICAgICogQXJlIHdlIGluIGEgYmF0Y2ggYmxvY2s/IChhbmQgaG93IG1hbnkgb2YgdGhlbSlcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuaW5CYXRjaCA9IDA7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBPYnNlcnZhYmxlcyB0aGF0IGRvbid0IGhhdmUgb2JzZXJ2ZXJzIGFueW1vcmUsIGFuZCBhcmUgYWJvdXQgdG8gYmVcbiAgICAgICAgICogc3VzcGVuZGVkLCB1bmxlc3Mgc29tZWJvZHkgZWxzZSBhY2Nlc3NlcyBpdCBpbiB0aGUgc2FtZSBiYXRjaFxuICAgICAgICAgKlxuICAgICAgICAgKiBAdHlwZSB7SU9ic2VydmFibGVbXX1cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMucGVuZGluZ1Vub2JzZXJ2YXRpb25zID0gW107XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBMaXN0IG9mIHNjaGVkdWxlZCwgbm90IHlldCBleGVjdXRlZCwgcmVhY3Rpb25zLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5wZW5kaW5nUmVhY3Rpb25zID0gW107XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBcmUgd2UgY3VycmVudGx5IHByb2Nlc3NpbmcgcmVhY3Rpb25zP1xuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5pc1J1bm5pbmdSZWFjdGlvbnMgPSBmYWxzZTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIElzIGl0IGFsbG93ZWQgdG8gY2hhbmdlIG9ic2VydmFibGVzIGF0IHRoaXMgcG9pbnQ/XG4gICAgICAgICAqIEluIGdlbmVyYWwsIE1vYlggZG9lc24ndCBhbGxvdyB0aGF0IHdoZW4gcnVubmluZyBjb21wdXRhdGlvbnMgYW5kIFJlYWN0LnJlbmRlci5cbiAgICAgICAgICogVG8gZW5zdXJlIHRoYXQgdGhvc2UgZnVuY3Rpb25zIHN0YXkgcHVyZS5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuYWxsb3dTdGF0ZUNoYW5nZXMgPSB0cnVlO1xuICAgICAgICAvKipcbiAgICAgICAgICogSWYgc3RyaWN0IG1vZGUgaXMgZW5hYmxlZCwgc3RhdGUgY2hhbmdlcyBhcmUgYnkgZGVmYXVsdCBub3QgYWxsb3dlZFxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5lbmZvcmNlQWN0aW9ucyA9IGZhbHNlO1xuICAgICAgICAvKipcbiAgICAgICAgICogU3B5IGNhbGxiYWNrc1xuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5zcHlMaXN0ZW5lcnMgPSBbXTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEdsb2JhbGx5IGF0dGFjaGVkIGVycm9yIGhhbmRsZXJzIHRoYXQgcmVhY3Qgc3BlY2lmaWNhbGx5IHRvIGVycm9ycyBpbiByZWFjdGlvbnNcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuZ2xvYmFsUmVhY3Rpb25FcnJvckhhbmRsZXJzID0gW107XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBXYXJuIGlmIGNvbXB1dGVkIHZhbHVlcyBhcmUgYWNjZXNzZWQgb3V0c2lkZSBhIHJlYWN0aXZlIGNvbnRleHRcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuY29tcHV0ZWRSZXF1aXJlc1JlYWN0aW9uID0gZmFsc2U7XG4gICAgICAgIC8qXG4gICAgICAgICAqIERvbid0IGNhdGNoIGFuZCByZXRocm93IGV4Y2VwdGlvbnMuIFRoaXMgaXMgdXNlZnVsIGZvciBpbnNwZWN0aW5nIHRoZSBzdGF0ZSBvZlxuICAgICAgICAgKiB0aGUgc3RhY2sgd2hlbiBhbiBleGNlcHRpb24gb2NjdXJzIHdoaWxlIGRlYnVnZ2luZy5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuZGlzYWJsZUVycm9yQm91bmRhcmllcyA9IGZhbHNlO1xuICAgICAgICAvKlxuICAgICAgICAgKiBJZiB0cnVlLCB3ZSBhcmUgYWxyZWFkeSBoYW5kbGluZyBhbiBleGNlcHRpb24gaW4gYW4gYWN0aW9uLiBBbnkgZXJyb3JzIGluIHJlYWN0aW9ucyBzaG91bGQgYmUgc3VwcmVzc2VkLCBhc1xuICAgICAgICAgKiB0aGV5IGFyZSBub3QgdGhlIGNhdXNlLCBzZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9tb2J4anMvbW9ieC9pc3N1ZXMvMTgzNlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5zdXBwcmVzc1JlYWN0aW9uRXJyb3JzID0gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiBNb2JYR2xvYmFscyQkMTtcbn0oKSk7XG52YXIgY2FuTWVyZ2VHbG9iYWxTdGF0ZSA9IHRydWU7XG52YXIgaXNvbGF0ZUNhbGxlZCA9IGZhbHNlO1xudmFyIGdsb2JhbFN0YXRlJCQxID0gKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZ2xvYmFsID0gZ2V0R2xvYmFsJCQxKCk7XG4gICAgaWYgKGdsb2JhbC5fX21vYnhJbnN0YW5jZUNvdW50ID4gMCAmJiAhZ2xvYmFsLl9fbW9ieEdsb2JhbHMpXG4gICAgICAgIGNhbk1lcmdlR2xvYmFsU3RhdGUgPSBmYWxzZTtcbiAgICBpZiAoZ2xvYmFsLl9fbW9ieEdsb2JhbHMgJiYgZ2xvYmFsLl9fbW9ieEdsb2JhbHMudmVyc2lvbiAhPT0gbmV3IE1vYlhHbG9iYWxzJCQxKCkudmVyc2lvbilcbiAgICAgICAgY2FuTWVyZ2VHbG9iYWxTdGF0ZSA9IGZhbHNlO1xuICAgIGlmICghY2FuTWVyZ2VHbG9iYWxTdGF0ZSkge1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmICghaXNvbGF0ZUNhbGxlZCkge1xuICAgICAgICAgICAgICAgIGZhaWwkJDEoXCJUaGVyZSBhcmUgbXVsdGlwbGUsIGRpZmZlcmVudCB2ZXJzaW9ucyBvZiBNb2JYIGFjdGl2ZS4gTWFrZSBzdXJlIE1vYlggaXMgbG9hZGVkIG9ubHkgb25jZSBvciB1c2UgYGNvbmZpZ3VyZSh7IGlzb2xhdGVHbG9iYWxTdGF0ZTogdHJ1ZSB9KWBcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIDEpO1xuICAgICAgICByZXR1cm4gbmV3IE1vYlhHbG9iYWxzJCQxKCk7XG4gICAgfVxuICAgIGVsc2UgaWYgKGdsb2JhbC5fX21vYnhHbG9iYWxzKSB7XG4gICAgICAgIGdsb2JhbC5fX21vYnhJbnN0YW5jZUNvdW50ICs9IDE7XG4gICAgICAgIGlmICghZ2xvYmFsLl9fbW9ieEdsb2JhbHMuVU5DSEFOR0VEKVxuICAgICAgICAgICAgZ2xvYmFsLl9fbW9ieEdsb2JhbHMuVU5DSEFOR0VEID0ge307IC8vIG1ha2UgbWVyZ2UgYmFja3dhcmQgY29tcGF0aWJsZVxuICAgICAgICByZXR1cm4gZ2xvYmFsLl9fbW9ieEdsb2JhbHM7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBnbG9iYWwuX19tb2J4SW5zdGFuY2VDb3VudCA9IDE7XG4gICAgICAgIHJldHVybiAoZ2xvYmFsLl9fbW9ieEdsb2JhbHMgPSBuZXcgTW9iWEdsb2JhbHMkJDEoKSk7XG4gICAgfVxufSkoKTtcbmZ1bmN0aW9uIGlzb2xhdGVHbG9iYWxTdGF0ZSQkMSgpIHtcbiAgICBpZiAoZ2xvYmFsU3RhdGUkJDEucGVuZGluZ1JlYWN0aW9ucy5sZW5ndGggfHxcbiAgICAgICAgZ2xvYmFsU3RhdGUkJDEuaW5CYXRjaCB8fFxuICAgICAgICBnbG9iYWxTdGF0ZSQkMS5pc1J1bm5pbmdSZWFjdGlvbnMpXG4gICAgICAgIGZhaWwkJDEoXCJpc29sYXRlR2xvYmFsU3RhdGUgc2hvdWxkIGJlIGNhbGxlZCBiZWZvcmUgTW9iWCBpcyBydW5uaW5nIGFueSByZWFjdGlvbnNcIik7XG4gICAgaXNvbGF0ZUNhbGxlZCA9IHRydWU7XG4gICAgaWYgKGNhbk1lcmdlR2xvYmFsU3RhdGUpIHtcbiAgICAgICAgaWYgKC0tZ2V0R2xvYmFsJCQxKCkuX19tb2J4SW5zdGFuY2VDb3VudCA9PT0gMClcbiAgICAgICAgICAgIGdldEdsb2JhbCQkMSgpLl9fbW9ieEdsb2JhbHMgPSB1bmRlZmluZWQ7XG4gICAgICAgIGdsb2JhbFN0YXRlJCQxID0gbmV3IE1vYlhHbG9iYWxzJCQxKCk7XG4gICAgfVxufVxuZnVuY3Rpb24gZ2V0R2xvYmFsU3RhdGUkJDEoKSB7XG4gICAgcmV0dXJuIGdsb2JhbFN0YXRlJCQxO1xufVxuLyoqXG4gKiBGb3IgdGVzdGluZyBwdXJwb3NlcyBvbmx5OyB0aGlzIHdpbGwgYnJlYWsgdGhlIGludGVybmFsIHN0YXRlIG9mIGV4aXN0aW5nIG9ic2VydmFibGVzLFxuICogYnV0IGNhbiBiZSB1c2VkIHRvIGdldCBiYWNrIGF0IGEgc3RhYmxlIHN0YXRlIGFmdGVyIHRocm93aW5nIGVycm9yc1xuICovXG5mdW5jdGlvbiByZXNldEdsb2JhbFN0YXRlJCQxKCkge1xuICAgIHZhciBkZWZhdWx0R2xvYmFscyA9IG5ldyBNb2JYR2xvYmFscyQkMSgpO1xuICAgIGZvciAodmFyIGtleSBpbiBkZWZhdWx0R2xvYmFscylcbiAgICAgICAgaWYgKHBlcnNpc3RlbnRLZXlzLmluZGV4T2Yoa2V5KSA9PT0gLTEpXG4gICAgICAgICAgICBnbG9iYWxTdGF0ZSQkMVtrZXldID0gZGVmYXVsdEdsb2JhbHNba2V5XTtcbiAgICBnbG9iYWxTdGF0ZSQkMS5hbGxvd1N0YXRlQ2hhbmdlcyA9ICFnbG9iYWxTdGF0ZSQkMS5lbmZvcmNlQWN0aW9ucztcbn1cbmZ1bmN0aW9uIGdldEdsb2JhbCQkMSgpIHtcbiAgICByZXR1cm4gdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IGdsb2JhbDtcbn1cblxuZnVuY3Rpb24gaGFzT2JzZXJ2ZXJzJCQxKG9ic2VydmFibGUkJDEpIHtcbiAgICByZXR1cm4gb2JzZXJ2YWJsZSQkMS5vYnNlcnZlcnMgJiYgb2JzZXJ2YWJsZSQkMS5vYnNlcnZlcnMuc2l6ZSA+IDA7XG59XG5mdW5jdGlvbiBnZXRPYnNlcnZlcnMkJDEob2JzZXJ2YWJsZSQkMSkge1xuICAgIHJldHVybiBvYnNlcnZhYmxlJCQxLm9ic2VydmVycztcbn1cbi8vIGZ1bmN0aW9uIGludmFyaWFudE9ic2VydmVycyhvYnNlcnZhYmxlOiBJT2JzZXJ2YWJsZSkge1xuLy8gICAgIGNvbnN0IGxpc3QgPSBvYnNlcnZhYmxlLm9ic2VydmVyc1xuLy8gICAgIGNvbnN0IG1hcCA9IG9ic2VydmFibGUub2JzZXJ2ZXJzSW5kZXhlc1xuLy8gICAgIGNvbnN0IGwgPSBsaXN0Lmxlbmd0aFxuLy8gICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbDsgaSsrKSB7XG4vLyAgICAgICAgIGNvbnN0IGlkID0gbGlzdFtpXS5fX21hcGlkXG4vLyAgICAgICAgIGlmIChpKSB7XG4vLyAgICAgICAgICAgICBpbnZhcmlhbnQobWFwW2lkXSA9PT0gaSwgXCJJTlRFUk5BTCBFUlJPUiBtYXBzIGRlcml2YXRpb24uX19tYXBpZCB0byBpbmRleCBpbiBsaXN0XCIpIC8vIGZvciBwZXJmb3JtYW5jZVxuLy8gICAgICAgICB9IGVsc2Uge1xuLy8gICAgICAgICAgICAgaW52YXJpYW50KCEoaWQgaW4gbWFwKSwgXCJJTlRFUk5BTCBFUlJPUiBvYnNlcnZlciBvbiBpbmRleCAwIHNob3VsZG4ndCBiZSBoZWxkIGluIG1hcC5cIikgLy8gZm9yIHBlcmZvcm1hbmNlXG4vLyAgICAgICAgIH1cbi8vICAgICB9XG4vLyAgICAgaW52YXJpYW50KFxuLy8gICAgICAgICBsaXN0Lmxlbmd0aCA9PT0gMCB8fCBPYmplY3Qua2V5cyhtYXApLmxlbmd0aCA9PT0gbGlzdC5sZW5ndGggLSAxLFxuLy8gICAgICAgICBcIklOVEVSTkFMIEVSUk9SIHRoZXJlIGlzIG5vIGp1bmsgaW4gbWFwXCJcbi8vICAgICApXG4vLyB9XG5mdW5jdGlvbiBhZGRPYnNlcnZlciQkMShvYnNlcnZhYmxlJCQxLCBub2RlKSB7XG4gICAgLy8gaW52YXJpYW50KG5vZGUuZGVwZW5kZW5jaWVzU3RhdGUgIT09IC0xLCBcIklOVEVSTkFMIEVSUk9SLCBjYW4gYWRkIG9ubHkgZGVwZW5kZW5jaWVzU3RhdGUgIT09IC0xXCIpO1xuICAgIC8vIGludmFyaWFudChvYnNlcnZhYmxlLl9vYnNlcnZlcnMuaW5kZXhPZihub2RlKSA9PT0gLTEsIFwiSU5URVJOQUwgRVJST1IgYWRkIGFscmVhZHkgYWRkZWQgbm9kZVwiKTtcbiAgICAvLyBpbnZhcmlhbnRPYnNlcnZlcnMob2JzZXJ2YWJsZSk7XG4gICAgb2JzZXJ2YWJsZSQkMS5vYnNlcnZlcnMuYWRkKG5vZGUpO1xuICAgIGlmIChvYnNlcnZhYmxlJCQxLmxvd2VzdE9ic2VydmVyU3RhdGUgPiBub2RlLmRlcGVuZGVuY2llc1N0YXRlKVxuICAgICAgICBvYnNlcnZhYmxlJCQxLmxvd2VzdE9ic2VydmVyU3RhdGUgPSBub2RlLmRlcGVuZGVuY2llc1N0YXRlO1xuICAgIC8vIGludmFyaWFudE9ic2VydmVycyhvYnNlcnZhYmxlKTtcbiAgICAvLyBpbnZhcmlhbnQob2JzZXJ2YWJsZS5fb2JzZXJ2ZXJzLmluZGV4T2Yobm9kZSkgIT09IC0xLCBcIklOVEVSTkFMIEVSUk9SIGRpZG4ndCBhZGQgbm9kZVwiKTtcbn1cbmZ1bmN0aW9uIHJlbW92ZU9ic2VydmVyJCQxKG9ic2VydmFibGUkJDEsIG5vZGUpIHtcbiAgICAvLyBpbnZhcmlhbnQoZ2xvYmFsU3RhdGUuaW5CYXRjaCA+IDAsIFwiSU5URVJOQUwgRVJST1IsIHJlbW92ZSBzaG91bGQgYmUgY2FsbGVkIG9ubHkgaW5zaWRlIGJhdGNoXCIpO1xuICAgIC8vIGludmFyaWFudChvYnNlcnZhYmxlLl9vYnNlcnZlcnMuaW5kZXhPZihub2RlKSAhPT0gLTEsIFwiSU5URVJOQUwgRVJST1IgcmVtb3ZlIGFscmVhZHkgcmVtb3ZlZCBub2RlXCIpO1xuICAgIC8vIGludmFyaWFudE9ic2VydmVycyhvYnNlcnZhYmxlKTtcbiAgICBvYnNlcnZhYmxlJCQxLm9ic2VydmVycy5kZWxldGUobm9kZSk7XG4gICAgaWYgKG9ic2VydmFibGUkJDEub2JzZXJ2ZXJzLnNpemUgPT09IDApIHtcbiAgICAgICAgLy8gZGVsZXRpbmcgbGFzdCBvYnNlcnZlclxuICAgICAgICBxdWV1ZUZvclVub2JzZXJ2YXRpb24kJDEob2JzZXJ2YWJsZSQkMSk7XG4gICAgfVxuICAgIC8vIGludmFyaWFudE9ic2VydmVycyhvYnNlcnZhYmxlKTtcbiAgICAvLyBpbnZhcmlhbnQob2JzZXJ2YWJsZS5fb2JzZXJ2ZXJzLmluZGV4T2Yobm9kZSkgPT09IC0xLCBcIklOVEVSTkFMIEVSUk9SIHJlbW92ZSBhbHJlYWR5IHJlbW92ZWQgbm9kZTJcIik7XG59XG5mdW5jdGlvbiBxdWV1ZUZvclVub2JzZXJ2YXRpb24kJDEob2JzZXJ2YWJsZSQkMSkge1xuICAgIGlmIChvYnNlcnZhYmxlJCQxLmlzUGVuZGluZ1Vub2JzZXJ2YXRpb24gPT09IGZhbHNlKSB7XG4gICAgICAgIC8vIGludmFyaWFudChvYnNlcnZhYmxlLl9vYnNlcnZlcnMubGVuZ3RoID09PSAwLCBcIklOVEVSTkFMIEVSUk9SLCBzaG91bGQgb25seSBxdWV1ZSBmb3IgdW5vYnNlcnZhdGlvbiB1bm9ic2VydmVkIG9ic2VydmFibGVzXCIpO1xuICAgICAgICBvYnNlcnZhYmxlJCQxLmlzUGVuZGluZ1Vub2JzZXJ2YXRpb24gPSB0cnVlO1xuICAgICAgICBnbG9iYWxTdGF0ZSQkMS5wZW5kaW5nVW5vYnNlcnZhdGlvbnMucHVzaChvYnNlcnZhYmxlJCQxKTtcbiAgICB9XG59XG4vKipcbiAqIEJhdGNoIHN0YXJ0cyBhIHRyYW5zYWN0aW9uLCBhdCBsZWFzdCBmb3IgcHVycG9zZXMgb2YgbWVtb2l6aW5nIENvbXB1dGVkVmFsdWVzIHdoZW4gbm90aGluZyBlbHNlIGRvZXMuXG4gKiBEdXJpbmcgYSBiYXRjaCBgb25CZWNvbWVVbm9ic2VydmVkYCB3aWxsIGJlIGNhbGxlZCBhdCBtb3N0IG9uY2UgcGVyIG9ic2VydmFibGUuXG4gKiBBdm9pZHMgdW5uZWNlc3NhcnkgcmVjYWxjdWxhdGlvbnMuXG4gKi9cbmZ1bmN0aW9uIHN0YXJ0QmF0Y2gkJDEoKSB7XG4gICAgZ2xvYmFsU3RhdGUkJDEuaW5CYXRjaCsrO1xufVxuZnVuY3Rpb24gZW5kQmF0Y2gkJDEoKSB7XG4gICAgaWYgKC0tZ2xvYmFsU3RhdGUkJDEuaW5CYXRjaCA9PT0gMCkge1xuICAgICAgICBydW5SZWFjdGlvbnMkJDEoKTtcbiAgICAgICAgLy8gdGhlIGJhdGNoIGlzIGFjdHVhbGx5IGFib3V0IHRvIGZpbmlzaCwgYWxsIHVub2JzZXJ2aW5nIHNob3VsZCBoYXBwZW4gaGVyZS5cbiAgICAgICAgdmFyIGxpc3QgPSBnbG9iYWxTdGF0ZSQkMS5wZW5kaW5nVW5vYnNlcnZhdGlvbnM7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIG9ic2VydmFibGUkJDEgPSBsaXN0W2ldO1xuICAgICAgICAgICAgb2JzZXJ2YWJsZSQkMS5pc1BlbmRpbmdVbm9ic2VydmF0aW9uID0gZmFsc2U7XG4gICAgICAgICAgICBpZiAob2JzZXJ2YWJsZSQkMS5vYnNlcnZlcnMuc2l6ZSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGlmIChvYnNlcnZhYmxlJCQxLmlzQmVpbmdPYnNlcnZlZCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBpZiB0aGlzIG9ic2VydmFibGUgaGFkIHJlYWN0aXZlIG9ic2VydmVycywgdHJpZ2dlciB0aGUgaG9va3NcbiAgICAgICAgICAgICAgICAgICAgb2JzZXJ2YWJsZSQkMS5pc0JlaW5nT2JzZXJ2ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgb2JzZXJ2YWJsZSQkMS5vbkJlY29tZVVub2JzZXJ2ZWQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKG9ic2VydmFibGUkJDEgaW5zdGFuY2VvZiBDb21wdXRlZFZhbHVlJCQxKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbXB1dGVkIHZhbHVlcyBhcmUgYXV0b21hdGljYWxseSB0ZWFyZWQgZG93biB3aGVuIHRoZSBsYXN0IG9ic2VydmVyIGxlYXZlc1xuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzIHByb2Nlc3MgaGFwcGVucyByZWN1cnNpdmVseSwgdGhpcyBjb21wdXRlZCBtaWdodCBiZSB0aGUgbGFzdCBvYnNlcnZhYmUgb2YgYW5vdGhlciwgZXRjLi5cbiAgICAgICAgICAgICAgICAgICAgb2JzZXJ2YWJsZSQkMS5zdXNwZW5kKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGdsb2JhbFN0YXRlJCQxLnBlbmRpbmdVbm9ic2VydmF0aW9ucyA9IFtdO1xuICAgIH1cbn1cbmZ1bmN0aW9uIHJlcG9ydE9ic2VydmVkJCQxKG9ic2VydmFibGUkJDEpIHtcbiAgICB2YXIgZGVyaXZhdGlvbiA9IGdsb2JhbFN0YXRlJCQxLnRyYWNraW5nRGVyaXZhdGlvbjtcbiAgICBpZiAoZGVyaXZhdGlvbiAhPT0gbnVsbCkge1xuICAgICAgICAvKipcbiAgICAgICAgICogU2ltcGxlIG9wdGltaXphdGlvbiwgZ2l2ZSBlYWNoIGRlcml2YXRpb24gcnVuIGFuIHVuaXF1ZSBpZCAocnVuSWQpXG4gICAgICAgICAqIENoZWNrIGlmIGxhc3QgdGltZSB0aGlzIG9ic2VydmFibGUgd2FzIGFjY2Vzc2VkIHRoZSBzYW1lIHJ1bklkIGlzIHVzZWRcbiAgICAgICAgICogaWYgdGhpcyBpcyB0aGUgY2FzZSwgdGhlIHJlbGF0aW9uIGlzIGFscmVhZHkga25vd25cbiAgICAgICAgICovXG4gICAgICAgIGlmIChkZXJpdmF0aW9uLnJ1bklkICE9PSBvYnNlcnZhYmxlJCQxLmxhc3RBY2Nlc3NlZEJ5KSB7XG4gICAgICAgICAgICBvYnNlcnZhYmxlJCQxLmxhc3RBY2Nlc3NlZEJ5ID0gZGVyaXZhdGlvbi5ydW5JZDtcbiAgICAgICAgICAgIC8vIFRyaWVkIHN0b3JpbmcgbmV3T2JzZXJ2aW5nLCBvciBvYnNlcnZpbmcsIG9yIGJvdGggYXMgU2V0LCBidXQgcGVyZm9ybWFuY2UgZGlkbid0IGNvbWUgY2xvc2UuLi5cbiAgICAgICAgICAgIGRlcml2YXRpb24ubmV3T2JzZXJ2aW5nW2Rlcml2YXRpb24udW5ib3VuZERlcHNDb3VudCsrXSA9IG9ic2VydmFibGUkJDE7XG4gICAgICAgICAgICBpZiAoIW9ic2VydmFibGUkJDEuaXNCZWluZ09ic2VydmVkKSB7XG4gICAgICAgICAgICAgICAgb2JzZXJ2YWJsZSQkMS5pc0JlaW5nT2JzZXJ2ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIG9ic2VydmFibGUkJDEub25CZWNvbWVPYnNlcnZlZCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBlbHNlIGlmIChvYnNlcnZhYmxlJCQxLm9ic2VydmVycy5zaXplID09PSAwICYmIGdsb2JhbFN0YXRlJCQxLmluQmF0Y2ggPiAwKSB7XG4gICAgICAgIHF1ZXVlRm9yVW5vYnNlcnZhdGlvbiQkMShvYnNlcnZhYmxlJCQxKTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xufVxuLy8gZnVuY3Rpb24gaW52YXJpYW50TE9TKG9ic2VydmFibGU6IElPYnNlcnZhYmxlLCBtc2c6IHN0cmluZykge1xuLy8gICAgIC8vIGl0J3MgZXhwZW5zaXZlIHNvIGJldHRlciBub3QgcnVuIGl0IGluIHByb2R1Y2l0b24uIGJ1dCB0ZW1wb3JhcmlseSBoZWxwZnVsIGZvciB0ZXN0aW5nXG4vLyAgICAgY29uc3QgbWluID0gZ2V0T2JzZXJ2ZXJzKG9ic2VydmFibGUpLnJlZHVjZSgoYSwgYikgPT4gTWF0aC5taW4oYSwgYi5kZXBlbmRlbmNpZXNTdGF0ZSksIDIpXG4vLyAgICAgaWYgKG1pbiA+PSBvYnNlcnZhYmxlLmxvd2VzdE9ic2VydmVyU3RhdGUpIHJldHVybiAvLyA8LSB0aGUgb25seSBhc3N1bXB0aW9uIGFib3V0IGBsb3dlc3RPYnNlcnZlclN0YXRlYFxuLy8gICAgIHRocm93IG5ldyBFcnJvcihcbi8vICAgICAgICAgXCJsb3dlc3RPYnNlcnZlclN0YXRlIGlzIHdyb25nIGZvciBcIiArXG4vLyAgICAgICAgICAgICBtc2cgK1xuLy8gICAgICAgICAgICAgXCIgYmVjYXVzZSBcIiArXG4vLyAgICAgICAgICAgICBtaW4gK1xuLy8gICAgICAgICAgICAgXCIgPCBcIiArXG4vLyAgICAgICAgICAgICBvYnNlcnZhYmxlLmxvd2VzdE9ic2VydmVyU3RhdGVcbi8vICAgICApXG4vLyB9XG4vKipcbiAqIE5PVEU6IGN1cnJlbnQgcHJvcGFnYXRpb24gbWVjaGFuaXNtIHdpbGwgaW4gY2FzZSBvZiBzZWxmIHJlcnVuaW5nIGF1dG9ydW5zIGJlaGF2ZSB1bmV4cGVjdGVkbHlcbiAqIEl0IHdpbGwgcHJvcGFnYXRlIGNoYW5nZXMgdG8gb2JzZXJ2ZXJzIGZyb20gcHJldmlvdXMgcnVuXG4gKiBJdCdzIGhhcmQgb3IgbWF5YmUgaW1wb3NzaWJsZSAod2l0aCByZWFzb25hYmxlIHBlcmYpIHRvIGdldCBpdCByaWdodCB3aXRoIGN1cnJlbnQgYXBwcm9hY2hcbiAqIEhvcGVmdWxseSBzZWxmIHJlcnVuaW5nIGF1dG9ydW5zIGFyZW4ndCBhIGZlYXR1cmUgcGVvcGxlIHNob3VsZCBkZXBlbmQgb25cbiAqIEFsc28gbW9zdCBiYXNpYyB1c2UgY2FzZXMgc2hvdWxkIGJlIG9rXG4gKi9cbi8vIENhbGxlZCBieSBBdG9tIHdoZW4gaXRzIHZhbHVlIGNoYW5nZXNcbmZ1bmN0aW9uIHByb3BhZ2F0ZUNoYW5nZWQkJDEob2JzZXJ2YWJsZSQkMSkge1xuICAgIC8vIGludmFyaWFudExPUyhvYnNlcnZhYmxlLCBcImNoYW5nZWQgc3RhcnRcIik7XG4gICAgaWYgKG9ic2VydmFibGUkJDEubG93ZXN0T2JzZXJ2ZXJTdGF0ZSA9PT0gSURlcml2YXRpb25TdGF0ZS5TVEFMRSlcbiAgICAgICAgcmV0dXJuO1xuICAgIG9ic2VydmFibGUkJDEubG93ZXN0T2JzZXJ2ZXJTdGF0ZSA9IElEZXJpdmF0aW9uU3RhdGUuU1RBTEU7XG4gICAgLy8gSWRlYWxseSB3ZSB1c2UgZm9yLi5vZiBoZXJlLCBidXQgdGhlIGRvd25jb21waWxlZCB2ZXJzaW9uIGlzIHJlYWxseSBzbG93Li4uXG4gICAgb2JzZXJ2YWJsZSQkMS5vYnNlcnZlcnMuZm9yRWFjaChmdW5jdGlvbiAoZCkge1xuICAgICAgICBpZiAoZC5kZXBlbmRlbmNpZXNTdGF0ZSA9PT0gSURlcml2YXRpb25TdGF0ZS5VUF9UT19EQVRFKSB7XG4gICAgICAgICAgICBpZiAoZC5pc1RyYWNpbmcgIT09IFRyYWNlTW9kZSQkMS5OT05FKSB7XG4gICAgICAgICAgICAgICAgbG9nVHJhY2VJbmZvKGQsIG9ic2VydmFibGUkJDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZC5vbkJlY29tZVN0YWxlKCk7XG4gICAgICAgIH1cbiAgICAgICAgZC5kZXBlbmRlbmNpZXNTdGF0ZSA9IElEZXJpdmF0aW9uU3RhdGUuU1RBTEU7XG4gICAgfSk7XG4gICAgLy8gaW52YXJpYW50TE9TKG9ic2VydmFibGUsIFwiY2hhbmdlZCBlbmRcIik7XG59XG4vLyBDYWxsZWQgYnkgQ29tcHV0ZWRWYWx1ZSB3aGVuIGl0IHJlY2FsY3VsYXRlIGFuZCBpdHMgdmFsdWUgY2hhbmdlZFxuZnVuY3Rpb24gcHJvcGFnYXRlQ2hhbmdlQ29uZmlybWVkJCQxKG9ic2VydmFibGUkJDEpIHtcbiAgICAvLyBpbnZhcmlhbnRMT1Mob2JzZXJ2YWJsZSwgXCJjb25maXJtZWQgc3RhcnRcIik7XG4gICAgaWYgKG9ic2VydmFibGUkJDEubG93ZXN0T2JzZXJ2ZXJTdGF0ZSA9PT0gSURlcml2YXRpb25TdGF0ZS5TVEFMRSlcbiAgICAgICAgcmV0dXJuO1xuICAgIG9ic2VydmFibGUkJDEubG93ZXN0T2JzZXJ2ZXJTdGF0ZSA9IElEZXJpdmF0aW9uU3RhdGUuU1RBTEU7XG4gICAgb2JzZXJ2YWJsZSQkMS5vYnNlcnZlcnMuZm9yRWFjaChmdW5jdGlvbiAoZCkge1xuICAgICAgICBpZiAoZC5kZXBlbmRlbmNpZXNTdGF0ZSA9PT0gSURlcml2YXRpb25TdGF0ZS5QT1NTSUJMWV9TVEFMRSlcbiAgICAgICAgICAgIGQuZGVwZW5kZW5jaWVzU3RhdGUgPSBJRGVyaXZhdGlvblN0YXRlLlNUQUxFO1xuICAgICAgICBlbHNlIGlmIChkLmRlcGVuZGVuY2llc1N0YXRlID09PSBJRGVyaXZhdGlvblN0YXRlLlVQX1RPX0RBVEUgLy8gdGhpcyBoYXBwZW5zIGR1cmluZyBjb21wdXRpbmcgb2YgYGRgLCBqdXN0IGtlZXAgbG93ZXN0T2JzZXJ2ZXJTdGF0ZSB1cCB0byBkYXRlLlxuICAgICAgICApXG4gICAgICAgICAgICBvYnNlcnZhYmxlJCQxLmxvd2VzdE9ic2VydmVyU3RhdGUgPSBJRGVyaXZhdGlvblN0YXRlLlVQX1RPX0RBVEU7XG4gICAgfSk7XG4gICAgLy8gaW52YXJpYW50TE9TKG9ic2VydmFibGUsIFwiY29uZmlybWVkIGVuZFwiKTtcbn1cbi8vIFVzZWQgYnkgY29tcHV0ZWQgd2hlbiBpdHMgZGVwZW5kZW5jeSBjaGFuZ2VkLCBidXQgd2UgZG9uJ3Qgd2FuJ3QgdG8gaW1tZWRpYXRlbHkgcmVjb21wdXRlLlxuZnVuY3Rpb24gcHJvcGFnYXRlTWF5YmVDaGFuZ2VkJCQxKG9ic2VydmFibGUkJDEpIHtcbiAgICAvLyBpbnZhcmlhbnRMT1Mob2JzZXJ2YWJsZSwgXCJtYXliZSBzdGFydFwiKTtcbiAgICBpZiAob2JzZXJ2YWJsZSQkMS5sb3dlc3RPYnNlcnZlclN0YXRlICE9PSBJRGVyaXZhdGlvblN0YXRlLlVQX1RPX0RBVEUpXG4gICAgICAgIHJldHVybjtcbiAgICBvYnNlcnZhYmxlJCQxLmxvd2VzdE9ic2VydmVyU3RhdGUgPSBJRGVyaXZhdGlvblN0YXRlLlBPU1NJQkxZX1NUQUxFO1xuICAgIG9ic2VydmFibGUkJDEub2JzZXJ2ZXJzLmZvckVhY2goZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgaWYgKGQuZGVwZW5kZW5jaWVzU3RhdGUgPT09IElEZXJpdmF0aW9uU3RhdGUuVVBfVE9fREFURSkge1xuICAgICAgICAgICAgZC5kZXBlbmRlbmNpZXNTdGF0ZSA9IElEZXJpdmF0aW9uU3RhdGUuUE9TU0lCTFlfU1RBTEU7XG4gICAgICAgICAgICBpZiAoZC5pc1RyYWNpbmcgIT09IFRyYWNlTW9kZSQkMS5OT05FKSB7XG4gICAgICAgICAgICAgICAgbG9nVHJhY2VJbmZvKGQsIG9ic2VydmFibGUkJDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZC5vbkJlY29tZVN0YWxlKCk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICAvLyBpbnZhcmlhbnRMT1Mob2JzZXJ2YWJsZSwgXCJtYXliZSBlbmRcIik7XG59XG5mdW5jdGlvbiBsb2dUcmFjZUluZm8oZGVyaXZhdGlvbiwgb2JzZXJ2YWJsZSQkMSkge1xuICAgIGNvbnNvbGUubG9nKFwiW21vYngudHJhY2VdICdcIiArIGRlcml2YXRpb24ubmFtZSArIFwiJyBpcyBpbnZhbGlkYXRlZCBkdWUgdG8gYSBjaGFuZ2UgaW46ICdcIiArIG9ic2VydmFibGUkJDEubmFtZSArIFwiJ1wiKTtcbiAgICBpZiAoZGVyaXZhdGlvbi5pc1RyYWNpbmcgPT09IFRyYWNlTW9kZSQkMS5CUkVBSykge1xuICAgICAgICB2YXIgbGluZXMgPSBbXTtcbiAgICAgICAgcHJpbnREZXBUcmVlKGdldERlcGVuZGVuY3lUcmVlJCQxKGRlcml2YXRpb24pLCBsaW5lcywgMSk7XG4gICAgICAgIC8vIHByZXR0aWVyLWlnbm9yZVxuICAgICAgICBuZXcgRnVuY3Rpb24oXCJkZWJ1Z2dlcjtcXG4vKlxcblRyYWNpbmcgJ1wiICsgZGVyaXZhdGlvbi5uYW1lICsgXCInXFxuXFxuWW91IGFyZSBlbnRlcmluZyB0aGlzIGJyZWFrIHBvaW50IGJlY2F1c2UgZGVyaXZhdGlvbiAnXCIgKyBkZXJpdmF0aW9uLm5hbWUgKyBcIicgaXMgYmVpbmcgdHJhY2VkIGFuZCAnXCIgKyBvYnNlcnZhYmxlJCQxLm5hbWUgKyBcIicgaXMgbm93IGZvcmNpbmcgaXQgdG8gdXBkYXRlLlxcbkp1c3QgZm9sbG93IHRoZSBzdGFja3RyYWNlIHlvdSBzaG91bGQgbm93IHNlZSBpbiB0aGUgZGV2dG9vbHMgdG8gc2VlIHByZWNpc2VseSB3aGF0IHBpZWNlIG9mIHlvdXIgY29kZSBpcyBjYXVzaW5nIHRoaXMgdXBkYXRlXFxuVGhlIHN0YWNrZnJhbWUgeW91IGFyZSBsb29raW5nIGZvciBpcyBhdCBsZWFzdCB+Ni04IHN0YWNrLWZyYW1lcyB1cC5cXG5cXG5cIiArIChkZXJpdmF0aW9uIGluc3RhbmNlb2YgQ29tcHV0ZWRWYWx1ZSQkMSA/IGRlcml2YXRpb24uZGVyaXZhdGlvbi50b1N0cmluZygpLnJlcGxhY2UoL1sqXVxcLy9nLCBcIi9cIikgOiBcIlwiKSArIFwiXFxuXFxuVGhlIGRlcGVuZGVuY2llcyBmb3IgdGhpcyBkZXJpdmF0aW9uIGFyZTpcXG5cXG5cIiArIGxpbmVzLmpvaW4oXCJcXG5cIikgKyBcIlxcbiovXFxuICAgIFwiKSgpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIHByaW50RGVwVHJlZSh0cmVlLCBsaW5lcywgZGVwdGgpIHtcbiAgICBpZiAobGluZXMubGVuZ3RoID49IDEwMDApIHtcbiAgICAgICAgbGluZXMucHVzaChcIihhbmQgbWFueSBtb3JlKVwiKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBsaW5lcy5wdXNoKFwiXCIgKyBuZXcgQXJyYXkoZGVwdGgpLmpvaW4oXCJcXHRcIikgKyB0cmVlLm5hbWUpOyAvLyBNV0U6IG5vdCB0aGUgZmFzdGVzdCwgYnV0IHRoZSBlYXNpZXN0IHdheSA6KVxuICAgIGlmICh0cmVlLmRlcGVuZGVuY2llcylcbiAgICAgICAgdHJlZS5kZXBlbmRlbmNpZXMuZm9yRWFjaChmdW5jdGlvbiAoY2hpbGQpIHsgcmV0dXJuIHByaW50RGVwVHJlZShjaGlsZCwgbGluZXMsIGRlcHRoICsgMSk7IH0pO1xufVxuXG52YXIgUmVhY3Rpb24kJDEgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gUmVhY3Rpb24kJDEobmFtZSwgb25JbnZhbGlkYXRlLCBlcnJvckhhbmRsZXIpIHtcbiAgICAgICAgaWYgKG5hbWUgPT09IHZvaWQgMCkgeyBuYW1lID0gXCJSZWFjdGlvbkBcIiArIGdldE5leHRJZCQkMSgpOyB9XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMub25JbnZhbGlkYXRlID0gb25JbnZhbGlkYXRlO1xuICAgICAgICB0aGlzLmVycm9ySGFuZGxlciA9IGVycm9ySGFuZGxlcjtcbiAgICAgICAgdGhpcy5vYnNlcnZpbmcgPSBbXTsgLy8gbm9kZXMgd2UgYXJlIGxvb2tpbmcgYXQuIE91ciB2YWx1ZSBkZXBlbmRzIG9uIHRoZXNlIG5vZGVzXG4gICAgICAgIHRoaXMubmV3T2JzZXJ2aW5nID0gW107XG4gICAgICAgIHRoaXMuZGVwZW5kZW5jaWVzU3RhdGUgPSBJRGVyaXZhdGlvblN0YXRlLk5PVF9UUkFDS0lORztcbiAgICAgICAgdGhpcy5kaWZmVmFsdWUgPSAwO1xuICAgICAgICB0aGlzLnJ1bklkID0gMDtcbiAgICAgICAgdGhpcy51bmJvdW5kRGVwc0NvdW50ID0gMDtcbiAgICAgICAgdGhpcy5fX21hcGlkID0gXCIjXCIgKyBnZXROZXh0SWQkJDEoKTtcbiAgICAgICAgdGhpcy5pc0Rpc3Bvc2VkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2lzU2NoZWR1bGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2lzVHJhY2tQZW5kaW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2lzUnVubmluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzVHJhY2luZyA9IFRyYWNlTW9kZSQkMS5OT05FO1xuICAgIH1cbiAgICBSZWFjdGlvbiQkMS5wcm90b3R5cGUub25CZWNvbWVTdGFsZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5zY2hlZHVsZSgpO1xuICAgIH07XG4gICAgUmVhY3Rpb24kJDEucHJvdG90eXBlLnNjaGVkdWxlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIXRoaXMuX2lzU2NoZWR1bGVkKSB7XG4gICAgICAgICAgICB0aGlzLl9pc1NjaGVkdWxlZCA9IHRydWU7XG4gICAgICAgICAgICBnbG9iYWxTdGF0ZSQkMS5wZW5kaW5nUmVhY3Rpb25zLnB1c2godGhpcyk7XG4gICAgICAgICAgICBydW5SZWFjdGlvbnMkJDEoKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgUmVhY3Rpb24kJDEucHJvdG90eXBlLmlzU2NoZWR1bGVkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faXNTY2hlZHVsZWQ7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBpbnRlcm5hbCwgdXNlIHNjaGVkdWxlKCkgaWYgeW91IGludGVuZCB0byBraWNrIG9mZiBhIHJlYWN0aW9uXG4gICAgICovXG4gICAgUmVhY3Rpb24kJDEucHJvdG90eXBlLnJ1blJlYWN0aW9uID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIXRoaXMuaXNEaXNwb3NlZCkge1xuICAgICAgICAgICAgc3RhcnRCYXRjaCQkMSgpO1xuICAgICAgICAgICAgdGhpcy5faXNTY2hlZHVsZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIGlmIChzaG91bGRDb21wdXRlJCQxKHRoaXMpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5faXNUcmFja1BlbmRpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25JbnZhbGlkYXRlKCk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9pc1RyYWNrUGVuZGluZyAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgaXNTcHlFbmFibGVkJCQxKCkgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gb25JbnZhbGlkYXRlIGRpZG4ndCB0cmlnZ2VyIHRyYWNrIHJpZ2h0IGF3YXkuLlxuICAgICAgICAgICAgICAgICAgICAgICAgc3B5UmVwb3J0JCQxKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiB0aGlzLm5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJzY2hlZHVsZWQtcmVhY3Rpb25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXBvcnRFeGNlcHRpb25JbkRlcml2YXRpb24oZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZW5kQmF0Y2gkJDEoKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgUmVhY3Rpb24kJDEucHJvdG90eXBlLnRyYWNrID0gZnVuY3Rpb24gKGZuKSB7XG4gICAgICAgIGlmICh0aGlzLmlzRGlzcG9zZWQpIHtcbiAgICAgICAgICAgIGZhaWwkJDEoXCJSZWFjdGlvbiBhbHJlYWR5IGRpc3Bvc2VkXCIpO1xuICAgICAgICB9XG4gICAgICAgIHN0YXJ0QmF0Y2gkJDEoKTtcbiAgICAgICAgdmFyIG5vdGlmeSA9IGlzU3B5RW5hYmxlZCQkMSgpO1xuICAgICAgICB2YXIgc3RhcnRUaW1lO1xuICAgICAgICBpZiAobm90aWZ5ICYmIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xuICAgICAgICAgICAgc3RhcnRUaW1lID0gRGF0ZS5ub3coKTtcbiAgICAgICAgICAgIHNweVJlcG9ydFN0YXJ0JCQxKHtcbiAgICAgICAgICAgICAgICBuYW1lOiB0aGlzLm5hbWUsXG4gICAgICAgICAgICAgICAgdHlwZTogXCJyZWFjdGlvblwiXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9pc1J1bm5pbmcgPSB0cnVlO1xuICAgICAgICB2YXIgcmVzdWx0ID0gdHJhY2tEZXJpdmVkRnVuY3Rpb24kJDEodGhpcywgZm4sIHVuZGVmaW5lZCk7XG4gICAgICAgIHRoaXMuX2lzUnVubmluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9pc1RyYWNrUGVuZGluZyA9IGZhbHNlO1xuICAgICAgICBpZiAodGhpcy5pc0Rpc3Bvc2VkKSB7XG4gICAgICAgICAgICAvLyBkaXNwb3NlZCBkdXJpbmcgbGFzdCBydW4uIENsZWFuIHVwIGV2ZXJ5dGhpbmcgdGhhdCB3YXMgYm91bmQgYWZ0ZXIgdGhlIGRpc3Bvc2UgY2FsbC5cbiAgICAgICAgICAgIGNsZWFyT2JzZXJ2aW5nJCQxKHRoaXMpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc0NhdWdodEV4Y2VwdGlvbiQkMShyZXN1bHQpKVxuICAgICAgICAgICAgdGhpcy5yZXBvcnRFeGNlcHRpb25JbkRlcml2YXRpb24ocmVzdWx0LmNhdXNlKTtcbiAgICAgICAgaWYgKG5vdGlmeSAmJiBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgICAgICAgICAgIHNweVJlcG9ydEVuZCQkMSh7XG4gICAgICAgICAgICAgICAgdGltZTogRGF0ZS5ub3coKSAtIHN0YXJ0VGltZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZW5kQmF0Y2gkJDEoKTtcbiAgICB9O1xuICAgIFJlYWN0aW9uJCQxLnByb3RvdHlwZS5yZXBvcnRFeGNlcHRpb25JbkRlcml2YXRpb24gPSBmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgaWYgKHRoaXMuZXJyb3JIYW5kbGVyKSB7XG4gICAgICAgICAgICB0aGlzLmVycm9ySGFuZGxlcihlcnJvciwgdGhpcyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGdsb2JhbFN0YXRlJCQxLmRpc2FibGVFcnJvckJvdW5kYXJpZXMpXG4gICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgdmFyIG1lc3NhZ2UgPSBcIlttb2J4XSBFbmNvdW50ZXJlZCBhbiB1bmNhdWdodCBleGNlcHRpb24gdGhhdCB3YXMgdGhyb3duIGJ5IGEgcmVhY3Rpb24gb3Igb2JzZXJ2ZXIgY29tcG9uZW50LCBpbjogJ1wiICsgdGhpcyArIFwiJ1wiO1xuICAgICAgICBpZiAoZ2xvYmFsU3RhdGUkJDEuc3VwcHJlc3NSZWFjdGlvbkVycm9ycykge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKFwiW21vYnhdIChlcnJvciBpbiByZWFjdGlvbiAnXCIgKyB0aGlzLm5hbWUgKyBcIicgc3VwcHJlc3NlZCwgZml4IGVycm9yIG9mIGNhdXNpbmcgYWN0aW9uIGJlbG93KVwiKTsgLy8gcHJldHRpZXItaWdub3JlXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKG1lc3NhZ2UsIGVycm9yKTtcbiAgICAgICAgICAgIC8qKiBJZiBkZWJ1Z2dpbmcgYnJvdWdodCB5b3UgaGVyZSwgcGxlYXNlLCByZWFkIHRoZSBhYm92ZSBtZXNzYWdlIDotKS4gVG54ISAqL1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc1NweUVuYWJsZWQkJDEoKSkge1xuICAgICAgICAgICAgc3B5UmVwb3J0JCQxKHtcbiAgICAgICAgICAgICAgICB0eXBlOiBcImVycm9yXCIsXG4gICAgICAgICAgICAgICAgbmFtZTogdGhpcy5uYW1lLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IG1lc3NhZ2UsXG4gICAgICAgICAgICAgICAgZXJyb3I6IFwiXCIgKyBlcnJvclxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZ2xvYmFsU3RhdGUkJDEuZ2xvYmFsUmVhY3Rpb25FcnJvckhhbmRsZXJzLmZvckVhY2goZnVuY3Rpb24gKGYpIHsgcmV0dXJuIGYoZXJyb3IsIF90aGlzKTsgfSk7XG4gICAgfTtcbiAgICBSZWFjdGlvbiQkMS5wcm90b3R5cGUuZGlzcG9zZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzRGlzcG9zZWQpIHtcbiAgICAgICAgICAgIHRoaXMuaXNEaXNwb3NlZCA9IHRydWU7XG4gICAgICAgICAgICBpZiAoIXRoaXMuX2lzUnVubmluZykge1xuICAgICAgICAgICAgICAgIC8vIGlmIGRpc3Bvc2VkIHdoaWxlIHJ1bm5pbmcsIGNsZWFuIHVwIGxhdGVyLiBNYXliZSBub3Qgb3B0aW1hbCwgYnV0IHJhcmUgY2FzZVxuICAgICAgICAgICAgICAgIHN0YXJ0QmF0Y2gkJDEoKTtcbiAgICAgICAgICAgICAgICBjbGVhck9ic2VydmluZyQkMSh0aGlzKTtcbiAgICAgICAgICAgICAgICBlbmRCYXRjaCQkMSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICBSZWFjdGlvbiQkMS5wcm90b3R5cGUuZ2V0RGlzcG9zZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciByID0gdGhpcy5kaXNwb3NlLmJpbmQodGhpcyk7XG4gICAgICAgIHJbJG1vYngkJDFdID0gdGhpcztcbiAgICAgICAgcmV0dXJuIHI7XG4gICAgfTtcbiAgICBSZWFjdGlvbiQkMS5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBcIlJlYWN0aW9uW1wiICsgdGhpcy5uYW1lICsgXCJdXCI7XG4gICAgfTtcbiAgICBSZWFjdGlvbiQkMS5wcm90b3R5cGUudHJhY2UgPSBmdW5jdGlvbiAoZW50ZXJCcmVha1BvaW50KSB7XG4gICAgICAgIGlmIChlbnRlckJyZWFrUG9pbnQgPT09IHZvaWQgMCkgeyBlbnRlckJyZWFrUG9pbnQgPSBmYWxzZTsgfVxuICAgICAgICB0cmFjZSQkMSh0aGlzLCBlbnRlckJyZWFrUG9pbnQpO1xuICAgIH07XG4gICAgcmV0dXJuIFJlYWN0aW9uJCQxO1xufSgpKTtcbmZ1bmN0aW9uIG9uUmVhY3Rpb25FcnJvciQkMShoYW5kbGVyKSB7XG4gICAgZ2xvYmFsU3RhdGUkJDEuZ2xvYmFsUmVhY3Rpb25FcnJvckhhbmRsZXJzLnB1c2goaGFuZGxlcik7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGlkeCA9IGdsb2JhbFN0YXRlJCQxLmdsb2JhbFJlYWN0aW9uRXJyb3JIYW5kbGVycy5pbmRleE9mKGhhbmRsZXIpO1xuICAgICAgICBpZiAoaWR4ID49IDApXG4gICAgICAgICAgICBnbG9iYWxTdGF0ZSQkMS5nbG9iYWxSZWFjdGlvbkVycm9ySGFuZGxlcnMuc3BsaWNlKGlkeCwgMSk7XG4gICAgfTtcbn1cbi8qKlxuICogTWFnaWMgbnVtYmVyIGFsZXJ0IVxuICogRGVmaW5lcyB3aXRoaW4gaG93IG1hbnkgdGltZXMgYSByZWFjdGlvbiBpcyBhbGxvd2VkIHRvIHJlLXRyaWdnZXIgaXRzZWxmXG4gKiB1bnRpbCBpdCBpcyBhc3N1bWVkIHRoYXQgdGhpcyBpcyBnb25uYSBiZSBhIG5ldmVyIGVuZGluZyBsb29wLi4uXG4gKi9cbnZhciBNQVhfUkVBQ1RJT05fSVRFUkFUSU9OUyA9IDEwMDtcbnZhciByZWFjdGlvblNjaGVkdWxlciA9IGZ1bmN0aW9uIChmKSB7IHJldHVybiBmKCk7IH07XG5mdW5jdGlvbiBydW5SZWFjdGlvbnMkJDEoKSB7XG4gICAgLy8gVHJhbXBvbGluaW5nLCBpZiBydW5SZWFjdGlvbnMgYXJlIGFscmVhZHkgcnVubmluZywgbmV3IHJlYWN0aW9ucyB3aWxsIGJlIHBpY2tlZCB1cFxuICAgIGlmIChnbG9iYWxTdGF0ZSQkMS5pbkJhdGNoID4gMCB8fCBnbG9iYWxTdGF0ZSQkMS5pc1J1bm5pbmdSZWFjdGlvbnMpXG4gICAgICAgIHJldHVybjtcbiAgICByZWFjdGlvblNjaGVkdWxlcihydW5SZWFjdGlvbnNIZWxwZXIpO1xufVxuZnVuY3Rpb24gcnVuUmVhY3Rpb25zSGVscGVyKCkge1xuICAgIGdsb2JhbFN0YXRlJCQxLmlzUnVubmluZ1JlYWN0aW9ucyA9IHRydWU7XG4gICAgdmFyIGFsbFJlYWN0aW9ucyA9IGdsb2JhbFN0YXRlJCQxLnBlbmRpbmdSZWFjdGlvbnM7XG4gICAgdmFyIGl0ZXJhdGlvbnMgPSAwO1xuICAgIC8vIFdoaWxlIHJ1bm5pbmcgcmVhY3Rpb25zLCBuZXcgcmVhY3Rpb25zIG1pZ2h0IGJlIHRyaWdnZXJlZC5cbiAgICAvLyBIZW5jZSB3ZSB3b3JrIHdpdGggdHdvIHZhcmlhYmxlcyBhbmQgY2hlY2sgd2hldGhlclxuICAgIC8vIHdlIGNvbnZlcmdlIHRvIG5vIHJlbWFpbmluZyByZWFjdGlvbnMgYWZ0ZXIgYSB3aGlsZS5cbiAgICB3aGlsZSAoYWxsUmVhY3Rpb25zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgaWYgKCsraXRlcmF0aW9ucyA9PT0gTUFYX1JFQUNUSU9OX0lURVJBVElPTlMpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJSZWFjdGlvbiBkb2Vzbid0IGNvbnZlcmdlIHRvIGEgc3RhYmxlIHN0YXRlIGFmdGVyIFwiICsgTUFYX1JFQUNUSU9OX0lURVJBVElPTlMgKyBcIiBpdGVyYXRpb25zLlwiICtcbiAgICAgICAgICAgICAgICAoXCIgUHJvYmFibHkgdGhlcmUgaXMgYSBjeWNsZSBpbiB0aGUgcmVhY3RpdmUgZnVuY3Rpb246IFwiICsgYWxsUmVhY3Rpb25zWzBdKSk7XG4gICAgICAgICAgICBhbGxSZWFjdGlvbnMuc3BsaWNlKDApOyAvLyBjbGVhciByZWFjdGlvbnNcbiAgICAgICAgfVxuICAgICAgICB2YXIgcmVtYWluaW5nUmVhY3Rpb25zID0gYWxsUmVhY3Rpb25zLnNwbGljZSgwKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSByZW1haW5pbmdSZWFjdGlvbnMubGVuZ3RoOyBpIDwgbDsgaSsrKVxuICAgICAgICAgICAgcmVtYWluaW5nUmVhY3Rpb25zW2ldLnJ1blJlYWN0aW9uKCk7XG4gICAgfVxuICAgIGdsb2JhbFN0YXRlJCQxLmlzUnVubmluZ1JlYWN0aW9ucyA9IGZhbHNlO1xufVxudmFyIGlzUmVhY3Rpb24kJDEgPSBjcmVhdGVJbnN0YW5jZW9mUHJlZGljYXRlJCQxKFwiUmVhY3Rpb25cIiwgUmVhY3Rpb24kJDEpO1xuZnVuY3Rpb24gc2V0UmVhY3Rpb25TY2hlZHVsZXIkJDEoZm4pIHtcbiAgICB2YXIgYmFzZVNjaGVkdWxlciA9IHJlYWN0aW9uU2NoZWR1bGVyO1xuICAgIHJlYWN0aW9uU2NoZWR1bGVyID0gZnVuY3Rpb24gKGYpIHsgcmV0dXJuIGZuKGZ1bmN0aW9uICgpIHsgcmV0dXJuIGJhc2VTY2hlZHVsZXIoZik7IH0pOyB9O1xufVxuXG5mdW5jdGlvbiBpc1NweUVuYWJsZWQkJDEoKSB7XG4gICAgcmV0dXJuIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiAmJiAhIWdsb2JhbFN0YXRlJCQxLnNweUxpc3RlbmVycy5sZW5ndGg7XG59XG5mdW5jdGlvbiBzcHlSZXBvcnQkJDEoZXZlbnQpIHtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09IFwicHJvZHVjdGlvblwiKVxuICAgICAgICByZXR1cm47IC8vIGRlYWQgY29kZSBlbGltaW5hdGlvbiBjYW4gZG8gdGhlIHJlc3RcbiAgICBpZiAoIWdsb2JhbFN0YXRlJCQxLnNweUxpc3RlbmVycy5sZW5ndGgpXG4gICAgICAgIHJldHVybjtcbiAgICB2YXIgbGlzdGVuZXJzID0gZ2xvYmFsU3RhdGUkJDEuc3B5TGlzdGVuZXJzO1xuICAgIGZvciAodmFyIGkgPSAwLCBsID0gbGlzdGVuZXJzLmxlbmd0aDsgaSA8IGw7IGkrKylcbiAgICAgICAgbGlzdGVuZXJzW2ldKGV2ZW50KTtcbn1cbmZ1bmN0aW9uIHNweVJlcG9ydFN0YXJ0JCQxKGV2ZW50KSB7XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSBcInByb2R1Y3Rpb25cIilcbiAgICAgICAgcmV0dXJuO1xuICAgIHZhciBjaGFuZ2UgPSBfX2Fzc2lnbih7fSwgZXZlbnQsIHsgc3B5UmVwb3J0U3RhcnQ6IHRydWUgfSk7XG4gICAgc3B5UmVwb3J0JCQxKGNoYW5nZSk7XG59XG52YXIgRU5EX0VWRU5UID0geyBzcHlSZXBvcnRFbmQ6IHRydWUgfTtcbmZ1bmN0aW9uIHNweVJlcG9ydEVuZCQkMShjaGFuZ2UpIHtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09IFwicHJvZHVjdGlvblwiKVxuICAgICAgICByZXR1cm47XG4gICAgaWYgKGNoYW5nZSlcbiAgICAgICAgc3B5UmVwb3J0JCQxKF9fYXNzaWduKHt9LCBjaGFuZ2UsIHsgc3B5UmVwb3J0RW5kOiB0cnVlIH0pKTtcbiAgICBlbHNlXG4gICAgICAgIHNweVJlcG9ydCQkMShFTkRfRVZFTlQpO1xufVxuZnVuY3Rpb24gc3B5JCQxKGxpc3RlbmVyKSB7XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSBcInByb2R1Y3Rpb25cIikge1xuICAgICAgICBjb25zb2xlLndhcm4oXCJbbW9ieC5zcHldIElzIGEgbm8tb3AgaW4gcHJvZHVjdGlvbiBidWlsZHNcIik7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7IH07XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBnbG9iYWxTdGF0ZSQkMS5zcHlMaXN0ZW5lcnMucHVzaChsaXN0ZW5lcik7XG4gICAgICAgIHJldHVybiBvbmNlJCQxKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGdsb2JhbFN0YXRlJCQxLnNweUxpc3RlbmVycyA9IGdsb2JhbFN0YXRlJCQxLnNweUxpc3RlbmVycy5maWx0ZXIoZnVuY3Rpb24gKGwpIHsgcmV0dXJuIGwgIT09IGxpc3RlbmVyOyB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkb250UmVhc3NpZ25GaWVsZHMoKSB7XG4gICAgZmFpbCQkMShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgJiYgXCJAYWN0aW9uIGZpZWxkcyBhcmUgbm90IHJlYXNzaWduYWJsZVwiKTtcbn1cbmZ1bmN0aW9uIG5hbWVkQWN0aW9uRGVjb3JhdG9yJCQxKG5hbWUpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwgcHJvcCwgZGVzY3JpcHRvcikge1xuICAgICAgICBpZiAoZGVzY3JpcHRvcikge1xuICAgICAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiAmJiBkZXNjcmlwdG9yLmdldCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhaWwkJDEoXCJAYWN0aW9uIGNhbm5vdCBiZSB1c2VkIHdpdGggZ2V0dGVyc1wiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGJhYmVsIC8gdHlwZXNjcmlwdFxuICAgICAgICAgICAgLy8gQGFjdGlvbiBtZXRob2QoKSB7IH1cbiAgICAgICAgICAgIGlmIChkZXNjcmlwdG9yLnZhbHVlKSB7XG4gICAgICAgICAgICAgICAgLy8gdHlwZXNjcmlwdFxuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBjcmVhdGVBY3Rpb24kJDEobmFtZSwgZGVzY3JpcHRvci52YWx1ZSksXG4gICAgICAgICAgICAgICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIHdyaXRhYmxlOiB0cnVlIC8vIGZvciB0eXBlc2NyaXB0LCB0aGlzIG11c3QgYmUgd3JpdGFibGUsIG90aGVyd2lzZSBpdCBjYW5ub3QgaW5oZXJpdCA6LyAoc2VlIGluaGVyaXRhYmxlIGFjdGlvbnMgdGVzdClcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gYmFiZWwgb25seTogQGFjdGlvbiBtZXRob2QgPSAoKSA9PiB7fVxuICAgICAgICAgICAgdmFyIGluaXRpYWxpemVyXzEgPSBkZXNjcmlwdG9yLmluaXRpYWxpemVyO1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgICAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgICAgICAgICAgaW5pdGlhbGl6ZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gTi5COiB3ZSBjYW4ndCBpbW1lZGlhdGVseSBpbnZva2UgaW5pdGlhbGl6ZXI7IHRoaXMgd291bGQgYmUgd3JvbmdcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNyZWF0ZUFjdGlvbiQkMShuYW1lLCBpbml0aWFsaXplcl8xLmNhbGwodGhpcykpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgLy8gYm91bmQgaW5zdGFuY2UgbWV0aG9kc1xuICAgICAgICByZXR1cm4gYWN0aW9uRmllbGREZWNvcmF0b3IkJDEobmFtZSkuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9O1xufVxuZnVuY3Rpb24gYWN0aW9uRmllbGREZWNvcmF0b3IkJDEobmFtZSkge1xuICAgIC8vIFNpbXBsZSBwcm9wZXJ0eSB0aGF0IHdyaXRlcyBvbiBmaXJzdCBpbnZvY2F0aW9uIHRvIHRoZSBjdXJyZW50IGluc3RhbmNlXG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIHByb3AsIGRlc2NyaXB0b3IpIHtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgcHJvcCwge1xuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgYWRkSGlkZGVuUHJvcCQkMSh0aGlzLCBwcm9wLCBhY3Rpb24kJDEobmFtZSwgdmFsdWUpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcbn1cbmZ1bmN0aW9uIGJvdW5kQWN0aW9uRGVjb3JhdG9yJCQxKHRhcmdldCwgcHJvcGVydHlOYW1lLCBkZXNjcmlwdG9yLCBhcHBseVRvSW5zdGFuY2UpIHtcbiAgICBpZiAoYXBwbHlUb0luc3RhbmNlID09PSB0cnVlKSB7XG4gICAgICAgIGRlZmluZUJvdW5kQWN0aW9uJCQxKHRhcmdldCwgcHJvcGVydHlOYW1lLCBkZXNjcmlwdG9yLnZhbHVlKTtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGlmIChkZXNjcmlwdG9yKSB7XG4gICAgICAgIC8vIGlmIChkZXNjcmlwdG9yLnZhbHVlKVxuICAgICAgICAvLyBUeXBlc2NyaXB0IC8gQmFiZWw6IEBhY3Rpb24uYm91bmQgbWV0aG9kKCkgeyB9XG4gICAgICAgIC8vIGFsc286IGJhYmVsIEBhY3Rpb24uYm91bmQgbWV0aG9kID0gKCkgPT4ge31cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgZGVmaW5lQm91bmRBY3Rpb24kJDEodGhpcywgcHJvcGVydHlOYW1lLCBkZXNjcmlwdG9yLnZhbHVlIHx8IGRlc2NyaXB0b3IuaW5pdGlhbGl6ZXIuY2FsbCh0aGlzKSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXNbcHJvcGVydHlOYW1lXTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQ6IGRvbnRSZWFzc2lnbkZpZWxkc1xuICAgICAgICB9O1xuICAgIH1cbiAgICAvLyBmaWVsZCBkZWNvcmF0b3IgVHlwZXNjcmlwdCBAYWN0aW9uLmJvdW5kIG1ldGhvZCA9ICgpID0+IHt9XG4gICAgcmV0dXJuIHtcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAodikge1xuICAgICAgICAgICAgZGVmaW5lQm91bmRBY3Rpb24kJDEodGhpcywgcHJvcGVydHlOYW1lLCB2KTtcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgfTtcbn1cblxudmFyIGFjdGlvbiQkMSA9IGZ1bmN0aW9uIGFjdGlvbiQkMShhcmcxLCBhcmcyLCBhcmczLCBhcmc0KSB7XG4gICAgLy8gYWN0aW9uKGZuKCkge30pXG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEgJiYgdHlwZW9mIGFyZzEgPT09IFwiZnVuY3Rpb25cIilcbiAgICAgICAgcmV0dXJuIGNyZWF0ZUFjdGlvbiQkMShhcmcxLm5hbWUgfHwgXCI8dW5uYW1lZCBhY3Rpb24+XCIsIGFyZzEpO1xuICAgIC8vIGFjdGlvbihcIm5hbWVcIiwgZm4oKSB7fSlcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMiAmJiB0eXBlb2YgYXJnMiA9PT0gXCJmdW5jdGlvblwiKVxuICAgICAgICByZXR1cm4gY3JlYXRlQWN0aW9uJCQxKGFyZzEsIGFyZzIpO1xuICAgIC8vIEBhY3Rpb24oXCJuYW1lXCIpIGZuKCkge31cbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSAmJiB0eXBlb2YgYXJnMSA9PT0gXCJzdHJpbmdcIilcbiAgICAgICAgcmV0dXJuIG5hbWVkQWN0aW9uRGVjb3JhdG9yJCQxKGFyZzEpO1xuICAgIC8vIEBhY3Rpb24gZm4oKSB7fVxuICAgIGlmIChhcmc0ID09PSB0cnVlKSB7XG4gICAgICAgIC8vIGFwcGx5IHRvIGluc3RhbmNlIGltbWVkaWF0ZWx5XG4gICAgICAgIGFkZEhpZGRlblByb3AkJDEoYXJnMSwgYXJnMiwgY3JlYXRlQWN0aW9uJCQxKGFyZzEubmFtZSB8fCBhcmcyLCBhcmczLnZhbHVlLCB0aGlzKSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gbmFtZWRBY3Rpb25EZWNvcmF0b3IkJDEoYXJnMikuYXBwbHkobnVsbCwgYXJndW1lbnRzKTtcbiAgICB9XG59O1xuYWN0aW9uJCQxLmJvdW5kID0gYm91bmRBY3Rpb25EZWNvcmF0b3IkJDE7XG5mdW5jdGlvbiBydW5JbkFjdGlvbiQkMShhcmcxLCBhcmcyKSB7XG4gICAgdmFyIGFjdGlvbk5hbWUgPSB0eXBlb2YgYXJnMSA9PT0gXCJzdHJpbmdcIiA/IGFyZzEgOiBhcmcxLm5hbWUgfHwgXCI8dW5uYW1lZCBhY3Rpb24+XCI7XG4gICAgdmFyIGZuID0gdHlwZW9mIGFyZzEgPT09IFwiZnVuY3Rpb25cIiA/IGFyZzEgOiBhcmcyO1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgICAgICAgaW52YXJpYW50JCQxKHR5cGVvZiBmbiA9PT0gXCJmdW5jdGlvblwiICYmIGZuLmxlbmd0aCA9PT0gMCwgXCJgcnVuSW5BY3Rpb25gIGV4cGVjdHMgYSBmdW5jdGlvbiB3aXRob3V0IGFyZ3VtZW50c1wiKTtcbiAgICAgICAgaWYgKHR5cGVvZiBhY3Rpb25OYW1lICE9PSBcInN0cmluZ1wiIHx8ICFhY3Rpb25OYW1lKVxuICAgICAgICAgICAgZmFpbCQkMShcImFjdGlvbnMgc2hvdWxkIGhhdmUgdmFsaWQgbmFtZXMsIGdvdDogJ1wiICsgYWN0aW9uTmFtZSArIFwiJ1wiKTtcbiAgICB9XG4gICAgcmV0dXJuIGV4ZWN1dGVBY3Rpb24kJDEoYWN0aW9uTmFtZSwgZm4sIHRoaXMsIHVuZGVmaW5lZCk7XG59XG5mdW5jdGlvbiBpc0FjdGlvbiQkMSh0aGluZykge1xuICAgIHJldHVybiB0eXBlb2YgdGhpbmcgPT09IFwiZnVuY3Rpb25cIiAmJiB0aGluZy5pc01vYnhBY3Rpb24gPT09IHRydWU7XG59XG5mdW5jdGlvbiBkZWZpbmVCb3VuZEFjdGlvbiQkMSh0YXJnZXQsIHByb3BlcnR5TmFtZSwgZm4pIHtcbiAgICBhZGRIaWRkZW5Qcm9wJCQxKHRhcmdldCwgcHJvcGVydHlOYW1lLCBjcmVhdGVBY3Rpb24kJDEocHJvcGVydHlOYW1lLCBmbi5iaW5kKHRhcmdldCkpKTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgbmFtZWQgcmVhY3RpdmUgdmlldyBhbmQga2VlcHMgaXQgYWxpdmUsIHNvIHRoYXQgdGhlIHZpZXcgaXMgYWx3YXlzXG4gKiB1cGRhdGVkIGlmIG9uZSBvZiB0aGUgZGVwZW5kZW5jaWVzIGNoYW5nZXMsIGV2ZW4gd2hlbiB0aGUgdmlldyBpcyBub3QgZnVydGhlciB1c2VkIGJ5IHNvbWV0aGluZyBlbHNlLlxuICogQHBhcmFtIHZpZXcgVGhlIHJlYWN0aXZlIHZpZXdcbiAqIEByZXR1cm5zIGRpc3Bvc2VyIGZ1bmN0aW9uLCB3aGljaCBjYW4gYmUgdXNlZCB0byBzdG9wIHRoZSB2aWV3IGZyb20gYmVpbmcgdXBkYXRlZCBpbiB0aGUgZnV0dXJlLlxuICovXG5mdW5jdGlvbiBhdXRvcnVuJCQxKHZpZXcsIG9wdHMpIHtcbiAgICBpZiAob3B0cyA9PT0gdm9pZCAwKSB7IG9wdHMgPSBFTVBUWV9PQkpFQ1QkJDE7IH1cbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gICAgICAgIGludmFyaWFudCQkMSh0eXBlb2YgdmlldyA9PT0gXCJmdW5jdGlvblwiLCBcIkF1dG9ydW4gZXhwZWN0cyBhIGZ1bmN0aW9uIGFzIGZpcnN0IGFyZ3VtZW50XCIpO1xuICAgICAgICBpbnZhcmlhbnQkJDEoaXNBY3Rpb24kJDEodmlldykgPT09IGZhbHNlLCBcIkF1dG9ydW4gZG9lcyBub3QgYWNjZXB0IGFjdGlvbnMgc2luY2UgYWN0aW9ucyBhcmUgdW50cmFja2FibGVcIik7XG4gICAgfVxuICAgIHZhciBuYW1lID0gKG9wdHMgJiYgb3B0cy5uYW1lKSB8fCB2aWV3Lm5hbWUgfHwgXCJBdXRvcnVuQFwiICsgZ2V0TmV4dElkJCQxKCk7XG4gICAgdmFyIHJ1blN5bmMgPSAhb3B0cy5zY2hlZHVsZXIgJiYgIW9wdHMuZGVsYXk7XG4gICAgdmFyIHJlYWN0aW9uJCQxO1xuICAgIGlmIChydW5TeW5jKSB7XG4gICAgICAgIC8vIG5vcm1hbCBhdXRvcnVuXG4gICAgICAgIHJlYWN0aW9uJCQxID0gbmV3IFJlYWN0aW9uJCQxKG5hbWUsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMudHJhY2socmVhY3Rpb25SdW5uZXIpO1xuICAgICAgICB9LCBvcHRzLm9uRXJyb3IpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgdmFyIHNjaGVkdWxlcl8xID0gY3JlYXRlU2NoZWR1bGVyRnJvbU9wdGlvbnMob3B0cyk7XG4gICAgICAgIC8vIGRlYm91bmNlZCBhdXRvcnVuXG4gICAgICAgIHZhciBpc1NjaGVkdWxlZF8xID0gZmFsc2U7XG4gICAgICAgIHJlYWN0aW9uJCQxID0gbmV3IFJlYWN0aW9uJCQxKG5hbWUsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmICghaXNTY2hlZHVsZWRfMSkge1xuICAgICAgICAgICAgICAgIGlzU2NoZWR1bGVkXzEgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHNjaGVkdWxlcl8xKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgaXNTY2hlZHVsZWRfMSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXJlYWN0aW9uJCQxLmlzRGlzcG9zZWQpXG4gICAgICAgICAgICAgICAgICAgICAgICByZWFjdGlvbiQkMS50cmFjayhyZWFjdGlvblJ1bm5lcik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIG9wdHMub25FcnJvcik7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHJlYWN0aW9uUnVubmVyKCkge1xuICAgICAgICB2aWV3KHJlYWN0aW9uJCQxKTtcbiAgICB9XG4gICAgcmVhY3Rpb24kJDEuc2NoZWR1bGUoKTtcbiAgICByZXR1cm4gcmVhY3Rpb24kJDEuZ2V0RGlzcG9zZXIoKTtcbn1cbnZhciBydW4gPSBmdW5jdGlvbiAoZikgeyByZXR1cm4gZigpOyB9O1xuZnVuY3Rpb24gY3JlYXRlU2NoZWR1bGVyRnJvbU9wdGlvbnMob3B0cykge1xuICAgIHJldHVybiBvcHRzLnNjaGVkdWxlclxuICAgICAgICA/IG9wdHMuc2NoZWR1bGVyXG4gICAgICAgIDogb3B0cy5kZWxheVxuICAgICAgICAgICAgPyBmdW5jdGlvbiAoZikgeyByZXR1cm4gc2V0VGltZW91dChmLCBvcHRzLmRlbGF5KTsgfVxuICAgICAgICAgICAgOiBydW47XG59XG5mdW5jdGlvbiByZWFjdGlvbiQkMShleHByZXNzaW9uLCBlZmZlY3QsIG9wdHMpIHtcbiAgICBpZiAob3B0cyA9PT0gdm9pZCAwKSB7IG9wdHMgPSBFTVBUWV9PQkpFQ1QkJDE7IH1cbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gICAgICAgIGludmFyaWFudCQkMSh0eXBlb2YgZXhwcmVzc2lvbiA9PT0gXCJmdW5jdGlvblwiLCBcIkZpcnN0IGFyZ3VtZW50IHRvIHJlYWN0aW9uIHNob3VsZCBiZSBhIGZ1bmN0aW9uXCIpO1xuICAgICAgICBpbnZhcmlhbnQkJDEodHlwZW9mIG9wdHMgPT09IFwib2JqZWN0XCIsIFwiVGhpcmQgYXJndW1lbnQgb2YgcmVhY3Rpb25zIHNob3VsZCBiZSBhbiBvYmplY3RcIik7XG4gICAgfVxuICAgIHZhciBuYW1lID0gb3B0cy5uYW1lIHx8IFwiUmVhY3Rpb25AXCIgKyBnZXROZXh0SWQkJDEoKTtcbiAgICB2YXIgZWZmZWN0QWN0aW9uID0gYWN0aW9uJCQxKG5hbWUsIG9wdHMub25FcnJvciA/IHdyYXBFcnJvckhhbmRsZXIob3B0cy5vbkVycm9yLCBlZmZlY3QpIDogZWZmZWN0KTtcbiAgICB2YXIgcnVuU3luYyA9ICFvcHRzLnNjaGVkdWxlciAmJiAhb3B0cy5kZWxheTtcbiAgICB2YXIgc2NoZWR1bGVyID0gY3JlYXRlU2NoZWR1bGVyRnJvbU9wdGlvbnMob3B0cyk7XG4gICAgdmFyIGZpcnN0VGltZSA9IHRydWU7XG4gICAgdmFyIGlzU2NoZWR1bGVkID0gZmFsc2U7XG4gICAgdmFyIHZhbHVlO1xuICAgIHZhciBlcXVhbHMgPSBvcHRzLmNvbXBhcmVTdHJ1Y3R1cmFsXG4gICAgICAgID8gY29tcGFyZXIkJDEuc3RydWN0dXJhbFxuICAgICAgICA6IG9wdHMuZXF1YWxzIHx8IGNvbXBhcmVyJCQxLmRlZmF1bHQ7XG4gICAgdmFyIHIgPSBuZXcgUmVhY3Rpb24kJDEobmFtZSwgZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoZmlyc3RUaW1lIHx8IHJ1blN5bmMpIHtcbiAgICAgICAgICAgIHJlYWN0aW9uUnVubmVyKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoIWlzU2NoZWR1bGVkKSB7XG4gICAgICAgICAgICBpc1NjaGVkdWxlZCA9IHRydWU7XG4gICAgICAgICAgICBzY2hlZHVsZXIocmVhY3Rpb25SdW5uZXIpO1xuICAgICAgICB9XG4gICAgfSwgb3B0cy5vbkVycm9yKTtcbiAgICBmdW5jdGlvbiByZWFjdGlvblJ1bm5lcigpIHtcbiAgICAgICAgaXNTY2hlZHVsZWQgPSBmYWxzZTsgLy8gUTogbW92ZSBpbnRvIHJlYWN0aW9uIHJ1bm5lcj9cbiAgICAgICAgaWYgKHIuaXNEaXNwb3NlZClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgdmFyIGNoYW5nZWQgPSBmYWxzZTtcbiAgICAgICAgci50cmFjayhmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgbmV4dFZhbHVlID0gZXhwcmVzc2lvbihyKTtcbiAgICAgICAgICAgIGNoYW5nZWQgPSBmaXJzdFRpbWUgfHwgIWVxdWFscyh2YWx1ZSwgbmV4dFZhbHVlKTtcbiAgICAgICAgICAgIHZhbHVlID0gbmV4dFZhbHVlO1xuICAgICAgICB9KTtcbiAgICAgICAgaWYgKGZpcnN0VGltZSAmJiBvcHRzLmZpcmVJbW1lZGlhdGVseSlcbiAgICAgICAgICAgIGVmZmVjdEFjdGlvbih2YWx1ZSwgcik7XG4gICAgICAgIGlmICghZmlyc3RUaW1lICYmIGNoYW5nZWQgPT09IHRydWUpXG4gICAgICAgICAgICBlZmZlY3RBY3Rpb24odmFsdWUsIHIpO1xuICAgICAgICBpZiAoZmlyc3RUaW1lKVxuICAgICAgICAgICAgZmlyc3RUaW1lID0gZmFsc2U7XG4gICAgfVxuICAgIHIuc2NoZWR1bGUoKTtcbiAgICByZXR1cm4gci5nZXREaXNwb3NlcigpO1xufVxuZnVuY3Rpb24gd3JhcEVycm9ySGFuZGxlcihlcnJvckhhbmRsZXIsIGJhc2VGbikge1xuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm4gYmFzZUZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGVycm9ySGFuZGxlci5jYWxsKHRoaXMsIGUpO1xuICAgICAgICB9XG4gICAgfTtcbn1cblxuZnVuY3Rpb24gb25CZWNvbWVPYnNlcnZlZCQkMSh0aGluZywgYXJnMiwgYXJnMykge1xuICAgIHJldHVybiBpbnRlcmNlcHRIb29rKFwib25CZWNvbWVPYnNlcnZlZFwiLCB0aGluZywgYXJnMiwgYXJnMyk7XG59XG5mdW5jdGlvbiBvbkJlY29tZVVub2JzZXJ2ZWQkJDEodGhpbmcsIGFyZzIsIGFyZzMpIHtcbiAgICByZXR1cm4gaW50ZXJjZXB0SG9vayhcIm9uQmVjb21lVW5vYnNlcnZlZFwiLCB0aGluZywgYXJnMiwgYXJnMyk7XG59XG5mdW5jdGlvbiBpbnRlcmNlcHRIb29rKGhvb2ssIHRoaW5nLCBhcmcyLCBhcmczKSB7XG4gICAgdmFyIGF0b20gPSB0eXBlb2YgYXJnMiA9PT0gXCJzdHJpbmdcIiA/IGdldEF0b20kJDEodGhpbmcsIGFyZzIpIDogZ2V0QXRvbSQkMSh0aGluZyk7XG4gICAgdmFyIGNiID0gdHlwZW9mIGFyZzIgPT09IFwic3RyaW5nXCIgPyBhcmczIDogYXJnMjtcbiAgICB2YXIgbGlzdGVuZXJzS2V5ID0gaG9vayArIFwiTGlzdGVuZXJzXCI7XG4gICAgaWYgKGF0b21bbGlzdGVuZXJzS2V5XSkge1xuICAgICAgICBhdG9tW2xpc3RlbmVyc0tleV0uYWRkKGNiKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGF0b21bbGlzdGVuZXJzS2V5XSA9IG5ldyBTZXQoW2NiXSk7XG4gICAgfVxuICAgIHZhciBvcmlnID0gYXRvbVtob29rXTtcbiAgICBpZiAodHlwZW9mIG9yaWcgIT09IFwiZnVuY3Rpb25cIilcbiAgICAgICAgcmV0dXJuIGZhaWwkJDEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiICYmIFwiTm90IGFuIGF0b20gdGhhdCBjYW4gYmUgKHVuKW9ic2VydmVkXCIpO1xuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBob29rTGlzdGVuZXJzID0gYXRvbVtsaXN0ZW5lcnNLZXldO1xuICAgICAgICBpZiAoaG9va0xpc3RlbmVycykge1xuICAgICAgICAgICAgaG9va0xpc3RlbmVycy5kZWxldGUoY2IpO1xuICAgICAgICAgICAgaWYgKGhvb2tMaXN0ZW5lcnMuc2l6ZSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBhdG9tW2xpc3RlbmVyc0tleV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xufVxuXG5mdW5jdGlvbiBjb25maWd1cmUkJDEob3B0aW9ucykge1xuICAgIHZhciBlbmZvcmNlQWN0aW9ucyA9IG9wdGlvbnMuZW5mb3JjZUFjdGlvbnMsIGNvbXB1dGVkUmVxdWlyZXNSZWFjdGlvbiA9IG9wdGlvbnMuY29tcHV0ZWRSZXF1aXJlc1JlYWN0aW9uLCBkaXNhYmxlRXJyb3JCb3VuZGFyaWVzID0gb3B0aW9ucy5kaXNhYmxlRXJyb3JCb3VuZGFyaWVzLCByZWFjdGlvblNjaGVkdWxlciA9IG9wdGlvbnMucmVhY3Rpb25TY2hlZHVsZXI7XG4gICAgaWYgKG9wdGlvbnMuaXNvbGF0ZUdsb2JhbFN0YXRlID09PSB0cnVlKSB7XG4gICAgICAgIGlzb2xhdGVHbG9iYWxTdGF0ZSQkMSgpO1xuICAgIH1cbiAgICBpZiAoZW5mb3JjZUFjdGlvbnMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAodHlwZW9mIGVuZm9yY2VBY3Rpb25zID09PSBcImJvb2xlYW5cIiB8fCBlbmZvcmNlQWN0aW9ucyA9PT0gXCJzdHJpY3RcIilcbiAgICAgICAgICAgIGRlcHJlY2F0ZWQkJDEoXCJEZXByZWNhdGVkIHZhbHVlIGZvciAnZW5mb3JjZUFjdGlvbnMnLCB1c2UgJ2ZhbHNlJyA9PiAnXFxcIm5ldmVyXFxcIicsICd0cnVlJyA9PiAnXFxcIm9ic2VydmVkXFxcIicsICdcXFwic3RyaWN0XFxcIicgPT4gXFxcIidhbHdheXMnXFxcIiBpbnN0ZWFkXCIpO1xuICAgICAgICB2YXIgZWEgPSB2b2lkIDA7XG4gICAgICAgIHN3aXRjaCAoZW5mb3JjZUFjdGlvbnMpIHtcbiAgICAgICAgICAgIGNhc2UgdHJ1ZTpcbiAgICAgICAgICAgIGNhc2UgXCJvYnNlcnZlZFwiOlxuICAgICAgICAgICAgICAgIGVhID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgZmFsc2U6XG4gICAgICAgICAgICBjYXNlIFwibmV2ZXJcIjpcbiAgICAgICAgICAgICAgICBlYSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcInN0cmljdFwiOlxuICAgICAgICAgICAgY2FzZSBcImFsd2F5c1wiOlxuICAgICAgICAgICAgICAgIGVhID0gXCJzdHJpY3RcIjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgZmFpbCQkMShcIkludmFsaWQgdmFsdWUgZm9yICdlbmZvcmNlQWN0aW9ucyc6ICdcIiArIGVuZm9yY2VBY3Rpb25zICsgXCInLCBleHBlY3RlZCAnbmV2ZXInLCAnYWx3YXlzJyBvciAnb2JzZXJ2ZWQnXCIpO1xuICAgICAgICB9XG4gICAgICAgIGdsb2JhbFN0YXRlJCQxLmVuZm9yY2VBY3Rpb25zID0gZWE7XG4gICAgICAgIGdsb2JhbFN0YXRlJCQxLmFsbG93U3RhdGVDaGFuZ2VzID0gZWEgPT09IHRydWUgfHwgZWEgPT09IFwic3RyaWN0XCIgPyBmYWxzZSA6IHRydWU7XG4gICAgfVxuICAgIGlmIChjb21wdXRlZFJlcXVpcmVzUmVhY3Rpb24gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBnbG9iYWxTdGF0ZSQkMS5jb21wdXRlZFJlcXVpcmVzUmVhY3Rpb24gPSAhIWNvbXB1dGVkUmVxdWlyZXNSZWFjdGlvbjtcbiAgICB9XG4gICAgaWYgKGRpc2FibGVFcnJvckJvdW5kYXJpZXMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAoZGlzYWJsZUVycm9yQm91bmRhcmllcyA9PT0gdHJ1ZSlcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihcIldBUk5JTkc6IERlYnVnIGZlYXR1cmUgb25seS4gTW9iWCB3aWxsIE5PVCByZWNvdmVyIGZyb20gZXJyb3JzIHdoZW4gYGRpc2FibGVFcnJvckJvdW5kYXJpZXNgIGlzIGVuYWJsZWQuXCIpO1xuICAgICAgICBnbG9iYWxTdGF0ZSQkMS5kaXNhYmxlRXJyb3JCb3VuZGFyaWVzID0gISFkaXNhYmxlRXJyb3JCb3VuZGFyaWVzO1xuICAgIH1cbiAgICBpZiAocmVhY3Rpb25TY2hlZHVsZXIpIHtcbiAgICAgICAgc2V0UmVhY3Rpb25TY2hlZHVsZXIkJDEocmVhY3Rpb25TY2hlZHVsZXIpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZGVjb3JhdGUkJDEodGhpbmcsIGRlY29yYXRvcnMpIHtcbiAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgJiZcbiAgICAgICAgaW52YXJpYW50JCQxKGlzUGxhaW5PYmplY3QkJDEoZGVjb3JhdG9ycyksIFwiRGVjb3JhdG9ycyBzaG91bGQgYmUgYSBrZXkgdmFsdWUgbWFwXCIpO1xuICAgIHZhciB0YXJnZXQgPSB0eXBlb2YgdGhpbmcgPT09IFwiZnVuY3Rpb25cIiA/IHRoaW5nLnByb3RvdHlwZSA6IHRoaW5nO1xuICAgIHZhciBfbG9vcF8xID0gZnVuY3Rpb24gKHByb3ApIHtcbiAgICAgICAgdmFyIHByb3BlcnR5RGVjb3JhdG9ycyA9IGRlY29yYXRvcnNbcHJvcF07XG4gICAgICAgIGlmICghQXJyYXkuaXNBcnJheShwcm9wZXJ0eURlY29yYXRvcnMpKSB7XG4gICAgICAgICAgICBwcm9wZXJ0eURlY29yYXRvcnMgPSBbcHJvcGVydHlEZWNvcmF0b3JzXTtcbiAgICAgICAgfVxuICAgICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgJiZcbiAgICAgICAgICAgIGludmFyaWFudCQkMShwcm9wZXJ0eURlY29yYXRvcnMuZXZlcnkoZnVuY3Rpb24gKGRlY29yYXRvcikgeyByZXR1cm4gdHlwZW9mIGRlY29yYXRvciA9PT0gXCJmdW5jdGlvblwiOyB9KSwgXCJEZWNvcmF0ZTogZXhwZWN0ZWQgYSBkZWNvcmF0b3IgZnVuY3Rpb24gb3IgYXJyYXkgb2YgZGVjb3JhdG9yIGZ1bmN0aW9ucyBmb3IgJ1wiICsgcHJvcCArIFwiJ1wiKTtcbiAgICAgICAgdmFyIGRlc2NyaXB0b3IgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwgcHJvcCk7XG4gICAgICAgIHZhciBuZXdEZXNjcmlwdG9yID0gcHJvcGVydHlEZWNvcmF0b3JzLnJlZHVjZShmdW5jdGlvbiAoYWNjRGVzY3JpcHRvciwgZGVjb3JhdG9yKSB7IHJldHVybiBkZWNvcmF0b3IodGFyZ2V0LCBwcm9wLCBhY2NEZXNjcmlwdG9yKTsgfSwgZGVzY3JpcHRvcik7XG4gICAgICAgIGlmIChuZXdEZXNjcmlwdG9yKVxuICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgcHJvcCwgbmV3RGVzY3JpcHRvcik7XG4gICAgfTtcbiAgICBmb3IgKHZhciBwcm9wIGluIGRlY29yYXRvcnMpIHtcbiAgICAgICAgX2xvb3BfMShwcm9wKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaW5nO1xufVxuXG5mdW5jdGlvbiBleHRlbmRPYnNlcnZhYmxlJCQxKHRhcmdldCwgcHJvcGVydGllcywgZGVjb3JhdG9ycywgb3B0aW9ucykge1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgICAgICAgaW52YXJpYW50JCQxKGFyZ3VtZW50cy5sZW5ndGggPj0gMiAmJiBhcmd1bWVudHMubGVuZ3RoIDw9IDQsIFwiJ2V4dGVuZE9ic2VydmFibGUnIGV4cGVjdGVkIDItNCBhcmd1bWVudHNcIik7XG4gICAgICAgIGludmFyaWFudCQkMSh0eXBlb2YgdGFyZ2V0ID09PSBcIm9iamVjdFwiLCBcIidleHRlbmRPYnNlcnZhYmxlJyBleHBlY3RzIGFuIG9iamVjdCBhcyBmaXJzdCBhcmd1bWVudFwiKTtcbiAgICAgICAgaW52YXJpYW50JCQxKCFpc09ic2VydmFibGVNYXAkJDEodGFyZ2V0KSwgXCInZXh0ZW5kT2JzZXJ2YWJsZScgc2hvdWxkIG5vdCBiZSB1c2VkIG9uIG1hcHMsIHVzZSBtYXAubWVyZ2UgaW5zdGVhZFwiKTtcbiAgICB9XG4gICAgb3B0aW9ucyA9IGFzQ3JlYXRlT2JzZXJ2YWJsZU9wdGlvbnMkJDEob3B0aW9ucyk7XG4gICAgdmFyIGRlZmF1bHREZWNvcmF0b3IgPSBnZXREZWZhdWx0RGVjb3JhdG9yRnJvbU9iamVjdE9wdGlvbnMkJDEob3B0aW9ucyk7XG4gICAgaW5pdGlhbGl6ZUluc3RhbmNlJCQxKHRhcmdldCk7IC8vIEZpeGVzICMxNzQwXG4gICAgYXNPYnNlcnZhYmxlT2JqZWN0JCQxKHRhcmdldCwgb3B0aW9ucy5uYW1lLCBkZWZhdWx0RGVjb3JhdG9yLmVuaGFuY2VyKTsgLy8gbWFrZSBzdXJlIG9iamVjdCBpcyBvYnNlcnZhYmxlLCBldmVuIHdpdGhvdXQgaW5pdGlhbCBwcm9wc1xuICAgIGlmIChwcm9wZXJ0aWVzKVxuICAgICAgICBleHRlbmRPYnNlcnZhYmxlT2JqZWN0V2l0aFByb3BlcnRpZXMkJDEodGFyZ2V0LCBwcm9wZXJ0aWVzLCBkZWNvcmF0b3JzLCBkZWZhdWx0RGVjb3JhdG9yKTtcbiAgICByZXR1cm4gdGFyZ2V0O1xufVxuZnVuY3Rpb24gZ2V0RGVmYXVsdERlY29yYXRvckZyb21PYmplY3RPcHRpb25zJCQxKG9wdGlvbnMpIHtcbiAgICByZXR1cm4gb3B0aW9ucy5kZWZhdWx0RGVjb3JhdG9yIHx8IChvcHRpb25zLmRlZXAgPT09IGZhbHNlID8gcmVmRGVjb3JhdG9yJCQxIDogZGVlcERlY29yYXRvciQkMSk7XG59XG5mdW5jdGlvbiBleHRlbmRPYnNlcnZhYmxlT2JqZWN0V2l0aFByb3BlcnRpZXMkJDEodGFyZ2V0LCBwcm9wZXJ0aWVzLCBkZWNvcmF0b3JzLCBkZWZhdWx0RGVjb3JhdG9yKSB7XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xuICAgICAgICBpbnZhcmlhbnQkJDEoIWlzT2JzZXJ2YWJsZSQkMShwcm9wZXJ0aWVzKSwgXCJFeHRlbmRpbmcgYW4gb2JqZWN0IHdpdGggYW5vdGhlciBvYnNlcnZhYmxlIChvYmplY3QpIGlzIG5vdCBzdXBwb3J0ZWQuIFBsZWFzZSBjb25zdHJ1Y3QgYW4gZXhwbGljaXQgcHJvcGVydHltYXAsIHVzaW5nIGB0b0pTYCBpZiBuZWVkLiBTZWUgaXNzdWUgIzU0MFwiKTtcbiAgICAgICAgaWYgKGRlY29yYXRvcnMpXG4gICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gZGVjb3JhdG9ycylcbiAgICAgICAgICAgICAgICBpZiAoIShrZXkgaW4gcHJvcGVydGllcykpXG4gICAgICAgICAgICAgICAgICAgIGZhaWwkJDEoXCJUcnlpbmcgdG8gZGVjbGFyZSBhIGRlY29yYXRvciBmb3IgdW5zcGVjaWZpZWQgcHJvcGVydHkgJ1wiICsga2V5ICsgXCInXCIpO1xuICAgIH1cbiAgICBzdGFydEJhdGNoJCQxKCk7XG4gICAgdHJ5IHtcbiAgICAgICAgZm9yICh2YXIga2V5IGluIHByb3BlcnRpZXMpIHtcbiAgICAgICAgICAgIHZhciBkZXNjcmlwdG9yID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihwcm9wZXJ0aWVzLCBrZXkpO1xuICAgICAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xuICAgICAgICAgICAgICAgIGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSlcbiAgICAgICAgICAgICAgICAgICAgZmFpbCQkMShcIidleHRlbmRPYnNlcnZhYmxlJyBjYW4gb25seSBiZSB1c2VkIHRvIGludHJvZHVjZSBuZXcgcHJvcGVydGllcy4gVXNlICdzZXQnIG9yICdkZWNvcmF0ZScgaW5zdGVhZC4gVGhlIHByb3BlcnR5ICdcIiArIGtleSArIFwiJyBhbHJlYWR5IGV4aXN0cyBvbiAnXCIgKyB0YXJnZXQgKyBcIidcIik7XG4gICAgICAgICAgICAgICAgaWYgKGlzQ29tcHV0ZWQkJDEoZGVzY3JpcHRvci52YWx1ZSkpXG4gICAgICAgICAgICAgICAgICAgIGZhaWwkJDEoXCJQYXNzaW5nIGEgJ2NvbXB1dGVkJyBhcyBpbml0aWFsIHByb3BlcnR5IHZhbHVlIGlzIG5vIGxvbmdlciBzdXBwb3J0ZWQgYnkgZXh0ZW5kT2JzZXJ2YWJsZS4gVXNlIGEgZ2V0dGVyIG9yIGRlY29yYXRvciBpbnN0ZWFkXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGRlY29yYXRvciA9IGRlY29yYXRvcnMgJiYga2V5IGluIGRlY29yYXRvcnNcbiAgICAgICAgICAgICAgICA/IGRlY29yYXRvcnNba2V5XVxuICAgICAgICAgICAgICAgIDogZGVzY3JpcHRvci5nZXRcbiAgICAgICAgICAgICAgICAgICAgPyBjb21wdXRlZERlY29yYXRvciQkMVxuICAgICAgICAgICAgICAgICAgICA6IGRlZmF1bHREZWNvcmF0b3I7XG4gICAgICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiICYmIHR5cGVvZiBkZWNvcmF0b3IgIT09IFwiZnVuY3Rpb25cIilcbiAgICAgICAgICAgICAgICBmYWlsJCQxKFwiTm90IGEgdmFsaWQgZGVjb3JhdG9yIGZvciAnXCIgKyBrZXkgKyBcIicsIGdvdDogXCIgKyBkZWNvcmF0b3IpO1xuICAgICAgICAgICAgdmFyIHJlc3VsdERlc2NyaXB0b3IgPSBkZWNvcmF0b3IodGFyZ2V0LCBrZXksIGRlc2NyaXB0b3IsIHRydWUpO1xuICAgICAgICAgICAgaWYgKHJlc3VsdERlc2NyaXB0b3IgLy8gb3RoZXJ3aXNlLCBhc3N1bWUgYWxyZWFkeSBhcHBsaWVkLCBkdWUgdG8gYGFwcGx5VG9JbnN0YW5jZWBcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBrZXksIHJlc3VsdERlc2NyaXB0b3IpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGZpbmFsbHkge1xuICAgICAgICBlbmRCYXRjaCQkMSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZ2V0RGVwZW5kZW5jeVRyZWUkJDEodGhpbmcsIHByb3BlcnR5KSB7XG4gICAgcmV0dXJuIG5vZGVUb0RlcGVuZGVuY3lUcmVlKGdldEF0b20kJDEodGhpbmcsIHByb3BlcnR5KSk7XG59XG5mdW5jdGlvbiBub2RlVG9EZXBlbmRlbmN5VHJlZShub2RlKSB7XG4gICAgdmFyIHJlc3VsdCA9IHtcbiAgICAgICAgbmFtZTogbm9kZS5uYW1lXG4gICAgfTtcbiAgICBpZiAobm9kZS5vYnNlcnZpbmcgJiYgbm9kZS5vYnNlcnZpbmcubGVuZ3RoID4gMClcbiAgICAgICAgcmVzdWx0LmRlcGVuZGVuY2llcyA9IHVuaXF1ZSQkMShub2RlLm9ic2VydmluZykubWFwKG5vZGVUb0RlcGVuZGVuY3lUcmVlKTtcbiAgICByZXR1cm4gcmVzdWx0O1xufVxuZnVuY3Rpb24gZ2V0T2JzZXJ2ZXJUcmVlJCQxKHRoaW5nLCBwcm9wZXJ0eSkge1xuICAgIHJldHVybiBub2RlVG9PYnNlcnZlclRyZWUoZ2V0QXRvbSQkMSh0aGluZywgcHJvcGVydHkpKTtcbn1cbmZ1bmN0aW9uIG5vZGVUb09ic2VydmVyVHJlZShub2RlKSB7XG4gICAgdmFyIHJlc3VsdCA9IHtcbiAgICAgICAgbmFtZTogbm9kZS5uYW1lXG4gICAgfTtcbiAgICBpZiAoaGFzT2JzZXJ2ZXJzJCQxKG5vZGUpKVxuICAgICAgICByZXN1bHQub2JzZXJ2ZXJzID0gQXJyYXkuZnJvbShnZXRPYnNlcnZlcnMkJDEobm9kZSkpLm1hcChub2RlVG9PYnNlcnZlclRyZWUpO1xuICAgIHJldHVybiByZXN1bHQ7XG59XG5cbnZhciBnZW5lcmF0b3JJZCA9IDA7XG5mdW5jdGlvbiBmbG93JCQxKGdlbmVyYXRvcikge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoICE9PSAxKVxuICAgICAgICBmYWlsJCQxKHByb2Nlc3MuZW52Lk5PREVfRU5WICYmIFwiRmxvdyBleHBlY3RzIG9uZSAxIGFyZ3VtZW50IGFuZCBjYW5ub3QgYmUgdXNlZCBhcyBkZWNvcmF0b3JcIik7XG4gICAgdmFyIG5hbWUgPSBnZW5lcmF0b3IubmFtZSB8fCBcIjx1bm5hbWVkIGZsb3c+XCI7XG4gICAgLy8gSW1wbGVtZW50YXRpb24gYmFzZWQgb24gaHR0cHM6Ly9naXRodWIuY29tL3RqL2NvL2Jsb2IvbWFzdGVyL2luZGV4LmpzXG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGN0eCA9IHRoaXM7XG4gICAgICAgIHZhciBhcmdzID0gYXJndW1lbnRzO1xuICAgICAgICB2YXIgcnVuSWQgPSArK2dlbmVyYXRvcklkO1xuICAgICAgICB2YXIgZ2VuID0gYWN0aW9uJCQxKG5hbWUgKyBcIiAtIHJ1bmlkOiBcIiArIHJ1bklkICsgXCIgLSBpbml0XCIsIGdlbmVyYXRvcikuYXBwbHkoY3R4LCBhcmdzKTtcbiAgICAgICAgdmFyIHJlamVjdG9yO1xuICAgICAgICB2YXIgcGVuZGluZ1Byb21pc2UgPSB1bmRlZmluZWQ7XG4gICAgICAgIHZhciBwcm9taXNlID0gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgdmFyIHN0ZXBJZCA9IDA7XG4gICAgICAgICAgICByZWplY3RvciA9IHJlamVjdDtcbiAgICAgICAgICAgIGZ1bmN0aW9uIG9uRnVsZmlsbGVkKHJlcykge1xuICAgICAgICAgICAgICAgIHBlbmRpbmdQcm9taXNlID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIHZhciByZXQ7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0ID0gYWN0aW9uJCQxKG5hbWUgKyBcIiAtIHJ1bmlkOiBcIiArIHJ1bklkICsgXCIgLSB5aWVsZCBcIiArIHN0ZXBJZCsrLCBnZW4ubmV4dCkuY2FsbChnZW4sIHJlcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QoZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG5leHQocmV0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZ1bmN0aW9uIG9uUmVqZWN0ZWQoZXJyKSB7XG4gICAgICAgICAgICAgICAgcGVuZGluZ1Byb21pc2UgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgdmFyIHJldDtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICByZXQgPSBhY3Rpb24kJDEobmFtZSArIFwiIC0gcnVuaWQ6IFwiICsgcnVuSWQgKyBcIiAtIHlpZWxkIFwiICsgc3RlcElkKyssIGdlbi50aHJvdykuY2FsbChnZW4sIGVycik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZWplY3QoZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG5leHQocmV0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZ1bmN0aW9uIG5leHQocmV0KSB7XG4gICAgICAgICAgICAgICAgaWYgKHJldCAmJiB0eXBlb2YgcmV0LnRoZW4gPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgICAgICAgICAvLyBhbiBhc3luYyBpdGVyYXRvclxuICAgICAgICAgICAgICAgICAgICByZXQudGhlbihuZXh0LCByZWplY3QpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChyZXQuZG9uZSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUocmV0LnZhbHVlKTtcbiAgICAgICAgICAgICAgICBwZW5kaW5nUHJvbWlzZSA9IFByb21pc2UucmVzb2x2ZShyZXQudmFsdWUpO1xuICAgICAgICAgICAgICAgIHJldHVybiBwZW5kaW5nUHJvbWlzZS50aGVuKG9uRnVsZmlsbGVkLCBvblJlamVjdGVkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG9uRnVsZmlsbGVkKHVuZGVmaW5lZCk7IC8vIGtpY2sgb2ZmIHRoZSBwcm9jZXNzXG4gICAgICAgIH0pO1xuICAgICAgICBwcm9taXNlLmNhbmNlbCA9IGFjdGlvbiQkMShuYW1lICsgXCIgLSBydW5pZDogXCIgKyBydW5JZCArIFwiIC0gY2FuY2VsXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgaWYgKHBlbmRpbmdQcm9taXNlKVxuICAgICAgICAgICAgICAgICAgICBjYW5jZWxQcm9taXNlKHBlbmRpbmdQcm9taXNlKTtcbiAgICAgICAgICAgICAgICAvLyBGaW5hbGx5IGJsb2NrIGNhbiByZXR1cm4gKG9yIHlpZWxkKSBzdHVmZi4uXG4gICAgICAgICAgICAgICAgdmFyIHJlcyA9IGdlbi5yZXR1cm4oKTtcbiAgICAgICAgICAgICAgICAvLyBlYXQgYW55dGhpbmcgdGhhdCBwcm9taXNlIHdvdWxkIGRvLCBpdCdzIGNhbmNlbGxlZCFcbiAgICAgICAgICAgICAgICB2YXIgeWllbGRlZFByb21pc2UgPSBQcm9taXNlLnJlc29sdmUocmVzLnZhbHVlKTtcbiAgICAgICAgICAgICAgICB5aWVsZGVkUHJvbWlzZS50aGVuKG5vb3AkJDEsIG5vb3AkJDEpO1xuICAgICAgICAgICAgICAgIGNhbmNlbFByb21pc2UoeWllbGRlZFByb21pc2UpOyAvLyBtYXliZSBpdCBjYW4gYmUgY2FuY2VsbGVkIDopXG4gICAgICAgICAgICAgICAgLy8gcmVqZWN0IG91ciBvcmlnaW5hbCBwcm9taXNlXG4gICAgICAgICAgICAgICAgcmVqZWN0b3IobmV3IEVycm9yKFwiRkxPV19DQU5DRUxMRURcIikpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICByZWplY3RvcihlKTsgLy8gdGhlcmUgY291bGQgYmUgYSB0aHJvd2luZyBmaW5hbGx5IGJsb2NrXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcHJvbWlzZTtcbiAgICB9O1xufVxuZnVuY3Rpb24gY2FuY2VsUHJvbWlzZShwcm9taXNlKSB7XG4gICAgaWYgKHR5cGVvZiBwcm9taXNlLmNhbmNlbCA9PT0gXCJmdW5jdGlvblwiKVxuICAgICAgICBwcm9taXNlLmNhbmNlbCgpO1xufVxuXG5mdW5jdGlvbiBpbnRlcmNlcHRSZWFkcyQkMSh0aGluZywgcHJvcE9ySGFuZGxlciwgaGFuZGxlcikge1xuICAgIHZhciB0YXJnZXQ7XG4gICAgaWYgKGlzT2JzZXJ2YWJsZU1hcCQkMSh0aGluZykgfHwgaXNPYnNlcnZhYmxlQXJyYXkkJDEodGhpbmcpIHx8IGlzT2JzZXJ2YWJsZVZhbHVlJCQxKHRoaW5nKSkge1xuICAgICAgICB0YXJnZXQgPSBnZXRBZG1pbmlzdHJhdGlvbiQkMSh0aGluZyk7XG4gICAgfVxuICAgIGVsc2UgaWYgKGlzT2JzZXJ2YWJsZU9iamVjdCQkMSh0aGluZykpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBwcm9wT3JIYW5kbGVyICE9PSBcInN0cmluZ1wiKVxuICAgICAgICAgICAgcmV0dXJuIGZhaWwkJDEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiICYmXG4gICAgICAgICAgICAgICAgXCJJbnRlcmNlcHRSZWFkcyBjYW4gb25seSBiZSB1c2VkIHdpdGggYSBzcGVjaWZpYyBwcm9wZXJ0eSwgbm90IHdpdGggYW4gb2JqZWN0IGluIGdlbmVyYWxcIik7XG4gICAgICAgIHRhcmdldCA9IGdldEFkbWluaXN0cmF0aW9uJCQxKHRoaW5nLCBwcm9wT3JIYW5kbGVyKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiBmYWlsJCQxKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiAmJlxuICAgICAgICAgICAgXCJFeHBlY3RlZCBvYnNlcnZhYmxlIG1hcCwgb2JqZWN0IG9yIGFycmF5IGFzIGZpcnN0IGFycmF5XCIpO1xuICAgIH1cbiAgICBpZiAodGFyZ2V0LmRlaGFuY2VyICE9PSB1bmRlZmluZWQpXG4gICAgICAgIHJldHVybiBmYWlsJCQxKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiAmJiBcIkFuIGludGVyY2VwdCByZWFkZXIgd2FzIGFscmVhZHkgZXN0YWJsaXNoZWRcIik7XG4gICAgdGFyZ2V0LmRlaGFuY2VyID0gdHlwZW9mIHByb3BPckhhbmRsZXIgPT09IFwiZnVuY3Rpb25cIiA/IHByb3BPckhhbmRsZXIgOiBoYW5kbGVyO1xuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRhcmdldC5kZWhhbmNlciA9IHVuZGVmaW5lZDtcbiAgICB9O1xufVxuXG5mdW5jdGlvbiBpbnRlcmNlcHQkJDEodGhpbmcsIHByb3BPckhhbmRsZXIsIGhhbmRsZXIpIHtcbiAgICBpZiAodHlwZW9mIGhhbmRsZXIgPT09IFwiZnVuY3Rpb25cIilcbiAgICAgICAgcmV0dXJuIGludGVyY2VwdFByb3BlcnR5KHRoaW5nLCBwcm9wT3JIYW5kbGVyLCBoYW5kbGVyKTtcbiAgICBlbHNlXG4gICAgICAgIHJldHVybiBpbnRlcmNlcHRJbnRlcmNlcHRhYmxlKHRoaW5nLCBwcm9wT3JIYW5kbGVyKTtcbn1cbmZ1bmN0aW9uIGludGVyY2VwdEludGVyY2VwdGFibGUodGhpbmcsIGhhbmRsZXIpIHtcbiAgICByZXR1cm4gZ2V0QWRtaW5pc3RyYXRpb24kJDEodGhpbmcpLmludGVyY2VwdChoYW5kbGVyKTtcbn1cbmZ1bmN0aW9uIGludGVyY2VwdFByb3BlcnR5KHRoaW5nLCBwcm9wZXJ0eSwgaGFuZGxlcikge1xuICAgIHJldHVybiBnZXRBZG1pbmlzdHJhdGlvbiQkMSh0aGluZywgcHJvcGVydHkpLmludGVyY2VwdChoYW5kbGVyKTtcbn1cblxuZnVuY3Rpb24gX2lzQ29tcHV0ZWQkJDEodmFsdWUsIHByb3BlcnR5KSB7XG4gICAgaWYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQpXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICBpZiAocHJvcGVydHkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAoaXNPYnNlcnZhYmxlT2JqZWN0JCQxKHZhbHVlKSA9PT0gZmFsc2UpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIGlmICghdmFsdWVbJG1vYngkJDFdLnZhbHVlcy5oYXMocHJvcGVydHkpKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB2YXIgYXRvbSA9IGdldEF0b20kJDEodmFsdWUsIHByb3BlcnR5KTtcbiAgICAgICAgcmV0dXJuIGlzQ29tcHV0ZWRWYWx1ZSQkMShhdG9tKTtcbiAgICB9XG4gICAgcmV0dXJuIGlzQ29tcHV0ZWRWYWx1ZSQkMSh2YWx1ZSk7XG59XG5mdW5jdGlvbiBpc0NvbXB1dGVkJCQxKHZhbHVlKSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKVxuICAgICAgICByZXR1cm4gZmFpbCQkMShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgJiZcbiAgICAgICAgICAgIFwiaXNDb21wdXRlZCBleHBlY3RzIG9ubHkgMSBhcmd1bWVudC4gVXNlIGlzT2JzZXJ2YWJsZVByb3AgdG8gaW5zcGVjdCB0aGUgb2JzZXJ2YWJpbGl0eSBvZiBhIHByb3BlcnR5XCIpO1xuICAgIHJldHVybiBfaXNDb21wdXRlZCQkMSh2YWx1ZSk7XG59XG5mdW5jdGlvbiBpc0NvbXB1dGVkUHJvcCQkMSh2YWx1ZSwgcHJvcE5hbWUpIHtcbiAgICBpZiAodHlwZW9mIHByb3BOYW1lICE9PSBcInN0cmluZ1wiKVxuICAgICAgICByZXR1cm4gZmFpbCQkMShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgJiZcbiAgICAgICAgICAgIFwiaXNDb21wdXRlZCBleHBlY3RlZCBhIHByb3BlcnR5IG5hbWUgYXMgc2Vjb25kIGFyZ3VtZW50XCIpO1xuICAgIHJldHVybiBfaXNDb21wdXRlZCQkMSh2YWx1ZSwgcHJvcE5hbWUpO1xufVxuXG5mdW5jdGlvbiBfaXNPYnNlcnZhYmxlKHZhbHVlLCBwcm9wZXJ0eSkge1xuICAgIGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkKVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgaWYgKHByb3BlcnR5ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiAmJlxuICAgICAgICAgICAgKGlzT2JzZXJ2YWJsZU1hcCQkMSh2YWx1ZSkgfHwgaXNPYnNlcnZhYmxlQXJyYXkkJDEodmFsdWUpKSlcbiAgICAgICAgICAgIHJldHVybiBmYWlsJCQxKFwiaXNPYnNlcnZhYmxlKG9iamVjdCwgcHJvcGVydHlOYW1lKSBpcyBub3Qgc3VwcG9ydGVkIGZvciBhcnJheXMgYW5kIG1hcHMuIFVzZSBtYXAuaGFzIG9yIGFycmF5Lmxlbmd0aCBpbnN0ZWFkLlwiKTtcbiAgICAgICAgaWYgKGlzT2JzZXJ2YWJsZU9iamVjdCQkMSh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZVskbW9ieCQkMV0udmFsdWVzLmhhcyhwcm9wZXJ0eSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICAvLyBGb3IgZmlyc3QgY2hlY2ssIHNlZSAjNzAxXG4gICAgcmV0dXJuIChpc09ic2VydmFibGVPYmplY3QkJDEodmFsdWUpIHx8XG4gICAgICAgICEhdmFsdWVbJG1vYngkJDFdIHx8XG4gICAgICAgIGlzQXRvbSQkMSh2YWx1ZSkgfHxcbiAgICAgICAgaXNSZWFjdGlvbiQkMSh2YWx1ZSkgfHxcbiAgICAgICAgaXNDb21wdXRlZFZhbHVlJCQxKHZhbHVlKSk7XG59XG5mdW5jdGlvbiBpc09ic2VydmFibGUkJDEodmFsdWUpIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCAhPT0gMSlcbiAgICAgICAgZmFpbCQkMShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgJiZcbiAgICAgICAgICAgIFwiaXNPYnNlcnZhYmxlIGV4cGVjdHMgb25seSAxIGFyZ3VtZW50LiBVc2UgaXNPYnNlcnZhYmxlUHJvcCB0byBpbnNwZWN0IHRoZSBvYnNlcnZhYmlsaXR5IG9mIGEgcHJvcGVydHlcIik7XG4gICAgcmV0dXJuIF9pc09ic2VydmFibGUodmFsdWUpO1xufVxuZnVuY3Rpb24gaXNPYnNlcnZhYmxlUHJvcCQkMSh2YWx1ZSwgcHJvcE5hbWUpIHtcbiAgICBpZiAodHlwZW9mIHByb3BOYW1lICE9PSBcInN0cmluZ1wiKVxuICAgICAgICByZXR1cm4gZmFpbCQkMShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgJiYgXCJleHBlY3RlZCBhIHByb3BlcnR5IG5hbWUgYXMgc2Vjb25kIGFyZ3VtZW50XCIpO1xuICAgIHJldHVybiBfaXNPYnNlcnZhYmxlKHZhbHVlLCBwcm9wTmFtZSk7XG59XG5cbmZ1bmN0aW9uIGtleXMkJDEob2JqKSB7XG4gICAgaWYgKGlzT2JzZXJ2YWJsZU9iamVjdCQkMShvYmopKSB7XG4gICAgICAgIHJldHVybiBvYmpbJG1vYngkJDFdLmdldEtleXMoKTtcbiAgICB9XG4gICAgaWYgKGlzT2JzZXJ2YWJsZU1hcCQkMShvYmopKSB7XG4gICAgICAgIHJldHVybiBBcnJheS5mcm9tKG9iai5rZXlzKCkpO1xuICAgIH1cbiAgICBpZiAoaXNPYnNlcnZhYmxlU2V0JCQxKG9iaikpIHtcbiAgICAgICAgcmV0dXJuIEFycmF5LmZyb20ob2JqLmtleXMoKSk7XG4gICAgfVxuICAgIGlmIChpc09ic2VydmFibGVBcnJheSQkMShvYmopKSB7XG4gICAgICAgIHJldHVybiBvYmoubWFwKGZ1bmN0aW9uIChfLCBpbmRleCkgeyByZXR1cm4gaW5kZXg7IH0pO1xuICAgIH1cbiAgICByZXR1cm4gZmFpbCQkMShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgJiZcbiAgICAgICAgXCIna2V5cygpJyBjYW4gb25seSBiZSB1c2VkIG9uIG9ic2VydmFibGUgb2JqZWN0cywgYXJyYXlzLCBzZXRzIGFuZCBtYXBzXCIpO1xufVxuZnVuY3Rpb24gdmFsdWVzJCQxKG9iaikge1xuICAgIGlmIChpc09ic2VydmFibGVPYmplY3QkJDEob2JqKSkge1xuICAgICAgICByZXR1cm4ga2V5cyQkMShvYmopLm1hcChmdW5jdGlvbiAoa2V5KSB7IHJldHVybiBvYmpba2V5XTsgfSk7XG4gICAgfVxuICAgIGlmIChpc09ic2VydmFibGVNYXAkJDEob2JqKSkge1xuICAgICAgICByZXR1cm4ga2V5cyQkMShvYmopLm1hcChmdW5jdGlvbiAoa2V5KSB7IHJldHVybiBvYmouZ2V0KGtleSk7IH0pO1xuICAgIH1cbiAgICBpZiAoaXNPYnNlcnZhYmxlU2V0JCQxKG9iaikpIHtcbiAgICAgICAgcmV0dXJuIEFycmF5LmZyb20ob2JqLnZhbHVlcygpKTtcbiAgICB9XG4gICAgaWYgKGlzT2JzZXJ2YWJsZUFycmF5JCQxKG9iaikpIHtcbiAgICAgICAgcmV0dXJuIG9iai5zbGljZSgpO1xuICAgIH1cbiAgICByZXR1cm4gZmFpbCQkMShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgJiZcbiAgICAgICAgXCIndmFsdWVzKCknIGNhbiBvbmx5IGJlIHVzZWQgb24gb2JzZXJ2YWJsZSBvYmplY3RzLCBhcnJheXMsIHNldHMgYW5kIG1hcHNcIik7XG59XG5mdW5jdGlvbiBlbnRyaWVzJCQxKG9iaikge1xuICAgIGlmIChpc09ic2VydmFibGVPYmplY3QkJDEob2JqKSkge1xuICAgICAgICByZXR1cm4ga2V5cyQkMShvYmopLm1hcChmdW5jdGlvbiAoa2V5KSB7IHJldHVybiBba2V5LCBvYmpba2V5XV07IH0pO1xuICAgIH1cbiAgICBpZiAoaXNPYnNlcnZhYmxlTWFwJCQxKG9iaikpIHtcbiAgICAgICAgcmV0dXJuIGtleXMkJDEob2JqKS5tYXAoZnVuY3Rpb24gKGtleSkgeyByZXR1cm4gW2tleSwgb2JqLmdldChrZXkpXTsgfSk7XG4gICAgfVxuICAgIGlmIChpc09ic2VydmFibGVTZXQkJDEob2JqKSkge1xuICAgICAgICByZXR1cm4gQXJyYXkuZnJvbShvYmouZW50cmllcygpKTtcbiAgICB9XG4gICAgaWYgKGlzT2JzZXJ2YWJsZUFycmF5JCQxKG9iaikpIHtcbiAgICAgICAgcmV0dXJuIG9iai5tYXAoZnVuY3Rpb24gKGtleSwgaW5kZXgpIHsgcmV0dXJuIFtpbmRleCwga2V5XTsgfSk7XG4gICAgfVxuICAgIHJldHVybiBmYWlsJCQxKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiAmJlxuICAgICAgICBcIidlbnRyaWVzKCknIGNhbiBvbmx5IGJlIHVzZWQgb24gb2JzZXJ2YWJsZSBvYmplY3RzLCBhcnJheXMgYW5kIG1hcHNcIik7XG59XG5mdW5jdGlvbiBzZXQkJDEob2JqLCBrZXksIHZhbHVlKSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDIpIHtcbiAgICAgICAgc3RhcnRCYXRjaCQkMSgpO1xuICAgICAgICB2YXIgdmFsdWVzXzEgPSBrZXk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBmb3IgKHZhciBrZXlfMSBpbiB2YWx1ZXNfMSlcbiAgICAgICAgICAgICAgICBzZXQkJDEob2JqLCBrZXlfMSwgdmFsdWVzXzFba2V5XzFdKTtcbiAgICAgICAgfVxuICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgIGVuZEJhdGNoJCQxKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoaXNPYnNlcnZhYmxlT2JqZWN0JCQxKG9iaikpIHtcbiAgICAgICAgdmFyIGFkbSA9IG9ialskbW9ieCQkMV07XG4gICAgICAgIHZhciBleGlzdGluZ09ic2VydmFibGUgPSBhZG0udmFsdWVzLmdldChrZXkpO1xuICAgICAgICBpZiAoZXhpc3RpbmdPYnNlcnZhYmxlKSB7XG4gICAgICAgICAgICBhZG0ud3JpdGUoa2V5LCB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBhZG0uYWRkT2JzZXJ2YWJsZVByb3Aoa2V5LCB2YWx1ZSwgYWRtLmRlZmF1bHRFbmhhbmNlcik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoaXNPYnNlcnZhYmxlTWFwJCQxKG9iaikpIHtcbiAgICAgICAgb2JqLnNldChrZXksIHZhbHVlKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoaXNPYnNlcnZhYmxlQXJyYXkkJDEob2JqKSkge1xuICAgICAgICBpZiAodHlwZW9mIGtleSAhPT0gXCJudW1iZXJcIilcbiAgICAgICAgICAgIGtleSA9IHBhcnNlSW50KGtleSwgMTApO1xuICAgICAgICBpbnZhcmlhbnQkJDEoa2V5ID49IDAsIFwiTm90IGEgdmFsaWQgaW5kZXg6ICdcIiArIGtleSArIFwiJ1wiKTtcbiAgICAgICAgc3RhcnRCYXRjaCQkMSgpO1xuICAgICAgICBpZiAoa2V5ID49IG9iai5sZW5ndGgpXG4gICAgICAgICAgICBvYmoubGVuZ3RoID0ga2V5ICsgMTtcbiAgICAgICAgb2JqW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgZW5kQmF0Y2gkJDEoKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiBmYWlsJCQxKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiAmJlxuICAgICAgICAgICAgXCInc2V0KCknIGNhbiBvbmx5IGJlIHVzZWQgb24gb2JzZXJ2YWJsZSBvYmplY3RzLCBhcnJheXMgYW5kIG1hcHNcIik7XG4gICAgfVxufVxuZnVuY3Rpb24gcmVtb3ZlJCQxKG9iaiwga2V5KSB7XG4gICAgaWYgKGlzT2JzZXJ2YWJsZU9iamVjdCQkMShvYmopKSB7XG4gICAgICAgIFxuICAgICAgICBvYmpbJG1vYngkJDFdLnJlbW92ZShrZXkpO1xuICAgIH1cbiAgICBlbHNlIGlmIChpc09ic2VydmFibGVNYXAkJDEob2JqKSkge1xuICAgICAgICBvYmouZGVsZXRlKGtleSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKGlzT2JzZXJ2YWJsZVNldCQkMShvYmopKSB7XG4gICAgICAgIG9iai5kZWxldGUoa2V5KTtcbiAgICB9XG4gICAgZWxzZSBpZiAoaXNPYnNlcnZhYmxlQXJyYXkkJDEob2JqKSkge1xuICAgICAgICBpZiAodHlwZW9mIGtleSAhPT0gXCJudW1iZXJcIilcbiAgICAgICAgICAgIGtleSA9IHBhcnNlSW50KGtleSwgMTApO1xuICAgICAgICBpbnZhcmlhbnQkJDEoa2V5ID49IDAsIFwiTm90IGEgdmFsaWQgaW5kZXg6ICdcIiArIGtleSArIFwiJ1wiKTtcbiAgICAgICAgb2JqLnNwbGljZShrZXksIDEpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZhaWwkJDEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiICYmXG4gICAgICAgICAgICBcIidyZW1vdmUoKScgY2FuIG9ubHkgYmUgdXNlZCBvbiBvYnNlcnZhYmxlIG9iamVjdHMsIGFycmF5cyBhbmQgbWFwc1wiKTtcbiAgICB9XG59XG5mdW5jdGlvbiBoYXMkJDEob2JqLCBrZXkpIHtcbiAgICBpZiAoaXNPYnNlcnZhYmxlT2JqZWN0JCQxKG9iaikpIHtcbiAgICAgICAgLy8gcmV0dXJuIGtleXMob2JqKS5pbmRleE9mKGtleSkgPj0gMFxuICAgICAgICB2YXIgYWRtID0gZ2V0QWRtaW5pc3RyYXRpb24kJDEob2JqKTtcbiAgICAgICAgcmV0dXJuIGFkbS5oYXMoa2V5KTtcbiAgICB9XG4gICAgZWxzZSBpZiAoaXNPYnNlcnZhYmxlTWFwJCQxKG9iaikpIHtcbiAgICAgICAgcmV0dXJuIG9iai5oYXMoa2V5KTtcbiAgICB9XG4gICAgZWxzZSBpZiAoaXNPYnNlcnZhYmxlU2V0JCQxKG9iaikpIHtcbiAgICAgICAgcmV0dXJuIG9iai5oYXMoa2V5KTtcbiAgICB9XG4gICAgZWxzZSBpZiAoaXNPYnNlcnZhYmxlQXJyYXkkJDEob2JqKSkge1xuICAgICAgICByZXR1cm4ga2V5ID49IDAgJiYga2V5IDwgb2JqLmxlbmd0aDtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiBmYWlsJCQxKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiAmJlxuICAgICAgICAgICAgXCInaGFzKCknIGNhbiBvbmx5IGJlIHVzZWQgb24gb2JzZXJ2YWJsZSBvYmplY3RzLCBhcnJheXMgYW5kIG1hcHNcIik7XG4gICAgfVxufVxuZnVuY3Rpb24gZ2V0JCQxKG9iaiwga2V5KSB7XG4gICAgaWYgKCFoYXMkJDEob2JqLCBrZXkpKVxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIGlmIChpc09ic2VydmFibGVPYmplY3QkJDEob2JqKSkge1xuICAgICAgICByZXR1cm4gb2JqW2tleV07XG4gICAgfVxuICAgIGVsc2UgaWYgKGlzT2JzZXJ2YWJsZU1hcCQkMShvYmopKSB7XG4gICAgICAgIHJldHVybiBvYmouZ2V0KGtleSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKGlzT2JzZXJ2YWJsZUFycmF5JCQxKG9iaikpIHtcbiAgICAgICAgcmV0dXJuIG9ialtrZXldO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZhaWwkJDEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiICYmXG4gICAgICAgICAgICBcIidnZXQoKScgY2FuIG9ubHkgYmUgdXNlZCBvbiBvYnNlcnZhYmxlIG9iamVjdHMsIGFycmF5cyBhbmQgbWFwc1wiKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIG9ic2VydmUkJDEodGhpbmcsIHByb3BPckNiLCBjYk9yRmlyZSwgZmlyZUltbWVkaWF0ZWx5KSB7XG4gICAgaWYgKHR5cGVvZiBjYk9yRmlyZSA9PT0gXCJmdW5jdGlvblwiKVxuICAgICAgICByZXR1cm4gb2JzZXJ2ZU9ic2VydmFibGVQcm9wZXJ0eSh0aGluZywgcHJvcE9yQ2IsIGNiT3JGaXJlLCBmaXJlSW1tZWRpYXRlbHkpO1xuICAgIGVsc2VcbiAgICAgICAgcmV0dXJuIG9ic2VydmVPYnNlcnZhYmxlKHRoaW5nLCBwcm9wT3JDYiwgY2JPckZpcmUpO1xufVxuZnVuY3Rpb24gb2JzZXJ2ZU9ic2VydmFibGUodGhpbmcsIGxpc3RlbmVyLCBmaXJlSW1tZWRpYXRlbHkpIHtcbiAgICByZXR1cm4gZ2V0QWRtaW5pc3RyYXRpb24kJDEodGhpbmcpLm9ic2VydmUobGlzdGVuZXIsIGZpcmVJbW1lZGlhdGVseSk7XG59XG5mdW5jdGlvbiBvYnNlcnZlT2JzZXJ2YWJsZVByb3BlcnR5KHRoaW5nLCBwcm9wZXJ0eSwgbGlzdGVuZXIsIGZpcmVJbW1lZGlhdGVseSkge1xuICAgIHJldHVybiBnZXRBZG1pbmlzdHJhdGlvbiQkMSh0aGluZywgcHJvcGVydHkpLm9ic2VydmUobGlzdGVuZXIsIGZpcmVJbW1lZGlhdGVseSk7XG59XG5cbnZhciBkZWZhdWx0T3B0aW9ucyA9IHtcbiAgICBkZXRlY3RDeWNsZXM6IHRydWUsXG4gICAgZXhwb3J0TWFwc0FzT2JqZWN0czogdHJ1ZSxcbiAgICByZWN1cnNlRXZlcnl0aGluZzogZmFsc2Vcbn07XG5mdW5jdGlvbiBjYWNoZShtYXAsIGtleSwgdmFsdWUsIG9wdGlvbnMpIHtcbiAgICBpZiAob3B0aW9ucy5kZXRlY3RDeWNsZXMpXG4gICAgICAgIG1hcC5zZXQoa2V5LCB2YWx1ZSk7XG4gICAgcmV0dXJuIHZhbHVlO1xufVxuZnVuY3Rpb24gdG9KU0hlbHBlcihzb3VyY2UsIG9wdGlvbnMsIF9fYWxyZWFkeVNlZW4pIHtcbiAgICBpZiAoIW9wdGlvbnMucmVjdXJzZUV2ZXJ5dGhpbmcgJiYgIWlzT2JzZXJ2YWJsZSQkMShzb3VyY2UpKVxuICAgICAgICByZXR1cm4gc291cmNlO1xuICAgIGlmICh0eXBlb2Ygc291cmNlICE9PSBcIm9iamVjdFwiKVxuICAgICAgICByZXR1cm4gc291cmNlO1xuICAgIC8vIERpcmVjdGx5IHJldHVybiBudWxsIGlmIHNvdXJjZSBpcyBudWxsXG4gICAgaWYgKHNvdXJjZSA9PT0gbnVsbClcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgLy8gRGlyZWN0bHkgcmV0dXJuIHRoZSBEYXRlIG9iamVjdCBpdHNlbGYgaWYgY29udGFpbmVkIGluIHRoZSBvYnNlcnZhYmxlXG4gICAgaWYgKHNvdXJjZSBpbnN0YW5jZW9mIERhdGUpXG4gICAgICAgIHJldHVybiBzb3VyY2U7XG4gICAgaWYgKGlzT2JzZXJ2YWJsZVZhbHVlJCQxKHNvdXJjZSkpXG4gICAgICAgIHJldHVybiB0b0pTSGVscGVyKHNvdXJjZS5nZXQoKSwgb3B0aW9ucywgX19hbHJlYWR5U2Vlbik7XG4gICAgLy8gbWFrZSBzdXJlIHdlIHRyYWNrIHRoZSBrZXlzIG9mIHRoZSBvYmplY3RcbiAgICBpZiAoaXNPYnNlcnZhYmxlJCQxKHNvdXJjZSkpXG4gICAgICAgIGtleXMkJDEoc291cmNlKTtcbiAgICB2YXIgZGV0ZWN0Q3ljbGVzID0gb3B0aW9ucy5kZXRlY3RDeWNsZXMgPT09IHRydWU7XG4gICAgaWYgKGRldGVjdEN5Y2xlcyAmJiBzb3VyY2UgIT09IG51bGwgJiYgX19hbHJlYWR5U2Vlbi5oYXMoc291cmNlKSkge1xuICAgICAgICByZXR1cm4gX19hbHJlYWR5U2Vlbi5nZXQoc291cmNlKTtcbiAgICB9XG4gICAgaWYgKGlzT2JzZXJ2YWJsZUFycmF5JCQxKHNvdXJjZSkgfHwgQXJyYXkuaXNBcnJheShzb3VyY2UpKSB7XG4gICAgICAgIHZhciByZXNfMSA9IGNhY2hlKF9fYWxyZWFkeVNlZW4sIHNvdXJjZSwgW10sIG9wdGlvbnMpO1xuICAgICAgICB2YXIgdG9BZGQgPSBzb3VyY2UubWFwKGZ1bmN0aW9uICh2YWx1ZSkgeyByZXR1cm4gdG9KU0hlbHBlcih2YWx1ZSwgb3B0aW9ucywgX19hbHJlYWR5U2Vlbik7IH0pO1xuICAgICAgICByZXNfMS5sZW5ndGggPSB0b0FkZC5sZW5ndGg7XG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gdG9BZGQubGVuZ3RoOyBpIDwgbDsgaSsrKVxuICAgICAgICAgICAgcmVzXzFbaV0gPSB0b0FkZFtpXTtcbiAgICAgICAgcmV0dXJuIHJlc18xO1xuICAgIH1cbiAgICBpZiAoaXNPYnNlcnZhYmxlU2V0JCQxKHNvdXJjZSkgfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKHNvdXJjZSkgPT09IFNldC5wcm90b3R5cGUpIHtcbiAgICAgICAgaWYgKG9wdGlvbnMuZXhwb3J0TWFwc0FzT2JqZWN0cyA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHZhciByZXNfMiA9IGNhY2hlKF9fYWxyZWFkeVNlZW4sIHNvdXJjZSwgbmV3IFNldCgpLCBvcHRpb25zKTtcbiAgICAgICAgICAgIHNvdXJjZS5mb3JFYWNoKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHJlc18yLmFkZCh0b0pTSGVscGVyKHZhbHVlLCBvcHRpb25zLCBfX2FscmVhZHlTZWVuKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiByZXNfMjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHZhciByZXNfMyA9IGNhY2hlKF9fYWxyZWFkeVNlZW4sIHNvdXJjZSwgW10sIG9wdGlvbnMpO1xuICAgICAgICAgICAgc291cmNlLmZvckVhY2goZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgcmVzXzMucHVzaCh0b0pTSGVscGVyKHZhbHVlLCBvcHRpb25zLCBfX2FscmVhZHlTZWVuKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiByZXNfMztcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAoaXNPYnNlcnZhYmxlTWFwJCQxKHNvdXJjZSkgfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKHNvdXJjZSkgPT09IE1hcC5wcm90b3R5cGUpIHtcbiAgICAgICAgaWYgKG9wdGlvbnMuZXhwb3J0TWFwc0FzT2JqZWN0cyA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHZhciByZXNfNCA9IGNhY2hlKF9fYWxyZWFkeVNlZW4sIHNvdXJjZSwgbmV3IE1hcCgpLCBvcHRpb25zKTtcbiAgICAgICAgICAgIHNvdXJjZS5mb3JFYWNoKGZ1bmN0aW9uICh2YWx1ZSwga2V5KSB7XG4gICAgICAgICAgICAgICAgcmVzXzQuc2V0KGtleSwgdG9KU0hlbHBlcih2YWx1ZSwgb3B0aW9ucywgX19hbHJlYWR5U2VlbikpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gcmVzXzQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB2YXIgcmVzXzUgPSBjYWNoZShfX2FscmVhZHlTZWVuLCBzb3VyY2UsIHt9LCBvcHRpb25zKTtcbiAgICAgICAgICAgIHNvdXJjZS5mb3JFYWNoKGZ1bmN0aW9uICh2YWx1ZSwga2V5KSB7XG4gICAgICAgICAgICAgICAgcmVzXzVba2V5XSA9IHRvSlNIZWxwZXIodmFsdWUsIG9wdGlvbnMsIF9fYWxyZWFkeVNlZW4pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gcmVzXzU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gRmFsbGJhY2sgdG8gdGhlIHNpdHVhdGlvbiB0aGF0IHNvdXJjZSBpcyBhbiBPYnNlcnZhYmxlT2JqZWN0IG9yIGEgcGxhaW4gb2JqZWN0XG4gICAgdmFyIHJlcyA9IGNhY2hlKF9fYWxyZWFkeVNlZW4sIHNvdXJjZSwge30sIG9wdGlvbnMpO1xuICAgIGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHtcbiAgICAgICAgcmVzW2tleV0gPSB0b0pTSGVscGVyKHNvdXJjZVtrZXldLCBvcHRpb25zLCBfX2FscmVhZHlTZWVuKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlcztcbn1cbmZ1bmN0aW9uIHRvSlMkJDEoc291cmNlLCBvcHRpb25zKSB7XG4gICAgLy8gYmFja3dhcmQgY29tcGF0aWJpbGl0eVxuICAgIGlmICh0eXBlb2Ygb3B0aW9ucyA9PT0gXCJib29sZWFuXCIpXG4gICAgICAgIG9wdGlvbnMgPSB7IGRldGVjdEN5Y2xlczogb3B0aW9ucyB9O1xuICAgIGlmICghb3B0aW9ucylcbiAgICAgICAgb3B0aW9ucyA9IGRlZmF1bHRPcHRpb25zO1xuICAgIG9wdGlvbnMuZGV0ZWN0Q3ljbGVzID1cbiAgICAgICAgb3B0aW9ucy5kZXRlY3RDeWNsZXMgPT09IHVuZGVmaW5lZFxuICAgICAgICAgICAgPyBvcHRpb25zLnJlY3Vyc2VFdmVyeXRoaW5nID09PSB0cnVlXG4gICAgICAgICAgICA6IG9wdGlvbnMuZGV0ZWN0Q3ljbGVzID09PSB0cnVlO1xuICAgIHZhciBfX2FscmVhZHlTZWVuO1xuICAgIGlmIChvcHRpb25zLmRldGVjdEN5Y2xlcylcbiAgICAgICAgX19hbHJlYWR5U2VlbiA9IG5ldyBNYXAoKTtcbiAgICByZXR1cm4gdG9KU0hlbHBlcihzb3VyY2UsIG9wdGlvbnMsIF9fYWxyZWFkeVNlZW4pO1xufVxuXG5mdW5jdGlvbiB0cmFjZSQkMSgpIHtcbiAgICB2YXIgYXJncyA9IFtdO1xuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgIGFyZ3NbX2ldID0gYXJndW1lbnRzW19pXTtcbiAgICB9XG4gICAgdmFyIGVudGVyQnJlYWtQb2ludCA9IGZhbHNlO1xuICAgIGlmICh0eXBlb2YgYXJnc1thcmdzLmxlbmd0aCAtIDFdID09PSBcImJvb2xlYW5cIilcbiAgICAgICAgZW50ZXJCcmVha1BvaW50ID0gYXJncy5wb3AoKTtcbiAgICB2YXIgZGVyaXZhdGlvbiA9IGdldEF0b21Gcm9tQXJncyhhcmdzKTtcbiAgICBpZiAoIWRlcml2YXRpb24pIHtcbiAgICAgICAgcmV0dXJuIGZhaWwkJDEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiICYmXG4gICAgICAgICAgICBcIid0cmFjZShicmVhaz8pJyBjYW4gb25seSBiZSB1c2VkIGluc2lkZSBhIHRyYWNrZWQgY29tcHV0ZWQgdmFsdWUgb3IgYSBSZWFjdGlvbi4gQ29uc2lkZXIgcGFzc2luZyBpbiB0aGUgY29tcHV0ZWQgdmFsdWUgb3IgcmVhY3Rpb24gZXhwbGljaXRseVwiKTtcbiAgICB9XG4gICAgaWYgKGRlcml2YXRpb24uaXNUcmFjaW5nID09PSBUcmFjZU1vZGUkJDEuTk9ORSkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIlttb2J4LnRyYWNlXSAnXCIgKyBkZXJpdmF0aW9uLm5hbWUgKyBcIicgdHJhY2luZyBlbmFibGVkXCIpO1xuICAgIH1cbiAgICBkZXJpdmF0aW9uLmlzVHJhY2luZyA9IGVudGVyQnJlYWtQb2ludCA/IFRyYWNlTW9kZSQkMS5CUkVBSyA6IFRyYWNlTW9kZSQkMS5MT0c7XG59XG5mdW5jdGlvbiBnZXRBdG9tRnJvbUFyZ3MoYXJncykge1xuICAgIHN3aXRjaCAoYXJncy5sZW5ndGgpIHtcbiAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgcmV0dXJuIGdsb2JhbFN0YXRlJCQxLnRyYWNraW5nRGVyaXZhdGlvbjtcbiAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgcmV0dXJuIGdldEF0b20kJDEoYXJnc1swXSk7XG4gICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgIHJldHVybiBnZXRBdG9tJCQxKGFyZ3NbMF0sIGFyZ3NbMV0pO1xuICAgIH1cbn1cblxuLyoqXG4gKiBEdXJpbmcgYSB0cmFuc2FjdGlvbiBubyB2aWV3cyBhcmUgdXBkYXRlZCB1bnRpbCB0aGUgZW5kIG9mIHRoZSB0cmFuc2FjdGlvbi5cbiAqIFRoZSB0cmFuc2FjdGlvbiB3aWxsIGJlIHJ1biBzeW5jaHJvbm91c2x5IG5vbmV0aGVsZXNzLlxuICpcbiAqIEBwYXJhbSBhY3Rpb24gYSBmdW5jdGlvbiB0aGF0IHVwZGF0ZXMgc29tZSByZWFjdGl2ZSBzdGF0ZVxuICogQHJldHVybnMgYW55IHZhbHVlIHRoYXQgd2FzIHJldHVybmVkIGJ5IHRoZSAnYWN0aW9uJyBwYXJhbWV0ZXIuXG4gKi9cbmZ1bmN0aW9uIHRyYW5zYWN0aW9uJCQxKGFjdGlvbiQkMSwgdGhpc0FyZykge1xuICAgIGlmICh0aGlzQXJnID09PSB2b2lkIDApIHsgdGhpc0FyZyA9IHVuZGVmaW5lZDsgfVxuICAgIHN0YXJ0QmF0Y2gkJDEoKTtcbiAgICB0cnkge1xuICAgICAgICByZXR1cm4gYWN0aW9uJCQxLmFwcGx5KHRoaXNBcmcpO1xuICAgIH1cbiAgICBmaW5hbGx5IHtcbiAgICAgICAgZW5kQmF0Y2gkJDEoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHdoZW4kJDEocHJlZGljYXRlLCBhcmcxLCBhcmcyKSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEgfHwgKGFyZzEgJiYgdHlwZW9mIGFyZzEgPT09IFwib2JqZWN0XCIpKVxuICAgICAgICByZXR1cm4gd2hlblByb21pc2UocHJlZGljYXRlLCBhcmcxKTtcbiAgICByZXR1cm4gX3doZW4ocHJlZGljYXRlLCBhcmcxLCBhcmcyIHx8IHt9KTtcbn1cbmZ1bmN0aW9uIF93aGVuKHByZWRpY2F0ZSwgZWZmZWN0LCBvcHRzKSB7XG4gICAgdmFyIHRpbWVvdXRIYW5kbGU7XG4gICAgaWYgKHR5cGVvZiBvcHRzLnRpbWVvdXQgPT09IFwibnVtYmVyXCIpIHtcbiAgICAgICAgdGltZW91dEhhbmRsZSA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKCFkaXNwb3NlclskbW9ieCQkMV0uaXNEaXNwb3NlZCkge1xuICAgICAgICAgICAgICAgIGRpc3Bvc2VyKCk7XG4gICAgICAgICAgICAgICAgdmFyIGVycm9yID0gbmV3IEVycm9yKFwiV0hFTl9USU1FT1VUXCIpO1xuICAgICAgICAgICAgICAgIGlmIChvcHRzLm9uRXJyb3IpXG4gICAgICAgICAgICAgICAgICAgIG9wdHMub25FcnJvcihlcnJvcik7XG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgb3B0cy50aW1lb3V0KTtcbiAgICB9XG4gICAgb3B0cy5uYW1lID0gb3B0cy5uYW1lIHx8IFwiV2hlbkBcIiArIGdldE5leHRJZCQkMSgpO1xuICAgIHZhciBlZmZlY3RBY3Rpb24gPSBjcmVhdGVBY3Rpb24kJDEob3B0cy5uYW1lICsgXCItZWZmZWN0XCIsIGVmZmVjdCk7XG4gICAgdmFyIGRpc3Bvc2VyID0gYXV0b3J1biQkMShmdW5jdGlvbiAocikge1xuICAgICAgICBpZiAocHJlZGljYXRlKCkpIHtcbiAgICAgICAgICAgIHIuZGlzcG9zZSgpO1xuICAgICAgICAgICAgaWYgKHRpbWVvdXRIYW5kbGUpXG4gICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXRIYW5kbGUpO1xuICAgICAgICAgICAgZWZmZWN0QWN0aW9uKCk7XG4gICAgICAgIH1cbiAgICB9LCBvcHRzKTtcbiAgICByZXR1cm4gZGlzcG9zZXI7XG59XG5mdW5jdGlvbiB3aGVuUHJvbWlzZShwcmVkaWNhdGUsIG9wdHMpIHtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiICYmIG9wdHMgJiYgb3B0cy5vbkVycm9yKVxuICAgICAgICByZXR1cm4gZmFpbCQkMShcInRoZSBvcHRpb25zICdvbkVycm9yJyBhbmQgJ3Byb21pc2UnIGNhbm5vdCBiZSBjb21iaW5lZFwiKTtcbiAgICB2YXIgY2FuY2VsO1xuICAgIHZhciByZXMgPSBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIHZhciBkaXNwb3NlciA9IF93aGVuKHByZWRpY2F0ZSwgcmVzb2x2ZSwgX19hc3NpZ24oe30sIG9wdHMsIHsgb25FcnJvcjogcmVqZWN0IH0pKTtcbiAgICAgICAgY2FuY2VsID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgZGlzcG9zZXIoKTtcbiAgICAgICAgICAgIHJlamVjdChcIldIRU5fQ0FOQ0VMTEVEXCIpO1xuICAgICAgICB9O1xuICAgIH0pO1xuICAgIHJlcy5jYW5jZWwgPSBjYW5jZWw7XG4gICAgcmV0dXJuIHJlcztcbn1cblxuZnVuY3Rpb24gZ2V0QWRtKHRhcmdldCkge1xuICAgIHJldHVybiB0YXJnZXRbJG1vYngkJDFdO1xufVxuLy8gT3B0aW1pemF0aW9uOiB3ZSBkb24ndCBuZWVkIHRoZSBpbnRlcm1lZGlhdGUgb2JqZWN0cyBhbmQgY291bGQgaGF2ZSBhIGNvbXBsZXRlbHkgY3VzdG9tIGFkbWluaXN0cmF0aW9uIGZvciBEeW5hbWljT2JqZWN0cyxcbi8vIGFuZCBza2lwIGVpdGhlciB0aGUgaW50ZXJuYWwgdmFsdWVzIG1hcCwgb3IgdGhlIGJhc2Ugb2JqZWN0IHdpdGggaXRzIHByb3BlcnR5IGRlc2NyaXB0b3JzIVxudmFyIG9iamVjdFByb3h5VHJhcHMgPSB7XG4gICAgaGFzOiBmdW5jdGlvbiAodGFyZ2V0LCBuYW1lKSB7XG4gICAgICAgIGlmIChuYW1lID09PSAkbW9ieCQkMSB8fCBuYW1lID09PSBcImNvbnN0cnVjdG9yXCIgfHwgbmFtZSA9PT0gbW9ieERpZFJ1bkxhenlJbml0aWFsaXplcnNTeW1ib2wkJDEpXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgdmFyIGFkbSA9IGdldEFkbSh0YXJnZXQpO1xuICAgICAgICAvLyBNV0U6IHNob3VsZCBgaW5gIG9wZXJhdG9yIGJlIHJlYWN0aXZlPyBJZiBub3QsIGJlbG93IGNvZGUgcGF0aCB3aWxsIGJlIGZhc3RlciAvIG1vcmUgbWVtb3J5IGVmZmljaWVudFxuICAgICAgICAvLyBUT0RPOiBjaGVjayBwZXJmb3JtYW5jZSBzdGF0cyFcbiAgICAgICAgLy8gaWYgKGFkbS52YWx1ZXMuZ2V0KG5hbWUgYXMgc3RyaW5nKSkgcmV0dXJuIHRydWVcbiAgICAgICAgaWYgKHR5cGVvZiBuYW1lID09PSBcInN0cmluZ1wiKVxuICAgICAgICAgICAgcmV0dXJuIGFkbS5oYXMobmFtZSk7XG4gICAgICAgIHJldHVybiBuYW1lIGluIHRhcmdldDtcbiAgICB9LFxuICAgIGdldDogZnVuY3Rpb24gKHRhcmdldCwgbmFtZSkge1xuICAgICAgICBpZiAobmFtZSA9PT0gJG1vYngkJDEgfHwgbmFtZSA9PT0gXCJjb25zdHJ1Y3RvclwiIHx8IG5hbWUgPT09IG1vYnhEaWRSdW5MYXp5SW5pdGlhbGl6ZXJzU3ltYm9sJCQxKVxuICAgICAgICAgICAgcmV0dXJuIHRhcmdldFtuYW1lXTtcbiAgICAgICAgdmFyIGFkbSA9IGdldEFkbSh0YXJnZXQpO1xuICAgICAgICB2YXIgb2JzZXJ2YWJsZSQkMSA9IGFkbS52YWx1ZXMuZ2V0KG5hbWUpO1xuICAgICAgICBpZiAob2JzZXJ2YWJsZSQkMSBpbnN0YW5jZW9mIEF0b20kJDEpIHtcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSBvYnNlcnZhYmxlJCQxLmdldCgpO1xuICAgICAgICAgICAgaWYgKHJlc3VsdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgLy8gVGhpcyBmaXhlcyAjMTc5NiwgYmVjYXVzZSBkZWxldGluZyBhIHByb3AgdGhhdCBoYXMgYW5cbiAgICAgICAgICAgICAgICAvLyB1bmRlZmluZWQgdmFsdWUgd29uJ3QgcmV0cmlnZ2VyIGEgb2JzZXJ2ZXIgKG5vIHZpc2libGUgZWZmZWN0KSxcbiAgICAgICAgICAgICAgICAvLyB0aGUgYXV0b3J1biB3b3VsZG4ndCBzdWJzY3JpYmUgdG8gZnV0dXJlIGtleSBjaGFuZ2VzIChzZWUgYWxzbyBuZXh0IGNvbW1lbnQpXG4gICAgICAgICAgICAgICAgYWRtLmhhcyhuYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH1cbiAgICAgICAgLy8gbWFrZSBzdXJlIHdlIHN0YXJ0IGxpc3RlbmluZyB0byBmdXR1cmUga2V5c1xuICAgICAgICAvLyBub3RlIHRoYXQgd2Ugb25seSBkbyB0aGlzIGhlcmUgZm9yIG9wdGltaXphdGlvblxuICAgICAgICBpZiAodHlwZW9mIG5hbWUgPT09IFwic3RyaW5nXCIpXG4gICAgICAgICAgICBhZG0uaGFzKG5hbWUpO1xuICAgICAgICByZXR1cm4gdGFyZ2V0W25hbWVdO1xuICAgIH0sXG4gICAgc2V0OiBmdW5jdGlvbiAodGFyZ2V0LCBuYW1lLCB2YWx1ZSkge1xuICAgICAgICBpZiAodHlwZW9mIG5hbWUgIT09IFwic3RyaW5nXCIpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIHNldCQkMSh0YXJnZXQsIG5hbWUsIHZhbHVlKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSxcbiAgICBkZWxldGVQcm9wZXJ0eTogZnVuY3Rpb24gKHRhcmdldCwgbmFtZSkge1xuICAgICAgICBpZiAodHlwZW9mIG5hbWUgIT09IFwic3RyaW5nXCIpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIHZhciBhZG0gPSBnZXRBZG0odGFyZ2V0KTtcbiAgICAgICAgYWRtLnJlbW92ZShuYW1lKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSxcbiAgICBvd25LZXlzOiBmdW5jdGlvbiAodGFyZ2V0KSB7XG4gICAgICAgIHZhciBhZG0gPSBnZXRBZG0odGFyZ2V0KTtcbiAgICAgICAgYWRtLmtleXNBdG9tLnJlcG9ydE9ic2VydmVkKCk7XG4gICAgICAgIHJldHVybiBSZWZsZWN0Lm93bktleXModGFyZ2V0KTtcbiAgICB9LFxuICAgIHByZXZlbnRFeHRlbnNpb25zOiBmdW5jdGlvbiAodGFyZ2V0KSB7XG4gICAgICAgIGZhaWwkJDEoXCJEeW5hbWljIG9ic2VydmFibGUgb2JqZWN0cyBjYW5ub3QgYmUgZnJvemVuXCIpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufTtcbmZ1bmN0aW9uIGNyZWF0ZUR5bmFtaWNPYnNlcnZhYmxlT2JqZWN0JCQxKGJhc2UpIHtcbiAgICB2YXIgcHJveHkgPSBuZXcgUHJveHkoYmFzZSwgb2JqZWN0UHJveHlUcmFwcyk7XG4gICAgYmFzZVskbW9ieCQkMV0ucHJveHkgPSBwcm94eTtcbiAgICByZXR1cm4gcHJveHk7XG59XG5cbmZ1bmN0aW9uIGhhc0ludGVyY2VwdG9ycyQkMShpbnRlcmNlcHRhYmxlKSB7XG4gICAgcmV0dXJuIGludGVyY2VwdGFibGUuaW50ZXJjZXB0b3JzICE9PSB1bmRlZmluZWQgJiYgaW50ZXJjZXB0YWJsZS5pbnRlcmNlcHRvcnMubGVuZ3RoID4gMDtcbn1cbmZ1bmN0aW9uIHJlZ2lzdGVySW50ZXJjZXB0b3IkJDEoaW50ZXJjZXB0YWJsZSwgaGFuZGxlcikge1xuICAgIHZhciBpbnRlcmNlcHRvcnMgPSBpbnRlcmNlcHRhYmxlLmludGVyY2VwdG9ycyB8fCAoaW50ZXJjZXB0YWJsZS5pbnRlcmNlcHRvcnMgPSBbXSk7XG4gICAgaW50ZXJjZXB0b3JzLnB1c2goaGFuZGxlcik7XG4gICAgcmV0dXJuIG9uY2UkJDEoZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgaWR4ID0gaW50ZXJjZXB0b3JzLmluZGV4T2YoaGFuZGxlcik7XG4gICAgICAgIGlmIChpZHggIT09IC0xKVxuICAgICAgICAgICAgaW50ZXJjZXB0b3JzLnNwbGljZShpZHgsIDEpO1xuICAgIH0pO1xufVxuZnVuY3Rpb24gaW50ZXJjZXB0Q2hhbmdlJCQxKGludGVyY2VwdGFibGUsIGNoYW5nZSkge1xuICAgIHZhciBwcmV2VSA9IHVudHJhY2tlZFN0YXJ0JCQxKCk7XG4gICAgdHJ5IHtcbiAgICAgICAgdmFyIGludGVyY2VwdG9ycyA9IGludGVyY2VwdGFibGUuaW50ZXJjZXB0b3JzO1xuICAgICAgICBpZiAoaW50ZXJjZXB0b3JzKVxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSBpbnRlcmNlcHRvcnMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgY2hhbmdlID0gaW50ZXJjZXB0b3JzW2ldKGNoYW5nZSk7XG4gICAgICAgICAgICAgICAgaW52YXJpYW50JCQxKCFjaGFuZ2UgfHwgY2hhbmdlLnR5cGUsIFwiSW50ZXJjZXB0IGhhbmRsZXJzIHNob3VsZCByZXR1cm4gbm90aGluZyBvciBhIGNoYW5nZSBvYmplY3RcIik7XG4gICAgICAgICAgICAgICAgaWYgKCFjaGFuZ2UpXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICByZXR1cm4gY2hhbmdlO1xuICAgIH1cbiAgICBmaW5hbGx5IHtcbiAgICAgICAgdW50cmFja2VkRW5kJCQxKHByZXZVKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGhhc0xpc3RlbmVycyQkMShsaXN0ZW5hYmxlKSB7XG4gICAgcmV0dXJuIGxpc3RlbmFibGUuY2hhbmdlTGlzdGVuZXJzICE9PSB1bmRlZmluZWQgJiYgbGlzdGVuYWJsZS5jaGFuZ2VMaXN0ZW5lcnMubGVuZ3RoID4gMDtcbn1cbmZ1bmN0aW9uIHJlZ2lzdGVyTGlzdGVuZXIkJDEobGlzdGVuYWJsZSwgaGFuZGxlcikge1xuICAgIHZhciBsaXN0ZW5lcnMgPSBsaXN0ZW5hYmxlLmNoYW5nZUxpc3RlbmVycyB8fCAobGlzdGVuYWJsZS5jaGFuZ2VMaXN0ZW5lcnMgPSBbXSk7XG4gICAgbGlzdGVuZXJzLnB1c2goaGFuZGxlcik7XG4gICAgcmV0dXJuIG9uY2UkJDEoZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgaWR4ID0gbGlzdGVuZXJzLmluZGV4T2YoaGFuZGxlcik7XG4gICAgICAgIGlmIChpZHggIT09IC0xKVxuICAgICAgICAgICAgbGlzdGVuZXJzLnNwbGljZShpZHgsIDEpO1xuICAgIH0pO1xufVxuZnVuY3Rpb24gbm90aWZ5TGlzdGVuZXJzJCQxKGxpc3RlbmFibGUsIGNoYW5nZSkge1xuICAgIHZhciBwcmV2VSA9IHVudHJhY2tlZFN0YXJ0JCQxKCk7XG4gICAgdmFyIGxpc3RlbmVycyA9IGxpc3RlbmFibGUuY2hhbmdlTGlzdGVuZXJzO1xuICAgIGlmICghbGlzdGVuZXJzKVxuICAgICAgICByZXR1cm47XG4gICAgbGlzdGVuZXJzID0gbGlzdGVuZXJzLnNsaWNlKCk7XG4gICAgZm9yICh2YXIgaSA9IDAsIGwgPSBsaXN0ZW5lcnMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgIGxpc3RlbmVyc1tpXShjaGFuZ2UpO1xuICAgIH1cbiAgICB1bnRyYWNrZWRFbmQkJDEocHJldlUpO1xufVxuXG52YXIgTUFYX1NQTElDRV9TSVpFID0gMTAwMDA7IC8vIFNlZSBlLmcuIGh0dHBzOi8vZ2l0aHViLmNvbS9tb2J4anMvbW9ieC9pc3N1ZXMvODU5XG52YXIgYXJyYXlUcmFwcyA9IHtcbiAgICBnZXQ6IGZ1bmN0aW9uICh0YXJnZXQsIG5hbWUpIHtcbiAgICAgICAgaWYgKG5hbWUgPT09ICRtb2J4JCQxKVxuICAgICAgICAgICAgcmV0dXJuIHRhcmdldFskbW9ieCQkMV07XG4gICAgICAgIGlmIChuYW1lID09PSBcImxlbmd0aFwiKVxuICAgICAgICAgICAgcmV0dXJuIHRhcmdldFskbW9ieCQkMV0uZ2V0QXJyYXlMZW5ndGgoKTtcbiAgICAgICAgaWYgKHR5cGVvZiBuYW1lID09PSBcIm51bWJlclwiKSB7XG4gICAgICAgICAgICByZXR1cm4gYXJyYXlFeHRlbnNpb25zLmdldC5jYWxsKHRhcmdldCwgbmFtZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiBuYW1lID09PSBcInN0cmluZ1wiICYmICFpc05hTihuYW1lKSkge1xuICAgICAgICAgICAgcmV0dXJuIGFycmF5RXh0ZW5zaW9ucy5nZXQuY2FsbCh0YXJnZXQsIHBhcnNlSW50KG5hbWUpKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYXJyYXlFeHRlbnNpb25zLmhhc093blByb3BlcnR5KG5hbWUpKSB7XG4gICAgICAgICAgICByZXR1cm4gYXJyYXlFeHRlbnNpb25zW25hbWVdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0YXJnZXRbbmFtZV07XG4gICAgfSxcbiAgICBzZXQ6IGZ1bmN0aW9uICh0YXJnZXQsIG5hbWUsIHZhbHVlKSB7XG4gICAgICAgIGlmIChuYW1lID09PSBcImxlbmd0aFwiKSB7XG4gICAgICAgICAgICB0YXJnZXRbJG1vYngkJDFdLnNldEFycmF5TGVuZ3RoKHZhbHVlKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgbmFtZSA9PT0gXCJudW1iZXJcIikge1xuICAgICAgICAgICAgYXJyYXlFeHRlbnNpb25zLnNldC5jYWxsKHRhcmdldCwgbmFtZSwgdmFsdWUpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFpc05hTihuYW1lKSkge1xuICAgICAgICAgICAgYXJyYXlFeHRlbnNpb25zLnNldC5jYWxsKHRhcmdldCwgcGFyc2VJbnQobmFtZSksIHZhbHVlKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9LFxuICAgIHByZXZlbnRFeHRlbnNpb25zOiBmdW5jdGlvbiAodGFyZ2V0KSB7XG4gICAgICAgIGZhaWwkJDEoXCJPYnNlcnZhYmxlIGFycmF5cyBjYW5ub3QgYmUgZnJvemVuXCIpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufTtcbmZ1bmN0aW9uIGNyZWF0ZU9ic2VydmFibGVBcnJheSQkMShpbml0aWFsVmFsdWVzLCBlbmhhbmNlciwgbmFtZSwgb3duZWQpIHtcbiAgICBpZiAobmFtZSA9PT0gdm9pZCAwKSB7IG5hbWUgPSBcIk9ic2VydmFibGVBcnJheUBcIiArIGdldE5leHRJZCQkMSgpOyB9XG4gICAgaWYgKG93bmVkID09PSB2b2lkIDApIHsgb3duZWQgPSBmYWxzZTsgfVxuICAgIHZhciBhZG0gPSBuZXcgT2JzZXJ2YWJsZUFycmF5QWRtaW5pc3RyYXRpb24obmFtZSwgZW5oYW5jZXIsIG93bmVkKTtcbiAgICBhZGRIaWRkZW5GaW5hbFByb3AkJDEoYWRtLnZhbHVlcywgJG1vYngkJDEsIGFkbSk7XG4gICAgdmFyIHByb3h5ID0gbmV3IFByb3h5KGFkbS52YWx1ZXMsIGFycmF5VHJhcHMpO1xuICAgIGFkbS5wcm94eSA9IHByb3h5O1xuICAgIGlmIChpbml0aWFsVmFsdWVzICYmIGluaXRpYWxWYWx1ZXMubGVuZ3RoKSB7XG4gICAgICAgIHZhciBwcmV2ID0gYWxsb3dTdGF0ZUNoYW5nZXNTdGFydCQkMSh0cnVlKTtcbiAgICAgICAgYWRtLnNwbGljZVdpdGhBcnJheSgwLCAwLCBpbml0aWFsVmFsdWVzKTtcbiAgICAgICAgYWxsb3dTdGF0ZUNoYW5nZXNFbmQkJDEocHJldik7XG4gICAgfVxuICAgIHJldHVybiBwcm94eTtcbn1cbnZhciBPYnNlcnZhYmxlQXJyYXlBZG1pbmlzdHJhdGlvbiA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBPYnNlcnZhYmxlQXJyYXlBZG1pbmlzdHJhdGlvbihuYW1lLCBlbmhhbmNlciwgb3duZWQpIHtcbiAgICAgICAgdGhpcy5vd25lZCA9IG93bmVkO1xuICAgICAgICB0aGlzLnZhbHVlcyA9IFtdO1xuICAgICAgICB0aGlzLnByb3h5ID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLmxhc3RLbm93bkxlbmd0aCA9IDA7XG4gICAgICAgIHRoaXMuYXRvbSA9IG5ldyBBdG9tJCQxKG5hbWUgfHwgXCJPYnNlcnZhYmxlQXJyYXlAXCIgKyBnZXROZXh0SWQkJDEoKSk7XG4gICAgICAgIHRoaXMuZW5oYW5jZXIgPSBmdW5jdGlvbiAobmV3Viwgb2xkVikgeyByZXR1cm4gZW5oYW5jZXIobmV3Viwgb2xkViwgbmFtZSArIFwiWy4uXVwiKTsgfTtcbiAgICB9XG4gICAgT2JzZXJ2YWJsZUFycmF5QWRtaW5pc3RyYXRpb24ucHJvdG90eXBlLmRlaGFuY2VWYWx1ZSA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICBpZiAodGhpcy5kZWhhbmNlciAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGVoYW5jZXIodmFsdWUpO1xuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfTtcbiAgICBPYnNlcnZhYmxlQXJyYXlBZG1pbmlzdHJhdGlvbi5wcm90b3R5cGUuZGVoYW5jZVZhbHVlcyA9IGZ1bmN0aW9uICh2YWx1ZXMkJDEpIHtcbiAgICAgICAgaWYgKHRoaXMuZGVoYW5jZXIgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZXMkJDEubGVuZ3RoID4gMClcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZXMkJDEubWFwKHRoaXMuZGVoYW5jZXIpO1xuICAgICAgICByZXR1cm4gdmFsdWVzJCQxO1xuICAgIH07XG4gICAgT2JzZXJ2YWJsZUFycmF5QWRtaW5pc3RyYXRpb24ucHJvdG90eXBlLmludGVyY2VwdCA9IGZ1bmN0aW9uIChoYW5kbGVyKSB7XG4gICAgICAgIHJldHVybiByZWdpc3RlckludGVyY2VwdG9yJCQxKHRoaXMsIGhhbmRsZXIpO1xuICAgIH07XG4gICAgT2JzZXJ2YWJsZUFycmF5QWRtaW5pc3RyYXRpb24ucHJvdG90eXBlLm9ic2VydmUgPSBmdW5jdGlvbiAobGlzdGVuZXIsIGZpcmVJbW1lZGlhdGVseSkge1xuICAgICAgICBpZiAoZmlyZUltbWVkaWF0ZWx5ID09PSB2b2lkIDApIHsgZmlyZUltbWVkaWF0ZWx5ID0gZmFsc2U7IH1cbiAgICAgICAgaWYgKGZpcmVJbW1lZGlhdGVseSkge1xuICAgICAgICAgICAgbGlzdGVuZXIoe1xuICAgICAgICAgICAgICAgIG9iamVjdDogdGhpcy5wcm94eSxcbiAgICAgICAgICAgICAgICB0eXBlOiBcInNwbGljZVwiLFxuICAgICAgICAgICAgICAgIGluZGV4OiAwLFxuICAgICAgICAgICAgICAgIGFkZGVkOiB0aGlzLnZhbHVlcy5zbGljZSgpLFxuICAgICAgICAgICAgICAgIGFkZGVkQ291bnQ6IHRoaXMudmFsdWVzLmxlbmd0aCxcbiAgICAgICAgICAgICAgICByZW1vdmVkOiBbXSxcbiAgICAgICAgICAgICAgICByZW1vdmVkQ291bnQ6IDBcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZWdpc3Rlckxpc3RlbmVyJCQxKHRoaXMsIGxpc3RlbmVyKTtcbiAgICB9O1xuICAgIE9ic2VydmFibGVBcnJheUFkbWluaXN0cmF0aW9uLnByb3RvdHlwZS5nZXRBcnJheUxlbmd0aCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5hdG9tLnJlcG9ydE9ic2VydmVkKCk7XG4gICAgICAgIHJldHVybiB0aGlzLnZhbHVlcy5sZW5ndGg7XG4gICAgfTtcbiAgICBPYnNlcnZhYmxlQXJyYXlBZG1pbmlzdHJhdGlvbi5wcm90b3R5cGUuc2V0QXJyYXlMZW5ndGggPSBmdW5jdGlvbiAobmV3TGVuZ3RoKSB7XG4gICAgICAgIGlmICh0eXBlb2YgbmV3TGVuZ3RoICE9PSBcIm51bWJlclwiIHx8IG5ld0xlbmd0aCA8IDApXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJbbW9ieC5hcnJheV0gT3V0IG9mIHJhbmdlOiBcIiArIG5ld0xlbmd0aCk7XG4gICAgICAgIHZhciBjdXJyZW50TGVuZ3RoID0gdGhpcy52YWx1ZXMubGVuZ3RoO1xuICAgICAgICBpZiAobmV3TGVuZ3RoID09PSBjdXJyZW50TGVuZ3RoKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBlbHNlIGlmIChuZXdMZW5ndGggPiBjdXJyZW50TGVuZ3RoKSB7XG4gICAgICAgICAgICB2YXIgbmV3SXRlbXMgPSBuZXcgQXJyYXkobmV3TGVuZ3RoIC0gY3VycmVudExlbmd0aCk7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5ld0xlbmd0aCAtIGN1cnJlbnRMZW5ndGg7IGkrKylcbiAgICAgICAgICAgICAgICBuZXdJdGVtc1tpXSA9IHVuZGVmaW5lZDsgLy8gTm8gQXJyYXkuZmlsbCBldmVyeXdoZXJlLi4uXG4gICAgICAgICAgICB0aGlzLnNwbGljZVdpdGhBcnJheShjdXJyZW50TGVuZ3RoLCAwLCBuZXdJdGVtcyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgdGhpcy5zcGxpY2VXaXRoQXJyYXkobmV3TGVuZ3RoLCBjdXJyZW50TGVuZ3RoIC0gbmV3TGVuZ3RoKTtcbiAgICB9O1xuICAgIE9ic2VydmFibGVBcnJheUFkbWluaXN0cmF0aW9uLnByb3RvdHlwZS51cGRhdGVBcnJheUxlbmd0aCA9IGZ1bmN0aW9uIChvbGRMZW5ndGgsIGRlbHRhKSB7XG4gICAgICAgIGlmIChvbGRMZW5ndGggIT09IHRoaXMubGFzdEtub3duTGVuZ3RoKVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiW21vYnhdIE1vZGlmaWNhdGlvbiBleGNlcHRpb246IHRoZSBpbnRlcm5hbCBzdHJ1Y3R1cmUgb2YgYW4gb2JzZXJ2YWJsZSBhcnJheSB3YXMgY2hhbmdlZC5cIik7XG4gICAgICAgIHRoaXMubGFzdEtub3duTGVuZ3RoICs9IGRlbHRhO1xuICAgIH07XG4gICAgT2JzZXJ2YWJsZUFycmF5QWRtaW5pc3RyYXRpb24ucHJvdG90eXBlLnNwbGljZVdpdGhBcnJheSA9IGZ1bmN0aW9uIChpbmRleCwgZGVsZXRlQ291bnQsIG5ld0l0ZW1zKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIGNoZWNrSWZTdGF0ZU1vZGlmaWNhdGlvbnNBcmVBbGxvd2VkJCQxKHRoaXMuYXRvbSk7XG4gICAgICAgIHZhciBsZW5ndGggPSB0aGlzLnZhbHVlcy5sZW5ndGg7XG4gICAgICAgIGlmIChpbmRleCA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgaW5kZXggPSAwO1xuICAgICAgICBlbHNlIGlmIChpbmRleCA+IGxlbmd0aClcbiAgICAgICAgICAgIGluZGV4ID0gbGVuZ3RoO1xuICAgICAgICBlbHNlIGlmIChpbmRleCA8IDApXG4gICAgICAgICAgICBpbmRleCA9IE1hdGgubWF4KDAsIGxlbmd0aCArIGluZGV4KTtcbiAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpXG4gICAgICAgICAgICBkZWxldGVDb3VudCA9IGxlbmd0aCAtIGluZGV4O1xuICAgICAgICBlbHNlIGlmIChkZWxldGVDb3VudCA9PT0gdW5kZWZpbmVkIHx8IGRlbGV0ZUNvdW50ID09PSBudWxsKVxuICAgICAgICAgICAgZGVsZXRlQ291bnQgPSAwO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICBkZWxldGVDb3VudCA9IE1hdGgubWF4KDAsIE1hdGgubWluKGRlbGV0ZUNvdW50LCBsZW5ndGggLSBpbmRleCkpO1xuICAgICAgICBpZiAobmV3SXRlbXMgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIG5ld0l0ZW1zID0gRU1QVFlfQVJSQVkkJDE7XG4gICAgICAgIGlmIChoYXNJbnRlcmNlcHRvcnMkJDEodGhpcykpIHtcbiAgICAgICAgICAgIHZhciBjaGFuZ2UgPSBpbnRlcmNlcHRDaGFuZ2UkJDEodGhpcywge1xuICAgICAgICAgICAgICAgIG9iamVjdDogdGhpcy5wcm94eSxcbiAgICAgICAgICAgICAgICB0eXBlOiBcInNwbGljZVwiLFxuICAgICAgICAgICAgICAgIGluZGV4OiBpbmRleCxcbiAgICAgICAgICAgICAgICByZW1vdmVkQ291bnQ6IGRlbGV0ZUNvdW50LFxuICAgICAgICAgICAgICAgIGFkZGVkOiBuZXdJdGVtc1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoIWNoYW5nZSlcbiAgICAgICAgICAgICAgICByZXR1cm4gRU1QVFlfQVJSQVkkJDE7XG4gICAgICAgICAgICBkZWxldGVDb3VudCA9IGNoYW5nZS5yZW1vdmVkQ291bnQ7XG4gICAgICAgICAgICBuZXdJdGVtcyA9IGNoYW5nZS5hZGRlZDtcbiAgICAgICAgfVxuICAgICAgICBuZXdJdGVtcyA9IG5ld0l0ZW1zLmxlbmd0aCA9PT0gMCA/IG5ld0l0ZW1zIDogbmV3SXRlbXMubWFwKGZ1bmN0aW9uICh2KSB7IHJldHVybiBfdGhpcy5lbmhhbmNlcih2LCB1bmRlZmluZWQpOyB9KTtcbiAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xuICAgICAgICAgICAgdmFyIGxlbmd0aERlbHRhID0gbmV3SXRlbXMubGVuZ3RoIC0gZGVsZXRlQ291bnQ7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUFycmF5TGVuZ3RoKGxlbmd0aCwgbGVuZ3RoRGVsdGEpOyAvLyBjaGVja3MgaWYgaW50ZXJuYWwgYXJyYXkgd2Fzbid0IG1vZGlmaWVkXG4gICAgICAgIH1cbiAgICAgICAgdmFyIHJlcyA9IHRoaXMuc3BsaWNlSXRlbXNJbnRvVmFsdWVzKGluZGV4LCBkZWxldGVDb3VudCwgbmV3SXRlbXMpO1xuICAgICAgICBpZiAoZGVsZXRlQ291bnQgIT09IDAgfHwgbmV3SXRlbXMubGVuZ3RoICE9PSAwKVxuICAgICAgICAgICAgdGhpcy5ub3RpZnlBcnJheVNwbGljZShpbmRleCwgbmV3SXRlbXMsIHJlcyk7XG4gICAgICAgIHJldHVybiB0aGlzLmRlaGFuY2VWYWx1ZXMocmVzKTtcbiAgICB9O1xuICAgIE9ic2VydmFibGVBcnJheUFkbWluaXN0cmF0aW9uLnByb3RvdHlwZS5zcGxpY2VJdGVtc0ludG9WYWx1ZXMgPSBmdW5jdGlvbiAoaW5kZXgsIGRlbGV0ZUNvdW50LCBuZXdJdGVtcykge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIGlmIChuZXdJdGVtcy5sZW5ndGggPCBNQVhfU1BMSUNFX1NJWkUpIHtcbiAgICAgICAgICAgIHJldHVybiAoX2EgPSB0aGlzLnZhbHVlcykuc3BsaWNlLmFwcGx5KF9hLCBfX3NwcmVhZChbaW5kZXgsIGRlbGV0ZUNvdW50XSwgbmV3SXRlbXMpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHZhciByZXMgPSB0aGlzLnZhbHVlcy5zbGljZShpbmRleCwgaW5kZXggKyBkZWxldGVDb3VudCk7XG4gICAgICAgICAgICB0aGlzLnZhbHVlcyA9IHRoaXMudmFsdWVzXG4gICAgICAgICAgICAgICAgLnNsaWNlKDAsIGluZGV4KVxuICAgICAgICAgICAgICAgIC5jb25jYXQobmV3SXRlbXMsIHRoaXMudmFsdWVzLnNsaWNlKGluZGV4ICsgZGVsZXRlQ291bnQpKTtcbiAgICAgICAgICAgIHJldHVybiByZXM7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIE9ic2VydmFibGVBcnJheUFkbWluaXN0cmF0aW9uLnByb3RvdHlwZS5ub3RpZnlBcnJheUNoaWxkVXBkYXRlID0gZnVuY3Rpb24gKGluZGV4LCBuZXdWYWx1ZSwgb2xkVmFsdWUpIHtcbiAgICAgICAgdmFyIG5vdGlmeVNweSA9ICF0aGlzLm93bmVkICYmIGlzU3B5RW5hYmxlZCQkMSgpO1xuICAgICAgICB2YXIgbm90aWZ5ID0gaGFzTGlzdGVuZXJzJCQxKHRoaXMpO1xuICAgICAgICB2YXIgY2hhbmdlID0gbm90aWZ5IHx8IG5vdGlmeVNweVxuICAgICAgICAgICAgPyB7XG4gICAgICAgICAgICAgICAgb2JqZWN0OiB0aGlzLnByb3h5LFxuICAgICAgICAgICAgICAgIHR5cGU6IFwidXBkYXRlXCIsXG4gICAgICAgICAgICAgICAgaW5kZXg6IGluZGV4LFxuICAgICAgICAgICAgICAgIG5ld1ZhbHVlOiBuZXdWYWx1ZSxcbiAgICAgICAgICAgICAgICBvbGRWYWx1ZTogb2xkVmFsdWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDogbnVsbDtcbiAgICAgICAgLy8gVGhlIHJlYXNvbiB3aHkgdGhpcyBpcyBvbiByaWdodCBoYW5kIHNpZGUgaGVyZSAoYW5kIG5vdCBhYm92ZSksIGlzIHRoaXMgd2F5IHRoZSB1Z2xpZmllciB3aWxsIGRyb3AgaXQsIGJ1dCBpdCB3b24ndFxuICAgICAgICAvLyBjYXVzZSBhbnkgcnVudGltZSBvdmVyaGVhZCBpbiBkZXZlbG9wbWVudCBtb2RlIHdpdGhvdXQgTk9ERV9FTlYgc2V0LCB1bmxlc3Mgc3B5aW5nIGlzIGVuYWJsZWRcbiAgICAgICAgaWYgKG5vdGlmeVNweSAmJiBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpXG4gICAgICAgICAgICBzcHlSZXBvcnRTdGFydCQkMShfX2Fzc2lnbih7fSwgY2hhbmdlLCB7IG5hbWU6IHRoaXMuYXRvbS5uYW1lIH0pKTtcbiAgICAgICAgdGhpcy5hdG9tLnJlcG9ydENoYW5nZWQoKTtcbiAgICAgICAgaWYgKG5vdGlmeSlcbiAgICAgICAgICAgIG5vdGlmeUxpc3RlbmVycyQkMSh0aGlzLCBjaGFuZ2UpO1xuICAgICAgICBpZiAobm90aWZ5U3B5ICYmIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIilcbiAgICAgICAgICAgIHNweVJlcG9ydEVuZCQkMSgpO1xuICAgIH07XG4gICAgT2JzZXJ2YWJsZUFycmF5QWRtaW5pc3RyYXRpb24ucHJvdG90eXBlLm5vdGlmeUFycmF5U3BsaWNlID0gZnVuY3Rpb24gKGluZGV4LCBhZGRlZCwgcmVtb3ZlZCkge1xuICAgICAgICB2YXIgbm90aWZ5U3B5ID0gIXRoaXMub3duZWQgJiYgaXNTcHlFbmFibGVkJCQxKCk7XG4gICAgICAgIHZhciBub3RpZnkgPSBoYXNMaXN0ZW5lcnMkJDEodGhpcyk7XG4gICAgICAgIHZhciBjaGFuZ2UgPSBub3RpZnkgfHwgbm90aWZ5U3B5XG4gICAgICAgICAgICA/IHtcbiAgICAgICAgICAgICAgICBvYmplY3Q6IHRoaXMucHJveHksXG4gICAgICAgICAgICAgICAgdHlwZTogXCJzcGxpY2VcIixcbiAgICAgICAgICAgICAgICBpbmRleDogaW5kZXgsXG4gICAgICAgICAgICAgICAgcmVtb3ZlZDogcmVtb3ZlZCxcbiAgICAgICAgICAgICAgICBhZGRlZDogYWRkZWQsXG4gICAgICAgICAgICAgICAgcmVtb3ZlZENvdW50OiByZW1vdmVkLmxlbmd0aCxcbiAgICAgICAgICAgICAgICBhZGRlZENvdW50OiBhZGRlZC5sZW5ndGhcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDogbnVsbDtcbiAgICAgICAgaWYgKG5vdGlmeVNweSAmJiBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpXG4gICAgICAgICAgICBzcHlSZXBvcnRTdGFydCQkMShfX2Fzc2lnbih7fSwgY2hhbmdlLCB7IG5hbWU6IHRoaXMuYXRvbS5uYW1lIH0pKTtcbiAgICAgICAgdGhpcy5hdG9tLnJlcG9ydENoYW5nZWQoKTtcbiAgICAgICAgLy8gY29uZm9ybTogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvQXJyYXkvb2JzZXJ2ZVxuICAgICAgICBpZiAobm90aWZ5KVxuICAgICAgICAgICAgbm90aWZ5TGlzdGVuZXJzJCQxKHRoaXMsIGNoYW5nZSk7XG4gICAgICAgIGlmIChub3RpZnlTcHkgJiYgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKVxuICAgICAgICAgICAgc3B5UmVwb3J0RW5kJCQxKCk7XG4gICAgfTtcbiAgICByZXR1cm4gT2JzZXJ2YWJsZUFycmF5QWRtaW5pc3RyYXRpb247XG59KCkpO1xudmFyIGFycmF5RXh0ZW5zaW9ucyA9IHtcbiAgICBpbnRlcmNlcHQ6IGZ1bmN0aW9uIChoYW5kbGVyKSB7XG4gICAgICAgIHJldHVybiB0aGlzWyRtb2J4JCQxXS5pbnRlcmNlcHQoaGFuZGxlcik7XG4gICAgfSxcbiAgICBvYnNlcnZlOiBmdW5jdGlvbiAobGlzdGVuZXIsIGZpcmVJbW1lZGlhdGVseSkge1xuICAgICAgICBpZiAoZmlyZUltbWVkaWF0ZWx5ID09PSB2b2lkIDApIHsgZmlyZUltbWVkaWF0ZWx5ID0gZmFsc2U7IH1cbiAgICAgICAgdmFyIGFkbSA9IHRoaXNbJG1vYngkJDFdO1xuICAgICAgICByZXR1cm4gYWRtLm9ic2VydmUobGlzdGVuZXIsIGZpcmVJbW1lZGlhdGVseSk7XG4gICAgfSxcbiAgICBjbGVhcjogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zcGxpY2UoMCk7XG4gICAgfSxcbiAgICByZXBsYWNlOiBmdW5jdGlvbiAobmV3SXRlbXMpIHtcbiAgICAgICAgdmFyIGFkbSA9IHRoaXNbJG1vYngkJDFdO1xuICAgICAgICByZXR1cm4gYWRtLnNwbGljZVdpdGhBcnJheSgwLCBhZG0udmFsdWVzLmxlbmd0aCwgbmV3SXRlbXMpO1xuICAgIH0sXG4gICAgLyoqXG4gICAgICogQ29udmVydHMgdGhpcyBhcnJheSBiYWNrIHRvIGEgKHNoYWxsb3cpIGphdmFzY3JpcHQgc3RydWN0dXJlLlxuICAgICAqIEZvciBhIGRlZXAgY2xvbmUgdXNlIG1vYngudG9KU1xuICAgICAqL1xuICAgIHRvSlM6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2xpY2UoKTtcbiAgICB9LFxuICAgIHRvSlNPTjogZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyBVc2VkIGJ5IEpTT04uc3RyaW5naWZ5XG4gICAgICAgIHJldHVybiB0aGlzLnRvSlMoKTtcbiAgICB9LFxuICAgIC8qXG4gICAgICogZnVuY3Rpb25zIHRoYXQgZG8gYWx0ZXIgdGhlIGludGVybmFsIHN0cnVjdHVyZSBvZiB0aGUgYXJyYXksIChiYXNlZCBvbiBsaWIuZXM2LmQudHMpXG4gICAgICogc2luY2UgdGhlc2UgZnVuY3Rpb25zIGFsdGVyIHRoZSBpbm5lciBzdHJ1Y3R1cmUgb2YgdGhlIGFycmF5LCB0aGUgaGF2ZSBzaWRlIGVmZmVjdHMuXG4gICAgICogQmVjYXVzZSB0aGUgaGF2ZSBzaWRlIGVmZmVjdHMsIHRoZXkgc2hvdWxkIG5vdCBiZSB1c2VkIGluIGNvbXB1dGVkIGZ1bmN0aW9uLFxuICAgICAqIGFuZCBmb3IgdGhhdCByZWFzb24gdGhlIGRvIG5vdCBjYWxsIGRlcGVuZGVuY3lTdGF0ZS5ub3RpZnlPYnNlcnZlZFxuICAgICAqL1xuICAgIHNwbGljZTogZnVuY3Rpb24gKGluZGV4LCBkZWxldGVDb3VudCkge1xuICAgICAgICB2YXIgbmV3SXRlbXMgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgX2kgPSAyOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgIG5ld0l0ZW1zW19pIC0gMl0gPSBhcmd1bWVudHNbX2ldO1xuICAgICAgICB9XG4gICAgICAgIHZhciBhZG0gPSB0aGlzWyRtb2J4JCQxXTtcbiAgICAgICAgc3dpdGNoIChhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIHJldHVybiBhZG0uc3BsaWNlV2l0aEFycmF5KGluZGV4KTtcbiAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICByZXR1cm4gYWRtLnNwbGljZVdpdGhBcnJheShpbmRleCwgZGVsZXRlQ291bnQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhZG0uc3BsaWNlV2l0aEFycmF5KGluZGV4LCBkZWxldGVDb3VudCwgbmV3SXRlbXMpO1xuICAgIH0sXG4gICAgc3BsaWNlV2l0aEFycmF5OiBmdW5jdGlvbiAoaW5kZXgsIGRlbGV0ZUNvdW50LCBuZXdJdGVtcykge1xuICAgICAgICB2YXIgYWRtID0gdGhpc1skbW9ieCQkMV07XG4gICAgICAgIHJldHVybiBhZG0uc3BsaWNlV2l0aEFycmF5KGluZGV4LCBkZWxldGVDb3VudCwgbmV3SXRlbXMpO1xuICAgIH0sXG4gICAgcHVzaDogZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgaXRlbXMgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgIGl0ZW1zW19pXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGFkbSA9IHRoaXNbJG1vYngkJDFdO1xuICAgICAgICBhZG0uc3BsaWNlV2l0aEFycmF5KGFkbS52YWx1ZXMubGVuZ3RoLCAwLCBpdGVtcyk7XG4gICAgICAgIHJldHVybiBhZG0udmFsdWVzLmxlbmd0aDtcbiAgICB9LFxuICAgIHBvcDogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zcGxpY2UoTWF0aC5tYXgodGhpc1skbW9ieCQkMV0udmFsdWVzLmxlbmd0aCAtIDEsIDApLCAxKVswXTtcbiAgICB9LFxuICAgIHNoaWZ0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNwbGljZSgwLCAxKVswXTtcbiAgICB9LFxuICAgIHVuc2hpZnQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGl0ZW1zID0gW107XG4gICAgICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICBpdGVtc1tfaV0gPSBhcmd1bWVudHNbX2ldO1xuICAgICAgICB9XG4gICAgICAgIHZhciBhZG0gPSB0aGlzWyRtb2J4JCQxXTtcbiAgICAgICAgYWRtLnNwbGljZVdpdGhBcnJheSgwLCAwLCBpdGVtcyk7XG4gICAgICAgIHJldHVybiBhZG0udmFsdWVzLmxlbmd0aDtcbiAgICB9LFxuICAgIHJldmVyc2U6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gcmV2ZXJzZSBieSBkZWZhdWx0IG11dGF0ZXMgaW4gcGxhY2UgYmVmb3JlIHJldHVybmluZyB0aGUgcmVzdWx0XG4gICAgICAgIC8vIHdoaWNoIG1ha2VzIGl0IGJvdGggYSAnZGVyaXZhdGlvbicgYW5kIGEgJ211dGF0aW9uJy5cbiAgICAgICAgLy8gc28gd2UgZGV2aWF0ZSBmcm9tIHRoZSBkZWZhdWx0IGFuZCBqdXN0IG1ha2UgaXQgYW4gZGVydml0YXRpb25cbiAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKFwiW21vYnhdIGBvYnNlcnZhYmxlQXJyYXkucmV2ZXJzZSgpYCB3aWxsIG5vdCB1cGRhdGUgdGhlIGFycmF5IGluIHBsYWNlLiBVc2UgYG9ic2VydmFibGVBcnJheS5zbGljZSgpLnJldmVyc2UoKWAgdG8gc3VwcmVzcyB0aGlzIHdhcm5pbmcgYW5kIHBlcmZvcm0gdGhlIG9wZXJhdGlvbiBvbiBhIGNvcHksIG9yIGBvYnNlcnZhYmxlQXJyYXkucmVwbGFjZShvYnNlcnZhYmxlQXJyYXkuc2xpY2UoKS5yZXZlcnNlKCkpYCB0byByZXZlcnNlICYgdXBkYXRlIGluIHBsYWNlXCIpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBjbG9uZSA9IHRoaXMuc2xpY2UoKTtcbiAgICAgICAgcmV0dXJuIGNsb25lLnJldmVyc2UuYXBwbHkoY2xvbmUsIGFyZ3VtZW50cyk7XG4gICAgfSxcbiAgICBzb3J0OiBmdW5jdGlvbiAoY29tcGFyZUZuKSB7XG4gICAgICAgIC8vIHNvcnQgYnkgZGVmYXVsdCBtdXRhdGVzIGluIHBsYWNlIGJlZm9yZSByZXR1cm5pbmcgdGhlIHJlc3VsdFxuICAgICAgICAvLyB3aGljaCBnb2VzIGFnYWluc3QgYWxsIGdvb2QgcHJhY3RpY2VzLiBMZXQncyBub3QgY2hhbmdlIHRoZSBhcnJheSBpbiBwbGFjZSFcbiAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKFwiW21vYnhdIGBvYnNlcnZhYmxlQXJyYXkuc29ydCgpYCB3aWxsIG5vdCB1cGRhdGUgdGhlIGFycmF5IGluIHBsYWNlLiBVc2UgYG9ic2VydmFibGVBcnJheS5zbGljZSgpLnNvcnQoKWAgdG8gc3VwcmVzcyB0aGlzIHdhcm5pbmcgYW5kIHBlcmZvcm0gdGhlIG9wZXJhdGlvbiBvbiBhIGNvcHksIG9yIGBvYnNlcnZhYmxlQXJyYXkucmVwbGFjZShvYnNlcnZhYmxlQXJyYXkuc2xpY2UoKS5zb3J0KCkpYCB0byBzb3J0ICYgdXBkYXRlIGluIHBsYWNlXCIpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBjbG9uZSA9IHRoaXMuc2xpY2UoKTtcbiAgICAgICAgcmV0dXJuIGNsb25lLnNvcnQuYXBwbHkoY2xvbmUsIGFyZ3VtZW50cyk7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICB2YXIgYWRtID0gdGhpc1skbW9ieCQkMV07XG4gICAgICAgIHZhciBpZHggPSBhZG0uZGVoYW5jZVZhbHVlcyhhZG0udmFsdWVzKS5pbmRleE9mKHZhbHVlKTtcbiAgICAgICAgaWYgKGlkeCA+IC0xKSB7XG4gICAgICAgICAgICB0aGlzLnNwbGljZShpZHgsIDEpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0sXG4gICAgZ2V0OiBmdW5jdGlvbiAoaW5kZXgpIHtcbiAgICAgICAgdmFyIGFkbSA9IHRoaXNbJG1vYngkJDFdO1xuICAgICAgICBpZiAoYWRtKSB7XG4gICAgICAgICAgICBpZiAoaW5kZXggPCBhZG0udmFsdWVzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGFkbS5hdG9tLnJlcG9ydE9ic2VydmVkKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGFkbS5kZWhhbmNlVmFsdWUoYWRtLnZhbHVlc1tpbmRleF0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc29sZS53YXJuKFwiW21vYnguYXJyYXldIEF0dGVtcHQgdG8gcmVhZCBhbiBhcnJheSBpbmRleCAoXCIgKyBpbmRleCArIFwiKSB0aGF0IGlzIG91dCBvZiBib3VuZHMgKFwiICsgYWRtLnZhbHVlcy5sZW5ndGggKyBcIikuIFBsZWFzZSBjaGVjayBsZW5ndGggZmlyc3QuIE91dCBvZiBib3VuZCBpbmRpY2VzIHdpbGwgbm90IGJlIHRyYWNrZWQgYnkgTW9iWFwiKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH0sXG4gICAgc2V0OiBmdW5jdGlvbiAoaW5kZXgsIG5ld1ZhbHVlKSB7XG4gICAgICAgIHZhciBhZG0gPSB0aGlzWyRtb2J4JCQxXTtcbiAgICAgICAgdmFyIHZhbHVlcyQkMSA9IGFkbS52YWx1ZXM7XG4gICAgICAgIGlmIChpbmRleCA8IHZhbHVlcyQkMS5sZW5ndGgpIHtcbiAgICAgICAgICAgIC8vIHVwZGF0ZSBhdCBpbmRleCBpbiByYW5nZVxuICAgICAgICAgICAgY2hlY2tJZlN0YXRlTW9kaWZpY2F0aW9uc0FyZUFsbG93ZWQkJDEoYWRtLmF0b20pO1xuICAgICAgICAgICAgdmFyIG9sZFZhbHVlID0gdmFsdWVzJCQxW2luZGV4XTtcbiAgICAgICAgICAgIGlmIChoYXNJbnRlcmNlcHRvcnMkJDEoYWRtKSkge1xuICAgICAgICAgICAgICAgIHZhciBjaGFuZ2UgPSBpbnRlcmNlcHRDaGFuZ2UkJDEoYWRtLCB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwidXBkYXRlXCIsXG4gICAgICAgICAgICAgICAgICAgIG9iamVjdDogdGhpcyxcbiAgICAgICAgICAgICAgICAgICAgaW5kZXg6IGluZGV4LFxuICAgICAgICAgICAgICAgICAgICBuZXdWYWx1ZTogbmV3VmFsdWVcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBpZiAoIWNoYW5nZSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIG5ld1ZhbHVlID0gY2hhbmdlLm5ld1ZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbmV3VmFsdWUgPSBhZG0uZW5oYW5jZXIobmV3VmFsdWUsIG9sZFZhbHVlKTtcbiAgICAgICAgICAgIHZhciBjaGFuZ2VkID0gbmV3VmFsdWUgIT09IG9sZFZhbHVlO1xuICAgICAgICAgICAgaWYgKGNoYW5nZWQpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZXMkJDFbaW5kZXhdID0gbmV3VmFsdWU7XG4gICAgICAgICAgICAgICAgYWRtLm5vdGlmeUFycmF5Q2hpbGRVcGRhdGUoaW5kZXgsIG5ld1ZhbHVlLCBvbGRWYWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoaW5kZXggPT09IHZhbHVlcyQkMS5sZW5ndGgpIHtcbiAgICAgICAgICAgIC8vIGFkZCBhIG5ldyBpdGVtXG4gICAgICAgICAgICBhZG0uc3BsaWNlV2l0aEFycmF5KGluZGV4LCAwLCBbbmV3VmFsdWVdKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIG91dCBvZiBib3VuZHNcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlttb2J4LmFycmF5XSBJbmRleCBvdXQgb2YgYm91bmRzLCBcIiArIGluZGV4ICsgXCIgaXMgbGFyZ2VyIHRoYW4gXCIgKyB2YWx1ZXMkJDEubGVuZ3RoKTtcbiAgICAgICAgfVxuICAgIH1cbn07XG5bXG4gICAgXCJjb25jYXRcIixcbiAgICBcImV2ZXJ5XCIsXG4gICAgXCJmaWx0ZXJcIixcbiAgICBcImZvckVhY2hcIixcbiAgICBcImluZGV4T2ZcIixcbiAgICBcImpvaW5cIixcbiAgICBcImxhc3RJbmRleE9mXCIsXG4gICAgXCJtYXBcIixcbiAgICBcInJlZHVjZVwiLFxuICAgIFwicmVkdWNlUmlnaHRcIixcbiAgICBcInNsaWNlXCIsXG4gICAgXCJzb21lXCIsXG4gICAgXCJ0b1N0cmluZ1wiLFxuICAgIFwidG9Mb2NhbGVTdHJpbmdcIlxuXS5mb3JFYWNoKGZ1bmN0aW9uIChmdW5jTmFtZSkge1xuICAgIGFycmF5RXh0ZW5zaW9uc1tmdW5jTmFtZV0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBhZG0gPSB0aGlzWyRtb2J4JCQxXTtcbiAgICAgICAgYWRtLmF0b20ucmVwb3J0T2JzZXJ2ZWQoKTtcbiAgICAgICAgdmFyIHJlcyA9IGFkbS5kZWhhbmNlVmFsdWVzKGFkbS52YWx1ZXMpO1xuICAgICAgICByZXR1cm4gcmVzW2Z1bmNOYW1lXS5hcHBseShyZXMsIGFyZ3VtZW50cyk7XG4gICAgfTtcbn0pO1xudmFyIGlzT2JzZXJ2YWJsZUFycmF5QWRtaW5pc3RyYXRpb24gPSBjcmVhdGVJbnN0YW5jZW9mUHJlZGljYXRlJCQxKFwiT2JzZXJ2YWJsZUFycmF5QWRtaW5pc3RyYXRpb25cIiwgT2JzZXJ2YWJsZUFycmF5QWRtaW5pc3RyYXRpb24pO1xuZnVuY3Rpb24gaXNPYnNlcnZhYmxlQXJyYXkkJDEodGhpbmcpIHtcbiAgICByZXR1cm4gaXNPYmplY3QkJDEodGhpbmcpICYmIGlzT2JzZXJ2YWJsZUFycmF5QWRtaW5pc3RyYXRpb24odGhpbmdbJG1vYngkJDFdKTtcbn1cblxudmFyIF9hO1xudmFyIE9ic2VydmFibGVNYXBNYXJrZXIgPSB7fTtcbi8vIGp1c3QgZXh0ZW5kIE1hcD8gU2VlIGFsc28gaHR0cHM6Ly9naXN0LmdpdGh1Yi5jb20vbmVzdGhhcnVzLzEzYjRkNzRmMmVmNGEyZjQzNTdkYmQzZmMyM2MxZTU0XG4vLyBCdXQ6IGh0dHBzOi8vZ2l0aHViLmNvbS9tb2J4anMvbW9ieC9pc3N1ZXMvMTU1NlxudmFyIE9ic2VydmFibGVNYXAkJDEgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gT2JzZXJ2YWJsZU1hcCQkMShpbml0aWFsRGF0YSwgZW5oYW5jZXIsIG5hbWUpIHtcbiAgICAgICAgaWYgKGVuaGFuY2VyID09PSB2b2lkIDApIHsgZW5oYW5jZXIgPSBkZWVwRW5oYW5jZXIkJDE7IH1cbiAgICAgICAgaWYgKG5hbWUgPT09IHZvaWQgMCkgeyBuYW1lID0gXCJPYnNlcnZhYmxlTWFwQFwiICsgZ2V0TmV4dElkJCQxKCk7IH1cbiAgICAgICAgdGhpcy5lbmhhbmNlciA9IGVuaGFuY2VyO1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzW19hXSA9IE9ic2VydmFibGVNYXBNYXJrZXI7XG4gICAgICAgIHRoaXMuX2tleXNBdG9tID0gY3JlYXRlQXRvbSQkMSh0aGlzLm5hbWUgKyBcIi5rZXlzKClcIik7XG4gICAgICAgIHRoaXNbU3ltYm9sLnRvU3RyaW5nVGFnXSA9IFwiTWFwXCI7XG4gICAgICAgIGlmICh0eXBlb2YgTWFwICE9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIm1vYngubWFwIHJlcXVpcmVzIE1hcCBwb2x5ZmlsbCBmb3IgdGhlIGN1cnJlbnQgYnJvd3Nlci4gQ2hlY2sgYmFiZWwtcG9seWZpbGwgb3IgY29yZS1qcy9lczYvbWFwLmpzXCIpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2RhdGEgPSBuZXcgTWFwKCk7XG4gICAgICAgIHRoaXMuX2hhc01hcCA9IG5ldyBNYXAoKTtcbiAgICAgICAgdGhpcy5tZXJnZShpbml0aWFsRGF0YSk7XG4gICAgfVxuICAgIE9ic2VydmFibGVNYXAkJDEucHJvdG90eXBlLl9oYXMgPSBmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kYXRhLmhhcyhrZXkpO1xuICAgIH07XG4gICAgT2JzZXJ2YWJsZU1hcCQkMS5wcm90b3R5cGUuaGFzID0gZnVuY3Rpb24gKGtleSkge1xuICAgICAgICBpZiAodGhpcy5faGFzTWFwLmhhcyhrZXkpKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2hhc01hcC5nZXQoa2V5KS5nZXQoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3VwZGF0ZUhhc01hcEVudHJ5KGtleSwgZmFsc2UpLmdldCgpO1xuICAgIH07XG4gICAgT2JzZXJ2YWJsZU1hcCQkMS5wcm90b3R5cGUuc2V0ID0gZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcbiAgICAgICAgdmFyIGhhc0tleSA9IHRoaXMuX2hhcyhrZXkpO1xuICAgICAgICBpZiAoaGFzSW50ZXJjZXB0b3JzJCQxKHRoaXMpKSB7XG4gICAgICAgICAgICB2YXIgY2hhbmdlID0gaW50ZXJjZXB0Q2hhbmdlJCQxKHRoaXMsIHtcbiAgICAgICAgICAgICAgICB0eXBlOiBoYXNLZXkgPyBcInVwZGF0ZVwiIDogXCJhZGRcIixcbiAgICAgICAgICAgICAgICBvYmplY3Q6IHRoaXMsXG4gICAgICAgICAgICAgICAgbmV3VmFsdWU6IHZhbHVlLFxuICAgICAgICAgICAgICAgIG5hbWU6IGtleVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoIWNoYW5nZSlcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIHZhbHVlID0gY2hhbmdlLm5ld1ZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChoYXNLZXkpIHtcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZVZhbHVlKGtleSwgdmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fYWRkVmFsdWUoa2V5LCB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBPYnNlcnZhYmxlTWFwJCQxLnByb3RvdHlwZS5kZWxldGUgPSBmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIGlmIChoYXNJbnRlcmNlcHRvcnMkJDEodGhpcykpIHtcbiAgICAgICAgICAgIHZhciBjaGFuZ2UgPSBpbnRlcmNlcHRDaGFuZ2UkJDEodGhpcywge1xuICAgICAgICAgICAgICAgIHR5cGU6IFwiZGVsZXRlXCIsXG4gICAgICAgICAgICAgICAgb2JqZWN0OiB0aGlzLFxuICAgICAgICAgICAgICAgIG5hbWU6IGtleVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoIWNoYW5nZSlcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX2hhcyhrZXkpKSB7XG4gICAgICAgICAgICB2YXIgbm90aWZ5U3B5ID0gaXNTcHlFbmFibGVkJCQxKCk7XG4gICAgICAgICAgICB2YXIgbm90aWZ5ID0gaGFzTGlzdGVuZXJzJCQxKHRoaXMpO1xuICAgICAgICAgICAgdmFyIGNoYW5nZSA9IG5vdGlmeSB8fCBub3RpZnlTcHlcbiAgICAgICAgICAgICAgICA/IHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJkZWxldGVcIixcbiAgICAgICAgICAgICAgICAgICAgb2JqZWN0OiB0aGlzLFxuICAgICAgICAgICAgICAgICAgICBvbGRWYWx1ZTogdGhpcy5fZGF0YS5nZXQoa2V5KS52YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgbmFtZToga2V5XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIDogbnVsbDtcbiAgICAgICAgICAgIGlmIChub3RpZnlTcHkgJiYgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKVxuICAgICAgICAgICAgICAgIHNweVJlcG9ydFN0YXJ0JCQxKF9fYXNzaWduKHt9LCBjaGFuZ2UsIHsgbmFtZTogdGhpcy5uYW1lLCBrZXk6IGtleSB9KSk7XG4gICAgICAgICAgICB0cmFuc2FjdGlvbiQkMShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuX2tleXNBdG9tLnJlcG9ydENoYW5nZWQoKTtcbiAgICAgICAgICAgICAgICBfdGhpcy5fdXBkYXRlSGFzTWFwRW50cnkoa2V5LCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgdmFyIG9ic2VydmFibGUkJDEgPSBfdGhpcy5fZGF0YS5nZXQoa2V5KTtcbiAgICAgICAgICAgICAgICBvYnNlcnZhYmxlJCQxLnNldE5ld1ZhbHVlKHVuZGVmaW5lZCk7XG4gICAgICAgICAgICAgICAgX3RoaXMuX2RhdGEuZGVsZXRlKGtleSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmIChub3RpZnkpXG4gICAgICAgICAgICAgICAgbm90aWZ5TGlzdGVuZXJzJCQxKHRoaXMsIGNoYW5nZSk7XG4gICAgICAgICAgICBpZiAobm90aWZ5U3B5ICYmIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIilcbiAgICAgICAgICAgICAgICBzcHlSZXBvcnRFbmQkJDEoKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuICAgIE9ic2VydmFibGVNYXAkJDEucHJvdG90eXBlLl91cGRhdGVIYXNNYXBFbnRyeSA9IGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG4gICAgICAgIC8vIG9wdGltaXphdGlvbjsgZG9uJ3QgZmlsbCB0aGUgaGFzTWFwIGlmIHdlIGFyZSBub3Qgb2JzZXJ2aW5nLCBvciByZW1vdmUgZW50cnkgaWYgdGhlcmUgYXJlIG5vIG9ic2VydmVycyBhbnltb3JlXG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMuX2hhc01hcC5nZXQoa2V5KTtcbiAgICAgICAgaWYgKGVudHJ5KSB7XG4gICAgICAgICAgICBlbnRyeS5zZXROZXdWYWx1ZSh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBlbnRyeSA9IG5ldyBPYnNlcnZhYmxlVmFsdWUkJDEodmFsdWUsIHJlZmVyZW5jZUVuaGFuY2VyJCQxLCB0aGlzLm5hbWUgKyBcIi5cIiArIHN0cmluZ2lmeUtleShrZXkpICsgXCI/XCIsIGZhbHNlKTtcbiAgICAgICAgICAgIHRoaXMuX2hhc01hcC5zZXQoa2V5LCBlbnRyeSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGVudHJ5O1xuICAgIH07XG4gICAgT2JzZXJ2YWJsZU1hcCQkMS5wcm90b3R5cGUuX3VwZGF0ZVZhbHVlID0gZnVuY3Rpb24gKGtleSwgbmV3VmFsdWUpIHtcbiAgICAgICAgdmFyIG9ic2VydmFibGUkJDEgPSB0aGlzLl9kYXRhLmdldChrZXkpO1xuICAgICAgICBuZXdWYWx1ZSA9IG9ic2VydmFibGUkJDEucHJlcGFyZU5ld1ZhbHVlKG5ld1ZhbHVlKTtcbiAgICAgICAgaWYgKG5ld1ZhbHVlICE9PSBnbG9iYWxTdGF0ZSQkMS5VTkNIQU5HRUQpIHtcbiAgICAgICAgICAgIHZhciBub3RpZnlTcHkgPSBpc1NweUVuYWJsZWQkJDEoKTtcbiAgICAgICAgICAgIHZhciBub3RpZnkgPSBoYXNMaXN0ZW5lcnMkJDEodGhpcyk7XG4gICAgICAgICAgICB2YXIgY2hhbmdlID0gbm90aWZ5IHx8IG5vdGlmeVNweVxuICAgICAgICAgICAgICAgID8ge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcInVwZGF0ZVwiLFxuICAgICAgICAgICAgICAgICAgICBvYmplY3Q6IHRoaXMsXG4gICAgICAgICAgICAgICAgICAgIG9sZFZhbHVlOiBvYnNlcnZhYmxlJCQxLnZhbHVlLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBrZXksXG4gICAgICAgICAgICAgICAgICAgIG5ld1ZhbHVlOiBuZXdWYWx1ZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICA6IG51bGw7XG4gICAgICAgICAgICBpZiAobm90aWZ5U3B5ICYmIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIilcbiAgICAgICAgICAgICAgICBzcHlSZXBvcnRTdGFydCQkMShfX2Fzc2lnbih7fSwgY2hhbmdlLCB7IG5hbWU6IHRoaXMubmFtZSwga2V5OiBrZXkgfSkpO1xuICAgICAgICAgICAgb2JzZXJ2YWJsZSQkMS5zZXROZXdWYWx1ZShuZXdWYWx1ZSk7XG4gICAgICAgICAgICBpZiAobm90aWZ5KVxuICAgICAgICAgICAgICAgIG5vdGlmeUxpc3RlbmVycyQkMSh0aGlzLCBjaGFuZ2UpO1xuICAgICAgICAgICAgaWYgKG5vdGlmeVNweSAmJiBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpXG4gICAgICAgICAgICAgICAgc3B5UmVwb3J0RW5kJCQxKCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIE9ic2VydmFibGVNYXAkJDEucHJvdG90eXBlLl9hZGRWYWx1ZSA9IGZ1bmN0aW9uIChrZXksIG5ld1ZhbHVlKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIGNoZWNrSWZTdGF0ZU1vZGlmaWNhdGlvbnNBcmVBbGxvd2VkJCQxKHRoaXMuX2tleXNBdG9tKTtcbiAgICAgICAgdHJhbnNhY3Rpb24kJDEoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIG9ic2VydmFibGUkJDEgPSBuZXcgT2JzZXJ2YWJsZVZhbHVlJCQxKG5ld1ZhbHVlLCBfdGhpcy5lbmhhbmNlciwgX3RoaXMubmFtZSArIFwiLlwiICsgc3RyaW5naWZ5S2V5KGtleSksIGZhbHNlKTtcbiAgICAgICAgICAgIF90aGlzLl9kYXRhLnNldChrZXksIG9ic2VydmFibGUkJDEpO1xuICAgICAgICAgICAgbmV3VmFsdWUgPSBvYnNlcnZhYmxlJCQxLnZhbHVlOyAvLyB2YWx1ZSBtaWdodCBoYXZlIGJlZW4gY2hhbmdlZFxuICAgICAgICAgICAgX3RoaXMuX3VwZGF0ZUhhc01hcEVudHJ5KGtleSwgdHJ1ZSk7XG4gICAgICAgICAgICBfdGhpcy5fa2V5c0F0b20ucmVwb3J0Q2hhbmdlZCgpO1xuICAgICAgICB9KTtcbiAgICAgICAgdmFyIG5vdGlmeVNweSA9IGlzU3B5RW5hYmxlZCQkMSgpO1xuICAgICAgICB2YXIgbm90aWZ5ID0gaGFzTGlzdGVuZXJzJCQxKHRoaXMpO1xuICAgICAgICB2YXIgY2hhbmdlID0gbm90aWZ5IHx8IG5vdGlmeVNweVxuICAgICAgICAgICAgPyB7XG4gICAgICAgICAgICAgICAgdHlwZTogXCJhZGRcIixcbiAgICAgICAgICAgICAgICBvYmplY3Q6IHRoaXMsXG4gICAgICAgICAgICAgICAgbmFtZToga2V5LFxuICAgICAgICAgICAgICAgIG5ld1ZhbHVlOiBuZXdWYWx1ZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgOiBudWxsO1xuICAgICAgICBpZiAobm90aWZ5U3B5ICYmIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIilcbiAgICAgICAgICAgIHNweVJlcG9ydFN0YXJ0JCQxKF9fYXNzaWduKHt9LCBjaGFuZ2UsIHsgbmFtZTogdGhpcy5uYW1lLCBrZXk6IGtleSB9KSk7XG4gICAgICAgIGlmIChub3RpZnkpXG4gICAgICAgICAgICBub3RpZnlMaXN0ZW5lcnMkJDEodGhpcywgY2hhbmdlKTtcbiAgICAgICAgaWYgKG5vdGlmeVNweSAmJiBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpXG4gICAgICAgICAgICBzcHlSZXBvcnRFbmQkJDEoKTtcbiAgICB9O1xuICAgIE9ic2VydmFibGVNYXAkJDEucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgaWYgKHRoaXMuaGFzKGtleSkpXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kZWhhbmNlVmFsdWUodGhpcy5fZGF0YS5nZXQoa2V5KS5nZXQoKSk7XG4gICAgICAgIHJldHVybiB0aGlzLmRlaGFuY2VWYWx1ZSh1bmRlZmluZWQpO1xuICAgIH07XG4gICAgT2JzZXJ2YWJsZU1hcCQkMS5wcm90b3R5cGUuZGVoYW5jZVZhbHVlID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIGlmICh0aGlzLmRlaGFuY2VyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRlaGFuY2VyKHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfTtcbiAgICBPYnNlcnZhYmxlTWFwJCQxLnByb3RvdHlwZS5rZXlzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl9rZXlzQXRvbS5yZXBvcnRPYnNlcnZlZCgpO1xuICAgICAgICByZXR1cm4gdGhpcy5fZGF0YS5rZXlzKCk7XG4gICAgfTtcbiAgICBPYnNlcnZhYmxlTWFwJCQxLnByb3RvdHlwZS52YWx1ZXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdmFyIG5leHRJbmRleCA9IDA7XG4gICAgICAgIHZhciBrZXlzJCQxID0gQXJyYXkuZnJvbSh0aGlzLmtleXMoKSk7XG4gICAgICAgIHJldHVybiBtYWtlSXRlcmFibGUoe1xuICAgICAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXh0SW5kZXggPCBrZXlzJCQxLmxlbmd0aFxuICAgICAgICAgICAgICAgICAgICA/IHsgdmFsdWU6IHNlbGYuZ2V0KGtleXMkJDFbbmV4dEluZGV4KytdKSwgZG9uZTogZmFsc2UgfVxuICAgICAgICAgICAgICAgICAgICA6IHsgZG9uZTogdHJ1ZSB9O1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuICAgIE9ic2VydmFibGVNYXAkJDEucHJvdG90eXBlLmVudHJpZXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdmFyIG5leHRJbmRleCA9IDA7XG4gICAgICAgIHZhciBrZXlzJCQxID0gQXJyYXkuZnJvbSh0aGlzLmtleXMoKSk7XG4gICAgICAgIHJldHVybiBtYWtlSXRlcmFibGUoe1xuICAgICAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmIChuZXh0SW5kZXggPCBrZXlzJCQxLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIga2V5ID0ga2V5cyQkMVtuZXh0SW5kZXgrK107XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogW2tleSwgc2VsZi5nZXQoa2V5KV0sXG4gICAgICAgICAgICAgICAgICAgICAgICBkb25lOiBmYWxzZVxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4geyBkb25lOiB0cnVlIH07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgT2JzZXJ2YWJsZU1hcCQkMS5wcm90b3R5cGVbKF9hID0gJG1vYngkJDEsIFN5bWJvbC5pdGVyYXRvcildID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5lbnRyaWVzKCk7XG4gICAgfTtcbiAgICBPYnNlcnZhYmxlTWFwJCQxLnByb3RvdHlwZS5mb3JFYWNoID0gZnVuY3Rpb24gKGNhbGxiYWNrLCB0aGlzQXJnKSB7XG4gICAgICAgIHZhciBlXzEsIF9hO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgZm9yICh2YXIgX2IgPSBfX3ZhbHVlcyh0aGlzKSwgX2MgPSBfYi5uZXh0KCk7ICFfYy5kb25lOyBfYyA9IF9iLm5leHQoKSkge1xuICAgICAgICAgICAgICAgIHZhciBfZCA9IF9fcmVhZChfYy52YWx1ZSwgMiksIGtleSA9IF9kWzBdLCB2YWx1ZSA9IF9kWzFdO1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrLmNhbGwodGhpc0FyZywgdmFsdWUsIGtleSwgdGhpcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVfMV8xKSB7IGVfMSA9IHsgZXJyb3I6IGVfMV8xIH07IH1cbiAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGlmIChfYyAmJiAhX2MuZG9uZSAmJiAoX2EgPSBfYi5yZXR1cm4pKSBfYS5jYWxsKF9iKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZpbmFsbHkgeyBpZiAoZV8xKSB0aHJvdyBlXzEuZXJyb3I7IH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgLyoqIE1lcmdlIGFub3RoZXIgb2JqZWN0IGludG8gdGhpcyBvYmplY3QsIHJldHVybnMgdGhpcy4gKi9cbiAgICBPYnNlcnZhYmxlTWFwJCQxLnByb3RvdHlwZS5tZXJnZSA9IGZ1bmN0aW9uIChvdGhlcikge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICBpZiAoaXNPYnNlcnZhYmxlTWFwJCQxKG90aGVyKSkge1xuICAgICAgICAgICAgb3RoZXIgPSBvdGhlci50b0pTKCk7XG4gICAgICAgIH1cbiAgICAgICAgdHJhbnNhY3Rpb24kJDEoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKGlzUGxhaW5PYmplY3QkJDEob3RoZXIpKVxuICAgICAgICAgICAgICAgIE9iamVjdC5rZXlzKG90aGVyKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHsgcmV0dXJuIF90aGlzLnNldChrZXksIG90aGVyW2tleV0pOyB9KTtcbiAgICAgICAgICAgIGVsc2UgaWYgKEFycmF5LmlzQXJyYXkob3RoZXIpKVxuICAgICAgICAgICAgICAgIG90aGVyLmZvckVhY2goZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBfYiA9IF9fcmVhZChfYSwgMiksIGtleSA9IF9iWzBdLCB2YWx1ZSA9IF9iWzFdO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX3RoaXMuc2V0KGtleSwgdmFsdWUpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZWxzZSBpZiAoaXNFUzZNYXAkJDEob3RoZXIpKSB7XG4gICAgICAgICAgICAgICAgaWYgKG90aGVyLmNvbnN0cnVjdG9yICE9PSBNYXApXG4gICAgICAgICAgICAgICAgICAgIGZhaWwkJDEoXCJDYW5ub3QgaW5pdGlhbGl6ZSBmcm9tIGNsYXNzZXMgdGhhdCBpbmhlcml0IGZyb20gTWFwOiBcIiArIG90aGVyLmNvbnN0cnVjdG9yLm5hbWUpOyAvLyBwcmV0dGllci1pZ25vcmVcbiAgICAgICAgICAgICAgICBvdGhlci5mb3JFYWNoKGZ1bmN0aW9uICh2YWx1ZSwga2V5KSB7IHJldHVybiBfdGhpcy5zZXQoa2V5LCB2YWx1ZSk7IH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAob3RoZXIgIT09IG51bGwgJiYgb3RoZXIgIT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgICAgICBmYWlsJCQxKFwiQ2Fubm90IGluaXRpYWxpemUgbWFwIGZyb20gXCIgKyBvdGhlcik7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIE9ic2VydmFibGVNYXAkJDEucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0cmFuc2FjdGlvbiQkMShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB1bnRyYWNrZWQkJDEoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBlXzIsIF9hO1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIF9iID0gX192YWx1ZXMoX3RoaXMua2V5cygpKSwgX2MgPSBfYi5uZXh0KCk7ICFfYy5kb25lOyBfYyA9IF9iLm5leHQoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGtleSA9IF9jLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMuZGVsZXRlKGtleSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGVfMl8xKSB7IGVfMiA9IHsgZXJyb3I6IGVfMl8xIH07IH1cbiAgICAgICAgICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChfYyAmJiAhX2MuZG9uZSAmJiAoX2EgPSBfYi5yZXR1cm4pKSBfYS5jYWxsKF9iKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBmaW5hbGx5IHsgaWYgKGVfMikgdGhyb3cgZV8yLmVycm9yOyB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgT2JzZXJ2YWJsZU1hcCQkMS5wcm90b3R5cGUucmVwbGFjZSA9IGZ1bmN0aW9uICh2YWx1ZXMkJDEpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdHJhbnNhY3Rpb24kJDEoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgLy8gZ3JhYiBhbGwgdGhlIGtleXMgdGhhdCBhcmUgcHJlc2VudCBpbiB0aGUgbmV3IG1hcCBidXQgbm90IHByZXNlbnQgaW4gdGhlIGN1cnJlbnQgbWFwXG4gICAgICAgICAgICAvLyBhbmQgZGVsZXRlIHRoZW0gZnJvbSB0aGUgbWFwLCB0aGVuIG1lcmdlIHRoZSBuZXcgbWFwXG4gICAgICAgICAgICAvLyB0aGlzIHdpbGwgY2F1c2UgcmVhY3Rpb25zIG9ubHkgb24gY2hhbmdlZCB2YWx1ZXNcbiAgICAgICAgICAgIHZhciBuZXdLZXlzID0gZ2V0TWFwTGlrZUtleXMkJDEodmFsdWVzJCQxKTtcbiAgICAgICAgICAgIHZhciBvbGRLZXlzID0gQXJyYXkuZnJvbShfdGhpcy5rZXlzKCkpO1xuICAgICAgICAgICAgdmFyIG1pc3NpbmdLZXlzID0gb2xkS2V5cy5maWx0ZXIoZnVuY3Rpb24gKGspIHsgcmV0dXJuIG5ld0tleXMuaW5kZXhPZihrKSA9PT0gLTE7IH0pO1xuICAgICAgICAgICAgbWlzc2luZ0tleXMuZm9yRWFjaChmdW5jdGlvbiAoaykgeyByZXR1cm4gX3RoaXMuZGVsZXRlKGspOyB9KTtcbiAgICAgICAgICAgIF90aGlzLm1lcmdlKHZhbHVlcyQkMSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShPYnNlcnZhYmxlTWFwJCQxLnByb3RvdHlwZSwgXCJzaXplXCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLl9rZXlzQXRvbS5yZXBvcnRPYnNlcnZlZCgpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGEuc2l6ZTtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIHBsYWluIG9iamVjdCB0aGF0IHJlcHJlc2VudHMgdGhpcyBtYXAuXG4gICAgICogTm90ZSB0aGF0IGFsbCB0aGUga2V5cyBiZWluZyBzdHJpbmdpZmllZC5cbiAgICAgKiBJZiB0aGVyZSBhcmUgZHVwbGljYXRpbmcga2V5cyBhZnRlciBjb252ZXJ0aW5nIHRoZW0gdG8gc3RyaW5ncywgYmVoYXZpb3VyIGlzIHVuZGV0ZXJtaW5lZC5cbiAgICAgKi9cbiAgICBPYnNlcnZhYmxlTWFwJCQxLnByb3RvdHlwZS50b1BPSk8gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBlXzMsIF9hO1xuICAgICAgICB2YXIgcmVzID0ge307XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBmb3IgKHZhciBfYiA9IF9fdmFsdWVzKHRoaXMpLCBfYyA9IF9iLm5leHQoKTsgIV9jLmRvbmU7IF9jID0gX2IubmV4dCgpKSB7XG4gICAgICAgICAgICAgICAgdmFyIF9kID0gX19yZWFkKF9jLnZhbHVlLCAyKSwga2V5ID0gX2RbMF0sIHZhbHVlID0gX2RbMV07XG4gICAgICAgICAgICAgICAgLy8gV2UgbGllIGFib3V0IHN5bWJvbCBrZXkgdHlwZXMgZHVlIHRvIGh0dHBzOi8vZ2l0aHViLmNvbS9NaWNyb3NvZnQvVHlwZVNjcmlwdC9pc3N1ZXMvMTg2M1xuICAgICAgICAgICAgICAgIHJlc1t0eXBlb2Yga2V5ID09PSBcInN5bWJvbFwiID8ga2V5IDogc3RyaW5naWZ5S2V5KGtleSldID0gdmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVfM18xKSB7IGVfMyA9IHsgZXJyb3I6IGVfM18xIH07IH1cbiAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGlmIChfYyAmJiAhX2MuZG9uZSAmJiAoX2EgPSBfYi5yZXR1cm4pKSBfYS5jYWxsKF9iKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZpbmFsbHkgeyBpZiAoZV8zKSB0aHJvdyBlXzMuZXJyb3I7IH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIHNoYWxsb3cgbm9uIG9ic2VydmFibGUgb2JqZWN0IGNsb25lIG9mIHRoaXMgbWFwLlxuICAgICAqIE5vdGUgdGhhdCB0aGUgdmFsdWVzIG1pZ3RoIHN0aWxsIGJlIG9ic2VydmFibGUuIEZvciBhIGRlZXAgY2xvbmUgdXNlIG1vYngudG9KUy5cbiAgICAgKi9cbiAgICBPYnNlcnZhYmxlTWFwJCQxLnByb3RvdHlwZS50b0pTID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gbmV3IE1hcCh0aGlzKTtcbiAgICB9O1xuICAgIE9ic2VydmFibGVNYXAkJDEucHJvdG90eXBlLnRvSlNPTiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gVXNlZCBieSBKU09OLnN0cmluZ2lmeVxuICAgICAgICByZXR1cm4gdGhpcy50b1BPSk8oKTtcbiAgICB9O1xuICAgIE9ic2VydmFibGVNYXAkJDEucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICByZXR1cm4gKHRoaXMubmFtZSArXG4gICAgICAgICAgICBcIlt7IFwiICtcbiAgICAgICAgICAgIEFycmF5LmZyb20odGhpcy5rZXlzKCkpXG4gICAgICAgICAgICAgICAgLm1hcChmdW5jdGlvbiAoa2V5KSB7IHJldHVybiBzdHJpbmdpZnlLZXkoa2V5KSArIFwiOiBcIiArIChcIlwiICsgX3RoaXMuZ2V0KGtleSkpOyB9KVxuICAgICAgICAgICAgICAgIC5qb2luKFwiLCBcIikgK1xuICAgICAgICAgICAgXCIgfV1cIik7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBPYnNlcnZlcyB0aGlzIG9iamVjdC4gVHJpZ2dlcnMgZm9yIHRoZSBldmVudHMgJ2FkZCcsICd1cGRhdGUnIGFuZCAnZGVsZXRlJy5cbiAgICAgKiBTZWU6IGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL09iamVjdC9vYnNlcnZlXG4gICAgICogZm9yIGNhbGxiYWNrIGRldGFpbHNcbiAgICAgKi9cbiAgICBPYnNlcnZhYmxlTWFwJCQxLnByb3RvdHlwZS5vYnNlcnZlID0gZnVuY3Rpb24gKGxpc3RlbmVyLCBmaXJlSW1tZWRpYXRlbHkpIHtcbiAgICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiICYmXG4gICAgICAgICAgICBpbnZhcmlhbnQkJDEoZmlyZUltbWVkaWF0ZWx5ICE9PSB0cnVlLCBcImBvYnNlcnZlYCBkb2Vzbid0IHN1cHBvcnQgZmlyZUltbWVkaWF0ZWx5PXRydWUgaW4gY29tYmluYXRpb24gd2l0aCBtYXBzLlwiKTtcbiAgICAgICAgcmV0dXJuIHJlZ2lzdGVyTGlzdGVuZXIkJDEodGhpcywgbGlzdGVuZXIpO1xuICAgIH07XG4gICAgT2JzZXJ2YWJsZU1hcCQkMS5wcm90b3R5cGUuaW50ZXJjZXB0ID0gZnVuY3Rpb24gKGhhbmRsZXIpIHtcbiAgICAgICAgcmV0dXJuIHJlZ2lzdGVySW50ZXJjZXB0b3IkJDEodGhpcywgaGFuZGxlcik7XG4gICAgfTtcbiAgICByZXR1cm4gT2JzZXJ2YWJsZU1hcCQkMTtcbn0oKSk7XG5mdW5jdGlvbiBzdHJpbmdpZnlLZXkoa2V5KSB7XG4gICAgaWYgKGtleSAmJiBrZXkudG9TdHJpbmcpXG4gICAgICAgIHJldHVybiBrZXkudG9TdHJpbmcoKTtcbiAgICBlbHNlXG4gICAgICAgIHJldHVybiBuZXcgU3RyaW5nKGtleSkudG9TdHJpbmcoKTtcbn1cbi8qICd2YXInIGZpeGVzIHNtYWxsLWJ1aWxkIGlzc3VlICovXG52YXIgaXNPYnNlcnZhYmxlTWFwJCQxID0gY3JlYXRlSW5zdGFuY2VvZlByZWRpY2F0ZSQkMShcIk9ic2VydmFibGVNYXBcIiwgT2JzZXJ2YWJsZU1hcCQkMSk7XG5cbnZhciBfYSQxO1xudmFyIE9ic2VydmFibGVTZXRNYXJrZXIgPSB7fTtcbnZhciBPYnNlcnZhYmxlU2V0JCQxID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE9ic2VydmFibGVTZXQkJDEoaW5pdGlhbERhdGEsIGVuaGFuY2VyLCBuYW1lKSB7XG4gICAgICAgIGlmIChlbmhhbmNlciA9PT0gdm9pZCAwKSB7IGVuaGFuY2VyID0gZGVlcEVuaGFuY2VyJCQxOyB9XG4gICAgICAgIGlmIChuYW1lID09PSB2b2lkIDApIHsgbmFtZSA9IFwiT2JzZXJ2YWJsZVNldEBcIiArIGdldE5leHRJZCQkMSgpOyB9XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXNbX2EkMV0gPSBPYnNlcnZhYmxlU2V0TWFya2VyO1xuICAgICAgICB0aGlzLl9kYXRhID0gbmV3IFNldCgpO1xuICAgICAgICB0aGlzLl9hdG9tID0gY3JlYXRlQXRvbSQkMSh0aGlzLm5hbWUpO1xuICAgICAgICB0aGlzW1N5bWJvbC50b1N0cmluZ1RhZ10gPSBcIlNldFwiO1xuICAgICAgICBpZiAodHlwZW9mIFNldCAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJtb2J4LnNldCByZXF1aXJlcyBTZXQgcG9seWZpbGwgZm9yIHRoZSBjdXJyZW50IGJyb3dzZXIuIENoZWNrIGJhYmVsLXBvbHlmaWxsIG9yIGNvcmUtanMvZXM2L3NldC5qc1wiKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmVuaGFuY2VyID0gZnVuY3Rpb24gKG5ld1YsIG9sZFYpIHsgcmV0dXJuIGVuaGFuY2VyKG5ld1YsIG9sZFYsIG5hbWUpOyB9O1xuICAgICAgICBpZiAoaW5pdGlhbERhdGEpIHtcbiAgICAgICAgICAgIHRoaXMucmVwbGFjZShpbml0aWFsRGF0YSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgT2JzZXJ2YWJsZVNldCQkMS5wcm90b3R5cGUuZGVoYW5jZVZhbHVlID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIGlmICh0aGlzLmRlaGFuY2VyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRlaGFuY2VyKHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfTtcbiAgICBPYnNlcnZhYmxlU2V0JCQxLnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdHJhbnNhY3Rpb24kJDEoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdW50cmFja2VkJCQxKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgZV8xLCBfYTtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBfYiA9IF9fdmFsdWVzKF90aGlzLl9kYXRhLnZhbHVlcygpKSwgX2MgPSBfYi5uZXh0KCk7ICFfYy5kb25lOyBfYyA9IF9iLm5leHQoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gX2MudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5kZWxldGUodmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhdGNoIChlXzFfMSkgeyBlXzEgPSB7IGVycm9yOiBlXzFfMSB9OyB9XG4gICAgICAgICAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoX2MgJiYgIV9jLmRvbmUgJiYgKF9hID0gX2IucmV0dXJuKSkgX2EuY2FsbChfYik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZmluYWxseSB7IGlmIChlXzEpIHRocm93IGVfMS5lcnJvcjsgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIE9ic2VydmFibGVTZXQkJDEucHJvdG90eXBlLmZvckVhY2ggPSBmdW5jdGlvbiAoY2FsbGJhY2tGbiwgdGhpc0FyZykge1xuICAgICAgICB2YXIgZV8yLCBfYTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGZvciAodmFyIF9iID0gX192YWx1ZXModGhpcyksIF9jID0gX2IubmV4dCgpOyAhX2MuZG9uZTsgX2MgPSBfYi5uZXh0KCkpIHtcbiAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSBfYy52YWx1ZTtcbiAgICAgICAgICAgICAgICBjYWxsYmFja0ZuLmNhbGwodGhpc0FyZywgdmFsdWUsIHZhbHVlLCB0aGlzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZV8yXzEpIHsgZV8yID0geyBlcnJvcjogZV8yXzEgfTsgfVxuICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgaWYgKF9jICYmICFfYy5kb25lICYmIChfYSA9IF9iLnJldHVybikpIF9hLmNhbGwoX2IpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZmluYWxseSB7IGlmIChlXzIpIHRocm93IGVfMi5lcnJvcjsgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoT2JzZXJ2YWJsZVNldCQkMS5wcm90b3R5cGUsIFwic2l6ZVwiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5fYXRvbS5yZXBvcnRPYnNlcnZlZCgpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGEuc2l6ZTtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JzZXJ2YWJsZVNldCQkMS5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIGNoZWNrSWZTdGF0ZU1vZGlmaWNhdGlvbnNBcmVBbGxvd2VkJCQxKHRoaXMuX2F0b20pO1xuICAgICAgICBpZiAoaGFzSW50ZXJjZXB0b3JzJCQxKHRoaXMpKSB7XG4gICAgICAgICAgICB2YXIgY2hhbmdlID0gaW50ZXJjZXB0Q2hhbmdlJCQxKHRoaXMsIHtcbiAgICAgICAgICAgICAgICB0eXBlOiBcImFkZFwiLFxuICAgICAgICAgICAgICAgIG9iamVjdDogdGhpcyxcbiAgICAgICAgICAgICAgICBuZXdWYWx1ZTogdmFsdWVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKCFjaGFuZ2UpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICAvLyBUT0RPOiBpZGVhbGx5LCB2YWx1ZSA9IGNoYW5nZS52YWx1ZSB3b3VsZCBiZSBkb25lIGhlcmUsIHNvIHRoYXQgdmFsdWVzIGNhbiBiZVxuICAgICAgICAgICAgLy8gY2hhbmdlZCBieSBpbnRlcmNlcHRvci4gU2FtZSBhcHBsaWVzIGZvciBvdGhlciBTZXQgYW5kIE1hcCBhcGkncy5cbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMuaGFzKHZhbHVlKSkge1xuICAgICAgICAgICAgdHJhbnNhY3Rpb24kJDEoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIF90aGlzLl9kYXRhLmFkZChfdGhpcy5lbmhhbmNlcih2YWx1ZSwgdW5kZWZpbmVkKSk7XG4gICAgICAgICAgICAgICAgX3RoaXMuX2F0b20ucmVwb3J0Q2hhbmdlZCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB2YXIgbm90aWZ5U3B5ID0gaXNTcHlFbmFibGVkJCQxKCk7XG4gICAgICAgICAgICB2YXIgbm90aWZ5ID0gaGFzTGlzdGVuZXJzJCQxKHRoaXMpO1xuICAgICAgICAgICAgdmFyIGNoYW5nZSA9IG5vdGlmeSB8fCBub3RpZnlTcHlcbiAgICAgICAgICAgICAgICA/IHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJhZGRcIixcbiAgICAgICAgICAgICAgICAgICAgb2JqZWN0OiB0aGlzLFxuICAgICAgICAgICAgICAgICAgICBuZXdWYWx1ZTogdmFsdWVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgOiBudWxsO1xuICAgICAgICAgICAgaWYgKG5vdGlmeVNweSAmJiBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpXG4gICAgICAgICAgICAgICAgc3B5UmVwb3J0U3RhcnQkJDEoY2hhbmdlKTtcbiAgICAgICAgICAgIGlmIChub3RpZnkpXG4gICAgICAgICAgICAgICAgbm90aWZ5TGlzdGVuZXJzJCQxKHRoaXMsIGNoYW5nZSk7XG4gICAgICAgICAgICBpZiAobm90aWZ5U3B5ICYmIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIilcbiAgICAgICAgICAgICAgICBzcHlSZXBvcnRFbmQkJDEoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIE9ic2VydmFibGVTZXQkJDEucHJvdG90eXBlLmRlbGV0ZSA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICBpZiAoaGFzSW50ZXJjZXB0b3JzJCQxKHRoaXMpKSB7XG4gICAgICAgICAgICB2YXIgY2hhbmdlID0gaW50ZXJjZXB0Q2hhbmdlJCQxKHRoaXMsIHtcbiAgICAgICAgICAgICAgICB0eXBlOiBcImRlbGV0ZVwiLFxuICAgICAgICAgICAgICAgIG9iamVjdDogdGhpcyxcbiAgICAgICAgICAgICAgICBvbGRWYWx1ZTogdmFsdWVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKCFjaGFuZ2UpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmhhcyh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHZhciBub3RpZnlTcHkgPSBpc1NweUVuYWJsZWQkJDEoKTtcbiAgICAgICAgICAgIHZhciBub3RpZnkgPSBoYXNMaXN0ZW5lcnMkJDEodGhpcyk7XG4gICAgICAgICAgICB2YXIgY2hhbmdlID0gbm90aWZ5IHx8IG5vdGlmeVNweVxuICAgICAgICAgICAgICAgID8ge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcImRlbGV0ZVwiLFxuICAgICAgICAgICAgICAgICAgICBvYmplY3Q6IHRoaXMsXG4gICAgICAgICAgICAgICAgICAgIG9sZFZhbHVlOiB2YWx1ZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICA6IG51bGw7XG4gICAgICAgICAgICBpZiAobm90aWZ5U3B5ICYmIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIilcbiAgICAgICAgICAgICAgICBzcHlSZXBvcnRTdGFydCQkMShfX2Fzc2lnbih7fSwgY2hhbmdlLCB7IG5hbWU6IHRoaXMubmFtZSB9KSk7XG4gICAgICAgICAgICB0cmFuc2FjdGlvbiQkMShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuX2F0b20ucmVwb3J0Q2hhbmdlZCgpO1xuICAgICAgICAgICAgICAgIF90aGlzLl9kYXRhLmRlbGV0ZSh2YWx1ZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmIChub3RpZnkpXG4gICAgICAgICAgICAgICAgbm90aWZ5TGlzdGVuZXJzJCQxKHRoaXMsIGNoYW5nZSk7XG4gICAgICAgICAgICBpZiAobm90aWZ5U3B5ICYmIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIilcbiAgICAgICAgICAgICAgICBzcHlSZXBvcnRFbmQkJDEoKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuICAgIE9ic2VydmFibGVTZXQkJDEucHJvdG90eXBlLmhhcyA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICB0aGlzLl9hdG9tLnJlcG9ydE9ic2VydmVkKCk7XG4gICAgICAgIHJldHVybiB0aGlzLl9kYXRhLmhhcyh0aGlzLmRlaGFuY2VWYWx1ZSh2YWx1ZSkpO1xuICAgIH07XG4gICAgT2JzZXJ2YWJsZVNldCQkMS5wcm90b3R5cGUuZW50cmllcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIG5leHRJbmRleCA9IDA7XG4gICAgICAgIHZhciBrZXlzJCQxID0gQXJyYXkuZnJvbSh0aGlzLmtleXMoKSk7XG4gICAgICAgIHZhciB2YWx1ZXMkJDEgPSBBcnJheS5mcm9tKHRoaXMudmFsdWVzKCkpO1xuICAgICAgICByZXR1cm4gbWFrZUl0ZXJhYmxlKHtcbiAgICAgICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgaW5kZXggPSBuZXh0SW5kZXg7XG4gICAgICAgICAgICAgICAgbmV4dEluZGV4ICs9IDE7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGluZGV4IDwgdmFsdWVzJCQxLmxlbmd0aFxuICAgICAgICAgICAgICAgICAgICA/IHsgdmFsdWU6IFtrZXlzJCQxW2luZGV4XSwgdmFsdWVzJCQxW2luZGV4XV0sIGRvbmU6IGZhbHNlIH1cbiAgICAgICAgICAgICAgICAgICAgOiB7IGRvbmU6IHRydWUgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBPYnNlcnZhYmxlU2V0JCQxLnByb3RvdHlwZS5rZXlzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy52YWx1ZXMoKTtcbiAgICB9O1xuICAgIE9ic2VydmFibGVTZXQkJDEucHJvdG90eXBlLnZhbHVlcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5fYXRvbS5yZXBvcnRPYnNlcnZlZCgpO1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHZhciBuZXh0SW5kZXggPSAwO1xuICAgICAgICB2YXIgb2JzZXJ2YWJsZVZhbHVlcyA9IEFycmF5LmZyb20odGhpcy5fZGF0YS52YWx1ZXMoKSk7XG4gICAgICAgIHJldHVybiBtYWtlSXRlcmFibGUoe1xuICAgICAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXh0SW5kZXggPCBvYnNlcnZhYmxlVmFsdWVzLmxlbmd0aFxuICAgICAgICAgICAgICAgICAgICA/IHsgdmFsdWU6IHNlbGYuZGVoYW5jZVZhbHVlKG9ic2VydmFibGVWYWx1ZXNbbmV4dEluZGV4KytdKSwgZG9uZTogZmFsc2UgfVxuICAgICAgICAgICAgICAgICAgICA6IHsgZG9uZTogdHJ1ZSB9O1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuICAgIE9ic2VydmFibGVTZXQkJDEucHJvdG90eXBlLnJlcGxhY2UgPSBmdW5jdGlvbiAob3RoZXIpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgaWYgKGlzT2JzZXJ2YWJsZVNldCQkMShvdGhlcikpIHtcbiAgICAgICAgICAgIG90aGVyID0gb3RoZXIudG9KUygpO1xuICAgICAgICB9XG4gICAgICAgIHRyYW5zYWN0aW9uJCQxKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KG90aGVyKSkge1xuICAgICAgICAgICAgICAgIF90aGlzLmNsZWFyKCk7XG4gICAgICAgICAgICAgICAgb3RoZXIuZm9yRWFjaChmdW5jdGlvbiAodmFsdWUpIHsgcmV0dXJuIF90aGlzLmFkZCh2YWx1ZSk7IH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoaXNFUzZTZXQkJDEob3RoZXIpKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuY2xlYXIoKTtcbiAgICAgICAgICAgICAgICBvdGhlci5mb3JFYWNoKGZ1bmN0aW9uICh2YWx1ZSkgeyByZXR1cm4gX3RoaXMuYWRkKHZhbHVlKTsgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChvdGhlciAhPT0gbnVsbCAmJiBvdGhlciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgZmFpbCQkMShcIkNhbm5vdCBpbml0aWFsaXplIHNldCBmcm9tIFwiICsgb3RoZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBPYnNlcnZhYmxlU2V0JCQxLnByb3RvdHlwZS5vYnNlcnZlID0gZnVuY3Rpb24gKGxpc3RlbmVyLCBmaXJlSW1tZWRpYXRlbHkpIHtcbiAgICAgICAgLy8gVE9ETyAnZmlyZUltbWVkaWF0ZWx5JyBjYW4gYmUgdHJ1ZT9cbiAgICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiICYmXG4gICAgICAgICAgICBpbnZhcmlhbnQkJDEoZmlyZUltbWVkaWF0ZWx5ICE9PSB0cnVlLCBcImBvYnNlcnZlYCBkb2Vzbid0IHN1cHBvcnQgZmlyZUltbWVkaWF0ZWx5PXRydWUgaW4gY29tYmluYXRpb24gd2l0aCBzZXRzLlwiKTtcbiAgICAgICAgcmV0dXJuIHJlZ2lzdGVyTGlzdGVuZXIkJDEodGhpcywgbGlzdGVuZXIpO1xuICAgIH07XG4gICAgT2JzZXJ2YWJsZVNldCQkMS5wcm90b3R5cGUuaW50ZXJjZXB0ID0gZnVuY3Rpb24gKGhhbmRsZXIpIHtcbiAgICAgICAgcmV0dXJuIHJlZ2lzdGVySW50ZXJjZXB0b3IkJDEodGhpcywgaGFuZGxlcik7XG4gICAgfTtcbiAgICBPYnNlcnZhYmxlU2V0JCQxLnByb3RvdHlwZS50b0pTID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gbmV3IFNldCh0aGlzKTtcbiAgICB9O1xuICAgIE9ic2VydmFibGVTZXQkJDEucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5uYW1lICsgXCJbIFwiICsgQXJyYXkuZnJvbSh0aGlzKS5qb2luKFwiLCBcIikgKyBcIiBdXCI7XG4gICAgfTtcbiAgICBPYnNlcnZhYmxlU2V0JCQxLnByb3RvdHlwZVsoX2EkMSA9ICRtb2J4JCQxLCBTeW1ib2wuaXRlcmF0b3IpXSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsdWVzKCk7XG4gICAgfTtcbiAgICByZXR1cm4gT2JzZXJ2YWJsZVNldCQkMTtcbn0oKSk7XG52YXIgaXNPYnNlcnZhYmxlU2V0JCQxID0gY3JlYXRlSW5zdGFuY2VvZlByZWRpY2F0ZSQkMShcIk9ic2VydmFibGVTZXRcIiwgT2JzZXJ2YWJsZVNldCQkMSk7XG5cbnZhciBPYnNlcnZhYmxlT2JqZWN0QWRtaW5pc3RyYXRpb24kJDEgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gT2JzZXJ2YWJsZU9iamVjdEFkbWluaXN0cmF0aW9uJCQxKHRhcmdldCwgdmFsdWVzJCQxLCBuYW1lLCBkZWZhdWx0RW5oYW5jZXIpIHtcbiAgICAgICAgaWYgKHZhbHVlcyQkMSA9PT0gdm9pZCAwKSB7IHZhbHVlcyQkMSA9IG5ldyBNYXAoKTsgfVxuICAgICAgICB0aGlzLnRhcmdldCA9IHRhcmdldDtcbiAgICAgICAgdGhpcy52YWx1ZXMgPSB2YWx1ZXMkJDE7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMuZGVmYXVsdEVuaGFuY2VyID0gZGVmYXVsdEVuaGFuY2VyO1xuICAgICAgICB0aGlzLmtleXNBdG9tID0gbmV3IEF0b20kJDEobmFtZSArIFwiLmtleXNcIik7XG4gICAgfVxuICAgIE9ic2VydmFibGVPYmplY3RBZG1pbmlzdHJhdGlvbiQkMS5wcm90b3R5cGUucmVhZCA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsdWVzLmdldChrZXkpLmdldCgpO1xuICAgIH07XG4gICAgT2JzZXJ2YWJsZU9iamVjdEFkbWluaXN0cmF0aW9uJCQxLnByb3RvdHlwZS53cml0ZSA9IGZ1bmN0aW9uIChrZXksIG5ld1ZhbHVlKSB7XG4gICAgICAgIHZhciBpbnN0YW5jZSA9IHRoaXMudGFyZ2V0O1xuICAgICAgICB2YXIgb2JzZXJ2YWJsZSQkMSA9IHRoaXMudmFsdWVzLmdldChrZXkpO1xuICAgICAgICBpZiAob2JzZXJ2YWJsZSQkMSBpbnN0YW5jZW9mIENvbXB1dGVkVmFsdWUkJDEpIHtcbiAgICAgICAgICAgIG9ic2VydmFibGUkJDEuc2V0KG5ld1ZhbHVlKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyBpbnRlcmNlcHRcbiAgICAgICAgaWYgKGhhc0ludGVyY2VwdG9ycyQkMSh0aGlzKSkge1xuICAgICAgICAgICAgdmFyIGNoYW5nZSA9IGludGVyY2VwdENoYW5nZSQkMSh0aGlzLCB7XG4gICAgICAgICAgICAgICAgdHlwZTogXCJ1cGRhdGVcIixcbiAgICAgICAgICAgICAgICBvYmplY3Q6IHRoaXMucHJveHkgfHwgaW5zdGFuY2UsXG4gICAgICAgICAgICAgICAgbmFtZToga2V5LFxuICAgICAgICAgICAgICAgIG5ld1ZhbHVlOiBuZXdWYWx1ZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoIWNoYW5nZSlcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBuZXdWYWx1ZSA9IGNoYW5nZS5uZXdWYWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBuZXdWYWx1ZSA9IG9ic2VydmFibGUkJDEucHJlcGFyZU5ld1ZhbHVlKG5ld1ZhbHVlKTtcbiAgICAgICAgLy8gbm90aWZ5IHNweSAmIG9ic2VydmVyc1xuICAgICAgICBpZiAobmV3VmFsdWUgIT09IGdsb2JhbFN0YXRlJCQxLlVOQ0hBTkdFRCkge1xuICAgICAgICAgICAgdmFyIG5vdGlmeSA9IGhhc0xpc3RlbmVycyQkMSh0aGlzKTtcbiAgICAgICAgICAgIHZhciBub3RpZnlTcHkgPSBpc1NweUVuYWJsZWQkJDEoKTtcbiAgICAgICAgICAgIHZhciBjaGFuZ2UgPSBub3RpZnkgfHwgbm90aWZ5U3B5XG4gICAgICAgICAgICAgICAgPyB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwidXBkYXRlXCIsXG4gICAgICAgICAgICAgICAgICAgIG9iamVjdDogdGhpcy5wcm94eSB8fCBpbnN0YW5jZSxcbiAgICAgICAgICAgICAgICAgICAgb2xkVmFsdWU6IG9ic2VydmFibGUkJDEudmFsdWUsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IGtleSxcbiAgICAgICAgICAgICAgICAgICAgbmV3VmFsdWU6IG5ld1ZhbHVlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIDogbnVsbDtcbiAgICAgICAgICAgIGlmIChub3RpZnlTcHkgJiYgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKVxuICAgICAgICAgICAgICAgIHNweVJlcG9ydFN0YXJ0JCQxKF9fYXNzaWduKHt9LCBjaGFuZ2UsIHsgbmFtZTogdGhpcy5uYW1lLCBrZXk6IGtleSB9KSk7XG4gICAgICAgICAgICBvYnNlcnZhYmxlJCQxLnNldE5ld1ZhbHVlKG5ld1ZhbHVlKTtcbiAgICAgICAgICAgIGlmIChub3RpZnkpXG4gICAgICAgICAgICAgICAgbm90aWZ5TGlzdGVuZXJzJCQxKHRoaXMsIGNoYW5nZSk7XG4gICAgICAgICAgICBpZiAobm90aWZ5U3B5ICYmIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIilcbiAgICAgICAgICAgICAgICBzcHlSZXBvcnRFbmQkJDEoKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgT2JzZXJ2YWJsZU9iamVjdEFkbWluaXN0cmF0aW9uJCQxLnByb3RvdHlwZS5oYXMgPSBmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgIHZhciBtYXAgPSB0aGlzLnBlbmRpbmdLZXlzIHx8ICh0aGlzLnBlbmRpbmdLZXlzID0gbmV3IE1hcCgpKTtcbiAgICAgICAgdmFyIGVudHJ5ID0gbWFwLmdldChrZXkpO1xuICAgICAgICBpZiAoZW50cnkpXG4gICAgICAgICAgICByZXR1cm4gZW50cnkuZ2V0KCk7XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdmFyIGV4aXN0cyA9ICEhdGhpcy52YWx1ZXMuZ2V0KGtleSk7XG4gICAgICAgICAgICAvLyBQb3NzaWJsZSBvcHRpbWl6YXRpb246IERvbid0IGhhdmUgYSBzZXBhcmF0ZSBtYXAgZm9yIG5vbiBleGlzdGluZyBrZXlzLFxuICAgICAgICAgICAgLy8gYnV0IHN0b3JlIHRoZW0gaW4gdGhlIHZhbHVlcyBtYXAgaW5zdGVhZCwgdXNpbmcgYSBzcGVjaWFsIHN5bWJvbCB0byBkZW5vdGUgXCJub3QgZXhpc3RpbmdcIlxuICAgICAgICAgICAgZW50cnkgPSBuZXcgT2JzZXJ2YWJsZVZhbHVlJCQxKGV4aXN0cywgcmVmZXJlbmNlRW5oYW5jZXIkJDEsIHRoaXMubmFtZSArIFwiLlwiICsga2V5LnRvU3RyaW5nKCkgKyBcIj9cIiwgZmFsc2UpO1xuICAgICAgICAgICAgbWFwLnNldChrZXksIGVudHJ5KTtcbiAgICAgICAgICAgIHJldHVybiBlbnRyeS5nZXQoKTsgLy8gcmVhZCB0byBzdWJzY3JpYmVcbiAgICAgICAgfVxuICAgIH07XG4gICAgT2JzZXJ2YWJsZU9iamVjdEFkbWluaXN0cmF0aW9uJCQxLnByb3RvdHlwZS5hZGRPYnNlcnZhYmxlUHJvcCA9IGZ1bmN0aW9uIChwcm9wTmFtZSwgbmV3VmFsdWUsIGVuaGFuY2VyKSB7XG4gICAgICAgIGlmIChlbmhhbmNlciA9PT0gdm9pZCAwKSB7IGVuaGFuY2VyID0gdGhpcy5kZWZhdWx0RW5oYW5jZXI7IH1cbiAgICAgICAgdmFyIHRhcmdldCA9IHRoaXMudGFyZ2V0O1xuICAgICAgICBhc3NlcnRQcm9wZXJ0eUNvbmZpZ3VyYWJsZSQkMSh0YXJnZXQsIHByb3BOYW1lKTtcbiAgICAgICAgaWYgKGhhc0ludGVyY2VwdG9ycyQkMSh0aGlzKSkge1xuICAgICAgICAgICAgdmFyIGNoYW5nZSA9IGludGVyY2VwdENoYW5nZSQkMSh0aGlzLCB7XG4gICAgICAgICAgICAgICAgb2JqZWN0OiB0aGlzLnByb3h5IHx8IHRhcmdldCxcbiAgICAgICAgICAgICAgICBuYW1lOiBwcm9wTmFtZSxcbiAgICAgICAgICAgICAgICB0eXBlOiBcImFkZFwiLFxuICAgICAgICAgICAgICAgIG5ld1ZhbHVlOiBuZXdWYWx1ZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoIWNoYW5nZSlcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBuZXdWYWx1ZSA9IGNoYW5nZS5uZXdWYWx1ZTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgb2JzZXJ2YWJsZSQkMSA9IG5ldyBPYnNlcnZhYmxlVmFsdWUkJDEobmV3VmFsdWUsIGVuaGFuY2VyLCB0aGlzLm5hbWUgKyBcIi5cIiArIHByb3BOYW1lLCBmYWxzZSk7XG4gICAgICAgIHRoaXMudmFsdWVzLnNldChwcm9wTmFtZSwgb2JzZXJ2YWJsZSQkMSk7XG4gICAgICAgIG5ld1ZhbHVlID0gb2JzZXJ2YWJsZSQkMS52YWx1ZTsgLy8gb2JzZXJ2YWJsZVZhbHVlIG1pZ2h0IGhhdmUgY2hhbmdlZCBpdFxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBwcm9wTmFtZSwgZ2VuZXJhdGVPYnNlcnZhYmxlUHJvcENvbmZpZyQkMShwcm9wTmFtZSkpO1xuICAgICAgICB0aGlzLm5vdGlmeVByb3BlcnR5QWRkaXRpb24ocHJvcE5hbWUsIG5ld1ZhbHVlKTtcbiAgICB9O1xuICAgIE9ic2VydmFibGVPYmplY3RBZG1pbmlzdHJhdGlvbiQkMS5wcm90b3R5cGUuYWRkQ29tcHV0ZWRQcm9wID0gZnVuY3Rpb24gKHByb3BlcnR5T3duZXIsIC8vIHdoZXJlIGlzIHRoZSBwcm9wZXJ0eSBkZWNsYXJlZD9cbiAgICBwcm9wTmFtZSwgb3B0aW9ucykge1xuICAgICAgICB2YXIgdGFyZ2V0ID0gdGhpcy50YXJnZXQ7XG4gICAgICAgIG9wdGlvbnMubmFtZSA9IG9wdGlvbnMubmFtZSB8fCB0aGlzLm5hbWUgKyBcIi5cIiArIHByb3BOYW1lO1xuICAgICAgICB0aGlzLnZhbHVlcy5zZXQocHJvcE5hbWUsIG5ldyBDb21wdXRlZFZhbHVlJCQxKG9wdGlvbnMpKTtcbiAgICAgICAgaWYgKHByb3BlcnR5T3duZXIgPT09IHRhcmdldCB8fCBpc1Byb3BlcnR5Q29uZmlndXJhYmxlJCQxKHByb3BlcnR5T3duZXIsIHByb3BOYW1lKSlcbiAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShwcm9wZXJ0eU93bmVyLCBwcm9wTmFtZSwgZ2VuZXJhdGVDb21wdXRlZFByb3BDb25maWckJDEocHJvcE5hbWUpKTtcbiAgICB9O1xuICAgIE9ic2VydmFibGVPYmplY3RBZG1pbmlzdHJhdGlvbiQkMS5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24gKGtleSkge1xuICAgICAgICBpZiAoIXRoaXMudmFsdWVzLmhhcyhrZXkpKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB2YXIgdGFyZ2V0ID0gdGhpcy50YXJnZXQ7XG4gICAgICAgIGlmIChoYXNJbnRlcmNlcHRvcnMkJDEodGhpcykpIHtcbiAgICAgICAgICAgIHZhciBjaGFuZ2UgPSBpbnRlcmNlcHRDaGFuZ2UkJDEodGhpcywge1xuICAgICAgICAgICAgICAgIG9iamVjdDogdGhpcy5wcm94eSB8fCB0YXJnZXQsXG4gICAgICAgICAgICAgICAgbmFtZToga2V5LFxuICAgICAgICAgICAgICAgIHR5cGU6IFwicmVtb3ZlXCJcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKCFjaGFuZ2UpXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBzdGFydEJhdGNoJCQxKCk7XG4gICAgICAgICAgICB2YXIgbm90aWZ5ID0gaGFzTGlzdGVuZXJzJCQxKHRoaXMpO1xuICAgICAgICAgICAgdmFyIG5vdGlmeVNweSA9IGlzU3B5RW5hYmxlZCQkMSgpO1xuICAgICAgICAgICAgdmFyIG9sZE9ic2VydmFibGUgPSB0aGlzLnZhbHVlcy5nZXQoa2V5KTtcbiAgICAgICAgICAgIHZhciBvbGRWYWx1ZSA9IG9sZE9ic2VydmFibGUgJiYgb2xkT2JzZXJ2YWJsZS5nZXQoKTtcbiAgICAgICAgICAgIG9sZE9ic2VydmFibGUgJiYgb2xkT2JzZXJ2YWJsZS5zZXQodW5kZWZpbmVkKTtcbiAgICAgICAgICAgIC8vIG5vdGlmeSBrZXkgYW5kIGtleXNldCBsaXN0ZW5lcnNcbiAgICAgICAgICAgIHRoaXMua2V5c0F0b20ucmVwb3J0Q2hhbmdlZCgpO1xuICAgICAgICAgICAgdGhpcy52YWx1ZXMuZGVsZXRlKGtleSk7XG4gICAgICAgICAgICBpZiAodGhpcy5wZW5kaW5nS2V5cykge1xuICAgICAgICAgICAgICAgIHZhciBlbnRyeSA9IHRoaXMucGVuZGluZ0tleXMuZ2V0KGtleSk7XG4gICAgICAgICAgICAgICAgaWYgKGVudHJ5KVxuICAgICAgICAgICAgICAgICAgICBlbnRyeS5zZXQoZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gZGVsZXRlIHRoZSBwcm9wXG4gICAgICAgICAgICBkZWxldGUgdGhpcy50YXJnZXRba2V5XTtcbiAgICAgICAgICAgIHZhciBjaGFuZ2UgPSBub3RpZnkgfHwgbm90aWZ5U3B5XG4gICAgICAgICAgICAgICAgPyB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwicmVtb3ZlXCIsXG4gICAgICAgICAgICAgICAgICAgIG9iamVjdDogdGhpcy5wcm94eSB8fCB0YXJnZXQsXG4gICAgICAgICAgICAgICAgICAgIG9sZFZhbHVlOiBvbGRWYWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgbmFtZToga2V5XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIDogbnVsbDtcbiAgICAgICAgICAgIGlmIChub3RpZnlTcHkgJiYgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKVxuICAgICAgICAgICAgICAgIHNweVJlcG9ydFN0YXJ0JCQxKF9fYXNzaWduKHt9LCBjaGFuZ2UsIHsgbmFtZTogdGhpcy5uYW1lLCBrZXk6IGtleSB9KSk7XG4gICAgICAgICAgICBpZiAobm90aWZ5KVxuICAgICAgICAgICAgICAgIG5vdGlmeUxpc3RlbmVycyQkMSh0aGlzLCBjaGFuZ2UpO1xuICAgICAgICAgICAgaWYgKG5vdGlmeVNweSAmJiBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpXG4gICAgICAgICAgICAgICAgc3B5UmVwb3J0RW5kJCQxKCk7XG4gICAgICAgIH1cbiAgICAgICAgZmluYWxseSB7XG4gICAgICAgICAgICBlbmRCYXRjaCQkMSgpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBPYnNlcnZhYmxlT2JqZWN0QWRtaW5pc3RyYXRpb24kJDEucHJvdG90eXBlLmlsbGVnYWxBY2Nlc3MgPSBmdW5jdGlvbiAob3duZXIsIHByb3BOYW1lKSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGlzIGhhcHBlbnMgaWYgYSBwcm9wZXJ0eSBpcyBhY2Nlc3NlZCB0aHJvdWdoIHRoZSBwcm90b3R5cGUgY2hhaW4sIGJ1dCB0aGUgcHJvcGVydHkgd2FzXG4gICAgICAgICAqIGRlY2xhcmVkIGRpcmVjdGx5IGFzIG93biBwcm9wZXJ0eSBvbiB0aGUgcHJvdG90eXBlLlxuICAgICAgICAgKlxuICAgICAgICAgKiBFLmcuOlxuICAgICAgICAgKiBjbGFzcyBBIHtcbiAgICAgICAgICogfVxuICAgICAgICAgKiBleHRlbmRPYnNlcnZhYmxlKEEucHJvdG90eXBlLCB7IHg6IDEgfSlcbiAgICAgICAgICpcbiAgICAgICAgICogY2xhc3NCIGV4dGVucyBBIHtcbiAgICAgICAgICogfVxuICAgICAgICAgKiBjb25zb2xlLmxvZyhuZXcgQigpLngpXG4gICAgICAgICAqXG4gICAgICAgICAqIEl0IGlzIHVuY2xlYXIgd2hldGhlciB0aGUgcHJvcGVydHkgc2hvdWxkIGJlIGNvbnNpZGVyZWQgJ3N0YXRpYycgb3IgaW5oZXJpdGVkLlxuICAgICAgICAgKiBFaXRoZXIgdXNlIGBjb25zb2xlLmxvZyhBLngpYFxuICAgICAgICAgKiBvcjogZGVjb3JhdGUoQSwgeyB4OiBvYnNlcnZhYmxlIH0pXG4gICAgICAgICAqXG4gICAgICAgICAqIFdoZW4gdXNpbmcgZGVjb3JhdGUsIHRoZSBwcm9wZXJ0eSB3aWxsIGFsd2F5cyBiZSByZWRlY2xhcmVkIGFzIG93biBwcm9wZXJ0eSBvbiB0aGUgYWN0dWFsIGluc3RhbmNlXG4gICAgICAgICAqL1xuICAgICAgICBjb25zb2xlLndhcm4oXCJQcm9wZXJ0eSAnXCIgKyBwcm9wTmFtZSArIFwiJyBvZiAnXCIgKyBvd25lciArIFwiJyB3YXMgYWNjZXNzZWQgdGhyb3VnaCB0aGUgcHJvdG90eXBlIGNoYWluLiBVc2UgJ2RlY29yYXRlJyBpbnN0ZWFkIHRvIGRlY2xhcmUgdGhlIHByb3Agb3IgYWNjZXNzIGl0IHN0YXRpY2FsbHkgdGhyb3VnaCBpdCdzIG93bmVyXCIpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogT2JzZXJ2ZXMgdGhpcyBvYmplY3QuIFRyaWdnZXJzIGZvciB0aGUgZXZlbnRzICdhZGQnLCAndXBkYXRlJyBhbmQgJ2RlbGV0ZScuXG4gICAgICogU2VlOiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9PYmplY3Qvb2JzZXJ2ZVxuICAgICAqIGZvciBjYWxsYmFjayBkZXRhaWxzXG4gICAgICovXG4gICAgT2JzZXJ2YWJsZU9iamVjdEFkbWluaXN0cmF0aW9uJCQxLnByb3RvdHlwZS5vYnNlcnZlID0gZnVuY3Rpb24gKGNhbGxiYWNrLCBmaXJlSW1tZWRpYXRlbHkpIHtcbiAgICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiICYmXG4gICAgICAgICAgICBpbnZhcmlhbnQkJDEoZmlyZUltbWVkaWF0ZWx5ICE9PSB0cnVlLCBcImBvYnNlcnZlYCBkb2Vzbid0IHN1cHBvcnQgdGhlIGZpcmUgaW1tZWRpYXRlbHkgcHJvcGVydHkgZm9yIG9ic2VydmFibGUgb2JqZWN0cy5cIik7XG4gICAgICAgIHJldHVybiByZWdpc3Rlckxpc3RlbmVyJCQxKHRoaXMsIGNhbGxiYWNrKTtcbiAgICB9O1xuICAgIE9ic2VydmFibGVPYmplY3RBZG1pbmlzdHJhdGlvbiQkMS5wcm90b3R5cGUuaW50ZXJjZXB0ID0gZnVuY3Rpb24gKGhhbmRsZXIpIHtcbiAgICAgICAgcmV0dXJuIHJlZ2lzdGVySW50ZXJjZXB0b3IkJDEodGhpcywgaGFuZGxlcik7XG4gICAgfTtcbiAgICBPYnNlcnZhYmxlT2JqZWN0QWRtaW5pc3RyYXRpb24kJDEucHJvdG90eXBlLm5vdGlmeVByb3BlcnR5QWRkaXRpb24gPSBmdW5jdGlvbiAoa2V5LCBuZXdWYWx1ZSkge1xuICAgICAgICB2YXIgbm90aWZ5ID0gaGFzTGlzdGVuZXJzJCQxKHRoaXMpO1xuICAgICAgICB2YXIgbm90aWZ5U3B5ID0gaXNTcHlFbmFibGVkJCQxKCk7XG4gICAgICAgIHZhciBjaGFuZ2UgPSBub3RpZnkgfHwgbm90aWZ5U3B5XG4gICAgICAgICAgICA/IHtcbiAgICAgICAgICAgICAgICB0eXBlOiBcImFkZFwiLFxuICAgICAgICAgICAgICAgIG9iamVjdDogdGhpcy5wcm94eSB8fCB0aGlzLnRhcmdldCxcbiAgICAgICAgICAgICAgICBuYW1lOiBrZXksXG4gICAgICAgICAgICAgICAgbmV3VmFsdWU6IG5ld1ZhbHVlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICA6IG51bGw7XG4gICAgICAgIGlmIChub3RpZnlTcHkgJiYgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKVxuICAgICAgICAgICAgc3B5UmVwb3J0U3RhcnQkJDEoX19hc3NpZ24oe30sIGNoYW5nZSwgeyBuYW1lOiB0aGlzLm5hbWUsIGtleToga2V5IH0pKTtcbiAgICAgICAgaWYgKG5vdGlmeSlcbiAgICAgICAgICAgIG5vdGlmeUxpc3RlbmVycyQkMSh0aGlzLCBjaGFuZ2UpO1xuICAgICAgICBpZiAobm90aWZ5U3B5ICYmIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIilcbiAgICAgICAgICAgIHNweVJlcG9ydEVuZCQkMSgpO1xuICAgICAgICBpZiAodGhpcy5wZW5kaW5nS2V5cykge1xuICAgICAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy5wZW5kaW5nS2V5cy5nZXQoa2V5KTtcbiAgICAgICAgICAgIGlmIChlbnRyeSlcbiAgICAgICAgICAgICAgICBlbnRyeS5zZXQodHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5rZXlzQXRvbS5yZXBvcnRDaGFuZ2VkKCk7XG4gICAgfTtcbiAgICBPYnNlcnZhYmxlT2JqZWN0QWRtaW5pc3RyYXRpb24kJDEucHJvdG90eXBlLmdldEtleXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBlXzEsIF9hO1xuICAgICAgICB0aGlzLmtleXNBdG9tLnJlcG9ydE9ic2VydmVkKCk7XG4gICAgICAgIC8vIHJldHVybiBSZWZsZWN0Lm93bktleXModGhpcy52YWx1ZXMpIGFzIGFueVxuICAgICAgICB2YXIgcmVzID0gW107XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBmb3IgKHZhciBfYiA9IF9fdmFsdWVzKHRoaXMudmFsdWVzKSwgX2MgPSBfYi5uZXh0KCk7ICFfYy5kb25lOyBfYyA9IF9iLm5leHQoKSkge1xuICAgICAgICAgICAgICAgIHZhciBfZCA9IF9fcmVhZChfYy52YWx1ZSwgMiksIGtleSA9IF9kWzBdLCB2YWx1ZSA9IF9kWzFdO1xuICAgICAgICAgICAgICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIE9ic2VydmFibGVWYWx1ZSQkMSlcbiAgICAgICAgICAgICAgICAgICAgcmVzLnB1c2goa2V5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZV8xXzEpIHsgZV8xID0geyBlcnJvcjogZV8xXzEgfTsgfVxuICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgaWYgKF9jICYmICFfYy5kb25lICYmIChfYSA9IF9iLnJldHVybikpIF9hLmNhbGwoX2IpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZmluYWxseSB7IGlmIChlXzEpIHRocm93IGVfMS5lcnJvcjsgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXM7XG4gICAgfTtcbiAgICByZXR1cm4gT2JzZXJ2YWJsZU9iamVjdEFkbWluaXN0cmF0aW9uJCQxO1xufSgpKTtcbmZ1bmN0aW9uIGFzT2JzZXJ2YWJsZU9iamVjdCQkMSh0YXJnZXQsIG5hbWUsIGRlZmF1bHRFbmhhbmNlcikge1xuICAgIGlmIChuYW1lID09PSB2b2lkIDApIHsgbmFtZSA9IFwiXCI7IH1cbiAgICBpZiAoZGVmYXVsdEVuaGFuY2VyID09PSB2b2lkIDApIHsgZGVmYXVsdEVuaGFuY2VyID0gZGVlcEVuaGFuY2VyJCQxOyB9XG4gICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCh0YXJnZXQsICRtb2J4JCQxKSlcbiAgICAgICAgcmV0dXJuIHRhcmdldFskbW9ieCQkMV07XG4gICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiICYmXG4gICAgICAgIGludmFyaWFudCQkMShPYmplY3QuaXNFeHRlbnNpYmxlKHRhcmdldCksIFwiQ2Fubm90IG1ha2UgdGhlIGRlc2lnbmF0ZWQgb2JqZWN0IG9ic2VydmFibGU7IGl0IGlzIG5vdCBleHRlbnNpYmxlXCIpO1xuICAgIGlmICghaXNQbGFpbk9iamVjdCQkMSh0YXJnZXQpKVxuICAgICAgICBuYW1lID0gKHRhcmdldC5jb25zdHJ1Y3Rvci5uYW1lIHx8IFwiT2JzZXJ2YWJsZU9iamVjdFwiKSArIFwiQFwiICsgZ2V0TmV4dElkJCQxKCk7XG4gICAgaWYgKCFuYW1lKVxuICAgICAgICBuYW1lID0gXCJPYnNlcnZhYmxlT2JqZWN0QFwiICsgZ2V0TmV4dElkJCQxKCk7XG4gICAgdmFyIGFkbSA9IG5ldyBPYnNlcnZhYmxlT2JqZWN0QWRtaW5pc3RyYXRpb24kJDEodGFyZ2V0LCBuZXcgTWFwKCksIG5hbWUsIGRlZmF1bHRFbmhhbmNlcik7XG4gICAgYWRkSGlkZGVuUHJvcCQkMSh0YXJnZXQsICRtb2J4JCQxLCBhZG0pO1xuICAgIHJldHVybiBhZG07XG59XG52YXIgb2JzZXJ2YWJsZVByb3BlcnR5Q29uZmlncyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG52YXIgY29tcHV0ZWRQcm9wZXJ0eUNvbmZpZ3MgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuZnVuY3Rpb24gZ2VuZXJhdGVPYnNlcnZhYmxlUHJvcENvbmZpZyQkMShwcm9wTmFtZSkge1xuICAgIHJldHVybiAob2JzZXJ2YWJsZVByb3BlcnR5Q29uZmlnc1twcm9wTmFtZV0gfHxcbiAgICAgICAgKG9ic2VydmFibGVQcm9wZXJ0eUNvbmZpZ3NbcHJvcE5hbWVdID0ge1xuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzWyRtb2J4JCQxXS5yZWFkKHByb3BOYW1lKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2KSB7XG4gICAgICAgICAgICAgICAgdGhpc1skbW9ieCQkMV0ud3JpdGUocHJvcE5hbWUsIHYpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KSk7XG59XG5mdW5jdGlvbiBnZXRBZG1pbmlzdHJhdGlvbkZvckNvbXB1dGVkUHJvcE93bmVyKG93bmVyKSB7XG4gICAgdmFyIGFkbSA9IG93bmVyWyRtb2J4JCQxXTtcbiAgICBpZiAoIWFkbSkge1xuICAgICAgICAvLyBiZWNhdXNlIGNvbXB1dGVkIHByb3BzIGFyZSBkZWNsYXJlZCBvbiBwcm90eSxcbiAgICAgICAgLy8gdGhlIGN1cnJlbnQgaW5zdGFuY2UgbWlnaHQgbm90IGhhdmUgYmVlbiBpbml0aWFsaXplZCB5ZXRcbiAgICAgICAgaW5pdGlhbGl6ZUluc3RhbmNlJCQxKG93bmVyKTtcbiAgICAgICAgcmV0dXJuIG93bmVyWyRtb2J4JCQxXTtcbiAgICB9XG4gICAgcmV0dXJuIGFkbTtcbn1cbmZ1bmN0aW9uIGdlbmVyYXRlQ29tcHV0ZWRQcm9wQ29uZmlnJCQxKHByb3BOYW1lKSB7XG4gICAgcmV0dXJuIChjb21wdXRlZFByb3BlcnR5Q29uZmlnc1twcm9wTmFtZV0gfHxcbiAgICAgICAgKGNvbXB1dGVkUHJvcGVydHlDb25maWdzW3Byb3BOYW1lXSA9IHtcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBnZXRBZG1pbmlzdHJhdGlvbkZvckNvbXB1dGVkUHJvcE93bmVyKHRoaXMpLnJlYWQocHJvcE5hbWUpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgICAgICAgICBnZXRBZG1pbmlzdHJhdGlvbkZvckNvbXB1dGVkUHJvcE93bmVyKHRoaXMpLndyaXRlKHByb3BOYW1lLCB2KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkpO1xufVxudmFyIGlzT2JzZXJ2YWJsZU9iamVjdEFkbWluaXN0cmF0aW9uID0gY3JlYXRlSW5zdGFuY2VvZlByZWRpY2F0ZSQkMShcIk9ic2VydmFibGVPYmplY3RBZG1pbmlzdHJhdGlvblwiLCBPYnNlcnZhYmxlT2JqZWN0QWRtaW5pc3RyYXRpb24kJDEpO1xuZnVuY3Rpb24gaXNPYnNlcnZhYmxlT2JqZWN0JCQxKHRoaW5nKSB7XG4gICAgaWYgKGlzT2JqZWN0JCQxKHRoaW5nKSkge1xuICAgICAgICAvLyBJbml0aWFsaXplcnMgcnVuIGxhemlseSB3aGVuIHRyYW5zcGlsaW5nIHRvIGJhYmVsLCBzbyBtYWtlIHN1cmUgdGhleSBhcmUgcnVuLi4uXG4gICAgICAgIGluaXRpYWxpemVJbnN0YW5jZSQkMSh0aGluZyk7XG4gICAgICAgIHJldHVybiBpc09ic2VydmFibGVPYmplY3RBZG1pbmlzdHJhdGlvbih0aGluZ1skbW9ieCQkMV0pO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIGdldEF0b20kJDEodGhpbmcsIHByb3BlcnR5KSB7XG4gICAgaWYgKHR5cGVvZiB0aGluZyA9PT0gXCJvYmplY3RcIiAmJiB0aGluZyAhPT0gbnVsbCkge1xuICAgICAgICBpZiAoaXNPYnNlcnZhYmxlQXJyYXkkJDEodGhpbmcpKSB7XG4gICAgICAgICAgICBpZiAocHJvcGVydHkgIT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgICAgICBmYWlsJCQxKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiAmJlxuICAgICAgICAgICAgICAgICAgICBcIkl0IGlzIG5vdCBwb3NzaWJsZSB0byBnZXQgaW5kZXggYXRvbXMgZnJvbSBhcnJheXNcIik7XG4gICAgICAgICAgICByZXR1cm4gdGhpbmdbJG1vYngkJDFdLmF0b207XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzT2JzZXJ2YWJsZVNldCQkMSh0aGluZykpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGluZ1skbW9ieCQkMV07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzT2JzZXJ2YWJsZU1hcCQkMSh0aGluZykpIHtcbiAgICAgICAgICAgIHZhciBhbnlUaGluZyA9IHRoaW5nO1xuICAgICAgICAgICAgaWYgKHByb3BlcnR5ID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGFueVRoaW5nLl9rZXlzQXRvbTtcbiAgICAgICAgICAgIHZhciBvYnNlcnZhYmxlJCQxID0gYW55VGhpbmcuX2RhdGEuZ2V0KHByb3BlcnR5KSB8fCBhbnlUaGluZy5faGFzTWFwLmdldChwcm9wZXJ0eSk7XG4gICAgICAgICAgICBpZiAoIW9ic2VydmFibGUkJDEpXG4gICAgICAgICAgICAgICAgZmFpbCQkMShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgJiZcbiAgICAgICAgICAgICAgICAgICAgXCJ0aGUgZW50cnkgJ1wiICsgcHJvcGVydHkgKyBcIicgZG9lcyBub3QgZXhpc3QgaW4gdGhlIG9ic2VydmFibGUgbWFwICdcIiArIGdldERlYnVnTmFtZSQkMSh0aGluZykgKyBcIidcIik7XG4gICAgICAgICAgICByZXR1cm4gb2JzZXJ2YWJsZSQkMTtcbiAgICAgICAgfVxuICAgICAgICAvLyBJbml0aWFsaXplcnMgcnVuIGxhemlseSB3aGVuIHRyYW5zcGlsaW5nIHRvIGJhYmVsLCBzbyBtYWtlIHN1cmUgdGhleSBhcmUgcnVuLi4uXG4gICAgICAgIGluaXRpYWxpemVJbnN0YW5jZSQkMSh0aGluZyk7XG4gICAgICAgIGlmIChwcm9wZXJ0eSAmJiAhdGhpbmdbJG1vYngkJDFdKVxuICAgICAgICAgICAgdGhpbmdbcHJvcGVydHldOyAvLyBTZWUgIzEwNzJcbiAgICAgICAgaWYgKGlzT2JzZXJ2YWJsZU9iamVjdCQkMSh0aGluZykpIHtcbiAgICAgICAgICAgIGlmICghcHJvcGVydHkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhaWwkJDEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiICYmIFwicGxlYXNlIHNwZWNpZnkgYSBwcm9wZXJ0eVwiKTtcbiAgICAgICAgICAgIHZhciBvYnNlcnZhYmxlJCQxID0gdGhpbmdbJG1vYngkJDFdLnZhbHVlcy5nZXQocHJvcGVydHkpO1xuICAgICAgICAgICAgaWYgKCFvYnNlcnZhYmxlJCQxKVxuICAgICAgICAgICAgICAgIGZhaWwkJDEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiICYmXG4gICAgICAgICAgICAgICAgICAgIFwibm8gb2JzZXJ2YWJsZSBwcm9wZXJ0eSAnXCIgKyBwcm9wZXJ0eSArIFwiJyBmb3VuZCBvbiB0aGUgb2JzZXJ2YWJsZSBvYmplY3QgJ1wiICsgZ2V0RGVidWdOYW1lJCQxKHRoaW5nKSArIFwiJ1wiKTtcbiAgICAgICAgICAgIHJldHVybiBvYnNlcnZhYmxlJCQxO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc0F0b20kJDEodGhpbmcpIHx8IGlzQ29tcHV0ZWRWYWx1ZSQkMSh0aGluZykgfHwgaXNSZWFjdGlvbiQkMSh0aGluZykpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGluZztcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2YgdGhpbmcgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICBpZiAoaXNSZWFjdGlvbiQkMSh0aGluZ1skbW9ieCQkMV0pKSB7XG4gICAgICAgICAgICAvLyBkaXNwb3NlciBmdW5jdGlvblxuICAgICAgICAgICAgcmV0dXJuIHRoaW5nWyRtb2J4JCQxXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFpbCQkMShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgJiYgXCJDYW5ub3Qgb2J0YWluIGF0b20gZnJvbSBcIiArIHRoaW5nKTtcbn1cbmZ1bmN0aW9uIGdldEFkbWluaXN0cmF0aW9uJCQxKHRoaW5nLCBwcm9wZXJ0eSkge1xuICAgIGlmICghdGhpbmcpXG4gICAgICAgIGZhaWwkJDEoXCJFeHBlY3Rpbmcgc29tZSBvYmplY3RcIik7XG4gICAgaWYgKHByb3BlcnR5ICE9PSB1bmRlZmluZWQpXG4gICAgICAgIHJldHVybiBnZXRBZG1pbmlzdHJhdGlvbiQkMShnZXRBdG9tJCQxKHRoaW5nLCBwcm9wZXJ0eSkpO1xuICAgIGlmIChpc0F0b20kJDEodGhpbmcpIHx8IGlzQ29tcHV0ZWRWYWx1ZSQkMSh0aGluZykgfHwgaXNSZWFjdGlvbiQkMSh0aGluZykpXG4gICAgICAgIHJldHVybiB0aGluZztcbiAgICBpZiAoaXNPYnNlcnZhYmxlTWFwJCQxKHRoaW5nKSB8fCBpc09ic2VydmFibGVTZXQkJDEodGhpbmcpKVxuICAgICAgICByZXR1cm4gdGhpbmc7XG4gICAgLy8gSW5pdGlhbGl6ZXJzIHJ1biBsYXppbHkgd2hlbiB0cmFuc3BpbGluZyB0byBiYWJlbCwgc28gbWFrZSBzdXJlIHRoZXkgYXJlIHJ1bi4uLlxuICAgIGluaXRpYWxpemVJbnN0YW5jZSQkMSh0aGluZyk7XG4gICAgaWYgKHRoaW5nWyRtb2J4JCQxXSlcbiAgICAgICAgcmV0dXJuIHRoaW5nWyRtb2J4JCQxXTtcbiAgICBmYWlsJCQxKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiAmJiBcIkNhbm5vdCBvYnRhaW4gYWRtaW5pc3RyYXRpb24gZnJvbSBcIiArIHRoaW5nKTtcbn1cbmZ1bmN0aW9uIGdldERlYnVnTmFtZSQkMSh0aGluZywgcHJvcGVydHkpIHtcbiAgICB2YXIgbmFtZWQ7XG4gICAgaWYgKHByb3BlcnR5ICE9PSB1bmRlZmluZWQpXG4gICAgICAgIG5hbWVkID0gZ2V0QXRvbSQkMSh0aGluZywgcHJvcGVydHkpO1xuICAgIGVsc2UgaWYgKGlzT2JzZXJ2YWJsZU9iamVjdCQkMSh0aGluZykgfHwgaXNPYnNlcnZhYmxlTWFwJCQxKHRoaW5nKSB8fCBpc09ic2VydmFibGVTZXQkJDEodGhpbmcpKVxuICAgICAgICBuYW1lZCA9IGdldEFkbWluaXN0cmF0aW9uJCQxKHRoaW5nKTtcbiAgICBlbHNlXG4gICAgICAgIG5hbWVkID0gZ2V0QXRvbSQkMSh0aGluZyk7IC8vIHZhbGlkIGZvciBhcnJheXMgYXMgd2VsbFxuICAgIHJldHVybiBuYW1lZC5uYW1lO1xufVxuXG52YXIgdG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xuZnVuY3Rpb24gZGVlcEVxdWFsJCQxKGEsIGIpIHtcbiAgICByZXR1cm4gZXEoYSwgYik7XG59XG4vLyBDb3BpZWQgZnJvbSBodHRwczovL2dpdGh1Yi5jb20vamFzaGtlbmFzL3VuZGVyc2NvcmUvYmxvYi81YzIzN2E3YzY4MmZiNjhmZDUzNzgyMDNmMGJmMjJkY2UxNjI0ODU0L3VuZGVyc2NvcmUuanMjTDExODYtTDEyODlcbi8vIEludGVybmFsIHJlY3Vyc2l2ZSBjb21wYXJpc29uIGZ1bmN0aW9uIGZvciBgaXNFcXVhbGAuXG5mdW5jdGlvbiBlcShhLCBiLCBhU3RhY2ssIGJTdGFjaykge1xuICAgIC8vIElkZW50aWNhbCBvYmplY3RzIGFyZSBlcXVhbC4gYDAgPT09IC0wYCwgYnV0IHRoZXkgYXJlbid0IGlkZW50aWNhbC5cbiAgICAvLyBTZWUgdGhlIFtIYXJtb255IGBlZ2FsYCBwcm9wb3NhbF0oaHR0cDovL3dpa2kuZWNtYXNjcmlwdC5vcmcvZG9rdS5waHA/aWQ9aGFybW9ueTplZ2FsKS5cbiAgICBpZiAoYSA9PT0gYilcbiAgICAgICAgcmV0dXJuIGEgIT09IDAgfHwgMSAvIGEgPT09IDEgLyBiO1xuICAgIC8vIGBudWxsYCBvciBgdW5kZWZpbmVkYCBvbmx5IGVxdWFsIHRvIGl0c2VsZiAoc3RyaWN0IGNvbXBhcmlzb24pLlxuICAgIGlmIChhID09IG51bGwgfHwgYiA9PSBudWxsKVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgLy8gYE5hTmBzIGFyZSBlcXVpdmFsZW50LCBidXQgbm9uLXJlZmxleGl2ZS5cbiAgICBpZiAoYSAhPT0gYSlcbiAgICAgICAgcmV0dXJuIGIgIT09IGI7XG4gICAgLy8gRXhoYXVzdCBwcmltaXRpdmUgY2hlY2tzXG4gICAgdmFyIHR5cGUgPSB0eXBlb2YgYTtcbiAgICBpZiAodHlwZSAhPT0gXCJmdW5jdGlvblwiICYmIHR5cGUgIT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIGIgIT0gXCJvYmplY3RcIilcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIHJldHVybiBkZWVwRXEoYSwgYiwgYVN0YWNrLCBiU3RhY2spO1xufVxuLy8gSW50ZXJuYWwgcmVjdXJzaXZlIGNvbXBhcmlzb24gZnVuY3Rpb24gZm9yIGBpc0VxdWFsYC5cbmZ1bmN0aW9uIGRlZXBFcShhLCBiLCBhU3RhY2ssIGJTdGFjaykge1xuICAgIC8vIFVud3JhcCBhbnkgd3JhcHBlZCBvYmplY3RzLlxuICAgIGEgPSB1bndyYXAoYSk7XG4gICAgYiA9IHVud3JhcChiKTtcbiAgICAvLyBDb21wYXJlIGBbW0NsYXNzXV1gIG5hbWVzLlxuICAgIHZhciBjbGFzc05hbWUgPSB0b1N0cmluZy5jYWxsKGEpO1xuICAgIGlmIChjbGFzc05hbWUgIT09IHRvU3RyaW5nLmNhbGwoYikpXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICBzd2l0Y2ggKGNsYXNzTmFtZSkge1xuICAgICAgICAvLyBTdHJpbmdzLCBudW1iZXJzLCByZWd1bGFyIGV4cHJlc3Npb25zLCBkYXRlcywgYW5kIGJvb2xlYW5zIGFyZSBjb21wYXJlZCBieSB2YWx1ZS5cbiAgICAgICAgY2FzZSBcIltvYmplY3QgUmVnRXhwXVwiOlxuICAgICAgICAvLyBSZWdFeHBzIGFyZSBjb2VyY2VkIHRvIHN0cmluZ3MgZm9yIGNvbXBhcmlzb24gKE5vdGU6ICcnICsgL2EvaSA9PT0gJy9hL2knKVxuICAgICAgICBjYXNlIFwiW29iamVjdCBTdHJpbmddXCI6XG4gICAgICAgICAgICAvLyBQcmltaXRpdmVzIGFuZCB0aGVpciBjb3JyZXNwb25kaW5nIG9iamVjdCB3cmFwcGVycyBhcmUgZXF1aXZhbGVudDsgdGh1cywgYFwiNVwiYCBpc1xuICAgICAgICAgICAgLy8gZXF1aXZhbGVudCB0byBgbmV3IFN0cmluZyhcIjVcIilgLlxuICAgICAgICAgICAgcmV0dXJuIFwiXCIgKyBhID09PSBcIlwiICsgYjtcbiAgICAgICAgY2FzZSBcIltvYmplY3QgTnVtYmVyXVwiOlxuICAgICAgICAgICAgLy8gYE5hTmBzIGFyZSBlcXVpdmFsZW50LCBidXQgbm9uLXJlZmxleGl2ZS5cbiAgICAgICAgICAgIC8vIE9iamVjdChOYU4pIGlzIGVxdWl2YWxlbnQgdG8gTmFOLlxuICAgICAgICAgICAgaWYgKCthICE9PSArYSlcbiAgICAgICAgICAgICAgICByZXR1cm4gK2IgIT09ICtiO1xuICAgICAgICAgICAgLy8gQW4gYGVnYWxgIGNvbXBhcmlzb24gaXMgcGVyZm9ybWVkIGZvciBvdGhlciBudW1lcmljIHZhbHVlcy5cbiAgICAgICAgICAgIHJldHVybiArYSA9PT0gMCA/IDEgLyArYSA9PT0gMSAvIGIgOiArYSA9PT0gK2I7XG4gICAgICAgIGNhc2UgXCJbb2JqZWN0IERhdGVdXCI6XG4gICAgICAgIGNhc2UgXCJbb2JqZWN0IEJvb2xlYW5dXCI6XG4gICAgICAgICAgICAvLyBDb2VyY2UgZGF0ZXMgYW5kIGJvb2xlYW5zIHRvIG51bWVyaWMgcHJpbWl0aXZlIHZhbHVlcy4gRGF0ZXMgYXJlIGNvbXBhcmVkIGJ5IHRoZWlyXG4gICAgICAgICAgICAvLyBtaWxsaXNlY29uZCByZXByZXNlbnRhdGlvbnMuIE5vdGUgdGhhdCBpbnZhbGlkIGRhdGVzIHdpdGggbWlsbGlzZWNvbmQgcmVwcmVzZW50YXRpb25zXG4gICAgICAgICAgICAvLyBvZiBgTmFOYCBhcmUgbm90IGVxdWl2YWxlbnQuXG4gICAgICAgICAgICByZXR1cm4gK2EgPT09ICtiO1xuICAgICAgICBjYXNlIFwiW29iamVjdCBTeW1ib2xdXCI6XG4gICAgICAgICAgICByZXR1cm4gKHR5cGVvZiBTeW1ib2wgIT09IFwidW5kZWZpbmVkXCIgJiYgU3ltYm9sLnZhbHVlT2YuY2FsbChhKSA9PT0gU3ltYm9sLnZhbHVlT2YuY2FsbChiKSk7XG4gICAgfVxuICAgIHZhciBhcmVBcnJheXMgPSBjbGFzc05hbWUgPT09IFwiW29iamVjdCBBcnJheV1cIjtcbiAgICBpZiAoIWFyZUFycmF5cykge1xuICAgICAgICBpZiAodHlwZW9mIGEgIT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgYiAhPSBcIm9iamVjdFwiKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAvLyBPYmplY3RzIHdpdGggZGlmZmVyZW50IGNvbnN0cnVjdG9ycyBhcmUgbm90IGVxdWl2YWxlbnQsIGJ1dCBgT2JqZWN0YHMgb3IgYEFycmF5YHNcbiAgICAgICAgLy8gZnJvbSBkaWZmZXJlbnQgZnJhbWVzIGFyZS5cbiAgICAgICAgdmFyIGFDdG9yID0gYS5jb25zdHJ1Y3RvciwgYkN0b3IgPSBiLmNvbnN0cnVjdG9yO1xuICAgICAgICBpZiAoYUN0b3IgIT09IGJDdG9yICYmXG4gICAgICAgICAgICAhKHR5cGVvZiBhQ3RvciA9PT0gXCJmdW5jdGlvblwiICYmXG4gICAgICAgICAgICAgICAgYUN0b3IgaW5zdGFuY2VvZiBhQ3RvciAmJlxuICAgICAgICAgICAgICAgIHR5cGVvZiBiQ3RvciA9PT0gXCJmdW5jdGlvblwiICYmXG4gICAgICAgICAgICAgICAgYkN0b3IgaW5zdGFuY2VvZiBiQ3RvcikgJiZcbiAgICAgICAgICAgIChcImNvbnN0cnVjdG9yXCIgaW4gYSAmJiBcImNvbnN0cnVjdG9yXCIgaW4gYikpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyBBc3N1bWUgZXF1YWxpdHkgZm9yIGN5Y2xpYyBzdHJ1Y3R1cmVzLiBUaGUgYWxnb3JpdGhtIGZvciBkZXRlY3RpbmcgY3ljbGljXG4gICAgLy8gc3RydWN0dXJlcyBpcyBhZGFwdGVkIGZyb20gRVMgNS4xIHNlY3Rpb24gMTUuMTIuMywgYWJzdHJhY3Qgb3BlcmF0aW9uIGBKT2AuXG4gICAgLy8gSW5pdGlhbGl6aW5nIHN0YWNrIG9mIHRyYXZlcnNlZCBvYmplY3RzLlxuICAgIC8vIEl0J3MgZG9uZSBoZXJlIHNpbmNlIHdlIG9ubHkgbmVlZCB0aGVtIGZvciBvYmplY3RzIGFuZCBhcnJheXMgY29tcGFyaXNvbi5cbiAgICBhU3RhY2sgPSBhU3RhY2sgfHwgW107XG4gICAgYlN0YWNrID0gYlN0YWNrIHx8IFtdO1xuICAgIHZhciBsZW5ndGggPSBhU3RhY2subGVuZ3RoO1xuICAgIHdoaWxlIChsZW5ndGgtLSkge1xuICAgICAgICAvLyBMaW5lYXIgc2VhcmNoLiBQZXJmb3JtYW5jZSBpcyBpbnZlcnNlbHkgcHJvcG9ydGlvbmFsIHRvIHRoZSBudW1iZXIgb2ZcbiAgICAgICAgLy8gdW5pcXVlIG5lc3RlZCBzdHJ1Y3R1cmVzLlxuICAgICAgICBpZiAoYVN0YWNrW2xlbmd0aF0gPT09IGEpXG4gICAgICAgICAgICByZXR1cm4gYlN0YWNrW2xlbmd0aF0gPT09IGI7XG4gICAgfVxuICAgIC8vIEFkZCB0aGUgZmlyc3Qgb2JqZWN0IHRvIHRoZSBzdGFjayBvZiB0cmF2ZXJzZWQgb2JqZWN0cy5cbiAgICBhU3RhY2sucHVzaChhKTtcbiAgICBiU3RhY2sucHVzaChiKTtcbiAgICAvLyBSZWN1cnNpdmVseSBjb21wYXJlIG9iamVjdHMgYW5kIGFycmF5cy5cbiAgICBpZiAoYXJlQXJyYXlzKSB7XG4gICAgICAgIC8vIENvbXBhcmUgYXJyYXkgbGVuZ3RocyB0byBkZXRlcm1pbmUgaWYgYSBkZWVwIGNvbXBhcmlzb24gaXMgbmVjZXNzYXJ5LlxuICAgICAgICBsZW5ndGggPSBhLmxlbmd0aDtcbiAgICAgICAgaWYgKGxlbmd0aCAhPT0gYi5sZW5ndGgpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIC8vIERlZXAgY29tcGFyZSB0aGUgY29udGVudHMsIGlnbm9yaW5nIG5vbi1udW1lcmljIHByb3BlcnRpZXMuXG4gICAgICAgIHdoaWxlIChsZW5ndGgtLSkge1xuICAgICAgICAgICAgaWYgKCFlcShhW2xlbmd0aF0sIGJbbGVuZ3RoXSwgYVN0YWNrLCBiU3RhY2spKVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgLy8gRGVlcCBjb21wYXJlIG9iamVjdHMuXG4gICAgICAgIHZhciBrZXlzJCQxID0gT2JqZWN0LmtleXMoYSk7XG4gICAgICAgIHZhciBrZXkgPSB2b2lkIDA7XG4gICAgICAgIGxlbmd0aCA9IGtleXMkJDEubGVuZ3RoO1xuICAgICAgICAvLyBFbnN1cmUgdGhhdCBib3RoIG9iamVjdHMgY29udGFpbiB0aGUgc2FtZSBudW1iZXIgb2YgcHJvcGVydGllcyBiZWZvcmUgY29tcGFyaW5nIGRlZXAgZXF1YWxpdHkuXG4gICAgICAgIGlmIChPYmplY3Qua2V5cyhiKS5sZW5ndGggIT09IGxlbmd0aClcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgd2hpbGUgKGxlbmd0aC0tKSB7XG4gICAgICAgICAgICAvLyBEZWVwIGNvbXBhcmUgZWFjaCBtZW1iZXJcbiAgICAgICAgICAgIGtleSA9IGtleXMkJDFbbGVuZ3RoXTtcbiAgICAgICAgICAgIGlmICghKGhhcyQxKGIsIGtleSkgJiYgZXEoYVtrZXldLCBiW2tleV0sIGFTdGFjaywgYlN0YWNrKSkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vIFJlbW92ZSB0aGUgZmlyc3Qgb2JqZWN0IGZyb20gdGhlIHN0YWNrIG9mIHRyYXZlcnNlZCBvYmplY3RzLlxuICAgIGFTdGFjay5wb3AoKTtcbiAgICBiU3RhY2sucG9wKCk7XG4gICAgcmV0dXJuIHRydWU7XG59XG5mdW5jdGlvbiB1bndyYXAoYSkge1xuICAgIGlmIChpc09ic2VydmFibGVBcnJheSQkMShhKSlcbiAgICAgICAgcmV0dXJuIGEuc2xpY2UoKTtcbiAgICBpZiAoaXNFUzZNYXAkJDEoYSkgfHwgaXNPYnNlcnZhYmxlTWFwJCQxKGEpKVxuICAgICAgICByZXR1cm4gQXJyYXkuZnJvbShhLmVudHJpZXMoKSk7XG4gICAgaWYgKGlzRVM2U2V0JCQxKGEpIHx8IGlzT2JzZXJ2YWJsZVNldCQkMShhKSlcbiAgICAgICAgcmV0dXJuIEFycmF5LmZyb20oYS5lbnRyaWVzKCkpO1xuICAgIHJldHVybiBhO1xufVxuZnVuY3Rpb24gaGFzJDEoYSwga2V5KSB7XG4gICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChhLCBrZXkpO1xufVxuXG5mdW5jdGlvbiBtYWtlSXRlcmFibGUoaXRlcmF0b3IpIHtcbiAgICBpdGVyYXRvcltTeW1ib2wuaXRlcmF0b3JdID0gc2VsZjtcbiAgICByZXR1cm4gaXRlcmF0b3I7XG59XG5mdW5jdGlvbiBzZWxmKCkge1xuICAgIHJldHVybiB0aGlzO1xufVxuXG4vKlxuVGhlIG9ubHkgcmVhc29uIGZvciB0aGlzIGZpbGUgdG8gZXhpc3QgaXMgcHVyZSBob3Jyb3I6XG5XaXRob3V0IGl0IHJvbGx1cCBjYW4gbWFrZSB0aGUgYnVuZGxpbmcgZmFpbCBhdCBhbnkgcG9pbnQgaW4gdGltZTsgd2hlbiBpdCByb2xscyB1cCB0aGUgZmlsZXMgaW4gdGhlIHdyb25nIG9yZGVyXG5pdCB3aWxsIGNhdXNlIHVuZGVmaW5lZCBlcnJvcnMgKGZvciBleGFtcGxlIGJlY2F1c2Ugc3VwZXIgY2xhc3NlcyBvciBsb2NhbCB2YXJpYWJsZXMgbm90IGJlaW5nIGhvc3RlZCkuXG5XaXRoIHRoaXMgZmlsZSB0aGF0IHdpbGwgc3RpbGwgaGFwcGVuLFxuYnV0IGF0IGxlYXN0IGluIHRoaXMgZmlsZSB3ZSBjYW4gbWFnaWNhbGx5IHJlb3JkZXIgdGhlIGltcG9ydHMgd2l0aCB0cmlhbCBhbmQgZXJyb3IgdW50aWwgdGhlIGJ1aWxkIHN1Y2NlZWRzIGFnYWluLlxuKi9cblxuLyoqXG4gKiAoYykgTWljaGVsIFdlc3RzdHJhdGUgMjAxNSAtIDIwMThcbiAqIE1JVCBMaWNlbnNlZFxuICpcbiAqIFdlbGNvbWUgdG8gdGhlIG1vYnggc291cmNlcyEgVG8gZ2V0IGFuIGdsb2JhbCBvdmVydmlldyBvZiBob3cgTW9iWCBpbnRlcm5hbGx5IHdvcmtzLFxuICogdGhpcyBpcyBhIGdvb2QgcGxhY2UgdG8gc3RhcnQ6XG4gKiBodHRwczovL21lZGl1bS5jb20vQG13ZXN0c3RyYXRlL2JlY29taW5nLWZ1bGx5LXJlYWN0aXZlLWFuLWluLWRlcHRoLWV4cGxhbmF0aW9uLW9mLW1vYnNlcnZhYmxlLTU1OTk1MjYyYTI1NCMueHZiaDZxZDc0XG4gKlxuICogU291cmNlIGZvbGRlcnM6XG4gKiA9PT09PT09PT09PT09PT1cbiAqXG4gKiAtIGFwaS8gICAgIE1vc3Qgb2YgdGhlIHB1YmxpYyBzdGF0aWMgbWV0aG9kcyBleHBvc2VkIGJ5IHRoZSBtb2R1bGUgY2FuIGJlIGZvdW5kIGhlcmUuXG4gKiAtIGNvcmUvICAgIEltcGxlbWVudGF0aW9uIG9mIHRoZSBNb2JYIGFsZ29yaXRobTsgYXRvbXMsIGRlcml2YXRpb25zLCByZWFjdGlvbnMsIGRlcGVuZGVuY3kgdHJlZXMsIG9wdGltaXphdGlvbnMuIENvb2wgc3R1ZmYgY2FuIGJlIGZvdW5kIGhlcmUuXG4gKiAtIHR5cGVzLyAgIEFsbCB0aGUgbWFnaWMgdGhhdCBpcyBuZWVkIHRvIGhhdmUgb2JzZXJ2YWJsZSBvYmplY3RzLCBhcnJheXMgYW5kIHZhbHVlcyBpcyBpbiB0aGlzIGZvbGRlci4gSW5jbHVkaW5nIHRoZSBtb2RpZmllcnMgbGlrZSBgYXNGbGF0YC5cbiAqIC0gdXRpbHMvICAgVXRpbGl0eSBzdHVmZi5cbiAqXG4gKi9cbmlmICh0eXBlb2YgUHJveHkgPT09IFwidW5kZWZpbmVkXCIgfHwgdHlwZW9mIFN5bWJvbCA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHRocm93IG5ldyBFcnJvcihcIlttb2J4XSBNb2JYIDUrIHJlcXVpcmVzIFByb3h5IGFuZCBTeW1ib2wgb2JqZWN0cy4gSWYgeW91ciBlbnZpcm9ubWVudCBkb2Vzbid0IHN1cHBvcnQgU3ltYm9sIG9yIFByb3h5IG9iamVjdHMsIHBsZWFzZSBkb3duZ3JhZGUgdG8gTW9iWCA0LiBGb3IgUmVhY3QgTmF0aXZlIEFuZHJvaWQsIGNvbnNpZGVyIHVwZ3JhZGluZyBKU0NvcmUuXCIpO1xufVxudHJ5IHtcbiAgICAvLyBkZWZpbmUgcHJvY2Vzcy5lbnYgaWYgbmVlZGVkXG4gICAgLy8gaWYgdGhpcyBpcyBub3QgYSBwcm9kdWN0aW9uIGJ1aWxkIGluIHRoZSBmaXJzdCBwbGFjZVxuICAgIC8vIChpbiB3aGljaCBjYXNlIHRoZSBleHByZXNzaW9uIGJlbG93IHdvdWxkIGJlIHN1YnN0aXR1dGVkIHdpdGggJ3Byb2R1Y3Rpb24nKVxuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WO1xufVxuY2F0Y2ggKGUpIHtcbiAgICB2YXIgZyA9IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiBnbG9iYWw7XG4gICAgaWYgKHR5cGVvZiBwcm9jZXNzID09PSBcInVuZGVmaW5lZFwiKVxuICAgICAgICBnLnByb2Nlc3MgPSB7fTtcbiAgICBnLnByb2Nlc3MuZW52ID0ge307XG59XG5cbihmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gdGVzdENvZGVNaW5pZmljYXRpb24oKSB7IH1cbiAgICBpZiAodGVzdENvZGVNaW5pZmljYXRpb24ubmFtZSAhPT0gXCJ0ZXN0Q29kZU1pbmlmaWNhdGlvblwiICYmXG4gICAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiAmJlxuICAgICAgICBwcm9jZXNzLmVudi5JR05PUkVfTU9CWF9NSU5JRllfV0FSTklORyAhPT0gXCJ0cnVlXCIpIHtcbiAgICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAvLyBUZW1wbGF0ZSBsaXRlcmFsKGJhY2t0aWNrKSBpcyB1c2VkIGZvciBmaXggaXNzdWUgd2l0aCByb2xsdXAtcGx1Z2luLWNvbW1vbmpzIGh0dHBzOi8vZ2l0aHViLmNvbS9yb2xsdXAvcm9sbHVwLXBsdWdpbi1jb21tb25qcy9pc3N1ZXMvMzQ0XG4gICAgICAgIFwiW21vYnhdIHlvdSBhcmUgcnVubmluZyBhIG1pbmlmaWVkIGJ1aWxkLCBidXQgJ3Byb2Nlc3MuZW52Lk5PREVfRU5WJyB3YXMgbm90IHNldCB0byAncHJvZHVjdGlvbicgaW4geW91ciBidW5kbGVyLiBUaGlzIHJlc3VsdHMgaW4gYW4gdW5uZWNlc3NhcmlseSBsYXJnZSBhbmQgc2xvdyBidW5kbGVcIik7XG4gICAgfVxufSkoKTtcbi8vIERldnRvb2xzIHN1cHBvcnRcbmlmICh0eXBlb2YgX19NT0JYX0RFVlRPT0xTX0dMT0JBTF9IT09LX18gPT09IFwib2JqZWN0XCIpIHtcbiAgICAvLyBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9hbmR5a29nL21vYngtZGV2dG9vbHMvXG4gICAgX19NT0JYX0RFVlRPT0xTX0dMT0JBTF9IT09LX18uaW5qZWN0TW9ieCh7XG4gICAgICAgIHNweTogc3B5JCQxLFxuICAgICAgICBleHRyYXM6IHtcbiAgICAgICAgICAgIGdldERlYnVnTmFtZTogZ2V0RGVidWdOYW1lJCQxXG4gICAgICAgIH0sXG4gICAgICAgICRtb2J4OiAkbW9ieCQkMVxuICAgIH0pO1xufVxuXG5leHBvcnQgeyBSZWFjdGlvbiQkMSBhcyBSZWFjdGlvbiwgdW50cmFja2VkJCQxIGFzIHVudHJhY2tlZCwgSURlcml2YXRpb25TdGF0ZSwgY3JlYXRlQXRvbSQkMSBhcyBjcmVhdGVBdG9tLCBzcHkkJDEgYXMgc3B5LCBjb21wYXJlciQkMSBhcyBjb21wYXJlciwgaXNPYnNlcnZhYmxlT2JqZWN0JCQxIGFzIGlzT2JzZXJ2YWJsZU9iamVjdCwgaXNPYnNlcnZhYmxlVmFsdWUkJDEgYXMgaXNCb3hlZE9ic2VydmFibGUsIGlzT2JzZXJ2YWJsZUFycmF5JCQxIGFzIGlzT2JzZXJ2YWJsZUFycmF5LCBPYnNlcnZhYmxlTWFwJCQxIGFzIE9ic2VydmFibGVNYXAsIGlzT2JzZXJ2YWJsZU1hcCQkMSBhcyBpc09ic2VydmFibGVNYXAsIE9ic2VydmFibGVTZXQkJDEgYXMgT2JzZXJ2YWJsZVNldCwgaXNPYnNlcnZhYmxlU2V0JCQxIGFzIGlzT2JzZXJ2YWJsZVNldCwgdHJhbnNhY3Rpb24kJDEgYXMgdHJhbnNhY3Rpb24sIG9ic2VydmFibGUkJDEgYXMgb2JzZXJ2YWJsZSwgY29tcHV0ZWQkJDEgYXMgY29tcHV0ZWQsIGlzT2JzZXJ2YWJsZSQkMSBhcyBpc09ic2VydmFibGUsIGlzT2JzZXJ2YWJsZVByb3AkJDEgYXMgaXNPYnNlcnZhYmxlUHJvcCwgaXNDb21wdXRlZCQkMSBhcyBpc0NvbXB1dGVkLCBpc0NvbXB1dGVkUHJvcCQkMSBhcyBpc0NvbXB1dGVkUHJvcCwgZXh0ZW5kT2JzZXJ2YWJsZSQkMSBhcyBleHRlbmRPYnNlcnZhYmxlLCBvYnNlcnZlJCQxIGFzIG9ic2VydmUsIGludGVyY2VwdCQkMSBhcyBpbnRlcmNlcHQsIGF1dG9ydW4kJDEgYXMgYXV0b3J1biwgcmVhY3Rpb24kJDEgYXMgcmVhY3Rpb24sIHdoZW4kJDEgYXMgd2hlbiwgYWN0aW9uJCQxIGFzIGFjdGlvbiwgaXNBY3Rpb24kJDEgYXMgaXNBY3Rpb24sIHJ1bkluQWN0aW9uJCQxIGFzIHJ1bkluQWN0aW9uLCBrZXlzJCQxIGFzIGtleXMsIHZhbHVlcyQkMSBhcyB2YWx1ZXMsIGVudHJpZXMkJDEgYXMgZW50cmllcywgc2V0JCQxIGFzIHNldCwgcmVtb3ZlJCQxIGFzIHJlbW92ZSwgaGFzJCQxIGFzIGhhcywgZ2V0JCQxIGFzIGdldCwgZGVjb3JhdGUkJDEgYXMgZGVjb3JhdGUsIGNvbmZpZ3VyZSQkMSBhcyBjb25maWd1cmUsIG9uQmVjb21lT2JzZXJ2ZWQkJDEgYXMgb25CZWNvbWVPYnNlcnZlZCwgb25CZWNvbWVVbm9ic2VydmVkJCQxIGFzIG9uQmVjb21lVW5vYnNlcnZlZCwgZmxvdyQkMSBhcyBmbG93LCB0b0pTJCQxIGFzIHRvSlMsIHRyYWNlJCQxIGFzIHRyYWNlLCBnZXREZXBlbmRlbmN5VHJlZSQkMSBhcyBnZXREZXBlbmRlbmN5VHJlZSwgZ2V0T2JzZXJ2ZXJUcmVlJCQxIGFzIGdldE9ic2VydmVyVHJlZSwgcmVzZXRHbG9iYWxTdGF0ZSQkMSBhcyBfcmVzZXRHbG9iYWxTdGF0ZSwgZ2V0R2xvYmFsU3RhdGUkJDEgYXMgX2dldEdsb2JhbFN0YXRlLCBnZXREZWJ1Z05hbWUkJDEgYXMgZ2V0RGVidWdOYW1lLCBnZXRBdG9tJCQxIGFzIGdldEF0b20sIGdldEFkbWluaXN0cmF0aW9uJCQxIGFzIF9nZXRBZG1pbmlzdHJhdGlvbiwgYWxsb3dTdGF0ZUNoYW5nZXMkJDEgYXMgX2FsbG93U3RhdGVDaGFuZ2VzLCBhbGxvd1N0YXRlQ2hhbmdlc0luc2lkZUNvbXB1dGVkJCQxIGFzIF9hbGxvd1N0YXRlQ2hhbmdlc0luc2lkZUNvbXB1dGVkLCBpc0FycmF5TGlrZSQkMSBhcyBpc0FycmF5TGlrZSwgJG1vYngkJDEgYXMgJG1vYngsIGlzQ29tcHV0aW5nRGVyaXZhdGlvbiQkMSBhcyBfaXNDb21wdXRpbmdEZXJpdmF0aW9uLCBvblJlYWN0aW9uRXJyb3IkJDEgYXMgb25SZWFjdGlvbkVycm9yLCBpbnRlcmNlcHRSZWFkcyQkMSBhcyBfaW50ZXJjZXB0UmVhZHMgfTtcbiIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG4vLyBjYWNoZWQgZnJvbSB3aGF0ZXZlciBnbG9iYWwgaXMgcHJlc2VudCBzbyB0aGF0IHRlc3QgcnVubmVycyB0aGF0IHN0dWIgaXRcbi8vIGRvbid0IGJyZWFrIHRoaW5ncy4gIEJ1dCB3ZSBuZWVkIHRvIHdyYXAgaXQgaW4gYSB0cnkgY2F0Y2ggaW4gY2FzZSBpdCBpc1xuLy8gd3JhcHBlZCBpbiBzdHJpY3QgbW9kZSBjb2RlIHdoaWNoIGRvZXNuJ3QgZGVmaW5lIGFueSBnbG9iYWxzLiAgSXQncyBpbnNpZGUgYVxuLy8gZnVuY3Rpb24gYmVjYXVzZSB0cnkvY2F0Y2hlcyBkZW9wdGltaXplIGluIGNlcnRhaW4gZW5naW5lcy5cblxudmFyIGNhY2hlZFNldFRpbWVvdXQ7XG52YXIgY2FjaGVkQ2xlYXJUaW1lb3V0O1xuXG5mdW5jdGlvbiBkZWZhdWx0U2V0VGltb3V0KCkge1xuICAgIHRocm93IG5ldyBFcnJvcignc2V0VGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuZnVuY3Rpb24gZGVmYXVsdENsZWFyVGltZW91dCAoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdjbGVhclRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbihmdW5jdGlvbiAoKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBzZXRUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBjbGVhclRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgfVxufSAoKSlcbmZ1bmN0aW9uIHJ1blRpbWVvdXQoZnVuKSB7XG4gICAgaWYgKGNhY2hlZFNldFRpbWVvdXQgPT09IHNldFRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIC8vIGlmIHNldFRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRTZXRUaW1lb3V0ID09PSBkZWZhdWx0U2V0VGltb3V0IHx8ICFjYWNoZWRTZXRUaW1lb3V0KSAmJiBzZXRUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfSBjYXRjaChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbChudWxsLCBmdW4sIDApO1xuICAgICAgICB9IGNhdGNoKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3JcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwodGhpcywgZnVuLCAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG59XG5mdW5jdGlvbiBydW5DbGVhclRpbWVvdXQobWFya2VyKSB7XG4gICAgaWYgKGNhY2hlZENsZWFyVGltZW91dCA9PT0gY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIC8vIGlmIGNsZWFyVGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZENsZWFyVGltZW91dCA9PT0gZGVmYXVsdENsZWFyVGltZW91dCB8fCAhY2FjaGVkQ2xlYXJUaW1lb3V0KSAmJiBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0ICB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKG51bGwsIG1hcmtlcik7XG4gICAgICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3IuXG4gICAgICAgICAgICAvLyBTb21lIHZlcnNpb25zIG9mIEkuRS4gaGF2ZSBkaWZmZXJlbnQgcnVsZXMgZm9yIGNsZWFyVGltZW91dCB2cyBzZXRUaW1lb3V0XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwodGhpcywgbWFya2VyKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG5cbn1cbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG52YXIgY3VycmVudFF1ZXVlO1xudmFyIHF1ZXVlSW5kZXggPSAtMTtcblxuZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCkge1xuICAgIGlmICghZHJhaW5pbmcgfHwgIWN1cnJlbnRRdWV1ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgfVxuICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgZHJhaW5RdWV1ZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgICBpZiAoZHJhaW5pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdGltZW91dCA9IHJ1blRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcbiAgICBkcmFpbmluZyA9IHRydWU7XG5cbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIHdoaWxlKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRRdWV1ZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB9XG4gICAgY3VycmVudFF1ZXVlID0gbnVsbDtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIHJ1bkNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cblxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xuICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XG4gICAgICAgIHJ1blRpbWVvdXQoZHJhaW5RdWV1ZSk7XG4gICAgfVxufTtcblxuLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG4gICAgdGhpcy5mdW4gPSBmdW47XG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xufVxuSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xufTtcbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5wcm9jZXNzLnZlcnNpb25zID0ge307XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZE9uY2VMaXN0ZW5lciA9IG5vb3A7XG5cbnByb2Nlc3MubGlzdGVuZXJzID0gZnVuY3Rpb24gKG5hbWUpIHsgcmV0dXJuIFtdIH1cblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XG4iLCJ2YXIgZztcblxuLy8gVGhpcyB3b3JrcyBpbiBub24tc3RyaWN0IG1vZGVcbmcgPSAoZnVuY3Rpb24oKSB7XG5cdHJldHVybiB0aGlzO1xufSkoKTtcblxudHJ5IHtcblx0Ly8gVGhpcyB3b3JrcyBpZiBldmFsIGlzIGFsbG93ZWQgKHNlZSBDU1ApXG5cdGcgPSBnIHx8IG5ldyBGdW5jdGlvbihcInJldHVybiB0aGlzXCIpKCk7XG59IGNhdGNoIChlKSB7XG5cdC8vIFRoaXMgd29ya3MgaWYgdGhlIHdpbmRvdyByZWZlcmVuY2UgaXMgYXZhaWxhYmxlXG5cdGlmICh0eXBlb2Ygd2luZG93ID09PSBcIm9iamVjdFwiKSBnID0gd2luZG93O1xufVxuXG4vLyBnIGNhbiBzdGlsbCBiZSB1bmRlZmluZWQsIGJ1dCBub3RoaW5nIHRvIGRvIGFib3V0IGl0Li4uXG4vLyBXZSByZXR1cm4gdW5kZWZpbmVkLCBpbnN0ZWFkIG9mIG5vdGhpbmcgaGVyZSwgc28gaXQnc1xuLy8gZWFzaWVyIHRvIGhhbmRsZSB0aGlzIGNhc2UuIGlmKCFnbG9iYWwpIHsgLi4ufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGc7XG4iLCJpbXBvcnQgUm9vdFN0b3JlIGZyb20gXCIuLi9zdG9yZVwiO1xyXG5pbXBvcnQgaGlzdG9yeSBmcm9tIFwiLi90YWIvaGlzdG9yeVwiO1xyXG5pbXBvcnQgb25JbnN0YWxsIGZyb20gXCIuL3J1bnRpbWUvb25JbnN0YWxsXCI7XHJcbmltcG9ydCBvbk1lc3NhZ2UgZnJvbSBcIi4vcnVudGltZS9vbk1lc3NhZ2VcIjtcclxuXHJcbmNvbnN0IHN0b3JlID0gbmV3IFJvb3RTdG9yZSh0cnVlLCAoKSA9PiB7XHJcbiAgaGlzdG9yeShzdG9yZS53ZWJ0b29uLCBzdG9yZS5vcHRpb24pO1xyXG4gIG9uTWVzc2FnZShzdG9yZS53ZWJ0b29uLCBzdG9yZS5vcHRpb24pO1xyXG4gIC8vIGNvbnRleHRNZW51KHN0b3JlLndlYnRvb24sIHN0b3JlLm9wdGlvbik7XHJcbn0pO1xyXG5vbkluc3RhbGwoc3RvcmUud2VidG9vbiwgc3RvcmUub3B0aW9uKTtcclxuIiwiaW1wb3J0IExpbmsgZnJvbSBcIi4uL3Rvb2xzL2xpbmtcIjtcclxuXHJcbmV4cG9ydCBjb25zdCBDT05URVhUX01FTlVfSURfU0lERUJBUiA9IFwiT1BFTl9JTl9TSURFQkFSXCI7XHJcbmV4cG9ydCBjb25zdCBDT05URVhUX01FTlVfSURfVEFCID0gXCJPUEVOX0lOX1RBQlwiO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZUNvbnRleHQoY2FsbGJhY2s6ICgpID0+IHZvaWQpIHtcclxuICB3aGFsZS5jb250ZXh0TWVudXMucmVtb3ZlQWxsKGNhbGxiYWNrKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGFkZExpbmtDb250ZXh0KCkge1xyXG4gIHJlbW92ZUNvbnRleHQoKCkgPT4ge1xyXG4gICAgd2hhbGUuY29udGV4dE1lbnVzLmNyZWF0ZSh7XHJcbiAgICAgIGlkOiBDT05URVhUX01FTlVfSURfVEFCLFxyXG4gICAgICBjb250ZXh0czogW1wibGlua1wiXSxcclxuICAgICAgdGl0bGU6IFwi7Yyd7JeF7LC97JeQ7IScIOybue2IsCDrs7TquLBcIixcclxuICAgICAgdGFyZ2V0VXJsUGF0dGVybnM6IFtcclxuICAgICAgICBcImh0dHBzOi8vY29taWMubmF2ZXIuY29tL3dlYnRvb24vbGlzdC5uaG4/dGl0bGVJZCpcIixcclxuICAgICAgICBcImh0dHBzOi8vY29taWMubmF2ZXIuY29tL3dlYnRvb24vZGV0YWlsLm5obj90aXRsZUlkKlwiXHJcbiAgICAgIF1cclxuICAgIH0pO1xyXG4gICAgd2hhbGUuY29udGV4dE1lbnVzLmNyZWF0ZSh7XHJcbiAgICAgIGlkOiBDT05URVhUX01FTlVfSURfU0lERUJBUixcclxuICAgICAgY29udGV4dHM6IFtcImxpbmtcIl0sXHJcbiAgICAgIHRpdGxlOiBcIuyCrOydtOuTnOuwlOyXkOyEnCDsm7ntiLAg67O06riwXCIsXHJcbiAgICAgIHRhcmdldFVybFBhdHRlcm5zOiBbXHJcbiAgICAgICAgXCJodHRwczovL2NvbWljLm5hdmVyLmNvbS93ZWJ0b29uL2xpc3QubmhuP3RpdGxlSWQqXCIsXHJcbiAgICAgICAgXCJodHRwczovL2NvbWljLm5hdmVyLmNvbS93ZWJ0b29uL2RldGFpbC5uaG4/dGl0bGVJZCpcIlxyXG4gICAgICBdXHJcbiAgICB9KTtcclxuICAgIHdoYWxlLmNvbnRleHRNZW51cy5vbkNsaWNrZWQuYWRkTGlzdGVuZXIoaW5mbyA9PiB7XHJcbiAgICAgIGlmIChpbmZvLm1lbnVJdGVtSWQgPT09IENPTlRFWFRfTUVOVV9JRF9TSURFQkFSKSB7XHJcbiAgICAgICAgTGluay5vcGVuU2lkZWJhcihpbmZvLmxpbmtVcmwpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChpbmZvLm1lbnVJdGVtSWQgPT09IENPTlRFWFRfTUVOVV9JRF9UQUIpIHtcclxuICAgICAgICBMaW5rLm9wZW5Qb3B1cChpbmZvLmxpbmtVcmwpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9KTtcclxufVxyXG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbihwcmV2VmVyc2lvbjogc3RyaW5nLCBjdXJWZXJzaW9uOiBzdHJpbmcpIHtcclxuICBpZiAocHJldlZlcnNpb24gPT09IFwiMy4wLjBcIikge1xyXG4gICAgd2hhbGUuc3RvcmFnZS5zeW5jLmdldChzeW5jVmFsdWUgPT4ge1xyXG4gICAgICB3aGFsZS5zdG9yYWdlLmxvY2FsLmdldChsb2NhbFZhbHVlID0+IHtcclxuICAgICAgICBjb25zdCBnZXQgPSAobmFtZTogc3RyaW5nKSA9PiBzeW5jVmFsdWVbbmFtZV0gfHwgbG9jYWxWYWx1ZVtuYW1lXTtcclxuICAgICAgICBjb25zdCBvbGRPcHRpb24gPSBzeW5jVmFsdWUub3B0aW9uO1xyXG4gICAgICAgIGNvbnN0IG9sZEZhdm9yYXRlID0gZ2V0KFwiZmF2b3JhdGVcIik7XHJcbiAgICAgICAgY29uc3Qgb2xkSW1nbG9nID0gZ2V0KFwiaW1nbG9nXCIpO1xyXG4gICAgICAgIGNvbnN0IG9sZFdlYnRvb24gPSBnZXQoXCJ3ZWJ0b29uXCIpO1xyXG4gICAgICAgIGNvbnN0IG9sZFZpc2l0cyA9IGdldChcInZpc2l0c1wiKTtcclxuICAgICAgICBjb25zdCBvbGRTY3JvbGwgPSBnZXQoXCJzY3JvbGxzXCIpO1xyXG4gICAgICAgIGxldCBuZXdPcHRpb24gPSB7fSxcclxuICAgICAgICAgIG5ld0Zhdm9yYXRlID0gW10sXHJcbiAgICAgICAgICBuZXdJbWdsb2cgPSB7fSxcclxuICAgICAgICAgIG5ld1dlYnRvb24gPSB7fSxcclxuICAgICAgICAgIG5ld1Zpc2l0cyA9IHt9LFxyXG4gICAgICAgICAgbmV3U2Nyb2xsID0ge307XHJcbiAgICAgICAgaWYgKG9sZE9wdGlvbikge1xyXG4gICAgICAgICAgbmV3T3B0aW9uID0ge1xyXG4gICAgICAgICAgICBfc3RvcmVMb2NhdGlvbjogXCJsb2NhbFwiLFxyXG4gICAgICAgICAgICBfb3JkZXJCeTogW1wiVmlld0NvdW50XCIsIFwiVXBkYXRlXCIsIFwiU3RhclNjb3JlXCIsIFwiVGl0bGVOYW1lXCJdW29sZE9wdGlvbi5zb3J0XSxcclxuICAgICAgICAgICAgX3Nob3dIaXN0b3J5OiBvbGRPcHRpb24uc2hvd0hpc3RyeSxcclxuICAgICAgICAgICAgX2hpc3RvcnlNYXg6IG9sZE9wdGlvbi5oaXN0b3J5Q291bnQsXHJcbiAgICAgICAgICAgIF9zYXZlV2VidG9vblNvcnQ6IG9sZE9wdGlvbi5zYXZlV3NvcnQsXHJcbiAgICAgICAgICAgIF9zYXZlU2Nyb2xsOiBvbGRPcHRpb24uc2F2ZVNjcm9sbCxcclxuICAgICAgICAgICAgX2hpZGRlbkNvbW1lbnQ6IG9sZE9wdGlvbi5oaWRkZW5Db21tZW50LFxyXG4gICAgICAgICAgICBfYXV0b05leHQ6IG9sZE9wdGlvbi5hdXRvTmV4dCxcclxuICAgICAgICAgICAgX3VzZUltZ0xvZzogb2xkT3B0aW9uLnVzZWltZ2xvZyxcclxuICAgICAgICAgICAgX3NhdmVGYXZvcmF0ZTogb2xkT3B0aW9uLnVzZUZhdm9yYXRlLFxyXG4gICAgICAgICAgICBfbGlua1RhcmdldDogb2xkT3B0aW9uLmxpbmt0YWJcclxuICAgICAgICAgICAgICA/IFwiVGFiXCJcclxuICAgICAgICAgICAgICA6IG9sZE9wdGlvbi5saW5rUG9wdXBcclxuICAgICAgICAgICAgICA/IFwiUG9wdXBcIlxyXG4gICAgICAgICAgICAgIDogb2xkT3B0aW9uLmxpbmtTaWRlXHJcbiAgICAgICAgICAgICAgPyBcIlNpZGViYXJcIlxyXG4gICAgICAgICAgICAgIDogXCJDdXJyZW50XCIsXHJcbiAgICAgICAgICAgIF9zY3JvbGxBbGVydDogdHJ1ZSxcclxuICAgICAgICAgICAgX3VzZUNvbnRleHRNZW51OiBmYWxzZVxyXG4gICAgICAgICAgfTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgbmV3T3B0aW9uID0ge1xyXG4gICAgICAgICAgICBfc3RvcmVMb2NhdGlvbjogXCJsb2NhbFwiLFxyXG4gICAgICAgICAgICBfb3JkZXJCeTogXCJWaWV3Q291bnRcIixcclxuICAgICAgICAgICAgX3Nob3dIaXN0b3J5OiB0cnVlLFxyXG4gICAgICAgICAgICBfaGlzdG9yeU1heDogMTAwMCxcclxuICAgICAgICAgICAgX3NhdmVXZWJ0b29uU29ydDogdHJ1ZSxcclxuICAgICAgICAgICAgX3NhdmVTY3JvbGw6IHRydWUsXHJcbiAgICAgICAgICAgIF9oaWRkZW5Db21tZW50OiBmYWxzZSxcclxuICAgICAgICAgICAgX2F1dG9OZXh0OiB0cnVlLFxyXG4gICAgICAgICAgICBfdXNlSW1nTG9nOiB0cnVlLFxyXG4gICAgICAgICAgICBfc2F2ZUZhdm9yYXRlOiB0cnVlLFxyXG4gICAgICAgICAgICBfbGlua1RhcmdldDogXCJTaWRlYmFyXCIsXHJcbiAgICAgICAgICAgIF9zY3JvbGxBbGVydDogdHJ1ZSxcclxuICAgICAgICAgICAgX3VzZUNvbnRleHRNZW51OiBmYWxzZVxyXG4gICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG9sZFdlYnRvb24pIHtcclxuICAgICAgICAgIE9iamVjdC5rZXlzKG9sZFdlYnRvb24pLmZvckVhY2goa2V5ID0+IHtcclxuICAgICAgICAgICAgbmV3V2VidG9vbltrZXldID0ge1xyXG4gICAgICAgICAgICAgIHRpdGxlOiBvbGRXZWJ0b29uW2tleV0ubmEsXHJcbiAgICAgICAgICAgICAgdHlwZTogb2xkV2VidG9vbltrZXldLnRcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgaWYgKG9sZEZhdm9yYXRlKSB7XHJcbiAgICAgICAgICAgIG9sZEZhdm9yYXRlLmZvckVhY2goa2V5ID0+IHtcclxuICAgICAgICAgICAgICBPYmplY3Qua2V5cyhuZXdXZWJ0b29uKS5mb3JFYWNoKGtleTIgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKG5ld1dlYnRvb25ba2V5Ml0udGl0bGUgPT0ga2V5KSBuZXdGYXZvcmF0ZS5wdXNoKGtleTIpO1xyXG4gICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG9sZFZpc2l0cykgbmV3VmlzaXRzID0gb2xkVmlzaXRzO1xyXG4gICAgICAgIGlmIChvbGRJbWdsb2cpIG5ld0ltZ2xvZyA9IG9sZEltZ2xvZztcclxuICAgICAgICBpZiAob2xkU2Nyb2xsKSBuZXdTY3JvbGwgPSBvbGRTY3JvbGw7XHJcblxyXG4gICAgICAgIHdoYWxlLnN0b3JhZ2UubG9jYWwuc2V0KFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBpbWdsb2c6IEpTT04uc3RyaW5naWZ5KG5ld0ltZ2xvZyksXHJcbiAgICAgICAgICAgIHNjcm9sbHM6IEpTT04uc3RyaW5naWZ5KG5ld1Njcm9sbCksXHJcbiAgICAgICAgICAgIHZpc2l0czogSlNPTi5zdHJpbmdpZnkobmV3VmlzaXRzKSxcclxuICAgICAgICAgICAgd2VidG9vbjogSlNPTi5zdHJpbmdpZnkobmV3V2VidG9vbilcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTWlncmF0aW9uIExvY2FsIFN1Y2Nlc3NcIik7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgICAgICB3aGFsZS5zdG9yYWdlLnN5bmMuc2V0KFxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBvcHRpb246IEpTT04uc3RyaW5naWZ5KG5ld09wdGlvbiksXHJcbiAgICAgICAgICAgIGZhdm9yYXRlOiBKU09OLnN0cmluZ2lmeShuZXdGYXZvcmF0ZSlcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTWlncmF0aW9uIFN5bmMgU3VjY2Vzc1wiKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICApO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgV2VidG9vblN0b3JlIGZyb20gXCIuLi8uLi9zdG9yZS93ZWJ0b29uXCI7XHJcbmltcG9ydCBPcHRpb25TdG9yZSBmcm9tIFwiLi4vLi4vc3RvcmUvb3B0aW9uXCI7XHJcbmltcG9ydCBtaWdyYXRpb24gZnJvbSBcIi4vbWlncmF0aW9uXCI7XHJcbmltcG9ydCB7IGFkZExpbmtDb250ZXh0IH0gZnJvbSBcIi4uL2NvbnRleHRNZW51XCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbih3ZWJ0b29uOiBXZWJ0b29uU3RvcmUsIG9wdGlvbjogT3B0aW9uU3RvcmUpIHtcclxuICB3aGFsZS5ydW50aW1lLm9uSW5zdGFsbGVkLmFkZExpc3RlbmVyKGRldGFpbHMgPT4ge1xyXG4gICAgYWRkTGlua0NvbnRleHQoKTtcclxuXHJcbiAgICBjb25zb2xlLmxvZyhkZXRhaWxzKTtcclxuICAgIGlmIChkZXRhaWxzLnJlYXNvbiA9PT0gXCJpbnN0YWxsXCIpIHtcclxuICAgICAgY29uc29sZS5sb2coXCJJbml0IFN0YXJ0XCIpO1xyXG4gICAgICB3ZWJ0b29uLnNldFZpc2l0c0Zyb21DaHJvbWUoKTtcclxuICAgIH0gZWxzZSBpZiAoZGV0YWlscy5yZWFzb24gPT09IFwidXBkYXRlXCIpIHtcclxuICAgICAgY29uc3QgY3VycmVudFZlcnNpb24gPSB3aGFsZS5ydW50aW1lLmdldE1hbmlmZXN0KCkudmVyc2lvbjtcclxuICAgICAgaWYgKGRldGFpbHMucHJldmlvdXNWZXJzaW9uICE9IGN1cnJlbnRWZXJzaW9uKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZGV0YWlscy5wcmV2aW91c1ZlcnNpb24sIGN1cnJlbnRWZXJzaW9uKTtcclxuICAgICAgICBtaWdyYXRpb24oZGV0YWlscy5wcmV2aW91c1ZlcnNpb24sIGN1cnJlbnRWZXJzaW9uKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0pO1xyXG59XHJcbiIsImltcG9ydCBXZWJ0b29uU3RvcmUgZnJvbSBcIi4uLy4uL3N0b3JlL3dlYnRvb25cIjtcclxuaW1wb3J0IE9wdGlvblN0b3JlIGZyb20gXCIuLi8uLi9zdG9yZS9vcHRpb25cIjtcclxuaW1wb3J0IHsgQ2hyb21lTWVzc2FnZSB9IGZyb20gXCIuLi8uLi8uLi9AdHlwZXMvY29tbWVuZFwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24od2VidG9vbjogV2VidG9vblN0b3JlLCBvcHRpb246IE9wdGlvblN0b3JlKSB7XHJcbiAgd2hhbGUucnVudGltZS5vbk1lc3NhZ2UuYWRkTGlzdGVuZXIoXHJcbiAgICAobWVzc2FnZTogQ2hyb21lTWVzc2FnZSwgc2VuZGVyLCByZXNwb25zZSkgPT4ge1xyXG4gICAgICBjb25zdCBwYXJhbSA9IG5ldyBVUkwoc2VuZGVyLnVybCkuc2VhcmNoUGFyYW1zO1xyXG4gICAgICBjb25zb2xlLmxvZyhwYXJhbSk7XHJcbiAgICAgIGNvbnN0IHdpZCA9IHBhcmFtLmdldChcInRpdGxlSWRcIik7XHJcbiAgICAgIGNvbnN0IG5vID0gcGFyYW0uZ2V0KFwibm9cIik7XHJcbiAgICAgIGlmIChtZXNzYWdlICYmIG1lc3NhZ2UuY29tbWFuZCA9PT0gXCJvcGVuVGFiXCIpIHtcclxuICAgICAgICBjb25zdCBsaW5rID0gc2VuZGVyLnVybC5yZXBsYWNlKFwibS5jb21pY1wiLCBcImNvbWljXCIpO1xyXG4gICAgICAgIC8vIEZvcmNlIFRhYlxyXG4gICAgICAgIHdoYWxlLnRhYnMuY3JlYXRlKHtcclxuICAgICAgICAgIHVybDogbGlua1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vIG9wdGlvbi5vcGVuVGFiKGxpbmspO1xyXG4gICAgICAgIHJlc3BvbnNlKG51bGwpO1xyXG4gICAgICB9IGVsc2UgaWYgKHdpZCAmJiBubyAmJiBtZXNzYWdlLnNjcm9sbCAmJiBvcHRpb24uc2F2ZVNjcm9sbCkge1xyXG4gICAgICAgIG1lc3NhZ2Uuc2Nyb2xsID0gTWF0aC5yb3VuZChtZXNzYWdlLnNjcm9sbCAqIDEwMCk7XHJcbiAgICAgICAgaWYgKG1lc3NhZ2Uuc2Nyb2xsIDw9IDIgfHwgbWVzc2FnZS5zY3JvbGwgPj0gOTgpIHtcclxuICAgICAgICAgIGlmICh3ZWJ0b29uLnNjcm9sbHNbd2lkXSAmJiB3ZWJ0b29uLnNjcm9sbHNbd2lkXVtub10pIHtcclxuICAgICAgICAgICAgZGVsZXRlIHdlYnRvb24uc2Nyb2xsc1t3aWRdW25vXTtcclxuICAgICAgICAgICAgaWYgKE9iamVjdC5rZXlzKHdlYnRvb24uc2Nyb2xsc1t3aWRdKS5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICAgIGRlbGV0ZSB3ZWJ0b29uLnNjcm9sbHNbd2lkXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgd2VidG9vbi5zY3JvbGxzID0gd2VidG9vbi5zY3JvbGxzO1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIXdlYnRvb24uc2Nyb2xsc1t3aWRdKSB7XHJcbiAgICAgICAgICB3ZWJ0b29uLnNjcm9sbHNbd2lkXSA9IHt9O1xyXG4gICAgICAgIH1cclxuICAgICAgICB3ZWJ0b29uLnNjcm9sbHNbd2lkXVtub10gPSBtZXNzYWdlLnNjcm9sbDtcclxuICAgICAgICAvLyBTYXZlIHRvIFN0b3JlXHJcbiAgICAgICAgd2VidG9vbi5zY3JvbGxzID0gd2VidG9vbi5zY3JvbGxzO1xyXG4gICAgICB9IGVsc2UgaWYgKG1lc3NhZ2UgJiYgbWVzc2FnZS5jb21tYW5kID09PSBcInJlbG9hZFwiKSB7XHJcbiAgICAgICAgbG9jYXRpb24ucmVsb2FkKCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICApO1xyXG59XHJcbiIsImltcG9ydCBXZWJ0b29uU3RvcmUsIHsgVmlzaXRUeXBlIH0gZnJvbSBcIi4uLy4uL3N0b3JlL3dlYnRvb25cIjtcclxuaW1wb3J0IE9wdGlvblN0b3JlIGZyb20gXCIuLi8uLi9zdG9yZS9vcHRpb25cIjtcclxuaW1wb3J0ICogYXMgVXRpbGl0eSBmcm9tIFwiLi91dGlsaXR5XCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbih3ZWJ0b29uOiBXZWJ0b29uU3RvcmUsIG9wdGlvbjogT3B0aW9uU3RvcmUpIHtcclxuICB3aGFsZS50YWJzLm9uVXBkYXRlZC5hZGRMaXN0ZW5lcigodGFiSWQsIGluZm8sIHRhYikgPT4ge1xyXG4gICAgaWYgKGluZm8uc3RhdHVzICYmIGluZm8uc3RhdHVzID09PSBcImNvbXBsZXRlXCIpIHtcclxuICAgICAgY29uc3QgdXJsID0gbmV3IFVSTCh0YWIudXJsKTtcclxuICAgICAgaWYgKHVybC5ob3N0ID09PSBcImNvbWljLm5hdmVyLmNvbVwiKSB7XHJcbiAgICAgICAgLy8g7ZqM7LCoIOumrOyKpO2KuCDtjpjsnbTsp4BcclxuICAgICAgICBpZiAodXJsLnBhdGhuYW1lLmluZGV4T2YoXCIvbGlzdC5uaG5cIikgPiAwKSB7XHJcbiAgICAgICAgICBjb25zdCB3ZWJ0b29uSWQgPSB1cmwuc2VhcmNoUGFyYW1zLmdldChcInRpdGxlSWRcIik7XHJcbiAgICAgICAgICBVdGlsaXR5LmRpc3BsYXlIaXN0b3J5KFxyXG4gICAgICAgICAgICB0YWJJZCxcclxuICAgICAgICAgICAgd2VidG9vbklkLFxyXG4gICAgICAgICAgICB3ZWJ0b29uLnZpc2l0cyxcclxuICAgICAgICAgICAgb3B0aW9uLnNob3dIaXN0b3J5XHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyDsm7ntiLAg67O064qUIO2OmOydtOyngFxyXG4gICAgICAgIGVsc2UgaWYgKHVybC5wYXRobmFtZS5pbmRleE9mKFwiL2RldGFpbC5uaG5cIikgPiAwKSB7XHJcbiAgICAgICAgICBjb25zdCB3ZWJ0b29uSWQgPSB1cmwuc2VhcmNoUGFyYW1zLmdldChcInRpdGxlSWRcIik7XHJcbiAgICAgICAgICBjb25zdCBubyA9IHVybC5zZWFyY2hQYXJhbXMuZ2V0KFwibm9cIik7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyh1cmwpO1xyXG4gICAgICAgICAgaWYgKCF3ZWJ0b29uSWQgfHwgIW5vKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmICghd2VidG9vbi53ZWJ0b29uVHlwZVt3ZWJ0b29uSWRdKSB7XHJcbiAgICAgICAgICAgIHdlYnRvb24udmlzaXRzW3dlYnRvb25JZF0gPSB7fTtcclxuICAgICAgICAgICAgd2VidG9vbi53ZWJ0b29uVHlwZVt3ZWJ0b29uSWRdID0ge1xyXG4gICAgICAgICAgICAgIHRpdGxlOiB0YWIudGl0bGUuc3BsaXQoXCI6OlwiKVswXS50cmltKCksXHJcbiAgICAgICAgICAgICAgdHlwZTogdXJsLnBhdGhuYW1lLnNwbGl0KFwiL2RldGFpbC5uaG5cIilbMF1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGNvbnNvbGUubG9nKHdlYnRvb25JZCwgbm8pO1xyXG4gICAgICAgICAgd2VidG9vbi52aXNpdHNbd2VidG9vbklkXVtub10gPSBNYXRoLmZsb29yKFxyXG4gICAgICAgICAgICBuZXcgRGF0ZSgpLmdldFRpbWUoKSAvIDEwMDBcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgICBpZiAob3B0aW9uLnNhdmVTY3JvbGwpIHtcclxuICAgICAgICAgICAgVXRpbGl0eS5jaGVja1Njcm9sbCh0YWJJZCwgZmFsc2UpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKHdlYnRvb24uc2Nyb2xsc1t3ZWJ0b29uSWRdICYmIHdlYnRvb24uc2Nyb2xsc1t3ZWJ0b29uSWRdW25vXSkge1xyXG4gICAgICAgICAgICBVdGlsaXR5LnNldFNjcm9sbChcclxuICAgICAgICAgICAgICB0YWJJZCxcclxuICAgICAgICAgICAgICB3ZWJ0b29uLnNjcm9sbHNbd2VidG9vbklkXVtub10sXHJcbiAgICAgICAgICAgICAgZmFsc2UsXHJcbiAgICAgICAgICAgICAgb3B0aW9uLnNjcm9sbEFsZXJ0XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAob3B0aW9uLmF1dG9OZXh0KSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiYXV0b25leHRcIik7XHJcbiAgICAgICAgICAgIFV0aWxpdHkuYXV0b05leHQodGFiSWQsIG9wdGlvbi5hdXRvTmV4dCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAob3B0aW9uLmhpZGRlbkNvbW1lbnQpIFV0aWxpdHkuaGlkZGVuQ29tbWVudCh0YWJJZCwgZmFsc2UpO1xyXG5cclxuICAgICAgICAgIC8vIFNhdmUgdG8gU3RvcmVcclxuICAgICAgICAgIHdlYnRvb24ud2VidG9vblR5cGUgPSB3ZWJ0b29uLndlYnRvb25UeXBlO1xyXG4gICAgICAgICAgd2VidG9vbi52aXNpdHMgPSB3ZWJ0b29uLnZpc2l0cztcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9KTtcclxufVxyXG4iLCJpbXBvcnQgeyBWaXNpdFR5cGUgfSBmcm9tIFwiLi4vLi4vc3RvcmUvd2VidG9vblwiO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGhpZGRlbkNvbW1lbnQodGFiSWQ6IG51bWJlciwgaXNNb2JpbGU6IGJvb2xlYW4pIHtcclxuICBjb25zdCBjb2RlID0gYGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiJHtcclxuICAgIGlzTW9iaWxlID8gXCJjYm94X21vZHVsZVwiIDogXCJjb21tZW50SWZyYW1lXCJcclxuICB9XCIpLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcImA7XHJcbiAgaWYgKCF0YWJJZCkge1xyXG4gICAgZXZhbChjb2RlKTtcclxuICAgIHJldHVybjtcclxuICB9IGVsc2VcclxuICAgIHdoYWxlLnRhYnMuZXhlY3V0ZVNjcmlwdCh0YWJJZCwge1xyXG4gICAgICBjb2RlOiBjb2RlXHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNoZWNrU2Nyb2xsKHRhYklkOiBudW1iZXIsIGlzTW9iaWxlOiBib29sZWFuKSB7XHJcbiAgY29uc3QgY29kZSA9IGlzTW9iaWxlXHJcbiAgICA/IGBcclxuICB2YXIgY2hlY2tQZXJjZW50O1xyXG4gIGZ1bmN0aW9uIGNoZWNrU2MoIGV2ZW50ICkge1xyXG4gICAgd2luZG93LmNsZWFyVGltZW91dCggY2hlY2tQZXJjZW50ICk7XHJcbiAgICBjaGVja1BlcmNlbnQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgd2hhbGUucnVudGltZS5zZW5kTWVzc2FnZShcIiR7XHJcbiAgICAgIHdoYWxlLnJ1bnRpbWUuaWRcclxuICAgIH1cIiwge3Njcm9sbCA6IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3AgLyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Rvb25MYXllcj51bFwiKS5zY3JvbGxIZWlnaHQgfSlcclxuICB9LCAxMDApXHJcbn1cclxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsY2hlY2tTYywgZmFsc2UpO2BcclxuICAgIDogYFxyXG52YXIgY2hlY2tQZXJjZW50O1xyXG5mdW5jdGlvbiBjaGVja1NjKCBldmVudCApIHtcclxuICAgIHdpbmRvdy5jbGVhclRpbWVvdXQoIGNoZWNrUGVyY2VudCApO1xyXG4gICAgY2hlY2tQZXJjZW50ID0gc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxud2hhbGUucnVudGltZS5zZW5kTWVzc2FnZSgnJHtcclxuICAgICAgICB3aGFsZS5ydW50aW1lLmlkXHJcbiAgICAgIH0nLCB7c2Nyb2xsIDogKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3AgLSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnd0X3ZpZXdlclwiKS5jaGlsZE5vZGVzWzFdLm9mZnNldFRvcCkgLyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnd0X3ZpZXdlclwiKS5zY3JvbGxIZWlnaHQgfSlcclxufSwgMTAwKTt9XHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLGNoZWNrU2MsIGZhbHNlKTtgO1xyXG4gIGlmICghdGFiSWQpIHtcclxuICAgIGV2YWwoY29kZSk7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG5cclxuICB3aGFsZS50YWJzLmV4ZWN1dGVTY3JpcHQodGFiSWQsIHtcclxuICAgIGNvZGU6IGNvZGVcclxuICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHNldFNjcm9sbChcclxuICB0YWJJZDogbnVtYmVyLFxyXG4gIHNjcm9sbDogbnVtYmVyLFxyXG4gIGlzTW9iaWxlOiBib29sZWFuLFxyXG4gIHNjcm9sbEFsZXJ0OiBib29sZWFuXHJcbikge1xyXG4gIGNvbnN0IGNvZGUgPSBpc01vYmlsZVxyXG4gICAgPyBgc2V0VGltZW91dCgoKT0+e2RvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3AgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Rvb25MYXllcj51bFwiKS5zY3JvbGxIZWlnaHQgKiAke3Njcm9sbCAvXHJcbiAgICAgICAgMTAwfX0sIDEwMDApYFxyXG4gICAgOiBzY3JvbGxBbGVydFxyXG4gICAgPyBgaWYgKGNvbmZpcm0oXCJbd2VidG9vbiBleHRlbnNpb25dIOydtOyghOyXkCDrs7gg6riw66Gd7J20IOuCqOyVhOyeiOyKteuLiOuLpC4gKCR7c2Nyb2xsfSUpXFxcXG7snbTslrTrs7Tsi5zqsqDsirXri4jquYw/XCIpKTtcclxuICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3AgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnd0X3ZpZXdlclwiKS5jaGlsZE5vZGVzWzFdLm9mZnNldFRvcCArIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIud3Rfdmlld2VyXCIpLnNjcm9sbEhlaWdodCAqICR7c2Nyb2xsIC9cclxuICAgICAgMTAwfWBcclxuICAgIDogYGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3AgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnd0X3ZpZXdlclwiKS5jaGlsZE5vZGVzWzFdLm9mZnNldFRvcCArIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIud3Rfdmlld2VyXCIpLnNjcm9sbEhlaWdodCAqICR7c2Nyb2xsIC9cclxuICAgICAgICAxMDB9YDtcclxuICBpZiAoIXRhYklkKSB7XHJcbiAgICBldmFsKGNvZGUpO1xyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuXHJcbiAgd2hhbGUudGFicy5leGVjdXRlU2NyaXB0KHRhYklkLCB7XHJcbiAgICBjb2RlOiBjb2RlXHJcbiAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBhdXRvTmV4dCh0YWJJZDogbnVtYmVyLCBpc0F1dG86IGJvb2xlYW4pIHtcclxuICBjb25zdCBjb2RlID0gaXNBdXRvXHJcbiAgICA/IGB2YXIgd3UgPSBuZXcgVVJMKHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcclxuICBjb25zb2xlLmxvZyhcIkF1dG9OZXh0XCIpO1xyXG4gIHd1LnNlYXJjaFBhcmFtcy5zZXQoXCJub1wiLCB3dS5zZWFyY2hQYXJhbXMuZ2V0KFwibm9cIikqMSsxKVxyXG4gIHZhciBpc1Njcm9sbGluZztcclxuICBmdW5jdGlvbiBjaGVja1Njcm9sbHMoIGV2ZW50ICkge1xyXG4gICAgICB3aW5kb3cuY2xlYXJUaW1lb3V0KCBpc1Njcm9sbGluZyApO1xyXG4gICAgICBpc1Njcm9sbGluZyA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICBpZiAoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbEhlaWdodC1kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wPDE1MDApXHJcbiAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gd3UuaHJlZjtcclxuICAgICAgfSwgNTAwKTtcclxuXHJcbiAgfVxyXG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLGNoZWNrU2Nyb2xscywgZmFsc2UpO1xyXG4gIGBcclxuICAgIDogYFxyXG4gIGlmICh3aW5kb3dbXCJjaGVja1Njcm9sbHNcIl0pXHJcbiAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIGNoZWNrU2Nyb2xscylgO1xyXG4gIGlmICghdGFiSWQpIHtcclxuICAgIGV2YWwoY29kZSk7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG4gIHdoYWxlLnRhYnMuZXhlY3V0ZVNjcmlwdCh0YWJJZCwge1xyXG4gICAgY29kZTogY29kZVxyXG4gIH0pO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiBkaXNwbGF5SGlzdG9yeShcclxuICB0YWJJZDogbnVtYmVyLFxyXG4gIHdlYnRvb25JZDogc3RyaW5nLFxyXG4gIHZpc2l0czogVmlzaXRUeXBlLFxyXG4gIHNob3dIaXN0b3J5OiBib29sZWFuXHJcbikge1xyXG4gIGlmICh2aXNpdHNbd2VidG9vbklkXSAmJiBzaG93SGlzdG9yeSkge1xyXG4gICAgT2JqZWN0LmtleXModmlzaXRzW3dlYnRvb25JZF0pLmZvckVhY2goa2V5ID0+IHtcclxuICAgICAgY29uc3QgY29kZSA9IGB2YXIgd2xvZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJhW2hyZWYqPSdkZXRhaWwubmhuP3RpdGxlSWQ9JHt3ZWJ0b29uSWR9Jm5vPSR7a2V5fSddXCIpO1xyXG4gICAgICBpZiAod2xvZyl7XHJcbiAgICAgICAgd2xvZz13bG9nLnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudDtcclxuICAgICAgICB3bG9nLnN0eWxlLmJhY2tncm91bmQ9XCJsaWdodGdyYXlcIjtcclxuICAgICAgICB3bG9nLnRpdGxlPVwiJHtuZXcgRGF0ZSh2aXNpdHNbd2VidG9vbklkXVtrZXldICogMTAwMCkudG9Mb2NhbGVTdHJpbmcoKSArXHJcbiAgICAgICAgICBcIuyXkCDrtIRcIn1cIlxyXG4gICAgfWA7XHJcbiAgICAgIGlmICghdGFiSWQpIHtcclxuICAgICAgICBldmFsKGNvZGUpO1xyXG4gICAgICB9IGVsc2VcclxuICAgICAgICB3aGFsZS50YWJzLmV4ZWN1dGVTY3JpcHQodGFiSWQsIHtcclxuICAgICAgICAgIGNvZGU6IGNvZGVcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgT3B0aW9uU3RvcmUgZnJvbSBcIi4vb3B0aW9uXCI7XHJcbmltcG9ydCBXZWJ0b29uU3RvcmUgZnJvbSBcIi4vd2VidG9vblwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUm9vdFN0b3JlIHtcclxuICBwdWJsaWMgd2VidG9vbjogV2VidG9vblN0b3JlO1xyXG4gIHB1YmxpYyBvcHRpb246IE9wdGlvblN0b3JlO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihpc0JhY2tncm91bmQ6IGJvb2xlYW4sIG9uTG9hZD86ICgpID0+IHZvaWQpIHtcclxuICAgIHRoaXMub3B0aW9uID0gbmV3IE9wdGlvblN0b3JlKGlzQmFja2dyb3VuZCk7XHJcbiAgICB0aGlzLndlYnRvb24gPSBuZXcgV2VidG9vblN0b3JlKHRoaXMub3B0aW9uLCBvbkxvYWQpO1xyXG5cclxuICAgIC8vIERldiBPbmx5XHJcbiAgICAvLyB3aGFsZS5zdG9yYWdlLm9uQ2hhbmdlZC5hZGRMaXN0ZW5lcigoY2hhbmdlLCBhcmVhKSA9PiB7XHJcbiAgICAvLyAgIGNvbnNvbGUubG9nKFwiY2hyb21lIHN0b3JhZ2UgY2hhbmdlZFwiLCBhcmVhLCBjaGFuZ2UpO1xyXG4gICAgLy8gfSk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IG9ic2VydmFibGUsIGFjdGlvbiwgY29tcHV0ZWQgfSBmcm9tIFwibW9ieFwiO1xyXG5cclxuZXhwb3J0IGNvbnN0IHN0b3JlS2V5cyA9IFtcclxuICBcIl9zdG9yZUxvY2F0aW9uXCIsXHJcbiAgXCJfb3JkZXJCeVwiLFxyXG4gIFwiX3Nob3dIaXN0b3J5XCIsXHJcbiAgXCJfaGlzdG9yeU1heFwiLFxyXG4gIFwiX3NhdmVXZWJ0b29uU29ydFwiLFxyXG4gIFwiX3NhdmVTY3JvbGxcIixcclxuICBcIl9oaWRkZW5Db21tZW50XCIsXHJcbiAgXCJfYXV0b05leHRcIixcclxuICBcIl91c2VJbWdMb2dcIixcclxuICBcIl9zYXZlRmF2b3JhdGVcIixcclxuICBcIl9saW5rVGFyZ2V0XCIsXHJcbiAgXCJfc2Nyb2xsQWxlcnRcIixcclxuICBcIl91c2VDb250ZXh0TWVudVwiXHJcbl07XHJcblxyXG5leHBvcnQgdHlwZSBDaHJvbWVTdG9yZSA9IFwibG9jYWxcIiB8IFwic3luY1wiIHwgbnVsbDtcclxuZXhwb3J0IHR5cGUgV2VidG9vbk9yZGVyID0gXCJWaWV3Q291bnRcIiB8IFwiVXBkYXRlXCIgfCBcIlN0YXJTY29yZVwiIHwgXCJUaXRsZU5hbWVcIjtcclxuZXhwb3J0IHR5cGUgTGlua1RhcmdldCA9IFwiVGFiXCIgfCBcIkN1cnJlbnRcIiB8IFwiUG9wdXBcIiB8IFwiU2lkZWJhclwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgT3B0aW9uU3RvcmUge1xyXG4gIHByaXZhdGUgcmVhZG9ubHkgZGVmYXVsdE9wdGlvbjtcclxuXHJcbiAgcHJpdmF0ZSBnZXQgb3B0aW9uT2JqZWN0KCkge1xyXG4gICAgY29uc3Qgb2JqID0ge307XHJcbiAgICBzdG9yZUtleXMuZm9yRWFjaChrZXkgPT4ge1xyXG4gICAgICBvYmpba2V5XSA9IHRoaXNba2V5XTtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIG9iajtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgc2F2ZVRvU3RvcmUoKSB7XHJcbiAgICB3aGFsZS5zdG9yYWdlLnN5bmMuc2V0KHtcclxuICAgICAgb3B0aW9uOiBKU09OLnN0cmluZ2lmeSh0aGlzLm9wdGlvbk9iamVjdClcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldFVzZUJ5dGVzKCkge1xyXG4gICAgd2hhbGUuc3RvcmFnZS5sb2NhbC5nZXRCeXRlc0luVXNlKHVzZSA9PiB7XHJcbiAgICAgIHRoaXMubG9jYWxVc2FnZSA9IHVzZTtcclxuICAgIH0pO1xyXG4gICAgd2hhbGUuc3RvcmFnZS5zeW5jLmdldEJ5dGVzSW5Vc2UodXNlID0+IHtcclxuICAgICAgdGhpcy5zeW5jVXNhZ2UgPSB1c2U7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBvbkxvYWQ6ICgpID0+IHZvaWQgPSAoKSA9PiB7XHJcbiAgICBjb25zb2xlLmxvZyhcIldlYnRvb24gTm90IEluaXRlZFwiKTtcclxuICB9O1xyXG5cclxuICBwcml2YXRlIGlzUHJldmlvdXNWZXJzaW9uOiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIC8qKlxyXG4gICAqIOyDneyEseyekFxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKGlzQmFja2dyb3VuZDogYm9vbGVhbikge1xyXG4gICAgdGhpcy5kZWZhdWx0T3B0aW9uID0gdGhpcy5vcHRpb25PYmplY3Q7XHJcbiAgICB0aGlzLmlzQmFja2dyb3VuZCA9IGlzQmFja2dyb3VuZDtcclxuICAgIC8vIENocm9tZSBTdG9yYWdl66Gc67aA7YSwIOyEpOygleqwkuydhCDstIjquLDtmZRcclxuICAgIHdoYWxlLnN0b3JhZ2Uuc3luYy5nZXQoXCJvcHRpb25cIiwgKHsgb3B0aW9uOiBpdGVtIH0pID0+IHtcclxuICAgICAgaWYgKGl0ZW0gJiYgaXRlbS5zb3J0ICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIC8vIDEuNi4yIE9ubHlcclxuICAgICAgICB0aGlzLmlzUHJldmlvdXNWZXJzaW9uID0gdHJ1ZTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgaWYgKGl0ZW0pIGl0ZW0gPSBKU09OLnBhcnNlKGl0ZW0pO1xyXG4gICAgICBpZiAoaXRlbSAmJiBPYmplY3Qua2V5cyhpdGVtKS5sZW5ndGggPT09IHN0b3JlS2V5cy5sZW5ndGgpIHtcclxuICAgICAgICBzdG9yZUtleXMuZm9yRWFjaChrZXkgPT4ge1xyXG4gICAgICAgICAgdGhpc1trZXldID0gaXRlbVtrZXldO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuZ2V0VXNlQnl0ZXMoKTtcclxuICAgICAgICB0aGlzLm9uTG9hZCgpO1xyXG4gICAgICB9IGVsc2UgaWYgKCFpdGVtIHx8IE9iamVjdC5rZXlzKGl0ZW0pLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgIHdoYWxlLnN0b3JhZ2Uuc3luYy5zZXQoXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIG9wdGlvbjogSlNPTi5zdHJpbmdpZnkodGhpcy5vcHRpb25PYmplY3QpXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmdldFVzZUJ5dGVzKCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiT3B0aW9uIEluaXRcIik7XHJcbiAgICAgICAgICAgIHRoaXMub25Mb2FkKCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBPYmplY3Qua2V5cyhzdG9yZUtleXMpLmZvckVhY2goa2V5ID0+IHtcclxuICAgICAgICAgIGlmIChpdGVtW2tleV0pIHtcclxuICAgICAgICAgICAgdGhpc1trZXldID0gaXRlbVtrZXldO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHdoYWxlLnN0b3JhZ2Uuc3luYy5zZXQoeyBvcHRpb246IEpTT04uc3RyaW5naWZ5KHRoaXMub3B0aW9uT2JqZWN0KSB9LCAoKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLmdldFVzZUJ5dGVzKCk7XHJcbiAgICAgICAgICBjb25zb2xlLmxvZyhcIlVwZGF0ZSBDb21wbGF0ZVwiKTtcclxuICAgICAgICAgIHRoaXMub25Mb2FkKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8vIGNocm9tZSBzdG9yYWdl66W8IHN0b3Jl7JmAIOuPmeq4sO2ZlFxyXG4gICAgd2hhbGUuc3RvcmFnZS5vbkNoYW5nZWQuYWRkTGlzdGVuZXIoKGNoYW5nZSwgYXJlYSkgPT4ge1xyXG4gICAgICBpZiAoY2hhbmdlLm9wdGlvbiAmJiBjaGFuZ2Uub3B0aW9uLm5ld1ZhbHVlKSB7XHJcbiAgICAgICAgaWYgKGNoYW5nZS5vcHRpb24ubmV3VmFsdWUuc29ydCkgcmV0dXJuOyAvLyBEZXYgT25seVxyXG4gICAgICAgIGNvbnN0IG9wdGlvbiA9IEpTT04ucGFyc2UoY2hhbmdlLm9wdGlvbi5uZXdWYWx1ZSk7XHJcbiAgICAgICAgc3RvcmVLZXlzLmZvckVhY2goa2V5ID0+IHtcclxuICAgICAgICAgIGlmIChvcHRpb25ba2V5XSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRoaXNba2V5XSA9IG9wdGlvbltrZXldO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmICh0aGlzLmlzUHJldmlvdXNWZXJzaW9uKSB7XHJcbiAgICAgICAgICB0aGlzLm9uTG9hZCgpO1xyXG4gICAgICAgICAgdGhpcy5pc1ByZXZpb3VzVmVyc2lvbiA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmdldFVzZUJ5dGVzKCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgQG9ic2VydmFibGVcclxuICBwdWJsaWMgaXNCYWNrZ3JvdW5kOiBib29sZWFuO1xyXG5cclxuICBAb2JzZXJ2YWJsZVxyXG4gIHB1YmxpYyBsb2NhbFVzYWdlOiBudW1iZXIgPSAwO1xyXG5cclxuICBAb2JzZXJ2YWJsZVxyXG4gIHB1YmxpYyBzeW5jVXNhZ2U6IG51bWJlciA9IDA7XHJcblxyXG4gIC8qKlxyXG4gICAqIOyCrOyaqeyekCDrjbDsnbTthLDrpbwg7KCA7J6l7ZWgIOyggOyepeyGjFxyXG4gICAqL1xyXG4gIEBvYnNlcnZhYmxlXHJcbiAgcHJpdmF0ZSBfc3RvcmVMb2NhdGlvbjogQ2hyb21lU3RvcmUgPSBcImxvY2FsXCI7XHJcblxyXG4gIEBjb21wdXRlZFxyXG4gIHB1YmxpYyBnZXQgc3RvcmVMb2NhdGlvbigpOiBDaHJvbWVTdG9yZSB7XHJcbiAgICByZXR1cm4gdGhpcy5fc3RvcmVMb2NhdGlvbjtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzZXQgc3RvcmVMb2NhdGlvbih2YWx1ZTogQ2hyb21lU3RvcmUpIHtcclxuICAgIHRoaXMuX3N0b3JlTG9jYXRpb24gPSB2YWx1ZTtcclxuICAgIHRoaXMuaGlzdG9yeU1heCA9IHRoaXMuaGlzdG9yeU1heDtcclxuICAgIHRoaXMuc2F2ZVRvU3RvcmUoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOybue2IsCDsoJXroKwg67Cp7IudXHJcbiAgICovXHJcbiAgQG9ic2VydmFibGVcclxuICBwcml2YXRlIF9vcmRlckJ5OiBXZWJ0b29uT3JkZXIgPSBcIlZpZXdDb3VudFwiO1xyXG5cclxuICBAY29tcHV0ZWRcclxuICBwdWJsaWMgZ2V0IG9yZGVyQnkoKTogV2VidG9vbk9yZGVyIHtcclxuICAgIHJldHVybiB0aGlzLl9vcmRlckJ5O1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHNldCBvcmRlckJ5KHZhbHVlOiBXZWJ0b29uT3JkZXIpIHtcclxuICAgIHRoaXMuX29yZGVyQnkgPSB2YWx1ZTtcclxuICAgIHRoaXMuc2F2ZVRvU3RvcmUoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOybue2IsCDquLDroZ3snYQg67O07J2064qUIOyXrOu2gFxyXG4gICAqL1xyXG4gIEBvYnNlcnZhYmxlXHJcbiAgcHJpdmF0ZSBfc2hvd0hpc3Rvcnk6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICBAY29tcHV0ZWRcclxuICBwdWJsaWMgZ2V0IHNob3dIaXN0b3J5KCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX3Nob3dIaXN0b3J5O1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHNldCBzaG93SGlzdG9yeSh2YWx1ZTogYm9vbGVhbikge1xyXG4gICAgdGhpcy5fc2hvd0hpc3RvcnkgPSB2YWx1ZTtcclxuICAgIHRoaXMuc2F2ZVRvU3RvcmUoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOy1nOuMgCDquLDroZ0g7KCA7J6lIOqwnOyImFxyXG4gICAqL1xyXG4gIEBvYnNlcnZhYmxlXHJcbiAgcHJpdmF0ZSBfaGlzdG9yeU1heDogbnVtYmVyID0gMTAwMDtcclxuXHJcbiAgQGNvbXB1dGVkXHJcbiAgcHVibGljIGdldCBoaXN0b3J5TWF4KCk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gdGhpcy5faGlzdG9yeU1heDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzZXQgaGlzdG9yeU1heCh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICBpZiAodGhpcy5fc3RvcmVMb2NhdGlvbiA9PT0gXCJzeW5jXCIgJiYgdmFsdWUgPiAyMDApIHZhbHVlID0gMjAwO1xyXG4gICAgaWYgKHRoaXMuX3N0b3JlTG9jYXRpb24gPT09IFwibG9jYWxcIiAmJiB2YWx1ZSA+IDEwMDApIHZhbHVlID0gMTAwMDtcclxuICAgIHRoaXMuX2hpc3RvcnlNYXggPSB2YWx1ZTtcclxuICAgIHRoaXMuc2F2ZVRvU3RvcmUoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOyalOydvOuzhCDsm7ntiLAg7IKs7Jqp7J6QIOyngOyglSDsiJzshJzrpbwg7KCB7Jqp7ZWY64qUIOyXrOu2gFxyXG4gICAqL1xyXG4gIEBvYnNlcnZhYmxlXHJcbiAgcHJpdmF0ZSBfc2F2ZVdlYnRvb25Tb3J0OiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgQGNvbXB1dGVkXHJcbiAgcHVibGljIGdldCBzYXZlV2VidG9vblNvcnQoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5fc2F2ZVdlYnRvb25Tb3J0O1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHNldCBzYXZlV2VidG9vblNvcnQodmFsdWU6IGJvb2xlYW4pIHtcclxuICAgIHRoaXMuX3NhdmVXZWJ0b29uU29ydCA9IHZhbHVlO1xyXG4gICAgdGhpcy5zYXZlVG9TdG9yZSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog7Iqk7YGs66Gk7J2EIOyggOyepe2VmOuKlCDsl6zrtoBcclxuICAgKi9cclxuICBAb2JzZXJ2YWJsZVxyXG4gIHByaXZhdGUgX3NhdmVTY3JvbGw6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICBAY29tcHV0ZWRcclxuICBwdWJsaWMgZ2V0IHNhdmVTY3JvbGwoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5fc2F2ZVNjcm9sbDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzZXQgc2F2ZVNjcm9sbCh2YWx1ZTogYm9vbGVhbikge1xyXG4gICAgdGhpcy5fc2F2ZVNjcm9sbCA9IHZhbHVlO1xyXG4gICAgaWYgKHZhbHVlID09PSB0cnVlKSB7XHJcbiAgICAgIHRoaXMuX3Njcm9sbEFsZXJ0ID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIHRoaXMuc2F2ZVRvU3RvcmUoKTtcclxuICB9XHJcblxyXG4gIEBvYnNlcnZhYmxlXHJcbiAgcHJpdmF0ZSBfc2Nyb2xsQWxlcnQ6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICBAY29tcHV0ZWRcclxuICBwdWJsaWMgZ2V0IHNjcm9sbEFsZXJ0KCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX3Njcm9sbEFsZXJ0O1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHNldCBzY3JvbGxBbGVydCh2YWx1ZTogYm9vbGVhbikge1xyXG4gICAgdGhpcy5fc2Nyb2xsQWxlcnQgPSB2YWx1ZTtcclxuICAgIHRoaXMuc2F2ZVRvU3RvcmUoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOuMk+q4gOydhCDsiKjquLDripQg7Jes67aAXHJcbiAgICovXHJcbiAgQG9ic2VydmFibGVcclxuICBwcml2YXRlIF9oaWRkZW5Db21tZW50OiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIEBjb21wdXRlZFxyXG4gIHB1YmxpYyBnZXQgaGlkZGVuQ29tbWVudCgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLl9oaWRkZW5Db21tZW50O1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHNldCBoaWRkZW5Db21tZW50KHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICB0aGlzLl9oaWRkZW5Db21tZW50ID0gdmFsdWU7XHJcbiAgICB0aGlzLnNhdmVUb1N0b3JlKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDsnpDrj5nsnLzroZwg7J6Q64+Z7ZmU66GcIOuEmOyWtOqwgOuKlCDsl6zrtoBcclxuICAgKi9cclxuICBAb2JzZXJ2YWJsZVxyXG4gIHByaXZhdGUgX2F1dG9OZXh0OiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgQGNvbXB1dGVkXHJcbiAgcHVibGljIGdldCBhdXRvTmV4dCgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLl9hdXRvTmV4dDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzZXQgYXV0b05leHQodmFsdWU6IGJvb2xlYW4pIHtcclxuICAgIHRoaXMuX2F1dG9OZXh0ID0gdmFsdWU7XHJcbiAgICB0aGlzLnNhdmVUb1N0b3JlKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDsnbTrr7jsp4Ag6rK966Gc66W8IOuhnOq3uOuhnCDsoIDsnqXtlZjripQg7Jes67aAXHJcbiAgICovXHJcbiAgQG9ic2VydmFibGVcclxuICBwcml2YXRlIF91c2VJbWdMb2c6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICBAY29tcHV0ZWRcclxuICBwdWJsaWMgZ2V0IHVzZUltZ0xvZygpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLl91c2VJbWdMb2c7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2V0IHVzZUltZ0xvZyh2YWx1ZTogYm9vbGVhbikge1xyXG4gICAgdGhpcy5fdXNlSW1nTG9nID0gdmFsdWU7XHJcbiAgICBpZiAodmFsdWUgPT09IGZhbHNlKSB7XHJcbiAgICAgIHdoYWxlLnN0b3JhZ2UubG9jYWwucmVtb3ZlKFwiaW1nbG9nXCIpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5zYXZlVG9TdG9yZSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog7KaQ6rKo7LC+6riw66W8IOy2lOqwgO2VmOuKlCDsl6zrtoBcclxuICAgKi9cclxuICBAb2JzZXJ2YWJsZVxyXG4gIHByaXZhdGUgX3NhdmVGYXZvcmF0ZTogYm9vbGVhbiA9IHRydWU7XHJcblxyXG4gIEBjb21wdXRlZFxyXG4gIHB1YmxpYyBnZXQgc2F2ZUZhdm9yYXRlKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX3NhdmVGYXZvcmF0ZTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzZXQgc2F2ZUZhdm9yYXRlKHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICB0aGlzLl9zYXZlRmF2b3JhdGUgPSB2YWx1ZTtcclxuICAgIHRoaXMuc2F2ZVRvU3RvcmUoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOunge2BrOulvCDsl7Qg7JyE7LmYXHJcbiAgICovXHJcbiAgQG9ic2VydmFibGVcclxuICBwcml2YXRlIF9saW5rVGFyZ2V0OiBMaW5rVGFyZ2V0ID0gXCJUYWJcIjtcclxuXHJcbiAgQGNvbXB1dGVkXHJcbiAgcHVibGljIGdldCBsaW5rVGFyZ2V0KCk6IExpbmtUYXJnZXQge1xyXG4gICAgcmV0dXJuIHRoaXMuX2xpbmtUYXJnZXQ7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2V0IGxpbmtUYXJnZXQodmFsdWU6IExpbmtUYXJnZXQpIHtcclxuICAgIHRoaXMuX2xpbmtUYXJnZXQgPSB2YWx1ZTtcclxuICAgIHRoaXMuc2F2ZVRvU3RvcmUoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENvbnRleHRNZW51IOyCrOyaqSDsl6zrtoBcclxuICAgKi9cclxuICBAb2JzZXJ2YWJsZVxyXG4gIHByaXZhdGUgX3VzZUNvbnRleHRNZW51OiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gIEBjb21wdXRlZFxyXG4gIHB1YmxpYyBnZXQgdXNlQ29udGV4dE1lbnUoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5fdXNlQ29udGV4dE1lbnU7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2V0IHVzZUNvbnRleHRNZW51KHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICB0aGlzLl91c2VDb250ZXh0TWVudSA9IHZhbHVlO1xyXG4gICAgdGhpcy5zYXZlVG9TdG9yZSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog7Iqk7Yag7Ja0IOy0iOq4sO2ZlFxyXG4gICAqIEBwYXJhbSBzdG9yZSDstIjquLDtmZQg7ZWgIOyKpO2GoOyWtCDsnITsuZhcclxuICAgKi9cclxuICBwdWJsaWMgcmVzZXRTdG9yZShzdG9yZTogQ2hyb21lU3RvcmUpIHtcclxuICAgIGlmIChzdG9yZSA9PT0gXCJsb2NhbFwiKSB7XHJcbiAgICAgIHdoYWxlLnN0b3JhZ2UubG9jYWwuY2xlYXIoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuZ2V0VXNlQnl0ZXMoKTtcclxuICAgICAgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB3aGFsZS5zdG9yYWdlLnN5bmMucmVtb3ZlKFxyXG4gICAgICAgIFtcIndlYnRvb25cIiwgXCJ2aXNpc3RzXCIsIFwic2Nvcmxsc1wiLCBcImZhdm9yYXRlXCIsIFwic29ydFdlYnRvb25cIl0sXHJcbiAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5yZXNldE9wdGlvbigpO1xyXG4gICAgICAgIH1cclxuICAgICAgKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyByZXNldE9wdGlvbihvbkxvYWQ/KSB7XHJcbiAgICB3aGFsZS5zdG9yYWdlLnN5bmMuc2V0KFxyXG4gICAgICB7XHJcbiAgICAgICAgb3B0aW9uOiBKU09OLnN0cmluZ2lmeSh0aGlzLmRlZmF1bHRPcHRpb24pXHJcbiAgICAgIH0sXHJcbiAgICAgIG9uTG9hZCAmJiBvbkxvYWRcclxuICAgICk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IG9ic2VydmFibGUsIGNvbXB1dGVkLCBhY3Rpb24sIG9ic2VydmUsIHRvSlMgfSBmcm9tIFwibW9ieFwiO1xyXG5pbXBvcnQgT3B0aW9uU3RvcmUgZnJvbSBcIi4vb3B0aW9uXCI7XHJcbmltcG9ydCBXZWJ0b29uUmVxdWVzdCwge1xyXG4gIFdlYnRvb25JbmZvVHlwZSxcclxuICBXZWJ0b29uSW5mbyxcclxuICBXZWVrXHJcbn0gZnJvbSBcIi4uL3Rvb2xzL3JlcXVlc3RcIjtcclxuXHJcbi8vIGV4cG9ydCB0eXBlIFNhdmVUeXBlID0gXCJpbWdsb2dcIiB8IFwiZmF2b3JhdGVcIiB8IFwic2Nyb2xsc1wiIHwgXCJ2aXNpdHNcIiB8IFwid2VidG9vblwiO1xyXG5cclxuZXhwb3J0IHR5cGUgTG9hZGluZ1N0YXR1cyA9IFwibm90IHN0YXJ0XCIgfCBcInN0YXJ0XCIgfCBcImVuZFwiO1xyXG5cclxuZXhwb3J0IHR5cGUgV2VidG9vblR5cGUgPSB7XHJcbiAgW2tleTogbnVtYmVyXToge1xyXG4gICAgdGl0bGU6IHN0cmluZztcclxuICAgIHR5cGU6IFwid2VidG9vblwiIHwgXCJiZXN0Q2hhbGxlbmdlXCIgfCBcImNoYWxsZW5nZVwiIHwgc3RyaW5nO1xyXG4gIH07XHJcbn07XHJcbmV4cG9ydCB0eXBlIHN0b3JhZ2VUeXBlID0ge1xyXG4gIHNjcm9sbHM6IFNjcm9sbFR5cGU7XHJcbiAgdmlzaXRzOiBWaXNpdFR5cGU7XHJcbiAgd2VidG9vbjogV2VidG9vblR5cGU7XHJcbiAgZmF2b3JhdGU6IFN0YXJlZFR5cGU7XHJcbiAgc29ydFdlYnRvb246IFNvcnRXZWJ0b29uVHlwZTtcclxuICBpbWdsb2c6IEltZ2xvZ1R5cGU7XHJcbn07XHJcbmV4cG9ydCB0eXBlIFNhdmVUeXBlID0ga2V5b2Ygc3RvcmFnZVR5cGU7XHJcblxyXG5leHBvcnQgdHlwZSBWaXNpdFR5cGUgPSB7XHJcbiAgW2tleTogbnVtYmVyXToge1xyXG4gICAgW2tleTogbnVtYmVyXTogbnVtYmVyO1xyXG4gIH1bXTtcclxufTtcclxuXHJcbmV4cG9ydCB0eXBlIFNjcm9sbFR5cGUgPSB7XHJcbiAgW2tleTogbnVtYmVyXToge1xyXG4gICAgW2tleTogbnVtYmVyXTogbnVtYmVyO1xyXG4gIH07XHJcbn07XHJcblxyXG5leHBvcnQgdHlwZSBJbWdsb2dUeXBlID0ge1xyXG4gIFtrZXk6IHN0cmluZ106IHtcclxuICAgIGltYWdlOiBzdHJpbmc7XHJcbiAgICBuYW1lOiBzdHJpbmc7XHJcbiAgfTtcclxufTtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgU29ydFdlYnRvb25UeXBlIHtcclxuICBba2V5OiBzdHJpbmddOiBudW1iZXJbXTtcclxufVxyXG5cclxuZXhwb3J0IHR5cGUgU3RhcmVkVHlwZSA9IG51bWJlcltdO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBSZWNlbnRXZWJ0b29uIHtcclxuICBpZDogbnVtYmVyO1xyXG4gIGxhc3RWaXNpdDogbnVtYmVyO1xyXG4gIG5hbWU6IHN0cmluZztcclxuICBubzogbnVtYmVyO1xyXG4gIHR5cGU6IHN0cmluZztcclxuICBub25hbWU/OiBzdHJpbmc7XHJcbiAgaW1nPzogc3RyaW5nO1xyXG59XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdlYnRvb25TdG9yZSB7XHJcbiAgcHJpdmF0ZSBzYXZlVG9TdG9yZTxUIGV4dGVuZHMgU2F2ZVR5cGU+KGtleTogVCwgdmFsdWU6IHN0b3JhZ2VUeXBlW1RdKSB7XHJcbiAgICBpZiAoa2V5ID09PSBcIndlYnRvb25cIiB8fCBrZXkgPT09IFwidmlzaXRzXCIgfHwga2V5ID09PSBcInNjcm9sbHNcIikge1xyXG4gICAgICB0aGlzLnN0b3JhZ2Uuc2V0KFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIFtrZXldOiBKU09OLnN0cmluZ2lmeSh2YWx1ZSlcclxuICAgICAgICB9LFxyXG4gICAgICAgICgpID0+IHtcclxuICAgICAgICAgIHRoaXMub3B0aW9uLmdldFVzZUJ5dGVzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICApO1xyXG4gICAgfSBlbHNlIGlmIChrZXkgPT09IFwiaW1nbG9nXCIpIHtcclxuICAgICAgd2hhbGUuc3RvcmFnZS5sb2NhbC5zZXQoXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgW2tleV06IEpTT04uc3RyaW5naWZ5KHZhbHVlKVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5vcHRpb24uZ2V0VXNlQnl0ZXMoKTtcclxuICAgICAgICB9XHJcbiAgICAgICk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB3aGFsZS5zdG9yYWdlLnN5bmMuc2V0KFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIFtrZXldOiBKU09OLnN0cmluZ2lmeSh2YWx1ZSlcclxuICAgICAgICB9LFxyXG4gICAgICAgICgpID0+IHtcclxuICAgICAgICAgIHRoaXMub3B0aW9uLmdldFVzZUJ5dGVzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIHNldERhaWx5V2VidG9vbigpIHtcclxuICAgIFdlYnRvb25SZXF1ZXN0LmdldEFsbFdlYnRvb24odGhpcy5vcHRpb24ub3JkZXJCeSkudGhlbih3ZWJ0b29ucyA9PiB7XHJcbiAgICAgIGlmICh0aGlzLm9wdGlvbi5zYXZlV2VidG9vblNvcnQpIHtcclxuICAgICAgICBpZiAoSlNPTi5zdHJpbmdpZnkodGhpcy5fc29ydFdlYnRvb24pID09PSBKU09OLnN0cmluZ2lmeSh7fSkpIHtcclxuICAgICAgICAgIE9iamVjdC5rZXlzKHdlYnRvb25zKS5mb3JFYWNoKChrZXk6IFdlZWspID0+IHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLl9zb3J0V2VidG9vbltrZXldKSB0aGlzLl9zb3J0V2VidG9vbltrZXldID0gW107XHJcbiAgICAgICAgICAgIHRoaXMuX3NvcnRXZWJ0b29uW2tleV0gPSB3ZWJ0b29uc1trZXldLm1hcCh2ID0+IHYuaWQpO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICB0aGlzLnNvcnRXZWJ0b29uID0gdGhpcy5fc29ydFdlYnRvb247XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIE9iamVjdC5rZXlzKHdlYnRvb25zKS5mb3JFYWNoKChrZXk6IFdlZWspID0+IHtcclxuICAgICAgICAgICAgY29uc3Qgc29ydGVkID0gdGhpcy5fc29ydFdlYnRvb25ba2V5XTtcclxuICAgICAgICAgICAgLy8g7KCV66CsXHJcbiAgICAgICAgICAgIHdlYnRvb25zW2tleV0uc29ydCgoYSwgYikgPT5cclxuICAgICAgICAgICAgICBzb3J0ZWQuaW5kZXhPZihhLmlkKSA+IHNvcnRlZC5pbmRleE9mKGIuaWQpID8gMSA6IC0xXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIC8vIOyDiOuhnCDsg53quLQg7Ju57Yiw7J2064KYIOyCrOudvOynhCDsm7ntiLDsnYQgc29ydFdlYnRvb27sl5Ag7KCB7JqpXHJcbiAgICAgICAgICAgIHRoaXMuX3NvcnRXZWJ0b29uW2tleV0gPSB3ZWJ0b29uc1trZXldLm1hcChpdGVtID0+IGl0ZW0uaWQpO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuc29ydFdlYnRvb24gPSB0aGlzLl9zb3J0V2VidG9vbjtcclxuICAgICAgdGhpcy5kYWlseVdlYnRvb25zID0gd2VidG9vbnM7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgb3B0aW9uOiBPcHRpb25TdG9yZTtcclxuXHJcbiAgY29uc3RydWN0b3Iob3B0aW9uOiBPcHRpb25TdG9yZSwgb25Mb2FkPzogKCkgPT4gdm9pZCkge1xyXG4gICAgdGhpcy5vcHRpb24gPSBvcHRpb247XHJcbiAgICB0aGlzLm9wdGlvbi5vbkxvYWQgPSAoKSA9PiB7XHJcbiAgICAgIHRoaXMuc3RvcmFnZS5nZXQoXHJcbiAgICAgICAgW1wid2VidG9vblwiLCBcInZpc2l0c1wiLCBcInNjcm9sbHNcIl0sXHJcbiAgICAgICAgKHsgd2VidG9vbiwgdmlzaXRzLCBzY3JvbGxzIH0pID0+IHtcclxuICAgICAgICAgIHdoYWxlLnN0b3JhZ2UubG9jYWwuZ2V0KFtcImltZ2xvZ1wiXSwgKHsgaW1nbG9nIH0pID0+IHtcclxuICAgICAgICAgICAgd2hhbGUuc3RvcmFnZS5zeW5jLmdldChcclxuICAgICAgICAgICAgICBbXCJmYXZvcmF0ZVwiLCBcInNvcnRXZWJ0b29uXCJdLFxyXG4gICAgICAgICAgICAgICh7IGZhdm9yYXRlLCBzb3J0V2VidG9vbiB9KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoc2Nyb2xscykgdGhpcy5fc2Nyb2xscyA9IEpTT04ucGFyc2Uoc2Nyb2xscyk7XHJcbiAgICAgICAgICAgICAgICBpZiAodmlzaXRzKSB0aGlzLl92aXNpdHMgPSBKU09OLnBhcnNlKHZpc2l0cyk7XHJcbiAgICAgICAgICAgICAgICBpZiAod2VidG9vbikgdGhpcy5fd2VidG9vblR5cGUgPSBKU09OLnBhcnNlKHdlYnRvb24pO1xyXG4gICAgICAgICAgICAgICAgaWYgKGZhdm9yYXRlKSB0aGlzLl9zdGFyV2VidG9vbnMgPSBKU09OLnBhcnNlKGZhdm9yYXRlKTtcclxuICAgICAgICAgICAgICAgIGlmIChzb3J0V2VidG9vbikgdGhpcy5fc29ydFdlYnRvb24gPSBKU09OLnBhcnNlKHNvcnRXZWJ0b29uKTtcclxuICAgICAgICAgICAgICAgIGlmIChpbWdsb2cpIHRoaXMuX2ltZ2xvZyA9IEpTT04ucGFyc2UoaW1nbG9nKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0UmVjZW50V2VidG9vbigpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXREYWlseVdlYnRvb24oKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0Q29tcGV0ZVdlYnRvb24oKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMub3B0aW9uLmlzQmFja2dyb3VuZCkge1xyXG4gICAgICAgICAgICAgICAgICBvYnNlcnZlKG9wdGlvbiwgXCJvcmRlckJ5XCIsIGNoYW5nZSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXREYWlseVdlYnRvb24oKTtcclxuICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgIG9ic2VydmUob3B0aW9uLCBcInNhdmVXZWJ0b29uU29ydFwiLCBjaGFuZ2UgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0RGFpbHlXZWJ0b29uKCk7XHJcbiAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgKTtcclxuICAgICAgd2hhbGUuc3RvcmFnZS5vbkNoYW5nZWQuYWRkTGlzdGVuZXIoXHJcbiAgICAgICAgKGNoYW5nZTogeyBba2V5IGluIFNhdmVUeXBlXTogd2hhbGUuc3RvcmFnZS5TdG9yYWdlQ2hhbmdlIH0sIGFyZWEpID0+IHtcclxuICAgICAgICAgIE9iamVjdC5rZXlzKGNoYW5nZSkuZm9yRWFjaCgoa2V5OiBTYXZlVHlwZSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IGNoYW5nZVtrZXldLm5ld1ZhbHVlIHx8IFwie31cIjtcclxuXHJcbiAgICAgICAgICAgIGlmIChrZXkgPT09IFwic29ydFdlYnRvb25cIiAmJiAhdmFsdWUpIHRoaXMuc2V0RGFpbHlXZWJ0b29uKCk7XHJcbiAgICAgICAgICAgIGlmIChrZXkgPT09IFwiZmF2b3JhdGVcIikge1xyXG4gICAgICAgICAgICAgIGlmICh2YWx1ZSAhPSBKU09OLnN0cmluZ2lmeSh0aGlzLl9zdGFyV2VidG9vbnMpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zdGFyV2VidG9vbnMgPSBKU09OLnBhcnNlKHZhbHVlKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSBcImltZ2xvZ1wiKSB7XHJcbiAgICAgICAgICAgICAgaWYgKHZhbHVlICE9IEpTT04uc3RyaW5naWZ5KHRoaXMuX2ltZ2xvZykpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2ltZ2xvZyA9IEpTT04ucGFyc2UodmFsdWUpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIGlmIChrZXkgPT09IFwic2Nyb2xsc1wiKSB7XHJcbiAgICAgICAgICAgICAgaWYgKHZhbHVlICE9IEpTT04uc3RyaW5naWZ5KHRoaXMuX3Njcm9sbHMpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zY3JvbGxzID0gSlNPTi5wYXJzZSh2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGtleSA9PT0gXCJ2aXNpdHNcIikge1xyXG4gICAgICAgICAgICAgIGlmICh2YWx1ZSAhPSBKU09OLnN0cmluZ2lmeSh0aGlzLl92aXNpdHMpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl92aXNpdHMgPSBKU09OLnBhcnNlKHZhbHVlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0UmVjZW50V2VidG9vbigpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIGlmIChrZXkgPT09IFwid2VidG9vblwiKSB7XHJcbiAgICAgICAgICAgICAgaWYgKHZhbHVlICE9IEpTT04uc3RyaW5naWZ5KHRoaXMuX3dlYnRvb25UeXBlKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fd2VidG9vblR5cGUgPSBKU09OLnBhcnNlKHZhbHVlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0UmVjZW50V2VidG9vbigpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIGlmIChrZXkgPT09IFwic29ydFdlYnRvb25cIikge1xyXG4gICAgICAgICAgICAgIGlmICh2YWx1ZSAhPSBKU09OLnN0cmluZ2lmeSh0aGlzLl9zb3J0V2VidG9vbikpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3NvcnRXZWJ0b29uID0gSlNPTi5wYXJzZSh2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIHRoaXMub3B0aW9uLmdldFVzZUJ5dGVzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICApO1xyXG4gICAgICBpZiAob25Mb2FkKSBvbkxvYWQoKTtcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBAY29tcHV0ZWQgZ2V0IHN0b3JhZ2UoKSB7XHJcbiAgICByZXR1cm4gd2hhbGUuc3RvcmFnZVt0aGlzLm9wdGlvbi5zdG9yZUxvY2F0aW9uXTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOuwqeusuO2VnCDsm7ntiLDsnZgg7KCc66qp6rO8IO2DgOyeheydhCDsoIDsnqXtlanri4jri6QuXHJcbiAgICovXHJcbiAgQG9ic2VydmFibGVcclxuICBwcml2YXRlIF93ZWJ0b29uVHlwZTogV2VidG9vblR5cGUgPSB7fTtcclxuXHJcbiAgQGNvbXB1dGVkXHJcbiAgcHVibGljIGdldCB3ZWJ0b29uVHlwZSgpOiBXZWJ0b29uVHlwZSB7XHJcbiAgICByZXR1cm4gdGhpcy5fd2VidG9vblR5cGU7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2V0IHdlYnRvb25UeXBlKHZhbHVlOiBXZWJ0b29uVHlwZSkge1xyXG4gICAgdGhpcy5fd2VidG9vblR5cGUgPSB2YWx1ZTtcclxuICAgIHRoaXMuc2F2ZVRvU3RvcmUoXCJ3ZWJ0b29uXCIsIHZhbHVlKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOuwqeusuO2VnCDtmozssKjsnZgg7KCV67O066W8IOyggOyepe2VqeuLiOuLpC5cclxuICAgKi9cclxuICBAb2JzZXJ2YWJsZVxyXG4gIHByaXZhdGUgX3Zpc2l0czogVmlzaXRUeXBlID0ge307XHJcblxyXG4gIEBjb21wdXRlZFxyXG4gIHB1YmxpYyBnZXQgdmlzaXRzKCk6IFZpc2l0VHlwZSB7XHJcbiAgICByZXR1cm4gdGhpcy5fdmlzaXRzO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHNldCB2aXNpdHModmFsdWU6IFZpc2l0VHlwZSkge1xyXG4gICAgdGhpcy5fdmlzaXRzID0gdmFsdWU7XHJcbiAgICB0aGlzLnNhdmVUb1N0b3JlKFwidmlzaXRzXCIsIHZhbHVlKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOyCrOyaqeyekOqwgCDrs7gg7Iqk7YGs66GkIOuNsOydtO2EsOulvCDsoIDsnqXtlanri4jri6QuXHJcbiAgICovXHJcbiAgQG9ic2VydmFibGVcclxuICBwcml2YXRlIF9zY3JvbGxzOiBTY3JvbGxUeXBlID0ge307XHJcblxyXG4gIEBjb21wdXRlZFxyXG4gIHB1YmxpYyBnZXQgc2Nyb2xscygpOiBTY3JvbGxUeXBlIHtcclxuICAgIHJldHVybiB0aGlzLl9zY3JvbGxzO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHNldCBzY3JvbGxzKHZhbHVlOiBTY3JvbGxUeXBlKSB7XHJcbiAgICB0aGlzLl9zY3JvbGxzID0gdmFsdWU7XHJcbiAgICB0aGlzLnNhdmVUb1N0b3JlKFwic2Nyb2xsc1wiLCB2YWx1ZSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDsm7ntiLAg7KCV67O066W8IOuUsOuhnCDsoIDsnqXtlanri4jri6QuXHJcbiAgICovXHJcbiAgQG9ic2VydmFibGVcclxuICBwcml2YXRlIF9pbWdsb2c6IEltZ2xvZ1R5cGUgPSB7fTtcclxuXHJcbiAgQGNvbXB1dGVkXHJcbiAgcHVibGljIGdldCBpbWdsb2coKTogSW1nbG9nVHlwZSB7XHJcbiAgICByZXR1cm4gdGhpcy5faW1nbG9nO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHNldCBpbWdsb2codmFsdWU6IEltZ2xvZ1R5cGUpIHtcclxuICAgIGlmICghdGhpcy5vcHRpb24udXNlSW1nTG9nKSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJpbWdsb2cg66+47IKs7JqpIOykkVwiKTtcclxuICAgIH1cclxuICAgIHRoaXMuX2ltZ2xvZyA9IHZhbHVlO1xyXG4gICAgdGhpcy5zYXZlVG9TdG9yZShcImltZ2xvZ1wiLCB2YWx1ZSk7XHJcbiAgfVxyXG5cclxuICBAb2JzZXJ2YWJsZVxyXG4gIHB1YmxpYyBNYXhWaWV3OiBudW1iZXIgPSAyMDtcclxuXHJcbiAgLyoqXHJcbiAgICog7LWc6re8IOybue2IsOuTpC5cclxuICAgKi9cclxuICBAb2JzZXJ2YWJsZVxyXG4gIHByaXZhdGUgX3JlY2VudFdlYnRvb246IFJlY2VudFdlYnRvb25bXSA9IFtdO1xyXG5cclxuICBAY29tcHV0ZWRcclxuICBwdWJsaWMgZ2V0IHJlY2VudFdlYnRvb24oKTogUmVjZW50V2VidG9vbltdIHtcclxuICAgIHJldHVybiB0aGlzLl9yZWNlbnRXZWJ0b29uLmZpbHRlcigoaXRlbSwgaWR4KSA9PiB7XHJcbiAgICAgIGlmIChpZHggPCB0aGlzLk1heFZpZXcpIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2V0IHJlY2VudFdlYnRvb24odmFsdWU6IFJlY2VudFdlYnRvb25bXSkge1xyXG4gICAgdGhpcy5fcmVjZW50V2VidG9vbiA9IHZhbHVlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog7JqU7J28IOuzhCDsm7ntiLBcclxuICAgKlxyXG4gICAqL1xyXG4gIEBvYnNlcnZhYmxlXHJcbiAgcHJpdmF0ZSBfZGFpbHlXZWJ0b29uczogV2VidG9vbkluZm8gPSB7fTtcclxuXHJcbiAgQGNvbXB1dGVkXHJcbiAgcHVibGljIGdldCBkYWlseVdlYnRvb25zKCk6IFdlYnRvb25JbmZvIHtcclxuICAgIHJldHVybiB0aGlzLl9kYWlseVdlYnRvb25zO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHNldCBkYWlseVdlYnRvb25zKHZhbHVlOiBXZWJ0b29uSW5mbykge1xyXG4gICAgdGhpcy5fZGFpbHlXZWJ0b29ucyA9IHZhbHVlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog7KaQ6rKo7LC+6riwIO2VnCDsm7ntiLBcclxuICAgKlxyXG4gICAqL1xyXG4gIEBvYnNlcnZhYmxlXHJcbiAgcHJpdmF0ZSBfc3RhcldlYnRvb25zOiBTdGFyZWRUeXBlID0gW107XHJcblxyXG4gIEBjb21wdXRlZFxyXG4gIHB1YmxpYyBnZXQgc3RhcldlYnRvb25zKCk6IFN0YXJlZFR5cGUge1xyXG4gICAgcmV0dXJuIHRoaXMuX3N0YXJXZWJ0b29ucztcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzZXQgc3RhcldlYnRvb25zKHZhbHVlOiBTdGFyZWRUeXBlKSB7XHJcbiAgICB0aGlzLl9zdGFyV2VidG9vbnMgPSB2YWx1ZTtcclxuICAgIHRoaXMuc2F2ZVRvU3RvcmUoXCJmYXZvcmF0ZVwiLCB2YWx1ZSk7XHJcbiAgICBjb25zb2xlLmxvZyhcImNoYW5nZSBzdGFyV2VidG9vbnNcIik7XHJcbiAgfVxyXG5cclxuICBAb2JzZXJ2YWJsZVxyXG4gIHByaXZhdGUgX3NvcnRXZWJ0b29uOiBTb3J0V2VidG9vblR5cGUgPSB7fTtcclxuXHJcbiAgQGNvbXB1dGVkXHJcbiAgcHVibGljIGdldCBzb3J0V2VidG9vbigpOiBTb3J0V2VidG9vblR5cGUge1xyXG4gICAgcmV0dXJuIHRoaXMuX3NvcnRXZWJ0b29uO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHNldCBzb3J0V2VidG9vbih2YWx1ZTogU29ydFdlYnRvb25UeXBlKSB7XHJcbiAgICB0aGlzLl9zb3J0V2VidG9vbiA9IHZhbHVlO1xyXG4gICAgdGhpcy5zYXZlVG9TdG9yZShcInNvcnRXZWJ0b29uXCIsIHZhbHVlKTtcclxuICB9XHJcblxyXG4gIEBjb21wdXRlZFxyXG4gIHB1YmxpYyBnZXQgc3RhcldlYnRvb25JbmZvKCk6IFdlYnRvb25JbmZvVHlwZVtdIHtcclxuICAgIHJldHVybiB0aGlzLmFsbFdlYnRvb24uZmlsdGVyKHdlYnRvb24gPT4ge1xyXG4gICAgICBpZiAodGhpcy5fc3RhcldlYnRvb25zLmluZGV4T2Yod2VidG9vbi5pZCkgPiAtMSkgcmV0dXJuIHRydWU7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOybue2IsCDquLDroZ3snZgg6rCc7IiYXHJcbiAgICpcclxuICAgKiBAcmVhZG9ubHlcclxuICAgKi9cclxuICBAY29tcHV0ZWQgZ2V0IHZpc2l0Q291bnQoKSB7XHJcbiAgICBsZXQgcmVzdWx0ID0gMDtcclxuICAgIE9iamVjdC5rZXlzKHRoaXMudmlzaXRzKS5mb3JFYWNoKHYgPT4ge1xyXG4gICAgICByZXN1bHQgKz0gT2JqZWN0LmtleXModGhpcy52aXNpdHNbdl0pLmxlbmd0aDtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9XHJcbiAgLyoqXHJcbiAgICog66qo65OgIOybue2IsCDrpqzsiqTtirhcclxuICAgKlxyXG4gICAqIEByZWFkb25seVxyXG4gICAqL1xyXG4gIEBjb21wdXRlZCBnZXQgYWxsV2VidG9vbigpOiBXZWJ0b29uSW5mb1R5cGVbXSB7XHJcbiAgICBjb25zdCB3ZWJ0b29uczogeyBba2V5OiBudW1iZXJdOiBXZWJ0b29uSW5mb1R5cGUgfSA9IHt9O1xyXG4gICAgT2JqZWN0LmtleXModGhpcy5fZGFpbHlXZWJ0b29ucykuZm9yRWFjaChkYXkgPT4ge1xyXG4gICAgICB0aGlzLl9kYWlseVdlYnRvb25zW2RheV0uZm9yRWFjaCh3ZWJ0b29uID0+IHtcclxuICAgICAgICBpZiAod2VidG9vbnNbd2VidG9vbi5pZF0pIHtcclxuICAgICAgICAgIGlmICh3ZWJ0b29uLmlzUmVzdCB8fCB3ZWJ0b29uLmlzVXApIHtcclxuICAgICAgICAgICAgd2VidG9vbnNbd2VidG9vbi5pZF0gPSB7XHJcbiAgICAgICAgICAgICAgLi4ud2VidG9vbnNbd2VidG9vbi5pZF0sXHJcbiAgICAgICAgICAgICAgaXNSZXN0OiB3ZWJ0b29uLmlzUmVzdCxcclxuICAgICAgICAgICAgICBpc1VwOiB3ZWJ0b29uLmlzVXBcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgd2VidG9vbnNbd2VidG9vbi5pZF0gPSB3ZWJ0b29uO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICAgIGNvbnNvbGUubG9nKFwiZ2V0IGFsbCB3ZWJ0b29uXCIpO1xyXG4gICAgY29uc3QgcmV0dXJuVmFsdWU6IFdlYnRvb25JbmZvVHlwZVtdID0gW107XHJcbiAgICBPYmplY3Qua2V5cyh3ZWJ0b29ucykuZm9yRWFjaChpZCA9PiByZXR1cm5WYWx1ZS5wdXNoKHdlYnRvb25zW2lkXSkpO1xyXG4gICAgcmV0dXJuIHJldHVyblZhbHVlLmNvbmNhdCh0aGlzLmNvbXBsZXRlV2VidG9vbnMpO1xyXG4gIH1cclxuXHJcbiAgQG9ic2VydmFibGVcclxuICBwdWJsaWMgY29tcGxldGVXZWJ0b29uczogV2VidG9vbkluZm9UeXBlW10gPSBbXTtcclxuXHJcbiAgQGFjdGlvblxyXG4gIHByaXZhdGUgc2V0Q29tcGV0ZVdlYnRvb24oKSB7XHJcbiAgICBXZWJ0b29uUmVxdWVzdC5nZXRDb21wbGV0ZVdlYnRvb24oKS50aGVuKHZhbHVlID0+IHtcclxuICAgICAgdGhpcy5jb21wbGV0ZVdlYnRvb25zID0gdmFsdWU7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIEBvYnNlcnZhYmxlIGxvYWRpbmdTdGF0dXM6IExvYWRpbmdTdGF0dXMgPSBcIm5vdCBzdGFydFwiO1xyXG5cclxuICBAYWN0aW9uXHJcbiAgcHVibGljIGFzeW5jIHNldFJlY2VudFdlYnRvb24oKSB7XHJcbiAgICBjb25zdCB3ZWJ0b29uczogUmVjZW50V2VidG9vbltdID0gW107XHJcbiAgICBjb25zdCBwcm9taXNlczogUHJvbWlzZTx2b2lkPltdID0gW107XHJcbiAgICB0aGlzLmxvYWRpbmdTdGF0dXMgPSBcInN0YXJ0XCI7XHJcbiAgICBPYmplY3Qua2V5cyh0aGlzLl92aXNpdHMpLmZvckVhY2goa2V5ID0+IHtcclxuICAgICAgT2JqZWN0LmtleXModGhpcy5fdmlzaXRzW2tleV0pLmZvckVhY2goa2V5MiA9PiB7XHJcbiAgICAgICAgaWYgKHRoaXMub3B0aW9uLmlzQmFja2dyb3VuZCkge1xyXG4gICAgICAgICAgaWYgKCF0aGlzLl93ZWJ0b29uVHlwZVtrZXldKSByZXR1cm47XHJcbiAgICAgICAgICB3ZWJ0b29ucy5wdXNoKHtcclxuICAgICAgICAgICAgaWQ6IHBhcnNlSW50KGtleSksXHJcbiAgICAgICAgICAgIGxhc3RWaXNpdDogdGhpcy5fdmlzaXRzW2tleV1ba2V5Ml0gKiAxMDAwLFxyXG4gICAgICAgICAgICBuYW1lOiB0aGlzLl93ZWJ0b29uVHlwZVtrZXldLnRpdGxlLFxyXG4gICAgICAgICAgICBubzogcGFyc2VJbnQoa2V5MiksXHJcbiAgICAgICAgICAgIHR5cGU6IHRoaXMuX3dlYnRvb25UeXBlW2tleV0udHlwZVxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIGlmICghdGhpcy5vcHRpb24udXNlSW1nTG9nIHx8ICF0aGlzLl9pbWdsb2dbYCR7a2V5fS0ke2tleTJ9YF0pIHtcclxuICAgICAgICAgIHByb21pc2VzLnB1c2goXHJcbiAgICAgICAgICAgIFdlYnRvb25SZXF1ZXN0LmdldE9wZW5HcmFwaChcclxuICAgICAgICAgICAgICB0aGlzLl93ZWJ0b29uVHlwZVtrZXldLnR5cGUsXHJcbiAgICAgICAgICAgICAgcGFyc2VJbnQoa2V5KSxcclxuICAgICAgICAgICAgICBwYXJzZUludChrZXkyKVxyXG4gICAgICAgICAgICApLnRoZW4odmFsdWUgPT4ge1xyXG4gICAgICAgICAgICAgIGlmICh2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgd2VidG9vbnMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgIGlkOiBwYXJzZUludChrZXkpLFxyXG4gICAgICAgICAgICAgICAgICBsYXN0VmlzaXQ6IHRoaXMuX3Zpc2l0c1trZXldW2tleTJdICogMTAwMCxcclxuICAgICAgICAgICAgICAgICAgbmFtZTogdGhpcy5fd2VidG9vblR5cGVba2V5XS50aXRsZSxcclxuICAgICAgICAgICAgICAgICAgbm86IHBhcnNlSW50KGtleTIpLFxyXG4gICAgICAgICAgICAgICAgICB0eXBlOiB0aGlzLl93ZWJ0b29uVHlwZVtrZXldLnR5cGUsXHJcbiAgICAgICAgICAgICAgICAgIGltZzogdmFsdWUuaW1nLFxyXG4gICAgICAgICAgICAgICAgICBub25hbWU6IHZhbHVlLnRpdGxlXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbi51c2VJbWdMb2cpIHtcclxuICAgICAgICAgICAgICAgICAgdGhpcy5faW1nbG9nW2Ake2tleX0tJHtrZXkyfWBdID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIGltYWdlOiB2YWx1ZS5pbWcucmVwbGFjZShcclxuICAgICAgICAgICAgICAgICAgICAgIFwiaHR0cHM6Ly9zaGFyZWQtY29taWMucHN0YXRpYy5uZXQvdGh1bWIvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICBcIlwiXHJcbiAgICAgICAgICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiB2YWx1ZS50aXRsZVxyXG4gICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5fdmlzaXRzW2tleV1ba2V5Ml07XHJcbiAgICAgICAgICAgICAgICB0aGlzLnZpc2l0cyA9IHRoaXMuX3Zpc2l0cztcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBjb25zdCB7IGltYWdlLCBuYW1lIH0gPSB0aGlzLl9pbWdsb2dbYCR7a2V5fS0ke2tleTJ9YF07XHJcbiAgICAgICAgICB3ZWJ0b29ucy5wdXNoKHtcclxuICAgICAgICAgICAgaWQ6IHBhcnNlSW50KGtleSksXHJcbiAgICAgICAgICAgIGxhc3RWaXNpdDogdGhpcy5fdmlzaXRzW2tleV1ba2V5Ml0gKiAxMDAwLFxyXG4gICAgICAgICAgICBuYW1lOiB0aGlzLl93ZWJ0b29uVHlwZVtrZXldLnRpdGxlLFxyXG4gICAgICAgICAgICBubzogcGFyc2VJbnQoa2V5MiksXHJcbiAgICAgICAgICAgIHR5cGU6IHRoaXMuX3dlYnRvb25UeXBlW2tleV0udHlwZSxcclxuICAgICAgICAgICAgaW1nOiBcImh0dHBzOi8vc2hhcmVkLWNvbWljLnBzdGF0aWMubmV0L3RodW1iL1wiICsgaW1hZ2UsXHJcbiAgICAgICAgICAgIG5vbmFtZTogbmFtZVxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gICAgYXdhaXQgUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xyXG4gICAgd2VidG9vbnMuc29ydCgoYSwgYikgPT4ge1xyXG4gICAgICBpZiAoYS5sYXN0VmlzaXQgPCBiLmxhc3RWaXNpdCkgcmV0dXJuIDE7XHJcbiAgICAgIHJldHVybiAtMTtcclxuICAgIH0pO1xyXG4gICAgdGhpcy5yZWNlbnRXZWJ0b29uID0gd2VidG9vbnM7XHJcbiAgICB0aGlzLmxvYWRpbmdTdGF0dXMgPSBcImVuZFwiO1xyXG4gICAgLy8gU2F2ZSB0byBDaHJvbWVcclxuICAgIGlmICh0aGlzLm9wdGlvbi51c2VJbWdMb2cgJiYgIXRoaXMub3B0aW9uLmlzQmFja2dyb3VuZClcclxuICAgICAgdGhpcy5pbWdsb2cgPSB0aGlzLl9pbWdsb2c7XHJcbiAgICB0aGlzLl92aXNpdHMgPSB0aGlzLl92aXNpdHM7XHJcbiAgICBjb25zb2xlLmxvZyh3ZWJ0b29ucyk7XHJcbiAgfVxyXG5cclxuICBAYWN0aW9uIHNldFZpc2l0c0Zyb21DaHJvbWUoKSB7XHJcbiAgICB0aGlzLmxvYWRpbmdTdGF0dXMgPSBcInN0YXJ0XCI7XHJcbiAgICB3aGFsZS5oaXN0b3J5LnNlYXJjaChcclxuICAgICAge1xyXG4gICAgICAgIHRleHQ6IFwiZGV0YWlsLm5obj90aXRsZUlkPVwiLFxyXG4gICAgICAgIHN0YXJ0VGltZTogMCxcclxuICAgICAgICBtYXhSZXN1bHRzOiA1MDAwXHJcbiAgICAgIH0sXHJcbiAgICAgIGRhdGEgPT4ge1xyXG4gICAgICAgIHRoaXMud2VidG9vblR5cGUgPSB0aGlzLnZpc2l0cyA9IHt9O1xyXG4gICAgICAgIGNvbnN0IHdlYnRvb246IFdlYnRvb25UeXBlID0ge307XHJcbiAgICAgICAgY29uc3QgdmlzaXRzOiBWaXNpdFR5cGUgPSB7fTtcclxuICAgICAgICBsZXQgaW5kZXggPSAwO1xyXG5cclxuICAgICAgICBkYXRhLmZvckVhY2goZCA9PiB7XHJcbiAgICAgICAgICBpZiAoIWQudGl0bGUgfHwgaW5kZXggPj0gdGhpcy5vcHRpb24uaGlzdG9yeU1heCkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgY29uc29sZS5sb2coZCk7XHJcbiAgICAgICAgICBjb25zdCB1cmwgPSBuZXcgVVJMKGQudXJsKTtcclxuICAgICAgICAgIGlmICh1cmwuaG9zdC5pbmRleE9mKFwibS5cIikgPiAtMSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBjb25zdCBwYXJhbXMgPSB1cmwuc2VhcmNoUGFyYW1zO1xyXG4gICAgICAgICAgY29uc3Qgd2lkID0gcGFyYW1zLmdldChcInRpdGxlSWRcIik7XHJcbiAgICAgICAgICBjb25zdCB3bm8gPSBwYXJhbXMuZ2V0KFwibm9cIik7XHJcblxyXG4gICAgICAgICAgaWYgKCF3aWQgfHwgIXdubykgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgaWYgKCF3ZWJ0b29uW3dpZF0pIHtcclxuICAgICAgICAgICAgd2VidG9vblt3aWRdID0ge307XHJcbiAgICAgICAgICAgIHZpc2l0c1t3aWRdID0ge307XHJcbiAgICAgICAgICAgIHdlYnRvb25bd2lkXS50aXRsZSA9IGQudGl0bGUuc3BsaXQoXCI6OlwiKVswXS50cmltKCk7XHJcbiAgICAgICAgICAgIHdlYnRvb25bd2lkXS50eXBlID0gdXJsLnBhdGhuYW1lLnNwbGl0KFwiL2RldGFpbC5uaG5cIilbMF07XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAoIXZpc2l0c1t3aWRdW3dub10pIHtcclxuICAgICAgICAgICAgaW5kZXgrKztcclxuICAgICAgICAgICAgdmlzaXRzW3dpZF1bd25vXSA9IE1hdGguZmxvb3IoZC5sYXN0VmlzaXRUaW1lIC8gMTAwMCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy53ZWJ0b29uVHlwZSA9IHdlYnRvb247XHJcbiAgICAgICAgdGhpcy52aXNpdHMgPSB2aXNpdHM7XHJcbiAgICAgICAgaWYgKHdpbmRvd1tcIlVJa2l0XCJdKSB7XHJcbiAgICAgICAgICBVSWtpdC5ub3RpZmljYXRpb24oXHJcbiAgICAgICAgICAgIGA8ZGl2IGNsYXNzPVwidWstdGV4dC1zbWFsbFwiPuuwqeusuOq4sOuhneyXkOyEnCDquLDroZ3snYQg67aI65+s7JmU7Iq164uI64ukLjwvZGl2PmAsXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICB0aW1lb3V0OiAyMDAwXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICApO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBMaW5rVGFyZ2V0IH0gZnJvbSBcIi4uLy4uL3N0b3JlL29wdGlvblwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGluayB7XHJcbiAgcHVibGljIHN0YXRpYyBvcGVuVXJsKGxpbmtUYXJnZXQ6IExpbmtUYXJnZXQsIGxpbms6IHN0cmluZykge1xyXG4gICAgc3dpdGNoIChsaW5rVGFyZ2V0KSB7XHJcbiAgICAgIGNhc2UgXCJDdXJyZW50XCI6XHJcbiAgICAgICAgTGluay5vcGVuQ3VycmVudFRhYihsaW5rKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcIlBvcHVwXCI6XHJcbiAgICAgICAgTGluay5vcGVuUG9wdXAobGluayk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgXCJUYWJcIjpcclxuICAgICAgICBMaW5rLm9wZW5OZXdUYWIobGluayk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgXCJTaWRlYmFyXCI6XHJcbiAgICAgICAgTGluay5vcGVuU2lkZWJhcihsaW5rKTtcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBzdGF0aWMgb3BlbkN1cnJlbnRUYWIobGluazogc3RyaW5nKSB7XHJcbiAgICB3aGFsZS50YWJzLnVwZGF0ZSh7XHJcbiAgICAgIHVybDogbGlua1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIG9wZW5OZXdUYWIobGluazogc3RyaW5nKSB7XHJcbiAgICB3aGFsZS50YWJzLmNyZWF0ZSh7XHJcbiAgICAgIHVybDogbGlua1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc3RhdGljIG9wZW5Qb3B1cChsaW5rOiBzdHJpbmcpIHtcclxuICAgIHdoYWxlLndpbmRvd3MuY3JlYXRlKHtcclxuICAgICAgdXJsOiBsaW5rLnJlcGxhY2UoXCJodHRwczovL1wiLCBcImh0dHBzOi8vbS5cIiksXHJcbiAgICAgIHdpZHRoOiA0MDAsXHJcbiAgICAgIGhlaWdodDogODAwLFxyXG4gICAgICB0eXBlOiBcInBvcHVwXCJcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHN0YXRpYyBvcGVuU2lkZWJhcihsaW5rOiBzdHJpbmcpIHtcclxuICAgIHdoYWxlLnNpZGViYXJBY3Rpb24uc2hvdyh7XHJcbiAgICAgIHJlbG9hZDogdHJ1ZSxcclxuICAgICAgdXJsOiBsaW5rLnJlcGxhY2UoXCJodHRwczovL1wiLCBcImh0dHBzOi8vbS5cIilcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgYXhpb3MgZnJvbSBcImF4aW9zXCI7XHJcbmltcG9ydCB7IFdlYnRvb25PcmRlciB9IGZyb20gXCIuLi8uLi9zdG9yZS9vcHRpb25cIjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2Ugb2dJbmZvIHtcclxuICB0aXRsZT86IHN0cmluZztcclxuICBpbWc/OiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgV2VidG9vbkluZm9UeXBlIHtcclxuICB0aXRsZT86IHN0cmluZztcclxuICBsaW5rPzogc3RyaW5nO1xyXG4gIGltZz86IHN0cmluZztcclxuICBpc1VwPzogYm9vbGVhbjtcclxuICBpc1Jlc3Q/OiBib29sZWFuO1xyXG4gIGlkPzogbnVtYmVyO1xyXG59XHJcblxyXG5leHBvcnQgdHlwZSBXZWVrID0gXCJtb25cIiB8IFwidHVlXCIgfCBcIndlZFwiIHwgXCJ0aHVcIiB8IFwiZnJpXCIgfCBcInNhdFwiIHwgXCJzdW5cIjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgV2VidG9vbkluZm8ge1xyXG4gIFtrZXk6IHN0cmluZ106IEFycmF5PFdlYnRvb25JbmZvVHlwZT47XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCB3ZWVrRGF5OiBXZWVrW10gPSBbXHJcbiAgXCJtb25cIixcclxuICBcInR1ZVwiLFxyXG4gIFwid2VkXCIsXHJcbiAgXCJ0aHVcIixcclxuICBcImZyaVwiLFxyXG4gIFwic2F0XCIsXHJcbiAgXCJzdW5cIlxyXG5dO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2VidG9vblJlcXVlc3Qge1xyXG4gIC8qKlxyXG4gICAqIO2OmOydtOyngOydmCDsgqzsp4QsIO2DgOydtO2LgOydhCDrtojrn6zsmLXri4jri6QuXHJcbiAgICogQHBhcmFtIHR5cGUg7Ju57YiwIO2DgOyehVxyXG4gICAqIEBwYXJhbSBrZXkxIOybue2IsCDrsojtmLhcclxuICAgKiBAcGFyYW0ga2V5MiDtmozssKgg67KI7Zi4XHJcbiAgICovXHJcbiAgc3RhdGljIGFzeW5jIGdldE9wZW5HcmFwaChcclxuICAgIHR5cGU6IHN0cmluZyxcclxuICAgIGtleTE6IG51bWJlcixcclxuICAgIGtleTI6IG51bWJlclxyXG4gICk6IFByb21pc2U8b2dJbmZvPiB7XHJcbiAgICBjb25zdCBvZzogb2dJbmZvID0ge307XHJcbiAgICBjb25zdCB1cmwgPSBgaHR0cHM6Ly9jb21pYy5uYXZlci5jb20ke3R5cGV9L2RldGFpbC5uaG4/dGl0bGVJZD0ke2tleTF9Jm5vPSR7a2V5Mn1gO1xyXG4gICAgY29uc3QgeyBkYXRhIH0gPSBhd2FpdCBheGlvcy5nZXQ8c3RyaW5nPih1cmwpO1xyXG4gICAgb2cudGl0bGUgPSBkYXRhLm1hdGNoKFxyXG4gICAgICAvPG1ldGEgW14+XSpwcm9wZXJ0eT1bXFxcIiddb2c6ZGVzY3JpcHRpb25bXFxcIiddIFtePl0qY29udGVudD1bXFxcIiddKFteJ15cXFwiXSs/KVtcXFwiJ11bXj5dKj4vXHJcbiAgICApWzFdO1xyXG4gICAgb2cuaW1nID0gZGF0YS5tYXRjaChcclxuICAgICAgLzxtZXRhIFtePl0qcHJvcGVydHk9W1xcXCInXW9nOmltYWdlW1xcXCInXSBbXj5dKmNvbnRlbnQ9W1xcXCInXShbXideXFxcIl0rPylbXFxcIiddW14+XSo+L1xyXG4gICAgKVsxXTtcclxuXHJcbiAgICBpZiAoXHJcbiAgICAgIG9nLnRpdGxlICYmXHJcbiAgICAgIG9nLmltZyAmJlxyXG4gICAgICBvZy5pbWcubWF0Y2goXCJodHRwczovL3NoYXJlZC1jb21pYy5wc3RhdGljLm5ldC90aHVtYi9cIilcclxuICAgIClcclxuICAgICAgcmV0dXJuIG9nO1xyXG5cclxuICAgIGNvbnNvbGUubG9nKGBPcGVuR3JhcGggZ2V0IGZhaWxlZC5gLCB1cmwsIG9nKTtcclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGFzeW5jIGdldEFsbFdlYnRvb24oc29ydDogV2VidG9vbk9yZGVyKTogUHJvbWlzZTxXZWJ0b29uSW5mbz4ge1xyXG4gICAgY29uc3QgbGluayA9IGBodHRwczovL2NvbWljLm5hdmVyLmNvbS93ZWJ0b29uL3dlZWtkYXkubmhuP29yZGVyPSR7c29ydH1gO1xyXG4gICAgY29uc3QgeyBkYXRhIH0gPSBhd2FpdCBheGlvcy5nZXQobGluayk7XHJcbiAgICBpZiAoIWRhdGEpIHtcclxuICAgICAgY29uc29sZS5sb2coYHJlcXVlc3Q6JHtsaW5rfSBFcnJvcmApO1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIGNvbnN0IHdlYnRvb25zOiBXZWJ0b29uSW5mbyA9IHt9O1xyXG4gICAgY29uc3QgcGFnZSA9IG5ldyBET01QYXJzZXIoKVxyXG4gICAgICAucGFyc2VGcm9tU3RyaW5nKGRhdGEsIFwidGV4dC9odG1sXCIpXHJcbiAgICAgIC5xdWVyeVNlbGVjdG9yKFwiZGl2LmRhaWx5X2FsbFwiKTtcclxuICAgIHdlZWtEYXkuZm9yRWFjaChkYXkgPT4ge1xyXG4gICAgICBjb25zdCBkYXlFbGVtZW50ID0gcGFnZVxyXG4gICAgICAgIC5xdWVyeVNlbGVjdG9yKFwiaDQuXCIgKyBkYXkpXHJcbiAgICAgICAgLnBhcmVudEVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChcInVsPmxpXCIpO1xyXG4gICAgICB3ZWJ0b29uc1tkYXldID0gW107XHJcbiAgICAgIGRheUVsZW1lbnQuZm9yRWFjaChlbGVtZW50ID0+IHtcclxuICAgICAgICBjb25zdCB3ZWJ0b29uOiBXZWJ0b29uSW5mb1R5cGUgPSB7fTtcclxuICAgICAgICBjb25zdCB0b29uRWxlbWVudDogSFRNTExpbmtFbGVtZW50ID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gICAgICAgICAgXCJkaXYudGh1bWI+YVwiXHJcbiAgICAgICAgKTtcclxuICAgICAgICBjb25zdCBpbWdFbGVtZW50OiBIVE1MSW1hZ2VFbGVtZW50ID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gICAgICAgICAgXCJkaXYudGh1bWI+YT5pbWdcIlxyXG4gICAgICAgICk7XHJcbiAgICAgICAgY29uc3QgdXJsID0gbmV3IFVSTCh0b29uRWxlbWVudC5ocmVmKTtcclxuICAgICAgICB3ZWJ0b29uLmltZyA9IGltZ0VsZW1lbnQuc3JjO1xyXG4gICAgICAgIHdlYnRvb24udGl0bGUgPSBpbWdFbGVtZW50LnRpdGxlO1xyXG4gICAgICAgIHdlYnRvb24ubGluayA9IGBodHRwczovL2NvbWljLm5hdmVyLmNvbSR7dXJsLnBhdGhuYW1lICsgdXJsLnNlYXJjaH1gO1xyXG4gICAgICAgIHdlYnRvb24uaXNSZXN0ID0gISF0b29uRWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiZW0uaWNvX2JyZWFrXCIpO1xyXG4gICAgICAgIHdlYnRvb24uaXNVcCA9ICEhdG9vbkVsZW1lbnQucXVlcnlTZWxlY3RvcihcImVtLmljb191cGR0XCIpO1xyXG4gICAgICAgIHdlYnRvb24uaWQgPSBwYXJzZUludCh1cmwuc2VhcmNoUGFyYW1zLmdldChcInRpdGxlSWRcIikpO1xyXG4gICAgICAgIHdlYnRvb25zW2RheV0ucHVzaCh3ZWJ0b29uKTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiB3ZWJ0b29ucztcclxuICB9XHJcblxyXG4gIHN0YXRpYyBhc3luYyBnZXRDb21wbGV0ZVdlYnRvb24oKTogUHJvbWlzZTxXZWJ0b29uSW5mb1R5cGVbXT4ge1xyXG4gICAgY29uc3QgbGluayA9IGBodHRwczovL2NvbWljLm5hdmVyLmNvbS93ZWJ0b29uL2ZpbmlzaC5uaG4/b3JkZXI9VGl0bGVOYW1lYDtcclxuICAgIGNvbnN0IHsgZGF0YSB9ID0gYXdhaXQgYXhpb3MuZ2V0KGxpbmspO1xyXG4gICAgaWYgKCFkYXRhKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKGByZXF1ZXN0OiR7bGlua30gRXJyb3JgKTtcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgICBjb25zdCB3ZWJ0b29uczogV2VidG9vbkluZm9UeXBlW10gPSBbXTtcclxuICAgIGNvbnN0IGNoaWxkV2VidG9vbnMgPSBuZXcgRE9NUGFyc2VyKClcclxuICAgICAgLnBhcnNlRnJvbVN0cmluZyhkYXRhLCBcInRleHQvaHRtbFwiKVxyXG4gICAgICAucXVlcnlTZWxlY3RvckFsbChcInVsLmltZ19saXN0PmxpXCIpO1xyXG4gICAgY2hpbGRXZWJ0b29ucy5mb3JFYWNoKGVsZW1lbnQgPT4ge1xyXG4gICAgICBjb25zdCB0b29uOiBXZWJ0b29uSW5mb1R5cGUgPSB7XHJcbiAgICAgICAgaW1nOiBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCJkaXYudGh1bWIgaW1nXCIpLmdldEF0dHJpYnV0ZShcInNyY1wiKSxcclxuICAgICAgICBpc1Jlc3Q6IGZhbHNlLFxyXG4gICAgICAgIGlzVXA6IGZhbHNlLFxyXG4gICAgICAgIHRpdGxlOiBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCJkbD5kdD5hXCIpLmdldEF0dHJpYnV0ZShcInRpdGxlXCIpLFxyXG4gICAgICAgIGxpbms6IGBodHRwczovL2NvbWljLm5hdmVyLmNvbSR7ZWxlbWVudFxyXG4gICAgICAgICAgLnF1ZXJ5U2VsZWN0b3IoXCJkbD5kdD5hXCIpXHJcbiAgICAgICAgICAuZ2V0QXR0cmlidXRlKFwiaHJlZlwiKX1gXHJcbiAgICAgIH07XHJcbiAgICAgIHRvb24uaWQgPSBwYXJzZUludChuZXcgVVJMKHRvb24ubGluaykuc2VhcmNoUGFyYW1zLmdldChcInRpdGxlSWRcIikpO1xyXG4gICAgICB3ZWJ0b29ucy5wdXNoKHRvb24pO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gd2VidG9vbnM7XHJcbiAgfVxyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=