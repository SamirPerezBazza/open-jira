import { EntriesProvider } from '@/components/context/entries';
import { UIProvider } from '@/components/context/ui';
import '@/styles/globals.css';
import { darkTheme } from '@/themes';
import { ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import type { AppProps } from 'next/app';
import { SnackbarProvider } from 'notistack';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<SnackbarProvider maxSnack={3}>
			<EntriesProvider>
				<UIProvider>
					<ThemeProvider theme={darkTheme}>
						<CssBaseline />
						<Component {...pageProps} />
					</ThemeProvider>
				</UIProvider>
			</EntriesProvider>
		</SnackbarProvider>
	);
}
