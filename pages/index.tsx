import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { customAxios } from "../apis";
import { Game, GameProps } from "../components";
import classes from "../styles/home.module.scss";
import { shuffle } from "../utils";

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
      <Head>
        <title>Free to Game List</title>
      </Head>
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
      games: shuffle(result),
    },
  };
}
