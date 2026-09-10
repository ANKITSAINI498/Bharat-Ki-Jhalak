import { RotateCcw } from "lucide-react";
export default function FilterPanel({ 
  filters,
  setFilters,
  options })
   {
  const update = (k, v) => setFilters(f => ({ ...f, [k]: v }));
  return 
  <aside className="filters glass">

    <div className="filter-head"><div>
      <small>CURATION</small>
      <h3>Refine discovery</h3>
      </div>
      <button className="text-btn" onClick={() => setFilters({ location: "All", category: "All", orientation: "All", sort: "Recommended" })}><RotateCcw size={14} /> Reset</button>
      </div>
    {[["location", "Location", options.locations],
     ["category", "Category", options.categories], 
     ["orientation", "Orientation", ["All", "Landscape", "Portrait", "Square"]], 
     ["sort", "Sort by", ["Recommended", "Latest", "Oldest", "Most Popular", "Most Liked", "Most Viewed", "A-Z"]]].map(([key, label, vals]) =>
      <label className="filter-field" key={key}>
        <span>{label}</span>
        <select value={filters[key]} onChange={e => update(key, e.target.value)}>{vals.map(v =>
         <option key={v}>{v}</option>)}
         </select>
         </label>
    )}
  </aside>;
}