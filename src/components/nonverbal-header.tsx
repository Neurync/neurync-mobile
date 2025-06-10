import { colors } from '@/constants/colors';
import { router } from 'expo-router';
import { Undo2 } from 'lucide-react-native';
import { TextInput, TouchableOpacity, View } from 'react-native';

export function NonverbalHeader() {
	return (
		<View
			style={{
				width: '100%',
				height: '12%',
				backgroundColor: colors.seaGreen,
				paddingLeft: 5,
				paddingRight: 5,
				paddingTop: 20,
				flexDirection: 'row',
				alignItems: 'center',
				justifyContent: 'space-around',
			}}
		>
			<TouchableOpacity
				onPress={() => router.push('/(tabs)/nonverbal-conversation')}
			>
				<Undo2 color={colors.white} size={25} />
			</TouchableOpacity>
			<TextInput
				style={{
					backgroundColor: colors.lightGray,
					width: '85%',
					borderRadius: 25,
					fontWeight: 500,
					paddingLeft: 5,
					fontSize: 16,
				}}
				placeholder="Pesquisar..."
			/>
		</View>
	);
}
