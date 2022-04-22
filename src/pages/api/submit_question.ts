/* Submit question
==================================================== */

import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
	const session: any = await getSession({ req });

	if (!session || !session.user) {
		res.status(200).json({ success: false });
	}

	const access_key = '3d9pu8inf3w98j3f09k3dd0990309jfijnr39-93dd';

	if (req.method === 'POST') {
		const post_data = {
			key: access_key,
			user_question: req.body.question,
			user_id: session.user_id,
			user_name: session.user.name,
			user_avatar: session.user.image,
			influencer_name: req.body.influencer_name,
			game_name: req.body.game_name,
			influencer_slug: req.body.influencer_slug,
			game_slug: req.body.game_slug,
		};

		try {
			await fetch(`${process.env.API_URL}/wp-json/gimmi/v1/question_submit`, {
				method: 'POST',
				mode: 'cors',
				body: JSON.stringify(post_data),
			});
		} catch (error) {
			console.log('Fetch error: ', error);
		}
	}

	res.status(200).json({ success: true });
};
