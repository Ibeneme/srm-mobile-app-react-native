import React from 'react';
import {View, Text} from 'react-native';

interface CustomerInfoProps {
  firstName: string;
  lastName?: string;
}

const CustomerInfo: React.FC<CustomerInfoProps> = ({firstName, lastName}) => {
  const initials = `${firstName?.charAt(0)?.toUpperCase()}${lastName
    ?.charAt(0)
    ?.toUpperCase()}`;
  const assignedColor = getColorForAlphabet(initials?.charAt(0));

  return (
    <View
      style={{
        backgroundColor: assignedColor,
        width: 48,
        height: 48,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 48,
        marginVertical: 16,
      }}>
      <Text style={{color: '#fff', fontFamily: 'Plus Jakarta Sans Bold'}}>
        {initials}
      </Text>
    </View>
  );
};

// Function to get color based on alphabet
const getColorForAlphabet = (alphabet: string): string => {
  const colorMap: {[key: string]: string} = {
    A: 'orange',
    B: '#16B4A1',
    C: '#1962EF',
    D: '#B45816',
    E: '#DE4D93',
    F: 'brown',
    G: '#7B4DDE',
    H: '#4D64DE',
    I: 'orangered',
    // Add more alphabet-color mappings as needed
  };

  const defaultColor = 'gray'; // Default color if no mapping found

  // Use hash function to generate color based on alphabet
  const charCodeSum = Array.from(alphabet).reduce(
    (sum, char) => sum + char.charCodeAt(0),
    0,
  );
  const colorIndex = charCodeSum % Object.keys(colorMap).length;
  const colorKey = Object.keys(colorMap)[colorIndex];
  return colorMap[colorKey] || defaultColor;
};

export default CustomerInfo;
