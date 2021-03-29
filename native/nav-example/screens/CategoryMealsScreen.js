import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { CATEGORIES, MEALS } from "../data/dummy-data";
import MealItem from "../components/MealItem";
const CategoryMealsScreen = props => {
  const catID = props.navigation.getParam("categoryId");
  const displayedMeals = MEALS.filter(
    elem => elem.categoryIds.indexOf(catID) >= 0
  );
  const renderMeals = itemList => {
    return (
      <MealItem
        title={itemList.item.title}
        duration={itemList.item.duration}
        complexity={itemList.item.complexity}
        affordability={itemList.item.affordability}
        imageUrl={itemList.item.imageUrl}
        onSelectMeal={() => {
          props.navigation.navigate({
          routeName: "MealDetail",
          params: {
            mealId: itemList.item.id
          }
        });
        }}
      />
    );
  };

  return (
    <View style={style.container}>
      <FlatList
        data={displayedMeals}
        keyExtractor={(item, index) => item.id}
        renderItem={renderMeals}
        style={{ width: "100%" }}
      />
    </View>
  );
};
CategoryMealsScreen.navigationOptions = navigationData => {
  const catID = navigationData.navigation.getParam("categoryId");
  const selectedCategory = CATEGORIES.find(cat => cat.id === catID);
  return {
    headerTitle: selectedCategory.title
  };
};
const style = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10
  }
});
export default CategoryMealsScreen;
