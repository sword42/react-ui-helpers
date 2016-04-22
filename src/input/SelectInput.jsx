import React 		from 'react'
import { has, isBoolean, forEach, get } from 'lodash'
import classNames from 'classnames'


export class SelectInput extends React.Component {
	constructor(props) {
		super(props)
		this.updateSelection = this.updateSelection.bind(this)
	}

	updateSelection(event) {
		let selection = event.target.value
//		selection = this.props.optionsParser.value( selection )
		this.props.model.updateValue(selection)
	}

	render() {
		const inputClass = classNames({
			'form-group':true,
			'has-error':!this.props.model.isValid() && !this.props.model.isEmpty() && !this.props.model.isPristine()
		})
		const options = []
		const optionsParser = this.props.optionsParser
		forEach(this.props.options, function(option, index){
			options.push(
				<option key={index} value={optionsParser.value( option )}>{ optionsParser.label(option) }</option>
				)
		})


		return (
			<div className={inputClass}>
				<If condition={this.props.label}>
					<label className="control-label">{this.props.label}</label>
				</If>
				<select className="form-control" value={this.props.model.getValue()} onChange={this.updateSelection}>
					{options}
				</select>
				<If condition={(!this.props.model.isValid() && !this.props.model.isEmpty() && !this.props.model.isPristine())} >
					{errors}
				</If>
			</div>
		)
	}
}
SelectInput.propTypes = { 
	model: React.PropTypes.object.isRequired,
	label: React.PropTypes.string,
	options: React.PropTypes.array.isRequired,
	optionsParser: React.PropTypes.object
}
SelectInput.defaultProps = {
	optionsParser: buildValueOptionParser()
}

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