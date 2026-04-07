import Badge from './Badge'

export default function ScoreBadge({ score }) {
  if (score <= 40) return <Badge color="bg-emerald-100 text-emerald-700">Low Risk ({score})</Badge>
  if (score <= 70) return <Badge color="bg-amber-100 text-amber-700">Moderate Risk ({score})</Badge>
  return <Badge color="bg-rose-100 text-rose-700">High Risk ({score})</Badge>
}
