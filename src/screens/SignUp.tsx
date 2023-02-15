import { VStack, Image, Text, Center, Heading, ScrollView} from "native-base"

import BackgroundImg from '@assets/background.png'
import  LogoSvg from  '@assets/logo.svg'
import { Input } from "@components/Input"
import { Button } from "@components/Button"

export function Signup() {
  return(
    <ScrollView
    contentContainerStyle={{ flexGrow: 1 }}
    showsVerticalScrollIndicator={false}
  >
    <VStack flex={1} bg='gray.700' px={10} pb={8}>
      <Image 
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
        />


      </VStack>
    </ScrollView>
  )
}