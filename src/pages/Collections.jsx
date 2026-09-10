import { useState } from "react";
import { FolderPlus, Trash2 } from "lucide-react";
import { useApp } from "../context/AppContext";
import { EmptyState, Modal } from "../components/common";
import { Link } from "react-router-dom";
export default function Collections() {
 const {collections,createCollection,deleteCollection}=useApp(); const [open,setOpen]=useState(false);const [name,setName]=useState("");
 const submit=()=>{if(createCollection(name)){setName("");setOpen(false)}};
 return <main className="page"><div className="page-head"><div><small>ORGANIZE</small><h1>Collections</h1><p>Build visual folders for trips, ideas, wallpapers and stories.</p></div><button className="btn primary" onClick={()=>setOpen(true)}><FolderPlus size={17}/> Create collection</button></div>
 {collections.length?<div className="collection-grid">{collections.map(c=><div className="collection-card" key={c.id}><div className="collection-art"><div className="collection-orb"/></div><div className="collection-body"><h3>{c.name}</h3><p>{c.photoIds.length} photos</p><button className="icon-btn danger" onClick={()=>deleteCollection(c.id)} aria-label="Delete collection"><Trash2 size={16}/></button></div></div>)}</div>:<EmptyState title="No collections yet." text="Create a collection and start organizing your visual inspiration." action="Create collection" onAction={()=>setOpen(true)}/>}
 <Modal open={open} onClose={()=>setOpen(false)} title="Create Collection"><div className="create-modal"><input autoFocus value={name} onChange={e=>setName(e.target.value)} onKeyDown={e=>e.key==="Enter"&&submit()} placeholder="e.g. My Rajasthan"/><button className="btn primary" onClick={submit}>Create</button></div></Modal></main>;
}