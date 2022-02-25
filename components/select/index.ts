export { default as SelectBox } from "./SelectBox";
export { default as SelectCheckBox } from "./SelectCheckBox";

export type SelectProps = {
  type: "Platform" | "Category" | "Sort-by";
  typeList: readonly string[];
  onChangeHandler: (values: string | string[]) => void;
};
