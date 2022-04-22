/* GameDetails
======================================= */

import { Button } from '@ui';
import { motion } from 'framer-motion';
import React from 'react';
import styled from 'styled-components';

/* Style
---------------------------------- */

const Wrapper = styled(motion.div)`
	background-color: #222237;
	width: 100%;
	height: 100vh;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 99;
	overflow: hidden;
	overflow-y: auto;
	-webkit-overflow-scrolling: touch;

	color: #fff;

	.padding {
		padding: 20px;
		padding-top: 50px;
		padding-bottom: 100px;
	}

	.btn-close {
		position: absolute;
		top: 20px;
		right: 20px;
	}

	.gamebox {
		max-width: 210px;
		margin: auto;
		margin-bottom: 30px;

		img {
			width: 100%;
		}
	}

	.intro {
		text-align: center;
		margin-bottom: 32px;

		.title {
			font-weight: bold;
			font-size: 16.8px;
			line-height: 19px;
			margin-bottom: 6px;
		}

		.meta {
			font-weight: bold;
			font-size: 11.2px;
			line-height: 13px;
			letter-spacing: 0.658824px;
		}
	}

	.btn-buy {
		margin: auto;
		margin-bottom: 30px;
		font-weight: bold;
		font-size: 11.2px;
		line-height: 13px;
		letter-spacing: 2.1px;

		width: 201px;
		height: 49px;
	}

	.gameinfo {
		margin-bottom: 60px;

		.intro-label {
			font-weight: bold;
			font-size: 14.9333px;
			line-height: 18px;
			margin-bottom: 26px;
			font-weight: bold;
			font-family: ${({ theme }) => theme.fonts.heading};
			text-align: center;
		}

		.grid {
			display: grid;
			grid-template-columns: 1fr 1fr;
			gap: 12px;

			.box {
				background-color: #2d2d44;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				text-align: center;
				padding: 20px;

				.label {
					font-size: 9.8px;
					line-height: 12px;
					margin-bottom: 9px;
				}

				.text {
					font-weight: bold;
					font-size: 11px;
					line-height: 13px;
					font-family: ${({ theme }) => theme.fonts.heading};
				}
			}
		}
	}

	.requirements {
		.title {
			font-weight: bold;
			font-size: 14.9333px;
			line-height: 18px;
			margin-bottom: 26px;
			font-weight: bold;
			font-family: ${({ theme }) => theme.fonts.heading};
		}

		.grid {
			display: grid;
			grid-template-columns: repeat(auto-fit, minmax(317px, 1fr));
			column-gap: 60px;
			row-gap: 60px;

			.label {
				font-size: 12px;
				line-height: 14px;
				letter-spacing: 2px;
				text-transform: uppercase;
				margin-bottom: 43px;
				font-weight: bold;
				font-family: ${({ theme }) => theme.fonts.heading};
			}

			.content {
				font-size: 12px;
				line-height: 18px;
				font-family: ${({ theme }) => theme.fonts.faux};

				p {
					margin-bottom: 23px;
				}
			}
		}
	}
`;

/* Component
------------------------------ */

const GameDetails = ({ setOverlay, data }) => {
	return (
		<Wrapper
			initial={{ opacity: 0, y: '100%' }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: '100%' }}
			transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
		>
			<div className="padding">
				<button className="btn-close" onClick={() => setOverlay(null)}>
					<svg width={23} height={23} viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							opacity={0.501}
							fillRule="evenodd"
							clipRule="evenodd"
							d="M.6 3.333a2.8 2.8 0 012.8-2.8h16.8a2.8 2.8 0 012.8 2.8v16.8a2.8 2.8 0 01-2.8 2.8H3.4a2.8 2.8 0 01-2.8-2.8v-16.8zm7.33 4.53a.467.467 0 01.66 0l3.3 3.3 3.3-3.3a.467.467 0 01.66.66l-3.3 3.3 3.3 3.3a.467.467 0 01-.66.66l-3.3-3.3-3.3 3.3a.467.467 0 01-.66-.66l3.3-3.3-3.3-3.3a.467.467 0 010-.66z"
							fill="#fff"
						/>
					</svg>
				</button>

				<div className="gamebox">
					<img src={data.cover} alt="" />
				</div>

				<div className="intro">
					<div className="title">{data.title}</div>
					<div className="meta">
						{data.developer} <span className="pipe">|</span> {data.genre}
					</div>
				</div>

				<Button className="btn-buy">{data.price}</Button>

				<div className="gameinfo">
					<div className="intro-label">Game Info</div>

					<div className="grid">
						{data.info.map((value: any, index: number) => {
							return (
								<div className={`box box-${value.size}`} key={`gameinfo-${index}}`}>
									<div className="label">{value.label}</div>
									{value.text && <div className="text">{value.text}</div>}
									{value.image && (
										<div className="text">
											<img src={value.image} alt="" />
										</div>
									)}
								</div>
							);
						})}
					</div>
				</div>

				<div className="requirements">
					<div className="title">{data.requirements.title}</div>

					<div className="grid">
						{data.requirements.columns.map((value: any, index: number) => {
							return (
								<div className="column" key={`requirement-${index}}`}>
									<div className="label">{value.title}</div>
									<div className="content" dangerouslySetInnerHTML={{ __html: value.content }} />
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</Wrapper>
	);
};

export default GameDetails;
