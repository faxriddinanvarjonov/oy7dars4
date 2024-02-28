import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export let getData = createAsyncThunk("getData", async (e) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${
      e ? e : "uzbekistan"
    }&appid=b911304610ad9d67c10aa93a842bd351`
  )
    .then((res) => res.json())
    .finally(console.log(e));
});

export let weatherSlice = createSlice({
  name: "student",
  initialState: { weather: {}, status: "" },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getData.pending, (state, actions) => {
        state.status = "pending";
      })
      .addCase(getData.fulfilled, (state, actions) => {
        state.status = "succes";
        state.weather = actions.payload;
      })
      .addCase(getData.rejected, (state, actions) => {
        state.status = "rejected";
      });
  },
});

export default weatherSlice.reducer;
