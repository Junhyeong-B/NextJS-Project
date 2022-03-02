import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFavoriteLists } from "../../apis";
import { authActions, AuthType, gameActions } from "../../store";
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

  const getFavoritLists = useCallback(
    async (token: string, userEmail: string) => {
      try {
        const result = await fetchFavoriteLists.get(
          `/${userEmail.replace(/\./g, "")}/games.json?auth=${token}`
        );
        const favoriteLists = Object.values(result.data).map(
          (game: any) => game.data.id
        );
        dispatch(gameActions.addFavoriteLists(favoriteLists));

        const storedKeyAndId = Object.entries(result.data).map((entry: any) => {
          return {
            key: entry[0],
            id: entry[1].data.id,
          };
        });
        dispatch(gameActions.addStoredKey(storedKeyAndId));
      } catch (error) {}
    },
    [dispatch]
  );

  useEffect(() => {
    const initialState = { token: "", email: "" };
    const { token, email } = JSON.parse(
      sessionStorage.getItem(AUTH_STORAGE_KEY) || JSON.stringify(initialState)
    );
    if (token && email) {
      getFavoritLists(token, email);
      dispatch(authActions.login({ idToken: token, email }));
    }
    // eslint-disable-next-line
  }, []);

  return (
    <header className={classes.header}>
      <h1 className={classes.h1}>
        <Link href="/">Free To Game List</Link>
      </h1>
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
