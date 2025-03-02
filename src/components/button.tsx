import { colors, fontSize } from '@/constants/theme';
import {
	StyleSheet,
	Text as T,
	TextProps,
	TouchableOpacity,
	TouchableOpacityProps,
} from 'react-native';

const styles = StyleSheet.create({
	button: {
		paddingVertical: 7,
		backgroundColor: colors.seaGreen,
		width: '60%',
		borderRadius: 15,
	},
	text: { fontSize: fontSize.xl, color: colors.white, textAlign: 'center' },
});

function Text({ children, ...rest }: TextProps) {
	return <T style={styles.text}>{children}</T>;
}

function Button({ children, ...rest }: TouchableOpacityProps) {
	return (
		<TouchableOpacity style={styles.button} {...rest}>
			{children}
		</TouchableOpacity>
	);
}

Button.Text = Text;

export { Button };
