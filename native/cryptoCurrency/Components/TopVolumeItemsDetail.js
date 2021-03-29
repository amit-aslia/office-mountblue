import React, { Component } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';

const TopVolumeItemsDetail = (props) => {
  console.log('mu props', props);
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row' }}>
        <Text>{props.index}</Text>
        <Image
          style={styles.img}
          source={{
            uri: props.image
          }}
        />
        <View style={styles.heading}>
          <Text style={styles.fullName}>{props.fullName}</Text>
          <Text style={styles.name}>{props.name}</Text>
        </View>
      </View>
      <View style={styles.price}>
        <Text>{props.price.USD}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 80,
    width: '100%',
    padding: 7,
    paddingTop: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey'
  },
  img: {
    height: 50,
    width: 50,
    borderRadius: 50,
    paddingHorizontal: 35
  },
  name: {
    opacity: 0.8,
    fontSize: 10
  },
  heading: {
    paddingHorizontal: 10
  },
  price: {}
});

export default TopVolumeItemsDetail;
