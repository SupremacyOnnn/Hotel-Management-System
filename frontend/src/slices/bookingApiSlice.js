import { apiSlice } from "./apiSlice";
import { BOOKING_URL } from "../constant";

export const countryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllVillaBookingsInDateRange: builder.query({
      query: (bookingDetails) => ({
        url: `${BOOKING_URL}/bookingInRange`,
        method: "POST",
        body: bookingDetails,
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Booking"],
    }),
    createBooking: builder.mutation({
      query: (newBooking) => ({
        url: BOOKING_URL,
        method: "POST",
        body: newBooking,
      }),
      invalidatesTags: ["Booking"],
    }),
    getRoomsBookingByID: builder.query({
      query: (id) => ({
        url: `${BOOKING_URL}/${id}`,
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Booking"],
    }),
    getRoomsBookingByRoomID: builder.query({
      query: (findBooking) => ({
        url: `${BOOKING_URL}/roomBookingInRange`,
        body: findBooking,
        method: "POST",
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Booking"],
    }),
    getRoomsBookingByUserID: builder.query({
      query: (userId) => ({
        url: `${BOOKING_URL}/user/${userId}`,
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Booking"],
    }),
    getBookingByHotelIdInRange: builder.query({
      query: (findBooking) => ({
        url: `${BOOKING_URL}/hotel/inRange`,
        body: findBooking,
        method: "POST",
      }),
      keepUnusedDataFor: 5,
    }),
    getBookingByHotelIdPrev: builder.query({
      query: (findBooking) => ({
        url: `${BOOKING_URL}/hotel/prev`,
        body: findBooking,
        method: "POST",
      }),
      keepUnusedDataFor: 5,
    }),
    // getRoomsBookingByUserIDAfter: builder.query({
    //   query: (userId) => ({
    //     url: `${BOOKING_URL}/user/:userId/after`,
    //   }),
    //   keepUnusedDataFor: 5,
    //   providesTags: ["BookingS"],
    // }),
    // getRoomsBookingByUserIDBefore: builder.query({
    //   query: (userId) => ({
    //     url: `${BOOKING_URL}/user/:userId/before`,
    //   }),
    //   keepUnusedDataFor: 5,
    //   providesTags: ["BookingS"],
    // }),
  }),
});

export const {
  useGetAllVillaBookingsInDateRangeQuery,
  useCreateBookingMutation,
  useGetRoomsBookingByIDQuery,
  useGetRoomsBookingByRoomIDQuery,
  // useGetRoomsBookingByUserIDAfterQuery,
  // useGetRoomsBookingByUserIDBeforeQuery,
  useGetRoomsBookingByUserIDQuery,
  useGetBookingByHotelIdInRangeQuery,
  useGetBookingByHotelIdPrevQuery,
} = countryApiSlice;
