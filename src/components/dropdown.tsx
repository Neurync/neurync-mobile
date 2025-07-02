import { colors, fontSize } from '@/constants/theme';
import { FlatList, StyleSheet, View, Text } from 'react-native';

type DropdownProps = {
	data: string[];
	emptyComponentLabel?: string;
};

export const styles = StyleSheet.create({
	dropdown: {
		width: '100%',
		backgroundColor: '#fff',
		borderWidth: 2,
		borderColor: colors.seaGreen,
		borderRadius: 15,
		zIndex: 10,
		maxHeight: 150,
		height: 150,
		marginBottom: 10,
	},
	element: {
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderBottomWidth: 1,
		borderBottomColor: colors.lightGray,
	},
	emptyListElement: {
		height: '100%',
		width: '100%',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
	elementText: {
		fontSize: fontSize.lg,
		color: colors.seaGreen,
	},
});

export function Dropdown({ data, emptyComponentLabel }: DropdownProps) {
	return (
		<View style={styles.dropdown}>
			<FlatList
				data={data}
				renderItem={({ item }) => (
					<View style={styles.element}>
						<Text style={styles.elementText}>{item}</Text>
					</View>
				)}
				ListEmptyComponent={() => (
					<View style={styles.emptyListElement}>
						<Text style={styles.elementText}>{emptyComponentLabel ?? ''}</Text>
					</View>
				)}
			/>
		</View>
	);
}
