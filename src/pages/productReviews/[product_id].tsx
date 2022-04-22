import Head from 'next/head';
import ProductReview from '../../components/ProductReview';

/* Component
------------------------------ */

const ProductReviews = ({ data }) => {
	return (
		<>
			<Head>
				<title>Gimmi - BradWOTO Store - Patrol Leather</title>
			</Head>
			<ProductReview data={data} />
		</>
	);
};

export async function getStaticPaths() {
	const response = await fetch(`${process.env.API_DEV}/wp-json/gimmi/v1/allproducts`);
	const data = await response.json();
	const id = data.map((product) => product.post_id.toString());
	const params = id.map((value) => ({ params: { product_id: value } }));

	return {
		paths: params,
		fallback: false,
	};
}

export async function getStaticProps({ params }) {
	//`${process.env.API_URL}/wp-json/gimmi/v1/product?id=${params.product_id}`
	const response = await fetch(`${process.env.API_DEV}/wp-json/gimmi/v1/product?id=${params.product_id}`);
	const data = await response.json();
	const item = data[0];
	const { post_slug, influencer } = item;
	const result = await fetch(
		`${process.env.API_DEV}/wp-json/gimmi/v1/product_questions?product=${post_slug}&influencer=${influencer.slug}`
	);
	const productQuestions = await result.json();
	return {
		props: {
			data: { item, productQuestions },
		},
		revalidate: 600,
	};
}

export default ProductReviews;
