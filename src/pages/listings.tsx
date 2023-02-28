import { Box, Flex, Grid } from "@chakra-ui/react";
import { useState } from 'react';
import ListCard from '../components/ListCard';
import TitleCard from '../components/TitleCard';
import Loading from "../components/Loading";
import { useColor, useProjects } from '../hooks';


export default function Listings() {
  const [settingOpen, setSettingOpen] = useState<boolean>(false);
  const color = useColor();

  const { projects } = useProjects(null, null);

  return (
    <>
      <Box >
        <Flex justifyContent={'center'}>
          <TitleCard title={'Live Listings'} />
        </Flex>
        {(projects.isLoading || projects.isError) ? (<Loading />) : (
          <Grid templateColumns={{ lg: 'repeat(3, 1fr)', md: 'repeat(2, 1fr)', base: 'repeat(, 1fr)' }} gap={10} paddingY='4'>
            {projects.value.map((project, idx) => {
              const startTime = (new Date(project.start_time / 1000));
              const endTime = (new Date(project.end_time / 1000));
              const projectDuration = project.end_time / 1000 - project.start_time / 1000;
              const expiredDuration = Date.now() - project.start_time / 1000;
              const progressValue = 100 * expiredDuration / projectDuration;
              const isActivated = project.end_time / 1000 < Date.now() || !project.is_activated ? false : true;
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
                />
              )
            })}
          </Grid>
        )}
      </Box>

    </>
  )
}