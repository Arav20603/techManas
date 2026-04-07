const styles = {
  primary:
    'bg-gradient-to-r from-brand-blue to-brand-teal text-white shadow-soft hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue',
  secondary:
    'bg-white text-brand-blue border border-brand-blue/30 hover:bg-brand-mist focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue',
  danger:
    'bg-gradient-to-r from-brand-coral to-orange-500 text-white shadow-soft hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-coral',
}

export default function Button({ variant = 'primary', className = '', ...props }) {
  return (
    <button
      className={`rounded-xl px-4 py-3 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 ${styles[variant]} ${className}`}
      {...props}
    />
  )
}
