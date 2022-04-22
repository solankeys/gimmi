import React, {useState, useEffect} from 'react'
import styled from 'styled-components';
import { Button, Holder } from '@ui';
import DiscussEntry from '../Discuss/DiscussEntry';
import useSWR from 'swr';
import DiscussForm from './DiscussForm';

/* Style
---------------------------------- */

const Wrapper = styled.div<{ name: string }>`
	background-color: #f6f6f6;
	padding: 96px 40px 99px 40px;

	.holder {
		max-width: 1190px;
	}

	.title-main {
    width:70%;
		font-size: 42px;
		line-height: 42px;
		margin-bottom: 50px;
		font-family: ${({ theme }) => theme.fonts.heading};
	}

	.more-button {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;

		button {
			width: 158px;
			height: 37px;
			background-color: transparent;

			&:hover {
				background-color: ${({ theme }) => theme.colors.primary};
			}
		}
	}

	.entries {
		margin-bottom: 60px;
	}
`;

/* Component
------------------------------ */

const postsPerPage = 3;
const arrayForHoldingPosts = [];


const index = ({data}) => {
  const [entries, setEntries] = useState([]);
	const [count, setCount] = useState(1);

	const fetcher = (url: string) => fetch(url).then((res) => res.json());
	const { data: response, error } = useSWR(
		`https://admin.stampede.store/wp-json/gimmi/v1/questions?influencer=${data.influencer.slug}&game=${data.game.slug}`,
		fetcher
	);

	const renderPosts = (count: number) => {
		for (let i = count * postsPerPage - postsPerPage; i < postsPerPage * count; i++) {
			if (response[i] !== undefined) {
				arrayForHoldingPosts.push(response[i]);
			}
		}
		setEntries(arrayForHoldingPosts);
	};

	const showMore = () => {
		setCount((prevCount) => prevCount + 1);
		renderPosts(count);
	};

	useEffect(() => {
		if (response) {
			setCount((prevCount) => prevCount + 1);
			renderPosts(count);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [response]);

  return (
    <div className='discuss-desktop'>
      <Wrapper name="ask-section">
			<Holder className="holder">
				<h2 className="title-main">Discussions</h2>

				<DiscussForm data={data} />

				<div className="entries">
					{entries &&
						entries.map((entry: any, index: number) => (
							<DiscussEntry entry={entry} data={data} key={index + 'askentry'} />
						))}
				</div>

				{response && response.length > 3 && entries.length != response.length && (
					<div className="more-button">
						<Button outline onClick={showMore}>
							Show More
						</Button>
					</div>
				)}
			</Holder>
		</Wrapper>
    </div>
  )
}

export default index