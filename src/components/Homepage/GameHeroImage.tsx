/* GameHeroImage
======================================= */

import React, { useState } from 'react';
import styled from 'styled-components';
import { Avatar, Button, Holder } from '@ui';
import { scroller } from 'react-scroll';
// import VideoOverlay from './VideoOverlay';
import { motion, useTransform, useViewportScroll } from 'framer-motion';
import VideoOverlay from '~/desktop/game/VideoOverlay';
import Link from 'next/link';

/* Style
---------------------------------- */

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
		<div className="wrapper">
			<Holder className="holder">
				<div className="game-title">
					<div className="game">
						{data.game.developer} <span className="pipe">|</span> {data.game.genre}
					</div>

					<h1 className="title">{data.game.title}</h1>
				</div>

				<div className="score-group">
					<div className="outer-border">
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
					<div className="button">
						<Link href="/all-reviews" passHref>
							<Button outline>Visit Review</Button>
						</Link>
					</div>
				</div>

				<div className="bottom">
					<div className="store-info">
						<Avatar image={data.influencer.avatar} size="64px" className="avatar" />
						<div className="content">
							<div className="info">
								<div className="name">{data.influencer.name}</div>
							</div>
						</div>
					</div>
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
		</div>
	);
};

export default GameHeroImage;
