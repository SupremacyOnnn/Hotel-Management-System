import React, { useEffect, useState } from "react";
import { Row, Col, Form, Container } from "react-bootstrap";
import { useGetHotelsQuery } from "../../slices/hotelApiSlice";
import Loader from "../../components/Loader";
import CustomRangePicker from "../../components/CustomRangePicker";
import dayjs from "dayjs";
import {
  useGetBookingByHotelIdPrevQuery,
  useGetBookingByHotelIdInRangeQuery,
} from "../../slices/bookingApiSlice";
import BookingSection from "../../components/BookingSection";
import { useGetAllCancelBookingByHotelIdQuery } from "../../slices/cancelSlice";

const VillaBookingScreen = () => {
  const { data: villas, isVillaLoading, isVillaError } = useGetHotelsQuery();
  const currentDate = dayjs().startOf("day");
  const tomorrow = dayjs().add(1, "day").startOf("day");
  const defaultValue = [currentDate, tomorrow];
  const [fromDate, setFromDate] = useState(currentDate.format("DD-MM-YYYY"));
  const [toDate, setToDate] = useState(tomorrow.format("DD-MM-YYYY"));
  const [hotelId, setHotelId] = useState("Select a Villa");

  const {
    data: bookingData,
    isBookingLoading,
    isBookingError,
  } = useGetBookingByHotelIdInRangeQuery({
    hotelId,
    fromDate,
    toDate,
  });
  const {
    data: prevdata,
    isPrevLoading,
    isPrevError,
  } = useGetBookingByHotelIdPrevQuery({ hotelId });
  const {
    data: cancelledData,
    isCancelledLoading,
    isCancelledError,
  } = useGetAllCancelBookingByHotelIdQuery(hotelId);
  const [sortedBookings, setSortedBookings] = useState([]);
  useEffect(() => {
    if (bookingData) {
      const sortedBookings = [...bookingData].sort((a, b) => {
        return new Date(a.endDate) - new Date(b.endDate);
      });
      setSortedBookings(sortedBookings);
    }
  }, [fromDate, toDate, bookingData]);

  if (
    isVillaLoading ||
    isBookingLoading ||
    isPrevLoading ||
    isCancelledLoading
  ) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (isVillaError || isBookingError || isPrevError || isCancelledError) {
    return <div>Error fetching villas. Please try again later.</div>;
  }

  if (!villas || villas.length === 0) {
    return <div>No villas available.</div>;
  }

  console.log(hotelId, sortedBookings, prevdata, cancelledData);
  return (
    <>
      <Row className="d-flex flex-wrap">
        <Col lg={6} sm={12}>
          <Form.Select
            onChange={(e) => setHotelId(e.target.value)}
            style={{ width: "310px" }}
            className="mx-auto my-3 "
            sm={12}
            md={6}
            lg={4}
            xl={3}
          >
            <option key={0} value={"Select a Villa"}>
              Select a Villa
            </option>
            {villas.map((villa) => (
              <option key={villa._id} value={villa._id}>
                {villa.name}
              </option>
            ))}
          </Form.Select>
        </Col>

        <Col lg={6} sm={12}>
          <div className="d-flex flex-wrap m-2">
            <CustomRangePicker
              defaultValue={defaultValue}
              onChange={(dates) => {
                setFromDate(dayjs(dates[0]).format("DD-MM-YYYY"));
                setToDate(dayjs(dates[1]).format("DD-MM-YYYY"));
              }}
            />
          </div>
        </Col>
      </Row>
      {hotelId === "Select a Villa" ? (
        <div className="d-flex flex-wrap">
          <h1 className="mx-auto">Please Select a Villa</h1>
        </div>
      ) : (
        <Container>
          <hr />
          <h2>Upcoming and Current Bookings</h2>
          <hr />
          <BookingSection bookings={sortedBookings} isBooking={true} />
          <hr />
          <h2>Booked History</h2>
          <BookingSection
            bookings={prevdata}
            isHistory={true}
            isBooking={true}
          />
          <hr />
          <h2>Cancelled Booking</h2>
          <hr />
          <BookingSection bookings={cancelledData} isBooking={false} />
        </Container>
      )}
    </>
  );
};

export default VillaBookingScreen;
