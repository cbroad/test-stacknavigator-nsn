/**
 * Since this file is for development purposes only, some of the dependencies are in devDependencies
 * Disabling ESLint rules for these dependencies since we know it is only for development purposes
 */

import { useCallback, useRef, useState } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
// import ReactDOMClient from 'react-dom/client';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useFocusable, FocusContext, KeyPressDetails } from '@noriginmedia/norigin-spatial-navigation';
import { FileItemProps } from '../files/FileItem';
import { ChannelItem } from './ChannelItem';
import { StyleProp, StyleSheet, Text, View } from 'react-native';
import { useProjectData } from '~src/features/ProjectData/hooks/useProjectData';


export function ChannelList() {
    const [selectedFile, setSelectedFile] = useState<FileItemProps | null>(null);

    const styles: Record<string, StyleProp<Object>> = StyleSheet.create({
        contentWrapper: {
            flex: 1,
            overflow: 'hidden',
            // @ts-ignore
            overflowY: 'hidden',
            display: 'flex',
            flexDirection: 'column',
        },

        contentTitle: {
            color: 'white',
            fontSize: 48,
            fontWeight: 600,
            fontFamily: 'Segoe UI',
            textAlign: 'center',
            marginTop: 52,
            marginBottom: 37,
        },

        selectedItemWrapper: {
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },

        selectedItemBox: {
            height: 282,
            width: 1074,
            backgroundColor: selectedFile ? '#ffffff' : '#565b6b',
            // backgroundColor: selectedFile ? selectedFile.color : '#565b6b',
            marginBottom: 37,
            borderRadius: 7,
        },

        selectedItemTitle: {
            position: 'absolute',
            bottom: 75,
            left: 100,
            color: 'white',
            fontSize: 27,
            fontWeight: 400,
            fontFamily: 'Segoe UI',
        },

        scrollingRows: {
            overflowY: 'auto',
            overflowX: 'hidden',
            flexShrink: 1,
            flexGrow: 1,
        },
    });

    
    const { ref, focusKey } = useFocusable();
    const { data } = useProjectData();

    const myChannels = data.channels.filter( (channel) => data.subscriptions.includes(channel.id));


    const onFilePressed = useCallback((asset: object, _details: KeyPressDetails) => {
        setSelectedFile(asset as FileItemProps);
    }, []);

    const onRowFocus = useCallback(
        ({ y }: { y: number }) => {
            console.log(`onRowFocus(${y})`);
            (ref.current! as { scrollTo: (props: { behavior: string, left?: number, top?: number }) => any }).scrollTo({
                behavior: 'smooth',
                top: y,
            });
        },
        [ref]
    );

    return (
        <FocusContext.Provider value={focusKey}>
            <View style={styles.contentWrapper}>
                <Text style={styles.contentTitle}>Channels</Text>
                <View style={styles.scrollingRows} ref={ref}>
                    <div>
                        {myChannels.map((channel) => (
                            <ChannelItem item={channel} onFilePressed={onFilePressed} onFocus={onRowFocus} key={`ChannelList-${channel.id}`} />
                        ))}
                    </div>
                </View>
            </View>
        </FocusContext.Provider>
    );
}