import React from 'react';
import styled from 'styled-components';
import { Avatar, Follow } from '@ui';

const CardContainer = styled.div`
	// max-width: 275px;
	// width: 275px;
	width: 48%;
	height: 320px;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 20px;
	background: #fff;
	@media screen and (min-width: 768px) {
		width: 32.2%;
	}
	@media screen and (min-width: 1024px) {
		width: 19%;
	}
`;

const FollowContainer = styled.div`
	margin-left: auto;
`;

const UserDetails = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	margin-top: 15px;
	margin-bottom: 20px;
`;

const UserPhoto = styled.img`
	width: 100px;
	height: 100px;
	border-radius: 50%;
	margin-bottom: 10px;
`;

const UserName = styled.h3`
	font-size: 18px;
	font-weight: bold;
	margin-top: 10px;
`;

const UserFollowers = styled.p`
	font-size: 12px;
`;

const ViewButton = styled.button`
	font-size: 11px;
	height: 40px;
	width: 115px;
	text-transform: uppercase;
	letter-spacing: 1px;
	background-color: #51ee80;
	color: #000;
	font-weight: 500;
	border: none;
	@media screen and (min-width: 768px) {
		width: 150px;
	}
	@media screen and (min-width: 1024) {
		width: 180px;
	}
`;

const InnerWrapper = styled.div`
	padding: auto;
`;

const CreatorCard = ({ data, creators, key }) => {
	const { display_name, avatar, followers } = creators;

	const [allfollowers, setAllFollowers] = React.useState(0);
	const [following, setFollowing] = React.useState(false);

	return (
		<CardContainer key={key}>
			<FollowContainer>
				<Follow
					data={data}
					setFollowers={setAllFollowers}
					followers={allfollowers}
					setFollowing={setFollowing}
					following={following}
					style={{ fontSize: '8px', height: ' 24px', width: '79px', marginLeft: 'auto' }}
				/>
			</FollowContainer>
			<UserDetails>
				<Avatar image={avatar} size="95px" />
				<UserName>{display_name}</UserName>
				<UserFollowers>{followers} Followers</UserFollowers>
			</UserDetails>
			<ViewButton>View creator</ViewButton>
		</CardContainer>
	);
};

export default CreatorCard;
