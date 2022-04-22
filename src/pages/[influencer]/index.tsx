/* Homepage
================================================ */

import { GetStaticPaths, GetStaticProps } from 'next';
import Router from 'next/router';
import { useEffect } from 'react';

/* Props
------------------------------ */

export const getStaticPaths: GetStaticPaths = async () => {
	const response = await fetch(`${process.env.API_URL}/wp-json/gimmi/v1/influencer_paths`);
	const paths = await response.json();

	return {
		paths: paths,
		fallback: false,
	};
};

export const getStaticProps: GetStaticProps = async ({ params }: any) => {
	return {
		props: {},
	};
};

/* Component
------------------------------ */

const Index = () => {
	useEffect(() => {
		Router.push('/rodeybros/muck');
	});

	return null;
};

export default Index;
