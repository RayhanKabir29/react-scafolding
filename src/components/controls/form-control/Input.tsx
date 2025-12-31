import { Input } from "antd";
import type { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import get from "lodash.get";

interface InputProps {
  name: string;
  type?: string;
  defaultValue?: string;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
  msg?: string;
  size?: "small" | "middle" | "large";
  toUppercase?: boolean;
  onChangeField?: (value: string) => void;
  offCopyPaste?: boolean;
  allowClear?: boolean;
}

export const InputControl: FC<InputProps> = ({
  name,
  type = "text",
  defaultValue = "",
  disabled = false,
  placeholder = "",
  className = "",
  msg,
  size = "middle",
  toUppercase = false,
  onChangeField,
  offCopyPaste = false,
  allowClear = false,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const error = get(errors, name);
  const errorMsg = msg || (typeof error?.message === "string" ? error.message : undefined);

  return (
    <div>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field }) => (
          <Input
            {...field}
            type={type}
            size={size}
            allowClear={allowClear}
            disabled={disabled}
            placeholder={placeholder}
            className={className}
            status={errorMsg ? "error" : undefined}
            onChange={(e) => {
              let value = e.target.value;

              if (toUppercase) {
                value = value.toUpperCase();
              }

              field.onChange(value);
              onChangeField?.(value);
            }}
            onPaste={(e) => offCopyPaste && e.preventDefault()}
            onCopy={(e) => offCopyPaste && e.preventDefault()}
          />
        )}
      />

      {errorMsg && (
        <div style={{ color: "#ff4d4f", fontSize: 12, marginTop: 4 }}>
          {errorMsg}
        </div>
      )}
    </div>
  );
};


