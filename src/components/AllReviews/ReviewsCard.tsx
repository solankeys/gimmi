import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import CardData from './CardData';

const ReviewsCard = () => {
	return (
		<div className="all-creatersContainer">
			<h1>All Reviews</h1>
			<div className="all-creaters">
				{CardData.map((item: any, index) => {
					return (
						<div className="card-container" key={index}>
							<Card
								key="index"
								profilesrc={item.profilesrc}
								creatername={item.createrName}
								imagesrc={item.imagesrc}
								gameTitle={item.gameTitle}
								rating={item.Rating}
							/>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default ReviewsCard;

export const Card = (props) => {
	return (
		<>
			<div className="reviews-card">
				<div className="gamer-profile">
					<div className="profile-container">
						<Link href="/creator-profile" passHref>
							<Image width={40} height={40} src={props.profilesrc} alt="" />
						</Link>
					</div>
					<Link href="/creator-profile" passHref>
						<p className="creater-name">{props.creatername}</p>
					</Link>
				</div>
				<div className="image-container">
					<Link href="/rodeybros/muck" passHref>
						<img src={props.imagesrc} alt="" />
					</Link>
				</div>
				<div className="game">
					<p className="game-title">{props.gameTitle}</p>
					<div className="rating">{props.rating}</div>
				</div>
			</div>
			<div className="reviews-cardMobile">
				<div className="image-container">
					<Link href="/rodeybros/muck" passHref>
						<img src={props.imagesrc} alt="" />
					</Link>
				</div>
				<div className="ratingMobile">9.2</div>
				<p className="game-title">Destiny</p>
				<div className="gamer-profile">
					<div className="profile-container">
						<Link href="/creator-profile" passHref>
							<Image width={40} height={40} src={props.profilesrc} alt="" />
						</Link>
					</div>
					<Link href="/creator-profile" passHref>
						<p className="creater-name">Fort Night</p>
					</Link>
				</div>
			</div>
		</>
	);
};
