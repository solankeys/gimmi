import React, { useState, useEffect } from 'react';
import { Avatar, Follow } from '@ui';
import useSWR from 'swr';

function numFormatter(num: number) {
	if (num > 999 && num < 1000000) {
		return (num / 1000).toFixed(1) + 'k';
	} else if (num > 1000000) {
		return (num / 1000000).toFixed(1) + 'm';
	} else if (num < 900) {
		return num;
	}
}

const Follows = (data) => {
	const [followers, setFollowers] = useState(0);
	const [following, setFollowing] = useState(false);

	const fetcher = (url: string) => fetch(url).then((res) => res.json());
	// const { data: response, error } = useSWR(`/api/followers?influencer_id=${data.influencer.slug}`, fetcher);

	// useEffect(() => {
	//   if (response) {
	//     setFollowers(response.count);
	//     setFollowing(response.following);
	//   }
	// }, [response]);

	return (
		<div className="follow__mobile">
			<div className="creator-info">
				<Avatar size="64px" className="avatar" />
        </div>
				{/* <Avatar image={data.influencer.avatar} size="64px" className="avatar" /> */}

				<div className="content">
					<div className="info">
						<div className="name">LoreStar</div>
						{/* <div className="name">{data.influencer.name}</div> */}
						<div className="followers">{numFormatter(followers)} Followers</div>
					</div>
					<Follow
						data={data}
						setFollowers={setFollowers}
						followers={followers}
						setFollowing={setFollowing}
						following={following}
					/>
				</div>
		</div>
	);
};

export default Follows;
