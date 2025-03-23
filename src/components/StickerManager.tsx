import { useEffect, useState } from "react";
import Sticker, { StickerProps } from "./Sticker";

type Props = {
	onStickerMoved?: (sticker: StickerProps) => void;
}

function StickerManager({ onStickerMoved }: Props) {
	const [stickerCount, setStickerCount] = useState<number>(0);
	const [stickers, setStickers] = useState<string[]>([]);
	const [lastClickPosition, setLastClickPosition] = useState({ x: 0, y: 0 });
	const [lastMouseOffset, setLastMouseOffset] = useState({ x: 0, y: 0 });

	useEffect(() => {
		const handleAddSticker = (e: Event) => {
			const customEvent = e as CustomEvent;
			const sticker = customEvent.detail.sticker as string;
			const mouseEvent = customEvent.detail.e as React.MouseEvent;

			const imgElement = mouseEvent.currentTarget as HTMLImageElement;
			const rect = imgElement.getBoundingClientRect();

			setLastClickPosition({ x: mouseEvent.clientX, y: mouseEvent.clientY });
			setLastMouseOffset({ x: rect.left - mouseEvent.clientX, y: rect.top - mouseEvent.clientY });
			setStickerCount(stickerCount + 1);
			setStickers([...stickers, sticker]);
		}

		window.addEventListener("add-sticker", handleAddSticker);

		return () => {
			window.removeEventListener("add-sticker", handleAddSticker);
		}
	}, [stickerCount, stickers]);

	return (
		<div style={{ position: "absolute", top: 0, left: 0 }}>
			{
				stickers.map((sticker, index) => (
					<Sticker
						key={index}
						image={sticker}
						id={index}
						x={lastClickPosition.x}
						y={lastClickPosition.y}
						xOffset={lastMouseOffset.x}
						yOffset={lastMouseOffset.y}
						onStickerMoved={onStickerMoved}
						instantDrag={true} //drag new stickers instantly
					/>
				))
			}
		</div>
	);
}

export default StickerManager;