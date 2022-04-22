import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import Header from '~/Header';
import Footer from '~/Footer';

import AllCreatorSection from './AllCreatorSection';
import FollowedCreatorSection from './FollowedCreatorSection';
import data from './allCreators.json';
import HeaderMobile from '~/mobile/Header';
import { useMediaQuery } from 'react-responsive';

/* Style
---------------------------------- */

const Wrapper = styled.section`
	padding-top: 90px;
`;
const Container = styled.div``;

/* Component
------------------------------ */

const AllCreator = ({ creators: { allCreators } }) => {
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
			{/* <Header data={data} showInit={true} showMenuInfo={true} /> */}
			{mobile ? (
				<HeaderMobile data={data} showInit={true} />
			) : (
				<Header data={data} showInit={true} showMenuInfo={true} />
			)}
			<Container>
				<FollowedCreatorSection data={data} />
				<AllCreatorSection data={allCreators} />
			</Container>
			<Footer />
		</Wrapper>
	);
};

export default AllCreator;
