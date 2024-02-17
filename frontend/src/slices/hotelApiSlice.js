import { HOTEL_URL } from "../constant";
import { apiSlice } from "./apiSlice";

export const hotelApiSLice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getHotels: builder.query({
      query: () => ({
        url: HOTEL_URL,
      }),
      keepUnusedDataFor: 5,
    }),
    getHotelByCountry: builder.query({
      query: (country) => ({
        url: `${HOTEL_URL}/hotels/${country}`,
      }),
      keepUnusedDataFor: 5,
    }),
    getHotelByID: builder.query({
      query: (id) => ({
        url: `${HOTEL_URL}/hotel/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useGetHotelsQuery,
  useGetHotelByCountryQuery,
  useGetHotelByIDQuery,
} = hotelApiSLice;
