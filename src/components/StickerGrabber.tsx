import stickers from "../data/stickers";
import Sticker, { StickerProps } from "./Sticker";

type Props = {
	onStickerMoved?: (sticker: StickerProps) => void;
}

const StickerGrabber = ({ onStickerMoved }: Props) => {
	return (
		<div className="StickerGrabber side-column">
			<div className="auto-fill-grid">
				{
					stickers.map((sticker, index) => (
						<Sticker key={index} id={index} image={sticker} onStickerMoved={onStickerMoved} />
					))
				}
			</div>
		</div>
	)
}

export default StickerGrabber;