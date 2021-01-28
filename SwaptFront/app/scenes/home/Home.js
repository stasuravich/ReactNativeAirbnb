import React, {useState} from 'react';
import {Text, View, Button, ActivityIndicator, Alert} from 'react-native';
import Explore from '../../components/Explore'
import Inbox from '../../components/Inbox'
import MyProfile from '../../components/MyProfile'
import Settings from '../../components/Settings'
import Trips from '../../components/Trips'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import AntIcon from 'react-native-vector-icons/AntDesign'
import ChatIcon from 'react-native-vector-icons/Ionicons'
import TripIcon from 'react-native-vector-icons/MaterialIcons'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'

export default function Home(props) {

    const Tab = createBottomTabNavigator()
    const {navigate} = props.navigation;

    return (

      <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ navigation, route }) => ({
              tabBarIcon: ({ color, size }) => {
                if (route.name === 'Explore')
                  return <AntIcon name = 'search1' size={size} color={navigation.isFocused() ? 'red': color} />
                else if (route.name === 'Settings')
                  return <AntIcon name = 'setting' size={size} color={navigation.isFocused() ? 'red': color} />
                else if (route.name === 'Inbox')
                  return <ChatIcon name = 'chatbox-outline' size={size} color={navigation.isFocused() ? 'red': color} />
                else if (route.name === 'Profile')
                  return <AntIcon name = 'profile' size={size} color={navigation.isFocused() ? 'red': color} />
                else if (route.name === 'Trips')
                  return <TripIcon name = 'trip-origin' size={size} color={navigation.isFocused() ? 'red': color} />
              }
            })}
            tabBarOptions= {{
              activeTintColor: 'black',
              inactiveTintColor: 'gray',
              labelStyle: {fontSize: 12, fontWeight: 'bold'}
            }}
          >
            <Tab.Screen name='Explore' component={Explore} />
            <Tab.Screen name='Inbox' component={Inbox} />
            <Tab.Screen name='Profile' children={()=><MyProfile navigate={navigate}/>} />
            <Tab.Screen name='Settings' children={()=><Settings navigate={navigate}/>}/>
            <Tab.Screen name='Trips' component={Trips} />
          </Tab.Navigator>
      </NavigationContainer>

    )
}
