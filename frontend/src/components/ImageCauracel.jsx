import React from "react";
import { Carousel } from "react-bootstrap";

const ImageCarousel = ({ images }) => {
  return (
    <Carousel
      prevIcon={<span style={{ visibility: "hidden" }}>&#10094;</span>}
      nextIcon={<span style={{ visibility: "hidden" }}>&#10095;</span>}
      indicators={false}
    >
      {images.map((image, index) => (
        <Carousel.Item key={index}>
          <img className="d-block w-100" src={image} alt={`Slide ${index}`} />
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ImageCarousel;
