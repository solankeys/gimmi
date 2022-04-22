/* ThanksOverlay
======================================= */

import React, { useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import styled from 'styled-components';
import { Avatar, Button } from '@ui';

/* Style
--------------------------------------- */

const Wrapper = styled(motion.div)`
	position: fixed;
	top: 0;
	left: 0;
	z-index: 9999;
	width: 100%;
	height: 100%;

	background-color: rgba(0, 0, 0, 0.5);

	padding: 0 40px;
	display: flex;
	justify-content: center;
	align-items: center;

	.content {
		background-color: #fff;
		padding: 60px;
		border-radius: 16px;

		max-width: 710px;
		width: 100%;

		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		text-align: center;

		.inside {
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			text-align: center;

			.avatar {
				margin-bottom: 20px;
			}

			.title {
				font-size: 32px;
				line-height: 42px;
				font-weight: bold;
				margin-bottom: 10px;
				font-family: ${({ theme }) => theme.fonts.heading};
			}

			.text {
				font-size: 16px;
				line-height: 27px;
				letter-spacing: 0.4px;
				margin-bottom: 20px;
			}

			max-width: 460px;
		}
	}

	@media (max-width: 980px) {
		padding: 0 21px;

		.content {
			padding: 40px;
		}

		.content .inside .title {
			font-size: 24px;
			line-height: 28px;
		}

		.content .inside .text {
			font-size: 14px;
			line-height: 18px;
			letter-spacing: 0.4px;
		}
	}
`;

/* Animation
------------------------------ */

const animation = {
	background: {
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
		transition: { duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] },
	},
	content: {
		initial: { opacity: 0, scale: 0.8 },
		animate: { opacity: 1, scale: 1 },
		exit: { opacity: 0, scale: 0.8 },
		transition: { duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] },
	},
};

/* Props
--------------------------------------- */

interface Props {
	showing: boolean;
	setShowing: any;
	name: string;
	avatar: string;
}

/* Component
------------------------------ */

const ThanksOverlay = (props: Props) => {
	const backgroundRef = useRef(null);

	const handleClickOutside = (event: any) => {
		if (backgroundRef.current) {
			if (backgroundRef.current == event.target) {
				props.setShowing(false);
			}
		}
	};

	return (
		<AnimatePresence>
			{props.showing && (
				<Wrapper ref={backgroundRef} {...animation.background} onClick={(event) => handleClickOutside(event)}>
					<motion.div className="content" {...animation.content}>
						<div className="inside">
							<Avatar className="avatar" image={props.avatar} size="104px" />
							<div className="title">Hey! Thanks for the question.</div>
							<div className="text">
								I’m only answering a few questions but I’ll notify you if I’m able to answer yours.
							</div>
							<Button outline onClick={() => props.setShowing(false)}>
								Close
							</Button>
						</div>
					</motion.div>
				</Wrapper>
			)}
		</AnimatePresence>
	);
};

export default ThanksOverlay;
