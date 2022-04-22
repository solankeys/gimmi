/* ErrorOverlay
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

		max-width: 500px;
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

			.icon {
				margin-bottom: 30px;
				svg {
					width: 75px;
				}
			}

			.text {
				font-size: 16px;
				line-height: 27px;
				letter-spacing: 0.4px;
				margin-bottom: 20px;
				max-width: 260px;
			}

			max-width: 460px;
		}
	}

	@media (max-width: 980px) {
		padding: 0 21px;

		.content {
			padding: 40px;
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
}

/* Component
------------------------------ */

const ErrorOverlay = (props: Props) => {
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
							<div className="icon">
								<svg
									width="100"
									height="89"
									viewBox="0 0 100 89"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										fillRule="evenodd"
										clipRule="evenodd"
										d="M98.8871 75.7392L56.5622 4.04119C53.5628 -1.01589 46.342 -1.4654 43.2315 3.47929L1.23994 75.6269C-2.09272 80.9087 1.6843 89 7.90528 89H92.1106C98.2205 89 101.998 81.0211 98.8871 75.7392ZM50 75.1725C47.4954 75.1725 45.4545 73.1127 45.4545 70.5849C45.4545 68.057 47.4954 65.9972 50 65.9972C52.5046 65.9972 54.5455 68.057 54.5455 70.5849C54.5455 73.1127 52.5046 75.1725 50 75.1725ZM50 59.6392C52.4545 59.6392 54.5455 57.4724 54.5455 54.8131V29.5993C54.5455 26.94 52.4545 24.7732 50 24.7732C47.5455 24.7732 45.4545 26.94 45.4545 29.5993V54.8131C45.4545 57.4724 47.5455 59.6392 50 59.6392Z"
										fill="black"
									/>
								</svg>
							</div>
							<div className="text">Please type in your question before pressing submit.</div>
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

export default ErrorOverlay;
