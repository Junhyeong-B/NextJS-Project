import { Fragment, useState } from "react";
import classes from "./Slider.module.scss";

type SliderProps = {
  id: number;
  image: string;
};

const Slider = (props: {
  screenshots: SliderProps[];
  title: string;
}): JSX.Element => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const prevButtonClickHandler = () => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex === 0) {
        return props.screenshots.length - 1;
      } else {
        return prevIndex - 1;
      }
    });
  };

  const nextButtonClickHandler = () => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex === props.screenshots.length - 1) {
        return 0;
      } else {
        return prevIndex + 1;
      }
    });
  };

  const indexButtonClickHandler = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <Fragment>
      <ul className={classes.slider}>
        <button
          onClick={prevButtonClickHandler}
          className={classes.prev_button}
        >
          <svg height="24px" viewBox="0 0 24 24" width="24px">
            <path d="M11.67 3.87L9.9 2.1 0 12l9.9 9.9 1.77-1.77L3.54 12z" />
          </svg>
        </button>
        {props.screenshots.map((screenshot) => (
          <li
            key={screenshot.id}
            style={{ transform: `translateX(-${currentIndex}00%)` }}
          >
            {/* eslint-disable-next-line */}
            <img src={screenshot.image} alt={`${props.title} screenshot`} />
          </li>
        ))}
        <button
          onClick={nextButtonClickHandler}
          className={classes.next_button}
        >
          <svg height="24px" viewBox="0 0 24 24" width="24px">
            <polygon points="6.23,20.23 8,22 18,12 8,2 6.23,3.77 14.46,12" />
          </svg>
        </button>
      </ul>
      <div className={classes.slider_button}>
        {props.screenshots.map((_, i) => (
          <div
            key={`Slider-Button-${i}`}
            onClick={() => indexButtonClickHandler(i)}
            className={currentIndex === i ? classes.current : ""}
          />
        ))}
      </div>
    </Fragment>
  );
};

export default Slider;
