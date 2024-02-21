import React from "react";
import { Carousel, Row, Col, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const SegementedCauracel = ({ carouselItems }) => {
  const navigate = useNavigate();
  const handelExploreClick = (e) => {
    navigate(`/${e}`);
  };
  return (
    <Carousel
      prevIcon={<span style={{ visibility: "hidden" }}>&#10094;</span>}
      nextIcon={<span style={{ visibility: "hidden" }}>&#10095;</span>}
      indicators={false}
    >
      {carouselItems.map((item, index) => (
        <Carousel.Item pause="hover" className="mb-4" key={index}>
          <Row>
            {/* Picture on the left side */}
            <Col sm={8}>
              <img
                className="d-block w-100"
                src={item.picture}
                alt={item.info}
              />
            </Col>
            {/* Content on the right side */}
            <Col sm={4}>
              <Container className="my-2">
                <div className="eb-garamond">
                  <h3>{item.info}</h3>
                  <p>{item.about}</p>
                  <h4>Location: {item.location}</h4>
                </div>
                <Col className="mt-3">
                  <Button
                    variant="warning"
                    block
                    className="mt-3 country-button"
                  >
                    Quick Book
                  </Button>
                </Col>
                <Col className="mt-3">
                  <Button
                    variant="light"
                    block
                    className="mt-3 country-button"
                    value={item.id}
                    onClick={(e) => handelExploreClick(e.target.value)}
                  >
                    Explore
                  </Button>
                </Col>
              </Container>
            </Col>
          </Row>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default SegementedCauracel;
