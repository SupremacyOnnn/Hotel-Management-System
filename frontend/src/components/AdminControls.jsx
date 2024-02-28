import React from "react";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useUpdateBookingMutation } from "../slices/bookingApiSlice";
import { toast } from "react-toastify";

const AdminControls = ({ bookingData, isHistorical }) => {
  console.log(bookingData, isHistorical);
  const { userInfo } = useSelector((state) => state.auth);
  const [updateBooking] = useUpdateBookingMutation(); // Destructure the mutation hook

  const handleCheckOut = async () => {
    try {
      await updateBooking({
        updates: { checkedOut: true },
        id: bookingData._id,
      });
      toast.success("Check Out done successfully.");
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message || err.error || "Cannot check out");
    }
  };

  const handleCheckIn = async () => {
    try {
      await updateBooking({
        updates: { checkedIn: true },
        id: bookingData._id,
      });
      toast.success("Check In done successfully.");
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message || err.error || "Cannot check In");
    }
  };

  return (
    <div>
      {userInfo && userInfo.isAdmin ? (
        !isHistorical ? (
          bookingData.checkedIn ? (
            bookingData.checkedOut ? (
              <Button
                variant={
                  bookingData.checkedIn && bookingData.checkedOut
                    ? "success"
                    : "warning"
                }
                className="my-2 w-100"
              >
                Stay Completed
              </Button>
            ) : (
              <Button
                variant={
                  bookingData.checkedIn && bookingData.checkedOut
                    ? "success"
                    : "warning"
                }
                className="my-2 w-100"
                onClick={handleCheckOut} // Call handleCheckOut function on button click
              >
                Confirm CheckOut
              </Button>
            )
          ) : (
            <Button
              variant="success"
              className="my-2 w-100"
              onClick={handleCheckIn} // Call handleCheckIn function on button click
            >
              Confirm CheckIn
            </Button>
          )
        ) : (
          <Button disabled={true} variant="danger" className="my-2 w-100">
            Cannot Refund
          </Button>
        )
      ) : null}
    </div>
  );
};

export default AdminControls;
