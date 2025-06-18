import { AlertButton } from '@/components/alert-button';
import { ButtonIcon } from '@/components/button-icon';
import { Logo } from '@/components/logo';
import { MessageModal } from '@/components/modals/message-modal';
import { SuccessModal } from '@/components/modals/success-modal';
import { useRouter } from 'expo-router';
import { useContext, useEffect, useState } from 'react';
import { View } from 'react-native';
import { screenStyle } from '../../../constants/screen-style';
import { AppContext } from '@/contexts/AppContext';

export default function Home() {
	const router = useRouter();
	const { user } = useContext(AppContext);
	const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
	const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
	useEffect(() => {
		if (!user && router.canGoBack()) router.push('/login');
	}, [user, router]);

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
				firstActionButtonPress={() => {
					setIsMessageModalOpen(false);
					setIsSuccessModalOpen(true);
				}}
				secondActionButtonPress={() => {
					setIsMessageModalOpen(false);
					setIsSuccessModalOpen(true);
				}}
				setIsVisible={setIsMessageModalOpen}
			/>
			<SuccessModal
				isVisible={isSuccessModalOpen}
				setIsVisible={setIsSuccessModalOpen}
			/>

			<AlertButton onPress={() => {}} />
		</View>
	);
}
