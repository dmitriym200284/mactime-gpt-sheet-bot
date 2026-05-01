import { FILTER_DEFINITIONS } from '../data/filterDefinitions'

export const normalizeFilters = (filters = {}) => Object.fromEntries(FILTER_DEFINITIONS.map(({ key }) => [key, [...(filters[key] || [])].sort()]))
export const presetMatchesFilters = (a, b) => JSON.stringify(normalizeFilters(a)) === JSON.stringify(normalizeFilters(b))

export function serviceMatchesFilters(service, selectedFilters) {
  return FILTER_DEFINITIONS.every(({ key }) => {
    const active = selectedFilters[key] || []
    if (!active.length) return true
    const values = service.filters[key] || []
    return active.some((value) => values.includes(value))
  })
}

export function applyFilters(services, { selectedFilters, search, group, confidence, russianOnly }) {
  const q = search.trim().toLowerCase()
  const includesNotForRussian = (selectedFilters.verification || []).includes('notForRussian')
  return services.filter((s) => {
    if (group && s.group !== group) return false
    if (confidence && s.confidence !== confidence) return false
    if (russianOnly && !includesNotForRussian && s.russian !== 'Да') return false
    if (q) {
      const hay = JSON.stringify(s).toLowerCase()
      if (!hay.includes(q)) return false
    }
    return serviceMatchesFilters(s, selectedFilters)
  })
}

export function getFutureCount(services, state, key, option) {
  const next = { ...state.selectedFilters, [key]: [...new Set([...(state.selectedFilters[key] || []), option])] }
  return applyFilters(services, { ...state, selectedFilters: next }).length
}
