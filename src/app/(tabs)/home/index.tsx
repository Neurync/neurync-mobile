import { ButtonIcon } from '@/components/button-icon';
import { Logo } from '@/components/logo';
import { View } from 'react-native';
import { Volume2, TriangleAlert, User } from 'lucide-react-native';
import { AlertButton } from '@/components/alert-button';
import { screenStyle } from '../screen-style';

export default function Home() {
	return (
		<View style={screenStyle.container}>
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

			<AlertButton />
		</View>
	);
}
