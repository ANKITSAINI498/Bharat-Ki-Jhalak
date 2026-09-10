import { useEffect, useMemo, useState } from "react";
import { Filter, Search, SlidersHorizontal } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { useApp } from "../context/AppContext";
import FilterPanel from "../components/FilterPanel";
import Gallery,{ViewSwitcher} from "../components/Gallery";
import { EmptyState } from "../components/common";

export default function Explore({onOpen,onShare,onCollect}) {
 const {photos,loading,viewMode,setViewMode}=useApp(); const [params,setParams]=useSearchParams();
 const [query,setQuery]=useState(params.get("q")||""); const [mobileFilters,setMobileFilters]=useState(false);
 const [filters,setFilters]=useState({location:"All",category:"All",orientation:"All",sort:"Recommended"});
 useEffect(()=>{setQuery(params.get("q")||"")},[params]);
 const options=useMemo(()=>({locations:["All",...new Set(photos.map(p=>p.location.split(",")[0]).filter(Boolean))],categories:["All",...new Set(photos.map(p=>p.category))]}),[photos]);
 const results=useMemo(()=>{
   const q=query.toLowerCase().trim();
   let arr=photos.filter(p=>!q || [p.title,p.location,p.category,p.photographer,p.description,...(p.tags||[])].join(" ").toLowerCase().includes(q));
   if(filters.location!=="All")arr=arr.filter(p=>p.location.toLowerCase().includes(filters.location.toLowerCase()));
   if(filters.category!=="All")arr=arr.filter(p=>p.category===filters.category);
   if(filters.orientation!=="All")arr=arr.filter(p=>p.orientation===filters.orientation);
   if(filters.sort==="Latest")arr.sort((a,b)=>new Date(b.date)-new Date(a.date));
   if(filters.sort==="Oldest")arr.sort((a,b)=>new Date(a.date)-new Date(b.date));
   if(filters.sort==="Most Popular")arr.sort((a,b)=>b.likes+b.views-a.likes-a.views);
   if(filters.sort==="Most Liked")arr.sort((a,b)=>b.likes-a.likes);
   if(filters.sort==="Most Viewed")arr.sort((a,b)=>b.views-a.views);
   if(filters.sort==="A-Z")arr.sort((a,b)=>a.title.localeCompare(b.title));
   return arr;
 },[photos,query,filters]);
 return <main className="page"><div className="page-head"><div><small>DISCOVER</small><h1>Explore the gallery</h1><p>Search, filter and switch views across every curated frame.</p></div><div className="searchbar"><Search/><input value={query} onChange={e=>{setQuery(e.target.value);setParams(e.target.value?{q:e.target.value}: {})}} placeholder="Search photos…"/></div></div>
 <div className="toolbar"><button className="filter-mobile-btn" onClick={()=>setMobileFilters(true)}><Filter size={16}/> Filters</button><span><b>{results.length}</b> photos</span><div className="toolbar-right"><ViewSwitcher value={viewMode} onChange={setViewMode}/><button className="icon-btn"><SlidersHorizontal size={17}/></button></div></div>
 <div className="explore-layout"><div className={mobileFilters?"mobile-filter open":"mobile-filter"}><div className="mobile-filter-head"><b>Filters</b><button onClick={()=>setMobileFilters(false)}>Close</button></div><FilterPanel filters={filters} setFilters={setFilters} options={options}/></div><FilterPanel filters={filters} setFilters={setFilters} options={options}/><section className="results"><Gallery photos={results} view={viewMode} onOpen={onOpen} onShare={onShare} onCollect={onCollect} loading={loading}/>{!loading&&!results.length&&<EmptyState title={query?`No photos found for "${query}".`:"No photos match these filters."} text="Try another search term or reset your filters." action="Reset filters" onAction={()=>setFilters({location:"All",category:"All",orientation:"All",sort:"Recommended"})}/>}</section></div></main>;
}