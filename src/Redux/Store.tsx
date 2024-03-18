import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./Auth/Auth";
import profileReducer from "./Profile/Profile";
import ticketReducer from "./Tickets/Tickets";
import feedbackReducer from "./Feedback/Feedback";

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  ticket: ticketReducer,
  feedback: feedbackReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
