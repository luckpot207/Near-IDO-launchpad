import { Box, Flex, Heading } from "@chakra-ui/react";
import ListCard from "../components/ListCard";
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
    <Box as="main" padding={{ base: "4", md: "8" }} maxWidth="5xl" marginX="auto">
      <Box maxWidth="2xl" marginX="auto" borderRadius="lg" paddingX="6" paddingY="8" >
        <Heading fontSize="5xl" as='h1'>Live Listings</Heading>
      </Box>
      <Flex width="5xl" marginX="auto" borderRadius="lg" paddingX="6" paddingY="8" justifyContent='space-between'>
        <ListCard id={1} listing={listing1} />
        <ListCard id={2} listing={listing2} />
        {/* <ListCard id={3} listing={listing3} /> */}
      </Flex>
    </Box>
  )
}