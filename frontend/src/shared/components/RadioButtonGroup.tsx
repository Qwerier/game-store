import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { ChangeEvent } from "react";

type Props = {
  options: { value: string; label: string }[];
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  selectedValue: string;
};
export default function RadioButtonGroup({
  options,
  onChange,
  selectedValue,
}: Props) {
  return (
    <FormControl>
      <RadioGroup
        onChange={onChange}
        value={selectedValue}
        sx={{my: 0}}
      >
        {options.map(({ value, label }) => (
          <FormControlLabel
            key={label}
            control={<Radio sx={{ py: 0.6 }} />}
            label={label}
            value={value}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}
