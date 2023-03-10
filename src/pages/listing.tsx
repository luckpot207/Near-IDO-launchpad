import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Flex,
  Text,
  Image,
  VStack,
  HStack,
  Progress,
  Button,
  Icon,
  IconButton,
  Input,
  Hide,
  Show,
} from "@chakra-ui/react";
import { BiChevronDown as ArrowDownIcon } from "react-icons/bi";
import { BiChevronLeft as ArrowLeftIcon } from "react-icons/bi";
import { BiXCircle as ExitIcon } from "react-icons/bi";
import {
  useColor,
  useProject,
  useBalance,
  useNearLogin,
  useNearContext,
  useDepositInToken,
  useWithdrawInToken,
} from "../hooks";
import RuleCard from "../components/RuleCard";
import Loading from "../components/Loading";
import { ShortMonthNames, TimeDivision, TokenDecimals } from "../utils/const";
import { depositButtonStyle, withdrawButtonStyle } from "../theme/ButtonStyles";
import liveListing from "../assets/img/icons/live-listing-small.svg";
import cliffArrow from "../assets/img/icons/arrow-green-short.svg";
import releaseArrow from "../assets/img/icons/arrow-green.svg";
import USDT from "../assets/img/icons/usdt.svg";
import { FtContract } from "../hooks/Near/classWrappers";

export default function Listing() {
  const navigate = useNavigate();
  const now = Date.now();
  const { projectId } = useParams();
  const { project } = useProject(Number(projectId));
  const { getBalance } = useBalance();

  const color = useColor();
  const { isLoggedInNear, accountIdNear } = useNearLogin();
  const { config, initFtContract } = useNearContext();
  const usdtContract = new FtContract(initFtContract(config.usdtContractId));
  const { projectDepositInToken } = useDepositInToken();
  const { projectWithdrawInToken } = useWithdrawInToken();
  const [depositOpen, setDepositOpen] = useState<boolean>(false);
  const [withdrawOpen, setWithdrawOpen] = useState<boolean>(false);
  const [userBalance, setUserBalance] = useState<string>("");
  const [userDepositedBalance, setUserDepositedBalance] = useState<number>(0);
  const [depositBalance, setDepositBalance] = useState<number>(1);
  const [withdrawBalance, setWithdrawBalance] = useState<number>(1);
  const [decimals, setDecimals] = useState<number>(6);

  const getDepositedBalance = async () => {
    const balance = await getBalance(Number(projectId));
    setUserDepositedBalance(balance);
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleExit = () => {
    setDepositOpen(false);
    setWithdrawOpen(false);
    setDepositBalance(500);
    setWithdrawBalance(1);
  };

  const handleDeposit = () => {
    if (depositBalance <= 0) return;
    projectDepositInToken({
      accountId: accountIdNear,
      projectId: Number(projectId),
      ftContract: usdtContract,
      amount: depositBalance,
    });
  };

  const handleWithdraw = async () => {
    if (withdrawBalance <= 0) return;
    const res = await projectWithdrawInToken({
      projectId: Number(projectId),
      amount: withdrawBalance,
    });
    console.log("res", res);
  };

  const getUserBalance = async () => {
    setUserBalance(
      await usdtContract.getFtBalanceOfOwnerFormatted(accountIdNear)
    );
  };

  const getDecimals = async (contractId: string) => {
    const ftContract = new FtContract(initFtContract(contractId));
    const metadata = await ftContract!.getFtMetadata();
    setDecimals(metadata.decimals);
  };

  useEffect(() => {
    if (isLoggedInNear) {
      getUserBalance();
      getDepositedBalance();
    }
  }, [isLoggedInNear]);

  if (project.isLoading || project.isError) return <Loading />;
  else {
    getDecimals(project.value.out_token_account_id);
    const inTokenDecimals =
      project.value.in_token_account_id == config.usdcContractId
        ? TokenDecimals.usdc
        : project.value.in_token_account_id == config.usdtContractId
        ? TokenDecimals.usdt
        : TokenDecimals.near;
    const startTime = new Date(project.value.start_time / TimeDivision);
    const endTime = new Date(project.value.end_time / TimeDivision);
    const projectDuration =
      project.value.end_time / TimeDivision -
      project.value.start_time / TimeDivision;
    const expiredDuration = now - project.value.start_time / TimeDivision;
    const activated =
      project.value.end_time / TimeDivision < now ||
      !project.value.is_activated ||
      !isLoggedInNear
        ? false
        : true;
    const ended = project.value.end_time / TimeDivision < now ? true : false;
    const remainDuration = project.value.end_time / TimeDivision - now;
    const remainTime = new Date(remainDuration);
    const progressValue =
      project.value.end_time / TimeDivision < now || !project.value.is_activated
        ? 0
        : (100 * expiredDuration) / projectDuration;
    const estimatedTokenPurchased =
      (project.value.total_tokens * userDepositedBalance) /
      project.value.total_deposits /
      10 ** decimals;
    console.log("progressvalue", userDepositedBalance);
    const startingPrice = project.value.starting_price / 10 ** 6;
    const mainColor = activated ? "#34D399" : color.main;
    return (
      <>
        <Flex>
          <Button
            variant="ghost"
            colorScheme="purple"
            leftIcon={<ArrowLeftIcon />}
            onClick={handleBack}
          >
            Back
          </Button>
        </Flex>
        <Flex
          minHeight="14"
          minWidth="12"
          width="100%"
          shadow="lg"
          paddingY="4"
          paddingX="8"
          alignItems="center"
          border="1px solid"
          borderColor={color.cardBorder}
          borderRadius="20px"
          flexDirection="column"
        >
          <Flex width={"100%"} justifyContent={"right"}>
            <Flex>
              <Show above="sm">
                <Text>Details</Text>
              </Show>
              <Icon as={ArrowDownIcon} />
            </Flex>
          </Flex>
          <VStack width="100%" spacing="24px">
            <Image src={liveListing} />
            <Text
              fontFamily="DM Sans"
              fontSize="35px"
              textAlign="center"
              color={color.green}
            >
              DEPOSIT IS ACTIVE
            </Text>
            <Text
              fontFamily="Noto Sans Gujarati"
              fontWeight="400"
              fontSize="36px"
              textAlign="center"
              color={color.black}
            >
              {ended
                ? "Ended"
                : `Ending in ${
                    remainTime.getUTCDate() - 1
                  } days ${remainTime.getUTCHours()} hours ${remainTime.getUTCMinutes()} mins`}
            </Text>
            <Flex minWidth="100%">
              <Text as="h5" fontSize="10px" textAlign="start" width="50%">
                {ShortMonthNames[startTime.getMonth()]} {startTime.getDate()},{" "}
                {startTime.getFullYear()}
              </Text>
              <Text as="h5" fontSize="10px" textAlign="end" width="50%">
                {ShortMonthNames[endTime.getMonth()]} {endTime.getDate()},{" "}
                {endTime.getFullYear()}
              </Text>
            </Flex>
            <Progress
              hasStripe
              value={progressValue}
              marginTop="10px !important"
              minWidth="100%"
            />
            <Flex alignItems="center">
              <Box
                width="19px"
                height="19px"
                borderRadius="19px"
                bgColor={color.green}
              ></Box>
              <Text
                fontSize="14px"
                textAlign="center"
                padding="2px 0px 0px 8px"
                color={color.green}
              >
                Currently Raised: USD $
                {project.value.total_deposits /
                  inTokenDecimals /
                  (project.value.total_tokens / 10 ** decimals)}
              </Text>
            </Flex>
          </VStack>
          <Show above="md">
            <Flex width="100%" margin="36px" justifyContent="space-between">
              <VStack spacing="40px">
                <Flex width="100%" flexDirection={"column"}>
                  <Text
                    as="h1"
                    fontSize="40px"
                    textAlign="start"
                    color={color.black}
                  >
                    {project.value.title}
                  </Text>
                  <Text
                    as="h2"
                    fontSize="14px"
                    textAlign="start"
                    marginTop="0px"
                    color={color.fadeText}
                  >
                    {project.value.sub_title}
                  </Text>
                </Flex>
                <Flex
                  minWidth="100%"
                  minHeight="14"
                  paddingY="2"
                  paddingX="2"
                  alignItems="center"
                  border="1px solid"
                  borderColor="rock.100"
                  borderRadius="10px"
                  bgColor="rock.50"
                >
                  <Box width="100%">
                    <Text as="h1" fontSize="14px" textAlign="start">
                      Live Deposits
                    </Text>
                    <Text
                      as="h2"
                      fontSize="18px"
                      textAlign="start"
                      marginTop="10px"
                    >
                      {(
                        project.value.total_deposits / inTokenDecimals
                      ).toLocaleString()}
                    </Text>
                  </Box>
                  <Flex
                    width="100%"
                    justifyContent="end"
                    flexDirection="column"
                  >
                    <Flex margin="5px" justifyContent="end">
                      <Text
                        fontSize="0.7vw"
                        textAlign="end"
                        marginTop="10px"
                        width="max-content"
                      >
                        {project.value.title}
                      </Text>
                    </Flex>
                    <Flex justifyContent="end" margin="5px">
                      <Image src={project.value.logo} />
                      <Text
                        as="h1"
                        fontSize="16px"
                        textAlign="end"
                        marginLeft="15px"
                      >
                        {project.value.title}
                      </Text>
                    </Flex>
                  </Flex>
                </Flex>
                <Flex
                  minWidth="100%"
                  minHeight="14"
                  paddingY="2"
                  paddingX="2"
                  alignItems="center"
                  border="1px solid"
                  borderColor="rock.100"
                  borderRadius="10px"
                  bgColor="rock.50"
                >
                  <Box width="100%" margin="5px">
                    <Text as="h1" fontSize="14px" textAlign="start">
                      Total Tokens On Sale
                    </Text>
                    <Text
                      as="h2"
                      fontSize="18px"
                      textAlign="start"
                      marginTop="10px"
                    >
                      {(
                        project.value.total_tokens /
                        10 ** decimals
                      ).toLocaleString()}
                    </Text>
                  </Box>
                  <Box>
                    <Flex
                      width="100%"
                      justifyContent="end"
                      flexDirection="column"
                    >
                      <Flex margin="5px" justifyContent="end">
                        <Text
                          fontSize="0.7vw"
                          textAlign="end"
                          marginTop="10px"
                          width="max-content"
                        >
                          {project.value.title}
                        </Text>
                      </Flex>
                      <Flex justifyContent="end" margin="5px">
                        <Image src={project.value.logo} />
                        <Text
                          as="h1"
                          fontSize="16px"
                          textAlign="end"
                          marginLeft="15px"
                        >
                          {project.value.title}
                        </Text>
                      </Flex>
                    </Flex>
                  </Box>
                </Flex>
                <Flex
                  minWidth="100%"
                  minHeight="14"
                  paddingY="2"
                  paddingX="2"
                  alignItems="center"
                  border="1px solid"
                  borderColor="rock.100"
                  borderRadius="10px"
                  bgColor="rock.50"
                >
                  <Box width="100%" margin="5px">
                    <Text as="h1" fontSize="14px" textAlign="start">
                      Purchased by Public
                    </Text>
                    <Text
                      as="h2"
                      fontSize="18px"
                      textAlign="start"
                      marginTop="10px"
                    >
                      {(
                        project.value.total_tokens /
                        10 ** decimals
                      ).toLocaleString()}
                    </Text>
                  </Box>
                  <Box>
                    <Flex
                      width="100%"
                      justifyContent="end"
                      flexDirection="column"
                    >
                      <Flex margin="5px" justifyContent="end">
                        <Text
                          fontSize="0.7vw"
                          textAlign="end"
                          marginTop="10px"
                          width="max-content"
                        >
                          {project.value.title}
                        </Text>
                      </Flex>
                      <Flex justifyContent="end" margin="5px">
                        <Image src={project.value.logo} />
                        <Text
                          as="h1"
                          fontSize="16px"
                          textAlign="end"
                          marginLeft="15px"
                        >
                          {project.value.title}
                        </Text>
                      </Flex>
                    </Flex>
                  </Box>
                </Flex>
                <Flex
                  minWidth="100%"
                  minHeight="14"
                  paddingY="2"
                  paddingX="2"
                  alignItems="center"
                  border="1px solid"
                  borderColor="rock.100"
                  borderRadius="10px"
                  bgColor="rock.50"
                  margin="40 0px"
                >
                  <Box width="100%">
                    <Text as="h1" fontSize="14px" textAlign="start">
                      No. of Participants
                    </Text>
                    <Text
                      as="h2"
                      fontSize="18px"
                      textAlign="start"
                      marginTop="10px"
                    >
                      {project.value.investors}
                    </Text>
                  </Box>
                </Flex>
              </VStack>
              {depositOpen ? (
                <VStack
                  width={{ lg: "400px", md: "250px", sm: "150px" }}
                  border="1px solid"
                  borderColor={color.cardBorder}
                  borderRadius="20px"
                >
                  <Flex width={"90%"} justifyContent={"flex-end"}>
                    <IconButton
                      variant="ghost"
                      aria-label="Exit panel"
                      icon={<ExitIcon />}
                      onClick={handleExit}
                    />
                  </Flex>
                  <Flex flexDirection={"column"} padding={8}>
                    <Text
                      as="h1"
                      fontStyle="normal"
                      fontWeight="500"
                      fontSize="20px"
                      color={"#26A17B"}
                    >
                      DEPOSIT FUNDS
                    </Text>
                    <Text
                      as="h2"
                      fontStyle="normal"
                      fontWeight="500"
                      fontSize="14px"
                      lineHeight={"18px"}
                      textAlign={"justify"}
                      paddingY="4"
                    >
                      You are about to deposit funds to STARLUX pool. Please
                      input the amount intended
                    </Text>
                  </Flex>
                  <Flex
                    flexDirection={"column"}
                    padding={4}
                    justifyContent={"center"}
                  >
                    <Input
                      minHeight={"60px"}
                      color={color.black}
                      fontSize={"64px"}
                      fontWeight={700}
                      textAlign={"center"}
                      border={"none"}
                      type={"number"}
                      max={userBalance.toLocaleString()}
                      min={startingPrice.toLocaleString()}
                      defaultValue={depositBalance.toLocaleString()}
                      onChange={(e) =>
                        setDepositBalance(Number(e.target.value))
                      }
                    />
                    <Text
                      as="h2"
                      fontStyle="normal"
                      fontWeight="500"
                      fontSize="14px"
                      lineHeight={"18px"}
                      textAlign={"center"}
                      paddingY="4"
                    >
                      - USD
                    </Text>
                  </Flex>
                  <Flex
                    flexDirection={"column"}
                    padding={4}
                    justifyContent={"center"}
                  >
                    <Flex
                      minWidth="100%"
                      minHeight="14"
                      paddingY="2"
                      paddingX="2"
                      alignItems="center"
                      border="1px solid"
                      borderColor="rock.100"
                      borderRadius="10px"
                      bgColor="rock.50"
                    >
                      <Flex width="100%" margin="5px">
                        <Text as="h1" fontSize="14px" textAlign="start">
                          AVAILABLE TO DEPOSIT
                        </Text>
                      </Flex>
                      <Flex
                        width="100%"
                        justifyContent="end"
                        flexDirection="column"
                      >
                        <Flex margin="5px" justifyContent="end">
                          <Text
                            fontSize="0.7vw"
                            textAlign="end"
                            marginTop="10px"
                            width="max-content"
                          >
                            {"Tether USD"}
                          </Text>
                        </Flex>
                        <Flex justifyContent="end" margin="5px">
                          <Image src={USDT} />
                          <Text
                            as="h2"
                            fontSize="16px"
                            textAlign="end"
                            marginLeft="15px"
                          >
                            {Number(userBalance).toLocaleString()}
                          </Text>
                        </Flex>
                      </Flex>
                    </Flex>
                    <Flex
                      minWidth="100%"
                      minHeight="14"
                      marginY={4}
                      paddingY="2"
                      paddingX="2"
                      alignItems="center"
                      border="1px solid"
                      borderColor="rock.100"
                      borderRadius="10px"
                      bgColor="rock.50"
                    >
                      <Flex width="100%" margin="5px">
                        <Text as="h1" fontSize="14px" textAlign="start">
                          DEPOSIT TO POOL
                        </Text>
                      </Flex>
                      <Flex
                        width="100%"
                        justifyContent="end"
                        flexDirection="column"
                      >
                        <Flex margin="5px" justifyContent="end">
                          <Text
                            fontSize="0.7vw"
                            textAlign="end"
                            marginTop="10px"
                            width="max-content"
                          >
                            {""}
                          </Text>
                        </Flex>
                        <Flex justifyContent="end" margin="5px">
                          <Text
                            as="h2"
                            fontSize="16px"
                            textAlign="end"
                            marginLeft="15px"
                          >
                            {project.value.title}
                          </Text>
                        </Flex>
                      </Flex>
                    </Flex>
                  </Flex>
                  <Flex minWidth="100%" minHeight="14" justifyContent="center">
                    <Button
                      width="80%"
                      onClick={handleDeposit}
                      isDisabled={withdrawOpen}
                      {...depositButtonStyle}
                    >
                      DEPOSIT
                    </Button>
                  </Flex>
                  <Flex minWidth="100%" minHeight="14" justifyContent="center">
                    <Button
                      width="80%"
                      isDisabled={depositOpen}
                      onClick={handleWithdraw}
                      {...withdrawButtonStyle}
                    >
                      WITHDRAW
                    </Button>
                  </Flex>
                </VStack>
              ) : withdrawOpen ? (
                <VStack
                  width={{ lg: "400px", md: "250px", sm: "150px" }}
                  border="1px solid"
                  borderColor={color.cardBorder}
                  borderRadius="20px"
                >
                  <Flex width={"90%"} justifyContent={"flex-end"}>
                    <IconButton
                      variant="ghost"
                      aria-label="Exit panel"
                      icon={<ExitIcon />}
                      onClick={handleExit}
                    />
                  </Flex>
                  <Flex flexDirection={"column"} padding={8}>
                    <Text
                      as="h1"
                      fontStyle="normal"
                      fontWeight="500"
                      fontSize="20px"
                      color={"#26A17B"}
                    >
                      WITHDRAW FUNDS
                    </Text>
                    <Text
                      as="h2"
                      fontStyle="normal"
                      fontWeight="500"
                      fontSize="14px"
                      lineHeight={"18px"}
                      textAlign={"justify"}
                      paddingY="4"
                    >
                      You are about to withdraw funds from STARLUX pool to your
                      wallet. Please input the amount intended
                    </Text>
                  </Flex>
                  <Flex
                    flexDirection={"column"}
                    padding={4}
                    justifyContent={"center"}
                  >
                    <Input
                      minHeight={"60px"}
                      color={color.black}
                      fontSize={"64px"}
                      fontWeight={700}
                      textAlign={"center"}
                      border={"none"}
                      type={"number"}
                      max={(
                        userDepositedBalance / inTokenDecimals
                      ).toLocaleString()}
                      min={1}
                      defaultValue={withdrawBalance.toLocaleString()}
                      onChange={(e) =>
                        setWithdrawBalance(Number(e.target.value))
                      }
                    />
                    <Text
                      as="h2"
                      fontStyle="normal"
                      fontWeight="500"
                      fontSize="14px"
                      lineHeight={"18px"}
                      textAlign={"center"}
                      paddingY="4"
                    >
                      - USD
                    </Text>
                  </Flex>
                  <Flex
                    flexDirection={"column"}
                    padding={4}
                    justifyContent={"center"}
                  >
                    <Flex
                      minWidth="100%"
                      minHeight="14"
                      paddingY="2"
                      paddingX="2"
                      alignItems="center"
                      border="1px solid"
                      borderColor="rock.100"
                      borderRadius="10px"
                      bgColor="rock.50"
                    >
                      <Flex width="100%" margin="5px">
                        <Text as="h1" fontSize="14px" textAlign="start">
                          AVAILABLE TO WITHDRAW
                        </Text>
                      </Flex>
                      <Flex
                        width="100%"
                        justifyContent="end"
                        flexDirection="column"
                      >
                        <Flex margin="5px" justifyContent="end">
                          <Text
                            fontSize="0.7vw"
                            textAlign="end"
                            marginTop="10px"
                            width="max-content"
                          >
                            {"Tether USD"}
                          </Text>
                        </Flex>
                        <Flex justifyContent="end" margin="5px">
                          <Image src={USDT} />
                          <Text
                            as="h2"
                            fontSize="16px"
                            textAlign="end"
                            marginLeft="15px"
                          >
                            {(
                              userDepositedBalance / inTokenDecimals
                            ).toLocaleString()}
                          </Text>
                        </Flex>
                      </Flex>
                    </Flex>
                    <Flex
                      minWidth="100%"
                      minHeight="14"
                      marginY={4}
                      paddingY="2"
                      paddingX="2"
                      alignItems="center"
                      border="1px solid"
                      borderColor="rock.100"
                      borderRadius="10px"
                      bgColor="rock.50"
                    >
                      <Flex width="100%" margin="5px">
                        <Text as="h1" fontSize="14px" textAlign="start">
                          WITHDRAW FROM POOL
                        </Text>
                      </Flex>
                      <Flex
                        width="100%"
                        justifyContent="end"
                        flexDirection="column"
                      >
                        <Flex margin="5px" justifyContent="end">
                          <Text
                            fontSize="0.7vw"
                            textAlign="end"
                            marginTop="10px"
                            width="max-content"
                          >
                            {""}
                          </Text>
                        </Flex>
                        <Flex justifyContent="end" margin="5px">
                          <Text
                            as="h2"
                            fontSize="16px"
                            textAlign="end"
                            marginLeft="15px"
                          >
                            {project.value.title}
                          </Text>
                        </Flex>
                      </Flex>
                    </Flex>
                  </Flex>
                  <Flex minWidth="100%" minHeight="14" justifyContent="center">
                    <Button
                      width="80%"
                      onClick={handleDeposit}
                      isDisabled={withdrawOpen}
                      {...depositButtonStyle}
                    >
                      DEPOSIT
                    </Button>
                  </Flex>
                  <Flex minWidth="100%" minHeight="14" justifyContent="center">
                    <Button
                      width="80%"
                      isDisabled={depositOpen}
                      onClick={handleWithdraw}
                      {...withdrawButtonStyle}
                    >
                      WITHDRAW
                    </Button>
                  </Flex>
                </VStack>
              ) : (
                <Show above="md">
                  <VStack
                    width={{ lg: "400px", md: "250px", sm: "150px" }}
                    paddingX={"24px"}
                    border="1px solid"
                    borderColor={color.cardBorder}
                    borderRadius="20px"
                  >
                    <Text
                      as="h1"
                      fontFamily="Noto Sans Gujarati"
                      fontStyle="normal"
                      fontWeight="400"
                      fontSize="20px"
                      paddingY="8"
                    >
                      Please choose an option below
                    </Text>
                    <Flex
                      minWidth="100%"
                      minHeight="14"
                      justifyContent="center"
                    >
                      <Button
                        width="80%"
                        onClick={() => {
                          setDepositOpen(true);
                        }}
                        isDisabled={!activated}
                        {...depositButtonStyle}
                      >
                        DEPOSIT
                      </Button>
                    </Flex>
                    <Flex
                      minWidth="100%"
                      minHeight="14"
                      justifyContent="center"
                    >
                      <Button
                        width="80%"
                        onClick={() => {
                          setWithdrawOpen(true);
                        }}
                        isDisabled={!activated}
                        {...withdrawButtonStyle}
                      >
                        WITHDRAW
                      </Button>
                    </Flex>
                  </VStack>
                </Show>
              )}
              <VStack spacing="40px">
                <Box width="100%">
                  <Text
                    as="h1"
                    fontSize="40px"
                    textAlign="end"
                    color={color.progressStatus}
                  >
                    USD${" "}
                    {project.value.total_deposits /
                      inTokenDecimals /
                      (project.value.total_tokens / 10 ** decimals)}
                  </Text>
                  <Text
                    as="h2"
                    fontSize="14px"
                    textAlign="end"
                    marginTop="0px"
                    color={color.fadeText}
                  >
                    LIVE TOKEN PRICE
                  </Text>
                </Box>
                <Flex
                  minWidth="100%"
                  minHeight="14"
                  paddingY="2"
                  paddingX="2"
                  alignItems="center"
                  border="1px solid"
                  borderColor="rock.100"
                  borderRadius="10px"
                  bgColor="rock.50"
                  marginTop="20px !important"
                >
                  <Box width="100%">
                    <Text as="h1" fontSize="14px" textAlign="start">
                      User Current Deposit
                    </Text>
                    <Text
                      as="h2"
                      fontSize="18px"
                      textAlign="start"
                      marginTop="10px"
                    >
                      {(
                        userDepositedBalance / inTokenDecimals
                      ).toLocaleString()}
                    </Text>
                  </Box>
                  <Flex
                    width="100%"
                    justifyContent="end"
                    flexDirection="column"
                  >
                    <Flex margin="5px" justifyContent="end">
                      <Text
                        fontSize="0.7vw"
                        textAlign="end"
                        marginTop="10px"
                        width="max-content"
                      >
                        {"Tether USD"}
                      </Text>
                    </Flex>
                    <Flex justifyContent="end" margin="5px">
                      <Image src={USDT} />
                      <Text
                        as="h1"
                        fontSize="16px"
                        textAlign="end"
                        marginLeft="15px"
                      >
                        {"USDT.e"}
                      </Text>
                    </Flex>
                  </Flex>
                </Flex>
                <Flex
                  minWidth="100%"
                  minHeight="14"
                  paddingY="2"
                  paddingX="2"
                  alignItems="center"
                  border="1px solid"
                  borderColor="rock.100"
                  borderRadius="10px"
                  bgColor="rock.50"
                  margin="40px 0px"
                >
                  <Box width="100%" margin="5px">
                    <Text as="h1" fontSize="14px" textAlign="start">
                      Estimated Token Purchased
                    </Text>
                    <Text
                      as="h2"
                      fontSize="18px"
                      textAlign="start"
                      marginTop="10px"
                    >
                      {estimatedTokenPurchased.toLocaleString()}
                    </Text>
                  </Box>
                  <Box>
                    <Flex
                      width="100%"
                      justifyContent="end"
                      flexDirection="column"
                    >
                      <Flex margin="5px" justifyContent="end">
                        <Text
                          fontSize="0.7vw"
                          textAlign="end"
                          marginTop="10px"
                          width="max-content"
                        >
                          {project.value.title}
                        </Text>
                      </Flex>
                      <Flex justifyContent="end" margin="5px">
                        <Image src={project.value.logo} />
                        <Text
                          as="h1"
                          fontSize="16px"
                          textAlign="end"
                          marginLeft="15px"
                        >
                          {project.value.title}
                        </Text>
                      </Flex>
                    </Flex>
                  </Box>
                </Flex>
                {/* cliff period */}
                <Flex minWidth="100%" minHeight="14" flexDirection="column">
                  <Flex marginX="8px" alignItems="center">
                    <Text
                      as="h5"
                      fontSize="14px"
                      fontWeight="500"
                      fontFamily="DM Sans"
                      textAlign="start"
                      width="50%"
                    >
                      {startTime.getDate()}{" "}
                      {ShortMonthNames[startTime.getMonth()]}{" "}
                      {startTime.getFullYear()}
                    </Text>
                    <Image maxWidth={"100px"} src={cliffArrow}></Image>
                    <Text
                      as="h5"
                      fontSize="14px"
                      fontWeight="500"
                      fontFamily="DM Sans"
                      textAlign="end"
                      width="50%"
                    >
                      {endTime.getDate()} {ShortMonthNames[endTime.getMonth()]}{" "}
                      {endTime.getFullYear()}
                    </Text>
                  </Flex>

                  <Flex
                    flexDirection="column"
                    minWidth="100%"
                    minHeight="14"
                    paddingY="2"
                    paddingX="2"
                    alignItems="center"
                    border="1px solid"
                    borderColor={color.blue}
                    borderRadius="50px"
                    bgColor="rock.50"
                  >
                    <Text fontSize="10px" textAlign="center">
                      TOKEN LOCK
                    </Text>
                    <Text fontSize="20px" textAlign="center" color={color.blue}>
                      CLIFF PERIOD(30 DAYS)
                    </Text>
                  </Flex>
                </Flex>
                {/* release */}
                <Flex minWidth="100%" minHeight="14" flexDirection="column">
                  <Flex marginX="8px" alignItems="end">
                    <Flex flexDirection="column" width={"70%"}>
                      <Text
                        as="h5"
                        fontSize="14px"
                        fontWeight="500"
                        fontFamily="DM Sans"
                        textAlign="center"
                        color={color.green}
                      >
                        (Onwards)
                      </Text>
                      <Image src={releaseArrow}></Image>
                    </Flex>
                    <Flex
                      flexDirection="row"
                      alignItems="end"
                      width={"30%"}
                      marginLeft="16px"
                    >
                      <Text
                        as="h5"
                        fontSize="14px"
                        fontWeight="500"
                        fontFamily="DM Sans"
                        textAlign="center"
                      >
                        {endTime.getDate()}{" "}
                        {ShortMonthNames[endTime.getMonth()]}{" "}
                        {endTime.getFullYear()}
                      </Text>
                    </Flex>
                  </Flex>

                  <Flex
                    flexDirection="column"
                    minWidth="100%"
                    minHeight="14"
                    // paddingY='2'
                    paddingX="2"
                    alignItems="center"
                    border="1px solid"
                    borderColor={color.green}
                    borderRadius="50px"
                    bgColor="rock.50"
                    position="relative"
                    overflow="hidden"
                  >
                    <Text fontSize="10px" textAlign="center" paddingTop="2">
                      TOKEN LOCK
                    </Text>
                    <Text
                      fontSize="20px"
                      textAlign="center"
                      color={color.green}
                      paddingBottom="2"
                    >
                      RELEASE
                    </Text>
                    <Box
                      width="0%"
                      position="absolute"
                      left="0"
                      bgColor={color.fadeText}
                      height="100%"
                    ></Box>
                  </Flex>
                </Flex>
              </VStack>
            </Flex>
          </Show>
          <RuleCard />
        </Flex>
      </>
    );
  }
}
