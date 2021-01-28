import React from 'react'
import { Avatar, ListItem } from 'react-native-elements'
import Stars from 'react-native-stars'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { StyleSheet } from 'react-native'

export default function MyProfile(props) {
  return (
    <ListItem>
      <Avatar
        size = 'medium'
        rounded
        overlayContainerStyle={{backgroundColor: 'lightgrey'}}
        source = {{uri: props.user ? props.user.profileImage : null}}
        icon={{ type: 'font-awesome'}}
        onPress={props.picker}
      />
      <ListItem.Content>
        <ListItem.Title>{props.user && props.user.username}</ListItem.Title>
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

  );
}

const styles = StyleSheet.create({

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
