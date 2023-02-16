import { Heading, HStack, Text, VStack, Icon, useTheme, Image } from "native-base";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { Entypo } from '@expo/vector-icons'

type ExerciseCardProps = TouchableOpacityProps & {
  title: string
  description: string
  imageUri: string
}

export function ExerciseCard({description, imageUri, title, ...rest}: ExerciseCardProps){
  const { colors } = useTheme()

  return(
    <TouchableOpacity
      {...rest}
    >
      <HStack bg='gray.500' p={2} alignItems='center' pr={4} rounded='md' mb={3}>
        <Image  
          source={{ uri: imageUri}}
          alt='Exercício de barra fixa'
          w={16}
          h={16}
          rounded='md'
          mr={4}
          resizeMode='cover'
        />

        <VStack flex={1}>
          <Heading color='white' fontFamily='heading' fontSize='lg'>
            {title}
          </Heading>

          <Text color='gray.200' fontFamily='body' fontSize='sm' mt={1} numberOfLines={2}>
            3 séries x 12 repetições
        </Text>
        </VStack>

        <TouchableOpacity>
          <Icon 
            as={Entypo}
            name='chevron-thin-right'
            color='gray.300' 
            size={7}
          />
        </TouchableOpacity>
      </HStack>
    </TouchableOpacity>
  )
}