import { HTMLAttributes } from "react";
import { GameProps } from ".";
import Like from "../UI/Like";
import classes from "./SearchResultGame.module.scss";

const SearchResultGame = ({
  game,
  isFavorite,
  ...props
}: {
  game: GameProps;
  isFavorite: boolean;
} & HTMLAttributes<HTMLDivElement>): JSX.Element => {
  return (
    <div className={classes.container} {...props}>
      <div className={classes.image}>
        {/* eslint-disable-next-line */}
        <img src={game.thumbnail} alt={game.title} />
        <Like isFavorite={isFavorite} />
      </div>
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

export default SearchResultGame;
