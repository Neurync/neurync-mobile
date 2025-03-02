import { Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import { Button } from '@/components/button';
import { Input } from '@/components/input';
import { Link } from '@/components/link';

export default function Login() {
	return (
		<View style={styles.container}>
			<Image
				style={styles.logo}
				source={require('@/assets/images/splash-icon.png')}
			/>

			<View style={styles.inputSection}>
				<Text style={styles.title}>Login</Text>
				<Input placeholder="E-mail" secureTextEntry={true} autoCapitalize="none" />
				<Input placeholder="Senha" secureTextEntry={true} autoCapitalize="none" />
				<Link href={'../register'}>
					<Link.Text>Esqueci minha senha</Link.Text>
				</Link>
			</View>

			<Button>
				<Button.Text>Login</Button.Text>
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
