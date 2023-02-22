import { Grid } from "@chakra-ui/react";
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

  const listing1: ListingDetail = {
    fromToken: token1,
    toToken: token2,
    startTime: 1676419200000,
    endTime: 1677024000000,
    progress: 70
  }
  const listing2: ListingDetail = {
    fromToken: token3,
    toToken: token4,
    startTime: 1677283200000,
    endTime: 1677715200000,
    progress: 10
  }
  const listing3: ListingDetail = {
    fromToken: token3,
    toToken: token5,
    startTime: 1677715200000,
    endTime: 1677715200000,
    progress: 0
  }
  const { projects, reload } = useProjects(null, null);
  useEffect(() => {

  }, [])
  return (
    <>
      <TitleCard title={'Live Listings'} />
      <Grid templateColumns='repeat(3, 1fr)' gap={10} paddingY='4'>
        {(projects.isLoading || projects.isError) ? ('loading....') : (
          projects.value.map((project, idx) => (
            <ListCard key={idx} projectId={project.project_id} title={project.title} subtitle={project.sub_title} listing={listing1} />
          ))
        )}
      </Grid>
    </>
  )
}