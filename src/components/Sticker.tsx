import { useEffect, useRef, useState } from "react";
import { STICKER_DVH } from "../data/constants";

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
	const [offset, setOffset] = useState({ x: xOffset, y: yOffset });
	const [position, setPosition] = useState({ x: x + xOffset, y: y + yOffset });
	const [isDragging, setIsDragging] = useState(instantDrag);
	const imgRef = useRef<HTMLImageElement>(null);


	function calculateMouseOffset(mouseX: number, mouseY: number) {
		if (imgRef.current) {
			const rect = imgRef.current.getBoundingClientRect();
			setOffset({
				x: rect.left - mouseX,
				y: rect.top - mouseY,
			});
		}
	}

	const handleDragEnd = () => {
		if (isDragging && onStickerMoved) {
			onStickerMoved({ image, id, x: position.x, y: position.y });
		}

		setIsDragging(false);
	}

	const handleDragStart = (clientX: number, clientY: number) => {
		setIsDragging(true);
		calculateMouseOffset(clientX, clientY);
	}

	const handleDragMove = (clientX: number, clientY: number) => {
		if (isDragging) {
			setPosition({
				x: clientX + offset.x,
				y: clientY + offset.y,
			});
		}
	};

	// mouse events
	const onMouseDown = (e: React.MouseEvent) => {
		handleDragStart(e.clientX, e.clientY);
	}

	const onMouseMove = (e: MouseEvent) => {
		handleDragMove(e.clientX, e.clientY);
	}

	const onMouseUp = () => {
		handleDragEnd();
	}

	// touch events
	const onTouchStart = (e: React.TouchEvent) => {
		if (e.touches.length === 1) {
			const touch = e.touches[0];
			handleDragStart(touch.clientX, touch.clientY);
		}
	}

	const onTouchMove = (e: TouchEvent) => {
		if (e.touches.length === 1) {
			const touch = e.touches[0];
			handleDragMove(touch.clientX, touch.clientY);
		}
	}

	const onTouchEnd = () => {
		handleDragEnd();
	}

	useEffect(() => {
		window.addEventListener("mousemove", onMouseMove);
		window.addEventListener("mouseup", onMouseUp);

		return () => {
			window.removeEventListener("mousemove", onMouseMove);
			window.removeEventListener("mouseup", onMouseUp);
		};
	}, [isDragging, offset, position]);

	useEffect(() => {
		window.addEventListener("touchmove", onTouchMove);
		window.addEventListener("touchend", onTouchEnd);
		window.addEventListener("touchcancel", onTouchEnd);

		return () => {
			window.removeEventListener("touchmove", onTouchMove);
			window.removeEventListener("touchend", onTouchEnd);
			window.removeEventListener("touchcancel", onTouchEnd);
		};
	}, [isDragging, offset, position]);

	return (
		<img src={image} alt="sticker" className="Sticker"
			style={{
				top: `${position.y / window.innerHeight * 100}dvh`,
				left: `${position.x / window.innerWidth * 100}dvw`,
				height: `${STICKER_DVH}dvh`,
				touchAction: "none",
			}}
			onMouseDown={onMouseDown}
			onTouchStart={onTouchStart}
			ref={imgRef}
			draggable={false}
		/>
	);
}

export default Sticker;