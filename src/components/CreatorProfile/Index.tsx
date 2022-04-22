import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import styled from 'styled-components';
import Footer from '~/Footer';
import Header from '~/Header';
import LatestReview from '~/Homepage/LatestReviews';
import TopDiscussion from '~/Homepage/TopDiscussion';
import TopQuestions from '~/Homepage/TopQuestion';
import HeaderMobile from '~/mobile/Header';
import data from '../Homepage/homepage.json';
import AboutCreator from './AboutCreator';
import Follows from './Follow';


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
				<HeaderMobile data={data} showInit={true} showStoreInfo={true} />
			) : (
				<Header data={data} showInit={true} showMenuInfo={true} showStoreInfo= {true}/>
			)}
			<Follows data={data} />
			<LatestReview data={data} text={'Game Reviews'} SeeAll={false} />
			<TopQuestions data={data} />
			<TopDiscussion data={data} />
			<AboutCreator />
			<Footer />
		</Wrapper>
	);
};

export default Index;
