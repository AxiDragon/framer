import { useEffect, useRef, useState } from "react";
import Frame from "./Frame";

type Props = {
	frame: Frame;
	//should be between 0 and 1
	framePercentage?: number;
	onClick?: () => void;
	children?: React.ReactNode;
	style?: React.CSSProperties;
	className?: string;
}

function FrameWrapper({ frame, framePercentage = 0.1, onClick, children, style, className }: Props) {
	const { cornerImage, topEdgeImage, rightEdgeImage } = frame.getStringImages();
	const [frameWidth, setFrameWidth] = useState(0);
	const contentRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (contentRef.current) {
			const width = Math.max(contentRef.current.offsetHeight, contentRef.current.offsetWidth);

			setFrameWidth(width * framePercentage);
		}
	}, [contentRef]);

	return (
		<div className={`FrameRenderer ${className}`} onClick={onClick} style={{
			...style,
			gridTemplateColumns: `${frameWidth}px auto ${frameWidth}px`,
			gridTemplateRows: `${frameWidth}px auto ${frameWidth}px`,
			cursor: onClick ? "pointer" : "default",
		}}>
			<img src={cornerImage} alt="corner" draggable={false}
				style={{ height: frameWidth, width: frameWidth }} />
			<img src={topEdgeImage} alt="edge" draggable={false}
				style={{ height: frameWidth, width: "100%" }} />
			<img src={cornerImage} alt="corner" draggable={false}
				style={{
					height: frameWidth, width: frameWidth,
					transform: "rotate(90deg)",
				}} />

			<img src={rightEdgeImage} alt="edge" draggable={false}
				style={{
					width: frameWidth,
					transform: "rotate(180deg)",
				}} />
			<div ref={contentRef}>
				{children}
			</div>
			<img src={rightEdgeImage} alt="edge" draggable={false}
				style={{
					width: frameWidth,
				}} />
			<img src={cornerImage} alt="corner" draggable={false}
				style={{
					transform: "rotate(-90deg)",
					height: frameWidth, width: frameWidth
				}} />
			<img src={topEdgeImage} alt="edge" draggable={false}
				style={{
					transform: "rotate(180deg)",
					height: frameWidth,
				}} />
			<img src={cornerImage} alt="corner" draggable={false}
				style={{
					transform: "rotate(180deg)",
					height: frameWidth, width: frameWidth
				}} />
		</div>
	);
}

export default FrameWrapper;