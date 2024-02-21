import React from "react";
import { Carousel, Row, Col } from "react-bootstrap";

const SegementedCauracel2 = ({ carouselItems }) => {
  return (
    <Carousel
      prevIcon={<span style={{ visibility: "hidden" }}>&#10094;</span>}
      nextIcon={<span style={{ visibility: "hidden" }}>&#10095;</span>}
      indicators={false}
    >
      {carouselItems.map((item, index) => (
        <Carousel.Item
          pause="hover"
          className="mb-4"
          key={index}
          interval={5000}
          fade
        >
          <Row>
            {/* Picture on the left side */}
            <Col sm={8}>
              <img
                className="d-block w-100"
                src={item.picture}
                alt={item.name}
              />
            </Col>
            {/* Content on the right side */}
            <Col sm={4}>
              <div className="eb-garamond">
                <h1>
                  <i>{item.name}</i>
                </h1>
                <p>{item.about}</p>
                {item.phone ? <h4>Phone: {item.phone}</h4> : null}
              </div>
            </Col>
          </Row>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default SegementedCauracel2;
