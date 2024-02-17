import React from "react";
import { Carousel, Row, Col, Button, Container } from "react-bootstrap";

const RoomCarousel = ({ carouselItems }) => {
  return (
    <Carousel>
      {carouselItems.map((item, index) => (
        <Carousel.Item
          pause="hover"
          className="mb-4"
          key={index}
          interval={5000}
          fade
        >
          <Row className="justify-content-center">
            {/* Picture on the left side */}
            <Col sm={8}>
              <img
                className="d-block w-100"
                src={item.picture}
                alt={item.roomName}
              />
            </Col>
          </Row>
          <Container className="eb-garamnond mt-3">
            <Row>
              <Col sm={9}>
                <i>
                  <b>{item.roomName},</b>
                  {item.about}
                </i>
              </Col>
              <Col sm={3}>
                <Button variant="warning" className="mx-auto country-button">
                  Explore More
                </Button>
              </Col>
            </Row>
          </Container>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default RoomCarousel;
