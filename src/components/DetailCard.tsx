import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Flex, Text, Image, VStack, HStack, Progress, Button, Icon, Spacer, Input } from '@chakra-ui/react';
import { BiRightArrowAlt as ArrowRightIcon, BiChevronDown as ArrowDownIcon } from 'react-icons/bi'
import { useColor, useProject, useBalance, useNearLogin, useNearContext, useDepositInToken, useWithdrawInToken } from '../hooks';
import RuleCard from './RuleCard';
import ListCard from './ListCard';
import { ListingDetail } from '../types/listing';
import { shortMonthNames } from '../utils/const';
import liveListing from '../assets/img/icons/live-listing-small.svg'
import cliffArrow from '../assets/img/icons/arrow-green-short.svg'
import releaseArrow from '../assets/img/icons/arrow-green.svg'
import USDT from '../assets/img/icons/usdt.svg'

interface Props {
    title: string
    subtitle: string
    listing: ListingDetail
}

export default function DetailCard() {
    const now = Date.now();
    const { projectId } = useParams();
    const { project } = useProject(Number(projectId));
    const userDepositBalance = useBalance(Number(projectId));
    const color = useColor();
    const { isLoggedInNear, accountIdNear } = useNearLogin();
    const { usdtContract, config } = useNearContext();
    const { projectDepositInToken } = useDepositInToken();
    const { projectWithdrawInToken } = useWithdrawInToken();
    const [depositOpen, setDepositOpen] = useState<boolean>(false);
    const [userBalance, setUserBalance] = useState<string>('');
    const [depositBalance, setDepositBalance] = useState<number>(500);

    const handleDeposit = () => {
        if (depositBalance <= 0) return;
        projectDepositInToken({ accountId: accountIdNear, ftContractId: config.usdtContractId, projectId: Number(projectId), amount: depositBalance })
    }

    const getUserBalance = async () => {
        setUserBalance(await usdtContract.getFtBalanceOfOwnerFormatted(accountIdNear))
    }

    useEffect(() => {
        if (isLoggedInNear) getUserBalance()
    }, [isLoggedInNear])
    if (project.isLoading || project.isError) return (<>loading.....</>)
    else {
        const startTime = (new Date(project.value.start_time / 1000));
        const endTime = (new Date(project.value.end_time / 1000));
        const projectDuration = project.value.end_time / 1000 - project.value.start_time / 1000;
        const expiredDuration = now - project.value.start_time / 1000;
        const progressValue = 100 * expiredDuration / projectDuration;
        console.log(progressValue)
        const estimatedTokenPurchased = (project.value.total_tokens * userDepositBalance / project.value.total_deposits);
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

                    </Box>
                    <HStack>
                        <Text>Details</Text>
                        <Icon as={ArrowDownIcon} />
                    </HStack>
                </HStack>
                <VStack width='100%' spacing='24px'>
                    <Image src={liveListing}></Image>
                    <Text fontFamily='DM Sans' fontSize='35px' textAlign='center' color={color.green}>
                        DEPOSIT IS ACTIVE
                    </Text>
                    <Text fontFamily='Noto Sans Gujarati' fontWeight='400' fontSize='36px' textAlign='center' color={color.black}>
                        Ending in 6 days 9 hours 22 mins
                    </Text>

                    <Flex minWidth='100%'>
                        <Text as='h5' fontSize='10px' textAlign='start' width='50%'>
                            {shortMonthNames[startTime.getMonth()]} {startTime.getDate()}, {startTime.getFullYear()}
                        </Text>
                        <Text as='h5' fontSize='10px' textAlign='end' width='50%'>
                            {shortMonthNames[endTime.getMonth()]} {endTime.getDate()}, {endTime.getFullYear()}
                        </Text>
                    </Flex>
                    <Progress hasStripe value={progressValue} marginTop='10px !important' minWidth='100%' />
                    <Flex alignItems='center'>
                        <Box width='19px' height='19px' borderRadius='19px' bgColor={color.green}></Box>
                        <Text fontSize='14px' textAlign='center' padding='2px 0px 0px 8px' color={color.green}>
                            Currently Raised: USD ${project.value.total_deposits}
                        </Text>
                    </Flex>
                </VStack>
                <HStack
                    width='100%'
                    margin='36px'
                    justifyContent='center'
                    spacing='60px'
                >
                    <VStack spacing='40px' width='400px' height={'100%'}>
                        <Box width='100%'>
                            <Text as='h1' fontSize='40px' textAlign='start' color={color.black}>{project.value.title}</Text>
                            <Text as='h2' fontSize='14px' textAlign='start' marginTop='0px' color={color.fadeText}>{project.value.sub_title}</Text>
                        </Box>
                        <Flex
                            minWidth='100%'
                            minHeight='14'
                            paddingY='2'
                            paddingX='2'
                            alignItems='center'
                            border='1px solid'
                            borderColor='rock.100'
                            borderRadius='10px'
                            bgColor='rock.50'
                        >
                            <Box width='100%'>
                                <Text as='h1' fontSize='14px' textAlign='start'>Live Deposits</Text>
                                <Text as='h2' fontSize='18px' textAlign='start' marginTop='10px'>{project.value.total_deposits.toLocaleString()}</Text>
                            </Box>
                            <Flex width='100%' justifyContent='end' flexDirection='column'>
                                <Flex margin='5px' justifyContent='end'>
                                    <Text fontSize='0.7vw' textAlign='end' marginTop='10px' width='max-content'>{project.value.title}</Text>
                                </Flex >
                                <Flex justifyContent='end' margin='5px'>
                                    <Image src={project.value.logo} />
                                    <Text as='h1' fontSize='16px' textAlign='end' marginLeft='15px'>{project.value.token_ticker}</Text>
                                </Flex>
                            </Flex>
                        </Flex>
                        <Flex
                            minWidth='100%'
                            minHeight='14'
                            paddingY='2'
                            paddingX='2'
                            alignItems='center'
                            border='1px solid'
                            borderColor='rock.100'
                            borderRadius='10px'
                            bgColor='rock.50'
                        >
                            <Box width='100%' margin='5px'>
                                <Text as='h1' fontSize='14px' textAlign='start'>Total Tokens On Sale</Text>
                                <Text as='h2' fontSize='18px' textAlign='start' marginTop='10px'>{project.value.total_tokens.toLocaleString()}</Text>
                            </Box>
                            <Box>
                                <Flex width='100%' justifyContent='end' flexDirection='column'>
                                    <Flex margin='5px' justifyContent='end'>
                                        <Text fontSize='0.7vw' textAlign='end' marginTop='10px' width='max-content'>{project.value.title}</Text>
                                    </Flex >
                                    <Flex justifyContent='end' margin='5px'>
                                        <Image src={project.value.logo} />
                                        <Text as='h1' fontSize='16px' textAlign='end' marginLeft='15px'>{project.value.token_ticker}</Text>
                                    </Flex>
                                </Flex>
                            </Box>
                        </Flex>
                        <Flex
                            minWidth='100%'
                            minHeight='14'
                            paddingY='2'
                            paddingX='2'
                            alignItems='center'
                            border='1px solid'
                            borderColor='rock.100'
                            borderRadius='10px'
                            bgColor='rock.50'
                        >
                            <Box width='100%' margin='5px'>
                                <Text as='h1' fontSize='14px' textAlign='start'>Purchased by Public</Text>
                                <Text as='h2' fontSize='18px' textAlign='start' marginTop='10px'>{project.value.total_tokens.toLocaleString()}</Text>
                            </Box>
                            <Box>
                                <Flex width='100%' justifyContent='end' flexDirection='column'>
                                    <Flex margin='5px' justifyContent='end'>
                                        <Text fontSize='0.7vw' textAlign='end' marginTop='10px' width='max-content'>{project.value.title}</Text>
                                    </Flex >
                                    <Flex justifyContent='end' margin='5px'>
                                        <Image src={project.value.logo} />
                                        <Text as='h1' fontSize='16px' textAlign='end' marginLeft='15px'>{project.value.token_ticker}</Text>
                                    </Flex>
                                </Flex>
                            </Box>
                        </Flex>
                        <Flex
                            minWidth='100%'
                            minHeight='14'
                            paddingY='2'
                            paddingX='2'
                            alignItems='center'
                            border='1px solid'
                            borderColor='rock.100'
                            borderRadius='10px'
                            bgColor='rock.50'
                            margin='40 0px'
                        >
                            <Box width='100%'>
                                <Text as='h1' fontSize='14px' textAlign='start'>No. of Participants</Text>
                                <Text as='h2' fontSize='18px' textAlign='start' marginTop='10px'>60</Text>
                            </Box>
                        </Flex>
                    </VStack>
                    {depositOpen ? (
                        <VStack
                            width='400px'
                            height={'100%'}
                            border='1px solid'
                            borderColor='rock.100'
                            borderRadius='10px'
                            bgColor='rock.50'
                        >
                            <Flex flexDirection={'column'} padding={8}>
                                <Text
                                    as='h1'
                                    fontStyle='normal'
                                    fontWeight='500'
                                    fontSize='20px'
                                    color={'#26A17B'}
                                >
                                    DEPOSIT FUNDS
                                </Text>
                                <Text
                                    as='h2'
                                    fontStyle='normal'
                                    fontWeight='500'
                                    fontSize='14px'
                                    lineHeight={'18px'}
                                    textAlign={'justify'}
                                    paddingY='4'
                                >
                                    You are about to deposit funds to STARLUX pool. Please input the amount intended
                                </Text>
                            </Flex>
                            <Flex flexDirection={'column'} padding={4} justifyContent={'center'}>
                                <Input minHeight={'60px'} color={color.black} fontSize={'64px'} fontWeight={700} textAlign={'center'} border={'none'} type={'number'} defaultValue={depositBalance} onChange={(e) => setDepositBalance(Number(e.target.value))} />
                                <Text
                                    as='h2'
                                    fontStyle='normal'
                                    fontWeight='500'
                                    fontSize='14px'
                                    lineHeight={'18px'}
                                    textAlign={'center'}
                                    paddingY='4'
                                >
                                    - USD
                                </Text>
                            </Flex>
                            <Flex flexDirection={'column'} padding={4} justifyContent={'center'}>
                                <Flex
                                    minWidth='100%'
                                    minHeight='14'
                                    paddingY='2'
                                    paddingX='2'
                                    alignItems='center'
                                    border='1px solid'
                                    borderColor='rock.100'
                                    borderRadius='10px'
                                    bgColor='rock.50'
                                >
                                    <Flex width='100%' margin='5px'>
                                        <Text as='h1' fontSize='14px' textAlign='start'>AVAILABLE TO DEPOSIT</Text>
                                    </Flex>
                                    <Flex width='100%' justifyContent='end' flexDirection='column'>
                                        <Flex margin='5px' justifyContent='end'>
                                            <Text fontSize='0.7vw' textAlign='end' marginTop='10px' width='max-content'>{'Tether USD'}</Text>
                                        </Flex >
                                        <Flex justifyContent='end' margin='5px'>
                                            <Image src={USDT} />
                                            <Text as='h2' fontSize='16px' textAlign='end' marginLeft='15px'>{Number(userBalance).toLocaleString()}</Text>
                                        </Flex>
                                    </Flex>
                                </Flex>
                                <Flex
                                    minWidth='100%'
                                    minHeight='14'
                                    marginY={4}
                                    paddingY='2'
                                    paddingX='2'
                                    alignItems='center'
                                    border='1px solid'
                                    borderColor='rock.100'
                                    borderRadius='10px'
                                    bgColor='rock.50'
                                >
                                    <Flex width='100%' margin='5px'>
                                        <Text as='h1' fontSize='14px' textAlign='start'>DEPOSIT TO POOL</Text>
                                    </Flex>
                                    <Flex width='100%' justifyContent='end' flexDirection='column'>
                                        <Flex margin='5px' justifyContent='end'>
                                            <Text fontSize='0.7vw' textAlign='end' marginTop='10px' width='max-content'>{''}</Text>
                                        </Flex >
                                        <Flex justifyContent='end' margin='5px'>
                                            <Text as='h2' fontSize='16px' textAlign='end' marginLeft='15px'>{project.value.title}</Text>
                                        </Flex>
                                    </Flex>
                                </Flex>
                            </Flex>
                            <Flex
                                minWidth='100%'
                                minHeight='14'
                                justifyContent='center'
                            >
                                <Button width='80%' colorScheme={'green'} onClick={handleDeposit}>DEPOSIT</Button>
                            </Flex>
                            <Flex
                                minWidth='100%'
                                minHeight='14'
                                justifyContent='center'
                            >
                                <Button width='80%' colorScheme={'red'} onClick={() => { }}>WITHDRAW</Button>
                            </Flex>
                        </VStack>
                    ) : (
                        <VStack
                            width='400px'
                            height={'100%'}
                            border='1px solid'
                            borderColor='rock.100'
                            borderRadius='10px'
                            bgColor='rock.50'
                        >
                            <Text
                                as='h1'
                                fontFamily='Noto Sans Gujarati'
                                fontStyle='normal'
                                fontWeight='400'
                                fontSize='20px'
                                paddingY='8'
                            >
                                Please choose an option below
                            </Text>
                            <Flex
                                minWidth='100%'
                                minHeight='14'
                                justifyContent='center'
                            >
                                <Button width='80%' color={color.main} onClick={() => { setDepositOpen(true) }}>DEPOSIT</Button>
                            </Flex>
                            <Flex
                                minWidth='100%'
                                minHeight='14'
                                justifyContent='center'
                            >
                                <Button width='80%' color={color.main} onClick={() => { }}>WITHDRAW</Button>
                            </Flex>
                        </VStack>
                    )}

                    <VStack
                        width='400px'
                        spacing='40px'
                    >
                        <Box width='100%'>
                            <Text as='h1' fontSize='40px' textAlign='end' color={color.progressStatus}>USD$ 0.21</Text>
                            <Text as='h2' fontSize='14px' textAlign='end' marginTop='0px' color={color.fadeText}>LIVE TOKEN PRICE</Text>
                        </Box>
                        <Flex
                            minWidth='100%'
                            minHeight='14'
                            paddingY='2'
                            paddingX='2'
                            alignItems='center'
                            border='1px solid'
                            borderColor='rock.100'
                            borderRadius='10px'
                            bgColor='rock.50'
                            marginTop='20px !important'
                        >
                            <Box width='100%'>
                                <Text as='h1' fontSize='14px' textAlign='start'>User Current Deposit</Text>
                                <Text as='h2' fontSize='18px' textAlign='start' marginTop='10px'>{userDepositBalance.toLocaleString()}</Text>
                            </Box>
                            <Flex width='100%' justifyContent='end' flexDirection='column'>
                                <Flex margin='5px' justifyContent='end'>
                                    <Text fontSize='0.7vw' textAlign='end' marginTop='10px' width='max-content'>{'Tether USD'}</Text>
                                </Flex >
                                <Flex justifyContent='end' margin='5px'>
                                    <Image src={USDT} />
                                    <Text as='h1' fontSize='16px' textAlign='end' marginLeft='15px'>{'USDT.e'}</Text>
                                </Flex>
                            </Flex>
                        </Flex>
                        <Flex
                            minWidth='100%'
                            minHeight='14'
                            paddingY='2'
                            paddingX='2'
                            alignItems='center'
                            border='1px solid'
                            borderColor='rock.100'
                            borderRadius='10px'
                            bgColor='rock.50'
                            margin='40px 0px'
                        >
                            <Box width='100%' margin='5px'>
                                <Text as='h1' fontSize='14px' textAlign='start'>Estimated Token Purchased</Text>
                                <Text as='h2' fontSize='18px' textAlign='start' marginTop='10px'>{estimatedTokenPurchased.toLocaleString()}</Text>
                            </Box>
                            <Box>
                                <Flex width='100%' justifyContent='end' flexDirection='column'>
                                    <Flex margin='5px' justifyContent='end'>
                                        <Text fontSize='0.7vw' textAlign='end' marginTop='10px' width='max-content'>{project.value.title}</Text>
                                    </Flex >
                                    <Flex justifyContent='end' margin='5px'>
                                        <Image src={project.value.logo} />
                                        <Text as='h1' fontSize='16px' textAlign='end' marginLeft='15px'>{project.value.token_ticker}</Text>
                                    </Flex>
                                </Flex>
                            </Box>
                        </Flex>
                        {/* cliff period */}
                        <Flex
                            minWidth='100%'
                            minHeight='14'
                            flexDirection='column'
                        >
                            <Flex marginX='8px' alignItems='center'>
                                <Text as='h5' fontSize='14px' fontWeight='500' fontFamily='DM Sans' textAlign='start' width='50%'>
                                    {startTime.getDate()} {shortMonthNames[startTime.getMonth()]} {startTime.getFullYear()}
                                </Text>
                                <Image src={cliffArrow}></Image>
                                <Text as='h5' fontSize='14px' fontWeight='500' fontFamily='DM Sans' textAlign='end' width='50%'>
                                    {endTime.getDate()} {shortMonthNames[endTime.getMonth()]} {endTime.getFullYear()}
                                </Text>
                            </Flex>

                            <Flex
                                flexDirection='column'
                                minWidth='100%'
                                minHeight='14'
                                paddingY='2'
                                paddingX='2'
                                alignItems='center'
                                border='1px solid'
                                borderColor={color.blue}
                                borderRadius='50px'
                                bgColor='rock.50'
                            >
                                <Text fontSize='10px' textAlign='center'>TOKEN LOCK</Text>
                                <Text fontSize='20px' textAlign='center' color={color.blue}>CLIFF PERIOD(30 DAYS)</Text>
                            </Flex>
                        </Flex>
                        {/* release */}
                        <Flex
                            minWidth='100%'
                            minHeight='14'
                            flexDirection='column'
                        >
                            <Flex marginX='8px' alignItems='end'>
                                <Flex flexDirection='column' width={'70%'}>
                                    <Text as='h5' fontSize='14px' fontWeight='500' fontFamily='DM Sans' textAlign='center' color={color.green}>
                                        (Onwards)
                                    </Text>
                                    <Image src={releaseArrow}></Image>
                                </Flex>
                                <Flex flexDirection='row' alignItems='end' width={'30%'} marginLeft='16px'>
                                    <Text as='h5' fontSize='14px' fontWeight='500' fontFamily='DM Sans' textAlign='center'>
                                        {endTime.getDate()} {shortMonthNames[endTime.getMonth()]} {endTime.getFullYear()}
                                    </Text>
                                </Flex>
                            </Flex>

                            <Flex
                                flexDirection='column'
                                minWidth='100%'
                                minHeight='14'
                                // paddingY='2'
                                paddingX='2'
                                alignItems='center'
                                border='1px solid'
                                borderColor={color.green}
                                borderRadius='50px'
                                bgColor='rock.50'
                                position='relative'
                                overflow='hidden'
                            >
                                <Text fontSize='10px' textAlign='center' paddingTop='2'>TOKEN LOCK</Text>
                                <Text fontSize='20px' textAlign='center' color={color.green} paddingBottom='2'>RELEASE</Text>
                                <Box width='0%' position='absolute' left='0' bgColor={color.fadeText} height='100%' ></Box>
                            </Flex>
                        </Flex>
                    </VStack>
                </HStack>
                <RuleCard />
            </Flex>
        )
    }

}