import { colors } from '@/constants/colors';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { TouchableOpacity, View } from 'react-native';
import { Searchbar, type SearchbarProps } from './searchbar';

export function NonverbalHeader({ data, setData }: SearchbarProps) {
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
				<Feather name="corner-up-left" color={colors.white} size={25} />
			</TouchableOpacity>
			<Searchbar data={data} setData={setData} />
		</View>
	);
}
