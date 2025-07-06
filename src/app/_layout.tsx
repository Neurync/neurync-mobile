import { colors } from '@/constants/colors';
import { AppProvider } from '@/contexts/AppProvider';
import { Slot } from 'expo-router';
import * as SystemUI from 'expo-system-ui';
import { useEffect } from 'react';

function Root() {
	return <Slot />;
}

export default function App() {
	useEffect(() => {
		SystemUI.setBackgroundColorAsync(colors.seaGreen);
	}, []);

	return (
		<AppProvider>
			<Root />
		</AppProvider>
	);
}
