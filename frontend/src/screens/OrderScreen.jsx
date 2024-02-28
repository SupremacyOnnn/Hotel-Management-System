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
import {
  useGetRoomsBookingByIDQuery,
  // useUpdateBookingMutation,
} from "../slices/bookingApiSlice";
import { toast } from "react-toastify";
import moment from "moment";
import { useCreateCancelBookingMutation } from "../slices/cancelSlice";
import { useSelector } from "react-redux";
import Loader from "../components/Loader";
import AdminControls from "../components/AdminControls";

const OrderScreen = () => {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const [isHistorical, setIsHistorical] = useState(false);
  const { bookingId } = useParams();
  const {
    data: bookingData,
    isLoading: isBookingLoading,
    isError: isBookingError,
  } = useGetRoomsBookingByIDQuery(bookingId);
  useEffect(() => {
    if (bookingData && bookingData.endDate) {
      const endDate = moment(bookingData.endDate).add(1, "day");
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
    bookingData && numberOfDays
      ? bookingData.price * numberOfDays +
        (bookingData.price * numberOfDays * 10) / 100
      : 0;

  const placeOrderHandler = async () => {
    try {
      await createCancelBookingMutaion({
        name: bookingData.name,
        picture: bookingData.picture,
        bookingId: bookingData._id,
        hotelId: bookingData.hotelId,
        roomId: bookingData.roomId,
        userId: bookingData.userId,
        country: bookingData.country,
        roomName: bookingData.roomName,
        city: bookingData.city,
        startDate: moment(bookingData.startDate).format("DD-MM-YYYY"),
        endDate: moment(bookingData.endDate).format("DD-MM-YYYY"),
        price: bookingData.price,
        totalPrice: bookingData.totalPrice,
      }).unwrap();
      toast.success("Booking Cancelled");
      navigate(`/myBooking`);
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message || err.error || "Cannot Place the order");
    }
  };

  // const CheckOutHandeler = async () => {
  //   try {
  //     await useUpdateBookingMutation(
  //       { checkedOut: true },
  //       { id: bookingData._id }
  //     ).unwrap();
  //     toast.success("Check Out done successfully.");
  //   } catch (err) {
  //     console.log(err);
  //     toast.error(err?.data?.message || err.error || "Cannot check out");
  //   }
  // };

  // const CheckInHandeler = async () => {
  //   try {
  //     await useUpdateBookingMutation(
  //       { checkedIn: true },
  //       { id: bookingData._id }
  //     ).unwrap();
  //     toast.success("Check In done successfully.");
  //   } catch (err) {
  //     console.log(err);
  //     toast.error(err?.data?.message || err.error || "Cannot check In");
  //   }
  // };

  const [createCancelBookingMutaion] = useCreateCancelBookingMutation();
  if (!bookingData || isBookingLoading || isBookingError) {
    return (
      <div>
        <Loader />{" "}
      </div>
    );
  }

  // console.log(isHistorical);

  return (
    <>
      {bookingData && (
        <div>
          <Container className="my-3">
            <h2 className="eb-garamond">Booking Details : </h2>
            <Row className="my-3">
              <Col sm={12} lg={4}>
                <div className="d-flex justify-content-center">
                  <Link
                    to={`/${bookingData.hotelId}/room/${
                      bookingData.roomId
                    }/${moment(bookingData.startDate).format(
                      "DD-MM-YYYY"
                    )}/${moment(bookingData.endDate)
                      .add(1, "day")
                      .format("DD-MM-YYYY")}`}
                  >
                    <Image className="my-2" src={bookingData.picture} fluid />
                  </Link>
                </div>
              </Col>
              <Col sm={12} lg={3} className="my-2 mx-2">
                <Link
                  to={`/${bookingData.hotelId}/room/${
                    bookingData.roomId
                  }/${moment(bookingData.startDate).format(
                    "DD-MM-YYYY"
                  )}/${moment(bookingData.endDate)
                    .add(1, "day")
                    .format("DD-MM-YYYY")}`}
                >
                  <h5 className="eb-garamond">
                    Villa Name : {bookingData.roomName}
                  </h5>
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
                  {bookingData.roomName} * {numberOfDays} = Rs.
                  {bookingData.totalPrice}
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
                        <Col>Rs.{bookingData.price}</Col>
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
                        <Col>
                          Rs.{(bookingData.price * 10 * numberOfDays) / 100}
                        </Col>
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
                      {userInfo && userInfo.isAdmin ? (
                        <AdminControls
                          isHistorical={isHistorical}
                          bookingData={bookingData}
                        />
                      ) : null}
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
