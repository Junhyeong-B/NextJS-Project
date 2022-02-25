import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authActions, AuthType } from "../../store";
import { AUTH_STORAGE_KEY } from "../../store/auth";
import classes from "./MainNav.module.scss";

const MainNav = (): JSX.Element => {
  const router = useRouter();
  const isLoggedIn = useSelector(
    (state: { auth: AuthType }) => state.auth.isLoggedIn
  );
  const dispatch = useDispatch();

  const logoutHandler = () => {
    alert("로그아웃 되었습니다.");
    dispatch(authActions.logout());
  };

  useEffect(() => {
    const idToken = localStorage.getItem(AUTH_STORAGE_KEY);
    if (idToken) {
      dispatch(authActions.login({ idToken }));
    }
  }, [dispatch]);

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
          {!isLoggedIn && (
            <li
              className={`${
                router.pathname === "/login" && classes.current_page
              }`}
            >
              <Link href="/login">Login</Link>
            </li>
          )}
          {isLoggedIn && (
            <Fragment>
              <li
                className={`${
                  router.pathname === "/mypage" && classes.current_page
                }`}
              >
                <Link href="/mypage">My Page</Link>
              </li>
              <li>
                <button onClick={logoutHandler}>Logout</button>
              </li>
            </Fragment>
          )}
        </ul>
      </nav>
    </header>
  );
};
export default MainNav;
