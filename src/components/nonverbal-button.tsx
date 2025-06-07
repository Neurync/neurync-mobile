import { colors } from '@/constants/colors';
import { Image, Text, TouchableOpacity, View } from 'react-native';

export function NonverbalButton() {
	return (
		<View
			style={{
				backgroundColor: colors.seaGreen,
				width: 140,
				height: 150,
				alignItems: 'center',
				marginTop: 12,
				paddingTop: 5,
				borderRadius: 8,
			}}
		>
			<View
				style={{
					width: '90%',
					backgroundColor: colors.lightSeaGreen,
					borderRadius: 8,
					paddingBottom: 5,
				}}
			>
				<Text style={{ fontSize: 65, textAlign: 'center', marginBottom: -8 }}>
					😀
				</Text>
				<View style={{ width: '100%' }}>
					<TouchableOpacity style={{ alignItems: 'flex-end', paddingRight: 5 }}>
						<Image source={require('@/assets/images/star.png')} />
					</TouchableOpacity>
				</View>
			</View>
			<Text
				style={{
					marginTop: 3,
					fontSize: 20,
					textTransform: 'uppercase',
					width: '100%',
					textAlign: 'center',
					fontWeight: 500,
				}}
			>
				Descrição
			</Text>
		</View>
	);
}
