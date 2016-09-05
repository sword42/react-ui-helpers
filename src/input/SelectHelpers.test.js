
import { buildValueOptionParser, buildLabelValueObjectOptionParser, buildLabeledObjectOptionParser,
		findSelectedOptionFromModelValue, getModelValueFromSelectOption } from './SelectHelpers'
import chai from 'chai'
const expect = chai.expect


describe('SelectHelpers',() => {

	describe('#buildValueOptionParser()', () => {
		const parser = buildValueOptionParser()
		it('should return the label for label', () => {
			expect(parser.label('123abc')).to.equal('123abc')
		})
		it('should return the value for value', () => {
			expect(parser.value('123abc')).to.equal('123abc')
		})
	})

	describe('#buildLabelValueObjectOptionParser()', () => {
		const parser = buildLabelValueObjectOptionParser('label', 'value')
		it('should return the label field for label', () => {
			const obj = {label:'abc123', value:'someother'}
			expect(parser.label(obj)).to.equal(obj.label)
		})
		it('should return the value for value', () => {
			const obj = {label:'abc123', value:'someother'}
			expect(parser.value(obj)).to.equal(obj.value)
		})
	})

	describe('#buildLabeledObjectOptionParser()', () => {
		const parser = buildLabeledObjectOptionParser('label')
		it('should return the label field for label', () => {
			const obj = {label:'abc123', value:'someother'}
			expect(parser.label(obj)).to.equal(obj.label)
		})
		it('should return the object for value', () => {
			const obj = {label:'abc123', value:'someother'}
			expect(parser.value(obj)).to.equal(obj)
		})
	})

	describe('#findSelectedOptionFromModelValue()', () => {
		const lvoParser = buildLabelValueObjectOptionParser('name', 'id')
		const loParser = buildLabeledObjectOptionParser('name')
		const voParser = buildValueOptionParser()
		const objectOptions = [{id:1, name:'one'}, {id:2, name:'two'}]
		const stringOptions = ['one', 'two']
		const emptyOptions = []
		describe('returning undefined for items not found', () => {
			it('lvoParser and objectOptions should return nil for no model value', () => {
				expect(findSelectedOptionFromModelValue(null, objectOptions, lvoParser)).to.equal('')
			})
			it('lvoParser and objectOptions should return nil for empty string model value', () => {
				expect(findSelectedOptionFromModelValue('', objectOptions, lvoParser)).to.equal('')
			})
			it('lvoParser and objectOptions should return nil for model value not there', () => {
				expect(findSelectedOptionFromModelValue(3, objectOptions, lvoParser)).to.equal('')
			})
			it('loParser and objectOptions should return nil for no model value', () => {
				expect(findSelectedOptionFromModelValue(null, objectOptions, loParser)).to.equal('')
			})
			it('loParser and objectOptions should return nil for empty string model value', () => {
				expect(findSelectedOptionFromModelValue('', objectOptions, loParser)).to.equal('')
			})
			it('loParser and objectOptions should return nil for model not there', () => {
				expect(findSelectedOptionFromModelValue({id:3, name:'three'}, objectOptions, loParser)).to.equal('')
			})
			it('voParser and objectOptions should return nil for no model value', () => {
				expect(findSelectedOptionFromModelValue(null, objectOptions, voParser)).to.equal('')
			})
			it('voParser and objectOptions should return nil for empty string model value', () => {
				expect(findSelectedOptionFromModelValue('', objectOptions, voParser)).to.equal('')
			})
			it('voParser and objectOptions should return nil for model not there', () => {
				expect(findSelectedOptionFromModelValue({id:3, name:'three'}, objectOptions, voParser)).to.equal('')
			})
			it('lvoParser and stringOptions should return nil for no model value', () => {
				expect(findSelectedOptionFromModelValue(null, stringOptions, lvoParser)).to.equal('')
			})
			it('lvoParser and stringOptions should return nil for empty string model value', () => {
				expect(findSelectedOptionFromModelValue('', stringOptions, lvoParser)).to.equal('')
			})
			it('loParser and stringOptions should return nil for no model value', () => {
				expect(findSelectedOptionFromModelValue(null, stringOptions, loParser)).to.equal('')
			})
			it('loParser and stringOptions should return nil for empty string model value', () => {
				expect(findSelectedOptionFromModelValue('', stringOptions, loParser)).to.equal('')
			})
			it('voParser and stringOptions should return nil for no model value', () => {
				expect(findSelectedOptionFromModelValue(null, stringOptions, voParser)).to.equal('')
			})
			it('voParser and stringOptions should return nil for empty string model value', () => {
				expect(findSelectedOptionFromModelValue('', stringOptions, voParser)).to.equal('')
			})
			it('voParser and stringOptions should return nil for string model value not there', () => {
				expect(findSelectedOptionFromModelValue('three', stringOptions, voParser)).to.equal('')
			})
			it('lvoParser and emptyOptions should return nil for no model value', () => {
				expect(findSelectedOptionFromModelValue(null, emptyOptions, lvoParser)).to.equal('')
			})
			it('lvoParser and emptyOptions should return nil for empty string model value', () => {
				expect(findSelectedOptionFromModelValue('', emptyOptions, lvoParser)).to.equal('')
			})
			it('loParser and emptyOptions should return nil for no model value', () => {
				expect(findSelectedOptionFromModelValue(null, emptyOptions, loParser)).to.equal('')
			})
			it('loParser and emptyOptions should return nil for empty string model value', () => {
				expect(findSelectedOptionFromModelValue('', emptyOptions, loParser)).to.equal('')
			})
			it('voParser and emptyOptions should return nil for no model value', () => {
				expect(findSelectedOptionFromModelValue(null, emptyOptions, voParser)).to.equal('')
			})
			it('voParser and emptyOptions should return nil for empty string model value', () => {
				expect(findSelectedOptionFromModelValue('', emptyOptions, voParser)).to.equal('')
			})
		})

		describe('returning correct item when found', () => {
			it('lvoParser and objectOptions should return one for model value 1', () => {
				expect(findSelectedOptionFromModelValue(1, objectOptions, lvoParser)).to.equal('one')
			})
			it('lvoParser and objectOptions should return two for model value 2', () => {
				expect(findSelectedOptionFromModelValue(2, objectOptions, lvoParser)).to.equal('two')
			})
			it('loParser and objectOptions should return one for model value first object option', () => {
				expect(findSelectedOptionFromModelValue(objectOptions[0], objectOptions, loParser)).to.equal('one')
			})
			it('loParser and objectOptions should return two for model value second object option', () => {
				expect(findSelectedOptionFromModelValue(objectOptions[1], objectOptions, loParser)).to.equal('two')
			})
			it('voParser and stringOptions should return one for model value one', () => {
				expect(findSelectedOptionFromModelValue('one', stringOptions, voParser)).to.equal('one')
			})
			it('voParser and stringOptions should return two for model value two', () => {
				expect(findSelectedOptionFromModelValue('two', stringOptions, voParser)).to.equal('two')
			})
		})

		describe('#getModelValueFromSelectOption()', () => {
			const lvoParser = buildLabelValueObjectOptionParser('name', 'id')
			const loParser = buildLabeledObjectOptionParser('name')
			const voParser = buildValueOptionParser()
			const objectOptions = [{id:1, name:'one'}, {id:2, name:'two'}]
			const stringOptions = ['one', 'two']
			const emptyOptions = []
			describe('returning undefined for items not found', () => {
				it('lvoParser and objectOptions should return nil for null select value', () => {
					expect(getModelValueFromSelectOption(null, objectOptions, lvoParser)).to.be.undefined
				})
				it('lvoParser and objectOptions should return nil for empty string select value', () => {
					expect(getModelValueFromSelectOption('', objectOptions, lvoParser)).to.be.undefined
				})
				it('lvoParser and objectOptions should return nil for model value not there', () => {
					expect(getModelValueFromSelectOption('three', objectOptions, lvoParser)).to.be.undefined
				})
				it('loParser and objectOptions should return nil for null select value', () => {
					expect(getModelValueFromSelectOption(null, objectOptions, loParser)).to.be.undefined
				})
				it('loParser and objectOptions should return nil for empty string select value', () => {
					expect(getModelValueFromSelectOption('', objectOptions, loParser)).to.be.undefined
				})
				it('loParser and objectOptions should return nil for select value not there', () => {
					expect(getModelValueFromSelectOption('three', objectOptions, loParser)).to.be.undefined
				})
				it('voParser and objectOptions should return nil for null select value', () => {
					expect(getModelValueFromSelectOption(null, objectOptions, voParser)).to.be.undefined
				})
				it('voParser and objectOptions should return nil for empty string select value', () => {
					expect(getModelValueFromSelectOption('', objectOptions, voParser)).to.be.undefined
				})
				it('voParser and objectOptions should return nil for select value not there', () => {
					expect(getModelValueFromSelectOption({id:3, name:'three'}, objectOptions, voParser)).to.be.undefined
				})
				it('lvoParser and stringOptions should return nil for no select value', () => {
					expect(getModelValueFromSelectOption(null, stringOptions, lvoParser)).to.be.undefined
				})
				it('lvoParser and stringOptions should return nil for empty string select value', () => {
					expect(getModelValueFromSelectOption('', stringOptions, lvoParser)).to.be.undefined
				})
				it('loParser and stringOptions should return nil for no select value', () => {
					expect(getModelValueFromSelectOption(null, stringOptions, loParser)).to.be.undefined
				})
				it('loParser and stringOptions should return nil for empty string select value', () => {
					expect(getModelValueFromSelectOption('', stringOptions, loParser)).to.be.undefined
				})
				it('voParser and stringOptions should return nil for no select value', () => {
					expect(getModelValueFromSelectOption(null, stringOptions, voParser)).to.be.undefined
				})
				it('voParser and stringOptions should return nil for empty string select value', () => {
					expect(getModelValueFromSelectOption('', stringOptions, voParser)).to.be.undefined
				})
				it('voParser and stringOptions should return nil for string select value not there', () => {
					expect(getModelValueFromSelectOption('three', stringOptions, voParser)).to.be.undefined
				})
				it('lvoParser and emptyOptions should return nil for no select value', () => {
					expect(getModelValueFromSelectOption(null, emptyOptions, lvoParser)).to.be.undefined
				})
				it('lvoParser and emptyOptions should return nil for empty string select value', () => {
					expect(getModelValueFromSelectOption('', emptyOptions, lvoParser)).to.be.undefined
				})
				it('loParser and emptyOptions should return nil for no select value', () => {
					expect(getModelValueFromSelectOption(null, emptyOptions, loParser)).to.be.undefined
				})
				it('loParser and emptyOptions should return nil for empty string select value', () => {
					expect(getModelValueFromSelectOption('', emptyOptions, loParser)).to.be.undefined
				})
				it('voParser and emptyOptions should return nil for no select value', () => {
					expect(getModelValueFromSelectOption(null, emptyOptions, voParser)).to.be.undefined
				})
				it('voParser and emptyOptions should return nil for empty string select value', () => {
					expect(getModelValueFromSelectOption('', emptyOptions, voParser)).to.be.undefined
				})
			})

			describe('returning correct item when found', () => {
				it('lvoParser and objectOptions should return 1 for select value one', () => {
					expect(getModelValueFromSelectOption('one', objectOptions, lvoParser)).to.equal(1)
				})
				it('lvoParser and objectOptions should return 2 for select value two', () => {
					expect(getModelValueFromSelectOption('two', objectOptions, lvoParser)).to.equal(2)
				})
				it('loParser and objectOptions should return first object option for select value one', () => {
					expect(getModelValueFromSelectOption('one', objectOptions, loParser)).to.equal(objectOptions[0])
				})
				it('loParser and objectOptions should return second object option for select value two', () => {
					expect(getModelValueFromSelectOption('two', objectOptions, loParser)).to.equal(objectOptions[1])
				})
				it('voParser and stringOptions should return one for select value one', () => {
					expect(getModelValueFromSelectOption('one', stringOptions, voParser)).to.equal('one')
				})
				it('voParser and stringOptions should return two for select value two', () => {
					expect(getModelValueFromSelectOption('two', stringOptions, voParser)).to.equal('two')
				})
			})
		})
	})

})
