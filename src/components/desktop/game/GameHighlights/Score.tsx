/* Score
======================================= */

import React from 'react';
import styled from 'styled-components';

/* Style
---------------------------------- */

const Wrapper = styled.div`
	display: flex;
	align-items: center;

	position: relative;
	width: 384px;
	height: 122px;
	margin: auto;
	margin-bottom: -6px;
	pointer-events: none;

	.circle-total {
		flex-shrink: 0;
		background-color: #fff;
		border-radius: 100px;
		.inside {
			display: flex;
			align-items: center;
			justify-content: center;
			text-align: center;
			flex-direction: column;

			width: 122px;
			height: 122px;

			position: absolute;
			top: 0;
			left: 0;

			.number {
				font-weight: bold;
				font-size: 32px;
				line-height: 28px;
				letter-spacing: -0.663902px;
			}

			.label {
				font-weight: bold;
				font-size: 16px;
				line-height: 18px;
			}
		}

		.label {
		}

		svg {
			width: 100%;
			height: 100%;
		}
	}

	.circle {
		flex-shrink: 0;
		border-radius: 100px;

		.number {
			font-weight: 500;
			font-size: 15.3px;
			line-height: 18px;
			letter-spacing: 0.95625px;

			display: flex;
			align-items: center;
			justify-content: center;
			text-align: center;

			width: 54px;
			height: 54px;

			position: absolute;
			top: 0;
			left: 0;
		}

		svg {
			width: 100%;
			height: 100%;
		}
	}

	.circle1 {
		position: absolute;
		top: 33px;
		left: -15px;
	}
	.circle2 {
		position: absolute;
		top: 48px;
		left: 97px;
	}
	.circle3 {
		position: absolute;
		top: 33px;
		left: 185px;
	}
	.circle4 {
		position: absolute;
		top: 13px;
		right: -10px;
	}
`;

/* Component
------------------------------ */

const CircleSmall = ({ number, className }) => {
	return (
		<div className={className}>
			<svg width={32} height={32} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
				<circle cx={16} cy={16} r={15.15} stroke="#02EE81" strokeWidth={1.7} />
				<circle cx={16} cy={16} r={4} fill="#222237" />
			</svg>
		</div>
	);
};

const CircleLarge = ({ number, className }) => {
	return (
		<div className={className}>
			<div className="inside">
				<div className="number">{number}</div>
				<div className="label">Total</div>
			</div>
			<svg width={122} height={122} viewBox="0 0 122 122" fill="none" xmlns="http://www.w3.org/2000/svg">
				<circle cx={61} cy={61} r={61} fill="#B6FADA" />
				<circle cx={61} cy={61} r={50.874} fill="#81F1BD" stroke="#fff" strokeWidth={3} />
			</svg>
		</div>
	);
};

const DottedLine = () => (
	<svg width={322} height={26} viewBox="0 0 322 26" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M1 1l112 16 88-16 122.053 24.5" stroke="gray" strokeDasharray={3} />
	</svg>
);

function avg(arr: any) {
	var sum = 0;
	for (var i in arr) {
		sum += parseFloat(arr[i]);
	}
	var numbersCnt = arr.length;

	return sum / numbersCnt;
}

const Score = ({ sections }) => {
	return (
		<Wrapper>
			<CircleSmall number={sections[0].tab_score} className="circle circle1" />
			<CircleSmall number={sections[1].tab_score} className="circle circle2" />
			<CircleSmall number={sections[2].tab_score} className="circle circle3" />
			<CircleLarge
				number={avg([sections[0].tab_score, sections[1].tab_score, sections[2].tab_score]).toFixed(1)}
				className="circle-total circle4"
			/>
			<DottedLine />
		</Wrapper>
	);
};

export default Score;
