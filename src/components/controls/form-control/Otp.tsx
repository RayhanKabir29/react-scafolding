import { InputNumber, Input } from "antd";
import type { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import get from "lodash.get";

interface NumberInputControlProps {
  name: string;
  otp?: boolean;
  length?: number;
  disabled?: boolean;
  className?: string;
  msg?: string;
}

export const NumberInputControl: FC<NumberInputControlProps> = ({
  name,
  otp = false,
  length = 6,
  disabled = false,
  className = "",
  msg,
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
        render={({ field }) =>
          otp ? (
            <Input.OTP
              {...field}
              length={length}
              disabled={disabled}
              className={className}
              onChange={(value) => field.onChange(value)}
            />
          ) : (
            <InputNumber
              {...field}
              disabled={disabled}
              className={className}
              style={{ width: "100%" }}
              onChange={(value) => field.onChange(value)}
            />
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


