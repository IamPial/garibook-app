import React from 'react';

export default function Button({
  children,
  variant = 'primary', // 'primary' | 'warning' | 'outline' | 'ghost' | 'dark'
  size = 'md', // 'sm' | 'md' | 'lg'
  icon: Icon,
  iconPosition = 'right',
  className = '',
  disabled = false,
  loading = false,
  type = 'button',
  onClick,
  ...props
}) {
  const baseStyles =
    'inline-flex items-center justify-center font-bold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none cursor-pointer select-none';

  const variants = {
    primary:
      'bg-gb-primary hover:bg-gb-primary-dark text-white shadow-md hover:shadow-lg focus:ring-gb-primary/40 border border-transparent',
    warning:
      'bg-gb-warning hover:bg-gb-warning-hover text-slate-950 shadow-md hover:shadow-lg focus:ring-gb-warning/40 border border-transparent',
    outline:
      'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 hover:border-slate-300 shadow-sm focus:ring-slate-300',
    ghost:
      'bg-transparent hover:bg-slate-100 text-slate-700 focus:ring-slate-200',
    dark:
      'bg-slate-950 hover:bg-slate-800 text-white shadow-md hover:shadow-lg focus:ring-slate-700 border border-slate-800',
    subtle:
      'bg-gb-primary-subtle text-gb-primary hover:bg-gb-primary hover:text-white border border-gb-primary/20',
  };

  const sizes = {
    sm: 'text-xs px-3.5 py-2 gap-1.5',
    md: 'text-sm px-5 py-3 gap-2.5',
    lg: 'text-base px-7 py-3.5 gap-3',
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`}
      {...props}
    >
      {loading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        <>
          {Icon && iconPosition === 'left' && <Icon className="w-4 h-4 shrink-0" />}
          <span>{children}</span>
          {Icon && iconPosition === 'right' && <Icon className="w-4 h-4 shrink-0" />}
        </>
      )}
    </button>
  );
}
