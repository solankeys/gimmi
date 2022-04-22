import Slider from '~/ui/components/emblaCarousel';
import Card from '~/ui/components/card';

const TopQuestions = ({ data }) => {
	const { questions } = data;
	return (
		<div className="question-wrapper">
			{/* <div className="title-wrapper">
				<div className="title">Top Questions</div>
				<div className="see-all">See All</div>
			</div> */}
			<Slider data={questions} title={'Top Questions'}>
				{questions &&
					questions.length > 0 &&
					questions.map((item: any, index: any) => {
						return <Card data={item} key={index}></Card>;
					})}
			</Slider>
		</div>
	);
};
export default TopQuestions;
