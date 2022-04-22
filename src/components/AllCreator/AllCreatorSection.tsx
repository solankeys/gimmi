import React from 'react';
import styled from 'styled-components';
import CreatorCard from './CreatorCard';

const Wrapper = styled.section`
	background-color: #f5f5f5;
	padding: 15px;

	@media screen and (min-width: 980px) {
		padding: 50px 40px;
	}

	h1 {
		font-size: 20px;
		// font-weight: bold;
	}
`;

const Container = styled.div`
	margin: 0 auto;
	max-width: 93.125rem;
`;

const ItemContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	margin-top: 25px;
	gap: 10px;
	row-gap: 20px;
`;

const AllCreatorSection = ({ data }) => {
	return (
		<Wrapper>
			<Container>
				<h1>All Creators</h1>
				<ItemContainer>
					{data.map((creators, index) => (
						<CreatorCard data={data} creators={creators} key={index} />
					))}
				</ItemContainer>
			</Container>
		</Wrapper>
	);
};

export default AllCreatorSection;
