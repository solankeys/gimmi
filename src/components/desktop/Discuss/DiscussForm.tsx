import React,{useState} from 'react'
import styled from 'styled-components';
import TextareaAutosize from 'react-textarea-autosize';
import { useForm } from 'react-hook-form';
import { Avatar } from '@ui';
import ThanksOverlay from '../comments/ThanksOverlay';
import ErrorOverlay from '../comments/ErrorOverlay';
// import { useSession } from 'next-auth/client';
import { useSession } from 'next-auth/react';

import useStore from 'state';

const Wrapper = styled.div`
	.comment-form {
		display: flex;
		width: 100%;
		margin-bottom: 58px;
	}

	.avatar {
		margin-right: 22px;
	}

	.field {
		position: relative;
		width: 100%;
		min-height: 64px;
		padding-top: 6px;

		input,
		textarea {
			background: #ffffff;
			border-radius: 30px;
			width: 100%;
			padding: 19px 35px;
			padding-right: 120px;
			resize: none;
			border: none;
			border: 1px solid #fff;
			// overflow-y:hidden;

			&::placeholder {
				font-size: 16px;
				line-height: 22px;
				letter-spacing: 0.6px;
				opacity: 0.5;
				color: #161616;
			}

			&:focus {
				outline: none;
				border: 1px solid #eaeaea;
			}
		}
		.arrow-submit {
			display: none;
		}

		.btn-submit {
			position: absolute;
			bottom: 20px;
			right: 16px;
			color: #fff;
			background-color: #222237;
			width: 158px;
			height: 37px;
			font-size: 11px;
			line-height: 13px;
			text-align: center;
			letter-spacing: 2px;
			border-radius: 100px;

			font-family: ${({ theme }) => theme.fonts.heading};
			text-transform: uppercase;

			&:hover {
				background-color: ${({ theme }) => theme.colors.primary};
			}
		}
	}

	@media (max-width: 980px) {
		.avatar {
			display: none;
		}
		.btn-submit {
			display: none;
		}
		.arrow-submit {
			position: absolute;
			bottom: 20px;
			right: 16px;
			color: #fff;
			background-color: #222237;
			width: 158px;
			height: 37px;
			font-size: 11px;
			line-height: 13px;
			text-align: center;
			letter-spacing: 2px;
			border-radius: 100px;

			font-family: ${({ theme }) => theme.fonts.heading};
			text-transform: uppercase;

			&:hover {
				background-color: ${({ theme }) => theme.colors.primary};
			}
		}
	}
`;

const DiscussForm = ({data}) => {
  const [thanksShowing, setThanksShowing] = useState(false);
	const [errorShowing, setErrorShowing] = useState(false);

	// const [session]: any = useSession();
	const { data: session } = useSession();

	const { setLogin } = useStore();

	const { handleSubmit, register, setValue } = useForm();

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
    <Wrapper>
			<form className="comment-form" onSubmit={onSubmit}>
				<Avatar className="avatar" image={data.influencer.avatar} size="74px" />
				<div className="field">
					<TextareaAutosize
						name="question"
						// placeholder={`What’s your question for ${data.influencer.name}?`}
            placeholder='Start a discussion'
						minRows={1}
						{...register('question')}
						onFocus={onFocus}
					/>
					<button className="btn-submit">Post</button>
					{/* <button className="btn-submit">Submit</button> */}
					<button className="arrow-submit">Sub</button>
				</div>
			</form>

			<ThanksOverlay
				showing={thanksShowing}
				setShowing={setThanksShowing}
				name={data.influencer.display_name}
				avatar={data.influencer.avatar}
			/>

			<ErrorOverlay showing={errorShowing} setShowing={setErrorShowing} />
		</Wrapper>
  )
}

export default DiscussForm