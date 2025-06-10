import { colors } from '@/constants/colors';
import { AppProvider } from '@/contexts/AppProvider';
import { Redirect, Slot } from 'expo-router';
import * as SystemUI from 'expo-system-ui';
import { useEffect } from 'react';

function Root() {
	const isAuthenticated = true; // Somente para testes

	if (!isAuthenticated) return <Redirect href={'/login'} />;

	return <Slot />;
}

export default function App() {
	useEffect(() => {
		SystemUI.setBackgroundColorAsync(colors.seaGreen);
	}, []);

	// TODO adicionar um AuthProvider
	return (
		<AppProvider>
			<Root />
		</AppProvider>
	);
}
