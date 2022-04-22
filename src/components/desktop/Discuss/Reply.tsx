import React from 'react'
import { Avatar } from '@ui';
import TextareaAutosize from 'react-textarea-autosize';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin-left: 40px; 
  padding: 10px 0;
  border-bottom: 1px solid #d5d5d5;
  margin-bottom: 58px;
	.comment-form {
		display: flex;
    align-items:center;
		width: 100%;
	}

	.avatar {
		margin-right: 22px;
	}

	.field {
		position: relative;
		width: 100%;
		min-height: 64px;
		padding-top: 6px;
    margin-right: 20px;
		input,
		textarea {
      height: 50px !important;
			background: #f6f6f6;
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
;
`

// Icons

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

const Reply = ({data}) => {
  return (
    <Wrapper>
    <div className='discuss-reply'>
      	<form className="comment-form">
				<Avatar className="avatar" image={data.influencer.avatar} size="60px" />
				<div className="field">
					<TextareaAutosize
						name="question"
            placeholder='Reply to Rodey bros'
						minRows={1}	
            style={{height: 50}}
					/>
					<button className="btn-submit">Reply</button>
				</div>
        <button className="btn-close">
						{CloseIcon()}
					</button>
			</form>
    </div>
    </Wrapper>
  )
}

export default Reply