import {
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useEffect, useState } from "react";
import { SelectProps } from ".";
import classes from "./select.module.scss";

const SelectCheckBox = ({
  type,
  typeList,
  onChangeHandler,
  currentValues,
}: SelectProps): JSX.Element => {
  const [values, setValues] = useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const { value } = event.target;
    setValues(() => {
      const checkedValue = typeof value === "string" ? value.split(",") : value;
      onChangeHandler && onChangeHandler(checkedValue);
      return checkedValue;
    });
  };

  useEffect(() => {
    if (currentValues && currentValues.length) {
      setValues(currentValues);
    }
  }, [currentValues]);

  return (
    <div className={classes.container}>
      <FormControl sx={{ width: 300 }}>
        <InputLabel id={type}>{type}</InputLabel>
        <Select
          labelId={type}
          id={type}
          multiple
          value={values}
          onChange={handleChange}
          input={<OutlinedInput label={type} />}
          renderValue={(selected) => selected.join(", ")}
        >
          {typeList.map((type) => (
            <MenuItem key={type} value={type}>
              <Checkbox checked={values.indexOf(type) > -1} />
              <ListItemText primary={type} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default SelectCheckBox;
