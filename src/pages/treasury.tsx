import { Flex, Grid, GridItem, Hide, Image, Show, Spacer, Text, VStack } from "@chakra-ui/react";
import TokenCard from "../components/TokenCard";
import TitleCard from "../components/TitleCard";
import SEAT from "../assets/img/icons/seat.svg"
import { token1, token2, token3, token4, token5 } from "../utils/tokens";

export default function Treasury() {
  return (
    <>
      <TitleCard title="Treasury" />
      <Flex
        width='100%'
        marginY="4"
        padding="8"
        shadow="lg"
        border='1px solid'
        borderRadius="2xl"
        borderColor='rock.300'
        flexDirection='column'
      >
        <Flex flexDirection='column'>
          <Flex marginBottom='20px'>
            <Text as='h1' fontSize='20px' textAlign='start'>PEGASUS</Text>
          </Flex>
          <Show above="sm">
            <Grid
              minHeight="14"
              paddingY="4"
              paddingX="4"
              templateColumns={'repeat(2, 1fr)'}
              border='1px solid'
              borderColor='rock.100'
              borderRadius='10px'
              bgColor='rock.50'
              margin='10 0px'
              alignItems='center'
            >
              <GridItem justifySelf={'left'} justifyContent='start'>
                <Flex alignItems='center' justifyContent='space-between'>
                  <Text as='h1' fontSize='14px' textAlign='start'>CIRCULATING SUPPLY</Text>
                  <Text as='h2' fontSize='18px' textAlign='start' marginLeft='10px'>0.0</Text>
                </Flex>
                <Flex alignItems='center' justifyContent='space-between'>
                  <Text as='h1' fontSize='14px' textAlign='start'>BURNED</Text>
                  <Text as='h2' fontSize='18px' textAlign='start' marginLeft='10px'>0.0</Text>
                </Flex>
                <Flex alignItems='center' justifyContent='space-between'>
                  <Text as='h1' fontSize='14px' textAlign='start'>TOTAL SUPPLY</Text>
                  <Text as='h2' fontSize='18px' textAlign='start' marginLeft='10px'>0.0</Text>
                </Flex>
              </GridItem>
              <GridItem justifySelf={'right'} justifyContent='end'>
                <Show above="md">
                  <Flex alignItems='center' justifyContent='end'>
                    <Text as='h2' fontSize='10px' textAlign='end'>PEGASUS</Text>
                  </Flex>
                  <Flex alignItems='center' width={'80px'} justifyContent={'end'} >
                    <Image src={SEAT} />
                    <Spacer/>
                    <Text as='h1' fontSize='14px' textAlign='end' >PGSS</Text>
                  </Flex>
                </Show>
                <Hide above="md" >
                  <Flex alignItems='end' flexDirection={'column'}  justifyContent='center'>
                    <Text as='h2' fontSize='10px' textAlign='end'>PEGASUS</Text>
                    <Image src={SEAT} />
                    <Text as='h1' fontSize='14px' textAlign='end' >PGSS</Text>
                  </Flex>
                </Hide>
              </GridItem>
            </Grid>
          </Show>
          <Hide above="sm">
            <Flex
              minHeight="14"
              paddingY="4"
              paddingX="4"
              border='1px solid'
              borderColor='rock.100'
              borderRadius='10px'
              bgColor='rock.50'
              margin='10 0px'
              flexDirection={'column'}
              >
              <Flex alignItems='center' justifyContent='space-between'>
                <Text as='h1' fontSize='14px' textAlign='start'>CIRCULATING SUPPLY</Text>
                <Text as='h2' fontSize='18px' textAlign='start' marginLeft='10px'>0.0</Text>
              </Flex>
              <Flex alignItems='center' justifyContent='space-between'>
                <Text as='h1' fontSize='14px' textAlign='start'>BURNED</Text>
                <Text as='h2' fontSize='18px' textAlign='start' marginLeft='10px'>0.0</Text>
              </Flex>
              <Flex alignItems='center' justifyContent='space-between'>
                <Text as='h1' fontSize='14px' textAlign='start'>TOTAL SUPPLY</Text>
                <Text as='h2' fontSize='18px' textAlign='start' marginLeft='10px'>0.0</Text>
              </Flex>
              <Flex marginTop={'3px'} >
                <Flex alignItems='center' justifyContent='start'>
                  <Text as='h2' fontSize='10px' textAlign='start'>PEGASUS</Text>
                </Flex>
                <Spacer/>
                <Flex alignItems='center' width={'60px'}  justifyContent={'end'}>
                  <Image src={SEAT} />
                  <Spacer/>
                  <Text as='h1' fontSize='14px' textAlign='end' >PGSS</Text>
                </Flex>
              </Flex>
            </Flex>
          </Hide>

        </Flex>
        <Flex flexDirection='column' marginTop='30px'>
          <Flex marginBottom='20px'>
            <Text as='h1' fontSize='20px' textAlign='start'>TREASURY TOKENS</Text>
          </Flex>
          <TokenCard token={token3} />
          <TokenCard token={token1} />
          <TokenCard token={token5} />
          <TokenCard token={token2} />
          <TokenCard token={token4} />
        </Flex>
      </Flex>
    </>
  )
}