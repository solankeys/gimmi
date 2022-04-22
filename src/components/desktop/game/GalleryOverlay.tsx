/* GalleryOverlay
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

		img {
			width: 100%;
			display: block;
			max-width: 1280px;
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

interface Props {
	overlay: any;
	setOverlay: any;
}

/* Component
------------------------------ */

const GalleryOverlay = ({ overlay, setOverlay }: Props) => {
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
						{overlay.type == 'video' && (
							<Video
								src={overlay.video_file}
								url={overlay.video_file}
								poster={overlay.image_file}
								autoplay={true}
								muted={false}
							/>
						)}
						{overlay.type == 'image' && <img src={`${overlay.image_file}`} alt="" />}
					</motion.div>
				</Wrapper>
			)}
		</AnimatePresence>
	);
};

export default GalleryOverlay;
