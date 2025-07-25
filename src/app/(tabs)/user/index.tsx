import { Logo } from '@/components/logo';
import { colors } from '@/constants/colors';
import { AppContext } from '@/contexts/AppContext';
import { Feather } from '@expo/vector-icons';
import { useContext, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { screenStyle } from '../../../constants/screen-style';
import { useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { QrCodeModal } from '@/components/modals/qr-code-modal';
import { QRDCODE_WEB_URL } from '@/env';

const styles = StyleSheet.create({
	userInfoContainer: {
		display: 'flex',
		alignItems: 'flex-start',
		paddingTop: 5,
		paddingBottom: 5,
		paddingLeft: 20,
		width: '100%',
		gap: 12,
	},
	username: {
		fontSize: 25,
		color: colors.black,
		textAlign: 'left',
		fontWeight: 400,
		textTransform: 'uppercase',
		width: '100%',
	},
	userInfo: {
		fontSize: 20,
		color: colors.black,
		textAlign: 'left',
		fontWeight: 400,
		width: '100%',
	},
	userInfoTitle: {
		fontSize: 20,
		color: colors.black,
		textAlign: 'left',
		width: '100%',
		fontWeight: 500,
	},
	qrCodeButton: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: '95%',
		borderWidth: 1,
		borderColor: colors.seaGreen,
		borderRadius: 10,
		padding: 6,
	},
	qrCodeButtonText: {
		fontSize: 20,
		color: colors.seaGreen,
		textAlign: 'left',
		fontWeight: 500,
	},
});

export default function User() {
	const router = useRouter();
	const { user, setUser } = useContext(AppContext);
	const [isQrCodeModalVisible, setIsQrCodeModalVisible] = useState(false);

	function openQrCodeModal() {
		setIsQrCodeModalVisible(true);
	}

	function closeQrCodeModal() {
		setIsQrCodeModalVisible(false);
	}

	function logout() {
		setUser(null);
		router.push('/login');
	}

	return (
		<View style={screenStyle.container}>
			<Logo />
			<Text style={screenStyle.title}>Seu perfil</Text>
			<Feather name="user" size={150} color={colors.seaGreen} />
			<View style={styles.userInfoContainer}>
				<Text style={styles.username}>{user?.name}</Text>
				<Text style={styles.userInfo}>{user?.email}</Text>
				<Text style={styles.userInfoTitle}>O que eu gosto: </Text>
				<Text style={styles.userInfoTitle}>O que eu NÃO gosto: </Text>
				<TouchableOpacity style={styles.qrCodeButton} onPress={openQrCodeModal}>
					<Text style={styles.qrCodeButtonText}>QR Code</Text>
					<Feather name="link" size={20} color={colors.seaGreen} />
				</TouchableOpacity>
			</View>
			<TouchableOpacity
				style={{
					position: 'absolute',
					bottom: 8,
					flexDirection: 'row',
					alignItems: 'center',
					gap: 5,
				}}
				onPress={logout}
			>
				<Feather name="log-out" color={colors.red} size={20} />
				<Text style={{ color: colors.red, fontSize: 25 }}>Sair</Text>
			</TouchableOpacity>
			<QrCodeModal
				isVisible={isQrCodeModalVisible}
				closeModal={closeQrCodeModal}
				qrCode={`${QRDCODE_WEB_URL}"${user?.id}"`}
			/>
		</View>
	);
}
