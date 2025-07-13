import { IUserPayload } from '@/interfaces/IUserPayload';
import { AppContext } from './AppContext';
import { type ReactNode, useState, useContext } from 'react';

export function AppProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<IUserPayload | null>(null);

	return (
		<AppContext.Provider value={{ user, setUser }}>
			{children}
		</AppContext.Provider>
	);
}
