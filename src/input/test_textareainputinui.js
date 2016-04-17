import React from 'react'
import ReactDOM from 'react-dom'

import { createInputModel } from './InputModel.js'
import { validateRequired } from './Validators.js'
import { TextareaInput } from './TextareaInput.jsx'

var info = {
	model1: null,
	value1: null,
	update1: function(value) {
		info.value1 = value
		display()
	}
}

function loadData() {
	info.model1 = createInputModel({name:'details', value:info.value1, listeners:[info.update1], validators:{required: validateRequired}})
}

loadData()

function display() {
	var content = (
		<div>
			<form>
				<TextareaInput model={info.model1} label="Details" />
				<button type="submit" className="btn btn-lg btn-primary btn-block" onClick={info.submitRequest} 
						disabled={(!info.model1.isValid())}>Submit</button>
			</form>
			<p><span>Value1 </span><span>{info.value1}</span></p>
		</div>
	)

	ReactDOM.render(
	  content,
	  document.getElementById('target')
	)	
}
display()
