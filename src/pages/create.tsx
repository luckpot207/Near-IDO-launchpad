import { useState, useEffect } from "react";
import { Box, Flex, Heading, Text, Input, useColorModeValue, Select } from "@chakra-ui/react";
import CreationCard from "../components/CreationCard";
import { ListingDetail } from "../types/listing";
import { token1, token2 } from "../utils/tokens";

export default function Create() {
  const InputColorChanger = useColorModeValue("rock.900", "black");
  const [tokenName, setTokenName] = useState<string>('Noname Sales')

  const listing1: ListingDetail = {
    fromToken: token1,
    toToken: token2,
    startTime: 1676419200000,
    endTime: 1677024000000,
    progress: 70
  }

  useEffect(() => {
    if (!tokenName) setTokenName('Noname Sales')
  }, [tokenName])
  return (
    <Box as="main" padding={{ base: "4", md: "8" }} maxWidth="5xl" marginX="auto" >
      <Box maxWidth="2xl" marginX="auto" borderRadius="lg" paddingX="6" paddingY="8" >
        <Heading fontSize="5xl" as='h1'>Create Listing</Heading>
      </Box>
      <Flex
        marginX="auto"
        paddingX="6"
        paddingY="8"
        shadow="lg"
        border='1px solid'
        borderRadius="2xl"
        borderColor='rock.300'
        flexDirection='column'
      >
        <Flex marginBottom='20px'>
          <Text as='h1' fontSize='20px' textAlign='start'>CREATE</Text>
        </Flex>
        <Flex justifyContent='start' alignItems='center' flexDirection='column'>
          <Flex width='100%'>
            <Text as='h3' fontSize='14px' textAlign='start'>Listing Token Title</Text>
          </Flex>
          <Input
            width='100%'
            minHeight="10"
            paddingY="2"
            paddingX="5"
            borderRadius='2xl'
            bgColor='rock.50'
            marginTop='5px'
            alignItems='center'
            placeholder="$ NEW Token Name"
            _placeholder={{ color: 'rock.300' }}
            fontSize='18px'
            color={InputColorChanger}
            onChange={e => setTokenName(e.target.value)}
          />
        </Flex>
        <Flex justifyContent='start' alignItems='center' flexDirection='column' marginTop='10px'>
          <Flex width='100%'>
            <Text as='h3' fontSize='14px' textAlign='start'>Input Token(a token you want to receive)</Text>
          </Flex>
          <Select
            width='100%'
            minHeight="10"
            borderRadius='2xl'
            bgColor='rock.50'
            marginTop='5px'
            alignItems='center'
            placeholder="Select an existing token or enter a new token account ID"
            _placeholder={{ color: 'red' }}
            fontSize='18px'
            color={InputColorChanger}
          >
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
          </Select>
        </Flex>
        <Flex justifyContent='start' alignItems='center' flexDirection='column' marginTop='10px'>
          <Flex width='100%'>
            <Text as='h3' fontSize='14px' textAlign='start'>Output Token(a token you want to offer)</Text>
          </Flex>
          <Input
            width='100%'
            minHeight="10"
            paddingY="2"
            paddingX="5"
            borderRadius='2xl'
            bgColor='rock.50'
            marginTop='5px'
            alignItems='center'
            placeholder="Select an existing token or enter a new token account ID"
            _placeholder={{ color: 'rock.300' }}
            fontSize='18px'
            color={InputColorChanger}
          />
        </Flex>
        <Flex justifyContent='space-between'>
          <Flex justifyContent='start' alignItems='center' flexDirection='column' marginTop='10px' width='45%'>
            <Flex width='100%'>
              <Text as='h3' fontSize='14px' textAlign='start'>Start Time</Text>
            </Flex>
            <Input
              width='100%'
              minHeight="10"
              paddingY="2"
              paddingX="5"
              borderRadius='2xl'
              bgColor='rock.50'
              marginTop='5px'
              alignItems='center'
              placeholder="Select an existing token or enter a new token account ID"
              _placeholder={{ color: 'rock.300' }}
              fontSize='18px'
              color={InputColorChanger}
              type="date"
            />
          </Flex>
          <Flex justifyContent='start' alignItems='center' flexDirection='column' marginTop='10px' width='45%'>
            <Flex width='100%'>
              <Text as='h3' fontSize='14px' textAlign='start'>End Time</Text>
            </Flex>
            <Input
              width='100%'
              minHeight="10"
              paddingY="2"
              paddingX="5"
              borderRadius='2xl'
              bgColor='rock.50'
              marginTop='5px'
              alignItems='center'
              placeholder="Select an existing token or enter a new token account ID"
              _placeholder={{ color: 'rock.300' }}
              fontSize='18px'
              color={InputColorChanger}
              type="date"
            />
          </Flex>
        </Flex>
      </Flex>
      <Flex justifyContent='center' marginTop='40px'>
        <CreationCard id={1} listing={listing1} tokenName={tokenName} />
      </Flex>
    </Box>
  )
}