import Slider from '~/ui/components/emblaCarousel';
import Avatar from '~/ui/components/avatar';

const Card = ({ data }) => {
	return (
		<div className="creator-card">
			<div className="image-wrapper">
				<img src={data.image} alt="" />
				<div className="text-container">
					<Avatar image={data.avatar} size="38px" className="avatar" />

					<div className="name">{data.name}</div>
				</div>
			</div>
			<div className="image-list">
				{data?.image_list?.map((img: any, index: any) => (
					<img src={img} key={index} alt="" />
				))}
				<div className="more">+1 more</div>
			</div>
		</div>
	);
};

const Creator = ({ data }) => {
	const { creator } = data;
	return (
		<div className="creator-container">
			<div className="holder">
				<div className="creator-wrapper">
					<div className="creator">
						<div className="title">Featured Gimmi Creators</div>
						<div className="content">See top game reviews from our featured Gimmi creators.</div>
					</div>
				</div>
				<div className="title-wrapper">
					<div className="title">Latest Gimmi Creators</div>
					<div className="see-all">See All</div>
				</div>
				<div className="slider-wrapper">
					<Slider data={creator}>
						{creator &&
							creator.length > 0 &&
							creator.map((item: any, index: any) => {
								return <Card data={item} key={item}></Card>;
							})}
					</Slider>
				</div>
			</div>
		</div>
	);
};

export default Creator;
