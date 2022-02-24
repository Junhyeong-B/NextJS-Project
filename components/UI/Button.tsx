import { HTMLAttributes } from "react";
import classes from "./Button.module.scss";

const Button = ({
  children,
  ...props
}: HTMLAttributes<HTMLButtonElement>): JSX.Element => {
  return (
    <button className={classes.button} {...props}>
      {children}
    </button>
  );
};

export default Button;
