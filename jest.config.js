module.exports = {
	moduleNameMapper: {
		'^renderer/(.*)$': '<rootDir>/src/renderer/$1',
		'^main/(.*)$': '<rootDir>/src/main/$1',
	},
	transform: {
		'^.+\\.[t|j]sx?$': 'babel-jest',
		// '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2|svg)$': 'jest-transform-stub',
	},
	transformIgnorePatterns: [
		'node_modules/(?!(stringify-entities|character-entities-legacy|character-entities-html4)/)',
	],
	testEnvironment: 'jest-environment-jsdom',
}
