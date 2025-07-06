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
		borderWidth: 2,
		borderColor: colors.seaGreen,
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

	outlineButton: {
		paddingVertical: 12,
		backgroundColor: colors.white,
		width: '60%',
		borderRadius: 10,
		borderWidth: 2,
		borderColor: colors.seaGreen,
	},
	outlineText: {
		fontSize: fontSize.xl,
		color: colors.seaGreen,
		textAlign: 'center',
		fontWeight: 500,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
});

interface ButtonTextProps extends TextProps {
	outline?: boolean;
}

function Text({ children, outline, ...rest }: ButtonTextProps) {
	return <T style={outline ? styles.outlineText : styles.text}>{children}</T>;
}

interface ButtonProps extends TouchableOpacityProps {
	outline?: boolean;
}

function Button({ children, outline, ...rest }: ButtonProps) {
	return (
		<TouchableOpacity
			style={outline ? styles.outlineButton : styles.button}
			{...rest}
		>
			{children}
		</TouchableOpacity>
	);
}

Button.Text = Text;

export { Button };
