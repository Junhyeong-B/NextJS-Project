import { HTMLAttributes } from "react";
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

const Game = ({
  game,
  ...props
}: { game: GameProps } & HTMLAttributes<HTMLDivElement>): JSX.Element => {
  return (
    <div className={classes.container} {...props}>
      <img src={game.thumbnail} alt={game.title} />
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

export default Game;
