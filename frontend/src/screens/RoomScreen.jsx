import React from "react";
import Rooms from "../components/Rooms";
import { DatePicker } from "antd";
import moment from "moment";
const { RangePicker } = DatePicker;

const RoomScreen = () => {
  const disabledDate = (current) => {
    // Disable all previous dates
    if (current && current < moment().startOf("day")) {
      return true;
    }

    // Disable dates after 3 months from today
    if (current && current > moment().add(3, "months").endOf("day")) {
      return true;
    }

    return false;
  };

  return (
    <div>
      <RangePicker disabledDate={disabledDate} />
      <Rooms />
    </div>
  );
};

export default RoomScreen;
