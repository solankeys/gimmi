import React from 'react';
import Head from 'next/head';
import AllCreator from '~/AllCreator';
import { getAllCreators, getUserFollowingList } from '../../requests/data';
import { useSession } from 'next-auth/react';

const AllCreators = ({ data: creators }) => {
	const session = useSession();
	let email = session.data?.user_email;
	return (
		<>
			<Head>
				<title>Gimmi</title>
			</Head>
			<AllCreator creators={creators} />
		</>
	);
};

export default AllCreators;

export async function getStaticProps() {
	const allCreators = await getAllCreators();
	return {
		props: {
			data: {
				allCreators,
			},
		},
		revalidate: 600,
	};
}
