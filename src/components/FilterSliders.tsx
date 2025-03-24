import Filter from "./Filter";

type Props = {
	filterSliders: Filter[];
	onFilterSliderChanged: (filter: string, value: number) => void;
	hide?: boolean;
}

const FilterSliders = ({ filterSliders, onFilterSliderChanged, hide = false }: Props) => {
	return (<>
		{filterSliders.map((filter) => {
			const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
				onFilterSliderChanged(filter.propertyName, Number(e.target.value));
			};

			return (
				<div key={filter.name} className="FilterSlider" style={{
					display: hide ? "none" : "flex",
				}}>
					<p>{filter.name}</p>
					<input type="range" min={0} max={1} defaultValue={filter.defaultValue} step={0.01} onChange={onChange} />
				</div>
			);
		})}
	</>);
}

export default FilterSliders;