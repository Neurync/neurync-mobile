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

interface MessageModalProps {
	isVisible: boolean;
	closeModal: () => void;
	icon?: keyof typeof Feather.glyphMap;
	firstText: string;
	secondText?: string;

	firstButtonText: string;
	firstButtonPress: () => void;
	secondButtonText?: string;
	secondActionButtonPress?: () => void;
}

export function DefaultModal({
	isVisible,
	closeModal,
	icon,
	firstText,
	secondText,
	firstButtonText,
	firstButtonPress,
	secondButtonText,
	secondActionButtonPress,
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

					<Feather name={icon} color={colors.seaGreen} size={50} />
					<Text style={styles.title}>{firstText}</Text>

					{secondText && (
						<Text style={{ textAlign: 'center', fontSize: 20 }}>{secondText}</Text>
					)}

					<View
						style={{
							flexDirection: 'row',
							justifyContent: 'center',
							alignItems: 'center',
							gap: 16,
							marginTop: 20,
						}}
					>
						<TouchableOpacity style={styles.backButton} onPress={firstButtonPress}>
							<Text style={styles.backButtonText}>{firstButtonText}</Text>
						</TouchableOpacity>

						{secondButtonText && (
							<TouchableOpacity
								style={styles.backButton}
								onPress={secondActionButtonPress}
							>
								<Text style={styles.backButtonText}>{secondButtonText}</Text>
							</TouchableOpacity>
						)}
					</View>
				</Pressable>
			</Pressable>
		</Modal>
	);
}
