declare module '*.scss' {
	const content: Styles
	export default content
}

declare module '*.svg' {
	const content: string
	export default content
}

declare namespace API {
	function readStorage(): Promise
	function writeStorage(data): void
	function toggleAutoLauncher(option: boolean): void
	function toggleMinimizedLaunch(option: boolean): void
}
