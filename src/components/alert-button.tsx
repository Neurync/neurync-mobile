import { colors } from '@/constants/colors';
import { useContext, useState } from 'react';
import {
	Alert,
	Image,
	StyleSheet,
	Text,
	TouchableOpacity,
	type TouchableOpacityProps,
	type ViewStyle,
} from 'react-native';
import { MessageModal } from './modals/message-modal';
import { router } from 'expo-router';
import { AppContext } from '@/contexts/AppContext';

const styles = StyleSheet.create({
	container: {
		width: 100,
		height: 100,
		backgroundColor: colors.red,
		position: 'absolute',
		bottom: 0,
		right: 0,
		borderWidth: 2,
		borderColor: colors.darkRed,
		borderBottomWidth: 5,
		borderRadius: 10,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		marginBottom: 20,
		marginRight: 20,
		zIndex: 1,
	},
	text: {
		color: colors.white,
		textTransform: 'uppercase',
		fontWeight: '500',
		fontSize: 20,
		textAlign: 'center',
		textShadowColor: colors.darkRed,
	},
});

interface AlertButtonProps extends TouchableOpacityProps {
	style?: ViewStyle;
}

export function AlertButton({ style }: AlertButtonProps) {
	const { user } = useContext(AppContext);

	if (!user) {
		router.navigate('/login');
		return <></>;
	}

	const [isLoading, setIsLoading] = useState(false);
	const [isMessageModalVisible, setIsMessageModalVisible] = useState(false);

	function openMessageModal() {
		setIsMessageModalVisible(true);
	}

	return (
		<>
			<MessageModal
				isVisible={isMessageModalVisible}
				isLoading={isLoading}
				setIsLoading={setIsLoading}
				setIsVisible={setIsMessageModalVisible}
				user={user}
			/>

			<TouchableOpacity
				onPress={openMessageModal}
				style={[styles.container, style]}
			>
				<Image
					style={{ height: 70, width: 70 }}
					source={require('@/assets/images/triangle-alert.png')}
				/>
				<Text style={styles.text}>Alerta</Text>
			</TouchableOpacity>
		</>
	);
}
