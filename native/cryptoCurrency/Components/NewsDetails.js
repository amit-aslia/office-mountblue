import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Moment from 'react-moment';

const RenderNewsItem = (props) => {
  return (
    <TouchableOpacity style={styles.container} onPress={props.onSelect}>
      <View style={styles.imageBlock}>
        <Image
          style={styles.img}
          source={{
            uri: props.image
          }}
        />
      </View>
      <View style={styles.content}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.title}>{props.name}</Text>
          <Text>{props.published_on}</Text>
        </View>
        <View style={styles.titleAndCategory}>
          <Text numberOfLines={3} style={styles.title}>
            {props.title}
          </Text>
          <View style={{ flexDirection: 'row' }}>
            {props.category.split('|').map((value, index) => (
              <Text key={index} style={styles.category}>
                {value}
              </Text>
            ))}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 140,
    width: '100%',
    justifyContent: 'space-between',
    padding: 7,
    paddingTop: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey'
  },
  imageBlock: {
    width: '32%',
    height: '100%'
  },
  content: {
    width: '68%'
  },
  img: {
    height: 95,
    width: 100,
    borderRadius: 5
  },
  titleAndCategory: {
    height: 75,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  title: {
    fontSize: 12,
    fontWeight: 'bold',
    paddingRight: 4,
    paddingRight: 10,
    opacity: 0.6
  },
  category: {
    opacity: 0.8,
    fontSize: 10
    // textDecorationLine: 'underline'
    // display: 'inline'
  }
});

export default RenderNewsItem;
