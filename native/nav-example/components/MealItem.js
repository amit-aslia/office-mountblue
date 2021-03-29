import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground
} from "react-native";

const MealItem = props => {
  return (
    <View style={style.mealItem}>
      <TouchableOpacity onPress={props.onSelectMeal}>
        <View>
          <View style={{ ...style.mealRow, ...style.mealHeader }}>
            <ImageBackground
              source={{ uri: props.imageUrl }}
              style={style.bgImage}
            >
              <View style={style.titleContainer}>
                <Text style={style.title} numberOfLines={1}>
                  {props.title}
                </Text>
              </View>
            </ImageBackground>
          </View>
          <View style={{ ...style.mealRow, ...style.mealDetail }}>
            <Text>{props.duration}</Text>
            <Text>{props.complexity}</Text>
            <Text>{props.affordability}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const style = StyleSheet.create({
  mealItem: {
    height: 200,
    width: "100%",
    backgroundColor: "#ccc",
    borderRadius:16,
    overflow:'hidden',
    marginVertical:10
  },
  bgImage: {
    height: "100%",
    width: "100%",
    justifyContent: "flex-end"
  },
  mealRow: {
    flexDirection: "row"
  },
  mealHeader: {
    height: "85%"
  },
  mealDetail: {
    height: "15%",
    paddingHorizontal: 10,
    justifyContent: "space-between",
    alignItems:'center'
  },
  title: {
    fontFamily: "quicksandBold",
    fontSize: 20,
    color: "white",
    textAlign: "center"
  },
  titleContainer: {
    backgroundColor: "rgba(0,0,0,0.4)",
    paddingVertical: 5,
    paddingHorizontal: 12
  }
});

export default MealItem;
