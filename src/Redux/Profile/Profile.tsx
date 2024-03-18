import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
//import axios from "axios";
import AxiosInstance from '../utils/AxiosInstance';
import axios, {AxiosError} from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
interface ProfileState {
  profile: any; // Adjust the type based on your profile data structure
  loading: boolean;
  error: string | null;
}

// interface TestState {
//   first_name: string;
// }

const initialState: ProfileState = {
  profile: null,
  loading: false,
  error: null,
};

const baseApiUrl = 'https://srm.neofin.ng';

export const getOrganizationProfile = createAsyncThunk(
  'profile/getOrganizationProfile',
  async () => {
    const token = AsyncStorage.getItem('srm_access_token');

    try {
      const response = await AxiosInstance.get(
        `${baseApiUrl}/profile/get-organization/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      return response.data;
    } catch (error) {
      console.log(error, 'errrr');
      const axiosError = error as AxiosError;
      return {
        message: axiosError.message,
        name: axiosError.name,
        code: axiosError.code,
        request: axiosError.request,
        response: {
          data: axiosError.response?.data,
          status: axiosError.response?.status,
          statusText: axiosError.response?.statusText,
          headers: axiosError.response?.headers,
          config: axiosError.config,
        },
        stack: axiosError.stack,
      };
    }
  },
);

export const getProfile = createAsyncThunk(
  'profile/getProfile',
  async (_, {rejectWithValue}) => {
    const token = AsyncStorage.getItem('srm_access_token');

    try {
      const response = await AxiosInstance.get(
        `${baseApiUrl}/profile/get-profile/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      return response.data;
    } catch (error) {
      console.error(error, 'Organization Profile Update Error');
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          await AsyncStorage.clear();
        }
        console.log(error.response?.status);
        return rejectWithValue(error.response?.status);
      }
      return rejectWithValue('Network Error');
    }
  },
);

export const getCustomers = createAsyncThunk(
  'profile/getCustomers',
  async (_, {rejectWithValue}) => {
    const token = AsyncStorage.getItem('srm_access_token');

    try {
      const response = await AxiosInstance.get(
        `${baseApiUrl}/profile/get-customers/${0}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      return response.data;
    } catch (error) {
      console.error(error, 'Organization Profile Update Error');
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          // Clear async storage and set user to null
          await AsyncStorage.clear();
          // Assuming you're using AsyncStorage
        }
        return rejectWithValue(error.response?.status);
      }
      return rejectWithValue('Network Error');
    }
  },
);

export const getDepartments = createAsyncThunk(
  'profile/getDepartments',
  async (_, {rejectWithValue}) => {
    const token = AsyncStorage.getItem('srm_access_token');

    try {
      const response = await AxiosInstance.get(
        `${baseApiUrl}/profile/get-departments/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      return response.data;
    } catch (error) {
      console.error(error, 'Organization Profile Update Error');
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          // Clear async storage and set user to null
          await AsyncStorage.clear();
          // Assuming you're using AsyncStorage
        }
        return rejectWithValue(error.response?.status);
      }
      return rejectWithValue('Network Error');
    }
  },
);

export const createDepartment = createAsyncThunk(
  'auth/createDepartment',
  async (createDepartment: any, {rejectWithValue}) => {
    const token = AsyncStorage.getItem('srm_access_token');

    try {
      // const formData = new FormData();
      // Object.keys(createDepartment).forEach((key) => {
      //   formData.append(key, createDepartment[key]);
      // });

      const response = await AxiosInstance.post(
        `${baseApiUrl}/profile/create-department/`,
        createDepartment,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(createDepartment, 'fm');
      return response.status;
    } catch (error) {
      console.error(error, 'Organization Profile Update Error');
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          // Clear async storage and set user to null
          await AsyncStorage.clear();
          // Assuming you're using AsyncStorage
        }
        return rejectWithValue(error.response?.status);
      }
      return rejectWithValue('Network Error');
    }
  },
);

export const createUser = createAsyncThunk(
  'auth/createUser',
  async (createUser: any, {rejectWithValue}) => {
    const token = AsyncStorage.getItem('srm_access_token');

    try {
      // const formData = new FormData();
      // Object.keys(createUser).forEach((key) => {
      //   formData.append(key, createUser[key]);
      // });

      const response = await AxiosInstance.post(
        `${baseApiUrl}/auth/add-staff/`,
        createUser,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(createUser, 'fm');
      return response.status;
    } catch (error) {
      console.error(error, 'Organization Profile Update Error');
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          // Clear async storage and set user to null
          await AsyncStorage.clear();
          // Assuming you're using AsyncStorage
        }
        return rejectWithValue(error.response?.status);
      }
      return rejectWithValue('Network Error');
    }
  },
);

export const AddFrontDesk = createAsyncThunk(
  'auth/AddFrontDesk',
  async (AddFrontDesk: any, {rejectWithValue}) => {
    const token = AsyncStorage.getItem('srm_access_token');

    try {
      // const formData = new FormData();
      // Object.keys(AddFrontDesk).forEach((key) => {
      //   formData.append(key, AddFrontDesk[key]);
      // });

      const response = await AxiosInstance.post(
        `${baseApiUrl}/profile/add-frontdesk/`,
        AddFrontDesk,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(AddFrontDesk, 'fm');
      return response.status;
    } catch (error) {
      console.error(error, 'Organization Profile Update Error');
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          // Clear async storage and set user to null
          await AsyncStorage.clear();
          // Assuming you're using AsyncStorage
        }
        return rejectWithValue(error.response?.status);
      }
      return rejectWithValue('Network Error');
    }
  },
);

export const editDepartment = createAsyncThunk(
  'auth/editDepartment',
  async (
    {editDepartment, department}: {editDepartment: any; department: string},
    {rejectWithValue},
  ) => {
    const token = AsyncStorage.getItem('srm_access_token');
    console.log(editDepartment, department, 'departmentdepartment');
    try {
      const response = await AxiosInstance.put(
        `${baseApiUrl}/profile/update-department/${department}/`,
        editDepartment, // Pass editDepartment directly as the request body
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(response, 'fm');
      return response.status;
    } catch (error) {
      console.error(error, 'Organization Profile Update Error');
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          // Clear async storage and set user to null
          await AsyncStorage.clear();
          // Assuming you're using AsyncStorage
        }
        return rejectWithValue(error.response?.status);
      }
      return rejectWithValue('Network Error');
    }
  },
);

export const updateStaff = createAsyncThunk(
  'auth/updateStaff',
  async (
    {updateStaff, user_id}: {updateStaff: any; user_id: string},
    {rejectWithValue},
  ) => {
    const token = AsyncStorage.getItem('srm_access_token');
    console.log(updateStaff, user_id, 'user_iduser_id');
    try {
      const response = await AxiosInstance.put(
        `${baseApiUrl}/profile/update-staff/${user_id}/`,
        updateStaff, // Pass updateStaff directly as the request body
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(response, 'fm');
      return response.status;
    } catch (error) {
      console.error(error, 'Organization Profile Update Error');
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          // Clear async storage and set user to null
          await AsyncStorage.clear();
          // Assuming you're using AsyncStorage
        }
        return rejectWithValue(error.response?.status);
      }
      return rejectWithValue('Network Error');
    }
  },
);

export const deleteStaff = createAsyncThunk(
  'auth/deleteStaff',
  async (user_id: any, {rejectWithValue}) => {
    const token = AsyncStorage.getItem('srm_access_token');
    console.log(user_id, user_id, 'departmentdepartment');
    try {
      const response = await AxiosInstance.delete(
        `${baseApiUrl}/profile/delete-staff/${user_id}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(response, 'fm');
      return response.status;
    } catch (error) {
      console.error(error, 'Organization Profile Update Error');
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          // Clear async storage and set user to null
          await AsyncStorage.clear();
          // Assuming you're using AsyncStorage
        }
        return rejectWithValue(error.response?.status);
      }
      return rejectWithValue('Network Error');
    }
  },
);

export const deleteDepartment = createAsyncThunk(
  'auth/deleteDepartment',
  async (deleteDepartment: any, {rejectWithValue}) => {
    const token = AsyncStorage.getItem('srm_access_token');
    console.log(deleteDepartment, deleteDepartment, 'departmentdepartment');
    try {
      const response = await AxiosInstance.delete(
        `${baseApiUrl}/profile/delete-department/${deleteDepartment}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(response, 'fm');
      return response.status;
    } catch (error) {
      console.error(error, 'Organization Profile Update Error');
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          // Clear async storage and set user to null
          await AsyncStorage.clear();
          // Assuming you're using AsyncStorage
        }
        return rejectWithValue(error.response?.status);
      }
      return rejectWithValue('Network Error');
    }
  },
);

export const updateOrganizationProfile = createAsyncThunk(
  'auth/updateOrganizationProfile',
  async (updatedProfile: any, {rejectWithValue}) => {
    console.log(updatedProfile, ' hhhhh');
    const token = AsyncStorage.getItem('srm_access_token');
    try {
      const response = await AxiosInstance.put(
        `${baseApiUrl}/profile/update-organization/`,
        updatedProfile,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(response, 'Organization Profile Update Response');
      return response.status;
    } catch (error) {
      console.log(error, 'Organization Profile Update Error');
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          // Clear async storage and set user to null
          await AsyncStorage.clear();
          // Assuming you're using AsyncStorage
        }
        return rejectWithValue(error.response?.status);
      }
      return rejectWithValue('Network Error');
    }
  },
);

export const updatePersonalProfile = createAsyncThunk(
  'auth/updatePersonalProfile',
  async (updatePersonalProfile: any, {rejectWithValue}) => {
    const token = AsyncStorage.getItem('srm_access_token');

    try {
      const formData = new FormData();
      Object.keys(updatePersonalProfile).forEach(key => {
        formData.append(key, updatePersonalProfile[key]);
      });

      const response = await AxiosInstance.put(
        `${baseApiUrl}/profile/update-data/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      return response.status;
    } catch (error) {
      console.error(error, 'Organization Profile Update Error');
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          // Clear async storage and set user to null
          await AsyncStorage.clear();
          // Assuming you're using AsyncStorage
        }
        return rejectWithValue(error.response?.status);
      }
      return rejectWithValue('Network Error');
    }
  },
);
export const importStaff = createAsyncThunk(
  'auth/importStaff',
  async (formData: FormData, {rejectWithValue}) => {
    const token = AsyncStorage.getItem('srm_access_token');

    try {
      const response = await AxiosInstance.post(
        `${baseApiUrl}/auth/import-staff/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      console.log(response);
      return response.status;
    } catch (error) {
      console.error(error, 'Organization Profile Update Error');
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          // Clear async storage and set user to null
          await AsyncStorage.clear();
          // Assuming you're using AsyncStorage
        }
        return rejectWithValue(error.response?.status);
      }
      return rejectWithValue('Network Error');
    }
  },
);

export const getUserCSV = createAsyncThunk('profile/getUserCSV', async () => {
  const token = AsyncStorage.getItem('srm_access_token');

  try {
    const response = await AxiosInstance.get(
      `${baseApiUrl}/profile/export-users/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  } catch (error) {
    return error;
  }
});

export const getAllUsers = createAsyncThunk(
  'profile/getAllUsers',
  async (_, {rejectWithValue}) => {
    const token = AsyncStorage.getItem('srm_access_token');

    try {
      const response = await AxiosInstance.get(
        `${baseApiUrl}/profile/all-users/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error, 'Organization Profile Update Error');
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          // Clear async storage and set user to null
          await AsyncStorage.clear();
          // Assuming you're using AsyncStorage
        }
        return rejectWithValue(error.response?.status);
      }
      return rejectWithValue('Network Error');
    }
  },
);

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getOrganizationProfile.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrganizationProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(getOrganizationProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
          ? (action.payload as string)
          : 'Failed to fetch profile';
      });
      builder
      .addCase(createUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
          ? (action.payload as string)
          : 'Failed to fetch profile';
      });
    builder
      .addCase(getCustomers.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCustomers.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(getCustomers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
          ? (action.payload as string)
          : 'Failed to fetch profile';
      });
    builder
      .addCase(getProfile.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
          ? (action.payload as string)
          : 'Failed to fetch profile';
      });

    builder
      .addCase(updateOrganizationProfile.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOrganizationProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(updateOrganizationProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
          ? (action.payload as string)
          : 'Failed to update profile';
      });
    builder
      .addCase(updatePersonalProfile.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePersonalProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(updatePersonalProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
          ? (action.payload as string)
          : 'Failed to update profile';
      });
    builder
      .addCase(getDepartments.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDepartments.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(getDepartments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
          ? (action.payload as string)
          : 'Failed to update profile';
      });
    builder
      .addCase(createDepartment.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createDepartment.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(createDepartment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
          ? (action.payload as string)
          : 'Failed to update profile';
      });
    builder
      .addCase(getUserCSV.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserCSV.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(getUserCSV.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
          ? (action.payload as string)
          : 'Failed to update profile';
      });
    builder
      .addCase(importStaff.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(importStaff.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(importStaff.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
          ? (action.payload as string)
          : 'Failed to update profile';
      });
    builder
      .addCase(getAllUsers.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
          ? (action.payload as string)
          : 'Failed to update profile';
      });
    builder
      .addCase(editDepartment.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editDepartment.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(editDepartment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
          ? (action.payload as string)
          : 'Failed to update profile';
      });
    builder
      .addCase(deleteDepartment.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteDepartment.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(deleteDepartment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
          ? (action.payload as string)
          : 'Failed to update profile';
      });
    builder
      .addCase(updateStaff.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateStaff.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(updateStaff.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
          ? (action.payload as string)
          : 'Failed to update profile';
      });
    builder
      .addCase(deleteStaff.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteStaff.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(deleteStaff.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
          ? (action.payload as string)
          : 'Failed to update profile';
      });
    builder
      .addCase(AddFrontDesk.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(AddFrontDesk.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(AddFrontDesk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
          ? (action.payload as string)
          : 'Failed to update profile';
      });
  },
});

export default profileSlice.reducer;
