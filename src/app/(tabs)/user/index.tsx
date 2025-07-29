import { Logo } from '@/components/logo';
import { colors } from '@/constants/colors';
import { AppContext } from '@/contexts/AppContext';
import { Feather } from '@expo/vector-icons';
import { useContext, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { screenStyle } from '../../../constants/screen-style';
import { useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { QrCodeModal } from '@/components/modals/qr-code-modal';
import { QRDCODE_WEB_URL } from '@/env';

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		alignItems: 'flex-start',
		paddingTop: 5,
		paddingBottom: 5,
		paddingLeft: 20,
		width: '100%',
		gap: 12,
	},
	username: {
		fontSize: 21,
		color: colors.black,
		textAlign: 'left',
		fontWeight: 400,
		textTransform: 'uppercase',
		width: '100%',
	},
	useremail: {
		fontSize: 20,
		color: colors.black,
		textAlign: 'left',
		fontWeight: 400,
		width: '100%',
	},
	userInfoContainer: {
		width: '50%',
		borderWidth: 1,
		borderRadius: 8,
		borderColor: colors.seaGreen,
		height: '100%',
	},
	userInfoTitle: {
		fontSize: 20,
		color: colors.seaGreen,
		textAlign: 'center',
		width: '100%',
		fontWeight: 500,
		paddingVertical: 5,
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

			<View
				style={{
					borderWidth: 5,
					borderColor: colors.seaGreen,
					borderRadius: '100%',
					padding: 8,
				}}
			>
				<Feather name="user" size={150} color={colors.seaGreen} />
				<TouchableOpacity
					style={{
						backgroundColor: colors.seaGreen,
						height: 45,
						width: 45,
						justifyContent: 'center',
						alignItems: 'center',
						position: 'absolute',
						bottom: 0,
						right: 0,
						borderColor: colors.lightSeaGreen,
						borderWidth: 3,
						borderRadius: 25,
					}}
					onPress={() => console.log({ user })}
				>
					<Feather name="edit" color={colors.white} size={21} />
				</TouchableOpacity>
			</View>

			<View style={styles.container}>
				<Text style={styles.username}>{user?.name}</Text>
				<Text style={styles.useremail}>{user?.email}</Text>
			</View>

			<View
				style={{
					flexDirection: 'row',
					alignItems: 'flex-start',
					justifyContent: 'flex-start',
					padding: 8,
					width: '100%',
				}}
			>
				<View
					style={[
						styles.userInfoContainer,
						{ borderTopRightRadius: 0, borderBottomRightRadius: 0 },
					]}
				>
					<Text style={styles.userInfoTitle}>CONFORTOS</Text>

					<FlatList
						data={user?.helps}
						keyExtractor={(danger) => danger.id}
						renderItem={({ item: danger }) => <Text>{danger.about}</Text>}
					/>
				</View>

				<View
					style={[
						styles.userInfoContainer,
						{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 },
					]}
				>
					<Text style={styles.userInfoTitle}>GATILHOS</Text>

					<FlatList
						data={user?.dangers}
						keyExtractor={(danger) => danger.id}
						renderItem={({ item: danger }) => <Text>{danger.about}</Text>}
					/>
				</View>
			</View>

			<TouchableOpacity style={styles.qrCodeButton} onPress={openQrCodeModal}>
				<Text style={styles.qrCodeButtonText}>QR Code</Text>
				<Feather name="link" size={20} color={colors.seaGreen} />
			</TouchableOpacity>

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
