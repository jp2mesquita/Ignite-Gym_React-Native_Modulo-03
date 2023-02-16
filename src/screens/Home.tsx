import { useState } from "react";

import { Group } from "@components/Group";
import { HomeHeader } from "@components/HomeHeader";
import { HStack, VStack, FlatList } from "native-base";



export function Home(){
  const [groups, setGroups]= useState(['Costas', "Ombros", "Bíceps", 'Tríceps' ])
  const [ groupSelected, setGroupSelected ] = useState('costas')

  function handleSelectGroup(group: string){
    setGroupSelected(group)
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
              isActive={groupSelected === item}  
              onPress={() => handleSelectGroup(item)}
            />
          )
        }}
        horizontal
        showsHorizontalScrollIndicator
        _contentContainerStyle={{ px: 8}}
        my={10}
        maxH={10}
      />
    </VStack>
  )
}