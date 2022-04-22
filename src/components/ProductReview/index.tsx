/* Desktop
======================================= */

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Footer from '~/Footer';
import Header from '~/Header';
import ProductOverview from './ProductOverview';
import ProductDetail from './ProductDetail';
import ProductQuote from './ProductQuote';

import CommentMain from './CommentMain.';
import SimilarProducts from './SimilarProduct';
import Carousel from './Carousel';
import { useMediaQuery } from 'react-responsive';
import HeaderMobile from '~/mobile/Header';

/* Style
---------------------------------- */

const Wrapper = styled.section`
	max-width: 1490px;
	margin: auto;
	padding-top: 90px;
`;

/* Component
------------------------------ */

const ProductReview = ({ data }) => {
	const { item: product } = data;
	const [mobile, setMobile] = useState(null);

	const [landscape, setLandscape] = useState(false);
	const isMobile = useMediaQuery({
		query: '(max-width: 980px)',
	});

	useEffect(() => {
		setMobile(isMobile);
	}, [isMobile]);

	return (
		<Wrapper>
			{mobile ? (
				<HeaderMobile data={product} showInit={true} />
			) : (
				<Header data={product} showInit={true} showMenuInfo={true} showStoreInfo={true} />
			)}
			<Carousel product={product} />
			<ProductOverview product={product} />
			<ProductDetail product={product} />
			<ProductQuote product={product} />
			<CommentMain data={data} />
			<SimilarProducts data={product} />
			<Footer />
		</Wrapper>
	);
};

export default ProductReview;
