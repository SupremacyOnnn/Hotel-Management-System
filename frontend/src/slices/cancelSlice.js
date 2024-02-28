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
      keepUnusedDataFor: 5,
      invalidatesTags: ["Booking", "Cancel"],
    }),
    getAllCancelBooking: builder.query({
      query: () => ({
        url: CANCEL_URL,
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Cancel"],
    }),
    getCancelBookingById: builder.query({
      query: (id) => ({
        url: `${CANCEL_URL}/${id}`,
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Cancel"],
    }),
    getAllCancelBookingByHotelId: builder.query({
      query: (hotelId) => ({
        url: `${CANCEL_URL}/hotel/${hotelId}`,
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Cancel"],
    }),
    getAllCancelBookingByRoomId: builder.query({
      query: (roomId) => ({
        url: `${CANCEL_URL}/room/${roomId}`,
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Cancel"],
    }),
    getAllCancelBookingByUserId: builder.query({
      query: (userId) => ({
        url: `${CANCEL_URL}/user/${userId}`,
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Cancel"],
    }),
    updateCancelBooking: builder.mutation({
      query: ({ id, updates }) => ({
        url: `${CANCEL_URL}/${id}/update`,
        method: "PATCH",
        body: updates,
      }),
      keepUnusedDataFor: 5,
      invalidatesTags: ["Cancel"],
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
  useUpdateCancelBookingMutation,
} = cancelApiSlice;
