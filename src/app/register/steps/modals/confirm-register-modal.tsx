import { DefaultModal } from '@/components/modals/default-modal';
import { colors, fontSize } from '@/constants/theme';
import { useRegisterScreenContext } from '@/contexts/register-screen/RegisterScreenProvider';
import { getUsers } from '@/services/api/endpoints/users/users';
import { CreateUserBody } from '@/services/api/schemas';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert } from 'react-native';
import Toast, {
	BaseToast,
	type BaseToastProps,
} from 'react-native-toast-message';

export type ModalAnswer = 'yes' | 'no';

interface IConfirmRegisterProps {
	isVisible: boolean;
	setIsVisible: (isVisible: boolean) => void;
	setIsCreatingAccount: (isCreatingAccount: boolean) => void;
}

export function ConfirmRegisterModal({
	isVisible,
	setIsVisible,
	setIsCreatingAccount,
}: IConfirmRegisterProps) {
	const router = useRouter();
	const { createUser } = getUsers();

	const { name, email, password, neurodivergence, helps, dangers } =
		useRegisterScreenContext();

	function handleYes() {
		const newUser = {
			name,
			email,
			password,
			neurodivergence: !neurodivergence ? undefined : neurodivergence,
			helps,
			dangers,
		};

		handleCreateUser(newUser);
	}

	function handleNo() {
		setIsVisible(false);
	}

	function goToLoginScreen() {
		router.push('/login');
	}

	async function handleCreateUser(user: CreateUserBody) {
		setIsCreatingAccount(true);

		try {
			const response = await createUser(user);
			setIsCreatingAccount(false);
			Alert.alert('Conta criada com sucesso!');
			setIsVisible(false);
			console.log(response);
			router.push('/login');
		} catch (error: any) {
			if (error.response) {
				let errorMessage = 'Tente novamente mais tarde.';
				const { status } = error.response;

				if (status === 400) errorMessage = 'Já existe uma conta com esse e-mail.';

				Alert.alert('Ocorreu um erro', errorMessage);
				setIsCreatingAccount(false);
				setIsVisible(false);
			}
		}
	}

	return (
		<DefaultModal
			isVisible={isVisible}
			closeModal={() => setIsVisible(false)}
			icon={'alert-circle'}
			firstText={'Atenção'}
			secondText={'Você tem certeza que deseja criar a conta com esses dados?'}
			firstButtonText={'Sim'}
			firstButtonPress={handleYes}
			secondButtonText={'Não'}
			secondActionButtonPress={handleNo}
		/>
	);
}
