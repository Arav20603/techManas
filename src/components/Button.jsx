const styles = {
  primary: 'bg-brand-blue text-white hover:bg-brand-teal',
  secondary: 'bg-white dark:bg-slate-700 dark:text-slate-100 dark:border-slate-500 text-brand-blue border border-brand-blue hover:bg-brand-mist dark:hover:bg-slate-600',
  danger: 'bg-brand-coral text-white hover:opacity-90',
}

export default function Button({ variant = 'primary', className = '', ...props }) {
  return (
    <button
      className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition ${styles[variant]} ${className}`}
      {...props}
    />
  )
}
