import React, { Component } from 'react';
import { Platform } from 'react-native';
import { HeaderButton } from 'react-navigation-header-buttons';
import { ionicons, Ionicons } from '@expo/vector-icons';
const CustomheaderButton = (props) => {
  return (
    <HeaderButton
      {...props}
      IconComponent={Ionicons}
      iconSize={23}
      color={Platform.OS === 'android' ? 'white' : 'lightblue'}
    />
  );
};

export default CustomheaderButton;
