import { colors } from '@/constants/colors';
import { AppContext } from '@/contexts/AppContext';
import { AppProvider } from '@/contexts/AppProvider';
import { Slot, Redirect } from 'expo-router';
import * as SystemUI from 'expo-system-ui';
import { useContext, useEffect } from 'react';

function Root() {
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
