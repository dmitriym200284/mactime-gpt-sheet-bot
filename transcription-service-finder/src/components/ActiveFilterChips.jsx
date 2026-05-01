import { FILTER_LABEL_MAP } from '../data/filterDefinitions'

export default function ActiveFilterChips({ selectedFilters, onRemove }) {
  const chips = Object.entries(selectedFilters).flatMap(([k,v]) => (v||[]).map((id)=>({k,id,label:FILTER_LABEL_MAP[id]||id})))
  if (!chips.length) return null
  return <div className='flex flex-wrap gap-2 mt-3'>{chips.map((c)=><button key={c.k+c.id} onClick={()=>onRemove(c.k,c.id)} className='px-2 py-1 text-xs bg-slate-200 rounded'>{c.label} ×</button>)}</div>
}
