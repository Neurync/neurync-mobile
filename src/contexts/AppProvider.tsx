import { AppContext } from './AppContext';
import { type ReactNode, useState, useContext } from 'react';

export function AppProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<string | null>(null);
	const [currentScreen, setCurrentScreen] = useState<string | null>(null);

	return (
		<AppContext.Provider
			value={{ user, setUser, currentScreen, setCurrentScreen }}
		>
			{children}
		</AppContext.Provider>
	);
}
