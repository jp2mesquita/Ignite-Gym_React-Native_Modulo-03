import { Center, ScrollView, VStack, Skeleton, Text, Heading } from "native-base";

import { UserPhoto } from "@components/UserPhoto";
import { ScreenHeader } from "@components/ScreenHeader";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { Input } from "@components/Input";
import { Button } from "@components/Button";

const PHOTO_SIZE= 33

export function Profile(){
  const [photoIsLoading, setPhotoIsLoading] = useState(false)

  return(
    <VStack flex={1}>
      <ScreenHeader 
        title="Perfil"
      />

      <ScrollView
      _contentContainerStyle={{ paddingBottom: 36}}
      >
        <Center mt={6} px={10}>
          {
            photoIsLoading
            ? <Skeleton 
                w={PHOTO_SIZE} 
                h={PHOTO_SIZE} 
                rounded='full' 
                startColor='gray.500'
                endColor='gray.400'
              />
            : <UserPhoto 
                size={PHOTO_SIZE} 
                alt='Foto de perfil do usuário' 
                source={{ uri: 'https://github.com/jp2mesquita.png'}}
              />
          }

          <TouchableOpacity>
            <Text color='green.500' fontWeight='bold' fontSize="md" mt={2} mb={8}>
              Alterar foto
            </Text>
          </TouchableOpacity>

          <Input 
            bg="gray.600"
            placeholder="Nome"
          />

          <Input 
            bg="gray.600"
            placeholder="jp-mesquita@live.com"
            isDisabled
          />

          <Heading color='gray.200' fontSize='md' mb={2} alignSelf='flex-start' mt={12}>
            Alterar senha
          </Heading>
          <Input 
            bg='gray.600'
            placeholder="Senha antiga"
            secureTextEntry
          />

          <Input 
            bg='gray.600'
            placeholder="Nova Senha"
            secureTextEntry
          />

          <Input 
            bg='gray.600'
            placeholder="Confirme a nova senha"
            secureTextEntry
          />

          <Button 
            title="Atualizar"
            mt={4}
          />
        </Center>

        
      </ScrollView>
    </VStack>
  )
}