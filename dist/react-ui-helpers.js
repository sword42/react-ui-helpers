(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("lodash"), require("bluebird"));
	else if(typeof define === 'function' && define.amd)
		define(["lodash", "bluebird"], factory);
	else if(typeof exports === 'object')
		exports["react-ui-helpers"] = factory(require("lodash"), require("bluebird"));
	else
		root["react-ui-helpers"] = factory(root["lodash"], root["bluebird"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _InputModel = __webpack_require__(1);
	
	Object.keys(_InputModel).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _InputModel[key];
	    }
	  });
	});
	
	var _Validators = __webpack_require__(4);
	
	Object.keys(_Validators).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _Validators[key];
	    }
	  });
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.createInputModel = createInputModel;
	
	var _lodash = __webpack_require__(2);
	
	var _bluebird = __webpack_require__(3);
	
	function InputModel(vals) {
		var modelValue = vals['value'] ? vals['value'] : null;
		var viewValue = modelValue;
		var valid = true;
		var pristine = true;
		var listeners = setupListeners(vals['listeners']);
		var validators = vals['validators'] ? vals['validators'] : {};
		var self = {
			name: vals['name'] ? vals['name'] : null,
			getValue: getValue,
			updateValue: updateValue,
			errors: {},
			isValid: isValid,
			isPristine: isPristine,
			isEmpty: isEmpty,
			addListener: addListener,
			removeListener: removeListener
		};
	
		function getValue() {
			return modelValue;
		}
		function updateValue(event) {
			var newVal = event.target.value;
			if (newVal === viewValue && newVal === modelValue) {
				return;
			}
			pristine = false;
			viewValue = newVal;
			return processViewUpdate();
		}
		function isValid() {
			return valid;
		}
		function isPristine() {
			return pristine;
		}
		function isEmpty() {
			return (0, _lodash.isNil)(modelValue) || (0, _lodash.isEmpty)(modelValue);
		}
		function addListener(listener) {
			listeners[listener] = _bluebird.Promise.method(listener);
		}
		function removeListener(listener) {
			delete listeners[listener];
		}
		function processViewUpdate() {
			var localViewValue = viewValue;
			self.errors = processValidators(localViewValue);
			valid = (0, _lodash.keys)(self.errors).length === 0;
			modelValue = localViewValue;
			return processListeners(localViewValue);
		}
		function processValidators(localViewValue) {
			var newErrors = {};
			var validatorResult = void 0;
			(0, _lodash.forOwn)(validators, function (validator, vName) {
				try {
					validatorResult = validator(localViewValue);
					if (validatorResult) {
						newErrors[vName] = validatorResult;
					}
				} catch (err) {
					console.log('Validator Error: ' + err);
				}
			});
			return newErrors;
		}
		function processListeners(localViewValue) {
			var retPromises = [];
			var listenerFuncs = (0, _lodash.values)(listeners);
			(0, _lodash.forEach)(listenerFuncs, function (listener) {
				try {
					retPromises.push(listener(localViewValue, name));
				} catch (err) {
					console.log('Listener Error: ' + err);
				}
			});
			return _bluebird.Promise.all(retPromises);
		}
		function setupListeners(requestedListeners) {
			var ret = {};
			(0, _lodash.forEach)(requestedListeners, function (listener) {
				ret[listener] = _bluebird.Promise.method(listener);
			});
			return ret;
		}
		self.errors = processValidators(viewValue);
		valid = (0, _lodash.keys)(self.errors).length === 0;
		return self;
	}
	
	function createInputModel(vals) {
		vals = vals || {};
		var ret = new InputModel(vals);
		return ret;
	}

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.validateEmail = validateEmail;
	exports.validateRequired = validateRequired;
	exports.validateMinLength = validateMinLength;
	exports.validateMaxLength = validateMaxLength;
	exports.validatePattern = validatePattern;
	exports.validateNumber = validateNumber;
	exports.validateAlphaNumeric = validateAlphaNumeric;
	
	var _lodash = __webpack_require__(2);
	
	function validateEmail(input) {
		if ((0, _lodash.isNil)(input)) {
			return null;
		}
		if (!(0, _lodash.isString)(input)) {
			return 'Value is not a valid email';
		}
		if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input)) {
			return null;
		}
		return 'Value is not a valid email';
	}
	
	function validateRequired(input) {
		if ((0, _lodash.isNil)(input) || (0, _lodash.isEmpty)(input)) {
			return 'Value is required';
		}
		return null;
	}
	
	function validateMinLength(input, options) {
		if ((0, _lodash.isNil)(input)) {
			return null;
		}
		if (options && (0, _lodash.isString)(input) && options['length'] && input.length >= options['length']) {
			return null;
		}
		return 'Value must be longer';
	}
	
	function validateMaxLength(input, options) {
		if ((0, _lodash.isNil)(input)) {
			return null;
		}
		if (options && (0, _lodash.isString)(input) && options['length'] && input.length <= options['length']) {
			return null;
		}
		return 'Value must be longer';
	}
	
	function validatePattern(input, options) {
		if ((0, _lodash.isNil)(input)) {
			return null;
		}
		if (options && (0, _lodash.isString)(input) && options['pattern']) {
			var reg = new RegExp(options['pattern']);
			if (reg.test()) {
				return null;
			}
		}
		return 'Value must match pattern';
	}
	
	function validateNumber(input) {
		if ((0, _lodash.isNil)(input)) {
			return null;
		}
		if (/^[0-9]*$/.test(input)) {
			return null;
		}
		return 'Value is not a valid number';
	}
	
	function validateAlphaNumeric(input) {
		if ((0, _lodash.isNil)(input)) {
			return null;
		}
		if (/^\w+$/.test(input)) {
			return null;
		}
		return 'Value is not a valid alphanumeric';
	}

/***/ }
/******/ ])
});
;
//# sourceMappingURL=react-ui-helpers.js.map