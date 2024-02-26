import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Container,
  Image,
  ListGroup,
  Card,
  Button,
} from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useGetRoomsBookingByIDQuery } from "../slices/bookingApiSlice";
import { toast } from "react-toastify";
import { useGetRoomsByRoomIDQuery } from "../slices/roomApiSlice";
import moment from "moment";
import { useCreateCancelBookingMutation } from "../slices/cancelSlice";

const OrderScreen = () => {
  const navigate = useNavigate();
  const [isHistorical, setIsHistorical] = useState(false);
  const { bookingId } = useParams();
  const {
    data: bookingData,
    isLoading: isBookingLoading,
    isError: isBookingError,
  } = useGetRoomsBookingByIDQuery(bookingId);
  const roomId = bookingData?.roomId;
  const {
    data: room,
    isLoading: isRoomLoading,
    isError: isRoomError,
  } = useGetRoomsByRoomIDQuery(roomId);
  useEffect(() => {
    if (bookingData && bookingData.endDate) {
      const endDate = moment(bookingData.endDate);
      const currentDate = moment();
      setIsHistorical(currentDate.isAfter(endDate));
    }
  }, [bookingData]);

  const parsedStartDate = bookingData ? moment(bookingData.startDate) : null;
  const parsedEndDate = bookingData
    ? moment(bookingData.endDate).add(1, "day")
    : null;
  const numberOfDays =
    parsedStartDate && parsedEndDate
      ? parsedEndDate.diff(parsedStartDate, "days")
      : 0;
  const totalPrice =
    room && numberOfDays
      ? room.price + (room.price * numberOfDays * 10) / 100
      : 0;

  const placeOrderHandler = async () => {
    try {
      await createCancelBookingMutaion({
        bookingId: bookingData._id,
        hotelId: room.hotelRef,
        roomId: room._id,
        userId: bookingData.userId,
        country: room.country,
        roomName: room.roomName,
        city: room.city,
        startDate: moment(bookingData.startDate).format("DD-MM-YYYY"),
        endDate: moment(bookingData.endDate).format("DD-MM-YYYY"),
        totalPrice,
      }).unwrap();
      toast.success("Booking Cancelled");
      navigate(`/myBooking`);
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message || err.error || "Cannot Place the order");
    }
  };

  const [createCancelBookingMutaion] = useCreateCancelBookingMutation();
  if (
    !bookingData ||
    isBookingLoading ||
    isBookingError ||
    !room ||
    isRoomLoading ||
    isRoomError
  ) {
    return <div>Loading .... </div>;
  }

  return (
    <>
      {room && (
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
                <h5 className="eb-garamond">
                  From : {moment(bookingData.startDate).format("DD-MM-YYYY")} -
                  11:00 AM
                </h5>
                <h5 className="eb-garamond">
                  To :{" "}
                  {moment(bookingData.endDate)
                    .add(1, "day")
                    .format("DD-MM-YYYY")}{" "}
                  - 10:00 AM
                </h5>
                <h5>Booking Id: {bookingData._id}</h5>
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
                        <Col>Rs.{room.price}</Col>
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
                        <Col>Rs.{(room.price * 10) / 100}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Total</Col>
                        <Col>Rs.{totalPrice}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      {bookingData.checkedIn || bookingData.checkedOut ? (
                        <Button
                          type="button"
                          variant="success"
                          className="btn-block w-100"
                          disabled="true"
                        >
                          Booking Confirmed
                        </Button>
                      ) : (
                        <Button
                          type="button"
                          variant="danger"
                          className="btn-block w-100"
                          disabled={numberOfDays === 0 || isHistorical}
                          onClick={placeOrderHandler}
                        >
                          {isHistorical ? "Didn't Show up" : "Cancel Booking"}
                        </Button>
                      )}
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

export default OrderScreen;
