import React from "react";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Rooms = ({ rooms, onQuickBook, fromDate, toDate }) => {
  return (
    <div>
      {rooms &&
        rooms.map((room) => (
          <Container key={room._id} className="my-3 border rounded">
            <Row className="my-3">
              <Col sm={12} md={6} lg={8}>
                <div className="d-flex justify-content-center">
                  <Link
                    to={`/${room.hotelRef}/room/${room._id}/${fromDate}/${toDate}`}
                  >
                    <Image className="my-auto" src={room.picture} fluid />
                  </Link>
                </div>
              </Col>

              <Col sm={12} md={6} lg={4} className="mt-3">
                <div className="eb-garamond">
                  <Link
                    to={`/${room.hotelRef}/room/${room._id}/${fromDate}/${toDate}`}
                  >
                    <h3>{room.roomName}</h3>
                  </Link>
                  <p>{room.about}</p>
                  <h4>View: {room.view}</h4>
                  <h4>Room Size: {room.roomSize}</h4>
                  <h4>Total Rooms in villa: {room.qty}</h4>
                  <h4>Price: {room.price}/per night.</h4>
                  <h4>Status: {room.isEmpty ? "Avialable" : "NA/Booked"}</h4>
                  <Button
                    variant={room.isEmpty ? "success" : "danger"}
                    className="mt-3 country-button w-100"
                    disabled={!room.isEmpty}
                    onClick={() => onQuickBook(room)}
                  >
                    {room.isEmpty ? "Quick Book" : "Booked"}
                  </Button>
                </div>
              </Col>
            </Row>
          </Container>
        ))}
    </div>
  );
};

export default Rooms;
