import { useContext } from 'react';
import { ProjectDataContext } from '../context/ProjectDataContext';
import { ProjectDataContextType } from '../types';

export function useProjectData() : ProjectDataContextType {
  const context = useContext(ProjectDataContext);
  if (!context) {
    throw new Error('the useProjectData hook must be used within the context of a ProjectDataProvider');
  }
  return context;
};
