/* eslint-disable react-hooks/exhaustive-deps */
/* GameHighlights
======================================= */

import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { Holder, Video } from '@ui';
import Score from './Score';
import TabControls from './TabControls';
import CarouselControls from './CarouselControls';
import { useEmblaCarousel } from 'embla-carousel/react';

/* Style
---------------------------------- */

const Wrapper = styled.div`
	padding: 0px 40px 155px 40px;

	.holder {
		display: flex;
	}

	.col-left {
		margin-right: 30px;
		width: 100%;
	}

	.col-right {
		width: 400px;
		flex-shrink: 0;
		position: relative;
		margin-top: -40px;
	}

	.embla {
		overflow: hidden;
		position: relative;
		color: #222237;
		width: 100%;
		height: 595px;

		.container {
			display: flex;
			z-index: 1;
			position: relative;
			width: 100%;
			height: 595px;
		}

		.slide {
			position: relative;
			width: 100%;
			height: 595px;
			z-index: 1;
			flex-grow: 1;
			flex-shrink: 0;
			display: flex;
			flex-direction: column;

			.video {
				position: absolute;
				top: 0;
				left: 50%;
				transform: translateX(-50%);
				height: 595px;
			}

			.image {
				width: 100%;
				height: 595px;

				position: absolute;
				top: 0;
				left: 50%;
				transform: translateX(-50%);

				img {
					width: 1060px;
					min-width: 1060px;
					height: 595px;
				}
			}
		}

		.prevent-click {
			position: absolute;
			top: 0;
			left: 0;
			z-index: 10;
			width: 100%;
			height: 100%;
			display: none;
		}

		&.is-dragging {
			.prevent-click {
				display: block;
			}
		}
	}

	.content {
		margin-bottom: 10px;
		height: 107px;

		.title {
			font-weight: bold;
			font-size: 21px;
			line-height: 24px;
		}

		.text {
			font-size: 14px;
			line-height: 20px;
			letter-spacing: 0.875px;
		}
	}

	.btn-toggle {
		margin-bottom: 11px;
	}

	.image {
		font-size: 0;
		background-color: #000;
		img {
			display: block;
			width: 100%;
		}
	}
`;

/* Component
------------------------------ */

const GameHighlights = ({ data }) => {
	const [section, setSection] = useState(data[0].tab_key);
	const [sectionData, setSectionData] = useState(null);
	const [swap, setSwap] = useState(false);

	// embla ------------------------------

	const [emblaRef, embla] = useEmblaCarousel({ loop: true, draggable: false });
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [sectionIndex, setSectionIndex] = useState(0);
	const [scrollSnaps, setScrollSnaps] = useState([]);
	const [direction, setDirection] = useState('forward');

	const scrollPrev = useCallback(() => {
		setDirection('backward');
		return embla && embla.scrollPrev();
	}, [embla]);

	const scrollNext = useCallback(() => {
		setDirection('forward');
		return embla && embla.scrollNext();
	}, [embla]);

	const carouselScrollTo = useCallback((index) => embla && embla.scrollTo(index), [embla]);

	const onSelect = useCallback(() => {
		if (!embla) return;
		setSelectedIndex(embla.selectedScrollSnap());
		document.querySelectorAll('video.video-player').forEach((vid: any) => {
			vid.pause();
		});
	}, [embla, setSelectedIndex]);

	const toggleSwap = () => {
		setSwap(!swap);
	};

	useEffect(() => {
		if (embla) {
			onSelect();
			setScrollSnaps(embla.scrollSnapList());

			embla.on('select', () => {
				onSelect();
			});

			setTimeout(() => {
				embla.reInit();
			}, 200);
		}

		return () => {
			if (embla) embla.destroy();
		};
	}, [embla]);

	useEffect(() => {
		setSectionData(
			data.find((value: any, index: number) => {
				if (value.tab_key === section) {
					carouselScrollTo(index * 3);
					return true;
				}
				return false;
			})
		);

		if (direction == 'backward') {
			setSectionIndex(2);
		} else {
			setSectionIndex(0);
		}
	}, [section]);

	useEffect(() => {
		setSectionIndex(selectedIndex % 3);

		if (selectedIndex >= 0 && selectedIndex <= 2) {
			setSection(data[0].tab_key);
		}

		if (selectedIndex >= 3 && selectedIndex <= 5) {
			setSection(data[1].tab_key);
		}

		if (selectedIndex >= 6 && selectedIndex <= 8) {
			setSection(data[2].tab_key);
		}
	}, [selectedIndex]);

	// component ------------------------------

	return (
		<Wrapper>
			<Holder className="holder">
				<div className="col-left">
					<div className="embla" ref={emblaRef}>
						<div className="container">
							{[...data[0].slides, ...data[1].slides, ...data[2].slides].map(
								(slide: any, index: number) => {
									return (
										<div className="slide" key={`slide-${index}`}>
											<div className="prevent-click" />
											{!swap && (
												<Video
													src={slide.slide_video_file}
													url={slide.slide_video_file}
													poster={slide.slide_video_poster}
													className="video"
													forcePlay={true}
												/>
											)}
											{swap && (
												<div className="image">
													<img src={slide.slide_image} alt="" />
												</div>
											)}
										</div>
									);
								}
							)}
						</div>
					</div>
				</div>

				<div className="col-right">
					<Score sections={data} />

					<TabControls sections={data} section={section} setSection={setSection} />

					<CarouselControls
						sectionData={sectionData}
						scrollPrev={scrollPrev}
						scrollNext={scrollNext}
						sectionIndex={sectionIndex}
					/>

					{sectionData && (
						<div className="content">
							<div className="text">{sectionData.slides[sectionIndex].slide_content_text}</div>
						</div>
					)}

					<button onClick={toggleSwap} className="btn-toggle">
						<svg width={22} height={20} viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path
								d="M16.033 1L21 5.686 16.428 10M9 5.686h11M5.967 10L1 14.686 5.572 19M13 14.686H2"
								stroke="#000"
								strokeWidth={1.15}
								strokeLinecap="round"
							/>
						</svg>
					</button>

					{sectionData && (
						<div className="image">
							{swap && (
								<Video
									src={sectionData.slides[sectionIndex].slide_video_file}
									url={sectionData.slides[sectionIndex].slide_video_file}
									poster={sectionData.slides[sectionIndex].slide_video_poster}
								/>
							)}
							{!swap && (
								<img className="image" src={sectionData.slides[sectionIndex].slide_image} alt="" />
							)}
						</div>
					)}
				</div>
			</Holder>
		</Wrapper>
	);
};

export default GameHighlights;
