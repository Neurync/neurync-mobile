import { AlertButton } from '@/components/alert-button';
import { ButtonIcon } from '@/components/button-icon';
import { CircleSlash2, HeartCrack, Star } from 'lucide-react-native';
import { Text, View } from 'react-native';
import { screenStyle } from '../screen-style';
import { Logo } from '@/components/logo';
import { useRouter } from 'expo-router';

export default function NonverbalConversation() {
	const router = useRouter();
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
				<ButtonIcon
					onPress={() => router.push('/feelings')}
					icon={HeartCrack}
					text={'Sentimentos'}
				/>
				<ButtonIcon icon={CircleSlash2} text={'Problemas e\nNecessidades'} />
				<ButtonIcon icon={Star} text={'Favoritos'} />
			</View>
			<AlertButton />{' '}
		</View>
	);
}
