import React, {useState, useEffect, useRef} from 'react'
import { Text, View, ScrollView, FlatList, Button, Image, Dimensions } from 'react-native'
import { StyleSheet } from 'react-native'
import { Avatar, ListItem } from 'react-native-elements'
import * as ImagePicker from 'expo-image-picker'
import Stars from 'react-native-stars'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import apt from '../photos/apt.jpeg'
import apt1 from '../photos/apt1.jpg'
import Carousel from 'react-native-snap-carousel'
import * as c from '../constants'
import axios from 'axios'
import * as api from "../services/auth"

import { useAuth } from "../providers/auth"

export default function Profile(props) {
  const {state, updateUser} = useAuth();
  const user = state.user;
  const [activeIdx, setActiveIdx] = useState()
  //const [avatar, setAvatar] = useState()
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
      desc: '"Awesome aoartment, really liked the area"' },
    { index: 3,
      name: 'Celeste',
      stars: 2.5,
      desc: '"Didnt really like this spot, good guy though"'}
  ]
  useEffect(() => {
   (async () => {
     if (Platform.OS !== 'web') {
       const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
       if (status !== 'granted') {
         alert('Sorry, we need camera roll permissions to make this work!')
       }
     }
   })()
  }, [])

  const openPicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true
    });
    if (!result.cancelled) {
      //setAvatar(result.uri)
      let base64Img = `data:image/jpg;base64,${result.base64}`
      let data = {
        "file": base64Img,
        "upload_preset": "hhgm4qoy",
      }
      fetch('https://api.cloudinary.com/v1_1/dmpptw7uo/upload', {
        body: JSON.stringify(data),
        headers: {
          'content-type': 'application/json'
        },
        method: 'POST',
      }).then(async res => {
        let resData = await res.json()
        //console.log(resData.url)
        try {
            let resProf = await api.updateProfile(state.user._id, {profileImage: resData.url})
            updateUser(resProf.user);

        } catch (error) {
            setError(error.message);
        }
      }).catch(err => console.log(err))

    }
  }

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
    <ScrollView style = {styles.page}>
      <ListItem>
        <Avatar
          size = 'medium'
          rounded
          overlayContainerStyle={{backgroundColor: 'lightgrey'}}
          source = {{uri: user ? user.profileImage : null}}
          icon={{ type: 'font-awesome'}}
          onPress={openPicker}
        />
        <ListItem.Content>
          <ListItem.Title>{user && user.username}</ListItem.Title>
          <ListItem.Subtitle>
          <Stars
            default={4.5}
            count={5}
            half={true}
            fullStar={<Icon name={'star'} style={[styles.myStarStyle]}/>}
            emptyStar={<Icon name={'star-outline'} style={[styles.myStarStyle, styles.myEmptyStarStyle]}/>}
            halfStar={<Icon name={'star-half-full'} style={[styles.myStarStyle]}/>}
          />
          </ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
      <Text style = {styles.cityTitle}>Los Angeles</Text>
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
      <Button title={"Update Profile"} onPress={() => props.navigate('UpdateProfile')}/>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    marginTop: 50
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
  },
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
  }
})
