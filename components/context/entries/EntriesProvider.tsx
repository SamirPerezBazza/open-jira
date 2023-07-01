import { FC, useReducer, PropsWithChildren, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { EntriesContext, entriesReducer } from './';
import { Entry } from '@/interfaces';
import { entriesApi } from '@/api';

export interface EntriesState {
	entries: Entry[];
}

const ENTRIES_INITIAL_STATE: EntriesState = {
	entries: [],
};

export const EntriesProvider: FC<PropsWithChildren> = ({ children }) => {
	const [entriesState, entriesDispatch] = useReducer(
		entriesReducer,
		ENTRIES_INITIAL_STATE
	);

	const addNewEntry = async (description: string) => {
		const { data } = await entriesApi.post<Entry>('/entries', {
			description,
		});

		entriesDispatch({ type: '[Entry] Add Entry', payload: data });
	};

	const updateEntry = async (entry: Entry) => {
		try {
			const { _id, description, status } = entry;

			const { data } = await entriesApi.put<Entry>(`/entries/${_id}`, {
				description,
				status,
			});

			entriesDispatch({ type: '[Entry] Update Entry', payload: data });
		} catch (error) {}
	};

	const refreshEntries = async () => {
		const { data } = await entriesApi.get('/entries');

		entriesDispatch({ type: '[Entry] Refresh Data', payload: data.entries });
	};

	useEffect(() => {
		refreshEntries();
	}, []);

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
