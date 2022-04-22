/* Divider
======================================= */

import React from 'react';
import styled from 'styled-components';
import { CommonProps } from '../..';

/* Interface
---------------------------------------- */

export interface DividerProps extends CommonProps {}

/* Styles
---------------------------------------- */

const Wrapper = styled.div<DividerProps>`
	width: 100%;
	position: relative;

	.line {
		width: 100%;
		height: 1px;
		background-color: #d6d6d6;
		position: absolute;
		top: 50%;
		left: 0;
		z-index: 0;
	}

	.divider__text {
		font-size: 12px;
		line-height: 14px;
		letter-spacing: 2px;
		background-color: #fff;
		padding-right: 30px;
		z-index: 1;
		position: relative;
		display: inline-block;
		font-family: ${({ theme }) => theme.fonts.heading};
		font-weight: bold;
	}
`;

/* Component
---------------------------------------- */

export const Divider = ({ ...props }: DividerProps) => {
	return (
		<Wrapper {...props}>
			<div className="divider__text">{props.children}</div>
			<div className="line" />
		</Wrapper>
	);
};

export default Divider;
