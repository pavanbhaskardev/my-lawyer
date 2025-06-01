import { Button } from '@/components/ui/button'
import { Colors } from '@/constants/Colors'
import { useLocalSearchParams } from 'expo-router'
import { Phone } from 'lucide-react-native'
import { View, Text, Image } from 'react-native'

const cases = [
  {
    label: 'Family Law',
  },
  {
    label: 'Property cases',
  },
  {
    label: 'Banking laws',
  },
]

export default function DetailsScreen() {
  const { id } = useLocalSearchParams()

  return (
    <View className="flex-1 bg-background justify-start p-4">
      <Image
        src={'https://mrlawyerfirm.web.app/images/sujithAddanki.png'}
        alt="laywer image"
        className="size-36 object-cover rounded-full border"
      />

      <View className="flex-row items-center mt-4 gap-2">
        <Text className="font-bold text-3xl">Sujith Addaniki</Text>
        <Text className="mb-0 text-2xl text-primary">(2 Yrs)</Text>
      </View>

      <Text>Telenagana, Nanakramguda</Text>

      <Text className="text-lg max-w-[22rem] mt-3">
        Hi, I’m Sujith Addaniki, a practicing lawyer based in Telangana. I
        specialize in criminal, civil, and family law. I believe in making the
        legal process as transparent and stress-free as possible for my clients!
      </Text>

      <View className="mt-4">
        <Text className="font-bold text-2xl">Specialization</Text>

        <View className="flex-row gap-2 mt-2">
          {cases.map((item, idx) => (
            <View
              key={idx}
              className="text-lg border px-3 py-2 border-primary bg-primary/10 rounded-full"
            >
              <Text className="text-primary">{item.label}</Text>
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
