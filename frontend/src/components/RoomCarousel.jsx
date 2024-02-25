import React from "react";
import { Carousel, Row, Col, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const RoomCarousel = ({ carouselItems, hotelId }) => {
  const navigate = useNavigate();
  function handelClick() {
    navigate(`/${hotelId}/room`);
  }
  return (
    <Carousel
      // prevIcon={<span style={{ visibility: "hidden" }}>&#10094;</span>}
      // nextIcon={<span style={{ visibility: "hidden" }}>&#10095;</span>}
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
              <Col sm={3} className="d-flex ">
                <Button
                  variant="warning"
                  className="mx-auto country-button w-100 mt-2"
                  onClick={handelClick}
                >
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
