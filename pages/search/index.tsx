import { NextPage } from "next";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { customAxios } from "../../apis";
import {
  GameProps,
  SearchResultGame,
  SelectBox,
  SelectCheckBox,
} from "../../components";
import { PLATFORMS, SORTBY, TAGS } from "../../constants";
import { gameActions, StoreGameType } from "../../store";
import classes from "../../styles/search.module.scss";

const SearchPage: NextPage = () => {
  const [platform, setPlatform] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>("");
  const [searchResults, setSearchResults] = useState<GameProps[]>([]);
  const { searchGameLists, searchOptions } = useSelector(
    (state: { game: StoreGameType }) => state.game
  );
  const dispatch = useDispatch();
  const router = useRouter();

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

      setSearchResults(result);
      dispatch(gameActions.setSearchGameLists(result));
      dispatch(
        gameActions.setSearchOptions({
          platform,
          category: tags,
          sortBy,
        })
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleClickGame = (id: number) => {
    router.push("/" + id);
  };

  useEffect(() => {
    if (searchGameLists.length) {
      setSearchResults(searchGameLists);
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

  return (
    <div className={classes.container}>
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
        {searchResults.length &&
          searchResults.map((game) => (
            <SearchResultGame
              game={game}
              key={game.id}
              onClick={() => handleClickGame(game.id)}
            />
          ))}
      </div>
    </div>
  );
};

export default SearchPage;
