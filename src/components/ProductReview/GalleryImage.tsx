/* GameOverview
======================================= */

import React from 'react';
import styled from 'styled-components';
import { Button, Holder, Divider, Video } from '@ui';
import { scroller } from 'react-scroll';
import data from './productReviews.json';
// import 'photoswipe/dist/photoswipe.css';
// import 'photoswipe/dist/default-skin/default-skin.css';

import { Gallery, Item } from 'react-photoswipe-gallery';

/* Style
---------------------------------- */

const Wrapper = styled.div`
	.img-holder {
		flex-grow: 1;
		margin: 0.2rem;
		overflow: hidden;
	}
	.gallery_list {
		display: flex;
	}

	.image {
		height: 16rem;
		object-fit: cover;
		object-position: center center;
		border-radius: 8px;
		overflow: hidden;
		transition-duration: 300ms;
	}
`;

/* Component
------------------------------ */

const GalleryImage = () => {
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
			<div className="gallery-list">
				{data.slideshow_images.map((item, i) => (
					<div className="img-holder" key={i}>
						<img className="image" src={item.images} alt="gallery" />
					</div>
				))}
			</div>
		</Wrapper>
		// <Gallery>
		// 	<Item
		// 		original="https://placekitten.com/1024/768?image=1"
		// 		thumbnail="https://placekitten.com/80/60?image=1"
		// 		width="1024"
		// 		height="768"
		// 	>
		// 		{({ ref, open }) => <img ref={ref} onClick={open} src="https://placekitten.com/80/60?image=1" />}
		// 	</Item>
		// 	<Item
		// 		original="https://placekitten.com/1024/768?image=2"
		// 		thumbnail="https://placekitten.com/80/60?image=2"
		// 		width="1024"
		// 		height="768"
		// 	>
		// 		{({ ref, open }) => <img ref={ref} onClick={open} src="https://placekitten.com/80/60?image=2" />}
		// 	</Item>
		// </Gallery>
	);
};

export default GalleryImage;
