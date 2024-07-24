
import React from 'react';

import { ProjectDataProvider } from '~src/features/ProjectData/context/ProjectDataProvider';

import AppRoutes from '~src/routes/AppRoutes'

import '~src/Polyfills';
import '~src/SpatialSetup';

export default function App(): React.JSX.Element {
  return (
    <ProjectDataProvider>
      <AppRoutes />
    </ProjectDataProvider>
  );
}
