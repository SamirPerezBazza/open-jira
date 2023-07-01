import { NextPage } from 'next';

import { Layout } from '@/components/layouts';
import { Card, CardContent, CardHeader, Grid } from '@mui/material';
import { EntryList, NewEntry } from '@/components/ui';

const Home: NextPage = () => {
	return (
		<Layout title='Home - OpenJira'>
			<Grid container spacing={2}>
				<Grid item xs={12} sm={4}>
					<Grid item>
						<Card
							sx={{
								height: 'calc(100vh - 85px)',
							}}
						>
							<CardHeader title='Pendientes' />
							{/* Agregar nueva entrada */}
							<NewEntry />
							<EntryList status='pending' />
						</Card>
					</Grid>
				</Grid>

				<Grid item xs={12} sm={4}>
					<Grid item>
						<Card
							sx={{
								height: 'calc(100vh - 85px)',
							}}
						>
							<CardHeader title='En Progreso' />

							<EntryList status='in-Progress' />
						</Card>
					</Grid>
				</Grid>

				<Grid item xs={12} sm={4}>
					<Grid item>
						<Card
							sx={{
								height: 'calc(100vh - 85px)',
							}}
						>
							<CardHeader title='Completadas' />
							<EntryList status='finished' />
						</Card>
					</Grid>
				</Grid>
			</Grid>
		</Layout>
	);
};

export default Home;
