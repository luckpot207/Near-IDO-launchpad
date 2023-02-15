import { Flex, Text, Input, Image, Box, Button } from '@chakra-ui/react';
import { useColor } from '../hooks';
import { useState, useRef, useEffect } from 'react';
import liveListingStar from '../assets/img/icons/live-listing.svg'
import { BiCrop as CropIcon, BiChevronLeft as ArrowLeftIcon, BiChevronRight as ArrowRightIcon } from 'react-icons/bi';
import Cropper from 'react-cropper';
//import Arrow from '../assets/img/icons/arrow-down.svg'
//import { BiDownArrowAlt as ArrowDownIcon } from 'react-icons/bi'
import { ListingDetail, NftImageType } from '../types';
//import { shortMonthNames } from '../utils/const';

interface Props {
    title: string
    subtitle: string
    listing: ListingDetail

}

export default function ListCard({ title, subtitle, listing }: Props) {
    const color = useColor();
    const [editDetail, setEditDetail] = useState<boolean>(true);
    const fileUploadInputRef = useRef<HTMLImageElement | null>(null);
    const inputUpdateAvatarPhoto = useRef<HTMLInputElement>(null);
    const [imageUpload, setImageUpload] = useState<File | null>(new File([], ''));
    const [imageUploadUri, setImageUploadUri] = useState<string>();
    const [imageUploadBlob, setImageUploadBlob] = useState<Blob | null>(new Blob());
    const [cropperInstance, setCropperInstance] = useState<Cropper>();
    const [isCropped, setIsCropped] = useState<boolean>(false);


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
                color={color.background}
                fontFamily='DM Sans'
                fontStyle='normal'
                fontWeight='500'
                fontSize='16px'
                _hover={{ bg: '#a3a3a3' }}
                onClick={() => setEditDetail(false)}
            >
                EDIT DETAILS
            </Button>) : (
                <Flex flexDirection='row' position='absolute' top='34' right='42'>
                    <Button
                        bgGradient='linear-gradient(360deg, #111618 0%, #FFFFFF 122.97%)'
                        variant='solid'
                        color={color.background}
                        fontFamily='DM Sans'
                        fontStyle='normal'
                        fontWeight='500'
                        fontSize='16px'
                        onClick={() => setEditDetail(true)}
                        _hover={{ bg: '#a3a3a3' }}
                    >
                        SAVE
                    </Button>
                    <Button
                        bgGradient='linear-gradient(360deg, #111618 0%, #FFFFFF 122.97%)'
                        variant='solid'
                        color={color.background}
                        fontFamily='DM Sans'
                        fontStyle='normal'
                        fontWeight='500'
                        fontSize='16px'
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
                        <Text fontSize='12px' paddingBottom='4px' textAlign='left' color={color.black}>PROJECT NAME*</Text>
                        <Input
                            minWidth='100%'
                            maxHeight='30px'
                            borderRadius='12px'
                            placeholder='STARLUX'
                            bgColor={color.background}
                            shadow='lg'
                            fontSize='14px'
                            paddingY='8px'
                            alignItems='center'
                            disabled={editDetail}
                        ></Input>
                    </Flex>
                    <Flex flexDirection='column' marginBottom='13px'>
                        <Text fontSize='12px' textAlign='left' color={color.black} paddingBottom='4px'>SUB TITLE*</Text>
                        <Input
                            minWidth='100%'
                            maxHeight='30px'
                            borderRadius='12px'
                            placeholder='1% IDO OFFERINGS'
                            bgColor={color.background}
                            fontSize='14px'
                            disabled={editDetail}
                        ></Input>
                    </Flex>
                    {/* Group 1 */}
                    <Flex marginBottom='13px'>
                        <Flex flexDirection='column' marginRight='12px'>
                            <Text fontSize='12px' textAlign='left' color={color.black} paddingBottom='4px' >IDO RECEIVABLE*</Text>
                            <Input
                                minWidth='100%'
                                maxHeight='30px'
                                borderRadius='12px'
                                placeholder='USDT.E'
                                bgColor={color.background}
                                fontSize='14px'
                                disabled={editDetail}
                            ></Input>
                        </Flex>
                        <Flex flexDirection='column' marginLeft='12px'>
                            <Text fontSize='12px' textAlign='left' color={color.black} paddingBottom='4px' >TOKEN TICKER*</Text>
                            <Input
                                minWidth='100%'
                                maxHeight='30px'
                                borderRadius='12px'
                                placeholder='$STAR'
                                bgColor={color.background}
                                fontSize='14px'
                                disabled={editDetail}
                            ></Input>
                        </Flex>
                    </Flex>
                    {/* Group 2 */}
                    <Flex marginBottom='13px'>
                        <Flex flexDirection='column' marginRight='12px'>
                            <Text fontSize='12px' textAlign='left' color={color.black} paddingBottom='4px' >STATUS*</Text>
                            <Input
                                minWidth='100%'
                                maxHeight='30px'
                                borderRadius='12px'
                                placeholder='PAID'
                                bgColor={color.background}
                                fontSize='14px'
                                disabled={editDetail}
                            ></Input>
                        </Flex>
                        <Flex flexDirection='column' marginLeft='12px'>
                            <Text fontSize='12px' textAlign='left' color={color.black} paddingBottom='4px' >TOKEN PRICE(USD)*</Text>
                            <Input
                                minWidth='100%'
                                maxHeight='30px'
                                borderRadius='12px'
                                placeholder='0.25'
                                bgColor={color.background}
                                fontSize='14px'
                                disabled={editDetail}
                            ></Input>
                        </Flex>
                    </Flex>
                    {/* Group 3 */}
                    <Flex marginBottom='13px'>
                        <Flex flexDirection='column' marginRight='12px'>
                            <Text fontSize='12px' textAlign='left' color={color.black} paddingBottom='4px' >START DATE & TIME*</Text>
                            <Input
                                minWidth='100%'
                                maxHeight='30px'
                                borderRadius='12px'
                                placeholder='8 FEB 2023, 00:00'
                                bgColor={color.background}
                                fontSize='14px'
                                disabled={editDetail}
                            ></Input>
                        </Flex>
                        <Flex flexDirection='column' marginLeft='12px'>
                            <Text fontSize='12px' textAlign='left' color={color.black} paddingBottom='4px' >END DATE & TIME*</Text>
                            <Input
                                minWidth='100%'
                                maxHeight='30px'
                                borderRadius='12px'
                                placeholder='14 FEB 2023, 23:59'
                                bgColor={color.background}
                                fontSize='14px'
                                disabled={editDetail}
                            ></Input>
                        </Flex>
                    </Flex>
                    {/* Group 4 */}
                    <Flex marginBottom='13px'>
                        <Flex flexDirection='column' marginRight='12px'>
                            <Text fontSize='12px' textAlign='left' color={color.black} paddingBottom='4px' >DEOPSIT START DATE & TIME*</Text>
                            <Input
                                minWidth='100%'
                                maxHeight='30px'
                                borderRadius='12px'
                                placeholder='1 FEB 2023, 00:00'
                                bgColor={color.background}
                                fontSize='14px'
                                disabled={editDetail}
                            ></Input>
                        </Flex>
                        <Flex flexDirection='column' marginLeft='12px'>
                            <Text fontSize='12px' textAlign='left' color={color.black} paddingBottom='4px' >DEPOSIT END DATE & TIME*</Text>
                            <Input
                                minWidth='100%'
                                maxHeight='30px'
                                borderRadius='12px'
                                placeholder='7 FEB 2023, 23:59'
                                bgColor={color.background}
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
                    <Box maxWidth='90%' bgColor={color.background} position='relative'>
                        <Image src={liveListingStar} padding='28px'></Image>
                    </Box>
                    ) : (
                        <Box maxWidth='90%' bgColor={color.background} position='relative' >
                            <Image src={liveListingStar} padding='28px' opacity='10%' ></Image>
                            <Flex flexDirection='column' position='absolute' top='40%' left='30%' justifyContent='center'>
                                <Input
                                    fontFamily='DM Sans'
                                    fontStyle='normal'
                                    fontWeight='700'
                                    fontSize='40px'
                                    type='button'
                                    //lineHeight='52px'
                                    //textAlign='center'
                                    variant='unstyled'
                                    color={color.yellow}
                                    value='LOGO'
                                    cursor='pointer'
                                    _hover={{ color: '#3200ff' }}
                                    _active={{ color: '#ffffff' }}
                                    onClick={() => { fileUploadInputRef.current?.click() }}
                                    readOnly
                                ></Input>
                                <input type='file' name='image' onChange={(e) => {
                                    if (!e.target.files) return;
                                    setImageUpload(e.target.files.item(0))

                                    const reader = new FileReader();
                                    reader.onload = () => {
                                        if (!reader.result) return;

                                        setImageUploadUri(reader.result.toString());
                                        setIsCropped(false);
                                    };
                                    reader.readAsDataURL(e.target.files?.item(0) as Blob);
                                    setImageUploadBlob(e.target.files?.item(0) as Blob)
                                }} accept={NftImageType} style={{ display: 'none' }} ref={fileUploadInputRef} />
                                <Text
                                    fontFamily='DM Sans'
                                    fontStyle='normal'
                                    fontWeight='500'
                                    fontSize='16px'
                                    textAlign='center'
                                    marginTop='1rem'
                                    color={color.yellow}
                                >DRAG & DROP LOGO</Text>
                            </Flex>
                        </Box>
                    )
                }
            </Flex>
        </Flex>
    )
}