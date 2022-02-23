import { HTMLAttributes } from "react";
import classes from "./Button.module.scss";

const Button = ({
  children,
}: HTMLAttributes<HTMLButtonElement>): JSX.Element => {
  return <button className={classes.button}>{children}</button>;
};

export default Button;
