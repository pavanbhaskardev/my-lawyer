import { View, TextInput, ScrollView, Text, Image } from 'react-native'
import React from 'react'
import { Search, Settings2 } from 'lucide-react-native'
import { Colors } from '@/constants/Colors'
import { Button } from '@/components/ui/button'
import { Link } from 'expo-router'

// lawyers
// experience
// cases handling
// location -> state, city
// phone-number

const Lawyers = () => {
  return (
    <View className="flex-1 bg-background">
      <ScrollView className="flex-1 py-4 px-4">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
          <View
            className="border border-accent mb-6 rounded-md px-2 py-2.5"
            key={item}
          >
            <Link href={'/(dashboard)/lawyers/sujith-addaniki'}>
              <View className="flex-1 flex-row gap-2">
                <Image
                  src={
                    item % 2 === 0
                      ? 'https://mrlawyerfirm.web.app/images/sujithAddanki.png'
                      : 'https://mrlawyerfirm.web.app/images/rajeshAddanki.png'
                  }
                  alt="laywer image"
                  className="size-16 object-cover rounded-full"
                />

                <View className="flex mt-2">
                  <Text className="text-xl font-bold">Sujith Addanki</Text>
                  <Text className="">Telangana, Nanakramguda</Text>
                </View>
              </View>
            </Link>
          </View>
        ))}
      </ScrollView>

      <View className="flex-row gap-2 pt-2 pb-4 px-4">
        <View className="relative flex-1">
          <TextInput
            placeholder="Search..."
            className="border rounded-full pl-11 flex-1"
          />

          <View className="absolute top-3 left-3">
            <Search size={20} color={Colors.light.text} />
          </View>
        </View>

        <Button
          title=""
          variant="outline"
          showText={false}
          className="bg-background border-text rounded-full size-12 px-0"
          prefixLogo={<Settings2 color={Colors.light.text} size={24} />}
        />
      </View>
    </View>
  )
}

export default Lawyers
