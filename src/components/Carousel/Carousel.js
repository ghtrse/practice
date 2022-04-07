import { ClassNames } from "@emotion/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { img_300, noPicture } from "../../config/config";
import classes from './Carousel.module.css';

const handleDragStart = (e) => e.preventDefault();

const Carousel = (props) => {
  const [credits, setCredits] = useState([]);
  const items = credits.map((credit) => (
    <div className={classes.carouselItem}>
      <img
        src={
          credit.profile_path ? `${img_300}/${credit.profile_path}` : noPicture
        }
        alt={credit.name}
        onDragStart={handleDragStart}
        className={classes.carouselItem__img}
      />
      <p className={classes.carouselItem__txt}>{credit.name}</p>
    </div>
  ));
  const responsive = {
    0: {
      items: 3,
    },
    512: {
      items: 5,
    },
    1024: {
      items: 7,
    },
  };
  const fetchData = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${props.media_type}/${props.id}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );
    console.log(data.cast);
    setCredits(data.cast);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <AliceCarousel
      mouseTracking
      items={items}
      infinite
      disableDotsControls
      responsive={responsive}
      autoPlay
    />
  );
};

export default Carousel;
