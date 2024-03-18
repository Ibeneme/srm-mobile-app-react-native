import {
  ActivityIndicator,
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  //Pressable,
  View,
  useWindowDimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import {useFocusEffect, useNavigation} from '@react-navigation/native';
import Icon from 'react-native-remix-icon';
import CustomHeader from '../../../constants/Headers';
import {Colors} from '../../../constants/Colors';
import {useTheme} from '../../../context/ThemeProvidr';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../../Redux/Store';
import {deleteDepartment, getDepartments} from '../../../Redux/Profile/Profile';
import LoadingComponent from '../../../components/Loading';
import ErrorComponent from '../../../components/Err';

// Define Department interface
interface Department {
  id: string;
  name: string;
  description: string;
}

type Props = {};

const Department = (props: Props) => {
  const navigation = useNavigation();
  const {isDarkModeEnabled, theme} = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  const [depts, setDepts] = useState<Department[]>([]); // Set type as Department[]
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDept, setSelectedDept] = useState<Department | null>(null); // Track selected department
  const {fontScale} = useWindowDimensions();
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);
  const [network, setNetwork] = useState(false);

  const handleGetDepts = () => {
    setPageLoading(true);
    setNetwork(false);
    dispatch(getDepartments())
      .then(response => {
        setPageLoading(false);
        if (response?.payload?.message === 'Network Error') {
          setPageLoading(true);
          setNetwork(true);
        } else if (response?.payload?.message) {
          setNetwork(true);
          setPageLoading(true);
        } else {
          console.log('Departments fetched successfully:', response?.payload);
          setDepts(response?.payload);
          setModalVisible(false);
          setPageLoading(false);
        }
      })
      .catch(error => {
        setPageLoading(false);
      });
  };

  useEffect(() => {
    handleGetDepts();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      handleGetDepts();
    }, []),
  );

  const handleDeletePress = (dept: Department) => {
    setSelectedDept(dept); // Set selected department
    setModalVisible(true); // Open modal
  };

  const handleDeleteConfirm = () => {
    if (selectedDept) {
      setLoading(true);
      console.log('Selected Department ID:', selectedDept?.id);
      console.log('Selected Department Name:', selectedDept?.name);
      dispatch(deleteDepartment(selectedDept?.id))
        .then(response => {
          setLoading(false);
          console.log('Departments fetched successfully:', response?.payload);
          if (response.payload === 200) {
            handleGetDepts();
          }
        })
        .catch(error => {
          setLoading(false);
        });
    }
    //setModalVisible(false); // Close modal
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: isDarkModeEnabled ? theme.background : Colors.white,

        flex: 1,
      }}>
      <CustomHeader />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <View style={styles.centeredView}>
          <View
            style={[
              styles.modalView,
              {
                backgroundColor: isDarkModeEnabled ? theme.background : '#fff',
                borderColor: Colors?.darkOrange,
                borderWidth: 1,
                paddingVertical: 32,
                margin: 24,
              },
            ]}>
            <Text
              style={[
                {
                  fontSize: 18 * fontScale,

                  color: isDarkModeEnabled ? '#fff' : '#121212',
                  fontFamily: 'Plus Jakarta Sans Bold',
                  textAlign: 'center',
                },
              ]}>
              <Text style={{color: Colors.darkOrange}}>
                {' '}
                {selectedDept?.name}{' '}
              </Text>
              Department will be Deleted
            </Text>
            <Text
              style={[
                styles.modalText,
                {
                  fontSize: 14,
                  color: isDarkModeEnabled ? '#fff' : '#121212',
                  fontFamily: 'Plus Jakarta Sans Regular',
                  marginVertical: 10,
                },
              ]}>
              Are you sure you want to log out?
            </Text>
            <View style={styles.buttonContainer}>
              <Pressable
                style={[
                  {
                    backgroundColor: '#ff6b00',
                    padding: 12,
                    height: 55,
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '50%',
                    borderRadius: 12,
                  },
                ]}
                onPress={handleDeleteConfirm}>
                <Text
                  style={[
                    styles.buttonText,
                    {fontFamily: 'Plus Jakarta Sans Regular'},
                  ]}>
                  {loading ? <ActivityIndicator color="#fff" /> : 'Proceed'}
                </Text>
              </Pressable>
              <Pressable
                style={[
                  {
                    borderColor: '#ff6b00',
                    borderWidth: 1,
                    padding: 12,
                    height: 55,
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '50%',
                    borderRadius: 12,
                  },
                ]}
                onPress={() => setModalVisible(false)}>
                <Text
                  style={[
                    styles.buttonText,
                    {color: '#ff6b00', fontFamily: 'Plus Jakarta Sans Regular'},
                  ]}>
                  Cancel
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      {pageLoading ? (
        <LoadingComponent />
      ) : (
        <>
          <Pressable
            onPress={() => navigation.navigate('DepartmentAdd' as never)}
            style={[
              {
                //opacity: pressed ? 0.5 : 1,
                borderColor: '#ff6b00',
                borderWidth: 1,
                padding: 16,
                marginTop: 24,
                borderRadius: 12,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#ff6b00',
                margin: 12,
                width: 180,
              },
            ]}>
            <Text
              style={{fontFamily: 'Plus Jakarta Sans SemiBold', color: '#fff'}}>
              Add a Department +
            </Text>
          </Pressable>

          {depts?.map((dept, index) => (
            <Pressable
              //onPress={() => navigation.navigate('ProfileDetails' as never)}
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
                padding: 16,
              }}
              key={index}>
              <View>
                <Text
                  style={{
                    fontFamily: 'Plus Jakarta Sans SemiBold',
                    fontSize: 16,
                    color: !isDarkModeEnabled ? '#121212' : Colors.white,
                  }}>
                  {dept?.name} {/* Display department name */}
                </Text>
                <Text
                  style={{
                    fontFamily: 'Plus Jakarta Sans Regular',
                    fontSize: 14,
                    color: '#808080',
                  }}>
                  {dept?.description} {/* Display department description */}
                </Text>
              </View>

              <View style={{flexDirection: 'row', gap: 16}}>
                <Pressable
                  style={{
                    backgroundColor: '#ff6b0025',
                    padding: 12,
                    borderRadius: 12,
                  }}
                  onPress={() =>
                    navigation.navigate('DepartmentEdit', {
                      department: dept,
                    } as never)
                  }>
                  <Icon
                    name="edit-2-fill"
                    size={16}
                    color={Colors?.darkOrange}
                    //onPress={handleNotificationPress}
                  />
                </Pressable>

                <Pressable
                  style={{
                    backgroundColor: '#ff6b0025',
                    padding: 12,
                    borderRadius: 12,
                  }}
                  onPress={() => handleDeletePress(dept)}>
                  <Icon
                    name="delete-bin-6-fill"
                    size={16}
                    color={Colors?.darkOrange}
                    //onPress={handleNotificationPress}
                  />
                </Pressable>
              </View>
            </Pressable>
          ))}
        </>
      )}
      {network ? <ErrorComponent /> : null}
    </SafeAreaView>
  );
};

export default Department;

const styles = StyleSheet.create({
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    elevation: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalText: {
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    alignItems: 'center',
    gap: 12,
    marginTop: 24,
  },
  button: {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
});
