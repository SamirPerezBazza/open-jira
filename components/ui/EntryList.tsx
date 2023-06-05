import { List, Paper } from '@mui/material';
import React, { DragEvent, FC, useContext, useMemo } from 'react';
import { EntryCard } from './';
import { EntryStatus } from '@/interfaces';
import { EntriesContext } from '../context/entries';
import { UIContext } from '../context/ui';

import styles from './EntryList.module.css';

interface EntryListProps {
	status: EntryStatus;
}

export const EntryList: FC<EntryListProps> = ({ status }) => {
	const { entries, updateEntry } = useContext(EntriesContext);
	const { isDragging, endDragging } = useContext(UIContext);

	const entriesByStatus = useMemo(
		() => entries.filter((entry) => entry.status === status),
		[entries]
	);

	const allowDrop = (event: DragEvent<HTMLDivElement>) => {
		event.preventDefault();
	};

	const onDropEntry = (event: DragEvent<HTMLDivElement>) => {
		const id = event.dataTransfer.getData('text');
		const entry = entries.find((entry) => entry._id === id)!;

		updateEntry({ ...entry, status });
		endDragging();
	};

	return (
		<div
			className={isDragging ? styles.dragging : ''}
			onDrop={onDropEntry}
			onDragOver={allowDrop}
		>
			<Paper
				sx={{
					height: 'calc(100vh - 250px)',
					overflowY: 'auto',
					backgroundColor: 'transparent',
					padding: '1px 5px',
				}}
			>
				<List sx={{ opacity: isDragging ? 0.2 : 1, transition: 'all .3s' }}>
					{entriesByStatus.map((entry) => (
						<EntryCard key={entry._id} entry={entry} />
					))}
				</List>
			</Paper>
		</div>
	);
};
