import { StyleSheet, Text, View } from 'react-native';
import useTheme from '~src/theme/useTheme';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { OurButton } from '~src/components/OurButton';
import { AVPlaybackStatus, ResizeMode, Video } from 'expo-av';
import { useEffect, useRef, useState } from 'react';
import SubPageLayout from '~src/layout/SubPageLayout';
import FileThumbnail from '~src/components/files/FileThumbnail';
import { LinearGradient } from 'expo-linear-gradient';
import { RootStackParamList } from '../AppRoutes';
import { FocusContext, useFocusable } from '@noriginmedia/norigin-spatial-navigation';

import { File } from '~src/features/ProjectData/types';
import { useProjectData } from '~src/features/ProjectData/hooks/useProjectData';

type FileScreenProps = NativeStackScreenProps<RootStackParamList, 'File'>;

const FileScreen = ({ route, navigation }: FileScreenProps) => {
  const theme = useTheme();
  const video = useRef<Video>(null);
  const [status, setStatus] = useState<AVPlaybackStatus | null>(null);

  
  const { fileId } = route.params;

  console.log( JSON.stringify({fileId}));

  const {data} = useProjectData();
  console.log( data );
  const item = data.files.find( (file) => file.id===Number(fileId));
  const file = item!;

  console.log( item );

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
    },
    button: {
      // width: '20%',
      margin: 10,
    },
    detailsWrapper: {
      flexDirection: 'row',
    },
    detailsWrapperLeft: {
      padding: 20,
      flex: 2,
    },
    detailsWrapperRight: {
      padding: 20,
      flex: 1,
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
      marginHorizontal: 10,
    },
  });

  const { focusKey, focusSelf, ref, } = useFocusable();
  useEffect(() => { focusSelf(); }, [])

  return (
    <FocusContext.Provider value={focusKey}>
      <View ref={ref}>
        <SubPageLayout>
          <Video
            ref={video}
            style={styles.video}
            source={{
              uri: ``,
              headers: {},
            }}
            useNativeControls
            resizeMode={ResizeMode.CONTAIN}
            isLooping
            onPlaybackStatusUpdate={(stat: AVPlaybackStatus) =>
              setStatus(() => stat)
            }
            onLoad={() => console.log('loaded')}
            onError={(error) => console.warn(error)}
          />
          <FileThumbnail
            fileId={item!.id}
            style={styles.thumbContainer}
            imageProps={{ style: { ...styles.thumbnail } }}
          />
          <LinearGradient
            colors={['transparent', theme.colors.background]}
            style={styles.gradient}
          >
            <Text style={styles.title}>{item?.title}</Text>
            <View style={styles.buttonWrapper}>
              <OurButton
                type="outlined"
                style={styles.button}
                leadingIcon={status?.isLoaded ? 'play' : undefined}
                onPress={async () => {
                  if (video.current && status?.isLoaded) {
                    if (status?.isPlaying) {
                      video.current.pauseAsync();
                    } else {
                      try {
                        await video.current.presentFullscreenPlayer();
                      } catch (error) {
                        console.warn(error);
                      }
                      video.current.playAsync();
                    }
                  } else {
                    console.warn('unable to load video: ', status);
                  }
                }}
              >
                {!status?.isLoaded ? 'Loading...' : 'Play'}
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
          <View style={styles.detailsWrapper}>
            <View style={styles.detailsWrapperLeft}>
              <Text style={styles.sectionTitle}>Description:</Text>
              <Text style={styles.sectionContent}>{item?.description || '-'}</Text>
            </View>

            <View style={styles.detailsWrapperRight}>
              <Text style={styles.sectionTitle}>Tags:</Text>
              <Text style={styles.sectionContent}>{'-'}</Text>

              <Text style={styles.sectionTitle}>MIME Type:</Text>
              <Text style={styles.sectionContent}>{'-'}</Text>
            </View>
          </View>
        </SubPageLayout>
      </View>
    </FocusContext.Provider >
  );
};

export default FileScreen;
