+++
categories = ["general"]
date = "2016-05-09T15:26:34-07:00"
tags = ["document"]
title = "Usage"

+++

* [InputModel](#inputmodel)
  - [createInputModel](#createinputmodel)
* [Validators](#validators)
  - [validateEmail](#validateemail)
  - [validateRequired](#validaterequired)
  - [validateMinLength](#validateminlength)
  - [validateMaxLength](#validatemaxlength)
  - [validatePattern](#validatepattern)
  - [validateNumber](#validatenumber)
  - [validateAlphaNumeric](#validatealphanumeric)
* [CheckboxInput](#checkboxinput)
* [RadioInput](#radioinput)
* [SelectInput](#selectinput)
  - [buildValueOptionParser](#buildvalueoptionparser)
  - [buildLabelValueObjectOptionParser](#buildlabelvalueobjectoptionparser)
  - [buildLabeledObjectOptionParser](#buildlabeledobjectoptionparser)
* [TextareaInput](#textareainput)
* [TextInput](#textinput)


### <a id="inputmodel"></a>InputModel

An InputModel allows an input field to be bound to a model representation. Allows an initial value to be set, access to the current value, validation of the value, and listener notification. Must be created by [createInputModel](#createinputmodel).

##### Functions/Parameters

+ name - the name for the InputModel
+ getValue() - the current value for the InputModel
+ updateValue(newValue) - updates the Value of the InputModel, running validators, and afterwards, calling listeners to notify of value change
+ errors - returns map of errors, where key is validator name and value is failure message
+ isValid() - does the InputModel pass all validators?
+ isPristine() - has the InputModel been modified?
+ isEmpty() - does the InputModel have no value?
+ addListener(listenerFunc)
+ removeListener(listenerFunc)

#### <a id="createinputmodel"></a>createInputModel

Creates a new InputModel, with options

+ name - name for Model
+ value - initial value for Model
+ listeners - array of listenerFunctions
+ validators - map of validatorFunctions, where key is validator name, and value is function

### <a id="validators"></a>Validators

Collection of validator functions.  A Validator function must accept the value to be checked, and return null if the value passes the validation, or a String message describing the failure if the Validator does not pass. If the validator requires additional values, the function can accept a second "options" parameter which will contain key/value pairs of the options.

#### <a id="validateemail"></a>validateEmail

Validates that the value is a valid email address.

#### <a id="validaterequired"></a>validateRequired

Validates that the value exists and is not empty

#### <a id="validateminlength"></a>validateMinLength

Validates that the value is of a minimum length. Requires options parameter "length" to pass validation if the value exists.

#### <a id="validatemaxlength"></a>validateMaxLength

Validates that the value is of a maximum length. Requires options parameter "length" to pass validation if the value exists.

#### <a id="validatepattern"></a>validatePattern

Validates that the value passes a RegExp pattern. Requires options parameter "pattern" to pass validation if the value exists.

#### <a id="validatenumber"></a>validateNumber

Validates that the value is a valid number.

#### <a id="validatealphanumeric"></a>validateAlphaNumeric

Validates that the value is a valid AlphaNumeric value.

### <a id="checkboxinput"></a>CheckboxInput

React component that allows an InputModel to be bound to a Checkbox input element.  Uses Bootstrap styling. If the InputModel has an existing value, will default to checked/unchecked depending.

##### PropTypes
+ model - Required, InputModel
+ label - Required, String
+ inline - Optional, uses Inline Styling
+ selectedValue - Optional, either String, Number, Boolean, or Object. If set, updates Model with this value when the checkbox is selected and null when it isn't selected. If not set, updates model with Boolean True/False value.

### <a id="radioinput"></a>RadioInput

React component that allows an InputModel to be bound to a Radio input element.  Uses Bootstrap styling. If the InputModel has an existing value, will default to selected depending.

##### PropTypes
+ model - Required, InputModel
+ label - Required, String
+ inline - Optional, uses Inline Styling
+ name - Required, String, name of Radio Group
+ selectedValue - Optional, either String, Number, Boolean, or Object. If set, updates Model with this value when the radio is selected.

### <a id="selectinput"></a>SelectInput

React component that allows an InputModel to be bound to a Select input element.  Uses Bootstrap styling. If the InputModel has an existing value, will default the selection to the value.

##### PropTypes
+ model - Required, InputModel
+ label - Optional, String
+ options - Required, Array, List of selectable options to display
+ optionsParser - Optional, Object with 2 functions label and value. Each function, when passed an element from the options array should return the correct item. The label function should return the item to display in the component UI. The value function should return the item to set on the InputModel when that element is selected. If no optionsParser is passed in, a buildValueOptionParser is used as default.

#### <a id="buildvalueoptionparser"></a>buildValueOptionParser

An OptionsParser that returns the element passed in for both the label and the value functions

#### <a id="buildlabelvalueobjectoptionparser"></a>buildLabelValueObjectOptionParser

An OptionsParser that can be constructed with a labelFieldName and a valueFieldName. When the OptionsParser label function is called with an element, it returns the value for the field on the Element with the labelFieldName. When the OptionsParser value function is called with an element, it returns the value for the field on the Element with the valueFieldName.

#### <a id="buildlabeledobjectoptionparser"></a>buildLabeledObjectOptionParser

An OptionsParser that can be constructed with a labelFieldName. When the OptionsParser label function is called with an element, it returns the value for the field on the Element with the labelFieldName. When the OptionsParser value function is called with an element, it returns the element itself.

### <a id="textareainput"></a>TextareaInput

React component that allows an InputModel to be bound to a Textarea input element.  Uses Bootstrap styling.

##### PropTypes
+ model - Required, InputModel
+ label - Required, String

### <a id="textinput"></a>TextInput

React component that allows an InputModel to be bound to a Text input element.  Uses Bootstrap styling.

##### PropTypes
+ model - Required, InputModel
+ label - Required, String
+ obscure - Optional, Boolean.  If set, hides display of value characters.
