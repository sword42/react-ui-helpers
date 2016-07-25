import React 		from 'react'
import { find, forEach, map } from 'lodash'
import classNames from 'classnames'
import Select from 'react-select'

import { buildValueOptionParser } from './SelectInput.jsx'


export class MultiSelectInput extends React.Component {
	constructor(props) {
		super(props)
		this.updateSelection = this.updateSelection.bind(this)
		this.createSelectOptionFromModelOption = this.createSelectOptionFromModelOption.bind(this)
		this.getSelectOptionFromModelValue = this.getSelectOptionFromModelValue.bind(this)
		this.getModelValueFromSelectOption = this.getModelValueFromSelectOption.bind(this)
		const options = map(this.props.options, this.createSelectOptionFromModelOption)
		const selectValues = map(this.props.model.getValue(), this.getSelectOptionFromModelValue)
		this.state = { options:options, selectValues:selectValues }
	}

	componentWillReceiveProps(nextProps) {
		const options = map(this.props.options, this.createSelectOptionFromModelOption)
		const selectValues = map(this.props.model.getValue(), this.getSelectOptionFromModelValue)
		this.setState({ options:options, selectValues:selectValues })
	}

	updateSelection(selectedSelectOptions) {
		const values = map(selectedSelectOptions, this.getModelValueFromSelectOption)
		this.props.model.updateValue(values)
	}

	createSelectOptionFromModelOption(option) {
		return { label:this.props.optionsParser.label(option), value:this.props.optionsParser.label(option) }
	}

	getModelValueFromSelectOption(selectOption) {
		const label = selectOption.label
		const optionsParser = this.props.optionsParser
		const modelOption = find(this.props.options, function(item) {
			return (label === optionsParser.label( item ) )
		})
		return optionsParser.value(modelOption)
	}

	getSelectOptionFromModelValue(modelValue) {// modelValue -> modelOption -> modelOptionLabel -> selectOption
		const optionsParser = this.props.optionsParser
		const modelOption = find(this.props.options, function(item) {
			return (modelValue === optionsParser.value( item ) )
		})
		const modelOptionLabel = optionsParser.label( modelOption )
		return find(this.state.options, function(selectOption) {
			return (selectOption.label === modelOptionLabel)
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
