import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { authActions, AuthType } from "../../store";
import classes from "./MainNav.module.scss";

const MainNav = (): JSX.Element => {
  const router = useRouter();
  const token = useSelector((state: { auth: AuthType }) => state.auth.token);
  const dispatch = useDispatch();

  const logoutHandler = () => {
    alert("로그아웃 되었습니다.");
    dispatch(authActions.logout());
  };

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
          {!token && (
            <li
              className={`${
                router.pathname === "/login" && classes.current_page
              }`}
            >
              <Link href="/login">Login</Link>
            </li>
          )}
          {!!token && (
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};
export default MainNav;
