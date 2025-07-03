import React, { Suspense } from 'react'
import { View, Text } from 'react-native'
import { WebView } from 'react-native-webview'

const Home = () => {
  return (
    <Suspense
      fallback={
        <View>
          <Text>Loading...</Text>
        </View>
      }
    >
      <WebView
        source={{ uri: 'https://mrlawyerfirm.web.app/' }}
        style={{ flex: 1 }}
      />
    </Suspense>
  )
}

export default Home
