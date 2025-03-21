import frames, { EMPTY_FRAME } from "../data/frames";
import Frame from "./Frame";
import FrameWrapper from "./FrameRenderer";

type Props = {
	onFrameSelected: (frame: Frame) => void;
}

const FrameSelector = ({ onFrameSelected }: Props) => {
	return (
		<div className="FrameSelectorContainer">
			<div className="FrameSelector">
				{frames.map((frame, index) => (
					<FrameWrapper key={index} frame={frame}
						onClick={() => onFrameSelected(frame)}
						framePercentage={0.45}>
						<div style={{ width: 75, height: 75 }} />
					</FrameWrapper>
				))}
				<div style={{ fontSize: 50, color: "red", width: 50, height: 50, cursor: "pointer" }}
					onClick={() => onFrameSelected(EMPTY_FRAME)}>
					❌
				</div>
			</div>
		</div>
	)
}

export default FrameSelector;