import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../api";

const initialState = {
  countries: [],
  country: {},
};

export const getCountries = createAsyncThunk(
  "getFilmsByCountries/getCountryes",

  async function (_, { rejectWithValue }) {
    try {
      const item = await api.get("country/allCountry");
      return item.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getCountryById = createAsyncThunk(
  "country/getCountryById",
  async function (id, { rejectWithValue }) {
    try {
      const item = await api.get("country/getcountryById", {
        headers: {
          id,
        },
      });
      return item.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const countriesSlice = createSlice({
  name: "filmsByCountries",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCountries.fulfilled, (state, action) => {
        state.countries = action.payload;
      })
      .addCase(getCountryById.fulfilled, (state, action) => {
        state.country = action.payload;
      });
  },
});

export const selectCountries = (state) => state.countries.countries;
export const selectCountry = (state) => state.countries.country;
export default countriesSlice.reducer;
