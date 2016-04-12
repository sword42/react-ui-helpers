
import { validateEmail, validateRequired } from './Validators'
import chai from 'chai'
const expect = chai.expect


describe('Validators',() => {

	describe('#validateEmail()', () => {
		it('should return null for valid email', () => {
			expect(validateEmail('test@test.com')).to.be.null
			expect(validateEmail('1234abcd@cawer.ca')).to.be.null
		})
		it('should return error for invalid email', () => {
			expect(validateEmail('te@st@tes@t.com')).to.exist
			expect(validateEmail(1234)).to.exist
			expect(validateEmail('1')).to.exist
			expect(validateEmail('123@')).to.exist
			expect(validateEmail('@123')).to.exist
			expect(validateEmail('@123.com')).to.exist
		})
	})
	describe('#validateRequired()', () => {
		it('should return null for valid value', () => {
			expect(validateRequired('test@test.com')).to.be.null
			expect(validateRequired('1234abcd@cawer.ca')).to.be.null
		})
		it('should return error for invalid value', () => {
			expect(validateRequired(null)).to.exist
			expect(validateRequired(NaN)).to.exist
			expect(validateRequired('')).to.exist
		})
	})

})