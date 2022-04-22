/* Follow Influencer
==================================================== */

import type { NextApiRequest, NextApiResponse } from 'next';
// import { getSession } from 'next-auth/client';
import { getSession } from 'next-auth/react';
import prisma from '../../../prisma/prismaClient';

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
	const session: any = await getSession({ req });

	if (!session || !session.user) {
		res.status(200).json({ success: false });
	}

	if (req.method === 'POST') {
		const data = JSON.parse(req.body);

		const found = await prisma.following.findUnique({
			where: {
				userID_influencerID: {
					userID: session.user_id,
					influencerID: data.influencer_slug,
				},
			},
		});

		if (found) {
			await prisma.following.delete({
				where: {
					userID_influencerID: {
						userID: session.user_id,
						influencerID: data.influencer_slug,
					},
				},
			});
		} else {
			await prisma.following.create({
				data: {
					userID: session.user_id,
					influencerID: data.influencer_slug,
					gameID: data.game_slug,
				},
			});
		}
	}

	res.status(200).json({ success: true });
};
