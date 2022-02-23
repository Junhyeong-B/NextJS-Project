import { NextPage } from "next";
import { useRouter } from "next/router";
import { customAxios } from "../apis";
import { Game, GameProps } from "../components";
import classes from "../styles/home.module.scss";

type HomePageProps = {
  games: GameProps[];
};

const HomePage: NextPage<HomePageProps> = (props) => {
  const router = useRouter();
  const gameClickHandler = (id: number) => {
    router.push("/" + id);
  };

  return (
    <div>
      <h1 className={classes.h1}>💻PC Live games list</h1>
      <ul className={classes.game_list}>
        {props.games.map((game, i) => {
          if (i > 5) {
            return;
          }
          return (
            <li onClick={() => gameClickHandler(game.id)} key={game.id}>
              <Game game={game} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default HomePage;

export async function getServerSideProps() {
  const response = await customAxios.get("/api/games");
  const result = await response.data.filter(
    (_: GameProps, i: number) => i < 20
  );

  return {
    props: {
      games: result,
    },
  };
}
