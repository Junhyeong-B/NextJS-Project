import { NextPage } from "next";
import { customAxios } from "../apis";
import { GameDetail, GameDetailProps } from "../components";

type GameDetailPageProps = {
  detail: GameDetailProps;
};

const GameDetailPage: NextPage<GameDetailPageProps> = (props) => {
  return <GameDetail detail={props.detail} />;
};

export default GameDetailPage;

export async function getServerSideProps(context: {
  params: { gameId: number };
}) {
  const { gameId } = context.params;
  const response = await customAxios.get("/api/game", {
    params: { id: gameId },
  });
  return {
    props: {
      detail: response.data,
    },
  };
}
