/* Tabs
======================================= */

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

/* Style
---------------------------------- */

const Wrapper = styled.div`
	position: relative;

	width: 100%;
	height: 46px;

	position: absolute;
	bottom: 0;
	left: 0;

	.game-info {
		position: absolute;
		bottom: 100%;
		left: 10px;
		z-index: 9;
		max-width: 125px;
		margin-bottom: 40px;
		color: #fff;
		pointer-events: none;

		.influencer {
			position: relative;
			border-radius: 100%;
			width: 46px;
			height: 46px;
			border: 2px solid #fff;
			background-size: cover;
			background-position: center center;
			margin-bottom: 13px;
			pointer-events: all;
		}

		.game-meta {
			font-size: 10.5px;
			line-height: 12px;
			letter-spacing: 0.3px;
			margin-bottom: 2px;

			.pupe {
				margin: 0 8px;
			}
		}

		.game-title {
			font-weight: bold;
			font-size: 24px;
			line-height: 25px;
		}
	}

	.tabs {
		display: flex;
		align-items: center;
		z-index: 10;

		width: 100%;
		height: 46px;
		background-color: #fff;

		position: absolute;
		bottom:0;
		// bottom: -16px;
		left: 0;

		.tab {
			text-align: center;
			color: #222237;
			width: 25%;
			height: 46px;

			.number {
				font-weight: bold;
				font-size: 12.1387px;
				line-height: 14px;
				letter-spacing: -0.252889px;
				margin-bottom: 2px;
			}

			.text {
				font-size: 9.80431px;
				line-height: 12px;
			}

			.line {
				background: #02ee81;
				width: 100%;
				height: 3px;
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

		.overview {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;

			.icon {
				margin-bottom: 4px;
			}
		}

		.divider {
			width: 1px;
			height: 30px;
			background-color: #dadada;
			position: absolute;
			top: 9px;
			right: 0;
		}

		.total {
			position: relative;
			top: -2px;
			color: #222237;
			width: 86px;
			height: 86px;
			flex-shrink: 0;
			margin-right: 5px;
			pointer-events: none;

			.inside {
				position: absolute;
				top: 0;
				left: 0;
				width: 86px;
				height: 86px;
				display: flex;
				align-items: center;
				justify-content: center;
				flex-direction: column;
			}

			.number {
				font-weight: bold;
				font-size: 18.6749px;
				line-height: 22px;
				letter-spacing: -0.38906px;
			}

			.label {
				font-size: 9.80431px;
				line-height: 12px;
			}
		}
	}

	.sidebar {
		position: absolute;
		bottom: 100%;
		right: 14px;
		z-index: 9;

		// margin-bottom: 40px;
		margin-bottom: 25px;

		display: flex;
		flex-direction: column;
		align-items: center;

		pointer-events: none;

		.iconbtn {
			display: flex;
			flex-direction: column;
			align-items: center;
			// margin-top: 34px;
			margin-top: 15px;
			width: 40px;
			pointer-events: all;

			.icon {
				margin-bottom: 5px;
				color: #fff;
			}

			.text {
				font-weight: bold;
				font-size: 10.5px;
				line-height: 12px;
				text-align: center;
				letter-spacing: 0.071591px;
				color: #fff;
			}
		}
	}

	.pages-dots {
		position: absolute;
		bottom: 100%;
		left: 50%;
		z-index: 9;
		transform: translateX(-50%);
		margin-bottom: 20px;
		pointer-events: none;

		.page {
			width: 8px;
			height: 8px;
			background-color: #f2f2f2;
			margin: 0 3px;
			border-radius: 50%;

			&.selected {
				background-color: #02ee81;
			}
		}
	}
`;

/* Functions
------------------------------ */

function avg(arr: any) {
	var sum = 0;
	for (var i in arr) {
		sum += parseFloat(arr[i]);
	}
	var numbersCnt = arr.length;
	return sum / numbersCnt;
}

/* Icons
------------------------------ */

 export const LikesIcon = () => (
	<svg width="20px" height="18px" viewBox="0 0 20 18" version="1.1">
		<defs>
			<filter id="filter_1">
				<feColorMatrix in="SourceGraphic" type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0" />
			</filter>
			<path d="M0 0L14 0L14 18L0 18L0 0Z" id="path_1" />
		</defs>
		<g id="Group-6" filter="url(#filter_1)">
			<g id="Group-3" transform="translate(6 0)">
				<path d="M0 0L14 0L14 18L0 18L0 0Z" id="Clip-2" fill="none" fillRule="evenodd" stroke="none" />
				<g clipPath="url(#mask_1)">
					<path
						d="M0 7.67971L3.57388 0.297179C3.66166 0.119265 3.84676 -3.64726e-05 4.03554 -3.64726e-05C5.78099 -3.64726e-05 7.20098 1.36648 7.20098 3.04619L7.20098 5.964L11.6974 5.964C11.8141 5.964 11.9465 5.964 12.0684 5.98071C13.3019 6.15534 14.1582 7.27074 13.9754 8.4669L12.7449 16.1234C12.5833 17.1945 11.6226 17.9997 10.5095 18L0 18L0 8.64547L0 7.67971Z"
						id="Fill-1"
						fill="#222237"
						fillRule="evenodd"
						stroke="none"
					/>
				</g>
			</g>
			<path
				d="M1.8123 8C0.815536 8 0 8.79517 0 9.76703L0 16.233C0 17.2048 0.815536 18 1.8123 18L5 18L5 8L1.8123 8Z"
				id="Fill-4"
				fill="#222237"
				fillRule="evenodd"
				stroke="none"
			/>
		</g>
	</svg>
);

const AskIcon = () => (
	// <svg width={29} height={26} viewBox="0 0 29 26" fill="none" xmlns="http://www.w3.org/2000/svg">
	// 	<path
	// 		d="M28 13c0 2.851-1.11 5.465-2.949 7.525.345.95.958 2.02 2.107 2.812.268.198.191.633-.154.673-1.187.158-3.178.198-5.055-.95C19.881 24.286 17.392 25 14.75 25 7.436 25 1.5 19.614 1.5 13S7.436 1 14.75 1 28 6.386 28 13z"
	// 		stroke="#fff"
	// 		strokeWidth={1.21}
	// 	/>
	// 	<path
	// 		d="M10.86 13.307c0-.698-.566-1.23-1.232-1.23-.7 0-1.233.565-1.233 1.23 0 .698.567 1.23 1.233 1.23.666.033 1.232-.532 1.232-1.23zM15.79 13.307c0-.698-.566-1.23-1.232-1.23-.7 0-1.232.565-1.232 1.23 0 .698.566 1.23 1.232 1.23.666.033 1.233-.532 1.233-1.23zM20.721 13.307c0-.698-.566-1.23-1.233-1.23-.7 0-1.232.565-1.232 1.23 0 .698.566 1.23 1.232 1.23.667.033 1.233-.532 1.233-1.23z"
	// 		fill="#fff"
	// 	/>
	// </svg>
	<svg width="23.006714px" height="21.006714px" viewBox="0 0 23.006714 21.006714" version="1.1">
		<g id="Group-16" transform="translate(0.50335693 0.50335693)">
			<path
				d="M19.552 16.2706C21.078 14.5545 22 12.3762 22 10C22 4.48845 17.0723 0 11 0C4.92775 0 0 4.48845 0 10C0 15.5116 4.92775 20 11 20C13.1936 20 15.2601 19.4059 16.9769 18.3828C18.5347 19.3399 20.1879 19.3069 21.1734 19.1749C21.4595 19.1419 21.5231 18.7789 21.3006 18.6139C20.3468 17.9538 19.8382 17.0627 19.552 16.2706ZM8 9.99943C8 9.43219 7.54054 9 7 9C6.43243 9 6 9.4592 6 9.99943C6 10.5667 6.45946 10.9989 7 10.9989C7.54054 11.0259 8 10.5667 8 9.99943ZM11 9C11.5405 9 12 9.43219 12 9.99943C12 10.5667 11.5405 11.0259 11 10.9989C10.4595 10.9989 10 10.5667 10 9.99943C10 9.4592 10.4324 9 11 9ZM15 9C15.5405 9 16 9.43219 16 9.99943C16 10.5667 15.5405 11.0259 15 10.9989C14.4595 10.9989 14 10.5667 14 9.99943C14 9.4592 14.4324 9 15 9Z"
				id="Combined-Shape"
				fill="#FFFFFF"
				fillRule="evenodd"
				stroke="none"
			/>
		</g>
	</svg>
);

const DetailsIcon = () => (
	// <svg width={27} height={28} viewBox="0 0 27 28" fill="none" xmlns="http://www.w3.org/2000/svg">
	// 	<rect x={0.981} y={0.981} width={25.538} height={26.038} rx={6.736} stroke="#fff" strokeWidth={0.962} />
	// 	<rect x={12.646} y={10.969} width={2.208} height={9.367} rx={1.104} fill="#fff" />
	// 	<ellipse cx={13.75} cy={8.214} rx={1.104} ry={1.102} fill="#fff" />
	// </svg>

	<svg width="20px" height="20px" viewBox="0 0 20 20" version="1.1">
		<g id="Group-6">
			<path
				d="M5.41818 0L14.5818 0Q14.7148 0 14.8477 0.00652643Q14.9805 0.0130529 15.1129 0.02609Q15.2453 0.0391271 15.3768 0.0586436Q15.5084 0.07816 15.6389 0.104109Q15.7693 0.130057 15.8983 0.162376Q16.0274 0.194694 16.1546 0.233305Q16.2819 0.271915 16.4072 0.316724Q16.5324 0.361534 16.6553 0.412434Q16.7782 0.463334 16.8984 0.520203Q17.0186 0.577071 17.1359 0.639771Q17.2532 0.702471 17.3673 0.770851Q17.4814 0.839232 17.592 0.913127Q17.7026 0.987023 17.8094 1.06626Q17.9163 1.14549 18.0191 1.22987Q18.1219 1.31425 18.2204 1.40357Q18.319 1.4929 18.4131 1.58695Q18.5071 1.681 18.5964 1.77955Q18.6857 1.8781 18.7701 1.98092Q18.8545 2.08374 18.9337 2.19057Q19.013 2.29741 19.0869 2.408Q19.1608 2.51859 19.2291 2.63268Q19.2975 2.74676 19.3602 2.86407Q19.4229 2.98137 19.4798 3.10161Q19.5367 3.22185 19.5876 3.34473Q19.6385 3.46761 19.6833 3.59285Q19.7281 3.71808 19.7667 3.84536Q19.8053 3.97264 19.8376 4.10167Q19.8699 4.23069 19.8959 4.36114Q19.9218 4.4916 19.9414 4.62316Q19.9609 4.75473 19.9739 4.8871Q19.9869 5.01947 19.9935 5.15232Q20 5.28517 20 5.41818L20 14.5818Q20 14.7148 19.9935 14.8477Q19.9869 14.9805 19.9739 15.1129Q19.9609 15.2453 19.9414 15.3768Q19.9218 15.5084 19.8959 15.6389Q19.8699 15.7693 19.8376 15.8983Q19.8053 16.0274 19.7667 16.1546Q19.7281 16.2819 19.6833 16.4072Q19.6385 16.5324 19.5876 16.6553Q19.5367 16.7782 19.4798 16.8984Q19.4229 17.0186 19.3602 17.1359Q19.2975 17.2532 19.2291 17.3673Q19.1608 17.4814 19.0869 17.592Q19.013 17.7026 18.9337 17.8094Q18.8545 17.9163 18.7701 18.0191Q18.6857 18.1219 18.5964 18.2204Q18.5071 18.319 18.4131 18.4131Q18.319 18.5071 18.2204 18.5964Q18.1219 18.6857 18.0191 18.7701Q17.9163 18.8545 17.8094 18.9337Q17.7026 19.013 17.592 19.0869Q17.4814 19.1608 17.3673 19.2291Q17.2532 19.2975 17.1359 19.3602Q17.0186 19.4229 16.8984 19.4798Q16.7782 19.5367 16.6553 19.5876Q16.5324 19.6385 16.4072 19.6833Q16.2819 19.7281 16.1546 19.7667Q16.0274 19.8053 15.8983 19.8376Q15.7693 19.8699 15.6389 19.8959Q15.5084 19.9218 15.3768 19.9414Q15.2453 19.9609 15.1129 19.9739Q14.9805 19.9869 14.8477 19.9935Q14.7148 20 14.5818 20L5.41818 20Q5.28517 20 5.15232 19.9935Q5.01947 19.9869 4.8871 19.9739Q4.75473 19.9609 4.62316 19.9414Q4.4916 19.9218 4.36114 19.8959Q4.23069 19.8699 4.10167 19.8376Q3.97264 19.8053 3.84536 19.7667Q3.71808 19.7281 3.59285 19.6833Q3.46761 19.6385 3.34473 19.5876Q3.22185 19.5367 3.10161 19.4798Q2.98137 19.4229 2.86407 19.3602Q2.74676 19.2975 2.63268 19.2291Q2.51859 19.1608 2.408 19.0869Q2.29741 19.013 2.19057 18.9337Q2.08374 18.8545 1.98092 18.7701Q1.8781 18.6857 1.77955 18.5964Q1.681 18.5071 1.58695 18.4131Q1.4929 18.319 1.40357 18.2204Q1.31425 18.1219 1.22987 18.0191Q1.14549 17.9163 1.06626 17.8094Q0.987023 17.7026 0.913127 17.592Q0.839232 17.4814 0.770851 17.3673Q0.702471 17.2532 0.639771 17.1359Q0.577071 17.0186 0.520203 16.8984Q0.463334 16.7782 0.412434 16.6553Q0.361534 16.5324 0.316725 16.4072Q0.271915 16.2819 0.233305 16.1546Q0.194694 16.0274 0.162376 15.8983Q0.130057 15.7693 0.104109 15.6389Q0.07816 15.5084 0.0586436 15.3768Q0.0391271 15.2453 0.02609 15.1129Q0.0130529 14.9805 0.00652643 14.8477Q0 14.7148 0 14.5818L0 5.41818Q0 5.28517 0.00652643 5.15232Q0.0130529 5.01947 0.02609 4.8871Q0.0391271 4.75473 0.0586436 4.62316Q0.07816 4.4916 0.104109 4.36114Q0.130057 4.23069 0.162376 4.10167Q0.194694 3.97264 0.233305 3.84536Q0.271915 3.71808 0.316724 3.59285Q0.361534 3.46761 0.412434 3.34473Q0.463334 3.22185 0.520203 3.10161Q0.577071 2.98137 0.639771 2.86407Q0.702471 2.74676 0.770851 2.63268Q0.839232 2.51859 0.913127 2.408Q0.987023 2.29741 1.06626 2.19057Q1.14549 2.08374 1.22987 1.98092Q1.31425 1.8781 1.40357 1.77955Q1.4929 1.681 1.58695 1.58695Q1.681 1.4929 1.77955 1.40357Q1.8781 1.31425 1.98092 1.22987Q2.08374 1.14549 2.19057 1.06626Q2.29741 0.987023 2.408 0.913127Q2.51859 0.839232 2.63268 0.770851Q2.74676 0.702471 2.86407 0.639771Q2.98137 0.577071 3.10161 0.520203Q3.22185 0.463334 3.34473 0.412434Q3.46761 0.361534 3.59285 0.316725Q3.71808 0.271915 3.84536 0.233305Q3.97264 0.194694 4.10167 0.162376Q4.23069 0.130057 4.36114 0.104109Q4.4916 0.07816 4.62316 0.0586436Q4.75473 0.0391271 4.8871 0.02609Q5.01947 0.0130529 5.15232 0.00652643Q5.28517 0 5.41818 0ZM10 7C10.5523 7 11 6.55228 11 6C11 5.44772 10.5523 5 10 5C9.44771 5 9 5.44772 9 6C9 6.55228 9.44771 7 10 7ZM11 8.89105Q11 8.80328 10.9829 8.71721Q10.9658 8.63114 10.9322 8.55006Q10.8986 8.46898 10.8498 8.39601Q10.8011 8.32304 10.739 8.26098Q10.677 8.19892 10.604 8.15017Q10.531 8.10141 10.4499 8.06783Q10.3689 8.03424 10.2828 8.01712Q10.1967 8 10.109 8L9.89105 8Q9.80328 8 9.71721 8.01712Q9.63114 8.03424 9.55006 8.06783Q9.46898 8.10141 9.39601 8.15017Q9.32304 8.19892 9.26098 8.26098Q9.19892 8.32304 9.15017 8.39601Q9.10141 8.46898 9.06783 8.55006Q9.03424 8.63114 9.01712 8.71721Q9 8.80328 9 8.89105L9 14.109Q9 14.1967 9.01712 14.2828Q9.03424 14.3689 9.06783 14.4499Q9.10141 14.531 9.15017 14.604Q9.19892 14.677 9.26098 14.739Q9.32303 14.8011 9.39601 14.8498Q9.46898 14.8986 9.55006 14.9322Q9.63114 14.9658 9.71721 14.9829Q9.80328 15 9.89105 15L10.109 15Q10.1967 15 10.2828 14.9829Q10.3689 14.9658 10.4499 14.9322Q10.531 14.8986 10.604 14.8498Q10.677 14.8011 10.739 14.739Q10.8011 14.677 10.8498 14.604Q10.8986 14.531 10.9322 14.4499Q10.9658 14.3689 10.9829 14.2828Q11 14.1967 11 14.109L11 8.89105Z"
				id="Combined-Shape"
				fill="#FFFFFF"
				fillRule="evenodd"
				stroke="none"
			/>
		</g>
	</svg>
);

const Discuss = () => (
	<svg width="22px" height="19px" viewBox="0 0 22 19" version="1.1">
		<defs>
			<filter id="filter_1">
				<feColorMatrix in="SourceGraphic" type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0" />
			</filter>
		</defs>
		<g id="Group-9" filter="url(#filter_1)">
			<path
				d="M15.02 10.9922C13.8866 12.0665 12.5212 12.5971 10.9423 12.5948C10.5216 12.5948 10.1008 12.6006 9.6805 12.5915L9.68065 12.5915C9.53969 12.5814 9.40223 12.637 9.30942 12.7417C8.36335 13.7215 7.40752 14.6938 6.45762 15.6708C6.26225 15.8714 6.03901 16.0034 5.74668 15.9999C5.26494 15.9945 4.89966 15.6293 4.89662 15.1325C4.88946 14.3209 4.88946 13.5092 4.89662 12.6976C4.89662 12.5431 4.85136 12.4919 4.69348 12.452C2.36426 11.8642 0.943787 10.3697 0.252978 8.15416C0.124968 7.74319 0.0853417 7.30869 1.06581e-14 6.88512L1.06581e-14 5.70963C0.0400784 5.33539 0.110181 4.96475 0.209545 4.6013C0.788503 2.56098 2.01664 1.08441 4.06227 0.318077C4.65145 0.10217 5.27578 -0.00548492 5.90444 0.000215046C7.55154 0.000215046 9.19865 0.0060624 10.8451 0.000215046C13.137 -0.0098307 14.8561 0.997305 16.0366 2.88228C17.6439 5.44527 17.1963 8.92578 15.0201 10.9924L15.02 10.9922Z"
				id="Path"
				fill="#000000"
				stroke="none"
			/>
			<path
				d="M20.3813 8.03702C19.7787 7.4965 19.0349 7.13698 18.2361 7C18.2276 7.05959 18.2212 7.09383 18.2182 7.12672C18.1309 8.1764 17.8717 9.18291 17.3608 10.1063C16.0205 12.5283 13.9887 13.8509 11.1695 13.8873C10.8729 13.891 10.5764 13.8842 10.2778 13.8873C10.0358 13.891 9.92826 14.0727 10.0511 14.2726C10.7369 15.3898 11.696 16.1518 13.0068 16.3803C13.5656 16.4779 14.1473 16.4488 14.7187 16.4648L14.7187 16.4647C14.8448 16.4614 14.9657 16.5142 15.0487 16.6087C15.43 17.0151 15.8197 17.4143 16.2065 17.8156C16.503 18.1256 16.7995 18.4399 17.1041 18.7449C17.4176 19.0587 17.845 19.0828 18.153 18.8183C18.3509 18.6494 18.4103 18.423 18.4098 18.1737C18.4098 17.6601 18.4174 17.1461 18.4056 16.6324C18.4013 16.4482 18.4555 16.3837 18.6386 16.3156C19.0791 16.1521 19.5379 15.9913 19.9212 15.7302C22.4927 13.9776 22.716 10.1033 20.3813 8.0371L20.3813 8.03702Z"
				id="Path"
				fill="#000000"
				stroke="none"
			/>
		</g>
	</svg>
);

/* Component
------------------------------ */

const Controls = ({ data, section, setSection, videoElm, setOverlay, sectionIndex }) => {
	const [bottom, setBottom] = useState(0);

	useEffect(() => {
		if (!videoElm) return;

		const observer = new ResizeObserver((entries) => {
			for (let entry of entries) {
				setBottom(entry.contentRect.height);
			}
		});

		observer.observe(videoElm);

		return () => {
			observer.disconnect();
		};
	}, [videoElm]);

	if (!videoElm) return null;

	return (
		// <Wrapper>
		<Wrapper style={{ bottom }}>
			<div className="game-info">
				<button
					className="influencer"
					style={{ backgroundImage: `url('${data.influencer.avatar}')` }}
					onClick={() => setOverlay('influencer')}
				></button>
				<div className="game-meta">
					{data.game.developer} <span className="pipe">|</span> {data.game.genre}
				</div>
				<div className="game-title">{data.game.title}</div>
			</div>

			<div className="sidebar">
				<button className="iconbtn">
					<div className="icon">{LikesIcon()}</div>
					<div className="text">12</div>
				</button>

				<button className="iconbtn" onClick={() => setOverlay('ask')}>
					<div className="icon">{AskIcon()}</div>
					<div className="text">Ask</div>
				</button>

				<button className="iconbtn" onClick={() => setOverlay('discuss')}>
					<div className="icon">{Discuss()}</div>
					<div className="text">Discuss</div>
				</button>

				<button className="iconbtn" onClick={() => setOverlay('details')}>
					<div className="icon">{DetailsIcon()}</div>
					<div className="text">Details</div>
				</button>
			</div>

			{section != 'overview' && (
				<div className="pages-dots">
					{[...Array(3)].map((_: any, index: any) => (
						<button
							onClick={() => scrollTo(index)}
							key={index}
							className={index === sectionIndex ? 'page selected' : 'page'}
						/>
					))}
				</div>
			)}

			<div className="tabs">
				{data.highlights.map((value: any, index: number) => {
					return (
						<button
							key={`tab-${value.tab_key}`}
							className={section === value.tab_key ? 'tab current' : 'tab'}
							onClick={() => setSection(value.tab_key)}
						>
							<div className="number">{data.highlights[index].tab_score}</div>
							<div className="text">{value.tab_title}</div>
							<div className="line" />
							<div className="divider" />
						</button>
					);
				})}

				<button
					className={section === 'overview' ? 'tab overview current' : 'tab overview'}
					onClick={() => setSection('overview')}
				>
					<div className="icon">
						<svg width={10} height={11} viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path
								d="M8.615 4.791L2.008.571a.899.899 0 00-1.376.78v8.428c0 .725.783 1.168 1.376.779l6.607-4.22c.56-.346.56-1.19 0-1.547z"
								fill="#000"
							/>
						</svg>
					</div>
					<div className="text">Overview</div>
					<div className="line" />
				</button>

				<div className="total">
					<div className="inside">
						<div className="number">
							{avg([
								data.highlights[0].tab_score,
								data.highlights[1].tab_score,
								data.highlights[2].tab_score,
							]).toFixed(1)}
						</div>
						<div className="label">Total</div>
					</div>
					<svg width={88} height={88} viewBox="0 0 88 88" fill="none" xmlns="http://www.w3.org/2000/svg">
						<circle cx={44.066} cy={44.103} r={43.419} fill="#B6FADA" />
						<circle cx={43.773} cy={44.397} r={36.361} fill="#81F1BD" stroke="#fff" strokeWidth={1.796} />
					</svg>
				</div>
			</div>
		</Wrapper>
	);
};

export default Controls;
