import { Button } from '@/components/button';
import { Input } from '@/components/input';
import { Link } from '@/components/link';
import { colors } from '@/constants/colors';
import { Feather } from '@expo/vector-icons';
import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { z } from 'zod';
import { styles } from '../styles';
import { StepFormModal } from './modals/step-form-modal';
import { useRegisterScreenContext } from '@/contexts/register-screen/RegisterScreenProvider';

export function StepForm() {
	const {
		name,
		setName,
		email,
		setEmail,
		password,
		setPassword,
		confirmPassword,
		setConfirmPassword,
		submit,
	} = useRegisterScreenContext();

	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
		useState(false);

	const [modalSecondText, setModalSecondText] = useState('');
	const [isModalVisible, setIsModalVisible] = useState(false);

	function openModal() {
		setIsModalVisible(true);
	}

	function validateForm() {
		if (!name || !email || !password || !confirmPassword) {
			setModalSecondText('Por favor, preencha todos os campos.');
			openModal();
			return false;
		}

		if (!z.string().email().safeParse(email).success) {
			setModalSecondText('Insira um email válido.');
			openModal();
			return false;
		}

		if (password !== confirmPassword) {
			setModalSecondText('As senhas devem ser iguais.');
			openModal();
			return false;
		}

		return true;
	}

	function handlePress() {
		if (!validateForm()) return;
		submit();
	}

	return (
		<View style={styles.stepContainer}>
			<View style={styles.inputSection}>
				<Text style={styles.title}>Criar Conta</Text>

				<Input
					placeholder="Nome completo"
					textContentType="name"
					autoCapitalize="words"
					value={name}
					onChangeText={setName}
				/>

				<Input
					placeholder="E-mail"
					textContentType="emailAddress"
					autoCapitalize="none"
					value={email}
					onChangeText={setEmail}
				/>

				<View style={{ position: 'relative' }}>
					<Input
						placeholder="Senha"
						textContentType="newPassword"
						secureTextEntry={!isPasswordVisible}
						autoCapitalize="none"
						value={password}
						onChangeText={setPassword}
					/>
					<TouchableOpacity
						style={{ position: 'absolute', right: 10, top: 10 }}
						onPress={() => setIsPasswordVisible(!isPasswordVisible)}
					>
						<Feather
							name={isPasswordVisible ? 'eye-off' : 'eye'}
							color={colors.seaGreen}
							size={30}
						/>
					</TouchableOpacity>
				</View>

				<View style={{ position: 'relative' }}>
					<Input
						placeholder="Confirmar senha"
						textContentType="password"
						secureTextEntry={!isConfirmPasswordVisible}
						autoCapitalize="none"
						value={confirmPassword}
						onChangeText={setConfirmPassword}
					/>
					<TouchableOpacity
						style={{ position: 'absolute', right: 10, top: 10 }}
						onPress={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
					>
						<Feather
							name={isConfirmPasswordVisible ? 'eye-off' : 'eye'}
							color={colors.seaGreen}
							size={30}
						/>
					</TouchableOpacity>
				</View>
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

			<StepFormModal
				secondText={modalSecondText}
				isVisible={isModalVisible}
				setIsVisible={setIsModalVisible}
			/>
		</View>
	);
}
