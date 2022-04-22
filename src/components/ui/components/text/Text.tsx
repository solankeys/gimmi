/* Text
======================================= */

import React from 'react';
import styled, { css } from 'styled-components';
import { rem } from 'polished';
import { ColorTypes, CommonProps } from '../..';

/* Interface
---------------------------------------- */

export interface TextProps extends CommonProps {
	h1?: boolean;
	h2?: boolean;
	h3?: boolean;
	h4?: boolean;
	h5?: boolean;
	h6?: boolean;
	p?: boolean;
	b?: boolean;
	i?: boolean;
	size?: number | string;
	$size?: number | string;
	color?: ColorTypes | string;
	$color?: ColorTypes | string;
	caps?: boolean;
	variant?: string;
}

/* Styles
---------------------------------------- */

const Wrapper = styled.span<TextProps>`
	margin: 0;
	text-rendering: geometricprecision;

	${({ h1 }) => h1 && textElements.h1}
	${({ h2 }) => h2 && textElements.h2}
	${({ h3 }) => h3 && textElements.h3}
	${({ h4 }) => h4 && textElements.h4}
	${({ h5 }) => h5 && textElements.h5}
	${({ h6 }) => h6 && textElements.h6}

	${({ p }) => p && textElements.p}
	${({ b }) => b && textElements.b}
	${({ i }) => i && textElements.i}
	${({ caps }) => caps && textElements.caps}

	${({ $color }) => $color && `color: ${$color};`}

	${({ variant }) => textVariants[variant]};
`;

/* Text elements
---------------------------------------- */

const textElements = {
	p: css`
		margin-bottom: ${rem(20)};
	`,
	h1: css`
		margin-bottom: ${rem(20)};
	`,
	h2: css`
		margin-bottom: ${rem(20)};
	`,
	h3: css`
		margin-bottom: ${rem(20)};
	`,
	h4: css`
		margin-bottom: ${rem(20)};
	`,
	h5: css`
		margin-bottom: ${rem(20)};
	`,
	h6: css`
		margin-bottom: ${rem(20)};
	`,
	b: css`
		font-weight: 700;
	`,
	i: css`
		font-style: italic;
	`,
	caps: css`
		text-transform: uppercase;
	`,
};

/* Text elements
---------------------------------------- */

const textVariants = {
	small: css`
		font-size: 14px;
		line-height: 20px;
		letter-spacing: 0.6px;
		font-family: ${({ theme }) => theme.fonts.faux};
	`,
	normal: css`
		font-size: 16px;
		line-height: 27px;
		letter-spacing: 0.4px;
		font-family: ${({ theme }) => theme.fonts.faux};
	`,
	medium: css`
		font-size: 21px;
		line-height: 24px;
		font-weight: bold;
	`,
	title: css`
		font-size: 32px;
		line-height: 42px;
		font-weight: bold;

		@media (max-width: 800px) {
			font-size: 26px;
			line-height: 30px;
		}
	`,
	titlexl: css`
		font-size: 36px;
		line-height: 46px;
		font-weight: bold;

		@media (max-width: 800px) {
			font-size: 32px;
			line-height: 42px;
		}
	`,
	label: css`
		font-size: 14px;
		line-height: 22px;
		letter-spacing: 1px;
		text-transform: uppercase;
	`,
};

/* Component
---------------------------------------- */

export const Text = ({ color, size, css, variant = 'normal', ...props }: TextProps) => {
	let as = props.as || 'span';

	if (!props.as) {
		if (props.h1) as = 'h1';
		if (props.h2) as = 'h2';
		if (props.h3) as = 'h3';
		if (props.h4) as = 'h4';
		if (props.h5) as = 'h5';
		if (props.h6) as = 'h6';

		if (props.p) as = 'p';
		if (props.b && !props.p) as = 'strong';
		if (props.i && !props.p) as = 'em';
	}

	return (
		<Wrapper $size={size} $color={color} as={as} variant={variant} css={css} {...props}>
			{props.children}
		</Wrapper>
	);
};

export default Text;
