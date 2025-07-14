import { InputWithSuggestions } from '@/components/input-with-sugestions';
import { useRegisterScreenContext } from '@/contexts/register-screen/RegisterScreenProvider';
import { Text, View } from 'react-native';
import { styles } from '../styles';
import {
	StepNeurodivergenceModal,
	type ModalAnswer,
} from './modals/step-neurodivergence-modal';
import { useEffect, useState } from 'react';
import { Button } from '@/components/button';
import { Link } from '@/components/link';

export function StepNeurodivergence() {
	const { neurodivergence, setNeurodivergence, submit } =
		useRegisterScreenContext();

	const [isModalVisible, setIsModalVisible] = useState(false);
	const [modalAnswer, setModalAnswer] = useState<ModalAnswer>('no');

	useEffect(() => {
		if (modalAnswer === 'yes') submit();
	}, [modalAnswer]),
		function closeModal() {
			setIsModalVisible(false);
		};

	function openModal() {
		setIsModalVisible(true);
	}

	function handlePress() {
		if (!neurodivergence) {
			return openModal();
		}

		submit();
	}

	return (
		<View style={styles.stepContainer}>
			<View style={{ width: '100%', gap: 5 }}>
				<Text style={styles.title}>Selecione sua neurodivergência</Text>
				<InputWithSuggestions
					value={neurodivergence}
					onChange={setNeurodivergence}
					placeholder="Digite sua neurodivergência"
					options={[
						'TEA',
						'TDAH',
						'Dislexia',
						'Dispraxia',
						'Sindrome de Tourette',
						'TOC',
						'Superdotação',
						'Discalculia',
						'Disgrafia',
						'Esquizofrenia',
					]}
				/>
			</View>

			<View style={styles.bottomStep}>
				<Button onPress={handlePress}>
					<Button.Text>Próximo</Button.Text>
				</Button>
				<View style={styles.notAccountContainer}>
					<Text style={styles.notAccountText}>Já tem uma conta? </Text>
					<Link href={'../login'}>
						<Link.Text>Login</Link.Text>
					</Link>
				</View>
			</View>

			<StepNeurodivergenceModal
				isVisible={isModalVisible}
				setIsVisible={setIsModalVisible}
				setModalAnswer={setModalAnswer}
			/>
		</View>
	);
}
