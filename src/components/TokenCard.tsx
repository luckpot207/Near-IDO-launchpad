import { Flex, Text, Image } from "@chakra-ui/react";
import { FtTokenDetail } from "../types/listing";
interface Props {
  token: FtTokenDetail
}

export default function TokenCard({ token }: Props) {
  return (
    <Flex
      minHeight="14"
      paddingY="4"
      paddingX="4"
      border='1px solid'
      borderColor='rock.100'
      borderRadius='10px'
      bgColor='rock.50'
      marginBottom='15px'
      alignItems='center'
      justifyContent='space-between'
    >
      <Flex width='30%' flexDirection='column' justifyContent='start'>
        <Flex alignItems='center' justifyContent='space-between'>
          <Text as='h1' fontSize='14px' textAlign='start'>PER NATIVE TOKEN</Text>
          <Text as='h2' fontSize='18px' textAlign='start' marginLeft='10px'>{token.price}</Text>
        </Flex>
        <Flex alignItems='center' justifyContent='space-between'>
          <Text as='h1' fontSize='14px' textAlign='start'>TOTAL</Text>
          <Text as='h2' fontSize='18px' textAlign='start' marginLeft='10px'>{token.supply}</Text>
        </Flex>
      </Flex>
      <Flex width='10%' flexDirection='column' justifyContent='end'>
        <Flex alignItems='center' justifyContent='end'>
          <Text as='h2' fontSize='10px' textAlign='end'>{token.name}</Text>
        </Flex>
        <Flex alignItems='center' justifyContent='space-between'>
          <Image src={token.icon} />
          <Text as='h1' fontSize='14px' textAlign='end' >{token.symbol}</Text>
        </Flex>
      </Flex>
    </Flex>

  )
}