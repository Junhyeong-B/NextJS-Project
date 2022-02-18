import Head from "next/head";
import { Slider } from "..";
import classes from "./GameDetail.module.scss";

export type GameDetailProps = {
  id: number;
  title: string;
  thumbnail: string;
  status: string;
  short_description: string;
  description: string;
  game_url: string;
  genre: string;
  platform: string;
  publisher: string;
  developer: string;
  release_date: string;
  freetogame_profile_url: string;
  minimum_system_requirements: {
    os: string;
    processor: string;
    memory: string;
    graphics: string;
    storage: string;
  };
  screenshots: {
    id: number;
    image: string;
  }[];
};

const GameDetail = (props: { detail: GameDetailProps }): JSX.Element => {
  return (
    <section className={classes.section}>
      <Head>
        <title>{props.detail.title}</title>
        <meta name="description" content={props.detail.description}></meta>
      </Head>
      <div className={classes.information}>
        <img
          src={props.detail.thumbnail}
          alt={props.detail.title}
          className={classes.title_image}
        />
        <div className={classes.information__game}>
          <h1>Title: {props.detail.title}</h1>
          <ul>
            <li>
              <b>Developer:</b> {props.detail.developer}
            </li>
            <li>
              <b>Genre:</b> {props.detail.genre}
            </li>
            <li>
              <b>Platform:</b> {props.detail.platform}
            </li>
            <li>
              <b>Publisher:</b> {props.detail.publisher}
            </li>
            <li>
              <b>Release Date:</b> {props.detail.release_date}
            </li>
          </ul>
        </div>
      </div>
      <div className={classes.requirements}>
        <h3>Minimum System Requirements</h3>
        <ul>
          <li>
            <b>Graphics:</b> {props.detail.minimum_system_requirements.graphics}
          </li>
          <li>
            <b>Memory:</b> {props.detail.minimum_system_requirements.memory}
          </li>
          <li>
            <b>OS:</b> {props.detail.minimum_system_requirements.os}
          </li>
          <li>
            <b>Processor:</b>{" "}
            {props.detail.minimum_system_requirements.processor}
          </li>
          <li>
            <b>Storage:</b> {props.detail.minimum_system_requirements.storage}
          </li>
        </ul>
      </div>
      <Slider
        title={props.detail.title}
        screenshots={props.detail.screenshots}
      />
      <p className={classes.description}>{props.detail.description}</p>
    </section>
  );
};

export default GameDetail;
