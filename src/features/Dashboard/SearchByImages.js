import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { showToast } from "../../utils";

export const searchByImages = createAsyncThunk(
  "dash/searchByImagess",
  async (link) => {
    console.log(link);
    const options = {
      method: "GET",
      url: "https://webit-image-search.p.rapidapi.com/reverse",
      params: {
        url: link,
        number: "10",
      },
      headers: {
        "X-RapidAPI-Key": "65a82f9d06msh8dfda57910dac51p15b9bajsn537c6178e361",
        "X-RapidAPI-Host": "webit-image-search.p.rapidapi.com",
      },
    };
    try {
      const response = await axios.request(options);
      return response.data;
    } catch (error) {
      showToast("Error occured while trying to get podcast results", "error");
      console.error(error);
    }
  }
);

export const searchByImagesSlice = createSlice({
  name: "searchByImages",
  initialState: {
    loading: false,
    error: null,
    data: null,
  },
  reducers: {},
  extraReducers: {
    [searchByImages.pending]: (state) => {
      state.loading = true;
      state.error = null;
      state.data = null;
    },
    [searchByImages.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
      state.data = action.payload;
    },
    [searchByImages.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.data = null;
    },
  },
});

export const selectSearchByImages = (state) => state.searchByImages;
export default searchByImagesSlice.reducer;
