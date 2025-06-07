import { NonverbalButton } from '@/components/nonverbal-button';
import { colors } from '@/constants/colors';
import { screenStyle } from '@/constants/screen-style';
import { useRouter } from 'expo-router';
import { Undo2 } from 'lucide-react-native';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function Feelings() {
	const router = useRouter();

	return (
		<View
			style={{
				backgroundColor: colors.white,
				height: '100%',
				width: '100%',
				...screenStyle,
			}}
		>
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
				<TouchableOpacity onPress={() => router.back()}>
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

			<View style={{ width: '100%', paddingTop: 10 }}>
				<Text style={screenStyle.title}>Eu me sinto...</Text>

				<View
					style={{
						paddingTop: 5,
						width: '100%',
						display: 'flex',
						flexWrap: 'wrap',
						flexDirection: 'row',
						justifyContent: 'space-evenly',
						alignItems: 'flex-start',
					}}
				>
					<NonverbalButton />
					<NonverbalButton />
					<NonverbalButton />
					<NonverbalButton />
					<NonverbalButton />
				</View>
			</View>

			<View
				style={{
					backgroundColor: colors.seaGreen,
					width: '100%',
					height: '5%',
					position: 'absolute',
					bottom: 0,
				}}
			/>
		</View>
	);
}
