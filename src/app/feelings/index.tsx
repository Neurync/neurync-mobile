import { AlertButton } from '@/components/alert-button';
import { NonverbalButton } from '@/components/nonverbal-button';
import { NonverbalHeader } from '@/components/nonverbal-header';
import { colors } from '@/constants/colors';
import { screenStyle } from '@/constants/screen-style';
import { useRouter } from 'expo-router';
import { Undo2 } from 'lucide-react-native';
import {
	ScrollView,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';
import { nonverbalButtonData } from './data';

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
			<AlertButton style={{ bottom: '10%' }} />
			<NonverbalHeader />

			<View style={{ width: '100%', paddingTop: 10 }}>
				<Text style={screenStyle.title}>Eu me sinto...</Text>

				<ScrollView
					contentContainerStyle={{
						paddingTop: 5,
						width: '100%',
						display: 'flex',
						flexWrap: 'wrap',
						flexDirection: 'row',
						justifyContent: 'space-evenly',
						alignItems: 'flex-start',
						overflowY: 'scroll',
					}}
					style={{ maxHeight: '85%' }}
				>
					{nonverbalButtonData.map(({ emoji, description, isFavorited }) => (
						<NonverbalButton
							key={emoji}
							emoji={emoji}
							description={description}
							isFavorited={isFavorited}
						/>
					))}
				</ScrollView>
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
