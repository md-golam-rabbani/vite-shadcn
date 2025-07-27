"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { type FieldValues, type Path, useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { Input } from "../../ui/input";
import { RequiredSign } from "./RequiredSign";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import type { ReactNode } from "react";

type TextFieldProps<T extends FieldValues> = {
  name: Path<T>;
  label?: string;
  labelClassName?: string;
  type?: "text" | "email" | "number";
  placeholder?: string;
  required?: boolean;
  action?: () => void;
  icon?: ReactNode;
  loading?: boolean;
  className?: string;
  inputClass?: string;
  disabled?: boolean;
  iconClass?: string;
};

/**
 * A text field component.
 * @param name The name of the field.
 * @param label The label of the field.
 * @param labelClassName The class name of the label.
 * @param type The type of the field.
 * @param placeholder The placeholder of the field.
 * @param required If the field is required.
 * @param action The action to be performed on the field.
 * @param icon The icon of the field.
 * @param loading If the field is loading.
 * @param className The class name of the form item.
 * @param inputClass The class name of the input.
 * @param iconClass The class name of the
 * @param disabled If the field is disabled.
 *
 * @returns The text field component.
 *
 * @example
 * ```tsx
 * <TextField name="name" label="Name" />
 * ```
 */

export const TextField = <T extends FieldValues>({
  name,
  label,
  labelClassName,
  type = "text",
  placeholder = "Input",
  required = false,
  action,
  icon,
  loading,
  className,
  inputClass,
  iconClass,
  disabled = false,
}: TextFieldProps<T>) => {
  const { control } = useFormContext<T>();
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn(className)}>
          {label && (
            <FormLabel htmlFor={name} className={labelClassName}>
              <span>{label}</span>
              {required && <RequiredSign />}
            </FormLabel>
          )}

          <FormControl>
            <div className="relative flex items-center gap-2">
              <Input
                {...field}
                type={type}
                placeholder={placeholder ?? "Enter a value"}
                className={cn("w-full", action && "pr-12", inputClass)}
                id={name}
                disabled={disabled}
              />

              {loading && <LoadingSpinner className="absolute right-4" />}

              {!loading && !disabled && action && (
                <Button
                  variant={"ghost"}
                  size={"sm"}
                  onClick={action}
                  type="button"
                  className={cn(
                    "absolute top-1/2 right-0.5 -translate-y-1/2 text-red-500",
                    iconClass
                  )}
                >
                  {icon ? icon : <X />}
                </Button>
              )}

              {!loading && !action && icon && (
                <div
                  className={cn(
                    "absolute top-1/2 right-2 flex -translate-y-1/2 text-base",
                    iconClass
                  )}
                >
                  {icon}
                </div>
              )}
            </div>
          </FormControl>

          <FormMessage className="line-clamp-1 text-xs" />
        </FormItem>
      )}
    />
  );
};

TextField.displayName = "TextField";
