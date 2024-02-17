import { ROOM_URL } from "../constant";
import { apiSlice } from "./apiSlice";

export const roomApiSLice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllRooms: builder.query({
      query: () => ({
        url: ROOM_URL,
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Hotel"],
    }),
    getRoomsByHotelID: builder.query({
      query: (id) => ({
        url: `${ROOM_URL}/${id}`,
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Hotel"],
    }),
  }),
});

export const { useGetAllRoomsQuery, useGetRoomsByHotelIDQuery } = roomApiSLice;
