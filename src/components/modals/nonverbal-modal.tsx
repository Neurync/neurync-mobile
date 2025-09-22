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

interface MessageModalProps {
	isVisible: boolean;
	closeModal: () => void;
	emoji: string;
	subtitle: string;
	buttonText: string;
	buttonPress: () => void;
}

export function NonverbalModal({
	isVisible,
	closeModal,
	emoji,
	subtitle,
	buttonText,
	buttonPress,
}: MessageModalProps) {
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
					<TouchableOpacity style={{ position: 'absolute', top: 10, right: 10 }}>
						<Feather
							name="x-circle"
							size={30}
							color={colors.seaGreen}
							onPress={closeModal}
						/>
					</TouchableOpacity>

					<Text style={styles.title}>{emoji}</Text>
					<Text style={styles.subtitle}>{subtitle}</Text>

					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'center',
							alignItems: 'center',
							gap: 16,
							marginTop: 20,
						}}
					>
						<TouchableOpacity style={styles.backButton} onPress={buttonPress}>
							<Text style={styles.backButtonText}>{buttonText}</Text>
						</TouchableOpacity>
					</View>
				</Pressable>
			</Pressable>
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
		minHeight: '50%',
		height: 'auto',
		maxHeight: '60%',
		width: '90%',
		borderWidth: 2,
		borderColor: colors.seaGreen,
	},
	title: {
		fontSize: 125,
		fontWeight: 500,
		marginBottom: 24,
		textAlign: 'center',
		textTransform: 'uppercase',
		width: '100%',
		marginTop: 5,
	},
	subtitle: {
		fontSize: 35,
		fontWeight: 500,
		marginBottom: 10,
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
		position: 'absolute',
		top: 0,
	},
	backButtonText: {
		textTransform: 'uppercase',
		color: colors.black,
		fontWeight: '500',
		fontSize: 20,
		textAlign: 'center',
	},
});
