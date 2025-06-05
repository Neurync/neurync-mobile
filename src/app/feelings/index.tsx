import { colors } from '@/constants/colors';
import { Text, View, TouchableOpacity, TextInput } from 'react-native';
import { Undo2 } from 'lucide-react-native';
import { screenStyle } from '@/constants/screen-style';

export default function Feelings() {
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
				<TouchableOpacity onPress={() => console.log('foda-se')}>
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

				{/* TODO: Fazer listagem de botões de sentimentos */}
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
