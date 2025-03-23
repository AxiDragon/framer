import stickerImages from "../data/stickers";
import { useRef } from "react";

const StickerGrabber = () => {
	const firstSticker = useRef<HTMLImageElement>(null);

	const onAddSticker = (sticker: string, e: React.MouseEvent) => {
		window.dispatchEvent(new CustomEvent("add-sticker", {
			detail: {
				sticker,
				e
			}
		}));
	};

	return (
		<>
			{
				stickerImages.map((sticker, index) => (
					<img
						key={index}
						src={sticker}
						alt="sticker"
						draggable={false}
						onMouseDown={(e: React.MouseEvent) => onAddSticker(sticker, e)}
					/>
				))
			}
		</>
	)
}

export default StickerGrabber;