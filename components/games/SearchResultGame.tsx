import { GameProps } from ".";
import classes from "./SearchResultGame.module.scss";

const SearchResultGame = (props: { game: GameProps }): JSX.Element => {
  return (
    <div className={classes.container}>
      <img src={props.game.thumbnail} alt={props.game.title} />
      <div className={classes.game}>
        <h2>
          {props.game.title}{" "}
          <span className={classes.publisher}>{props.game.publisher}</span>
        </h2>

        <div className={classes.badge_container}>
          <span className={classes.badge}>{props.game.platform}</span>
          <span className={classes.badge}>{props.game.release_date}</span>
        </div>

        <p>{props.game.short_description}</p>
      </div>
    </div>
  );
};

export default SearchResultGame;
