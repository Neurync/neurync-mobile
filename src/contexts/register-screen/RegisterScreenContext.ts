import { Feather } from '@expo/vector-icons';
import { createContext } from 'react';

export type Step = 'form' | 'neurodivergence' | 'helps-and-dangers';

interface IRegisterScreenContext {
  currentStep: Step;
  setCurrentStep: (step: Step) => void;

  back: () => void;
  submit: () => void;

  // Form Step
  name: string;
  setName: (name: string) => void;
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  confirmPassword: string;
  setConfirmPassword: (confirmPassword: string) => void;

  // Neurodivergence Step
  neurodivergence: string;
  setNeurodivergence: (neurodivergence: string) => void;

  // Helps and Dangers Step
  helps: string[];
  setHelps: (helps: string[]) => void;
  dangers: string[];
  setDangers: (dangers: string[]) => void;
}

export const RegisterScreenContext = createContext<IRegisterScreenContext>({} as IRegisterScreenContext);