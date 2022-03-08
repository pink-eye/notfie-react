import { IStorage } from 'renderer/types'

class AppStorage {
	KEY_ARRAY = ['cardArray', 'settings']

	set(key: string, value: any) {
		const jsonValue = JSON.stringify(value)
		localStorage.setItem(key, jsonValue)
	}

	get(key: string, callback: (storage: IStorage) => void = null) {
		if (key && !callback) return JSON.parse(localStorage.getItem(key))

		const storageFromLS = this.#getFromLocalStorage()

		if (storageFromLS) {
			callback(storageFromLS)
			return
		}

		this.#getFromFile(callback)
	}

	#getFromLocalStorage(): IStorage {
		let storage: IStorage = {
			cardArray: [],
			settings: null,
		}

		this.KEY_ARRAY.forEach(key => {
			const value = JSON.parse(localStorage.getItem(key))

			if (value) storage[key] = value
			else {
				storage = undefined
				return
			}
		})

		return storage
	}

	#getFromFile(callback: (storage: IStorage) => void) {
		API.readStorage().then((data: any) => {
			if (!data) return

			let storage: IStorage = JSON.parse(data)

			callback(storage)

			this.KEY_ARRAY.forEach(key => storage[key] && this.set(key, storage[key]))
		})
	}

	update(key: string, value: any) {
		this.set(key, value)

		const storage = this.#getFromLocalStorage()
		storage && API.writeStorage(storage)
	}

	clearLocalStorage() {
		localStorage.clear()
	}
}

export default AppStorage
