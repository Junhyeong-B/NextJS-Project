import { Fragment, HTMLAttributes } from "react";
import MainNav from "./MainNav";

const Layout = (props: HTMLAttributes<HTMLElement>): JSX.Element => {
  return (
    <Fragment>
      <MainNav />
      <main>{props.children}</main>
    </Fragment>
  );
};

export default Layout;
