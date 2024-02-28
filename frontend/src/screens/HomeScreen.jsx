import React, { useState } from "react";
import Caurasel from "../components/Caurasel";
import CheckAvailability from "../components/CheckAvailability";
import { useGetHotelByCountryQuery } from "../slices/hotelApiSlice";
import { useGetCountriesQuery } from "../slices/countryApiSlice";
import { Button, Container } from "react-bootstrap";
import SegementedCauracel from "../components/SegementedCauracel";
import Loader from "../components/Loader";

const HomeScreen = () => {
  const {
    data: buttonLabels,
    isCountryLoading,
    isCoutryError,
  } = useGetCountriesQuery();
  const CarouselItems = [
    {
      picture: "/image/c4.jpg",
      info: "Good Afternoon. Welcome to The Villa.",
      about: "Ranked Number 1 Hotel Brand in the World",
    },
    {
      picture: "/image/c1.jpg",
      info: "Ranked Number 1 Hotel Brand in the World",
      about: "Travel + Leisure World’s Best Awards, 2022",
    },
    {
      picture: "/image/c5.jpg",
      info: "Featured in The World’s 50 Best Villa",
      about: "The World’s 50 Best Villa Academy, 2023.",
    },
    // Add more carousel items as needed
  ];

  const [selectedButton, setSelectedButton] = useState("India");
  const {
    data: hotels,
    isLoading,
    isError,
  } = useGetHotelByCountryQuery(selectedButton);
  if (isLoading || isCountryLoading) {
    return (
      <div>
        <Loader></Loader>
      </div>
    );
  }

  if (isError || isCoutryError) {
    return <div>Error loading hotel data</div>;
  }
  const hotelsDetails = hotels
    ? hotels.map((hotel) => ({
        id: hotel._id,
        picture: hotel.profilePic,
        info: hotel.name,
        about: hotel.inspiration,
        location: hotel.city,
      }))
    : [];

  // const handelClick = () => {
  //   console.log(buttonLabels);
  //   // console.log(uniqueHotelsByCountry);
  //   // console.log(selectedButton);
  //   // console.log(hotels);
  //   // console.log(hotelsWithPictures);
  // };

  return (
    <>
      {buttonLabels && hotels && (
        <>
          <Caurasel carouselItems={CarouselItems} />
          <Container className="mx-auto my-4 eb-garamond">
            <h2>
              We have group of premium villas in the most premium destination
              with premium service and aminities like fine dining, gym and spa.
            </h2>
          </Container>
          <CheckAvailability country={buttonLabels} />
          <Container className="mt-2 eb-garamond">
            <h2>
              <i>What stirs the traveller in you</i>?
            </h2>
            <p className="m-0">
              An idyllic beach on a faraway island? Shopping for rare treasures
              in an ancient city?
            </p>
            <p className="m-0">
              A picnic in the Himalayas? A leisurely cruise on the Nile or a
              jungle adventure?
            </p>
          </Container>
          <div className="d-flex flex-wrap m-3">
            {buttonLabels.map((label, index) => (
              <Button
                key={index}
                variant="warning"
                value={label.country}
                onClick={(e) => setSelectedButton(e.target.value)}
                disabled={selectedButton === index}
                block="true"
                sm={12}
                md={6}
                lg={4}
                xl={3}
                className="mx-auto my-2 country-button"
              >
                {label.country}
              </Button>
            ))}
          </div>
          <SegementedCauracel carouselItems={hotelsDetails} />
          {/*<Button onClick={handelClick}>Click</Button>*/}
        </>
      )}
    </>
  );
};

export default HomeScreen;
