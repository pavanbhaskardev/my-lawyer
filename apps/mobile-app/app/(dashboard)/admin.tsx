import { TabBar, SceneMap, TabView } from 'react-native-tab-view'
import {
  View,
  Text,
  TextInput,
  ScrollView,
  useWindowDimensions,
} from 'react-native'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react-native'
import { Colors } from '@/constants/Colors'
import { honoClient } from '@/lib/hono-client'
import { useMutation } from '@tanstack/react-query'

import { authClient } from '@/lib/auth-client'

const TagsTab = () => {
  const [tagName, setTagName] = useState('')
  const [tagDescription, setTagDescription] = useState('')
  const cookies = authClient.getCookie()
  const hcClient = honoClient({ cookies })

  const { mutate, isPending, error } = useMutation({
    mutationFn: hcClient.api['create-tag'].$post,
  })

  return (
    <ScrollView className="flex-1 p-4">
      <View>
        <Text className="font-bold text-2xl">Tags</Text>

        <View className="gap-4 mt-4">
          <TextInput
            value={tagName}
            onChangeText={(text) => setTagName(text)}
            className="border rounded-md border-accent px-4"
            placeholder="name"
          />

          <TextInput
            value={tagDescription}
            onChangeText={(text) => setTagDescription(text)}
            className="border rounded-md border-accent align-top min-h-32 px-4"
            placeholder="description"
            multiline={true}
            numberOfLines={4}
          />

          <Button
            title={isPending ? 'Creating' : 'Create'}
            variant="outline"
            onPress={() => {
              mutate({
                json: {
                  name: tagName,
                  description: tagDescription,
                },
              })
            }}
            prefixLogo={<Plus color={Colors.light.primary} />}
          />
        </View>
      </View>
    </ScrollView>
  )
}

const LawyersTab = () => {
  return (
    <ScrollView className="flex-1 p-4">
      <View>
        <Text className="font-bold text-2xl">Lawyers</Text>

        <View className="gap-4 mt-4">
          <TextInput
            className="border rounded-md border-accent px-4"
            placeholder="name"
          />

          <TextInput
            className="border rounded-md border-accent align-top min-h-32 px-4"
            placeholder="description"
            multiline={true}
            numberOfLines={4}
          />

          <Button
            title="Create"
            variant="outline"
            prefixLogo={<Plus color={Colors.light.primary} />}
          />
        </View>
      </View>
    </ScrollView>
  )
}

const renderScene = SceneMap({
  first: TagsTab,
  second: LawyersTab,
})

const routes = [
  { key: 'first', title: 'Tags' },
  { key: 'second', title: 'Lawyers' },
]

const Admin = () => {
  const layout = useWindowDimensions()
  const [index, setIndex] = useState(0)

  return (
    <TabView
      lazy
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      style={{
        backgroundColor: Colors.light.background,
      }}
      renderTabBar={(props, tabIndex?: number) => (
        <TabBar
          {...props}
          style={{
            backgroundColor: '#f1f5f9',
          }} // Tab bar background
          indicatorStyle={{ backgroundColor: Colors.light.primary }} // Active tab indicator
          activeColor={Colors.light.text} // Active tab text color
          inactiveColor={Colors.light.text} // Inactive tab text color
        />
      )}
    />
  )
}

export default Admin
