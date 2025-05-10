import { ButtonIcon } from '@/components/button-icon';
import { Logo } from '@/components/logo';
import { colors } from '@/constants/colors';
import { View, Text } from 'react-native';
import { Volume2, TriangleAlert, User } from 'lucide-react-native';

export default function Home() {
	return (
		<View
			style={{
				backgroundColor: colors.white,
				height: '100%',
				display: 'flex',
				alignItems: 'center',
			}}
		>
			<Logo />
			<View
				style={{
					marginTop: 15,
					gap: 15,
				}}
			>
				<ButtonIcon icon={Volume2} text={'Comunicação\n não verbal'} />
				<ButtonIcon icon={TriangleAlert} text={'Enviar aviso ao\n professor'} />
				<ButtonIcon icon={User} text={'Perfil'} />
			</View>
		</View>
	);
}
