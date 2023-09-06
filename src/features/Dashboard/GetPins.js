import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { showToast } from "../../utils";

export const getPins = createAsyncThunk("dash/getPins", async (keyword) => {
  const options = {
    method: "GET",
    url: "https://pinterest-downloader-download-pinterest-image-video-and-reels.p.rapidapi.com/api/basesearch",
    params: { query: keyword },
    headers: {
      "X-RapidAPI-Key": "65a82f9d06msh8dfda57910dac51p15b9bajsn537c6178e361",
      "X-RapidAPI-Host":
        "pinterest-downloader-download-pinterest-image-video-and-reels.p.rapidapi.com",
    },
  };
  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    showToast("Error occured while trying to get podcast results", "error");
    console.error(error);
  }
});

export const getPinsSlice = createSlice({
  name: "getPins",
  initialState: {
    loading: false,
    error: null,
    data: null,
  },
  reducers: {},
  extraReducers: {
    [getPins.pending]: (state) => {
      state.loading = true;
      state.error = null;
      state.data = null;
    },
    [getPins.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = null;
      state.data = action.payload;
    },
    [getPins.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.data = null;
    },
  },
});

export const selectGetPins = (state) => state.getPins;
export default getPinsSlice.reducer;
