import { ReactElement, ReactNode } from 'react'

export interface ICard {
	id: string
	title: string | null
	description: string | null
	birth: number
}

export interface KeyboardEvent {
	keyCode: number
	shiftKey: boolean
	ctrlKey: boolean
	preventDefault: () => void
}

interface ITabOptions {
	icon?: {
		width: string
		height: string
	}
}

export type ITab = [string, ReactNode | ReactElement, ITabOptions?]

export interface ITabState {
	tabArray: ITab[]
	activeTab: ITab
}

export interface ISettings {
	theme: string
	disableTransition: boolean
	launchAppWhenSystemStarts: boolean
	launchMinimized: boolean
}

export interface IStorage {
	cardArray: ICard[]
	settings: ISettings
	[index: string]: any
}
