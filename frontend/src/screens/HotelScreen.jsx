import React from "react";
import Carousel from "../components/Caurasel";
import { useGetHotelByIDQuery } from "../slices/hotelApiSlice";
import { useParams } from "react-router-dom";
import { Button, Container, Row, Col } from "react-bootstrap";
import Loader from "../components/Loader";
import ImageCarousel from "../components/ImageCauracel";
import SegementedCauracel2 from "../components/SegementedCauracel2";
import RoomCarousel from "../components/RoomCarousel";
import { useGetRoomsByHotelIDQuery } from "../slices/roomApiSlice";

const HotelScreen = () => {
  const { id: hotelId } = useParams();
  const { data: hotelData, isLoading, isError } = useGetHotelByIDQuery(hotelId);
  const {
    data: roomData,
    isRoomLoading,
    isRoomError,
  } = useGetRoomsByHotelIDQuery(hotelId);

  if (isLoading || isRoomLoading) {
    return (
      <div>
        <Loader></Loader>
      </div>
    );
  }

  if (isError || isRoomError) {
    return <div>Error loading hotel data</div>;
  }

  function handleClick() {
    console.log(roomData);
  }

  if (!hotelData || !hotelData.mainPicture) {
    return <div>No hotel data available</div>;
  }

  return (
    <>
      <Carousel carouselItems={hotelData.mainPicture} />
      <Row className="mb-4">
        <Col sm={7}>
          <ImageCarousel images={hotelData.aboutPicture} />
        </Col>
        <Col sm={5}>
          <Container className="eb-garamond">
            <h2>
              <i>Welcome </i>to {hotelData.city}
            </h2>
            <p>{hotelData.about}</p>
          </Container>
        </Col>
      </Row>
      <div>
        <Container className="d-flex justify-content-center ">
          <div className="border border-warning rounded p-5 eb-garamond">
            <Row>
              <Col className="p-2">Address : {hotelData.address}</Col>
            </Row>
            <Row>
              <Col className="p-2">
                <b>Email :</b> {hotelData.email}
              </Col>
              <Col className="p-2">
                <b>Phone :</b> {hotelData.phone}
              </Col>
            </Row>
          </div>
        </Container>
      </div>
      <div className="m-2">
        <h1 className="eb-garamond">
          <i>May we show you to your room?</i>
        </h1>
        <p>{hotelData.inspiration}</p>
      </div>
      <div>
        <RoomCarousel carouselItems={roomData} hotelId={hotelId} />
      </div>
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

      <Button onClick={handleClick}>Click me</Button>
    </>
  );
};

export default HotelScreen;
