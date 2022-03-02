import Head from "next/head";
import { HTMLAttributes } from "react";
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

const GameDetail = ({
  detail,
  ...props
}: { detail: GameDetailProps } & HTMLAttributes<HTMLElement>): JSX.Element => {
  return (
    <section className={classes.section} {...props}>
      <Head>
        <title>{detail.title}</title>
        <meta name="description" content={detail.description}></meta>
      </Head>
      <div className={classes.information}>
        {/* eslint-disable-next-line */}
        <img
          src={detail.thumbnail}
          alt={detail.title}
          className={classes.title_image}
        />
        <div className={classes.information__game}>
          <h1>Title: {detail.title}</h1>
          <ul>
            <li>
              <b>Developer:</b> {detail.developer}
            </li>
            <li>
              <b>Genre:</b> {detail.genre}
            </li>
            <li>
              <b>Platform:</b> {detail.platform}
            </li>
            <li>
              <b>Publisher:</b> {detail.publisher}
            </li>
            <li>
              <b>Release Date:</b> {detail.release_date}
            </li>
          </ul>
        </div>
      </div>
      {detail.minimum_system_requirements && (
        <div className={classes.requirements}>
          <h3>Minimum System Requirements</h3>
          <ul>
            <li>
              <b>Graphics:</b> {detail.minimum_system_requirements.graphics}
            </li>
            <li>
              <b>Memory:</b> {detail.minimum_system_requirements.memory}
            </li>
            <li>
              <b>OS:</b> {detail.minimum_system_requirements.os}
            </li>
            <li>
              <b>Processor:</b> {detail.minimum_system_requirements.processor}
            </li>
            <li>
              <b>Storage:</b> {detail.minimum_system_requirements.storage}
            </li>
          </ul>
        </div>
      )}
      <Slider title={detail.title} screenshots={detail.screenshots} />
      <p className={classes.description}>{detail.description}</p>
    </section>
  );
};

export default GameDetail;
