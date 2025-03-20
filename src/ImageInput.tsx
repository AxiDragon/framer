import { useState } from "react";

type Props = {
	onImageAccepted: (image: string) => void;
}

const ImageInput = ({ onImageAccepted }: Props) => {
	const [imageUrl, setImageUrl] = useState<string>("");

	const onImageInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		const reader = new FileReader();
		reader.onload = (e) => {
			const res = e.target?.result;

			if (typeof res === "string") {
				onImageAccepted(res);
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
				onImageAccepted(imageUrl);
			} else {
				alert("The URL is not an image!");
			}
		} catch (e: unknown) {
			alert("Failed to load image! " + e);
		}
	};

	return (
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
	);
}

export default ImageInput;