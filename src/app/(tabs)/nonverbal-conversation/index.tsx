import { AlertButton } from '@/components/alert-button';
import { ButtonIcon } from '@/components/button-icon';
import { CircleSlash2, HeartCrack, Star } from 'lucide-react-native';
import { Text, View } from 'react-native';
import { screenStyle } from '../screen-style';
import { colors } from '@/constants/colors';
import { Logo } from '@/components/logo';

export default function NonverbalConversation() {
	return (
		<View style={screenStyle.container}>
			<Logo />
			<Text style={screenStyle.title}>Selecione</Text>
			<View
				style={{
					marginTop: 15,
					gap: 15,
				}}
			>
				<ButtonIcon icon={HeartCrack} text={'Sentimentos'} />
				<ButtonIcon icon={CircleSlash2} text={'Problemas e\nNecessidades'} />
				<ButtonIcon icon={Star} text={'Favoritos'} />
			</View>
			<AlertButton />{' '}
		</View>
	);
}
