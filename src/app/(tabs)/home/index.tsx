import { AlertButton } from '@/components/alert-button';
import { ButtonIcon } from '@/components/button-icon';
import { Logo } from '@/components/logo';
import { DefaultModal as SuccessModal } from '@/components/modals/default-modal';
import { MessageModal } from '@/components/modals/message-modal';
import { useRouter } from 'expo-router';
import { useContext, useState } from 'react';
import { View } from 'react-native';
import { screenStyle } from '../../../constants/screen-style';
import { AppContext } from '@/contexts/AppContext';

export default function Home() {
	const router = useRouter();
	const { user } = useContext(AppContext);

	if (!user) return router.navigate('/login');

	const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
	const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	return (
		<View style={screenStyle.container}>
			<Logo />
			<View
				style={{
					marginTop: 15,
					gap: 15,
				}}
			>
				<ButtonIcon
					icon="volume-2"
					text={'Comunicação\n não verbal'}
					onPress={() => router.push('/nonverbal-conversation')}
				/>
				<ButtonIcon
					icon="alert-triangle"
					text={'Enviar aviso ao\n professor'}
					onPress={() => setIsMessageModalOpen(true)}
				/>
				<ButtonIcon
					icon="user"
					text={'Perfil'}
					onPress={() => router.push('/user')}
				/>
			</View>

			<MessageModal
				isVisible={isMessageModalOpen}
				isLoading={isLoading}
				setIsLoading={setIsLoading}
				setIsVisible={setIsMessageModalOpen}
				user={user}
			/>

			<SuccessModal
				icon="check-circle"
				firstText="Mensagem enviada"
				secondText="Por favor, aguarde a resposta de seu professor."
				isVisible={isSuccessModalOpen}
				closeModal={() => setIsSuccessModalOpen(false)}
				firstButtonText="Ok"
				firstButtonPress={() => setIsSuccessModalOpen(false)}
			/>

			<AlertButton />
		</View>
	);
}
