/* eslint-disable no-nested-ternary */
import { StyleSheet, Text, View } from 'react-native';
import useTheme from '~src/theme/useTheme';
import type { Channel } from '~src/features/ProjectData/types';
import {FileList} from '../files/FileList';
import { OurButton } from '~src/components/OurButton';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { EnterPressHandler, FocusContext, FocusHandler, useFocusable } from '@noriginmedia/norigin-spatial-navigation';

export type ChannelItemProps = {
  item: Channel;
  onFilePressed?: EnterPressHandler,
  onFocus?: FocusHandler;
};

export const ChannelItem = ({ item, onFilePressed, onFocus }: ChannelItemProps) => {
  const theme = useTheme();
  const navigation = useNavigation();

  const [status, setStatus] = useState<
    'publishing' | 'unpublishing' | 'unsubscribing' | ''
  >('');

  const { focused, focusKey, ref } = useFocusable({onFocus});

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
      fontWeight: 'bold',
    },
    description: {
      fontSize: 12,
      color: theme.colors.onBackground,
      flex: 1,
      opacity: 0.8,
    },
  });

  return (
    <FocusContext.Provider value={focusKey}>
      <View style={styles.channelWrapper} key={item.id} ref={ref}>
        <View style={styles.headingWrapper}>
          <View style={styles.heading}>
            <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
              {item.title}
            </Text>
            {/* <Text
            style={styles.description}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {item.description ?? '-'}
          </Text> */}
          </View>
          {/* TODO: Change this button based on channel status */}
          <OurButton
            type="outlined"
            //@ts-ignore
            onPress={() => navigation.navigate('Channel', { channelId:item.id })}
          >
            View Channel
          </OurButton>
          <OurButton
            type="outlined"
            onPress={() => console.log(`Publishing Channel: ${item.title}`)}
            disabled={status === 'publishing'}
            loading={status === 'publishing'}
          >
            Publish
          </OurButton>
          <OurButton
            type="outlined"
            onPress={() => console.log(`Unsubscribing Channel: ${item.title}`)}
            disabled={status === 'unsubscribing'}
            loading={status === 'unsubscribing'}
          >
            Unsubscribe
          </OurButton>
        </View>
        {/* This next View Tag can probably be removed, bringing it's child up one level. */}
        <View>
          <FileList channelId={item.id} onFilePressed={onFilePressed} />
        </View>
      </View>
    </FocusContext.Provider>
  );
};

// export default ChannelItem;
