/* HeartButton
======================================= */

import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../button';

/* Style
---------------------------------- */

const Wrapper = styled(Button)`
	&.clicked {
		svg {
			color: #ff0f00;
		}
	}
`;

/* Component
---------------------------------------- */

export const HeartButton = (props: any) => {
	const [clicked, setClicked] = useState(false);
	const [count, setCount] = useState(48);

	const onClick = () => {
		if (clicked) {
			setClicked(false);
			setCount(count - 1);
		} else {
			setClicked(true);
			setCount(count + 1);
		}
	};

	return (
		<Wrapper icon={!clicked ? 'heart' : 'heartSolid'} white onClick={onClick} className={clicked ? 'clicked' : null} {...props}>
			{count}
		</Wrapper>
	);
};

export default HeartButton;
