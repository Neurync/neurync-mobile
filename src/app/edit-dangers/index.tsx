import { router } from 'expo-router';
import { TouchableOpacity, Text } from 'react-native';

export default function EditDangers() {
	return (
		<TouchableOpacity onPress={() => router.back()}>
			<Text style={{ color: '#fff', fontSize: 34 }}>Voltar</Text>
		</TouchableOpacity>
	);
}
