import { AlertButton } from '@/components/alert-button';
import { ButtonIcon } from '@/components/button-icon';
import { Logo } from '@/components/logo';
import { AppContext } from '@/contexts/AppContext';
import { useRouter } from 'expo-router';
import { CircleSlash2, HeartCrack, Star } from 'lucide-react-native';
import { useContext, useEffect } from 'react';
import { Text, View } from 'react-native';
import { screenStyle } from '../../../constants/screen-style';

export default function NonverbalConversation() {
	const router = useRouter();

	const { setCurrentScreen } = useContext(AppContext);

	useEffect(() => {
		setCurrentScreen('nonverbal-conversation/index');
	}, [setCurrentScreen]);

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
					onPress={() => {
						router.push('/feelings');
					}}
					icon={HeartCrack}
					text={'Sentimentos'}
				/>
				<ButtonIcon
					onPress={() => {
						router.push('/problems');
					}}
					icon={CircleSlash2}
					text={'Problemas e\nNecessidades'}
				/>
				<ButtonIcon
					onPress={() => {
						router.push('/favorited');
					}}
					icon={Star}
					text={'Favoritos'}
				/>
			</View>
			<AlertButton />{' '}
		</View>
	);
}
