/* TabControls
======================================= */

import React from 'react';
import styled from 'styled-components';

/* Style
---------------------------------- */

const Wrapper = styled.div`
	display: flex;
	margin-bottom: 26px;
	border-bottom: 1px solid #e4e4e4;
	position: relative;
	margin-top: -32px;

	.tab {
		position: relative;
		min-width: 88px;

		.score {
			font-weight: bold;
			font-size: 18px;
			line-height: 21px;
			letter-spacing: 1.125px;
			text-align: left;
			margin-bottom: 6px;
		}

		&.tab-0 {
			min-width: 107px;
		}
	}

	button {
		color: #222237;

		font-size: 12px;
		line-height: 14px;
		letter-spacing: 0.75px;

		margin-right: 30px;
		padding: 10px 0;
		position: relative;

		.line {
			width: 100%;
			height: 3px;
			background-color: #02ee81;
			position: absolute;
			bottom: 0;
			left: 0;
			opacity: 0;
		}

		&.current {
			.line {
				opacity: 1;
			}
		}
	}
`;

/* Component
------------------------------ */

const TabControls = ({ sections, section, setSection }) => {
	return (
		<Wrapper>
			{sections.map((value: any, index: number) => {
				return (
					<div className={`tab tab-${index}`} key={`tab-${value.tab_key}`}>
						<button
							className={section === value.tab_key ? 'current' : null}
							onClick={() => setSection(value.tab_key)}
						>
							<div className="score">{value.tab_score}</div>
							{value.tab_title}
							<span className="line" />
						</button>
					</div>
				);
			})}
		</Wrapper>
	);
};

export default TabControls;
