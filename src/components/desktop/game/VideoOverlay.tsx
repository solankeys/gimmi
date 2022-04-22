/* VideoOverlay
======================================= */

import React, { useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import styled from 'styled-components';
import { Video } from '@ui';
import YouTube from 'react-youtube';

/* Style
--------------------------------------- */

const Wrapper = styled(motion.div)`
	position: fixed;
	top: 0;
	left: 0;
	z-index: 9999;
	width: 100%;
	height: 100%;

	background-color: rgba(0, 0, 0, 0.5);

	padding: 0 40px;
	display: flex;
	justify-content: center;
	align-items: center;

	.content {
		background-color: #000;
		padding: 0px;
		border-radius: 16px;
		overflow: hidden;
		position: relative;

		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		text-align: center;

		max-width: 1024px;
		width: 100%;

		.spacer {
			padding-top: 56.25%;
		}

		iframe {
			width: 100%;
			height: 100%;
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
		}
	}

	@media (max-width: 800px) {
		padding: 0 10px;

		.content {
			padding: 40px 22px;
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
		initial: { opacity: 0, scale: 0.8 },
		animate: { opacity: 1, scale: 1 },
		exit: { opacity: 0, scale: 0.8 },
		transition: { duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] },
	},
};

/* Props
--------------------------------------- */

/* Component
------------------------------ */

const VideoOverlay = ({ showing, setShowing, video, poster }) => {
	const backgroundRef = useRef(null);

	const handleClickOutside = (event: any) => {
		if (backgroundRef.current) {
			if (backgroundRef.current == event.target) {
				setShowing(false);
			}
		}
	};

	return (
		<AnimatePresence>
			{showing && (
				<Wrapper ref={backgroundRef} {...animation.background} onClick={(event) => handleClickOutside(event)}>
					<motion.div className="content" {...animation.content}>
						<Video src={video} url={video} poster={poster} autoplay={true} muted={false} />
					</motion.div>
				</Wrapper>
			)}
		</AnimatePresence>
	);
};

export default VideoOverlay;
