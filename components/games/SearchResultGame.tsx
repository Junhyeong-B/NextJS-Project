import React, { Fragment, HTMLAttributes } from "react";
import { useSelector } from "react-redux";
import { GameProps } from ".";
import { Like } from "..";
import { AuthType } from "../../store";
import classes from "./SearchResultGame.module.scss";

const SearchResultGame = ({
  game,
  isFavorite,
  ...props
}: {
  game: GameProps;
  isFavorite: boolean;
} & HTMLAttributes<HTMLDivElement>): JSX.Element => {
  const { isLoggedIn } = useSelector((state: { auth: AuthType }) => state.auth);

  return (
    <div className={classes.container} {...props}>
      {isLoggedIn ? (
        <div className={classes.image}>
          {/* eslint-disable-next-line */}
          <img src={game.thumbnail} alt={game.title} />
          <Like isFavorite={isFavorite} />
        </div>
      ) : (
        <Fragment>
          {/* eslint-disable-next-line */}
          <img src={game.thumbnail} alt={game.title} />
        </Fragment>
      )}
      <div className={classes.game}>
        <h2>
          {game.title}{" "}
          <span className={classes.publisher}>{game.publisher}</span>
        </h2>

        <div className={classes.badge_container}>
          <span className={classes.badge}>{game.platform}</span>
          <span className={classes.badge}>{game.release_date}</span>
        </div>

        <p>{game.short_description}</p>
      </div>
    </div>
  );
};

export default React.memo(SearchResultGame);
