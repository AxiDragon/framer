import frames, { EMPTY_FRAME } from "../data/frames";
import Frame from "./Frame";
import FrameWrapper from "./FrameRenderer";

type Props = {
	onFrameSelected: (frame: Frame) => void;
	hide?: boolean;
}

const FrameSelector = ({ onFrameSelected, hide = false }: Props) => {
	return (
		<>
			{frames.map((frame, index) => (
				<FrameWrapper key={index} frame={frame}
					onClick={() => onFrameSelected(frame)}
					framePercentage={0.5}
					style={{ display: hide ? "none" : "grid" }}>
					<div style={{ width: 50, height: "50%" }} />
				</FrameWrapper>
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