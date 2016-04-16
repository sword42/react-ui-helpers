import React from 'react'
import ReactDOM from 'react-dom'
import { mapValues, isString, isNil, forOwn, isEmpty } from 'lodash'

import { createInputModel } from './InputModel.js'
import { validateEmail, validateRequired } from './Validators.js'
import { TextInput } from './TextInput.jsx'

var info = {
	model1: null,
	value1: null,
	update1: function(value) {
		info.value1 = value
		display()
	},
	model2: null,
	value2: null,
	update2: function(value) {
		info.value2 = value
		display()
	}
}

function loadData() {
	info.model1 = createInputModel({name:'email', value:info.value1, listeners:[info.update1], validators:{email:validateEmail, required: validateRequired}})
	info.model2 = createInputModel({name:'email', value:info.value2, listeners:[info.update2], validators:{required: validateRequired}})
}

loadData()

function display() {
	var content = (
		<div>
			<form>
				<TextInput model={info.model1} label="Email" />
				<TextInput model={info.model2} label="Password" obscure={true} />
				<button type="submit" className="btn btn-lg btn-primary btn-block" onClick={info.submitRequest} 
						disabled={(!info.model1.isValid() || !info.model2.isValid())}>Submit</button>
			</form>
			<p><span>Value1 </span><span>{info.value1}</span></p>
			<p><span>Value2 </span><span>{info.value2}</span></p>
		</div>
	)

	ReactDOM.render(
	  content,
	  document.getElementById('target')
	)	
}
display()
