import { AlertButton } from '@/components/alert-button';
import { NonverbalButton } from '@/components/nonverbal-button';
import { NonverbalHeader } from '@/components/nonverbal-header';
import { colors } from '@/constants/colors';
import { screenStyle } from '@/constants/screen-style';
import { ScrollView, Text, View } from 'react-native';
import { nonverbalButtonData } from './data';
import { useState } from 'react';

export default function Problems() {
	const [data, setData] = useState(nonverbalButtonData);

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

			<ScrollView style={{ width: '100%', paddingVertical: 10 }}>
				<Text style={screenStyle.title}>Problemas e necessidades</Text>

				<View
					style={{
						paddingTop: 5,
						paddingBottom: 50,
						width: '100%',
						display: 'flex',
						flexWrap: 'wrap',
						flexDirection: 'row',
						justifyContent: 'space-evenly',
						alignItems: 'flex-start',
					}}
				>
					{data.map(({ emoji, description, isFavorited }) => (
						<NonverbalButton
							key={emoji}
							emoji={emoji}
							description={description}
							isFavorited={isFavorited}
						/>
					))}
				</View>
			</ScrollView>

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
