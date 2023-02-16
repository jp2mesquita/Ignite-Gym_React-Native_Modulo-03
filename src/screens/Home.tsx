import { useState } from "react";

import { Group } from "@components/Group";
import { HomeHeader } from "@components/HomeHeader";
import { HStack, VStack, FlatList, Heading, Text } from "native-base";
import { ExerciseCard } from "./ExerciseCard";
import { useNavigation } from "@react-navigation/native";
import { AppNavigationRoutesProps } from "@routes/app.routes";



export function Home(){
  const [groups, setGroups]= useState(['Costas', "Ombros", "Bíceps", 'Tríceps' ])
  const [exercises, setexErcises]= useState(['Puxada frontal', "Remada  curvada", "Remada unilateral", 'Levantamento terra' ])

  const [ groupSelected, setGroupSelected ] = useState('Costas')

  const { navigate } = useNavigation<AppNavigationRoutesProps>()

  function handleSelectGroup(group: string){
    setGroupSelected(group)
  }

  function handleOpenExerciseDetails() {
    navigate('exercise')
  }
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
      />

      <VStack flex={1} px={8}>
        <HStack justifyContent='space-between' mb={5}>
          <Heading color='gray.200' fontSize='md'>
            Exercícios
          </Heading>

          <Text color='gray.200' fontSize='sm'>
            {exercises.length}
          </Text>
        </HStack>

        <FlatList 
          data={exercises}
          keyExtractor={item => item}
          renderItem={ ({ item }) => {
            return(
              <ExerciseCard
                title={item}
                imageUri='https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8dW5pbGF0ZXJhbCUyMHB1bGx1cHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60'
                description={item}
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