import { Text, View, Image } from 'react-native';
import { styles } from './styles';
import { Button } from '@/components/button';
import { Input } from '@/components/input';
import { Link } from '@/components/link';

export default function Register() {
	return (
		<View style={styles.container}>
			<Image
				style={styles.logo}
				source={require('@/assets/images/splash-icon.png')}
			/>

			<View style={styles.inputSection}>
				<Text style={styles.title}>Criar Conta</Text>
				<Input placeholder="Nome completo" textContentType="name" />
				<Input
					placeholder="E-mail"
					textContentType="emailAddress"
					autoCapitalize="none"
				/>
				<Input
					placeholder="Senha"
					textContentType="newPassword"
					secureTextEntry={true}
					autoCapitalize="none"
				/>
				<Input
					placeholder="Confirmar senha"
					textContentType="password"
					secureTextEntry={true}
					autoCapitalize="none"
				/>
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
