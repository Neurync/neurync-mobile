import { AlertButton } from '@/components/alert-button';
import { NonverbalButton } from '@/components/nonverbal-button';
import { NonverbalHeader } from '@/components/nonverbal-header';
import { colors } from '@/constants/colors';
import { screenStyle } from '@/constants/screen-style';
import { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { getNonverbalMessage } from '@/services/api/endpoints/nonverbal-message/nonverbal-message';
import type { GetUserNonverbalMessages200Item } from '@/services/api/schemas';
import { AppContext } from '@/contexts/AppContext';

export default function Problems() {
	const { getUserFavoritedsNonverbalMessages } = getNonverbalMessage();

	const { user } = useContext(AppContext);
	const [data, setData] = useState<GetUserNonverbalMessages200Item[]>([]);
	const [isLoading, setIsLoading] = useState(false);

	async function loadMessages() {
		setIsLoading(true);

		const response = await getUserFavoritedsNonverbalMessages({
			headers: {
				Authorization: `Bearer ${user?.token}`,
			},
		});

		if (!response) return setData([]);

		setData(response.data);
		setIsLoading(false);
	}

	useEffect(() => {
		loadMessages();
	}, []);

	return (
		<View
			style={{
				backgroundColor: colors.white,
				height: '100%',
				width: '100%',
				...screenStyle,
			}}
		>
			<AlertButton style={{ bottom: '10%' }} />
			<NonverbalHeader data={data} setData={setData} />

			<View style={{ width: '100%', paddingTop: 10 }}>
				<Text style={screenStyle.title}>Favoritos</Text>

				{isLoading ? (
					<View style={{ height: '100%', alignItems: 'center', marginTop: '50%' }}>
						<ActivityIndicator size={40} color={colors.seaGreen} />
					</View>
				) : (
					<ScrollView
						contentContainerStyle={{
							paddingTop: 5,
							width: '100%',
							display: 'flex',
							flexWrap: 'wrap',
							flexDirection: 'row',
							justifyContent: 'space-evenly',
							alignItems: 'flex-start',
							paddingBottom: 50, // Adicionado para não esconder itens atrás da barra inferior
						}}
						style={{ maxHeight: '85%' }}
					>
						{data.map(({ id, emoji_icon, content, is_favorited }) => (
							<NonverbalButton
								key={id}
								id={id}
								emoji={emoji_icon}
								description={content}
								isFavorited={is_favorited}
								data={data}
								setData={setData}
							/>
						))}
					</ScrollView>
				)}
			</View>

			<View
				style={{
					backgroundColor: colors.seaGreen,
					width: '100%',
					height: '5%',
					position: 'absolute',
					bottom: 0,
				}}
			/>
		</View>
	);
}
