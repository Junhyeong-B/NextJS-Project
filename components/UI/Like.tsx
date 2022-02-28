import { HTMLAttributes } from "react";
import { Star, StarBorder } from "../../assets";
import classes from "./Like.module.scss";

export type LikeProps = {
  isFavorite: boolean;
  updateFavorite: () => void;
} & HTMLAttributes<HTMLButtonElement>;

const Like = ({ isFavorite, updateFavorite }: LikeProps): JSX.Element => {
  const handleClick = () => {
    updateFavorite && updateFavorite();
  };
  return (
    <div
      className={`${classes.container} ${
        isFavorite ? `${classes.favorite}` : ""
      }`}
      onClick={handleClick}
    >
      {isFavorite ? <Star /> : <StarBorder />}
      <span>Favorite</span>
    </div>
  );
};

export default Like;
