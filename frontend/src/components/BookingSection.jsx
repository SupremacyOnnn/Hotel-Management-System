import React from "react";
import { Button, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import moment from "moment";
const BookingSection = ({ bookings, isBooking, isHistory = false }) => {
  const url = isBooking ? `/order` : `/cancel`;
  return (
    <Table striped bordered round hover responsive className="table-sm">
      <thead>
        <tr>
          <th>Villa Name</th>
          <th>Country</th>
          <th>City</th>
          <th>From Date</th>
          <th>To Date</th>
          <th>Price</th>
          <th>Checked In</th>
          <th>Checked Out</th>
          <th>Update</th>
        </tr>
      </thead>
      <tbody>
        {bookings.map((order) => (
          <tr key={order._id}>
            <LinkContainer to={url + `/${order._id}`}>
              <td>{order.roomName}</td>
            </LinkContainer>
            <LinkContainer to={url + `/${order._id}`}>
              <td>{order.country}</td>
            </LinkContainer>
            <LinkContainer to={url + `/${order._id}`}>
              <td>{order.city}</td>
            </LinkContainer>
            <LinkContainer to={url + `/${order._id}`}>
              <td>{moment(order.startDate).format("DD-MM-YYYY")}-11 AM</td>
            </LinkContainer>
            <LinkContainer to={url + `/${order._id}`}>
              <td>
                {moment(order.endDate).add(1, "day").format("DD-MM-YYYY")}-10 AM
              </td>
            </LinkContainer>
            <LinkContainer to={url + `/${order._id}`}>
              <td>Rs. {order.totalPrice}</td>
            </LinkContainer>
            <LinkContainer to={url + `/${order._id}`}>
              <td>{!order.checkedIn ? "Pending" : "Checked In"}</td>
            </LinkContainer>
            <LinkContainer to={url + `/${order._id}`}>
              <td>{!order.checkedOut ? "Pending" : "Checked Out"}</td>
            </LinkContainer>
            <td>
              <LinkContainer to={url + `/${order._id}`}>
                {order.isCancelled ? (
                  <Button
                    variant={order.isRefunded ? "success" : "danger"}
                    className="btn-sm"
                  >
                    {order.isRefunded ? "Refunded" : "Waiting"}
                  </Button>
                ) : order.checkedIn || order.checkedOut ? (
                  <Button variant="success" className="btn-sm" disabled={true}>
                    Completed
                  </Button>
                ) : (
                  <Button
                    variant="danger"
                    className="btn-sm"
                    disabled={isHistory}
                  >
                    {isHistory ? "Didnt turned Up" : "Cancel"}
                  </Button>
                )}
              </LinkContainer>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default BookingSection;
