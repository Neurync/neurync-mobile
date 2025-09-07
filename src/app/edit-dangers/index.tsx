import { Button } from '@/components/button';
import { DropdownEditDangerAndHelp } from '@/components/dropdown-edit-danger-and-help';
import { Logo } from '@/components/logo';
import { AddDangerOrHelpModal } from '@/components/modals/add-danger-or-help-modal';
import { colors } from '@/constants/colors';
import { fontSize } from '@/constants/fontSize';
import { screenStyle } from '@/constants/screen-style';
import { AppContext } from '@/contexts/AppContext';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useContext, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export default function EditDangers() {
	const { user } = useContext(AppContext);

	if (!user) {
		router.navigate('/login');
		return <></>;
	}

	const [dangers, setDangers] = useState(user.dangers.map((d) => d.about));
	const [newDangers, setNewDangers] = useState();

	const [isAddHelpModalVisible, setIsAddHelpModalVisible] = useState(false);

	function addDanger(danger: string) {
		setDangers([...dangers, danger]);
	}

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
				<Text style={screenStyle.title}>Editar seus gatilhos</Text>
			</View>

			<View style={{ width: '90%' }}>
				<DropdownEditDangerAndHelp data={[]} />
			</View>
			<TouchableOpacity
				style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}
				onPress={() => setIsAddHelpModalVisible(true)}
			>
				<Feather name="plus-circle" size={30} color={colors.seaGreen} />
				<Text style={{ color: colors.seaGreen, fontSize: fontSize.lg }}>
					Adicionar
				</Text>
			</TouchableOpacity>

			<Button style={{ position: 'absolute', bottom: '10%' }}>
				<Button.Text>Salvar</Button.Text>
			</Button>

			<AddDangerOrHelpModal
				isVisible={isAddHelpModalVisible}
				setIsVisible={setIsAddHelpModalVisible}
				type="danger"
				addData={addDanger}
			/>
		</View>
	);
}
