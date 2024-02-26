import React, { useState } from "react";
import Rooms from "../components/Rooms";
import { useNavigate, useParams } from "react-router-dom";
import { useGetRoomsByHotelIDQuery } from "../slices/roomApiSlice";
import dayjs from "dayjs";
import { Button } from "antd";
import { useGetAllVillaBookingsInDateRangeQuery } from "../slices/bookingApiSlice";
import Loader from "../components/Loader";
import { setRoom } from "../slices/roomSlice";
import { useDispatch } from "react-redux";
import CustomRangePicker from "../components/CustomRangePicker";

const RoomScreen = () => {
  const { id: hotelId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    data: unSortedRoom,
    isLoading,
    isError,
  } = useGetRoomsByHotelIDQuery(hotelId);

  const rooms = unSortedRoom
    ? [...unSortedRoom].sort((a, b) => a.price - b.price)
    : [];

  const currentDate = dayjs().startOf("day");
  const tomorrow = dayjs().add(1, "day").startOf("day");

  // Set the default value for the RangePicker
  const defaultValue = [currentDate, tomorrow];

  const [fromDate, setFromDate] = useState(currentDate.format("DD-MM-YYYY"));
  const [toDate, setToDate] = useState(tomorrow.format("DD-MM-YYYY"));
  const {
    data: bookedVilla,
    isVillaLoading,
    villaError,
  } = useGetAllVillaBookingsInDateRangeQuery({
    hotelId,
    startDate: fromDate,
    endDate: toDate,
  });
  if (isVillaLoading || isLoading) {
    return (
      <div>
        <Loader></Loader>
      </div>
    );
  }

  if (villaError || isError) {
    return <div>Error loading rooms data</div>;
  }
  const modifiedRooms = [];
  if (rooms) {
    rooms.forEach((room) => {
      const modifiedRoom = { ...room };
      modifiedRoom.isEmpty = true;
      modifiedRooms.push(modifiedRoom);
    });
  }
  if (bookedVilla && modifiedRooms) {
    modifiedRooms.forEach((room) => {
      bookedVilla.forEach((villa) => {
        if (room._id === villa.roomId) {
          if (Object.isExtensible(room)) {
            room.isEmpty = false;
          } else {
            const newRoom = { ...room, isEmpty: false };
            const index = modifiedRooms.findIndex((r) => r._id === room._id);
            if (index !== -1) {
              modifiedRooms[index] = newRoom;
            }
          }
        }
      });
    });
  }

  function handel() {
    if (bookedVilla && modifiedRooms) {
      modifiedRooms.forEach((room) => {
        bookedVilla.forEach((villa) => {
          if (room._id === villa.roomId) {
            if (Object.isExtensible(room)) {
              room.isEmpty = false;
            } else {
              const newRoom = { ...room, isEmpty: false };
              const index = modifiedRooms.findIndex((r) => r._id === room._id);
              if (index !== -1) {
                modifiedRooms[index] = newRoom;
              }
            }
          }
        });
      });
    }
  }

  const handleQuickBook = (room) => {
    dispatch(
      setRoom({
        ...room,
        startDate: fromDate,
        endDate: toDate,
      })
    );
    navigate(`/login?redirect=/${hotelId}/room/${room._id}/checkout`);
  };

  return (
    <>
      {rooms && bookedVilla && (
        <div>
          {/* <Button onClick={handel}>Click</Button> */}
          <div className="d-flex flex-wrap m-3">
            <CustomRangePicker
              defaultValue={defaultValue}
              onChange={(dates) => {
                setFromDate(dayjs(dates[0]).format("DD-MM-YYYY"));
                setToDate(dayjs(dates[1]).format("DD-MM-YYYY"));
              }}
            />
            <Button variant="warning" className="mx-auto my-2" onClick={handel}>
              Check Availability
            </Button>
          </div>
          <Rooms
            rooms={modifiedRooms}
            onQuickBook={handleQuickBook}
            fromDate={fromDate}
            toDate={toDate}
          />
        </div>
      )}
    </>
  );
};

export default RoomScreen;
