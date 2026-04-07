import { cn } from "@/lib/utils/cn";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

export function Button({
  variant = "primary",
  size = "md",
  isLoading = false,
  className,
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled || isLoading}
      className={cn(
        "rounded-lg font-medium transition-colors duration-200 inline-flex items-center justify-center gap-2",
        variant === "primary" && "bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-300",
        variant === "secondary" && "bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50",
        variant === "danger" && "bg-red-600 text-white hover:bg-red-700 disabled:bg-red-300",
        variant === "ghost" && "text-gray-600 hover:bg-gray-100 disabled:opacity-50",
        size === "sm" && "px-3 py-1.5 text-sm",
        size === "md" && "px-4 py-2 text-sm",
        size === "lg" && "px-6 py-3 text-base",
        isLoading && "cursor-not-allowed",
        className
      )}
      {...props}
    >
      {isLoading && (
        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
      )}
      {children}
    </button>
  );
}