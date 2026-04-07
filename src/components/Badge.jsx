export default function Badge({ children, color = 'bg-brand-mist text-brand-blue' }) {
  return <span className={`rounded-full px-3 py-1 text-xs font-semibold ${color}`}>{children}</span>
}
