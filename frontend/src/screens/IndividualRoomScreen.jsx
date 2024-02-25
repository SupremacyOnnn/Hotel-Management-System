import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetHotelByIDQuery } from "../slices/hotelApiSlice";
import { useGetRoomsBookingByRoomIDQuery } from "../slices/bookingApiSlice";
import { useGetRoomsByRoomIDQuery } from "../slices/roomApiSlice";
import Loader from "../components/Loader";
import { Image, Container, Row, Col, Button } from "react-bootstrap";
import CustomRangePicker from "../components/CustomRangePicker";
import dayjs from "dayjs";
import SegementedCauracel2 from "../components/SegementedCauracel2";
import { setRoom } from "../slices/roomSlice";
import { useDispatch } from "react-redux";

const IndividualRoomScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id: hotelId, roomId, fromDate, toDate } = useParams();
  const fromDateFormated = dayjs(fromDate, "DD-MM-YYYY");
  const toDateFormated = dayjs(toDate, "DD-MM-YYYY");
  const { data: hotelData, isLoading, isError } = useGetHotelByIDQuery(hotelId);
  const [startDate, setStartDate] = useState(
    fromDateFormated.format("DD-MM-YYYY")
  );
  const [endDate, setEndDate] = useState(toDateFormated.format("DD-MM-YYYY"));
  const {
    data: room,
    isRoomLoading,
    isRoomError,
  } = useGetRoomsByRoomIDQuery(roomId);
  const {
    data: roomBookingData,
    isRoomBookingLoading,
    isRoomBookingError,
  } = useGetRoomsBookingByRoomIDQuery({ roomId, startDate, endDate });

  if (isRoomLoading || isRoomBookingLoading || isLoading) {
    return (
      <div>
        <Loader></Loader>
      </div>
    );
  }

  if (isRoomError || isRoomBookingError || isError) {
    return <div>Error loading rooms data</div>;
  }
  const defaultValue = [fromDateFormated, toDateFormated];
  const handleQuickBook = () => {
    dispatch(
      setRoom({
        ...room,
        startDate,
        endDate,
      })
    );
    navigate(`/login?redirect=/${room.hotelRef}/room/${room._id}/checkout`);
  };
  // const checkoutHandler = () => {
  //   navigate('/login?redirect=/shipping');
  // };

  return (
    <>
      {hotelData && room && roomBookingData && (
        <div>
          <Container className="my-3 ">
            <Row className="my-3">
              <Col sm={12} md={6} lg={8} className="my-5">
                <div className="d-flex justify-content-center">
                  <Image className="my-auto" src={room.picture} fluid />
                </div>
              </Col>

              <Col sm={12} md={6} lg={4}>
                <div className="eb-garamond">
                  <h2>{room.roomName}</h2>
                  <p>{room.about}</p>
                  <h4>View: {room.view}</h4>
                  <h4>Room Size: {room.roomSize}</h4>
                  <h4>Total Rooms in villa: {room.qty}</h4>
                  <h4>Price: {room.price}/per night.</h4>
                  <h4>Time - 11:00Am to 10:00 Am</h4>
                  <div className="mx-auto">
                    <h4>Date Range : {"  "}</h4>
                    <CustomRangePicker
                      defaultValue={defaultValue}
                      onChange={(dates) => {
                        setStartDate(dayjs(dates[0]).format("DD-MM-YYYY"));
                        setEndDate(dayjs(dates[1]).format("DD-MM-YYYY"));
                      }}
                    />
                  </div>
                  <h4>
                    Status:{" "}
                    {roomBookingData.length === 0 ? "Avialable" : "NA/Booked"}
                  </h4>
                  <Button
                    variant={
                      roomBookingData.length === 0 ? "success" : "danger"
                    }
                    className="mt-3 country-button w-100"
                    disabled={!(roomBookingData.length === 0)}
                    onClick={handleQuickBook}
                  >
                    {roomBookingData.length === 0 ? "Checkout" : "Booked"}
                  </Button>
                </div>
              </Col>
            </Row>
            {hotelData.dine ? (
              <div className="m-2">
                <h1 className="eb-garamond">
                  <i>Where would you like to dine?</i>
                </h1>
                <p>{hotelData.dineAbout}</p>
                <div>
                  <SegementedCauracel2
                    carouselItems={hotelData.dinePlace}
                  ></SegementedCauracel2>
                </div>
              </div>
            ) : null}
            {hotelData.amenities ? (
              <div className="m-2">
                <h1 className="eb-garamond">
                  <i>Relax. Replenish. Rejuvenate.</i>
                </h1>
                <p>{hotelData.amenitiesAbout}</p>
                <div>
                  <SegementedCauracel2
                    carouselItems={hotelData.amenitiesList}
                  ></SegementedCauracel2>
                </div>
              </div>
            ) : null}
          </Container>
        </div>
      )}
    </>
  );
};

export default IndividualRoomScreen;
