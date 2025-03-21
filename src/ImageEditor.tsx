import { useRef, useState } from "react";
import FilterSliders from "./components/FilterSliders";
import Filter from "./components/Filter";
import StickerGrabber from "./components/StickerGrabber";
import FrameSelector from "./components/FrameSelector";
import Frame from "./components/Frame";
import { EMPTY_FRAME } from "./data/frames";
import FrameWrapper from "./components/FrameRenderer";

type Props = {
	image: string;
}

const filters: Filter[] = [
	new Filter({
		name: "opacity",
		value: "1",
		defaultValue: 1,
		onChange: (e: number) => `${e}`
	}),
	new Filter({
		name: "sepia",
		value: "0%",
		defaultValue: 0,
		onChange: (e: number) => `${e * 100}%`
	}),
	new Filter({
		name: "brightness",
		value: "100%",
		defaultValue: 0.5,
		onChange: (e: number) => `${e * 200}%`
	}),
	new Filter({
		name: "contrast",
		value: "100%",
		defaultValue: 0.5,
		onChange: (e: number) => `${e * 200}%`
	}),
	new Filter({
		name: "saturate",
		value: "100%",
		defaultValue: 0.5,
		onChange: (e: number) => `${e * 200}%`
	}),
];

function ImageEditor({ image }: Props) {
	const [filterStyle, setFilterStyle] = useState<Filter[]>(filters);
	const [frame, setFrame] = useState<Frame>(EMPTY_FRAME);

	const imageRef = useRef<HTMLImageElement>(null);

	const getFilter = (): string => {
		let result = "";

		for (const filter of filterStyle) {
			result += filter.getFilterString() + " ";
		}

		return result;
	}

	const onFilterSliderChanged = (filter: string, value: number) => {
		const filterToUpdate = filterStyle.find(f => f.name === filter);

		if (filterToUpdate) {
			filterToUpdate.setValue(value);
			setFilterStyle([...filterStyle]);
		}
	};

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

			const w = frame ? Math.max(img.naturalHeight, img.naturalWidth) / 10 : 0;

			const canvas = document.createElement("canvas");
			canvas.width = img.naturalWidth + w * 2;
			canvas.height = img.naturalHeight + w * 2;

			const ctx = canvas.getContext("2d");

			if (ctx) {
				ctx.filter = getFilter();
				ctx.drawImage(img, w, w, canvas.width - w * 2, canvas.height - w * 2);

				if (frame) {
					//draw in frame
					ctx.filter = "none";
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

	return (
		<div className="ImageEditor">
			<div className="EditedImage">
				<FrameWrapper frame={frame} className="MainImage" onClick={onDownload}>
					<img src={image} ref={imageRef} alt="main"
						style={{
							filter: getFilter(),
						}} />
				</FrameWrapper>
			</div>
			<FilterSliders filterSliders={filterStyle} onFilterSliderChanged={onFilterSliderChanged} />
			<StickerGrabber />
			<FrameSelector onFrameSelected={(frame: Frame) => setFrame(frame)} />
		</div>
	)
}

export default ImageEditor;