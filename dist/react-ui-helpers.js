!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t(require("lodash"),require("bluebird"),require("react"),require("classnames")):"function"==typeof define&&define.amd?define(["lodash","bluebird","react","classnames"],t):"object"==typeof exports?exports["react-ui-helpers"]=t(require("lodash"),require("bluebird"),require("react"),require("classnames")):e["react-ui-helpers"]=t(e.lodash,e.bluebird,e.react,e.classnames)}(this,function(e,t,r,n){return function(e){function t(n){if(r[n])return r[n].exports;var o=r[n]={exports:{},id:n,loaded:!1};return e[n].call(o.exports,o,o.exports,t),o.loaded=!0,o.exports}var r={};return t.m=e,t.c=r,t.p="",t(0)}([function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(1);Object.keys(n).forEach(function(e){"default"!==e&&Object.defineProperty(t,e,{enumerable:!0,get:function(){return n[e]}})});var o=r(4);Object.keys(o).forEach(function(e){"default"!==e&&Object.defineProperty(t,e,{enumerable:!0,get:function(){return o[e]}})});var l=r(5);Object.keys(l).forEach(function(e){"default"!==e&&Object.defineProperty(t,e,{enumerable:!0,get:function(){return l[e]}})});var a=r(8);Object.keys(a).forEach(function(e){"default"!==e&&Object.defineProperty(t,e,{enumerable:!0,get:function(){return a[e]}})});var u=r(9);Object.keys(u).forEach(function(e){"default"!==e&&Object.defineProperty(t,e,{enumerable:!0,get:function(){return u[e]}})});var i=r(10);Object.keys(i).forEach(function(e){"default"!==e&&Object.defineProperty(t,e,{enumerable:!0,get:function(){return i[e]}})})},function(e,t,r){"use strict";function n(e){function t(){return h}function r(e){var t=e;return e&&e.target&&void 0!==e.target.value&&(e.stopPropagation(),t=e.target.value,""===t&&(t=null)),t!==b||t!==h?(y=!1,b=t,c()):void 0}function n(){return m}function o(){return y}function u(){return(0,l.isNil)(h)||(0,l.isEmpty)(h)}function i(e){v[e]=a.Promise.method(e)}function s(e){delete v[e]}function c(){var e=b;return P.errors=p(e),m=0===(0,l.keys)(P.errors).length,h=e,d(e)}function p(e){var t={},r=void 0;return(0,l.forOwn)(g,function(n,o){try{r=n(e),r&&(t[o]=r)}catch(l){console.log("Validator Error: "+l)}}),t}function d(e){var t=[],r=(0,l.values)(v);return(0,l.forEach)(r,function(r){try{t.push(r(e,name))}catch(n){console.log("Listener Error: "+n)}}),a.Promise.all(t)}function f(e){var t={};return(0,l.forEach)(e,function(e){t[e]=a.Promise.method(e)}),t}var h=e.value?e.value:null,b=h,m=!0,y=!0,v=f(e.listeners),g=e.validators?e.validators:{},P={name:e.name?e.name:null,getValue:t,updateValue:r,errors:{},isValid:n,isPristine:o,isEmpty:u,addListener:i,removeListener:s};return P.errors=p(b),m=0===(0,l.keys)(P.errors).length,P}function o(e){e=e||{};var t=new n(e);return t}Object.defineProperty(t,"__esModule",{value:!0}),t.createInputModel=o;var l=r(2),a=r(3)},function(t,r){t.exports=e},function(e,r){e.exports=t},function(e,t,r){"use strict";function n(e){return(0,c.isNil)(e)?null:(0,c.isString)(e)&&/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e)?null:"Value is not a valid email"}function o(e){return(0,c.isNil)(e)||(0,c.isEmpty)(e)?"Value is required":null}function l(e,t){return(0,c.isNil)(e)?null:t&&(0,c.isString)(e)&&t.length&&e.length>=t.length?null:"Value must be longer"}function a(e,t){return(0,c.isNil)(e)?null:t&&(0,c.isString)(e)&&t.length&&e.length<=t.length?null:"Value must be longer"}function u(e,t){if((0,c.isNil)(e))return null;if(t&&(0,c.isString)(e)&&t.pattern){var r=new RegExp(t.pattern);if(r.test())return null}return"Value must match pattern"}function i(e){return(0,c.isNil)(e)?null:/^[0-9]*$/.test(e)?null:"Value is not a valid number"}function s(e){return(0,c.isNil)(e)?null:/^\w+$/.test(e)?null:"Value is not a valid alphanumeric"}Object.defineProperty(t,"__esModule",{value:!0}),t.validateEmail=n,t.validateRequired=o,t.validateMinLength=l,t.validateMaxLength=a,t.validatePattern=u,t.validateNumber=i,t.validateAlphaNumeric=s;var c=r(2)},function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function l(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0}),t.TextInput=void 0;var u=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),i=r(6),s=n(i),c=r(2),p=r(7),d=n(p),f=t.TextInput=function(e){function t(e){o(this,t);var r=l(this,Object.getPrototypeOf(t).call(this,e));return r.state={name:(0,c.uniqueId)("TextInput")},r}return a(t,e),u(t,[{key:"render",value:function(){var e=(0,d["default"])({"form-group":!0,"has-error":!this.props.model.isValid()&&!this.props.model.isEmpty()&&!this.props.model.isPristine()}),t=[];(0,c.forOwn)(this.props.model.errors,function(e,r){t.push(s["default"].createElement("span",{className:"help-block",key:r},e))});var r=this.props.obscure?"password":"text";return s["default"].createElement("div",{className:e},this.props.label?s["default"].createElement("label",{htmlFor:this.state.name},this.props.label):null,s["default"].createElement("input",{type:r,className:"form-control",name:this.state.name,value:this.props.model.getValue(),onChange:this.props.model.updateValue}),this.props.model.isValid()||this.props.model.isEmpty()||this.props.model.isPristine()?null:t)}}]),t}(s["default"].Component);f.propTypes={model:s["default"].PropTypes.object.isRequired,label:s["default"].PropTypes.string,obscure:s["default"].PropTypes.bool}},function(e,t){e.exports=r},function(e,t){e.exports=n},function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function l(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0}),t.CheckboxInput=void 0;var u=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),i=r(6),s=n(i),c=r(2),p=r(7),d=n(p),f=t.CheckboxInput=function(e){function t(e){o(this,t);var r=l(this,Object.getPrototypeOf(t).call(this,e));return r.updateSelected=r.updateSelected.bind(r),r.getSelectedFromModel=r.getSelectedFromModel.bind(r),r.state={selected:r.getSelectedFromModel(e),name:(0,c.uniqueId)("CheckboxInput")},r}return a(t,e),u(t,[{key:"componentWillReceiveProps",value:function(e){this.setState({selected:this.getSelectedFromModel(e)})}},{key:"updateSelected",value:function(e){var t=!this.state.selected;this.setState({selected:t}),(0,c.has)(this.props,"selectedValue")?t?this.props.model.updateValue(this.props.selectedValue):this.props.model.updateValue(null):this.props.model.updateValue(t)}},{key:"getSelectedFromModel",value:function(e){var t=e||this.props;return(0,c.has)(t,"selectedValue")?t.model.getValue()===t.selectedValue:(0,c.isBoolean)(t.model.getValue())?t.model.getValue():!1}},{key:"render",value:function(){var e=(0,d["default"])({"has-error":!this.props.model.isValid()&&!this.props.model.isEmpty()&&!this.props.model.isPristine()});return this.props.inline?s["default"].createElement("label",{className:"checkbox-inline"},s["default"].createElement("input",{type:"checkbox",name:this.state.name,value:this.state.selected,onChange:this.updateSelected})," ",this.props.label):s["default"].createElement("div",{className:e},s["default"].createElement("div",{className:"checkbox"},s["default"].createElement("label",null,s["default"].createElement("input",{type:"checkbox",name:this.state.name,checked:this.state.selected,onChange:this.updateSelected})," ",this.props.label)))}}]),t}(s["default"].Component);f.propTypes={model:s["default"].PropTypes.object.isRequired,label:s["default"].PropTypes.string.isRequired,inline:s["default"].PropTypes.bool,selectedValue:s["default"].PropTypes.oneOfType([s["default"].PropTypes.string,s["default"].PropTypes.number,s["default"].PropTypes.bool,s["default"].PropTypes.object])}},function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function l(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0}),t.RadioInput=void 0;var u=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),i=r(6),s=n(i),c=r(2),p=r(7),d=n(p),f=t.RadioInput=function(e){function t(e){o(this,t);var r=l(this,Object.getPrototypeOf(t).call(this,e));return r.updateSelected=r.updateSelected.bind(r),r.getSelectedFromModel=r.getSelectedFromModel.bind(r),r.state={selected:r.getSelectedFromModel(e)},r}return a(t,e),u(t,[{key:"componentWillReceiveProps",value:function(e){this.setState({selected:this.getSelectedFromModel(e)})}},{key:"updateSelected",value:function(e){var t=!this.state.selected;this.setState({selected:t}),(0,c.has)(this.props,"selectedValue")?t&&this.props.model.updateValue(this.props.selectedValue):this.props.model.updateValue(t)}},{key:"getSelectedFromModel",value:function(e){var t=e||this.props;return(0,c.has)(t,"selectedValue")?t.model.getValue()===t.selectedValue:(0,c.isBoolean)(t.model.getValue())?t.model.getValue():!1}},{key:"render",value:function(){var e=(0,d["default"])({"has-error":!this.props.model.isValid()&&!this.props.model.isEmpty()&&!this.props.model.isPristine()});return this.props.inline?s["default"].createElement("label",{className:"radio-inline"},s["default"].createElement("input",{type:"radio",name:this.props.name,value:this.state.selected,onChange:this.updateSelected})," ",this.props.label):s["default"].createElement("div",{className:e},s["default"].createElement("div",{className:"radio"},s["default"].createElement("label",null,s["default"].createElement("input",{type:"radio",name:this.props.name,value:this.state.selected,onChange:this.updateSelected})," ",this.props.label)))}}]),t}(s["default"].Component);f.propTypes={model:s["default"].PropTypes.object.isRequired,label:s["default"].PropTypes.string.isRequired,inline:s["default"].PropTypes.bool,name:s["default"].PropTypes.string.isRequired,selectedValue:s["default"].PropTypes.oneOfType([s["default"].PropTypes.string,s["default"].PropTypes.number,s["default"].PropTypes.bool,s["default"].PropTypes.object])}},function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{"default":e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function l(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function u(){function e(e){return e}var t={label:e,value:e};return t}function i(e,t){function r(t){return(0,f.get)(t,e)}function n(e){return(0,f.get)(e,t)}var o={label:r,value:n};return o}function s(e){function t(t){return(0,f.get)(t,e)}function r(e){return e}var n={label:t,value:r};return n}Object.defineProperty(t,"__esModule",{value:!0}),t.SelectInput=void 0;var c=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}();t.buildValueOptionParser=u,t.buildLabelValueObjectOptionParser=i,t.buildLabeledObjectOptionParser=s;var p=r(6),d=n(p),f=r(2),h=r(7),b=n(h),m=t.SelectInput=function(e){function t(e){o(this,t);var r=l(this,Object.getPrototypeOf(t).call(this,e));return r.updateSelection=r.updateSelection.bind(r),r.selectedValue=r.selectedValue.bind(r),r}return a(t,e),c(t,[{key:"updateSelection",value:function(e){var t=this.props.optionsParser,r=(0,f.find)(this.props.options,function(r){return e.target.value===t.label(r)});this.props.model.updateValue(r)}},{key:"selectedValue",value:function(){return this.props.optionsParser.label(this.props.model.getValue())}},{key:"render",value:function(){var e=(0,b["default"])({"form-group":!0,"has-error":!this.props.model.isValid()&&!this.props.model.isEmpty()&&!this.props.model.isPristine()}),t=[],r=this.props.optionsParser;return(0,f.forEach)(this.props.options,function(e,n){t.push(d["default"].createElement("option",{key:r.label(e),value:r.label(e)},r.label(e)))}),d["default"].createElement("div",{className:e},this.props.label?d["default"].createElement("label",{className:"control-label"},this.props.label):null,d["default"].createElement("select",{className:"form-control",value:this.selectedValue(),onChange:this.updateSelection},t),this.props.model.isValid()||this.props.model.isEmpty()||this.props.model.isPristine()?null:errors)}}]),t}(d["default"].Component);m.propTypes={model:d["default"].PropTypes.object.isRequired,label:d["default"].PropTypes.string,options:d["default"].PropTypes.array.isRequired,optionsParser:d["default"].PropTypes.object},m.defaultProps={optionsParser:u()}}])});
//# sourceMappingURL=react-ui-helpers.js.map