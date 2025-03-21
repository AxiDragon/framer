import { useEffect, useRef, useState } from "react";
import { STICKER_SIZE } from "../data/constants";

export type StickerProps = {
	image: string;
	id: number;
	x: number;
	y: number;
}

type Props = {
	image: string;
	id: number;
	onStickerMoved?: (sticker: StickerProps) => void;
}

function Sticker({ image, onStickerMoved, id }: Props) {
	const [position, setPosition] = useState({ x: 0, y: 0 });
	const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
	const [isDragging, setIsDragging] = useState(false);
	const imgRef = useRef<HTMLImageElement>(null);

	const onMouseUp = () => {
		if (isDragging && onStickerMoved) {
			onStickerMoved({ image, id, x: position.x, y: position.y });
		}

		setIsDragging(false);
	}

	const onMouseDown = (e: React.MouseEvent) => {
		setIsDragging(true);

		if (imgRef.current) {
			const rect = imgRef.current.getBoundingClientRect();
			setMouseOffset({
				x: rect.left - e.clientX,
				y: rect.top - e.clientY,
			});
		}
	}

	const onMouseMove = (e: MouseEvent) => {
		if (isDragging) {
			setPosition({
				x: e.clientX + mouseOffset.x,
				y: e.clientY + mouseOffset.y,
			});
		}
	};

	useEffect(() => {
		window.addEventListener("mousemove", onMouseMove);

		return () => {
			window.removeEventListener("mousemove", onMouseMove);
		};
	}, [isDragging]);

	useEffect(() => {
		window.addEventListener("mouseup", onMouseUp);

		return () => {
			window.removeEventListener("mouseup", onMouseUp);
		};
	}, [position, isDragging]);

	return (
		<img src={image} alt="sticker" className="Sticker"
			style={{ top: position.y, left: position.x, height: STICKER_SIZE }}
			onMouseDown={onMouseDown}
			ref={imgRef}
			draggable={false}
		/>
	);
}

export default Sticker;