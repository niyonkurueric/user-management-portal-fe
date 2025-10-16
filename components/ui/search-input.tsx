"use client";

import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  clearable?: boolean;
}

export function SearchInput({ className, clearable = true, ...props }: SearchInputProps) {
  return (
    <div className={cn("relative w-full", className)}>
      <input
        {...props}
        className={cn(
          "w-full rounded-md border bg-transparent px-3 py-1 pr-9 text-sm placeholder:text-muted-foreground",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
          className
        )}
      />

      {clearable && props.value ? (
        <button
          type="button"
          aria-label="Clear"
          onClick={(e) => {
            e.preventDefault();
            const onChange = props.onChange as React.ChangeEventHandler<HTMLInputElement> | undefined;
            if (onChange) {
              // create a temporary input to build an event with target.value = ''
              const tmp = document.createElement("input");
              tmp.value = "";
              const event = new Event("input", { bubbles: true }) as unknown as React.ChangeEvent<HTMLInputElement>;
              Object.defineProperty(event, "target", { writable: true, value: tmp });
              onChange(event);
            }
          }}
          className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex h-6 w-6 items-center justify-center rounded-full text-gray-500 hover:bg-gray-100"
        >
          <X className="w-3 h-3" />
        </button>
      ) : null}
    </div>
  );
}

export default SearchInput;
