/* eslint-disable @typescript-eslint/no-explicit-any */
import { Checkbox } from "antd";
import type { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import get from "lodash.get";

export interface CheckboxOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

interface CheckboxControlProps {
  name: string;
  options?: CheckboxOption[];
  defaultValue?: boolean | (string | number)[];
  disabled?: boolean;
  className?: string;
  msg?: string;
  onChangeField?: (value: any) => void;
}

export const CheckboxControl: FC<CheckboxControlProps> = ({
  name,
  options,
  defaultValue,
  disabled = false,
  className = "",
  msg,
  onChangeField,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const error = get(errors, name);
  const errorMsg =
    msg || (typeof error?.message === "string" ? error.message : undefined);

  return (
    <div>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field }) =>
          options ? (
            <Checkbox.Group
              {...field}
              options={options}
              disabled={disabled}
              className={className}
              onChange={(value) => {
                field.onChange(value);
                onChangeField?.(value);
              }}
            />
          ) : (
            <Checkbox
              checked={!!field.value}
              disabled={disabled}
              className={className}
              onChange={(e) => {
                field.onChange(e.target.checked);
                onChangeField?.(e.target.checked);
              }}
            >
              {name}
            </Checkbox>
          )
        }
      />

      {errorMsg && (
        <div style={{ color: "#ff4d4f", fontSize: 12, marginTop: 4 }}>
          {errorMsg}
        </div>
      )}
    </div>
  );
};

