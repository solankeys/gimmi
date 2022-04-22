/* Login Overlay
======================================= */

import React, { useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import styled from 'styled-components';
import { signIn } from 'next-auth/react';

/* Style
--------------------------------------- */

const Wrapper = styled(motion.div)`
	position: fixed;
	top: 0;
	left: 0;
	z-index: 9999;
	width: 100%;
	height: 100%;

	padding: 0 40px;
	display: flex;
	justify-content: center;
	align-items: center;

	background-color: rgba(0, 0, 0, 0.4);

	.content {
		background-color: #fff;
		box-shadow: 0px 28px 27px rgba(0, 0, 0, 0.06);
		border: 1px solid #f2f2f2;

		padding: 100px 20px 60px 20px;

		width: 100%;
		height: 100vh;
		max-width: 360px;

		position: fixed;
		top: 0;
		right: 0;
		z-index: 99;
		overflow: hidden;
		overflow-y: auto;
		-webkit-overflow-scrolling: touch;

		.btn-close {
			position: absolute;
			top: 26px;
			right: 20px;
		}

		.logo {
			margin-bottom: 53px;
		}

		.title {
			font-weight: bold;
			font-size: 28px;
			line-height: 32px;
			margin-bottom: 11px;
		}

		.text {
			font-size: 14px;
			line-height: 19px;
			letter-spacing: 0.35px;
			margin-bottom: 30px;
		}

		.buttons {
			button {
				margin-bottom: 20px;
			}
		}
	}

	@media (max-width: 980px) {
		.content {
			max-width: 100%;
		}
	}
`;

/* Animation
------------------------------ */

const animation = {
	background: {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
		transition: { duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] },
	},
	content: {
		initial: { opacity: 0, x: '100%' },
		animate: { opacity: 1, x: 0 },
		exit: { opacity: 0, x: '100%' },
		transition: { duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] },
	},
	contentMobile: {
		initial: { opacity: 0, y: '100%' },
		animate: { opacity: 1, y: 0 },
		exit: { opacity: 0, y: '100%' },
		transition: { duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] },
	},
};

/* Icons
------------------------------ */

function CloseIcon() {
	return (
		<svg width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
			<rect
				x={2.222}
				y={1.515}
				width={23}
				height={1}
				rx={0.5}
				transform="rotate(45 2.222 1.515)"
				fill="#D8D8D8"
				stroke="#979797"
			/>
			<rect
				x={1.515}
				y={17.778}
				width={23}
				height={1}
				rx={0.5}
				transform="rotate(-45 1.515 17.778)"
				fill="#D8D8D8"
				stroke="#979797"
			/>
		</svg>
	);
}

/* Component
------------------------------ */

const LoginOverlay = ({ overlay, setOverlay }) => {
	const backgroundRef = useRef(null);

	const handleClickOutside = (event: any) => {
		if (backgroundRef.current) {
			if (backgroundRef.current == event.target) {
				setOverlay(false);
			}
		}
	};

	return (
		<AnimatePresence>
			{overlay && (
				<Wrapper ref={backgroundRef} {...animation.background} onClick={(event) => handleClickOutside(event)}>
					<motion.div className="content" {...animation.content}>
						<button className="btn-close" onClick={() => setOverlay(null)}>
							{CloseIcon()}
						</button>

						<div className="title">Log In</div>

						<div className="text">
							Join the conversation! Like and follow your favorite creators as they deep dive into today’s
							biggest gaming titles.
						</div>

						<div className="buttons">
							<button
								onClick={() =>
									signIn('twitter', {
										callbackUrl: `${process.env.NEXTAUTH_URL}/api/auth/callback/twitter`,
									})
								}
							>
								<img src="/img/twitter_login.png" alt="Sign in with Twitter" />
							</button>

							<button
								onClick={() =>
									signIn('facebook', {
										callbackUrl: `${process.env.NEXTAUTH_URL}/api/auth/callback/facebook`,
									})
								}
							>
								<img src="/img/facebook_login.png" alt="Log in with Facebook" />
							</button>
						</div>

						<ul className="account-overlay__menu">
							<li className="account-overlay__menuLi">Home</li>
							<li className="account-overlay__menuLi">Reviews</li>
							<li className="account-overlay__menuLi creater">Creaters</li>
						</ul>
					</motion.div>
				</Wrapper>
			)}
		</AnimatePresence>
	);
};

export default LoginOverlay;
