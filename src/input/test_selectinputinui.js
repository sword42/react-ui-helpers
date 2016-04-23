import React from 'react'
import ReactDOM from 'react-dom'
import { isEmpty } from 'lodash'

import { createInputModel } from './InputModel.js'
import { validateRequired } from './Validators.js'
import { SelectInput, buildLabelValueObjectOptionParser, buildLabeledObjectOptionParser } from './SelectInput.jsx'

var info = {
	model1: null,
	value1: null,
	update1: function(value) {
		info.value1 = value
		display()
	},
	options1: ['Red', 'Blue', 'Green'],
	model2: null,
	value2: null,
	update2: function(value) {
		info.value2 = value
		display()
	},
	options2: [ {name:'Lakers', id:'0'}, {name:'Kings', id:'1'}, {name:'Warriors', id:'2'} ],
	optionsParser2: buildLabeledObjectOptionParser('name')
//	optionsParser2: buildLabelValueObjectOptionParser('name', 'id')
}

function loadData() {
	info.model1 = createInputModel({name:'color', value:info.value1, listeners:[info.update1], validators:{required: validateRequired}})
	info.model2 = createInputModel({name:'team', value:info.value2, listeners:[info.update2], validators:{required: validateRequired}})
}

loadData()

function display() {
	var content = (
		<div>
			<form>
				<SelectInput model={info.model1} label="Color" options={info.options1} />
				<SelectInput model={info.model2} label="Team" options={info.options2} optionsParser={info.optionsParser2} />
				<button type="submit" className="btn btn-lg btn-primary btn-block" onClick={info.submitRequest} 
						disabled={(!info.model1.isValid() )}>Submit</button>
			</form>
			<p><span>Value1 </span><span>{info.value1}</span></p>
			<p><span>Value2 </span><span>{ JSON.stringify( info.value2 ) }</span></p>
		</div>
	)

	ReactDOM.render(
	  content,
	  document.getElementById('target')
	)	
}
display()
