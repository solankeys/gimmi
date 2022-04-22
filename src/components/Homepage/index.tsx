import Footer from '~/Footer';
import Header from '~/Header';
import GameHeroImage from './GameHeroImage';
import data from './homepage.json';
import LatestReview from './LatestReviews';
import TopDiscussion from './TopDiscussion';
import TopQuestions from './TopQuestion';
import Creator from './Creator';
import Gallery from './Gallery';
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import styled from 'styled-components';
import HeaderMobile from '~/mobile/Header';

const Wrapper = styled.section`
	margin: auto;
`;
const Homepage = ({ data: Home }) => {
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
				<HeaderMobile data={data} showInit={true} showStoreInfo={false} />
			) : (
				<Header data={data} showInit={true} showStoreInfo={false} showMenuInfo={true} />
			)}
			<GameHeroImage data={data} />
			{/* <LatestReview data={data}  /> */}
			<LatestReview data={data} text={'Latest Reviews'} SeeAll={true} />
			<TopQuestions data={data} />
			<TopDiscussion data={data} />
			<Creator data={data} />
			<Gallery />
			<Footer />
		</Wrapper>
	);
};
export default Homepage;
