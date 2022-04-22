import React, {useCallback, useState, useEffect } from 'react';
import TopCarousal from './TopCarousal';
import { useEmblaCarousel } from 'embla-carousel/react';
import { useSession } from 'next-auth/react';
import useStore from 'state';
// import Controls from '~/mobile/Controls';
import Controls from './Sidebar';



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


const index = ({ data }) => {
	const { login, setLogin, account, setAccount } = useStore();
	const [section, setSection] = useState(data.highlights[0].tab_key);
	const [sectionData, setSectionData] = useState(null);
	const [emblaRef, embla] = useEmblaCarousel({ loop: true });
	const [videoElm, setVideoElm] = useState(null);
	const [overlay, setOverlay] = useState(null);
	const [landscape, setLandscape] = useState(false);
	const [sectionIndex, setSectionIndex] = useState(0);
	const carouselScrollTo = useCallback((index) => embla && embla.scrollTo(index), [embla]);


	const { data: session } = useSession();

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

	return (
		<div className="game-review__mobile">
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
			<TopCarousal
				data={data}
				sectionData={sectionData}
				section={section}
				emblaRef={emblaRef}
				setVideoElm={setVideoElm}
				landscape={landscape}
			/>
			{/* <Controls
						data={data}
						section={section}
						setSection={setSection}
						videoElm={videoElm}
						setOverlay={setOverlay}
						sectionIndex={sectionIndex}
					/> */}
					<Controls />
					{/* solanki */}
		</div>
	);
};

export default index;
