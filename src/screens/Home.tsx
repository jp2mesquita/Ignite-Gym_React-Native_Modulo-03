import { useCallback, useEffect, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { HStack, VStack, FlatList, Heading, Text, useToast } from "native-base";

import { ExerciseCard } from "./ExerciseCard";

import { Group } from "@components/Group";
import { HomeHeader } from "@components/HomeHeader";

import { api } from "@services/api";
import { AppError } from "@utils/AppError";
import { AppNavigationRoutesProps } from "@routes/app.routes";

import { ExerciseDTO } from "@dtos/ExerciseDTO";

export function Home(){
  const [groups, setGroups]= useState<string[]>([])
  const [exercises, setexErcises]= useState<ExerciseDTO[]>([])

  const [ groupSelected, setGroupSelected ] = useState('')

  const { navigate } = useNavigation<AppNavigationRoutesProps>()

  const toast = useToast()


  function handleOpenExerciseDetails() {
    navigate('exercise')
  }

  async function fetchGroups(){
    try {

      const response = await api.get('/groups')
      setGroups(response.data)

    } catch (error) {
      const isAppError = error instanceof AppError
      const title =  isAppError ? error.message : "Não foi possível carregar os grupos musculares."

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      })
    }
  }

  async function fetchExercicesByGroup(){
    try {
      const response= await api.get(`/exercises/bygroup/${groupSelected}`)
      console.log(response.data)
      setexErcises(response.data)
    }  catch (error) {
      const isAppError = error instanceof AppError
      const title =  isAppError ? error.message : "Não foi possível carregar os exercícios."

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      })
    }
  }

  async function handleSelectGroup(group: string){
    setGroupSelected(group)
    await fetchExercicesByGroup()
  }

  useEffect(() => {
    fetchGroups()
    setGroupSelected(groups[0])
  }, [])

  useFocusEffect( useCallback(() => {
    fetchExercicesByGroup()
  }, [groupSelected]))


  return(
    <VStack flex={1}>
      <HomeHeader />

      <FlatList 
        data={groups}
        keyExtractor={item => item}
        renderItem={({ item }) =>{
          return(
            <Group 
              name={item} 
              isActive={String(groupSelected).toUpperCase() === String(item).toUpperCase()}  
              onPress={() => handleSelectGroup(item)}
            />
          )
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
        _contentContainerStyle={{ px: 8}}
        my={10}
        maxH={10}
        minH={10}
      />

      <VStack flex={1} px={8}>
        <HStack justifyContent='space-between' mb={5}>
          <Heading color='gray.200' fontSize='md' fontFamily='heading'>
            Exercícios
          </Heading>

          <Text color='gray.200' fontSize='sm'>
            {exercises.length}
          </Text>
        </HStack>

        <FlatList 
          data={exercises}
          keyExtractor={item => item.id}
          renderItem={ ({ item }) => {
            return(
              <ExerciseCard
                data={item}
                onPress={handleOpenExerciseDetails} 
              />
            )
          }}
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{
            paddingBottom: 16
          }}
        />
        
      </VStack>
    </VStack>
  )
}