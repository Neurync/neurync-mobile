import { colors } from '@/constants/colors';
import {
	TouchableOpacity,
	Text,
	StyleSheet,
	Image,
	type ViewStyle,
} from 'react-native';

const styles = StyleSheet.create({
	container: {
		width: 100,
		height: 100,
		backgroundColor: colors.red,
		position: 'absolute',
		bottom: 0,
		right: 0,
		borderWidth: 2,
		borderColor: colors.darkRed,
		borderBottomWidth: 5,
		borderRadius: 10,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: 20,
		marginRight: 20,
		zIndex: 999,
	},
	text: {
		color: colors.white,
		textTransform: 'uppercase',
		fontWeight: '500',
		fontSize: 20,
		textAlign: 'center',
		textShadowColor: colors.darkRed,
	},
});

export function AlertButton({ style }: { style?: ViewStyle }) {
	return (
		<TouchableOpacity style={[styles.container, style]}>
			<Image
				style={{ height: 70, width: 70 }}
				source={require('@/assets/images/triangle-alert.png')}
			/>
			<Text style={styles.text}>Alerta</Text>
		</TouchableOpacity>
	);
}
