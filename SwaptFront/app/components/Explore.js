import React, {useState, useEffect} from 'react'
import { Text, View, ScrollView, FlatList, Image } from 'react-native'
import { Searchbar } from 'react-native-paper'
import { StyleSheet } from 'react-native'
import laPhoto from '../photos/sterling-davis-4iXagiKXn3Y-unsplash.jpg'
import nyPhoto from '../photos/patrick-tomasso-SVVTZtTGyaU-unsplash.jpg'
import mPhoto from '../photos/lance-asper-pAWY7xrsLwc-unsplash.jpg'
import dcPhoto from '../photos/maria-oswalt-TRkDaJGK2yE-unsplash.jpg'
import sfPhoto from '../photos/daniel-abadia-kn5i4gUyhYM-unsplash.jpg'
import axios from 'axios'
import * as c from '../constants'

export default function Explore() {

  const loadQuery =async input => {
    //console.log(await axios.get(c.USERS))
  }

  return (
    <View style = {styles.page} >
      <Searchbar
        onChangeText={loadQuery}
        style = {styles.search}
        placeholder="Where are you going?"
        autoCapitalize = "none"
      />
      <ScrollView>
        <Text style = {styles.motto} >Travel more, pay less</Text>
        <Image style = {styles.image} source = {laPhoto} />
        <Image style = {styles.image} source = {nyPhoto} />
        <Image style = {styles.image} source = {mPhoto} />
        <Image style = {styles.image} source = {dcPhoto} />
        <Image style = {styles.image} source = {sfPhoto} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  search: {
    marginTop: 50
  },
  motto: {
    textAlign: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 30
  },
  image: {
    width: null,
    height: 250
  }
});
