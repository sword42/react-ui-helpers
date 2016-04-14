import React 		from 'react'
import { uniqueId, forOwn } from 'lodash'
import classNames from 'classnames'


export class CheckboxInput extends React.Component {
	constructor(props) {
		super(props)
		this.state = { name:uniqueId('CheckboxInput') }
		this.ckbxUpdateValue = this.ckbxUpdateValue.bind(this)
	}

	ckbxUpdateValue(event) {
		this.props.model.updateValue(!this.props.model.getValue())
	}

	render() {
		const inputClass = classNames({
			'form-group':true,
			'has-error':!this.props.model.isValid() && !this.props.model.isEmpty() && !this.props.model.isPristine()
		})
		const errors = []
		forOwn(this.props.model.errors, function(value, key){
			errors.push(<span className="help-block" key={key}>{value}</span>)
		})
		return (
			<div>
				<div className={inputClass}><label>
						<input type="checkbox" name={this.state.name} checked={this.props.model.getValue()} 
								onChange={this.ckbxUpdateValue} />{this.props.label}
					</label></div>
				<If condition={(!this.props.model.isValid() && !this.props.model.isEmpty() && !this.props.model.isPristine())} >
					{errors}
				</If>
			</div>
		)
	}
}
CheckboxInput.propTypes = { 
	model: React.PropTypes.object.isRequired,
	label: React.PropTypes.string.isRequired,
}