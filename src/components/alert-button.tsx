import { colors } from '@/constants/colors';
import { useState } from 'react';
import {
	Image,
	StyleSheet,
	Text,
	TouchableOpacity,
	type TouchableOpacityProps,
	type ViewStyle,
} from 'react-native';
import { MessageModal } from './modals/message-modal';
import { DefaultModal as SuccessModal } from './modals/default-modal';

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
	const [isMessageModalVisible, setIsMessageModalVisible] = useState(false);
	const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);

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

	return (
		<>
			<MessageModal
				isVisible={isMessageModalVisible}
				setIsVisible={setIsMessageModalVisible}
				firstActionButtonPress={actionMessageModalButton}
				secondActionButtonPress={actionMessageModalButton}
			/>

			<SuccessModal
				icon="check-circle"
				firstText="Mensagem enviada"
				secondText="Por favor, aguarde a resposta de seu professor."
				isVisible={isSuccessModalVisible}
				setIsVisible={setIsSuccessModalVisible}
				firstButtonText="Ok"
				firstButtonPress={() => setIsSuccessModalVisible(false)}
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
