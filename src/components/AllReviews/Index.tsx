import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import styled from 'styled-components';
import Footer from '~/Footer';
import Header from '~/Header';
import HeaderMobile from '~/mobile/Header';
import data from '../ProductReview/productReviews.json';
import CardData from './CardData';
import ReviewsCard from './ReviewsCard';

const Wrapper = styled.section`
	max-width: 1490px;
	margin: auto;
	padding-top: 90px;
`;

const Index = () => {
	const [mobile, setMobile] = useState(null);

	const [landscape, setLandscape] = useState(false);
	const isMobile = useMediaQuery({
		query: '(max-width: 980px)',
	});

	useEffect(() => {
		setMobile(isMobile);
	}, [isMobile]);

	return (
		<Wrapper>
			{mobile ? (
				<HeaderMobile data={data} showInit={true} />
			) : (
				<Header data={data} showInit={true} showMenuInfo={true} />
			)}
			<ReviewsCard />
			<Footer />
		</Wrapper>
	);
};

export default Index;
