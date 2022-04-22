/* Comments
======================================= */

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Button, Holder } from '@ui';

import Comments from './Comments';
import CommentForm from '~/desktop/comments/CommentForm';

/* Style
---------------------------------- */

const Wrapper = styled.div<{ name: string }>`
	background-color: #f6f6f6;
	padding: 96px 40px 99px;

	.holder {
		max-width: 1190px;
	}
	.discussion {
		display: flex;
		justify-content: 'space-between';
		font-weight: bold;
	}

	.title-main {
		font-weight: bold;
		font-size: 42px;
		line-height: 42px;
		margin-bottom: 50px;
		font-family: ${({ theme }) => theme.fonts.heading};
	}

	.more-button {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;

		button {
			width: 158px;
			height: 37px;
			background-color: transparent;

			&:hover {
				background-color: ${({ theme }) => theme.colors.primary};
			}
		}
	}

	.entries {
		margin-bottom: 60px;
	}
	@media (max-width: 980px) {
		.discussion {
			display: none;
		}
	}
`;

/* Component
------------------------------ */

const postsPerPage = 3;
const arrayForHoldingPosts = [];

const CommentMain = ({ data }) => {
	const [entries, setEntries] = useState([]);
	const [count, setCount] = useState(1);
	const { item } = data;
	return (
		<Wrapper name="ask-section">
			<Holder className="holder">
				<div style={{ display: 'flex', justifyContent: 'space-between' }}>
					<h2 className="title-main">Ask {item.influencer.name}</h2>
					<div className="discussion">
						<div style={{ marginRight: 40 }}>Ask {item.influencer.name} </div>
						<div>Discussion </div>
					</div>
				</div>

				<CommentForm data={item} />

				<div className="entries">
					<Comments data={data} />
				</div>

				<div className="more-button">
					<Button outline>Show More</Button>
				</div>
			</Holder>
		</Wrapper>
	);
};

export default CommentMain;
