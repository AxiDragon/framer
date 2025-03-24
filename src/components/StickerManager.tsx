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
			const x = customEvent.detail.x as number;
			const y = customEvent.detail.y as number;
			const imgElement = customEvent.detail.element as HTMLImageElement;

			const rect = imgElement.getBoundingClientRect();

			setLastClickPosition({ x, y });
			setLastMouseOffset({ x: rect.left - x, y: rect.top - y });
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