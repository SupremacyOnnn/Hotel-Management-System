import React, { useState } from "react";
import Rooms from "../components/Rooms";
import { useParams } from "react-router-dom";
import { useGetRoomsByHotelIDQuery } from "../slices/roomApiSlice";
import dayjs from "dayjs";
import { DatePicker, Button } from "antd";
import { useGetAllVillaBookingsInDateRangeQuery } from "../slices/bookingApiSlice";
// import "antd/dist/antd.css";

const { RangePicker } = DatePicker;

const RoomScreen = () => {
  const { id: hotelId } = useParams();
  const { data: rooms } = useGetRoomsByHotelIDQuery(hotelId);

  // Calculate the current date and the date for tomorrow
  const currentDate = dayjs().startOf("day");
  const tomorrow = dayjs().add(1, "day").startOf("day");

  // Set the default value for the RangePicker
  const defaultValue = [currentDate, tomorrow];

  const disabledDate = (current) => {
    if (current && current < dayjs().startOf("day")) {
      return true;
    }
    if (current && current > dayjs().add(1, "month").endOf("day")) {
      return true;
    }
    return false;
  };

  const [fromDate, setFromDate] = useState(currentDate.format("DD-MM-YYYY"));
  const [toDate, setToDate] = useState(tomorrow.format("DD-MM-YYYY"));
  const { data: bookedVilla } = useGetAllVillaBookingsInDateRangeQuery({
    hotelId,
    startDate: fromDate,
    endDate: toDate,
  });
  function handel() {
    console.log(bookedVilla);
  }
  // console.log({
  //   hotelId,
  //   startDate: fromDate,
  //   endDate: toDate,
  // });

  function filterByDate(dates) {
    setFromDate(dayjs(dates[0]).format("DD-MM-YYYY"));
    setToDate(dayjs(dates[1]).format("DD-MM-YYYY"));
  }

  return (
    <>
      {rooms && bookedVilla && (
        <div>
          <Button onClick={handel}>Click</Button>
          <div className="d-flex flex-wrap m-3">
            <RangePicker
              style={{ height: "38px" }}
              onChange={filterByDate}
              format="DD-MM-YYYY"
              disabledDate={disabledDate}
              className="mx-auto my-2"
              defaultValue={defaultValue}
              allowClear={false}
            />
            <Button variant="warning" className="mx-auto my-2">
              Check Availability
            </Button>
          </div>
          <Rooms rooms={rooms} />
        </div>
      )}
    </>
  );
};

export default RoomScreen;
