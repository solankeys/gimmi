/* Icon
================================================== */

import React from 'react';
import styled from 'styled-components';
import icons, { IconTypes } from './icons';
import { rem } from 'polished';
import { ColorTypes, CommonProps } from '../..';

/* Interface
---------------------------------- */

export interface IconProps extends CommonProps {
	name?: IconTypes;
	size?: number;
	$size?: number;
	color?: ColorTypes | string;
	$color?: ColorTypes | string;
}

/* Styles
---------------------------------- */

const Wrapper = styled.span<IconProps>`
	svg {
		width: ${({ $size }) => rem($size)};
		height: ${({ $size }) => rem($size)};
		color: ${({ $color }) => $color || 'inherit'};
	}
`;

/* Component
---------------------------------- */

export const Icon = ({ size = 20, color, name, ...props }: IconProps) => {
	return (
		<Wrapper $size={size} $color={color} {...props}>
			{icons[name]}
		</Wrapper>
	);
};

export default Icon;
