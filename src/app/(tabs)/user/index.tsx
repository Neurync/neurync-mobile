import { Logo } from '@/components/logo';
import { colors } from '@/constants/colors';
import { AppContext } from '@/contexts/AppContext';
import { Feather } from '@expo/vector-icons';
import { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { screenStyle } from '../../../constants/screen-style';
import { useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native';

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
});

export default function User() {
	const router = useRouter();
	const { setUser } = useContext(AppContext);

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
				<Text style={styles.username}>Nome da Silva</Text>
				<Text style={styles.userInfo}>email.bacana@gmail.com</Text>
				<Text style={styles.userInfoTitle}>O que eu gosto: </Text>
				<Text style={styles.userInfoTitle}>O que eu NÃO gosto: </Text>
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
		</View>
	);
}
