export function getRiskLabel(score) {
  if (score <= 40) return 'Low'
  if (score <= 70) return 'Medium'
  return 'High'
}
