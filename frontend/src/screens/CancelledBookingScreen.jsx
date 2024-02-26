import React from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useGetCancelBookingByIdQuery } from "../slices/cancelSlice";
import Loader from "../components/Loader";
import moment from "moment";

const CancelledBookingScreen = () => {
  const { bookingId } = useParams();
  const {
    data: bookingData,
    isLoading,
    isError,
  } = useGetCancelBookingByIdQuery(bookingId);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <h5>Error in Loading Data .....</h5>
      ) : (
        <Container className="d-flex justify-content-center my-5">
          <div className="my-2 border rounded p-4">
            <h2>Booking Cancelled</h2>
            <hr />
            <h5>Booking Id : {bookingData._id}</h5>
            <h5>Villa Name : {bookingData.roomName}</h5>
            <h5>From : {moment(bookingData.startDate).format("DD-MM-YYYY")}</h5>
            <h5>
              To :{" "}
              {moment(bookingData.endDate).add(1, "day").format("DD-MM-YYYY")}
            </h5>
            <h5>
              Refund Status :{" "}
              {bookingData.isRefunded ? "Refunded" : "Waiting for verification"}
            </h5>
          </div>
        </Container>
      )}
    </>
  );
};

export default CancelledBookingScreen;
