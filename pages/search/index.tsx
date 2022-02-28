import { NextPage } from "next";
import { FormEvent, useState } from "react";
import { customAxios } from "../../apis";
import {
  GameProps,
  SearchResultGame,
  SelectBox,
  SelectCheckBox,
} from "../../components";
import { PLATFORMS, SORTBY, TAGS } from "../../constants";
import classes from "../../styles/search.module.scss";

const SearchPage: NextPage = () => {
  const [platform, setPlatform] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>("");
  const [searchResults, setSearchResults] = useState<GameProps[]>([]);

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

    if (tags.length === 0) {
      const result = await customAxios
        .get("/api/games", {
          params: {
            platform: !platform ? "all" : platform,
            "sort-by": !sortBy ? "release-date" : sortBy,
          },
        })
        .then((response) => response.data);
      setSearchResults(result);
    } else if (tags.length === 1) {
      const result = await customAxios
        .get("/api/games", {
          params: {
            platform: !platform ? "all" : platform,
            category: tags[0],
            "sort-by": !sortBy ? "release-date" : sortBy,
          },
        })
        .then((response) => response.data);
      setSearchResults(result);
    } else {
      const result = await customAxios
        .get("/api/games", {
          params: {
            platform: !platform ? "all" : platform,
            tag: tags.join("."),
            "sort-by": !sortBy ? "release-date" : sortBy,
          },
        })
        .then((response) => response.data);
      setSearchResults(result);
    }
  };

  return (
    <div className={classes.container}>
      <form onSubmit={handleSubmit} className={classes.form}>
        <SelectBox
          type="Platform"
          typeList={PLATFORMS}
          onChangeHandler={onPlatformChange}
        />
        <SelectCheckBox
          type="Category"
          typeList={TAGS}
          onChangeHandler={onTagsChange}
        />
        <SelectBox
          type="Sort-by"
          typeList={SORTBY}
          onChangeHandler={onSortByChange}
        />
        <button type="submit" className={classes.search_button}>
          Search
        </button>
      </form>
      <div className={classes.results_container}>
        {searchResults.length &&
          searchResults.map((game) => (
            <SearchResultGame game={game} key={game.id} />
          ))}
      </div>
    </div>
  );
};

export default SearchPage;
