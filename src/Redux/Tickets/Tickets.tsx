import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

import axios, {AxiosError} from 'axios';
import AxiosInstance from '../utils/AxiosInstance';
import useInternetConnectivity from '../../../AppNetwork';

interface TicketsState {
  tickets: any;
  loading: boolean;
  error: string | null;
}

const initialState: TicketsState = {
  tickets: null,
  loading: false,
  error: null,
};

const baseApiUrl = 'https://srm.neofin.ng';

export const createTicket = createAsyncThunk(
  'ticket/createTicket',
  async (createTicket: any, {rejectWithValue}) => {
    const token = await AsyncStorage.getItem('srm_access_token');

    try {
      const response = await AxiosInstance.post(
        `${baseApiUrl}/ticket/create-ticket/`,
        createTicket,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      //console.log(response, 'fm');
      return response.status;
    } catch (error) {
      //console.error(error, 'Organization Profile Update Error');
      if (axios.isAxiosError(error)) {
        if (error.message === 'Network Error') {
          //console.log('Network Error occurred');
          useInternetConnectivity()
        } else if (error.response?.status === 401) {
          await AsyncStorage.clear();
        }
        return rejectWithValue(error.response?.status);
      }
      return rejectWithValue('Network Error');
    }
  },
);

export const filterTicketStatus = createAsyncThunk(
  'ticket/filterTicketStatus',
  async (filterTicketStatus: any, {rejectWithValue}) => {
    const token = await AsyncStorage.getItem('srm_access_token');

    try {
      const response = await AxiosInstance.post(
        `${baseApiUrl}/ticket/filter-by-status/`,
        filterTicketStatus,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      //console.log(response, 'fm');
      return response.status;
    } catch (error) {
      //console.error(error, 'Organization Profile Update Error');
      if (axios.isAxiosError(error)) {
        if (error.message === 'Network Error') {
          //console.log('Network Error occurred');
          useInternetConnectivity()
        } else if (error.response?.status === 401) {
          await AsyncStorage.clear();
        }
        return rejectWithValue(error.response?.status);
      }
      return rejectWithValue('Network Error');
    }
  },
);

export const getAllTickets = createAsyncThunk(
  'profile/getAllTickets',
  async (_, {rejectWithValue}) => {
    const token = await AsyncStorage.getItem('srm_access_token');

    try {
      const response = await AxiosInstance.get(
        `${baseApiUrl}/ticket/all-tickets/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
     // //console.log(response.data);
      return response.data;
    } catch (error) {
      //console.error(error, 'Organization Profile Update Error');
      if (axios.isAxiosError(error)) {
        if (error.message === 'Network Error') {
          //console.log('Network Error occurred');
          useInternetConnectivity()
        } else if (error.response?.status === 401) {
          await AsyncStorage.clear();
        }
        return rejectWithValue(error.response?.status);
      }
      return rejectWithValue('Network Error');
    }
    
  },
);

export const getUsersTickets = createAsyncThunk(
  'ticket/getUsersTickets',
  async ({user_id}: {user_id: any}, {rejectWithValue}) => {
    const token = await AsyncStorage.getItem('srm_access_token');
    //console.log(user_id, 'user_id,');
    try {
      const response = await AxiosInstance.get(
        `${baseApiUrl}/ticket/get-user-tickets/${user_id}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      //console.log(response.data);
      return response.data;
    } catch (error) {
      //console.error(error, 'Organization Profile Update Error');
      if (axios.isAxiosError(error)) {
        if (error.message === 'Network Error') {
          //console.log('Network Error occurred');
          useInternetConnectivity()
        } else if (error.response?.status === 401) {
          await AsyncStorage.clear();
        }
        return rejectWithValue(error.response?.status);
      }
      return rejectWithValue('Network Error');
    }
  },
);

export const getTicketsByID = createAsyncThunk(
  'ticket/getTicketsByID',
  async ({ticket_id}: {ticket_id: any}, {rejectWithValue}) => {
    const token = await AsyncStorage.getItem('srm_access_token');
    //console.log(ticket_id, 'ticket_id,');
    try {
      const response = await AxiosInstance.get(
        `${baseApiUrl}/ticket/get-ticket/${ticket_id}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      //console.log(response.data);
      return response.data;
    } catch (error) {
      //console.error(error, 'Organization Profile Update Error');
      if (axios.isAxiosError(error)) {
        if (error.message === 'Network Error') {
          //console.log('Network Error occurred');
          useInternetConnectivity()
        } else if (error.response?.status === 401) {
          await AsyncStorage.clear();
        }
        return rejectWithValue(error.response?.status);
      }
      return rejectWithValue('Network Error');
    }
  },
);

export const updateTicket = createAsyncThunk(
  'ticket/updateTicket',
  async (
    {updateTicket, ticket_id}: {updateTicket: any; ticket_id: any},
    {rejectWithValue},
  ) => {
    const token = await AsyncStorage.getItem('srm_access_token');
    //console.log(updateTicket, ticket_id, 'ticket_idticket_id');
    try {
      const response = await AxiosInstance.put(
        `${baseApiUrl}/ticket/update-ticket/${ticket_id}/`,
        updateTicket, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      //console.log(response, 'fm');
      return response.status;
    } catch (error) {
      //console.error(error, 'Organization Profile Update Error');
      if (axios.isAxiosError(error)) {
        if (error.message === 'Network Error') {
          //console.log('Network Error occurred');
          useInternetConnectivity()
        } else if (error.response?.status === 401) {
          await AsyncStorage.clear();
        }
        return rejectWithValue(error.response?.status);
      }
      return rejectWithValue('Network Error');
    }
  },
);

export const setHandler = createAsyncThunk(
  'ticket/setHandler',
  async (
    {user_id, ticket_id}: {user_id: any; ticket_id: any},
    {rejectWithValue},
  ) => {
    const token = await AsyncStorage.getItem('srm_access_token');
    //console.log(user_id, ticket_id, 'ticket_idticket_id');
    try {
      const response = await AxiosInstance.get(
        `${baseApiUrl}/ticket/set-handler/${ticket_id}/${user_id}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      //console.log(response, 'fm');
      return response.status;
    } catch (error) {
      //console.error(error, 'Organization Profile Update Error');
      if (axios.isAxiosError(error)) {
        if (error.message === 'Network Error') {
          //console.log('Network Error occurred');
          useInternetConnectivity()
        } else if (error.response?.status === 401) {
          await AsyncStorage.clear();
        }
        return rejectWithValue(error.response?.status);
      }
      return rejectWithValue('Network Error');
    }
  },
);

export const deleteTicket = createAsyncThunk(
  'ticket/deleteTicket',
  async ({ticket_id}: {ticket_id: any}, {rejectWithValue}) => {
    const token = await AsyncStorage.getItem('srm_access_token');
    //console.log(ticket_id, 'ticket_idticket_id');
    try {
      const response = await AxiosInstance.delete(
        `${baseApiUrl}/ticket/delete-ticket/${ticket_id}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      //console.log(response, 'fm');
      return response.status;
    } catch (error) {
      //console.error(error, 'Organization Profile Update Error');
      if (axios.isAxiosError(error)) {
        if (error.message === 'Network Error') {
          //console.log('Network Error occurred');
          useInternetConnectivity()
        } else if (error.response?.status === 401) {
          await AsyncStorage.clear();
        }
        return rejectWithValue(error.response?.status);
      }
      return rejectWithValue('Network Error');
    }
  },
);
const TicketSlice = createSlice({
  name: 'ticket',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(createTicket.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTicket.fulfilled, (state, action) => {
        state.loading = false;
        state.tickets = action.payload;
      })
      .addCase(createTicket.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
          ? (action.payload as string)
          : 'Failed to fetch tickets';
      });
    builder
      .addCase(getTicketsByID.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTicketsByID.fulfilled, (state, action) => {
        state.loading = false;
        state.tickets = action.payload;
      })
      .addCase(getTicketsByID.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
          ? (action.payload as string)
          : 'Failed to fetch tickets';
      });
    builder
      .addCase(getAllTickets.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllTickets.fulfilled, (state, action) => {
        state.loading = false;
        state.tickets = action.payload;
      })
      .addCase(getAllTickets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
          ? (action.payload as string)
          : 'Failed to fetch profile';
      });
    builder
      .addCase(updateTicket.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTicket.fulfilled, (state, action) => {
        state.loading = false;
        state.tickets = action.payload;
      })
      .addCase(updateTicket.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
          ? (action.payload as string)
          : 'Failed to fetch profile';
      });
    builder
      .addCase(deleteTicket.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTicket.fulfilled, (state, action) => {
        state.loading = false;
        state.tickets = action.payload;
      })
      .addCase(deleteTicket.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
          ? (action.payload as string)
          : 'Failed to fetch profile';
      });
    builder
      .addCase(filterTicketStatus.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(filterTicketStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.tickets = action.payload;
      })
      .addCase(filterTicketStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
          ? (action.payload as string)
          : 'Failed to fetch profile';
      });
    builder
      .addCase(setHandler.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(setHandler.fulfilled, (state, action) => {
        state.loading = false;
        state.tickets = action.payload;
      })
      .addCase(setHandler.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
          ? (action.payload as string)
          : 'Failed to fetch profile';
      });
  },
});

export default TicketSlice.reducer;
