import React from 'react'
import ReactDOM from 'react-dom'
import { Promise } from 'bluebird'
import classNames from 'classnames'
import { mapValues, isString, isNil, forOwn, isEmpty } from 'lodash'

import { createInputModel } from './InputModel.js'

var info = {
	emailModel: null,
	emailValue: null,
	updateEmail: function(value) {
//		console.log('update email called with '+ value)
		info.emailValue = value
		display()
	},
	validateEmail: function(value) {
		if (isNil(value)) {
			return null
		}
		if (!isString(value)) {
			return 'Value is not an email'
		}
		if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
			return null
		}
		return 'Value is not a valid email'
	},
	validateRequired: function(value) {
		if (isNil(value) || isEmpty(value)) {
			return 'Value is required'
		}
		return null
	}
}

function loadData() {
	info.emailModel = createInputModel({name:'email', value:'', listeners:[info.updateEmail], validators:{email:info.validateEmail, required: info.validateRequired}})
}


loadData()

export class SimpleFormComponent extends React.Component {
	constructor(props) {
		super(props)
//		this.state = {email:props.email}
		this.emailUpdate = this.emailUpdate.bind(this)
	}
	emailUpdate(value, name) {
//		this.setState({email:this.props.email})
	}
	componentWillMount() {
//		this.props.email.addListener(this.emailUpdate)
	}
	componentWillUnmount() {
//		this.props.email.removeListener(this.emailUpdate)
	}
	render() {
		const inputClass = classNames({
			'form-group':true,
			'has-error':!this.props.email.isValid() && !this.props.email.isEmpty() && !this.props.email.isPristine()
		})
		const errors = []
		forOwn(this.props.email.errors, function(value, key){
			errors.push(<span className="help-block" key={key}>{value}</span>)
		})
		return (
			<div className={inputClass}>
				<label htmlFor="email">Email</label>
				<input type="email" className="form-control" name="email" placeholder="Enter email" value={this.props.email.getValue()} 
							onChange={this.props.email.updateValue} />
				<If condition={(!this.props.email.isValid() && !this.props.email.isEmpty() && !this.props.email.isPristine())} >
				{errors}
				</If>
			</div>
		)
	}
}
SimpleFormComponent.propTypes = {
	email: React.PropTypes.object
}

function display() {
	var content = (
		<div>
			<form>
				<SimpleFormComponent email={info.emailModel} />
				<button type="submit" className="btn btn-lg btn-primary btn-block" onClick={info.submitRequest} 
						disabled={(!info.emailModel.isValid())}>Submit</button>
			</form>
			<p><span>Top Value </span><span>{info.emailValue}</span></p>
		</div>
	)

	ReactDOM.render(
	  content,
	  document.getElementById('target')
	)	
}
display()
