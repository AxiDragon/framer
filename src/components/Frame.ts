export default class Frame {
	//rightEdgeImage should just be topEdgeImage rotated 90 degrees clockwise
	constructor(private cornerImage: string, private topEdgeImage: string, private rightEdgeImage: string) { }

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
		const topEdgeImage = await this.loadImage(this.topEdgeImage);
		const rightEdgeImage = await this.loadImage(this.rightEdgeImage);

		return { cornerImage, topEdgeImage, rightEdgeImage };
	}

	public getStringImages() {
		return {
			cornerImage: this.cornerImage,
			topEdgeImage: this.topEdgeImage,
			rightEdgeImage: this.rightEdgeImage,
		};
	}
}