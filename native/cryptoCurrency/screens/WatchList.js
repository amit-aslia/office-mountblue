import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Button } from 'react-native';

const WatchList = (props) => {
  return (
    <TouchableOpacity style={styles.container}>
      <Text>Hello this is watchList!!!</Text>
      <Button
        title="click me"
        onPress={() => {
          props.navigation.navigate({ routeName: 'Portfolio' });
        }}
      />
    </TouchableOpacity>
  );
};

WatchList.navigationOptions = {
  headerTitle: <Text>Hello</Text>
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default WatchList;
