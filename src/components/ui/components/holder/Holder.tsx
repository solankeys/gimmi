/* Holder
======================================= */

import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { CommonProps } from '../..';

/* Interface
---------------------------------------- */

export interface HolderProps extends CommonProps {
	width?: number | string;
	$width?: number | string;
}

/* Styles
---------------------------------------- */

const Wrapper = styled.div<HolderProps>`
	max-width: ${({ $width }) => rem($width)};
	position: relative;
	margin: auto;
`;

/* Component
---------------------------------------- */

export const Holder = ({ width = 1490, ...props }: HolderProps) => {
	return (
		<Wrapper $width={width} {...props}>
			{props.children}
		</Wrapper>
	);
};

export default Holder;
