import { Button } from '@/components/button';
import { Input } from '@/components/input';
import { Link } from '@/components/link';
import { Logo } from '@/components/logo';
import { decodeUserLoginToken } from '@/libs/decode-jwt';
import { getUsers } from '@/services/api/endpoints/users/users';
import { useState, useContext } from 'react';
import {
	ActivityIndicator,
	Alert,
	Text,
	View,
	TouchableOpacity,
} from 'react-native';
import { styles } from './styles';
import { colors } from '@/constants/colors';
import { AppContext } from '@/contexts/AppContext';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';

export default function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const router = useRouter();

	const { setUser } = useContext(AppContext);

	const { loginUser, getUserById } = getUsers();

	async function login() {
		if (!email || !password)
			return Alert.alert('Opa!', 'Por favor, preencha todos os campos');

		setIsLoading(true);

		try {
			const { data } = await loginUser({ email, password });
			const { token } = data;
			const { id } = decodeUserLoginToken(token);
			const { data: user } = await getUserById(id);
			return { ...user, token };

			// biome-ignore lint/suspicious/noExplicitAny: try-catch
		} catch (error: any) {
			if (error.response) {
				const { status } = error.response;

				if (status === 401)
					return Alert.alert(
						'Opa!',
						'Credenciais inválidas. Corrija elas e tente novamente.'
					);

				if (status >= 500) {
					return Alert.alert(
						'Erro ao realizar login',
						'Ocorreu um problema desconhecido. Tente novamente mais tarde.'
					);
				}
			}

			Alert.alert(
				'Erro ao realizar login',
				'Verifique as credenciais e tente novamente.'
			);
		}
	}

	async function handleSubmit() {
		const response = await login();

		if (!response) return;

		const { id, name, email, token } = response;

		setUser({ id, name, email, token });
		setIsLoading(false);

		router.push('/(tabs)/home');
	}

	return (
		<View style={styles.container}>
			<Logo />

			<View style={styles.inputSection}>
				<Text style={styles.title}>Login</Text>
				<Input
					placeholder="E-mail"
					textContentType="emailAddress"
					autoCapitalize="none"
					value={email}
					onChangeText={(text) => setEmail(text.trim())}
				/>
				<View>
					<Input
						placeholder="Senha"
						textContentType="password"
						secureTextEntry={!isPasswordVisible}
						value={password}
						onChangeText={(text) => setPassword(text)}
						autoCapitalize="none"
					/>
					<TouchableOpacity
						style={{
							position: 'absolute',
							right: 10,
							top: 10,
							zIndex: 1,
							cursor: 'pointer',
						}}
						onPress={() => setIsPasswordVisible(!isPasswordVisible)}
					>
						<Feather
							name={isPasswordVisible ? 'eye-off' : 'eye'}
							color={colors.seaGreen}
							size={30}
						/>
					</TouchableOpacity>
				</View>
				<Link href={'../register'}>
					<Link.Text>Esqueci minha senha</Link.Text>
				</Link>
			</View>

			<Button onPress={handleSubmit}>
				{!isLoading && <Button.Text>Login</Button.Text>}
				{isLoading && <ActivityIndicator size={40} color={colors.white} />}
			</Button>

			<View style={styles.notAccountContainer}>
				<Text style={styles.notAccountText}>Não tem uma conta? </Text>
				<Link href={'../register'}>
					<Link.Text>Criar conta</Link.Text>
				</Link>
			</View>
		</View>
	);
}
