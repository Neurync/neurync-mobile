import type { IUserPayload } from '@/interfaces/IUserPayload';
import { createContext } from 'react';

interface IAppContext {
	user: IUserPayload | null;
	setUser: (user: IUserPayload | null) => void;
}

export const AppContext = createContext<IAppContext>({} as IAppContext);
