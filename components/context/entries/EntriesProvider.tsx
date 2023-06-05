import { FC, useReducer, PropsWithChildren } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { EntriesContext, entriesReducer } from './';
import { Entry } from '@/interfaces';

export interface EntriesState {
	entries: Entry[];
}

const ENTRIES_INITIAL_STATE: EntriesState = {
	entries: [
		{
			_id: uuidv4(),
			description: 'Pendiente: This is the first entry',
			status: 'pending',
			createdAt: Date.now(),
		},
		{
			_id: uuidv4(),
			description: 'En-progreso: This is the Second entry',
			status: 'in-Progress',
			createdAt: Date.now() - 1000,
		},
		{
			_id: uuidv4(),
			description: 'Finalizada: This is the third entry',
			status: 'finished',
			createdAt: Date.now() - 10000,
		},
	],
};

export const EntriesProvider: FC<PropsWithChildren> = ({ children }) => {
	const [entriesState, entriesDispatch] = useReducer(
		entriesReducer,
		ENTRIES_INITIAL_STATE
	);

	const addNewEntry = (description: string) => {
		const newEntry: Entry = {
			_id: uuidv4(),
			description,
			status: 'pending',
			createdAt: Date.now(),
		};

		entriesDispatch({ type: '[Entry] Add Entry', payload: newEntry });
	};

	const updateEntry = (entry: Entry) => {
		entriesDispatch({ type: '[Entry] Update Entry', payload: entry });
	};

	return (
		<EntriesContext.Provider
			value={{
				...entriesState,
				// Methods
				addNewEntry,
				updateEntry,
			}}
		>
			{children}
		</EntriesContext.Provider>
	);
};
