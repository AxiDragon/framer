import frames from "../data/frames";
import Frame from "./Frame";
import FrameRenderer from "./FrameRenderer";

type Props = {
	onFrameSelected: (frame: Frame) => void;
}

const FrameSelector = ({ onFrameSelected }: Props) => {
	return (
		<div className="FrameSelectorContainer">
			<div className="FrameSelector">
				{frames.map((frame, index) => (
					<FrameRenderer key={index} frame={frame} onClick={() => onFrameSelected(frame)} />
				))}
			</div>
		</div>
	)
}

export default FrameSelector;