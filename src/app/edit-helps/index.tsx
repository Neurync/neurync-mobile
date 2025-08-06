import { Button } from '@/components/button';
import { Logo } from '@/components/logo';
import { colors } from '@/constants/colors';
import { screenStyle } from '@/constants/screen-style';
import { AppContext } from '@/contexts/AppContext';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useContext } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from '../login/styles';
import { DropdownEditDangerAndHelp } from '@/components/dropdown-edit-danger-and-help';

export default function EditHelps() {
	const { user } = useContext(AppContext);
	const { helps } = user;

	return (
		<View style={screenStyle.container}>
			<Logo />
			<View
				style={{
					flexDirection: 'row',
					justifyContent: 'center',
					alignItems: 'center',
					width: '100%',
					gap: 5,
				}}
			>
				<TouchableOpacity onPress={() => router.back()}>
					<Feather name="arrow-left-circle" size={25} color={colors.seaGreen} />
				</TouchableOpacity>
				<Text style={screenStyle.title}>Editar seus confortos</Text>
			</View>

			<DropdownEditDangerAndHelp data={helps} />

			<Button style={{ position: 'absolute', bottom: '10%' }}>
				<Button.Text>Salvar</Button.Text>
			</Button>
		</View>
	);
}
