/* Homepage
================================================ */

// import { getAllDiscussion } from 'requests/data';
import Homepage from '~/Homepage';
// import '../main.scss';

/* Component
------------------------------ */

const Index = ({ data }) => {
	// useEffect(() => {
	// 	Router.push('/rodeybros/muck');
	// });

	return <Homepage data={data} />;
};

export default Index;

// export async function getStaticProps() {
// 	const allDiscussions = await getAllDiscussion();
// 	return {
// 		props: {
// 			data: {
// 				allDiscussions,
// 			},
// 		},
// 		revalidate: 600,
// 	};
// }
