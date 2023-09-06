import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import thunk from "redux-thunk";
import GetPinsReducer from "./features/Dashboard/GetPins";
import SearchByImagesReducer from "./features/Dashboard/SearchByImages";

const reducer = {
  GetPins: GetPinsReducer,
  SearchByImages: SearchByImagesReducer,
};

const middleware = [];

// eslint-disable-next-line no-undef
if (process.env.NODE_ENV === `development`) {
  middleware.push(logger);
}

export default configureStore({
  reducer,
  middleware: [thunk, ...middleware],
});
