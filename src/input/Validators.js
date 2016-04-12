import { isNil, isString, isEmpty } from 'lodash'


export function validateEmail(input) {
	if (isNil(input)) {
		return null
	}
	if (!isString(input)) {
		return 'Value is not a valid email'
	}
	if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input)) {
		return null
	}
	return 'Value is not a valid email'
}

export function validateRequired(input) {
	if (isNil(input) || isEmpty(input)) {
		return 'Value is required'
	}
	return null
}

export function validateMinLength(input, options) {
	if (isNil(input)) {
		return null
	}
	if (options && isString(input) && options['length'] && input.length >= options['length']) {
		return null
	}
	return 'Value must be longer'
}

export function validateMaxLength(input, options) {
	if (isNil(input)) {
		return null
	}
	if (options && isString(input) && options['length'] && input.length <= options['length']) {
		return null
	}
	return 'Value must be longer'
}

export function validatePattern(input, options) {
	if (isNil(input)) {
		return null
	}
	if (options && isString(input) && options['pattern'] ) {
		const reg = new RegExp(options['pattern'])
		if (reg.test()) {
			return null
		}
	}
	return 'Value must match pattern'
}

export function validateNumber(input) {
	if (isNil(input)) {
		return null
	}
	if (/^[0-9]*$/.test(input)) {
		return null
	}
	return 'Value is not a valid number'
}

export function validateAlphaNumeric(input) {
	if (isNil(input)) {
		return null
	}
	if (/^\w+$/.test(input)) {
		return null
	}
	return 'Value is not a valid alphanumeric'
}
