import { forOwn, forEach, keys, values, isNil, isEmpty as _isEmpty, isObject, bind } from 'lodash'
import { Promise } from 'bluebird'

function InputModel(vals) {
	let modelValue = (vals['value'] ? vals['value'] : null )
	let viewValue = modelValue
	let valid = true
	let pristine = true
	let listeners = setupListeners(vals['listeners'])
	let validators = (vals['validators'] ? vals['validators'] : {} )
	var self = {
		name: (vals['name'] ? vals['name'] : null ),
		getValue: getValue,
		updateValue: updateValue,
		errors: {},
		isValid: isValid,
		isPristine: isPristine,
		isEmpty: isEmpty,
		addListener: addListener,
		removeListener: removeListener,
		addValidator: addValidator,
		removeValidator: removeValidator
	}

	function getValue() {
		return modelValue
	}
	function updateValue(event) {
		let newVal = event
		if (event && event.target && event.target.value !== undefined) {
			event.stopPropagation()
			newVal = event.target.value
			if (newVal === '') {
				newVal = null;
			}
		}
		if (newVal === viewValue && newVal === modelValue && !isObject(newVal)) {
			return
		}
		pristine = false
		viewValue = newVal
		return processViewUpdate()
	}
	function isValid() {
		return valid
	}
	function isPristine() {
		return pristine
	}
	function isEmpty() {
		return (isNil(modelValue) || _isEmpty(modelValue))
	}
	function addListener(listener, listenerName) {
		const listenerKey = listenerName || listener
		listeners[listenerKey] = Promise.method(listener)
	}
	function removeListener(listenerKey) {
		delete listeners[listenerKey]
	}
	function addValidator(validatorName, validatorFunc ) {
		validators[validatorName] = validatorFunc
	}
	function removeValidator(validatorName) {
		delete validators[validatorName]
	}
	function processViewUpdate() {
		const localViewValue = viewValue
		self.errors = processValidators(localViewValue)
		valid = (keys(self.errors).length === 0)
		modelValue = localViewValue
		return processListeners(localViewValue)
	}
	function processValidators(localViewValue) {
		let newErrors = {}
		let validatorResult
		forOwn(validators, function(validator, vName){
			try {
				validatorResult = validator(localViewValue)
				if (validatorResult) {
					newErrors[vName] = validatorResult
				}
			} catch (err) {
				console.log('Validator Error: '+err)
			}
		})
		return newErrors
	}
	function processListeners(localViewValue) {
		let retPromises = []
		const listenerFuncs = values(listeners)
		forEach(listenerFuncs, function(listener){
			try {
				retPromises.push(listener(localViewValue, name))
			} catch (err) {
				console.log('Listener Error: '+err)
			}
		})
		return Promise.all(retPromises)
	}
	function setupListeners(requestedListeners) {
		const ret = {}
		forEach(requestedListeners, function(listener){
			ret[listener] = Promise.method(listener)
		})
		return ret
	}
	self.errors = processValidators(viewValue)
	valid = (keys(self.errors).length === 0)
	return self
}

export function createInputModel(vals) {
	vals = vals || {}
	const ret = new InputModel(vals)
	return ret
}

export function createInputModelChain(fieldNames, sourceModel) {
	const ret = {}
	forEach(fieldNames, (fieldName) => {
		ret[fieldName] = createInputModel({name:fieldName, value:sourceModel.getValue()[fieldName] })
		ret[fieldName].addListener( bind(inputModelMapFunc, undefined, sourceModel, ret[fieldName], fieldName), fieldName )
	})
	return ret
}

export function setupInputModelListenerMapping(fieldNames, destModel, sourceModels, mapFunc) {
	forEach(fieldNames, (fieldName) => {
		sourceModels[fieldName].addListener( bind(mapFunc, undefined, destModel, sourceModels[fieldName], fieldName), fieldName )
	})
}

export function inputModelListenerCleanUp(fieldNames, sourceModels) {
	forEach(fieldNames, (fieldName) => {
		sourceModels[fieldName].removeListener( fieldName )
	})
}

export function inputModelMapFunc(destModel, sourceModel, fieldName) {
	const obj = destModel.getValue()
	obj[fieldName] = sourceModel.getValue()
	destModel.updateValue(obj)
}

export function inputModelAddValidators(inputModel, valsObj) {
	forOwn(valsObj, function(validator, vName){
		inputModel.addValidator(vName, validator)
	})
}
