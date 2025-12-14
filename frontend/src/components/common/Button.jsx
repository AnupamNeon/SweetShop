import { Loader2 } from 'lucide-react';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  className = '',
  ...props
}) {
  const variants = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    danger: 'btn-danger',
    ghost: 'text-slate-600 hover:text-teal-600 hover:bg-teal-50 rounded-lg px-4 py-2 transition-all duration-200',
  };

  const sizes = {
    sm: 'text-sm py-1.5 px-3',
    md: 'text-sm py-2.5 px-5',
    lg: 'text-base py-3 px-8',
  };

  return (
    <button
      className={`${variants[variant]} ${sizes[size]} ${className} disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 font-medium tracking-wide`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Loader2 className="w-4 h-4 animate-spin" />}
      {children}
    </button>
  );
}