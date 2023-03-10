import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Flex, Image, Text, Button } from "@chakra-ui/react";
import { secondaryButtonStyle } from "../theme/ButtonStyles";
import { Project, useBalance, useNearContext, useNearLogin } from "../hooks";
import { FtContract } from "../hooks/Near/classWrappers";
import { TokenDecimals } from "../utils/const";

export default function ParticipatedCard(project: Project) {
  const navigate = useNavigate();
  const { isLoggedInNear } = useNearLogin();
  const { config, initFtContract } = useNearContext();
  const { getBalance } = useBalance();

  const [userDepositedBalance, setUserDepositedBalance] = useState<number>(0);
  const [decimals, setDecimals] = useState<number>(6);
  const inTokenDecimals =
    project.in_token_account_id == config.usdcContractId
      ? TokenDecimals.usdc
      : project.in_token_account_id == config.usdtContractId
      ? TokenDecimals.usdt
      : TokenDecimals.near;
  const estimatedTokenPurchased =
    (project.total_tokens * userDepositedBalance) /
    project.total_deposits /
    decimals;
  const price =
    project.total_deposits /
    inTokenDecimals /
    (project.total_tokens / decimals);

  const getDepositedBalance = async () => {
    const balance = await getBalance(project.project_id);
    setUserDepositedBalance(balance);
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

  useEffect(() => {
    getDecimals(project.out_token_account_id);
  }, []);

  return (
    <Flex
      width={"100%"}
      minHeight="14"
      paddingY="4"
      paddingX="4"
      border="1px solid"
      borderColor="rock.100"
      borderRadius="10px"
      bgColor="rock.50"
      alignItems="center"
      marginY={2}
    >
      <Flex width={"40%"} justifyContent={"start"} flexDirection={"column"}>
        <Flex marginY={1}>
          <Text width={"50%"} as="h1" fontSize="14px" textAlign="start">
            PRICE
          </Text>
          <Text
            width={"50%"}
            as="h2"
            fontSize="18px"
            textAlign="start"
            marginLeft="10px"
          >
            USD ${price}
          </Text>
        </Flex>
        <Flex marginY={1}>
          <Text width={"50%"} as="h1" fontSize="14px" textAlign="start">
            TOKENS PURCHASED
          </Text>
          <Text
            width={"50%"}
            as="h2"
            fontSize="18px"
            textAlign="start"
            marginLeft="10px"
          >
            {estimatedTokenPurchased.toLocaleString()}
          </Text>
        </Flex>
      </Flex>
      <Flex width={"50%"} justifyContent={"center"}>
        <Button
          fontSize="10px"
          paddingX={4}
          {...secondaryButtonStyle}
          onClick={() => navigate(`/detail/${project.project_id}`)}
        >
          DETAILS
        </Button>
      </Flex>
      <Flex width={"10%"} justifyContent={"end"} flexDirection={"column"}>
        <Flex alignItems="end" justifyContent="end">
          <Text as="h2" fontSize="10px" textAlign="end">
            {project.title}
          </Text>
        </Flex>
        <Flex alignItems="center" justifyContent={"space-between"}>
          <Image src={project.logo} />
          <Text as="h1" fontSize="14px" textAlign="end">
            {project.title}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
}
