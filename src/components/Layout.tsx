/* Layout
======================================= */

import React from 'react';
import useStore from 'state';
import styled from 'styled-components';
import AccountOverlay from './AccountOverlay';
import LoginOverlay from './LoginOverlay';

/* StyledComponents
---------------------------------- */


const Wrapper = styled.div`
	@media (max-width: 980px) {
		height: 100%;
	}
`;



/* Component
------------------------------ */

const Layout = ({ children }) => {
	const { login, setLogin, account, setAccount } = useStore();

	return (
		<>
			<Wrapper>{children}</Wrapper>
			<LoginOverlay overlay={login} setOverlay={setLogin} />
			<AccountOverlay overlay={account} setOverlay={setAccount} />
		</>
	);
};

export default Layout;
