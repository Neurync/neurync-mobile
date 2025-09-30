import { colors } from '@/constants/colors';
import {
	ActivityIndicator,
	Alert,
	Image,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import type { INonverbalButton as NonverbalButtonProps } from '@/interfaces/INonverbalButton';
import { NonverbalModal } from './modals/nonverbal-modal';
import { useContext, useState } from 'react';
import * as Speech from 'expo-speech';
import { getNonverbalMessage } from '@/services/api/endpoints/nonverbal-message/nonverbal-message';
import { AppContext } from '@/contexts/AppContext';
import { sendMessage } from '@/esp32/sendMessage';

export function NonverbalButton({
	id,
	emoji,
	description,
	isFavorited,
	data,
	setData,
}: NonverbalButtonProps) {
	const { user } = useContext(AppContext);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const { favoriteUserNonverbalMessage, unfavoriteUserNonverbalMessage } =
		getNonverbalMessage();
	const [isLoading, setIsLoading] = useState(false);

	async function speak(phrase: string) {
		const options = {};
		Speech.speak(phrase, options);
	}

	function openModal() {
		setIsModalVisible(true);
	}

	function closeModal() {
		setIsModalVisible(false);
	}

	async function handlePress() {
		openModal();
		speak(description);
		await sendMessage(user?.name, description, 'nonverbal-message');
	}

	async function handleFavorite() {
		setIsLoading(true);

		try {
			await favoriteUserNonverbalMessage(id, {
				headers: {
					Authorization: `Bearer ${user.token}`,
				},
			});

			setData(
				data.map((msg) => {
					if (msg.id === id) return { ...msg, is_favorited: true };
					return msg;
				})
			);
		} catch (error) {
			console.error('Erro ao favoritar:', error);
			Alert.alert('Erro', 'Não foi possível favoritar esta mensagem.');
		} finally {
			setIsLoading(false);
		}
	}

	async function handleUnfavorite() {
		setIsLoading(true);

		try {
			await unfavoriteUserNonverbalMessage(id, {
				headers: {
					Authorization: `Bearer ${user.token}`,
				},
			});

			setData(
				data.map((msg) => {
					if (msg.id === id) return { ...msg, is_favorited: false };
					return msg;
				})
			);
		} catch (error) {
			console.error('Erro ao desfavoritar:', error);
			Alert.alert('Erro', 'Não foi possível desfavoritar esta mensagem.');
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<TouchableOpacity
			style={{
				backgroundColor: colors.seaGreen,
				width: 140,
				height: 'auto',
				paddingBottom: 5,
				paddingHorizontal: 5,
				alignItems: 'center',
				marginTop: 12,
				marginBottom: 8,
				paddingTop: 5,
				borderRadius: 8,
			}}
			activeOpacity={0.9}
			onPress={handlePress}
		>
			<View
				style={{
					width: '90%',
					backgroundColor: colors.lightSeaGreen,
					borderRadius: 8,
					paddingBottom: 5,
				}}
			>
				<Text style={{ fontSize: 65, textAlign: 'center', marginBottom: -8 }}>
					{emoji}
				</Text>
				<View style={{ width: '100%' }}>
					{isFavorited ? (
						<TouchableOpacity
							style={{ alignItems: 'flex-end', paddingRight: 5 }}
							onPress={handleUnfavorite}
							disabled={isLoading}
						>
							{isLoading ? (
								<ActivityIndicator color={colors.gold} size={20} />
							) : (
								<Image source={require('@/assets/images/fill-star.png')} />
							)}
						</TouchableOpacity>
					) : (
						<TouchableOpacity
							style={{ alignItems: 'flex-end', paddingRight: 5 }}
							onPress={handleFavorite}
							disabled={isLoading}
						>
							{isLoading ? (
								<ActivityIndicator color={colors.gold} size={20} />
							) : (
								<Image source={require('@/assets/images/star.png')} />
							)}
						</TouchableOpacity>
					)}
				</View>
			</View>
			<Text
				style={{
					marginTop: 3,
					fontSize: 18,
					textTransform: 'uppercase',
					width: '100%',
					textAlign: 'center',
					fontWeight: 500,
				}}
			>
				{description}
			</Text>

			<NonverbalModal
				isVisible={isModalVisible}
				closeModal={closeModal}
				emoji={emoji}
				subtitle={description}
				buttonText={'Fechar'}
				buttonPress={closeModal}
			/>
		</TouchableOpacity>
	);
}
