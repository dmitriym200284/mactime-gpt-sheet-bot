export default function ServiceList({ services, selectedId, onSelect }) {
  return <div className='space-y-3'>{services.map((s)=><button key={s.id} onClick={()=>onSelect(s.id)} className={`w-full text-left border rounded-xl p-3 ${selectedId===s.id?'border-indigo-600':''}`}><div className='flex justify-between'><h3 className='font-semibold'>{s.name}</h3><span className='text-sm'>Score: {s.score}</span></div><p className='text-xs text-slate-500'>{s.group}</p><p className='text-sm mt-1'>{s.description}</p><p className='text-xs mt-1'>Лучше для: {s.bestFor}</p></button>)}</div>
}
