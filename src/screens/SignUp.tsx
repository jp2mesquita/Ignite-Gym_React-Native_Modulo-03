import { VStack, Image, Text, Center, Heading, ScrollView, useNativeBase} from "native-base"

import BackgroundImg from '@assets/background.png'
import  LogoSvg from  '@assets/logo.svg'
import { Input } from "@components/Input"
import { Button } from "@components/Button"
import { useNavigation } from "@react-navigation/native"

export function SignUp() {
  const { goBack }  =  useNavigation()

  function handleGoBack () {
    goBack()
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
        
        <Input 
          placeholder="Nome"
          />

        <Input 
          placeholder="E-mail"
          keyboardType="email-address"  
          autoCapitalize="none"
          />

        <Input 
          placeholder="Senha"
          secureTextEntry  
        />

        <Input 
          placeholder="Confirme a senha"
          secureTextEntry  
        />

        <Button 
          title="Criar e acessar"
        />

      </Center>

        <Button 
          title="Voltar para o login"
          variant='outline'
          mt={24}
          onPress={handleGoBack}
        />


      </VStack>
    </ScrollView>
  )
}