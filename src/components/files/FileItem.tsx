import { Pressable, StyleSheet, Text, View } from 'react-native';
import useTheme from '~src/theme/useTheme';
import { LinearGradient } from 'expo-linear-gradient';
import { File } from '~src/features/ProjectData/types';
import FileThumbnail from '~src/components/files/FileThumbnail';
import { useNavigation } from '@react-navigation/native';
import { EnterPressHandler, FocusHandler, useFocusable } from '@noriginmedia/norigin-spatial-navigation';

export type FileItemProps = {
  item: File;
  onFocus?: FocusHandler;
  onEnterPress?: EnterPressHandler;
};

export const FileItem = ({
  item,
  onFocus = () => { },
  onEnterPress
}: FileItemProps) => {
  const theme = useTheme();
  const navigation = useNavigation();

  const { ref, focused } = useFocusable({
    //@ts-ignore
    onEnterPress: (onEnterPress ?? (() => { navigation.navigate('File', { fileId: item.id }) })),
    onFocus,
  });

  const Styles = StyleSheet.create({
      assetBox: {
          width: 225,
          height: 127,
          backgroundColor: '#000000',
          borderColor: 'white',
          borderStyle: 'solid',
          borderWidth: focused ? 6 : 0,
          // 'box-sizing': 'border-box',
          borderRadius: 7,
      },
      assetTitle: {
          color: 'white',
          marginTop: 10,
          fontFamily: 'Segoe UI',
          fontSize: 24,
          // fontWeight: 400,
      },
      assetWrapper: {
          width:225,
          marginRight: 22,
          display: 'flex',
          flexDirection: 'column',
      },
  });

  return (
      <View style={Styles.assetWrapper} ref={ref}>
        <FileThumbnail fileId={Number(item.id)} style={Styles.assetBox} />
        <View style={Styles.assetTitle}>
          <Text style={Styles.assetTitle} ellipsizeMode='head' numberOfLines={1}>
            {item?.title}
          </Text>
        </View>
      </View>
  );
};
