import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, {AxiosError} from 'axios';

const AxiosInstance = axios.create();

AxiosInstance.interceptors.request.use(
  async config => {
    const accessToken = await AsyncStorage.getItem('srm_access_token');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

export const handleUnauthorizedError = async () => {
  await AsyncStorage.removeItem('srm_access_token');
};

AxiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  async (error: AxiosError) => {
    if (error.response && error.response.status === 401) {
      await handleUnauthorizedError();
    }

    return Promise.reject(error);
  },
);

export default AxiosInstance;
