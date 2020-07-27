import { createAppContainer } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack';
import SignIn from './src/screens/SignIn';
import SignUp from './src/screens/SignUp';
import DashBoard from './src/screens/DashBoard';
import {Provider} from "./context";
import { Button } from "react-native";
import React from'react';
import AsyncStorage from "@react-native-community/async-storage";

const navigator = createStackNavigator(
  { Sign: {
      screen:SignIn,
      navigationOptions:({headerShown:false})
    },
    SiUp:
    {screen:SignUp,
     navigationOptions:({headerShown:false})},
    Dash:{
      screen:DashBoard,
       navigationOptions:({navigation})=>({
       headerRight:()=>
       <Button title="Log Out" onPress={()=>{navigation.navigate('Sign')}}></Button>,
         })
    }
    },
  {
  initalRouterName :'Sign',
  defaultNavigationOptions:{
    title:'DashBoard',
  }
}
);
export default createAppContainer(navigator);