import React, { Component } from 'react';
import { Text, StyleSheet, View } from 'react-native';

const Following = (props) => {
  return (
    <View style={styles.container}>
      <Text>Hello this is following Screen</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default Following;
