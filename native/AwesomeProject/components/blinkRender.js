import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';

import Blink from './blink';
import {} from 'react-native';

class BlinkRender extends Component {
  state = {};
  render() {
    return (
      <View>
        <Blink text="I love to Blink" />
      </View>
    );
  }
}

export default BlinkRender;
