import { Button } from '@/components/button';
import { Input } from '@/components/input';
import { InputWithSuggestions } from '@/components/input-with-sugestions';
import { Logo } from '@/components/logo';
import { QrCodeModal } from '@/components/modals/qr-code-modal';
import { colors } from '@/constants/colors';
import { fontSize } from '@/constants/fontSize';
import { screenStyle } from '@/constants/screen-style';
import { AppContext } from '@/contexts/AppContext';
import { QRDCODE_WEB_URL } from '@/env';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useContext, useState } from 'react';
import {
	FlatList,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';

const styles = StyleSheet.create({
	container: {
		marginTop: 20,
		display: 'flex',
		alignItems: 'flex-start',
		paddingTop: 5,
		paddingBottom: 5,
		paddingHorizontal: 12,
		width: '100%',
		gap: 12,
	},
	username: {
		fontSize: 21,
		color: colors.black,
		textAlign: 'left',
		fontWeight: 400,
		textTransform: 'uppercase',
		width: '100%',
	},
	useremail: {
		fontSize: 20,
		color: colors.black,
		textAlign: 'left',
		fontWeight: 400,
		width: '100%',
	},
	userInfoContainer: {
		width: '50%',
		borderWidth: 2,
		borderRadius: 8,
		borderColor: colors.seaGreen,
		height: '100%',
		paddingLeft: 5,
		paddingBottom: 12,
	},
	userInfoTitle: {
		fontSize: 20,
		color: colors.seaGreen,
		textAlign: 'center',
		width: '100%',
		fontWeight: 500,
		paddingVertical: 5,
	},
	userHelpOrDangerList: {
		height: 90,
	},
	userHelpOrDanger: {
		fontSize: fontSize.lg,
		paddingLeft: 5,
		color: colors.gray,
	},
	qrCodeButton: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: '95%',
		borderWidth: 1,
		borderColor: colors.seaGreen,
		borderRadius: 10,
		padding: 6,
	},
	qrCodeButtonText: {
		fontSize: 20,
		color: colors.seaGreen,
		textAlign: 'left',
		fontWeight: 500,
	},
});

export default function EditProfile() {
	const router = useRouter();
	const { user, setUser } = useContext(AppContext);

	return (
		<View style={screenStyle.container}>
			<Logo />
			<View
				style={{
					flexDirection: 'row',
					justifyContent: 'center',
					alignItems: 'center',
					width: '100%',
					gap: 5,
				}}
			>
				<TouchableOpacity onPress={() => router.navigate('/(tabs)/user')}>
					<Feather name="arrow-left-circle" size={25} color={colors.seaGreen} />
				</TouchableOpacity>
				<Text style={screenStyle.title}>Editar seu perfil</Text>
			</View>

			<View style={styles.container}>
				<Input placeholder="Nome" />
				<InputWithSuggestions
					value={''}
					onChange={() => console.log()}
					placeholder="Digite sua neurodivergência"
					options={[
						'TEA',
						'TDAH',
						'Dislexia',
						'Dispraxia',
						'Sindrome de Tourette',
						'TOC',
						'Superdotação',
						'Discalculia',
						'Disgrafia',
						'Esquizofrenia',
					]}
				/>

				<View
					style={{
						flexDirection: 'row',
						alignItems: 'flex-start',
						justifyContent: 'flex-start',
						padding: 8,
						width: '100%',
					}}
				>
					<View
						style={[
							styles.userInfoContainer,
							{ borderTopRightRadius: 0, borderBottomRightRadius: 0 },
						]}
					>
						<Text style={styles.userInfoTitle}>CONFORTOS</Text>

						<FlatList
							data={user?.helps}
							keyExtractor={(help) => help.id}
							renderItem={({ item: help }) => (
								<Text style={styles.userHelpOrDanger} numberOfLines={1}>
									{help.about}
								</Text>
							)}
							style={styles.userHelpOrDangerList}
						/>
					</View>

					<View
						style={[
							styles.userInfoContainer,
							{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 },
						]}
					>
						<Text style={styles.userInfoTitle}>GATILHOS</Text>

						<FlatList
							data={user?.dangers}
							keyExtractor={(danger) => danger.id}
							renderItem={({ item: danger }) => (
								<Text style={styles.userHelpOrDanger} numberOfLines={1}>
									{danger.about}
								</Text>
							)}
							style={styles.userHelpOrDangerList}
						/>
					</View>
				</View>
			</View>

			<Button style={{ position: 'absolute', bottom: '10%' }}>
				<Button.Text>Salvar</Button.Text>
			</Button>
		</View>
	);
}
