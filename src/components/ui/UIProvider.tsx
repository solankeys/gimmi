/* UI Provider
======================================= */

import React from 'react';
import { ThemeProvider } from 'styled-components';
import 'what-input';
import theme from '.';
import GlobalStyle from './GlobalStyle';

/* Interface
---------------------------------- */

export interface UIProviderProps {
	children: any;
	theme: string | 'light' | 'dark';
}

/* Component
---------------------------------------- */

export const UIProvider = ({ children }: UIProviderProps) => {
	return (
		<ThemeProvider theme={theme}>
			<GlobalStyle />
			{children}
		</ThemeProvider>
	);
};

export default UIProvider;
