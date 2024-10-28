import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { Href, Link } from 'expo-router'

const Home = () => {
  return (
    <View>
      <Text>Home</Text>
      <Link href={"/" as Href} asChild>
        <Pressable>
          <Text>Index</Text>
        </Pressable>
      </Link>
    </View>
  )
}

export default Home