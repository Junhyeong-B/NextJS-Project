export { default as SelectBox } from "./select-box";
export { default as SelectCheckBox } from "./select-check-box";

export type SelectProps = {
  type: "Platform" | "Category" | "Sort-by";
  typeList: readonly string[];
  onChangeHandler: (values: string | string[]) => void;
  currentValue?: string;
  currentValues?: string[];
};
