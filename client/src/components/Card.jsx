export default function Card({ className = '', children }) {
  return (
    <div className={`rounded-2xl border border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-slate-100 p-5 shadow-soft transition-colors duration-300 ${className}`}>
      {children}
    </div>
  )
}
