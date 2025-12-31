/* eslint-disable @typescript-eslint/no-explicit-any */
import { DatePicker } from "antd";
import type { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import get from "lodash.get";
import dayjs from "dayjs";

interface DatePickerControlProps {
  name: string;
  range?: boolean;
  disabled?: boolean;
  className?: string;
  msg?: string;
  format?: string;
}

export const DatePickerControl: FC<DatePickerControlProps> = ({
  name,
  range = false,
  disabled = false,
  className = "",
  msg,
  format = "YYYY-MM-DD",
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const error = get(errors, name);
   const errorMsg =
     msg || (typeof error?.message === "string" ? error.message : undefined);
  const Component = range ? DatePicker.RangePicker : DatePicker;

  return (
    <div>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Component
            {...field}
            className={className}
            disabled={disabled}
            format={format}
            value={
              range
                ? field.value?.map((d: string) => dayjs(d))
                : field.value
                ? dayjs(field.value)
                : null
            }
            onChange={(value: any) => {
              if (!value) {
                field.onChange(null);
                return;
              }

              const result = Array.isArray(value)
                ? value.map((d) => d.format(format))
                : value.format(format);

              field.onChange(result);
            }}
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

export default DatePickerControl;
