/* GameHeroImage
======================================= */

import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, Holder } from '@ui';
import { scroller } from 'react-scroll';
import VideoOverlay from './VideoOverlay';
import { motion, useTransform, useViewportScroll } from 'framer-motion';

/* Style
---------------------------------- */

const Wrapper = styled.div`
	background-color: #000;
	width: 100%;
	height: 746px;

	color: #fff;
	text-align: center;

	padding: 0 40px;
	position: relative;
	overflow: hidden;

	margin-bottom: 130px;

	.cover {
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.4);
		position: absolute;
		top: 0;
		left: 0;
		z-index: 0;
	}

	.background {
		background-position: center center;
		background-size: cover;

		position: absolute;
		top: 0;
		left: 0;
		z-index: 0;
		width: 100%;
		height: 100%;

		video {
			object-fit: cover;
			height: 100%;
			width: 100%;
		}
	}

	.holder {
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		z-index: 2;
	}

	.game {
		font-size: 18px;
		line-height: 21px;
		letter-spacing: 1.05882px;
		color: #fff;
		margin-bottom: 30px;

		.pipe {
			margin: 0 20px;
		}
	}

	.title {
		color: #fff;
		font-size: 60px;
		line-height: 50px;
		font-weight: bold;
		margin-bottom: 30px;
		font-family: ${({ theme }) => theme.fonts.heading};
	}

	.score-group {
		.scores {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-bottom: 20px;
			color: #fff;

			.score {
				display: flex;
				align-items: center;
				justify-content: center;
				flex-direction: column;
				width: 110px;
				flex-shrink: 0;

				.number {
					width: 63px;
					height: 63px;
					border: 2px solid #ed512a;
					border-radius: 100px;
					margin-bottom: 17px;
					display: flex;
					align-items: center;
					justify-content: center;

					font-weight: bold;
					font-size: 18px;
					line-height: 21px;

					&.red {
						border: 2px solid #ed512a;
					}

					&.yellow {
						border: 2px solid #c09b1c;
					}

					&.green {
						border: 2px solid #26c3b3;
					}
				}

				.label {
					font-size: 14px;
					line-height: 16px;
					text-align: center;
					letter-spacing: 2.33333px;
					text-transform: uppercase;
				}

				&.score-middle {
					margin: 0 30px;
				}
			}
		}

		.total-score {
			width: 109px;
			height: 109px;
			border-radius: 100px;
			background-color: #02ee81;
			margin: auto;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			color: #222237;

			.number {
				font-weight: bold;
				font-size: 28.6041px;
				line-height: 33px;
			}

			.label {
				font-size: 14.302px;
				line-height: 16px;
				font-weight: bold;
			}
		}
	}

	.bottom {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		position: absolute;
		bottom: 50px;
		left: 0;

		button {
			font-size: 12px;
			line-height: 14px;
			text-align: center;
			letter-spacing: 2px;
			min-width: 201px;
			height: 40px;
			border-radius: 20px;

			svg {
				margin-right: 12px;
			}
		}
	}
`;

/* Component
------------------------------ */

function avg(arr) {
	var sum = 0;
	for (var i in arr) {
		sum += parseFloat(arr[i]);
	}
	var numbersCnt = arr.length;

	return sum / numbersCnt;
}

const GameHeroImage = ({ data }) => {
	const [videoShowing, setVideoShowing] = useState(false);
	const { scrollYProgress, scrollY } = useViewportScroll();

	const y = useTransform(scrollYProgress, (value) => {
		let final = Math.round(value * 1000) + 'px';

		return final;
	});

	const scrollToAsk = () => {
		scroller.scrollTo('ask-section', {
			duration: 800,
			delay: 0,
			smooth: 'easeInOutQuart',
			offset: -90,
		});
	};

	return (
		<Wrapper>
			<Holder className="holder">
				<div className="game">
					{data.game.developer} <span className="pipe">|</span> {data.game.genre}
				</div>

				<h1 className="title">{data.game.title}</h1>

				<div className="score-group">
					<div className="scores">
						<div className="score">
							<div className="number red">{data.highlights[0].tab_score}</div>
							<div className="label">{data.highlights[0].tab_title}</div>
						</div>
						<div className="score score-middle">
							<div className="number yellow">{data.highlights[1].tab_score}</div>
							<div className="label">{data.highlights[1].tab_title}</div>
						</div>
						<div className="score">
							<div className="number green">{data.highlights[2].tab_score}</div>
							<div className="label">{data.highlights[2].tab_title}</div>
						</div>
					</div>

					<div className="total-score">
						<div className="number">
							{avg([
								data.highlights[0].tab_score,
								data.highlights[1].tab_score,
								data.highlights[2].tab_score,
							]).toFixed(1)}
						</div>
						<div className="label">Total</div>
					</div>
				</div>

				<div className="bottom">
					<Button white onClick={() => setVideoShowing(true)}>
						<svg width="14" height="17" viewBox="0 0 14 17" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path
								d="M1.29395 1.84081L12.9219 8.91249L1.27813 15.9842L1.29395 1.84081ZM1.29395 0.828308C1.11465 0.828308 0.951172 0.870496 0.803516 0.954871C0.455469 1.15526 0.281445 1.45057 0.281445 1.84081L0.265625 15.9842C0.265625 16.3744 0.439648 16.6697 0.787695 16.8701C0.861523 16.9123 0.940625 16.9439 1.025 16.965C1.10938 16.9861 1.19375 16.9967 1.27813 16.9967C1.37305 16.9967 1.4627 16.9808 1.54707 16.9492C1.64199 16.9281 1.72637 16.8912 1.8002 16.8385L13.4598 9.76678C13.7762 9.57694 13.9344 9.29218 13.9344 8.91249C13.9344 8.79647 13.9133 8.68573 13.8711 8.58026C13.8395 8.46425 13.7867 8.36405 13.7129 8.27968C13.6391 8.18475 13.5547 8.11093 13.4598 8.05819L1.81602 0.986511C1.76328 0.954871 1.70527 0.928503 1.64199 0.90741C1.58926 0.886316 1.53125 0.870496 1.46797 0.859949C1.41523 0.838855 1.35723 0.828308 1.29395 0.828308Z"
								fill="#222237"
							/>
						</svg>
						Watch Trailer
					</Button>

					<Button white onClick={() => scrollToAsk()}>
						<svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path
								d="M5.60547 2.58984C6.95964 2.02995 8.42448 1.75 10 1.75C11.5755 1.75 13.0339 2.02995 14.375 2.58984C15.7292 3.14974 16.7969 3.91146 17.5781 4.875C18.3594 5.82552 18.75 6.86719 18.75 8C18.75 9.13281 18.3594 10.181 17.5781 11.1445C16.7969 12.0951 15.7292 12.8503 14.375 13.4102C13.0339 13.9701 11.5755 14.25 10 14.25H9.47266C9.29036 14.25 9.13411 14.25 9.00391 14.25C8.8737 14.237 8.72396 14.2174 8.55469 14.1914L7.87109 14.0938L7.42188 14.6406C7.35677 14.7057 7.24609 14.8034 7.08984 14.9336C6.94661 15.0508 6.77083 15.1875 6.5625 15.3438C6.35417 15.5 6.10677 15.6693 5.82031 15.8516C5.53385 16.0208 5.25391 16.1706 4.98047 16.3008C5.11068 15.9753 5.21484 15.6432 5.29297 15.3047C5.37109 14.9661 5.41016 14.6406 5.41016 14.3281L5.42969 14.2891V13.4102L4.74609 13.0586C3.63932 12.4987 2.77995 11.776 2.16797 10.8906C1.55599 10.0052 1.25 9.04167 1.25 8C1.25 6.86719 1.64062 5.82552 2.42188 4.875C3.20312 3.91146 4.26432 3.14974 5.60547 2.58984ZM10 0.5C8.1901 0.5 6.51693 0.838542 4.98047 1.51562C3.44401 2.17969 2.22656 3.09115 1.32812 4.25C0.442708 5.39583 0 6.64583 0 8C0 9.28906 0.364583 10.474 1.09375 11.5547C1.82292 12.6224 2.85156 13.4948 4.17969 14.1719C4.17969 14.1849 4.17318 14.1979 4.16016 14.2109C4.16016 14.2109 4.16016 14.2174 4.16016 14.2305C4.16016 15.0768 3.82812 16.0729 3.16406 17.2188C3.13802 17.2839 3.125 17.3555 3.125 17.4336C3.125 17.5898 3.17708 17.7266 3.28125 17.8438C3.39844 17.9479 3.53516 18 3.69141 18C3.70443 18 3.73698 18 3.78906 18C3.8151 18 3.83464 18 3.84766 18C4.44661 17.8958 5.09115 17.6615 5.78125 17.2969C6.47135 16.9323 7.03125 16.5807 7.46094 16.2422C7.90365 15.9036 8.20964 15.6302 8.37891 15.4219C8.71745 15.474 9.08203 15.5 9.47266 15.5C9.52474 15.5 9.60938 15.5 9.72656 15.5C9.84375 15.5 9.9349 15.5 10 15.5C11.8099 15.5 13.4831 15.168 15.0195 14.5039C16.556 13.8268 17.7669 12.9154 18.6523 11.7695C19.5508 10.6107 20 9.35417 20 8C20 6.16406 19.2057 4.54297 17.6172 3.13672C15.9635 1.69141 13.8867 0.838542 11.3867 0.578125C10.918 0.526042 10.4557 0.5 10 0.5Z"
								fill="#222237"
							/>
						</svg>
						Ask {data.influencer.name}
					</Button>
				</div>
			</Holder>

			<motion.div style={{ y }} className="background">
				<video
					autoPlay
					muted
					loop
					src={data.game.header_background_video}
					poster={data.game.header_background_poster}
				/>
			</motion.div>

			<VideoOverlay
				showing={videoShowing}
				setShowing={setVideoShowing}
				video={data.game.game_trailer_video}
				poster={data.game.game_trailer_poster}
			/>

			<div className="cover" />
		</Wrapper>
	);
};

export default GameHeroImage;
