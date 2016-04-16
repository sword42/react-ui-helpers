import React from 'react'
import ReactDOM from 'react-dom'
import { mapValues, isString, isNil, forOwn, isEmpty } from 'lodash'

import { createInputModel } from './InputModel.js'
import { RadioInput } from './RadioInput.jsx'

var info = {
	model: null,
	value: false,
	updateValue: function(value) {
		info.value = value
		display()
	}
}

function loadData() {
	info.model = createInputModel({name:'color', value:null, listeners:[info.updateValue]})
}

loadData()

function display() {
	var content = (
		<div>
			<form>
				<RadioInput model={info.model} label="Red" name="color" selectedValue="Red"  />
				<RadioInput model={info.model} label="Blue" name="color" selectedValue="Blue"  />
				<button type="submit" className="btn btn-lg btn-primary btn-block" onClick={info.submitRequest} 
						disabled={(!info.model.isValid())}>Submit</button>
			</form>
			<p><span>Top Value </span><span>{info.value}</span></p>
		</div>
	)

	ReactDOM.render(
	  content,
	  document.getElementById('target')
	)	
}
display()
