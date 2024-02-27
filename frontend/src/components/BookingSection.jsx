import React, { useState } from "react";
import { Button, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import moment from "moment";
import { useSelector } from "react-redux";

const BookingSection = ({ bookings, isBooking, isHistory = false }) => {
  const { userInfo } = useSelector((state) => state.auth);
  const isAdmin = userInfo.isAdmin;
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBookings = bookings
    ? bookings.slice(indexOfFirstItem, indexOfLastItem)
    : 0;

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const url = isBooking ? `/order` : `/cancel`;

  const bookingsLength = bookings ? bookings.length : 0;

  const nextPage = () => {
    if (currentPage < Math.ceil(bookingsLength / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      <Table striped bordered round hover responsive className="table-sm">
        <thead>
          <tr>
            <th>Villa Name</th>
            {isAdmin && <th>User Name</th>}
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
          {currentBookings &&
            currentBookings.map((order) => (
              <tr key={order._id}>
                <LinkContainer to={url + `/${order._id}`}>
                  <td>{order.roomName}</td>
                </LinkContainer>
                {isAdmin && (
                  <LinkContainer to={url + `/${order._id}`}>
                    <td>{order.name}</td>
                  </LinkContainer>
                )}
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
                    {moment(order.endDate).add(1, "day").format("DD-MM-YYYY")}
                    -10 AM
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
                      <Button
                        variant="success"
                        className="btn-sm"
                        disabled={true}
                      >
                        Completed
                      </Button>
                    ) : (
                      <Button
                        variant={isHistory ? "danger" : "warning"}
                        className="btn-sm"
                        disabled={isHistory}
                      >
                        {isHistory ? "Didnt turned Up" : "Update"}
                      </Button>
                    )}
                  </LinkContainer>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <div className="d-flex justify-content-center">
        <div className="pagination mx-auto">
          <Button
            variant="light"
            onClick={prevPage}
            disabled={currentPage === 1}
          >
            Prev
          </Button>
          {Array.from({
            length: Math.ceil(bookingsLength / itemsPerPage),
          }).map((_, index) => (
            <Button
              key={index}
              onClick={() => paginate(index + 1)}
              variant={currentPage === index + 1 ? "primary" : "light"}
            >
              {index + 1}
            </Button>
          ))}
          <Button
            variant="light"
            onClick={nextPage}
            disabled={currentPage === Math.ceil(bookingsLength / itemsPerPage)}
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
};

export default BookingSection;
