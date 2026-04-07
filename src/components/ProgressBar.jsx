export default function ProgressBar({ value }) {
  return (
    <div className="h-2.5 w-full rounded-full bg-slate-200">
      <div
        className="h-2.5 rounded-full bg-gradient-to-r from-brand-teal to-brand-blue transition-all duration-500"
        style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
      />
    </div>
  )
}
