import React from "react";
import { Button, Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import {
  useGetCancelBookingByIdQuery,
  useUpdateCancelBookingMutation,
} from "../slices/cancelSlice";
import Loader from "../components/Loader";
import moment from "moment";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const CancelledBookingScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const isAdmin = userInfo.isAdmin;
  const { bookingId } = useParams();
  const {
    data: bookingData,
    isLoading,
    isError,
  } = useGetCancelBookingByIdQuery(bookingId);

  const [updateCancelBooking] = useUpdateCancelBookingMutation();

  // console.log(bookingData);

  const handelRefund = async () => {
    try {
      await updateCancelBooking({
        id: bookingData._id,
        updates: { isRefunded: true },
      }).unwrap();
      toast.success("Refund done successfully.");
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message || err.error || "Error in Refunding");
    }
  };

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
            {isAdmin && (
              <>
                <hr />
                <Button
                  value={bookingData._id}
                  variant={bookingData.isRefunded ? "success" : "danger"}
                  disabled={bookingData.isRefunded}
                  className="w-100"
                  onClick={handelRefund}
                >
                  {bookingData.isRefunded ? "Refunded" : "Confirm Refund"}
                </Button>
              </>
            )}
          </div>
        </Container>
      )}
    </>
  );
};

export default CancelledBookingScreen;
