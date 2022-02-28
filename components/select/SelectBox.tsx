import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useState } from "react";
import { SelectProps } from ".";
import classes from "./Select.module.scss";

const SelectBox = ({
  type,
  typeList,
  onChangeHandler,
}: SelectProps): JSX.Element => {
  const [value, setValue] = useState<string>("");

  const handleChange = (event: SelectChangeEvent<any>) => {
    setValue(event.target.value);
    onChangeHandler && onChangeHandler(event.target.value);
  };

  return (
    <div className={classes.container}>
      <FormControl sx={{ width: 300 }}>
        <InputLabel id={type}>{type}</InputLabel>
        <Select
          labelId={type}
          id={type}
          value={value}
          label={value}
          onChange={handleChange}
        >
          {typeList.map((type) => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default SelectBox;
