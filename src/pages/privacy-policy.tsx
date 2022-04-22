/* Privacy Policy
================================================ */

import { GetStaticProps } from 'next';
import styled from 'styled-components';

export const getStaticProps: GetStaticProps = async ({ params }: any) => {
	const response = await fetch(`${process.env.API_URL}/wp-json/gimmi/v1/page?slug=privacy-policy`);
	const data = await response.json();

	return {
		props: data,
	};
};

/* Style
---------------------------------- */

const Wrapper = styled.div`
	max-width: 780px;
	padding: 60px 40px;
	margin: auto;

	.title {
		text-align: center;
		font-size: 38px;
		font-weight: bold;
		margin-bottom: 30px;
	}

	.content {
		p {
			margin-bottom: 30px;
		}
	}
`;

/* Component
------------------------------ */

const Index = (data: any) => {
	return (
		<Wrapper>
			<h1 className="title">{data.title}</h1>
			<div
				className="content"
				dangerouslySetInnerHTML={{
					__html: data.content,
				}}
			/>
		</Wrapper>
	);
};

export default Index;
