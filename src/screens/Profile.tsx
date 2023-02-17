import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { Center, ScrollView, VStack, Skeleton, Text, Heading, useToast } from "native-base";

import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system';

import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { UserPhoto } from "@components/UserPhoto";
import { ScreenHeader } from "@components/ScreenHeader";

const PHOTO_SIZE= 33

export function Profile(){
  const [photoIsLoading, setPhotoIsLoading] = useState(false)
  const [userPhoto, setUserPhoto] = useState('https://github.com/jp2mesquita.png')

  const toast = useToast()
  
  async function handleUserPhotoSelect(){
    setPhotoIsLoading(true)
    try {
      const selectedPhoto = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4,4],
        allowsEditing: true,
      })
  
      if(selectedPhoto.canceled) {
        return
      }

      

      if(selectedPhoto.assets[0].uri) {
        const photoInfo = await FileSystem.getInfoAsync(selectedPhoto.assets[0].uri)

        if(photoInfo.size && (photoInfo.size > 1024 * 1024 * 5 )) { //bigger than 5MB
          
          toast.show({
            title: 'Essa imagem é muito grande. Escolha uma de até 5MB',
            placement: 'top',
            bgColor: 'red.500'
          })
         
          return
        }

        setUserPhoto(selectedPhoto.assets[0].uri)
      }
  
      
    } catch (error) {
      console.log(error)
    } finally{
      setPhotoIsLoading(false)
    }
  }
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
                source={{ uri: userPhoto}}
              />
          }

          <TouchableOpacity onPress={handleUserPhotoSelect}>
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