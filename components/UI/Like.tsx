import { Star, StarBorder } from "../../assets";
import classes from "./Like.module.scss";

const Like = ({ isFavorite }: { isFavorite: boolean }): JSX.Element => {
  return (
    <div
      className={`${classes.container} ${
        isFavorite ? `${classes.favorite}` : ""
      }`}
    >
      {isFavorite ? <Star /> : <StarBorder />}
      <span>Favorite</span>
    </div>
  );
};

export default Like;
