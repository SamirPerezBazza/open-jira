import { GetServerSideProps } from 'next';
import { Layout } from '@/components/layouts';
import {
	capitalize,
	Card,
	CardHeader,
	Grid,
	CardContent,
	TextField,
	CardActions,
	Button,
	FormControl,
	FormLabel,
	RadioGroup,
	FormControlLabel,
	Radio,
	IconButton,
} from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import React, { useState, ChangeEvent, useMemo, FC, useContext } from 'react';
import { Entry, EntryStatus } from '@/interfaces';
import { dbEntries } from '@/database';
import { EntriesContext } from '@/components/context/entries';
import { dateFunctions } from '@/utils';

interface Props {
	entry: Entry;
}

const validStatus: EntryStatus[] = ['pending', 'in-Progress', 'finished'];

const EntryPage: FC<Props> = ({ entry }) => {
	const { updateEntry } = useContext(EntriesContext);
	const [inputValue, setInputValue] = useState<string>(entry.description);
	const [status, setStatus] = useState<EntryStatus>(entry.status);
	const [touched, setTouched] = useState<boolean>(false);

	const isNotValid = useMemo(
		() => inputValue.length <= 0 && touched,
		[inputValue, touched]
	);

	const onTextChange = (event: ChangeEvent<HTMLInputElement>) => {
		setInputValue(event.target.value);
	};

	const onStatusChange = (event: ChangeEvent<HTMLInputElement>) => {
		setStatus(event.target.value as EntryStatus);
	};

	const onSave = () => {
		if (inputValue.trim().length === 0) return;

		const updatedEntry: Entry = {
			...entry,
			status,
			description: inputValue,
		};

		updateEntry(updatedEntry, true);
	};

	return (
		<Layout title={`${inputValue.substring(0, 20)}...`}>
			<Grid container justifyContent='center' sx={{ marginTop: 2 }}>
				<Grid item xs={12} sm={8} md={6}>
					<Card>
						<CardHeader
							title={`Entrada`}
							subheader={`${dateFunctions.getFormatDistanceToNow(
								entry.createdAt
							)}`}
						/>

						<CardContent>
							<TextField
								sx={{ marginTop: 2, marginBottom: 1 }}
								fullWidth
								placeholder='Editar la entrada'
								multiline
								label='Editar entrada'
								autoFocus
								value={inputValue}
								onChange={onTextChange}
								helperText={isNotValid && 'Ingrese un valor'}
								onBlur={() => setTouched(true)}
								error={isNotValid}
							/>

							<FormControl>
								<FormLabel>Estado</FormLabel>
								<RadioGroup
									row
									value={status}
									onChange={onStatusChange}
								>
									{validStatus.map((option) => (
										<FormControlLabel
											key={option}
											value={option}
											control={<Radio />}
											label={capitalize(option)}
										/>
									))}
								</RadioGroup>
							</FormControl>
						</CardContent>

						<CardActions>
							<Button
								startIcon={<SaveOutlinedIcon />}
								variant='contained'
								fullWidth
								onClick={onSave}
								disabled={inputValue.length <= 0}
							>
								Save
							</Button>
						</CardActions>
					</Card>
				</Grid>
			</Grid>

			<IconButton
				sx={{
					position: 'fixed',
					bottom: 30,
					right: 30,
					backgroundColor: 'red',
				}}
			>
				<DeleteOutlineOutlinedIcon />
			</IconButton>
		</Layout>
	);
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
	// since we are in the server here we can do the direct request

	const { id } = params as { id: string };

	const entry = await dbEntries.getEntryById(id);

	if (!entry) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		};
	}

	return {
		// props sent to the component above
		props: {
			entry,
		},
	};
};

export default EntryPage;
