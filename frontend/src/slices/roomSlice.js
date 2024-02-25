import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  room: localStorage.getItem("room")
    ? JSON.parse(localStorage.getItem("room"))
    : null,
};

const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    setRoom: (state, action) => {
      state.room = action.payload;
      localStorage.setItem("room", JSON.stringify(action.payload));
    },
    removeRoom: (state, action) => {
      state.room = null;
      // NOTE: here we need to also remove the cart from storage so the next
      // logged in user doesn't inherit the previous users cart and shipping
      localStorage.clear();
    },
  },
});

export const { setRoom, removeRoom } = roomSlice.actions;

export default roomSlice.reducer;
