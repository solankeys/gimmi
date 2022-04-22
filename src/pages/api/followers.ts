/* Followers Count
==================================================== */

import type { NextApiRequest, NextApiResponse } from 'next';
// import { getSession } from 'next-auth/client';
import { getSession } from 'next-auth/react';
import prisma from '../../../prisma/prismaClient';

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
	const session: any = await getSession({ req });

	const { influencer_id }: any = req.query;

	const count = await prisma.following.count({
		where: {
			influencerID: influencer_id,
		},
	});

	let following = false;

	if (session) {
		const found = await prisma.following.findUnique({
			where: {
				userID_influencerID: {
					userID: session.user_id,
					influencerID: influencer_id,
				},
			},
		});

		if (found) {
			following = true;
		}
	}

	res.status(200).json({ success: true, count: count, following: following });
};
