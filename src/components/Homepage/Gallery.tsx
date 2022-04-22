import Button from '~/ui/components/button';
import Avatar from '~/ui/components/avatar';

const Gallery = () => {
	return (
		// <div className='gallary-container'>
			<div className="gallery-wrapper">
				<div className="text">
					<Avatar
						image="https://lun-eu.icons8.com/a/az1gOAwhj0mvUpXmfboNEQ/XTqev53ZPkG1zMxRxrpB0g/Bitmap.png"
						size="78px"
						className="avatar"
					/>
					<Avatar
						image="https://lun-eu.icons8.com/a/az1gOAwhj0mvUpXmfboNEQ/HLobkkQ_uEqr8lB1u7nZ-Q/Bitmap.png"
						size="78px"
						className="avatar"
					/>
					<Avatar
						image="https://lun-eu.icons8.com/a/az1gOAwhj0mvUpXmfboNEQ/xDrJs2X6yUqBgZTA5fDGMA/Bitmap.png"
						size="78px"
						className="avatar"
					/>
					<Avatar
						image="https://lun-eu.icons8.com/a/az1gOAwhj0mvUpXmfboNEQ/gf-GKwcSIUCWHZS7GGJJOQ/Bitmap_Copy_18.png"
						size="78px"
						className="avatar"
					/>
					<div className="title">Become a Gimmi Creator</div>
					<div className="description">
						Be a part of today’s newest gaming community. Share your passion and insights to Gimmi’s ever
						growing community of like minded gamers.
					</div>
					<div className="apply-button">
						<Button>Apply</Button>
					</div>
				</div>
				<div className="reviewer-image">
					<img src="/img/gimmi_reviewer.png" alt="gimmi_reviewer.png" />
				</div>
			</div>
		// </div>
	);
};
export default Gallery;
