/* ImageGallery
======================================= */

import { useEmblaCarousel } from 'embla-carousel/react';
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Holder } from '@ui';
import YouTube from 'react-youtube';
import GalleryOverlay from './GalleryOverlay';

/* Style
---------------------------------- */

const Wrapper = styled.div`
	padding: 117px 40px 128px 40px;

	.holder {
		max-width: 1490px !important;
	}

	.top-content {
		width: 100%;
		margin-bottom: 50px;
		display: flex;
		align-items: center;
		justify-content: space-between;

		.title-main {
			font-weight: bold;
			font-size: 42px;
			line-height: 38px;

			font-family: ${({ theme }) => theme.fonts.heading};
		}

		.controls {
			display: flex;

			.pages {
				display: flex;
				align-items: center;
				margin-right: 35px;
				font-size: 14px;
				line-height: 16px;
				letter-spacing: 0.875px;
				color: #91919b;

				.current {
					font-weight: bold;
					font-size: 18px;
					line-height: 21px;
					color: #222237;
					margin-right: 8px;
				}

				.divider {
					margin-right: 6px;
				}
			}

			.buttons {
				display: flex;
				align-items: center;

				button {
					width: 39px;
					height: 39px;
					background-color: #222237;
					display: flex;
					align-items: center;
					justify-content: center;
					margin-left: 1px;
					border-radius: 2px;
				}
			}
		}
	}

	.holder {
		max-width: 1190px;
	}

	.embla {
		overflow: hidden;
		position: relative;

		.container {
			display: flex;
			z-index: 1;
			position: relative;
		}

		.slide {
			position: relative;
			width: 600px;
			flex-shrink: 0;
			padding-right: 10px;
			z-index: 1;

			.image {
				padding-top: 56.61%;
				background-color: #000;
				background-size: cover;
				background-position: center center;

				&.video {
					cursor: pointer;
					position: relative;

					img {
						position: absolute;
						top: 50%;
						left: 50%;
						transform: translate(-50%, -50%);
					}
				}
			}

			button {
				position: absolute;
				bottom: 20px;
				right: 30px;
			}
		}

		.pages {
			display: flex;
			padding-top: 42px;
			.page {
				width: 32px;
				height: 6px;
				background-color: #e4e4e4;
				margin: 0 5px;
				transition: all 200ms ease;

				&.selected {
					background-color: #222237;
				}
			}
		}
	}

	.circle {
		position: fixed;
		left: 0;
		top: 0;
		width: 112px;
		height: 112px;
		border-radius: 16px;
		z-index: 99;
		pointer-events: none;
	}

	.enlarge {
		background-color: #fff;
		padding: 10px;
		width: 100%;
		position: absolute;
		bottom: 0;
		left: 0;
		z-index: 99;
	}

	@media (max-width: 915px) {
		padding: 60px 20px 60px 20px;

		.title-main {
			font-size: 21px;
			line-height: 24px;
		}

		.embla {
			.slide {
				width: 100%;
				padding: 0;

				.image {
					img {
						width: 100%;
					}

					&.video {
						img {
							max-width: 100px;
						}
					}
				}
			}
		}
	}

	@media (max-width: 423px) {
		.top-content .controls .pages {
			display: none;
		}
	}
`;

/* Component
------------------------------ */

const ImageGallery = ({ entries }) => {
	const [emblaRef, embla] = useEmblaCarousel({ loop: true, align: 'start', slidesToScroll: 1 });
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [scrollSnaps, setScrollSnaps] = useState([]);

	const [overlay, setOverlay] = useState(null);

	const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla]);
	const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla]);
	const scrollTo = useCallback((index) => embla && embla.scrollTo(index), [embla]);

	const onSelect = useCallback(() => {
		if (!embla) return;
		setSelectedIndex(embla.selectedScrollSnap());
	}, [embla, setSelectedIndex]);

	useEffect(() => {
		if (embla) {
			onSelect();
			setScrollSnaps(embla.scrollSnapList());
			embla.on('select', onSelect);
		}
	}, [embla, onSelect]);

	return (
		<Wrapper>
			<Holder className="holder">
				<div className="top-content">
					<h2 className="title-main">Gallery</h2>

					<div className="controls">
						<div className="pages">
							<div className="current">0{selectedIndex + 1}</div>
							<div className="divider">/</div>
							<div className="total">0{entries.length}</div>
						</div>
						<div className="buttons">
							<button className="btn-prev" onClick={scrollPrev}>
								<svg
									width="10"
									height="16"
									viewBox="0 0 10 16"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M8.375 0.15625C8.47917 0.0520833 8.60417 0 8.75 0C8.89583 0 9.02083 0.0520833 9.125 0.15625C9.16667 0.1875 9.19792 0.223958 9.21875 0.265625C9.23958 0.307292 9.25521 0.354167 9.26562 0.40625C9.27604 0.447917 9.28125 0.494792 9.28125 0.546875C9.28125 0.588542 9.27604 0.630208 9.26562 0.671875C9.25521 0.713542 9.23958 0.755208 9.21875 0.796875C9.19792 0.838542 9.16667 0.880208 9.125 0.921875L2 8.04688L9.03125 15.0781C9.09375 15.1406 9.13542 15.2188 9.15625 15.3125C9.1875 15.4062 9.1875 15.5 9.15625 15.5938C9.13542 15.6875 9.09375 15.7656 9.03125 15.8281C8.92708 15.9323 8.79688 15.9844 8.64062 15.9844C8.49479 15.9844 8.36979 15.9323 8.26562 15.8281L0.859375 8.42188C0.755208 8.31771 0.703125 8.19271 0.703125 8.04688C0.703125 7.90104 0.755208 7.77604 0.859375 7.67188L8.375 0.15625Z"
										fill="white"
									/>
								</svg>
							</button>
							<button className="btn-next" onClick={scrollNext}>
								<svg
									width="10"
									height="16"
									viewBox="0 0 10 16"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M1.625 0.15625C1.52083 0.0520833 1.39583 0 1.25 0C1.10417 0 0.979167 0.0520833 0.875 0.15625C0.833333 0.1875 0.802083 0.223958 0.78125 0.265625C0.760417 0.307292 0.744792 0.354167 0.734375 0.40625C0.723958 0.447917 0.71875 0.494792 0.71875 0.546875C0.71875 0.588542 0.723958 0.630208 0.734375 0.671875C0.744792 0.713542 0.760417 0.755208 0.78125 0.796875C0.802083 0.838542 0.833333 0.880208 0.875 0.921875L8 8.04688L0.96875 15.0781C0.90625 15.1406 0.864583 15.2188 0.84375 15.3125C0.8125 15.4062 0.8125 15.5 0.84375 15.5938C0.864583 15.6875 0.90625 15.7656 0.96875 15.8281C1.07292 15.9323 1.20312 15.9844 1.35938 15.9844C1.50521 15.9844 1.63021 15.9323 1.73438 15.8281L9.14062 8.42188C9.24479 8.31771 9.29688 8.19271 9.29688 8.04688C9.29688 7.90104 9.24479 7.77604 9.14062 7.67188L1.625 0.15625Z"
										fill="white"
									/>
								</svg>
							</button>
						</div>
					</div>
				</div>

				<div className="embla" ref={emblaRef}>
					<div className="container">
						{entries.map((entry: any, index: number) => {
							if (entry.type == 'video') {
								return (
									<div className="slide" key={`gallery-slide${index}`}>
										<div
											className="image video"
											style={{
												backgroundImage: `url('${entry.image_file}')`,
											}}
											onClick={() => setOverlay(entry)}
										>
											<img src="/img/youtube_play.png" alt="Play" />
										</div>
									</div>
								);
							}

							return (
								<div className="slide" key={`gallery-slide${index}`}>
									<div
										className="image"
										style={{
											backgroundImage: `url('${entry.image_file}')`,
										}}
									/>
									<button onClick={() => setOverlay(entry)}>
										<svg
											width={32}
											height={32}
											viewBox="0 0 32 32"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												d="M0 2a2 2 0 012-2h28a2 2 0 012 2v28a2 2 0 01-2 2H2a2 2 0 01-2-2V2z"
												fill="#222237"
											/>
											<path
												d="M17.41 7.16a.384.384 0 00-.283.116.384.384 0 00-.116.282.232.232 0 00.009.108.416.416 0 00.05.1.438.438 0 00.231.182.367.367 0 00.116.016h7.557v7.458c0 .066.02.13.058.19a.326.326 0 00.15.15.35.35 0 00.19.058c.11 0 .207-.042.29-.125a.383.383 0 00.116-.281V7.558a.383.383 0 00-.116-.282.383.383 0 00-.281-.116h-7.972zM7.16 17.41c0-.111.04-.205.116-.283a.384.384 0 01.282-.116.232.232 0 01.108.009.416.416 0 01.1.05.438.438 0 01.182.231.367.367 0 01.016.116v7.557h7.458c.066 0 .13.02.19.058a.326.326 0 01.15.15.35.35 0 01.058.19c0 .11-.042.207-.125.29a.383.383 0 01-.281.116H7.558a.383.383 0 01-.282-.116.383.383 0 01-.116-.281v-7.972z"
												fill="#fff"
												stroke="#fff"
											/>
										</svg>
									</button>
								</div>
							);
						})}
					</div>
				</div>
			</Holder>

			<GalleryOverlay overlay={overlay} setOverlay={setOverlay} />
		</Wrapper>
	);
};

export default ImageGallery;
