import { Slot, Redirect } from 'expo-router';

function Root() {
	const isAuthenticated = true; // Somente para testes

	if (!isAuthenticated) return <Redirect href={'/login'} />;

	return <Slot />;
}

export default function RootLayout() {
	// TODO adicionar um AuthProvider
	return <Root />;
}
