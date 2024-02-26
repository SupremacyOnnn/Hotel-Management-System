import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useGetRoomsBookingByUserIDQuery } from "../slices/bookingApiSlice";
import { Button, Row, Col, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { useGetAllCancelBookingByUserIdQuery } from "../slices/cancelSlice";
import BookingSection from "../components/BookingSection";

const UserBookingScreen = () => {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const {
    data: bookingData,
    isBookingDataLoading,
    isBookingDataError,
  } = useGetRoomsBookingByUserIDQuery(userInfo._id);
  const {
    data: cancelData,
    isCancelDataLoading,
    isCancelDataError,
  } = useGetAllCancelBookingByUserIdQuery(userInfo._id);
  console.log(cancelData);
  const [sortedBookings, setSortedBookings] = useState([]);
  function handelNoBooking() {
    navigate("/");
  }
  useEffect(() => {
    if (bookingData) {
      const sortedBookings = [...bookingData].sort((a, b) => {
        return new Date(a.endDate) - new Date(b.endDate);
      });
      setSortedBookings(sortedBookings);
    }
  }, [bookingData]);

  if (isBookingDataLoading || isCancelDataLoading) {
    return <Loader></Loader>;
  }
  if (isBookingDataError || isCancelDataError) {
    return <div>Error in loading Data</div>;
  }
  if (!sortedBookings.length && !cancelData) {
    return (
      <div>
        <Container>
          <Row className="mx-auto my-3">
            <Col sm={12} lg={12}>
              <h2 className="mx-auto">No Booking History.</h2>
            </Col>
          </Row>
          <Row className="mx-auto my-3">
            <Col sm={12} lg={12}>
              <Button variant="light" onClick={handelNoBooking}>
                Click to go back to main page
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

  const today = new Date();
  today.setDate(today.getDate() - 1);
  const beforeCurrentDateData = [];
  const afterCurrentDateData = [];

  sortedBookings.forEach((booking) => {
    const endDate = new Date(booking.endDate);
    if (endDate < today) {
      beforeCurrentDateData.push(booking);
    } else if (endDate >= today) {
      afterCurrentDateData.push(booking);
    }
  });

  return (
    <>
      <Container>
        <h2 className="mt-1">Upcoming Bookings</h2>
        <hr />
        {afterCurrentDateData ? (
          <BookingSection bookings={afterCurrentDateData} isBooking={true} />
        ) : (
          <>
            <h4>No Upcomig Bookings ..... </h4>
          </>
        )}

        <hr />
        <h2>Booking History</h2>
        <hr />
        {beforeCurrentDateData ? (
          <BookingSection
            bookings={beforeCurrentDateData}
            isBooking={true}
            isHistory={true}
          />
        ) : (
          <>
            <h4>No Previous Bookings ..... </h4>
          </>
        )}
        <hr />
        <h2>Cancelled Booking History</h2>
        <hr />
        {cancelData ? (
          <BookingSection bookings={cancelData} isBooking={false} />
        ) : (
          <>
            <h4>No Cancelled Bookings ..... </h4>
          </>
        )}
      </Container>
    </>
  );
};

export default UserBookingScreen;
