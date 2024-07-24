import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import type { Channel } from '~src/features/ProjectData/types';

import ChannelScreen from './screens/ChannelScreen';
import FileScreen from './screens/FileScreen';
import HomeScreen from './screens/HomeScreen';
import SearchScreen from './screens/SearchScreen';

type RootStackParamList = {
  Home: undefined;
  Search: undefined;
  File: { fileId: number };
  Channel: { channelId: number };
  ChannelInfo: { channelId: number };
};

const SCREENS = {
  Home: 'home',
  Search: 'search',
  File: 'file',
  Channel: 'channel',
  ChannelInfo: 'channelInfo',
} as const;

const linking = {
  config: {
    screens: SCREENS,
  },
};

function AppRoutes() {
  const Stack = createStackNavigator<RootStackParamList>();

  return (
    <NavigationContainer linking={linking} independent={true}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          title: 'Stack Navigator',
        }}
      >
        {/* LOGGED IN PAGES */}
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            animationEnabled: false,
          }}
        />
        <Stack.Screen
          name="Search"
          component={SearchScreen}
          options={{
            animationEnabled: false,
          }}
        />
        <Stack.Screen
          name="File"
          component={FileScreen}
          options={{
            animationEnabled: false,
          }}
        />
        <Stack.Screen
          name="Channel"
          component={ChannelScreen}
          options={{
            animationEnabled: false,
          }}
        />
        <Stack.Screen
          name="ChannelInfo"
          component={ChannelScreen}
          options={{
            animationEnabled: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export { SCREENS, RootStackParamList };
export default AppRoutes;