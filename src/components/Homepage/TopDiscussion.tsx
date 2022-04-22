import Slider from '~/ui/components/emblaCarousel';

import Button from '~/ui/components/button';
import Avatar from '~/ui/components/avatar';

const Card = ({ item }: any) => {
	return (
		<div className="wrapper-card">
			<div className="wrapper-content">
				<div className="img-wrapper">
					<img src={item.image_file} alt="" />
				</div>
				<div className="text-wrapper">
					<div className="title">{item.title}</div>
					<div className="name">{item.name}</div>
					<div className="avatar-container">
						<div>
							<Avatar
								image="https://lun-eu.icons8.com/a/az1gOAwhj0mvUpXmfboNEQ/faCv0NI14UWzkqALD1dvEA/zexy_copy_8.png"
								size="43px"
								className="avatar"
							/>
							<Avatar
								image="https://lun-eu.icons8.com/a/az1gOAwhj0mvUpXmfboNEQ/4Epn0G7EWUya7z5RCYR7xQ/zexy_copy_6.png"
								size="43px"
								className="avatar"
							/>
							<Avatar
								image="https://lun-eu.icons8.com/a/az1gOAwhj0mvUpXmfboNEQ/faCv0NI14UWzkqALD1dvEA/zexy_copy_8.png"
								size="43px"
								className="avatar"
							/>
							<Avatar
								image="https://lun-eu.icons8.com/a/az1gOAwhj0mvUpXmfboNEQ/4Epn0G7EWUya7z5RCYR7xQ/zexy_copy_6.png"
								size="43px"
								className="avatar"
							/>
						</div>
						<div className="more">+3 more</div>
					</div>
				</div>
			</div>
			<div className="description-wrapper">
				<div className="username">{item.username}</div>
				<div className="description">{item.description}</div>
			</div>

			<div className="view-button">
				<Button>View Discussion</Button>
			</div>
			<div className="like-container">
				<svg width="14px" height="12px" viewBox="0 0 14 12" version="1.1" xmlns="http://www.w3.org/2000/svg">
					<defs>
						<filter id="filter_1">
							<feColorMatrix
								in="SourceGraphic"
								type="matrix"
								values="0 0 0 0 0.13333334 0 0 0 0 0.13333334 0 0 0 0 0.21568628 0 0 0 1 0"
							/>
						</filter>
					</defs>
					<g id="Group-9" filter="url(#filter_1)">
						<path
							d="M9.66362 7.06644C8.93442 7.75705 8.05591 8.09816 7.04011 8.09663C6.76941 8.09663 6.4987 8.10039 6.22826 8.09451L6.22836 8.09451C6.13767 8.08805 6.04923 8.12381 5.98952 8.19109C5.38083 8.82097 4.76587 9.44605 4.15472 10.0741C4.02902 10.2031 3.88539 10.2879 3.69731 10.2857C3.38737 10.2822 3.15236 10.0474 3.1504 9.72806C3.14579 9.20631 3.14579 8.68448 3.1504 8.16272C3.1504 8.06344 3.12128 8.03048 3.0197 8.00484C1.52113 7.62701 0.607216 6.66621 0.162762 5.24196C0.0804019 4.97776 0.0549073 4.69844 0 4.42615L0 3.67047C0.0257857 3.42989 0.0708888 3.19163 0.134817 2.95798C0.507309 1.64635 1.29747 0.697118 2.61359 0.204478C2.99266 0.0656804 3.39434 -0.00352602 3.79881 0.000138244C4.85853 0.000138244 5.91825 0.00389726 6.97754 0.000138244C8.45209 -0.00631974 9.55812 0.641125 10.3177 1.8529C11.3518 3.50053 11.0638 5.738 9.66367 7.06651L9.66362 7.06644Z"
							id="Path"
							fill="#000000"
							stroke="none"
						/>
						<path
							d="M12.9377 4.95237C12.5423 4.60489 12.0542 4.37378 11.5299 4.28571C11.5244 4.32402 11.5202 4.34604 11.5182 4.36718C11.4609 5.04197 11.2908 5.68901 10.9555 6.28263C10.0759 7.83965 8.74259 8.68988 6.89247 8.71324C6.69787 8.71566 6.50328 8.7113 6.30728 8.71324C6.14852 8.71566 6.07792 8.83243 6.15854 8.96093C6.60862 9.67917 7.23802 10.169 8.09823 10.3159C8.46491 10.3787 8.84666 10.36 9.22168 10.3702L9.22168 10.3701C9.30438 10.368 9.38371 10.402 9.43822 10.4628C9.68843 10.724 9.94419 10.9806 10.198 11.2386C10.3926 11.4379 10.5872 11.6399 10.7871 11.836C10.9928 12.0377 11.2733 12.0532 11.4754 11.8832C11.6053 11.7746 11.6442 11.629 11.6439 11.4688C11.6439 11.1386 11.6489 10.8082 11.6412 10.478C11.6384 10.3596 11.6739 10.3181 11.7941 10.2743C12.0832 10.1692 12.3842 10.0658 12.6358 9.89796C14.3233 8.77133 14.4699 6.28066 12.9378 4.95242L12.9377 4.95237Z"
							id="Path"
							fill="#000000"
							stroke="none"
						/>
					</g>
				</svg>
				<div className="likes">46</div>
			</div>
		</div>
	);
};

const TopDiscussion = ({ data }) => {
	const { discussions } = data;
	return (
		<div className="discussion-wrapper">
			<Slider data={discussions} title="Top Discussions">
				{discussions &&
					discussions.length > 0 &&
					discussions.map((item: any, index: any) => {
						return <Card item={item} key={index} />;
					})}
			</Slider>
		</div>
	);
};
export default TopDiscussion;
