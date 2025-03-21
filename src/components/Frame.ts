export type FrameProps = {
	cornerImage: string;
	edgeImage: string;
}


export default class Frame {
	constructor(private cornerImage: string, private edgeImage: string) { }

	private async loadImage(src: string): Promise<HTMLImageElement> {
		const img = new Image();

		await new Promise((resolve, reject) => {
			img.onload = resolve;
			img.onerror = reject;
			img.crossOrigin = "anonymous";
			img.src = src;
		});

		return img;
	}

	public async getHTMLImages() {
		const cornerImage = await this.loadImage(this.cornerImage);
		const edgeImage = await this.loadImage(this.edgeImage);

		return { cornerImage, edgeImage };
	}

	public getStringImages() {
		return { cornerImage: this.cornerImage, edgeImage: this.edgeImage };
	}
}