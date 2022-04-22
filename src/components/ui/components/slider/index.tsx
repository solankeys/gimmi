import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

// import reviews from './productReviews.json';
import styled from 'styled-components';
import { Button } from '@ui';

// import Title from '../../components/Title';
// import Card from '../../components/NewCard';

const Index = ({ data, children, numsCol }) => {
	const Wrapper = styled.div`
		padding-top: 80px;
		.content-wrapper {
			position: relative;
		}
		.title_wrapper {
			font-weight: bold;
			margin-bottom: 20px;
			font-size: 20px;
		}
		.more-button {
			margin-top: 50px;
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
				background-color: #222237;
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

	// const data = reviews?.slideshow_images;s
	function SampleNextArrow(props: any) {
		const { className, style, onClick } = props;
		return (
			<div className={className} style={{ ...style, display: 'block', background: '#F4EAE9' }} onClick={onClick}>
				<MdKeyboardArrowRight />
			</div>
		);
	}

	function SamplePrevArrow(props: any) {
		const { className, style, onClick } = props;
		return (
			<div className={className} style={{ ...style, display: 'block', background: '#F4EAE9' }} onClick={onClick}>
				<MdKeyboardArrowLeft />
			</div>
		);
	}
	var settings = {
		dots: false,
		infinite: data && data.length > numsCol ? true : false,
		speed: 500,
		nextArrow: <SampleNextArrow />,
		prevArrow: <SamplePrevArrow />,
		slidesToShow: numsCol,
		slidesToScroll: 1,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
					infinite: true,
					dots: false,
				},
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					initialSlide: 2,
				},
			},
			{
				breakpoint: 450,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				},
			},
		],
	};
	// console.log({ data });
	return (
		data &&
		data.length > 0 && (
			<Wrapper>
				<div className="selection-wrapper">
					<div className="content-wrapper">
						<Slider {...settings}>
							{data &&
								data.length > 0 &&
								data.map((item: any, index: any) => {
									return (
										// <div className="image-wrapper" key={index}>
										// 	<img className="image" src={item.images} />
										// </div>
										children
									);
								})}
						</Slider>
					</div>
				</div>
			</Wrapper>
		)
	);
};

export default Index;
