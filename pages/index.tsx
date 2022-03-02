import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { customAxios } from "../apis";
import { Game, GameProps } from "../components";
import classes from "../styles/Home.module.scss";
import { shuffle } from "../utils";

type HomePageProps = {
  games: GameProps[];
};

const HomePage: NextPage<HomePageProps> = ({ games }) => {
  const router = useRouter();
  const gameClickHandler = (id: number) => {
    router.push("/" + id);
  };

  return (
    <div className={classes.container}>
      <Head>
        <title>Free to Game List</title>
      </Head>
      <h1 className={classes.h1}>💻PC Live games list</h1>
      <h2 className={classes.h2}>이런 게임은 어떠세요?</h2>
      <ul className={classes.game_list}>
        {games.map((game) => (
          <li onClick={() => gameClickHandler(game.id)} key={game.id}>
            <Game game={game} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;

export async function getServerSideProps() {
  const response = await customAxios
    .get("/api/games")
    .then((data) => data.data);
  const result = shuffle(response).filter((_, i) => i < 6);

  return {
    props: {
      games: result,
    },
  };
}
