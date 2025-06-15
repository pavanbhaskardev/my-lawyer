import { View, Text, TextInput, ScrollView } from 'react-native'
import React from 'react'
import { Button } from '@/components/ui/button'
import { Dropdown } from 'react-native-element-dropdown'
import { Scale } from 'lucide-react-native'
import { Colors } from '@/constants/Colors'
import { authClient } from '@/lib/auth-client'

const list = [
  { label: 'Item 1', value: '1' },
  { label: 'Item 2', value: '2' },
  { label: 'Item 3', value: '3' },
  { label: 'Item 4', value: '4' },
  { label: 'Item 5', value: '5' },
  { label: 'Item 6', value: '6' },
  { label: 'Item 7', value: '7' },
  { label: 'Item 8', value: '8' },
]

const ApplyForLawyer = () => {
  const { data, isPending } = authClient.useSession()

  if (isPending || !data) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    )
  }

  const { name = '', bio = '', phoneNumber = 0 } = data.user

  return (
    <ScrollView className="flex-1 bg-background">
      <View className="gap-4 flex-1 p-4">
        <View className="flex-row items-center gap-2 mb-2">
          <Scale color={Colors.light.text} size={32} />
          <Text className="text-3xl font-bold">Apply for Lawyer</Text>
        </View>

        <View>
          <Text className="mb-2">Name</Text>
          <TextInput
            className="border rounded-md border-accent px-4"
            placeholder="ex: John Doe"
            defaultValue={name}
          />
        </View>

        <View>
          <Text className="mb-2">Bio</Text>
          <TextInput
            className="border rounded-md border-accent align-top min-h-32 px-4"
            placeholder="description"
            multiline={true}
            numberOfLines={4}
            defaultValue={bio}
          />
        </View>

        <View>
          <Text className="mb-2">Phone Number</Text>
          <TextInput
            className="border rounded-md border-accent px-4"
            keyboardType="number-pad"
            defaultValue={phoneNumber?.toString()}
          />
        </View>

        <View>
          <Text className="mb-2">Experience (Years)</Text>
          <TextInput
            className="border rounded-md border-accent px-4"
            keyboardType="number-pad"
          />
        </View>

        <View>
          <Text className="mb-2">Specialization</Text>

          <Dropdown
            data={list}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Select your Specialization"
            searchPlaceholder="Search..."
            onChange={() => {}}
            style={{
              paddingHorizontal: 16,
              paddingVertical: 8,
              borderWidth: 1,
              borderColor: Colors.light.accent,
              borderRadius: 4,
            }}
          />
        </View>

        <View>
          <Text className="mb-2">State</Text>

          <Dropdown
            data={list}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Select a State"
            searchPlaceholder="Search..."
            onChange={() => {}}
            style={{
              paddingHorizontal: 16,
              paddingVertical: 8,
              borderWidth: 1,
              borderColor: Colors.light.accent,
              borderRadius: 4,
            }}
          />
        </View>

        <View>
          <Text className="mb-2">City</Text>

          <Dropdown
            data={list}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Select a City"
            searchPlaceholder="Search..."
            onChange={() => {}}
            style={{
              paddingHorizontal: 16,
              paddingVertical: 8,
              borderWidth: 1,
              borderColor: Colors.light.accent,
              borderRadius: 4,
            }}
          />
        </View>

        <Button title="Apply" className="mt-4" />
      </View>
    </ScrollView>
  )
}

export default ApplyForLawyer
