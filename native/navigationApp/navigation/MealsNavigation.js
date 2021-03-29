import React from 'react';
import { Platform } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealScreen from '../screens/CategoryMealScreen';
import MealDetailScreen from '../screens/MealDetailScreen';
import FavoriteScreen from '../screens/FavoritesScreen';
import { Ionicons } from '@expo/vector-icons';
import { createDrawerNavigator } from 'react-navigation-drawer';
import FilterScreen from '../screens/FilterScreen';

const defaultNavigationOption = {
  headerStyle: {
    backgroundColor: 'purple'
  }
};

const MealNavigator = createStackNavigator(
  {
    Categories: {
      screen: CategoriesScreen
    },
    CategoryMeals: {
      screen: CategoryMealScreen
    },
    MealDetail: MealDetailScreen
  },
  {
    defaultNavigationOptions: defaultNavigationOption
  }
);

const favNavigator = createStackNavigator(
  {
    FavoriteScreen: FavoriteScreen,
    MealDetail: MealDetailScreen
  },
  {
    defaultNavigationOptions: defaultNavigationOption
  }
);

const MealFavTabNavigator = createBottomTabNavigator(
  {
    Meal: {
      screen: MealNavigator,
      navigationOptions: {
        tabBarIcon: (tabInfo) => {
          return (
            <Ionicons
              name="ios-restaurant"
              size={25}
              color={tabInfo.tintColor}
            />
          );
        }
      }
    },
    Favorites: {
      screen: favNavigator,
      navigationOptions: {
        tabBarIcon: (tabInfo) => {
          return (
            <Ionicons name="ios-star" size={25} color={tabInfo.tintColor} />
          );
        }
      }
    }
  },
  {
    tabBarOptions: {
      activeTintColor: '#FED8B1'
    }
  }
);

const FiltersNavigator = createStackNavigator(
  {
    Filters: FilterScreen
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: 'purple'
      }
    }
  }
);

const mainNavigator = createDrawerNavigator(
  {
    MealFavs: {
      screen: MealFavTabNavigator,
      navigationOptions: {
        drawerLabel: 'Meals'
      }
    },
    FilterScreen: FiltersNavigator
  },
  {
    contentOptions: {
      activeTintColor: 'lightblue'
    }
  }
);

export default createAppContainer(mainNavigator);
