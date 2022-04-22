/* Influencer
======================================= */

import { Follow } from '@ui';
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import styled from 'styled-components';

/* Style
---------------------------------- */

const Wrapper = styled(motion.div)`
	background-color: #fff;
	color: #000;

	width: 100%;
	height: 100vh;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 99;
	overflow: hidden;
	overflow-y: auto;
	-webkit-overflow-scrolling: touch;

	.logo {
		position: absolute;
		top: 20px;
		left: 20px;
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
			margin-bottom: 5px;
		}

		.followers {
			font-size: 12px;
			line-height: 17px;
			letter-spacing: 0.425px;
			margin-bottom: 10px;
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
------------------------------ */

const Influencer = ({ setOverlay, data }) => {
	const [followers, setFollowers] = useState(0);
	const [following, setFollowing] = useState(false);

	return (
		<Wrapper
			initial={{ opacity: 0, y: '100%' }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: '100%' }}
			transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
		>
			<div className="logo">{LogoIcon()}</div>

			<button className="btn-close" onClick={() => setOverlay(null)}>
				{CloseIcon()}
			</button>

			<div className="padding">
				<div className="user-info">
					<div className="avatar" style={{ backgroundImage: `url('${data.influencer.avatar}')` }} />
					<div className="username">{data.influencer.name}</div>
					<div className="followers">1.2k Followers</div>
					<Follow
						data={data}
						setFollowers={setFollowers}
						followers={followers}
						setFollowing={setFollowing}
						following={following}
					/>
				</div>
			</div>
		</Wrapper>
	);
};

export default Influencer;
