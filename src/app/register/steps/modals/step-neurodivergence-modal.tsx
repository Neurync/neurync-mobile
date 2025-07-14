import { DefaultModal } from '@/components/modals/default-modal';

export type ModalAnswer = 'yes' | 'no';

interface IStepNeurodivergenceProps {
	isVisible: boolean;
	setIsVisible: (isVisible: boolean) => void;
	setModalAnswer: (answer: ModalAnswer) => void;
}

export function StepNeurodivergenceModal({
	isVisible,
	setIsVisible,
	setModalAnswer,
}: IStepNeurodivergenceProps) {
	return (
		<DefaultModal
			isVisible={isVisible}
			closeModal={() => setIsVisible(false)}
			icon={'help-circle'}
			firstText={'Atenção!'}
			secondText={'Você tem certeza que não vai informar sua neurodivergência?'}
			firstButtonText={'Sim'}
			firstButtonPress={() => setModalAnswer('yes')}
			secondButtonText={'Não'}
			secondActionButtonPress={() => setModalAnswer('no')}
		/>
	);
}
