import React, { useEffect, useState } from 'react';
import { View, Text, Button, TextInput } from 'react-native';

const ESP32_IP = 'http://192.168.4.1'; // IP local do seu ESP

export default function WifiTest() {
	const [msg, setMsg] = useState('');
	const [input, setInput] = useState('');

	const fetchData = async () => {
		const res = await fetch(`${ESP32_IP}/ping`);
		const text = await res.text();
		setMsg(text);
	};

	const sendData = async () => {
		await fetch(`${ESP32_IP}/data`, {
			method: 'POST',
			headers: { 'Content-Type': 'text/plain' },
			body: input,
		});
		setInput('');
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<View style={{ padding: 20 }}>
			<Text>Resposta do ESP32:</Text>
			<Text style={{ marginBottom: 20 }}>{msg}</Text>

			<TextInput
				value={input}
				onChangeText={setInput}
				placeholder="Digite algo para o ESP"
				style={{
					borderWidth: 1,
					borderColor: '#ccc',
					padding: 10,
					marginBottom: 10,
				}}
			/>
			<Button title="Enviar para o ESP32" onPress={sendData} />
		</View>
	);
}
