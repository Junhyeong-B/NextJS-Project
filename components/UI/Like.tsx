import { HTMLAttributes, useState } from "react";
import { Star, StarBorder } from "../../assets";
import classes from "./Like.module.scss";

export type LikeProps = {
  isFavorite: boolean;
} & HTMLAttributes<HTMLButtonElement>;

const Like = ({ isFavorite: favor }: LikeProps): JSX.Element => {
  const [isFavorite, setIsFavorite] = useState<boolean>(favor);
  const handleClick = () => {
    setIsFavorite((prevState) => !prevState);
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
