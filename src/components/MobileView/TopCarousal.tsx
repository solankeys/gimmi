import React from 'react';
import { useEmblaCarousel } from 'embla-carousel/react';
import { Video } from '@ui';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/free-mode';

const Slides = [
	{
		imgsrc: '../img/coman.jpg',
	},
	{
		imgsrc: '../img/coman.jpg',
	},
	{
		imgsrc: '../img/coman.jpg',
	},
];
const TopCarousal = ({ sectionData, data, section, emblaRef, setVideoElm, landscape }) => {
	const [viewportRef, embla] = useEmblaCarousel({
		loop: true,
		skipSnaps: false,
	});

	return (
		<div className="top-carousel">
			<Swiper
				modules={[Pagination, Navigation]}
				slidesPerView={1}
				spaceBetween={200}
				loop={true}
				pagination={{
					clickable: true,
				}}
				className="mySwiper"
				navigation
				onSwiper={(swiper: any) => console.log(swiper)}
				onSlideChange={() => console.log('slide change')}
			>
				{[...data.highlights[0].slides, ...data.highlights[1].slides, ...data.highlights[2].slides].map(
					(slide: any, index: number) => {
						return (
							<>
								<SwiperSlide key={`slide-${index}`}>
									<div className="carousal-item">
                    <div className='image-container'>
										<img
											// src='../img/coman.jpg'
											src={slide.slide_image}
											alt=""
											style={{ width: '100%', height: '100%' }}
										/>
                    </div>
									</div>
                  <div className="tabspacer" />
                  <div className="video video-target">
										<Video
											src={slide.slide_video_file}
											url={slide.slide_video_file}
											poster={slide.slide_video_poster}
										/>
									</div>
								</SwiperSlide>
							</>
						);
					}
				)}
			</Swiper>
		</div>
	);
};

export default TopCarousal;
