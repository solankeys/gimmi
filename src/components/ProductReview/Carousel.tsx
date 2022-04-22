import React from 'react';

import Image from 'next/image';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/free-mode';
import data from './productReviews.json';

const Carousel = ({ product }) => {
	return (
		<div className="carousal-wrapper">
			<div className="carousal">
				<Swiper
					modules={[Pagination, Navigation]}
					centeredSlides={true}
					// modules={[Navigation]}

					slidesPerView={1}
					spaceBetween={200}
					loop={true}
					pagination={{
						clickable: true,
					}}
					className="mySwiper"
					breakpoints={{
						'1024': {
							slidesPerView: 3,
						},
						'768': {
							slidesPerView: 3,
						},
						'640': {
							slidesPerView: 3,
						},
						'320': {
							slidesPerView: 1,
						},
					}}
					navigation
					onSwiper={(swiper: any) => console.log(swiper)}
					onSlideChange={() => console.log('slide change')}
				>
					{product.hero_slideshow.slideshow_images.map((item, i) => (
						<SwiperSlide key={`slideshow-img-${i}`}>
							<div className="carousal-item">
								<img
									src={item.images}
									width={330}
									height={470}
									alt=""
									style={{ marginBottom: 100, marginTop: 100 }}
								/>
							</div>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
			<div className="like-icon">
				<div className="like-container" style={{ width: 90 }}>
					<img src="/img/like.png" className="image-like" alt="" />
					<div className="text-like">48</div>
				</div>
				<div className="like-container">
					<svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M5.605 2.59c1.355-.56 2.82-.84 4.395-.84 1.575 0 3.034.28 4.375.84 1.354.56 2.422 1.321 3.203 2.285.781.95 1.172 1.992 1.172 3.125s-.39 2.181-1.172 3.145c-.781.95-1.849 1.705-3.203 2.265-1.341.56-2.8.84-4.375.84h-.997a8.69 8.69 0 01-.448-.059l-.684-.097-.45.547a5.489 5.489 0 01-.331.293 16.22 16.22 0 01-.527.41c-.209.156-.456.325-.743.508-.286.169-.566.319-.84.449a6.79 6.79 0 00.313-.996c.078-.339.117-.664.117-.977l.02-.039v-.879l-.684-.351c-1.107-.56-1.966-1.283-2.578-2.168C1.556 10.005 1.25 9.04 1.25 8c0-1.133.39-2.174 1.172-3.125.781-.964 1.842-1.725 3.183-2.285zM10 .5C8.19.5 6.517.839 4.98 1.516 3.444 2.18 2.227 3.09 1.328 4.25.443 5.396 0 6.646 0 8c0 1.29.365 2.474 1.094 3.555.729 1.067 1.758 1.94 3.086 2.617 0 .013-.007.026-.02.039v.02c0 .846-.332 1.842-.996 2.988a.573.573 0 00-.039.215c0 .156.052.293.156.41a.598.598 0 00.41.156h.157c.599-.104 1.243-.338 1.933-.703.69-.365 1.25-.716 1.68-1.055.443-.338.749-.612.918-.82.338.052.703.078 1.094.078H10c1.81 0 3.483-.332 5.02-.996 1.536-.677 2.747-1.589 3.632-2.734C19.551 10.61 20 9.354 20 8c0-1.836-.794-3.457-2.383-4.863-1.654-1.446-3.73-2.298-6.23-2.559A12.55 12.55 0 0010 .5z"
							fill="currentColor"
						></path>
					</svg>
					<div className="text-like">ASK {data.influencer.name}</div>
				</div>
			</div>
		</div>
	);
};

export default Carousel;
