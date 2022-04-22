import React from 'react';
import styled from 'styled-components';

const ProductQuote = ({ product }) => {
	const quote = product.product_quote.product_quotes[0];
	const Wrapper = styled.div`
		padding: 0px 40px 147px 40px;
		display: flex;
		justify-content: center;

		.columns {
			display: grid;
			grid-template-columns: minmax(300px, 350px) minmax(10px, 1fr);
			column-gap: 0px;

			.el {
				font-size: 100px;
				height: 50px;
				margin-bottom: 30px;
				color: rgb(0, 209, 113);
			}
			.text {
				font-size: 32px;
				line-height: 46px;
				font-weight: bold;
			}
			.image {
				margin-left: 50px;
			}
		}
		@media (max-width: 980px) {
			.columns {
				display: grid;
				grid-template-columns: minmax(200px, 150px) minmax(10px, 1fr);
				column-gap: 10px;
				.image {
					margin-left: 0px;
					height: 100%;
					.img {
						height: 100%;
					}
				}
			}
		}
	`;
	return (
		<Wrapper>
			<div className="columns">
				<div className="image">
					<img className="img" src={quote.image} alt="product image" />
				</div>
				<div className="description">
					<div className="el">“</div>
					<div className="text">{quote.description}</div>
				</div>
			</div>
		</Wrapper>
	);
};

export default ProductQuote;
