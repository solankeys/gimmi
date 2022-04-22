/* Footer
======================================= */

import React from 'react';
import styled from 'styled-components';
import { Holder, Text } from '@ui';
import Link from 'next/link';

/* Style
---------------------------------- */

const Wrapper = styled.section`
	width: 100%;
	height: 488px;

	color: #fff;
	background-color: #222237;
	text-align: center;

	padding: 100px 40px 100px 40px;

	.holder {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		height: 100%;
	}

	.content {
		margin-bottom: 94px;
	}

	.poweredby {
		font-size: 12px;
		line-height: 14px;
		margin-bottom: 16px;
	}

	.logo {
		margin-bottom: 30px;
		display: block;
	}

	.buttons {
		display: grid;
		grid-template-columns: 1fr 1fr;
		column-gap: 30px;

		a,
		span {
			color: #90909b;
			font-size: 14px;
			line-height: 20px;
			letter-spacing: 0.6px;
			transition: all 200ms ease;
			cursor: pointer;

			&:hover {
				color: ${({ theme }) => theme.colors.primary};
			}
		}
	}

	.cta {
		font-size: 12px;
		line-height: 14px;
		text-decoration-line: underline;
		text-transform: uppercase;
		color: #fff;
		transition: all 200ms ease;
		font-family: ${({ theme }) => theme.fonts.heading};
		font-weight: bold;

		&:hover {
			color: ${({ theme }) => theme.colors.primary};
		}
	}
`;

/* Component
------------------------------ */

const Footer = () => {
	return (
		<Wrapper>
			<Holder className="holder">
				<div className="content">
					<div className="poweredby">Powered By</div>
					<div className="logo">
						<img src="/img/logo_gimmi.svg" alt="gimmi" />
					</div>
					<div className="buttons">
						<Link href="/privacy-policy">
							<a target="_blank">Privacy Policy</a>
						</Link>
						<Link href="/terms-of-use">
							<a target="_blank">Terms of Use</a>
						</Link>
					</div>
				</div>
				<a
					href="mailto:info@gimmi.co?subject=Become%20a%20Gimmi%20Reviewer&body=Thank%20you%20for%20your%20interest%20in%20becoming%20a%20Gimmi%20Reviewer.%20Please%20provide%20the%20following%20and%20if%20approved%2C%20a%20Gimmi%20representative%20will%20be%20in%20contact%20soon.%0D%0A%0D%0AYour%20Primary%20Platform%2C%20ie%20Twitch%20or%20YouTube%0D%0A%0D%0AYour%20Channel%20Name%0D%0A%0D%0AYour%20Channel%20URL%0D%0A%0D%0ABest%20contact%20email%20or%20phone%20number%20to%20reach%20you"
					className="cta"
				>
					Become A Gimmi Reviewer
				</a>
			</Holder>
		</Wrapper>
	);
};

export default Footer;
