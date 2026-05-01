import { TASK_PRESETS } from '../data/taskPresets'
import { applyFilters, presetMatchesFilters } from './filtering'
import { scoreService } from './scoring'

const has = (list, id) => list.some((s) => s.id === id)

export function runSelfTests(services) {
  const tests = []
  tests.push(['Без фильтров показывает все сервисы', applyFilters(services, { selectedFilters: {}, search: '', group: '', confidence: '', russianOnly: false }).length === services.length])
  tests.push(['Фильтр партнёрки', applyFilters(services, { selectedFilters: { commercial: ['affiliate'] }, search: '', group: '', confidence: '', russianOnly: false }).every((s) => s.filters.commercial.includes('affiliate'))])
  tests.push(['Пресет диалогов находит Speech2Text', has(applyFilters(services, { selectedFilters: TASK_PRESETS[1].filters, search: '', group: '', confidence: '', russianOnly: true }), 'speech2text')])
  tests.push(['Фильтр ссылок находит несколько', applyFilters(services, { selectedFilters: { channels: ['publicUrlImport', 'videoLinks'] }, search: '', group: '', confidence: '', russianOnly: false }).length > 1])
  tests.push(['Пресет fileUpload only', applyFilters(services, { selectedFilters: TASK_PRESETS[2].filters, search: '', group: '', confidence: '', russianOnly: false }).every((s) => s.filters.channels.includes('fileUpload'))])
  tests.push(['highAffiliate находит speech2text и voicee', ['speech2text', 'voicee'].every((id) => has(applyFilters(services, { selectedFilters: { commercial: ['highAffiliate'] }, search: '', group: '', confidence: '', russianOnly: false }), id))])
  tests.push(['Русский режим исключает Otter', !has(applyFilters(services, { selectedFilters: {}, search: '', group: '', confidence: '', russianOnly: true }), 'otter')])
  tests.push(['notForRussian показывает Otter при русском режиме', has(applyFilters(services, { selectedFilters: { verification: ['notForRussian'] }, search: '', group: '', confidence: '', russianOnly: true }), 'otter')])
  tests.push(['Сравнение пресета не зависит от порядка', presetMatchesFilters({ scenarios: ['subtitles', 'videoLessons'], channels: ['videoLinks', 'publicUrlImport'] }, TASK_PRESETS[3].filters)])
  tests.push(['У сервисов с партнёркой есть partnerUrl или affiliateUrl', services.filter((s) => s.filters.commercial.includes('affiliate')).every((s) => Boolean(s.partnerUrl || s.affiliateUrl))])
  const sp = services.find((s) => s.id === 'speech2text')
  const ot = services.find((s) => s.id === 'otter')
  tests.push(['Скоринг Speech2Text выше Otter для русского режима', scoreService(sp, {}) > scoreService(ot, {})])
  return tests.map(([name, pass]) => ({ name, pass }))
}
