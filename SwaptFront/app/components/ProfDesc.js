import React, {useState, useEffect, useRef} from 'react'
import { Text, View, ScrollView, FlatList, Button, Image, Dimensions } from 'react-native'
import { StyleSheet } from 'react-native'
import apt from '../photos/apt.jpeg'
import apt1 from '../photos/apt1.jpg'
import Carousel from 'react-native-snap-carousel'
import Profile from './Profile'
import Stars from 'react-native-stars'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

export default function ProfDesc(props){
  const [activeIdx, setActiveIdx] = useState()
  var carl

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
      desc: '"Awesome apartment, really liked the area"' },
    { index: 3,
      name: 'Celeste',
      stars: 2.5,
      desc: '"Didnt really like this spot, good guy though"'}
  ]
  const updateIndex = () => {
    setActiveIdx(carl.currentIndex)
  }

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

  return (
    <View style = {{flex: 1}}>
      <Text style = {styles.cityTitle}>{props.user.city}</Text>
      <Image style = {styles.image} source = {apt} />
      <Image style = {styles.image} source = {apt1} />

      <Carousel
        ref ={(carousel) => {carl = carousel}}
        onSnapToItem ={()=>setActiveIdx(carl.currentIndex)}
        //useExperimentalSnap={true}
        containerCustomStyle={{paddingLeft: !activeIdx ? 20: 0, marginTop: 15, transform: [{translateX: activeIdx===3 ? -20: 0}]}}
        slideStyle={{minHeight: 130, backgroundColor: 'white', paddingTop: 15}}
        data={reviews}
        renderItem={renderCarousel}
        sliderWidth={Dimensions.get('window').width}
        itemWidth={Dimensions.get('window').width/1.5}
        activeSlideAlignment={activeIdx===3 ? "end" : activeIdx ? 'center' : 'start'}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  cityTitle: {
    paddingTop: 20,
    fontSize: 30,
    fontWeight: 'bold',
    marginLeft: 20,
    marginBottom: 10
  },
  textRev: {
    textAlign: 'center',
    fontSize: 17,
    marginTop: 15
  },
  image: {
    width: null,
    height: 250,
    marginHorizontal: 20
  },
  myStarStyle: {
    color: 'yellow',
    backgroundColor: 'transparent',
    textShadowColor: 'black',
    textShadowRadius: 2,
    fontSize: 25
  },
  myEmptyStarStyle: {
    color: 'white',
    fontSize: 25
  }
})
