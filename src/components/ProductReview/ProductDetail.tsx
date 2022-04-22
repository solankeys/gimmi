import React from 'react';
import styled from 'styled-components';

const ProductDetail = ({ product }) => {
	const { product_chef_section } = product;
	const Wrapper = styled.div`
		margin-top: 50px;
		padding: 0px 40px 147px 40px;
		display: flex;
		justify-content: center;
		.columns {
			display: grid;
			grid-template-columns: minmax(400px, 800px) minmax(400px, 1fr);
			column-gap: 100px;

			.el {
				font-size: 100px;
				height: 50px;
				margin-bottom: 50px;
				color: rgb(0, 209, 113);
			}
			.text {
				font-size: 36px;
				line-height: 46px;
				font-weight: bold;
			}
			.detail {
				margin-top: 30px;
				font-size: 16px;
				line-height: 27px;
				letter-spacing: 0.4px;
				margin-bottom: 30px;
			}
			.specifications {
				margin-top: 50px;
			}
			.spec-text {
				margin-bottom: 27px;
				font-weight: bold;
				font-size: 14px;
				line-height: 22px;
				letter-spacing: 1px;
				font-family: ${({ theme }) => theme.fonts.faux};
			}
			.row {
				font-size: 14px;
				padding: 12px 18px;
			}
			.label {
				font-weight: bold;
				font-size: 14px;
				padding: 12px 18px;
				font-family: ${({ theme }) => theme.fonts.faux};
			}
			.value {
				padding: 12px 60px;
				font-family: ${({ theme }) => theme.fonts.faux};
			}
		}
		@media (max-width: 980px) {
			.columns {
				display: block;
			}
			.img {
				width: 100%;
			}
		}
	`;

	return (
		<Wrapper>
			<div className="columns">
				<div className="image">
					<img src={product_chef_section.description_left_image} alt="" />
				</div>
				<div className="detail">
					<div className="el">“</div>
					<div className="text" dangerouslySetInnerHTML={{ __html: product_chef_section.description }} />

					{/* <div className="detail">
						The Patrol is for those who are on time, all the time. It&apos;s got a slim profile paired with
						a genuine leather band that&apos;s a modern take on a classic field watch.
					</div> */}
					<img className="img" src={product_chef_section.description_image} alt="" />
					<div className="specifications">
						<div className="spec-text">SPECIFICATIONS</div>
						{product_chef_section.specifications.specification_details.map((item) => (
							<table key={product.post_id + 1}>
								<tr className="row">
									<td className="label">{item.title}</td>
									<td className="value">{item.value}</td>
								</tr>
							</table>
						))}
					</div>
				</div>
			</div>
		</Wrapper>
	);
};

export default ProductDetail;
