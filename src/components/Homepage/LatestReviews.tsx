import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import Slider from '~/ui/components/emblaCarousel';

import Avatar from '~/ui/components/avatar';
import Link from 'next/link';
const Container = styled.div`
	margin: 0 auto;
	max-width: 93.125rem;
`;

const ItemContainer = styled.div`
	display: flex;
	// flex-wrap: wrap;
	justify-content: space-between;
	margin-top: 15px;
	row-gap: 20px;
`;

const Card = ({ item, key }) => {
	return (
		<div className="images-wrapper" key={key}>
			<div className="image">
				<img src={item.image_file} alt="" />
				<div className="reviews-wrapper">
					<div className="reviews">8.8</div>
				</div>
				<div className="text-container">
					<Link href="/creator-profile" passHref>
						<Avatar image={item.avatar} size="38px" className="avatar" />
					</Link>
					<Link href="/creator-profile" passHref>
						<div className="name">{item.name}</div>
					</Link>
				</div>
				<div className="review-name">Destiny</div>
			</div>
		</div>
	);
};

const LatestReview = ({ data, text, SeeAll }) => {
	const { gallery } = data;

	return (
		<div className="review-wrapper">
			<Slider data={gallery} title={text} showAll={SeeAll}>
				{gallery &&
					gallery.length > 0 &&
					gallery.map((item: any, index: any) => {
						return <Card item={item} key={index} />;
					})}
			</Slider>
		</div>
	);
};

export default LatestReview;
