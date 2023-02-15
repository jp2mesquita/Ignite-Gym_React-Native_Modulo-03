import { Button as NativeBaseButton, IButtonProps, Text } from "native-base"

interface ButtonProps extends IButtonProps{
  title: string
  variant?: 'solid' | 'outline'
}

export function Button({title, variant, ...rest}: ButtonProps) {
  const isOutline = variant === 'outline'
  return(
    <NativeBaseButton
      w='full'
      h={14}
      rounded='sm'
      bg={isOutline ? 'transparent' : 'green.700'}
      borderWidth={isOutline ? 1 : 0}
      borderColor='green.500'
      _pressed={{
        bg: isOutline ? 'gray.500' : 'green.500'
      }}
      {...rest}
    >
      <Text 
        color={isOutline ? 'green.500' : 'white'}
        fontFamily='heading'  
        fontSize='sm'
      >
        {title}
      </Text>
    </NativeBaseButton>
  )
}