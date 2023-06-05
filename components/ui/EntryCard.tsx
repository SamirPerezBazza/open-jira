import React, { DragEvent, FC, useContext } from 'react';
import {
	Card,
	CardActionArea,
	CardActions,
	CardContent,
	Typography,
} from '@mui/material';
import { Entry } from '@/interfaces';
import { UIContext } from '../context/ui';

interface EntryCardProps {
	entry: Entry;
}

export const EntryCard: FC<EntryCardProps> = ({ entry }) => {
	const { startDragging, endDragging } = useContext(UIContext);

	const onDragStart = (event: DragEvent) => {
		event.dataTransfer.setData('text', entry._id);
		startDragging();
	};

	const onDragEnd = (event: DragEvent) => {
		endDragging();
	};

	return (
		<Card
			sx={{
				marginBottom: 1,
			}}
			draggable
			onDragStart={onDragStart}
			onDragEnd={onDragEnd}
		>
			<CardActionArea>
				<CardContent>
					<Typography whiteSpace='pre-line'>
						{entry.description}
					</Typography>
				</CardContent>

				<CardActions
					sx={{
						display: 'flex',
						justifyContent: 'flex-end',
						paddingRight: 2,
					}}
				>
					<Typography variant='body2'>Hace 30 min</Typography>
				</CardActions>
			</CardActionArea>
		</Card>
	);
};
