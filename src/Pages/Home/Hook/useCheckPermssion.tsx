import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {getProfile} from '../../../Redux/Profile/Profile';
import {AppDispatch} from '../../../Redux/Store';

const useUserPermission = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [userPermission, setUserPermission] = useState<string>('');

  useEffect(() => {
    const fetchUserPermission = async () => {
      try {
        const response = await dispatch(getProfile());
        setUserPermission(response?.payload.permission_type ?? '');
      } catch (error) {
        console.error('Error fetching user permission:', error);
      }
    };

    fetchUserPermission();

    // Cleanup function (optional)
    return () => {
      // Perform cleanup if needed
    };
  }, [dispatch]);

  return userPermission;
};

export default useUserPermission;
