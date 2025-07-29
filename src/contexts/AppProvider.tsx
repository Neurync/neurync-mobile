import type { IUserPayload } from '@/interfaces/IUserPayload';
import { userStorage } from '@/storage/user-storage';
import { type ReactNode, useEffect, useState } from 'react';
import { AppContext } from './AppContext';

export function AppProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<IUserPayload | null>(null);

	async function loadUser() {
		const previousUser = await userStorage.get();
		setUser(previousUser);
	}

	loadUser();

	return (
		<AppContext.Provider value={{ user, setUser }}>
			{children}
		</AppContext.Provider>
	);
}
