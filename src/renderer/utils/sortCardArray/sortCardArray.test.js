import sortCardArrayByType from './sortCardArray'

describe('sortCardArrayByType', () => {
	test('by Newest', () => {
		expect(
			sortCardArrayByType(
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
						birth: 1645796521555,
					},
				],
				'Newest'
			)
		).toEqual([
			{
				title: 'wow great',
				description: '',
				id: 'ca8ee392-763e-4a80-a1b4-76f771bf472e',
				birth: 1645796521555,
			},
			{
				title: 'Hello world',
				description: '',
				id: 'ca8ee392-763e-4a80-a1b4-76f771bf472e',
				birth: 1645796521552,
			},
		])
	})

	test('by Older', () => {
		expect(
			sortCardArrayByType(
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
						birth: 1645796521555,
					},
				],
				'Older'
			)
		).toEqual([
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
				birth: 1645796521555,
			},
		])
	})

	test('Max content length', () => {
		expect(
			sortCardArrayByType(
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
						birth: 1645796521555,
					},
				],
				'Max content length'
			)
		).toEqual([
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
				birth: 1645796521555,
			},
		])
	})

	test('Min content length', () => {
		expect(
			sortCardArrayByType(
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
						birth: 1645796521555,
					},
				],
				'Min content length'
			)
		).toEqual([
			{
				title: 'wow great',
				description: '',
				id: 'ca8ee392-763e-4a80-a1b4-76f771bf472e',
				birth: 1645796521555,
			},
			{
				title: 'Hello world',
				description: '',
				id: 'ca8ee392-763e-4a80-a1b4-76f771bf472e',
				birth: 1645796521552,
			},
		])
	})
})
