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
const CategoryGridTile = (props) => {
  return (
    <TouchableOpacity
      onPress={props.onSelect}
      style={{ ...style.gridItem, backgroundColor: props.color }}
    >
      <View>
        <Text style={style.title}>{props.title}</Text>
      </View>
    </TouchableOpacity>
  );
};
const  style=StyleSheet.create({
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
      },
      title:{
        fontFamily: 'quicksandBold',
        fontSize:20
      }
})

export default CategoryGridTile;
