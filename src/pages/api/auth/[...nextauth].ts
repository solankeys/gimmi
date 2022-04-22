/* Next Auth
================================================ */

import NextAuth from 'next-auth';
// import Providers from 'next-auth/providers';
// import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import FacebookProvider from 'next-auth/providers/facebook';
import TwitterProvider from 'next-auth/providers/twitter';

const prisma = new PrismaClient();

export default NextAuth({
	providers: [
		TwitterProvider({
			clientId: process.env.TWITTER_API_KEY,
			clientSecret: process.env.TWITTER_API_SECRET,
			version: '2.0', // opt-in to Twitter OAuth 2.0
		}),
		FacebookProvider({
			clientId: process.env.FACEBOOK_CLIENT_ID,
			clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
		}),
	],
	debug: process.env.NODE_ENV === 'development',
	secret: process.env.AUTH_SECRET,
	jwt: {
		secret: process.env.JWT_SECRET,
	},
	// adapter: PrismaAdapter(prisma),
	callbacks: {
		// session: async (session, user) => {
		// session.user_id = user.id;
		// return Promise.resolve(session);

		async jwt({ token }) {
			token.userRole = 'admin';
			return token;
		},
	},
});
