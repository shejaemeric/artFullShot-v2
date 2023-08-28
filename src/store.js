import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import thunk from "redux-thunk";
import GetPinsReducer from "./features/Dashboard/GetPins";

const reducer = {
  GetPins: GetPinsReducer,
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
