import { ChevronDown } from "lucide-react";

export function SelectField({
  value,
  onChange,
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={onChange}
        {...props}
        className="h-11 w-full appearance-none border border-input bg-card px-3 pr-10 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-ring/20"
      >
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-3.5 size-4 text-muted-foreground" />
    </div>
  );
}
