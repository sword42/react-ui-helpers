import React 		from 'react'
import { has, isBoolean } from 'lodash'
import classNames from 'classnames'


export class RadioInput extends React.Component {
	constructor(props) {
		super(props)
		this.updateSelected = this.updateSelected.bind(this)
		this.getSelectedFromModel = this.getSelectedFromModel.bind(this)
		this.state = { selected:this.getSelectedFromModel(props) }
	}

	componentWillReceiveProps(nextProps) {
		this.setState({ selected:this.getSelectedFromModel(nextProps) })
	}

	updateSelected(event) {
		const newSelected = !this.state.selected
		this.setState( {selected: newSelected} )
		if (has(this.props, 'selectedValue') ) {
			if (newSelected) {
				this.props.model.updateValue( this.props.selectedValue )
			}
		} else {
			this.props.model.updateValue( newSelected )
		}
	}

	getSelectedFromModel(props) {
		const localProps = props || this.props
		if (has(localProps, 'selectedValue') ) {
			return (localProps.model.getValue() === localProps.selectedValue)
		} else if (isBoolean( localProps.model.getValue() ) ) {
			return localProps.model.getValue()
		} else {
			return false
		}
	}

	render() {
		const outerClass = classNames({
			'has-error':!this.props.model.isValid() && !this.props.model.isEmpty() && !this.props.model.isPristine()
		})

		if (this.props.inline) {
			return (
					<label className="radio-inline">
						<input type="radio" name={this.props.name} value={this.state.selected}
								onChange={this.updateSelected} /> {this.props.label}
					</label>
			)
		} else {
			return (
				<div className={outerClass}>
					<div className="radio">
						<label>
							<input type="radio" name={this.props.name} value={this.state.selected}
								onChange={this.updateSelected} defaultChecked={this.getSelectedFromModel(this.props)} /> {this.props.label}
						</label>
					</div>
				</div>
			)
		}
	}
}
RadioInput.propTypes = {
	model: React.PropTypes.object.isRequired,
	label: React.PropTypes.string.isRequired,
	inline: React.PropTypes.bool,
	name: React.PropTypes.string.isRequired,
	selectedValue: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number,
      React.PropTypes.bool,
      React.PropTypes.object
    ])
}
