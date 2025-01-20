import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

export default function Options({
  id,
  inputLabel,
  name,
  defaultValue,
  options,
  disabled,
}: {
  id: string;
  inputLabel?: string;
  name: string;
  defaultValue: string;
  options: { label: string; value: string }[];
  disabled?: boolean;
}) {
  return (
    <>
      <InputLabel>{inputLabel}</InputLabel>
      <Select
        id={id}
        name={name}
        defaultValue={defaultValue}
        fullWidth
        disabled={disabled}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </>
  );
}
