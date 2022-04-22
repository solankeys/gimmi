/* GlobalStyle
======================================= */

import { createGlobalStyle } from 'styled-components';

/* GlobalStyle
---------------------------------- */

export const GlobalStyle = createGlobalStyle`

	html {
  		box-sizing: border-box;
	}

	*, *::before, *::after {
		box-sizing: inherit;
	}

	@font-face {
		font-family: 'Relative Faux';
		src: url('/fonts/Relative-Faux.woff2') format('woff2'),
			url('/fonts/Relative-Faux.woff') format('woff');
		font-weight: normal;
		font-style: normal;
		font-display: swap;
	}

	@font-face {
		font-family: 'Relative';
		src: url('/fonts/Relative-Medium.woff2') format('woff2'),
			url('/fonts/Relative-Medium.woff') format('woff');
		font-weight: 500;
		font-style: normal;
		font-display: swap;
	}

	@font-face {
		font-family: 'Relative';
		src: url('/fonts/Relative-Book.woff2') format('woff2'),
			url('/fonts/Relative-Book.woff') format('woff');
		font-weight: normal;
		font-style: normal;
		font-display: swap;
	}

	@font-face {
		font-family: 'Relative';
		src: url('/fonts/Relative-Bold.woff2') format('woff2'),
			url('/fonts/Relative-Bold.woff') format('woff');
		font-weight: bold;
		font-style: normal;
		font-display: swap;
	}

	body {
		font-family: 'Relative', 'Inter', -apple-system, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
		min-height: 100vh;
		scroll-behavior: smooth;
		text-rendering: optimizeSpeed;
		line-height: 1.5;
		overflow-x: hidden;
		margin: 0;
	}

	p, ul[class], ol[class], li, figure, figcaption, blockquote, dl, dd {
		margin: 0;
	}

	h1,
	h2,
	h3,
	h4,
	h5,
	h6 {
		font-size: 100%;
		font-weight: normal;
		margin: 0;
	}

	img, svg, video {
		max-width: 100%;
		display: block;
	}

	input,
	button,
	textarea,
	select {
		font: inherit;
		margin: 0;
	}

	button
	{
		border: none;
		outline: none;
		background-color: transparent;
		cursor: pointer;
		position: relative;
		user-select: none;
		padding: 0;
	}

	a
	{
		text-decoration: none;
	}


	iframe {
  		border: 0;
	}

	table {
		border-collapse: collapse;
		border-spacing: 0;
	}

	td,
	th {
	padding: 0;
	}

	[data-whatintent='mouse'] *:focus {
		outline: none;
	}

	[data-whatintent='keyboard'] *:focus {
		outline: 2px solid #00c2ff;
	}

	[data-whatintent='touch'] *:focus {
		outline: 2px solid #00c2ff;
	}

	@media (prefers-reduced-motion: reduce) {
		* {
			animation-duration: 0.01ms !important;
			animation-iteration-count: 1 !important;
			transition-duration: 0.01ms !important;
			scroll-behavior: auto !important;
		}
	}




	

`;

export default GlobalStyle;

// @media (max-width: 980px) {
// 	html,body, #__next { overflow: hidden; height: 100%; -webkit-overflow-scrolling: touch; }
// }
