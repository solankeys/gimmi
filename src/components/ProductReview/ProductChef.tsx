import React, { useEffect, useState } from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

const ProductChef = () => {
	const [photoIndex, setPhotoIndex] = useState(0);
	const [isOpen, setIsOpen] = useState(false);
	const [lightBoxImage, setLightBoxImage] = useState<Array<string>>([]);
	const [images] = useState<Array<string>>([
		'/img/john.jpg',
		'/img/coman.jpg',
		'img/json.jpg',
		'img/jonathan.jpg',
		'/img/louis.jpg',
		'img/sebastian.jpg',
	]);

	useEffect(() => {
		setLightBoxImage(images);
	}, [images]);

	const handleImageClick = () => {
		setIsOpen(true);
	};

	return (
		<div className="photoswippable">
			<div className="image-container">
				<div className="imageContainer">
					<div className="imagecontainer__left">
						<img src="./img/john.jpg" alt="" />
					</div>
					<div className="imagecontainer__right">
						<div className="righttop">
							<img src="./img/louis.jpg" alt="" />
						</div>
						<div className="rightbottom" onClick={() => handleImageClick()}>
							<p className="moreimage">+2 more</p>
							<img src="./img/jonathan.jpg" alt="" />
						</div>
					</div>
				</div>
			</div>
			{isOpen && (
				<Lightbox
					mainSrc={lightBoxImage[photoIndex]}
					nextSrc={lightBoxImage[(photoIndex + 1) % lightBoxImage.length]}
					prevSrc={lightBoxImage[(photoIndex + lightBoxImage.length - 1) % lightBoxImage.length]}
					onCloseRequest={() => setIsOpen(false)}
					onMovePrevRequest={() =>
						setPhotoIndex((photoIndex + lightBoxImage.length - 1) % lightBoxImage.length)
					}
					onMoveNextRequest={() => setPhotoIndex((photoIndex + 1) % lightBoxImage.length)}
				/>
			)}
		</div>
	);
};

export default ProductChef;
