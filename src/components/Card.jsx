export default function Card({ className = '', children }) {
  return (
    <div className={`rounded-2xl bg-white dark:bg-slate-800 dark:text-slate-100 p-5 shadow-soft ${className}`}>
      {children}
    </div>
  )
}
