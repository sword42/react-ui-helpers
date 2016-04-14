import React from 'react'
import ReactDOM from 'react-dom'
import { mapValues, isString, isNil, forOwn, isEmpty } from 'lodash'

import { createInputModel } from './InputModel.js'
import { CheckboxInput } from './CheckboxInput.jsx'

var info = {
	model: null,
	value: false,
	updateValue: function(value) {
		info.value = value
		display()
	}
}

function loadData() {
	info.model = createInputModel({name:'remember', value:false, listeners:[info.updateValue]})
}

loadData()

function display() {
	var content = (
		<div>
			<form>
				<CheckboxInput model={info.model} label="Remember" />
				<button type="submit" className="btn btn-lg btn-primary btn-block" onClick={info.submitRequest} 
						disabled={(!info.model.isValid())}>Submit</button>
			</form>
			<p><span>Top Value </span><span>{Boolean(info.value).toString()}</span></p>
		</div>
	)

	ReactDOM.render(
	  content,
	  document.getElementById('target')
	)	
}
display()
