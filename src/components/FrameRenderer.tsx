import Frame from "./Frame";

type Props = {
	frame: Frame;
	onClick?: () => void;
}

function FrameRenderer({ frame, onClick }: Props) {
	const { cornerImage, edgeImage } = frame.getStringImages();

	return (
		<div className="FrameRenderer" onClick={onClick}>
			<img src={cornerImage} alt="corner" draggable={false} />
			<img src={edgeImage} alt="edge" draggable={false} />
			<img src={cornerImage} alt="corner" draggable={false}
				style={{
					transform: "rotate(90deg)"
				}} />
			<img src={edgeImage} alt="edge" draggable={false}
				style={{
					transform: "rotate(-90deg)"
				}} />
			<div /> { /* empty element for in the middle */}
			<img src={edgeImage} alt="edge" draggable={false}
				style={{
					transform: "rotate(90deg)"
				}} />
			<img src={cornerImage} alt="corner" draggable={false}
				style={{
					transform: "rotate(-90deg)"
				}} />
			<img src={edgeImage} alt="edge" draggable={false}
				style={{
					transform: "rotate(180deg)"
				}} />
			<img src={cornerImage} alt="corner" draggable={false}
				style={{
					transform: "rotate(180deg)"
				}} />
		</div>
	);
}

export default FrameRenderer;