import { createContext } from 'react';
import type { ProjectDataContextType } from '../types';

export const ProjectDataContext = createContext<ProjectDataContextType>({
  data: {
    files: [],
    channels: [],
    subscriptions: [],
  },
});