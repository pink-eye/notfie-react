import filterCardArray from './index'

describe('filterCardArray', () => {
	test('word array contains', () => {
		expect(
			filterCardArray(
				[
					{
						title: 'Hello world',
						description: '',
						id: 'ca8ee392-763e-4a80-a1b4-76f771bf472e',
						birth: 1645796521552,
					},
					{
						title: 'wow great',
						description: '',
						id: 'ca8ee392-763e-4a80-a1b4-76f771bf472e',
						birth: 1645796521552,
					},
				],
				'great'
			)
		).toEqual([
			{
				title: 'wow great',
				description: '',
				id: 'ca8ee392-763e-4a80-a1b4-76f771bf472e',
				birth: 1645796521552,
			},
		])
	})
	test('word array does not contain', () => {
		expect(
			filterCardArray(
				[
					{
						title: 'Hello world',
						description: '',
						id: 'ca8ee392-763e-4a80-a1b4-76f771bf472e',
						birth: 1645796521552,
					},
					{
						title: 'wow great',
						description: '',
						id: 'ca8ee392-763e-4a80-a1b4-76f771bf472e',
						birth: 1645796521552,
					},
				],
				'awesome'
			)
		).toEqual([])
	})

	test('input empty array', () => {
		expect(filterCardArray([], 'awesome')).toEqual([])
	})
})
