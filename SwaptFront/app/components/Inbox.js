import React, { useState, useEffect, useCallback } from 'react'
import { Text, View, ScrollView, FlatList } from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat'
import { StyleSheet } from 'react-native'
import io from 'socket.io-client'

export default function Inbox() {
  
  var socket
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    socket = io('http://localhost:3000')
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,

          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ])
  }, [])
  const onSend = useCallback((messages = []) => {

    socket.emit('chat message', messages[0].text)
    //console.log(messages[0].text)
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  }, [])

  return (
    <>
      <ScrollView style = {styles.inbox}>
        <Text style = {styles.inboxTitle}>
          Inbox
        </Text>
        <Text style={styles.noMessages}>You have no messages</Text>
      </ScrollView>
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: 1,
        }}
      />
    </>
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
