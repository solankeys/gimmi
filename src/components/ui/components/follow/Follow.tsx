/* Follow
======================================= */

// import { useSession } from 'next-auth/client';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react';
import useStore from 'state';
import styled from 'styled-components';
import { CommonProps } from '../..';
import Icon from '../icon';

/* Interface
---------------------------------------- */

export interface FollowProps extends CommonProps {}

/* Styles
---------------------------------------- */

const Wrapper = styled.button<FollowProps>`
	height: 32px;
	width: 128px;

	display: flex;
	align-items: center;
	justify-content: center;
	text-align: center;

	font-weight: bold;
	font-size: 11px;
	letter-spacing: 1.00833px;

	background-color: #fff;
	border: 1px solid #222237;
	border-radius: 2px;

	font-family: ${({ theme }) => theme.fonts.heading};
	text-transform: uppercase;

	.icon {
		margin-right: 6px;
		width: 12px;
	}

	&:hover,
	&.following {
		color: #fff;
		border-color: ${({ theme }) => theme.colors.primary};
		background-color: ${({ theme }) => theme.colors.primary};
	}
`;

/* Component
---------------------------------------- */

export const Follow = ({ data, setFollowers, followers, setFollowing, following, ...props }) => {
	// const [session]: any = useSession();
	const { data: session } = useSession();

	const { setLogin } = useStore();

	const clickFollow = async () => {
		if (!session) {
			setLogin(true);
		} else {
			if (following) {
				setFollowing(false);
				setFollowers(followers - 1);
			} else {
				setFollowing(true);
				setFollowers(followers + 1);
			}

			await fetch(`/api/follow`, {
				method: 'POST',
				body: JSON.stringify({
					influencer_slug: data.influencer.slug,
					game_slug: data.game.slug,
				}),
			});
		}
	};

	return (
		<Wrapper onClick={clickFollow} className={following ? 'following' : null} {...props}>
			{following && <Icon name="check" className="icon" />}
			{following ? 'Following' : 'Follow'}
		</Wrapper>
	);
};

export default Follow;
