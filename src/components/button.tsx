import { colors, fontSize } from '@/constants/theme';
import {
	StyleSheet,
	Text as T,
	type TextProps,
	TouchableOpacity,
	type TouchableOpacityProps,
} from 'react-native';

const styles = StyleSheet.create({
	button: {
		paddingVertical: 12,
		backgroundColor: colors.seaGreen,
		width: '60%',
		borderRadius: 10,
	},
	text: {
		fontSize: fontSize.xl,
		color: colors.white,
		textAlign: 'center',
		fontWeight: 500,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
});

function Text({ children, ...rest }: TextProps) {
	return <T style={styles.text}>{children}</T>;
}

function Button({ children, ...rest }: TouchableOpacityProps) {
	return (
		<TouchableOpacity style={styles.button && styles.button} {...rest}>
			{children}
		</TouchableOpacity>
	);
}

Button.Text = Text;

export { Button };
