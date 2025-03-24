import Filter from "../components/Filter";

export const filters: Filter[] = [
	new Filter({
		propertyName: "opacity",
		value: "1",
		defaultValue: 1,
		onChange: (e: number) => `${e}`
	}),
	new Filter({
		propertyName: "sepia",
		value: "0%",
		defaultValue: 0,
		onChange: (e: number) => `${e * 100}%`
	}),
	new Filter({
		propertyName: "brightness",
		value: "100%",
		defaultValue: 0.5,
		onChange: (e: number) => `${e * 200}%`
	}),
	new Filter({
		propertyName: "contrast",
		value: "100%",
		defaultValue: 0.5,
		onChange: (e: number) => `${e * 200}%`
	}),
	new Filter({
		name: "Saturation",
		propertyName: "saturate",
		value: "100%",
		defaultValue: 0.5,
		onChange: (e: number) => `${e * 200}%`
	}),
	new Filter({
		name: "Hue",
		propertyName: "hue-rotate",
		value: "0deg",
		defaultValue: 0,
		onChange: (e: number) => `${e * 360}deg`
	}),
];