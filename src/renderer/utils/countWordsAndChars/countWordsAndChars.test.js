import countWordsAndChars from './countWordsAndChars'

describe('countWordsAndChars', () => {
	test('input empty string', () => {
		expect(countWordsAndChars(' ')).toBe('0 words, 0 chars')
	})
	test('just count words and chars', () => {
		expect(countWordsAndChars('Hello world')).toBe('2 words, 11 chars')
	})
	test('count words and chars with line break', () => {
		expect(countWordsAndChars('Hello\nworld')).toBe('1 words, 10 chars')
	})
	test('count words and chars with some special chars', () => {
		expect(countWordsAndChars('Hello, world!')).toBe('2 words, 13 chars')
	})
})
