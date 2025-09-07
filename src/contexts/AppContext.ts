import type { IUserPayload } from '@/interfaces/IUserPayload';
import { createContext } from 'react';
import type { GetUserById200DangersItem } from '@/services/api/schemas';
import type { GetUserById200HelpsItem } from '@/services/api/schemas';

interface IAppContext {
	user: IUserPayload | null;
	setUser: (user: IUserPayload | null) => void;

	helps: GetUserById200HelpsItem[];
	setHelps: (helps: GetUserById200HelpsItem[]) => void;

	dangers: GetUserById200DangersItem[];
	setDangers: (dangers: GetUserById200HelpsItem[]) => void;
}

export const AppContext = createContext<IAppContext>({} as IAppContext);
