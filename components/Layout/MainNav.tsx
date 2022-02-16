import Link from "next/link";
import classes from "./MainNav.module.scss";

const MainNav = (): JSX.Element => {
  return (
    <header className={classes.header}>
      <h1>Free To Game List</h1>
      <nav>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/">Search</Link>
          </li>
          <li>
            <Link href="/">Login</Link>
          </li>
          <li>
            <button>Logout</button>
          </li>
        </ul>
      </nav>
    </header>
  );
};
export default MainNav;
