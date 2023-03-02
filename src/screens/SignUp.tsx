import { useState } from "react"
import { Alert } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { VStack, Image, Text, Center, Heading, ScrollView, useToast } from "native-base"
import { useForm, Controller } from 'react-hook-form'
import { yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'


import { api } from "@services/api"
import { useAuth } from "@hooks/useAuth"
import { AppError } from "@utils/AppError"

import  LogoSvg from  '@assets/logo.svg'
import BackgroundImg from '@assets/background.png'

import { Input } from "@components/Input"
import { Button } from "@components/Button"


type formDataProps = {
  email: string
  name: string
  password: string
  passwordConfirm: string
}

const SignUpSchema = yup.object({
  name: yup.string().required('Informe o nome.'),
  email: yup.string().required('Informe o Email.').email('E-mail inválido.'),
  password: yup.string().required('Informe a senha.').min(6, 'A senha deve ter pelo menos 6 dígitos.'),
  passwordConfirm: yup.string().required('Confirme a senha.').oneOf([yup.ref('password')], 'As senhas não conferem.'),

})

export function SignUp() {
  const [isLoading, setIsLoading] = useState(false)

  const { signIn } = useAuth()

  const toast  = useToast()

  const { control, handleSubmit, formState: { errors }} = useForm<formDataProps>({
    resolver: yupResolver(SignUpSchema)
  })

  const { goBack }  =  useNavigation()

  function handleGoBack () {
    goBack()
  }

  async function handleSignUp({name, email, password, passwordConfirm}: formDataProps){
    try {
      setIsLoading(true)
      await api.post('/users', { name, email, password })
      signIn(email, password)

    } catch (error) {
      setIsLoading(false)

      const isAppError = error instanceof AppError
      const title = isAppError ? error.message : 'Não foi possível criar a conta. Tente novamente mais tarde.'

      toast.show({
        title,
        placement: 'top',
        bgColor: 'red.500'
      })

    }
    
  }

  return(
    <ScrollView
    contentContainerStyle={{ flexGrow: 1 }}
    showsVerticalScrollIndicator={false}
  >
    <VStack flex={1} px={10} pb={8}>
      <Image
        defaultSource={BackgroundImg}  
        source={BackgroundImg}
        alt="Pessoas treinando"
        resizeMode="contain"
        position='absolute'
      />

      <Center mt={24} mb={20}>
        <LogoSvg />

        <Text color='gray.100'  fontSize='sm' >
          Treine sua mente  e o seu corpo!
        </Text>
      </Center>

      <Center>
        <Heading color='gray.100' fontSize='xl' mb={6} fontFamily='heading'>
          Crie sua conta
        </Heading>
        
        <Controller 
          control={control}
          name='name'
          render={({ field: { onChange, value}}) => {
            return(
              <Input 
                placeholder="Nome"
                onChangeText={onChange}
                value={value}  
                errorMessage={errors.name?.message}
              />
            )

          }}
        />

        <Controller 
          control={control}
          name='email'
          render={({ field: { onChange, value}}) => {
            return(
              <Input 
                placeholder="E-mail"
                keyboardType="email-address"  
                autoCapitalize="none"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.email?.message}
              />
            )

          }}
        />

        <Controller 
          control={control}
          name='password'
          render={({ field: { onChange, value}}) => {
            return(
              <Input 
                placeholder="Senha"
                secureTextEntry 
                onChangeText={onChange}
                value={value} 
                errorMessage={errors.password?.message}
              />
            )

          }}
        />
        
        <Controller 
          control={control}
          name='passwordConfirm'
          render={({ field: { onChange, value}}) => {
            return(
              <Input 
                placeholder="Confirme a senha"
                secureTextEntry  
                onChangeText={onChange}
                value={value}
                onSubmitEditing={handleSubmit(handleSignUp)}
                returnKeyType='send'
                errorMessage={errors.passwordConfirm?.message}
              />
            )
          }}
        />

        <Button 
          title="Criar e acessar"
          onPress={handleSubmit(handleSignUp)}
          isLoading={isLoading}
        />

      </Center>
        <Button 
          title="Voltar para o login"
          variant='outline'
          mt={12}
          onPress={handleGoBack}
        />

      </VStack>
    </ScrollView>
  )
}