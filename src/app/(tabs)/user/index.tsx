import { View, Text, StyleSheet } from 'react-native';
import { screenStyle } from '../screen-style';
import { Logo } from '@/components/logo';
import { colors } from '@/constants/colors';
import { CircleUser } from 'lucide-react-native';

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
	return (
		<View style={screenStyle.container}>
			<Logo />
			<Text style={screenStyle.title}>Seu perfil</Text>
			<CircleUser size={150} color={colors.seaGreen} />
			<View style={styles.userInfoContainer}>
				<Text style={styles.username}>Nome da Silva</Text>
				<Text style={styles.userInfo}>email.bacana@gmail.com</Text>
				<Text style={styles.userInfoTitle}>O que eu gosto: </Text>
				<Text style={styles.userInfoTitle}>O que eu NÃO gosto: </Text>
			</View>
		</View>
	);
}
