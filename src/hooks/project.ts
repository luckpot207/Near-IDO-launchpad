import { useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";
import { singletonHook } from "react-singleton-hook";
import { keysToCamel } from "../utils/string";
import { useNearLogin, useNearContext, useTxOutcome, RegisterProjectParameters } from "./Near";
import Big from "big.js";
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

const OneWeek = 7 * 24 * 60 * 60 * 1000;

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

export const useBalance = (projectId: number): number => {
  const { pegasusContract } = useNearContext();
  const { accountIdNear } = useNearLogin();

  const projectInfo = useQuery(
    ["fetchBalanceInfoRaw", projectId, accountIdNear],
    async (): Promise<number | null> => {
      const balance: number = await pegasusContract.getNumBalances(projectId, accountIdNear);
      return balance
    },
    {
      enabled: Number(projectId) >= 0,
      cacheTime: 0,
    }
  );
  const project = useMemo((): LoadableResult<number> => {
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

  return (project.isLoading || project.isError) ? 0 : project.value

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
        params.ftContractId,
        params.title,
        params.subTitle,
        params.tokenTicker,
        params.logo,
        params.startingPrice,
        params.email,
        params.telegram,
        params.inTokenAccountId,
        params.outTokenAccountId,
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
  activeProject: (params: { accountId: string, ftContractId: string, projectId: number, amount: number }) => Promise<number>;
}

export const useActiveProject = (): ActiveProject => {
  const { pegasusContract } = useNearContext();

  const activeProject = async (params: { accountId: string, ftContractId: string, projectId: number, amount: number }): Promise<number> => {
    const projectId = await pegasusContract
      .activeProject(
        params.accountId,
        params.ftContractId,
        params.projectId,
        params.amount
      );
    return projectId;
  }

  return {
    activeProject,
  }
}

interface ProjectDepositInToken {
  projectDepositInToken: (params: { accountId: string, ftContractId: string, projectId: number, amount: number }) => Promise<number>;
}

export const useDepositInToken = (): ProjectDepositInToken => {
  const { pegasusContract } = useNearContext();

  const projectDepositInToken = async (params: { accountId: string, ftContractId: string, projectId: number, amount: number }): Promise<number> => {
    const projectId = await pegasusContract
      .projectDepositInToken(
        params.accountId,
        params.ftContractId,
        params.projectId,
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

