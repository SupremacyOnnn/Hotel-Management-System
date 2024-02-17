import { useState } from "react";
import { Carousel, Image } from "react-bootstrap";

const MyCarousel = ({ carouselItems }) => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <>
      <Carousel
        activeIndex={index}
        onSelect={handleSelect}
        pause="hover"
        className="bg-primary mb-4 d-block "
        style={{ maxHeight: "500px", overflow: "clip" }}
        interval={5000}
        fade
      >
        {carouselItems.map((item, idx) => (
          <Carousel.Item key={idx}>
            <Image src={item.picture} fluid />
            <Carousel.Caption className="carousel-caption eb-garamond">
              <h1 className="text-white text-right ebFont">{item.info}</h1>
              <p className="ebFont">{item.about}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </>
  );
};

export default MyCarousel;
