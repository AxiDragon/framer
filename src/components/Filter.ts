export type FilterProps = {
	name?: string;
	propertyName: string;
	value: string;
	defaultValue?: number;
	onChange: (e: number) => string;
}

export default class Filter {
	public propertyName: string = '';
	public name: string = '';
	public defaultValue: number = 0;
	private value: string = '';
	private onChange: (e: number) => string;

	constructor({ name = "", propertyName, value, defaultValue = 0, onChange }: FilterProps) {
		this.propertyName = propertyName;
		this.name = name ? name : propertyName.charAt(0).toUpperCase() + propertyName.slice(1);
		this.value = value;
		this.defaultValue = defaultValue;
		this.onChange = onChange;
	}

	public setValue(value: number): void {
		this.value = this.onChange(value);
	}

	public getFilterString(): string {
		return `${this.name}(${this.value})`;
	}
}