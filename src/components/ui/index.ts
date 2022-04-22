/* Theme
================================================== */

/* types
--------------------------------------- */

export interface CommonProps {
	as?: any;
	css?: any;
	className?: string;
	children?: React.ReactNode | any;
	tabIndex?: number;
	ref?: any;
}

/* theme
-------------------------------------- */

export const theme = {
	fonts: {
		faux: `'Relative Faux', 'Inter', -apple-system, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif`,
		heading: `'Relative', 'Inter', -apple-system, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif`,
		body: `'Relative', 'Inter', -apple-system, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif`,
	},
	colors: {
		primary: '#00d171',
		body: '#222237',
	},
};

export default theme;

export type ThemeTypes = typeof theme;
export type ColorTypes = keyof typeof theme.colors;
export type FontTypes = keyof typeof theme.fonts;

/* general
--------------------------------------- */

export * from './components/avatar';
export * from './components/button';
export * from './components/icon';
export * from './components/text';
export * from './components/follow';
export * from './components/divider';
export * from './components/holder';
export * from './components/video';
export * from './components/heartButton';
export * from './components/animateOnScroll';

/* core
--------------------------------------- */

export * from './UIProvider';
