import { Feather } from '@expo/vector-icons';
import { colors } from '@/constants/colors';
import {
	TouchableOpacity,
	Text,
	type TouchableOpacityProps,
} from 'react-native';

interface ButtonIconProps extends TouchableOpacityProps {
	icon: keyof typeof Feather.glyphMap; // nomes dos ícones disponíveis
	text: string;
}

export function ButtonIcon({ icon, text, ...rest }: ButtonIconProps) {
	return (
		<TouchableOpacity
			style={{
				width: 260,
				height: 80,
				backgroundColor: colors.lightSeaGreen,
				borderRadius: 15,
				paddingHorizontal: 10,
				paddingVertical: 5,
				display: 'flex',
				flexDirection: 'row',
				alignItems: 'center',
				gap: 3,
				borderWidth: 2,
				borderColor: colors.seaGreen,
				borderRightWidth: 4,
				borderBottomWidth: 4,
				shadowColor: '#000',
				shadowOffset: { width: 0, height: 2 },
				shadowOpacity: 0.25,
				shadowRadius: 3.84,
				elevation: 5,
			}}
			{...rest}
		>
			<Feather name={icon} color={colors.gold} size={50} />
			<Text
				style={{
					textTransform: 'uppercase',
					color: colors.black,
					fontWeight: '500',
					fontSize: 20,
					textAlign: 'center',
					width: '80%',
				}}
			>
				{text}
			</Text>
		</TouchableOpacity>
	);
}
