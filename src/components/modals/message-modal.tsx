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
import { useContext, useState } from 'react';
import { AppContext } from '@/contexts/AppContext';
import { ESP32_IP } from '@/env';
import { router } from 'expo-router';

interface MessageModalProps {
	isVisible: boolean;
	isLoading: boolean;
	firstActionButtonPress: () => void;
	secondActionButtonPress: () => void;
	setIsVisible: (visible: boolean) => void;
}

export function MessageModal({
	isVisible,
	setIsVisible,
	isLoading,
	firstActionButtonPress,
	secondActionButtonPress,
}: MessageModalProps) {
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
									onPress={firstActionButtonPress}
									style={styles.actionButton}
								>
									<Feather name="log-out" size={50} color={colors.black} />
									<Text style={styles.buttonText}>Preciso sair</Text>
								</TouchableOpacity>

								<TouchableOpacity
									onPress={secondActionButtonPress}
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
