import Link from "next/link";
import { useRouter } from "next/router";
import classes from "./MainNav.module.scss";

const MainNav = (): JSX.Element => {
  const router = useRouter();

  return (
    <header className={classes.header}>
      <h1>Free To Game List</h1>
      <nav>
        <ul>
          <li className={`${router.pathname === "/" && classes.current_page}`}>
            <Link href="/">Home</Link>
          </li>
          <li
            className={`${
              router.pathname === "/search" && classes.current_page
            }`}
          >
            <Link href="/search">Search</Link>
          </li>
          <li
            className={`${
              router.pathname === "/login" && classes.current_page
            }`}
          >
            <Link href="/login">Login</Link>
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
