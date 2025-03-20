import { useRef, useState } from "react";
import FilterSliders from "./components/FilterSliders";
import Filter from "./components/Filter";

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
]

function ImageEditor({ image }: Props) {
	const [filterStyle, setFilterStyle] = useState<Filter[]>(filters);

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
			console.log('updating');
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

			const canvas = document.createElement("canvas");
			canvas.width = img.naturalWidth;
			canvas.height = img.naturalHeight;

			const ctx = canvas.getContext("2d");

			if (ctx) {
				ctx.filter = getFilter();
				ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

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
			<div>
				<div className="EditedImage">
					<img src={image} ref={imageRef} alt="main" className="MainImage"
						style={{
							filter: getFilter(),
						}} />
					<button onClick={onDownload}>Download Image</button>
				</div>
			</div>
			<FilterSliders filterSliders={filterStyle} onFilterSliderChanged={onFilterSliderChanged} />
		</div>
	)
}

export default ImageEditor;