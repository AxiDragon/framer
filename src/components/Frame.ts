export default class Frame {
	constructor(public frame: string, private corner: string, private edge: string) { }

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
		const frameImage = await this.loadImage(this.frame);
		const cornerImage = await this.loadImage(this.corner);
		const topEdgeImage = await this.loadImage(this.edge);

		return { cornerImage, topEdgeImage, frameImage };
	}

	public getStringImages() {
		return {
			cornerImage: this.corner,
			topEdgeImage: this.edge,
			frameImage: this.frame,
		};
	}
}