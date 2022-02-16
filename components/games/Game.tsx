import classes from "./Game.module.scss";

export type GameProps = {
  developer: string;
  freetogame_profile_url: string;
  game_url: string;
  genre: string;
  id: number;
  platform: string;
  publisher: string;
  release_date: string;
  short_description: string;
  thumbnail: string;
  title: string;
};

const Game = (props: { game: GameProps }): JSX.Element => {
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

export default Game;
