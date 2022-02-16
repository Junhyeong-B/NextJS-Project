import { NextPage } from "next";
import { customAxios } from "../apis";
import { Game, GameProps } from "../components";

type HomePageProps = {
  games: GameProps[];
};

const HomePage: NextPage<HomePageProps> = (props) => {
  return (
    <div>
      <ul>
        {props.games.map((game) => (
          <li key={game.id}>
            <Game game={game} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;

export async function getServerSideProps() {
  const response = await customAxios.get("/api/games");
  const result = response.data.filter((_: GameProps, i: number) => i < 20);

  return {
    props: {
      games: result,
    },
  };
}
