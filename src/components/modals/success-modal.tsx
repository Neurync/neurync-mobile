import { colors } from '@/constants/colors';
import { useState } from 'react';
import { Modal, Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import { CircleCheckBig } from 'lucide-react-native';

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
		height: '40%',
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
		marginTop: 5,
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
		width: '30%',
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

interface MessageModalProps {
	isVisible: boolean;
	setIsVisible: (visible: boolean) => void;
}

export function SuccessModal({ isVisible, setIsVisible }: MessageModalProps) {
	return (
		<Modal
			animationType="fade"
			transparent
			visible={isVisible}
			onRequestClose={() => setIsVisible(false)}
		>
			<View style={styles.backdrop}>
				<View style={styles.modalContainer}>
					<CircleCheckBig color={colors.seaGreen} size={50} />
					<Text style={styles.title}>Mensagem enviada</Text>
					<Text style={{ textAlign: 'center', fontSize: 20 }}>
						Por favor, aguarde a {'\n'}resposta de seu professor.
					</Text>
					<TouchableOpacity
						style={styles.backButton}
						onPress={() => setIsVisible(false)}
					>
						<Text style={styles.backButtonText}>Ok</Text>
					</TouchableOpacity>
				</View>
			</View>
		</Modal>
	);
}
