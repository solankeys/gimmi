/* GameOverview
======================================= */

import React from 'react';
import styled from 'styled-components';
import { Button, Holder, Divider, Video } from '@ui';
import { scroller } from 'react-scroll';

/* Style
---------------------------------- */

const Wrapper = styled.div`
	padding: 0px 40px 147px 40px;

	.columns {
		display: grid;
		grid-template-columns: minmax(250px, 351px) minmax(500px, 1fr);
		column-gap: 132px;

		.divider {
			margin-bottom: 34px;
		}

		.text {
			font-size: 16px;
			line-height: 30px;
			letter-spacing: 1px;
			margin-bottom: 26px;
			font-family: ${({ theme }) => theme.fonts.faux};
		}

		.btn-comment {
			min-width: 203px;
			font-size: 12px;
			line-height: 14px;
			text-transform: capitalize;
			white-space: nowrap;

			svg {
				margin-right: 13px;
				width: 18px;
				height: 18px;
			}
		}
	}
`;

/* Component
------------------------------ */

const GameOverview = ({ data, name }) => {
	const scrollToAsk = () => {
		scroller.scrollTo('ask-section', {
			duration: 800,
			delay: 0,
			smooth: 'easeInOutQuart',
			offset: -90,
		});
	};

	return (
		<Wrapper>
			<Holder className="holder">
				<div className="columns">
					<div className="col-content">
						<Divider className="divider">OVERVIEW</Divider>

						<div className="text">{data.text}</div>

						<Button outline className="btn-comment" onClick={() => scrollToAsk()}>
							<svg
								width={20}
								height={20}
								viewBox="0 0 20 20"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M19 10a8.947 8.947 0 01-2.003 5.644c.234.712.65 1.514 1.43 2.109.183.148.13.475-.103.504-.807.12-2.16.149-3.434-.712A8.916 8.916 0 0110 19c-4.968 0-9-4.04-9-9s4.032-9 9-9 9 4.04 9 9z"
									stroke="currentColor"
									strokeWidth={1.04}
								/>
								<path
									d="M7.358 10.23c0-.523-.385-.922-.837-.922-.475 0-.837.424-.837.922 0 .524.384.923.837.923.452.025.837-.4.837-.923zM10.707 10.23c0-.523-.385-.922-.837-.922-.475 0-.838.424-.838.922 0 .524.385.923.838.923.452.025.837-.4.837-.923zM14.056 10.23c0-.523-.385-.922-.837-.922-.476 0-.838.424-.838.922 0 .524.385.923.838.923.452.025.837-.4.837-.923z"
									fill="currentColor"
								/>
							</svg>
							Ask {name}
						</Button>
					</div>

					<div className="col-video">
						<Video url={data.video_file} poster={data.video_poster} src="/img/youtube_play.png" />
					</div>
				</div>
			</Holder>
		</Wrapper>
	);
};

export default GameOverview;
