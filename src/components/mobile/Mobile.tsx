/* eslint-disable react-hooks/exhaustive-deps */
/* Mobile
======================================= */

import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useMediaQuery } from 'react-responsive';
import Carousel from './Carousel';
import Controls from './Controls';
import GameDetails from './GameDetails';
import { AnimatePresence } from 'framer-motion';
import { useEmblaCarousel } from 'embla-carousel/react';
import { useWindowSize } from 'react-use';
import Ask from './Ask';
import Influencer from './Influencer';
import useStore from 'state';
import { useSession } from 'next-auth/react';
import Discuss from './Discuss';

/* Style
---------------------------------- */

const Wrapper = styled.section`
	overflow: hidden;
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	position: fixed;
	top: 0;
	left: 0;

	.account {
		position: absolute;
		top: 20px;
		right: 17px;
		z-index: 9;
		color: #fff;
	}
`;

/* Icons
------------------------------ */

const MenuIcon = () => (
	<svg width={22} height={13} viewBox="0 0 22 13" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M1.15 0A.65.65 0 00.5.65v.2c0 .359.291.65.65.65h19.7a.65.65 0 00.65-.65v-.2a.65.65 0 00-.65-.65H1.15zM.5 6.15a.65.65 0 01.65-.65h19.7a.65.65 0 01.65.65v.2a.65.65 0 01-.65.65H1.15a.65.65 0 01-.65-.65v-.2zm0 5.5a.65.65 0 01.65-.65h19.7a.65.65 0 01.65.65v.2a.65.65 0 01-.65.65H1.15a.65.65 0 01-.65-.65v-.2z"
			fill="#fff"
		/>
	</svg>
);

/* Functions
------------------------------ */

export function use100vh() {
	const ref: any = React.useRef();
	const { height } = useWindowSize();

	React.useEffect(() => {
		if (ref.current && typeof ref.current !== 'undefined') {
			ref.current.style.height = height + 'px';
		}
	}, [height]);

	return ref;
}

/* Component
------------------------------ */

const Mobile = ({ data }) => {
	const { login, setLogin, account, setAccount } = useStore();
	// const [session, loading]: any = useSession();
	const { data: session } = useSession();

	const [landscape, setLandscape] = useState(false);
	const [section, setSection] = useState(data.highlights[0].tab_key);
	const [overlay, setOverlay] = useState(null);
	const [sectionData, setSectionData] = useState(null);
	const [videoElm, setVideoElm] = useState(null);
	const [sectionIndex, setSectionIndex] = useState(0);

	const ref = use100vh();

	// embla ------------------------------

	const [emblaRef, embla] = useEmblaCarousel({ loop: true });
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [scrollSnaps, setScrollSnaps] = useState([]);

	const carouselScrollTo = useCallback((index) => embla && embla.scrollTo(index), [embla]);

	const onSelect = useCallback(() => {
		if (!embla) return;
		setSelectedIndex(embla.selectedScrollSnap());
		document.querySelectorAll('video.video-player').forEach((vid: any) => vid.pause());
	}, [embla, setSelectedIndex]);

	useEffect(() => {
		if (embla) {
			onSelect();
			setScrollSnaps(embla.scrollSnapList());
			embla.on('select', onSelect);
			setTimeout(() => {
				embla.reInit();
			}, 200);
		}

		return () => {
			if (embla) embla.destroy();
		};
	}, [embla]);

	// on ready ------------------------------

	useEffect(() => {
		if (section !== 'overview') {
			setSectionData(
				data.highlights.find((value: any, index: number) => {
					if (value.tab_key === section) {
						carouselScrollTo(index * 3);
						return true;
					}
					return false;
				})
			);

			setSectionIndex(0);
		} else {
			carouselScrollTo(9);
			setSectionIndex(0);
		}
	}, [section]);

	useEffect(() => {
		if (selectedIndex >= 0 && selectedIndex <= 2) {
			setSectionIndex(selectedIndex % 3);
			setSection(data.highlights[0].tab_key);
		}

		if (selectedIndex >= 3 && selectedIndex <= 5) {
			setSectionIndex(selectedIndex % 3);
			setSection(data.highlights[1].tab_key);
		}

		if (selectedIndex >= 6 && selectedIndex <= 8) {
			setSectionIndex(selectedIndex % 3);
			setSection(data.highlights[2].tab_key);
		}

		if (selectedIndex == 9) {
			setSectionIndex(0);
			setSection('overview');
		}
	}, [selectedIndex]);

	// landscape switch

	const isLandscape = useMediaQuery({ query: '(orientation: landscape)' });

	useEffect(() => {
		setLandscape(isLandscape);
	}, [isLandscape]);

	
	// component ------------------------------

	return (
		// <Wrapper ref={ref}>
		// <div>
		<Wrapper>
			{/* <div> */}
				{!landscape && (
					<>
						{!session && (
							<button className="account" onClick={() => setLogin(true)}>
								{MenuIcon()}
							</button>
						)}

						{session && (
							<button className="account" onClick={() => setAccount(true)}>
								{MenuIcon()}
							</button>
						)}
					</>
				)}
				<Carousel
					data={data}
					sectionData={sectionData}
					section={section}
					emblaRef={emblaRef}
					setVideoElm={setVideoElm}
					landscape={landscape}
				/>
				{!landscape && (
					<Controls
						data={data}
						section={section}
						setSection={setSection}
						videoElm={videoElm}
						setOverlay={setOverlay}
						sectionIndex={sectionIndex}
					/>
				)}
				<AnimatePresence>
					{overlay === 'details' && <GameDetails setOverlay={setOverlay} data={data.game} />}
				</AnimatePresence>
				<AnimatePresence>{overlay === 'ask' && <Ask setOverlay={setOverlay} data={data} />}</AnimatePresence>
				<AnimatePresence>
					{overlay === 'influencer' && <Influencer setOverlay={setOverlay} data={data} />}
				</AnimatePresence>
				<AnimatePresence>
					{ overlay === 'discuss' && <Discuss setOverlay={setOverlay} data={data} />}
				</AnimatePresence>
			
			{/* </div> */}
		</Wrapper>
		
	);
};

export default Mobile;
