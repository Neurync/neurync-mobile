import { Dropdown } from '@/components/dropdown';
import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from '../styles';
import { Feather } from '@expo/vector-icons';
import { colors } from '@/constants/colors';
import { AddDangerOrHelpModal } from '@/components/modals/add-danger-or-help-modal';
import Toast from 'react-native-toast-message';

type StepHelpsAndDangersProps = {
	helps: string[];
	setHelps: (helps: string[]) => void;

	dangers: string[];
	setDangers: (dangers: string[]) => void;
};

export function StepHelpsAndDangers({
	helps,
	setHelps,
	dangers,
	setDangers,
}: StepHelpsAndDangersProps) {
	const [isAddHelpModalVisible, setIsAddHelpModalVisible] = useState(false);
	const [isAddDangerModalVisible, setIsAddDangerModalVisible] = useState(false);

	function addHelp(help: string) {
		setHelps([...helps, help]);
	}

	function addDanger(danger: string) {
		setDangers([...dangers, danger]);
	}

	return (
		<View style={styles.stepContainer}>
			<View style={{ width: '100%', gap: 5 }}>
				<View style={{ justifyContent: 'center', alignItems: 'center' }}>
					<View
						style={{
							width: '100%',
							flexDirection: 'row',
							alignItems: 'center',
							justifyContent: 'space-between',
							gap: 5,
						}}
					>
						<Text style={styles.title}>Confortos Sensoriais</Text>
						<TouchableOpacity onPress={() => setIsAddHelpModalVisible(true)}>
							<Feather name="plus-circle" size={30} color={colors.seaGreen} />
						</TouchableOpacity>
					</View>
					<Dropdown data={helps} emptyComponentLabel="Adicione um conforto" />
				</View>
				<View style={{ justifyContent: 'center', alignItems: 'center' }}>
					<View
						style={{
							width: '100%',
							flexDirection: 'row',
							alignItems: 'center',
							justifyContent: 'space-between',
							gap: 5,
						}}
					>
						<Text style={styles.title}>Gatilhos</Text>
						<TouchableOpacity onPress={() => setIsAddDangerModalVisible(true)}>
							<Feather name="plus-circle" size={30} color={colors.seaGreen} />
						</TouchableOpacity>
					</View>
					<Dropdown data={dangers} emptyComponentLabel="Adicione um gatilho" />
				</View>
			</View>

			<AddDangerOrHelpModal
				isVisible={isAddHelpModalVisible}
				setIsVisible={setIsAddHelpModalVisible}
				type="help"
				addData={addHelp}
			/>

			<AddDangerOrHelpModal
				isVisible={isAddDangerModalVisible}
				setIsVisible={setIsAddDangerModalVisible}
				type="danger"
				addData={addDanger}
			/>
		</View>
	);
}
