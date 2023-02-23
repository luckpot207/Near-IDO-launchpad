import { Flex, Image, Text, Button, useBoolean, Grid, GridItem, Show, Hide, Spacer, Box } from "@chakra-ui/react";
import TokenCard from "../components/TokenCard";
import SEAT from "../assets/img/icons/seat.svg"
import chop from "../assets/img/icons/chop.svg"
import kung from "../assets/img/icons/kung.svg"
import divis from "../assets/img/icons/divis.svg"
import { token1, token2, token3, token4, token5 } from "../utils/tokens";
import TitleCard from "../components/TitleCard";
import DashBoardDetail from "../components/dashBoardDetail";
import { useColor } from '../hooks';



export default function Account() {
  const listing1 = {
    fromToken: token1,
    toToken: token2,
    startTime: 1676419200000,
    endTime: 1677024000000,
    progress: 70
  }
  const color = useColor();
  const [flag, setFlag] = useBoolean();
  return (
    <>
      <TitleCard title="USER DASHBOARD" />
      {flag ? (<DashBoardDetail title={'STARLUX'} subtitle={'1% IDO OFFERINGS'} listing={listing1} />) : (

        <Flex
          marginY="4"
          padding='8'
          shadow="lg"
          border='1px solid'
          borderRadius="2xl"
          borderColor='rock.300'
          flexDirection='column'
        >
          <Flex flexDirection='column'>
            <Flex marginBottom='20px'>
              <Text as='h1' fontSize='20px' textAlign='start' color={color.green}>PARTICIPATED LAUNCHPAD TOKENS</Text>
            </Flex>
            <Box>
              <Show above="sm">
                <Grid
                  minHeight="14"
                  paddingY="4"
                  paddingX="4"
                  border='1px solid'
                  borderColor='rock.100'
                  borderRadius='10px'
                  bgColor='rock.50'
                  margin='15px 0px'
                  alignItems='center'
                  templateColumns={'repeat(3, 1fr)'}

                >
                  <GridItem width={'100%'} justifySelf='left' justifyContent={'start'}>
                    <Flex alignItems='center' justifyContent='space-between'>
                      <Text as='h1' fontSize='14px' textAlign='start'>PRICE</Text>
                      <Spacer />
                      <Text as='h2' fontSize='18px' textAlign='start' marginLeft='10px'>USD $0.05</Text>
                    </Flex>
                    <Flex alignItems='center' justifyContent='space-between'>
                      <Text as='h1' fontSize='14px' textAlign='start'>TOKENS PURCHASED</Text>
                      <Spacer />
                      <Text as='h2' fontSize='18px' textAlign='start' marginLeft='10px'>81,000</Text>
                    </Flex>
                  </GridItem>
                  <GridItem justifySelf={'end'}>
                    <Button width='100%' fontSize='10px' color={color.background} bg=' linear-gradient(360deg, #9CA3AF 0%, #E5E7EB 122.97%);' onClick={setFlag.toggle}>DETAILS</Button>
                  </GridItem>
                  <GridItem justifySelf='right'>
                    <Show above="md">
                      <Flex alignItems='center' justifyContent='end'>
                        <Text as='h2' fontSize='10px' textAlign='end'>PEGASUS</Text>
                      </Flex>
                      <Flex alignItems='center' width={'115px'} justifyContent={'end'} >
                        <Image src={SEAT} />
                        <Spacer />
                        <Text as='h1' fontSize='14px' textAlign='end' >PGSS</Text>
                      </Flex>
                    </Show>
                    <Hide above="md" >
                      <Flex alignItems='end' flexDirection={'column'} justifyContent='center'>
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
                    <Text as='h1' fontSize='14px' textAlign='start'>PRICE</Text>
                    <Text as='h2' fontSize='18px' textAlign='start' marginLeft='10px'>USD $0.05</Text>
                  </Flex>
                  <Flex alignItems='center' justifyContent='space-between'>
                    <Text as='h1' fontSize='14px' textAlign='start'>TOKENS PURCHASED</Text>
                    <Text as='h2' fontSize='18px' textAlign='start' marginLeft='10px'>81,000</Text>
                  </Flex>
                  <Flex>
                    <Button width='100%' fontSize='10px' color={color.background} bg=' linear-gradient(360deg, #9CA3AF 0%, #E5E7EB 122.97%);' onClick={setFlag.toggle}>DETAILS</Button>
                  </Flex>
                  <Flex marginTop={'3px'} >
                    <Flex alignItems='center' justifyContent='start'>
                      <Text as='h2' fontSize='10px' textAlign='start'>PEGASUS</Text>
                    </Flex>
                    <Spacer />
                    <Flex alignItems='center' width={'60px'} justifyContent={'end'}>
                      <Image src={SEAT} />
                      <Spacer />
                      <Text as='h1' fontSize='14px' textAlign='end' >PGSS</Text>
                    </Flex>
                  </Flex>
                </Flex>
              </Hide>
            </Box>
            <Box>
              <Show above="sm">
                <Grid
                  minHeight="14"
                  paddingY="4"
                  paddingX="4"
                  border='1px solid'
                  borderColor='rock.100'
                  borderRadius='10px'
                  bgColor='rock.50'
                  margin='15px 0px'
                  alignItems='center'
                  templateColumns={'repeat(3, 1fr)'}

                >
                  <GridItem width={'100%'} justifySelf='left' justifyContent={'start'}>
                    <Flex alignItems='center' justifyContent='space-between'>
                      <Text as='h1' fontSize='14px' textAlign='start'>PRICE</Text>
                      <Spacer />
                      <Text as='h2' fontSize='18px' textAlign='start' marginLeft='10px'>USD $0.05</Text>
                    </Flex>
                    <Flex alignItems='center' justifyContent='space-between'>
                      <Text as='h1' fontSize='14px' textAlign='start'>TOKENS PURCHASED</Text>
                      <Spacer />
                      <Text as='h2' fontSize='18px' textAlign='start' marginLeft='10px'>81,000</Text>
                    </Flex>
                  </GridItem>
                  <GridItem justifySelf={'end'}>
                    <Button width='100%' fontSize='10px' color={color.background} bg=' linear-gradient(360deg, #9CA3AF 0%, #E5E7EB 122.97%);' onClick={setFlag.toggle}>DETAILS</Button>
                  </GridItem>
                  <GridItem justifySelf='right'>
                    <Show above="md">
                      <Flex alignItems='center' justifyContent='end'>
                        <Text as='h2' fontSize='10px' textAlign='end'>PEGASUS</Text>
                      </Flex>
                      <Flex alignItems='center' width={'115px'} justifyContent={'end'} >
                        <Image src={SEAT} />
                        <Spacer />
                        <Text as='h1' fontSize='14px' textAlign='end' >PGSS</Text>
                      </Flex>
                    </Show>
                    <Hide above="md" >
                      <Flex alignItems='end' flexDirection={'column'} justifyContent='center'>
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
                    <Text as='h1' fontSize='14px' textAlign='start'>PRICE</Text>
                    <Text as='h2' fontSize='18px' textAlign='start' marginLeft='10px'>USD $0.05</Text>
                  </Flex>
                  <Flex alignItems='center' justifyContent='space-between'>
                    <Text as='h1' fontSize='14px' textAlign='start'>TOKENS PURCHASED</Text>
                    <Text as='h2' fontSize='18px' textAlign='start' marginLeft='10px'>81,000</Text>
                  </Flex>
                  <Flex>
                    <Button width='100%' fontSize='10px' color={color.background} bg=' linear-gradient(360deg, #9CA3AF 0%, #E5E7EB 122.97%);' onClick={setFlag.toggle}>DETAILS</Button>
                  </Flex>
                  <Flex marginTop={'3px'} >
                    <Flex alignItems='center' justifyContent='start'>
                      <Text as='h2' fontSize='10px' textAlign='start'>PEGASUS</Text>
                    </Flex>
                    <Spacer />
                    <Flex alignItems='center' width={'60px'} justifyContent={'end'}>
                      <Image src={SEAT} />
                      <Spacer />
                      <Text as='h1' fontSize='14px' textAlign='end' >PGSS</Text>
                    </Flex>
                  </Flex>
                </Flex>
              </Hide>
            </Box>

            {/* SEATLAB NFT */}


          </Flex>

          {/* OTHER LAUNCHPAD TOKENS */}

          <Flex flexDirection='column' marginTop='30px'>
            <Flex marginBottom='20px'>
              <Text as='h1' fontSize='20px' textAlign='start' color={color.blue}>OTHER LAUNCHPAD TOKENS</Text>
            </Flex>
            <Box>
              <Show above="sm">
                <Grid
                  minHeight="14"
                  paddingY="4"
                  paddingX="4"
                  border='1px solid'
                  borderColor='rock.100'
                  borderRadius='10px'
                  bgColor='rock.50'
                  margin='15px 0px'
                  alignItems='center'
                  templateColumns={'repeat(3, 1fr)'}

                >
                  <GridItem width={'100%'} justifySelf='left' justifyContent={'start'}>
                    <Flex alignItems='center' justifyContent='space-between'>
                      <Text as='h1' fontSize='14px' textAlign='start'>PRICE</Text>
                      <Spacer />
                      <Text as='h2' fontSize='18px' textAlign='start' marginLeft='10px'>USD $0.01</Text>
                    </Flex>
                    <Flex alignItems='center' justifyContent='space-between'>
                      <Text as='h1' fontSize='14px' textAlign='start'>STATUS</Text>
                      <Spacer />
                      <Text as='h2' fontSize='18px' textAlign='start' marginLeft='10px'>IS LIVE</Text>
                    </Flex>
                    <Flex alignItems='center' justifyContent='space-between'>
                      <Text as='h1' fontSize='14px' textAlign='start'>TOKENS ON SALE</Text>
                      <Spacer />
                      <Text as='h2' fontSize='18px' textAlign='start' marginLeft='10px'>70,000,000 </Text>
                    </Flex>
                  </GridItem>
                  <GridItem justifySelf={'end'}>
                    <Button width='100%' fontSize='10px' color={color.background} bg='linear-gradient(360deg, #9A3FF4 0%, #D5B5FF 122.97%);' onClick={setFlag.toggle}>DETAILS</Button>
                  </GridItem>
                  <GridItem justifySelf='right'>
                    <Show above="md">
                      <Flex alignItems='center' justifyContent='end'>
                        <Text as='h2' fontSize='10px' textAlign='end'>PEGASUS</Text>
                      </Flex>
                      <Flex alignItems='center' width={'115px'} justifyContent={'end'} >
                        <Image src={SEAT} />
                        <Spacer />
                        <Text as='h1' fontSize='14px' textAlign='end' >PGSS</Text>
                      </Flex>
                    </Show>
                    <Hide above="md" >
                      <Flex alignItems='end' flexDirection={'column'} justifyContent='center'>
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
                    <Text as='h1' fontSize='14px' textAlign='start'>PRICE</Text>
                    <Text as='h2' fontSize='18px' textAlign='start' marginLeft='10px'>USD $0.05</Text>
                  </Flex>
                  <Flex alignItems='center' justifyContent='space-between'>
                    <Text as='h1' fontSize='14px' textAlign='start'>TOKENS PURCHASED</Text>
                    <Text as='h2' fontSize='18px' textAlign='start' marginLeft='10px'>81,000</Text>
                  </Flex>
                  <Flex>
                    <Button width='100%' fontSize='10px' color={color.background} bg=' linear-gradient(360deg, #9CA3AF 0%, #E5E7EB 122.97%);' onClick={setFlag.toggle}>DETAILS</Button>
                  </Flex>
                  <Flex marginTop={'3px'} >
                    <Flex alignItems='center' justifyContent='start'>
                      <Text as='h2' fontSize='10px' textAlign='start'>PEGASUS</Text>
                    </Flex>
                    <Spacer />
                    <Flex alignItems='center' width={'60px'} justifyContent={'end'}>
                      <Image src={SEAT} />
                      <Spacer />
                      <Text as='h1' fontSize='14px' textAlign='end' >PGSS</Text>
                    </Flex>
                  </Flex>
                </Flex>
              </Hide>
            </Box>
            <Box>
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
                        <Text as='h2' fontSize='10px' textAlign='end'>KUNG TOKEN</Text>
                      </Flex>
                      <Flex alignItems='center' width={'115px'} justifyContent={'end'} >
                        <Image src={kung} />
                        <Spacer />
                        <Text as='h1' fontSize='14px' textAlign='end' >KUNG</Text>
                      </Flex>
                    </Show>
                    <Hide above="md" >
                      <Flex alignItems='end' flexDirection={'column'} justifyContent='center'>
                        <Text as='h2' fontSize='10px' textAlign='end'>KUNG TOKEN</Text>
                        <Image src={kung} />
                        <Text as='h1' fontSize='14px' textAlign='end' >KUNG</Text>
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
                      <Text as='h2' fontSize='10px' textAlign='start'>KUNG TOKEN</Text>
                    </Flex>
                    <Spacer />
                    <Flex alignItems='center' width={'60px'} justifyContent={'end'}>
                      <Image src={kung} />
                      <Spacer />
                      <Text as='h1' fontSize='14px' textAlign='end' >KUNG</Text>
                    </Flex>
                  </Flex>
                </Flex>
              </Hide>
            </Box>
            <Box>
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
                        <Text as='h2' fontSize='10px' textAlign='end'>DIVIS NFT</Text>
                      </Flex>
                      <Flex alignItems='center' width={'115px'} justifyContent={'end'} >
                        <Image src={divis} />
                        <Spacer />
                        <Text as='h1' fontSize='14px' textAlign='end' >DIVIS</Text>
                      </Flex>
                    </Show>
                    <Hide above="md" >
                      <Flex alignItems='end' flexDirection={'column'} justifyContent='center'>
                        <Text as='h2' fontSize='10px' textAlign='end'>DIVIS NFT</Text>
                        <Image src={divis} />
                        <Text as='h1' fontSize='14px' textAlign='end' >DIVIS</Text>
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
                      <Text as='h2' fontSize='10px' textAlign='start'>DIVIS NFT</Text>
                    </Flex>
                    <Spacer />
                    <Flex alignItems='center' width={'60px'} justifyContent={'end'}>
                      <Image src={divis} />
                      <Spacer />
                      <Text as='h1' fontSize='14px' textAlign='end' >DIVIS</Text>
                    </Flex>
                  </Flex>
                </Flex>
              </Hide>
            </Box>
          </Flex>
        </Flex>
      )
      }
    </>
  )
}