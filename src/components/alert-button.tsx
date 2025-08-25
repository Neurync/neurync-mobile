import { colors } from '@/constants/colors';
import { useContext, useState } from 'react';
import {
	Alert,
	Image,
	StyleSheet,
	Text,
	TouchableOpacity,
	type TouchableOpacityProps,
	type ViewStyle,
} from 'react-native';
import { MessageModal } from './modals/message-modal';
import { DefaultModal as SuccessModal } from './modals/default-modal';
import { router } from 'expo-router';
import { AppContext } from '@/contexts/AppContext';
import { ESP32_IP } from '@/env';
import type { Feather } from '@expo/vector-icons';

const styles = StyleSheet.create({
	container: {
		width: 100,
		height: 100,
		backgroundColor: colors.red,
		position: 'absolute',
		bottom: 0,
		right: 0,
		borderWidth: 2,
		borderColor: colors.darkRed,
		borderBottomWidth: 5,
		borderRadius: 10,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: 20,
		marginRight: 20,
		zIndex: 1,
	},
	text: {
		color: colors.white,
		textTransform: 'uppercase',
		fontWeight: '500',
		fontSize: 20,
		textAlign: 'center',
		textShadowColor: colors.darkRed,
	},
});

interface AlertButtonProps extends TouchableOpacityProps {
	style?: ViewStyle;
}

export function AlertButton({ style }: AlertButtonProps) {
	const { user } = useContext(AppContext);

	if (!user) return router.navigate('/login');

	const [isLoading, setIsLoading] = useState(false);
	const [teacherAnswer, setTeacherAnswer] = useState('');

	const [isMessageModalVisible, setIsMessageModalVisible] = useState(false);
	const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
	const [successModalIcon, setSuccessModalIcon] =
		useState<keyof typeof Feather.glyphMap>('check-circle');
	const [successModalFirstText, setSuccessModalFirstText] = useState('');
	const [successModalSecondText, setSuccessModalSecondText] = useState('');

	function openMessageModal() {
		setIsMessageModalVisible(true);
	}

	function closeMessageModal() {
		setIsMessageModalVisible(false);
	}

	function openSuccessModal() {
		setIsSuccessModalVisible(true);
	}

	function closeSuccessModal() {
		setIsSuccessModalVisible(false);
	}

	function actionMessageModalButton() {
		closeMessageModal();
		openSuccessModal();
	}

	async function firstModalMessageButton() {
		await sendAlert('Posso sair?');
		actionMessageModalButton();
	}

	async function secondModalMessageButton() {
		await sendAlert('Pode me ajudar?');
		actionMessageModalButton();
	}

	async function sendAlert(message: string) {
		setIsLoading(true);
		setTeacherAnswer('');

		if (!user) return router.navigate('/login');

		try {
			await fetch(`http://${ESP32_IP}/question`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
				body: `username=${encodeURIComponent(
					user.name
				)}&message=${encodeURIComponent(message)}`,
			});

			const answer = await pollAnswer();

			if (answer === 'yes') {
				setSuccessModalIcon('check-circle');
				setSuccessModalFirstText('Aprovado');
				setSuccessModalSecondText(`O professor aprovou seu alerta '${message}'`);
			} else {
				setSuccessModalIcon('x-circle');
				setSuccessModalFirstText('Negado');
				setSuccessModalSecondText(`O professor negou seu alerta '${message}'`);
			}

			setTeacherAnswer(answer);
			setIsLoading(false);
			openSuccessModal();
		} catch (error) {
			console.error(error);
			setIsLoading(false);
			Alert.alert(
				'Ocorreu um erro',
				'Ocorreu um erro ao mandar o alerta. Verifique a conexão e tente novamente.'
			);
		}
	}

	function pollAnswer(): Promise<string> {
		const ONE_SECOND = 1000;

		return new Promise((resolve, reject) => {
			const interval = setInterval(async () => {
				try {
					const response = await fetch(`http://${ESP32_IP}/answer`);
					const answer = await response.text();

					if (answer === 'yes' || answer === 'no') {
						clearInterval(interval);
						resolve(answer);
					}
				} catch (error) {
					clearInterval(interval);
					reject(error);
				}
			}, ONE_SECOND * 2);
		});
	}

	return (
		<>
			<MessageModal
				isVisible={isMessageModalVisible}
				isLoading={isLoading}
				setIsVisible={setIsMessageModalVisible}
				firstActionButtonPress={firstModalMessageButton}
				secondActionButtonPress={secondModalMessageButton}
			/>

			<SuccessModal
				icon={successModalIcon}
				firstText={successModalFirstText}
				secondText={successModalSecondText}
				isVisible={isSuccessModalVisible}
				closeModal={closeSuccessModal}
				firstButtonText="Ok"
				firstButtonPress={closeSuccessModal}
			/>

			<TouchableOpacity
				onPress={openMessageModal}
				style={[styles.container, style]}
			>
				<Image
					style={{ height: 70, width: 70 }}
					source={require('@/assets/images/triangle-alert.png')}
				/>
				<Text style={styles.text}>Alerta</Text>
			</TouchableOpacity>
		</>
	);
}
