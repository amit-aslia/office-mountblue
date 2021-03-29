import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Linking,
  ActivityIndicator
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import RenderNewsItem from '../Components/NewsDetails';
class News extends Component {
  intervalID;
  state = {
    arr: [],
    isLoading: true
  };
  componentDidMount() {
    this.getNewsFrom();
  }

  getNewsFrom = async () => {
    let url = 'https://min-api.cryptocompare.com/data/v2/news/?lang=EN';
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ arr: data.Data });
        this.intervalID = setTimeout(this.getNewsFrom.bind(this), 10000);
      });
    this.setState({ isLoading: false });
  };
  componentWillMount() {
    clearTimeout(this.intervalID);
  }

  static navigationOptions = {
    title: 'News'
  };

  render() {
    this.state.arr.map((value) => {
      console.log(value.url);
    });

    if (this.state.isLoading) {
      return (
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }
    return (
      <FlatList
        keyExtractor={(item, index) => item.id}
        data={this.state.arr}
        renderItem={({ item }) => (
          <RenderNewsItem
            title={item.title}
            image={item.imageurl}
            name={item.source_info.name}
            category={item.categories}
            published_on={item.published_on}
            onSelect={() => {
              Linking.openURL(item.url);
            }}
          />
        )}
        numColumns={2}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default News;
