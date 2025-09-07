import type { IUserPayload } from '@/interfaces/IUserPayload';
import { userStorage } from '@/storage/user-storage';
import { type ReactNode, useEffect, useState } from 'react';
import { AppContext } from './AppContext';
import type {
	GetUserById200DangersItem,
	GetUserById200HelpsItem,
} from '@/services/api/schemas';

export function AppProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<IUserPayload | null>(null);
	const [helps, setHelps] = useState<GetUserById200HelpsItem[]>([]);
	const [dangers, setDangers] = useState<GetUserById200DangersItem[]>([]);

	async function loadUser() {
		const previousUser = await userStorage.get();
		setUser(previousUser);
	}

	loadUser();

	return (
		<AppContext.Provider
			value={{ user, setUser, helps, setHelps, dangers, setDangers }}
		>
			{children}
		</AppContext.Provider>
	);
}
