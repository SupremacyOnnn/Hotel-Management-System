import React, { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useGetHotelNameAndIdByCountryQuery } from "../slices/hotelApiSlice";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";

const CheckAvailability = ({ country }) => {
  const [selectedCountry, setSelectedCountry] = useState(country[0]?.country);
  const navigate = useNavigate();
  const {
    data: hotel,
    isLoading,
    error,
  } = useGetHotelNameAndIdByCountryQuery(selectedCountry);
  const [selectedHotelId, setSelectedHotelId] = useState(
    hotel ? hotel[0]?.id : ""
  );

  useEffect(() => {
    setSelectedHotelId(hotel ? hotel[0]?.id : "");
  }, [hotel]);

  if (isLoading) {
    return <Loader></Loader>;
  }
  if (error) {
    return <div>Error loading hotel data</div>;
  }

  function handleClick() {
    navigate(`/${selectedHotelId}/room`);
  }

  return (
    <div className="d-flex justify-content-center">
      <Card className="d-flex justify-content-center">
        <Card.Body>
          <Row>
            <Col>
              <Form.Select
                style={{ width: "310px" }}
                className="mx-auto my-2 mx-2"
                sm={12}
                md={6}
                lg={4}
                xl={3}
                onChange={(e) => setSelectedCountry(e.target.value)}
              >
                {country.map((country) => (
                  <option key={country._id} value={country.country}>
                    {country.country}
                  </option>
                ))}
              </Form.Select>
            </Col>
            <Col>
              <Col>
                <Form.Select
                  style={{ width: "310px" }}
                  className="me-auto ms-auto my-2"
                  sm={12}
                  md={6}
                  lg={4}
                  xl={3}
                  onChange={(e) => setSelectedHotelId(e.target.value)}
                >
                  {hotel.map((hotel) => (
                    <option key={hotel.id} value={hotel.id}>
                      {hotel.name}
                    </option>
                  ))}
                </Form.Select>
              </Col>
            </Col>
            <Col>
              <Button
                variant="warning"
                style={{ width: "310px" }}
                className="m-2"
                sm={12}
                md={6}
                lg={4}
                xl={3}
                onClick={handleClick}
              >
                Check Availability
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CheckAvailability;
