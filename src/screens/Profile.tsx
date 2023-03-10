import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { Center, ScrollView, VStack, Skeleton, Text, Heading, useToast, ArrowUpIcon } from "native-base";
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useAuth } from "@hooks/useAuth";

import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system';
import * as yup from 'yup'

import { Input } from "@components/Input";
import { Button } from "@components/Button";
import { UserPhoto } from "@components/UserPhoto";
import { ScreenHeader } from "@components/ScreenHeader";

import { AppError } from "@utils/AppError";

import { api } from "@services/api";

const PHOTO_SIZE= 33

type FormDataProps ={
  name: string
  email: string
  password: string 
  old_passworld: string
  confirm_password: string 
}

const profileSchema = yup.object({
  name: yup.string().required('Informe o nome.'),
  password:  yup
    .string()
    .min(6, 'A senha deve ter pelo menos 6 dígitos.')
    .nullable()
    .transform((value) => !!value ? value : null),
  confirm_password: yup
    .string()
    .nullable()
    .transform((value) => !!value ? value : null)
    .oneOf([yup.ref("password"), null], "A cofirmação de senha não confere.")
    .when("password", {
      is: (Field: any) => Field,
      then: (schema) => schema
        .nullable()
        .required('Informe a confirmação da senha.')
        .transform((value) => !!value ? value : null)
    })
})

export function Profile(){
  const [isUpdating, setIsUpdating] = useState(false)
  const [photoIsLoading, setPhotoIsLoading] = useState(false)
  const [userPhoto, setUserPhoto] = useState('https://github.com/jp2mesquita.png')

  
  const { user } = useAuth()
  const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
    defaultValues: {
      name: user.name,
      email: user.email
    },
    resolver: yupResolver(profileSchema)
  })
  
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

  async function handleProfileUpdate(data: FormDataProps){
    try {
      setIsUpdating(true)
      await api.put('/users', data)

      toast.show({
        title: 'Perfil atualizado com sucesso.',
        placement: 'top',
        bgColor: 'green.700'
      })
    } catch (error) {
      const isAppError = error instanceof AppError
      const title = isAppError ? error.message : "Não foi possível atualizar o perfil."

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      })

    }finally{
      setIsUpdating(false)
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

          <Controller 
            control={control}
            name='name'
            render={({field: {value, onChange}}) => (
              <Input 
                bg="gray.600"
                placeholder="Nome"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.name?.message}
              />
            )}
          />
          
          <Controller 
            control={control}
            name='email'
            render={({field: {value, onChange}}) => (
              <Input 
                bg="gray.600"
                placeholder="E-mail"
            isDisabled

                onChangeText={onChange}
                value={value}
              />
            )}
          />
          
          <Heading color='gray.200' fontSize='md' fontFamily='heading' mb={2} alignSelf='flex-start' mt={12}>
            Alterar senha
          </Heading>

          <Controller 
            control={control}
            name='old_passworld'
            render={({field: {onChange}}) => (
              <Input 
                bg='gray.600'
                placeholder="Senha antiga"
                secureTextEntry
                onChangeText={onChange}
              />
            )}
          />
          
          <Controller 
            control={control}
            name='password'
            render={({field: {onChange}}) => (
              <Input 
                bg='gray.600'
                placeholder="Nova Senha"
                secureTextEntry
                onChangeText={onChange}
                errorMessage={errors.password?.message}

              />
            )}
          />

          <Controller 
            control={control}
            name='confirm_password'
            render={({field: {onChange}}) => (
              <Input 
                bg='gray.600'
                placeholder="Confirme a nova senha"
                secureTextEntry
                onChangeText={onChange}
                errorMessage={errors.confirm_password?.message}

              />
            )}
          />

          <Button 
            title="Atualizar"
            mt={4}
            isLoading={isUpdating}
            onPress={handleSubmit(handleProfileUpdate)}
          />
        </Center>

        
      </ScrollView>
    </VStack>
  )
}