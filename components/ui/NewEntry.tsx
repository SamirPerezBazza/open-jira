import React, { ChangeEvent, FC, useContext, useState } from 'react';
import { Button, Box, TextField } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { EntriesContext } from '../context/entries';
import { UIContext } from '../context/ui';

export const NewEntry: FC = () => {
	const [inputValue, setInputValue] = useState('');
	const [touched, setTouched] = useState(false);

	const { addNewEntry } = useContext(EntriesContext);
	const { isAddingEntry, setIsAddingEntry } = useContext(UIContext);

	const onTextChange = (event: ChangeEvent<HTMLInputElement>) => {
		setInputValue(event.target.value);
	};

	const onSave = () => {
		if (inputValue.length === 0) return;
		addNewEntry(inputValue);
		setInputValue('');
		setTouched(false);
		setIsAddingEntry(false);
	};

	const onCancel = () => {
		setInputValue('');
		setTouched(false);
		setIsAddingEntry(false);
	};

	return (
		<Box
			sx={{
				marginBottm: 2,
				paddingX: 1,
			}}
		>
			{isAddingEntry ? (
				<>
					<TextField
						label='Nueva entrada'
						helperText={
							inputValue.length === 0 && touched && 'Ingrese un valor'
						}
						fullWidth
						autoFocus
						multiline
						sx={{ marginTop: 2, marginBottom: 1 }}
						error={inputValue.length === 0 && touched}
						value={inputValue}
						onChange={onTextChange}
						onBlur={() => setTouched(true)}
					/>
					<Box
						display='flex'
						justifyContent='space-between'
						alignItems='center'
						mb={2}
						onClick={onSave}
					>
						<Button variant='text' color='primary' onClick={onCancel}>
							Cancelar
						</Button>
						<Button
							variant='outlined'
							color='secondary'
							endIcon={<SaveIcon />}
						>
							Guardar
						</Button>
					</Box>
				</>
			) : (
				<Button
					variant='outlined'
					startIcon={<AddBoxIcon />}
					fullWidth
					onClick={() => setIsAddingEntry(true)}
				>
					Agregar Tarea
				</Button>
			)}
		</Box>
	);
};
