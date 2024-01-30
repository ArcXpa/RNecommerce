import 'react-native-gesture-handler';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MMKV } from 'react-native-mmkv';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@/theme';
import { store } from '@/store/configureStore';
import './translations';
import React from 'react';
import ApplicationNavigator from './navigators/Application';

const queryClient = new QueryClient();

export const storage = new MMKV();

function App() {

	return (
		<Provider store={store}>
			<QueryClientProvider client={queryClient}>
				<ThemeProvider storage={storage}>
					<ApplicationNavigator />
				</ThemeProvider>
			</QueryClientProvider>
		</Provider>
	);
}

export default App;
