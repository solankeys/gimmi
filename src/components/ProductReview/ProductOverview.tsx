/* GameOverview
======================================= */

import React from 'react';
import styled from 'styled-components';
import { Button, Holder, Divider, Video } from '@ui';
import { scroller } from 'react-scroll';
import data from './productReviews.json';

/* Style
---------------------------------- */

const Wrapper = styled.div`
	margin-top: 0px;
	padding: 0px 40px 147px 40px;

	.title-content {
		text-align: center;
		margin-bottom: 50px;
	}
	.button-content {
		display: flex;
		justify-content: center;
	}
	.title {
		margin-bottom: 33px;
		font-weight: bold;
		font-size: 50px;
		line-height: 52px;
	}
	.button {
		display: flex;
		-webkit-box-align: center;
		align-items: center;
		-webkit-box-pack: center;
		justify-content: center;
		text-align: center;
		font-weight: bold;

		text-transform: uppercase;
		color: rgb(255, 255, 255);
		background-color: rgb(0, 209, 113);
		height: 59px;
		font-size: 16px;
		line-height: 18px;
		letter-spacing: 3px;
		padding: 0px 30px;
	}

	.columns {
		display: grid;
		grid-template-columns: minmax(250px, 345px) minmax(500px, 1fr);
		column-gap: 50px;

		.divider {
			margin-bottom: 34px;
		}

		.col-content {
			margin-top: 46px;
		}

		.text-title {
			font-size: 32px;
			line-height: 46px;
			letter-spacing: 1px;
			margin-bottom: 27px;
			font-weight: bold;
			text-rendering: geometricprecision;
			font-family: ${({ theme }) => theme.fonts.faux};
		}
		.text {
			font-size: 16px;
			line-height: 27px;
			letter-spacing: 0.4px;
			margin-bottom: 26px;
			font-family: ${({ theme }) => theme.fonts.faux};
		}

		.btn-comment {
			min-width: 203px;
			font-size: 12px;
			line-height: 14px;
			text-transform: capitalize;
			white-space: nowrap;
			border-radius: 100px;
			svg {
				margin-right: 13px;
				width: 18px;
				height: 18px;
			}
		}
	}
	@media (max-width: 980px) {
		.columns {
			display: flex;
			flex-direction: column-reverse;
		}
			.title {
		
		font-size: 24px;
		
	}
`;

/* Component
------------------------------ */

const ProductOverview = ({ product }) => {
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
			<div className="title-content">
				<div className="title">{product.about_product.title}</div>
				<div className="button-content">
					<button className="button">{`$ ${product.about_product.price} - BUY NOW`}</button>
				</div>
			</div>
			<Holder className="holder">
				<div className="columns">
					<div className="col-content">
						<div className="text-title">{product.about_product.heading}</div>
						<div className="text">{product.about_product.text}</div>

						<Button outline className="btn-comment">
							ASK ME ABOUT IT
						</Button>
					</div>

					<div className="col-video">
						<Video
							url={product.about_product.video_file}
							poster={product.about_product.video_poster}
							src="/img/youtube_play_2.png"
						/>
					</div>
				</div>
			</Holder>
		</Wrapper>
	);
};

export default ProductOverview;
