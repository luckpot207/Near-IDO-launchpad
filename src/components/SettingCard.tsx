import { useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { GridItem, Flex, Button, Grid, Box, HStack, Icon, Progress, VStack, Text, Image, Input } from "@chakra-ui/react";
import { BiChevronLeft as ArrowLeftIcon } from 'react-icons/bi';
import { BiDownArrowAlt as ArrowDownIcon } from 'react-icons/bi'
import TitleCard from "./TitleCard";
import { useBalance, useColor, useProject } from "../hooks";
import { shortMonthNames } from "../utils/const";
import { NftImageType } from '../types';
import SettingDarkIcon from '../assets/img/icons/settingOff.svg'
import LiveListingStar from '../assets/img/icons/live-listing-star.svg'
import USDT from '../assets/img/icons/usdt.svg'

export default function SettingCard() {
  const color = useColor();
  const { projectId } = useParams();
  const { project } = useProject(Number(projectId));
  const userBalance = useBalance(Number(projectId));
  const [editDetail, setEditDetail] = useState<boolean>(true);
  const fileUploadInputRef = useRef<HTMLInputElement | null>(null);
  const [imageUpload, setImageUpload] = useState<File | null>(new File([], ''));
  const [imageUploadUri, setImageUploadUri] = useState<string>();
  const [imageUploadBlob, setImageUploadBlob] = useState<Blob | null>(new Blob());
  const [cropperInstance, setCropperInstance] = useState<Cropper>();
  const [isCropped, setIsCropped] = useState<boolean>(false);
  const now = Math.floor(Date.now() / 1000);
  const icon = SettingDarkIcon;
  if (project.isLoading || project.isError) return (<>loading.....</>)
  else {
    const projectInfo = project.value;
    const startTime = (new Date(projectInfo.start_time));
    const endTime = (new Date(projectInfo.end_time));
    const projectDuration = projectInfo.end_time - projectInfo.start_time;
    const expiredDuration = now - projectInfo.start_time;
    const progressValue = 100 * expiredDuration / projectDuration;
    return (
      <>
        <TitleCard title='Live Listings Panel' />
        <Flex gap={1} paddingY="4" flexDirection={'column'}>
          <Flex>
            <Button
              variant='ghost'
              colorScheme='purple'
              leftIcon={<ArrowLeftIcon />}
            >
              <Link to={'/'}>Back</Link>
            </Button>
          </Flex>
          <Grid templateColumns='repeat(3, 1fr)' gap={6}>
            <GridItem colSpan={1}>
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
                <HStack justifyContent={'space-between'} width={'100%'} marginY={4}>
                  <Flex flexDirection='column' justifyContent={'flex-start'}>
                    <Text as='h1' fontSize='20px' textAlign='start'>{projectInfo.title}</Text>
                    <Text as='h2' fontSize='14px' textAlign='start'>{projectInfo.sub_title}</Text>
                  </Flex>
                  <Flex justifyContent={'flex-end'}>
                    <Button bg='transparent' padding={0}>
                      <Image src={icon} />
                    </Button>
                  </Flex>
                </HStack>
                <VStack width='100%' spacing='24px'>
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
                      <Text as='h2' fontSize='18px' textAlign='start' marginTop='10px'>{projectInfo.total_tokens.toLocaleString()}</Text>
                    </Box>
                    <Flex width='100%' justifyContent='end' flexDirection='column'>
                      <Flex margin='5px' justifyContent='end'>
                        <Text fontSize='0.7vw' textAlign='end' marginTop='10px' width='max-content'>{projectInfo.title}</Text>
                      </Flex >
                      <Flex justifyContent='end' margin='5px'>
                        <Image src={projectInfo.logo} />
                        <Text as='h1' fontSize='16px' textAlign='end' marginLeft='15px'>{projectInfo.token_ticker}</Text>
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
                      <Text as='h1' fontSize='14px' textAlign='start'>Current Deposits</Text>
                      <Text as='h2' fontSize='18px' textAlign='start' marginTop='10px'>{projectInfo.total_deposits.toLocaleString()}</Text>
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
                    <Button width='100%' color={color.main} ><Link to={`./project/${projectId}`}>Details</Link></Button>
                  </Flex>
                </VStack>
              </Flex>
            </GridItem>
            <GridItem colSpan={2}>
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
                      <Image src={LiveListingStar} padding='28px'></Image>
                    </Box>
                  ) : (
                    <Box maxWidth='90%' bgColor={color.background} position='relative' >
                      <Image src={LiveListingStar} padding='28px' opacity='10%' ></Image>
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
            </GridItem>
          </Grid>
        </Flex>
      </>
    )
  }

}