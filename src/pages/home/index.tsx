import Head from 'next/head';
import Homepage from '../../components/Homepage';

/* Component
------------------------------ */

const Index = ({ data }) => {
	return (
		<>
			<Head>
				<title>Gimmi</title>
			</Head>
			<Homepage data={data} />
		</>
	);
};

export default Index;
