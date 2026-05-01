import { useMemo, useState } from 'react'
import { SERVICES_DATA } from './data/servicesData'
import { TASK_PRESETS } from './data/taskPresets'
import { applyFilters, getFutureCount, presetMatchesFilters } from './utils/filtering'
import { scoreService } from './utils/scoring'
import { runSelfTests } from './utils/selfTests'
import FiltersPanel from './components/FiltersPanel'
import ServiceList from './components/ServiceList'
import ServiceDetails from './components/ServiceDetails'
import { IconBeaker, IconRefresh } from './components/Icon'

export default function App() {
  const [state, setState] = useState({ selectedFilters: {}, search: '', group: '', confidence: '', russianOnly: true })
  const [manualPreset, setManualPreset] = useState('all')
  const [selectedId, setSelectedId] = useState('speech2text')
  const [showTests, setShowTests] = useState(false)
  const [note, setNote] = useState('')
  const [savedMsg, setSavedMsg] = useState('')
  const [clicks, setClicks] = useState({})

  const filtered = useMemo(() => applyFilters(SERVICES_DATA, state).map((s) => ({ ...s, score: scoreService(s, state.selectedFilters) })).sort((a, b) => b.score - a.score), [state])
  const selectedService = filtered.find((s) => s.id === selectedId) || filtered[0]
  const activePreset = TASK_PRESETS.find((p) => presetMatchesFilters(p.filters, state.selectedFilters))?.id || manualPreset

  return <main className='min-h-screen bg-slate-50 text-slate-900 p-4'><div className='max-w-7xl mx-auto space-y-4'><header className='bg-white p-4 rounded-xl border'><h1 className='text-2xl font-bold'>Transcription Service Finder MVP</h1><p className='text-sm mt-1'>Подбор сервисов транскрибации с фильтрами, скорингом и реферальной монетизацией.</p><div className='flex gap-2 mt-3'><button className='px-3 py-2 rounded bg-slate-800 text-white flex items-center gap-2' onClick={()=>alert('Демо: данные обновляются вручную')}><IconRefresh/>Обновить данные</button><button className='px-3 py-2 rounded bg-indigo-600 text-white flex items-center gap-2' onClick={()=>setShowTests(v=>!v)}><IconBeaker/>Показать self-tests</button></div><p className='text-xs mt-2 text-slate-600'>Цены, лимиты и условия партнёрских программ могут меняться. Перед оплатой проверяйте условия на официальном сайте сервиса. Часть ссылок может быть партнёрской, владелец каталога может получать вознаграждение.</p></header>
  {showTests&&<section className='bg-white p-4 border rounded-xl'>{runSelfTests(SERVICES_DATA).map((t)=><div key={t.name} className={t.pass?'text-emerald-700':'text-red-700'}>{t.pass?'✅':'❌'} {t.name}</div>)}</section>}
  <FiltersPanel state={state} setState={(updater)=>{setManualPreset('custom');setState(updater)}} presets={TASK_PRESETS} activePreset={activePreset} onApplyPreset={(p)=>{setManualPreset(p.id);setState(s=>({...s,selectedFilters:p.filters}))}} getCount={(k,o)=>getFutureCount(SERVICES_DATA,state,k,o)} groups={[...new Set(SERVICES_DATA.map(s=>s.group))]} confidenceLevels={[...new Set(SERVICES_DATA.map(s=>s.confidence))]} />
  <div className='grid lg:grid-cols-2 gap-4'><ServiceList services={filtered} selectedId={selectedService?.id} onSelect={setSelectedId}/><ServiceDetails service={selectedService} clicks={clicks} onClickCta={(id,label)=>setClicks(c=>({...c,[id]:{...(c[id]||{}),[label]:((c[id]||{})[label]||0)+1}}))} note={note} setNote={setNote} saveNote={()=>{setSavedMsg('Замечание сохранено в демо-режиме. В рабочей версии уйдёт в таблицу/CRM');setNote('')}} /></div>{savedMsg&&<div className='text-sm text-emerald-700'>{savedMsg}</div>}
  </div></main>
}
