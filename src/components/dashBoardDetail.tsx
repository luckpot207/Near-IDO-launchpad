import { useParams } from 'react-router-dom';
import { Box, Flex, Text, Image, VStack, HStack, Progress, Button, Icon, Spacer } from '@chakra-ui/react';
import { BiRightArrowAlt as ArrowRightIcon, BiChevronDown as ArrowDownIcon } from 'react-icons/bi'
import { useColor } from '../hooks';
import RuleCard from './RuleCard';
import { ListingDetail } from '../types/listing';
import { shortMonthNames } from '../utils/const';
import liveListing from '../assets/img/icons/live-listing-small.svg'
import cliffArrow from '../assets/img/icons/arrow-green-short.svg'
import releaseArrow from '../assets/img/icons/arrow-green.svg'

interface Props {
    title: string
    subtitle: string
    listing: ListingDetail
}

export default function DashBoardDetail({ title, subtitle, listing }: Props) {
    let { saleId } = useParams();
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

                </Box>
                <HStack>
                    <Text>Details</Text>
                    <Icon as={ArrowDownIcon} />
                </HStack>
            </HStack>
            <VStack width='100%' spacing='24px'>
                <Image src={liveListing}></Image>
                <Text fontFamily='DM Sans' fontSize='35px' textAlign='center' color={color.green}>
                    DEPOSIT IS INACTIVE
                </Text>
                <Text fontFamily='Noto Sans Gujarati' fontWeight='400' fontSize='36px' textAlign='center' color={color.black}>
                    Ending in 6 days 9 hours 22 mins
                </Text>
                <Text fontSize='14px' textAlign='center' padding='2px 0px 0px 8px' color={color.green}>
                    STARLUX IDO has been completed as at 21 February 2023
                </Text>
            </VStack>
            <HStack
                width='80%'
                margin='36px'
                justifyContent='center'
                spacing='60px'
            >
                <VStack spacing='40px' width='50%' >
                    <Box width='100%'>
                        <Text as='h1' fontSize='40px' textAlign='start' color={color.black}>STARLUX</Text>
                        <Text as='h2' fontSize='14px' textAlign='start' marginTop='0px' color={color.fadeText}>1% IDO OFFERINGS</Text>
                    </Box>

                    {/* progress bar on the left side of the page */}

                    <Flex
                        minWidth='100%'
                        minHeight='14'
                        flexDirection='column'
                    >
                        <Flex marginX='8px' alignItems='bottom'>
                            <Text as='h5' fontSize='14px' fontWeight='500' fontFamily='DM Sans' textAlign='start' width='50%'>
                                {startTime.getDate()} {shortMonthNames[startTime.getMonth()]} {startTime.getFullYear()}
                            </Text>
                            <Flex flexDirection='column' >
                                <Text as='h5' fontSize='14px' fontWeight='500' fontFamily='DM Sans' textAlign='center' color={color.blue}>
                                    (In-Progress)
                                </Text>
                                <Image src={cliffArrow}></Image>
                            </Flex>
                            <Text as='h5' fontSize='14px' fontWeight='500' fontFamily='DM Sans' textAlign='end' width='50%'>
                                {endTime.getDate()} {shortMonthNames[endTime.getMonth()]} {endTime.getFullYear()}
                            </Text>
                        </Flex>

                        <Flex
                            flexDirection='column'
                            minWidth='100%'
                            minHeight='14'
                            // paddingY='2'
                            paddingX='2'
                            alignItems='center'
                            borderRadius='50px'
                            bgColor={color.blue}
                            position='relative'
                            overflow='hidden'
                        >
                            <Text fontSize='10px' textAlign='center' paddingTop='2' color={color.background}>TOKEN LOCK</Text>
                            <Text fontSize='20px' textAlign='center' paddingBottom='2' color={color.background}>30 DAYS CLIFF PERIOD</Text>
                            <Box width='20%' position='absolute' left='0' bgColor={color.lightBlue} height='100%' ></Box>
                        </Flex>
                    </Flex>

                </VStack>
                <VStack spacing='40px' width='50%'>
                    <Box width='100%'>
                        <Text as='h1' fontSize='40px' textAlign='end' color={color.black}>USD$ 0.65</Text>
                        <Text as='h2' fontSize='14px' textAlign='end' marginTop='0px' color={color.fadeText}>LAST TOKEN PRICE DURING IDO</Text>
                    </Box>

                    {/* progress bar on the right side of the page */}

                    <Flex
                        minWidth='100%'
                        minHeight='14'
                        flexDirection='column'
                    >
                        <Flex marginX='8px' alignItems='bottom'>
                            <Text as='h5' fontSize='14px' fontWeight='500' fontFamily='DM Sans' textAlign='start' width='50%'>
                                {startTime.getDate()} {shortMonthNames[startTime.getMonth()]} {startTime.getFullYear()}
                            </Text>
                            <Flex flexDirection='column' >
                                <Text as='h5' fontSize='14px' fontWeight='500' fontFamily='DM Sans' textAlign='center' color={color.blue}>
                                    (Onwards)
                                </Text>
                                <Image src={cliffArrow}></Image>
                            </Flex>
                        </Flex>

                        <Flex
                            flexDirection='column'
                            minWidth='100%'
                            minHeight='14'
                            // paddingY='2'
                            paddingX='2'
                            alignItems='center'
                            borderRadius='50px'
                            bgColor={color.blue}
                            position='relative'
                            overflow='hidden'
                            shadow='lg'
                        >
                            <Text fontSize='10px' textAlign='center' paddingTop='2'>TOKEN LOCK</Text>
                            <Text fontSize='20px' textAlign='center' paddingBottom='2' color={color.green}>30 DAYS CLIFF PERIOD</Text>
                            <Box width='20%' position='absolute' left='0' bgColor={color.lightGreen} height='100%' ></Box>
                        </Flex>
                    </Flex>
                </VStack>
            </HStack>
            <Flex
                minWidth='80%'
                minHeight='14'
                justifyContent='right !important'
            >
                <Button width='40%' color={color.main} onClick={() => { }}>WITHDRAW</Button>
            </Flex>
            <HStack
                width='80%'
                margin='36px'
                justifyContent='center'
                spacing='60px'
            >
                <VStack spacing='40px' width='400px' height={'100%'}>
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
                        margin='20px 40px !important'
                    >
                        <Box width='100%'>
                            <Text as='h1' fontSize='14px' textAlign='start'>Live Deposits</Text>
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
                <VStack spacing='40px' width='400px' height={'100%'}>
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
                        margin='20px 40px !important'
                    >
                        <Box width='100%'>
                            <Text as='h1' fontSize='14px' textAlign='start'>Live Deposits</Text>
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
                <VStack spacing='40px' width='400px' height={'100%'}>
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
                        margin='20px 40px !important'
                    >
                        <Box width='100%'>
                            <Text as='h1' fontSize='14px' textAlign='start'>Live Deposits</Text>
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
            </HStack>
            <RuleCard />
        </Flex>
    )
}