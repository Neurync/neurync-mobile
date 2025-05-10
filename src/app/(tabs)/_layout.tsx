import { colors } from '@/constants/colors';
import { Tabs } from 'expo-router';
import { House, Keyboard, User } from 'lucide-react-native';

export default function TabLayout() {
	return (
		<Tabs
			screenOptions={{
				tabBarStyle: {
					backgroundColor: colors.seaGreen,
					height: 90,
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					paddingTop: 12,
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
					tabBarIcon: () => <Keyboard color={'white'} size={40} />,
				}}
			/>
			<Tabs.Screen
				name="home/index"
				options={{
					tabBarIcon: () => <House color={'white'} size={40} />,
				}}
			/>
			<Tabs.Screen
				name="user/index"
				options={{
					tabBarIcon: () => <User color={'white'} size={40} />,
				}}
			/>
		</Tabs>
	);
}
