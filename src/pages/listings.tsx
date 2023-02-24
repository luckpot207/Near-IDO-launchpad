import { Box, Flex, Grid } from "@chakra-ui/react";
import { token1, token2, token3, token4, token5 } from "../utils/tokens";
import { useState, useEffect } from 'react';
import ListCard from '../components/ListCard';
import TitleCard from '../components/TitleCard';
// import DetailCard from '../components/DetailCard';
import DetailCard from '../components/DetailCard';
import { ListingDetail } from '../types/listing';
import { LoadableResult } from '../types/project';
import { useColor, useProjects, useNearContext, useNearLogin, RegisterProjectParameters, Project } from '../hooks';
import { BiChevronLeft as ArrowLeftIcon } from 'react-icons/bi';


export default function Listings() {
  const [settingOpen, setSettingOpen] = useState<boolean>(false);

  const { projects } = useProjects(null, null);
  if (!projects.isLoading && !projects.isError) console.log("projects is ", projects.value)

  return (
    <>
      <Box >
        <Flex justifyContent={'center'}>
          <TitleCard title={'Live Listings'} />
        </Flex>

        <Grid templateColumns={{ lg: 'repeat(3, 1fr)', md: 'repeat(2, 1fr)', base: 'repeat(, 1fr)' }} gap={10} paddingY='4'>
          {(projects.isLoading || projects.isError) ? ('loading....') : (
            projects.value.map((project, idx) => (
              <ListCard key={idx} projectId={project.project_id} title={project.title} subtitle={project.sub_title} />
            ))
          )}
        </Grid>
      </Box>

    </>
  )
}