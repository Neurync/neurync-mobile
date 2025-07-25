import { colors } from '@/constants/colors';
import { Feather } from '@expo/vector-icons';
import {
	Modal,
	Pressable,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import * as Clipboard from 'expo-clipboard';
import { useState } from 'react';
import { fontSize } from '@/constants/fontSize';

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
		height: '50%',
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
		width: 'auto', // ou 140, ou 48%, etc
		minWidth: 120,
		shadowColor: colors.black,
		shadowOpacity: 0.2,
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 3,
		elevation: 3,
		alignItems: 'center',
	},
	backButtonText: {
		textTransform: 'uppercase',
		color: colors.black,
		fontWeight: '500',
		fontSize: 20,
		textAlign: 'center',
	},
});

interface QrCodeModalProps {
	isVisible: boolean;
	closeModal: () => void;
	qrCode: string;
}

export function QrCodeModal({
	isVisible,
	closeModal,
	qrCode,
}: QrCodeModalProps) {
	const [isCopied, setIsCopied] = useState(false);

	async function copyToClipboard() {
		await Clipboard.setStringAsync(qrCode);
		setIsCopied(true);
	}

	return (
		<Modal
			animationType="fade"
			transparent
			visible={isVisible}
			onRequestClose={closeModal}
			onPointerLeave={closeModal}
		>
			<Pressable style={styles.backdrop} onPress={closeModal}>
				<Pressable style={styles.modalContainer} onPress={() => {}}>
					<TouchableOpacity
						style={{ position: 'absolute', top: 10, right: 10 }}
						onPress={() => {
							setIsCopied(false);
							closeModal();
						}}
					>
						<Feather name="x-circle" size={30} color={colors.seaGreen} />
					</TouchableOpacity>

					<View
						style={{
							flexDirection: 'column',
							justifyContent: 'center',
							alignItems: 'center',
							gap: 16,
							marginTop: 20,
						}}
					>
						<QRCode value={qrCode} size={200} />
						<TouchableOpacity style={styles.backButton} onPress={copyToClipboard}>
							<Text style={styles.backButtonText}>Copiar link</Text>
						</TouchableOpacity>
						{isCopied && (
							<Text
								style={{ fontSize: fontSize.lg, fontWeight: 600, color: colors.gray }}
							>
								<Feather name="check" size={15} /> Link copiado!
							</Text>
						)}
					</View>
				</Pressable>
			</Pressable>
		</Modal>
	);
}
