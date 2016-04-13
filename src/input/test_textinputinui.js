import React from 'react'
import ReactDOM from 'react-dom'
import { mapValues, isString, isNil, forOwn, isEmpty } from 'lodash'

import { createInputModel } from './InputModel.js'
import { validateEmail, validateRequired } from './Validators.js'
import { TextInput } from './TextInput.jsx'

var info = {
	emailModel: null,
	emailValue: null,
	updateEmail: function(value) {
//		console.log('update email called with '+ value)
		info.emailValue = value
		display()
	}
}

function loadData() {
	info.emailModel = createInputModel({name:'email', value:'', listeners:[info.updateEmail], validators:{email:validateEmail, required: validateRequired}})
}

loadData()

function display() {
	var content = (
		<div>
			<form>
				<TextInput model={info.emailModel} label="Email" />
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
