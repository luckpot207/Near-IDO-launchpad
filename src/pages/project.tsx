import { useState, useEffect, useRef } from 'react';
import { Flex, Text, Input, Button, Select, Image } from '@chakra-ui/react';
import { BiCrop as CropIcon, BiChevronLeft as ArrowLeftIcon, BiChevronRight as ArrowRightIcon } from 'react-icons/bi';
import TitleCard from '../components/TitleCard';
import LabelCard from '../components/LabelCard';
import InputAreaCard from '../components/InputAreaCard';
import SelectCard from '../components/SelectCard';
import DateCard from '../components/DateCard';
import RuleCard from '../components/RuleCard';
import { useColor, useRegisterProject, useNearContext, useNearLogin, RegisterProjectParameters, useProjects, useActiveProject } from '../hooks';
import { ListingDetail, NftImageType } from '../types';
import { token1, token2 } from '../utils/tokens';
import { payment } from '../utils/const';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import USDT from '../assets/img/icons/usdt.svg'
import USDC from '../assets/img/icons/disc.svg'
import NEAR from '../assets/img/icons/near.svg'

export default function ProjectDashboard() {
  const { isLoggedInNear, accountIdNear } = useNearLogin();
  const { projects, reload } = useProjects(null, null);
  const { activeProject } = useActiveProject();
  const color = useColor()
  const [submitOpen, setSubmitOpen] = useState<boolean>();
  const [userBalance, setUserBalance] = useState<string>('');
  const [depositBalance, setDepositBalance] = useState<number>(0);

  const handleDeposit = (ftContractId: string) => {
    if (depositBalance <= 0) return;
    activeProject({
      accountId: accountIdNear,
      ftContractId,
      projectId: 0,
      amount: depositBalance
    })
  }

  if (projects.isLoading || projects.isError) return (<>loading.....</>)
  else {
    const project = projects.value[0];
    return (
      <>
        <TitleCard title={submitOpen ? 'Listing Confirmation' : 'Project Dashboard'} />
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
                  <Text as='h1' fontSize='20px' textAlign='center'>DEPOSIT CONFIRMATION</Text>
                </Flex>
                <Flex alignItems='center' flexDirection='column' justifyContent='center' marginY={4}>
                  <Text as='h2' fontSize='14px' textAlign='start' color={color.fadeText} marginBottom={4}>
                    You are about to deposit your project tokens to Pegasus and generate a pool to store your token for IDO purposes. Please input the amount intended
                  </Text>
                  <Input minHeight={'60px'} color={color.black} fontSize={'64px'} fontWeight={700} textAlign={'center'} border={'none'} type={'number'} defaultValue={depositBalance} onChange={(e) => setDepositBalance(Number(e.target.value))} />
                  <Text as='h2' fontSize='16px' textAlign='center' >${project.token_ticker} </Text>
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
                        <Text as='h2' fontSize='1vw' textAlign='end' marginTop='10px' width='max-content' color={color.main}>{project.title}</Text>
                      </Flex >
                      <Flex justifyContent='end' margin='5px'>
                        <Image src={project.logo} />
                        <Text as='h1' fontSize='16px' textAlign='end' marginLeft='15px' color={color.black}>{project.token_ticker}</Text>
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
                </Flex>
                <Flex >
                  <Button colorScheme={'green'} width={'100%'} color={'white'} onClick={() => handleDeposit(project.out_token_account_id)}>DEPOSIT</Button>
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
                <LabelCard title='PROJECT / TOKEN NAME' value={project.title} />
                <LabelCard title='SUB TITLE' value={project.sub_title} />
                <Flex justifyContent={'space-between'}>
                  <LabelCard title='TOKEN TICKER' value={project.token_ticker} />
                  <LabelCard title='STARTING PRICE (USD)' value={project.starting_price.toString()} />
                </Flex>
                <LabelCard title='E-MAIL' value={project.email} />
                <LabelCard title='TELEGRAM CONTACT' value={project.telegram} />
                <LabelCard title='CHOOSE TOKEN TICKER TO RECEIVE' value={project.in_token_account_id} />
                <LabelCard title='TOTAL DEPOSIT TOKEN AMOUNT(FOR LAUNCHPAD)' value={project.total_tokens.toString()} />
                <LabelCard title='COINGECKO / COINMARKETCAP LINK (OPTIONAL)' value={project.coingecko ?? ""} />
                <LabelCard title='FACEBOOK (OPTIONAL)' value={project.facebook ?? ""} />
                <LabelCard title='INSTAGRAM (OPTIONAL)' value={project.instagram ?? ""} />
                <LabelCard title='TWITTER (OPTIONAL)' value={project.twitter ?? ""} />
              </Flex>
              <Flex flexDirection='column' width='30%'>
                <Flex marginBottom='2' justifyContent='flex-end'>
                  <Text as='h1' fontSize='20px' fontWeight='700' textAlign='end'>PROJECT PARTICULARS</Text>
                </Flex>
                <Flex>
                  <Flex flexDirection='column' width='full'>
                    <Image
                      src={project.logo}
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
                    />
                  </Flex>

                </Flex>
                <LabelCard title='IDO START DATE & TIME' value={project.start_time.toString()} />
                <LabelCard title='IDO END DATE & TIME' value={project.end_time.toString()} />
              </Flex>
            </Flex>
            <Flex justifyContent='center' flexDirection='column'>
              <LabelCard title='IDO END DATE & TIME' value={project.description} />
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
                  {project.is_activated ? (
                    <Text
                      minHeight='10'
                      paddingY='2'
                      paddingX='5'
                      marginTop='5px'
                      alignItems='end'
                      fontSize='18px'
                      color={'green'}
                    >
                      PAID
                    </Text>
                  ) : (
                    <Text
                      minHeight='10'
                      paddingY='2'
                      paddingX='5'
                      marginTop='5px'
                      alignItems='end'
                      fontSize='18px'
                      color={'red'}
                    >
                      UNPAID
                    </Text>)}
                </Flex>
              </Flex>
            </Flex>
            <Flex justifyContent='center' flexDirection='column' marginTop='8'>
              <Text as='h3' fontSize='14px' textAlign='start'>
                DISCLAIMER
              </Text>
              <Text as='h3' fontSize='14px' textAlign='start' marginY='4' color={color.placeholder}>
                Kindly click the pay button to establish crypto payment gateway. Once payment is completed, you’ll be redirected to the confirmation page. Your submission may / may not be listed due to the nature of your project and bound to Pegasus Terms & Conditions. In the event if your submission is rejected, you get a full refund to the original addressee.
              </Text>
              <Button bgGradient='linear-gradient(360deg, #9A3FF4 0%, #D5B5FF 122.97%)' position='relative' onClick={() => setSubmitOpen(true)} color={'white'}>DEPOSIT ${ } TOKEN</Button>
            </Flex>
          </Flex>
        )}
      </>
    )
  }
}
