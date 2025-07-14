import { DefaultModal } from '@/components/modals/default-modal';

interface IStepFormProps {
	secondText: string;
	isVisible: boolean;
	setIsVisible: (isVisible: boolean) => void;
}

export function StepFormModal({
	secondText,
	isVisible,
	setIsVisible,
}: IStepFormProps) {
	function closeModal() {
		setIsVisible(false);
	}

	return (
		<DefaultModal
			isVisible={isVisible}
			closeModal={() => setIsVisible(false)}
			icon={'alert-circle'}
			firstText={'Ops!'}
			secondText={secondText}
			firstButtonText={'Ok'}
			firstButtonPress={closeModal}
		/>
	);
}
