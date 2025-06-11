import { useState } from "react";
import DateInputControlled from "./DateInputControlled";

export interface DateInputUncontrolledProps {
  defaultValue?: string;
  onChange?: (val: string) => void;
  formSubmitted?: boolean;
}

export const DateInputUncontrolled = ({ defaultValue = "", onChange, formSubmitted }: DateInputUncontrolledProps) => {
  const [value, setValue] = useState(defaultValue);

  return (
    <DateInputControlled
      value={value}
      onChange={(val) => {
        setValue(val);
        onChange?.(val);
      }}
      formSubmitted={formSubmitted}
    />
  );
}; 