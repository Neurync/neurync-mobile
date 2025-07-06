import { Input } from '@/components/input';
import { colors } from '@/constants/colors';
import { Feather } from '@expo/vector-icons';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import { styles } from '../styles';
import { set, z } from 'zod';
import { useEffect } from 'react';

type StepFormProps = {
	name: string;
	setName: (name: string) => void;
	email: string;
	setEmail: (email: string) => void;
	password: string;
	setPassword: (password: string) => void;
	confirmPassword: string;
	setConfirmPassword: (confirmPassword: string) => void;
	isPasswordVisible: boolean;
	setIsPasswordVisible: (isPasswordVisible: boolean) => void;
	isConfirmPasswordVisible: boolean;
	setIsConfirmPasswordVisible: (isConfirmPasswordVisible: boolean) => void;

	isFormValid: boolean;
	validateForm: () => void;
};

export function StepForm({
	name,
	setName,
	email,
	setEmail,
	password,
	setPassword,
	confirmPassword,
	setConfirmPassword,
	isPasswordVisible,
	setIsPasswordVisible,
	isConfirmPasswordVisible,
	setIsConfirmPasswordVisible,
	isFormValid,
	validateForm,
}: StepFormProps) {
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(validateForm, [isFormValid]);

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
		</View>
	);
}
