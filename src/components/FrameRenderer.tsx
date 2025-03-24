import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import Frame from "./Frame";
import { FRAME_IMAGE_SIZE } from "../data/constants";

type Props = {
	frame: Frame;
	image: string;
	//should be between 0 and 1
	framePercentage?: number;
	onClick?: () => void;
	style?: React.CSSProperties;
	imageProps?: React.ImgHTMLAttributes<HTMLImageElement>;
}

const FrameWrapper = forwardRef<HTMLImageElement, Props>(
	({ frame, framePercentage = 0.1, onClick, image, style, imageProps }: Props, ref) => {
		const [frameWidth, setFrameWidth] = useState(0);
		const imageRef = useRef<HTMLImageElement>(null);

		useImperativeHandle(ref, () => imageRef.current!, [imageRef]);

		const updateFrameWidth = () => {
			if (imageRef.current) {
				const img = imageRef.current;
				const width = Math.max(img.width, img.height);
				setFrameWidth(width * framePercentage);
			}
		};

		useEffect(() => {
			const resizeObserver = new ResizeObserver(() => updateFrameWidth());

			if (imageRef.current) {
				resizeObserver.observe(imageRef.current);
			}

			return () => {
				if (imageRef.current) {
					resizeObserver.disconnect();
				}
			};
		}, [imageRef, framePercentage]);

		useEffect(() => {
			updateFrameWidth();
		}, [])

		return (
			<img src={image} className="FrameRenderer" alt="frame" draggable={false}
				onClick={onClick} ref={imageRef} {...imageProps}
				style={{
					...style,
					cursor: onClick ? "pointer" : "default",
					pointerEvents: onClick ? "auto" : "none",
					touchAction: onClick ? "manipulation" : "none",
					borderWidth: `${frameWidth}px`,
					borderImage: `url(${frame.frame}) ${FRAME_IMAGE_SIZE / 3} stretch`,
				}} />
		);
	}
);

export default FrameWrapper;