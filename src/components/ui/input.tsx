import { cn } from "@/lib/utils/cn";
import { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1 w-full">
        
        {label && (
          <label className="text-sm font-medium text-gray-700">
            {label}
            {props.required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        <input
          ref={ref}
          className={cn(
            "border rounded-lg px-3 py-2 text-sm w-full outline-none transition-all duration-200",
            "placeholder:text-gray-400",
            "border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent",
            error && "border-red-500 focus:ring-red-500",
            props.disabled && "bg-gray-50 cursor-not-allowed text-gray-400",
            className
          )}
          {...props}
        />

        {error && (
          <p className="text-xs text-red-500 flex items-center gap-1">
            <span>⚠</span> {error}
          </p>
        )}

        {helperText && !error && (
          <p className="text-xs text-gray-400">{helperText}</p>
        )}

      </div>
    );
  }
);
Input.displayName = "Input";