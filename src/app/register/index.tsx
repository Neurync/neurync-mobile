import { Button } from '@/components/button';
import { Link } from '@/components/link';
import { Logo } from '@/components/logo';
import { colors } from '@/constants/colors';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { StepForm } from './steps/step-form';
import { StepHelpsAndDangers } from './steps/step-helps-and-dangers';
import { StepNeurodivergence } from './steps/step-neurodivergence';
import { styles } from './styles';

export default function Register() {
	const router = useRouter();

	// Step Form states
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
		useState(false);
	const [isFormStepVisible, setIsFormStepVisible] = useState(true);

	// Step Neurodivergence states
	const [neurodivergence, setNeurodivergence] = useState('');
	const [isNeurodivergenceStepVisible, setIsNeurodivergenceStepVisible] =
		useState(false);

	// Step Helps and Dangers states
	const [helps, setHelps] = useState<string[]>([]);
	const [dangers, setDangers] = useState<string[]>([]);
	const [isHelpsAndDangersStepVisible, setIsHelpsAndDangersStepVisible] =
		useState(false);

	function back() {
		if (isNeurodivergenceStepVisible) {
			setIsNeurodivergenceStepVisible(false);
			setIsFormStepVisible(true);
			return;
		}

		if (isHelpsAndDangersStepVisible) {
			setIsHelpsAndDangersStepVisible(false);
			setIsNeurodivergenceStepVisible(true);
			return;
		}

		throw new Error('This function should be used only after the form step');
	}

	function submit() {
		if (isFormStepVisible) {
			formStepSubmit();
			return;
		}

		if (isNeurodivergenceStepVisible) {
			neurodivergenceStepSubmit();
			return;
		}

		if (isHelpsAndDangersStepVisible) {
			helpsAndDangersStepSubmit();
			return;
		}

		throw new Error("Don't exists a use case for that step");
	}

	function formStepSubmit() {
		setIsFormStepVisible(false);
		setIsNeurodivergenceStepVisible(true);
	}

	function neurodivergenceStepSubmit() {
		setIsNeurodivergenceStepVisible(false);
		setIsHelpsAndDangersStepVisible(true);
	}

	function helpsAndDangersStepSubmit() {
		return;
	}

	return (
		<View style={styles.container}>
			<View style={{ flexDirection: 'row-reverse', alignItems: 'center', gap: 5 }}>
				<Logo />
				{!isFormStepVisible && (
					<TouchableOpacity onPress={back}>
						<Feather name="arrow-left-circle" size={30} color={colors.seaGreen} />
					</TouchableOpacity>
				)}
			</View>

			{isFormStepVisible && (
				<StepForm
					name={name}
					setName={setName}
					email={email}
					setEmail={setEmail}
					password={password}
					setPassword={setPassword}
					confirmPassword={confirmPassword}
					setConfirmPassword={setConfirmPassword}
					isPasswordVisible={isPasswordVisible}
					setIsPasswordVisible={setIsPasswordVisible}
					isConfirmPasswordVisible={isConfirmPasswordVisible}
					setIsConfirmPasswordVisible={setIsConfirmPasswordVisible}
					setIsThisStepVisible={setIsFormStepVisible}
					setIsNextStepVisible={setIsNeurodivergenceStepVisible}
				/>
			)}

			{isNeurodivergenceStepVisible && (
				<StepNeurodivergence
					neurodivergence={neurodivergence}
					setNeurodivergence={setNeurodivergence}
				/>
			)}

			{isHelpsAndDangersStepVisible && (
				<StepHelpsAndDangers
					helps={helps}
					dangers={dangers}
					setHelps={setHelps}
					setDangers={setDangers}
				/>
			)}

			<Button onPress={submit}>
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
