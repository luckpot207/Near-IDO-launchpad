import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Flex, Text, Input, Button, Image, IconButton } from "@chakra-ui/react";
import { BiChevronLeft as ArrowLeftIcon } from "react-icons/bi";
import { BiRightArrowAlt as PageRightIcon } from "react-icons/bi";
import { BiLeftArrowAlt as PageLeftIcon } from "react-icons/bi";
import TitleCard from "../components/TitleCard";
import LabelCard from "../components/LabelCard";
import RuleCard from "../components/RuleCard";
import Loading from "../components/Loading";
import {
  useColor,
  useNearLogin,
  useProjects,
  useActiveProject,
  useNearContext,
} from "../hooks";
import "cropperjs/dist/cropper.css";
import { depositButtonStyle, primaryButtonStyle } from "../theme/ButtonStyles";
import { FtContract } from "../hooks/Near/classWrappers";
import { TimeDivision, TokenDecimals } from "../utils/const";

export default function ProjectDashboard() {
  const navigate = useNavigate();
  const { accountIdNear, isLoggedInNear } = useNearLogin();
  const { config, initFtContract } = useNearContext();

  const { projects } = useProjects(null, null);
  const { activeProject } = useActiveProject();
  const color = useColor();
  const [submitOpen, setSubmitOpen] = useState<boolean>();
  const [userBalance, setUserBalance] = useState<string>("");
  const [depositBalance, setDepositBalance] = useState<number>(0);
  const [projectId, setProjectId] = useState<number>(0);
  const [decimals, setDecimals] = useState<number>(0);

  const getDecimals = async (contractId: string) => {
    const ftContract = new FtContract(initFtContract(contractId));
    const metadata = await ftContract!.getFtMetadata();
    setDecimals(metadata.decimals);
  };

  const getUserBalance = async (ftContractId: string) => {
    const ftContract = new FtContract(initFtContract(ftContractId));
    const balance = await ftContract.getFtBalanceOfOwnerFormatted(
      accountIdNear
    );
    setUserBalance(balance.split(".")[0]);
  };

  const handlePrev = (max: number, current: number) => {
    if (current - 1 < 0) setProjectId(max);
    else setProjectId((projectId) => projectId - 1);
  };

  const handleNext = (max: number, current: number) => {
    if (current + 1 > max) setProjectId(0);
    else setProjectId((projectId) => projectId + 1);
  };

  const handleDeposit = (ftContractId: string, projectId: number) => {
    const ftContract = new FtContract(initFtContract(ftContractId));
    if (depositBalance <= 0) return;
    activeProject({
      accountId: accountIdNear,
      projectId: projectId,
      ftContract,
      amount: depositBalance,
    });
  };

  if (projects.isLoading || projects.isError) return <Loading />;
  else {
    const userProjects = projects.value.filter(
      (project) => project.owner_id === accountIdNear
    );
    console.log("project is ............", projects.value);
    if (userProjects.length) {
      getDecimals(userProjects[projectId].out_token_account_id);
      const activate = !depositBalance || !isLoggedInNear ? false : true;
      const inTokenDecimals =
        userProjects[projectId].in_token_account_id === config.usdcContractId
          ? TokenDecimals.usdc
          : userProjects[projectId].in_token_account_id ===
            config.usdtContractId
          ? TokenDecimals.usdt
          : TokenDecimals.near;
      const startTime = new Date(
        userProjects[projectId].start_time / TimeDivision
      );
      const endTime = new Date(userProjects[projectId].end_time / TimeDivision);

      if (isLoggedInNear)
        getUserBalance(userProjects[projectId].out_token_account_id);
      return (
        <>
          <TitleCard
            title={submitOpen ? "Listing Confirmation" : "Project Dashboard"}
          />
          {submitOpen ? (
            <>
              <Flex maxWidth="lg" flexDirection="column" marginX="auto">
                <Flex>
                  <Button
                    variant="ghost"
                    colorScheme="purple"
                    leftIcon={<ArrowLeftIcon />}
                    onClick={() => setSubmitOpen(false)}
                  >
                    Back
                  </Button>
                </Flex>
                <Flex
                  marginY="4"
                  padding="8"
                  shadow="lg"
                  border="1px solid"
                  borderRadius="2xl"
                  borderColor={color.cardBorder}
                  flexDirection="column"
                >
                  <Flex marginBottom="20px" justifyContent="center">
                    <Text as="h1" fontSize="20px" textAlign="center">
                      DEPOSIT CONFIRMATION
                    </Text>
                  </Flex>
                  <Flex
                    alignItems="center"
                    flexDirection="column"
                    justifyContent="center"
                    marginY={4}
                  >
                    <Text
                      as="h2"
                      fontSize="14px"
                      textAlign="start"
                      color={color.fadeText}
                      marginBottom={4}
                    >
                      You are about to deposit your project tokens to Pegasus
                      and generate a pool to store your token for IDO purposes.
                      Please input the amount intended
                    </Text>
                    <Input
                      minHeight={"60px"}
                      color={color.black}
                      fontSize={"64px"}
                      fontWeight={700}
                      textAlign={"center"}
                      border={"none"}
                      type={"number"}
                      defaultValue={depositBalance}
                      min={1}
                      onChange={(e) =>
                        setDepositBalance(Number(e.target.value))
                      }
                    />
                    <Text as="h2" fontSize="16px" textAlign="center">
                      ${userProjects[projectId].title}{" "}
                    </Text>
                  </Flex>
                  <Flex alignItems="center" flexDirection="column" marginY={8}>
                    <Flex
                      width="100%"
                      minHeight="20"
                      paddingY="2"
                      paddingX="8"
                      marginY={3}
                      borderRadius="2xl"
                      bgColor={color.inputbg}
                      alignItems="center"
                      fontSize="18px"
                      border="1px solid"
                      borderColor={color.border}
                      onChange={(e) => console.log(e)}
                      justifyContent={"space-between"}
                    >
                      <Flex>
                        <Text
                          as="h3"
                          fontSize="14px"
                          fontWeight={500}
                          textAlign="start"
                        >
                          {"SELECT ASSET"}
                        </Text>
                      </Flex>
                      <Flex justifyContent="end" flexDirection="column">
                        <Flex margin="5px" justifyContent="end">
                          <Text
                            as="h2"
                            fontSize="1vw"
                            textAlign="end"
                            marginTop="10px"
                            width="max-content"
                            color={color.main}
                          >
                            {userProjects[projectId].title}
                          </Text>
                        </Flex>
                        <Flex justifyContent="end" margin="5px">
                          <Image src={userProjects[projectId].logo} />
                          <Text
                            as="h1"
                            fontSize="16px"
                            textAlign="end"
                            marginLeft="15px"
                            color={color.black}
                          >
                            {userProjects[projectId].title}
                          </Text>
                        </Flex>
                      </Flex>
                    </Flex>
                    <Flex
                      width="100%"
                      minHeight="20"
                      paddingY="2"
                      paddingX="8"
                      marginY={3}
                      bgColor={color.inputbg}
                      fontSize="18px"
                      border="1px solid"
                      borderColor={color.border}
                      borderRadius="2xl"
                      justifyContent={"space-between"}
                      alignItems="center"
                      onChange={(e) => console.log(e)}
                    >
                      <Text
                        as="h3"
                        fontSize="14px"
                        fontWeight={500}
                        textAlign="start"
                      >
                        {"AVAILABLE TO SEND"}
                      </Text>
                      <Text as="h2" fontSize="18px" textAlign="end">
                        {userBalance}
                      </Text>
                    </Flex>
                  </Flex>
                  <Flex>
                    <Button
                      width={"100%"}
                      {...depositButtonStyle}
                      onClick={() =>
                        handleDeposit(
                          userProjects[projectId].out_token_account_id,
                          userProjects[projectId].project_id
                        )
                      }
                      isDisabled={!activate}
                    >
                      DEPOSIT
                    </Button>
                  </Flex>
                </Flex>
              </Flex>
              <RuleCard />
            </>
          ) : (
            <>
              <Flex width={"100%"} justifyContent={"flex-end"}>
                <IconButton
                  variant="ghost"
                  aria-label="Prev project"
                  icon={<PageLeftIcon />}
                  onClick={() => handlePrev(userProjects.length - 1, projectId)}
                />
                <IconButton
                  variant="ghost"
                  aria-label="Next project"
                  icon={<PageRightIcon />}
                  onClick={() => handleNext(userProjects.length - 1, projectId)}
                />
              </Flex>
              <Flex
                width="100%"
                marginY="4"
                padding="8"
                shadow="lg"
                border="1px solid"
                borderRadius="2xl"
                borderColor={color.cardBorder}
                flexDirection="column"
              >
                <Flex justifyContent="space-between">
                  <Flex flexDirection="column" width="65%">
                    <LabelCard
                      title="PROJECT / TOKEN NAME"
                      value={userProjects[projectId].title}
                    />
                    <LabelCard
                      title="SUB TITLE"
                      value={userProjects[projectId].sub_title}
                    />
                    <LabelCard
                      title="TOKEN ID"
                      value={userProjects[projectId].out_token_account_id}
                    />
                    <Flex justifyContent={"space-between"}>
                      <LabelCard
                        title="TOKEN TICKER"
                        value={userProjects[projectId].title}
                      />
                      <LabelCard
                        title="STARTING PRICE (USD)"
                        value={(
                          userProjects[projectId].starting_price /
                          inTokenDecimals
                        ).toString()}
                      />
                    </Flex>
                    <LabelCard
                      title="E-MAIL"
                      value={userProjects[projectId].email}
                    />
                    <LabelCard
                      title="TELEGRAM CONTACT"
                      value={userProjects[projectId].telegram}
                    />
                    <LabelCard
                      title="CHOOSE TOKEN TICKER TO RECEIVE"
                      value={userProjects[projectId].in_token_account_id}
                    />
                    <LabelCard
                      title="TOTAL DEPOSIT TOKEN AMOUNT(FOR LAUNCHPAD)"
                      value={(
                        userProjects[projectId].total_tokens /
                        10 ** decimals
                      ).toString()}
                    />
                    <LabelCard
                      title="COINGECKO / COINMARKETCAP LINK (OPTIONAL)"
                      value={userProjects[projectId].coingecko ?? ""}
                    />
                    <LabelCard
                      title="FACEBOOK (OPTIONAL)"
                      value={userProjects[projectId].facebook ?? ""}
                    />
                    <LabelCard
                      title="INSTAGRAM (OPTIONAL)"
                      value={userProjects[projectId].instagram ?? ""}
                    />
                    <LabelCard
                      title="TWITTER (OPTIONAL)"
                      value={userProjects[projectId].twitter ?? ""}
                    />
                  </Flex>
                  <Flex flexDirection="column" width="30%">
                    <Flex marginBottom="2" justifyContent="flex-end">
                      <Text
                        as="h1"
                        fontSize="20px"
                        fontWeight="700"
                        textAlign="end"
                      >
                        PROJECT PARTICULARS
                      </Text>
                    </Flex>
                    <Flex>
                      <Flex flexDirection="column" width="full">
                        <Image
                          src={userProjects[projectId].logo}
                          alt="cropped nft image"
                          width="full"
                          height="18rem"
                          cursor="pointer"
                          fallback={
                            <Flex
                              width="full"
                              height="18rem"
                              bgColor={color.inputbg}
                              justifyContent="center"
                              alignItems="center"
                              flexDirection="column"
                              border="1px solid"
                              borderRadius="2xl"
                              borderColor={color.border}
                              cursor="pointer"
                            >
                              <Text
                                as="h1"
                                color={color.placeholder}
                                fontSize="36"
                              >
                                LOGO
                              </Text>
                              <Text
                                as="span"
                                color={color.placeholder}
                                fontSize="12"
                              >
                                DRAG & DROP LOGO
                              </Text>
                            </Flex>
                          }
                          border="1px solid"
                          borderRadius="2xl"
                        />
                      </Flex>
                    </Flex>
                    <LabelCard
                      title="IDO START DATE & TIME"
                      value={`${startTime.toLocaleDateString()} ${startTime.toLocaleTimeString()}`}
                    />
                    <LabelCard
                      title="IDO END DATE & TIME"
                      value={`${endTime.toLocaleDateString()} ${endTime.toLocaleTimeString()}`}
                    />
                  </Flex>
                </Flex>
                <Flex justifyContent="center" flexDirection="column">
                  <LabelCard
                    title="DESCRIPTION"
                    value={userProjects[projectId].description}
                  />
                  <Flex
                    justifyContent="start"
                    alignItems="center"
                    marginTop="4"
                  >
                    <Flex width="100%" paddingLeft="2">
                      <Text as="h3" fontSize="14px" textAlign="start">
                        {"PAYMENT (LISTING)"}
                      </Text>
                    </Flex>
                    <Flex
                      width="100%"
                      border={"1px solid"}
                      borderRadius="2xl"
                      bgColor={color.inputbg}
                      marginTop="5px"
                      alignItems="center"
                      justifyContent={"end"}
                      color={color.border}
                    >
                      {userProjects[projectId].is_activated ? (
                        <Text
                          minHeight="10"
                          paddingY="2"
                          paddingX="5"
                          marginTop="5px"
                          alignItems="end"
                          fontSize="18px"
                          color={"green"}
                        >
                          PAID
                        </Text>
                      ) : (
                        <Text
                          minHeight="10"
                          paddingY="2"
                          paddingX="5"
                          marginTop="5px"
                          alignItems="end"
                          fontSize="18px"
                          color={"red"}
                        >
                          UNPAID
                        </Text>
                      )}
                    </Flex>
                  </Flex>
                </Flex>
                <RuleCard />
                <Flex justifyContent="end" marginTop="8">
                  <Button
                    width={40}
                    position="relative"
                    {...primaryButtonStyle}
                    onClick={() => setSubmitOpen(true)}
                    isDisabled={userProjects[projectId].is_activated}
                  >
                    DEPOSIT & TOKEN
                  </Button>
                </Flex>
              </Flex>
            </>
          )}
        </>
      );
    } else {
      return (
        <>
          <Flex justifyContent={"center"}>
            <TitleCard title={"There are no projects which your owned."} />
          </Flex>
          <Flex justifyContent={"center"} marginY={24}>
            <Button
              variant="ghost"
              colorScheme="purple"
              onClick={() => navigate("/create")}
            >
              Register Project
            </Button>
          </Flex>
        </>
      );
    }
  }
}
