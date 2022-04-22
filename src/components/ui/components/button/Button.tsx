/* Button
================================================== */

import React from 'react';
import { darken, lighten } from 'polished';
import styled, { css } from 'styled-components';
import { IconTypes } from '../icon/icons';
import Icon from '../icon';
import { CommonProps } from '../..';

/* Interface
---------------------------------- */

export type ButtonVariants = keyof typeof buttonVariants;

export interface ButtonProps extends CommonProps {
	loading?: boolean;
	disabled?: boolean;
	type?: React.ButtonHTMLAttributes<any>['type'];
	icon?: IconTypes;
	iconRight?: IconTypes;
	rounded?: boolean;
	href?: string;
	target?: string;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
	variant?: ButtonVariants;
	white?: boolean;
	outline?: boolean;
	rel?: string;
}

/* Styles
---------------------------------- */

export const buttonVariants = {
	primary: css`
		color: #fff;
		background-color: ${({ theme }) => theme.colors.primary};

		height: 59px;
		font-size: 16px;
		line-height: 18px;
		letter-spacing: 3px;
		padding: 0 30px;
		border-radius: 2px;

		&:hover {
			background-color: ${({ theme }) => lighten(0.04, theme.colors.primary)};
		}
	`,
	white: css`
		color: #222237;
		background-color: #fff;
		border-radius: 100px;

		height: 48px;
		padding: 0 24px;

		font-size: 12px;
		line-height: 14px;
		letter-spacing: 2px;
		border-radius: 2px;

		&:hover {
			background-color: ${darken(0.1, '#fff')};
		}
	`,
	outline: css`
		color: #222237;
		background-color: #fff;
		border: 1px solid #222237;

		height: 48px;
		padding: 0 24px;

		font-size: 12px;
		line-height: 14px;
		letter-spacing: 2px;
		border-radius: 2px;

		&:hover {
			color: #fff;
			background-color: ${({ theme }) => theme.colors.primary};
			border-color: ${({ theme }) => theme.colors.primary};
		}
	`,
};

/* StyledComponents
---------------------------------- */

const Wrapper = styled.button<ButtonProps>`
	display: flex;
	align-items: center;
	justify-content: center;
	text-align: center;

	font-weight: bold;
	font-family: ${({ theme }) => theme.fonts.heading};
	text-transform: uppercase;

	.btn__loading {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translateX(-50%) translateY(-50%);
	}

	.btn__text {
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
	}

	.btn__iconLeft {
		margin-right: 10px;
	}

	.btn__iconRight {
		margin-left: 10px;
	}

	&.btn--loading {
		pointer-events: none;

		.btn__text {
			opacity: 0;
		}
	}

	&.btn--disabled {
		pointer-events: none;
	}

	&.btn--rounded {
		border-radius: 100px;
	}

	${({ variant }) => buttonVariants[variant]}
`;

/* Component
---------------------------------- */

export const Button = ({ variant = 'primary', className, loading, ...props }: ButtonProps) => {
	let classNames = [];
	if (loading) classNames.push('btn--loading');
	if (props.disabled) classNames.push('btn--disabled');
	if (className) classNames = classNames.concat(className.split(' '));

	if (props.white) variant = 'white';
	if (props.outline) variant = 'outline';

	return (
		<Wrapper variant={variant} className={classNames.join(' ')} {...props}>
			<span className="btn__text">
				{props.icon ? <Icon name={props.icon} className="btn__iconLeft" /> : null}
				{props.children}
				{props.iconRight ? <Icon name={props.iconRight} className="btn__iconRight" /> : null}
			</span>
		</Wrapper>
	);
};

export default Button;
