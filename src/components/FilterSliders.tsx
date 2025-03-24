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
				<div key={filter.name} style={{
					height: "100%",
					display: hide ? "none" : "flex",
					flexDirection: "column",
					justifyContent: "center",
					textAlign: "center",
					alignContent: "center"
				}}>
					<p>{filter.name}</p>
					<input type="range" min={0} max={1} defaultValue={filter.defaultValue} step={0.01} onChange={onChange} />
				</div>
			);
		})}
	</>);
}

export default FilterSliders;