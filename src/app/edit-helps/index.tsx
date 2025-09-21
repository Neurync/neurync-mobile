import { Button } from '@/components/button';
import { DropdownEditDangerAndHelp } from '@/components/dropdown-edit-danger-and-help';
import { Logo } from '@/components/logo';
import { AddDangerOrHelpModal } from '@/components/modals/add-danger-or-help-modal';
import { DefaultModal as ConfirmModal } from '@/components/modals/default-modal';
import { colors } from '@/constants/colors';
import { fontSize } from '@/constants/fontSize';
import { screenStyle } from '@/constants/screen-style';
import { AppContext } from '@/contexts/AppContext';
import { getHelps } from '@/services/api/endpoints/helps/helps';
import type { GetUserHelps200Item } from '@/services/api/schemas/getUserHelps200Item';
import { helpsStorage } from '@/storage/helps-storage';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useContext, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export default function EditHelps() {
	const { user, helps, setHelps } = useContext(AppContext);
	const { createManyUserHelp, deleteUserHelps, getUserHelps } = getHelps();

	if (!user) {
		router.navigate('/login');
		return <></>;
	}

	const [newHelps, setNewHelps] = useState<string[]>([]);
	const [helpsIdToRemove, setHelpsIdToRemove] = useState<string[]>([]);

	const [isAddHelpModalVisible, setIsAddHelpModalVisible] = useState(false);
	const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);

	function addNewHelp(help: string) {
		setNewHelps([...newHelps, help]);
		setHelps([
			...helps,
			{
				id: `new-help-${newHelps.length}`,
				about: help,
				// biome-ignore lint/style/noNonNullAssertion: <explanation>
				userId: user!.id,
			},
		]);
	}

	function addHelpToRemove(help: GetUserHelps200Item) {
		setHelpsIdToRemove([...helpsIdToRemove, help.id]);
		setHelps(helps.filter((h) => h.id !== help.id));
	}

	function handleSubmit() {
		setIsConfirmModalVisible(true);
	}

	async function confirmUpdates() {
		if (newHelps.length > 0) {
			try {
				await createManyUserHelp(
					{ helps: newHelps, userId: user.id },
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

		if (helpsIdToRemove.length > 0) {
			try {
				await deleteUserHelps(
					{
						helps: helpsIdToRemove,
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

		const reloadedHelps = (
			await getUserHelps(user?.id, {
				headers: {
					Authorization: `Bearer ${user?.token}`,
				},
			})
		).data.map((h) => {
			return { ...h, userId: user.id };
		});

		setHelps(reloadedHelps);
		await helpsStorage.save(helps);

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
				<Text style={screenStyle.title}>Editar seus confortos</Text>
			</View>

			<View style={{ width: '90%' }}>
				<DropdownEditDangerAndHelp
					data={helps}
					onRemove={addHelpToRemove}
					emptyComponentLabel="Nenhum conforto encontrado"
				/>
			</View>

			<TouchableOpacity
				style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}
				onPress={() => setIsAddHelpModalVisible(true)}
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
				isVisible={isAddHelpModalVisible}
				setIsVisible={setIsAddHelpModalVisible}
				type="help"
				addData={addNewHelp}
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
