import React from 'react';
import {Pressable, StyleSheet, Text, PressableProps} from 'react-native';

interface FilterButtonProps {
  filter: string;
  selected: boolean;
  onPress: (filter: string) => void;
}

const FilterButton: React.FC<FilterButtonProps> = ({
  filter,
  selected,
  onPress,
  ...props
}) => {
  return (
    <Pressable
      style={[styles.filterButton, selected && styles.selectedFilterButton]}
      onPress={() => onPress(filter)}
      {...props}>
      <Text style={[styles.filterText, selected && styles.selectedFilterText]}>
        {filter}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  filterButton: {
    paddingHorizontal: 24,
    borderRadius: 12,
    marginRight: 10,
    paddingVertical: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    backgroundColor: '#ff6b0025',
  },
  selectedFilterButton: {
    backgroundColor: '#ff6b00', // Active color
    borderColor: '#ff6b00', // Active color
  },
  filterText: {
    color: '#ff6b00',
    fontFamily: 'Plus Jakarta Sans SemiBold',
  },
  selectedFilterText: {
    color: '#fff',
    fontFamily: 'Plus Jakarta Sans SemiBold',
  },
});

export default FilterButton;
