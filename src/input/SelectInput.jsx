import React 		from 'react'
import { has, isBoolean, forEach, get, find, isNil, isObject } from 'lodash'
import classNames from 'classnames'

import { buildValueOptionParser, findSelectedOptionFromModelValue,
 					getModelValueFromSelectOption} from './SelectHelpers.js'

export class SelectInput extends React.Component {
	constructor(props) {
		super(props)
		this.updateSelection = this.updateSelection.bind(this)
	}

	updateSelection(event) {
		const selectedLabel = event.target.value
		const selection = getModelValueFromSelectOption(selectedLabel, this.props.options, this.props.optionsParser)
		this.props.model.updateValue(selection)
	}

	render() {
		const inputClass = classNames({
			'form-group':true,
			'has-error':!this.props.model.isValid() && !this.props.model.isEmpty() && !this.props.model.isPristine()
		})
		const options = []
		const optionsParser = this.props.optionsParser
		options.push( <option className="placeholder" key="-19as8as;puoasf8" value="" disabled >Select</option> )
		forEach(this.props.options, function(option, index){
			options.push(
				<option key={ optionsParser.label(option) } value={ optionsParser.label(option) }>{ optionsParser.label(option) }</option>
				)
		})

		const selected = findSelectedOptionFromModelValue(this.props.model.getValue(),
													this.props.options, this.props.optionsParser)
		return (
			<div className={inputClass}>
				<If condition={this.props.label}>
					<label className="control-label">{this.props.label}</label>
				</If>
				<select className="form-control" value={ selected } onChange={this.updateSelection}>
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
