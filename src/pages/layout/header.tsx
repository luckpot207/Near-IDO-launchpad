import { Link, NavLink } from "react-router-dom";
import {
  Box,
  Flex,
  IconButton,
  useColorMode,
  Image,
  Spacer,
  Button,
  Text
} from "@chakra-ui/react"
import { useColor } from "../../hooks";

const NAV_LINKS = [
  {
    name: "Listings",
    url: "/"
  },
  {
    name: "Treasury",
    url: "/treasury"
  },
  {
    name: "Account",
    url: "/account"
  },
  {
    name: "Create",
    url: "/create"
  },
  {
    name: "Swap",
    url: "/swap"
  },
]

export default function Header() {
  const color = useColor();
  const { toggleColorMode } = useColorMode();

  return (
    <Flex
      as="header"
      width="full"
      position="sticky"
      top={0}
      left={0}
      minHeight="14"
      shadow="lg"
      paddingY="4"
      paddingX="8"
      alignItems="center"
      zIndex={99999}
      bgColor={color.background}
    >
      <Box w='10%' >
        <Link to='/'>
          <Image src={color.logoMode} />
        </Link>
      </Box>
      <Spacer />
      <Flex gap="10" alignItems='center' justifyContent='center' >
        {NAV_LINKS.map((navLink, index) => (
          <NavLink key={index} end to={navLink.url} style={navData => ({
            color: navData.isActive ? "#374151" : "#9CA3AF"
          })} >
            <Text fontSize="lg" fontWeight={700} >{navLink.name}</Text>
          </NavLink>
        ))}
      </Flex>
      <Spacer />
      <Flex gap="5" as="div" width='ls' justifyContent='center'>
        <IconButton
          aria-label="Switch theme"
          icon={<color.changeMode />}
          isRound
          variant="solid"
          onClick={toggleColorMode}
        />
        <Button aria-label='Connect Wallet' colorScheme='purple' variant='solid'>
          Connect Wallet
        </Button>
      </Flex>
    </Flex >
  );
};
