import React, {useState, useEffect} from 'react'
import { Text, ScrollView, FlatList } from 'react-native'
import { StyleSheet } from 'react-native'

export default function Inbox() {
  return (
    <ScrollView style = {styles.inbox}>
      <Text style = {styles.inboxTitle}>
        Inbox
      </Text>
      <Text style={styles.noMessages}>You have no messages</Text>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  inbox :{
    paddingHorizontal: 20,
    paddingTop: 90,
  },
  inboxTitle: {
    fontSize: 35,
    marginBottom: 10,
    fontWeight: 'bold'
  },
  noMessages: {
    fontSize: 17
  }
})
