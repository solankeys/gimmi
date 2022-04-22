/* GameHero
======================================= */

import React from 'react';
import styled from 'styled-components';

/* Style
---------------------------------- */

const Wrapper = styled.div`
	padding: 52px 40px 71px;
	text-align: center;

	.game {
		font-size: 14px;
		line-height: 16px;
		letter-spacing: 0.823529px;
		color: #222237;
		margin-bottom: 15px;

		.pipe {
			margin: 0 8px;
		}
	}

	.title {
		font-weight: bold;
		font-size: 42px;
		line-height: 50px;
		color: #222237;
	}
`;

/* Component
------------------------------ */

const GameHero = ({ data }) => {
	return (
		<Wrapper>
			<div className="game">
				{data.developer} <span className="pipe">|</span> {data.genre}
			</div>
			<h1 className="title">{data.title}</h1>
		</Wrapper>
	);
};

export default GameHero;
