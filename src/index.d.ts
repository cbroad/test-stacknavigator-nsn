import { RootStackParamList } from './routes/AppRoutes';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
