import { RegisterScreenContext, type Step } from './RegisterScreenContext';
import { type ReactNode, useContext, useState } from 'react';

export function RegisterScreenProvider({ children }: { children: ReactNode }) {
	// Screen States
	const [currentStep, setCurrentStep] = useState<Step>('form');

	// Form Step States
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	// Neurodivergence Step States
	const [neurodivergence, setNeurodivergence] = useState<string>('');

	// Helps And Dangers Step States
	const [helps, setHelps] = useState<string[]>([]);
	const [dangers, setDangers] = useState<string[]>([]);

	function back() {
		const previousSteps: Record<Step, Step | null> = {
			form: null,
			neurodivergence: 'form',
			'helps-and-dangers': 'neurodivergence',
		};

		const newStep = previousSteps[currentStep];

		if (!newStep) throw new Error("Unknown register step on 'back function'.");

		setCurrentStep(newStep);
	}

	function submit() {
		const nextSteps: Record<Step, Step | VoidFunction> = {
			form: 'neurodivergence',
			neurodivergence: 'helps-and-dangers',
			'helps-and-dangers': () => {},
		};

		const newStep = nextSteps[currentStep];

		if (!newStep) throw new Error("Unknown register step on 'back function'.");

		if (typeof newStep === 'function') {
			return newStep();
		}

		setCurrentStep(newStep);
	}

	return (
		<RegisterScreenContext.Provider
			value={{
				currentStep,
				setCurrentStep,
				submit,
				back,
				name,
				setName,
				email,
				setEmail,
				password,
				setPassword,
				confirmPassword,
				setConfirmPassword,
				neurodivergence,
				setNeurodivergence,
				helps,
				setHelps,
				dangers,
				setDangers,
			}}
		>
			{children}
		</RegisterScreenContext.Provider>
	);
}

export const useRegisterScreenContext = () => useContext(RegisterScreenContext);
