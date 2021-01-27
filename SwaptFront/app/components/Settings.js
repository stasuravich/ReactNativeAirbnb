import React, {useState, useEffect} from 'react'
import { Text, ScrollView, View, FlatList, TouchableOpacity, Button } from 'react-native'
import { StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import Gift from 'react-native-vector-icons/AntDesign'

import { useAuth } from "../providers/auth";

export default function Settings(props) {

  const {state, handleLogout} = useAuth();
  const user = state.user;
  const settingInfo=[
    {
      text: 'Personal Information',
      icon: "user-o"
    },
    {
      text: 'Payments',
      icon: "credit-card"
    },
    {
      text: 'Notifications',
      icon: "bell-o"
    }
  ]

  const refInfo=[
    {
      text: 'Gift Cards',
      subText: 'Send or redeem'
    },
    {
      text: 'Invite Friends',
      subText: 'After joining, friends receive $20 discount'
    }
  ]

  const support=[
    {
      text: 'What is Swapt',
      icon: 'globe'
    },
    {
      text: 'Safety',
      subText: 'Get all the information you need to feel safe',
      icon: 'plus-square-o'
    },
    {
      text: 'Get Help',
      icon: 'question'
    },
    {
      text: 'Give Feedback',
      icon: 'wpforms'
    }
  ]

  const optSelected = ()=>{

  }

  return (
    <ScrollView style = {styles.settings}>
      <Text style= {styles.optTitle}>
        Account Settings
      </Text>
      {settingInfo.map((item, idx)=>(
        <View key = {idx}>
          <TouchableOpacity onPress={optSelected} style={styles.option}>
            <Text style={styles.child}>
              {item.text}
            </Text>
            <Icon style={styles.child} name={item.icon}></Icon>
          </TouchableOpacity>
          <View
            style={styles.line}
          />
        </View>
      ))}
      <Text style= {styles.optTitle}>
        Referrals
      </Text>
      {refInfo.map((item, idx)=>(
        <View key = {idx}>
          <TouchableOpacity onPress={optSelected}>
            <View style={styles.option}>
              <Text style={styles.child}>
                {item.text}
              </Text>
              <Gift style={styles.child} name='gift'></Gift>
            </View>
            <Text style={styles.subText}>{item.subText}</Text>
          </TouchableOpacity>
          <View
            style={styles.line}
          />
        </View>
      ))}
      <Text style= {styles.optTitle}>
        Support
      </Text>
      {support.map((item, idx)=>(
        <View key = {idx}>
          <TouchableOpacity onPress={optSelected}>
            <View style={styles.option}>
              <Text style={styles.child}>
                {item.text}
              </Text>
              <Icon style={styles.child} name={item.icon}></Icon>
            </View>
            {item.subText && <Text style={styles.subText}>{item.subText}</Text>}
          </TouchableOpacity>
          <View
            style={styles.line}
          />
        </View>
      ))}
      <Text style= {styles.optTitle}>
        Legal
      </Text>
      <TouchableOpacity onPress={optSelected}>
        <Text style={styles.childLast}>Terms of Service</Text>
      </TouchableOpacity>
      <View
        style={styles.lineLast}
      />
      <TouchableOpacity onPress={() => {
          handleLogout()
          props.navigate('Auth')}}>
        <Text style={styles.logout}>Logout</Text>
      </TouchableOpacity>
      <View
        style={styles.lineLast}
      />
      <Text style= {styles.version}>Version 1.0</Text>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  settings: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 50
  },
  optTitle: {
    marginTop: 30,
    color: '#232323',
    marginBottom: 15,
    fontSize: 12
  },
  option: {
    flexDirection: 'row',
    justifyContent: "space-between",
    marginVertical: 12
  },
  child: {
    fontSize: 18
  },
  line: {
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1
  },
  subText: {
    marginBottom: 15
  },
  logout: {
    fontSize: 18,
    color: 'blue',
    marginVertical: 12
  },
  lineLast: {
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1,
    marginBottom: 20
  },
  childLast: {
    fontSize: 18,
    marginVertical: 12
  },
  version: {
    textAlign: 'center',
    marginBottom: 12,
    color: 'dimgrey'
  }

})
