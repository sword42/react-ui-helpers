(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("lodash"), require("bluebird"), require("react"), require("classnames"));
	else if(typeof define === 'function' && define.amd)
		define(["lodash", "bluebird", "react", "classnames"], factory);
	else if(typeof exports === 'object')
		exports["react-ui-helpers"] = factory(require("lodash"), require("bluebird"), require("react"), require("classnames"));
	else
		root["react-ui-helpers"] = factory(root["lodash"], root["bluebird"], root["react"], root["classnames"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_6__, __WEBPACK_EXTERNAL_MODULE_7__) {
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
	
	var _TextInput = __webpack_require__(5);
	
	Object.keys(_TextInput).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _TextInput[key];
	    }
	  });
	});
	
	var _CheckboxInput = __webpack_require__(8);
	
	Object.keys(_CheckboxInput).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _CheckboxInput[key];
	    }
	  });
	});
	
	var _RadioInput = __webpack_require__(9);
	
	Object.keys(_RadioInput).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _RadioInput[key];
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
			var newVal = event;
			if (event && event.target && event.target.value !== undefined) {
				event.stopPropagation();
				newVal = event.target.value;
				if (newVal === '') {
					newVal = null;
				}
			}
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

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.TextInput = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(6);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _lodash = __webpack_require__(2);
	
	var _classnames = __webpack_require__(7);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var TextInput = exports.TextInput = function (_React$Component) {
		_inherits(TextInput, _React$Component);
	
		function TextInput(props) {
			_classCallCheck(this, TextInput);
	
			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(TextInput).call(this, props));
	
			_this.state = { name: (0, _lodash.uniqueId)('TextInput') };
			return _this;
		}
	
		_createClass(TextInput, [{
			key: 'render',
			value: function render() {
				var inputClass = (0, _classnames2.default)({
					'form-group': true,
					'has-error': !this.props.model.isValid() && !this.props.model.isEmpty() && !this.props.model.isPristine()
				});
				var errors = [];
				(0, _lodash.forOwn)(this.props.model.errors, function (value, key) {
					errors.push(_react2.default.createElement(
						'span',
						{ className: 'help-block', key: key },
						value
					));
				});
				return _react2.default.createElement(
					'div',
					{ className: inputClass },
					this.props.label ? _react2.default.createElement(
						'label',
						{ htmlFor: this.state.name },
						this.props.label
					) : null,
					_react2.default.createElement('input', { type: 'text', className: 'form-control', name: this.state.name, value: this.props.model.getValue(),
						onChange: this.props.model.updateValue }),
					!this.props.model.isValid() && !this.props.model.isEmpty() && !this.props.model.isPristine() ? errors : null
				);
			}
		}]);
	
		return TextInput;
	}(_react2.default.Component);
	
	TextInput.propTypes = {
		model: _react2.default.PropTypes.object.isRequired,
		label: _react2.default.PropTypes.string
	};

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_6__;

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_7__;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.CheckboxInput = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(6);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _lodash = __webpack_require__(2);
	
	var _classnames = __webpack_require__(7);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var CheckboxInput = exports.CheckboxInput = function (_React$Component) {
		_inherits(CheckboxInput, _React$Component);
	
		function CheckboxInput(props) {
			_classCallCheck(this, CheckboxInput);
	
			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(CheckboxInput).call(this, props));
	
			_this.state = { name: (0, _lodash.uniqueId)('CheckboxInput') };
			_this.ckbxUpdateValue = _this.ckbxUpdateValue.bind(_this);
			return _this;
		}
	
		_createClass(CheckboxInput, [{
			key: 'ckbxUpdateValue',
			value: function ckbxUpdateValue(event) {
				this.props.model.updateValue(!this.props.model.getValue());
			}
		}, {
			key: 'render',
			value: function render() {
				var inputClass = (0, _classnames2.default)({
					'form-group': true,
					'has-error': !this.props.model.isValid() && !this.props.model.isEmpty() && !this.props.model.isPristine()
				});
				var errors = [];
				(0, _lodash.forOwn)(this.props.model.errors, function (value, key) {
					errors.push(_react2.default.createElement(
						'span',
						{ className: 'help-block', key: key },
						value
					));
				});
				var checkboxType = this.props.inline ? 'checkbox-inline' : 'checkbox';
				return _react2.default.createElement(
					'div',
					null,
					_react2.default.createElement(
						'div',
						{ className: inputClass },
						_react2.default.createElement(
							'label',
							null,
							_react2.default.createElement('input', { type: checkboxType, name: this.state.name, checked: this.props.model.getValue(),
								onChange: this.ckbxUpdateValue }),
							this.props.label
						)
					),
					!this.props.model.isValid() && !this.props.model.isEmpty() && !this.props.model.isPristine() ? errors : null
				);
			}
		}]);
	
		return CheckboxInput;
	}(_react2.default.Component);
	
	CheckboxInput.propTypes = {
		model: _react2.default.PropTypes.object.isRequired,
		label: _react2.default.PropTypes.string.isRequired,
		inline: _react2.default.PropTypes.bool
	};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.RadioInput = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(6);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _lodash = __webpack_require__(2);
	
	var _classnames = __webpack_require__(7);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var RadioInput = exports.RadioInput = function (_React$Component) {
		_inherits(RadioInput, _React$Component);
	
		function RadioInput(props) {
			_classCallCheck(this, RadioInput);
	
			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(RadioInput).call(this, props));
	
			_this.updateSelected = _this.updateSelected.bind(_this);
			_this.getSelectedFromModel = _this.getSelectedFromModel.bind(_this);
			_this.state = { selected: _this.getSelectedFromModel(props) };
			return _this;
		}
	
		_createClass(RadioInput, [{
			key: 'componentWillReceiveProps',
			value: function componentWillReceiveProps(nextProps) {
				this.setState({ selected: this.getSelectedFromModel(nextProps) });
			}
		}, {
			key: 'updateSelected',
			value: function updateSelected(event) {
				var newSelected = !this.state.selected;
				this.setState({ selected: newSelected });
				if ((0, _lodash.has)(this.props, 'selectedValue')) {
					if (newSelected) {
						this.props.model.updateValue(this.props.selectedValue);
					}
				} else {
					this.props.model.updateValue(newSelected);
				}
			}
		}, {
			key: 'getSelectedFromModel',
			value: function getSelectedFromModel(props) {
				var localProps = props || this.props;
				if ((0, _lodash.has)(localProps, 'selectedValue')) {
					return localProps.model.getValue() === localProps.selectedValue;
				} else if ((0, _lodash.isBoolean)(localProps.model.getValue())) {
					return localProps.model.getValue();
				} else {
					return false;
				}
			}
		}, {
			key: 'render',
			value: function render() {
				var outerClass = (0, _classnames2.default)({
					'has-error': !this.props.model.isValid() && !this.props.model.isEmpty() && !this.props.model.isPristine()
				});
	
				if (this.props.inline) {
					return _react2.default.createElement(
						'label',
						{ className: 'radio-inline' },
						_react2.default.createElement('input', { type: 'radio', name: this.props.name, value: this.state.selected,
							onChange: this.updateSelected }),
						' ',
						this.props.label
					);
				} else {
					return _react2.default.createElement(
						'div',
						{ className: outerClass },
						_react2.default.createElement(
							'div',
							{ className: 'radio' },
							_react2.default.createElement(
								'label',
								null,
								_react2.default.createElement('input', { type: 'radio', name: this.props.name, value: this.state.selected,
									onChange: this.updateSelected }),
								' ',
								this.props.label
							)
						)
					);
				}
			}
		}]);
	
		return RadioInput;
	}(_react2.default.Component);
	
	RadioInput.propTypes = {
		model: _react2.default.PropTypes.object.isRequired,
		label: _react2.default.PropTypes.string.isRequired,
		inline: _react2.default.PropTypes.bool,
		name: _react2.default.PropTypes.string.isRequired,
		selectedValue: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.number, _react2.default.PropTypes.bool, _react2.default.PropTypes.object])
	};

/***/ }
/******/ ])
});
;
//# sourceMappingURL=react-ui-helpers.js.map