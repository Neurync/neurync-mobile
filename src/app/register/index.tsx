import { Logo } from '@/components/logo';
import { colors } from '@/constants/colors';
import { screenStyle } from '@/constants/screen-style';
import {
	RegisterScreenProvider,
	useRegisterScreenContext,
} from '@/contexts/register-screen/RegisterScreenProvider';
import { Feather } from '@expo/vector-icons';
import { TouchableOpacity, View } from 'react-native';
import { StepForm } from './steps/step-form';
import { StepHelpsAndDangers } from './steps/step-helps-and-dangers';
import { StepNeurodivergence } from './steps/step-neurodivergence';

function RegisterContent() {
	const { currentStep, back } = useRegisterScreenContext();

	return (
		<View style={screenStyle.container}>
			<View style={{ flexDirection: 'row-reverse', alignItems: 'center', gap: 5 }}>
				<Logo />
				{currentStep !== 'form' && (
					<TouchableOpacity onPress={back}>
						<Feather name="arrow-left-circle" size={30} color={colors.seaGreen} />
					</TouchableOpacity>
				)}
			</View>

			{currentStep === 'form' && <StepForm />}
			{currentStep === 'neurodivergence' && <StepNeurodivergence />}
			{currentStep === 'helps-and-dangers' && <StepHelpsAndDangers />}
		</View>
	);
}

export default function Register() {
	return (
		<RegisterScreenProvider>
			<RegisterContent />
		</RegisterScreenProvider>
	);
}
