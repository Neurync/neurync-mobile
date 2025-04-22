import React, { useEffect, useState } from 'react';
import { View, Text, PermissionsAndroid, Platform } from 'react-native';
import { BleManager, type Device } from 'react-native-ble-plx';

const manager = new BleManager();

export default function BluetoothTest() {
	const [devices, setDevices] = useState<Device[]>([]); // Tipagem aqui

	useEffect(() => {
		const startScan = async () => {
			if (Platform.OS === 'android' && Platform.Version >= 23) {
				const granted = await PermissionsAndroid.request(
					PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
				);
				if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
					console.warn('Permissão de localização negada');
					return;
				}
			}

			manager.startDeviceScan(null, null, (error, device) => {
				if (error) {
					console.error('Erro ao escanear:', error);
					return;
				}

				if (device?.name?.includes('ESP')) {
					console.log('Dispositivo encontrado:', device.name);

					// Evita duplicados
					setDevices((prevDevices) => {
						const exists = prevDevices.find((d) => d.id === device.id);
						if (exists) return prevDevices;
						return [...prevDevices, device];
					});

					manager.stopDeviceScan();
				}
			});
		};

		startScan();

		// Limpa o scan ao desmontar o componente
		return () => {
			manager.stopDeviceScan();
			manager.destroy(); // boa prática
		};
	}, []);

	return (
		<View style={{ padding: 20 }}>
			<Text style={{ fontWeight: 'bold', marginBottom: 10 }}>
				Dispositivos encontrados:
			</Text>
			{devices.length === 0 && <Text>Nenhum dispositivo encontrado ainda...</Text>}
			{devices.map((device) => (
				<Text key={device.id}>
					{device.name || 'Sem nome'} ({device.id})
				</Text>
			))}
		</View>
	);
}
