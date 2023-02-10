import { Grid } from "@chakra-ui/react";
import ListCard from "../components/ListCard";
import TitleCard from "../components/TitleCard";
import { ListingDetail } from "../types/listing";
import { token1, token2, token3, token4, token5 } from "../utils/tokens";

export default function Listings() {
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
      <TitleCard title="Live Listings" />
      <Grid templateColumns='repeat(2, 1fr)' gap={10} paddingY="4">
        <ListCard id={1} listing={listing1} />
        <ListCard id={2} listing={listing2} />
        <ListCard id={3} listing={listing3} />
      </Grid>
    </>
  )
}