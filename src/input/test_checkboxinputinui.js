import React from 'react'
import ReactDOM from 'react-dom'
import { mapValues, isString, isNil, forOwn, isEmpty } from 'lodash'

import { createInputModel } from './InputModel.js'
import { CheckboxInput } from './CheckboxInput.jsx'

var info = {
	remembermodel: null,
	remembervalue: true,
	updateRemember: function(value) {
		info.remembervalue = value
		display()
	},
	supermodel: null,
	supervalue: null,
	updateSuper: function(value) {
		info.supervalue = value
		display()
	}
}

function loadData() {
	info.remembermodel = createInputModel({value:info.remembervalue, listeners:[info.updateRemember]})
	info.supermodel = createInputModel({value:null, listeners:[info.updateSuper]})
}

loadData()

function display() {
	var content = (
		<div>
			<form>
				<CheckboxInput model={info.remembermodel} label="Remember" />
				<CheckboxInput model={info.supermodel} label="Super" selectedValue="Batman" />
				<button type="submit" className="btn btn-lg btn-primary btn-block" onClick={info.submitRequest} 
						disabled={(!info.remembermodel.isValid() || !info.supermodel.isValid())}>Submit</button>
			</form>
			<p><span>Remember Value </span><span>{Boolean(info.remembervalue).toString()}</span></p>
			<p><span>Super Value </span><span>{info.supervalue}</span></p>
		</div>
	)

	ReactDOM.render(
	  content,
	  document.getElementById('target')
	)	
}
display()
