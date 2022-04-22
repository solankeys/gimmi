import React from 'react';
// import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

import reviews from './productReviews.json';
import styled from 'styled-components';
import { Button } from '@ui';
import Slider from '~/ui/components/emblaCarousel';
import LatestReview from '~/Homepage/LatestReviews';

// import Title from '../../components/Title';
// import Card from '../../components/NewCard';

const SimilarProducts = ({ data }) => {
	const Wrapper = styled.div`
		padding: 0px 100px;
		margin-bottom: 70px;
		.more-button {
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;

			button {
				width: 158px;
				height: 37px;
				background-color: transparent;

				&:hover {
					background-color: ${({ theme }) => theme.colors.primary};
				}
			}
		}
		.selection-wrapper {
			.slick-prev {
				left: unset;
				right: 70px;
				top: -68px;
				width: 32px;
				height: 32px;

				text-align: center;
				line-height: 32px !important;
				opacity: 1;
				display: flex !important;
				align-items: center;
				justify-content: center;
				background-color: #222237;
			}
		}
		.selection-wrapper {
			.slick-prev svg,
			.slick-next svg {
				color: white;
				font-size: 22px;
				background-color: #222237;
			}
		}
		.selection-wrapper {
			.slick-next {
				left: unset;
				right: 25px;
				top: -68px;
				width: 32px;
				height: 32px;

				opacity: 1;
				text-align: center;
				line-height: 32px !important;
				display: flex !important;
				align-items: center;
				justify-content: center;
			}
		}
		.slick-prev:before,
		.slick-next:before {
			display: none;
		}

		.image {
			height: 200px;
			width: 200px;
			object-fit: cover;
		}
	`;

	return (
		<>
			<LatestReview data={data} text={'You May Also Like'} SeeAll={false} />
			<Wrapper>
				<div className="more-button">
					<Button outline>See All</Button>
				</div>
			</Wrapper>
		</>
	);
};

export default SimilarProducts;
