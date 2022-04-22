/* GameFooter
======================================= */

import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { Button, Holder } from '@ui';

/* Style
---------------------------------- */

const Wrapper = styled.section`
	width: 100%;

	color: #fff;
	background-color: #222237;

	padding: 100px 40px 0px 40px;

	.holder {
		max-width: 1490px;
	}

	.contents {
		display: grid;
		grid-template-columns: minmax(223px, 275px) minmax(390px, 1fr) minmax(158px, 198px);
		column-gap: 65px;

		grid-template-areas:
			'gamebox title gameinfo'
			'gamebox meta gameinfo'
			'gamebox platforms gameinfo'
			'gamebox requirements gameinfo';

		.gamebox {
			width: 100%;
			grid-area: gamebox;
		}

		.title {
			grid-area: title;
			font-weight: bold;
			font-size: 42px;
			line-height: 40px;
			margin-bottom: 16px;
			font-family: ${({ theme }) => theme.fonts.heading};
		}

		.meta {
			grid-area: meta;
			font-size: 12px;
			line-height: 14px;
			letter-spacing: 2px;
			text-transform: uppercase;
			margin-bottom: 40px;
			font-family: ${({ theme }) => theme.fonts.heading};

			.pipe {
				margin: 0 6px;
			}
		}

		.platforms {
			grid-area: platforms;
			margin-bottom: 86px;

			.subtitle {
				font-weight: bold;
				font-size: 30px;
				line-height: 38px;
				margin-bottom: 25px;
				font-family: ${({ theme }) => theme.fonts.heading};
			}

			.grid {
				display: grid;
				grid-template-columns: repeat(auto-fit, 138px);
				column-gap: 14px;
				row-gap: 14px;
				margin-bottom: 60px;

				button {
					width: 138px;
					height: 114px;
					flex-shrink: 0;
					border: 4px solid #2d2d44;
					display: flex;
					align-items: center;
					justify-content: center;
					transition: all 200ms ease;

					&:hover {
						border: 4px solid #fff;
					}

					&.active {
						border: 4px solid #fff;
					}
				}
			}

			.btn-buynow {
				width: 269px;
				color: #222237;
				border-radius: 3px;
			}
		}

		.requirements {
			grid-area: requirements;

			.title {
				font-weight: bold;
				font-size: 30px;
				line-height: 35px;
				margin-bottom: 41px;
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

		.gameinfo {
			grid-area: gameinfo;

			.intro-label {
				font-size: 12px;
				line-height: 14px;
				letter-spacing: 2px;
				margin-bottom: 22px;
				font-weight: bold;
				font-family: ${({ theme }) => theme.fonts.heading};
				text-transform: uppercase;
			}

			.grid {
				display: grid;
				row-gap: 10px;

				.box {
					background-color: #2d2d44;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					text-align: center;
					padding: 20px;

					.label {
						font-size: 12px;
						line-height: 14px;
						margin-bottom: 9px;
					}

					.text {
						font-size: 16px;
						line-height: 18px;
						font-family: ${({ theme }) => theme.fonts.heading};
						font-weight: bold;
					}
				}
			}
		}
	}
`;

/* Component
------------------------------ */

const GameFooter = ({ data }) => {
	return (
		<Wrapper>
			<Holder className="holder">
				<div className="contents">
					<div className="gamebox">
						<img src={data.cover} alt="" />
					</div>

					<h3 className="title">{data.title}</h3>

					<div className="meta">
						{data.developer} <span className="pipe">|</span> {data.genre}
					</div>

					<div className="platforms">
						<Button className="btn-buynow" as="a" href={data.buyUrl} target="_blank" rel="noreferrer">
							{data.price}
						</Button>
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
				</div>
			</Holder>
		</Wrapper>
	);
};

export default GameFooter;
