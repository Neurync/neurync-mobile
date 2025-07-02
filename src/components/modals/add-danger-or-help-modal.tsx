import { colors } from '@/constants/colors';
import { Feather } from '@expo/vector-icons';
import { useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Toast, { BaseToast, BaseToastProps } from 'react-native-toast-message';
import { Button } from '../button';
import { Input } from '../input';
import { fontSize } from '@/constants/fontSize';

type AddDangerOrHelpModalProps = {
	type: 'danger' | 'help';
	isVisible: boolean;
	setIsVisible: (visible: boolean) => void;
	addData: (newData: string) => void;
};

const styles = StyleSheet.create({
	backdrop: {
		flex: 1,
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		justifyContent: 'center',
		alignItems: 'center',
		height: '40%',
	},
	modalContainer: {
		backgroundColor: colors.white,
		borderRadius: 16,
		paddingVertical: 32,
		paddingHorizontal: 24,
		alignItems: 'center',
		justifyContent: 'space-around',
		height: 'auto',
		width: '90%',
		borderWidth: 2,
		borderColor: colors.seaGreen,
		position: 'relative',
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

const toastConfig = {
	success: (props: BaseToastProps) => (
		<BaseToast
			{...props}
			style={{
				backgroundColor: colors.white,
				borderLeftColor: colors.lightSeaGreen,
			}}
			text1Style={{
				fontSize: fontSize.lg,
				fontWeight: 400,
			}}
		/>
	),
};

export function AddDangerOrHelpModal({
	type,
	isVisible,
	setIsVisible,
	addData,
}: AddDangerOrHelpModalProps) {
	const [newData, setNewData] = useState('');

	function submit() {
		if (!newData) return;

		addData(newData);
		setNewData('');
		Toast.show({
			text1: `${type === 'help' ? 'Conforto' : 'Gatilho'} adicionado com sucesso!`,
		});
	}

	return (
		<Modal
			animationType="slide"
			transparent
			visible={isVisible}
			onRequestClose={() => setIsVisible(false)}
		>
			<View style={styles.backdrop}>
				<View style={styles.modalContainer}>
					<TouchableOpacity style={{ position: 'absolute', top: 10, right: 10 }}>
						<Feather
							name="x-circle"
							size={30}
							color={colors.seaGreen}
							onPress={() => setIsVisible(false)}
						/>
					</TouchableOpacity>
					<Text style={styles.title}>Adicione...</Text>
					<View style={{ width: '100%', alignItems: 'center', gap: 15 }}>
						<Input
							placeholder={`Adicione um ${type === 'help' ? 'conforto' : 'gatilho'}`}
							numberOfLines={5}
							multiline
							value={newData}
							onChangeText={(text) => setNewData(text)}
						/>
						<Button onPress={submit}>
							<Button.Text>
								<Feather name="plus-circle" size={30} /> Adicionar
							</Button.Text>
						</Button>
					</View>
				</View>
			</View>

			<Toast position="bottom" swipeable config={toastConfig} />
		</Modal>
	);
}
