export type FilterProps = {
	name: string;
	value: string;
	defaultValue?: number;
	onChange: (e: number) => string;
}

export default class Filter {
	public name: string = '';
	public defaultValue: number = 0;
	private value: string = '';
	private onChange: (e: number) => string;

	constructor({ name, value, defaultValue = 0, onChange }: FilterProps) {
		this.name = name;
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