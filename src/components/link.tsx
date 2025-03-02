import { colors, fontSize } from '@/constants/theme';
import { RelativePathString, useRouter } from 'expo-router'; // Importando o hook useRouter
import {
	StyleSheet,
	Text as T,
	TextProps,
	TouchableOpacity,
	TouchableOpacityProps,
} from 'react-native';

const styles = StyleSheet.create({
	text: {
		fontSize: fontSize.lg,
		color: colors.seaGreen,
		textAlign: 'center',
	},
});

function Text({ children, ...rest }: TextProps) {
	return (
		<T style={styles.text} {...rest}>
			{children}
		</T>
	);
}

function Link({
	children,
	href,
	...rest
}: TouchableOpacityProps & { href: RelativePathString }) {
	const router = useRouter(); // Usando o hook useRouter

	const handlePress = () => {
		// Navega para a rota especificada
		router.push(href);
	};

	return (
		<TouchableOpacity {...rest} onPress={handlePress}>
			{children}
		</TouchableOpacity>
	);
}

Link.Text = Text;

export { Link };
