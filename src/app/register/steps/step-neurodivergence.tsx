import { styles } from '../styles';
import { InputWithSuggestions } from '@/components/input-with-sugestions';
import { Text, View } from 'react-native';

type StepNeurodivergenceProps = {
	neurodivergence: string;
	setNeurodivergence: (neurodivergence: string) => void;
};

export function StepNeurodivergence({
	neurodivergence,
	setNeurodivergence,
}: StepNeurodivergenceProps) {
	return (
		<View style={styles.stepContainer}>
			<View style={{ width: '100%', gap: 5 }}>
				<Text style={styles.title}>Selecione sua neurodivergência</Text>
				<InputWithSuggestions
					value={neurodivergence}
					onChange={setNeurodivergence}
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
			</View>
		</View>
	);
}
