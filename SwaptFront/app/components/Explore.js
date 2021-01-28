import React, {useState, useEffect, useRef} from 'react'
import { Text, View, ScrollView, FlatList, Image, TouchableOpacity, Dimensions } from 'react-native'
import {SearchBar} from 'react-native-elements'
import { StyleSheet } from 'react-native'
import laPhoto from '../photos/sterling-davis-4iXagiKXn3Y-unsplash.jpg'
import nyPhoto from '../photos/patrick-tomasso-SVVTZtTGyaU-unsplash.jpg'
import mPhoto from '../photos/lance-asper-pAWY7xrsLwc-unsplash.jpg'
import dcPhoto from '../photos/maria-oswalt-TRkDaJGK2yE-unsplash.jpg'
import sfPhoto from '../photos/daniel-abadia-kn5i4gUyhYM-unsplash.jpg'
import axios from 'axios'
import Profile from './Profile'
import * as c from '../constants'
import { useAuth } from "../providers/auth"

import Stars from 'react-native-stars'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import apt from '../photos/apt.jpeg'
import apt1 from '../photos/apt1.jpg'
import Carousel from 'react-native-snap-carousel'

export default function Explore() {
  const [cities, setCities] = useState([])
  const [query, setQuery] = useState()
  const [profiles, setProfiles] = useState([])

  const {state} = useAuth()
  const user = state.user

  const allCities = [
    {id: '0', city: 'Los Angeles'},
    {id: '1', city: 'Hollywood'},
    {id: '2', city: 'Chicago'},
    {id: '3', city: 'New York'},
    {id: '4', city: 'San Francisco'},
    {id: '5', city: 'Dallas'}
  ]

  const loadQuery =async input => {
    setQuery(input)
    input ? setCities(allCities.filter(result =>
      result.city.toLowerCase().indexOf(input.toLowerCase()) > -1
    )) : setCities([])
  }

  const citySelected = async city =>{
    //profiles.length && setProfiles([])
    setCities([])
    setQuery(null)
    let tempProfs
    await axios.get(c.USERS).then(function (response) {
      tempProfs = user.city!==city && response.data.filter(result =>
        result.city.toLowerCase().indexOf(city.toLowerCase()) > -1
      )
    })
    tempProfs.length ? setProfiles(tempProfs) : setProfiles(`no places available in ${city}`)
  }
  return (
    <View style = {styles.page} >
      <SearchBar
        platform="ios"
        onChangeText={loadQuery}
        placeholder="Where are you going?"
        autoCapitalize = "none"
        value = {query}
        showCancel = {true}
        containerStyle={{backgroundColor: 'white', padding: 0, borderBottomColor: 'lightgrey', borderTopColor: '#DCDCDC', height: 50}}
        inputContainerStyle={{backgroundColor: 'white'}}
        inputStyle={{color: 'black'}}
      />
      {!query && profiles.length>0 && <ShowProfiles profiles = {profiles} />}
      <Text style = {styles.searchRes}>{query && cities.length===0 && `'${query}' does not exist`}</Text>
      <FlatList
        data={cities}
        keyExtractor={item=>item.id}
        renderItem={({item}) => (
          <TouchableOpacity onPress={()=>citySelected(item.city)}>
            <Text style = {styles.searchRes}>{item.city}</Text>
          </TouchableOpacity>
        )}
      />

      {!query && cities.length===0 && profiles.length===0 && <ScrollView>
        <Text style = {styles.motto} >Travel more, pay less</Text>
        <Image style = {styles.image} source = {laPhoto} />
        <Image style = {styles.image} source = {nyPhoto} />
        <Image style = {styles.image} source = {mPhoto} />
        <Image style = {styles.image} source = {dcPhoto} />
        <Image style = {styles.image} source = {sfPhoto} />
      </ScrollView>}
    </View>
  );
}

export function ShowProfiles(props){
  const [profSelected, setProfSelected] = useState()

  const reviews = [
    { index: 0,
      name: 'Chris Beybooty',
      stars: 5,
      desc: '"Great place!"' },
    { index: 1,
      name: 'Connor Castillo',
      stars: 4,
      desc: '"This place slaps"' },
    { index: 2,
      name: 'Dakota Diel',
      stars: 5,
      desc: '"Awesome aoartment, really liked the area"' },
    { index: 3,
      name: 'Celeste',
      stars: 2.5,
      desc: '"Didnt really like this spot, good guy though"'}
  ]

  const renderCarousel = ({item}) => {
    return (
      <View>
        <Stars
          default={item.stars}
          count={5}
          half={true}
          fullStar={<Icon name={'star'} style={[styles.myStarStyle]}/>}
          emptyStar={<Icon name={'star-outline'} style={[styles.myStarStyle, styles.myEmptyStarStyle]}/>}
          halfStar={<Icon name={'star-half-full'} style={[styles.myStarStyle]}/>}
        />
        <Text style={styles.textRev}>{ item.desc }</Text>
      </View>
    )
  }

  return(
    <View style = {styles.page}>
      {props.profiles[0]==='n' ? <Text>{props.profiles}</Text> :
      !profSelected ? <FlatList
        data={props.profiles}
        keyExtractor={item=>item._id}
        renderItem={({item}) => (
          <TouchableOpacity onPress={()=>setProfSelected(item)}>
            <Profile user = {item} picker = {null} />
          </TouchableOpacity>
        )}
      /> :
      <ScrollView style = {styles.page}>
        <Profile user = {profSelected} picker = {null} />
        <Text style = {styles.cityTitle}>{profSelected.city}</Text>
        <Image style = {styles.image} source = {apt} />
        <Image style = {styles.image} source = {apt1} />

        <Carousel
          data={reviews}
          renderItem={renderCarousel}
          sliderWidth={Dimensions.get('window').width}
          itemWidth={Dimensions.get('window').width/1.5}
        />
      </ScrollView>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    marginTop: 50
  },
  searchRes: {
    textAlign: 'center',
    fontSize: 25
  },
  motto: {
    textAlign: 'center',
    paddingBottom: 10,
    fontSize: 30
  },
  image: {
    width: null,
    height: 250
  }
});
