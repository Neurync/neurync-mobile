import { Text, View, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import { Button } from '@/components/button';
import { Input } from '@/components/input';
import { Link } from '@/components/link';
import { Logo } from '@/components/logo';
import { useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { colors } from '@/constants/colors';

export default function Register() {
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
		useState(false);

	return (
		<View style={styles.container}>
			<Logo />

			<View style={styles.inputSection}>
				<Text style={styles.title}>Criar Conta</Text>
				<Input placeholder="Nome completo" textContentType="name" />
				<Input
					placeholder="E-mail"
					textContentType="emailAddress"
					autoCapitalize="none"
				/>

				<View style={{ position: 'relative' }}>
					<Input
						placeholder="Senha"
						textContentType="newPassword"
						secureTextEntry={!isPasswordVisible}
						autoCapitalize="none"
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

			<Button>
				<Button.Text>Próximo</Button.Text>
			</Button>

			<View style={styles.notAccountContainer}>
				<Text style={styles.notAccountText}>Já tem uma conta? </Text>
				<Link href={'../login'}>
					<Link.Text>Login</Link.Text>
				</Link>
			</View>
		</View>
	);
}
