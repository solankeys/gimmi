/* AnimateOnScroll
======================================= */

import React, { useState } from 'react';
import { useAnimation, motion } from 'framer-motion';
import VisibilitySensor from 'react-visibility-sensor';
import { useMediaQuery } from 'react-responsive';

/* Props
--------------------------------------- */

interface Props {
	className?: string;
	animation?: string;
	children?: any;
}

/* Animations
--------------------------------------- */

const ease = [0.04, 0.62, 0.23, 0.98];

const animations = {
	slideRight: {
		visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: ease, delay: 0.2 } },
		hidden: { opacity: 0, x: '-20%', transition: { duration: 0.5, ease: ease } },
	},
	slideLeft: {
		visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: ease, delay: 0.2 } },
		hidden: { opacity: 0, x: '20%', transition: { duration: 0.5, ease: ease } },
	},
	slideUp: {
		visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut', delay: 0.2 } },
		hidden: { opacity: 0, y: '60px', transition: { duration: 0.6, ease: 'easeOut' } },
	},
	slideDown: {
		visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: ease, delay: 0.2 } },
		hidden: { opacity: 0, y: '-20%', transition: { duration: 0.5, ease: ease } },
	},
};

/* Component
------------------------------ */

export const AnimateOnScroll = (props: Props) => {
	const [isShowing, setIsShowing] = useState(false);

	const toggleShowing = (toggle: boolean) => {
		if (isShowing) return false;

		if (toggle) {
			setIsShowing(true);
		}
	};

	const controls = useAnimation();
	controls.start(isShowing ? 'visible' : 'hidden');

	const isMobile = useMediaQuery({
		query: '(max-width: 800px)',
	});

	if (isMobile) {
		return <div className={props.className}>{props.children}</div>;
	}

	return (
		<VisibilitySensor onChange={toggleShowing} partialVisibility={true}>
			<motion.div className={props.className} initial={false} animate={controls} variants={animations[props.animation]}>
				{props.children}
			</motion.div>
		</VisibilitySensor>
	);
};

export default AnimateOnScroll;
