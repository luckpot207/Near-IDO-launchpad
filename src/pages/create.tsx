import { useState, useEffect, useRef } from 'react';
import { Flex, Text, Input, Button, Select, Image, IconButton, Menu, MenuButton, MenuItem, MenuList, MenuOptionGroup, MenuDivider, MenuItemOption } from '@chakra-ui/react';
import { BiCrop as CropIcon, BiChevronLeft as ArrowLeftIcon, BiChevronRight as ArrowRightIcon } from 'react-icons/bi';
import TitleCard from '../components/TitleCard';
import InputCard from '../components/InputCard';
import InputAreaCard from '../components/InputAreaCard';
import SelectCard from '../components/SelectCard';
import DateCard from '../components/DateCard';
import RuleCard from '../components/RuleCard';
import { useColor, useRegisterProject, useNearContext, useNearLogin, ProjectInput } from '../hooks';
import { ListingDetail, NftImageType } from '../types';
import { token1, token2 } from '../utils/tokens';
import { Payment } from '../utils/const';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import USDT from '../assets/img/icons/usdt.svg'
import USDC from '../assets/img/icons/usdc.svg'
import InfoIcon from '../assets/img/icons/info.svg'
import { primaryButtonStyle } from '../theme/ButtonStyles';
import { FtContract } from '../hooks/Near/classWrappers';
import { parseNearAmount } from 'near-api-js/lib/utils/format';
import { AddIcon, ExternalLinkIcon, RepeatIcon, EditIcon } from '@chakra-ui/icons';

const initData: ProjectInput = {
  title: '',
  subTitle: '',
  outTokenId: '',
  inTokenId: '',
  tokenTicker: '',
  logo: '',
  startingPrice: 0,
  email: '',
  telegram: '',
  totalTokens: 0,
  coingecko: '',
  facebook: '',
  instagram: '',
  twitter: '',
  description: '',
  startTime: 0,
  endTime: 0,
  cliffPeriod: 0,
}

export default function Create() {
  console.log('log', parseNearAmount('2000'))
  const { config, initFtContract } = useNearContext();
  const { isLoggedInNear, accountIdNear } = useNearLogin();
  const { registerProject } = useRegisterProject();
  const color = useColor();
  const fileUploadInputRef = useRef<HTMLInputElement | null>(null);
  const [isCropped, setIsCropped] = useState<boolean>(false);
  const [cropperInstance, setCropperInstance] = useState<Cropper>();
  const [userBalance, setUserBalance] = useState<string>('');
  const [errors, setErrors] = useState<ProjectInput>(initData);
  const [title, setTitle] = useState<string>('');
  const [subTitle, setSubTitle] = useState<string>('');
  const [outTokenId, setOutTokenId] = useState<string>('');
  const [tokenTicker, setTokenTicker] = useState<string>('');
  const [startingPrice, setStartingPrice] = useState<number>(0);
  const [email, setEmail] = useState<string>('');
  const [telegram, setTelegram] = useState<string>('');
  const [inTokenId, setInTokenId] = useState<number>(0);
  const [totalTokens, setTotalTokens] = useState<number>(0);
  const [coingecko, setCoingecko] = useState<string>('');
  const [facebook, setFacebook] = useState<string>('');
  const [instagram, setInstagram] = useState<string>('');
  const [twitter, setTwitter] = useState<string>('');
  const [startTime, setStartTime] = useState<Date>();
  const [endTime, setEndTime] = useState<Date>();
  const [cliffPeriod, setCliffPeriod] = useState<number>(0);
  const [description, setDescription] = useState<string>('');
  const [imageUpload, setImageUpload] = useState<File | null>(new File([], ''));
  const [imageUploadUri, setImageUploadUri] = useState<string>();
  const [imageUploadBlob, setImageUploadBlob] = useState<Blob | null>(new Blob());
  const [submitOpen, setSubmitOpen] = useState<boolean>(false);

  const usdContract = new FtContract(initFtContract(inTokenId === 1 ? config.usdtContractId : config.usdcContractId));

  const blobToBase64 = (blob: Blob) => {
    // check max. file size is not exceeded
    let base64: string | ArrayBuffer = '';
    const reader = new FileReader();
    reader.onloadend = () => console.log(reader.result);
    reader.readAsDataURL(blob);

    reader.onload = () => {
      console.log(reader.result); //base64encoded string
      base64 = reader.result ?? '';
    };
    reader.onerror = error => {
      console.log("Error: ", error);
    };

    return base64;
  }

  const handleRegisterProject = async () => {
    let error = false;
    if (!title) {
      errors.title = 'Empty title';
      error = true;
    }
    if (!subTitle) {
      errors.subTitle = 'Empty subtitle';
      error = true;
    }
    if (!outTokenId) {
      errors.outTokenId = 'Empty outTokenId';
      error = true;
    }
    if (!tokenTicker) {
      errors.tokenTicker = 'Empty tokenTicker';
      error = true;
    }
    if (!startingPrice) {
      errors.startingPrice = 9;
      error = true;
    }
    if (!email) {
      errors.email = 'Empty email';
      error = true;
    }
    if (!telegram) {
      errors.telegram = 'Empty telegram';
      error = true;
    }
    if (!inTokenId) {
      errors.inTokenId = 'Empty inTokenId';
      error = true;
    }
    if (!totalTokens) {
      errors.totalTokens = 9;
      error = true;
    }
    if (!description) {
      errors.description = 'Empty description';
      error = true;
    }
    if (!startTime) {
      errors.startTime = 9;
      error = true;
    }
    if (!endTime) {
      errors.endTime = 9;
      error = true;
    }
    if (!cliffPeriod) {
      errors.cliffPeriod = 9;
      error = true;
    }
    if (error) {
      setSubmitOpen(false);
      return;
    }
    if (!imageUploadBlob) return;
    const logo = blobToBase64(imageUploadBlob);
    console.log('logo, logo', logo)
    if (!startTime || !endTime) return;
    const startTimeStamp = Math.floor(new Date(startTime).getTime())
    const endTimeStamp = Math.floor(new Date(endTime).getTime())
    const period =
      cliffPeriod == 1 ? 1 : // 30 :
        cliffPeriod == 2 ? 60 :
          cliffPeriod == 3 ? 90 : 365;
    const wrappedCliffPeriod = period * 24 * 3600
    console.log('>>>>>>>>', wrappedCliffPeriod)
    const outFtToken = new FtContract(initFtContract(outTokenId));
    const outDecimals = await outFtToken.getFtMetadata();
    const res = await registerProject(
      {
        accountId: accountIdNear,
        inTokenContract: usdContract,
        outTokenContract: outFtToken,
        title,
        subTitle,
        tokenTicker,
        logo,
        startingPrice,
        email,
        telegram,
        inTokenId: usdContract.contractId,
        outTokenId,
        totalTokens,
        coingecko,
        facebook,
        instagram,
        twitter,
        description,
        startTime: startTimeStamp,
        endTime: endTimeStamp,
        cliffPeriod: wrappedCliffPeriod,
      }
    )
    console.log('Result is --> ', res);
  }

  const getUserBalance = async () => {
    setUserBalance(await usdContract.getFtBalanceOfOwnerFormatted(accountIdNear))
  }

  useEffect(() => {
    if (isLoggedInNear) getUserBalance()
  }, [isLoggedInNear, usdContract])

  useEffect(() => {
    setErrors(initData)
    if (title) setErrors({ ...errors, title: '' })
    if (subTitle) setErrors({ ...errors, subTitle: '' })
    if (outTokenId) setErrors({ ...errors, outTokenId: '' })
    if (tokenTicker) setErrors({ ...errors, tokenTicker: '' })
    if (startingPrice) setErrors({ ...errors, startingPrice: 0 })
    if (email) setErrors({ ...errors, email: '' })
    if (telegram) setErrors({ ...errors, telegram: '' })
    if (inTokenId) setErrors({ ...errors, inTokenId: '' })
    if (totalTokens) setErrors({ ...errors, totalTokens: 0 })
    if (description) setErrors({ ...errors, description: '' })
    if (startTime) setErrors({ ...errors, startTime: 0 })
    if (endTime) setErrors({ ...errors, endTime: 0 })
    if (cliffPeriod) setErrors({ ...errors, cliffPeriod: 0 })
  }, [title, subTitle, outTokenId, tokenTicker, startingPrice, email, telegram, inTokenId, totalTokens, description, startTime, endTime, cliffPeriod])

  return (
    <>
      <TitleCard title={submitOpen ? 'Listing Confirmation' : 'Create Listing'} />
      {submitOpen ? (
        <>
          <Flex maxWidth='lg' flexDirection='column' marginX='auto'>
            <Flex>
              <Button
                variant='ghost'
                colorScheme='purple'
                leftIcon={<ArrowLeftIcon />}
                onClick={() => setSubmitOpen(false)}>
                Back
              </Button>
            </Flex>
            <Flex
              marginY='4'
              padding='8'
              shadow='lg'
              border='1px solid'
              borderRadius='2xl'
              borderColor={color.cardBorder}
              flexDirection='column'
            >
              <Flex marginBottom='20px' justifyContent='center'>
                <Text as='h1' fontSize='20px' textAlign='center'>Payment</Text>
              </Flex>
              <Flex alignItems='center' flexDirection='column' justifyContent='center' marginY={4}>
                <Text as='h2' fontSize='14px' textAlign='start' color={color.fadeText} marginBottom={4}>
                  You are about to pay 500 {Payment[inTokenId]} to Pegasus for project registration and listing fee. Kindly click pay to deduct 500 {Payment[inTokenId]} from your wallet
                </Text>
                <Text as='h2' fontSize='64px' textAlign='center' fontWeight='bold' marginY={2}>500</Text>
                <Text as='h2' fontSize='16px' textAlign='center' >- {Payment[inTokenId]} -</Text>
              </Flex>
              <Flex alignItems='center' flexDirection='column' marginY={8}>
                <Flex
                  width='100%'
                  minHeight='20'
                  paddingY='2'
                  paddingX='8'
                  marginY={3}
                  borderRadius='2xl'
                  bgColor={color.inputbg}
                  alignItems='center'
                  fontSize='18px'
                  border='1px solid'
                  borderColor={color.border}
                  onChange={e => console.log(e)}
                  justifyContent={'space-between'}
                >
                  <Flex>
                    <Text as='h3' fontSize='14px' fontWeight={500} textAlign='start'>{'SELECT ASSET'}</Text>
                  </Flex>
                  <Flex alignItems={'center'}>
                    <Flex justifyContent='end' flexDirection='column'>
                      <Flex margin='5px' justifyContent='end'>
                        <Text as='h2' fontSize='1vw' textAlign='end' marginTop='10px' width='max-content' color={color.main}>{'Tether USD'}</Text>
                      </Flex >
                      <Flex justifyContent='end' margin='5px'>
                        <Image src={inTokenId == 1 ? USDT : USDC} />
                        <Text as='h1' fontSize='16px' textAlign='end' marginLeft='15px' color={color.black}>{Payment[inTokenId]}</Text>
                      </Flex>
                    </Flex>
                    <Flex>
                      <Menu>
                        <MenuButton
                          as={IconButton}
                          aria-label='Options'
                          icon={<ArrowRightIcon />}
                          variant='ghost'
                        />
                        <MenuList>
                          <MenuOptionGroup defaultValue={inTokenId.toString()} title='Select assets' type='radio' onChange={(e) => setInTokenId(Number(e))}>
                            <MenuItemOption value='1'>USDT</MenuItemOption>
                            <MenuItemOption value='2'>USDC</MenuItemOption>
                          </MenuOptionGroup>
                        </MenuList>
                      </Menu>
                    </Flex>
                  </Flex>
                </Flex>
                <Flex
                  width='100%'
                  minHeight='20'
                  paddingY='2'
                  paddingX='8'
                  marginY={3}
                  bgColor={color.inputbg}
                  fontSize='18px'
                  border='1px solid'
                  borderColor={color.border}
                  borderRadius='2xl'
                  justifyContent={'space-between'}
                  alignItems='center'
                  onChange={e => console.log(e)}
                >
                  <Text as='h3' fontSize='14px' fontWeight={500} textAlign='start'>{'AVAILABLE TO SEND'}</Text>
                  <Text as='h2' fontSize='18px' textAlign='end' >{userBalance}</Text>
                </Flex>
                <Flex
                  width='100%'
                  minHeight='20'
                  paddingY='2'
                  paddingX='8'
                  marginY={3}
                  bgColor={color.inputbg}
                  fontSize='18px'
                  border='1px solid'
                  borderColor={color.border}
                  borderRadius='2xl'
                  justifyContent={'space-between'}
                  alignItems='center'
                  onChange={e => console.log(e)}
                >
                  <Text as='h3' fontSize='14px' fontWeight={500} textAlign='start'>{'DEDUCTING'}</Text>
                  <Text as='h2' fontSize='18px' textAlign='end' color={'red'}>{'-$500'}</Text>
                </Flex>
                <Flex
                  width='100%'
                  minHeight='20'
                  paddingY='2'
                  paddingX='8'
                  marginY={3}
                  bgColor={color.inputbg}
                  fontSize='18px'
                  border='1px solid'
                  borderColor={color.border}
                  borderRadius='2xl'
                  justifyContent={'space-between'}
                  alignItems='center'
                  onChange={e => console.log(e)}
                >
                  <Text as='h3' fontSize='14px' fontWeight={500} textAlign='start'>{'BALANCE TO UPDATE'}</Text>
                  <Text as='h2' fontSize='18px' textAlign='end' color={'blue'}>{Number(userBalance) - 500}</Text>
                </Flex>
              </Flex>
              <Flex >
                <Button width={'100%'} {...primaryButtonStyle} onClick={handleRegisterProject}>PAY</Button>
              </Flex>
            </Flex>
          </Flex>
          <RuleCard />
        </>
      ) : (
        <Flex
          width='100%'
          marginY='4'
          padding='8'
          shadow='lg'
          border='1px solid'
          borderRadius='2xl'
          borderColor={color.cardBorder}
          flexDirection='column'
        >
          <Flex justifyContent='space-between'>
            <Flex flexDirection='column' width='65%'>
              <Flex marginBottom='2'>
                <Text as='h1' fontSize='20px' fontWeight='700' textAlign='start' color={color.required}>* All Fields Mandatory</Text>
              </Flex>
              <InputCard title='PROJECT / TOKEN NAME' placeholder='E.G. PROJECT ATLAS' required={true} setData={setTitle} value={title} error={errors.title} />
              <InputCard title='SUB TITLE' placeholder='E.G. 2% LAUNCH SALE' required={true} setData={setSubTitle} value={subTitle} error={errors.subTitle} />
              <InputCard title='TOKEN ID' placeholder='pegasus.token.near' required={true} setData={setOutTokenId} value={outTokenId} error={errors.outTokenId} />
              <Flex justifyContent={'space-between'}>
                <InputCard title='TOKEN TICKER' placeholder='$ TOKEN' required={true} setData={setTokenTicker} value={tokenTicker} error={errors.tokenTicker} />
                <InputCard title='STARTING PRICE (USD)' placeholder='0.1' required={true} setData={setStartingPrice} value={startingPrice} error={errors.startingPrice} />
              </Flex>
              <InputCard title='E-MAIL' placeholder='hello@johndoe.com' required={true} setData={setEmail} value={email} error={errors.email} />
              <InputCard title='TELEGRAM CONTACT' placeholder='https://t.me/cryptonear' required={true} setData={setTelegram} value={telegram} error={errors.telegram} />
              <SelectCard title='CHOOSE TOKEN TICKER TO RECEIVE' placeholder='PLEASE SELECT' options={['USDT', 'USDC']} required={true} setData={setInTokenId} value={inTokenId} error={errors.inTokenId} />
              <InputCard title='TOTAL DEPOSIT TOKEN AMOUNT(FOR LAUNCHPAD)' placeholder='0' required={true} setData={setTotalTokens} type='number' value={totalTokens} error={errors.totalTokens} />
              <InputCard title='COINGECKO / COINMARKETCAP LINK (OPTIONAL)' placeholder='https://www.coingecko.com/en/coins/bitcoin/' required={false} setData={setCoingecko} value={coingecko} error={errors.coingecko} />
              <InputCard title='FACEBOOK (OPTIONAL)' placeholder='https://www.facebook.com/projectname' required={false} setData={setFacebook} value={facebook} error={errors.facebook} />
              <InputCard title='INSTAGRAM (OPTIONAL)' placeholder='https://www.instagram.com/projectname' required={false} setData={setInstagram} value={instagram} error={errors.instagram} />
              <InputCard title='TWITTER (OPTIONAL)' placeholder='https://www.twitter.com/projectname' required={false} setData={setTwitter} value={twitter} error={errors.twitter} />
            </Flex>
            <Flex flexDirection='column' width='30%'>
              <Flex marginBottom='2' justifyContent='flex-end'>
                <Text as='h1' fontSize='20px' fontWeight='700' textAlign='end'>PROJECT PARTICULARS</Text>
              </Flex>
              <Flex>
                {
                  (imageUpload?.name !== '' && !isCropped) ? (
                    <Flex flexDirection='column' width='100%'>
                      <Cropper
                        src={imageUploadUri}
                        aspectRatio={1}
                        guides
                        style={{ width: '100%' }}
                        crop={(e) => { setCropperInstance(e.currentTarget.cropper); }}
                        accept={NftImageType}
                        alt='Image cropper'
                      // maxLength={250}
                      />
                      <Button
                        colorScheme='brand'
                        display='flex'
                        justifyContent='center'
                        alignItems='center'
                        marginLeft='auto'
                        marginTop='4'
                        rightIcon={<CropIcon size='20' />}
                        onClick={() => {
                          const croppedImgUrl = cropperInstance?.getCroppedCanvas().toDataURL();
                          setImageUploadUri(croppedImgUrl);

                          cropperInstance?.getCroppedCanvas().toBlob((croppedImgBlob) => { setImageUploadBlob(croppedImgBlob) });
                          setIsCropped(true);
                        }}>
                        Done
                      </Button>
                    </Flex>
                  ) : (
                    <Flex flexDirection='column' width='full'>
                      {imageUploadUri !== '' &&
                        (<Image
                          src={imageUploadUri}
                          alt='cropped nft image'
                          width='full'
                          height='18rem'
                          cursor='pointer'
                          fallback={
                            <Flex
                              width='full'
                              height='18rem'
                              bgColor={color.inputbg}
                              justifyContent='center'
                              alignItems='center'
                              flexDirection='column'
                              border='1px solid'
                              borderRadius='2xl'
                              borderColor={color.border}
                              cursor='pointer'
                            >
                              <Text as='h1' color={color.placeholder} fontSize='36'>LOGO</Text>
                              <Text as='span' color={color.placeholder} fontSize='12'>DRAG & DROP LOGO</Text>
                            </Flex>
                          }
                          border='1px solid'
                          borderRadius='2xl'
                        />)
                      }
                      <Input cursor='pointer' onClick={() => { fileUploadInputRef.current?.click() }} placeholder='Upload' value={imageUpload?.name || 'No file selected'} readOnly variant={isCropped ? 'filled' : 'outline'} />
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
                    </Flex>
                  )
                }
              </Flex>
              <DateCard title='IDO START DATE & TIME' placeholder='PLEASE SELECT' required={true} setData={setStartTime} value={startTime} error={errors.startTime} />
              <DateCard title='IDO END DATE & TIME' placeholder='PLEASE SELECT' required={true} setData={setEndTime} value={endTime} error={errors.endTime} />
              <SelectCard title='CLIFF PERIOD' placeholder='PLEASE SELECT' options={['30 DAYS (DEFAULT)', '60 DAYS (2 MONTHS)', '90 DAYS (3 MONTHS)', '365 DAYS (1 YEAR)']} required={true} setData={setCliffPeriod} value={cliffPeriod} error={errors.cliffPeriod} />
            </Flex>
          </Flex>
          <Flex justifyContent='center' flexDirection='column'>
            <InputAreaCard title='BRIEF DESCRIPTION OF YOUR PROJECT' required={true} setData={setDescription} value={description} error={errors.description} />
            <Flex justifyContent='start' alignItems='start' marginTop='4'>
              <Text as='h3' fontSize='14px' textAlign='start' >
                {'PAYMENT'}
              </Text>
              <Image src={InfoIcon} width={'4'} marginX={2} />
              <Text
                lineHeight={1}
                marginX={4}
                minHeight='10'
                fontSize='40px'
                fontWeight={700}
                color={color.input}
              >
                $500.00
              </Text>
            </Flex>
          </Flex>
          <RuleCard />
          <Flex justifyContent='end' marginTop='8'>
            <Button width={40} position='relative' {...primaryButtonStyle} onClick={() => setSubmitOpen(true)} >PAY & SUBMIT</Button>
          </Flex>
        </Flex>
      )}
    </>
  )
}