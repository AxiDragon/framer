import stickerImages from "../data/stickers";

type Props = {
	hide?: boolean;
}

const StickerGrabber = ({ hide = false }: Props) => {
	const onAddSticker = (sticker: string, x: number, y: number, element: HTMLImageElement) => {
		window.dispatchEvent(new CustomEvent("add-sticker", { detail: { sticker, x, y, element } }));
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
						onMouseDown={(e: React.MouseEvent) => {
							onAddSticker(sticker, e.clientX, e.clientY, e.currentTarget as HTMLImageElement);
						}}
						onTouchStart={(e: React.TouchEvent) => {
							if (e.touches.length === 1) {
								const touch = e.touches[0];
								onAddSticker(sticker, touch.clientX, touch.clientY, e.currentTarget as HTMLImageElement);
							}
						}}
						style={{ display: hide ? "none" : "block" }}
					/>
				))
			}
		</>
	)
}

export default StickerGrabber;