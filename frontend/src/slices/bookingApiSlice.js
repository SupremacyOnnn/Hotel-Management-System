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
  }),
});

export const {
  useGetAllVillaBookingsInDateRangeQuery,
  useCreateBookingMutation,
} = countryApiSlice;
