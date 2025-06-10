import { createContext, useState } from 'react';

interface IAppContext {
	currentScreen: string | null;
	setCurrentScreen: (screen: string | null) => void;

	user: string | null;
	setUser: (user: string | null) => void;
}

export const AppContext = createContext<IAppContext>({} as IAppContext);
