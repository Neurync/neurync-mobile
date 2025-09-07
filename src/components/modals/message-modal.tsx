import { colors } from '@/constants/colors';
import { Feather } from '@expo/vector-icons';
import {
	ActivityIndicator,
	Alert,
	Modal,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { DefaultModal as SuccessModal } from './default-modal';
import { useState } from 'react';
import type { IUserPayload } from '@/interfaces/IUserPayload';
import { ESP32_IP } from '@/env';

interface MessageModalProps {
	isVisible: boolean;
	isLoading: boolean;
	setIsVisible: (visible: boolean) => void;
	setIsLoading: (isLoading: boolean) => void;

	user: IUserPayload;
}

export function MessageModal({
	isVisible,
	setIsVisible,
	isLoading,
	setIsLoading,
	user,
}: MessageModalProps) {
	const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
	const [successModalIcon, setSuccessModalIcon] =
		useState<keyof typeof Feather.glyphMap>('check-circle');
	const [successModalFirstText, setSuccessModalFirstText] = useState('');
	const [successModalSecondText, setSuccessModalSecondText] = useState('');
	const [teacherAnswer, setTeacherAnswer] = useState('');

	function openSuccessModal() {
		setIsSuccessModalVisible(true);
	}

	function closeSuccessModal() {
		setIsSuccessModalVisible(false);
	}

	function actionMessageModalButton() {
		setIsVisible(false);
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
		<Modal
			animationType="fade"
			transparent
			visible={isVisible}
			onRequestClose={() => setIsVisible(false)}
		>
			<View style={styles.backdrop}>
				<View style={styles.modalContainer}>
					{!isLoading ? (
						<>
							<Text style={styles.title}>Qual é o problema?</Text>

							<View style={{ gap: 20 }}>
								<TouchableOpacity
									onPress={() => sendAlert('Posso sair?')}
									style={styles.actionButton}
								>
									<Feather name="log-out" size={50} color={colors.black} />
									<Text style={styles.buttonText}>Preciso sair</Text>
								</TouchableOpacity>

								<TouchableOpacity
									onPress={() => sendAlert('Posso sair?')}
									style={styles.actionButton}
								>
									<Feather name="help-circle" size={50} color={colors.black} />
									<Text style={styles.buttonText}>Preciso de {'\n'} ajuda</Text>
								</TouchableOpacity>
							</View>
							<TouchableOpacity
								style={styles.backButton}
								onPress={() => setIsVisible(false)}
							>
								<Text style={styles.backButtonText}>Voltar</Text>
							</TouchableOpacity>
						</>
					) : (
						<>
							<Text style={styles.title}>Aguardando a resposta...</Text>

							<ActivityIndicator size={30} color={colors.seaGreen} />
						</>
					)}
				</View>
			</View>

			<SuccessModal
				icon={successModalIcon}
				firstText={successModalFirstText}
				secondText={successModalSecondText}
				isVisible={isSuccessModalVisible}
				closeModal={closeSuccessModal}
				firstButtonText="Ok"
				firstButtonPress={closeSuccessModal}
			/>
		</Modal>
	);
}

const styles = StyleSheet.create({
	backdrop: {
		flex: 1,
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		justifyContent: 'center',
		alignItems: 'center',
	},
	modalContainer: {
		backgroundColor: colors.white,
		borderRadius: 16,
		paddingVertical: 32,
		paddingHorizontal: 24,
		alignItems: 'center',
		height: '70%',
		width: '90%',
		borderWidth: 2,
		borderColor: colors.seaGreen,
	},
	title: {
		fontSize: 28,
		fontWeight: 500,
		marginBottom: 24,
		textAlign: 'center',
		textTransform: 'uppercase',
		width: '100%',
	},
	actionButton: {
		width: 260,
		height: 80,
		backgroundColor: colors.gold,
		borderRadius: 15,
		paddingHorizontal: 10,
		paddingVertical: 5,
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		gap: 3,
		borderColor: colors.darkGold,
		borderRightWidth: 3,
		borderBottomWidth: 3,
		shadowColor: '#000',
		shadowOffset: {
			width: 2,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
	buttonText: {
		textTransform: 'uppercase',
		color: colors.black,
		fontWeight: '500',
		fontSize: 20,
		textAlign: 'center',
		width: '80%',
	},
	backButton: {
		backgroundColor: colors.lightSeaGreen,
		borderWidth: 2,
		borderColor: colors.seaGreen,
		borderRadius: 12,
		paddingVertical: 12,
		paddingHorizontal: 24,
		marginTop: 8,
		width: '60%',
		shadowColor: colors.black,
		shadowOpacity: 0.2,
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 3,
		elevation: 3,
		position: 'absolute',
		bottom: 20,
	},
	backButtonText: {
		textTransform: 'uppercase',
		color: colors.black,
		fontWeight: '500',
		fontSize: 20,
		textAlign: 'center',
	},
});
