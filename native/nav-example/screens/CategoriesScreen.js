import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  FlatList,
  TouchableOpacity,
  Platform
} from "react-native";
import { CATEGORIES } from "../data/dummy-data";

import color from "../constant/color";
import CategoryGridTile from "../components/CategoryGridTile";

const CategoriesScreen = props => {
  const renderGridItem = itemList => {
    return (
      <CategoryGridTile title={itemList.item.title} color={itemList.item.color} id={itemList.item.id} onSelect={() => {
        props.navigation.navigate({
          routeName: "CategoryMeals",
          params: {
            categoryId: itemList.item.id
          }
        });
      }}/>
    );
  };
  return (
    <FlatList
      keyExtractor={(item, index) => item.id}
      numColumns={2}
      data={CATEGORIES}
      renderItem={renderGridItem}
    />
  );
};
CategoriesScreen.navigationOptions ={
    headerTitle:"Meal Categories",
    
}
const style = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center"
  },
  gridItem: {
    flex: 1,
    margin: 15,
    height: 150,
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:16,
    shadowColor:"black",
    shadowOpacity:0.26,
    shadowOffset:{width:0,height:2},
    shadowRadius:16,
    elevation:5
  }
});
export default CategoriesScreen;
