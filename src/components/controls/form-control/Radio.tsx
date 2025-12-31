import { Radio } from "antd";
import type { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import get from "lodash.get";

export interface RadioOption {
  label: string;
  value: string | number | boolean;
  disabled?: boolean;
}

interface RadioControlProps {
  name: string;
  options: RadioOption[];
  defaultValue?: string | number | boolean;
  disabled?: boolean;
  className?: string;
  msg?: string;
  optionType?: "default" | "button";
  buttonStyle?: "outline" | "solid";
  onChangeField?: (value: string | number | boolean) => void;
}

export const RadioControl: FC<RadioControlProps> = ({
  name,
  options,
  defaultValue,
  disabled = false,
  className = "",
  msg,
  optionType = "default",
  buttonStyle = "outline",
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
        render={({ field }) => (
          <Radio.Group
            {...field}
            className={className}
            disabled={disabled}
            optionType={optionType}
            buttonStyle={optionType === "button" ? buttonStyle : undefined}
            onChange={(e) => {
              const value = e.target.value;
              field.onChange(value);
              onChangeField?.(value);
            }}
          >
            {options.map((option) => (
              <Radio
                key={String(option.value)}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </Radio>
            ))}
          </Radio.Group>
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


