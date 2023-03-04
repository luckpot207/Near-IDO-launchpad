import { Flex, Box, Text, Image } from "@chakra-ui/react";

interface Props {
  title: string
  value: string
  tokenTitle: string
  tokenLogo: string
  tokenTicker: string
}

export default function InfoCard(props: Props) {
  return (
    <Flex
      width={'30%'}
      minHeight='14'
      paddingY='2'
      paddingX='2'
      alignItems='center'
      border='1px solid'
      borderColor='rock.100'
      borderRadius='10px'
      bgColor='rock.50'
    >
      <Flex width='60%' flexDirection='column'>
        <Text as='h1' fontSize='14px' textAlign='start'>{props.title}</Text>
        <Text as='h2' fontSize='18px' textAlign='start' marginTop='10px'>{props.value}</Text>
      </Flex>
      <Flex width='40%' justifyContent='end' flexDirection='column'>
        <Flex margin='5px' justifyContent='end'>
          <Text fontSize='0.7vw' textAlign='end' marginTop='10px' width='max-content'>{props.tokenTitle}</Text>
        </Flex >
        <Flex justifyContent='end' margin='5px'>
          <Image src={props.tokenLogo} />
          <Text as='h1' fontSize='16px' textAlign='end' marginLeft='15px'>{props.tokenTicker}</Text>
        </Flex>
      </Flex>
    </Flex>
  )
}