import html2canvas from "html2canvas";
import { useRef } from "react";

type Props = {
	image: string;
}

function ImageEditor({ image }: Props) {
	const editedImageRef = useRef<HTMLDivElement>(null);

	const onDownload = async () => {
		if (!editedImageRef.current) return;

		try {
			const canvas = await html2canvas(editedImageRef.current, {
				scale: 2,
			});
			const url = canvas.toDataURL("image/png");

			const date = new Date();
			const formattedDate =
				date.toLocaleDateString("en-us") + " " + date.toLocaleTimeString("en-us");

			const a = document.createElement("a");
			a.href = url;
			a.download = `Framer_${formattedDate}.png`;
			a.click();
		} catch (e) {
			alert("Failed to download image! " + e);
		}
	}

	return (
		<div className="EditedImageContainer">
			<div className="EditedImage" ref={editedImageRef}>
				<img src={image} alt="main" className="MainImage" />
				<div>
					Im here too
				</div>
			</div>
			<button onClick={onDownload}>Download Image</button>
		</div>
	)
}

export default ImageEditor;