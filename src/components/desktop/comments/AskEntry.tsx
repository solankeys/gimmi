/* AskEntry
======================================= */

import React from 'react';
import styled from 'styled-components';
import { Avatar, Button } from '@ui';

/* Style
---------------------------------- */

const Wrapper = styled.div`
	background: #ffffff;
	box-shadow: 0px 4px 6px #eaeaea;
	margin-bottom: 26px;

	padding: 34px 47px;

	display: flex;
	align-items: center;

	.content-left {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;

		.inside {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			max-width: 120px;
		}
	}

	.divider {
		width: 2px;
		height: 160px;
		background-color: #eaeaea;
		margin-left: 34px;
		margin-right: 39px;
	}

	.content-right {
		.question {
			margin-bottom: 37px;
		}

		.text-block {
			display: flex;

			.avatar {
				margin-right: 20px;
				flex-shrink: 0;
			}

			.content {
				padding-top: 8px;

				.name {
					font-weight: bold;
					font-size: 14px;
					line-height: 22px;
					letter-spacing: 0.35px;
					margin-bottom: 4px;
				}

				.text {
					font-size: 16px;
					line-height: 22px;
					letter-spacing: 0.4px;
					font-family: ${({ theme }) => theme.fonts.faux};
				}
			}
		}
	}

	&:last-child {
		margin: 0;
	}
`;

/* Component
------------------------------ */

const AskEntry = ({ entry, data }) => {
	return (
		<Wrapper>
			<div className="content-left">
				<div className="inside">
					<div className="image">
						<img src={data.game.cover} alt="" />
					</div>
				</div>
			</div>

			<div className="divider" />

			<div className="content-right">
				<div className="question text-block">
					<Avatar className="avatar" image={entry.user_avatar} size="60px" />
					<div className="content">
						<div className="name">{entry.user_name}</div>
						<div className="text">{entry.user_question}</div>
					</div>
				</div>
				<div className="answer text-block">
					<Avatar className="avatar" image={data.influencer.avatar} size="60px" />
					<div className="content">
						<div className="name">{data.influencer.name}</div>
						<div className="text">{entry.influencer_response}</div>
					</div>
				</div>
			</div>
		</Wrapper>
	);
};

export default AskEntry;
