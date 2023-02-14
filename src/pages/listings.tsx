import { Grid, GridItem, Flex, Button } from "@chakra-ui/react";
import SettingBlank from "../components/SettingBlank";
import { token1, token2, token3, token4, token5 } from "../utils/tokens";
import { useState, useEffect, useRef } from 'react';
import ListCard from '../components/ListCard';
import TitleCard from '../components/TitleCard';
import DetailCard from '../components/DetailCard';
import { ListingDetail } from '../types/listing';
import { BiChevronLeft as ArrowLeftIcon } from 'react-icons/bi';


export default function Listings() {
  const [detailOpen, setDetailOpen] = useState<boolean>(false);
  const [settingOpen, setSettingOpen] = useState<boolean>(false);

  const listing1: ListingDetail = {
    fromToken: token1,
    toToken: token2,
    startTime: 1676419200000,
    endTime: 1677024000000,
    progress: 70
  }
  const listing2: ListingDetail = {
    fromToken: token3,
    toToken: token4,
    startTime: 1677283200000,
    endTime: 1677715200000,
    progress: 10
  }
  const listing3: ListingDetail = {
    fromToken: token3,
    toToken: token5,
    startTime: 1677715200000,
    endTime: 1677715200000,
    progress: 0
  }
  return (
    <>
      <TitleCard title={settingOpen ? 'Live Listings Panel' : 'Live Listings'} />
      {detailOpen ? (
        <Grid gap={10} paddingY='4'>
          <Flex>
            <Button
              variant='ghost'
              colorScheme='purple'
              leftIcon={<ArrowLeftIcon />}
              onClick={() => setDetailOpen(false)}>
              Back
            </Button>
          </Flex>
          <DetailCard title={'STARLUX'} subtitle={'1% IDO OFFERINGS'} listing={listing1} />
        </Grid>
      ) : settingOpen ? (
        <Flex gap={1} paddingY="4" flexDirection={'column'}>
          <Flex>
            <Button
              variant='ghost'
              colorScheme='purple'
              leftIcon={<ArrowLeftIcon />}
              onClick={() => setSettingOpen(false)}>
              Back
            </Button>
          </Flex>
          <Grid templateColumns='repeat(3, 1fr)' gap={6}>
            <GridItem colSpan={1}>
              <ListCard title={'STARLUX'} subtitle={'1% IDO OFFERINGS'} listing={listing1} handleSetting={setSettingOpen} handleDetail={setDetailOpen} btnStatus={settingOpen}/>
            </GridItem>
            <GridItem colSpan={2}>
              <SettingBlank title={'STARLUX'} subtitle={'1% IDO OFFERINGS'} listing={listing1} />
            </GridItem>
          </Grid>
        </Flex>
      ) : (
        <Grid templateColumns='repeat(3, 1fr)' gap={10} paddingY='4'>
          <ListCard title={'STARLUX'} subtitle={'1% IDO OFFERINGS'} listing={listing1} handleSetting={setSettingOpen} handleDetail={setDetailOpen} btnStatus={settingOpen}/>
          <ListCard title={'DWINDLE'} subtitle={'4% INITIAL SALE'} listing={listing2} handleSetting={setSettingOpen} handleDetail={setDetailOpen} btnStatus={settingOpen}/>
          <ListCard title={'THE SILICA'} subtitle={'INVESTOR ROUNDS'} listing={listing3} handleSetting={setSettingOpen} handleDetail={setDetailOpen} btnStatus={settingOpen}/>
        </Grid>
      )}
    </>
  )
}