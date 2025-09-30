import { ESP32_IP } from "@/env";
import { Alert } from "react-native";


export async function sendMessage(username: string, message: string, route: 'question' | 'nonverbal-message') {
  try {
    const response = await fetch(`http://${ESP32_IP}/${route}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `username=${encodeURIComponent(
        username
      )}&message=${encodeURIComponent(message)}`,
    });

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    return response;

  } catch (error) {
    console.error('Erro ao enviar alerta:', error);

    let errorMessage =
      'Por favor, verifique se está conectado na rede e tente novamente.';

    if (
      error instanceof TypeError &&
      /network request failed/i.test(error.message)
    ) {
      errorMessage =
        'Não foi possível conectar ao dispositivo. Verifique se está na mesma rede Wi-Fi e tente novamente.';
    }

    if (error instanceof Error && /HTTP Error/i.test(error.message)) {
      errorMessage = 'O servidor respondeu com erro. Tente novamente mais tarde.';
    }

    Alert.alert('Erro de conexão', errorMessage);
  }
}