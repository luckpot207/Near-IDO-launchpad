import { Flex, Text, Input, Image, Box } from '@chakra-ui/react';
import { useColor } from '../hooks';
import liveListingStar from '../assets/img/icons/live-listing-star.svg'
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
        >
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
                        <Text fontSize='12px' paddingBottom='4px' textAlign='left' color='black'>adfsdf</Text>
                        <Input
                            minWidth='100%'
                            maxHeight='30px'
                            borderRadius='12px'
                            placeholder='StarLuck..'
                            bgColor='white'
                            shadow='lg'
                            fontSize='14px'
                            paddingY='8px'
                            alignItems='center'
                        ></Input>
                    </Flex>
                    <Flex flexDirection='column' marginBottom='13px'>
                        <Text fontSize='12px' paddingBottom='4px'>adfsdf</Text>
                        <Input
                            minWidth='100%'
                            maxHeight='30px'
                            borderRadius='12px'
                            placeholder='StarLuck..'
                            bgColor='white'
                            fontSize='14px'
                        ></Input>
                    </Flex>
                    {/* Group 1 */}
                    <Flex marginBottom='13px'>
                        <Flex flexDirection='column' marginRight='12px'>
                            <Text fontSize='12px' paddingBottom='4px' >adfsdf</Text>
                            <Input
                                minWidth='100%'
                                maxHeight='30px'
                                borderRadius='12px'
                                placeholder='StarLuck..'
                                bgColor='white'
                                fontSize='14px'
                            ></Input>
                        </Flex>
                        <Flex flexDirection='column' marginLeft='12px'>
                            <Text fontSize='12px' paddingBottom='4px' >adfsdf</Text>
                            <Input
                                minWidth='100%'
                                maxHeight='30px'
                                borderRadius='12px'
                                placeholder='StarLuck..'
                                bgColor='white'
                                fontSize='14px'
                            ></Input>
                        </Flex>
                    </Flex>
                    {/* Group 2 */}
                    <Flex marginBottom='13px'>
                        <Flex flexDirection='column' marginRight='12px'>
                            <Text fontSize='12px' paddingBottom='4px' >adfsdf</Text>
                            <Input
                                minWidth='100%'
                                maxHeight='30px'
                                borderRadius='12px'
                                placeholder='StarLuck..'
                                bgColor='white'
                                fontSize='14px'
                            ></Input>
                        </Flex>
                        <Flex flexDirection='column' marginLeft='12px'>
                            <Text fontSize='12px' paddingBottom='4px' >adfsdf</Text>
                            <Input
                                minWidth='100%'
                                maxHeight='30px'
                                borderRadius='12px'
                                placeholder='StarLuck..'
                                bgColor='white'
                                fontSize='14px'
                            ></Input>
                        </Flex>
                    </Flex>
                    {/* Group 3 */}
                    <Flex marginBottom='13px'>
                        <Flex flexDirection='column' marginRight='12px'>
                            <Text fontSize='12px' paddingBottom='4px' >adfsdf</Text>
                            <Input
                                minWidth='100%'
                                maxHeight='30px'
                                borderRadius='12px'
                                placeholder='StarLuck..'
                                bgColor='white'
                                fontSize='14px'
                            ></Input>
                        </Flex>
                        <Flex flexDirection='column' marginLeft='12px'>
                            <Text fontSize='12px' paddingBottom='4px' >adfsdf</Text>
                            <Input
                                minWidth='100%'
                                maxHeight='30px'
                                borderRadius='12px'
                                placeholder='StarLuck..'
                                bgColor='white'
                                fontSize='14px'
                            ></Input>
                        </Flex>
                    </Flex>
                    {/* Group 4 */}
                    <Flex marginBottom='13px'>
                        <Flex flexDirection='column' marginRight='12px'>
                            <Text fontSize='12px' paddingBottom='4px' >adfsdf</Text>
                            <Input
                                minWidth='100%'
                                maxHeight='30px'
                                borderRadius='12px'
                                placeholder='StarLuck..'
                                bgColor='white'
                                fontSize='14px'
                            ></Input>
                        </Flex>
                        <Flex flexDirection='column' marginLeft='12px'>
                            <Text fontSize='12px' paddingBottom='4px' >adfsdf</Text>
                            <Input
                                minWidth='100%'
                                maxHeight='30px'
                                borderRadius='12px'
                                placeholder='StarLuck..'
                                bgColor='white'
                                fontSize='14px'
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
                <Box maxWidth='90%' bgColor='white'>
                    <Image src={liveListingStar} padding='28px'></Image>
                </Box>
            </Flex>
        </Flex>
    )
}