import { configureStore } from "@reduxjs/toolkit";
import weather from "./weather";

export let store = configureStore({
  reducer: {
    weather: weather,
    student: weather,
  },
});
