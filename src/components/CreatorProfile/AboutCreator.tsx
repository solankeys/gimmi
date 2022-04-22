import React from 'react';
import Image from 'next/image';
import CreatorData from './CreatorData';
import Link from 'next/link';
import { AiFillYoutube, AiOutlineInstagram } from 'react-icons/ai';
import { GrTwitter } from 'react-icons/gr';

const AboutCreator = () => {
	return (
		<div className="about-creator">
			{CreatorData?.map((items: any, index: number) => {
				return (
					<div key={index}>
						<h4>About {items?.creatorName}</h4>
						<hr />
						<div className="about-creator__description">
							<div className="about-creator__left">
								<div className="description">
									<h5>Description</h5>
									<p>{items?.Description}</p>
								</div>
								<div className="specs">
									<h5>PC specs</h5>
									<div className="image-container">
										<Image width={400} height={300} src="/img/PCspecs.png" alt="" />
									</div>
									<div className="specs__specification">
										{items.specs.map((item: any, index: number) => {
											return (
												<>
													<span key={index}>{item}</span>
												</>
											);
										})}
									</div>
								</div>
							</div>
							<hr />
							<div className="about-creator__right">
								<div className="game-genre">
									<h5>Game Genres</h5>
									<p>Action sports</p>
									<p>Sand Box</p>
								</div>
								<div className="gimmi-stats">
									<h5>Gimmie Stats</h5>
									<p>Member since 2021</p>
									<p>Total Views: 245,232</p>
								</div>
							</div>
						</div>
						<div className="creator__channelsWrapper">
							<h5>{items.creatorName} Channel</h5>
							<div className="creator__channels">
								<Link href="#" passHref>
									<AiFillYoutube fontSize={25} />
								</Link>
								<Link href="#" passHref>
									<AiOutlineInstagram fontSize={25} />
								</Link>
								<Link href="#" passHref>
									<GrTwitter fontSize={25} />
								</Link>
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default AboutCreator;
