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
		.like-icon {
			position: absolute;
			right: 20px;
		}
		.image-like {
			height: 15px;
			width: 15px;
		}
		.text-like {
			font-size: 14px;
			margin-left: 5px;
		}
		.like-container {
			display: flex;
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
	.button-content {
		display: flex;
		-webkit-box-align: center;
		align-items: center;
		-webkit-box-pack: center;
		justify-content: center;
		text-align: center;
		font-weight: bold;
		font-family: Relative, Inter, -apple-system, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
		text-transform: uppercase;
		color: rgb(255, 255, 255);
		background-color: rgb(0, 209, 113);
		width: 158px;
		height: 37px;
		margin-top: 20px;
	}
	.button {
		color: rgb(255, 255, 255);
		line-height: 13px;
		letter-spacing: 2px;
	}
	&:last-child {
		margin: 0;
	}

	@media (max-width: 980px) {
		display: block;
		padding: 30px 20px;

		.content-left {
			display: none;
		}
		.text-block {
			display: flex;
			flex-direction: column;
		}
		.divider {
			display: none;
		}
	}
`;

/* Component
------------------------------ */

const Comments = ({ data: { item, productQuestions } }) => {
	const product_image = item.product_quote.product_quotes[0];
	return (
		<>
			{productQuestions.map(
				(entry: any, i) =>
					entry.influencer_response && (
						<Wrapper key={`comment-${i}`}>
							<div className="content-left">
								<div className="inside">
									<div className="image">
										<img src={product_image.image} alt="watch me" />
									</div>
								</div>
								<div className="button-content">
									<button className="button"> BUY NOW</button>
								</div>
							</div>

							<div className="divider" />
							<div className="content-right">
								<div className="like-icon">
									<div className="like-container">
										<img src="/img/like.png" className="image-like" alt="like me" />
										<div className="text-like">86</div>
									</div>
								</div>
								<div className="question text-block">
									<Avatar className="avatar" image={entry.user_avatar} size="60px" />
									<div className="content">
										<div className="name">{entry.user_name}</div>
										<div className="text">{entry.user_question}</div>
									</div>
								</div>
								<div className="answer text-block">
									<Avatar className="avatar" image={item.influencer.avatar} size="60px" />
									<div className="content">
										<div className="name">{item.influencer.name}</div>
										<div className="text">{entry.influencer_response}</div>
									</div>
								</div>
							</div>
						</Wrapper>
					)
			)}
		</>
	);
};

export default Comments;
