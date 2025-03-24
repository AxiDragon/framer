import frames, { EMPTY_FRAME } from "../data/frames";
import Frame from "./Frame";

type Props = {
	onFrameSelected: (frame: Frame) => void;
	hide?: boolean;
}

const FrameSelector = ({ onFrameSelected, hide = false }: Props) => {
	return (
		<>
			{frames.map((frame, index) => (
				<img key={index} src={frame.frame}
					onClick={() => onFrameSelected(frame)}
					style={{ cursor: "pointer", display: hide ? "none" : "block" }} />
			))}
			<div style={{
				fontSize: 50, height: "100%", width: 100,
				cursor: "pointer", display: hide ? "none" : "flex", justifyContent: "center", alignItems: "center"
			}}
				onClick={() => onFrameSelected(EMPTY_FRAME)}>
				❌
			</div>
		</>
	)
}

export default FrameSelector;