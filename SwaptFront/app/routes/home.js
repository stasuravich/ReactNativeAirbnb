import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';

//IMPORT SCENES
import HomeScreen from "../scenes/home/Home";
import UpdateProfileScreen from "../scenes/home/UpdateProfile";

import {headerStyle} from '../theme'

const HomeStack = createStackNavigator(
    {
        Home: {screen: HomeScreen, navigationOptions: {header : null}},
        UpdateProfile: UpdateProfileScreen,
    },
    {
        initialRouteName: 'Home',
        defaultNavigationOptions: () => ({headerStyle})
    }
);

export default HomeStack;
