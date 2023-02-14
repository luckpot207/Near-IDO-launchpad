import { Flex, Text, Input, Image, Box, Button } from '@chakra-ui/react';
import { useColor } from '../hooks';
import { useState } from 'react';
import liveListingStar from '../assets/img/icons/live-listing.svg'
//import Arrow from '../assets/img/icons/arrow-down.svg'
//import { BiDownArrowAlt as ArrowDownIcon } from 'react-icons/bi'
import { ListingDetail } from '../types/listing';
//import { shortMonthNames } from '../utils/const';

interface Props {
    title: string
    subtitle: string
    listing: ListingDetail

}

export default function ListCard({ title, subtitle, listing }: Props) {
    const color = useColor();
    const [editDetail, setEditDetail] = useState<boolean>(true);
    const startTime = new Date(listing.startTime);
    const endTime = new Date(listing.endTime);
    const remainTime = new Date(listing.endTime - Date.now() * 1000)
    return (
        <Flex
            minHeight='14'
            minWidth='12'
            marginLeft='13px'
            border='1px solid'
            paddingTop='98px'
            paddingBottom='71px'
            borderColor={color.cardBorder}
            borderRadius='28px'
            flexDirection='row'
            bgColor={color.panelbg}
            position='relative'
        >
            {editDetail ? (<Button
                aria-label='Connect Wallet'
                bgGradient='linear-gradient(360deg, #111618 0%, #FFFFFF 122.97%)'
                variant='solid'
                position='absolute'
                top='34'
                right='42'
                color='white'
                font-family='DM Sans'
                font-style='normal'
                font-weight='500'
                font-size='16px'
                _hover={{ bg: '#a3a3a3' }}
                onClick={() => setEditDetail(false)}
            >
                EDIT DETAILS
            </Button>) : (
                <Flex flexDirection='row' position='absolute' top='34' right='42'>
                    <Button
                        bgGradient='linear-gradient(360deg, #111618 0%, #FFFFFF 122.97%)'
                        variant='solid'
                        color='white'
                        font-family='DM Sans'
                        font-style='normal'
                        font-weight='500'
                        font-size='16px'
                        onClick={() => setEditDetail(true)}
                        _hover={{ bg: '#a3a3a3' }}
                    >
                        SAVE
                    </Button>
                    <Button
                        bgGradient='linear-gradient(360deg, #111618 0%, #FFFFFF 122.97%)'
                        variant='solid'
                        color='white'
                        font-family='DM Sans'
                        font-style='normal'
                        font-weight='500'
                        font-size='16px'
                        marginLeft='10px'
                        _hover={{ bg: '#a3a3a3' }}
                        onClick={() => setEditDetail(true)}
                    >
                        CANCEL
                    </Button>
                </Flex>
            )
            }

            <Flex
                minHeight='14'
                maxWidth='50%'
                flexDirection='column'
            >
                <Box
                    marginLeft='55px'
                    marginRight='20px'
                >
                    <Flex flexDirection='column' marginBottom='17px'>
                        <Text fontSize='12px' paddingBottom='4px' textAlign='left' color='black'>PROJECT NAME*</Text>
                        <Input
                            minWidth='100%'
                            maxHeight='30px'
                            borderRadius='12px'
                            placeholder='STARLUX'
                            bgColor='white'
                            shadow='lg'
                            fontSize='14px'
                            paddingY='8px'
                            alignItems='center'
                            disabled={editDetail}
                        ></Input>
                    </Flex>
                    <Flex flexDirection='column' marginBottom='13px'>
                        <Text fontSize='12px' textAlign='left' color='black' paddingBottom='4px'>SUB TITLE*</Text>
                        <Input
                            minWidth='100%'
                            maxHeight='30px'
                            borderRadius='12px'
                            placeholder='1% IDO OFFERINGS'
                            bgColor='white'
                            fontSize='14px'
                            disabled={editDetail}
                        ></Input>
                    </Flex>
                    {/* Group 1 */}
                    <Flex marginBottom='13px'>
                        <Flex flexDirection='column' marginRight='12px'>
                            <Text fontSize='12px' textAlign='left' color='black' paddingBottom='4px' >IDO RECEIVABLE*</Text>
                            <Input
                                minWidth='100%'
                                maxHeight='30px'
                                borderRadius='12px'
                                placeholder='USDT.E'
                                bgColor='white'
                                fontSize='14px'
                                disabled={editDetail}
                            ></Input>
                        </Flex>
                        <Flex flexDirection='column' marginLeft='12px'>
                            <Text fontSize='12px' textAlign='left' color='black' paddingBottom='4px' >TOKEN TICKER*</Text>
                            <Input
                                minWidth='100%'
                                maxHeight='30px'
                                borderRadius='12px'
                                placeholder='$STAR'
                                bgColor='white'
                                fontSize='14px'
                                disabled={editDetail}
                            ></Input>
                        </Flex>
                    </Flex>
                    {/* Group 2 */}
                    <Flex marginBottom='13px'>
                        <Flex flexDirection='column' marginRight='12px'>
                            <Text fontSize='12px' textAlign='left' color='black' paddingBottom='4px' >STATUS*</Text>
                            <Input
                                minWidth='100%'
                                maxHeight='30px'
                                borderRadius='12px'
                                placeholder='PAID'
                                bgColor='white'
                                fontSize='14px'
                                disabled={editDetail}
                            ></Input>
                        </Flex>
                        <Flex flexDirection='column' marginLeft='12px'>
                            <Text fontSize='12px' textAlign='left' color='black' paddingBottom='4px' >TOKEN PRICE(USD)*</Text>
                            <Input
                                minWidth='100%'
                                maxHeight='30px'
                                borderRadius='12px'
                                placeholder='0.25'
                                bgColor='white'
                                fontSize='14px'
                                disabled={editDetail}
                            ></Input>
                        </Flex>
                    </Flex>
                    {/* Group 3 */}
                    <Flex marginBottom='13px'>
                        <Flex flexDirection='column' marginRight='12px'>
                            <Text fontSize='12px' textAlign='left' color='black' paddingBottom='4px' >START DATE & TIME*</Text>
                            <Input
                                minWidth='100%'
                                maxHeight='30px'
                                borderRadius='12px'
                                placeholder='8 FEB 2023, 00:00'
                                bgColor='white'
                                fontSize='14px'
                                disabled={editDetail}
                            ></Input>
                        </Flex>
                        <Flex flexDirection='column' marginLeft='12px'>
                            <Text fontSize='12px' textAlign='left' color='black' paddingBottom='4px' >END DATE & TIME*</Text>
                            <Input
                                minWidth='100%'
                                maxHeight='30px'
                                borderRadius='12px'
                                placeholder='14 FEB 2023, 23:59'
                                bgColor='white'
                                fontSize='14px'
                                disabled={editDetail}
                            ></Input>
                        </Flex>
                    </Flex>
                    {/* Group 4 */}
                    <Flex marginBottom='13px'>
                        <Flex flexDirection='column' marginRight='12px'>
                            <Text fontSize='12px' textAlign='left' color='black' paddingBottom='4px' >DEOPSIT START DATE & TIME*</Text>
                            <Input
                                minWidth='100%'
                                maxHeight='30px'
                                borderRadius='12px'
                                placeholder='1 FEB 2023, 00:00'
                                bgColor='white'
                                fontSize='14px'
                                disabled={editDetail}
                            ></Input>
                        </Flex>
                        <Flex flexDirection='column' marginLeft='12px'>
                            <Text fontSize='12px' textAlign='left' color='black' paddingBottom='4px' >DEPOSIT END DATE & TIME*</Text>
                            <Input
                                minWidth='100%'
                                maxHeight='30px'
                                borderRadius='12px'
                                placeholder='7 FEB 2023, 23:59'
                                bgColor='white'
                                fontSize='14px'
                                disabled={editDetail}
                            ></Input>
                        </Flex>
                    </Flex>
                </Box>
            </Flex>
            {/* image here */}
            <Flex
                minHeight='14'
                maxWidth='50%'
                borderRadius='12px'
                //justifyContent='center'
                alignItems='center'
            >
                {editDetail ? (
                    <Box maxWidth='90%' bgColor='white' position='relative'>
                        <Image src={liveListingStar} padding='28px'></Image>
                    </Box>

                ) : (
                    <Box maxWidth='90%' bgColor='white' position='relative'>
                        <Image src={liveListingStar} padding='28px' opacity='10%'></Image>
                        <Flex flexDirection='column' position='absolute' top='40%' left='30%' justifyContent='center'>
                            <Text
                                font-family='DM Sans'
                                font-style='normal'
                                font-weight='700'
                                font-size='40px'
                                line-height='52px'
                                text-align='center'
                                color='#cda900'
                            >LOGO</Text>
                            <Text
                                font-family='DM Sans'
                                font-style='normal'
                                font-weight='500'
                                font-size='16px'
                                text-align='center'
                                marginTop='1rem'
                                color='#cda900'
                            >DRAG & DROP LOGO</Text>
                        </Flex>
                    </Box>)}
            </Flex>
        </Flex>
    )
}