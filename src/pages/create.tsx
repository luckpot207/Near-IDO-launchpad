import { useState, useEffect, useRef } from 'react';
import { Flex, Text, Input, Button, Select, Image } from '@chakra-ui/react';
import { BiCrop as CropIcon, BiChevronLeft as ArrowLeftIcon, BiChevronRight as ArrowRightIcon } from 'react-icons/bi';
import TitleCard from '../components/TitleCard';
import InputCard from '../components/InputCard';
import InputAreaCard from '../components/InputAreaCard';
import SelectCard from '../components/SelectCard';
import DateCard from '../components/DateCard';
import RuleCard from '../components/RuleCard';
import { useColor, useRegisterProject, useNearContext, useNearLogin, RegisterProjectParameters } from '../hooks';
import { ListingDetail, NftImageType } from '../types';
import { token1, token2 } from '../utils/tokens';
import { payment } from '../utils/const';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import USDT from '../assets/img/icons/usdt.svg'
import USDC from '../assets/img/icons/disc.svg'


export default function Create() {
  const { usdtContract, config } = useNearContext();
  const { isLoggedInNear, accountIdNear } = useNearLogin();
  const { registerProject } = useRegisterProject();
  const color = useColor();
  const fileUploadInputRef = useRef<HTMLInputElement | null>(null);
  const [isCropped, setIsCropped] = useState<boolean>(false);
  const [cropperInstance, setCropperInstance] = useState<Cropper>();
  const [userBalance, setUserBalance] = useState<string>('');
  const [title, setTitle] = useState<string>('Noname Sales');
  const [subTitle, setSubTitle] = useState<string>('');
  const [tokenId, setTokenId] = useState<string>('');
  const [tokenTicker, setTokenTicker] = useState<string>('');
  const [startingPrice, setStartingPrice] = useState<number>(0);
  const [email, setEmail] = useState<string>('');
  const [telegram, setTelegram] = useState<string>('');
  const [token, setToken] = useState<number>(0);
  const [totalTokens, setTotalTokens] = useState<number>(0);
  const [coingecko, setCoingecko] = useState<string>('');
  const [facebook, setFacebook] = useState<string>('');
  const [instagram, setInstagram] = useState<string>('');
  const [twitter, setTwitter] = useState<string>('');
  const [idoStartDate, setIdoStartDate] = useState<Date>();
  const [idoEndDate, setIdoEndDate] = useState<Date>();
  const [cliffPeriod, setCliffPeriod] = useState<number>(0);
  const [description, setDescription] = useState<string>('');
  const [imageUpload, setImageUpload] = useState<File | null>(new File([], ''));
  const [imageUploadUri, setImageUploadUri] = useState<string>();
  const [imageUploadBlob, setImageUploadBlob] = useState<Blob | null>(new Blob());
  const [submitOpen, setSubmitOpen] = useState<boolean>(false);

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

  const handleRegisterProject = () => {
    if (!title) { setSubmitOpen(false); return; }
    if (!imageUploadBlob) return;
    const logo = "blobToBase64(imageUploadBlob)";
    if (!idoStartDate || !idoEndDate) return;
    const startTime = Math.floor(new Date(idoStartDate).getTime() / 1000)
    const endTime = Math.floor(new Date(idoEndDate).getTime() / 1000)
    const wrappedCliffPeriod = cliffPeriod * (10 ** 6)
    registerProject(
      {
        accountId: accountIdNear,
        ftContractId: config.usdtContractId,
        title,
        subTitle,
        tokenTicker,
        logo,
        startingPrice,
        email,
        telegram,
        inTokenAccountId: config.usdtContractId,
        outTokenAccountId: tokenId,
        totalTokens,
        coingecko,
        facebook,
        instagram,
        twitter,
        description,
        startTime,
        endTime,
        cliffPeriod: wrappedCliffPeriod,
      }
    )
  }

  const getUserBalance = async () => {
    setUserBalance(await usdtContract.getFtBalanceOfOwnerFormatted(accountIdNear))
  }

  useEffect(() => {
    if (isLoggedInNear) getUserBalance()
  }, [isLoggedInNear])

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
                  You are about to pay 500 {payment[token]} to Pegasus for project registration and listing fee. Kindly click pay to deduct 500 {payment[token]} from your wallet
                </Text>
                <Text as='h2' fontSize='64px' textAlign='center' fontWeight='bold' marginY={2}>500</Text>
                <Text as='h2' fontSize='16px' textAlign='center' >- {payment[token]} -</Text>
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
                  <Flex justifyContent='end' flexDirection='column'>
                    <Flex margin='5px' justifyContent='end'>
                      <Text as='h2' fontSize='1vw' textAlign='end' marginTop='10px' width='max-content' color={color.main}>{'Tether USD'}</Text>
                    </Flex >
                    <Flex justifyContent='end' margin='5px'>
                      <Image src={USDT} />
                      <Text as='h1' fontSize='16px' textAlign='end' marginLeft='15px' color={color.black}>{payment[token]}</Text>
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
                <Button bgGradient='linear-gradient(360deg, #9A3FF4 0%, #D5B5FF 122.97%)' _hover={{ bgGradient: 'linear-gradient(180deg, #9A3FF4 0%, #D5B5FF 122.97%)' }} width={'100%'} color={'white'} onClick={handleRegisterProject}>PAY</Button>
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
              <InputCard title='PROJECT / TOKEN NAME' placeholder='E.G. PROJECT ATLAS' required={true} setData={setTitle} />
              <InputCard title='SUB TITLE' placeholder='E.G. 2% LAUNCH SALE' required={true} setData={setSubTitle} />
              <InputCard title='TOKEN ID' placeholder='pegasus.token.near' required={true} setData={setTokenId} />
              <Flex>
                <InputCard title='TOKEN TICKER' placeholder='$ TOKEN' required={true} setData={setTokenTicker} />
                <InputCard title='STARTING PRICE (USD)' placeholder='0.1' required={true} setData={setStartingPrice} />
              </Flex>
              <InputCard title='E-MAIL' placeholder='hello@johndoe.com' required={true} setData={setEmail} />
              <InputCard title='TELEGRAM CONTACT' placeholder='https://t.me/cryptonear' required={true} setData={setTelegram} />
              <SelectCard title='CHOOSE TOKEN TICKER TO RECEIVE' placeholder='PLEASE SELECT' options={['USDT', 'USDC']} required={true} setData={setToken} />
              <InputCard title='TOTAL DEPOSIT TOKEN AMOUNT(FOR LAUNCHPAD)' placeholder='0' required={true} setData={setTotalTokens} type='number' />
              <InputCard title='COINGECKO / COINMARKETCAP LINK (OPTIONAL)' placeholder='https://www.coingecko.com/en/coins/bitcoin/' required={false} setData={setCoingecko} />
              <InputCard title='FACEBOOK (OPTIONAL)' placeholder='https://www.facebook.com/projectname' required={false} setData={setFacebook} />
              <InputCard title='INSTAGRAM (OPTIONAL)' placeholder='https://www.instagram.com/projectname' required={false} setData={setInstagram} />
              <InputCard title='TWITTER (OPTIONAL)' placeholder='https://www.twitter.com/projectname' required={false} setData={setTwitter} />
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
              <DateCard title='IDO START DATE & TIME' placeholder='PLEASE SELECT' required={true} setData={setIdoStartDate} />
              <DateCard title='IDO END DATE & TIME' placeholder='PLEASE SELECT' required={true} setData={setIdoEndDate} />
              <SelectCard title='CLIFF PERIOD' placeholder='PLEASE SELECT' options={['30 DAYS (DEFAULT)', '60 DAYS (2 MONTHS)', '90 DAYS (3 MONTHS)', '365 DAYS (1 YEAR)']} required={true} setData={setCliffPeriod} />
            </Flex>
          </Flex>
          <Flex justifyContent='center' flexDirection='column'>
            <InputAreaCard title='BRIEF DESCRIPTION OF YOUR PROJECT' required={true} setData={setDescription} />
            <Flex justifyContent='start' alignItems='center' marginTop='4'>
              <Flex width='100%' paddingLeft='2'>
                <Text as='h3' fontSize='14px' textAlign='start'>
                  {'PAYMENT (LISTING)'}
                </Text>
              </Flex>
              <Flex
                width='100%'
                border={'1px solid'}
                borderRadius='2xl'
                bgColor={color.inputbg}
                marginTop='5px'
                alignItems='center'
                justifyContent={'end'}
                color={color.border}
              >
                <Text
                  minHeight='10'
                  paddingY='2'
                  paddingX='5'
                  marginTop='5px'
                  alignItems='end'
                  fontSize='18px'
                  color={color.input}
                >
                  {`500 ${payment[token]}`}
                </Text>
              </Flex>
            </Flex>
          </Flex>
          <RuleCard />
          <Flex justifyContent='end' marginTop='8'>
            <Button bgGradient='linear-gradient(360deg, #9A3FF4 0%, #D5B5FF 122.97%)' _hover={{ bgGradient: 'linear-gradient(180deg, #9A3FF4 0%, #D5B5FF 122.97%)' }} position='relative' onClick={() => setSubmitOpen(true)} color={'white'} width={40}>PAY & SUBMIT</Button>
          </Flex>
        </Flex>
      )}
    </>
  )
}