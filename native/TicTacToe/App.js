import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Button
} from 'react-native';
import { MaterialCommunityIcons as Icon } from 'react-native-vector-icons';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameState: [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
      currentPlayer: 1
    };
  }
  componentDidMount() {
    this.initializeGame();
  }

  initializeGame = () => {
    this.setState({ gameState: [[0, 0, 0], [0, 0, 0], [0, 0, 0]] });
    this.setState({ currentPlayer: 1 });
  };

  getWinner = () => {
    let tileNum = 3;
    let array = this.state.gameState;
    let sum;
    // Check for rows
    for (let i = 0; i < tileNum; i++) {
      sum = 0;
      for (let j = 0; j < tileNum; j++) {
        sum = sum + array[i][j];
      }
      if (sum === 3) {
        return 1;
      } else if (sum == -3) {
        return -1;
      }
    }

    // Check for column
    for (let i = 0; i < tileNum; i++) {
      sum = 0;
      for (let j = 0; j < tileNum; j++) {
        sum = sum + array[j][i];
      }
      if (sum === 3) {
        return 1;
      } else if (sum == -3) {
        return -1;
      }
    }

    // Check for Diagonal
    sum = 0;
    sum = array[0][0] + array[1][1] + array[2][2];
    if (sum === 3) {
      return 1;
    } else if (sum == -3) {
      return -1;
    }

    // check for left diagonal
    sum = 0;
    sum = array[0][2] + array[1][1] + array[2][0];
    if (sum === 3) {
      return 1;
    } else if (sum == -3) {
      return -1;
    } else {
      return 0;
    }
  };

  tilePress = (row, col) => {
    //not allow tile to change
    let value = this.state.gameState[row][col];
    if (value !== 0) {
      return;
    }

    //Current tile
    let currentPlayer = this.state.currentPlayer;
    let array = this.state.gameState.slice();
    array[row][col] = currentPlayer;
    this.setState({ gameState: array });

    let nextPlayer = currentPlayer == 1 ? -1 : 1;
    this.setState({ currentPlayer: nextPlayer });

    let checkWinner = this.getWinner();
    if (checkWinner === 1) {
      Alert.alert('Player 1 wins');
      this.initializeGame();
    } else if (checkWinner == -1) {
      Alert.alert('Player 2 wins');
      this.initializeGame();
    } else if (checkWinner === 0) {
      let counter = 0;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (
            this.state.gameState[i][j] === 1 ||
            this.state.gameState[i][j] === -1
          )
            counter++;
        }
      }
      if (counter === 9) {
        Alert.alert('Match Draw');
        this.initializeGame();
      }
    }
  };

  newGame = () => {
    this.initializeGame();
  };

  renderIcon = (row, col) => {
    let value = this.state.gameState[row][col];
    switch (value) {
      case 1:
        return <Icon name="close" style={styles.tilesX} />;
      case -1:
        return <Icon name="circle-outline" style={styles.tileO} />;
      default:
        return <View />;
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            onPress={() => this.tilePress(0, 0)}
            style={[styles.tile, { borderLeftWidth: 0, borderTopWidth: 0 }]}
          >
            {this.renderIcon(0, 0)}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.tilePress(0, 1)}
            style={[styles.tile, { borderTopWidth: 0 }]}
          >
            {this.renderIcon(0, 1)}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.tilePress(0, 2)}
            style={[styles.tile, { borderTopWidth: 0, borderRightWidth: 0 }]}
          >
            {this.renderIcon(0, 2)}
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            onPress={() => this.tilePress(1, 0)}
            style={[styles.tile, { borderLeftWidth: 0 }]}
          >
            {this.renderIcon(1, 0)}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.tilePress(1, 1)}
            style={[styles.tile, {}]}
          >
            {this.renderIcon(1, 1)}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.tilePress(1, 2)}
            style={[styles.tile, { borderRightWidth: 0 }]}
          >
            {this.renderIcon(1, 2)}
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            onPress={() => this.tilePress(2, 0)}
            style={[styles.tile, { borderLeftWidth: 0, borderBottomWidth: 0 }]}
          >
            {this.renderIcon(2, 0)}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.tilePress(2, 1)}
            style={[styles.tile, { borderBottomWidth: 0 }]}
          >
            {this.renderIcon(2, 1)}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.tilePress(2, 2)}
            style={[styles.tile, { borderBottomWidth: 0, borderRightWidth: 0 }]}
          >
            {this.renderIcon(2, 2)}
          </TouchableOpacity>
        </View>
        <View style={{ padding: 30 }} />
        <Button color="red" onPress={this.newGame} title="New Game" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },

  tile: {
    width: 100,
    height: 100,
    borderWidth: 0.5
  },
  tilesX: {
    color: 'red',
    fontSize: 60
  },
  tileO: {
    color: 'green',
    fontSize: 60
  }
});

export default App;
