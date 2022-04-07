import * as React from "react";
import { useState, useEffect } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import YouTubeIcon from "@mui/icons-material/YouTube";
import classes from './Content.module.css';
import {
  img_500,
  unavailable,
  unavailableLandscape,
} from "../../config/config";
import axios from "axios";
import Carousel from "../Carousel/Carousel";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "95%",
  bgcolor: "#39445a",
  border: "2px solid #282c34",
  boxShadow: 24,
  borderRadius: 10,
  color: "#fff",
  height: "80%",
  p: 4,
};

export default function ContentModal(props) {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState();
  const [video, setVideo] = useState();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const fetchData = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${props.media_type}/${props.id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );
    setContent(data);
  };

  const fetchVideo = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${props.media_type}/${props.id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );
    setVideo(data.results[0]?.key);
  };

  useEffect(() => {
    fetchData();
    fetchVideo();
  }, []);

  return (
    <React.Fragment>
      <div className={classes.media} onClick={handleOpen}>
        {props.children}
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          {content && (
            <Box sx={style}>
              <div className={classes.contentModal}>
                <img
                  className={classes.contentModal__portrait}
                  src={
                    content.poster_path
                      ? `${img_500}/${content.poster_path}`
                      : unavailable
                  }
                  alt={content.name || content.title}
                />

                <img
                  className={classes.contentModal__landscape}
                  src={
                    content.backdrop_path
                      ? `${img_500}/${content.backdrop_path}`
                      : unavailableLandscape
                  }
                  alt={content.name || content.title}
                />
                <div className={classes.contentModal__about}>
                  <span className={classes.contentModal__title}>
                    {content.name || content.title}(
                    {(
                      content.first_air_date ||
                      content.release_date ||
                      "----"
                    ).substring(0, 4)}
                    )
                  </span>

                  {content.tagline && (
                    <i className={classes.tagline}>{content.tagline}</i>
                  )}

                  <span className={classes.contentModal__description}>
                    {content.overview}
                  </span>
                  <div>
                    <Carousel media_type={props.media_type} id={props.id} />
                  </div>

                  <Button
                    variant="contained"
                    startIcon={<YouTubeIcon />}
                    color="secondary"
                    target="__blank"
                    href={`https://www.youtube.com/watch?v=${video}`}
                  >
                    Watch the trailer
                  </Button>
                </div>
              </div>
            </Box>
          )}
        </Fade>
      </Modal>
    </React.Fragment>
  );
}
