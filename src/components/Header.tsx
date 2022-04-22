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

const Wrapper = styled(motion.div)<{ showStoreInfo: boolean }>`
	width: 100%;
	background-color: #fff;

	position: fixed;
	top: 0;
	left: 0;
	z-index: 999;

	padding: 0 40px;

	.holder {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 90px;
	}

	.store-info {
		display: flex;
		align-items: center;
		justify-content: center;
		flex: 1;

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

	.btn-back {
		display: none;
	}

	.useravatar {
		width: 47px;
		height: 47px;
		background-size: cover;
		border-radius: 100px;
	}

	.left-menu {
		display: flex;
		align-items: center;
		flex: ${(p) => (p.showStoreInfo ? 'unset' : '1')};
	}

	.menu-item {
		text-transform: uppercase;
		font-size: 12px;
		line-height: 20px;
		font-weight: 500;
		margin-left: 50px;
		letter-spacing: 1px;

		a {
			color: #000;

			&:hover {
				color: #00d171;
			}
		}
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

const Header = ({ data, showInit = true, showStoreInfo = false, showMenuInfo = false }) => {
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
					showStoreInfo={showStoreInfo}
				>
					<Holder className="holder">
						<div className="left-side">
							<div className="logo">
								<Link href="/">
									<a>
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
									</a>
								</Link>
							</div>
						</div>

						{showMenuInfo && (
							<div className="left-menu">
								<div className="menu-item">
									<Link href="/all-reviews">
										<a>reviews</a>
									</Link>
								</div>
								<div className="menu-item">
									<Link href="/all_creators">
										<a>creators</a>
									</Link>
								</div>
							</div>
						)}

						{showStoreInfo && (
							<div className="store-info">
								<Avatar image={data.influencer.avatar} size="64px" className="avatar" />
								<div className="content">
									<div className="info">
										<div className="name">{data.influencer.name}</div>
										<div className="followers">{numFormatter(followers)} Followers</div>
									</div>
									<Follow
										data={data}
										setFollowers={setFollowers}
										followers={followers}
										setFollowing={setFollowing}
										following={following}
									/>
								</div>
							</div>
						)}

						<div className="right-side">
							{!session && (
								<button onClick={() => setLogin(true)}>
									<svg
										width={48}
										height={48}
										viewBox="0 0 48 48"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<ellipse cx={23.986} cy={18.235} rx={9.115} ry={9.118} fill="#000" />
										<path
											d="M39.574 41.22c0 .609-8.155 6.103-15.572 6.103-7.282 0-15.571-5.082-15.571-6.104 0-6.69 8.884-12.112 15.571-12.112 6.688 0 15.572 5.423 15.572 12.112z"
											fill="#000"
										/>
										<path
											fillRule="evenodd"
											clipRule="evenodd"
											d="M.48 28.77C2.746 39.962 12.586 48.006 24.002 48a23.792 23.792 0 009.336-1.886c12.206-5.158 17.92-19.237 12.765-31.447-5.156-12.21-19.23-17.927-31.436-12.77C4.147 6.337-1.787 17.577.48 28.77zm1.633-4.764c0-12.094 9.8-21.897 21.89-21.897 12.083.013 21.876 9.809 21.889 21.897 0 12.093-9.8 21.897-21.89 21.897-12.089 0-21.89-9.804-21.89-21.897z"
											fill="#000"
										/>
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

export default Header;
