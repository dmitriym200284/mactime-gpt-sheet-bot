import { FILTER_DEFINITIONS } from '../data/filterDefinitions'
import ActiveFilterChips from './ActiveFilterChips'

export default function FiltersPanel({ state, setState, presets, activePreset, onApplyPreset, getCount, groups, confidenceLevels }) {
  const toggle = (key, value) => setState((s) => ({ ...s, selectedFilters: { ...s.selectedFilters, [key]: s.selectedFilters[key]?.includes(value) ? s.selectedFilters[key].filter((v) => v !== value) : [...(s.selectedFilters[key] || []), value] } }))
  return <section className='p-4 bg-white rounded-xl border space-y-3'>
    <input className='w-full border rounded p-2' placeholder='Поиск по всем полям' value={state.search} onChange={(e)=>setState(s=>({...s,search:e.target.value}))}/>
    <div className='flex gap-2 flex-wrap'>{presets.map(p=><button key={p.id} onClick={()=>onApplyPreset(p)} className={`px-2 py-1 rounded text-sm ${activePreset===p.id?'bg-indigo-600 text-white':'bg-slate-200'}`}>{p.title}</button>)}</div>
    <div className='flex gap-2'><select className='border p-2 rounded' value={state.group} onChange={(e)=>setState(s=>({...s,group:e.target.value}))}><option value=''>Все группы</option>{groups.map(g=><option key={g}>{g}</option>)}</select><select className='border p-2 rounded' value={state.confidence} onChange={(e)=>setState(s=>({...s,confidence:e.target.value}))}><option value=''>Любая уверенность</option>{confidenceLevels.map(c=><option key={c}>{c}</option>)}</select><label className='text-sm flex items-center gap-2'><input type='checkbox' checked={state.russianOnly} onChange={(e)=>setState(s=>({...s,russianOnly:e.target.checked}))}/>Русский язык</label></div>
    <ActiveFilterChips selectedFilters={state.selectedFilters} onRemove={(k,v)=>toggle(k,v)} />
    {FILTER_DEFINITIONS.map((cat)=><div key={cat.key}><p className='font-semibold'>{cat.title}</p><div className='flex flex-wrap gap-2 mt-1'>{cat.options.map(([val,label])=>{const count=getCount(cat.key,val);const on=state.selectedFilters[cat.key]?.includes(val);return <button key={val} onClick={()=>toggle(cat.key,val)} className={`px-2 py-1 text-xs rounded border ${on?'bg-indigo-600 text-white':'bg-white'} ${count===0&&!on?'opacity-40':''}`}>{label} ({count})</button>})}</div></div>)}
  </section>
}
