const clamp = (v,min,max)=>Math.max(min,Math.min(max,v))

export function scoreService(service, selectedFilters = {}) {
  let score = 50
  const commercial = service.filters.commercial || []
  const features = service.filters.features || []
  const channels = service.filters.channels || []
  const verification = service.filters.verification || []
  if (service.russian === 'Да') score += 20
  if (commercial.includes('freePlan')) score += 10
  if (commercial.includes('recurringFree')) score += 8
  if (commercial.includes('affiliate')) score += 15
  if (commercial.includes('highAffiliate')) score += 20
  if (features.includes('speakerDiarization')) score += 6
  if (features.includes('aiSummary')) score += 5
  if (channels.includes('fileUpload')) score += 5
  if (channels.includes('publicUrlImport')) score += 5
  if (service.confidence.includes('Высок')) score += 10
  Object.values(selectedFilters).flat().forEach((filter) => {
    if (Object.values(service.filters).some((arr) => arr.includes(filter))) score += 7
  })
  if (verification.includes('conflict')) score -= 15
  if (verification.includes('needsReview')) score -= 10
  if (verification.includes('notForRussian')) score -= 30
  if (commercial.includes('affiliate') && !service.affiliateUrl) score -= 5
  return clamp(score, 0, 100)
}
