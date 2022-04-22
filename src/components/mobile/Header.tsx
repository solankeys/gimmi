/* StickyHeader
======================================= */

import { useScrollPosition } from '@n8tb1t/use-scroll-position';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import React, { useState } from 'react';
import styled from 'styled-components';
// import { signIn, useSession } from 'next-auth/client';
import { useSession, signIn } from 'next-auth/react';
import { Avatar, Follow, Holder } from '@ui';
import useStore from 'state';
import { useEffect } from 'react';
import useSWR from 'swr';

/* Style
--------------------------------------- */

const Wrapper = styled(motion.div)`
	width: 100%;
	background-color: #fff;

	position: fixed;
	top: 0;
	left: 0;
	z-index: 999;

	padding: 0 15px;

	.holder {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 90px;
	}

	.store-info {
		display: flex;
		align-items: center;

		.content {
			display: flex;
			align-items: center;

			.info {
				margin-right: 20px;
				.name {
					font-weight: bold;
					font-size: 18px;
					line-height: 21px;
					letter-spacing: 0.105882px;
				}

				.followers {
					margin-right: 20px;
					white-space: nowrap;
					font-size: 12px;
					line-height: 20px;
					letter-spacing: 0.428571px;
					font-family: ${({ theme }) => theme.fonts.faux};
				}
			}
		}

		.avatar {
			margin-right: 14px;
		}
	}

	.right-side {
		display: flex;
		align-items: center;
	}
	.left-side {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 50px;
		font-family: ${({ theme }) => theme.fonts.relative};
		font-weight: bold;
		font-size: 12px;
		color: #222237;
		line-spacing: 15px;
	}

	.btn-back {
		display: none;
	}

	.useravatar {
		width: 47px;
		height: 47px;
		background-size: cover;
		border-radius: 100px;
	}
`;

/* Props
--------------------------------------- */

function numFormatter(num: number) {
	if (num > 999 && num < 1000000) {
		return (num / 1000).toFixed(1) + 'k';
	} else if (num > 1000000) {
		return (num / 1000000).toFixed(1) + 'm';
	} else if (num < 900) {
		return num;
	}
}

/* Component
------------------------------ */

const HeaderMobile = ({ data, showInit = true, showStoreInfo = false }) => {
	const [showHeader, setShowHeader] = useState(showInit);
	// const [session, loading]: any = useSession();
	const { data: session } = useSession();
	const { setLogin, setAccount } = useStore();

	const [followers, setFollowers] = useState(0);
	const [following, setFollowing] = useState(false);

	const fetcher = (url: string) => fetch(url).then((res) => res.json());
	const { data: response, error } = useSWR(`/api/followers?influencer_id=${data.influencer.slug}`, fetcher);

	useEffect(() => {
		if (response) {
			setFollowers(response.count);
			setFollowing(response.following);
		}
	}, [response]);

	useScrollPosition(
		({ prevPos, currPos }) => {
			if (currPos.y > -550) {
				if (showHeader && !showInit) setShowHeader(false);
			} else {
				if (prevPos.y > currPos.y) {
					if (showHeader) setShowHeader(false);
				} else {
					if (!showHeader) {
						setShowHeader(true);
					}
				}
			}

			if (showInit) {
				if (currPos.y == 0) {
					setShowHeader(true);
				}
			}
		},
		[showHeader],
		null,
		false,
		300
	);

	return (
		<AnimatePresence initial={false}>
			{showHeader && (
				<Wrapper
					initial={{ y: '-100%' }}
					animate={{ y: 0 }}
					exit={{ y: '-100%' }}
					transition={{ ease: 'easeInOut', duration: 0.2 }}
				>
					<Holder className="holder">
						<div className="left-side">
							<Link href="/" passHref>
								<div className="logo">
									<svg
										width={48}
										height={48}
										viewBox="0 0 48 48"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<mask
											id="prefix__ax"
											maskUnits="userSpaceOnUse"
											x={0}
											y={0}
											width={48}
											height={48}
										>
											<path
												fillRule="evenodd"
												clipRule="evenodd"
												d="M0 0h48v48H0V0z"
												fill="#fff"
											/>
										</mask>
										<g mask="url(#prefix__ax)">
											<path
												fillRule="evenodd"
												clipRule="evenodd"
												d="M23.988 0C10.748 0-.023 10.767-.023 24s10.771 24 24.011 24H39.91V32.047h-7.928v8.028h-7.994C15.12 40.075 7.905 32.864 7.905 24c0-8.864 7.215-16.075 16.083-16.075 8.869 0 16.083 7.211 16.083 16.075v7.964h7.93V24C48 10.767 37.228 0 23.988 0z"
												fill="#02EE81"
											/>
										</g>
									</svg>
								</div>
							</Link>
						</div>
						{showStoreInfo && (
							<div className="store-info">
								<Avatar image={data.influencer.avatar} size="64px" className="avatar" />
								{/* <div className="content">
									<div className="info">
										<div className="followers">{numFormatter(followers)} Followers</div>
										<Follow
											data={data}
											setFollowers={setFollowers}
											followers={followers}
											setFollowing={setFollowing}
											following={following}
										/>
									</div>
								</div> */}
							</div>
						)}

						<div className="right-side">
							{!session && (
								<button onClick={() => setLogin(true)}>
									<svg
										width="21px"
										height="14.320007px"
										viewBox="0 0 21 14.320007"
										version="1.1"
										xmlns="http://www.w3.org/2000/svg"
									>
										<g id="Group-4">
											<path
												d="M0.649 12.32L20.351 12.32Q20.4149 12.32 20.4776 12.3325Q20.5403 12.3449 20.5994 12.3694Q20.6584 12.3939 20.7116 12.4294Q20.7647 12.4649 20.8099 12.5101Q20.8551 12.5553 20.8906 12.6084Q20.9261 12.6616 20.9506 12.7206Q20.9751 12.7797 20.9875 12.8424Q21 12.9051 21 12.969L21 13.671Q21 13.7349 20.9875 13.7976Q20.9751 13.8603 20.9506 13.9194Q20.9261 13.9784 20.8906 14.0316Q20.8551 14.0847 20.8099 14.1299Q20.7647 14.1751 20.7116 14.2106Q20.6584 14.2461 20.5994 14.2706Q20.5403 14.2951 20.4776 14.3075Q20.4149 14.32 20.351 14.32L0.649 14.32Q0.585079 14.32 0.522386 14.3075Q0.459694 14.2951 0.400638 14.2706Q0.341583 14.2461 0.288435 14.2106Q0.235287 14.1751 0.190088 14.1299Q0.144889 14.0847 0.109376 14.0316Q0.0738636 13.9784 0.0494022 13.9194Q0.0249407 13.8603 0.0124704 13.7976Q0 13.7349 0 13.671L0 12.969Q0 12.9051 0.0124704 12.8424Q0.0249407 12.7797 0.0494022 12.7206Q0.0738636 12.6616 0.109376 12.6084Q0.144889 12.5553 0.190088 12.5101Q0.235287 12.4649 0.288435 12.4294Q0.341583 12.3939 0.400638 12.3694Q0.459694 12.3449 0.522386 12.3325Q0.585079 12.32 0.649 12.32Z"
												id="Rectangle-Copy-6"
												fill="#222237"
												fillRule="evenodd"
												stroke="none"
											/>
											<path
												d="M0.649 6.16L20.351 6.16Q20.4149 6.16 20.4776 6.17247Q20.5403 6.18494 20.5994 6.2094Q20.6584 6.23386 20.7116 6.26938Q20.7647 6.30489 20.8099 6.35009Q20.8551 6.39529 20.8906 6.44843Q20.9261 6.50158 20.9506 6.56064Q20.9751 6.61969 20.9875 6.68239Q21 6.74508 21 6.809L21 7.511Q21 7.57492 20.9875 7.63761Q20.9751 7.7003 20.9506 7.75936Q20.9261 7.81842 20.8906 7.87156Q20.8551 7.92471 20.8099 7.96991Q20.7647 8.01511 20.7116 8.05062Q20.6584 8.08613 20.5994 8.1106Q20.5403 8.13506 20.4776 8.14753Q20.4149 8.16 20.351 8.16L0.649 8.16Q0.585079 8.16 0.522386 8.14753Q0.459694 8.13506 0.400638 8.1106Q0.341583 8.08613 0.288435 8.05062Q0.235287 8.01511 0.190088 7.96991Q0.144889 7.92471 0.109376 7.87156Q0.0738636 7.81842 0.0494022 7.75936Q0.0249407 7.7003 0.0124704 7.63761Q0 7.57492 0 7.511L0 6.809Q0 6.74508 0.0124704 6.68239Q0.0249407 6.61969 0.0494022 6.56064Q0.0738636 6.50158 0.109376 6.44843Q0.144889 6.39529 0.190088 6.35009Q0.235287 6.30489 0.288435 6.26938Q0.341583 6.23386 0.400638 6.2094Q0.459694 6.18494 0.522386 6.17247Q0.585079 6.16 0.649 6.16Z"
												id="Rectangle-Copy-3"
												fill="#222237"
												fillRule="evenodd"
												stroke="none"
											/>
											<path
												d="M0.649 0L20.351 0Q20.4149 0 20.4776 0.0124704Q20.5403 0.0249407 20.5994 0.0494022Q20.6584 0.0738636 20.7116 0.109376Q20.7647 0.144889 20.8099 0.190088Q20.8551 0.235287 20.8906 0.288435Q20.9261 0.341583 20.9506 0.400638Q20.9751 0.459694 20.9875 0.522386Q21 0.585079 21 0.649L21 1.351Q21 1.41492 20.9875 1.47761Q20.9751 1.54031 20.9506 1.59936Q20.9261 1.65842 20.8906 1.71156Q20.8551 1.76471 20.8099 1.80991Q20.7647 1.85511 20.7116 1.89062Q20.6584 1.92614 20.5994 1.9506Q20.5403 1.97506 20.4776 1.98753Q20.4149 2 20.351 2L0.649 2Q0.585079 2 0.522386 1.98753Q0.459694 1.97506 0.400638 1.9506Q0.341583 1.92614 0.288435 1.89062Q0.235287 1.85511 0.190088 1.80991Q0.144889 1.76471 0.109376 1.71156Q0.0738636 1.65842 0.0494022 1.59936Q0.0249407 1.54031 0.0124704 1.47761Q0 1.41492 0 1.351L0 0.649Q0 0.585079 0.0124704 0.522386Q0.0249407 0.459694 0.0494022 0.400638Q0.0738636 0.341583 0.109376 0.288435Q0.144889 0.235287 0.190088 0.190088Q0.235287 0.144889 0.288435 0.109376Q0.341583 0.0738636 0.400638 0.0494022Q0.459694 0.0249407 0.522386 0.0124704Q0.585079 0 0.649 0Z"
												id="Rectangle"
												fill="#222237"
												fillRule="evenodd"
												stroke="none"
											/>
										</g>
									</svg>
								</button>
							)}

							{session && session.user && (
								<button
									className="useravatar"
									style={{ backgroundImage: `url('${session.user.image}')` }}
									onClick={() => setAccount(true)}
								></button>
							)}
						</div>
					</Holder>
				</Wrapper>
			)}
		</AnimatePresence>
	);
};

export default HeaderMobile;
