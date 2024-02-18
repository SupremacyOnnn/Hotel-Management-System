import { apiSlice } from "./apiSlice";
import { COUNTRY_URL } from "../constant";

export const countryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCountries: builder.query({
      query: () => ({
        url: COUNTRY_URL,
        method: "GET",
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Country"],
    }),
    createCountries: builder.mutation({
      query: (newCountry) => ({
        url: COUNTRY_URL,
        method: "POST",
        body: newCountry,
      }),
      invalidatesTags: ["Country"],
    }),
  }),
});

export const { useGetCountriesQuery, useCreateCountriesMutation } =
  countryApiSlice;
