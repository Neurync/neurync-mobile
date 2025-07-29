import { IUserPayload } from '@/interfaces/IUserPayload';
import { AppContext } from './AppContext';
import { type ReactNode, useState, useEffect } from 'react';
import { userStorage } from '@/storage/user-storage';

export function AppProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<IUserPayload | null>(null);

	async function loadUser() {
		const previousUser = await userStorage.get();
		setUser(previousUser);
	}

	useEffect(() => {
		loadUser();
	}, []);

	return (
		<AppContext.Provider value={{ user, setUser }}>
			{children}
		</AppContext.Provider>
	);
}
