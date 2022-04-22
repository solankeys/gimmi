/* Carousel
======================================= */

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Video } from '@ui';

/* Style
---------------------------------- */

const Wrapper = styled.div`
	position: relative;
	flex-grow: 1;
	width:auto;/
	background-color: #222237;

	.embla {
		overflow: hidden;
		position: relative;
		color: #222237;
		width: 100%;
		height: 100%;

		.container {
			display: flex;
			z-index: 1;
			position: relative;
			width: 100%;
			height: 100%;
		}

		.slide {
			position: relative;
			width: 100%;
			height: 100%;
			z-index: 1;
			flex-grow: 1;
			flex-shrink: 0;
			display: flex;
			flex-direction: column;
		}
	}

	.image {
		width: 100%;
		background-size: cover;
		// background-position: center 0;
		// z-index: 1;
		// flex-grow: 1;
		// flex-shrink: 0;
		// height:50vh;
	}

	.tabspacer {
		width: 100%;
		height: 46px;
		flex-shrink: 0;
		background-color: #fff;
	}

	// .video {
	// 	flex-shrink: 0;
	// }

	.overview {
		width: 100%;
		height: 100%;
		position: relative;
		z-index: 1;
		flex-grow: 1;
		flex-shrink: 0;
		display: flex;
		flex-direction: column;
	}

	.shadow {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 99;
		width: 100%;
		height: 100%;

		box-shadow: -20px -20px 100px 0px rgba(0, 0, 0, 0.5) inset;
		background-color: rgba(0, 0, 0, 0.1);
		pointer-events: none;
	}
`;

/* Component
------------------------------ */

const Carousel = ({ sectionData, data, section, emblaRef, setVideoElm, landscape }) => {
	const [rerender, setRerender] = useState();
	const [afterRender, setAfterRender] = useState(false);

	useEffect(() => {
		if (!afterRender) return;

		setVideoElm(document.querySelector('.video-target'));
	}, [afterRender, section, setVideoElm]);

	useEffect(() => {
		if (!afterRender) setAfterRender(true);
	}, [rerender, afterRender]);

	return (
		<Wrapper>
			<div className="embla" ref={emblaRef}>
				<div className="container">
					{[...data.highlights[0].slides, ...data.highlights[1].slides, ...data.highlights[2].slides].map(
						(slide: any, index: number) => {
							return (
								<div className="slide" key={`slide-${index}`}>
									{/* {!landscape && ( */}
										<div
											className="image"
											style={{ backgroundImage: `url('${slide.slide_image}')` }}
										/>
									{/* )} */}
									{/* {!landscape && <div className="tabspacer" />} */}
									<div className="video video-target">
										<Video
											src={slide.slide_video_file}
											url={slide.slide_video_file}
											poster={slide.slide_video_poster}
										/>
									</div>
									<div className="shadow" />
								</div>
							);
						}
					)}
					<div className="slide overview" key={`slide-overview`}>
						{!landscape && (
							<div
								className="image"
								style={{ backgroundImage: `url('${data.overview.mobile_image}')` }}
							/>
						)}
						{/* {!landscape && <div className="tabspacer" />} */}
						<div className="video video-target">
							<Video
								src={data.overview.video_file}
								url={data.overview.video_file}
								poster={data.overview.video_poster}
							/>
						</div>
						<div className="shadow" />
					</div>
				</div>
			</div>
		</Wrapper>
	);
};

export default Carousel;
