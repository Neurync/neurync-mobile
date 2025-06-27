import { AlertButton } from '@/components/alert-button';
import { ButtonIcon } from '@/components/button-icon';
import { Logo } from '@/components/logo';
import { useRouter } from 'expo-router';
import { Text, View } from 'react-native';
import { screenStyle } from '../../../constants/screen-style';

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
					onPress={() => {
						router.push('/feelings');
					}}
					icon="heart"
					text={'Sentimentos'}
				/>
				<ButtonIcon
					onPress={() => {
						router.push('/problems');
					}}
					icon="slash"
					text={'Problemas e\nNecessidades'}
				/>
				<ButtonIcon
					onPress={() => {
						router.push('/favorited');
					}}
					icon="star"
					text={'Favoritos'}
				/>
			</View>
			<AlertButton />
		</View>
	);
}
