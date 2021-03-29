import React, { Component } from 'react';
import { Text, StyleSheet, View, ActivityIndicator } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { TOPCOINS } from '../data/dummyData';

import TopVolumeItemsDetails from '../Components/TopVolumeItemsDetail';

class TopVolume extends Component {
  state = {
    topVolume: [],
    DATA: [],
    isLoading: true
  };
  componentDidMount() {
    // let url =
    //   'https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD';
    // fetch(url)
    //   .then((response) => {
    //     return response.json();
    //   })
    //   .then((data) => {
    //     this.setState({ topVolume: data.Data });
    //   });

    let getpriceFrom =
      'https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,BCH,LTC,EOS,XRP,BSV,ZB,TRX,ETC&tsyms=USD,EUR';

    setTimeout(async () => {
      await fetch(getpriceFrom)
        .then((response) => response.json())
        .then((data) => this.setState({ DATA: Object.values(data) }));
      this.setState({ isLoading: false });
    }, 1000);
  }
  render() {
    if (this.state.isLoading) {
      return (
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }

    return (
      <FlatList
        keyExtractor={(item, index) => item.Id}
        data={TOPCOINS}
        extraData={this.state}
        renderItem={({ item, index }) => (
          <TopVolumeItemsDetails
            index={index + 1}
            name={item.name}
            fullName={item.fullName}
            image={item.image}
            price={this.state.DATA[index]}
          />
        )}
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

export default TopVolume;
