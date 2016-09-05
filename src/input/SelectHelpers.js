import { get, isObject, find, isNil, isEqual } from 'lodash'


export function buildValueOptionParser() {
	const ret = {
		label: returnValue,
		value: returnValue
	}
	function returnValue(value) {
		return value
	}
	return ret
}

export function buildLabelValueObjectOptionParser(labelFieldName, valueFieldName) {
	function returnLabelField(obj) {
		return get(obj, labelFieldName)
	}
	function returnValueField(obj) {
		return get(obj, valueFieldName)
	}
	const ret = {
		label: returnLabelField,
		value: returnValueField
	}
	return ret
}

export function buildLabeledObjectOptionParser(labelFieldName) {
	const ret = {
		label: returnLabelField,
		value: returnValue
	}
	function returnLabelField(obj) {
		return get(obj, labelFieldName)
	}
	function returnValue(value) {
		return value
	}
	return ret
}

export function findSelectedOptionFromModelValue(modelValue, propOptions, optionsParser, viewOptions) {
	// modelValue -> modelOption -> modelOptionLabel -> <selectOption>
	let modelOption
	if (!isObject(modelValue)) {
		modelOption = find(propOptions, (item) => {
			const val = optionsParser.value( item )
			return (!isNil(val) && modelValue == val )
		})
	} else {
		modelOption = find(propOptions, (item) => {
			const retValue = isEqual(modelValue, item)
			return retValue
		})
	}
	if (isNil(modelOption)) {
		return ''
	}
	const modelOptionLabel = optionsParser.label( modelOption )
	if (isNil(viewOptions)) {
		return modelOptionLabel
	}
	return find(viewOptions, (selectOption) => {
		return (selectOption.label == modelOptionLabel)
	} )
}

export function	getModelValueFromSelectOption(selectOptionLabel, propOptions, optionsParser) {
	const modelOption = find(propOptions, function(item) {
		const val = optionsParser.label( item )
		const retValue = (!isNil(val) && selectOptionLabel == val )
		return retValue
	})
	if (isNil(modelOption)) {
		return undefined
	}
	return optionsParser.value(modelOption)
}
