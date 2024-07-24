import React, { useMemo, useState } from 'react';
import { ProjectData } from '../api';
import { ProjectDataType, ProjectDataContextType } from '../types';
import { ProjectDataContext } from './ProjectDataContext';

const FILE_LIST_LIMIT: number = 20;

export function ProjectDataProvider({ children }: { children: React.ReactNode }) : JSX.Element {

  const [ projectData, setProjectData ] = useState<ProjectDataType>(ProjectData);

  return (
    <ProjectDataContext.Provider value={useMemo<ProjectDataContextType>(
        () => ({
          data: projectData
        }),
        [projectData],
      )}
    >
      {children}
    </ProjectDataContext.Provider>
  );
};
