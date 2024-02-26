import { apiSlice } from "./apiSlice";
import { CANCEL_URL } from "../constant";

export const cancelApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCancelBooking: builder.mutation({
      query: (newBooking) => ({
        url: CANCEL_URL,
        method: "POST",
        body: newBooking,
      }),
      invalidatesTags: ["Booking", "Cancel"],
    }),
    getAllCancelBooking: builder.query({
      query: () => ({
        url: CANCEL_URL,
      }),
      providesTags: ["Cancel"],
    }),
    getCancelBookingById: builder.query({
      query: (id) => ({
        url: `${CANCEL_URL}/${id}`,
      }),
      providesTags: ["Cancel"],
    }),
    getAllCancelBookingByHotelId: builder.query({
      query: (hotelId) => ({
        url: `${CANCEL_URL}/hotel/${hotelId}`,
      }),
      providesTags: ["Cancel"],
    }),
    getAllCancelBookingByRoomId: builder.query({
      query: (roomId) => ({
        url: `${CANCEL_URL}/room/${roomId}`,
      }),
      providesTags: ["Cancel"],
    }),
    getAllCancelBookingByUserId: builder.query({
      query: (userId) => ({
        url: `${CANCEL_URL}/user/${userId}`,
      }),
      providesTags: ["Cancel"],
    }),
  }),
});

export const {
  useCreateCancelBookingMutation,
  useGetAllCancelBookingQuery,
  useGetCancelBookingByIdQuery,
  useGetAllCancelBookingByHotelIdQuery,
  useGetAllCancelBookingByRoomIdQuery,
  useGetAllCancelBookingByUserIdQuery,
} = cancelApiSlice;
