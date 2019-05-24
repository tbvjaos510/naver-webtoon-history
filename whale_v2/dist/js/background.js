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
function default_1(webtoon, option) {
    whale.runtime.onInstalled.addListener(details => {
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
        }, onLoad && onLoad());
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvYWRhcHRlcnMveGhyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvYXhpb3MuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jYW5jZWwvQ2FuY2VsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY2FuY2VsL0NhbmNlbFRva2VuLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY2FuY2VsL2lzQ2FuY2VsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9BeGlvcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvSW50ZXJjZXB0b3JNYW5hZ2VyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9jcmVhdGVFcnJvci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvZGlzcGF0Y2hSZXF1ZXN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9lbmhhbmNlRXJyb3IuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL3NldHRsZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvdHJhbnNmb3JtRGF0YS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2RlZmF1bHRzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9iaW5kLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9idG9hLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9idWlsZFVSTC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvY29tYmluZVVSTHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2Nvb2tpZXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2lzQWJzb2x1dGVVUkwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2lzVVJMU2FtZU9yaWdpbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvbm9ybWFsaXplSGVhZGVyTmFtZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvcGFyc2VIZWFkZXJzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9zcHJlYWQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi91dGlscy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvaXMtYnVmZmVyL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9tb2J4L2xpYi9tb2J4Lm1vZHVsZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzIiwid2VicGFjazovLy8od2VicGFjaykvYnVpbGRpbi9nbG9iYWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JhY2tncm91bmQvYmFja2dyb3VuZC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvYmFja2dyb3VuZC9ydW50aW1lL21pZ3JhdGlvbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvYmFja2dyb3VuZC9ydW50aW1lL29uSW5zdGFsbC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvYmFja2dyb3VuZC9ydW50aW1lL29uTWVzc2FnZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvYmFja2dyb3VuZC90YWIvaGlzdG9yeS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvYmFja2dyb3VuZC90YWIvdXRpbGl0eS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc3RvcmUvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0b3JlL29wdGlvbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc3RvcmUvd2VidG9vbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdG9vbHMvcmVxdWVzdC9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNsRkEsaUJBQWlCLG1CQUFPLENBQUMsc0RBQWEsRTs7Ozs7Ozs7Ozs7O0FDQXpCOztBQUViLFlBQVksbUJBQU8sQ0FBQyxxREFBWTtBQUNoQyxhQUFhLG1C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QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNJQUFzSSwyQkFBMkI7QUFDaks7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdEQUFnRDtBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLE9BQU87QUFDN0I7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsaUJBQWlCO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLFlBQVk7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsa0NBQWtDO0FBQzlEO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQix3QkFBd0I7QUFDbEQsUUFBUSxJQUFxQztBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSw0QkFBNEI7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsS0FBcUM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxJQUFJLEtBQXFDO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QTtBQUNBLGdEQUFnRCx3QkFBd0IsRUFBRTtBQUMxRTtBQUNBO0FBQ0EsZ0RBQWdELDRCQUE0QixFQUFFO0FBQzlFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEMscUJBQXFCLEVBQUU7QUFDckU7QUFDQSxtQkFBbUIsS0FBcUM7QUFDeEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLEtBQXFDO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLEtBQXFDO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLEtBQXFDO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLEtBQXFDO0FBQzVEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxLQUFxQztBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDO0FBQ2xDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpRkFBaUY7QUFDakY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGtFQUFrRTtBQUNsRTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtREFBbUQ7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksYUFBb0I7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxxQ0FBcUM7QUFDckM7QUFDQSxRQUFRLGFBQW9CO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxLQUFLO0FBQ0w7O0FBRWl1RDs7Ozs7Ozs7Ozs7OztBQ3B5SWp1RDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFD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RTtpQkFDbEMsZUFBZSxDQUFDLElBQUksRUFBRSxXQUFXLENBQUM7aUJBQ2xDLGdCQUFnQixDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFDdEMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRTtnQkFDOUIsTUFBTSxJQUFJLEdBQW9CO29CQUM1QixHQUFHLEVBQUUsT0FBTyxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUMsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDO29CQUMvRCxNQUFNLEVBQUUsS0FBSztvQkFDYixJQUFJLEVBQUUsS0FBSztvQkFDWCxLQUFLLEVBQUUsT0FBTyxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDO29CQUM3RCxJQUFJLEVBQUUsMEJBQTBCLE9BQU87eUJBQ3BDLGFBQWEsQ0FBQyxTQUFTLENBQUM7eUJBQ3hCLFlBQVksQ0FBQyxNQUFNLENBQUMsRUFBRTtpQkFDMUIsQ0FBQztnQkFDRixJQUFJLENBQUMsRUFBRSxHQUFHLFFBQVEsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO2dCQUNuRSxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3RCLENBQUMsQ0FBQyxDQUFDO1lBQ0gsT0FBTyxRQUFRLENBQUM7UUFDbEIsQ0FBQztLQUFBO0NBQ0Y7QUFoR0QsaUNBZ0dDIiwiZmlsZSI6ImJhY2tncm91bmQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9iYWNrZ3JvdW5kL2JhY2tncm91bmQudHNcIik7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vbGliL2F4aW9zJyk7IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG52YXIgc2V0dGxlID0gcmVxdWlyZSgnLi8uLi9jb3JlL3NldHRsZScpO1xudmFyIGJ1aWxkVVJMID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL2J1aWxkVVJMJyk7XG52YXIgcGFyc2VIZWFkZXJzID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL3BhcnNlSGVhZGVycycpO1xudmFyIGlzVVJMU2FtZU9yaWdpbiA9IHJlcXVpcmUoJy4vLi4vaGVscGVycy9pc1VSTFNhbWVPcmlnaW4nKTtcbnZhciBjcmVhdGVFcnJvciA9IHJlcXVpcmUoJy4uL2NvcmUvY3JlYXRlRXJyb3InKTtcbnZhciBidG9hID0gKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5idG9hICYmIHdpbmRvdy5idG9hLmJpbmQod2luZG93KSkgfHwgcmVxdWlyZSgnLi8uLi9oZWxwZXJzL2J0b2EnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB4aHJBZGFwdGVyKGNvbmZpZykge1xuICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gZGlzcGF0Y2hYaHJSZXF1ZXN0KHJlc29sdmUsIHJlamVjdCkge1xuICAgIHZhciByZXF1ZXN0RGF0YSA9IGNvbmZpZy5kYXRhO1xuICAgIHZhciByZXF1ZXN0SGVhZGVycyA9IGNvbmZpZy5oZWFkZXJzO1xuXG4gICAgaWYgKHV0aWxzLmlzRm9ybURhdGEocmVxdWVzdERhdGEpKSB7XG4gICAgICBkZWxldGUgcmVxdWVzdEhlYWRlcnNbJ0NvbnRlbnQtVHlwZSddOyAvLyBMZXQgdGhlIGJyb3dzZXIgc2V0IGl0XG4gICAgfVxuXG4gICAgdmFyIHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICB2YXIgbG9hZEV2ZW50ID0gJ29ucmVhZHlzdGF0ZWNoYW5nZSc7XG4gICAgdmFyIHhEb21haW4gPSBmYWxzZTtcblxuICAgIC8vIEZvciBJRSA4LzkgQ09SUyBzdXBwb3J0XG4gICAgLy8gT25seSBzdXBwb3J0cyBQT1NUIGFuZCBHRVQgY2FsbHMgYW5kIGRvZXNuJ3QgcmV0dXJucyB0aGUgcmVzcG9uc2UgaGVhZGVycy5cbiAgICAvLyBET04nVCBkbyB0aGlzIGZvciB0ZXN0aW5nIGIvYyBYTUxIdHRwUmVxdWVzdCBpcyBtb2NrZWQsIG5vdCBYRG9tYWluUmVxdWVzdC5cbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICd0ZXN0JyAmJlxuICAgICAgICB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAgICB3aW5kb3cuWERvbWFpblJlcXVlc3QgJiYgISgnd2l0aENyZWRlbnRpYWxzJyBpbiByZXF1ZXN0KSAmJlxuICAgICAgICAhaXNVUkxTYW1lT3JpZ2luKGNvbmZpZy51cmwpKSB7XG4gICAgICByZXF1ZXN0ID0gbmV3IHdpbmRvdy5YRG9tYWluUmVxdWVzdCgpO1xuICAgICAgbG9hZEV2ZW50ID0gJ29ubG9hZCc7XG4gICAgICB4RG9tYWluID0gdHJ1ZTtcbiAgICAgIHJlcXVlc3Qub25wcm9ncmVzcyA9IGZ1bmN0aW9uIGhhbmRsZVByb2dyZXNzKCkge307XG4gICAgICByZXF1ZXN0Lm9udGltZW91dCA9IGZ1bmN0aW9uIGhhbmRsZVRpbWVvdXQoKSB7fTtcbiAgICB9XG5cbiAgICAvLyBIVFRQIGJhc2ljIGF1dGhlbnRpY2F0aW9uXG4gICAgaWYgKGNvbmZpZy5hdXRoKSB7XG4gICAgICB2YXIgdXNlcm5hbWUgPSBjb25maWcuYXV0aC51c2VybmFtZSB8fCAnJztcbiAgICAgIHZhciBwYXNzd29yZCA9IGNvbmZpZy5hdXRoLnBhc3N3b3JkIHx8ICcnO1xuICAgICAgcmVxdWVzdEhlYWRlcnMuQXV0aG9yaXphdGlvbiA9ICdCYXNpYyAnICsgYnRvYSh1c2VybmFtZSArICc6JyArIHBhc3N3b3JkKTtcbiAgICB9XG5cbiAgICByZXF1ZXN0Lm9wZW4oY29uZmlnLm1ldGhvZC50b1VwcGVyQ2FzZSgpLCBidWlsZFVSTChjb25maWcudXJsLCBjb25maWcucGFyYW1zLCBjb25maWcucGFyYW1zU2VyaWFsaXplciksIHRydWUpO1xuXG4gICAgLy8gU2V0IHRoZSByZXF1ZXN0IHRpbWVvdXQgaW4gTVNcbiAgICByZXF1ZXN0LnRpbWVvdXQgPSBjb25maWcudGltZW91dDtcblxuICAgIC8vIExpc3RlbiBmb3IgcmVhZHkgc3RhdGVcbiAgICByZXF1ZXN0W2xvYWRFdmVudF0gPSBmdW5jdGlvbiBoYW5kbGVMb2FkKCkge1xuICAgICAgaWYgKCFyZXF1ZXN0IHx8IChyZXF1ZXN0LnJlYWR5U3RhdGUgIT09IDQgJiYgIXhEb21haW4pKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gVGhlIHJlcXVlc3QgZXJyb3JlZCBvdXQgYW5kIHdlIGRpZG4ndCBnZXQgYSByZXNwb25zZSwgdGhpcyB3aWxsIGJlXG4gICAgICAvLyBoYW5kbGVkIGJ5IG9uZXJyb3IgaW5zdGVhZFxuICAgICAgLy8gV2l0aCBvbmUgZXhjZXB0aW9uOiByZXF1ZXN0IHRoYXQgdXNpbmcgZmlsZTogcHJvdG9jb2wsIG1vc3QgYnJvd3NlcnNcbiAgICAgIC8vIHdpbGwgcmV0dXJuIHN0YXR1cyBhcyAwIGV2ZW4gdGhvdWdoIGl0J3MgYSBzdWNjZXNzZnVsIHJlcXVlc3RcbiAgICAgIGlmIChyZXF1ZXN0LnN0YXR1cyA9PT0gMCAmJiAhKHJlcXVlc3QucmVzcG9uc2VVUkwgJiYgcmVxdWVzdC5yZXNwb25zZVVSTC5pbmRleE9mKCdmaWxlOicpID09PSAwKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIFByZXBhcmUgdGhlIHJlc3BvbnNlXG4gICAgICB2YXIgcmVzcG9uc2VIZWFkZXJzID0gJ2dldEFsbFJlc3BvbnNlSGVhZGVycycgaW4gcmVxdWVzdCA/IHBhcnNlSGVhZGVycyhyZXF1ZXN0LmdldEFsbFJlc3BvbnNlSGVhZGVycygpKSA6IG51bGw7XG4gICAgICB2YXIgcmVzcG9uc2VEYXRhID0gIWNvbmZpZy5yZXNwb25zZVR5cGUgfHwgY29uZmlnLnJlc3BvbnNlVHlwZSA9PT0gJ3RleHQnID8gcmVxdWVzdC5yZXNwb25zZVRleHQgOiByZXF1ZXN0LnJlc3BvbnNlO1xuICAgICAgdmFyIHJlc3BvbnNlID0ge1xuICAgICAgICBkYXRhOiByZXNwb25zZURhdGEsXG4gICAgICAgIC8vIElFIHNlbmRzIDEyMjMgaW5zdGVhZCBvZiAyMDQgKGh0dHBzOi8vZ2l0aHViLmNvbS9heGlvcy9heGlvcy9pc3N1ZXMvMjAxKVxuICAgICAgICBzdGF0dXM6IHJlcXVlc3Quc3RhdHVzID09PSAxMjIzID8gMjA0IDogcmVxdWVzdC5zdGF0dXMsXG4gICAgICAgIHN0YXR1c1RleHQ6IHJlcXVlc3Quc3RhdHVzID09PSAxMjIzID8gJ05vIENvbnRlbnQnIDogcmVxdWVzdC5zdGF0dXNUZXh0LFxuICAgICAgICBoZWFkZXJzOiByZXNwb25zZUhlYWRlcnMsXG4gICAgICAgIGNvbmZpZzogY29uZmlnLFxuICAgICAgICByZXF1ZXN0OiByZXF1ZXN0XG4gICAgICB9O1xuXG4gICAgICBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCByZXNwb25zZSk7XG5cbiAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgIH07XG5cbiAgICAvLyBIYW5kbGUgbG93IGxldmVsIG5ldHdvcmsgZXJyb3JzXG4gICAgcmVxdWVzdC5vbmVycm9yID0gZnVuY3Rpb24gaGFuZGxlRXJyb3IoKSB7XG4gICAgICAvLyBSZWFsIGVycm9ycyBhcmUgaGlkZGVuIGZyb20gdXMgYnkgdGhlIGJyb3dzZXJcbiAgICAgIC8vIG9uZXJyb3Igc2hvdWxkIG9ubHkgZmlyZSBpZiBpdCdzIGEgbmV0d29yayBlcnJvclxuICAgICAgcmVqZWN0KGNyZWF0ZUVycm9yKCdOZXR3b3JrIEVycm9yJywgY29uZmlnLCBudWxsLCByZXF1ZXN0KSk7XG5cbiAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgIH07XG5cbiAgICAvLyBIYW5kbGUgdGltZW91dFxuICAgIHJlcXVlc3Qub250aW1lb3V0ID0gZnVuY3Rpb24gaGFuZGxlVGltZW91dCgpIHtcbiAgICAgIHJlamVjdChjcmVhdGVFcnJvcigndGltZW91dCBvZiAnICsgY29uZmlnLnRpbWVvdXQgKyAnbXMgZXhjZWVkZWQnLCBjb25maWcsICdFQ09OTkFCT1JURUQnLFxuICAgICAgICByZXF1ZXN0KSk7XG5cbiAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgIH07XG5cbiAgICAvLyBBZGQgeHNyZiBoZWFkZXJcbiAgICAvLyBUaGlzIGlzIG9ubHkgZG9uZSBpZiBydW5uaW5nIGluIGEgc3RhbmRhcmQgYnJvd3NlciBlbnZpcm9ubWVudC5cbiAgICAvLyBTcGVjaWZpY2FsbHkgbm90IGlmIHdlJ3JlIGluIGEgd2ViIHdvcmtlciwgb3IgcmVhY3QtbmF0aXZlLlxuICAgIGlmICh1dGlscy5pc1N0YW5kYXJkQnJvd3NlckVudigpKSB7XG4gICAgICB2YXIgY29va2llcyA9IHJlcXVpcmUoJy4vLi4vaGVscGVycy9jb29raWVzJyk7XG5cbiAgICAgIC8vIEFkZCB4c3JmIGhlYWRlclxuICAgICAgdmFyIHhzcmZWYWx1ZSA9IChjb25maWcud2l0aENyZWRlbnRpYWxzIHx8IGlzVVJMU2FtZU9yaWdpbihjb25maWcudXJsKSkgJiYgY29uZmlnLnhzcmZDb29raWVOYW1lID9cbiAgICAgICAgICBjb29raWVzLnJlYWQoY29uZmlnLnhzcmZDb29raWVOYW1lKSA6XG4gICAgICAgICAgdW5kZWZpbmVkO1xuXG4gICAgICBpZiAoeHNyZlZhbHVlKSB7XG4gICAgICAgIHJlcXVlc3RIZWFkZXJzW2NvbmZpZy54c3JmSGVhZGVyTmFtZV0gPSB4c3JmVmFsdWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gQWRkIGhlYWRlcnMgdG8gdGhlIHJlcXVlc3RcbiAgICBpZiAoJ3NldFJlcXVlc3RIZWFkZXInIGluIHJlcXVlc3QpIHtcbiAgICAgIHV0aWxzLmZvckVhY2gocmVxdWVzdEhlYWRlcnMsIGZ1bmN0aW9uIHNldFJlcXVlc3RIZWFkZXIodmFsLCBrZXkpIHtcbiAgICAgICAgaWYgKHR5cGVvZiByZXF1ZXN0RGF0YSA9PT0gJ3VuZGVmaW5lZCcgJiYga2V5LnRvTG93ZXJDYXNlKCkgPT09ICdjb250ZW50LXR5cGUnKSB7XG4gICAgICAgICAgLy8gUmVtb3ZlIENvbnRlbnQtVHlwZSBpZiBkYXRhIGlzIHVuZGVmaW5lZFxuICAgICAgICAgIGRlbGV0ZSByZXF1ZXN0SGVhZGVyc1trZXldO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIE90aGVyd2lzZSBhZGQgaGVhZGVyIHRvIHRoZSByZXF1ZXN0XG4gICAgICAgICAgcmVxdWVzdC5zZXRSZXF1ZXN0SGVhZGVyKGtleSwgdmFsKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gQWRkIHdpdGhDcmVkZW50aWFscyB0byByZXF1ZXN0IGlmIG5lZWRlZFxuICAgIGlmIChjb25maWcud2l0aENyZWRlbnRpYWxzKSB7XG4gICAgICByZXF1ZXN0LndpdGhDcmVkZW50aWFscyA9IHRydWU7XG4gICAgfVxuXG4gICAgLy8gQWRkIHJlc3BvbnNlVHlwZSB0byByZXF1ZXN0IGlmIG5lZWRlZFxuICAgIGlmIChjb25maWcucmVzcG9uc2VUeXBlKSB7XG4gICAgICB0cnkge1xuICAgICAgICByZXF1ZXN0LnJlc3BvbnNlVHlwZSA9IGNvbmZpZy5yZXNwb25zZVR5cGU7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIEV4cGVjdGVkIERPTUV4Y2VwdGlvbiB0aHJvd24gYnkgYnJvd3NlcnMgbm90IGNvbXBhdGlibGUgWE1MSHR0cFJlcXVlc3QgTGV2ZWwgMi5cbiAgICAgICAgLy8gQnV0LCB0aGlzIGNhbiBiZSBzdXBwcmVzc2VkIGZvciAnanNvbicgdHlwZSBhcyBpdCBjYW4gYmUgcGFyc2VkIGJ5IGRlZmF1bHQgJ3RyYW5zZm9ybVJlc3BvbnNlJyBmdW5jdGlvbi5cbiAgICAgICAgaWYgKGNvbmZpZy5yZXNwb25zZVR5cGUgIT09ICdqc29uJykge1xuICAgICAgICAgIHRocm93IGU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBIYW5kbGUgcHJvZ3Jlc3MgaWYgbmVlZGVkXG4gICAgaWYgKHR5cGVvZiBjb25maWcub25Eb3dubG9hZFByb2dyZXNzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoJ3Byb2dyZXNzJywgY29uZmlnLm9uRG93bmxvYWRQcm9ncmVzcyk7XG4gICAgfVxuXG4gICAgLy8gTm90IGFsbCBicm93c2VycyBzdXBwb3J0IHVwbG9hZCBldmVudHNcbiAgICBpZiAodHlwZW9mIGNvbmZpZy5vblVwbG9hZFByb2dyZXNzID09PSAnZnVuY3Rpb24nICYmIHJlcXVlc3QudXBsb2FkKSB7XG4gICAgICByZXF1ZXN0LnVwbG9hZC5hZGRFdmVudExpc3RlbmVyKCdwcm9ncmVzcycsIGNvbmZpZy5vblVwbG9hZFByb2dyZXNzKTtcbiAgICB9XG5cbiAgICBpZiAoY29uZmlnLmNhbmNlbFRva2VuKSB7XG4gICAgICAvLyBIYW5kbGUgY2FuY2VsbGF0aW9uXG4gICAgICBjb25maWcuY2FuY2VsVG9rZW4ucHJvbWlzZS50aGVuKGZ1bmN0aW9uIG9uQ2FuY2VsZWQoY2FuY2VsKSB7XG4gICAgICAgIGlmICghcmVxdWVzdCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlcXVlc3QuYWJvcnQoKTtcbiAgICAgICAgcmVqZWN0KGNhbmNlbCk7XG4gICAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAocmVxdWVzdERhdGEgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmVxdWVzdERhdGEgPSBudWxsO1xuICAgIH1cblxuICAgIC8vIFNlbmQgdGhlIHJlcXVlc3RcbiAgICByZXF1ZXN0LnNlbmQocmVxdWVzdERhdGEpO1xuICB9KTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcbnZhciBiaW5kID0gcmVxdWlyZSgnLi9oZWxwZXJzL2JpbmQnKTtcbnZhciBBeGlvcyA9IHJlcXVpcmUoJy4vY29yZS9BeGlvcycpO1xudmFyIGRlZmF1bHRzID0gcmVxdWlyZSgnLi9kZWZhdWx0cycpO1xuXG4vKipcbiAqIENyZWF0ZSBhbiBpbnN0YW5jZSBvZiBBeGlvc1xuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBkZWZhdWx0Q29uZmlnIFRoZSBkZWZhdWx0IGNvbmZpZyBmb3IgdGhlIGluc3RhbmNlXG4gKiBAcmV0dXJuIHtBeGlvc30gQSBuZXcgaW5zdGFuY2Ugb2YgQXhpb3NcbiAqL1xuZnVuY3Rpb24gY3JlYXRlSW5zdGFuY2UoZGVmYXVsdENvbmZpZykge1xuICB2YXIgY29udGV4dCA9IG5ldyBBeGlvcyhkZWZhdWx0Q29uZmlnKTtcbiAgdmFyIGluc3RhbmNlID0gYmluZChBeGlvcy5wcm90b3R5cGUucmVxdWVzdCwgY29udGV4dCk7XG5cbiAgLy8gQ29weSBheGlvcy5wcm90b3R5cGUgdG8gaW5zdGFuY2VcbiAgdXRpbHMuZXh0ZW5kKGluc3RhbmNlLCBBeGlvcy5wcm90b3R5cGUsIGNvbnRleHQpO1xuXG4gIC8vIENvcHkgY29udGV4dCB0byBpbnN0YW5jZVxuICB1dGlscy5leHRlbmQoaW5zdGFuY2UsIGNvbnRleHQpO1xuXG4gIHJldHVybiBpbnN0YW5jZTtcbn1cblxuLy8gQ3JlYXRlIHRoZSBkZWZhdWx0IGluc3RhbmNlIHRvIGJlIGV4cG9ydGVkXG52YXIgYXhpb3MgPSBjcmVhdGVJbnN0YW5jZShkZWZhdWx0cyk7XG5cbi8vIEV4cG9zZSBBeGlvcyBjbGFzcyB0byBhbGxvdyBjbGFzcyBpbmhlcml0YW5jZVxuYXhpb3MuQXhpb3MgPSBBeGlvcztcblxuLy8gRmFjdG9yeSBmb3IgY3JlYXRpbmcgbmV3IGluc3RhbmNlc1xuYXhpb3MuY3JlYXRlID0gZnVuY3Rpb24gY3JlYXRlKGluc3RhbmNlQ29uZmlnKSB7XG4gIHJldHVybiBjcmVhdGVJbnN0YW5jZSh1dGlscy5tZXJnZShkZWZhdWx0cywgaW5zdGFuY2VDb25maWcpKTtcbn07XG5cbi8vIEV4cG9zZSBDYW5jZWwgJiBDYW5jZWxUb2tlblxuYXhpb3MuQ2FuY2VsID0gcmVxdWlyZSgnLi9jYW5jZWwvQ2FuY2VsJyk7XG5heGlvcy5DYW5jZWxUb2tlbiA9IHJlcXVpcmUoJy4vY2FuY2VsL0NhbmNlbFRva2VuJyk7XG5heGlvcy5pc0NhbmNlbCA9IHJlcXVpcmUoJy4vY2FuY2VsL2lzQ2FuY2VsJyk7XG5cbi8vIEV4cG9zZSBhbGwvc3ByZWFkXG5heGlvcy5hbGwgPSBmdW5jdGlvbiBhbGwocHJvbWlzZXMpIHtcbiAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKTtcbn07XG5heGlvcy5zcHJlYWQgPSByZXF1aXJlKCcuL2hlbHBlcnMvc3ByZWFkJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gYXhpb3M7XG5cbi8vIEFsbG93IHVzZSBvZiBkZWZhdWx0IGltcG9ydCBzeW50YXggaW4gVHlwZVNjcmlwdFxubW9kdWxlLmV4cG9ydHMuZGVmYXVsdCA9IGF4aW9zO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIEEgYENhbmNlbGAgaXMgYW4gb2JqZWN0IHRoYXQgaXMgdGhyb3duIHdoZW4gYW4gb3BlcmF0aW9uIGlzIGNhbmNlbGVkLlxuICpcbiAqIEBjbGFzc1xuICogQHBhcmFtIHtzdHJpbmc9fSBtZXNzYWdlIFRoZSBtZXNzYWdlLlxuICovXG5mdW5jdGlvbiBDYW5jZWwobWVzc2FnZSkge1xuICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xufVxuXG5DYW5jZWwucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gIHJldHVybiAnQ2FuY2VsJyArICh0aGlzLm1lc3NhZ2UgPyAnOiAnICsgdGhpcy5tZXNzYWdlIDogJycpO1xufTtcblxuQ2FuY2VsLnByb3RvdHlwZS5fX0NBTkNFTF9fID0gdHJ1ZTtcblxubW9kdWxlLmV4cG9ydHMgPSBDYW5jZWw7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBDYW5jZWwgPSByZXF1aXJlKCcuL0NhbmNlbCcpO1xuXG4vKipcbiAqIEEgYENhbmNlbFRva2VuYCBpcyBhbiBvYmplY3QgdGhhdCBjYW4gYmUgdXNlZCB0byByZXF1ZXN0IGNhbmNlbGxhdGlvbiBvZiBhbiBvcGVyYXRpb24uXG4gKlxuICogQGNsYXNzXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBleGVjdXRvciBUaGUgZXhlY3V0b3IgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIENhbmNlbFRva2VuKGV4ZWN1dG9yKSB7XG4gIGlmICh0eXBlb2YgZXhlY3V0b3IgIT09ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdleGVjdXRvciBtdXN0IGJlIGEgZnVuY3Rpb24uJyk7XG4gIH1cblxuICB2YXIgcmVzb2x2ZVByb21pc2U7XG4gIHRoaXMucHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uIHByb21pc2VFeGVjdXRvcihyZXNvbHZlKSB7XG4gICAgcmVzb2x2ZVByb21pc2UgPSByZXNvbHZlO1xuICB9KTtcblxuICB2YXIgdG9rZW4gPSB0aGlzO1xuICBleGVjdXRvcihmdW5jdGlvbiBjYW5jZWwobWVzc2FnZSkge1xuICAgIGlmICh0b2tlbi5yZWFzb24pIHtcbiAgICAgIC8vIENhbmNlbGxhdGlvbiBoYXMgYWxyZWFkeSBiZWVuIHJlcXVlc3RlZFxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRva2VuLnJlYXNvbiA9IG5ldyBDYW5jZWwobWVzc2FnZSk7XG4gICAgcmVzb2x2ZVByb21pc2UodG9rZW4ucmVhc29uKTtcbiAgfSk7XG59XG5cbi8qKlxuICogVGhyb3dzIGEgYENhbmNlbGAgaWYgY2FuY2VsbGF0aW9uIGhhcyBiZWVuIHJlcXVlc3RlZC5cbiAqL1xuQ2FuY2VsVG9rZW4ucHJvdG90eXBlLnRocm93SWZSZXF1ZXN0ZWQgPSBmdW5jdGlvbiB0aHJvd0lmUmVxdWVzdGVkKCkge1xuICBpZiAodGhpcy5yZWFzb24pIHtcbiAgICB0aHJvdyB0aGlzLnJlYXNvbjtcbiAgfVxufTtcblxuLyoqXG4gKiBSZXR1cm5zIGFuIG9iamVjdCB0aGF0IGNvbnRhaW5zIGEgbmV3IGBDYW5jZWxUb2tlbmAgYW5kIGEgZnVuY3Rpb24gdGhhdCwgd2hlbiBjYWxsZWQsXG4gKiBjYW5jZWxzIHRoZSBgQ2FuY2VsVG9rZW5gLlxuICovXG5DYW5jZWxUb2tlbi5zb3VyY2UgPSBmdW5jdGlvbiBzb3VyY2UoKSB7XG4gIHZhciBjYW5jZWw7XG4gIHZhciB0b2tlbiA9IG5ldyBDYW5jZWxUb2tlbihmdW5jdGlvbiBleGVjdXRvcihjKSB7XG4gICAgY2FuY2VsID0gYztcbiAgfSk7XG4gIHJldHVybiB7XG4gICAgdG9rZW46IHRva2VuLFxuICAgIGNhbmNlbDogY2FuY2VsXG4gIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IENhbmNlbFRva2VuO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlzQ2FuY2VsKHZhbHVlKSB7XG4gIHJldHVybiAhISh2YWx1ZSAmJiB2YWx1ZS5fX0NBTkNFTF9fKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBkZWZhdWx0cyA9IHJlcXVpcmUoJy4vLi4vZGVmYXVsdHMnKTtcbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcbnZhciBJbnRlcmNlcHRvck1hbmFnZXIgPSByZXF1aXJlKCcuL0ludGVyY2VwdG9yTWFuYWdlcicpO1xudmFyIGRpc3BhdGNoUmVxdWVzdCA9IHJlcXVpcmUoJy4vZGlzcGF0Y2hSZXF1ZXN0Jyk7XG5cbi8qKlxuICogQ3JlYXRlIGEgbmV3IGluc3RhbmNlIG9mIEF4aW9zXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlQ29uZmlnIFRoZSBkZWZhdWx0IGNvbmZpZyBmb3IgdGhlIGluc3RhbmNlXG4gKi9cbmZ1bmN0aW9uIEF4aW9zKGluc3RhbmNlQ29uZmlnKSB7XG4gIHRoaXMuZGVmYXVsdHMgPSBpbnN0YW5jZUNvbmZpZztcbiAgdGhpcy5pbnRlcmNlcHRvcnMgPSB7XG4gICAgcmVxdWVzdDogbmV3IEludGVyY2VwdG9yTWFuYWdlcigpLFxuICAgIHJlc3BvbnNlOiBuZXcgSW50ZXJjZXB0b3JNYW5hZ2VyKClcbiAgfTtcbn1cblxuLyoqXG4gKiBEaXNwYXRjaCBhIHJlcXVlc3RcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIFRoZSBjb25maWcgc3BlY2lmaWMgZm9yIHRoaXMgcmVxdWVzdCAobWVyZ2VkIHdpdGggdGhpcy5kZWZhdWx0cylcbiAqL1xuQXhpb3MucHJvdG90eXBlLnJlcXVlc3QgPSBmdW5jdGlvbiByZXF1ZXN0KGNvbmZpZykge1xuICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgLy8gQWxsb3cgZm9yIGF4aW9zKCdleGFtcGxlL3VybCdbLCBjb25maWddKSBhIGxhIGZldGNoIEFQSVxuICBpZiAodHlwZW9mIGNvbmZpZyA9PT0gJ3N0cmluZycpIHtcbiAgICBjb25maWcgPSB1dGlscy5tZXJnZSh7XG4gICAgICB1cmw6IGFyZ3VtZW50c1swXVxuICAgIH0sIGFyZ3VtZW50c1sxXSk7XG4gIH1cblxuICBjb25maWcgPSB1dGlscy5tZXJnZShkZWZhdWx0cywge21ldGhvZDogJ2dldCd9LCB0aGlzLmRlZmF1bHRzLCBjb25maWcpO1xuICBjb25maWcubWV0aG9kID0gY29uZmlnLm1ldGhvZC50b0xvd2VyQ2FzZSgpO1xuXG4gIC8vIEhvb2sgdXAgaW50ZXJjZXB0b3JzIG1pZGRsZXdhcmVcbiAgdmFyIGNoYWluID0gW2Rpc3BhdGNoUmVxdWVzdCwgdW5kZWZpbmVkXTtcbiAgdmFyIHByb21pc2UgPSBQcm9taXNlLnJlc29sdmUoY29uZmlnKTtcblxuICB0aGlzLmludGVyY2VwdG9ycy5yZXF1ZXN0LmZvckVhY2goZnVuY3Rpb24gdW5zaGlmdFJlcXVlc3RJbnRlcmNlcHRvcnMoaW50ZXJjZXB0b3IpIHtcbiAgICBjaGFpbi51bnNoaWZ0KGludGVyY2VwdG9yLmZ1bGZpbGxlZCwgaW50ZXJjZXB0b3IucmVqZWN0ZWQpO1xuICB9KTtcblxuICB0aGlzLmludGVyY2VwdG9ycy5yZXNwb25zZS5mb3JFYWNoKGZ1bmN0aW9uIHB1c2hSZXNwb25zZUludGVyY2VwdG9ycyhpbnRlcmNlcHRvcikge1xuICAgIGNoYWluLnB1c2goaW50ZXJjZXB0b3IuZnVsZmlsbGVkLCBpbnRlcmNlcHRvci5yZWplY3RlZCk7XG4gIH0pO1xuXG4gIHdoaWxlIChjaGFpbi5sZW5ndGgpIHtcbiAgICBwcm9taXNlID0gcHJvbWlzZS50aGVuKGNoYWluLnNoaWZ0KCksIGNoYWluLnNoaWZ0KCkpO1xuICB9XG5cbiAgcmV0dXJuIHByb21pc2U7XG59O1xuXG4vLyBQcm92aWRlIGFsaWFzZXMgZm9yIHN1cHBvcnRlZCByZXF1ZXN0IG1ldGhvZHNcbnV0aWxzLmZvckVhY2goWydkZWxldGUnLCAnZ2V0JywgJ2hlYWQnLCAnb3B0aW9ucyddLCBmdW5jdGlvbiBmb3JFYWNoTWV0aG9kTm9EYXRhKG1ldGhvZCkge1xuICAvKmVzbGludCBmdW5jLW5hbWVzOjAqL1xuICBBeGlvcy5wcm90b3R5cGVbbWV0aG9kXSA9IGZ1bmN0aW9uKHVybCwgY29uZmlnKSB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdCh1dGlscy5tZXJnZShjb25maWcgfHwge30sIHtcbiAgICAgIG1ldGhvZDogbWV0aG9kLFxuICAgICAgdXJsOiB1cmxcbiAgICB9KSk7XG4gIH07XG59KTtcblxudXRpbHMuZm9yRWFjaChbJ3Bvc3QnLCAncHV0JywgJ3BhdGNoJ10sIGZ1bmN0aW9uIGZvckVhY2hNZXRob2RXaXRoRGF0YShtZXRob2QpIHtcbiAgLyplc2xpbnQgZnVuYy1uYW1lczowKi9cbiAgQXhpb3MucHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbih1cmwsIGRhdGEsIGNvbmZpZykge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QodXRpbHMubWVyZ2UoY29uZmlnIHx8IHt9LCB7XG4gICAgICBtZXRob2Q6IG1ldGhvZCxcbiAgICAgIHVybDogdXJsLFxuICAgICAgZGF0YTogZGF0YVxuICAgIH0pKTtcbiAgfTtcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEF4aW9zO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbmZ1bmN0aW9uIEludGVyY2VwdG9yTWFuYWdlcigpIHtcbiAgdGhpcy5oYW5kbGVycyA9IFtdO1xufVxuXG4vKipcbiAqIEFkZCBhIG5ldyBpbnRlcmNlcHRvciB0byB0aGUgc3RhY2tcbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdWxmaWxsZWQgVGhlIGZ1bmN0aW9uIHRvIGhhbmRsZSBgdGhlbmAgZm9yIGEgYFByb21pc2VgXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSByZWplY3RlZCBUaGUgZnVuY3Rpb24gdG8gaGFuZGxlIGByZWplY3RgIGZvciBhIGBQcm9taXNlYFxuICpcbiAqIEByZXR1cm4ge051bWJlcn0gQW4gSUQgdXNlZCB0byByZW1vdmUgaW50ZXJjZXB0b3IgbGF0ZXJcbiAqL1xuSW50ZXJjZXB0b3JNYW5hZ2VyLnByb3RvdHlwZS51c2UgPSBmdW5jdGlvbiB1c2UoZnVsZmlsbGVkLCByZWplY3RlZCkge1xuICB0aGlzLmhhbmRsZXJzLnB1c2goe1xuICAgIGZ1bGZpbGxlZDogZnVsZmlsbGVkLFxuICAgIHJlamVjdGVkOiByZWplY3RlZFxuICB9KTtcbiAgcmV0dXJuIHRoaXMuaGFuZGxlcnMubGVuZ3RoIC0gMTtcbn07XG5cbi8qKlxuICogUmVtb3ZlIGFuIGludGVyY2VwdG9yIGZyb20gdGhlIHN0YWNrXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IGlkIFRoZSBJRCB0aGF0IHdhcyByZXR1cm5lZCBieSBgdXNlYFxuICovXG5JbnRlcmNlcHRvck1hbmFnZXIucHJvdG90eXBlLmVqZWN0ID0gZnVuY3Rpb24gZWplY3QoaWQpIHtcbiAgaWYgKHRoaXMuaGFuZGxlcnNbaWRdKSB7XG4gICAgdGhpcy5oYW5kbGVyc1tpZF0gPSBudWxsO1xuICB9XG59O1xuXG4vKipcbiAqIEl0ZXJhdGUgb3ZlciBhbGwgdGhlIHJlZ2lzdGVyZWQgaW50ZXJjZXB0b3JzXG4gKlxuICogVGhpcyBtZXRob2QgaXMgcGFydGljdWxhcmx5IHVzZWZ1bCBmb3Igc2tpcHBpbmcgb3ZlciBhbnlcbiAqIGludGVyY2VwdG9ycyB0aGF0IG1heSBoYXZlIGJlY29tZSBgbnVsbGAgY2FsbGluZyBgZWplY3RgLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0byBjYWxsIGZvciBlYWNoIGludGVyY2VwdG9yXG4gKi9cbkludGVyY2VwdG9yTWFuYWdlci5wcm90b3R5cGUuZm9yRWFjaCA9IGZ1bmN0aW9uIGZvckVhY2goZm4pIHtcbiAgdXRpbHMuZm9yRWFjaCh0aGlzLmhhbmRsZXJzLCBmdW5jdGlvbiBmb3JFYWNoSGFuZGxlcihoKSB7XG4gICAgaWYgKGggIT09IG51bGwpIHtcbiAgICAgIGZuKGgpO1xuICAgIH1cbiAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEludGVyY2VwdG9yTWFuYWdlcjtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGVuaGFuY2VFcnJvciA9IHJlcXVpcmUoJy4vZW5oYW5jZUVycm9yJyk7XG5cbi8qKlxuICogQ3JlYXRlIGFuIEVycm9yIHdpdGggdGhlIHNwZWNpZmllZCBtZXNzYWdlLCBjb25maWcsIGVycm9yIGNvZGUsIHJlcXVlc3QgYW5kIHJlc3BvbnNlLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlIFRoZSBlcnJvciBtZXNzYWdlLlxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBUaGUgY29uZmlnLlxuICogQHBhcmFtIHtzdHJpbmd9IFtjb2RlXSBUaGUgZXJyb3IgY29kZSAoZm9yIGV4YW1wbGUsICdFQ09OTkFCT1JURUQnKS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcmVxdWVzdF0gVGhlIHJlcXVlc3QuXG4gKiBAcGFyYW0ge09iamVjdH0gW3Jlc3BvbnNlXSBUaGUgcmVzcG9uc2UuXG4gKiBAcmV0dXJucyB7RXJyb3J9IFRoZSBjcmVhdGVkIGVycm9yLlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNyZWF0ZUVycm9yKG1lc3NhZ2UsIGNvbmZpZywgY29kZSwgcmVxdWVzdCwgcmVzcG9uc2UpIHtcbiAgdmFyIGVycm9yID0gbmV3IEVycm9yKG1lc3NhZ2UpO1xuICByZXR1cm4gZW5oYW5jZUVycm9yKGVycm9yLCBjb25maWcsIGNvZGUsIHJlcXVlc3QsIHJlc3BvbnNlKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcbnZhciB0cmFuc2Zvcm1EYXRhID0gcmVxdWlyZSgnLi90cmFuc2Zvcm1EYXRhJyk7XG52YXIgaXNDYW5jZWwgPSByZXF1aXJlKCcuLi9jYW5jZWwvaXNDYW5jZWwnKTtcbnZhciBkZWZhdWx0cyA9IHJlcXVpcmUoJy4uL2RlZmF1bHRzJyk7XG52YXIgaXNBYnNvbHV0ZVVSTCA9IHJlcXVpcmUoJy4vLi4vaGVscGVycy9pc0Fic29sdXRlVVJMJyk7XG52YXIgY29tYmluZVVSTHMgPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvY29tYmluZVVSTHMnKTtcblxuLyoqXG4gKiBUaHJvd3MgYSBgQ2FuY2VsYCBpZiBjYW5jZWxsYXRpb24gaGFzIGJlZW4gcmVxdWVzdGVkLlxuICovXG5mdW5jdGlvbiB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZykge1xuICBpZiAoY29uZmlnLmNhbmNlbFRva2VuKSB7XG4gICAgY29uZmlnLmNhbmNlbFRva2VuLnRocm93SWZSZXF1ZXN0ZWQoKTtcbiAgfVxufVxuXG4vKipcbiAqIERpc3BhdGNoIGEgcmVxdWVzdCB0byB0aGUgc2VydmVyIHVzaW5nIHRoZSBjb25maWd1cmVkIGFkYXB0ZXIuXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IGNvbmZpZyBUaGUgY29uZmlnIHRoYXQgaXMgdG8gYmUgdXNlZCBmb3IgdGhlIHJlcXVlc3RcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBUaGUgUHJvbWlzZSB0byBiZSBmdWxmaWxsZWRcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBkaXNwYXRjaFJlcXVlc3QoY29uZmlnKSB7XG4gIHRocm93SWZDYW5jZWxsYXRpb25SZXF1ZXN0ZWQoY29uZmlnKTtcblxuICAvLyBTdXBwb3J0IGJhc2VVUkwgY29uZmlnXG4gIGlmIChjb25maWcuYmFzZVVSTCAmJiAhaXNBYnNvbHV0ZVVSTChjb25maWcudXJsKSkge1xuICAgIGNvbmZpZy51cmwgPSBjb21iaW5lVVJMcyhjb25maWcuYmFzZVVSTCwgY29uZmlnLnVybCk7XG4gIH1cblxuICAvLyBFbnN1cmUgaGVhZGVycyBleGlzdFxuICBjb25maWcuaGVhZGVycyA9IGNvbmZpZy5oZWFkZXJzIHx8IHt9O1xuXG4gIC8vIFRyYW5zZm9ybSByZXF1ZXN0IGRhdGFcbiAgY29uZmlnLmRhdGEgPSB0cmFuc2Zvcm1EYXRhKFxuICAgIGNvbmZpZy5kYXRhLFxuICAgIGNvbmZpZy5oZWFkZXJzLFxuICAgIGNvbmZpZy50cmFuc2Zvcm1SZXF1ZXN0XG4gICk7XG5cbiAgLy8gRmxhdHRlbiBoZWFkZXJzXG4gIGNvbmZpZy5oZWFkZXJzID0gdXRpbHMubWVyZ2UoXG4gICAgY29uZmlnLmhlYWRlcnMuY29tbW9uIHx8IHt9LFxuICAgIGNvbmZpZy5oZWFkZXJzW2NvbmZpZy5tZXRob2RdIHx8IHt9LFxuICAgIGNvbmZpZy5oZWFkZXJzIHx8IHt9XG4gICk7XG5cbiAgdXRpbHMuZm9yRWFjaChcbiAgICBbJ2RlbGV0ZScsICdnZXQnLCAnaGVhZCcsICdwb3N0JywgJ3B1dCcsICdwYXRjaCcsICdjb21tb24nXSxcbiAgICBmdW5jdGlvbiBjbGVhbkhlYWRlckNvbmZpZyhtZXRob2QpIHtcbiAgICAgIGRlbGV0ZSBjb25maWcuaGVhZGVyc1ttZXRob2RdO1xuICAgIH1cbiAgKTtcblxuICB2YXIgYWRhcHRlciA9IGNvbmZpZy5hZGFwdGVyIHx8IGRlZmF1bHRzLmFkYXB0ZXI7XG5cbiAgcmV0dXJuIGFkYXB0ZXIoY29uZmlnKS50aGVuKGZ1bmN0aW9uIG9uQWRhcHRlclJlc29sdXRpb24ocmVzcG9uc2UpIHtcbiAgICB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZyk7XG5cbiAgICAvLyBUcmFuc2Zvcm0gcmVzcG9uc2UgZGF0YVxuICAgIHJlc3BvbnNlLmRhdGEgPSB0cmFuc2Zvcm1EYXRhKFxuICAgICAgcmVzcG9uc2UuZGF0YSxcbiAgICAgIHJlc3BvbnNlLmhlYWRlcnMsXG4gICAgICBjb25maWcudHJhbnNmb3JtUmVzcG9uc2VcbiAgICApO1xuXG4gICAgcmV0dXJuIHJlc3BvbnNlO1xuICB9LCBmdW5jdGlvbiBvbkFkYXB0ZXJSZWplY3Rpb24ocmVhc29uKSB7XG4gICAgaWYgKCFpc0NhbmNlbChyZWFzb24pKSB7XG4gICAgICB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZyk7XG5cbiAgICAgIC8vIFRyYW5zZm9ybSByZXNwb25zZSBkYXRhXG4gICAgICBpZiAocmVhc29uICYmIHJlYXNvbi5yZXNwb25zZSkge1xuICAgICAgICByZWFzb24ucmVzcG9uc2UuZGF0YSA9IHRyYW5zZm9ybURhdGEoXG4gICAgICAgICAgcmVhc29uLnJlc3BvbnNlLmRhdGEsXG4gICAgICAgICAgcmVhc29uLnJlc3BvbnNlLmhlYWRlcnMsXG4gICAgICAgICAgY29uZmlnLnRyYW5zZm9ybVJlc3BvbnNlXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIFByb21pc2UucmVqZWN0KHJlYXNvbik7XG4gIH0pO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBVcGRhdGUgYW4gRXJyb3Igd2l0aCB0aGUgc3BlY2lmaWVkIGNvbmZpZywgZXJyb3IgY29kZSwgYW5kIHJlc3BvbnNlLlxuICpcbiAqIEBwYXJhbSB7RXJyb3J9IGVycm9yIFRoZSBlcnJvciB0byB1cGRhdGUuXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIFRoZSBjb25maWcuXG4gKiBAcGFyYW0ge3N0cmluZ30gW2NvZGVdIFRoZSBlcnJvciBjb2RlIChmb3IgZXhhbXBsZSwgJ0VDT05OQUJPUlRFRCcpLlxuICogQHBhcmFtIHtPYmplY3R9IFtyZXF1ZXN0XSBUaGUgcmVxdWVzdC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcmVzcG9uc2VdIFRoZSByZXNwb25zZS5cbiAqIEByZXR1cm5zIHtFcnJvcn0gVGhlIGVycm9yLlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGVuaGFuY2VFcnJvcihlcnJvciwgY29uZmlnLCBjb2RlLCByZXF1ZXN0LCByZXNwb25zZSkge1xuICBlcnJvci5jb25maWcgPSBjb25maWc7XG4gIGlmIChjb2RlKSB7XG4gICAgZXJyb3IuY29kZSA9IGNvZGU7XG4gIH1cbiAgZXJyb3IucmVxdWVzdCA9IHJlcXVlc3Q7XG4gIGVycm9yLnJlc3BvbnNlID0gcmVzcG9uc2U7XG4gIHJldHVybiBlcnJvcjtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBjcmVhdGVFcnJvciA9IHJlcXVpcmUoJy4vY3JlYXRlRXJyb3InKTtcblxuLyoqXG4gKiBSZXNvbHZlIG9yIHJlamVjdCBhIFByb21pc2UgYmFzZWQgb24gcmVzcG9uc2Ugc3RhdHVzLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHJlc29sdmUgQSBmdW5jdGlvbiB0aGF0IHJlc29sdmVzIHRoZSBwcm9taXNlLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gcmVqZWN0IEEgZnVuY3Rpb24gdGhhdCByZWplY3RzIHRoZSBwcm9taXNlLlxuICogQHBhcmFtIHtvYmplY3R9IHJlc3BvbnNlIFRoZSByZXNwb25zZS5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCByZXNwb25zZSkge1xuICB2YXIgdmFsaWRhdGVTdGF0dXMgPSByZXNwb25zZS5jb25maWcudmFsaWRhdGVTdGF0dXM7XG4gIC8vIE5vdGU6IHN0YXR1cyBpcyBub3QgZXhwb3NlZCBieSBYRG9tYWluUmVxdWVzdFxuICBpZiAoIXJlc3BvbnNlLnN0YXR1cyB8fCAhdmFsaWRhdGVTdGF0dXMgfHwgdmFsaWRhdGVTdGF0dXMocmVzcG9uc2Uuc3RhdHVzKSkge1xuICAgIHJlc29sdmUocmVzcG9uc2UpO1xuICB9IGVsc2Uge1xuICAgIHJlamVjdChjcmVhdGVFcnJvcihcbiAgICAgICdSZXF1ZXN0IGZhaWxlZCB3aXRoIHN0YXR1cyBjb2RlICcgKyByZXNwb25zZS5zdGF0dXMsXG4gICAgICByZXNwb25zZS5jb25maWcsXG4gICAgICBudWxsLFxuICAgICAgcmVzcG9uc2UucmVxdWVzdCxcbiAgICAgIHJlc3BvbnNlXG4gICAgKSk7XG4gIH1cbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxuLyoqXG4gKiBUcmFuc2Zvcm0gdGhlIGRhdGEgZm9yIGEgcmVxdWVzdCBvciBhIHJlc3BvbnNlXG4gKlxuICogQHBhcmFtIHtPYmplY3R8U3RyaW5nfSBkYXRhIFRoZSBkYXRhIHRvIGJlIHRyYW5zZm9ybWVkXG4gKiBAcGFyYW0ge0FycmF5fSBoZWFkZXJzIFRoZSBoZWFkZXJzIGZvciB0aGUgcmVxdWVzdCBvciByZXNwb25zZVxuICogQHBhcmFtIHtBcnJheXxGdW5jdGlvbn0gZm5zIEEgc2luZ2xlIGZ1bmN0aW9uIG9yIEFycmF5IG9mIGZ1bmN0aW9uc1xuICogQHJldHVybnMgeyp9IFRoZSByZXN1bHRpbmcgdHJhbnNmb3JtZWQgZGF0YVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRyYW5zZm9ybURhdGEoZGF0YSwgaGVhZGVycywgZm5zKSB7XG4gIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICB1dGlscy5mb3JFYWNoKGZucywgZnVuY3Rpb24gdHJhbnNmb3JtKGZuKSB7XG4gICAgZGF0YSA9IGZuKGRhdGEsIGhlYWRlcnMpO1xuICB9KTtcblxuICByZXR1cm4gZGF0YTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcbnZhciBub3JtYWxpemVIZWFkZXJOYW1lID0gcmVxdWlyZSgnLi9oZWxwZXJzL25vcm1hbGl6ZUhlYWRlck5hbWUnKTtcblxudmFyIERFRkFVTFRfQ09OVEVOVF9UWVBFID0ge1xuICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCdcbn07XG5cbmZ1bmN0aW9uIHNldENvbnRlbnRUeXBlSWZVbnNldChoZWFkZXJzLCB2YWx1ZSkge1xuICBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKGhlYWRlcnMpICYmIHV0aWxzLmlzVW5kZWZpbmVkKGhlYWRlcnNbJ0NvbnRlbnQtVHlwZSddKSkge1xuICAgIGhlYWRlcnNbJ0NvbnRlbnQtVHlwZSddID0gdmFsdWU7XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0RGVmYXVsdEFkYXB0ZXIoKSB7XG4gIHZhciBhZGFwdGVyO1xuICBpZiAodHlwZW9mIFhNTEh0dHBSZXF1ZXN0ICE9PSAndW5kZWZpbmVkJykge1xuICAgIC8vIEZvciBicm93c2VycyB1c2UgWEhSIGFkYXB0ZXJcbiAgICBhZGFwdGVyID0gcmVxdWlyZSgnLi9hZGFwdGVycy94aHInKTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgcHJvY2VzcyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAvLyBGb3Igbm9kZSB1c2UgSFRUUCBhZGFwdGVyXG4gICAgYWRhcHRlciA9IHJlcXVpcmUoJy4vYWRhcHRlcnMvaHR0cCcpO1xuICB9XG4gIHJldHVybiBhZGFwdGVyO1xufVxuXG52YXIgZGVmYXVsdHMgPSB7XG4gIGFkYXB0ZXI6IGdldERlZmF1bHRBZGFwdGVyKCksXG5cbiAgdHJhbnNmb3JtUmVxdWVzdDogW2Z1bmN0aW9uIHRyYW5zZm9ybVJlcXVlc3QoZGF0YSwgaGVhZGVycykge1xuICAgIG5vcm1hbGl6ZUhlYWRlck5hbWUoaGVhZGVycywgJ0NvbnRlbnQtVHlwZScpO1xuICAgIGlmICh1dGlscy5pc0Zvcm1EYXRhKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc0FycmF5QnVmZmVyKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc0J1ZmZlcihkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNTdHJlYW0oZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzRmlsZShkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNCbG9iKGRhdGEpXG4gICAgKSB7XG4gICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG4gICAgaWYgKHV0aWxzLmlzQXJyYXlCdWZmZXJWaWV3KGRhdGEpKSB7XG4gICAgICByZXR1cm4gZGF0YS5idWZmZXI7XG4gICAgfVxuICAgIGlmICh1dGlscy5pc1VSTFNlYXJjaFBhcmFtcyhkYXRhKSkge1xuICAgICAgc2V0Q29udGVudFR5cGVJZlVuc2V0KGhlYWRlcnMsICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7Y2hhcnNldD11dGYtOCcpO1xuICAgICAgcmV0dXJuIGRhdGEudG9TdHJpbmcoKTtcbiAgICB9XG4gICAgaWYgKHV0aWxzLmlzT2JqZWN0KGRhdGEpKSB7XG4gICAgICBzZXRDb250ZW50VHlwZUlmVW5zZXQoaGVhZGVycywgJ2FwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtOCcpO1xuICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KGRhdGEpO1xuICAgIH1cbiAgICByZXR1cm4gZGF0YTtcbiAgfV0sXG5cbiAgdHJhbnNmb3JtUmVzcG9uc2U6IFtmdW5jdGlvbiB0cmFuc2Zvcm1SZXNwb25zZShkYXRhKSB7XG4gICAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gICAgaWYgKHR5cGVvZiBkYXRhID09PSAnc3RyaW5nJykge1xuICAgICAgdHJ5IHtcbiAgICAgICAgZGF0YSA9IEpTT04ucGFyc2UoZGF0YSk7XG4gICAgICB9IGNhdGNoIChlKSB7IC8qIElnbm9yZSAqLyB9XG4gICAgfVxuICAgIHJldHVybiBkYXRhO1xuICB9XSxcblxuICAvKipcbiAgICogQSB0aW1lb3V0IGluIG1pbGxpc2Vjb25kcyB0byBhYm9ydCBhIHJlcXVlc3QuIElmIHNldCB0byAwIChkZWZhdWx0KSBhXG4gICAqIHRpbWVvdXQgaXMgbm90IGNyZWF0ZWQuXG4gICAqL1xuICB0aW1lb3V0OiAwLFxuXG4gIHhzcmZDb29raWVOYW1lOiAnWFNSRi1UT0tFTicsXG4gIHhzcmZIZWFkZXJOYW1lOiAnWC1YU1JGLVRPS0VOJyxcblxuICBtYXhDb250ZW50TGVuZ3RoOiAtMSxcblxuICB2YWxpZGF0ZVN0YXR1czogZnVuY3Rpb24gdmFsaWRhdGVTdGF0dXMoc3RhdHVzKSB7XG4gICAgcmV0dXJuIHN0YXR1cyA+PSAyMDAgJiYgc3RhdHVzIDwgMzAwO1xuICB9XG59O1xuXG5kZWZhdWx0cy5oZWFkZXJzID0ge1xuICBjb21tb246IHtcbiAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24sIHRleHQvcGxhaW4sICovKidcbiAgfVxufTtcblxudXRpbHMuZm9yRWFjaChbJ2RlbGV0ZScsICdnZXQnLCAnaGVhZCddLCBmdW5jdGlvbiBmb3JFYWNoTWV0aG9kTm9EYXRhKG1ldGhvZCkge1xuICBkZWZhdWx0cy5oZWFkZXJzW21ldGhvZF0gPSB7fTtcbn0pO1xuXG51dGlscy5mb3JFYWNoKFsncG9zdCcsICdwdXQnLCAncGF0Y2gnXSwgZnVuY3Rpb24gZm9yRWFjaE1ldGhvZFdpdGhEYXRhKG1ldGhvZCkge1xuICBkZWZhdWx0cy5oZWFkZXJzW21ldGhvZF0gPSB1dGlscy5tZXJnZShERUZBVUxUX0NPTlRFTlRfVFlQRSk7XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBkZWZhdWx0cztcbiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBiaW5kKGZuLCB0aGlzQXJnKSB7XG4gIHJldHVybiBmdW5jdGlvbiB3cmFwKCkge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGgpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJncy5sZW5ndGg7IGkrKykge1xuICAgICAgYXJnc1tpXSA9IGFyZ3VtZW50c1tpXTtcbiAgICB9XG4gICAgcmV0dXJuIGZuLmFwcGx5KHRoaXNBcmcsIGFyZ3MpO1xuICB9O1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLy8gYnRvYSBwb2x5ZmlsbCBmb3IgSUU8MTAgY291cnRlc3kgaHR0cHM6Ly9naXRodWIuY29tL2RhdmlkY2hhbWJlcnMvQmFzZTY0LmpzXG5cbnZhciBjaGFycyA9ICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSsvPSc7XG5cbmZ1bmN0aW9uIEUoKSB7XG4gIHRoaXMubWVzc2FnZSA9ICdTdHJpbmcgY29udGFpbnMgYW4gaW52YWxpZCBjaGFyYWN0ZXInO1xufVxuRS5wcm90b3R5cGUgPSBuZXcgRXJyb3I7XG5FLnByb3RvdHlwZS5jb2RlID0gNTtcbkUucHJvdG90eXBlLm5hbWUgPSAnSW52YWxpZENoYXJhY3RlckVycm9yJztcblxuZnVuY3Rpb24gYnRvYShpbnB1dCkge1xuICB2YXIgc3RyID0gU3RyaW5nKGlucHV0KTtcbiAgdmFyIG91dHB1dCA9ICcnO1xuICBmb3IgKFxuICAgIC8vIGluaXRpYWxpemUgcmVzdWx0IGFuZCBjb3VudGVyXG4gICAgdmFyIGJsb2NrLCBjaGFyQ29kZSwgaWR4ID0gMCwgbWFwID0gY2hhcnM7XG4gICAgLy8gaWYgdGhlIG5leHQgc3RyIGluZGV4IGRvZXMgbm90IGV4aXN0OlxuICAgIC8vICAgY2hhbmdlIHRoZSBtYXBwaW5nIHRhYmxlIHRvIFwiPVwiXG4gICAgLy8gICBjaGVjayBpZiBkIGhhcyBubyBmcmFjdGlvbmFsIGRpZ2l0c1xuICAgIHN0ci5jaGFyQXQoaWR4IHwgMCkgfHwgKG1hcCA9ICc9JywgaWR4ICUgMSk7XG4gICAgLy8gXCI4IC0gaWR4ICUgMSAqIDhcIiBnZW5lcmF0ZXMgdGhlIHNlcXVlbmNlIDIsIDQsIDYsIDhcbiAgICBvdXRwdXQgKz0gbWFwLmNoYXJBdCg2MyAmIGJsb2NrID4+IDggLSBpZHggJSAxICogOClcbiAgKSB7XG4gICAgY2hhckNvZGUgPSBzdHIuY2hhckNvZGVBdChpZHggKz0gMyAvIDQpO1xuICAgIGlmIChjaGFyQ29kZSA+IDB4RkYpIHtcbiAgICAgIHRocm93IG5ldyBFKCk7XG4gICAgfVxuICAgIGJsb2NrID0gYmxvY2sgPDwgOCB8IGNoYXJDb2RlO1xuICB9XG4gIHJldHVybiBvdXRwdXQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYnRvYTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG5mdW5jdGlvbiBlbmNvZGUodmFsKSB7XG4gIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQodmFsKS5cbiAgICByZXBsYWNlKC8lNDAvZ2ksICdAJykuXG4gICAgcmVwbGFjZSgvJTNBL2dpLCAnOicpLlxuICAgIHJlcGxhY2UoLyUyNC9nLCAnJCcpLlxuICAgIHJlcGxhY2UoLyUyQy9naSwgJywnKS5cbiAgICByZXBsYWNlKC8lMjAvZywgJysnKS5cbiAgICByZXBsYWNlKC8lNUIvZ2ksICdbJykuXG4gICAgcmVwbGFjZSgvJTVEL2dpLCAnXScpO1xufVxuXG4vKipcbiAqIEJ1aWxkIGEgVVJMIGJ5IGFwcGVuZGluZyBwYXJhbXMgdG8gdGhlIGVuZFxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgVGhlIGJhc2Ugb2YgdGhlIHVybCAoZS5nLiwgaHR0cDovL3d3dy5nb29nbGUuY29tKVxuICogQHBhcmFtIHtvYmplY3R9IFtwYXJhbXNdIFRoZSBwYXJhbXMgdG8gYmUgYXBwZW5kZWRcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBmb3JtYXR0ZWQgdXJsXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYnVpbGRVUkwodXJsLCBwYXJhbXMsIHBhcmFtc1NlcmlhbGl6ZXIpIHtcbiAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gIGlmICghcGFyYW1zKSB7XG4gICAgcmV0dXJuIHVybDtcbiAgfVxuXG4gIHZhciBzZXJpYWxpemVkUGFyYW1zO1xuICBpZiAocGFyYW1zU2VyaWFsaXplcikge1xuICAgIHNlcmlhbGl6ZWRQYXJhbXMgPSBwYXJhbXNTZXJpYWxpemVyKHBhcmFtcyk7XG4gIH0gZWxzZSBpZiAodXRpbHMuaXNVUkxTZWFyY2hQYXJhbXMocGFyYW1zKSkge1xuICAgIHNlcmlhbGl6ZWRQYXJhbXMgPSBwYXJhbXMudG9TdHJpbmcoKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgcGFydHMgPSBbXTtcblxuICAgIHV0aWxzLmZvckVhY2gocGFyYW1zLCBmdW5jdGlvbiBzZXJpYWxpemUodmFsLCBrZXkpIHtcbiAgICAgIGlmICh2YWwgPT09IG51bGwgfHwgdHlwZW9mIHZhbCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAodXRpbHMuaXNBcnJheSh2YWwpKSB7XG4gICAgICAgIGtleSA9IGtleSArICdbXSc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YWwgPSBbdmFsXTtcbiAgICAgIH1cblxuICAgICAgdXRpbHMuZm9yRWFjaCh2YWwsIGZ1bmN0aW9uIHBhcnNlVmFsdWUodikge1xuICAgICAgICBpZiAodXRpbHMuaXNEYXRlKHYpKSB7XG4gICAgICAgICAgdiA9IHYudG9JU09TdHJpbmcoKTtcbiAgICAgICAgfSBlbHNlIGlmICh1dGlscy5pc09iamVjdCh2KSkge1xuICAgICAgICAgIHYgPSBKU09OLnN0cmluZ2lmeSh2KTtcbiAgICAgICAgfVxuICAgICAgICBwYXJ0cy5wdXNoKGVuY29kZShrZXkpICsgJz0nICsgZW5jb2RlKHYpKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgc2VyaWFsaXplZFBhcmFtcyA9IHBhcnRzLmpvaW4oJyYnKTtcbiAgfVxuXG4gIGlmIChzZXJpYWxpemVkUGFyYW1zKSB7XG4gICAgdXJsICs9ICh1cmwuaW5kZXhPZignPycpID09PSAtMSA/ICc/JyA6ICcmJykgKyBzZXJpYWxpemVkUGFyYW1zO1xuICB9XG5cbiAgcmV0dXJuIHVybDtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBVUkwgYnkgY29tYmluaW5nIHRoZSBzcGVjaWZpZWQgVVJMc1xuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBiYXNlVVJMIFRoZSBiYXNlIFVSTFxuICogQHBhcmFtIHtzdHJpbmd9IHJlbGF0aXZlVVJMIFRoZSByZWxhdGl2ZSBVUkxcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBjb21iaW5lZCBVUkxcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjb21iaW5lVVJMcyhiYXNlVVJMLCByZWxhdGl2ZVVSTCkge1xuICByZXR1cm4gcmVsYXRpdmVVUkxcbiAgICA/IGJhc2VVUkwucmVwbGFjZSgvXFwvKyQvLCAnJykgKyAnLycgKyByZWxhdGl2ZVVSTC5yZXBsYWNlKC9eXFwvKy8sICcnKVxuICAgIDogYmFzZVVSTDtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSAoXG4gIHV0aWxzLmlzU3RhbmRhcmRCcm93c2VyRW52KCkgP1xuXG4gIC8vIFN0YW5kYXJkIGJyb3dzZXIgZW52cyBzdXBwb3J0IGRvY3VtZW50LmNvb2tpZVxuICAoZnVuY3Rpb24gc3RhbmRhcmRCcm93c2VyRW52KCkge1xuICAgIHJldHVybiB7XG4gICAgICB3cml0ZTogZnVuY3Rpb24gd3JpdGUobmFtZSwgdmFsdWUsIGV4cGlyZXMsIHBhdGgsIGRvbWFpbiwgc2VjdXJlKSB7XG4gICAgICAgIHZhciBjb29raWUgPSBbXTtcbiAgICAgICAgY29va2llLnB1c2gobmFtZSArICc9JyArIGVuY29kZVVSSUNvbXBvbmVudCh2YWx1ZSkpO1xuXG4gICAgICAgIGlmICh1dGlscy5pc051bWJlcihleHBpcmVzKSkge1xuICAgICAgICAgIGNvb2tpZS5wdXNoKCdleHBpcmVzPScgKyBuZXcgRGF0ZShleHBpcmVzKS50b0dNVFN0cmluZygpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh1dGlscy5pc1N0cmluZyhwYXRoKSkge1xuICAgICAgICAgIGNvb2tpZS5wdXNoKCdwYXRoPScgKyBwYXRoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh1dGlscy5pc1N0cmluZyhkb21haW4pKSB7XG4gICAgICAgICAgY29va2llLnB1c2goJ2RvbWFpbj0nICsgZG9tYWluKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzZWN1cmUgPT09IHRydWUpIHtcbiAgICAgICAgICBjb29raWUucHVzaCgnc2VjdXJlJyk7XG4gICAgICAgIH1cblxuICAgICAgICBkb2N1bWVudC5jb29raWUgPSBjb29raWUuam9pbignOyAnKTtcbiAgICAgIH0sXG5cbiAgICAgIHJlYWQ6IGZ1bmN0aW9uIHJlYWQobmFtZSkge1xuICAgICAgICB2YXIgbWF0Y2ggPSBkb2N1bWVudC5jb29raWUubWF0Y2gobmV3IFJlZ0V4cCgnKF58O1xcXFxzKikoJyArIG5hbWUgKyAnKT0oW147XSopJykpO1xuICAgICAgICByZXR1cm4gKG1hdGNoID8gZGVjb2RlVVJJQ29tcG9uZW50KG1hdGNoWzNdKSA6IG51bGwpO1xuICAgICAgfSxcblxuICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUobmFtZSkge1xuICAgICAgICB0aGlzLndyaXRlKG5hbWUsICcnLCBEYXRlLm5vdygpIC0gODY0MDAwMDApO1xuICAgICAgfVxuICAgIH07XG4gIH0pKCkgOlxuXG4gIC8vIE5vbiBzdGFuZGFyZCBicm93c2VyIGVudiAod2ViIHdvcmtlcnMsIHJlYWN0LW5hdGl2ZSkgbGFjayBuZWVkZWQgc3VwcG9ydC5cbiAgKGZ1bmN0aW9uIG5vblN0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgd3JpdGU6IGZ1bmN0aW9uIHdyaXRlKCkge30sXG4gICAgICByZWFkOiBmdW5jdGlvbiByZWFkKCkgeyByZXR1cm4gbnVsbDsgfSxcbiAgICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge31cbiAgICB9O1xuICB9KSgpXG4pO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIERldGVybWluZXMgd2hldGhlciB0aGUgc3BlY2lmaWVkIFVSTCBpcyBhYnNvbHV0ZVxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgVGhlIFVSTCB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgc3BlY2lmaWVkIFVSTCBpcyBhYnNvbHV0ZSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaXNBYnNvbHV0ZVVSTCh1cmwpIHtcbiAgLy8gQSBVUkwgaXMgY29uc2lkZXJlZCBhYnNvbHV0ZSBpZiBpdCBiZWdpbnMgd2l0aCBcIjxzY2hlbWU+Oi8vXCIgb3IgXCIvL1wiIChwcm90b2NvbC1yZWxhdGl2ZSBVUkwpLlxuICAvLyBSRkMgMzk4NiBkZWZpbmVzIHNjaGVtZSBuYW1lIGFzIGEgc2VxdWVuY2Ugb2YgY2hhcmFjdGVycyBiZWdpbm5pbmcgd2l0aCBhIGxldHRlciBhbmQgZm9sbG93ZWRcbiAgLy8gYnkgYW55IGNvbWJpbmF0aW9uIG9mIGxldHRlcnMsIGRpZ2l0cywgcGx1cywgcGVyaW9kLCBvciBoeXBoZW4uXG4gIHJldHVybiAvXihbYS16XVthLXpcXGRcXCtcXC1cXC5dKjopP1xcL1xcLy9pLnRlc3QodXJsKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSAoXG4gIHV0aWxzLmlzU3RhbmRhcmRCcm93c2VyRW52KCkgP1xuXG4gIC8vIFN0YW5kYXJkIGJyb3dzZXIgZW52cyBoYXZlIGZ1bGwgc3VwcG9ydCBvZiB0aGUgQVBJcyBuZWVkZWQgdG8gdGVzdFxuICAvLyB3aGV0aGVyIHRoZSByZXF1ZXN0IFVSTCBpcyBvZiB0aGUgc2FtZSBvcmlnaW4gYXMgY3VycmVudCBsb2NhdGlvbi5cbiAgKGZ1bmN0aW9uIHN0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgICB2YXIgbXNpZSA9IC8obXNpZXx0cmlkZW50KS9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7XG4gICAgdmFyIHVybFBhcnNpbmdOb2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgIHZhciBvcmlnaW5VUkw7XG5cbiAgICAvKipcbiAgICAqIFBhcnNlIGEgVVJMIHRvIGRpc2NvdmVyIGl0J3MgY29tcG9uZW50c1xuICAgICpcbiAgICAqIEBwYXJhbSB7U3RyaW5nfSB1cmwgVGhlIFVSTCB0byBiZSBwYXJzZWRcbiAgICAqIEByZXR1cm5zIHtPYmplY3R9XG4gICAgKi9cbiAgICBmdW5jdGlvbiByZXNvbHZlVVJMKHVybCkge1xuICAgICAgdmFyIGhyZWYgPSB1cmw7XG5cbiAgICAgIGlmIChtc2llKSB7XG4gICAgICAgIC8vIElFIG5lZWRzIGF0dHJpYnV0ZSBzZXQgdHdpY2UgdG8gbm9ybWFsaXplIHByb3BlcnRpZXNcbiAgICAgICAgdXJsUGFyc2luZ05vZGUuc2V0QXR0cmlidXRlKCdocmVmJywgaHJlZik7XG4gICAgICAgIGhyZWYgPSB1cmxQYXJzaW5nTm9kZS5ocmVmO1xuICAgICAgfVxuXG4gICAgICB1cmxQYXJzaW5nTm9kZS5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCBocmVmKTtcblxuICAgICAgLy8gdXJsUGFyc2luZ05vZGUgcHJvdmlkZXMgdGhlIFVybFV0aWxzIGludGVyZmFjZSAtIGh0dHA6Ly91cmwuc3BlYy53aGF0d2cub3JnLyN1cmx1dGlsc1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgaHJlZjogdXJsUGFyc2luZ05vZGUuaHJlZixcbiAgICAgICAgcHJvdG9jb2w6IHVybFBhcnNpbmdOb2RlLnByb3RvY29sID8gdXJsUGFyc2luZ05vZGUucHJvdG9jb2wucmVwbGFjZSgvOiQvLCAnJykgOiAnJyxcbiAgICAgICAgaG9zdDogdXJsUGFyc2luZ05vZGUuaG9zdCxcbiAgICAgICAgc2VhcmNoOiB1cmxQYXJzaW5nTm9kZS5zZWFyY2ggPyB1cmxQYXJzaW5nTm9kZS5zZWFyY2gucmVwbGFjZSgvXlxcPy8sICcnKSA6ICcnLFxuICAgICAgICBoYXNoOiB1cmxQYXJzaW5nTm9kZS5oYXNoID8gdXJsUGFyc2luZ05vZGUuaGFzaC5yZXBsYWNlKC9eIy8sICcnKSA6ICcnLFxuICAgICAgICBob3N0bmFtZTogdXJsUGFyc2luZ05vZGUuaG9zdG5hbWUsXG4gICAgICAgIHBvcnQ6IHVybFBhcnNpbmdOb2RlLnBvcnQsXG4gICAgICAgIHBhdGhuYW1lOiAodXJsUGFyc2luZ05vZGUucGF0aG5hbWUuY2hhckF0KDApID09PSAnLycpID9cbiAgICAgICAgICAgICAgICAgIHVybFBhcnNpbmdOb2RlLnBhdGhuYW1lIDpcbiAgICAgICAgICAgICAgICAgICcvJyArIHVybFBhcnNpbmdOb2RlLnBhdGhuYW1lXG4gICAgICB9O1xuICAgIH1cblxuICAgIG9yaWdpblVSTCA9IHJlc29sdmVVUkwod2luZG93LmxvY2F0aW9uLmhyZWYpO1xuXG4gICAgLyoqXG4gICAgKiBEZXRlcm1pbmUgaWYgYSBVUkwgc2hhcmVzIHRoZSBzYW1lIG9yaWdpbiBhcyB0aGUgY3VycmVudCBsb2NhdGlvblxuICAgICpcbiAgICAqIEBwYXJhbSB7U3RyaW5nfSByZXF1ZXN0VVJMIFRoZSBVUkwgdG8gdGVzdFxuICAgICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgVVJMIHNoYXJlcyB0aGUgc2FtZSBvcmlnaW4sIG90aGVyd2lzZSBmYWxzZVxuICAgICovXG4gICAgcmV0dXJuIGZ1bmN0aW9uIGlzVVJMU2FtZU9yaWdpbihyZXF1ZXN0VVJMKSB7XG4gICAgICB2YXIgcGFyc2VkID0gKHV0aWxzLmlzU3RyaW5nKHJlcXVlc3RVUkwpKSA/IHJlc29sdmVVUkwocmVxdWVzdFVSTCkgOiByZXF1ZXN0VVJMO1xuICAgICAgcmV0dXJuIChwYXJzZWQucHJvdG9jb2wgPT09IG9yaWdpblVSTC5wcm90b2NvbCAmJlxuICAgICAgICAgICAgcGFyc2VkLmhvc3QgPT09IG9yaWdpblVSTC5ob3N0KTtcbiAgICB9O1xuICB9KSgpIDpcblxuICAvLyBOb24gc3RhbmRhcmQgYnJvd3NlciBlbnZzICh3ZWIgd29ya2VycywgcmVhY3QtbmF0aXZlKSBsYWNrIG5lZWRlZCBzdXBwb3J0LlxuICAoZnVuY3Rpb24gbm9uU3RhbmRhcmRCcm93c2VyRW52KCkge1xuICAgIHJldHVybiBmdW5jdGlvbiBpc1VSTFNhbWVPcmlnaW4oKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuICB9KSgpXG4pO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLi91dGlscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIG5vcm1hbGl6ZUhlYWRlck5hbWUoaGVhZGVycywgbm9ybWFsaXplZE5hbWUpIHtcbiAgdXRpbHMuZm9yRWFjaChoZWFkZXJzLCBmdW5jdGlvbiBwcm9jZXNzSGVhZGVyKHZhbHVlLCBuYW1lKSB7XG4gICAgaWYgKG5hbWUgIT09IG5vcm1hbGl6ZWROYW1lICYmIG5hbWUudG9VcHBlckNhc2UoKSA9PT0gbm9ybWFsaXplZE5hbWUudG9VcHBlckNhc2UoKSkge1xuICAgICAgaGVhZGVyc1tub3JtYWxpemVkTmFtZV0gPSB2YWx1ZTtcbiAgICAgIGRlbGV0ZSBoZWFkZXJzW25hbWVdO1xuICAgIH1cbiAgfSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbi8vIEhlYWRlcnMgd2hvc2UgZHVwbGljYXRlcyBhcmUgaWdub3JlZCBieSBub2RlXG4vLyBjLmYuIGh0dHBzOi8vbm9kZWpzLm9yZy9hcGkvaHR0cC5odG1sI2h0dHBfbWVzc2FnZV9oZWFkZXJzXG52YXIgaWdub3JlRHVwbGljYXRlT2YgPSBbXG4gICdhZ2UnLCAnYXV0aG9yaXphdGlvbicsICdjb250ZW50LWxlbmd0aCcsICdjb250ZW50LXR5cGUnLCAnZXRhZycsXG4gICdleHBpcmVzJywgJ2Zyb20nLCAnaG9zdCcsICdpZi1tb2RpZmllZC1zaW5jZScsICdpZi11bm1vZGlmaWVkLXNpbmNlJyxcbiAgJ2xhc3QtbW9kaWZpZWQnLCAnbG9jYXRpb24nLCAnbWF4LWZvcndhcmRzJywgJ3Byb3h5LWF1dGhvcml6YXRpb24nLFxuICAncmVmZXJlcicsICdyZXRyeS1hZnRlcicsICd1c2VyLWFnZW50J1xuXTtcblxuLyoqXG4gKiBQYXJzZSBoZWFkZXJzIGludG8gYW4gb2JqZWN0XG4gKlxuICogYGBgXG4gKiBEYXRlOiBXZWQsIDI3IEF1ZyAyMDE0IDA4OjU4OjQ5IEdNVFxuICogQ29udGVudC1UeXBlOiBhcHBsaWNhdGlvbi9qc29uXG4gKiBDb25uZWN0aW9uOiBrZWVwLWFsaXZlXG4gKiBUcmFuc2Zlci1FbmNvZGluZzogY2h1bmtlZFxuICogYGBgXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGhlYWRlcnMgSGVhZGVycyBuZWVkaW5nIHRvIGJlIHBhcnNlZFxuICogQHJldHVybnMge09iamVjdH0gSGVhZGVycyBwYXJzZWQgaW50byBhbiBvYmplY3RcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBwYXJzZUhlYWRlcnMoaGVhZGVycykge1xuICB2YXIgcGFyc2VkID0ge307XG4gIHZhciBrZXk7XG4gIHZhciB2YWw7XG4gIHZhciBpO1xuXG4gIGlmICghaGVhZGVycykgeyByZXR1cm4gcGFyc2VkOyB9XG5cbiAgdXRpbHMuZm9yRWFjaChoZWFkZXJzLnNwbGl0KCdcXG4nKSwgZnVuY3Rpb24gcGFyc2VyKGxpbmUpIHtcbiAgICBpID0gbGluZS5pbmRleE9mKCc6Jyk7XG4gICAga2V5ID0gdXRpbHMudHJpbShsaW5lLnN1YnN0cigwLCBpKSkudG9Mb3dlckNhc2UoKTtcbiAgICB2YWwgPSB1dGlscy50cmltKGxpbmUuc3Vic3RyKGkgKyAxKSk7XG5cbiAgICBpZiAoa2V5KSB7XG4gICAgICBpZiAocGFyc2VkW2tleV0gJiYgaWdub3JlRHVwbGljYXRlT2YuaW5kZXhPZihrZXkpID49IDApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKGtleSA9PT0gJ3NldC1jb29raWUnKSB7XG4gICAgICAgIHBhcnNlZFtrZXldID0gKHBhcnNlZFtrZXldID8gcGFyc2VkW2tleV0gOiBbXSkuY29uY2F0KFt2YWxdKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBhcnNlZFtrZXldID0gcGFyc2VkW2tleV0gPyBwYXJzZWRba2V5XSArICcsICcgKyB2YWwgOiB2YWw7XG4gICAgICB9XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gcGFyc2VkO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBTeW50YWN0aWMgc3VnYXIgZm9yIGludm9raW5nIGEgZnVuY3Rpb24gYW5kIGV4cGFuZGluZyBhbiBhcnJheSBmb3IgYXJndW1lbnRzLlxuICpcbiAqIENvbW1vbiB1c2UgY2FzZSB3b3VsZCBiZSB0byB1c2UgYEZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseWAuXG4gKlxuICogIGBgYGpzXG4gKiAgZnVuY3Rpb24gZih4LCB5LCB6KSB7fVxuICogIHZhciBhcmdzID0gWzEsIDIsIDNdO1xuICogIGYuYXBwbHkobnVsbCwgYXJncyk7XG4gKiAgYGBgXG4gKlxuICogV2l0aCBgc3ByZWFkYCB0aGlzIGV4YW1wbGUgY2FuIGJlIHJlLXdyaXR0ZW4uXG4gKlxuICogIGBgYGpzXG4gKiAgc3ByZWFkKGZ1bmN0aW9uKHgsIHksIHopIHt9KShbMSwgMiwgM10pO1xuICogIGBgYFxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259XG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc3ByZWFkKGNhbGxiYWNrKSB7XG4gIHJldHVybiBmdW5jdGlvbiB3cmFwKGFycikge1xuICAgIHJldHVybiBjYWxsYmFjay5hcHBseShudWxsLCBhcnIpO1xuICB9O1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGJpbmQgPSByZXF1aXJlKCcuL2hlbHBlcnMvYmluZCcpO1xudmFyIGlzQnVmZmVyID0gcmVxdWlyZSgnaXMtYnVmZmVyJyk7XG5cbi8qZ2xvYmFsIHRvU3RyaW5nOnRydWUqL1xuXG4vLyB1dGlscyBpcyBhIGxpYnJhcnkgb2YgZ2VuZXJpYyBoZWxwZXIgZnVuY3Rpb25zIG5vbi1zcGVjaWZpYyB0byBheGlvc1xuXG52YXIgdG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGFuIEFycmF5XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gQXJyYXksIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FycmF5KHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBBcnJheV0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGFuIEFycmF5QnVmZmVyXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gQXJyYXlCdWZmZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FycmF5QnVmZmVyKHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBBcnJheUJ1ZmZlcl0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRm9ybURhdGFcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBGb3JtRGF0YSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRm9ybURhdGEodmFsKSB7XG4gIHJldHVybiAodHlwZW9mIEZvcm1EYXRhICE9PSAndW5kZWZpbmVkJykgJiYgKHZhbCBpbnN0YW5jZW9mIEZvcm1EYXRhKTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIHZpZXcgb24gYW4gQXJyYXlCdWZmZXJcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIHZpZXcgb24gYW4gQXJyYXlCdWZmZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FycmF5QnVmZmVyVmlldyh2YWwpIHtcbiAgdmFyIHJlc3VsdDtcbiAgaWYgKCh0eXBlb2YgQXJyYXlCdWZmZXIgIT09ICd1bmRlZmluZWQnKSAmJiAoQXJyYXlCdWZmZXIuaXNWaWV3KSkge1xuICAgIHJlc3VsdCA9IEFycmF5QnVmZmVyLmlzVmlldyh2YWwpO1xuICB9IGVsc2Uge1xuICAgIHJlc3VsdCA9ICh2YWwpICYmICh2YWwuYnVmZmVyKSAmJiAodmFsLmJ1ZmZlciBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgU3RyaW5nXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBTdHJpbmcsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1N0cmluZyh2YWwpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICdzdHJpbmcnO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgTnVtYmVyXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBOdW1iZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc051bWJlcih2YWwpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICdudW1iZXInO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIHVuZGVmaW5lZFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSB2YWx1ZSBpcyB1bmRlZmluZWQsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1VuZGVmaW5lZCh2YWwpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICd1bmRlZmluZWQnO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGFuIE9iamVjdFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIE9iamVjdCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbCkge1xuICByZXR1cm4gdmFsICE9PSBudWxsICYmIHR5cGVvZiB2YWwgPT09ICdvYmplY3QnO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRGF0ZVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgRGF0ZSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRGF0ZSh2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgRGF0ZV0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRmlsZVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgRmlsZSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRmlsZSh2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgRmlsZV0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgQmxvYlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgQmxvYiwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQmxvYih2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgQmxvYl0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRnVuY3Rpb25cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEZ1bmN0aW9uLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNGdW5jdGlvbih2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgRnVuY3Rpb25dJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIFN0cmVhbVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgU3RyZWFtLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNTdHJlYW0odmFsKSB7XG4gIHJldHVybiBpc09iamVjdCh2YWwpICYmIGlzRnVuY3Rpb24odmFsLnBpcGUpO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgVVJMU2VhcmNoUGFyYW1zIG9iamVjdFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgVVJMU2VhcmNoUGFyYW1zIG9iamVjdCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzVVJMU2VhcmNoUGFyYW1zKHZhbCkge1xuICByZXR1cm4gdHlwZW9mIFVSTFNlYXJjaFBhcmFtcyAhPT0gJ3VuZGVmaW5lZCcgJiYgdmFsIGluc3RhbmNlb2YgVVJMU2VhcmNoUGFyYW1zO1xufVxuXG4vKipcbiAqIFRyaW0gZXhjZXNzIHdoaXRlc3BhY2Ugb2ZmIHRoZSBiZWdpbm5pbmcgYW5kIGVuZCBvZiBhIHN0cmluZ1xuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHIgVGhlIFN0cmluZyB0byB0cmltXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgU3RyaW5nIGZyZWVkIG9mIGV4Y2VzcyB3aGl0ZXNwYWNlXG4gKi9cbmZ1bmN0aW9uIHRyaW0oc3RyKSB7XG4gIHJldHVybiBzdHIucmVwbGFjZSgvXlxccyovLCAnJykucmVwbGFjZSgvXFxzKiQvLCAnJyk7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIHdlJ3JlIHJ1bm5pbmcgaW4gYSBzdGFuZGFyZCBicm93c2VyIGVudmlyb25tZW50XG4gKlxuICogVGhpcyBhbGxvd3MgYXhpb3MgdG8gcnVuIGluIGEgd2ViIHdvcmtlciwgYW5kIHJlYWN0LW5hdGl2ZS5cbiAqIEJvdGggZW52aXJvbm1lbnRzIHN1cHBvcnQgWE1MSHR0cFJlcXVlc3QsIGJ1dCBub3QgZnVsbHkgc3RhbmRhcmQgZ2xvYmFscy5cbiAqXG4gKiB3ZWIgd29ya2VyczpcbiAqICB0eXBlb2Ygd2luZG93IC0+IHVuZGVmaW5lZFxuICogIHR5cGVvZiBkb2N1bWVudCAtPiB1bmRlZmluZWRcbiAqXG4gKiByZWFjdC1uYXRpdmU6XG4gKiAgbmF2aWdhdG9yLnByb2R1Y3QgLT4gJ1JlYWN0TmF0aXZlJ1xuICovXG5mdW5jdGlvbiBpc1N0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgaWYgKHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnICYmIG5hdmlnYXRvci5wcm9kdWN0ID09PSAnUmVhY3ROYXRpdmUnKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHJldHVybiAoXG4gICAgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICB0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnXG4gICk7XG59XG5cbi8qKlxuICogSXRlcmF0ZSBvdmVyIGFuIEFycmF5IG9yIGFuIE9iamVjdCBpbnZva2luZyBhIGZ1bmN0aW9uIGZvciBlYWNoIGl0ZW0uXG4gKlxuICogSWYgYG9iamAgaXMgYW4gQXJyYXkgY2FsbGJhY2sgd2lsbCBiZSBjYWxsZWQgcGFzc2luZ1xuICogdGhlIHZhbHVlLCBpbmRleCwgYW5kIGNvbXBsZXRlIGFycmF5IGZvciBlYWNoIGl0ZW0uXG4gKlxuICogSWYgJ29iaicgaXMgYW4gT2JqZWN0IGNhbGxiYWNrIHdpbGwgYmUgY2FsbGVkIHBhc3NpbmdcbiAqIHRoZSB2YWx1ZSwga2V5LCBhbmQgY29tcGxldGUgb2JqZWN0IGZvciBlYWNoIHByb3BlcnR5LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fEFycmF5fSBvYmogVGhlIG9iamVjdCB0byBpdGVyYXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgY2FsbGJhY2sgdG8gaW52b2tlIGZvciBlYWNoIGl0ZW1cbiAqL1xuZnVuY3Rpb24gZm9yRWFjaChvYmosIGZuKSB7XG4gIC8vIERvbid0IGJvdGhlciBpZiBubyB2YWx1ZSBwcm92aWRlZFxuICBpZiAob2JqID09PSBudWxsIHx8IHR5cGVvZiBvYmogPT09ICd1bmRlZmluZWQnKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gRm9yY2UgYW4gYXJyYXkgaWYgbm90IGFscmVhZHkgc29tZXRoaW5nIGl0ZXJhYmxlXG4gIGlmICh0eXBlb2Ygb2JqICE9PSAnb2JqZWN0Jykge1xuICAgIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICAgIG9iaiA9IFtvYmpdO1xuICB9XG5cbiAgaWYgKGlzQXJyYXkob2JqKSkge1xuICAgIC8vIEl0ZXJhdGUgb3ZlciBhcnJheSB2YWx1ZXNcbiAgICBmb3IgKHZhciBpID0gMCwgbCA9IG9iai5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgIGZuLmNhbGwobnVsbCwgb2JqW2ldLCBpLCBvYmopO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICAvLyBJdGVyYXRlIG92ZXIgb2JqZWN0IGtleXNcbiAgICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KSkge1xuICAgICAgICBmbi5jYWxsKG51bGwsIG9ialtrZXldLCBrZXksIG9iaik7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogQWNjZXB0cyB2YXJhcmdzIGV4cGVjdGluZyBlYWNoIGFyZ3VtZW50IHRvIGJlIGFuIG9iamVjdCwgdGhlblxuICogaW1tdXRhYmx5IG1lcmdlcyB0aGUgcHJvcGVydGllcyBvZiBlYWNoIG9iamVjdCBhbmQgcmV0dXJucyByZXN1bHQuXG4gKlxuICogV2hlbiBtdWx0aXBsZSBvYmplY3RzIGNvbnRhaW4gdGhlIHNhbWUga2V5IHRoZSBsYXRlciBvYmplY3QgaW5cbiAqIHRoZSBhcmd1bWVudHMgbGlzdCB3aWxsIHRha2UgcHJlY2VkZW5jZS5cbiAqXG4gKiBFeGFtcGxlOlxuICpcbiAqIGBgYGpzXG4gKiB2YXIgcmVzdWx0ID0gbWVyZ2Uoe2ZvbzogMTIzfSwge2ZvbzogNDU2fSk7XG4gKiBjb25zb2xlLmxvZyhyZXN1bHQuZm9vKTsgLy8gb3V0cHV0cyA0NTZcbiAqIGBgYFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmoxIE9iamVjdCB0byBtZXJnZVxuICogQHJldHVybnMge09iamVjdH0gUmVzdWx0IG9mIGFsbCBtZXJnZSBwcm9wZXJ0aWVzXG4gKi9cbmZ1bmN0aW9uIG1lcmdlKC8qIG9iajEsIG9iajIsIG9iajMsIC4uLiAqLykge1xuICB2YXIgcmVzdWx0ID0ge307XG4gIGZ1bmN0aW9uIGFzc2lnblZhbHVlKHZhbCwga2V5KSB7XG4gICAgaWYgKHR5cGVvZiByZXN1bHRba2V5XSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIHZhbCA9PT0gJ29iamVjdCcpIHtcbiAgICAgIHJlc3VsdFtrZXldID0gbWVyZ2UocmVzdWx0W2tleV0sIHZhbCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc3VsdFtrZXldID0gdmFsO1xuICAgIH1cbiAgfVxuXG4gIGZvciAodmFyIGkgPSAwLCBsID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgIGZvckVhY2goYXJndW1lbnRzW2ldLCBhc3NpZ25WYWx1ZSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBFeHRlbmRzIG9iamVjdCBhIGJ5IG11dGFibHkgYWRkaW5nIHRvIGl0IHRoZSBwcm9wZXJ0aWVzIG9mIG9iamVjdCBiLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBhIFRoZSBvYmplY3QgdG8gYmUgZXh0ZW5kZWRcbiAqIEBwYXJhbSB7T2JqZWN0fSBiIFRoZSBvYmplY3QgdG8gY29weSBwcm9wZXJ0aWVzIGZyb21cbiAqIEBwYXJhbSB7T2JqZWN0fSB0aGlzQXJnIFRoZSBvYmplY3QgdG8gYmluZCBmdW5jdGlvbiB0b1xuICogQHJldHVybiB7T2JqZWN0fSBUaGUgcmVzdWx0aW5nIHZhbHVlIG9mIG9iamVjdCBhXG4gKi9cbmZ1bmN0aW9uIGV4dGVuZChhLCBiLCB0aGlzQXJnKSB7XG4gIGZvckVhY2goYiwgZnVuY3Rpb24gYXNzaWduVmFsdWUodmFsLCBrZXkpIHtcbiAgICBpZiAodGhpc0FyZyAmJiB0eXBlb2YgdmFsID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBhW2tleV0gPSBiaW5kKHZhbCwgdGhpc0FyZyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFba2V5XSA9IHZhbDtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gYTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGlzQXJyYXk6IGlzQXJyYXksXG4gIGlzQXJyYXlCdWZmZXI6IGlzQXJyYXlCdWZmZXIsXG4gIGlzQnVmZmVyOiBpc0J1ZmZlcixcbiAgaXNGb3JtRGF0YTogaXNGb3JtRGF0YSxcbiAgaXNBcnJheUJ1ZmZlclZpZXc6IGlzQXJyYXlCdWZmZXJWaWV3LFxuICBpc1N0cmluZzogaXNTdHJpbmcsXG4gIGlzTnVtYmVyOiBpc051bWJlcixcbiAgaXNPYmplY3Q6IGlzT2JqZWN0LFxuICBpc1VuZGVmaW5lZDogaXNVbmRlZmluZWQsXG4gIGlzRGF0ZTogaXNEYXRlLFxuICBpc0ZpbGU6IGlzRmlsZSxcbiAgaXNCbG9iOiBpc0Jsb2IsXG4gIGlzRnVuY3Rpb246IGlzRnVuY3Rpb24sXG4gIGlzU3RyZWFtOiBpc1N0cmVhbSxcbiAgaXNVUkxTZWFyY2hQYXJhbXM6IGlzVVJMU2VhcmNoUGFyYW1zLFxuICBpc1N0YW5kYXJkQnJvd3NlckVudjogaXNTdGFuZGFyZEJyb3dzZXJFbnYsXG4gIGZvckVhY2g6IGZvckVhY2gsXG4gIG1lcmdlOiBtZXJnZSxcbiAgZXh0ZW5kOiBleHRlbmQsXG4gIHRyaW06IHRyaW1cbn07XG4iLCIvKiFcbiAqIERldGVybWluZSBpZiBhbiBvYmplY3QgaXMgYSBCdWZmZXJcbiAqXG4gKiBAYXV0aG9yICAgRmVyb3NzIEFib3VraGFkaWplaCA8aHR0cHM6Ly9mZXJvc3Mub3JnPlxuICogQGxpY2Vuc2UgIE1JVFxuICovXG5cbi8vIFRoZSBfaXNCdWZmZXIgY2hlY2sgaXMgZm9yIFNhZmFyaSA1LTcgc3VwcG9ydCwgYmVjYXVzZSBpdCdzIG1pc3Npbmdcbi8vIE9iamVjdC5wcm90b3R5cGUuY29uc3RydWN0b3IuIFJlbW92ZSB0aGlzIGV2ZW50dWFsbHlcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9iaikge1xuICByZXR1cm4gb2JqICE9IG51bGwgJiYgKGlzQnVmZmVyKG9iaikgfHwgaXNTbG93QnVmZmVyKG9iaikgfHwgISFvYmouX2lzQnVmZmVyKVxufVxuXG5mdW5jdGlvbiBpc0J1ZmZlciAob2JqKSB7XG4gIHJldHVybiAhIW9iai5jb25zdHJ1Y3RvciAmJiB0eXBlb2Ygb2JqLmNvbnN0cnVjdG9yLmlzQnVmZmVyID09PSAnZnVuY3Rpb24nICYmIG9iai5jb25zdHJ1Y3Rvci5pc0J1ZmZlcihvYmopXG59XG5cbi8vIEZvciBOb2RlIHYwLjEwIHN1cHBvcnQuIFJlbW92ZSB0aGlzIGV2ZW50dWFsbHkuXG5mdW5jdGlvbiBpc1Nsb3dCdWZmZXIgKG9iaikge1xuICByZXR1cm4gdHlwZW9mIG9iai5yZWFkRmxvYXRMRSA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2Ygb2JqLnNsaWNlID09PSAnZnVuY3Rpb24nICYmIGlzQnVmZmVyKG9iai5zbGljZSgwLCAwKSlcbn1cbiIsIi8qKiBNb2JYIC0gKGMpIE1pY2hlbCBXZXN0c3RyYXRlIDIwMTUgLSAyMDE4IC0gTUlUIExpY2Vuc2VkICovXG4vKiEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uIEFsbCByaWdodHMgcmVzZXJ2ZWQuXHJcbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZVxyXG50aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS4gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZVxyXG5MaWNlbnNlIGF0IGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG5cclxuVEhJUyBDT0RFIElTIFBST1ZJREVEIE9OIEFOICpBUyBJUyogQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWVxyXG5LSU5ELCBFSVRIRVIgRVhQUkVTUyBPUiBJTVBMSUVELCBJTkNMVURJTkcgV0lUSE9VVCBMSU1JVEFUSU9OIEFOWSBJTVBMSUVEXHJcbldBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBUSVRMRSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UsXHJcbk1FUkNIQU5UQUJMSVRZIE9SIE5PTi1JTkZSSU5HRU1FTlQuXHJcblxyXG5TZWUgdGhlIEFwYWNoZSBWZXJzaW9uIDIuMCBMaWNlbnNlIGZvciBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnNcclxuYW5kIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4vKiBnbG9iYWwgUmVmbGVjdCwgUHJvbWlzZSAqL1xyXG5cclxudmFyIGV4dGVuZFN0YXRpY3MgPSBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHxcclxuICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG5cclxuZnVuY3Rpb24gX19leHRlbmRzKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxufVxyXG5cclxudmFyIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiBfX2Fzc2lnbih0KSB7XHJcbiAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xyXG4gICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSkgdFtwXSA9IHNbcF07XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdDtcclxufTtcclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuZnVuY3Rpb24gX192YWx1ZXMobykge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdLCBpID0gMDtcclxuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59XHJcblxyXG5mdW5jdGlvbiBfX3JlYWQobywgbikge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xyXG4gICAgaWYgKCFtKSByZXR1cm4gbztcclxuICAgIHZhciBpID0gbS5jYWxsKG8pLCByLCBhciA9IFtdLCBlO1xyXG4gICAgdHJ5IHtcclxuICAgICAgICB3aGlsZSAoKG4gPT09IHZvaWQgMCB8fCBuLS0gPiAwKSAmJiAhKHIgPSBpLm5leHQoKSkuZG9uZSkgYXIucHVzaChyLnZhbHVlKTtcclxuICAgIH1cclxuICAgIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxyXG4gICAgZmluYWxseSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pKSBtLmNhbGwoaSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZpbmFsbHkgeyBpZiAoZSkgdGhyb3cgZS5lcnJvcjsgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5mdW5jdGlvbiBfX3NwcmVhZCgpIHtcclxuICAgIGZvciAodmFyIGFyID0gW10sIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgIGFyID0gYXIuY29uY2F0KF9fcmVhZChhcmd1bWVudHNbaV0pKTtcclxuICAgIHJldHVybiBhcjtcclxufVxuXG52YXIgT0JGVVNDQVRFRF9FUlJPUiQkMSA9IFwiQW4gaW52YXJpYW50IGZhaWxlZCwgaG93ZXZlciB0aGUgZXJyb3IgaXMgb2JmdXNjYXRlZCBiZWNhdXNlIHRoaXMgaXMgYW4gcHJvZHVjdGlvbiBidWlsZC5cIjtcbnZhciBFTVBUWV9BUlJBWSQkMSA9IFtdO1xuT2JqZWN0LmZyZWV6ZShFTVBUWV9BUlJBWSQkMSk7XG52YXIgRU1QVFlfT0JKRUNUJCQxID0ge307XG5PYmplY3QuZnJlZXplKEVNUFRZX09CSkVDVCQkMSk7XG5mdW5jdGlvbiBnZXROZXh0SWQkJDEoKSB7XG4gICAgcmV0dXJuICsrZ2xvYmFsU3RhdGUkJDEubW9ieEd1aWQ7XG59XG5mdW5jdGlvbiBmYWlsJCQxKG1lc3NhZ2UpIHtcbiAgICBpbnZhcmlhbnQkJDEoZmFsc2UsIG1lc3NhZ2UpO1xuICAgIHRocm93IFwiWFwiOyAvLyB1bnJlYWNoYWJsZVxufVxuZnVuY3Rpb24gaW52YXJpYW50JCQxKGNoZWNrLCBtZXNzYWdlKSB7XG4gICAgaWYgKCFjaGVjaylcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiW21vYnhdIFwiICsgKG1lc3NhZ2UgfHwgT0JGVVNDQVRFRF9FUlJPUiQkMSkpO1xufVxuLyoqXG4gKiBQcmludHMgYSBkZXByZWNhdGlvbiBtZXNzYWdlLCBidXQgb25seSBvbmUgdGltZS5cbiAqIFJldHVybnMgZmFsc2UgaWYgdGhlIGRlcHJlY2F0ZWQgbWVzc2FnZSB3YXMgYWxyZWFkeSBwcmludGVkIGJlZm9yZVxuICovXG52YXIgZGVwcmVjYXRlZE1lc3NhZ2VzID0gW107XG5mdW5jdGlvbiBkZXByZWNhdGVkJCQxKG1zZywgdGhpbmcpIHtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09IFwicHJvZHVjdGlvblwiKVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgaWYgKHRoaW5nKSB7XG4gICAgICAgIHJldHVybiBkZXByZWNhdGVkJCQxKFwiJ1wiICsgbXNnICsgXCInLCB1c2UgJ1wiICsgdGhpbmcgKyBcIicgaW5zdGVhZC5cIik7XG4gICAgfVxuICAgIGlmIChkZXByZWNhdGVkTWVzc2FnZXMuaW5kZXhPZihtc2cpICE9PSAtMSlcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIGRlcHJlY2F0ZWRNZXNzYWdlcy5wdXNoKG1zZyk7XG4gICAgY29uc29sZS5lcnJvcihcIlttb2J4XSBEZXByZWNhdGVkOiBcIiArIG1zZyk7XG4gICAgcmV0dXJuIHRydWU7XG59XG4vKipcbiAqIE1ha2VzIHN1cmUgdGhhdCB0aGUgcHJvdmlkZWQgZnVuY3Rpb24gaXMgaW52b2tlZCBhdCBtb3N0IG9uY2UuXG4gKi9cbmZ1bmN0aW9uIG9uY2UkJDEoZnVuYykge1xuICAgIHZhciBpbnZva2VkID0gZmFsc2U7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKGludm9rZWQpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGludm9rZWQgPSB0cnVlO1xuICAgICAgICByZXR1cm4gZnVuYy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH07XG59XG52YXIgbm9vcCQkMSA9IGZ1bmN0aW9uICgpIHsgfTtcbmZ1bmN0aW9uIHVuaXF1ZSQkMShsaXN0KSB7XG4gICAgdmFyIHJlcyA9IFtdO1xuICAgIGxpc3QuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICBpZiAocmVzLmluZGV4T2YoaXRlbSkgPT09IC0xKVxuICAgICAgICAgICAgcmVzLnB1c2goaXRlbSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHJlcztcbn1cbmZ1bmN0aW9uIGlzT2JqZWN0JCQxKHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlICE9PSBudWxsICYmIHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIjtcbn1cbmZ1bmN0aW9uIGlzUGxhaW5PYmplY3QkJDEodmFsdWUpIHtcbiAgICBpZiAodmFsdWUgPT09IG51bGwgfHwgdHlwZW9mIHZhbHVlICE9PSBcIm9iamVjdFwiKVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgdmFyIHByb3RvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKHZhbHVlKTtcbiAgICByZXR1cm4gcHJvdG8gPT09IE9iamVjdC5wcm90b3R5cGUgfHwgcHJvdG8gPT09IG51bGw7XG59XG5cbmZ1bmN0aW9uIGFkZEhpZGRlblByb3AkJDEob2JqZWN0LCBwcm9wTmFtZSwgdmFsdWUpIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqZWN0LCBwcm9wTmFtZSwge1xuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgdmFsdWU6IHZhbHVlXG4gICAgfSk7XG59XG5mdW5jdGlvbiBhZGRIaWRkZW5GaW5hbFByb3AkJDEob2JqZWN0LCBwcm9wTmFtZSwgdmFsdWUpIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqZWN0LCBwcm9wTmFtZSwge1xuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgd3JpdGFibGU6IGZhbHNlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgIHZhbHVlOiB2YWx1ZVxuICAgIH0pO1xufVxuZnVuY3Rpb24gaXNQcm9wZXJ0eUNvbmZpZ3VyYWJsZSQkMShvYmplY3QsIHByb3ApIHtcbiAgICB2YXIgZGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqZWN0LCBwcm9wKTtcbiAgICByZXR1cm4gIWRlc2NyaXB0b3IgfHwgKGRlc2NyaXB0b3IuY29uZmlndXJhYmxlICE9PSBmYWxzZSAmJiBkZXNjcmlwdG9yLndyaXRhYmxlICE9PSBmYWxzZSk7XG59XG5mdW5jdGlvbiBhc3NlcnRQcm9wZXJ0eUNvbmZpZ3VyYWJsZSQkMShvYmplY3QsIHByb3ApIHtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiICYmICFpc1Byb3BlcnR5Q29uZmlndXJhYmxlJCQxKG9iamVjdCwgcHJvcCkpXG4gICAgICAgIGZhaWwkJDEoXCJDYW5ub3QgbWFrZSBwcm9wZXJ0eSAnXCIgKyBwcm9wLnRvU3RyaW5nKCkgKyBcIicgb2JzZXJ2YWJsZSwgaXQgaXMgbm90IGNvbmZpZ3VyYWJsZSBhbmQgd3JpdGFibGUgaW4gdGhlIHRhcmdldCBvYmplY3RcIik7XG59XG5mdW5jdGlvbiBjcmVhdGVJbnN0YW5jZW9mUHJlZGljYXRlJCQxKG5hbWUsIGNsYXp6KSB7XG4gICAgdmFyIHByb3BOYW1lID0gXCJpc01vYlhcIiArIG5hbWU7XG4gICAgY2xhenoucHJvdG90eXBlW3Byb3BOYW1lXSA9IHRydWU7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICh4KSB7XG4gICAgICAgIHJldHVybiBpc09iamVjdCQkMSh4KSAmJiB4W3Byb3BOYW1lXSA9PT0gdHJ1ZTtcbiAgICB9O1xufVxuLyoqXG4gKiBSZXR1cm5zIHdoZXRoZXIgdGhlIGFyZ3VtZW50IGlzIGFuIGFycmF5LCBkaXNyZWdhcmRpbmcgb2JzZXJ2YWJpbGl0eS5cbiAqL1xuZnVuY3Rpb24gaXNBcnJheUxpa2UkJDEoeCkge1xuICAgIHJldHVybiBBcnJheS5pc0FycmF5KHgpIHx8IGlzT2JzZXJ2YWJsZUFycmF5JCQxKHgpO1xufVxuZnVuY3Rpb24gaXNFUzZNYXAkJDEodGhpbmcpIHtcbiAgICByZXR1cm4gdGhpbmcgaW5zdGFuY2VvZiBNYXA7XG59XG5mdW5jdGlvbiBpc0VTNlNldCQkMSh0aGluZykge1xuICAgIHJldHVybiB0aGluZyBpbnN0YW5jZW9mIFNldDtcbn1cbmZ1bmN0aW9uIGdldE1hcExpa2VLZXlzJCQxKG1hcCkge1xuICAgIGlmIChpc1BsYWluT2JqZWN0JCQxKG1hcCkpXG4gICAgICAgIHJldHVybiBPYmplY3Qua2V5cyhtYXApO1xuICAgIGlmIChBcnJheS5pc0FycmF5KG1hcCkpXG4gICAgICAgIHJldHVybiBtYXAubWFwKGZ1bmN0aW9uIChfYSkge1xuICAgICAgICAgICAgdmFyIF9iID0gX19yZWFkKF9hLCAxKSwga2V5ID0gX2JbMF07XG4gICAgICAgICAgICByZXR1cm4ga2V5O1xuICAgICAgICB9KTtcbiAgICBpZiAoaXNFUzZNYXAkJDEobWFwKSB8fCBpc09ic2VydmFibGVNYXAkJDEobWFwKSlcbiAgICAgICAgcmV0dXJuIEFycmF5LmZyb20obWFwLmtleXMoKSk7XG4gICAgcmV0dXJuIGZhaWwkJDEoXCJDYW5ub3QgZ2V0IGtleXMgZnJvbSAnXCIgKyBtYXAgKyBcIidcIik7XG59XG5mdW5jdGlvbiB0b1ByaW1pdGl2ZSQkMSh2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZSA9PT0gbnVsbCA/IG51bGwgOiB0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIgPyBcIlwiICsgdmFsdWUgOiB2YWx1ZTtcbn1cblxudmFyICRtb2J4JCQxID0gU3ltYm9sKFwibW9ieCBhZG1pbmlzdHJhdGlvblwiKTtcbnZhciBBdG9tJCQxID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIG5ldyBhdG9tLiBGb3IgZGVidWdnaW5nIHB1cnBvc2VzIGl0IGlzIHJlY29tbWVuZGVkIHRvIGdpdmUgaXQgYSBuYW1lLlxuICAgICAqIFRoZSBvbkJlY29tZU9ic2VydmVkIGFuZCBvbkJlY29tZVVub2JzZXJ2ZWQgY2FsbGJhY2tzIGNhbiBiZSB1c2VkIGZvciByZXNvdXJjZSBtYW5hZ2VtZW50LlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIEF0b20kJDEobmFtZSkge1xuICAgICAgICBpZiAobmFtZSA9PT0gdm9pZCAwKSB7IG5hbWUgPSBcIkF0b21AXCIgKyBnZXROZXh0SWQkJDEoKTsgfVxuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLmlzUGVuZGluZ1Vub2JzZXJ2YXRpb24gPSBmYWxzZTsgLy8gZm9yIGVmZmVjdGl2ZSB1bm9ic2VydmluZy4gQmFzZUF0b20gaGFzIHRydWUsIGZvciBleHRyYSBvcHRpbWl6YXRpb24sIHNvIGl0cyBvbkJlY29tZVVub2JzZXJ2ZWQgbmV2ZXIgZ2V0cyBjYWxsZWQsIGJlY2F1c2UgaXQncyBub3QgbmVlZGVkXG4gICAgICAgIHRoaXMuaXNCZWluZ09ic2VydmVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMub2JzZXJ2ZXJzID0gbmV3IFNldCgpO1xuICAgICAgICB0aGlzLmRpZmZWYWx1ZSA9IDA7XG4gICAgICAgIHRoaXMubGFzdEFjY2Vzc2VkQnkgPSAwO1xuICAgICAgICB0aGlzLmxvd2VzdE9ic2VydmVyU3RhdGUgPSBJRGVyaXZhdGlvblN0YXRlLk5PVF9UUkFDS0lORztcbiAgICB9XG4gICAgQXRvbSQkMS5wcm90b3R5cGUub25CZWNvbWVPYnNlcnZlZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMub25CZWNvbWVPYnNlcnZlZExpc3RlbmVycykge1xuICAgICAgICAgICAgdGhpcy5vbkJlY29tZU9ic2VydmVkTGlzdGVuZXJzLmZvckVhY2goZnVuY3Rpb24gKGxpc3RlbmVyKSB7IHJldHVybiBsaXN0ZW5lcigpOyB9KTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgQXRvbSQkMS5wcm90b3R5cGUub25CZWNvbWVVbm9ic2VydmVkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5vbkJlY29tZVVub2JzZXJ2ZWRMaXN0ZW5lcnMpIHtcbiAgICAgICAgICAgIHRoaXMub25CZWNvbWVVbm9ic2VydmVkTGlzdGVuZXJzLmZvckVhY2goZnVuY3Rpb24gKGxpc3RlbmVyKSB7IHJldHVybiBsaXN0ZW5lcigpOyB9KTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgLyoqXG4gICAgICogSW52b2tlIHRoaXMgbWV0aG9kIHRvIG5vdGlmeSBtb2J4IHRoYXQgeW91ciBhdG9tIGhhcyBiZWVuIHVzZWQgc29tZWhvdy5cbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlcmUgaXMgY3VycmVudGx5IGEgcmVhY3RpdmUgY29udGV4dC5cbiAgICAgKi9cbiAgICBBdG9tJCQxLnByb3RvdHlwZS5yZXBvcnRPYnNlcnZlZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHJlcG9ydE9ic2VydmVkJCQxKHRoaXMpO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogSW52b2tlIHRoaXMgbWV0aG9kIF9hZnRlcl8gdGhpcyBtZXRob2QgaGFzIGNoYW5nZWQgdG8gc2lnbmFsIG1vYnggdGhhdCBhbGwgaXRzIG9ic2VydmVycyBzaG91bGQgaW52YWxpZGF0ZS5cbiAgICAgKi9cbiAgICBBdG9tJCQxLnByb3RvdHlwZS5yZXBvcnRDaGFuZ2VkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBzdGFydEJhdGNoJCQxKCk7XG4gICAgICAgIHByb3BhZ2F0ZUNoYW5nZWQkJDEodGhpcyk7XG4gICAgICAgIGVuZEJhdGNoJCQxKCk7XG4gICAgfTtcbiAgICBBdG9tJCQxLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubmFtZTtcbiAgICB9O1xuICAgIHJldHVybiBBdG9tJCQxO1xufSgpKTtcbnZhciBpc0F0b20kJDEgPSBjcmVhdGVJbnN0YW5jZW9mUHJlZGljYXRlJCQxKFwiQXRvbVwiLCBBdG9tJCQxKTtcbmZ1bmN0aW9uIGNyZWF0ZUF0b20kJDEobmFtZSwgb25CZWNvbWVPYnNlcnZlZEhhbmRsZXIsIG9uQmVjb21lVW5vYnNlcnZlZEhhbmRsZXIpIHtcbiAgICBpZiAob25CZWNvbWVPYnNlcnZlZEhhbmRsZXIgPT09IHZvaWQgMCkgeyBvbkJlY29tZU9ic2VydmVkSGFuZGxlciA9IG5vb3AkJDE7IH1cbiAgICBpZiAob25CZWNvbWVVbm9ic2VydmVkSGFuZGxlciA9PT0gdm9pZCAwKSB7IG9uQmVjb21lVW5vYnNlcnZlZEhhbmRsZXIgPSBub29wJCQxOyB9XG4gICAgdmFyIGF0b20gPSBuZXcgQXRvbSQkMShuYW1lKTtcbiAgICAvLyBkZWZhdWx0IGBub29wYCBsaXN0ZW5lciB3aWxsIG5vdCBpbml0aWFsaXplIHRoZSBob29rIFNldFxuICAgIGlmIChvbkJlY29tZU9ic2VydmVkSGFuZGxlciAhPT0gbm9vcCQkMSkge1xuICAgICAgICBvbkJlY29tZU9ic2VydmVkJCQxKGF0b20sIG9uQmVjb21lT2JzZXJ2ZWRIYW5kbGVyKTtcbiAgICB9XG4gICAgaWYgKG9uQmVjb21lVW5vYnNlcnZlZEhhbmRsZXIgIT09IG5vb3AkJDEpIHtcbiAgICAgICAgb25CZWNvbWVVbm9ic2VydmVkJCQxKGF0b20sIG9uQmVjb21lVW5vYnNlcnZlZEhhbmRsZXIpO1xuICAgIH1cbiAgICByZXR1cm4gYXRvbTtcbn1cblxuZnVuY3Rpb24gaWRlbnRpdHlDb21wYXJlcihhLCBiKSB7XG4gICAgcmV0dXJuIGEgPT09IGI7XG59XG5mdW5jdGlvbiBzdHJ1Y3R1cmFsQ29tcGFyZXIoYSwgYikge1xuICAgIHJldHVybiBkZWVwRXF1YWwkJDEoYSwgYik7XG59XG5mdW5jdGlvbiBkZWZhdWx0Q29tcGFyZXIoYSwgYikge1xuICAgIHJldHVybiBPYmplY3QuaXMoYSwgYik7XG59XG52YXIgY29tcGFyZXIkJDEgPSB7XG4gICAgaWRlbnRpdHk6IGlkZW50aXR5Q29tcGFyZXIsXG4gICAgc3RydWN0dXJhbDogc3RydWN0dXJhbENvbXBhcmVyLFxuICAgIGRlZmF1bHQ6IGRlZmF1bHRDb21wYXJlclxufTtcblxudmFyIG1vYnhEaWRSdW5MYXp5SW5pdGlhbGl6ZXJzU3ltYm9sJCQxID0gU3ltYm9sKFwibW9ieCBkaWQgcnVuIGxhenkgaW5pdGlhbGl6ZXJzXCIpO1xudmFyIG1vYnhQZW5kaW5nRGVjb3JhdG9ycyQkMSA9IFN5bWJvbChcIm1vYnggcGVuZGluZyBkZWNvcmF0b3JzXCIpO1xudmFyIGVudW1lcmFibGVEZXNjcmlwdG9yQ2FjaGUgPSB7fTtcbnZhciBub25FbnVtZXJhYmxlRGVzY3JpcHRvckNhY2hlID0ge307XG5mdW5jdGlvbiBjcmVhdGVQcm9wZXJ0eUluaXRpYWxpemVyRGVzY3JpcHRvcihwcm9wLCBlbnVtZXJhYmxlKSB7XG4gICAgdmFyIGNhY2hlID0gZW51bWVyYWJsZSA/IGVudW1lcmFibGVEZXNjcmlwdG9yQ2FjaGUgOiBub25FbnVtZXJhYmxlRGVzY3JpcHRvckNhY2hlO1xuICAgIHJldHVybiAoY2FjaGVbcHJvcF0gfHxcbiAgICAgICAgKGNhY2hlW3Byb3BdID0ge1xuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgZW51bWVyYWJsZTogZW51bWVyYWJsZSxcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGluaXRpYWxpemVJbnN0YW5jZSQkMSh0aGlzKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpc1twcm9wXTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGluaXRpYWxpemVJbnN0YW5jZSQkMSh0aGlzKTtcbiAgICAgICAgICAgICAgICB0aGlzW3Byb3BdID0gdmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pKTtcbn1cbmZ1bmN0aW9uIGluaXRpYWxpemVJbnN0YW5jZSQkMSh0YXJnZXQpIHtcbiAgICBpZiAodGFyZ2V0W21vYnhEaWRSdW5MYXp5SW5pdGlhbGl6ZXJzU3ltYm9sJCQxXSA9PT0gdHJ1ZSlcbiAgICAgICAgcmV0dXJuO1xuICAgIHZhciBkZWNvcmF0b3JzID0gdGFyZ2V0W21vYnhQZW5kaW5nRGVjb3JhdG9ycyQkMV07XG4gICAgaWYgKGRlY29yYXRvcnMpIHtcbiAgICAgICAgYWRkSGlkZGVuUHJvcCQkMSh0YXJnZXQsIG1vYnhEaWRSdW5MYXp5SW5pdGlhbGl6ZXJzU3ltYm9sJCQxLCB0cnVlKTtcbiAgICAgICAgZm9yICh2YXIga2V5IGluIGRlY29yYXRvcnMpIHtcbiAgICAgICAgICAgIHZhciBkID0gZGVjb3JhdG9yc1trZXldO1xuICAgICAgICAgICAgZC5wcm9wZXJ0eUNyZWF0b3IodGFyZ2V0LCBkLnByb3AsIGQuZGVzY3JpcHRvciwgZC5kZWNvcmF0b3JUYXJnZXQsIGQuZGVjb3JhdG9yQXJndW1lbnRzKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmZ1bmN0aW9uIGNyZWF0ZVByb3BEZWNvcmF0b3IkJDEocHJvcGVydHlJbml0aWFsbHlFbnVtZXJhYmxlLCBwcm9wZXJ0eUNyZWF0b3IpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gZGVjb3JhdG9yRmFjdG9yeSgpIHtcbiAgICAgICAgdmFyIGRlY29yYXRvckFyZ3VtZW50cztcbiAgICAgICAgdmFyIGRlY29yYXRvciA9IGZ1bmN0aW9uIGRlY29yYXRlJCQxKHRhcmdldCwgcHJvcCwgZGVzY3JpcHRvciwgYXBwbHlJbW1lZGlhdGVseVxuICAgICAgICAvLyBUaGlzIGlzIGEgc3BlY2lhbCBwYXJhbWV0ZXIgdG8gc2lnbmFsIHRoZSBkaXJlY3QgYXBwbGljYXRpb24gb2YgYSBkZWNvcmF0b3IsIGFsbG93IGV4dGVuZE9ic2VydmFibGUgdG8gc2tpcCB0aGUgZW50aXJlIHR5cGUgZGVjb3JhdGlvbiBwYXJ0LFxuICAgICAgICAvLyBhcyB0aGUgaW5zdGFuY2UgdG8gYXBwbHkgdGhlIGRlY29yYXRvciB0byBlcXVhbHMgdGhlIHRhcmdldFxuICAgICAgICApIHtcbiAgICAgICAgICAgIGlmIChhcHBseUltbWVkaWF0ZWx5ID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgcHJvcGVydHlDcmVhdG9yKHRhcmdldCwgcHJvcCwgZGVzY3JpcHRvciwgdGFyZ2V0LCBkZWNvcmF0b3JBcmd1bWVudHMpO1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiAmJiAhcXVhY2tzTGlrZUFEZWNvcmF0b3IkJDEoYXJndW1lbnRzKSlcbiAgICAgICAgICAgICAgICBmYWlsJCQxKFwiVGhpcyBmdW5jdGlvbiBpcyBhIGRlY29yYXRvciwgYnV0IGl0IHdhc24ndCBpbnZva2VkIGxpa2UgYSBkZWNvcmF0b3JcIik7XG4gICAgICAgICAgICBpZiAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCh0YXJnZXQsIG1vYnhQZW5kaW5nRGVjb3JhdG9ycyQkMSkpIHtcbiAgICAgICAgICAgICAgICB2YXIgaW5oZXJpdGVkRGVjb3JhdG9ycyA9IHRhcmdldFttb2J4UGVuZGluZ0RlY29yYXRvcnMkJDFdO1xuICAgICAgICAgICAgICAgIGFkZEhpZGRlblByb3AkJDEodGFyZ2V0LCBtb2J4UGVuZGluZ0RlY29yYXRvcnMkJDEsIF9fYXNzaWduKHt9LCBpbmhlcml0ZWREZWNvcmF0b3JzKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0YXJnZXRbbW9ieFBlbmRpbmdEZWNvcmF0b3JzJCQxXVtwcm9wXSA9IHtcbiAgICAgICAgICAgICAgICBwcm9wOiBwcm9wLFxuICAgICAgICAgICAgICAgIHByb3BlcnR5Q3JlYXRvcjogcHJvcGVydHlDcmVhdG9yLFxuICAgICAgICAgICAgICAgIGRlc2NyaXB0b3I6IGRlc2NyaXB0b3IsXG4gICAgICAgICAgICAgICAgZGVjb3JhdG9yVGFyZ2V0OiB0YXJnZXQsXG4gICAgICAgICAgICAgICAgZGVjb3JhdG9yQXJndW1lbnRzOiBkZWNvcmF0b3JBcmd1bWVudHNcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICByZXR1cm4gY3JlYXRlUHJvcGVydHlJbml0aWFsaXplckRlc2NyaXB0b3IocHJvcCwgcHJvcGVydHlJbml0aWFsbHlFbnVtZXJhYmxlKTtcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKHF1YWNrc0xpa2VBRGVjb3JhdG9yJCQxKGFyZ3VtZW50cykpIHtcbiAgICAgICAgICAgIC8vIEBkZWNvcmF0b3JcbiAgICAgICAgICAgIGRlY29yYXRvckFyZ3VtZW50cyA9IEVNUFRZX0FSUkFZJCQxO1xuICAgICAgICAgICAgcmV0dXJuIGRlY29yYXRvci5hcHBseShudWxsLCBhcmd1bWVudHMpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gQGRlY29yYXRvcihhcmdzKVxuICAgICAgICAgICAgZGVjb3JhdG9yQXJndW1lbnRzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcbiAgICAgICAgICAgIHJldHVybiBkZWNvcmF0b3I7XG4gICAgICAgIH1cbiAgICB9O1xufVxuZnVuY3Rpb24gcXVhY2tzTGlrZUFEZWNvcmF0b3IkJDEoYXJncykge1xuICAgIHJldHVybiAoKChhcmdzLmxlbmd0aCA9PT0gMiB8fCBhcmdzLmxlbmd0aCA9PT0gMykgJiYgdHlwZW9mIGFyZ3NbMV0gPT09IFwic3RyaW5nXCIpIHx8XG4gICAgICAgIChhcmdzLmxlbmd0aCA9PT0gNCAmJiBhcmdzWzNdID09PSB0cnVlKSk7XG59XG5cbmZ1bmN0aW9uIGRlZXBFbmhhbmNlciQkMSh2LCBfLCBuYW1lKSB7XG4gICAgLy8gaXQgaXMgYW4gb2JzZXJ2YWJsZSBhbHJlYWR5LCBkb25lXG4gICAgaWYgKGlzT2JzZXJ2YWJsZSQkMSh2KSlcbiAgICAgICAgcmV0dXJuIHY7XG4gICAgLy8gc29tZXRoaW5nIHRoYXQgY2FuIGJlIGNvbnZlcnRlZCBhbmQgbXV0YXRlZD9cbiAgICBpZiAoQXJyYXkuaXNBcnJheSh2KSlcbiAgICAgICAgcmV0dXJuIG9ic2VydmFibGUkJDEuYXJyYXkodiwgeyBuYW1lOiBuYW1lIH0pO1xuICAgIGlmIChpc1BsYWluT2JqZWN0JCQxKHYpKVxuICAgICAgICByZXR1cm4gb2JzZXJ2YWJsZSQkMS5vYmplY3QodiwgdW5kZWZpbmVkLCB7IG5hbWU6IG5hbWUgfSk7XG4gICAgaWYgKGlzRVM2TWFwJCQxKHYpKVxuICAgICAgICByZXR1cm4gb2JzZXJ2YWJsZSQkMS5tYXAodiwgeyBuYW1lOiBuYW1lIH0pO1xuICAgIGlmIChpc0VTNlNldCQkMSh2KSlcbiAgICAgICAgcmV0dXJuIG9ic2VydmFibGUkJDEuc2V0KHYsIHsgbmFtZTogbmFtZSB9KTtcbiAgICByZXR1cm4gdjtcbn1cbmZ1bmN0aW9uIHNoYWxsb3dFbmhhbmNlciQkMSh2LCBfLCBuYW1lKSB7XG4gICAgaWYgKHYgPT09IHVuZGVmaW5lZCB8fCB2ID09PSBudWxsKVxuICAgICAgICByZXR1cm4gdjtcbiAgICBpZiAoaXNPYnNlcnZhYmxlT2JqZWN0JCQxKHYpIHx8IGlzT2JzZXJ2YWJsZUFycmF5JCQxKHYpIHx8IGlzT2JzZXJ2YWJsZU1hcCQkMSh2KSB8fCBpc09ic2VydmFibGVTZXQkJDEodikpXG4gICAgICAgIHJldHVybiB2O1xuICAgIGlmIChBcnJheS5pc0FycmF5KHYpKVxuICAgICAgICByZXR1cm4gb2JzZXJ2YWJsZSQkMS5hcnJheSh2LCB7IG5hbWU6IG5hbWUsIGRlZXA6IGZhbHNlIH0pO1xuICAgIGlmIChpc1BsYWluT2JqZWN0JCQxKHYpKVxuICAgICAgICByZXR1cm4gb2JzZXJ2YWJsZSQkMS5vYmplY3QodiwgdW5kZWZpbmVkLCB7IG5hbWU6IG5hbWUsIGRlZXA6IGZhbHNlIH0pO1xuICAgIGlmIChpc0VTNk1hcCQkMSh2KSlcbiAgICAgICAgcmV0dXJuIG9ic2VydmFibGUkJDEubWFwKHYsIHsgbmFtZTogbmFtZSwgZGVlcDogZmFsc2UgfSk7XG4gICAgaWYgKGlzRVM2U2V0JCQxKHYpKVxuICAgICAgICByZXR1cm4gb2JzZXJ2YWJsZSQkMS5zZXQodiwgeyBuYW1lOiBuYW1lLCBkZWVwOiBmYWxzZSB9KTtcbiAgICByZXR1cm4gZmFpbCQkMShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgJiZcbiAgICAgICAgXCJUaGUgc2hhbGxvdyBtb2RpZmllciAvIGRlY29yYXRvciBjYW4gb25seSB1c2VkIGluIGNvbWJpbmF0aW9uIHdpdGggYXJyYXlzLCBvYmplY3RzLCBtYXBzIGFuZCBzZXRzXCIpO1xufVxuZnVuY3Rpb24gcmVmZXJlbmNlRW5oYW5jZXIkJDEobmV3VmFsdWUpIHtcbiAgICAvLyBuZXZlciB0dXJuIGludG8gYW4gb2JzZXJ2YWJsZVxuICAgIHJldHVybiBuZXdWYWx1ZTtcbn1cbmZ1bmN0aW9uIHJlZlN0cnVjdEVuaGFuY2VyJCQxKHYsIG9sZFZhbHVlLCBuYW1lKSB7XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiAmJiBpc09ic2VydmFibGUkJDEodikpXG4gICAgICAgIHRocm93IFwib2JzZXJ2YWJsZS5zdHJ1Y3Qgc2hvdWxkIG5vdCBiZSB1c2VkIHdpdGggb2JzZXJ2YWJsZSB2YWx1ZXNcIjtcbiAgICBpZiAoZGVlcEVxdWFsJCQxKHYsIG9sZFZhbHVlKSlcbiAgICAgICAgcmV0dXJuIG9sZFZhbHVlO1xuICAgIHJldHVybiB2O1xufVxuXG5mdW5jdGlvbiBjcmVhdGVEZWNvcmF0b3JGb3JFbmhhbmNlciQkMShlbmhhbmNlcikge1xuICAgIGludmFyaWFudCQkMShlbmhhbmNlcik7XG4gICAgdmFyIGRlY29yYXRvciA9IGNyZWF0ZVByb3BEZWNvcmF0b3IkJDEodHJ1ZSwgZnVuY3Rpb24gKHRhcmdldCwgcHJvcGVydHlOYW1lLCBkZXNjcmlwdG9yLCBfZGVjb3JhdG9yVGFyZ2V0LCBkZWNvcmF0b3JBcmdzKSB7XG4gICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgICAgICAgICAgIGludmFyaWFudCQkMSghZGVzY3JpcHRvciB8fCAhZGVzY3JpcHRvci5nZXQsIFwiQG9ic2VydmFibGUgY2Fubm90IGJlIHVzZWQgb24gZ2V0dGVyIChwcm9wZXJ0eSBcXFwiXCIgKyBwcm9wZXJ0eU5hbWUgKyBcIlxcXCIpLCB1c2UgQGNvbXB1dGVkIGluc3RlYWQuXCIpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBpbml0aWFsVmFsdWUgPSBkZXNjcmlwdG9yXG4gICAgICAgICAgICA/IGRlc2NyaXB0b3IuaW5pdGlhbGl6ZXJcbiAgICAgICAgICAgICAgICA/IGRlc2NyaXB0b3IuaW5pdGlhbGl6ZXIuY2FsbCh0YXJnZXQpXG4gICAgICAgICAgICAgICAgOiBkZXNjcmlwdG9yLnZhbHVlXG4gICAgICAgICAgICA6IHVuZGVmaW5lZDtcbiAgICAgICAgYXNPYnNlcnZhYmxlT2JqZWN0JCQxKHRhcmdldCkuYWRkT2JzZXJ2YWJsZVByb3AocHJvcGVydHlOYW1lLCBpbml0aWFsVmFsdWUsIGVuaGFuY2VyKTtcbiAgICB9KTtcbiAgICB2YXIgcmVzID0gXG4gICAgLy8gRXh0cmEgcHJvY2VzcyBjaGVja3MsIGFzIHRoaXMgaGFwcGVucyBkdXJpbmcgbW9kdWxlIGluaXRpYWxpemF0aW9uXG4gICAgdHlwZW9mIHByb2Nlc3MgIT09IFwidW5kZWZpbmVkXCIgJiYgcHJvY2Vzcy5lbnYgJiYgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiXG4gICAgICAgID8gZnVuY3Rpb24gb2JzZXJ2YWJsZURlY29yYXRvcigpIHtcbiAgICAgICAgICAgIC8vIFRoaXMgd3JhcHBlciBmdW5jdGlvbiBpcyBqdXN0IHRvIGRldGVjdCBpbGxlZ2FsIGRlY29yYXRvciBpbnZvY2F0aW9ucywgZGVwcmVjYXRlIGluIGEgbmV4dCB2ZXJzaW9uXG4gICAgICAgICAgICAvLyBhbmQgc2ltcGx5IHJldHVybiB0aGUgY3JlYXRlZCBwcm9wIGRlY29yYXRvclxuICAgICAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPCAyKVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWlsJCQxKFwiSW5jb3JyZWN0IGRlY29yYXRvciBpbnZvY2F0aW9uLiBAb2JzZXJ2YWJsZSBkZWNvcmF0b3IgZG9lc24ndCBleHBlY3QgYW55IGFyZ3VtZW50c1wiKTtcbiAgICAgICAgICAgIHJldHVybiBkZWNvcmF0b3IuYXBwbHkobnVsbCwgYXJndW1lbnRzKTtcbiAgICAgICAgfVxuICAgICAgICA6IGRlY29yYXRvcjtcbiAgICByZXMuZW5oYW5jZXIgPSBlbmhhbmNlcjtcbiAgICByZXR1cm4gcmVzO1xufVxuXG4vLyBQcmVkZWZpbmVkIGJhZ3Mgb2YgY3JlYXRlIG9ic2VydmFibGUgb3B0aW9ucywgdG8gYXZvaWQgYWxsb2NhdGluZyB0ZW1wb3JhcmlseSBvcHRpb24gb2JqZWN0c1xuLy8gaW4gdGhlIG1ham9yaXR5IG9mIGNhc2VzXG52YXIgZGVmYXVsdENyZWF0ZU9ic2VydmFibGVPcHRpb25zJCQxID0ge1xuICAgIGRlZXA6IHRydWUsXG4gICAgbmFtZTogdW5kZWZpbmVkLFxuICAgIGRlZmF1bHREZWNvcmF0b3I6IHVuZGVmaW5lZCxcbiAgICBwcm94eTogdHJ1ZVxufTtcbk9iamVjdC5mcmVlemUoZGVmYXVsdENyZWF0ZU9ic2VydmFibGVPcHRpb25zJCQxKTtcbmZ1bmN0aW9uIGFzc2VydFZhbGlkT3B0aW9uKGtleSkge1xuICAgIGlmICghL14oZGVlcHxuYW1lfGVxdWFsc3xkZWZhdWx0RGVjb3JhdG9yfHByb3h5KSQvLnRlc3Qoa2V5KSlcbiAgICAgICAgZmFpbCQkMShcImludmFsaWQgb3B0aW9uIGZvciAoZXh0ZW5kKW9ic2VydmFibGU6IFwiICsga2V5KTtcbn1cbmZ1bmN0aW9uIGFzQ3JlYXRlT2JzZXJ2YWJsZU9wdGlvbnMkJDEodGhpbmcpIHtcbiAgICBpZiAodGhpbmcgPT09IG51bGwgfHwgdGhpbmcgPT09IHVuZGVmaW5lZClcbiAgICAgICAgcmV0dXJuIGRlZmF1bHRDcmVhdGVPYnNlcnZhYmxlT3B0aW9ucyQkMTtcbiAgICBpZiAodHlwZW9mIHRoaW5nID09PSBcInN0cmluZ1wiKVxuICAgICAgICByZXR1cm4geyBuYW1lOiB0aGluZywgZGVlcDogdHJ1ZSwgcHJveHk6IHRydWUgfTtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdGhpbmcgIT09IFwib2JqZWN0XCIpXG4gICAgICAgICAgICByZXR1cm4gZmFpbCQkMShcImV4cGVjdGVkIG9wdGlvbnMgb2JqZWN0XCIpO1xuICAgICAgICBPYmplY3Qua2V5cyh0aGluZykuZm9yRWFjaChhc3NlcnRWYWxpZE9wdGlvbik7XG4gICAgfVxuICAgIHJldHVybiB0aGluZztcbn1cbnZhciBkZWVwRGVjb3JhdG9yJCQxID0gY3JlYXRlRGVjb3JhdG9yRm9yRW5oYW5jZXIkJDEoZGVlcEVuaGFuY2VyJCQxKTtcbnZhciBzaGFsbG93RGVjb3JhdG9yID0gY3JlYXRlRGVjb3JhdG9yRm9yRW5oYW5jZXIkJDEoc2hhbGxvd0VuaGFuY2VyJCQxKTtcbnZhciByZWZEZWNvcmF0b3IkJDEgPSBjcmVhdGVEZWNvcmF0b3JGb3JFbmhhbmNlciQkMShyZWZlcmVuY2VFbmhhbmNlciQkMSk7XG52YXIgcmVmU3RydWN0RGVjb3JhdG9yID0gY3JlYXRlRGVjb3JhdG9yRm9yRW5oYW5jZXIkJDEocmVmU3RydWN0RW5oYW5jZXIkJDEpO1xuZnVuY3Rpb24gZ2V0RW5oYW5jZXJGcm9tT3B0aW9ucyhvcHRpb25zKSB7XG4gICAgcmV0dXJuIG9wdGlvbnMuZGVmYXVsdERlY29yYXRvclxuICAgICAgICA/IG9wdGlvbnMuZGVmYXVsdERlY29yYXRvci5lbmhhbmNlclxuICAgICAgICA6IG9wdGlvbnMuZGVlcCA9PT0gZmFsc2VcbiAgICAgICAgICAgID8gcmVmZXJlbmNlRW5oYW5jZXIkJDFcbiAgICAgICAgICAgIDogZGVlcEVuaGFuY2VyJCQxO1xufVxuLyoqXG4gKiBUdXJucyBhbiBvYmplY3QsIGFycmF5IG9yIGZ1bmN0aW9uIGludG8gYSByZWFjdGl2ZSBzdHJ1Y3R1cmUuXG4gKiBAcGFyYW0gdiB0aGUgdmFsdWUgd2hpY2ggc2hvdWxkIGJlY29tZSBvYnNlcnZhYmxlLlxuICovXG5mdW5jdGlvbiBjcmVhdGVPYnNlcnZhYmxlKHYsIGFyZzIsIGFyZzMpIHtcbiAgICAvLyBAb2JzZXJ2YWJsZSBzb21lUHJvcDtcbiAgICBpZiAodHlwZW9mIGFyZ3VtZW50c1sxXSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICByZXR1cm4gZGVlcERlY29yYXRvciQkMS5hcHBseShudWxsLCBhcmd1bWVudHMpO1xuICAgIH1cbiAgICAvLyBpdCBpcyBhbiBvYnNlcnZhYmxlIGFscmVhZHksIGRvbmVcbiAgICBpZiAoaXNPYnNlcnZhYmxlJCQxKHYpKVxuICAgICAgICByZXR1cm4gdjtcbiAgICAvLyBzb21ldGhpbmcgdGhhdCBjYW4gYmUgY29udmVydGVkIGFuZCBtdXRhdGVkP1xuICAgIHZhciByZXMgPSBpc1BsYWluT2JqZWN0JCQxKHYpXG4gICAgICAgID8gb2JzZXJ2YWJsZSQkMS5vYmplY3QodiwgYXJnMiwgYXJnMylcbiAgICAgICAgOiBBcnJheS5pc0FycmF5KHYpXG4gICAgICAgICAgICA/IG9ic2VydmFibGUkJDEuYXJyYXkodiwgYXJnMilcbiAgICAgICAgICAgIDogaXNFUzZNYXAkJDEodilcbiAgICAgICAgICAgICAgICA/IG9ic2VydmFibGUkJDEubWFwKHYsIGFyZzIpXG4gICAgICAgICAgICAgICAgOiBpc0VTNlNldCQkMSh2KVxuICAgICAgICAgICAgICAgICAgICA/IG9ic2VydmFibGUkJDEuc2V0KHYsIGFyZzIpXG4gICAgICAgICAgICAgICAgICAgIDogdjtcbiAgICAvLyB0aGlzIHZhbHVlIGNvdWxkIGJlIGNvbnZlcnRlZCB0byBhIG5ldyBvYnNlcnZhYmxlIGRhdGEgc3RydWN0dXJlLCByZXR1cm4gaXRcbiAgICBpZiAocmVzICE9PSB2KVxuICAgICAgICByZXR1cm4gcmVzO1xuICAgIC8vIG90aGVyd2lzZSwganVzdCBib3ggaXRcbiAgICBmYWlsJCQxKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiAmJlxuICAgICAgICBcIlRoZSBwcm92aWRlZCB2YWx1ZSBjb3VsZCBub3QgYmUgY29udmVydGVkIGludG8gYW4gb2JzZXJ2YWJsZS4gSWYgeW91IHdhbnQganVzdCBjcmVhdGUgYW4gb2JzZXJ2YWJsZSByZWZlcmVuY2UgdG8gdGhlIG9iamVjdCB1c2UgJ29ic2VydmFibGUuYm94KHZhbHVlKSdcIik7XG59XG52YXIgb2JzZXJ2YWJsZUZhY3RvcmllcyA9IHtcbiAgICBib3g6IGZ1bmN0aW9uICh2YWx1ZSwgb3B0aW9ucykge1xuICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDIpXG4gICAgICAgICAgICBpbmNvcnJlY3RseVVzZWRBc0RlY29yYXRvcihcImJveFwiKTtcbiAgICAgICAgdmFyIG8gPSBhc0NyZWF0ZU9ic2VydmFibGVPcHRpb25zJCQxKG9wdGlvbnMpO1xuICAgICAgICByZXR1cm4gbmV3IE9ic2VydmFibGVWYWx1ZSQkMSh2YWx1ZSwgZ2V0RW5oYW5jZXJGcm9tT3B0aW9ucyhvKSwgby5uYW1lLCB0cnVlLCBvLmVxdWFscyk7XG4gICAgfSxcbiAgICBhcnJheTogZnVuY3Rpb24gKGluaXRpYWxWYWx1ZXMsIG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAyKVxuICAgICAgICAgICAgaW5jb3JyZWN0bHlVc2VkQXNEZWNvcmF0b3IoXCJhcnJheVwiKTtcbiAgICAgICAgdmFyIG8gPSBhc0NyZWF0ZU9ic2VydmFibGVPcHRpb25zJCQxKG9wdGlvbnMpO1xuICAgICAgICByZXR1cm4gY3JlYXRlT2JzZXJ2YWJsZUFycmF5JCQxKGluaXRpYWxWYWx1ZXMsIGdldEVuaGFuY2VyRnJvbU9wdGlvbnMobyksIG8ubmFtZSk7XG4gICAgfSxcbiAgICBtYXA6IGZ1bmN0aW9uIChpbml0aWFsVmFsdWVzLCBvcHRpb25zKSB7XG4gICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMilcbiAgICAgICAgICAgIGluY29ycmVjdGx5VXNlZEFzRGVjb3JhdG9yKFwibWFwXCIpO1xuICAgICAgICB2YXIgbyA9IGFzQ3JlYXRlT2JzZXJ2YWJsZU9wdGlvbnMkJDEob3B0aW9ucyk7XG4gICAgICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZU1hcCQkMShpbml0aWFsVmFsdWVzLCBnZXRFbmhhbmNlckZyb21PcHRpb25zKG8pLCBvLm5hbWUpO1xuICAgIH0sXG4gICAgc2V0OiBmdW5jdGlvbiAoaW5pdGlhbFZhbHVlcywgb3B0aW9ucykge1xuICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDIpXG4gICAgICAgICAgICBpbmNvcnJlY3RseVVzZWRBc0RlY29yYXRvcihcInNldFwiKTtcbiAgICAgICAgdmFyIG8gPSBhc0NyZWF0ZU9ic2VydmFibGVPcHRpb25zJCQxKG9wdGlvbnMpO1xuICAgICAgICByZXR1cm4gbmV3IE9ic2VydmFibGVTZXQkJDEoaW5pdGlhbFZhbHVlcywgZ2V0RW5oYW5jZXJGcm9tT3B0aW9ucyhvKSwgby5uYW1lKTtcbiAgICB9LFxuICAgIG9iamVjdDogZnVuY3Rpb24gKHByb3BzLCBkZWNvcmF0b3JzLCBvcHRpb25zKSB7XG4gICAgICAgIGlmICh0eXBlb2YgYXJndW1lbnRzWzFdID09PSBcInN0cmluZ1wiKVxuICAgICAgICAgICAgaW5jb3JyZWN0bHlVc2VkQXNEZWNvcmF0b3IoXCJvYmplY3RcIik7XG4gICAgICAgIHZhciBvID0gYXNDcmVhdGVPYnNlcnZhYmxlT3B0aW9ucyQkMShvcHRpb25zKTtcbiAgICAgICAgaWYgKG8ucHJveHkgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICByZXR1cm4gZXh0ZW5kT2JzZXJ2YWJsZSQkMSh7fSwgcHJvcHMsIGRlY29yYXRvcnMsIG8pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdmFyIGRlZmF1bHREZWNvcmF0b3IgPSBnZXREZWZhdWx0RGVjb3JhdG9yRnJvbU9iamVjdE9wdGlvbnMkJDEobyk7XG4gICAgICAgICAgICB2YXIgYmFzZSA9IGV4dGVuZE9ic2VydmFibGUkJDEoe30sIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCBvKTtcbiAgICAgICAgICAgIHZhciBwcm94eSA9IGNyZWF0ZUR5bmFtaWNPYnNlcnZhYmxlT2JqZWN0JCQxKGJhc2UpO1xuICAgICAgICAgICAgZXh0ZW5kT2JzZXJ2YWJsZU9iamVjdFdpdGhQcm9wZXJ0aWVzJCQxKHByb3h5LCBwcm9wcywgZGVjb3JhdG9ycywgZGVmYXVsdERlY29yYXRvcik7XG4gICAgICAgICAgICByZXR1cm4gcHJveHk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIHJlZjogcmVmRGVjb3JhdG9yJCQxLFxuICAgIHNoYWxsb3c6IHNoYWxsb3dEZWNvcmF0b3IsXG4gICAgZGVlcDogZGVlcERlY29yYXRvciQkMSxcbiAgICBzdHJ1Y3Q6IHJlZlN0cnVjdERlY29yYXRvclxufTtcbnZhciBvYnNlcnZhYmxlJCQxID0gY3JlYXRlT2JzZXJ2YWJsZTtcbi8vIHdlaXJkIHRyaWNrIHRvIGtlZXAgb3VyIHR5cGluZ3MgbmljZWx5IHdpdGggb3VyIGZ1bmNzLCBhbmQgc3RpbGwgZXh0ZW5kIHRoZSBvYnNlcnZhYmxlIGZ1bmN0aW9uXG5PYmplY3Qua2V5cyhvYnNlcnZhYmxlRmFjdG9yaWVzKS5mb3JFYWNoKGZ1bmN0aW9uIChuYW1lKSB7IHJldHVybiAob2JzZXJ2YWJsZSQkMVtuYW1lXSA9IG9ic2VydmFibGVGYWN0b3JpZXNbbmFtZV0pOyB9KTtcbmZ1bmN0aW9uIGluY29ycmVjdGx5VXNlZEFzRGVjb3JhdG9yKG1ldGhvZE5hbWUpIHtcbiAgICBmYWlsJCQxKFxuICAgIC8vIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiAmJlxuICAgIFwiRXhwZWN0ZWQgb25lIG9yIHR3byBhcmd1bWVudHMgdG8gb2JzZXJ2YWJsZS5cIiArIG1ldGhvZE5hbWUgKyBcIi4gRGlkIHlvdSBhY2NpZGVudGFsbHkgdHJ5IHRvIHVzZSBvYnNlcnZhYmxlLlwiICsgbWV0aG9kTmFtZSArIFwiIGFzIGRlY29yYXRvcj9cIik7XG59XG5cbnZhciBjb21wdXRlZERlY29yYXRvciQkMSA9IGNyZWF0ZVByb3BEZWNvcmF0b3IkJDEoZmFsc2UsIGZ1bmN0aW9uIChpbnN0YW5jZSwgcHJvcGVydHlOYW1lLCBkZXNjcmlwdG9yLCBkZWNvcmF0b3JUYXJnZXQsIGRlY29yYXRvckFyZ3MpIHtcbiAgICB2YXIgZ2V0JCQxID0gZGVzY3JpcHRvci5nZXQsIHNldCQkMSA9IGRlc2NyaXB0b3Iuc2V0OyAvLyBpbml0aWFsVmFsdWUgaXMgdGhlIGRlc2NyaXB0b3IgZm9yIGdldCAvIHNldCBwcm9wc1xuICAgIC8vIE9wdGltaXphdGlvbjogZmFzdGVyIG9uIGRlY29yYXRvciB0YXJnZXQgb3IgaW5zdGFuY2U/IEFzc3VtaW5nIHRhcmdldFxuICAgIC8vIE9wdGltaXphdGlvbjogZmluZCBvdXQgaWYgZGVjbGFyaW5nIG9uIGluc3RhbmNlIGlzbid0IGp1c3QgZmFzdGVyLiAoYWxzbyBtYWtlcyB0aGUgcHJvcGVydHkgZGVzY3JpcHRvciBzaW1wbGVyKS4gQnV0LCBtb3JlIG1lbW9yeSB1c2FnZS4uXG4gICAgLy8gRm9yY2luZyBpbnN0YW5jZSBub3csIGZpeGVzIGhvdCByZWxvYWRpZyBpc3N1ZXMgb24gUmVhY3QgTmF0aXZlOlxuICAgIHZhciBvcHRpb25zID0gZGVjb3JhdG9yQXJnc1swXSB8fCB7fTtcbiAgICBhc09ic2VydmFibGVPYmplY3QkJDEoaW5zdGFuY2UpLmFkZENvbXB1dGVkUHJvcChpbnN0YW5jZSwgcHJvcGVydHlOYW1lLCBfX2Fzc2lnbih7IGdldDogZ2V0JCQxLFxuICAgICAgICBzZXQ6IHNldCQkMSwgY29udGV4dDogaW5zdGFuY2UgfSwgb3B0aW9ucykpO1xufSk7XG52YXIgY29tcHV0ZWRTdHJ1Y3REZWNvcmF0b3IgPSBjb21wdXRlZERlY29yYXRvciQkMSh7IGVxdWFsczogY29tcGFyZXIkJDEuc3RydWN0dXJhbCB9KTtcbi8qKlxuICogRGVjb3JhdG9yIGZvciBjbGFzcyBwcm9wZXJ0aWVzOiBAY29tcHV0ZWQgZ2V0IHZhbHVlKCkgeyByZXR1cm4gZXhwcjsgfS5cbiAqIEZvciBsZWdhY3kgcHVycG9zZXMgYWxzbyBpbnZva2FibGUgYXMgRVM1IG9ic2VydmFibGUgY3JlYXRlZDogYGNvbXB1dGVkKCgpID0+IGV4cHIpYDtcbiAqL1xudmFyIGNvbXB1dGVkJCQxID0gZnVuY3Rpb24gY29tcHV0ZWQkJDEoYXJnMSwgYXJnMiwgYXJnMykge1xuICAgIGlmICh0eXBlb2YgYXJnMiA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAvLyBAY29tcHV0ZWRcbiAgICAgICAgcmV0dXJuIGNvbXB1dGVkRGVjb3JhdG9yJCQxLmFwcGx5KG51bGwsIGFyZ3VtZW50cyk7XG4gICAgfVxuICAgIGlmIChhcmcxICE9PSBudWxsICYmIHR5cGVvZiBhcmcxID09PSBcIm9iamVjdFwiICYmIGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgLy8gQGNvbXB1dGVkKHsgb3B0aW9ucyB9KVxuICAgICAgICByZXR1cm4gY29tcHV0ZWREZWNvcmF0b3IkJDEuYXBwbHkobnVsbCwgYXJndW1lbnRzKTtcbiAgICB9XG4gICAgLy8gY29tcHV0ZWQoZXhwciwgb3B0aW9ucz8pXG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xuICAgICAgICBpbnZhcmlhbnQkJDEodHlwZW9mIGFyZzEgPT09IFwiZnVuY3Rpb25cIiwgXCJGaXJzdCBhcmd1bWVudCB0byBgY29tcHV0ZWRgIHNob3VsZCBiZSBhbiBleHByZXNzaW9uLlwiKTtcbiAgICAgICAgaW52YXJpYW50JCQxKGFyZ3VtZW50cy5sZW5ndGggPCAzLCBcIkNvbXB1dGVkIHRha2VzIG9uZSBvciB0d28gYXJndW1lbnRzIGlmIHVzZWQgYXMgZnVuY3Rpb25cIik7XG4gICAgfVxuICAgIHZhciBvcHRzID0gdHlwZW9mIGFyZzIgPT09IFwib2JqZWN0XCIgPyBhcmcyIDoge307XG4gICAgb3B0cy5nZXQgPSBhcmcxO1xuICAgIG9wdHMuc2V0ID0gdHlwZW9mIGFyZzIgPT09IFwiZnVuY3Rpb25cIiA/IGFyZzIgOiBvcHRzLnNldDtcbiAgICBvcHRzLm5hbWUgPSBvcHRzLm5hbWUgfHwgYXJnMS5uYW1lIHx8IFwiXCI7IC8qIGZvciBnZW5lcmF0ZWQgbmFtZSAqL1xuICAgIHJldHVybiBuZXcgQ29tcHV0ZWRWYWx1ZSQkMShvcHRzKTtcbn07XG5jb21wdXRlZCQkMS5zdHJ1Y3QgPSBjb21wdXRlZFN0cnVjdERlY29yYXRvcjtcblxuZnVuY3Rpb24gY3JlYXRlQWN0aW9uJCQxKGFjdGlvbk5hbWUsIGZuLCByZWYpIHtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gICAgICAgIGludmFyaWFudCQkMSh0eXBlb2YgZm4gPT09IFwiZnVuY3Rpb25cIiwgXCJgYWN0aW9uYCBjYW4gb25seSBiZSBpbnZva2VkIG9uIGZ1bmN0aW9uc1wiKTtcbiAgICAgICAgaWYgKHR5cGVvZiBhY3Rpb25OYW1lICE9PSBcInN0cmluZ1wiIHx8ICFhY3Rpb25OYW1lKVxuICAgICAgICAgICAgZmFpbCQkMShcImFjdGlvbnMgc2hvdWxkIGhhdmUgdmFsaWQgbmFtZXMsIGdvdDogJ1wiICsgYWN0aW9uTmFtZSArIFwiJ1wiKTtcbiAgICB9XG4gICAgdmFyIHJlcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGV4ZWN1dGVBY3Rpb24kJDEoYWN0aW9uTmFtZSwgZm4sIHJlZiB8fCB0aGlzLCBhcmd1bWVudHMpO1xuICAgIH07XG4gICAgcmVzLmlzTW9ieEFjdGlvbiA9IHRydWU7XG4gICAgcmV0dXJuIHJlcztcbn1cbmZ1bmN0aW9uIGV4ZWN1dGVBY3Rpb24kJDEoYWN0aW9uTmFtZSwgZm4sIHNjb3BlLCBhcmdzKSB7XG4gICAgdmFyIHJ1bkluZm8gPSBzdGFydEFjdGlvbihhY3Rpb25OYW1lLCBmbiwgc2NvcGUsIGFyZ3MpO1xuICAgIHZhciBzaG91bGRTdXByZXNzUmVhY3Rpb25FcnJvciA9IHRydWU7XG4gICAgdHJ5IHtcbiAgICAgICAgdmFyIHJlcyA9IGZuLmFwcGx5KHNjb3BlLCBhcmdzKTtcbiAgICAgICAgc2hvdWxkU3VwcmVzc1JlYWN0aW9uRXJyb3IgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuIHJlcztcbiAgICB9XG4gICAgZmluYWxseSB7XG4gICAgICAgIGlmIChzaG91bGRTdXByZXNzUmVhY3Rpb25FcnJvcikge1xuICAgICAgICAgICAgZ2xvYmFsU3RhdGUkJDEuc3VwcHJlc3NSZWFjdGlvbkVycm9ycyA9IHNob3VsZFN1cHJlc3NSZWFjdGlvbkVycm9yO1xuICAgICAgICAgICAgZW5kQWN0aW9uKHJ1bkluZm8pO1xuICAgICAgICAgICAgZ2xvYmFsU3RhdGUkJDEuc3VwcHJlc3NSZWFjdGlvbkVycm9ycyA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZW5kQWN0aW9uKHJ1bkluZm8pO1xuICAgICAgICB9XG4gICAgfVxufVxuZnVuY3Rpb24gc3RhcnRBY3Rpb24oYWN0aW9uTmFtZSwgZm4sIHNjb3BlLCBhcmdzKSB7XG4gICAgdmFyIG5vdGlmeVNweSA9IGlzU3B5RW5hYmxlZCQkMSgpICYmICEhYWN0aW9uTmFtZTtcbiAgICB2YXIgc3RhcnRUaW1lID0gMDtcbiAgICBpZiAobm90aWZ5U3B5ICYmIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xuICAgICAgICBzdGFydFRpbWUgPSBEYXRlLm5vdygpO1xuICAgICAgICB2YXIgbCA9IChhcmdzICYmIGFyZ3MubGVuZ3RoKSB8fCAwO1xuICAgICAgICB2YXIgZmxhdHRlbmRBcmdzID0gbmV3IEFycmF5KGwpO1xuICAgICAgICBpZiAobCA+IDApXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGw7IGkrKylcbiAgICAgICAgICAgICAgICBmbGF0dGVuZEFyZ3NbaV0gPSBhcmdzW2ldO1xuICAgICAgICBzcHlSZXBvcnRTdGFydCQkMSh7XG4gICAgICAgICAgICB0eXBlOiBcImFjdGlvblwiLFxuICAgICAgICAgICAgbmFtZTogYWN0aW9uTmFtZSxcbiAgICAgICAgICAgIG9iamVjdDogc2NvcGUsXG4gICAgICAgICAgICBhcmd1bWVudHM6IGZsYXR0ZW5kQXJnc1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgdmFyIHByZXZEZXJpdmF0aW9uID0gdW50cmFja2VkU3RhcnQkJDEoKTtcbiAgICBzdGFydEJhdGNoJCQxKCk7XG4gICAgdmFyIHByZXZBbGxvd1N0YXRlQ2hhbmdlcyA9IGFsbG93U3RhdGVDaGFuZ2VzU3RhcnQkJDEodHJ1ZSk7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgcHJldkRlcml2YXRpb246IHByZXZEZXJpdmF0aW9uLFxuICAgICAgICBwcmV2QWxsb3dTdGF0ZUNoYW5nZXM6IHByZXZBbGxvd1N0YXRlQ2hhbmdlcyxcbiAgICAgICAgbm90aWZ5U3B5OiBub3RpZnlTcHksXG4gICAgICAgIHN0YXJ0VGltZTogc3RhcnRUaW1lXG4gICAgfTtcbn1cbmZ1bmN0aW9uIGVuZEFjdGlvbihydW5JbmZvKSB7XG4gICAgYWxsb3dTdGF0ZUNoYW5nZXNFbmQkJDEocnVuSW5mby5wcmV2QWxsb3dTdGF0ZUNoYW5nZXMpO1xuICAgIGVuZEJhdGNoJCQxKCk7XG4gICAgdW50cmFja2VkRW5kJCQxKHJ1bkluZm8ucHJldkRlcml2YXRpb24pO1xuICAgIGlmIChydW5JbmZvLm5vdGlmeVNweSAmJiBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpXG4gICAgICAgIHNweVJlcG9ydEVuZCQkMSh7IHRpbWU6IERhdGUubm93KCkgLSBydW5JbmZvLnN0YXJ0VGltZSB9KTtcbn1cbmZ1bmN0aW9uIGFsbG93U3RhdGVDaGFuZ2VzJCQxKGFsbG93U3RhdGVDaGFuZ2VzJCQxLCBmdW5jKSB7XG4gICAgdmFyIHByZXYgPSBhbGxvd1N0YXRlQ2hhbmdlc1N0YXJ0JCQxKGFsbG93U3RhdGVDaGFuZ2VzJCQxKTtcbiAgICB2YXIgcmVzO1xuICAgIHRyeSB7XG4gICAgICAgIHJlcyA9IGZ1bmMoKTtcbiAgICB9XG4gICAgZmluYWxseSB7XG4gICAgICAgIGFsbG93U3RhdGVDaGFuZ2VzRW5kJCQxKHByZXYpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzO1xufVxuZnVuY3Rpb24gYWxsb3dTdGF0ZUNoYW5nZXNTdGFydCQkMShhbGxvd1N0YXRlQ2hhbmdlcyQkMSkge1xuICAgIHZhciBwcmV2ID0gZ2xvYmFsU3RhdGUkJDEuYWxsb3dTdGF0ZUNoYW5nZXM7XG4gICAgZ2xvYmFsU3RhdGUkJDEuYWxsb3dTdGF0ZUNoYW5nZXMgPSBhbGxvd1N0YXRlQ2hhbmdlcyQkMTtcbiAgICByZXR1cm4gcHJldjtcbn1cbmZ1bmN0aW9uIGFsbG93U3RhdGVDaGFuZ2VzRW5kJCQxKHByZXYpIHtcbiAgICBnbG9iYWxTdGF0ZSQkMS5hbGxvd1N0YXRlQ2hhbmdlcyA9IHByZXY7XG59XG5mdW5jdGlvbiBhbGxvd1N0YXRlQ2hhbmdlc0luc2lkZUNvbXB1dGVkJCQxKGZ1bmMpIHtcbiAgICB2YXIgcHJldiA9IGdsb2JhbFN0YXRlJCQxLmNvbXB1dGF0aW9uRGVwdGg7XG4gICAgZ2xvYmFsU3RhdGUkJDEuY29tcHV0YXRpb25EZXB0aCA9IDA7XG4gICAgdmFyIHJlcztcbiAgICB0cnkge1xuICAgICAgICByZXMgPSBmdW5jKCk7XG4gICAgfVxuICAgIGZpbmFsbHkge1xuICAgICAgICBnbG9iYWxTdGF0ZSQkMS5jb21wdXRhdGlvbkRlcHRoID0gcHJldjtcbiAgICB9XG4gICAgcmV0dXJuIHJlcztcbn1cblxudmFyIE9ic2VydmFibGVWYWx1ZSQkMSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoT2JzZXJ2YWJsZVZhbHVlJCQxLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIE9ic2VydmFibGVWYWx1ZSQkMSh2YWx1ZSwgZW5oYW5jZXIsIG5hbWUsIG5vdGlmeVNweSwgZXF1YWxzKSB7XG4gICAgICAgIGlmIChuYW1lID09PSB2b2lkIDApIHsgbmFtZSA9IFwiT2JzZXJ2YWJsZVZhbHVlQFwiICsgZ2V0TmV4dElkJCQxKCk7IH1cbiAgICAgICAgaWYgKG5vdGlmeVNweSA9PT0gdm9pZCAwKSB7IG5vdGlmeVNweSA9IHRydWU7IH1cbiAgICAgICAgaWYgKGVxdWFscyA9PT0gdm9pZCAwKSB7IGVxdWFscyA9IGNvbXBhcmVyJCQxLmRlZmF1bHQ7IH1cbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgbmFtZSkgfHwgdGhpcztcbiAgICAgICAgX3RoaXMuZW5oYW5jZXIgPSBlbmhhbmNlcjtcbiAgICAgICAgX3RoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIF90aGlzLmVxdWFscyA9IGVxdWFscztcbiAgICAgICAgX3RoaXMuaGFzVW5yZXBvcnRlZENoYW5nZSA9IGZhbHNlO1xuICAgICAgICBfdGhpcy52YWx1ZSA9IGVuaGFuY2VyKHZhbHVlLCB1bmRlZmluZWQsIG5hbWUpO1xuICAgICAgICBpZiAobm90aWZ5U3B5ICYmIGlzU3B5RW5hYmxlZCQkMSgpICYmIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xuICAgICAgICAgICAgLy8gb25seSBub3RpZnkgc3B5IGlmIHRoaXMgaXMgYSBzdGFuZC1hbG9uZSBvYnNlcnZhYmxlXG4gICAgICAgICAgICBzcHlSZXBvcnQkJDEoeyB0eXBlOiBcImNyZWF0ZVwiLCBuYW1lOiBfdGhpcy5uYW1lLCBuZXdWYWx1ZTogXCJcIiArIF90aGlzLnZhbHVlIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgT2JzZXJ2YWJsZVZhbHVlJCQxLnByb3RvdHlwZS5kZWhhbmNlVmFsdWUgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgaWYgKHRoaXMuZGVoYW5jZXIgIT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRlaGFuY2VyKHZhbHVlKTtcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH07XG4gICAgT2JzZXJ2YWJsZVZhbHVlJCQxLnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbiAobmV3VmFsdWUpIHtcbiAgICAgICAgdmFyIG9sZFZhbHVlID0gdGhpcy52YWx1ZTtcbiAgICAgICAgbmV3VmFsdWUgPSB0aGlzLnByZXBhcmVOZXdWYWx1ZShuZXdWYWx1ZSk7XG4gICAgICAgIGlmIChuZXdWYWx1ZSAhPT0gZ2xvYmFsU3RhdGUkJDEuVU5DSEFOR0VEKSB7XG4gICAgICAgICAgICB2YXIgbm90aWZ5U3B5ID0gaXNTcHlFbmFibGVkJCQxKCk7XG4gICAgICAgICAgICBpZiAobm90aWZ5U3B5ICYmIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xuICAgICAgICAgICAgICAgIHNweVJlcG9ydFN0YXJ0JCQxKHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJ1cGRhdGVcIixcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogdGhpcy5uYW1lLFxuICAgICAgICAgICAgICAgICAgICBuZXdWYWx1ZTogbmV3VmFsdWUsXG4gICAgICAgICAgICAgICAgICAgIG9sZFZhbHVlOiBvbGRWYWx1ZVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5zZXROZXdWYWx1ZShuZXdWYWx1ZSk7XG4gICAgICAgICAgICBpZiAobm90aWZ5U3B5ICYmIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIilcbiAgICAgICAgICAgICAgICBzcHlSZXBvcnRFbmQkJDEoKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgT2JzZXJ2YWJsZVZhbHVlJCQxLnByb3RvdHlwZS5wcmVwYXJlTmV3VmFsdWUgPSBmdW5jdGlvbiAobmV3VmFsdWUpIHtcbiAgICAgICAgY2hlY2tJZlN0YXRlTW9kaWZpY2F0aW9uc0FyZUFsbG93ZWQkJDEodGhpcyk7XG4gICAgICAgIGlmIChoYXNJbnRlcmNlcHRvcnMkJDEodGhpcykpIHtcbiAgICAgICAgICAgIHZhciBjaGFuZ2UgPSBpbnRlcmNlcHRDaGFuZ2UkJDEodGhpcywge1xuICAgICAgICAgICAgICAgIG9iamVjdDogdGhpcyxcbiAgICAgICAgICAgICAgICB0eXBlOiBcInVwZGF0ZVwiLFxuICAgICAgICAgICAgICAgIG5ld1ZhbHVlOiBuZXdWYWx1ZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoIWNoYW5nZSlcbiAgICAgICAgICAgICAgICByZXR1cm4gZ2xvYmFsU3RhdGUkJDEuVU5DSEFOR0VEO1xuICAgICAgICAgICAgbmV3VmFsdWUgPSBjaGFuZ2UubmV3VmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgLy8gYXBwbHkgbW9kaWZpZXJcbiAgICAgICAgbmV3VmFsdWUgPSB0aGlzLmVuaGFuY2VyKG5ld1ZhbHVlLCB0aGlzLnZhbHVlLCB0aGlzLm5hbWUpO1xuICAgICAgICByZXR1cm4gdGhpcy5lcXVhbHModGhpcy52YWx1ZSwgbmV3VmFsdWUpID8gZ2xvYmFsU3RhdGUkJDEuVU5DSEFOR0VEIDogbmV3VmFsdWU7XG4gICAgfTtcbiAgICBPYnNlcnZhYmxlVmFsdWUkJDEucHJvdG90eXBlLnNldE5ld1ZhbHVlID0gZnVuY3Rpb24gKG5ld1ZhbHVlKSB7XG4gICAgICAgIHZhciBvbGRWYWx1ZSA9IHRoaXMudmFsdWU7XG4gICAgICAgIHRoaXMudmFsdWUgPSBuZXdWYWx1ZTtcbiAgICAgICAgdGhpcy5yZXBvcnRDaGFuZ2VkKCk7XG4gICAgICAgIGlmIChoYXNMaXN0ZW5lcnMkJDEodGhpcykpIHtcbiAgICAgICAgICAgIG5vdGlmeUxpc3RlbmVycyQkMSh0aGlzLCB7XG4gICAgICAgICAgICAgICAgdHlwZTogXCJ1cGRhdGVcIixcbiAgICAgICAgICAgICAgICBvYmplY3Q6IHRoaXMsXG4gICAgICAgICAgICAgICAgbmV3VmFsdWU6IG5ld1ZhbHVlLFxuICAgICAgICAgICAgICAgIG9sZFZhbHVlOiBvbGRWYWx1ZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIE9ic2VydmFibGVWYWx1ZSQkMS5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLnJlcG9ydE9ic2VydmVkKCk7XG4gICAgICAgIHJldHVybiB0aGlzLmRlaGFuY2VWYWx1ZSh0aGlzLnZhbHVlKTtcbiAgICB9O1xuICAgIE9ic2VydmFibGVWYWx1ZSQkMS5wcm90b3R5cGUuaW50ZXJjZXB0ID0gZnVuY3Rpb24gKGhhbmRsZXIpIHtcbiAgICAgICAgcmV0dXJuIHJlZ2lzdGVySW50ZXJjZXB0b3IkJDEodGhpcywgaGFuZGxlcik7XG4gICAgfTtcbiAgICBPYnNlcnZhYmxlVmFsdWUkJDEucHJvdG90eXBlLm9ic2VydmUgPSBmdW5jdGlvbiAobGlzdGVuZXIsIGZpcmVJbW1lZGlhdGVseSkge1xuICAgICAgICBpZiAoZmlyZUltbWVkaWF0ZWx5KVxuICAgICAgICAgICAgbGlzdGVuZXIoe1xuICAgICAgICAgICAgICAgIG9iamVjdDogdGhpcyxcbiAgICAgICAgICAgICAgICB0eXBlOiBcInVwZGF0ZVwiLFxuICAgICAgICAgICAgICAgIG5ld1ZhbHVlOiB0aGlzLnZhbHVlLFxuICAgICAgICAgICAgICAgIG9sZFZhbHVlOiB1bmRlZmluZWRcbiAgICAgICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcmVnaXN0ZXJMaXN0ZW5lciQkMSh0aGlzLCBsaXN0ZW5lcik7XG4gICAgfTtcbiAgICBPYnNlcnZhYmxlVmFsdWUkJDEucHJvdG90eXBlLnRvSlNPTiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0KCk7XG4gICAgfTtcbiAgICBPYnNlcnZhYmxlVmFsdWUkJDEucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5uYW1lICsgXCJbXCIgKyB0aGlzLnZhbHVlICsgXCJdXCI7XG4gICAgfTtcbiAgICBPYnNlcnZhYmxlVmFsdWUkJDEucHJvdG90eXBlLnZhbHVlT2YgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0b1ByaW1pdGl2ZSQkMSh0aGlzLmdldCgpKTtcbiAgICB9O1xuICAgIE9ic2VydmFibGVWYWx1ZSQkMS5wcm90b3R5cGVbU3ltYm9sLnRvUHJpbWl0aXZlXSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsdWVPZigpO1xuICAgIH07XG4gICAgcmV0dXJuIE9ic2VydmFibGVWYWx1ZSQkMTtcbn0oQXRvbSQkMSkpO1xudmFyIGlzT2JzZXJ2YWJsZVZhbHVlJCQxID0gY3JlYXRlSW5zdGFuY2VvZlByZWRpY2F0ZSQkMShcIk9ic2VydmFibGVWYWx1ZVwiLCBPYnNlcnZhYmxlVmFsdWUkJDEpO1xuXG4vKipcbiAqIEEgbm9kZSBpbiB0aGUgc3RhdGUgZGVwZW5kZW5jeSByb290IHRoYXQgb2JzZXJ2ZXMgb3RoZXIgbm9kZXMsIGFuZCBjYW4gYmUgb2JzZXJ2ZWQgaXRzZWxmLlxuICpcbiAqIENvbXB1dGVkVmFsdWUgd2lsbCByZW1lbWJlciB0aGUgcmVzdWx0IG9mIHRoZSBjb21wdXRhdGlvbiBmb3IgdGhlIGR1cmF0aW9uIG9mIHRoZSBiYXRjaCwgb3JcbiAqIHdoaWxlIGJlaW5nIG9ic2VydmVkLlxuICpcbiAqIER1cmluZyB0aGlzIHRpbWUgaXQgd2lsbCByZWNvbXB1dGUgb25seSB3aGVuIG9uZSBvZiBpdHMgZGlyZWN0IGRlcGVuZGVuY2llcyBjaGFuZ2VkLFxuICogYnV0IG9ubHkgd2hlbiBpdCBpcyBiZWluZyBhY2Nlc3NlZCB3aXRoIGBDb21wdXRlZFZhbHVlLmdldCgpYC5cbiAqXG4gKiBJbXBsZW1lbnRhdGlvbiBkZXNjcmlwdGlvbjpcbiAqIDEuIEZpcnN0IHRpbWUgaXQncyBiZWluZyBhY2Nlc3NlZCBpdCB3aWxsIGNvbXB1dGUgYW5kIHJlbWVtYmVyIHJlc3VsdFxuICogICAgZ2l2ZSBiYWNrIHJlbWVtYmVyZWQgcmVzdWx0IHVudGlsIDIuIGhhcHBlbnNcbiAqIDIuIEZpcnN0IHRpbWUgYW55IGRlZXAgZGVwZW5kZW5jeSBjaGFuZ2UsIHByb3BhZ2F0ZSBQT1NTSUJMWV9TVEFMRSB0byBhbGwgb2JzZXJ2ZXJzLCB3YWl0IGZvciAzLlxuICogMy4gV2hlbiBpdCdzIGJlaW5nIGFjY2Vzc2VkLCByZWNvbXB1dGUgaWYgYW55IHNoYWxsb3cgZGVwZW5kZW5jeSBjaGFuZ2VkLlxuICogICAgaWYgcmVzdWx0IGNoYW5nZWQ6IHByb3BhZ2F0ZSBTVEFMRSB0byBhbGwgb2JzZXJ2ZXJzLCB0aGF0IHdlcmUgUE9TU0lCTFlfU1RBTEUgZnJvbSB0aGUgbGFzdCBzdGVwLlxuICogICAgZ28gdG8gc3RlcCAyLiBlaXRoZXIgd2F5XG4gKlxuICogSWYgYXQgYW55IHBvaW50IGl0J3Mgb3V0c2lkZSBiYXRjaCBhbmQgaXQgaXNuJ3Qgb2JzZXJ2ZWQ6IHJlc2V0IGV2ZXJ5dGhpbmcgYW5kIGdvIHRvIDEuXG4gKi9cbnZhciBDb21wdXRlZFZhbHVlJCQxID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZSBhIG5ldyBjb21wdXRlZCB2YWx1ZSBiYXNlZCBvbiBhIGZ1bmN0aW9uIGV4cHJlc3Npb24uXG4gICAgICpcbiAgICAgKiBUaGUgYG5hbWVgIHByb3BlcnR5IGlzIGZvciBkZWJ1ZyBwdXJwb3NlcyBvbmx5LlxuICAgICAqXG4gICAgICogVGhlIGBlcXVhbHNgIHByb3BlcnR5IHNwZWNpZmllcyB0aGUgY29tcGFyZXIgZnVuY3Rpb24gdG8gdXNlIHRvIGRldGVybWluZSBpZiBhIG5ld2x5IHByb2R1Y2VkXG4gICAgICogdmFsdWUgZGlmZmVycyBmcm9tIHRoZSBwcmV2aW91cyB2YWx1ZS4gVHdvIGNvbXBhcmVycyBhcmUgcHJvdmlkZWQgaW4gdGhlIGxpYnJhcnk7IGBkZWZhdWx0Q29tcGFyZXJgXG4gICAgICogY29tcGFyZXMgYmFzZWQgb24gaWRlbnRpdHkgY29tcGFyaXNvbiAoPT09KSwgYW5kIGBzdHJ1Y3R1YWxDb21wYXJlcmAgZGVlcGx5IGNvbXBhcmVzIHRoZSBzdHJ1Y3R1cmUuXG4gICAgICogU3RydWN0dXJhbCBjb21wYXJpc29uIGNhbiBiZSBjb252ZW5pZW50IGlmIHlvdSBhbHdheXMgcHJvZHVjZSBhIG5ldyBhZ2dyZWdhdGVkIG9iamVjdCBhbmRcbiAgICAgKiBkb24ndCB3YW50IHRvIG5vdGlmeSBvYnNlcnZlcnMgaWYgaXQgaXMgc3RydWN0dXJhbGx5IHRoZSBzYW1lLlxuICAgICAqIFRoaXMgaXMgdXNlZnVsIGZvciB3b3JraW5nIHdpdGggdmVjdG9ycywgbW91c2UgY29vcmRpbmF0ZXMgZXRjLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIENvbXB1dGVkVmFsdWUkJDEob3B0aW9ucykge1xuICAgICAgICB0aGlzLmRlcGVuZGVuY2llc1N0YXRlID0gSURlcml2YXRpb25TdGF0ZS5OT1RfVFJBQ0tJTkc7XG4gICAgICAgIHRoaXMub2JzZXJ2aW5nID0gW107IC8vIG5vZGVzIHdlIGFyZSBsb29raW5nIGF0LiBPdXIgdmFsdWUgZGVwZW5kcyBvbiB0aGVzZSBub2Rlc1xuICAgICAgICB0aGlzLm5ld09ic2VydmluZyA9IG51bGw7IC8vIGR1cmluZyB0cmFja2luZyBpdCdzIGFuIGFycmF5IHdpdGggbmV3IG9ic2VydmVkIG9ic2VydmVyc1xuICAgICAgICB0aGlzLmlzQmVpbmdPYnNlcnZlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzUGVuZGluZ1Vub2JzZXJ2YXRpb24gPSBmYWxzZTtcbiAgICAgICAgdGhpcy5vYnNlcnZlcnMgPSBuZXcgU2V0KCk7XG4gICAgICAgIHRoaXMuZGlmZlZhbHVlID0gMDtcbiAgICAgICAgdGhpcy5ydW5JZCA9IDA7XG4gICAgICAgIHRoaXMubGFzdEFjY2Vzc2VkQnkgPSAwO1xuICAgICAgICB0aGlzLmxvd2VzdE9ic2VydmVyU3RhdGUgPSBJRGVyaXZhdGlvblN0YXRlLlVQX1RPX0RBVEU7XG4gICAgICAgIHRoaXMudW5ib3VuZERlcHNDb3VudCA9IDA7XG4gICAgICAgIHRoaXMuX19tYXBpZCA9IFwiI1wiICsgZ2V0TmV4dElkJCQxKCk7XG4gICAgICAgIHRoaXMudmFsdWUgPSBuZXcgQ2F1Z2h0RXhjZXB0aW9uJCQxKG51bGwpO1xuICAgICAgICB0aGlzLmlzQ29tcHV0aW5nID0gZmFsc2U7IC8vIHRvIGNoZWNrIGZvciBjeWNsZXNcbiAgICAgICAgdGhpcy5pc1J1bm5pbmdTZXR0ZXIgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc1RyYWNpbmcgPSBUcmFjZU1vZGUkJDEuTk9ORTtcbiAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiAmJiAhb3B0aW9ucy5nZXQpXG4gICAgICAgICAgICB0aHJvdyBcIlttb2J4XSBtaXNzaW5nIG9wdGlvbiBmb3IgY29tcHV0ZWQ6IGdldFwiO1xuICAgICAgICB0aGlzLmRlcml2YXRpb24gPSBvcHRpb25zLmdldDtcbiAgICAgICAgdGhpcy5uYW1lID0gb3B0aW9ucy5uYW1lIHx8IFwiQ29tcHV0ZWRWYWx1ZUBcIiArIGdldE5leHRJZCQkMSgpO1xuICAgICAgICBpZiAob3B0aW9ucy5zZXQpXG4gICAgICAgICAgICB0aGlzLnNldHRlciA9IGNyZWF0ZUFjdGlvbiQkMSh0aGlzLm5hbWUgKyBcIi1zZXR0ZXJcIiwgb3B0aW9ucy5zZXQpO1xuICAgICAgICB0aGlzLmVxdWFscyA9XG4gICAgICAgICAgICBvcHRpb25zLmVxdWFscyB8fFxuICAgICAgICAgICAgICAgIChvcHRpb25zLmNvbXBhcmVTdHJ1Y3R1cmFsIHx8IG9wdGlvbnMuc3RydWN0XG4gICAgICAgICAgICAgICAgICAgID8gY29tcGFyZXIkJDEuc3RydWN0dXJhbFxuICAgICAgICAgICAgICAgICAgICA6IGNvbXBhcmVyJCQxLmRlZmF1bHQpO1xuICAgICAgICB0aGlzLnNjb3BlID0gb3B0aW9ucy5jb250ZXh0O1xuICAgICAgICB0aGlzLnJlcXVpcmVzUmVhY3Rpb24gPSAhIW9wdGlvbnMucmVxdWlyZXNSZWFjdGlvbjtcbiAgICAgICAgdGhpcy5rZWVwQWxpdmUgPSAhIW9wdGlvbnMua2VlcEFsaXZlO1xuICAgIH1cbiAgICBDb21wdXRlZFZhbHVlJCQxLnByb3RvdHlwZS5vbkJlY29tZVN0YWxlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBwcm9wYWdhdGVNYXliZUNoYW5nZWQkJDEodGhpcyk7XG4gICAgfTtcbiAgICBDb21wdXRlZFZhbHVlJCQxLnByb3RvdHlwZS5vbkJlY29tZU9ic2VydmVkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5vbkJlY29tZU9ic2VydmVkTGlzdGVuZXJzKSB7XG4gICAgICAgICAgICB0aGlzLm9uQmVjb21lT2JzZXJ2ZWRMaXN0ZW5lcnMuZm9yRWFjaChmdW5jdGlvbiAobGlzdGVuZXIpIHsgcmV0dXJuIGxpc3RlbmVyKCk7IH0pO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBDb21wdXRlZFZhbHVlJCQxLnByb3RvdHlwZS5vbkJlY29tZVVub2JzZXJ2ZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLm9uQmVjb21lVW5vYnNlcnZlZExpc3RlbmVycykge1xuICAgICAgICAgICAgdGhpcy5vbkJlY29tZVVub2JzZXJ2ZWRMaXN0ZW5lcnMuZm9yRWFjaChmdW5jdGlvbiAobGlzdGVuZXIpIHsgcmV0dXJuIGxpc3RlbmVyKCk7IH0pO1xuICAgICAgICB9XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBjdXJyZW50IHZhbHVlIG9mIHRoaXMgY29tcHV0ZWQgdmFsdWUuXG4gICAgICogV2lsbCBldmFsdWF0ZSBpdHMgY29tcHV0YXRpb24gZmlyc3QgaWYgbmVlZGVkLlxuICAgICAqL1xuICAgIENvbXB1dGVkVmFsdWUkJDEucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNDb21wdXRpbmcpXG4gICAgICAgICAgICBmYWlsJCQxKFwiQ3ljbGUgZGV0ZWN0ZWQgaW4gY29tcHV0YXRpb24gXCIgKyB0aGlzLm5hbWUgKyBcIjogXCIgKyB0aGlzLmRlcml2YXRpb24pO1xuICAgICAgICBpZiAoZ2xvYmFsU3RhdGUkJDEuaW5CYXRjaCA9PT0gMCAmJiB0aGlzLm9ic2VydmVycy5zaXplID09PSAwICYmICF0aGlzLmtlZXBBbGl2ZSkge1xuICAgICAgICAgICAgaWYgKHNob3VsZENvbXB1dGUkJDEodGhpcykpIHtcbiAgICAgICAgICAgICAgICB0aGlzLndhcm5BYm91dFVudHJhY2tlZFJlYWQoKTtcbiAgICAgICAgICAgICAgICBzdGFydEJhdGNoJCQxKCk7IC8vIFNlZSBwZXJmIHRlc3QgJ2NvbXB1dGVkIG1lbW9pemF0aW9uJ1xuICAgICAgICAgICAgICAgIHRoaXMudmFsdWUgPSB0aGlzLmNvbXB1dGVWYWx1ZShmYWxzZSk7XG4gICAgICAgICAgICAgICAgZW5kQmF0Y2gkJDEoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJlcG9ydE9ic2VydmVkJCQxKHRoaXMpO1xuICAgICAgICAgICAgaWYgKHNob3VsZENvbXB1dGUkJDEodGhpcykpXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudHJhY2tBbmRDb21wdXRlKCkpXG4gICAgICAgICAgICAgICAgICAgIHByb3BhZ2F0ZUNoYW5nZUNvbmZpcm1lZCQkMSh0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgcmVzdWx0ID0gdGhpcy52YWx1ZTtcbiAgICAgICAgaWYgKGlzQ2F1Z2h0RXhjZXB0aW9uJCQxKHJlc3VsdCkpXG4gICAgICAgICAgICB0aHJvdyByZXN1bHQuY2F1c2U7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcbiAgICBDb21wdXRlZFZhbHVlJCQxLnByb3RvdHlwZS5wZWVrID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgcmVzID0gdGhpcy5jb21wdXRlVmFsdWUoZmFsc2UpO1xuICAgICAgICBpZiAoaXNDYXVnaHRFeGNlcHRpb24kJDEocmVzKSlcbiAgICAgICAgICAgIHRocm93IHJlcy5jYXVzZTtcbiAgICAgICAgcmV0dXJuIHJlcztcbiAgICB9O1xuICAgIENvbXB1dGVkVmFsdWUkJDEucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICBpZiAodGhpcy5zZXR0ZXIpIHtcbiAgICAgICAgICAgIGludmFyaWFudCQkMSghdGhpcy5pc1J1bm5pbmdTZXR0ZXIsIFwiVGhlIHNldHRlciBvZiBjb21wdXRlZCB2YWx1ZSAnXCIgKyB0aGlzLm5hbWUgKyBcIicgaXMgdHJ5aW5nIHRvIHVwZGF0ZSBpdHNlbGYuIERpZCB5b3UgaW50ZW5kIHRvIHVwZGF0ZSBhbiBfb2JzZXJ2YWJsZV8gdmFsdWUsIGluc3RlYWQgb2YgdGhlIGNvbXB1dGVkIHByb3BlcnR5P1wiKTtcbiAgICAgICAgICAgIHRoaXMuaXNSdW5uaW5nU2V0dGVyID0gdHJ1ZTtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXR0ZXIuY2FsbCh0aGlzLnNjb3BlLCB2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICB0aGlzLmlzUnVubmluZ1NldHRlciA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIGludmFyaWFudCQkMShmYWxzZSwgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiICYmXG4gICAgICAgICAgICAgICAgXCJbQ29tcHV0ZWRWYWx1ZSAnXCIgKyB0aGlzLm5hbWUgKyBcIiddIEl0IGlzIG5vdCBwb3NzaWJsZSB0byBhc3NpZ24gYSBuZXcgdmFsdWUgdG8gYSBjb21wdXRlZCB2YWx1ZS5cIik7XG4gICAgfTtcbiAgICBDb21wdXRlZFZhbHVlJCQxLnByb3RvdHlwZS50cmFja0FuZENvbXB1dGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmIChpc1NweUVuYWJsZWQkJDEoKSAmJiBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgICAgICAgICAgIHNweVJlcG9ydCQkMSh7XG4gICAgICAgICAgICAgICAgb2JqZWN0OiB0aGlzLnNjb3BlLFxuICAgICAgICAgICAgICAgIHR5cGU6IFwiY29tcHV0ZVwiLFxuICAgICAgICAgICAgICAgIG5hbWU6IHRoaXMubmFtZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIG9sZFZhbHVlID0gdGhpcy52YWx1ZTtcbiAgICAgICAgdmFyIHdhc1N1c3BlbmRlZCA9IFxuICAgICAgICAvKiBzZWUgIzEyMDggKi8gdGhpcy5kZXBlbmRlbmNpZXNTdGF0ZSA9PT0gSURlcml2YXRpb25TdGF0ZS5OT1RfVFJBQ0tJTkc7XG4gICAgICAgIHZhciBuZXdWYWx1ZSA9IHRoaXMuY29tcHV0ZVZhbHVlKHRydWUpO1xuICAgICAgICB2YXIgY2hhbmdlZCA9IHdhc1N1c3BlbmRlZCB8fFxuICAgICAgICAgICAgaXNDYXVnaHRFeGNlcHRpb24kJDEob2xkVmFsdWUpIHx8XG4gICAgICAgICAgICBpc0NhdWdodEV4Y2VwdGlvbiQkMShuZXdWYWx1ZSkgfHxcbiAgICAgICAgICAgICF0aGlzLmVxdWFscyhvbGRWYWx1ZSwgbmV3VmFsdWUpO1xuICAgICAgICBpZiAoY2hhbmdlZCkge1xuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IG5ld1ZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjaGFuZ2VkO1xuICAgIH07XG4gICAgQ29tcHV0ZWRWYWx1ZSQkMS5wcm90b3R5cGUuY29tcHV0ZVZhbHVlID0gZnVuY3Rpb24gKHRyYWNrKSB7XG4gICAgICAgIHRoaXMuaXNDb21wdXRpbmcgPSB0cnVlO1xuICAgICAgICBnbG9iYWxTdGF0ZSQkMS5jb21wdXRhdGlvbkRlcHRoKys7XG4gICAgICAgIHZhciByZXM7XG4gICAgICAgIGlmICh0cmFjaykge1xuICAgICAgICAgICAgcmVzID0gdHJhY2tEZXJpdmVkRnVuY3Rpb24kJDEodGhpcywgdGhpcy5kZXJpdmF0aW9uLCB0aGlzLnNjb3BlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmIChnbG9iYWxTdGF0ZSQkMS5kaXNhYmxlRXJyb3JCb3VuZGFyaWVzID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgcmVzID0gdGhpcy5kZXJpdmF0aW9uLmNhbGwodGhpcy5zY29wZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICByZXMgPSB0aGlzLmRlcml2YXRpb24uY2FsbCh0aGlzLnNjb3BlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzID0gbmV3IENhdWdodEV4Y2VwdGlvbiQkMShlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZ2xvYmFsU3RhdGUkJDEuY29tcHV0YXRpb25EZXB0aC0tO1xuICAgICAgICB0aGlzLmlzQ29tcHV0aW5nID0gZmFsc2U7XG4gICAgICAgIHJldHVybiByZXM7XG4gICAgfTtcbiAgICBDb21wdXRlZFZhbHVlJCQxLnByb3RvdHlwZS5zdXNwZW5kID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIXRoaXMua2VlcEFsaXZlKSB7XG4gICAgICAgICAgICBjbGVhck9ic2VydmluZyQkMSh0aGlzKTtcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSB1bmRlZmluZWQ7IC8vIGRvbid0IGhvbGQgb24gdG8gY29tcHV0ZWQgdmFsdWUhXG4gICAgICAgIH1cbiAgICB9O1xuICAgIENvbXB1dGVkVmFsdWUkJDEucHJvdG90eXBlLm9ic2VydmUgPSBmdW5jdGlvbiAobGlzdGVuZXIsIGZpcmVJbW1lZGlhdGVseSkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgZmlyc3RUaW1lID0gdHJ1ZTtcbiAgICAgICAgdmFyIHByZXZWYWx1ZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgcmV0dXJuIGF1dG9ydW4kJDEoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIG5ld1ZhbHVlID0gX3RoaXMuZ2V0KCk7XG4gICAgICAgICAgICBpZiAoIWZpcnN0VGltZSB8fCBmaXJlSW1tZWRpYXRlbHkpIHtcbiAgICAgICAgICAgICAgICB2YXIgcHJldlUgPSB1bnRyYWNrZWRTdGFydCQkMSgpO1xuICAgICAgICAgICAgICAgIGxpc3RlbmVyKHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJ1cGRhdGVcIixcbiAgICAgICAgICAgICAgICAgICAgb2JqZWN0OiBfdGhpcyxcbiAgICAgICAgICAgICAgICAgICAgbmV3VmFsdWU6IG5ld1ZhbHVlLFxuICAgICAgICAgICAgICAgICAgICBvbGRWYWx1ZTogcHJldlZhbHVlXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgdW50cmFja2VkRW5kJCQxKHByZXZVKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZpcnN0VGltZSA9IGZhbHNlO1xuICAgICAgICAgICAgcHJldlZhbHVlID0gbmV3VmFsdWU7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgQ29tcHV0ZWRWYWx1ZSQkMS5wcm90b3R5cGUud2FybkFib3V0VW50cmFja2VkUmVhZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSBcInByb2R1Y3Rpb25cIilcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgaWYgKHRoaXMucmVxdWlyZXNSZWFjdGlvbiA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgZmFpbCQkMShcIlttb2J4XSBDb21wdXRlZCB2YWx1ZSBcIiArIHRoaXMubmFtZSArIFwiIGlzIHJlYWQgb3V0c2lkZSBhIHJlYWN0aXZlIGNvbnRleHRcIik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuaXNUcmFjaW5nICE9PSBUcmFjZU1vZGUkJDEuTk9ORSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJbbW9ieC50cmFjZV0gJ1wiICsgdGhpcy5uYW1lICsgXCInIGlzIGJlaW5nIHJlYWQgb3V0c2lkZSBhIHJlYWN0aXZlIGNvbnRleHQuIERvaW5nIGEgZnVsbCByZWNvbXB1dGVcIik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGdsb2JhbFN0YXRlJCQxLmNvbXB1dGVkUmVxdWlyZXNSZWFjdGlvbikge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKFwiW21vYnhdIENvbXB1dGVkIHZhbHVlIFwiICsgdGhpcy5uYW1lICsgXCIgaXMgYmVpbmcgcmVhZCBvdXRzaWRlIGEgcmVhY3RpdmUgY29udGV4dC4gRG9pbmcgYSBmdWxsIHJlY29tcHV0ZVwiKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgQ29tcHV0ZWRWYWx1ZSQkMS5wcm90b3R5cGUudG9KU09OID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXQoKTtcbiAgICB9O1xuICAgIENvbXB1dGVkVmFsdWUkJDEucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5uYW1lICsgXCJbXCIgKyB0aGlzLmRlcml2YXRpb24udG9TdHJpbmcoKSArIFwiXVwiO1xuICAgIH07XG4gICAgQ29tcHV0ZWRWYWx1ZSQkMS5wcm90b3R5cGUudmFsdWVPZiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRvUHJpbWl0aXZlJCQxKHRoaXMuZ2V0KCkpO1xuICAgIH07XG4gICAgQ29tcHV0ZWRWYWx1ZSQkMS5wcm90b3R5cGVbU3ltYm9sLnRvUHJpbWl0aXZlXSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsdWVPZigpO1xuICAgIH07XG4gICAgcmV0dXJuIENvbXB1dGVkVmFsdWUkJDE7XG59KCkpO1xudmFyIGlzQ29tcHV0ZWRWYWx1ZSQkMSA9IGNyZWF0ZUluc3RhbmNlb2ZQcmVkaWNhdGUkJDEoXCJDb21wdXRlZFZhbHVlXCIsIENvbXB1dGVkVmFsdWUkJDEpO1xuXG52YXIgSURlcml2YXRpb25TdGF0ZTtcbihmdW5jdGlvbiAoSURlcml2YXRpb25TdGF0ZSQkMSkge1xuICAgIC8vIGJlZm9yZSBiZWluZyBydW4gb3IgKG91dHNpZGUgYmF0Y2ggYW5kIG5vdCBiZWluZyBvYnNlcnZlZClcbiAgICAvLyBhdCB0aGlzIHBvaW50IGRlcml2YXRpb24gaXMgbm90IGhvbGRpbmcgYW55IGRhdGEgYWJvdXQgZGVwZW5kZW5jeSB0cmVlXG4gICAgSURlcml2YXRpb25TdGF0ZSQkMVtJRGVyaXZhdGlvblN0YXRlJCQxW1wiTk9UX1RSQUNLSU5HXCJdID0gLTFdID0gXCJOT1RfVFJBQ0tJTkdcIjtcbiAgICAvLyBubyBzaGFsbG93IGRlcGVuZGVuY3kgY2hhbmdlZCBzaW5jZSBsYXN0IGNvbXB1dGF0aW9uXG4gICAgLy8gd29uJ3QgcmVjYWxjdWxhdGUgZGVyaXZhdGlvblxuICAgIC8vIHRoaXMgaXMgd2hhdCBtYWtlcyBtb2J4IGZhc3RcbiAgICBJRGVyaXZhdGlvblN0YXRlJCQxW0lEZXJpdmF0aW9uU3RhdGUkJDFbXCJVUF9UT19EQVRFXCJdID0gMF0gPSBcIlVQX1RPX0RBVEVcIjtcbiAgICAvLyBzb21lIGRlZXAgZGVwZW5kZW5jeSBjaGFuZ2VkLCBidXQgZG9uJ3Qga25vdyBpZiBzaGFsbG93IGRlcGVuZGVuY3kgY2hhbmdlZFxuICAgIC8vIHdpbGwgcmVxdWlyZSB0byBjaGVjayBmaXJzdCBpZiBVUF9UT19EQVRFIG9yIFBPU1NJQkxZX1NUQUxFXG4gICAgLy8gY3VycmVudGx5IG9ubHkgQ29tcHV0ZWRWYWx1ZSB3aWxsIHByb3BhZ2F0ZSBQT1NTSUJMWV9TVEFMRVxuICAgIC8vXG4gICAgLy8gaGF2aW5nIHRoaXMgc3RhdGUgaXMgc2Vjb25kIGJpZyBvcHRpbWl6YXRpb246XG4gICAgLy8gZG9uJ3QgaGF2ZSB0byByZWNvbXB1dGUgb24gZXZlcnkgZGVwZW5kZW5jeSBjaGFuZ2UsIGJ1dCBvbmx5IHdoZW4gaXQncyBuZWVkZWRcbiAgICBJRGVyaXZhdGlvblN0YXRlJCQxW0lEZXJpdmF0aW9uU3RhdGUkJDFbXCJQT1NTSUJMWV9TVEFMRVwiXSA9IDFdID0gXCJQT1NTSUJMWV9TVEFMRVwiO1xuICAgIC8vIEEgc2hhbGxvdyBkZXBlbmRlbmN5IGhhcyBjaGFuZ2VkIHNpbmNlIGxhc3QgY29tcHV0YXRpb24gYW5kIHRoZSBkZXJpdmF0aW9uXG4gICAgLy8gd2lsbCBuZWVkIHRvIHJlY29tcHV0ZSB3aGVuIGl0J3MgbmVlZGVkIG5leHQuXG4gICAgSURlcml2YXRpb25TdGF0ZSQkMVtJRGVyaXZhdGlvblN0YXRlJCQxW1wiU1RBTEVcIl0gPSAyXSA9IFwiU1RBTEVcIjtcbn0pKElEZXJpdmF0aW9uU3RhdGUgfHwgKElEZXJpdmF0aW9uU3RhdGUgPSB7fSkpO1xudmFyIFRyYWNlTW9kZSQkMTtcbihmdW5jdGlvbiAoVHJhY2VNb2RlJCQxKSB7XG4gICAgVHJhY2VNb2RlJCQxW1RyYWNlTW9kZSQkMVtcIk5PTkVcIl0gPSAwXSA9IFwiTk9ORVwiO1xuICAgIFRyYWNlTW9kZSQkMVtUcmFjZU1vZGUkJDFbXCJMT0dcIl0gPSAxXSA9IFwiTE9HXCI7XG4gICAgVHJhY2VNb2RlJCQxW1RyYWNlTW9kZSQkMVtcIkJSRUFLXCJdID0gMl0gPSBcIkJSRUFLXCI7XG59KShUcmFjZU1vZGUkJDEgfHwgKFRyYWNlTW9kZSQkMSA9IHt9KSk7XG52YXIgQ2F1Z2h0RXhjZXB0aW9uJCQxID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIENhdWdodEV4Y2VwdGlvbiQkMShjYXVzZSkge1xuICAgICAgICB0aGlzLmNhdXNlID0gY2F1c2U7XG4gICAgICAgIC8vIEVtcHR5XG4gICAgfVxuICAgIHJldHVybiBDYXVnaHRFeGNlcHRpb24kJDE7XG59KCkpO1xuZnVuY3Rpb24gaXNDYXVnaHRFeGNlcHRpb24kJDEoZSkge1xuICAgIHJldHVybiBlIGluc3RhbmNlb2YgQ2F1Z2h0RXhjZXB0aW9uJCQxO1xufVxuLyoqXG4gKiBGaW5kcyBvdXQgd2hldGhlciBhbnkgZGVwZW5kZW5jeSBvZiB0aGUgZGVyaXZhdGlvbiBoYXMgYWN0dWFsbHkgY2hhbmdlZC5cbiAqIElmIGRlcGVuZGVuY2llc1N0YXRlIGlzIDEgdGhlbiBpdCB3aWxsIHJlY2FsY3VsYXRlIGRlcGVuZGVuY2llcyxcbiAqIGlmIGFueSBkZXBlbmRlbmN5IGNoYW5nZWQgaXQgd2lsbCBwcm9wYWdhdGUgaXQgYnkgY2hhbmdpbmcgZGVwZW5kZW5jaWVzU3RhdGUgdG8gMi5cbiAqXG4gKiBCeSBpdGVyYXRpbmcgb3ZlciB0aGUgZGVwZW5kZW5jaWVzIGluIHRoZSBzYW1lIG9yZGVyIHRoYXQgdGhleSB3ZXJlIHJlcG9ydGVkIGFuZFxuICogc3RvcHBpbmcgb24gdGhlIGZpcnN0IGNoYW5nZSwgYWxsIHRoZSByZWNhbGN1bGF0aW9ucyBhcmUgb25seSBjYWxsZWQgZm9yIENvbXB1dGVkVmFsdWVzXG4gKiB0aGF0IHdpbGwgYmUgdHJhY2tlZCBieSBkZXJpdmF0aW9uLiBUaGF0IGlzIGJlY2F1c2Ugd2UgYXNzdW1lIHRoYXQgaWYgdGhlIGZpcnN0IHhcbiAqIGRlcGVuZGVuY2llcyBvZiB0aGUgZGVyaXZhdGlvbiBkb2Vzbid0IGNoYW5nZSB0aGVuIHRoZSBkZXJpdmF0aW9uIHNob3VsZCBydW4gdGhlIHNhbWUgd2F5XG4gKiB1cCB1bnRpbCBhY2Nlc3NpbmcgeC10aCBkZXBlbmRlbmN5LlxuICovXG5mdW5jdGlvbiBzaG91bGRDb21wdXRlJCQxKGRlcml2YXRpb24pIHtcbiAgICBzd2l0Y2ggKGRlcml2YXRpb24uZGVwZW5kZW5jaWVzU3RhdGUpIHtcbiAgICAgICAgY2FzZSBJRGVyaXZhdGlvblN0YXRlLlVQX1RPX0RBVEU6XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIGNhc2UgSURlcml2YXRpb25TdGF0ZS5OT1RfVFJBQ0tJTkc6XG4gICAgICAgIGNhc2UgSURlcml2YXRpb25TdGF0ZS5TVEFMRTpcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICBjYXNlIElEZXJpdmF0aW9uU3RhdGUuUE9TU0lCTFlfU1RBTEU6IHtcbiAgICAgICAgICAgIHZhciBwcmV2VW50cmFja2VkID0gdW50cmFja2VkU3RhcnQkJDEoKTsgLy8gbm8gbmVlZCBmb3IgdGhvc2UgY29tcHV0ZWRzIHRvIGJlIHJlcG9ydGVkLCB0aGV5IHdpbGwgYmUgcGlja2VkIHVwIGluIHRyYWNrRGVyaXZlZEZ1bmN0aW9uLlxuICAgICAgICAgICAgdmFyIG9icyA9IGRlcml2YXRpb24ub2JzZXJ2aW5nLCBsID0gb2JzLmxlbmd0aDtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIG9iaiA9IG9ic1tpXTtcbiAgICAgICAgICAgICAgICBpZiAoaXNDb21wdXRlZFZhbHVlJCQxKG9iaikpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGdsb2JhbFN0YXRlJCQxLmRpc2FibGVFcnJvckJvdW5kYXJpZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9iai5nZXQoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqLmdldCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB3ZSBhcmUgbm90IGludGVyZXN0ZWQgaW4gdGhlIHZhbHVlICpvciogZXhjZXB0aW9uIGF0IHRoaXMgbW9tZW50LCBidXQgaWYgdGhlcmUgaXMgb25lLCBub3RpZnkgYWxsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdW50cmFja2VkRW5kJCQxKHByZXZVbnRyYWNrZWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8vIGlmIENvbXB1dGVkVmFsdWUgYG9iamAgYWN0dWFsbHkgY2hhbmdlZCBpdCB3aWxsIGJlIGNvbXB1dGVkIGFuZCBwcm9wYWdhdGVkIHRvIGl0cyBvYnNlcnZlcnMuXG4gICAgICAgICAgICAgICAgICAgIC8vIGFuZCBgZGVyaXZhdGlvbmAgaXMgYW4gb2JzZXJ2ZXIgb2YgYG9iamBcbiAgICAgICAgICAgICAgICAgICAgLy8gaW52YXJpYW50U2hvdWxkQ29tcHV0ZShkZXJpdmF0aW9uKVxuICAgICAgICAgICAgICAgICAgICBpZiAoZGVyaXZhdGlvbi5kZXBlbmRlbmNpZXNTdGF0ZSA9PT0gSURlcml2YXRpb25TdGF0ZS5TVEFMRSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdW50cmFja2VkRW5kJCQxKHByZXZVbnRyYWNrZWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjaGFuZ2VEZXBlbmRlbmNpZXNTdGF0ZVRvMCQkMShkZXJpdmF0aW9uKTtcbiAgICAgICAgICAgIHVudHJhY2tlZEVuZCQkMShwcmV2VW50cmFja2VkKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbn1cbi8vIGZ1bmN0aW9uIGludmFyaWFudFNob3VsZENvbXB1dGUoZGVyaXZhdGlvbjogSURlcml2YXRpb24pIHtcbi8vICAgICBjb25zdCBuZXdEZXBTdGF0ZSA9IChkZXJpdmF0aW9uIGFzIGFueSkuZGVwZW5kZW5jaWVzU3RhdGVcbi8vICAgICBpZiAoXG4vLyAgICAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSBcInByb2R1Y3Rpb25cIiAmJlxuLy8gICAgICAgICAobmV3RGVwU3RhdGUgPT09IElEZXJpdmF0aW9uU3RhdGUuUE9TU0lCTFlfU1RBTEUgfHxcbi8vICAgICAgICAgICAgIG5ld0RlcFN0YXRlID09PSBJRGVyaXZhdGlvblN0YXRlLk5PVF9UUkFDS0lORylcbi8vICAgICApXG4vLyAgICAgICAgIGZhaWwoXCJJbGxlZ2FsIGRlcGVuZGVuY3kgc3RhdGVcIilcbi8vIH1cbmZ1bmN0aW9uIGlzQ29tcHV0aW5nRGVyaXZhdGlvbiQkMSgpIHtcbiAgICByZXR1cm4gZ2xvYmFsU3RhdGUkJDEudHJhY2tpbmdEZXJpdmF0aW9uICE9PSBudWxsOyAvLyBmaWx0ZXIgb3V0IGFjdGlvbnMgaW5zaWRlIGNvbXB1dGF0aW9uc1xufVxuZnVuY3Rpb24gY2hlY2tJZlN0YXRlTW9kaWZpY2F0aW9uc0FyZUFsbG93ZWQkJDEoYXRvbSkge1xuICAgIHZhciBoYXNPYnNlcnZlcnMkJDEgPSBhdG9tLm9ic2VydmVycy5zaXplID4gMDtcbiAgICAvLyBTaG91bGQgbmV2ZXIgYmUgcG9zc2libGUgdG8gY2hhbmdlIGFuIG9ic2VydmVkIG9ic2VydmFibGUgZnJvbSBpbnNpZGUgY29tcHV0ZWQsIHNlZSAjNzk4XG4gICAgaWYgKGdsb2JhbFN0YXRlJCQxLmNvbXB1dGF0aW9uRGVwdGggPiAwICYmIGhhc09ic2VydmVycyQkMSlcbiAgICAgICAgZmFpbCQkMShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgJiZcbiAgICAgICAgICAgIFwiQ29tcHV0ZWQgdmFsdWVzIGFyZSBub3QgYWxsb3dlZCB0byBjYXVzZSBzaWRlIGVmZmVjdHMgYnkgY2hhbmdpbmcgb2JzZXJ2YWJsZXMgdGhhdCBhcmUgYWxyZWFkeSBiZWluZyBvYnNlcnZlZC4gVHJpZWQgdG8gbW9kaWZ5OiBcIiArIGF0b20ubmFtZSk7XG4gICAgLy8gU2hvdWxkIG5vdCBiZSBwb3NzaWJsZSB0byBjaGFuZ2Ugb2JzZXJ2ZWQgc3RhdGUgb3V0c2lkZSBzdHJpY3QgbW9kZSwgZXhjZXB0IGR1cmluZyBpbml0aWFsaXphdGlvbiwgc2VlICM1NjNcbiAgICBpZiAoIWdsb2JhbFN0YXRlJCQxLmFsbG93U3RhdGVDaGFuZ2VzICYmIChoYXNPYnNlcnZlcnMkJDEgfHwgZ2xvYmFsU3RhdGUkJDEuZW5mb3JjZUFjdGlvbnMgPT09IFwic3RyaWN0XCIpKVxuICAgICAgICBmYWlsJCQxKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiAmJlxuICAgICAgICAgICAgKGdsb2JhbFN0YXRlJCQxLmVuZm9yY2VBY3Rpb25zXG4gICAgICAgICAgICAgICAgPyBcIlNpbmNlIHN0cmljdC1tb2RlIGlzIGVuYWJsZWQsIGNoYW5naW5nIG9ic2VydmVkIG9ic2VydmFibGUgdmFsdWVzIG91dHNpZGUgYWN0aW9ucyBpcyBub3QgYWxsb3dlZC4gUGxlYXNlIHdyYXAgdGhlIGNvZGUgaW4gYW4gYGFjdGlvbmAgaWYgdGhpcyBjaGFuZ2UgaXMgaW50ZW5kZWQuIFRyaWVkIHRvIG1vZGlmeTogXCJcbiAgICAgICAgICAgICAgICA6IFwiU2lkZSBlZmZlY3RzIGxpa2UgY2hhbmdpbmcgc3RhdGUgYXJlIG5vdCBhbGxvd2VkIGF0IHRoaXMgcG9pbnQuIEFyZSB5b3UgdHJ5aW5nIHRvIG1vZGlmeSBzdGF0ZSBmcm9tLCBmb3IgZXhhbXBsZSwgdGhlIHJlbmRlciBmdW5jdGlvbiBvZiBhIFJlYWN0IGNvbXBvbmVudD8gVHJpZWQgdG8gbW9kaWZ5OiBcIikgK1xuICAgICAgICAgICAgICAgIGF0b20ubmFtZSk7XG59XG4vKipcbiAqIEV4ZWN1dGVzIHRoZSBwcm92aWRlZCBmdW5jdGlvbiBgZmAgYW5kIHRyYWNrcyB3aGljaCBvYnNlcnZhYmxlcyBhcmUgYmVpbmcgYWNjZXNzZWQuXG4gKiBUaGUgdHJhY2tpbmcgaW5mb3JtYXRpb24gaXMgc3RvcmVkIG9uIHRoZSBgZGVyaXZhdGlvbmAgb2JqZWN0IGFuZCB0aGUgZGVyaXZhdGlvbiBpcyByZWdpc3RlcmVkXG4gKiBhcyBvYnNlcnZlciBvZiBhbnkgb2YgdGhlIGFjY2Vzc2VkIG9ic2VydmFibGVzLlxuICovXG5mdW5jdGlvbiB0cmFja0Rlcml2ZWRGdW5jdGlvbiQkMShkZXJpdmF0aW9uLCBmLCBjb250ZXh0KSB7XG4gICAgLy8gcHJlIGFsbG9jYXRlIGFycmF5IGFsbG9jYXRpb24gKyByb29tIGZvciB2YXJpYXRpb24gaW4gZGVwc1xuICAgIC8vIGFycmF5IHdpbGwgYmUgdHJpbW1lZCBieSBiaW5kRGVwZW5kZW5jaWVzXG4gICAgY2hhbmdlRGVwZW5kZW5jaWVzU3RhdGVUbzAkJDEoZGVyaXZhdGlvbik7XG4gICAgZGVyaXZhdGlvbi5uZXdPYnNlcnZpbmcgPSBuZXcgQXJyYXkoZGVyaXZhdGlvbi5vYnNlcnZpbmcubGVuZ3RoICsgMTAwKTtcbiAgICBkZXJpdmF0aW9uLnVuYm91bmREZXBzQ291bnQgPSAwO1xuICAgIGRlcml2YXRpb24ucnVuSWQgPSArK2dsb2JhbFN0YXRlJCQxLnJ1bklkO1xuICAgIHZhciBwcmV2VHJhY2tpbmcgPSBnbG9iYWxTdGF0ZSQkMS50cmFja2luZ0Rlcml2YXRpb247XG4gICAgZ2xvYmFsU3RhdGUkJDEudHJhY2tpbmdEZXJpdmF0aW9uID0gZGVyaXZhdGlvbjtcbiAgICB2YXIgcmVzdWx0O1xuICAgIGlmIChnbG9iYWxTdGF0ZSQkMS5kaXNhYmxlRXJyb3JCb3VuZGFyaWVzID09PSB0cnVlKSB7XG4gICAgICAgIHJlc3VsdCA9IGYuY2FsbChjb250ZXh0KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXN1bHQgPSBmLmNhbGwoY29udGV4dCk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IG5ldyBDYXVnaHRFeGNlcHRpb24kJDEoZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZ2xvYmFsU3RhdGUkJDEudHJhY2tpbmdEZXJpdmF0aW9uID0gcHJldlRyYWNraW5nO1xuICAgIGJpbmREZXBlbmRlbmNpZXMoZGVyaXZhdGlvbik7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cbi8qKlxuICogZGlmZnMgbmV3T2JzZXJ2aW5nIHdpdGggb2JzZXJ2aW5nLlxuICogdXBkYXRlIG9ic2VydmluZyB0byBiZSBuZXdPYnNlcnZpbmcgd2l0aCB1bmlxdWUgb2JzZXJ2YWJsZXNcbiAqIG5vdGlmeSBvYnNlcnZlcnMgdGhhdCBiZWNvbWUgb2JzZXJ2ZWQvdW5vYnNlcnZlZFxuICovXG5mdW5jdGlvbiBiaW5kRGVwZW5kZW5jaWVzKGRlcml2YXRpb24pIHtcbiAgICAvLyBpbnZhcmlhbnQoZGVyaXZhdGlvbi5kZXBlbmRlbmNpZXNTdGF0ZSAhPT0gSURlcml2YXRpb25TdGF0ZS5OT1RfVFJBQ0tJTkcsIFwiSU5URVJOQUwgRVJST1IgYmluZERlcGVuZGVuY2llcyBleHBlY3RzIGRlcml2YXRpb24uZGVwZW5kZW5jaWVzU3RhdGUgIT09IC0xXCIpO1xuICAgIHZhciBwcmV2T2JzZXJ2aW5nID0gZGVyaXZhdGlvbi5vYnNlcnZpbmc7XG4gICAgdmFyIG9ic2VydmluZyA9IChkZXJpdmF0aW9uLm9ic2VydmluZyA9IGRlcml2YXRpb24ubmV3T2JzZXJ2aW5nKTtcbiAgICB2YXIgbG93ZXN0TmV3T2JzZXJ2aW5nRGVyaXZhdGlvblN0YXRlID0gSURlcml2YXRpb25TdGF0ZS5VUF9UT19EQVRFO1xuICAgIC8vIEdvIHRocm91Z2ggYWxsIG5ldyBvYnNlcnZhYmxlcyBhbmQgY2hlY2sgZGlmZlZhbHVlOiAodGhpcyBsaXN0IGNhbiBjb250YWluIGR1cGxpY2F0ZXMpOlxuICAgIC8vICAgMDogZmlyc3Qgb2NjdXJyZW5jZSwgY2hhbmdlIHRvIDEgYW5kIGtlZXAgaXRcbiAgICAvLyAgIDE6IGV4dHJhIG9jY3VycmVuY2UsIGRyb3AgaXRcbiAgICB2YXIgaTAgPSAwLCBsID0gZGVyaXZhdGlvbi51bmJvdW5kRGVwc0NvdW50O1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgIHZhciBkZXAgPSBvYnNlcnZpbmdbaV07XG4gICAgICAgIGlmIChkZXAuZGlmZlZhbHVlID09PSAwKSB7XG4gICAgICAgICAgICBkZXAuZGlmZlZhbHVlID0gMTtcbiAgICAgICAgICAgIGlmIChpMCAhPT0gaSlcbiAgICAgICAgICAgICAgICBvYnNlcnZpbmdbaTBdID0gZGVwO1xuICAgICAgICAgICAgaTArKztcbiAgICAgICAgfVxuICAgICAgICAvLyBVcGNhc3QgaXMgJ3NhZmUnIGhlcmUsIGJlY2F1c2UgaWYgZGVwIGlzIElPYnNlcnZhYmxlLCBgZGVwZW5kZW5jaWVzU3RhdGVgIHdpbGwgYmUgdW5kZWZpbmVkLFxuICAgICAgICAvLyBub3QgaGl0dGluZyB0aGUgY29uZGl0aW9uXG4gICAgICAgIGlmIChkZXAuZGVwZW5kZW5jaWVzU3RhdGUgPiBsb3dlc3ROZXdPYnNlcnZpbmdEZXJpdmF0aW9uU3RhdGUpIHtcbiAgICAgICAgICAgIGxvd2VzdE5ld09ic2VydmluZ0Rlcml2YXRpb25TdGF0ZSA9IGRlcC5kZXBlbmRlbmNpZXNTdGF0ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBvYnNlcnZpbmcubGVuZ3RoID0gaTA7XG4gICAgZGVyaXZhdGlvbi5uZXdPYnNlcnZpbmcgPSBudWxsOyAvLyBuZXdPYnNlcnZpbmcgc2hvdWxkbid0IGJlIG5lZWRlZCBvdXRzaWRlIHRyYWNraW5nIChzdGF0ZW1lbnQgbW92ZWQgZG93biB0byB3b3JrIGFyb3VuZCBGRiBidWcsIHNlZSAjNjE0KVxuICAgIC8vIEdvIHRocm91Z2ggYWxsIG9sZCBvYnNlcnZhYmxlcyBhbmQgY2hlY2sgZGlmZlZhbHVlOiAoaXQgaXMgdW5pcXVlIGFmdGVyIGxhc3QgYmluZERlcGVuZGVuY2llcylcbiAgICAvLyAgIDA6IGl0J3Mgbm90IGluIG5ldyBvYnNlcnZhYmxlcywgdW5vYnNlcnZlIGl0XG4gICAgLy8gICAxOiBpdCBrZWVwcyBiZWluZyBvYnNlcnZlZCwgZG9uJ3Qgd2FudCB0byBub3RpZnkgaXQuIGNoYW5nZSB0byAwXG4gICAgbCA9IHByZXZPYnNlcnZpbmcubGVuZ3RoO1xuICAgIHdoaWxlIChsLS0pIHtcbiAgICAgICAgdmFyIGRlcCA9IHByZXZPYnNlcnZpbmdbbF07XG4gICAgICAgIGlmIChkZXAuZGlmZlZhbHVlID09PSAwKSB7XG4gICAgICAgICAgICByZW1vdmVPYnNlcnZlciQkMShkZXAsIGRlcml2YXRpb24pO1xuICAgICAgICB9XG4gICAgICAgIGRlcC5kaWZmVmFsdWUgPSAwO1xuICAgIH1cbiAgICAvLyBHbyB0aHJvdWdoIGFsbCBuZXcgb2JzZXJ2YWJsZXMgYW5kIGNoZWNrIGRpZmZWYWx1ZTogKG5vdyBpdCBzaG91bGQgYmUgdW5pcXVlKVxuICAgIC8vICAgMDogaXQgd2FzIHNldCB0byAwIGluIGxhc3QgbG9vcC4gZG9uJ3QgbmVlZCB0byBkbyBhbnl0aGluZy5cbiAgICAvLyAgIDE6IGl0IHdhc24ndCBvYnNlcnZlZCwgbGV0J3Mgb2JzZXJ2ZSBpdC4gc2V0IGJhY2sgdG8gMFxuICAgIHdoaWxlIChpMC0tKSB7XG4gICAgICAgIHZhciBkZXAgPSBvYnNlcnZpbmdbaTBdO1xuICAgICAgICBpZiAoZGVwLmRpZmZWYWx1ZSA9PT0gMSkge1xuICAgICAgICAgICAgZGVwLmRpZmZWYWx1ZSA9IDA7XG4gICAgICAgICAgICBhZGRPYnNlcnZlciQkMShkZXAsIGRlcml2YXRpb24pO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vIFNvbWUgbmV3IG9ic2VydmVkIGRlcml2YXRpb25zIG1heSBiZWNvbWUgc3RhbGUgZHVyaW5nIHRoaXMgZGVyaXZhdGlvbiBjb21wdXRhdGlvblxuICAgIC8vIHNvIHRoZXkgaGF2ZSBoYWQgbm8gY2hhbmNlIHRvIHByb3BhZ2F0ZSBzdGFsZW5lc3MgKCM5MTYpXG4gICAgaWYgKGxvd2VzdE5ld09ic2VydmluZ0Rlcml2YXRpb25TdGF0ZSAhPT0gSURlcml2YXRpb25TdGF0ZS5VUF9UT19EQVRFKSB7XG4gICAgICAgIGRlcml2YXRpb24uZGVwZW5kZW5jaWVzU3RhdGUgPSBsb3dlc3ROZXdPYnNlcnZpbmdEZXJpdmF0aW9uU3RhdGU7XG4gICAgICAgIGRlcml2YXRpb24ub25CZWNvbWVTdGFsZSgpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGNsZWFyT2JzZXJ2aW5nJCQxKGRlcml2YXRpb24pIHtcbiAgICAvLyBpbnZhcmlhbnQoZ2xvYmFsU3RhdGUuaW5CYXRjaCA+IDAsIFwiSU5URVJOQUwgRVJST1IgY2xlYXJPYnNlcnZpbmcgc2hvdWxkIGJlIGNhbGxlZCBvbmx5IGluc2lkZSBiYXRjaFwiKTtcbiAgICB2YXIgb2JzID0gZGVyaXZhdGlvbi5vYnNlcnZpbmc7XG4gICAgZGVyaXZhdGlvbi5vYnNlcnZpbmcgPSBbXTtcbiAgICB2YXIgaSA9IG9icy5sZW5ndGg7XG4gICAgd2hpbGUgKGktLSlcbiAgICAgICAgcmVtb3ZlT2JzZXJ2ZXIkJDEob2JzW2ldLCBkZXJpdmF0aW9uKTtcbiAgICBkZXJpdmF0aW9uLmRlcGVuZGVuY2llc1N0YXRlID0gSURlcml2YXRpb25TdGF0ZS5OT1RfVFJBQ0tJTkc7XG59XG5mdW5jdGlvbiB1bnRyYWNrZWQkJDEoYWN0aW9uJCQxKSB7XG4gICAgdmFyIHByZXYgPSB1bnRyYWNrZWRTdGFydCQkMSgpO1xuICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBhY3Rpb24kJDEoKTtcbiAgICB9XG4gICAgZmluYWxseSB7XG4gICAgICAgIHVudHJhY2tlZEVuZCQkMShwcmV2KTtcbiAgICB9XG59XG5mdW5jdGlvbiB1bnRyYWNrZWRTdGFydCQkMSgpIHtcbiAgICB2YXIgcHJldiA9IGdsb2JhbFN0YXRlJCQxLnRyYWNraW5nRGVyaXZhdGlvbjtcbiAgICBnbG9iYWxTdGF0ZSQkMS50cmFja2luZ0Rlcml2YXRpb24gPSBudWxsO1xuICAgIHJldHVybiBwcmV2O1xufVxuZnVuY3Rpb24gdW50cmFja2VkRW5kJCQxKHByZXYpIHtcbiAgICBnbG9iYWxTdGF0ZSQkMS50cmFja2luZ0Rlcml2YXRpb24gPSBwcmV2O1xufVxuLyoqXG4gKiBuZWVkZWQgdG8ga2VlcCBgbG93ZXN0T2JzZXJ2ZXJTdGF0ZWAgY29ycmVjdC4gd2hlbiBjaGFuZ2luZyBmcm9tICgyIG9yIDEpIHRvIDBcbiAqXG4gKi9cbmZ1bmN0aW9uIGNoYW5nZURlcGVuZGVuY2llc1N0YXRlVG8wJCQxKGRlcml2YXRpb24pIHtcbiAgICBpZiAoZGVyaXZhdGlvbi5kZXBlbmRlbmNpZXNTdGF0ZSA9PT0gSURlcml2YXRpb25TdGF0ZS5VUF9UT19EQVRFKVxuICAgICAgICByZXR1cm47XG4gICAgZGVyaXZhdGlvbi5kZXBlbmRlbmNpZXNTdGF0ZSA9IElEZXJpdmF0aW9uU3RhdGUuVVBfVE9fREFURTtcbiAgICB2YXIgb2JzID0gZGVyaXZhdGlvbi5vYnNlcnZpbmc7XG4gICAgdmFyIGkgPSBvYnMubGVuZ3RoO1xuICAgIHdoaWxlIChpLS0pXG4gICAgICAgIG9ic1tpXS5sb3dlc3RPYnNlcnZlclN0YXRlID0gSURlcml2YXRpb25TdGF0ZS5VUF9UT19EQVRFO1xufVxuXG4vKipcbiAqIFRoZXNlIHZhbHVlcyB3aWxsIHBlcnNpc3QgaWYgZ2xvYmFsIHN0YXRlIGlzIHJlc2V0XG4gKi9cbnZhciBwZXJzaXN0ZW50S2V5cyA9IFtcbiAgICBcIm1vYnhHdWlkXCIsXG4gICAgXCJzcHlMaXN0ZW5lcnNcIixcbiAgICBcImVuZm9yY2VBY3Rpb25zXCIsXG4gICAgXCJjb21wdXRlZFJlcXVpcmVzUmVhY3Rpb25cIixcbiAgICBcImRpc2FibGVFcnJvckJvdW5kYXJpZXNcIixcbiAgICBcInJ1bklkXCIsXG4gICAgXCJVTkNIQU5HRURcIlxuXTtcbnZhciBNb2JYR2xvYmFscyQkMSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBNb2JYR2xvYmFscyQkMSgpIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIE1vYlhHbG9iYWxzIHZlcnNpb24uXG4gICAgICAgICAqIE1vYlggY29tcGF0aWJsaXR5IHdpdGggb3RoZXIgdmVyc2lvbnMgbG9hZGVkIGluIG1lbW9yeSBhcyBsb25nIGFzIHRoaXMgdmVyc2lvbiBtYXRjaGVzLlxuICAgICAgICAgKiBJdCBpbmRpY2F0ZXMgdGhhdCB0aGUgZ2xvYmFsIHN0YXRlIHN0aWxsIHN0b3JlcyBzaW1pbGFyIGluZm9ybWF0aW9uXG4gICAgICAgICAqXG4gICAgICAgICAqIE4uQjogdGhpcyB2ZXJzaW9uIGlzIHVucmVsYXRlZCB0byB0aGUgcGFja2FnZSB2ZXJzaW9uIG9mIE1vYlgsIGFuZCBpcyBvbmx5IHRoZSB2ZXJzaW9uIG9mIHRoZVxuICAgICAgICAgKiBpbnRlcm5hbCBzdGF0ZSBzdG9yYWdlIG9mIE1vYlgsIGFuZCBjYW4gYmUgdGhlIHNhbWUgYWNyb3NzIG1hbnkgZGlmZmVyZW50IHBhY2thZ2UgdmVyc2lvbnNcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMudmVyc2lvbiA9IDU7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBnbG9iYWxseSB1bmlxdWUgdG9rZW4gdG8gc2lnbmFsIHVuY2hhbmdlZFxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5VTkNIQU5HRUQgPSB7fTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEN1cnJlbnRseSBydW5uaW5nIGRlcml2YXRpb25cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMudHJhY2tpbmdEZXJpdmF0aW9uID0gbnVsbDtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEFyZSB3ZSBydW5uaW5nIGEgY29tcHV0YXRpb24gY3VycmVudGx5PyAobm90IGEgcmVhY3Rpb24pXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmNvbXB1dGF0aW9uRGVwdGggPSAwO1xuICAgICAgICAvKipcbiAgICAgICAgICogRWFjaCB0aW1lIGEgZGVyaXZhdGlvbiBpcyB0cmFja2VkLCBpdCBpcyBhc3NpZ25lZCBhIHVuaXF1ZSBydW4taWRcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMucnVuSWQgPSAwO1xuICAgICAgICAvKipcbiAgICAgICAgICogJ2d1aWQnIGZvciBnZW5lcmFsIHB1cnBvc2UuIFdpbGwgYmUgcGVyc2lzdGVkIGFtb25nc3QgcmVzZXRzLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5tb2J4R3VpZCA9IDA7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBcmUgd2UgaW4gYSBiYXRjaCBibG9jaz8gKGFuZCBob3cgbWFueSBvZiB0aGVtKVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5pbkJhdGNoID0gMDtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIE9ic2VydmFibGVzIHRoYXQgZG9uJ3QgaGF2ZSBvYnNlcnZlcnMgYW55bW9yZSwgYW5kIGFyZSBhYm91dCB0byBiZVxuICAgICAgICAgKiBzdXNwZW5kZWQsIHVubGVzcyBzb21lYm9keSBlbHNlIGFjY2Vzc2VzIGl0IGluIHRoZSBzYW1lIGJhdGNoXG4gICAgICAgICAqXG4gICAgICAgICAqIEB0eXBlIHtJT2JzZXJ2YWJsZVtdfVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5wZW5kaW5nVW5vYnNlcnZhdGlvbnMgPSBbXTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIExpc3Qgb2Ygc2NoZWR1bGVkLCBub3QgeWV0IGV4ZWN1dGVkLCByZWFjdGlvbnMuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnBlbmRpbmdSZWFjdGlvbnMgPSBbXTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEFyZSB3ZSBjdXJyZW50bHkgcHJvY2Vzc2luZyByZWFjdGlvbnM/XG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmlzUnVubmluZ1JlYWN0aW9ucyA9IGZhbHNlO1xuICAgICAgICAvKipcbiAgICAgICAgICogSXMgaXQgYWxsb3dlZCB0byBjaGFuZ2Ugb2JzZXJ2YWJsZXMgYXQgdGhpcyBwb2ludD9cbiAgICAgICAgICogSW4gZ2VuZXJhbCwgTW9iWCBkb2Vzbid0IGFsbG93IHRoYXQgd2hlbiBydW5uaW5nIGNvbXB1dGF0aW9ucyBhbmQgUmVhY3QucmVuZGVyLlxuICAgICAgICAgKiBUbyBlbnN1cmUgdGhhdCB0aG9zZSBmdW5jdGlvbnMgc3RheSBwdXJlLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5hbGxvd1N0YXRlQ2hhbmdlcyA9IHRydWU7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJZiBzdHJpY3QgbW9kZSBpcyBlbmFibGVkLCBzdGF0ZSBjaGFuZ2VzIGFyZSBieSBkZWZhdWx0IG5vdCBhbGxvd2VkXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmVuZm9yY2VBY3Rpb25zID0gZmFsc2U7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTcHkgY2FsbGJhY2tzXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnNweUxpc3RlbmVycyA9IFtdO1xuICAgICAgICAvKipcbiAgICAgICAgICogR2xvYmFsbHkgYXR0YWNoZWQgZXJyb3IgaGFuZGxlcnMgdGhhdCByZWFjdCBzcGVjaWZpY2FsbHkgdG8gZXJyb3JzIGluIHJlYWN0aW9uc1xuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5nbG9iYWxSZWFjdGlvbkVycm9ySGFuZGxlcnMgPSBbXTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFdhcm4gaWYgY29tcHV0ZWQgdmFsdWVzIGFyZSBhY2Nlc3NlZCBvdXRzaWRlIGEgcmVhY3RpdmUgY29udGV4dFxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5jb21wdXRlZFJlcXVpcmVzUmVhY3Rpb24gPSBmYWxzZTtcbiAgICAgICAgLypcbiAgICAgICAgICogRG9uJ3QgY2F0Y2ggYW5kIHJldGhyb3cgZXhjZXB0aW9ucy4gVGhpcyBpcyB1c2VmdWwgZm9yIGluc3BlY3RpbmcgdGhlIHN0YXRlIG9mXG4gICAgICAgICAqIHRoZSBzdGFjayB3aGVuIGFuIGV4Y2VwdGlvbiBvY2N1cnMgd2hpbGUgZGVidWdnaW5nLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5kaXNhYmxlRXJyb3JCb3VuZGFyaWVzID0gZmFsc2U7XG4gICAgICAgIC8qXG4gICAgICAgICAqIElmIHRydWUsIHdlIGFyZSBhbHJlYWR5IGhhbmRsaW5nIGFuIGV4Y2VwdGlvbiBpbiBhbiBhY3Rpb24uIEFueSBlcnJvcnMgaW4gcmVhY3Rpb25zIHNob3VsZCBiZSBzdXByZXNzZWQsIGFzXG4gICAgICAgICAqIHRoZXkgYXJlIG5vdCB0aGUgY2F1c2UsIHNlZTogaHR0cHM6Ly9naXRodWIuY29tL21vYnhqcy9tb2J4L2lzc3Vlcy8xODM2XG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnN1cHByZXNzUmVhY3Rpb25FcnJvcnMgPSBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIE1vYlhHbG9iYWxzJCQxO1xufSgpKTtcbnZhciBjYW5NZXJnZUdsb2JhbFN0YXRlID0gdHJ1ZTtcbnZhciBpc29sYXRlQ2FsbGVkID0gZmFsc2U7XG52YXIgZ2xvYmFsU3RhdGUkJDEgPSAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBnbG9iYWwgPSBnZXRHbG9iYWwkJDEoKTtcbiAgICBpZiAoZ2xvYmFsLl9fbW9ieEluc3RhbmNlQ291bnQgPiAwICYmICFnbG9iYWwuX19tb2J4R2xvYmFscylcbiAgICAgICAgY2FuTWVyZ2VHbG9iYWxTdGF0ZSA9IGZhbHNlO1xuICAgIGlmIChnbG9iYWwuX19tb2J4R2xvYmFscyAmJiBnbG9iYWwuX19tb2J4R2xvYmFscy52ZXJzaW9uICE9PSBuZXcgTW9iWEdsb2JhbHMkJDEoKS52ZXJzaW9uKVxuICAgICAgICBjYW5NZXJnZUdsb2JhbFN0YXRlID0gZmFsc2U7XG4gICAgaWYgKCFjYW5NZXJnZUdsb2JhbFN0YXRlKSB7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKCFpc29sYXRlQ2FsbGVkKSB7XG4gICAgICAgICAgICAgICAgZmFpbCQkMShcIlRoZXJlIGFyZSBtdWx0aXBsZSwgZGlmZmVyZW50IHZlcnNpb25zIG9mIE1vYlggYWN0aXZlLiBNYWtlIHN1cmUgTW9iWCBpcyBsb2FkZWQgb25seSBvbmNlIG9yIHVzZSBgY29uZmlndXJlKHsgaXNvbGF0ZUdsb2JhbFN0YXRlOiB0cnVlIH0pYFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgMSk7XG4gICAgICAgIHJldHVybiBuZXcgTW9iWEdsb2JhbHMkJDEoKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoZ2xvYmFsLl9fbW9ieEdsb2JhbHMpIHtcbiAgICAgICAgZ2xvYmFsLl9fbW9ieEluc3RhbmNlQ291bnQgKz0gMTtcbiAgICAgICAgaWYgKCFnbG9iYWwuX19tb2J4R2xvYmFscy5VTkNIQU5HRUQpXG4gICAgICAgICAgICBnbG9iYWwuX19tb2J4R2xvYmFscy5VTkNIQU5HRUQgPSB7fTsgLy8gbWFrZSBtZXJnZSBiYWNrd2FyZCBjb21wYXRpYmxlXG4gICAgICAgIHJldHVybiBnbG9iYWwuX19tb2J4R2xvYmFscztcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGdsb2JhbC5fX21vYnhJbnN0YW5jZUNvdW50ID0gMTtcbiAgICAgICAgcmV0dXJuIChnbG9iYWwuX19tb2J4R2xvYmFscyA9IG5ldyBNb2JYR2xvYmFscyQkMSgpKTtcbiAgICB9XG59KSgpO1xuZnVuY3Rpb24gaXNvbGF0ZUdsb2JhbFN0YXRlJCQxKCkge1xuICAgIGlmIChnbG9iYWxTdGF0ZSQkMS5wZW5kaW5nUmVhY3Rpb25zLmxlbmd0aCB8fFxuICAgICAgICBnbG9iYWxTdGF0ZSQkMS5pbkJhdGNoIHx8XG4gICAgICAgIGdsb2JhbFN0YXRlJCQxLmlzUnVubmluZ1JlYWN0aW9ucylcbiAgICAgICAgZmFpbCQkMShcImlzb2xhdGVHbG9iYWxTdGF0ZSBzaG91bGQgYmUgY2FsbGVkIGJlZm9yZSBNb2JYIGlzIHJ1bm5pbmcgYW55IHJlYWN0aW9uc1wiKTtcbiAgICBpc29sYXRlQ2FsbGVkID0gdHJ1ZTtcbiAgICBpZiAoY2FuTWVyZ2VHbG9iYWxTdGF0ZSkge1xuICAgICAgICBpZiAoLS1nZXRHbG9iYWwkJDEoKS5fX21vYnhJbnN0YW5jZUNvdW50ID09PSAwKVxuICAgICAgICAgICAgZ2V0R2xvYmFsJCQxKCkuX19tb2J4R2xvYmFscyA9IHVuZGVmaW5lZDtcbiAgICAgICAgZ2xvYmFsU3RhdGUkJDEgPSBuZXcgTW9iWEdsb2JhbHMkJDEoKTtcbiAgICB9XG59XG5mdW5jdGlvbiBnZXRHbG9iYWxTdGF0ZSQkMSgpIHtcbiAgICByZXR1cm4gZ2xvYmFsU3RhdGUkJDE7XG59XG4vKipcbiAqIEZvciB0ZXN0aW5nIHB1cnBvc2VzIG9ubHk7IHRoaXMgd2lsbCBicmVhayB0aGUgaW50ZXJuYWwgc3RhdGUgb2YgZXhpc3Rpbmcgb2JzZXJ2YWJsZXMsXG4gKiBidXQgY2FuIGJlIHVzZWQgdG8gZ2V0IGJhY2sgYXQgYSBzdGFibGUgc3RhdGUgYWZ0ZXIgdGhyb3dpbmcgZXJyb3JzXG4gKi9cbmZ1bmN0aW9uIHJlc2V0R2xvYmFsU3RhdGUkJDEoKSB7XG4gICAgdmFyIGRlZmF1bHRHbG9iYWxzID0gbmV3IE1vYlhHbG9iYWxzJCQxKCk7XG4gICAgZm9yICh2YXIga2V5IGluIGRlZmF1bHRHbG9iYWxzKVxuICAgICAgICBpZiAocGVyc2lzdGVudEtleXMuaW5kZXhPZihrZXkpID09PSAtMSlcbiAgICAgICAgICAgIGdsb2JhbFN0YXRlJCQxW2tleV0gPSBkZWZhdWx0R2xvYmFsc1trZXldO1xuICAgIGdsb2JhbFN0YXRlJCQxLmFsbG93U3RhdGVDaGFuZ2VzID0gIWdsb2JhbFN0YXRlJCQxLmVuZm9yY2VBY3Rpb25zO1xufVxuZnVuY3Rpb24gZ2V0R2xvYmFsJCQxKCkge1xuICAgIHJldHVybiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDogZ2xvYmFsO1xufVxuXG5mdW5jdGlvbiBoYXNPYnNlcnZlcnMkJDEob2JzZXJ2YWJsZSQkMSkge1xuICAgIHJldHVybiBvYnNlcnZhYmxlJCQxLm9ic2VydmVycyAmJiBvYnNlcnZhYmxlJCQxLm9ic2VydmVycy5zaXplID4gMDtcbn1cbmZ1bmN0aW9uIGdldE9ic2VydmVycyQkMShvYnNlcnZhYmxlJCQxKSB7XG4gICAgcmV0dXJuIG9ic2VydmFibGUkJDEub2JzZXJ2ZXJzO1xufVxuLy8gZnVuY3Rpb24gaW52YXJpYW50T2JzZXJ2ZXJzKG9ic2VydmFibGU6IElPYnNlcnZhYmxlKSB7XG4vLyAgICAgY29uc3QgbGlzdCA9IG9ic2VydmFibGUub2JzZXJ2ZXJzXG4vLyAgICAgY29uc3QgbWFwID0gb2JzZXJ2YWJsZS5vYnNlcnZlcnNJbmRleGVzXG4vLyAgICAgY29uc3QgbCA9IGxpc3QubGVuZ3RoXG4vLyAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsOyBpKyspIHtcbi8vICAgICAgICAgY29uc3QgaWQgPSBsaXN0W2ldLl9fbWFwaWRcbi8vICAgICAgICAgaWYgKGkpIHtcbi8vICAgICAgICAgICAgIGludmFyaWFudChtYXBbaWRdID09PSBpLCBcIklOVEVSTkFMIEVSUk9SIG1hcHMgZGVyaXZhdGlvbi5fX21hcGlkIHRvIGluZGV4IGluIGxpc3RcIikgLy8gZm9yIHBlcmZvcm1hbmNlXG4vLyAgICAgICAgIH0gZWxzZSB7XG4vLyAgICAgICAgICAgICBpbnZhcmlhbnQoIShpZCBpbiBtYXApLCBcIklOVEVSTkFMIEVSUk9SIG9ic2VydmVyIG9uIGluZGV4IDAgc2hvdWxkbid0IGJlIGhlbGQgaW4gbWFwLlwiKSAvLyBmb3IgcGVyZm9ybWFuY2Vcbi8vICAgICAgICAgfVxuLy8gICAgIH1cbi8vICAgICBpbnZhcmlhbnQoXG4vLyAgICAgICAgIGxpc3QubGVuZ3RoID09PSAwIHx8IE9iamVjdC5rZXlzKG1hcCkubGVuZ3RoID09PSBsaXN0Lmxlbmd0aCAtIDEsXG4vLyAgICAgICAgIFwiSU5URVJOQUwgRVJST1IgdGhlcmUgaXMgbm8ganVuayBpbiBtYXBcIlxuLy8gICAgIClcbi8vIH1cbmZ1bmN0aW9uIGFkZE9ic2VydmVyJCQxKG9ic2VydmFibGUkJDEsIG5vZGUpIHtcbiAgICAvLyBpbnZhcmlhbnQobm9kZS5kZXBlbmRlbmNpZXNTdGF0ZSAhPT0gLTEsIFwiSU5URVJOQUwgRVJST1IsIGNhbiBhZGQgb25seSBkZXBlbmRlbmNpZXNTdGF0ZSAhPT0gLTFcIik7XG4gICAgLy8gaW52YXJpYW50KG9ic2VydmFibGUuX29ic2VydmVycy5pbmRleE9mKG5vZGUpID09PSAtMSwgXCJJTlRFUk5BTCBFUlJPUiBhZGQgYWxyZWFkeSBhZGRlZCBub2RlXCIpO1xuICAgIC8vIGludmFyaWFudE9ic2VydmVycyhvYnNlcnZhYmxlKTtcbiAgICBvYnNlcnZhYmxlJCQxLm9ic2VydmVycy5hZGQobm9kZSk7XG4gICAgaWYgKG9ic2VydmFibGUkJDEubG93ZXN0T2JzZXJ2ZXJTdGF0ZSA+IG5vZGUuZGVwZW5kZW5jaWVzU3RhdGUpXG4gICAgICAgIG9ic2VydmFibGUkJDEubG93ZXN0T2JzZXJ2ZXJTdGF0ZSA9IG5vZGUuZGVwZW5kZW5jaWVzU3RhdGU7XG4gICAgLy8gaW52YXJpYW50T2JzZXJ2ZXJzKG9ic2VydmFibGUpO1xuICAgIC8vIGludmFyaWFudChvYnNlcnZhYmxlLl9vYnNlcnZlcnMuaW5kZXhPZihub2RlKSAhPT0gLTEsIFwiSU5URVJOQUwgRVJST1IgZGlkbid0IGFkZCBub2RlXCIpO1xufVxuZnVuY3Rpb24gcmVtb3ZlT2JzZXJ2ZXIkJDEob2JzZXJ2YWJsZSQkMSwgbm9kZSkge1xuICAgIC8vIGludmFyaWFudChnbG9iYWxTdGF0ZS5pbkJhdGNoID4gMCwgXCJJTlRFUk5BTCBFUlJPUiwgcmVtb3ZlIHNob3VsZCBiZSBjYWxsZWQgb25seSBpbnNpZGUgYmF0Y2hcIik7XG4gICAgLy8gaW52YXJpYW50KG9ic2VydmFibGUuX29ic2VydmVycy5pbmRleE9mKG5vZGUpICE9PSAtMSwgXCJJTlRFUk5BTCBFUlJPUiByZW1vdmUgYWxyZWFkeSByZW1vdmVkIG5vZGVcIik7XG4gICAgLy8gaW52YXJpYW50T2JzZXJ2ZXJzKG9ic2VydmFibGUpO1xuICAgIG9ic2VydmFibGUkJDEub2JzZXJ2ZXJzLmRlbGV0ZShub2RlKTtcbiAgICBpZiAob2JzZXJ2YWJsZSQkMS5vYnNlcnZlcnMuc2l6ZSA9PT0gMCkge1xuICAgICAgICAvLyBkZWxldGluZyBsYXN0IG9ic2VydmVyXG4gICAgICAgIHF1ZXVlRm9yVW5vYnNlcnZhdGlvbiQkMShvYnNlcnZhYmxlJCQxKTtcbiAgICB9XG4gICAgLy8gaW52YXJpYW50T2JzZXJ2ZXJzKG9ic2VydmFibGUpO1xuICAgIC8vIGludmFyaWFudChvYnNlcnZhYmxlLl9vYnNlcnZlcnMuaW5kZXhPZihub2RlKSA9PT0gLTEsIFwiSU5URVJOQUwgRVJST1IgcmVtb3ZlIGFscmVhZHkgcmVtb3ZlZCBub2RlMlwiKTtcbn1cbmZ1bmN0aW9uIHF1ZXVlRm9yVW5vYnNlcnZhdGlvbiQkMShvYnNlcnZhYmxlJCQxKSB7XG4gICAgaWYgKG9ic2VydmFibGUkJDEuaXNQZW5kaW5nVW5vYnNlcnZhdGlvbiA9PT0gZmFsc2UpIHtcbiAgICAgICAgLy8gaW52YXJpYW50KG9ic2VydmFibGUuX29ic2VydmVycy5sZW5ndGggPT09IDAsIFwiSU5URVJOQUwgRVJST1IsIHNob3VsZCBvbmx5IHF1ZXVlIGZvciB1bm9ic2VydmF0aW9uIHVub2JzZXJ2ZWQgb2JzZXJ2YWJsZXNcIik7XG4gICAgICAgIG9ic2VydmFibGUkJDEuaXNQZW5kaW5nVW5vYnNlcnZhdGlvbiA9IHRydWU7XG4gICAgICAgIGdsb2JhbFN0YXRlJCQxLnBlbmRpbmdVbm9ic2VydmF0aW9ucy5wdXNoKG9ic2VydmFibGUkJDEpO1xuICAgIH1cbn1cbi8qKlxuICogQmF0Y2ggc3RhcnRzIGEgdHJhbnNhY3Rpb24sIGF0IGxlYXN0IGZvciBwdXJwb3NlcyBvZiBtZW1vaXppbmcgQ29tcHV0ZWRWYWx1ZXMgd2hlbiBub3RoaW5nIGVsc2UgZG9lcy5cbiAqIER1cmluZyBhIGJhdGNoIGBvbkJlY29tZVVub2JzZXJ2ZWRgIHdpbGwgYmUgY2FsbGVkIGF0IG1vc3Qgb25jZSBwZXIgb2JzZXJ2YWJsZS5cbiAqIEF2b2lkcyB1bm5lY2Vzc2FyeSByZWNhbGN1bGF0aW9ucy5cbiAqL1xuZnVuY3Rpb24gc3RhcnRCYXRjaCQkMSgpIHtcbiAgICBnbG9iYWxTdGF0ZSQkMS5pbkJhdGNoKys7XG59XG5mdW5jdGlvbiBlbmRCYXRjaCQkMSgpIHtcbiAgICBpZiAoLS1nbG9iYWxTdGF0ZSQkMS5pbkJhdGNoID09PSAwKSB7XG4gICAgICAgIHJ1blJlYWN0aW9ucyQkMSgpO1xuICAgICAgICAvLyB0aGUgYmF0Y2ggaXMgYWN0dWFsbHkgYWJvdXQgdG8gZmluaXNoLCBhbGwgdW5vYnNlcnZpbmcgc2hvdWxkIGhhcHBlbiBoZXJlLlxuICAgICAgICB2YXIgbGlzdCA9IGdsb2JhbFN0YXRlJCQxLnBlbmRpbmdVbm9ic2VydmF0aW9ucztcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgb2JzZXJ2YWJsZSQkMSA9IGxpc3RbaV07XG4gICAgICAgICAgICBvYnNlcnZhYmxlJCQxLmlzUGVuZGluZ1Vub2JzZXJ2YXRpb24gPSBmYWxzZTtcbiAgICAgICAgICAgIGlmIChvYnNlcnZhYmxlJCQxLm9ic2VydmVycy5zaXplID09PSAwKSB7XG4gICAgICAgICAgICAgICAgaWYgKG9ic2VydmFibGUkJDEuaXNCZWluZ09ic2VydmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGlmIHRoaXMgb2JzZXJ2YWJsZSBoYWQgcmVhY3RpdmUgb2JzZXJ2ZXJzLCB0cmlnZ2VyIHRoZSBob29rc1xuICAgICAgICAgICAgICAgICAgICBvYnNlcnZhYmxlJCQxLmlzQmVpbmdPYnNlcnZlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBvYnNlcnZhYmxlJCQxLm9uQmVjb21lVW5vYnNlcnZlZCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAob2JzZXJ2YWJsZSQkMSBpbnN0YW5jZW9mIENvbXB1dGVkVmFsdWUkJDEpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gY29tcHV0ZWQgdmFsdWVzIGFyZSBhdXRvbWF0aWNhbGx5IHRlYXJlZCBkb3duIHdoZW4gdGhlIGxhc3Qgb2JzZXJ2ZXIgbGVhdmVzXG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMgcHJvY2VzcyBoYXBwZW5zIHJlY3Vyc2l2ZWx5LCB0aGlzIGNvbXB1dGVkIG1pZ2h0IGJlIHRoZSBsYXN0IG9ic2VydmFiZSBvZiBhbm90aGVyLCBldGMuLlxuICAgICAgICAgICAgICAgICAgICBvYnNlcnZhYmxlJCQxLnN1c3BlbmQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZ2xvYmFsU3RhdGUkJDEucGVuZGluZ1Vub2JzZXJ2YXRpb25zID0gW107XG4gICAgfVxufVxuZnVuY3Rpb24gcmVwb3J0T2JzZXJ2ZWQkJDEob2JzZXJ2YWJsZSQkMSkge1xuICAgIHZhciBkZXJpdmF0aW9uID0gZ2xvYmFsU3RhdGUkJDEudHJhY2tpbmdEZXJpdmF0aW9uO1xuICAgIGlmIChkZXJpdmF0aW9uICE9PSBudWxsKSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTaW1wbGUgb3B0aW1pemF0aW9uLCBnaXZlIGVhY2ggZGVyaXZhdGlvbiBydW4gYW4gdW5pcXVlIGlkIChydW5JZClcbiAgICAgICAgICogQ2hlY2sgaWYgbGFzdCB0aW1lIHRoaXMgb2JzZXJ2YWJsZSB3YXMgYWNjZXNzZWQgdGhlIHNhbWUgcnVuSWQgaXMgdXNlZFxuICAgICAgICAgKiBpZiB0aGlzIGlzIHRoZSBjYXNlLCB0aGUgcmVsYXRpb24gaXMgYWxyZWFkeSBrbm93blxuICAgICAgICAgKi9cbiAgICAgICAgaWYgKGRlcml2YXRpb24ucnVuSWQgIT09IG9ic2VydmFibGUkJDEubGFzdEFjY2Vzc2VkQnkpIHtcbiAgICAgICAgICAgIG9ic2VydmFibGUkJDEubGFzdEFjY2Vzc2VkQnkgPSBkZXJpdmF0aW9uLnJ1bklkO1xuICAgICAgICAgICAgLy8gVHJpZWQgc3RvcmluZyBuZXdPYnNlcnZpbmcsIG9yIG9ic2VydmluZywgb3IgYm90aCBhcyBTZXQsIGJ1dCBwZXJmb3JtYW5jZSBkaWRuJ3QgY29tZSBjbG9zZS4uLlxuICAgICAgICAgICAgZGVyaXZhdGlvbi5uZXdPYnNlcnZpbmdbZGVyaXZhdGlvbi51bmJvdW5kRGVwc0NvdW50KytdID0gb2JzZXJ2YWJsZSQkMTtcbiAgICAgICAgICAgIGlmICghb2JzZXJ2YWJsZSQkMS5pc0JlaW5nT2JzZXJ2ZWQpIHtcbiAgICAgICAgICAgICAgICBvYnNlcnZhYmxlJCQxLmlzQmVpbmdPYnNlcnZlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgb2JzZXJ2YWJsZSQkMS5vbkJlY29tZU9ic2VydmVkKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGVsc2UgaWYgKG9ic2VydmFibGUkJDEub2JzZXJ2ZXJzLnNpemUgPT09IDAgJiYgZ2xvYmFsU3RhdGUkJDEuaW5CYXRjaCA+IDApIHtcbiAgICAgICAgcXVldWVGb3JVbm9ic2VydmF0aW9uJCQxKG9ic2VydmFibGUkJDEpO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG59XG4vLyBmdW5jdGlvbiBpbnZhcmlhbnRMT1Mob2JzZXJ2YWJsZTogSU9ic2VydmFibGUsIG1zZzogc3RyaW5nKSB7XG4vLyAgICAgLy8gaXQncyBleHBlbnNpdmUgc28gYmV0dGVyIG5vdCBydW4gaXQgaW4gcHJvZHVjaXRvbi4gYnV0IHRlbXBvcmFyaWx5IGhlbHBmdWwgZm9yIHRlc3Rpbmdcbi8vICAgICBjb25zdCBtaW4gPSBnZXRPYnNlcnZlcnMob2JzZXJ2YWJsZSkucmVkdWNlKChhLCBiKSA9PiBNYXRoLm1pbihhLCBiLmRlcGVuZGVuY2llc1N0YXRlKSwgMilcbi8vICAgICBpZiAobWluID49IG9ic2VydmFibGUubG93ZXN0T2JzZXJ2ZXJTdGF0ZSkgcmV0dXJuIC8vIDwtIHRoZSBvbmx5IGFzc3VtcHRpb24gYWJvdXQgYGxvd2VzdE9ic2VydmVyU3RhdGVgXG4vLyAgICAgdGhyb3cgbmV3IEVycm9yKFxuLy8gICAgICAgICBcImxvd2VzdE9ic2VydmVyU3RhdGUgaXMgd3JvbmcgZm9yIFwiICtcbi8vICAgICAgICAgICAgIG1zZyArXG4vLyAgICAgICAgICAgICBcIiBiZWNhdXNlIFwiICtcbi8vICAgICAgICAgICAgIG1pbiArXG4vLyAgICAgICAgICAgICBcIiA8IFwiICtcbi8vICAgICAgICAgICAgIG9ic2VydmFibGUubG93ZXN0T2JzZXJ2ZXJTdGF0ZVxuLy8gICAgIClcbi8vIH1cbi8qKlxuICogTk9URTogY3VycmVudCBwcm9wYWdhdGlvbiBtZWNoYW5pc20gd2lsbCBpbiBjYXNlIG9mIHNlbGYgcmVydW5pbmcgYXV0b3J1bnMgYmVoYXZlIHVuZXhwZWN0ZWRseVxuICogSXQgd2lsbCBwcm9wYWdhdGUgY2hhbmdlcyB0byBvYnNlcnZlcnMgZnJvbSBwcmV2aW91cyBydW5cbiAqIEl0J3MgaGFyZCBvciBtYXliZSBpbXBvc3NpYmxlICh3aXRoIHJlYXNvbmFibGUgcGVyZikgdG8gZ2V0IGl0IHJpZ2h0IHdpdGggY3VycmVudCBhcHByb2FjaFxuICogSG9wZWZ1bGx5IHNlbGYgcmVydW5pbmcgYXV0b3J1bnMgYXJlbid0IGEgZmVhdHVyZSBwZW9wbGUgc2hvdWxkIGRlcGVuZCBvblxuICogQWxzbyBtb3N0IGJhc2ljIHVzZSBjYXNlcyBzaG91bGQgYmUgb2tcbiAqL1xuLy8gQ2FsbGVkIGJ5IEF0b20gd2hlbiBpdHMgdmFsdWUgY2hhbmdlc1xuZnVuY3Rpb24gcHJvcGFnYXRlQ2hhbmdlZCQkMShvYnNlcnZhYmxlJCQxKSB7XG4gICAgLy8gaW52YXJpYW50TE9TKG9ic2VydmFibGUsIFwiY2hhbmdlZCBzdGFydFwiKTtcbiAgICBpZiAob2JzZXJ2YWJsZSQkMS5sb3dlc3RPYnNlcnZlclN0YXRlID09PSBJRGVyaXZhdGlvblN0YXRlLlNUQUxFKVxuICAgICAgICByZXR1cm47XG4gICAgb2JzZXJ2YWJsZSQkMS5sb3dlc3RPYnNlcnZlclN0YXRlID0gSURlcml2YXRpb25TdGF0ZS5TVEFMRTtcbiAgICAvLyBJZGVhbGx5IHdlIHVzZSBmb3IuLm9mIGhlcmUsIGJ1dCB0aGUgZG93bmNvbXBpbGVkIHZlcnNpb24gaXMgcmVhbGx5IHNsb3cuLi5cbiAgICBvYnNlcnZhYmxlJCQxLm9ic2VydmVycy5mb3JFYWNoKGZ1bmN0aW9uIChkKSB7XG4gICAgICAgIGlmIChkLmRlcGVuZGVuY2llc1N0YXRlID09PSBJRGVyaXZhdGlvblN0YXRlLlVQX1RPX0RBVEUpIHtcbiAgICAgICAgICAgIGlmIChkLmlzVHJhY2luZyAhPT0gVHJhY2VNb2RlJCQxLk5PTkUpIHtcbiAgICAgICAgICAgICAgICBsb2dUcmFjZUluZm8oZCwgb2JzZXJ2YWJsZSQkMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkLm9uQmVjb21lU3RhbGUoKTtcbiAgICAgICAgfVxuICAgICAgICBkLmRlcGVuZGVuY2llc1N0YXRlID0gSURlcml2YXRpb25TdGF0ZS5TVEFMRTtcbiAgICB9KTtcbiAgICAvLyBpbnZhcmlhbnRMT1Mob2JzZXJ2YWJsZSwgXCJjaGFuZ2VkIGVuZFwiKTtcbn1cbi8vIENhbGxlZCBieSBDb21wdXRlZFZhbHVlIHdoZW4gaXQgcmVjYWxjdWxhdGUgYW5kIGl0cyB2YWx1ZSBjaGFuZ2VkXG5mdW5jdGlvbiBwcm9wYWdhdGVDaGFuZ2VDb25maXJtZWQkJDEob2JzZXJ2YWJsZSQkMSkge1xuICAgIC8vIGludmFyaWFudExPUyhvYnNlcnZhYmxlLCBcImNvbmZpcm1lZCBzdGFydFwiKTtcbiAgICBpZiAob2JzZXJ2YWJsZSQkMS5sb3dlc3RPYnNlcnZlclN0YXRlID09PSBJRGVyaXZhdGlvblN0YXRlLlNUQUxFKVxuICAgICAgICByZXR1cm47XG4gICAgb2JzZXJ2YWJsZSQkMS5sb3dlc3RPYnNlcnZlclN0YXRlID0gSURlcml2YXRpb25TdGF0ZS5TVEFMRTtcbiAgICBvYnNlcnZhYmxlJCQxLm9ic2VydmVycy5mb3JFYWNoKGZ1bmN0aW9uIChkKSB7XG4gICAgICAgIGlmIChkLmRlcGVuZGVuY2llc1N0YXRlID09PSBJRGVyaXZhdGlvblN0YXRlLlBPU1NJQkxZX1NUQUxFKVxuICAgICAgICAgICAgZC5kZXBlbmRlbmNpZXNTdGF0ZSA9IElEZXJpdmF0aW9uU3RhdGUuU1RBTEU7XG4gICAgICAgIGVsc2UgaWYgKGQuZGVwZW5kZW5jaWVzU3RhdGUgPT09IElEZXJpdmF0aW9uU3RhdGUuVVBfVE9fREFURSAvLyB0aGlzIGhhcHBlbnMgZHVyaW5nIGNvbXB1dGluZyBvZiBgZGAsIGp1c3Qga2VlcCBsb3dlc3RPYnNlcnZlclN0YXRlIHVwIHRvIGRhdGUuXG4gICAgICAgIClcbiAgICAgICAgICAgIG9ic2VydmFibGUkJDEubG93ZXN0T2JzZXJ2ZXJTdGF0ZSA9IElEZXJpdmF0aW9uU3RhdGUuVVBfVE9fREFURTtcbiAgICB9KTtcbiAgICAvLyBpbnZhcmlhbnRMT1Mob2JzZXJ2YWJsZSwgXCJjb25maXJtZWQgZW5kXCIpO1xufVxuLy8gVXNlZCBieSBjb21wdXRlZCB3aGVuIGl0cyBkZXBlbmRlbmN5IGNoYW5nZWQsIGJ1dCB3ZSBkb24ndCB3YW4ndCB0byBpbW1lZGlhdGVseSByZWNvbXB1dGUuXG5mdW5jdGlvbiBwcm9wYWdhdGVNYXliZUNoYW5nZWQkJDEob2JzZXJ2YWJsZSQkMSkge1xuICAgIC8vIGludmFyaWFudExPUyhvYnNlcnZhYmxlLCBcIm1heWJlIHN0YXJ0XCIpO1xuICAgIGlmIChvYnNlcnZhYmxlJCQxLmxvd2VzdE9ic2VydmVyU3RhdGUgIT09IElEZXJpdmF0aW9uU3RhdGUuVVBfVE9fREFURSlcbiAgICAgICAgcmV0dXJuO1xuICAgIG9ic2VydmFibGUkJDEubG93ZXN0T2JzZXJ2ZXJTdGF0ZSA9IElEZXJpdmF0aW9uU3RhdGUuUE9TU0lCTFlfU1RBTEU7XG4gICAgb2JzZXJ2YWJsZSQkMS5vYnNlcnZlcnMuZm9yRWFjaChmdW5jdGlvbiAoZCkge1xuICAgICAgICBpZiAoZC5kZXBlbmRlbmNpZXNTdGF0ZSA9PT0gSURlcml2YXRpb25TdGF0ZS5VUF9UT19EQVRFKSB7XG4gICAgICAgICAgICBkLmRlcGVuZGVuY2llc1N0YXRlID0gSURlcml2YXRpb25TdGF0ZS5QT1NTSUJMWV9TVEFMRTtcbiAgICAgICAgICAgIGlmIChkLmlzVHJhY2luZyAhPT0gVHJhY2VNb2RlJCQxLk5PTkUpIHtcbiAgICAgICAgICAgICAgICBsb2dUcmFjZUluZm8oZCwgb2JzZXJ2YWJsZSQkMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkLm9uQmVjb21lU3RhbGUoKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIC8vIGludmFyaWFudExPUyhvYnNlcnZhYmxlLCBcIm1heWJlIGVuZFwiKTtcbn1cbmZ1bmN0aW9uIGxvZ1RyYWNlSW5mbyhkZXJpdmF0aW9uLCBvYnNlcnZhYmxlJCQxKSB7XG4gICAgY29uc29sZS5sb2coXCJbbW9ieC50cmFjZV0gJ1wiICsgZGVyaXZhdGlvbi5uYW1lICsgXCInIGlzIGludmFsaWRhdGVkIGR1ZSB0byBhIGNoYW5nZSBpbjogJ1wiICsgb2JzZXJ2YWJsZSQkMS5uYW1lICsgXCInXCIpO1xuICAgIGlmIChkZXJpdmF0aW9uLmlzVHJhY2luZyA9PT0gVHJhY2VNb2RlJCQxLkJSRUFLKSB7XG4gICAgICAgIHZhciBsaW5lcyA9IFtdO1xuICAgICAgICBwcmludERlcFRyZWUoZ2V0RGVwZW5kZW5jeVRyZWUkJDEoZGVyaXZhdGlvbiksIGxpbmVzLCAxKTtcbiAgICAgICAgLy8gcHJldHRpZXItaWdub3JlXG4gICAgICAgIG5ldyBGdW5jdGlvbihcImRlYnVnZ2VyO1xcbi8qXFxuVHJhY2luZyAnXCIgKyBkZXJpdmF0aW9uLm5hbWUgKyBcIidcXG5cXG5Zb3UgYXJlIGVudGVyaW5nIHRoaXMgYnJlYWsgcG9pbnQgYmVjYXVzZSBkZXJpdmF0aW9uICdcIiArIGRlcml2YXRpb24ubmFtZSArIFwiJyBpcyBiZWluZyB0cmFjZWQgYW5kICdcIiArIG9ic2VydmFibGUkJDEubmFtZSArIFwiJyBpcyBub3cgZm9yY2luZyBpdCB0byB1cGRhdGUuXFxuSnVzdCBmb2xsb3cgdGhlIHN0YWNrdHJhY2UgeW91IHNob3VsZCBub3cgc2VlIGluIHRoZSBkZXZ0b29scyB0byBzZWUgcHJlY2lzZWx5IHdoYXQgcGllY2Ugb2YgeW91ciBjb2RlIGlzIGNhdXNpbmcgdGhpcyB1cGRhdGVcXG5UaGUgc3RhY2tmcmFtZSB5b3UgYXJlIGxvb2tpbmcgZm9yIGlzIGF0IGxlYXN0IH42LTggc3RhY2stZnJhbWVzIHVwLlxcblxcblwiICsgKGRlcml2YXRpb24gaW5zdGFuY2VvZiBDb21wdXRlZFZhbHVlJCQxID8gZGVyaXZhdGlvbi5kZXJpdmF0aW9uLnRvU3RyaW5nKCkucmVwbGFjZSgvWypdXFwvL2csIFwiL1wiKSA6IFwiXCIpICsgXCJcXG5cXG5UaGUgZGVwZW5kZW5jaWVzIGZvciB0aGlzIGRlcml2YXRpb24gYXJlOlxcblxcblwiICsgbGluZXMuam9pbihcIlxcblwiKSArIFwiXFxuKi9cXG4gICAgXCIpKCk7XG4gICAgfVxufVxuZnVuY3Rpb24gcHJpbnREZXBUcmVlKHRyZWUsIGxpbmVzLCBkZXB0aCkge1xuICAgIGlmIChsaW5lcy5sZW5ndGggPj0gMTAwMCkge1xuICAgICAgICBsaW5lcy5wdXNoKFwiKGFuZCBtYW55IG1vcmUpXCIpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGxpbmVzLnB1c2goXCJcIiArIG5ldyBBcnJheShkZXB0aCkuam9pbihcIlxcdFwiKSArIHRyZWUubmFtZSk7IC8vIE1XRTogbm90IHRoZSBmYXN0ZXN0LCBidXQgdGhlIGVhc2llc3Qgd2F5IDopXG4gICAgaWYgKHRyZWUuZGVwZW5kZW5jaWVzKVxuICAgICAgICB0cmVlLmRlcGVuZGVuY2llcy5mb3JFYWNoKGZ1bmN0aW9uIChjaGlsZCkgeyByZXR1cm4gcHJpbnREZXBUcmVlKGNoaWxkLCBsaW5lcywgZGVwdGggKyAxKTsgfSk7XG59XG5cbnZhciBSZWFjdGlvbiQkMSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBSZWFjdGlvbiQkMShuYW1lLCBvbkludmFsaWRhdGUsIGVycm9ySGFuZGxlcikge1xuICAgICAgICBpZiAobmFtZSA9PT0gdm9pZCAwKSB7IG5hbWUgPSBcIlJlYWN0aW9uQFwiICsgZ2V0TmV4dElkJCQxKCk7IH1cbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgdGhpcy5vbkludmFsaWRhdGUgPSBvbkludmFsaWRhdGU7XG4gICAgICAgIHRoaXMuZXJyb3JIYW5kbGVyID0gZXJyb3JIYW5kbGVyO1xuICAgICAgICB0aGlzLm9ic2VydmluZyA9IFtdOyAvLyBub2RlcyB3ZSBhcmUgbG9va2luZyBhdC4gT3VyIHZhbHVlIGRlcGVuZHMgb24gdGhlc2Ugbm9kZXNcbiAgICAgICAgdGhpcy5uZXdPYnNlcnZpbmcgPSBbXTtcbiAgICAgICAgdGhpcy5kZXBlbmRlbmNpZXNTdGF0ZSA9IElEZXJpdmF0aW9uU3RhdGUuTk9UX1RSQUNLSU5HO1xuICAgICAgICB0aGlzLmRpZmZWYWx1ZSA9IDA7XG4gICAgICAgIHRoaXMucnVuSWQgPSAwO1xuICAgICAgICB0aGlzLnVuYm91bmREZXBzQ291bnQgPSAwO1xuICAgICAgICB0aGlzLl9fbWFwaWQgPSBcIiNcIiArIGdldE5leHRJZCQkMSgpO1xuICAgICAgICB0aGlzLmlzRGlzcG9zZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5faXNTY2hlZHVsZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5faXNUcmFja1BlbmRpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5faXNSdW5uaW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaXNUcmFjaW5nID0gVHJhY2VNb2RlJCQxLk5PTkU7XG4gICAgfVxuICAgIFJlYWN0aW9uJCQxLnByb3RvdHlwZS5vbkJlY29tZVN0YWxlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLnNjaGVkdWxlKCk7XG4gICAgfTtcbiAgICBSZWFjdGlvbiQkMS5wcm90b3R5cGUuc2NoZWR1bGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghdGhpcy5faXNTY2hlZHVsZWQpIHtcbiAgICAgICAgICAgIHRoaXMuX2lzU2NoZWR1bGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIGdsb2JhbFN0YXRlJCQxLnBlbmRpbmdSZWFjdGlvbnMucHVzaCh0aGlzKTtcbiAgICAgICAgICAgIHJ1blJlYWN0aW9ucyQkMSgpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBSZWFjdGlvbiQkMS5wcm90b3R5cGUuaXNTY2hlZHVsZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pc1NjaGVkdWxlZDtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIGludGVybmFsLCB1c2Ugc2NoZWR1bGUoKSBpZiB5b3UgaW50ZW5kIHRvIGtpY2sgb2ZmIGEgcmVhY3Rpb25cbiAgICAgKi9cbiAgICBSZWFjdGlvbiQkMS5wcm90b3R5cGUucnVuUmVhY3Rpb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghdGhpcy5pc0Rpc3Bvc2VkKSB7XG4gICAgICAgICAgICBzdGFydEJhdGNoJCQxKCk7XG4gICAgICAgICAgICB0aGlzLl9pc1NjaGVkdWxlZCA9IGZhbHNlO1xuICAgICAgICAgICAgaWYgKHNob3VsZENvbXB1dGUkJDEodGhpcykpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9pc1RyYWNrUGVuZGluZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vbkludmFsaWRhdGUoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2lzVHJhY2tQZW5kaW5nICYmXG4gICAgICAgICAgICAgICAgICAgICAgICBpc1NweUVuYWJsZWQkJDEoKSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBvbkludmFsaWRhdGUgZGlkbid0IHRyaWdnZXIgdHJhY2sgcmlnaHQgYXdheS4uXG4gICAgICAgICAgICAgICAgICAgICAgICBzcHlSZXBvcnQkJDEoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IHRoaXMubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcInNjaGVkdWxlZC1yZWFjdGlvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlcG9ydEV4Y2VwdGlvbkluRGVyaXZhdGlvbihlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbmRCYXRjaCQkMSgpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBSZWFjdGlvbiQkMS5wcm90b3R5cGUudHJhY2sgPSBmdW5jdGlvbiAoZm4pIHtcbiAgICAgICAgaWYgKHRoaXMuaXNEaXNwb3NlZCkge1xuICAgICAgICAgICAgZmFpbCQkMShcIlJlYWN0aW9uIGFscmVhZHkgZGlzcG9zZWRcIik7XG4gICAgICAgIH1cbiAgICAgICAgc3RhcnRCYXRjaCQkMSgpO1xuICAgICAgICB2YXIgbm90aWZ5ID0gaXNTcHlFbmFibGVkJCQxKCk7XG4gICAgICAgIHZhciBzdGFydFRpbWU7XG4gICAgICAgIGlmIChub3RpZnkgJiYgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gICAgICAgICAgICBzdGFydFRpbWUgPSBEYXRlLm5vdygpO1xuICAgICAgICAgICAgc3B5UmVwb3J0U3RhcnQkJDEoe1xuICAgICAgICAgICAgICAgIG5hbWU6IHRoaXMubmFtZSxcbiAgICAgICAgICAgICAgICB0eXBlOiBcInJlYWN0aW9uXCJcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2lzUnVubmluZyA9IHRydWU7XG4gICAgICAgIHZhciByZXN1bHQgPSB0cmFja0Rlcml2ZWRGdW5jdGlvbiQkMSh0aGlzLCBmbiwgdW5kZWZpbmVkKTtcbiAgICAgICAgdGhpcy5faXNSdW5uaW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2lzVHJhY2tQZW5kaW5nID0gZmFsc2U7XG4gICAgICAgIGlmICh0aGlzLmlzRGlzcG9zZWQpIHtcbiAgICAgICAgICAgIC8vIGRpc3Bvc2VkIGR1cmluZyBsYXN0IHJ1bi4gQ2xlYW4gdXAgZXZlcnl0aGluZyB0aGF0IHdhcyBib3VuZCBhZnRlciB0aGUgZGlzcG9zZSBjYWxsLlxuICAgICAgICAgICAgY2xlYXJPYnNlcnZpbmckJDEodGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzQ2F1Z2h0RXhjZXB0aW9uJCQxKHJlc3VsdCkpXG4gICAgICAgICAgICB0aGlzLnJlcG9ydEV4Y2VwdGlvbkluRGVyaXZhdGlvbihyZXN1bHQuY2F1c2UpO1xuICAgICAgICBpZiAobm90aWZ5ICYmIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xuICAgICAgICAgICAgc3B5UmVwb3J0RW5kJCQxKHtcbiAgICAgICAgICAgICAgICB0aW1lOiBEYXRlLm5vdygpIC0gc3RhcnRUaW1lXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbmRCYXRjaCQkMSgpO1xuICAgIH07XG4gICAgUmVhY3Rpb24kJDEucHJvdG90eXBlLnJlcG9ydEV4Y2VwdGlvbkluRGVyaXZhdGlvbiA9IGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICBpZiAodGhpcy5lcnJvckhhbmRsZXIpIHtcbiAgICAgICAgICAgIHRoaXMuZXJyb3JIYW5kbGVyKGVycm9yLCB0aGlzKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZ2xvYmFsU3RhdGUkJDEuZGlzYWJsZUVycm9yQm91bmRhcmllcylcbiAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICB2YXIgbWVzc2FnZSA9IFwiW21vYnhdIEVuY291bnRlcmVkIGFuIHVuY2F1Z2h0IGV4Y2VwdGlvbiB0aGF0IHdhcyB0aHJvd24gYnkgYSByZWFjdGlvbiBvciBvYnNlcnZlciBjb21wb25lbnQsIGluOiAnXCIgKyB0aGlzICsgXCInXCI7XG4gICAgICAgIGlmIChnbG9iYWxTdGF0ZSQkMS5zdXBwcmVzc1JlYWN0aW9uRXJyb3JzKSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oXCJbbW9ieF0gKGVycm9yIGluIHJlYWN0aW9uICdcIiArIHRoaXMubmFtZSArIFwiJyBzdXBwcmVzc2VkLCBmaXggZXJyb3Igb2YgY2F1c2luZyBhY3Rpb24gYmVsb3cpXCIpOyAvLyBwcmV0dGllci1pZ25vcmVcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IobWVzc2FnZSwgZXJyb3IpO1xuICAgICAgICAgICAgLyoqIElmIGRlYnVnZ2luZyBicm91Z2h0IHlvdSBoZXJlLCBwbGVhc2UsIHJlYWQgdGhlIGFib3ZlIG1lc3NhZ2UgOi0pLiBUbnghICovXG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzU3B5RW5hYmxlZCQkMSgpKSB7XG4gICAgICAgICAgICBzcHlSZXBvcnQkJDEoe1xuICAgICAgICAgICAgICAgIHR5cGU6IFwiZXJyb3JcIixcbiAgICAgICAgICAgICAgICBuYW1lOiB0aGlzLm5hbWUsXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogbWVzc2FnZSxcbiAgICAgICAgICAgICAgICBlcnJvcjogXCJcIiArIGVycm9yXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBnbG9iYWxTdGF0ZSQkMS5nbG9iYWxSZWFjdGlvbkVycm9ySGFuZGxlcnMuZm9yRWFjaChmdW5jdGlvbiAoZikgeyByZXR1cm4gZihlcnJvciwgX3RoaXMpOyB9KTtcbiAgICB9O1xuICAgIFJlYWN0aW9uJCQxLnByb3RvdHlwZS5kaXNwb3NlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIXRoaXMuaXNEaXNwb3NlZCkge1xuICAgICAgICAgICAgdGhpcy5pc0Rpc3Bvc2VkID0gdHJ1ZTtcbiAgICAgICAgICAgIGlmICghdGhpcy5faXNSdW5uaW5nKSB7XG4gICAgICAgICAgICAgICAgLy8gaWYgZGlzcG9zZWQgd2hpbGUgcnVubmluZywgY2xlYW4gdXAgbGF0ZXIuIE1heWJlIG5vdCBvcHRpbWFsLCBidXQgcmFyZSBjYXNlXG4gICAgICAgICAgICAgICAgc3RhcnRCYXRjaCQkMSgpO1xuICAgICAgICAgICAgICAgIGNsZWFyT2JzZXJ2aW5nJCQxKHRoaXMpO1xuICAgICAgICAgICAgICAgIGVuZEJhdGNoJCQxKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFJlYWN0aW9uJCQxLnByb3RvdHlwZS5nZXREaXNwb3NlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHIgPSB0aGlzLmRpc3Bvc2UuYmluZCh0aGlzKTtcbiAgICAgICAgclskbW9ieCQkMV0gPSB0aGlzO1xuICAgICAgICByZXR1cm4gcjtcbiAgICB9O1xuICAgIFJlYWN0aW9uJCQxLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIFwiUmVhY3Rpb25bXCIgKyB0aGlzLm5hbWUgKyBcIl1cIjtcbiAgICB9O1xuICAgIFJlYWN0aW9uJCQxLnByb3RvdHlwZS50cmFjZSA9IGZ1bmN0aW9uIChlbnRlckJyZWFrUG9pbnQpIHtcbiAgICAgICAgaWYgKGVudGVyQnJlYWtQb2ludCA9PT0gdm9pZCAwKSB7IGVudGVyQnJlYWtQb2ludCA9IGZhbHNlOyB9XG4gICAgICAgIHRyYWNlJCQxKHRoaXMsIGVudGVyQnJlYWtQb2ludCk7XG4gICAgfTtcbiAgICByZXR1cm4gUmVhY3Rpb24kJDE7XG59KCkpO1xuZnVuY3Rpb24gb25SZWFjdGlvbkVycm9yJCQxKGhhbmRsZXIpIHtcbiAgICBnbG9iYWxTdGF0ZSQkMS5nbG9iYWxSZWFjdGlvbkVycm9ySGFuZGxlcnMucHVzaChoYW5kbGVyKTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgaWR4ID0gZ2xvYmFsU3RhdGUkJDEuZ2xvYmFsUmVhY3Rpb25FcnJvckhhbmRsZXJzLmluZGV4T2YoaGFuZGxlcik7XG4gICAgICAgIGlmIChpZHggPj0gMClcbiAgICAgICAgICAgIGdsb2JhbFN0YXRlJCQxLmdsb2JhbFJlYWN0aW9uRXJyb3JIYW5kbGVycy5zcGxpY2UoaWR4LCAxKTtcbiAgICB9O1xufVxuLyoqXG4gKiBNYWdpYyBudW1iZXIgYWxlcnQhXG4gKiBEZWZpbmVzIHdpdGhpbiBob3cgbWFueSB0aW1lcyBhIHJlYWN0aW9uIGlzIGFsbG93ZWQgdG8gcmUtdHJpZ2dlciBpdHNlbGZcbiAqIHVudGlsIGl0IGlzIGFzc3VtZWQgdGhhdCB0aGlzIGlzIGdvbm5hIGJlIGEgbmV2ZXIgZW5kaW5nIGxvb3AuLi5cbiAqL1xudmFyIE1BWF9SRUFDVElPTl9JVEVSQVRJT05TID0gMTAwO1xudmFyIHJlYWN0aW9uU2NoZWR1bGVyID0gZnVuY3Rpb24gKGYpIHsgcmV0dXJuIGYoKTsgfTtcbmZ1bmN0aW9uIHJ1blJlYWN0aW9ucyQkMSgpIHtcbiAgICAvLyBUcmFtcG9saW5pbmcsIGlmIHJ1blJlYWN0aW9ucyBhcmUgYWxyZWFkeSBydW5uaW5nLCBuZXcgcmVhY3Rpb25zIHdpbGwgYmUgcGlja2VkIHVwXG4gICAgaWYgKGdsb2JhbFN0YXRlJCQxLmluQmF0Y2ggPiAwIHx8IGdsb2JhbFN0YXRlJCQxLmlzUnVubmluZ1JlYWN0aW9ucylcbiAgICAgICAgcmV0dXJuO1xuICAgIHJlYWN0aW9uU2NoZWR1bGVyKHJ1blJlYWN0aW9uc0hlbHBlcik7XG59XG5mdW5jdGlvbiBydW5SZWFjdGlvbnNIZWxwZXIoKSB7XG4gICAgZ2xvYmFsU3RhdGUkJDEuaXNSdW5uaW5nUmVhY3Rpb25zID0gdHJ1ZTtcbiAgICB2YXIgYWxsUmVhY3Rpb25zID0gZ2xvYmFsU3RhdGUkJDEucGVuZGluZ1JlYWN0aW9ucztcbiAgICB2YXIgaXRlcmF0aW9ucyA9IDA7XG4gICAgLy8gV2hpbGUgcnVubmluZyByZWFjdGlvbnMsIG5ldyByZWFjdGlvbnMgbWlnaHQgYmUgdHJpZ2dlcmVkLlxuICAgIC8vIEhlbmNlIHdlIHdvcmsgd2l0aCB0d28gdmFyaWFibGVzIGFuZCBjaGVjayB3aGV0aGVyXG4gICAgLy8gd2UgY29udmVyZ2UgdG8gbm8gcmVtYWluaW5nIHJlYWN0aW9ucyBhZnRlciBhIHdoaWxlLlxuICAgIHdoaWxlIChhbGxSZWFjdGlvbnMubGVuZ3RoID4gMCkge1xuICAgICAgICBpZiAoKytpdGVyYXRpb25zID09PSBNQVhfUkVBQ1RJT05fSVRFUkFUSU9OUykge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIlJlYWN0aW9uIGRvZXNuJ3QgY29udmVyZ2UgdG8gYSBzdGFibGUgc3RhdGUgYWZ0ZXIgXCIgKyBNQVhfUkVBQ1RJT05fSVRFUkFUSU9OUyArIFwiIGl0ZXJhdGlvbnMuXCIgK1xuICAgICAgICAgICAgICAgIChcIiBQcm9iYWJseSB0aGVyZSBpcyBhIGN5Y2xlIGluIHRoZSByZWFjdGl2ZSBmdW5jdGlvbjogXCIgKyBhbGxSZWFjdGlvbnNbMF0pKTtcbiAgICAgICAgICAgIGFsbFJlYWN0aW9ucy5zcGxpY2UoMCk7IC8vIGNsZWFyIHJlYWN0aW9uc1xuICAgICAgICB9XG4gICAgICAgIHZhciByZW1haW5pbmdSZWFjdGlvbnMgPSBhbGxSZWFjdGlvbnMuc3BsaWNlKDApO1xuICAgICAgICBmb3IgKHZhciBpID0gMCwgbCA9IHJlbWFpbmluZ1JlYWN0aW9ucy5sZW5ndGg7IGkgPCBsOyBpKyspXG4gICAgICAgICAgICByZW1haW5pbmdSZWFjdGlvbnNbaV0ucnVuUmVhY3Rpb24oKTtcbiAgICB9XG4gICAgZ2xvYmFsU3RhdGUkJDEuaXNSdW5uaW5nUmVhY3Rpb25zID0gZmFsc2U7XG59XG52YXIgaXNSZWFjdGlvbiQkMSA9IGNyZWF0ZUluc3RhbmNlb2ZQcmVkaWNhdGUkJDEoXCJSZWFjdGlvblwiLCBSZWFjdGlvbiQkMSk7XG5mdW5jdGlvbiBzZXRSZWFjdGlvblNjaGVkdWxlciQkMShmbikge1xuICAgIHZhciBiYXNlU2NoZWR1bGVyID0gcmVhY3Rpb25TY2hlZHVsZXI7XG4gICAgcmVhY3Rpb25TY2hlZHVsZXIgPSBmdW5jdGlvbiAoZikgeyByZXR1cm4gZm4oZnVuY3Rpb24gKCkgeyByZXR1cm4gYmFzZVNjaGVkdWxlcihmKTsgfSk7IH07XG59XG5cbmZ1bmN0aW9uIGlzU3B5RW5hYmxlZCQkMSgpIHtcbiAgICByZXR1cm4gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiICYmICEhZ2xvYmFsU3RhdGUkJDEuc3B5TGlzdGVuZXJzLmxlbmd0aDtcbn1cbmZ1bmN0aW9uIHNweVJlcG9ydCQkMShldmVudCkge1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gXCJwcm9kdWN0aW9uXCIpXG4gICAgICAgIHJldHVybjsgLy8gZGVhZCBjb2RlIGVsaW1pbmF0aW9uIGNhbiBkbyB0aGUgcmVzdFxuICAgIGlmICghZ2xvYmFsU3RhdGUkJDEuc3B5TGlzdGVuZXJzLmxlbmd0aClcbiAgICAgICAgcmV0dXJuO1xuICAgIHZhciBsaXN0ZW5lcnMgPSBnbG9iYWxTdGF0ZSQkMS5zcHlMaXN0ZW5lcnM7XG4gICAgZm9yICh2YXIgaSA9IDAsIGwgPSBsaXN0ZW5lcnMubGVuZ3RoOyBpIDwgbDsgaSsrKVxuICAgICAgICBsaXN0ZW5lcnNbaV0oZXZlbnQpO1xufVxuZnVuY3Rpb24gc3B5UmVwb3J0U3RhcnQkJDEoZXZlbnQpIHtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09IFwicHJvZHVjdGlvblwiKVxuICAgICAgICByZXR1cm47XG4gICAgdmFyIGNoYW5nZSA9IF9fYXNzaWduKHt9LCBldmVudCwgeyBzcHlSZXBvcnRTdGFydDogdHJ1ZSB9KTtcbiAgICBzcHlSZXBvcnQkJDEoY2hhbmdlKTtcbn1cbnZhciBFTkRfRVZFTlQgPSB7IHNweVJlcG9ydEVuZDogdHJ1ZSB9O1xuZnVuY3Rpb24gc3B5UmVwb3J0RW5kJCQxKGNoYW5nZSkge1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gXCJwcm9kdWN0aW9uXCIpXG4gICAgICAgIHJldHVybjtcbiAgICBpZiAoY2hhbmdlKVxuICAgICAgICBzcHlSZXBvcnQkJDEoX19hc3NpZ24oe30sIGNoYW5nZSwgeyBzcHlSZXBvcnRFbmQ6IHRydWUgfSkpO1xuICAgIGVsc2VcbiAgICAgICAgc3B5UmVwb3J0JCQxKEVORF9FVkVOVCk7XG59XG5mdW5jdGlvbiBzcHkkJDEobGlzdGVuZXIpIHtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09IFwicHJvZHVjdGlvblwiKSB7XG4gICAgICAgIGNvbnNvbGUud2FybihcIlttb2J4LnNweV0gSXMgYSBuby1vcCBpbiBwcm9kdWN0aW9uIGJ1aWxkc1wiKTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHsgfTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGdsb2JhbFN0YXRlJCQxLnNweUxpc3RlbmVycy5wdXNoKGxpc3RlbmVyKTtcbiAgICAgICAgcmV0dXJuIG9uY2UkJDEoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgZ2xvYmFsU3RhdGUkJDEuc3B5TGlzdGVuZXJzID0gZ2xvYmFsU3RhdGUkJDEuc3B5TGlzdGVuZXJzLmZpbHRlcihmdW5jdGlvbiAobCkgeyByZXR1cm4gbCAhPT0gbGlzdGVuZXI7IH0pO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRvbnRSZWFzc2lnbkZpZWxkcygpIHtcbiAgICBmYWlsJCQxKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiAmJiBcIkBhY3Rpb24gZmllbGRzIGFyZSBub3QgcmVhc3NpZ25hYmxlXCIpO1xufVxuZnVuY3Rpb24gbmFtZWRBY3Rpb25EZWNvcmF0b3IkJDEobmFtZSkge1xuICAgIHJldHVybiBmdW5jdGlvbiAodGFyZ2V0LCBwcm9wLCBkZXNjcmlwdG9yKSB7XG4gICAgICAgIGlmIChkZXNjcmlwdG9yKSB7XG4gICAgICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiICYmIGRlc2NyaXB0b3IuZ2V0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFpbCQkMShcIkBhY3Rpb24gY2Fubm90IGJlIHVzZWQgd2l0aCBnZXR0ZXJzXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gYmFiZWwgLyB0eXBlc2NyaXB0XG4gICAgICAgICAgICAvLyBAYWN0aW9uIG1ldGhvZCgpIHsgfVxuICAgICAgICAgICAgaWYgKGRlc2NyaXB0b3IudmFsdWUpIHtcbiAgICAgICAgICAgICAgICAvLyB0eXBlc2NyaXB0XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGNyZWF0ZUFjdGlvbiQkMShuYW1lLCBkZXNjcmlwdG9yLnZhbHVlKSxcbiAgICAgICAgICAgICAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgd3JpdGFibGU6IHRydWUgLy8gZm9yIHR5cGVzY3JpcHQsIHRoaXMgbXVzdCBiZSB3cml0YWJsZSwgb3RoZXJ3aXNlIGl0IGNhbm5vdCBpbmhlcml0IDovIChzZWUgaW5oZXJpdGFibGUgYWN0aW9ucyB0ZXN0KVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBiYWJlbCBvbmx5OiBAYWN0aW9uIG1ldGhvZCA9ICgpID0+IHt9XG4gICAgICAgICAgICB2YXIgaW5pdGlhbGl6ZXJfMSA9IGRlc2NyaXB0b3IuaW5pdGlhbGl6ZXI7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBpbml0aWFsaXplcjogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBOLkI6IHdlIGNhbid0IGltbWVkaWF0ZWx5IGludm9rZSBpbml0aWFsaXplcjsgdGhpcyB3b3VsZCBiZSB3cm9uZ1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY3JlYXRlQWN0aW9uJCQxKG5hbWUsIGluaXRpYWxpemVyXzEuY2FsbCh0aGlzKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICAvLyBib3VuZCBpbnN0YW5jZSBtZXRob2RzXG4gICAgICAgIHJldHVybiBhY3Rpb25GaWVsZERlY29yYXRvciQkMShuYW1lKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH07XG59XG5mdW5jdGlvbiBhY3Rpb25GaWVsZERlY29yYXRvciQkMShuYW1lKSB7XG4gICAgLy8gU2ltcGxlIHByb3BlcnR5IHRoYXQgd3JpdGVzIG9uIGZpcnN0IGludm9jYXRpb24gdG8gdGhlIGN1cnJlbnQgaW5zdGFuY2VcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwgcHJvcCwgZGVzY3JpcHRvcikge1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBwcm9wLCB7XG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICBhZGRIaWRkZW5Qcm9wJCQxKHRoaXMsIHByb3AsIGFjdGlvbiQkMShuYW1lLCB2YWx1ZSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xufVxuZnVuY3Rpb24gYm91bmRBY3Rpb25EZWNvcmF0b3IkJDEodGFyZ2V0LCBwcm9wZXJ0eU5hbWUsIGRlc2NyaXB0b3IsIGFwcGx5VG9JbnN0YW5jZSkge1xuICAgIGlmIChhcHBseVRvSW5zdGFuY2UgPT09IHRydWUpIHtcbiAgICAgICAgZGVmaW5lQm91bmRBY3Rpb24kJDEodGFyZ2V0LCBwcm9wZXJ0eU5hbWUsIGRlc2NyaXB0b3IudmFsdWUpO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgaWYgKGRlc2NyaXB0b3IpIHtcbiAgICAgICAgLy8gaWYgKGRlc2NyaXB0b3IudmFsdWUpXG4gICAgICAgIC8vIFR5cGVzY3JpcHQgLyBCYWJlbDogQGFjdGlvbi5ib3VuZCBtZXRob2QoKSB7IH1cbiAgICAgICAgLy8gYWxzbzogYmFiZWwgQGFjdGlvbi5ib3VuZCBtZXRob2QgPSAoKSA9PiB7fVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBkZWZpbmVCb3VuZEFjdGlvbiQkMSh0aGlzLCBwcm9wZXJ0eU5hbWUsIGRlc2NyaXB0b3IudmFsdWUgfHwgZGVzY3JpcHRvci5pbml0aWFsaXplci5jYWxsKHRoaXMpKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpc1twcm9wZXJ0eU5hbWVdO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZG9udFJlYXNzaWduRmllbGRzXG4gICAgICAgIH07XG4gICAgfVxuICAgIC8vIGZpZWxkIGRlY29yYXRvciBUeXBlc2NyaXB0IEBhY3Rpb24uYm91bmQgbWV0aG9kID0gKCkgPT4ge31cbiAgICByZXR1cm4ge1xuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2KSB7XG4gICAgICAgICAgICBkZWZpbmVCb3VuZEFjdGlvbiQkMSh0aGlzLCBwcm9wZXJ0eU5hbWUsIHYpO1xuICAgICAgICB9LFxuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICB9O1xufVxuXG52YXIgYWN0aW9uJCQxID0gZnVuY3Rpb24gYWN0aW9uJCQxKGFyZzEsIGFyZzIsIGFyZzMsIGFyZzQpIHtcbiAgICAvLyBhY3Rpb24oZm4oKSB7fSlcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSAmJiB0eXBlb2YgYXJnMSA9PT0gXCJmdW5jdGlvblwiKVxuICAgICAgICByZXR1cm4gY3JlYXRlQWN0aW9uJCQxKGFyZzEubmFtZSB8fCBcIjx1bm5hbWVkIGFjdGlvbj5cIiwgYXJnMSk7XG4gICAgLy8gYWN0aW9uKFwibmFtZVwiLCBmbigpIHt9KVxuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAyICYmIHR5cGVvZiBhcmcyID09PSBcImZ1bmN0aW9uXCIpXG4gICAgICAgIHJldHVybiBjcmVhdGVBY3Rpb24kJDEoYXJnMSwgYXJnMik7XG4gICAgLy8gQGFjdGlvbihcIm5hbWVcIikgZm4oKSB7fVxuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxICYmIHR5cGVvZiBhcmcxID09PSBcInN0cmluZ1wiKVxuICAgICAgICByZXR1cm4gbmFtZWRBY3Rpb25EZWNvcmF0b3IkJDEoYXJnMSk7XG4gICAgLy8gQGFjdGlvbiBmbigpIHt9XG4gICAgaWYgKGFyZzQgPT09IHRydWUpIHtcbiAgICAgICAgLy8gYXBwbHkgdG8gaW5zdGFuY2UgaW1tZWRpYXRlbHlcbiAgICAgICAgYWRkSGlkZGVuUHJvcCQkMShhcmcxLCBhcmcyLCBjcmVhdGVBY3Rpb24kJDEoYXJnMS5uYW1lIHx8IGFyZzIsIGFyZzMudmFsdWUsIHRoaXMpKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiBuYW1lZEFjdGlvbkRlY29yYXRvciQkMShhcmcyKS5hcHBseShudWxsLCBhcmd1bWVudHMpO1xuICAgIH1cbn07XG5hY3Rpb24kJDEuYm91bmQgPSBib3VuZEFjdGlvbkRlY29yYXRvciQkMTtcbmZ1bmN0aW9uIHJ1bkluQWN0aW9uJCQxKGFyZzEsIGFyZzIpIHtcbiAgICB2YXIgYWN0aW9uTmFtZSA9IHR5cGVvZiBhcmcxID09PSBcInN0cmluZ1wiID8gYXJnMSA6IGFyZzEubmFtZSB8fCBcIjx1bm5hbWVkIGFjdGlvbj5cIjtcbiAgICB2YXIgZm4gPSB0eXBlb2YgYXJnMSA9PT0gXCJmdW5jdGlvblwiID8gYXJnMSA6IGFyZzI7XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xuICAgICAgICBpbnZhcmlhbnQkJDEodHlwZW9mIGZuID09PSBcImZ1bmN0aW9uXCIgJiYgZm4ubGVuZ3RoID09PSAwLCBcImBydW5JbkFjdGlvbmAgZXhwZWN0cyBhIGZ1bmN0aW9uIHdpdGhvdXQgYXJndW1lbnRzXCIpO1xuICAgICAgICBpZiAodHlwZW9mIGFjdGlvbk5hbWUgIT09IFwic3RyaW5nXCIgfHwgIWFjdGlvbk5hbWUpXG4gICAgICAgICAgICBmYWlsJCQxKFwiYWN0aW9ucyBzaG91bGQgaGF2ZSB2YWxpZCBuYW1lcywgZ290OiAnXCIgKyBhY3Rpb25OYW1lICsgXCInXCIpO1xuICAgIH1cbiAgICByZXR1cm4gZXhlY3V0ZUFjdGlvbiQkMShhY3Rpb25OYW1lLCBmbiwgdGhpcywgdW5kZWZpbmVkKTtcbn1cbmZ1bmN0aW9uIGlzQWN0aW9uJCQxKHRoaW5nKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB0aGluZyA9PT0gXCJmdW5jdGlvblwiICYmIHRoaW5nLmlzTW9ieEFjdGlvbiA9PT0gdHJ1ZTtcbn1cbmZ1bmN0aW9uIGRlZmluZUJvdW5kQWN0aW9uJCQxKHRhcmdldCwgcHJvcGVydHlOYW1lLCBmbikge1xuICAgIGFkZEhpZGRlblByb3AkJDEodGFyZ2V0LCBwcm9wZXJ0eU5hbWUsIGNyZWF0ZUFjdGlvbiQkMShwcm9wZXJ0eU5hbWUsIGZuLmJpbmQodGFyZ2V0KSkpO1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBuYW1lZCByZWFjdGl2ZSB2aWV3IGFuZCBrZWVwcyBpdCBhbGl2ZSwgc28gdGhhdCB0aGUgdmlldyBpcyBhbHdheXNcbiAqIHVwZGF0ZWQgaWYgb25lIG9mIHRoZSBkZXBlbmRlbmNpZXMgY2hhbmdlcywgZXZlbiB3aGVuIHRoZSB2aWV3IGlzIG5vdCBmdXJ0aGVyIHVzZWQgYnkgc29tZXRoaW5nIGVsc2UuXG4gKiBAcGFyYW0gdmlldyBUaGUgcmVhY3RpdmUgdmlld1xuICogQHJldHVybnMgZGlzcG9zZXIgZnVuY3Rpb24sIHdoaWNoIGNhbiBiZSB1c2VkIHRvIHN0b3AgdGhlIHZpZXcgZnJvbSBiZWluZyB1cGRhdGVkIGluIHRoZSBmdXR1cmUuXG4gKi9cbmZ1bmN0aW9uIGF1dG9ydW4kJDEodmlldywgb3B0cykge1xuICAgIGlmIChvcHRzID09PSB2b2lkIDApIHsgb3B0cyA9IEVNUFRZX09CSkVDVCQkMTsgfVxuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgICAgICAgaW52YXJpYW50JCQxKHR5cGVvZiB2aWV3ID09PSBcImZ1bmN0aW9uXCIsIFwiQXV0b3J1biBleHBlY3RzIGEgZnVuY3Rpb24gYXMgZmlyc3QgYXJndW1lbnRcIik7XG4gICAgICAgIGludmFyaWFudCQkMShpc0FjdGlvbiQkMSh2aWV3KSA9PT0gZmFsc2UsIFwiQXV0b3J1biBkb2VzIG5vdCBhY2NlcHQgYWN0aW9ucyBzaW5jZSBhY3Rpb25zIGFyZSB1bnRyYWNrYWJsZVwiKTtcbiAgICB9XG4gICAgdmFyIG5hbWUgPSAob3B0cyAmJiBvcHRzLm5hbWUpIHx8IHZpZXcubmFtZSB8fCBcIkF1dG9ydW5AXCIgKyBnZXROZXh0SWQkJDEoKTtcbiAgICB2YXIgcnVuU3luYyA9ICFvcHRzLnNjaGVkdWxlciAmJiAhb3B0cy5kZWxheTtcbiAgICB2YXIgcmVhY3Rpb24kJDE7XG4gICAgaWYgKHJ1blN5bmMpIHtcbiAgICAgICAgLy8gbm9ybWFsIGF1dG9ydW5cbiAgICAgICAgcmVhY3Rpb24kJDEgPSBuZXcgUmVhY3Rpb24kJDEobmFtZSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy50cmFjayhyZWFjdGlvblJ1bm5lcik7XG4gICAgICAgIH0sIG9wdHMub25FcnJvcik7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICB2YXIgc2NoZWR1bGVyXzEgPSBjcmVhdGVTY2hlZHVsZXJGcm9tT3B0aW9ucyhvcHRzKTtcbiAgICAgICAgLy8gZGVib3VuY2VkIGF1dG9ydW5cbiAgICAgICAgdmFyIGlzU2NoZWR1bGVkXzEgPSBmYWxzZTtcbiAgICAgICAgcmVhY3Rpb24kJDEgPSBuZXcgUmVhY3Rpb24kJDEobmFtZSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKCFpc1NjaGVkdWxlZF8xKSB7XG4gICAgICAgICAgICAgICAgaXNTY2hlZHVsZWRfMSA9IHRydWU7XG4gICAgICAgICAgICAgICAgc2NoZWR1bGVyXzEoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBpc1NjaGVkdWxlZF8xID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIGlmICghcmVhY3Rpb24kJDEuaXNEaXNwb3NlZClcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlYWN0aW9uJCQxLnRyYWNrKHJlYWN0aW9uUnVubmVyKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgb3B0cy5vbkVycm9yKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gcmVhY3Rpb25SdW5uZXIoKSB7XG4gICAgICAgIHZpZXcocmVhY3Rpb24kJDEpO1xuICAgIH1cbiAgICByZWFjdGlvbiQkMS5zY2hlZHVsZSgpO1xuICAgIHJldHVybiByZWFjdGlvbiQkMS5nZXREaXNwb3NlcigpO1xufVxudmFyIHJ1biA9IGZ1bmN0aW9uIChmKSB7IHJldHVybiBmKCk7IH07XG5mdW5jdGlvbiBjcmVhdGVTY2hlZHVsZXJGcm9tT3B0aW9ucyhvcHRzKSB7XG4gICAgcmV0dXJuIG9wdHMuc2NoZWR1bGVyXG4gICAgICAgID8gb3B0cy5zY2hlZHVsZXJcbiAgICAgICAgOiBvcHRzLmRlbGF5XG4gICAgICAgICAgICA/IGZ1bmN0aW9uIChmKSB7IHJldHVybiBzZXRUaW1lb3V0KGYsIG9wdHMuZGVsYXkpOyB9XG4gICAgICAgICAgICA6IHJ1bjtcbn1cbmZ1bmN0aW9uIHJlYWN0aW9uJCQxKGV4cHJlc3Npb24sIGVmZmVjdCwgb3B0cykge1xuICAgIGlmIChvcHRzID09PSB2b2lkIDApIHsgb3B0cyA9IEVNUFRZX09CSkVDVCQkMTsgfVxuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIHtcbiAgICAgICAgaW52YXJpYW50JCQxKHR5cGVvZiBleHByZXNzaW9uID09PSBcImZ1bmN0aW9uXCIsIFwiRmlyc3QgYXJndW1lbnQgdG8gcmVhY3Rpb24gc2hvdWxkIGJlIGEgZnVuY3Rpb25cIik7XG4gICAgICAgIGludmFyaWFudCQkMSh0eXBlb2Ygb3B0cyA9PT0gXCJvYmplY3RcIiwgXCJUaGlyZCBhcmd1bWVudCBvZiByZWFjdGlvbnMgc2hvdWxkIGJlIGFuIG9iamVjdFwiKTtcbiAgICB9XG4gICAgdmFyIG5hbWUgPSBvcHRzLm5hbWUgfHwgXCJSZWFjdGlvbkBcIiArIGdldE5leHRJZCQkMSgpO1xuICAgIHZhciBlZmZlY3RBY3Rpb24gPSBhY3Rpb24kJDEobmFtZSwgb3B0cy5vbkVycm9yID8gd3JhcEVycm9ySGFuZGxlcihvcHRzLm9uRXJyb3IsIGVmZmVjdCkgOiBlZmZlY3QpO1xuICAgIHZhciBydW5TeW5jID0gIW9wdHMuc2NoZWR1bGVyICYmICFvcHRzLmRlbGF5O1xuICAgIHZhciBzY2hlZHVsZXIgPSBjcmVhdGVTY2hlZHVsZXJGcm9tT3B0aW9ucyhvcHRzKTtcbiAgICB2YXIgZmlyc3RUaW1lID0gdHJ1ZTtcbiAgICB2YXIgaXNTY2hlZHVsZWQgPSBmYWxzZTtcbiAgICB2YXIgdmFsdWU7XG4gICAgdmFyIGVxdWFscyA9IG9wdHMuY29tcGFyZVN0cnVjdHVyYWxcbiAgICAgICAgPyBjb21wYXJlciQkMS5zdHJ1Y3R1cmFsXG4gICAgICAgIDogb3B0cy5lcXVhbHMgfHwgY29tcGFyZXIkJDEuZGVmYXVsdDtcbiAgICB2YXIgciA9IG5ldyBSZWFjdGlvbiQkMShuYW1lLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmIChmaXJzdFRpbWUgfHwgcnVuU3luYykge1xuICAgICAgICAgICAgcmVhY3Rpb25SdW5uZXIoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICghaXNTY2hlZHVsZWQpIHtcbiAgICAgICAgICAgIGlzU2NoZWR1bGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHNjaGVkdWxlcihyZWFjdGlvblJ1bm5lcik7XG4gICAgICAgIH1cbiAgICB9LCBvcHRzLm9uRXJyb3IpO1xuICAgIGZ1bmN0aW9uIHJlYWN0aW9uUnVubmVyKCkge1xuICAgICAgICBpc1NjaGVkdWxlZCA9IGZhbHNlOyAvLyBROiBtb3ZlIGludG8gcmVhY3Rpb24gcnVubmVyP1xuICAgICAgICBpZiAoci5pc0Rpc3Bvc2VkKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB2YXIgY2hhbmdlZCA9IGZhbHNlO1xuICAgICAgICByLnRyYWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBuZXh0VmFsdWUgPSBleHByZXNzaW9uKHIpO1xuICAgICAgICAgICAgY2hhbmdlZCA9IGZpcnN0VGltZSB8fCAhZXF1YWxzKHZhbHVlLCBuZXh0VmFsdWUpO1xuICAgICAgICAgICAgdmFsdWUgPSBuZXh0VmFsdWU7XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoZmlyc3RUaW1lICYmIG9wdHMuZmlyZUltbWVkaWF0ZWx5KVxuICAgICAgICAgICAgZWZmZWN0QWN0aW9uKHZhbHVlLCByKTtcbiAgICAgICAgaWYgKCFmaXJzdFRpbWUgJiYgY2hhbmdlZCA9PT0gdHJ1ZSlcbiAgICAgICAgICAgIGVmZmVjdEFjdGlvbih2YWx1ZSwgcik7XG4gICAgICAgIGlmIChmaXJzdFRpbWUpXG4gICAgICAgICAgICBmaXJzdFRpbWUgPSBmYWxzZTtcbiAgICB9XG4gICAgci5zY2hlZHVsZSgpO1xuICAgIHJldHVybiByLmdldERpc3Bvc2VyKCk7XG59XG5mdW5jdGlvbiB3cmFwRXJyb3JIYW5kbGVyKGVycm9ySGFuZGxlciwgYmFzZUZuKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJldHVybiBiYXNlRm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgZXJyb3JIYW5kbGVyLmNhbGwodGhpcywgZSk7XG4gICAgICAgIH1cbiAgICB9O1xufVxuXG5mdW5jdGlvbiBvbkJlY29tZU9ic2VydmVkJCQxKHRoaW5nLCBhcmcyLCBhcmczKSB7XG4gICAgcmV0dXJuIGludGVyY2VwdEhvb2soXCJvbkJlY29tZU9ic2VydmVkXCIsIHRoaW5nLCBhcmcyLCBhcmczKTtcbn1cbmZ1bmN0aW9uIG9uQmVjb21lVW5vYnNlcnZlZCQkMSh0aGluZywgYXJnMiwgYXJnMykge1xuICAgIHJldHVybiBpbnRlcmNlcHRIb29rKFwib25CZWNvbWVVbm9ic2VydmVkXCIsIHRoaW5nLCBhcmcyLCBhcmczKTtcbn1cbmZ1bmN0aW9uIGludGVyY2VwdEhvb2soaG9vaywgdGhpbmcsIGFyZzIsIGFyZzMpIHtcbiAgICB2YXIgYXRvbSA9IHR5cGVvZiBhcmcyID09PSBcInN0cmluZ1wiID8gZ2V0QXRvbSQkMSh0aGluZywgYXJnMikgOiBnZXRBdG9tJCQxKHRoaW5nKTtcbiAgICB2YXIgY2IgPSB0eXBlb2YgYXJnMiA9PT0gXCJzdHJpbmdcIiA/IGFyZzMgOiBhcmcyO1xuICAgIHZhciBsaXN0ZW5lcnNLZXkgPSBob29rICsgXCJMaXN0ZW5lcnNcIjtcbiAgICBpZiAoYXRvbVtsaXN0ZW5lcnNLZXldKSB7XG4gICAgICAgIGF0b21bbGlzdGVuZXJzS2V5XS5hZGQoY2IpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgYXRvbVtsaXN0ZW5lcnNLZXldID0gbmV3IFNldChbY2JdKTtcbiAgICB9XG4gICAgdmFyIG9yaWcgPSBhdG9tW2hvb2tdO1xuICAgIGlmICh0eXBlb2Ygb3JpZyAhPT0gXCJmdW5jdGlvblwiKVxuICAgICAgICByZXR1cm4gZmFpbCQkMShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgJiYgXCJOb3QgYW4gYXRvbSB0aGF0IGNhbiBiZSAodW4pb2JzZXJ2ZWRcIik7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGhvb2tMaXN0ZW5lcnMgPSBhdG9tW2xpc3RlbmVyc0tleV07XG4gICAgICAgIGlmIChob29rTGlzdGVuZXJzKSB7XG4gICAgICAgICAgICBob29rTGlzdGVuZXJzLmRlbGV0ZShjYik7XG4gICAgICAgICAgICBpZiAoaG9va0xpc3RlbmVycy5zaXplID09PSAwKSB7XG4gICAgICAgICAgICAgICAgZGVsZXRlIGF0b21bbGlzdGVuZXJzS2V5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG59XG5cbmZ1bmN0aW9uIGNvbmZpZ3VyZSQkMShvcHRpb25zKSB7XG4gICAgdmFyIGVuZm9yY2VBY3Rpb25zID0gb3B0aW9ucy5lbmZvcmNlQWN0aW9ucywgY29tcHV0ZWRSZXF1aXJlc1JlYWN0aW9uID0gb3B0aW9ucy5jb21wdXRlZFJlcXVpcmVzUmVhY3Rpb24sIGRpc2FibGVFcnJvckJvdW5kYXJpZXMgPSBvcHRpb25zLmRpc2FibGVFcnJvckJvdW5kYXJpZXMsIHJlYWN0aW9uU2NoZWR1bGVyID0gb3B0aW9ucy5yZWFjdGlvblNjaGVkdWxlcjtcbiAgICBpZiAob3B0aW9ucy5pc29sYXRlR2xvYmFsU3RhdGUgPT09IHRydWUpIHtcbiAgICAgICAgaXNvbGF0ZUdsb2JhbFN0YXRlJCQxKCk7XG4gICAgfVxuICAgIGlmIChlbmZvcmNlQWN0aW9ucyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmICh0eXBlb2YgZW5mb3JjZUFjdGlvbnMgPT09IFwiYm9vbGVhblwiIHx8IGVuZm9yY2VBY3Rpb25zID09PSBcInN0cmljdFwiKVxuICAgICAgICAgICAgZGVwcmVjYXRlZCQkMShcIkRlcHJlY2F0ZWQgdmFsdWUgZm9yICdlbmZvcmNlQWN0aW9ucycsIHVzZSAnZmFsc2UnID0+ICdcXFwibmV2ZXJcXFwiJywgJ3RydWUnID0+ICdcXFwib2JzZXJ2ZWRcXFwiJywgJ1xcXCJzdHJpY3RcXFwiJyA9PiBcXFwiJ2Fsd2F5cydcXFwiIGluc3RlYWRcIik7XG4gICAgICAgIHZhciBlYSA9IHZvaWQgMDtcbiAgICAgICAgc3dpdGNoIChlbmZvcmNlQWN0aW9ucykge1xuICAgICAgICAgICAgY2FzZSB0cnVlOlxuICAgICAgICAgICAgY2FzZSBcIm9ic2VydmVkXCI6XG4gICAgICAgICAgICAgICAgZWEgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBmYWxzZTpcbiAgICAgICAgICAgIGNhc2UgXCJuZXZlclwiOlxuICAgICAgICAgICAgICAgIGVhID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwic3RyaWN0XCI6XG4gICAgICAgICAgICBjYXNlIFwiYWx3YXlzXCI6XG4gICAgICAgICAgICAgICAgZWEgPSBcInN0cmljdFwiO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBmYWlsJCQxKFwiSW52YWxpZCB2YWx1ZSBmb3IgJ2VuZm9yY2VBY3Rpb25zJzogJ1wiICsgZW5mb3JjZUFjdGlvbnMgKyBcIicsIGV4cGVjdGVkICduZXZlcicsICdhbHdheXMnIG9yICdvYnNlcnZlZCdcIik7XG4gICAgICAgIH1cbiAgICAgICAgZ2xvYmFsU3RhdGUkJDEuZW5mb3JjZUFjdGlvbnMgPSBlYTtcbiAgICAgICAgZ2xvYmFsU3RhdGUkJDEuYWxsb3dTdGF0ZUNoYW5nZXMgPSBlYSA9PT0gdHJ1ZSB8fCBlYSA9PT0gXCJzdHJpY3RcIiA/IGZhbHNlIDogdHJ1ZTtcbiAgICB9XG4gICAgaWYgKGNvbXB1dGVkUmVxdWlyZXNSZWFjdGlvbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGdsb2JhbFN0YXRlJCQxLmNvbXB1dGVkUmVxdWlyZXNSZWFjdGlvbiA9ICEhY29tcHV0ZWRSZXF1aXJlc1JlYWN0aW9uO1xuICAgIH1cbiAgICBpZiAoZGlzYWJsZUVycm9yQm91bmRhcmllcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmIChkaXNhYmxlRXJyb3JCb3VuZGFyaWVzID09PSB0cnVlKVxuICAgICAgICAgICAgY29uc29sZS53YXJuKFwiV0FSTklORzogRGVidWcgZmVhdHVyZSBvbmx5LiBNb2JYIHdpbGwgTk9UIHJlY292ZXIgZnJvbSBlcnJvcnMgd2hlbiBgZGlzYWJsZUVycm9yQm91bmRhcmllc2AgaXMgZW5hYmxlZC5cIik7XG4gICAgICAgIGdsb2JhbFN0YXRlJCQxLmRpc2FibGVFcnJvckJvdW5kYXJpZXMgPSAhIWRpc2FibGVFcnJvckJvdW5kYXJpZXM7XG4gICAgfVxuICAgIGlmIChyZWFjdGlvblNjaGVkdWxlcikge1xuICAgICAgICBzZXRSZWFjdGlvblNjaGVkdWxlciQkMShyZWFjdGlvblNjaGVkdWxlcik7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkZWNvcmF0ZSQkMSh0aGluZywgZGVjb3JhdG9ycykge1xuICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiAmJlxuICAgICAgICBpbnZhcmlhbnQkJDEoaXNQbGFpbk9iamVjdCQkMShkZWNvcmF0b3JzKSwgXCJEZWNvcmF0b3JzIHNob3VsZCBiZSBhIGtleSB2YWx1ZSBtYXBcIik7XG4gICAgdmFyIHRhcmdldCA9IHR5cGVvZiB0aGluZyA9PT0gXCJmdW5jdGlvblwiID8gdGhpbmcucHJvdG90eXBlIDogdGhpbmc7XG4gICAgdmFyIF9sb29wXzEgPSBmdW5jdGlvbiAocHJvcCkge1xuICAgICAgICB2YXIgcHJvcGVydHlEZWNvcmF0b3JzID0gZGVjb3JhdG9yc1twcm9wXTtcbiAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHByb3BlcnR5RGVjb3JhdG9ycykpIHtcbiAgICAgICAgICAgIHByb3BlcnR5RGVjb3JhdG9ycyA9IFtwcm9wZXJ0eURlY29yYXRvcnNdO1xuICAgICAgICB9XG4gICAgICAgIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiAmJlxuICAgICAgICAgICAgaW52YXJpYW50JCQxKHByb3BlcnR5RGVjb3JhdG9ycy5ldmVyeShmdW5jdGlvbiAoZGVjb3JhdG9yKSB7IHJldHVybiB0eXBlb2YgZGVjb3JhdG9yID09PSBcImZ1bmN0aW9uXCI7IH0pLCBcIkRlY29yYXRlOiBleHBlY3RlZCBhIGRlY29yYXRvciBmdW5jdGlvbiBvciBhcnJheSBvZiBkZWNvcmF0b3IgZnVuY3Rpb25zIGZvciAnXCIgKyBwcm9wICsgXCInXCIpO1xuICAgICAgICB2YXIgZGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBwcm9wKTtcbiAgICAgICAgdmFyIG5ld0Rlc2NyaXB0b3IgPSBwcm9wZXJ0eURlY29yYXRvcnMucmVkdWNlKGZ1bmN0aW9uIChhY2NEZXNjcmlwdG9yLCBkZWNvcmF0b3IpIHsgcmV0dXJuIGRlY29yYXRvcih0YXJnZXQsIHByb3AsIGFjY0Rlc2NyaXB0b3IpOyB9LCBkZXNjcmlwdG9yKTtcbiAgICAgICAgaWYgKG5ld0Rlc2NyaXB0b3IpXG4gICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBwcm9wLCBuZXdEZXNjcmlwdG9yKTtcbiAgICB9O1xuICAgIGZvciAodmFyIHByb3AgaW4gZGVjb3JhdG9ycykge1xuICAgICAgICBfbG9vcF8xKHByb3ApO1xuICAgIH1cbiAgICByZXR1cm4gdGhpbmc7XG59XG5cbmZ1bmN0aW9uIGV4dGVuZE9ic2VydmFibGUkJDEodGFyZ2V0LCBwcm9wZXJ0aWVzLCBkZWNvcmF0b3JzLCBvcHRpb25zKSB7XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xuICAgICAgICBpbnZhcmlhbnQkJDEoYXJndW1lbnRzLmxlbmd0aCA+PSAyICYmIGFyZ3VtZW50cy5sZW5ndGggPD0gNCwgXCInZXh0ZW5kT2JzZXJ2YWJsZScgZXhwZWN0ZWQgMi00IGFyZ3VtZW50c1wiKTtcbiAgICAgICAgaW52YXJpYW50JCQxKHR5cGVvZiB0YXJnZXQgPT09IFwib2JqZWN0XCIsIFwiJ2V4dGVuZE9ic2VydmFibGUnIGV4cGVjdHMgYW4gb2JqZWN0IGFzIGZpcnN0IGFyZ3VtZW50XCIpO1xuICAgICAgICBpbnZhcmlhbnQkJDEoIWlzT2JzZXJ2YWJsZU1hcCQkMSh0YXJnZXQpLCBcIidleHRlbmRPYnNlcnZhYmxlJyBzaG91bGQgbm90IGJlIHVzZWQgb24gbWFwcywgdXNlIG1hcC5tZXJnZSBpbnN0ZWFkXCIpO1xuICAgIH1cbiAgICBvcHRpb25zID0gYXNDcmVhdGVPYnNlcnZhYmxlT3B0aW9ucyQkMShvcHRpb25zKTtcbiAgICB2YXIgZGVmYXVsdERlY29yYXRvciA9IGdldERlZmF1bHREZWNvcmF0b3JGcm9tT2JqZWN0T3B0aW9ucyQkMShvcHRpb25zKTtcbiAgICBpbml0aWFsaXplSW5zdGFuY2UkJDEodGFyZ2V0KTsgLy8gRml4ZXMgIzE3NDBcbiAgICBhc09ic2VydmFibGVPYmplY3QkJDEodGFyZ2V0LCBvcHRpb25zLm5hbWUsIGRlZmF1bHREZWNvcmF0b3IuZW5oYW5jZXIpOyAvLyBtYWtlIHN1cmUgb2JqZWN0IGlzIG9ic2VydmFibGUsIGV2ZW4gd2l0aG91dCBpbml0aWFsIHByb3BzXG4gICAgaWYgKHByb3BlcnRpZXMpXG4gICAgICAgIGV4dGVuZE9ic2VydmFibGVPYmplY3RXaXRoUHJvcGVydGllcyQkMSh0YXJnZXQsIHByb3BlcnRpZXMsIGRlY29yYXRvcnMsIGRlZmF1bHREZWNvcmF0b3IpO1xuICAgIHJldHVybiB0YXJnZXQ7XG59XG5mdW5jdGlvbiBnZXREZWZhdWx0RGVjb3JhdG9yRnJvbU9iamVjdE9wdGlvbnMkJDEob3B0aW9ucykge1xuICAgIHJldHVybiBvcHRpb25zLmRlZmF1bHREZWNvcmF0b3IgfHwgKG9wdGlvbnMuZGVlcCA9PT0gZmFsc2UgPyByZWZEZWNvcmF0b3IkJDEgOiBkZWVwRGVjb3JhdG9yJCQxKTtcbn1cbmZ1bmN0aW9uIGV4dGVuZE9ic2VydmFibGVPYmplY3RXaXRoUHJvcGVydGllcyQkMSh0YXJnZXQsIHByb3BlcnRpZXMsIGRlY29yYXRvcnMsIGRlZmF1bHREZWNvcmF0b3IpIHtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gICAgICAgIGludmFyaWFudCQkMSghaXNPYnNlcnZhYmxlJCQxKHByb3BlcnRpZXMpLCBcIkV4dGVuZGluZyBhbiBvYmplY3Qgd2l0aCBhbm90aGVyIG9ic2VydmFibGUgKG9iamVjdCkgaXMgbm90IHN1cHBvcnRlZC4gUGxlYXNlIGNvbnN0cnVjdCBhbiBleHBsaWNpdCBwcm9wZXJ0eW1hcCwgdXNpbmcgYHRvSlNgIGlmIG5lZWQuIFNlZSBpc3N1ZSAjNTQwXCIpO1xuICAgICAgICBpZiAoZGVjb3JhdG9ycylcbiAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiBkZWNvcmF0b3JzKVxuICAgICAgICAgICAgICAgIGlmICghKGtleSBpbiBwcm9wZXJ0aWVzKSlcbiAgICAgICAgICAgICAgICAgICAgZmFpbCQkMShcIlRyeWluZyB0byBkZWNsYXJlIGEgZGVjb3JhdG9yIGZvciB1bnNwZWNpZmllZCBwcm9wZXJ0eSAnXCIgKyBrZXkgKyBcIidcIik7XG4gICAgfVxuICAgIHN0YXJ0QmF0Y2gkJDEoKTtcbiAgICB0cnkge1xuICAgICAgICBmb3IgKHZhciBrZXkgaW4gcHJvcGVydGllcykge1xuICAgICAgICAgICAgdmFyIGRlc2NyaXB0b3IgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHByb3BlcnRpZXMsIGtleSk7XG4gICAgICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gICAgICAgICAgICAgICAgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpKVxuICAgICAgICAgICAgICAgICAgICBmYWlsJCQxKFwiJ2V4dGVuZE9ic2VydmFibGUnIGNhbiBvbmx5IGJlIHVzZWQgdG8gaW50cm9kdWNlIG5ldyBwcm9wZXJ0aWVzLiBVc2UgJ3NldCcgb3IgJ2RlY29yYXRlJyBpbnN0ZWFkLiBUaGUgcHJvcGVydHkgJ1wiICsga2V5ICsgXCInIGFscmVhZHkgZXhpc3RzIG9uICdcIiArIHRhcmdldCArIFwiJ1wiKTtcbiAgICAgICAgICAgICAgICBpZiAoaXNDb21wdXRlZCQkMShkZXNjcmlwdG9yLnZhbHVlKSlcbiAgICAgICAgICAgICAgICAgICAgZmFpbCQkMShcIlBhc3NpbmcgYSAnY29tcHV0ZWQnIGFzIGluaXRpYWwgcHJvcGVydHkgdmFsdWUgaXMgbm8gbG9uZ2VyIHN1cHBvcnRlZCBieSBleHRlbmRPYnNlcnZhYmxlLiBVc2UgYSBnZXR0ZXIgb3IgZGVjb3JhdG9yIGluc3RlYWRcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgZGVjb3JhdG9yID0gZGVjb3JhdG9ycyAmJiBrZXkgaW4gZGVjb3JhdG9yc1xuICAgICAgICAgICAgICAgID8gZGVjb3JhdG9yc1trZXldXG4gICAgICAgICAgICAgICAgOiBkZXNjcmlwdG9yLmdldFxuICAgICAgICAgICAgICAgICAgICA/IGNvbXB1dGVkRGVjb3JhdG9yJCQxXG4gICAgICAgICAgICAgICAgICAgIDogZGVmYXVsdERlY29yYXRvcjtcbiAgICAgICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgJiYgdHlwZW9mIGRlY29yYXRvciAhPT0gXCJmdW5jdGlvblwiKVxuICAgICAgICAgICAgICAgIGZhaWwkJDEoXCJOb3QgYSB2YWxpZCBkZWNvcmF0b3IgZm9yICdcIiArIGtleSArIFwiJywgZ290OiBcIiArIGRlY29yYXRvcik7XG4gICAgICAgICAgICB2YXIgcmVzdWx0RGVzY3JpcHRvciA9IGRlY29yYXRvcih0YXJnZXQsIGtleSwgZGVzY3JpcHRvciwgdHJ1ZSk7XG4gICAgICAgICAgICBpZiAocmVzdWx0RGVzY3JpcHRvciAvLyBvdGhlcndpc2UsIGFzc3VtZSBhbHJlYWR5IGFwcGxpZWQsIGR1ZSB0byBgYXBwbHlUb0luc3RhbmNlYFxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgcmVzdWx0RGVzY3JpcHRvcik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZmluYWxseSB7XG4gICAgICAgIGVuZEJhdGNoJCQxKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBnZXREZXBlbmRlbmN5VHJlZSQkMSh0aGluZywgcHJvcGVydHkpIHtcbiAgICByZXR1cm4gbm9kZVRvRGVwZW5kZW5jeVRyZWUoZ2V0QXRvbSQkMSh0aGluZywgcHJvcGVydHkpKTtcbn1cbmZ1bmN0aW9uIG5vZGVUb0RlcGVuZGVuY3lUcmVlKG5vZGUpIHtcbiAgICB2YXIgcmVzdWx0ID0ge1xuICAgICAgICBuYW1lOiBub2RlLm5hbWVcbiAgICB9O1xuICAgIGlmIChub2RlLm9ic2VydmluZyAmJiBub2RlLm9ic2VydmluZy5sZW5ndGggPiAwKVxuICAgICAgICByZXN1bHQuZGVwZW5kZW5jaWVzID0gdW5pcXVlJCQxKG5vZGUub2JzZXJ2aW5nKS5tYXAobm9kZVRvRGVwZW5kZW5jeVRyZWUpO1xuICAgIHJldHVybiByZXN1bHQ7XG59XG5mdW5jdGlvbiBnZXRPYnNlcnZlclRyZWUkJDEodGhpbmcsIHByb3BlcnR5KSB7XG4gICAgcmV0dXJuIG5vZGVUb09ic2VydmVyVHJlZShnZXRBdG9tJCQxKHRoaW5nLCBwcm9wZXJ0eSkpO1xufVxuZnVuY3Rpb24gbm9kZVRvT2JzZXJ2ZXJUcmVlKG5vZGUpIHtcbiAgICB2YXIgcmVzdWx0ID0ge1xuICAgICAgICBuYW1lOiBub2RlLm5hbWVcbiAgICB9O1xuICAgIGlmIChoYXNPYnNlcnZlcnMkJDEobm9kZSkpXG4gICAgICAgIHJlc3VsdC5vYnNlcnZlcnMgPSBBcnJheS5mcm9tKGdldE9ic2VydmVycyQkMShub2RlKSkubWFwKG5vZGVUb09ic2VydmVyVHJlZSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cblxudmFyIGdlbmVyYXRvcklkID0gMDtcbmZ1bmN0aW9uIGZsb3ckJDEoZ2VuZXJhdG9yKSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggIT09IDEpXG4gICAgICAgIGZhaWwkJDEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgJiYgXCJGbG93IGV4cGVjdHMgb25lIDEgYXJndW1lbnQgYW5kIGNhbm5vdCBiZSB1c2VkIGFzIGRlY29yYXRvclwiKTtcbiAgICB2YXIgbmFtZSA9IGdlbmVyYXRvci5uYW1lIHx8IFwiPHVubmFtZWQgZmxvdz5cIjtcbiAgICAvLyBJbXBsZW1lbnRhdGlvbiBiYXNlZCBvbiBodHRwczovL2dpdGh1Yi5jb20vdGovY28vYmxvYi9tYXN0ZXIvaW5kZXguanNcbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgY3R4ID0gdGhpcztcbiAgICAgICAgdmFyIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgICAgIHZhciBydW5JZCA9ICsrZ2VuZXJhdG9ySWQ7XG4gICAgICAgIHZhciBnZW4gPSBhY3Rpb24kJDEobmFtZSArIFwiIC0gcnVuaWQ6IFwiICsgcnVuSWQgKyBcIiAtIGluaXRcIiwgZ2VuZXJhdG9yKS5hcHBseShjdHgsIGFyZ3MpO1xuICAgICAgICB2YXIgcmVqZWN0b3I7XG4gICAgICAgIHZhciBwZW5kaW5nUHJvbWlzZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgdmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICB2YXIgc3RlcElkID0gMDtcbiAgICAgICAgICAgIHJlamVjdG9yID0gcmVqZWN0O1xuICAgICAgICAgICAgZnVuY3Rpb24gb25GdWxmaWxsZWQocmVzKSB7XG4gICAgICAgICAgICAgICAgcGVuZGluZ1Byb21pc2UgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgdmFyIHJldDtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICByZXQgPSBhY3Rpb24kJDEobmFtZSArIFwiIC0gcnVuaWQ6IFwiICsgcnVuSWQgKyBcIiAtIHlpZWxkIFwiICsgc3RlcElkKyssIGdlbi5uZXh0KS5jYWxsKGdlbiwgcmVzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbmV4dChyZXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZnVuY3Rpb24gb25SZWplY3RlZChlcnIpIHtcbiAgICAgICAgICAgICAgICBwZW5kaW5nUHJvbWlzZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICB2YXIgcmV0O1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIHJldCA9IGFjdGlvbiQkMShuYW1lICsgXCIgLSBydW5pZDogXCIgKyBydW5JZCArIFwiIC0geWllbGQgXCIgKyBzdGVwSWQrKywgZ2VuLnRocm93KS5jYWxsKGdlbiwgZXJyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbmV4dChyZXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZnVuY3Rpb24gbmV4dChyZXQpIHtcbiAgICAgICAgICAgICAgICBpZiAocmV0ICYmIHR5cGVvZiByZXQudGhlbiA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGFuIGFzeW5jIGl0ZXJhdG9yXG4gICAgICAgICAgICAgICAgICAgIHJldC50aGVuKG5leHQsIHJlamVjdCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHJldC5kb25lKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZShyZXQudmFsdWUpO1xuICAgICAgICAgICAgICAgIHBlbmRpbmdQcm9taXNlID0gUHJvbWlzZS5yZXNvbHZlKHJldC52YWx1ZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBlbmRpbmdQcm9taXNlLnRoZW4ob25GdWxmaWxsZWQsIG9uUmVqZWN0ZWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb25GdWxmaWxsZWQodW5kZWZpbmVkKTsgLy8ga2ljayBvZmYgdGhlIHByb2Nlc3NcbiAgICAgICAgfSk7XG4gICAgICAgIHByb21pc2UuY2FuY2VsID0gYWN0aW9uJCQxKG5hbWUgKyBcIiAtIHJ1bmlkOiBcIiArIHJ1bklkICsgXCIgLSBjYW5jZWxcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBpZiAocGVuZGluZ1Byb21pc2UpXG4gICAgICAgICAgICAgICAgICAgIGNhbmNlbFByb21pc2UocGVuZGluZ1Byb21pc2UpO1xuICAgICAgICAgICAgICAgIC8vIEZpbmFsbHkgYmxvY2sgY2FuIHJldHVybiAob3IgeWllbGQpIHN0dWZmLi5cbiAgICAgICAgICAgICAgICB2YXIgcmVzID0gZ2VuLnJldHVybigpO1xuICAgICAgICAgICAgICAgIC8vIGVhdCBhbnl0aGluZyB0aGF0IHByb21pc2Ugd291bGQgZG8sIGl0J3MgY2FuY2VsbGVkIVxuICAgICAgICAgICAgICAgIHZhciB5aWVsZGVkUHJvbWlzZSA9IFByb21pc2UucmVzb2x2ZShyZXMudmFsdWUpO1xuICAgICAgICAgICAgICAgIHlpZWxkZWRQcm9taXNlLnRoZW4obm9vcCQkMSwgbm9vcCQkMSk7XG4gICAgICAgICAgICAgICAgY2FuY2VsUHJvbWlzZSh5aWVsZGVkUHJvbWlzZSk7IC8vIG1heWJlIGl0IGNhbiBiZSBjYW5jZWxsZWQgOilcbiAgICAgICAgICAgICAgICAvLyByZWplY3Qgb3VyIG9yaWdpbmFsIHByb21pc2VcbiAgICAgICAgICAgICAgICByZWplY3RvcihuZXcgRXJyb3IoXCJGTE9XX0NBTkNFTExFRFwiKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIHJlamVjdG9yKGUpOyAvLyB0aGVyZSBjb3VsZCBiZSBhIHRocm93aW5nIGZpbmFsbHkgYmxvY2tcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBwcm9taXNlO1xuICAgIH07XG59XG5mdW5jdGlvbiBjYW5jZWxQcm9taXNlKHByb21pc2UpIHtcbiAgICBpZiAodHlwZW9mIHByb21pc2UuY2FuY2VsID09PSBcImZ1bmN0aW9uXCIpXG4gICAgICAgIHByb21pc2UuY2FuY2VsKCk7XG59XG5cbmZ1bmN0aW9uIGludGVyY2VwdFJlYWRzJCQxKHRoaW5nLCBwcm9wT3JIYW5kbGVyLCBoYW5kbGVyKSB7XG4gICAgdmFyIHRhcmdldDtcbiAgICBpZiAoaXNPYnNlcnZhYmxlTWFwJCQxKHRoaW5nKSB8fCBpc09ic2VydmFibGVBcnJheSQkMSh0aGluZykgfHwgaXNPYnNlcnZhYmxlVmFsdWUkJDEodGhpbmcpKSB7XG4gICAgICAgIHRhcmdldCA9IGdldEFkbWluaXN0cmF0aW9uJCQxKHRoaW5nKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoaXNPYnNlcnZhYmxlT2JqZWN0JCQxKHRoaW5nKSkge1xuICAgICAgICBpZiAodHlwZW9mIHByb3BPckhhbmRsZXIgIT09IFwic3RyaW5nXCIpXG4gICAgICAgICAgICByZXR1cm4gZmFpbCQkMShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgJiZcbiAgICAgICAgICAgICAgICBcIkludGVyY2VwdFJlYWRzIGNhbiBvbmx5IGJlIHVzZWQgd2l0aCBhIHNwZWNpZmljIHByb3BlcnR5LCBub3Qgd2l0aCBhbiBvYmplY3QgaW4gZ2VuZXJhbFwiKTtcbiAgICAgICAgdGFyZ2V0ID0gZ2V0QWRtaW5pc3RyYXRpb24kJDEodGhpbmcsIHByb3BPckhhbmRsZXIpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZhaWwkJDEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiICYmXG4gICAgICAgICAgICBcIkV4cGVjdGVkIG9ic2VydmFibGUgbWFwLCBvYmplY3Qgb3IgYXJyYXkgYXMgZmlyc3QgYXJyYXlcIik7XG4gICAgfVxuICAgIGlmICh0YXJnZXQuZGVoYW5jZXIgIT09IHVuZGVmaW5lZClcbiAgICAgICAgcmV0dXJuIGZhaWwkJDEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiICYmIFwiQW4gaW50ZXJjZXB0IHJlYWRlciB3YXMgYWxyZWFkeSBlc3RhYmxpc2hlZFwiKTtcbiAgICB0YXJnZXQuZGVoYW5jZXIgPSB0eXBlb2YgcHJvcE9ySGFuZGxlciA9PT0gXCJmdW5jdGlvblwiID8gcHJvcE9ySGFuZGxlciA6IGhhbmRsZXI7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGFyZ2V0LmRlaGFuY2VyID0gdW5kZWZpbmVkO1xuICAgIH07XG59XG5cbmZ1bmN0aW9uIGludGVyY2VwdCQkMSh0aGluZywgcHJvcE9ySGFuZGxlciwgaGFuZGxlcikge1xuICAgIGlmICh0eXBlb2YgaGFuZGxlciA9PT0gXCJmdW5jdGlvblwiKVxuICAgICAgICByZXR1cm4gaW50ZXJjZXB0UHJvcGVydHkodGhpbmcsIHByb3BPckhhbmRsZXIsIGhhbmRsZXIpO1xuICAgIGVsc2VcbiAgICAgICAgcmV0dXJuIGludGVyY2VwdEludGVyY2VwdGFibGUodGhpbmcsIHByb3BPckhhbmRsZXIpO1xufVxuZnVuY3Rpb24gaW50ZXJjZXB0SW50ZXJjZXB0YWJsZSh0aGluZywgaGFuZGxlcikge1xuICAgIHJldHVybiBnZXRBZG1pbmlzdHJhdGlvbiQkMSh0aGluZykuaW50ZXJjZXB0KGhhbmRsZXIpO1xufVxuZnVuY3Rpb24gaW50ZXJjZXB0UHJvcGVydHkodGhpbmcsIHByb3BlcnR5LCBoYW5kbGVyKSB7XG4gICAgcmV0dXJuIGdldEFkbWluaXN0cmF0aW9uJCQxKHRoaW5nLCBwcm9wZXJ0eSkuaW50ZXJjZXB0KGhhbmRsZXIpO1xufVxuXG5mdW5jdGlvbiBfaXNDb21wdXRlZCQkMSh2YWx1ZSwgcHJvcGVydHkpIHtcbiAgICBpZiAodmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZClcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIGlmIChwcm9wZXJ0eSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmIChpc09ic2VydmFibGVPYmplY3QkJDEodmFsdWUpID09PSBmYWxzZSlcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgaWYgKCF2YWx1ZVskbW9ieCQkMV0udmFsdWVzLmhhcyhwcm9wZXJ0eSkpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIHZhciBhdG9tID0gZ2V0QXRvbSQkMSh2YWx1ZSwgcHJvcGVydHkpO1xuICAgICAgICByZXR1cm4gaXNDb21wdXRlZFZhbHVlJCQxKGF0b20pO1xuICAgIH1cbiAgICByZXR1cm4gaXNDb21wdXRlZFZhbHVlJCQxKHZhbHVlKTtcbn1cbmZ1bmN0aW9uIGlzQ29tcHV0ZWQkJDEodmFsdWUpIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpXG4gICAgICAgIHJldHVybiBmYWlsJCQxKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiAmJlxuICAgICAgICAgICAgXCJpc0NvbXB1dGVkIGV4cGVjdHMgb25seSAxIGFyZ3VtZW50LiBVc2UgaXNPYnNlcnZhYmxlUHJvcCB0byBpbnNwZWN0IHRoZSBvYnNlcnZhYmlsaXR5IG9mIGEgcHJvcGVydHlcIik7XG4gICAgcmV0dXJuIF9pc0NvbXB1dGVkJCQxKHZhbHVlKTtcbn1cbmZ1bmN0aW9uIGlzQ29tcHV0ZWRQcm9wJCQxKHZhbHVlLCBwcm9wTmFtZSkge1xuICAgIGlmICh0eXBlb2YgcHJvcE5hbWUgIT09IFwic3RyaW5nXCIpXG4gICAgICAgIHJldHVybiBmYWlsJCQxKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiAmJlxuICAgICAgICAgICAgXCJpc0NvbXB1dGVkIGV4cGVjdGVkIGEgcHJvcGVydHkgbmFtZSBhcyBzZWNvbmQgYXJndW1lbnRcIik7XG4gICAgcmV0dXJuIF9pc0NvbXB1dGVkJCQxKHZhbHVlLCBwcm9wTmFtZSk7XG59XG5cbmZ1bmN0aW9uIF9pc09ic2VydmFibGUodmFsdWUsIHByb3BlcnR5KSB7XG4gICAgaWYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQpXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICBpZiAocHJvcGVydHkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiICYmXG4gICAgICAgICAgICAoaXNPYnNlcnZhYmxlTWFwJCQxKHZhbHVlKSB8fCBpc09ic2VydmFibGVBcnJheSQkMSh2YWx1ZSkpKVxuICAgICAgICAgICAgcmV0dXJuIGZhaWwkJDEoXCJpc09ic2VydmFibGUob2JqZWN0LCBwcm9wZXJ0eU5hbWUpIGlzIG5vdCBzdXBwb3J0ZWQgZm9yIGFycmF5cyBhbmQgbWFwcy4gVXNlIG1hcC5oYXMgb3IgYXJyYXkubGVuZ3RoIGluc3RlYWQuXCIpO1xuICAgICAgICBpZiAoaXNPYnNlcnZhYmxlT2JqZWN0JCQxKHZhbHVlKSkge1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlWyRtb2J4JCQxXS52YWx1ZXMuaGFzKHByb3BlcnR5KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIC8vIEZvciBmaXJzdCBjaGVjaywgc2VlICM3MDFcbiAgICByZXR1cm4gKGlzT2JzZXJ2YWJsZU9iamVjdCQkMSh2YWx1ZSkgfHxcbiAgICAgICAgISF2YWx1ZVskbW9ieCQkMV0gfHxcbiAgICAgICAgaXNBdG9tJCQxKHZhbHVlKSB8fFxuICAgICAgICBpc1JlYWN0aW9uJCQxKHZhbHVlKSB8fFxuICAgICAgICBpc0NvbXB1dGVkVmFsdWUkJDEodmFsdWUpKTtcbn1cbmZ1bmN0aW9uIGlzT2JzZXJ2YWJsZSQkMSh2YWx1ZSkge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoICE9PSAxKVxuICAgICAgICBmYWlsJCQxKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiAmJlxuICAgICAgICAgICAgXCJpc09ic2VydmFibGUgZXhwZWN0cyBvbmx5IDEgYXJndW1lbnQuIFVzZSBpc09ic2VydmFibGVQcm9wIHRvIGluc3BlY3QgdGhlIG9ic2VydmFiaWxpdHkgb2YgYSBwcm9wZXJ0eVwiKTtcbiAgICByZXR1cm4gX2lzT2JzZXJ2YWJsZSh2YWx1ZSk7XG59XG5mdW5jdGlvbiBpc09ic2VydmFibGVQcm9wJCQxKHZhbHVlLCBwcm9wTmFtZSkge1xuICAgIGlmICh0eXBlb2YgcHJvcE5hbWUgIT09IFwic3RyaW5nXCIpXG4gICAgICAgIHJldHVybiBmYWlsJCQxKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiAmJiBcImV4cGVjdGVkIGEgcHJvcGVydHkgbmFtZSBhcyBzZWNvbmQgYXJndW1lbnRcIik7XG4gICAgcmV0dXJuIF9pc09ic2VydmFibGUodmFsdWUsIHByb3BOYW1lKTtcbn1cblxuZnVuY3Rpb24ga2V5cyQkMShvYmopIHtcbiAgICBpZiAoaXNPYnNlcnZhYmxlT2JqZWN0JCQxKG9iaikpIHtcbiAgICAgICAgcmV0dXJuIG9ialskbW9ieCQkMV0uZ2V0S2V5cygpO1xuICAgIH1cbiAgICBpZiAoaXNPYnNlcnZhYmxlTWFwJCQxKG9iaikpIHtcbiAgICAgICAgcmV0dXJuIEFycmF5LmZyb20ob2JqLmtleXMoKSk7XG4gICAgfVxuICAgIGlmIChpc09ic2VydmFibGVTZXQkJDEob2JqKSkge1xuICAgICAgICByZXR1cm4gQXJyYXkuZnJvbShvYmoua2V5cygpKTtcbiAgICB9XG4gICAgaWYgKGlzT2JzZXJ2YWJsZUFycmF5JCQxKG9iaikpIHtcbiAgICAgICAgcmV0dXJuIG9iai5tYXAoZnVuY3Rpb24gKF8sIGluZGV4KSB7IHJldHVybiBpbmRleDsgfSk7XG4gICAgfVxuICAgIHJldHVybiBmYWlsJCQxKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiAmJlxuICAgICAgICBcIidrZXlzKCknIGNhbiBvbmx5IGJlIHVzZWQgb24gb2JzZXJ2YWJsZSBvYmplY3RzLCBhcnJheXMsIHNldHMgYW5kIG1hcHNcIik7XG59XG5mdW5jdGlvbiB2YWx1ZXMkJDEob2JqKSB7XG4gICAgaWYgKGlzT2JzZXJ2YWJsZU9iamVjdCQkMShvYmopKSB7XG4gICAgICAgIHJldHVybiBrZXlzJCQxKG9iaikubWFwKGZ1bmN0aW9uIChrZXkpIHsgcmV0dXJuIG9ialtrZXldOyB9KTtcbiAgICB9XG4gICAgaWYgKGlzT2JzZXJ2YWJsZU1hcCQkMShvYmopKSB7XG4gICAgICAgIHJldHVybiBrZXlzJCQxKG9iaikubWFwKGZ1bmN0aW9uIChrZXkpIHsgcmV0dXJuIG9iai5nZXQoa2V5KTsgfSk7XG4gICAgfVxuICAgIGlmIChpc09ic2VydmFibGVTZXQkJDEob2JqKSkge1xuICAgICAgICByZXR1cm4gQXJyYXkuZnJvbShvYmoudmFsdWVzKCkpO1xuICAgIH1cbiAgICBpZiAoaXNPYnNlcnZhYmxlQXJyYXkkJDEob2JqKSkge1xuICAgICAgICByZXR1cm4gb2JqLnNsaWNlKCk7XG4gICAgfVxuICAgIHJldHVybiBmYWlsJCQxKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiAmJlxuICAgICAgICBcIid2YWx1ZXMoKScgY2FuIG9ubHkgYmUgdXNlZCBvbiBvYnNlcnZhYmxlIG9iamVjdHMsIGFycmF5cywgc2V0cyBhbmQgbWFwc1wiKTtcbn1cbmZ1bmN0aW9uIGVudHJpZXMkJDEob2JqKSB7XG4gICAgaWYgKGlzT2JzZXJ2YWJsZU9iamVjdCQkMShvYmopKSB7XG4gICAgICAgIHJldHVybiBrZXlzJCQxKG9iaikubWFwKGZ1bmN0aW9uIChrZXkpIHsgcmV0dXJuIFtrZXksIG9ialtrZXldXTsgfSk7XG4gICAgfVxuICAgIGlmIChpc09ic2VydmFibGVNYXAkJDEob2JqKSkge1xuICAgICAgICByZXR1cm4ga2V5cyQkMShvYmopLm1hcChmdW5jdGlvbiAoa2V5KSB7IHJldHVybiBba2V5LCBvYmouZ2V0KGtleSldOyB9KTtcbiAgICB9XG4gICAgaWYgKGlzT2JzZXJ2YWJsZVNldCQkMShvYmopKSB7XG4gICAgICAgIHJldHVybiBBcnJheS5mcm9tKG9iai5lbnRyaWVzKCkpO1xuICAgIH1cbiAgICBpZiAoaXNPYnNlcnZhYmxlQXJyYXkkJDEob2JqKSkge1xuICAgICAgICByZXR1cm4gb2JqLm1hcChmdW5jdGlvbiAoa2V5LCBpbmRleCkgeyByZXR1cm4gW2luZGV4LCBrZXldOyB9KTtcbiAgICB9XG4gICAgcmV0dXJuIGZhaWwkJDEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiICYmXG4gICAgICAgIFwiJ2VudHJpZXMoKScgY2FuIG9ubHkgYmUgdXNlZCBvbiBvYnNlcnZhYmxlIG9iamVjdHMsIGFycmF5cyBhbmQgbWFwc1wiKTtcbn1cbmZ1bmN0aW9uIHNldCQkMShvYmosIGtleSwgdmFsdWUpIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMikge1xuICAgICAgICBzdGFydEJhdGNoJCQxKCk7XG4gICAgICAgIHZhciB2YWx1ZXNfMSA9IGtleTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGZvciAodmFyIGtleV8xIGluIHZhbHVlc18xKVxuICAgICAgICAgICAgICAgIHNldCQkMShvYmosIGtleV8xLCB2YWx1ZXNfMVtrZXlfMV0pO1xuICAgICAgICB9XG4gICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgZW5kQmF0Y2gkJDEoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChpc09ic2VydmFibGVPYmplY3QkJDEob2JqKSkge1xuICAgICAgICB2YXIgYWRtID0gb2JqWyRtb2J4JCQxXTtcbiAgICAgICAgdmFyIGV4aXN0aW5nT2JzZXJ2YWJsZSA9IGFkbS52YWx1ZXMuZ2V0KGtleSk7XG4gICAgICAgIGlmIChleGlzdGluZ09ic2VydmFibGUpIHtcbiAgICAgICAgICAgIGFkbS53cml0ZShrZXksIHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGFkbS5hZGRPYnNlcnZhYmxlUHJvcChrZXksIHZhbHVlLCBhZG0uZGVmYXVsdEVuaGFuY2VyKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmIChpc09ic2VydmFibGVNYXAkJDEob2JqKSkge1xuICAgICAgICBvYmouc2V0KGtleSwgdmFsdWUpO1xuICAgIH1cbiAgICBlbHNlIGlmIChpc09ic2VydmFibGVBcnJheSQkMShvYmopKSB7XG4gICAgICAgIGlmICh0eXBlb2Yga2V5ICE9PSBcIm51bWJlclwiKVxuICAgICAgICAgICAga2V5ID0gcGFyc2VJbnQoa2V5LCAxMCk7XG4gICAgICAgIGludmFyaWFudCQkMShrZXkgPj0gMCwgXCJOb3QgYSB2YWxpZCBpbmRleDogJ1wiICsga2V5ICsgXCInXCIpO1xuICAgICAgICBzdGFydEJhdGNoJCQxKCk7XG4gICAgICAgIGlmIChrZXkgPj0gb2JqLmxlbmd0aClcbiAgICAgICAgICAgIG9iai5sZW5ndGggPSBrZXkgKyAxO1xuICAgICAgICBvYmpba2V5XSA9IHZhbHVlO1xuICAgICAgICBlbmRCYXRjaCQkMSgpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZhaWwkJDEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiICYmXG4gICAgICAgICAgICBcIidzZXQoKScgY2FuIG9ubHkgYmUgdXNlZCBvbiBvYnNlcnZhYmxlIG9iamVjdHMsIGFycmF5cyBhbmQgbWFwc1wiKTtcbiAgICB9XG59XG5mdW5jdGlvbiByZW1vdmUkJDEob2JqLCBrZXkpIHtcbiAgICBpZiAoaXNPYnNlcnZhYmxlT2JqZWN0JCQxKG9iaikpIHtcbiAgICAgICAgXG4gICAgICAgIG9ialskbW9ieCQkMV0ucmVtb3ZlKGtleSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKGlzT2JzZXJ2YWJsZU1hcCQkMShvYmopKSB7XG4gICAgICAgIG9iai5kZWxldGUoa2V5KTtcbiAgICB9XG4gICAgZWxzZSBpZiAoaXNPYnNlcnZhYmxlU2V0JCQxKG9iaikpIHtcbiAgICAgICAgb2JqLmRlbGV0ZShrZXkpO1xuICAgIH1cbiAgICBlbHNlIGlmIChpc09ic2VydmFibGVBcnJheSQkMShvYmopKSB7XG4gICAgICAgIGlmICh0eXBlb2Yga2V5ICE9PSBcIm51bWJlclwiKVxuICAgICAgICAgICAga2V5ID0gcGFyc2VJbnQoa2V5LCAxMCk7XG4gICAgICAgIGludmFyaWFudCQkMShrZXkgPj0gMCwgXCJOb3QgYSB2YWxpZCBpbmRleDogJ1wiICsga2V5ICsgXCInXCIpO1xuICAgICAgICBvYmouc3BsaWNlKGtleSwgMSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gZmFpbCQkMShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgJiZcbiAgICAgICAgICAgIFwiJ3JlbW92ZSgpJyBjYW4gb25seSBiZSB1c2VkIG9uIG9ic2VydmFibGUgb2JqZWN0cywgYXJyYXlzIGFuZCBtYXBzXCIpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGhhcyQkMShvYmosIGtleSkge1xuICAgIGlmIChpc09ic2VydmFibGVPYmplY3QkJDEob2JqKSkge1xuICAgICAgICAvLyByZXR1cm4ga2V5cyhvYmopLmluZGV4T2Yoa2V5KSA+PSAwXG4gICAgICAgIHZhciBhZG0gPSBnZXRBZG1pbmlzdHJhdGlvbiQkMShvYmopO1xuICAgICAgICByZXR1cm4gYWRtLmhhcyhrZXkpO1xuICAgIH1cbiAgICBlbHNlIGlmIChpc09ic2VydmFibGVNYXAkJDEob2JqKSkge1xuICAgICAgICByZXR1cm4gb2JqLmhhcyhrZXkpO1xuICAgIH1cbiAgICBlbHNlIGlmIChpc09ic2VydmFibGVTZXQkJDEob2JqKSkge1xuICAgICAgICByZXR1cm4gb2JqLmhhcyhrZXkpO1xuICAgIH1cbiAgICBlbHNlIGlmIChpc09ic2VydmFibGVBcnJheSQkMShvYmopKSB7XG4gICAgICAgIHJldHVybiBrZXkgPj0gMCAmJiBrZXkgPCBvYmoubGVuZ3RoO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZhaWwkJDEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiICYmXG4gICAgICAgICAgICBcIidoYXMoKScgY2FuIG9ubHkgYmUgdXNlZCBvbiBvYnNlcnZhYmxlIG9iamVjdHMsIGFycmF5cyBhbmQgbWFwc1wiKTtcbiAgICB9XG59XG5mdW5jdGlvbiBnZXQkJDEob2JqLCBrZXkpIHtcbiAgICBpZiAoIWhhcyQkMShvYmosIGtleSkpXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgaWYgKGlzT2JzZXJ2YWJsZU9iamVjdCQkMShvYmopKSB7XG4gICAgICAgIHJldHVybiBvYmpba2V5XTtcbiAgICB9XG4gICAgZWxzZSBpZiAoaXNPYnNlcnZhYmxlTWFwJCQxKG9iaikpIHtcbiAgICAgICAgcmV0dXJuIG9iai5nZXQoa2V5KTtcbiAgICB9XG4gICAgZWxzZSBpZiAoaXNPYnNlcnZhYmxlQXJyYXkkJDEob2JqKSkge1xuICAgICAgICByZXR1cm4gb2JqW2tleV07XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gZmFpbCQkMShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgJiZcbiAgICAgICAgICAgIFwiJ2dldCgpJyBjYW4gb25seSBiZSB1c2VkIG9uIG9ic2VydmFibGUgb2JqZWN0cywgYXJyYXlzIGFuZCBtYXBzXCIpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gb2JzZXJ2ZSQkMSh0aGluZywgcHJvcE9yQ2IsIGNiT3JGaXJlLCBmaXJlSW1tZWRpYXRlbHkpIHtcbiAgICBpZiAodHlwZW9mIGNiT3JGaXJlID09PSBcImZ1bmN0aW9uXCIpXG4gICAgICAgIHJldHVybiBvYnNlcnZlT2JzZXJ2YWJsZVByb3BlcnR5KHRoaW5nLCBwcm9wT3JDYiwgY2JPckZpcmUsIGZpcmVJbW1lZGlhdGVseSk7XG4gICAgZWxzZVxuICAgICAgICByZXR1cm4gb2JzZXJ2ZU9ic2VydmFibGUodGhpbmcsIHByb3BPckNiLCBjYk9yRmlyZSk7XG59XG5mdW5jdGlvbiBvYnNlcnZlT2JzZXJ2YWJsZSh0aGluZywgbGlzdGVuZXIsIGZpcmVJbW1lZGlhdGVseSkge1xuICAgIHJldHVybiBnZXRBZG1pbmlzdHJhdGlvbiQkMSh0aGluZykub2JzZXJ2ZShsaXN0ZW5lciwgZmlyZUltbWVkaWF0ZWx5KTtcbn1cbmZ1bmN0aW9uIG9ic2VydmVPYnNlcnZhYmxlUHJvcGVydHkodGhpbmcsIHByb3BlcnR5LCBsaXN0ZW5lciwgZmlyZUltbWVkaWF0ZWx5KSB7XG4gICAgcmV0dXJuIGdldEFkbWluaXN0cmF0aW9uJCQxKHRoaW5nLCBwcm9wZXJ0eSkub2JzZXJ2ZShsaXN0ZW5lciwgZmlyZUltbWVkaWF0ZWx5KTtcbn1cblxudmFyIGRlZmF1bHRPcHRpb25zID0ge1xuICAgIGRldGVjdEN5Y2xlczogdHJ1ZSxcbiAgICBleHBvcnRNYXBzQXNPYmplY3RzOiB0cnVlLFxuICAgIHJlY3Vyc2VFdmVyeXRoaW5nOiBmYWxzZVxufTtcbmZ1bmN0aW9uIGNhY2hlKG1hcCwga2V5LCB2YWx1ZSwgb3B0aW9ucykge1xuICAgIGlmIChvcHRpb25zLmRldGVjdEN5Y2xlcylcbiAgICAgICAgbWFwLnNldChrZXksIHZhbHVlKTtcbiAgICByZXR1cm4gdmFsdWU7XG59XG5mdW5jdGlvbiB0b0pTSGVscGVyKHNvdXJjZSwgb3B0aW9ucywgX19hbHJlYWR5U2Vlbikge1xuICAgIGlmICghb3B0aW9ucy5yZWN1cnNlRXZlcnl0aGluZyAmJiAhaXNPYnNlcnZhYmxlJCQxKHNvdXJjZSkpXG4gICAgICAgIHJldHVybiBzb3VyY2U7XG4gICAgaWYgKHR5cGVvZiBzb3VyY2UgIT09IFwib2JqZWN0XCIpXG4gICAgICAgIHJldHVybiBzb3VyY2U7XG4gICAgLy8gRGlyZWN0bHkgcmV0dXJuIG51bGwgaWYgc291cmNlIGlzIG51bGxcbiAgICBpZiAoc291cmNlID09PSBudWxsKVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAvLyBEaXJlY3RseSByZXR1cm4gdGhlIERhdGUgb2JqZWN0IGl0c2VsZiBpZiBjb250YWluZWQgaW4gdGhlIG9ic2VydmFibGVcbiAgICBpZiAoc291cmNlIGluc3RhbmNlb2YgRGF0ZSlcbiAgICAgICAgcmV0dXJuIHNvdXJjZTtcbiAgICBpZiAoaXNPYnNlcnZhYmxlVmFsdWUkJDEoc291cmNlKSlcbiAgICAgICAgcmV0dXJuIHRvSlNIZWxwZXIoc291cmNlLmdldCgpLCBvcHRpb25zLCBfX2FscmVhZHlTZWVuKTtcbiAgICAvLyBtYWtlIHN1cmUgd2UgdHJhY2sgdGhlIGtleXMgb2YgdGhlIG9iamVjdFxuICAgIGlmIChpc09ic2VydmFibGUkJDEoc291cmNlKSlcbiAgICAgICAga2V5cyQkMShzb3VyY2UpO1xuICAgIHZhciBkZXRlY3RDeWNsZXMgPSBvcHRpb25zLmRldGVjdEN5Y2xlcyA9PT0gdHJ1ZTtcbiAgICBpZiAoZGV0ZWN0Q3ljbGVzICYmIHNvdXJjZSAhPT0gbnVsbCAmJiBfX2FscmVhZHlTZWVuLmhhcyhzb3VyY2UpKSB7XG4gICAgICAgIHJldHVybiBfX2FscmVhZHlTZWVuLmdldChzb3VyY2UpO1xuICAgIH1cbiAgICBpZiAoaXNPYnNlcnZhYmxlQXJyYXkkJDEoc291cmNlKSB8fCBBcnJheS5pc0FycmF5KHNvdXJjZSkpIHtcbiAgICAgICAgdmFyIHJlc18xID0gY2FjaGUoX19hbHJlYWR5U2Vlbiwgc291cmNlLCBbXSwgb3B0aW9ucyk7XG4gICAgICAgIHZhciB0b0FkZCA9IHNvdXJjZS5tYXAoZnVuY3Rpb24gKHZhbHVlKSB7IHJldHVybiB0b0pTSGVscGVyKHZhbHVlLCBvcHRpb25zLCBfX2FscmVhZHlTZWVuKTsgfSk7XG4gICAgICAgIHJlc18xLmxlbmd0aCA9IHRvQWRkLmxlbmd0aDtcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSB0b0FkZC5sZW5ndGg7IGkgPCBsOyBpKyspXG4gICAgICAgICAgICByZXNfMVtpXSA9IHRvQWRkW2ldO1xuICAgICAgICByZXR1cm4gcmVzXzE7XG4gICAgfVxuICAgIGlmIChpc09ic2VydmFibGVTZXQkJDEoc291cmNlKSB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2Yoc291cmNlKSA9PT0gU2V0LnByb3RvdHlwZSkge1xuICAgICAgICBpZiAob3B0aW9ucy5leHBvcnRNYXBzQXNPYmplY3RzID09PSBmYWxzZSkge1xuICAgICAgICAgICAgdmFyIHJlc18yID0gY2FjaGUoX19hbHJlYWR5U2Vlbiwgc291cmNlLCBuZXcgU2V0KCksIG9wdGlvbnMpO1xuICAgICAgICAgICAgc291cmNlLmZvckVhY2goZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgcmVzXzIuYWRkKHRvSlNIZWxwZXIodmFsdWUsIG9wdGlvbnMsIF9fYWxyZWFkeVNlZW4pKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHJlc18yO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdmFyIHJlc18zID0gY2FjaGUoX19hbHJlYWR5U2Vlbiwgc291cmNlLCBbXSwgb3B0aW9ucyk7XG4gICAgICAgICAgICBzb3VyY2UuZm9yRWFjaChmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICByZXNfMy5wdXNoKHRvSlNIZWxwZXIodmFsdWUsIG9wdGlvbnMsIF9fYWxyZWFkeVNlZW4pKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHJlc18zO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChpc09ic2VydmFibGVNYXAkJDEoc291cmNlKSB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2Yoc291cmNlKSA9PT0gTWFwLnByb3RvdHlwZSkge1xuICAgICAgICBpZiAob3B0aW9ucy5leHBvcnRNYXBzQXNPYmplY3RzID09PSBmYWxzZSkge1xuICAgICAgICAgICAgdmFyIHJlc180ID0gY2FjaGUoX19hbHJlYWR5U2Vlbiwgc291cmNlLCBuZXcgTWFwKCksIG9wdGlvbnMpO1xuICAgICAgICAgICAgc291cmNlLmZvckVhY2goZnVuY3Rpb24gKHZhbHVlLCBrZXkpIHtcbiAgICAgICAgICAgICAgICByZXNfNC5zZXQoa2V5LCB0b0pTSGVscGVyKHZhbHVlLCBvcHRpb25zLCBfX2FscmVhZHlTZWVuKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiByZXNfNDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHZhciByZXNfNSA9IGNhY2hlKF9fYWxyZWFkeVNlZW4sIHNvdXJjZSwge30sIG9wdGlvbnMpO1xuICAgICAgICAgICAgc291cmNlLmZvckVhY2goZnVuY3Rpb24gKHZhbHVlLCBrZXkpIHtcbiAgICAgICAgICAgICAgICByZXNfNVtrZXldID0gdG9KU0hlbHBlcih2YWx1ZSwgb3B0aW9ucywgX19hbHJlYWR5U2Vlbik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiByZXNfNTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyBGYWxsYmFjayB0byB0aGUgc2l0dWF0aW9uIHRoYXQgc291cmNlIGlzIGFuIE9ic2VydmFibGVPYmplY3Qgb3IgYSBwbGFpbiBvYmplY3RcbiAgICB2YXIgcmVzID0gY2FjaGUoX19hbHJlYWR5U2Vlbiwgc291cmNlLCB7fSwgb3B0aW9ucyk7XG4gICAgZm9yICh2YXIga2V5IGluIHNvdXJjZSkge1xuICAgICAgICByZXNba2V5XSA9IHRvSlNIZWxwZXIoc291cmNlW2tleV0sIG9wdGlvbnMsIF9fYWxyZWFkeVNlZW4pO1xuICAgIH1cbiAgICByZXR1cm4gcmVzO1xufVxuZnVuY3Rpb24gdG9KUyQkMShzb3VyY2UsIG9wdGlvbnMpIHtcbiAgICAvLyBiYWNrd2FyZCBjb21wYXRpYmlsaXR5XG4gICAgaWYgKHR5cGVvZiBvcHRpb25zID09PSBcImJvb2xlYW5cIilcbiAgICAgICAgb3B0aW9ucyA9IHsgZGV0ZWN0Q3ljbGVzOiBvcHRpb25zIH07XG4gICAgaWYgKCFvcHRpb25zKVxuICAgICAgICBvcHRpb25zID0gZGVmYXVsdE9wdGlvbnM7XG4gICAgb3B0aW9ucy5kZXRlY3RDeWNsZXMgPVxuICAgICAgICBvcHRpb25zLmRldGVjdEN5Y2xlcyA9PT0gdW5kZWZpbmVkXG4gICAgICAgICAgICA/IG9wdGlvbnMucmVjdXJzZUV2ZXJ5dGhpbmcgPT09IHRydWVcbiAgICAgICAgICAgIDogb3B0aW9ucy5kZXRlY3RDeWNsZXMgPT09IHRydWU7XG4gICAgdmFyIF9fYWxyZWFkeVNlZW47XG4gICAgaWYgKG9wdGlvbnMuZGV0ZWN0Q3ljbGVzKVxuICAgICAgICBfX2FscmVhZHlTZWVuID0gbmV3IE1hcCgpO1xuICAgIHJldHVybiB0b0pTSGVscGVyKHNvdXJjZSwgb3B0aW9ucywgX19hbHJlYWR5U2Vlbik7XG59XG5cbmZ1bmN0aW9uIHRyYWNlJCQxKCkge1xuICAgIHZhciBhcmdzID0gW107XG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgYXJnc1tfaV0gPSBhcmd1bWVudHNbX2ldO1xuICAgIH1cbiAgICB2YXIgZW50ZXJCcmVha1BvaW50ID0gZmFsc2U7XG4gICAgaWYgKHR5cGVvZiBhcmdzW2FyZ3MubGVuZ3RoIC0gMV0gPT09IFwiYm9vbGVhblwiKVxuICAgICAgICBlbnRlckJyZWFrUG9pbnQgPSBhcmdzLnBvcCgpO1xuICAgIHZhciBkZXJpdmF0aW9uID0gZ2V0QXRvbUZyb21BcmdzKGFyZ3MpO1xuICAgIGlmICghZGVyaXZhdGlvbikge1xuICAgICAgICByZXR1cm4gZmFpbCQkMShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgJiZcbiAgICAgICAgICAgIFwiJ3RyYWNlKGJyZWFrPyknIGNhbiBvbmx5IGJlIHVzZWQgaW5zaWRlIGEgdHJhY2tlZCBjb21wdXRlZCB2YWx1ZSBvciBhIFJlYWN0aW9uLiBDb25zaWRlciBwYXNzaW5nIGluIHRoZSBjb21wdXRlZCB2YWx1ZSBvciByZWFjdGlvbiBleHBsaWNpdGx5XCIpO1xuICAgIH1cbiAgICBpZiAoZGVyaXZhdGlvbi5pc1RyYWNpbmcgPT09IFRyYWNlTW9kZSQkMS5OT05FKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiW21vYngudHJhY2VdICdcIiArIGRlcml2YXRpb24ubmFtZSArIFwiJyB0cmFjaW5nIGVuYWJsZWRcIik7XG4gICAgfVxuICAgIGRlcml2YXRpb24uaXNUcmFjaW5nID0gZW50ZXJCcmVha1BvaW50ID8gVHJhY2VNb2RlJCQxLkJSRUFLIDogVHJhY2VNb2RlJCQxLkxPRztcbn1cbmZ1bmN0aW9uIGdldEF0b21Gcm9tQXJncyhhcmdzKSB7XG4gICAgc3dpdGNoIChhcmdzLmxlbmd0aCkge1xuICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICByZXR1cm4gZ2xvYmFsU3RhdGUkJDEudHJhY2tpbmdEZXJpdmF0aW9uO1xuICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICByZXR1cm4gZ2V0QXRvbSQkMShhcmdzWzBdKTtcbiAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgcmV0dXJuIGdldEF0b20kJDEoYXJnc1swXSwgYXJnc1sxXSk7XG4gICAgfVxufVxuXG4vKipcbiAqIER1cmluZyBhIHRyYW5zYWN0aW9uIG5vIHZpZXdzIGFyZSB1cGRhdGVkIHVudGlsIHRoZSBlbmQgb2YgdGhlIHRyYW5zYWN0aW9uLlxuICogVGhlIHRyYW5zYWN0aW9uIHdpbGwgYmUgcnVuIHN5bmNocm9ub3VzbHkgbm9uZXRoZWxlc3MuXG4gKlxuICogQHBhcmFtIGFjdGlvbiBhIGZ1bmN0aW9uIHRoYXQgdXBkYXRlcyBzb21lIHJlYWN0aXZlIHN0YXRlXG4gKiBAcmV0dXJucyBhbnkgdmFsdWUgdGhhdCB3YXMgcmV0dXJuZWQgYnkgdGhlICdhY3Rpb24nIHBhcmFtZXRlci5cbiAqL1xuZnVuY3Rpb24gdHJhbnNhY3Rpb24kJDEoYWN0aW9uJCQxLCB0aGlzQXJnKSB7XG4gICAgaWYgKHRoaXNBcmcgPT09IHZvaWQgMCkgeyB0aGlzQXJnID0gdW5kZWZpbmVkOyB9XG4gICAgc3RhcnRCYXRjaCQkMSgpO1xuICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBhY3Rpb24kJDEuYXBwbHkodGhpc0FyZyk7XG4gICAgfVxuICAgIGZpbmFsbHkge1xuICAgICAgICBlbmRCYXRjaCQkMSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gd2hlbiQkMShwcmVkaWNhdGUsIGFyZzEsIGFyZzIpIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSB8fCAoYXJnMSAmJiB0eXBlb2YgYXJnMSA9PT0gXCJvYmplY3RcIikpXG4gICAgICAgIHJldHVybiB3aGVuUHJvbWlzZShwcmVkaWNhdGUsIGFyZzEpO1xuICAgIHJldHVybiBfd2hlbihwcmVkaWNhdGUsIGFyZzEsIGFyZzIgfHwge30pO1xufVxuZnVuY3Rpb24gX3doZW4ocHJlZGljYXRlLCBlZmZlY3QsIG9wdHMpIHtcbiAgICB2YXIgdGltZW91dEhhbmRsZTtcbiAgICBpZiAodHlwZW9mIG9wdHMudGltZW91dCA9PT0gXCJudW1iZXJcIikge1xuICAgICAgICB0aW1lb3V0SGFuZGxlID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoIWRpc3Bvc2VyWyRtb2J4JCQxXS5pc0Rpc3Bvc2VkKSB7XG4gICAgICAgICAgICAgICAgZGlzcG9zZXIoKTtcbiAgICAgICAgICAgICAgICB2YXIgZXJyb3IgPSBuZXcgRXJyb3IoXCJXSEVOX1RJTUVPVVRcIik7XG4gICAgICAgICAgICAgICAgaWYgKG9wdHMub25FcnJvcilcbiAgICAgICAgICAgICAgICAgICAgb3B0cy5vbkVycm9yKGVycm9yKTtcbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCBvcHRzLnRpbWVvdXQpO1xuICAgIH1cbiAgICBvcHRzLm5hbWUgPSBvcHRzLm5hbWUgfHwgXCJXaGVuQFwiICsgZ2V0TmV4dElkJCQxKCk7XG4gICAgdmFyIGVmZmVjdEFjdGlvbiA9IGNyZWF0ZUFjdGlvbiQkMShvcHRzLm5hbWUgKyBcIi1lZmZlY3RcIiwgZWZmZWN0KTtcbiAgICB2YXIgZGlzcG9zZXIgPSBhdXRvcnVuJCQxKGZ1bmN0aW9uIChyKSB7XG4gICAgICAgIGlmIChwcmVkaWNhdGUoKSkge1xuICAgICAgICAgICAgci5kaXNwb3NlKCk7XG4gICAgICAgICAgICBpZiAodGltZW91dEhhbmRsZSlcbiAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQodGltZW91dEhhbmRsZSk7XG4gICAgICAgICAgICBlZmZlY3RBY3Rpb24oKTtcbiAgICAgICAgfVxuICAgIH0sIG9wdHMpO1xuICAgIHJldHVybiBkaXNwb3Nlcjtcbn1cbmZ1bmN0aW9uIHdoZW5Qcm9taXNlKHByZWRpY2F0ZSwgb3B0cykge1xuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgJiYgb3B0cyAmJiBvcHRzLm9uRXJyb3IpXG4gICAgICAgIHJldHVybiBmYWlsJCQxKFwidGhlIG9wdGlvbnMgJ29uRXJyb3InIGFuZCAncHJvbWlzZScgY2Fubm90IGJlIGNvbWJpbmVkXCIpO1xuICAgIHZhciBjYW5jZWw7XG4gICAgdmFyIHJlcyA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgdmFyIGRpc3Bvc2VyID0gX3doZW4ocHJlZGljYXRlLCByZXNvbHZlLCBfX2Fzc2lnbih7fSwgb3B0cywgeyBvbkVycm9yOiByZWplY3QgfSkpO1xuICAgICAgICBjYW5jZWwgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBkaXNwb3NlcigpO1xuICAgICAgICAgICAgcmVqZWN0KFwiV0hFTl9DQU5DRUxMRURcIik7XG4gICAgICAgIH07XG4gICAgfSk7XG4gICAgcmVzLmNhbmNlbCA9IGNhbmNlbDtcbiAgICByZXR1cm4gcmVzO1xufVxuXG5mdW5jdGlvbiBnZXRBZG0odGFyZ2V0KSB7XG4gICAgcmV0dXJuIHRhcmdldFskbW9ieCQkMV07XG59XG4vLyBPcHRpbWl6YXRpb246IHdlIGRvbid0IG5lZWQgdGhlIGludGVybWVkaWF0ZSBvYmplY3RzIGFuZCBjb3VsZCBoYXZlIGEgY29tcGxldGVseSBjdXN0b20gYWRtaW5pc3RyYXRpb24gZm9yIER5bmFtaWNPYmplY3RzLFxuLy8gYW5kIHNraXAgZWl0aGVyIHRoZSBpbnRlcm5hbCB2YWx1ZXMgbWFwLCBvciB0aGUgYmFzZSBvYmplY3Qgd2l0aCBpdHMgcHJvcGVydHkgZGVzY3JpcHRvcnMhXG52YXIgb2JqZWN0UHJveHlUcmFwcyA9IHtcbiAgICBoYXM6IGZ1bmN0aW9uICh0YXJnZXQsIG5hbWUpIHtcbiAgICAgICAgaWYgKG5hbWUgPT09ICRtb2J4JCQxIHx8IG5hbWUgPT09IFwiY29uc3RydWN0b3JcIiB8fCBuYW1lID09PSBtb2J4RGlkUnVuTGF6eUluaXRpYWxpemVyc1N5bWJvbCQkMSlcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB2YXIgYWRtID0gZ2V0QWRtKHRhcmdldCk7XG4gICAgICAgIC8vIE1XRTogc2hvdWxkIGBpbmAgb3BlcmF0b3IgYmUgcmVhY3RpdmU/IElmIG5vdCwgYmVsb3cgY29kZSBwYXRoIHdpbGwgYmUgZmFzdGVyIC8gbW9yZSBtZW1vcnkgZWZmaWNpZW50XG4gICAgICAgIC8vIFRPRE86IGNoZWNrIHBlcmZvcm1hbmNlIHN0YXRzIVxuICAgICAgICAvLyBpZiAoYWRtLnZhbHVlcy5nZXQobmFtZSBhcyBzdHJpbmcpKSByZXR1cm4gdHJ1ZVxuICAgICAgICBpZiAodHlwZW9mIG5hbWUgPT09IFwic3RyaW5nXCIpXG4gICAgICAgICAgICByZXR1cm4gYWRtLmhhcyhuYW1lKTtcbiAgICAgICAgcmV0dXJuIG5hbWUgaW4gdGFyZ2V0O1xuICAgIH0sXG4gICAgZ2V0OiBmdW5jdGlvbiAodGFyZ2V0LCBuYW1lKSB7XG4gICAgICAgIGlmIChuYW1lID09PSAkbW9ieCQkMSB8fCBuYW1lID09PSBcImNvbnN0cnVjdG9yXCIgfHwgbmFtZSA9PT0gbW9ieERpZFJ1bkxhenlJbml0aWFsaXplcnNTeW1ib2wkJDEpXG4gICAgICAgICAgICByZXR1cm4gdGFyZ2V0W25hbWVdO1xuICAgICAgICB2YXIgYWRtID0gZ2V0QWRtKHRhcmdldCk7XG4gICAgICAgIHZhciBvYnNlcnZhYmxlJCQxID0gYWRtLnZhbHVlcy5nZXQobmFtZSk7XG4gICAgICAgIGlmIChvYnNlcnZhYmxlJCQxIGluc3RhbmNlb2YgQXRvbSQkMSkge1xuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IG9ic2VydmFibGUkJDEuZ2V0KCk7XG4gICAgICAgICAgICBpZiAocmVzdWx0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAvLyBUaGlzIGZpeGVzICMxNzk2LCBiZWNhdXNlIGRlbGV0aW5nIGEgcHJvcCB0aGF0IGhhcyBhblxuICAgICAgICAgICAgICAgIC8vIHVuZGVmaW5lZCB2YWx1ZSB3b24ndCByZXRyaWdnZXIgYSBvYnNlcnZlciAobm8gdmlzaWJsZSBlZmZlY3QpLFxuICAgICAgICAgICAgICAgIC8vIHRoZSBhdXRvcnVuIHdvdWxkbid0IHN1YnNjcmliZSB0byBmdXR1cmUga2V5IGNoYW5nZXMgKHNlZSBhbHNvIG5leHQgY29tbWVudClcbiAgICAgICAgICAgICAgICBhZG0uaGFzKG5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfVxuICAgICAgICAvLyBtYWtlIHN1cmUgd2Ugc3RhcnQgbGlzdGVuaW5nIHRvIGZ1dHVyZSBrZXlzXG4gICAgICAgIC8vIG5vdGUgdGhhdCB3ZSBvbmx5IGRvIHRoaXMgaGVyZSBmb3Igb3B0aW1pemF0aW9uXG4gICAgICAgIGlmICh0eXBlb2YgbmFtZSA9PT0gXCJzdHJpbmdcIilcbiAgICAgICAgICAgIGFkbS5oYXMobmFtZSk7XG4gICAgICAgIHJldHVybiB0YXJnZXRbbmFtZV07XG4gICAgfSxcbiAgICBzZXQ6IGZ1bmN0aW9uICh0YXJnZXQsIG5hbWUsIHZhbHVlKSB7XG4gICAgICAgIGlmICh0eXBlb2YgbmFtZSAhPT0gXCJzdHJpbmdcIilcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgc2V0JCQxKHRhcmdldCwgbmFtZSwgdmFsdWUpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9LFxuICAgIGRlbGV0ZVByb3BlcnR5OiBmdW5jdGlvbiAodGFyZ2V0LCBuYW1lKSB7XG4gICAgICAgIGlmICh0eXBlb2YgbmFtZSAhPT0gXCJzdHJpbmdcIilcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgdmFyIGFkbSA9IGdldEFkbSh0YXJnZXQpO1xuICAgICAgICBhZG0ucmVtb3ZlKG5hbWUpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9LFxuICAgIG93bktleXM6IGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgICAgICAgdmFyIGFkbSA9IGdldEFkbSh0YXJnZXQpO1xuICAgICAgICBhZG0ua2V5c0F0b20ucmVwb3J0T2JzZXJ2ZWQoKTtcbiAgICAgICAgcmV0dXJuIFJlZmxlY3Qub3duS2V5cyh0YXJnZXQpO1xuICAgIH0sXG4gICAgcHJldmVudEV4dGVuc2lvbnM6IGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgICAgICAgZmFpbCQkMShcIkR5bmFtaWMgb2JzZXJ2YWJsZSBvYmplY3RzIGNhbm5vdCBiZSBmcm96ZW5cIik7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59O1xuZnVuY3Rpb24gY3JlYXRlRHluYW1pY09ic2VydmFibGVPYmplY3QkJDEoYmFzZSkge1xuICAgIHZhciBwcm94eSA9IG5ldyBQcm94eShiYXNlLCBvYmplY3RQcm94eVRyYXBzKTtcbiAgICBiYXNlWyRtb2J4JCQxXS5wcm94eSA9IHByb3h5O1xuICAgIHJldHVybiBwcm94eTtcbn1cblxuZnVuY3Rpb24gaGFzSW50ZXJjZXB0b3JzJCQxKGludGVyY2VwdGFibGUpIHtcbiAgICByZXR1cm4gaW50ZXJjZXB0YWJsZS5pbnRlcmNlcHRvcnMgIT09IHVuZGVmaW5lZCAmJiBpbnRlcmNlcHRhYmxlLmludGVyY2VwdG9ycy5sZW5ndGggPiAwO1xufVxuZnVuY3Rpb24gcmVnaXN0ZXJJbnRlcmNlcHRvciQkMShpbnRlcmNlcHRhYmxlLCBoYW5kbGVyKSB7XG4gICAgdmFyIGludGVyY2VwdG9ycyA9IGludGVyY2VwdGFibGUuaW50ZXJjZXB0b3JzIHx8IChpbnRlcmNlcHRhYmxlLmludGVyY2VwdG9ycyA9IFtdKTtcbiAgICBpbnRlcmNlcHRvcnMucHVzaChoYW5kbGVyKTtcbiAgICByZXR1cm4gb25jZSQkMShmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBpZHggPSBpbnRlcmNlcHRvcnMuaW5kZXhPZihoYW5kbGVyKTtcbiAgICAgICAgaWYgKGlkeCAhPT0gLTEpXG4gICAgICAgICAgICBpbnRlcmNlcHRvcnMuc3BsaWNlKGlkeCwgMSk7XG4gICAgfSk7XG59XG5mdW5jdGlvbiBpbnRlcmNlcHRDaGFuZ2UkJDEoaW50ZXJjZXB0YWJsZSwgY2hhbmdlKSB7XG4gICAgdmFyIHByZXZVID0gdW50cmFja2VkU3RhcnQkJDEoKTtcbiAgICB0cnkge1xuICAgICAgICB2YXIgaW50ZXJjZXB0b3JzID0gaW50ZXJjZXB0YWJsZS5pbnRlcmNlcHRvcnM7XG4gICAgICAgIGlmIChpbnRlcmNlcHRvcnMpXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbCA9IGludGVyY2VwdG9ycy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgICAgICBjaGFuZ2UgPSBpbnRlcmNlcHRvcnNbaV0oY2hhbmdlKTtcbiAgICAgICAgICAgICAgICBpbnZhcmlhbnQkJDEoIWNoYW5nZSB8fCBjaGFuZ2UudHlwZSwgXCJJbnRlcmNlcHQgaGFuZGxlcnMgc2hvdWxkIHJldHVybiBub3RoaW5nIG9yIGEgY2hhbmdlIG9iamVjdFwiKTtcbiAgICAgICAgICAgICAgICBpZiAoIWNoYW5nZSlcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIHJldHVybiBjaGFuZ2U7XG4gICAgfVxuICAgIGZpbmFsbHkge1xuICAgICAgICB1bnRyYWNrZWRFbmQkJDEocHJldlUpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gaGFzTGlzdGVuZXJzJCQxKGxpc3RlbmFibGUpIHtcbiAgICByZXR1cm4gbGlzdGVuYWJsZS5jaGFuZ2VMaXN0ZW5lcnMgIT09IHVuZGVmaW5lZCAmJiBsaXN0ZW5hYmxlLmNoYW5nZUxpc3RlbmVycy5sZW5ndGggPiAwO1xufVxuZnVuY3Rpb24gcmVnaXN0ZXJMaXN0ZW5lciQkMShsaXN0ZW5hYmxlLCBoYW5kbGVyKSB7XG4gICAgdmFyIGxpc3RlbmVycyA9IGxpc3RlbmFibGUuY2hhbmdlTGlzdGVuZXJzIHx8IChsaXN0ZW5hYmxlLmNoYW5nZUxpc3RlbmVycyA9IFtdKTtcbiAgICBsaXN0ZW5lcnMucHVzaChoYW5kbGVyKTtcbiAgICByZXR1cm4gb25jZSQkMShmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBpZHggPSBsaXN0ZW5lcnMuaW5kZXhPZihoYW5kbGVyKTtcbiAgICAgICAgaWYgKGlkeCAhPT0gLTEpXG4gICAgICAgICAgICBsaXN0ZW5lcnMuc3BsaWNlKGlkeCwgMSk7XG4gICAgfSk7XG59XG5mdW5jdGlvbiBub3RpZnlMaXN0ZW5lcnMkJDEobGlzdGVuYWJsZSwgY2hhbmdlKSB7XG4gICAgdmFyIHByZXZVID0gdW50cmFja2VkU3RhcnQkJDEoKTtcbiAgICB2YXIgbGlzdGVuZXJzID0gbGlzdGVuYWJsZS5jaGFuZ2VMaXN0ZW5lcnM7XG4gICAgaWYgKCFsaXN0ZW5lcnMpXG4gICAgICAgIHJldHVybjtcbiAgICBsaXN0ZW5lcnMgPSBsaXN0ZW5lcnMuc2xpY2UoKTtcbiAgICBmb3IgKHZhciBpID0gMCwgbCA9IGxpc3RlbmVycy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgbGlzdGVuZXJzW2ldKGNoYW5nZSk7XG4gICAgfVxuICAgIHVudHJhY2tlZEVuZCQkMShwcmV2VSk7XG59XG5cbnZhciBNQVhfU1BMSUNFX1NJWkUgPSAxMDAwMDsgLy8gU2VlIGUuZy4gaHR0cHM6Ly9naXRodWIuY29tL21vYnhqcy9tb2J4L2lzc3Vlcy84NTlcbnZhciBhcnJheVRyYXBzID0ge1xuICAgIGdldDogZnVuY3Rpb24gKHRhcmdldCwgbmFtZSkge1xuICAgICAgICBpZiAobmFtZSA9PT0gJG1vYngkJDEpXG4gICAgICAgICAgICByZXR1cm4gdGFyZ2V0WyRtb2J4JCQxXTtcbiAgICAgICAgaWYgKG5hbWUgPT09IFwibGVuZ3RoXCIpXG4gICAgICAgICAgICByZXR1cm4gdGFyZ2V0WyRtb2J4JCQxXS5nZXRBcnJheUxlbmd0aCgpO1xuICAgICAgICBpZiAodHlwZW9mIG5hbWUgPT09IFwibnVtYmVyXCIpIHtcbiAgICAgICAgICAgIHJldHVybiBhcnJheUV4dGVuc2lvbnMuZ2V0LmNhbGwodGFyZ2V0LCBuYW1lKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIG5hbWUgPT09IFwic3RyaW5nXCIgJiYgIWlzTmFOKG5hbWUpKSB7XG4gICAgICAgICAgICByZXR1cm4gYXJyYXlFeHRlbnNpb25zLmdldC5jYWxsKHRhcmdldCwgcGFyc2VJbnQobmFtZSkpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChhcnJheUV4dGVuc2lvbnMuaGFzT3duUHJvcGVydHkobmFtZSkpIHtcbiAgICAgICAgICAgIHJldHVybiBhcnJheUV4dGVuc2lvbnNbbmFtZV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRhcmdldFtuYW1lXTtcbiAgICB9LFxuICAgIHNldDogZnVuY3Rpb24gKHRhcmdldCwgbmFtZSwgdmFsdWUpIHtcbiAgICAgICAgaWYgKG5hbWUgPT09IFwibGVuZ3RoXCIpIHtcbiAgICAgICAgICAgIHRhcmdldFskbW9ieCQkMV0uc2V0QXJyYXlMZW5ndGgodmFsdWUpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiBuYW1lID09PSBcIm51bWJlclwiKSB7XG4gICAgICAgICAgICBhcnJheUV4dGVuc2lvbnMuc2V0LmNhbGwodGFyZ2V0LCBuYW1lLCB2YWx1ZSk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWlzTmFOKG5hbWUpKSB7XG4gICAgICAgICAgICBhcnJheUV4dGVuc2lvbnMuc2V0LmNhbGwodGFyZ2V0LCBwYXJzZUludChuYW1lKSwgdmFsdWUpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0sXG4gICAgcHJldmVudEV4dGVuc2lvbnM6IGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgICAgICAgZmFpbCQkMShcIk9ic2VydmFibGUgYXJyYXlzIGNhbm5vdCBiZSBmcm96ZW5cIik7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59O1xuZnVuY3Rpb24gY3JlYXRlT2JzZXJ2YWJsZUFycmF5JCQxKGluaXRpYWxWYWx1ZXMsIGVuaGFuY2VyLCBuYW1lLCBvd25lZCkge1xuICAgIGlmIChuYW1lID09PSB2b2lkIDApIHsgbmFtZSA9IFwiT2JzZXJ2YWJsZUFycmF5QFwiICsgZ2V0TmV4dElkJCQxKCk7IH1cbiAgICBpZiAob3duZWQgPT09IHZvaWQgMCkgeyBvd25lZCA9IGZhbHNlOyB9XG4gICAgdmFyIGFkbSA9IG5ldyBPYnNlcnZhYmxlQXJyYXlBZG1pbmlzdHJhdGlvbihuYW1lLCBlbmhhbmNlciwgb3duZWQpO1xuICAgIGFkZEhpZGRlbkZpbmFsUHJvcCQkMShhZG0udmFsdWVzLCAkbW9ieCQkMSwgYWRtKTtcbiAgICB2YXIgcHJveHkgPSBuZXcgUHJveHkoYWRtLnZhbHVlcywgYXJyYXlUcmFwcyk7XG4gICAgYWRtLnByb3h5ID0gcHJveHk7XG4gICAgaWYgKGluaXRpYWxWYWx1ZXMgJiYgaW5pdGlhbFZhbHVlcy5sZW5ndGgpIHtcbiAgICAgICAgdmFyIHByZXYgPSBhbGxvd1N0YXRlQ2hhbmdlc1N0YXJ0JCQxKHRydWUpO1xuICAgICAgICBhZG0uc3BsaWNlV2l0aEFycmF5KDAsIDAsIGluaXRpYWxWYWx1ZXMpO1xuICAgICAgICBhbGxvd1N0YXRlQ2hhbmdlc0VuZCQkMShwcmV2KTtcbiAgICB9XG4gICAgcmV0dXJuIHByb3h5O1xufVxudmFyIE9ic2VydmFibGVBcnJheUFkbWluaXN0cmF0aW9uID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE9ic2VydmFibGVBcnJheUFkbWluaXN0cmF0aW9uKG5hbWUsIGVuaGFuY2VyLCBvd25lZCkge1xuICAgICAgICB0aGlzLm93bmVkID0gb3duZWQ7XG4gICAgICAgIHRoaXMudmFsdWVzID0gW107XG4gICAgICAgIHRoaXMucHJveHkgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMubGFzdEtub3duTGVuZ3RoID0gMDtcbiAgICAgICAgdGhpcy5hdG9tID0gbmV3IEF0b20kJDEobmFtZSB8fCBcIk9ic2VydmFibGVBcnJheUBcIiArIGdldE5leHRJZCQkMSgpKTtcbiAgICAgICAgdGhpcy5lbmhhbmNlciA9IGZ1bmN0aW9uIChuZXdWLCBvbGRWKSB7IHJldHVybiBlbmhhbmNlcihuZXdWLCBvbGRWLCBuYW1lICsgXCJbLi5dXCIpOyB9O1xuICAgIH1cbiAgICBPYnNlcnZhYmxlQXJyYXlBZG1pbmlzdHJhdGlvbi5wcm90b3R5cGUuZGVoYW5jZVZhbHVlID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIGlmICh0aGlzLmRlaGFuY2VyICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kZWhhbmNlcih2YWx1ZSk7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9O1xuICAgIE9ic2VydmFibGVBcnJheUFkbWluaXN0cmF0aW9uLnByb3RvdHlwZS5kZWhhbmNlVmFsdWVzID0gZnVuY3Rpb24gKHZhbHVlcyQkMSkge1xuICAgICAgICBpZiAodGhpcy5kZWhhbmNlciAhPT0gdW5kZWZpbmVkICYmIHZhbHVlcyQkMS5sZW5ndGggPiAwKVxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlcyQkMS5tYXAodGhpcy5kZWhhbmNlcik7XG4gICAgICAgIHJldHVybiB2YWx1ZXMkJDE7XG4gICAgfTtcbiAgICBPYnNlcnZhYmxlQXJyYXlBZG1pbmlzdHJhdGlvbi5wcm90b3R5cGUuaW50ZXJjZXB0ID0gZnVuY3Rpb24gKGhhbmRsZXIpIHtcbiAgICAgICAgcmV0dXJuIHJlZ2lzdGVySW50ZXJjZXB0b3IkJDEodGhpcywgaGFuZGxlcik7XG4gICAgfTtcbiAgICBPYnNlcnZhYmxlQXJyYXlBZG1pbmlzdHJhdGlvbi5wcm90b3R5cGUub2JzZXJ2ZSA9IGZ1bmN0aW9uIChsaXN0ZW5lciwgZmlyZUltbWVkaWF0ZWx5KSB7XG4gICAgICAgIGlmIChmaXJlSW1tZWRpYXRlbHkgPT09IHZvaWQgMCkgeyBmaXJlSW1tZWRpYXRlbHkgPSBmYWxzZTsgfVxuICAgICAgICBpZiAoZmlyZUltbWVkaWF0ZWx5KSB7XG4gICAgICAgICAgICBsaXN0ZW5lcih7XG4gICAgICAgICAgICAgICAgb2JqZWN0OiB0aGlzLnByb3h5LFxuICAgICAgICAgICAgICAgIHR5cGU6IFwic3BsaWNlXCIsXG4gICAgICAgICAgICAgICAgaW5kZXg6IDAsXG4gICAgICAgICAgICAgICAgYWRkZWQ6IHRoaXMudmFsdWVzLnNsaWNlKCksXG4gICAgICAgICAgICAgICAgYWRkZWRDb3VudDogdGhpcy52YWx1ZXMubGVuZ3RoLFxuICAgICAgICAgICAgICAgIHJlbW92ZWQ6IFtdLFxuICAgICAgICAgICAgICAgIHJlbW92ZWRDb3VudDogMFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlZ2lzdGVyTGlzdGVuZXIkJDEodGhpcywgbGlzdGVuZXIpO1xuICAgIH07XG4gICAgT2JzZXJ2YWJsZUFycmF5QWRtaW5pc3RyYXRpb24ucHJvdG90eXBlLmdldEFycmF5TGVuZ3RoID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmF0b20ucmVwb3J0T2JzZXJ2ZWQoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsdWVzLmxlbmd0aDtcbiAgICB9O1xuICAgIE9ic2VydmFibGVBcnJheUFkbWluaXN0cmF0aW9uLnByb3RvdHlwZS5zZXRBcnJheUxlbmd0aCA9IGZ1bmN0aW9uIChuZXdMZW5ndGgpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBuZXdMZW5ndGggIT09IFwibnVtYmVyXCIgfHwgbmV3TGVuZ3RoIDwgMClcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlttb2J4LmFycmF5XSBPdXQgb2YgcmFuZ2U6IFwiICsgbmV3TGVuZ3RoKTtcbiAgICAgICAgdmFyIGN1cnJlbnRMZW5ndGggPSB0aGlzLnZhbHVlcy5sZW5ndGg7XG4gICAgICAgIGlmIChuZXdMZW5ndGggPT09IGN1cnJlbnRMZW5ndGgpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGVsc2UgaWYgKG5ld0xlbmd0aCA+IGN1cnJlbnRMZW5ndGgpIHtcbiAgICAgICAgICAgIHZhciBuZXdJdGVtcyA9IG5ldyBBcnJheShuZXdMZW5ndGggLSBjdXJyZW50TGVuZ3RoKTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbmV3TGVuZ3RoIC0gY3VycmVudExlbmd0aDsgaSsrKVxuICAgICAgICAgICAgICAgIG5ld0l0ZW1zW2ldID0gdW5kZWZpbmVkOyAvLyBObyBBcnJheS5maWxsIGV2ZXJ5d2hlcmUuLi5cbiAgICAgICAgICAgIHRoaXMuc3BsaWNlV2l0aEFycmF5KGN1cnJlbnRMZW5ndGgsIDAsIG5ld0l0ZW1zKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgICAgICB0aGlzLnNwbGljZVdpdGhBcnJheShuZXdMZW5ndGgsIGN1cnJlbnRMZW5ndGggLSBuZXdMZW5ndGgpO1xuICAgIH07XG4gICAgT2JzZXJ2YWJsZUFycmF5QWRtaW5pc3RyYXRpb24ucHJvdG90eXBlLnVwZGF0ZUFycmF5TGVuZ3RoID0gZnVuY3Rpb24gKG9sZExlbmd0aCwgZGVsdGEpIHtcbiAgICAgICAgaWYgKG9sZExlbmd0aCAhPT0gdGhpcy5sYXN0S25vd25MZW5ndGgpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJbbW9ieF0gTW9kaWZpY2F0aW9uIGV4Y2VwdGlvbjogdGhlIGludGVybmFsIHN0cnVjdHVyZSBvZiBhbiBvYnNlcnZhYmxlIGFycmF5IHdhcyBjaGFuZ2VkLlwiKTtcbiAgICAgICAgdGhpcy5sYXN0S25vd25MZW5ndGggKz0gZGVsdGE7XG4gICAgfTtcbiAgICBPYnNlcnZhYmxlQXJyYXlBZG1pbmlzdHJhdGlvbi5wcm90b3R5cGUuc3BsaWNlV2l0aEFycmF5ID0gZnVuY3Rpb24gKGluZGV4LCBkZWxldGVDb3VudCwgbmV3SXRlbXMpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgY2hlY2tJZlN0YXRlTW9kaWZpY2F0aW9uc0FyZUFsbG93ZWQkJDEodGhpcy5hdG9tKTtcbiAgICAgICAgdmFyIGxlbmd0aCA9IHRoaXMudmFsdWVzLmxlbmd0aDtcbiAgICAgICAgaWYgKGluZGV4ID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICBpbmRleCA9IDA7XG4gICAgICAgIGVsc2UgaWYgKGluZGV4ID4gbGVuZ3RoKVxuICAgICAgICAgICAgaW5kZXggPSBsZW5ndGg7XG4gICAgICAgIGVsc2UgaWYgKGluZGV4IDwgMClcbiAgICAgICAgICAgIGluZGV4ID0gTWF0aC5tYXgoMCwgbGVuZ3RoICsgaW5kZXgpO1xuICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSlcbiAgICAgICAgICAgIGRlbGV0ZUNvdW50ID0gbGVuZ3RoIC0gaW5kZXg7XG4gICAgICAgIGVsc2UgaWYgKGRlbGV0ZUNvdW50ID09PSB1bmRlZmluZWQgfHwgZGVsZXRlQ291bnQgPT09IG51bGwpXG4gICAgICAgICAgICBkZWxldGVDb3VudCA9IDA7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIGRlbGV0ZUNvdW50ID0gTWF0aC5tYXgoMCwgTWF0aC5taW4oZGVsZXRlQ291bnQsIGxlbmd0aCAtIGluZGV4KSk7XG4gICAgICAgIGlmIChuZXdJdGVtcyA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgbmV3SXRlbXMgPSBFTVBUWV9BUlJBWSQkMTtcbiAgICAgICAgaWYgKGhhc0ludGVyY2VwdG9ycyQkMSh0aGlzKSkge1xuICAgICAgICAgICAgdmFyIGNoYW5nZSA9IGludGVyY2VwdENoYW5nZSQkMSh0aGlzLCB7XG4gICAgICAgICAgICAgICAgb2JqZWN0OiB0aGlzLnByb3h5LFxuICAgICAgICAgICAgICAgIHR5cGU6IFwic3BsaWNlXCIsXG4gICAgICAgICAgICAgICAgaW5kZXg6IGluZGV4LFxuICAgICAgICAgICAgICAgIHJlbW92ZWRDb3VudDogZGVsZXRlQ291bnQsXG4gICAgICAgICAgICAgICAgYWRkZWQ6IG5ld0l0ZW1zXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmICghY2hhbmdlKVxuICAgICAgICAgICAgICAgIHJldHVybiBFTVBUWV9BUlJBWSQkMTtcbiAgICAgICAgICAgIGRlbGV0ZUNvdW50ID0gY2hhbmdlLnJlbW92ZWRDb3VudDtcbiAgICAgICAgICAgIG5ld0l0ZW1zID0gY2hhbmdlLmFkZGVkO1xuICAgICAgICB9XG4gICAgICAgIG5ld0l0ZW1zID0gbmV3SXRlbXMubGVuZ3RoID09PSAwID8gbmV3SXRlbXMgOiBuZXdJdGVtcy5tYXAoZnVuY3Rpb24gKHYpIHsgcmV0dXJuIF90aGlzLmVuaGFuY2VyKHYsIHVuZGVmaW5lZCk7IH0pO1xuICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gICAgICAgICAgICB2YXIgbGVuZ3RoRGVsdGEgPSBuZXdJdGVtcy5sZW5ndGggLSBkZWxldGVDb3VudDtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlQXJyYXlMZW5ndGgobGVuZ3RoLCBsZW5ndGhEZWx0YSk7IC8vIGNoZWNrcyBpZiBpbnRlcm5hbCBhcnJheSB3YXNuJ3QgbW9kaWZpZWRcbiAgICAgICAgfVxuICAgICAgICB2YXIgcmVzID0gdGhpcy5zcGxpY2VJdGVtc0ludG9WYWx1ZXMoaW5kZXgsIGRlbGV0ZUNvdW50LCBuZXdJdGVtcyk7XG4gICAgICAgIGlmIChkZWxldGVDb3VudCAhPT0gMCB8fCBuZXdJdGVtcy5sZW5ndGggIT09IDApXG4gICAgICAgICAgICB0aGlzLm5vdGlmeUFycmF5U3BsaWNlKGluZGV4LCBuZXdJdGVtcywgcmVzKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGVoYW5jZVZhbHVlcyhyZXMpO1xuICAgIH07XG4gICAgT2JzZXJ2YWJsZUFycmF5QWRtaW5pc3RyYXRpb24ucHJvdG90eXBlLnNwbGljZUl0ZW1zSW50b1ZhbHVlcyA9IGZ1bmN0aW9uIChpbmRleCwgZGVsZXRlQ291bnQsIG5ld0l0ZW1zKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgaWYgKG5ld0l0ZW1zLmxlbmd0aCA8IE1BWF9TUExJQ0VfU0laRSkge1xuICAgICAgICAgICAgcmV0dXJuIChfYSA9IHRoaXMudmFsdWVzKS5zcGxpY2UuYXBwbHkoX2EsIF9fc3ByZWFkKFtpbmRleCwgZGVsZXRlQ291bnRdLCBuZXdJdGVtcykpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdmFyIHJlcyA9IHRoaXMudmFsdWVzLnNsaWNlKGluZGV4LCBpbmRleCArIGRlbGV0ZUNvdW50KTtcbiAgICAgICAgICAgIHRoaXMudmFsdWVzID0gdGhpcy52YWx1ZXNcbiAgICAgICAgICAgICAgICAuc2xpY2UoMCwgaW5kZXgpXG4gICAgICAgICAgICAgICAgLmNvbmNhdChuZXdJdGVtcywgdGhpcy52YWx1ZXMuc2xpY2UoaW5kZXggKyBkZWxldGVDb3VudCkpO1xuICAgICAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgICAgfVxuICAgIH07XG4gICAgT2JzZXJ2YWJsZUFycmF5QWRtaW5pc3RyYXRpb24ucHJvdG90eXBlLm5vdGlmeUFycmF5Q2hpbGRVcGRhdGUgPSBmdW5jdGlvbiAoaW5kZXgsIG5ld1ZhbHVlLCBvbGRWYWx1ZSkge1xuICAgICAgICB2YXIgbm90aWZ5U3B5ID0gIXRoaXMub3duZWQgJiYgaXNTcHlFbmFibGVkJCQxKCk7XG4gICAgICAgIHZhciBub3RpZnkgPSBoYXNMaXN0ZW5lcnMkJDEodGhpcyk7XG4gICAgICAgIHZhciBjaGFuZ2UgPSBub3RpZnkgfHwgbm90aWZ5U3B5XG4gICAgICAgICAgICA/IHtcbiAgICAgICAgICAgICAgICBvYmplY3Q6IHRoaXMucHJveHksXG4gICAgICAgICAgICAgICAgdHlwZTogXCJ1cGRhdGVcIixcbiAgICAgICAgICAgICAgICBpbmRleDogaW5kZXgsXG4gICAgICAgICAgICAgICAgbmV3VmFsdWU6IG5ld1ZhbHVlLFxuICAgICAgICAgICAgICAgIG9sZFZhbHVlOiBvbGRWYWx1ZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgOiBudWxsO1xuICAgICAgICAvLyBUaGUgcmVhc29uIHdoeSB0aGlzIGlzIG9uIHJpZ2h0IGhhbmQgc2lkZSBoZXJlIChhbmQgbm90IGFib3ZlKSwgaXMgdGhpcyB3YXkgdGhlIHVnbGlmaWVyIHdpbGwgZHJvcCBpdCwgYnV0IGl0IHdvbid0XG4gICAgICAgIC8vIGNhdXNlIGFueSBydW50aW1lIG92ZXJoZWFkIGluIGRldmVsb3BtZW50IG1vZGUgd2l0aG91dCBOT0RFX0VOViBzZXQsIHVubGVzcyBzcHlpbmcgaXMgZW5hYmxlZFxuICAgICAgICBpZiAobm90aWZ5U3B5ICYmIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIilcbiAgICAgICAgICAgIHNweVJlcG9ydFN0YXJ0JCQxKF9fYXNzaWduKHt9LCBjaGFuZ2UsIHsgbmFtZTogdGhpcy5hdG9tLm5hbWUgfSkpO1xuICAgICAgICB0aGlzLmF0b20ucmVwb3J0Q2hhbmdlZCgpO1xuICAgICAgICBpZiAobm90aWZ5KVxuICAgICAgICAgICAgbm90aWZ5TGlzdGVuZXJzJCQxKHRoaXMsIGNoYW5nZSk7XG4gICAgICAgIGlmIChub3RpZnlTcHkgJiYgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKVxuICAgICAgICAgICAgc3B5UmVwb3J0RW5kJCQxKCk7XG4gICAgfTtcbiAgICBPYnNlcnZhYmxlQXJyYXlBZG1pbmlzdHJhdGlvbi5wcm90b3R5cGUubm90aWZ5QXJyYXlTcGxpY2UgPSBmdW5jdGlvbiAoaW5kZXgsIGFkZGVkLCByZW1vdmVkKSB7XG4gICAgICAgIHZhciBub3RpZnlTcHkgPSAhdGhpcy5vd25lZCAmJiBpc1NweUVuYWJsZWQkJDEoKTtcbiAgICAgICAgdmFyIG5vdGlmeSA9IGhhc0xpc3RlbmVycyQkMSh0aGlzKTtcbiAgICAgICAgdmFyIGNoYW5nZSA9IG5vdGlmeSB8fCBub3RpZnlTcHlcbiAgICAgICAgICAgID8ge1xuICAgICAgICAgICAgICAgIG9iamVjdDogdGhpcy5wcm94eSxcbiAgICAgICAgICAgICAgICB0eXBlOiBcInNwbGljZVwiLFxuICAgICAgICAgICAgICAgIGluZGV4OiBpbmRleCxcbiAgICAgICAgICAgICAgICByZW1vdmVkOiByZW1vdmVkLFxuICAgICAgICAgICAgICAgIGFkZGVkOiBhZGRlZCxcbiAgICAgICAgICAgICAgICByZW1vdmVkQ291bnQ6IHJlbW92ZWQubGVuZ3RoLFxuICAgICAgICAgICAgICAgIGFkZGVkQ291bnQ6IGFkZGVkLmxlbmd0aFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgOiBudWxsO1xuICAgICAgICBpZiAobm90aWZ5U3B5ICYmIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIilcbiAgICAgICAgICAgIHNweVJlcG9ydFN0YXJ0JCQxKF9fYXNzaWduKHt9LCBjaGFuZ2UsIHsgbmFtZTogdGhpcy5hdG9tLm5hbWUgfSkpO1xuICAgICAgICB0aGlzLmF0b20ucmVwb3J0Q2hhbmdlZCgpO1xuICAgICAgICAvLyBjb25mb3JtOiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9BcnJheS9vYnNlcnZlXG4gICAgICAgIGlmIChub3RpZnkpXG4gICAgICAgICAgICBub3RpZnlMaXN0ZW5lcnMkJDEodGhpcywgY2hhbmdlKTtcbiAgICAgICAgaWYgKG5vdGlmeVNweSAmJiBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpXG4gICAgICAgICAgICBzcHlSZXBvcnRFbmQkJDEoKTtcbiAgICB9O1xuICAgIHJldHVybiBPYnNlcnZhYmxlQXJyYXlBZG1pbmlzdHJhdGlvbjtcbn0oKSk7XG52YXIgYXJyYXlFeHRlbnNpb25zID0ge1xuICAgIGludGVyY2VwdDogZnVuY3Rpb24gKGhhbmRsZXIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXNbJG1vYngkJDFdLmludGVyY2VwdChoYW5kbGVyKTtcbiAgICB9LFxuICAgIG9ic2VydmU6IGZ1bmN0aW9uIChsaXN0ZW5lciwgZmlyZUltbWVkaWF0ZWx5KSB7XG4gICAgICAgIGlmIChmaXJlSW1tZWRpYXRlbHkgPT09IHZvaWQgMCkgeyBmaXJlSW1tZWRpYXRlbHkgPSBmYWxzZTsgfVxuICAgICAgICB2YXIgYWRtID0gdGhpc1skbW9ieCQkMV07XG4gICAgICAgIHJldHVybiBhZG0ub2JzZXJ2ZShsaXN0ZW5lciwgZmlyZUltbWVkaWF0ZWx5KTtcbiAgICB9LFxuICAgIGNsZWFyOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNwbGljZSgwKTtcbiAgICB9LFxuICAgIHJlcGxhY2U6IGZ1bmN0aW9uIChuZXdJdGVtcykge1xuICAgICAgICB2YXIgYWRtID0gdGhpc1skbW9ieCQkMV07XG4gICAgICAgIHJldHVybiBhZG0uc3BsaWNlV2l0aEFycmF5KDAsIGFkbS52YWx1ZXMubGVuZ3RoLCBuZXdJdGVtcyk7XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiBDb252ZXJ0cyB0aGlzIGFycmF5IGJhY2sgdG8gYSAoc2hhbGxvdykgamF2YXNjcmlwdCBzdHJ1Y3R1cmUuXG4gICAgICogRm9yIGEgZGVlcCBjbG9uZSB1c2UgbW9ieC50b0pTXG4gICAgICovXG4gICAgdG9KUzogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zbGljZSgpO1xuICAgIH0sXG4gICAgdG9KU09OOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vIFVzZWQgYnkgSlNPTi5zdHJpbmdpZnlcbiAgICAgICAgcmV0dXJuIHRoaXMudG9KUygpO1xuICAgIH0sXG4gICAgLypcbiAgICAgKiBmdW5jdGlvbnMgdGhhdCBkbyBhbHRlciB0aGUgaW50ZXJuYWwgc3RydWN0dXJlIG9mIHRoZSBhcnJheSwgKGJhc2VkIG9uIGxpYi5lczYuZC50cylcbiAgICAgKiBzaW5jZSB0aGVzZSBmdW5jdGlvbnMgYWx0ZXIgdGhlIGlubmVyIHN0cnVjdHVyZSBvZiB0aGUgYXJyYXksIHRoZSBoYXZlIHNpZGUgZWZmZWN0cy5cbiAgICAgKiBCZWNhdXNlIHRoZSBoYXZlIHNpZGUgZWZmZWN0cywgdGhleSBzaG91bGQgbm90IGJlIHVzZWQgaW4gY29tcHV0ZWQgZnVuY3Rpb24sXG4gICAgICogYW5kIGZvciB0aGF0IHJlYXNvbiB0aGUgZG8gbm90IGNhbGwgZGVwZW5kZW5jeVN0YXRlLm5vdGlmeU9ic2VydmVkXG4gICAgICovXG4gICAgc3BsaWNlOiBmdW5jdGlvbiAoaW5kZXgsIGRlbGV0ZUNvdW50KSB7XG4gICAgICAgIHZhciBuZXdJdGVtcyA9IFtdO1xuICAgICAgICBmb3IgKHZhciBfaSA9IDI7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgbmV3SXRlbXNbX2kgLSAyXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGFkbSA9IHRoaXNbJG1vYngkJDFdO1xuICAgICAgICBzd2l0Y2ggKGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgcmV0dXJuIGFkbS5zcGxpY2VXaXRoQXJyYXkoaW5kZXgpO1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIHJldHVybiBhZG0uc3BsaWNlV2l0aEFycmF5KGluZGV4LCBkZWxldGVDb3VudCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFkbS5zcGxpY2VXaXRoQXJyYXkoaW5kZXgsIGRlbGV0ZUNvdW50LCBuZXdJdGVtcyk7XG4gICAgfSxcbiAgICBzcGxpY2VXaXRoQXJyYXk6IGZ1bmN0aW9uIChpbmRleCwgZGVsZXRlQ291bnQsIG5ld0l0ZW1zKSB7XG4gICAgICAgIHZhciBhZG0gPSB0aGlzWyRtb2J4JCQxXTtcbiAgICAgICAgcmV0dXJuIGFkbS5zcGxpY2VXaXRoQXJyYXkoaW5kZXgsIGRlbGV0ZUNvdW50LCBuZXdJdGVtcyk7XG4gICAgfSxcbiAgICBwdXNoOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBpdGVtcyA9IFtdO1xuICAgICAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgaXRlbXNbX2ldID0gYXJndW1lbnRzW19pXTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgYWRtID0gdGhpc1skbW9ieCQkMV07XG4gICAgICAgIGFkbS5zcGxpY2VXaXRoQXJyYXkoYWRtLnZhbHVlcy5sZW5ndGgsIDAsIGl0ZW1zKTtcbiAgICAgICAgcmV0dXJuIGFkbS52YWx1ZXMubGVuZ3RoO1xuICAgIH0sXG4gICAgcG9wOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNwbGljZShNYXRoLm1heCh0aGlzWyRtb2J4JCQxXS52YWx1ZXMubGVuZ3RoIC0gMSwgMCksIDEpWzBdO1xuICAgIH0sXG4gICAgc2hpZnQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3BsaWNlKDAsIDEpWzBdO1xuICAgIH0sXG4gICAgdW5zaGlmdDogZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgaXRlbXMgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgIGl0ZW1zW19pXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGFkbSA9IHRoaXNbJG1vYngkJDFdO1xuICAgICAgICBhZG0uc3BsaWNlV2l0aEFycmF5KDAsIDAsIGl0ZW1zKTtcbiAgICAgICAgcmV0dXJuIGFkbS52YWx1ZXMubGVuZ3RoO1xuICAgIH0sXG4gICAgcmV2ZXJzZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyByZXZlcnNlIGJ5IGRlZmF1bHQgbXV0YXRlcyBpbiBwbGFjZSBiZWZvcmUgcmV0dXJuaW5nIHRoZSByZXN1bHRcbiAgICAgICAgLy8gd2hpY2ggbWFrZXMgaXQgYm90aCBhICdkZXJpdmF0aW9uJyBhbmQgYSAnbXV0YXRpb24nLlxuICAgICAgICAvLyBzbyB3ZSBkZXZpYXRlIGZyb20gdGhlIGRlZmF1bHQgYW5kIGp1c3QgbWFrZSBpdCBhbiBkZXJ2aXRhdGlvblxuICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oXCJbbW9ieF0gYG9ic2VydmFibGVBcnJheS5yZXZlcnNlKClgIHdpbGwgbm90IHVwZGF0ZSB0aGUgYXJyYXkgaW4gcGxhY2UuIFVzZSBgb2JzZXJ2YWJsZUFycmF5LnNsaWNlKCkucmV2ZXJzZSgpYCB0byBzdXByZXNzIHRoaXMgd2FybmluZyBhbmQgcGVyZm9ybSB0aGUgb3BlcmF0aW9uIG9uIGEgY29weSwgb3IgYG9ic2VydmFibGVBcnJheS5yZXBsYWNlKG9ic2VydmFibGVBcnJheS5zbGljZSgpLnJldmVyc2UoKSlgIHRvIHJldmVyc2UgJiB1cGRhdGUgaW4gcGxhY2VcIik7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGNsb25lID0gdGhpcy5zbGljZSgpO1xuICAgICAgICByZXR1cm4gY2xvbmUucmV2ZXJzZS5hcHBseShjbG9uZSwgYXJndW1lbnRzKTtcbiAgICB9LFxuICAgIHNvcnQ6IGZ1bmN0aW9uIChjb21wYXJlRm4pIHtcbiAgICAgICAgLy8gc29ydCBieSBkZWZhdWx0IG11dGF0ZXMgaW4gcGxhY2UgYmVmb3JlIHJldHVybmluZyB0aGUgcmVzdWx0XG4gICAgICAgIC8vIHdoaWNoIGdvZXMgYWdhaW5zdCBhbGwgZ29vZCBwcmFjdGljZXMuIExldCdzIG5vdCBjaGFuZ2UgdGhlIGFycmF5IGluIHBsYWNlIVxuICAgICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oXCJbbW9ieF0gYG9ic2VydmFibGVBcnJheS5zb3J0KClgIHdpbGwgbm90IHVwZGF0ZSB0aGUgYXJyYXkgaW4gcGxhY2UuIFVzZSBgb2JzZXJ2YWJsZUFycmF5LnNsaWNlKCkuc29ydCgpYCB0byBzdXByZXNzIHRoaXMgd2FybmluZyBhbmQgcGVyZm9ybSB0aGUgb3BlcmF0aW9uIG9uIGEgY29weSwgb3IgYG9ic2VydmFibGVBcnJheS5yZXBsYWNlKG9ic2VydmFibGVBcnJheS5zbGljZSgpLnNvcnQoKSlgIHRvIHNvcnQgJiB1cGRhdGUgaW4gcGxhY2VcIik7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGNsb25lID0gdGhpcy5zbGljZSgpO1xuICAgICAgICByZXR1cm4gY2xvbmUuc29ydC5hcHBseShjbG9uZSwgYXJndW1lbnRzKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHZhciBhZG0gPSB0aGlzWyRtb2J4JCQxXTtcbiAgICAgICAgdmFyIGlkeCA9IGFkbS5kZWhhbmNlVmFsdWVzKGFkbS52YWx1ZXMpLmluZGV4T2YodmFsdWUpO1xuICAgICAgICBpZiAoaWR4ID4gLTEpIHtcbiAgICAgICAgICAgIHRoaXMuc3BsaWNlKGlkeCwgMSk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSxcbiAgICBnZXQ6IGZ1bmN0aW9uIChpbmRleCkge1xuICAgICAgICB2YXIgYWRtID0gdGhpc1skbW9ieCQkMV07XG4gICAgICAgIGlmIChhZG0pIHtcbiAgICAgICAgICAgIGlmIChpbmRleCA8IGFkbS52YWx1ZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgYWRtLmF0b20ucmVwb3J0T2JzZXJ2ZWQoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gYWRtLmRlaGFuY2VWYWx1ZShhZG0udmFsdWVzW2luZGV4XSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oXCJbbW9ieC5hcnJheV0gQXR0ZW1wdCB0byByZWFkIGFuIGFycmF5IGluZGV4IChcIiArIGluZGV4ICsgXCIpIHRoYXQgaXMgb3V0IG9mIGJvdW5kcyAoXCIgKyBhZG0udmFsdWVzLmxlbmd0aCArIFwiKS4gUGxlYXNlIGNoZWNrIGxlbmd0aCBmaXJzdC4gT3V0IG9mIGJvdW5kIGluZGljZXMgd2lsbCBub3QgYmUgdHJhY2tlZCBieSBNb2JYXCIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfSxcbiAgICBzZXQ6IGZ1bmN0aW9uIChpbmRleCwgbmV3VmFsdWUpIHtcbiAgICAgICAgdmFyIGFkbSA9IHRoaXNbJG1vYngkJDFdO1xuICAgICAgICB2YXIgdmFsdWVzJCQxID0gYWRtLnZhbHVlcztcbiAgICAgICAgaWYgKGluZGV4IDwgdmFsdWVzJCQxLmxlbmd0aCkge1xuICAgICAgICAgICAgLy8gdXBkYXRlIGF0IGluZGV4IGluIHJhbmdlXG4gICAgICAgICAgICBjaGVja0lmU3RhdGVNb2RpZmljYXRpb25zQXJlQWxsb3dlZCQkMShhZG0uYXRvbSk7XG4gICAgICAgICAgICB2YXIgb2xkVmFsdWUgPSB2YWx1ZXMkJDFbaW5kZXhdO1xuICAgICAgICAgICAgaWYgKGhhc0ludGVyY2VwdG9ycyQkMShhZG0pKSB7XG4gICAgICAgICAgICAgICAgdmFyIGNoYW5nZSA9IGludGVyY2VwdENoYW5nZSQkMShhZG0sIHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJ1cGRhdGVcIixcbiAgICAgICAgICAgICAgICAgICAgb2JqZWN0OiB0aGlzLFxuICAgICAgICAgICAgICAgICAgICBpbmRleDogaW5kZXgsXG4gICAgICAgICAgICAgICAgICAgIG5ld1ZhbHVlOiBuZXdWYWx1ZVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGlmICghY2hhbmdlKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgbmV3VmFsdWUgPSBjaGFuZ2UubmV3VmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBuZXdWYWx1ZSA9IGFkbS5lbmhhbmNlcihuZXdWYWx1ZSwgb2xkVmFsdWUpO1xuICAgICAgICAgICAgdmFyIGNoYW5nZWQgPSBuZXdWYWx1ZSAhPT0gb2xkVmFsdWU7XG4gICAgICAgICAgICBpZiAoY2hhbmdlZCkge1xuICAgICAgICAgICAgICAgIHZhbHVlcyQkMVtpbmRleF0gPSBuZXdWYWx1ZTtcbiAgICAgICAgICAgICAgICBhZG0ubm90aWZ5QXJyYXlDaGlsZFVwZGF0ZShpbmRleCwgbmV3VmFsdWUsIG9sZFZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChpbmRleCA9PT0gdmFsdWVzJCQxLmxlbmd0aCkge1xuICAgICAgICAgICAgLy8gYWRkIGEgbmV3IGl0ZW1cbiAgICAgICAgICAgIGFkbS5zcGxpY2VXaXRoQXJyYXkoaW5kZXgsIDAsIFtuZXdWYWx1ZV0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gb3V0IG9mIGJvdW5kc1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiW21vYnguYXJyYXldIEluZGV4IG91dCBvZiBib3VuZHMsIFwiICsgaW5kZXggKyBcIiBpcyBsYXJnZXIgdGhhbiBcIiArIHZhbHVlcyQkMS5sZW5ndGgpO1xuICAgICAgICB9XG4gICAgfVxufTtcbltcbiAgICBcImNvbmNhdFwiLFxuICAgIFwiZXZlcnlcIixcbiAgICBcImZpbHRlclwiLFxuICAgIFwiZm9yRWFjaFwiLFxuICAgIFwiaW5kZXhPZlwiLFxuICAgIFwiam9pblwiLFxuICAgIFwibGFzdEluZGV4T2ZcIixcbiAgICBcIm1hcFwiLFxuICAgIFwicmVkdWNlXCIsXG4gICAgXCJyZWR1Y2VSaWdodFwiLFxuICAgIFwic2xpY2VcIixcbiAgICBcInNvbWVcIixcbiAgICBcInRvU3RyaW5nXCIsXG4gICAgXCJ0b0xvY2FsZVN0cmluZ1wiXG5dLmZvckVhY2goZnVuY3Rpb24gKGZ1bmNOYW1lKSB7XG4gICAgYXJyYXlFeHRlbnNpb25zW2Z1bmNOYW1lXSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGFkbSA9IHRoaXNbJG1vYngkJDFdO1xuICAgICAgICBhZG0uYXRvbS5yZXBvcnRPYnNlcnZlZCgpO1xuICAgICAgICB2YXIgcmVzID0gYWRtLmRlaGFuY2VWYWx1ZXMoYWRtLnZhbHVlcyk7XG4gICAgICAgIHJldHVybiByZXNbZnVuY05hbWVdLmFwcGx5KHJlcywgYXJndW1lbnRzKTtcbiAgICB9O1xufSk7XG52YXIgaXNPYnNlcnZhYmxlQXJyYXlBZG1pbmlzdHJhdGlvbiA9IGNyZWF0ZUluc3RhbmNlb2ZQcmVkaWNhdGUkJDEoXCJPYnNlcnZhYmxlQXJyYXlBZG1pbmlzdHJhdGlvblwiLCBPYnNlcnZhYmxlQXJyYXlBZG1pbmlzdHJhdGlvbik7XG5mdW5jdGlvbiBpc09ic2VydmFibGVBcnJheSQkMSh0aGluZykge1xuICAgIHJldHVybiBpc09iamVjdCQkMSh0aGluZykgJiYgaXNPYnNlcnZhYmxlQXJyYXlBZG1pbmlzdHJhdGlvbih0aGluZ1skbW9ieCQkMV0pO1xufVxuXG52YXIgX2E7XG52YXIgT2JzZXJ2YWJsZU1hcE1hcmtlciA9IHt9O1xuLy8ganVzdCBleHRlbmQgTWFwPyBTZWUgYWxzbyBodHRwczovL2dpc3QuZ2l0aHViLmNvbS9uZXN0aGFydXMvMTNiNGQ3NGYyZWY0YTJmNDM1N2RiZDNmYzIzYzFlNTRcbi8vIEJ1dDogaHR0cHM6Ly9naXRodWIuY29tL21vYnhqcy9tb2J4L2lzc3Vlcy8xNTU2XG52YXIgT2JzZXJ2YWJsZU1hcCQkMSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBPYnNlcnZhYmxlTWFwJCQxKGluaXRpYWxEYXRhLCBlbmhhbmNlciwgbmFtZSkge1xuICAgICAgICBpZiAoZW5oYW5jZXIgPT09IHZvaWQgMCkgeyBlbmhhbmNlciA9IGRlZXBFbmhhbmNlciQkMTsgfVxuICAgICAgICBpZiAobmFtZSA9PT0gdm9pZCAwKSB7IG5hbWUgPSBcIk9ic2VydmFibGVNYXBAXCIgKyBnZXROZXh0SWQkJDEoKTsgfVxuICAgICAgICB0aGlzLmVuaGFuY2VyID0gZW5oYW5jZXI7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXNbX2FdID0gT2JzZXJ2YWJsZU1hcE1hcmtlcjtcbiAgICAgICAgdGhpcy5fa2V5c0F0b20gPSBjcmVhdGVBdG9tJCQxKHRoaXMubmFtZSArIFwiLmtleXMoKVwiKTtcbiAgICAgICAgdGhpc1tTeW1ib2wudG9TdHJpbmdUYWddID0gXCJNYXBcIjtcbiAgICAgICAgaWYgKHR5cGVvZiBNYXAgIT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwibW9ieC5tYXAgcmVxdWlyZXMgTWFwIHBvbHlmaWxsIGZvciB0aGUgY3VycmVudCBicm93c2VyLiBDaGVjayBiYWJlbC1wb2x5ZmlsbCBvciBjb3JlLWpzL2VzNi9tYXAuanNcIik7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fZGF0YSA9IG5ldyBNYXAoKTtcbiAgICAgICAgdGhpcy5faGFzTWFwID0gbmV3IE1hcCgpO1xuICAgICAgICB0aGlzLm1lcmdlKGluaXRpYWxEYXRhKTtcbiAgICB9XG4gICAgT2JzZXJ2YWJsZU1hcCQkMS5wcm90b3R5cGUuX2hhcyA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGEuaGFzKGtleSk7XG4gICAgfTtcbiAgICBPYnNlcnZhYmxlTWFwJCQxLnByb3RvdHlwZS5oYXMgPSBmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgIGlmICh0aGlzLl9oYXNNYXAuaGFzKGtleSkpXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5faGFzTWFwLmdldChrZXkpLmdldCgpO1xuICAgICAgICByZXR1cm4gdGhpcy5fdXBkYXRlSGFzTWFwRW50cnkoa2V5LCBmYWxzZSkuZ2V0KCk7XG4gICAgfTtcbiAgICBPYnNlcnZhYmxlTWFwJCQxLnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuICAgICAgICB2YXIgaGFzS2V5ID0gdGhpcy5faGFzKGtleSk7XG4gICAgICAgIGlmIChoYXNJbnRlcmNlcHRvcnMkJDEodGhpcykpIHtcbiAgICAgICAgICAgIHZhciBjaGFuZ2UgPSBpbnRlcmNlcHRDaGFuZ2UkJDEodGhpcywge1xuICAgICAgICAgICAgICAgIHR5cGU6IGhhc0tleSA/IFwidXBkYXRlXCIgOiBcImFkZFwiLFxuICAgICAgICAgICAgICAgIG9iamVjdDogdGhpcyxcbiAgICAgICAgICAgICAgICBuZXdWYWx1ZTogdmFsdWUsXG4gICAgICAgICAgICAgICAgbmFtZToga2V5XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmICghY2hhbmdlKVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgdmFsdWUgPSBjaGFuZ2UubmV3VmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGhhc0tleSkge1xuICAgICAgICAgICAgdGhpcy5fdXBkYXRlVmFsdWUoa2V5LCB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9hZGRWYWx1ZShrZXksIHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIE9ic2VydmFibGVNYXAkJDEucHJvdG90eXBlLmRlbGV0ZSA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgaWYgKGhhc0ludGVyY2VwdG9ycyQkMSh0aGlzKSkge1xuICAgICAgICAgICAgdmFyIGNoYW5nZSA9IGludGVyY2VwdENoYW5nZSQkMSh0aGlzLCB7XG4gICAgICAgICAgICAgICAgdHlwZTogXCJkZWxldGVcIixcbiAgICAgICAgICAgICAgICBvYmplY3Q6IHRoaXMsXG4gICAgICAgICAgICAgICAgbmFtZToga2V5XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmICghY2hhbmdlKVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5faGFzKGtleSkpIHtcbiAgICAgICAgICAgIHZhciBub3RpZnlTcHkgPSBpc1NweUVuYWJsZWQkJDEoKTtcbiAgICAgICAgICAgIHZhciBub3RpZnkgPSBoYXNMaXN0ZW5lcnMkJDEodGhpcyk7XG4gICAgICAgICAgICB2YXIgY2hhbmdlID0gbm90aWZ5IHx8IG5vdGlmeVNweVxuICAgICAgICAgICAgICAgID8ge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcImRlbGV0ZVwiLFxuICAgICAgICAgICAgICAgICAgICBvYmplY3Q6IHRoaXMsXG4gICAgICAgICAgICAgICAgICAgIG9sZFZhbHVlOiB0aGlzLl9kYXRhLmdldChrZXkpLnZhbHVlLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBrZXlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgOiBudWxsO1xuICAgICAgICAgICAgaWYgKG5vdGlmeVNweSAmJiBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpXG4gICAgICAgICAgICAgICAgc3B5UmVwb3J0U3RhcnQkJDEoX19hc3NpZ24oe30sIGNoYW5nZSwgeyBuYW1lOiB0aGlzLm5hbWUsIGtleToga2V5IH0pKTtcbiAgICAgICAgICAgIHRyYW5zYWN0aW9uJCQxKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5fa2V5c0F0b20ucmVwb3J0Q2hhbmdlZCgpO1xuICAgICAgICAgICAgICAgIF90aGlzLl91cGRhdGVIYXNNYXBFbnRyeShrZXksIGZhbHNlKTtcbiAgICAgICAgICAgICAgICB2YXIgb2JzZXJ2YWJsZSQkMSA9IF90aGlzLl9kYXRhLmdldChrZXkpO1xuICAgICAgICAgICAgICAgIG9ic2VydmFibGUkJDEuc2V0TmV3VmFsdWUodW5kZWZpbmVkKTtcbiAgICAgICAgICAgICAgICBfdGhpcy5fZGF0YS5kZWxldGUoa2V5KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKG5vdGlmeSlcbiAgICAgICAgICAgICAgICBub3RpZnlMaXN0ZW5lcnMkJDEodGhpcywgY2hhbmdlKTtcbiAgICAgICAgICAgIGlmIChub3RpZnlTcHkgJiYgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKVxuICAgICAgICAgICAgICAgIHNweVJlcG9ydEVuZCQkMSgpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG4gICAgT2JzZXJ2YWJsZU1hcCQkMS5wcm90b3R5cGUuX3VwZGF0ZUhhc01hcEVudHJ5ID0gZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcbiAgICAgICAgLy8gb3B0aW1pemF0aW9uOyBkb24ndCBmaWxsIHRoZSBoYXNNYXAgaWYgd2UgYXJlIG5vdCBvYnNlcnZpbmcsIG9yIHJlbW92ZSBlbnRyeSBpZiB0aGVyZSBhcmUgbm8gb2JzZXJ2ZXJzIGFueW1vcmVcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy5faGFzTWFwLmdldChrZXkpO1xuICAgICAgICBpZiAoZW50cnkpIHtcbiAgICAgICAgICAgIGVudHJ5LnNldE5ld1ZhbHVlKHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGVudHJ5ID0gbmV3IE9ic2VydmFibGVWYWx1ZSQkMSh2YWx1ZSwgcmVmZXJlbmNlRW5oYW5jZXIkJDEsIHRoaXMubmFtZSArIFwiLlwiICsgc3RyaW5naWZ5S2V5KGtleSkgKyBcIj9cIiwgZmFsc2UpO1xuICAgICAgICAgICAgdGhpcy5faGFzTWFwLnNldChrZXksIGVudHJ5KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZW50cnk7XG4gICAgfTtcbiAgICBPYnNlcnZhYmxlTWFwJCQxLnByb3RvdHlwZS5fdXBkYXRlVmFsdWUgPSBmdW5jdGlvbiAoa2V5LCBuZXdWYWx1ZSkge1xuICAgICAgICB2YXIgb2JzZXJ2YWJsZSQkMSA9IHRoaXMuX2RhdGEuZ2V0KGtleSk7XG4gICAgICAgIG5ld1ZhbHVlID0gb2JzZXJ2YWJsZSQkMS5wcmVwYXJlTmV3VmFsdWUobmV3VmFsdWUpO1xuICAgICAgICBpZiAobmV3VmFsdWUgIT09IGdsb2JhbFN0YXRlJCQxLlVOQ0hBTkdFRCkge1xuICAgICAgICAgICAgdmFyIG5vdGlmeVNweSA9IGlzU3B5RW5hYmxlZCQkMSgpO1xuICAgICAgICAgICAgdmFyIG5vdGlmeSA9IGhhc0xpc3RlbmVycyQkMSh0aGlzKTtcbiAgICAgICAgICAgIHZhciBjaGFuZ2UgPSBub3RpZnkgfHwgbm90aWZ5U3B5XG4gICAgICAgICAgICAgICAgPyB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwidXBkYXRlXCIsXG4gICAgICAgICAgICAgICAgICAgIG9iamVjdDogdGhpcyxcbiAgICAgICAgICAgICAgICAgICAgb2xkVmFsdWU6IG9ic2VydmFibGUkJDEudmFsdWUsXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IGtleSxcbiAgICAgICAgICAgICAgICAgICAgbmV3VmFsdWU6IG5ld1ZhbHVlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIDogbnVsbDtcbiAgICAgICAgICAgIGlmIChub3RpZnlTcHkgJiYgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKVxuICAgICAgICAgICAgICAgIHNweVJlcG9ydFN0YXJ0JCQxKF9fYXNzaWduKHt9LCBjaGFuZ2UsIHsgbmFtZTogdGhpcy5uYW1lLCBrZXk6IGtleSB9KSk7XG4gICAgICAgICAgICBvYnNlcnZhYmxlJCQxLnNldE5ld1ZhbHVlKG5ld1ZhbHVlKTtcbiAgICAgICAgICAgIGlmIChub3RpZnkpXG4gICAgICAgICAgICAgICAgbm90aWZ5TGlzdGVuZXJzJCQxKHRoaXMsIGNoYW5nZSk7XG4gICAgICAgICAgICBpZiAobm90aWZ5U3B5ICYmIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIilcbiAgICAgICAgICAgICAgICBzcHlSZXBvcnRFbmQkJDEoKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgT2JzZXJ2YWJsZU1hcCQkMS5wcm90b3R5cGUuX2FkZFZhbHVlID0gZnVuY3Rpb24gKGtleSwgbmV3VmFsdWUpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgY2hlY2tJZlN0YXRlTW9kaWZpY2F0aW9uc0FyZUFsbG93ZWQkJDEodGhpcy5fa2V5c0F0b20pO1xuICAgICAgICB0cmFuc2FjdGlvbiQkMShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgb2JzZXJ2YWJsZSQkMSA9IG5ldyBPYnNlcnZhYmxlVmFsdWUkJDEobmV3VmFsdWUsIF90aGlzLmVuaGFuY2VyLCBfdGhpcy5uYW1lICsgXCIuXCIgKyBzdHJpbmdpZnlLZXkoa2V5KSwgZmFsc2UpO1xuICAgICAgICAgICAgX3RoaXMuX2RhdGEuc2V0KGtleSwgb2JzZXJ2YWJsZSQkMSk7XG4gICAgICAgICAgICBuZXdWYWx1ZSA9IG9ic2VydmFibGUkJDEudmFsdWU7IC8vIHZhbHVlIG1pZ2h0IGhhdmUgYmVlbiBjaGFuZ2VkXG4gICAgICAgICAgICBfdGhpcy5fdXBkYXRlSGFzTWFwRW50cnkoa2V5LCB0cnVlKTtcbiAgICAgICAgICAgIF90aGlzLl9rZXlzQXRvbS5yZXBvcnRDaGFuZ2VkKCk7XG4gICAgICAgIH0pO1xuICAgICAgICB2YXIgbm90aWZ5U3B5ID0gaXNTcHlFbmFibGVkJCQxKCk7XG4gICAgICAgIHZhciBub3RpZnkgPSBoYXNMaXN0ZW5lcnMkJDEodGhpcyk7XG4gICAgICAgIHZhciBjaGFuZ2UgPSBub3RpZnkgfHwgbm90aWZ5U3B5XG4gICAgICAgICAgICA/IHtcbiAgICAgICAgICAgICAgICB0eXBlOiBcImFkZFwiLFxuICAgICAgICAgICAgICAgIG9iamVjdDogdGhpcyxcbiAgICAgICAgICAgICAgICBuYW1lOiBrZXksXG4gICAgICAgICAgICAgICAgbmV3VmFsdWU6IG5ld1ZhbHVlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICA6IG51bGw7XG4gICAgICAgIGlmIChub3RpZnlTcHkgJiYgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKVxuICAgICAgICAgICAgc3B5UmVwb3J0U3RhcnQkJDEoX19hc3NpZ24oe30sIGNoYW5nZSwgeyBuYW1lOiB0aGlzLm5hbWUsIGtleToga2V5IH0pKTtcbiAgICAgICAgaWYgKG5vdGlmeSlcbiAgICAgICAgICAgIG5vdGlmeUxpc3RlbmVycyQkMSh0aGlzLCBjaGFuZ2UpO1xuICAgICAgICBpZiAobm90aWZ5U3B5ICYmIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIilcbiAgICAgICAgICAgIHNweVJlcG9ydEVuZCQkMSgpO1xuICAgIH07XG4gICAgT2JzZXJ2YWJsZU1hcCQkMS5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gKGtleSkge1xuICAgICAgICBpZiAodGhpcy5oYXMoa2V5KSlcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRlaGFuY2VWYWx1ZSh0aGlzLl9kYXRhLmdldChrZXkpLmdldCgpKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGVoYW5jZVZhbHVlKHVuZGVmaW5lZCk7XG4gICAgfTtcbiAgICBPYnNlcnZhYmxlTWFwJCQxLnByb3RvdHlwZS5kZWhhbmNlVmFsdWUgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgaWYgKHRoaXMuZGVoYW5jZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGVoYW5jZXIodmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9O1xuICAgIE9ic2VydmFibGVNYXAkJDEucHJvdG90eXBlLmtleXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuX2tleXNBdG9tLnJlcG9ydE9ic2VydmVkKCk7XG4gICAgICAgIHJldHVybiB0aGlzLl9kYXRhLmtleXMoKTtcbiAgICB9O1xuICAgIE9ic2VydmFibGVNYXAkJDEucHJvdG90eXBlLnZhbHVlcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB2YXIgbmV4dEluZGV4ID0gMDtcbiAgICAgICAgdmFyIGtleXMkJDEgPSBBcnJheS5mcm9tKHRoaXMua2V5cygpKTtcbiAgICAgICAgcmV0dXJuIG1ha2VJdGVyYWJsZSh7XG4gICAgICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5leHRJbmRleCA8IGtleXMkJDEubGVuZ3RoXG4gICAgICAgICAgICAgICAgICAgID8geyB2YWx1ZTogc2VsZi5nZXQoa2V5cyQkMVtuZXh0SW5kZXgrK10pLCBkb25lOiBmYWxzZSB9XG4gICAgICAgICAgICAgICAgICAgIDogeyBkb25lOiB0cnVlIH07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgT2JzZXJ2YWJsZU1hcCQkMS5wcm90b3R5cGUuZW50cmllcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB2YXIgbmV4dEluZGV4ID0gMDtcbiAgICAgICAgdmFyIGtleXMkJDEgPSBBcnJheS5mcm9tKHRoaXMua2V5cygpKTtcbiAgICAgICAgcmV0dXJuIG1ha2VJdGVyYWJsZSh7XG4gICAgICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKG5leHRJbmRleCA8IGtleXMkJDEubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBrZXkgPSBrZXlzJCQxW25leHRJbmRleCsrXTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBba2V5LCBzZWxmLmdldChrZXkpXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvbmU6IGZhbHNlXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB7IGRvbmU6IHRydWUgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBPYnNlcnZhYmxlTWFwJCQxLnByb3RvdHlwZVsoX2EgPSAkbW9ieCQkMSwgU3ltYm9sLml0ZXJhdG9yKV0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVudHJpZXMoKTtcbiAgICB9O1xuICAgIE9ic2VydmFibGVNYXAkJDEucHJvdG90eXBlLmZvckVhY2ggPSBmdW5jdGlvbiAoY2FsbGJhY2ssIHRoaXNBcmcpIHtcbiAgICAgICAgdmFyIGVfMSwgX2E7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBmb3IgKHZhciBfYiA9IF9fdmFsdWVzKHRoaXMpLCBfYyA9IF9iLm5leHQoKTsgIV9jLmRvbmU7IF9jID0gX2IubmV4dCgpKSB7XG4gICAgICAgICAgICAgICAgdmFyIF9kID0gX19yZWFkKF9jLnZhbHVlLCAyKSwga2V5ID0gX2RbMF0sIHZhbHVlID0gX2RbMV07XG4gICAgICAgICAgICAgICAgY2FsbGJhY2suY2FsbCh0aGlzQXJnLCB2YWx1ZSwga2V5LCB0aGlzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZV8xXzEpIHsgZV8xID0geyBlcnJvcjogZV8xXzEgfTsgfVxuICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgaWYgKF9jICYmICFfYy5kb25lICYmIChfYSA9IF9iLnJldHVybikpIF9hLmNhbGwoX2IpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZmluYWxseSB7IGlmIChlXzEpIHRocm93IGVfMS5lcnJvcjsgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICAvKiogTWVyZ2UgYW5vdGhlciBvYmplY3QgaW50byB0aGlzIG9iamVjdCwgcmV0dXJucyB0aGlzLiAqL1xuICAgIE9ic2VydmFibGVNYXAkJDEucHJvdG90eXBlLm1lcmdlID0gZnVuY3Rpb24gKG90aGVyKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIGlmIChpc09ic2VydmFibGVNYXAkJDEob3RoZXIpKSB7XG4gICAgICAgICAgICBvdGhlciA9IG90aGVyLnRvSlMoKTtcbiAgICAgICAgfVxuICAgICAgICB0cmFuc2FjdGlvbiQkMShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoaXNQbGFpbk9iamVjdCQkMShvdGhlcikpXG4gICAgICAgICAgICAgICAgT2JqZWN0LmtleXMob3RoZXIpLmZvckVhY2goZnVuY3Rpb24gKGtleSkgeyByZXR1cm4gX3RoaXMuc2V0KGtleSwgb3RoZXJba2V5XSk7IH0pO1xuICAgICAgICAgICAgZWxzZSBpZiAoQXJyYXkuaXNBcnJheShvdGhlcikpXG4gICAgICAgICAgICAgICAgb3RoZXIuZm9yRWFjaChmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIF9iID0gX19yZWFkKF9hLCAyKSwga2V5ID0gX2JbMF0sIHZhbHVlID0gX2JbMV07XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfdGhpcy5zZXQoa2V5LCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBlbHNlIGlmIChpc0VTNk1hcCQkMShvdGhlcikpIHtcbiAgICAgICAgICAgICAgICBpZiAob3RoZXIuY29uc3RydWN0b3IgIT09IE1hcClcbiAgICAgICAgICAgICAgICAgICAgZmFpbCQkMShcIkNhbm5vdCBpbml0aWFsaXplIGZyb20gY2xhc3NlcyB0aGF0IGluaGVyaXQgZnJvbSBNYXA6IFwiICsgb3RoZXIuY29uc3RydWN0b3IubmFtZSk7IC8vIHByZXR0aWVyLWlnbm9yZVxuICAgICAgICAgICAgICAgIG90aGVyLmZvckVhY2goZnVuY3Rpb24gKHZhbHVlLCBrZXkpIHsgcmV0dXJuIF90aGlzLnNldChrZXksIHZhbHVlKTsgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChvdGhlciAhPT0gbnVsbCAmJiBvdGhlciAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgICAgIGZhaWwkJDEoXCJDYW5ub3QgaW5pdGlhbGl6ZSBtYXAgZnJvbSBcIiArIG90aGVyKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgT2JzZXJ2YWJsZU1hcCQkMS5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHRyYW5zYWN0aW9uJCQxKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHVudHJhY2tlZCQkMShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIGVfMiwgX2E7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgX2IgPSBfX3ZhbHVlcyhfdGhpcy5rZXlzKCkpLCBfYyA9IF9iLm5leHQoKTsgIV9jLmRvbmU7IF9jID0gX2IubmV4dCgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIga2V5ID0gX2MudmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5kZWxldGUoa2V5KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXRjaCAoZV8yXzEpIHsgZV8yID0geyBlcnJvcjogZV8yXzEgfTsgfVxuICAgICAgICAgICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF9jICYmICFfYy5kb25lICYmIChfYSA9IF9iLnJldHVybikpIF9hLmNhbGwoX2IpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGZpbmFsbHkgeyBpZiAoZV8yKSB0aHJvdyBlXzIuZXJyb3I7IH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBPYnNlcnZhYmxlTWFwJCQxLnByb3RvdHlwZS5yZXBsYWNlID0gZnVuY3Rpb24gKHZhbHVlcyQkMSkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0cmFuc2FjdGlvbiQkMShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAvLyBncmFiIGFsbCB0aGUga2V5cyB0aGF0IGFyZSBwcmVzZW50IGluIHRoZSBuZXcgbWFwIGJ1dCBub3QgcHJlc2VudCBpbiB0aGUgY3VycmVudCBtYXBcbiAgICAgICAgICAgIC8vIGFuZCBkZWxldGUgdGhlbSBmcm9tIHRoZSBtYXAsIHRoZW4gbWVyZ2UgdGhlIG5ldyBtYXBcbiAgICAgICAgICAgIC8vIHRoaXMgd2lsbCBjYXVzZSByZWFjdGlvbnMgb25seSBvbiBjaGFuZ2VkIHZhbHVlc1xuICAgICAgICAgICAgdmFyIG5ld0tleXMgPSBnZXRNYXBMaWtlS2V5cyQkMSh2YWx1ZXMkJDEpO1xuICAgICAgICAgICAgdmFyIG9sZEtleXMgPSBBcnJheS5mcm9tKF90aGlzLmtleXMoKSk7XG4gICAgICAgICAgICB2YXIgbWlzc2luZ0tleXMgPSBvbGRLZXlzLmZpbHRlcihmdW5jdGlvbiAoaykgeyByZXR1cm4gbmV3S2V5cy5pbmRleE9mKGspID09PSAtMTsgfSk7XG4gICAgICAgICAgICBtaXNzaW5nS2V5cy5mb3JFYWNoKGZ1bmN0aW9uIChrKSB7IHJldHVybiBfdGhpcy5kZWxldGUoayk7IH0pO1xuICAgICAgICAgICAgX3RoaXMubWVyZ2UodmFsdWVzJCQxKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KE9ic2VydmFibGVNYXAkJDEucHJvdG90eXBlLCBcInNpemVcIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuX2tleXNBdG9tLnJlcG9ydE9ic2VydmVkKCk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZGF0YS5zaXplO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgcGxhaW4gb2JqZWN0IHRoYXQgcmVwcmVzZW50cyB0aGlzIG1hcC5cbiAgICAgKiBOb3RlIHRoYXQgYWxsIHRoZSBrZXlzIGJlaW5nIHN0cmluZ2lmaWVkLlxuICAgICAqIElmIHRoZXJlIGFyZSBkdXBsaWNhdGluZyBrZXlzIGFmdGVyIGNvbnZlcnRpbmcgdGhlbSB0byBzdHJpbmdzLCBiZWhhdmlvdXIgaXMgdW5kZXRlcm1pbmVkLlxuICAgICAqL1xuICAgIE9ic2VydmFibGVNYXAkJDEucHJvdG90eXBlLnRvUE9KTyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGVfMywgX2E7XG4gICAgICAgIHZhciByZXMgPSB7fTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGZvciAodmFyIF9iID0gX192YWx1ZXModGhpcyksIF9jID0gX2IubmV4dCgpOyAhX2MuZG9uZTsgX2MgPSBfYi5uZXh0KCkpIHtcbiAgICAgICAgICAgICAgICB2YXIgX2QgPSBfX3JlYWQoX2MudmFsdWUsIDIpLCBrZXkgPSBfZFswXSwgdmFsdWUgPSBfZFsxXTtcbiAgICAgICAgICAgICAgICAvLyBXZSBsaWUgYWJvdXQgc3ltYm9sIGtleSB0eXBlcyBkdWUgdG8gaHR0cHM6Ly9naXRodWIuY29tL01pY3Jvc29mdC9UeXBlU2NyaXB0L2lzc3Vlcy8xODYzXG4gICAgICAgICAgICAgICAgcmVzW3R5cGVvZiBrZXkgPT09IFwic3ltYm9sXCIgPyBrZXkgOiBzdHJpbmdpZnlLZXkoa2V5KV0gPSB2YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZV8zXzEpIHsgZV8zID0geyBlcnJvcjogZV8zXzEgfTsgfVxuICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgaWYgKF9jICYmICFfYy5kb25lICYmIChfYSA9IF9iLnJldHVybikpIF9hLmNhbGwoX2IpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZmluYWxseSB7IGlmIChlXzMpIHRocm93IGVfMy5lcnJvcjsgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXM7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgc2hhbGxvdyBub24gb2JzZXJ2YWJsZSBvYmplY3QgY2xvbmUgb2YgdGhpcyBtYXAuXG4gICAgICogTm90ZSB0aGF0IHRoZSB2YWx1ZXMgbWlndGggc3RpbGwgYmUgb2JzZXJ2YWJsZS4gRm9yIGEgZGVlcCBjbG9uZSB1c2UgbW9ieC50b0pTLlxuICAgICAqL1xuICAgIE9ic2VydmFibGVNYXAkJDEucHJvdG90eXBlLnRvSlMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBuZXcgTWFwKHRoaXMpO1xuICAgIH07XG4gICAgT2JzZXJ2YWJsZU1hcCQkMS5wcm90b3R5cGUudG9KU09OID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyBVc2VkIGJ5IEpTT04uc3RyaW5naWZ5XG4gICAgICAgIHJldHVybiB0aGlzLnRvUE9KTygpO1xuICAgIH07XG4gICAgT2JzZXJ2YWJsZU1hcCQkMS5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHJldHVybiAodGhpcy5uYW1lICtcbiAgICAgICAgICAgIFwiW3sgXCIgK1xuICAgICAgICAgICAgQXJyYXkuZnJvbSh0aGlzLmtleXMoKSlcbiAgICAgICAgICAgICAgICAubWFwKGZ1bmN0aW9uIChrZXkpIHsgcmV0dXJuIHN0cmluZ2lmeUtleShrZXkpICsgXCI6IFwiICsgKFwiXCIgKyBfdGhpcy5nZXQoa2V5KSk7IH0pXG4gICAgICAgICAgICAgICAgLmpvaW4oXCIsIFwiKSArXG4gICAgICAgICAgICBcIiB9XVwiKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIE9ic2VydmVzIHRoaXMgb2JqZWN0LiBUcmlnZ2VycyBmb3IgdGhlIGV2ZW50cyAnYWRkJywgJ3VwZGF0ZScgYW5kICdkZWxldGUnLlxuICAgICAqIFNlZTogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvT2JqZWN0L29ic2VydmVcbiAgICAgKiBmb3IgY2FsbGJhY2sgZGV0YWlsc1xuICAgICAqL1xuICAgIE9ic2VydmFibGVNYXAkJDEucHJvdG90eXBlLm9ic2VydmUgPSBmdW5jdGlvbiAobGlzdGVuZXIsIGZpcmVJbW1lZGlhdGVseSkge1xuICAgICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgJiZcbiAgICAgICAgICAgIGludmFyaWFudCQkMShmaXJlSW1tZWRpYXRlbHkgIT09IHRydWUsIFwiYG9ic2VydmVgIGRvZXNuJ3Qgc3VwcG9ydCBmaXJlSW1tZWRpYXRlbHk9dHJ1ZSBpbiBjb21iaW5hdGlvbiB3aXRoIG1hcHMuXCIpO1xuICAgICAgICByZXR1cm4gcmVnaXN0ZXJMaXN0ZW5lciQkMSh0aGlzLCBsaXN0ZW5lcik7XG4gICAgfTtcbiAgICBPYnNlcnZhYmxlTWFwJCQxLnByb3RvdHlwZS5pbnRlcmNlcHQgPSBmdW5jdGlvbiAoaGFuZGxlcikge1xuICAgICAgICByZXR1cm4gcmVnaXN0ZXJJbnRlcmNlcHRvciQkMSh0aGlzLCBoYW5kbGVyKTtcbiAgICB9O1xuICAgIHJldHVybiBPYnNlcnZhYmxlTWFwJCQxO1xufSgpKTtcbmZ1bmN0aW9uIHN0cmluZ2lmeUtleShrZXkpIHtcbiAgICBpZiAoa2V5ICYmIGtleS50b1N0cmluZylcbiAgICAgICAgcmV0dXJuIGtleS50b1N0cmluZygpO1xuICAgIGVsc2VcbiAgICAgICAgcmV0dXJuIG5ldyBTdHJpbmcoa2V5KS50b1N0cmluZygpO1xufVxuLyogJ3ZhcicgZml4ZXMgc21hbGwtYnVpbGQgaXNzdWUgKi9cbnZhciBpc09ic2VydmFibGVNYXAkJDEgPSBjcmVhdGVJbnN0YW5jZW9mUHJlZGljYXRlJCQxKFwiT2JzZXJ2YWJsZU1hcFwiLCBPYnNlcnZhYmxlTWFwJCQxKTtcblxudmFyIF9hJDE7XG52YXIgT2JzZXJ2YWJsZVNldE1hcmtlciA9IHt9O1xudmFyIE9ic2VydmFibGVTZXQkJDEgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gT2JzZXJ2YWJsZVNldCQkMShpbml0aWFsRGF0YSwgZW5oYW5jZXIsIG5hbWUpIHtcbiAgICAgICAgaWYgKGVuaGFuY2VyID09PSB2b2lkIDApIHsgZW5oYW5jZXIgPSBkZWVwRW5oYW5jZXIkJDE7IH1cbiAgICAgICAgaWYgKG5hbWUgPT09IHZvaWQgMCkgeyBuYW1lID0gXCJPYnNlcnZhYmxlU2V0QFwiICsgZ2V0TmV4dElkJCQxKCk7IH1cbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgdGhpc1tfYSQxXSA9IE9ic2VydmFibGVTZXRNYXJrZXI7XG4gICAgICAgIHRoaXMuX2RhdGEgPSBuZXcgU2V0KCk7XG4gICAgICAgIHRoaXMuX2F0b20gPSBjcmVhdGVBdG9tJCQxKHRoaXMubmFtZSk7XG4gICAgICAgIHRoaXNbU3ltYm9sLnRvU3RyaW5nVGFnXSA9IFwiU2V0XCI7XG4gICAgICAgIGlmICh0eXBlb2YgU2V0ICE9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIm1vYnguc2V0IHJlcXVpcmVzIFNldCBwb2x5ZmlsbCBmb3IgdGhlIGN1cnJlbnQgYnJvd3Nlci4gQ2hlY2sgYmFiZWwtcG9seWZpbGwgb3IgY29yZS1qcy9lczYvc2V0LmpzXCIpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZW5oYW5jZXIgPSBmdW5jdGlvbiAobmV3Viwgb2xkVikgeyByZXR1cm4gZW5oYW5jZXIobmV3Viwgb2xkViwgbmFtZSk7IH07XG4gICAgICAgIGlmIChpbml0aWFsRGF0YSkge1xuICAgICAgICAgICAgdGhpcy5yZXBsYWNlKGluaXRpYWxEYXRhKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBPYnNlcnZhYmxlU2V0JCQxLnByb3RvdHlwZS5kZWhhbmNlVmFsdWUgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgaWYgKHRoaXMuZGVoYW5jZXIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGVoYW5jZXIodmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9O1xuICAgIE9ic2VydmFibGVTZXQkJDEucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0cmFuc2FjdGlvbiQkMShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB1bnRyYWNrZWQkJDEoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBlXzEsIF9hO1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIF9iID0gX192YWx1ZXMoX3RoaXMuX2RhdGEudmFsdWVzKCkpLCBfYyA9IF9iLm5leHQoKTsgIV9jLmRvbmU7IF9jID0gX2IubmV4dCgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSBfYy52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLmRlbGV0ZSh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGVfMV8xKSB7IGVfMSA9IHsgZXJyb3I6IGVfMV8xIH07IH1cbiAgICAgICAgICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChfYyAmJiAhX2MuZG9uZSAmJiAoX2EgPSBfYi5yZXR1cm4pKSBfYS5jYWxsKF9iKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBmaW5hbGx5IHsgaWYgKGVfMSkgdGhyb3cgZV8xLmVycm9yOyB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgT2JzZXJ2YWJsZVNldCQkMS5wcm90b3R5cGUuZm9yRWFjaCA9IGZ1bmN0aW9uIChjYWxsYmFja0ZuLCB0aGlzQXJnKSB7XG4gICAgICAgIHZhciBlXzIsIF9hO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgZm9yICh2YXIgX2IgPSBfX3ZhbHVlcyh0aGlzKSwgX2MgPSBfYi5uZXh0KCk7ICFfYy5kb25lOyBfYyA9IF9iLm5leHQoKSkge1xuICAgICAgICAgICAgICAgIHZhciB2YWx1ZSA9IF9jLnZhbHVlO1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrRm4uY2FsbCh0aGlzQXJnLCB2YWx1ZSwgdmFsdWUsIHRoaXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlXzJfMSkgeyBlXzIgPSB7IGVycm9yOiBlXzJfMSB9OyB9XG4gICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBpZiAoX2MgJiYgIV9jLmRvbmUgJiYgKF9hID0gX2IucmV0dXJuKSkgX2EuY2FsbChfYik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmaW5hbGx5IHsgaWYgKGVfMikgdGhyb3cgZV8yLmVycm9yOyB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShPYnNlcnZhYmxlU2V0JCQxLnByb3RvdHlwZSwgXCJzaXplXCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLl9hdG9tLnJlcG9ydE9ic2VydmVkKCk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZGF0YS5zaXplO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYnNlcnZhYmxlU2V0JCQxLnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgY2hlY2tJZlN0YXRlTW9kaWZpY2F0aW9uc0FyZUFsbG93ZWQkJDEodGhpcy5fYXRvbSk7XG4gICAgICAgIGlmIChoYXNJbnRlcmNlcHRvcnMkJDEodGhpcykpIHtcbiAgICAgICAgICAgIHZhciBjaGFuZ2UgPSBpbnRlcmNlcHRDaGFuZ2UkJDEodGhpcywge1xuICAgICAgICAgICAgICAgIHR5cGU6IFwiYWRkXCIsXG4gICAgICAgICAgICAgICAgb2JqZWN0OiB0aGlzLFxuICAgICAgICAgICAgICAgIG5ld1ZhbHVlOiB2YWx1ZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoIWNoYW5nZSlcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIC8vIFRPRE86IGlkZWFsbHksIHZhbHVlID0gY2hhbmdlLnZhbHVlIHdvdWxkIGJlIGRvbmUgaGVyZSwgc28gdGhhdCB2YWx1ZXMgY2FuIGJlXG4gICAgICAgICAgICAvLyBjaGFuZ2VkIGJ5IGludGVyY2VwdG9yLiBTYW1lIGFwcGxpZXMgZm9yIG90aGVyIFNldCBhbmQgTWFwIGFwaSdzLlxuICAgICAgICB9XG4gICAgICAgIGlmICghdGhpcy5oYXModmFsdWUpKSB7XG4gICAgICAgICAgICB0cmFuc2FjdGlvbiQkMShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuX2RhdGEuYWRkKF90aGlzLmVuaGFuY2VyKHZhbHVlLCB1bmRlZmluZWQpKTtcbiAgICAgICAgICAgICAgICBfdGhpcy5fYXRvbS5yZXBvcnRDaGFuZ2VkKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHZhciBub3RpZnlTcHkgPSBpc1NweUVuYWJsZWQkJDEoKTtcbiAgICAgICAgICAgIHZhciBub3RpZnkgPSBoYXNMaXN0ZW5lcnMkJDEodGhpcyk7XG4gICAgICAgICAgICB2YXIgY2hhbmdlID0gbm90aWZ5IHx8IG5vdGlmeVNweVxuICAgICAgICAgICAgICAgID8ge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcImFkZFwiLFxuICAgICAgICAgICAgICAgICAgICBvYmplY3Q6IHRoaXMsXG4gICAgICAgICAgICAgICAgICAgIG5ld1ZhbHVlOiB2YWx1ZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICA6IG51bGw7XG4gICAgICAgICAgICBpZiAobm90aWZ5U3B5ICYmIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIilcbiAgICAgICAgICAgICAgICBzcHlSZXBvcnRTdGFydCQkMShjaGFuZ2UpO1xuICAgICAgICAgICAgaWYgKG5vdGlmeSlcbiAgICAgICAgICAgICAgICBub3RpZnlMaXN0ZW5lcnMkJDEodGhpcywgY2hhbmdlKTtcbiAgICAgICAgICAgIGlmIChub3RpZnlTcHkgJiYgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKVxuICAgICAgICAgICAgICAgIHNweVJlcG9ydEVuZCQkMSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgT2JzZXJ2YWJsZVNldCQkMS5wcm90b3R5cGUuZGVsZXRlID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIGlmIChoYXNJbnRlcmNlcHRvcnMkJDEodGhpcykpIHtcbiAgICAgICAgICAgIHZhciBjaGFuZ2UgPSBpbnRlcmNlcHRDaGFuZ2UkJDEodGhpcywge1xuICAgICAgICAgICAgICAgIHR5cGU6IFwiZGVsZXRlXCIsXG4gICAgICAgICAgICAgICAgb2JqZWN0OiB0aGlzLFxuICAgICAgICAgICAgICAgIG9sZFZhbHVlOiB2YWx1ZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoIWNoYW5nZSlcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuaGFzKHZhbHVlKSkge1xuICAgICAgICAgICAgdmFyIG5vdGlmeVNweSA9IGlzU3B5RW5hYmxlZCQkMSgpO1xuICAgICAgICAgICAgdmFyIG5vdGlmeSA9IGhhc0xpc3RlbmVycyQkMSh0aGlzKTtcbiAgICAgICAgICAgIHZhciBjaGFuZ2UgPSBub3RpZnkgfHwgbm90aWZ5U3B5XG4gICAgICAgICAgICAgICAgPyB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IFwiZGVsZXRlXCIsXG4gICAgICAgICAgICAgICAgICAgIG9iamVjdDogdGhpcyxcbiAgICAgICAgICAgICAgICAgICAgb2xkVmFsdWU6IHZhbHVlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIDogbnVsbDtcbiAgICAgICAgICAgIGlmIChub3RpZnlTcHkgJiYgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKVxuICAgICAgICAgICAgICAgIHNweVJlcG9ydFN0YXJ0JCQxKF9fYXNzaWduKHt9LCBjaGFuZ2UsIHsgbmFtZTogdGhpcy5uYW1lIH0pKTtcbiAgICAgICAgICAgIHRyYW5zYWN0aW9uJCQxKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5fYXRvbS5yZXBvcnRDaGFuZ2VkKCk7XG4gICAgICAgICAgICAgICAgX3RoaXMuX2RhdGEuZGVsZXRlKHZhbHVlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKG5vdGlmeSlcbiAgICAgICAgICAgICAgICBub3RpZnlMaXN0ZW5lcnMkJDEodGhpcywgY2hhbmdlKTtcbiAgICAgICAgICAgIGlmIChub3RpZnlTcHkgJiYgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKVxuICAgICAgICAgICAgICAgIHNweVJlcG9ydEVuZCQkMSgpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG4gICAgT2JzZXJ2YWJsZVNldCQkMS5wcm90b3R5cGUuaGFzID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuX2F0b20ucmVwb3J0T2JzZXJ2ZWQoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGEuaGFzKHRoaXMuZGVoYW5jZVZhbHVlKHZhbHVlKSk7XG4gICAgfTtcbiAgICBPYnNlcnZhYmxlU2V0JCQxLnByb3RvdHlwZS5lbnRyaWVzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgbmV4dEluZGV4ID0gMDtcbiAgICAgICAgdmFyIGtleXMkJDEgPSBBcnJheS5mcm9tKHRoaXMua2V5cygpKTtcbiAgICAgICAgdmFyIHZhbHVlcyQkMSA9IEFycmF5LmZyb20odGhpcy52YWx1ZXMoKSk7XG4gICAgICAgIHJldHVybiBtYWtlSXRlcmFibGUoe1xuICAgICAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBpbmRleCA9IG5leHRJbmRleDtcbiAgICAgICAgICAgICAgICBuZXh0SW5kZXggKz0gMTtcbiAgICAgICAgICAgICAgICByZXR1cm4gaW5kZXggPCB2YWx1ZXMkJDEubGVuZ3RoXG4gICAgICAgICAgICAgICAgICAgID8geyB2YWx1ZTogW2tleXMkJDFbaW5kZXhdLCB2YWx1ZXMkJDFbaW5kZXhdXSwgZG9uZTogZmFsc2UgfVxuICAgICAgICAgICAgICAgICAgICA6IHsgZG9uZTogdHJ1ZSB9O1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuICAgIE9ic2VydmFibGVTZXQkJDEucHJvdG90eXBlLmtleXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnZhbHVlcygpO1xuICAgIH07XG4gICAgT2JzZXJ2YWJsZVNldCQkMS5wcm90b3R5cGUudmFsdWVzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl9hdG9tLnJlcG9ydE9ic2VydmVkKCk7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdmFyIG5leHRJbmRleCA9IDA7XG4gICAgICAgIHZhciBvYnNlcnZhYmxlVmFsdWVzID0gQXJyYXkuZnJvbSh0aGlzLl9kYXRhLnZhbHVlcygpKTtcbiAgICAgICAgcmV0dXJuIG1ha2VJdGVyYWJsZSh7XG4gICAgICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5leHRJbmRleCA8IG9ic2VydmFibGVWYWx1ZXMubGVuZ3RoXG4gICAgICAgICAgICAgICAgICAgID8geyB2YWx1ZTogc2VsZi5kZWhhbmNlVmFsdWUob2JzZXJ2YWJsZVZhbHVlc1tuZXh0SW5kZXgrK10pLCBkb25lOiBmYWxzZSB9XG4gICAgICAgICAgICAgICAgICAgIDogeyBkb25lOiB0cnVlIH07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgT2JzZXJ2YWJsZVNldCQkMS5wcm90b3R5cGUucmVwbGFjZSA9IGZ1bmN0aW9uIChvdGhlcikge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICBpZiAoaXNPYnNlcnZhYmxlU2V0JCQxKG90aGVyKSkge1xuICAgICAgICAgICAgb3RoZXIgPSBvdGhlci50b0pTKCk7XG4gICAgICAgIH1cbiAgICAgICAgdHJhbnNhY3Rpb24kJDEoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkob3RoZXIpKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuY2xlYXIoKTtcbiAgICAgICAgICAgICAgICBvdGhlci5mb3JFYWNoKGZ1bmN0aW9uICh2YWx1ZSkgeyByZXR1cm4gX3RoaXMuYWRkKHZhbHVlKTsgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChpc0VTNlNldCQkMShvdGhlcikpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5jbGVhcigpO1xuICAgICAgICAgICAgICAgIG90aGVyLmZvckVhY2goZnVuY3Rpb24gKHZhbHVlKSB7IHJldHVybiBfdGhpcy5hZGQodmFsdWUpOyB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKG90aGVyICE9PSBudWxsICYmIG90aGVyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBmYWlsJCQxKFwiQ2Fubm90IGluaXRpYWxpemUgc2V0IGZyb20gXCIgKyBvdGhlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIE9ic2VydmFibGVTZXQkJDEucHJvdG90eXBlLm9ic2VydmUgPSBmdW5jdGlvbiAobGlzdGVuZXIsIGZpcmVJbW1lZGlhdGVseSkge1xuICAgICAgICAvLyBUT0RPICdmaXJlSW1tZWRpYXRlbHknIGNhbiBiZSB0cnVlP1xuICAgICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgJiZcbiAgICAgICAgICAgIGludmFyaWFudCQkMShmaXJlSW1tZWRpYXRlbHkgIT09IHRydWUsIFwiYG9ic2VydmVgIGRvZXNuJ3Qgc3VwcG9ydCBmaXJlSW1tZWRpYXRlbHk9dHJ1ZSBpbiBjb21iaW5hdGlvbiB3aXRoIHNldHMuXCIpO1xuICAgICAgICByZXR1cm4gcmVnaXN0ZXJMaXN0ZW5lciQkMSh0aGlzLCBsaXN0ZW5lcik7XG4gICAgfTtcbiAgICBPYnNlcnZhYmxlU2V0JCQxLnByb3RvdHlwZS5pbnRlcmNlcHQgPSBmdW5jdGlvbiAoaGFuZGxlcikge1xuICAgICAgICByZXR1cm4gcmVnaXN0ZXJJbnRlcmNlcHRvciQkMSh0aGlzLCBoYW5kbGVyKTtcbiAgICB9O1xuICAgIE9ic2VydmFibGVTZXQkJDEucHJvdG90eXBlLnRvSlMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBuZXcgU2V0KHRoaXMpO1xuICAgIH07XG4gICAgT2JzZXJ2YWJsZVNldCQkMS5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm5hbWUgKyBcIlsgXCIgKyBBcnJheS5mcm9tKHRoaXMpLmpvaW4oXCIsIFwiKSArIFwiIF1cIjtcbiAgICB9O1xuICAgIE9ic2VydmFibGVTZXQkJDEucHJvdG90eXBlWyhfYSQxID0gJG1vYngkJDEsIFN5bWJvbC5pdGVyYXRvcildID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy52YWx1ZXMoKTtcbiAgICB9O1xuICAgIHJldHVybiBPYnNlcnZhYmxlU2V0JCQxO1xufSgpKTtcbnZhciBpc09ic2VydmFibGVTZXQkJDEgPSBjcmVhdGVJbnN0YW5jZW9mUHJlZGljYXRlJCQxKFwiT2JzZXJ2YWJsZVNldFwiLCBPYnNlcnZhYmxlU2V0JCQxKTtcblxudmFyIE9ic2VydmFibGVPYmplY3RBZG1pbmlzdHJhdGlvbiQkMSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBPYnNlcnZhYmxlT2JqZWN0QWRtaW5pc3RyYXRpb24kJDEodGFyZ2V0LCB2YWx1ZXMkJDEsIG5hbWUsIGRlZmF1bHRFbmhhbmNlcikge1xuICAgICAgICBpZiAodmFsdWVzJCQxID09PSB2b2lkIDApIHsgdmFsdWVzJCQxID0gbmV3IE1hcCgpOyB9XG4gICAgICAgIHRoaXMudGFyZ2V0ID0gdGFyZ2V0O1xuICAgICAgICB0aGlzLnZhbHVlcyA9IHZhbHVlcyQkMTtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgdGhpcy5kZWZhdWx0RW5oYW5jZXIgPSBkZWZhdWx0RW5oYW5jZXI7XG4gICAgICAgIHRoaXMua2V5c0F0b20gPSBuZXcgQXRvbSQkMShuYW1lICsgXCIua2V5c1wiKTtcbiAgICB9XG4gICAgT2JzZXJ2YWJsZU9iamVjdEFkbWluaXN0cmF0aW9uJCQxLnByb3RvdHlwZS5yZWFkID0gZnVuY3Rpb24gKGtleSkge1xuICAgICAgICByZXR1cm4gdGhpcy52YWx1ZXMuZ2V0KGtleSkuZ2V0KCk7XG4gICAgfTtcbiAgICBPYnNlcnZhYmxlT2JqZWN0QWRtaW5pc3RyYXRpb24kJDEucHJvdG90eXBlLndyaXRlID0gZnVuY3Rpb24gKGtleSwgbmV3VmFsdWUpIHtcbiAgICAgICAgdmFyIGluc3RhbmNlID0gdGhpcy50YXJnZXQ7XG4gICAgICAgIHZhciBvYnNlcnZhYmxlJCQxID0gdGhpcy52YWx1ZXMuZ2V0KGtleSk7XG4gICAgICAgIGlmIChvYnNlcnZhYmxlJCQxIGluc3RhbmNlb2YgQ29tcHV0ZWRWYWx1ZSQkMSkge1xuICAgICAgICAgICAgb2JzZXJ2YWJsZSQkMS5zZXQobmV3VmFsdWUpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIGludGVyY2VwdFxuICAgICAgICBpZiAoaGFzSW50ZXJjZXB0b3JzJCQxKHRoaXMpKSB7XG4gICAgICAgICAgICB2YXIgY2hhbmdlID0gaW50ZXJjZXB0Q2hhbmdlJCQxKHRoaXMsIHtcbiAgICAgICAgICAgICAgICB0eXBlOiBcInVwZGF0ZVwiLFxuICAgICAgICAgICAgICAgIG9iamVjdDogdGhpcy5wcm94eSB8fCBpbnN0YW5jZSxcbiAgICAgICAgICAgICAgICBuYW1lOiBrZXksXG4gICAgICAgICAgICAgICAgbmV3VmFsdWU6IG5ld1ZhbHVlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmICghY2hhbmdlKVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIG5ld1ZhbHVlID0gY2hhbmdlLm5ld1ZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIG5ld1ZhbHVlID0gb2JzZXJ2YWJsZSQkMS5wcmVwYXJlTmV3VmFsdWUobmV3VmFsdWUpO1xuICAgICAgICAvLyBub3RpZnkgc3B5ICYgb2JzZXJ2ZXJzXG4gICAgICAgIGlmIChuZXdWYWx1ZSAhPT0gZ2xvYmFsU3RhdGUkJDEuVU5DSEFOR0VEKSB7XG4gICAgICAgICAgICB2YXIgbm90aWZ5ID0gaGFzTGlzdGVuZXJzJCQxKHRoaXMpO1xuICAgICAgICAgICAgdmFyIG5vdGlmeVNweSA9IGlzU3B5RW5hYmxlZCQkMSgpO1xuICAgICAgICAgICAgdmFyIGNoYW5nZSA9IG5vdGlmeSB8fCBub3RpZnlTcHlcbiAgICAgICAgICAgICAgICA/IHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJ1cGRhdGVcIixcbiAgICAgICAgICAgICAgICAgICAgb2JqZWN0OiB0aGlzLnByb3h5IHx8IGluc3RhbmNlLFxuICAgICAgICAgICAgICAgICAgICBvbGRWYWx1ZTogb2JzZXJ2YWJsZSQkMS52YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgbmFtZToga2V5LFxuICAgICAgICAgICAgICAgICAgICBuZXdWYWx1ZTogbmV3VmFsdWVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgOiBudWxsO1xuICAgICAgICAgICAgaWYgKG5vdGlmeVNweSAmJiBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpXG4gICAgICAgICAgICAgICAgc3B5UmVwb3J0U3RhcnQkJDEoX19hc3NpZ24oe30sIGNoYW5nZSwgeyBuYW1lOiB0aGlzLm5hbWUsIGtleToga2V5IH0pKTtcbiAgICAgICAgICAgIG9ic2VydmFibGUkJDEuc2V0TmV3VmFsdWUobmV3VmFsdWUpO1xuICAgICAgICAgICAgaWYgKG5vdGlmeSlcbiAgICAgICAgICAgICAgICBub3RpZnlMaXN0ZW5lcnMkJDEodGhpcywgY2hhbmdlKTtcbiAgICAgICAgICAgIGlmIChub3RpZnlTcHkgJiYgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKVxuICAgICAgICAgICAgICAgIHNweVJlcG9ydEVuZCQkMSgpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBPYnNlcnZhYmxlT2JqZWN0QWRtaW5pc3RyYXRpb24kJDEucHJvdG90eXBlLmhhcyA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgdmFyIG1hcCA9IHRoaXMucGVuZGluZ0tleXMgfHwgKHRoaXMucGVuZGluZ0tleXMgPSBuZXcgTWFwKCkpO1xuICAgICAgICB2YXIgZW50cnkgPSBtYXAuZ2V0KGtleSk7XG4gICAgICAgIGlmIChlbnRyeSlcbiAgICAgICAgICAgIHJldHVybiBlbnRyeS5nZXQoKTtcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB2YXIgZXhpc3RzID0gISF0aGlzLnZhbHVlcy5nZXQoa2V5KTtcbiAgICAgICAgICAgIC8vIFBvc3NpYmxlIG9wdGltaXphdGlvbjogRG9uJ3QgaGF2ZSBhIHNlcGFyYXRlIG1hcCBmb3Igbm9uIGV4aXN0aW5nIGtleXMsXG4gICAgICAgICAgICAvLyBidXQgc3RvcmUgdGhlbSBpbiB0aGUgdmFsdWVzIG1hcCBpbnN0ZWFkLCB1c2luZyBhIHNwZWNpYWwgc3ltYm9sIHRvIGRlbm90ZSBcIm5vdCBleGlzdGluZ1wiXG4gICAgICAgICAgICBlbnRyeSA9IG5ldyBPYnNlcnZhYmxlVmFsdWUkJDEoZXhpc3RzLCByZWZlcmVuY2VFbmhhbmNlciQkMSwgdGhpcy5uYW1lICsgXCIuXCIgKyBrZXkudG9TdHJpbmcoKSArIFwiP1wiLCBmYWxzZSk7XG4gICAgICAgICAgICBtYXAuc2V0KGtleSwgZW50cnkpO1xuICAgICAgICAgICAgcmV0dXJuIGVudHJ5LmdldCgpOyAvLyByZWFkIHRvIHN1YnNjcmliZVxuICAgICAgICB9XG4gICAgfTtcbiAgICBPYnNlcnZhYmxlT2JqZWN0QWRtaW5pc3RyYXRpb24kJDEucHJvdG90eXBlLmFkZE9ic2VydmFibGVQcm9wID0gZnVuY3Rpb24gKHByb3BOYW1lLCBuZXdWYWx1ZSwgZW5oYW5jZXIpIHtcbiAgICAgICAgaWYgKGVuaGFuY2VyID09PSB2b2lkIDApIHsgZW5oYW5jZXIgPSB0aGlzLmRlZmF1bHRFbmhhbmNlcjsgfVxuICAgICAgICB2YXIgdGFyZ2V0ID0gdGhpcy50YXJnZXQ7XG4gICAgICAgIGFzc2VydFByb3BlcnR5Q29uZmlndXJhYmxlJCQxKHRhcmdldCwgcHJvcE5hbWUpO1xuICAgICAgICBpZiAoaGFzSW50ZXJjZXB0b3JzJCQxKHRoaXMpKSB7XG4gICAgICAgICAgICB2YXIgY2hhbmdlID0gaW50ZXJjZXB0Q2hhbmdlJCQxKHRoaXMsIHtcbiAgICAgICAgICAgICAgICBvYmplY3Q6IHRoaXMucHJveHkgfHwgdGFyZ2V0LFxuICAgICAgICAgICAgICAgIG5hbWU6IHByb3BOYW1lLFxuICAgICAgICAgICAgICAgIHR5cGU6IFwiYWRkXCIsXG4gICAgICAgICAgICAgICAgbmV3VmFsdWU6IG5ld1ZhbHVlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmICghY2hhbmdlKVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIG5ld1ZhbHVlID0gY2hhbmdlLm5ld1ZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIHZhciBvYnNlcnZhYmxlJCQxID0gbmV3IE9ic2VydmFibGVWYWx1ZSQkMShuZXdWYWx1ZSwgZW5oYW5jZXIsIHRoaXMubmFtZSArIFwiLlwiICsgcHJvcE5hbWUsIGZhbHNlKTtcbiAgICAgICAgdGhpcy52YWx1ZXMuc2V0KHByb3BOYW1lLCBvYnNlcnZhYmxlJCQxKTtcbiAgICAgICAgbmV3VmFsdWUgPSBvYnNlcnZhYmxlJCQxLnZhbHVlOyAvLyBvYnNlcnZhYmxlVmFsdWUgbWlnaHQgaGF2ZSBjaGFuZ2VkIGl0XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIHByb3BOYW1lLCBnZW5lcmF0ZU9ic2VydmFibGVQcm9wQ29uZmlnJCQxKHByb3BOYW1lKSk7XG4gICAgICAgIHRoaXMubm90aWZ5UHJvcGVydHlBZGRpdGlvbihwcm9wTmFtZSwgbmV3VmFsdWUpO1xuICAgIH07XG4gICAgT2JzZXJ2YWJsZU9iamVjdEFkbWluaXN0cmF0aW9uJCQxLnByb3RvdHlwZS5hZGRDb21wdXRlZFByb3AgPSBmdW5jdGlvbiAocHJvcGVydHlPd25lciwgLy8gd2hlcmUgaXMgdGhlIHByb3BlcnR5IGRlY2xhcmVkP1xuICAgIHByb3BOYW1lLCBvcHRpb25zKSB7XG4gICAgICAgIHZhciB0YXJnZXQgPSB0aGlzLnRhcmdldDtcbiAgICAgICAgb3B0aW9ucy5uYW1lID0gb3B0aW9ucy5uYW1lIHx8IHRoaXMubmFtZSArIFwiLlwiICsgcHJvcE5hbWU7XG4gICAgICAgIHRoaXMudmFsdWVzLnNldChwcm9wTmFtZSwgbmV3IENvbXB1dGVkVmFsdWUkJDEob3B0aW9ucykpO1xuICAgICAgICBpZiAocHJvcGVydHlPd25lciA9PT0gdGFyZ2V0IHx8IGlzUHJvcGVydHlDb25maWd1cmFibGUkJDEocHJvcGVydHlPd25lciwgcHJvcE5hbWUpKVxuICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHByb3BlcnR5T3duZXIsIHByb3BOYW1lLCBnZW5lcmF0ZUNvbXB1dGVkUHJvcENvbmZpZyQkMShwcm9wTmFtZSkpO1xuICAgIH07XG4gICAgT2JzZXJ2YWJsZU9iamVjdEFkbWluaXN0cmF0aW9uJCQxLnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgIGlmICghdGhpcy52YWx1ZXMuaGFzKGtleSkpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIHZhciB0YXJnZXQgPSB0aGlzLnRhcmdldDtcbiAgICAgICAgaWYgKGhhc0ludGVyY2VwdG9ycyQkMSh0aGlzKSkge1xuICAgICAgICAgICAgdmFyIGNoYW5nZSA9IGludGVyY2VwdENoYW5nZSQkMSh0aGlzLCB7XG4gICAgICAgICAgICAgICAgb2JqZWN0OiB0aGlzLnByb3h5IHx8IHRhcmdldCxcbiAgICAgICAgICAgICAgICBuYW1lOiBrZXksXG4gICAgICAgICAgICAgICAgdHlwZTogXCJyZW1vdmVcIlxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoIWNoYW5nZSlcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHN0YXJ0QmF0Y2gkJDEoKTtcbiAgICAgICAgICAgIHZhciBub3RpZnkgPSBoYXNMaXN0ZW5lcnMkJDEodGhpcyk7XG4gICAgICAgICAgICB2YXIgbm90aWZ5U3B5ID0gaXNTcHlFbmFibGVkJCQxKCk7XG4gICAgICAgICAgICB2YXIgb2xkT2JzZXJ2YWJsZSA9IHRoaXMudmFsdWVzLmdldChrZXkpO1xuICAgICAgICAgICAgdmFyIG9sZFZhbHVlID0gb2xkT2JzZXJ2YWJsZSAmJiBvbGRPYnNlcnZhYmxlLmdldCgpO1xuICAgICAgICAgICAgb2xkT2JzZXJ2YWJsZSAmJiBvbGRPYnNlcnZhYmxlLnNldCh1bmRlZmluZWQpO1xuICAgICAgICAgICAgLy8gbm90aWZ5IGtleSBhbmQga2V5c2V0IGxpc3RlbmVyc1xuICAgICAgICAgICAgdGhpcy5rZXlzQXRvbS5yZXBvcnRDaGFuZ2VkKCk7XG4gICAgICAgICAgICB0aGlzLnZhbHVlcy5kZWxldGUoa2V5KTtcbiAgICAgICAgICAgIGlmICh0aGlzLnBlbmRpbmdLZXlzKSB7XG4gICAgICAgICAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy5wZW5kaW5nS2V5cy5nZXQoa2V5KTtcbiAgICAgICAgICAgICAgICBpZiAoZW50cnkpXG4gICAgICAgICAgICAgICAgICAgIGVudHJ5LnNldChmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBkZWxldGUgdGhlIHByb3BcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLnRhcmdldFtrZXldO1xuICAgICAgICAgICAgdmFyIGNoYW5nZSA9IG5vdGlmeSB8fCBub3RpZnlTcHlcbiAgICAgICAgICAgICAgICA/IHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJyZW1vdmVcIixcbiAgICAgICAgICAgICAgICAgICAgb2JqZWN0OiB0aGlzLnByb3h5IHx8IHRhcmdldCxcbiAgICAgICAgICAgICAgICAgICAgb2xkVmFsdWU6IG9sZFZhbHVlLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBrZXlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgOiBudWxsO1xuICAgICAgICAgICAgaWYgKG5vdGlmeVNweSAmJiBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpXG4gICAgICAgICAgICAgICAgc3B5UmVwb3J0U3RhcnQkJDEoX19hc3NpZ24oe30sIGNoYW5nZSwgeyBuYW1lOiB0aGlzLm5hbWUsIGtleToga2V5IH0pKTtcbiAgICAgICAgICAgIGlmIChub3RpZnkpXG4gICAgICAgICAgICAgICAgbm90aWZ5TGlzdGVuZXJzJCQxKHRoaXMsIGNoYW5nZSk7XG4gICAgICAgICAgICBpZiAobm90aWZ5U3B5ICYmIHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIilcbiAgICAgICAgICAgICAgICBzcHlSZXBvcnRFbmQkJDEoKTtcbiAgICAgICAgfVxuICAgICAgICBmaW5hbGx5IHtcbiAgICAgICAgICAgIGVuZEJhdGNoJCQxKCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIE9ic2VydmFibGVPYmplY3RBZG1pbmlzdHJhdGlvbiQkMS5wcm90b3R5cGUuaWxsZWdhbEFjY2VzcyA9IGZ1bmN0aW9uIChvd25lciwgcHJvcE5hbWUpIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoaXMgaGFwcGVucyBpZiBhIHByb3BlcnR5IGlzIGFjY2Vzc2VkIHRocm91Z2ggdGhlIHByb3RvdHlwZSBjaGFpbiwgYnV0IHRoZSBwcm9wZXJ0eSB3YXNcbiAgICAgICAgICogZGVjbGFyZWQgZGlyZWN0bHkgYXMgb3duIHByb3BlcnR5IG9uIHRoZSBwcm90b3R5cGUuXG4gICAgICAgICAqXG4gICAgICAgICAqIEUuZy46XG4gICAgICAgICAqIGNsYXNzIEEge1xuICAgICAgICAgKiB9XG4gICAgICAgICAqIGV4dGVuZE9ic2VydmFibGUoQS5wcm90b3R5cGUsIHsgeDogMSB9KVxuICAgICAgICAgKlxuICAgICAgICAgKiBjbGFzc0IgZXh0ZW5zIEEge1xuICAgICAgICAgKiB9XG4gICAgICAgICAqIGNvbnNvbGUubG9nKG5ldyBCKCkueClcbiAgICAgICAgICpcbiAgICAgICAgICogSXQgaXMgdW5jbGVhciB3aGV0aGVyIHRoZSBwcm9wZXJ0eSBzaG91bGQgYmUgY29uc2lkZXJlZCAnc3RhdGljJyBvciBpbmhlcml0ZWQuXG4gICAgICAgICAqIEVpdGhlciB1c2UgYGNvbnNvbGUubG9nKEEueClgXG4gICAgICAgICAqIG9yOiBkZWNvcmF0ZShBLCB7IHg6IG9ic2VydmFibGUgfSlcbiAgICAgICAgICpcbiAgICAgICAgICogV2hlbiB1c2luZyBkZWNvcmF0ZSwgdGhlIHByb3BlcnR5IHdpbGwgYWx3YXlzIGJlIHJlZGVjbGFyZWQgYXMgb3duIHByb3BlcnR5IG9uIHRoZSBhY3R1YWwgaW5zdGFuY2VcbiAgICAgICAgICovXG4gICAgICAgIGNvbnNvbGUud2FybihcIlByb3BlcnR5ICdcIiArIHByb3BOYW1lICsgXCInIG9mICdcIiArIG93bmVyICsgXCInIHdhcyBhY2Nlc3NlZCB0aHJvdWdoIHRoZSBwcm90b3R5cGUgY2hhaW4uIFVzZSAnZGVjb3JhdGUnIGluc3RlYWQgdG8gZGVjbGFyZSB0aGUgcHJvcCBvciBhY2Nlc3MgaXQgc3RhdGljYWxseSB0aHJvdWdoIGl0J3Mgb3duZXJcIik7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBPYnNlcnZlcyB0aGlzIG9iamVjdC4gVHJpZ2dlcnMgZm9yIHRoZSBldmVudHMgJ2FkZCcsICd1cGRhdGUnIGFuZCAnZGVsZXRlJy5cbiAgICAgKiBTZWU6IGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL09iamVjdC9vYnNlcnZlXG4gICAgICogZm9yIGNhbGxiYWNrIGRldGFpbHNcbiAgICAgKi9cbiAgICBPYnNlcnZhYmxlT2JqZWN0QWRtaW5pc3RyYXRpb24kJDEucHJvdG90eXBlLm9ic2VydmUgPSBmdW5jdGlvbiAoY2FsbGJhY2ssIGZpcmVJbW1lZGlhdGVseSkge1xuICAgICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgJiZcbiAgICAgICAgICAgIGludmFyaWFudCQkMShmaXJlSW1tZWRpYXRlbHkgIT09IHRydWUsIFwiYG9ic2VydmVgIGRvZXNuJ3Qgc3VwcG9ydCB0aGUgZmlyZSBpbW1lZGlhdGVseSBwcm9wZXJ0eSBmb3Igb2JzZXJ2YWJsZSBvYmplY3RzLlwiKTtcbiAgICAgICAgcmV0dXJuIHJlZ2lzdGVyTGlzdGVuZXIkJDEodGhpcywgY2FsbGJhY2spO1xuICAgIH07XG4gICAgT2JzZXJ2YWJsZU9iamVjdEFkbWluaXN0cmF0aW9uJCQxLnByb3RvdHlwZS5pbnRlcmNlcHQgPSBmdW5jdGlvbiAoaGFuZGxlcikge1xuICAgICAgICByZXR1cm4gcmVnaXN0ZXJJbnRlcmNlcHRvciQkMSh0aGlzLCBoYW5kbGVyKTtcbiAgICB9O1xuICAgIE9ic2VydmFibGVPYmplY3RBZG1pbmlzdHJhdGlvbiQkMS5wcm90b3R5cGUubm90aWZ5UHJvcGVydHlBZGRpdGlvbiA9IGZ1bmN0aW9uIChrZXksIG5ld1ZhbHVlKSB7XG4gICAgICAgIHZhciBub3RpZnkgPSBoYXNMaXN0ZW5lcnMkJDEodGhpcyk7XG4gICAgICAgIHZhciBub3RpZnlTcHkgPSBpc1NweUVuYWJsZWQkJDEoKTtcbiAgICAgICAgdmFyIGNoYW5nZSA9IG5vdGlmeSB8fCBub3RpZnlTcHlcbiAgICAgICAgICAgID8ge1xuICAgICAgICAgICAgICAgIHR5cGU6IFwiYWRkXCIsXG4gICAgICAgICAgICAgICAgb2JqZWN0OiB0aGlzLnByb3h5IHx8IHRoaXMudGFyZ2V0LFxuICAgICAgICAgICAgICAgIG5hbWU6IGtleSxcbiAgICAgICAgICAgICAgICBuZXdWYWx1ZTogbmV3VmFsdWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDogbnVsbDtcbiAgICAgICAgaWYgKG5vdGlmeVNweSAmJiBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpXG4gICAgICAgICAgICBzcHlSZXBvcnRTdGFydCQkMShfX2Fzc2lnbih7fSwgY2hhbmdlLCB7IG5hbWU6IHRoaXMubmFtZSwga2V5OiBrZXkgfSkpO1xuICAgICAgICBpZiAobm90aWZ5KVxuICAgICAgICAgICAgbm90aWZ5TGlzdGVuZXJzJCQxKHRoaXMsIGNoYW5nZSk7XG4gICAgICAgIGlmIChub3RpZnlTcHkgJiYgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiKVxuICAgICAgICAgICAgc3B5UmVwb3J0RW5kJCQxKCk7XG4gICAgICAgIGlmICh0aGlzLnBlbmRpbmdLZXlzKSB7XG4gICAgICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnBlbmRpbmdLZXlzLmdldChrZXkpO1xuICAgICAgICAgICAgaWYgKGVudHJ5KVxuICAgICAgICAgICAgICAgIGVudHJ5LnNldCh0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmtleXNBdG9tLnJlcG9ydENoYW5nZWQoKTtcbiAgICB9O1xuICAgIE9ic2VydmFibGVPYmplY3RBZG1pbmlzdHJhdGlvbiQkMS5wcm90b3R5cGUuZ2V0S2V5cyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGVfMSwgX2E7XG4gICAgICAgIHRoaXMua2V5c0F0b20ucmVwb3J0T2JzZXJ2ZWQoKTtcbiAgICAgICAgLy8gcmV0dXJuIFJlZmxlY3Qub3duS2V5cyh0aGlzLnZhbHVlcykgYXMgYW55XG4gICAgICAgIHZhciByZXMgPSBbXTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGZvciAodmFyIF9iID0gX192YWx1ZXModGhpcy52YWx1ZXMpLCBfYyA9IF9iLm5leHQoKTsgIV9jLmRvbmU7IF9jID0gX2IubmV4dCgpKSB7XG4gICAgICAgICAgICAgICAgdmFyIF9kID0gX19yZWFkKF9jLnZhbHVlLCAyKSwga2V5ID0gX2RbMF0sIHZhbHVlID0gX2RbMV07XG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgT2JzZXJ2YWJsZVZhbHVlJCQxKVxuICAgICAgICAgICAgICAgICAgICByZXMucHVzaChrZXkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlXzFfMSkgeyBlXzEgPSB7IGVycm9yOiBlXzFfMSB9OyB9XG4gICAgICAgIGZpbmFsbHkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBpZiAoX2MgJiYgIV9jLmRvbmUgJiYgKF9hID0gX2IucmV0dXJuKSkgX2EuY2FsbChfYik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmaW5hbGx5IHsgaWYgKGVfMSkgdGhyb3cgZV8xLmVycm9yOyB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlcztcbiAgICB9O1xuICAgIHJldHVybiBPYnNlcnZhYmxlT2JqZWN0QWRtaW5pc3RyYXRpb24kJDE7XG59KCkpO1xuZnVuY3Rpb24gYXNPYnNlcnZhYmxlT2JqZWN0JCQxKHRhcmdldCwgbmFtZSwgZGVmYXVsdEVuaGFuY2VyKSB7XG4gICAgaWYgKG5hbWUgPT09IHZvaWQgMCkgeyBuYW1lID0gXCJcIjsgfVxuICAgIGlmIChkZWZhdWx0RW5oYW5jZXIgPT09IHZvaWQgMCkgeyBkZWZhdWx0RW5oYW5jZXIgPSBkZWVwRW5oYW5jZXIkJDE7IH1cbiAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHRhcmdldCwgJG1vYngkJDEpKVxuICAgICAgICByZXR1cm4gdGFyZ2V0WyRtb2J4JCQxXTtcbiAgICBwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgJiZcbiAgICAgICAgaW52YXJpYW50JCQxKE9iamVjdC5pc0V4dGVuc2libGUodGFyZ2V0KSwgXCJDYW5ub3QgbWFrZSB0aGUgZGVzaWduYXRlZCBvYmplY3Qgb2JzZXJ2YWJsZTsgaXQgaXMgbm90IGV4dGVuc2libGVcIik7XG4gICAgaWYgKCFpc1BsYWluT2JqZWN0JCQxKHRhcmdldCkpXG4gICAgICAgIG5hbWUgPSAodGFyZ2V0LmNvbnN0cnVjdG9yLm5hbWUgfHwgXCJPYnNlcnZhYmxlT2JqZWN0XCIpICsgXCJAXCIgKyBnZXROZXh0SWQkJDEoKTtcbiAgICBpZiAoIW5hbWUpXG4gICAgICAgIG5hbWUgPSBcIk9ic2VydmFibGVPYmplY3RAXCIgKyBnZXROZXh0SWQkJDEoKTtcbiAgICB2YXIgYWRtID0gbmV3IE9ic2VydmFibGVPYmplY3RBZG1pbmlzdHJhdGlvbiQkMSh0YXJnZXQsIG5ldyBNYXAoKSwgbmFtZSwgZGVmYXVsdEVuaGFuY2VyKTtcbiAgICBhZGRIaWRkZW5Qcm9wJCQxKHRhcmdldCwgJG1vYngkJDEsIGFkbSk7XG4gICAgcmV0dXJuIGFkbTtcbn1cbnZhciBvYnNlcnZhYmxlUHJvcGVydHlDb25maWdzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbnZhciBjb21wdXRlZFByb3BlcnR5Q29uZmlncyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG5mdW5jdGlvbiBnZW5lcmF0ZU9ic2VydmFibGVQcm9wQ29uZmlnJCQxKHByb3BOYW1lKSB7XG4gICAgcmV0dXJuIChvYnNlcnZhYmxlUHJvcGVydHlDb25maWdzW3Byb3BOYW1lXSB8fFxuICAgICAgICAob2JzZXJ2YWJsZVByb3BlcnR5Q29uZmlnc1twcm9wTmFtZV0gPSB7XG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXNbJG1vYngkJDFdLnJlYWQocHJvcE5hbWUpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgICAgICAgICB0aGlzWyRtb2J4JCQxXS53cml0ZShwcm9wTmFtZSwgdik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pKTtcbn1cbmZ1bmN0aW9uIGdldEFkbWluaXN0cmF0aW9uRm9yQ29tcHV0ZWRQcm9wT3duZXIob3duZXIpIHtcbiAgICB2YXIgYWRtID0gb3duZXJbJG1vYngkJDFdO1xuICAgIGlmICghYWRtKSB7XG4gICAgICAgIC8vIGJlY2F1c2UgY29tcHV0ZWQgcHJvcHMgYXJlIGRlY2xhcmVkIG9uIHByb3R5LFxuICAgICAgICAvLyB0aGUgY3VycmVudCBpbnN0YW5jZSBtaWdodCBub3QgaGF2ZSBiZWVuIGluaXRpYWxpemVkIHlldFxuICAgICAgICBpbml0aWFsaXplSW5zdGFuY2UkJDEob3duZXIpO1xuICAgICAgICByZXR1cm4gb3duZXJbJG1vYngkJDFdO1xuICAgIH1cbiAgICByZXR1cm4gYWRtO1xufVxuZnVuY3Rpb24gZ2VuZXJhdGVDb21wdXRlZFByb3BDb25maWckJDEocHJvcE5hbWUpIHtcbiAgICByZXR1cm4gKGNvbXB1dGVkUHJvcGVydHlDb25maWdzW3Byb3BOYW1lXSB8fFxuICAgICAgICAoY29tcHV0ZWRQcm9wZXJ0eUNvbmZpZ3NbcHJvcE5hbWVdID0ge1xuICAgICAgICAgICAgY29uZmlndXJhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGdldEFkbWluaXN0cmF0aW9uRm9yQ29tcHV0ZWRQcm9wT3duZXIodGhpcykucmVhZChwcm9wTmFtZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodikge1xuICAgICAgICAgICAgICAgIGdldEFkbWluaXN0cmF0aW9uRm9yQ29tcHV0ZWRQcm9wT3duZXIodGhpcykud3JpdGUocHJvcE5hbWUsIHYpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KSk7XG59XG52YXIgaXNPYnNlcnZhYmxlT2JqZWN0QWRtaW5pc3RyYXRpb24gPSBjcmVhdGVJbnN0YW5jZW9mUHJlZGljYXRlJCQxKFwiT2JzZXJ2YWJsZU9iamVjdEFkbWluaXN0cmF0aW9uXCIsIE9ic2VydmFibGVPYmplY3RBZG1pbmlzdHJhdGlvbiQkMSk7XG5mdW5jdGlvbiBpc09ic2VydmFibGVPYmplY3QkJDEodGhpbmcpIHtcbiAgICBpZiAoaXNPYmplY3QkJDEodGhpbmcpKSB7XG4gICAgICAgIC8vIEluaXRpYWxpemVycyBydW4gbGF6aWx5IHdoZW4gdHJhbnNwaWxpbmcgdG8gYmFiZWwsIHNvIG1ha2Ugc3VyZSB0aGV5IGFyZSBydW4uLi5cbiAgICAgICAgaW5pdGlhbGl6ZUluc3RhbmNlJCQxKHRoaW5nKTtcbiAgICAgICAgcmV0dXJuIGlzT2JzZXJ2YWJsZU9iamVjdEFkbWluaXN0cmF0aW9uKHRoaW5nWyRtb2J4JCQxXSk7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbn1cblxuZnVuY3Rpb24gZ2V0QXRvbSQkMSh0aGluZywgcHJvcGVydHkpIHtcbiAgICBpZiAodHlwZW9mIHRoaW5nID09PSBcIm9iamVjdFwiICYmIHRoaW5nICE9PSBudWxsKSB7XG4gICAgICAgIGlmIChpc09ic2VydmFibGVBcnJheSQkMSh0aGluZykpIHtcbiAgICAgICAgICAgIGlmIChwcm9wZXJ0eSAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgICAgIGZhaWwkJDEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiICYmXG4gICAgICAgICAgICAgICAgICAgIFwiSXQgaXMgbm90IHBvc3NpYmxlIHRvIGdldCBpbmRleCBhdG9tcyBmcm9tIGFycmF5c1wiKTtcbiAgICAgICAgICAgIHJldHVybiB0aGluZ1skbW9ieCQkMV0uYXRvbTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNPYnNlcnZhYmxlU2V0JCQxKHRoaW5nKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaW5nWyRtb2J4JCQxXTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNPYnNlcnZhYmxlTWFwJCQxKHRoaW5nKSkge1xuICAgICAgICAgICAgdmFyIGFueVRoaW5nID0gdGhpbmc7XG4gICAgICAgICAgICBpZiAocHJvcGVydHkgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgICAgICByZXR1cm4gYW55VGhpbmcuX2tleXNBdG9tO1xuICAgICAgICAgICAgdmFyIG9ic2VydmFibGUkJDEgPSBhbnlUaGluZy5fZGF0YS5nZXQocHJvcGVydHkpIHx8IGFueVRoaW5nLl9oYXNNYXAuZ2V0KHByb3BlcnR5KTtcbiAgICAgICAgICAgIGlmICghb2JzZXJ2YWJsZSQkMSlcbiAgICAgICAgICAgICAgICBmYWlsJCQxKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiAmJlxuICAgICAgICAgICAgICAgICAgICBcInRoZSBlbnRyeSAnXCIgKyBwcm9wZXJ0eSArIFwiJyBkb2VzIG5vdCBleGlzdCBpbiB0aGUgb2JzZXJ2YWJsZSBtYXAgJ1wiICsgZ2V0RGVidWdOYW1lJCQxKHRoaW5nKSArIFwiJ1wiKTtcbiAgICAgICAgICAgIHJldHVybiBvYnNlcnZhYmxlJCQxO1xuICAgICAgICB9XG4gICAgICAgIC8vIEluaXRpYWxpemVycyBydW4gbGF6aWx5IHdoZW4gdHJhbnNwaWxpbmcgdG8gYmFiZWwsIHNvIG1ha2Ugc3VyZSB0aGV5IGFyZSBydW4uLi5cbiAgICAgICAgaW5pdGlhbGl6ZUluc3RhbmNlJCQxKHRoaW5nKTtcbiAgICAgICAgaWYgKHByb3BlcnR5ICYmICF0aGluZ1skbW9ieCQkMV0pXG4gICAgICAgICAgICB0aGluZ1twcm9wZXJ0eV07IC8vIFNlZSAjMTA3MlxuICAgICAgICBpZiAoaXNPYnNlcnZhYmxlT2JqZWN0JCQxKHRoaW5nKSkge1xuICAgICAgICAgICAgaWYgKCFwcm9wZXJ0eSlcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFpbCQkMShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgJiYgXCJwbGVhc2Ugc3BlY2lmeSBhIHByb3BlcnR5XCIpO1xuICAgICAgICAgICAgdmFyIG9ic2VydmFibGUkJDEgPSB0aGluZ1skbW9ieCQkMV0udmFsdWVzLmdldChwcm9wZXJ0eSk7XG4gICAgICAgICAgICBpZiAoIW9ic2VydmFibGUkJDEpXG4gICAgICAgICAgICAgICAgZmFpbCQkMShwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIgJiZcbiAgICAgICAgICAgICAgICAgICAgXCJubyBvYnNlcnZhYmxlIHByb3BlcnR5ICdcIiArIHByb3BlcnR5ICsgXCInIGZvdW5kIG9uIHRoZSBvYnNlcnZhYmxlIG9iamVjdCAnXCIgKyBnZXREZWJ1Z05hbWUkJDEodGhpbmcpICsgXCInXCIpO1xuICAgICAgICAgICAgcmV0dXJuIG9ic2VydmFibGUkJDE7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzQXRvbSQkMSh0aGluZykgfHwgaXNDb21wdXRlZFZhbHVlJCQxKHRoaW5nKSB8fCBpc1JlYWN0aW9uJCQxKHRoaW5nKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaW5nO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiB0aGluZyA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIGlmIChpc1JlYWN0aW9uJCQxKHRoaW5nWyRtb2J4JCQxXSkpIHtcbiAgICAgICAgICAgIC8vIGRpc3Bvc2VyIGZ1bmN0aW9uXG4gICAgICAgICAgICByZXR1cm4gdGhpbmdbJG1vYngkJDFdO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWlsJCQxKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIiAmJiBcIkNhbm5vdCBvYnRhaW4gYXRvbSBmcm9tIFwiICsgdGhpbmcpO1xufVxuZnVuY3Rpb24gZ2V0QWRtaW5pc3RyYXRpb24kJDEodGhpbmcsIHByb3BlcnR5KSB7XG4gICAgaWYgKCF0aGluZylcbiAgICAgICAgZmFpbCQkMShcIkV4cGVjdGluZyBzb21lIG9iamVjdFwiKTtcbiAgICBpZiAocHJvcGVydHkgIT09IHVuZGVmaW5lZClcbiAgICAgICAgcmV0dXJuIGdldEFkbWluaXN0cmF0aW9uJCQxKGdldEF0b20kJDEodGhpbmcsIHByb3BlcnR5KSk7XG4gICAgaWYgKGlzQXRvbSQkMSh0aGluZykgfHwgaXNDb21wdXRlZFZhbHVlJCQxKHRoaW5nKSB8fCBpc1JlYWN0aW9uJCQxKHRoaW5nKSlcbiAgICAgICAgcmV0dXJuIHRoaW5nO1xuICAgIGlmIChpc09ic2VydmFibGVNYXAkJDEodGhpbmcpIHx8IGlzT2JzZXJ2YWJsZVNldCQkMSh0aGluZykpXG4gICAgICAgIHJldHVybiB0aGluZztcbiAgICAvLyBJbml0aWFsaXplcnMgcnVuIGxhemlseSB3aGVuIHRyYW5zcGlsaW5nIHRvIGJhYmVsLCBzbyBtYWtlIHN1cmUgdGhleSBhcmUgcnVuLi4uXG4gICAgaW5pdGlhbGl6ZUluc3RhbmNlJCQxKHRoaW5nKTtcbiAgICBpZiAodGhpbmdbJG1vYngkJDFdKVxuICAgICAgICByZXR1cm4gdGhpbmdbJG1vYngkJDFdO1xuICAgIGZhaWwkJDEocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiICYmIFwiQ2Fubm90IG9idGFpbiBhZG1pbmlzdHJhdGlvbiBmcm9tIFwiICsgdGhpbmcpO1xufVxuZnVuY3Rpb24gZ2V0RGVidWdOYW1lJCQxKHRoaW5nLCBwcm9wZXJ0eSkge1xuICAgIHZhciBuYW1lZDtcbiAgICBpZiAocHJvcGVydHkgIT09IHVuZGVmaW5lZClcbiAgICAgICAgbmFtZWQgPSBnZXRBdG9tJCQxKHRoaW5nLCBwcm9wZXJ0eSk7XG4gICAgZWxzZSBpZiAoaXNPYnNlcnZhYmxlT2JqZWN0JCQxKHRoaW5nKSB8fCBpc09ic2VydmFibGVNYXAkJDEodGhpbmcpIHx8IGlzT2JzZXJ2YWJsZVNldCQkMSh0aGluZykpXG4gICAgICAgIG5hbWVkID0gZ2V0QWRtaW5pc3RyYXRpb24kJDEodGhpbmcpO1xuICAgIGVsc2VcbiAgICAgICAgbmFtZWQgPSBnZXRBdG9tJCQxKHRoaW5nKTsgLy8gdmFsaWQgZm9yIGFycmF5cyBhcyB3ZWxsXG4gICAgcmV0dXJuIG5hbWVkLm5hbWU7XG59XG5cbnZhciB0b1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG5mdW5jdGlvbiBkZWVwRXF1YWwkJDEoYSwgYikge1xuICAgIHJldHVybiBlcShhLCBiKTtcbn1cbi8vIENvcGllZCBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9qYXNoa2VuYXMvdW5kZXJzY29yZS9ibG9iLzVjMjM3YTdjNjgyZmI2OGZkNTM3ODIwM2YwYmYyMmRjZTE2MjQ4NTQvdW5kZXJzY29yZS5qcyNMMTE4Ni1MMTI4OVxuLy8gSW50ZXJuYWwgcmVjdXJzaXZlIGNvbXBhcmlzb24gZnVuY3Rpb24gZm9yIGBpc0VxdWFsYC5cbmZ1bmN0aW9uIGVxKGEsIGIsIGFTdGFjaywgYlN0YWNrKSB7XG4gICAgLy8gSWRlbnRpY2FsIG9iamVjdHMgYXJlIGVxdWFsLiBgMCA9PT0gLTBgLCBidXQgdGhleSBhcmVuJ3QgaWRlbnRpY2FsLlxuICAgIC8vIFNlZSB0aGUgW0hhcm1vbnkgYGVnYWxgIHByb3Bvc2FsXShodHRwOi8vd2lraS5lY21hc2NyaXB0Lm9yZy9kb2t1LnBocD9pZD1oYXJtb255OmVnYWwpLlxuICAgIGlmIChhID09PSBiKVxuICAgICAgICByZXR1cm4gYSAhPT0gMCB8fCAxIC8gYSA9PT0gMSAvIGI7XG4gICAgLy8gYG51bGxgIG9yIGB1bmRlZmluZWRgIG9ubHkgZXF1YWwgdG8gaXRzZWxmIChzdHJpY3QgY29tcGFyaXNvbikuXG4gICAgaWYgKGEgPT0gbnVsbCB8fCBiID09IG51bGwpXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAvLyBgTmFOYHMgYXJlIGVxdWl2YWxlbnQsIGJ1dCBub24tcmVmbGV4aXZlLlxuICAgIGlmIChhICE9PSBhKVxuICAgICAgICByZXR1cm4gYiAhPT0gYjtcbiAgICAvLyBFeGhhdXN0IHByaW1pdGl2ZSBjaGVja3NcbiAgICB2YXIgdHlwZSA9IHR5cGVvZiBhO1xuICAgIGlmICh0eXBlICE9PSBcImZ1bmN0aW9uXCIgJiYgdHlwZSAhPT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgYiAhPSBcIm9iamVjdFwiKVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgcmV0dXJuIGRlZXBFcShhLCBiLCBhU3RhY2ssIGJTdGFjayk7XG59XG4vLyBJbnRlcm5hbCByZWN1cnNpdmUgY29tcGFyaXNvbiBmdW5jdGlvbiBmb3IgYGlzRXF1YWxgLlxuZnVuY3Rpb24gZGVlcEVxKGEsIGIsIGFTdGFjaywgYlN0YWNrKSB7XG4gICAgLy8gVW53cmFwIGFueSB3cmFwcGVkIG9iamVjdHMuXG4gICAgYSA9IHVud3JhcChhKTtcbiAgICBiID0gdW53cmFwKGIpO1xuICAgIC8vIENvbXBhcmUgYFtbQ2xhc3NdXWAgbmFtZXMuXG4gICAgdmFyIGNsYXNzTmFtZSA9IHRvU3RyaW5nLmNhbGwoYSk7XG4gICAgaWYgKGNsYXNzTmFtZSAhPT0gdG9TdHJpbmcuY2FsbChiKSlcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIHN3aXRjaCAoY2xhc3NOYW1lKSB7XG4gICAgICAgIC8vIFN0cmluZ3MsIG51bWJlcnMsIHJlZ3VsYXIgZXhwcmVzc2lvbnMsIGRhdGVzLCBhbmQgYm9vbGVhbnMgYXJlIGNvbXBhcmVkIGJ5IHZhbHVlLlxuICAgICAgICBjYXNlIFwiW29iamVjdCBSZWdFeHBdXCI6XG4gICAgICAgIC8vIFJlZ0V4cHMgYXJlIGNvZXJjZWQgdG8gc3RyaW5ncyBmb3IgY29tcGFyaXNvbiAoTm90ZTogJycgKyAvYS9pID09PSAnL2EvaScpXG4gICAgICAgIGNhc2UgXCJbb2JqZWN0IFN0cmluZ11cIjpcbiAgICAgICAgICAgIC8vIFByaW1pdGl2ZXMgYW5kIHRoZWlyIGNvcnJlc3BvbmRpbmcgb2JqZWN0IHdyYXBwZXJzIGFyZSBlcXVpdmFsZW50OyB0aHVzLCBgXCI1XCJgIGlzXG4gICAgICAgICAgICAvLyBlcXVpdmFsZW50IHRvIGBuZXcgU3RyaW5nKFwiNVwiKWAuXG4gICAgICAgICAgICByZXR1cm4gXCJcIiArIGEgPT09IFwiXCIgKyBiO1xuICAgICAgICBjYXNlIFwiW29iamVjdCBOdW1iZXJdXCI6XG4gICAgICAgICAgICAvLyBgTmFOYHMgYXJlIGVxdWl2YWxlbnQsIGJ1dCBub24tcmVmbGV4aXZlLlxuICAgICAgICAgICAgLy8gT2JqZWN0KE5hTikgaXMgZXF1aXZhbGVudCB0byBOYU4uXG4gICAgICAgICAgICBpZiAoK2EgIT09ICthKVxuICAgICAgICAgICAgICAgIHJldHVybiArYiAhPT0gK2I7XG4gICAgICAgICAgICAvLyBBbiBgZWdhbGAgY29tcGFyaXNvbiBpcyBwZXJmb3JtZWQgZm9yIG90aGVyIG51bWVyaWMgdmFsdWVzLlxuICAgICAgICAgICAgcmV0dXJuICthID09PSAwID8gMSAvICthID09PSAxIC8gYiA6ICthID09PSArYjtcbiAgICAgICAgY2FzZSBcIltvYmplY3QgRGF0ZV1cIjpcbiAgICAgICAgY2FzZSBcIltvYmplY3QgQm9vbGVhbl1cIjpcbiAgICAgICAgICAgIC8vIENvZXJjZSBkYXRlcyBhbmQgYm9vbGVhbnMgdG8gbnVtZXJpYyBwcmltaXRpdmUgdmFsdWVzLiBEYXRlcyBhcmUgY29tcGFyZWQgYnkgdGhlaXJcbiAgICAgICAgICAgIC8vIG1pbGxpc2Vjb25kIHJlcHJlc2VudGF0aW9ucy4gTm90ZSB0aGF0IGludmFsaWQgZGF0ZXMgd2l0aCBtaWxsaXNlY29uZCByZXByZXNlbnRhdGlvbnNcbiAgICAgICAgICAgIC8vIG9mIGBOYU5gIGFyZSBub3QgZXF1aXZhbGVudC5cbiAgICAgICAgICAgIHJldHVybiArYSA9PT0gK2I7XG4gICAgICAgIGNhc2UgXCJbb2JqZWN0IFN5bWJvbF1cIjpcbiAgICAgICAgICAgIHJldHVybiAodHlwZW9mIFN5bWJvbCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBTeW1ib2wudmFsdWVPZi5jYWxsKGEpID09PSBTeW1ib2wudmFsdWVPZi5jYWxsKGIpKTtcbiAgICB9XG4gICAgdmFyIGFyZUFycmF5cyA9IGNsYXNzTmFtZSA9PT0gXCJbb2JqZWN0IEFycmF5XVwiO1xuICAgIGlmICghYXJlQXJyYXlzKSB7XG4gICAgICAgIGlmICh0eXBlb2YgYSAhPSBcIm9iamVjdFwiIHx8IHR5cGVvZiBiICE9IFwib2JqZWN0XCIpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIC8vIE9iamVjdHMgd2l0aCBkaWZmZXJlbnQgY29uc3RydWN0b3JzIGFyZSBub3QgZXF1aXZhbGVudCwgYnV0IGBPYmplY3RgcyBvciBgQXJyYXlgc1xuICAgICAgICAvLyBmcm9tIGRpZmZlcmVudCBmcmFtZXMgYXJlLlxuICAgICAgICB2YXIgYUN0b3IgPSBhLmNvbnN0cnVjdG9yLCBiQ3RvciA9IGIuY29uc3RydWN0b3I7XG4gICAgICAgIGlmIChhQ3RvciAhPT0gYkN0b3IgJiZcbiAgICAgICAgICAgICEodHlwZW9mIGFDdG9yID09PSBcImZ1bmN0aW9uXCIgJiZcbiAgICAgICAgICAgICAgICBhQ3RvciBpbnN0YW5jZW9mIGFDdG9yICYmXG4gICAgICAgICAgICAgICAgdHlwZW9mIGJDdG9yID09PSBcImZ1bmN0aW9uXCIgJiZcbiAgICAgICAgICAgICAgICBiQ3RvciBpbnN0YW5jZW9mIGJDdG9yKSAmJlxuICAgICAgICAgICAgKFwiY29uc3RydWN0b3JcIiBpbiBhICYmIFwiY29uc3RydWN0b3JcIiBpbiBiKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vIEFzc3VtZSBlcXVhbGl0eSBmb3IgY3ljbGljIHN0cnVjdHVyZXMuIFRoZSBhbGdvcml0aG0gZm9yIGRldGVjdGluZyBjeWNsaWNcbiAgICAvLyBzdHJ1Y3R1cmVzIGlzIGFkYXB0ZWQgZnJvbSBFUyA1LjEgc2VjdGlvbiAxNS4xMi4zLCBhYnN0cmFjdCBvcGVyYXRpb24gYEpPYC5cbiAgICAvLyBJbml0aWFsaXppbmcgc3RhY2sgb2YgdHJhdmVyc2VkIG9iamVjdHMuXG4gICAgLy8gSXQncyBkb25lIGhlcmUgc2luY2Ugd2Ugb25seSBuZWVkIHRoZW0gZm9yIG9iamVjdHMgYW5kIGFycmF5cyBjb21wYXJpc29uLlxuICAgIGFTdGFjayA9IGFTdGFjayB8fCBbXTtcbiAgICBiU3RhY2sgPSBiU3RhY2sgfHwgW107XG4gICAgdmFyIGxlbmd0aCA9IGFTdGFjay5sZW5ndGg7XG4gICAgd2hpbGUgKGxlbmd0aC0tKSB7XG4gICAgICAgIC8vIExpbmVhciBzZWFyY2guIFBlcmZvcm1hbmNlIGlzIGludmVyc2VseSBwcm9wb3J0aW9uYWwgdG8gdGhlIG51bWJlciBvZlxuICAgICAgICAvLyB1bmlxdWUgbmVzdGVkIHN0cnVjdHVyZXMuXG4gICAgICAgIGlmIChhU3RhY2tbbGVuZ3RoXSA9PT0gYSlcbiAgICAgICAgICAgIHJldHVybiBiU3RhY2tbbGVuZ3RoXSA9PT0gYjtcbiAgICB9XG4gICAgLy8gQWRkIHRoZSBmaXJzdCBvYmplY3QgdG8gdGhlIHN0YWNrIG9mIHRyYXZlcnNlZCBvYmplY3RzLlxuICAgIGFTdGFjay5wdXNoKGEpO1xuICAgIGJTdGFjay5wdXNoKGIpO1xuICAgIC8vIFJlY3Vyc2l2ZWx5IGNvbXBhcmUgb2JqZWN0cyBhbmQgYXJyYXlzLlxuICAgIGlmIChhcmVBcnJheXMpIHtcbiAgICAgICAgLy8gQ29tcGFyZSBhcnJheSBsZW5ndGhzIHRvIGRldGVybWluZSBpZiBhIGRlZXAgY29tcGFyaXNvbiBpcyBuZWNlc3NhcnkuXG4gICAgICAgIGxlbmd0aCA9IGEubGVuZ3RoO1xuICAgICAgICBpZiAobGVuZ3RoICE9PSBiLmxlbmd0aClcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgLy8gRGVlcCBjb21wYXJlIHRoZSBjb250ZW50cywgaWdub3Jpbmcgbm9uLW51bWVyaWMgcHJvcGVydGllcy5cbiAgICAgICAgd2hpbGUgKGxlbmd0aC0tKSB7XG4gICAgICAgICAgICBpZiAoIWVxKGFbbGVuZ3RoXSwgYltsZW5ndGhdLCBhU3RhY2ssIGJTdGFjaykpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICAvLyBEZWVwIGNvbXBhcmUgb2JqZWN0cy5cbiAgICAgICAgdmFyIGtleXMkJDEgPSBPYmplY3Qua2V5cyhhKTtcbiAgICAgICAgdmFyIGtleSA9IHZvaWQgMDtcbiAgICAgICAgbGVuZ3RoID0ga2V5cyQkMS5sZW5ndGg7XG4gICAgICAgIC8vIEVuc3VyZSB0aGF0IGJvdGggb2JqZWN0cyBjb250YWluIHRoZSBzYW1lIG51bWJlciBvZiBwcm9wZXJ0aWVzIGJlZm9yZSBjb21wYXJpbmcgZGVlcCBlcXVhbGl0eS5cbiAgICAgICAgaWYgKE9iamVjdC5rZXlzKGIpLmxlbmd0aCAhPT0gbGVuZ3RoKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB3aGlsZSAobGVuZ3RoLS0pIHtcbiAgICAgICAgICAgIC8vIERlZXAgY29tcGFyZSBlYWNoIG1lbWJlclxuICAgICAgICAgICAga2V5ID0ga2V5cyQkMVtsZW5ndGhdO1xuICAgICAgICAgICAgaWYgKCEoaGFzJDEoYiwga2V5KSAmJiBlcShhW2tleV0sIGJba2V5XSwgYVN0YWNrLCBiU3RhY2spKSlcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gUmVtb3ZlIHRoZSBmaXJzdCBvYmplY3QgZnJvbSB0aGUgc3RhY2sgb2YgdHJhdmVyc2VkIG9iamVjdHMuXG4gICAgYVN0YWNrLnBvcCgpO1xuICAgIGJTdGFjay5wb3AoKTtcbiAgICByZXR1cm4gdHJ1ZTtcbn1cbmZ1bmN0aW9uIHVud3JhcChhKSB7XG4gICAgaWYgKGlzT2JzZXJ2YWJsZUFycmF5JCQxKGEpKVxuICAgICAgICByZXR1cm4gYS5zbGljZSgpO1xuICAgIGlmIChpc0VTNk1hcCQkMShhKSB8fCBpc09ic2VydmFibGVNYXAkJDEoYSkpXG4gICAgICAgIHJldHVybiBBcnJheS5mcm9tKGEuZW50cmllcygpKTtcbiAgICBpZiAoaXNFUzZTZXQkJDEoYSkgfHwgaXNPYnNlcnZhYmxlU2V0JCQxKGEpKVxuICAgICAgICByZXR1cm4gQXJyYXkuZnJvbShhLmVudHJpZXMoKSk7XG4gICAgcmV0dXJuIGE7XG59XG5mdW5jdGlvbiBoYXMkMShhLCBrZXkpIHtcbiAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGEsIGtleSk7XG59XG5cbmZ1bmN0aW9uIG1ha2VJdGVyYWJsZShpdGVyYXRvcikge1xuICAgIGl0ZXJhdG9yW1N5bWJvbC5pdGVyYXRvcl0gPSBzZWxmO1xuICAgIHJldHVybiBpdGVyYXRvcjtcbn1cbmZ1bmN0aW9uIHNlbGYoKSB7XG4gICAgcmV0dXJuIHRoaXM7XG59XG5cbi8qXG5UaGUgb25seSByZWFzb24gZm9yIHRoaXMgZmlsZSB0byBleGlzdCBpcyBwdXJlIGhvcnJvcjpcbldpdGhvdXQgaXQgcm9sbHVwIGNhbiBtYWtlIHRoZSBidW5kbGluZyBmYWlsIGF0IGFueSBwb2ludCBpbiB0aW1lOyB3aGVuIGl0IHJvbGxzIHVwIHRoZSBmaWxlcyBpbiB0aGUgd3Jvbmcgb3JkZXJcbml0IHdpbGwgY2F1c2UgdW5kZWZpbmVkIGVycm9ycyAoZm9yIGV4YW1wbGUgYmVjYXVzZSBzdXBlciBjbGFzc2VzIG9yIGxvY2FsIHZhcmlhYmxlcyBub3QgYmVpbmcgaG9zdGVkKS5cbldpdGggdGhpcyBmaWxlIHRoYXQgd2lsbCBzdGlsbCBoYXBwZW4sXG5idXQgYXQgbGVhc3QgaW4gdGhpcyBmaWxlIHdlIGNhbiBtYWdpY2FsbHkgcmVvcmRlciB0aGUgaW1wb3J0cyB3aXRoIHRyaWFsIGFuZCBlcnJvciB1bnRpbCB0aGUgYnVpbGQgc3VjY2VlZHMgYWdhaW4uXG4qL1xuXG4vKipcbiAqIChjKSBNaWNoZWwgV2VzdHN0cmF0ZSAyMDE1IC0gMjAxOFxuICogTUlUIExpY2Vuc2VkXG4gKlxuICogV2VsY29tZSB0byB0aGUgbW9ieCBzb3VyY2VzISBUbyBnZXQgYW4gZ2xvYmFsIG92ZXJ2aWV3IG9mIGhvdyBNb2JYIGludGVybmFsbHkgd29ya3MsXG4gKiB0aGlzIGlzIGEgZ29vZCBwbGFjZSB0byBzdGFydDpcbiAqIGh0dHBzOi8vbWVkaXVtLmNvbS9AbXdlc3RzdHJhdGUvYmVjb21pbmctZnVsbHktcmVhY3RpdmUtYW4taW4tZGVwdGgtZXhwbGFuYXRpb24tb2YtbW9ic2VydmFibGUtNTU5OTUyNjJhMjU0Iy54dmJoNnFkNzRcbiAqXG4gKiBTb3VyY2UgZm9sZGVyczpcbiAqID09PT09PT09PT09PT09PVxuICpcbiAqIC0gYXBpLyAgICAgTW9zdCBvZiB0aGUgcHVibGljIHN0YXRpYyBtZXRob2RzIGV4cG9zZWQgYnkgdGhlIG1vZHVsZSBjYW4gYmUgZm91bmQgaGVyZS5cbiAqIC0gY29yZS8gICAgSW1wbGVtZW50YXRpb24gb2YgdGhlIE1vYlggYWxnb3JpdGhtOyBhdG9tcywgZGVyaXZhdGlvbnMsIHJlYWN0aW9ucywgZGVwZW5kZW5jeSB0cmVlcywgb3B0aW1pemF0aW9ucy4gQ29vbCBzdHVmZiBjYW4gYmUgZm91bmQgaGVyZS5cbiAqIC0gdHlwZXMvICAgQWxsIHRoZSBtYWdpYyB0aGF0IGlzIG5lZWQgdG8gaGF2ZSBvYnNlcnZhYmxlIG9iamVjdHMsIGFycmF5cyBhbmQgdmFsdWVzIGlzIGluIHRoaXMgZm9sZGVyLiBJbmNsdWRpbmcgdGhlIG1vZGlmaWVycyBsaWtlIGBhc0ZsYXRgLlxuICogLSB1dGlscy8gICBVdGlsaXR5IHN0dWZmLlxuICpcbiAqL1xuaWYgKHR5cGVvZiBQcm94eSA9PT0gXCJ1bmRlZmluZWRcIiB8fCB0eXBlb2YgU3ltYm9sID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiW21vYnhdIE1vYlggNSsgcmVxdWlyZXMgUHJveHkgYW5kIFN5bWJvbCBvYmplY3RzLiBJZiB5b3VyIGVudmlyb25tZW50IGRvZXNuJ3Qgc3VwcG9ydCBTeW1ib2wgb3IgUHJveHkgb2JqZWN0cywgcGxlYXNlIGRvd25ncmFkZSB0byBNb2JYIDQuIEZvciBSZWFjdCBOYXRpdmUgQW5kcm9pZCwgY29uc2lkZXIgdXBncmFkaW5nIEpTQ29yZS5cIik7XG59XG50cnkge1xuICAgIC8vIGRlZmluZSBwcm9jZXNzLmVudiBpZiBuZWVkZWRcbiAgICAvLyBpZiB0aGlzIGlzIG5vdCBhIHByb2R1Y3Rpb24gYnVpbGQgaW4gdGhlIGZpcnN0IHBsYWNlXG4gICAgLy8gKGluIHdoaWNoIGNhc2UgdGhlIGV4cHJlc3Npb24gYmVsb3cgd291bGQgYmUgc3Vic3RpdHV0ZWQgd2l0aCAncHJvZHVjdGlvbicpXG4gICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlY7XG59XG5jYXRjaCAoZSkge1xuICAgIHZhciBnID0gdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IGdsb2JhbDtcbiAgICBpZiAodHlwZW9mIHByb2Nlc3MgPT09IFwidW5kZWZpbmVkXCIpXG4gICAgICAgIGcucHJvY2VzcyA9IHt9O1xuICAgIGcucHJvY2Vzcy5lbnYgPSB7fTtcbn1cblxuKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiB0ZXN0Q29kZU1pbmlmaWNhdGlvbigpIHsgfVxuICAgIGlmICh0ZXN0Q29kZU1pbmlmaWNhdGlvbi5uYW1lICE9PSBcInRlc3RDb2RlTWluaWZpY2F0aW9uXCIgJiZcbiAgICAgICAgcHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09IFwicHJvZHVjdGlvblwiICYmXG4gICAgICAgIHByb2Nlc3MuZW52LklHTk9SRV9NT0JYX01JTklGWV9XQVJOSU5HICE9PSBcInRydWVcIikge1xuICAgICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgIC8vIFRlbXBsYXRlIGxpdGVyYWwoYmFja3RpY2spIGlzIHVzZWQgZm9yIGZpeCBpc3N1ZSB3aXRoIHJvbGx1cC1wbHVnaW4tY29tbW9uanMgaHR0cHM6Ly9naXRodWIuY29tL3JvbGx1cC9yb2xsdXAtcGx1Z2luLWNvbW1vbmpzL2lzc3Vlcy8zNDRcbiAgICAgICAgXCJbbW9ieF0geW91IGFyZSBydW5uaW5nIGEgbWluaWZpZWQgYnVpbGQsIGJ1dCAncHJvY2Vzcy5lbnYuTk9ERV9FTlYnIHdhcyBub3Qgc2V0IHRvICdwcm9kdWN0aW9uJyBpbiB5b3VyIGJ1bmRsZXIuIFRoaXMgcmVzdWx0cyBpbiBhbiB1bm5lY2Vzc2FyaWx5IGxhcmdlIGFuZCBzbG93IGJ1bmRsZVwiKTtcbiAgICB9XG59KSgpO1xuLy8gRGV2dG9vbHMgc3VwcG9ydFxuaWYgKHR5cGVvZiBfX01PQlhfREVWVE9PTFNfR0xPQkFMX0hPT0tfXyA9PT0gXCJvYmplY3RcIikge1xuICAgIC8vIFNlZTogaHR0cHM6Ly9naXRodWIuY29tL2FuZHlrb2cvbW9ieC1kZXZ0b29scy9cbiAgICBfX01PQlhfREVWVE9PTFNfR0xPQkFMX0hPT0tfXy5pbmplY3RNb2J4KHtcbiAgICAgICAgc3B5OiBzcHkkJDEsXG4gICAgICAgIGV4dHJhczoge1xuICAgICAgICAgICAgZ2V0RGVidWdOYW1lOiBnZXREZWJ1Z05hbWUkJDFcbiAgICAgICAgfSxcbiAgICAgICAgJG1vYng6ICRtb2J4JCQxXG4gICAgfSk7XG59XG5cbmV4cG9ydCB7IFJlYWN0aW9uJCQxIGFzIFJlYWN0aW9uLCB1bnRyYWNrZWQkJDEgYXMgdW50cmFja2VkLCBJRGVyaXZhdGlvblN0YXRlLCBjcmVhdGVBdG9tJCQxIGFzIGNyZWF0ZUF0b20sIHNweSQkMSBhcyBzcHksIGNvbXBhcmVyJCQxIGFzIGNvbXBhcmVyLCBpc09ic2VydmFibGVPYmplY3QkJDEgYXMgaXNPYnNlcnZhYmxlT2JqZWN0LCBpc09ic2VydmFibGVWYWx1ZSQkMSBhcyBpc0JveGVkT2JzZXJ2YWJsZSwgaXNPYnNlcnZhYmxlQXJyYXkkJDEgYXMgaXNPYnNlcnZhYmxlQXJyYXksIE9ic2VydmFibGVNYXAkJDEgYXMgT2JzZXJ2YWJsZU1hcCwgaXNPYnNlcnZhYmxlTWFwJCQxIGFzIGlzT2JzZXJ2YWJsZU1hcCwgT2JzZXJ2YWJsZVNldCQkMSBhcyBPYnNlcnZhYmxlU2V0LCBpc09ic2VydmFibGVTZXQkJDEgYXMgaXNPYnNlcnZhYmxlU2V0LCB0cmFuc2FjdGlvbiQkMSBhcyB0cmFuc2FjdGlvbiwgb2JzZXJ2YWJsZSQkMSBhcyBvYnNlcnZhYmxlLCBjb21wdXRlZCQkMSBhcyBjb21wdXRlZCwgaXNPYnNlcnZhYmxlJCQxIGFzIGlzT2JzZXJ2YWJsZSwgaXNPYnNlcnZhYmxlUHJvcCQkMSBhcyBpc09ic2VydmFibGVQcm9wLCBpc0NvbXB1dGVkJCQxIGFzIGlzQ29tcHV0ZWQsIGlzQ29tcHV0ZWRQcm9wJCQxIGFzIGlzQ29tcHV0ZWRQcm9wLCBleHRlbmRPYnNlcnZhYmxlJCQxIGFzIGV4dGVuZE9ic2VydmFibGUsIG9ic2VydmUkJDEgYXMgb2JzZXJ2ZSwgaW50ZXJjZXB0JCQxIGFzIGludGVyY2VwdCwgYXV0b3J1biQkMSBhcyBhdXRvcnVuLCByZWFjdGlvbiQkMSBhcyByZWFjdGlvbiwgd2hlbiQkMSBhcyB3aGVuLCBhY3Rpb24kJDEgYXMgYWN0aW9uLCBpc0FjdGlvbiQkMSBhcyBpc0FjdGlvbiwgcnVuSW5BY3Rpb24kJDEgYXMgcnVuSW5BY3Rpb24sIGtleXMkJDEgYXMga2V5cywgdmFsdWVzJCQxIGFzIHZhbHVlcywgZW50cmllcyQkMSBhcyBlbnRyaWVzLCBzZXQkJDEgYXMgc2V0LCByZW1vdmUkJDEgYXMgcmVtb3ZlLCBoYXMkJDEgYXMgaGFzLCBnZXQkJDEgYXMgZ2V0LCBkZWNvcmF0ZSQkMSBhcyBkZWNvcmF0ZSwgY29uZmlndXJlJCQxIGFzIGNvbmZpZ3VyZSwgb25CZWNvbWVPYnNlcnZlZCQkMSBhcyBvbkJlY29tZU9ic2VydmVkLCBvbkJlY29tZVVub2JzZXJ2ZWQkJDEgYXMgb25CZWNvbWVVbm9ic2VydmVkLCBmbG93JCQxIGFzIGZsb3csIHRvSlMkJDEgYXMgdG9KUywgdHJhY2UkJDEgYXMgdHJhY2UsIGdldERlcGVuZGVuY3lUcmVlJCQxIGFzIGdldERlcGVuZGVuY3lUcmVlLCBnZXRPYnNlcnZlclRyZWUkJDEgYXMgZ2V0T2JzZXJ2ZXJUcmVlLCByZXNldEdsb2JhbFN0YXRlJCQxIGFzIF9yZXNldEdsb2JhbFN0YXRlLCBnZXRHbG9iYWxTdGF0ZSQkMSBhcyBfZ2V0R2xvYmFsU3RhdGUsIGdldERlYnVnTmFtZSQkMSBhcyBnZXREZWJ1Z05hbWUsIGdldEF0b20kJDEgYXMgZ2V0QXRvbSwgZ2V0QWRtaW5pc3RyYXRpb24kJDEgYXMgX2dldEFkbWluaXN0cmF0aW9uLCBhbGxvd1N0YXRlQ2hhbmdlcyQkMSBhcyBfYWxsb3dTdGF0ZUNoYW5nZXMsIGFsbG93U3RhdGVDaGFuZ2VzSW5zaWRlQ29tcHV0ZWQkJDEgYXMgX2FsbG93U3RhdGVDaGFuZ2VzSW5zaWRlQ29tcHV0ZWQsIGlzQXJyYXlMaWtlJCQxIGFzIGlzQXJyYXlMaWtlLCAkbW9ieCQkMSBhcyAkbW9ieCwgaXNDb21wdXRpbmdEZXJpdmF0aW9uJCQxIGFzIF9pc0NvbXB1dGluZ0Rlcml2YXRpb24sIG9uUmVhY3Rpb25FcnJvciQkMSBhcyBvblJlYWN0aW9uRXJyb3IsIGludGVyY2VwdFJlYWRzJCQxIGFzIF9pbnRlcmNlcHRSZWFkcyB9O1xuIiwiLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307XG5cbi8vIGNhY2hlZCBmcm9tIHdoYXRldmVyIGdsb2JhbCBpcyBwcmVzZW50IHNvIHRoYXQgdGVzdCBydW5uZXJzIHRoYXQgc3R1YiBpdFxuLy8gZG9uJ3QgYnJlYWsgdGhpbmdzLiAgQnV0IHdlIG5lZWQgdG8gd3JhcCBpdCBpbiBhIHRyeSBjYXRjaCBpbiBjYXNlIGl0IGlzXG4vLyB3cmFwcGVkIGluIHN0cmljdCBtb2RlIGNvZGUgd2hpY2ggZG9lc24ndCBkZWZpbmUgYW55IGdsb2JhbHMuICBJdCdzIGluc2lkZSBhXG4vLyBmdW5jdGlvbiBiZWNhdXNlIHRyeS9jYXRjaGVzIGRlb3B0aW1pemUgaW4gY2VydGFpbiBlbmdpbmVzLlxuXG52YXIgY2FjaGVkU2V0VGltZW91dDtcbnZhciBjYWNoZWRDbGVhclRpbWVvdXQ7XG5cbmZ1bmN0aW9uIGRlZmF1bHRTZXRUaW1vdXQoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdzZXRUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG5mdW5jdGlvbiBkZWZhdWx0Q2xlYXJUaW1lb3V0ICgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2NsZWFyVGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuKGZ1bmN0aW9uICgpIHtcbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIHNldFRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIGNsZWFyVGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICB9XG59ICgpKVxuZnVuY3Rpb24gcnVuVGltZW91dChmdW4pIHtcbiAgICBpZiAoY2FjaGVkU2V0VGltZW91dCA9PT0gc2V0VGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgLy8gaWYgc2V0VGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZFNldFRpbWVvdXQgPT09IGRlZmF1bHRTZXRUaW1vdXQgfHwgIWNhY2hlZFNldFRpbWVvdXQpICYmIHNldFRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9IGNhdGNoKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0IHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKG51bGwsIGZ1biwgMCk7XG4gICAgICAgIH0gY2F0Y2goZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvclxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbCh0aGlzLCBmdW4sIDApO1xuICAgICAgICB9XG4gICAgfVxuXG5cbn1cbmZ1bmN0aW9uIHJ1bkNsZWFyVGltZW91dChtYXJrZXIpIHtcbiAgICBpZiAoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgLy8gaWYgY2xlYXJUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBkZWZhdWx0Q2xlYXJUaW1lb3V0IHx8ICFjYWNoZWRDbGVhclRpbWVvdXQpICYmIGNsZWFyVGltZW91dCkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfSBjYXRjaCAoZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgIHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwobnVsbCwgbWFya2VyKTtcbiAgICAgICAgfSBjYXRjaCAoZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvci5cbiAgICAgICAgICAgIC8vIFNvbWUgdmVyc2lvbnMgb2YgSS5FLiBoYXZlIGRpZmZlcmVudCBydWxlcyBmb3IgY2xlYXJUaW1lb3V0IHZzIHNldFRpbWVvdXRcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbCh0aGlzLCBtYXJrZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG5cblxufVxudmFyIHF1ZXVlID0gW107XG52YXIgZHJhaW5pbmcgPSBmYWxzZTtcbnZhciBjdXJyZW50UXVldWU7XG52YXIgcXVldWVJbmRleCA9IC0xO1xuXG5mdW5jdGlvbiBjbGVhblVwTmV4dFRpY2soKSB7XG4gICAgaWYgKCFkcmFpbmluZyB8fCAhY3VycmVudFF1ZXVlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBpZiAoY3VycmVudFF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBxdWV1ZSA9IGN1cnJlbnRRdWV1ZS5jb25jYXQocXVldWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICB9XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBkcmFpblF1ZXVlKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkcmFpblF1ZXVlKCkge1xuICAgIGlmIChkcmFpbmluZykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciB0aW1lb3V0ID0gcnVuVGltZW91dChjbGVhblVwTmV4dFRpY2spO1xuICAgIGRyYWluaW5nID0gdHJ1ZTtcblxuICAgIHZhciBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgd2hpbGUobGVuKSB7XG4gICAgICAgIGN1cnJlbnRRdWV1ZSA9IHF1ZXVlO1xuICAgICAgICBxdWV1ZSA9IFtdO1xuICAgICAgICB3aGlsZSAoKytxdWV1ZUluZGV4IDwgbGVuKSB7XG4gICAgICAgICAgICBpZiAoY3VycmVudFF1ZXVlKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFF1ZXVlW3F1ZXVlSW5kZXhdLnJ1bigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICAgICAgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIH1cbiAgICBjdXJyZW50UXVldWUgPSBudWxsO1xuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgcnVuQ2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xufVxuXG5wcm9jZXNzLm5leHRUaWNrID0gZnVuY3Rpb24gKGZ1bikge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHF1ZXVlLnB1c2gobmV3IEl0ZW0oZnVuLCBhcmdzKSk7XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCA9PT0gMSAmJiAhZHJhaW5pbmcpIHtcbiAgICAgICAgcnVuVGltZW91dChkcmFpblF1ZXVlKTtcbiAgICB9XG59O1xuXG4vLyB2OCBsaWtlcyBwcmVkaWN0aWJsZSBvYmplY3RzXG5mdW5jdGlvbiBJdGVtKGZ1biwgYXJyYXkpIHtcbiAgICB0aGlzLmZ1biA9IGZ1bjtcbiAgICB0aGlzLmFycmF5ID0gYXJyYXk7XG59XG5JdGVtLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5mdW4uYXBwbHkobnVsbCwgdGhpcy5hcnJheSk7XG59O1xucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcbnByb2Nlc3MuYnJvd3NlciA9IHRydWU7XG5wcm9jZXNzLmVudiA9IHt9O1xucHJvY2Vzcy5hcmd2ID0gW107XG5wcm9jZXNzLnZlcnNpb24gPSAnJzsgLy8gZW1wdHkgc3RyaW5nIHRvIGF2b2lkIHJlZ2V4cCBpc3N1ZXNcbnByb2Nlc3MudmVyc2lvbnMgPSB7fTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnByb2Nlc3Mub24gPSBub29wO1xucHJvY2Vzcy5hZGRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLm9uY2UgPSBub29wO1xucHJvY2Vzcy5vZmYgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5wcm9jZXNzLmVtaXQgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kT25jZUxpc3RlbmVyID0gbm9vcDtcblxucHJvY2Vzcy5saXN0ZW5lcnMgPSBmdW5jdGlvbiAobmFtZSkgeyByZXR1cm4gW10gfVxuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5cbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xucHJvY2Vzcy51bWFzayA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gMDsgfTtcbiIsInZhciBnO1xuXG4vLyBUaGlzIHdvcmtzIGluIG5vbi1zdHJpY3QgbW9kZVxuZyA9IChmdW5jdGlvbigpIHtcblx0cmV0dXJuIHRoaXM7XG59KSgpO1xuXG50cnkge1xuXHQvLyBUaGlzIHdvcmtzIGlmIGV2YWwgaXMgYWxsb3dlZCAoc2VlIENTUClcblx0ZyA9IGcgfHwgbmV3IEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKTtcbn0gY2F0Y2ggKGUpIHtcblx0Ly8gVGhpcyB3b3JrcyBpZiB0aGUgd2luZG93IHJlZmVyZW5jZSBpcyBhdmFpbGFibGVcblx0aWYgKHR5cGVvZiB3aW5kb3cgPT09IFwib2JqZWN0XCIpIGcgPSB3aW5kb3c7XG59XG5cbi8vIGcgY2FuIHN0aWxsIGJlIHVuZGVmaW5lZCwgYnV0IG5vdGhpbmcgdG8gZG8gYWJvdXQgaXQuLi5cbi8vIFdlIHJldHVybiB1bmRlZmluZWQsIGluc3RlYWQgb2Ygbm90aGluZyBoZXJlLCBzbyBpdCdzXG4vLyBlYXNpZXIgdG8gaGFuZGxlIHRoaXMgY2FzZS4gaWYoIWdsb2JhbCkgeyAuLi59XG5cbm1vZHVsZS5leHBvcnRzID0gZztcbiIsImltcG9ydCBSb290U3RvcmUgZnJvbSBcIi4uL3N0b3JlXCI7XHJcbmltcG9ydCBoaXN0b3J5IGZyb20gXCIuL3RhYi9oaXN0b3J5XCI7XHJcbmltcG9ydCBvbkluc3RhbGwgZnJvbSBcIi4vcnVudGltZS9vbkluc3RhbGxcIjtcclxuaW1wb3J0IG9uTWVzc2FnZSBmcm9tIFwiLi9ydW50aW1lL29uTWVzc2FnZVwiO1xyXG5cclxuY29uc3Qgc3RvcmUgPSBuZXcgUm9vdFN0b3JlKHRydWUsICgpID0+IHtcclxuICBoaXN0b3J5KHN0b3JlLndlYnRvb24sIHN0b3JlLm9wdGlvbik7XHJcbiAgb25NZXNzYWdlKHN0b3JlLndlYnRvb24sIHN0b3JlLm9wdGlvbik7XHJcbiAgLy8gY29udGV4dE1lbnUoc3RvcmUud2VidG9vbiwgc3RvcmUub3B0aW9uKTtcclxufSk7XHJcblxyXG5vbkluc3RhbGwoc3RvcmUud2VidG9vbiwgc3RvcmUub3B0aW9uKTtcclxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24ocHJldlZlcnNpb246IHN0cmluZywgY3VyVmVyc2lvbjogc3RyaW5nKSB7XHJcbiAgaWYgKHByZXZWZXJzaW9uID09PSBcIjMuMC4wXCIpIHtcclxuICAgIHdoYWxlLnN0b3JhZ2Uuc3luYy5nZXQoc3luY1ZhbHVlID0+IHtcclxuICAgICAgd2hhbGUuc3RvcmFnZS5sb2NhbC5nZXQobG9jYWxWYWx1ZSA9PiB7XHJcbiAgICAgICAgY29uc3QgZ2V0ID0gKG5hbWU6IHN0cmluZykgPT4gc3luY1ZhbHVlW25hbWVdIHx8IGxvY2FsVmFsdWVbbmFtZV07XHJcbiAgICAgICAgY29uc3Qgb2xkT3B0aW9uID0gc3luY1ZhbHVlLm9wdGlvbjtcclxuICAgICAgICBjb25zdCBvbGRGYXZvcmF0ZSA9IGdldChcImZhdm9yYXRlXCIpO1xyXG4gICAgICAgIGNvbnN0IG9sZEltZ2xvZyA9IGdldChcImltZ2xvZ1wiKTtcclxuICAgICAgICBjb25zdCBvbGRXZWJ0b29uID0gZ2V0KFwid2VidG9vblwiKTtcclxuICAgICAgICBjb25zdCBvbGRWaXNpdHMgPSBnZXQoXCJ2aXNpdHNcIik7XHJcbiAgICAgICAgY29uc3Qgb2xkU2Nyb2xsID0gZ2V0KFwic2Nyb2xsc1wiKTtcclxuICAgICAgICBsZXQgbmV3T3B0aW9uID0ge30sXHJcbiAgICAgICAgICBuZXdGYXZvcmF0ZSA9IFtdLFxyXG4gICAgICAgICAgbmV3SW1nbG9nID0ge30sXHJcbiAgICAgICAgICBuZXdXZWJ0b29uID0ge30sXHJcbiAgICAgICAgICBuZXdWaXNpdHMgPSB7fSxcclxuICAgICAgICAgIG5ld1Njcm9sbCA9IHt9O1xyXG4gICAgICAgIGlmIChvbGRPcHRpb24pIHtcclxuICAgICAgICAgIG5ld09wdGlvbiA9IHtcclxuICAgICAgICAgICAgX3N0b3JlTG9jYXRpb246IFwibG9jYWxcIixcclxuICAgICAgICAgICAgX29yZGVyQnk6IFtcIlZpZXdDb3VudFwiLCBcIlVwZGF0ZVwiLCBcIlN0YXJTY29yZVwiLCBcIlRpdGxlTmFtZVwiXVtvbGRPcHRpb24uc29ydF0sXHJcbiAgICAgICAgICAgIF9zaG93SGlzdG9yeTogb2xkT3B0aW9uLnNob3dIaXN0cnksXHJcbiAgICAgICAgICAgIF9oaXN0b3J5TWF4OiBvbGRPcHRpb24uaGlzdG9yeUNvdW50LFxyXG4gICAgICAgICAgICBfc2F2ZVdlYnRvb25Tb3J0OiBvbGRPcHRpb24uc2F2ZVdzb3J0LFxyXG4gICAgICAgICAgICBfc2F2ZVNjcm9sbDogb2xkT3B0aW9uLnNhdmVTY3JvbGwsXHJcbiAgICAgICAgICAgIF9oaWRkZW5Db21tZW50OiBvbGRPcHRpb24uaGlkZGVuQ29tbWVudCxcclxuICAgICAgICAgICAgX2F1dG9OZXh0OiBvbGRPcHRpb24uYXV0b05leHQsXHJcbiAgICAgICAgICAgIF91c2VJbWdMb2c6IG9sZE9wdGlvbi51c2VpbWdsb2csXHJcbiAgICAgICAgICAgIF9zYXZlRmF2b3JhdGU6IG9sZE9wdGlvbi51c2VGYXZvcmF0ZSxcclxuICAgICAgICAgICAgX2xpbmtUYXJnZXQ6IG9sZE9wdGlvbi5saW5rdGFiXHJcbiAgICAgICAgICAgICAgPyBcIlRhYlwiXHJcbiAgICAgICAgICAgICAgOiBvbGRPcHRpb24ubGlua1BvcHVwXHJcbiAgICAgICAgICAgICAgPyBcIlBvcHVwXCJcclxuICAgICAgICAgICAgICA6IG9sZE9wdGlvbi5saW5rU2lkZVxyXG4gICAgICAgICAgICAgID8gXCJTaWRlYmFyXCJcclxuICAgICAgICAgICAgICA6IFwiQ3VycmVudFwiLFxyXG4gICAgICAgICAgICBfc2Nyb2xsQWxlcnQ6IHRydWUsXHJcbiAgICAgICAgICAgIF91c2VDb250ZXh0TWVudTogZmFsc2VcclxuICAgICAgICAgIH07XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIG5ld09wdGlvbiA9IHtcclxuICAgICAgICAgICAgX3N0b3JlTG9jYXRpb246IFwibG9jYWxcIixcclxuICAgICAgICAgICAgX29yZGVyQnk6IFwiVmlld0NvdW50XCIsXHJcbiAgICAgICAgICAgIF9zaG93SGlzdG9yeTogdHJ1ZSxcclxuICAgICAgICAgICAgX2hpc3RvcnlNYXg6IDEwMDAsXHJcbiAgICAgICAgICAgIF9zYXZlV2VidG9vblNvcnQ6IHRydWUsXHJcbiAgICAgICAgICAgIF9zYXZlU2Nyb2xsOiB0cnVlLFxyXG4gICAgICAgICAgICBfaGlkZGVuQ29tbWVudDogZmFsc2UsXHJcbiAgICAgICAgICAgIF9hdXRvTmV4dDogdHJ1ZSxcclxuICAgICAgICAgICAgX3VzZUltZ0xvZzogdHJ1ZSxcclxuICAgICAgICAgICAgX3NhdmVGYXZvcmF0ZTogdHJ1ZSxcclxuICAgICAgICAgICAgX2xpbmtUYXJnZXQ6IFwiU2lkZWJhclwiLFxyXG4gICAgICAgICAgICBfc2Nyb2xsQWxlcnQ6IHRydWUsXHJcbiAgICAgICAgICAgIF91c2VDb250ZXh0TWVudTogZmFsc2VcclxuICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChvbGRXZWJ0b29uKSB7XHJcbiAgICAgICAgICBPYmplY3Qua2V5cyhvbGRXZWJ0b29uKS5mb3JFYWNoKGtleSA9PiB7XHJcbiAgICAgICAgICAgIG5ld1dlYnRvb25ba2V5XSA9IHtcclxuICAgICAgICAgICAgICB0aXRsZTogb2xkV2VidG9vbltrZXldLm5hLFxyXG4gICAgICAgICAgICAgIHR5cGU6IG9sZFdlYnRvb25ba2V5XS50XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIGlmIChvbGRGYXZvcmF0ZSkge1xyXG4gICAgICAgICAgICBvbGRGYXZvcmF0ZS5mb3JFYWNoKGtleSA9PiB7XHJcbiAgICAgICAgICAgICAgT2JqZWN0LmtleXMobmV3V2VidG9vbikuZm9yRWFjaChrZXkyID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChuZXdXZWJ0b29uW2tleTJdLnRpdGxlID09IGtleSkgbmV3RmF2b3JhdGUucHVzaChrZXkyKTtcclxuICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChvbGRWaXNpdHMpIG5ld1Zpc2l0cyA9IG9sZFZpc2l0cztcclxuICAgICAgICBpZiAob2xkSW1nbG9nKSBuZXdJbWdsb2cgPSBvbGRJbWdsb2c7XHJcbiAgICAgICAgaWYgKG9sZFNjcm9sbCkgbmV3U2Nyb2xsID0gb2xkU2Nyb2xsO1xyXG5cclxuICAgICAgICB3aGFsZS5zdG9yYWdlLmxvY2FsLnNldChcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgaW1nbG9nOiBKU09OLnN0cmluZ2lmeShuZXdJbWdsb2cpLFxyXG4gICAgICAgICAgICBzY3JvbGxzOiBKU09OLnN0cmluZ2lmeShuZXdTY3JvbGwpLFxyXG4gICAgICAgICAgICB2aXNpdHM6IEpTT04uc3RyaW5naWZ5KG5ld1Zpc2l0cyksXHJcbiAgICAgICAgICAgIHdlYnRvb246IEpTT04uc3RyaW5naWZ5KG5ld1dlYnRvb24pXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIk1pZ3JhdGlvbiBMb2NhbCBTdWNjZXNzXCIpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgd2hhbGUuc3RvcmFnZS5zeW5jLnNldChcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgb3B0aW9uOiBKU09OLnN0cmluZ2lmeShuZXdPcHRpb24pLFxyXG4gICAgICAgICAgICBmYXZvcmF0ZTogSlNPTi5zdHJpbmdpZnkobmV3RmF2b3JhdGUpXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIk1pZ3JhdGlvbiBTeW5jIFN1Y2Nlc3NcIik7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IFdlYnRvb25TdG9yZSBmcm9tIFwiLi4vLi4vc3RvcmUvd2VidG9vblwiO1xyXG5pbXBvcnQgT3B0aW9uU3RvcmUgZnJvbSBcIi4uLy4uL3N0b3JlL29wdGlvblwiO1xyXG5pbXBvcnQgbWlncmF0aW9uIGZyb20gXCIuL21pZ3JhdGlvblwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24od2VidG9vbjogV2VidG9vblN0b3JlLCBvcHRpb246IE9wdGlvblN0b3JlKSB7XHJcbiAgd2hhbGUucnVudGltZS5vbkluc3RhbGxlZC5hZGRMaXN0ZW5lcihkZXRhaWxzID0+IHtcclxuICAgIGNvbnNvbGUubG9nKGRldGFpbHMpO1xyXG4gICAgaWYgKGRldGFpbHMucmVhc29uID09PSBcImluc3RhbGxcIikge1xyXG4gICAgICBjb25zb2xlLmxvZyhcIkluaXQgU3RhcnRcIik7XHJcbiAgICAgIHdlYnRvb24uc2V0VmlzaXRzRnJvbUNocm9tZSgpO1xyXG4gICAgfSBlbHNlIGlmIChkZXRhaWxzLnJlYXNvbiA9PT0gXCJ1cGRhdGVcIikge1xyXG4gICAgICBjb25zdCBjdXJyZW50VmVyc2lvbiA9IHdoYWxlLnJ1bnRpbWUuZ2V0TWFuaWZlc3QoKS52ZXJzaW9uO1xyXG4gICAgICBpZiAoZGV0YWlscy5wcmV2aW91c1ZlcnNpb24gIT0gY3VycmVudFZlcnNpb24pIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhkZXRhaWxzLnByZXZpb3VzVmVyc2lvbiwgY3VycmVudFZlcnNpb24pO1xyXG4gICAgICAgIG1pZ3JhdGlvbihkZXRhaWxzLnByZXZpb3VzVmVyc2lvbiwgY3VycmVudFZlcnNpb24pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSk7XHJcbn1cclxuIiwiaW1wb3J0IFdlYnRvb25TdG9yZSBmcm9tIFwiLi4vLi4vc3RvcmUvd2VidG9vblwiO1xyXG5pbXBvcnQgT3B0aW9uU3RvcmUgZnJvbSBcIi4uLy4uL3N0b3JlL29wdGlvblwiO1xyXG5pbXBvcnQgeyBDaHJvbWVNZXNzYWdlIH0gZnJvbSBcIi4uLy4uLy4uL0B0eXBlcy9jb21tZW5kXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbih3ZWJ0b29uOiBXZWJ0b29uU3RvcmUsIG9wdGlvbjogT3B0aW9uU3RvcmUpIHtcclxuICB3aGFsZS5ydW50aW1lLm9uTWVzc2FnZS5hZGRMaXN0ZW5lcihcclxuICAgIChtZXNzYWdlOiBDaHJvbWVNZXNzYWdlLCBzZW5kZXIsIHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgIGNvbnN0IHBhcmFtID0gbmV3IFVSTChzZW5kZXIudXJsKS5zZWFyY2hQYXJhbXM7XHJcbiAgICAgIGNvbnNvbGUubG9nKHBhcmFtKTtcclxuICAgICAgY29uc3Qgd2lkID0gcGFyYW0uZ2V0KFwidGl0bGVJZFwiKTtcclxuICAgICAgY29uc3Qgbm8gPSBwYXJhbS5nZXQoXCJub1wiKTtcclxuICAgICAgaWYgKG1lc3NhZ2UgJiYgbWVzc2FnZS5jb21tYW5kID09PSBcIm9wZW5UYWJcIikge1xyXG4gICAgICAgIGNvbnN0IGxpbmsgPSBzZW5kZXIudXJsLnJlcGxhY2UoXCJtLmNvbWljXCIsIFwiY29taWNcIik7XHJcbiAgICAgICAgLy8gRm9yY2UgVGFiXHJcbiAgICAgICAgd2hhbGUudGFicy5jcmVhdGUoe1xyXG4gICAgICAgICAgdXJsOiBsaW5rXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gb3B0aW9uLm9wZW5UYWIobGluayk7XHJcbiAgICAgICAgcmVzcG9uc2UobnVsbCk7XHJcbiAgICAgIH0gZWxzZSBpZiAod2lkICYmIG5vICYmIG1lc3NhZ2Uuc2Nyb2xsICYmIG9wdGlvbi5zYXZlU2Nyb2xsKSB7XHJcbiAgICAgICAgbWVzc2FnZS5zY3JvbGwgPSBNYXRoLnJvdW5kKG1lc3NhZ2Uuc2Nyb2xsICogMTAwKTtcclxuICAgICAgICBpZiAobWVzc2FnZS5zY3JvbGwgPD0gMiB8fCBtZXNzYWdlLnNjcm9sbCA+PSA5OCkge1xyXG4gICAgICAgICAgaWYgKHdlYnRvb24uc2Nyb2xsc1t3aWRdICYmIHdlYnRvb24uc2Nyb2xsc1t3aWRdW25vXSkge1xyXG4gICAgICAgICAgICBkZWxldGUgd2VidG9vbi5zY3JvbGxzW3dpZF1bbm9dO1xyXG4gICAgICAgICAgICBpZiAoT2JqZWN0LmtleXMod2VidG9vbi5zY3JvbGxzW3dpZF0pLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgZGVsZXRlIHdlYnRvb24uc2Nyb2xsc1t3aWRdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB3ZWJ0b29uLnNjcm9sbHMgPSB3ZWJ0b29uLnNjcm9sbHM7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghd2VidG9vbi5zY3JvbGxzW3dpZF0pIHtcclxuICAgICAgICAgIHdlYnRvb24uc2Nyb2xsc1t3aWRdID0ge307XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHdlYnRvb24uc2Nyb2xsc1t3aWRdW25vXSA9IG1lc3NhZ2Uuc2Nyb2xsO1xyXG4gICAgICAgIC8vIFNhdmUgdG8gU3RvcmVcclxuICAgICAgICB3ZWJ0b29uLnNjcm9sbHMgPSB3ZWJ0b29uLnNjcm9sbHM7XHJcbiAgICAgIH0gZWxzZSBpZiAobWVzc2FnZSAmJiBtZXNzYWdlLmNvbW1hbmQgPT09IFwicmVsb2FkXCIpIHtcclxuICAgICAgICBsb2NhdGlvbi5yZWxvYWQoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICk7XHJcbn1cclxuIiwiaW1wb3J0IFdlYnRvb25TdG9yZSwgeyBWaXNpdFR5cGUgfSBmcm9tIFwiLi4vLi4vc3RvcmUvd2VidG9vblwiO1xyXG5pbXBvcnQgT3B0aW9uU3RvcmUgZnJvbSBcIi4uLy4uL3N0b3JlL29wdGlvblwiO1xyXG5pbXBvcnQgKiBhcyBVdGlsaXR5IGZyb20gXCIuL3V0aWxpdHlcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHdlYnRvb246IFdlYnRvb25TdG9yZSwgb3B0aW9uOiBPcHRpb25TdG9yZSkge1xyXG4gIHdoYWxlLnRhYnMub25VcGRhdGVkLmFkZExpc3RlbmVyKCh0YWJJZCwgaW5mbywgdGFiKSA9PiB7XHJcbiAgICBpZiAoaW5mby5zdGF0dXMgJiYgaW5mby5zdGF0dXMgPT09IFwiY29tcGxldGVcIikge1xyXG4gICAgICBjb25zdCB1cmwgPSBuZXcgVVJMKHRhYi51cmwpO1xyXG4gICAgICBpZiAodXJsLmhvc3QgPT09IFwiY29taWMubmF2ZXIuY29tXCIpIHtcclxuICAgICAgICAvLyDtmozssKgg66as7Iqk7Yq4IO2OmOydtOyngFxyXG4gICAgICAgIGlmICh1cmwucGF0aG5hbWUuaW5kZXhPZihcIi9saXN0Lm5oblwiKSA+IDApIHtcclxuICAgICAgICAgIGNvbnN0IHdlYnRvb25JZCA9IHVybC5zZWFyY2hQYXJhbXMuZ2V0KFwidGl0bGVJZFwiKTtcclxuICAgICAgICAgIFV0aWxpdHkuZGlzcGxheUhpc3RvcnkoXHJcbiAgICAgICAgICAgIHRhYklkLFxyXG4gICAgICAgICAgICB3ZWJ0b29uSWQsXHJcbiAgICAgICAgICAgIHdlYnRvb24udmlzaXRzLFxyXG4gICAgICAgICAgICBvcHRpb24uc2hvd0hpc3RvcnlcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIOybue2IsCDrs7TripQg7Y6Y7J207KeAXHJcbiAgICAgICAgZWxzZSBpZiAodXJsLnBhdGhuYW1lLmluZGV4T2YoXCIvZGV0YWlsLm5oblwiKSA+IDApIHtcclxuICAgICAgICAgIGNvbnN0IHdlYnRvb25JZCA9IHVybC5zZWFyY2hQYXJhbXMuZ2V0KFwidGl0bGVJZFwiKTtcclxuICAgICAgICAgIGNvbnN0IG5vID0gdXJsLnNlYXJjaFBhcmFtcy5nZXQoXCJub1wiKTtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKHVybCk7XHJcbiAgICAgICAgICBpZiAoIXdlYnRvb25JZCB8fCAhbm8pIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKCF3ZWJ0b29uLndlYnRvb25UeXBlW3dlYnRvb25JZF0pIHtcclxuICAgICAgICAgICAgd2VidG9vbi52aXNpdHNbd2VidG9vbklkXSA9IHt9O1xyXG4gICAgICAgICAgICB3ZWJ0b29uLndlYnRvb25UeXBlW3dlYnRvb25JZF0gPSB7XHJcbiAgICAgICAgICAgICAgdGl0bGU6IHRhYi50aXRsZS5zcGxpdChcIjo6XCIpWzBdLnRyaW0oKSxcclxuICAgICAgICAgICAgICB0eXBlOiB1cmwucGF0aG5hbWUuc3BsaXQoXCIvZGV0YWlsLm5oblwiKVswXVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgY29uc29sZS5sb2cod2VidG9vbklkLCBubyk7XHJcbiAgICAgICAgICB3ZWJ0b29uLnZpc2l0c1t3ZWJ0b29uSWRdW25vXSA9IE1hdGguZmxvb3IoXHJcbiAgICAgICAgICAgIG5ldyBEYXRlKCkuZ2V0VGltZSgpIC8gMTAwMFxyXG4gICAgICAgICAgKTtcclxuICAgICAgICAgIGlmIChvcHRpb24uc2F2ZVNjcm9sbCkge1xyXG4gICAgICAgICAgICBVdGlsaXR5LmNoZWNrU2Nyb2xsKHRhYklkLCBmYWxzZSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAod2VidG9vbi5zY3JvbGxzW3dlYnRvb25JZF0gJiYgd2VidG9vbi5zY3JvbGxzW3dlYnRvb25JZF1bbm9dKSB7XHJcbiAgICAgICAgICAgIFV0aWxpdHkuc2V0U2Nyb2xsKFxyXG4gICAgICAgICAgICAgIHRhYklkLFxyXG4gICAgICAgICAgICAgIHdlYnRvb24uc2Nyb2xsc1t3ZWJ0b29uSWRdW25vXSxcclxuICAgICAgICAgICAgICBmYWxzZSxcclxuICAgICAgICAgICAgICBvcHRpb24uc2Nyb2xsQWxlcnRcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmIChvcHRpb24uYXV0b05leHQpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJhdXRvbmV4dFwiKTtcclxuICAgICAgICAgICAgVXRpbGl0eS5hdXRvTmV4dCh0YWJJZCwgb3B0aW9uLmF1dG9OZXh0KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmIChvcHRpb24uaGlkZGVuQ29tbWVudCkgVXRpbGl0eS5oaWRkZW5Db21tZW50KHRhYklkLCBmYWxzZSk7XHJcblxyXG4gICAgICAgICAgLy8gU2F2ZSB0byBTdG9yZVxyXG4gICAgICAgICAgd2VidG9vbi53ZWJ0b29uVHlwZSA9IHdlYnRvb24ud2VidG9vblR5cGU7XHJcbiAgICAgICAgICB3ZWJ0b29uLnZpc2l0cyA9IHdlYnRvb24udmlzaXRzO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0pO1xyXG59XHJcbiIsImltcG9ydCB7IFZpc2l0VHlwZSB9IGZyb20gXCIuLi8uLi9zdG9yZS93ZWJ0b29uXCI7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaGlkZGVuQ29tbWVudCh0YWJJZDogbnVtYmVyLCBpc01vYmlsZTogYm9vbGVhbikge1xyXG4gIGNvbnN0IGNvZGUgPSBgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCIke1xyXG4gICAgaXNNb2JpbGUgPyBcImNib3hfbW9kdWxlXCIgOiBcImNvbW1lbnRJZnJhbWVcIlxyXG4gIH1cIikuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiYDtcclxuICBpZiAoIXRhYklkKSB7XHJcbiAgICBldmFsKGNvZGUpO1xyXG4gICAgcmV0dXJuO1xyXG4gIH0gZWxzZVxyXG4gICAgd2hhbGUudGFicy5leGVjdXRlU2NyaXB0KHRhYklkLCB7XHJcbiAgICAgIGNvZGU6IGNvZGVcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY2hlY2tTY3JvbGwodGFiSWQ6IG51bWJlciwgaXNNb2JpbGU6IGJvb2xlYW4pIHtcclxuICBjb25zdCBjb2RlID0gaXNNb2JpbGVcclxuICAgID8gYFxyXG4gIHZhciBjaGVja1BlcmNlbnQ7XHJcbiAgZnVuY3Rpb24gY2hlY2tTYyggZXZlbnQgKSB7XHJcbiAgICB3aW5kb3cuY2xlYXJUaW1lb3V0KCBjaGVja1BlcmNlbnQgKTtcclxuICAgIGNoZWNrUGVyY2VudCA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICB3aGFsZS5ydW50aW1lLnNlbmRNZXNzYWdlKFwiJHtcclxuICAgICAgd2hhbGUucnVudGltZS5pZFxyXG4gICAgfVwiLCB7c2Nyb2xsIDogZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcCAvIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdG9vbkxheWVyPnVsXCIpLnNjcm9sbEhlaWdodCB9KVxyXG4gIH0sIDEwMClcclxufVxyXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJyxjaGVja1NjLCBmYWxzZSk7YFxyXG4gICAgOiBgXHJcbnZhciBjaGVja1BlcmNlbnQ7XHJcbmZ1bmN0aW9uIGNoZWNrU2MoIGV2ZW50ICkge1xyXG4gICAgd2luZG93LmNsZWFyVGltZW91dCggY2hlY2tQZXJjZW50ICk7XHJcbiAgICBjaGVja1BlcmNlbnQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG53aGFsZS5ydW50aW1lLnNlbmRNZXNzYWdlKCcke1xyXG4gICAgICAgIHdoYWxlLnJ1bnRpbWUuaWRcclxuICAgICAgfScsIHtzY3JvbGwgOiAoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcCAtIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIud3Rfdmlld2VyXCIpLmNoaWxkTm9kZXNbMV0ub2Zmc2V0VG9wKSAvIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIud3Rfdmlld2VyXCIpLnNjcm9sbEhlaWdodCB9KVxyXG59LCAxMDApO31cclxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsY2hlY2tTYywgZmFsc2UpO2A7XHJcbiAgaWYgKCF0YWJJZCkge1xyXG4gICAgZXZhbChjb2RlKTtcclxuICAgIHJldHVybjtcclxuICB9XHJcblxyXG4gIHdoYWxlLnRhYnMuZXhlY3V0ZVNjcmlwdCh0YWJJZCwge1xyXG4gICAgY29kZTogY29kZVxyXG4gIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc2V0U2Nyb2xsKFxyXG4gIHRhYklkOiBudW1iZXIsXHJcbiAgc2Nyb2xsOiBudW1iZXIsXHJcbiAgaXNNb2JpbGU6IGJvb2xlYW4sXHJcbiAgc2Nyb2xsQWxlcnQ6IGJvb2xlYW5cclxuKSB7XHJcbiAgY29uc3QgY29kZSA9IGlzTW9iaWxlXHJcbiAgICA/IGBzZXRUaW1lb3V0KCgpPT57ZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdG9vbkxheWVyPnVsXCIpLnNjcm9sbEhlaWdodCAqICR7c2Nyb2xsIC9cclxuICAgICAgICAxMDB9fSwgMTAwMClgXHJcbiAgICA6IHNjcm9sbEFsZXJ0XHJcbiAgICA/IGBpZiAoY29uZmlybShcIlt3ZWJ0b29uIGV4dGVuc2lvbl0g7J207KCE7JeQIOuzuCDquLDroZ3snbQg64Ko7JWE7J6I7Iq164uI64ukLiAoJHtzY3JvbGx9JSlcXFxcbuydtOyWtOuztOyLnOqyoOyKteuLiOq5jD9cIikpO1xyXG4gICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIud3Rfdmlld2VyXCIpLmNoaWxkTm9kZXNbMV0ub2Zmc2V0VG9wICsgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi53dF92aWV3ZXJcIikuc2Nyb2xsSGVpZ2h0ICogJHtzY3JvbGwgL1xyXG4gICAgICAxMDB9YFxyXG4gICAgOiBgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIud3Rfdmlld2VyXCIpLmNoaWxkTm9kZXNbMV0ub2Zmc2V0VG9wICsgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi53dF92aWV3ZXJcIikuc2Nyb2xsSGVpZ2h0ICogJHtzY3JvbGwgL1xyXG4gICAgICAgIDEwMH1gO1xyXG4gIGlmICghdGFiSWQpIHtcclxuICAgIGV2YWwoY29kZSk7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG5cclxuICB3aGFsZS50YWJzLmV4ZWN1dGVTY3JpcHQodGFiSWQsIHtcclxuICAgIGNvZGU6IGNvZGVcclxuICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGF1dG9OZXh0KHRhYklkOiBudW1iZXIsIGlzQXV0bzogYm9vbGVhbikge1xyXG4gIGNvbnN0IGNvZGUgPSBpc0F1dG9cclxuICAgID8gYHZhciB3dSA9IG5ldyBVUkwod2luZG93LmxvY2F0aW9uLmhyZWYpO1xyXG4gIGNvbnNvbGUubG9nKFwiQXV0b05leHRcIik7XHJcbiAgd3Uuc2VhcmNoUGFyYW1zLnNldChcIm5vXCIsIHd1LnNlYXJjaFBhcmFtcy5nZXQoXCJub1wiKSoxKzEpXHJcbiAgdmFyIGlzU2Nyb2xsaW5nO1xyXG4gIGZ1bmN0aW9uIGNoZWNrU2Nyb2xscyggZXZlbnQgKSB7XHJcbiAgICAgIHdpbmRvdy5jbGVhclRpbWVvdXQoIGlzU2Nyb2xsaW5nICk7XHJcbiAgICAgIGlzU2Nyb2xsaW5nID0gc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICAgIGlmIChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsSGVpZ2h0LWRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3A8MTUwMClcclxuICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSB3dS5ocmVmO1xyXG4gICAgICB9LCA1MDApO1xyXG5cclxuICB9XHJcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsY2hlY2tTY3JvbGxzLCBmYWxzZSk7XHJcbiAgYFxyXG4gICAgOiBgXHJcbiAgaWYgKHdpbmRvd1tcImNoZWNrU2Nyb2xsc1wiXSlcclxuICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgY2hlY2tTY3JvbGxzKWA7XHJcbiAgaWYgKCF0YWJJZCkge1xyXG4gICAgZXZhbChjb2RlKTtcclxuICAgIHJldHVybjtcclxuICB9XHJcbiAgd2hhbGUudGFicy5leGVjdXRlU2NyaXB0KHRhYklkLCB7XHJcbiAgICBjb2RlOiBjb2RlXHJcbiAgfSk7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIGRpc3BsYXlIaXN0b3J5KFxyXG4gIHRhYklkOiBudW1iZXIsXHJcbiAgd2VidG9vbklkOiBzdHJpbmcsXHJcbiAgdmlzaXRzOiBWaXNpdFR5cGUsXHJcbiAgc2hvd0hpc3Rvcnk6IGJvb2xlYW5cclxuKSB7XHJcbiAgaWYgKHZpc2l0c1t3ZWJ0b29uSWRdICYmIHNob3dIaXN0b3J5KSB7XHJcbiAgICBPYmplY3Qua2V5cyh2aXNpdHNbd2VidG9vbklkXSkuZm9yRWFjaChrZXkgPT4ge1xyXG4gICAgICBjb25zdCBjb2RlID0gYHZhciB3bG9nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImFbaHJlZio9J2RldGFpbC5uaG4/dGl0bGVJZD0ke3dlYnRvb25JZH0mbm89JHtrZXl9J11cIik7XHJcbiAgICAgIGlmICh3bG9nKXtcclxuICAgICAgICB3bG9nPXdsb2cucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50O1xyXG4gICAgICAgIHdsb2cuc3R5bGUuYmFja2dyb3VuZD1cImxpZ2h0Z3JheVwiO1xyXG4gICAgICAgIHdsb2cudGl0bGU9XCIke25ldyBEYXRlKHZpc2l0c1t3ZWJ0b29uSWRdW2tleV0gKiAxMDAwKS50b0xvY2FsZVN0cmluZygpICtcclxuICAgICAgICAgIFwi7JeQIOu0hFwifVwiXHJcbiAgICB9YDtcclxuICAgICAgaWYgKCF0YWJJZCkge1xyXG4gICAgICAgIGV2YWwoY29kZSk7XHJcbiAgICAgIH0gZWxzZVxyXG4gICAgICAgIHdoYWxlLnRhYnMuZXhlY3V0ZVNjcmlwdCh0YWJJZCwge1xyXG4gICAgICAgICAgY29kZTogY29kZVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCBPcHRpb25TdG9yZSBmcm9tIFwiLi9vcHRpb25cIjtcclxuaW1wb3J0IFdlYnRvb25TdG9yZSBmcm9tIFwiLi93ZWJ0b29uXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSb290U3RvcmUge1xyXG4gIHB1YmxpYyB3ZWJ0b29uOiBXZWJ0b29uU3RvcmU7XHJcbiAgcHVibGljIG9wdGlvbjogT3B0aW9uU3RvcmU7XHJcblxyXG4gIGNvbnN0cnVjdG9yKGlzQmFja2dyb3VuZDogYm9vbGVhbiwgb25Mb2FkPzogKCkgPT4gdm9pZCkge1xyXG4gICAgdGhpcy5vcHRpb24gPSBuZXcgT3B0aW9uU3RvcmUoaXNCYWNrZ3JvdW5kKTtcclxuICAgIHRoaXMud2VidG9vbiA9IG5ldyBXZWJ0b29uU3RvcmUodGhpcy5vcHRpb24sIG9uTG9hZCk7XHJcblxyXG4gICAgLy8gRGV2IE9ubHlcclxuICAgIC8vIHdoYWxlLnN0b3JhZ2Uub25DaGFuZ2VkLmFkZExpc3RlbmVyKChjaGFuZ2UsIGFyZWEpID0+IHtcclxuICAgIC8vICAgY29uc29sZS5sb2coXCJjaHJvbWUgc3RvcmFnZSBjaGFuZ2VkXCIsIGFyZWEsIGNoYW5nZSk7XHJcbiAgICAvLyB9KTtcclxuICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgb2JzZXJ2YWJsZSwgYWN0aW9uLCBjb21wdXRlZCB9IGZyb20gXCJtb2J4XCI7XHJcblxyXG5leHBvcnQgY29uc3Qgc3RvcmVLZXlzID0gW1xyXG4gIFwiX3N0b3JlTG9jYXRpb25cIixcclxuICBcIl9vcmRlckJ5XCIsXHJcbiAgXCJfc2hvd0hpc3RvcnlcIixcclxuICBcIl9oaXN0b3J5TWF4XCIsXHJcbiAgXCJfc2F2ZVdlYnRvb25Tb3J0XCIsXHJcbiAgXCJfc2F2ZVNjcm9sbFwiLFxyXG4gIFwiX2hpZGRlbkNvbW1lbnRcIixcclxuICBcIl9hdXRvTmV4dFwiLFxyXG4gIFwiX3VzZUltZ0xvZ1wiLFxyXG4gIFwiX3NhdmVGYXZvcmF0ZVwiLFxyXG4gIFwiX2xpbmtUYXJnZXRcIixcclxuICBcIl9zY3JvbGxBbGVydFwiLFxyXG4gIFwiX3VzZUNvbnRleHRNZW51XCJcclxuXTtcclxuXHJcbmV4cG9ydCB0eXBlIENocm9tZVN0b3JlID0gXCJsb2NhbFwiIHwgXCJzeW5jXCIgfCBudWxsO1xyXG5leHBvcnQgdHlwZSBXZWJ0b29uT3JkZXIgPSBcIlZpZXdDb3VudFwiIHwgXCJVcGRhdGVcIiB8IFwiU3RhclNjb3JlXCIgfCBcIlRpdGxlTmFtZVwiO1xyXG5leHBvcnQgdHlwZSBMaW5rVGFyZ2V0ID0gXCJUYWJcIiB8IFwiQ3VycmVudFwiIHwgXCJQb3B1cFwiIHwgXCJTaWRlYmFyXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBPcHRpb25TdG9yZSB7XHJcbiAgcHJpdmF0ZSByZWFkb25seSBkZWZhdWx0T3B0aW9uO1xyXG5cclxuICBwcml2YXRlIGdldCBvcHRpb25PYmplY3QoKSB7XHJcbiAgICBjb25zdCBvYmogPSB7fTtcclxuICAgIHN0b3JlS2V5cy5mb3JFYWNoKGtleSA9PiB7XHJcbiAgICAgIG9ialtrZXldID0gdGhpc1trZXldO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gb2JqO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBzYXZlVG9TdG9yZSgpIHtcclxuICAgIHdoYWxlLnN0b3JhZ2Uuc3luYy5zZXQoe1xyXG4gICAgICBvcHRpb246IEpTT04uc3RyaW5naWZ5KHRoaXMub3B0aW9uT2JqZWN0KVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZ2V0VXNlQnl0ZXMoKSB7XHJcbiAgICB3aGFsZS5zdG9yYWdlLmxvY2FsLmdldEJ5dGVzSW5Vc2UodXNlID0+IHtcclxuICAgICAgdGhpcy5sb2NhbFVzYWdlID0gdXNlO1xyXG4gICAgfSk7XHJcbiAgICB3aGFsZS5zdG9yYWdlLnN5bmMuZ2V0Qnl0ZXNJblVzZSh1c2UgPT4ge1xyXG4gICAgICB0aGlzLnN5bmNVc2FnZSA9IHVzZTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG9uTG9hZDogKCkgPT4gdm9pZCA9ICgpID0+IHtcclxuICAgIGNvbnNvbGUubG9nKFwiV2VidG9vbiBOb3QgSW5pdGVkXCIpO1xyXG4gIH07XHJcblxyXG4gIHByaXZhdGUgaXNQcmV2aW91c1ZlcnNpb246IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgLyoqXHJcbiAgICog7IOd7ISx7J6QXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IoaXNCYWNrZ3JvdW5kOiBib29sZWFuKSB7XHJcbiAgICB0aGlzLmRlZmF1bHRPcHRpb24gPSB0aGlzLm9wdGlvbk9iamVjdDtcclxuICAgIHRoaXMuaXNCYWNrZ3JvdW5kID0gaXNCYWNrZ3JvdW5kO1xyXG4gICAgLy8gQ2hyb21lIFN0b3JhZ2XroZzrtoDthLAg7ISk7KCV6rCS7J2EIOy0iOq4sO2ZlFxyXG4gICAgd2hhbGUuc3RvcmFnZS5zeW5jLmdldChcIm9wdGlvblwiLCAoeyBvcHRpb246IGl0ZW0gfSkgPT4ge1xyXG4gICAgICBpZiAoaXRlbSAmJiBpdGVtLnNvcnQgIT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgLy8gMS42LjIgT25seVxyXG4gICAgICAgIHRoaXMuaXNQcmV2aW91c1ZlcnNpb24gPSB0cnVlO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgICBpZiAoaXRlbSkgaXRlbSA9IEpTT04ucGFyc2UoaXRlbSk7XHJcbiAgICAgIGlmIChpdGVtICYmIE9iamVjdC5rZXlzKGl0ZW0pLmxlbmd0aCA9PT0gc3RvcmVLZXlzLmxlbmd0aCkge1xyXG4gICAgICAgIHN0b3JlS2V5cy5mb3JFYWNoKGtleSA9PiB7XHJcbiAgICAgICAgICB0aGlzW2tleV0gPSBpdGVtW2tleV07XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5nZXRVc2VCeXRlcygpO1xyXG4gICAgICAgIHRoaXMub25Mb2FkKCk7XHJcbiAgICAgIH0gZWxzZSBpZiAoIWl0ZW0gfHwgT2JqZWN0LmtleXMoaXRlbSkubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgd2hhbGUuc3RvcmFnZS5zeW5jLnNldChcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgb3B0aW9uOiBKU09OLnN0cmluZ2lmeSh0aGlzLm9wdGlvbk9iamVjdClcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2V0VXNlQnl0ZXMoKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJPcHRpb24gSW5pdFwiKTtcclxuICAgICAgICAgICAgdGhpcy5vbkxvYWQoKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICApO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIE9iamVjdC5rZXlzKHN0b3JlS2V5cykuZm9yRWFjaChrZXkgPT4ge1xyXG4gICAgICAgICAgaWYgKGl0ZW1ba2V5XSkge1xyXG4gICAgICAgICAgICB0aGlzW2tleV0gPSBpdGVtW2tleV07XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgd2hhbGUuc3RvcmFnZS5zeW5jLnNldChcclxuICAgICAgICAgIHsgb3B0aW9uOiBKU09OLnN0cmluZ2lmeSh0aGlzLm9wdGlvbk9iamVjdCkgfSxcclxuICAgICAgICAgICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5nZXRVc2VCeXRlcygpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlVwZGF0ZSBDb21wbGF0ZVwiKTtcclxuICAgICAgICAgICAgdGhpcy5vbkxvYWQoKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICApO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBjaHJvbWUgc3RvcmFnZeulvCBzdG9yZeyZgCDrj5nquLDtmZRcclxuICAgIHdoYWxlLnN0b3JhZ2Uub25DaGFuZ2VkLmFkZExpc3RlbmVyKChjaGFuZ2UsIGFyZWEpID0+IHtcclxuICAgICAgaWYgKGNoYW5nZS5vcHRpb24gJiYgY2hhbmdlLm9wdGlvbi5uZXdWYWx1ZSkge1xyXG4gICAgICAgIGlmIChjaGFuZ2Uub3B0aW9uLm5ld1ZhbHVlLnNvcnQpIHJldHVybjsgLy8gRGV2IE9ubHlcclxuICAgICAgICBjb25zdCBvcHRpb24gPSBKU09OLnBhcnNlKGNoYW5nZS5vcHRpb24ubmV3VmFsdWUpO1xyXG4gICAgICAgIHN0b3JlS2V5cy5mb3JFYWNoKGtleSA9PiB7XHJcbiAgICAgICAgICBpZiAob3B0aW9uW2tleV0gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB0aGlzW2tleV0gPSBvcHRpb25ba2V5XTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAodGhpcy5pc1ByZXZpb3VzVmVyc2lvbikge1xyXG4gICAgICAgICAgdGhpcy5vbkxvYWQoKTtcclxuICAgICAgICAgIHRoaXMuaXNQcmV2aW91c1ZlcnNpb24gPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5nZXRVc2VCeXRlcygpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIEBvYnNlcnZhYmxlXHJcbiAgcHVibGljIGlzQmFja2dyb3VuZDogYm9vbGVhbjtcclxuXHJcbiAgQG9ic2VydmFibGVcclxuICBwdWJsaWMgbG9jYWxVc2FnZTogbnVtYmVyID0gMDtcclxuXHJcbiAgQG9ic2VydmFibGVcclxuICBwdWJsaWMgc3luY1VzYWdlOiBudW1iZXIgPSAwO1xyXG5cclxuICAvKipcclxuICAgKiDsgqzsmqnsnpAg642w7J207YSw66W8IOyggOyepe2VoCDsoIDsnqXshoxcclxuICAgKi9cclxuICBAb2JzZXJ2YWJsZVxyXG4gIHByaXZhdGUgX3N0b3JlTG9jYXRpb246IENocm9tZVN0b3JlID0gXCJsb2NhbFwiO1xyXG5cclxuICBAY29tcHV0ZWRcclxuICBwdWJsaWMgZ2V0IHN0b3JlTG9jYXRpb24oKTogQ2hyb21lU3RvcmUge1xyXG4gICAgcmV0dXJuIHRoaXMuX3N0b3JlTG9jYXRpb247XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2V0IHN0b3JlTG9jYXRpb24odmFsdWU6IENocm9tZVN0b3JlKSB7XHJcbiAgICB0aGlzLl9zdG9yZUxvY2F0aW9uID0gdmFsdWU7XHJcbiAgICB0aGlzLmhpc3RvcnlNYXggPSB0aGlzLmhpc3RvcnlNYXg7XHJcbiAgICB0aGlzLnNhdmVUb1N0b3JlKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDsm7ntiLAg7KCV66CsIOuwqeyLnVxyXG4gICAqL1xyXG4gIEBvYnNlcnZhYmxlXHJcbiAgcHJpdmF0ZSBfb3JkZXJCeTogV2VidG9vbk9yZGVyID0gXCJWaWV3Q291bnRcIjtcclxuXHJcbiAgQGNvbXB1dGVkXHJcbiAgcHVibGljIGdldCBvcmRlckJ5KCk6IFdlYnRvb25PcmRlciB7XHJcbiAgICByZXR1cm4gdGhpcy5fb3JkZXJCeTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzZXQgb3JkZXJCeSh2YWx1ZTogV2VidG9vbk9yZGVyKSB7XHJcbiAgICB0aGlzLl9vcmRlckJ5ID0gdmFsdWU7XHJcbiAgICB0aGlzLnNhdmVUb1N0b3JlKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDsm7ntiLAg6riw66Gd7J2EIOuztOydtOuKlCDsl6zrtoBcclxuICAgKi9cclxuICBAb2JzZXJ2YWJsZVxyXG4gIHByaXZhdGUgX3Nob3dIaXN0b3J5OiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgQGNvbXB1dGVkXHJcbiAgcHVibGljIGdldCBzaG93SGlzdG9yeSgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLl9zaG93SGlzdG9yeTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzZXQgc2hvd0hpc3RvcnkodmFsdWU6IGJvb2xlYW4pIHtcclxuICAgIHRoaXMuX3Nob3dIaXN0b3J5ID0gdmFsdWU7XHJcbiAgICB0aGlzLnNhdmVUb1N0b3JlKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDstZzrjIAg6riw66GdIOyggOyepSDqsJzsiJhcclxuICAgKi9cclxuICBAb2JzZXJ2YWJsZVxyXG4gIHByaXZhdGUgX2hpc3RvcnlNYXg6IG51bWJlciA9IDEwMDA7XHJcblxyXG4gIEBjb21wdXRlZFxyXG4gIHB1YmxpYyBnZXQgaGlzdG9yeU1heCgpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMuX2hpc3RvcnlNYXg7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2V0IGhpc3RvcnlNYXgodmFsdWU6IG51bWJlcikge1xyXG4gICAgaWYgKHRoaXMuX3N0b3JlTG9jYXRpb24gPT09IFwic3luY1wiICYmIHZhbHVlID4gMjAwKSB2YWx1ZSA9IDIwMDtcclxuICAgIGlmICh0aGlzLl9zdG9yZUxvY2F0aW9uID09PSBcImxvY2FsXCIgJiYgdmFsdWUgPiAxMDAwKSB2YWx1ZSA9IDEwMDA7XHJcbiAgICB0aGlzLl9oaXN0b3J5TWF4ID0gdmFsdWU7XHJcbiAgICB0aGlzLnNhdmVUb1N0b3JlKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDsmpTsnbzrs4Qg7Ju57YiwIOyCrOyaqeyekCDsp4DsoJUg7Iic7ISc66W8IOyggeyaqe2VmOuKlCDsl6zrtoBcclxuICAgKi9cclxuICBAb2JzZXJ2YWJsZVxyXG4gIHByaXZhdGUgX3NhdmVXZWJ0b29uU29ydDogYm9vbGVhbiA9IHRydWU7XHJcblxyXG4gIEBjb21wdXRlZFxyXG4gIHB1YmxpYyBnZXQgc2F2ZVdlYnRvb25Tb3J0KCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX3NhdmVXZWJ0b29uU29ydDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzZXQgc2F2ZVdlYnRvb25Tb3J0KHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICB0aGlzLl9zYXZlV2VidG9vblNvcnQgPSB2YWx1ZTtcclxuICAgIHRoaXMuc2F2ZVRvU3RvcmUoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOyKpO2BrOuhpOydhCDsoIDsnqXtlZjripQg7Jes67aAXHJcbiAgICovXHJcbiAgQG9ic2VydmFibGVcclxuICBwcml2YXRlIF9zYXZlU2Nyb2xsOiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgQGNvbXB1dGVkXHJcbiAgcHVibGljIGdldCBzYXZlU2Nyb2xsKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX3NhdmVTY3JvbGw7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2V0IHNhdmVTY3JvbGwodmFsdWU6IGJvb2xlYW4pIHtcclxuICAgIHRoaXMuX3NhdmVTY3JvbGwgPSB2YWx1ZTtcclxuICAgIGlmICh2YWx1ZSA9PT0gdHJ1ZSkge1xyXG4gICAgICB0aGlzLl9zY3JvbGxBbGVydCA9IHRydWU7XHJcbiAgICB9XHJcbiAgICB0aGlzLnNhdmVUb1N0b3JlKCk7XHJcbiAgfVxyXG5cclxuICBAb2JzZXJ2YWJsZVxyXG4gIHByaXZhdGUgX3Njcm9sbEFsZXJ0OiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgQGNvbXB1dGVkXHJcbiAgcHVibGljIGdldCBzY3JvbGxBbGVydCgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLl9zY3JvbGxBbGVydDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzZXQgc2Nyb2xsQWxlcnQodmFsdWU6IGJvb2xlYW4pIHtcclxuICAgIHRoaXMuX3Njcm9sbEFsZXJ0ID0gdmFsdWU7XHJcbiAgICB0aGlzLnNhdmVUb1N0b3JlKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDrjJPquIDsnYQg7Iio6riw64qUIOyXrOu2gFxyXG4gICAqL1xyXG4gIEBvYnNlcnZhYmxlXHJcbiAgcHJpdmF0ZSBfaGlkZGVuQ29tbWVudDogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICBAY29tcHV0ZWRcclxuICBwdWJsaWMgZ2V0IGhpZGRlbkNvbW1lbnQoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5faGlkZGVuQ29tbWVudDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzZXQgaGlkZGVuQ29tbWVudCh2YWx1ZTogYm9vbGVhbikge1xyXG4gICAgdGhpcy5faGlkZGVuQ29tbWVudCA9IHZhbHVlO1xyXG4gICAgdGhpcy5zYXZlVG9TdG9yZSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog7J6Q64+Z7Jy866GcIOyekOuPme2ZlOuhnCDrhJjslrTqsIDripQg7Jes67aAXHJcbiAgICovXHJcbiAgQG9ic2VydmFibGVcclxuICBwcml2YXRlIF9hdXRvTmV4dDogYm9vbGVhbiA9IHRydWU7XHJcblxyXG4gIEBjb21wdXRlZFxyXG4gIHB1YmxpYyBnZXQgYXV0b05leHQoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5fYXV0b05leHQ7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2V0IGF1dG9OZXh0KHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICB0aGlzLl9hdXRvTmV4dCA9IHZhbHVlO1xyXG4gICAgdGhpcy5zYXZlVG9TdG9yZSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog7J2066+47KeAIOqyveuhnOulvCDroZzqt7jroZwg7KCA7J6l7ZWY64qUIOyXrOu2gFxyXG4gICAqL1xyXG4gIEBvYnNlcnZhYmxlXHJcbiAgcHJpdmF0ZSBfdXNlSW1nTG9nOiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgQGNvbXB1dGVkXHJcbiAgcHVibGljIGdldCB1c2VJbWdMb2coKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5fdXNlSW1nTG9nO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHNldCB1c2VJbWdMb2codmFsdWU6IGJvb2xlYW4pIHtcclxuICAgIHRoaXMuX3VzZUltZ0xvZyA9IHZhbHVlO1xyXG4gICAgaWYgKHZhbHVlID09PSBmYWxzZSkge1xyXG4gICAgICB3aGFsZS5zdG9yYWdlLmxvY2FsLnJlbW92ZShcImltZ2xvZ1wiKTtcclxuICAgIH1cclxuICAgIHRoaXMuc2F2ZVRvU3RvcmUoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOymkOqyqOywvuq4sOulvCDstpTqsIDtlZjripQg7Jes67aAXHJcbiAgICovXHJcbiAgQG9ic2VydmFibGVcclxuICBwcml2YXRlIF9zYXZlRmF2b3JhdGU6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICBAY29tcHV0ZWRcclxuICBwdWJsaWMgZ2V0IHNhdmVGYXZvcmF0ZSgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLl9zYXZlRmF2b3JhdGU7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2V0IHNhdmVGYXZvcmF0ZSh2YWx1ZTogYm9vbGVhbikge1xyXG4gICAgdGhpcy5fc2F2ZUZhdm9yYXRlID0gdmFsdWU7XHJcbiAgICB0aGlzLnNhdmVUb1N0b3JlKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDrp4Htgazrpbwg7Je0IOychOy5mFxyXG4gICAqL1xyXG4gIEBvYnNlcnZhYmxlXHJcbiAgcHJpdmF0ZSBfbGlua1RhcmdldDogTGlua1RhcmdldCA9IFwiVGFiXCI7XHJcblxyXG4gIEBjb21wdXRlZFxyXG4gIHB1YmxpYyBnZXQgbGlua1RhcmdldCgpOiBMaW5rVGFyZ2V0IHtcclxuICAgIHJldHVybiB0aGlzLl9saW5rVGFyZ2V0O1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHNldCBsaW5rVGFyZ2V0KHZhbHVlOiBMaW5rVGFyZ2V0KSB7XHJcbiAgICB0aGlzLl9saW5rVGFyZ2V0ID0gdmFsdWU7XHJcbiAgICB0aGlzLnNhdmVUb1N0b3JlKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDb250ZXh0TWVudSDsgqzsmqkg7Jes67aAXHJcbiAgICovXHJcbiAgQG9ic2VydmFibGVcclxuICBwcml2YXRlIF91c2VDb250ZXh0TWVudTogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICBAY29tcHV0ZWRcclxuICBwdWJsaWMgZ2V0IHVzZUNvbnRleHRNZW51KCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX3VzZUNvbnRleHRNZW51O1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHNldCB1c2VDb250ZXh0TWVudSh2YWx1ZTogYm9vbGVhbikge1xyXG4gICAgdGhpcy5fdXNlQ29udGV4dE1lbnUgPSB2YWx1ZTtcclxuICAgIHRoaXMuc2F2ZVRvU3RvcmUoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOyKpO2GoOyWtCDstIjquLDtmZRcclxuICAgKiBAcGFyYW0gc3RvcmUg7LSI6riw7ZmUIO2VoCDsiqTthqDslrQg7JyE7LmYXHJcbiAgICovXHJcbiAgcHVibGljIHJlc2V0U3RvcmUoc3RvcmU6IENocm9tZVN0b3JlKSB7XHJcbiAgICBpZiAoc3RvcmUgPT09IFwibG9jYWxcIikge1xyXG4gICAgICB3aGFsZS5zdG9yYWdlLmxvY2FsLmNsZWFyKCgpID0+IHtcclxuICAgICAgICB0aGlzLmdldFVzZUJ5dGVzKCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgd2hhbGUuc3RvcmFnZS5zeW5jLnJlbW92ZShcclxuICAgICAgICBbXCJ3ZWJ0b29uXCIsIFwidmlzaXN0c1wiLCBcInNjb3JsbHNcIiwgXCJmYXZvcmF0ZVwiLCBcInNvcnRXZWJ0b29uXCJdLFxyXG4gICAgICAgICgpID0+IHtcclxuICAgICAgICAgIHRoaXMucmVzZXRPcHRpb24oKTtcclxuICAgICAgICB9XHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgcmVzZXRPcHRpb24ob25Mb2FkPykge1xyXG4gICAgd2hhbGUuc3RvcmFnZS5zeW5jLnNldChcclxuICAgICAge1xyXG4gICAgICAgIG9wdGlvbjogSlNPTi5zdHJpbmdpZnkodGhpcy5kZWZhdWx0T3B0aW9uKVxyXG4gICAgICB9LFxyXG4gICAgICBvbkxvYWQgJiYgb25Mb2FkKClcclxuICAgICk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7IG9ic2VydmFibGUsIGNvbXB1dGVkLCBhY3Rpb24sIG9ic2VydmUsIHRvSlMgfSBmcm9tIFwibW9ieFwiO1xyXG5pbXBvcnQgT3B0aW9uU3RvcmUgZnJvbSBcIi4vb3B0aW9uXCI7XHJcbmltcG9ydCBXZWJ0b29uUmVxdWVzdCwge1xyXG4gIFdlYnRvb25JbmZvVHlwZSxcclxuICBXZWJ0b29uSW5mbyxcclxuICBXZWVrXHJcbn0gZnJvbSBcIi4uL3Rvb2xzL3JlcXVlc3RcIjtcclxuXHJcbi8vIGV4cG9ydCB0eXBlIFNhdmVUeXBlID0gXCJpbWdsb2dcIiB8IFwiZmF2b3JhdGVcIiB8IFwic2Nyb2xsc1wiIHwgXCJ2aXNpdHNcIiB8IFwid2VidG9vblwiO1xyXG5cclxuZXhwb3J0IHR5cGUgTG9hZGluZ1N0YXR1cyA9IFwibm90IHN0YXJ0XCIgfCBcInN0YXJ0XCIgfCBcImVuZFwiO1xyXG5cclxuZXhwb3J0IHR5cGUgV2VidG9vblR5cGUgPSB7XHJcbiAgW2tleTogbnVtYmVyXToge1xyXG4gICAgdGl0bGU6IHN0cmluZztcclxuICAgIHR5cGU6IFwid2VidG9vblwiIHwgXCJiZXN0Q2hhbGxlbmdlXCIgfCBcImNoYWxsZW5nZVwiIHwgc3RyaW5nO1xyXG4gIH07XHJcbn07XHJcbmV4cG9ydCB0eXBlIHN0b3JhZ2VUeXBlID0ge1xyXG4gIHNjcm9sbHM6IFNjcm9sbFR5cGU7XHJcbiAgdmlzaXRzOiBWaXNpdFR5cGU7XHJcbiAgd2VidG9vbjogV2VidG9vblR5cGU7XHJcbiAgZmF2b3JhdGU6IFN0YXJlZFR5cGU7XHJcbiAgc29ydFdlYnRvb246IFNvcnRXZWJ0b29uVHlwZTtcclxuICBpbWdsb2c6IEltZ2xvZ1R5cGU7XHJcbn07XHJcbmV4cG9ydCB0eXBlIFNhdmVUeXBlID0ga2V5b2Ygc3RvcmFnZVR5cGU7XHJcblxyXG5leHBvcnQgdHlwZSBWaXNpdFR5cGUgPSB7XHJcbiAgW2tleTogbnVtYmVyXToge1xyXG4gICAgW2tleTogbnVtYmVyXTogbnVtYmVyO1xyXG4gIH1bXTtcclxufTtcclxuXHJcbmV4cG9ydCB0eXBlIFNjcm9sbFR5cGUgPSB7XHJcbiAgW2tleTogbnVtYmVyXToge1xyXG4gICAgW2tleTogbnVtYmVyXTogbnVtYmVyO1xyXG4gIH07XHJcbn07XHJcblxyXG5leHBvcnQgdHlwZSBJbWdsb2dUeXBlID0ge1xyXG4gIFtrZXk6IHN0cmluZ106IHtcclxuICAgIGltYWdlOiBzdHJpbmc7XHJcbiAgICBuYW1lOiBzdHJpbmc7XHJcbiAgfTtcclxufTtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgU29ydFdlYnRvb25UeXBlIHtcclxuICBba2V5OiBzdHJpbmddOiBudW1iZXJbXTtcclxufVxyXG5cclxuZXhwb3J0IHR5cGUgU3RhcmVkVHlwZSA9IG51bWJlcltdO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBSZWNlbnRXZWJ0b29uIHtcclxuICBpZDogbnVtYmVyO1xyXG4gIGxhc3RWaXNpdDogbnVtYmVyO1xyXG4gIG5hbWU6IHN0cmluZztcclxuICBubzogbnVtYmVyO1xyXG4gIHR5cGU6IHN0cmluZztcclxuICBub25hbWU/OiBzdHJpbmc7XHJcbiAgaW1nPzogc3RyaW5nO1xyXG59XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFdlYnRvb25TdG9yZSB7XHJcbiAgcHJpdmF0ZSBzYXZlVG9TdG9yZTxUIGV4dGVuZHMgU2F2ZVR5cGU+KGtleTogVCwgdmFsdWU6IHN0b3JhZ2VUeXBlW1RdKSB7XHJcbiAgICBpZiAoa2V5ID09PSBcIndlYnRvb25cIiB8fCBrZXkgPT09IFwidmlzaXRzXCIgfHwga2V5ID09PSBcInNjcm9sbHNcIikge1xyXG4gICAgICB0aGlzLnN0b3JhZ2Uuc2V0KFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIFtrZXldOiBKU09OLnN0cmluZ2lmeSh2YWx1ZSlcclxuICAgICAgICB9LFxyXG4gICAgICAgICgpID0+IHtcclxuICAgICAgICAgIHRoaXMub3B0aW9uLmdldFVzZUJ5dGVzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICApO1xyXG4gICAgfSBlbHNlIGlmIChrZXkgPT09IFwiaW1nbG9nXCIpIHtcclxuICAgICAgd2hhbGUuc3RvcmFnZS5sb2NhbC5zZXQoXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgW2tleV06IEpTT04uc3RyaW5naWZ5KHZhbHVlKVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5vcHRpb24uZ2V0VXNlQnl0ZXMoKTtcclxuICAgICAgICB9XHJcbiAgICAgICk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB3aGFsZS5zdG9yYWdlLnN5bmMuc2V0KFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIFtrZXldOiBKU09OLnN0cmluZ2lmeSh2YWx1ZSlcclxuICAgICAgICB9LFxyXG4gICAgICAgICgpID0+IHtcclxuICAgICAgICAgIHRoaXMub3B0aW9uLmdldFVzZUJ5dGVzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIHNldERhaWx5V2VidG9vbigpIHtcclxuICAgIFdlYnRvb25SZXF1ZXN0LmdldEFsbFdlYnRvb24odGhpcy5vcHRpb24ub3JkZXJCeSkudGhlbih3ZWJ0b29ucyA9PiB7XHJcbiAgICAgIGlmICh0aGlzLm9wdGlvbi5zYXZlV2VidG9vblNvcnQpIHtcclxuICAgICAgICBpZiAoSlNPTi5zdHJpbmdpZnkodGhpcy5fc29ydFdlYnRvb24pID09PSBKU09OLnN0cmluZ2lmeSh7fSkpIHtcclxuICAgICAgICAgIE9iamVjdC5rZXlzKHdlYnRvb25zKS5mb3JFYWNoKChrZXk6IFdlZWspID0+IHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLl9zb3J0V2VidG9vbltrZXldKSB0aGlzLl9zb3J0V2VidG9vbltrZXldID0gW107XHJcbiAgICAgICAgICAgIHRoaXMuX3NvcnRXZWJ0b29uW2tleV0gPSB3ZWJ0b29uc1trZXldLm1hcCh2ID0+IHYuaWQpO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgICB0aGlzLnNvcnRXZWJ0b29uID0gdGhpcy5fc29ydFdlYnRvb247XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIE9iamVjdC5rZXlzKHdlYnRvb25zKS5mb3JFYWNoKChrZXk6IFdlZWspID0+IHtcclxuICAgICAgICAgICAgY29uc3Qgc29ydGVkID0gdGhpcy5fc29ydFdlYnRvb25ba2V5XTtcclxuICAgICAgICAgICAgLy8g7KCV66CsXHJcbiAgICAgICAgICAgIHdlYnRvb25zW2tleV0uc29ydCgoYSwgYikgPT5cclxuICAgICAgICAgICAgICBzb3J0ZWQuaW5kZXhPZihhLmlkKSA+IHNvcnRlZC5pbmRleE9mKGIuaWQpID8gMSA6IC0xXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIC8vIOyDiOuhnCDsg53quLQg7Ju57Yiw7J2064KYIOyCrOudvOynhCDsm7ntiLDsnYQgc29ydFdlYnRvb27sl5Ag7KCB7JqpXHJcbiAgICAgICAgICAgIHRoaXMuX3NvcnRXZWJ0b29uW2tleV0gPSB3ZWJ0b29uc1trZXldLm1hcChpdGVtID0+IGl0ZW0uaWQpO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuc29ydFdlYnRvb24gPSB0aGlzLl9zb3J0V2VidG9vbjtcclxuICAgICAgdGhpcy5kYWlseVdlYnRvb25zID0gd2VidG9vbnM7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgb3B0aW9uOiBPcHRpb25TdG9yZTtcclxuXHJcbiAgY29uc3RydWN0b3Iob3B0aW9uOiBPcHRpb25TdG9yZSwgb25Mb2FkPzogKCkgPT4gdm9pZCkge1xyXG4gICAgdGhpcy5vcHRpb24gPSBvcHRpb247XHJcbiAgICB0aGlzLm9wdGlvbi5vbkxvYWQgPSAoKSA9PiB7XHJcbiAgICAgIHRoaXMuc3RvcmFnZS5nZXQoXHJcbiAgICAgICAgW1wid2VidG9vblwiLCBcInZpc2l0c1wiLCBcInNjcm9sbHNcIl0sXHJcbiAgICAgICAgKHsgd2VidG9vbiwgdmlzaXRzLCBzY3JvbGxzIH0pID0+IHtcclxuICAgICAgICAgIHdoYWxlLnN0b3JhZ2UubG9jYWwuZ2V0KFtcImltZ2xvZ1wiXSwgKHsgaW1nbG9nIH0pID0+IHtcclxuICAgICAgICAgICAgd2hhbGUuc3RvcmFnZS5zeW5jLmdldChcclxuICAgICAgICAgICAgICBbXCJmYXZvcmF0ZVwiLCBcInNvcnRXZWJ0b29uXCJdLFxyXG4gICAgICAgICAgICAgICh7IGZhdm9yYXRlLCBzb3J0V2VidG9vbiB9KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoc2Nyb2xscykgdGhpcy5fc2Nyb2xscyA9IEpTT04ucGFyc2Uoc2Nyb2xscyk7XHJcbiAgICAgICAgICAgICAgICBpZiAodmlzaXRzKSB0aGlzLl92aXNpdHMgPSBKU09OLnBhcnNlKHZpc2l0cyk7XHJcbiAgICAgICAgICAgICAgICBpZiAod2VidG9vbikgdGhpcy5fd2VidG9vblR5cGUgPSBKU09OLnBhcnNlKHdlYnRvb24pO1xyXG4gICAgICAgICAgICAgICAgaWYgKGZhdm9yYXRlKSB0aGlzLl9zdGFyV2VidG9vbnMgPSBKU09OLnBhcnNlKGZhdm9yYXRlKTtcclxuICAgICAgICAgICAgICAgIGlmIChzb3J0V2VidG9vbikgdGhpcy5fc29ydFdlYnRvb24gPSBKU09OLnBhcnNlKHNvcnRXZWJ0b29uKTtcclxuICAgICAgICAgICAgICAgIGlmIChpbWdsb2cpIHRoaXMuX2ltZ2xvZyA9IEpTT04ucGFyc2UoaW1nbG9nKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0UmVjZW50V2VidG9vbigpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXREYWlseVdlYnRvb24oKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0Q29tcGV0ZVdlYnRvb24oKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMub3B0aW9uLmlzQmFja2dyb3VuZCkge1xyXG4gICAgICAgICAgICAgICAgICBvYnNlcnZlKG9wdGlvbiwgXCJvcmRlckJ5XCIsIGNoYW5nZSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXREYWlseVdlYnRvb24oKTtcclxuICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgIG9ic2VydmUob3B0aW9uLCBcInNhdmVXZWJ0b29uU29ydFwiLCBjaGFuZ2UgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0RGFpbHlXZWJ0b29uKCk7XHJcbiAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgKTtcclxuICAgICAgd2hhbGUuc3RvcmFnZS5vbkNoYW5nZWQuYWRkTGlzdGVuZXIoXHJcbiAgICAgICAgKGNoYW5nZTogeyBba2V5IGluIFNhdmVUeXBlXTogd2hhbGUuc3RvcmFnZS5TdG9yYWdlQ2hhbmdlIH0sIGFyZWEpID0+IHtcclxuICAgICAgICAgIE9iamVjdC5rZXlzKGNoYW5nZSkuZm9yRWFjaCgoa2V5OiBTYXZlVHlwZSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IGNoYW5nZVtrZXldLm5ld1ZhbHVlIHx8IFwie31cIjtcclxuXHJcbiAgICAgICAgICAgIGlmIChrZXkgPT09IFwic29ydFdlYnRvb25cIiAmJiAhdmFsdWUpIHRoaXMuc2V0RGFpbHlXZWJ0b29uKCk7XHJcbiAgICAgICAgICAgIGlmIChrZXkgPT09IFwiZmF2b3JhdGVcIikge1xyXG4gICAgICAgICAgICAgIGlmICh2YWx1ZSAhPSBKU09OLnN0cmluZ2lmeSh0aGlzLl9zdGFyV2VidG9vbnMpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zdGFyV2VidG9vbnMgPSBKU09OLnBhcnNlKHZhbHVlKTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSBcImltZ2xvZ1wiKSB7XHJcbiAgICAgICAgICAgICAgaWYgKHZhbHVlICE9IEpTT04uc3RyaW5naWZ5KHRoaXMuX2ltZ2xvZykpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2ltZ2xvZyA9IEpTT04ucGFyc2UodmFsdWUpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIGlmIChrZXkgPT09IFwic2Nyb2xsc1wiKSB7XHJcbiAgICAgICAgICAgICAgaWYgKHZhbHVlICE9IEpTT04uc3RyaW5naWZ5KHRoaXMuX3Njcm9sbHMpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zY3JvbGxzID0gSlNPTi5wYXJzZSh2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGtleSA9PT0gXCJ2aXNpdHNcIikge1xyXG4gICAgICAgICAgICAgIGlmICh2YWx1ZSAhPSBKU09OLnN0cmluZ2lmeSh0aGlzLl92aXNpdHMpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl92aXNpdHMgPSBKU09OLnBhcnNlKHZhbHVlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0UmVjZW50V2VidG9vbigpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIGlmIChrZXkgPT09IFwid2VidG9vblwiKSB7XHJcbiAgICAgICAgICAgICAgaWYgKHZhbHVlICE9IEpTT04uc3RyaW5naWZ5KHRoaXMuX3dlYnRvb25UeXBlKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fd2VidG9vblR5cGUgPSBKU09OLnBhcnNlKHZhbHVlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0UmVjZW50V2VidG9vbigpO1xyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIGlmIChrZXkgPT09IFwic29ydFdlYnRvb25cIikge1xyXG4gICAgICAgICAgICAgIGlmICh2YWx1ZSAhPSBKU09OLnN0cmluZ2lmeSh0aGlzLl9zb3J0V2VidG9vbikpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3NvcnRXZWJ0b29uID0gSlNPTi5wYXJzZSh2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICAgIHRoaXMub3B0aW9uLmdldFVzZUJ5dGVzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICApO1xyXG4gICAgICBpZiAob25Mb2FkKSBvbkxvYWQoKTtcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBAY29tcHV0ZWQgZ2V0IHN0b3JhZ2UoKSB7XHJcbiAgICByZXR1cm4gd2hhbGUuc3RvcmFnZVt0aGlzLm9wdGlvbi5zdG9yZUxvY2F0aW9uXTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOuwqeusuO2VnCDsm7ntiLDsnZgg7KCc66qp6rO8IO2DgOyeheydhCDsoIDsnqXtlanri4jri6QuXHJcbiAgICovXHJcbiAgQG9ic2VydmFibGVcclxuICBwcml2YXRlIF93ZWJ0b29uVHlwZTogV2VidG9vblR5cGUgPSB7fTtcclxuXHJcbiAgQGNvbXB1dGVkXHJcbiAgcHVibGljIGdldCB3ZWJ0b29uVHlwZSgpOiBXZWJ0b29uVHlwZSB7XHJcbiAgICByZXR1cm4gdGhpcy5fd2VidG9vblR5cGU7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2V0IHdlYnRvb25UeXBlKHZhbHVlOiBXZWJ0b29uVHlwZSkge1xyXG4gICAgdGhpcy5fd2VidG9vblR5cGUgPSB2YWx1ZTtcclxuICAgIHRoaXMuc2F2ZVRvU3RvcmUoXCJ3ZWJ0b29uXCIsIHZhbHVlKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOuwqeusuO2VnCDtmozssKjsnZgg7KCV67O066W8IOyggOyepe2VqeuLiOuLpC5cclxuICAgKi9cclxuICBAb2JzZXJ2YWJsZVxyXG4gIHByaXZhdGUgX3Zpc2l0czogVmlzaXRUeXBlID0ge307XHJcblxyXG4gIEBjb21wdXRlZFxyXG4gIHB1YmxpYyBnZXQgdmlzaXRzKCk6IFZpc2l0VHlwZSB7XHJcbiAgICByZXR1cm4gdGhpcy5fdmlzaXRzO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHNldCB2aXNpdHModmFsdWU6IFZpc2l0VHlwZSkge1xyXG4gICAgdGhpcy5fdmlzaXRzID0gdmFsdWU7XHJcbiAgICB0aGlzLnNhdmVUb1N0b3JlKFwidmlzaXRzXCIsIHZhbHVlKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOyCrOyaqeyekOqwgCDrs7gg7Iqk7YGs66GkIOuNsOydtO2EsOulvCDsoIDsnqXtlanri4jri6QuXHJcbiAgICovXHJcbiAgQG9ic2VydmFibGVcclxuICBwcml2YXRlIF9zY3JvbGxzOiBTY3JvbGxUeXBlID0ge307XHJcblxyXG4gIEBjb21wdXRlZFxyXG4gIHB1YmxpYyBnZXQgc2Nyb2xscygpOiBTY3JvbGxUeXBlIHtcclxuICAgIHJldHVybiB0aGlzLl9zY3JvbGxzO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHNldCBzY3JvbGxzKHZhbHVlOiBTY3JvbGxUeXBlKSB7XHJcbiAgICB0aGlzLl9zY3JvbGxzID0gdmFsdWU7XHJcbiAgICB0aGlzLnNhdmVUb1N0b3JlKFwic2Nyb2xsc1wiLCB2YWx1ZSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDsm7ntiLAg7KCV67O066W8IOuUsOuhnCDsoIDsnqXtlanri4jri6QuXHJcbiAgICovXHJcbiAgQG9ic2VydmFibGVcclxuICBwcml2YXRlIF9pbWdsb2c6IEltZ2xvZ1R5cGUgPSB7fTtcclxuXHJcbiAgQGNvbXB1dGVkXHJcbiAgcHVibGljIGdldCBpbWdsb2coKTogSW1nbG9nVHlwZSB7XHJcbiAgICByZXR1cm4gdGhpcy5faW1nbG9nO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHNldCBpbWdsb2codmFsdWU6IEltZ2xvZ1R5cGUpIHtcclxuICAgIGlmICghdGhpcy5vcHRpb24udXNlSW1nTG9nKSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJpbWdsb2cg66+47IKs7JqpIOykkVwiKTtcclxuICAgIH1cclxuICAgIHRoaXMuX2ltZ2xvZyA9IHZhbHVlO1xyXG4gICAgdGhpcy5zYXZlVG9TdG9yZShcImltZ2xvZ1wiLCB2YWx1ZSk7XHJcbiAgfVxyXG5cclxuICBAb2JzZXJ2YWJsZVxyXG4gIHB1YmxpYyBNYXhWaWV3OiBudW1iZXIgPSAyMDtcclxuXHJcbiAgLyoqXHJcbiAgICog7LWc6re8IOybue2IsOuTpC5cclxuICAgKi9cclxuICBAb2JzZXJ2YWJsZVxyXG4gIHByaXZhdGUgX3JlY2VudFdlYnRvb246IFJlY2VudFdlYnRvb25bXSA9IFtdO1xyXG5cclxuICBAY29tcHV0ZWRcclxuICBwdWJsaWMgZ2V0IHJlY2VudFdlYnRvb24oKTogUmVjZW50V2VidG9vbltdIHtcclxuICAgIHJldHVybiB0aGlzLl9yZWNlbnRXZWJ0b29uLmZpbHRlcigoaXRlbSwgaWR4KSA9PiB7XHJcbiAgICAgIGlmIChpZHggPCB0aGlzLk1heFZpZXcpIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2V0IHJlY2VudFdlYnRvb24odmFsdWU6IFJlY2VudFdlYnRvb25bXSkge1xyXG4gICAgdGhpcy5fcmVjZW50V2VidG9vbiA9IHZhbHVlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog7JqU7J28IOuzhCDsm7ntiLBcclxuICAgKlxyXG4gICAqL1xyXG4gIEBvYnNlcnZhYmxlXHJcbiAgcHJpdmF0ZSBfZGFpbHlXZWJ0b29uczogV2VidG9vbkluZm8gPSB7fTtcclxuXHJcbiAgQGNvbXB1dGVkXHJcbiAgcHVibGljIGdldCBkYWlseVdlYnRvb25zKCk6IFdlYnRvb25JbmZvIHtcclxuICAgIHJldHVybiB0aGlzLl9kYWlseVdlYnRvb25zO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHNldCBkYWlseVdlYnRvb25zKHZhbHVlOiBXZWJ0b29uSW5mbykge1xyXG4gICAgdGhpcy5fZGFpbHlXZWJ0b29ucyA9IHZhbHVlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog7KaQ6rKo7LC+6riwIO2VnCDsm7ntiLBcclxuICAgKlxyXG4gICAqL1xyXG4gIEBvYnNlcnZhYmxlXHJcbiAgcHJpdmF0ZSBfc3RhcldlYnRvb25zOiBTdGFyZWRUeXBlID0gW107XHJcblxyXG4gIEBjb21wdXRlZFxyXG4gIHB1YmxpYyBnZXQgc3RhcldlYnRvb25zKCk6IFN0YXJlZFR5cGUge1xyXG4gICAgcmV0dXJuIHRoaXMuX3N0YXJXZWJ0b29ucztcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzZXQgc3RhcldlYnRvb25zKHZhbHVlOiBTdGFyZWRUeXBlKSB7XHJcbiAgICB0aGlzLl9zdGFyV2VidG9vbnMgPSB2YWx1ZTtcclxuICAgIHRoaXMuc2F2ZVRvU3RvcmUoXCJmYXZvcmF0ZVwiLCB2YWx1ZSk7XHJcbiAgICBjb25zb2xlLmxvZyhcImNoYW5nZSBzdGFyV2VidG9vbnNcIik7XHJcbiAgfVxyXG5cclxuICBAb2JzZXJ2YWJsZVxyXG4gIHByaXZhdGUgX3NvcnRXZWJ0b29uOiBTb3J0V2VidG9vblR5cGUgPSB7fTtcclxuXHJcbiAgQGNvbXB1dGVkXHJcbiAgcHVibGljIGdldCBzb3J0V2VidG9vbigpOiBTb3J0V2VidG9vblR5cGUge1xyXG4gICAgcmV0dXJuIHRoaXMuX3NvcnRXZWJ0b29uO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHNldCBzb3J0V2VidG9vbih2YWx1ZTogU29ydFdlYnRvb25UeXBlKSB7XHJcbiAgICB0aGlzLl9zb3J0V2VidG9vbiA9IHZhbHVlO1xyXG4gICAgdGhpcy5zYXZlVG9TdG9yZShcInNvcnRXZWJ0b29uXCIsIHZhbHVlKTtcclxuICB9XHJcblxyXG4gIEBjb21wdXRlZFxyXG4gIHB1YmxpYyBnZXQgc3RhcldlYnRvb25JbmZvKCk6IFdlYnRvb25JbmZvVHlwZVtdIHtcclxuICAgIHJldHVybiB0aGlzLmFsbFdlYnRvb24uZmlsdGVyKHdlYnRvb24gPT4ge1xyXG4gICAgICBpZiAodGhpcy5fc3RhcldlYnRvb25zLmluZGV4T2Yod2VidG9vbi5pZCkgPiAtMSkgcmV0dXJuIHRydWU7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOybue2IsCDquLDroZ3snZgg6rCc7IiYXHJcbiAgICpcclxuICAgKiBAcmVhZG9ubHlcclxuICAgKi9cclxuICBAY29tcHV0ZWQgZ2V0IHZpc2l0Q291bnQoKSB7XHJcbiAgICBsZXQgcmVzdWx0ID0gMDtcclxuICAgIE9iamVjdC5rZXlzKHRoaXMudmlzaXRzKS5mb3JFYWNoKHYgPT4ge1xyXG4gICAgICByZXN1bHQgKz0gT2JqZWN0LmtleXModGhpcy52aXNpdHNbdl0pLmxlbmd0aDtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxuICB9XHJcbiAgLyoqXHJcbiAgICog66qo65OgIOybue2IsCDrpqzsiqTtirhcclxuICAgKlxyXG4gICAqIEByZWFkb25seVxyXG4gICAqL1xyXG4gIEBjb21wdXRlZCBnZXQgYWxsV2VidG9vbigpOiBXZWJ0b29uSW5mb1R5cGVbXSB7XHJcbiAgICBjb25zdCB3ZWJ0b29uczogeyBba2V5OiBudW1iZXJdOiBXZWJ0b29uSW5mb1R5cGUgfSA9IHt9O1xyXG4gICAgT2JqZWN0LmtleXModGhpcy5fZGFpbHlXZWJ0b29ucykuZm9yRWFjaChkYXkgPT4ge1xyXG4gICAgICB0aGlzLl9kYWlseVdlYnRvb25zW2RheV0uZm9yRWFjaCh3ZWJ0b29uID0+IHtcclxuICAgICAgICBpZiAod2VidG9vbnNbd2VidG9vbi5pZF0pIHtcclxuICAgICAgICAgIGlmICh3ZWJ0b29uLmlzUmVzdCB8fCB3ZWJ0b29uLmlzVXApIHtcclxuICAgICAgICAgICAgd2VidG9vbnNbd2VidG9vbi5pZF0gPSB7XHJcbiAgICAgICAgICAgICAgLi4ud2VidG9vbnNbd2VidG9vbi5pZF0sXHJcbiAgICAgICAgICAgICAgaXNSZXN0OiB3ZWJ0b29uLmlzUmVzdCxcclxuICAgICAgICAgICAgICBpc1VwOiB3ZWJ0b29uLmlzVXBcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgd2VidG9vbnNbd2VidG9vbi5pZF0gPSB3ZWJ0b29uO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICAgIGNvbnNvbGUubG9nKFwiZ2V0IGFsbCB3ZWJ0b29uXCIpO1xyXG4gICAgY29uc3QgcmV0dXJuVmFsdWU6IFdlYnRvb25JbmZvVHlwZVtdID0gW107XHJcbiAgICBPYmplY3Qua2V5cyh3ZWJ0b29ucykuZm9yRWFjaChpZCA9PiByZXR1cm5WYWx1ZS5wdXNoKHdlYnRvb25zW2lkXSkpO1xyXG4gICAgcmV0dXJuIHJldHVyblZhbHVlLmNvbmNhdCh0aGlzLmNvbXBsZXRlV2VidG9vbnMpO1xyXG4gIH1cclxuXHJcbiAgQG9ic2VydmFibGVcclxuICBwdWJsaWMgY29tcGxldGVXZWJ0b29uczogV2VidG9vbkluZm9UeXBlW10gPSBbXTtcclxuXHJcbiAgQGFjdGlvblxyXG4gIHByaXZhdGUgc2V0Q29tcGV0ZVdlYnRvb24oKSB7XHJcbiAgICBXZWJ0b29uUmVxdWVzdC5nZXRDb21wbGV0ZVdlYnRvb24oKS50aGVuKHZhbHVlID0+IHtcclxuICAgICAgdGhpcy5jb21wbGV0ZVdlYnRvb25zID0gdmFsdWU7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIEBvYnNlcnZhYmxlIGxvYWRpbmdTdGF0dXM6IExvYWRpbmdTdGF0dXMgPSBcIm5vdCBzdGFydFwiO1xyXG5cclxuICBAYWN0aW9uXHJcbiAgcHVibGljIGFzeW5jIHNldFJlY2VudFdlYnRvb24oKSB7XHJcbiAgICBjb25zdCB3ZWJ0b29uczogUmVjZW50V2VidG9vbltdID0gW107XHJcbiAgICBjb25zdCBwcm9taXNlczogUHJvbWlzZTx2b2lkPltdID0gW107XHJcbiAgICB0aGlzLmxvYWRpbmdTdGF0dXMgPSBcInN0YXJ0XCI7XHJcbiAgICBPYmplY3Qua2V5cyh0aGlzLl92aXNpdHMpLmZvckVhY2goa2V5ID0+IHtcclxuICAgICAgT2JqZWN0LmtleXModGhpcy5fdmlzaXRzW2tleV0pLmZvckVhY2goa2V5MiA9PiB7XHJcbiAgICAgICAgaWYgKHRoaXMub3B0aW9uLmlzQmFja2dyb3VuZCkge1xyXG4gICAgICAgICAgaWYgKCF0aGlzLl93ZWJ0b29uVHlwZVtrZXldKSByZXR1cm47XHJcbiAgICAgICAgICB3ZWJ0b29ucy5wdXNoKHtcclxuICAgICAgICAgICAgaWQ6IHBhcnNlSW50KGtleSksXHJcbiAgICAgICAgICAgIGxhc3RWaXNpdDogdGhpcy5fdmlzaXRzW2tleV1ba2V5Ml0gKiAxMDAwLFxyXG4gICAgICAgICAgICBuYW1lOiB0aGlzLl93ZWJ0b29uVHlwZVtrZXldLnRpdGxlLFxyXG4gICAgICAgICAgICBubzogcGFyc2VJbnQoa2V5MiksXHJcbiAgICAgICAgICAgIHR5cGU6IHRoaXMuX3dlYnRvb25UeXBlW2tleV0udHlwZVxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIGlmICghdGhpcy5vcHRpb24udXNlSW1nTG9nIHx8ICF0aGlzLl9pbWdsb2dbYCR7a2V5fS0ke2tleTJ9YF0pIHtcclxuICAgICAgICAgIHByb21pc2VzLnB1c2goXHJcbiAgICAgICAgICAgIFdlYnRvb25SZXF1ZXN0LmdldE9wZW5HcmFwaChcclxuICAgICAgICAgICAgICB0aGlzLl93ZWJ0b29uVHlwZVtrZXldLnR5cGUsXHJcbiAgICAgICAgICAgICAgcGFyc2VJbnQoa2V5KSxcclxuICAgICAgICAgICAgICBwYXJzZUludChrZXkyKVxyXG4gICAgICAgICAgICApLnRoZW4odmFsdWUgPT4ge1xyXG4gICAgICAgICAgICAgIGlmICh2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgd2VidG9vbnMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgIGlkOiBwYXJzZUludChrZXkpLFxyXG4gICAgICAgICAgICAgICAgICBsYXN0VmlzaXQ6IHRoaXMuX3Zpc2l0c1trZXldW2tleTJdICogMTAwMCxcclxuICAgICAgICAgICAgICAgICAgbmFtZTogdGhpcy5fd2VidG9vblR5cGVba2V5XS50aXRsZSxcclxuICAgICAgICAgICAgICAgICAgbm86IHBhcnNlSW50KGtleTIpLFxyXG4gICAgICAgICAgICAgICAgICB0eXBlOiB0aGlzLl93ZWJ0b29uVHlwZVtrZXldLnR5cGUsXHJcbiAgICAgICAgICAgICAgICAgIGltZzogdmFsdWUuaW1nLFxyXG4gICAgICAgICAgICAgICAgICBub25hbWU6IHZhbHVlLnRpdGxlXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbi51c2VJbWdMb2cpIHtcclxuICAgICAgICAgICAgICAgICAgdGhpcy5faW1nbG9nW2Ake2tleX0tJHtrZXkyfWBdID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIGltYWdlOiB2YWx1ZS5pbWcucmVwbGFjZShcclxuICAgICAgICAgICAgICAgICAgICAgIFwiaHR0cHM6Ly9zaGFyZWQtY29taWMucHN0YXRpYy5uZXQvdGh1bWIvXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICBcIlwiXHJcbiAgICAgICAgICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiB2YWx1ZS50aXRsZVxyXG4gICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5fdmlzaXRzW2tleV1ba2V5Ml07XHJcbiAgICAgICAgICAgICAgICB0aGlzLnZpc2l0cyA9IHRoaXMuX3Zpc2l0cztcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBjb25zdCB7IGltYWdlLCBuYW1lIH0gPSB0aGlzLl9pbWdsb2dbYCR7a2V5fS0ke2tleTJ9YF07XHJcbiAgICAgICAgICB3ZWJ0b29ucy5wdXNoKHtcclxuICAgICAgICAgICAgaWQ6IHBhcnNlSW50KGtleSksXHJcbiAgICAgICAgICAgIGxhc3RWaXNpdDogdGhpcy5fdmlzaXRzW2tleV1ba2V5Ml0gKiAxMDAwLFxyXG4gICAgICAgICAgICBuYW1lOiB0aGlzLl93ZWJ0b29uVHlwZVtrZXldLnRpdGxlLFxyXG4gICAgICAgICAgICBubzogcGFyc2VJbnQoa2V5MiksXHJcbiAgICAgICAgICAgIHR5cGU6IHRoaXMuX3dlYnRvb25UeXBlW2tleV0udHlwZSxcclxuICAgICAgICAgICAgaW1nOiBcImh0dHBzOi8vc2hhcmVkLWNvbWljLnBzdGF0aWMubmV0L3RodW1iL1wiICsgaW1hZ2UsXHJcbiAgICAgICAgICAgIG5vbmFtZTogbmFtZVxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gICAgYXdhaXQgUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xyXG4gICAgd2VidG9vbnMuc29ydCgoYSwgYikgPT4ge1xyXG4gICAgICBpZiAoYS5sYXN0VmlzaXQgPCBiLmxhc3RWaXNpdCkgcmV0dXJuIDE7XHJcbiAgICAgIHJldHVybiAtMTtcclxuICAgIH0pO1xyXG4gICAgdGhpcy5yZWNlbnRXZWJ0b29uID0gd2VidG9vbnM7XHJcbiAgICB0aGlzLmxvYWRpbmdTdGF0dXMgPSBcImVuZFwiO1xyXG4gICAgLy8gU2F2ZSB0byBDaHJvbWVcclxuICAgIGlmICh0aGlzLm9wdGlvbi51c2VJbWdMb2cgJiYgIXRoaXMub3B0aW9uLmlzQmFja2dyb3VuZClcclxuICAgICAgdGhpcy5pbWdsb2cgPSB0aGlzLl9pbWdsb2c7XHJcbiAgICB0aGlzLl92aXNpdHMgPSB0aGlzLl92aXNpdHM7XHJcbiAgICBjb25zb2xlLmxvZyh3ZWJ0b29ucyk7XHJcbiAgfVxyXG5cclxuICBAYWN0aW9uIHNldFZpc2l0c0Zyb21DaHJvbWUoKSB7XHJcbiAgICB0aGlzLmxvYWRpbmdTdGF0dXMgPSBcInN0YXJ0XCI7XHJcbiAgICB3aGFsZS5oaXN0b3J5LnNlYXJjaChcclxuICAgICAge1xyXG4gICAgICAgIHRleHQ6IFwiZGV0YWlsLm5obj90aXRsZUlkPVwiLFxyXG4gICAgICAgIHN0YXJ0VGltZTogMCxcclxuICAgICAgICBtYXhSZXN1bHRzOiA1MDAwXHJcbiAgICAgIH0sXHJcbiAgICAgIGRhdGEgPT4ge1xyXG4gICAgICAgIHRoaXMud2VidG9vblR5cGUgPSB0aGlzLnZpc2l0cyA9IHt9O1xyXG4gICAgICAgIGNvbnN0IHdlYnRvb246IFdlYnRvb25UeXBlID0ge307XHJcbiAgICAgICAgY29uc3QgdmlzaXRzOiBWaXNpdFR5cGUgPSB7fTtcclxuICAgICAgICBsZXQgaW5kZXggPSAwO1xyXG5cclxuICAgICAgICBkYXRhLmZvckVhY2goZCA9PiB7XHJcbiAgICAgICAgICBpZiAoIWQudGl0bGUgfHwgaW5kZXggPj0gdGhpcy5vcHRpb24uaGlzdG9yeU1heCkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgY29uc29sZS5sb2coZCk7XHJcbiAgICAgICAgICBjb25zdCB1cmwgPSBuZXcgVVJMKGQudXJsKTtcclxuICAgICAgICAgIGlmICh1cmwuaG9zdC5pbmRleE9mKFwibS5cIikgPiAtMSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBjb25zdCBwYXJhbXMgPSB1cmwuc2VhcmNoUGFyYW1zO1xyXG4gICAgICAgICAgY29uc3Qgd2lkID0gcGFyYW1zLmdldChcInRpdGxlSWRcIik7XHJcbiAgICAgICAgICBjb25zdCB3bm8gPSBwYXJhbXMuZ2V0KFwibm9cIik7XHJcblxyXG4gICAgICAgICAgaWYgKCF3aWQgfHwgIXdubykgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgaWYgKCF3ZWJ0b29uW3dpZF0pIHtcclxuICAgICAgICAgICAgd2VidG9vblt3aWRdID0ge307XHJcbiAgICAgICAgICAgIHZpc2l0c1t3aWRdID0ge307XHJcbiAgICAgICAgICAgIHdlYnRvb25bd2lkXS50aXRsZSA9IGQudGl0bGUuc3BsaXQoXCI6OlwiKVswXS50cmltKCk7XHJcbiAgICAgICAgICAgIHdlYnRvb25bd2lkXS50eXBlID0gdXJsLnBhdGhuYW1lLnNwbGl0KFwiL2RldGFpbC5uaG5cIilbMF07XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAoIXZpc2l0c1t3aWRdW3dub10pIHtcclxuICAgICAgICAgICAgaW5kZXgrKztcclxuICAgICAgICAgICAgdmlzaXRzW3dpZF1bd25vXSA9IE1hdGguZmxvb3IoZC5sYXN0VmlzaXRUaW1lIC8gMTAwMCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy53ZWJ0b29uVHlwZSA9IHdlYnRvb247XHJcbiAgICAgICAgdGhpcy52aXNpdHMgPSB2aXNpdHM7XHJcbiAgICAgICAgaWYgKHdpbmRvd1tcIlVJa2l0XCJdKSB7XHJcbiAgICAgICAgICBVSWtpdC5ub3RpZmljYXRpb24oXHJcbiAgICAgICAgICAgIGA8ZGl2IGNsYXNzPVwidWstdGV4dC1zbWFsbFwiPuuwqeusuOq4sOuhneyXkOyEnCDquLDroZ3snYQg67aI65+s7JmU7Iq164uI64ukLjwvZGl2PmAsXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICB0aW1lb3V0OiAyMDAwXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICApO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgYXhpb3MgZnJvbSBcImF4aW9zXCI7XHJcbmltcG9ydCB7IFdlYnRvb25PcmRlciB9IGZyb20gXCIuLi8uLi9zdG9yZS9vcHRpb25cIjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2Ugb2dJbmZvIHtcclxuICB0aXRsZT86IHN0cmluZztcclxuICBpbWc/OiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgV2VidG9vbkluZm9UeXBlIHtcclxuICB0aXRsZT86IHN0cmluZztcclxuICBsaW5rPzogc3RyaW5nO1xyXG4gIGltZz86IHN0cmluZztcclxuICBpc1VwPzogYm9vbGVhbjtcclxuICBpc1Jlc3Q/OiBib29sZWFuO1xyXG4gIGlkPzogbnVtYmVyO1xyXG59XHJcblxyXG5leHBvcnQgdHlwZSBXZWVrID0gXCJtb25cIiB8IFwidHVlXCIgfCBcIndlZFwiIHwgXCJ0aHVcIiB8IFwiZnJpXCIgfCBcInNhdFwiIHwgXCJzdW5cIjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgV2VidG9vbkluZm8ge1xyXG4gIFtrZXk6IHN0cmluZ106IEFycmF5PFdlYnRvb25JbmZvVHlwZT47XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCB3ZWVrRGF5OiBXZWVrW10gPSBbXHJcbiAgXCJtb25cIixcclxuICBcInR1ZVwiLFxyXG4gIFwid2VkXCIsXHJcbiAgXCJ0aHVcIixcclxuICBcImZyaVwiLFxyXG4gIFwic2F0XCIsXHJcbiAgXCJzdW5cIlxyXG5dO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2VidG9vblJlcXVlc3Qge1xyXG4gIC8qKlxyXG4gICAqIO2OmOydtOyngOydmCDsgqzsp4QsIO2DgOydtO2LgOydhCDrtojrn6zsmLXri4jri6QuXHJcbiAgICogQHBhcmFtIHR5cGUg7Ju57YiwIO2DgOyehVxyXG4gICAqIEBwYXJhbSBrZXkxIOybue2IsCDrsojtmLhcclxuICAgKiBAcGFyYW0ga2V5MiDtmozssKgg67KI7Zi4XHJcbiAgICovXHJcbiAgc3RhdGljIGFzeW5jIGdldE9wZW5HcmFwaChcclxuICAgIHR5cGU6IHN0cmluZyxcclxuICAgIGtleTE6IG51bWJlcixcclxuICAgIGtleTI6IG51bWJlclxyXG4gICk6IFByb21pc2U8b2dJbmZvPiB7XHJcbiAgICBjb25zdCBvZzogb2dJbmZvID0ge307XHJcbiAgICBjb25zdCB1cmwgPSBgaHR0cHM6Ly9jb21pYy5uYXZlci5jb20ke3R5cGV9L2RldGFpbC5uaG4/dGl0bGVJZD0ke2tleTF9Jm5vPSR7a2V5Mn1gO1xyXG4gICAgY29uc3QgeyBkYXRhIH0gPSBhd2FpdCBheGlvcy5nZXQ8c3RyaW5nPih1cmwpO1xyXG4gICAgb2cudGl0bGUgPSBkYXRhLm1hdGNoKFxyXG4gICAgICAvPG1ldGEgW14+XSpwcm9wZXJ0eT1bXFxcIiddb2c6ZGVzY3JpcHRpb25bXFxcIiddIFtePl0qY29udGVudD1bXFxcIiddKFteJ15cXFwiXSs/KVtcXFwiJ11bXj5dKj4vXHJcbiAgICApWzFdO1xyXG4gICAgb2cuaW1nID0gZGF0YS5tYXRjaChcclxuICAgICAgLzxtZXRhIFtePl0qcHJvcGVydHk9W1xcXCInXW9nOmltYWdlW1xcXCInXSBbXj5dKmNvbnRlbnQ9W1xcXCInXShbXideXFxcIl0rPylbXFxcIiddW14+XSo+L1xyXG4gICAgKVsxXTtcclxuXHJcbiAgICBpZiAoXHJcbiAgICAgIG9nLnRpdGxlICYmXHJcbiAgICAgIG9nLmltZyAmJlxyXG4gICAgICBvZy5pbWcubWF0Y2goXCJodHRwczovL3NoYXJlZC1jb21pYy5wc3RhdGljLm5ldC90aHVtYi9cIilcclxuICAgIClcclxuICAgICAgcmV0dXJuIG9nO1xyXG5cclxuICAgIGNvbnNvbGUubG9nKGBPcGVuR3JhcGggZ2V0IGZhaWxlZC5gLCB1cmwsIG9nKTtcclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGFzeW5jIGdldEFsbFdlYnRvb24oc29ydDogV2VidG9vbk9yZGVyKTogUHJvbWlzZTxXZWJ0b29uSW5mbz4ge1xyXG4gICAgY29uc3QgbGluayA9IGBodHRwczovL2NvbWljLm5hdmVyLmNvbS93ZWJ0b29uL3dlZWtkYXkubmhuP29yZGVyPSR7c29ydH1gO1xyXG4gICAgY29uc3QgeyBkYXRhIH0gPSBhd2FpdCBheGlvcy5nZXQobGluayk7XHJcbiAgICBpZiAoIWRhdGEpIHtcclxuICAgICAgY29uc29sZS5sb2coYHJlcXVlc3Q6JHtsaW5rfSBFcnJvcmApO1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIGNvbnN0IHdlYnRvb25zOiBXZWJ0b29uSW5mbyA9IHt9O1xyXG4gICAgY29uc3QgcGFnZSA9IG5ldyBET01QYXJzZXIoKVxyXG4gICAgICAucGFyc2VGcm9tU3RyaW5nKGRhdGEsIFwidGV4dC9odG1sXCIpXHJcbiAgICAgIC5xdWVyeVNlbGVjdG9yKFwiZGl2LmRhaWx5X2FsbFwiKTtcclxuICAgIHdlZWtEYXkuZm9yRWFjaChkYXkgPT4ge1xyXG4gICAgICBjb25zdCBkYXlFbGVtZW50ID0gcGFnZVxyXG4gICAgICAgIC5xdWVyeVNlbGVjdG9yKFwiaDQuXCIgKyBkYXkpXHJcbiAgICAgICAgLnBhcmVudEVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChcInVsPmxpXCIpO1xyXG4gICAgICB3ZWJ0b29uc1tkYXldID0gW107XHJcbiAgICAgIGRheUVsZW1lbnQuZm9yRWFjaChlbGVtZW50ID0+IHtcclxuICAgICAgICBjb25zdCB3ZWJ0b29uOiBXZWJ0b29uSW5mb1R5cGUgPSB7fTtcclxuICAgICAgICBjb25zdCB0b29uRWxlbWVudDogSFRNTExpbmtFbGVtZW50ID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gICAgICAgICAgXCJkaXYudGh1bWI+YVwiXHJcbiAgICAgICAgKTtcclxuICAgICAgICBjb25zdCBpbWdFbGVtZW50OiBIVE1MSW1hZ2VFbGVtZW50ID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gICAgICAgICAgXCJkaXYudGh1bWI+YT5pbWdcIlxyXG4gICAgICAgICk7XHJcbiAgICAgICAgY29uc3QgdXJsID0gbmV3IFVSTCh0b29uRWxlbWVudC5ocmVmKTtcclxuICAgICAgICB3ZWJ0b29uLmltZyA9IGltZ0VsZW1lbnQuc3JjO1xyXG4gICAgICAgIHdlYnRvb24udGl0bGUgPSBpbWdFbGVtZW50LnRpdGxlO1xyXG4gICAgICAgIHdlYnRvb24ubGluayA9IGBodHRwczovL2NvbWljLm5hdmVyLmNvbSR7dXJsLnBhdGhuYW1lICsgdXJsLnNlYXJjaH1gO1xyXG4gICAgICAgIHdlYnRvb24uaXNSZXN0ID0gISF0b29uRWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiZW0uaWNvX2JyZWFrXCIpO1xyXG4gICAgICAgIHdlYnRvb24uaXNVcCA9ICEhdG9vbkVsZW1lbnQucXVlcnlTZWxlY3RvcihcImVtLmljb191cGR0XCIpO1xyXG4gICAgICAgIHdlYnRvb24uaWQgPSBwYXJzZUludCh1cmwuc2VhcmNoUGFyYW1zLmdldChcInRpdGxlSWRcIikpO1xyXG4gICAgICAgIHdlYnRvb25zW2RheV0ucHVzaCh3ZWJ0b29uKTtcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiB3ZWJ0b29ucztcclxuICB9XHJcblxyXG4gIHN0YXRpYyBhc3luYyBnZXRDb21wbGV0ZVdlYnRvb24oKTogUHJvbWlzZTxXZWJ0b29uSW5mb1R5cGVbXT4ge1xyXG4gICAgY29uc3QgbGluayA9IGBodHRwczovL2NvbWljLm5hdmVyLmNvbS93ZWJ0b29uL2ZpbmlzaC5uaG4/b3JkZXI9VGl0bGVOYW1lYDtcclxuICAgIGNvbnN0IHsgZGF0YSB9ID0gYXdhaXQgYXhpb3MuZ2V0KGxpbmspO1xyXG4gICAgaWYgKCFkYXRhKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKGByZXF1ZXN0OiR7bGlua30gRXJyb3JgKTtcclxuICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgICBjb25zdCB3ZWJ0b29uczogV2VidG9vbkluZm9UeXBlW10gPSBbXTtcclxuICAgIGNvbnN0IGNoaWxkV2VidG9vbnMgPSBuZXcgRE9NUGFyc2VyKClcclxuICAgICAgLnBhcnNlRnJvbVN0cmluZyhkYXRhLCBcInRleHQvaHRtbFwiKVxyXG4gICAgICAucXVlcnlTZWxlY3RvckFsbChcInVsLmltZ19saXN0PmxpXCIpO1xyXG4gICAgY2hpbGRXZWJ0b29ucy5mb3JFYWNoKGVsZW1lbnQgPT4ge1xyXG4gICAgICBjb25zdCB0b29uOiBXZWJ0b29uSW5mb1R5cGUgPSB7XHJcbiAgICAgICAgaW1nOiBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCJkaXYudGh1bWIgaW1nXCIpLmdldEF0dHJpYnV0ZShcInNyY1wiKSxcclxuICAgICAgICBpc1Jlc3Q6IGZhbHNlLFxyXG4gICAgICAgIGlzVXA6IGZhbHNlLFxyXG4gICAgICAgIHRpdGxlOiBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCJkbD5kdD5hXCIpLmdldEF0dHJpYnV0ZShcInRpdGxlXCIpLFxyXG4gICAgICAgIGxpbms6IGBodHRwczovL2NvbWljLm5hdmVyLmNvbSR7ZWxlbWVudFxyXG4gICAgICAgICAgLnF1ZXJ5U2VsZWN0b3IoXCJkbD5kdD5hXCIpXHJcbiAgICAgICAgICAuZ2V0QXR0cmlidXRlKFwiaHJlZlwiKX1gXHJcbiAgICAgIH07XHJcbiAgICAgIHRvb24uaWQgPSBwYXJzZUludChuZXcgVVJMKHRvb24ubGluaykuc2VhcmNoUGFyYW1zLmdldChcInRpdGxlSWRcIikpO1xyXG4gICAgICB3ZWJ0b29ucy5wdXNoKHRvb24pO1xyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gd2VidG9vbnM7XHJcbiAgfVxyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=