import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios, {AxiosError} from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AxiosInstance from '../utils/AxiosInstance';

interface AuthState {
  user: [];
  loading: boolean;
  error: {} | null;
  access_token: string;
  userToken: any;
}
// interface PayloadType {
//   error: { message: string } | null;
// }



const initialState: AuthState = {
  user: [],
  loading: false,
  error: null,
  access_token: ' ',
  userToken: ' '
};

const baseApiUrl = 'https://srm.neofin.ng';

export const register = createAsyncThunk(
  'auth/register',
  async (userData: any) => {
    try {
      const response = await axios.post(
        `${baseApiUrl}/auth/register/`,
        userData,
      );
      console.log(response, 'Registration Response');
      return response.status;
    } catch (error) {
      console.log(error, 'Registration Error');
      return (error as AxiosError).response?.status;
    }
  },
);
export const setPassword = createAsyncThunk(
  'auth/setPassword',
  async (passwordData: any) => {
    try {
      const response = await axios.post(
        `${baseApiUrl}/auth/set-password/`,
        passwordData,
      );
      console.log(response, 'Set Password Response');
      return response.status;
    } catch (error) {
      console.error(error, 'Set Password Error');
      return (error as AxiosError).response?.status;
    }
  },
);
export const login = createAsyncThunk('auth/login', async (loginData: any) => {
  try {
    const response = await axios.post(`${baseApiUrl}/auth/login/`, loginData);
    console.log(response.data.access_token, 'Login Response');
    const srm_access_token = response?.data?.access_token;
    const srm_user = response?.data?.user;
    if (srm_access_token) {
      AsyncStorage.setItem('srm_access_token', srm_access_token);
    }
    if (srm_user?.access_token) {
      console.log('pls,', srm_user);
    }
    console.log(response.data, 'Lresponse.data');
    return response.data;
  } catch (error) {
    console.error(error, 'Login Error');
    return (error as AxiosError).response;
  }
});

export const otpVerification = createAsyncThunk(
  'auth/otpVerification',
  async (otpData: any) => {
    try {
      const response = await axios.post(
        `${baseApiUrl}/auth/validate-otp/`,
        otpData,
      );
      console.log(response.data, 'OTP Verification Response');
      return response.data;
    } catch (error) {
      console.log(error, 'OTP Verification Error');
      return (error as AxiosError).response?.data;
    }
  },
);

export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async (emailData: any) => {
    try {
      const response = await axios.post(
        `${baseApiUrl}/auth/request-password-reset/`,
        emailData,
      );
      console.log(response, 'Forgot Password Response');
      return response.status;
    } catch (error) {
      console.error(error, 'Forgot Password Error');
      return (error as AxiosError).response?.status;
    }
  },
);

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async (resetData: any) => {
    try {
      const response = await axios.post(
        `${baseApiUrl}/auth/confirm-password-reset/`,
        resetData,
      );
      console.log(response, 'Reset Password Response');
      return response.status;
    } catch (error) {
      console.error(error, 'Reset Password Error');
      return (error as AxiosError).response?.status;
    }
  },
);

export const resendOTP = createAsyncThunk(
  'auth/resendOTP',
  async (resendOTP: any) => {
    try {
      const response = await axios.post(
        `${baseApiUrl}/auth/resend-otp/`,
        resendOTP,
      );
      console.log(response, 'Resend OTP ');
      return response.status;
    } catch (error) {
      console.error(error, 'Reset Password Error');
      return (error as AxiosError).response?.status;
    }
  },
);

export const validateOTP = createAsyncThunk(
  'auth/validateOTP',
  async (validateOTP: any) => {
    try {
      const response = await axios.post(
        `${baseApiUrl}/auth/validate-otp/`,
        validateOTP,
      );
      console.log(response, 'Resend OTP ');
      return response.data;
    } catch (error) {
      console.error(error, 'Reset Password Error');
      return (error as AxiosError).response?.data;
    }
  },
);

export const confirmPasswordReset = createAsyncThunk(
  'auth/confirmPasswordReset',
  async (confirmPasswordReset: any) => {
    try {
      const response = await axios.post(
        `${baseApiUrl}/auth/confirm-password-reset/`,
        confirmPasswordReset,
      );
      console.log(response, 'Resend OTP ');
      return response.status;
    } catch (error) {
      console.error(error, 'Reset Password Error');
      return (error as AxiosError).response?.status;
    }
  },
);
//Ib@antigravitygroup.ng
//NewTesting1234@

export const addStaff = createAsyncThunk(
  'auth/addStaff',
  async (userData: any) => {
    const token = AsyncStorage.getItem('srm_access_token');
    console.log(token, 'srm_access_token')
    try {
      const response = await AxiosInstance.post(
        `${baseApiUrl}/auth/add-staff/`,
        userData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(userData, 'userData');
      console.log(response, 'addStaff Response');
      return response.status;
    } catch (error) {
      console.log(error, 'addStaff Error');
      return (error as AxiosError).response?.status;
    }
  },
);
export const logout = createAsyncThunk('auth/logout', async () => {
  try {
    // Clear the stored token and user data
    await AsyncStorage.removeItem('srm_access_token');
    await AsyncStorage.removeItem('srm_user');
    return;
  } catch (error) {
    console.log('Logout Error:', error);
    return error;
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logoutUs: state => {
      state.user = [];
    },
  },
  extraReducers: builder => {
    builder
      .addCase(register.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, state => {
        state.loading = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? (action.payload as string) : null;
      })
      .addCase(logout.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, state => {
        state.loading = false;
        state.user = [];
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? (action.payload as string) : null;
      });

    builder
      .addCase(resendOTP.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resendOTP.fulfilled, state => {
        state.loading = false;
      })
      .addCase(resendOTP.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? (action.payload as string) : null;
      });

    builder
      .addCase(setPassword.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(setPassword.fulfilled, state => {
        state.loading = false;
      })
      .addCase(setPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? (action.payload as string) : null;
      });

    builder
      .addCase(login.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.userToken = action.payload.access_Token;
        {
          console.log(action.payload, 'payload');
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as {detail?: string} | null)?.detail || null;
      });

    builder
      .addCase(otpVerification.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(otpVerification.fulfilled, state => {
        state.loading = false;
      })
      .addCase(otpVerification.rejected, (state, action) => {
        state.loading = false;
        {
          console.log(action.payload, 'llolll');
        }
        state.error = action.payload ? (action.payload as string) : null;
      });

    builder
      .addCase(forgotPassword.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, state => {
        state.loading = false;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? (action.payload as string) : null;
      });

    builder
      .addCase(resetPassword.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, state => {
        state.loading = false;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? (action.payload as string) : null;
      });
    builder
      .addCase(validateOTP.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(validateOTP.fulfilled, state => {
        state.loading = false;
      })
      .addCase(validateOTP.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? (action.payload as string) : null;
      });
    builder
      .addCase(confirmPasswordReset.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(confirmPasswordReset.fulfilled, state => {
        state.loading = false;
      })
      .addCase(confirmPasswordReset.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? (action.payload as string) : null;
      });
    builder
      .addCase(addStaff.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addStaff.fulfilled, state => {
        state.loading = false;
      })
      .addCase(addStaff.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? (action.payload as string) : null;
      });
  },
});

export default authSlice.reducer;
export const {logoutUs} = authSlice.actions;
