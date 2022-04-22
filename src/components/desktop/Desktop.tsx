/* Desktop
======================================= */

import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import Comments from '~/desktop/comments/Comments';
import Footer from '~/Footer';
import GameFooter from '~/desktop/game/GameFooter';
import GameHighlights from '~/desktop/game/GameHighlights/GameHighlights';
import GameOverview from '~/desktop/game/GameOverview';
import GameHero from '~/desktop/game/GameHero';
import ImageGallery from '~/desktop/game/ImageGallery';
import Header from '~/Header';
import GameHeroImage from './game/GameHeroImage';
import LatestReview from '~/Homepage/LatestReviews';
import CommentTab from './CommentTab';
import HeaderMobile from '~/mobile/Header';

import { useMediaQuery } from 'react-responsive';

/* Style
---------------------------------- */

const Wrapper = styled.section`
	padding-top: 90px;
	position:relative;
`;

/* Component
------------------------------ */

const Desktop = ({ data }) => {
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
			<Header data={data} showInit={true} showStoreInfo={true} showMenuInfo={true} />
	
			<GameHeroImage data={data} />

			{/*}<GameHero data={data.game} />{*/}

			<GameHighlights data={data.highlights} />

			<GameOverview data={data.overview} name={data.influencer.name} />

			{/* <Comments data={data} /> */}
			<CommentTab data={data} />

			<ImageGallery entries={data.gallery} />

			<GameFooter data={data.game} />

			<LatestReview data={data} text={'You May Also Like'} SeeAll={false} />

			<Footer />
		</Wrapper>
	);
};

export default Desktop