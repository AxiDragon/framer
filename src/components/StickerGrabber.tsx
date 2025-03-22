import { useState } from "react";
import stickerImages from "../data/stickers";
import Sticker, { StickerProps } from "./Sticker";
import { STICKER_SIZE } from "../data/constants";

type Props = {
	onStickerMoved?: (sticker: StickerProps) => void;
}

const StickerGrabber = ({ onStickerMoved }: Props) => {
	const [stickerCount, setStickerCount] = useState<number>(0);
	const [stickers, setStickers] = useState<string[]>([]);
	const [lastClickPosition, setLastClickPosition] = useState({ x: 0, y: 0 });
	const [lastMouseOffset, setLastMouseOffset] = useState({ x: 0, y: 0 });

	const onStickerAdded = (sticker: string, e: React.MouseEvent) => {
		const imgElement = e.currentTarget as HTMLImageElement;
		const rect = imgElement.getBoundingClientRect();

		setLastClickPosition({ x: e.clientX, y: e.clientY });
		setLastMouseOffset({ x: rect.left - e.clientX, y: rect.top - e.clientY });
		setStickerCount(stickerCount + 1);
		setStickers([...stickers, sticker]);
	}

	return (
		<div className="StickerGrabber side-column">
			<div className="auto-fill-grid">
				{
					stickerImages.map((sticker, index) => (
						<img
							key={index}
							src={sticker}
							alt="sticker"
							style={{ height: STICKER_SIZE }}
							draggable={false}
							onMouseDown={(e: React.MouseEvent) => onStickerAdded(sticker, e)}
						/>
					))
				}
			</div>
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
	)
}

export default StickerGrabber;