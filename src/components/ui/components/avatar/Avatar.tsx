/* Avatar
======================================= */

import React, { forwardRef } from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { ColorTypes, CommonProps } from '../..';

/* Interface
---------------------------------------- */

export interface AvatarProps extends CommonProps {
	image?: string;
	name?: string;
	text?: string;
	size?: number | string;
	$size?: number | string;
	color?: ColorTypes | string;
	$color?: ColorTypes | string;
	href?: string;
	to?: string;
	radius?: number | string;
}

/* Styles
---------------------------------------- */

const Wrapper = styled.div<AvatarProps>`
	overflow: hidden;

	width: ${({ $size }) => rem($size)};
	height: ${({ $size }) => rem($size)};

	border-radius: ${({ radius }) => rem(radius)};

	display: inline-flex;
	align-items: center;
	justify-content: center;
	flex-shrink: 0;

	user-select: none;

	background-size: cover;
	background-position: center center;

	${({ $color }) => `background-color: ${$color};`};
	${({ image }) => image && `background-image: url('${image}');`}
`;

/* Component
---------------------------------------- */

export const Avatar = ({ name = '', color = '#f4f5f7', size = 60, radius = 100, text, css, ...props }: AvatarProps) => {
	return <Wrapper $size={size} $color={color} radius={radius} css={css} {...props}></Wrapper>;
};

export default Avatar;
