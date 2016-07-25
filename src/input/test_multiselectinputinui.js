import React from 'react'
import ReactDOM from 'react-dom'
import { isEmpty } from 'lodash'

import { createInputModel } from './InputModel.js'
import { validateRequired } from './Validators.js'
import { MultiSelectInput  } from './MultiSelectInput.jsx'
import { buildLabeledObjectOptionParser, buildLabelValueObjectOptionParser  } from './SelectInput.jsx'
import 'react-select/dist/react-select.css';

var info = {
	model1: null,
	value1: [],
	update1: function(value) {
		info.value1 = value
		display()
	},
	options1: [ 'one', 'two', 'three' ],
	model2: null,
	value2: [],
	update2: function(value) {
		info.value2 = value
		display()
	},
	options2: [ {label:'Lakers', value:'0'}, {label:'Kings', value:'1'}, {label:'Warriors', value:'2'} ],
	options2Parser: buildLabeledObjectOptionParser('label'),
	model3: null,
	value3: [],
	update3: function(value) {
		info.value3 = value
		display()
	},
	options3: [ {label:'Lakers', id:'0'}, {label:'Kings', id:'1'}, {label:'Warriors', id:'2'} ],
	options3Parser: buildLabelValueObjectOptionParser('label', 'id')
}

function loadData() {
	info.model1 = createInputModel({name:'numbers', value:info.value1, listeners:[info.update1], validators:{required: validateRequired}})
	info.model2 = createInputModel({name:'team', value:info.value2, listeners:[info.update2], validators:{required: validateRequired}})
	info.model3 = createInputModel({name:'team', value:info.value3, listeners:[info.update3], validators:{required: validateRequired}})
}

loadData()

function display() {
	var content = (
		<div>
			<form>
				<MultiSelectInput model={info.model1} label="Number" options={info.options1} />
				<MultiSelectInput model={info.model2} label="Team" options={info.options2} optionsParser={info.options2Parser} />
				<MultiSelectInput model={info.model3} label="Team" options={info.options3} optionsParser={info.options3Parser} />
				<button type="submit" className="btn btn-lg btn-primary btn-block" onClick={info.submitRequest}
						disabled={false}>Submit</button>
			</form>
			<p><span>Value1 </span><span>{ JSON.stringify( info.value1 ) }</span></p>
			<p><span>Value2 </span><span>{ JSON.stringify( info.value2 ) }</span></p>
			<p><span>Value3 </span><span>{ JSON.stringify( info.value3 ) }</span></p>
		</div>
	)

	ReactDOM.render(
	  content,
	  document.getElementById('target')
	)
}
display()
