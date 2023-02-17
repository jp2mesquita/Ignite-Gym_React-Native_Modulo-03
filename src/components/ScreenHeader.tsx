import { Heading, Center } from "native-base";

type ScreenHeaderProps = {
  title: string
}

export function ScreenHeader({ title }: ScreenHeaderProps) {
  return(
    <Center pt={16} pb={6} bg='gray.600'>
      <Heading color='gray.100' fontSize='xl' fontFamily='heading'>
        {title}
      </Heading>
    </Center>
  )
}