import React 		from 'react'
import { uniqueId, forOwn } from 'lodash'
import classNames from 'classnames'


export class TextInput extends React.Component {
	constructor(props) {
		super(props)
		this.state = { name:uniqueId('TextInput') }
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
		const inputType = (this.props.obscure ? 'password' : 'text')
		return (
			<div className={inputClass}>
				<If condition={this.props.label}>
					<label htmlFor={this.state.name}>{this.props.label}</label>
				</If>
				<input type={inputType} className="form-control" name={this.state.name} value={this.props.model.getValue()} 
							onChange={this.props.model.updateValue} />
				<If condition={(!this.props.model.isValid() && !this.props.model.isEmpty() && !this.props.model.isPristine())} >
					{errors}
				</If>
			</div>
		)
	}
}
TextInput.propTypes = { 
	model: React.PropTypes.object.isRequired,
	label: React.PropTypes.string,
	obscure: React.PropTypes.bool
}