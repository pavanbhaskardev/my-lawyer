import { Button } from '@/components/ui/button'
import { Colors } from '@/constants/Colors'
import { useLocalSearchParams } from 'expo-router'
import { Phone } from 'lucide-react-native'
import { View, Text, Image } from 'react-native'
import { lawyers } from '@/constants/Lawyer'

export default function DetailsScreen() {
  const { id } = useLocalSearchParams()
  console.log({ id })
  const lawyerDetails = lawyers.find(({ slug }) => slug === id)

  if (lawyerDetails) {
    const {
      name,
      bio,
      city,
      experience,
      imageURL,
      mobile,
      specialization,
      state,
    } = lawyerDetails

    return (
      <View className="flex-1 bg-background justify-start p-4">
        <Image
          src={imageURL}
          alt={name}
          className="size-36 object-cover rounded-full border"
        />

        <View className="flex-row items-center mt-4 gap-2">
          <Text className="font-bold text-3xl">{name}</Text>
          <Text className="mb-0 text-2xl text-primary">({experience} Yrs)</Text>
        </View>

        <Text>{`${state} ${city}`}</Text>

        <Text className="text-lg max-w-[22rem] mt-3">{bio}</Text>

        <View className="mt-4">
          <Text className="font-bold text-2xl">Specialization</Text>

          <View className="flex-row gap-2 mt-2">
            {specialization.map((item, idx) => (
              <View
                key={idx}
                className="text-lg border px-3 py-2 border-primary bg-primary/10 rounded-full"
              >
                <Text className="text-primary">{item}</Text>
              </View>
            ))}
          </View>
        </View>

        <Button
          title="Contact"
          className="mt-8"
          prefixLogo={<Phone color={Colors.light.background} />}
        />
      </View>
    )
  }

  return (
    <View>
      <Text>Lawyer not found!</Text>
    </View>
  )
}
