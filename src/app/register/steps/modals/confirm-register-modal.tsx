import { DefaultModal } from '@/components/modals/default-modal';
import { useRegisterScreenContext } from '@/contexts/register-screen/RegisterScreenProvider';
import { getUsers } from '@/services/api/endpoints/users/users';
import { CreateUserBody } from '@/services/api/schemas';
import { useRouter } from 'expo-router';
import { Alert } from 'react-native';

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

	async function handleCreateUser(user: CreateUserBody) {
		setIsCreatingAccount(true);

		try {
			await createUser(user);

			setIsCreatingAccount(false);
			Alert.alert('Conta criada com sucesso!');

			setIsVisible(false);

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
