import { useFetchFiltersQuery } from "./catalogApi"

export default function Filters() {
    const {data: filters} = useFetchFiltersQuery();
    console.log(filters);
    
    return (
    <div>Filters</div>
  )
}