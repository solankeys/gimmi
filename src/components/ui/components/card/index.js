import Avatar from '../avatar';
import Button from '../button';

const index = ({ data }) => {
	return (
		<div className="card-wrapper">
			<div className="image-wrapper">
				<img src={data.image_file} alt="" />
			</div>
			<div className='dp__player'>
			<Avatar image={data.player_dp} size="32px" className="avatar" />
			</div>
			<div className="text-wrapper">
				<div className="store-info">
					<Avatar image={data.image_file} size="62px" className="avatar" />
					<div className="content">
						<div className="info">
							<div className="name">{data.name}</div>
							<div className="quest">
								Question for <u>{data.name}</u>{' '}
							</div>
						</div>
					</div>
				</div>
				<div className="description">{data.description}</div>
				<div className="view-button">
					<Button>View Answer</Button>
				</div>
			</div>
			<div className="like-container">
				<svg width="13px" height="12px" viewBox="0 0 13 12" version="1.1" xmlns="http://www.w3.org/2000/svg">
					<g id="Group-6">
						<g id="Group-3" transform="translate(3.8936865 0)">
							<path
								d="M0 0L9.10631 0L9.10631 12L0 12L0 0Z"
								id="Clip-2"
								fill="none"
								fillRule="evenodd"
								stroke="none"
							/>
							<g clipPath="url(#mask_1)">
								<path
									d="M0 5.11981L2.32464 0.198119C2.38173 0.0795103 2.50213 -2.43151e-05 2.62492 -2.43151e-05C3.76025 -2.43151e-05 4.68389 0.910989 4.68389 2.03079L4.68389 3.976L7.60858 3.976C7.6845 3.976 7.77059 3.976 7.84987 3.98714C8.65222 4.10356 9.20918 4.84716 9.09034 5.6446L8.28991 10.749C8.18484 11.463 7.55994 11.9998 6.83588 12L0 12L0 5.76365L0 5.11981Z"
									id="Fill-1"
									fill="#222237"
									fillRule="evenodd"
									stroke="none"
								/>
							</g>
						</g>
						<path
							d="M1.2326 5.11981C0.554671 5.11981 0 5.6669 0 6.33556L0 10.7842C0 11.4529 0.554671 12 1.2326 12L3.40065 12L3.40065 5.11981L1.2326 5.11981Z"
							id="Fill-4"
							fill="#222237"
							fillRule="evenodd"
							stroke="none"
						/>
					</g>
				</svg>
				<div className="likes">46</div>
			</div>
		</div>
	);
};

export default index;
