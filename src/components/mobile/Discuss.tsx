import { Avatar } from '@ui';
import { motion } from 'framer-motion';
// import { useSession } from 'next-auth/client';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import useStore from 'state';
import styled from 'styled-components';
import TextareaAutosize from 'react-textarea-autosize';
import { use100vh } from './Mobile';
import useSWR from 'swr';

import { LikesIcon } from './Controls';

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

		// padding: 40px 21px 100px 21px;
		padding: 40px 0 100px 0 .nocontent {
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
			// margin-bottom: 60px;
			border-bottom: 1px solid #d5d5d5;
			.group-container {
				border-bottom: 1px solid #d5d5d5;
				padding: 10px 0;
        .inter-action {
          margin-left: 20px;
        }
			}
			.group {
				padding: 10px 10px 10px 10px;
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
			.question {
			}
			.discussion-interactions {
				padding: 0 10px;
        display: flex;
        align-items: center ;
        gap:10px;
        .icon {
          display:flex;
          align-items: center;
        }
			}
			.response {
				margin-left: 20px;
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

// Icons

function Comment() {
	return (
		<svg width="34px" height="11.200012px" viewBox="0 0 14 11.200012" version="1.1">
			<g id="Group-9" filter="url(#filter_1)">
				<path
					d="M9.66362 6.59535C8.93442 7.23991 8.05591 7.55828 7.04011 7.55686C6.76941 7.55686 6.4987 7.56036 6.22826 7.55488L6.22836 7.55488C6.13767 7.54885 6.04923 7.58222 5.98952 7.64502C5.38083 8.23291 4.76587 8.81631 4.15472 9.4025C4.02902 9.52287 3.88539 9.60203 3.69731 9.59996C3.38737 9.59672 3.15236 9.37758 3.1504 9.07952C3.14579 8.59255 3.14579 8.10551 3.1504 7.61854C3.1504 7.52588 3.12128 7.49511 3.0197 7.47118C1.52113 7.11855 0.607216 6.2218 0.162762 4.8925C0.0804019 4.64591 0.0549073 4.38521 0 4.13107L0 3.42578C0.0257857 3.20123 0.0708888 2.97885 0.134817 2.76078C0.507309 1.53659 1.29747 0.650643 2.61359 0.190846C2.99266 0.0613017 3.39434 -0.00329095 3.79881 0.000129027C4.85853 0.000129027 5.91825 0.00363744 6.97754 0.000129027C8.45209 -0.00589842 9.55812 0.598383 10.3177 1.72937C11.3518 3.26716 11.0638 5.35547 9.66367 6.59541L9.66362 6.59535Z"
					id="Path"
					fill="#222237"
					stroke="none"
				/>
				<path
					d="M12.9377 4.62221C12.5423 4.2979 12.0542 4.08219 11.5299 4C11.5244 4.03575 11.5202 4.0563 11.5182 4.07603C11.4609 4.70584 11.2908 5.30975 10.9555 5.86379C10.0759 7.31701 8.74259 8.11055 6.89247 8.13236C6.69787 8.13462 6.50328 8.13055 6.30728 8.13236C6.14852 8.13462 6.07792 8.2436 6.15854 8.36353C6.60862 9.0339 7.23802 9.49108 8.09823 9.62821C8.46491 9.68677 8.84666 9.6693 9.22168 9.6789L9.22168 9.6788C9.30438 9.67681 9.38371 9.70849 9.43822 9.76525C9.68843 10.0091 9.94419 10.2486 10.198 10.4894C10.3926 10.6754 10.5872 10.8639 10.7871 11.0469C10.9928 11.2352 11.2733 11.2497 11.4754 11.091C11.6053 10.9896 11.6442 10.8538 11.6439 10.7042C11.6439 10.396 11.6489 10.0877 11.6412 9.77946C11.6384 9.66894 11.6739 9.6302 11.7941 9.58938C12.0832 9.49126 12.3842 9.39477 12.6358 9.23809C14.3233 8.18658 14.4699 5.86195 12.9378 4.62226L12.9377 4.62221Z"
					id="Path"
					fill="#222237"
					stroke="none"
				/>
			</g>
		</svg>
	);
}
function Report() {
	return (
		<svg width="34px" height="13px" viewBox="0 0 14 13" version="1.1" xmlns="http://www.w3.org/2000/svg">
			<g id="Group-2">
				<g id="Group-17">
					<path
						d="M12.6604 8.64569L8.35875 1.08974C7.97632 0.417741 7.26346 0 6.4982 0C5.73324 0 5.02057 0.417644 4.63765 1.08945L0.286789 8.73191C-0.0956445 9.40392 -0.0955484 10.2389 0.286789 10.9103C0.669416 11.5823 1.38228 12 2.14744 12L10.8511 12C10.8572 12 10.8633 12 10.8697 11.9996C12.046 11.9903 13 11.0164 13 9.82128C13 9.40183 12.8828 8.99666 12.6605 8.64548L12.6604 8.64569Z"
						id="Path"
						fill="#222237"
						stroke="none"
					/>
					<path
						d="M6.49993 3.16322C7.17281 3.16322 7.3369 3.67625 7.29549 3.97002L6.89174 7.15407C6.87832 7.44204 6.65762 7.55154 6.49981 7.55154C6.32315 7.55154 6.12339 7.4571 6.10789 7.15407L5.70414 3.97002C5.66293 3.66777 5.83115 3.16322 6.49989 3.16322L6.49993 3.16322Z"
						id="Path"
						fill="#FFFFFF"
						stroke="none"
					/>
					<path
						d="M7.08156 9.4102C6.92987 9.56566 6.71725 9.65581 6.49993 9.65581C6.28234 9.65581 6.06982 9.56557 5.91653 9.4102C5.76342 9.25475 5.67602 9.03921 5.67602 8.81855C5.67602 8.59969 5.76332 8.38417 5.91653 8.2287C6.06982 8.07325 6.28236 7.9847 6.49993 7.9847C6.71725 7.9847 6.92988 8.07314 7.08156 8.2287C7.23636 8.38416 7.32375 8.5997 7.32375 8.81855C7.32375 9.03932 7.23645 9.25474 7.08156 9.4102Z"
						id="Path"
						fill="#FFFFFF"
						stroke="none"
					/>
				</g>
			</g>
		</svg>
	);
}

function Like() {
	return (
		<svg width="34px" height="12px" viewBox="0 0 13 12" version="1.1" xmlns="http://www.w3.org/2000/svg">
			<defs>
				<path d="M0 0L9.10631 0L9.10631 12L0 12L0 0Z" id="path_1" />
			</defs>
			<g id="Group-6">
				<g id="Group-3" transform="translate(3.8936865 0)">
					<path
						d="M0 0L9.10631 0L9.10631 12L0 12L0 0Z"
						id="Clip-2"
						fill="none"
						fill-rule="evenodd"
						stroke="none"
					/>
					<g clip-path="url(#mask_1)">
						<path
							d="M0 5.11981L2.32464 0.198119C2.38173 0.0795103 2.50213 -2.43151e-05 2.62492 -2.43151e-05C3.76025 -2.43151e-05 4.68389 0.910989 4.68389 2.03079L4.68389 3.976L7.60858 3.976C7.6845 3.976 7.77059 3.976 7.84987 3.98714C8.65222 4.10356 9.20918 4.84716 9.09034 5.6446L8.28991 10.749C8.18484 11.463 7.55994 11.9998 6.83588 12L0 12L0 5.76365L0 5.11981Z"
							id="Fill-1"
							fill="#222237"
							fill-rule="evenodd"
							stroke="none"
						/>
					</g>
				</g>
				<path
					d="M1.2326 5.11981C0.554671 5.11981 0 5.6669 0 6.33556L0 10.7842C0 11.4529 0.554671 12 1.2326 12L3.40065 12L3.40065 5.11981L1.2326 5.11981Z"
					id="Fill-4"
					fill="#222237"
					fill-rule="evenodd"
					stroke="none"
				/>
			</g>
		</svg>
	);
}

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

export const Interactions = () => {
	return (
		<div className="discussion-interactions">
			<button className="icon">{Like()} 45</button>
			<button className="icon">{Comment()} 2</button>
			<button className="icon">{Report()} report</button>
		</div>
	);
};

const Discuss = ({ setOverlay, data }) => {
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
		<div className="discuss">
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
						<div className="name">Discussions</div>
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
									<div className="group-container">
										<div className="group question">
											<Avatar image={entry.user_avatar} size="45px" className="avatar" />
											<div className="info">
												<div className="name">{entry.user_name}</div>
												<div className="text">{entry.user_question}</div>
											</div>
										</div>
										<Interactions />
									</div>
                  <div className='group-container'>
									<div className="group response">
										<Avatar image={data.influencer.avatar} size="45px" className="avatar" />
										<div className="info">
											<div className="name">{data.influencer.name}</div>
											<div className="text">{entry.influencer_response}</div>
										</div>
									</div>
                  <div className='inter-action'>
                  <Interactions />
                  </div>
                  </div>
                  <div className='group-container'>
									<div className="group response">
										<Avatar image={data.influencer.avatar} size="45px" className="avatar" />
										<div className="info">
											<div className="name">{data.influencer.name}</div>
											<div className="text">{entry.influencer_response}</div>
										</div>
									</div>
                  <div className='inter-action'>
                  <Interactions />
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
		</div>
	);
};

export default Discuss;
