import Filter from "./Filter";

type Props = {
	filterSliders: Filter[];
	onFilterSliderChanged: (filter: string, value: number) => void;
}

const FilterSliders = ({ filterSliders, onFilterSliderChanged }: Props) => {
	return (<div className="FilterSliders">
		{filterSliders.map((filter) => {
			const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
				onFilterSliderChanged(filter.name, Number(e.target.value));
			};

			return (
				<div key={filter.name}>
					<p>{filter.name}</p>
					<input type="range" min={0} max={1} defaultValue={filter.defaultValue} step={0.01} onChange={onChange} />
				</div>
			);
		})}
	</div>);
}

export default FilterSliders;