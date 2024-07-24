import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ref, forwardRef, useEffect } from 'react';
import {
  ActivityIndicator,
  PressableProps,
  StyleSheet,
  Text,
  TextProps,
  View,
  ViewStyle,
} from 'react-native';
import useTheme from '~src/theme/useTheme';

import { EnterPressHandler, useFocusable } from '@noriginmedia/norigin-spatial-navigation';

export type OurButtonProps = {
  children?: TextProps['children'];
  disabled?: boolean;
  focusKey?: string;
  style?: ViewStyle;
  textStyle?: ViewStyle;
  textProps?: TextProps;
  leadingIcon?: keyof typeof MaterialCommunityIcons.glyphMap;
  type?: 'outlined' | 'contained' | 'text';
  loading?: boolean;
  onEnterPress?: EnterPressHandler;
  onPress?: Function;
};

export function OurButton(
  {
    disabled = false,
    children = '',
    focusKey: incomingFocusKey = undefined,
    style = {},
    textStyle = {},
    textProps = {},
    leadingIcon,
    type = 'outlined',
    loading = false,
    onEnterPress,
    onPress,
  }: OurButtonProps,
) : React.JSX.Element {
  const theme = useTheme();

  const { focusKey, focused, ref, } = useFocusable(
    {
      focusKey: incomingFocusKey,
      onEnterPress: (onEnterPress ?? onPress ?? (() => { })) as EnterPressHandler,
    }
  );

  const iconSize: number = 20;
  const iconPadding: number = 10;
  const styles = StyleSheet.create({
    button: {
      justifyContent: 'flex-start',
      alignItems: 'center',
      borderRadius: 100,
      paddingVertical: 5,
      paddingHorizontal: 10,
      marginHorizontal: 5,
      marginTop: 5,
      flexDirection: 'row',
      backgroundColor: type === 'contained' ? theme.colors.primary : undefined,
      borderWidth: 1,
      borderColor: type === 'outlined' ? theme.colors.outline : 'transparent',
    },
    focusedButton: {
      backgroundColor: theme.colors.primaryContainer,
      borderColor: theme.colors.primary,
      borderWidth: 1,
    },
    iconStyle: {
      // marginRight: 10,
    },
    textStyle: {
      marginLeft: leadingIcon ? iconPadding : 0,
      color:
        type === 'contained'
          ? theme.colors.onPrimary
          : theme.colors.onBackground,
      fontSize: 14,
    },
    focusedText: {
      color: theme.colors.onPrimaryContainer,
    },
    spinner: {
      marginLeft: 10,
    },
  });

  useEffect( () => { return () => {
    console.log(`DELETING BUTTON [${children}]`);
  } } , [] )

  const iconElement = leadingIcon
    ? <MaterialCommunityIcons
          name={leadingIcon}
          size={iconSize} 
          style={styles.iconStyle}
          color={theme.colors.onPrimaryContainer
        } />
    : null;
  
  const textElement = children !== ''
    ? (
      <Text
        style={[
          styles.textStyle,
          textStyle,
          focused ? styles.focusedText : {},
        ]}
        {...textProps}
      >
        {children}
      </Text>
    )
    : null;

  const loadingElement = loading
    ? <ActivityIndicator size='small' color={theme.colors.primary} style={styles.spinner} />
    : null;

  return (

    <View
      ref={ref}
      style={[
        styles.button,
        focused ? styles.focusedButton : {},
        style,
      ]}
    >
      {iconElement}
      {textElement}
      {loadingElement}
    </View>
  );
};

export default OurButton;
