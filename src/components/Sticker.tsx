import { useEffect, useRef, useState } from "react";
import { STICKER_VH } from "../data/constants";

export type StickerProps = {
	image: string;
	id: number;
	x: number;
	y: number;
}

type Props = {
	image: string;
	id: number;
	x?: number;
	y?: number;
	xOffset?: number;
	yOffset?: number;
	instantDrag?: boolean;
	onStickerMoved?: (sticker: StickerProps) => void;
}

function Sticker({ image, onStickerMoved, x = 0, y = 0, xOffset = 0, yOffset = 0, instantDrag = false, id }: Props) {
	const [mouseOffset, setMouseOffset] = useState({ x: xOffset, y: yOffset });
	const [position, setPosition] = useState({ x: x + xOffset, y: y + yOffset });
	const [isDragging, setIsDragging] = useState(instantDrag);
	const imgRef = useRef<HTMLImageElement>(null);


	function calculateMouseOffset(mouseX: number, mouseY: number) {
		if (imgRef.current) {
			const rect = imgRef.current.getBoundingClientRect();
			setMouseOffset({
				x: rect.left - mouseX,
				y: rect.top - mouseY,
			});
		}
	}

	const onMouseUp = () => {
		if (isDragging && onStickerMoved) {
			onStickerMoved({ image, id, x: position.x, y: position.y });
		}

		setIsDragging(false);
	}

	const onMouseDown = (e: React.MouseEvent) => {
		setIsDragging(true);
		calculateMouseOffset(e.clientX, e.clientY);
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
	}, [isDragging, mouseOffset]);

	useEffect(() => {
		window.addEventListener("mouseup", onMouseUp);

		return () => {
			window.removeEventListener("mouseup", onMouseUp);
		};
	}, [position, isDragging]);

	return (
		<img src={image} alt="sticker" className="Sticker"
			style={{
				top: `${position.y / window.innerHeight * 100}vh`,
				left: `${position.x / window.innerWidth * 100}vw`,
				height: `${STICKER_VH}vh`
			}}
			onMouseDown={onMouseDown}
			ref={imgRef}
			draggable={false}
		/>
	);
}

export default Sticker;