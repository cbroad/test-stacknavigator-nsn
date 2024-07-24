import { StyleSheet, View } from 'react-native';
import useTheme from '~src/theme/useTheme';
import ChannelSearchItem from './ChannelSearchItem';
import { FocusContext, useFocusable } from '@noriginmedia/norigin-spatial-navigation';
import { useProjectData } from '~src/features/ProjectData/hooks/useProjectData';

const ChannelSearchList = () => {
  const { ref, focusKey } = useFocusable();
  
  const theme = useTheme();

  const styles = StyleSheet.create({
    listContainer: {
      overflow: 'hidden',
      height: '100%',
      paddingTop: 20,
    },
    contentContainer: {
      flexGrow: 1,
    },
    wrapper: {
      flex: 1,
      flexDirection: 'column',
    },
    searchbar: {
      flexGrow: 1,
      marginHorizontal: 20,
    },
  });

  const { data } = useProjectData();
  const searchResults = data.channels.filter((channel) => !data.subscriptions.includes(channel.id));

  return (
    <View style={styles.wrapper}>
      <FocusContext.Provider value={focusKey}>
        <View style={styles.listContainer}>
          <View style={styles.contentContainer} ref={ref}>
            {searchResults.map((channel) => (
                <ChannelSearchItem item={channel} key={`ChannelSearchList-${channel.id}`} />
            ))}
          </View>
        </View>
      </FocusContext.Provider>
    </View>
);
};

export default ChannelSearchList;
