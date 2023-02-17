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
import { BiLogOut as LogoutIcon } from 'react-icons/bi'
import { useColor } from "../../hooks";
import { useNearLogin } from "../../hooks/Near";

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
  const { isLoggedInNear, accountIdNear, signInNear, signOutNear } = useNearLogin();

  const handleConnectNear = () => {
    console.log(">>>>>>>", isLoggedInNear)
    if (isLoggedInNear) {
      signOutNear();
    } else {
      signInNear();
    }
  };

  const displayAccountId =
    accountIdNear && accountIdNear.length > 20 ? `${accountIdNear.substring(0, 19)}...` : accountIdNear;

  const connectWallet = (
    <Button aria-label='Connect Wallet' colorScheme='purple' variant='solid' onClick={handleConnectNear}>
      <Text size="sm" sx={{ pr: 1 }}>
        {isLoggedInNear ? displayAccountId : "Connect Wallet"}
      </Text>
      {isLoggedInNear && <LogoutIcon />}
    </Button>

  );

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
        {connectWallet}
      </Flex>
    </Flex >
  );
};
