/* eslint-disable no-nested-ternary */
import { StyleSheet, Text, View } from 'react-native';
import useTheme from '~src/theme/useTheme';
import { OurButton } from '~src/components/OurButton';
import { useNavigation } from '@react-navigation/native';
import { FocusContext, useFocusable } from '@noriginmedia/norigin-spatial-navigation';
import { Channel } from '~src/features/ProjectData/types';

const ChannelSearchItem = ({ item }: { item: Channel }) => {
  const theme = useTheme();
  const navigation = useNavigation();

  const styles = StyleSheet.create({
    channelWrapper: {
      paddingTop: 10,
      paddingBottom: 15,
      borderBottomWidth: 1,
      borderColor: theme.colors.outline,
    },
    headingWrapper: {
      paddingHorizontal: 10,
      margin: 5,
      flexDirection: 'row',
      alignItems: 'center',
    },
    heading: {
      flexGrow: 1,
      justifyContent: 'center',
    },
    title: {
      fontSize: 14,
      color: theme.colors.onBackground,
    },
    description: {
      fontSize: 12,
      // color: theme.colors.onBackground,
      color: '#ffaabb',
      flex: 1,
      opacity: 0.8,
    },
  });
  
  const { ref, focusKey } = useFocusable();

  return (
    <FocusContext.Provider value={focusKey}>
    <View style={styles.channelWrapper} ref={ref}>
      <View style={styles.headingWrapper}>
        <View style={styles.heading}>
          <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
            {item.title}
          </Text>
          <Text
            style={styles.description}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {item.description ?? '-'}
          </Text>
        </View>
        <OurButton
          type="outlined"
          onPress={() => navigation.navigate('ChannelInfo', { channelId: item.id })}
        >
          View Channel
        </OurButton>
        <OurButton
          type="outlined"
          onPress={() => console.log(`Action Pressed: ${item.title}`)}
        >
          {'Action'}
        </OurButton>
      </View>
    </View>
    </FocusContext.Provider>
  );
};

export default ChannelSearchItem;
