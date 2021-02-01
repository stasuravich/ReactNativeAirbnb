import React, {useState, useEffect, useRef} from 'react'
import { Text, View, ScrollView, FlatList, Button, Image, Dimensions } from 'react-native'
import { StyleSheet } from 'react-native'
import { Avatar, ListItem } from 'react-native-elements'
import * as ImagePicker from 'expo-image-picker'
import * as c from '../constants'
import axios from 'axios'
import * as api from "../services/auth"
import Profile from './Profile'
import ProfDesc from './ProfDesc'

import { useAuth } from "../providers/auth"

export default function MyProfile(props) {
  const {state, updateUser} = useAuth();
  const user = state.user;

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

  return (
    <ScrollView style = {styles.page}>
      <Profile user = {user} picker = {openPicker} />
      <ProfDesc user = {user} />
      <Button title={"Update Profile"} onPress={() => props.navigate('UpdateProfile')}/>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    marginTop: 50
  }
})
