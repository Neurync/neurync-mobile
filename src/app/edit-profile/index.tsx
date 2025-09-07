import { Button } from '@/components/button';
import { Dropdown } from '@/components/dropdown';
import { Input } from '@/components/input';
import { InputWithSuggestions } from '@/components/input-with-sugestions';
import { Logo } from '@/components/logo';
import { AddDangerOrHelpModal } from '@/components/modals/add-danger-or-help-modal';
import { QrCodeModal } from '@/components/modals/qr-code-modal';
import { TextArea } from '@/components/textarea';
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
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { Link } from '@/components/link';

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
	const { user, setUser, helps: hs, dangers: ds } = useContext(AppContext);

	if (!user) {
		router.navigate('/login');
		return;
	}

	const [name, setName] = useState(user.name);
	const [neurodivergence, setNeurodivergence] = useState(
		user?.neurodivergence ?? ''
	);
	const [about, setAbout] = useState(user.about ?? '');
	const [helps, setHelps] = useState(hs.map((help) => help.about) ?? []);
	const [dangers, setDangers] = useState(ds.map((danger) => danger.about) ?? []);

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
				<Input placeholder="Nome" value={name} onChangeText={setName} />

				<InputWithSuggestions
					value={neurodivergence}
					onChange={(text) => setNeurodivergence(text)}
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

				<TextArea
					placeholder="Sobre"
					value={about}
					multiline
					numberOfLines={20}
					onChangeText={setAbout}
				/>

				<TouchableOpacity
					onPress={() => router.navigate('/edit-helps')}
					style={{
						padding: 5,
						width: '100%',
						flexDirection: 'row',
						justifyContent: 'space-between',
						borderWidth: 1,
						borderColor: colors.seaGreen,
						borderRadius: 10,
					}}
				>
					<Text style={{ color: colors.seaGreen, fontSize: fontSize.lg }}>
						Editar Confortos
					</Text>
					<Feather name="edit" color={colors.seaGreen} size={20} />
				</TouchableOpacity>

				<TouchableOpacity
					onPress={() => router.navigate('/edit-dangers')}
					style={{
						padding: 5,
						width: '100%',
						flexDirection: 'row',
						justifyContent: 'space-between',
						borderWidth: 1,
						borderColor: colors.seaGreen,
						borderRadius: 10,
					}}
				>
					<Text style={{ color: colors.seaGreen, fontSize: fontSize.lg }}>
						Editar Gatilhos
					</Text>
					<Feather name="edit" color={colors.seaGreen} size={20} />
				</TouchableOpacity>
			</View>

			<Button style={{ position: 'absolute', bottom: '10%' }}>
				<Button.Text>Salvar</Button.Text>
			</Button>
		</View>
	);
}
