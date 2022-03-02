import { NextPage } from "next";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFavoriteLists } from "../../apis";
import { GameProps, SearchResultGame } from "../../components";
import {
  AuthType,
  gameActions,
  StoredKeyAndIdType,
  StoreGameType,
} from "../../store";
import classes from "../../styles/Favorite.module.scss";

const FavoritePage: NextPage = () => {
  const [gameLists, setGameLists] = useState<GameProps[]>([]);
  const { token, userEmail } = useSelector(
    (state: { auth: AuthType }) => state.auth
  );
  const { storedKeyAndId } = useSelector(
    (state: { game: StoreGameType }) => state.game
  );
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const getFavoriteGameLists = async (token: string, userEmail: string) => {
    try {
      const result = await fetchFavoriteLists
        .get(`/${userEmail.replace(/\./g, "")}/games.json?auth=${token}`)
        .then((response) => response.data);

      setGameLists(Object.values(result).map((data: any) => data.data));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!token || !userEmail) {
      return;
    }

    getFavoriteGameLists(token, userEmail);
  }, [token, userEmail]);

  const handleClickGame = async (
    event: React.MouseEvent<HTMLDivElement>,
    game: GameProps
  ) => {
    const target = event.target as HTMLElement;
    const element = target.closest("div") as HTMLDivElement;
    if (!element.className.includes("like")) {
      router.push("/" + game.id);
      return;
    }

    const clickedGame: StoredKeyAndIdType = storedKeyAndId.filter(
      (value) => value.id === game.id
    )[0];

    await fetchFavoriteLists.delete(
      `/${userEmail.replace(/\./g, "")}/games/${
        clickedGame.key
      }.json?auth=${token}`
    );

    enqueueSnackbar(`${game.title} 게임이 즐겨찾기에서 제거되었습니다.`, {
      variant: "error",
    });
    dispatch(gameActions.deleteGameFromFavoriteLists(game.id));
    setGameLists((prevState) => {
      const newLists = prevState.filter(
        (currentGame) => currentGame.id !== game.id
      );
      return newLists;
    });
  };

  return (
    <div className={classes.container}>
      {!!gameLists.length ? (
        <Fragment>
          <h3 className={classes.h3}>🎮 즐겨찾기 목록 🎮</h3>
          {gameLists.map((game) => (
            <SearchResultGame
              game={game}
              key={game.id}
              onClick={(event: React.MouseEvent<HTMLDivElement>) =>
                handleClickGame(event, game)
              }
              isFavorite={true}
            />
          ))}
        </Fragment>
      ) : (
        <h3 className={classes.h3}>즐겨찾기 목록에 게임이 없습니다.</h3>
      )}
    </div>
  );
};

export default FavoritePage;
