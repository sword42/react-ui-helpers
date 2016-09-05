import React 		from 'react'
import { find, forEach, map, isObject } from 'lodash'
import classNames from 'classnames'
import Select from 'react-select'

import { buildValueOptionParser, findSelectedOptionFromModelValue,
 					getModelValueFromSelectOption} from './SelectHelpers.js'


export class MultiSelectInput extends React.Component {
	constructor(props) {
		super(props)
		this.updateSelection = this.updateSelection.bind(this)
		const options = this.convertOptions(props.options, props.optionsParser)
		const selectValues = this.identifySelectedOptions(props.model.getValue(), props.options, props.optionsParser, options)
		this.state = { options:options, selectValues:selectValues }
	}

	componentWillReceiveProps(nextProps) {
		const options = this.convertOptions(nextProps.options, nextProps.optionsParser)
		const selectValues = this.identifySelectedOptions(nextProps.model.getValue(), nextProps.options, nextProps.optionsParser, options)
		this.setState({ options:options, selectValues:selectValues })
	}

	updateSelection(selectedSelectOptions) {
		const values = map(selectedSelectOptions, (viewOption) => {
			return getModelValueFromSelectOption(viewOption.label, this.props.options, this.props.optionsParser)
		})
		this.props.model.updateValue(values)
	}

	convertOptions(propsOptions, optionsParser) {
		return map(propsOptions, (option) => {
			return {label:optionsParser.label(option), value:optionsParser.label(option) }
		})
	}

	identifySelectedOptions(selectedModelValues, propOptions, optionsParser, viewOptions) {
		return map(selectedModelValues, (modelValue) => {
			return findSelectedOptionFromModelValue(modelValue, propOptions, optionsParser, viewOptions)
		})
	}

	render() {
		const inputClass = classNames({
			'form-group':true,
			'has-error':!this.props.model.isValid() && !this.props.model.isEmpty() && !this.props.model.isPristine()
		})
		return (
			<div className={inputClass}>
				<If condition={this.props.label}>
					<label className="control-label">{this.props.label}</label>
				</If>
				<Select multi={true} value={this.state.selectValues} options={this.state.options} onChange={this.updateSelection}
						/>
				<If condition={(!this.props.model.isValid() && !this.props.model.isEmpty() && !this.props.model.isPristine())} >
					{errors}
				</If>
			</div>
		)
	}
}
MultiSelectInput.propTypes = {
	model: React.PropTypes.object.isRequired,
	label: React.PropTypes.string,
	options: React.PropTypes.array.isRequired,
	optionsParser: React.PropTypes.object
}
MultiSelectInput.defaultProps = {
	optionsParser: buildValueOptionParser()
}
