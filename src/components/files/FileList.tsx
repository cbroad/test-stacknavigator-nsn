import { useCallback, useEffect, useRef, useState } from 'react';
import {
  StyleProp,
  StyleSheet,
  View,
} from 'react-native';
import {FileItem} from './FileItem';
import { EnterPressHandler, FocusContext, FocusHandler, useFocusable } from '@noriginmedia/norigin-spatial-navigation';
import { useProjectData } from '~src/features/ProjectData/hooks/useProjectData';

export type FileListProps = {
  channelId: number;
  focusKey?: string;
  horizontal?: boolean;
  onFilePressed?: EnterPressHandler;
  onFocus?: FocusHandler
};

export const FileList = ({ channelId, onFilePressed, onFocus = () => { } }: FileListProps) => {
  const { ref, focusKey } = useFocusable({
      onFocus
  });

  const { data } = useProjectData();

  const channel = data.channels.find((chan) => chan.id===channelId);

  const files = channel?.files ?? [];

  const scrollingRef = useRef(null);

  const onFileFocus = useCallback(
      ({ x }: { x: number }) => {
        (ref.current! as { scrollTo: (props: { behavior: string, left?: number, top?: number }) => any }).scrollTo({
            behavior: 'smooth',
            left: x,
          });
      },
      [scrollingRef]
  );

  const styles: Record<string, StyleProp<Object>> = StyleSheet.create({
      contentRowScrollingContent: {
          display: 'flex',
          flexDirection: 'row',
      },
      contentRowScrollingWrapper: {
          // @ts-ignore
          overflowX: 'hidden',
          overflowY: 'hidden',
          flexShrink: 1,
          flexGrow: 1,
          paddingLeft: 60,
          '&::WebkitScrollbar': {width:0, heigth:0,},
      },
      contentRowTitle: {
          color: 'white',
          marginBottom: 22,
          fontSize: 27,
          fontWeight: 700,
          fontFamily: 'Segoe UI',
          paddingLeft: 60,
      },
      contentRowWrapper: {
          marginBottom: 37,
      },
  });

  return (
      <FocusContext.Provider value={focusKey}>
          <View style={styles.contentRowWrapper} ref={ref}>
              <View style={styles.contentRowScrollingWrapper} ref={scrollingRef}>
                  <View style={styles.contentRowScrollingContent}>
                      {files.map(( file ) => (
                        <FileItem item={file} onFocus={onFileFocus} key={file.id} />
                      ))}
                  </View>
              </View>
          </View>
      </FocusContext.Provider>
  );
};

// export default FileList;
