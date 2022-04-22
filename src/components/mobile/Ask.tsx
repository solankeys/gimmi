/* Ask
======================================= */

import { Avatar } from '@ui';
import { motion } from 'framer-motion';
// import { useSession } from 'next-auth/client';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import useStore from 'state';
import styled from 'styled-components';
import TextareaAutosize from 'react-textarea-autosize';
import ThanksOverlay from '~/desktop/comments/ThanksOverlay';
import ErrorOverlay from '~/desktop/comments/ErrorOverlay';
import { use100vh } from './Mobile';
import useSWR from 'swr';

/* Style
---------------------------------- */

const Wrapper = styled(motion.div)`
	background-color: #fff;
	color: #000;

	width: 100%;
	height: 100vh;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 99;
	overflow: hidden;

	display: flex;
	flex-direction: column;

	.inside {
		background-color: #fff;
		display: flex;
		flex-direction: column;
	}

	.logo {
		position: absolute;
		top: 20px;
		left: 20px;
	}

	.btn-close {
		position: absolute;
		top: 34px;
		right: 20px;
	}

	.header {
		height: 90px;
		padding: 0px 21px;
		flex-shrink: 0;

		display: flex;
		align-items: center;
		border-bottom: 1px solid #d5d5d5;

		.avatar {
			margin-right: 8px;
		}

		.name {
			font-size: 16px;
			line-height: 19px;
		}
	}

	.entries {
		flex-grow: 1;
		overflow: hidden;
		overflow-y: auto;
		-webkit-overflow-scrolling: touch;

		padding: 40px 21px 100px 21px;

		.nocontent {
			text-align: center;

			font-weight: bold;

			.title {
				font-size: 16px;
				margin-bottom: 6px;
			}

			.text {
				font-size: 12px;
				line-height: 16px;
				letter-spacing: 0.3px;
				opacity: 0.6;
			}
		}

		.entry {
			margin-bottom: 60px;
			.group {
				display: flex;
				margin-bottom: 14px;
				.avatar {
					margin-right: 8px;
				}

				.info {
					padding-top: 6px;
				}

				.name {
					font-size: 16px;
					line-height: 11px;
					letter-spacing: 0.4px;
					margin-bottom: 10px;
					font-weight: bold;
				}

				.text {
					font-size: 12px;
					line-height: 16px;
					letter-spacing: 0.3px;
				}
			}
		}
	}

	.bottom {
		border-top: 1px solid #d5d5d5;
		position: relative;

		textarea {
			width: 100%;
			border: none;
			resize: none;
			min-height: 56px;
			padding: 20px 20px;
			font-size: 14px;
			line-height: 22px;
			letter-spacing: 0.525px;
			outline: none;
			margin: 0;
		}

		button {
			position: absolute;
			bottom: 20px;
			right: 20px;
		}
	}
`;

/* Icons
------------------------------ */

function CloseIcon() {
	return (
		<svg width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
			<rect
				x={2.222}
				y={1.515}
				width={23}
				height={1}
				rx={0.5}
				transform="rotate(45 2.222 1.515)"
				fill="#D8D8D8"
				stroke="#979797"
			/>
			<rect
				x={1.515}
				y={17.778}
				width={23}
				height={1}
				rx={0.5}
				transform="rotate(-45 1.515 17.778)"
				fill="#D8D8D8"
				stroke="#979797"
			/>
		</svg>
	);
}

function LogoIcon() {
	return (
		<svg width={29} height={29} viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
			<mask id="prefix__a" maskUnits="userSpaceOnUse" x={0} y={0} width={29} height={29}>
				<path fillRule="evenodd" clipRule="evenodd" d="M0 0h29v29H0V0z" fill="#fff" />
			</mask>
			<g mask="url(#prefix__a)">
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M14.493 0C6.494 0-.014 6.505-.014 14.5S6.494 29 14.493 29h9.62v-9.638h-4.79v4.85h-4.83c-5.358 0-9.717-4.357-9.717-9.712 0-5.355 4.36-9.712 9.717-9.712 5.358 0 9.717 4.357 9.717 9.712v4.812H29V14.5C29 6.505 22.492 0 14.493 0"
					fill="#02EE81"
				/>
			</g>
		</svg>
	);
}

/* Component
------------------------------ */

const Ask = ({ setOverlay, data }) => {
	// const [session]: any = useSession();
	const { data: session } = useSession();

	const { setLogin } = useStore();
	const { handleSubmit, register, setValue } = useForm();
	const [thanksShowing, setThanksShowing] = useState(false);
	const [errorShowing, setErrorShowing] = useState(false);
	const [entries, setEntries] = useState([]);

	const ref = use100vh();

	const fetcher = (url: string) => fetch(url).then((res) => res.json());
	const { data: response, error } = useSWR(
		`https://admin.stampede.store/wp-json/gimmi/v1/questions?influencer=${data.influencer.slug}&game=${data.game.slug}`,
		fetcher
	);

	useEffect(() => {
		if (response) {
			setEntries(response);
		}
	}, [response]);

	const onFocus = () => {
		if (!session) {
			setLogin(true);
		}
	};

	const onSubmit = handleSubmit(async ({ question }) => {
		if (!session) {
			setLogin(true);
			return false;
		}

		if (question === '') {
			setErrorShowing(true);
		} else {
			setThanksShowing(true);
			setValue('question', '');

			await fetch(`/api/submit_question`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					question: question,
					influencer_name: data.influencer.name,
					influencer_slug: data.influencer.slug,
					game_name: data.game.title,
					game_slug: data.game.slug,
				}),
			});
		}
	});

	return (
		<>
			<Wrapper
				initial={{ opacity: 0, y: '100%' }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: '100%' }}
				transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
			>
				<div className="inside" ref={ref}>
					<button className="btn-close" onClick={() => setOverlay(null)}>
						{CloseIcon()}
					</button>

					<div className="header">
						<Avatar image={data.influencer.avatar} size="45px" className="avatar" />
						<div className="name">Ask {data.influencer.name}</div>
					</div>

					<div className="entries">
						{!entries ||
							(entries.length === 0 && (
								<div className="nocontent">
									<div className="title">No questions found</div>
									<div className="text">Be the first to ask a question using the field below!</div>
								</div>
							))}

						{entries &&
							entries.map((entry: any, index: number) => (
								<div className="entry" key={index + 'askentry'}>
									<div className="group">
										<Avatar image={entry.user_avatar} size="45px" className="avatar" />
										<div className="info">
											<div className="name">{entry.user_name}</div>
											<div className="text">{entry.user_question}</div>
										</div>
									</div>
									<div className="group">
										<Avatar image={data.influencer.avatar} size="45px" className="avatar" />
										<div className="info">
											<div className="name">{data.influencer.name}</div>
											<div className="text">{entry.influencer_response}</div>
										</div>
									</div>
								</div>
							))}
					</div>

					<div className="bottom">
						<form className="comment-form" onSubmit={onSubmit}>
							<div className="field">
								<TextareaAutosize
									name="question"
									placeholder={`What’s your question for ${data.influencer.name}?`}
									minRows={1}
									{...register('question')}
									onFocus={onFocus}
								/>
								<button className="btn-submit">
									<svg
										width={29}
										height={28}
										viewBox="0 0 29 28"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M14.5 0c7.734 0 14 6.266 14 14s-6.266 14-14 14-14-6.266-14-14 6.266-14 14-14z"
											fill="#222237"
										/>
										<path
											d="M15.85 17.887l3.536-3.604a.39.39 0 00.098-.17.403.403 0 00-.098-.396l-3.536-3.604a.388.388 0 00-.552.004.406.406 0 00-.004.563l2.866 2.92H9.393A.397.397 0 009 14c0 .221.176.4.393.4h8.767l-2.866 2.92a.406.406 0 00.004.563.388.388 0 00.552.004z"
											fill="#fff"
										/>
									</svg>
								</button>
							</div>
						</form>
					</div>
				</div>
			</Wrapper>

			<ThanksOverlay
				showing={thanksShowing}
				setShowing={setThanksShowing}
				name={data.influencer.display_name}
				avatar={data.influencer.avatar}
			/>

			<ErrorOverlay showing={errorShowing} setShowing={setErrorShowing} />
		</>
	);
};

export default Ask;
