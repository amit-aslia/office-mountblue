import React from 'react'
import {View,Text,StyleSheet} from 'react-native';
import {MEALS} from '../data/dummy-data'
import {HeaderButtons,Item} from 'react-navigation-header-buttons'
import HeaderButton from '../components/HeaderButton'
const MealDetailScreen = props => {
    const mealID = props.navigation.getParam("mealId");
    const selectedMeal = MEALS.find(meal => meal.id === mealID);
    
    return (
       <View style={style.container}><Text>{selectedMeal.title}</Text></View>
    )
}
MealDetailScreen.navigationOptions = navigationData => {
    const mealID = navigationData.navigation.getParam("mealId");
    const selectedMeal = MEALS.find(meal => meal.id === mealID);
    return {
      headerTitle: selectedMeal.title,
      headerRight:<HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item iconName="ios-star" onPress={()=>{console.log('Mark as Fav')}}/>
      </HeaderButtons>
    };
  };
const style=StyleSheet.create({
    container:{
        justifyContent:'center',
        alignItems:'center',
    }
});
export default MealDetailScreen
