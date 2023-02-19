import { Flex, Image, Text, Button, useBoolean } from "@chakra-ui/react";
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
      {flag ? (<DashBoardDetail title={'STARLUX'} subtitle={'1% IDO OFFERINGS'} listing={listing1} />):(

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
          <Flex
            minHeight="14"
            paddingY="4"
            paddingX="4"
            border='1px solid'
            borderColor='rock.100'
            borderRadius='10px'
            bgColor='rock.50'
            margin='15px 0px'
            alignItems='center'
            justifyContent='space-between'
          >
            <Flex width='30%' flexDirection='column' justifyContent='start'>
              <Flex alignItems='center' justifyContent='space-between'>
                <Text as='h1' fontSize='14px' textAlign='start'>PRICE</Text>
                <Text as='h2' fontSize='18px' textAlign='start' marginLeft='10px'>USD $0.05</Text>
              </Flex>
              <Flex alignItems='center' justifyContent='space-between'>
                <Text as='h1' fontSize='14px' textAlign='start'>TOKENS PURCHASED</Text>
                <Text as='h2' fontSize='18px' textAlign='start' marginLeft='10px'>81,000</Text>
              </Flex>
            </Flex>
            <Flex>
              <Button width='100%' fontSize='10px' color={color.background} bg=' linear-gradient(360deg, #9CA3AF 0%, #E5E7EB 122.97%);' onClick={setFlag.toggle}>DETAILS</Button>
            </Flex>
            <Flex width='10%' flexDirection='column' justifyContent='end'>
              <Flex alignItems='center' justifyContent='end'>
                <Text as='h2' fontSize='10px' textAlign='end'>PEGASUS</Text>
              </Flex>
              <Flex alignItems='center' justifyContent='space-between'>
                <Image src={SEAT} />
                <Text as='h1' fontSize='14px' textAlign='end' >PGSS</Text>
              </Flex>
            </Flex>
          </Flex>

          {/* SEATLAB NFT */}

          <Flex
            minHeight="14"
            paddingY="4"
            paddingX="4"
            border='1px solid'
            borderColor='rock.100'
            borderRadius='10px'
            bgColor='rock.50'
            margin='10 0px'
            alignItems='center'
            justifyContent='space-between'
          >
            <Flex width='30%' flexDirection='column' justifyContent='start'>
              <Flex alignItems='center' justifyContent='space-between'>
                <Text as='h1' fontSize='14px' textAlign='start'>PRICE</Text>
                <Text as='h2' fontSize='18px' textAlign='start' marginLeft='10px'>USD $0.05</Text>
              </Flex>
              <Flex alignItems='center' justifyContent='space-between'>
                <Text as='h1' fontSize='14px' textAlign='start'>TOKENS PURCHASED</Text>
                <Text as='h2' fontSize='18px' textAlign='start' marginLeft='10px'>81,000</Text>
              </Flex>
            </Flex>
            <Flex>
              <Button width='100%' fontSize='10px' color={color.background} bg=' linear-gradient(360deg, #9CA3AF 0%, #E5E7EB 122.97%);' onClick={() => { }}>DETAILS</Button>
            </Flex>
            <Flex width='10%' flexDirection='column' justifyContent='end'>
              <Flex alignItems='center' justifyContent='end'>
                <Text as='h2' fontSize='10px' textAlign='end'>PEGASUS</Text>
              </Flex>
              <Flex alignItems='center' justifyContent='space-between'>
                <Image src={SEAT} />
                <Text as='h1' fontSize='14px' textAlign='end' >PGSS</Text>
              </Flex>
            </Flex>
          </Flex>
        </Flex>

        {/* OTHER LAUNCHPAD TOKENS */}

        <Flex flexDirection='column' marginTop='30px'>
          <Flex marginBottom='20px'>
            <Text as='h1' fontSize='20px' textAlign='start' color={color.blue}>OTHER LAUNCHPAD TOKENS</Text>
          </Flex>
          <Flex
            minHeight="14"
            paddingY="4"
            paddingX="4"
            border='1px solid'
            borderColor='rock.100'
            borderRadius='10px'
            bgColor='rock.50'
            margin='15px 0px'
            alignItems='center'
            justifyContent='space-between'
          >
            <Flex width='30%' flexDirection='column' justifyContent='start'>
              <Flex alignItems='center' justifyContent='space-between'>
                <Text as='h1' fontSize='14px' textAlign='start'>PRICE</Text>
                <Text as='h2' fontSize='18px' textAlign='start' marginLeft='10px'>USD $0.01</Text>
              </Flex>
              <Flex alignItems='center' justifyContent='space-between'>
                <Text as='h1' fontSize='14px' textAlign='start'>STATUS</Text>
                <Text as='h2' fontSize='18px' textAlign='start' marginLeft='10px'>SALE IS LIVE</Text>
              </Flex>
              <Flex alignItems='center' justifyContent='space-between'>
                <Text as='h1' fontSize='14px' textAlign='start'>TOKENS ON SALE</Text>
                <Text as='h2' fontSize='18px' textAlign='start' marginLeft='10px'>70,000,000</Text>
              </Flex>
            </Flex>
            <Flex>
              <Button width='100%' fontSize='10px' color={color.background} bg='linear-gradient(360deg, #9A3FF4 0%, #D5B5FF 122.97%);' onClick={() => { }}>DETAILS</Button>
            </Flex>
            <Flex width='10%' flexDirection='column' justifyContent='end'>
              <Flex alignItems='center' justifyContent='end'>
                <Text fontSize='10px' textAlign='end'>CHOP FINANCEE</Text>
              </Flex>
              <Flex alignItems='center' justifyContent='space-between'>
                <Image src={chop} />
                <Text as='h1' fontSize='14px' textAlign='end' >CHOP</Text>
              </Flex>
            </Flex>
          </Flex>
          <Flex
            minHeight="14"
            paddingY="4"
            paddingX="4"
            border='1px solid'
            borderColor='rock.100'
            borderRadius='10px'
            bgColor='rock.50'
            margin='15px 0px'
            alignItems='center'
            justifyContent='space-between'
          >
            <Flex width='30%' flexDirection='column' justifyContent='start'>
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
            </Flex>
            <Flex width='10%' flexDirection='column' justifyContent='end'>
              <Flex alignItems='center' justifyContent='end'>
                <Text fontSize='10px' textAlign='end'>KUNG TOKEN</Text>
              </Flex>
              <Flex alignItems='center' justifyContent='space-between'>
                <Image src={kung} />
                <Text as='h1' fontSize='14px' textAlign='end' >KUNG</Text>
              </Flex>
            </Flex>
          </Flex>
          <Flex
            minHeight="14"
            paddingY="4"
            paddingX="4"
            border='1px solid'
            borderColor='rock.100'
            borderRadius='10px'
            bgColor='rock.50'
            margin='15px 0px'
            alignItems='center'
            justifyContent='space-between'
          >
            <Flex width='30%' flexDirection='column' justifyContent='start'>
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
            </Flex>
            <Flex width='10%' flexDirection='column' justifyContent='end'>
              <Flex alignItems='center' justifyContent='end'>
                <Text  fontSize='10px' textAlign='end'>DIVIS NFT</Text>
              </Flex>
              <Flex alignItems='center' justifyContent='space-between'>
                <Image src={divis} />
                <Text as='h1' fontSize='14px' textAlign='end' >DIVIS</Text>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
        )
      }
    </>
  )
}