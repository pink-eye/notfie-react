class AppStorage {
	KEY_ARRAY = ['cardArray', 'settings']

	set(key, value) {
		const jsonValue = JSON.stringify(value)
		localStorage.setItem(key, jsonValue)
	}

	get(key = null, callback = null) {
		if (key && !callback) return JSON.parse(localStorage.getItem(key))

		const storageFromLS = this.#getFromLocalStorage()

		if (storageFromLS) {
			callback(storageFromLS)
			return
		}

		this.#getFromFile(callback)
	}

	#getFromLocalStorage() {
		let storage = {}

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

	#getFromFile(callback) {
		API.readStorage().then(data => {
			let storage = {}

			if (!data) return

			Object.assign(storage, JSON.parse(data))

			callback(storage)

			this.KEY_ARRAY.forEach(key => storage[key] && this.set(key, storage[key]))
		})
	}

	update(key, value) {
		this.set(key, value)

		const storage = this.#getFromLocalStorage()
		storage && API.writeStorage(storage)
	}

	clearLocalStorage() {
		localStorage.clear()
	}
}

export default AppStorage
