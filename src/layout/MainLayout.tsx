import { StyleSheet, View } from 'react-native';
import useTheme from '~src/theme/useTheme';
import { ReactNode, useEffect } from 'react';
import {Sidebar} from '~src/layout/Sidebar';
import { FocusContext, useFocusable } from '@noriginmedia/norigin-spatial-navigation';

const MainLayout = ({ children }: { children: ReactNode }) => {
  const theme = useTheme();
  const styles = StyleSheet.create({
    wrapper: {
      backgroundColor: theme.colors.background,
      flex: 1,
      flexDirection: 'column',
    },
    rowWrapper: {
      backgroundColor: theme.colors.background,
      flex: 1,
      flexGrow: 1,
      flexDirection: 'row',
    },
    content: {
      paddingVertical: 10,
      flex: 1,
      flexDirection: 'row',
    },
  });

  
  const {
    ref,
    focusSelf,
    hasFocusedChild,
    focusKey
    // setFocus, -- to set focus manually to some focusKey
    // navigateByDirection, -- to manually navigate by direction
    // pause, -- to pause all navigation events
    // resume, -- to resume all navigation events
    // updateAllLayouts, -- to force update all layouts when needed
    // getCurrentFocusKey -- to get the current focus key
} = useFocusable({
    focusable: true,
    saveLastFocusedChild: false,
    trackChildren: true,
    autoRestoreFocus: true,
    isFocusBoundary: true,
    preferredChildFocusKey: undefined,
});

  useEffect(() => {
    focusSelf();
  }, [focusSelf]);

  return (
    <FocusContext.Provider value={focusKey}>
      <View ref={ref}>
        <View style={styles.rowWrapper}>
          <Sidebar focusKey={'SideBar'} />
          {children}
        </View>
      </View>
    </FocusContext.Provider>
  );
};

export default MainLayout;
