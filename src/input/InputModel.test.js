import { Promise } from 'bluebird'

import { createInputModel } from './InputModel'
import chai from 'chai'
const expect = chai.expect


describe('InputModel',() => {

	const failingValidator = function(value) {
		return 'Failing Validator Fails'
	}
	const requiredValidator = function(value) {
		if (!value) {
			return 'Value is Required'
		}
		return null
	}

	describe('#createInputModel()', () => {
		it('should create InputModel with no values', () => {
			const inputModel = createInputModel()
			expect(inputModel).to.have.property('errors')
				.that.is.empty
			expect(inputModel.getValue()).to.be.null
			expect(inputModel.isPristine()).to.be.true
			expect(inputModel.isValid()).to.be.true
		})
		it('should create InputModel with a value and name', () => {
			const inputModel = createInputModel({value:'abc123', name:'def456'})
			expect(inputModel.getValue()).to.be.equal('abc123')
			expect(inputModel.name).to.be.equal('def456')
			expect(inputModel.isPristine()).to.be.true
			expect(inputModel.isValid()).to.be.true
		})
		it('should update value', () => {
			const inputModel = createInputModel({value:'abc123', name:'def456'})
			expect(inputModel.getValue()).to.be.equal('abc123')
			const testEvent = '321cba'
			inputModel.updateValue(testEvent)
			expect(inputModel.getValue()).to.be.equal('321cba')
			expect(inputModel.isPristine()).to.be.false
			expect(inputModel.isValid()).to.be.true
		})
		it('should update value with validator', () => {
			const inputModel = createInputModel({value:'abc123', name:'def456', validators:{'required':requiredValidator}})
			expect(inputModel.getValue()).to.be.equal('abc123')
			const testEvent = '321cba'
			inputModel.updateValue(testEvent)
			expect(inputModel.getValue()).to.be.equal('321cba')
			expect(inputModel).to.have.property('errors')
				.that.is.empty
			expect(inputModel.isPristine()).to.be.false
			expect(inputModel.isValid()).to.be.true
		})
		it('should update value with validator failure', () => {
			const inputModel = createInputModel({value:'abc123', name:'def456', validators:{'failing':failingValidator}})
			expect(inputModel.getValue()).to.be.equal('abc123')
			const testEvent = '321cba'
			inputModel.updateValue(testEvent)
			expect(inputModel.getValue()).to.be.equal('321cba')
			expect(inputModel.errors).to.have.property('failing')
				.that.is.equal(failingValidator())
			expect(inputModel.isPristine()).to.be.false
			expect(inputModel.isValid()).to.be.false
		})
		it('should update value with a listener', () => {
			let listenerValue = null
			let listenerName = null
			const updateListener = function(value, name) {
				listenerValue = value
				listenerName = name
				expect(listenerValue).to.be.equal('321cba')
				expect(listenerName).to.be.equal('def456')
			}
			const inputModel = createInputModel({value:'abc123', name:'def456',  listeners:[updateListener]})
			expect(inputModel.getValue()).to.be.equal('abc123')
			const testEvent = '321cba'
			const prom = inputModel.updateValue(testEvent)
			expect(inputModel.getValue()).to.be.equal('321cba')
			expect(inputModel.isPristine()).to.be.false
			expect(inputModel.isValid()).to.be.true
			return prom
		})
	})

})