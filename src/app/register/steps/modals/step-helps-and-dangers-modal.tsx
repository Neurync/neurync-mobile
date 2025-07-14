import { DefaultModal } from '@/components/modals/default-modal';

export type ModalAnswer = 'yes' | 'no' | undefined;

interface IStepHelpsAndDangersProps {
	secondText: string;
	isVisible: boolean;
	setIsVisible: (isVisible: boolean) => void;
	setModalAnswer: (answer: ModalAnswer) => void;
}

export function StepHelpsAndDangersModal({
	secondText,
	isVisible,
	setIsVisible,
	setModalAnswer,
}: IStepHelpsAndDangersProps) {
	return (
		<DefaultModal
			isVisible={isVisible}
			closeModal={() => setIsVisible(false)}
			icon={'alert-circle'}
			firstText={'Ops!'}
			secondText={secondText}
			firstButtonText={'Sim'}
			firstButtonPress={() => setModalAnswer('yes')}
			secondButtonText={'Não'}
			secondActionButtonPress={() => setModalAnswer('no')}
		/>
	);
}
