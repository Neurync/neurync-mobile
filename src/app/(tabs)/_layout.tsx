import { colors } from '@/constants/colors';
import { AppContext } from '@/contexts/AppContext';
import { Feather } from '@expo/vector-icons';
import { Redirect, Tabs } from 'expo-router';
import { useContext } from 'react';

export default function TabLayout() {
	const { user } = useContext(AppContext);

	if (!user) return <Redirect href={'/login'} />;

	return (
		<Tabs
			initialRouteName={'home/index'}
			screenOptions={{
				tabBarStyle: {
					backgroundColor: colors.seaGreen,
					height: '13%',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					paddingTop: 12,
					paddingBottom: 24,
				},
				headerShown: false, // se quiser esconder o cabeçalho
				tabBarShowLabel: false,
				tabBarIconStyle: {
					marginTop: 10,
				},
			}}
		>
			<Tabs.Screen
				name="nonverbal-conversation/index"
				options={{
					tabBarIcon: () => <Feather name="mic-off" color={'white'} size={30} />,
				}}
			/>
			<Tabs.Screen
				name="home/index"
				options={{
					tabBarIcon: () => <Feather name="home" color={'white'} size={30} />,
				}}
			/>
			<Tabs.Screen
				name="user/index"
				options={{
					tabBarIcon: () => <Feather name="user" color={'white'} size={30} />,
				}}
			/>
		</Tabs>
	);
}
