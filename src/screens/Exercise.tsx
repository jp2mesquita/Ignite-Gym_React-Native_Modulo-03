import { TouchableOpacity } from "react-native";
import { Box, Heading, HStack, Icon, Image, ScrollView, Text, useToast, VStack } from "native-base";
import { Feather } from '@expo/vector-icons'
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";

import { AppNavigationRoutesProps } from "@routes/app.routes";

import BodySvg from '@assets/body.svg'
import SeriesSvg from '@assets/series.svg'
import RepetitionsSvg from '@assets/repetitions.svg'
import { Button } from "@components/Button";
import { useCallback, useEffect, useState } from "react";
import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import { ExerciseDTO } from "@dtos/ExerciseDTO";
import { Loading } from "@components/Loading";

type RouteParamsProps = {
  exerciseId: string
}



export function Exercise(){
  const { goBack } = useNavigation<AppNavigationRoutesProps>()
  const [ exerciseDetails, setExerciseDetails ] = useState<ExerciseDTO>({} as ExerciseDTO)
  const [ isLoading, setIsLoading ] = useState(true)

  const route = useRoute()
  const { exerciseId } = route.params as RouteParamsProps

  const toast = useToast()

  function handleGoBack(){
    goBack()
  }
  
  async function fetchExerciseDetails() {
    try {
      setIsLoading(true)
      const {data}  = await api.get(`exercises/${exerciseId}`)
      setExerciseDetails(data)

    } catch (error) {
      const isAppError = error instanceof AppError
      const title =  isAppError ? error.message : "Não foi possível carregar os detalhes do exercício."

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      })
    }finally{
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchExerciseDetails()
  }, [exerciseId])

  return(
    <VStack flex={1}>
      
      <VStack px={8} bg={"gray.600"} pt={12}>
        <TouchableOpacity onPress={handleGoBack}>
          <Icon 
            as={Feather}
            name='arrow-left'
            color='green.500'
            size={6}
          />
        </TouchableOpacity>

        <HStack justifyContent='space-between' mt={4} mb={8} alignItems='center' >
          <Heading color='gray.100' fontSize='lg' fontFamily='heading' flexShrink={1}>
            {exerciseDetails.name}
          </Heading>

          <HStack alignItems='center'>
            <BodySvg />
            <Text color='gray.200' ml={1} textTransform='capitalize'>
              {exerciseDetails.group}
            </Text>
          </HStack>
        </HStack>
      </VStack>

      {isLoading 
        ? <Loading />
        : <VStack p={8}>
            <Box
              rounded='lg'
              mb={3}
              overflow='hidden'
            >
              <Image 
                w='full'
                h={80}
                source={{ uri: `${api.defaults.baseURL}/exercise/demo/${exerciseDetails.demo}`}}
                alt='Nome do Exercício'
              
                resizeMode='cover'
                rounded='lg'
              />
            </Box>

            <Box bg='gray.600'rounded="md" pb={4} px={4}>
              <HStack alignItems='center' justifyContent='space-around' mb={6} mt={5}>
                <HStack>
                  <SeriesSvg />
                  <Text color='gray.200' ml={2}>
                    {exerciseDetails.series} séries
                  </Text>
                </HStack>

                <HStack>
                  <RepetitionsSvg />
                  <Text color='gray.200' ml={2}>
                    {exerciseDetails.repetitions} repetições
                  </Text>
                </HStack>
              </HStack>

              <Button 
                title="Marcar como realizado"
              />
            </Box>
          </VStack>
      }

    </VStack>
  )
}