import { Button } from '@/components/button';
import { Dropdown } from '@/components/dropdown';
import { Link } from '@/components/link';
import { AddDangerOrHelpModal } from '@/components/modals/add-danger-or-help-modal';
import { colors } from '@/constants/colors';
import { useRegisterScreenContext } from '@/contexts/register-screen/RegisterScreenProvider';
import { Feather } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import { styles } from '../styles';
import {
	StepHelpsAndDangersModal,
	type ModalAnswer,
} from './modals/step-helps-and-dangers-modal';
import { ConfirmRegisterModal } from './modals/confirm-register-modal';

export function StepHelpsAndDangers() {
	const { helps, setHelps, dangers, setDangers, submit } =
		useRegisterScreenContext();

	const [modalQueue, setModalQueue] = useState<
		('helps' | 'dangers' | 'confirm')[]
	>([]);
	const [currentModal, setCurrentModal] = useState<
		null | 'helps' | 'dangers' | 'confirm'
	>(null);
	const [modalAnswer, setModalAnswer] = useState<ModalAnswer>(undefined);
	const [isModalVisible, setIsModalVisible] = useState(false);

	const [isAddHelpModalVisible, setIsAddHelpModalVisible] = useState(false);
	const [isAddDangerModalVisible, setIsAddDangerModalVisible] = useState(false);

	const [isConfirmRegisterModalVisible, setIsConfirmRegisterModalVisible] =
		useState(false);

	const [isLoading, setIsLoading] = useState(false);

	function addHelp(help: string) {
		setHelps([...helps, help]);
	}

	function removeHelp(help: string) {
		setHelps(helps.filter((item: string) => item !== help));
	}

	function addDanger(danger: string) {
		setDangers([...dangers, danger]);
	}

	function removeDanger(danger: string) {
		setDangers(dangers.filter((item: string) => item !== danger));
	}

	function handlePress() {
		const queue: ('helps' | 'dangers' | 'confirm')[] = [];

		if (helps.length === 0) queue.push('helps');
		if (dangers.length === 0) queue.push('dangers');

		if (queue.length > 0) {
			setModalQueue(queue);
			setCurrentModal(queue[0]);
			setIsModalVisible(true);
			return;
		}

		setIsConfirmRegisterModalVisible(true);
	}

	useEffect(() => {
		if (!modalAnswer) return;

		if (modalAnswer === 'no') {
			setModalQueue([]);
			setCurrentModal(null);
			setIsModalVisible(false);
			return;
		}

		const [, ...restQueue] = modalQueue;
		setModalQueue(restQueue);
		setCurrentModal(restQueue[0] ?? null);

		if (restQueue.length === 0) {
			setIsModalVisible(false);
			setIsConfirmRegisterModalVisible(true);
		}

		setModalAnswer(undefined);
	}, [modalAnswer]);

	function getSecondText(modal: typeof currentModal): string {
		if (modal === 'helps')
			return "Você não preencheu nenhum 'conforto'. Deseja continuar mesmo assim?";
		if (modal === 'dangers')
			return "Você não preencheu nenhum 'gatilho'. Deseja continuar mesmo assim?";
		return '';
	}

	return isLoading ? (
		<View
			style={{
				height: '80%',
				width: '100%',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<ActivityIndicator size={50} color={colors.seaGreen} />
		</View>
	) : (
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
					<Dropdown
						data={helps}
						emptyComponentLabel="Adicione um conforto"
						editable
						onRemove={removeHelp}
					/>
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
					<Dropdown
						data={dangers}
						emptyComponentLabel="Adicione um gatilho"
						editable
						onRemove={removeDanger}
					/>
				</View>
			</View>
			<View style={styles.bottomStep}>
				<Button onPress={handlePress}>
					<Button.Text>Criar conta</Button.Text>
				</Button>
				<View style={styles.notAccountContainer}>
					<Text style={styles.notAccountText}>Já tem uma conta? </Text>
					<Link href={'../login'}>
						<Link.Text>Login</Link.Text>
					</Link>
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
			<StepHelpsAndDangersModal
				isVisible={isModalVisible}
				setIsVisible={setIsModalVisible}
				setModalAnswer={setModalAnswer}
				secondText={getSecondText(currentModal)}
			/>
			<ConfirmRegisterModal
				key={isConfirmRegisterModalVisible.toString()}
				isVisible={isConfirmRegisterModalVisible}
				setIsVisible={setIsConfirmRegisterModalVisible}
				setIsCreatingAccount={setIsLoading}
			/>
		</View>
	);
}
