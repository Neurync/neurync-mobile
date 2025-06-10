import { AlertButton } from '@/components/alert-button';
import { ButtonIcon } from '@/components/button-icon';
import { Logo } from '@/components/logo';
import { MessageModal } from '@/components/modals/message-modal';
import { SuccessModal } from '@/components/modals/success-modal';
import { useRouter } from 'expo-router';
import { TriangleAlert, User, Volume2 } from 'lucide-react-native';
import { useState } from 'react';
import { View } from 'react-native';
import { screenStyle } from '../../../constants/screen-style';

export default function Home() {
	const router = useRouter();

	const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
	const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

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
					icon={Volume2}
					text={'Comunicação\n não verbal'}
					onPress={() => router.push('/nonverbal-conversation')}
				/>
				<ButtonIcon
					icon={TriangleAlert}
					text={'Enviar aviso ao\n professor'}
					onPress={() => setIsMessageModalOpen(true)}
				/>
				<ButtonIcon
					icon={User}
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
