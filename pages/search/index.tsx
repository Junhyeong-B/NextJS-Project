import { Stack, Pagination } from "@mui/material";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { customAxios, fetchFavoriteLists } from "../../apis";
import {
  GameProps,
  SearchResultGame,
  SelectBox,
  SelectCheckBox,
} from "../../components";
import { PLATFORMS, SORTBY, TAGS } from "../../constants";
import {
  AuthType,
  gameActions,
  StoreGameType,
  StoredKeyAndIdType,
} from "../../store";
import classes from "../../styles/Search.module.scss";

const SearchPage: NextPage = () => {
  const [platform, setPlatform] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>("");
  const [searchResults, setSearchResults] = useState<GameProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    searchGameLists,
    searchOptions,
    storedKeyAndId,
    currentPage,
    maxPage,
  } = useSelector((state: { game: StoreGameType }) => state.game);
  const dispatch = useDispatch();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const favoriteLists = useSelector(
    (state: { game: StoreGameType }) => state.game.favoriteLists
  );
  const { token, userEmail } = useSelector(
    (state: { auth: AuthType }) => state.auth
  );
  const favoriteListsSet = useRef<Set<number>>(new Set<number>());

  const onPlatformChange = (value: string | string[]) => {
    setPlatform(value as string);
  };

  const onTagsChange = (value: string | string[]) => {
    setTags(value as string[]);
  };

  const onSortByChange = (value: string | string[]) => {
    setSortBy(value as string);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    let params: {
      platform: string;
      category?: string;
      tag?: string;
      "sort-by": string;
    };

    if (tags.length === 0) {
      params = {
        platform: !platform ? "all" : platform,
        "sort-by": !sortBy ? "release-date" : sortBy,
      };
    } else if (tags.length === 1) {
      params = {
        platform: !platform ? "all" : platform,
        category: tags[0],
        "sort-by": !sortBy ? "release-date" : sortBy,
      };
    } else {
      params = {
        platform: !platform ? "all" : platform,
        tag: tags.join("."),
        "sort-by": !sortBy ? "release-date" : sortBy,
      };
    }

    try {
      const result = await customAxios
        .get("/api/games", { params })
        .then((response) => response.data);

      const firstPageGames = result.filter((_: GameProps, i: number) => i < 10);

      setSearchResults(firstPageGames);
      dispatch(gameActions.setSearchGameLists(result));
      dispatch(
        gameActions.setSearchOptions({
          platform,
          category: tags,
          sortBy,
        })
      );
      dispatch(gameActions.movePage(1));
      dispatch(gameActions.updateMaxPage(Math.ceil(result.length / 10)));
    } catch (error) {
      console.error(error);
    }
  };

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

    if (!token) {
      enqueueSnackbar("로그인 후 이용할 수 있는 기능입니다.", {
        variant: "info",
      });
      return;
    }

    if (isLoading) {
      return;
    }

    setIsLoading(true);

    if (favoriteListsSet.current.has(game.id)) {
      const clickedGame: StoredKeyAndIdType = storedKeyAndId.filter(
        (value) => value.id === game.id
      )[0];

      try {
        await fetchFavoriteLists.delete(
          `/${userEmail.replace(/\./g, "")}/games/${
            clickedGame.key
          }.json?auth=${token}`
        );

        enqueueSnackbar(`${game.title} 게임이 즐겨찾기에서 제거되었습니다.`, {
          variant: "error",
        });
        dispatch(gameActions.deleteGameFromFavoriteLists(game.id));
      } catch (error) {
        console.error(error);
      }
      setIsLoading(false);
      return;
    }

    try {
      const result = await fetchFavoriteLists.post(
        `/${userEmail.replace(/\./g, "")}/games.json?auth=${token}`,
        {
          data: game,
        }
      );

      enqueueSnackbar(`'${game.title}' 게임이 즐겨찾기에 추가되었습니다.`, {
        variant: "success",
      });
      dispatch(gameActions.addFavoriteLists(game.id));
      dispatch(
        gameActions.addStoredKey({ key: result.data.name, id: game.id })
      );
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (searchGameLists.length && currentPage > 0) {
      const currentPageGameLists = searchGameLists.filter(
        (_, i: number) =>
          (currentPage - 1) * 10 <= i && i + 1 <= currentPage * 10
      );
      setSearchResults(currentPageGameLists);
    }

    if (searchOptions.platform) {
      setPlatform(searchOptions.platform);
    }

    if (searchOptions.category.length) {
      setTags(searchOptions.category);
    }

    if (searchOptions.sortBy) {
      setSortBy(searchOptions.sortBy);
    }

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    favoriteListsSet.current = new Set(favoriteLists);
  }, [favoriteLists]);

  const handleChange = (_: unknown, value: number) => {
    const newLists = searchGameLists.filter(
      (_, i: number) => (value - 1) * 10 <= i && i + 1 <= value * 10
    );
    dispatch(gameActions.movePage(value));
    setSearchResults(newLists);
  };

  return (
    <div className={classes.container}>
      <Head>
        <title>Free to Game List | Search</title>
      </Head>
      <form onSubmit={handleSubmit} className={classes.form}>
        <SelectBox
          type="Platform"
          typeList={PLATFORMS}
          onChangeHandler={onPlatformChange}
          currentValue={platform}
        />
        <SelectCheckBox
          type="Category"
          typeList={TAGS}
          onChangeHandler={onTagsChange}
          currentValues={tags}
        />
        <SelectBox
          type="Sort-by"
          typeList={SORTBY}
          onChangeHandler={onSortByChange}
          currentValue={sortBy}
        />
        <button type="submit" className={classes.search_button}>
          Search
        </button>
      </form>
      <div className={classes.results_container}>
        {!!searchResults.length &&
          searchResults.map((game) => (
            <SearchResultGame
              game={game}
              key={game.id}
              onClick={(event: React.MouseEvent<HTMLDivElement>) =>
                handleClickGame(event, game)
              }
              isFavorite={favoriteListsSet.current.has(game.id)}
            />
          ))}
      </div>
      {maxPage > 0 && (
        <div className={classes.pagenation}>
          <Pagination
            count={maxPage}
            defaultPage={currentPage}
            color="primary"
            onChange={handleChange}
          />
        </div>
      )}
    </div>
  );
};

export default SearchPage;
