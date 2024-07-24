import { StyleSheet, Text, View } from 'react-native';
import useTheme from '~src/theme/useTheme';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import SubPageLayout from '~src/layout/SubPageLayout';
import { LinearGradient } from 'expo-linear-gradient';
import { RootStackParamList } from '../AppRoutes';


import { FocusContext, useFocusable } from '@noriginmedia/norigin-spatial-navigation';

// Components
import { OurButton } from '~src/components/OurButton';
import { FileList } from '~src/components/files/FileList';
import FileThumbnail from '~src/components/files/FileThumbnail';
import { useEffect } from 'react';
import { useProjectData } from '~src/features/ProjectData/hooks/useProjectData';

type ChannelScreenProps = NativeStackScreenProps<RootStackParamList, 'Channel'>;
type ChannelInfoScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'ChannelInfo'
>;

const ChannelScreen = ({
  route,
  navigation,
}: ChannelScreenProps | ChannelInfoScreenProps) => {
  const theme = useTheme();
  const { channelId } = route.params;

  const {data} = useProjectData();
  const item = data.channels.find( (chan) => chan.id===Number(channelId));
  const channel = item!;

  const styles = StyleSheet.create({
    title: {
      color: theme.colors.onBackground,
      fontSize: 16,
      width: '100%',
      marginHorizontal: 10,
      marginBottom: 10,
    },
    thumbContainer: {
      width: '100%',
      height: '60%',
      marginBottom: 20,
    },
    gradient: {
      flexShrink: 1,
      justifyContent: 'flex-end',
      position: 'absolute',
      paddingHorizontal: 20,
      width: '100%',
      height: '60%',
      zIndex: 9,
    },
    thumbnail: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
    },
    video: {
      width: 0,
      height: 0,
    },
    buttonWrapper: {
      width: '100%',
      flexDirection: 'row',
      marginTop: 10,
      marginLeft: 10,
    },
    button: {
      // width: '20%',
      margin: 10,
    },
    videoWrapper: {
      padding: 15,
    },
    sectionTitle: {
      color: theme.colors.onBackground,
      fontSize: 14,
      opacity: 0.6,
      width: '100%',
      marginHorizontal: 10,
      marginTop: 20,
    },
    sectionContent: {
      color: theme.colors.onBackground,
      fontSize: 12,
      width: '100%',
      marginHorizontal: 15,
    },
  });

  const { focusKey, focusSelf, ref, } = useFocusable();
  useEffect(() => { focusSelf(); }, [])

  return (
    <FocusContext.Provider value={focusKey}>
      <View ref={ref} style={{ height: '100%', width: '100%' }}>
        <SubPageLayout>
          <FileThumbnail
            fileId={channel.id}
            style={styles.thumbContainer}
            imageProps={{ style: { ...styles.thumbnail } }}
          />
          <LinearGradient
            colors={['transparent', theme.colors.background]}
            style={styles.gradient}
          >
            <Text style={styles.title}>{item?.title}</Text>
            <Text style={styles.sectionContent}>
              {`${item?.files.length} ${item?.files.length === 1 ? 'file' : 'files'}`}
            </Text>
            <Text style={styles.sectionContent}>{item?.description || '-'}</Text>
            <View style={styles.buttonWrapper}>
              <OurButton
                type="outlined"
                style={styles.button}
                onPress={async () => {
                  // TODO: subscribe / unsubscribe
                }}
              >
                {data.subscriptions.includes( channel.id )
                  ? 'Unsubscribe'
                  : 'Subscribe'}
              </OurButton>
              <OurButton
                type="outlined"
                style={styles.button}
                onPress={() => navigation.goBack()}
              >
                Back
              </OurButton>
            </View>
          </LinearGradient>
          <View style={styles.videoWrapper}>
            <FileList channelId={item!.id} />
          </View>
        </SubPageLayout>
      </View>
    </FocusContext.Provider >
  );
};

export default ChannelScreen;
