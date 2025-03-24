import stickerImages from "../data/stickers";

type Props = {
	hide?: boolean;
}

const StickerGrabber = ({ hide = false }: Props) => {
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
						style={{ display: hide ? "none" : "block" }}
					/>
				))
			}
		</>
	)
}

export default StickerGrabber;