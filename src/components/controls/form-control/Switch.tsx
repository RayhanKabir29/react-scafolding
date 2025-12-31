import { Switch } from "antd";
import type { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import get from "lodash.get";

interface SwitchControlProps {
  name: string;
  defaultValue?: boolean;
  disabled?: boolean;
  className?: string;
  msg?: string;
  checkedLabel?: string;
  uncheckedLabel?: string;
}

export const SwitchControl: FC<SwitchControlProps> = ({
  name,
  defaultValue = false,
  disabled = false,
  className = "",
  msg,
  checkedLabel,
  uncheckedLabel,
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
          <Switch
            {...field}
            checked={field.value}
            disabled={disabled}
            className={className}
            checkedChildren={checkedLabel}
            unCheckedChildren={uncheckedLabel}
            onChange={(checked) => field.onChange(checked)}
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


