import React from 'react';
import styled from 'styled-components';
import { Avatar, Button } from '@ui';
import { Interactions } from '../../mobile/Discuss';
import Reply from './Reply';
const Wrapper = styled.div`
	background: #ffffff;
	box-shadow: 0px 4px 6px #eaeaea;
	margin-bottom: 26px;

	padding: 34px 47px;

	// display: flex;
	// align-items: center;
	.content-right {
    .question-container {
      border-bottom: 1px solid #d5d5d5;
      padding-bottom: 37px;
    }
		.question {
			margin-bottom: 37px;
		}
    .answer-container{
      .discussion-interactions{
        padding-left: 115px;
      }
    }
		.answer {
			margin-left: 40px;
			padding: 20px 0;
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

	&:last-child {
		margin: 0;
	}
	.expand-button {
		display: flex;
		align-items: ceter;
		justify-content: center;
	}
  .discussion-interactions {
    padding: 0 70px;
    display: flex;
    align-items: center ;
    gap:10px;
    .icon {
      display:flex;
      align-items: center;
    }
  }
`;

const DiscussEntry = ({ data, entry }) => {
	return (
		<>
			{' '}
			<Wrapper>
				<div className="content-right">
					<div className='question-container'>
						<div className="question text-block">
							<Avatar className="avatar" image={entry.user_avatar} size="60px" />
							<div className="content">
								<div className="name">{entry.user_name}</div>
								<div className="text">{entry.user_question}</div>
							</div>
						</div>
						<Interactions />
					</div>
          <div className='answer-container'>
					<div className="answer text-block">
						<Avatar className="avatar" image={data.influencer.avatar} size="60px" />
						<div className="content">
							<div className="name">{data.influencer.name}</div>
							<div className="text">{entry.influencer_response}</div>
						</div>
					</div>
          <Interactions />
          </div>
          <div className='answer-container'>
					<div className="answer text-block">
						<Avatar className="avatar" image={data.influencer.avatar} size="60px" />
						<div className="content">
							<div className="name">{data.influencer.name}</div>
							<div className="text">{entry.influencer_response}</div>
						</div>
					</div>
          <Interactions />
          <Reply data={data} />
          </div>
				</div>
				<div className="expand-button">
					<Button outline>Expand</Button>
				</div>
			</Wrapper>
		</>
	);
};

export default DiscussEntry;
