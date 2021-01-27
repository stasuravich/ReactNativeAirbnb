import React, {useState, useEffect } from 'react'
import { Text, View, ScrollView, FlatList, Dimensions } from 'react-native'
import { StyleSheet } from 'react-native'
import {TabView, SceneMap, TabBar} from 'react-native-tab-view'

const Past = () => {
  return(
    <ScrollView style={styles.body}>
      <Text>Past</Text>
    </ScrollView>
  )
}

const Upcoming = () => {
  return(
    <ScrollView style={styles.body}>
      <Text>Upcoming</Text>
    </ScrollView>
  )
}

export default function Trips() {
  const [index, setIndex] =useState(0)
  const routes = [
    {key: 'first', title: 'Upcoming'},
    {key: 'second', title: 'Past'}
  ]

  const renderTabBar = props => (
    <TabBar style={styles.tabBar}
      {...props}
      tabStyle={styles.tabStyle}
      scrollEnabled={true}
      indicatorStyle={{backgroundColor: 'black', height: 2, width: 85-index*45 }}
      labelStyle={{color: 'black'}}
    />
  )

  const renderScene = SceneMap({
    first: Upcoming,
    second: Past
  })

  return (
    <View style={styles.trips}>
      <Text style={styles.title}>
        Trips
      </Text>
      <TabView
       navigationState={{index, routes}}
       renderTabBar={renderTabBar}
       renderScene={renderScene}
       onIndexChange={setIndex}
       initialLayout={Dimensions.get('window').width}
     />
    </View>
  )
}

const styles = StyleSheet.create({
  body: {
    flex: 1
  },
  trips: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 90
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 15
  },
  tabBar: {
    backgroundColor: 'transparent',
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1,
  },
  tabStyle: {
    width: 'auto',
    padding: 0,
    marginRight: 35
  }
})
