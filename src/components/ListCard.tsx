import { useNavigate } from 'react-router-dom';
import { BiDownArrowAlt as ArrowDownIcon } from 'react-icons/bi'
import { Box, Flex, Text, Image, VStack, Progress, Button, Icon, Grid, GridItem, Show, Hide } from '@chakra-ui/react';
import { useNearContext, useProject } from '../hooks'
import { useColor } from '../hooks';
import SettingLightIcon from '../assets/img/icons/setting.svg'
import WalletIcon from '../assets/img/icons/wallet.svg'
import { shortMonthNames } from '../utils/const';
import { token1 } from "../utils/tokens";

interface Props {
  projectId: number
  title: string
  subtitle: string,
  startTime: Date,
  endTime: Date,
  progressValue: number,
  isActivated: boolean,
  totalTokens: number,
  totalDeposits: number,
  tokenTicker: string,
  logo: string
}

export default function ListCard({
  projectId,
  title,
  subtitle,
  startTime,
  endTime,
  progressValue,
  isActivated,
  totalTokens,
  totalDeposits,
  tokenTicker,
  logo
}: Props) {
  const now = Date.now();
  const { role } = useNearContext();
  const color = useColor();
  const { project } = useProject(Number(projectId));
  const navigate = useNavigate();
  let icon = role === 'admin' ? WalletIcon : SettingLightIcon;

  const handleWalletClick = () => {
    role === 'admin' ? navigate(`/setting/${projectId}`) : navigate(`/detail/${projectId}`)
  }

  const handleDetailClick = () => {
    navigate(`/detail/${projectId}`)
  }

  const mainColor = isActivated ? '#34D399' : color.main;
  return (
    <Flex
      minHeight='14'
      minWidth='12'
      shadow='lg'
      paddingY='4'
      paddingX='8'
      alignItems='center'
      border='1px solid'
      borderColor={color.cardBorder}
      borderRadius='20px'
      flexDirection='column'
      position='relative'
    >
      <Grid templateColumns='repeat(2, 1fr)' width={'100%'} marginY={'4px'} paddingX={'5px'}>
        <GridItem justifyItems={'start'} >
          <Text as='h1' fontSize='20px' textAlign='start' height={'50px'}>{title}</Text>
          <Text as='h2' fontSize='14px' textAlign='start'>{subtitle}</Text>
        </GridItem>
        <GridItem justifySelf={'right'}>
          <Button onClick={handleWalletClick} bg='transparent' padding={0}>
            <Image src={icon} />
          </Button>
        </GridItem>
      </Grid>
      <VStack width='100%' spacing='24px'>
        <Show above='sm'>
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
              <Text as='h1' fontSize='14px' textAlign='start'>Live Deposits</Text>
              <Text as='h2' fontSize='18px' textAlign='start' marginTop='10px'>{(totalDeposits / 1000000).toLocaleString()}</Text>
            </Box>
            <Flex width='100%' justifyContent='end' flexDirection='column'>
              <Flex margin='5px' justifyContent='end'>
                <Text fontSize='0.7vw' textAlign='end' marginTop='10px' width='max-content'>{token1.name}</Text>
              </Flex >
              <Flex justifyContent='end' margin='5px'>
                <Image src={token1.icon} />
                <Text as='h1' fontSize='16px' textAlign='end' marginLeft='15px'>{token1.symbol}</Text>
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
            margin='10 0px'
          >
            <Box width='100%'>
              <Text as='h1' fontSize='14px' textAlign='start'>Total Tokens On Sale</Text>
              <Text as='h2' fontSize='18px' textAlign='start' marginTop='10px'>{totalTokens.toLocaleString()}</Text>
            </Box>
            <Flex width='100%' justifyContent='end' flexDirection='column'>
              <Flex margin='5px' justifyContent='end'>
                <Text fontSize='0.7vw' textAlign='end' marginTop='10px' width='max-content'>{title}</Text>
              </Flex >
              <Flex justifyContent='end' margin='5px'>
                <Image src={logo} />
                <Text as='h1' fontSize='16px' textAlign='end' marginLeft='15px'>{tokenTicker}</Text>
              </Flex>
            </Flex>
          </Flex>
        </Show>
        <Hide above='sm'>
          <Flex
            flexDirection={'column'}
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
              <Text as='h1' fontSize='14px' textAlign='start'>Live Deposits</Text>
              <Text as='h2' fontSize='18px' textAlign='start' marginTop='10px'>{totalDeposits.toLocaleString()}</Text>
            </Box>
            <Flex width='100%' justifyContent='end' flexDirection='column'>
              <Flex margin='5px' justifyContent='end'>
                <Text fontSize='0.7vw' textAlign='end' marginTop='10px' width='max-content'>{token1.name}</Text>
              </Flex >
              <Flex justifyContent='end' margin='5px'>
                <Image src={token1.icon} />
                <Text as='h1' fontSize='16px' textAlign='end' marginLeft='15px'>{token1.symbol}</Text>
              </Flex>
            </Flex>
          </Flex>
          <Flex
            flexDirection={'column'}
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
              <Text as='h1' fontSize='14px' textAlign='start'>Total Tokens On Sale</Text>
              <Text as='h2' fontSize='18px' textAlign='start' marginTop='10px'>{totalTokens.toLocaleString()}</Text>
            </Box>
            <Flex width='100%' justifyContent='end' flexDirection='column'>
              <Flex margin='5px' justifyContent='end'>
                <Text fontSize='0.7vw' textAlign='end' marginTop='10px' width='max-content'>{title}</Text>
              </Flex >
              <Flex justifyContent='end' margin='5px'>
                <Image src={logo} />
                <Text as='h1' fontSize='16px' textAlign='end' marginLeft='15px'>{tokenTicker}</Text>
              </Flex>
            </Flex>
          </Flex>
        </Hide>
        <Flex >
          <Icon as={ArrowDownIcon} boxSize={8} color={color.black} />
        </Flex>

        <Flex
          minWidth='100%'
          minHeight='14'
          flexDirection='column'
        >
          <Progress hasStripe value={progressValue} minWidth='100%' />
          <Flex minWidth='100%'>
            <Text as='h5' fontSize='10px' textAlign='start' width='50%'>
              {shortMonthNames[startTime.getMonth()]} {startTime.getDate()}, {startTime.getFullYear()}
            </Text>
            <Text as='h5' fontSize='10px' textAlign='end' width='50%'>
              {shortMonthNames[endTime.getMonth()]} {endTime.getDate()}, {endTime.getFullYear()}
            </Text>
          </Flex>
        </Flex>
        <Flex
          minWidth='100%'
          minHeight='14'
          justifyContent='center'
        >
          <Button width='100%' color={mainColor} border={'1px solid'} borderColor={mainColor} onClick={handleDetailClick}>{isActivated ? 'DEPOSIT' : 'DETAILS'}</Button>
        </Flex>
      </VStack>
    </Flex>
  )
}