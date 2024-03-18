import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AxiosInstance from "../utils/AxiosInstance";
import AsyncStorage from "@react-native-async-storage/async-storage";
//import axios from "axios";

interface FeedbackState {
  feedbacks: any[];
  loading: boolean;
  error: string | null;
}

const initialState: FeedbackState = {
  feedbacks: [],
  loading: false,
  error: null,
};

// interface FeedbackData {
//   feedbackData: FormData;
// }

interface CreateFeedbackArgs {
  organization_id: string | null;
  feedbackData: FormData;
}

const baseApiUrl = "https://srm.neofin.ng";

export const createFeedback = createAsyncThunk(
  "feedback/createFeedback",
  async ({ organization_id, feedbackData }: CreateFeedbackArgs) => {
    try {
      const response = await AxiosInstance.post(
        `${baseApiUrl}/ticket/create-feedback/${organization_id}/`,
        feedbackData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(error, "Get All Feedbacks Error");
      throw error;
    }
  }
);

export const getAllFeedbacks = createAsyncThunk(
  "feedback/getAllFeedbacks",
  async () => {
    const token = AsyncStorage.getItem("srm_access_token");

    try {
      const response = await AxiosInstance.get(
        `${baseApiUrl}/ticket/get-feedbacks/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(error, "Get All Feedbacks Error");
      throw error;
    }
  }
);

export const FilterFeedback = createAsyncThunk(
  "feedback/FilterFeedback",
  async (project_name: any) => {
    const token = AsyncStorage.getItem("srm_access_token");
    console.log(project_name, " project_name");
    try {
      const response = await AxiosInstance.post(
        `${baseApiUrl}/ticket/filter-feedbacks/`,
        project_name,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(error, "Get All Feedbacks Error");
      throw error;
    }
  }
);

export const SingleFeedback = createAsyncThunk(
  "feedback/SingleFeedback",
  async (feeedback_id: string) => {
    const token = AsyncStorage.getItem("srm_access_token");
    console.log(feeedback_id, " project_name");
    try {
      const response = await AxiosInstance.get(
        `${baseApiUrl}/ticket/get-single-feedback/${feeedback_id}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data, "SingleFeedback");
      return response.data;
    } catch (error) {
      console.log(error, "Get All Feedbacks Error");
      throw error;
    }
  }
);

const FeedbackSlice = createSlice({
  name: "feedback",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createFeedback.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createFeedback.fulfilled, (state, action) => {
        state.loading = false;
        state.feedbacks.push(action.payload);
      })
      .addCase(createFeedback.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
          ? (action.payload as string)
          : "Failed to create feedback";
      });
    builder
      .addCase(getAllFeedbacks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllFeedbacks.fulfilled, (state, action) => {
        state.loading = false;
        state.feedbacks = action.payload;
      })
      .addCase(getAllFeedbacks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
          ? (action.payload as string)
          : "Failed to fetch feedbacks";
      });
    builder
      .addCase(FilterFeedback.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(FilterFeedback.fulfilled, (state, action) => {
        state.loading = false;
        state.feedbacks = action.payload;
      })
      .addCase(FilterFeedback.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
          ? (action.payload as string)
          : "Failed to fetch feedbacks";
      });
    builder
      .addCase(SingleFeedback.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(SingleFeedback.fulfilled, (state, action) => {
        state.loading = false;
        state.feedbacks = action.payload;
      })
      .addCase(SingleFeedback.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
          ? (action.payload as string)
          : "Failed to fetch feedbacks";
      });
  },
});

export default FeedbackSlice.reducer;
