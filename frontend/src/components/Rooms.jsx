import React from "react";
import { useParams } from "react-router-dom";
import { useGetRoomsByHotelIDQuery } from "../slices/roomApiSlice";
import Loader from "./Loader";
import { Container, Row, Col, Image, Button } from "react-bootstrap";

const Rooms = () => {
  const { id: hotelId } = useParams();
  const {
    data: rooms,
    isLoading,
    isError,
  } = useGetRoomsByHotelIDQuery(hotelId);

  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    return <div>Error in loading data</div>;
  }

  return (
    <div>
      {rooms &&
        rooms.map((room) => (
          <Container className="my-3 border rounded">
            <Row key={room._id} className="my-3">
              <Col sm={12} md={6} lg={8}>
                <div className="d-flex justify-content-center">
                  <Image className="my-auto" src={room.picture} fluid />
                </div>
              </Col>

              <Col sm={12} md={6} lg={4} className="mt-3">
                <div className="eb-garamond">
                  <h3>{room.roomName}</h3>
                  <p>{room.about}</p>
                  <h4>View: {room.view}</h4>
                  <h4>Room Size: {room.roomSize}</h4>
                  <h4>Available Rooms: {room.qty}</h4>
                  <h4>Price: {room.price}</h4>
                  <Button
                    variant="warning"
                    block
                    className="mt-3 country-button"
                  >
                    Quick Book
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
