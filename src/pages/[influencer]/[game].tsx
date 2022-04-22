/* Influencer Game Page
================================================ */

import { GetStaticPaths, GetStaticProps } from 'next';
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import Head from 'next/head';
import Desktop from '~/desktop/Desktop';
import Mobile from '~/mobile/Mobile';
import MobileView from '~/MobileView';

/* Props
------------------------------ */

export const getStaticPaths: GetStaticPaths = async () => {
	const response = await fetch(`${process.env.API_URL}/wp-json/gimmi/v1/game_paths`);
	const paths = await response.json();

	console.log(`${process.env.API_URL}/wp-json/gimmi/v1/game_paths`);

	return {
		paths: paths,
		fallback: false,
	};
};

export const getStaticProps: GetStaticProps = async ({ params }: any) => {
	const game_response = await fetch(
		`${process.env.API_URL}/wp-json/gimmi/v1/game?slug=${params.influencer}-${params.game}`
	);
	const game_data = await game_response.json();

	return {
		props: game_data,
	};
};

/* Component
------------------------------ */

const Index = (data: any) => {
	const [mobile, setMobile] = useState(null);

	const isMobile = useMediaQuery({
		query: '(max-width: 700px)',
	});

	useEffect(() => {
		setMobile(isMobile);
	}, [isMobile]);

	return (
		<>
			<Head>
				<title>
					Gimmi - {data.influencer.name} - {data.game.title}
				</title>
			</Head>

			{mobile === false && <Desktop data={data} />}
			{/* {mobile === true && <MobileView data={data}   />} */}
			{mobile === true && <Mobile data={data} />}
		</>
	);
};

export default Index;
