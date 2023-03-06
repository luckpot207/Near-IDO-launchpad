import { Box, Flex, Grid, Text } from "@chakra-ui/react";
import ListCard from '../components/ListCard';
import TitleCard from '../components/TitleCard';
import Loading from "../components/Loading";
import { useProjects } from '../hooks';
import { TimeDivision } from "../utils/const";


export default function Listings() {
  const { projects } = useProjects(null, null);

  return (
    <>
      <Box >
        <Flex justifyContent={'center'}>
          <TitleCard title={'Live Listings'} />
        </Flex>
        {(projects.isLoading) ? (
          <Loading />
        ) : projects.isError ? (
          <Flex justifyContent={'center'}>
            <Text>Contract not initialized.</Text>
          </Flex>
        ) : projects.value.length <= 0 ?
          <Flex justifyContent={'center'}>
            <Text>Nothing projects.</Text>
          </Flex>
          : (
            <Grid templateColumns={{ lg: 'repeat(3, 1fr)', md: 'repeat(2, 1fr)', base: 'repeat(, 1fr)' }} gap={10} paddingY='4'>
              {projects.value.map((project, idx) => {
                const startTime = project.start_time / TimeDivision;
                const endTime = project.end_time / TimeDivision;
                const projectDuration = project.end_time / TimeDivision - project.start_time / TimeDivision;
                const expiredDuration = Date.now() - project.start_time / TimeDivision;
                const progressValue = 100 * expiredDuration / projectDuration;
                const isActivated = project.end_time / TimeDivision < Date.now() || !project.is_activated ? false : true;
                return (
                  <ListCard
                    key={idx}
                    projectId={project.project_id}
                    title={project.title}
                    subtitle={project.sub_title}
                    startTime={startTime}
                    endTime={endTime}
                    progressValue={progressValue}
                    isActivated={isActivated}
                    totalTokens={project.total_tokens}
                    totalDeposits={project.total_deposits}
                    tokenTicker={project.token_ticker}
                    logo={project.logo}
                    outTokenId={project.out_token_account_id}
                  />
                )
              })}
            </Grid>
          )}
      </Box>

    </>
  )
}