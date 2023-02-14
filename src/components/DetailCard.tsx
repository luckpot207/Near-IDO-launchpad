import { Box, Flex, Text, Image, VStack, HStack, Progress, Button, Icon, Spacer } from '@chakra-ui/react';
import { useColor } from '../hooks';
import Arrow from '../assets/img/icons/arrow-down.svg'
import { BiDownArrowAlt as ArrowDownIcon } from 'react-icons/bi'
import { ListingDetail } from '../types/listing';
import { shortMonthNames } from '../utils/const';

interface Props {
  title: string
  subtitle: string
  listing: ListingDetail
}

export default function DetailCard({ title, subtitle, listing }: Props) {
  const color = useColor();
  const startTime = new Date(listing.startTime);
  const endTime = new Date(listing.endTime);
  const remainTime = new Date(listing.endTime - Date.now() * 1000)
  return (
    <Flex
      minHeight='14'
      minWidth='12'
      width='100%'
      shadow='lg'
      paddingY='4'
      paddingX='8'
      alignItems='center'
      border='1px solid'
      borderColor={color.cardBorder}
      borderRadius='20px'
      flexDirection='column'
    >
      <HStack
        spacing='900px'
      >
        <Box width='100%' margin='10px' alignSelf='start'>
          <Text as='h1' fontSize='35px' textAlign='start'>{title}</Text>
          <Text as='h2' fontSize='14px' textAlign='start'>{subtitle}</Text>
        </Box>
        <HStack>
          <Text>Details</Text>
          <svg width="16" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.51258 9.75L1.04904e-05 0L15.0251 0L7.51258 9.75Z" fill="#D9D9D9" />
          </svg>
        </HStack>
      </HStack>
      <VStack width='100%' spacing='24px'>
        <Text fontSize='35px' textAlign='center' color={color.progressStatus}>
          SALE  IS  LIVE
        </Text>
        <Flex minWidth='100%'>
          <Text as='h5' fontSize='10px' textAlign='start' width='50%'>
            {shortMonthNames[startTime.getMonth()]} {startTime.getDate()}, {startTime.getFullYear()}
          </Text>
          <Text as='h5' fontSize='10px' textAlign='end' width='50%'>
            {shortMonthNames[endTime.getMonth()]} {endTime.getDate()}, {endTime.getFullYear()}
          </Text>
        </Flex>
        <Progress hasStripe value={listing.progress} marginTop='10px !important' minWidth='100%' />
        <Text fontSize='14px' textAlign='center' marginTop='10px !important' color={color.progressStatus}>
          Currently Raised: USD $488,000
        </Text>
      </VStack>
      <HStack
        width='100%'
        margin='50px'
        justifyContent='center'
        spacing='100px'
      >
        <VStack
          spacing='50px'
          width='400px'
        >
          <Flex
            minWidth='100%'
            minHeight='14'
            paddingY='4'
            paddingX='4'
            alignItems='center'
            border='1px solid'
            borderColor='rock.100'
            borderRadius='10px'
            bgColor='rock.50'
            margin='10 0px'
          >
            <Box width='100%'>
              <Text as='h1' fontSize='14px' textAlign='start'>Your Account Balance</Text>
              <Text as='h2' fontSize='18px' textAlign='start' marginTop='10px'>{listing.fromToken.supply.toLocaleString()}</Text>
            </Box>
            <Flex width='100%' justifyContent='end' flexDirection='column'>
              <Flex margin='5px' justifyContent='end'>
                <Text fontSize='0.7vw' textAlign='end' marginTop='10px' width='max-content'>{listing.fromToken.name}</Text>
              </Flex >
              <Flex justifyContent='end' margin='5px'>
                <Image src={listing.fromToken.icon} />
                <Text as='h1' fontSize='16px' textAlign='end' marginLeft='15px'>{listing.fromToken.symbol}</Text>
              </Flex>
            </Flex>
          </Flex>
          <Flex
            minWidth='100%'
            minHeight='14'
            paddingY='4'
            paddingX='4'
            alignItems='center'
            border='1px solid'
            borderColor='rock.100'
            borderRadius='10px'
            bgColor='rock.50'
            margin='10px'
          >
            <Box width='100%' margin='5px'>
              <Text as='h1' fontSize='14px' textAlign='start'>Total Tokens On Sale</Text>
              <Text as='h2' fontSize='18px' textAlign='start' marginTop='10px'>{listing.toToken.supply.toLocaleString()}</Text>
            </Box>
            <Box>
              <Flex width='100%' justifyContent='end' flexDirection='column'>
                <Flex margin='5px' justifyContent='end'>
                  <Text fontSize='0.7vw' textAlign='end' marginTop='10px' width='max-content'>{listing.toToken.name}</Text>
                </Flex >
                <Flex justifyContent='end' margin='5px'>
                  <Image src={listing.toToken.icon} />
                  <Text as='h1' fontSize='16px' textAlign='end' marginLeft='15px'>{listing.toToken.symbol}</Text>
                </Flex>
              </Flex>
            </Box>
          </Flex>
        </VStack>
        <VStack
          width='400px'
          spacing='50px'
        >
          <Flex
            minWidth='100%'
            minHeight='14'
            paddingY='4'
            paddingX='4'
            alignItems='center'
            border='1px solid'
            borderColor='rock.100'
            borderRadius='10px'
            bgColor='rock.50'
            margin='10 0px'
          >
            <Box width='100%'>
              <Text as='h1' fontSize='14px' textAlign='start'>Current Deposits</Text>
              <Text as='h2' fontSize='18px' textAlign='start' marginTop='10px'>{listing.fromToken.supply.toLocaleString()}</Text>
            </Box>
            <Flex width='100%' justifyContent='end' flexDirection='column'>
              <Flex margin='5px' justifyContent='end'>
                <Text fontSize='0.7vw' textAlign='end' marginTop='10px' width='max-content'>{listing.fromToken.name}</Text>
              </Flex >
              <Flex justifyContent='end' margin='5px'>
                <Image src={listing.fromToken.icon} />
                <Text as='h1' fontSize='16px' textAlign='end' marginLeft='15px'>{listing.fromToken.symbol}</Text>
              </Flex>
            </Flex>
          </Flex>
          <Flex
            minWidth='100%'
            minHeight='14'
            paddingY='4'
            paddingX='4'
            alignItems='center'
            border='1px solid'
            borderColor='rock.100'
            borderRadius='10px'
            bgColor='rock.50'
            margin='10px'
          >
            <Box width='100%' margin='5px'>
              <Text as='h1' fontSize='14px' textAlign='start'>Tokens Left</Text>
              <Text as='h2' fontSize='18px' textAlign='start' marginTop='10px'>{listing.toToken.supply.toLocaleString()}</Text>
            </Box>
            <Box>
              <Flex width='100%' justifyContent='end' flexDirection='column'>
                <Flex margin='5px' justifyContent='end'>
                  <Text fontSize='0.7vw' textAlign='end' marginTop='10px' width='max-content'>{listing.toToken.name}</Text>
                </Flex >
                <Flex justifyContent='end' margin='5px'>
                  <Image src={listing.toToken.icon} />
                  <Text as='h1' fontSize='16px' textAlign='end' marginLeft='15px'>{listing.toToken.symbol}</Text>
                </Flex>
              </Flex>
            </Box>
          </Flex>
        </VStack>
      </HStack>
      <HStack
        spacing='60px'
      >
        <Flex
          height='400px'
          flexDirection='column'
        >
          <Text fontSize='35px' textAlign='center' color='#34D399'>
            DEPOSIT NOW
          </Text>
          <VStack
            spacing='50px'
          >
            <Flex
              minWidth='100%'
              minHeight='14'
              paddingY='4'
              paddingX='4'
              alignItems='center'
              border='1px solid'
              borderColor='rock.100'
              borderRadius='10px'
              bgColor='rock.50'
              margin='10 0px'
            >
              <Box width='100%'>
                <Text as='h1' fontSize='14px' textAlign='start'>Your Deposits</Text>
                <Text as='h2' fontSize='18px' textAlign='start' marginTop='10px'>{listing.fromToken.supply.toLocaleString()}</Text>
              </Box>
              <Box margin='36px 0px 0px 0px'>
                <Button bgGradient='linear-gradient(360deg, #10B981 0%, #DEFFF4 122.97%)' height='26px' onClick={() => (true)} color={'white'}>Max</Button>
              </Box>
              <Flex width='100%' justifyContent='end' flexDirection='column'>
                <Flex margin='5px' justifyContent='end'>
                  <Text fontSize='0.7vw' textAlign='end' marginTop='10px' width='max-content'>{listing.fromToken.name}</Text>
                </Flex >
                <Flex margin='5px' justifyContent='end'>
                  <Image src={listing.fromToken.icon} />
                  <Text as='h1' fontSize='16px' textAlign='end' marginLeft='15px'>{listing.fromToken.symbol}</Text>
                </Flex>
              </Flex>
            </Flex>
            <Flex
              minWidth='100%'
              minHeight='14'
              paddingY='4'
              paddingX='4'
              alignItems='center'
              border='1px solid'
              borderColor='rock.100'
              borderRadius='10px'
              bgColor='rock.50'
              margin='10px'
            >
              <Box width='100%' margin='5px'>
                <Text as='h1' fontSize='14px' textAlign='start'>Tokens to Purchase & Locked</Text>
                <Text as='h2' fontSize='18px' textAlign='start' marginTop='10px'>{listing.toToken.supply.toLocaleString()}</Text>
              </Box>
              <Box>
                <Flex width='100%' justifyContent='end' flexDirection='column'>
                  <Flex margin='5px' justifyContent='end'>
                    <Text fontSize='0.7vw' textAlign='end' marginTop='10px' width='max-content'>{listing.toToken.name}</Text>
                  </Flex >
                  <Flex margin='5px' justifyContent='end' >
                    <Image src={listing.toToken.icon} />
                    <Text as='h1' fontSize='16px' textAlign='end' marginLeft='15px'>{listing.toToken.symbol}</Text>
                  </Flex>
                </Flex>
              </Box>
            </Flex>
          </VStack>
          <Spacer />
          <Button marginBottom='10px' bgGradient='linear-gradient(360deg, #10B981 0%, #DEFFF4 122.97%)' onClick={() => (true)} color={'white'}>CONFIRM DEPOSIT</Button>
        </Flex>
        <Flex
          height='400px'
          flexDirection='column'
        >
          <Text fontSize='35px' textAlign='center' color='#34D399'>
            CLIFF PERIOD
          </Text>
          <Flex
            minWidth='100%'
            minHeight='14'
            paddingY='4'
            paddingX='4'
            alignItems='center'
            border='1px solid'
            borderColor='rock.100'
            borderRadius='10px'
            bgColor='rock.50'
          >
            <Box width='100%' margin='5px'>
              <Text as='h1' fontSize='14px' textAlign='start' >Tokens to Purchase & Locked</Text>
              <Text as='h2' fontSize='18px' textAlign='start' marginTop='10px'>{listing.toToken.supply.toLocaleString()}</Text>
            </Box>
            <Spacer />
            <Flex width='100%' justifyContent='end' flexDirection='column'>
              <Flex margin='5px' justifyContent='end'>
                <Text fontSize='0.7vw' textAlign='end' marginTop='10px' width='max-content'>{listing.toToken.name}</Text>
              </Flex >
              <Flex margin='5px' justifyContent='end' >
                <Image src={listing.toToken.icon} />
                <Text as='h1' fontSize='16px' textAlign='end' marginLeft='15px'>{listing.toToken.symbol}</Text>
              </Flex>
            </Flex>
          </Flex>
          <VStack spacing='24px' margin='60px 10px 0px 10px'>
            <Flex minWidth='90%'>
              <Text as='h5' fontSize='10px' textAlign='start' width='50%'>
                {shortMonthNames[startTime.getMonth()]} {startTime.getDate()}, {startTime.getFullYear()}
              </Text>
              <Text as='h5' fontSize='10px' textAlign='end' width='50%'>
                {shortMonthNames[endTime.getMonth()]} {endTime.getDate()}, {endTime.getFullYear()}
              </Text>
            </Flex>
            <Progress hasStripe value={listing.progress} marginTop='10px !important' minWidth='90%' />
            <Text fontSize='14px' textAlign='center' marginTop='10px !important' color={color.black}>
              30 Days (22 Days Left)
            </Text>
          </VStack>
          <Spacer />
          <Button marginBottom='10px' bgGradient='linear-gradient(360deg, #993FF4 0%, #D5B5FF 122.97%)' onClick={() => (true)} color={'white'}>ACKNOWLEDGED</Button>
        </Flex>
        <Flex
          height='400px'
          flexDirection='column'
        >
          <Text fontSize='35px' textAlign='center' color='#34D399'>
            DISDTRIBUTION
          </Text>
          <Spacer />
          <VStack spacing='24px'  padding='0 30px 0 30px'>
            <Flex minWidth='100%'>
              <Text as='h5' fontSize='10px' textAlign='start' width='50%'>
                {shortMonthNames[startTime.getMonth()]} {startTime.getDate()}, {startTime.getFullYear()}
              </Text>
              <Text as='h5' fontSize='10px' textAlign='end' width='50%'>
                {shortMonthNames[endTime.getMonth()]} {endTime.getDate()}, {endTime.getFullYear()}
              </Text>
            </Flex>
            <Progress hasStripe value={listing.progress} marginTop='10px !important' minWidth='100%' />
            <Text fontSize='14px' textAlign='center' width='60%' marginTop='10px !important' color={color.black}>
              Releasing 81, 100 $STAR to your wallet
            </Text>
          </VStack>
          <Spacer />
          <Button marginBottom='10px' bgGradient='linear-gradient(360deg, #993FF4 0%, #D5B5FF 122.97%)' onClick={() => (true)} color={'white'}>WITHDRAW</Button>
        </Flex>
      </HStack>
    </Flex>
  )
}