import React from "react";
import Caurasel from "../components/Caurasel";

const Try = () => {
  const CarouselItems = [
    {
      picture: "./image/c2.jpg",
      info: "Good Afternoon. Welcome to The Hotel.",
      about: "Ranked Number 1 Hotel Brand in the World",
    },
    {
      picture: "./image/c1.jpg",
      info: "Ranked Number 1 Hotel Brand in the World",
      about: "Travel + Leisure World’s Best Awards, 2022",
    },
    {
      picture: "./image/c3.jpg",
      info: "Featured in The World’s 50 Best Hotels",
      about: "The World’s 50 Best Hotels Academy, 2023.",
    },
    // Add more carousel items as needed
  ];
  return <div>{<Caurasel carouselItems={CarouselItems}></Caurasel>}</div>;
};

export default Try;
