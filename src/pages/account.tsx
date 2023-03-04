import { useEffect, useState } from "react";
import { Flex, Image, Text, Button, useBoolean, Grid, GridItem, Show, Hide, Spacer, Box } from "@chakra-ui/react";
import SEAT from "../assets/img/icons/seat.svg"
import kung from "../assets/img/icons/kung.svg"
import divis from "../assets/img/icons/divis.svg"
import { token1, token2 } from "../utils/tokens";
import TitleCard from "../components/TitleCard";
import DashBoardDetail from "../components/dashBoardDetail";
import { useBalance, useColor, useNearContext, useProjects } from '../hooks';
import Loading from "../components/Loading";
import { FtContract } from "../hooks/Near/classWrappers";
import { Project } from "../hooks";
import { TokenDecimals } from "../utils/const";
import ParticipatedCard from "../components/ParticipatedCard";
import UnparticipatedCard from "../components/UnparticipatedCard";

interface SplitProjects {
  even: Project[];
  odd: Project[];
}

export default function Account() {
  const listing1 = {
    fromToken: token1,
    toToken: token2,
    startTime: 1676419200000,
    endTime: 1677024000000,
    progress: 70
  }
  const color = useColor();
  const { projects } = useProjects(null, null);
  const { config, initFtContract } = useNearContext();
  const { getBalance } = useBalance();
  const [flag, setFlag] = useBoolean();
  const [decimals, setDecimals] = useState<number>(0);
  const [participatedProjects, setParticipatedProjects] = useState<Project[]>([]);
  const [notParticipatedProjects, setNotParticipatedProjects] = useState<Project[]>([]);
  const getDecimals = async () => {
    const usdtContract = new FtContract(initFtContract(config.usdtContractId));
    const usdtMetadata = await usdtContract.getFtMetadata();
    setDecimals(usdtMetadata.decimals);
  }

  const getSplitProjects = async (projects: Project[]) => {
    const { even, odd }: SplitProjects = await projects.reduce(
      async (accumulator: Promise<SplitProjects>, project: Project) => {
        const splitProjects = await accumulator;
        const inTokenDecimals =
          project.in_token_account_id === config.usdcContractId ? TokenDecimals.usdc :
            project.in_token_account_id === config.usdtContractId ? TokenDecimals.usdt :
              TokenDecimals.near;
        const userDepositedBalance = (await getBalance(project.project_id)) / inTokenDecimals;
        if (userDepositedBalance > 0) {
          splitProjects.even.push(project);
        } else {
          splitProjects.odd.push(project);
        }
        return splitProjects;
      },
      Promise.resolve({ even: [], odd: [] })
    );

    setParticipatedProjects(even);
    setNotParticipatedProjects(odd)
  }

  useEffect(() => {
    getDecimals();
  }, [])

  if (projects.isLoading || projects.isError) return <Loading />
  else {
    getSplitProjects(projects.value)

    return (
      <>
        <TitleCard title="USER DASHBOARD" />
        {flag ? (
          <DashBoardDetail title={'STARLUX'} subtitle={'1% IDO OFFERINGS'} listing={listing1} />
        ) : (
          <Flex
            marginY="4"
            padding='8'
            shadow="lg"
            border='1px solid'
            borderRadius="2xl"
            borderColor='rock.300'
            flexDirection='column'
          >

            {/* Participated Tokens */}

            <Flex flexDirection='column'>
              {participatedProjects.length ? (
                <Flex marginBottom='20px'>
                  <Text as='h1' fontSize='20px' textAlign='start' color={color.green}>PARTICIPATED LAUNCHPAD TOKENS</Text>
                </Flex>
              ) : (<></>)}
              <Flex flexDirection={'column'}>
                {participatedProjects.map(project => (
                  <ParticipatedCard
                    key={project.project_id}
                    {...project}
                  />
                ))}
              </Flex>
            </Flex>

            {/* OTHER LAUNCHPAD TOKENS */}
            <Flex flexDirection='column' marginY={8}>
              {notParticipatedProjects.length ? (
                <Flex marginBottom='20px'>
                  <Text as='h1' fontSize='20px' textAlign='start' color={color.blue}>OTHER LAUNCHPAD TOKENS</Text>
                </Flex>
              ) : (<></>)}
              <Flex flexDirection={'column'}>
                {notParticipatedProjects.map(project => (
                  <UnparticipatedCard
                    key={project.project_id}
                    {...project}
                  />
                ))}
              </Flex>
            </Flex>
          </Flex>
        )
        }
      </>
    )
  }
}