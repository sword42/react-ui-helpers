import React from 'react'
import ReactDOM from 'react-dom'
import { mapValues, isString, isNil, forOwn, isEmpty } from 'lodash'

import { createInputModel } from './InputModel.js'
import { RadioInput } from './RadioInput.jsx'

var info = {
	model1: null,
	value1: null,
	updateValue1: function(value) {
		info.value1 = value
		display()
	},
	model2: null,
	value2: 'Good',
	updateValue2: function(value) {
		info.value2 = value
		display()
	}
}

function loadData() {
	info.model1 = createInputModel({name:'color', value:null, listeners:[info.updateValue1]})
	info.model2 = createInputModel({name:'side', value:info.value2, listeners:[info.updateValue2]})
}

function newSide() {
	let isCurrentSideGood = ('Good' === info.value2)
	let newVal = ( isCurrentSideGood ? 'Bad' : 'Good')
	info.model2.updateValue(newVal)
}

loadData()

function display() {
	var content = (
		<div>
			<form>
				<div className="row">
					<div className="col-xs-12"><RadioInput model={info.model1} label="Red" name="color" selectedValue="Red"  /></div>
					<div className="col-xs-12"><RadioInput model={info.model1} label="Blue" name="color" selectedValue="Blue"  /></div>
					<div className="col-xs-12"><button type="submit" className="btn btn-lg btn-primary btn-block" onClick={info.submitRequest}
							disabled={(!info.model1.isValid())}>Submit 1</button></div>
				</div>
				<div className="row">
					<div className="col-xs-12"><RadioInput model={info.model2} label="Good" name="side" selectedValue="Good"  /></div>
					<div className="col-xs-12"><RadioInput model={info.model2} label="Bad" name="side" selectedValue="Bad"  /></div>
					<div className="col-xs-12"><button type="submit" className="btn btn-lg btn-primary btn-block" onClick={info.submitRequest}
							disabled={(!info.model2.isValid())}>Submit 2</button></div>
				</div>
			</form>
			<p><span>Top Value 1 </span><span>{info.value1}</span></p>
			<p><span>Top Value 2 </span><span>{info.value2}</span></p>
			<input type="button" onClick={ newSide } value="New side"/>
		</div>
	)

	ReactDOM.render(
	  content,
	  document.getElementById('target')
	)
}
display()
