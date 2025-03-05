import { colors, fontSize } from '@/constants/theme';
import { StyleSheet, TextInput, type TextInputProps } from 'react-native';

const styles = StyleSheet.create({
	input: {
		fontSize: fontSize.xl,
		borderWidth: 2,
		width: '100%',
		borderRadius: 25,
		paddingHorizontal: 20,
		borderColor: colors.seaGreen,
	},
});

export function Input({ ...rest }: TextInputProps) {
	return <TextInput style={styles.input} {...rest} />;
}
