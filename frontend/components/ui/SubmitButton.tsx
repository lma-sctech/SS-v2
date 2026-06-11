import type { ButtonHTMLAttributes, ReactNode } from "react";

type SubmitButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

export function SubmitButton({ children, className = "", ...props }: SubmitButtonProps) {
  return (
    <button
      className={`focus-ring mt-5 flex min-h-12 w-full items-center justify-center rounded-full bg-navy px-5 py-3 text-sm font-bold leading-none text-white transition hover:bg-ink disabled:cursor-not-allowed disabled:opacity-70 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
