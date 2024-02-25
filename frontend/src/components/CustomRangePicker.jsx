import React from "react";
import { DatePicker } from "antd";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;

const CustomRangePicker = ({ defaultValue, onChange }) => {
  const disabledDate = (current) => {
    if (current && current < dayjs().startOf("day")) {
      return true;
    }
    if (current && current > dayjs().add(1, "month").endOf("day")) {
      return true;
    }
    return false;
  };
  return (
    <RangePicker
      style={{ height: "38px" }}
      onChange={onChange}
      format="DD-MM-YYYY"
      disabledDate={disabledDate}
      className="mx-auto my-2"
      defaultValue={defaultValue}
      allowClear={false}
    />
  );
};

export default CustomRangePicker;
