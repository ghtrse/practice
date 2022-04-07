import { Badge } from "@mui/material";
import React from "react";
import { img_300, unavailable } from "../../config/config";
import classes from "./MovieItem.module.css";
import ContentModal from "../ContentModal/ContentModal";
const MovieItem = ({ id, poster, title, date, media_type, vote_average, overview }) => {
  return (
    <ContentModal media_type={media_type} id={id}>
        <Badge badgeContent={vote_average} color={vote_average > 6 ? 'primary' : 'secondary'}/>
      <img
        className={classes.poster}
        src={poster ? `${img_300}/${poster}` : unavailable}
        alt={title}
      />
      <p className={classes.title}>{title}</p>
      <div className={classes.subTitle}>
        {media_type === "tv" ? "TV Series" : "Movie"}
        <span>{date}</span>
      </div>
    </ContentModal>
  );
};

export default MovieItem;
