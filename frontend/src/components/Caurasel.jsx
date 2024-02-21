import { useState } from "react";
import { Carousel, Image, Row, Col } from "react-bootstrap";

const MyCarousel = ({ carouselItems }) => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <>
      <Row>
        <Col>
          <Carousel
            activeIndex={index}
            onSelect={handleSelect}
            pause="hover"
            className=" bg-primary mb-4  "
            // style={{ overflow: "clip" }}
            interval={5000}
            fade
            prevIcon={<span style={{ visibility: "hidden" }}>&#10094;</span>}
            nextIcon={<span style={{ visibility: "hidden" }}>&#10095;</span>}
            indicators={false}
          >
            {carouselItems.map((item, idx) => (
              <Carousel.Item key={idx}>
                <Image
                  className="carousel-image w-100"
                  src={item.picture}
                  fluid
                />
                <Carousel.Caption className="carousel-caption eb-garamond">
                  <h1 className="text-white text-right ebFont ">{item.info}</h1>
                  <p className="ebFont">{item.about}</p>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
        </Col>
      </Row>
    </>
  );
};

export default MyCarousel;
