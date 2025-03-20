import html2canvas from "html2canvas";
import { useRef, useState } from "react";

function MainImage() {
	const [image, setImage] = useState<string>("");
	const [imageUrl, setImageUrl] = useState<string>("");

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

	const onImageInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		const reader = new FileReader();
		reader.onload = (e) => {
			const res = e.target?.result;

			if (typeof res === "string") {
				setImage(res);
			}
		};
		reader.readAsDataURL(file);
	};

	const onLinkInput = async () => {
		if (!imageUrl) {
			alert("Please enter a URL!");
			return;
		}

		try {
			const res = await fetch(imageUrl, { method: "HEAD" });
			console.log(res.headers);
			const type = res.headers.get("content-type");
			if (type && type.startsWith("image/")) {
				setImage(imageUrl);
			} else {
				alert("The URL is not an image!");
			}
		} catch (e: unknown) {
			alert("Failed to load image! " + e);
		}
	};

	return (
		<>
			{
				image !== "" ?
					<div className="EditedImageContainer">
						<div className="EditedImage" ref={editedImageRef}>
							<img src={image} alt="main" className="MainImage" />
							<div>
								Im here too
							</div>
						</div>
						<button onClick={onDownload}>Download Image</button>
					</div>
					:
					<div>
						<p>Upload an image</p>
						<div>
							<p>Load from device</p>
							<input type="file" accept="image/*" onChange={onImageInput} />
						</div>
						<div style={{ width: "75%" }} >
							<p>Load from web</p>
							<input type="text"
								placeholder="Image URL"
								onChange={(e) => setImageUrl(e.target.value)}
								style={{ width: "75%" }} />
							<button onClick={onLinkInput}>Load</button>
						</div>
					</div>

			}
		</>
	)
}

export default MainImage;