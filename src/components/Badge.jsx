export default function Badge({ children, color = 'bg-brand-mist text-brand-blue' }) {
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold tracking-wide ${color}`}>
      {children}
    </span>
  )
}
