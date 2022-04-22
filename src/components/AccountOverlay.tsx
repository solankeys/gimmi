/* Account
======================================= */

import { AnimatePresence, motion } from 'framer-motion';
// import { signOut, useSession } from 'next-auth/client';
import { signOut, useSession } from 'next-auth/react';
import React, { useRef } from 'react';
import styled from 'styled-components';

/* Style
---------------------------------- */

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

	.content {
		background-color: #fff;
		box-shadow: 0px 28px 27px rgba(0, 0, 0, 0.06);
		border: 1px solid #f2f2f2;

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

		.logo {
			position: absolute;
			top: 20px;
			left: 20px;
			display: none;
		}

		.btn-close {
			position: absolute;
			top: 26px;
			right: 20px;
		}

		.user-info {
			display: flex;
			flex-direction: column;
			align-items: center;

			padding: 100px 20px 60px 20px;

			.avatar {
				margin-bottom: 11px;
				width: 90px;
				height: 90px;
				background-color: #000;
				background-size: cover;
				border-radius: 100px;
				overflow: hidden;
			}

			.username {
				font-weight: bold;
				font-size: 18px;
				line-height: 25px;
			}
		}

		.buttons {
			border-top: 1px solid #d5d5d5;

			.btn {
				display: block;
				padding: 24px 20px;
				font-size: 14px;
				line-height: 16px;
				border-bottom: 1px solid #d5d5d5;
				width: 100%;
				text-align: left;
				font-weight: bold;
			}
		}
	}

	@media (max-width: 980px) {
		.content {
			max-width: 100%;

			.logo {
				display: block;
			}
		}
	}
`;

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

function LogoIcon() {
	return (
		<svg width={29} height={29} viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
			<mask id="prefix__a" maskUnits="userSpaceOnUse" x={0} y={0} width={29} height={29}>
				<path fillRule="evenodd" clipRule="evenodd" d="M0 0h29v29H0V0z" fill="#fff" />
			</mask>
			<g mask="url(#prefix__a)">
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M14.493 0C6.494 0-.014 6.505-.014 14.5S6.494 29 14.493 29h9.62v-9.638h-4.79v4.85h-4.83c-5.358 0-9.717-4.357-9.717-9.712 0-5.355 4.36-9.712 9.717-9.712 5.358 0 9.717 4.357 9.717 9.712v4.812H29V14.5C29 6.505 22.492 0 14.493 0"
					fill="#02EE81"
				/>
			</g>
		</svg>
	);
}

/* Component
initial={{ opacity: 0, y: '100%' }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: '100%' }}
			transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
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

const AccountOverlay = ({ overlay, setOverlay }) => {
	const backgroundRef = useRef(null);
	// const [session, loading]: any = useSession();
	const { data: session } = useSession();

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
						{/* <div className="logo">{LogoIcon()} */}
						<div className="logo">
							<img
								src="https://d33wubrfki0l68.cloudfront.net/0834d0215db51e91525a25acf97433051f280f2f/c30f5/img/redux.svg"
								alt="logo"
							/>
						</div>

						<button className="btn-close" onClick={() => setOverlay(null)}>
							{CloseIcon()}
						</button>

						{session && session.user && (
							<div className="padding">
								<div className="user-info">
									<div
										className="avatar"
										style={{ backgroundImage: `url('${session.user.image}')` }}
									/>
									<div className="username">{session.user.name}</div>
								</div>
								<ul className="account-overlay__menu">
									<li className="account-overlay__menuLi">Home</li>
									<li className="account-overlay__menuLi">Reviews</li>
									<li className="account-overlay__menuLi">Creaters</li>
								</ul>

								<div className="buttons">
									<button className="btn" onClick={() => signOut()}>
										Log Out
									</button>
								</div>
							</div>
						)}
					</motion.div>
				</Wrapper>
			)}
		</AnimatePresence>
	);
};

export default AccountOverlay;
