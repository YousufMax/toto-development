import React from 'react';
import Link from 'next/link';
import { clsx } from 'clsx';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  external?: boolean;
  arrow?: 'right' | 'up-right' | 'none';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  href,
  external = false,
  arrow = 'none',
  className,
  children,
  ...props
}) => {
  const baseClasses =
    'relative inline-flex items-center justify-center font-bold tracking-tight rounded-full transition-all duration-300 active:scale-95 select-none group cursor-pointer';

  const sizeClasses = {
    sm: 'px-4 py-2 text-xs gap-1.5',
    md: 'px-6 py-3 text-sm gap-2',
    lg: 'px-8 py-4 text-base gap-2.5',
  }[size];

  const variantClasses = {
    primary:
      'brand-glow-button text-[#041608] hover:-translate-y-0.5 border border-[#00FC43]/60 shadow-[0_0_25px_rgba(0,252,67,0.45)] hover:shadow-[0_0_38px_rgba(0,252,67,0.7)]',
    secondary:
      'btn-shimmer bg-white/5 border border-white/15 text-white hover:text-[#00FC43] hover:border-[#00FC43]/60 hover:bg-[#00FC43]/10 backdrop-blur-md',
    ghost:
      'text-neutral-300 hover:text-[#00FC43] hover:bg-white/5 border border-transparent hover:border-white/10',
    outline:
      'border border-[#00FC43]/40 text-[#00FC43] hover:bg-[#00FC43] hover:text-[#041608] shadow-[0_0_15px_rgba(0,252,67,0.15)] hover:shadow-[0_0_30px_rgba(0,252,67,0.5)]',
  }[variant];

  const arrowIcon = arrow === 'right' ? (
    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
  ) : arrow === 'up-right' ? (
    <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
  ) : null;

  const content = (
    <>
      <span className="relative z-10">{children}</span>
      {arrowIcon && <span className="relative z-10 shrink-0">{arrowIcon}</span>}
    </>
  );

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={clsx(baseClasses, sizeClasses, variantClasses, className)}
        >
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={clsx(baseClasses, sizeClasses, variantClasses, className)}>
        {content}
      </Link>
    );
  }

  return (
    <button className={clsx(baseClasses, sizeClasses, variantClasses, className)} {...props}>
      {content}
    </button>
  );
};
