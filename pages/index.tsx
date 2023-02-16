import { NextPage } from 'next';

import { Typography } from '@mui/material';
import { Layout } from '@/components/layouts';

const Home: NextPage = () => {
	return (
		<Layout>
			<Typography variant="h6" color="primary">
				Hello World
			</Typography>
		</Layout>
	);
};

export default Home;
