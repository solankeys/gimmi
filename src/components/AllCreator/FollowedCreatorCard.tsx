import { Avatar } from '@ui';
import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
	height: 355px;
	width: 275px;
	position: relative;
	flex-shrink: 0;
	padding-right: 10px;
	z-index: 1;

	.img-primary {
		max-height: 235px;
		height: 100%;
		width: 100%;
		background-image: url('https://admin.stampede.store/wp-content/uploads/2021/07/rodeyBro_pfp.png');
		// background: #00d171;
		background-size: cover;
		background-position: center center;
		background-repeat: no-repeat;
		position: relative;
	}

	.author {
		position: absolute;
		bottom: 10px;
		left: 10px;
		z-index: 1;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.author-name {
		font-size: 14px;
		line-height: 21px;
		font-weight: bold;
		margin-left: 5px;
		color: #fff;
	}

	.img-secondary {
		max-height: 120px;
		width: 100%;
		background: #f5f5f5;
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}

	.creator-game {
		height: 100px;
		width: 77px;
		margin: 10px;
		margin-right: 0;

		img {
			height: 100%;
			width: 100%;
		}
	}

	.creator-game-more {
		font-size: 12px;
		border-radius: 50%;
		background: #fff;
		width: 56px;
		height: 56px;
		display: flex;
		justify-content: center;
		align-items: center;
		margin: auto;
	}
`;

const FollowedCreatorCard = ({ followedCreators, key }) => {
	const { user_name, user_avatar, user_image, creator_game } = followedCreators;

	return (
		<Wrapper key={key}>
			<div className="img-primary">
				<div className="author">
					<Avatar size="40px" image={user_avatar} />
					<h3 className="author-name">{user_name}</h3>
				</div>
			</div>
			{creator_game.map(({ creator_game_name, creator_game_img }, index) => (
				<div className="img-secondary" key={index}>
					<div className="creator-game">
						<img src={creator_game_img} alt={creator_game_name} />
					</div>
					<div className="creator-game">
						<img src={creator_game_img} alt={creator_game_name} />
					</div>
					<div style={{ flex: '1' }}>
						<button className="creator-game-more">+2 More</button>
					</div>
				</div>
			))}
		</Wrapper>
	);
};

export default FollowedCreatorCard;
