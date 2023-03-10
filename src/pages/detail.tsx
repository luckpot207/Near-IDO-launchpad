import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Flex,
  Text,
  Image,
  Button,
  SkeletonCircle,
} from "@chakra-ui/react";
import { BiChevronLeft as ArrowLeftIcon } from "react-icons/bi";
import {
  useColor,
  useProject,
  useBalance,
  useNearLogin,
  useNearContext,
  useWithdrawOutToken,
} from "../hooks";
import { FtContract } from "../hooks/Near/classWrappers";
import RuleCard from "../components/RuleCard";
import Loading from "../components/Loading";
import InfoCard from "../components/InfoCard";
import { ShortMonthNames, TimeDivision, TokenDecimals } from "../utils/const";
import { secondaryButtonStyle } from "../theme/ButtonStyles";
import liveListing from "../assets/img/icons/live-listing-small.svg";
import DotArrow from "../assets/img/dot_arrow.svg";
import USDT from "../assets/img/icons/usdt.svg";

export default function Detail() {
  const navigate = useNavigate();
  const now = Date.now();
  const { projectId } = useParams();
  const { project } = useProject(Number(projectId));
  const { getBalance } = useBalance();

  const color = useColor();
  const { isLoggedInNear } = useNearLogin();
  const { config, initFtContract } = useNearContext();
  const usdtContract = new FtContract(initFtContract(config.usdtContractId));
  const { projectWithdrawOutToken } = useWithdrawOutToken();
  const [userDepositedBalance, setUserDepositedBalance] = useState<number>(0);
  const [decimals, setDecimals] = useState<number>(10 ** 6);

  const getDepositedBalance = async () => {
    const balance = await getBalance(Number(projectId));
    setUserDepositedBalance(balance);
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleWithdraw = async () => {
    const res = await projectWithdrawOutToken({
      projectId: Number(projectId),
      amount: null,
    });
    console.log("res", res);
  };

  const getDecimals = async (contractId: string) => {
    const ftContract = new FtContract(initFtContract(contractId));
    const metadata = await ftContract!.getFtMetadata();
    setDecimals(10 ** metadata.decimals);
  };

  useEffect(() => {
    if (isLoggedInNear) {
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
    const endTime = new Date(project.value.end_time / TimeDivision);
    const ended = project.value.end_time / TimeDivision < now ? true : false;
    const remainDuration = project.value.end_time / TimeDivision - now;
    const remainTime = new Date(remainDuration);
    const cliffStartTime = project.value.end_time / TimeDivision;
    const cliffEndTime =
      project.value.end_time / TimeDivision +
      Number(project.value.cliff_period);
    const cliffRemainDays = new Date(project.value.cliff_period).getDate() - 1;
    const cliffProgressValue =
      cliffStartTime > now
        ? 0
        : (100 * (now - cliffStartTime)) / project.value.cliff_period;
    const unlockProgressValue = cliffStartTime > now ? 0 : 20;
    const estimatedTokenPurchased =
      (project.value.total_tokens * userDepositedBalance) /
      project.value.total_deposits /
      decimals;
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
          <Flex width="100%" flexDirection={"column"} marginY={8}>
            <Flex justifyContent={"center"}>
              <Image src={liveListing} fallback={<SkeletonCircle />} />
            </Flex>
            <Flex flexDirection={"column"} marginY={2}>
              <Text
                fontFamily="DM Sans"
                fontSize="35px"
                textAlign="center"
                color={color.green}
              >
                DEPOSIT IS INACTIVE
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
              <Text
                fontSize="14px"
                textAlign="center"
                padding="2px 0px 0px 8px"
                color={color.green}
              >
                {project.value.title} IDO {ended ? "has been" : "will be"}{" "}
                completed as at {ShortMonthNames[endTime.getMonth()]}{" "}
                {endTime.getDate()}, {endTime.getFullYear()}
              </Text>
            </Flex>
          </Flex>
          <Flex width={"100%"} flexDirection={"column"} paddingX={8}>
            <Flex justifyContent={"space-between"}>
              <Flex width={"45%"} flexDirection={"column"}>
                <Flex flexDirection={"column"}>
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

                {/* progress bar on the left side of the page */}
                <Flex flexDirection={"column"} marginY={8}>
                  <Flex
                    paddingX={4}
                    marginY={2}
                    alignItems="end"
                    justifyContent={"space-between"}
                  >
                    <Flex width={"20%"}>
                      <Text
                        as="h5"
                        fontSize="14px"
                        fontWeight="500"
                        fontFamily="DM Sans"
                        textAlign="start"
                      >
                        {new Date(cliffStartTime).getDate()}{" "}
                        {ShortMonthNames[new Date(cliffStartTime).getMonth()]}{" "}
                        {new Date(cliffStartTime).getFullYear()}
                      </Text>
                    </Flex>
                    <Flex
                      width={"60%"}
                      flexDirection={"column"}
                      justifyContent={"center"}
                    >
                      <Text
                        as="h5"
                        fontSize="14px"
                        fontWeight="500"
                        fontFamily="DM Sans"
                        textAlign="center"
                        color={color.blue}
                      >
                        (In-Progress)
                      </Text>
                      <Image src={DotArrow} />
                    </Flex>
                    <Flex width={"20%"} justifyContent={"end"}>
                      <Text
                        as="h5"
                        fontSize="14px"
                        fontWeight="500"
                        fontFamily="DM Sans"
                        textAlign="end"
                      >
                        {new Date(cliffEndTime).getDate()}{" "}
                        {ShortMonthNames[new Date(cliffEndTime).getMonth()]}{" "}
                        {new Date(cliffEndTime).getFullYear()}
                      </Text>
                    </Flex>
                  </Flex>
                  <Flex
                    flexDirection={"column"}
                    minWidth="100%"
                    minHeight="14"
                    paddingX="2"
                    alignItems="center"
                    borderRadius="50px"
                    bgColor={color.blue}
                    position="relative"
                    overflow="hidden"
                  >
                    <Box
                      width={`${cliffProgressValue}%`}
                      left="0"
                      bgColor={"#76DEFF"}
                      height="100%"
                      zIndex={300}
                      position="absolute"
                    ></Box>
                    <Flex
                      position="absolute"
                      zIndex={500}
                      justifyContent="center"
                      flexDirection={"column"}
                      minWidth="100%"
                    >
                      <Text
                        fontSize="10px"
                        textAlign="center"
                        paddingTop="2"
                        color={color.background}
                      >
                        TOKEN LOCK
                      </Text>
                      <Text
                        fontSize="20px"
                        textAlign="center"
                        paddingBottom="2"
                        color={color.background}
                      >
                        {cliffRemainDays}{" "}
                        {cliffRemainDays
                          ? "DAYS CLIFF PERIOD"
                          : "DAY CLIFF PERIOD"}
                      </Text>
                    </Flex>
                  </Flex>
                </Flex>
              </Flex>
              <Flex width={"45%"} flexDirection={"column"}>
                <Flex flexDirection={"column"}>
                  <Text
                    as="h1"
                    fontSize="40px"
                    textAlign="end"
                    color={color.black}
                  >
                    USD$ 0.65
                  </Text>
                  <Text
                    as="h2"
                    fontSize="14px"
                    textAlign="end"
                    marginTop="0px"
                    color={color.fadeText}
                  >
                    LAST TOKEN PRICE DURING IDO
                  </Text>
                </Flex>

                {/* progress bar on the right side of the page */}
                <Flex flexDirection={"column"} marginY={8}>
                  <Flex
                    paddingX={4}
                    marginY={2}
                    alignItems="end"
                    justifyContent={"space-between"}
                  >
                    <Flex width={"20%"}>
                      <Text
                        as="h5"
                        fontSize="14px"
                        fontWeight="500"
                        fontFamily="DM Sans"
                        textAlign="start"
                      >
                        {new Date(cliffEndTime).getDate()}{" "}
                        {ShortMonthNames[new Date(cliffEndTime).getMonth()]}{" "}
                        {new Date(cliffEndTime).getFullYear()}
                      </Text>
                    </Flex>
                    <Flex
                      width={"60%"}
                      flexDirection={"column"}
                      justifyContent={"center"}
                    >
                      <Text
                        as="h5"
                        fontSize="14px"
                        fontWeight="500"
                        fontFamily="DM Sans"
                        textAlign="center"
                        color={color.blue}
                      >
                        (Onwards)
                      </Text>
                      <Image src={DotArrow} />
                    </Flex>
                  </Flex>
                  <Flex
                    flexDirection={"column"}
                    minWidth="100%"
                    minHeight="14"
                    paddingX="2"
                    alignItems="center"
                    borderRadius="50px"
                    border={"1px solid"}
                    borderColor={color.lightGreen}
                    position="relative"
                    overflow="hidden"
                  >
                    <Box
                      width={`${unlockProgressValue}%`}
                      left="0"
                      bgColor={color.lightGreen}
                      height="100%"
                      zIndex={300}
                      position="absolute"
                    ></Box>
                    <Flex
                      position="absolute"
                      zIndex={500}
                      justifyContent="center"
                      flexDirection={"column"}
                      minWidth="100%"
                    >
                      <Text
                        fontSize="10px"
                        textAlign="center"
                        paddingTop="2"
                        color={color.green}
                      >
                        TOKEN UNLOCK
                      </Text>
                      <Text
                        fontSize="20px"
                        textAlign="center"
                        paddingBottom="2"
                        color={color.green}
                      >
                        TOKEN DISTRIBUTION
                      </Text>
                    </Flex>
                  </Flex>
                </Flex>
                <Flex justifyContent="end">
                  <Button
                    width={"100%"}
                    {...secondaryButtonStyle}
                    onClick={handleWithdraw}
                    isDisabled={now < cliffEndTime}
                  >
                    WITHDRAW
                  </Button>
                </Flex>
              </Flex>
            </Flex>
            <Flex width={"100%"} marginY="8" flexDirection={"column"}>
              {/* OutToken */}
              <Flex width={"100%"} justifyContent={"space-between"} marginY={2}>
                <InfoCard
                  title={"Total Tokens On Sale"}
                  value={(
                    project.value.total_tokens / decimals
                  ).toLocaleString()}
                  tokenTitle={project.value.title}
                  tokenLogo={project.value.logo}
                  tokenTicker={project.value.title}
                />
                <InfoCard
                  title={"Purchased by Public"}
                  value={estimatedTokenPurchased.toLocaleString()}
                  tokenTitle={project.value.title}
                  tokenLogo={project.value.logo}
                  tokenTicker={project.value.title}
                />
                <InfoCard
                  title={"Your Token Purchased"}
                  value={estimatedTokenPurchased.toLocaleString()}
                  tokenTitle={project.value.title}
                  tokenLogo={project.value.logo}
                  tokenTicker={project.value.title}
                />
              </Flex>

              {/* InToken */}
              <Flex width={"100%"} justifyContent={"space-between"} marginY={2}>
                <InfoCard
                  title={"Total IDO Deposits"}
                  value={(
                    project.value.total_deposits / inTokenDecimals
                  ).toLocaleString()}
                  tokenTitle={"Tether USD"}
                  tokenLogo={USDT}
                  tokenTicker={"USDT.e"}
                />
                <InfoCard
                  title={"Total Withdrawals during IDO"}
                  value={(
                    project.value.total_deposits / inTokenDecimals
                  ).toLocaleString()}
                  tokenTitle={"Tether USD"}
                  tokenLogo={USDT}
                  tokenTicker={"USDT.e"}
                />
                <InfoCard
                  title={"Your Confirmed Deposits"}
                  value={(
                    userDepositedBalance / inTokenDecimals
                  ).toLocaleString()}
                  tokenTitle={"Tether USD"}
                  tokenLogo={USDT}
                  tokenTicker={"USDT.e"}
                />
              </Flex>
            </Flex>
          </Flex>
          <RuleCard />
        </Flex>
      </>
    );
  }
}
