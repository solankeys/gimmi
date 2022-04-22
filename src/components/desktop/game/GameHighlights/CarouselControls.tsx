/* CarouselControls
======================================= */

import React from 'react';
import styled from 'styled-components';

/* Style
---------------------------------- */

const Wrapper = styled.div`
	display: flex;
	margin-bottom: 20px;

	.pages {
		font-weight: 500;
		font-size: 14px;
		line-height: 16px;
		letter-spacing: 0.875px;
		color: #91919b;
		margin-right: 40px;
		width: 22px;

		.current {
			font-weight: bold;
			font-size: 42px;
			line-height: 48px;
			color: #222237;
		}

		.text {
			display: flex;
			color: #c4c4c4;
		}

		.divider {
			margin-right: 6px;
		}
	}

	.buttons {
		display: flex;
		height: 39px;
		margin-top: 10px;

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
`;

/* Component
------------------------------ */

const CarouselControls = ({ sectionData, scrollPrev, scrollNext, sectionIndex }) => {
	if (!sectionData) return null;

	return (
		<Wrapper>
			<div className="pages">
				<div className="current">{(sectionIndex + 1).toString().padStart(2, '0')}</div>
				<div className="text">
					<div className="divider">/</div>
					<div className="total">{sectionData.slides.length.toString().padStart(2, '0')}</div>
				</div>
			</div>
			<div className="buttons">
				<button className="btn-prev" onClick={scrollPrev}>
					<svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M8.375 0.15625C8.47917 0.0520833 8.60417 0 8.75 0C8.89583 0 9.02083 0.0520833 9.125 0.15625C9.16667 0.1875 9.19792 0.223958 9.21875 0.265625C9.23958 0.307292 9.25521 0.354167 9.26562 0.40625C9.27604 0.447917 9.28125 0.494792 9.28125 0.546875C9.28125 0.588542 9.27604 0.630208 9.26562 0.671875C9.25521 0.713542 9.23958 0.755208 9.21875 0.796875C9.19792 0.838542 9.16667 0.880208 9.125 0.921875L2 8.04688L9.03125 15.0781C9.09375 15.1406 9.13542 15.2188 9.15625 15.3125C9.1875 15.4062 9.1875 15.5 9.15625 15.5938C9.13542 15.6875 9.09375 15.7656 9.03125 15.8281C8.92708 15.9323 8.79688 15.9844 8.64062 15.9844C8.49479 15.9844 8.36979 15.9323 8.26562 15.8281L0.859375 8.42188C0.755208 8.31771 0.703125 8.19271 0.703125 8.04688C0.703125 7.90104 0.755208 7.77604 0.859375 7.67188L8.375 0.15625Z"
							fill="white"
						/>
					</svg>
				</button>
				<button className="btn-next" onClick={scrollNext}>
					<svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M1.625 0.15625C1.52083 0.0520833 1.39583 0 1.25 0C1.10417 0 0.979167 0.0520833 0.875 0.15625C0.833333 0.1875 0.802083 0.223958 0.78125 0.265625C0.760417 0.307292 0.744792 0.354167 0.734375 0.40625C0.723958 0.447917 0.71875 0.494792 0.71875 0.546875C0.71875 0.588542 0.723958 0.630208 0.734375 0.671875C0.744792 0.713542 0.760417 0.755208 0.78125 0.796875C0.802083 0.838542 0.833333 0.880208 0.875 0.921875L8 8.04688L0.96875 15.0781C0.90625 15.1406 0.864583 15.2188 0.84375 15.3125C0.8125 15.4062 0.8125 15.5 0.84375 15.5938C0.864583 15.6875 0.90625 15.7656 0.96875 15.8281C1.07292 15.9323 1.20312 15.9844 1.35938 15.9844C1.50521 15.9844 1.63021 15.9323 1.73438 15.8281L9.14062 8.42188C9.24479 8.31771 9.29688 8.19271 9.29688 8.04688C9.29688 7.90104 9.24479 7.77604 9.14062 7.67188L1.625 0.15625Z"
							fill="white"
						/>
					</svg>
				</button>
			</div>
		</Wrapper>
	);
};

export default CarouselControls;
