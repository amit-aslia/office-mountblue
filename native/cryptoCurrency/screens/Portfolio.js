import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';

const Portfolio = (props) => {
  return (
    <View style={styles.container}>
      <Text>This is portfolio</Text>
    </View>
  );
};
Portfolio.navigationOptions = {
  headerTitle: 'Portfolio'
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default Portfolio;
