import { colors, fontSize } from '@/constants/theme';
import { StyleSheet, TextInput, type TextInputProps } from 'react-native';

const styles = StyleSheet.create({
	input: {
		fontSize: 22,
		borderWidth: 2,
		width: '100%',
		borderRadius: 25,
		paddingHorizontal: 20,
		borderColor: colors.seaGreen,
		maxHeight: 180,
	},
});

export function TextArea({ ...rest }: TextInputProps) {
	return (
		<TextInput
			style={[styles.input, rest.style]}
			{...rest}
			numberOfLines={200}
			multiline
		/>
	);
}
