import { useState } from 'react';
import {
	FlatList,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { styles as dropdownStyles } from './dropdown';
import { Input } from './input';

interface InputWithSuggestionsProps {
	options: string[];
	value: string;
	onChange: (value: string) => void;
	placeholder?: string;
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		position: 'relative',
	},
	...dropdownStyles,
});

export function InputWithSuggestions({
	options,
	value,
	onChange,
	placeholder,
}: InputWithSuggestionsProps) {
	const [isFocused, setIsFocused] = useState(false);

	const filteredOptions = options.filter((option) =>
		option.toLowerCase().includes(value.toLowerCase())
	);

	return (
		<View style={styles.container}>
			<Input
				value={value}
				onChangeText={onChange}
				placeholder={placeholder}
				onFocus={() => setIsFocused(true)}
				onBlur={() => setTimeout(() => setIsFocused(false), 100)} // pequeno delay para permitir clique
			/>

			{isFocused && filteredOptions.length > 0 && (
				<View style={styles.dropdown}>
					<FlatList
						data={filteredOptions}
						keyExtractor={(item, index) => `${item}-${index}`}
						renderItem={({ item }) => (
							<TouchableOpacity
								style={styles.element}
								onPress={() => {
									onChange(item);
									setIsFocused(false);
								}}
							>
								<Text style={styles.elementText}>{item}</Text>
							</TouchableOpacity>
						)}
						keyboardShouldPersistTaps="handled"
					/>
				</View>
			)}
		</View>
	);
}
