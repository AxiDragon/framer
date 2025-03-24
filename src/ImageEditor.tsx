import { useRef, useState } from "react";
import FilterSliders from "./components/FilterSliders";
import Filter from "./components/Filter";
import StickerGrabber from "./components/StickerGrabber";
import FrameSelector from "./components/FrameSelector";
import Frame from "./components/Frame";
import { EMPTY_FRAME } from "./data/frames";
import FrameWrapper from "./components/FrameRenderer";
import { StickerProps } from "./components/Sticker";
import StickerManager from "./components/StickerManager";
import { FRAME_WIDTH_PERCENTAGE, STICKER_DVH } from "./data/constants";
import { filters } from "./data/filters";

export type MenuName = "stickers" | "filters" | "frames";

export type Props = {
	image: string;
}

function ImageEditor({ image }: Props) {
	const [filterStyle, setFilterStyle] = useState<Filter[]>(filters);
	const [frame, setFrame] = useState<Frame>(EMPTY_FRAME);
	const [stickers, setStickers] = useState<Record<number, StickerProps>>({});
	const [selectedMenu, setSelectedMenu] = useState<MenuName | null>("filters");

	const imageRef = useRef<HTMLImageElement>(null!);

	const getFilter = (): string => {
		let result = "";

		for (const filter of filterStyle) {
			result += filter.getFilterString() + " ";
		}

		return result;
	}

	const onStickerMoved = (sticker: StickerProps) => {
		setStickers({
			...stickers,
			[sticker.id]: sticker
		});
	}

	const onFilterSliderChanged = (filter: string, value: number) => {
		const filterToUpdate = filterStyle.find(f => f.propertyName === filter);

		if (filterToUpdate) {
			filterToUpdate.setValue(value);
			setFilterStyle([...filterStyle]);
		}
	};

	const getContentRect = () => {
		if (!imageRef.current) return { x: 0, y: 0, width: 0, height: 0 };

		const styles = window.getComputedStyle(imageRef.current);
		const borderWidth = parseFloat(styles.borderWidth || "0");

		const fullRect = imageRef.current.getBoundingClientRect();

		return {
			x: fullRect.x + borderWidth,
			y: fullRect.y + borderWidth,
			width: fullRect.width - borderWidth * 2,
			height: fullRect.height - borderWidth * 2,
		}
	}

	const onDownload = async () => {
		if (!imageRef.current) return;

		try {
			const img = new Image();

			await new Promise((resolve, reject) => {
				img.onload = resolve;
				img.onerror = reject;
				img.crossOrigin = "anonymous";
				img.src = image;
			});

			const contentRect = getContentRect();

			const scale = img.naturalHeight / contentRect.height;
			const w = frame !== EMPTY_FRAME ?
				Math.max(img.naturalHeight, img.naturalWidth) * FRAME_WIDTH_PERCENTAGE : 0;

			const relativeStickers = Object.values(stickers).map(sticker => ({
				...sticker,
				x: (sticker.x - contentRect.x) * scale,
				y: (sticker.y - contentRect.y) * scale,
			}));

			const canvas = document.createElement("canvas");
			canvas.width = img.naturalWidth + w * 2;
			canvas.height = img.naturalHeight + w * 2;

			const ctx = canvas.getContext("2d");

			if (ctx) {
				ctx.filter = getFilter();
				ctx.drawImage(img, w, w, canvas.width - w * 2, canvas.height - w * 2);
				ctx.filter = "none";

				ctx.save();
				ctx.beginPath();
				ctx.rect(w, w, canvas.width - w * 2, canvas.height - w * 2);
				ctx.clip();

				//draw in stickers
				const stickerSize = STICKER_DVH * window.innerHeight / 100;
				for (const sticker of relativeStickers) {
					const stickerImg = new Image();

					await new Promise((resolve, reject) => {
						stickerImg.onload = resolve;
						stickerImg.onerror = reject;
						stickerImg.crossOrigin = "anonymous";
						stickerImg.src = sticker.image;
					});

					const aspectRatio = stickerImg.naturalWidth / stickerImg.naturalHeight;

					ctx.drawImage(stickerImg, sticker.x + w, sticker.y + w,
						stickerSize * scale * aspectRatio,
						stickerSize * scale);
				}

				ctx.restore();

				if (frame) {
					//draw in frame
					const { cornerImage, topEdgeImage: edgeImage } = await frame.getHTMLImages();

					for (let i = 0; i < 4; i++) {
						const baseLength = i % 2 == 0 ? canvas.width : canvas.height;
						//draw in a corner
						ctx.drawImage(cornerImage, 0, 0, w, w);
						//draw in an edge
						ctx.drawImage(edgeImage, w, 0, baseLength - w * 2, w);
						ctx.translate(baseLength, 0); //rotation will hook it correctly
						ctx.rotate(Math.PI / 2);
					}
				}

				const url = canvas.toDataURL("image/png");

				const date = new Date();
				const formattedDate =
					date.toLocaleDateString("en-us") + " " + date.toLocaleTimeString("en-us");

				const a = document.createElement("a");
				a.href = url;
				a.download = `Framer_${formattedDate}.png`;
				a.click();
			}
		} catch (e) {
			alert("Failed to download image! " + e);
		}
	}

	const onReturn = () => {
		const confirmReturn = window.confirm("Are you sure you want to return? This image will not be saved.");

		if (confirmReturn) {
			window.dispatchEvent(new CustomEvent("return"));
		}
	}

	return (
		<div className="ImageEditor">
			<FrameWrapper frame={frame} image={image}
				framePercentage={FRAME_WIDTH_PERCENTAGE}
				ref={imageRef}
				style={{
					filter: getFilter(),
				}} />
			<div className="ImageEditorMenu">
				{selectedMenu && <div className="MenuItemContainer">
					<div /> {/* filler element to add margin to the left */}
					<FilterSliders hide={selectedMenu !== "filters"} filterSliders={filterStyle} onFilterSliderChanged={onFilterSliderChanged} />
					<StickerGrabber hide={selectedMenu !== "stickers"} />
					<FrameSelector hide={selectedMenu !== "frames"} onFrameSelected={(frame: Frame) => setFrame(frame)} />
				</div>}
				<div className="ImageEditorButtonContainer">
					{/* menu buttons */}
					<button className="ImageEditorButton" onClick={() => setSelectedMenu("stickers")}>
						Stickers
					</button>
					<button className="ImageEditorButton" onClick={() => setSelectedMenu("filters")}>
						Filters
					</button>
					<button className="ImageEditorButton" onClick={() => setSelectedMenu("frames")}>
						Frames
					</button>
				</div>
			</div>
			<StickerManager onStickerMoved={onStickerMoved} />
			<button className="DownloadButton CornerButton" onClick={onDownload}>
				Download
			</button>
			<button className="ReturnButton CornerButton" onClick={onReturn}>
				Return
			</button>
		</div>
	)
}

export default ImageEditor;