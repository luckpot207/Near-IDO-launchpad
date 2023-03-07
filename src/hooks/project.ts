import { useMemo } from "react";
import { useQuery } from "react-query";
import { useNearLogin, useNearContext, useTxOutcome, RegisterProjectParameters, DepositProjectParameters } from "./Near";
import { LoadableResult, } from "../types";
import { Project } from "./Near";

interface ProjectResult {
  project: LoadableResult<Project>;
  reload: () => void;
}

interface ProjectsResult {
  projects: LoadableResult<Project[]>;
  reload: () => void;
}

export const useProject = (projectId: number): ProjectResult => {
  const { pegasusContract } = useNearContext();
  const { accountIdNear } = useNearLogin();

  const projectInfo = useQuery(
    ["fetchProjectInfoRaw", projectId, accountIdNear],
    async (): Promise<Project> => {
      const project: Project = await pegasusContract.getProject(projectId);
      return project
    },
    {
      enabled: Number(projectId) >= 0,
      cacheTime: 0,
    }
  );
  const project = useMemo((): LoadableResult<Project> => {
    if (projectInfo.isLoading) {
      return { isLoading: true, isError: false };
    }
    if (projectInfo.isError) {
      return { isLoading: false, isError: true, error: `${projectInfo.error}` };
    }

    const result = projectInfo.data!;

    return { isLoading: false, isError: false, value: result };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectInfo.isLoading, projectInfo.isError, projectInfo.data, projectInfo.isRefetching]);

  return {
    project,
    reload: () => projectInfo.refetch(),
  };
}

interface GetBalance {
  getBalance: (projectId: number) => Promise<number>;
}

export const useBalance = (): GetBalance => {
  const { pegasusContract } = useNearContext();
  const { accountIdNear } = useNearLogin();

  const getBalance = async (projectId: number) => {
    const balance: number = await pegasusContract.getNumBalances(projectId, accountIdNear);
    return balance
  }

  return {
    getBalance
  }
}

export const useProjects = (startNum: number | null, limit: number | null): ProjectsResult => {
  const { pegasusContract } = useNearContext();
  const { accountIdNear } = useNearLogin();

  const projectInfo = useQuery(
    ["fetchProjectsInfoRaw", "allProjects", accountIdNear],
    async (): Promise<Project[] | null> => {
      const projects: Project[] = await pegasusContract.getProjects(startNum, limit);
      return projects
    }
  );
  const projects = useMemo((): LoadableResult<Project[]> => {
    if (projectInfo.isLoading) {
      return { isLoading: true, isError: false };
    }
    if (projectInfo.isError) {
      return { isLoading: false, isError: true, error: `${projectInfo.error}` };
    }

    const result = projectInfo.data!;

    return { isLoading: false, isError: false, value: result };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectInfo.isLoading, projectInfo.isError, projectInfo.data, projectInfo.isRefetching]);

  return {
    projects,
    reload: () => projectInfo.refetch(),
  };
}

interface RegisterProject {
  registerProject: (params: RegisterProjectParameters) => Promise<number>;
  useProjectRegistered: (action: (projectId: number) => void) => void;
}

export const useRegisterProject = (): RegisterProject => {
  const { pegasusContract } = useNearContext();

  const registerProject = async (params: RegisterProjectParameters): Promise<number> => {
    const projectId = await pegasusContract
      .registerProject(
        params.accountId,
        params.inTokenContract,
        params.outTokenContract,
        params.title,
        params.subTitle,
        params.logo,
        params.startingPrice,
        params.email,
        params.telegram,
        params.inTokenId,
        params.outTokenId,
        params.totalTokens,
        params.coingecko,
        params.facebook,
        params.instagram,
        params.twitter,
        params.description,
        params.startTime,
        params.endTime,
        params.cliffPeriod,
      );
    return projectId;
  }

  const useProjectRegistered = (action: (projectId: number) => void) => {
    useTxOutcome((outcome) => {
      if (outcome.success && outcome.originalFunctionCall?.methodName === "register_project") {
        action(outcome.successValue as number);
      }
    });
  }

  return {
    registerProject,
    useProjectRegistered,
  }
}

interface ActiveProject {
  activeProject: (
    params: DepositProjectParameters
  ) => Promise<number>;
}

export const useActiveProject = (): ActiveProject => {
  const { pegasusContract } = useNearContext();

  const activeProject = async (params: DepositProjectParameters): Promise<number> => {
    const projectId = await pegasusContract
      .activeProject(
        params.accountId,
        params.projectId,
        params.ftContract,
        params.amount
      );
    return projectId;
  }

  return {
    activeProject,
  }
}

interface ProjectDepositInToken {
  projectDepositInToken: (params: DepositProjectParameters) => Promise<number>;
}

export const useDepositInToken = (): ProjectDepositInToken => {
  const { pegasusContract } = useNearContext();

  const projectDepositInToken = async (params: DepositProjectParameters): Promise<number> => {
    const projectId = await pegasusContract
      .projectDepositInToken(
        params.accountId,
        params.projectId,
        params.ftContract,
        params.amount
      );
    return projectId;
  }

  return {
    projectDepositInToken,
  }
}

interface projectWithdrawInToken {
  projectWithdrawInToken: (params: { projectId: number, amount: number | null }) => Promise<number>;
}

export const useWithdrawInToken = (): projectWithdrawInToken => {
  const { pegasusContract } = useNearContext();

  const projectWithdrawInToken = async (params: { projectId: number, amount: number | null }): Promise<number> => {
    const projectId = await pegasusContract
      .projectWithdrawInToken(
        params.projectId,
        params.amount,
      );
    return projectId;
  }

  return {
    projectWithdrawInToken,
  }
}

interface ProjectWithdrawOutToken {
  projectWithdrawOutToken: (params: { projectId: number, amount: number | null }) => Promise<number>;
}

export const useWithdrawOutToken = (): ProjectWithdrawOutToken => {
  const { pegasusContract } = useNearContext();

  const projectWithdrawOutToken = async (params: { projectId: number, amount: number | null }): Promise<number> => {
    const projectId = await pegasusContract
      .projectWithdrawOutToken(
        params.projectId,
        params.amount,
      );
    return projectId;
  }

  return {
    projectWithdrawOutToken,
  }
}

