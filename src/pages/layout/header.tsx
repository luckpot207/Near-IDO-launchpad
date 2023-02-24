import { Link, NavLink, } from "react-router-dom";
import {
  Box,
  Flex,
  IconButton,
  useColorMode,
  Image,
  Spacer,
  Button,
  Text,
  useDisclosure,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useColorModeValue,
  Show,
  Hide,
  MenuGroup,
  MenuDivider,
  MenuIcon,
  MenuOptionGroup
} from "@chakra-ui/react"
import { BiLogOut as LogoutIcon } from 'react-icons/bi'
// import Dropdown from 'react-bootstrap/Dropdown';
import { useColor } from "../../hooks";
import Menubar from "../../components/menu";
import { useNearLogin } from "../../hooks/Near";
import { AddIcon, EditIcon, ExternalLinkIcon, HamburgerIcon, RepeatIcon } from "@chakra-ui/icons";


const NAV_LINKS = [
  {
    name: "Listings",
    url: ["/", "/create"],
    items: ["Live Listing", "Register Project"]
  },
  {
    name: "Treasury",
    url: ["/treasury"],
    items: []
  },
  {
    name: "Account",
    url: ["/account", "/project"],
    items: ["User Dashboard", "Project Dashboard"]
  },
  {
    name: "Swap",
    url: ["/swap"],
    items: []
  },
]

export default function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const color = useColor();
  const { toggleColorMode } = useColorMode();
  const { isLoggedInNear, accountIdNear, signInNear, signOutNear } = useNearLogin();

  const handleConnectNear = () => {
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
        {isLoggedInNear ? displayAccountId : "$"}
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
      paddingX="8"
      alignItems="center"
      zIndex={99999}
      bgColor={color.background}
    >
      <Flex alignItems={'center'} width={{ base: '80px', md: '100px', lg: '110px' }}>
        <Link to='/'>
          <Image src={color.logoMode} />
        </Link>
      </Flex>
      <Spacer />
      <Flex gap="10" alignItems='center' justifyContent='center' >
        <Show above="md">
          {NAV_LINKS.map((navLink, index) => (
            <NavLink key={index} end to={navLink.url[0]} style={navData => ({
              color: navData.isActive ? "#374151" : "#9CA3AF"
            })} >
              <Menubar title={navLink.name} items={navLink.items} url={navLink.url}></Menubar>
            </NavLink>
          ))}
        </Show>

      </Flex>
      <Spacer />
      <Flex gap="5" as="div" width='ls' justifyContent='center'>
        <Show above="md">
          <IconButton
            aria-label="Switch theme"
            icon={<color.changeMode />}
            isRound
            variant="solid"
            onClick={toggleColorMode}
          />
          {connectWallet}
        </Show>
        <Hide above="md">
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label='Options'
              icon={<HamburgerIcon />}
              variant='outline'
            />
            <MenuList color={color.blue} paddingX="10px">
              {NAV_LINKS.map((navLink, index) => (
                navLink.url.length > 1 ?
                  <Box>
                    <MenuOptionGroup color={color.contact} fontSize={'18px'} fontFamily={'Poppins'} defaultValue='desc' title={navLink.name}>
                      {
                        navLink.url.map((m, i) => (
                          <MenuItem key={i}>
                            <Link to={m}>
                              <Text width={'100%'}>{navLink.items[i]}</Text>
                            </Link>
                          </MenuItem>
                        ))
                      }
                    </MenuOptionGroup>
                    <MenuDivider />
                  </Box>
                  :
                  <Box>
                    <MenuItem key={index}>
                      <Link to={navLink.url[0]}>
                        <Text width={"100%"}>{navLink.name}</Text>
                      </Link>
                    </MenuItem>
                    <MenuDivider />
                  </Box>
              ))}
              <MenuItem>
                <Text width={"100%"} onClick={toggleColorMode}>Change Theme</Text>
              </MenuItem>
              <MenuDivider />
              <MenuItem>
                <Text width={"100%"} onClick={handleConnectNear}>Select Wallet</Text>
              </MenuItem>
            </MenuList>
          </Menu>
        </Hide>
      </Flex>
    </Flex >
  );
};
