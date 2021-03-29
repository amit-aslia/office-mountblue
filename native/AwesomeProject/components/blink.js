import React, { Component } from 'react';
import { Text, View } from 'react-native';

class Blink extends Component {
  componentDidMount() {
    setInterval(
      () =>
        this.setState((previousState) => ({
          isShowing: !previousState.isShowing
        })),
      1000
    );
  }
  state = {
    isShowing: true
  };
  render() {
    if (!this.state.isShowing) {
      return null;
    }
    return <Text>{this.props.text}</Text>;
  }
}

export default Blink;
