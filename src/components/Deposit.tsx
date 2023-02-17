import { Box, Flex, Text, Image, VStack, HStack, Progress, Button, Icon, Spacer } from '@chakra-ui/react';
import { useColor } from '../hooks';
import Arrow from '../assets/img/icons/arrow-down.svg'
import liveListing from '../assets/img/icons/live-listing-small.svg'
import cliffArrow from '../assets/img/icons/arrow-green-short.svg'
import releaseArrow from '../assets/img/icons/arrow-green.svg'
import { BiRightArrowAlt as ArrowRightIcon, BiChevronDown as ArrowDownIcon } from 'react-icons/bi'
import { ListingDetail } from '../types/listing';
import { shortMonthNames } from '../utils/const';

interface Props {
    title: string
    subtitle: string
    listing: ListingDetail
}

export default function Deposit({ title, subtitle, listing }: Props) {
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
                <Progress hasStripe value={listing.progress} marginTop='10px !important' minWidth='100%' />
                <Flex alignItems='center'>
                    <Box width='19px' height='19px' borderRadius='19px' bgColor={color.green}></Box>
                    <Text fontSize='14px' textAlign='center' padding='2px 0px 0px 8px' color={color.green}>
                        Currently Raised: USD $488,000
                    </Text>
                </Flex>
            </VStack>
            <HStack
                width='100%'
                margin='36px'
                justifyContent='center'
                spacing='60px'
            >
                <VStack
                    spacing='40px'
                    width='400px'
                >
                    <Box width='100%'>
                        <Text as='h1' fontSize='40px' textAlign='start' color={color.black}>STARLUX</Text>
                        <Text as='h2' fontSize='14px' textAlign='start' marginTop='0px' color={color.fadeText}>1% IDO OFFERINGS</Text>
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
                            <Text as='h1' fontSize='14px' textAlign='start'>Purchased by Public</Text>
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
                <VStack
                    width='400px'
                    border='1px solid'
                    borderColor='rock.100'
                    borderRadius='10px'
                    bgColor='rock.50'
                    height='640px'
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
                        <Button width='80%' color={color.main} onClick={() => handleDetail(true)}>DEPOSIT</Button>
                    </Flex>
                    <Flex
                        minWidth='100%'
                        minHeight='14'
                        justifyContent='center'
                    >
                        <Button width='80%' color={color.main} onClick={() => handleDetail(true)}>WITHDRAW</Button>
                    </Flex>
                </VStack>
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
                            paddingY='2'
                            paddingX='2'
                            alignItems='center'
                            border='1px solid'
                            borderColor={color.green}
                            borderRadius='50px'
                            bgColor='rock.50'
                        >
                            <Text fontSize='10px' textAlign='center'>TOKEN LOCK</Text>
                            <Text fontSize='20px' textAlign='center' color={color.green}>RELEASE</Text>
                        </Flex>
                    </Flex>
                </VStack>
            </HStack>
            <VStack>
                <Flex flexDirection='column'>
                    <Text as='h1' fontSize='16px' fontWeight='700' fontFamily='DM Sans' textAlign='start'>DISCLAIMER</Text>
                    <Text textAlign='start'>By clicking the deposit button, you agree to deposit the specified amount into the pool and the tokens purchased are bound to agreed cliff period set by project owners. You may withdraw your deposits before the deposit period ends. However, deposits cannot be reversed nor refunded after the sales end and/or deposit period is over. Do take note of the cliff period and distribution on the right pane. You acknowledge that you are solely responsible for managing your funds and ensuring their security.</Text>
                </Flex>
                <Flex flexDirection='column' marginTop='20px' textAlign='start'>
                    <Text as='h1' fontSize='16px' fontWeight='700' fontFamily='DM Sans'>TERMS & CONDITIONS</Text>
                    <Text textAlign='start'>By using this website, you are bound to Pegasus terms & conditions. By uploading or posting any content to the website, you grant Pegasus a non-exclusive, perpetual, irrevocable, worldwide, royalty-free license to use, copy, modify, and display that content in any manner. You have acknowledged that you will not use our website for any unlawful purposes, such as hacking, spamming, or posting offensive material, including Damaging, disabling or otherwise impairing the website, or interfering with another party’s use of the website. Pegasus will not be liable for any damages or losses resulting from your use of the website, or from any errors or omissions in the content of the website. Pegasus reserves the right to terminate your access to the website at any time, without notice, for any reason, including but not limited to violation of these terms and conditions. Pegasus reserves the right to change these terms and conditions at any time without prior notice. In the event that any changes are made, the revised terms and conditions shall be posted on this website immediately. </Text>
                </Flex>
            </VStack>
        </Flex>
    )
}