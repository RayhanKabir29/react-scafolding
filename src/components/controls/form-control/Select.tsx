/* eslint-disable @typescript-eslint/no-explicit-any */
import { Select } from "antd";
import type { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import get from "lodash.get";

export interface SelectOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

interface SelectControlProps {
  name: string;
  options: SelectOption[];
  placeholder?: string;
  defaultValue?: string | number;
  disabled?: boolean;
  className?: string;
  msg?: string;
  size?: "small" | "middle" | "large";
  allowClear?: boolean;
  mode?: "multiple" | "tags";
  showSearch?: boolean;
  onChangeField?: (value: any) => void;
}

export const SelectControl: FC<SelectControlProps> = ({
  name,
  options,
  placeholder = "Select",
  defaultValue,
  disabled = false,
  className = "",
  msg,
  size = "middle",
  allowClear = false,
  mode,
  showSearch = true,
  onChangeField,
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
          <Select
            {...field}
            size={size}
            disabled={disabled}
            className={className}
            placeholder={placeholder}
            allowClear={allowClear}
            mode={mode}
            showSearch={showSearch}
            status={errorMsg ? "error" : undefined}
            options={options}
            value={field.value ?? undefined}
            onChange={(value) => {
              field.onChange(value);
              onChangeField?.(value);
            }}
            filterOption={(input, option) =>
              (option?.label ?? "")
                .toString()
                .toLowerCase()
                .includes(input.toLowerCase())
            }
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


