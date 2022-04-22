/* App
================================================ */

import { AppProps } from 'next/app';
import Head from 'next/head';
import Layout from '~/Layout';
import { UIProvider } from '~/ui';
// import { Provider as AuthProvider } from 'next-auth/client';
import { SessionProvider } from 'next-auth/react';
import '../../main.scss';

const App = ({ Component, pageProps }: AppProps) => {
	return (
		<>
			<Head>
				<title>Gimmi</title>

				<link rel="icon" type="image/x-icon" href="/favicon.png" />

				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0"
				/>

				<script async src="https://www.googletagmanager.com/gtag/js?id=G-5DX62MZBSQ"></script>

				<script
					dangerouslySetInnerHTML={{
						__html: `
							window.dataLayer = window.dataLayer || [];
							function gtag(){dataLayer.push(arguments);}
							gtag('js', new Date());
						
							gtag('config', 'G-5DX62MZBSQ');
						`,
					}}
				/>

				<script
					dangerouslySetInnerHTML={{
						__html: `
				!function(f,b,e,v,n,t,s)
				{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
				n.callMethod.apply(n,arguments):n.queue.push(arguments)};
				if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
				n.queue=[];t=b.createElement(e);t.async=!0;
				t.src=v;s=b.getElementsByTagName(e)[0];
				s.parentNode.insertBefore(t,s)}(window,document,'script',
				'https://connect.facebook.net/en_US/fbevents.js');
				fbq('init', '358146038849694'); 
				fbq('track', 'PageView');
					`,
					}}
				/>

				<noscript
					dangerouslySetInnerHTML={{
						__html: `<img
						height="1"
						width="1"
						src="https://www.facebook.com/tr?id=358146038849694&ev=PageView
						&noscript=1"
					/>`,
					}}
				/>

				<script
					type="text/javascript"
					dangerouslySetInnerHTML={{
						__html: `_linkedin_partner_id = "2706348"; window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || []; window._linkedin_data_partner_ids.push(_linkedin_partner_id);`,
					}}
				/>

				<script
					type="text/javascript"
					dangerouslySetInnerHTML={{
						__html: `(function(){var s = document.getElementsByTagName("script")[0]; var b = document.createElement("script"); b.type = "text/javascript";b.async = true; b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js"; s.parentNode.insertBefore(b, s);})();`,
					}}
				/>

				<noscript
					dangerouslySetInnerHTML={{
						__html: `<img height="1" width="1" style="display:none;" alt="" src="https://px.ads.linkedin.com/collect/?pid=2706348&fmt=gif" />`,
					}}
				/>
			</Head>

			<UIProvider theme="light">
				<SessionProvider session={pageProps.session}>
					<Layout>
						<Component {...pageProps} />
					</Layout>
				</SessionProvider>
			</UIProvider>
		</>
	);
};

export default App;
