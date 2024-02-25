import React, { useEffect } from "react";
import {
  Row,
  Col,
  Container,
  Image,
  ListGroup,
  Card,
  Button,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { useCreateBookingMutation } from "../slices/bookingApiSlice";
import { toast } from "react-toastify";

const CheckoutScreen = () => {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const { room } = useSelector((state) => state.room);
  useEffect(() => {
    if (!room) {
      navigate("/shipping");
    }
  }, [room, navigate]);
  const [createOrder] = useCreateBookingMutation();
  const parsedStartDate = dayjs(room.startDate, "DD-MM-YYYY");
  const parsedEndDate = dayjs(room.endDate, "DD-MM-YYYY");
  const numberOfDays = parsedEndDate.diff(parsedStartDate, "day");
  const totalPrice = room.price + (room.price * 10) / 100;
  if (!room || !room.startDate || !room.endDate || !room.price) {
    return <div>Loading...</div>;
  }
  const placeOrderHandler = async () => {
    try {
      await createOrder({
        hotelId: room.hotelRef,
        roomId: room._id,
        userId: userInfo._id,
        country: room.country,
        city: room.city,
        startDate: room.startDate,
        endDate: room.endDate,
        totalPrice,
      }).unwrap();
      toast.success("Order Created");
      navigate(`/`);
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message || err.error || "Cannot Place the order");
    }
  };
  return (
    <>
      {userInfo && room && (
        <div>
          <Container className="my-3">
            <h2 className="eb-garamond">Booking Details : </h2>
            <Row className="my-3">
              <Col sm={12} lg={4}>
                <div className="d-flex justify-content-center">
                  <Link to={`${room.hotelref}/room/${room.roomId}`}>
                    <Image className="my-2" src={room.picture} fluid />
                  </Link>
                </div>
              </Col>
              <Col sm={12} lg={3} className="my-2 mx-2">
                <Link to={`${room.hotelref}/room/${room.roomId}`}>
                  <h5 className="eb-garamond">Villa Name : {room.roomName}</h5>
                </Link>
                <h5 className="eb-garamond">Booked by : {userInfo.name}</h5>
                <h5 className="eb-garamond">Email : {userInfo.email}</h5>
                <h5 className="eb-garamond">
                  From : {room.startDate} - 11:00 AM
                </h5>
                <h5 className="eb-garamond">To : {room.endDate} - 10:00 AM</h5>
                <hr></hr>
                <h5>
                  {room.roomName} (Rs.{room.price}) * {numberOfDays} = Rs.
                  {room.price * numberOfDays}
                </h5>
              </Col>
              <Col sm={12} lg={4}>
                <Card>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <h2>Order Summary</h2>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Base Price</Col>
                        <Col>${room.price}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>No. of Days</Col>
                        <Col>{numberOfDays}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Tax</Col>
                        <Col>${(room.price * 10) / 100}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Total</Col>
                        <Col>${totalPrice}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Button
                        type="button"
                        variant="success"
                        className="btn-block w-100"
                        disabled={numberOfDays === 0}
                        onClick={placeOrderHandler}
                      >
                        Confirm Booking and PAY
                      </Button>
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      )}
    </>
  );
};

export default CheckoutScreen;
