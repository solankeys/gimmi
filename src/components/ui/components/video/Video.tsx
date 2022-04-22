/* Video
======================================= */

import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import { useEvent } from 'react-use';
import YouTube from 'react-youtube';
import styled from 'styled-components';
import { CommonProps } from '../..';

/* Styles
---------------------------------------- */

const Wrapper = styled.div<VideoProps>`
	position: relative;
	width: 100%;
	padding-top: 56.2%;

	.poster {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 1;
		width: 100%;
		height: 100%;
		background-size: cover;
		background-position: center;

		cursor: pointer;

		display: flex;
		justify-content: center;
		align-items: center;
	}

	iframe,
	video {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 0;
		width: 100%;
		height: 100%;
	}

	.playicon {
		width: 130px !important;
	}

	@media (max-width: 800px) {
		.playicon {
			width: 90px !important;
		}
	}
`;

/* Interface
---------------------------------------- */

export interface VideoProps extends CommonProps {
	poster?: string;
	className?: string;
	url?: string;
	youtubeID?: string;
	autoplay?: boolean;
	muted?: boolean;
	embla?: any;
	pauseAll?: boolean;
	setPauseAll?: any;
	forcePlay?: boolean;
	src: string;
}

/* Component
---------------------------------------- */

export const Video = ({
	css,
	url,
	poster,
	youtubeID,
	autoplay,
	muted,
	embla,
	forcePlay,
	src,
	...props
}: VideoProps) => {
	const [playVideo, setPlayVideo] = useState(false);
	const videoRef = useRef(null);

	useEffect(() => {
		if (videoRef.current) {
			videoRef.current.onplay = (event: any) => {
				document.querySelectorAll('video.video-player').forEach((vid: any) => {
					if (event.target != vid) vid.pause();
				});
				setPlayVideo(true);
			};

			videoRef.current.onpause = (event: any) => {
				setPlayVideo(false);
			};
		}
	}, []);

	const stateChanged = (e: any) => {
		if (e.data == 0) {
			setPlayVideo(false);
		}
	};

	const clickPlayVideo = () => {
		if (videoRef.current) {
			document.querySelectorAll('video.video-player').forEach((vid: any) => vid.pause());
			videoRef.current.play();
		}
	};

	if (!url && !youtubeID) {
		return null;
	}

	if (url) {
		return (
			<Wrapper {...props}>
				<AnimatePresence>
					{!playVideo && (
						<motion.div
							className="poster"
							onClick={clickPlayVideo}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							style={{ backgroundImage: `url('${poster}')` }}
						>
							<img src={src} alt="Play" className="playicon" />
						</motion.div>
					)}
				</AnimatePresence>
				<video
					controls
					src={url}
					poster={poster}
					loop={true}
					ref={videoRef}
					preload="none"
					className="video-player"
					autoPlay={autoplay}
				/>
			</Wrapper>
		);
	}

	return (
		<Wrapper {...props}>
			<AnimatePresence>
				{!playVideo && (
					<motion.div
						className="poster"
						onClick={() => setPlayVideo(true)}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
					>
						<img src={src} alt="Play" className="playicon" />
					</motion.div>
				)}
			</AnimatePresence>

			{playVideo && (
				<YouTube
					videoId={youtubeID}
					opts={{
						height: '390',
						width: '640',
						playerVars: {
							autoplay: 1,
							modestbranding: 1,
							iv_load_policy: 3,
							disablekb: 1,
							showinfo: 0,
							controls: 0,
							rel: 0,
						},
					}}
					onStateChange={stateChanged}
				/>
			)}
		</Wrapper>
	);
};

export default Video;
