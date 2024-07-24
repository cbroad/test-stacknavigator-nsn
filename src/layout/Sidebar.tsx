/**
 * Since this file is for development purposes only, some of the dependencies are in devDependencies
 * Disabling ESLint rules for these dependencies since we know it is only for development purposes
 */


import { useFocusable, FocusContext, EnterPressHandler } from '@noriginmedia/norigin-spatial-navigation';
import { useNavigation, useNavigationState } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Button, Image, StyleProp, StyleSheet, Text, View } from 'react-native';
import useTheme from '~src/theme/useTheme';


import logo from '~src/assets/logo.jpg';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { OurButton } from '../components/OurButton';

const colors = [
    '#ff0000',
    '#00ff00',
    '#0000ff',
];


export type SidebarItemProps = {
    icon?: keyof typeof MaterialCommunityIcons.glyphMap
    label?: string,
    onEnterPress?: EnterPressHandler,
};

export function SidebarItem({
    icon,
    label = '',
    onEnterPress = () => { }
}: SidebarItemProps) {

    return (
        <OurButton
            type="text"
            leadingIcon={icon}
            onPress={onEnterPress}
        >
            {label}
        </OurButton>
    )
}

interface SidebarProps {
    focusKey: string;
    items?: SidebarItemProps[],
}

export function Sidebar({
    focusKey: focusKeyParam,
    items = undefined,
}: SidebarProps) {
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
        forceFocus: true,
        saveLastFocusedChild: false,
        trackChildren: true,
        autoRestoreFocus: true,
        isFocusBoundary: false,
        focusKey: focusKeyParam,
        preferredChildFocusKey: undefined,
        onEnterPress: () => { },
        onEnterRelease: () => { },
        onArrowPress: () => true,
        onFocus: () => { },
        onBlur: () => { },
        extraProps: { foo: 'bar' }
    });
    const theme = useTheme();

    const styles: Record<string, StyleProp<Object>> = StyleSheet.create({
        menuWrapper: {
            flex: 1,
            maxWidth: 246,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'baseline',
            // backgroundColor: theme.colors.elevation.level3,
            backgroundColor: hasFocusedChild ? theme.colors.elevation.level3 : theme.colors.elevation.level4,
            // backgroundColor: colors[color],
            paddingTop: 37,
        },


        nmLogo: {
            height: 57,
            marginBottom: 51,
            marginLeft: '2.5%',
            resizeMode: 'contain',
            width: '95%',
        },
    });

    const navigation = useNavigation();

    const currentScreen = useNavigationState(
      (state) => state.routes[state.index].name,
    );

    items ??= [
      { 
        icon: 'magnify',
        label: 'Find Channels',
        //@ts-ignore
        onEnterPress: () => navigation.navigate('Search'),
      },
      {
        icon: 'home',
        label: 'My Channels',
        //@ts-ignore
        onEnterPress: () => navigation.navigate('Home'),
      },
      {
        icon: 'logout',
        label: 'Logout',
        onEnterPress: () => console.log('Logout'),
      },
    ];


    useEffect(() => {
        focusSelf();
    }, [focusSelf]);


    return (
        <FocusContext.Provider value={focusKey}>
        <View ref={ref}>
            <View style={styles.menuWrapper}>
                <Image style={styles.nmLogo} source={logo} key={'logo'} />
                {items.map( (item, idx, arr) => 
                    <SidebarItem icon={item.icon} label={item.label} onEnterPress={item.onEnterPress} key={`sidebar-${idx}`} />
                )}
            </View>
        </View>
        </FocusContext.Provider>
    );
}