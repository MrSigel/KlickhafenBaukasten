import Link from "next/link";
import type { ReactNode } from "react";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  onClick?: () => void;
};

export function ButtonLink({ href, children, variant = "primary", className = "", onClick }: ButtonLinkProps) {
  const variants = {
    primary: "bg-cyan-700 text-white shadow-sm hover:bg-cyan-800",
    secondary: "border border-slate-300 bg-white text-slate-950 hover:border-cyan-700 hover:text-cyan-800",
    ghost: "text-cyan-800 hover:bg-cyan-50",
  };

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`inline-flex min-h-12 items-center justify-center rounded-md px-5 py-3 text-sm font-semibold transition ${variants[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
