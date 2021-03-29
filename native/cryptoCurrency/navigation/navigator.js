import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Portfolio from '../screens/Portfolio';
import News from '../screens/News';
import watchList from '../screens/WatchList';
import {
  createBottomTabNavigator,
  createMaterialTopTabNavigator
} from 'react-navigation-tabs';
import { Ionicons } from '@expo/vector-icons';
import Following from '../screens/Following';
import TopVolume from '../screens/TopVolume';

const MaterialTab = createMaterialTopTabNavigator(
  {
    Following: Following,
    TopVolume: TopVolume
  },
  {
    tabBarOptions: {
      activeTintColor: 'white',
      pressColor: 'blue',

      inactiveTintColor: 'lightgrey',

      style: {
        backgroundColor: '#00cc66',

        marginTop: 15
      },
      indicatorStyle: {
        backgroundColor: 'none'
      }
    }
  }
);

const WatchListTab = createStackNavigator({
  watchList: MaterialTab
});

const PortfolioTab = createStackNavigator({
  Portfolio: Portfolio
});

const NewsTab = createStackNavigator({
  News: News
});

const mainNavigator = createBottomTabNavigator({
  WatchList: WatchListTab,
  Portfolio: PortfolioTab,
  News: {
    screen: NewsTab,
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return (
          <Ionicons name="ios-resize" size={25} color={tabInfo.tintColor} />
        );
      }
    }
  }
});

export default createAppContainer(mainNavigator);
