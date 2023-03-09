import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { Heading, HStack, Text, VStack, Icon, useTheme, Image } from "native-base";
import { Entypo } from '@expo/vector-icons'

import { ExerciseDTO } from "@dtos/ExerciseDTO";
import { api } from "@services/api";

type ExerciseCardProps = TouchableOpacityProps & {
  data: ExerciseDTO
}

export function ExerciseCard({data, ...rest}: ExerciseCardProps){
  const { colors } = useTheme()

  return(
    <TouchableOpacity
      {...rest}
    >
      <HStack bg='gray.500' p={2} alignItems='center' pr={4} rounded='md' mb={3}>
        <Image  
          source={{ uri: `${api.defaults.baseURL}/exercise/thumb/${data.thumb}`}}
          alt='Exercício de barra fixa'
          w={16}
          h={16}
          rounded='md'
          mr={4}
          resizeMode='cover'
        />

        <VStack flex={1}>
          <Heading color='white' fontFamily='heading' fontSize='lg'>
            {data.name}
          </Heading>

          <Text color='gray.200' fontFamily='body' fontSize='sm' mt={1} numberOfLines={2}>
            {`${data.series} séries x ${data.repetitions} repetições`}
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