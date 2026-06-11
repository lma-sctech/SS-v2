import type { ReactNode } from "react";

type CTAGroupProps = {
  children: ReactNode;
  align?: "left" | "right" | "center" | "between";
  compact?: boolean;
  className?: string;
};

const alignments = {
  left: "items-start sm:justify-start",
  right: "items-end sm:justify-end",
  center: "items-center sm:justify-center",
  between: "items-stretch sm:justify-between",
};

export function CTAGroup({ children, align = "left", compact = false, className = "" }: CTAGroupProps) {
  return (
    <div className={`flex w-full flex-col ${compact ? "gap-2" : "gap-3"} sm:w-auto sm:flex-row sm:flex-wrap ${alignments[align]} ${className}`}>
      {children}
    </div>
  );
}
