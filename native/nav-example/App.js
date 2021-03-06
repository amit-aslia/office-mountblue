import React,{useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Font from 'expo-font';
import {AppLoading} from 'expo';
import MealsNavigator from './navigation/MealsNavigator';
const fetchFont=()=>{
  return Font.loadAsync({
    quicksand: require('./assets/font/Quicksand-Regular.otf'),
    quicksandBold: require('./assets/font/Quicksand-Bold.otf')
  })
}

export default function App() {
  const [fontLoaded,setFontLoaded]=useState(false);
  if(!fontLoaded){
    return (<AppLoading startAsync={fetchFont} onFinish={()=>{setFontLoaded(true)}}/>)
  }
  return <MealsNavigator/> ;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
