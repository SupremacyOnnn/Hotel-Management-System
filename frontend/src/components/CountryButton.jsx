import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useGetHotelByIdQuery } from "../slices/hotelApiSlice";
import SegementedCauracel from "./SegementedCauracel";

const CountryButton = ({ buttonLabels }) => {
  const [selectedButton, setSelectedButton] = useState("India");
  const { data: hotels } = useGetHotelByIdQuery(selectedButton);
  const hotelsWithPictures = hotels
    ? hotels.map((hotel) => ({
        picture: hotel.profilePic,
        info: hotel.name,
        about: hotel.inspiration,
        location: hotel.city,
      }))
    : [];

  const handelClick = () => {
    console.log(selectedButton);
    console.log(hotels);
    console.log(hotelsWithPictures);
  };
  return (
    <>
      <Container className="d-flex flex-wrap m-3">
        {buttonLabels.map((label, index) => (
          <Button
            key={index}
            variant="warning"
            value={label}
            onClick={(e) => setSelectedButton(e.target.value)}
            disabled={selectedButton === index}
            className="mx-auto country-button"
          >
            {label}
          </Button>
        ))}
      </Container>
      <SegementedCauracel carouselItems={hotelsWithPictures} />
      <Button onClick={handelClick}>Click</Button>
    </>
  );
};

export default CountryButton;
