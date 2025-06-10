import { colors } from '@/constants/colors';
import { TextInput } from 'react-native';
import type { INonverbalButton } from '@/interfaces/INonverbalButton';
import { useState } from 'react';

export interface SearchbarProps {
	data: INonverbalButton[];
	setData: (newData: INonverbalButton[]) => void;
}

export function Searchbar({ data, setData }: SearchbarProps) {
	const [backupData, setBackupData] = useState(data);

	function filter(search: string) {
		if (search.length === 0) return setData(backupData);

		setData(
			data.filter((element) => {
				if (element.description.toLowerCase().includes(search.toLowerCase()))
					return element;
			})
		);

		if (data.length === 0) setData(backupData);
	}

	return (
		<TextInput
			style={{
				backgroundColor: colors.lightGray,
				width: '85%',
				borderRadius: 25,
				fontWeight: 500,
				paddingLeft: 5,
				fontSize: 16,
			}}
			placeholder="Pesquisar..."
			onChangeText={(value) => {
				filter(value);
			}}
		/>
	);
}
