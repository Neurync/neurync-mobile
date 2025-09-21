import { Button } from '@/components/button';
import { DropdownEditDangerAndHelp } from '@/components/dropdown-edit-danger-and-help';
import { Logo } from '@/components/logo';
import { AddDangerOrHelpModal } from '@/components/modals/add-danger-or-help-modal';
import { DefaultModal as ConfirmModal } from '@/components/modals/default-modal';
import { colors } from '@/constants/colors';
import { fontSize } from '@/constants/fontSize';
import { screenStyle } from '@/constants/screen-style';
import { AppContext } from '@/contexts/AppContext';
import { getDangers } from '@/services/api/endpoints/dangers/dangers';
import type { GetUserDangers200Item } from '@/services/api/schemas/getUserDangers200Item';
import { dangersStorage } from '@/storage/dangers-storage'; // Assumindo que você tenha isso
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useContext, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export default function EditDangers() {
	const { user, dangers, setDangers } = useContext(AppContext);
	const { createManyUserDanger, deleteUserDangers, getUserDangers } =
		getDangers();

	if (!user) {
		router.navigate('/login');
		return <></>;
	}

	const [newDangers, setNewDangers] = useState<string[]>([]);
	const [dangersIdToRemove, setDangersIdToRemove] = useState<string[]>([]);

	const [isAddDangerModalVisible, setIsAddDangerModalVisible] = useState(false);
	const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);

	function addNewDanger(danger: string) {
		setNewDangers([...newDangers, danger]);
		setDangers([
			...dangers,
			{
				id: `new-danger-${newDangers.length}`,
				about: danger,
				// biome-ignore lint/style/noNonNullAssertion: <explanation>
				userId: user!.id,
			},
		]);
	}

	function addDangerToRemove(danger: GetUserDangers200Item) {
		setDangersIdToRemove([...dangersIdToRemove, danger.id]);
		setDangers(dangers.filter((d) => d.id !== danger.id));
	}

	function handleSubmit() {
		setIsConfirmModalVisible(true);
	}

	async function confirmUpdates() {
		if (newDangers.length > 0) {
			try {
				await createManyUserDanger(
					{ dangers: newDangers, userId: user.id },
					{
						headers: {
							Authorization: `Bearer ${user.token}`,
						},
					}
				);
			} catch (e) {
				console.error(e);
			}
		}

		if (dangersIdToRemove.length > 0) {
			try {
				await deleteUserDangers(
					{
						dangers: dangersIdToRemove,
					},
					{
						headers: {
							Authorization: `Bearer ${user.token}`,
						},
					}
				);
			} catch (e) {
				console.error(e);
			}
		}

		const reloadedDangers = (
			await getUserDangers(user?.id, {
				headers: {
					Authorization: `Bearer ${user?.token}`,
				},
			})
		).data.map((d) => {
			return { ...d, userId: user.id };
		});

		setDangers(reloadedDangers);
		await dangersStorage.save(dangers); // Assumindo que você tenha isso

		setIsConfirmModalVisible(false);
		router.navigate('/(tabs)/user');
	}

	return (
		<View style={screenStyle.container}>
			<Logo />
			<View
				style={{
					flexDirection: 'row',
					justifyContent: 'center',
					alignItems: 'center',
					width: '100%',
					gap: 5,
				}}
			>
				<TouchableOpacity onPress={() => router.back()}>
					<Feather name="arrow-left-circle" size={25} color={colors.seaGreen} />
				</TouchableOpacity>
				<Text style={screenStyle.title}>Editar seus gatilhos</Text>
			</View>

			<View style={{ width: '90%' }}>
				<DropdownEditDangerAndHelp
					data={dangers}
					onRemove={addDangerToRemove}
					emptyComponentLabel="Nenhum gatilho encontrado"
				/>
			</View>

			<TouchableOpacity
				style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}
				onPress={() => setIsAddDangerModalVisible(true)}
			>
				<Feather name="plus-circle" size={30} color={colors.seaGreen} />
				<Text style={{ color: colors.seaGreen, fontSize: fontSize.lg }}>
					Adicionar
				</Text>
			</TouchableOpacity>

			<Button
				style={{ position: 'absolute', bottom: '10%' }}
				onPress={handleSubmit}
			>
				<Button.Text>Salvar</Button.Text>
			</Button>

			<AddDangerOrHelpModal
				isVisible={isAddDangerModalVisible}
				setIsVisible={setIsAddDangerModalVisible}
				type="danger"
				addData={addNewDanger}
			/>

			<ConfirmModal
				isVisible={isConfirmModalVisible}
				closeModal={() => setIsConfirmModalVisible(false)}
				firstText="Atenção"
				secondText={'Realmente deseja salvar as alterações?'}
				firstButtonText={'Sim'}
				firstButtonPress={async () => await confirmUpdates()}
				secondButtonText="Não"
				secondActionButtonPress={() => setIsConfirmModalVisible(false)}
			/>
		</View>
	);
}
